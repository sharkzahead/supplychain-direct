import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, TrendingUp, Package, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddCropDialog from '@/components/AddCropDialog';

export default function FarmerDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [showAddCrop, setShowAddCrop] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchData();

    // Subscribe to real-time changes
    const cropsChannel = supabase
      .channel('farmer-crops-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crops' }, () => {
        fetchData();
      })
      .subscribe();

    const requestsChannel = supabase
      .channel('farmer-requests-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'purchase_requests' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(cropsChannel);
      supabase.removeChannel(requestsChannel);
    };
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [cropsRes, requestsRes] = await Promise.all([
        supabase.from('crops').select('*').eq('farmer_id', user?.id).order('created_at', { ascending: false }),
        supabase
          .from('purchase_requests')
          .select(`
            *,
            crop:crops(*),
            factory:factories(
              profiles(full_name, location)
            )
          `)
          .eq('farmer_id', user?.id)
          .order('created_at', { ascending: false }),
      ]);

      setCrops(cropsRes.data || []);
      setRequests(requestsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: 'pending' | 'accepted' | 'rejected' | 'completed') => {
    try {
      await supabase.from('purchase_requests').update({ status }).eq('id', requestId);
      fetchData();
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Farmer Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your crops and requests</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crops.filter(c => c.available).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.filter(r => r.status === 'pending').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crops.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList>
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="requests">Purchase Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="crops" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Crop Listings</h2>
              <Button onClick={() => setShowAddCrop(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Crop
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <Card key={crop.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{crop.crop_name}</CardTitle>
                      <Badge variant={crop.available ? 'default' : 'secondary'}>
                        {crop.available ? 'Available' : 'Sold Out'}
                      </Badge>
                    </div>
                    <CardDescription className="capitalize">{crop.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>Quantity: {crop.quantity} {crop.unit}</p>
                      <p className="font-semibold text-primary">₹{crop.price_per_unit}/{crop.unit}</p>
                      <p className="text-muted-foreground">Harvest: {new Date(crop.harvest_date).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {crops.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't listed any crops yet</p>
                  <Button onClick={() => setShowAddCrop(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Crop
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <h2 className="text-2xl font-semibold">Purchase Requests</h2>

            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{request.crop.crop_name}</CardTitle>
                        <CardDescription>
                          From: {request.factory.profiles.full_name} • {request.factory.profiles.location}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          request.status === 'pending' ? 'default' :
                          request.status === 'accepted' ? 'default' :
                          request.status === 'rejected' ? 'destructive' : 'secondary'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-semibold">{request.quantity} {request.crop.unit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Offered Price</p>
                          <p className="font-semibold text-primary">₹{request.offered_price}/{request.crop.unit}</p>
                        </div>
                      </div>
                      {request.message && (
                        <div>
                          <p className="text-muted-foreground text-sm">Message</p>
                          <p className="text-sm">{request.message}</p>
                        </div>
                      )}
                      {request.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => updateRequestStatus(request.id, 'accepted')}
                            className="flex-1"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                            className="flex-1"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {requests.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No purchase requests yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AddCropDialog open={showAddCrop} onOpenChange={setShowAddCrop} onSuccess={fetchData} />
    </div>
  );
}
