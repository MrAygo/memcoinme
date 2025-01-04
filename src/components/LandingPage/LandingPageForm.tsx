import React from 'react'
import { Input } from '../ui/Input'
import { validateSlug, validateTitle } from '../../utils/validation'
import type { BuilderState } from '../../types/builder'

interface LandingPageFormProps {
  state: BuilderState
  onSubmit: (title: string, slug: string) => Promise<void>
}

export function LandingPageForm({ state, onSubmit }: LandingPageFormProps) {
  const [title, setTitle] = React.useState('')
  const [slug, setSlug] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!validateTitle(title)) {
      setError('Title must be between 3 and 100 characters')
      return
    }
    
    if (!validateSlug(slug)) {
      setError('Slug must contain only lowercase letters, numbers, and hyphens')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(title, slug)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save landing page')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
      />
      
      <Input
        label="URL Slug"
        prefix="memcoin.me/"
        value={slug}
        onChange={(e) => setSlug(e.target.value.toLowerCase())}
        disabled={isSubmitting}
      />
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? 'Saving...' : 'Save Landing Page'}
      </button>
    </form>
  )
}