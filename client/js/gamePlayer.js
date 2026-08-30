/**
 * GESTOR DEL REPRODUCTOR DE JUEGOS (THEATER MODE, FULLSCREEN, STATS & COMMENTS)
 */

class GamePlayer {
  constructor() {
    this.modal = document.getElementById('playerModal');
    this.iframe = document.getElementById('gameIframe');
    this.titleEl = document.getElementById('playerGameTitle');
    this.categoryEl = document.getElementById('playerCategory');
    this.descEl = document.getElementById('playerGameDesc');
    this.likesCountEl = document.getElementById('playerLikesCount');
    this.playsCountEl = document.getElementById('playerPlaysCount');
    this.btnLike = document.getElementById('btnPlayerLike');
    this.btnFav = document.getElementById('btnPlayerFav');
    this.btnTheater = document.getElementById('btnTheaterMode');
    this.btnFullscreen = document.getElementById('btnFullscreen');
    this.commentsListEl = document.getElementById('commentsList');
    this.relatedListEl = document.getElementById('relatedGamesList');
    this.commentForm = document.getElementById('commentForm');

    this.currentGame = null;
    this.isTheater = false;

    this.initEvents();
  }

  initEvents() {
    document.getElementById('btnClosePlayer').addEventListener('click', () => this.close());

    this.btnTheater.addEventListener('click', () => this.toggleTheater());
    this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());

    this.btnLike.addEventListener('click', async () => {
      if (!this.currentGame) return;
      this.btnLike.classList.toggle('active');
      const count = parseInt(this.likesCountEl.textContent) || 0;
      this.likesCountEl.textContent = this.btnLike.classList.contains('active') ? count + 1 : count - 1;
      await window.api.vote(this.currentGame.slug, 'like');
    });

    this.btnFav.addEventListener('click', () => {
      if (!this.currentGame) return;
      const isFav = window.app.toggleFavorite(this.currentGame.slug);
      this.updateFavButton(isFav);
    });

    this.commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputUser = document.getElementById('commentUser');
      const inputText = document.getElementById('commentText');

      if (!inputText.value.trim() || !this.currentGame) return;

      const user = inputUser.value.trim() || 'Jugador Eze';
      const text = inputText.value.trim();

      const newC = await window.api.addComment(this.currentGame.slug, { user, text, rating: 5 });
      this.prependComment(newC);

      inputText.value = '';
    });
  }

  async open(gameSlug) {
    const game = await window.api.getGameDetails(gameSlug);
    if (!game) return;

    this.currentGame = game;
    this.titleEl.textContent = game.title;
    this.categoryEl.textContent = game.category.toUpperCase();
    this.descEl.textContent = game.description;
    this.likesCountEl.textContent = game.likes || 140;
    this.playsCountEl.textContent = `${game.plays || 950} partidas`;

    this.updateFavButton(window.app.isFavorite(game.slug));

    // Cargar iframe
    this.iframe.src = game.gamePath;

    // Registrar partida
    window.api.recordPlay(game.slug);

    // Cargar comentarios
    this.renderComments(game.comments || []);

    // Cargar relacionados
    this.renderRelated(game.related || []);

    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.iframe.src = 'about:blank';
    this.modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    this.currentGame = null;
    if (this.isTheater) this.toggleTheater();
  }

  updateFavButton(isFav) {
    if (isFav) {
      this.btnFav.classList.add('active');
      this.btnFav.innerHTML = '⭐ GUARDADO';
    } else {
      this.btnFav.classList.remove('active');
      this.btnFav.innerHTML = '☆ FAVORITO';
    }
  }

  toggleTheater() {
    this.isTheater = !this.isTheater;
    const playerWrapper = document.getElementById('playerScreenWrapper');
    playerWrapper.classList.toggle('theater-mode', this.isTheater);
    this.btnTheater.classList.toggle('active', this.isTheater);
  }

  toggleFullscreen() {
    const wrapper = document.getElementById('playerScreenWrapper');
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch(err => {
        alert(`Error al entrar en pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  renderComments(comments) {
    this.commentsListEl.innerHTML = '';
    if (comments.length === 0) {
      this.commentsListEl.innerHTML = '<p class="no-comments">¡Sé el primero en dejar una reseña!</p>';
      return;
    }
    comments.forEach(c => this.prependComment(c));
  }

  prependComment(c) {
    const noComms = this.commentsListEl.querySelector('.no-comments');
    if (noComms) noComms.remove();

    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
      <div class="comment-header">
        <span class="comment-avatar">👾</span>
        <span class="comment-author">${escapeHTML(c.user)}</span>
        <span class="comment-date">${c.date || 'Reciente'}</span>
      </div>
      <div class="comment-body">${escapeHTML(c.text)}</div>
    `;
    this.commentsListEl.prepend(item);
  }

  renderRelated(related) {
    this.relatedListEl.innerHTML = '';
    related.forEach(g => {
      const coverSrc = g.coverImage || `/assets/covers/${g.slug}.jpg`;
      const card = document.createElement('div');
      card.className = 'related-game-card';
      card.innerHTML = `
        <div class="related-thumb">
          <img src="${coverSrc}" class="related-cover-img" alt="${g.title}" onerror="this.src='/assets/covers/moto-x3m.jpg'">
        </div>
        <div class="related-info">
          <h4>${g.title}</h4>
          <span>⭐ ${g.rating}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        this.open(g.slug);
      });
      this.relatedListEl.appendChild(card);
    });
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

window.gamePlayer = null;
