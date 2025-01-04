import React from 'react';
import { DesignConfig } from '../../types/builder';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ColorPicker } from '../ui/ColorPicker';

interface DesignFormProps {
  design: DesignConfig;
  onChange: (design: DesignConfig) => void;
}

export function DesignForm({ design, onChange }: DesignFormProps) {
  const handleChange = (field: keyof DesignConfig, value: any) => {
    onChange({ ...design, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Design Preferences</h2>
        <div className="space-y-4">
          <Select
            label="Template"
            value={design.template}
            onChange={(value) => handleChange('template', value)}
            options={[
              { label: 'Solana-Inspired', value: 'solana' },
              { label: 'Cyberpunk', value: 'cyberpunk' }
            ]}
          />

          <div className="grid grid-cols-3 gap-4">
            <ColorPicker
              label="Primary Color"
              value={design.primaryColor}
              onChange={(value) => handleChange('primaryColor', value)}
            />
            <ColorPicker
              label="Secondary Color"
              value={design.secondaryColor}
              onChange={(value) => handleChange('secondaryColor', value)}
            />
            <ColorPicker
              label="Accent Color"
              value={design.accentColor}
              onChange={(value) => handleChange('accentColor', value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Primary Font"
              value={design.fontPrimary}
              onChange={(value) => handleChange('fontPrimary', value)}
              options={[
                { label: 'Inter', value: 'inter' },
                { label: 'Space Grotesk', value: 'space-grotesk' },
                { label: 'Roboto Mono', value: 'roboto-mono' }
              ]}
            />
            <Select
              label="Secondary Font"
              value={design.fontSecondary}
              onChange={(value) => handleChange('fontSecondary', value)}
              options={[
                { label: 'Inter', value: 'inter' },
                { label: 'Space Grotesk', value: 'space-grotesk' },
                { label: 'Roboto Mono', value: 'roboto-mono' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo</label>
            <input
              type="file"
              accept="image/png,image/svg+xml"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size <= 2 * 1024 * 1024) {
                  handleChange('logo', file);
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Max size: 2MB (PNG/SVG)</p>
          </div>

          <div>
            <Select
              label="Background Type"
              value={design.background.type}
              onChange={(value) => handleChange('background', { ...design.background, type: value })}
              options={[
                { label: 'Solid Color', value: 'solid' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
                { label: '3D Animation', value: '3d' }
              ]}
            />
            {design.background.type === 'solid' && (
              <ColorPicker
                label="Background Color"
                value={design.background.value}
                onChange={(value) => handleChange('background', { ...design.background, value })}
              />
            )}
            {['image', 'video'].includes(design.background.type) && (
              <input
                type="file"
                accept={design.background.type === 'image' ? 'image/*' : 'video/*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const maxSize = design.background.type === 'image' ? 5 : 15;
                    if (file.size <= maxSize * 1024 * 1024) {
                      handleChange('background', { ...design.background, value: URL.createObjectURL(file) });
                    }
                  }
                }}
                className="w-full mt-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}