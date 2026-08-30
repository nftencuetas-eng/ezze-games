const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, '..', 'client', 'assets', 'covers');
if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

const svgs = {
  'slingshot-rescue': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#86efac" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🎯</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">SLINGSHOT RESCUE</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#0f172a" letter-spacing="6">TIRACHINAS Y FISICAS</text>
</svg>`,

  'magic-draw': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0369a1" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">✏️🚗</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="68" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">MAGIC DRAW &amp; DRIVE</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#facc15" letter-spacing="6">DIBUJA TU CAMINO Y PUENTES</text>
</svg>`,

  'virtual-pet': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#831843" />
      <stop offset="50%" stop-color="#db2777" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🐱💖</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#fef08a" filter="url(#glow)">MI MASCOTA VIRTUAL</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">CUIDA, ALIMENTA Y VISTE</text>
</svg>`,

  'party-duels': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🥊🔴🔵</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="68" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">DUELO 2 JUGADORES</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#ef4444" letter-spacing="6">1 VS 1 EN LA MISMA PANTALLA</text>
</svg>`
};

for (const [slug, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(coversDir, `${slug}.svg`), content.trim());
  console.log(`✓ Portada HD generada: ${slug}`);
}
