/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'paytone': ['Paytone One', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'cyber-grid': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBNMjAgMjBMMjAgNDBNMjAgMjBMMCwyME0yMCAyMEwyMCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')",
      },
    },
  },
  plugins: [],
};
