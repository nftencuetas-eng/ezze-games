/**
 * CLIENTE DE API PARA SINCRONIZACIÓN CON EL BACKEND / RAILWAY
 */

class ApiClient {
  constructor() {
    this.baseUrl = window.location.origin;
    this.currentUser = JSON.parse(localStorage.getItem('ezze_user') || 'null') || {
      id: 'usr_demo_1',
      username: 'EzeGamer',
      avatar: '🦊',
      nivel: 3,
      xp: 240,
      vidas: 5,
      max_vidas: 5,
      monedas: 350,
      es_premium: false,
      tiempo_jugado_hoy: 18,
      limite_diario_minutos: 60
    };
  }

  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-user-id': this.currentUser?.id || 'usr_demo_1'
    };
  }

  // --- JUEGOS Y CATÁLOGO ---
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

  // --- AUTENTICACIÓN & PERFIL ---
  async register(username, password, avatar = '🦁') {
    const res = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, avatar })
    });
    const data = await res.json();
    if (res.ok && data.user) {
      this.currentUser = data.user;
      localStorage.setItem('ezze_user', JSON.stringify(data.user));
    }
    return data;
  }

  async login(username, password) {
    const res = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.user) {
      this.currentUser = data.user;
      localStorage.setItem('ezze_user', JSON.stringify(data.user));
    }
    return data;
  }

  async googleLogin(name, email, avatar = '🚀') {
    const res = await fetch(`${this.baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, avatar })
    });
    const data = await res.json();
    if (res.ok && data.user) {
      this.currentUser = data.user;
      localStorage.setItem('ezze_user', JSON.stringify(data.user));
    }
    return data;
  }

  async getProfile() {
    try {
      const res = await fetch(`${this.baseUrl}/api/auth/profile`, {
        headers: this.getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.user) {
        this.currentUser = data.user;
        localStorage.setItem('ezze_user', JSON.stringify(data.user));
      }
      return data.user || this.currentUser;
    } catch (e) {
      return this.currentUser;
    }
  }

  async updateProfile(updates) {
    const res = await fetch(`${this.baseUrl}/api/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (res.ok && data.user) {
      this.currentUser = data.user;
      localStorage.setItem('ezze_user', JSON.stringify(data.user));
    }
    return data;
  }

  // --- GAMEPLAY, VIDAS Y QUIZ EDUCATIVO ---
  async checkGameAccess(gameSlug) {
    try {
      const res = await fetch(`${this.baseUrl}/api/gameplay/access`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ gameSlug })
      });
      const data = await res.json();
      if (data.vidas_restantes !== undefined) {
        this.currentUser.vidas = data.vidas_restantes;
        localStorage.setItem('ezze_user', JSON.stringify(this.currentUser));
      }
      return data;
    } catch (e) {
      return { allowed: true, vidas_restantes: this.currentUser.vidas };
    }
  }

  async sendHeartbeat(minutes = 1, xpEarned = 10) {
    try {
      const res = await fetch(`${this.baseUrl}/api/gameplay/heartbeat`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ minutes, xpEarned })
      });
      const data = await res.json();
      if (res.ok) {
        this.currentUser.tiempo_jugado_hoy = data.tiempo_jugado_hoy;
        this.currentUser.xp = data.xp;
        this.currentUser.nivel = data.nivel;
        this.currentUser.monedas = data.monedas;
        localStorage.setItem('ezze_user', JSON.stringify(this.currentUser));
      }
      return data;
    } catch (e) {
      return { xp: this.currentUser.xp, nivel: this.currentUser.nivel };
    }
  }

  async getQuizQuestions() {
    try {
      const res = await fetch(`${this.baseUrl}/api/gameplay/quiz/questions`);
      const data = await res.json();
      return data.questions || [];
    } catch (e) {
      return [
        { id: 'q_1', categoria: 'Matemáticas', pregunta: '¿Cuánto es 6 × 7?', opciones: ['42', '36', '48', '40'], dificultad: 'fácil' },
        { id: 'q_2', categoria: 'Ciencias', pregunta: '¿Qué planeta tiene anillos visibles?', opciones: ['Saturno', 'Marte', 'Tierra', 'Mercurio'], dificultad: 'fácil' },
        { id: 'q_3', categoria: 'Naturaleza', pregunta: '¿Cómo se llama el bebé del perro?', opciones: ['Cachorro', 'Potro', 'Ternero', 'Pollito'], dificultad: 'fácil' }
      ];
    }
  }

  async submitQuizAnswers(answers) {
    const res = await fetch(`${this.baseUrl}/api/gameplay/quiz/submit`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    if (res.ok && data.vidas_actuales !== undefined) {
      this.currentUser.vidas = data.vidas_actuales;
      this.currentUser.xp = (this.currentUser.xp || 0) + (data.xpGanada || 0);
      localStorage.setItem('ezze_user', JSON.stringify(this.currentUser));
    }
    return data;
  }

  // --- STICKERS Y TIENDA ---
  async getStickerAlbum() {
    try {
      const res = await fetch(`${this.baseUrl}/api/stickers/album`, {
        headers: this.getAuthHeaders()
      });
      return await res.json();
    } catch (e) {
      return { album: [], progreso: { total: 5, desbloqueados: 2, porcentaje: 40 } };
    }
  }

  async getToyStore() {
    try {
      const res = await fetch(`${this.baseUrl}/api/store/featured`);
      return await res.json();
    } catch (e) {
      return { tienda: { productos: [] } };
    }
  }
}

window.api = new ApiClient();
