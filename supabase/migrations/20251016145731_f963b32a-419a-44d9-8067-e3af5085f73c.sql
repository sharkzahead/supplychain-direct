-- Enable realtime for all relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.crops;
ALTER PUBLICATION supabase_realtime ADD TABLE public.purchase_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.requirements;