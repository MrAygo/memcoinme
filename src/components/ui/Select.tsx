import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-white/80 ml-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="modern-input w-full appearance-none bg-white/5 border-white/10 cursor-pointer text-white [&>option]:bg-gray-900 [&>option]:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}