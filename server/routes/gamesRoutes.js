const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

// Rutas de Juegos
router.get('/games', gamesController.getAllGames);
router.get('/games/:slug', gamesController.getGameBySlug);
router.post('/games/:slug/play', gamesController.recordGamePlay);
router.post('/games/:slug/vote', gamesController.voteGame);
router.post('/games/:slug/comments', gamesController.addComment);
router.get('/stats', gamesController.getGlobalStats);

module.exports = router;
