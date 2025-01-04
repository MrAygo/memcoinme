export interface ProjectDetails {
  websiteName?: string;
  pageUrl: string;
  tokenName: string;
  tokenSymbol: string;
  description: string;
  contractAddress: string;
  blockchain?: string;
  purchaseLink: string;
  logo?: string;
  meme?: string;
  socials: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    website?: string;
  };
}

export type Background = {
  type: 'solid' | 'gradient' | 'image' | 'video' | '3d';
  value: string;
  opacity: number;
};

export interface DesignConfig {
  template: 'solana' | 'cyberpunk';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontPrimary: string;
  fontSecondary: string;
  background: Background;
  effects?: {
    blur?: boolean;
    grain?: boolean;
    glow?: boolean;
    parallax?: boolean;
  };
  customCSS?: string;
}

export interface BuilderState {
  project: ProjectDetails;
  design: DesignConfig;
}