import { supabase } from '../lib/supabase-client'
import { deployToNetlify } from './deployment'
import { env } from '../config/env'
import type { BuilderState } from '../types/builder'
import { generateTemplate } from '../utils/templateGenerator'

export async function createLandingPage(title: string, slug: string, content: BuilderState) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Validate required fields
  if (!title || !slug || !content) {
    throw new Error('Missing required fields')
  }

  // Generate template files first to validate
  const { html, css } = generateTemplate(content)
  
  // Validate generated files
  if (!html?.trim() || !css?.trim()) {
    throw new Error('Failed to generate template files')
  }

  // Validate HTML structure
  if (!html.includes('<!DOCTYPE html>')) {
    throw new Error('Invalid HTML template generated')
  }

  // Create the landing page record
  let pageData;
  const { data, error } = await supabase
    .from('landing_pages')
    .insert({
      title,
      slug,
      content,
      user_id: user.id,
      published: false
    })
    .select()
    .single()

  if (error) throw error
  pageData = data
  
  // Deploy to Netlify
  try {
    console.log('Starting deployment with content:', {
      title,
      slug,
      hasHtml: !!html?.trim(),
      hasCss: !!css?.trim()
    })
    
    const deployResult = await deployToNetlify({
      state: content,
    })
    
    // Update the landing page with published status after successful deployment
    await supabase
      .from('landing_pages')
      .update({ 
        published: true,
        deploy_url: deployResult.url || null,
        deploy_id: deployResult.deployId || null,
        deploy_error: null
      })
      .eq('id', pageData.id)
    
    pageData.published = true
    pageData.deploy_url = deployResult.url
    pageData.deploy_id = deployResult.deployId
  } catch (deployError) {
    console.error('Deployment error:', deployError)
    // Still save the page even if deployment fails
    await supabase
      .from('landing_pages')
      .update({ 
        published: false,
        deploy_error: deployError instanceof Error ? deployError.message : 'Unknown deployment error',
        deploy_url: null,
        deploy_id: null
      })
      .eq('id', pageData.id)
    
    throw deployError instanceof Error ? deployError : new Error('Unknown deployment error')
  }
  return pageData
}

export async function updateLandingPage(id: string, content: BuilderState, published = false) {
  const { data, error } = await supabase
    .from('landing_pages')
    .update({ content, published })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLandingPage(id: string) {
  const { data, error } = await supabase
    .from('landing_pages')
    .select()
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getUserLandingPages() {
  const { data, error } = await supabase
    .from('landing_pages')
    .select()
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}