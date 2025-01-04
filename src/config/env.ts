// Environment variable validation and typing
interface EnvConfig {
  supabase: {
    url: string
    anonKey: string
  }
  netlify: {
    authToken: string
    siteId: string
  }
}

export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_DATABASE_URL || import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  netlify: {
    authToken: import.meta.env.NETLIFY_AUTH_TOKEN || import.meta.env.VITE_NETLIFY_AUTH_TOKEN || '',
    siteId: import.meta.env.NETLIFY_SITE_ID || import.meta.env.VITE_NETLIFY_SITE_ID || '',
  },
} satisfies EnvConfig

// Validate environment variables
function validateEnv(): void {
  const missing: string[] = []

  Object.entries(env.supabase).forEach(([key, value]) => {
    if (!value) missing.push(`VITE_SUPABASE_${key.toUpperCase()}`)
  })
  
  // Convert camelCase to SCREAMING_SNAKE_CASE for env var names
  Object.entries(env.netlify).forEach(([key, value]) => { 
    const envKey = key.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase()
    if (!value) missing.push(`VITE_NETLIFY_${envKey}`)
  })

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables:\n${missing.join('\n')}`)
  }
}

// Run validation
validateEnv()

// Export validated env
export default env