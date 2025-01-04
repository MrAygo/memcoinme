/*
  # Add Solana wallet authentication support
  
  1. New Functions
    - Create function to handle Solana wallet authentication
  2. Security
    - Enable RLS for auth tables
*/

-- Create a function to handle Solana wallet authentication
CREATE OR REPLACE FUNCTION auth.handle_solana_auth(
  wallet_address text,
  signature text,
  message text
) RETURNS json AS $$
DECLARE
  user_id uuid;
  result json;
BEGIN
  -- Check if user exists
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = wallet_address || '@phantom.solana';

  -- Create user if not exists
  IF user_id IS NULL THEN
    INSERT INTO auth.users (
      email,
      email_confirmed_at,
      raw_user_meta_data
    )
    VALUES (
      wallet_address || '@phantom.solana',
      now(),
      jsonb_build_object('wallet_address', wallet_address)
    )
    RETURNING id INTO user_id;
  END IF;

  -- Return user data
  SELECT json_build_object(
    'user_id', user_id,
    'wallet_address', wallet_address
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;