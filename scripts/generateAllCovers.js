const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, '..', 'client', 'assets', 'covers');
if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

const svgs = {
  'math-monsters': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="50%" stop-color="#312e81" />
      <stop offset="100%" stop-color="#4338ca" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🐲</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">MATH MONSTERS</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#818cf8" letter-spacing="6">BATALLA MATEMATICA EDUCATIVA</text>
</svg>`,

  'memory-safari': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="50%" stop-color="#047857" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🦁</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#fef08a" filter="url(#glow)">SAFARI MEMORY</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fff" letter-spacing="6">JUEGO DE MEMORIA Y CONCENTRACION</text>
</svg>`,

  'quiz-trivia': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b0764" />
      <stop offset="50%" stop-color="#581c87" />
      <stop offset="100%" stop-color="#7e22ce" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🧠</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">TRIVIA ESCOLAR</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#e9d5ff" letter-spacing="6">CIENCIAS, PLANETAS Y CULTURA</text>
</svg>`,

  'jigsaw-puzzle': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🦖</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">KIDS JIGSAW WORLD</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#dbeafe" letter-spacing="6">ROMPECABEZAS ILUSTRADOS</text>
</svg>`,

  'fruit-slice': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1917" />
      <stop offset="50%" stop-color="#292524" />
      <stop offset="100%" stop-color="#44403c" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🍉</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#ef4444" filter="url(#glow)">FRUIT SLICE MASTER</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#facc15" letter-spacing="6">CORTE NINJA DE FRUTAS</text>
</svg>`,

  'candy-match': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#831843" />
      <stop offset="50%" stop-color="#be185d" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🍬</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">CANDY KINGDOM</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#fce7f3" letter-spacing="6">MATCH-3 DULCES COLORIDOS</text>
</svg>`,

  'bubble-shooter': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#075985" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="640" y="270" font-size="120" text-anchor="middle">🔮</text>
  <text x="640" y="440" font-family="'Bungee', sans-serif" font-size="72" font-weight="900" text-anchor="middle" fill="#facc15" filter="url(#glow)">BUBBLE SHOOTER</text>
  <text x="640" y="510" font-family="'Bungee', sans-serif" font-size="30" text-anchor="middle" fill="#e0f2fe" letter-spacing="6">EXPLOSION DE BURBUJAS</text>
</svg>`
};

for (const [slug, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(coversDir, `${slug}.svg`), content.trim());
  console.log(`✓ Portada HD lista: ${slug}`);
}
