// Componente de Criação de Time e Draft de Campeões com Sistema de Pro Players do CBLOL
import { SUMMONER_ICONS } from "../data/icons.js";
import { CHAMPIONS, getChampionsByRole, getRandomTeamRoster, calculateTeamStats, getChampionById } from "../data/champions.js";
import { PRO_PLAYERS, getPlayersByRole, getPlayerById, getDefaultProRoster } from "../data/players.js";
import { sound } from "../engine/audio.js";

export class TeamCreatorView {
  constructor({
    containerEl,
    onTeamCreated,
    mode = "create",
    playerTeam = null,
    matchInfo = null,
    onConfirmDraft = null,
    onViewBracket = null
  }) {
    this.containerEl = containerEl;
    this.onTeamCreated = onTeamCreated;
    this.mode = mode;
    this.playerTeam = playerTeam;
    this.matchInfo = matchInfo;
    this.onConfirmDraft = onConfirmDraft;
    this.onViewBracket = onViewBracket;

    // Estado dos Pro Players da equipe
    if (this.playerTeam && this.playerTeam.proPlayers) {
      this.proPlayers = { ...this.playerTeam.proPlayers };
    } else {
      this.proPlayers = getDefaultProRoster(); // { top: "hidan", jungle: "cariok", mid: "tinowns", adc: "titan", support: "ceos" }
    }
    this.activeProRole = "top";
    this.proFilter = "all"; // "all" | "current" | "legend"

    // Estado da equipe do jogador
    if (this.mode === "draft" && this.playerTeam) {
      this.teamName = this.playerTeam.name || "Sua Equipe";
      this.selectedIcon = {
        url: this.playerTeam.iconUrl || SUMMONER_ICONS[0].url,
        id: this.playerTeam.iconId || SUMMONER_ICONS[0].id,
        name: this.playerTeam.name
      };
      this.roster = {
        top: (this.playerTeam.roster && this.playerTeam.roster.top) || "Aatrox",
        jungle: (this.playerTeam.roster && this.playerTeam.roster.jungle) || "LeeSin",
        mid: (this.playerTeam.roster && this.playerTeam.roster.mid) || "Ahri",
        adc: (this.playerTeam.roster && this.playerTeam.roster.adc) || "Jinx",
        support: (this.playerTeam.roster && this.playerTeam.roster.support) || "Thresh"
      };
    } else {
      this.teamName = "Ilha das Lendas";
      const defaultIcon = SUMMONER_ICONS.find(i => i.id === "idl") || SUMMONER_ICONS[0];
      this.selectedIcon = defaultIcon;
      this.iconCategory = "all";
      this.roster = {
        top: "Aatrox",
        jungle: "LeeSin",
        mid: "Ahri",
        adc: "Jinx",
        support: "Thresh"
      };
    }

    this.activeSlotRole = "top";
    this.selectedRoleFilter = "all";
    this.searchQuery = "";

    this.render();
  }

