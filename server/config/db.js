/**
 * CONFIGURACIÓN DE BASE DE DATOS FLEXIBLE PARA RAILWAY
 * Soporta PostgreSQL (Railway) con inicialización automática y respaldo ultrarrápido en memoria
 */

let Pool = null;
try {
  Pool = require('pg').Pool;
} catch (e) {
  // pg se instalará en Railway en producción
}

class Database {
  constructor() {
    this.dbUrl = process.env.DATABASE_URL || null;
    this.pool = null;
    this.isPostgres = !!(this.dbUrl && this.dbUrl.startsWith('postgres') && Pool);

    // Almacén en memoria
    this.memoryStats = {
      'nivel-maldito': { plays: 2150, likes: 640, dislikes: 18, rating: 4.9 },
      'angry-pigs-3d': { plays: 1420, likes: 389, dislikes: 12, rating: 4.9 },
      'retro-knight': { plays: 980, likes: 245, dislikes: 8, rating: 4.8 },
      'cyber-runner': { plays: 1250, likes: 310, dislikes: 15, rating: 4.7 },
      'puzzle-2048': { plays: 830, likes: 190, dislikes: 5, rating: 4.6 },
      'space-arcade': { plays: 720, likes: 165, dislikes: 9, rating: 4.5 }
    };

    this.memoryComments = {
      'nivel-maldito': [
        { id: 1, user: 'TrollMaster', text: '¡La puerta que se escapa en el nivel 3 me mató de risa! 🚪😂', date: 'Hace 1 hora', rating: 5 },
        { id: 2, user: 'GamerGirl99', text: 'El nivel con controles invertidos es súper difícil pero adictivo 🔥', date: 'Hace 3 horas', rating: 5 }
      ],
      'angry-pigs-3d': [
        { id: 1, user: 'GamerPro99', text: '¡La física 3D y los ojos saltones son lo mejor! 🐷🔥', date: 'Hace 2 horas', rating: 5 }
      ]
    };

    if (this.isPostgres) {
      this.initPostgres();
    } else {
      console.log('[Database] Modo: Almacén Integrado en Memoria');
    }
  }

  async initPostgres() {
    try {
      this.pool = new Pool({
        connectionString: this.dbUrl,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });

      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS game_stats (
          game_slug VARCHAR(64) PRIMARY KEY,
          plays INT DEFAULT 0,
          likes INT DEFAULT 0,
          dislikes INT DEFAULT 0,
          rating NUMERIC(3, 1) DEFAULT 5.0
        );

        CREATE TABLE IF NOT EXISTS game_comments (
          id SERIAL PRIMARY KEY,
          game_slug VARCHAR(64) NOT NULL,
          user_name VARCHAR(64) NOT NULL,
          comment_text TEXT NOT NULL,
          rating INT DEFAULT 5,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      for (const [slug, stat] of Object.entries(this.memoryStats)) {
        await this.pool.query(`
          INSERT INTO game_stats (game_slug, plays, likes, dislikes, rating)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (game_slug) DO NOTHING;
        `, [slug, stat.plays, stat.likes, stat.dislikes, stat.rating]);
      }

      console.log('✅ [Database] PostgreSQL Conectado y Tablas Inicializadas con Éxito!');
    } catch (err) {
      console.error('⚠️ [Database] Error conectando a PostgreSQL, usando modo fallback:', err.message);
      this.pool = null;
    }
  }

  async recordPlay(gameSlug) {
    if (this.pool) {
      try {
        const res = await this.pool.query(`
          INSERT INTO game_stats (game_slug, plays, likes, dislikes, rating)
          VALUES ($1, 1, 0, 0, 5.0)
          ON CONFLICT (game_slug)
          DO UPDATE SET plays = game_stats.plays + 1
          RETURNING *;
        `, [gameSlug]);
        return res.rows[0];
      } catch (e) {}
    }

    if (!this.memoryStats[gameSlug]) {
      this.memoryStats[gameSlug] = { plays: 0, likes: 0, dislikes: 0, rating: 5.0 };
    }
    this.memoryStats[gameSlug].plays++;
    return this.memoryStats[gameSlug];
  }

  async vote(gameSlug, type) {
    if (this.pool) {
      try {
        const col = type === 'like' ? 'likes' : 'dislikes';
        const res = await this.pool.query(`
          INSERT INTO game_stats (game_slug, plays, likes, dislikes, rating)
          VALUES ($1, 1, ${type === 'like' ? 1 : 0}, ${type === 'dislike' ? 1 : 0}, 5.0)
          ON CONFLICT (game_slug)
          DO UPDATE SET ${col} = game_stats.${col} + 1
          RETURNING *;
        `, [gameSlug]);
        return res.rows[0];
      } catch (e) {}
    }

    if (!this.memoryStats[gameSlug]) {
      this.memoryStats[gameSlug] = { plays: 1, likes: 0, dislikes: 0, rating: 5.0 };
    }
    if (type === 'like') this.memoryStats[gameSlug].likes++;
    if (type === 'dislike') this.memoryStats[gameSlug].dislikes++;
    return this.memoryStats[gameSlug];
  }

  async addComment(gameSlug, { user, text, rating }) {
    if (this.pool) {
      try {
        const res = await this.pool.query(`
          INSERT INTO game_comments (game_slug, user_name, comment_text, rating)
          VALUES ($1, $2, $3, $4)
          RETURNING id, user_name as user, comment_text as text, rating, to_char(created_at, 'DD/MM/YYYY HH24:MI') as date;
        `, [gameSlug, user || 'Jugador Eze', text, rating || 5]);
        return res.rows[0];
      } catch (e) {}
    }

    if (!this.memoryComments[gameSlug]) this.memoryComments[gameSlug] = [];
    const newComment = {
      id: Date.now(),
      user: user || 'Jugador Eze',
      text,
      rating: rating || 5,
      date: 'Justo ahora'
    };
    this.memoryComments[gameSlug].unshift(newComment);
    return newComment;
  }

  getStats(gameSlug) {
    return this.memoryStats[gameSlug] || { plays: 0, likes: 0, dislikes: 0, rating: 5.0 };
  }

  getComments(gameSlug) {
    return this.memoryComments[gameSlug] || [];
  }
}

module.exports = new Database();
