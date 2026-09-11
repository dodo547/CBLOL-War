import { sound } from "../engine/audio.js";
import { getChampionById } from "../data/champions.js";
import { getItemIconUrl, LOL_ITEMS, getItemById, getItemRecipeTree, ITEM_CATEGORIES } from "../data/items.js";
import { JUNGLE_CAMPS, getJungleCampById, getAllJungleCamps } from "../data/jungle-camps.js";

export class ArenaView {
  constructor({ containerEl, simulator, onMatchFinished }) {
    this.containerEl = containerEl;
    this.sim = simulator;
    this.onMatchFinished = onMatchFinished;
    this.eventsHistory = [];
    this._isResolvingDecision = false;
    this._recentVictimDeaths = new Set();
    this._eventCount = 0;

    this.render();
  }

  render() {
    this._eventCount = 0;
    const state = this.sim.getState();

    this.containerEl.innerHTML = `
      <div class="arena-container">
        <!-- Placar do Topo / Scoreboard -->
        <div class="arena-scoreboard">
          <!-- Time Azul (Jogador) -->
          <div class="scoreboard-team blue-side">
            <div class="scoreboard-emblem" style="background: #091428;">
              <img src="${state.blue.iconUrl}" alt="${state.blue.name}" />
            </div>
            <div>
              <div class="scoreboard-name" style="color: var(--lol-blue-team);">${state.blue.name} (Você)</div>
              <div class="scoreboard-stats">
                <span>💰 <strong id="blue-gold">${state.blue.score.gold}</strong></span>
                <span>🐲 <strong id="blue-dragons">${state.blue.score.dragons}</strong></span>
                <span>👑 <strong id="blue-barons">${state.blue.score.barons}</strong></span>
              </div>
              <div class="team-active-buffs-bar" id="blue-active-buffs"></div>
            </div>
            <div class="score-kills" id="blue-kills" style="color: var(--lol-blue-team);">0</div>
          </div>

          <!-- Centro: Relógio, Fase e Dificuldade da Rodada -->
          <div class="scoreboard-center">
            <div class="game-clock" id="match-clock">${state.time}</div>
            <div class="match-phase-badge" id="match-phase">Fase de Rotas (Barricadas Ativas)</div>
            <div class="match-diff-badge" id="match-difficulty" style="font-size: 10px; font-weight: 800; color: ${this._getDifficultyColor(state.roundIndex)}; background: rgba(0,0,0,0.5); padding: 2px 8px; border-radius: 10px; border: 1px solid ${this._getDifficultyBorder(state.roundIndex)}; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
              ⚡ ${this._getDifficultyText(state.roundIndex)}
            </div>
          </div>

          <!-- Time Vermelho (CBLOL) -->
          <div class="scoreboard-team red-side">
            <div class="scoreboard-emblem" style="background: ${state.red.color || '#e84057'}; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #fff;">
              <span>${state.red.tag || 'CBL'}</span>
            </div>
            <div>
              <div class="scoreboard-name" style="color: var(--lol-red-team);">${state.red.name}</div>
              <div class="scoreboard-stats">
                <span>💰 <strong id="red-gold">${state.red.score.gold}</strong></span>
                <span>🐲 <strong id="red-dragons">${state.red.score.dragons}</strong></span>
                <span>👑 <strong id="red-barons">${state.red.score.barons}</strong></span>
              </div>
              <div class="team-active-buffs-bar" id="red-active-buffs"></div>
            </div>
            <div class="score-kills" id="red-kills" style="color: var(--lol-red-team);">0</div>
          </div>
        </div>

        <!-- BANNER DE ANÚNCIOS MULTIKILL & ACE (ANNOUNCER SYSTEM) -->
        <div class="multikill-announcer-banner" id="multikill-banner">
          <div class="announcer-inner">
            <div class="announcer-tag" id="announcer-tag">DOUBLE KILL!</div>
            <div class="announcer-killer" id="announcer-killer">Seu Time: Jinx</div>
          </div>
        </div>

        <!-- Barra de Controles de Reprodução e Postura Tática Interativa -->
        <div class="match-controls-bar">
          <div class="tactical-actions-group">
            <span class="tactics-group-title">🎯 Postura da Equipe:</span>
            <div class="tactics-buttons-container" id="tactics-buttons-container">
              <button class="tactic-btn ${this.sim.playerTactics === 'balanced' ? 'active' : ''}" data-tactic="balanced" title="Equilibrada: controle de rotas, farm e visão padrão">⚖️ Equilibrada</button>
              <button class="tactic-btn ${this.sim.playerTactics === 'aggressive' ? 'active' : ''}" data-tactic="aggressive" title="Agressiva: pressão e lutas (+Dano em matchups favoráveis. CUIDADO: em desvantagem ou rota acampada pelo caçador rival, causa mortes solo e ganks punidores!)">⚔️ Agressiva</button>
              <button class="tactic-btn ${this.sim.playerTactics === 'defense' ? 'active' : ''}" data-tactic="defense" title="Defensiva: joga sob as torres e absorve pressão (+Armadura, -Push)">🛡️ Defensiva</button>
              <button class="tactic-btn ${this.sim.playerTactics === 'split' ? 'active' : ''}" data-tactic="split" title="Split Push: foca em derreter torres e puxar rotas laterais (+Push, -Dano TF)">🏰 Split Push</button>
            </div>
          </div>

          <div class="speed-buttons-group">
            <button class="speed-btn ${this.sim.speed === 1 ? 'active' : ''}" data-speed="1">1x</button>
            <button class="speed-btn ${this.sim.speed === 2 ? 'active' : ''}" data-speed="2">2x</button>
            <button class="speed-btn ${this.sim.speed === 4 ? 'active' : ''}" data-speed="4">4x</button>
            <button class="speed-btn" id="skip-match-btn" style="background: rgba(200, 170, 110, 0.2); border-color: var(--lol-gold-2); color: #fff;">
              ⏩ Pular para o Final
            </button>
          </div>
        </div>

        <!-- Alerta Dinâmico de Super Minions -->
        <div class="super-minions-alert" id="super-minions-alert">
          ⚠️ SUPER TROPAS AVANÇANDO PELAS ROTAS! DANO EM ESTRUTURAS DOBRADO! ⚠️
        </div>

        <!-- Alerta Dinâmico de Recompensas de Objetivo (Comeback Mechanics) -->
        <div class="objective-bounties-alert" id="objective-bounties-alert">
          🎯 RECOMPENSAS DE OBJETIVO ATIVAS: +650g a +800g de Ouro Global de Virada ao Destruir Torres ou Monstros Épicos!
        </div>

        <!-- CAMPO DE BATALHA COM AS ESTRUTURAS: MAPA DO RIFT (ESQUERDA) & KILLFEED AO VIVO (DIREITA) -->
        <div class="battlefield-arena">
          <!-- Esquerda: Minimapa Oficial Interativo do Rift -->
          <div class="rift-map-wrapper">
            <!-- Cabeçalho Tático do Mapa: Controle das 3 Rotas & Objetivos do Rio -->
            <div class="rift-map-header">
              <div class="lane-status-badge top-lane" id="badge-lane-top">
                <span class="lane-icon">🛡️</span>
                <span class="lane-name">TOPO</span>
                <span class="lane-pressure-val" id="pressure-val-top">0% EQUILIBRADO</span>
              </div>
              <div class="lane-status-badge mid-lane" id="badge-lane-mid">
                <span class="lane-icon">⚔️</span>
                <span class="lane-name">MEIO</span>
                <span class="lane-pressure-val" id="pressure-val-mid">0% EQUILIBRADO</span>
              </div>
              <div class="lane-status-badge bot-lane" id="badge-lane-bot">
                <span class="lane-icon">🏹</span>
                <span class="lane-name">INFERIOR</span>
                <span class="lane-pressure-val" id="pressure-val-bot">0% EQUILIBRADO</span>
              </div>
              <div class="rift-map-legend">
                <span class="legend-item blue"><span class="legend-dot blue-dot"></span> Azul</span>
                <span class="legend-item red"><span class="legend-dot red-dot"></span> Vermelho</span>
              </div>
            </div>

            <!-- Moldura Oficial do Minimapa League of Legends (HUD Frame) -->
            <div class="lol-minimap-frame">
              <div class="minimap-corner-bracket-tl"></div>
              <div class="minimap-ping-btn" title="Atenção / Ping Tático"><span>!</span></div>
              <div class="rift-svg-container" id="rift-svg-container">
                ${this._renderSummonersRiftSvg(state)}
                <!-- Tooltip Flutuante Interativo de Estruturas do Rift -->
                <div class="rift-structure-tooltip" id="rift-structure-tooltip" style="display:none;"></div>
              </div>
              <div class="minimap-cam-btn" title="Câmera do Mapa">🎯</div>
            </div>
          </div>

          <!-- Direita: Central Killfeed & Broadcast Hub (Super Visível) -->
          <div class="broadcast-killfeed-panel">
            <div class="broadcast-feed-header">
              <div class="broadcast-live-indicator">
                <span class="live-dot-pulse"></span>
                <span class="live-text">AO VIVO</span>
              </div>
              <div class="broadcast-feed-title">⚔️ ABATES & JOGADAS</div>
              <div class="broadcast-feed-count" id="broadcast-feed-count">0 eventos</div>
            </div>
            <div class="killfeed-box" id="killfeed-container">
              <div class="killfeed-entry-wrapper">
                <div class="kfeed-card kfeed-general">
                  <span class="kfeed-time">01:30</span>
                  <span class="kfeed-msg">⚔️ Tropas liberadas em Summoner's Rift! Boa sorte e bom jogo!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BANNER EDUCATIVO DE FARM: VALOR DE LAST HITS -->
        <div class="farm-edu-tip-bar" title="Dica Profissional: 15 a 18 tropas (CS) equivalem a 300 de ouro (o mesmo valor de 1 abate de campeão). Farmar com consistência é o caminho mais seguro para a vitória!">
          <span class="farm-edu-badge">🌾 VALOR DO FARM</span>
          <span class="farm-edu-text"><strong>~18 Tropas (CS) ≈ 1 Abate (300g)</strong> • Ouro constante de farm garante itens sem se expor a ganks!</span>
        </div>

        <!-- PAINEL CENTRAL DE TRANSMISSÃO ESPORTS: ESCALAÇÃO AZUL (ESQ) | ESCALAÇÃO VERMELHA (DIR) -->
        <div class="arena-broadcast-center">
          <!-- Coluna 1: Escalação Azul -->
          <div class="lineup-box blue-side-panel">
            <div class="lineup-title blue">
              <span>🔵 Escalação ${state.blue.name}</span>
              <div class="lineup-stat-headers">
                <span class="lineup-items-header" title="Itens Concluídos">ITENS</span>
                <span class="lineup-farm-header" title="Tropas abatidas (CS) e média por minuto">🌾 FARM</span>
                <span class="lineup-gold-header" title="Ouro total e vantagem de rota">💰 OURO</span>
                <span class="lineup-kda-header">K / D / A</span>
              </div>
            </div>
            <div id="blue-roster-status" class="roster-status-list">
              ${this._renderRosterRows(state.blue.roster, "blue")}
            </div>
          </div>

          <!-- Coluna 2: Escalação Vermelha -->
          <div class="lineup-box red-side-panel">
            <div class="lineup-title red">
              <span>🔴 Escalação ${state.red.name}</span>
              <div class="lineup-stat-headers">
                <span class="lineup-items-header" title="Itens Concluídos">ITENS</span>
                <span class="lineup-farm-header" title="Tropas abatidas (CS) e média por minuto">🌾 FARM</span>
                <span class="lineup-gold-header" title="Ouro total e vantagem de rota">💰 OURO</span>
                <span class="lineup-kda-header">K / D / A</span>
              </div>
            </div>
            <div id="red-roster-status" class="roster-status-list">
              ${this._renderRosterRows(state.red.roster, "red")}
            </div>
          </div>
        </div>

      <!-- Modal de Decisão Tática Interativa (Dragão / Barão / Arauto Macro Choice) -->
      <div class="tactical-decision-modal" id="tactical-decision-modal">
        <div class="decision-modal-card">
          <button type="button" class="decision-modal-close-btn" id="decision-modal-close-btn" title="Continuar partida">✕</button>
          <div class="decision-modal-header">
            <div class="decision-badge" id="decision-modal-badge">DECISÃO TÁTICA DO RIFT</div>
            <h2 class="decision-modal-title" id="decision-modal-title">🐲 DISPUTA PELO OBJETIVO!</h2>
            <p class="decision-modal-subtitle" id="decision-modal-subtitle">Escolha o plano de jogo da sua equipe...</p>
          </div>
          <!-- Barra de Status / Parâmetros do Confronto (Placar, Gold, Abates e Objetivos) -->
          <div class="decision-match-status-bar" id="decision-match-status-bar">
            <!-- Inserido dinamicamente ao abrir a decisão -->
          </div>
          <div class="decision-options-grid" id="decision-options-container">
            <!-- Opções inseridas dinamicamente -->
          </div>
          <div class="decision-feedback-banner" id="decision-feedback-banner" style="display: none;">
            <div class="decision-feedback-icon" id="decision-feedback-icon">⚡</div>
            <div class="decision-feedback-text" id="decision-feedback-text">Executando estratégia...</div>
          </div>
        </div>
      </div>

      <!-- Modal da Loja Hextech de Itens & Árvore de Receitas Oficial do LoL -->
      <div class="item-shop-modal" id="item-shop-modal">
        <div class="item-shop-modal-card">
          <div class="shop-modal-header">
            <div class="shop-modal-header-left">
              <span class="shop-gold-icon">🛒</span>
              <div>
                <h2 class="shop-modal-title">LOJA HEXTECH & ÁRVORE DE RECEITAS</h2>
                <p class="shop-modal-subtitle">Catálogo Oficial de Itens de League of Legends • Patch 14.20</p>
              </div>
            </div>
            <div class="shop-modal-header-right">
              <div class="shop-search-wrap">
                <input type="text" id="shop-search-input" class="shop-search-input" placeholder="🔍 Buscar item ou atributo (ex: Gume, Vida, MR)..." />
              </div>
              <button type="button" class="decision-modal-close-btn" id="shop-modal-close-btn" title="Fechar Loja">✕</button>
            </div>
          </div>

          <!-- Filtro de Categorias em Abas -->
          <div class="shop-categories-tabs" id="shop-categories-tabs">
            <!-- Abas geradas dinamicamente com ITEM_CATEGORIES -->
          </div>

          <!-- Conteúdo Principal da Loja: Catálogo à Esquerda | Inspetor & Árvore de Receitas à Direita -->
          <div class="shop-modal-body">
            <!-- Grade de Itens do Catálogo -->
            <div class="shop-items-grid-container" id="shop-items-grid">
              <!-- Itens injetados dinamicamente -->
            </div>

            <!-- Painel Inspetor do Item Selecionado e Árvore Genealógica -->
            <div class="shop-item-inspector" id="shop-item-inspector">
              <!-- Detalhes do item e árvore de receita -->
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay de Fim de Partida / Explosão de Nexus e Estatísticas Oficiais do LoL -->
      <div class="nexus-explosion-overlay" id="nexus-end-overlay">
        <div class="match-stats-modal">
          <div class="stats-modal-header">
            <div class="stats-header-left">
              <div id="end-trophy-icon" class="stats-trophy-icon">🏆</div>
              <div class="stats-header-text">
                <h1 id="end-banner-title" class="ceremony-title gold">VITÓRIA GLORIOSA!</h1>
                <p id="end-banner-desc" class="ceremony-subtitle">O Nexus inimigo foi implodido com sucesso!</p>
                <div id="end-series-pill" class="series-status-pill" style="display:none;"></div>
              </div>
            </div>
            <div class="stats-header-right">
              <button id="end-header-continue-btn" class="lol-btn lol-btn-primary stats-header-continue-btn" title="Avançar para a próxima fase">
                Avançar ➔
              </button>
            </div>
          </div>

          <!-- Placar Comparativo de Equipes & Objetivos Globais -->
          <div class="stats-global-scoreboard" id="stats-global-scoreboard"></div>

          <!-- Abas de Navegação -->
          <div class="stats-tabs-row" id="stats-tabs-row">
            <button class="stats-tab-btn active" data-tab="overview">
              <span class="tab-icon">📋</span> Visão Geral (KDA & Itens)
            </button>
            <button class="stats-tab-btn" data-tab="damage">
              <span class="tab-icon">⚔️</span> Dano a Campeões
            </button>
            <button class="stats-tab-btn" data-tab="gold">
              <span class="tab-icon">💰</span> Gráfico de Ouro
            </button>
            <button class="stats-tab-btn" data-tab="taken">
              <span class="tab-icon">🛡️</span> Dano Sofrido (Tanque)
            </button>
          </div>

          <!-- Conteúdo da Aba Selecionada -->
          <div class="stats-tab-body" id="stats-tab-body"></div>

          <!-- Rodapé com Botão de Ação -->
          <div class="stats-modal-footer">
            <button id="end-continue-btn" class="lol-btn lol-btn-primary stats-continue-btn">
              Avançar para a Próxima Fase ➔
            </button>
          </div>
        </div>
      </div>
    `;

    this._bindControls();
  }

