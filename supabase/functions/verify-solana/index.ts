import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import * as ed25519 from 'https://deno.land/x/ed25519@1.6.0/mod.ts'
import { decode as bs58decode } from 'https://deno.land/x/bs58@1.0.1/mod.ts'

serve(async (req) => {
  try {
    // Get the authorization payload
    const { public_key, signature, message } = await req.json()
    
    if (!public_key || !signature || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Decode the message and signature from base58
    const messageBytes = bs58decode(message)
    const signatureBytes = bs58decode(signature)
    const publicKeyBytes = bs58decode(public_key)

    // Verify the signature
    const isValid = ed25519.verify(signatureBytes, messageBytes, publicKeyBytes)
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Create or get user and sign them in
    const { data: { user }, error: upsertError } = await supabaseAdmin.auth.admin.createUser({
      email: `${public_key}@phantom.solana`,
      email_confirm: true,
      user_metadata: { wallet_address: public_key }
    })

    if (upsertError && upsertError.message !== 'User already registered') {
      throw upsertError
    }

    // Generate session
    const { data: { session }, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
      user_id: user?.id as string
    })

    if (sessionError) throw sessionError

    return new Response(
      JSON.stringify({ session }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})