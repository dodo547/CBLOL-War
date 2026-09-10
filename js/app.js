// Controlador Principal do CBLOL Chronicles: Batalha pelo Nexus
import { sound } from "./engine/audio.js";
import { TournamentManager } from "./engine/tournament.js";
import { MatchSimulator } from "./engine/match-sim.js";
import { TeamCreatorView } from "./ui/team-creator.js";
import { BracketView } from "./ui/bracket-view.js";
import { ArenaView } from "./ui/arena-view.js";
import { getRandomUpgrades } from "./data/upgrades.js";
import { calculateTeamStats } from "./data/champions.js";

class AppController {
  constructor() {
    this.playerTeam = null;
    this.tournament = null;
    this.currentSimulator = null;
    this.currentArenaView = null;
    this.currentBracketView = null;

    this.views = {
      builder: document.getElementById("view-builder"),
      bracket: document.getElementById("view-bracket"),
      arena: document.getElementById("view-arena"),
      upgrades: document.getElementById("view-upgrades"),
      champion: document.getElementById("view-champion"),
      eliminated: document.getElementById("view-eliminated")
    };

    this.initHeaderControls();
    this.showView("builder");
    this.initTeamCreator();
  }

  showView(viewKey) {
    if (viewKey !== "champion" && typeof confetti !== "undefined") {
      confetti.stop();
    }
    Object.keys(this.views).forEach(key => {
      const el = this.views[key];
      if (el) {
        if (key === viewKey) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  initHeaderControls() {
    const muteBtn = document.getElementById("mute-btn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        const isMuted = sound.toggleMute();
        muteBtn.innerHTML = isMuted ? "🔇 Som: Desligado" : "🔊 Som: Ligado";
      });
    }

    const resetBtn = document.getElementById("new-run-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Deseja iniciar uma nova campanha e resetar a run atual?")) {
          sound.playClick();
          this.startNewRun();
        }
      });
    }
  }

  initTeamCreator() {
    new TeamCreatorView({
      containerEl: this.views.builder,
      mode: "create",
      onTeamCreated: (teamObj) => {
        this.playerTeam = teamObj;
        this.tournament = new TournamentManager(this.playerTeam);
        this.showBracketView();
      }
    });
  }

  showBracketView() {
    this.showView("bracket");
    if (!this.currentBracketView) {
      this.currentBracketView = new BracketView({
        containerEl: this.views.bracket,
        tournament: this.tournament,
        onStartMatch: () => this.openMatchDraft(),
        onOpenDraft: () => this.openMatchDraft()
      });
    } else {
      this.currentBracketView.update(this.tournament);
    }
  }

  openMatchDraft() {
    if (!this.tournament || this.tournament.isOver) {
      this.showBracketView();
      return;
    }

    const currentMatch = this.tournament.getCurrentPlayerMatch();
    const opponent = this.tournament.getOpponentForCurrentRound();
    const roundName = this.tournament.roundNames[this.tournament.currentRound] || "Playoffs";
    const format = this.tournament.getCurrentRoundFormat();

    const isTeamA = currentMatch && currentMatch.teamA && currentMatch.teamA.isPlayer;
    const pScore = currentMatch ? (isTeamA ? currentMatch.scoreA : currentMatch.scoreB) : 0;
    const oppScore = currentMatch ? (isTeamA ? currentMatch.scoreB : currentMatch.scoreA) : 0;
    const nextGameNum = currentMatch ? (currentMatch.scoreA + currentMatch.scoreB + 1) : 1;
    const lastGame = currentMatch && currentMatch.games && currentMatch.games.length > 0 ? currentMatch.games[currentMatch.games.length - 1] : null;
    const opponentLostPrev = lastGame ? lastGame.won : false;

    if (this.tournament && opponent) {
      this.tournament.adaptOpponentRoster(opponent, nextGameNum, opponentLostPrev);
    }

    const matchInfo = {
      roundName,
      format,
      opponent,
      seriesScore: format !== "MD1" ? `${pScore} - ${oppScore}` : null,
      gameNumber: nextGameNum
    };

    this.showView("builder");

    new TeamCreatorView({
      containerEl: this.views.builder,
      mode: "draft",
      playerTeam: this.playerTeam,
      matchInfo,
      onConfirmDraft: (updatedRoster) => {
        this.playerTeam.roster = { ...updatedRoster };
        this.playerTeam.stats = calculateTeamStats(this.playerTeam.roster, this.playerTeam.upgrades || []);
        if (this.tournament) {
          this.tournament.playerTeam.roster = this.playerTeam.roster;
          this.tournament.playerTeam.stats = this.playerTeam.stats;
          const curMatch = this.tournament.getCurrentPlayerMatch();
          if (curMatch) {
            if (curMatch.teamA && curMatch.teamA.isPlayer) {
              curMatch.teamA.roster = this.playerTeam.roster;
              curMatch.teamA.stats = this.playerTeam.stats;
            } else if (curMatch.teamB && curMatch.teamB.isPlayer) {
              curMatch.teamB.roster = this.playerTeam.roster;
              curMatch.teamB.stats = this.playerTeam.stats;
            }
          }
        }
        this.startMatch();
      },
      onViewBracket: () => {
        this.showBracketView();
      }
    });
  }

  startMatch() {
    try {
      const opponent = this.tournament.getOpponentForCurrentRound();
      if (!opponent) {
        alert("Nenhum adversário encontrado para esta rodada!");
        return;
      }

      const currentMatch = this.tournament.getCurrentPlayerMatch();
      const nextGameNum = currentMatch ? (currentMatch.scoreA + currentMatch.scoreB + 1) : 1;
      const lastGame = currentMatch && currentMatch.games && currentMatch.games.length > 0 ? currentMatch.games[currentMatch.games.length - 1] : null;
      const opponentLostPrev = lastGame ? lastGame.won : false;
      this.tournament.adaptOpponentRoster(opponent, nextGameNum, opponentLostPrev);

      this.showView("arena");

      // Instancia o simulador da partida com a rodada correspondente (Roguelike)
      this.currentSimulator = new MatchSimulator({
        blueTeam: this.playerTeam,
        redTeam: opponent,
        roundIndex: this.tournament.currentRound || 0,
        speed: 1,
        onTick: (state) => {
          if (this.currentArenaView) this.currentArenaView.updateTick(state);
        },
        onEvent: (evt) => {
          if (this.currentArenaView) this.currentArenaView.handleEvent(evt);
        },
        onMultikill: (data) => {
          if (this.currentArenaView) this.currentArenaView.handleMultikill(data);
        },
        onAce: (data) => {
          if (this.currentArenaView) this.currentArenaView.handleAce(data);
        },
        onItemPurchased: (data) => {
          if (this.currentArenaView) this.currentArenaView.handleItemPurchased(data);
        },
        onStructureHit: (teamSide, structId, curHp, maxHp) => {
          if (this.currentArenaView) this.currentArenaView.handleStructureHit(teamSide, structId, curHp, maxHp);
        },
        onStructureDestroyed: (teamSide, structId) => {
          if (this.currentArenaView) this.currentArenaView.handleStructureDestroyed(teamSide, structId);
        },
        onFinish: (result, summary) => {
          const won = result === "win";
          const seriesResult = this.tournament.recordPlayerGameResult(won, summary);
          summary.seriesResult = seriesResult;
          summary.tournament = this.tournament;
          if (this.currentArenaView) this.currentArenaView.handleFinish(result, summary);
        },
        onTacticalDecision: (decisionData) => {
          if (this.currentArenaView) this.currentArenaView.handleTacticalDecision(decisionData);
        }
      });

      // Instancia a view da arena
      this.currentArenaView = new ArenaView({
        containerEl: this.views.arena,
        simulator: this.currentSimulator,
        onMatchFinished: (result, summary) => {
          this.handleMatchComplete(result, summary);
        }
      });

      // Dá partida no motor do jogo
      this.currentSimulator.start();
    } catch (err) {
      console.error("Erro ao iniciar partida:", err);
      alert("Erro ao carregar a partida: " + err.message);
    }
  }

  handleMatchComplete(result, summary) {
    const sRes = summary.seriesResult || this.tournament.recordPlayerGameResult(result === "win", summary);

    if (!sRes.seriesOver) {
      // Série segue aberta (ex: 1-0 ou 1-1 na MD3, 2-1 na MD5).
      // Abre o Draft para escolher/ajustar os 5 campeões para o próximo jogo da série!
      this.openMatchDraft();
      return;
    }

    // A série foi concluída!
    if (sRes.seriesWon) {
      // Simula partidas de IA pendentes da rodada
      this.tournament.simulateOtherMatchesOfCurrentRound();

      if (sRes.playerWonTournament) {
        // Conquistou a Grande Final do CBLOL!
        this.showChampionCelebration(summary);
      } else {
        // Avançou de fase (ex: Qualify -> Quartas, Quartas -> Semis, Semis -> Final)
        // Abre imediatamente a tela de seleção dos 5 novos campeões para a próxima fase!
        this.openMatchDraft();
      }
    } else {
      // Eliminado da série e do campeonato
      this.showEliminationScreen(summary);
    }
  }

  showUpgradesSelection() {
    this.showView("upgrades");

    const currentUpgradeIds = (this.playerTeam.upgrades || []).map(u => u.id);
    const choices = getRandomUpgrades(3, currentUpgradeIds);

    this.views.upgrades.innerHTML = `
      <div style="text-align: center; max-width: 800px; margin: 0 auto;">
        <span style="font-size: 13px; font-weight: 800; color: var(--lol-blue-glow); text-transform: uppercase; letter-spacing: 2px;">
          Série Vencida com Sucesso!
        </span>
        <h2 style="font-size: 28px; font-weight: 900; color: #fff; margin-top: 6px; letter-spacing: 1.5px; text-transform: uppercase;">
          Escolha um Aprimoramento Hextech
        </h2>
        <p style="color: #cdbe91; font-size: 14px; margin-top: 6px;">
          Fortaleça sua equipe para enfrentar o próximo confronto eliminatório do CBLOL!
        </p>

        <div class="upgrades-grid">
          ${choices.map(u => `
            <div class="upgrade-card" data-upgrade-id="${u.id}">
              <div class="upgrade-icon-large">${u.icon}</div>
              <div class="upgrade-name">${u.name}</div>
              <div class="upgrade-desc">${u.description}</div>
              <span class="upgrade-rarity">${u.rarity}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.views.upgrades.querySelectorAll(".upgrade-card").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-upgrade-id");
        const chosen = choices.find(u => u.id === id);
        if (chosen) {
          sound.playPick();
          this.playerTeam.upgrades = this.playerTeam.upgrades || [];
          this.playerTeam.upgrades.push(chosen);

          // Atualiza estatísticas do time com o upgrade
          Object.keys(chosen.effect).forEach(stat => {
            if (this.playerTeam.stats[stat] !== undefined) {
              this.playerTeam.stats[stat] += chosen.effect[stat];
            }
          });

          this.showBracketView();
        }
      });
    });
  }

  showChampionCelebration(summary) {
    this.showView("champion");

    sound.playChampionFanfare();
    if (typeof confetti !== "undefined") {
      confetti.startChampionConfetti(12000);
    }

    const tourney = this.tournament.getTournamentSummary();
    const mvp = tourney.mvp;
    const history = tourney.history || [];

    this.views.champion.innerHTML = `
      <div class="ceremony-box" style="max-width: 860px;">
        <div class="trophy-stage">
          <div class="trophy-halo"></div>
          <div class="trophy-image">🏆</div>
        </div>
        <h1 class="ceremony-title gold">É CAMPEÃO DO CBLOL!</h1>
        <p class="ceremony-subtitle">
          Parabéns! A organização <strong>${this.playerTeam.name}</strong> conquistou o título mais cobiçado do Brasil após superar todas as séries do torneio!
        </p>

        <!-- Resumo de Vitórias e Derrotas da Campanha -->
        <div class="campaign-summary-banner">
          <div class="campaign-stat-item">
            <span class="camp-label">Vitórias Totais</span>
            <span class="camp-val win-val">${tourney.totalWins}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Derrotas Totais</span>
            <span class="camp-val loss-val">${tourney.totalLosses}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Aproveitamento</span>
            <span class="camp-val gold-val">${Math.round((tourney.totalWins / Math.max(1, tourney.totalWins + tourney.totalLosses)) * 100)}%</span>
          </div>
        </div>

        <!-- Trajetória Série por Série -->
        <div class="campaign-history-section">
          <h3 class="campaign-section-title">📜 Trajetória nos Playoffs</h3>
          <div class="campaign-history-list">
            ${history.map(h => `
              <div class="campaign-history-item ${h.won ? 'won-series' : 'lost-series'}">
                <div class="series-tag">${h.roundName} (${h.format})</div>
                <div class="series-versus">
                  vs <strong>${h.opponentName}</strong>
                </div>
                <div class="series-result-score">
                  <span class="score-badge ${h.won ? 'won' : 'lost'}">${h.playerWins} x ${h.enemyWins}</span>
                  <span class="status-badge">${h.won ? 'CLASSIFICADO' : 'ELIMINADO'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Cartão do MVP do Campeonato -->
        ${mvp ? `
          <div class="mvp-ceremony-card">
            <div class="mvp-badge-header">⭐ MVP DO CAMPEONATO (SPLIT MVP) ⭐</div>
            <div class="mvp-card-content">
              <div class="mvp-avatar-box">
                <img src="${mvp.avatarUrl}" alt="${mvp.name}" class="mvp-champ-avatar" />
                <span class="mvp-role-badge">${mvp.role.toUpperCase()}</span>
              </div>
              <div class="mvp-details-box">
                <div class="mvp-champ-name">${mvp.name}</div>
                <div class="mvp-metrics-grid">
                  <div class="metric-cell">
                    <span class="m-label">KDA Oficial</span>
                    <span class="m-val">${mvp.kdaStr}</span>
                  </div>
                  <div class="metric-cell">
                    <span class="m-label">Dano a Campeões</span>
                    <span class="m-val dmg">${Math.round(mvp.damageDealt).toLocaleString()}</span>
                  </div>
                  <div class="metric-cell">
                    <span class="m-label">Ouro Acumulado</span>
                    <span class="m-val gold">💰 ${Math.round(mvp.goldEarned).toLocaleString()}</span>
                  </div>
                  <div class="metric-cell">
                    <span class="m-label">Jogos Realizados</span>
                    <span class="m-val">${mvp.games} partidas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <button id="restart-won-btn" class="lol-btn lol-btn-primary" style="margin-top: 24px; padding: 14px 36px; font-size: 16px;">
          ✨ Iniciar Nova Campanha no CBLOL
        </button>
      </div>
    `;

    const btn = this.views.champion.querySelector("#restart-won-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        if (typeof confetti !== "undefined") confetti.stop();
        sound.playClick();
        this.startNewRun();
      });
    }
  }

  showEliminationScreen(summary) {
    this.showView("eliminated");

    const tourney = this.tournament ? this.tournament.getTournamentSummary() : { totalWins: 0, totalLosses: 0, history: [] };

    this.views.eliminated.innerHTML = `
      <div class="ceremony-box" style="max-width: 800px;">
        <div style="font-size: 80px; margin-bottom: 20px;">💀</div>
        <h1 class="ceremony-title red">ELIMINADO DOS PLAYOFFS</h1>
        <p class="ceremony-subtitle">
          Sua jornada terminou nas <strong>${this.tournament.roundNames[this.tournament.currentRound] || "Fase Eliminatória"}</strong>. O CBLOL é impiedoso, mas toda lenda nasce da superação!
        </p>

        <div class="campaign-summary-banner" style="margin: 20px 0;">
          <div class="campaign-stat-item">
            <span class="camp-label">Vitórias</span>
            <span class="camp-val win-val">${tourney.totalWins}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Derrotas</span>
            <span class="camp-val loss-val">${tourney.totalLosses}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Duração Último Jogo</span>
            <span class="camp-val gold-val">${summary.duration}</span>
          </div>
        </div>

        <button id="restart-loss-btn" class="lol-btn lol-btn-danger" style="margin-top: 20px;">
          🔄 Montar Novo Time e Tentar Novamente
        </button>
      </div>
    `;

    const btn = this.views.eliminated.querySelector("#restart-loss-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.startNewRun();
      });
    }
  }

  startNewRun() {
    this.playerTeam = null;
    this.tournament = null;
    this.currentSimulator = null;
    this.currentArenaView = null;
    this.currentBracketView = null;

    this.showView("builder");
    this.initTeamCreator();
  }
}

// Inicializa o jogo quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.cblolApp = new AppController();
});
