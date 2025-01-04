import React from 'react'
import { LogIn, LogOut, Loader } from 'lucide-react'
import { supabase } from '../../lib/supabase-client'
import { useAuth } from '../../contexts/AuthContext'

export function AuthButton() {
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleAuth = async () => {
    if (user) {
      setIsLoading(true)
      try {
        await supabase.auth.signOut()
        window.location.href = '/'
      } catch (error) {
        console.error('Sign out error:', error)
        setError('Failed to sign out')
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Use navigate instead of window.location for SPA routing
    window.location.replace('/sign-in')
  }

  if (error) {
    return <div className="text-red-400">{error}</div>
  }

  if (loading || isLoading) {
    return (
      <button className="btn-auth" disabled>
        <Loader className="w-5 h-5 animate-spin" />
        Loading...
      </button>
    )
  }

  return (
    <button onClick={handleAuth} className="btn-auth">
      {user ? (
        <>
          <LogOut className="w-5 h-5" />
          Sign Out
        </>
      ) : (
        <>
          <LogIn className="w-5 h-5" />
          Sign In
        </>
      )}
    </button>
  )
}