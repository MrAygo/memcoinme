import React from 'react';
import { ProjectDetails, DesignConfig } from '../../../types/builder';
import { Copy, ExternalLink } from 'lucide-react';

interface TokenInfoProps {
  project: ProjectDetails;
  design: DesignConfig;
  variant?: 'default' | 'cyber';
}

export function TokenInfo({ project, design, variant = 'default' }: TokenInfoProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(project.contractAddress);
  };

  const sectionClass = variant === 'cyber' 
    ? 'py-16 px-12 border-y border-white/10 bg-black/30 backdrop-blur-xl' 
    : 'py-16 px-12 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-xl';

  return (
    <section className={sectionClass}>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h3 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
            style={{ fontFamily: design.fontPrimary === 'paytone' ? 'Paytone One' :
                              design.fontPrimary === 'space-grotesk' ? 'Space Grotesk' :
                              design.fontPrimary === 'outfit' ? 'Outfit' :
                              design.fontPrimary === 'jakarta' ? 'Plus Jakarta Sans' :
                              design.fontPrimary === 'inter' ? 'Inter' :
                              design.fontPrimary === 'roboto-mono' ? 'Roboto Mono' : 'Inter' }}
          >
            Token Details
          </h3>
          
          {/* Contract Address */}
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 gap-4"
          >
            <span className="font-medium text-white/80"
                  style={{ fontFamily: design.fontSecondary === 'jakarta' ? 'Plus Jakarta Sans' :
                                     design.fontSecondary === 'outfit' ? 'Outfit' :
                                     design.fontSecondary === 'inter' ? 'Inter' :
                                     design.fontSecondary === 'space-grotesk' ? 'Space Grotesk' :
                                     design.fontSecondary === 'roboto-mono' ? 'Roboto Mono' : 'Plus Jakarta Sans' }}>
              Contract Address
            </span>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <code 
                className="px-4 py-2 rounded-xl bg-black/30 font-mono text-sm text-white/60 w-full sm:w-auto overflow-x-auto whitespace-nowrap"
              >
                {project.contractAddress}
              </code>
              <button 
                onClick={handleCopy}
                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <Copy className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

          {/* Purchase Link */}
          {project.purchaseLink && (
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 gap-4"
            >
              <span className="font-medium text-white/80">Purchase {project.tokenSymbol || 'Token'}</span>
              <a
                href={project.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
              >
                <span>Buy Now</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}