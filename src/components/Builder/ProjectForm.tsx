import React from 'react';
import { ProjectDetails } from '../../types/builder';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface ProjectFormProps {
  project: ProjectDetails;
  onChange: (project: ProjectDetails) => void;
}

export function ProjectForm({ project, onChange }: ProjectFormProps) {
  const handleChange = (field: keyof ProjectDetails, value: any) => {
    onChange({ ...project, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Project Details</h2>
        <div className="space-y-4">
          <Input
            label="Page URL"
            prefix="memecoin.me/"
            value={project.pageUrl}
            onChange={(e) => handleChange('pageUrl', e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Token Name"
              value={project.tokenName}
              onChange={(e) => handleChange('tokenName', e.target.value)}
            />
            <Input
              label="Token Symbol"
              value={project.tokenSymbol}
              onChange={(e) => handleChange('tokenSymbol', e.target.value)}
            />
          </div>

          <Input
            label="Description"
            multiline
            maxLength={500}
            value={project.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contract Address"
              value={project.contractAddress}
              onChange={(e) => handleChange('contractAddress', e.target.value)}
            />
            <Select
              label="Blockchain"
              value={project.blockchain}
              onChange={(value) => handleChange('blockchain', value)}
              options={[
                { label: 'Ethereum', value: 'ethereum' },
                { label: 'BSC', value: 'bsc' },
                { label: 'Solana', value: 'solana' },
                { label: 'Polygon', value: 'polygon' }
              ]}
            />
          </div>

          <Input
            label="Purchase Link"
            value={project.purchaseLink}
            onChange={(e) => handleChange('purchaseLink', e.target.value)}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Twitter"
                value={project.socials.twitter}
                onChange={(e) => handleChange('socials', { ...project.socials, twitter: e.target.value })}
              />
              <Input
                label="Telegram"
                value={project.socials.telegram}
                onChange={(e) => handleChange('socials', { ...project.socials, telegram: e.target.value })}
              />
              <Input
                label="Discord"
                value={project.socials.discord}
                onChange={(e) => handleChange('socials', { ...project.socials, discord: e.target.value })}
              />
              <Input
                label="Website"
                value={project.socials.website}
                onChange={(e) => handleChange('socials', { ...project.socials, website: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}