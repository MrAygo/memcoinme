import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BuilderForm } from '../components/Builder/BuilderForm'
import { BuilderPanel } from '../components/Builder/BuilderPanel'
import { PreviewPanel } from '../components/Preview/PreviewPanel'
import { createLandingPage } from '../services/landing-pages'
import { initialState } from '../utils/initialState'

export function NewLandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [state, setState] = React.useState(initialState)
  const [error, setError] = React.useState<string | null>(null)

  const handleSave = async () => {
    if (!user) {
      setError('Please sign in to create a landing page')
      return
    }

    if (!state.project.pageUrl || !state.project.tokenName) {
      setError('Page URL and Token Name are required')
      return
    }

    try {
      const page = await createLandingPage(
        state.project.websiteName || state.project.tokenName,
        state.project.pageUrl,
        state
      )
      navigate('/')
    } catch (error) {
      console.error('Failed to create landing page:', error)
      setError(error instanceof Error ? error.message : 'Failed to create landing page')
    }
  }

  return (
    <div className="grid grid-cols-2 gap-8 p-8 max-w-[2000px] mx-auto">
      <div className="glass-panel">
        <BuilderPanel 
          state={state} 
          onChange={setState}
          onSave={handleSave}
          error={error}
        />
      </div>
      <div className="glass-panel">
        <PreviewPanel state={state} />
      </div>
    </div>
  )
}