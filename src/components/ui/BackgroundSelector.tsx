import React from 'react';
import { Select } from './Select';
import { ColorPicker } from './ColorPicker';
import { Background } from '../../types/builder';

interface BackgroundSelectorProps {
  value: Background;
  onChange: (background: Background) => void;
}

export function BackgroundSelector({ value, onChange }: BackgroundSelectorProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    const maxSize = value.type === 'image' ? 5 : 15; // 5MB for images, 15MB for videos
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    onChange({ ...value, value: objectUrl });
  };

  return (
    <div className="space-y-4">
      <Select
        label="Background Type"
        value={value.type}
        onChange={(type) => onChange({ ...value, type: type as Background['type'] })}
        options={[
          { label: 'Solid Color', value: 'solid' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Image', value: 'image' },
          { label: 'Video', value: 'video' },
          { label: '3D Animation', value: '3d' }
        ]}
      />

      {value.type === 'solid' && (
        <div className="space-y-4">
          <ColorPicker
            label="Background Color"
            value={value.value}
            onChange={(newValue) => onChange({ ...value, value: newValue })}
          />
          <BackgroundControls value={value} onChange={onChange} />
        </div>
      )}

      {value.type === 'gradient' && (
        <div className="space-y-2">
          <ColorPicker
            label="Start Color"
            value={value.value.split(',')[0] || '#ffffff'}
            onChange={(newValue) => onChange({ ...value, value: `${newValue},${value.value.split(',')[1] || '#000000'}` })}
          />
          <ColorPicker
            label="End Color"
            value={value.value.split(',')[1] || '#000000'}
            onChange={(newValue) => onChange({ ...value, value: `${value.value.split(',')[0] || '#ffffff'},${newValue}` })}
          />
        </div>
      )}

      {['image', 'video', '3d'].includes(value.type) && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/80 ml-1">
            Upload {value.type === 'image' ? 'Image' : value.type === 'video' ? 'Video' : '3D Model'}
          </label>
          <input
            type="file"
            accept={
              value.type === 'image' 
                ? 'image/*' 
                : value.type === 'video'
                ? 'video/*'
                : '.glb,.gltf'
            }
            onChange={handleFileChange}
            className="modern-input w-full bg-white/5 border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20"
          />
          <p className="text-sm text-white/40 ml-1">
            Max size: {value.type === 'image' ? '5MB' : '15MB'}
          </p>
          <BackgroundControls value={value} onChange={onChange} />
          {value.value && (
            <div className="mt-2">
              {value.type === 'image' && (
                <img 
                  src={value.value} 
                  alt="Background preview" 
                  className="max-w-full h-32 object-cover rounded-xl border border-white/10"
                />
              )}
              {value.type === 'video' && (
                <video 
                  src={value.value} 
                  className="max-w-full h-32 object-cover rounded-xl border border-white/10"
                  controls
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface BackgroundControlsProps {
  value: Background;
  onChange: (background: Background) => void;
}

function BackgroundControls({ value, onChange }: BackgroundControlsProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80 ml-1">
        Background Visibility
      </label>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80 ml-1">
          Opacity
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(value.opacity * 100)}
            onChange={(e) => onChange({ ...value, opacity: Number(e.target.value) / 100 })}
            className="w-full accent-white/80"
          />
          <span className="text-sm text-white/60 tabular-nums w-12">
            {Math.round(value.opacity * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}