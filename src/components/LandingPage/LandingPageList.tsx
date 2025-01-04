import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Edit } from 'lucide-react'
import type { Tables } from '../../types/database'

interface LandingPageListProps {
  pages: Tables['landing_pages']['Row'][]
}

export function LandingPageList({ pages }: LandingPageListProps) {
  if (pages.length === 0) {
    return (
      <div className="text-center text-white/60 py-8">
        No landing pages yet. Create your first one!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <div
          key={page.id}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div>
            <h3 className="font-medium text-white">{page.title}</h3>
            <p className="text-sm text-white/60">memcoin.me/{page.slug}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              to={`/edit/${page.id}`}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Edit page"
            >
              <Edit className="w-5 h-5" />
            </Link>
            
            {page.published && (
              <a
                href={`https://memcoin.me/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="View live page"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}