  render() {
    const isDraftMode = this.mode === "draft";

    // TELA 1: CRIAÇÃO DA ORGANIZAÇÃO & DREAM TEAM LIVRE (TELA INICIAL)
    if (!isDraftMode) {
      const activeRolePlayers = getPlayersByRole(this.activeProRole).filter(p => {
        if (this.proFilter === "current") return p.era === "current";
        if (this.proFilter === "legend") return p.era === "legend";
        return true;
      });

      const displayedIcons = SUMMONER_ICONS.filter(icon => {
        if (this.iconCategory === "all") return true;
        return icon.category === this.iconCategory;
      });

      this.containerEl.innerHTML = `
        <div class="team-setup-layout">
          <!-- Coluna Esquerda: Organização, Brasão & Informações da Campanha -->
          <div class="card-hextech">
            <div class="card-header-inner">
              <span class="card-title">🛡️ Sua Organização</span>
              <span style="font-size: 11px; color: var(--lol-blue-glow); font-weight: 800;">CBLOL 2026</span>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Nome da Equipe</label>
                <input type="text" id="team-name-input" class="lol-input" value="${this.teamName}" maxlength="24" placeholder="Ex: Ilha das Lendas, Trapaceiros..." />
                <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                  <button type="button" class="tag-quick-name" data-name="Ilha das Lendas" data-icon-id="idl">Ilha das Lendas</button>
                  <button type="button" class="tag-quick-name" data-name="paiN Gaming" data-icon-id="pain_2025">paiN</button>
                  <button type="button" class="tag-quick-name" data-name="LOUD" data-icon-id="loud_2025">LOUD</button>
                  <button type="button" class="tag-quick-name" data-name="RED Canids" data-icon-id="red_2025">RED</button>
                  <button type="button" class="tag-quick-name" data-name="Vivo Keyd Stars" data-icon-id="keyd_2025">Keyd</button>
                  <button type="button" class="tag-quick-name" data-name="FURIA" data-icon-id="furia_2025">FURIA</button>
                  <button type="button" class="tag-quick-name" data-name="KaBuM!" data-icon-id="kabum">KaBuM!</button>
                  <button type="button" class="tag-quick-name" data-name="INTZ" data-icon-id="intz">INTZ</button>
                  <button type="button" class="tag-quick-name" data-name="Los Grandes" data-icon-id="los_grandes">Los Grandes</button>
                  <button type="button" class="tag-quick-name" data-name="T1" data-icon-id="t1_champs">T1</button>
                </div>
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                  <label class="form-label" style="margin-bottom: 0;">Ícone Oficial da Equipe</label>
                  <span id="selected-icon-label" style="font-size: 11px; color: var(--lol-gold-1); font-weight: 700; max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${this.selectedIcon ? this.selectedIcon.name : ''}</span>
                </div>

                <!-- Filtros de Categorias de Ícones -->
                <div class="icon-filter-tabs">
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'all' ? 'active' : ''}" data-cat="all">Todos (${SUMMONER_ICONS.length})</button>
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'cblol' ? 'active' : ''}" data-cat="cblol">🇧🇷 CBLOL (${SUMMONER_ICONS.filter(i => i.category === 'cblol').length})</button>
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'mundial' ? 'active' : ''}" data-cat="mundial">🌍 Mundial (${SUMMONER_ICONS.filter(i => i.category === 'mundial').length})</button>
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'classicos' ? 'active' : ''}" data-cat="classicos">⭐ LoL (${SUMMONER_ICONS.filter(i => i.category === 'classicos').length})</button>
                </div>

                <div class="icon-selection-grid" id="icons-grid">
                  ${displayedIcons.map(icon => `
                    <div class="summoner-icon-item ${String(icon.id) === String(this.selectedIcon ? this.selectedIcon.id : '') ? 'selected' : ''}" data-icon-id="${icon.id}" title="${icon.name}">
                      <img src="${icon.url}" alt="${icon.name}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${icon.id}.jpg'" />
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Box de Contexto / Lore Compacto -->
              <div class="story-lore-box" style="margin-top: 14px;">
                <div class="story-badge">⚔️ A Conquista da Vaga</div>
                <h4 class="story-title" style="font-size: 14px; margin-bottom: 6px;">A Jornada do Desafiante</h4>
                <p class="story-paragraph" style="font-size: 12px; line-height: 1.45;">
                  Após dominar as classificatórias de acesso, a sua organização garantiu vaga direta nos <strong>Playoffs do CBLOL 2026</strong>! Contrate seus 5 atletas profissionais, defina as estratégias a cada rodada e supere as potências tradicionais até a Taça dos Campeões!
                </p>
              </div>

              <!-- Mini Prévia das Fases -->
              <div class="tournament-track-preview" style="margin-top: 12px;">
                <div class="track-step step-qualify">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">1. Qualify</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD1</span>
                </div>
                <div class="track-step step-quartas">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">2. Quartas</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD3</span>
                </div>
                <div class="track-step step-semis">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">3. Semis</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD5</span>
                </div>
                <div class="track-step step-final">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">4. Final ★</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD5</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Coluna Direita: Seleção do Dream Team (Pro Players do CBLOL) -->
          <div class="card-hextech">
            <div class="card-header-inner">
              <span class="card-title">⭐ Dream Team do CBLOL</span>
              <span style="font-size: 11px; color: var(--lol-gold-1); font-weight: 800;">5 PRO PLAYERS TITULARES</span>
            </div>
            <div class="card-body">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 12px; color: #cdbe91;">Contrate os 5 atletas profissionais que defenderão sua camisa:</span>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <button type="button" id="preset-legends-btn" class="tag-quick-name" style="background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.5); color: #fbbf24;" title="Mylon, Revolta, YoDa, brTT, Dioud">👑 Lendas Clássicas</button>
                  <button type="button" id="preset-current-btn" class="tag-quick-name" style="background: rgba(10, 200, 185, 0.2); border-color: rgba(10, 200, 185, 0.5); color: #38bdf8;" title="Hidan, Croc, Tinowns, TitaN, Ceos">🔥 Estrelas Atuais</button>
                  <button type="button" id="preset-random-btn" class="tag-quick-name">🎲 Aleatório</button>
                </div>
              </div>

              <!-- Os 5 Slots de Titulares da Equipe -->
              <div class="pro-roster-slots-grid">
                ${this._renderProSlotCard("top", "Topo")}
                ${this._renderProSlotCard("jungle", "Selva")}
                ${this._renderProSlotCard("mid", "Meio")}
                ${this._renderProSlotCard("adc", "Atirador")}
                ${this._renderProSlotCard("support", "Suporte")}
              </div>

              <!-- Painel do Catálogo da Rota Ativa -->
              <div style="background: rgba(1, 10, 19, 0.6); border: 1px solid var(--lol-gold-3); border-radius: 6px; padding: 14px; margin-top: 10px;">
                <div class="pro-player-filter-bar">
                  <span style="font-size: 12px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; letter-spacing: 0.5px;">
                    ${this._getRoleIcon(this.activeProRole)} Contratar para a Rota ${this._getRoleName(this.activeProRole)}:
                  </span>
                  <div style="display: flex; gap: 6px;">
                    <button type="button" class="tag-quick-name pro-filter-btn ${this.proFilter === 'all' ? 'selected' : ''}" data-filter="all" style="${this.proFilter === 'all' ? 'background: var(--lol-blue-glow); color: #010a13; font-weight: 800;' : ''}">Todos</button>
                    <button type="button" class="tag-quick-name pro-filter-btn ${this.proFilter === 'current' ? 'selected' : ''}" data-filter="current" style="${this.proFilter === 'current' ? 'background: var(--lol-blue-glow); color: #010a13; font-weight: 800;' : ''}">🔥 Atuais</button>
                    <button type="button" class="tag-quick-name pro-filter-btn ${this.proFilter === 'legend' ? 'selected' : ''}" data-filter="legend" style="${this.proFilter === 'legend' ? 'background: #fbbf24; color: #010a13; font-weight: 800;' : ''}">⭐ Lendas</button>
                  </div>
                </div>

                <!-- Grid de Jogadores da Rota -->
                <div class="pro-player-grid">
                  ${activeRolePlayers.map(p => {
                    const isSelected = this.proPlayers[this.activeProRole] === p.id;
                    return `
                      <div class="pro-player-card ${isSelected ? 'selected' : ''}" data-player-id="${p.id}">
                        <div class="pro-card-header">
                          <div class="pro-card-avatar" style="${isSelected ? 'border-color: var(--lol-blue-glow); box-shadow: 0 0 10px rgba(10, 200, 185, 0.4);' : ''}">
                            <img src="${p.avatar}" alt="${p.nick}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg'" />
                          </div>
                          <div class="pro-card-titles">
                            <span class="pro-card-nick">
                              ${p.nick}
                              ${p.era === 'legend' ? `<span class="pro-slot-legend-tag">⭐ LENDA</span>` : ''}
                            </span>
                            <span class="pro-card-team">${p.team}</span>
                          </div>
                        </div>

                        <div class="pro-card-trait">${p.traits}</div>

                        <div class="pro-card-signatures">
                          <span>Picks de Conforto:</span>
                          ${(p.signatureChampions || []).slice(0, 3).map(champId => {
                            const c = getChampionById(champId);
                            return `<span class="sig-chip">${c ? c.name : champId}</span>`;
                          }).join('')}
                        </div>

                        <div class="pro-card-quote">"${p.quote}"</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <div style="font-size: 11px; color: var(--lol-blue-glow); margin-top: 14px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">💡</span>
                <span>Seus atletas ganham <strong>+3 de Dano de Maestria</strong> em combate ao jogarem com seus <em>Picks de Conforto</em>! O Draft de Campeões ocorre antes de cada partida.</span>
              </div>

              <button id="submit-team-btn" class="lol-btn lol-btn-primary" style="width: 100%; margin-top: 16px; font-size: 14px; padding: 14px;">
                🏆 Confirmar Dream Team & Iniciar Playoffs ➔
              </button>
            </div>
          </div>
        </div>
      `;
      this._bindEvents();
      return;
    }

    // TELA 2: DRAFT & SELEÇÃO DE CAMPEÕES (ANTES DE CADA PARTIDA)
    const roundTitle = this.matchInfo ? (this.matchInfo.roundName || "Playoffs") : "Playoffs";
    const format = this.matchInfo ? (this.matchInfo.format || "MD3") : "MD3";
    const opp = this.matchInfo ? this.matchInfo.opponent : null;
    const oppName = opp ? opp.name : "Adversário";
    const oppColor = opp ? (opp.color || "#e84057") : "#e84057";
    const oppTag = opp ? (opp.tag || opp.logoText || "CBL") : "CBL";
    const seriesScore = this.matchInfo ? this.matchInfo.seriesScore : null;
    const gameNum = this.matchInfo ? (this.matchInfo.gameNumber || 1) : 1;

    this.containerEl.innerHTML = `
      <div class="builder-layout">
        <!-- Coluna Esquerda: Informações do Confronto e Stats -->
        <div class="card-hextech">
          <div class="card-header-inner">
            <span class="card-title">⚔️ Draft da Partida</span>
            <span style="font-size: 11px; color: var(--lol-blue-glow); font-weight: 800;">${roundTitle.toUpperCase()}</span>
          </div>
          <div class="card-body">
            <!-- Painel do Confronto Atual -->
            <div style="background: rgba(1, 10, 19, 0.7); border: 1px solid var(--lol-gold-3); border-radius: 6px; padding: 14px; margin-bottom: 16px;">
              <div style="font-size: 11px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; margin-bottom: 10px; text-align: center; letter-spacing: 1px;">
                ⚔️ ${roundTitle} (${format}) • Jogo ${gameNum}
              </div>
              <div style="display: flex; align-items: center; justify-content: space-around; gap: 10px;">
                <!-- Time do Jogador -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;">
                  <img src="${this.selectedIcon.url}" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--lol-blue-glow); box-shadow: 0 0 10px rgba(0, 180, 216, 0.4);" alt="${this.teamName}" />
                  <span style="font-size: 12px; font-weight: 800; color: #fff;">${this.teamName}</span>
                </div>
                <div style="font-size: 14px; font-weight: 900; color: var(--lol-gold-1); text-shadow: 0 0 8px rgba(200, 170, 110, 0.6);">VS</div>
                <!-- Adversário -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;">
                  <div style="width: 44px; height: 44px; border-radius: 50%; background: ${oppColor}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; color: #fff; border: 2px solid var(--lol-red-team); box-shadow: 0 0 10px rgba(232, 64, 87, 0.4);">
                    ${oppTag}
                  </div>
                  <span style="font-size: 12px; font-weight: 800; color: var(--lol-red-team);">${oppName}</span>
                </div>
              </div>
              ${seriesScore ? `
                <div style="margin-top: 12px; text-align: center; font-size: 12px; color: var(--lol-gold-2); background: rgba(0,0,0,0.4); padding: 5px; border-radius: 4px; border: 1px solid rgba(200, 170, 110, 0.2);">
                  Placar da Série: <strong style="color: var(--lol-blue-glow); font-size: 13px;">${seriesScore}</strong>
                </div>
              ` : ''}
            </div>

            <!-- Resumo de Estatísticas da Composição -->
            <div class="team-stats-box">
              <div style="font-size: 11px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; margin-bottom: 10px; display: flex; justify-content: space-between;">
                <span>Atributos da Composição</span>
                <span id="overall-tier" style="color: var(--lol-blue-glow);">Tier A</span>
              </div>

              <div id="stats-bars-container">
                <!-- Injetado dinamicamente -->
              </div>
            </div>

            <div style="margin-top: 22px; display: flex; flex-direction: column; gap: 10px;">
              <button id="random-team-btn" class="lol-btn lol-btn-secondary" style="width: 100%;">
                🎲 Sortear 5 Campeões Aleatórios
              </button>
              <button id="submit-draft-btn" class="lol-btn lol-btn-primary" style="width: 100%;">
                ⚔️ Confirmar Escalação e Batalhar! ➔
              </button>
              ${this.onViewBracket ? `
                <button id="view-bracket-btn" class="lol-btn" style="width: 100%; background: rgba(1, 10, 19, 0.8); border-color: var(--lol-gold-3); color: var(--lol-gold-2);">
                  🗺️ Ver Chaveamento dos Playoffs
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Escalação das 5 Rotas e Seletor de Campeões -->
        <div>
          <!-- Os 5 Slots de Rota com Pro Players -->
          <div class="roster-slots-grid">
            ${this._renderRoleSlot("top", "Topo")}
            ${this._renderRoleSlot("jungle", "Selva")}
            ${this._renderRoleSlot("mid", "Meio")}
            ${this._renderRoleSlot("adc", "Atirador")}
            ${this._renderRoleSlot("support", "Suporte")}
          </div>

          <!-- Gaveta / Pool de Campeões com Busca e Filtros -->
          <div class="pool-section">
            <div class="pool-toolbar">
              <div class="pool-tabs">
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'all' ? 'active' : ''}" data-filter="all">Todos</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'top' ? 'active' : ''}" data-filter="top">Top</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'jungle' ? 'active' : ''}" data-filter="jungle">Jg</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'mid' ? 'active' : ''}" data-filter="mid">Mid</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'adc' ? 'active' : ''}" data-filter="adc">ADC</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'support' ? 'active' : ''}" data-filter="support">Sup</button>
              </div>

              <input type="text" id="champ-search-input" class="lol-input" style="width: 220px;" placeholder="Buscar campeão..." value="${this.searchQuery}" />
            </div>

            <div class="champions-grid" id="champions-pool-grid">
              <!-- Injetado dinamicamente -->
            </div>
          </div>
        </div>
      </div>
    `;

    this._bindEvents();
    this._updateStatsUI();
    this._renderChampionsGrid();
  }

  _renderProSlotCard(roleKey, roleLabel) {
    const playerId = this.proPlayers[roleKey];
    const player = getPlayerById(playerId);
    const isActive = this.activeProRole === roleKey;

    return `
      <div class="pro-slot-card ${isActive ? 'active' : ''}" data-pro-role="${roleKey}">
        <span class="pro-slot-role-badge">${this._getRoleIcon(roleKey)} ${roleLabel}</span>
        <div class="pro-slot-avatar-wrap">
          <img src="${player ? player.avatar : ''}" alt="${player ? player.nick : 'Player'}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg'" />
        </div>
        <span class="pro-slot-nick">${player ? player.nick : 'Selecionar'}</span>
        ${player && player.era === 'legend' ? `<span class="pro-slot-legend-tag">⭐ LENDA</span>` : `<span style="font-size: 10px; color: var(--lol-gold-2);">${player ? player.team : ''}</span>`}
      </div>
    `;
  }

  _renderRoleSlot(roleKey, roleLabel) {
    const champId = this.roster[roleKey];
    const champ = getChampionById(champId);
    const isActive = this.activeSlotRole === roleKey;
    const proPlayerId = (this.playerTeam && this.playerTeam.proPlayers && this.playerTeam.proPlayers[roleKey]) || this.proPlayers[roleKey];
    const proPlayer = getPlayerById(proPlayerId);
    const isSignature = proPlayer && champ && proPlayer.signatureChampions && proPlayer.signatureChampions.includes(champ.id);

    return `
      <div class="roster-slot-card ${isActive ? 'active-slot' : ''}" data-role-slot="${roleKey}">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 2px;">
          <span class="role-badge">${this._getRoleIcon(roleKey)} ${roleLabel}</span>
          ${proPlayer ? `<span style="font-size: 10px; font-weight: 800; color: #fff; background: rgba(0,0,0,0.5); padding: 1px 6px; border-radius: 8px; border: 1px solid var(--lol-gold-3);">${proPlayer.nick}</span>` : ''}
        </div>
        <div class="slot-avatar-wrap" style="${isSignature ? 'border-color: #fbbf24; box-shadow: 0 0 12px rgba(251, 191, 36, 0.6);' : ''}">
          ${champ ? `
            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png" alt="${champ.name}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.id}.png'" />
          ` : `
            <div class="slot-empty-icon">?</div>
          `}
        </div>
        <span class="slot-champ-name">${champ ? champ.name : 'Selecionar'}</span>
        ${isSignature
          ? `<span style="font-size: 10px; color: #fbbf24; font-weight: 800; background: rgba(251, 191, 36, 0.15); padding: 1px 6px; border-radius: 6px; border: 1px solid rgba(251, 191, 36, 0.4); margin-top: 2px;">⭐ Pick de Conforto</span>`
          : `<span class="slot-champ-title">${champ ? champ.title : 'Clique para escolher'}</span>`
        }
      </div>
    `;
  }

  _getRoleIcon(role) {
    const icons = {
      top: "🛡️",
      jungle: "🌲",
      mid: "⚡",
      adc: "🏹",
      support: "✨"
    };
    return icons[role] || "⚔️";
  }

  _getRoleName(role) {
    const names = {
      top: "Topo",
      jungle: "Selva",
      mid: "Meio",
      adc: "Atirador",
      support: "Suporte"
    };
    return names[role] || role;
  }

  _renderChampionsGrid() {
    const grid = this.containerEl.querySelector("#champions-pool-grid");
    if (!grid) return;

    let filtered = CHAMPIONS;

    // Filtro por aba
    if (this.selectedRoleFilter !== "all") {
      filtered = filtered.filter(c => c.role === this.selectedRoleFilter);
    }

    // Filtro por busca
    if (this.searchQuery.trim() !== "") {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
    }

    const currentPickedIds = Object.values(this.roster);
    const activeProPlayerId = (this.playerTeam && this.playerTeam.proPlayers && this.playerTeam.proPlayers[this.activeSlotRole]) || this.proPlayers[this.activeSlotRole];
    const activeProPlayer = getPlayerById(activeProPlayerId);

    grid.innerHTML = filtered.map(c => {
      const isPicked = currentPickedIds.includes(c.id);
      const isSignature = activeProPlayer && activeProPlayer.signatureChampions && activeProPlayer.signatureChampions.includes(c.id);

      return `
        <div class="champion-card-item ${isPicked ? 'in-team' : ''} ${isSignature ? 'signature-card' : ''}" data-champ-id="${c.id}" title="${c.name} - ${c.title} (${c.signatureSkill})${isSignature ? ' • Pick de Conforto!' : ''}" style="${isSignature ? 'border: 2px solid #fbbf24; box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);' : ''}">
          <div class="champ-thumb">
            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${c.id}.png" alt="${c.name}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${c.id}.png'" />
          </div>
          <span class="champ-card-name">${isSignature ? '⭐ ' : ''}${c.name}</span>
          <span class="champ-card-role">${c.role.toUpperCase()}</span>
        </div>
      `;
    }).join("");

    // Eventos de clique nos cards de campeão
    grid.querySelectorAll(".champion-card-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-champ-id");
        if (Object.values(this.roster).includes(id) && this.roster[this.activeSlotRole] !== id) {
          return; // Já escalado em outra rota
        }
        this.roster[this.activeSlotRole] = id;
        const champ = getChampionById(id);
        if (champ && champ.key) {
          sound.playChampionVoice(champ.key);
          this._showVoiceQuoteToast(champ);
        } else {
          sound.playPick();
        }
        this.render();
      });
    });
  }

  _updateStatsUI() {
    const statsContainer = this.containerEl.querySelector("#stats-bars-container");
    if (!statsContainer) return;

    const stats = calculateTeamStats(this.roster);

    // Bônus visual de maestria caso algum pro player esteja com seu campeão assinatura
    let signatureBonus = 0;
    Object.keys(this.roster).forEach(r => {
      const pId = (this.playerTeam && this.playerTeam.proPlayers && this.playerTeam.proPlayers[r]) || this.proPlayers[r];
      const p = getPlayerById(pId);
      if (p && p.signatureChampions && p.signatureChampions.includes(this.roster[r])) {
        signatureBonus += 3;
      }
    });

    const statRows = [
      { label: "Dano de Combate", val: stats.damage + signatureBonus, max: 120, color: "var(--lol-red-team)" },
      { label: "Resistência & Tanque", val: stats.tank, max: 120, color: "#22c55e" },
      { label: "Pressão & Torres", val: stats.push, max: 120, color: "var(--lol-gold-1)" },
      { label: "Utilidade & Controle", val: stats.utility, max: 120, color: "var(--lol-blue-glow)" },
      { label: "Poder no Late Game", val: stats.scaling, max: 120, color: "#a855f7" }
    ];

    statsContainer.innerHTML = statRows.map(s => {
      const pct = Math.min(100, Math.round((s.val / s.max) * 100));
      return `
        <div class="stat-bar-row">
          <div class="stat-bar-header">
            <span>${s.label}</span>
            <span style="font-weight: 800; color: #fff;">${s.val}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill" style="width: ${pct}%; background: ${s.color};"></div>
          </div>
        </div>
      `;
    }).join("");

    const tierBadge = this.containerEl.querySelector("#overall-tier");
    if (tierBadge) {
      const avg = (stats.damage + stats.tank + stats.push + stats.utility + stats.scaling) / 5;
      if (avg >= 88) tierBadge.textContent = "Tier S+ (Campeão)";
      else if (avg >= 78) tierBadge.textContent = "Tier S";
      else if (avg >= 68) tierBadge.textContent = "Tier A";
      else tierBadge.textContent = "Tier B";
    }
  }

  _bindEvents() {
    // Input do Nome da Equipe
    const nameInput = this.containerEl.querySelector("#team-name-input");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        this.teamName = e.target.value;
      });
    }

    // Botões de Sugestão Rápida de Nome + Ícone Oficial correspondente
    this.containerEl.querySelectorAll(".tag-quick-name[data-name]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.teamName = btn.getAttribute("data-name");
        const iconId = btn.getAttribute("data-icon-id");
        if (iconId) {
          const matched = SUMMONER_ICONS.find(i => String(i.id) === String(iconId));
          if (matched) this.selectedIcon = matched;
        }
        sound.playClick();
        this.render();
      });
    });

    // Filtros de Categoria de Ícones
    this.containerEl.querySelectorAll(".icon-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.iconCategory = btn.getAttribute("data-cat") || "all";
        sound.playClick();
        this.render();
      });
    });

    // Clique em Ícone
    this.containerEl.querySelectorAll(".summoner-icon-item").forEach(el => {
      el.addEventListener("click", () => {
        const rawIconId = el.getAttribute("data-icon-id");
        const icon = SUMMONER_ICONS.find(i => String(i.id) === String(rawIconId));
        if (icon) {
          this.selectedIcon = icon;
          sound.playClick();
          this.containerEl.querySelectorAll(".summoner-icon-item").forEach(i => i.classList.remove("selected"));
          el.classList.add("selected");
          const lbl = this.containerEl.querySelector("#selected-icon-label");
          if (lbl) lbl.textContent = icon.name;
        }
      });
    });

    // Clique em Slot de Pro Player (Modo Criação)
    this.containerEl.querySelectorAll(".pro-slot-card").forEach(el => {
      el.addEventListener("click", () => {
        this.activeProRole = el.getAttribute("data-pro-role");
        sound.playClick();
        this.render();
      });
    });

    // Filtros de Pro Player (Todos / Atuais / Lendas)
    this.containerEl.querySelectorAll(".pro-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.proFilter = btn.getAttribute("data-filter");
        sound.playClick();
        this.render();
      });
    });

    // Clique em Card de Pro Player para Contratar
    this.containerEl.querySelectorAll(".pro-player-card").forEach(el => {
      el.addEventListener("click", () => {
        const pId = el.getAttribute("data-player-id");
        this.proPlayers[this.activeProRole] = pId;
        sound.playPick();
        this.render();
      });
    });

    // Preset Lendas Históricas (brTT, YoDa, Kami, Revolta, Mylon)
    const presetLegendsBtn = this.containerEl.querySelector("#preset-legends-btn");
    if (presetLegendsBtn) {
      presetLegendsBtn.addEventListener("click", () => {
        this.proPlayers = {
          top: "mylon",
          jungle: "revolta",
          mid: "yoda",
          adc: "brtt",
          support: "dioud"
        };
        sound.playPick();
        this.render();
      });
    }

    // Preset Estrelas Atuais (Hidan, Croc, Tinowns, TitaN, Ceos)
    const presetCurrentBtn = this.containerEl.querySelector("#preset-current-btn");
    if (presetCurrentBtn) {
      presetCurrentBtn.addEventListener("click", () => {
        this.proPlayers = {
          top: "hidan",
          jungle: "croc",
          mid: "tinowns",
          adc: "titan",
          support: "ceos"
        };
        sound.playPick();
        this.render();
      });
    }

    // Preset Aleatório
    const presetRandomBtn = this.containerEl.querySelector("#preset-random-btn");
    if (presetRandomBtn) {
      presetRandomBtn.addEventListener("click", () => {
        const roles = ["top", "jungle", "mid", "adc", "support"];
        roles.forEach(r => {
          const players = getPlayersByRole(r);
          const chosen = players[Math.floor(Math.random() * players.length)];
          if (chosen) this.proPlayers[r] = chosen.id;
        });
        sound.playPick();
        this.render();
      });
    }

    // Botão Concluir Fundação da Organização (Modo Criação Inicial)
    const submitBtn = this.containerEl.querySelector("#submit-team-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        sound.playClick();
        const baseStats = calculateTeamStats(this.roster);

        const teamObj = {
          name: this.teamName.trim() || "Minha Equipe",
          iconUrl: this.selectedIcon.url,
          iconId: this.selectedIcon.id,
          proPlayers: { ...this.proPlayers },
          roster: { ...this.roster },
          stats: baseStats,
          hasDraftedInitialRoster: false,
          upgrades: []
        };
        this.onTeamCreated(teamObj);
      });
    }

    // Clique em Slot de Rota (Modo Draft)
    this.containerEl.querySelectorAll(".roster-slot-card").forEach(el => {
      el.addEventListener("click", () => {
        const role = el.getAttribute("data-role-slot");
        this.activeSlotRole = role;
        this.selectedRoleFilter = role; // Sugere os campeões da rota

        const champId = this.roster[role];
        const champ = getChampionById(champId);
        if (champ && champ.key) {
          sound.playChampionVoice(champ.key);
          this._showVoiceQuoteToast(champ);
        } else {
          sound.playClick();
        }
        this.render();
      });
    });

    // Filtros de Rota (Modo Draft)
    this.containerEl.querySelectorAll(".pool-tab-btn").forEach(el => {
      el.addEventListener("click", () => {
        this.selectedRoleFilter = el.getAttribute("data-filter");
        sound.playClick();
        this.render();
      });
    });

    // Barra de Busca (Modo Draft)
    const searchInput = this.containerEl.querySelector("#champ-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this._renderChampionsGrid();
      });
    }

    // Botão Sortear Aleatório (Modo Draft)
    const randomBtn = this.containerEl.querySelector("#random-team-btn");
    if (randomBtn) {
      randomBtn.addEventListener("click", () => {
        this.roster = getRandomTeamRoster();
        const activeChamp = getChampionById(this.roster[this.activeSlotRole]);
        if (activeChamp && activeChamp.key) {
          sound.playChampionVoice(activeChamp.key);
          this._showVoiceQuoteToast(activeChamp);
        } else {
          sound.playPick();
        }
        this.render();
      });
    }

    // Botão Confirmar Escalação (Modo Draft entre Partidas)
    const submitDraftBtn = this.containerEl.querySelector("#submit-draft-btn");
    if (submitDraftBtn) {
      submitDraftBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.playerTeam) {
          this.playerTeam.roster = { ...this.roster };
          this.playerTeam.proPlayers = { ...this.proPlayers };
          this.playerTeam.hasDraftedInitialRoster = true;
          this.playerTeam.stats = calculateTeamStats(this.roster, this.playerTeam.upgrades || []);
        }
        if (this.onConfirmDraft) {
          this.onConfirmDraft(this.roster);
        }
      });
    }

    // Botão Ver Chaveamento (Modo Draft)
    const viewBracketBtn = this.containerEl.querySelector("#view-bracket-btn");
    if (viewBracketBtn) {
      viewBracketBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.playerTeam) {
          this.playerTeam.roster = { ...this.roster };
          this.playerTeam.proPlayers = { ...this.proPlayers };
          this.playerTeam.stats = calculateTeamStats(this.roster, this.playerTeam.upgrades || []);
        }
        if (this.onViewBracket) {
          this.onViewBracket();
        }
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
}
