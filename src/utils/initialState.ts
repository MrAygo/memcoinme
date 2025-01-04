import { BuilderState } from '../types/builder';

export const initialState: BuilderState = {
  project: {
    websiteName: '',
    pageUrl: '',
    tokenName: '',
    tokenSymbol: '',
    description: '',
    contractAddress: '',
    blockchain: 'ethereum',
    purchaseLink: '',
    socials: {}
  },
  design: {
    template: 'solana',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    accentColor: '#6366f1',
    fontPrimary: 'paytone',
    fontSecondary: 'jakarta',
    background: {
      type: 'solid',
      value: '#ffffff',
      opacity: 0.2,
    },
    effects: {
      blur: false,
      grain: false,
      glow: false,
      parallax: false
    },
    customCSS: ''
  }
};