import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { device_id, action, duration_seconds } = await req.json();

    console.log('Pump control request:', { device_id, action, duration_seconds });

    // Verify user owns this device
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: device, error: deviceError } = await supabase
      .from('iot_devices')
      .select('*')
      .eq('id', device_id)
      .eq('farmer_id', user.id)
      .eq('device_type', 'water_pump')
      .single();

    if (deviceError || !device) {
      console.error('Device not found or unauthorized:', deviceError);
      return new Response(
        JSON.stringify({ error: 'Device not found or unauthorized' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log pump action
    const { error: insertError } = await supabase
      .from('pump_actions')
      .insert({
        device_id,
        action,
        triggered_by: 'manual',
        duration_seconds: duration_seconds || null,
      });

    if (insertError) {
      console.error('Error logging pump action:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to log pump action' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Here you would send actual command to IoT device
    // For now, we just log it - your hardware will poll for new pump_actions
    console.log(`Pump ${action} command sent to device ${device_id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Pump ${action} command sent`,
        device_id,
        action 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error controlling pump:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});