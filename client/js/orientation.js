/**
 * MÓDULO UNIVERSAL DE DETECCIÓN Y BLOQUEO DE ORIENTACIÓN
 * Muestra una pantalla de bloqueo en dispositivos móviles cuando están en vertical (Portrait)
 * y libera automáticamente el juego cuando se gira a horizontal (Landscape).
 */

class OrientationLock {
  constructor(options = {}) {
    this.requiresLandscape = options.requiresLandscape !== false;
    this.onOrientationChange = options.onOrientationChange || null;
    this.overlay = null;

    if (this.requiresLandscape) {
      this.initOverlay();
      this.checkOrientation();
      this.bindEvents();
    }
  }

  initOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'rotate-device-overlay';
    this.overlay.innerHTML = `
      <div class="rotate-card">
        <div class="phone-rotate-icon">
          <span class="phone-screen-arrow">🔄</span>
        </div>
        <h2 class="rotate-title">GIRA TU PANTALLA</h2>
        <p class="rotate-desc">Este videojuego requiere orientación horizontal para darte la mejor experiencia.</p>
        <div class="rotate-detecting">
          <span class="detecting-dot"></span>
          <span>Esperando rotación...</span>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);
  }

  checkOrientation() {
    // Detectar si es un dispositivo móvil/tablet en modo vertical
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobileDevice = window.innerWidth <= 960 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (isPortrait && isMobileDevice) {
      this.lock();
    } else {
      this.unlock();
    }
  }

  lock() {
    if (this.overlay && !this.overlay.classList.contains('active')) {
      this.overlay.classList.add('active');
    }
  }

  unlock() {
    if (this.overlay && this.overlay.classList.contains('active')) {
      this.overlay.classList.remove('active');
      if (this.onOrientationChange) {
        setTimeout(() => this.onOrientationChange(true), 200);
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.checkOrientation());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.checkOrientation(), 250);
    });

    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', () => {
        setTimeout(() => this.checkOrientation(), 250);
      });
    }
  }
}

window.OrientationLock = OrientationLock;
