import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  prefix?: string;
  multiline?: boolean;
}

export function Input({ label, prefix, multiline, className = '', ...props }: InputProps) {
  const inputClasses = 'modern-input w-full bg-white/5 border-white/10';
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-white/80 ml-1">{label}</label>
      <div className="relative flex">
        {prefix && (
          <span className="flex items-center px-4 rounded-l-2xl border-r border-white/10 bg-white/5 text-white/60">
            {prefix}
          </span>
        )}
        {multiline ? (
          <textarea
            {...props}
            className={`${inputClasses} ${className}`}
            style={{ minHeight: '100px' }}
          />
        ) : (
          <input
            {...props}
            className={`${inputClasses} ${prefix ? 'rounded-l-none' : ''} ${className}`}
          />
        )}
      </div>
    </div>
  );
}