/**
 * CONTROLADOR DE JUEGOS Y ESTADÍSTICAS - EZZE.GAMES
 */

const LOCAL_GAMES = require('../../client/js/gamesData.js');
const db = require('../config/db.js');

const getAllGames = (req, res) => {
  const { category, search, tag } = req.query;
  let filtered = [...LOCAL_GAMES];

  if (category && category !== 'todos' && category !== 'favoritos') {
    filtered = filtered.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    filtered = filtered.filter(g => g.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(g => 
      g.title.toLowerCase().includes(q) || 
      g.description.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

const getGameBySlug = (req, res) => {
  const { slug } = req.params;
  const game = LOCAL_GAMES.find(g => g.slug === slug || g.id === slug);

  if (!game) {
    return res.status(404).json({ success: false, message: 'Juego no encontrado' });
  }

  const stats = db.getStats(slug);
  const comments = db.getComments(slug);

  res.json({
    success: true,
    data: {
      ...game,
      stats,
      comments
    }
  });
};

const recordPlay = async (req, res) => {
  const { slug } = req.params;
  const updatedStats = await db.recordPlay(slug);
  res.json({ success: true, data: updatedStats });
};

const voteGame = async (req, res) => {
  const { slug } = req.params;
  const { type } = req.body;

  if (!['like', 'dislike'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Tipo de voto inválido' });
  }

  const stats = await db.vote(slug, type);
  res.json({ success: true, data: stats });
};

const addComment = async (req, res) => {
  const { slug } = req.params;
  const { user, text, rating } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'El comentario no puede estar vacío' });
  }

  const newComment = await db.addComment(slug, { user, text, rating });
  res.json({ success: true, data: newComment });
};

const getGlobalStats = (req, res) => {
  res.json({
    success: true,
    data: {
      onlinePlayers: Math.floor(Math.random() * 80) + 210,
      totalPlays: 148200,
      totalGames: LOCAL_GAMES.length
    }
  });
};

module.exports = {
  getAllGames,
  getGameBySlug,
  recordPlay,
  recordGamePlay: recordPlay,
  voteGame,
  addComment,
  getGlobalStats
};
