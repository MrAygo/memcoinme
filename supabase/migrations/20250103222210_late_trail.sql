/*
  # Landing pages table with proper RLS policies

  1. Tables
    - landing_pages table with user_id foreign key
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Allow public read access for published pages

  3. Changes
    - Check for existing trigger before creation
*/

-- Create landing pages table
CREATE TABLE IF NOT EXISTS landing_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content jsonb NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON landing_pages
  FOR SELECT
  USING (published = true OR auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users"
  ON landing_pages
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id"
  ON landing_pages
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
  ON landing_pages
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'landing_pages_updated_at'
  ) THEN
    CREATE TRIGGER landing_pages_updated_at
      BEFORE UPDATE ON landing_pages
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;