  _renderSummonersRiftSvg(state) {
    const MAP_COORDS = {
      blue: {
        top_inhib: { x: 170, y: 528 },
        top_t3: { x: 154, y: 464 },
        top_t2: { x: 198, y: 389 },
        top_t1: { x: 216, y: 208 },
        mid_inhib: { x: 286, y: 560 },
        mid_t3: { x: 322, y: 524 },
        mid_t2: { x: 398, y: 460 },
        mid_t1: { x: 430, y: 395 },
        bot_inhib: { x: 298, y: 672 },
        bot_t3: { x: 356, y: 654 },
        bot_t2: { x: 484, y: 636 },
        bot_t1: { x: 690, y: 656 },
        nexus_t1: { x: 202, y: 582 },
        nexus_t2: { x: 226, y: 612 },
        nexus: { x: 188, y: 630 }
      },
      red: {
        top_t1: { x: 338, y: 84 },
        top_t2: { x: 525, y: 116 },
        top_t3: { x: 660, y: 92 },
        top_inhib: { x: 692, y: 88 },
        mid_t1: { x: 597, y: 292 },
        mid_t2: { x: 626, y: 240 },
        mid_t3: { x: 692, y: 190 },
        mid_inhib: { x: 718, y: 172 },
        bot_t1: { x: 864, y: 484 },
        bot_t2: { x: 804, y: 328 },
        bot_t3: { x: 836, y: 222 },
        bot_inhib: { x: 812, y: 198 },
        nexus_t1: { x: 768, y: 122 },
        nexus_t2: { x: 794, y: 152 },
        nexus: { x: 812, y: 116 }
      }
    };

    const renderStructures = (structures, side) => {
      if (!structures) return "";
      const sideCoords = MAP_COORDS[side];
      return structures.map(s => {
        let coords = sideCoords[s.id];
        if (!coords) {
          if (s.id === "t1") coords = sideCoords.mid_t1;
          else if (s.id === "t2") coords = sideCoords.mid_t2;
          else if (s.id === "t3") coords = sideCoords.mid_t3;
          else if (s.id === "inhib") coords = sideCoords.mid_inhib;
          else if (s.id === "nexus") coords = sideCoords.nexus;
        }
        if (!coords) return "";
        return this._renderMapStructureSvg(s, side, coords);
      }).join('');
    };

    const blueStructuresSvg = renderStructures(state.blue?.structures, "blue");
    const redStructuresSvg = renderStructures(state.red?.structures, "red");

    return `
      <svg class="summoners-rift-svg" viewBox="0 0 1024 727" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="blue-base-grad" cx="15%" cy="85%" r="35%">
            <stop offset="0%" stop-color="#0a2a4a" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#051220" stop-opacity="0.2" />
          </radialGradient>
          <radialGradient id="red-base-grad" cx="85%" cy="15%" r="35%">
            <stop offset="0%" stop-color="#4a0f1d" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#180408" stop-opacity="0.2" />
          </radialGradient>
          <filter id="rift-glow-blue" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="rift-glow-red" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <!-- Clipes circulares dos 10 campeões no minimapa -->
          ${["blue", "red"].map(s => 
            ["top", "jungle", "mid", "adc", "support"].map(r => `
              <clipPath id="clip-champ-${s}-${r}">
                <circle cx="0" cy="0" r="14" />
              </clipPath>
            `).join('')
          ).join('')}
        </defs>

        <!-- Fundo Oficial Autêntico 3D de Summoner's Rift com Todas as Estruturas -->
        <image href="assets/map/summoners_rift_hd.png" xlink:href="assets/map/summoners_rift_hd.png" x="0" y="0" width="1024" height="727" preserveAspectRatio="none" />

        <!-- Covil do Barão Nashor (Parte Superior do Rio) -->
        <g class="pit-marker baron-pit" id="pit-baron" transform="translate(360, 230)" data-pit="baron" title="Covil do Barão Nashor">
          <circle class="pit-hitbox" r="28" fill="transparent" />
          <circle r="20" fill="#200d2c" fill-opacity="0.45" stroke="#c084fc" stroke-width="2" />
          <text text-anchor="middle" dominant-baseline="central" font-size="13">👾</text>
        </g>

        <!-- Covil do Dragão Elemental (Parte Inferior do Rio) -->
        <g class="pit-marker dragon-pit" id="pit-dragon" transform="translate(645, 515)" data-pit="dragon" title="Covil do Dragão Elemental">
          <circle class="pit-hitbox" r="28" fill="transparent" />
          <circle r="20" fill="#301206" fill-opacity="0.45" stroke="#fb923c" stroke-width="2" />
          <text text-anchor="middle" dominant-baseline="central" font-size="13">🐲</text>
        </g>

        <!-- Marcadores de Choque de Minions (Minion Clash Waves) com Cores Únicas por Rota e Contagem ao Vivo -->
        <!-- ROTA SUPERIOR (TOP): Verde Esmeralda / Selva (#10b981) -->
        <g id="clash-top" class="minion-clash-wave clash-top" data-lane="top" transform="translate(268, 136)" cursor="pointer">
          <circle class="clash-hitbox" r="24" fill="transparent" />
          <circle r="16" fill="#10b981" opacity="0.35" class="clash-wave-pulse pulse-top" />
          <circle r="8.5" fill="#064e3b" stroke="#34d399" stroke-width="2" class="clash-core core-top" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8.5" class="clash-icon">🌲</text>
          <g class="clash-pill" transform="translate(0, -18)">
            <rect x="-26" y="-8.5" width="52" height="17" rx="8.5" class="pill-rect pill-top" fill="rgba(6, 78, 59, 0.92)" stroke="#10b981" stroke-width="1.2" />
            <text text-anchor="middle" dominant-baseline="central" class="pill-count-text" id="clash-count-top" font-size="8.5" font-weight="800" fill="#f0e6d2">6 ⚔️ 6</text>
          </g>
        </g>

        <!-- ROTA DO MEIO (MID): Roxo Arcano / Magia (#a855f7) -->
        <g id="clash-mid" class="minion-clash-wave clash-mid" data-lane="mid" transform="translate(514, 344)" cursor="pointer">
          <circle class="clash-hitbox" r="24" fill="transparent" />
          <circle r="16" fill="#a855f7" opacity="0.35" class="clash-wave-pulse pulse-mid" />
          <circle r="8.5" fill="#3b0764" stroke="#c084fc" stroke-width="2" class="clash-core core-mid" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8.5" class="clash-icon">🔮</text>
          <g class="clash-pill" transform="translate(0, -18)">
            <rect x="-26" y="-8.5" width="52" height="17" rx="8.5" class="pill-rect pill-mid" fill="rgba(59, 7, 100, 0.92)" stroke="#a855f7" stroke-width="1.2" />
            <text text-anchor="middle" dominant-baseline="central" class="pill-count-text" id="clash-count-mid" font-size="8.5" font-weight="800" fill="#f0e6d2">6 ⚔️ 6</text>
          </g>
        </g>

        <!-- ROTA INFERIOR (BOT): Dourado Solar / Atiradores (#f59e0b) -->
        <g id="clash-bot" class="minion-clash-wave clash-bot" data-lane="bot" transform="translate(814, 610)" cursor="pointer">
          <circle class="clash-hitbox" r="24" fill="transparent" />
          <circle r="16" fill="#f59e0b" opacity="0.35" class="clash-wave-pulse pulse-bot" />
          <circle r="8.5" fill="#78350f" stroke="#fbbf24" stroke-width="2" class="clash-core core-bot" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8.5" class="clash-icon">🏹</text>
          <g class="clash-pill" transform="translate(0, -18)">
            <rect x="-26" y="-8.5" width="52" height="17" rx="8.5" class="pill-rect pill-bot" fill="rgba(120, 53, 15, 0.92)" stroke="#f59e0b" stroke-width="1.2" />
            <text text-anchor="middle" dominant-baseline="central" class="pill-count-text" id="clash-count-bot" font-size="8.5" font-weight="800" fill="#f0e6d2">6 ⚔️ 6</text>
          </g>
        </g>

        <!-- ESTRUTURAS DO MAPA (30 Estruturas Autênticas) -->
        <g class="structures-layer blue-structures">
          ${blueStructuresSvg}
        </g>
        <g class="structures-layer red-structures">
          ${redStructuresSvg}
        </g>

        <!-- ACAMPAMENTOS E MONSTROS DA SELVA (Jungle Camps & Mobs) -->
        <g id="jungle-camps-layer" class="jungle-camps-layer">
          ${this._renderJungleCampsSvg(state)}
        </g>

        <!-- SENTINELAS E VISÃO (Wards & Trinkets) -->
        <g id="wards-layer" class="wards-layer"></g>

        <!-- CAMPEÕES NO MAPA (10 Campeões com Avatar Oficial Circular, Barra de Vida e Fog of War) -->
        <g id="champions-layer" class="champions-layer">
          ${this._renderChampionsSvg(state)}
        </g>
      </svg>
    `;
  }

  _renderJungleCampsSvg(state) {
    const camps = (state && state.jungleCamps && state.jungleCamps.length > 0)
      ? state.jungleCamps
      : (typeof getAllJungleCamps === "function" ? getAllJungleCamps() : (typeof JUNGLE_CAMPS !== "undefined" ? JUNGLE_CAMPS : []));
    if (!camps || camps.length === 0) return "";

    return camps.map(camp => {
      const isAlive = camp.status === "alive";
      const isClearing = camp.status === "clearing";
      const isRespawning = camp.status === "respawning";
      const isUnspawned = !camp.status || camp.status === "unspawned";

      const remSeconds = Math.max(0, (camp.respawnsAt || camp.spawnAt || 90) - (state?.gameSeconds || 0));
      const m = Math.floor(remSeconds / 60);
      const s = remSeconds % 60;
      const timerStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      const showTimer = !isAlive;

      return `
        <g id="camp-node-${camp.id}"
           class="jungle-camp-node ${camp.side} ${camp.campType} ${camp.status || 'unspawned'}"
           data-camp-id="${camp.id}"
           data-side="${camp.side}"
           transform="translate(${camp.x}, ${camp.y})"
           cursor="pointer">
          <!-- Hitbox transparente para captura de eventos -->
          <circle class="camp-hitbox" r="22" fill="transparent" />
          <!-- Halo de combate / pulso -->
          <circle class="camp-halo" r="18" fill="${camp.themeColor || '#fbbf24'}" opacity="${isClearing ? '0.4' : (isAlive ? '0.2' : '0.08')}" />
          <!-- Anel de contorno com cor temática -->
          <circle class="camp-ring" r="13.5" fill="#0b121e" stroke="${camp.themeColor || '#fbbf24'}" stroke-width="2" />
          <!-- Ícone oficial do monstro -->
          <text class="camp-icon" text-anchor="middle" dominant-baseline="central" font-size="11.5">${camp.icon}</text>
          <!-- Badge flutuante de respawn -->
          <g class="camp-timer-badge" id="camp-timer-${camp.id}" transform="translate(0, 16)" style="${showTimer ? '' : 'display: none;'}">
            <rect x="-18" y="-7.5" width="36" height="15" rx="4.5" fill="rgba(6, 11, 20, 0.92)" stroke="${camp.themeColor || '#fbbf24'}" stroke-width="1.2" />
            <text id="camp-timer-text-${camp.id}" class="camp-timer-text" text-anchor="middle" dominant-baseline="central" font-size="8.5" font-weight="800" fill="#f0e6d2">${timerStr}</text>
          </g>
        </g>
      `;
    }).join("");
  }

