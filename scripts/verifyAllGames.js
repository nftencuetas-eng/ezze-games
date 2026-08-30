const http = require('http');

const games = [
  { slug: 'pacman-hd', cover: '/assets/covers/pacman-hd.jpg' },
  { slug: 'clumsy-bird', cover: '/assets/covers/clumsy-bird.svg' },
  { slug: 'alien-invasion', cover: '/assets/covers/alien-invasion.svg' },
  { slug: 'tetris-pro', cover: '/assets/covers/tetris-pro.svg' },
  { slug: 'snake-classic', cover: '/assets/covers/snake-classic.svg' },
  { slug: 'astray-3d', cover: '/assets/covers/astray-3d.svg' },
  { slug: 'puzzle-2048', cover: '/assets/covers/puzzle-2048.svg' },
  { slug: 'hextris-hd', cover: '/assets/covers/hextris-hd.svg' },
  { slug: 'tower-master', cover: '/assets/covers/tower-master.svg' },
  { slug: 'sandboxels', cover: '/assets/covers/sandboxels.svg' },
  { slug: 'solitaire-classic', cover: '/assets/covers/solitaire-classic.svg' },
  { slug: 'minesweeper', cover: '/assets/covers/minesweeper.svg' },
  { slug: 'hexgl-racing', cover: '/assets/covers/hexgl-racing.svg' },
  { slug: 'canvas-rider', cover: '/assets/covers/canvas-rider.svg' },
  { slug: 'chess-master', cover: '/assets/covers/chess-master.svg' },
  { slug: 'connect-four', cover: '/assets/covers/connect-four.svg' }
];

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('=== VERIFICANDO 16 JUEGOS Y SUS PORTADAS ===');
  let errCount = 0;
  for (const g of games) {
    const gameRes = await checkUrl(`/games/${g.slug}/index.html`);
    const coverRes = await checkUrl(g.cover);
    const ok = gameRes.status === 200 && coverRes.status === 200;
    if (!ok) errCount++;
    console.log(`[${ok ? 'OK' : 'FAIL'}] ${g.slug} | Game: ${gameRes.status} | Cover: ${coverRes.status}`);
  }
  console.log('============================================');
  console.log(`Total: ${games.length} | Fallos: ${errCount}`);
}

run();
