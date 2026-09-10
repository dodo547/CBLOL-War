// Motor de Áudio Procedural com Web Audio API para imersão no League of Legends
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : 0.25;
    }
    return this.isMuted;
  }

  // Clique de botão com toque metálico Hextech
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.05);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.12);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Som ao travar/escolher um campeão
  playPick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.3);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.42);
  }

  // Impacto em estrutura (Torre sofrendo dano)
  playTowerHit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.15);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Destruição de Torre (desmoronamento e explosão)
  playTowerDestroyed() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Ruído de desmoronamento
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(60, t + 0.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.52);

    // Onda grave
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(130, t);
    subOsc.frequency.exponentialRampToValueAtTime(35, t + 0.6);

    subGain.gain.setValueAtTime(0.6, t);
    subGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 0.62);
  }

  // Inibidor destruído (sirene de alarme de perigo)
  playInhibitorDestroyed() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [0, 0.2, 0.4].forEach(delay => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, t + delay);
      osc.frequency.exponentialRampToValueAtTime(340, t + delay + 0.16);

      gain.gain.setValueAtTime(0.28, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.17);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + delay);
      osc.stop(t + delay + 0.18);
    });
  }

  // Explosão do Nexus (épico, grave e estrondoso)
  playNexusExplosion() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Sub-bass poderoso
    const bass = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(160, t);
    bass.frequency.exponentialRampToValueAtTime(25, t + 1.6);

    bassGain.gain.setValueAtTime(0.9, t);
    bassGain.gain.exponentialRampToValueAtTime(0.01, t + 1.6);

    bass.connect(bassGain);
    bassGain.connect(this.masterGain);
    bass.start(t);
    bass.stop(t + 1.65);

    // Efeito de energia cósmica
    const sweep = this.ctx.createOscillator();
    const sweepGain = this.ctx.createGain();
    sweep.type = "triangle";
    sweep.frequency.setValueAtTime(200, t);
    sweep.frequency.linearRampToValueAtTime(900, t + 0.4);
    sweep.frequency.exponentialRampToValueAtTime(50, t + 1.4);

    sweepGain.gain.setValueAtTime(0.4, t);
    sweepGain.gain.exponentialRampToValueAtTime(0.01, t + 1.4);

    sweep.connect(sweepGain);
    sweepGain.connect(this.masterGain);
    sweep.start(t);
    sweep.stop(t + 1.45);
  }

  // Fanfarra de Vitória
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Dó maior triunfante
    const times = [0, 0.15, 0.3, 0.45, 0.65, 0.9];
    const dur = [0.25, 0.25, 0.25, 0.35, 0.45, 1.2];

    const t = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + times[idx]);

      gain.gain.setValueAtTime(0.35, t + times[idx]);
      gain.gain.exponentialRampToValueAtTime(0.001, t + times[idx] + dur[idx]);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + times[idx]);
      osc.stop(t + times[idx] + dur[idx] + 0.05);
    });
  }

  // Comemoração de Série Vencida (Fanfarra Triunfal dos Playoffs)
  playSeriesWon() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    const times = [0, 0.12, 0.24, 0.38, 0.52, 0.68, 0.88];
    const dur = [0.2, 0.2, 0.25, 0.3, 0.35, 0.5, 1.4];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === notes.length - 1 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, t + times[idx]);

      gain.gain.setValueAtTime(0.32, t + times[idx]);
      gain.gain.exponentialRampToValueAtTime(0.001, t + times[idx] + dur[idx]);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + times[idx]);
      osc.stop(t + times[idx] + dur[idx] + 0.05);
    });
  }

  // Celebração do Grande Campeão do CBLOL (Fanfarra Triunfal + Rugido de Torcida no Ginásio + Fogos)
  playChampionFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Fanfarra Triunfal Heroica (Metais e Cordas em Dó Maior Brilhante)
    const chordNotes = [
      { freq: 261.63, start: 0, dur: 0.28, type: "triangle", gain: 0.3 },
      { freq: 329.63, start: 0.14, dur: 0.28, type: "triangle", gain: 0.3 },
      { freq: 392.00, start: 0.28, dur: 0.35, type: "triangle", gain: 0.35 },
      { freq: 523.25, start: 0.50, dur: 0.60, type: "triangle", gain: 0.4 },
      { freq: 659.25, start: 0.70, dur: 0.50, type: "triangle", gain: 0.35 },
      { freq: 783.99, start: 0.90, dur: 0.60, type: "triangle", gain: 0.4 },
      { freq: 523.25, start: 1.20, dur: 2.8, type: "sine", gain: 0.35 },
      { freq: 659.25, start: 1.20, dur: 2.8, type: "triangle", gain: 0.3 },
      { freq: 783.99, start: 1.20, dur: 2.8, type: "triangle", gain: 0.35 },
      { freq: 1046.50, start: 1.20, dur: 3.0, type: "sine", gain: 0.28 },
      { freq: 1318.51, start: 1.25, dur: 2.5, type: "triangle", gain: 0.15 }
    ];

    chordNotes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = n.type;
      osc.frequency.setValueAtTime(n.freq, t + n.start);

      gain.gain.setValueAtTime(0.001, t + n.start);
      gain.gain.linearRampToValueAtTime(n.gain, t + n.start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.start + n.dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + n.start);
      osc.stop(t + n.start + n.dur + 0.1);
    });

    // 2. Simulação Procedural da Torcida no Ginásio (Crowd Roar / Cheering)
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 4.2);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, t);
      filter.frequency.linearRampToValueAtTime(750, t + 1.2);
      filter.frequency.linearRampToValueAtTime(600, t + 3.0);
      filter.Q.setValueAtTime(1.8, t);

      const crowdGain = this.ctx.createGain();
      crowdGain.gain.setValueAtTime(0.001, t);
      crowdGain.gain.linearRampToValueAtTime(0.35, t + 0.8);
      crowdGain.gain.linearRampToValueAtTime(0.42, t + 1.8);
      crowdGain.gain.exponentialRampToValueAtTime(0.001, t + 4.0);

      noise.connect(filter);
      filter.connect(crowdGain);
      crowdGain.connect(this.masterGain);

      noise.start(t);
      noise.stop(t + 4.2);
    } catch (e) {}

    // 3. Estalidos de Fogos de Artifício (Fireworks Pops)
    [0.6, 1.3, 1.9, 2.5, 3.1].forEach(delay => {
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();

      popOsc.type = "sine";
      popOsc.frequency.setValueAtTime(400, t + delay);
      popOsc.frequency.exponentialRampToValueAtTime(90, t + delay + 0.12);

      popGain.gain.setValueAtTime(0.25, t + delay);
      popGain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.14);

      popOsc.connect(popGain);
      popGain.connect(this.masterGain);

      popOsc.start(t + delay);
      popOsc.stop(t + delay + 0.15);
    });
  }

  // Tom de Derrota
  playDefeat() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [330, 311, 293, 220]; // Tristeza cromática menor
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.35);

      gain.gain.setValueAtTime(0.25, t + idx * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.35 + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.35);
      osc.stop(t + idx * 0.35 + 0.52);
    });
  }

  // Alerta sonoro de decisão tática e objetivos épicos
  playObjectiveAlert() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [220, 277.18, 329.63, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);
      gain.gain.setValueAtTime(0.3, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.27);
    });
  }

  // Reproduz o áudio da fala de escolha do campeão (CommunityDragon Audio VO)
  playChampionVoice(key) {
    if (this.isMuted || !key) return;

    try {
      // Toca o clique metálico Hextech para feedback imediato
      this.playPick();

      // Interrompe fala anterior se ainda estiver tocando
      if (this.currentVoiceAudio) {
        try {
          this.currentVoiceAudio.pause();
          this.currentVoiceAudio.currentTime = 0;
        } catch (err) {}
      }

      const primaryUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-choose-vo/${key}.ogg`;
      const fallbackUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-choose-vo/${key}.ogg`;

      const audio = new Audio();
      audio.volume = 0.95;
      audio.src = primaryUrl;

      let fallbackAttempted = false;
      audio.onerror = () => {
        if (!fallbackAttempted) {
          fallbackAttempted = true;
          audio.src = fallbackUrl;
          const p = audio.play();
          if (p !== undefined) p.catch(() => {});
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          // Navegador pode requerer interação prévia do usuário, o que já ocorre no clique
          console.log("Audio play info:", err);
        });
      }

      this.currentVoiceAudio = audio;
    } catch (e) {
      console.warn("Erro ao reproduzir voz do campeão:", e);
    }
  }

  // Som de Double Kill (Abate Duplo)
  playDoubleKill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [330, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.14);
      gain.gain.setValueAtTime(0.35, t + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.14 + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.14);
      osc.stop(t + idx * 0.14 + 0.38);
    });
  }

  // Som de Triple Kill (Abate Triplo)
  playTripleKill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [330, 440, 554.37].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.13);
      gain.gain.setValueAtTime(0.38, t + idx * 0.13);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.13 + 0.45);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.13);
      osc.stop(t + idx * 0.13 + 0.48);
    });
  }

  // Som de Quadra Kill (Abate Quádruplo)
  playQuadraKill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [330, 440, 554.37, 659.25].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.12);
      gain.gain.setValueAtTime(0.4, t + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.5);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.12);
      osc.stop(t + idx * 0.12 + 0.53);
    });
  }

  // Som de PENTAKILL (O clímax épico do League of Legends!)
  playPentakill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Sub-bass estrondoso
    const bass = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(110, t);
    bass.frequency.exponentialRampToValueAtTime(40, t + 1.2);
    bassGain.gain.setValueAtTime(0.8, t);
    bassGain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);
    bass.connect(bassGain);
    bassGain.connect(this.masterGain);
    bass.start(t);
    bass.stop(t + 1.25);

    // Fanfarra triunfante de 5 notas
    [261.63, 329.63, 392.0, 523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + idx * 0.11);
      gain.gain.setValueAtTime(0.45, t + idx * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.11 + 0.7);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.11);
      osc.stop(t + idx * 0.11 + 0.75);
    });
  }

  // Som de ACE (Extermínio da equipe inteira)
  playAce() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Sino / Gongo profundo de extermínio
    const gong = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();
    gong.type = "sine";
    gong.frequency.setValueAtTime(180, t);
    gong.frequency.exponentialRampToValueAtTime(55, t + 1.4);
    gongGain.gain.setValueAtTime(0.7, t);
    gongGain.gain.exponentialRampToValueAtTime(0.01, t + 1.4);
    gong.connect(gongGain);
    gongGain.connect(this.masterGain);
    gong.start(t);
    gong.stop(t + 1.45);

    // Trompa de alerta
    [440, 587.33].forEach((freq, idx) => {
      const horn = this.ctx.createOscillator();
      const hornGain = this.ctx.createGain();
      horn.type = "sawtooth";
      horn.frequency.setValueAtTime(freq, t + 0.15 + idx * 0.2);
      hornGain.gain.setValueAtTime(0.35, t + 0.15 + idx * 0.2);
      hornGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15 + idx * 0.2 + 0.6);
      horn.connect(hornGain);
      hornGain.connect(this.masterGain);
      horn.start(t + 0.15 + idx * 0.2);
      horn.stop(t + 0.15 + idx * 0.2 + 0.65);
    });
  }

  // Som ao concluir a compra de um item lendário (Hextech Anvil & Gold Chime)
  playItemCompleted() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Tilintar metálico dourado
    [987.77, 1318.51, 1975.53].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);
      gain.gain.setValueAtTime(0.25, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.28);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.3);
    });
  }
}

export const sound = new SoundEngine();
