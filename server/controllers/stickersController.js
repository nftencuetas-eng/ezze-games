/**
 * CONTROLADOR DE ÁLBUM DE STICKERS Y COLECCIONABLES - EZZE.GAMES
 */

const db = require('../db/dbAdapter');

// Obtener Álbum Completo del Usuario con Estado de Bloqueo
exports.getUserAlbum = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || 'usr_demo_1';
    const allStickers = db.getCollection('stickers');
    const userStickers = db.getCollection('usuario_stickers').filter(u => u.usuario_id === userId);
    const unlockedIds = new Set(userStickers.map(u => u.sticker_id));

    const album = allStickers.map(s => ({
      id: s.id,
      nombre: s.nombre,
      icono: s.icono,
      categoria: s.categoria,
      rareza: s.rareza,
      nivel_desbloqueo: s.nivel_desbloqueo,
      descripcion: s.descripcion,
      desbloqueado: unlockedIds.has(s.id),
      fecha_desbloqueo: userStickers.find(u => u.sticker_id === s.id)?.fecha_desbloqueo || null
    }));

    const total = allStickers.length;
    const desbloqueados = album.filter(a => a.desbloqueado).length;

    res.json({
      album,
      progreso: {
        total,
        desbloqueados,
        porcentaje: Math.round((desbloqueados / (total || 1)) * 100)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener álbum de stickers' });
  }
};
