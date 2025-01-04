import React from 'react';
import { BuilderState } from '../../types/builder';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ColorPicker } from '../ui/ColorPicker';
import { BackgroundSelector } from '../ui/BackgroundSelector';

interface BuilderFormProps {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
}

export function BuilderForm({ state, onChange }: BuilderFormProps) {
  const handleProjectChange = (field: string, value: any) => {
    onChange({
      ...state,
      project: { ...state.project, [field]: value }
    });
  };

  const handleDesignChange = (field: string, value: any) => {
    onChange({
      ...state,
      design: { ...state.design, [field]: value }
    });
  };

  const handleSocialChange = (platform: string, value: string) => {
    handleProjectChange('socials', { ...state.project.socials, [platform]: value });
  };

  return (
    <div className="space-y-8">
      {/* Project Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white/90">Project Details</h2>
        <div className="space-y-4">
          <Input
            label="Website Name"
            value={state.project.websiteName || ''}
            onChange={(e) => handleProjectChange('websiteName', e.target.value)}
            placeholder="e.g., Your Project Name"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80 ml-1">
              Token Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size <= 2 * 1024 * 1024) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleProjectChange('logo', reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="modern-input w-full bg-white/5 border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            <p className="text-sm text-white/40 ml-1">Max size: 2MB</p>
          </div>

          <Input
            label="Page URL"
            prefix="memcoin.me/"
            placeholder="your-token-name"
            value={state.project.pageUrl}
            onChange={(e) => handleProjectChange('pageUrl', e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Token Name"
              value={state.project.tokenName}
              placeholder="e.g., Memecoin"
              onChange={(e) => handleProjectChange('tokenName', e.target.value)}
            />
            <Input
              label="Token Symbol"
              value={state.project.tokenSymbol}
              placeholder="e.g., MEME"
              onChange={(e) => handleProjectChange('tokenSymbol', e.target.value)}
            />
          </div>

          <Input
            label="Description"
            multiline
            maxLength={500}
            placeholder="A brief overview of your token..."
            value={state.project.description}
            onChange={(e) => handleProjectChange('description', e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80 ml-1">
              Featured Meme/Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size <= 5 * 1024 * 1024) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleProjectChange('meme', reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="modern-input w-full bg-white/5 border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            <p className="text-sm text-white/40 ml-1">Max size: 5MB</p>
          </div>
          <Input
            label="Contract Address"
            value={state.project.contractAddress}
            placeholder="0x..."
            onChange={(e) => handleProjectChange('contractAddress', e.target.value)}
          />

          <Input
            label="Purchase Link"
            value={state.project.purchaseLink}
            placeholder="https://..."
            onChange={(e) => handleProjectChange('purchaseLink', e.target.value)}
          />

          <Select
            label="Blockchain"
            value={state.project.blockchain || 'ethereum'}
            onChange={(value) => handleProjectChange('blockchain', value)}
            options={[
              { label: 'Ethereum', value: 'ethereum' },
              { label: 'BSC', value: 'bsc' },
              { label: 'Solana', value: 'solana' },
              { label: 'Polygon', value: 'polygon' },
              { label: 'Arbitrum', value: 'arbitrum' },
              { label: 'Base', value: 'base' }
            ]}
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white/90">Social Links</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Twitter"
            value={state.project.socials.twitter || ''}
            placeholder="https://twitter.com/..."
            onChange={(e) => handleSocialChange('twitter', e.target.value)}
          />
          <Input
            label="Telegram"
            value={state.project.socials.telegram || ''}
            placeholder="https://t.me/..."
            onChange={(e) => handleSocialChange('telegram', e.target.value)}
          />
          <Input
            label="Discord"
            value={state.project.socials.discord || ''}
            placeholder="https://discord.gg/..."
            onChange={(e) => handleSocialChange('discord', e.target.value)}
          />
          <Input
            label="Website"
            value={state.project.socials.website || ''}
            placeholder="https://..."
            onChange={(e) => handleSocialChange('website', e.target.value)}
          />
        </div>
      </section>

      {/* Design Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white/90">Design</h2>
        <div className="space-y-4">
          <Select
            label="Template"
            value={state.design.template}
            onChange={(value) => handleDesignChange('template', value)}
            options={[
              { label: 'Solana-Inspired', value: 'solana' },
              { label: 'Cyberpunk', value: 'cyberpunk' }
            ]}
          />

          <div className="grid grid-cols-1 gap-4">
            <ColorPicker
              label="Primary Color"
              value={state.design.primaryColor}
              onChange={(value) => handleDesignChange('primaryColor', value)}
            />
            <ColorPicker
              label="Secondary Color"
              value={state.design.secondaryColor}
              onChange={(value) => handleDesignChange('secondaryColor', value)}
            />
            <ColorPicker
              label="Accent Color"
              value={state.design.accentColor}
              onChange={(value) => handleDesignChange('accentColor', value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Primary Font"
              value={state.design.fontPrimary}
              onChange={(value) => handleDesignChange('fontPrimary', value)}
              options={[
                { label: 'Paytone One', value: 'paytone' },
                { label: 'Space Grotesk', value: 'space-grotesk' },
                { label: 'Outfit', value: 'outfit' },
                { label: 'Plus Jakarta Sans', value: 'jakarta' },
                { label: 'Inter', value: 'inter' },
                { label: 'Roboto Mono', value: 'roboto-mono' }
              ]}
            />
            <Select
              label="Secondary Font"
              value={state.design.fontSecondary}
              onChange={(value) => handleDesignChange('fontSecondary', value)}
              options={[
                { label: 'Plus Jakarta Sans', value: 'jakarta' },
                { label: 'Outfit', value: 'outfit' },
                { label: 'Inter', value: 'inter' },
                { label: 'Space Grotesk', value: 'space-grotesk' },
                { label: 'Roboto Mono', value: 'roboto-mono' }
              ]}
            />
          </div>

          <BackgroundSelector
            value={state.design.background}
            onChange={(background) => handleDesignChange('background', background)}
          />
          
          {/* Effects Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white/80">Effects</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.design.effects?.blur}
                  onChange={(e) => handleDesignChange('effects', {
                    ...state.design.effects,
                    blur: e.target.checked
                  })}
                  className="rounded border-white/20 bg-white/5 text-white"
                />
                <span className="text-white/80">Blur Effect</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.design.effects?.grain}
                  onChange={(e) => handleDesignChange('effects', {
                    ...state.design.effects,
                    grain: e.target.checked
                  })}
                  className="rounded border-white/20 bg-white/5 text-white"
                />
                <span className="text-white/80">Grain Effect</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.design.effects?.glow}
                  onChange={(e) => handleDesignChange('effects', {
                    ...state.design.effects,
                    glow: e.target.checked
                  })}
                  className="rounded border-white/20 bg-white/5 text-white"
                />
                <span className="text-white/80">Glow Effect</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.design.effects?.parallax}
                  onChange={(e) => handleDesignChange('effects', {
                    ...state.design.effects,
                    parallax: e.target.checked
                  })}
                  className="rounded border-white/20 bg-white/5 text-white"
                />
                <span className="text-white/80">Parallax Effect</span>
              </label>
            </div>
          </div>

          {/* Custom CSS */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80 ml-1">
              Custom CSS
            </label>
            <textarea
              value={state.design.customCSS || ''}
              onChange={(e) => handleDesignChange('customCSS', e.target.value)}
              placeholder="Add your custom CSS here..."
              className="modern-input w-full h-32 font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
}