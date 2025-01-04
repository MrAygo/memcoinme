import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase-client'

export function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/')
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-white/60">
        Completing sign in...
      </div>
    </div>
  )
}