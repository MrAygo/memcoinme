import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { LandingPageList } from '../components/LandingPage/LandingPageList'
import { useAuth } from '../contexts/AuthContext'
import { getUserLandingPages } from '../services/landing-pages'
import type { Tables } from '../types/database'

export function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [pages, setPages] = React.useState<Tables['landing_pages']['Row'][]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchPages() {
      if (!user) return
      try {
        const data = await getUserLandingPages()
        setPages(data)
      } catch (error) {
        console.error('Failed to fetch pages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [user])

  if (!user) {
    return (
      <div className="text-center py-12">
        Please sign in to view your landing pages.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        Loading your landing pages...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Landing Pages</h1>
        <button
          onClick={() => navigate('/new')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Page
        </button>
      </div>

      <LandingPageList pages={pages} />
    </div>
  )
}