/*
  # Configure authentication settings

  1. Changes
    - Enable email authentication provider
    - Configure site URL and redirect URLs through auth settings
*/

-- Create auth settings if they don't exist
CREATE TABLE IF NOT EXISTS auth.config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_url text,
  additional_redirect_urls text[]
);

-- Insert or update auth configuration
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.config LIMIT 1) THEN
    INSERT INTO auth.config (site_url, additional_redirect_urls)
    VALUES (
      'https://memcoin.me',
      ARRAY[
        'https://memcoin.me/auth/callback',
        'https://memcoin.me/auth/signin',
        'http://localhost:5173/auth/callback',
        'http://localhost:5173/auth/signin'
      ]
    );
  ELSE
    UPDATE auth.config
    SET 
      site_url = 'https://memcoin.me',
      additional_redirect_urls = ARRAY[
        'https://memcoin.me/auth/callback',
        'https://memcoin.me/auth/signin',
        'http://localhost:5173/auth/callback',
        'http://localhost:5173/auth/signin'
      ];
  END IF;
END $$;

-- Enable email provider
CREATE TABLE IF NOT EXISTS auth.providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id text UNIQUE NOT NULL,
  enabled boolean NOT NULL DEFAULT false
);

INSERT INTO auth.providers (provider_id, enabled)
VALUES ('email', true)
ON CONFLICT (provider_id)
DO UPDATE SET enabled = true;