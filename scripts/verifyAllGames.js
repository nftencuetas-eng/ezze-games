const http = require('http');

const games = [
  { slug: 'slingshot-rescue', cover: '/assets/covers/slingshot-rescue.svg' },
  { slug: 'magic-draw', cover: '/assets/covers/magic-draw.svg' },
  { slug: 'virtual-pet', cover: '/assets/covers/virtual-pet.svg' },
  { slug: 'party-duels', cover: '/assets/covers/party-duels.svg' },
  { slug: 'tower-master', cover: '/assets/covers/tower-master.svg' },
  { slug: 'fruit-slice', cover: '/assets/covers/fruit-slice.svg' },
  { slug: 'candy-match', cover: '/assets/covers/candy-match.svg' },
  { slug: 'bubble-shooter', cover: '/assets/covers/bubble-shooter.svg' },
  { slug: 'clumsy-bird', cover: '/assets/covers/clumsy-bird.svg' },
  { slug: 'math-monsters', cover: '/assets/covers/math-monsters.svg' },
  { slug: 'memory-safari', cover: '/assets/covers/memory-safari.svg' },
  { slug: 'quiz-trivia', cover: '/assets/covers/quiz-trivia.svg' },
  { slug: 'jigsaw-puzzle', cover: '/assets/covers/jigsaw-puzzle.svg' },
  { slug: 'pacman-hd', cover: '/assets/covers/pacman-hd.jpg' },
  { slug: 'puzzle-2048', cover: '/assets/covers/puzzle-2048.svg' },
  { slug: 'hexgl-racing', cover: '/assets/covers/hexgl-racing.svg' }
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
  console.log('=== VERIFICANDO LOS 16 JUEGOS Y SUS PORTADAS ===');
  let errCount = 0;
  for (const g of games) {
    const gameRes = await checkUrl(`/games/${g.slug}/index.html`);
    const coverRes = await checkUrl(g.cover);
    const ok = gameRes.status === 200 && coverRes.status === 200;
    if (!ok) errCount++;
    console.log(`[${ok ? 'OK' : 'FAIL'}] ${g.slug} | Game: ${gameRes.status} | Cover: ${coverRes.status}`);
  }
  console.log('================================================');
  console.log(`Total: ${games.length} | Fallos: ${errCount}`);
}

run();
