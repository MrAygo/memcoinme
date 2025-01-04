import { env } from '../config/env'
import { generateTemplate } from '../utils/templateGenerator'
import type { BuilderState } from '../types/builder'

interface DeploymentOptions {
  state: BuilderState
}

interface DeploymentResult {
  url: string
  deployId?: string
  claimUrl?: string
}

export async function deployToNetlify({ state }: DeploymentOptions): Promise<DeploymentResult> {
  // Generate template files
  const { html, css } = generateTemplate(state)
  
  if (!html?.trim() || !css?.trim()) {
    throw new Error('Failed to generate template files')
  }

  const files = {
    'index.html': html,
    'styles.css': css,
    '_redirects': '/* /index.html 200'
  }

  const response = await fetch('/.netlify/functions/deploy', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.netlify.authToken}`
    },
    body: JSON.stringify({ files })
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `Deployment failed with status ${response.status}`)
  }

  const result = await response.json().catch(() => ({}))
  if (!result.url) {
    throw new Error('Deployment failed: No URL returned')
  }

  return {
    url: result.url,
    deployId: result.deployId,
    claimUrl: result.claimUrl
  }
}