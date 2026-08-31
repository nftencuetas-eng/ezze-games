const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/gamesController');
const authController = require('../controllers/authController');
const gameplayController = require('../controllers/gameplayController');
const stickersController = require('../controllers/stickersController');
const storeController = require('../controllers/storeController');

// --- RUTAS DE JUEGOS Y CATÁLOGO ---
router.get('/games', gamesController.getAllGames);
router.get('/games/:slug', gamesController.getGameBySlug);
router.post('/games/:slug/play', gamesController.recordGamePlay);
router.post('/games/:slug/vote', gamesController.voteGame);
router.post('/games/:slug/comments', gamesController.addComment);
router.get('/stats', gamesController.getGlobalStats);

// --- RUTAS DE AUTENTICACIÓN Y PERFIL ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/google', authController.googleAuth);
router.get('/auth/profile', authController.getProfile);
router.put('/auth/profile', authController.updateProfile);

// --- RUTAS DE GAMEPLAY, VIDAS, TIEMPO Y QUIZ EDUCATIVO ---
router.post('/gameplay/access', gameplayController.checkAccess);
router.post('/gameplay/heartbeat', gameplayController.recordPlayTime);
router.get('/gameplay/quiz/questions', gameplayController.getQuizQuestions);
router.post('/gameplay/quiz/submit', gameplayController.submitQuizAnswers);

// --- RUTAS DE ÁLBUM DE STICKERS ---
router.get('/stickers/album', stickersController.getUserAlbum);

// --- RUTAS DE LA TIENDA DE JUGUETES ---
router.get('/store/featured', storeController.getFeaturedToys);

module.exports = router;