  _renderChampionsSvg(state) {
    if (!state) return "";
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const sides = ["blue", "red"];
    let html = "";

    sides.forEach(side => {
      const roster = state[side] && state[side].roster;
      if (!roster) return;

      roles.forEach(role => {
        const m = roster[role];
        if (!m) return;
        const champ = getChampionById(m.id);
        const champKey = champ ? champ.id : (m.id === "Wukong" ? "MonkeyKing" : m.id);
        const champImg = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champKey}.png`;
        const isVisible = side === "blue" || Boolean(m.isVisibleToBlue);
        const posX = (m.x !== undefined) ? m.x : (side === "blue" ? 200 : 800);
        const posY = (m.y !== undefined) ? m.y : (side === "blue" ? 600 : 150);
        const hpPct = Math.max(0, Math.min(100, m.hpPct !== undefined ? m.hpPct : 100));
        const hpFillW = Math.max(0, Math.min(27, (hpPct / 100) * 27));
        const roleLetter = role === "top" ? "T" : (role === "jungle" ? "J" : (role === "mid" ? "M" : (role === "adc" ? "A" : "S")));

        html += `
          <g id="champ-marker-${side}-${role}" 
             class="champ-map-marker ${side} ${role} ${isVisible ? 'visible' : 'fog-hidden'} ${!m.alive ? 'dead' : ''}" 
             data-side="${side}" 
             data-role="${role}" 
             transform="translate(${posX}, ${posY})"
             style="${!isVisible ? 'display: none;' : ''}">
            <!-- Hitbox invisível para captura de cursor sem oscilação -->
            <circle class="champ-hitbox" r="20" fill="transparent" />
            <!-- Halo de combate / hover -->
            <circle class="champ-halo" r="17" />
            <!-- Fundo base escuro do avatar -->
            <circle r="14" fill="#091428" />
            <!-- Avatar oficial do Campeão (DataDragon) com corte circular perfeito -->
            <image href="${champImg}" xlink:href="${champImg}" x="-14" y="-14" width="28" height="28" clip-path="url(#clip-champ-${side}-${role})" preserveAspectRatio="xMidYMid slice" />
            <!-- Borda temática de Equipe (Azul / Vermelho) -->
            <circle class="champ-border ${side === 'blue' ? 'border-blue' : 'border-red'}" r="14" fill="none" stroke-width="2.5" />
            <!-- Selo da Rota/Posição (T, J, M, A, S) -->
            <g class="champ-role-badge" transform="translate(11, -11)">
              <circle r="5" fill="#091428" stroke="${side === 'blue' ? '#0ac8b9' : '#e84057'}" stroke-width="1.2" />
              <text text-anchor="middle" dominant-baseline="central" font-size="6.5" font-weight="900" fill="#f0e6d2">${roleLetter}</text>
            </g>
            <!-- Barra de Vida Mini sob o Avatar -->
            <g class="champ-hp-container" transform="translate(-14, 16)">
              <rect class="champ-hp-bg" x="0" y="0" width="28" height="4.5" rx="2" fill="#050b14" stroke="#1e293b" stroke-width="0.8" />
              <rect class="champ-hp-fill ${side}-hp ${hpPct < 30 ? 'critical' : (hpPct < 60 ? 'damaged' : '')}" 
                    id="champ-hp-fill-${side}-${role}" 
                    x="0.5" y="0.5" width="${hpFillW}" height="3.5" rx="1.5" />
            </g>
            <!-- Indicador de Abatido (Morte) -->
            <g class="champ-dead-overlay" id="champ-dead-${side}-${role}" style="display: ${m.alive ? 'none' : 'block'};">
              <circle r="14" fill="rgba(6, 11, 19, 0.78)" />
              <text text-anchor="middle" dominant-baseline="central" font-size="12">💀</text>
            </g>
            <!-- Badge de Ponto de Interrogação caso perdido recente na névoa -->
            <g class="champ-missing-badge" id="champ-missing-${side}-${role}" style="display: none;" transform="translate(0, -18)">
              <circle r="6" fill="#1c1917" stroke="#f59e0b" stroke-width="1.2" />
              <text text-anchor="middle" dominant-baseline="central" font-size="8.5" font-weight="900" fill="#f59e0b">?</text>
            </g>
          </g>
        `;
      });
    });

    return html;
  }

  _renderMapStructureSvg(struct, side, coords) {
    if (!struct || !coords) return "";
    const isNexus = struct.tier === "nexus" || struct.id === "nexus";
    const isInhib = struct.tier === "inhib" || struct.id.includes("inhib");
    const isT1 = struct.tier === 1 || struct.id.includes("t1");
    const radius = isNexus ? 24 : (isInhib ? 18 : 15);
    const pct = Math.max(0, Math.min(100, Math.round((struct.currentHp / struct.maxHp) * 100)));
    const circumference = Math.round(2 * Math.PI * radius);
    const strokeDash = Math.round((pct / 100) * circumference);

    const iconSymbol = isNexus ? "⚛️" : (isInhib ? "💎" : "🏰");

    return `
      <g class="map-structure-node ${side}-side ${struct.destroyed ? 'destroyed' : ''} ${isNexus ? 'is-nexus' : ''}" 
         id="struct-${side}-${struct.id}"
         data-side="${side}"
         data-id="${struct.id}"
         data-name="${struct.name}"
         data-hp="${struct.currentHp}"
         data-max-hp="${struct.maxHp}"
         data-plates="${struct.plates || 0}"
         data-gold="${struct.goldValue || 0}"
         data-tier="${struct.tier}"
         transform="translate(${coords.x}, ${coords.y})">
        <!-- Hitbox invisível estável para captura de mouse sem oscilação -->
        <circle class="struct-hitbox" r="${radius + 7}" fill="transparent" />
        <!-- Glow / Halo de hover e clique -->
        <circle class="struct-halo" r="${radius + 5}" />
        <!-- Fundo escuro do anel -->
        <circle class="struct-hp-bg" r="${radius}" />
        <!-- Anel de Vida Dinâmico (SVG Stroke Dash) -->
        <circle class="struct-hp-ring ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}" 
                r="${radius}" 
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference - strokeDash}"
                transform="rotate(-90)" />
        <!-- Núcleo interno colorido -->
        <circle class="struct-core" r="${radius - 3}" />
        <!-- Ícone representativo -->
        <text class="struct-icon" text-anchor="middle" dominant-baseline="central" font-size="${isNexus ? 14 : (isInhib ? 11 : 9.5)}">${iconSymbol}</text>
        <!-- Badge de Barricadas (Placas ativas da T1) -->
        ${isT1 && !struct.destroyed && struct.plates > 0 ? `
          <g class="struct-plates-badge" transform="translate(0, ${radius + 9})">
            <rect x="-14" y="-7" width="28" height="14" rx="7" fill="#1c160a" stroke="#f0b622" stroke-width="1.5" />
            <text text-anchor="middle" y="3" fill="#f0e6d2" font-size="8.5" font-weight="900">${struct.plates}P</text>
          </g>
        ` : ''}
        <!-- Indicador de Ruína quando Destruído -->
        <g class="struct-ruined-indicator" style="display: ${struct.destroyed ? 'block' : 'none'};">
          <circle r="${radius + 3}" fill="#080c10" stroke="#ff3344" stroke-width="1.5" opacity="0.92" />
          <text text-anchor="middle" dominant-baseline="central" font-size="12" fill="#ff3344">❌</text>
        </g>
      </g>
    `;
  }

  _renderStructuresGroup(structures, side) {
    // Ordem visual no mapa da esquerda para a direita:
    // Lado Azul: Nexus -> Torre Nexus 1 -> Torre Nexus 2 -> Inibidor -> T3 -> T2 -> T1 (indo para o rio)
    // [RIO NO MEIO]
    // Lado Vermelho: T1 -> T2 -> T3 -> Inibidor -> Torre Nexus 1 -> Torre Nexus 2 -> Nexus (saindo do rio em direção à base inimiga)
    const ordered = side === "blue"
      ? [
          structures.find(s => s.id === "nexus"),
          structures.find(s => s.id === "nexus_t1"),
          structures.find(s => s.id === "nexus_t2"),
          structures.find(s => s.id === "inhib"),
          structures.find(s => s.id === "t3"),
          structures.find(s => s.id === "t2"),
          structures.find(s => s.id === "t1")
        ]
      : [
          structures.find(s => s.id === "t1"),
          structures.find(s => s.id === "t2"),
          structures.find(s => s.id === "t3"),
          structures.find(s => s.id === "inhib"),
          structures.find(s => s.id === "nexus_t1"),
          structures.find(s => s.id === "nexus_t2"),
          structures.find(s => s.id === "nexus")
        ];

    return ordered.filter(Boolean).map(s => this._renderSingleStructure(s, side)).join('');
  }

  _renderSingleStructure(struct, side) {
    const isNexus = struct.id === "nexus";
    const isInhib = struct.id === "inhib";
    const isT1 = struct.id === "t1";
    const pct = Math.round((struct.currentHp / struct.maxHp) * 100);

    let iconSymbol = "🏰";
    if (isNexus) iconSymbol = "⚛️";
    if (isInhib) iconSymbol = "💎";

    return `
      <div class="structure-node ${isNexus ? 'is-nexus' : ''} ${struct.destroyed ? 'destroyed' : ''} ${side}-side" id="struct-${side}-${struct.id}">
        <div class="structure-icon-box" title="${struct.name}">
          <span>${iconSymbol}</span>
        </div>
        <div class="structure-hp-bar">
          <div class="structure-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}" style="width: ${pct}%"></div>
        </div>
        <div class="structure-label">${this._getShortStructLabel(struct.id)}</div>
        <div class="structure-hp-text">${struct.destroyed ? 'DESTRUÍDO' : `${struct.currentHp}`}</div>
        ${isT1 && !struct.destroyed && struct.plates > 0 ? `
          <div class="structure-plates-badge" title="Barricadas ativas">+${struct.plates} Placas</div>
        ` : ''}
      </div>
    `;
  }

  _getShortStructLabel(id) {
    const labels = {
      t1: "Torre T1",
      t2: "Torre T2",
      t3: "Torre T3",
      inhib: "Inibidor",
      nexus_t1: "Torre Nexus",
      nexus_t2: "Torre Nexus",
      nexus: "NEXUS"
    };
    return labels[id] || id.toUpperCase();
  }

  _formatGold(val) {
    if (val === undefined || val === null) return "0g";
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + "k";
    }
    return val + "g";
  }

  _renderChampItems(items) {
    const slots = [0, 1, 2, 3, 4, 5];
    return `
      <div class="champ-items-tray">
        ${slots.map(idx => {
          const itm = items && items[idx];
          if (itm) {
            const recipeInfo = (itm.from && itm.from.length > 0)
              ? ` • Receita: ${itm.from.map(cId => { const c = getItemById(cId); return c ? c.name : cId; }).join(' + ')}`
              : '';
            const tierBadge = itm.tier ? `[${itm.tier}] ` : '';
            return `<div class="item-slot-icon filled ${itm.tier ? itm.tier.toLowerCase() : ''}" data-item-id="${itm.id}" title="${tierBadge}${itm.name} (${(itm.cost || 0).toLocaleString()}g)\n${itm.description || ''}${recipeInfo} (Clique para ver receita na Loja)"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
          }
          return `<div class="item-slot-icon empty" title="Espaço de item (Slot ${idx + 1}/6)"></div>`;
        }).join('')}
      </div>
    `;
  }

  _renderRosterRows(rosterState, side) {
    const roles = ["top", "jungle", "mid", "adc", "support"];
    return roles.map(role => {
      const m = rosterState[role];
      if (!m) return '';
      const champ = getChampionById(m.id);
      const champKey = champ ? champ.id : (m.id === "Wukong" ? "MonkeyKing" : m.id);
      const p = m.proPlayer;
      const champFallback = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champKey}.png`;
      const avatarSrc = (p && p.avatar) ? p.avatar : champFallback;

      const titleAttr = p 
        ? `${p.nick} (${p.name}) • ${p.traits} • "${p.quote}"`
        : `Clique para ouvir a fala de ${m.name}`;

      return `
        <div class="champion-status-row ${!m.alive ? 'dead' : ''}" id="champ-row-${side}-${role}" data-champ-id="${champKey}" title="${titleAttr}" style="cursor: pointer;">
          <div class="champ-meta-left">
            <div class="player-roster-avatar-wrap ${m.isSignature ? 'signature-glow' : ''}">
              <img class="pro-roster-photo" src="${avatarSrc}" alt="${p ? p.nick : m.name}" onerror="this.onerror=null; this.src='${champFallback}';" />
              ${p ? `
                <div class="champ-roster-badge" title="${m.name}">
                  <img src="${champFallback}" alt="${m.name}" />
                </div>
              ` : ''}
              <div class="dead-overlay">💀</div>
            </div>
            <div class="roster-player-text">
              <div class="champ-ingame-name">
                ${m.isSignature ? '<span class="sig-star" title="Pick de Conforto!">⭐</span>' : ''}
                <strong class="player-nick-highlight">${m.playerNick || m.name}</strong>
                ${m.playerNick ? `<span class="champ-sub-name">${m.name}</span>` : ''}
                <span class="champ-mvp-slot" id="mvp-slot-${side}-${role}">${m.isMvp ? '<span class="champ-mvp-badge" title="👑 MVP da Equipe! Lute ao redor deste carregador!">👑 MVP</span>' : ''}</span>
              </div>
              <div class="champ-meta-tags">
                <span class="champ-role-tag">${role.toUpperCase()}</span>
                <span class="champ-matchup-slot" id="matchup-slot-${side}-${role}"></span>
              </div>
            </div>
          </div>
          <div class="champ-data-right">
            ${this._renderChampItems(m.items)}
            <div class="champ-farm-stats" id="farm-${side}-${role}" title="Farm: ${m.cs || 0} tropas • ~${Math.round((m.cs || 0) * 21).toLocaleString()}g em tropas (~${((m.cs || 0) / 15).toFixed(1)} abates em ouro seguro!)">
              <span class="cs-icon">🌾</span>
              <span class="cs-count">${m.cs || 0}</span>
              <span class="cs-rate">(${m.csPerMin !== undefined ? m.csPerMin.toFixed(1) : '0.0'})</span>
            </div>
            <div class="champ-gold-stats" id="gold-${side}-${role}" title="Carteira: ${(m.goldCurrent || 500).toLocaleString()}g | Total Acumulado: ${(m.goldEarned || 500).toLocaleString()}g">
              <span class="gold-icon">💰</span>
              <span class="gold-val">${this._formatGold(m.goldEarned || 500)}</span>
              <span class="gold-diff-pill even" id="gold-diff-${side}-${role}">±0g</span>
            </div>
            <div class="champ-kda" id="kda-${side}-${role}">
              ${m.kills} / ${m.deaths} / ${m.assists}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  updateTick(state) {
    // Relógio
    const clockEl = this.containerEl.querySelector("#match-clock");
    if (clockEl) clockEl.textContent = state.time;

    // Placar
    const blueKills = this.containerEl.querySelector("#blue-kills");
    const redKills = this.containerEl.querySelector("#red-kills");
    if (blueKills) blueKills.textContent = state.blue.score.kills;
    if (redKills) redKills.textContent = state.red.score.kills;

    const blueGold = this.containerEl.querySelector("#blue-gold");
    const redGold = this.containerEl.querySelector("#red-gold");
    if (blueGold) blueGold.textContent = state.blue.score.gold;
    if (redGold) redGold.textContent = state.red.score.gold;

    const blueDragons = this.containerEl.querySelector("#blue-dragons");
    const redDragons = this.containerEl.querySelector("#red-dragons");
    if (blueDragons) blueDragons.textContent = state.blue.score.dragons;
    if (redDragons) redDragons.textContent = state.red.score.dragons;

    const blueBarons = this.containerEl.querySelector("#blue-barons");
    const redBarons = this.containerEl.querySelector("#red-barons");
    if (blueBarons) blueBarons.textContent = state.blue.score.barons;
    if (redBarons) redBarons.textContent = state.red.score.barons;

    // Fase oficial da partida do LoL
    const phaseEl = this.containerEl.querySelector("#match-phase");
    if (phaseEl) {
      if (state.gameSeconds < 840) {
        phaseEl.textContent = "Fase de Rotas • Barricadas de Torre Ativas";
        phaseEl.style.color = "var(--lol-gold-1)";
      } else if (state.gameSeconds < 1200) {
        phaseEl.textContent = "Mid Game • Rotações & Disputa de T2";
        phaseEl.style.color = "var(--lol-blue-glow)";
      } else if (state.gameSeconds < 1680) {
        phaseEl.textContent = "Barão Na'Shor • Cerco de Base & Inibidores";
        phaseEl.style.color = "#a855f7";
      } else {
        phaseEl.textContent = "Late Game Decisivo • Dragão Ancião";
        phaseEl.style.color = "#e84057";
      }
    }

    // Atualiza estado ativo dos botões de postura tática
    const currentTactic = state.playerTactics || (this.sim && this.sim.playerTactics);
    if (currentTactic) {
      this.containerEl.querySelectorAll(".tactic-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tactic") === currentTactic);
      });
    }

    // Alerta de Recompensas de Objetivo (Comeback Mechanics)
    const bountyAlert = this.containerEl.querySelector("#objective-bounties-alert");
    if (bountyAlert) {
      if (state.objectiveBountiesActive) {
        bountyAlert.classList.add("active");
      } else {
        bountyAlert.classList.remove("active");
      }
    }

    // Alerta de Super Minions
    const alertEl = this.containerEl.querySelector("#super-minions-alert");
    if (alertEl) {
      if (state.blue.superMinions || state.red.superMinions) {
        alertEl.classList.add("active");
        if (state.blue.superMinions) {
          alertEl.textContent = `⚠️ SUPER TROPAS AZUIS AVANÇANDO NA BASE INIMIGA! (+DANO EM TORRES)`;
        } else {
          alertEl.textContent = `⚠️ SUPER TROPAS VERMELHAS INVADINDO A NOSSA BASE! PROTEJA O NEXUS!`;
        }
      } else {
        alertEl.classList.remove("active");
      }
    }

    // Sincronização em tempo real das 30 estruturas do mapa Summoner's Rift
    const syncStructures = (structures, side) => {
      if (!structures) return;
      structures.forEach(struct => {
        const el = this.containerEl.querySelector(`#struct-${side}-${struct.id}`);
        if (!el) return;

        el.dataset.hp = struct.currentHp;
        el.dataset.maxHp = struct.maxHp;
        el.dataset.plates = struct.plates || 0;

        const isNexus = struct.tier === "nexus" || struct.id === "nexus";
        const isInhib = struct.tier === "inhib" || struct.id.includes("inhib");
        const radius = isNexus ? 25 : (isInhib ? 18 : 16);
        const circumference = Math.round(2 * Math.PI * radius);
        const pct = Math.max(0, Math.min(100, Math.round((struct.currentHp / struct.maxHp) * 100)));
        const strokeDash = Math.round((pct / 100) * circumference);

        const ring = el.querySelector(".struct-hp-ring");
        if (ring) {
          ring.style.strokeDashoffset = `${circumference - strokeDash}`;
          if (pct < 30) {
            ring.classList.add("critical");
            ring.classList.remove("damaged");
          } else if (pct < 60) {
            ring.classList.add("damaged");
            ring.classList.remove("critical");
          } else {
            ring.classList.remove("critical", "damaged");
          }
        }

        const ruined = el.querySelector(".struct-ruined-indicator");
        const plateBadge = el.querySelector(".struct-plates-badge");

        // Suporte a componentes legados se existirem
        const text = el.querySelector(".structure-hp-text");
        if (text) text.textContent = struct.destroyed ? "DESTRUÍDO" : `${struct.currentHp}`;
        const fill = el.querySelector(".structure-hp-fill");
        if (fill) {
          fill.style.width = struct.destroyed ? "0%" : `${pct}%`;
          fill.className = `structure-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}`;
        }

        if (struct.destroyed) {
          el.classList.add("destroyed");
          if (ruined) ruined.style.display = "block";
          if (plateBadge) plateBadge.style.display = "none";
        } else {
          el.classList.remove("destroyed");
          if (ruined) ruined.style.display = "none";
          if (plateBadge) {
            if (struct.plates > 0) {
              plateBadge.style.display = "block";
              const pText = plateBadge.querySelector("text");
              if (pText) pText.textContent = `${struct.plates}P`;
            } else {
              plateBadge.style.display = "none";
            }
          }
        }
      });
    };
    if (state.blue && state.blue.structures) syncStructures(state.blue.structures, "blue");
    if (state.red && state.red.structures) syncStructures(state.red.structures, "red");
    this._updateActiveStructureTooltip();

    // Sincronização dinâmica das 3 Rotas (Top, Mid, Bot): Pressão e Pontos de Choque de Minions
    const pressures = state.lanePressures || {
      top: state.lanePressure || 0,
      mid: state.lanePressure || 0,
      bot: state.lanePressure || 0
    };

    const formatPressure = (val) => {
      if (val > 5) return `+${val}% AZUL`;
      if (val < -5) return `+${Math.abs(val)}% RED`;
      return `0% EQUILIBRADO`;
    };

    const updatePressureBadge = (lane, val) => {
      const el = this.containerEl.querySelector(`#pressure-val-${lane}`);
      const badge = this.containerEl.querySelector(`#badge-lane-${lane}`);
      const isFocused = state.focusedLane === lane;
      const isBlueCamped = state.blueJungleCampLane === lane;
      const isRedCamped = state.redJungleCampLane === lane;

      let suffix = "";
      if (isFocused) suffix += " 🎯";
      if (isBlueCamped) suffix += " 🌲";
      if (isRedCamped) suffix += " 🔴";
      if (lane === "top" && state.gameSeconds >= 900 && state.topPushAdvantage) {
        if (state.topPushAdvantage.leader === "blue") suffix += " 🌊";
        else if (state.topPushAdvantage.leader === "red") suffix += " ⚠️";
      }

      if (el) el.textContent = formatPressure(val) + suffix;
      if (badge) {
        badge.classList.toggle("blue-push", val > 8);
        badge.classList.toggle("red-push", val < -8);
        badge.classList.toggle("active-focus", isFocused);
        badge.classList.toggle("blue-camped", isBlueCamped);
        badge.classList.toggle("red-camped", isRedCamped);
        let titleTip = `Clique para alternar o foco da equipe e do seu Caçador nesta rota!`;
        if (isBlueCamped) titleTip += ` (🌲 Foco do Seu Caçador)`;
        if (isRedCamped) titleTip += ` (⚠️ Alvo do Caçador Rival)`;
        if (lane === "top" && state.topPushAdvantage && state.gameSeconds >= 900) {
          titleTip += ` • ${state.topPushAdvantage.desc}`;
        }
        badge.title = titleTip;
      }
    };

    updatePressureBadge("top", pressures.top || 0);
    updatePressureBadge("mid", pressures.mid || 0);
    updatePressureBadge("bot", pressures.bot || 0);

    // Movimentação dos pontos de colisão ao longo das rotas do mapa 3D oficial
    // Respeita estritamente as torres vivas: tropas NUNCA passam de uma torre em pé!
    ["top", "mid", "bot"].forEach(lane => {
      const clashEl = this.containerEl.querySelector(`#clash-${lane}`);
      if (clashEl) {
        const coords = this._getLaneClashPosition(lane, pressures[lane] || 0, state);
        clashEl.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
      }
    });

    // Atualiza contadores e status visuais de tropas nas pílulas flutuantes de cada rota
    const clashLanes = ["top", "mid", "bot"];
    clashLanes.forEach(cL => {
      const p = pressures[cL] || 0;
      const countEl = this.containerEl.querySelector(`#clash-count-${cL}`);
      if (countEl) {
        const wave = this._getLaneWaveData(cL, p, state.gameSeconds || 0, state);
        const blueSup = wave.blueSuper > 0 ? "👾" : "";
        const redSup = wave.redSuper > 0 ? "👾" : "";
        countEl.textContent = `${blueSup}${wave.blueTotal} ⚔️ ${wave.redTotal}${redSup}`;
      }
    });

    // Renderiza os Buffs Ativos / Efeitos Táticos de cada equipe no HUD
    const blueBuffsEl = this.containerEl.querySelector("#blue-active-buffs");
    const redBuffsEl = this.containerEl.querySelector("#red-active-buffs");

    const renderBuffPills = (buffs, side) => {
      if (!buffs || buffs.length === 0) return "";
      return buffs.map(b => {
        let remainingText = "";
        if (b.expiresAt && state.gameSeconds) {
          const rem = Math.max(0, b.expiresAt - state.gameSeconds);
          remainingText = ` (${rem}s)`;
        }
        let desc = [];
        if (b.bonusCombat) desc.push(`+${b.bonusCombat} Dano`);
        if (b.bonusSiege) desc.push(`+${Math.round(b.bonusSiege * 100)}% Torres`);
        if (b.bonusDefense) desc.push(`-${b.bonusDefense}% Dano Sofh.`);
        const tooltip = desc.length > 0 ? desc.join(", ") : "Efeito Tático Ativo";

        return `<span class="active-buff-pill ${side}" title="${b.name}: ${tooltip}">${b.icon || '⚡'} ${b.name}${remainingText}</span>`;
      }).join("");
    };

    if (blueBuffsEl) {
      blueBuffsEl.innerHTML = renderBuffPills(state.blue.buffs || (state.activeBuffs && state.activeBuffs.blue), "blue");
    }
    if (redBuffsEl) {
      redBuffsEl.innerHTML = renderBuffPills(state.red.buffs || (state.activeBuffs && state.activeBuffs.red), "red");
    }

    // Atualiza status e itens dos campeões
    this._updateRosterUI(state.blue.roster, "blue", state);
    this._updateRosterUI(state.red.roster, "red", state);

    // Atualiza movimentação dos campeões, barra de vida e névoa de guerra (Fog of War)
    this._updateMapChampions(state);

    // Atualiza sentinelas de visão ativas no mapa
    this._updateMapWards(state);

    // Atualiza acampamentos da selva, status e cronômetros de respawn
    this._updateMapJungleCamps(state);
  }

  _updateMapChampions(state) {
    if (!state) return;
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const sides = ["blue", "red"];
    const gameSecs = state.gameSeconds || 0;

    sides.forEach(side => {
      const roster = state[side] && state[side].roster;
      if (!roster) return;

      roles.forEach(role => {
        const m = roster[role];
        if (!m) return;
        const marker = this.containerEl.querySelector(`#champ-marker-${side}-${role}`);
        if (!marker) return;

        // Posição e visibilidade
        if (side === "blue") {
          // Aliados: 100% visíveis em tempo real em qualquer lugar do mapa
          marker.style.display = "";
          marker.classList.remove("fog-hidden", "last-seen-ghost");
          marker.classList.add("visible");
          marker.setAttribute("transform", `translate(${m.x}, ${m.y})`);
          const missingEl = marker.querySelector(".champ-missing-badge");
          if (missingEl) missingEl.style.display = "none";
        } else {
          // Inimigos: Visíveis SOMENTE se dentro do alcance de visão aliado (campeões, sentinelas, torres)
          const isVis = Boolean(m.isVisibleToBlue);
          const missingEl = marker.querySelector(".champ-missing-badge");

          if (isVis) {
            marker.style.display = "";
            marker.classList.remove("fog-hidden", "last-seen-ghost");
            marker.classList.add("visible");
            marker.setAttribute("transform", `translate(${m.x}, ${m.y})`);
            if (missingEl) missingEl.style.display = "none";
          } else {
            // Se não está no alcance, verificar se foi avistado recentemente (últimos 10 segundos)
            if (m.lastSeen && (gameSecs - m.lastSeen.time <= 10)) {
              marker.style.display = "";
              marker.classList.remove("visible");
              marker.classList.add("last-seen-ghost");
              marker.setAttribute("transform", `translate(${m.lastSeen.x}, ${m.lastSeen.y})`);
              if (missingEl) missingEl.style.display = "block";
            } else {
              // Completamente oculto na Fog of War
              marker.style.display = "none";
              marker.classList.add("fog-hidden");
              marker.classList.remove("visible", "last-seen-ghost");
              if (missingEl) missingEl.style.display = "none";
            }
          }
        }

        // Atualiza Barra de Vida
        const hpPct = Math.max(0, Math.min(100, m.hpPct !== undefined ? m.hpPct : 100));
        const hpFill = marker.querySelector(`#champ-hp-fill-${side}-${role}`);
        if (hpFill) {
          const hpW = Math.max(0, Math.min(27, (hpPct / 100) * 27));
          hpFill.setAttribute("width", `${hpW}`);
          hpFill.className.baseVal = `champ-hp-fill ${side}-hp ${hpPct < 30 ? 'critical' : (hpPct < 60 ? 'damaged' : '')}`;
        }

        // Atualiza Estado de Vida/Morte
        const deadEl = marker.querySelector(`#champ-dead-${side}-${role}`);
        if (deadEl) {
          deadEl.style.display = m.alive ? "none" : "block";
        }
        marker.classList.toggle("dead", !m.alive);
      });
    });
  }

  _updateMapWards(state) {
    const wardsLayer = this.containerEl.querySelector("#wards-layer");
    if (!wardsLayer) return;

    const wards = state.wards || [];
    const gameSecs = state.gameSeconds || 0;

    // Apenas sentinelas ativas da equipe Azul
    const visibleWards = wards.filter(w => w.team === "blue");

    wardsLayer.innerHTML = visibleWards.map(w => {
      const isControl = w.type === "control";
      const remaining = Math.max(0, Math.round(w.expiresAt - gameSecs));
      const icon = isControl ? "👁️" : "🟡";
      const borderColor = isControl ? "#ec4899" : "#f59e0b";

      return `
        <g class="ward-map-marker ${w.team}" id="ward-${w.id}" data-id="${w.id}" data-type="${w.type}" data-remaining="${remaining}" transform="translate(${w.x}, ${w.y})">
          <circle class="ward-hitbox" r="16" fill="transparent" cursor="pointer" />
          <circle class="ward-vision-circle" r="14" fill="rgba(56, 189, 248, 0.16)" stroke="#38bdf8" stroke-dasharray="2 2" stroke-width="1" />
          <circle r="7" fill="#0b131e" stroke="${borderColor}" stroke-width="1.8" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8">${icon}</text>
        </g>
      `;
    }).join("");
  }

  _updateMapJungleCamps(state) {
    if (!state) return;
    const camps = state.jungleCamps || (typeof getAllJungleCamps === "function" ? getAllJungleCamps() : []);
    const gameSecs = state.gameSeconds || 0;

    camps.forEach(camp => {
      const node = this.containerEl.querySelector(`#camp-node-${camp.id}`);
      if (!node) return;

      const isAlive = camp.status === "alive";
      const isClearing = camp.status === "clearing";
      const isRespawning = camp.status === "respawning";
      const isUnspawned = !camp.status || camp.status === "unspawned";

      node.classList.toggle("alive", isAlive);
      node.classList.toggle("clearing", isClearing);
      node.classList.toggle("respawning", isRespawning);
      node.classList.toggle("unspawned", isUnspawned);

      const timerBadge = node.querySelector(`#camp-timer-${camp.id}`);
      const timerText = node.querySelector(`#camp-timer-text-${camp.id}`);

      if (timerBadge && timerText) {
        if (isAlive) {
          timerBadge.style.display = "none";
        } else {
          timerBadge.style.display = "block";
          const rem = Math.max(0, (camp.respawnsAt || camp.spawnAt || 0) - gameSecs);
          const m = Math.floor(rem / 60);
          const s = rem % 60;
          timerText.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
      }

      const halo = node.querySelector(".camp-halo");
      if (halo) {
        halo.setAttribute("opacity", isClearing ? "0.45" : (isAlive ? "0.2" : "0.08"));
      }
    });
  }

  _updateRosterUI(rosterState, side, fullState = null) {
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const laneMatchups = (fullState && fullState.laneMatchups) || (this.matchSim && this.matchSim.laneMatchups) || {};
    const campedLane = (fullState && fullState.redJungleCampLane) || (this.matchSim && this.matchSim.redJungleCampLane) || null;
    const blueCampedLane = (fullState && fullState.blueJungleCampLane) || (this.matchSim && this.matchSim.blueJungleCampLane) || null;
    const topAdv = (fullState && fullState.topPushAdvantage) || (this.matchSim && this.matchSim._calculateTopPushAdvantage && this.matchSim._calculateTopPushAdvantage()) || null;
    const gameSecs = (fullState && fullState.gameSeconds) || (this.matchSim && this.matchSim.gameSeconds) || 0;

    roles.forEach(role => {
      const m = rosterState[role];
      if (!m) return;
      const row = this.containerEl.querySelector(`#champ-row-${side}-${role}`);
      if (row) {
        if (!m.alive) row.classList.add("dead");
        else row.classList.remove("dead");

        // Atualiza destaque de MVP / Carregador
        const mvpSlot = row.querySelector(`#mvp-slot-${side}-${role}`);
        if (mvpSlot) {
          const mvpHtml = m.isMvp ? '<span class="champ-mvp-badge" title="👑 MVP da Equipe! Lute ao redor deste carregador!">👑 MVP</span>' : '';
          if (mvpSlot.innerHTML !== mvpHtml) {
            mvpSlot.innerHTML = mvpHtml;
          }
        }

        // Atualiza matchup tags e alerta de foco do caçador rival e aliado
        const slot = row.querySelector(`#matchup-slot-${side}-${role}`);
        if (slot) {
          const laneKey = (role === "adc" || role === "support") ? "bot" : role;
          const matchup = laneMatchups[laneKey];
          const isCamped = (campedLane === laneKey);
          const isBlueCamped = (blueCampedLane === laneKey);

          let badgesHtml = "";
          if (side === "blue") {
            if (matchup) {
              if (matchup.advantageSide === "blue") {
                badgesHtml += `<span class="matchup-tag adv" title="${matchup.desc}">⚔️ Vantagem</span>`;
              } else if (matchup.advantageSide === "red") {
                badgesHtml += `<span class="matchup-tag disadv" title="${matchup.desc}">⚠️ Desvantagem</span>`;
              } else {
                badgesHtml += `<span class="matchup-tag neutral" title="${matchup.desc}">⚖️ Parelho</span>`;
              }
            }
            if (isCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="camp-target-tag" title="Alvo preferencial do Caçador Rival! Cuidado redobrado ao forçar pressão!">🎯 Marcado</span>`;
            }
            if (isBlueCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="blue-camp-helper-tag" title="Foco Prioritário do Seu Caçador! Recebe ganks contínuos, cobertura e aceleração de ouro!">🌲 Foco JG</span>`;
            }
            if (role === "top" && topAdv && gameSecs >= 900) {
              if (topAdv.leader === "blue") {
                badgesHtml += `<span class="push-prio-tag blue" title="${topAdv.desc}">🌊 Push (+${topAdv.score})</span>`;
              } else if (topAdv.leader === "red") {
                badgesHtml += `<span class="push-prio-tag red" title="${topAdv.desc}">⚠️ Sob Pressão (${topAdv.score})</span>`;
              } else {
                badgesHtml += `<span class="push-prio-tag neutral" title="${topAdv.desc}">⚖️ Push Equilibrado</span>`;
              }
            }
          } else if (side === "red") {
            if (isCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="camp-helper-tag" title="Rota prioritária de gank e emboscada">🌲 Foco Gank</span>`;
            }
            if (isBlueCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="blue-camp-threat-tag" title="Rota pressionada pelo Caçador Aliado!">⚠️ Alvo JG Azul</span>`;
            }
            if (role === "top" && topAdv && gameSecs >= 900) {
              if (topAdv.leader === "red") {
                badgesHtml += `<span class="push-prio-tag red" title="${topAdv.desc}">🌊 Push (+${Math.abs(topAdv.score)})</span>`;
              } else if (topAdv.leader === "blue") {
                badgesHtml += `<span class="push-prio-tag blue" title="${topAdv.desc}">⚠️ Preso sob Torre</span>`;
              }
            }
          }
          if (slot.innerHTML !== badgesHtml) {
            slot.innerHTML = badgesHtml;
          }
        }

        // Atualiza bandeja de itens (apenas quando houver alteração para evitar DOM thrashing)
        const tray = row.querySelector(".champ-items-tray");
        if (tray && m.items) {
          const itemKey = m.items.map(it => it ? it.id : '0').join(',');
          if (tray._renderedKey !== itemKey) {
            tray._renderedKey = itemKey;
            const slots = [0, 1, 2, 3, 4, 5];
            tray.innerHTML = slots.map(idx => {
              const itm = m.items[idx];
              if (itm) {
                const recipeInfo = (itm.from && itm.from.length > 0)
                  ? ` • Receita: ${itm.from.map(cId => { const c = getItemById(cId); return c ? c.name : cId; }).join(' + ')}`
                  : '';
                const tierBadge = itm.tier ? `[${itm.tier}] ` : '';
                return `<div class="item-slot-icon filled ${itm.tier ? itm.tier.toLowerCase() : ''}" data-item-id="${itm.id}" title="${tierBadge}${itm.name} (${(itm.cost || 0).toLocaleString()}g)\n${itm.description || ''}${recipeInfo} (Clique para ver receita na Loja)"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
              }
              return `<div class="item-slot-icon empty" title="Espaço de item (Slot ${idx + 1}/6)"></div>`;
            }).join('');
          }
        }
      }
      const kdaEl = this.containerEl.querySelector(`#kda-${side}-${role}`);
      if (kdaEl) {
        kdaEl.textContent = `${m.kills} / ${m.deaths} / ${m.assists}`;
      }
      const farmEl = this.containerEl.querySelector(`#farm-${side}-${role}`);
      if (farmEl) {
        const cs = m.cs || 0;
        const rate = m.csPerMin !== undefined ? m.csPerMin.toFixed(1) : ((cs / Math.max(1, (this.matchSim?.gameSeconds || 60) / 60)).toFixed(1));
        const approxGold = Math.round(cs * 21);
        const killEq = (cs / 15).toFixed(1);
        farmEl.innerHTML = `<span class="cs-icon">🌾</span><span class="cs-count">${cs}</span> <span class="cs-rate">(${rate})</span>`;
        farmEl.title = `Farm: ${cs} tropas (${rate} CS/min) • ~${approxGold.toLocaleString()}g em tropas (~${killEq} abates em ouro seguro!)`;
      }

      // Atualiza Ouro Individual e Vantagem de Rota contra Rival Direto
      const goldEl = this.containerEl.querySelector(`#gold-${side}-${role}`);
      const diffEl = this.containerEl.querySelector(`#gold-diff-${side}-${role}`);
      const current = m.goldCurrent || 0;
      const earned = m.goldEarned || 500;
      const nextItemInfo = m.nextItem ? `\nPróximo: ${m.nextItem.name} (${(m.nextItem.cost || 3000).toLocaleString()}g) [${Math.min(100, Math.round((current / (m.nextItem.cost || 3000)) * 100))}%]` : '';

      if (goldEl) {
        const goldValEl = goldEl.querySelector('.gold-val');
        if (goldValEl) {
          goldValEl.textContent = this._formatGold(earned);
        }
        goldEl.title = `Carteira: ${current.toLocaleString()}g | Total Acumulado: ${earned.toLocaleString()}g${nextItemInfo}`;
      }

      if (diffEl) {
        const diff = m.laneGoldDiff || 0;
        if (diff >= 100) {
          diffEl.className = "gold-diff-pill lead";
          diffEl.textContent = `▲ +${diff >= 1000 ? (diff / 1000).toFixed(1) + 'k' : diff + 'g'}`;
          diffEl.title = `Vantagem de rota: +${diff.toLocaleString()}g sobre o rival direto`;
        } else if (diff <= -100) {
          const absDiff = Math.abs(diff);
          diffEl.className = "gold-diff-pill deficit";
          diffEl.textContent = `▼ -${absDiff >= 1000 ? (absDiff / 1000).toFixed(1) + 'k' : absDiff + 'g'}`;
          diffEl.title = `Desvantagem de rota: -${absDiff.toLocaleString()}g em relação ao rival direto`;
        } else {
          diffEl.className = "gold-diff-pill even";
          diffEl.textContent = `±0g`;
          diffEl.title = `Rota equilibrada em ouro`;
        }
      }
    });
  }

  handleMultikill(data) {
    const banner = this.containerEl.querySelector("#multikill-banner");
    if (!banner) return;

    if (data.type === "double") sound.playDoubleKill();
    else if (data.type === "triple") sound.playTripleKill();
    else if (data.type === "quadra") sound.playQuadraKill();
    else if (data.type === "penta") sound.playPentakill();

    const tag = banner.querySelector("#announcer-tag");
    const killer = banner.querySelector("#announcer-killer");
    if (tag) tag.textContent = data.title;
    if (killer) killer.textContent = data.subtitle;

    banner.className = `multikill-announcer-banner active ${data.killerSide}-side type-${data.type}`;

    if (this._multikillTimer) clearTimeout(this._multikillTimer);
    this._multikillTimer = setTimeout(() => {
      banner.classList.remove("active");
    }, 3000);
  }

  handleAce(data) {
    const banner = this.containerEl.querySelector("#multikill-banner");
    if (!banner) return;

    sound.playAce();

    const tag = banner.querySelector("#announcer-tag");
    const killer = banner.querySelector("#announcer-killer");
    const isBlue = data.aceSide === "blue";
    if (tag) tag.textContent = "EXTERMÍNIO! (ACE)";
    if (killer) killer.textContent = isBlue
      ? `🔵 SUA EQUIPE ELIMINOU TODOS OS 5 ADVERSÁRIOS!`
      : `🔴 O TIME ADVERSÁRIO EXTERMINOU SUA EQUIPE!`;

    banner.className = `multikill-announcer-banner active ${data.aceSide}-side type-ace`;

    if (this._multikillTimer) clearTimeout(this._multikillTimer);
    this._multikillTimer = setTimeout(() => {
      banner.classList.remove("active");
    }, 3500);
  }

  handleItemPurchased(data) {
    sound.playItemCompleted();
  }

  handleStructureHit(teamSide, structureId, currentHp, maxHp) {
    const el = this.containerEl.querySelector(`#struct-${teamSide}-${structureId}`);
    if (!el) return;

    sound.playTowerHit();

    el.classList.add("taking-damage");
    setTimeout(() => el.classList.remove("taking-damage"), 250);

    const pct = Math.max(0, Math.round((currentHp / maxHp) * 100));
    const fill = el.querySelector(".structure-hp-fill");
    if (fill) {
      fill.style.width = `${pct}%`;
      fill.className = `structure-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}`;
    }

    const text = el.querySelector(".structure-hp-text");
    if (text) {
      text.textContent = `${currentHp}`;
    }
  }

  handleStructureDestroyed(teamSide, structureId) {
    const el = this.containerEl.querySelector(`#struct-${teamSide}-${structureId}`);
    if (el) {
      el.classList.add("destroyed");
      const text = el.querySelector(".structure-hp-text");
      if (text) text.textContent = "DESTRUÍDO";

      const plateBadge = el.querySelector(".structure-plates-badge");
      if (plateBadge) plateBadge.remove();
    }

    if (structureId === "nexus") {
      sound.playNexusExplosion();
    } else if (structureId === "inhib") {
      sound.playInhibitorDestroyed();
    } else {
      sound.playTowerDestroyed();
    }
  }

  _renderEventCard(evt) {
    const side = evt.side || "blue";

    // 1. KILLS & SHUTDOWNS (Card Visual Estilo Transmissão do CBLOL)
    if (evt.type === "kill" || evt.type === "shutdown") {
      const killerSide = evt.side || "blue";
      const victimSide = killerSide === "blue" ? "red" : "blue";
      const roleMap = { top: "TOP", jungle: "JG", mid: "MID", adc: "ADC", support: "SUP" };
      const kRole = roleMap[evt.killerRole] || (evt.killerRole ? String(evt.killerRole).toUpperCase() : "");
      const vRole = roleMap[evt.victimRole] || (evt.victimRole ? String(evt.victimRole).toUpperCase() : "");

      const isShutdown = evt.type === "shutdown" || (evt.bountyGold && evt.bountyGold > 0);
      const totalGold = 300 + (evt.bountyGold || 0);
      const bountyTag = isShutdown
        ? `<span class="kfeed-bounty shutdown">+${totalGold}g SHUTDOWN</span>`
        : `<span class="kfeed-bounty normal">+300g</span>`;

      const killerPhoto = evt.killerAvatar
        ? `<span class="kfeed-photo-avatar killer-photo" title="${evt.killerNick || ''}"><img src="${evt.killerAvatar}" alt="${evt.killerNick || ''}" onerror="this.parentElement.style.display='none'" /></span>`
        : '';
      const victimPhoto = evt.victimAvatar
        ? `<span class="kfeed-photo-avatar victim-photo" title="${evt.victimNick || ''}"><img src="${evt.victimAvatar}" alt="${evt.victimNick || ''}" onerror="this.parentElement.style.display='none'" /></span>`
        : '';

      const killerDisplay = evt.killerNick && evt.killerNick !== evt.killerName
        ? `<strong class="kfeed-champ-name">${evt.isSignature ? '⭐ ' : ''}${evt.killerNick}</strong> <span style="font-size: 11px; opacity: 0.85; font-weight: 600;">(${evt.killerName})</span>`
        : `<strong class="kfeed-champ-name">${evt.isSignature ? '⭐ ' : ''}${evt.killerName || 'Aliado'}</strong>`;

      const victimDisplay = evt.victimNick && evt.victimNick !== evt.victimName
        ? `<strong class="kfeed-champ-name">${evt.victimNick}</strong> <span style="font-size: 11px; opacity: 0.85; font-weight: 600;">(${evt.victimName})</span>`
        : `<strong class="kfeed-champ-name">${evt.victimName || 'Inimigo'}</strong>`;

      return `
        <div class="kfeed-card kfeed-kill ${killerSide}-kill ${isShutdown ? 'is-shutdown' : ''}">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-actors">
            <span class="kfeed-player ${killerSide}">
              ${killerPhoto}
              ${kRole ? `<span class="kfeed-role-tag">${kRole}</span>` : ''}
              ${killerDisplay}
            </span>
            <span class="kfeed-vs-icon" title="${evt.skillName || 'Abate'}">⚔️</span>
            <span class="kfeed-player ${victimSide}">
              ${victimPhoto}
              ${vRole ? `<span class="kfeed-role-tag">${vRole}</span>` : ''}
              ${victimDisplay}
            </span>
          </div>
          ${bountyTag}
        </div>
      `;
    }

    // 2. MULTIKILLS & ACES
    if (evt.type === "multikill" || evt.type === "ace") {
      const icon = evt.type === "ace" ? "💀" : "⚡";
      return `
        <div class="kfeed-card kfeed-highlight ${side}-side ${evt.type}">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-highlight-content">
            <span class="kfeed-icon">${icon}</span>
            <strong class="kfeed-msg">${evt.text}</strong>
          </div>
        </div>
      `;
    }

    // 3. OBJETIVOS NEUTROS (Dragão, Barão, Arauto)
    if (["dragon", "baron", "herald", "elder"].includes(evt.type)) {
      const icon = evt.type === "baron" ? "👑" : (evt.type === "dragon" || evt.type === "elder" ? "🐲" : "👾");
      return `
        <div class="kfeed-card kfeed-objective ${side}-side ${evt.type}">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-highlight-content">
            <span class="kfeed-icon">${icon}</span>
            <strong class="kfeed-msg">${evt.text}</strong>
          </div>
        </div>
      `;
    }

    // 4. ESTRUTURAS (Torres, Barricadas, Inibidores, Nexus)
    if (["tower_destroyed", "plate", "inhibitor_destroyed", "nexus_destroyed", "objective_bounty"].includes(evt.type)) {
      const icon = evt.type === "plate" ? "🛡️" : (evt.type === "inhibitor_destroyed" ? "💥" : (evt.type === "nexus_destroyed" ? "🚨" : "🏰"));
      return `
        <div class="kfeed-card kfeed-structure ${side}-side">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-highlight-content">
            <span class="kfeed-icon">${icon}</span>
            <span class="kfeed-msg">${evt.text}</span>
          </div>
        </div>
      `;
    }

    // 5. EVENTOS TÁTICOS, ITENS E CONTRA-ATAQUES
    return `
      <div class="kfeed-card kfeed-general ${side}-side ${evt.type || ''}">
        <span class="kfeed-time">${evt.time || ''}</span>
        <span class="kfeed-msg">${evt.text}</span>
      </div>
    `;
  }

  handleEvent(evt) {
    if (evt.type === "skirmish") return; // Filtra ruído sem impacto tático
    const feed = this.containerEl.querySelector("#killfeed-container");
    if (!feed) return;

    // Deduplicação defensiva: impede que o mesmo abate apareça 2x no feed no mesmo segundo
    if (evt.type === "kill" || evt.type === "shutdown") {
      const killSig = `${evt.time || ''}_${evt.victimName || ''}`;
      if (this._recentVictimDeaths && this._recentVictimDeaths.has(killSig)) {
        return; // Morte já registrada e exibida neste minuto/segundo
      }
      if (!this._recentVictimDeaths) this._recentVictimDeaths = new Set();
      this._recentVictimDeaths.add(killSig);
      if (this._recentVictimDeaths.size > 50) {
        const first = this._recentVictimDeaths.values().next().value;
        this._recentVictimDeaths.delete(first);
      }
    }

    const entry = document.createElement("div");
    entry.className = "killfeed-entry-wrapper";
    entry.innerHTML = this._renderEventCard(evt);

    feed.prepend(entry);
    feed.scrollTop = 0;
    while (feed.children.length > 35) {
      feed.removeChild(feed.lastChild);
    }

    // Atualiza o contador ao vivo de eventos do confronto
    if (!this._eventCount) this._eventCount = 0;
    this._eventCount++;
    const countEl = this.containerEl.querySelector("#broadcast-feed-count");
    if (countEl) {
      countEl.textContent = `${this._eventCount} eventos`;
    }
  }

  _formatTeamLogo(logo, fallback = "🛡️") {
    if (!logo) return `<span class="team-icon-emoji">${fallback}</span>`;
    const strLogo = String(logo).trim();
    if (strLogo.startsWith("http://") || strLogo.startsWith("https://") || strLogo.startsWith("/") || strLogo.startsWith("./") || strLogo.includes(".png") || strLogo.includes(".jpg") || strLogo.includes(".svg")) {
      return `<img class="team-summary-logo-img" src="${strLogo}" alt="Logo" onerror="this.outerHTML='<span class=\\'team-icon-emoji\\'>${fallback}</span>'" />`;
    }
    return `<span class="team-icon-emoji">${strLogo}</span>`;
  }

  handleFinish(result, summary) {
    const dModal = this.containerEl.querySelector("#tactical-decision-modal");
    if (dModal) dModal.classList.remove("active");
    this._isResolvingDecision = false;

    const overlay = this.containerEl.querySelector("#nexus-end-overlay");
    if (!overlay) return;

    const title = this.containerEl.querySelector("#end-banner-title");
    const desc = this.containerEl.querySelector("#end-banner-desc");
    const icon = this.containerEl.querySelector("#end-trophy-icon");
    const seriesPill = this.containerEl.querySelector("#end-series-pill");
    const continueBtn = this.containerEl.querySelector("#end-continue-btn");
    const headerContinueBtn = this.containerEl.querySelector("#end-header-continue-btn");

    const updateButtons = (fullText, shortText) => {
      if (continueBtn) continueBtn.textContent = fullText;
      if (headerContinueBtn) headerContinueBtn.textContent = shortText || fullText;
    };

    const sRes = summary.seriesResult;

    if (sRes && seriesPill) {
      seriesPill.style.display = "flex";
      seriesPill.innerHTML = `
        <span class="series-phase">${sRes.roundName} • ${sRes.format}</span>
        <span class="series-score">Placar da Série: <strong>${sRes.playerWins}</strong> x <strong>${sRes.enemyWins}</strong></span>
        <span class="series-target">${sRes.seriesOver ? (sRes.seriesWon ? '🎉 Série Vencida!' : '💀 Série Perdida!') : `(Primeiro a alcançar ${sRes.winsNeeded} vitórias avança)`}</span>
      `;
    } else if (seriesPill) {
      seriesPill.style.display = "none";
    }

    if (result === "win") {
      if (icon) icon.textContent = "🏆";

      if (sRes && sRes.seriesOver) {
        if (sRes.playerWonTournament) {
          sound.playChampionFanfare();
          if (typeof confetti !== "undefined") confetti.startChampionConfetti(9000);
          if (title) {
            title.textContent = "CAMPEÃO DO CBLOL!";
            title.className = "ceremony-title gold";
          }
          if (desc) desc.textContent = `Vitória definitiva por ${sRes.playerWins} x ${sRes.enemyWins} na Grande Final aos ${summary.duration}! O troféu é do seu time!`;
          updateButtons("🏆 Ver Cerimônia de Campeão e MVP ➔", "🏆 Cerimônia & MVP ➔");
        } else {
          sound.playSeriesWon();
          if (typeof confetti !== "undefined") confetti.startChampionConfetti(4500);
          if (title) {
            title.textContent = "SÉRIE CONQUISTADA!";
            title.className = "ceremony-title gold";
          }
          if (desc) desc.textContent = `Vitória na série por ${sRes.playerWins} x ${sRes.enemyWins} aos ${summary.duration}! Sua equipe avança na chave dos Playoffs!`;
          updateButtons("Avançar para a Próxima Fase ➔", "Avançar ➔");
        }
      } else if (sRes && !sRes.seriesOver) {
        sound.playVictory();
        if (title) {
          title.textContent = "VITÓRIA NO JOGO!";
          title.className = "ceremony-title gold";
        }
        if (desc) desc.textContent = `Você venceu esta partida aos ${summary.duration}! Placar da série: ${sRes.playerWins} x ${sRes.enemyWins} (${sRes.format}).`;
        updateButtons(`⚔️ Jogar Jogo ${sRes.nextGameNumber} da Série (${sRes.playerWins} - ${sRes.enemyWins}) ➔`, `⚔️ Jogo ${sRes.nextGameNumber} ➔`);
      } else {
        sound.playVictory();
        if (title) {
          title.textContent = "VITÓRIA GLORIOSA!";
          title.className = "ceremony-title gold";
        }
        if (desc) desc.textContent = `A sua equipe destruiu as defesas inimigas e implodiu o Nexus adversário aos ${summary.duration}!`;
        updateButtons("Avançar para a Próxima Fase ➔", "Avançar ➔");
      }
    } else {
      sound.playDefeat();
      if (icon) icon.textContent = "💀";

      if (sRes && sRes.seriesOver) {
        if (title) {
          title.textContent = "ELIMINADO DO CBLOL";
          title.className = "ceremony-title red";
        }
        if (desc) desc.textContent = `Sua equipe foi superada na série por ${sRes.playerWins} x ${sRes.enemyWins} (${sRes.format}) aos ${summary.duration}. Fim da run.`;
        updateButtons("💀 Ver Resultado Final ➔", "💀 Resultado ➔");
      } else if (sRes && !sRes.seriesOver) {
        if (title) {
          title.textContent = "DERROTA NO JOGO!";
          title.className = "ceremony-title red";
        }
        if (desc) desc.textContent = `Seu Nexus caiu aos ${summary.duration}, mas a série segue aberta em ${sRes.playerWins} x ${sRes.enemyWins} (${sRes.format}). Reorganize sua equipe!`;
        updateButtons(`⚔️ Jogar Jogo ${sRes.nextGameNumber} da Série (${sRes.playerWins} - ${sRes.enemyWins}) ➔`, `⚔️ Jogo ${sRes.nextGameNumber} ➔`);
      } else {
        if (title) {
          title.textContent = "DERROTA NO RIFT";
          title.className = "ceremony-title red";
        }
        if (desc) desc.textContent = `Seu Nexus não resistiu à investida aos ${summary.duration}.`;
        updateButtons("Continuar ➔", "Continuar ➔");
      }
    }

    // 1. Renderiza o Placar Comparativo de Objetivos Globais
    this._renderGlobalScoreboard(summary);

    // 2. Renderiza a Aba de Estatísticas Inicial (overview)
    this._currentStatsTab = "overview";
    this._renderStatsTab(summary, this._currentStatsTab);

    // 3. Configura cliques nas abas
    const tabBtns = overlay.querySelectorAll(".stats-tab-btn");
    tabBtns.forEach(btn => {
      btn.onclick = () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this._currentStatsTab = btn.getAttribute("data-tab");
        this._renderStatsTab(summary, this._currentStatsTab);
      };
    });

    overlay.classList.add("active");

    const doFinish = () => {
      if (typeof confetti !== "undefined") confetti.stop();
      overlay.classList.remove("active");
      this.onMatchFinished(result, summary);
    };

    if (continueBtn) {
      continueBtn.onclick = doFinish;
    }
    if (headerContinueBtn) {
      headerContinueBtn.onclick = doFinish;
    }
  }

  _renderGlobalScoreboard(summary) {
    const container = this.containerEl.querySelector("#stats-global-scoreboard");
    if (!container) return;

    const blue = summary.blue || {};
    const red = summary.red || {};

    const blueGoldK = ((blue.gold || 0) / 1000).toFixed(1) + "k";
    const redGoldK = ((red.gold || 0) / 1000).toFixed(1) + "k";

    const blueLogo = blue.team ? (blue.team.iconUrl || blue.team.logo) : null;
    const redLogo = red.team ? (red.team.iconUrl || red.team.logo) : null;

    container.innerHTML = `
      <div class="team-summary-pill blue-side">
        <div class="team-identity">
          <span class="team-icon">${this._formatTeamLogo(blueLogo, "🛡️")}</span>
          <span class="team-name">${blue.team ? blue.team.name : "Seu Time"}</span>
        </div>
        <div class="team-core-stats">
          <div class="core-stat-item">
            <span class="stat-label">Abates</span>
            <span class="stat-val kills-val">${blue.kills || 0}</span>
          </div>
          <div class="core-stat-item">
            <span class="stat-label">Ouro Total</span>
            <span class="stat-val gold-val">💰 ${blueGoldK}</span>
          </div>
        </div>
      </div>

      <div class="global-objectives-center">
        <div class="objectives-row">
          <div class="obj-stat-box" title="Torres Destruídas">
            <span class="obj-icon">🏰</span>
            <div class="obj-counts"><strong class="blue-val">${blue.towers || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.towers || 0}</strong></div>
            <span class="obj-name">Torres</span>
          </div>
          <div class="obj-stat-box" title="Inibidores Destruídos">
            <span class="obj-icon">🛡️</span>
            <div class="obj-counts"><strong class="blue-val">${blue.inhibitors || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.inhibitors || 0}</strong></div>
            <span class="obj-name">Inibidores</span>
          </div>
          <div class="obj-stat-box" title="Dragões Elementais">
            <span class="obj-icon">🐲</span>
            <div class="obj-counts"><strong class="blue-val">${blue.dragons || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.dragons || 0}</strong></div>
            <span class="obj-name">Dragões</span>
          </div>
          <div class="obj-stat-box" title="Arautos do Vale">
            <span class="obj-icon">👁️</span>
            <div class="obj-counts"><strong class="blue-val">${blue.heralds || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.heralds || 0}</strong></div>
            <span class="obj-name">Arauto</span>
          </div>
          <div class="obj-stat-box" title="Barões Na'Shor">
            <span class="obj-icon">👾</span>
            <div class="obj-counts"><strong class="blue-val">${blue.barons || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.barons || 0}</strong></div>
            <span class="obj-name">Barão</span>
          </div>
          <div class="obj-stat-box" title="Dragões Anciões">
            <span class="obj-icon">🔥</span>
            <div class="obj-counts"><strong class="blue-val">${blue.elders || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.elders || 0}</strong></div>
            <span class="obj-name">Ancião</span>
          </div>
        </div>
      </div>

      <div class="team-summary-pill red-side">
        <div class="team-core-stats">
          <div class="core-stat-item">
            <span class="stat-label">Abates</span>
            <span class="stat-val kills-val">${red.kills || 0}</span>
          </div>
          <div class="core-stat-item">
            <span class="stat-label">Ouro Total</span>
            <span class="stat-val gold-val">💰 ${redGoldK}</span>
          </div>
        </div>
        <div class="team-identity">
          <span class="team-name">${red.team ? red.team.name : "CBLOL"}</span>
          <span class="team-icon">${this._formatTeamLogo(redLogo, "⚡")}</span>
        </div>
      </div>
    `;
  }

  _renderStatsTab(summary, tabKey) {
    const body = this.containerEl.querySelector("#stats-tab-body");
    if (!body) return;

    const roles = ["top", "jungle", "mid", "adc", "support"];
    const roleLabels = { top: "TOP", jungle: "JUG", mid: "MID", adc: "ADC", support: "SUP" };

    const renderTeamChamps = (rosterObj, side) => {
      const roster = rosterObj || {};
      return roles.map(role => {
        const c = roster[role] || { id: "Aatrox", name: role, kills: 0, deaths: 0, assists: 0, damageDealt: 0, damageTaken: 0, goldEarned: 500, cs: 0, items: [] };
        const champInfo = getChampionById(c.id);
        const champKey = champInfo ? champInfo.id : (c.id === "Wukong" ? "MonkeyKing" : c.id);
        const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champKey}.png`;

        if (tabKey === "overview") {
          const goldStr = ((c.goldEarned || 500) / 1000).toFixed(1) + "k";
          const itemsHtml = [0, 1, 2, 3].map(idx => {
            const itm = (c.items || [])[idx];
            if (itm) {
              return `<div class="stats-item-slot filled" title="${itm.name}"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
            }
            return `<div class="stats-item-slot empty"></div>`;
          }).join('');

          return `
            <div class="stats-champ-card ${side}-card">
              <div class="stats-champ-left">
                <div class="stats-avatar-wrap">
                  <img src="${avatarUrl}" alt="${c.name}" class="stats-champ-avatar" />
                  <span class="stats-role-badge">${roleLabels[role]}</span>
                </div>
                <div class="stats-champ-info">
                  <span class="stats-champ-name">${c.name}</span>
                  <span class="stats-champ-kda">${c.kills} / <span class="death-num">${c.deaths}</span> / ${c.assists}</span>
                </div>
              </div>
              <div class="stats-champ-center">
                <span class="stats-pill cs-pill">🌾 ${c.cs || 0} CS (${c.csPerMin !== undefined ? c.csPerMin.toFixed(1) : ((c.cs || 0) / Math.max(1, (summary.gameSeconds || 1200) / 60)).toFixed(1)}/m)</span>
                <span class="stats-pill gold-pill">💰 ${goldStr}</span>
              </div>
              <div class="stats-champ-items">
                ${itemsHtml}
              </div>
            </div>
          `;
        }

        // Gráficos de Barra: Dano, Ouro, ou Dano Sofrido
        let val = 0;
        let max = 1;
        let isMvp = false;
        let labelUnit = "";
        let barClass = "";

        if (tabKey === "damage") {
          val = c.damageDealt || 0;
          max = summary.maxDamage || 1;
          isMvp = c.id === summary.topDamageChampId;
          labelUnit = "Dano";
          barClass = side === "blue" ? "dmg-bar-blue" : "dmg-bar-red";
        } else if (tabKey === "gold") {
          val = c.goldEarned || 500;
          max = summary.maxGold || 1;
          isMvp = c.id === summary.topGoldChampId;
          labelUnit = "Ouro";
          barClass = "gold-bar";
        } else if (tabKey === "taken") {
          val = c.damageTaken || 0;
          max = summary.maxTaken || 1;
          isMvp = c.id === summary.topTakenChampId;
          labelUnit = "Mitigado";
          barClass = "taken-bar";
        }

        const pct = Math.max(8, Math.min(100, Math.round((val / max) * 100)));

        return `
          <div class="stats-champ-card ${side}-card chart-mode">
            <div class="stats-champ-left">
              <div class="stats-avatar-wrap">
                <img src="${avatarUrl}" alt="${c.name}" class="stats-champ-avatar" />
                <span class="stats-role-badge">${roleLabels[role]}</span>
              </div>
              <div class="stats-champ-info">
                <span class="stats-champ-name">${c.name}</span>
                <span class="stats-champ-kda small">${c.kills}/${c.deaths}/${c.assists}</span>
              </div>
            </div>
            <div class="stats-bar-container">
              <div class="stats-bar-header">
                <span class="stats-bar-val">
                  ${isMvp ? `<span class="mvp-crown-tag" title="Maior da Partida!">👑</span> ` : ''}
                  ${val.toLocaleString('pt-BR')} ${labelUnit}
                </span>
                <span class="stats-bar-pct">${pct}%</span>
              </div>
              <div class="stats-bar-track">
                <div class="stats-bar-fill ${barClass} ${isMvp ? 'is-mvp' : ''}" style="width: ${pct}%"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    };

    body.innerHTML = `
      <div class="stats-teams-columns">
        <div class="stats-team-column blue-column">
          <div class="column-header blue-header">
            <span class="team-flag">🔷</span> ${summary.blue && summary.blue.team ? summary.blue.team.name : "Seu Time"}
          </div>
          <div class="column-cards">
            ${renderTeamChamps(summary.blue ? summary.blue.roster : {}, "blue")}
          </div>
        </div>

        <div class="stats-team-column red-column">
          <div class="column-header red-header">
            <span class="team-flag">🔶</span> ${summary.red && summary.red.team ? summary.red.team.name : "CBLOL Adversário"}
          </div>
          <div class="column-cards">
            ${renderTeamChamps(summary.red ? summary.red.roster : {}, "red")}
          </div>
        </div>
      </div>
    `;
  }

  handleTacticalDecision(decisionData) {
    if (sound.playObjectiveAlert) {
      sound.playObjectiveAlert();
    } else {
      sound.playPick();
    }

    const modal = this.containerEl.querySelector("#tactical-decision-modal");
    if (!modal) return;

    const badge = modal.querySelector("#decision-modal-badge");
    const title = modal.querySelector("#decision-modal-title");
    const subtitle = modal.querySelector("#decision-modal-subtitle");
    const container = modal.querySelector("#decision-options-container");
    const feedback = modal.querySelector("#decision-feedback-banner");

    if (badge) badge.textContent = decisionData.badge || "DECISÃO TÁTICA DO RIFT";
    if (title) title.textContent = decisionData.title;
    if (subtitle) subtitle.textContent = decisionData.subtitle;
    if (feedback) {
      feedback.classList.remove("active");
      feedback.style.display = "none";
    }

    // Atualiza imediatamente o placar do HUD superior para garantir sincronia exata
    const liveState = this.sim ? this.sim.getState() : null;
    if (liveState) {
      this.updateTick(liveState);
    }

    // Exibe a barra de parâmetros e situação da partida dentro da modal
    const statusBar = modal.querySelector("#decision-match-status-bar");
    if (statusBar && liveState) {
      const blueGold = liveState.blue.score.gold || 0;
      const redGold = liveState.red.score.gold || 0;
      const blueGoldK = (blueGold / 1000).toFixed(1) + "k";
      const redGoldK = (redGold / 1000).toFixed(1) + "k";
      const goldDiff = blueGold - redGold;
      const absDiffK = (Math.abs(goldDiff) / 1000).toFixed(1) + "k";

      let diffBadge = "";
      let advice = "";

      if (goldDiff >= 1200) {
        diffBadge = `<span class="decision-diff-badge lead-blue">▲ +${absDiffK} Ouro (Vantagem Azul)</span>`;
        advice = `💡 <strong>Vantagem do Seu Time:</strong> Sua equipe possui mais ouro e itens acumulados. Jogadas táticas ou ousadas têm probabilidade favorável!`;
      } else if (goldDiff <= -1200) {
        diffBadge = `<span class="decision-diff-badge lead-red">▼ -${absDiffK} Ouro (Atrás no Ouro)</span>`;
        advice = `⚠️ <strong>Atenção com o Ouro:</strong> O rival está à frente em itens. Opções seguras ou trocas no mapa garantem ouro sem correr risco de wipe.`;
      } else {
        diffBadge = `<span class="decision-diff-badge lead-even">⚖️ Jogo Pareado (±${absDiffK})</span>`;
        advice = `⚔️ <strong>Confronto Equilibrado:</strong> Ambos os times estão em igualdade de recursos. O acerto desta decisão pode definir a liderança.`;
      }

      let scoutingHtml = "";
      if (decisionData.scouting) {
        scoutingHtml = `
          <div class="scouting-telemetry-box">
            <div class="scouting-telemetry-header">
              <span class="scouting-radar-tag">${decisionData.scouting.intelTag || '📡 TELEMETRIA & RECONHECIMENTO DO RIFT'}</span>
              <span class="scouting-live-signal">● RECONHECIMENTO AO VIVO</span>
            </div>
            <div class="scouting-intel-grid">
              <div class="scouting-intel-item">
                <span class="scouting-label">Movimentação Observada:</span>
                <span class="scouting-value">${decisionData.scouting.enemyAction}</span>
              </div>
            </div>
          </div>
        `;
      }

      const targetLane = decisionData.meta?.targetLane;
      const campedLane = liveState.redJungleCampLane || (this.matchSim && this.matchSim.redJungleCampLane);
      const isTargetCamped = targetLane && (targetLane === campedLane);
      let campWarningBanner = "";
      if (isTargetCamped) {
        campWarningBanner = `
          <div class="decision-camp-warning-banner">
            ⚠️ <strong>ALERTA DE CAÇADOR ADVERSÁRIO:</strong> O Caçador rival está acampando nesta rota! Forçar jogadas agressivas ou ignorar controle de visão tem penalidade severa de sucesso e alto risco de contra-gank letal.
          </div>
        `;
      }

      let macroBriefingHtml = "";
      if (decisionData.macroBriefing) {
        const mb = decisionData.macroBriefing;
        const f = mb.feasibility;
        macroBriefingHtml = `
          <div class="macro-briefing-panel ${f.pillClass || 'feasibility-med'}">
            <div class="macro-briefing-header">
              <div class="macro-briefing-badge-wrap">
                <span class="macro-feasibility-pill ${f.pillClass}">${f.badge}</span>
                <span class="macro-score-indicator">Índice Tático: <strong>${f.score > 0 ? '+' + f.score : f.score}</strong></span>
              </div>
              <span class="macro-briefing-time">📡 Briefing aos ${mb.formattedTime}</span>
            </div>

            <div class="macro-verdict-box">
              <div class="macro-verdict-headline">
                <span class="macro-verdict-tag">Veredito do Analista:</span>
                <strong>${f.verdictTitle}:</strong> ${f.verdictDesc}
              </div>
              <div class="macro-verdict-recommendation">
                🎯 <strong>Recomendação Competitiva:</strong> ${f.recommendation}
              </div>
            </div>

            <div class="macro-tactical-grid">
              <!-- Coluna 1: Mid Laner -->
              <div class="macro-tactical-col">
                <div class="macro-col-header">
                  <span class="macro-col-icon">🧙‍♂️</span>
                  <span class="macro-col-title">Rota do Meio (Mid)</span>
                </div>
                <div class="macro-col-status" style="color: ${mb.midPriority.color};">
                  ${mb.midPriority.label}
                </div>
                <div class="macro-col-metric">⏱️ Rotação: <strong>${mb.midPriority.rotationTime}</strong></div>
                <p class="macro-col-desc">${mb.midPriority.desc}</p>
              </div>

              <!-- Coluna 2: Rota Adjacente (Bot ou Top) -->
              <div class="macro-tactical-col">
                <div class="macro-col-header">
                  <span class="macro-col-icon">${mb.adjacentLane.lane === "bot" ? "🏹" : "🛡️"}</span>
                  <span class="macro-col-title">${mb.adjacentLane.name}</span>
                </div>
                <div class="macro-col-status" style="color: ${mb.adjacentLane.color};">
                  ${mb.adjacentLane.label}
                </div>
                <div class="macro-col-metric">📍 Rio: <strong>${mb.adjacentLane.hasAdvantage ? "Prioridade Aliada" : (mb.adjacentLane.hasAdvantage === false ? "Vantagem Inimiga" : "Equilibrado")}</strong></div>
                <p class="macro-col-desc">${mb.adjacentLane.desc}</p>
              </div>

              <!-- Coluna 3: Selva & Rotas Iniciais -->
              <div class="macro-tactical-col">
                <div class="macro-col-header">
                  <span class="macro-col-icon">🌲</span>
                  <span class="macro-col-title">Rotas dos Caçadores</span>
                </div>
                <div class="macro-col-status" style="color: ${mb.jungleContext.color};">
                  ${mb.jungleContext.label}
                </div>
                <div class="macro-col-metric">${mb.jungleContext.smiteStatus}</div>
                <p class="macro-col-desc">${mb.jungleContext.desc}</p>
              </div>
            </div>
          </div>
        `;
      }

      statusBar.innerHTML = `
        <div class="decision-status-row">
          <div class="decision-team-stat blue-side">
            <div class="decision-team-name">${liveState.blue.name} (Você)</div>
            <div class="decision-team-numbers">
              <span class="stat-pill gold" title="Ouro total do seu time">💰 ${blueGoldK}</span>
              <span class="stat-pill kills" title="Abates do seu time">⚔️ ${liveState.blue.score.kills} Kills</span>
              <span class="stat-pill dragons" title="Dragões do seu time">🐲 ${liveState.blue.score.dragons}</span>
              <span class="stat-pill barons" title="Barões do seu time">👑 ${liveState.blue.score.barons}</span>
            </div>
          </div>

          <div class="decision-status-center">
            <div class="decision-status-clock">⏱️ ${liveState.time}</div>
            ${diffBadge}
          </div>

          <div class="decision-team-stat red-side">
            <div class="decision-team-name">${liveState.red.name}</div>
            <div class="decision-team-numbers">
              <span class="stat-pill gold" title="Ouro total do adversário">💰 ${redGoldK}</span>
              <span class="stat-pill kills" title="Abates do adversário">⚔️ ${liveState.red.score.kills} Kills</span>
              <span class="stat-pill dragons" title="Dragões do adversário">🐲 ${liveState.red.score.dragons}</span>
              <span class="stat-pill barons" title="Barões do adversário">👑 ${liveState.red.score.barons}</span>
            </div>
          </div>
        </div>
        ${macroBriefingHtml}
        ${campWarningBanner}
        ${scoutingHtml}
        <div class="decision-advice-pill">${advice}</div>
      `;
    }

    if (container) {
      container.innerHTML = decisionData.options.map(opt => `
        <div class="decision-choice-card complexity-${opt.complexity || 'tactical'}" data-choice-id="${opt.id}">
          <div class="choice-card-header">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="choice-card-icon">${opt.icon || '⚔️'}</span>
              ${opt.badge ? `<span class="decision-custom-badge" style="background: rgba(200, 155, 60, 0.2); border: 1px solid #c89b3c; color: #f0e6d2; font-size: 11px; padding: 2px 7px; border-radius: 4px; font-weight: 700; letter-spacing: 0.5px;">${opt.badge}</span>` : ''}
              ${opt.gankTarget ? `<span class="gank-target-badge" style="background: rgba(0, 180, 216, 0.25); border: 1px solid #00b4d8; color: #90e0ef; font-size: 11px; padding: 2px 7px; border-radius: 4px; font-weight: 700; letter-spacing: 0.5px;">🎯 GANK 03:00: ${opt.gankTarget.toUpperCase()}</span>` : ''}
              ${opt.zoneLabel ? `<span class="zone-badge zone-${opt.zone || 'map'}">${opt.zoneLabel}</span>` : ''}
              <span class="complexity-badge ${opt.complexity || 'tactical'}">${opt.complexityLabel || opt.risk}</span>
            </div>
            <span class="probability-badge ${opt.probability >= 70 ? 'prob-high' : (opt.probability >= 45 ? 'prob-med' : 'prob-low')}">
              🎯 ${opt.probability}% Sucesso
            </span>
          </div>

          <div class="probability-bar-track">
            <div class="probability-bar-fill ${opt.probability >= 70 ? 'prob-high' : (opt.probability >= 45 ? 'prob-med' : 'prob-low')}" style="width: ${opt.probability}%"></div>
          </div>

          <h3 class="choice-card-title">${opt.name}</h3>
          <p class="choice-card-desc">${opt.desc}</p>

          <div class="choice-card-reward">
            <span class="reward-tag">Recompensa se Acertar:</span>
            <strong>${opt.reward}</strong>
          </div>

          ${opt.failureConsequence ? `
            <div class="choice-card-risk-warning">
              <span class="risk-consequence-tag">Perigo se Falhar:</span>
              <span>${opt.failureConsequence}</span>
            </div>
          ` : ''}

          <button class="lol-btn lol-btn-primary decision-card-btn" data-choice-id="${opt.id}">
            Executar Jogada (${opt.probability}%)
          </button>
        </div>
      `).join('');

      // Add click listeners to cards and buttons
      container.querySelectorAll(".decision-choice-card").forEach(card => {
        const choiceId = card.getAttribute("data-choice-id");
        card.onclick = () => {
          this._executeTacticalChoice(choiceId, card, modal);
        };
      });
    }

    const closeBtn = modal.querySelector("#decision-modal-close-btn");
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        modal.classList.remove("active");
        if (this.sim) {
          if (this.sim.activeDecision) {
            this.sim.resolveTacticalDecision(this.sim.activeDecision.options[0].id, true);
          } else {
            this.sim.resume();
          }
        }
        this._isResolvingDecision = false;
      };
    }

    modal.classList.add("active");
  }

  _executeTacticalChoice(choiceId, selectedCard, modal) {
    if (this._isResolvingDecision) return;
    this._isResolvingDecision = true;

    sound.playPick();

    // Visual selection
    modal.querySelectorAll(".decision-choice-card").forEach(c => {
      c.classList.add("disabled");
      c.onclick = null;
    });
    if (selectedCard) {
      selectedCard.classList.add("selected");
    }

    const feedback = modal.querySelector("#decision-feedback-banner");
    const feedbackText = modal.querySelector("#decision-feedback-text");
    const feedbackIcon = modal.querySelector("#decision-feedback-icon");
    if (feedback && feedbackText) {
      feedback.style.display = "flex";
      feedback.className = "decision-feedback-banner active resolving";
      if (feedbackIcon) feedbackIcon.textContent = "🎲";
      feedbackText.textContent = "Rolando dados e executando jogada no Rift...";
    }

    // Failsafe de proteção extrema: se por qualquer razão o navegador travar o timer, garante fechamento e despausa
    const failsafeTimer = setTimeout(() => {
      if (modal && modal.classList.contains("active")) {
        modal.classList.remove("active");
        if (this.sim && this.sim.isPaused) {
          this.sim.resume();
        }
        this._isResolvingDecision = false;
      }
    }, 4000);

    setTimeout(() => {
      let outcome = null;
      try {
        // Resolve a lógica de estado SEM despausar ainda para evitar que o próximo tick ocorra com a modal aberta
        outcome = this.sim.resolveTacticalDecision(choiceId, false);
      } catch (err) {
        console.error("Erro ao processar decisão tática:", err);
      }

      if (feedback && feedbackText && outcome) {
        if (outcome.success) {
          feedback.className = "decision-feedback-banner active success";
          if (feedbackIcon) feedbackIcon.textContent = "🏆";
          feedbackText.innerHTML = `<strong>SUCESSO! (${outcome.roll} vs ${outcome.probability}%)</strong> • ${outcome.title}`;
          sound.playItemCompleted();
        } else {
          feedback.className = "decision-feedback-banner active failure";
          if (feedbackIcon) feedbackIcon.textContent = "💀";
          feedbackText.innerHTML = `<strong>FALHOU! (${outcome.roll} vs ${outcome.probability}%)</strong> • ${outcome.title}`;
          sound.playDefeat();
        }
      }

      setTimeout(() => {
        clearTimeout(failsafeTimer);
        modal.classList.remove("active");

        // Adiciona log de destaque no killfeed
        if (outcome && outcome.text) {
          this.handleEvent({
            type: "tactic",
            side: outcome.success ? "blue" : "red",
            text: `${outcome.success ? '⚡' : '⚠️'} [${outcome.title}] ${outcome.text}`,
            time: (this.sim && this.sim.getState()) ? this.sim.getState().time : "20:00"
          });
        }

        // Despausa o simulador agora com a modal devidamente fechada
        if (this.sim) {
          this.sim.resume();
        }
        this._isResolvingDecision = false;
      }, 1000);
    }, 600);
  }

  _bindControls() {
    // Botões de Postura Tática da Equipe em Tempo Real
    this.containerEl.querySelectorAll(".tactic-btn[data-tactic]").forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        const tactic = btn.getAttribute("data-tactic");
        if (tactic && this.sim && !this.sim.isFinished) {
          this.sim.setTactics(tactic, true);
          this.containerEl.querySelectorAll(".tactic-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        }
      });
    });

    // Botões de Velocidade
    this.containerEl.querySelectorAll(".speed-btn[data-speed]").forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        const spd = parseInt(btn.getAttribute("data-speed"), 10);
        this.sim.setSpeed(spd);
        this.containerEl.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    // Botão Pular
    const skipBtn = this.containerEl.querySelector("#skip-match-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        sound.playClick();
        const dModal = this.containerEl.querySelector("#tactical-decision-modal");
        if (dModal) dModal.classList.remove("active");
        this._isResolvingDecision = false;
        this.sim.skipToEnd();
      });
    }

    this._bindMapInteractions();
  }

  _updateActiveStructureTooltip() {
    if (!this._hoveredStructNode) return;
    const tooltip = this.containerEl.querySelector("#rift-structure-tooltip");
    if (!tooltip || tooltip.style.display === "none") return;
    const node = this._hoveredStructNode;
    const side = node.dataset.side;
    const name = node.dataset.name || "Estrutura";
    const hp = parseInt(node.dataset.hp, 10) || 0;
    const maxHp = parseInt(node.dataset.maxHp, 10) || 3000;
    const plates = parseInt(node.dataset.plates, 10) || 0;
    const gold = node.dataset.gold || 250;
    const isDestroyed = node.classList.contains("destroyed");
    const pct = Math.max(0, Math.round((hp / maxHp) * 100));

    const sideBadge = side === "blue" ? `<span class="tip-team blue">🔵 LADO AZUL</span>` : `<span class="tip-team red">🔴 LADO VERMELHO</span>`;
    const statusText = isDestroyed
      ? `<span class="tip-status destroyed">💥 DESTRUÍDA</span>`
      : (pct < 40 ? `<span class="tip-status critical">⚠️ CRÍTICA (${pct}%)</span>` : `<span class="tip-status intact">🛡️ ATIVA (${pct}%)</span>`);

    tooltip.innerHTML = `
      <div class="tip-header">
        ${sideBadge}
        <div class="tip-name">${name}</div>
      </div>
      <div class="tip-body">
        <div class="tip-hp-row">
          <span class="tip-label">Integridade:</span>
          <span class="tip-hp-val">${isDestroyed ? '0 / ' + maxHp : hp + ' / ' + maxHp} HP</span>
        </div>
        <div class="tip-hp-bar">
          <div class="tip-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}" style="width: ${isDestroyed ? 0 : pct}%;"></div>
        </div>
        ${plates > 0 && !isDestroyed ? `
          <div class="tip-detail-row plates">
            <span>🛡️ Barricadas:</span>
            <strong>${plates} Placas (+${plates * 125}g disponíveis)</strong>
          </div>
        ` : ''}
        <div class="tip-detail-row">
          <span>Status:</span>
          ${statusText}
        </div>
        <div class="tip-detail-row bounty">
          <span>Recompensa Global:</span>
          <strong>+${gold} Ouro</strong>
        </div>
      </div>
    `;
  }

  _bindMapInteractions() {
    const tooltip = this.containerEl.querySelector("#rift-structure-tooltip");
    const svgContainer = this.containerEl.querySelector("#rift-svg-container");
    if (!tooltip || !svgContainer) return;

    // Garante que o tooltip nunca intercepte eventos de ponteiro
    tooltip.style.pointerEvents = "none";

    const updateTooltipPosition = (e) => {
      const rect = svgContainer.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      const tipWidth = 220;
      const tipHeight = 145;

      // Posiciona longe do cursor para nunca haver sobreposição
      let posX;
      if (cursorX > rect.width * 0.52) {
        posX = cursorX - tipWidth - 16;
      } else {
        posX = cursorX + 18;
      }

      let posY;
      if (cursorY > rect.height * 0.52) {
        posY = cursorY - tipHeight - 12;
      } else {
        posY = cursorY + 14;
      }

      // Limites de segurança para manter o tooltip dentro do mapa
      posX = Math.max(6, Math.min(rect.width - tipWidth - 6, posX));
      posY = Math.max(6, Math.min(rect.height - tipHeight - 6, posY));

      tooltip.style.left = `${Math.round(posX)}px`;
      tooltip.style.top = `${Math.round(posY)}px`;
    };

    this.containerEl.querySelectorAll(".map-structure-node").forEach(node => {
      node.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = node;
        this._updateActiveStructureTooltip();
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      node.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      node.addEventListener("mouseleave", () => {
        if (this._hoveredStructNode === node) {
          this._hoveredStructNode = null;
        }
        tooltip.style.display = "none";
      });

      node.addEventListener("click", () => {
        sound.playClick();
        const halo = node.querySelector(".struct-halo");
        if (halo) {
          halo.classList.remove("ping-pulse");
          void halo.offsetWidth;
          halo.classList.add("ping-pulse");
        }
      });
    });

    this.containerEl.querySelectorAll(".pit-marker").forEach(pit => {
      pit.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = null;
        const isBaron = pit.dataset.pit === "baron";
        const title = isBaron ? "👾 Covil do Barão Na'Shor" : "🐲 Covil do Dragão Elemental";
        const loc = isBaron ? "Parte Superior do Rio (Top River)" : "Parte Inferior do Rio (Bot River)";
        const desc = isBaron ? "Buff Mão do Barão: Super Cerco, bônus adaptativo e fortalecimento de tropas." : "Buff Elemental: Bônus cumulativo de dano, armadura ou regeneração.";
        const spawn = isBaron ? "Surge aos 20:00 (Respawn 6 min)" : "Surge aos 05:00 (Respawn 5 min)";

        tooltip.innerHTML = `
          <div class="tip-header">
            <span class="tip-team ${isBaron ? 'red' : 'blue'}">👑 OBJETIVO ÉPICO</span>
            <div class="tip-name">${title}</div>
          </div>
          <div class="tip-body">
            <div class="tip-detail-row">
              <span>Localização:</span>
              <strong>${loc}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Cronograma:</span>
              <strong>${spawn}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Recompensa:</span>
              <span style="color:#f0e6d2; font-size:11px;">${desc}</span>
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      pit.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      pit.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      pit.addEventListener("click", () => {
        sound.playClick();
      });
    });

    // Interatividade dos Marcadores de Choque de Tropas (Minion Clash Waves)
    this.containerEl.querySelectorAll(".minion-clash-wave").forEach(clashNode => {
      clashNode.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = null;
        const lane = clashNode.dataset.lane;
        const liveState = this.sim ? this.sim.getState() : state;
        const pressures = liveState.lanePressures || { top: liveState.lanePressure, mid: liveState.lanePressure, bot: liveState.lanePressure };
        const waveData = this._getLaneWaveData(lane, pressures[lane] || 0, liveState.gameSeconds || 0, liveState);

        tooltip.innerHTML = `
          <div class="tip-header" style="border-bottom: 2px solid ${waveData.theme.color};">
            <span class="tip-team" style="background:${waveData.theme.badgeBg}; color:${waveData.theme.colorLight}; border: 1px solid ${waveData.theme.color};">
              ${waveData.theme.icon} CHOQUE DE TROPAS • ${waveData.theme.name.toUpperCase()}
            </span>
            <div class="tip-name" style="color:#fff; font-size:12px; margin-top:2px;">${waveData.status}</div>
          </div>
          <div class="tip-body">
            <div class="tip-wave-grid">
              <div class="tip-wave-team blue">
                <div class="tip-wave-team-title">🔵 Tropas Azuis: <strong>${waveData.blueTotal}</strong></div>
                <div class="tip-wave-breakdown">
                  <span>🛡️ ${waveData.blueMelee} Guerreiros</span>
                  <span>🔮 ${waveData.blueCasters} Magos</span>
                  ${waveData.blueCannon ? `<span>💣 ${waveData.blueCannon} Canhão</span>` : ''}
                  ${waveData.blueSuper ? `<span style="color:#c084fc;">👾 ${waveData.blueSuper} Super Tropa</span>` : ''}
                  ${waveData.blueHasBaron ? `<span style="color:#a855f7;">👑 Mão do Barão</span>` : ''}
                </div>
              </div>
              <div class="tip-wave-vs">VS</div>
              <div class="tip-wave-team red">
                <div class="tip-wave-team-title">🔴 Tropas Vermelhas: <strong>${waveData.redTotal}</strong></div>
                <div class="tip-wave-breakdown">
                  <span>🛡️ ${waveData.redMelee} Guerreiros</span>
                  <span>🔮 ${waveData.redCasters} Magos</span>
                  ${waveData.redCannon ? `<span>💣 ${waveData.redCannon} Canhão</span>` : ''}
                  ${waveData.redSuper ? `<span style="color:#f43f5e;">👾 ${waveData.redSuper} Super Tropa</span>` : ''}
                  ${waveData.redHasBaron ? `<span style="color:#f87171;">👑 Mão do Barão</span>` : ''}
                </div>
              </div>
            </div>
            <div class="tip-detail-row" style="margin-top: 6px;">
              <span>Pressão da Rota:</span>
              <strong style="color:${waveData.pressure >= 0 ? '#60a5fa' : '#f87171'};">${waveData.pressure >= 0 ? `+${waveData.pressure}% (Azul Avançando)` : `${Math.abs(waveData.pressure)}% (Vermelho Avançando)`}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Situação:</span>
              <span style="color:#f0e6d2; font-size:11px;">${waveData.description}</span>
            </div>
            <div class="tip-wave-cta" style="color:${waveData.theme.colorLight};">
              🎯 Clique para Focar esta Rota com a sua Equipe!
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      clashNode.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      clashNode.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      clashNode.addEventListener("click", () => {
        sound.playClick();
        const lane = clashNode.dataset.lane;
        if (this.sim && this.sim.setLaneFocus && lane) {
          this.sim.setLaneFocus(lane);
          const liveState = this.sim.getState();
          this.updateTick(liveState);
        }
      });
    });

    // Interatividade de Foco Tático de Rota (Top, Mid, Bot)
    const laneBadges = [
      { id: "badge-lane-top", lane: "top" },
      { id: "badge-lane-mid", lane: "mid" },
      { id: "badge-lane-bot", lane: "bot" }
    ];
    laneBadges.forEach(({ id, lane }) => {
      const badgeEl = this.containerEl.querySelector(`#${id}`);
      if (badgeEl) {
        badgeEl.addEventListener("click", () => {
          sound.playClick();
          if (this.sim && this.sim.setLaneFocus) {
            this.sim.setLaneFocus(lane);
            const liveState = this.sim.getState();
            this.updateTick(liveState);
          }
        });
      }
    });

    // Interatividade dos Campeões no Minimapa
    this.containerEl.querySelectorAll(".champ-map-marker").forEach(marker => {
      marker.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = null;
        const side = marker.dataset.side;
        const role = marker.dataset.role;
        const liveState = this.sim ? this.sim.getState() : state;
        const roster = liveState[side] && liveState[side].roster;
        const m = roster && roster[role];
        if (!m) return;

        const p = m.proPlayer;
        const nickDisplay = p ? `${p.nick} (${m.name})` : m.name;
        const roleName = role === "top" ? "Rota Superior (Top)" : (role === "jungle" ? "Selva (Jungle)" : (role === "mid" ? "Rota do Meio (Mid)" : (role === "adc" ? "Atirador (ADC)" : "Suporte (Support)")));
        const isBlue = side === "blue";
        const hpVal = Math.round(m.hpPct !== undefined ? m.hpPct : 100);
        const statusText = m.alive ? (m.statusText || "Em ação pelo Rift") : "Morto (Aguardando Renascimento)";

        tooltip.innerHTML = `
          <div class="tip-header" style="border-bottom: 2px solid ${isBlue ? '#0ac8b9' : '#e84057'};">
            <span class="tip-team ${isBlue ? 'blue' : 'red'}">
              ${isBlue ? '🛡️ CAMPEÃO ALIADO' : '⚔️ CAMPEÃO INIMIGO'} • ${roleName.toUpperCase()}
            </span>
            <div class="tip-name" style="color:#fff; font-size:13px; margin-top:2px;">
              ${nickDisplay}
            </div>
          </div>
          <div class="tip-body">
            <div class="tip-hp-row">
              <span>Vida:</span>
              <strong class="tip-hp-val" style="color: ${hpVal < 30 ? '#ff3344' : (hpVal < 60 ? '#f0b622' : '#0ac8b9')}">${hpVal}%</strong>
            </div>
            <div class="tip-hp-bar">
              <div class="tip-hp-fill ${hpVal < 30 ? 'critical' : (hpVal < 60 ? 'damaged' : '')}" style="width: ${hpVal}%; background: ${isBlue ? '#0ac8b9' : '#e84057'};"></div>
            </div>
            <div class="tip-detail-row">
              <span>Status:</span>
              <strong style="color: #f0e6d2;">${statusText}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Placar / Farm:</span>
              <strong>${m.kills || 0}/${m.deaths || 0}/${m.assists || 0} (${m.cs || 0} CS)</strong>
            </div>
            <div class="tip-detail-row">
              <span>Ouro Individual:</span>
              <strong style="color: var(--lol-gold-1);">${m.gold || 0} 🪙</strong>
            </div>
            <div class="tip-detail-row">
              <span>Visão:</span>
              <strong style="color: ${isBlue ? '#0ac8b9' : '#f59e0b'};">
                ${isBlue ? 'Visão Aliada Permanente (115px)' : (m.isVisibleToBlue ? '👁️ Revelado na Visão Aliada' : '❓ Última Posição Conhecida')}
              </strong>
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      marker.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      marker.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      marker.addEventListener("click", () => {
        sound.playClick();
      });
    });

    // Interatividade das Sentinelas (Wards) no Minimapa
    const wardsLayer = this.containerEl.querySelector("#wards-layer");
    if (wardsLayer) {
      wardsLayer.addEventListener("mouseover", (e) => {
        const wardNode = e.target.closest(".ward-map-marker");
        if (!wardNode) return;
        this._hoveredStructNode = null;
        const type = wardNode.dataset.type;
        const remaining = wardNode.dataset.remaining;
        const isControl = type === "control";

        tooltip.innerHTML = `
          <div class="tip-header" style="border-bottom: 2px solid ${isControl ? '#ec4899' : '#f59e0b'};">
            <span class="tip-team blue">👁️ SENTINELA ALIADA</span>
            <div class="tip-name">${isControl ? 'Sentinela de Controle (Rosa)' : 'Sentinela Invisível (Amarela)'}</div>
          </div>
          <div class="tip-body">
            <div class="tip-detail-row">
              <span>Raio de Visão:</span>
              <strong>${isControl ? '110px (Visão Verdadeira)' : '95px (Visão Padrão)'}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Duração Restante:</span>
              <strong style="color:#f0b622;">${isControl ? 'Permanente até ser destruída' : `${remaining}s`}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Efeito:</span>
              <span style="color:#f0e6d2; font-size:11px;">Revela e remove a Névoa de Guerra (Fog of War) na área.</span>
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      wardsLayer.addEventListener("mousemove", (e) => {
        if (e.target.closest(".ward-map-marker")) {
          updateTooltipPosition(e);
        }
      });

      wardsLayer.addEventListener("mouseout", (e) => {
        if (e.target.closest(".ward-map-marker")) {
          tooltip.style.display = "none";
        }
      });
    }

    // Interatividade dos Acampamentos e Monstros da Selva (Jungle Camps)
    this.containerEl.querySelectorAll(".jungle-camp-node").forEach(campNode => {
      campNode.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = null;
        const campId = campNode.dataset.campId;
        const liveState = this.sim ? this.sim.getState() : state;
        const campsList = liveState.jungleCamps || (typeof getAllJungleCamps === "function" ? getAllJungleCamps() : []);
        const camp = campsList.find(c => c.id === campId) || (typeof getJungleCampById === "function" ? getJungleCampById(campId) : null);
        if (!camp) return;

        const isAlive = camp.status === "alive";
        const isClearing = camp.status === "clearing";
        const isRespawning = camp.status === "respawning";
        const isUnspawned = !camp.status || camp.status === "unspawned";
        const gameSecs = liveState.gameSeconds || 0;

        let statusBadge = "";
        let statusText = "";
        const remSeconds = Math.max(0, (camp.respawnsAt || camp.spawnAt || 0) - gameSecs);
        const m = Math.floor(remSeconds / 60);
        const s = remSeconds % 60;
        const timerFormatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (isAlive) {
          statusBadge = `<span style="color:#10b981; font-weight:bold;">🟢 VIVO NO MAPA</span>`;
          statusText = `Disponível para abate por qualquer caçador`;
        } else if (isClearing) {
          const who = camp.clearingBy === "blue" ? "Caçador Aliado (Azul)" : "Caçador Inimigo (Vermelho)";
          statusBadge = `<span style="color:#f59e0b; font-weight:bold;">⚔️ EM COMBATE</span>`;
          statusText = `Sendo abatido por ${who}`;
        } else if (isRespawning) {
          statusBadge = `<span style="color:#f43f5e; font-weight:bold;">⏳ RENASCENDO EM ${timerFormatted}</span>`;
          statusText = `Abatido recentemente (${camp.clearedBy === 'blue' ? 'Abatido pela sua equipe' : 'Abatido pelo time rival'})`;
        } else {
          statusBadge = `<span style="color:#a855f7; font-weight:bold;">⏳ SURGIMENTO INICIAL EM ${timerFormatted}</span>`;
          statusText = `Surge aos ${Math.floor(camp.spawnAt / 60)}:${String(camp.spawnAt % 60).padStart(2, '0')} de jogo`;
        }

        const sideLabel = camp.side === "blue" ? "🔵 Selva Azul" : (camp.side === "red" ? "🔴 Selva Vermelha" : "🌊 Rio de Summoner's Rift");
        const respawnMin = Math.floor(camp.respawnDuration / 60);
        const respawnSec = camp.respawnDuration % 60;
        const respawnStr = respawnSec ? `${respawnMin}m ${respawnSec}s` : `${respawnMin} min`;

        tooltip.innerHTML = `
          <div class="tip-header" style="border-bottom: 2px solid ${camp.themeColor || '#fbbf24'};">
            <span class="tip-team" style="background: rgba(10, 15, 25, 0.9); color: ${camp.themeColor || '#fbbf24'}; border: 1px solid ${camp.themeColor || '#fbbf24'};">
              ${camp.icon} ${camp.badge || 'SELVA'} • ${sideLabel}
            </span>
            <div class="tip-name" style="color:#fff; font-size:13px; margin-top:2px;">
              ${camp.name}
            </div>
          </div>
          <div class="tip-body">
            <div class="tip-detail-row">
              <span>Situação:</span>
              ${statusBadge}
            </div>
            <div class="tip-detail-row">
              <span>Recompensa de Ouro:</span>
              <strong style="color: #fbbf24;">💰 +${camp.gold}g (Para o Caçador)</strong>
            </div>
            <div class="tip-detail-row">
              <span>Farm de Tropas (CS):</span>
              <strong style="color: #60a5fa;">🌾 +${camp.cs} CS</strong>
            </div>
            <div class="tip-detail-row">
              <span>Tempo de Renascimento:</span>
              <strong style="color: #f0e6d2;">⏱️ ${respawnStr}</strong>
            </div>
            ${camp.buff ? `
              <div class="tip-detail-row" style="margin-top: 4px;">
                <span>Efeito / Bônus:</span>
                <span style="color: #38bdf8; font-size: 10.5px; line-height: 1.3;">${camp.buff}</span>
              </div>
            ` : ''}
            <div class="tip-detail-row" style="margin-top: 4px;">
              <span>Descrição:</span>
              <span style="color: #d1d5db; font-size: 10px; line-height: 1.3;">${camp.desc}</span>
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      campNode.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      campNode.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      campNode.addEventListener("click", () => {
        sound.playClick();
        const halo = campNode.querySelector(".camp-halo");
        if (halo) {
          halo.classList.remove("ping-pulse");
          void halo.offsetWidth;
          halo.classList.add("ping-pulse");
        }
      });
    });

    // Inicializa o modal da Loja Hextech e Árvore de Receitas
    this._initItemShopModal();
  }

  _getLaneClashPosition(lane, pressure, state) {
    const LANE_WAYPOINTS = {
      top: [
        { x: 154, y: 464, name: "blue_t3" }, // 0: Torre T3 Azul
        { x: 198, y: 389, name: "blue_t2" }, // 1: Torre T2 Azul
        { x: 216, y: 208, name: "blue_t1" }, // 2: Torre T1 Azul
        { x: 268, y: 136, name: "river" },   // 3: Rio / Choque Neutro
        { x: 338, y: 84,  name: "red_t1" },  // 4: Torre T1 Vermelha
        { x: 525, y: 116, name: "red_t2" },  // 5: Torre T2 Vermelha
        { x: 660, y: 92,  name: "red_t3" },  // 6: Torre T3 Vermelha
        { x: 692, y: 88,  name: "red_inhib" } // 7: Inibidor Vermelho
      ],
      mid: [
        { x: 322, y: 524, name: "blue_t3" }, // 0: Torre T3 Azul
        { x: 398, y: 460, name: "blue_t2" }, // 1: Torre T2 Azul
        { x: 430, y: 395, name: "blue_t1" }, // 2: Torre T1 Azul
        { x: 514, y: 344, name: "river" },   // 3: Rio / Centro da Rota
        { x: 597, y: 292, name: "red_t1" },  // 4: Torre T1 Vermelha
        { x: 626, y: 240, name: "red_t2" },  // 5: Torre T2 Vermelha
        { x: 692, y: 190, name: "red_t3" },  // 6: Torre T3 Vermelha
        { x: 718, y: 172, name: "red_inhib" } // 7: Inibidor Vermelho
      ],
      bot: [
        { x: 356, y: 654, name: "blue_t3" }, // 0: Torre T3 Azul
        { x: 484, y: 636, name: "blue_t2" }, // 1: Torre T2 Azul
        { x: 690, y: 656, name: "blue_t1" }, // 2: Torre T1 Azul
        { x: 814, y: 610, name: "river" },   // 3: Centro Neutro da Rota Bot (Curva do Alcove)
        { x: 864, y: 484, name: "red_t1" },  // 4: Torre T1 Vermelha
        { x: 804, y: 328, name: "red_t2" },  // 5: Torre T2 Vermelha
        { x: 836, y: 222, name: "red_t3" },  // 6: Torre T3 Vermelha
        { x: 812, y: 198, name: "red_inhib" } // 7: Inibidor Vermelho
      ]
    };

    const waypoints = LANE_WAYPOINTS[lane] || LANE_WAYPOINTS.mid;

    // Helper para verificar se a estrutura está ativa / de pé
    const isAlive = (structures, structId, tier) => {
      if (!structures || !Array.isArray(structures)) return true;
      const s = structures.find(st => st.id === structId || (st.lane === lane && st.tier === tier));
      return s ? !s.destroyed : true;
    };

    const blueT1Alive = isAlive(state?.blue?.structures, `${lane}_t1`, 1);
    const blueT2Alive = isAlive(state?.blue?.structures, `${lane}_t2`, 2);
    const blueT3Alive = isAlive(state?.blue?.structures, `${lane}_t3`, 3);

    const redT1Alive = isAlive(state?.red?.structures, `${lane}_t1`, 1);
    const redT2Alive = isAlive(state?.red?.structures, `${lane}_t2`, 2);
    const redT3Alive = isAlive(state?.red?.structures, `${lane}_t3`, 3);

    // Determina a fronteira máxima de avanço (onde fica a primeira torre inimiga viva)
    // Red frontier: as tropas azuis NUNCA ultrapassam a primeira torre vermelha de pé!
    let maxIdx = 3.85; // Default: para em frente à Torre Red T1 (índice 4)
    if (!redT1Alive) {
      if (redT2Alive) {
        maxIdx = 4.85; // Red T1 caiu, avança até a Torre Red T2 (índice 5)
      } else if (redT3Alive) {
        maxIdx = 5.85; // Red T1 e T2 caíram, avança até a Torre Red T3 (índice 6)
      } else {
        maxIdx = 6.85; // T1, T2 e T3 caíram, avança até o Inibidor
      }
    }

    // Blue frontier: as tropas vermelhas NUNCA ultrapassam a primeira torre azul de pé!
    let minIdx = 2.15; // Default: para em frente à Torre Blue T1 (índice 2)
    if (!blueT1Alive) {
      if (blueT2Alive) {
        minIdx = 1.15; // Blue T1 caiu, recua até a Torre Blue T2 (índice 1)
      } else if (blueT3Alive) {
        minIdx = 0.15; // Blue T1 e T2 caíram, recua até a Torre Blue T3 (índice 0)
      } else {
        minIdx = -0.15; // T1, T2 e T3 azuis caíram, recua até o Inibidor
      }
    }

    const p = Math.max(-100, Math.min(100, pressure || 0));
    const centerIdx = 3.0; // Ponto neutro / Rio

    let pos = centerIdx;
    if (p >= 0) {
      // Avanço Azul em direção ao lado Vermelho
      pos = centerIdx + (p / 100) * (maxIdx - centerIdx);
    } else {
      // Avanço Vermelho em direção ao lado Azul
      pos = centerIdx - (-p / 100) * (centerIdx - minIdx);
    }

    // Interpolação de coordenadas:
    // Na rota inferior (Bot), entre Blue T1 (2.0) e Red T1 (4.0), a rota contorna suavemente
    // o alcove inferior (Curva Bezier P0=(690,656), P1=(850,650), P2=(864,484)), sem cortar pelo rio.
    let x, y;
    if (lane === "bot" && pos >= 2.0 && pos <= 4.0) {
      const t = (pos - 2.0) / 2.0; // Normalizado em [0, 1]
      x = (1 - t) * (1 - t) * 690 + 2 * (1 - t) * t * 850 + t * t * 864;
      y = (1 - t) * (1 - t) * 656 + 2 * (1 - t) * t * 650 + t * t * 484;
    } else {
      const baseIdx = Math.max(0, Math.min(waypoints.length - 2, Math.floor(pos)));
      const frac = Math.max(0, Math.min(1, pos - baseIdx));
      const pA = waypoints[baseIdx];
      const pB = waypoints[baseIdx + 1];

      x = pA.x + (pB.x - pA.x) * frac;
      y = pA.y + (pB.y - pA.y) * frac;
    }

    return {
      x: Math.round(x),
      y: Math.round(y),
      pos,
      maxIdx,
      minIdx,
      targetEnemyTower: redT1Alive ? "T1" : (redT2Alive ? "T2" : (redT3Alive ? "T3" : "Inibidor")),
      targetAllyTower: blueT1Alive ? "T1" : (blueT2Alive ? "T2" : (blueT3Alive ? "T3" : "Inibidor"))
    };
  }

  _getLaneWaveData(lane, pressure, gameSeconds, state) {
    const isCannonWave = (gameSeconds < 900 && Math.floor(gameSeconds / 30) % 3 === 0) ||
                         (gameSeconds >= 900 && gameSeconds < 1500 && Math.floor(gameSeconds / 30) % 2 === 0) ||
                         (gameSeconds >= 1500);

    const baseMinions = isCannonWave ? 7 : 6;
    const p = Math.max(-100, Math.min(100, pressure || 0));

    let blueTotal = baseMinions;
    let redTotal = baseMinions;

    if (p > 15) {
      const waveStack = Math.min(9, Math.floor((p - 15) / 10) + 1);
      blueTotal = baseMinions + waveStack;
      redTotal = Math.max(1, baseMinions - Math.floor(p / 22));
    } else if (p < -15) {
      const absP = Math.abs(p);
      const waveStack = Math.min(9, Math.floor((absP - 15) / 10) + 1);
      redTotal = baseMinions + waveStack;
      blueTotal = Math.max(1, baseMinions - Math.floor(absP / 22));
    }

    const blueHasSuper = state?.blue?.superMinionsByLane?.[lane] || false;
    const redHasSuper = state?.red?.superMinionsByLane?.[lane] || false;
    const blueSuperCount = blueHasSuper ? (gameSeconds > 1800 ? 2 : 1) : 0;
    const redSuperCount = redHasSuper ? (gameSeconds > 1800 ? 2 : 1) : 0;

    blueTotal += blueSuperCount;
    redTotal += redSuperCount;

    const blueCannon = (isCannonWave && blueTotal >= 4) ? 1 : 0;
    const blueMelee = Math.min(3, Math.max(1, Math.floor((blueTotal - blueCannon - blueSuperCount) * 0.5)));
    const blueCasters = Math.max(0, blueTotal - blueMelee - blueCannon - blueSuperCount);

    const redCannon = (isCannonWave && redTotal >= 4) ? 1 : 0;
    const redMelee = Math.min(3, Math.max(1, Math.floor((redTotal - redCannon - redSuperCount) * 0.5)));
    const redCasters = Math.max(0, redTotal - redMelee - redCannon - redSuperCount);

    // Identifica dinamicamente a torre alvo do confronto com base nas estruturas
    const isAlive = (structures, structId, tier) => {
      if (!structures || !Array.isArray(structures)) return true;
      const s = structures.find(st => st.id === structId || (st.lane === lane && st.tier === tier));
      return s ? !s.destroyed : true;
    };

    const redT1Alive = isAlive(state?.red?.structures, `${lane}_t1`, 1);
    const redT2Alive = isAlive(state?.red?.structures, `${lane}_t2`, 2);
    const redT3Alive = isAlive(state?.red?.structures, `${lane}_t3`, 3);

    const blueT1Alive = isAlive(state?.blue?.structures, `${lane}_t1`, 1);
    const blueT2Alive = isAlive(state?.blue?.structures, `${lane}_t2`, 2);
    const blueT3Alive = isAlive(state?.blue?.structures, `${lane}_t3`, 3);

    const targetRedStr = redT1Alive ? "Torre T1" : (redT2Alive ? "Torre T2" : (redT3Alive ? "Torre T3" : "Inibidor"));
    const targetBlueStr = blueT1Alive ? "sua Torre T1" : (blueT2Alive ? "sua Torre T2" : (blueT3Alive ? "sua Torre T3" : "seu Inibidor"));

    let waveStatus = "⚖️ Onda Equilibrada (Freeze)";
    let waveDesc = "As tropas estão se enfrentando no meio da rota com forças proporcionais.";
    if (p >= 50) {
      waveStatus = `🔥 Onda Gigante Batendo na ${targetRedStr}!`;
      waveDesc = `A tropa azul acumulou ${blueTotal} minions e está colidindo contra a ${targetRedStr} adversária!`;
    } else if (p >= 20) {
      waveStatus = "🌊 Slow Push Aliado (+Vantagem Numérica)";
      waveDesc = `Sua equipe tem superioridade de tropas (+${blueTotal - redTotal}) avançando em direção à ${targetRedStr}.`;
    } else if (p <= -50) {
      waveStatus = `⚠️ Onda Inimiga Quebrando sob ${targetBlueStr} (Crash)`;
      waveDesc = `O time vermelho acumulou ${redTotal} tropas e está ameaçando a ${targetBlueStr}!`;
    } else if (p <= -20) {
      waveStatus = "⚠️ Onda Inimiga Avançando (Sob Pressão)";
      waveDesc = `O time rival tem superioridade de tropas (+${redTotal - blueTotal}) empurrando em direção à ${targetBlueStr}.`;
    }

    const laneThemes = {
      top: {
        name: "Rota Superior (Top)",
        color: "#10b981",
        colorLight: "#34d399",
        colorDark: "#064e3b",
        badgeBg: "rgba(6, 78, 59, 0.9)",
        icon: "🌲"
      },
      mid: {
        name: "Rota do Meio (Mid)",
        color: "#a855f7",
        colorLight: "#c084fc",
        colorDark: "#3b0764",
        badgeBg: "rgba(59, 7, 100, 0.9)",
        icon: "🔮"
      },
      bot: {
        name: "Rota Inferior (Bot)",
        color: "#f59e0b",
        colorLight: "#fbbf24",
        colorDark: "#78350f",
        badgeBg: "rgba(120, 53, 15, 0.9)",
        icon: "🏹"
      }
    };

    return {
      lane,
      theme: laneThemes[lane] || laneThemes.mid,
      pressure: p,
      blueTotal,
      redTotal,
      blueMelee,
      blueCasters,
      blueCannon,
      blueSuper: blueSuperCount,
      redMelee,
      redCasters,
      redCannon,
      redSuper: redSuperCount,
      isCannonWave,
      blueHasBaron: !!state?.blue?.hasBaron,
      redHasBaron: !!state?.red?.hasBaron,
      status: waveStatus,
      description: waveDesc
    };
  }

  _initItemShopModal() {
    const modal = this.containerEl.querySelector("#item-shop-modal");
    if (!modal) return;

    this._activeShopCategory = "all";
    this._activeShopSearch = "";
    this._selectedShopItemId = 3031; // Default: Gume do Infinito

    const closeBtn = this.containerEl.querySelector("#shop-modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this._closeItemShopModal();
      });
    }

    // Fecha ao clicar no backdrop (fora do card)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this._closeItemShopModal();
      }
    });

    // Fecha com tecla ESC
    if (!this._shopEscBound) {
      this._shopEscBound = true;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          this._closeItemShopModal();
        }
      });
    }

    // Busca rápida com filtro em tempo real
    const searchInput = modal.querySelector("#shop-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this._activeShopSearch = (e.target.value || "").trim().toLowerCase();
        this._renderShopItemsGrid();
      });
    }

    // Clique em qualquer item nos inventários dos campeões abre o modal com o item inspecionado
    this.containerEl.addEventListener("click", (e) => {
      const slot = e.target.closest(".item-slot-icon.filled");
      if (slot && slot.dataset.itemId) {
        const itmId = Number(slot.dataset.itemId);
        if (itmId) {
          this._openItemShopModal(itmId);
        }
      }
    });
  }

  _openItemShopModal(selectedItemId = null) {
    const modal = this.containerEl.querySelector("#item-shop-modal");
    if (!modal) return;
    sound.playClick();

    if (selectedItemId && LOL_ITEMS[selectedItemId]) {
      this._selectedShopItemId = Number(selectedItemId);
    } else if (!this._selectedShopItemId || !LOL_ITEMS[this._selectedShopItemId]) {
      this._selectedShopItemId = 3031;
    }

    this._renderShopCategories();
    this._renderShopItemsGrid();
    this._renderShopItemInspector(this._selectedShopItemId);

    modal.classList.add("active");
  }

  _closeItemShopModal() {
    const modal = this.containerEl.querySelector("#item-shop-modal");
    if (modal) modal.classList.remove("active");
  }

  _renderShopCategories() {
    const tabsContainer = this.containerEl.querySelector("#shop-categories-tabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = ITEM_CATEGORIES.map(cat => {
      const isActive = (cat.id === this._activeShopCategory) ? "active" : "";
      return `<button type="button" class="shop-category-tab ${isActive}" data-cat-id="${cat.id}">
        <span class="shop-cat-icon">${cat.icon}</span>
        <span class="shop-cat-name">${cat.name}</span>
      </button>`;
    }).join("");

    tabsContainer.querySelectorAll(".shop-category-tab").forEach(tabBtn => {
      tabBtn.onclick = () => {
        sound.playClick();
        tabsContainer.querySelectorAll(".shop-category-tab").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active");
        this._activeShopCategory = tabBtn.dataset.catId;
        this._renderShopItemsGrid();
      };
    });
  }

  _renderShopItemsGrid() {
    const gridContainer = this.containerEl.querySelector("#shop-items-grid");
    if (!gridContainer) return;

    const allItems = Object.values(LOL_ITEMS);
    const catDef = ITEM_CATEGORIES.find(c => c.id === this._activeShopCategory) || ITEM_CATEGORIES[0];
    const search = this._activeShopSearch;

    let filtered = allItems;
    if (catDef.id !== "all" && catDef.filter) {
      filtered = filtered.filter(catDef.filter);
    }

    if (search) {
      filtered = filtered.filter(item => {
        const matchName = item.name.toLowerCase().includes(search);
        const matchDesc = (item.description || "").toLowerCase().includes(search);
        const matchClass = (item.class || "").toLowerCase().includes(search);
        const matchTier = (item.tier || "").toLowerCase().includes(search);
        const matchStats = Object.keys(item.stats || {}).some(k => k.toLowerCase().includes(search));
        return matchName || matchDesc || matchClass || matchTier || matchStats;
      });
    }

    // Ordena por importância de tier e preço decrescente
    const tierPriority = { LEGENDARY: 4, BOOTS: 3, EPIC: 2, BASIC: 1, STARTER: 0 };
    filtered.sort((a, b) => {
      const pDiff = (tierPriority[b.tier] || 0) - (tierPriority[a.tier] || 0);
      if (pDiff !== 0) return pDiff;
      return (b.cost || 0) - (a.cost || 0);
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="shop-empty-state">
          <span class="empty-icon">🔍</span>
          <p>Nenhum item encontrado para a busca ou filtro selecionado.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(item => {
      const isSelected = item.id === this._selectedShopItemId ? "selected" : "";
      const tierBadge = item.tier ? item.tier.toLowerCase() : "";
      return `
        <div class="shop-item-card ${isSelected} tier-${tierBadge}" data-item-id="${item.id}" tabindex="0" title="${item.name} (${(item.cost || 0).toLocaleString()}g)">
          <div class="shop-card-icon-wrap">
            <img class="shop-card-img" src="${getItemIconUrl(item.id)}" alt="${item.name}" loading="lazy" />
            <span class="shop-card-tier-badge">${item.tier || "ITEM"}</span>
          </div>
          <div class="shop-card-info">
            <div class="shop-card-name">${item.name}</div>
            <div class="shop-card-cost">💰 <span>${(item.cost || 0).toLocaleString()}</span>g</div>
          </div>
        </div>
      `;
    }).join("");

    gridContainer.querySelectorAll(".shop-item-card").forEach(card => {
      card.onclick = () => {
        sound.playClick();
        gridContainer.querySelectorAll(".shop-item-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this._selectedShopItemId = Number(card.dataset.itemId);
        this._renderShopItemInspector(this._selectedShopItemId);
      };
    });
  }

  _renderShopItemInspector(itemId) {
    const inspectorEl = this.containerEl.querySelector("#shop-item-inspector");
    if (!inspectorEl) return;

    const item = getItemById(itemId);
    if (!item) {
      inspectorEl.innerHTML = `<div class="inspector-placeholder">Selecione um item no catálogo para inspecionar seus atributos e árvore genealógica de receitas.</div>`;
      return;
    }

    const statLabels = {
      ad: { label: "Dano de Ataque (AD)", icon: "🗡️", unit: "" },
      ap: { label: "Poder de Habilidade (AP)", icon: "🔮", unit: "" },
      hp: { label: "Vida Máxima", icon: "❤️", unit: "" },
      armor: { label: "Armadura", icon: "🛡️", unit: "" },
      mr: { label: "Resistência Mágica", icon: "✨", unit: "" },
      haste: { label: "Aceleração de Habilidade", icon: "⏳", unit: "" },
      as: { label: "Velocidade de Ataque", icon: "⚡", unit: "%" },
      crit: { label: "Acerto Crítico", icon: "🎯", unit: "%" },
      ms: { label: "Velocidade de Movimento", icon: "👟", unit: "" },
      lethality: { label: "Letalidade", icon: "🗡️", unit: "" },
      omnivamp: { label: "Vampirismo / Cura", icon: "🩸", unit: "%" },
      healShield: { label: "Poder de Cura e Escudo", icon: "🌟", unit: "%" },
      mana: { label: "Mana Máxima", icon: "💧", unit: "" },
      healthRegen: { label: "Regeneração de Vida", icon: "💚", unit: "%" }
    };

    const statsHtml = item.stats && Object.keys(item.stats).length > 0
      ? Object.entries(item.stats).map(([k, v]) => {
          const sMeta = statLabels[k] || { label: k.toUpperCase(), icon: "✦", unit: "" };
          const valFormatted = sMeta.unit === "%" ? `+${Math.round(v * 100)}%` : `+${v}`;
          return `
            <div class="inspector-stat-pill">
              <span class="stat-icon">${sMeta.icon}</span>
              <span class="stat-name">${sMeta.label}:</span>
              <strong class="stat-val">${valFormatted}</strong>
            </div>
          `;
        }).join("")
      : `<span class="inspector-no-stats">Item Utilitário / Atributos Especiais</span>`;

    // Constrói em (Itens que usam este item como componente)
    const upgrades = Object.values(LOL_ITEMS).filter(it => it.from && it.from.includes(item.id));
    const upgradesHtml = upgrades.length > 0
      ? `
        <div class="inspector-section">
          <div class="inspector-section-title">⬆️ Constrói em (${upgrades.length} Itens):</div>
          <div class="inspector-upgrades-row">
            ${upgrades.map(up => `
              <div class="tree-node-item clickable" data-target-id="${up.id}" title="${up.name} (💰 ${(up.cost || 0).toLocaleString()}g)">
                <img src="${getItemIconUrl(up.id)}" alt="${up.name}" />
                <span class="tree-node-price">💰 ${up.cost}g</span>
                <span class="tree-node-name">${up.name}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `
      : "";

    // Árvore de receitas
    const recipeTreeHtml = this._renderRecipeTreeHtml(item);

    inspectorEl.innerHTML = `
      <div class="inspector-content">
        <!-- Header do Item Selecionado -->
        <div class="inspector-header">
          <div class="inspector-icon-container">
            <img class="inspector-icon" src="${getItemIconUrl(item.id)}" alt="${item.name}" />
            <span class="inspector-badge ${item.tier ? item.tier.toLowerCase() : ''}">${item.tier || 'ITEM'}</span>
          </div>
          <div class="inspector-header-info">
            <h3 class="inspector-title">${item.name}</h3>
            <div class="inspector-meta-row">
              <span class="inspector-class-pill">${item.class || 'Geral'}</span>
              <span class="inspector-cost-tag">💰 Preço Total: <strong>${(item.cost || 0).toLocaleString()}g</strong></span>
              ${item.combineCost !== undefined && item.from && item.from.length > 0 ? `<span class="inspector-combine-cost">Combinação: 💰 <strong>${item.combineCost.toLocaleString()}g</strong></span>` : ''}
            </div>
          </div>
        </div>

        <!-- Atributos -->
        <div class="inspector-section">
          <div class="inspector-section-title">📊 Atributos de Combate:</div>
          <div class="inspector-stats-grid">
            ${statsHtml}
          </div>
        </div>

        <!-- Descrição / Passiva -->
        <div class="inspector-section">
          <div class="inspector-section-title">📜 Descrição & Efeito Passivo:</div>
          <div class="inspector-desc-box">
            ${item.description || "Nenhuma descrição detalhada disponível."}
          </div>
        </div>

        <!-- Árvore de Receita Oficial -->
        <div class="inspector-section">
          <div class="inspector-section-title">🌿 Árvore de Receita & Montagem:</div>
          <div class="recipe-tree-wrapper">
            ${recipeTreeHtml}
          </div>
        </div>

        <!-- Upgrades Futuros -->
        ${upgradesHtml}
      </div>
    `;

    // Interatividade em todos os nós de receita ou upgrade
    inspectorEl.querySelectorAll(".tree-node-item.clickable").forEach(node => {
      node.onclick = () => {
        const tId = Number(node.dataset.targetId);
        if (tId && LOL_ITEMS[tId]) {
          sound.playClick();
          this._selectedShopItemId = tId;
          this._renderShopItemInspector(tId);
          const cardInGrid = this.containerEl.querySelector(`.shop-item-card[data-item-id="${tId}"]`);
          if (cardInGrid) {
            this.containerEl.querySelectorAll(".shop-item-card").forEach(c => c.classList.remove("selected"));
            cardInGrid.classList.add("selected");
            cardInGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      };
    });
  }

  _renderRecipeTreeHtml(item) {
    if (!item.from || item.from.length === 0) {
      return `
        <div class="recipe-tree-root-only">
          <div class="tree-node-item current-root">
            <img src="${getItemIconUrl(item.id)}" alt="${item.name}" />
            <span class="tree-node-price">💰 ${item.cost}g</span>
            <span class="tree-node-name">${item.name}</span>
          </div>
          <div class="recipe-tree-note">🌱 Item Básico ou Inicial — Não necessita de combinação prévia.</div>
        </div>
      `;
    }

    return `
      <div class="recipe-tree-tree">
        <!-- Nó Raiz (Item Fechado) -->
        <div class="recipe-tree-root-row">
          <div class="tree-node-item current-root">
            <img src="${getItemIconUrl(item.id)}" alt="${item.name}" />
            <span class="tree-node-price">💰 ${item.cost}g (Combinação: ${item.combineCost}g)</span>
            <span class="tree-node-name">${item.name}</span>
          </div>
        </div>

        <div class="recipe-tree-branch-lines"></div>

        <!-- Componentes Imediatos -->
        <div class="recipe-tree-children-row">
          ${item.from.map(cId => {
            const comp = getItemById(cId);
            if (!comp) return '';
            const subRecipe = (comp.from && comp.from.length > 0)
              ? `
                <div class="tree-sub-children">
                  <div class="sub-branch-line"></div>
                  <div class="tree-sub-children-row">
                    ${comp.from.map(scId => {
                      const sc = getItemById(scId);
                      if (!sc) return '';
                      return `
                        <div class="tree-node-item sub-node clickable" data-target-id="${sc.id}" title="${sc.name} (💰 ${(sc.cost || 0).toLocaleString()}g)">
                          <img src="${getItemIconUrl(sc.id)}" alt="${sc.name}" />
                          <span class="tree-node-price">💰 ${sc.cost}g</span>
                          <span class="tree-node-name">${sc.name}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `
              : '';

            return `
              <div class="recipe-tree-branch">
                <div class="tree-node-item clickable" data-target-id="${comp.id}" title="${comp.name} (💰 ${(comp.cost || 0).toLocaleString()}g)">
                  <img src="${getItemIconUrl(comp.id)}" alt="${comp.name}" />
                  <span class="tree-node-price">💰 ${comp.cost}g</span>
                  <span class="tree-node-name">${comp.name}</span>
                </div>
                ${subRecipe}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Exibe a legenda flutuante com a fala oficial do campeão escolhido
  _showVoiceQuoteToast(champ) {
    if (!champ) return;
    const toast = document.getElementById("champ-voice-toast");
    if (!toast) return;

    const img = toast.querySelector("#toast-champ-img");
    const name = toast.querySelector("#toast-champ-name");
    const role = toast.querySelector("#toast-champ-role");
    const quote = toast.querySelector("#toast-champ-quote");

    if (img) {
      img.src = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png`;
      img.alt = champ.name;
    }
    if (name) name.textContent = champ.name;
    if (role) role.textContent = `• ${champ.title || champ.role.toUpperCase()}`;
    if (quote) quote.textContent = `"${champ.quote || 'Ao combate!'}"`;

    toast.classList.add("active");

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("active");
    }, 4500);
  }

  _getDifficultyText(roundIdx) {
    const texts = [
      "Dificuldade: Normal",
      "Dificuldade: Competitiva (+4%)",
      "Dificuldade: Veterana (+9%)",
      "Decisão de Título ★ (+14%)"
    ];
    return texts[roundIdx] || texts[0];
  }

  _getDifficultyColor(roundIdx) {
    const colors = ["#4ade80", "#60a5fa", "#f59e0b", "#f43f5e"];
    return colors[roundIdx] || colors[0];
  }

  _getDifficultyBorder(roundIdx) {
    const borders = [
      "rgba(74, 222, 128, 0.4)",
      "rgba(96, 165, 250, 0.4)",
      "rgba(245, 158, 11, 0.4)",
      "rgba(244, 63, 94, 0.5)"
    ];
    return borders[roundIdx] || borders[0];
  }
}
