// Motor Avançado de Simulação: Disputas Decisivas, Pressão de Rota (Momentum), Vantagem Numérica e Pacing Competitivo do CBLOL
import { getChampionById, calculateTeamStats } from "../data/champions.js";
import { getRecommendedItemForChampion, LOL_ITEMS } from "../data/items.js";
import { getPlayerById } from "../data/players.js";

export class MatchSimulator {
  constructor({
    blueTeam,
    redTeam,
    roundIndex = 0, // 0: Quartas, 1: Semis, 2: Final (Progressão Roguelike)
    speed = 1,
    onTick = () => {},
    onEvent = () => {},
    onStructureHit = () => {},
    onStructureDestroyed = () => {},
    onFinish = () => {},
    onTacticalDecision = () => {},
    onMultikill = () => {},
    onAce = () => {},
    onItemPurchased = () => {}
  }) {
    this.blueTeam = blueTeam;
    this.redTeam = redTeam;
    this.roundIndex = roundIndex;
    this.speed = speed;
    this.onTick = onTick;
    this.onEvent = onEvent;
    this.onStructureHit = onStructureHit;
    this.onStructureDestroyed = onStructureDestroyed;
    this.onFinish = onFinish;
    this.onTacticalDecision = onTacticalDecision;
    this.onMultikill = onMultikill;
    this.onAce = onAce;
    this.onItemPurchased = onItemPurchased;
    this.activeDecision = null;

    this.timer = null;
    this.isPaused = false;
    this.isFinished = false;

    // Tempo de jogo simulado (começa aos 01:30 = tropas chegam na rota)
    this.gameSeconds = 90;
    this.maxGameSeconds = Infinity; // Sem limite de tempo (o jogo só encerra quando o Nexus for destruído, autêntico ao LoL)

    // Barra de Pressão de Rotas (Momentum por Rota: -100 [Base Azul] até +100 [Base Vermelha])
    this.lanePressures = {
      top: 0,
      mid: 0,
      bot: 0
    };
    this.lanePressure = 0; // Média global de pressão

    // Postura Tática Orgânica e Automática da Equipe
    this.playerTactics = "balanced";
    this.tacticsLabel = "⚖️ Controle de Rotas";
    this.manualTactics = false; // Controle manual ativo pelo jogador via botões do HUD
    this.combatCooldown = 0; // recarga entre lutas com mortes (pacing realista de abates)

    // Placar e Ouro: Início com 500g por campeão = 2.500g por equipe
    this.blueScore = { kills: 0, deaths: 0, assists: 0, gold: 2500, dragons: 0, barons: 0, heralds: 0, elders: 0, towers: 0, inhibitors: 0 };
    this.redScore = { kills: 0, deaths: 0, assists: 0, gold: 2500, dragons: 0, barons: 0, heralds: 0, elders: 0, towers: 0, inhibitors: 0 };

    // Estruturas Autênticas de Summoner's Rift (Top, Mid, Bot e Base)
    this.blueStructures = this._initStructures("blue");
    this.redStructures = this._initStructures("red");

    // Super minions e inibidores por rota
    this.blueSuperMinions = false;
    this.redSuperMinions = false;
    this.blueSuperMinionsByLane = { top: false, mid: false, bot: false };
    this.redSuperMinionsByLane = { top: false, mid: false, bot: false };
    this.blueInhibRespawnAt = { top: null, mid: null, bot: null };
    this.redInhibRespawnAt = { top: null, mid: null, bot: null };

    // Buffs de Barão
    this.blueBaronUntil = 0;
    this.redBaronUntil = 0;

    // Buffs Ativos / Efeitos Táticos com impacto matemático
    this.activeBuffs = {
      blue: [],
      red: []
    };

    // Cronômetros de Objetivos Oficiais
    this.nextDragonAt = 300; // 05:00
    this.nextBaronAt = 1200; // 20:00
    this.heraldTaken = false;
    this.level1Taken = false;
    this.laneFocusTaken = false;
    this.laneMacroTaken = false;
    this.focusedLane = null; // 'top', 'mid', 'bot' ou null (equilibrado)
    this.elderTaken = false;
    this.nextElderAt = 1680; // 28:00 (Elder Dragon)

    // Sistema de Decisões Táticas de Rotas Individuais e Momentos Dinâmicos
    this.nextDynamicIncidentAt = 210; // Primeiro incidente dinâmico aos 03:30 (após level 1)
    this.incidentHistory = []; // Registro dos últimos tipos para garantir variedade contínua
    this._farmMilestones = {}; // Registro de marcos comemorativos e educativos de CS (50, 100, 150, 200...)

    // Mecânica de Virada (Comeback Mechanics) - Recompensas de Objetivos
    this.objectiveBountiesActive = false;

    // Estados dos campeões e pro players
    this.blueRosterState = this._initRosterState(this.blueTeam.roster, this.blueTeam);
    this.redRosterState = this._initRosterState(this.redTeam.roster || this.redTeam.defaultRoster, this.redTeam);

    this._normalizeTeamStats();
  }

  _normalizeTeamStats() {
    // Dificuldade progressiva autêntica e desafiadora dos Playoffs do CBLOL (Roguelike Progression):
    // 0: Qualify (MD1): 1.00x (Equilibrado e introdutório contra times de acesso)
    // 1: Quartas (MD3): 1.04x (Adversário consolidado dos Playoffs, exige foco nas lutas)
    // 2: Semis (MD5): 1.09x (Top 4 do Brasil, forte coordenação e contestação de objetivos)
    // 3: Grande Final (MD5): 1.14x (Clímax supremo: alta intensidade, punição pesada de erros e decisão acirrada)
    const diffMultipliers = [1.00, 1.04, 1.09, 1.14];
    const diffMult = diffMultipliers[this.roundIndex] !== undefined ? diffMultipliers[this.roundIndex] : 1.04;
    this.difficultyMultiplier = diffMult;

    // Garante que o time do jogador tenha atributos calculados
    if (!this.blueTeam.stats || typeof this.blueTeam.stats.damage !== "number") {
      this.blueTeam.stats = calculateTeamStats(this.blueTeam.roster || {}, this.blueTeam.upgrades || []);
    }

    // Calcula os atributos autênticos da composição do time do CBLOL
    if (!this.redTeam.stats || typeof this.redTeam.stats.damage !== "number") {
      const baseRedStats = calculateTeamStats(this.redTeam.roster || this.redTeam.defaultRoster || {});
      this.redTeam.stats = {
        damage: Math.round(baseRedStats.damage * diffMult),
        tank: Math.round(baseRedStats.tank * diffMult),
        push: Math.round(baseRedStats.push * diffMult),
        utility: Math.round(baseRedStats.utility * diffMult),
        scaling: Math.round(baseRedStats.scaling * diffMult)
      };
    } else if (!this.redTeam._diffApplied) {
      this.redTeam._diffApplied = true;
      this.redTeam.stats.damage = Math.round(this.redTeam.stats.damage * diffMult);
      this.redTeam.stats.tank = Math.round(this.redTeam.stats.tank * diffMult);
      this.redTeam.stats.push = Math.round(this.redTeam.stats.push * diffMult);
      this.redTeam.stats.utility = Math.round((this.redTeam.stats.utility || this.redTeam.stats.push || 75) * diffMult);
      this.redTeam.stats.scaling = Math.round((this.redTeam.stats.scaling || this.redTeam.stats.damage || 75) * diffMult);
    }

    // Bônus de maestria quando os Pro Players pilotam seus Campeões de Conforto (+3 de Dano cada)
    let blueSignatureBonus = 0;
    Object.values(this.blueRosterState).forEach(c => {
      if (c.isSignature) blueSignatureBonus += 3;
    });
    this.blueTeam.stats.damage += blueSignatureBonus;

    let redSignatureBonus = 0;
    Object.values(this.redRosterState).forEach(c => {
      if (c.isSignature) redSignatureBonus += 3;
    });
    this.redTeam.stats.damage += redSignatureBonus;

    // Punição de Draft & Sinergia balanceada:
    // Em fases mais avançadas, times do CBLOL punem drafts desequilibrados com maior rigor (+3 a +7)
    const draftPenalty = 3 + Math.round(this.roundIndex * 1.3);
    if (this.blueTeam.stats.tank < 60) {
      this.redTeam.stats.damage += draftPenalty;
    }
    if (this.blueTeam.stats.utility < 55) {
      this.redTeam.stats.utility += draftPenalty;
    }
    if (this.blueTeam.stats.push < 55) {
      this.redTeam.stats.push += draftPenalty;
    }
  }

  _applyTeamBuff(side, buff) {
    if (!this.activeBuffs) this.activeBuffs = { blue: [], red: [] };
    if (!this.activeBuffs[side]) this.activeBuffs[side] = [];
    this.activeBuffs[side] = this.activeBuffs[side].filter(b => b.id !== buff.id);
    const expiresAt = buff.duration ? this.gameSeconds + buff.duration : null;
    this.activeBuffs[side].push({
      ...buff,
      expiresAt
    });
  }

  _getActiveBuffs(side) {
    if (!this.activeBuffs || !this.activeBuffs[side]) return [];
    this.activeBuffs[side] = this.activeBuffs[side].filter(b => !b.expiresAt || b.expiresAt > this.gameSeconds);
    return this.activeBuffs[side];
  }

  _getTeamBuffModifiers(side) {
    const buffs = this._getActiveBuffs(side);
    let bonusCombat = 0;
    let bonusSiege = 0;
    let bonusDefense = 0;
    for (const b of buffs) {
      if (b.bonusCombat) bonusCombat += b.bonusCombat;
      if (b.bonusSiege) bonusSiege += b.bonusSiege;
      if (b.bonusDefense) bonusDefense += b.bonusDefense;
    }
    return { bonusCombat, bonusSiege, bonusDefense };
  }

  _initStructures(side) {
    const sidePrefix = side === "blue" ? "Azul" : "Vermelha";
    const structures = [
      // ROTA DO TOPO (TOP LANE)
      { id: "top_t1", lane: "top", tier: 1, name: `Torre T1 Superior ${sidePrefix}`, maxHp: 3200, currentHp: 3200, plates: 5, destroyed: false, goldValue: 250 },
      { id: "top_t2", lane: "top", tier: 2, name: `Torre T2 Superior ${sidePrefix}`, maxHp: 3600, currentHp: 3600, plates: 0, destroyed: false, goldValue: 300 },
      { id: "top_t3", lane: "top", tier: 3, name: `Torre T3 Superior ${sidePrefix}`, maxHp: 4000, currentHp: 4000, plates: 0, destroyed: false, goldValue: 300 },
      { id: "top_inhib", lane: "top", tier: "inhib", name: `Inibidor Superior ${sidePrefix}`, maxHp: 3500, currentHp: 3500, plates: 0, destroyed: false, goldValue: 100 },

      // ROTA DO MEIO (MID LANE)
      { id: "mid_t1", lane: "mid", tier: 1, name: `Torre T1 Meio ${sidePrefix}`, maxHp: 3200, currentHp: 3200, plates: 5, destroyed: false, goldValue: 250 },
      { id: "mid_t2", lane: "mid", tier: 2, name: `Torre T2 Meio ${sidePrefix}`, maxHp: 3600, currentHp: 3600, plates: 0, destroyed: false, goldValue: 300 },
      { id: "mid_t3", lane: "mid", tier: 3, name: `Torre T3 Meio ${sidePrefix}`, maxHp: 4000, currentHp: 4000, plates: 0, destroyed: false, goldValue: 300 },
      { id: "mid_inhib", lane: "mid", tier: "inhib", name: `Inibidor Meio ${sidePrefix}`, maxHp: 3500, currentHp: 3500, plates: 0, destroyed: false, goldValue: 100 },

      // ROTA INFERIOR (BOT LANE)
      { id: "bot_t1", lane: "bot", tier: 1, name: `Torre T1 Inferior ${sidePrefix}`, maxHp: 3200, currentHp: 3200, plates: 5, destroyed: false, goldValue: 250 },
      { id: "bot_t2", lane: "bot", tier: 2, name: `Torre T2 Inferior ${sidePrefix}`, maxHp: 3600, currentHp: 3600, plates: 0, destroyed: false, goldValue: 300 },
      { id: "bot_t3", lane: "bot", tier: 3, name: `Torre T3 Inferior ${sidePrefix}`, maxHp: 4000, currentHp: 4000, plates: 0, destroyed: false, goldValue: 300 },
      { id: "bot_inhib", lane: "bot", tier: "inhib", name: `Inibidor Inferior ${sidePrefix}`, maxHp: 3500, currentHp: 3500, plates: 0, destroyed: false, goldValue: 100 },

      { id: "nexus_t1", lane: "base", tier: "nexus_t", name: `Torre do Nexus 1 ${sidePrefix}`, maxHp: 2800, currentHp: 2800, plates: 0, destroyed: false, goldValue: 100 },
      { id: "nexus_t2", lane: "base", tier: "nexus_t", name: `Torre do Nexus 2 ${sidePrefix}`, maxHp: 2800, currentHp: 2800, plates: 0, destroyed: false, goldValue: 100 },
      { id: "nexus", lane: "base", tier: "nexus", name: `NEXUS ${sidePrefix.toUpperCase()}`, maxHp: 4600, currentHp: 4600, plates: 0, destroyed: false, goldValue: 100 }
    ];

    const origFind = structures.find.bind(structures);
    structures.find = function(predicate) {
      const res = origFind(predicate);
      if (res) return res;
      // Compatibilidade legada para buscas antigas: "t1" -> "mid_t1", "inhib" -> "mid_inhib", etc.
      return origFind(s => {
        try {
          if (predicate({ ...s, id: s.id.replace(/^(top|mid|bot)_/, "") })) return true;
        } catch (_) {}
        return false;
      });
    };

    return structures;
  }

  _initRosterState(roster, team = null) {
    const state = {};
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const safeRoster = roster || {};
    const fallbackChamps = { top: "Aatrox", jungle: "LeeSin", mid: "Ahri", adc: "Jinx", support: "Thresh" };
    const teamPlayers = (team && team.proPlayers) || (team && team.players) || {};

    roles.forEach(r => {
      const rawChamp = safeRoster[r] || fallbackChamps[r];
      const champKey = typeof rawChamp === "object" ? (rawChamp.id || rawChamp.name || fallbackChamps[r]) : rawChamp;
      const champ = getChampionById(champKey);
      const playerId = teamPlayers[r];
      const proPlayer = getPlayerById(playerId);
      const isSignature = !!(proPlayer && champ && proPlayer.signatureChampions && proPlayer.signatureChampions.includes(champ.id));
      const champResolvedName = champ ? champ.name : (typeof rawChamp === "object" ? (rawChamp.name || rawChamp.id || "Champion") : String(rawChamp));

      state[r] = {
        id: champ ? champ.id : (typeof rawChamp === "object" ? (rawChamp.id || "champ") : String(rawChamp)),
        role: r,
        name: champResolvedName,
        proPlayer: proPlayer || null,
        playerNick: proPlayer ? proPlayer.nick : null,
        isSignature: isSignature,
        kills: 0,
        deaths: 0,
        assists: 0,
        damageDealt: 0,
        damageTaken: 0,
        goldEarned: 500, // Ouro inicial de partida
        cs: 0,
        turrets: 0,
        alive: true,
        respawnAt: 0,
        items: [] // Itens lendários concluídos
      };
    });
    return state;
  }

  _syncTeamGold() {
    this.blueScore.gold = Object.values(this.blueRosterState).reduce((acc, c) => acc + (c.goldEarned || 500), 0);
    this.redScore.gold = Object.values(this.redRosterState).reduce((acc, c) => acc + (c.goldEarned || 500), 0);
  }

  _awardTeamGold(side, amount) {
    if (!amount || amount <= 0) return;
    const roster = side === "blue" ? this.blueRosterState : this.redRosterState;
    const split = Math.round(amount / 5);
    Object.values(roster).forEach(c => {
      c.goldEarned = (c.goldEarned || 500) + split;
    });
    this._syncTeamGold();
  }

  _updateOrganicTactics() {
    // Se o jogador definiu manualmente a postura através dos controles, sua escolha é 100% respeitada!
    if (this.manualTactics) return;

    const hasBaron = this.gameSeconds < this.blueBaronUntil;
    const blueAlive = Object.values(this.blueRosterState).filter(c => c.alive).length;
    const redAlive = Object.values(this.redRosterState).filter(c => c.alive).length;

    // 1. Defesa sob a torre: quando a equipe está sob pressão na base (lanePressure <= -25)
    if (this.lanePressure <= -25) {
      this.playerTactics = "defense";
      this.tacticsLabel = "🛡️ Defesa Sob a Torre";
    }
    // 2. Cerco e Agressão: quando com Barão ou vantagem numérica no mapa ou avançando forte (lanePressure >= 20)
    else if (hasBaron || (blueAlive > redAlive && this.lanePressure >= 20)) {
      this.playerTactics = "aggressive";
      this.tacticsLabel = hasBaron ? "👑 Cerco com Barão" : "⚔️ Cerco Ofensivo";
    }
    // 3. Split Push: quando o duelista do topo está vivo e a partida está equilibrada
    else if (this._hasActiveSplitPusher() && Math.abs(this.lanePressure) < 25) {
      this.playerTactics = "split";
      this.tacticsLabel = "🏹 Split Push Ativo";
    }
    // 4. Controle Equilibrado de Rotas (Padrão)
    else {
      this.playerTactics = "balanced";
      this.tacticsLabel = "⚖️ Controle de Rotas";
    }
  }

  _hasActiveSplitPusher() {
    const top = this.blueRosterState && this.blueRosterState.top;
    if (!top || !top.alive) return false;
    const splitChamps = ["fiora", "jax", "camille", "irelia", "gnar", "renekton", "jayce", "aatrox"];
    return splitChamps.includes(String(top.id).toLowerCase());
  }

  setTactics(tacticKey, isManual = true) {
    this.playerTactics = tacticKey;
    if (isManual) {
      this.manualTactics = true;
    }
    const names = {
      balanced: "⚖️ Equilibrada",
      aggressive: "⚔️ Agressiva (+Dano)",
      defense: "🛡️ Defensiva (+Armadura)",
      split: "🏰 Split Push (+Torres)",
      objective: "👑 Foco em Barão & Dragões"
    };
    this.tacticsLabel = names[tacticKey] || tacticKey;
    this.onEvent({
      type: "tactics",
      side: "blue",
      text: `📋 Postura Tática definida para: ${names[tacticKey] || tacticKey}!`,
      time: this._formatTime()
    });
  }

  setLaneFocus(lane) {
    if (this.focusedLane === lane) {
      this.focusedLane = null;
      this.onEvent({
        type: "lane_focus",
        side: "blue",
        text: `⚖️ FOCO DE ROTA EQUILIBRADO: A equipe agora divide a atenção igualmente entre Top, Mid e Bot.`,
        time: this._formatTime()
      });
    } else {
      this.focusedLane = lane;
      const names = {
        top: "Rota Superior (Top)",
        mid: "Rota do Meio (Mid)",
        bot: "Rota Inferior (Bot)"
      };
      this.onEvent({
        type: "lane_focus",
        side: "blue",
        text: `🎯 FOCO DE ROTA ATIVO: A equipe agora prioriza recursos e jogadas na ${names[lane] || lane}!`,
        time: this._formatTime()
      });
    }
  }

  triggerCounterAttack() {
    if (this.counterAttackCooldown > 0 || this.isFinished) return false;

    const isBehind = (this.redScore.gold - this.blueScore.gold >= 1500) || this.lanePressure <= -30;
    // Cooldown acelerado quando em desvantagem (30s vs 60s padrão)
    this.counterAttackCooldown = isBehind ? 30 : 60;

    if (isBehind) {
      this.onEvent({
        type: "counter_attack",
        side: "blue",
        text: `⚡ CONTRA-ATAQUE CRÍTICO DE VIRADA! Seu time contra-golpeia em desespero, expulsa o cerco e fatura +200g!`,
        time: this._formatTime()
      });
      // Alívio substancial de pressão (+40) para salvar as estruturas da base
      this.lanePressure = Math.min(40, this.lanePressure + 40);
      // Injeção de ouro emergencial de virada (+200g)
      this._awardTeamGold("blue", 200);
    } else {
      this.onEvent({
        type: "counter_attack",
        side: "blue",
        text: `🔥 CONTRA-ATAQUE INVOCADO! O seu time embosca a rota e empurra as tropas sob a torre!`,
        time: this._formatTime()
      });
      // Puxa a pressão de rota em +25 em favor do jogador (alívio padrão)
      this.lanePressure = Math.min(40, this.lanePressure + 25);
    }

    // Executa emboscada pontual se o time tiver pelo menos 2 campeões vivos
    const bAlive = Object.values(this.blueRosterState).filter(c => c.alive).length;
    const rAlive = Object.values(this.redRosterState).filter(c => c.alive).length;
    if (bAlive >= 2 && rAlive > 0) {
      this._triggerDecisiveCombat("blue", "red", isBehind ? 12 : 5, true);
    }
    this._syncTeamGold();
    return true;
  }

  start() {
    this.isPaused = false;
    this._scheduleNextTick();
  }

  pause() {
    this.isPaused = true;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  resume() {
    if (this.isFinished) return;
    this.isPaused = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this._scheduleNextTick();
  }

  setSpeed(multiplier) {
    this.speed = multiplier;
  }

  skipToEnd() {
    this.speed = 100;
    this.isPaused = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    let maxSteps = 10000;
    while (!this.isFinished && maxSteps-- > 0) {
      if (this.activeDecision) {
        const choiceId = (this.activeDecision.options && this.activeDecision.options[0]) ? this.activeDecision.options[0].id : null;
        this.resolveTacticalDecision(choiceId, false);
      }
      this._simulateStep();
    }
  }

  _scheduleNextTick() {
    if (this.isFinished || this.isPaused) return;
    const baseIntervalMs = 1600; // Ritmo sereno e agradável (permite ler o killfeed e acompanhar as jogadas com calma)
    const interval = Math.max(10, Math.floor(baseIntervalMs / this.speed));
    this.timer = setTimeout(() => {
      try {
        this._simulateStep();
      } catch (err) {
        console.error("Erro na simulação do passo:", err);
      } finally {
        if (!this.isFinished && !this.isPaused) {
          this._scheduleNextTick();
        }
      }
    }, interval);
  }

  _simulateStep() {
    if (this.isFinished) return;

    // 15 segundos por tick (ritmo realista de League of Legends)
    const deltaSeconds = 15;
    this.gameSeconds += deltaSeconds;

    if (this.counterAttackCooldown > 0) {
      this.counterAttackCooldown = Math.max(0, this.counterAttackCooldown - deltaSeconds);
    }
    if (this.combatCooldown > 0) {
      this.combatCooldown = Math.max(0, this.combatCooldown - deltaSeconds);
    }

    // Atualiza a postura tática orgânica da equipe conforme a situação do mapa
    this._updateOrganicTactics();

    // Contra-ataque orgânico: dispara automaticamente quando a equipe defende a base reunida
    if (this.counterAttackCooldown === 0 && (this.lanePressure <= -30 || (this.redScore.gold - this.blueScore.gold >= 2500 && this.lanePressure <= -15))) {
      const blueAliveCount = Object.values(this.blueRosterState).filter(c => c.alive).length;
      if (blueAliveCount >= 3) {
        this.triggerCounterAttack();
      }
    }

    // CS e ouro por minion wave distribuído realisticamente entre os campeões vivos
    if (this.gameSeconds >= 90) {
      const roles = ["top", "jungle", "mid", "adc", "support"];
      const updateFarm = (rosterState) => {
        roles.forEach(role => {
          const c = rosterState[role];
          if (!c || !c.alive) return;

          // Renda passiva e farm oficial calibrados de Summoner's Rift
          // Base passiva de ~20g a cada 15s (2.04g/s com descontos de mortes e recalls)
          let goldGain = 20;
          let csGain = 0;

          if (role === "mid" || role === "adc") {
            // Rotas dos Carregadores: 7 a 8.5 CS/min (1 a 2 CS por tick @ 18g médio)
            csGain = Math.random() < 0.75 ? 2 : 1;
            goldGain += csGain * 18; // ~38g a 56g por tick (~152g a 224g/min)
          } else if (role === "top") {
            // Rota Solo Top: 6 a 8 CS/min
            csGain = Math.random() < 0.6 ? 2 : 1;
            goldGain += csGain * 18; // ~38g a 56g por tick
          } else if (role === "jungle") {
            // Selva: monstros de campos e aronguejo (~4 a 5 CS/min)
            csGain = Math.random() < 0.55 ? 1 : (Math.random() < 0.25 ? 2 : 0);
            goldGain += 22; // ~42g por tick (~168g/min)
          } else if (role === "support") {
            // Suporte: item de suporte (World Atlas/Tribute) gera tributo passivo (~8g por tick)
            csGain = Math.random() < 0.08 ? 1 : 0;
            goldGain += 8; // ~28g por tick (~112g/min)
          }

          c.cs = (c.cs || 0) + csGain;
          c.goldEarned = (c.goldEarned || 500) + goldGain;

          // Marca comemorativa e educativa de farm (50, 100, 150, 200, 250, 300 CS)
          const currentCs = c.cs;
          const milestones = [50, 100, 150, 200, 250, 300];
          const isBlue = (rosterState === this.blueRosterState);
          const champKey = `${isBlue ? 'blue' : 'red'}_${role}`;
          if (!this._farmMilestones[champKey]) this._farmMilestones[champKey] = {};

          for (const mVal of milestones) {
            if (currentCs >= mVal && !this._farmMilestones[champKey][mVal]) {
              this._farmMilestones[champKey][mVal] = true;
              if (isBlue || mVal >= 100) {
                const gameMin = Math.max(1, this.gameSeconds / 60);
                const rate = (currentCs / gameMin).toFixed(1);
                const approxGold = Math.round(mVal * 18.5);
                const killEq = (mVal / 16.5).toFixed(1);
                this.onEvent({
                  type: "farm_milestone",
                  side: isBlue ? "blue" : "red",
                  text: `🌾 MARCA DE FARM: ${c.name} atingiu ${mVal} CS aos ${this._formatTime()} (${rate} CS/min)! Acumulou ~${approxGold.toLocaleString()} de Ouro em tropas — equivalente a ~${killEq} abates em ouro seguro!`,
                  time: this._formatTime()
                });
              }
              break;
            }
          }
        });
      };
      updateFarm(this.blueRosterState);
      updateFarm(this.redRosterState);
    }

    // Sincroniza o placar da equipe com o ouro real somado dos campeões
    this._syncTeamGold();

    this._checkRespawns();
    this._checkInhibitorRespawns();

    // Sistema Autêntico de Recompensas de Objetivos (Objective Bounties)
    const goldDeficit = this.redScore.gold - this.blueScore.gold;
    if (!this.objectiveBountiesActive && goldDeficit >= 2000) {
      this.objectiveBountiesActive = true;
      this.onEvent({
        type: "bounty_active",
        side: "blue",
        text: `🎯 RECOMPENSAS DE OBJETIVO ATIVADAS! O seu time recebe +300g a +400g de Ouro Global ao derrubar torres ou monstros neutros!`,
        time: this._formatTime()
      });
    } else if (this.objectiveBountiesActive && goldDeficit < 800) {
      this.objectiveBountiesActive = false;
      this.onEvent({
        type: "bounty_expired",
        side: "blue",
        text: `⚖️ A economia da partida foi reequilibrada! As recompensas de objetivo expiraram.`,
        time: this._formatTime()
      });
    }

    // Checa conclusão de itens lendários nos campeões
    this._checkItemMilestones();

    // Rola simulação de pressão de rota e combate tático
    this._resolveCombatRound();

    this.onTick(this.getState());
    this._checkGameEnd();
  }

  _checkItemMilestones() {
    const itemThresholds = [3200, 6400, 9600, 12800];

    const checkSide = (side, rosterState, teamObj) => {
      const roles = ["top", "jungle", "mid", "adc", "support"];
      roles.forEach(role => {
        const member = rosterState[role];
        if (!member) return;
        if (!member.items) member.items = [];

        itemThresholds.forEach((threshold, idx) => {
          if ((member.goldEarned || 500) >= threshold && member.items.length <= idx) {
            const champ = getChampionById(member.id);
            const oppMember = (side === "blue" ? this.redRosterState[role] : this.blueRosterState[role]);
            const oppChamp = oppMember ? getChampionById(oppMember.id) : null;
            const enemyTeamRoster = side === "blue" ? (this.redTeam ? this.redTeam.roster : null) : (this.blueTeam ? this.blueTeam.roster : null);
            const item = getRecommendedItemForChampion(champ, member.items, oppChamp, enemyTeamRoster);
            if (item) {
              member.items.push(item);

              // Aplica bônus do item ao time
              if (item.stats && teamObj.stats) {
                Object.keys(item.stats).forEach(stat => {
                  if (teamObj.stats[stat] !== undefined) {
                    teamObj.stats[stat] += Math.round(item.stats[stat] / 4);
                  }
                });
              }

              this.onItemPurchased({
                side,
                champion: member,
                item
              });

              this.onEvent({
                type: "item",
                side,
                championName: member.name,
                itemName: item.name,
                text: `🛒 ${member.name} (${side === "blue" ? "Seu Time" : "CBLOL"}) completou ${item.name}!`,
                time: this._formatTime()
              });
            }
          }
        });
      });
    };

    checkSide("blue", this.blueRosterState, this.blueTeam);
    checkSide("red", this.redRosterState, this.redTeam);
  }

  _checkRespawns() {
    const checkTeam = (rosterState, sideName) => {
      Object.values(rosterState).forEach(member => {
        if (!member.alive && this.gameSeconds >= member.respawnAt) {
          member.alive = true;
          this.onEvent({
            type: "respawn",
            side: sideName,
            text: `✨ ${member.name} (${sideName === "blue" ? "Seu Time" : "Inimigo"}) retornou à partida!`,
            time: this._formatTime()
          });
        }
      });
    };
    checkTeam(this.blueRosterState, "blue");
    checkTeam(this.redRosterState, "red");
  }

  _checkInhibitorRespawns() {
    const lanes = ["top", "mid", "bot"];
    const laneLabels = { top: "Superior", mid: "do Meio", bot: "Inferior" };

    lanes.forEach(lane => {
      // Inibidor Azul
      if (this.blueInhibRespawnAt && this.blueInhibRespawnAt[lane] && this.gameSeconds >= this.blueInhibRespawnAt[lane]) {
        const inhib = this.blueStructures.find(s => s.lane === lane && s.tier === "inhib");
        if (inhib && inhib.destroyed) {
          inhib.destroyed = false;
          inhib.currentHp = inhib.maxHp;
          if (this.redSuperMinionsByLane) this.redSuperMinionsByLane[lane] = false;
          this.blueInhibRespawnAt[lane] = null;
          this.onEvent({
            type: "respawn",
            side: "blue",
            text: `🛡️ O Inibidor Azul ${laneLabels[lane]} renasceu! Tropas inimigas enfraquecidas.`,
            time: this._formatTime()
          });
        }
      }

      // Inibidor Vermelho
      if (this.redInhibRespawnAt && this.redInhibRespawnAt[lane] && this.gameSeconds >= this.redInhibRespawnAt[lane]) {
        const inhib = this.redStructures.find(s => s.lane === lane && s.tier === "inhib");
        if (inhib && inhib.destroyed) {
          inhib.destroyed = false;
          inhib.currentHp = inhib.maxHp;
          if (this.blueSuperMinionsByLane) this.blueSuperMinionsByLane[lane] = false;
          this.redInhibRespawnAt[lane] = null;
          this.onEvent({
            type: "respawn",
            side: "red",
            text: `🛡️ O Inibidor Vermelho ${laneLabels[lane]} renasceu!`,
            time: this._formatTime()
          });
        }
      }
    });

    this.blueSuperMinions = this.blueSuperMinionsByLane ? Object.values(this.blueSuperMinionsByLane).some(Boolean) : false;
    this.redSuperMinions = this.redSuperMinionsByLane ? Object.values(this.redSuperMinionsByLane).some(Boolean) : false;
  }

  _resolveCombatRound() {
    // 1. Checa disputa de Objetivos Neutros (Barão / Dragão / Arauto)
    if (this._checkNeutralObjectives()) {
      return;
    }

    const isLateGame = this.gameSeconds >= 1350; // 22:30+
    const blueHasBaron = this.gameSeconds < this.blueBaronUntil;
    const redHasBaron = this.gameSeconds < this.redBaronUntil;

    // VANTAGEM NUMÉRICA & PROTEÇÃO SOB A TORRE:
    const blueAliveCount = Object.values(this.blueRosterState).filter(c => c.alive).length;
    const redAliveCount = Object.values(this.redRosterState).filter(c => c.alive).length;

    // Se o time estiver em desvantagem numérica mas sob a proteção de suas torres no seu lado da rota, joga defensivamente
    const blueTurtle = this.lanePressure <= -15 && blueAliveCount < redAliveCount;
    const redTurtle = this.lanePressure >= 15 && redAliveCount < blueAliveCount;

    const blueManpowerMod = (blueAliveCount / 5) * (blueTurtle ? 1.25 : 1.0);
    const redManpowerMod = (redAliveCount / 5) * (redTurtle ? 1.25 : 1.0);

    // Modificadores de Postura Tática do Jogador
    let tacticDmg = 0;
    let tacticTank = 0;
    let tacticPush = 0;

    if (this.playerTactics === "aggressive") {
      tacticDmg = 14;
      tacticTank = -6;
    } else if (this.playerTactics === "defense") {
      tacticTank = 16;
      tacticPush = -6;
    } else if (this.playerTactics === "split") {
      tacticPush = 18;
      tacticDmg = -5;
    }

    const bStats = this.blueTeam.stats;
    const rStats = this.redTeam.stats;

    // Vantagem de ouro calibrada (pequena vantagem competitiva)
    const goldDiff = this.blueScore.gold - this.redScore.gold;
    const blueGoldBonus = Math.max(-6, Math.min(6, goldDiff * 0.0006));
    const redGoldBonus = -blueGoldBonus;

    const scalingFactor = isLateGame ? 0.35 : 0.08;

    // Proteção de Torres aliadas e Defesa de Alta Elevação (High Ground / Base Defense)
    // No LoL real, invadir a base/inibidor (-50 de pressão) é extremamente perigoso devido ao raio das torres de Nexus e funil defensivo.
    let blueDefendingBonus = 0;
    if (this.lanePressure <= -50) {
      blueDefendingBonus = 22; // Defesa heroica no inibidor / torres gêmeas
    } else if (this.lanePressure <= -25) {
      blueDefendingBonus = 14; // Defesa sob T2 / T3
    }
    // Bônus de resiliência desesperada se o time estiver defendendo a base com desvantagem econômica significativa
    if (goldDiff <= -2000 && this.lanePressure <= -25) {
      blueDefendingBonus += 6;
    }

    let redDefendingBonus = 0;
    if (this.lanePressure >= 50) {
      redDefendingBonus = 22;
    } else if (this.lanePressure >= 25) {
      redDefendingBonus = 14;
    }

    const bDmgStat = (bStats && (bStats.damage || bStats.combat)) || 75;
    const bTankStat = (bStats && (bStats.tank || bStats.defense)) || 75;
    const bUtilStat = (bStats && (bStats.utility || bStats.macro)) || 75;
    const bScaleStat = (bStats && (bStats.scaling || bStats.combat)) || 75;

    const rDmgStat = (rStats && (rStats.damage || rStats.combat)) || 75;
    const rTankStat = (rStats && (rStats.tank || rStats.defense)) || 75;
    const rUtilStat = (rStats && (rStats.utility || rStats.macro)) || 75;
    const rScaleStat = (rStats && (rStats.scaling || rStats.combat)) || 75;

    let blueBasePower = ((bDmgStat + tacticDmg) * 0.28 +
                         (bTankStat + tacticTank) * 0.24 +
                         (bUtilStat) * 0.20 +
                         (bScaleStat) * scalingFactor +
                         blueGoldBonus +
                         blueDefendingBonus +
                         (blueHasBaron ? 16 : 0) +
                         (this.blueSuperMinions ? 12 : 0)) * blueManpowerMod;

    let redBasePower = ((rDmgStat) * 0.28 +
                         (rTankStat) * 0.24 +
                         (rUtilStat) * 0.20 +
                         (rScaleStat) * scalingFactor +
                         redGoldBonus +
                         redDefendingBonus +
                         (redHasBaron ? 16 : 0) +
                         (this.redSuperMinions ? 12 : 0)) * redManpowerMod;

    // Rolagem com variabilidade realista do League (±12% de variação em jogadas e outplays simétricas)
    const blueRoll = blueBasePower * (0.88 + Math.random() * 0.24);
    const redRoll = redBasePower * (0.88 + Math.random() * 0.24);
    const diff = blueRoll - redRoll;

    // Dinamismo cadenciado da Pressão de Rota (Lane Momentum por Rota e Global)
    const pressureDelta = Math.min(10, Math.max(3, Math.floor(Math.abs(diff) * 1.0)));
    const allLanes = ["top", "mid", "bot"];
    if (diff > 2.0) {
      // Avanço Azul
      allLanes.forEach(l => {
        let lDelta = pressureDelta;
        if (this.focusedLane === l) lDelta = Math.round(lDelta * 1.45);
        if (this.playerTactics === "split" && (l === "top" || l === "bot")) lDelta = Math.round(lDelta * 1.35);
        if (this.playerTactics === "split" && l === "mid") lDelta = Math.max(1, Math.round(lDelta * 0.7));
        this.lanePressures[l] = Math.min(100, (this.lanePressures[l] || 0) + lDelta + (Math.random() * 2 - 1));
      });
    } else if (diff < -2.0) {
      // Avanço Vermelho
      allLanes.forEach(l => {
        this.lanePressures[l] = Math.max(-100, (this.lanePressures[l] || 0) - pressureDelta + (Math.random() * 2 - 1));
      });
    } else {
      // Flutuação natural na zona do rio
      allLanes.forEach(l => {
        this.lanePressures[l] = Math.max(-100, Math.min(100, (this.lanePressures[l] || 0) + (Math.random() * 4 - 2)));
      });
    }
    this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);

    // Dano contínuo de rota e escaramuças trocado entre os campeões vivos com impacto real
    const roles = ["top", "jungle", "mid", "adc", "support"];
    roles.forEach(role => {
      const bChamp = this.blueRosterState[role];
      const rChamp = this.redRosterState[role];
      if (bChamp && bChamp.alive && rChamp && rChamp.alive) {
        const roleDmgMod = (role === "adc" || role === "mid") ? 1.4 : (role === "top" ? 1.1 : 0.85);
        const bDmg = Math.floor((300 + Math.random() * 220) * roleDmgMod * (1 + (bChamp.items ? bChamp.items.length * 0.18 : 0)));
        const rDmg = Math.floor((300 + Math.random() * 220) * roleDmgMod * (1 + (rChamp.items ? rChamp.items.length * 0.18 : 0)));
        bChamp.damageDealt = (bChamp.damageDealt || 0) + bDmg;
        rChamp.damageTaken = (rChamp.damageTaken || 0) + bDmg;
        rChamp.damageDealt = (rChamp.damageDealt || 0) + rDmg;
        bChamp.damageTaken = (bChamp.damageTaken || 0) + rDmg;
      }
    });

    // 2. Decide se ocorre um Confronto Decisivo / Abate ou Troca de Rota
    const canFight = this.combatCooldown <= 0;

    // Escaramuças autênticas por rota e selva durante toda a partida (duelos, invades, ganks e 2v2)
    const skirmishChance = this.gameSeconds < 840 ? 0.32 : 0.20;
    if (canFight && Math.random() < skirmishChance) {
      const skirmishHappened = this._triggerLaneSkirmish();
      if (skirmishHappened) return;
    }

    const isUnderPressure = Math.abs(this.lanePressure) >= 35;
    const fightChance = isUnderPressure ? 0.16 : 0.09;
    const rollForFight = canFight && (Math.random() < fightChance);

    if (rollForFight) {
      if (diff > 5.5) {
        this._triggerDecisiveCombat("blue", "red", Math.abs(diff), false);
      } else if (diff < -5.5) {
        // Contra-ataque orgânico do jogador sob extrema pressão quando em postura defensiva
        if (this.lanePressure <= -40 && this.playerTactics === "defense" && Math.random() < 0.25) {
          this.onEvent({
            type: "counter_attack",
            side: "blue",
            text: `🛡️ DEFESA HEROICA! Seu time absorveu a pressão na torre e puxou um contra-ataque relâmpago!`,
            time: this._formatTime()
          });
          this.lanePressure += 30;
          this._triggerDecisiveCombat("blue", "red", 15, true);
        } else {
          this._triggerDecisiveCombat("red", "blue", Math.abs(diff), false);
        }
      } else {
        this._triggerSkirmishEqual();
        this.combatCooldown = 30;
      }
    } else {
      // Escaramuça sem mortes: apenas tropas profundas sob a torre causam leve dano de cerco
      if (this.lanePressure >= 50 && Math.random() < 0.35) {
        this._damageNextStructure("blue", this.redStructures, Math.max(2, diff), false, 0.45);
      } else if (this.lanePressure <= -50 && Math.random() < 0.35) {
        this._damageNextStructure("red", this.blueStructures, Math.max(2, Math.abs(diff)), false, 0.45);
      } else {
        this._triggerSkirmishEqual();
      }
    }
  }

