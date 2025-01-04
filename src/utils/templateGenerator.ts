import { BuilderState } from '../types/builder';

export function generateTemplate(state: BuilderState) {
  const html = generateHTML(state);
  const css = generateCSS(state);
  return { html, css };
}

function generateHTML(state: BuilderState) {
  const { project, design } = state;
  const title = project.websiteName || project.tokenName || 'Memecoin Landing Page';
  const description = project.description || 'Welcome to our memecoin project';

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Paytone+One&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="--primary-color: ${design.primaryColor}; --secondary-color: ${design.secondaryColor}; --accent-color: ${design.accentColor}">
    <main class="template-${design.template}">
      ${generateContent(state)}
    </main>
  </body>
</html>`;

  return html;
}

function generateContent(state: BuilderState) {
  const { project, design } = state;
  
  return `
    <div class="hero-section" style="background: ${getBackgroundStyle(design.background)}">
      ${project.logo ? `<img src="${project.logo}" alt="${project.tokenName || 'Token'} logo" class="logo" loading="eager">` : ''}
      <h1>${project.tokenName || 'Token Name'}</h1>
      <h2>${project.tokenSymbol || 'SYMBOL'}</h2>
      <p>${project.description || 'Welcome to our memecoin project'}</p>
      ${project.purchaseLink ? `
        <a href="${project.purchaseLink}" class="cta-button">
          Buy ${project.tokenSymbol || 'Now'}
        </a>
      ` : ''}
      ${project.meme ? `<img src="${project.meme}" alt="Featured meme" class="meme-image" loading="lazy">` : ''}
      ${generateSocialLinks(project.socials)}
    </div>
  `;
}

function generateCSS(state: BuilderState) {
  const { design } = state;
  
  return `
/* Base styles */
:root {
  --primary-color: ${design.primaryColor};
  --secondary-color: ${design.secondaryColor};
  --accent-color: ${design.accentColor};
  --primary-font: ${getFontFamily(design.fontPrimary)};
  --secondary-font: ${getFontFamily(design.fontSecondary)};
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: var(--secondary-font);
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

/* Layout */
.hero-section {
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
}

/* Logo */
.logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
}

/* Typography */
h1 {
  font-family: var(--primary-font);
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--secondary-color), rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  color: transparent;
}

h2 {
  font-family: var(--secondary-font);
  font-size: 2.5rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
}

p {
  font-family: var(--secondary-font);
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  color: rgba(255,255,255,0.8);
}

/* Meme Image */
.meme-image {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Modern scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  transition: background 0.3s;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* CTA Button */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-family: var(--secondary-font);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--primary-color);
  background: var(--secondary-color);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(255,255,255,0.2);
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  color: var(--secondary-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}
`;
}

function getBackgroundStyle(background: Background) {
  switch (background.type) {
    case 'solid':
      return background.value;
    case 'gradient':
      const [start, end] = background.value.split(',');
      return `linear-gradient(45deg, ${start}, ${end})`;
    case 'image':
      return `url(${background.value})`;
    default:
      return '#000000';
  }
}

function getFontFamily(font: string) {
  const fonts = {
    paytone: "'Paytone One', sans-serif",
    'space-grotesk': "'Space Grotesk', sans-serif",
    outfit: "'Outfit', sans-serif",
    jakarta: "'Plus Jakarta Sans', sans-serif",
    inter: "'Inter', sans-serif",
    'roboto-mono': "'Roboto Mono', monospace"
  };
  return fonts[font] || fonts.inter;
}

function generateSocialLinks(socials: Record<string, string>) {
  return Object.entries(socials)
    .filter(([_, url]) => url)
    .map(([platform, url]) => `
      <a href="${url}" class="social-link ${platform}" target="_blank" rel="noopener noreferrer">
        ${platform}
      </a>
    `).join('');
}