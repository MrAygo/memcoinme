import { Handler } from '@netlify/functions'
import { NetlifyAPI } from 'netlify'

const NETLIFY_AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN || process.env.VITE_NETLIFY_AUTH_TOKEN
const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID || process.env.VITE_NETLIFY_SITE_ID

if (!NETLIFY_AUTH_TOKEN || !NETLIFY_SITE_ID) {
  throw new Error('Missing required Netlify environment variables')
}

const client = new NetlifyAPI(NETLIFY_AUTH_TOKEN)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { files } = JSON.parse(event.body || '{}')
    
    if (!files || !files['index.html'] || !files['styles.css']) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required files' })
      }
    }

    const deploy = await client.deploy(NETLIFY_SITE_ID, {
      files,
      draft: false,
      message: `Deploy from builder - ${new Date().toISOString()}`
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: deploy.ssl_url || deploy.url,
        deployId: deploy.id,
        claimUrl: deploy.admin_url
      })
    }
  } catch (error) {
    console.error('Deployment error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Deployment failed' 
      })
    }
  }
}