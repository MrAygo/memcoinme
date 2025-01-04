import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase-client'
import { Input } from '../../components/ui/Input'

export function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSignUp, setIsSignUp] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        navigate('/')
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 p-8 glass-panel">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </h1>
          <p className="mt-2 text-white/60">
            {isSignUp
              ? 'Create your account to get started'
              : 'Welcome back! Please sign in to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white/60 hover:text-white"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}