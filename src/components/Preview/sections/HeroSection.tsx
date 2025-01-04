import React from 'react';
import { ProjectDetails, DesignConfig } from '../../../types/builder';
import { Rocket } from 'lucide-react';

interface HeroSectionProps {
  project: ProjectDetails;
  design: DesignConfig;
  variant?: 'default' | 'cyber';
}

export function HeroSection({ project, design, variant = 'default' }: HeroSectionProps) {
  const containerClass = variant === 'cyber'
    ? 'flex flex-col items-center justify-center min-h-[60vh] text-center p-12 border-b border-white/10 bg-black/30 backdrop-blur-xl'
    : 'flex flex-col items-center justify-center min-h-[60vh] text-center p-12 bg-gradient-to-b from-black/0 to-black/30 backdrop-blur-xl';

  return (
    <section className={containerClass}>
      {project.logo && (
        <img 
          src={project.logo} 
          alt={`${project.tokenName} logo`}
          className="w-32 h-32 mb-8 rounded-full shadow-2xl"
        />
      )}
      
      <h1 
        className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40 animate-shimmer"
        style={{ fontFamily: design.fontPrimary === 'paytone' ? 'Paytone One' :
                            design.fontPrimary === 'space-grotesk' ? 'Space Grotesk' :
                            design.fontPrimary === 'outfit' ? 'Outfit' :
                            design.fontPrimary === 'jakarta' ? 'Plus Jakarta Sans' :
                            design.fontPrimary === 'inter' ? 'Inter' :
                            design.fontPrimary === 'roboto-mono' ? 'Roboto Mono' : 'Inter' }}
      >
        {project.tokenName || 'Token Name'}
      </h1>
      
      <h2 
        className="text-5xl mb-12 font-light tracking-wider text-white/80"
        style={{ fontFamily: design.fontSecondary === 'jakarta' ? 'Plus Jakarta Sans' :
                            design.fontSecondary === 'outfit' ? 'Outfit' :
                            design.fontSecondary === 'inter' ? 'Inter' :
                            design.fontSecondary === 'space-grotesk' ? 'Space Grotesk' :
                            design.fontSecondary === 'roboto-mono' ? 'Roboto Mono' : 'Plus Jakarta Sans' }}
      >
        ${project.tokenSymbol || 'SYMBOL'}
      </h2>
      
      <p 
        className="max-w-2xl mb-12 text-xl leading-relaxed text-white/60"
        style={{ fontFamily: design.fontSecondary === 'jakarta' ? 'Plus Jakarta Sans' :
                            design.fontSecondary === 'outfit' ? 'Outfit' :
                            design.fontSecondary === 'inter' ? 'Inter' :
                            design.fontSecondary === 'space-grotesk' ? 'Space Grotesk' :
                            design.fontSecondary === 'roboto-mono' ? 'Roboto Mono' : 'Plus Jakarta Sans' }}
      >
        {project.description || 'Enter your token description'}
      </p>

      {project.purchaseLink && (
        <a
          href={project.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-2xl inline-flex items-center gap-3 text-white text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/10"
          style={{ backgroundColor: design.accentColor }}
        >
          <Rocket className="w-6 h-6 mr-2" />
          Buy {project.tokenSymbol || 'Now'}
        </a>
      )}
      
      {project.meme && (
        <div className="mt-16 max-w-2xl mx-auto">
          <img
            src={project.meme}
            alt="Featured meme"
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}