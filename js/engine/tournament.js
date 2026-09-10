// Gerenciador do Torneio CBLOL e Progressão de Séries (MD1, MD3, MD5) com Eleição de MVP
import { CBLOL_TEAMS } from "../data/teams.js";
import { getChampionById } from "../data/champions.js";

export class TournamentManager {
  constructor(playerTeam) {
    this.playerTeam = playerTeam; // { name, iconUrl, iconId, roster, stats, upgrades: [] }
    this.currentRound = 0; // 0: Qualify, 1: Quartas, 2: Semis, 3: Final
    this.roundNames = [
      "Fase de Entrada (Qualify)",
      "Quartas de Final",
      "Semifinais",
      "Grande Final do CBLOL"
    ];
    this.roundFormats = ["MD1", "MD3", "MD5", "MD5"];
    this.winsNeededPerRound = [1, 2, 3, 3];
    this.maxGamesPerRound = [1, 3, 5, 5];

    this.isOver = false;
    this.playerWonTournament = false;

    // Estatísticas acumuladas da campanha do jogador
    this.playerCampaignStats = {
      totalWins: 0,
      totalLosses: 0,
      roundHistory: [], // { roundIndex, roundName, format, opponentName, opponentLogo, playerWins, enemyWins, won }
      championStats: {} // [champId]: { id, name, role, kills, deaths, assists, damageDealt, goldEarned, games }
    };

    this.bracket = this._generateBracket();
  }

