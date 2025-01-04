import { useState, useEffect } from 'react'
import { getLandingPage, updateLandingPage } from '../services/landing-pages'
import type { BuilderState } from '../types/builder'

export function useLandingPage(id: string) {
  const [state, setState] = useState<BuilderState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLandingPage() {
      try {
        const page = await getLandingPage(id)
        setState(page.content)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch landing page'))
      } finally {
        setLoading(false)
      }
    }

    fetchLandingPage()
  }, [id])

  const updatePage = async (newState: BuilderState, publish = false) => {
    try {
      await updateLandingPage(id, newState, publish)
      setState(newState)
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update landing page')
    }
  }

  return { state, loading, error, updatePage }
}