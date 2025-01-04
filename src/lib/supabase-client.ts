import { createClient } from '@supabase/supabase-js'
import { env } from '../config/env'
import type { Database } from '../types/database'

export const supabase = createClient<Database>(env.supabase.url, env.supabase.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true
  }
})