const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, '..', 'client', 'assets', 'covers');
if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

const svgs = {
  'tower-game': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#fb923c" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🏗️🏠</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#fff" filter="url(#glow)">TOWER MASTER 3D</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fef08a" letter-spacing="6">TOWER GAME OFICIAL</text>
</svg>`,

  'clumsy-bird': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#7dd3fc" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🐦☁️</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">CLUMSY BIRD HD</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">MOTOR MELONJS OFICIAL</text>
</svg>`,

  'hexgl': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#0891b2" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🏎️⚡</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">HEXGL 3D RACING</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#facc15" letter-spacing="6">CARRERAS FUTURISTAS 3D</text>
</svg>`,

  'hextris': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4c1d95" />
      <stop offset="50%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🔷✨</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">HEXTRIS ORIGINAL</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#f3e8ff" letter-spacing="6">HEXAGONAL PUZZLE</text>
</svg>`,

  'pacman': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🟡👻</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">PAC-MAN ARCADE HD</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#38bdf8" letter-spacing="6">EL CLASICO RETRO OFICIAL</text>
</svg>`,

  'puzzle-2048': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309" />
      <stop offset="50%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🔢⭐</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#fff" filter="url(#glow)">2048 CIRULLI MASTER</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fef08a" letter-spacing="6">EL JUEGO VIRAL ORIGINAL</text>
</svg>`,

  'flappy-2048': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="50%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#22c55e" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🐦🔢</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="70" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">FLAPPY 2048 HD</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">FUSION VIRAL DE HABILIDAD</text>
</svg>`
};

for (const [slug, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(coversDir, `${slug}.svg`), content.trim());
  console.log(`✓ Portada HD oficial: ${slug}`);
}
