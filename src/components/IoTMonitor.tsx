import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Thermometer, Power, AlertTriangle, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  location: string;
  active: boolean;
}

interface MoistureReading {
  id: string;
  moisture_level: number;
  temperature: number;
  recorded_at: string;
}

interface PumpAction {
  id: string;
  action: string;
  triggered_by: string;
  created_at: string;
}

export default function IoTMonitor() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [latestReading, setLatestReading] = useState<MoistureReading | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [pumpActions, setPumpActions] = useState<PumpAction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    setupRealtimeSubscription();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch devices
      const { data: devicesData } = await supabase
        .from('iot_devices')
        .select('*')
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      setDevices(devicesData || []);

      // Find moisture sensor
      const sensor = devicesData?.find(d => d.device_type === 'moisture_sensor');
      if (sensor) {
        // Fetch latest reading
        const { data: latestData } = await supabase
          .from('moisture_readings')
          .select('*')
          .eq('device_id', sensor.id)
          .order('recorded_at', { ascending: false })
          .limit(1)
          .single();

        setLatestReading(latestData);

        // Fetch historical data (last 24 hours)
        const { data: historicalData } = await supabase
          .from('moisture_readings')
          .select('*')
          .eq('device_id', sensor.id)
          .gte('recorded_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
          .order('recorded_at', { ascending: true });

        setHistoricalData(
          (historicalData || []).map(r => ({
            time: new Date(r.recorded_at).toLocaleTimeString(),
            moisture: r.moisture_level,
            temperature: r.temperature,
          }))
        );
      }

      // Fetch pump actions
      const pump = devicesData?.find(d => d.device_type === 'water_pump');
      if (pump) {
        const { data: actionsData } = await supabase
          .from('pump_actions')
          .select('*')
          .eq('device_id', pump.id)
          .order('created_at', { ascending: false })
          .limit(10);

        setPumpActions(actionsData || []);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching IoT data:', error);
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('iot-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'moisture_readings' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pump_actions' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const controlPump = async (action: 'start' | 'stop') => {
    try {
      const pump = devices.find(d => d.device_type === 'water_pump');
      if (!pump) {
        toast({ title: 'Error', description: 'No pump device found', variant: 'destructive' });
        return;
      }

      const { error } = await supabase.functions.invoke('control-pump', {
        body: { 
          device_id: pump.id, 
          action,
          duration_seconds: action === 'start' ? 60 : null 
        }
      });

      if (error) throw error;

      toast({ 
        title: 'Success', 
        description: `Pump ${action} command sent` 
      });
    } catch (error) {
      console.error('Error controlling pump:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to control pump', 
        variant: 'destructive' 
      });
    }
  };

  const getMoistureStatus = (level: number) => {
    if (level < 30) return { text: 'Low', color: 'destructive' as const };
    if (level < 60) return { text: 'Medium', color: 'default' as const };
    return { text: 'Optimal', color: 'default' as const };
  };

  if (loading) {
    return <div className="text-center py-8">Loading IoT data...</div>;
  }

  const sensor = devices.find(d => d.device_type === 'moisture_sensor');
  const pump = devices.find(d => d.device_type === 'water_pump');

  return (
    <div className="space-y-6">
      {/* Device Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moisture Level</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {latestReading ? (
              <>
                <div className="text-2xl font-bold">{latestReading.moisture_level}%</div>
                <Badge variant={getMoistureStatus(latestReading.moisture_level).color} className="mt-2">
                  {getMoistureStatus(latestReading.moisture_level).text}
                </Badge>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {latestReading?.temperature ? (
              <div className="text-2xl font-bold">{latestReading.temperature}°C</div>
            ) : (
              <p className="text-sm text-muted-foreground">No data</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pump Status</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {pump ? (
              <>
                <Badge variant={pump.active ? 'default' : 'secondary'} className="mb-3">
                  {pump.active ? 'Active' : 'Inactive'}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => controlPump('start')} className="flex-1">
                    Start
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => controlPump('stop')} className="flex-1">
                    Stop
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No pump configured</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historical Chart */}
      {historicalData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              24-Hour Moisture History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="moisture" stroke="hsl(var(--primary))" name="Moisture %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Alerts */}
      {latestReading && latestReading.moisture_level < 30 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Low Moisture Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Soil moisture is critically low at {latestReading.moisture_level}%. 
              {pump && ' Automatic watering may have been triggered.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Pump Actions */}
      {pumpActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Pump Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pumpActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between text-sm border-b pb-2">
                  <span className="font-medium capitalize">{action.action}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={action.triggered_by === 'automatic' ? 'secondary' : 'default'}>
                      {action.triggered_by}
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(action.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Devices Message */}
      {devices.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              No IoT devices configured. Set up your sensors and pumps to start monitoring.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}