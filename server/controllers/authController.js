/**
 * CONTROLADOR DE AUTENTICACIÓN Y PERFIL - EZZE.GAMES
 */

const db = require('../db/dbAdapter');

// Registro Tradicional
exports.register = (req, res) => {
  try {
    const { username, email, password, avatar, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
    }

    const usuarios = db.getCollection('usuarios');
    const existing = usuarios.find(u => u.username.toLowerCase() === username.toLowerCase() || (email && u.email === email));
    if (existing) {
      return res.status(400).json({ error: 'El nombre de usuario o correo ya está registrado' });
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      username: username.trim(),
      email: email ? email.trim() : `${username.toLowerCase()}@ezze.local`,
      password: password, // Simplificado para ambiente familiar
      avatar: avatar || '🦊',
      role: role || 'niño',
      nivel: 1,
      xp: 0,
      vidas: 5,
      max_vidas: 5,
      monedas: 100, // Bono de bienvenida
      es_premium: false,
      fecha_fin_premium: null,
      tiempo_jugado_hoy: 0,
      limite_diario_minutos: 60,
      ultimo_acceso: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    usuarios.push(newUser);
    
    // Entregar primer sticker de bienvenida
    const ustk = db.getCollection('usuario_stickers');
    ustk.push({ id: 'ustk_' + Date.now(), usuario_id: newUser.id, sticker_id: 'stk_1', fecha_desbloqueo: new Date().toISOString() });

    db.save();

    res.status(201).json({
      message: '¡Registro exitoso! Bienvenido a ezze.games',
      user: sanitizeUser(newUser),
      token: 'ezze_token_' + newUser.id
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor al registrar' });
  }
};

// Login Tradicional
exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.username.toLowerCase() === (username || '').toLowerCase() && u.password === password);

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    db.checkMidnightReset(user);
    db.save();

    res.json({
      message: '¡Bienvenido de nuevo!',
      user: sanitizeUser(user),
      token: 'ezze_token_' + user.id
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
  }
};

// Login Social Google (1-Clic)
exports.googleAuth = (req, res) => {
  try {
    const { googleId, name, email, avatar } = req.body;
    const usuarios = db.getCollection('usuarios');
    let user = usuarios.find(u => u.email === email || (googleId && u.googleId === googleId));

    if (!user) {
      // Crear usuario nuevo de Google
      user = {
        id: 'usr_g_' + Date.now(),
        googleId: googleId || 'g_' + Date.now(),
        username: name || 'GamerGoogle',
        email: email || `google_${Date.now()}@gmail.com`,
        password: '',
        avatar: avatar || '🚀',
        role: 'niño',
        nivel: 1,
        xp: 0,
        vidas: 5,
        max_vidas: 5,
        monedas: 150,
        es_premium: false,
        fecha_fin_premium: null,
        tiempo_jugado_hoy: 0,
        limite_diario_minutos: 60,
        ultimo_acceso: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString()
      };
      usuarios.push(user);
      const ustk = db.getCollection('usuario_stickers');
      ustk.push({ id: 'ustk_' + Date.now(), usuario_id: user.id, sticker_id: 'stk_1', fecha_desbloqueo: new Date().toISOString() });
    } else {
      db.checkMidnightReset(user);
    }

    db.save();

    res.json({
      message: '¡Sesión con Google iniciada!',
      user: sanitizeUser(user),
      token: 'ezze_token_' + user.id
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en autenticación de Google' });
  }
};

// Obtener Perfil Actual
exports.getProfile = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'usr_demo_1';
    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    db.checkMidnightReset(user);
    db.save();

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

// Actualizar Avatar o Configuración Parental
exports.updateProfile = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'usr_demo_1';
    const { avatar, limite_diario_minutos } = req.body;
    const usuarios = db.getCollection('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (avatar) user.avatar = avatar;
    if (limite_diario_minutos !== undefined) user.limite_diario_minutos = parseInt(limite_diario_minutos);

    db.save();
    res.json({ message: 'Perfil actualizado', user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}
