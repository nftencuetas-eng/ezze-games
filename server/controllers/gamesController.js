const db = require('../config/db');

// Catálogo base de juegos para la API
const GAMES_CATALOG = [
  {
    id: 'vaso-feliz',
    slug: 'vaso-feliz',
    title: 'Vaso Feliz: Física',
    category: 'puzzles',
    tags: ['Física', 'Dibujo', 'Agua', 'Ingenio'],
    description: '¡Dibuja rampas con tinta mágica para guiar el torrente de agua y hacer sonreír al vaso triste!',
    rating: 4.9,
    plays: 2400,
    featured: true,
    trending: true,
    badge: 'POPULAR 🌟',
    thumbnail: '🥛',
    accentColor: '#38bdf8',
    gamePath: '/games/vaso-feliz/index.html'
  },
  {
    id: 'cerebro-loco',
    slug: 'cerebro-loco',
    title: 'Cerebro Loco: Acertijos',
    category: 'puzzles',
    tags: ['Puzzles', 'Acertijos', 'Ingenio', 'Lógica'],
    description: '¡Pon a prueba tu mente con acertijos tramposos! Arrastra objetos, descubre secretos y piensa fuera de la caja.',
    rating: 4.9,
    plays: 1850,
    featured: true,
    trending: true,
    badge: 'MENTE 🧠',
    thumbnail: '💡',
    accentColor: '#f59e0b',
    gamePath: '/games/cerebro-loco/index.html'
  },
  {
    id: 'nivel-maldito',
    slug: 'nivel-maldito',
    title: 'Nivel Maldito',
    category: 'arcade',
    tags: ['Troll', 'Plataformas', 'Desafío', 'Divertido'],
    description: '¡El juego de plataformas más troll y adictivo! Esquiva suelos falsos, puertas que huyen y techos aplastantes.',
    rating: 4.9,
    plays: 2150,
    featured: true,
    trending: true,
    badge: 'TENDENCIA 🔥',
    thumbnail: '😈',
    accentColor: '#ef4444',
    gamePath: '/games/nivel-maldito/index.html'
  },
  {
    id: 'angry-pigs-3d',
    slug: 'angry-pigs-3d',
    title: 'Angry Pigs 3D',
    category: '3d',
    tags: ['3D', 'Física', 'Acción', 'Destrucción'],
    description: '¡Lanza cerdos en un valle 3D masivo con cámara lenta y destruye las fortalezas de los pájaros!',
    rating: 4.9,
    plays: 1420,
    featured: true,
    trending: true,
    badge: 'HOT 🔥',
    thumbnail: '🐷',
    accentColor: '#2ecc71',
    gamePath: '/games/angry-pigs-3d/index.html'
  },
  {
    id: 'retro-knight',
    slug: 'retro-knight',
    title: 'Leyenda del Reino Dorado',
    category: 'aventura',
    tags: ['Aventura', 'Retro', 'Pixel Art', 'RPG'],
    description: 'Explora el bosque, la cueva de los murciélagos y el castillo real para conseguir el cofre legendario.',
    rating: 4.8,
    plays: 980,
    featured: true,
    trending: false,
    badge: 'NUEVO ⭐',
    thumbnail: '⚔️',
    accentColor: '#f1c40f',
    gamePath: '/games/retro-knight/index.html'
  },
  {
    id: 'cyber-runner',
    slug: 'cyber-runner',
    title: 'Cyber Runner 2099',
    category: 'carreras',
    tags: ['Carreras', 'Cyberpunk', 'Velocidad', 'Arcade'],
    description: 'Esquiva láseres y obstáculos a toda velocidad en una pista futurista de neón.',
    rating: 4.7,
    plays: 1250,
    featured: false,
    trending: true,
    badge: 'TOP 🏆',
    thumbnail: '🏎️',
    accentColor: '#00d2d3',
    gamePath: '/games/cyber-runner/index.html'
  },
  {
    id: 'puzzle-2048',
    slug: 'puzzle-2048',
    title: 'Neon 2048 Master',
    category: 'puzzles',
    tags: ['Puzzles', 'Estrategia', 'Lógica', 'Mente'],
    description: 'Combina los bloques numéricos brillantes hasta alcanzar la legendaria ficha 2048.',
    rating: 4.6,
    plays: 830,
    featured: false,
    trending: false,
    badge: '',
    thumbnail: '🧩',
    accentColor: '#ff9f43',
    gamePath: '/games/puzzle-2048/index.html'
  },
  {
    id: 'space-arcade',
    slug: 'space-arcade',
    title: 'Space Defenders Retro',
    category: 'arcade',
    tags: ['Arcade', 'Espacio', 'Disparos', 'Clásico'],
    description: 'Defiende la galaxia contra oleadas de invasores extraterrestres en este shooter clásico.',
    rating: 4.5,
    plays: 720,
    featured: false,
    trending: false,
    badge: 'CLÁSICO 👾',
    thumbnail: '🚀',
    accentColor: '#54a0ff',
    gamePath: '/games/space-arcade/index.html'
  }
];

exports.getAllGames = (req, res) => {
  const { category, search, trending, featured } = req.query;
  let results = GAMES_CATALOG.map(g => {
    const stats = db.getStats(g.slug);
    return { ...g, plays: stats.plays, rating: stats.rating, likes: stats.likes };
  });

  if (category && category !== 'todos') {
    results = results.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    results = results.filter(g => 
      g.title.toLowerCase().includes(query) || 
      g.tags.some(t => t.toLowerCase().includes(query)) ||
      g.description.toLowerCase().includes(query)
    );
  }

  if (trending === 'true') {
    results = results.filter(g => g.trending);
  }

  if (featured === 'true') {
    results = results.filter(g => g.featured);
  }

  res.json({ success: true, count: results.length, data: results });
};

exports.getGameBySlug = (req, res) => {
  const { slug } = req.params;
  const game = GAMES_CATALOG.find(g => g.slug === slug);
  if (!game) {
    return res.status(404).json({ success: false, message: 'Juego no encontrado' });
  }

  const stats = db.getStats(slug);
  const comments = db.getComments(slug);
  const related = GAMES_CATALOG.filter(g => g.slug !== slug && (g.category === game.category || g.featured));

  res.json({
    success: true,
    data: {
      ...game,
      plays: stats.plays,
      likes: stats.likes,
      dislikes: stats.dislikes,
      comments,
      related
    }
  });
};

exports.recordGamePlay = async (req, res) => {
  const { slug } = req.params;
  const stats = await db.recordPlay(slug);
  res.json({ success: true, data: stats });
};

exports.voteGame = async (req, res) => {
  const { slug } = req.params;
  const { type } = req.body; // 'like' o 'dislike'
  const stats = await db.vote(slug, type);
  res.json({ success: true, data: stats });
};

exports.addComment = async (req, res) => {
  const { slug } = req.params;
  const { user, text, rating } = req.body;
  if (!text) {
    return res.status(400).json({ success: false, message: 'El comentario no puede estar vacío' });
  }
  const comment = await db.addComment(slug, { user, text, rating });
  res.json({ success: true, data: comment });
};

exports.getGlobalStats = (req, res) => {
  let totalPlays = 0;
  let totalLikes = 0;
  GAMES_CATALOG.forEach(g => {
    const s = db.getStats(g.slug);
    totalPlays += s.plays;
    totalLikes += s.likes;
  });

  res.json({
    success: true,
    data: {
      totalGames: GAMES_CATALOG.length,
      totalPlays,
      totalLikes,
      onlinePlayers: Math.floor(Math.random() * 80) + 120
    }
  });
};
