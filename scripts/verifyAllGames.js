const http = require('http');

const games = [
  'moto-x3m',
  'drift-hunters',
  'slope-3d',
  'subway-runner',
  'crossy-road',
  'stickman-hook',
  'paper-io-2',
  'zombie-derby',
  'retro-knight',
  'cut-the-rope',
  'hextris-hd',
  'chess-pro',
  'tower-defense',
  'puzzle-2048',
  'basket-slam',
  'helix-jump',
  'pacman-hd',
  'space-arcade'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      resolve({ path, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('--- VERIFICANDO DISPONIBILIDAD DE JUEGOS Y PORTADAS ---');
  let failures = 0;
  for (const g of games) {
    const gameRes = await checkUrl(`/games/${g}/index.html`);
    const status = gameRes.statusCode === 200 ? '✅ OK (200)' : `❌ ERROR (${gameRes.statusCode || gameRes.error})`;
    if (gameRes.statusCode !== 200) failures++;
    console.log(`[Juego] /games/${g}/index.html -> ${status}`);
  }
  console.log('---------------------------------------------------------');
  console.log(`Total probados: ${games.length} | Fallos: ${failures}`);
}

run();
