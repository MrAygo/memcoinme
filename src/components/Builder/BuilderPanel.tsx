import React from 'react';
import { BuilderForm } from './BuilderForm';
import { BuilderState } from '../../types/builder';
import { PublishButton } from './PublishButton';

interface BuilderPanelProps {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
  onSave?: () => void;
  error?: string | null;
}

export function BuilderPanel({ state, onChange, onSave, error }: BuilderPanelProps) {
  return (
    <div className="p-8 h-[calc(100vh-7rem)] overflow-y-auto space-y-8 relative">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-br from-white via-white/80 to-white/40 bg-clip-text text-transparent animate-shimmer">
          Landing Page Builder
        </h1>
        <p className="text-white/60 tracking-wide">
          Customize your memecoin landing page with our intuitive builder
        </p>
      </div>
      
      {/* Form */}
      <BuilderForm state={state} onChange={onChange} />

      {/* Error Message */}
      {error && (
        <div className="text-red-400 text-center bg-red-950/50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onSave}
          disabled={!state.project.pageUrl || !state.project.tokenName}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-white to-white/90 text-black font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          Save Landing Page
        </button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}