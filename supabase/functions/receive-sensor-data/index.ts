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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { device_id, moisture_level, temperature } = await req.json();

    console.log('Received sensor data:', { device_id, moisture_level, temperature });

    // Validate device exists
    const { data: device, error: deviceError } = await supabase
      .from('iot_devices')
      .select('*')
      .eq('id', device_id)
      .single();

    if (deviceError || !device) {
      console.error('Device not found:', deviceError);
      return new Response(
        JSON.stringify({ error: 'Device not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert moisture reading
    const { error: insertError } = await supabase
      .from('moisture_readings')
      .insert({
        device_id,
        moisture_level,
        temperature,
      });

    if (insertError) {
      console.error('Error inserting reading:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to insert reading' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if moisture is low and auto-trigger pump (if threshold < 30%)
    let pumpTriggered = false;
    if (moisture_level < 30) {
      console.log('Low moisture detected, checking for pump...');
      
      // Find associated pump for this farmer
      const { data: pump } = await supabase
        .from('iot_devices')
        .select('*')
        .eq('farmer_id', device.farmer_id)
        .eq('device_type', 'water_pump')
        .eq('active', true)
        .single();

      if (pump) {
        // Log pump action
        await supabase.from('pump_actions').insert({
          device_id: pump.id,
          action: 'start',
          triggered_by: 'automatic',
          duration_seconds: 60, // Run for 60 seconds
        });
        
        pumpTriggered = true;
        console.log('Pump triggered automatically');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Sensor data recorded',
        pump_triggered: pumpTriggered 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});