/**
 * CONTROLADOR PRINCIPAL DE LA PLATAFORMA - EZZE.GAMES
 * Integra catálogo, búsqueda, autenticación, perfiles, vidas, quiz educativo y álbum de stickers.
 */

class EzeGamingApp {
  constructor() {
    this.currentCategory = 'todos';
    this.searchQuery = '';
    this.favorites = JSON.parse(localStorage.getItem('eze_favorites') || '[]');
    this.games = [];
    this.featuredGames = [];
    this.currentHeroIndex = 0;
    this.heroInterval = null;

    // Estado del Quiz Educativo
    this.quizQuestions = [];
    this.currentQuizIndex = 0;
    this.quizAnswers = [];

    this.initElements();
    this.initApp();
  }

  initElements() {
    this.categoryBar = document.getElementById('categoryBar');
    this.gamesGrid = document.getElementById('gamesGrid');
    this.searchInput = document.getElementById('searchInput');
    this.heroSlider = document.getElementById('heroSlider');
    this.activeCategoryTitle = document.getElementById('activeCategoryTitle');
    this.gamesCountBadge = document.getElementById('gamesCountBadge');

    // Elementos de Usuario
    this.navLivesCount = document.getElementById('navLivesCount');
    this.navCoinsCount = document.getElementById('navCoinsCount');
    this.navAvatar = document.getElementById('navAvatar');
    this.navUsername = document.getElementById('navUsername');
    this.navLevelBadge = document.getElementById('navLevelBadge');
    this.btnNavProfile = document.getElementById('btnNavProfile');
    this.btnNavAlbum = document.getElementById('btnNavAlbum');
    this.btnNavLives = document.getElementById('btnNavLives');

    // Modales
    this.authModal = document.getElementById('authModal');
    this.profileModal = document.getElementById('profileModal');
    this.albumModal = document.getElementById('albumModal');
    this.quizModal = document.getElementById('quizModal');
  }

  async initApp() {
    window.gamePlayer = new GamePlayer();

    this.renderCategories();
    this.initSearch();
    await this.loadGames();
    this.initHeroSlider();
    this.initUserAndModals();
    this.loadToyStore();

    // Sincronizar perfil con backend
    await window.api.getProfile();
    this.updateUserUI();

    // Comprobar si hay juego en el hash
    const hash = window.location.hash;
    if (hash && hash.startsWith('#play-')) {
      const slug = hash.replace('#play-', '');
      window.gamePlayer.open(slug);
    }
  }

  // --- INTERFAZ DE USUARIO & GAMIFICACIÓN ---
  updateUserUI() {
    const user = window.api.currentUser;
    if (!user) return;

    if (this.navLivesCount) {
      const max = user.max_vidas || 5;
      this.navLivesCount.textContent = user.es_premium ? '∞' : `${user.vidas}/${max}`;
    }
    if (this.navCoinsCount) this.navCoinsCount.textContent = user.monedas || 0;
    if (this.navAvatar) this.navAvatar.textContent = user.avatar || '🦊';
    if (this.navUsername) this.navUsername.textContent = user.username || 'Gamer';
    if (this.navLevelBadge) this.navLevelBadge.textContent = `Nvl ${user.nivel || 1}`;

    // Actualizar datos del modal de perfil
    const bigAvatar = document.getElementById('profileAvatarBig');
    const bigUser = document.getElementById('profileUsernameBig');
    const lvlText = document.getElementById('profileLevelText');
    const xpBar = document.getElementById('profileXpBar');
    const playedToday = document.getElementById('profilePlayedToday');
    const limitLabel = document.getElementById('labelDailyLimit');
    const limitInput = document.getElementById('inputDailyLimit');

    if (bigAvatar) bigAvatar.textContent = user.avatar || '🦊';
    if (bigUser) bigUser.textContent = user.username || 'Gamer';
    if (lvlText) lvlText.textContent = `Nivel ${user.nivel || 1} • ${user.xp || 0} XP`;
    if (xpBar) {
      const currentLevelXp = (user.xp || 0) % 100;
      xpBar.style.width = `${Math.min(100, currentLevelXp)}%`;
    }
    if (playedToday) playedToday.textContent = `${user.tiempo_jugado_hoy || 0} min`;
    if (limitLabel) limitLabel.textContent = `${user.limite_diario_minutos || 60} min`;
    if (limitInput) limitInput.value = user.limite_diario_minutos || 60;
  }