  _generateBracket() {
    const cloneTeam = (t) => ({
      ...t,
      roster: { ...(t.roster || t.defaultRoster) },
      isPlayer: false
    });

    // Filtra para remover qualquer time com mesmo id ou nome do jogador
    const playerCleanName = (this.playerTeam.name || "").trim().toLowerCase();
    const availablePool = CBLOL_TEAMS
      .filter(t => t.id !== this.playerTeam.id && t.name.trim().toLowerCase() !== playerCleanName)
      .map(cloneTeam)
      .sort(() => 0.5 - Math.random());

    const playerEntry = {
      ...this.playerTeam,
      roster: { ...this.playerTeam.roster },
      isPlayer: true
    };

    // 4 Equipes Cabeças de Chave para as Quartas de Final (Preferência para Tier S e A)
    const tierSAndA = availablePool.filter(t => t.tier === "S" || t.tier === "A");
    const otherTiers = availablePool.filter(t => t.tier !== "S" && t.tier !== "A");

    // Seleciona 4 sementes para Quartas de Final sem repetição
    const seededQuartas = [];
    while (seededQuartas.length < 4 && tierSAndA.length > 0) {
      seededQuartas.push(tierSAndA.shift());
    }
    while (seededQuartas.length < 4 && otherTiers.length > 0) {
      seededQuartas.push(otherTiers.shift());
    }

    // Equipes restantes para o Qualify (7 equipes para jogar com o jogador)
    const remainingForQualify = [...tierSAndA, ...otherTiers].sort(() => 0.5 - Math.random());
    const qualifyTeams = [];
    while (qualifyTeams.length < 7 && remainingForQualify.length > 0) {
      qualifyTeams.push(remainingForQualify.shift());
    }

    // Rodada 0: Qualify (MD1) - 4 partidas (8 equipes: Jogador + 7 IAs únicas)
    const r0Matches = [
      { id: "r0_m1", teamA: playerEntry, teamB: qualifyTeams[0], winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r0_m2", teamA: qualifyTeams[1], teamB: qualifyTeams[2], winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r0_m3", teamA: qualifyTeams[3], teamB: qualifyTeams[4], winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r0_m4", teamA: qualifyTeams[5], teamB: qualifyTeams[6], winner: null, scoreA: 0, scoreB: 0, games: [] }
    ];

    // Rodada 1: Quartas de Final (MD3) - 4 partidas (4 classificados do Qualify vs 4 cabeças de chave)
    const r1Matches = [
      { id: "r1_m1", teamA: null, teamB: seededQuartas[0], winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r1_m2", teamA: null, teamB: seededQuartas[1], winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r1_m3", teamA: null, teamB: seededQuartas[2], winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r1_m4", teamA: null, teamB: seededQuartas[3], winner: null, scoreA: 0, scoreB: 0, games: [] }
    ];

    // Rodada 2: Semifinais (MD5) - 2 partidas
    const r2Matches = [
      { id: "r2_m1", teamA: null, teamB: null, winner: null, scoreA: 0, scoreB: 0, games: [] },
      { id: "r2_m2", teamA: null, teamB: null, winner: null, scoreA: 0, scoreB: 0, games: [] }
    ];

    // Rodada 3: Grande Final do CBLOL (MD5) - 1 partida
    const r3Matches = [
      { id: "r3_m1", teamA: null, teamB: null, winner: null, scoreA: 0, scoreB: 0, games: [] }
    ];

    return {
      round0: r0Matches,
      round1: r1Matches,
      round2: r2Matches,
      round3: r3Matches
    };
  }

  getCurrentRoundKey() {
    return ["round0", "round1", "round2", "round3"][this.currentRound] || null;
  }

  getCurrentRoundFormat() {
    return this.roundFormats[this.currentRound] || "MD1";
  }

  getCurrentWinsNeeded() {
    return this.winsNeededPerRound[this.currentRound] || 1;
  }

  getCurrentPlayerMatch() {
    const roundKey = this.getCurrentRoundKey();
    if (!roundKey) return null;
    const matches = this.bracket[roundKey];
    return matches.find(m => (m.teamA && m.teamA.isPlayer) || (m.teamB && m.teamB.isPlayer)) || null;
  }

  getOpponentForCurrentRound() {
    const match = this.getCurrentPlayerMatch();
    if (!match) return null;
    let opp = match.teamA && match.teamA.isPlayer ? match.teamB : match.teamA;
    if (!opp) {
      this._propagateWinners();
      opp = match.teamA && match.teamA.isPlayer ? match.teamB : match.teamA;
      if (!opp) {
        const fallback = CBLOL_TEAMS.find(t => t.id !== this.playerTeam.id) || CBLOL_TEAMS[0];
        if (match.teamA && match.teamA.isPlayer) match.teamB = fallback;
        else match.teamA = fallback;
        opp = fallback;
      }
    }
    return opp;
  }

  // Simula 1 jogo de cada série de IA ativa na rodada atual (progresso dinâmico em tempo real)
  simulateLiveRoundStep() {
    const roundKey = this.getCurrentRoundKey();
    if (!roundKey) return;
    const matches = this.bracket[roundKey];
    const winsNeeded = this.getCurrentWinsNeeded();

    matches.forEach(m => {
      if (m.winner) return;
      if ((m.teamA && m.teamA.isPlayer) || (m.teamB && m.teamB.isPlayer)) return;
      if (!m.teamA || !m.teamB) return;

      const pA = (m.teamA.stats.combat || 80) + (m.teamA.stats.macro || 80) * 0.8;
      const pB = (m.teamB.stats.combat || 80) + (m.teamB.stats.macro || 80) * 0.8;

      const probA = pA / (pA + pB);
      if (Math.random() < probA) {
        m.scoreA++;
      } else {
        m.scoreB++;
      }

      if (m.scoreA >= winsNeeded) {
        m.winner = m.teamA;
      } else if (m.scoreB >= winsNeeded) {
        m.winner = m.teamB;
      }
    });

    this._propagateWinners();
  }

  // Finaliza qualquer série de IA pendente da rodada atual até definir todos os vencedores
  simulateOtherMatchesOfCurrentRound() {
    const roundKey = this.getCurrentRoundKey();
    if (!roundKey) return;
    const matches = this.bracket[roundKey];
    const winsNeeded = this.getCurrentWinsNeeded();

    matches.forEach(m => {
      if (m.winner) return;
      if ((m.teamA && m.teamA.isPlayer) || (m.teamB && m.teamB.isPlayer)) return;
      if (!m.teamA || !m.teamB) return;

      const pA = (m.teamA.stats.combat || 80) + (m.teamA.stats.macro || 80) * 0.8;
      const pB = (m.teamB.stats.combat || 80) + (m.teamB.stats.macro || 80) * 0.8;
      const probA = pA / (pA + pB);

      while (m.scoreA < winsNeeded && m.scoreB < winsNeeded) {
        if (Math.random() < probA) m.scoreA++;
        else m.scoreB++;
      }

      m.winner = m.scoreA > m.scoreB ? m.teamA : m.teamB;
    });

    this._propagateWinners();
  }

  // Registra o resultado de 1 partida da série e verifica se a série concluiu
  recordPlayerGameResult(won, matchSummary) {
    const match = this.getCurrentPlayerMatch();
    if (!match) return null;

    const isTeamA = match.teamA && match.teamA.isPlayer;
    const winsNeeded = this.getCurrentWinsNeeded();
    const roundIdx = this.currentRound;
    const roundName = this.roundNames[roundIdx];
    const format = this.roundFormats[roundIdx];

    // 1. Atualiza placar da série
    if (won) {
      if (isTeamA) match.scoreA++;
      else match.scoreB++;
      this.playerCampaignStats.totalWins++;
    } else {
      if (isTeamA) match.scoreB++;
      else match.scoreA++;
      this.playerCampaignStats.totalLosses++;
    }

    match.games = match.games || [];
    match.games.push({
      gameNumber: match.scoreA + match.scoreB,
      won,
      duration: matchSummary ? matchSummary.duration : "25:00"
    });

    // 2. Acumula estatísticas para o MVP do Campeonato
    if (matchSummary && matchSummary.blue && matchSummary.blue.roster) {
      const roster = matchSummary.blue.roster;
      Object.keys(roster).forEach(role => {
        const c = roster[role];
        if (!c) return;
        if (!this.playerCampaignStats.championStats[c.id]) {
          this.playerCampaignStats.championStats[c.id] = {
            id: c.id,
            name: c.name,
            role: role,
            kills: 0,
            deaths: 0,
            assists: 0,
            damageDealt: 0,
            goldEarned: 0,
            games: 0
          };
        }
        const s = this.playerCampaignStats.championStats[c.id];
        s.kills += c.kills || 0;
        s.deaths += c.deaths || 0;
        s.assists += c.assists || 0;
        s.damageDealt += c.damageDealt || 0;
        s.goldEarned += c.goldEarned || 0;
        s.games++;
      });
    }

    const playerWins = isTeamA ? match.scoreA : match.scoreB;
    const enemyWins = isTeamA ? match.scoreB : match.scoreA;

    const seriesWon = playerWins >= winsNeeded;
    const seriesLost = enemyWins >= winsNeeded;
    const seriesOver = seriesWon || seriesLost;

    if (seriesOver) {
      match.winner = seriesWon ? (isTeamA ? match.teamA : match.teamB) : (isTeamA ? match.teamB : match.teamA);

      // Finaliza todas as outras partidas de IA da rodada para que o chaveamento avance 100%
      this.simulateOtherMatchesOfCurrentRound();

      // Registra no histórico da campanha
      const opp = isTeamA ? match.teamB : match.teamA;
      this.playerCampaignStats.roundHistory.push({
        roundIndex: roundIdx,
        roundName: roundName,
        format: format,
        opponentName: opp ? opp.name : "Adversário",
        opponentLogo: opp ? (opp.iconUrl || opp.logo || "⚡") : "⚡",
        playerWins: playerWins,
        enemyWins: enemyWins,
        won: seriesWon
      });

      if (seriesWon) {
        if (this.currentRound === 3) {
          // Grande Final Vencida!
          this.isOver = true;
          this.playerWonTournament = true;
        } else {
          this.currentRound++;
        }
        this._propagateWinners();
      } else {
        this.isOver = true;
        this.playerWonTournament = false;
      }
    } else {
      // A série do jogador continua: as outras séries ativas da rodada também disputam 1 partida em paralelo
      this.simulateLiveRoundStep();
    }

    return {
      seriesOver,
      seriesWon,
      isTournamentOver: this.isOver,
      playerWonTournament: this.playerWonTournament,
      playerWins,
      enemyWins,
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      winsNeeded,
      roundIndex: roundIdx,
      roundName,
      format,
      nextGameNumber: match.scoreA + match.scoreB + 1
    };
  }

  _propagateWinners() {
    // Avança vencedores do Qualify (round0) para Quartas (round1)
    if (this.bracket.round0[0].winner) this.bracket.round1[0].teamA = this.bracket.round0[0].winner;
    if (this.bracket.round0[1].winner) this.bracket.round1[1].teamA = this.bracket.round0[1].winner;
    if (this.bracket.round0[2].winner) this.bracket.round1[2].teamA = this.bracket.round0[2].winner;
    if (this.bracket.round0[3].winner) this.bracket.round1[3].teamA = this.bracket.round0[3].winner;

    // Avança vencedores das Quartas (round1) para Semifinais (round2)
    if (this.bracket.round1[0].winner) this.bracket.round2[0].teamA = this.bracket.round1[0].winner;
    if (this.bracket.round1[1].winner) this.bracket.round2[0].teamB = this.bracket.round1[1].winner;
    if (this.bracket.round1[2].winner) this.bracket.round2[1].teamA = this.bracket.round1[2].winner;
    if (this.bracket.round1[3].winner) this.bracket.round2[1].teamB = this.bracket.round1[3].winner;

    // Avança vencedores das Semifinais (round2) para Grande Final (round3)
    if (this.bracket.round2[0].winner) this.bracket.round3[0].teamA = this.bracket.round2[0].winner;
    if (this.bracket.round2[1].winner) this.bracket.round3[0].teamB = this.bracket.round2[1].winner;
  }

  // Gera o relatório oficial completo do campeonato (Chave de Grupos/Playoffs e MVP)
  getTournamentSummary() {
    const champs = Object.values(this.playerCampaignStats.championStats);

    let mvp = null;
    let highestMvpScore = -1;

    champs.forEach(c => {
      // Score do MVP baseado em abates, assistências, dano total mitigando mortes
      const score = (c.kills * 300) + (c.assists * 120) + (c.damageDealt * 0.05) - (c.deaths * 100);
      if (score > highestMvpScore) {
        highestMvpScore = score;
        mvp = c;
      }
    });

    if (!mvp && champs.length > 0) {
      mvp = champs[0];
    }

    return {
      playerWon: this.playerWonTournament,
      totalWins: this.playerCampaignStats.totalWins,
      totalLosses: this.playerCampaignStats.totalLosses,
      history: this.playerCampaignStats.roundHistory,
      mvp: mvp ? {
        ...mvp,
        avatarUrl: `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${mvp.id === 'Wukong' ? 'MonkeyKing' : mvp.id}.png`,
        kdaStr: `${mvp.kills} / ${mvp.deaths} / ${mvp.assists}`
      } : null
    };
  }
}
