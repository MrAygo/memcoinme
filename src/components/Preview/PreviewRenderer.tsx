import React from 'react';
import { BuilderState } from '../../types/builder';
import { SolanaTemplate } from './templates/SolanaTemplate';
import { CyberpunkTemplate } from './templates/CyberpunkTemplate';
import { applyEffects } from '../../utils/effects';

interface PreviewRendererProps {
  state: BuilderState;
}

export function PreviewRenderer({ state }: PreviewRendererProps) {
  const previewStyle = applyEffects(state.design.effects);

  return (
    <div 
      className="w-full h-full overflow-y-auto bg-black rounded-3xl relative"
      style={previewStyle}
    >
      {state.design.template === 'solana' ? (
        <SolanaTemplate state={state} />
      ) : (
        <CyberpunkTemplate state={state} />
      )}
      {state.design.customCSS && (
        <style>{state.design.customCSS}</style>
      )}
    </div>
  );
}