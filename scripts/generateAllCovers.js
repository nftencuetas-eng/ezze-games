const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, '..', 'client', 'assets', 'covers');
if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

const svgs = {
  'clumsy-bird': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="60%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#bae6fd" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#eab308" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Pipes -->
  <rect x="220" y="0" width="120" height="260" fill="#22c55e" stroke="#15803d" stroke-width="8"/>
  <rect x="200" y="220" width="160" height="50" fill="#22c55e" stroke="#15803d" stroke-width="8"/>
  <rect x="940" y="440" width="120" height="280" fill="#22c55e" stroke="#15803d" stroke-width="8"/>
  <rect x="920" y="440" width="160" height="50" fill="#22c55e" stroke="#15803d" stroke-width="8"/>
  <!-- Bird -->
  <circle cx="640" cy="300" r="70" fill="url(#gold)" stroke="#000" stroke-width="8" filter="url(#glow)"/>
  <circle cx="670" cy="275" r="22" fill="#fff" stroke="#000" stroke-width="6"/>
  <circle cx="676" cy="275" r="10" fill="#000"/>
  <polygon points="690,300 750,315 690,330" fill="#ef4444" stroke="#000" stroke-width="6"/>
  <!-- Title -->
  <text x="640" y="480" font-family="'Bungee', sans-serif" font-size="76" font-weight="900" text-anchor="middle" fill="#000" dy="6">CLUMSY BIRD</text>
  <text x="640" y="480" font-family="'Bungee', sans-serif" font-size="76" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">CLUMSY BIRD</text>
  <text x="640" y="550" font-family="'Bungee', sans-serif" font-size="32" text-anchor="middle" fill="#fff" letter-spacing="6">FLAP & FLY ADVENTURE</text>
</svg>`,

  'alien-invasion': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="320" font-size="120" text-anchor="middle">👾</text>
  <text x="640" y="460" font-family="'Bungee', sans-serif" font-size="68" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">ALIEN INVASION</text>
  <text x="640" y="530" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#f43f5e" letter-spacing="6">RETRO SPACE SHOOTER</text>
</svg>`,

  'tetris-pro': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <g transform="translate(480, 140)">
    <rect x="0" y="0" width="70" height="70" rx="10" fill="#06b6d4" filter="url(#glow)"/>
    <rect x="80" y="0" width="70" height="70" rx="10" fill="#3b82f6" filter="url(#glow)"/>
    <rect x="160" y="0" width="70" height="70" rx="10" fill="#facc15" filter="url(#glow)"/>
    <rect x="240" y="0" width="70" height="70" rx="10" fill="#ef4444" filter="url(#glow)"/>
  </g>
  <text x="640" y="380" font-family="'Bungee', sans-serif" font-size="78" font-weight="900" text-anchor="middle" fill="#3b82f6" filter="url(#glow)">RETRO TETRIS PRO</text>
  <text x="640" y="450" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#94a3b8" letter-spacing="6">THE BLOCK PUZZLE MASTER</text>
</svg>`,

  'snake-classic': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#052e16" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="280" font-size="110" text-anchor="middle">🐍</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#22c55e" filter="url(#glow)">SNAKE CLASSIC HD</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">RETRO NOSTALGIA ARCADE</text>
</svg>`,

  'astray-3d': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="640" cy="240" r="70" fill="#38bdf8" filter="url(#glow)"/>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">ASTRAY 3D MAZE</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#94a3b8" letter-spacing="6">PHYSICS LABYRINTH ESCAPE</text>
</svg>`,

  'tower-master': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="520" y="160" width="240" height="50" rx="10" fill="#ef4444" filter="url(#glow)"/>
  <rect x="500" y="220" width="280" height="50" rx="10" fill="#facc15" filter="url(#glow)"/>
  <rect x="460" y="280" width="360" height="50" rx="10" fill="#3b82f6" filter="url(#glow)"/>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">TOWER MASTER</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">BUILD THE TALLEST SKYSCRAPER</text>
</svg>`,

  'sandboxels': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="560" cy="220" r="30" fill="#facc15" filter="url(#glow)"/>
  <circle cx="640" cy="240" r="40" fill="#ef4444" filter="url(#glow)"/>
  <circle cx="720" cy="220" r="30" fill="#38bdf8" filter="url(#glow)"/>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">SANDBOXELS</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#94a3b8" letter-spacing="6">ELEMENTS PHYSICS SIMULATOR</text>
</svg>`,

  'solitaire-classic': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14532d" />
      <stop offset="100%" stop-color="#052e16" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="560" y="140" width="160" height="220" rx="14" fill="#fff" stroke="#cbd5e1" stroke-width="4" filter="url(#glow)"/>
  <text x="640" y="270" font-size="72" text-anchor="middle" fill="#dc2626">♠</text>
  <text x="640" y="450" font-family="'Bungee', sans-serif" font-size="68" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">SOLITARIO KLONDIKE</text>
  <text x="640" y="520" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">CLASSIC CARD PATIENCE</text>
</svg>`,

  'minesweeper': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="260" font-size="110" text-anchor="middle">💣</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#ef4444" filter="url(#glow)">BUSCAMINAS RETRO</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#94a3b8" letter-spacing="6">THE LOGIC MINE DEFUSER</text>
</svg>`,

  'hexgl-racing': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#083344" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <polygon points="640,120 560,260 640,230 720,260" fill="#06b6d4" filter="url(#glow)"/>
  <text x="640" y="430" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#06b6d4" filter="url(#glow)">HEXGL 3D RACING</text>
  <text x="640" y="500" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">FUTURISTIC SPEED RACER</text>
</svg>`,

  'canvas-rider': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="110" text-anchor="middle">🚴</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">CANVAS RIDER</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">BIKE STUNTS & FREE RIDE</text>
</svg>`,

  'chess-master': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">♟️</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#f59e0b" filter="url(#glow)">CHESS MASTER</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">THE GAME OF KINGS</text>
</svg>`,

  'connect-four': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <g transform="translate(500, 160)">
    <circle cx="40" cy="40" r="32" fill="#ef4444" filter="url(#glow)"/>
    <circle cx="120" cy="40" r="32" fill="#facc15" filter="url(#glow)"/>
    <circle cx="200" cy="40" r="32" fill="#ef4444" filter="url(#glow)"/>
    <circle cx="280" cy="40" r="32" fill="#facc15" filter="url(#glow)"/>
  </g>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="74" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">4 EN LÍNEA</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">CONNECT FOUR STRATEGY</text>
</svg>`
};

for (const [slug, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(coversDir, `${slug}.svg`), content.trim());
  console.log(`✓ Portada oficial lista: ${slug}`);
}
