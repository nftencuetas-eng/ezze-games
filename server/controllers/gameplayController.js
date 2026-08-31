/**
 * CONTROLADOR DE JUEGO, VIDAS, TIEMPO Y QUIZ EDUCATIVO - EZZE.GAMES
 */

const db = require('../db/dbAdapter');

// Middleware / Validador de Acceso al Juego
exports.checkAccess = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'usr_demo_1';
    const { gameSlug } = req.body;

    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    db.checkMidnightReset(user);

    // 1. Validar Límite Parental Diario
    if (!user.es_premium && user.limite_diario_minutos > 0 && user.tiempo_jugado_hoy >= user.limite_diario_minutos) {
      return res.json({
        allowed: false,
        reason: 'TIME_LIMIT_REACHED',
        message: '¡Has alcanzado tu límite de juego diario! Es hora de descansar la vista o hacer la tarea. 📚⏰',
        tiempo_jugado_hoy: user.tiempo_jugado_hoy,
        limite_diario_minutos: user.limite_diario_minutos
      });
    }

    // 2. Validar Vidas
    if (!user.es_premium && user.vidas <= 0) {
      return res.json({
        allowed: false,
        reason: 'NO_LIVES',
        message: '¡Te has quedado sin vidas! Resuelve el quiz educativo para recargar 1 vida gratis. 🎓❤️',
        abrirQuizEducativo: true,
        vidas: 0
      });
    }

    // 3. Descontar 1 Vida si no es premium
    if (!user.es_premium) {
      user.vidas = Math.max(0, user.vidas - 1);
    }

    // Registrar inicio en historial
    const historial = db.getCollection('historial_partidas');
    historial.push({
      id: 'part_' + Date.now(),
      usuario_id: user.id,
      juego_slug: gameSlug,
      puntaje: 0,
      duracion_segundos: 0,
      created_at: new Date().toISOString()
    });

    db.save();

    res.json({
      allowed: true,
      message: '¡Acceso concedido! ¡A jugar!',
      vidas_restantes: user.vidas,
      es_premium: user.es_premium,
      tiempo_jugado_hoy: user.tiempo_jugado_hoy
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al verificar acceso al juego' });
  }
};

// Heartbeat de Tiempo Jugado (Se llama cada 1 minuto de juego)
exports.recordPlayTime = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'usr_demo_1';
    const { minutes = 1, xpEarned = 10 } = req.body;

    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    db.checkMidnightReset(user);

    user.tiempo_jugado_hoy += minutes;
    user.xp += xpEarned;
    user.monedas += 5;

    // Chequear subida de nivel (Cada 100 XP)
    const nuevoNivel = Math.floor(user.xp / 100) + 1;
    let subioNivel = false;
    let stickerDesbloqueado = null;

    if (nuevoNivel > user.nivel) {
      user.nivel = nuevoNivel;
      subioNivel = true;
      user.monedas += 50; // Bono de nivel

      // Desbloquear sticker correspondiente al nivel
      const stickers = db.getCollection('stickers');
      const st = stickers.find(s => s.nivel_desbloqueo === nuevoNivel);
      if (st) {
        const ustk = db.getCollection('usuario_stickers');
        if (!ustk.some(u => u.usuario_id === user.id && u.sticker_id === st.id)) {
          ustk.push({ id: 'ustk_' + Date.now(), usuario_id: user.id, sticker_id: st.id, fecha_desbloqueo: new Date().toISOString() });
          stickerDesbloqueado = st;
        }
      }
    }

    db.save();

    res.json({
      tiempo_jugado_hoy: user.tiempo_jugado_hoy,
      xp: user.xp,
      nivel: user.nivel,
      monedas: user.monedas,
      subioNivel,
      stickerDesbloqueado
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar tiempo de juego' });
  }
};

// Obtener Preguntas del Quiz Educativo
exports.getQuizQuestions = (req, res) => {
  try {
    const preguntas = db.getCollection('preguntas_quiz');
    // Mezclar y tomar 3 preguntas
    const shuffled = [...preguntas].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Ocultar la respuesta correcta directa en la lista de opciones
    const sanitized = shuffled.map(q => ({
      id: q.id,
      categoria: q.categoria,
      pregunta: q.pregunta,
      opciones: q.opciones,
      dificultad: q.dificultad
    }));

    res.json({ questions: sanitized });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener preguntas del quiz' });
  }
};

// Responder y Validar Quiz Educativo
exports.submitQuizAnswers = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'usr_demo_1';
    const { answers } = req.body; // Array de { questionId, selectedAnswer }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Respuestas requeridas' });
    }

    const preguntas = db.getCollection('preguntas_quiz');
    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    let correctCount = 0;
    answers.forEach(ans => {
      const q = preguntas.find(item => item.id === ans.questionId);
      if (q && q.respuesta_correcta === ans.selectedAnswer) {
        correctCount++;
      }
    });

    const aprobado = correctCount >= 2; // Requiere al menos 2 de 3
    let vidasRecargadas = 0;
    let xpGanada = 0;

    if (aprobado) {
      vidasRecargadas = 1;
      user.vidas = Math.min(user.max_vidas || 5, user.vidas + 1);
      xpGanada = 50;
      user.xp += xpGanada;
      user.monedas += 20;

      // Verificar subida de nivel
      const nuevoNivel = Math.floor(user.xp / 100) + 1;
      if (nuevoNivel > user.nivel) {
        user.nivel = nuevoNivel;
      }
    }

    db.save();

    res.json({
      aprobado,
      correctCount,
      totalQuestions: answers.length,
      vidas_actuales: user.vidas,
      vidasRecargadas,
      xpGanada,
      nivel: user.nivel,
      monedas: user.monedas,
      message: aprobado 
        ? '🎉 ¡Excelente! Acertaste las preguntas educativas. Has recargado +1 Vida y ganado +50 XP.' 
        : 'Sigue practicando. Necesitas al menos 2 aciertos para recargar vidas.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar respuestas del quiz' });
  }
};
