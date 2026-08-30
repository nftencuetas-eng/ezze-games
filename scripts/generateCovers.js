const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, '..', 'client', 'assets', 'covers');
if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

const svgs = {
  'tower-defense': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f" />
      <stop offset="50%" stop-color="#451a03" />
      <stop offset="100%" stop-color="#1c1917" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="640" cy="360" r="300" fill="#f59e0b" opacity="0.08" />
  <!-- Castle & Towers silhouette -->
  <path d="M200,600 L200,420 L240,420 L240,460 L280,460 L280,420 L320,420 L320,600 Z" fill="#b45309" opacity="0.4"/>
  <path d="M960,600 L960,420 L1000,420 L1000,460 L1040,460 L1040,420 L1080,420 L1080,600 Z" fill="#b45309" opacity="0.4"/>
  <path d="M400,650 L400,340 L500,300 L600,340 L600,650 Z" fill="#d97706" opacity="0.6"/>
  <path d="M680,650 L680,340 L780,300 L880,340 L880,650 Z" fill="#d97706" opacity="0.6"/>
  <path d="M500,650 L500,240 L640,160 L780,240 L780,650 Z" fill="#f59e0b" opacity="0.8"/>
  <!-- Arrows & Fire -->
  <circle cx="480" cy="220" r="16" fill="#ef4444" filter="url(#glow)"/>
  <circle cx="800" cy="220" r="16" fill="#ef4444" filter="url(#glow)"/>
  <!-- Title -->
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="64" font-weight="900" text-anchor="middle" fill="#000" dy="6">TOWER DEFENSE</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="64" font-weight="900" text-anchor="middle" fill="url(#gold)" filter="url(#glow)">TOWER DEFENSE</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="34" text-anchor="middle" fill="#fff" letter-spacing="8">KINGDOM BATTLE</text>
  <rect x="520" y="540" width="240" height="42" rx="10" fill="#ef4444" filter="url(#glow)"/>
  <text x="640" y="568" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle" fill="#fff">OFFICIAL GAME COVER</text>
</svg>`,

  'hextris-hd': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#083344" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a5f3fc" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#0e7490" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Hexagon Rings -->
  <polygon points="640,160 813,260 813,460 640,560 467,460 467,260" fill="none" stroke="#06b6d4" stroke-width="12" filter="url(#glow)" opacity="0.8"/>
  <polygon points="640,210 770,285 770,435 640,510 510,435 510,285" fill="none" stroke="#ef4444" stroke-width="16" opacity="0.9"/>
  <polygon points="640,260 726,310 726,410 640,460 554,410 554,310" fill="none" stroke="#f59e0b" stroke-width="20" opacity="0.9"/>
  <polygon points="640,310 683,335 683,385 640,410 597,385 597,335" fill="#10b981" filter="url(#glow)"/>
  <!-- Title -->
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="76" font-weight="900" text-anchor="middle" fill="#000" dy="6">HEXTRIS HD</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="76" font-weight="900" text-anchor="middle" fill="url(#cyan)" filter="url(#glow)">HEXTRIS HD</text>
  <text x="640" y="520" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">HEXAGONAL PUZZLE</text>
</svg>`,

  'puzzle-2048': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#eab308" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Grid Blocks -->
  <g transform="translate(440, 100)">
    <rect x="0" y="0" width="90" height="90" rx="14" fill="#38bdf8" filter="url(#glow)"/>
    <text x="45" y="58" font-family="'Bungee', sans-serif" font-size="36" text-anchor="middle" fill="#fff">2</text>
    <rect x="105" y="0" width="90" height="90" rx="14" fill="#818cf8"/>
    <text x="150" y="58" font-family="'Bungee', sans-serif" font-size="36" text-anchor="middle" fill="#fff">4</text>
    <rect x="210" y="0" width="90" height="90" rx="14" fill="#c084fc"/>
    <text x="255" y="58" font-family="'Bungee', sans-serif" font-size="36" text-anchor="middle" fill="#fff">8</text>
    <rect x="315" y="0" width="90" height="90" rx="14" fill="#f472b6"/>
    <text x="360" y="58" font-family="'Bungee', sans-serif" font-size="32" text-anchor="middle" fill="#fff">16</text>

    <rect x="0" y="105" width="90" height="90" rx="14" fill="#fb7185"/>
    <text x="45" y="163" font-family="'Bungee', sans-serif" font-size="32" text-anchor="middle" fill="#fff">32</text>
    <rect x="105" y="105" width="90" height="90" rx="14" fill="#f97316"/>
    <text x="150" y="163" font-family="'Bungee', sans-serif" font-size="32" text-anchor="middle" fill="#fff">64</text>
    <rect x="210" y="105" width="90" height="90" rx="14" fill="#eab308"/>
    <text x="255" y="163" font-family="'Bungee', sans-serif" font-size="28" text-anchor="middle" fill="#fff">128</text>
    <rect x="315" y="105" width="90" height="90" rx="14" fill="#84cc16"/>
    <text x="360" y="163" font-family="'Bungee', sans-serif" font-size="28" text-anchor="middle" fill="#fff">256</text>
  </g>
  <!-- Mega 2048 Tile -->
  <rect x="490" y="320" width="300" height="150" rx="24" fill="url(#gold)" filter="url(#glow)"/>
  <text x="640" y="425" font-family="'Bungee', sans-serif" font-size="92" font-weight="900" text-anchor="middle" fill="#000">2048</text>
  <!-- Title -->
  <text x="640" y="550" font-family="'Bungee', sans-serif" font-size="54" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">NEON 2048 MASTER</text>
  <text x="640" y="610" font-family="'Bungee', sans-serif" font-size="24" text-anchor="middle" fill="#94a3b8" letter-spacing="4">THE LEGENDARY PUZZLE</text>
</svg>`,

  'space-arcade': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Stars -->
  <circle cx="100" cy="150" r="3" fill="#fff"/>
  <circle cx="300" cy="80" r="2" fill="#fff"/>
  <circle cx="800" cy="120" r="3" fill="#fff"/>
  <circle cx="1100" cy="200" r="2" fill="#fff"/>
  <circle cx="950" cy="500" r="3" fill="#fff"/>
  <!-- Spacecraft -->
  <polygon points="640,160 560,320 640,280 720,320" fill="url(#neon)" filter="url(#glow)"/>
  <polygon points="640,280 620,340 660,340" fill="#f97316" filter="url(#glow)"/>
  <!-- Laser beams -->
  <line x1="600" y1="180" x2="600" y2="40" stroke="#38bdf8" stroke-width="6" filter="url(#glow)"/>
  <line x1="680" y1="180" x2="680" y2="40" stroke="#38bdf8" stroke-width="6" filter="url(#glow)"/>
  <!-- Title -->
  <text x="640" y="460" font-family="'Bungee', sans-serif" font-size="68" font-weight="900" text-anchor="middle" fill="#38bdf8" filter="url(#glow)">SPACE DEFENDERS</text>
  <text x="640" y="530" font-family="'Bungee', sans-serif" font-size="34" text-anchor="middle" fill="#f43f5e" letter-spacing="6">RETRO GALAXY SHOOTER</text>
</svg>`,

  'retro-knight': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#581c87" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#090514" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Sword & Shield -->
  <path d="M640,120 L660,140 L650,340 L630,340 L620,140 Z" fill="#e2e8f0" filter="url(#glow)"/>
  <rect x="610" y="340" width="60" height="16" rx="4" fill="#a855f7"/>
  <rect x="632" y="356" width="16" height="40" rx="4" fill="#64748b"/>
  <!-- Title -->
  <text x="640" y="470" font-family="'Bungee', sans-serif" font-size="64" font-weight="900" text-anchor="middle" fill="#000" dy="6">REINO DORADO</text>
  <text x="640" y="470" font-family="'Bungee', sans-serif" font-size="64" font-weight="900" text-anchor="middle" fill="url(#gold)" filter="url(#glow)">REINO DORADO</text>
  <text x="640" y="540" font-family="'Bungee', sans-serif" font-size="32" text-anchor="middle" fill="#fff" letter-spacing="6">LEYENDA DEL CABALLERO RETRO</text>
</svg>`
};

for (const [slug, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(coversDir, `${slug}.svg`), content.trim());
  console.log(`✓ Generada portada para ${slug}`);
}
