import React from 'react';
import { BuilderState } from '../../../types/builder';
import { TokenInfo } from '../sections/TokenInfo';
import { SocialLinks } from '../sections/SocialLinks';
import { HeroSection } from '../sections/HeroSection';

interface CyberpunkTemplateProps {
  state: BuilderState;
}

export function CyberpunkTemplate({ state }: CyberpunkTemplateProps) {
  const { project, design } = state;

  // Enhanced background style with additional effects
  const getBackgroundStyle = (): React.CSSProperties => {
    switch (design.background.type) {
      case 'solid':
        return { backgroundColor: design.background.value };
      case 'gradient':
        const [startColor, endColor] = design.background.value.split(',');
        return {
          backgroundImage: `
            linear-gradient(45deg, ${startColor || design.primaryColor}, ${endColor || design.secondaryColor}),
            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)
          `
        };
      case 'image':
        return {
          backgroundImage: `url(${design.background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      case 'video':
        return { backgroundColor: '#000000' }; // Dark fallback for video
      case '3d':
        return { backgroundColor: '#000000' }; // Dark fallback for 3D
      default:
        return { backgroundColor: '#000000' };
    }
  };

  return (
    <div 
      className="min-h-full relative bg-black overflow-hidden"
      style={{
        '--accent-color': design.accentColor,
        '--primary-color': design.primaryColor,
      } as React.CSSProperties}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 animate-pulse-slow">
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{
            ...getBackgroundStyle(),
            opacity: design.background.opacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBNMjAgMjBMMjAgNDBNMjAgMjBMMCwyME0yMCAyMEwyMCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-30" />
        {design.background.type === 'solid' && (
          <div 
            className="absolute inset-0 bg-black transition-opacity"
            style={{ opacity: 1 - (design.background.opacity || 0) }}
          />
        )}
      </div>

      {/* Video Background */}
      {design.background.type === 'video' && design.background.value && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          autoPlay
          muted
          loop
          playsInline
          src={design.background.value}
          style={{ opacity: design.background.opacity }}
        />
      )}

      {/* Overlay Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/40" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 cyberpunk-content">
        <div className="cyberpunk-grid">
          <HeroSection project={project} design={design} variant="cyber" />
          <TokenInfo project={project} design={design} variant="cyber" />
          <SocialLinks project={project} socials={project.socials} accentColor={design.accentColor} variant="cyber" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}