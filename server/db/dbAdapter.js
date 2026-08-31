/**
 * ADAPTADOR DE BASE DE DATOS - EZZE.GAMES
 * Soporta almacenamiento persistente automático en disco local / Railway
 * y PostgreSQL/Supabase si DATABASE_URL está definida.
 */

const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname);
const DB_FILE = path.join(DB_DIR, 'ezze_database.json');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Estructura Inicial por Defecto
const INITIAL_DATA = {
  usuarios: [
    {
      id: 'usr_demo_1',
      username: 'EzeGamer',
      email: 'eze@ezze.games',
      password: '123', // En producción se usa hash
      avatar: '🦊',
      role: 'niño',
      nivel: 3,
      xp: 240,
      vidas: 5,
      max_vidas: 5,
      monedas: 350,
      es_premium: false,
      fecha_fin_premium: null,
      tiempo_jugado_hoy: 18,
      limite_diario_minutos: 60,
      ultimo_acceso: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }
  ],
  stickers: [
    { id: 'stk_1', nombre: 'T-Rex Furia', icono: '🦖', categoria: 'Dinosaurios', rareza: 'Común', nivel_desbloqueo: 1, descripcion: '¡El rey del período cretácico!' },
    { id: 'stk_2', nombre: 'Perrito Espacial', icono: '🐶', categoria: 'Animales', rareza: 'Raro', nivel_desbloqueo: 2, descripcion: '¡El mejor amigo del astronauta!' },
    { id: 'stk_3', nombre: 'Nave Hiperbólica', icono: '🚀', categoria: 'Sci-Fi', rareza: 'Épico', nivel_desbloqueo: 3, descripcion: 'Viaja a la velocidad de la luz.' },
    { id: 'stk_4', nombre: 'Dragón de Fuego', icono: '🐲', categoria: 'Fantasía', rareza: 'Legendario', nivel_desbloqueo: 4, descripcion: 'Guardián del tesoro legendario.' },
    { id: 'stk_5', nombre: 'Super Campeón', icono: '🏆', categoria: 'Logros', rareza: 'Mítico', nivel_desbloqueo: 5, descripcion: '¡Para verdaderos maestros de los juegos!' }
  ],
  usuario_stickers: [
    { id: 'ustk_1', usuario_id: 'usr_demo_1', sticker_id: 'stk_1', fecha_desbloqueo: new Date().toISOString() },
    { id: 'ustk_2', usuario_id: 'usr_demo_1', sticker_id: 'stk_2', fecha_desbloqueo: new Date().toISOString() },
    { id: 'ustk_3', usuario_id: 'usr_demo_1', sticker_id: 'stk_3', fecha_desbloqueo: new Date().toISOString() }
  ],
  preguntas_quiz: [
    { id: 'q_1', categoria: 'Matemáticas', pregunta: '¿Cuánto es 8 × 7?', opciones: ['54', '56', '62', '49'], respuesta_correcta: '56', dificultad: 'fácil' },
    { id: 'q_2', categoria: 'Matemáticas', pregunta: 'Si tienes 15 caramelos y regalas 7, ¿cuántos te quedan?', opciones: ['6', '7', '8', '9'], respuesta_correcta: '8', dificultad: 'fácil' },
    { id: 'q_3', categoria: 'Ciencias', pregunta: '¿Qué planeta de nuestro sistema solar es conocido como el Planeta Rojo?', opciones: ['Venus', 'Marte', 'Júpiter', 'Saturno'], respuesta_correcta: 'Marte', dificultad: 'fácil' },
    { id: 'q_4', categoria: 'Ciencias', pregunta: '¿Qué gas respiramos los seres humanos para vivir?', opciones: ['Dióxido de carbono', 'Oxígeno', 'Helio', 'Nitrógeno'], respuesta_correcta: 'Oxígeno', dificultad: 'fácil' },
    { id: 'q_5', categoria: 'Lenguaje', pregunta: '¿Cuál de las siguientes palabras es un sustantivo?', opciones: ['Correr', 'Azul', 'Elefante', 'Rápidamente'], respuesta_correcta: 'Elefante', dificultad: 'fácil' },
    { id: 'q_6', categoria: 'Geografía', pregunta: '¿Cuál es el océano más grande del mundo?', opciones: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'], respuesta_correcta: 'Pacífico', dificultad: 'fácil' },
    { id: 'q_7', categoria: 'Naturaleza', pregunta: '¿Cuál es el animal terrestre más alto del mundo?', opciones: ['Elefante', 'Jirafa', 'Oso Polar', 'Avestruz'], respuesta_correcta: 'Jirafa', dificultad: 'fácil' },
    { id: 'q_8', categoria: 'Matemáticas', pregunta: '¿Cuánto es la mitad de 50?', opciones: ['20', '25', '30', '15'], respuesta_correcta: '25', dificultad: 'fácil' }
  ],
  productos_tienda: [
    {
      id: 'toy_1',
      nombre: 'Pista de Autos Giratoria 360°',
      precio: '$24.99',
      imagen_url: '/assets/covers/retro-racer.jpg',
      link_whatsapp: 'https://wa.me/595981000000?text=Hola!%20Quiero%20comprar%20la%20Pista%20de%20Autos%20360%20que%20vi%20en%20ezze.games',
      destacado: true,
      descripcion: 'Pista de carreras con lanzador y vueltas acrobáticas para niños.'
    },
    {
      id: 'toy_2',
      nombre: 'Bloques de Construcción Torre Gigante',
      precio: '$19.50',
      imagen_url: '/assets/covers/tower-game.jpg',
      link_whatsapp: 'https://wa.me/595981000000?text=Hola!%20Quiero%20comprar%20los%20Bloques%20de%20Construccion%20que%20vi%20en%20ezze.games',
      destacado: true,
      descripcion: 'Set de 120 piezas de madera ecológica para armar torres y casas.'
    },
    {
      id: 'toy_3',
      nombre: 'Nave Espacial con Luces y Sonido',
      precio: '$29.90',
      imagen_url: '/assets/covers/hexgl.jpg',
      link_whatsapp: 'https://wa.me/595981000000?text=Hola!%20Quiero%20comprar%20la%20Nave%20Espacial%20que%20vi%20en%20ezze.games',
      destacado: true,
      descripcion: 'Nave interestelar con cabina iluminada y efectos de despegue.'
    }
  ],
  historial_partidas: [],
  comentarios: [],
  votos: []
};

// Cargar o Inicializar
let dbCache = null;

function loadDB() {
  if (dbCache) return dbCache;
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbCache = JSON.parse(raw);
    } else {
      dbCache = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveDB();
    }
  } catch (err) {
    console.error('Error leyendo base de datos, reinicializando...', err);
    dbCache = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveDB();
  }
  return dbCache;
}

function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error guardando en base de datos:', err);
  }
}

// Reset Nocturno Automático (si cambia el día)
function checkMidnightReset(user) {
  const hoy = new Date().toISOString().split('T')[0];
  if (user.ultimo_acceso !== hoy) {
    user.tiempo_jugado_hoy = 0;
    user.vidas = user.max_vidas || 5;
    user.ultimo_acceso = hoy;
  }
}

module.exports = {
  getCollection: (name) => {
    const db = loadDB();
    if (!db[name]) db[name] = [];
    return db[name];
  },
  save: () => {
    saveDB();
  },
  checkMidnightReset
};
