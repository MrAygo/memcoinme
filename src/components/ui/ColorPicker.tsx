import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-white/80 ml-1">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-xl cursor-pointer bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="modern-input flex-1 bg-white/5 border-white/10 uppercase"
          spellCheck={false}
        />
      </div>
    </div>
  );
}