  _calculateSuccessProbability(baseChance, complexity, statType = "combat", context = {}) {
    const bStat = (this.blueTeam.stats && (this.blueTeam.stats[statType] || this.blueTeam.stats.combat)) || 75;
    const rStat = (this.redTeam.stats && (this.redTeam.stats[statType] || this.redTeam.stats.combat)) || 75;
    const statDiff = bStat - rStat;

    // 1. Ouro: Cada 500g de vantagem/desvantagem altera em ±2.0% (até ±20%)
    const goldLead = this.blueScore.gold - this.redScore.gold;
    const goldModifier = Math.min(20, Math.max(-20, Math.round((goldLead / 500) * 2.0)));

    // 2. Abates (Kills): Diferença de kills impacta diretamente o moral e força de combate
    const killDiff = (this.blueScore.kills || 0) - (this.redScore.kills || 0);
    const killModifier = Math.min(12, Math.max(-12, killDiff * 1.5));

    // 3. Campeões Vivos: Superioridade numérica imediata (crítico em lutas de objetivos)
    const blueAlive = Object.values(this.blueRosterState).filter(c => c.alive).length;
    const redAlive = Object.values(this.redRosterState).filter(c => c.alive).length;
    const aliveModifier = (blueAlive - redAlive) * 12;

    // 4. Se a jogada exige função específica viva (ex: jungle no smite)
    let rolePenalty = 0;
    if (context.requireRole) {
      const bChamp = this.blueRosterState[context.requireRole];
      if (!bChamp || !bChamp.alive) {
        rolePenalty = -45;
      }
    }

    // 5. Torres e Pressão territorial
    const towerDiff = (this.blueScore.towers || 0) - (this.redScore.towers || 0);
    const towerModifier = Math.min(8, Math.max(-8, towerDiff * 2));

    // 6. Itens Lendários Completos
    const blueTotalItems = Object.values(this.blueRosterState).reduce((acc, c) => acc + (c.items ? c.items.length : 0), 0);
    const redTotalItems = Object.values(this.redRosterState).reduce((acc, c) => acc + (c.items ? c.items.length : 0), 0);
    const itemModifier = Math.min(10, Math.max(-10, Math.round((blueTotalItems - redTotalItems) * 2)));

    // 7. Atributos da Organização (diferença real de composição e upgrades)
    const statModifier = Math.min(10, Math.max(-10, Math.round(statDiff * 0.35)));

    // 8. Buffs Ativos e Efeitos Táticos
    const bBuffs = this._getTeamBuffModifiers ? this._getTeamBuffModifiers("blue") : { bonusCombat: 0 };
    const rBuffs = this._getTeamBuffModifiers ? this._getTeamBuffModifiers("red") : { bonusCombat: 0 };
    const buffModifier = Math.min(15, Math.max(-15, Math.round((bBuffs.bonusCombat || 0) - (rBuffs.bonusCombat || 0))));

    // Atenuação de penalidades cumulativas quando em desvantagem (Mecânica Anti-Snowball):
    // No League competitivo, opções de Macro Seguro (Cross-map, visão defensiva, ceder objetivo)
    // funcionam de maneira consistente mesmo quando o time está atrás.
    let gameDeficitModifiers = goldModifier + killModifier + towerModifier + itemModifier;
    if (gameDeficitModifiers < 0) {
      // Amortece a soma total de penalidades acumuladas para no máximo -12%
      gameDeficitModifiers = Math.max(-12, gameDeficitModifiers);
    }

    // 9. Sinergia da Postura Tática com a decisão tomada
    let tacticModifier = 0;
    if (this.playerTactics === "aggressive" && (statType === "damage" || complexity === "tactical")) {
      tacticModifier = 6;
    } else if (this.playerTactics === "defense" && (statType === "tank" || complexity === "simple")) {
      tacticModifier = 6;
    } else if (this.playerTactics === "split" && (statType === "push" || complexity === "complex")) {
      tacticModifier = 8;
    }

    // Dificuldade progressiva justa: times em fases avançadas leem jogadas melhor
    const roundPenalty = [0, -2, -3, -5][this.roundIndex] || 0;

    const rawChance = baseChance + gameDeficitModifiers + aliveModifier + statModifier + buffModifier + rolePenalty + roundPenalty + tacticModifier;

    // Pisos adaptados por fase (preserva possibilidade de virada, mas exige precisão no topo)
    const simpleFloors = [68, 65, 62, 58];
    const tacticalFloors = [48, 45, 42, 38];
    const complexFloors = [35, 32, 28, 25];

    const sFloor = simpleFloors[this.roundIndex] || 60;
    const tFloor = tacticalFloors[this.roundIndex] || 40;
    const cFloor = complexFloors[this.roundIndex] || 25;

    if (complexity === "simple") {
      return Math.max(sFloor, Math.min(92, Math.round(rawChance)));
    } else if (complexity === "complex") {
      return Math.max(cFloor, Math.min(75, Math.round(rawChance)));
    } else {
      return Math.max(tFloor, Math.min(85, Math.round(rawChance)));
    }
  }

