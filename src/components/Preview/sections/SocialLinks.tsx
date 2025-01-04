import React from 'react';
import { Twitter, MessageCircle, Globe } from 'lucide-react';

interface SocialLinksProps {
  project: ProjectDetails;
  socials: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    website?: string;
  };
  accentColor: string;
  variant?: 'default' | 'cyber';
}

export function SocialLinks({ project, socials, accentColor, variant = 'default' }: SocialLinksProps) {
  const containerClass = variant === 'cyber'
    ? 'py-16 px-12 border-t border-white/10 bg-black/30 backdrop-blur-xl'
    : 'py-16 px-12 bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-xl';

  const linkClass = variant === 'cyber'
    ? 'px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center space-x-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/10'
    : 'px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center space-x-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/10';

  return (
    <footer className={containerClass}>
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Connect With {project.tokenSymbol || 'Us'}
        </h3>
        <div className="flex flex-wrap gap-6">
          {socials.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Twitter className="w-5 h-5 text-white" />
              <span className="text-white">Twitter</span>
            </a>
          )}
          {socials.telegram && (
            <a
              href={socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={{ backgroundColor: accentColor }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white">Telegram</span>
            </a>
          )}
          {socials.discord && (
            <a
              href={socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={{ backgroundColor: accentColor }}>
              <svg 
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
              <span className="text-white">Discord</span>
            </a>
          )}
          {socials.website && (
            <a
              href={socials.website}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={{ backgroundColor: accentColor }}
            >
              <Globe className="w-5 h-5 text-white" />
              <span className="text-white">Website</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}