  initUserAndModals() {
    // Abrir Perfil o Auth
    this.btnNavProfile.addEventListener('click', () => {
      this.profileModal.classList.remove('hidden');
    });

    // Abrir Álbum de Stickers
    this.btnNavAlbum.addEventListener('click', () => {
      this.openAlbumModal();
    });

    // Clic en vidas abre Quiz para recargar
    this.btnNavLives.addEventListener('click', () => {
      this.openQuizModal();
    });

    // Cerrar Modales
    document.getElementById('btnCloseAuth').addEventListener('click', () => this.authModal.classList.add('hidden'));
    document.getElementById('btnCloseProfile').addEventListener('click', () => this.profileModal.classList.add('hidden'));
    document.getElementById('btnCloseAlbum').addEventListener('click', () => this.albumModal.classList.add('hidden'));
    document.getElementById('btnCloseQuiz').addEventListener('click', () => this.quizModal.classList.add('hidden'));
    document.getElementById('btnFinishQuiz').addEventListener('click', () => this.quizModal.classList.add('hidden'));

    // Configuración de Auth (Tabs Login / Register)
    let isRegisterMode = false;
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const avatarGroup = document.getElementById('avatarPickerGroup');
    const authTitle = document.getElementById('authModalTitle');
    const submitBtn = document.getElementById('btnSubmitAuth');

    tabLogin.addEventListener('click', () => {
      isRegisterMode = false;
      tabLogin.style.background = 'linear-gradient(135deg, #2563eb, #3b82f6)';
      tabRegister.style.background = 'rgba(255,255,255,0.1)';
      avatarGroup.classList.add('hidden');
      authTitle.textContent = 'Iniciar Sesión';
      submitBtn.textContent = 'ENTRAR A EZZE.GAMES';
    });

    tabRegister.addEventListener('click', () => {
      isRegisterMode = true;
      tabRegister.style.background = 'linear-gradient(135deg, #2563eb, #3b82f6)';
      tabLogin.style.background = 'rgba(255,255,255,0.1)';
      avatarGroup.classList.remove('hidden');
      authTitle.textContent = 'Crear Nueva Cuenta';
      submitBtn.textContent = 'REGISTRARME Y JUGAR';
    });

    // Selección de Avatar en Registro
    let selectedAvatar = '🦊';
    document.querySelectorAll('.avatar-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedAvatar = opt.getAttribute('data-avatar');
      });
    });

    // Envío del Formulario de Auth
    document.getElementById('authForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = document.getElementById('authUsername').value.trim();
      const p = document.getElementById('authPassword').value;

      if (!u || !p) return;

      let res;
      if (isRegisterMode) {
        res = await window.api.register(u, p, selectedAvatar);
      } else {
        res = await window.api.login(u, p);
      }

      if (res.error) {
        alert(`❌ ${res.error}`);
      } else {
        alert(`✅ ${res.message}`);
        this.authModal.classList.add('hidden');
        this.updateUserUI();
      }
    });

    // Google 1-Click Login
    document.getElementById('btnGoogleAuth').addEventListener('click', async () => {
      const randomName = 'JugadorGoogle_' + Math.floor(Math.random() * 900 + 100);
      const res = await window.api.googleLogin(randomName, `${randomName.toLowerCase()}@gmail.com`, '🚀');
      alert(`✅ ${res.message}`);
      this.authModal.classList.add('hidden');
      this.updateUserUI();
    });

    // Control Parental Slider
    const inputLimit = document.getElementById('inputDailyLimit');
    const labelLimit = document.getElementById('labelDailyLimit');
    inputLimit.addEventListener('input', (e) => {
      labelLimit.textContent = `${e.target.value} min`;
    });

    document.getElementById('btnSaveProfile').addEventListener('click', async () => {
      const limit = parseInt(inputLimit.value);
      await window.api.updateProfile({ limite_diario_minutos: limit });
      alert('✅ Ajustes de perfil y control parental guardados.');
      this.profileModal.classList.add('hidden');
      this.updateUserUI();
    });
  }

  // --- ÁLBUM DE STICKERS ---
  async openAlbumModal() {
    const data = await window.api.getStickerAlbum();
    const grid = document.getElementById('stickersGrid');
    const percentText = document.getElementById('albumPercentText');
    const progressBar = document.getElementById('albumProgressBar');

    percentText.textContent = `${data.progreso.desbloqueados} / ${data.progreso.total} Desbloqueados (${data.progreso.porcentaje}%)`;
    progressBar.style.width = `${data.progreso.porcentaje}%`;

    grid.innerHTML = '';
    data.album.forEach(stk => {
      const el = document.createElement('div');
      el.className = `sticker-item ${stk.desbloqueado ? 'unlocked' : 'locked'}`;
      el.innerHTML = `
        <div class="sticker-icon">${stk.icono}</div>
        <div class="sticker-name">${stk.nombre}</div>
        <span class="sticker-badge">${stk.desbloqueado ? stk.rareza : `Nivel ${stk.nivel_desbloqueo}`}</span>
        <div style="font-size: 10px; color: #94a3b8; margin-top: 6px;">${stk.descripcion}</div>
      `;
      grid.appendChild(el);
    });

    this.albumModal.classList.remove('hidden');
  }

  // --- QUIZ EDUCATIVO ("APRENDER PARA JUGAR") ---
  async openQuizModal() {
    this.quizQuestions = await window.api.getQuizQuestions();
    this.currentQuizIndex = 0;
    this.quizAnswers = [];

    document.getElementById('quizQuestionContainer').classList.remove('hidden');
    document.getElementById('quizResultContainer').classList.add('hidden');

    this.renderQuizQuestion();
    this.quizModal.classList.remove('hidden');
  }

  renderQuizQuestion() {
    const q = this.quizQuestions[this.currentQuizIndex];
    if (!q) {
      this.finishQuiz();
      return;
    }

    document.getElementById('quizCategory').textContent = q.categoria;
    document.getElementById('quizCounterText').textContent = `Pregunta ${this.currentQuizIndex + 1} de ${this.quizQuestions.length}`;
    document.getElementById('quizQuestionText').textContent = q.pregunta;

    const optGrid = document.getElementById('quizOptionsGrid');
    optGrid.innerHTML = '';

    q.opciones.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        this.quizAnswers.push({ questionId: q.id, selectedAnswer: opt });
        this.currentQuizIndex++;
        this.renderQuizQuestion();
      });
      optGrid.appendChild(btn);
    });
  }

  async finishQuiz() {
    const res = await window.api.submitQuizAnswers(this.quizAnswers);
    document.getElementById('quizQuestionContainer').classList.add('hidden');
    const resultBox = document.getElementById('quizResultContainer');
    resultBox.classList.remove('hidden');

    const icon = document.getElementById('quizResultIcon');
    const title = document.getElementById('quizResultTitle');
    const msg = document.getElementById('quizResultMessage');

    if (res.aprobado) {
      icon.textContent = '🎉';
      title.textContent = '¡Excelente Trabajo!';
      msg.textContent = `Acertaste ${res.correctCount} de ${res.totalQuestions}. ¡Has recargado +1 Vida y ganado +50 XP! ❤️⭐`;
    } else {
      icon.textContent = '💡';
      title.textContent = '¡Casi lo logras!';
      msg.textContent = `Acertaste ${res.correctCount} de ${res.totalQuestions}. Se necesitan 2 aciertos para recargar. ¡Inténtalo de nuevo!`;
    }

    this.updateUserUI();
  }

  // --- TIENDA DE JUGUETES ---
  async loadToyStore() {
    const data = await window.api.getToyStore();
    const prod = data.tienda?.productos?.[0];
    if (prod) {
      const titleEl = document.getElementById('toyTitle');
      const descEl = document.getElementById('toyDesc');
      const btn = document.getElementById('toyWhatsappBtn');

      if (titleEl) titleEl.textContent = `🧸 ${prod.nombre} (${prod.precio})`;
      if (descEl) descEl.textContent = prod.descripcion;
      if (btn) btn.href = prod.link_whatsapp;
    }
  }

  // --- CATÁLOGO & HERO ---
  renderCategories() {
    this.categoryBar.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-pill ${cat.id === this.currentCategory ? 'active' : ''}`;
      btn.innerHTML = `<span class="cat-icon">${cat.icon}</span> <span class="cat-name">${cat.name}</span>`;
      btn.addEventListener('click', () => {
        this.setCategory(cat.id);
      });
      this.categoryBar.appendChild(btn);
    });
  }

  setCategory(catId) {
    this.currentCategory = catId;
    document.querySelectorAll('.category-pill').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes(CATEGORIES.find(c => c.id === catId)?.name || ''));
    });

    const catObj = CATEGORIES.find(c => c.id === catId);
    this.activeCategoryTitle.textContent = catObj ? `${catObj.icon} ${catObj.name}` : '🎮 Catálogo de Juegos';

    this.filterAndRenderGames();
  }

  initSearch() {
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.filterAndRenderGames();
    });
  }

  async loadGames() {
    this.games = await window.api.getGames();
    this.featuredGames = this.games.filter(g => g.featured);
    this.filterAndRenderGames();
  }

  filterAndRenderGames() {
    let filtered = [...this.games];

    if (this.currentCategory === 'favoritos') {
      filtered = filtered.filter(g => this.favorites.includes(g.slug));
    } else if (this.currentCategory !== 'todos') {
      filtered = filtered.filter(g => g.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    if (this.searchQuery) {
      filtered = filtered.filter(g => 
        g.title.toLowerCase().includes(this.searchQuery) ||
        g.tags.some(t => t.toLowerCase().includes(this.searchQuery)) ||
        g.description.toLowerCase().includes(this.searchQuery)
      );
    }

    this.gamesCountBadge.textContent = `${filtered.length} juegos`;
    this.renderGrid(filtered);
  }

  renderGrid(gamesList) {
    this.gamesGrid.innerHTML = '';

    if (gamesList.length === 0) {
      this.gamesGrid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <h3>No se encontraron juegos</h3>
          <p>Prueba con otra categoría o término de búsqueda.</p>
        </div>
      `;
      return;
    }

    gamesList.forEach((game, index) => {
      const isFav = this.favorites.includes(game.slug);
      const card = document.createElement('div');
      card.className = `game-card ${game.trending ? 'card-trending' : ''}`;
      card.style.setProperty('--card-color', game.accentColor || '#3b82f6');
      card.style.animationDelay = `${index * 0.05}s`;

      const coverSrc = game.coverImage || `/assets/covers/${game.slug}.jpg`;

      card.innerHTML = `
        <div class="card-thumb-wrapper">
          <img src="${coverSrc}" class="card-cover-img" alt="${game.title}" loading="lazy" onerror="this.src='/assets/covers/tower-game.jpg'">
          ${game.badge ? `<span class="game-badge">${game.badge}</span>` : ''}
          <button class="btn-card-fav ${isFav ? 'active' : ''}" title="Añadir a favoritos">⭐</button>
          <div class="card-overlay">
            <span class="btn-play-overlay">▶ JUGAR</span>
          </div>
        </div>
        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${game.title}</h3>
            <span class="card-rating">★ ${game.rating}</span>
          </div>
          <div class="card-tags">
            ${game.tags.slice(0, 2).map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `;

      card.querySelector('.card-thumb-wrapper').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-card-fav')) return;
        window.gamePlayer.open(game.slug);
      });

      const favBtn = card.querySelector('.btn-card-fav');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = this.toggleFavorite(game.slug);
        favBtn.classList.toggle('active', active);
        if (this.currentCategory === 'favoritos' && !active) {
          this.filterAndRenderGames();
        }
      });

      this.gamesGrid.appendChild(card);
    });
  }

  initHeroSlider() {
    if (this.featuredGames.length === 0) return;
    this.renderHeroSlide(this.currentHeroIndex);

    clearInterval(this.heroInterval);
    this.heroInterval = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.featuredGames.length;
      this.renderHeroSlide(this.currentHeroIndex);
    }, 6000);
  }

  renderHeroSlide(index) {
    const game = this.featuredGames[index] || this.games[0];
    if (!game) return;

    const coverSrc = game.coverImage || `/assets/covers/${game.slug}.jpg`;

    this.heroSlider.innerHTML = `
      <div class="hero-slide active" style="background: ${game.bannerGradient || 'linear-gradient(135deg, #1e293b, #0f172a)'};">
        <div class="hero-content">
          <span class="hero-badge">🌟 JUEGO DESTACADO DE LA SEMANA</span>
          <h1 class="hero-title">${game.title}</h1>
          <p class="hero-description">${game.description}</p>
          <div class="hero-meta">
            <span class="meta-tag">⭐ ${game.rating} Rating</span>
            <span class="meta-tag">👥 ${game.plays} Jugadores</span>
            <span class="meta-tag">🕹️ ${game.category.toUpperCase()}</span>
          </div>
          <div class="hero-actions">
            <button class="btn-hero-play" id="btnHeroPlay">▶ JUGAR AHORA</button>
          </div>
        </div>
        <div class="hero-visual">
          <img src="${coverSrc}" class="hero-cover-img" alt="${game.title}">
        </div>
      </div>
    `;

    document.getElementById('btnHeroPlay').addEventListener('click', () => {
      window.gamePlayer.open(game.slug);
    });
  }

  toggleFavorite(slug) {
    const idx = this.favorites.indexOf(slug);
    let added = false;
    if (idx === -1) {
      this.favorites.push(slug);
      added = true;
    } else {
      this.favorites.splice(idx, 1);
      added = false;
    }
    localStorage.setItem('eze_favorites', JSON.stringify(this.favorites));
    return added;
  }

  isFavorite(slug) {
    return this.favorites.includes(slug);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new EzeGamingApp();
});
