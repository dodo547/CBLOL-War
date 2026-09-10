// Componente de Visualização do Chaveamento do CBLOL
import { sound } from "../engine/audio.js";
import { getChampionById } from "../data/champions.js";
import { getPlayerById } from "../data/players.js";

export class BracketView {
  constructor({ containerEl, tournament, onStartMatch, onOpenDraft }) {
    this.containerEl = containerEl;
    this.tournament = tournament;
    this.onStartMatch = onStartMatch;
    this.onOpenDraft = onOpenDraft || onStartMatch;

    this.render();
  }

  update(tournament) {
    this.tournament = tournament;
    this.render();
  }

  render() {
    const currentMatch = this.tournament.getCurrentPlayerMatch();
    const opponent = this.tournament.getOpponentForCurrentRound();
    const roundName = this.tournament.roundNames[this.tournament.currentRound] || "Fase Final";
    const format = this.tournament.getCurrentRoundFormat();

    const isTeamA = currentMatch && currentMatch.teamA && currentMatch.teamA.isPlayer;
    const pScore = currentMatch ? (isTeamA ? currentMatch.scoreA : currentMatch.scoreB) : 0;
    const oppScore = currentMatch ? (isTeamA ? currentMatch.scoreB : currentMatch.scoreA) : 0;
    const isMidSeries = currentMatch && (currentMatch.scoreA > 0 || currentMatch.scoreB > 0);
    const hasDrafted = this.tournament.playerTeam && this.tournament.playerTeam.hasDraftedInitialRoster;
    const isFirstGame = this.tournament.currentRound === 0 && !hasDrafted;

    this.containerEl.innerHTML = `
      <div style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 26px; font-weight: 900; color: #fff; letter-spacing: 2px; text-transform: uppercase;">
            Playoffs do CBLOL
          </h2>
          <p style="color: var(--lol-gold-2); font-size: 14px; margin-top: 4px;">
            Fase Atual: <strong style="color: #fff;">${roundName}</strong> • Formato: <span style="color: var(--lol-blue-glow); font-weight: 700;">${format}</span>
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          ${currentMatch && !this.tournament.isOver ? `
            <button id="start-match-btn" class="lol-btn lol-btn-primary">
              ${isMidSeries
                ? `⚔️ Escalar Campeões & Jogar Jogo ${nextGameNum} (${pScore} - ${oppScore}) vs ${opponent ? opponent.name : 'Adversário'}`
                : (isFirstGame
                    ? `⚔️ Escalar 5 Campeões & Batalhar no Qualify (MD1) vs ${opponent ? opponent.name : 'Adversário'}`
                    : `⚔️ Escalar 5 Campeões & Jogar ${roundName} (${format}) vs ${opponent ? opponent.name : 'Adversário'}`
                  )
              }
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Barra de Escalação Atual dos 5 Campeões -->
      <div style="margin-bottom: 24px; background: linear-gradient(90deg, rgba(9, 20, 40, 0.95) 0%, rgba(5, 12, 24, 0.95) 100%); border: 1px solid var(--lol-gold-3); border-left: 4px solid var(--lol-gold-1); border-radius: 6px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
        <div>
          <div style="font-size: 11px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
            ${hasDrafted ? '🛡️ Sua Escalação Atual de 5 Campeões:' : '🛡️ Escalação da sua Organização:'}
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${this._renderRosterMiniSlots()}
          </div>
        </div>
        <div>
          <button id="change-roster-btn" class="lol-btn lol-btn-secondary" style="font-size: 12px; padding: 7px 14px;">
            ${hasDrafted ? '🔄 Escolher Novos 5 Campeões' : '📋 Abrir Draft de Campeões'}
          </button>
        </div>
      </div>

      <!-- Chaveamento Eliminatório Completo em 4 Colunas -->
      <div class="bracket-wrapper">
        <!-- Rodada 0: Qualify -->
        <div class="bracket-column">
          <div class="bracket-round-title">Qualify (MD1)</div>
          <div style="text-align: center; font-size: 11px; color: #4ade80; font-weight: 700; margin-bottom: 8px;">🟢 Dificuldade: Normal</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round0.map(m => this._renderMatchCard(m, 0)).join('')}
          </div>
        </div>

