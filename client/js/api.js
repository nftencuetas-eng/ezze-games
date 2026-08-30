/**
 * CLIENTE DE API PARA SINCRONIZACIÓN CON EL BACKEND / RAILWAY
 */

class ApiClient {
  constructor() {
    this.baseUrl = window.location.origin;
  }

  async getGames(category = '', search = '') {
    try {
      const url = new URL('/api/games', this.baseUrl);
      if (category && category !== 'todos' && category !== 'favoritos') {
        url.searchParams.set('category', category);
      }
      if (search) {
        url.searchParams.set('search', search);
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error al conectar con la API');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[ApiClient] Usando catálogo local:', err.message);
      let results = [...LOCAL_GAMES];
      if (category && category !== 'todos' && category !== 'favoritos') {
        results = results.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(g => g.title.toLowerCase().includes(q) || g.tags.some(t => t.toLowerCase().includes(q)));
      }
      return results;
    }
  }

  async getGameDetails(slug) {
    try {
      const res = await fetch(`${this.baseUrl}/api/games/${slug}`);
      if (!res.ok) throw new Error('Juego no encontrado');
      const data = await res.json();
      return data.data;
    } catch (err) {
      const g = LOCAL_GAMES.find(item => item.slug === slug);
      return {
        ...g,
        likes: 120,
        dislikes: 4,
        comments: [
          { id: 1, user: 'GamerEze', text: '¡Excelente juego, muy fluido!', date: 'Reciente', rating: 5 }
        ],
        related: LOCAL_GAMES.filter(item => item.slug !== slug)
      };
    }
  }

  async recordPlay(slug) {
    try {
      await fetch(`${this.baseUrl}/api/games/${slug}/play`, { method: 'POST' });
    } catch (e) {}
  }

  async vote(slug, type) {
    try {
      const res = await fetch(`${this.baseUrl}/api/games/${slug}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  }

  async addComment(slug, { user, text, rating }) {
    try {
      const res = await fetch(`${this.baseUrl}/api/games/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, text, rating })
      });
      return await res.json();
    } catch (e) {
      return { success: true, data: { id: Date.now(), user, text, rating, date: 'Justo ahora' } };
    }
  }

  async getStats() {
    try {
      const res = await fetch(`${this.baseUrl}/api/stats`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      return { totalGames: 5, totalPlays: 5200, totalLikes: 1400, onlinePlayers: 154 };
    }
  }
}

window.api = new ApiClient();
