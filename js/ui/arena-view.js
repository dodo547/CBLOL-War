// Componente da Arena de Batalha: Simulação de Summoner's Rift com Torres, Inibidores, Nexus e Controle Tático
import { sound } from "../engine/audio.js";
import { getChampionById } from "../data/champions.js";
import { getItemIconUrl } from "../data/items.js";

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
              <button class="tactic-btn ${this.sim.playerTactics === 'aggressive' ? 'active' : ''}" data-tactic="aggressive" title="Agressiva: força lutas e emboscadas (+Dano, -Defesa)">⚔️ Agressiva</button>
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

        <!-- CAMPO DE BATALHA COM AS ESTRUTURAS (SUMMONER'S RIFT) -->
        <div class="battlefield-arena">
          <div class="lanes-visualizer">
            <!-- Lado Azul: Nexus -> Torres Nexus -> Inibidor -> T3 -> T2 -> T1 -->
            <div class="team-lane-half blue-side" id="blue-lane-structures">
              ${this._renderStructuresGroup(state.blue.structures, "blue")}
            </div>

            <!-- Rio Central -->
            <div class="river-clash-zone">
              <div class="river-separator"></div>
              <div class="river-badge">RIO DO RIFT</div>
            </div>

            <!-- Lado Vermelho: T1 -> T2 -> T3 -> Inibidor -> Torres Nexus -> Nexus -->
            <div class="team-lane-half red-side" id="red-lane-structures">
              ${this._renderStructuresGroup(state.red.structures, "red")}
            </div>
          </div>
        </div>

        <!-- PAINEL CENTRAL DE TRANSMISSÃO ESPORTS: ESCALAÇÃO AZUL | KILLFEED AO VIVO | ESCALAÇÃO VERMELHA -->
        <div class="arena-broadcast-center">
          <!-- Coluna 1: Escalação Azul -->
          <div class="lineup-box blue-side-panel">
            <div class="lineup-title blue">
              <span>🔵 Escalação ${state.blue.name}</span>
              <span class="lineup-kda-header">K / D / A</span>
            </div>
            <div id="blue-roster-status" class="roster-status-list">
              ${this._renderRosterRows(state.blue.roster, "blue")}
            </div>
          </div>

          <!-- Coluna 2: Central Killfeed & Broadcast Hub (Super Visível) -->
          <div class="broadcast-killfeed-panel">
            <div class="broadcast-feed-header">
              <div class="broadcast-live-indicator">
                <span class="live-dot-pulse"></span>
                <span class="live-text">AO VIVO</span>
              </div>
              <div class="broadcast-feed-title">⚔️ ABATES & JOGADAS</div>
              <div class="broadcast-feed-count" id="broadcast-feed-count">0 abates</div>
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

          <!-- Coluna 3: Escalação Vermelha -->
          <div class="lineup-box red-side-panel">
            <div class="lineup-title red">
              <span>🔴 Escalação ${state.red.name}</span>
              <span class="lineup-kda-header">K / D / A</span>
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

  _renderChampItems(items) {
    const slots = [0, 1, 2, 3];
    return `
      <div class="champ-items-tray">
        ${slots.map(idx => {
          const itm = items && items[idx];
          if (itm) {
            return `<div class="item-slot-icon filled" title="${itm.name} (+${itm.power} Poder)"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
          }
          return `<div class="item-slot-icon empty" title="Espaço vazio de item"></div>`;
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
              </div>
              <div class="champ-role-tag">${role.toUpperCase()}</div>
            </div>
          </div>
          ${this._renderChampItems(m.items)}
          <div class="champ-kda" id="kda-${side}-${role}">
            ${m.kills} / ${m.deaths} / ${m.assists}
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
    this._updateRosterUI(state.blue.roster, "blue");
    this._updateRosterUI(state.red.roster, "red");
  }

  _updateRosterUI(rosterState, side) {
    const roles = ["top", "jungle", "mid", "adc", "support"];
    roles.forEach(role => {
      const m = rosterState[role];
      if (!m) return;
      const row = this.containerEl.querySelector(`#champ-row-${side}-${role}`);
      if (row) {
        if (!m.alive) row.classList.add("dead");
        else row.classList.remove("dead");

        // Atualiza bandeja de itens (apenas quando houver alteração para evitar DOM thrashing)
        const tray = row.querySelector(".champ-items-tray");
        if (tray && m.items) {
          const itemKey = m.items.map(it => it ? it.id : '0').join(',');
          if (tray._renderedKey !== itemKey) {
            tray._renderedKey = itemKey;
            const slots = [0, 1, 2, 3];
            tray.innerHTML = slots.map(idx => {
              const itm = m.items[idx];
              if (itm) {
                return `<div class="item-slot-icon filled" title="${itm.name} (+${itm.power} Poder)"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
              }
              return `<div class="item-slot-icon empty" title="Espaço vazio de item"></div>`;
            }).join('');
          }
        }
      }
      const kdaEl = this.containerEl.querySelector(`#kda-${side}-${role}`);
      if (kdaEl) {
        kdaEl.textContent = `${m.kills} / ${m.deaths} / ${m.assists}`;
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
                <span class="stats-pill cs-pill">🌾 ${c.cs || 0} CS</span>
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
              <div class="scouting-intel-item">
                <span class="scouting-label">Recomendação da Comissão:</span>
                <span class="scouting-value">${decisionData.scouting.recommendation}</span>
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
        ${scoutingHtml}
        <div class="decision-advice-pill">${advice}</div>
      `;
    }

    if (container) {
      container.innerHTML = decisionData.options.map(opt => `
        <div class="decision-choice-card complexity-${opt.complexity || 'tactical'}" data-choice-id="${opt.id}">
          <div class="choice-card-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="choice-card-icon">${opt.icon || '⚔️'}</span>
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