  _checkNeutralObjectives() {
    // Não dispara novas decisões se uma estiver ativa ou se houve uma decisão recente (< 60s)
    if (this.activeDecision || (this.lastDecisionSec && (this.gameSeconds - this.lastDecisionSec) < 60)) {
      return false;
    }

    // 0. Estratégia de Nível 1 (aos 01:30 = 90s, apenas 1 vez por partida)
    if (!this.level1Taken && this.gameSeconds >= 90 && this.gameSeconds <= 120) {
      this.level1Taken = true;

      // Telemetrias Dinâmicas de Início de Partida (Scouting)
      const scoutingActions = [
        "Sentinelas do rio indicam que o CBLOL prepara cobertura na rota inferior e vigia o buff azul.",
        "Radar acusa o Top Laner rival avançando sozinho para cravar sentinela no mato do rio.",
        "O Caçador adversário está agrupando com a bot lane para dar leash no Buff Vermelho.",
        "Linha defensiva inimiga posicionada em leque nas entradas da selva superior."
      ];
      const selectedScouting = scoutingActions[Math.floor(Math.random() * scoutingActions.length)];

      // Pool de Opções Seguras (1 sorteada)
      const safePool = [
        {
          id: "defensive_5point",
          icon: "🛡️",
          name: "Guarda das Entradas & Sentinelas (5-Point)",
          complexity: "simple",
          complexityLabel: "🟢 Opção Segura",
          probability: this._calculateSuccessProbability(82, "simple", "tank"),
          risk: "Risco Mínimo",
          riskClass: "low",
          reward: "Início Seguro + Farm Protegido (+120g) + Buff de Visão",
          failureConsequence: "Leve avanço de tropas rival na torre sem mortes",
          desc: "Cada jogador vigia uma entrada da selva (Top, Mid e Bot) e planta sentinelas de rio, cobrindo 100% dos acessos para anular qualquer invasão adversária."
        },
        {
          id: "deep_ward_scout",
          icon: "👁️",
          name: "Sentinela Profunda no Buff Inimigo & Recuo Seguro",
          complexity: "simple",
          complexityLabel: "🟢 Opção Segura",
          probability: this._calculateSuccessProbability(78, "simple", "utility"),
          risk: "Risco Mínimo",
          riskClass: "low",
          reward: "Rastreamento do Caçador + Telemetria de Gank (+120g)",
          failureConsequence: "Sentinela destruída com ligeira perda de pressão",
          desc: "Avançar sorrateiramente aos 00:50 para cravar uma sentinela profunda no Red/Blue adversário e recuar para farmar sob total proteção."
        },
        {
          id: "lane_defense_freeze",
          icon: "🏰",
          name: "Controle Defensivo do Tribush & Bloqueio de Invasão",
          complexity: "simple",
          complexityLabel: "🟢 Opção Segura",
          probability: this._calculateSuccessProbability(80, "simple", "tank"),
          risk: "Risco Mínimo",
          riskClass: "low",
          reward: "Controle da Onda de Tropas + Bloqueio de Invasão (+130g)",
          failureConsequence: "Onda de tropas desfavorável na rota inferior",
          desc: "Travar a entrada do rio inferior com a bot lane e preparar o controle seguro da primeira onda de tropas rente à torre aliada."
        }
      ];

      // Pool de Opções Táticas / Equilibradas (1 sorteada)
      const tacticalPool = [
        {
          id: "invade_bot",
          icon: "🎯",
          name: "Invasão no Bot Side & Roubo de Buff",
          complexity: "tactical",
          complexityLabel: "🟡 Jogada Tática",
          probability: this._calculateSuccessProbability(68, "tactical", "utility"),
          risk: "Médio Risco",
          riskClass: "medium",
          reward: "First Blood (+400g) OU Roubo Limpo do Buff Inferior (+200g)",
          failureConsequence: "Inimigos defendem agrupados; gasto de feitiços de invocador",
          desc: "Avançar em grupo pelo rio inferior em direção ao buff do caçador rival para surpreender defensores ou roubar o primeiro monstro da selva."
        },
        {
          id: "river_bush",
          icon: "🌿",
          name: "Emboscada Tática no Arbusto do Rio (Pixel Bush)",
          complexity: "tactical",
          complexityLabel: "🟡 Jogada Tática",
          probability: this._calculateSuccessProbability(65, "tactical", "damage"),
          risk: "Médio Risco",
          riskClass: "medium",
          reward: "Abate Limpo sem perdas (+350g) + Controle do Rio",
          failureConsequence: "Troca neutra de feitiços e recuo sem mortes",
          desc: "Aguardar em bloco no arbusto do rio para interceptar o Mid Laner ou Suporte adversário checando a visão no desespero."
        },
        {
          id: "vertical_jungle",
          icon: "🔄",
          name: "Início de Selva Vertical & Inversão de Quadrantes",
          complexity: "tactical",
          complexityLabel: "🟡 Jogada Tática",
          probability: this._calculateSuccessProbability(66, "tactical", "push"),
          risk: "Médio Risco",
          riskClass: "medium",
          reward: "Divisão Vertical da Selva (+220g) + Atraso do Caçador Rival",
          failureConsequence: "Caçador rival colapsa com suporte da rota",
          desc: "Acompanhar o caçador para invadir e iniciar direto no quadrante oposto da selva adversária, dividindo o mapa verticalmente."
        }
      ];

      // Pool de Opções Ousadas / Agressivas (1 sorteada)
      const aggressivePool = [
        {
          id: "invade_top",
          icon: "🔥",
          name: "Invasão Agressiva no Top Side & Emboscada no Mato Triplo",
          complexity: "complex",
          complexityLabel: "🔴 Jogada Ousada",
          probability: this._calculateSuccessProbability(54, "complex", "damage"),
          risk: "Alto Risco / Alto Retorno",
          riskClass: "high",
          reward: "First Blood Mortal (+400g) OU Buff Roubado + Flash Queimado",
          failureConsequence: "CBLOL colapsa no Top: risco de First Blood desfavorável",
          desc: "Infiltrar pela selva superior e arbusto triplo do topo antes do spawn para emboscar o Top Laner ou Caçador rival."
        },
        {
          id: "lane_bush_cheese",
          icon: "⚡",
          name: "Armadilha no Arbusto da Rota Inferior (Lane Cheese)",
          complexity: "complex",
          complexityLabel: "🔴 Jogada Ousada",
          probability: this._calculateSuccessProbability(55, "complex", "damage"),
          risk: "Alto Risco / Alto Retorno",
          riskClass: "high",
          reward: "First Blood no Bot (+400g) OU Dano Massivo e Recuo Forçado",
          failureConsequence: "Rivais contornam e punem com pressão de onda",
          desc: "Atirador e Suporte entram escondidos no primeiro mato da rota inferior para desferir rajada mortal no nível 1."
        },
        {
          id: "red_buff_invade",
          icon: "⚔️",
          name: "All-In Agressivo no Buff Vermelho com Flash",
          complexity: "complex",
          complexityLabel: "🔴 Jogada Ousada",
          probability: this._calculateSuccessProbability(52, "complex", "damage"),
          risk: "Alto Risco / Alto Retorno",
          riskClass: "high",
          reward: "First Blood na Selva (+400g) + Buff Vermelho Roubado (+250g)",
          failureConsequence: "Contragolpe em 4 do CBLOL: desvantagem inicial",
          desc: "Invadir em velocidade máxima o Buff Vermelho adversário forçando confronto imediato 4v3 e queima de feitiços de invocador."
        }
      ];

      const safeOption = safePool[Math.floor(Math.random() * safePool.length)];
      const tacticalOption = tacticalPool[Math.floor(Math.random() * tacticalPool.length)];
      const aggressiveOption = aggressivePool[Math.floor(Math.random() * aggressivePool.length)];

      const decisionData = {
        id: "level1",
        meta: {},
        badge: "EARLY GAME • NÍVEL 1 (01:30)",
        title: "⚔️ ESTRATÉGIA DE NÍVEL 1 (INÍCIO DE PARTIDA)",
        subtitle: "As tropas chegaram às rotas. Escolha a postura inicial da sua equipe antes do spawn dos monstros:",
        scouting: {
          intelTag: "📡 RADAR DE VISÃO NÍVEL 1",
          enemyAction: selectedScouting,
          recommendation: ""
        },
        options: [safeOption, tacticalOption, aggressiveOption]
      };

      this._triggerTacticalDecision(decisionData);
      return true;
    }

    const goldDiff = this.blueScore.gold - this.redScore.gold;
    const isAhead = (goldDiff >= 1200) || (this.lanePressure >= 25);
    const isBehind = (goldDiff <= -1200) || (this.lanePressure <= -25);

    // 0.5. Incidentes Situacionais Dinâmicos & Escolhas por Rotas Individuais (Top, Jungle, Mid, Bot & Momentos de Jogo)
    if (this._checkDynamicIncidents()) {
      return true;
    }

    // 1. Dragão Ancião (Late Game >= 28:00 = 1680s, maior prioridade se vivo, respawn a cada 6 min)
    if (this.gameSeconds >= this.nextElderAt) {
      this.nextElderAt = this.gameSeconds + 360;
      this.nextBaronAt = Math.max(this.nextBaronAt, this.gameSeconds + 120); // Evita colisão com o Barão no mesmo tick

      let elderEnemyAction = "";
      let elderOptions = [];

      if (isAhead) {
        elderEnemyAction = "CBLOL acuado na base tentando vigiar o rio sob extrema desvantagem de ouro.";
        elderOptions = [
          {
            id: "elder_rush",
            icon: "⚡",
            name: "Rush no Ancião & Fim no Nexus",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(78, "simple", "damage"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Ancião Derretido + Marcha Mortal ao Nexus",
            failureConsequence: "Hesitação leve sem mortes no time",
            desc: "Aproveitar o domínio total do mapa para queimar o Ancião rapidamente antes de qualquer reação adversária."
          },
          {
            id: "elder_all_in",
            icon: "💥",
            name: "Cercar Covil & Ace Limpo",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(68, "tactical", "combat"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Aspecto do Dragão Ancião + ACE DEVASTADOR!",
            failureConsequence: "CBLOL escapa para a base",
            desc: "Aguardar a aproximação desesperada do CBLOL no rio para dizimar os 5 campeões e finalizar a partida."
          },
          {
            id: "base_race",
            icon: "🏰",
            name: "Base Race Direto no Nexus Aberto",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(55, "complex", "push"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "Vitória Imediata por Destruição do Nexus",
            failureConsequence: "Recall adversário a tempo com perda do monstro",
            desc: "Ignorar o monstro e marchar pelo meio com todas as forças para explodir o Nexus exposto!"
          }
        ];
      } else if (isBehind) {
        elderEnemyAction = "CBLOL com 5 campeões cercando o covil e pressionando o Dragão Ancião com controle total de visão.";
        elderOptions = [
          {
            id: "turtle_nexus",
            icon: "🛡️",
            name: "Defesa Fechada sob as Torres do Nexus",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(68, "simple", "tank"),
            risk: "Risco Baixo",
            riskClass: "low",
            reward: "Absorção do Buff com Torres Vivas (+800g)",
            failureConsequence: "Dano parcial nas defesas sem mortes totais",
            desc: "Lutar sob a proteção dupla das torres gêmeas da base até a queima do Ancião expirar."
          },
          {
            id: "elder_all_in",
            icon: "⚔️",
            name: "Batalha Desesperada de Virada 5v5",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(50, "tactical", "damage"),
            risk: "Alto Risco",
            riskClass: "medium",
            reward: "Aspecto do Ancião + Virada Histórica",
            failureConsequence: "Derrota no covil e contra-ataque letal",
            desc: "Colidir em bloco num tudo-ou-nada no covil tentando um milagre coletivo antes do bônus cair."
          },
          {
            id: "elder_smite_steal",
            icon: "🎯",
            name: "Roubo Heroico no Smite (Milagre)",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(45, "complex", "utility", { requireRole: "jungle" }),
            risk: "Coin Flip",
            riskClass: "high",
            reward: "Roubo Milagroso do Ancião + Execução em Massa",
            failureConsequence: "Caçador eliminado e monstro concedido",
            desc: "O Caçador salta sozinho no covil tentando o roubo histórico no milésimo de segundo."
          }
        ];
      } else {
        // Even
        elderEnemyAction = "5 campeões inimigos agrupados no covil disputando visão e prontos para a colisão final.";
        elderOptions = [
          {
            id: "elder_zone",
            icon: "🛡️",
            name: "Zoneamento & Controle Territorial do Rio",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(72, "simple", "tank"),
            risk: "Risco Baixo",
            riskClass: "low",
            reward: "Ancião Assegurado com Terreno Seguro",
            failureConsequence: "Recuo ordenado com dano leve",
            desc: "Manter postura defensiva na boca do rio, bloqueando a entrada do CBLOL com habilidades de desengaje."
          },
          {
            id: "elder_all_in",
            icon: "💥",
            name: "Teamfight Decisiva 5v5 no Covil",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(60, "tactical", "damage"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Aspecto do Dragão Ancião + AVANÇO NO NEXUS!",
            failureConsequence: "Derrota no covil e contra-ataque perigoso",
            desc: "Batalha 5v5 definitiva. O time que vencer garante a queima e marcha para a vitória!"
          },
          {
            id: "elder_smite_steal",
            icon: "🎯",
            name: "Roubo Cirúrgico no Smite (50/50)",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(50, "complex", "utility", { requireRole: "jungle" }),
            risk: "Coin Flip",
            riskClass: "high",
            reward: "Roubo Milagroso do Ancião + Execução",
            failureConsequence: "Caçador eliminado e monstro concedido",
            desc: "O Caçador salta sozinho no covil tentando o roubo milimétrico no Golpe."
          }
        ];
      }

      const decisionData = {
        id: "elder",
        meta: {},
        badge: "CLÍMAX • DRAGÃO ANCIÃO",
        title: "🔥 O DRAGÃO ANCIÃO SURGIU NO RIFT (DECISIVO)!",
        subtitle: "O monstro mais letal do League concede Execução Instantânea. Qual a ordem final?",
        scouting: {
          intelTag: "📡 CLÍMAX DO RIFT • RECONHECIMENTO",
          enemyAction: elderEnemyAction
        },
        options: elderOptions
      };

      this._triggerTacticalDecision(decisionData);
      return true;
    }

    // 2. Barão Na'Shor (surge aos 20 min, respawn a cada 6 min)
    if (this.gameSeconds >= this.nextBaronAt) {
      this.nextBaronAt = this.gameSeconds + 360;
      this.nextDragonAt = Math.max(this.nextDragonAt, this.gameSeconds + 120); // Evita colisão de objetivos no mesmo tick

      let baronEnemyAction = "";
      let baronOptions = [];

      if (isAhead) {
        baronEnemyAction = "CBLOL preso na própria selva sem visão do covil, temendo ser pego de surpresa.";
        baronOptions = [
          {
            id: "baron_rush",
            icon: "⚡",
            name: "Rush Veloz com Vantagem",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(78, "simple", "damage"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Mão do Barão Garantida (+1200g) + Push Total",
            failureConsequence: "Recuo temporário sem mortes",
            desc: "Queimar o Barão velozmente aproveitando o dano dos itens fechados e a superioridade de visão."
          },
          {
            id: "baron_bait",
            icon: "👑",
            name: "Bait no Barão & Wipe do CBLOL",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(68, "tactical", "combat"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Abates no Covil + Barão Na'Shor + Fim de Jogo",
            failureConsequence: "Inimigos escapam e Barão é resetado",
            desc: "Iniciar o monstro para atrair os adversários em pânico e virar a luta com dano concentrado."
          },
          {
            id: "split_rush",
            icon: "🏰",
            name: "Cerco 1-3-1 & Quebra de Inibidor",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(58, "complex", "push"),
            risk: "Alto Retorno",
            riskClass: "high",
            reward: "Inibidor Quebrado + Super Tropas na Base",
            failureConsequence: "Split-pusher cercado na base rival",
            desc: "Enquanto 4 membros pressionam o covil, seu duelista arromba as defesas da rota lateral e destrói o inibidor!"
          }
        ];
      } else if (isBehind) {
        baronEnemyAction = "CBLOL com controle total do rio superior e iniciando o Barão em bloco com dano concentrado.";
        baronOptions = [
          {
            id: "vision_siege",
            icon: "🛡️",
            name: "Controle Defensivo & Defesa da Base",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(70, "simple", "tank"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Absorção sem Mortes + Farm Defensivo (+400g)",
            failureConsequence: "Perda leve de torre externa sem mortes",
            desc: "Limpar a selva defensiva, segurar as ondas de tropas na base e não conceder abates fáceis."
          },
          {
            id: "all_in",
            icon: "⚔️",
            name: "Luta Desesperada de Virada no Covil",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(48, "tactical", "damage"),
            risk: "Alto Risco",
            riskClass: "medium",
            reward: "Roubo do Barão + 2 Abates + Virada de Jogo",
            failureConsequence: "CBLOL confirma o Barão e avança contra sua base",
            desc: "Colidir com tudo em bloco 5v5 no covil tentando uma virada heroica antes que o monstro caia."
          },
          {
            id: "split_rush",
            icon: "🏰",
            name: "Rush de Inibidor / Troca de Base",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(50, "complex", "push"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "Inibidor Quebrado + Super Tropas Aliadas",
            failureConsequence: "Split-pusher cercado e Barão entregue",
            desc: "Enquanto o rival se distrai no covil, suas tropas arrombam a rota lateral e tentam derrubar o inibidor!"
          }
        ];
      } else {
        // Even
        baronEnemyAction = "Inimigos contestando visão na entrada do rio superior com sentinelas de controle.";
        baronOptions = [
          {
            id: "vision_siege",
            icon: "🛡️",
            name: "Controle de Visão & Farm Seguro",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(74, "simple", "tank"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Barão Negado ao Rival + Farm das 3 Rotas (+700g)",
            failureConsequence: "Recuo temporário sem sofrer mortes",
            desc: "Limpar as sentinelas do rio, manter o covil vigiado e farmar as rotas com total segurança."
          },
          {
            id: "all_in",
            icon: "👑",
            name: "Batalha 5v5 no Covil do Barão",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(60, "tactical", "damage"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Mão do Barão (+Buff) + 2 Abates Limpos",
            failureConsequence: "CBLOL rouba o Barão e empurra tropas",
            desc: "Luta coordenada 5v5 pelo bônus mais importante da partida."
          },
          {
            id: "baron_rush",
            icon: "⚡",
            name: "Iniciação Relâmpago no Barão",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(52, "complex", "combat"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "Barão Garantido de Surpresa + Pressão Total",
            failureConsequence: "Adversário colapsa no covil com contestação",
            desc: "Iniciar o Barão com tudo forçando o adversário a responder sob pânico e desorganização."
          }
        ];
      }

      const decisionData = {
        id: "baron",
        meta: {},
        badge: "CONFRONTO LENDÁRIO",
        title: "👑 O BARÃO NA'SHOR EMERGIU NO RIFT!",
        subtitle: "O bônus de Mão do Barão fortalece tropas e destrói bases. Como o time vai agir?",
        scouting: {
          intelTag: "📡 TELEMETRIA DE BARÃO NA'SHOR",
          enemyAction: baronEnemyAction
        },
        options: baronOptions
      };

      this._triggerTacticalDecision(decisionData);
      return true;
    }

    // 3. Dragão Elemental (a cada 5 min: 05:00, 10:00, 15:00...)
    if (this.gameSeconds >= this.nextDragonAt && this.gameSeconds < 1680) {
      this.nextDragonAt = this.gameSeconds + 300;
      const dragons = ["Infernal (+Dano)", "da Montanha (+Armadura)", "do Oceano (+Cura)", "das Nuvens (+Mobilidade)", "Hextec (+Aceleração)"];
      const dType = dragons[Math.floor(Math.random() * dragons.length)];

      let dragonEnemyAction = "";
      let dragonOptions = [];

      if (isAhead) {
        dragonEnemyAction = "CBLOL recuado sob suas torres externas, sem coragem de contestar o rio inferior.";
        dragonOptions = [
          {
            id: "dragon_rush",
            icon: "⚡",
            name: `Dominar Covil & Fazer Dragão Veloz`,
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(80, "simple", "damage"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: `Dragão ${dType} Garantido + Avanço Contínuo`,
            failureConsequence: "Atraso leve na captura sem mortes",
            desc: "Executar o monstro elemental rapidamente sem dar chance de reação e manter a pressão das rotas."
          },
          {
            id: "dragon_bait",
            icon: "🎯",
            name: "Bait no Covil & Wipe no Rio",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(70, "tactical", "combat"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `2 Abates Limpos + Dragão ${dType}`,
            failureConsequence: "Inimigos recuam e evitam a armadilha",
            desc: "Iniciar o monstro para forçar o CBLOL a checar o rio escuro e aniquilá-los com sua superioridade de dano."
          },
          {
            id: "fight",
            icon: "🔥",
            name: "Invadir Selva Inferior & Luta 5v5",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(62, "complex", "damage"),
            risk: "Alto Retorno",
            riskClass: "high",
            reward: `Massacre na Selva + Dragão ${dType} + Torres`,
            failureConsequence: "Troca estendida com perda temporária de ritmo",
            desc: "Invadir a selva adversária, caçar os defensores sob suas próprias sentinelas e levar o Dragão de bônus."
          }
        ];
      } else if (isBehind) {
        dragonEnemyAction = "Inimigos já posicionados no covil com sentinelas de controle e prioridade de bot lane.";
        dragonOptions = [
          {
            id: "cross_trade",
            icon: "🏰",
            name: "Ceder Dragão & Destruir Barricadas",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(75, "simple", "push"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "+600 Ouro em Placas de Torres sem Baixas",
            failureConsequence: "Dano leve em defesas sem mortes",
            desc: "Abre mão do dragão deliberadamente para punir o mapa do outro lado e farmar placas de ouro."
          },
          {
            id: "flank",
            icon: "🗡️",
            name: "Emboscada pelas Costas no Covil",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(50, "tactical", "combat"),
            risk: "Alto Risco",
            riskClass: "medium",
            reward: `Abate no Atirador Inimigo + Roubo do Dragão ${dType}`,
            failureConsequence: "Flanco interceptado e baixas sofridas",
            desc: "Surpreender a retaguarda inimiga enquanto eles gastam recursos e feitiços no monstro elemental."
          },
          {
            id: "steal",
            icon: "🎯",
            name: "Tentativa Heroica de Roubo no Smite",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(45, "complex", "utility", { requireRole: "jungle" }),
            risk: "Coin Flip",
            riskClass: "high",
            reward: `Dragão ${dType} Roubado com time seguro`,
            failureConsequence: "Smite falha e Caçador é abatido",
            desc: "O time segura as rotas enquanto o Caçador salta sozinho no covil para tentar o roubo no Golpe."
          }
        ];
      } else {
        // Even
        dragonEnemyAction = "Inimigos contestando visão no rio em igualdade de pressão de tropas.";
        dragonOptions = [
          {
            id: "dragon_zone",
            icon: "🛡️",
            name: "Zoneamento & Controle Territorial do Rio",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(74, "simple", "tank"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: `Dragão ${dType} com Posse Segura (+200g)`,
            failureConsequence: "Perda leve de tempo sem baixas",
            desc: "Drenar a visão inimiga, garantir a entrada do rio com sentinelas e abater o monstro com segurança."
          },
          {
            id: "fight",
            icon: "⚔️",
            name: "Forçar Teamfight 5v5 no Rio",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(60, "tactical", "damage"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `Dragão ${dType} + 2 Abates Inimigos`,
            failureConsequence: "CBLOL garante o dragão e pressão de rota",
            desc: "Reunir o time inteiro no rio e disputar o monstro elemental em igualdade de condições."
          },
          {
            id: "flank",
            icon: "🗡️",
            name: "Flanco Cirúrgico no Atirador",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(52, "complex", "damage"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "Eliminação Instantânea do ADC + Dragão",
            failureConsequence: "Sentinela revela flanqueador com punição",
            desc: "Flanquear pela selva adversária para deletar o Atirador rival no início do confronto."
          }
        ];
      }

      const decisionData = {
        id: "dragon",
        meta: { dType },
        badge: "OBJETIVO NEUTRO",
        title: `🐲 DRAGÃO ${dType.toUpperCase()} NASCEU NO COVIL!`,
        subtitle: `Ambas as equipes disputam o objetivo. Qual a decisão do seu time?`,
        scouting: {
          intelTag: "📡 RADAR DE OBJETIVO NEUTRO",
          enemyAction: dragonEnemyAction
        },
        options: dragonOptions
      };

      this._triggerTacticalDecision(decisionData);
      return true;
    }

    // 4. Arauto do Vale (entre 08:00 e 14:00, 1 vez por partida)
    if (!this.heraldTaken && this.gameSeconds >= 480 && this.gameSeconds < 840) {
      this.heraldTaken = true;

      let heraldEnemyAction = "";
      let heraldOptions = [];

      if (isAhead) {
        heraldEnemyAction = "CBLOL acuado sob as torres superiores temendo o avanço da sua equipe.";
        heraldOptions = [
          {
            id: "herald_fight",
            icon: "🛡️",
            name: "Garantir Arauto com Domínio do Rio",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(80, "simple", "combat"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Arauto Assegurado + Cabeçada na Torre (+350g)",
            failureConsequence: "Recuo ordenado sem perdas",
            desc: "Reunir Top e Caçador para assegurar o monstro sob controle total da visão superior."
          },
          {
            id: "herald_dive_mid",
            icon: "⚔️",
            name: "Arauto & Dive no Mid",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(68, "tactical", "damage"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Abate no Mid + Primeira Torre Central destruída (+400g)",
            failureConsequence: "Desarme sob a torre rival com recuo",
            desc: "Garantir o monstro e acelerar direto para a rota do meio, abatendo o adversário sob a torre!"
          },
          {
            id: "dive_bot",
            icon: "🏹",
            name: "Dive 4v2 na Rota Inferior",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(60, "complex", "damage"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "2 Abates no Bot + Primeira Torre do Jogo (+650g)",
            failureConsequence: "Torre defensiva pune com baixas aliadas",
            desc: "Ignorar o Arauto e criar superioridade na bot lane para abater os rivais e levar a Primeira Torre!"
          }
        ];
      } else if (isBehind) {
        heraldEnemyAction = "CBLOL com 3 jogadores dominando o rio superior e fazendo o Arauto com tranquilidade.";
        heraldOptions = [
          {
            id: "cross_trade_herald",
            icon: "🛡️",
            name: "Ceder Arauto & Farm Seguro de Barricadas",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(72, "simple", "push"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Absorção sem Mortes + Ouro de Barricadas (+350g)",
            failureConsequence: "Perda passageira de barricada sem mortes",
            desc: "Concede o Arauto, recua sob a proteção da torre e cobra recursos na rota oposta com segurança."
          },
          {
            id: "bush_trap",
            icon: "🌿",
            name: "Emboscada de Retorno no Arbusto",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(50, "tactical", "combat"),
            risk: "Alto Risco",
            riskClass: "medium",
            reward: "Abate de Retorno + Roubo do Arauto",
            failureConsequence: "Emboscada revelada por sentinela e torre danificada",
            desc: "Aguardar a passagem dos inimigos no arbusto do rio para tentar uma eliminação de retorno."
          },
          {
            id: "dive_bot",
            icon: "🏹",
            name: "Dive Desesperado 4v2 no Bot",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(48, "complex", "damage"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "2 Abates no Bot + Primeira Torre do Jogo",
            failureConsequence: "Torre inimiga pune com baixas aliadas",
            desc: "Descer com tudo na bot lane tentando a Primeira Torre antes que o Arauto colida no Top!"
          }
        ];
      } else {
        // Even
        heraldEnemyAction = "Caçador e Top Laner adversários iniciando o Arauto, deixando a bot lane isolada 2v2.";
        heraldOptions = [
          {
            id: "vision_control",
            icon: "🛡️",
            name: "Defesa sob a Torre & Farm Seguro",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: this._calculateSuccessProbability(74, "simple", "tank"),
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Absorção sem Dano + Ouro Seguro de Farm",
            failureConsequence: "Perda passageira de barricada sem mortes",
            desc: "Concede o Arauto com calma, recua sob a proteção da torre e absorve o impacto com segurança."
          },
          {
            id: "herald_fight",
            icon: "⚔️",
            name: "Batalha 3v3 no Rio Superior",
            complexity: "tactical",
            complexityLabel: "🟡 Jogada Tática",
            probability: this._calculateSuccessProbability(60, "tactical", "combat"),
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Arauto Garantido + Cabeçada na Torre Rival",
            failureConsequence: "CBLOL vence o 3v3 e avança contra sua torre",
            desc: "Reunir o Top Laner e Caçador para colidir no rio e garantir o monstro."
          },
          {
            id: "dive_bot",
            icon: "🏹",
            name: "Dive 4v2 na Rota Inferior",
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: this._calculateSuccessProbability(52, "complex", "damage"),
            risk: "Alto Risco",
            riskClass: "high",
            reward: "2 Abates no Bot + Primeira Torre do Jogo",
            failureConsequence: "Torre inimiga pune com baixas aliadas",
            desc: "Ignorar o Arauto e criar superioridade na bot lane para abater os rivais e levar a torre."
          }
        ];
      }

      const decisionData = {
        id: "herald",
        meta: {},
        badge: "PRESSÃO DE EARLY GAME",
        title: "👁️ O ARAUTO DO VALE SURGIU NO RIO SUPERIOR!",
        subtitle: "O Olho do Arauto derruba barricadas de torre. Como vamos responder?",
        scouting: {
          intelTag: "📡 TELEMETRIA DE EARLY GAME",
          enemyAction: heraldEnemyAction
        },
        options: heraldOptions
      };

      this._triggerTacticalDecision(decisionData);
      return true;
    }

    return false;
  }

  _checkDynamicIncidents() {
    if (this.gameSeconds < 180) return false;
    if (this.isFinished || this.activeDecision) return false;
    if (this.gameSeconds < this.nextDynamicIncidentAt) return false;

    // Evita sobreposição com objetivos neutros iminentes (janela de 45 segundos)
    const isDragonNear = (this.nextDragonAt - this.gameSeconds > 0 && this.nextDragonAt - this.gameSeconds < 45);
    const isBaronNear = (this.nextBaronAt - this.gameSeconds > 0 && this.nextBaronAt - this.gameSeconds < 45);
    const isHeraldNear = (!this.heraldTaken && this.gameSeconds >= 450 && this.gameSeconds < 510);
    const isElderNear = (this.nextElderAt - this.gameSeconds > 0 && this.nextElderAt - this.gameSeconds < 45);

    if (isDragonNear || isBaronNear || isHeraldNear || isElderNear) {
      this.nextDynamicIncidentAt = this.gameSeconds + 60;
      return false;
    }

    // Agenda o próximo incidente dinâmico (a cada 210 a 330 segundos simulados)
    this.nextDynamicIncidentAt = this.gameSeconds + 210 + Math.floor(Math.random() * 90);

    const goldDiff = this.blueScore.gold - this.redScore.gold;
    const isAhead = (goldDiff >= 1200) || (this.lanePressure >= 25);
    const isBehind = (goldDiff <= -1200) || (this.lanePressure <= -25);
    const phase = this.gameSeconds < 720 ? "early" : (this.gameSeconds < 1500 ? "mid" : "late");

    // Pool de tipos candidatos
    const candidateTypes = ["top_lane", "jungle_river", "mid_lane", "bot_lane"];
    if (isAhead) candidateTypes.push("situational_snowball");
    if (isBehind) candidateTypes.push("situational_comeback");
    if (phase !== "early" && !isAhead && !isBehind) candidateTypes.push("situational_clash");

    // Candidato: Risco de Gank sob a Torre se alguma rota estiver pressionando debaixo da torre inimiga
    const hasOverextendedLane = ["top", "mid", "bot"].some(l => (this.lanePressures[l] || 0) >= 26);
    if (hasOverextendedLane) {
      candidateTypes.push("overextend_gank_threat");
    }

    // Candidato: Dilema Macro de Agrupar 5v5 vs Split Push no mid/late game
    if (phase !== "early") {
      candidateTypes.push("split_vs_group_dilemma");
    }

    // Filtra para garantir variedade (evita o mesmo tipo nos últimos 2 incidentes)
    const recentHistory = this.incidentHistory.slice(-2);
    let eligiblePool = candidateTypes.filter(t => !recentHistory.includes(t));
    if (eligiblePool.length === 0) eligiblePool = candidateTypes;

    const chosenType = eligiblePool[Math.floor(Math.random() * eligiblePool.length)];
    this.incidentHistory.push(chosenType);
    if (this.incidentHistory.length > 12) this.incidentHistory.shift();

    const decisionData = this._buildDynamicIncidentData(chosenType, phase, isAhead, isBehind);
    if (decisionData) {
      this._triggerTacticalDecision(decisionData);
      return true;
    }
    return false;
  }

  _buildDynamicIncidentData(type, phase, isAhead, isBehind) {
    const bTop = this.blueRosterState.top?.name || "Top";
    const bJg = this.blueRosterState.jungle?.name || "Caçador";
    const bMid = this.blueRosterState.mid?.name || "Mid";
    const bAdc = this.blueRosterState.adc?.name || "Atirador";
    const bSupp = this.blueRosterState.support?.name || "Suporte";

    const rTop = this.redRosterState.top?.name || "Top Rival";
    const rJg = this.redRosterState.jungle?.name || "Caçador Rival";
    const rMid = this.redRosterState.mid?.name || "Mid Rival";
    const rAdc = this.redRosterState.adc?.name || "ADC Rival";
    const rSupp = this.redRosterState.support?.name || "Suporte Rival";

    const timeStr = this._formatTime();

    if (type === "top_lane") {
      const isEarly = phase === "early";
      const probFreeze = this._calculateSuccessProbability(78, "simple", "combat");
      const probCrash = this._calculateSuccessProbability(68, "tactical", "push");
      const probDive = this._calculateSuccessProbability(58, "complex", "damage");

      return {
        id: `dynamic_top_${this.gameSeconds}`,
        meta: { targetLane: "top" },
        badge: `ROTA SUPERIOR • ${timeStr}`,
        title: isEarly ? "🏔️ ROTA SUPERIOR: GESTÃO DE ONDA & DUELO 1v1" : "🏔️ ROTA SUPERIOR: SPLIT PUSH & PRESSÃO LATERAL",
        subtitle: isEarly
          ? `A onda de tropas colidiu na rota superior. Qual postura estratégica ${bTop} deve adotar contra ${rTop}?`
          : `${bTop} está isolado empurrando a rota lateral. Qual será o objetivo estratégico no Topo?`,
        scouting: {
          intelTag: "📡 RADAR DA ROTA SUPERIOR (TOP)",
          enemyAction: `${rTop} jogando em volta da onda de minions • ${rJg} observado no quadrante superior do mapa.`
        },
        options: [
          {
            id: "top_freeze_control",
            icon: "❄️",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Congelar a Onda & Negar Farm a ${rTop}`,
            complexity: "simple",
            complexityLabel: "🟢 Controle de Rota",
            probability: probFreeze,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: "Controle Seguro da Rota + Vantagem Econômica de CS (+250g)",
            failureConsequence: `${rTop} quebra o congelamento com magias de área`,
            desc: `Manter as tropas recuadas perto da torre aliada, forçando ${rTop} a se expor perigosamente ou perder ouro e experiência.`
          },
          {
            id: "top_crash_plates",
            icon: "🏰",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Crash sob a Torre & Destruição de Barricadas`,
            complexity: "tactical",
            complexityLabel: "🟡 Agressão a Estruturas",
            probability: probCrash,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Dano Pesado na T1 do Topo + Coleta de Placas de Ouro (+400g)",
            failureConsequence: `${rTop} defende sob a torre sem ceder placas`,
            desc: `Empurrar uma grande onda de tropas até a torre inimiga para permitir que ${bTop} golpeie a estrutura e arranque ouro de placas.`
          },
          {
            id: "top_dive_lethal",
            icon: "⚡",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `All-In / Dive Letal sob a Torre com ${bTop} & ${bJg}`,
            complexity: "complex",
            complexityLabel: "🔴 Jogada Ousada",
            probability: probDive,
            risk: "Alto Risco / Alto Retorno",
            riskClass: "high",
            reward: `Eliminação de ${rTop} (+400g) + Pressão Máxima no Topo (+35%)`,
            failureConsequence: `${rTop} esquiva sob a torre e garante contra-kill`,
            desc: `Coordenar um mergulho fulminante sob a torre adversária com ${bTop} e ${bJg} para desintegrar ${rTop} e escancarar a rota.`
          }
        ]
      };
    }

    if (type === "jungle_river") {
      const probScuttle = this._calculateSuccessProbability(75, "simple", "combat");
      const probInvade = this._calculateSuccessProbability(68, "tactical", "utility");
      const probGank = this._calculateSuccessProbability(62, "complex", "damage");

      return {
        id: `dynamic_jungle_${this.gameSeconds}`,
        meta: { targetLane: "jungle" },
        badge: `SELVA & RIO • ${timeStr}`,
        title: "🌲 SELVA & RIO: DISPUTA DE ARONGUEJO & INVASÃO",
        subtitle: `${bJg} detectou o caçador rival ${rJg} disputando o controle do rio e dos acampamentos neutros.`,
        scouting: {
          intelTag: "📡 TELEMETRIA DA SELVA & RIO",
          enemyAction: `${rJg} patrulhando a entrada do rio • Disputa tensa pelo controle de sentinelas e visão de covil.`
        },
        options: [
          {
            id: "jg_scuttle_contest",
            icon: "🦀",
            zone: "jungle",
            zoneLabel: "🌲 SELVA & RIO",
            name: `Batalha pelo Aronguejo com Cobertura de ${bMid}`,
            complexity: "simple",
            complexityLabel: "🟢 Domínio de Rio",
            probability: probScuttle,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: "Aronguejo Abatido + Visão e Velocidade no Rio (+Buff de Rio)",
            failureConsequence: `${rJg} rouba no Golpear à distância`,
            desc: `Contestar o monstro do rio com auxílio direto de ${bMid}, garantindo visão da rotação e velocidade de movimento no rio.`
          },
          {
            id: "jg_cross_invade",
            icon: "⚔️",
            zone: "jungle",
            zoneLabel: "🌲 SELVA & RIO",
            name: `Invasão Cruzada: Roubar Buffs da Selva Rival`,
            complexity: "tactical",
            complexityLabel: "🟡 Saque de Recursos",
            probability: probInvade,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `Buff Inimigo Roubado (+350g) + Atraso Severo no Farm de ${rJg}`,
            failureConsequence: `CBLOL colapsa na selva com suporte`,
            desc: `Ignorar o rio para invadir o quadrante oposto da selva do CBLOL, roubando monstros de alto valor e enfraquecendo o caçador inimigo.`
          },
          {
            id: "jg_lane_gank",
            icon: "🎯",
            zone: "jungle",
            zoneLabel: "🌲 SELVA & RIO",
            name: `Emboscada Relâmpago de ${bJg} na Rota Avançada`,
            complexity: "complex",
            complexityLabel: "🔴 Gank Mortal",
            probability: probGank,
            risk: "Alto Retorno",
            riskClass: "high",
            reward: "Gank Perfeito com Abate (+350g) + Avanço de Torre na Rota",
            failureConsequence: "Alvo rival escapa com Flash sob a torre",
            desc: `Surpreender as linhas adversárias com um gank fulminante pelas costas, convertendo a emboscada em abates e pressão de torre.`
          }
        ]
      };
    }

    if (type === "mid_lane") {
      const probRoam = this._calculateSuccessProbability(68, "tactical", "damage");
      const probSiege = this._calculateSuccessProbability(76, "simple", "push");
      const probBurst = this._calculateSuccessProbability(60, "complex", "combat");

      return {
        id: `dynamic_mid_${this.gameSeconds}`,
        meta: { targetLane: "mid" },
        badge: `ROTA DO MEIO • ${timeStr}`,
        title: "⚡ ROTA DO MEIO: PRIORIDADE CENTRAL & ROAMING",
        subtitle: `${bMid} limpou as tropas no centro do mapa e abriu janela decisiva para ditar o ritmo contra ${rMid}.`,
        scouting: {
          intelTag: "📡 RADAR CENTRAL (MID)",
          enemyAction: `${rMid} sob a torre limpando tropas • Rotas laterais vulneráveis a rotações rápidas pelo rio.`
        },
        options: [
          {
            id: "mid_roam_bot",
            icon: "🏹",
            zone: "mid",
            zoneLabel: "⚡ ROTA DO MEIO",
            name: `Roaming Rápido de ${bMid} para a Rota Inferior`,
            complexity: "tactical",
            complexityLabel: "🟡 Rotação Ofensiva",
            probability: probRoam,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Abate no Bot (+450g) + Caminho Aberto para o Dragão",
            failureConsequence: "Bot rival percebe a descida e recua a tempo",
            desc: `Descer pelo rio em velocidade máxima para transformar a disputa da rota inferior em uma investida 3v2 fulminante.`
          },
          {
            id: "mid_siege_t1",
            icon: "⚡",
            zone: "mid",
            zoneLabel: "⚡ ROTA DO MEIO",
            name: `Pressão Direta na Torre Central com ${bMid}`,
            complexity: "simple",
            complexityLabel: "🟢 Cerco Central",
            probability: probSiege,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: "Dano Massivo na Torre Central + Domínio do Meio (+350g)",
            failureConsequence: `${rMid} limpa onda de longe e segura a estrutura`,
            desc: `Castigar a torre central inimiga com dano de habilidades e tropas, sufocando ${rMid} e abrindo o centro do mapa.`
          },
          {
            id: "mid_burst_duel",
            icon: "💥",
            zone: "mid",
            zoneLabel: "⚡ ROTA DO MEIO",
            name: `Duelo de Magos: Combo All-In contra ${rMid}`,
            complexity: "complex",
            complexityLabel: "🔴 Outplay Mecânico",
            probability: probBurst,
            risk: "Alto Risco / Alto Retorno",
            riskClass: "high",
            reward: `Solo Kill no Mid (+350g) + Buff Domínio do Rio (+8 Combate)`,
            failureConsequence: `${rMid} esquiva do combo e revida com dano letal`,
            desc: `Conectar a habilidade principal de controle de grupo e descarregar todo o arsenal mágico para desintegrar ${rMid} no centro.`
          }
        ]
      };
    }

    if (type === "bot_lane") {
      const probAllin = this._calculateSuccessProbability(64, "complex", "combat");
      const probDragon = this._calculateSuccessProbability(75, "simple", "utility");
      const probPlates = this._calculateSuccessProbability(70, "tactical", "push");

      return {
        id: `dynamic_bot_${this.gameSeconds}`,
        meta: { targetLane: "bot" },
        badge: `ROTA INFERIOR • ${timeStr}`,
        title: "🏹 ROTA INFERIOR: COMBATE 2v2 & CONTROLE DO COVIL",
        subtitle: `${bAdc} e ${bSupp} engajaram em trocas intensas na Rota Inferior contra ${rAdc} e ${rSupp}.`,
        scouting: {
          intelTag: "📡 RADAR DA ROTA INFERIOR (BOT)",
          enemyAction: `${rAdc} e ${rSupp} trocando dano na linha de frente • Covil do Dragão desprotegido no rio inferior.`
        },
        options: [
          {
            id: "bot_allin_2v2",
            icon: "🏹",
            zone: "bot",
            zoneLabel: "🏹 ROTA INFERIOR",
            name: `All-In 2v2 com Engage de ${bSupp} & Críticos de ${bAdc}`,
            complexity: "complex",
            complexityLabel: "🔴 Confronto Direto",
            probability: probAllin,
            risk: "Alto Retorno",
            riskClass: "high",
            reward: `Abate Duplo no Bot (+400g) + Barricadas do Bot Destruídas`,
            failureConsequence: "Duo rival ativa Exaustão e vira a luta sob a torre",
            desc: `Forçar combate de vida ou morte no 2v2 com iniciação agressiva do suporte e finalização de ${bAdc}.`
          },
          {
            id: "bot_sneak_dragon",
            icon: "🐲",
            zone: "bot",
            zoneLabel: "🏹 ROTA INFERIOR",
            name: `Empurrar Onda e Fazer Dragão Elemental em Segredo`,
            complexity: "simple",
            complexityLabel: "🟢 Objetivo Furtivo",
            probability: probDragon,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: "Dragão Elemental Adiantado + Buff de Bênção (+300g)",
            failureConsequence: "Sentinela rival detecta o início e força recuo",
            desc: `Aproveitar a pressão da rota para deslizar furtivamente até o covil do Dragão e abater o monstro sem contestação.`
          },
          {
            id: "bot_zone_plates",
            icon: "🛡️",
            zone: "bot",
            zoneLabel: "🏹 ROTA INFERIOR",
            name: `Zoneamento de Tropas & Demolição da Torre do Bot`,
            complexity: "tactical",
            complexityLabel: "🟡 Sufocamento de CS",
            probability: probPlates,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Torre do Bot Castigada (+400g) + Supressão de CS do ADC Rival",
            failureConsequence: "CBLOL defende as tropas sem ceder placas",
            desc: `Prender o duo rival sob a torre, negando farm de tropas e arrancando ouro valioso das placas de estrutura.`
          }
        ]
      };
    }

    if (type === "situational_snowball") {
      const probMultiDive = this._calculateSuccessProbability(72, "complex", "damage");
      const probInvadeCamps = this._calculateSuccessProbability(82, "simple", "utility");
      const probBait = this._calculateSuccessProbability(74, "tactical", "combat");

      return {
        id: `dynamic_snowball_${this.gameSeconds}`,
        meta: { targetLane: "all" },
        badge: `MOMENTO DE JOGO • DOMÍNIO & SNOWBALL`,
        title: "👑 MAPA ABERTO: DIVE COORDENADO & SUFOCAMENTO",
        subtitle: `Sua equipe acumula vantagem substancial de ouro e itens. Como transformar essa liderança em vitória no Rift?`,
        scouting: {
          intelTag: "📡 TELEMETRIA DE LIDERANÇA",
          enemyAction: "CBLOL acuado na defensiva tentando defender suas torres externas e proteger suas entradas de base."
        },
        options: [
          {
            id: "snowball_multi_dive",
            icon: "⚡",
            zone: "map",
            zoneLabel: "⚔️ MAPA GLOBAL",
            name: `Dive Coordenado na Rota mais Frágil do Inimigo`,
            complexity: "complex",
            complexityLabel: "🔴 Aceleração Mortal",
            probability: probMultiDive,
            risk: "Alto Retorno",
            riskClass: "high",
            reward: "Torre Destruída (+550g) + Múltiplos Abates + Base Aberta",
            failureConsequence: "CBLOL gasta recursos e impede a queda da torre",
            desc: `Marchar em grupo para mergulhar sob a torre do adversário, aniquilar defensores e aproximar a partida do Nexus.`
          },
          {
            id: "snowball_invade_camps",
            icon: "🌲",
            zone: "jungle",
            zoneLabel: "🌲 SELVA & RIO",
            name: `Invasão Total da Selva Inimiga & Roubo de Recursos`,
            complexity: "simple",
            complexityLabel: "🟢 Sufocamento Econômico",
            probability: probInvadeCamps,
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: "Sufocamento Econômico (+500g) + Visão da Base Inimiga",
            failureConsequence: "CBLOL agrupa na entrada da base e bloqueia a invasão",
            desc: `Saquear completamente os acampamentos do CBLOL, privando o adversário de qualquer recurso ou experiência.`
          },
          {
            id: "snowball_baron_bait",
            icon: "👑",
            zone: "map",
            zoneLabel: "⚔️ MAPA GLOBAL",
            name: `Isca no Covil do Barão / Armadilha na Moita no Escuro`,
            complexity: "tactical",
            complexityLabel: "🟡 Emboscada Coordenada",
            probability: probBait,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Emboscada com Eliminações (+600g) + Vitória Próxima",
            failureConsequence: "CBLOL desconfia da isca e prefere não contestar",
            desc: `Simular o início do monstro épico para obrigar o CBLOL a avançar às cegas no rio e pegá-los em uma emboscada fatal.`
          }
        ]
      };
    }

    if (type === "situational_comeback") {
      const probDef = this._calculateSuccessProbability(65, "tactical", "combat");
      const probCross = this._calculateSuccessProbability(76, "simple", "push");
      const probSmite = this._calculateSuccessProbability(52, "complex", "utility");

      return {
        id: `dynamic_comeback_${this.gameSeconds}`,
        meta: { targetLane: "all" },
        badge: `MOMENTO DE JOGO • DEFESA HEROICA & VIRADA`,
        title: "🛡️ PRESSÃO RIVAL: DEFESA SOB A TORRE & VIRADA",
        subtitle: "O CBLOL está avançando com vantagem econômica. Sua equipe precisa de uma resposta tática precisa para virar a partida!",
        scouting: {
          intelTag: "📡 RADAR DE ALERTA DEFENSIVO",
          enemyAction: "CBLOL agrupando na tentativa de forçar cerco nas defesas da sua equipe."
        },
        options: [
          {
            id: "comeback_tower_defense",
            icon: "🛡️",
            zone: "map",
            zoneLabel: "⚔️ MAPA GLOBAL",
            name: `Contra-Ataque sob o Fogo da Torre Aliada`,
            complexity: "tactical",
            complexityLabel: "🟡 Virada Defensiva",
            probability: probDef,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Super Shutdown Coletado (+700g Bônus!) + Virada de Pressão",
            failureConsequence: "Dano rival quebra a linha defensiva da torre",
            desc: `Atrair a investida inimiga para o alcance da torre aliada e usar todo o controle de grupo para abater os carregadores adversários.`
          },
          {
            id: "comeback_cross_trade",
            icon: "🏔️",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Jogada Cruzada: Ceder Objetivo e Levar Torres Opostas`,
            complexity: "simple",
            complexityLabel: "🟢 Macro de Troca",
            probability: probCross,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: "2 Torres Opostas Derrubadas (+650g de Ouro Global de Virada)",
            failureConsequence: "Onda de tropas não chega a tempo de levar a estrutura",
            desc: `Enquanto o CBLOL gasta tempo no objetivo, marchar veloz no lado oposto do mapa para faturar ouro maciço de torres.`
          },
          {
            id: "comeback_smite_steal",
            icon: "⚡",
            zone: "jungle",
            zoneLabel: "🌲 SELVA & RIO",
            name: `Investida Kamikaze de ${bJg} para Roubo com Golpear`,
            complexity: "complex",
            complexityLabel: "🔴 Roubo Heroico",
            probability: probSmite,
            risk: "Alto Risco / Lendário Retorno",
            riskClass: "high",
            reward: "ROUBO MILAGROSO DE SMITE (+Buff de Alma) + Moral Restaurado!",
            failureConsequence: `${bJg} cai no ninho na tentativa de roubo`,
            desc: `Enviar ${bJg} sozinho em jogada suicida para flashar dentro do covil e roubar o monstro neutro no milissegundo final.`
          }
        ]
      };
    }

    if (type === "situational_clash") {
      const probTP = this._calculateSuccessProbability(65, "complex", "combat");
      const probF2B = this._calculateSuccessProbability(75, "simple", "combat");
      const probPoke = this._calculateSuccessProbability(70, "tactical", "damage");

    return {
      id: `dynamic_clash_${this.gameSeconds}`,
      meta: { targetLane: "all" },
      badge: `MOMENTO DE JOGO • CLASH DECISIVO`,
      title: "⚔️ CONFRONTO DECISIVO: POSICIONAMENTO DE TEAMFIGHT",
      subtitle: "Jogo parelho no Summoner's Rift! As equipes se encaram no rio. Quem errar o passo perde a partida!",
      scouting: {
        intelTag: "📡 TELEMETRIA DE CONFRONTO 5v5",
        enemyAction: "Times posicionados em volta do rio em tensão máxima aguardando o primeiro engage."
      },
      options: [
        {
          id: "clash_tp_flank",
          icon: "🏔️",
          zone: "top",
          zoneLabel: "🏔️ ROTA SUPERIOR",
          name: `Flanco de Teleporte de ${bTop} nas Costas do CBLOL`,
          complexity: "complex",
          complexityLabel: "🔴 Flanco Surpresa",
          probability: probTP,
          risk: "Alto Retorno",
          riskClass: "high",
          reward: "Linha de Trás Inimiga Destruída (+550g) + Vitória no Confronto",
          failureConsequence: "Flanco é focado e eliminado na chegada",
          desc: `Surpreender o adversário pelas costas com ${bTop} surgindo em sentinela avançada para explodir os atiradores rivais.`
        },
        {
          id: "clash_front_to_back",
          icon: "🛡️",
          zone: "mid",
          zoneLabel: "⚡ ROTA DO MEIO",
          name: `Luta Front-to-Back com Proteção Total a ${bAdc}`,
          complexity: "simple",
          complexityLabel: "🟢 Formação Fechada",
          probability: probF2B,
          risk: "Baixo Risco",
          riskClass: "low",
          reward: "Vitória Disciplinada na Luta (+500g) + Avanço Central",
          failureConsequence: "Assassino adversário encontra brecha na linha de trás",
          desc: `Manter a equipe unida, absorver o dano inimigo com os tanques e permitir que ${bAdc} cause dano constante e seguro.`
        },
        {
          id: "clash_poke_kite",
          icon: "🏹",
          zone: "bot",
          zoneLabel: "🏹 ROTA INFERIOR",
          name: `Desgaste à Distância (Poke & Kite) com ${bMid}`,
          complexity: "tactical",
          complexityLabel: "🟡 Desgaste de Cerco",
          probability: probPoke,
          risk: "Médio Risco",
          riskClass: "medium",
          reward: "CBLOL Forçado a Recuar com Pouca Vida + Estruturas Livres (+450g)",
          failureConsequence: "Engage rápido do adversário impede o desgaste",
          desc: `Usar magias de longo alcance para esvaziar as barras de vida inimigas antes do choque corporal, forçando o rival a ceder espaço.`
        }
      ]
    };
  }

    if (type === "overextend_gank_threat") {
      const lanes = ["top", "mid", "bot"];
      lanes.sort((a, b) => (this.lanePressures[b] || 0) - (this.lanePressures[a] || 0));
      const targetLane = lanes[0] || "mid";
      const laneName = targetLane === "top" ? "ROTA SUPERIOR" : (targetLane === "mid" ? "ROTA DO MEIO" : "ROTA INFERIOR");
      const laneIcon = targetLane === "top" ? "🏔️" : (targetLane === "mid" ? "⚡" : "🏹");
      const allyName = targetLane === "top" ? bTop : (targetLane === "mid" ? bMid : `${bAdc} e ${bSupp}`);
      const rivalName = targetLane === "top" ? rTop : (targetLane === "mid" ? rMid : `${rAdc} e ${rSupp}`);

      const probRetreat = this._calculateSuccessProbability(80, "simple", "utility");
      const probGreed = this._calculateSuccessProbability(62, "tactical", "push");
      const probTurn = this._calculateSuccessProbability(48, "complex", "combat");

      return {
        id: `dynamic_overextend_${this.gameSeconds}`,
        meta: { targetLane },
        badge: `⚠️ PERIGO DE GANK • ${timeStr}`,
        title: `${laneIcon} ${laneName}: OPRESSÃO SOB A TORRE & RISCO DE GANK!`,
        subtitle: `${allyName} empurrou as tropas até a torre inimiga! Mas o caçador adversário ${rJg} sumiu da fumaça e prepara um flanco fatal pelas costas!`,
        scouting: {
          intelTag: `📡 ALERTA DE FLANCO NA ${laneName}`,
          enemyAction: `${rJg} aproximando-se pelas costas • ${rivalName} segurando a rota aguardando a pinça sob a torre.`
        },
        options: [
          {
            id: "overextend_retreat",
            icon: "🛡️",
            zone: targetLane,
            zoneLabel: `${laneIcon} ${laneName}`,
            name: "Recuo Tático & Sentinela Defensiva",
            complexity: "simple",
            complexityLabel: "🟢 Opção Segura",
            probability: probRetreat,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: `Gank Frustrado de ${rJg} + Onda Resetada (+180g Farm)`,
            failureConsequence: "Gasta um feitiço de invocador defensivo sem morrer",
            desc: `Resetar a onda de tropas, plantar sentinela no rio e recuar com segurança, frustrando a emboscada do caçador adversário.`
          },
          {
            id: "overextend_greed_plates",
            icon: "🔨",
            zone: targetLane,
            zoneLabel: `${laneIcon} ${laneName}`,
            name: "Arrancar Barricada & Flash de Fuga",
            complexity: "tactical",
            complexityLabel: "🟡 Ganância & Reflexo",
            probability: probGreed,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Ouro de Barricada (+350g) + Fuga no Limite",
            failureConsequence: `A pinça inimiga fecha rápido demais e ${rJg} garante o abate`,
            desc: `Desferir golpes extras para coletar o ouro de placas da torre e queimar o Flash imediatamente na aproximação do caçador.`
          },
          {
            id: "overextend_all_in_dive",
            icon: "💥",
            zone: targetLane,
            zoneLabel: `${laneIcon} ${laneName}`,
            name: "All-in no Dive 2v1 / 2v2 (Paz Nunca Foi Opção)",
            complexity: "complex",
            complexityLabel: "🔴 All-In Insano",
            probability: probTurn,
            risk: "Alto Risco",
            riskClass: "high",
            reward: "Double Kill Lendário (+600g) + Torre Derrubada",
            failureConsequence: "Morte sob a torre e Shutdown concedido ao adversário",
            desc: `Em vez de fugir, forçar um dive implacável sob a torre para eliminar o defensor antes da chegada do caçador!`
          }
        ]
      };
    }

    if (type === "split_vs_group_dilemma") {
      const probGroup = this._calculateSuccessProbability(72, "simple", "combat");
      const probSplit = this._calculateSuccessProbability(62, "tactical", "push");
      const probTpFlank = this._calculateSuccessProbability(52, "complex", "macro");

      return {
        id: `dynamic_split_vs_group_${this.gameSeconds}`,
        meta: {},
        badge: `⚔️ DILEMA MACRO • ${timeStr}`,
        title: "⚔️ MACRO: 5v5 NO OBJETIVO OU SPLIT PUSH NA ROTA LATERAL?",
        subtitle: `O time adversário começou a se reunir em peso para disputar o objetivo no rio! Qual posicionamento sua equipe adotará?`,
        scouting: {
          intelTag: "📡 RADAR DE POSICIONAMENTO GLOBAL",
          enemyAction: `5 jogadores adversários agrupados contestando o rio • Torres laterais opostas desprotegidas.`
        },
        options: [
          {
            id: "macro_group_5v5",
            icon: "🛡️",
            zone: "jungle",
            zoneLabel: "🌲 RIO & COVIL",
            name: "Agrupar os 5 Jogadores para a Disputa Coletiva",
            complexity: "simple",
            complexityLabel: "🟢 Agrupamento Clássico",
            probability: probGroup,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: "Vitória Coletiva na Luta (+500g) + Objetivo Assegurado",
            failureConsequence: "Luta disputada no rio com recursos e vidas trocadas",
            desc: `Unir os 5 campeões na boca do covil, garantindo controle de grupo e choque em bloco pela disputa do monstro neutro.`
          },
          {
            id: "macro_split_pressure",
            icon: "🏔️",
            zone: "top",
            zoneLabel: "🏔️ ROTA LATERAL",
            name: `Manter Split Push com ${bTop} na Rota Oposta`,
            complexity: "tactical",
            complexityLabel: "🟡 Troca Cruzada de Mapa",
            probability: probSplit,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: "Torre T2/Inibidor Oposto Destruído (+650g) + Pressão Permanente",
            failureConsequence: "Adversário força engage 5v4 veloz no covil antes da queda da torre",
            desc: `4 jogadores atrasam o adversário no rio com habilidades de longo alcance enquanto ${bTop} derrete as torres na rota contrária!`
          },
          {
            id: "macro_split_tp_flank",
            icon: "⚡",
            zone: "mid",
            zoneLabel: "⚡ FLANCO GLOBAL",
            name: `Isca de Split & Flanco com Teleporte (Armadilha 5v3)`,
            complexity: "complex",
            complexityLabel: "🔴 Macro Lendário",
            probability: probTpFlank,
            risk: "Alto Risco",
            riskClass: "high",
            reward: "Massacre 5v3 pelas Costas (+700g) + Barão/Dragão Garantido",
            failureConsequence: "Teleporte interrompido por controle de grupo ou tempo de canalização",
            desc: `${bTop} atrai 2 defensores para a rota lateral e imediatamente usa o Teleporte em sentinela profunda nas costas do time rival!`
          }
        ]
      };
    }

    return null;
  }

  _buildPostTowerDecision(target, lane) {
    const timeStr = this._formatTime();
    const laneName = lane === "top" ? "ROTA SUPERIOR" : (lane === "bot" ? "ROTA INFERIOR" : "ROTA DO MEIO");
    const laneIcon = lane === "top" ? "🏔️" : (lane === "bot" ? "🏹" : "⚡");

    const probSwap = this._calculateSuccessProbability(75, "simple", "macro");
    const probInvade = this._calculateSuccessProbability(66, "tactical", "utility");
    const probShoveT2 = this._calculateSuccessProbability(52, "complex", "push");

    return {
      id: `post_tower_${this.gameSeconds}`,
      meta: { lane, targetId: target.id },
      badge: `🏰 TORRE DERRUBADA • ${timeStr}`,
      title: `🏰 TORRE DERRUBADA: TRANSIÇÃO DE MAPA!`,
      subtitle: `A ${target.name} ruiu! O mapa se abriu e as defesas do CBLOL ficaram vulneráveis. Qual transição tática imediata executar?`,
      scouting: {
        intelTag: "📡 MAPA ABERTO • RECONHECIMENTO",
        enemyAction: "Defesas adversárias recuando desorganizadas • Selva do quadrante exposta sem proteção de torre."
      },
      options: [
        {
          id: "tower_lane_swap",
          icon: "⚡",
          zone: "mid",
          zoneLabel: "⚡ ROTA DO MEIO",
          name: "Inversão de Rotas (Lane Swap: Rotação para o Meio)",
          complexity: "simple",
          complexityLabel: "🟢 Rotação de Livro",
          probability: probSwap,
          risk: "Baixo Risco",
          riskClass: "low",
          reward: "Pressão na T1 Central (+350g) + Controle Permanente do Rio",
          failureConsequence: "Adversário espelha a rotação e limpa as tropas sob a torre",
          desc: "Rotacionar imediatamente para a Rota do Meio para aplicar cerco e derrubar a T1 Mid, abrindo o controle dos dois lados do rio."
        },
        {
          id: "tower_deep_invade",
          icon: "🌲",
          zone: "jungle",
          zoneLabel: "🌲 SELVA ADVERSÁRIA",
          name: "Invasão Profunda da Selva Exposta",
          complexity: "tactical",
          complexityLabel: "🟡 Saque Estratégico",
          probability: probInvade,
          risk: "Médio Risco",
          riskClass: "medium",
          reward: "Saque de Buffs (+350g) + Buff de Visão Profunda (+10 Combate)",
          failureConsequence: "Campos já estavam limpos e time adversário se reagrupa",
          desc: "Aproveitar o vazio territorial para invadir o quadrante da selva inimiga, roubar buffs e plantar sentinelas na fumaça."
        },
        {
          id: "tower_shove_t2",
          icon: "🔨",
          zone: lane,
          zoneLabel: `${laneIcon} ${laneName}`,
          name: "Avanço Ganancioso na T2 (Cerco Agressivo)",
          complexity: "complex",
          complexityLabel: "🔴 Avanço Ousado",
          probability: probShoveT2,
          risk: "Alto Risco",
          riskClass: "high",
          reward: "Demolição Massiva da T2 (+450g) + Rota até o Inibidor Escancarada",
          failureConsequence: "Colapso de 3 jogadores rivais abate o campeão isolado",
          desc: "Manter o embalo das tropas na mesma rota avançando até a Torre Tier 2 para tentar derrubá-la precocemente."
        }
      ]
    };
  }

  _triggerTacticalDecision(decisionData) {
    if (this.speed >= 50) {
      this._autoResolveTacticalDecision(decisionData);
      return;
    }

    this.isPaused = true;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.activeDecision = decisionData;
    this.lastDecisionSec = this.gameSeconds;
    this.onTacticalDecision(decisionData);
  }

  _autoResolveTacticalDecision(decisionData) {
    this.activeDecision = decisionData;
    const choiceId = (decisionData.options && decisionData.options[0]) ? decisionData.options[0].id : null;
    this.resolveTacticalDecision(choiceId, false);
  }

  resolveTacticalDecision(choiceId, autoResume = true) {
    if (!this.activeDecision) {
      if (autoResume && !this.isFinished) this.resume();
      return null;
    }
    const dec = this.activeDecision;
    this.activeDecision = null;
    this.lastDecisionSec = this.gameSeconds;

    let result = null;
    try {
      const opt = (dec.options && dec.options.find(o => o.id === choiceId)) || (dec.options && dec.options[0]) || { id: choiceId, probability: 50 };
      const roll = Math.floor(Math.random() * 100) + 1;
      const isSuccess = roll <= (opt.probability || 50);

      if (dec.id === "level1") {
        result = this._resolveLevel1Decision(opt.id, isSuccess, roll, opt.probability);
      } else if (dec.id === "lane_focus_early") {
        result = this._resolveLaneFocusEarlyDecision(opt.id, isSuccess, roll, opt.probability);
      } else if (dec.id === "lane_macro_midgame") {
        result = this._resolveLaneMacroMidgameDecision(opt.id, isSuccess, roll, opt.probability);
      } else if (dec.id === "dragon") {
        result = this._resolveDragonDecision(opt.id, dec.meta.dType, isSuccess, roll, opt.probability);
      } else if (dec.id === "baron") {
        result = this._resolveBaronDecision(opt.id, isSuccess, roll, opt.probability);
      } else if (dec.id === "herald") {
        result = this._resolveHeraldDecision(opt.id, isSuccess, roll, opt.probability);
      } else if (dec.id === "elder") {
        result = this._resolveElderDecision(opt.id, isSuccess, roll, opt.probability);
      } else if (dec.id && dec.id.startsWith("dynamic_")) {
        result = this._resolveDynamicIncidentDecision(opt.id, dec, isSuccess, roll, opt.probability);
      } else if (dec.id && dec.id.startsWith("post_tower_")) {
        result = this._resolvePostTowerDecision(opt.id, dec, isSuccess, roll, opt.probability);
      }
    } catch (err) {
      console.error("Erro ao resolver decisão tática:", err);
    } finally {
      if (autoResume && !this.isFinished) {
        this.resume();
      }
    }
    return result;
  }

  _recordKill(killerSide, victimSide, killerRole, victimRole, skillOverride = null, customText = null) {
    const killerScore = killerSide === "blue" ? this.blueScore : this.redScore;
    const victimScore = victimSide === "blue" ? this.blueScore : this.redScore;
    const killerRoster = killerSide === "blue" ? this.blueRosterState : this.redRosterState;
    const victimRoster = victimSide === "blue" ? this.blueRosterState : this.redRosterState;

    const killer = killerRoster[killerRole] || Object.values(killerRoster)[0];
    const victim = victimRoster[victimRole] || Object.values(victimRoster)[0];

    if (!victim || !victim.alive) return null;

    killerScore.kills++;
    victimScore.deaths = (victimScore.deaths || 0) + 1;
    killerScore.gold += 300;

    killer.kills++;
    victim.deaths++;
    victim.alive = false;

    // Dano e ouro individual realistas de combate do League
    const lethalDmg = 1800 + Math.floor(Math.random() * 1400) + Math.floor(this.gameSeconds * 1.6);
    killer.damageDealt = (killer.damageDealt || 0) + lethalDmg;
    victim.damageTaken = (victim.damageTaken || 0) + lethalDmg;
    killer.goldEarned = (killer.goldEarned || 500) + 300;

    // Assistências dos aliados vivos do assassino
    const assistCandidates = Object.values(killerRoster).filter(c => c.id !== killer.id && c.alive);
    if (assistCandidates.length > 0) {
      const assistCount = Math.min(assistCandidates.length, Math.floor(Math.random() * 3) + 1);
      killerScore.assists = (killerScore.assists || 0) + assistCount;
      const splitGold = Math.round(150 / Math.max(1, assistCount));
      assistCandidates.slice(0, assistCount).forEach(assister => {
        assister.assists = (assister.assists || 0) + 1;
        assister.goldEarned = (assister.goldEarned || 500) + splitGold;
        assister.damageDealt = (assister.damageDealt || 0) + Math.floor(lethalDmg * 0.35);
      });
    }

    const deathTimer = 15 + Math.floor(this.gameSeconds / 45);
    victim.respawnAt = this.gameSeconds + deathTimer;

    // 1. Sistema Aprimorado de Super Shutdown / Bounties (Viradas Competitivas do CBLOL)
    let bountyGold = 0;
    if (victim.streak && victim.streak >= 2) {
      let bounty = 150;
      if (victim.streak === 3) bounty = 300;
      else if (victim.streak === 4) bounty = 450;
      else if (victim.streak >= 5) bounty = 700; // Teto épico do LoL (300g base + 700g bounty = 1000g total!)

      // Bônus adicional de virada se o time do jogador estiver em desvantagem econômica
      const goldDeficit = this.redScore.gold - this.blueScore.gold;
      if (killerSide === "blue" && goldDeficit >= 1500) {
        bounty = Math.min(700, bounty + 200);
      }

      bountyGold = bounty;
      killerScore.gold += bounty;
      killer.goldEarned = (killer.goldEarned || 500) + bounty;
      victim.streak = 0;
    }
    killer.streak = (killer.streak || 0) + 1;

    // 2. Sistema de Multikill (Double Kill, Triple, Quadra, PENTAKILL)
    // Janela de 30 segundos de simulação para encadear abates
    if (killer.lastKillSec && (this.gameSeconds - killer.lastKillSec) <= 30) {
      killer.multiKillCount = (killer.multiKillCount || 1) + 1;
    } else {
      killer.multiKillCount = 1;
    }
    killer.lastKillSec = this.gameSeconds;

    if (killer.multiKillCount === 2) {
      this.onMultikill({
        type: "double",
        count: 2,
        killerSide,
        killerName: killer.name,
        killerId: killer.id,
        title: "DOUBLE KILL!",
        subtitle: `${killerSide === "blue" ? "Seu Time" : "CBLOL"}: ${killer.name}`
      });
      this.onEvent({
        type: "multikill",
        side: killerSide,
        text: `⚡ DOUBLE KILL! ${killer.name} eliminou 2 adversários!`,
        time: this._formatTime()
      });
    } else if (killer.multiKillCount === 3) {
      this.onMultikill({
        type: "triple",
        count: 3,
        killerSide,
        killerName: killer.name,
        killerId: killer.id,
        title: "TRIPLE KILL!",
        subtitle: `${killerSide === "blue" ? "Seu Time" : "CBLOL"}: ${killer.name}`
      });
      this.onEvent({
        type: "multikill",
        side: killerSide,
        text: `🔥 TRIPLE KILL! ${killer.name} garantiu 3 abates consecutivos!`,
        time: this._formatTime()
      });
    } else if (killer.multiKillCount === 4) {
      this.onMultikill({
        type: "quadra",
        count: 4,
        killerSide,
        killerName: killer.name,
        killerId: killer.id,
        title: "QUADRA KILL!",
        subtitle: `${killerSide === "blue" ? "Seu Time" : "CBLOL"}: ${killer.name}`
      });
      this.onEvent({
        type: "multikill",
        side: killerSide,
        text: `💥 QUADRA KILL! ${killer.name} aniquilou 4 adversários!`,
        time: this._formatTime()
      });
    } else if (killer.multiKillCount >= 5) {
      this.onMultikill({
        type: "penta",
        count: 5,
        killerSide,
        killerName: killer.name,
        killerId: killer.id,
        title: "PENTAKILL!",
        subtitle: `👑 ${killerSide === "blue" ? "SEU TIME" : "CBLOL"}: ${killer.name} EXTERMINOU O TIME INTEIRO!`
      });
      this.onEvent({
        type: "multikill",
        side: killerSide,
        text: `👑 PENTAKILL LENDÁRIO! ${killer.name} aniquilou todos os 5 campeões adversários!`,
        time: this._formatTime()
      });
    }

    const champData = getChampionById(killer.id);
    const skillName = skillOverride || (champData ? champData.signatureSkill : "Golpe Decisivo");

    const killerChamp = killer.name;
    const victimChamp = victim.name;
    const killerNick = killer.playerNick || killerChamp;
    const victimNick = victim.playerNick || victimChamp;
    const killerLabel = killer.playerNick ? `${killer.playerNick} (${killerChamp})` : killerChamp;
    const victimLabel = victim.playerNick ? `${victim.playerNick} (${victimChamp})` : victimChamp;

    const prefix = killerSide === "blue" ? "🔵 [SEU TIME]" : "🔴 [CBLOL]";
    const isShutdown = bountyGold > 0;

    let text = customText;
    if (!text) {
      if (isShutdown) {
        text = `💰 SHUTDOWN CRÍTICO! ${killerLabel} encerrou a sequência de ${victimLabel} com ${skillName} (+${300 + bountyGold}g de Virada)!`;
      } else if (killer.isSignature) {
        const quotePart = killer.proPlayer && killer.proPlayer.quote ? ` "${killer.proPlayer.quote}"` : "";
        text = `⭐ [PICK DE CONFORTO] ${killerLabel} dominou ${victimLabel} com ${skillName}!${quotePart}`;
      } else {
        text = `${prefix} ${killerLabel} abateu ${victimLabel} com ${skillName}!`;
      }
    }

    this.onEvent({
      type: "kill",
      side: killerSide,
      killerName: killerChamp,
      killerNick: killerNick,
      killerPlayerName: killer.proPlayer ? killer.proPlayer.name : null,
      killerAvatar: killer.proPlayer ? killer.proPlayer.avatar : null,
      killerLabel: killerLabel,
      killerRole: killerRole,
      victimName: victimChamp,
      victimNick: victimNick,
      victimPlayerName: victim.proPlayer ? victim.proPlayer.name : null,
      victimAvatar: victim.proPlayer ? victim.proPlayer.avatar : null,
      victimLabel: victimLabel,
      victimRole: victimRole,
      skillName: skillName,
      bountyGold: bountyGold,
      isShutdown: isShutdown,
      isSignature: killer.isSignature,
      text: text,
      time: this._formatTime()
    });

    this._syncTeamGold();

    // 3. Checagem de ACE (Extermínio: todos os 5 do time adversário mortos ao mesmo tempo)
    const remainingVictims = Object.values(victimRoster).filter(c => c.alive).length;
    if (remainingVictims === 0) {
      this.onAce({
        aceSide: killerSide,
        wipedSide: victimSide,
        killerName: killer.name,
        title: "ACE! (EXTERMÍNIO!)",
        subtitle: `${killerSide === "blue" ? "Seu Time" : "CBLOL"} eliminou todos os adversários!`
      });
      this.onEvent({
        type: "ace",
        side: killerSide,
        text: `💀 ACE! Todos os 5 campeões de ${victimSide === "blue" ? this.blueTeam.name : this.redTeam.name} foram eliminados!`,
        time: this._formatTime()
      });
    }

    return { killer, victim };
  }

  _resolveLevel1Decision(choiceId, isSuccess, roll, prob) {
    // Compatibilidade com IDs legados
    if (choiceId === "defensive_vision") choiceId = "defensive_5point";
    if (choiceId === "invade" || choiceId === "invade_buff") choiceId = "invade_top";

    const blueAliveRoles = Object.keys(this.blueRosterState).filter(r => this.blueRosterState[r].alive);
    const redAliveRoles = Object.keys(this.redRosterState).filter(r => this.redRosterState[r].alive);
    const bTop = blueAliveRoles.includes("top") ? "top" : (blueAliveRoles[0] || "top");
    const bJg = blueAliveRoles.includes("jungle") ? "jungle" : (blueAliveRoles[0] || "jungle");
    const bMid = blueAliveRoles.includes("mid") ? "mid" : (blueAliveRoles[0] || "mid");
    const bAdc = blueAliveRoles.includes("adc") ? "adc" : (blueAliveRoles[0] || "adc");
    const bSupp = blueAliveRoles.includes("support") ? "support" : (blueAliveRoles[0] || "support");

    const rTop = redAliveRoles.includes("top") ? "top" : (redAliveRoles[0] || "top");
    const rJg = redAliveRoles.includes("jungle") ? "jungle" : (redAliveRoles[0] || "jungle");
    const rMid = redAliveRoles.includes("mid") ? "mid" : (redAliveRoles[0] || "mid");
    const rAdc = redAliveRoles.includes("adc") ? "adc" : (redAliveRoles[0] || "adc");
    const rSupp = redAliveRoles.includes("support") ? "support" : (redAliveRoles[0] || "support");

    // ==========================================
    // 1. OPÇÕES SEGURAS (SAFE 5-POINT / VISION / FREEZE)
    // ==========================================
    if (choiceId === "defensive_5point") {
      if (isSuccess) {
        this._applyTeamBuff("blue", {
          id: "vision_control",
          name: "Sentinelas Estratégicas",
          icon: "🛡️",
          bonusDefense: 10,
          bonusCombat: 6,
          duration: 120
        });

        // Sorteio de evento aleatório no sucesso
        if (Math.random() < 0.50) {
          // Evento A: Detecção e anulação de invasão rival
          this._awardTeamGold("blue", 130);
          this.lanePressure = Math.min(100, this.lanePressure + 10);
          this.onEvent({
            type: "skirmish",
            side: "blue",
            text: `🛡️ ALERTA DE INVASÃO! As sentinelas da cobertura 5-Point detectaram a tentativa de avanço do CBLOL no rio. Seu time expulsou os invasores sem perdas! (+130g)`,
            time: this._formatTime()
          });
          return {
            success: true,
            roll,
            probability: prob,
            title: "INVASÃO ADVERSÁRIA ANULADA!",
            subtitle: `Execução Perfeita (${prob}% chance)`,
            text: `As sentinelas da cobertura 5-point flagraram a aproximação inimiga no rio inferior. Seu time reagiu em bloco, expulsou os invasores sem sofrer dano e garantiu o farm limpo inicial (+130g)!`
          };
        } else {
          // Evento B: Início metódico e farm limpo
          this._awardTeamGold("blue", 140);
          this.lanePressure = Math.min(100, this.lanePressure + 8);
          this.onEvent({
            type: "skirmish",
            side: "blue",
            text: `🛡️ COBERTURA 5-POINT IMPECÁVEL! Entradas vigiadas e visão garantida. Suas rotas iniciaram com farm 100% limpo! (+140g)`,
            time: this._formatTime()
          });
          return {
            success: true,
            roll,
            probability: prob,
            title: "INÍCIO METÓDICO & SEGURO",
            subtitle: `Execução Perfeita (${prob}% chance)`,
            text: `Cada jogador vigiou perfeitamente sua entrada da selva. Sem surpresas ou riscos, suas rotas acumularam vantagem de tropas e farm limpo (+140g)!`
          };
        }
      } else {
        this._awardTeamGold("red", 100);
        this.lanePressure = Math.max(-100, this.lanePressure - 8);
        return {
          success: false,
          roll,
          probability: prob,
          title: "PRESSÃO DE ROTAS DO CBLOL",
          subtitle: `Leve atraso de tropas (${prob}% chance)`,
          text: `O adversário avançou a primeira onda de tropas sob sua torre sem baixas, acumulando leve vantagem inicial de ouro (+100g).`
        };
      }
    } else if (choiceId === "deep_ward_scout") {
      if (isSuccess) {
        this._applyTeamBuff("blue", {
          id: "vision_control",
          name: "Telemetria da Selva",
          icon: "👁️",
          bonusDefense: 8,
          bonusCombat: 5,
          duration: 120
        });

        if (Math.random() < 0.50) {
          this._awardTeamGold("blue", 120);
          this.lanePressure = Math.min(100, this.lanePressure + 12);
          this.onEvent({
            type: "skirmish",
            side: "blue",
            text: `👁️ TELEMETRIA AVANÇADA! A sentinela profunda revelou o início de selva do Caçador rival. Rotas avisadas contra ganks precoces! (+120g)`,
            time: this._formatTime()
          });
          return {
            success: true,
            roll,
            probability: prob,
            title: "ROTAÇÃO ADVERSÁRIA DESVENDADA!",
            subtitle: `Visão Cirúrgica (${prob}% chance)`,
            text: `A sentinela profunda cravada no buff revelou exatamente a rota do Caçador adversário! Suas rotas jogam cientes, anulando qualquer tentativa de emboscada precoce (+120g).`
          };
        } else {
          this._awardTeamGold("blue", 160);
          this.lanePressure = Math.min(100, this.lanePressure + 10);
          this.onEvent({
            type: "skirmish",
            side: "blue",
            text: `👁️ SENTINELA & ROUBO CIRÚRGICO! O suporte plantou a sentinela profunda e ainda roubou um monstro menor na saída! (+160g)`,
            time: this._formatTime()
          });
          return {
            success: true,
            roll,
            probability: prob,
            title: "SENTINELA & ROUBO CIRÚRGICO!",
            subtitle: `Infiltração com Sucesso (${prob}% chance)`,
            text: `Sentinela cravada com precisão no buff rival e ainda garantiu o abate de um monstro menor na saída, atrasando a rotação do caçador adversário (+160g)!`
          };
        }
      } else {
        this._awardTeamGold("red", 100);
        this.lanePressure = Math.max(-100, this.lanePressure - 10);
        return {
          success: false,
          roll,
          probability: prob,
          title: "SENTINELA DETECTADA",
          subtitle: `Aproximação avistada (${prob}% chance)`,
          text: `O suporte adversário interceptou o avanço e destruiu a sentinela no rio, forçando seu time a recuar sob ligeira pressão (-10 pressão).`
        };
      }
    } else if (choiceId === "lane_defense_freeze") {
      if (isSuccess) {
        this._awardTeamGold("blue", 130);
        this.lanePressure = Math.min(100, this.lanePressure + 10);
        this._applyTeamBuff("blue", {
          id: "vision_control",
          name: "Controle de Onda",
          icon: "🏰",
          bonusDefense: 10,
          bonusCombat: 4,
          duration: 120
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "CONTROLE DE TRIBUSH & FREEZE!",
          subtitle: `Linha de Tropas Perfeita (${prob}% chance)`,
          text: `A rota inferior bloqueou qualquer investida pelo rio e congelou as tropas sob a torre aliada, garantindo farm seguro e negando recursos ao rival (+130g)!`
        };
      } else {
        this._awardTeamGold("red", 100);
        this.lanePressure = Math.max(-100, this.lanePressure - 10);
        return {
          success: false,
          roll,
          probability: prob,
          title: "ONDA DESFAVORÁVEL",
          subtitle: `Empurrão de tropas (${prob}% chance)`,
          text: `A primeira onda de tropas empurrou desfavoravelmente para a torre adversária, cedendo leve prioridade para a dupla rival (+100g).`
        };
      }
    }

    // ==========================================
    // 2. OPÇÕES TÁTICAS / EQUILIBRADAS (BOT INVADE / RIVER BUSH / VERTICAL)
    // ==========================================
    else if (choiceId === "invade_bot") {
      if (isSuccess) {
        if (Math.random() < 0.50 && redAliveRoles.length > 0) {
          // Evento A: First Blood no Bot Laner ou Suporte
          this._awardTeamGold("blue", 200);
          this.lanePressure = Math.min(100, this.lanePressure + 18);
          const victimRole = redAliveRoles.includes("support") ? "support" : (redAliveRoles.includes("adc") ? "adc" : rMid);
          const killerRole = blueAliveRoles.includes("adc") ? "adc" : bSupp;
          const kName = this.blueRosterState[killerRole].name;
          const vName = this.redRosterState[victimRole].name;

          this._recordKill("blue", "red", killerRole, victimRole, "First Blood na Invasão Bot", `⚡ FIRST BLOOD NO BOT! Invasão cirúrgica no rio inferior! ${kName} abateu ${vName}! (+400g)`);

          return {
            success: true,
            roll,
            probability: prob,
            title: "FIRST BLOOD NA INVASÃO DO BOT!",
            subtitle: `Emboscada Fulminante (${prob}% chance)`,
            text: `Avanço em bloco perfeito! Sua equipe pegou a dupla rival de surpresa no rio inferior, garantiu o First Blood (+400g) e tomou o controle do quadrante inferior!`
          };
        } else {
          // Evento B: Roubo limpo de Buff & Selva Vertical
          this._awardTeamGold("blue", 220);
          this.lanePressure = Math.min(100, this.lanePressure + 14);
          this.onEvent({
            type: "skirmish",
            side: "blue",
            text: `🎯 BUFF ROUBADO NO BOT! O CBLOL recuou e cedeu o buff inferior sem contestar! Caçador azul garante selva vertical e ouro bônus (+220g)!`,
            time: this._formatTime()
          });

          return {
            success: true,
            roll,
            probability: prob,
            title: "BUFF ROUBADO & SELVA VERTICAL!",
            subtitle: `Domínio de Selva (${prob}% chance)`,
            text: `Os adversários recuaram para as torres diante da invasão. Seu Caçador limpou o buff inferior rival de graça (+220g) e estabeleceu a divisão vertical da selva!`
          };
        }
      } else {
        // Falha no Bot Invade
        if (roll < (prob * 0.45) && blueAliveRoles.length > 0 && redAliveRoles.length > 0) {
          // Falha crítica: First Blood para o rival
          this._awardTeamGold("red", 150);
          this.lanePressure = Math.max(-100, this.lanePressure - 20);
          const victimRole = blueAliveRoles.includes("support") ? "support" : blueAliveRoles[0];
          const killerRole = redAliveRoles.includes("adc") ? "adc" : redAliveRoles[0];
          this._recordKill("red", "blue", killerRole, victimRole, "Contragolpe Nível 1", `💀 CONTRAGOLPE NO BOT! O CBLOL esperava no mato e garantiu o First Blood! (+400g)`);

          return {
            success: false,
            roll,
            probability: prob,
            title: "CONTRAGOLPE NO BOT!",
            subtitle: `Emboscada Invertida (${prob}% chance)`,
            text: `O CBLOL esperava em bloco no mato da tribush com sentinela de controle. Sua equipe sofreu o First Blood e precisou recuar com desvantagem inicial.`
          };
        } else {
          // Falha normal: Recuo com queima de feitiços sem baixas
          this._awardTeamGold("red", 100);
          this.lanePressure = Math.max(-100, this.lanePressure - 15);
          return {
            success: false,
            roll,
            probability: prob,
            title: "INVASÃO FRUSTRADA NO BOT",
            subtitle: `Recuo sob pressão (${prob}% chance)`,
            text: `O adversário colapsou com 4 jogadores; seu time queimou feitiços de invocador para escapar com vida, cedendo leve pressão de rota (-15 pressão).`
          };
        }
      }
    } else if (choiceId === "river_bush") {
      if (isSuccess) {
        if (Math.random() < 0.50 && redAliveRoles.length > 0) {
          this._awardTeamGold("blue", 180);
          this.lanePressure = Math.min(100, this.lanePressure + 16);
          const victimRole = redAliveRoles.includes("mid") ? "mid" : rSupp;
          const killerRole = blueAliveRoles.includes("mid") ? "mid" : bSupp;
          this._recordKill("blue", "red", killerRole, victimRole, "Emboscada no Rio", `⚡ FIRST BLOOD NO RIO! Emboscada no arbusto do rio pegou o rival desatento! (+400g)`);

          return {
            success: true,
            roll,
            probability: prob,
            title: "FIRST BLOOD NO RIO!",
            subtitle: `Vitória Tática (${prob}% chance)`,
            text: `A emboscada no arbusto do rio pegou o adversário em cheio! Um First Blood limpo garantido antes dos 2 minutos sem qualquer baixa aliada!`
          };
        } else {
          this._awardTeamGold("blue", 200);
          this.lanePressure = Math.min(100, this.lanePressure + 14);
          return {
            success: true,
            roll,
            probability: prob,
            title: "DOMÍNIO DO RIO & FLASHES QUEIMADOS!",
            subtitle: `Pressão Psicológica (${prob}% chance)`,
            text: `A emboscada assustou o rival, que foi forçado a queimar Flashes defensivos em pânico. Domínio completo do rio sem gastar recursos (+200g)!`
          };
        }
      } else {
        this._awardTeamGold("red", 100);
        this.lanePressure = Math.max(-100, this.lanePressure - 12);
        return {
          success: false,
          roll,
          probability: prob,
          title: "DISPUTA EQUILIBRADA NO RIO",
          subtitle: `Escaramuça Desfavorável (${prob}% chance)`,
          text: `O adversário checou com habilidade à distância, repeliu sua equipe e garantiu vantagem territorial no início.`
        };
      }
    } else if (choiceId === "vertical_jungle") {
      if (isSuccess) {
        this._awardTeamGold("blue", 240);
        this.lanePressure = Math.min(100, this.lanePressure + 16);
        return {
          success: true,
          roll,
          probability: prob,
          title: "SELVA VERTICAL CONQUISTADA!",
          subtitle: `Divisão de Mapa (${prob}% chance)`,
          text: `Inversão cirúrgica de quadrantes! Seu Caçador farmou o buff e os campos rivais de graça, desestabilizando o plano inicial do adversário (+240g)!`
        };
      } else {
        this._awardTeamGold("red", 120);
        this.lanePressure = Math.max(-100, this.lanePressure - 15);
        return {
          success: false,
          roll,
          probability: prob,
          title: "ROTAÇÃO ADVERSÁRIA RESPONDEU",
          subtitle: `Retirada Forçada (${prob}% chance)`,
          text: `As rotas adversárias responderam rápido à investida na selva, forçando seu caçador a fugir sem o buff.`
        };
      }
    }

    // ==========================================
    // 3. OPÇÕES OUSADAS / AGRESSIVAS (TOP INVADE / LANE CHEESE / RED BUFF ALL-IN)
    // ==========================================
    else if (choiceId === "invade_top") {
      if (isSuccess) {
        if (Math.random() < 0.55 && redAliveRoles.length > 0) {
          // Evento A: First Blood letal no Top Laner
          this._awardTeamGold("blue", 200);
          this.lanePressure = Math.min(100, this.lanePressure + 22);
          const victimRole = redAliveRoles.includes("top") ? "top" : rJg;
          const killerRole = blueAliveRoles.includes("top") ? "top" : bJg;
          const kName = this.blueRosterState[killerRole].name;
          const vName = this.redRosterState[victimRole].name;

          this._recordKill("blue", "red", killerRole, victimRole, "First Blood no Top", `⚡ FIRST BLOOD NO TOPO! Invasão avassaladora no mato triplo! ${kName} pulverizou ${vName}! (+400g)`);

          return {
            success: true,
            roll,
            probability: prob,
            title: "FIRST BLOOD ESMAGADOR NO TOP!",
            subtitle: `Jogada Ousada Impecável (${prob}% chance)`,
            text: `Invasão agressiva de alto calibre! Seu time emboscou o Top Laner rival no mato triplo, garantiu o First Blood (+400g) e dominou todo o quadrante superior!`
          };
        } else {
          // Evento B: Roubo do Buff Superior + Flash do Top Laner Queimado
          this._awardTeamGold("blue", 220);
          this.lanePressure = Math.min(100, this.lanePressure + 16);
          this.onEvent({
            type: "skirmish",
            side: "blue",
            text: `🔥 BUFF SUPERIOR ROUBADO! O Top Laner adversário queimou Flash pela parede e o Caçador azul garantiu o buff superior rival (+220g)!`,
            time: this._formatTime()
          });

          return {
            success: true,
            roll,
            probability: prob,
            title: "BUFF SUPERIOR ROUBADO & FLASH QUEIMADO!",
            subtitle: `Vantagem Estratégica (${prob}% chance)`,
            text: `O Top Laner adversário queimou o Flash em pânico pela parede para não cair. Seu time limpou o buff superior do Caçador rival e assumiu a ponta do mapa (+220g)!`
          };
        }
      } else {
        // Falha no Top Invade
        if (roll < (prob * 0.50) && blueAliveRoles.length > 0 && redAliveRoles.length > 0) {
          this._awardTeamGold("red", 150);
          this.lanePressure = Math.max(-100, this.lanePressure - 22);
          const victimRole = blueAliveRoles.includes("top") ? "top" : blueAliveRoles[0];
          const killerRole = redAliveRoles.includes("top") ? "top" : redAliveRoles[0];

          this._recordKill("red", "blue", killerRole, victimRole, "Contragolpe no Top", `💀 EMBOSCADA NO TOP! O CBLOL antecipou a investida e garantiu o First Blood sobre seu time! (+400g)`);

          return {
            success: false,
            roll,
            probability: prob,
            title: "INVASÃO REPELIDA NO TOP!",
            subtitle: `Contragolpe Fatal (${prob}% chance)`,
            text: `O CBLOL antecipou a movimentação no topo e aguardava em bloco. Sua equipe sofreu o First Blood e precisou recuar sob pesada desvantagem.`
          };
        } else {
          this._awardTeamGold("red", 100);
          this.lanePressure = Math.max(-100, this.lanePressure - 16);
          return {
            success: false,
            roll,
            probability: prob,
            title: "RETIRADA FORÇADA NO TOP",
            subtitle: `Emboscada Frustrada (${prob}% chance)`,
            text: `A emboscada no mato triplo foi descoberta; seu time recuou sob pressão de rota sem sofrer mortes (-16 pressão).`
          };
        }
      }
    } else if (choiceId === "lane_bush_cheese") {
      if (isSuccess) {
        if (Math.random() < 0.55 && redAliveRoles.length > 0) {
          this._awardTeamGold("blue", 200);
          this.lanePressure = Math.min(100, this.lanePressure + 20);
          const victimRole = redAliveRoles.includes("adc") ? "adc" : rSupp;
          const killerRole = blueAliveRoles.includes("adc") ? "adc" : bSupp;
          const kName = this.blueRosterState[killerRole].name;
          const vName = this.redRosterState[victimRole].name;

          this._recordKill("blue", "red", killerRole, victimRole, "Lane Cheese no Bot", `⚡ FIRST BLOOD NA ROTA! Trap no primeiro arbusto pulverizou ${vName}! (+400g)`);

          return {
            success: true,
            roll,
            probability: prob,
            title: "FIRST BLOOD COM LANE CHEESE!",
            subtitle: `Armadilha Perfeita (${prob}% chance)`,
            text: `A emboscada no primeiro arbusto da rota inferior funcionou com perfeição! O Atirador rival foi deletado antes de tocar na primeira tropa (+400g)!`
          };
        } else {
          this._awardTeamGold("blue", 180);
          this.lanePressure = Math.min(100, this.lanePressure + 15);
          return {
            success: true,
            roll,
            probability: prob,
            title: "RECALL FORÇADO NO NÍVEL 1!",
            subtitle: `Dano Devastador (${prob}% chance)`,
            text: `A rajada inicial do mato deixou o Atirador rival com 10% de vida, forçando-o a dar recall imediato e perder duas ondas inteiras (+180g)!`
          };
        }
      } else {
        this._awardTeamGold("red", 100);
        this.lanePressure = Math.max(-100, this.lanePressure - 14);
        return {
          success: false,
          roll,
          probability: prob,
          title: "ARMADILHA EVITADA",
          subtitle: `Inimigos Recuaram (${prob}% chance)`,
          text: `A bot lane adversária contornou o arbusto com segurança e empurrou as primeiras tropas sob a torre aliada (-14 pressão).`
        };
      }
    } else if (choiceId === "red_buff_invade") {
      if (isSuccess) {
        if (Math.random() < 0.60 && redAliveRoles.length > 0) {
          this._awardTeamGold("blue", 240);
          this.lanePressure = Math.min(100, this.lanePressure + 24);
          const victimRole = redAliveRoles.includes("jungle") ? "jungle" : rSupp;
          const killerRole = blueAliveRoles.includes("jungle") ? "jungle" : bMid;

          this._recordKill("blue", "red", killerRole, victimRole, "Abate no Red Buff", `⚡ FIRST BLOOD NO RED! Caçador rival foi abatido dentro do próprio covil! (+400g)`);

          return {
            success: true,
            roll,
            probability: prob,
            title: "FIRST BLOOD NO RED & BUFF ROUBADO!",
            subtitle: `Blitzkrieg Brutal (${prob}% chance)`,
            text: `Invasão fulminante no Buff Vermelho! O Caçador adversário foi abatido dentro do covil (+400g) e seu time garantiu o bônus vermelho (+240g)!`
          };
        } else {
          this._awardTeamGold("blue", 220);
          this.lanePressure = Math.min(100, this.lanePressure + 18);
          return {
            success: true,
            roll,
            probability: prob,
            title: "BUFF VERMELHO ROUBADO!",
            subtitle: `Invasão Limpa (${prob}% chance)`,
            text: `O Caçador rival percebeu a investida a tempo e fugiu para o Blue, entregando o Buff Vermelho de graça para sua equipe (+220g)!`
          };
        }
      } else {
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 24);
        if (blueAliveRoles.length > 0 && redAliveRoles.length > 0) {
          this._recordKill("red", "blue", redAliveRoles[0], blueAliveRoles[0], "Defesa do Buff Vermelho");
        }
        return {
          success: false,
          roll,
          probability: prob,
          title: "ALL-IN FRUSTRADO NO RED",
          subtitle: `Colapso do CBLOL (${prob}% chance)`,
          text: `O CBLOL fechou as saídas do covil em 4 jogadores e garantiu o First Blood sobre sua equipe.`
        };
      }
    }

    // Fallback padrão de segurança
    return {
      success: true,
      roll,
      probability: prob,
      title: "INÍCIO DE PARTIDA CONCLUÍDO",
      subtitle: "Fase de rotas iniciada",
      text: "As equipes tomaram suas posições e a fase de rotas começou oficialmente."
    };
  }

  _resolveDragonDecision(choiceId, dType, isSuccess, roll, prob) {
    const blueAliveRoles = Object.keys(this.blueRosterState).filter(r => this.blueRosterState[r].alive);
    const redAliveRoles = Object.keys(this.redRosterState).filter(r => this.redRosterState[r].alive);

    if (choiceId === "fight") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O Dragão rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.dragons++;
        this._awardTeamGold("blue", (150 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 35);
        this._applyTeamBuff("blue", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.blueScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.blueScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        if (redAliveRoles.length > 0) this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redAliveRoles[0]);

        this.onEvent({
          type: "dragon",
          side: "blue",
          text: `🐲 VITÓRIA NO COVIL! ${this.blueTeam.name} venceu a teamfight e garantiu o Dragão ${dType}!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "DRAGÃO CONQUISTADO!",
          subtitle: `Teamfight Vitoriosa (${prob}% chance)`,
          text: `Seu time forçou a luta no covil com precisão! O Dragão ${dType} foi garantido e o CBLOL recuou com baixas!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 35);
        this._damageNextStructure("red", this.blueStructures, 30, false, 1.2);
        this._applyTeamBuff("red", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.redScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.redScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        if (blueAliveRoles.length > 0) this._recordKill("red", "blue", redAliveRoles[0] || "mid", blueAliveRoles[0]);

        this.onEvent({
          type: "dragon",
          side: "red",
          text: `💀 DERROTA NO COVIL! O adversário virou a luta, garantiu o Dragão ${dType} e pressiona suas defesas!`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "LUTA PERDIDA NO COVIL",
          subtitle: `O CBLOL Virou a Luta (${prob}% chance)`,
          text: `O adversário contra-atacou no covil e garantiu o Dragão ${dType}. O time teve que recuar sob dano na torre.`
        };
      }
    } else if (choiceId === "steal") {
      const jRole = "jungle";
      const jAlive = this.blueRosterState[jRole] && this.blueRosterState[jRole].alive;

      if (isSuccess && jAlive) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O Dragão roubado rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.dragons++;
        this._awardTeamGold("blue", (150 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 20);
        this._applyTeamBuff("blue", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.blueScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.blueScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        const jName = this.blueRosterState[jRole].name;
        this.onEvent({
          type: "dragon",
          side: "blue",
          text: `🎯 ROUBO HISTÓRICO NO SMITE! ${jName} saltou no covil, roubou o Dragão ${dType} no Golpe e escapou ileso!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "ROUBO DO SÉCULO NO SMITE!",
          subtitle: `Milagre do Caçador (${prob}% chance)`,
          text: `Seu Caçador (${jName}) acertou o Golpear aos 80 de vida do monstro, garantiu o Dragão ${dType} e escapou pelo rio!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        this._damageNextStructure("red", this.blueStructures, 20, false, 1.0);
        this._applyTeamBuff("red", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.redScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.redScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        if (jAlive) {
          this._recordKill("red", "blue", redAliveRoles[0] || "mid", jRole, "Smite Falho", `🔴 O Caçador tentou o roubo mas foi executado no covil!`);
        }

        this.onEvent({
          type: "dragon",
          side: "red",
          text: `⚠️ ROUBO FRUSTRADO! O CBLOL assegurou o Dragão ${dType}, abateu o Caçador e avança nas rotas.`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "TENTATIVA DE ROUBO FRUSTRADA",
          subtitle: `O CBLOL Venceu o Smite (${prob}% chance)`,
          text: `O Caçador rival cravou o Golpear milissegundos antes. Seu caçador foi cercado e abatido, e o adversário aproveitou a superioridade para atacar defesas.`
        };
      }
    } else if (choiceId === "flank") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O flanco no Dragão rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.dragons++;
        this._awardTeamGold("blue", (150 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 30);

        const redAdcRole = "adc";
        if (this.redRosterState[redAdcRole] && this.redRosterState[redAdcRole].alive) {
          this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redAdcRole, "Flanco Cirúrgico no ADC", `⚡ FLANCO CIRÚRGICO! O Atirador do CBLOL foi deletado em meio segundo!`);
        }
        if (redAliveRoles.length > 1) {
          this._recordKill("blue", "red", blueAliveRoles[1] || "top", redAliveRoles[1]);
        }

        this.onEvent({
          type: "dragon",
          side: "blue",
          text: `⚡ FLANCO DEVASTADOR! O Atirador adversário foi implodido e o Dragão ${dType} conquistado com superioridade!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "FLANCO CIRÚRGICO & DRAGÃO!",
          subtitle: `Jogada de Mestre (${prob}% chance)`,
          text: `O flanqueador contornou a visão inimiga, eliminou o Atirador rival no primeiro segundo e garantiu o Dragão ${dType} sem contestação!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 25);
        this._damageNextStructure("red", this.blueStructures, 25, false, 1.1);

        if (blueAliveRoles.length > 0) {
          this._recordKill("red", "blue", redAliveRoles[0] || "mid", blueAliveRoles[0], "Flanco Revelado", `🔴 O flanqueador foi visto pela sentinela de controle e eliminado!`);
        }

        return {
          success: false,
          roll,
          probability: prob,
          title: "FLANCO REVELADO PELA VISÃO",
          subtitle: `Sentinela Inimiga Efetiva (${prob}% chance)`,
          text: `Uma sentinela de controle revelou o trajeto do flanco. O CBLOL colapsou sobre o flanqueador, garantiu o Dragão ${dType} e danificou sua torre.`
        };
      }
    } else if (choiceId === "dragon_rush") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O Dragão rendeu +250 Ouro Global!`,
            time: this._formatTime()
          });
        }
        this.blueScore.dragons++;
        this._awardTeamGold("blue", (200 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 30);
        this._applyTeamBuff("blue", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.blueScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.blueScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        this.onEvent({
          type: "dragon",
          side: "blue",
          text: `⚡ RUSH FULMINANTE! Seu time pulverizou o Dragão ${dType} com facilidade e segue avançando as rotas!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "DRAGÃO GARANTIDO COM MAESTRIA!",
          subtitle: `Rush Veloz (${prob}% chance)`,
          text: `Com controle absoluto do mapa, seu time queimou o Dragão ${dType} em segundos sem dar qualquer chance de resposta ao CBLOL!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 15);
        this._damageNextStructure("red", this.blueStructures, 15, false, 1.0);
        return {
          success: false,
          roll,
          probability: prob,
          title: "HESITAÇÃO NO DRAGÃO",
          subtitle: `CBLOL Chegou a Tempo (${prob}% chance)`,
          text: `O rush demorou mais que o esperado. O CBLOL contestou o covil e garantiu o Dragão ${dType} enquanto seu time recuava.`
        };
      }
    } else if (choiceId === "dragon_bait") {
      if (isSuccess && redAliveRoles.length >= 1) {
        this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redAliveRoles[0], "Emboscada no Dragão", `🔵 BAIT PERFEITO! Adversário abatido ao checar o covil do Dragão!`);
        if (redAliveRoles.length >= 2) {
          this._recordKill("blue", "red", blueAliveRoles[1] || "adc", redAliveRoles[1], "Foco Cirúrgico");
        }
        this.blueScore.dragons++;
        this._awardTeamGold("blue", 300);
        this.lanePressure = Math.min(100, this.lanePressure + 40);
        this._applyTeamBuff("blue", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.blueScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.blueScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        this.onEvent({
          type: "dragon",
          side: "blue",
          text: `🎯 BAIT PERFEITO NO COVIL! O CBLOL mordeu a isca, foi eliminado e cedeu o Dragão ${dType}!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "BAIT EXECUTADO COM PERFEIÇÃO!",
          subtitle: `Wipe no Rio (${prob}% chance)`,
          text: `Seu time fingiu fazer o Dragão e virou com força total nos defensores rivais desavisados! Abates limpos e Dragão ${dType} garantido!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        return {
          success: false,
          roll,
          probability: prob,
          title: "BAIT IGNORADO",
          subtitle: `CBLOL Não Caiu na Isca (${prob}% chance)`,
          text: `O adversário preferiu não contestar o covil diretamente e garantiu tempo para reverter a pressão de rotas.`
        };
      }
    } else if (choiceId === "dragon_zone") {
      if (isSuccess) {
        this.blueScore.dragons++;
        this._awardTeamGold("blue", 200);
        this.lanePressure = Math.min(100, this.lanePressure + 20);
        this._applyTeamBuff("blue", {
          id: "dragon_buff",
          name: `Alma Elemental (${this.blueScore.dragons}x)`,
          icon: "🐉",
          bonusCombat: this.blueScore.dragons * 5,
          bonusSiege: 0.08,
          duration: null
        });

        this.onEvent({
          type: "dragon",
          side: "blue",
          text: `🛡️ ZONEAMENTO IMPECÁVEL! Seu time expulsou o CBLOL do rio inferior e garantiu o Dragão ${dType}!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "CONTROLE DE RIO & DRAGÃO!",
          subtitle: `Zoneamento Metódico (${prob}% chance)`,
          text: `Com sentinelas e controle de terreno perfeito, sua equipe expulsou os inimigos do rio e pegou o Dragão ${dType} com segurança total!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        this._damageNextStructure("red", this.blueStructures, 20, false, 1.0);
        return {
          success: false,
          roll,
          probability: prob,
          title: "ZONEAMENTO QUEBRADO",
          subtitle: `Invasão Rival (${prob}% chance)`,
          text: `O CBLOL avançou com habilidades de longa distância, desfez o bloqueio do rio e roubou o Dragão ${dType}.`
        };
      }
    } else {
      // cross_trade
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! A troca no mapa rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this._awardTeamGold("blue", (600 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 35);
        this._damageNextStructure("blue", this.redStructures, 70, false, 2.5);

        this.onEvent({
          type: "plate",
          side: "blue",
          text: `🏰 CROSS-MAP EXEMPLAR! Enquanto o rival fazia o Dragão, seu time arrombou 4 barricadas da torre oposta e faturou +600g!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "TROCA DE MAPA PERFEITA!",
          subtitle: `Macro Seguro (${prob}% chance)`,
          text: `Seu time ignorou o monstro neutro e puniu o adversário: derrubou defesas da rota oposta e conquistou ouro garantido sem sofrer baixas!`
        };
      } else {
        this.redScore.dragons++;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 25);
        this._damageNextStructure("red", this.blueStructures, 25, false, 1.0);
        return {
          success: false,
          roll,
          probability: prob,
          title: "TROCA FALHA NO MAPA",
          subtitle: `Defesa Rápida do CBLOL (${prob}% chance)`,
          text: `O CBLOL pegou o Dragão ${dType} com velocidade extrema, recuou a tempo de defender as barricadas e ainda contra-atacou sua rota (+450g pro rival).`
        };
      }
    }
  }

  _resolveBaronDecision(choiceId, isSuccess, roll, prob) {
    const blueAliveRoles = Object.keys(this.blueRosterState).filter(r => this.blueRosterState[r].alive);
    const redAliveRoles = Object.keys(this.redRosterState).filter(r => this.redRosterState[r].alive);

    if (choiceId === "all_in") {
      if (isSuccess) {
        let baronBounty = 0;
        if (this.objectiveBountiesActive) {
          baronBounty = 350;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO ÉPICA! O Barão Na'Shor rendeu +350 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.barons++;
        this._awardTeamGold("blue", (1200 + baronBounty));
        this.blueBaronUntil = this.gameSeconds + 210;
        this.lanePressure = 100;
        this._applyTeamBuff("blue", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        const defaultBlueKiller = blueAliveRoles[0] || Object.keys(this.blueRosterState).find(r => this.blueRosterState[r].alive) || "mid";
        redAliveRoles.slice(0, 2).forEach((r, idx) => {
          const kRole = blueAliveRoles.length > 0 ? blueAliveRoles[idx % blueAliveRoles.length] : defaultBlueKiller;
          this._recordKill("blue", "red", kRole, r);
        });

        this.onEvent({
          type: "baron",
          side: "blue",
          text: `👑 MASSACRE NO BARÃO! O seu time eliminou o CBLOL e garantiu o Barão Na'Shor! PUSH FINAL!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "BARÃO CONQUISTADO!",
          subtitle: `Vitória Épica (${prob}% chance)`,
          text: "Seu time executou uma luta perfeita no covil do Barão! Abates imediatos, buff do Barão conquistado e tropas marchando para o Nexus!"
        };
      } else {
        this.redScore.barons++;
        this._awardTeamGold("red", 1200);
        this.redBaronUntil = this.gameSeconds + 210;
        this.lanePressure = -100;
        this._damageNextStructure("red", this.blueStructures, 65, false, 2.0);
        this._applyTeamBuff("red", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        const defaultRedKiller = redAliveRoles[0] || Object.keys(this.redRosterState).find(r => this.redRosterState[r].alive) || "mid";
        blueAliveRoles.slice(0, 2).forEach((r, idx) => {
          const kRole = redAliveRoles.length > 0 ? redAliveRoles[idx % redAliveRoles.length] : defaultRedKiller;
          this._recordKill("red", "blue", kRole, r);
        });

        this.onEvent({
          type: "baron",
          side: "red",
          text: `🚨 DESASTRE NO BARÃO! O CBLOL venceu a luta, garantiu o Barão e avança destruindo suas defesas!`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "LUTA PERDIDA NO BARÃO",
          subtitle: `O CBLOL Garantiu o Monstro (${prob}% chance)`,
          text: "O adversário dominou o covil, garantiu abates e conquistou o Barão Na'Shor, avançando com buff contra sua base."
        };
      }
    } else if (choiceId === "baron_rush") {
      if (isSuccess) {
        let baronBounty = 0;
        if (this.objectiveBountiesActive) {
          baronBounty = 350;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO ÉPICA! O Barão rendeu +350 Ouro Global!`,
            time: this._formatTime()
          });
        }
        this.blueScore.barons++;
        this._awardTeamGold("blue", (1200 + baronBounty));
        this.blueBaronUntil = this.gameSeconds + 210;
        this.lanePressure = 100;
        this._applyTeamBuff("blue", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        this.onEvent({
          type: "baron",
          side: "blue",
          text: `⚡ RUSH DE BARÃO IMPLACÁVEL! Seu time derreteu o monstro e garantiu a Mão do Barão antes do CBLOL reagir!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "BARÃO DERRETIDO EM SEGUNDOS!",
          subtitle: `Rush Impecável (${prob}% chance)`,
          text: "Sua equipe aproveitou a dominância de mapa para queimar o Barão velozmente! Buff ativo e avanço implacável contra as estruturas inimigas!"
        };
      } else {
        this.redScore.barons++;
        this._awardTeamGold("red", 1200);
        this.redBaronUntil = this.gameSeconds + 210;
        this.lanePressure = -80;
        this._damageNextStructure("red", this.blueStructures, 45, false, 1.5);
        return {
          success: false,
          roll,
          probability: prob,
          title: "RUSH CONTESTADO NO BARÃO",
          subtitle: `Roubo Inesperado (${prob}% chance)`,
          text: "O Barão levou dano, mas o Caçador inimigo conseguiu entrar com precisão no covil e roubou o monstro no Smite!"
        };
      }
    } else if (choiceId === "bait" || choiceId === "baron_bait") {
      if (isSuccess && redAliveRoles.length >= 2) {
        this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redAliveRoles[0], "Emboscada Fatal", `🔵 EMBOSCADA! Vítima pega de surpresa no mato do rio!`);

        let baronBounty = 0;
        if (this.objectiveBountiesActive) {
          baronBounty = 350;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO ÉPICA! A emboscada no Barão rendeu +350 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.barons++;
        this._awardTeamGold("blue", (1200 + baronBounty));
        this.blueBaronUntil = this.gameSeconds + 210;
        this.lanePressure = Math.min(100, this.lanePressure + 40);
        this._applyTeamBuff("blue", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        this.onEvent({
          type: "baron",
          side: "blue",
          text: `👁️ EMBOSCADA CIRÚRGICA! O CBLOL caiu na armadilha do mato e cedeu o Barão com facilidade!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "EMBOSCADA DE MESTRE!",
          subtitle: `O Inimigo Mordeu a Isca (${prob}% chance)`,
          text: "O CBLOL correu para checar o monstro e foi surpreendido no mato da entrada do rio! Abate limpo e Barão garantido com superioridade numérica!"
        };
      } else {
        this.redScore.barons++;
        this._awardTeamGold("red", 1000);
        this.redBaronUntil = this.gameSeconds + 180;
        this.lanePressure = Math.max(-100, this.lanePressure - 35);
        this._damageNextStructure("red", this.blueStructures, 45, false, 1.5);
        this._applyTeamBuff("red", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        this.onEvent({
          type: "baron",
          side: "red",
          text: `⚠️ A emboscada foi descoberta e o CBLOL garantiu o Barão, avançando contra suas defesas.`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "ARMADILHA DESCOBERTA",
          subtitle: `Visão Adversária Efetiva (${prob}% chance)`,
          text: "O adversário usou sentinelas de controle, evitou a emboscada, puxou o monstro para si e pressionou suas estruturas."
        };
      }
    } else if (choiceId === "split_rush") {
      if (isSuccess) {
        let splitBounty = 0;
        if (this.objectiveBountiesActive) {
          splitBounty = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O inibidor no split rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.redScore.barons++;
        this._awardTeamGold("red", 1000);
        this._awardTeamGold("blue", (250 + splitBounty));
        this.lanePressure = Math.min(100, this.lanePressure + 50);

        this._applyTeamBuff("blue", {
          id: "split_push",
          name: "Pressão de Tropas",
          icon: "🏰",
          bonusSiege: 0.35,
          bonusCombat: 5,
          duration: 120
        });
        this._applyTeamBuff("red", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        // Destrói as estruturas do avanço da rota até derrubar o Inibidor adversário de fato
        let reachedInhib = false;
        while (true) {
          const target = this._getCurrentTargetStructure(this.redStructures);
          if (!target || target.id === "nexus_t1" || target.id === "nexus_t2" || target.id === "nexus") break;
          const isTargetInhib = (target.tier === "inhib" || target.id.includes("inhib"));
          this._destroyCurrentStructure("blue", this.redStructures, isTargetInhib ? 500 : 150);
          if (isTargetInhib) {
            reachedInhib = true;
            break;
          }
        }

        // Se o inibidor já estava destruído antes, pressiona as torres do Nexus
        if (!reachedInhib) {
          this._damageNextStructure("blue", this.redStructures, 60, false, 2.0);
        }

        this.onEvent({
          type: "split",
          side: "blue",
          text: `🏰 SPLIT PUSH LENDÁRIO! Enquanto o rival fazia o Barão, suas tropas arrombaram a rota lateral e implodiram defesas da base!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "INIBIDOR DESTRUÍDO NO SPLIT!",
          subtitle: `Troca Decisiva de Macro (${prob}% chance)`,
          text: "O CBLOL ficou com o Barão, mas pagou o preço máximo: suas tropas arrombaram a base inimiga, quebraram as defesas e ativaram Super Tropas!"
        };
      } else {
        this.redScore.barons++;
        this._awardTeamGold("red", 1000);
        this.lanePressure = Math.max(-100, this.lanePressure - 45);
        this._damageNextStructure("red", this.blueStructures, 50, false, 1.5);
        this._applyTeamBuff("red", {
          id: "baron_hand",
          name: "Mão do Barão",
          icon: "👑",
          bonusSiege: 0.5,
          bonusCombat: 15,
          duration: 180
        });

        if (blueAliveRoles.length > 0) {
          this._recordKill("red", "blue", redAliveRoles[0] || "mid", blueAliveRoles[0], "Cercado na Base", `🔴 O split-pusher foi cercado na base inimiga e abatido!`);
        }
        return {
          success: false,
          roll,
          probability: prob,
          title: "SPLIT PUSH INTERROMPIDO",
          subtitle: `Defesa Rápida do Rival (${prob}% chance)`,
          text: "O adversário mandou defensores com teleporte para a base. O split-pusher foi eliminado e o rival aproveitou o Barão para arrombar defesas aliadas."
        };
      }
    } else {
      // vision_siege
      if (isSuccess) {
        let visionBounty = 0;
        if (this.objectiveBountiesActive) {
          visionBounty = 200;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 ABSORÇÃO DE PRESSÃO! O macro seguro rendeu +200 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this._awardTeamGold("blue", (200 + visionBounty));
        this.lanePressure = Math.min(100, this.lanePressure + 15);
        this._applyTeamBuff("blue", {
          id: "vision_control",
          name: "Controle Territorial",
          icon: "👁️",
          bonusDefense: 15,
          bonusCombat: 8,
          duration: 120
        });

        this.onEvent({
          type: "skirmish",
          side: "blue",
          text: `🛡️ CONTROLE DE VISÃO ABSOLUTO! O rival não conseguiu iniciar o Barão e suas rotas acumularam +200 de ouro.`,
          time: this._formatTime()
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "CERCO PACIENTE & OURO SEGURO",
          subtitle: `Macro Seguro (${prob}% chance)`,
          text: "Sua equipe negou o Barão aos adversários através de sentinelas de controle e faturou ondas de tropas inteiras sem risco de wipe!"
        };
      } else {
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        this._damageNextStructure("red", this.blueStructures, 20, false, 1.0);
        return {
          success: false,
          roll,
          probability: prob,
          title: "CONTROLE DE RIO PERDIDO",
          subtitle: `Pressão Inimiga (${prob}% chance)`,
          text: "O CBLOL limpou a visão do rio superior, ganhou pressão de rotas e danificou sua torre externa (+500g para o adversário)."
        };
      }
    }
  }

  _resolveElderDecision(choiceId, isSuccess, roll, prob) {
    const blueAliveRoles = Object.keys(this.blueRosterState).filter(r => this.blueRosterState[r].alive);
    const redAliveRoles = Object.keys(this.redRosterState).filter(r => this.redRosterState[r].alive);

    if (choiceId === "elder_rush") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 350;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO SUPREMA! Dragão Ancião rendeu +350 Ouro Global!`,
            time: this._formatTime()
          });
        }
        this.blueScore.elders = (this.blueScore.elders || 0) + 1;
        this._awardTeamGold("blue", (600 + bountyGold));
        this.lanePressure = 100;
        this._applyTeamBuff("blue", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });

        redAliveRoles.slice(0, 2).forEach((r, idx) => {
          this._recordKill("blue", "red", blueAliveRoles[idx % blueAliveRoles.length] || "adc", r, "Execução do Dragão Ancião");
        });
        this._damageNextStructure("blue", this.redStructures, 100, false, 2.5);

        this.onEvent({
          type: "elder",
          side: "blue",
          text: `🔥 RUSH DE ANCIÃO COLOSSAL! O monstro foi derretido e seu time avança executando os rivais rumo ao Nexus!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "DRAGÃO ANCIÃO DERRETIDO!",
          subtitle: `Rush Final Implacável (${prob}% chance)`,
          text: "Sua equipe aproveitou a tremenda vantagem para exterminar o Dragão Ancião em segundos! O buff de execução garante o avanço final no Nexus!"
        };
      } else {
        this.redScore.elders = (this.redScore.elders || 0) + 1;
        this._awardTeamGold("red", 500);
        this.lanePressure = -80;
        this._damageNextStructure("red", this.blueStructures, 60, false, 2.0);
        return {
          success: false,
          roll,
          probability: prob,
          title: "ANCIÃO CONTESTADO NO ÚLTIMO SEGUNDO",
          subtitle: `Desastre no Smite (${prob}% chance)`,
          text: "O rush foi rápido, mas o Caçador adversário acertou o roubo e virou a luta com a execução do Ancião."
        };
      }
    } else if (choiceId === "elder_zone") {
      if (isSuccess) {
        this.blueScore.elders = (this.blueScore.elders || 0) + 1;
        this._awardTeamGold("blue", 500);
        this.lanePressure = 100;
        this._applyTeamBuff("blue", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });
        this.onEvent({
          type: "elder",
          side: "blue",
          text: `🛡️ ZONEAMENTO MESTRE NO ANCIÃO! O adversário foi mantido longe do covil e o Dragão Ancião foi assegurado!`,
          time: this._formatTime()
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "ZONEAMENTO PERFEITO & ANCIÃO GARANTIDO!",
          subtitle: `Controle do Rio (${prob}% chance)`,
          text: "Sua equipe bloqueou as entradas do rio, não deixou o CBLOL se aproximar e finalizou o Dragão Ancião sem sofrer perdas!"
        };
      } else {
        this.redScore.elders = (this.redScore.elders || 0) + 1;
        this._awardTeamGold("red", 500);
        this.lanePressure = -80;
        return {
          success: false,
          roll,
          probability: prob,
          title: "COLAPSO NO RIO",
          subtitle: `Invasão Inimiga (${prob}% chance)`,
          text: "O CBLOL forçou a passagem no rio com ultimate global e roubou o Dragão Ancião."
        };
      }
    } else if (choiceId === "elder_all_in") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 350;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO SUPREMA! Dragão Ancião rendeu +350 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.elders = (this.blueScore.elders || 0) + 1;
        this._awardTeamGold("blue", (500 + bountyGold));
        this.lanePressure = 100;
        this._applyTeamBuff("blue", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });

        redAliveRoles.slice(0, 3).forEach((r, idx) => {
          this._recordKill("blue", "red", blueAliveRoles[idx % blueAliveRoles.length] || "adc", r, "Execução do Dragão Ancião");
        });
        this._damageNextStructure("blue", this.redStructures, 100, false, 2.5);
        return {
          success: true,
          roll,
          probability: prob,
          title: "👑 DRAGÃO ANCIÃO & VITÓRIA NO COVIL!",
          subtitle: `O Golpe Final (${prob}% chance)`,
          text: "O Aspecto do Dragão Ancião executou os campeões do CBLOL! Suas tropas avançam com fúria para destruir o Nexus!"
        };
      } else {
        this.redScore.elders = (this.redScore.elders || 0) + 1;
        this._awardTeamGold("red", 500);
        this.lanePressure = -100;
        this._applyTeamBuff("red", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });

        blueAliveRoles.slice(0, 3).forEach((r, idx) => {
          this._recordKill("red", "blue", redAliveRoles[idx % redAliveRoles.length] || "adc", r, "Execução do Dragão Ancião");
        });
        this._damageNextStructure("red", this.blueStructures, 100, false, 2.5);
        return {
          success: false,
          roll,
          probability: prob,
          title: "O CBLOL EXECUTOU SEUS CAMPEÕES!",
          subtitle: `Derrota no Ancião (${prob}% chance)`,
          text: "O adversário conquistou o Ancião e a queima executou toda a sua equipe. O CBLOL avança diretamente contra seu Nexus!"
        };
      }
    } else if (choiceId === "elder_smite_steal") {
      const jRole = "jungle";
      const jAlive = this.blueRosterState[jRole] && this.blueRosterState[jRole].alive;
      if (isSuccess && jAlive) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 350;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO SUPREMA! O Ancião roubado no Smite rendeu +350 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.elders = (this.blueScore.elders || 0) + 1;
        this._awardTeamGold("blue", (400 + bountyGold));
        this.lanePressure = 100;
        this._applyTeamBuff("blue", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });

        if (redAliveRoles.length > 0) this._recordKill("blue", "red", jRole, redAliveRoles[0], "Execução do Ancião Roubado");
        return {
          success: true,
          roll,
          probability: prob,
          title: "ROUBO DO DRAGÃO ANCIÃO NO SMITE!",
          subtitle: `Milagre no Rio (${prob}% chance)`,
          text: "O Caçador acertou o Smite lendário roubando o Dragão Ancião! Com o buff de execução, sua equipe vira o jogo na hora!"
        };
      } else {
        this.redScore.elders = (this.redScore.elders || 0) + 1;
        this._awardTeamGold("red", 400);
        this.lanePressure = -100;
        this._damageNextStructure("red", this.blueStructures, 70, false, 2.0);
        this._applyTeamBuff("red", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });

        if (jAlive) this._recordKill("red", "blue", redAliveRoles[0] || "mid", jRole);
        return {
          success: false,
          roll,
          probability: prob,
          title: "SMITE FALHOU NO ANCIÃO",
          subtitle: `O CBLOL Garantiu o Monstro (${prob}% chance)`,
          text: "O Smite não foi suficiente e o CBLOL garantiu o Ancião com execução do caçador aliado, avançando contra a sua base."
        };
      }
    } else if (choiceId === "base_race") {
      if (isSuccess) {
        this.redStructures.forEach(s => { s.currentHp = 0; s.destroyed = true; });
        return {
          success: true,
          roll,
          probability: prob,
          title: "⚡ BACKDOOR LENDÁRIO NO NEXUS!",
          subtitle: `Base Race Vitorioso (${prob}% chance)`,
          text: "Enquanto o CBLOL gastava recursos no Ancião, sua equipe correu pelo mid e implodiu o Nexus adversário antes do recall!"
        };
      } else {
        this.redScore.elders = (this.redScore.elders || 0) + 1;
        this._awardTeamGold("red", 1500);
        this.lanePressure = -100;
        this._damageNextStructure("red", this.blueStructures, 80, false, 2.2);
        this._applyTeamBuff("red", {
          id: "elder_buff",
          name: "Aspecto do Ancião",
          icon: "🔥",
          bonusCombat: 35,
          bonusSiege: 0.6,
          duration: 150
        });

        blueAliveRoles.slice(0, 2).forEach((r, idx) => {
          this._recordKill("red", "blue", redAliveRoles[idx % redAliveRoles.length] || "mid", r);
        });
        return {
          success: false,
          roll,
          probability: prob,
          title: "RECALL INIMIGO A TEMPO!",
          subtitle: `Defesa do Nexus (${prob}% chance)`,
          text: "O adversário utilizou o retorno à base acelerado, defendeu o Nexus com vida baixa, eliminou os invasores e contra-atacou com o buff do Ancião!"
        };
      }
    } else {
      // turtle_nexus
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 500;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 DEFESA DE VIRADA! Absorver a investida do Ancião rendeu +500 Ouro Global!`,
            time: this._formatTime()
          });
        }
        this._awardTeamGold("blue", (800 + bountyGold));
        return {
          success: true,
          roll,
          probability: prob,
          title: "DEFESA HEROICA NO NEXUS!",
          subtitle: `Buff Inimigo Expirado (${prob}% chance)`,
          text: "Sob a proteção das duas torres gêmeas do Nexus, sua equipe absorveu o ataque do CBLOL até o buff do Ancião sumir!"
        };
      } else {
        this._damageNextStructure("red", this.blueStructures, 55, false, 2.0);
        return {
          success: false,
          roll,
          probability: prob,
          title: "TORRES DO NEXUS DANIFICADAS",
          subtitle: `Pressão Extrema (${prob}% chance)`,
          text: "O CBLOL conseguiu arrebentar parte da vida das defesas do Nexus antes do recuo."
        };
      }
    }
  }

  _resolveDynamicIncidentDecision(choiceId, dec, isSuccess, roll, prob) {
    const bTop = this.blueRosterState.top;
    const bJg = this.blueRosterState.jungle;
    const bMid = this.blueRosterState.mid;
    const bAdc = this.blueRosterState.adc;
    const bSupp = this.blueRosterState.support;

    const rTop = this.redRosterState.top;
    const rJg = this.redRosterState.jungle;
    const rMid = this.redRosterState.mid;
    const rAdc = this.redRosterState.adc;
    const rSupp = this.redRosterState.support;

    // 1. Rota Superior (Top)
    if (choiceId === "top_freeze_control") {
      this.setLaneFocus("top");
      if (isSuccess) {
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 25);
        this.lanePressure = Math.min(100, this.lanePressure + 8);
        this._awardTeamGold("blue", 250);
        return {
          success: true, roll, probability: prob,
          title: "CONGELAMENTO DE ONDA PERFEITO!",
          subtitle: `Controle da Rota Superior (${prob}% chance)`,
          text: `${bTop?.name || 'Seu Top Laner'} congelou as tropas com precisão na frente da torre aliada, sufocou ${rTop?.name || 'Top Rival'} e faturou +250g em vantagem de CS!`
        };
      } else {
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 10);
        return {
          success: false, roll, probability: prob,
          title: "CONGELAMENTO QUEBRADO",
          subtitle: `Resposta de ${rTop?.name || 'Top Rival'} (${prob}% chance)`,
          text: `${rTop?.name || 'O rival'} usou magias de longo alcance para resetar a onda de tropas e evitou a perda de farm.`
        };
      }
    }

    if (choiceId === "top_crash_plates") {
      this.setLaneFocus("top");
      if (isSuccess) {
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this._damageNextStructure("blue", this.redStructures, 22, false, 1.4, "top");
        this._awardTeamGold("blue", 400);
        return {
          success: true, roll, probability: prob,
          title: "BARRICADAS DO TOPO DESTRUÍDAS!",
          subtitle: `Demolição Lateral (${prob}% chance)`,
          text: `${bTop?.name || 'Seu Top Laner'} empurrou uma onda gigante contra a T1 inimiga, arrancou barricadas e garantiu +400g em ouro de estruturas!`
        };
      } else {
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 15);
        return {
          success: false, roll, probability: prob,
          title: "DEFESA SOB A TORRE DO TOPO",
          subtitle: `Resistência Rival (${prob}% chance)`,
          text: `${rTop?.name || 'O adversário'} limpou os minions antes que causassem dano direto às placas da torre.`
        };
      }
    }

    if (choiceId === "top_dive_lethal") {
      this.setLaneFocus("top");
      if (isSuccess) {
        if (bTop && rTop) {
          this._recordKill("blue", "red", "top", "top", "Dive Letal no Top", `⚡ DIVE EXECUTADO NO TOPO! ${bTop.name} e ${bJg?.name || 'Caçador'} colapsaram sob a torre e executaram ${rTop.name}!`);
        }
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 40);
        this.lanePressure = Math.min(100, this.lanePressure + 15);
        this._damageNextStructure("blue", this.redStructures, 28, false, 1.6, "top");
        this._awardTeamGold("blue", 400);
        return {
          success: true, roll, probability: prob,
          title: "DIVE MORTAL NO TOPO!",
          subtitle: `Mergulho sob a Torre (${prob}% chance)`,
          text: `Jogada agressiva espetacular! Sua equipe eliminou o Top Laner rival sob a torre, levou barricadas e conquistou o domínio total da rota superior!`
        };
      } else {
        if (bTop && rTop) {
          this._recordKill("red", "blue", "top", "top", "Outplay sob a Torre", `🔴 OUTPLAY SOB A TORRE! ${rTop.name} esquivou do dive e abateu ${bTop.name} com o auxílio da torre!`);
        }
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 20);
        return {
          success: false, roll, probability: prob,
          title: "DIVE PUNIDO SOB A TORRE",
          subtitle: `Reação Defensiva (${prob}% chance)`,
          text: `O rival usou feitiços defensivos no momento exato e os disparos da torre puniram o avanço agressivo.`
        };
      }
    }

    // 2. Selva & Rio (Jungle)
    if (choiceId === "jg_scuttle_contest") {
      if (isSuccess) {
        if (bJg && rJg) {
          this._recordKill("blue", "red", "jungle", "jungle", "Disputa no Rio", `🌲 DISPUTA NO RIO! ${bJg.name} com cobertura de ${bMid?.name || 'Mid'} venceu o duelo no rio e eliminou ${rJg.name}!`);
        }
        this._applyTeamBuff("blue", { id: "river_vision", name: "Visão do Rio", icon: "👁️", bonusCombat: 6, duration: 150 });
        this._awardTeamGold("blue", 220);
        return {
          success: true, roll, probability: prob,
          title: "DOMÍNIO DO ARONGUEJO & VISÃO!",
          subtitle: `Controle do Rio (${prob}% chance)`,
          text: `${bJg?.name || 'Seu Caçador'} assegurou o Aronguejo no Golpear, garantiu visão no rio e concedeu bônus de velocidade e combate para a equipe!`
        };
      } else {
        this.onEvent({ type: "skirmish", side: "red", text: `⚠️ ${rJg?.name || 'Caçador rival'} garantiu o Aronguejo no Golpear e recuou em segurança.`, time: this._formatTime() });
        return {
          success: false, roll, probability: prob,
          title: "ARONGUEJO ROUBADO",
          subtitle: `Golpear Adversário (${prob}% chance)`,
          text: `O caçador rival calculou o dano final com precisão e levou o monstro do rio.`
        };
      }
    }

    if (choiceId === "jg_cross_invade") {
      if (isSuccess) {
        this._awardTeamGold("blue", 350);
        this.lanePressure = Math.min(100, this.lanePressure + 10);
        this._applyTeamBuff("blue", { id: "invade_buff", name: "Buff Roubado", icon: "🔥", bonusCombat: 8, duration: 160 });
        return {
          success: true, roll, probability: prob,
          title: "INVASÃO DE SELVA IMPECÁVEL!",
          subtitle: `Roubo de Buffs (+350g) (${prob}% chance)`,
          text: `${bJg?.name || 'Seu Caçador'} limpou os campos da selva inimiga, roubou o monstro principal e deixou o caçador do CBLOL para trás em ouro e nível!`
        };
      } else {
        this.lanePressure = Math.max(-100, this.lanePressure - 10);
        return {
          success: false, roll, probability: prob,
          title: "INVASÃO PERCEBIDA",
          subtitle: `Sentinela Adversária (${prob}% chance)`,
          text: `Uma sentinela profunda revelou a investida e o CBLOL colapsou, obrigando a um recuo defensivo.`
        };
      }
    }

    if (choiceId === "jg_lane_gank") {
      if (isSuccess) {
        const targetRole = Math.random() < 0.5 ? "mid" : "bot";
        const bKiller = bJg || this.blueRosterState[targetRole];
        const rVictim = this.redRosterState[targetRole];
        if (bKiller && rVictim) {
          this._recordKill("blue", "red", "jungle", targetRole, "Emboscada Relâmpago", `🎯 GANK RELÂMPAGO! ${bJg?.name || 'Caçador'} emboscou pelas costas e abateu ${rVictim.name}!`);
        }
        if (this.lanePressures) this.lanePressures[targetRole] = Math.min(100, (this.lanePressures[targetRole] || 0) + 30);
        this._damageNextStructure("blue", this.redStructures, 20, false, 1.3, targetRole);
        this._awardTeamGold("blue", 350);
        return {
          success: true, roll, probability: prob,
          title: "EMBOSCADA MORTAL DE CAÇADOR!",
          subtitle: `Gank Cirúrgico (${prob}% chance)`,
          text: `Movimentação fantástica! Seu caçador surpreendeu a rota adversária, garantiu o abate (+350g) e abriu a torre para cerco!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "GANK DESVIADO",
          subtitle: `Flash Defensivo (${prob}% chance)`,
          text: `O alvo rival ativou o Flash imediatamente ao avistar a fumaça e buscou refúgio sob a torre.`
        };
      }
    }

    // 3. Rota do Meio (Mid)
    if (choiceId === "mid_roam_bot") {
      this.setLaneFocus("bot");
      if (isSuccess) {
        if (bMid && rAdc) {
          this._recordKill("blue", "red", "mid", "adc", "Roam no Bot", `🏹 ROAMING DESTRUIDOR! ${bMid.name} desceu pelo rio e abateu ${rAdc.name} no mergulho 3v2!`);
        }
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this._damageNextStructure("blue", this.redStructures, 22, false, 1.35, "bot");
        this._applyTeamBuff("blue", { id: "dragon_prep", name: "Prioridade de Dragão", icon: "🐲", bonusCombat: 10, duration: 180 });
        this._awardTeamGold("blue", 450);
        return {
          success: true, roll, probability: prob,
          title: "ROAMING LETAL NA BOT LANE!",
          subtitle: `Investida 3v2 no Bot (${prob}% chance)`,
          text: `Seu Mid Laner desceu em velocidade máxima, eliminou o atirador adversário (+450g), demoliu defesas e garantiu o Dragão Elemental!`
        };
      } else {
        this.lanePressures.mid = Math.max(-100, (this.lanePressures.mid || 0) - 10);
        return {
          success: false, roll, probability: prob,
          title: "BOT LANE RIVAL RECUOU",
          subtitle: `Visão no Rio (${prob}% chance)`,
          text: `A bot lane adversária detectou a descida pelo rio a tempo e recuou em segurança.`
        };
      }
    }

    if (choiceId === "mid_siege_t1") {
      this.setLaneFocus("mid");
      if (isSuccess) {
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 14);
        this._damageNextStructure("blue", this.redStructures, 26, false, 1.5, "mid");
        this._awardTeamGold("blue", 350);
        return {
          success: true, roll, probability: prob,
          title: "PRESSÃO CENTRAL ESMAGADORA!",
          subtitle: `Dano Direto na Torre (${prob}% chance)`,
          text: `${bMid?.name || 'Seu Mid Laner'} manteve o centro sufocado, arrancou grande parte da vida da torre central e garantiu +350g!`
        };
      } else {
        this.lanePressures.mid = Math.max(-100, (this.lanePressures.mid || 0) - 10);
        return {
          success: false, roll, probability: prob,
          title: "DEFESA CENTRAL FIRME",
          subtitle: `Limpeza de Onda (${prob}% chance)`,
          text: `${rMid?.name || 'O mago rival'} limpou as tropas com feitiços de área e protegeu a torre central.`
        };
      }
    }

    if (choiceId === "mid_burst_duel") {
      this.setLaneFocus("mid");
      if (isSuccess) {
        if (bMid && rMid) {
          this._recordKill("blue", "red", "mid", "mid", "Solo Kill no Mid", `💥 EXPLOSÃO CENTRAL! ${bMid.name} acertou todo o combo mágico e desintegrou ${rMid.name}!`);
        }
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 14);
        this._damageNextStructure("blue", this.redStructures, 20, false, 1.3, "mid");
        this._applyTeamBuff("blue", { id: "river_dominance", name: "Domínio do Rio", icon: "⚡", bonusCombat: 8, duration: 160 });
        this._awardTeamGold("blue", 350);
        return {
          success: true, roll, probability: prob,
          title: "SOLO KILL ESPETACULAR NO MID!",
          subtitle: `Outplay Mágico (${prob}% chance)`,
          text: `Execução digna de final do CBLOL! Seu Mid Laner venceu o 1v1, abriu a rota central e garantiu o bônus de Domínio do Rio (+8 Combate)!`
        };
      } else {
        if (bMid && rMid) {
          this._recordKill("red", "blue", "mid", "mid", "Troca no Mid", `🔴 RESPOSTA NO MID! ${rMid.name} esquivou do combo e revidou com dano letal em ${bMid.name}!`);
        }
        this.lanePressures.mid = Math.max(-100, (this.lanePressures.mid || 0) - 20);
        return {
          success: false, roll, probability: prob,
          title: "DUELO NO MID PERDIDO",
          subtitle: `Desfecho Inverso (${prob}% chance)`,
          text: `O rival esquivou da habilidade principal por milímetros e puniu a tentativa de all-in com dano fulminante.`
        };
      }
    }

    // 4. Rota Inferior (Bot)
    if (choiceId === "bot_allin_2v2") {
      this.setLaneFocus("bot");
      if (isSuccess) {
        if (bAdc && rAdc) {
          this._recordKill("blue", "red", "adc", "adc", "All-In Letal no Bot", `🏹 DUELO 2v2 VENCIDO! ${bAdc.name} encaixou os acertos críticos e eliminou ${rAdc.name}!`);
        }
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 14);
        this._damageNextStructure("blue", this.redStructures, 22, false, 1.35, "bot");
        this._awardTeamGold("blue", 400);
        return {
          success: true, roll, probability: prob,
          title: "MASSACRE NO 2v2 DO BOT!",
          subtitle: `All-In da Bot Lane (${prob}% chance)`,
          text: `Sua dupla jogou com frieza absoluta, eliminou o atirador adversário (+400g) e castigou a torre da rota inferior!`
        };
      } else {
        if (bAdc && rAdc) {
          this._recordKill("red", "blue", "adc", "adc", "All-In Rival no Bot", `🔴 DERROTA NO 2v2! A dupla rival conectou o engage e abateu ${bAdc.name}!`);
        }
        this.lanePressures.bot = Math.max(-100, (this.lanePressures.bot || 0) - 20);
        return {
          success: false, roll, probability: prob,
          title: "DESVANTAGEM NO 2v2",
          subtitle: `Engage Adversário (${prob}% chance)`,
          text: `A bot lane rival virou a troca no momento do all-in e forçou um recuo defensivo sob a torre.`
        };
      }
    }

    if (choiceId === "bot_sneak_dragon") {
      if (isSuccess) {
        this.blueScore.dragons = (this.blueScore.dragons || 0) + 1;
        this.nextDragonAt = this.gameSeconds + 300;
        this._applyTeamBuff("blue", { id: "sneak_dragon_buff", name: "Bênção Dracônica", icon: "🐲", bonusCombat: 8, duration: 200 });
        this._awardTeamGold("blue", 300);
        this.onEvent({
          type: "dragon_killed",
          side: "blue",
          text: `🐲 DRAGÃO EM SEGREDO! Sua bot lane fez o Dragão Elemental furtivamente sem contestação rival!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "DRAGÃO ELEMENTAL FURTIVO!",
          subtitle: `Macro Inteligente (${prob}% chance)`,
          text: `Jogada genial! Sua equipe abateu o Dragão Elemental pelas costas do CBLOL sem que eles pudessem sequer contestar!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "DRAGÃO DETECTADO",
          subtitle: `Sentinela Rival (${prob}% chance)`,
          text: `O adversário posicionou uma sentinela no covil a tempo e obrigou sua equipe a abandonar o monstro.`
        };
      }
    }

    if (choiceId === "bot_zone_plates") {
      this.setLaneFocus("bot");
      if (isSuccess) {
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 32);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this._damageNextStructure("blue", this.redStructures, 24, false, 1.4, "bot");
        this._awardTeamGold("blue", 400);
        return {
          success: true, roll, probability: prob,
          title: "TORRE DO BOT DEMOLIDA!",
          subtitle: `Pressão e Coleta de Placas (${prob}% chance)`,
          text: `Zoneamento impecável! Seu duo manteve o adversário acuado e garantiu +400g em placas e demolição da torre inferior!`
        };
      } else {
        this.lanePressures.bot = Math.max(-100, (this.lanePressures.bot || 0) - 10);
        return {
          success: false, roll, probability: prob,
          title: "DEFESA DE TORRE DO BOT",
          subtitle: `Resistência (${prob}% chance)`,
          text: `O duo rival limpou as tropas embaixo da torre sem sofrer perda significativa de placas.`
        };
      }
    }

    // 5. Momentos Situacionais de Snowball (Liderança)
    if (choiceId === "snowball_multi_dive") {
      if (isSuccess) {
        const victim = rTop?.alive ? rTop : (rAdc?.alive ? rAdc : Object.values(this.redRosterState)[0]);
        if (victim) {
          this._recordKill("blue", "red", "mid", victim.role || "top", "Dive Coordenado", `⚡ DIVE ESMAGADOR! Seu time invadiu a torre e eliminou ${victim.name}!`);
        }
        this._damageNextStructure("blue", this.redStructures, 38, false, 2.0);
        this._awardTeamGold("blue", 550);
        this.lanePressure = Math.min(100, this.lanePressure + 25);
        return {
          success: true, roll, probability: prob,
          title: "DIVE MULTI-ROTAS DEVASTADOR!",
          subtitle: `Pressão de Campeões (${prob}% chance)`,
          text: `A liderança foi convertida em pura demolição! Sua equipe mergulhou sob a torre inimiga, eliminou defensores e demoliu a estrutura (+550g)!`
        };
      } else {
        this.lanePressure = Math.max(-100, this.lanePressure - 15);
        return {
          success: false, roll, probability: prob,
          title: "DIVE CONTIDO",
          subtitle: `Defesa Agressiva (${prob}% chance)`,
          text: `O CBLOL acumulou recursos defensivos e obrigou seu time a recuar sem levar a torre.`
        };
      }
    }

    if (choiceId === "snowball_invade_camps") {
      if (isSuccess) {
        this._awardTeamGold("blue", 500);
        this.lanePressure = Math.min(100, this.lanePressure + 18);
        this._applyTeamBuff("blue", { id: "jungle_strangle", name: "Sufocamento de Selva", icon: "🌲", bonusCombat: 10, duration: 180 });
        return {
          success: true, roll, probability: prob,
          title: "SELVA RIVAL TOTALMENTE SAQUEADA!",
          subtitle: `Sufocamento Econômico (+500g) (${prob}% chance)`,
          text: `Seu time varreu os quadrantes da selva adversária, roubou todos os monstros e privou o CBLOL de qualquer oportunidade de retorno!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "INVASÃO DISSIPADA",
          subtitle: `CBLOL Agrupado (${prob}% chance)`,
          text: `O time adversário se posicionou em conjunto e impediu o avanço profundo na selva.`
        };
      }
    }

    if (choiceId === "snowball_baron_bait") {
      if (isSuccess) {
        const victim = rJg?.alive ? rJg : Object.values(this.redRosterState)[0];
        if (victim) {
          this._recordKill("blue", "red", "adc", victim.role || "jungle", "Emboscada no Barão", `👑 ISCA MORTAL! O CBLOL checou o Barão e ${bAdc?.name || 'ADC'} eliminou ${victim.name}!`);
        }
        this._awardTeamGold("blue", 600);
        this.lanePressure = Math.min(100, this.lanePressure + 24);
        return {
          success: true, roll, probability: prob,
          title: "ISCA NO BARÃO PERFEITA!",
          subtitle: `Aniquilação na Moita (+600g) (${prob}% chance)`,
          text: `O adversário caiu na armadilha no escuro! Sua equipe emboscou os rivais na entrada do rio, conquistou abates decisivos e escancarou o caminho para a base!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "ISCA NÃO FUNCIONOU",
          subtitle: `Cautela Rival (${prob}% chance)`,
          text: `O CBLOL preferiu não se aproximar do rio no escuro e permaneceu defendendo suas torres.`
        };
      }
    }

    // 6. Momentos Situacionais de Comeback (Virada)
    if (choiceId === "comeback_tower_defense") {
      if (isSuccess) {
        const victim = rAdc?.alive ? rAdc : (rMid?.alive ? rMid : Object.values(this.redRosterState)[0]);
        if (victim) {
          this._recordKill("blue", "red", "mid", victim.role || "adc", "Defesa Heroica", `🛡️ VIRADA SOB A TORRE! Seu time atraiu ${victim.name} para o alcance da torre e garantiu o Super Shutdown!`);
        }
        this._awardTeamGold("blue", 700);
        this.lanePressure = Math.min(100, this.lanePressure + 30);
        return {
          success: true, roll, probability: prob,
          title: "DEFESA HEROICA SOB A TORRE!",
          subtitle: `Super Shutdown (+700g Bônus!) (${prob}% chance)`,
          text: `Reviravolta épica! Sua equipe absorveu o ataque sob a proteção das torres, puniu o avanço rival, eliminou o carregador adversário e recuperou o fôlego na partida!`
        };
      } else {
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        this._damageNextStructure("red", this.blueStructures, 20, false, 1.2);
        return {
          success: false, roll, probability: prob,
          title: "DEFESA QUEBRADA",
          subtitle: `Pressão Excessiva (${prob}% chance)`,
          text: `O dano acumulado do CBLOL rompeu as linhas defensivas sob a torre.`
        };
      }
    }

    if (choiceId === "comeback_cross_trade") {
      if (isSuccess) {
        this._awardTeamGold("blue", 650);
        this._damageNextStructure("blue", this.redStructures, 30, false, 1.8, "top");
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 40);
        return {
          success: true, roll, probability: prob,
          title: "JOGADA CRUZADA DE MESTRE!",
          subtitle: `Troca de Torres Opostas (+650g) (${prob}% chance)`,
          text: `Enquanto o CBLOL gastava recursos em um lado, seu time marchou veloz pelo lado oposto, demoliu torres externas e recuperou grande fatia econômica!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "TROCA PARCIAL",
          subtitle: `Retorno Rival (${prob}% chance)`,
          text: `O adversário retornou com Teleporte a tempo de impedir a queda da torre.`
        };
      }
    }

    if (choiceId === "comeback_smite_steal") {
      if (isSuccess) {
        this._awardTeamGold("blue", 500);
        this.blueScore.dragons = (this.blueScore.dragons || 0) + 1;
        this._applyTeamBuff("blue", { id: "smite_miracle", name: "Milagre do Smite", icon: "⚡", bonusCombat: 12, duration: 240 });
        this.onEvent({
          type: "smite_steal",
          side: "blue",
          text: `⚡ ROUBO MILAGROSO DE SMITE! ${bJg?.name || 'Caçador'} flashou no covil e roubou o monstro neutro com o Golpear perfeito!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "ROUBO MILAGROSO COM SMITE!",
          subtitle: `Golpear Épico no Covil (${prob}% chance)`,
          text: `Histórico! Seu caçador invadiu o ninho no último instante, roubou o monstro neutro das mãos do CBLOL e incendiou a partida!`
        };
      } else {
        if (bJg) {
          this._recordKill("red", "blue", "jungle", "jungle", "Tentativa de Roubo", `🔴 ROUBO FALHOU! ${bJg.name} caiu no ninho do monstro sob o foco de 5 adversários!`);
        }
        return {
          success: false, roll, probability: prob,
          title: "ROUBO FRUSTRADO",
          subtitle: `Golpear Falhou (${prob}% chance)`,
          text: `O caçador inimigo segurou o Golpear com precisão e abateu seu caçador na tentativa de invasão.`
        };
      }
    }

    // 7. Momentos de Clash Equilibrado / Late Game
    if (choiceId === "clash_tp_flank") {
      if (isSuccess) {
        if (bTop && rAdc) {
          this._recordKill("blue", "red", "top", "adc", "Flanco de Teleporte", `🏔️ FLANCO DESTRUIDOR! ${bTop.name} apareceu pelas costas com TP e explodiu ${rAdc.name}!`);
        }
        this._damageNextStructure("blue", this.redStructures, 32, false, 1.8);
        this._awardTeamGold("blue", 550);
        this.lanePressure = Math.min(100, this.lanePressure + 22);
        return {
          success: true, roll, probability: prob,
          title: "FLANCO DE TELEPORTE PERFEITO!",
          subtitle: `Outplay Estratégico (${prob}% chance)`,
          text: `Seu Top Laner surgiu de surpresa nas costas do CBLOL, eliminou os atiradores rivais e liderou a equipe rumo à base inimiga (+550g)!`
        };
      } else {
        this.lanePressure = Math.max(-100, this.lanePressure - 15);
        return {
          success: false, roll, probability: prob,
          title: "FLANCO COLAPSADO",
          subtitle: `Foco Imediato (${prob}% chance)`,
          text: `O CBLOL aguardava a chegada do Teleporte e cancelou a iniciação com controles de grupo imediatos.`
        };
      }
    }

    if (choiceId === "clash_front_to_back") {
      if (isSuccess) {
        if (bAdc && rTop) {
          this._recordKill("blue", "red", "adc", "top", "Luta Front-to-Back", `🏹 LINHA DE FRENTE DERRETIDA! ${bAdc.name} bateu com proteção total e abateu ${rTop.name}!`);
        }
        this._damageNextStructure("blue", this.redStructures, 30, false, 1.7);
        this._awardTeamGold("blue", 500);
        this.lanePressure = Math.min(100, this.lanePressure + 20);
        return {
          success: true, roll, probability: prob,
          title: "LUTA FRONT-TO-BACK IMPECÁVEL!",
          subtitle: `Formação Fechada (${prob}% chance)`,
          text: `Disciplina absoluta! Sua equipe protegeu os carregadores, triturou a linha de frente inimiga (+500g) e conquistou o avanço no rio!`
        };
      } else {
        this.lanePressure = Math.max(-100, this.lanePressure - 15);
        return {
          success: false, roll, probability: prob,
          title: "LINHA ROMPIDA",
          subtitle: `Flanco Inimigo (${prob}% chance)`,
          text: `O adversário encontrou um ângulo pelas laterais e alcançou a linha de trás antes da proteção se firmar.`
        };
      }
    }

    if (choiceId === "clash_poke_kite") {
      if (isSuccess) {
        this._damageNextStructure("blue", this.redStructures, 28, false, 1.6);
        this._awardTeamGold("blue", 450);
        this.lanePressure = Math.min(100, this.lanePressure + 18);
        return {
          success: true, roll, probability: prob,
          title: "DESGASTE À DISTÂNCIA VITORIOSO!",
          subtitle: `Poke & Cerco (${prob}% chance)`,
          text: `Habilidades de longo alcance minaram completamente a vida do CBLOL, forçando múltiplos recalls sem que sua equipe tomasse dano (+450g)!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "ENGAGE RIVAL",
          subtitle: `Iniciação Súbita (${prob}% chance)`,
          text: `O rival não esperou o desgaste e puxou uma iniciação relâmpago, forçando sua equipe a gastar feitiços defensivos.`
        };
      }
    }

    // Resolvendo Escolhas de Overextend sob a Torre
    if (choiceId === "overextend_retreat") {
      const lane = (dec.meta && dec.meta.targetLane) || "mid";
      this.lanePressures[lane] = 10;
      this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);
      if (isSuccess) {
        this._awardTeamGold("blue", 180);
        this.onEvent({
          type: "tactical_retreat",
          side: "blue",
          text: `🛡️ RECUO TÁTICO PERFEITO! Sua rota desarmou a emboscada de ${rJg?.name || 'Caçador Rival'}, resetou a onda e garantiu +180g de farm seguro!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "GANK FRUSTRADO COM SUCESSO!",
          subtitle: `Recuo Inteligente (${prob}% chance)`,
          text: `Sua rota leu o sumiço do caçador rival no minimapa, recuou antes do flanco e garantiu +180g de ouro limpo em farm sem risco!`
        };
      } else {
        this.onEvent({
          type: "skirmish",
          side: "red",
          text: `⚠️ A rota precisou gastar um feitiço de invocador defensivo para escapar do gank.`,
          time: this._formatTime()
        });
        return {
          success: false, roll, probability: prob,
          title: "FUGA NO LIMITE",
          subtitle: `Feitiço Gasto (${prob}% chance)`,
          text: `O caçador rival apareceu antes do recuo completo, forçando o gasto de um feitiço defensivo, mas todos sobreviveram!`
        };
      }
    }

    if (choiceId === "overextend_greed_plates") {
      const lane = (dec.meta && dec.meta.targetLane) || "mid";
      if (isSuccess) {
        this._damageNextStructure("blue", this.redStructures, 22, false, 1.4, lane);
        this._awardTeamGold("blue", 350);
        this.lanePressures[lane] = 0;
        this.onEvent({
          type: "turret_plate",
          side: "blue",
          text: `🔨 BARRICADA ARRANCADA! Sua rota faturou +350g na torre e queimou o Flash milimétrico para escapar da pinça!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "BARRICADA SAQUEADA & FUGA ÉPICA!",
          subtitle: `Ganância Recompensada (${prob}% chance)`,
          text: `Sua rota arrancou o ouro da torre (+350g) e acionou o Flash no milésimo exato da chegada de ${rJg?.name || 'Caçador Rival'}, escapando com vida!`
        };
      } else {
        const victimRole = lane === "bot" ? "adc" : lane;
        const victimChamp = this.blueRosterState[victimRole] || bMid;
        if (victimChamp && rJg) {
          this._recordKill("red", "blue", "jungle", victimRole, "Gank Punidor sob a Torre", `⚠️ GANK PUNIDOR! A ganância sob a torre cobrou o preço: ${rJg.name} fechou o flanco e abateu ${victimChamp.name}!`);
        }
        this.lanePressures[lane] = Math.max(-100, (this.lanePressures[lane] || 0) - 25);
        this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);
        return {
          success: false, roll, probability: prob,
          title: "GANK PUNIDOR FATAL!",
          subtitle: `Ganância Punida (${prob}% chance)`,
          text: `O caçador adversário foi veloz demais! Antes do Flash ser acionado, o colapso sob a torre eliminou o campeão aliado.`
        };
      }
    }

    if (choiceId === "overextend_all_in_dive") {
      const lane = (dec.meta && dec.meta.targetLane) || "mid";
      const targetRole = lane === "bot" ? "adc" : lane;
      const targetChamp = this.blueRosterState[targetRole] || bMid;
      const rivalChamp = this.redRosterState[targetRole] || rMid;
      if (isSuccess) {
        if (targetChamp && rivalChamp) {
          this._recordKill("blue", "red", targetRole, targetRole, "Dive Heroico", `⚡ DIVE ESPETACULAR! ${targetChamp.name} mergulhou sob a torre, esquivou do gank e eliminou ${rivalChamp.name}!`);
        }
        this._damageNextStructure("blue", this.redStructures, 28, false, 1.6, lane);
        this._awardTeamGold("blue", 600);
        this.lanePressures[lane] = Math.min(100, (this.lanePressures[lane] || 0) + 35);
        this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);
        return {
          success: true, roll, probability: prob,
          title: "OUTPLAY INSANO SOB A TORRE!",
          subtitle: `Dive Vitorioso (${prob}% chance)`,
          text: `Jogada lendária! Em vez de recuar, sua equipe mergulhou sob a torre, eliminou o rival, sobreviveu ao gank (+600g) e demoliu a estrutura!`
        };
      } else {
        if (targetChamp && rJg) {
          this._recordKill("red", "blue", "jungle", targetRole, "Dive Fracassado", `🔴 DIVE FRACASSADO! A agressão sob a torre deu errado e ${rJg.name} garantiu o abate!`);
        }
        this.lanePressures[lane] = Math.max(-100, (this.lanePressures[lane] || 0) - 30);
        this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);
        return {
          success: false, roll, probability: prob,
          title: "DIVE FRACASSADO SOB A TORRE",
          subtitle: `Colapso Rival (${prob}% chance)`,
          text: `A torre somada à chegada do caçador rival causaram dano excessivo. O aliado foi abatido concedendo ouro de shutdown.`
        };
      }
    }

    // Resolvendo Dilema Macro: 5v5 vs Split Push
    if (choiceId === "macro_group_5v5") {
      if (isSuccess) {
        this._awardTeamGold("blue", 500);
        this.lanePressure = Math.min(100, this.lanePressure + 20);
        if (bMid && rMid) {
          this._recordKill("blue", "red", "mid", "mid", "Disputa Coletiva 5v5", `⚡ TEAMFIGHT MASSIVA 5v5! A formação unida derreteu a linha de frente rival e ${bMid.name} abateu ${rMid.name}!`);
        }
        this._damageNextStructure("blue", this.redStructures, 25, false, 1.5);
        return {
          success: true, roll, probability: prob,
          title: "VITÓRIA BRILHANTE NA TEAMFIGHT 5v5!",
          subtitle: `Formação Coletiva Impecável (${prob}% chance)`,
          text: `Os 5 campeões lutaram em bloco! A linha de frente absorveu o engage e os carregadores limparam a luta (+500g e avanço nas estruturas)!`
        };
      } else {
        this.onEvent({
          type: "skirmish",
          side: "neutral",
          text: `🛡️ Choque parelho no covil! Ambas as equipes trocaram dano pesado e recuaram para reagrupar.`,
          time: this._formatTime()
        });
        return {
          success: false, roll, probability: prob,
          title: "DISPUTA EQUILIBRADA NO COVIL",
          subtitle: `Luta Parelha (${prob}% chance)`,
          text: `Ambos os times trocaram recursos pesados e ninguém conseguiu o ace limpo, forçando um recuo geral.`
        };
      }
    }

    if (choiceId === "macro_split_pressure") {
      this.setLaneFocus("top");
      if (isSuccess) {
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 50);
        this.lanePressure = Math.min(100, this.lanePressure + 18);
        this._damageNextStructure("blue", this.redStructures, 38, false, 2.0, "top");
        this._awardTeamGold("blue", 650);
        this.onEvent({
          type: "split_push",
          side: "blue",
          text: `🏔️ SPLIT PUSH DEVASTADOR! Enquanto 4 seguravam o CBLOL no covil, ${bTop?.name || 'Top Laner'} destruiu as defesas laterais (+650g)!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "JOGADA CRUZADA (CROSS-MAP) PERFEITA!",
          subtitle: `Torre Lateral Destruída (${prob}% chance)`,
          text: `Enquanto o CBLOL perdia tempo no covil, seu Top Laner avançou sozinho, demoliu a torre T2/Inibidor oposto (+650g) e abriu a base inimiga!`
        };
      } else {
        if (bAdc && rMid) {
          this._recordKill("red", "blue", "mid", "adc", "Engage 5v4 no Rio", `🔴 ENGAGE 5v4 RIVAL! O CBLOL acelerou o combate no rio aproveitando a vantagem numérica e abateu ${bAdc.name}!`);
        }
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        return {
          success: false, roll, probability: prob,
          title: "ENGAGE RIVAL 5v4 NO RIO",
          subtitle: `Superioridade Numérica Rival (${prob}% chance)`,
          text: `O adversário não hesitou: iniciou um combate veloz de 5 contra 4 no rio antes que o split na rota lateral conseguisse derrubar a torre.`
        };
      }
    }

    if (choiceId === "macro_split_tp_flank") {
      if (isSuccess) {
        if (bTop && rAdc) {
          this._recordKill("blue", "red", "top", "adc", "Flanco de Teleporte", `⚡ FLANCO LENDÁRIO DE TELEPORTE! ${bTop.name} teleportou nas costas do CBLOL e deletou ${rAdc.name}!`);
        }
        this._awardTeamGold("blue", 700);
        this.lanePressure = Math.min(100, this.lanePressure + 25);
        this._damageNextStructure("blue", this.redStructures, 30, false, 1.8);
        this._applyTeamBuff("blue", {
          id: "tp_flank_buff",
          name: "Flanco Perfeito",
          icon: "⚡",
          bonusCombat: 12,
          duration: 180
        });
        return {
          success: true, roll, probability: prob,
          title: "ARMADILHA DE MACRO 5v3 IMPECÁVEL!",
          subtitle: `Flanco de Teleporte Mortal (${prob}% chance)`,
          text: `Jogada magistral! O Top Laner atraiu 2 adversários para a rota lateral e usou o Teleporte nas costas dos outros 3 no rio, conquistando um massacre (+700g)!`
        };
      } else {
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 20);
        return {
          success: false, roll, probability: prob,
          title: "TELEPORTE INTERROMPIDO",
          subtitle: `Leitura Rival (${prob}% chance)`,
          text: `O adversário previu a armadilha, cancelou a canalização do Teleporte com atordoamento ou limpou a sentinela a tempo.`
        };
      }
    }

    // Padrão fallback
    return {
      success: isSuccess, roll, probability: prob,
      title: isSuccess ? "JOGADA BEM-SUCEDIDA!" : "JOGADA DEFENDIDA",
      subtitle: `${prob}% chance`,
      text: isSuccess ? "Sua equipe executou o plano tático com sucesso e colheu vantagens no Rift!" : "O adversário conseguiu responder à investida e conteve os danos."
    };
  }

  _resolvePostTowerDecision(choiceId, dec, isSuccess, roll, prob) {
    const lane = (dec.meta && dec.meta.lane) || "mid";
    const bMid = this.blueRosterState.mid;
    const rMid = this.redRosterState.mid;
    const bTop = this.blueRosterState.top;
    const bJg = this.blueRosterState.jungle;
    const rJg = this.redRosterState.jungle;

    if (choiceId === "tower_lane_swap") {
      this.setLaneFocus("mid");
      if (isSuccess) {
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 15);
        this._damageNextStructure("blue", this.redStructures, 24, false, 1.4, "mid");
        this._awardTeamGold("blue", 350);
        this.onEvent({
          type: "lane_swap",
          side: "blue",
          text: `⚡ INVERSÃO DE ROTAS IMPECÁVEL! Sua equipe rotacionou para a Rota do Meio, colocou as tropas na T1 central e faturou +350g!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "INVERSÃO DE ROTAS (LANE SWAP) PERFEITA!",
          subtitle: `Transição de Rotação (${prob}% chance)`,
          text: `A equipe que derrubou a torre lateral migrou imediatamente para o meio, exerceu pressão na T1 central (+350g) e abriu a visão do Rio!`
        };
      } else {
        this.lanePressures.mid = 0;
        return {
          success: false, roll, probability: prob,
          title: "DEFESA CENTRAL RIVAL",
          subtitle: `Espelhamento Rival (${prob}% chance)`,
          text: `O CBLOL espelhou a rotação a tempo e conseguiu limpar as tropas antes do dano direto à torre do meio.`
        };
      }
    }

    if (choiceId === "tower_deep_invade") {
      if (isSuccess) {
        this._awardTeamGold("blue", 350);
        this.lanePressure = Math.min(100, this.lanePressure + 10);
        this._applyTeamBuff("blue", {
          id: "deep_vision",
          name: "Visão Profunda",
          icon: "👁️",
          bonusCombat: 10,
          duration: 200
        });
        this.onEvent({
          type: "jungle_invade",
          side: "blue",
          text: `🌲 SAQUE TOTAL DA SELVA INIMIGA! Aproveitando a torre caída, sua equipe roubou o buff adversário (+350g) e garantiu Visão Profunda!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "INVASÃO PROFUNDA VITORIOSA!",
          subtitle: `Saque de Território (${prob}% chance)`,
          text: `Sua equipe invadiu o quadrante da selva rival agora desprotegido, roubou buffs e campos neutros (+350g) e plantou sentinelas profundas (+10 Combate)!`
        };
      } else {
        this._awardTeamGold("blue", 120);
        return {
          success: false, roll, probability: prob,
          title: "SELVA JÁ ESTAVA LIMPA",
          subtitle: `Campos Neutros Vazios (${prob}% chance)`,
          text: `O caçador rival já havia farmado a maior parte dos monstros neutros, gerando apenas vantagens marginais (+120g).`
        };
      }
    }

    if (choiceId === "tower_shove_t2") {
      if (isSuccess) {
        this.lanePressures[lane] = Math.min(100, (this.lanePressures[lane] || 0) + 40);
        this.lanePressure = Math.min(100, this.lanePressure + 16);
        this._damageNextStructure("blue", this.redStructures, 32, false, 1.8, lane);
        this._awardTeamGold("blue", 450);
        this.onEvent({
          type: "turret_damage",
          side: "blue",
          text: `🔨 CERCO AGRESSIVO NA T2! O embalo das tropas derrubou as defesas da Torre Tier 2 (+450g)!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "CERCO DEVASTADOR NA TORRE T2!",
          subtitle: `Demolição Agressiva (${prob}% chance)`,
          text: `O avanço não parou! As tropas colidiram direto na Torre Tier 2 adversária, arrancando grande fatia de vida (+450g) e abrindo a rota do inibidor!`
        };
      } else {
        const victimRole = lane === "bot" ? "adc" : (lane === "top" ? "top" : "mid");
        const victimChamp = this.blueRosterState[victimRole] || bTop;
        if (victimChamp && rJg) {
          this._recordKill("red", "blue", "jungle", victimRole, "Colapso na T2", `🔴 COLAPSO NA T2! O avanço ganancioso sem visão foi punido: ${rJg.name} reuniu 3 jogadores e abateu ${victimChamp.name}!`);
        }
        this.lanePressures[lane] = Math.max(-100, (this.lanePressures[lane] || 0) - 25);
        this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);
        return {
          success: false, roll, probability: prob,
          title: "COLAPSO DO CBLOL NA T2",
          subtitle: `Avanço Ganancioso Punido (${prob}% chance)`,
          text: `O avanço excessivo sem cobertura das outras rotas permitiu que o CBLOL colapsasse em 3 jogadores e abatesse o aliado mais adiantado.`
        };
      }
    }

    return {
      success: isSuccess, roll, probability: prob,
      title: isSuccess ? "TRANSIÇÃO CONCLUÍDA!" : "RESPOSTA RIVAL",
      subtitle: `${prob}% chance`,
      text: isSuccess ? "Sua equipe aproveitou a queda da estrutura para ampliar a vantagem territorial!" : "O adversário se reorganizou e impediu o efeito bola de neve."
    };
  }

  _resolveLaneFocusEarlyDecision(choiceId, isSuccess, roll, prob) {
    const bTop = this.blueRosterState.top;
    const bMid = this.blueRosterState.mid;
    const bAdc = this.blueRosterState.adc;
    const rTop = this.redRosterState.top;
    const rMid = this.redRosterState.mid;
    const rAdc = this.redRosterState.adc;

    if (choiceId === "focus_top_lane") {
      this.setLaneFocus("top");
      if (isSuccess) {
        if (bTop && rTop) {
          this._recordKill("blue", "red", "top", "top", "Solo Kill no Top", `⚡ JOGADA PERFEITA NO TOPO! ${bTop.name} encaixou a troca com maestria e abateu ${rTop.name}!`);
        }
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 32);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this._damageNextStructure("blue", this.redStructures, 16, false, 1.25, "top");
        this._awardTeamGold("blue", 200);
        return {
          success: true,
          roll,
          probability: prob,
          title: "DOMÍNIO NA ROTA SUPERIOR (TOP)!",
          subtitle: `Execução Perfeita (${prob}% chance)`,
          text: `Seu Top Laner venceu a disputa na rota superior, garantiu o abate (+300g), arrancou barricadas da torre inimiga e estabeleceu o domínio no topo!`
        };
      } else {
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 15);
        this.onEvent({
          type: "skirmish",
          side: "red",
          text: `⚠️ O Top Laner adversário recuou a tempo para a torre e absorveu a pressão.`,
          time: this._formatTime()
        });
        return {
          success: false,
          roll,
          probability: prob,
          title: "TOP ADVERSÁRIO RECUOU",
          subtitle: `Defesa sob a Torre (${prob}% chance)`,
          text: `O rival percebeu a movimentação, recuou para debaixo da torre e estabilizou a onda de tropas sem mortes.`
        };
      }
    } else if (choiceId === "focus_mid_lane") {
      this.setLaneFocus("mid");
      if (isSuccess) {
        if (bMid && rMid) {
          this._recordKill("blue", "red", "mid", "mid", "Pressão no Mid", `⚡ CONTROLE DO MID! ${bMid.name} acertou todo o combo mágico e abateu ${rMid.name}!`);
        }
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 32);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this._damageNextStructure("blue", this.redStructures, 16, false, 1.25, "mid");
        this._applyTeamBuff("blue", {
          id: "river_dominance",
          name: "Domínio do Rio",
          icon: "⚡",
          bonusCombat: 8,
          duration: 150
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "PRIORIDADE ABSOLUTA NO MEIO (MID)!",
          subtitle: `Pressão Central Total (${prob}% chance)`,
          text: `Seu Mid Laner conquistou o abate no meio (+300g), castigou a T1 central e garantiu visão avançada no rio para as próximas lutas!`
        };
      } else {
        this.lanePressures.mid = Math.max(-100, (this.lanePressures.mid || 0) - 15);
        this.onEvent({
          type: "skirmish",
          side: "red",
          text: `⚠️ O Mid rival limpou a onda com magias à distância e segurou a posição.`,
          time: this._formatTime()
        });
        return {
          success: false,
          roll,
          probability: prob,
          title: "MID LANER RIVAL SEGUROU O MEIO",
          subtitle: `Limpeza à Distância (${prob}% chance)`,
          text: `O mago adversário usou habilidades de longo alcance para evaporar as tropas e evitou o confronto direto.`
        };
      }
    } else {
      // focus_bot_lane
      this.setLaneFocus("bot");
      if (isSuccess) {
        if (bAdc && rAdc) {
          const victimRole = this.redRosterState.support?.alive ? "support" : "adc";
          const victimName = this.redRosterState[victimRole].name;
          this._recordKill("blue", "red", "adc", victimRole, "All-In no Bot", `🏹 ALL-IN LETAL NA ROTA INFERIOR! ${bAdc.name} acertou os disparos críticos e abateu ${victimName}!`);
        }
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 14);
        this._damageNextStructure("blue", this.redStructures, 18, false, 1.3, "bot");
        this._applyTeamBuff("blue", {
          id: "dragon_prep",
          name: "Prioridade de Dragão",
          icon: "🐲",
          bonusCombat: 10,
          duration: 180
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "MASSACRE NA ROTA INFERIOR (BOT)!",
          subtitle: `All-In Vitorioso (${prob}% chance)`,
          text: `Sua bot lane conquistou o abate no 2v2 (+300g), destruiu barricadas da T1 e garantiu prioridade total para o próximo Dragão Elemental!`
        };
      } else {
        this.lanePressures.bot = Math.max(-100, (this.lanePressures.bot || 0) - 15);
        this.onEvent({
          type: "skirmish",
          side: "red",
          text: `⚠️ A dupla adversária ativou feitiços defensivos e recuou sob a torre.`,
          time: this._formatTime()
        });
        return {
          success: false,
          roll,
          probability: prob,
          title: "DESENGAJE DA BOT LANE RIVAL",
          subtitle: `Feitiços Gastos (${prob}% chance)`,
          text: `Os adversários gastaram Flash e Curar para escapar da armadilha e mantiveram a torre segura.`
        };
      }
    }
  }

  _resolveLaneMacroMidgameDecision(choiceId, isSuccess, roll, prob) {
    const bTop = this.blueRosterState.top;
    const bMid = this.blueRosterState.mid;
    const bAdc = this.blueRosterState.adc;
    const rTop = this.redRosterState.top;
    const rMid = this.redRosterState.mid;
    const rAdc = this.redRosterState.adc;

    if (choiceId === "macro_split_top") {
      this.setLaneFocus("top");
      if (isSuccess) {
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 45);
        this.lanePressure = Math.min(100, this.lanePressure + 16);
        this._damageNextStructure("blue", this.redStructures, 32, false, 1.9, "top");
        this._awardTeamGold("blue", 500);
        this.onEvent({
          type: "split_push",
          side: "blue",
          text: `🏔️ SPLIT PUSH DEVASTADOR NO TOPO! ${bTop?.name || 'Seu Top Laner'} empurrou a rota até a base adversária e forçou múltiplos recalls! (+500g)`,
          time: this._formatTime()
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "SPLIT PUSH 1-3-1 IMPECÁVEL!",
          subtitle: `Pressão Lateral Extrema (${prob}% chance)`,
          text: `Seu Top Laner avançou sozinho, demoliu as defesas da rota superior (+500g) e obrigou o CBLOL a deslocar 2 jogadores para o topo, abrindo o mapa para o seu time!`
        };
      } else {
        if (bTop && rTop) {
          this._recordKill("red", "blue", "top", "top", "Colapso no Top", `🔴 COLAPSO NO TOPO! O CBLOL reuniu dois jogadores e abateu ${bTop.name} na rota avançada!`);
        }
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 25);
        return {
          success: false,
          roll,
          probability: prob,
          title: "COLAPSO DO CBLOL NO TOPO",
          subtitle: `Emboscada 2v1 (${prob}% chance)`,
          text: `O adversário leu o avanço isolado, colapsou na rota superior e conseguiu um abate antes do seu Top recuar.`
        };
      }
    } else if (choiceId === "macro_group_mid") {
      this.setLaneFocus("mid");
      if (isSuccess) {
        if (bMid && rMid) {
          this._recordKill("blue", "red", "mid", "mid", "Teamfight Central", `⚡ VITÓRIA NO CERCO CENTRAL! ${bMid.name} eliminou ${rMid.name} na investida pelo meio!`);
        }
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 45);
        this.lanePressure = Math.min(100, this.lanePressure + 18);
        this._damageNextStructure("blue", this.redStructures, 35, false, 2.0, "mid");
        this._awardTeamGold("blue", 550);
        return {
          success: true,
          roll,
          probability: prob,
          title: "CERCO 5v5 VITORIOSO NO MEIO!",
          subtitle: `Quebra da Defesa Central (${prob}% chance)`,
          text: `Sua equipe derrubou a torre central (+550g), eliminou defensores e abriu caminho direto para ambas as selvas rivais!`
        };
      } else {
        this.lanePressures.mid = Math.max(-100, (this.lanePressures.mid || 0) - 20);
        this.onEvent({
          type: "skirmish",
          side: "red",
          text: `⚠️ O CBLOL agrupou com magias de área sob a torre e conteve o cerco central.`,
          time: this._formatTime()
        });
        return {
          success: false,
          roll,
          probability: prob,
          title: "CERCO DO MEIO CONTIDO",
          subtitle: `Defesa de Área (${prob}% chance)`,
          text: `O adversário posicionou magias de controle sob a torre e forçou sua equipe a recuar sem sofrer baixas.`
        };
      }
    } else {
      // macro_siege_bot
      this.setLaneFocus("bot");
      if (isSuccess) {
        if (bAdc && rAdc) {
          this._recordKill("blue", "red", "adc", "adc", "Marcha no Bot", `🏹 AVANÇO INFERIOR IMPLACÁVEL! ${bAdc.name} atropelou a defesa e eliminou ${rAdc.name}!`);
        }
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 45);
        this.lanePressure = Math.min(100, this.lanePressure + 18);
        this._damageNextStructure("blue", this.redStructures, 35, false, 2.0, "bot");
        this._awardTeamGold("blue", 550);
        this._applyTeamBuff("blue", {
          id: "soul_point",
          name: "Ponto de Alma",
          icon: "🐲",
          bonusCombat: 12,
          duration: 200
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: "MARCHA ESMAGADORA NA BOT LANE!",
          subtitle: `Rota Inferior Quebrada (${prob}% chance)`,
          text: `A rota inferior adversária foi arrebentada (+550g), as tropas azuis chegaram à base e o covil do Dragão está sob domínio absoluto!`
        };
      } else {
        this.lanePressures.bot = Math.max(-100, (this.lanePressures.bot || 0) - 20);
        this.onEvent({
          type: "skirmish",
          side: "red",
          text: `⚠️ A defesa do CBLOL na bot lane segurou a investida e repeliu as tropas.`,
          time: this._formatTime()
        });
        return {
          success: false,
          roll,
          probability: prob,
          title: "DEFESA INFERIOR CONTEVE O AVANÇO",
          subtitle: `Repelência de Tropas (${prob}% chance)`,
          text: `O time rival concentrou recursos na rota inferior e conseguiu segurar a estrutura externa.`
        };
      }
    }
  }

  _resolveHeraldDecision(choiceId, isSuccess, roll, prob) {
    const blueAliveRoles = Object.keys(this.blueRosterState).filter(r => this.blueRosterState[r].alive);
    const redAliveRoles = Object.keys(this.redRosterState).filter(r => this.redRosterState[r].alive);

    if (choiceId === "herald_fight") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O Arauto do Vale rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.heralds = (this.blueScore.heralds || 0) + 1;
        this._awardTeamGold("blue", (350 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 28);
        this._damageNextStructure("blue", this.redStructures, 50, false, 3.0);
        this._applyTeamBuff("blue", {
          id: "herald_buff",
          name: "Olho do Arauto",
          icon: "👁️",
          bonusSiege: 0.35,
          duration: 120
        });

        if (redAliveRoles.length > 0) this._recordKill("blue", "red", blueAliveRoles[0] || "top", redAliveRoles[0]);

        this.onEvent({
          type: "herald",
          side: "blue",
          text: `👁️ BATALHA VENCIDA NO RIO! O seu time conquistou o Arauto e executou uma cabeçada devastadora nas torres!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "ARAUTO DO VALE GARANTIDO!",
          subtitle: `Domínio Superior (${prob}% chance)`,
          text: "Sua equipe venceu o duelo no rio superior, abateu o adversário e soltou a cabeçada do Arauto nas barricadas!"
        };
      } else {
        this.redScore.heralds = (this.redScore.heralds || 0) + 1;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 30);
        this._damageNextStructure("red", this.blueStructures, 35, false, 1.4);
        this._applyTeamBuff("red", {
          id: "herald_buff",
          name: "Olho do Arauto",
          icon: "👁️",
          bonusSiege: 0.35,
          duration: 120
        });

        if (blueAliveRoles.length > 0) this._recordKill("red", "blue", redAliveRoles[0] || "top", blueAliveRoles[0]);

        this.onEvent({
          type: "herald",
          side: "red",
          text: `⚠️ O CBLOL garantiu o Arauto do Vale e avança destruindo barricadas da sua torre!`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "ARAUTO CEDIDO",
          subtitle: `CBLOL Venceu o Rio (${prob}% chance)`,
          text: "O CBLOL levou a melhor na disputa do rio superior e utilizou a investida do monstro para derrubar defesas da sua torre."
        };
      }
    } else if (choiceId === "dive_bot") {
      this.redScore.heralds = (this.redScore.heralds || 0) + 1;
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! A primeira torre no dive rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this._awardTeamGold("red", 150);
        // Destrói a Primeira Torre (T1) vermelha instantaneamente garantindo a promessa de escolha
        this._destroyCurrentStructure("blue", this.redStructures, 250 + bountyGold);
        this.lanePressure = Math.min(100, this.lanePressure + 35);

        const redAdc = "adc";
        const redSupp = "support";
        if (this.redRosterState[redAdc] && this.redRosterState[redAdc].alive) {
          this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redAdc, "Dive 4v2 Fulminante");
        }
        if (this.redRosterState[redSupp] && this.redRosterState[redSupp].alive) {
          this._recordKill("blue", "red", blueAliveRoles[1] || "adc", redSupp, "Execução sob a Torre");
        }

        this.onEvent({
          type: "dive",
          side: "blue",
          text: `🏹 DIVE ESPETACULAR NO BOT! O seu time mergulhou na bot lane, abateu a dupla adversária e derrubou a Primeira Torre do jogo! (+650g)`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "DIVE DEVASTADOR NA BOT LANE!",
          subtitle: `Primeira Torre Garantida (${prob}% chance)`,
          text: "Enquanto o rival perdia tempo no Arauto, seu time desceu 4 homens na bot lane, abateu o Atirador e o Suporte adversários e levou a torre!"
        };
      } else {
        this._awardTeamGold("red", 200);
        this.lanePressure = Math.max(-100, this.lanePressure - 35);
        this._damageNextStructure("red", this.blueStructures, 40, false, 1.5);
        if (blueAliveRoles.length > 0) this._recordKill("red", "blue", redAliveRoles[0] || "mid", blueAliveRoles[0], "Tiro de Torre", `🔴 O dive foi punido pela torre defensiva!`);
        if (blueAliveRoles.length > 1) this._recordKill("red", "blue", redAliveRoles[1] || "adc", blueAliveRoles[1], "Contra-Ataque sob a Torre");
        return {
          success: false,
          roll,
          probability: prob,
          title: "DIVE DESASTROSO",
          subtitle: `Punição sob a Torre (${prob}% chance)`,
          text: "A torre causou dano massivo aos invasores e o CBLOL virou a luta com 2 abates, aproveitando o Arauto para avançar nas rotas."
        };
      }
    } else if (choiceId === "herald_dive_mid") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O dive no mid rendeu +250 Ouro Global!`,
            time: this._formatTime()
          });
        }
        this.blueScore.heralds = (this.blueScore.heralds || 0) + 1;
        this._awardTeamGold("blue", (400 + bountyGold));
        this.lanePressure = Math.min(100, this.lanePressure + 40);
        this._damageNextStructure("blue", this.redStructures, 65, false, 3.0);
        this._applyTeamBuff("blue", {
          id: "herald_buff",
          name: "Olho do Arauto",
          icon: "👁️",
          bonusSiege: 0.35,
          duration: 120
        });

        const redMid = "mid";
        if (this.redRosterState[redMid] && this.redRosterState[redMid].alive) {
          this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redMid, "Dive Brutal no Mid");
        }

        this.onEvent({
          type: "herald",
          side: "blue",
          text: `👁️ ARAUTO & DIVE NO MID! Seu time garantiu o Arauto e mergulhou na torre do mid eliminando o adversário!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "ARAUTO & DIVE DEVASTADOR NO MID!",
          subtitle: `Domínio Total da Rota Central (${prob}% chance)`,
          text: "Sua equipe pegou o Arauto e marchou direto para o meio, abatendo o Mid laner sob a torre e soltando a cabeçada colossal!"
        };
      } else {
        this._awardTeamGold("red", 200);
        this.lanePressure = Math.max(-100, this.lanePressure - 25);
        if (blueAliveRoles.length > 0) this._recordKill("red", "blue", redAliveRoles[0] || "mid", blueAliveRoles[0], "Defesa de Torre");
        return {
          success: false,
          roll,
          probability: prob,
          title: "DIVE NO MID FRUSTRADO",
          subtitle: `Torre Defendida (${prob}% chance)`,
          text: "O Mid inimigo usou o desarme sob a torre, resistiu ao dive e forçou o recuo da sua equipe."
        };
      }
    } else if (choiceId === "bush_trap") {
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 250;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! A emboscada do Arauto rendeu +250 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this.blueScore.heralds = (this.blueScore.heralds || 0) + 1;
        this._awardTeamGold("blue", (150 + bountyGold));
        if (redAliveRoles.length > 0) this._recordKill("blue", "red", blueAliveRoles[0] || "mid", redAliveRoles[0], "Emboscada no Mato do Arauto");
        this._damageNextStructure("blue", this.redStructures, 25, false, 1.3);
        return {
          success: true,
          roll,
          probability: prob,
          title: "ARMADILHA NO MATO PERFEITA!",
          subtitle: `Emboscada Fulminante (${prob}% chance)`,
          text: "O Caçador inimigo veio fazer o Arauto sozinho e caiu direto no mato do rio! Abate limpo e monstro garantido!"
        };
      } else {
        this.redScore.heralds = (this.redScore.heralds || 0) + 1;
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 30);
        this._damageNextStructure("red", this.blueStructures, 35, false, 1.4);
        if (blueAliveRoles.length > 0) this._recordKill("red", "blue", redAliveRoles[0] || "mid", blueAliveRoles[0], "Cercado no Mato");
        return {
          success: false,
          roll,
          probability: prob,
          title: "ARMADILHA REVELADA",
          subtitle: `CBLOL Antecipou (${prob}% chance)`,
          text: "Uma sentinela revelou a emboscada: o time adversário cercou o arbusto, eliminou um aliado e garantiu o Arauto."
        };
      }
    } else {
      // vision_control / cross_trade_herald
      if (isSuccess) {
        let bountyGold = 0;
        if (this.objectiveBountiesActive) {
          bountyGold = 200;
          this.onEvent({
            type: "objective_bounty",
            side: "blue",
            text: `🎯 ABSORÇÃO DEFENSIVA! A defesa sob a torre rendeu +200 Ouro Global de Virada!`,
            time: this._formatTime()
          });
        }
        this._awardTeamGold("red", 150);
        this._awardTeamGold("blue", (150 + bountyGold));
        this.onEvent({
          type: "skirmish",
          side: "blue",
          text: `🛡️ DEFESA SÓLIDA! Seu time absorveu o Arauto sob a torre com maestria sem sofrer dano estrutural!`,
          time: this._formatTime()
        });
        return {
          success: true,
          roll,
          probability: prob,
          title: choiceId === "cross_trade_herald" ? "ABSORÇÃO & FARM DE BARRICADAS" : "ABSORÇÃO DEFENSIVA PERFEITA",
          subtitle: `Defesa sob a Torre (${prob}% chance)`,
          text: choiceId === "cross_trade_herald"
            ? "Sua equipe concedeu o Arauto deliberadamente, recuou sob a torre e cobrou recursos farmando barricadas na rota oposta!"
            : "Sua equipe posicionou sentinelas, limpou a investida do Arauto com facilidade e coletou o ouro da onda com total segurança."
        };
      } else {
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 20);
        this._damageNextStructure("red", this.blueStructures, 25, false, 1.2);
        return {
          success: false,
          roll,
          probability: prob,
          title: "TORRE PRESSIONADA PELO ARAUTO",
          subtitle: `Dano Estrutural (${prob}% chance)`,
          text: "A cabeçada do Arauto acertou em cheio as defesas da torre antes das tropas serem limpas (+450g para o CBLOL)."
        };
      }
    }
  }

  _triggerLaneSkirmish() {
    const zones = ["top", "mid", "bot", "jungle"];
    let lane;
    if (this.focusedLane && Math.random() < 0.60) {
      lane = this.focusedLane;
    } else {
      lane = zones[Math.floor(Math.random() * zones.length)];
    }

    const bTop = this.blueRosterState.top;
    const rTop = this.redRosterState.top;
    const bJg = this.blueRosterState.jungle;
    const rJg = this.redRosterState.jungle;
    const bMid = this.blueRosterState.mid;
    const rMid = this.redRosterState.mid;
    const bAdc = this.blueRosterState.adc;
    const rAdc = this.redRosterState.adc;
    const bSupp = this.blueRosterState.support;
    const rSupp = this.redRosterState.support;

    const tacticBonus = (this.playerTactics === "aggressive") ? 5 : ((this.playerTactics === "defense") ? -4 : 0);

    if (lane === "jungle") {
      if (!bJg || !bJg.alive || !rJg || !rJg.alive) return false;
      const bMidAlive = bMid && bMid.alive;
      const rMidAlive = rMid && rMid.alive;
      const bPower = (bJg.stats?.combat || 75) + (bMidAlive ? 8 : 0) + (bJg.items?.length || 0) * 8 + tacticBonus + (Math.random() * 20);
      const rPower = (rJg.stats?.combat || 75) + (rMidAlive ? 8 : 0) + (rJg.items?.length || 0) * 8 + (Math.random() * 20);
      if (bPower > rPower + 8.5) {
        this._recordKill("blue", "red", "jungle", "jungle", "Disputa na Selva", `🌲 DISPUTA NO RIO! ${bJg.name} garantiu o Golpear no Aronguejo e abateu ${rJg.name} na disputa por visão!`);
        this._applyTeamBuff("blue", {
          id: "river_vision",
          name: "Controle do Rio",
          icon: "👁️",
          bonusCombat: 5,
          duration: 120
        });
        this._awardTeamGold("blue", 180);
        this.combatCooldown = 55;
        return true;
      } else if (rPower > bPower + 8.5) {
        this._recordKill("red", "blue", "jungle", "jungle", "Invasão de Selva", `🔴 INVASÃO RIVAL! O caçador adversário emboscou ${bJg.name} no rio e garantiu a eliminação!`);
        this.combatCooldown = 55;
        return true;
      } else {
        this.onEvent({
          type: "skirmish",
          side: "neutral",
          text: `🌲 Disputa equilibrada pelo Aronguejo no rio! Ambos os caçadores recuaram após trocarem feitiços.`,
          time: this._formatTime()
        });
        this.combatCooldown = 30;
        return true;
      }
    } else if (lane === "top") {
      if (!bTop || !bTop.alive || !rTop || !rTop.alive) return false;
      const topPress = (this.lanePressures && this.lanePressures.top) || 0;
      const blueOverextended = topPress >= 28;
      const redOverextended = topPress <= -28;
      const rGankBonus = (blueOverextended && rJg && rJg.alive) ? 22 : 0;
      const bGankBonus = (redOverextended && bJg && bJg.alive) ? 22 : 0;

      const bPower = (bTop.stats?.combat || 75) + (bTop.items?.length || 0) * 8 + tacticBonus + bGankBonus + (Math.random() * 20);
      const rPower = (rTop.stats?.combat || 75) + (rTop.items?.length || 0) * 8 + rGankBonus + (Math.random() * 20);
      if (bPower > rPower + 8.5) {
        if (redOverextended && bJg && bJg.alive) {
          this._recordKill("blue", "red", "jungle", "top", "Punição sob a Torre", `🛡️ PUNIÇÃO SOB A TORRE NO TOPO! ${rTop.name} tentava pressionar debaixo da torre e ${bJg.name} puniu com um gank fulminante!`);
        } else {
          this._recordKill("blue", "red", "top", "top", "Solo Kill no Top", `⚡ SOLO KILL NO TOPO! ${bTop.name} superou ${rTop.name} na troca mecânica e garantiu o abate!`);
        }
        if (this.lanePressures) this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 18);
        this.lanePressure = Math.min(100, this.lanePressure + 8);
        this._damageNextStructure("blue", this.redStructures, 10, false, 0.85, "top");
        this.combatCooldown = 60;
        return true;
      } else if (rPower > bPower + 8.5) {
        if (blueOverextended && rJg && rJg.alive) {
          this._recordKill("red", "blue", "jungle", "top", "Gank Punidor sob a Torre", `⚠️ GANK PUNIDOR NO TOPO! ${bTop.name} estava pressionando debaixo da torre e sofreu um flanco letal de ${rJg.name} pelas costas!`);
        } else {
          this._recordKill("red", "blue", "top", "top", "Solo Kill no Top", `🔴 SOLO KILL NO TOPO! ${rTop.name} aproveitou o avanço rival e abateu ${bTop.name}!`);
        }
        if (this.lanePressures) this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 18);
        this.lanePressure = Math.max(-100, this.lanePressure - 8);
        this._damageNextStructure("red", this.blueStructures, 10, false, 0.85, "top");
        this.combatCooldown = 60;
        return true;
      } else {
        this.onEvent({
          type: "skirmish",
          side: "neutral",
          text: `🛡️ Troca agressiva na rota do topo! ${bTop.name} e ${rTop.name} gastaram feitiços e recuaram com pouca vida.`,
          time: this._formatTime()
        });
        this.combatCooldown = 30;
        return true;
      }
    } else if (lane === "mid") {
      if (!bMid || !bMid.alive || !rMid || !rMid.alive) return false;
      const midPress = (this.lanePressures && this.lanePressures.mid) || 0;
      const blueOverextended = midPress >= 28;
      const redOverextended = midPress <= -28;
      const rGankBonus = (blueOverextended && rJg && rJg.alive) ? 22 : 0;
      const bGankBonus = (redOverextended && bJg && bJg.alive) ? 22 : 0;

      const bPower = (bMid.stats?.combat || 75) + (bMid.items?.length || 0) * 8 + tacticBonus + bGankBonus + (Math.random() * 20);
      const rPower = (rMid.stats?.combat || 75) + (rMid.items?.length || 0) * 8 + rGankBonus + (Math.random() * 20);
      if (bPower > rPower + 8.5) {
        if (redOverextended && bJg && bJg.alive) {
          this._recordKill("blue", "red", "jungle", "mid", "Punição sob a Torre", `⚡ PUNIÇÃO SOB A TORRE NO MEIO! ${rMid.name} avançou debaixo da torre e ${bJg.name} emboscou pela lateral!`);
        } else {
          const isGank = bJg && bJg.alive && Math.random() < 0.35;
          const kRole = isGank ? "jungle" : "mid";
          const kTxt = isGank
            ? `⚡ GANK PERFEITO NO MID! ${bJg.name} emboscou pela fumaça e abateu ${rMid.name}!`
            : `⚡ EXPLOSÃO NO MID! ${bMid.name} acertou todo o combo e abateu ${rMid.name}!`;
          this._recordKill("blue", "red", kRole, "mid", isGank ? "Gank no Mid" : "Solo Kill no Mid", kTxt);
        }
        if (this.lanePressures) this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 18);
        this.lanePressure = Math.min(100, this.lanePressure + 8);
        this._damageNextStructure("blue", this.redStructures, 10, false, 0.85, "mid");
        this.combatCooldown = 60;
        return true;
      } else if (rPower > bPower + 8.5) {
        if (blueOverextended && rJg && rJg.alive) {
          this._recordKill("red", "blue", "jungle", "mid", "Gank Punidor sob a Torre", `⚠️ GANK PUNIDOR NO MEIO! ${bMid.name} pressionava debaixo da torre inimiga e tomou um flanco letal de ${rJg.name}!`);
        } else {
          const isGank = rJg && rJg.alive && Math.random() < 0.35;
          const kRole = isGank ? "jungle" : "mid";
          const kTxt = isGank
            ? `🔴 GANK RIVAL NO MID! O caçador adversário apareceu pelas costas e abateu ${bMid.name}!`
            : `🔴 SOLO KILL NO MID! ${rMid.name} dominou a troca mágica e eliminou ${bMid.name}!`;
          this._recordKill("red", "blue", kRole, "mid", isGank ? "Gank no Mid" : "Solo Kill no Mid", kTxt);
        }
        if (this.lanePressures) this.lanePressures.mid = Math.max(-100, (this.lanePressures.mid || 0) - 18);
        this.lanePressure = Math.max(-100, this.lanePressure - 8);
        this._damageNextStructure("red", this.blueStructures, 10, false, 0.85, "mid");
        this.combatCooldown = 60;
        return true;
      } else {
        this.onEvent({
          type: "skirmish",
          side: "neutral",
          text: `🛡️ Duelo mágico equilibrado na rota do meio! Ambos os magos recuaram para farmar.`,
          time: this._formatTime()
        });
        this.combatCooldown = 30;
        return true;
      }
    } else {
      // bot lane
      if (!bAdc || !bAdc.alive || !rAdc || !rAdc.alive) return false;
      const bSuppAlive = bSupp && bSupp.alive;
      const rSuppAlive = rSupp && rSupp.alive;
      const botPress = (this.lanePressures && this.lanePressures.bot) || 0;
      const blueOverextended = botPress >= 28;
      const redOverextended = botPress <= -28;
      const rGankBonus = (blueOverextended && rJg && rJg.alive) ? 22 : 0;
      const bGankBonus = (redOverextended && bJg && bJg.alive) ? 22 : 0;

      const bPower = (bAdc.stats?.combat || 75) + (bSuppAlive ? (bSupp.stats?.combat || 70) * 0.4 : 0) + (bAdc.items?.length || 0) * 8 + tacticBonus + bGankBonus + (Math.random() * 20);
      const rPower = (rAdc.stats?.combat || 75) + (rSuppAlive ? (rSupp.stats?.combat || 70) * 0.4 : 0) + (rAdc.items?.length || 0) * 8 + rGankBonus + (Math.random() * 20);
      if (bPower > rPower + 8.5) {
        const victimRole = rSuppAlive && Math.random() < 0.5 ? "support" : "adc";
        const victimName = this.redRosterState[victimRole].name;
        if (redOverextended && bJg && bJg.alive) {
          this._recordKill("blue", "red", "jungle", victimRole, "Punição sob a Torre", `🏹 PUNIÇÃO SOB A TORRE NO BOT! A dupla adversária tentava pressionar e ${bJg.name} fechou a pinça pelas costas eliminando ${victimName}!`);
        } else {
          this._recordKill("blue", "red", "adc", victimRole, "All-In no Bot", `🏹 ALL-IN LETAL NA ROTA INFERIOR! ${bAdc.name} acertou os disparos críticos e abateu ${victimName}!`);
        }
        if (this.lanePressures) this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 20);
        this.lanePressure = Math.min(100, this.lanePressure + 10);
        this._damageNextStructure("blue", this.redStructures, 12, false, 0.9, "bot");
        this.combatCooldown = 60;
        return true;
      } else if (rPower > bPower + 8.5) {
        const victimRole = bSuppAlive && Math.random() < 0.5 ? "support" : "adc";
        const victimName = this.blueRosterState[victimRole].name;
        if (blueOverextended && rJg && rJg.alive) {
          this._recordKill("red", "blue", "jungle", victimRole, "Gank Punidor sob a Torre", `⚠️ GANK PUNIDOR NO BOT! A bot lane estava colocando o adversário sob a torre sem sentinela no rio e tomou um flanco fatal de ${rJg.name}!`);
        } else {
          this._recordKill("red", "blue", "adc", victimRole, "All-In no Bot", `🔴 PRESSÃO NO BOT! ${rAdc.name} conquistou o abate sobre ${victimName}!`);
        }
        if (this.lanePressures) this.lanePressures.bot = Math.max(-100, (this.lanePressures.bot || 0) - 20);
        this.lanePressure = Math.max(-100, this.lanePressure - 10);
        this._damageNextStructure("red", this.blueStructures, 12, false, 0.9, "bot");
        this.combatCooldown = 60;
        return true;
      } else {
        this.onEvent({
          type: "skirmish",
          side: "neutral",
          text: `🛡️ Troca intensa no 2v2 da bot lane! Curas e barreiras foram ativadas e as duplas reposicionaram.`,
          time: this._formatTime()
        });
        this.combatCooldown = 30;
        return true;
      }
    }
  }

  _triggerDecisiveCombat(winnerSide, loserSide, margin, isForcedCounter = false) {
    // Intervalo de recarga de combate: pacing realista de CBLOL e Mundial (12 a 18 kills por partida)
    this.combatCooldown = 65;

    const winnerScore = winnerSide === "blue" ? this.blueScore : this.redScore;
    const winnerRoster = winnerSide === "blue" ? this.blueRosterState : this.redRosterState;
    const loserRoster = winnerSide === "blue" ? this.redRosterState : this.blueRosterState;

    // Só quem está VIVO no time perdedor pode ser abatido
    const aliveVictimRoles = Object.keys(loserRoster).filter(r => loserRoster[r].alive);
    if (aliveVictimRoles.length === 0) return;

    // Abates decisivos: no early game são 1 ou 2 abates pontuais; no late game (25m+, 33m+) teamfights decisivas produzem 2 a 4 abates ou até ACE quando a margem for alta
    // Abates decisivos: no early game são 1 ou 2 abates pontuais; no late game (25m+, 33m+, 38m+) teamfights decisivas produzem 2 a 4 abates ou até ACE quando a margem for alta
    let killsCount = 1;
    if (this.gameSeconds >= 2280) { // 38m+ (Ultra Late Game)
      if (margin > 12 && aliveVictimRoles.length >= 3) {
        killsCount = Math.min(aliveVictimRoles.length, Math.random() < 0.65 ? 4 : 3);
      } else if (aliveVictimRoles.length >= 2) {
        killsCount = 2;
      }
    } else if (this.gameSeconds >= 1980) { // 33m+
      if (margin > 18 && aliveVictimRoles.length >= 3) {
        killsCount = Math.min(aliveVictimRoles.length, Math.random() < 0.5 ? 4 : 3);
      } else if (aliveVictimRoles.length >= 2) {
        killsCount = 2;
      }
    } else if (this.gameSeconds >= 1500) { // 25m+
      if (margin > 20 && aliveVictimRoles.length >= 3) {
        killsCount = Math.min(aliveVictimRoles.length, 3);
      } else if (margin > 10 && aliveVictimRoles.length >= 2) {
        killsCount = 2;
      }
    } else {
      if (margin > 24 && aliveVictimRoles.length >= 2) {
        killsCount = 2; // Vitória tática expressiva early
      }
    }

    for (let i = 0; i < killsCount; i++) {
      if (aliveVictimRoles.length === 0) break;

      const victimRoleIndex = Math.floor(Math.random() * aliveVictimRoles.length);
      const victimRole = aliveVictimRoles.splice(victimRoleIndex, 1)[0];

      // Sorteia quem do time vencedor pegou o abate
      const aliveKillerRoles = Object.keys(winnerRoster).filter(r => winnerRoster[r].alive);
      const killerRole = aliveKillerRoles.length > 0
        ? aliveKillerRoles[Math.floor(Math.random() * aliveKillerRoles.length)]
        : "mid";

      const killerObj = winnerRoster[killerRole];
      const victimObj = loserRoster[victimRole];
      const customPrefix = isForcedCounter ? "⚡ [CONTRA-ATAQUE]" : null;
      const customTxt = customPrefix && killerObj && victimObj
        ? `${customPrefix} ${killerObj.name} abateu ${victimObj.name} com maestria!`
        : null;

      this._recordKill(winnerSide, loserSide, killerRole, victimRole, null, customTxt);
    }

    // Troca de abates (Trade Kill): Em ~20% dos confrontos equilibrados o time perdedor revida e leva um abate
    const loserAliveAfter = Object.keys(loserRoster).filter(r => loserRoster[r].alive);
    const winnerAliveAfter = Object.keys(winnerRoster).filter(r => winnerRoster[r].alive);
    if (!isForcedCounter && loserAliveAfter.length > 0 && winnerAliveAfter.length > 0 && Math.random() < 0.20) {
      const tradeVictimRole = winnerAliveAfter[Math.floor(Math.random() * winnerAliveAfter.length)];
      const tradeKillerRole = loserAliveAfter[Math.floor(Math.random() * loserAliveAfter.length)];
      const tKiller = loserRoster[tradeKillerRole];
      const tVictim = winnerRoster[tradeVictimRole];
      const tTxt = (tKiller && tVictim)
        ? `⚔️ [RESPOSTA] ${tKiller.name} revidou na luta e abateu ${tVictim.name} antes de cair!`
        : null;
      this._recordKill(loserSide, winnerSide, tradeKillerRole, tradeVictimRole, null, tTxt);
    }

    // O time com vantagem numérica golpeia a estrutura na rota com maior pressão
    const enemyStructures = winnerSide === "blue" ? this.redStructures : this.blueStructures;
    let chosenLane = "mid";
    if (winnerSide === "blue" && this.focusedLane) {
      chosenLane = this.focusedLane;
    } else if (this.lanePressures) {
      const lanes = ["mid", "top", "bot"];
      if (winnerSide === "blue") {
        lanes.sort((a, b) => (this.lanePressures[b] || 0) - (this.lanePressures[a] || 0));
      } else {
        lanes.sort((a, b) => (this.lanePressures[a] || 0) - (this.lanePressures[b] || 0));
      }
      chosenLane = lanes[0];
    }
    const siegeIntensity = this.gameSeconds >= 2280 ? 1.7 : (this.gameSeconds >= 1980 ? 1.5 : (this.gameSeconds >= 1500 ? 1.35 : 1.2));
    this._damageNextStructure(winnerSide, enemyStructures, margin, isForcedCounter, siegeIntensity, chosenLane);
  }

  _triggerSkirmishEqual() {
    this.combatCooldown = Math.max(this.combatCooldown, 25);
    const texts = [
      "⚔️ Disputa de rota equilibrada! Tropas limpas e equipes reposicionam.",
      "🛡️ Troca cautelosa de dano pelo rio sem abates.",
      "⚡ Controle de visão no rio disputado; suportes protegem suas linhas.",
      "💥 Luta tensa! Habilidades trocadas, mas as defesas permanecem sólidas."
    ];
    this.onEvent({
      type: "skirmish",
      side: "neutral",
      text: texts[Math.floor(Math.random() * texts.length)],
      time: this._formatTime()
    });
  }

  _destroyCurrentStructure(attackerSide, targetStructures, bonusTeamGold = 0) {
    const target = this._getCurrentTargetStructure(targetStructures);
    if (!target) return;
    target.plates = 0;
    target.currentHp = 0;
    target.destroyed = true;

    let bountyBonus = 0;
    if (attackerSide === "blue" && this.objectiveBountiesActive && target.id !== "nexus") {
      bountyBonus = 300;
      this.onEvent({
        type: "objective_bounty",
        side: "blue",
        text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! A equipe derrubou a ${target.name} e garantiu +300 Ouro Global de Virada!`,
        time: this._formatTime()
      });
    }

    const attackerScore = attackerSide === "blue" ? this.blueScore : this.redScore;
    const totalAward = target.goldValue + bountyBonus + bonusTeamGold;
    attackerScore.gold += totalAward;

    const attackerRosterObj = attackerSide === "blue" ? this.blueRosterState : this.redRosterState;
    const aliveAttackers = Object.values(attackerRosterObj).filter(c => c.alive);
    const splitTurretGold = Math.round(totalAward / Math.max(1, aliveAttackers.length));
    aliveAttackers.forEach(c => {
      c.goldEarned = (c.goldEarned || 500) + splitTurretGold;
      c.turrets = (c.turrets || 0) + 1;
    });

    if (target.tier === "inhib" || target.id.includes("inhib")) {
      attackerScore.inhibitors = (attackerScore.inhibitors || 0) + 1;
      const lane = target.lane || "mid";
      if (attackerSide === "blue") {
        this.blueSuperMinions = true;
        if (this.blueSuperMinionsByLane) this.blueSuperMinionsByLane[lane] = true;
        if (this.redInhibRespawnAt) this.redInhibRespawnAt[lane] = this.gameSeconds + 240;
      } else {
        this.redSuperMinions = true;
        if (this.redSuperMinionsByLane) this.redSuperMinionsByLane[lane] = true;
        if (this.blueInhibRespawnAt) this.blueInhibRespawnAt[lane] = this.gameSeconds + 240;
      }
      this.onEvent({
        type: "inhibitor_destroyed",
        side: attackerSide,
        text: `🏰 INIBIDOR DESTRUÍDO! O ${target.name} ${attackerSide === "blue" ? "Vermelho" : "Azul"} ruiu! Super Tropas ativadas!`,
        time: this._formatTime()
      });
    } else if (target.id === "nexus") {
      this.onEvent({
        type: "nexus_destroyed",
        side: attackerSide,
        text: `🚨 O NEXUS ${attackerSide === "blue" ? "VERMELHO" : "AZUL"} EXPLODIU! GG WP!`,
        time: this._formatTime()
      });
    } else {
      attackerScore.towers = (attackerScore.towers || 0) + 1;
      const firstBrick = ((target.tier === 1 || target.id.includes("t1")) && !this._firstBrickGiven);
      if (firstBrick) {
        this._firstBrickGiven = true;
        attackerScore.gold += 250;
        this.onEvent({
          type: "tower_destroyed",
          side: attackerSide,
          text: `🏰 PRIMEIRA TORRE DO JOGO (FIRST BRICK)! A ${target.name} ${attackerSide === "blue" ? "Vermelha" : "Azul"} caiu! (+250 Ouro Bônus)`,
          time: this._formatTime()
        });
      } else {
        this.onEvent({
          type: "tower_destroyed",
          side: attackerSide,
          text: `🏰 A ${target.name} ${attackerSide === "blue" ? "Vermelha" : "Azul"} foi DESTRUÍDA!`,
          time: this._formatTime()
        });
      }

      // Acontecimentos e Transições Táticas ao Derrubar Torre
      if (attackerSide === "blue" && !this.activeDecision && !this.isFinished) {
        const lane = target.lane || "mid";
        const postTowerDecision = this._buildPostTowerDecision(target, lane);
        if (postTowerDecision) {
          this._triggerTacticalDecision(postTowerDecision);
        }
      }
    }

    this.onStructureHit(attackerSide === "blue" ? "red" : "blue", target.id, 0, target.maxHp);
    this.onStructureDestroyed(attackerSide === "blue" ? "red" : "blue", target.id);

    if (attackerSide === "blue") {
      this.lanePressure = Math.max(20, this.lanePressure + 25);
    } else {
      this.lanePressure = Math.min(-20, this.lanePressure - 25);
    }
    this._syncTeamGold();
  }

  _damageNextStructure(attackerSide, targetStructures, margin, isForcedCounter = false, intensityMod = 1.0, preferredLane = null, isFollowThrough = false) {
    const target = this._getCurrentTargetStructure(targetStructures, preferredLane);
    if (!target) return;

    const isEarlyGame = this.gameSeconds < 840; // Antes de 14:00 (Placas ativas)
    const attackerPushStat = attackerSide === "blue"
      ? (this.blueTeam.stats.push || 75)
      : (this.redTeam.stats.push || 75);

    const defenderTankStat = attackerSide === "blue"
      ? (this.redTeam.stats.tank || 75)
      : (this.blueTeam.stats.tank || 75);

    const hasSuper = attackerSide === "blue" ? this.blueSuperMinions : this.redSuperMinions;
    const hasBaron = attackerSide === "blue"
      ? this.gameSeconds < this.blueBaronUntil
      : this.gameSeconds < this.redBaronUntil;

    // Se o jogador estiver em postura defensiva e for o atacado, reduz o dano sofrido
    const defenseBonus = (attackerSide === "red" && this.playerTactics === "defense") ? 0.82 : 1.0;

    // Buffs de cerco e defesa
    const attackerBuffs = this._getTeamBuffModifiers ? this._getTeamBuffModifiers(attackerSide) : { bonusSiege: 0 };
    const defenderBuffs = this._getTeamBuffModifiers ? this._getTeamBuffModifiers(attackerSide === "blue" ? "red" : "blue") : { bonusDefense: 0 };

    // Dano base contra estruturas calibrado para permitir cerco sem derreter torres instantaneamente
    let baseDamage = (attackerPushStat * 4.2) - (defenderTankStat * 1.0) + (margin * 5);
    baseDamage = Math.max(280, Math.min(620, baseDamage));

    if (hasSuper) baseDamage += 320;
    if (hasBaron) baseDamage += 400;
    if (isForcedCounter) baseDamage += 250;

    // Bônus e mitigação de Buffs táticos
    if (attackerBuffs.bonusSiege) {
      baseDamage *= (1 + attackerBuffs.bonusSiege);
    }
    if (defenderBuffs.bonusDefense) {
      baseDamage *= (1 - Math.min(0.5, defenderBuffs.bonusDefense * 0.01));
    }

    // Barricadas antes de 14 min amortecem o impacto (redução de 20%)
    if (isEarlyGame && target.tier === 1) {
      baseDamage *= 0.80;
    }

    // Vantagem de cerco por superioridade numérica (quando adversários estão mortos)
    const attackerRoster = attackerSide === "blue" ? this.blueRosterState : this.redRosterState;
    const defenderRoster = attackerSide === "blue" ? this.redRosterState : this.blueRosterState;
    const defenderAlive = Object.values(defenderRoster).filter(c => c.alive).length;

    let manpowerSiegeMod = 1.0;
    if (defenderAlive === 0) manpowerSiegeMod = 2.4; // ACE!
    else if (defenderAlive === 1) manpowerSiegeMod = 1.8;
    else if (defenderAlive === 2) manpowerSiegeMod = 1.4;
    else if (defenderAlive === 3) manpowerSiegeMod = 1.2;
    else if (defenderAlive === 4) manpowerSiegeMod = 1.05;
    else manpowerSiegeMod = 0.9;

    let lateGameSiegeMod = 1.0;
    if (this.gameSeconds >= 2640) { // 44m+
      lateGameSiegeMod = 3.0;
    } else if (this.gameSeconds >= 2280) { // 38m+
      lateGameSiegeMod = 2.6;
    } else if (this.gameSeconds >= 2040) { // 34m+
      lateGameSiegeMod = 2.3;
    } else if (this.gameSeconds >= 1680) { // 28m+
      lateGameSiegeMod = 1.85;
    } else if (this.gameSeconds >= 1200) { // 20m+
      lateGameSiegeMod = 1.35;
    }
    let finalDamage = Math.floor(baseDamage * defenseBonus * intensityMod * manpowerSiegeMod * lateGameSiegeMod * (0.90 + Math.random() * 0.22));

    target.currentHp = Math.max(0, target.currentHp - finalDamage);

    // Sistema de Barricadas da T1
    if (target.tier === 1 && target.plates > 0) {
      const hpPerPlate = target.maxHp / 5;
      const expectedPlates = Math.max(0, Math.ceil(target.currentHp / hpPerPlate));
      if (expectedPlates < target.plates) {
        target.plates = expectedPlates;
        // Barricada oficial do League of Legends: 125g por placa
        const plateGold = 125;
        if (attackerSide === "blue") this._awardTeamGold("blue", plateGold);
        else this._awardTeamGold("red", plateGold);

        this.onEvent({
          type: "plate",
          side: attackerSide,
          text: `💰 ${attackerSide === "blue" ? this.blueTeam.name : this.redTeam.name} destruiu uma BARRICADA da ${target.name}! (+${plateGold} Ouro)`,
          time: this._formatTime()
        });
      }
    }

    this.onStructureHit(
      attackerSide === "blue" ? "red" : "blue",
      target.id,
      target.currentHp,
      target.maxHp
    );

    if (target.currentHp <= 0 && !target.destroyed) {
      target.destroyed = true;
      let bountyBonus = 0;
      if (attackerSide === "blue" && this.objectiveBountiesActive && target.id !== "nexus") {
        // Recompensa de virada calibrada oficial (~300g)
        bountyBonus = 300;
        this.onEvent({
          type: "objective_bounty",
          side: "blue",
          text: `🎯 RECOMPENSA DE OBJETIVO COLETADA! O seu time destruiu a ${target.name} e garantiu +300 Ouro Global de Virada!`,
          time: this._formatTime()
        });
      }
      const attackerScore = attackerSide === "blue" ? this.blueScore : this.redScore;
      attackerScore.gold += (target.goldValue + bountyBonus);

      if (target.tier === "inhib") {
        attackerScore.inhibitors = (attackerScore.inhibitors || 0) + 1;
      } else if (target.id !== "nexus") {
        attackerScore.towers = (attackerScore.towers || 0) + 1;
      }

      const attackerRosterObj = attackerSide === "blue" ? this.blueRosterState : this.redRosterState;
      const aliveAttackers = Object.values(attackerRosterObj).filter(c => c.alive);
      const splitTurretGold = Math.round((target.goldValue + bountyBonus) / Math.max(1, aliveAttackers.length));
      aliveAttackers.forEach(c => {
        c.goldEarned = (c.goldEarned || 500) + splitTurretGold;
        c.turrets = (c.turrets || 0) + 1;
      });

      this.onStructureDestroyed(
        attackerSide === "blue" ? "red" : "blue",
        target.id
      );

      // A onda de tropas recua/reseta temporariamente após a queda de uma torre
      if (target.id !== "nexus") {
        const lane = target.lane;
        if (lane && this.lanePressures && this.lanePressures[lane] !== undefined) {
          if (attackerSide === "blue") {
            this.lanePressures[lane] = Math.max(15, this.lanePressures[lane] - 35);
          } else {
            this.lanePressures[lane] = Math.min(-15, this.lanePressures[lane] + 35);
          }
        }
        if (attackerSide === "blue") {
          this.lanePressure = Math.max(15, this.lanePressure - 25);
        } else {
          this.lanePressure = Math.min(-15, this.lanePressure + 25);
        }
      }

      if (target.tier === "inhib") {
        const lane = target.lane || "mid";
        const laneLabel = { top: "Superior", mid: "do Meio", bot: "Inferior" }[lane] || "";
        if (attackerSide === "blue") {
          this.blueSuperMinions = true;
          if (this.blueSuperMinionsByLane) this.blueSuperMinionsByLane[lane] = true;
          if (this.redInhibRespawnAt) this.redInhibRespawnAt[lane] = this.gameSeconds + 240;
        } else {
          this.redSuperMinions = true;
          if (this.redSuperMinionsByLane) this.redSuperMinionsByLane[lane] = true;
          if (this.blueInhibRespawnAt) this.blueInhibRespawnAt[lane] = this.gameSeconds + 240;
        }
        this.onEvent({
          type: "inhibitor_destroyed",
          side: attackerSide,
          text: `💥 O Inibidor ${laneLabel} ${attackerSide === "blue" ? "Vermelho" : "Azul"} foi DESTRUÍDO! SUPER TROPAS NA ROTA!`,
          time: this._formatTime()
        });
      } else if (target.id === "nexus") {
        this.onEvent({
          type: "nexus_destroyed",
          side: attackerSide,
          text: `🚨 O NEXUS ${attackerSide === "blue" ? "VERMELHO" : "AZUL"} EXPLODIU! GG WP!`,
          time: this._formatTime()
        });
      } else {
        const firstBrick = (target.tier === 1 && !this._firstBrickGiven);
        if (firstBrick) {
          this._firstBrickGiven = true;
          attackerScore.gold += 250;
          const splitBrick = Math.round(250 / Math.max(1, aliveAttackers.length));
          aliveAttackers.forEach(c => {
            c.goldEarned = (c.goldEarned || 500) + splitBrick;
          });
          this.onEvent({
            type: "tower_destroyed",
            side: attackerSide,
            text: `🏰 PRIMEIRA TORRE DO JOGO (FIRST BRICK)! A ${target.name} ${attackerSide === "blue" ? "Vermelha" : "Azul"} caiu! (+250 Ouro Bônus)`,
            time: this._formatTime()
          });
        } else {
          this.onEvent({
            type: "tower_destroyed",
            side: attackerSide,
            text: `🏰 A ${target.name} ${attackerSide === "blue" ? "Vermelha" : "Azul"} foi DESTRUÍDA!`,
            time: this._formatTime()
          });
        }
      }
      this._syncTeamGold();

      // Push contínuo / Follow-through se defensores estão com baixas críticas ou time com Barão
      if (!isFollowThrough && target.id !== "nexus") {
        const canFollowThrough = (defenderAlive <= 1) || hasBaron || (this.gameSeconds >= 1680 && defenderAlive <= 2);
        if (canFollowThrough) {
          const pushLane = target.lane || preferredLane || "mid";
          this._damageNextStructure(attackerSide, targetStructures, margin, false, intensityMod * 0.85, pushLane, true);
        }
      }
    }
  }

  _getCurrentTargetStructure(structures, preferredLane = null) {
    const lanes = ["top", "mid", "bot"];

    // 1. Se uma rota específica foi solicitada (ex: duelo no Top, dive no Bot)
    if (preferredLane && lanes.includes(preferredLane)) {
      const t1 = structures.find(s => s.lane === preferredLane && s.tier === 1);
      if (t1 && !t1.destroyed) return t1;

      const t2 = structures.find(s => s.lane === preferredLane && s.tier === 2);
      if (t2 && !t2.destroyed) return t2;

      const t3 = structures.find(s => s.lane === preferredLane && s.tier === 3);
      if (t3 && !t3.destroyed) return t3;

      const inhib = structures.find(s => s.lane === preferredLane && s.tier === "inhib");
      if (inhib && !inhib.destroyed) return inhib;

      // Se a rota preferida já teve seu inibidor destruído, avança direto para as Torres do Nexus e o Nexus!
      const nt1 = structures.find(s => s.id === "nexus_t1");
      if (nt1 && !nt1.destroyed) return nt1;

      const nt2 = structures.find(s => s.id === "nexus_t2");
      if (nt2 && !nt2.destroyed) return nt2;

      const nexus = structures.find(s => s.id === "nexus");
      if (nexus && !nexus.destroyed) return nexus;
    }

    // 2. Se ao menos 1 inibidor adversário estiver destruído, a base está violada!
    // As defesas centrais da base (Torres do Nexus e Nexus) tornam-se o alvo supremo
    const hasAnyInhibDestroyed = structures.some(s => s.tier === "inhib" && s.destroyed);
    if (hasAnyInhibDestroyed) {
      const nt1 = structures.find(s => s.id === "nexus_t1");
      if (nt1 && !nt1.destroyed) return nt1;

      const nt2 = structures.find(s => s.id === "nexus_t2");
      if (nt2 && !nt2.destroyed) return nt2;

      const nexus = structures.find(s => s.id === "nexus");
      if (nexus && !nexus.destroyed) return nexus;
    }

    // 3. Se não especificou rota ou a rota preferida foi concluída:
    // Identifica a rota com maior avanço/pressão da equipe atacante (foco em romper uma rota inteira até a base!)
    const isTargetingRed = (structures === this.redStructures);
    const p = this.lanePressures || { top: 0, mid: 0, bot: 0 };

    const getLaneScore = (lane) => {
      const laneStructs = structures.filter(s => s.lane === lane);
      const destroyedCount = laneStructs.filter(s => s.destroyed).length;
      const lanePressureVal = isTargetingRed ? (p[lane] || 0) : -(p[lane] || 0);
      // Pesa fortemente rotas já abertas (T1 já caiu, T2 já caiu) para continuar o cerco focado!
      return (destroyedCount * 65) + lanePressureVal;
    };

    const sortedLanes = [...lanes].sort((a, b) => getLaneScore(b) - getLaneScore(a));

    // Na rota prioritária mais avançada, ataca a próxima estrutura em linha reta: T1 -> T2 -> T3 -> Inibidor
    for (const lane of sortedLanes) {
      const t1 = structures.find(s => s.lane === lane && s.tier === 1);
      if (t1 && !t1.destroyed) return t1;

      const t2 = structures.find(s => s.lane === lane && s.tier === 2);
      if (t2 && !t2.destroyed) return t2;

      const t3 = structures.find(s => s.lane === lane && s.tier === 3);
      if (t3 && !t3.destroyed) return t3;

      const inhib = structures.find(s => s.lane === lane && s.tier === "inhib");
      if (inhib && !inhib.destroyed) return inhib;
    }

    // 4. Fallback: qualquer estrutura restante viva
    return structures.find(s => !s.destroyed) || null;
  }

  _checkGameEnd() {
    const blueNexus = this.blueStructures.find(s => s.id === "nexus");
    const redNexus = this.redStructures.find(s => s.id === "nexus");

    if (redNexus && redNexus.destroyed) {
      this.isFinished = true;
      if (this.timer) clearTimeout(this.timer);
      this.onFinish("win", this._buildSummary("win"));
    } else if (blueNexus && blueNexus.destroyed) {
      this.isFinished = true;
      if (this.timer) clearTimeout(this.timer);
      this.onFinish("loss", this._buildSummary("loss"));
    }
  }

  _buildSummary(result) {
    const blueDestroyed = this.redStructures.filter(s => s.destroyed).length;
    const redDestroyed = this.blueStructures.filter(s => s.destroyed).length;

    const blueTowers = this.redStructures.filter(s => s.destroyed && s.id !== "inhib" && s.id !== "nexus").length;
    const redTowers = this.blueStructures.filter(s => s.destroyed && s.id !== "inhib" && s.id !== "nexus").length;

    const blueInhibs = this.redStructures.filter(s => s.destroyed && s.id === "inhib").length;
    const redInhibs = this.blueStructures.filter(s => s.destroyed && s.id === "inhib").length;

    const blueRosterList = Object.values(this.blueRosterState);
    const redRosterList = Object.values(this.redRosterState);
    const allPlayers = [...blueRosterList, ...redRosterList];

    let maxDamage = 1;
    let maxGold = 1;
    let maxTaken = 1;
    let topDamageChamp = allPlayers[0];
    let topGoldChamp = allPlayers[0];
    let topTakenChamp = allPlayers[0];

    allPlayers.forEach(c => {
      if ((c.damageDealt || 0) > maxDamage) {
        maxDamage = c.damageDealt;
        topDamageChamp = c;
      }
      if ((c.goldEarned || 0) > maxGold) {
        maxGold = c.goldEarned;
        topGoldChamp = c;
      }
      if ((c.damageTaken || 0) > maxTaken) {
        maxTaken = c.damageTaken;
        topTakenChamp = c;
      }
    });

    return {
      result,
      duration: this._formatTime(),
      gameSeconds: this.gameSeconds,
      maxDamage,
      maxGold,
      maxTaken,
      topDamageChampId: topDamageChamp ? topDamageChamp.id : null,
      topGoldChampId: topGoldChamp ? topGoldChamp.id : null,
      topTakenChampId: topTakenChamp ? topTakenChamp.id : null,
      blue: {
        ...this.blueScore,
        towers: blueTowers,
        inhibitors: blueInhibs,
        structuresDestroyed: blueDestroyed,
        team: {
          name: this.blueTeam.name,
          logo: this.blueTeam.iconUrl || this.blueTeam.logo || "🛡️"
        },
        roster: this.blueRosterState
      },
      red: {
        ...this.redScore,
        towers: redTowers,
        inhibitors: redInhibs,
        structuresDestroyed: redDestroyed,
        team: {
          name: this.redTeam.name,
          tag: this.redTeam.tag,
          color: this.redTeam.color,
          logo: this.redTeam.iconUrl || this.redTeam.logo || "⚡"
        },
        roster: this.redRosterState
      }
    };
  }

  _formatTime() {
    const mins = Math.floor(this.gameSeconds / 60);
    const secs = this.gameSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  getState() {
    const isBehind = (this.redScore.gold - this.blueScore.gold >= 1500) || this.lanePressure <= -30;
    return {
      time: this._formatTime(),
      gameSeconds: this.gameSeconds,
      isFinished: this.isFinished,
      roundIndex: this.roundIndex,
      difficultyMultiplier: this.difficultyMultiplier || 1.0,
      lanePressure: Math.round(this.lanePressure),
      lanePressures: {
        top: Math.round(this.lanePressures ? this.lanePressures.top : 0),
        mid: Math.round(this.lanePressures ? this.lanePressures.mid : 0),
        bot: Math.round(this.lanePressures ? this.lanePressures.bot : 0)
      },
      focusedLane: this.focusedLane,
      playerTactics: this.playerTactics,
      tacticsLabel: this.tacticsLabel || "⚖️ Controle de Rotas",
      counterAttackCooldown: this.counterAttackCooldown,
      objectiveBountiesActive: this.objectiveBountiesActive,
      isComebackMode: isBehind,
      activeBuffs: {
        blue: this._getActiveBuffs("blue"),
        red: this._getActiveBuffs("red")
      },
      blue: {
        name: this.blueTeam.name,
        iconUrl: this.blueTeam.iconUrl,
        score: this.blueScore,
        structures: this.blueStructures,
        superMinions: this.blueSuperMinions,
        hasBaron: this.gameSeconds < this.blueBaronUntil,
        buffs: this._getActiveBuffs("blue"),
        roster: this.blueRosterState
      },
      red: {
        name: this.redTeam.name,
        tag: this.redTeam.tag,
        color: this.redTeam.color,
        score: this.redScore,
        structures: this.redStructures,
        superMinions: this.redSuperMinions,
        hasBaron: this.gameSeconds < this.redBaronUntil,
        buffs: this._getActiveBuffs("red"),
        roster: this.redRosterState
      }
    };
  }
}
