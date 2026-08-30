/**
 * CATÁLOGO OFICIAL DE VIDEOJUEGOS OPEN-SOURCE DE ALTA CALIDAD - EZZE.GAMES
 * 100% Repositorios oficiales consolidados, terminados y pulidos de GitHub.
 * 0% Anuncios de terceros, 0% Errores 404, 100% Autohospedados en Railway.
 */

const CATEGORIES = [
  { id: 'todos', name: 'Todos los Juegos', icon: '🎮' },
  { id: 'arcade', name: 'Arcade & Habilidad', icon: '👾' },
  { id: 'puzzle', name: 'Puzzles & Estrategia', icon: '🧩' },
  { id: '3d', name: '3D & Carreras', icon: '🏎️' },
  { id: 'favoritos', name: 'Mis Favoritos', icon: '💖' }
];

const LOCAL_GAMES = [
  {
    id: 'tower-game',
    slug: 'tower-game',
    title: 'Tower Master 3D (Tower Game)',
    category: 'arcade',
    tags: ['Construcción', 'Física', 'Torre', 'Oficial'],
    description: 'El aclamado juego de apilar rascacielos con grúa en movimiento, física de péndulo, sonidos originales y efectos de combos.',
    rating: 4.9,
    plays: 42800,
    featured: true,
    trending: true,
    badge: 'POPULAR 🏗️',
    coverImage: '/assets/covers/tower-game.svg',
    accentColor: '#f97316',
    bannerGradient: 'linear-gradient(135deg, #ea580c, #f97316)',
    gamePath: '/games/tower-game/index.html'
  },
  {
    id: 'clumsy-bird',
    slug: 'clumsy-bird',
    title: 'Clumsy Bird HD',
    category: 'arcade',
    tags: ['MelonJS', 'Flappy', 'Cartoon', 'Sonido HD'],
    description: 'Desarrollado sobre el motor profesional MelonJS. Gráficos de alta fidelidad, animaciones suaves, efectos de partículas y sonidos retro.',
    rating: 4.9,
    plays: 38200,
    featured: true,
    trending: true,
    badge: 'DESTACADO 🐦',
    coverImage: '/assets/covers/clumsy-bird.svg',
    accentColor: '#0284c7',
    bannerGradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    gamePath: '/games/clumsy-bird/index.html'
  },
  {
    id: 'hexgl',
    slug: 'hexgl',
    title: 'HexGL 3D Futuristic Racing',
    category: '3d',
    tags: ['3D WebGL', 'Three.js', 'Carreras', 'Futurista'],
    description: 'El célebre juego de carreras de naves espaciales en 3D desarrollado con Three.js y WebGL. Shaders de alta velocidad y pista futurista.',
    rating: 5.0,
    plays: 35600,
    featured: true,
    trending: true,
    badge: '3D ULTRA ⚡',
    coverImage: '/assets/covers/hexgl.svg',
    accentColor: '#06b6d4',
    bannerGradient: 'linear-gradient(135deg, #0f172a, #0891b2)',
    gamePath: '/games/hexgl/index.html'
  },
  {
    id: 'hextris',
    slug: 'hextris',
    title: 'Hextris Original Master',
    category: 'puzzle',
    tags: ['Hexágono', 'Puzzle', 'Música', 'Mundial'],
    description: 'El juego viral internacional de rotación hexagonal. Combina colores, crea combos multiplicadores y disfruta de su música electrónica.',
    rating: 4.8,
    plays: 29400,
    featured: false,
    trending: true,
    badge: 'CLÁSICO 🔷',
    coverImage: '/assets/covers/hextris.svg',
    accentColor: '#7c3aed',
    bannerGradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
    gamePath: '/games/hextris/index.html'
  },
  {
    id: 'pacman',
    slug: 'pacman',
    title: 'Pac-Man Arcade HD',
    category: 'arcade',
    tags: ['Pacman', 'Retro', 'Arcade', 'Sonidos Reales'],
    description: 'El legendario clásico de los salones recreativos recreado en Canvas con la IA original de los 4 fantasmas y todos los efectos de audio clásicos.',
    rating: 4.9,
    plays: 36900,
    featured: true,
    trending: true,
    badge: 'LEYENDA 🟡',
    coverImage: '/assets/covers/pacman.svg',
    accentColor: '#facc15',
    bannerGradient: 'linear-gradient(135deg, #020617, #1e1b4b)',
    gamePath: '/games/pacman/index.html'
  },
  {
    id: 'puzzle-2048',
    slug: 'puzzle-2048',
    title: '2048 Original (Gabriele Cirulli)',
    category: 'puzzle',
    tags: ['Lógica', '2048', 'Cirulli', 'Oficial'],
    description: 'El código fuente oficial del juego 2048 creado por Gabriele Cirulli. Soporte multitáctil impecable, animaciones fluidas y guardado de récords.',
    rating: 4.9,
    plays: 33100,
    featured: false,
    trending: true,
    badge: 'ORIGINAL 🔢',
    coverImage: '/assets/covers/puzzle-2048.svg',
    accentColor: '#f59e0b',
    bannerGradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    gamePath: '/games/puzzle-2048/index.html'
  },
  {
    id: 'flappy-2048',
    slug: 'flappy-2048',
    title: 'Flappy 2048 HD',
    category: 'puzzle',
    tags: ['Fusión', 'Habilidad', 'Flappy', '2048'],
    description: 'La divertida e ingeniosa fusión viral de Flappy Bird y 2048. Vuela entre los bloques sumando valores hasta alcanzar la puntuación máxima.',
    rating: 4.8,
    plays: 24700,
    featured: false,
    trending: false,
    badge: 'VIRAL 🌟',
    coverImage: '/assets/covers/flappy-2048.svg',
    accentColor: '#22c55e',
    bannerGradient: 'linear-gradient(135deg, #15803d, #22c55e)',
    gamePath: '/games/flappy-2048/index.html'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LOCAL_GAMES;
}