        <!-- Rodada 1: Quartas de Final -->
        <div class="bracket-column">
          <div class="bracket-round-title">Quartas de Final (MD3)</div>
          <div style="text-align: center; font-size: 11px; color: #60a5fa; font-weight: 700; margin-bottom: 8px;">🔵 Competitivo (+4%)</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round1.map(m => this._renderMatchCard(m, 1)).join('')}
          </div>
        </div>

        <!-- Rodada 2: Semifinais -->
        <div class="bracket-column">
          <div class="bracket-round-title">Semifinais (MD5)</div>
          <div style="text-align: center; font-size: 11px; color: #f59e0b; font-weight: 700; margin-bottom: 8px;">🟠 Veterano (+9%)</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round2.map(m => this._renderMatchCard(m, 2)).join('')}
          </div>
        </div>

        <!-- Rodada 3: Grande Final -->
        <div class="bracket-column">
          <div class="bracket-round-title">🏆 Grande Final (MD5)</div>
          <div style="text-align: center; font-size: 11px; color: #f43f5e; font-weight: 700; margin-bottom: 8px;">🔴 Decisão de Título ★ (+14%)</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round3.map(m => this._renderMatchCard(m, 3)).join('')}
          </div>
        </div>
      </div>

      <!-- Lista de Upgrades Ativos da Equipe -->
      ${this._renderUpgradesBar()}
    `;

    this._bindEvents();
  }

  _renderMatchCard(match, roundIdx) {
    const isPlayerInMatch = (match.teamA && match.teamA.isPlayer) || (match.teamB && match.teamB.isPlayer);
    const isCurrentActive = isPlayerInMatch && this.tournament.currentRound === roundIdx && !match.winner;
    const isLiveParallel = !isPlayerInMatch && this.tournament.currentRound === roundIdx && !match.winner && (match.scoreA > 0 || match.scoreB > 0);

    let badgeHtml = '';
    if (match.winner) {
      badgeHtml = `<div class="match-status-badge finished">Vencedor: ${match.winner.name}</div>`;
    } else if (isCurrentActive) {
      badgeHtml = `<div class="match-status-badge player-turn">⚔️ Seu Confronto</div>`;
    } else if (isLiveParallel) {
      badgeHtml = `<div class="match-status-badge live-parallel">🔴 Ao Vivo (${match.scoreA} - ${match.scoreB})</div>`;
    }

    return `
      <div class="bracket-match-card ${isPlayerInMatch ? 'is-player-match' : ''} ${isCurrentActive ? 'active-match' : ''}">
        ${badgeHtml}
        ${this._renderTeamRow(match.teamA, match.winner, match.scoreA)}
        ${this._renderTeamRow(match.teamB, match.winner, match.scoreB)}
      </div>
    `;
  }

  _renderTeamRow(team, winner, score) {
    if (!team) {
      return `
        <div class="bracket-team-row" style="opacity: 0.4;">
          <div class="bracket-team-info">
            <div class="team-emblem-mini" style="background: #222;">?</div>
            <span class="team-name">A Definir</span>
          </div>
          <span class="team-score">-</span>
        </div>
      `;
    }

    const isWinner = winner && winner.name === team.name;

    return `
      <div class="bracket-team-row ${isWinner ? 'winner' : ''}">
        <div class="bracket-team-info">
          <div class="team-emblem-mini" style="background: ${team.color || '#091428'};">
            ${team.iconUrl ? `
              <img src="${team.iconUrl}" alt="${team.name}" />
            ` : `
              <span>${team.logoText || team.tag || team.name.substring(0, 3)}</span>
            `}
          </div>
          <span class="team-name" style="${team.isPlayer ? 'color: var(--lol-blue-glow); font-weight: 900;' : ''}">
            ${team.name} ${team.isPlayer ? '(Você)' : ''}
          </span>
        </div>
        <span class="team-score">${score}</span>
      </div>
    `;
  }

  _renderUpgradesBar() {
    const upgrades = this.tournament.playerTeam.upgrades || [];
    if (upgrades.length === 0) return '';

    return `
      <div style="margin-top: 28px; background: rgba(1, 10, 19, 0.7); border: 1px solid var(--lol-gold-3); border-radius: 6px; padding: 14px 20px;">
        <span style="font-size: 12px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; letter-spacing: 1px;">
          ⚡ Aprimoramentos Hextech Acumulados da Run:
        </span>
        <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
          ${upgrades.map(u => `
            <div style="background: rgba(10, 20, 40, 0.9); border: 1px solid var(--lol-blue-glow); border-radius: 4px; padding: 6px 12px; font-size: 12px; color: #fff; display: flex; align-items: center; gap: 8px;">
              <span>${u.icon}</span>
              <strong>${u.name}</strong>
              <span style="color: var(--lol-gold-2); font-size: 11px;">(${u.description})</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  _renderRosterMiniSlots() {
    const roles = [
      { key: "top", label: "Top", icon: "🛡️" },
      { key: "jungle", label: "Jg", icon: "🌲" },
      { key: "mid", label: "Mid", icon: "⚡" },
      { key: "adc", label: "ADC", icon: "🏹" },
      { key: "support", label: "Sup", icon: "✨" }
    ];
    const proPlayers = (this.tournament.playerTeam && this.tournament.playerTeam.proPlayers) || {};
    const roster = (this.tournament.playerTeam && this.tournament.playerTeam.roster) || {};
    const hasDrafted = this.tournament.playerTeam && this.tournament.playerTeam.hasDraftedInitialRoster;

    return roles.map(r => {
      const playerId = proPlayers[r.key];
      const player = typeof getPlayerById === "function" ? getPlayerById(playerId) : null;
      const champId = roster[r.key];
      const champ = typeof getChampionById === "function" ? getChampionById(champId) : null;
      const nick = player ? player.nick : r.label;
      const champName = champ ? champ.name : null;
      const avatarUrl = player ? player.avatar : (champ ? `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png` : '');

      return `
        <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.5); padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(200, 170, 110, 0.3);">
          ${avatarUrl ? `
            <img src="${avatarUrl}" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--lol-gold-2);" alt="${nick}" onerror="this.style.display='none'" />
          ` : ''}
          <span style="font-size: 11px; color: var(--lol-gold-2); font-weight: 800;">${r.label}:</span>
          <strong style="font-size: 12px; color: #fff;">${nick}</strong>
          ${hasDrafted && champName ? `<span style="font-size: 11px; color: var(--lol-blue-glow); font-weight: 700;">(${champName})</span>` : ''}
        </div>
      `;
    }).join('');
  }

  _bindEvents() {
    const btn = this.containerEl.querySelector("#start-match-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.onStartMatch();
      });
    }

    const changeRosterBtn = this.containerEl.querySelector("#change-roster-btn");
    if (changeRosterBtn) {
      changeRosterBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.onOpenDraft) {
          this.onOpenDraft();
        } else {
          this.onStartMatch();
        }
      });
    }
  }
}
