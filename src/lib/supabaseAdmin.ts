import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Use VITE prefix for client-side env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase admin credentials not available in development mode');
}

export const supabaseAdmin = createClient<Database>(
  supabaseUrl || '',
  supabaseServiceKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);