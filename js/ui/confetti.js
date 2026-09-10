// Sistema de Confetes e Partículas Douradas para Celebração de Título do CBLOL
class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;
    this.isActive = false;
    this.endTimer = null;
    this._handleResize = this._handleResize.bind(this);
  }

  _initCanvas() {
    if (this.canvas) return;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "cblol-confetti-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.inset = "0";
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "99999";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this._handleResize();
    window.addEventListener("resize", this._handleResize);
  }

  _handleResize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  startChampionConfetti(durationMs = 9000) {
    this.stop();
    this._initCanvas();
    if (!this.ctx) return;

    this.isActive = true;
    this.particles = [];

    const colors = [
      "#ffd700", // Ouro Puro Troféu
      "#c8aa6e", // Ouro Hextech LoL
      "#f0e6d2", // Dourado Cristalino
      "#0ac8b9", // Ciano Hextech
      "#005a82", // Azul Profundo LoL
      "#ffffff", // Brilho Diamante
      "#e84057"  // Carmesim CBLOL
    ];

    // Explosão inicial a partir dos cantos inferiores (Canhões de Estádio)
    this._spawnCannons(colors, 140);

    // Chuva contínua caindo do topo da tela
    let streamInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(streamInterval);
        return;
      }
      this._spawnStream(colors, 12);
    }, 120);

    // Erupções adicionais no centro e nas laterais
    setTimeout(() => { if (this.isActive) this._spawnCannons(colors, 90); }, 1800);
    setTimeout(() => { if (this.isActive) this._spawnCannons(colors, 90); }, 3600);
    setTimeout(() => { if (this.isActive) this._spawnCannons(colors, 110); }, 5400);

    this._loop();

    if (this.endTimer) clearTimeout(this.endTimer);
    this.endTimer = setTimeout(() => {
      this.stop();
    }, durationMs);
  }

  _spawnCannons(colors, count) {
    const w = this.canvas ? this.canvas.width : window.innerWidth;
    const h = this.canvas ? this.canvas.height : window.innerHeight;

    // Canhão Esquerdo
    for (let i = 0; i < count / 2; i++) {
      const angle = (Math.random() * 45 + 25) * (Math.PI / 180); // 25° a 70° para cima e direita
      const speed = Math.random() * 18 + 14;
      this.particles.push(this._createParticle(
        Math.random() * 100,
        h - 20,
        Math.cos(angle) * speed,
        -Math.sin(angle) * speed,
        colors
      ));
    }

    // Canhão Direito
    for (let i = 0; i < count / 2; i++) {
      const angle = (Math.random() * 45 + 110) * (Math.PI / 180); // 110° a 155° para cima e esquerda
      const speed = Math.random() * 18 + 14;
      this.particles.push(this._createParticle(
        w - Math.random() * 100,
        h - 20,
        Math.cos(angle) * speed,
        -Math.sin(angle) * speed,
        colors
      ));
    }
  }

  _spawnStream(colors, count) {
    const w = this.canvas ? this.canvas.width : window.innerWidth;
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle(
        Math.random() * w,
        -20,
        (Math.random() - 0.5) * 4,
        Math.random() * 3 + 2,
        colors
      ));
    }
  }

  _createParticle(x, y, vx, vy, colors) {
    const isRibbon = Math.random() > 0.35;
    return {
      x,
      y,
      vx,
      vy,
      w: isRibbon ? Math.random() * 10 + 6 : Math.random() * 7 + 4,
      h: isRibbon ? Math.random() * 5 + 3 : Math.random() * 7 + 4,
      isCircle: !isRibbon && Math.random() > 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.25,
      wobble: Math.random() * Math.PI * 2,
      vWobble: Math.random() * 0.1 + 0.05,
      opacity: 1,
      decay: Math.random() * 0.002 + 0.001
    };
  }

  _loop() {
    if (!this.isActive || !this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const gravity = 0.28;
    const drag = 0.985;
    const h = this.canvas.height;
    const w = this.canvas.width;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.angle += p.vAngle;
      p.wobble += p.vWobble;

      // Movimento oscilatório suave de folha caindo
      const wobbleOffset = Math.sin(p.wobble) * 2;
      p.x += wobbleOffset * 0.3;

      p.opacity -= p.decay;

      if (p.y > h + 50 || p.opacity <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.scale(Math.cos(p.wobble), 1);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.isCircle) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      this.ctx.restore();
    }

    if (this.isActive) {
      this.animId = requestAnimationFrame(() => this._loop());
    }
  }

  stop() {
    this.isActive = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.endTimer) {
      clearTimeout(this.endTimer);
      this.endTimer = null;
    }
    if (this.canvas) {
      window.removeEventListener("resize", this._handleResize);
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = null;
      this.ctx = null;
    }
    this.particles = [];
  }
}

const confetti = new ConfettiEngine();
