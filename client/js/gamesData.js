/**
 * CATÁLOGO OFICIAL PREMIUM DE 12 VIDEOJUEGOS - EZZE.GAMES
 * Educativos, Familiares, Cartoon HD y Arcade.
 * 100% Autohospedados, 0% Anuncios de terceros, 0% Errores 404.
 */

const CATEGORIES = [
  { id: 'todos', name: 'Todos los Juegos', icon: '🎮' },
  { id: 'educativos', name: 'Educativos & Mente', icon: '🎓' },
  { id: 'familiares', name: 'Familiares & Cartoon', icon: '🌟' },
  { id: 'arcade', name: 'Arcade Clásico & 3D', icon: '👾' },
  { id: 'favoritos', name: 'Mis Favoritos', icon: '💖' }
];

const LOCAL_GAMES = [
  // --- EDUCATIVOS & MENTE ---
  {
    id: 'math-monsters',
    slug: 'math-monsters',
    title: 'Math Monster Battle',
    category: 'educativos',
    tags: ['Matemáticas', 'Educativo', 'Monstruos', 'Cálculo'],
    description: '¡Resuelve operaciones matemáticas rápidas para lanzar ataques mágicos y derrotar monstruos amistosos en esta divertida aventura!',
    rating: 4.9,
    plays: 18400,
    featured: true,
    trending: true,
    badge: 'EDUCATIVO 🎓',
    coverImage: '/assets/covers/math-monsters.svg',
    accentColor: '#6366f1',
    bannerGradient: 'linear-gradient(135deg, #6366f1, #312e81)',
    gamePath: '/games/math-monsters/index.html'
  },
  {
    id: 'memory-safari',
    slug: 'memory-safari',
    title: 'Animal Safari Memory Match',
    category: 'educativos',
    tags: ['Memoria', 'Animales', 'Concentración', 'Infantil'],
    description: 'Encuentra las parejas de animales de la selva y granja. Estimula la memoria visual, la concentración y la agilidad mental.',
    rating: 4.8,
    plays: 15200,
    featured: false,
    trending: true,
    badge: 'MEMORIA 🦁',
    coverImage: '/assets/covers/memory-safari.svg',
    accentColor: '#10b981',
    bannerGradient: 'linear-gradient(135deg, #10b981, #064e3b)',
    gamePath: '/games/memory-safari/index.html'
  },
  {
    id: 'quiz-trivia',
    slug: 'quiz-trivia',
    title: 'Trivia Escolar & Curiosidades',
    category: 'educativos',
    tags: ['Trivia', 'Ciencias', 'Planetas', 'Preguntas'],
    description: 'Pon a prueba tus conocimientos sobre el universo, animales, ciencia, cuerpo humano y geografía en este emocionante quiz escolar.',
    rating: 4.9,
    plays: 16800,
    featured: true,
    trending: true,
    badge: 'SABER 🧠',
    coverImage: '/assets/covers/quiz-trivia.svg',
    accentColor: '#a855f7',
    bannerGradient: 'linear-gradient(135deg, #a855f7, #581c87)',
    gamePath: '/games/quiz-trivia/index.html'
  },
  {
    id: 'jigsaw-puzzle',
    slug: 'jigsaw-puzzle',
    title: 'Kids Jigsaw Puzzle World',
    category: 'educativos',
    tags: ['Rompecabezas', 'Dinosaurios', 'Lógica', 'Puzzles'],
    description: 'Arma rompecabezas ilustrados de dinosaurios y naturaleza. Desarrolla la percepción espacial y la coordinación motriz.',
    rating: 4.7,
    plays: 12900,
    featured: false,
    trending: false,
    badge: 'PUZZLE 🦖',
    coverImage: '/assets/covers/jigsaw-puzzle.svg',
    accentColor: '#3b82f6',
    bannerGradient: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
    gamePath: '/games/jigsaw-puzzle/index.html'
  },

  // --- FAMILIARES & CARTOON ---
  {
    id: 'tower-master',
    slug: 'tower-master',
    title: 'Tower Master 3D (Tower Game)',
    category: 'familiares',
    tags: ['Construcción', 'Física', 'Torre', 'Cartoon'],
    description: 'El clásico juego de construcción con grúa oscilante y casa de ladrillos. ¡Suelta los pisos con precisión para construir el rascacielos más alto!',
    rating: 4.9,
    plays: 28700,
    featured: true,
    trending: true,
    badge: 'POPULAR 🏗️',
    coverImage: '/assets/covers/tower-master.svg',
    accentColor: '#f97316',
    bannerGradient: 'linear-gradient(135deg, #f97316, #c2410c)',
    gamePath: '/games/tower-master/index.html'
  },
  {
    id: 'fruit-slice',
    slug: 'fruit-slice',
    title: 'Fruit Slice Master',
    category: 'familiares',
    tags: ['Frutas', 'Corte', 'Ninja', 'Reflejos'],
    description: 'Corta sandías, plátanos y piñas en el aire con cortes de espada brillantes y jugos de colores mientras esquivas las bombas ninja.',
    rating: 4.9,
    plays: 24300,
    featured: true,
    trending: true,
    badge: 'NINJA 🍉',
    coverImage: '/assets/covers/fruit-slice.svg',
    accentColor: '#ef4444',
    bannerGradient: 'linear-gradient(135deg, #ef4444, #991b1b)',
    gamePath: '/games/fruit-slice/index.html'
  },
  {
    id: 'candy-match',
    slug: 'candy-match',
    title: 'Candy Kingdom Match-3',
    category: 'familiares',
    tags: ['Caramelos', 'Match-3', 'Dulces', 'Combos'],
    description: 'Combina 3 o más caramelos, gomitas y dulces brillantes para crear explosiones de azúcar y superar los retos del reino dulce.',
    rating: 4.8,
    plays: 19500,
    featured: false,
    trending: true,
    badge: 'DULCE 🍬',
    coverImage: '/assets/covers/candy-match.svg',
    accentColor: '#ec4899',
    bannerGradient: 'linear-gradient(135deg, #ec4899, #9d174d)',
    gamePath: '/games/candy-match/index.html'
  },
  {
    id: 'bubble-shooter',
    slug: 'bubble-shooter',
    title: 'Bubble Shooter Pop World',
    category: 'familiares',
    tags: ['Burbujas', 'Puntería', 'Colores', 'Disparo'],
    description: 'Apunta con el cañón láser y dispara burbujas de colores brillantes para juntar 3 iguales y hacerlas estallar en cadena.',
    rating: 4.8,
    plays: 21100,
    featured: false,
    trending: true,
    badge: 'POP 🔮',
    coverImage: '/assets/covers/bubble-shooter.svg',
    accentColor: '#0284c7',
    bannerGradient: 'linear-gradient(135deg, #0284c7, #075985)',
    gamePath: '/games/bubble-shooter/index.html'
  },
  {
    id: 'clumsy-bird',
    slug: 'clumsy-bird',
    title: 'Clumsy Bird HD',
    category: 'familiares',
    tags: ['Flappy', 'Cartoon', 'Vuelo', 'Habilidad'],
    description: 'El clásico pajarito animado volando por cielos soleados esquivando tuberías verdes en alta definición.',
    rating: 4.8,
    plays: 17400,
    featured: false,
    trending: false,
    badge: 'HOT 🐦',
    coverImage: '/assets/covers/clumsy-bird.svg',
    accentColor: '#38bdf8',
    bannerGradient: 'linear-gradient(135deg, #38bdf8, #0284c7)',
    gamePath: '/games/clumsy-bird/index.html'
  },

  // --- ARCADE CLÁSICO & 3D ---
  {
    id: 'pacman-hd',
    slug: 'pacman-hd',
    title: 'Pac-Man Arcade HD',
    category: 'arcade',
    tags: ['Arcade', 'Retro', 'Neón', 'Fantasmas'],
    description: 'La leyenda arcade de los salones recreativos. Recorre el laberinto azul de neón, come todas las píldoras y esquiva a los 4 fantasmas.',
    rating: 4.9,
    plays: 26000,
    featured: true,
    trending: true,
    badge: 'LEYENDA 🌟',
    coverImage: '/assets/covers/pacman-hd.jpg',
    accentColor: '#facc15',
    bannerGradient: 'linear-gradient(135deg, #facc15, #ca8a04)',
    gamePath: '/games/pacman-hd/index.html'
  },
  {
    id: 'puzzle-2048',
    slug: 'puzzle-2048',
    title: '2048 Master Colorful',
    category: 'arcade',
    tags: ['Números', 'Lógica', '2048', 'Mente'],
    description: 'El juego original de Gabriele Cirulli. Desliza las fichas numéricas coloridas hasta alcanzar la mítica ficha 2048.',
    rating: 4.9,
    plays: 23100,
    featured: false,
    trending: true,
    badge: 'CLÁSICO 🔢',
    coverImage: '/assets/covers/puzzle-2048.svg',
    accentColor: '#f59e0b',
    bannerGradient: 'linear-gradient(135deg, #f59e0b, #b45309)',
    gamePath: '/games/puzzle-2048/index.html'
  },
  {
    id: 'hexgl-racing',
    slug: 'hexgl-racing',
    title: 'HexGL 3D Futuristic Racing',
    category: 'arcade',
    tags: ['3D', 'Sci-Fi', 'Carreras', 'Velocidad'],
    description: 'Pilota una nave hiperbólica en 3D con propulsores de neón sobre pistas flotantes a velocidades extremas.',
    rating: 4.9,
    plays: 25800,
    featured: true,
    trending: true,
    badge: '3D VELOZ ⚡',
    coverImage: '/assets/covers/hexgl-racing.svg',
    accentColor: '#06b6d4',
    bannerGradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    gamePath: '/games/hexgl-racing/index.html'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LOCAL_GAMES;
}
