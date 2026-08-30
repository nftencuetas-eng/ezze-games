/**
 * CONTROLADOR PRINCIPAL DE LA PLATAFORMA "eze"
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
    this.statPlayers = document.getElementById('statPlayers');
    this.statPlays = document.getElementById('statPlays');
  }

  async initApp() {
    window.gamePlayer = new GamePlayer();

    this.renderCategories();
    this.initSearch();
    await this.loadGames();
    this.initHeroSlider();
    this.loadGlobalStats();

    // Comprobar si hay juego en la URL hash (#play-angry-pigs-3d)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#play-')) {
      const slug = hash.replace('#play-', '');
      window.gamePlayer.open(slug);
    }
  }

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

    document.getElementById('btnClearSearch')?.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.filterAndRenderGames();
    });
  }

  async loadGames() {
    this.games = await window.api.getGames();
    this.featuredGames = this.games.filter(g => g.featured);
    this.filterAndRenderGames();
  }

  async loadGlobalStats() {
    const stats = await window.api.getStats();
    if (this.statPlayers) this.statPlayers.textContent = stats.onlinePlayers;
    if (this.statPlays) this.statPlays.textContent = stats.totalPlays.toLocaleString();
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
          <img src="${coverSrc}" class="card-cover-img" alt="${game.title}" loading="lazy" onerror="this.src='/assets/covers/moto-x3m.jpg'">
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

      // Evento Jugar
      card.querySelector('.card-thumb-wrapper').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-card-fav')) return;
        window.gamePlayer.open(game.slug);
      });

      // Evento Favorito
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
