/**
 * CATÁLOGO OFICIAL DE VIDEOJUEGOS PREMIUM (EDICIÓN ELITE) - EZZE.GAMES
 * 100% Repositorios oficiales consolidados de GitHub, con portadas HD generadas en arte real.
 * 0% Anuncios de terceros, 0% Errores 404, 100% Autohospedados en Railway.
 */

const CATEGORIES = [
  { id: 'todos', name: 'Todos los Juegos', icon: '🎮' },
  { id: 'arcade', name: 'Arcade & Habilidad', icon: '👾' },
  { id: 'carreras', name: '3D & Carreras', icon: '🏎️' },
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
    rating: 5.0,
    plays: 48900,
    featured: true,
    trending: true,
    badge: 'POPULAR 🏗️',
    coverImage: '/assets/covers/tower-game.jpg',
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
    plays: 41200,
    featured: true,
    trending: true,
    badge: 'DESTACADO 🐦',
    coverImage: '/assets/covers/clumsy-bird.jpg',
    accentColor: '#0284c7',
    bannerGradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    gamePath: '/games/clumsy-bird/index.html'
  },
  {
    id: 'hexgl',
    slug: 'hexgl',
    title: 'HexGL 3D Futuristic Racing',
    category: 'carreras',
    tags: ['3D WebGL', 'Three.js', 'Carreras', 'Futurista'],
    description: 'El célebre juego de carreras de naves espaciales en 3D desarrollado con Three.js y WebGL. Shaders de alta velocidad y pista flotante.',
    rating: 5.0,
    plays: 39600,
    featured: true,
    trending: true,
    badge: '3D ULTRA ⚡',
    coverImage: '/assets/covers/hexgl.jpg',
    accentColor: '#06b6d4',
    bannerGradient: 'linear-gradient(135deg, #0f172a, #0891b2)',
    gamePath: '/games/hexgl/index.html'
  },
  {
    id: 'retro-racer',
    slug: 'retro-racer',
    title: 'OutRun Retro 3D Highway Racer',
    category: 'carreras',
    tags: ['OutRun', 'Retro 3D', 'Autopista', 'Música 80s'],
    description: 'El legendario juego arcade de carreras estilo OutRun en 3D. Autopista infinita con curvas, colinas, música synthwave y superdeportivo.',
    rating: 4.9,
    plays: 37400,
    featured: true,
    trending: true,
    badge: 'ARCADE 3D 🏎️',
    coverImage: '/assets/covers/retro-racer.jpg',
    accentColor: '#ec4899',
    bannerGradient: 'linear-gradient(135deg, #831843, #ec4899)',
    gamePath: '/games/retro-racer/index.html'
  },
  {
    id: 'pacman',
    slug: 'pacman',
    title: 'Pac-Man Arcade HD (Dale Harvey)',
    category: 'arcade',
    tags: ['Pacman', 'Retro', 'Arcade', 'Sonidos Reales'],
    description: 'La versión oficial en Canvas creada por Dale Harvey con tablero completo, IA auténtica de los 4 fantasmas, audio retro y sistema de vidas.',
    rating: 4.9,
    plays: 44100,
    featured: true,
    trending: true,
    badge: 'LEYENDA 🟡',
    coverImage: '/assets/covers/pacman.jpg',
    accentColor: '#facc15',
    bannerGradient: 'linear-gradient(135deg, #020617, #1e1b4b)',
    gamePath: '/games/pacman/index.html'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LOCAL_GAMES;
}
