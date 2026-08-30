const http = require('http');

const games = [
  { slug: 'tower-game', cover: '/assets/covers/tower-game.svg' },
  { slug: 'clumsy-bird', cover: '/assets/covers/clumsy-bird.svg' },
  { slug: 'hexgl', cover: '/assets/covers/hexgl.svg' },
  { slug: 'hextris', cover: '/assets/covers/hextris.svg' },
  { slug: 'pacman', cover: '/assets/covers/pacman.svg' },
  { slug: 'puzzle-2048', cover: '/assets/covers/puzzle-2048.svg' },
  { slug: 'flappy-2048', cover: '/assets/covers/flappy-2048.svg' }
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
  console.log('=== VERIFICANDO LOS 7 JUEGOS OFICIALES DE GITHUB ===');
  let errCount = 0;
  for (const g of games) {
    const gameRes = await checkUrl(`/games/${g.slug}/index.html`);
    const coverRes = await checkUrl(g.cover);
    const ok = gameRes.status === 200 && coverRes.status === 200;
    if (!ok) errCount++;
    console.log(`[${ok ? 'OK' : 'FAIL'}] ${g.slug} | Game: ${gameRes.status} | Cover: ${coverRes.status}`);
  }
  console.log('====================================================');
  console.log(`Total: ${games.length} | Fallos: ${errCount}`);
}

run();
