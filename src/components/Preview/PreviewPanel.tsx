import React from 'react';
import { PreviewRenderer } from './PreviewRenderer';
import { BuilderState } from '../../types/builder';

interface PreviewPanelProps {
  state: BuilderState;
}

export function PreviewPanel({ state }: PreviewPanelProps) {
  return (
    <div className="h-[calc(100vh-7rem)] overflow-hidden rounded-3xl relative">
      {/* Preview Window */}
      <PreviewRenderer state={state} />
      
      {/* Preview Frame */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}