/*
  # Enable Google Authentication

  1. Changes
    - Enable Google OAuth provider
    - Configure auth settings for Google sign-in
*/

-- Enable Google auth provider
CREATE OR REPLACE FUNCTION auth.enable_google()
RETURNS void AS $$
BEGIN
  INSERT INTO auth.providers (provider_id, enabled)
  VALUES ('google', true)
  ON CONFLICT (provider_id)
  DO UPDATE SET enabled = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;