import { DesignConfig } from '../types/builder';

export function applyEffects(effects?: DesignConfig['effects']): React.CSSProperties {
  if (!effects) return {};

  const styles: React.CSSProperties = {};

  if (effects.blur) {
    styles.backdropFilter = 'blur(8px)';
  }

  if (effects.grain) {
    styles.backgroundImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
    styles.opacity = '0.05';
  }

  if (effects.glow) {
    styles.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1)';
  }

  if (effects.parallax) {
    styles.transform = 'perspective(1000px)';
    styles.transformStyle = 'preserve-3d';
  }

  return styles;
}