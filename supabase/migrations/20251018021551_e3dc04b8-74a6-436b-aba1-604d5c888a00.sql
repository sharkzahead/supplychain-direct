-- Create table for IoT devices (sensors and pumps)
CREATE TABLE public.iot_devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL,
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL CHECK (device_type IN ('moisture_sensor', 'water_pump')),
  location TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for moisture readings
CREATE TABLE public.moisture_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID NOT NULL REFERENCES public.iot_devices(id) ON DELETE CASCADE,
  moisture_level NUMERIC NOT NULL CHECK (moisture_level >= 0 AND moisture_level <= 100),
  temperature NUMERIC,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for pump actions
CREATE TABLE public.pump_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID NOT NULL REFERENCES public.iot_devices(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('start', 'stop')),
  triggered_by TEXT NOT NULL CHECK (triggered_by IN ('manual', 'automatic')),
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.iot_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moisture_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pump_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for iot_devices
CREATE POLICY "Farmers can view their own devices"
  ON public.iot_devices FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM farmers WHERE farmers.id = auth.uid() AND farmers.id = iot_devices.farmer_id
  ));

CREATE POLICY "Farmers can insert their own devices"
  ON public.iot_devices FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM farmers WHERE farmers.id = auth.uid() AND farmers.id = iot_devices.farmer_id
  ));

CREATE POLICY "Farmers can update their own devices"
  ON public.iot_devices FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM farmers WHERE farmers.id = auth.uid() AND farmers.id = iot_devices.farmer_id
  ));

CREATE POLICY "Farmers can delete their own devices"
  ON public.iot_devices FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM farmers WHERE farmers.id = auth.uid() AND farmers.id = iot_devices.farmer_id
  ));

-- RLS Policies for moisture_readings
CREATE POLICY "Farmers can view readings from their devices"
  ON public.moisture_readings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM iot_devices 
    JOIN farmers ON farmers.id = iot_devices.farmer_id
    WHERE farmers.id = auth.uid() AND iot_devices.id = moisture_readings.device_id
  ));

CREATE POLICY "Anyone can insert moisture readings"
  ON public.moisture_readings FOR INSERT
  WITH CHECK (true);

-- RLS Policies for pump_actions
CREATE POLICY "Farmers can view actions from their devices"
  ON public.pump_actions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM iot_devices 
    JOIN farmers ON farmers.id = iot_devices.farmer_id
    WHERE farmers.id = auth.uid() AND iot_devices.id = pump_actions.device_id
  ));

CREATE POLICY "Farmers can insert pump actions for their devices"
  ON public.pump_actions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM iot_devices 
    JOIN farmers ON farmers.id = iot_devices.farmer_id
    WHERE farmers.id = auth.uid() AND iot_devices.id = pump_actions.device_id
  ));

-- Create trigger for updating iot_devices timestamps
CREATE TRIGGER update_iot_devices_updated_at
  BEFORE UPDATE ON public.iot_devices
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_moisture_readings_device_id ON public.moisture_readings(device_id);
CREATE INDEX idx_moisture_readings_recorded_at ON public.moisture_readings(recorded_at DESC);
CREATE INDEX idx_pump_actions_device_id ON public.pump_actions(device_id);
CREATE INDEX idx_pump_actions_created_at ON public.pump_actions(created_at DESC);

-- Enable realtime for moisture readings
ALTER PUBLICATION supabase_realtime ADD TABLE public.moisture_readings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pump_actions;