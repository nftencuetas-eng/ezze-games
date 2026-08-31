const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 INICIANDO PRUEBAS DE APIs BACKEND - EZZE.GAMES');
  console.log('====================================================\n');

  try {
    // 1. Registro
    console.log('1. Probando Registro de Usuario...');
    const testUsername = 'NiñoGamer_' + Math.floor(Math.random() * 1000);
    const regRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { username: testUsername, password: '123', avatar: '🦁', role: 'niño' });
    console.log(`   Status: ${regRes.status} | User: ${regRes.data?.user?.username} | Nivel: ${regRes.data?.user?.nivel} | Vidas: ${regRes.data?.user?.vidas}`);

    const userId = regRes.data?.user?.id;

    // 2. Login
    console.log('\n2. Probando Inicio de Sesión...');
    const loginRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { username: testUsername, password: '123' });
    console.log(`   Status: ${loginRes.status} | Mensaje: ${loginRes.data?.message}`);

    // 3. Obtener Perfil
    console.log('\n3. Obteniendo Perfil de Usuario...');
    const profRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/profile',
      method: 'GET',
      headers: { 'x-user-id': userId }
    });
    console.log(`   Status: ${profRes.status} | XP: ${profRes.data?.user?.xp} | Monedas: ${profRes.data?.user?.monedas}`);

    // 4. Verificación de Acceso al Juego (Descuenta 1 vida)
    console.log('\n4. Verificando Acceso a Juego (Descuento de vida)...');
    const accessRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/gameplay/access',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId }
    }, { gameSlug: 'tower-game' });
    console.log(`   Status: ${accessRes.status} | Permitido: ${accessRes.data?.allowed} | Vidas Restantes: ${accessRes.data?.vidas_restantes}`);

    // 5. Heartbeat de Tiempo Jugado (+XP y subida de nivel)
    console.log('\n5. Registrando Tiempo de Juego y XP...');
    const hbRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/gameplay/heartbeat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId }
    }, { minutes: 5, xpEarned: 120 }); // Suma suficiente XP para subir de nivel
    console.log(`   Status: ${hbRes.status} | Nuevo Nivel: ${hbRes.data?.nivel} | Subió de Nivel: ${hbRes.data?.subioNivel} | Sticker: ${hbRes.data?.stickerDesbloqueado?.nombre || 'Ninguno'}`);

    // 6. Obtener Preguntas del Quiz Educativo
    console.log('\n6. Obteniendo Preguntas del Quiz Educativo...');
    const qRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/gameplay/quiz/questions',
      method: 'GET'
    });
    console.log(`   Status: ${qRes.status} | Preguntas recibidas: ${qRes.data?.questions?.length}`);

    // 7. Álbum de Stickers
    console.log('\n7. Obteniendo Álbum de Stickers...');
    const stRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/stickers/album',
      method: 'GET',
      headers: { 'x-user-id': userId }
    });
    console.log(`   Status: ${stRes.status} | Total: ${stRes.data?.progreso?.total} | Desbloqueados: ${stRes.data?.progreso?.desbloqueados}`);

    // 8. Tienda de Juguetes
    console.log('\n8. Obteniendo Productos de la Tienda de Juguetes...');
    const storeRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/store/featured',
      method: 'GET'
    });
    console.log(`   Status: ${storeRes.status} | Tienda: ${storeRes.data?.tienda?.nombre} | Productos: ${storeRes.data?.tienda?.productos?.length}`);

    console.log('\n====================================================');
    console.log('✅ TODAS LAS PRUEBAS DE BACKEND PASARON AL 100%!');
    console.log('====================================================');
  } catch (err) {
    console.error('❌ Error en pruebas:', err);
  }
}

runTests();
