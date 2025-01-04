import React from 'react';
import { BuilderState } from '../../../types/builder';
import { TokenInfo } from '../sections/TokenInfo';
import { SocialLinks } from '../sections/SocialLinks';
import { HeroSection } from '../sections/HeroSection';

interface SolanaTemplateProps {
  state: BuilderState;
}

export function SolanaTemplate({ state }: SolanaTemplateProps) {
  const { project, design } = state;
  
  const getBackgroundStyle = (): React.CSSProperties => {
    switch (design.background.type) {
      case 'solid':
        return { backgroundColor: design.background.value };
      case 'gradient':
        const [startColor, endColor] = design.background.value.split(',');
        return {
          backgroundImage: `linear-gradient(to right, ${startColor || design.primaryColor}, ${endColor || design.secondaryColor})`
        };
      case 'image':
        return {
          backgroundImage: `url(${design.background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      case 'video':
        return { backgroundColor: design.primaryColor }; // Fallback color for video background
      case '3d':
        return { backgroundColor: design.primaryColor }; // Fallback color for 3D background
      default:
        return { backgroundColor: design.primaryColor };
    }
  };
  
  return (
    <div className="min-h-full relative" style={{ color: design.primaryColor }}>
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{
            ...getBackgroundStyle(),
            opacity: design.background.opacity
          }}
        />
      </div>

      {/* Video Background */}
      {design.background.type === 'video' && design.background.value && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          src={design.background.value}
          style={{ opacity: design.background.opacity }}
        />
      )}

      {/* Content Layer */}
      <div className="relative z-10">
        <HeroSection project={project} design={design} />
        <TokenInfo project={project} design={design} />
        <SocialLinks project={project} socials={project.socials} accentColor={design.accentColor} />
      </div>
    </div>
  );
}