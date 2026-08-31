/**
 * CONTROLADOR DE LA TIENDA DE JUGUETES - EZZE.GAMES
 */

const db = require('../db/dbAdapter');

// Obtener Productos Destacados de la Tienda de Juguetes
exports.getFeaturedToys = (req, res) => {
  try {
    const productos = db.getCollection('productos_tienda');
    res.json({
      tienda: {
        nombre: 'Tiendfy Juguetería Familiar',
        banner_promo: '¡Descuento del 15% con tus monedas de ezze.games!',
        whatsapp_soporte: '+595981000000',
        productos: productos
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos de la tienda' });
  }
};
