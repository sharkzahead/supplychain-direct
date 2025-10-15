-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('farmer', 'factory');

-- Create enum for crop categories
CREATE TYPE public.crop_category AS ENUM ('grains', 'vegetables', 'fruits', 'spices', 'pulses', 'oilseeds', 'other');

-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type user_type NOT NULL,
  full_name TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create farmers table (additional farmer-specific data)
CREATE TABLE public.farmers (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  farm_size TEXT,
  primary_crops TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create factories table (additional factory-specific data)
CREATE TABLE public.factories (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  materials_needed TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create crops table (farmer listings)
CREATE TABLE public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES public.farmers(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  category crop_category NOT NULL,
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  price_per_unit NUMERIC NOT NULL,
  harvest_date DATE NOT NULL,
  description TEXT,
  image_url TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create requirements table (factory requirements)
CREATE TABLE public.requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id UUID NOT NULL REFERENCES public.factories(id) ON DELETE CASCADE,
  material_name TEXT NOT NULL,
  category crop_category NOT NULL,
  quantity_needed NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  price_willing NUMERIC NOT NULL,
  description TEXT,
  urgent BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create purchase requests table
CREATE TABLE public.purchase_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE CASCADE,
  factory_id UUID NOT NULL REFERENCES public.factories(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES public.farmers(id) ON DELETE CASCADE,
  quantity NUMERIC NOT NULL,
  offered_price NUMERIC NOT NULL,
  status request_status NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Farmers policies
CREATE POLICY "Anyone can view farmers"
  ON public.farmers FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own farmer profile"
  ON public.farmers FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own farmer profile"
  ON public.farmers FOR UPDATE
  USING (auth.uid() = id);

-- Factories policies
CREATE POLICY "Anyone can view factories"
  ON public.factories FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own factory profile"
  ON public.factories FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own factory profile"
  ON public.factories FOR UPDATE
  USING (auth.uid() = id);

-- Crops policies
CREATE POLICY "Anyone can view available crops"
  ON public.crops FOR SELECT
  USING (true);

CREATE POLICY "Farmers can insert their own crops"
  ON public.crops FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.farmers WHERE id = auth.uid() AND id = farmer_id
    )
  );

CREATE POLICY "Farmers can update their own crops"
  ON public.crops FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.farmers WHERE id = auth.uid() AND id = farmer_id
    )
  );

CREATE POLICY "Farmers can delete their own crops"
  ON public.crops FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.farmers WHERE id = auth.uid() AND id = farmer_id
    )
  );

-- Requirements policies
CREATE POLICY "Anyone can view active requirements"
  ON public.requirements FOR SELECT
  USING (true);

CREATE POLICY "Factories can insert their own requirements"
  ON public.requirements FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.factories WHERE id = auth.uid() AND id = factory_id
    )
  );

CREATE POLICY "Factories can update their own requirements"
  ON public.requirements FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.factories WHERE id = auth.uid() AND id = factory_id
    )
  );

CREATE POLICY "Factories can delete their own requirements"
  ON public.requirements FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.factories WHERE id = auth.uid() AND id = factory_id
    )
  );

-- Purchase requests policies
CREATE POLICY "Factories can view their sent requests"
  ON public.purchase_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.factories WHERE id = auth.uid() AND id = factory_id
    )
  );

CREATE POLICY "Farmers can view their received requests"
  ON public.purchase_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.farmers WHERE id = auth.uid() AND id = farmer_id
    )
  );

CREATE POLICY "Factories can insert purchase requests"
  ON public.purchase_requests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.factories WHERE id = auth.uid() AND id = factory_id
    )
  );

CREATE POLICY "Farmers can update request status"
  ON public.purchase_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.farmers WHERE id = auth.uid() AND id = farmer_id
    )
  );

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER crops_updated_at
  BEFORE UPDATE ON public.crops
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER requirements_updated_at
  BEFORE UPDATE ON public.requirements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER purchase_requests_updated_at
  BEFORE UPDATE ON public.purchase_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();