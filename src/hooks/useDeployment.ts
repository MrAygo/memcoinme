import { useState } from 'react'
import { deployToNetlify } from '../services/deployment'
import type { BuilderState } from '../types/builder'

export function useDeployment() {
  const [deploying, setDeploying] = useState(false)
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const deploy = async (state: BuilderState, deployId?: string) => {
    setDeploying(true)
    setError(null)
    
    try {
      const result = await deployToNetlify({ state, deployId })
      setDeployedUrl(result.url)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Deployment failed')
      setError(error)
      throw error
    } finally {
      setDeploying(false)
    }
  }

  return { deploy, deploying, deployedUrl, error }
}