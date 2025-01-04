import React from 'react'
import { Loader } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'auth'
}

export function Button({ 
  children, 
  loading, 
  variant = 'primary',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300'
  
  const variants = {
    primary: 'bg-white text-black hover:bg-white/90',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    auth: 'bg-white/10 text-white hover:bg-white/20'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Loading...
        </>
      ) : children}
    </button>
  )
}