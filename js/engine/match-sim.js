// Motor Avançado de Simulação: Disputas Decisivas, Pressão de Rota (Momentum), Vantagem Numérica e Pacing Competitivo do CBLOL
import { getChampionById, calculateTeamStats } from "../data/champions.js";
import { getRecommendedItemForChampion, getStarterItemForChampion, getNextPurchaseStep, LOL_ITEMS, getItemById } from "../data/items.js";
import { getPlayerById } from "../data/players.js";
import { JUNGLE_CAMPS, getJungleCampById } from "../data/jungle-camps.js";

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

    // Tempo de jogo simulado (começa aos 00:00, tempo real com movimentação fluida)
    this.gameSeconds = 0;
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

    // Sistema de Matchups de Campeões e Rota Marcada pelo Caçador Rival
    this.laneMatchups = {};
    this.redJungleCampLane = null; // 'top', 'mid', ou 'bot'
    this.blueJungleCampLane = null; // Rota prioritária que o Caçador azul foca para criar o carregador
    this._jgPlanIncidentFired = false; // Incidente inicial de plano de rota do caçador
    this.nextJungleCampUpdateAt = 165; // Primeira rotação aos 02:45

    // Mecânica de Virada (Comeback Mechanics) - Recompensas de Objetivos
    this.objectiveBountiesActive = false;

    // Sistema de Visão, Sentinelas e Névoa de Guerra (Fog of War)
    this.wards = [];
    this.nextWardDropAt = 75; // Primeiras sentinelas aos 01:15
    this.blueVisionSources = [];
    this.lastEnemySightings = {};

    // Acampamentos Oficiais da Selva de Summoner's Rift (League of Legends)
    const campsData = (typeof JUNGLE_CAMPS !== "undefined" && Array.isArray(JUNGLE_CAMPS)) ? JUNGLE_CAMPS : [];
    this.jungleCamps = campsData.map(c => ({
      ...c,
      status: "unspawned", // "unspawned" | "alive" | "clearing" | "respawning"
      respawnsAt: c.spawnAt,
      clearedBy: null,
      clearingBy: null,
      clearingProgress: 0,
      clearingDuration: 4
    }));
    this.blueJgTargetCampId = null;
    this.redJgTargetCampId = null;

    // Sistema Competitivo de Rota Inicial do Caçador, Invasão Nível 1 e Gank aos 3 Minutos
    this.blueJgStartChoice = null; // "start_blue_buff" | "start_red_buff" | "invade_team" | "invade_vertical"
    this.redJgStartChoice = Math.random() < 0.5 ? "start_red_buff" : "start_blue_buff";
    this.earlyGankTargetLane = null; // "bot" | "top" | "mid"
    this.redEarlyGankTargetLane = this.redJgStartChoice === "start_red_buff" ? "top" : "bot";
    this.earlyGankExecuted = false;
    this.level1InvadeResolved = false;

    // Estados dos campeões e pro players
    this.blueRosterState = this._initRosterState(this.blueTeam.roster, this.blueTeam, "blue");
    this.redRosterState = this._initRosterState(this.redTeam.roster || this.redTeam.defaultRoster, this.redTeam, "red");

    this._initLaneMatchups();
    this._updateRedJungleCampTarget(true);

    // Inicializa posições no mapa e cálculo de visão inicial
    this._updateChampionPositions();
    this._calculateVisionAndVisibility();

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

  _initLaneMatchups() {
    this.laneMatchups = {
      top: this._evaluateChampionMatchup(this.blueRosterState?.top, this.redRosterState?.top, "top"),
      mid: this._evaluateChampionMatchup(this.blueRosterState?.mid, this.redRosterState?.mid, "mid"),
      bot: this._evaluateChampionMatchup(this.blueRosterState?.adc, this.redRosterState?.adc, "bot", this.blueRosterState?.support, this.redRosterState?.support),
      jungle: this._evaluateChampionMatchup(this.blueRosterState?.jungle, this.redRosterState?.jungle, "jungle")
    };
  }

  _evaluateChampionMatchup(bMember, rMember, lane, bSuppMember = null, rSuppMember = null) {
    if (!bMember || !rMember) {
      return { score: 0, advantageSide: "neutral", label: "⚖️ Parelho", desc: "Rota equilibrada sem counter direto." };
    }

    const bChamp = getChampionById(bMember.id);
    const rChamp = getChampionById(rMember.id);
    const bName = bChamp ? bChamp.name : (bMember.name || "Campeão Azul");
    const rName = rChamp ? rChamp.name : (rMember.name || "Campeão Vermelho");
    const bId = bChamp ? bChamp.id : bMember.id;
    const rId = rChamp ? rChamp.id : rMember.id;

    // Tabela detalhada de Counters autênticos de League of Legends
    const COUNTER_MAP = {
      // TOP
      "Fiora": ["Chogath", "DrMundo", "Malphite", "Sion", "Ornn", "Maokai", "Shen", "KSante", "Poppy", "Nasus", "Garen"],
      "Malphite": ["Jax", "Tryndamere", "Irelia", "Yasuo", "Yone", "Fiora", "Quinn"],
      "Darius": ["Garen", "Sett", "Sion", "Shen", "Nasus", "Chogath", "Maokai", "Camille"],
      "Teemo": ["Darius", "Garen", "Sett", "Nasus", "Illaoi", "Mordekaiser", "Singed"],
      "Quinn": ["Darius", "Garen", "Renekton", "Sett", "Illaoi"],
      "Jax": ["Camille", "Fiora", "Irelia", "Tryndamere", "Gwen", "MasterYi"],
      "Poppy": ["Riven", "Irelia", "Yasuo", "Camille", "Aatrox", "LeeSin"],
      "Renekton": ["Yasuo", "Irelia", "Riven", "Katarina"],
      "Gwen": ["Sion", "Chogath", "DrMundo", "Ornn", "Malphite", "Maokai"],
      "Irelia": ["Gnar", "Teemo", "Quinn", "Kennen", "Jayce"],
      "Aatrox": ["Sion", "Chogath", "DrMundo", "Sett"],
      "Olaf": ["Mordekaiser", "Malphite", "Maokai", "Shen"],

      // MID
      "Zed": ["Lux", "Velkoz", "Xerath", "Veigar", "Syndra", "TwistedFate", "Orianna", "Hwei", "AurelionSol"],
      "Talon": ["Lux", "Velkoz", "Xerath", "Veigar", "Syndra", "TwistedFate", "Kassadin"],
      "Galio": ["Zed", "Katarina", "Akali", "LeBlanc", "Fizz", "Ahri", "Sylas"],
      "Malzahar": ["Zed", "Yasuo", "Yone", "Katarina", "Akali", "LeBlanc"],
      "Lissandra": ["Zed", "LeBlanc", "Akali", "Katarina", "Yasuo"],
      "Syndra": ["Annie", "Ryze", "Cassiopeia", "Heimerdinger", "Malzahar"],
      "Orianna": ["Ryze", "Annie", "Cassiopeia", "Galio"],
      "Yasuo": ["Lux", "Ahri", "Syndra", "TwistedFate", "Velkoz", "Xerath", "Zoe"],
      "Vex": ["Yasuo", "Yone", "Katarina", "Akali", "LeBlanc", "Irelia", "Ahri"],
      "Kassadin": ["Ryze", "Cassiopeia", "Viktor", "Anivia", "Azir"],
      "Ahri": ["Xerath", "Velkoz", "Lux", "Hwei"],

      // BOT (ADC)
      "Draven": ["Jinx", "KogMaw", "Twitch", "Zeri", "Smolder", "Vayne", "Ezreal"],
      "Lucian": ["Jinx", "KogMaw", "Twitch", "Aphelios", "Varus"],
      "Samira": ["Jinx", "Aphelios", "Varus", "Ashe", "MissFortune"],
      "Caitlyn": ["Vayne", "KaiSa", "Samira", "Lucian", "Kalista"],
      "Sivir": ["Caitlyn", "Jhin", "Blitzcrank", "Thresh", "Morgana"],
      "Tristana": ["Jinx", "Twitch", "KogMaw", "Vayne"],
      "Ashe": ["Vayne", "KaiSa", "Kalista", "Samira"],
      "Jinx": ["Aphelios", "Varus", "Ashe"],

      // SUPPORT
      "Morgana": ["Thresh", "Blitzcrank", "Nautilus", "Leona", "Pyke", "Rell", "Alistar"],
      "Leona": ["Sona", "Soraka", "Nami", "Yuumi", "Milio", "Lulu", "Janna"],
      "Nautilus": ["Sona", "Soraka", "Nami", "Yuumi", "Milio", "Lulu"],
      "Blitzcrank": ["Sona", "Soraka", "Nami", "Yuumi", "Senna", "Lux"],
      "Thresh": ["Sona", "Soraka", "Yuumi", "Milio"],
      "Janna": ["Leona", "Alistar", "Rell", "Nautilus", "Rakan"],
      "Braum": ["Ezreal", "MissFortune", "Lucian", "Ornn", "Ashe"],
      "Lulu": ["Zed", "KhaZix", "Rengar", "MasterYi", "Leona"],

      // JUNGLE
      "LeeSin": ["Karthus", "Shyvana", "MasterYi", "Evelynn", "Fiddlesticks", "Lillia"],
      "Elise": ["Karthus", "MasterYi", "Shyvana", "Amumu"],
      "XinZhao": ["MasterYi", "Karthus", "Evelynn", "Lillia"],
      "JarvanIV": ["Karthus", "Fiddlesticks", "Evelynn", "MasterYi"],
      "Rammus": ["MasterYi", "BelVeth", "Graves", "Nocturne", "Kindred", "Briar"],
      "Poppy": ["KhaZix", "Kayn", "Rengar", "LeeSin", "Vi", "JarvanIV"]
    };

    let score = 0; // Positivo = vantagem Azul; Negativo = vantagem Vermelha (-3.0 a +3.0)
    let counterLabel = "";

    // 1. Checagem direta de counters cadastrados
    if (COUNTER_MAP[bId] && COUNTER_MAP[bId].includes(rId)) {
      score += 2.2;
      counterLabel = `${bName} é counter direto de ${rName}!`;
    } else if (COUNTER_MAP[rId] && COUNTER_MAP[rId].includes(bId)) {
      score -= 2.2;
      counterLabel = `${rName} é counter direto de ${bName}!`;
    }

    // 2. Análise de Arquétipos (se não for counter absoluto)
    const bClass = (bChamp && bChamp.class) || "Fighter";
    const rClass = (rChamp && rChamp.class) || "Fighter";
    const bStats = (bChamp && bChamp.stats) || { damage: 75, tank: 75, push: 75 };
    const rStats = (rChamp && rChamp.stats) || { damage: 75, tank: 75, push: 75 };

    if (bClass === "Assassin" && (rClass === "Mage" || rClass === "Marksman") && rStats.tank <= 65) {
      score += 1.2;
      if (!counterLabel) counterLabel = `${bName} tem burst letal contra a fragilidade de ${rName}.`;
    } else if (rClass === "Assassin" && (bClass === "Mage" || bClass === "Marksman") && bStats.tank <= 65) {
      score -= 1.2;
      if (!counterLabel) counterLabel = `${rName} tem pressão de abate em ${bName}.`;
    } else if (bClass === "Tank" && rClass === "Assassin") {
      score += 1.3;
      if (!counterLabel) counterLabel = `${bName} neutraliza o burst de ${rName} com armadura e vida.`;
    } else if (rClass === "Tank" && bClass === "Assassin") {
      score -= 1.3;
      if (!counterLabel) counterLabel = `${rName} resiste facilmente ao burst de ${bName}.`;
    } else if (bStats.damage >= 88 && rClass === "Tank") {
      score += 1.0;
      if (!counterLabel) counterLabel = `${bName} derrete a resistência de ${rName} em lutas prolongadas.`;
    } else if (rStats.damage >= 88 && bClass === "Tank") {
      score -= 1.0;
      if (!counterLabel) counterLabel = `${rName} derrete a linha defensiva de ${bName}.`;
    }

    // 3. Modificador de Bot Lane (duo 2v2: ADC + Suporte)
    if (lane === "bot" && bSuppMember && rSuppMember) {
      const bSuppChamp = getChampionById(bSuppMember.id);
      const rSuppChamp = getChampionById(rSuppMember.id);
      const bSuppId = bSuppChamp ? bSuppChamp.id : bSuppMember.id;
      const rSuppId = rSuppChamp ? rSuppChamp.id : rSuppMember.id;
      const bSuppName = bSuppChamp ? bSuppChamp.name : (bSuppMember.name || "Suporte Azul");
      const rSuppName = rSuppChamp ? rSuppChamp.name : (rSuppMember.name || "Suporte Vermelho");

      let suppScore = 0;
      if (COUNTER_MAP[bSuppId] && COUNTER_MAP[bSuppId].includes(rSuppId)) {
        suppScore += 2.0;
        counterLabel += ` A iniciação/proteção de ${bSuppName} anula ${rSuppName}!`;
      } else if (COUNTER_MAP[rSuppId] && COUNTER_MAP[rSuppId].includes(bSuppId)) {
        suppScore -= 2.0;
        counterLabel += ` ${rSuppName} domina a rota 2v2 contra ${bSuppName}!`;
      }
      score = Math.max(-3.0, Math.min(3.0, (score * 0.6) + (suppScore * 0.4)));
    }

    // Clamping final de score
    score = Math.max(-3.0, Math.min(3.0, Math.round(score * 10) / 10));

    let advantageSide = "neutral";
    let label = "⚖️ Parelho";
    let desc = counterLabel || `Duelo parelho e equilibrado entre ${bName} e ${rName}.`;

    if (score >= 0.8) {
      advantageSide = "blue";
      label = "⚔️ Vantagem";
      desc = counterLabel || `${bName} possui vantagem estratégica e melhores trocas contra ${rName}.`;
    } else if (score <= -0.8) {
      advantageSide = "red";
      label = "⚠️ Desvantagem";
      desc = counterLabel || `${rName} possui vantagem tática ou counter contra ${bName}. Evite forçar trocas cegas!`;
    }

    return {
      score,
      advantageSide,
      label,
      desc
    };
  }

  _getLaneMatchup(lane) {
    if (!this.laneMatchups) return { score: 0, advantageSide: "neutral", label: "⚖️ Parelho", desc: "Equilibrado" };
    if (lane === "top") return this.laneMatchups.top;
    if (lane === "mid") return this.laneMatchups.mid;
    if (lane === "bot") return this.laneMatchups.bot;
    if (lane === "jungle") return this.laneMatchups.jungle;
    return { score: 0, advantageSide: "neutral", label: "⚖️ Parelho", desc: "Equilibrado" };
  }

  _updateRedJungleCampTarget(isInitial = false) {
    const lanes = ["top", "mid", "bot"];
    const weights = {};

    lanes.forEach(l => {
      let w = 30;
      const press = (this.lanePressures && this.lanePressures[l]) || 0;
      // Se a rota do jogador estiver avançada (overextended), é um ímã irresistível de ganks
      if (press >= 40) w += 45;
      else if (press >= 20) w += 28;
      else if (press <= -30) w -= 15;

      // Se o time vermelho tem vantagem de matchup nessa rota, facilita setup de gank
      const matchup = this.laneMatchups ? this.laneMatchups[l] : null;
      if (matchup && matchup.score <= -1.0) w += 25;
      else if (matchup && matchup.score >= 1.0) w -= 10;

      // Se o jogador está na postura agressiva, o caçador rival explora os flancos abertos
      if (this.playerTactics === "aggressive") w += 20;

      weights[l] = Math.max(10, w);
    });

    const totalWeight = weights.top + weights.mid + weights.bot;
    let roll = Math.random() * totalWeight;
    let chosenLane = "mid";
    if (roll < weights.top) {
      chosenLane = "top";
    } else if (roll < weights.top + weights.mid) {
      chosenLane = "mid";
    } else {
      chosenLane = "bot";
    }

    const previousCamp = this.redJungleCampLane;
    this.redJungleCampLane = chosenLane;
    this.nextJungleCampUpdateAt = this.gameSeconds + 120 + Math.floor(Math.random() * 60);

    const rJg = this.redRosterState ? this.redRosterState.jungle : null;
    const laneNames = { top: "Rota Superior (Top)", mid: "Rota do Meio (Mid)", bot: "Rota Inferior (Bot)" };
    const jgName = rJg ? rJg.name : "O Caçador Rival";

    if (!isInitial && previousCamp !== chosenLane) {
      this.onEvent({
        type: "jungle_scout",
        side: "red",
        text: `🌲 ALERTA DE SELVA: ${jgName} reposicionou sua rotação e agora está acampando na ${laneNames[chosenLane]}! Cuidado com avanços desprotegidos!`,
        time: this._formatTime()
      });
    }
  }

  _initRosterState(roster, team = null, side = "blue") {
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

      const starterItem = getStarterItemForChampion(champ);
      const startingItems = [];
      let startingCurrentGold = 500;
      if (starterItem) {
        startingItems.push(starterItem);
        startingCurrentGold = Math.max(0, 500 - (starterItem.cost || 450));
      }

      state[r] = {
        id: champ ? champ.id : (typeof rawChamp === "object" ? (rawChamp.id || "champ") : String(rawChamp)),
        role: r,
        side: side,
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
        goldCurrent: startingCurrentGold, // Ouro líquido restante após compra inicial (Doran/Pet/Atlas)
        cs: 0,
        csPerMin: 0.0,
        travelingBackUntil: 0, // Tempo de volta da base para a rota
        laneGoldDiff: 0, // Diferença de ouro contra o rival direto
        isMvp: false, // Destaque de carregador mais forte
        nextItem: null, // Próximo item em foco na loja
        turrets: 0,
        alive: true,
        respawnAt: 0,
        items: startingItems, // Itens equipados (até 6 slots)
        hpPct: 100,
        x: side === "blue" ? 188 : 812,
        y: side === "blue" ? 630 : 116,
        targetX: side === "blue" ? 188 : 812,
        targetY: side === "blue" ? 630 : 116,
        isVisibleToBlue: side === "blue",
        lastSeen: null,
        statusText: "Na Base"
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
      c.goldCurrent = (c.goldCurrent || 0) + split;
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
    const bJg = this.blueRosterState.jungle?.name || "Caçador";
    const names = {
      top: "Rota Superior (Top)",
      mid: "Rota do Meio (Mid)",
      bot: "Rota Inferior (Bot)"
    };
    const targetRoles = { top: "top", mid: "mid", bot: "adc" };
    const targetRole = targetRoles[lane] || "adc";
    const targetChamp = this.blueRosterState[targetRole]?.name || "Carregador";

    if (this.focusedLane === lane) {
      this.focusedLane = null;
      this.blueJungleCampLane = null;
      this.onEvent({
        type: "lane_focus",
        side: "blue",
        text: `⚖️ CAÇADOR EM ROTAÇÃO LIVRE: ${bJg} divide a atenção de ganks e controle de mapa equilibradamente entre todas as rotas.`,
        time: this._formatTime()
      });
    } else {
      this.focusedLane = lane;
      this.blueJungleCampLane = lane;
      this.onEvent({
        type: "lane_focus",
        side: "blue",
        text: `🌲 PLANO DO CAÇADOR ATIVO: ${bJg} agora acampa na ${names[lane] || lane} para dar recursos a ${targetChamp} e torná-lo o Carregador da partida!`,
        time: this._formatTime()
      });
    }
  }

  _calculateTopPushAdvantage() {
    const bTop = this.blueRosterState.top;
    const rTop = this.redRosterState.top;
    if (!bTop || !rTop) {
      return { score: 0, leader: "neutral", blueScore: 75, redScore: 75, desc: "Forças de push equiparadas" };
    }

    // 1. Estatística base de push do time e características do campeão
    let bPush = (this.blueTeam.stats?.push || 75) * 0.35;
    let rPush = (this.redTeam.stats?.push || 75) * 0.35;

    // Campeões com waveclear nato de área e duelistas split-push (Tiamat/Hydra/AOE)
    const waveclearChamps = ["Fiora", "Aatrox", "Renekton", "Jax", "Camille", "Sion", "Gnar", "Jayce", "Irelia", "Kled", "Darius", "Garen", "Rumble", "Mordekaiser"];
    if (waveclearChamps.includes(bTop.id)) bPush += 8;
    if (waveclearChamps.includes(rTop.id)) rPush += 8;

    // 2. Itens fechados (+14 de velocidade de avanço e dano a tropas por item)
    bPush += (bTop.items ? bTop.items.length * 14 : 0);
    rPush += (rTop.items ? rTop.items.length * 14 : 0);

    // 3. Ouro acumulado (+1 por cada 250g de vantagem econômica)
    const goldDiff = (bTop.goldEarned || 500) - (rTop.goldEarned || 500);
    bPush += Math.max(-25, Math.min(25, Math.round(goldDiff * 0.004)));

    // 4. Abates (+3.5 por kill de vantagem)
    bPush += Math.max(-18, Math.min(18, Math.round(((bTop.kills || 0) - (rTop.kills || 0)) * 3.5)));

    // 5. Estado das estruturas da rota superior
    const redTopT1 = this.redStructures.find(s => s.id === "top_t1");
    const blueTopT1 = this.blueStructures.find(s => s.id === "top_t1");
    if (redTopT1 && redTopT1.destroyed) bPush += 10;
    if (blueTopT1 && blueTopT1.destroyed) rPush += 10;

    const diff = Math.round(bPush - rPush);
    let leader = "neutral";
    let desc = "Push parelho: nenhuma equipe consegue criar tempo de rotação livre.";

    if (diff >= 6) {
      leader = "blue";
      desc = `${bTop.name} limpa as ondas muito mais rápido (${diff > 12 ? 'Dominante' : 'Vantagem'}). Ganha tempo de descida para o rio/time!`;
    } else if (diff <= -6) {
      leader = "red";
      desc = `${rTop.name} tem prioridade de avanço (${Math.abs(diff) > 12 ? 'Dominante' : 'Vantagem'}). ${bTop.name} fica preso sob a torre limpando tropas.`;
    }

    return {
      score: diff,
      leader,
      desc,
      blueScore: Math.round(bPush),
      redScore: Math.round(rPush)
    };
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
    const baseIntervalMs = 500; // 2 segundos de partida a cada 500ms reais (movimentação fluida e tempo realista)
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

    // 2 segundos por tick (ritmo fluido de League of Legends com movimentação em tempo real)
    const deltaSeconds = 2;
    this.gameSeconds += deltaSeconds;
    const timeScale = deltaSeconds / 15;

    if (this.counterAttackCooldown > 0) {
      this.counterAttackCooldown = Math.max(0, this.counterAttackCooldown - deltaSeconds);
    }
    if (this.combatCooldown > 0) {
      this.combatCooldown = Math.max(0, this.combatCooldown - deltaSeconds);
    }

    // Atualiza a postura tática orgânica da equipe conforme a situação do mapa
    this._updateOrganicTactics();

    // Atualiza a rota favorita de gank do caçador rival periodicamente
    if (this.gameSeconds >= this.nextJungleCampUpdateAt) {
      this._updateRedJungleCampTarget(false);
    }

    // Auxílio e foco de gank do Caçador Aliado (Blue JG) na rota escolhida
    if (this.blueJungleCampLane) {
      const targetRole = this.blueJungleCampLane === "bot" ? "adc" : this.blueJungleCampLane;
      const targetChamp = this.blueRosterState[targetRole];
      if (targetChamp && targetChamp.alive) {
        if (this.gameSeconds % 30 === 0) {
          targetChamp.goldEarned = (targetChamp.goldEarned || 500) + 35;
          targetChamp.goldCurrent = (targetChamp.goldCurrent || 0) + 35;
        }
        if (this.lanePressures && this.lanePressures[this.blueJungleCampLane] !== undefined) {
          this.lanePressures[this.blueJungleCampLane] = Math.min(100, this.lanePressures[this.blueJungleCampLane] + (1.5 * timeScale));
        }
      }
    }

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
      const updateFarm = (rosterState, isBlueTeam) => {
        roles.forEach(role => {
          const c = rosterState[role];
          if (!c) return;

          const oppRoster = isBlueTeam ? this.redRosterState : this.blueRosterState;
          const opp = oppRoster[role];

          // Verifica se o campeão está ativo na rota (vivo e não em trânsito da base)
          const isDead = !c.alive;
          const isWalkingBack = (this.gameSeconds < (c.travelingBackUntil || 0));

          if (isDead || isWalkingBack) {
            // CAMPEÃO AUSENTE DA ROTA (MORTO OU RETORNANDO DA BASE):
            // Perda irreversível de tropas! A onda bate na torre e as tropas morrem.
            // Se o adversário estiver vivo e a rota tiver pressão favorável ao rival, ocorre crash sob a torre:
            const laneKey = (role === "adc" || role === "support") ? "bot" : role;
            const lanePress = (this.lanePressures && this.lanePressures[laneKey] !== undefined)
              ? (isBlueTeam ? this.lanePressures[laneKey] : -this.lanePressures[laneKey])
              : 0;

            if (opp && opp.alive && lanePress < -10) {
              if (Math.random() < (0.35 * timeScale) && this.gameSeconds <= 840) {
                const oppSide = isBlueTeam ? "red" : "blue";
                const structList = isBlueTeam ? this.blueStructures : this.redStructures;
                const t1 = structList.find(s => s.id === `${laneKey}_t1`);
                if (t1 && !t1.destroyed && t1.plates > 0) {
                  t1.plates--;
                  opp.goldEarned = (opp.goldEarned || 500) + 125;
                  opp.goldCurrent = (opp.goldCurrent || 0) + 125;
                  this.onEvent({
                    type: "tower_plate",
                    side: oppSide,
                    text: `🛡️ BARRICADA COLETADA! Com ${c.name} fora da rota, ${opp.name} destruiu 1 placa da ${t1.name} (+125g)!`,
                    time: this._formatTime()
                  });
                }
              }
            }
            return; // Ausente da rota: 0 CS nesta onda!
          }

          // Renda passiva oficial de Summoner's Rift (~2.04g / seg = ~4.08g por tick de 2s)
          let goldGain = (24 / 15) * deltaSeconds;

          // Taxa de CS de Alto Nível Competitivo (CBLOL / Pro Play):
          // Mid & ADC: 9.6 CS/min = 0.16 CS/s
          // Top: 8.6 CS/min = 0.143 CS/s
          // Jungle: 6.5 CS/min = 0.108 CS/s (+ monstros)
          // Support: 1.4 CS/min = 0.023 CS/s (+ tributo)
          let csRate = 0.16;
          if (role === "top") csRate = 0.143;
          else if (role === "jungle") {
            csRate = 0.015; // Tropas esporádicas de rotas em ganks/cobertura (farm principal vem dos acampamentos da selva)
            goldGain += (8 / 15) * deltaSeconds;
          } else if (role === "support") {
            csRate = 0.023;
            goldGain += (26 / 15) * deltaSeconds;
          }

          c._csFloat = (c._csFloat !== undefined ? c._csFloat : (c.cs || 0)) + csRate * deltaSeconds;
          const newCs = Math.floor(c._csFloat);
          const csGain = newCs - (c.cs || 0);

          if (csGain > 0) {
            c.cs = newCs;
            goldGain += csGain * 21;
          }

          c.goldEarned = Math.round((c.goldEarned || 500) + goldGain);
          c.goldCurrent = Math.round((c.goldCurrent || 0) + goldGain);
          c.csPerMin = parseFloat(((c.cs || 0) / Math.max(1, this.gameSeconds / 60)).toFixed(1));

          // Marca comemorativa e educativa de farm (50, 100, 150, 200, 250, 300 CS)
          const currentCs = c.cs;
          const milestones = [50, 100, 150, 200, 250, 300];
          const champKey = `${isBlueTeam ? 'blue' : 'red'}_${role}`;
          if (!this._farmMilestones[champKey]) this._farmMilestones[champKey] = {};

          for (const mVal of milestones) {
            if (currentCs >= mVal && !this._farmMilestones[champKey][mVal]) {
              this._farmMilestones[champKey][mVal] = true;
              if (isBlueTeam || mVal >= 100) {
                const gameMin = Math.max(1, this.gameSeconds / 60);
                const rate = (currentCs / gameMin).toFixed(1);
                const approxGold = Math.round(mVal * 21);
                const killEq = (mVal / 15).toFixed(1);
                this.onEvent({
                  type: "farm_milestone",
                  side: isBlueTeam ? "blue" : "red",
                  text: `🌾 MARCA DE FARM: ${c.name} atingiu ${mVal} CS aos ${this._formatTime()} (${rate} CS/min)! Acumulou ~${approxGold.toLocaleString()} de Ouro em tropas — equivalente a ~${killEq} abates em ouro seguro!`,
                  time: this._formatTime()
                });
              }
              break;
            }
          }
        });
      };
      updateFarm(this.blueRosterState, true);
      updateFarm(this.redRosterState, false);
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

    // Checa conclusão e compra de itens da loja nos campeões
    this._checkItemMilestones();

    // Rola simulação de pressão de rota e combate tático
    this._resolveCombatRound();

    // Atualiza acampamentos da selva, status e farm dos caçadores
    this._updateJungleCamps(deltaSeconds);

    // Verifica e executa o gank planejado dos caçadores aos 03:00 (180s)
    this._checkEarly3MinGank();

    // Atualiza sentinelas/trinkets, posições orgânicas dos campeões e cálculo de névoa de guerra
    this._updateWards();
    this._updateChampionPositions();
    this._calculateVisionAndVisibility();

    this.onTick(this.getState());
    this._checkGameEnd();
  }

  _checkItemMilestones() {
    const checkSide = (side, rosterState, teamObj) => {
      const roles = ["top", "jungle", "mid", "adc", "support"];
      roles.forEach(role => {
        const member = rosterState[role];
        if (!member) return;
        if (!member.items) member.items = [];

        const champ = getChampionById(member.id);
        const oppMember = (side === "blue" ? this.redRosterState[role] : this.blueRosterState[role]);
        const oppChamp = oppMember ? getChampionById(oppMember.id) : null;
        const enemyTeamRoster = side === "blue" ? (this.redTeam ? this.redTeam.roster : null) : (this.blueTeam ? this.blueTeam.roster : null);
        const nextItem = getRecommendedItemForChampion(champ, member.items, oppChamp, enemyTeamRoster);
        if (!nextItem) return;

        member.nextItem = nextItem;

        // Avalia o próximo passo na árvore de receitas do item
        const step = getNextPurchaseStep(member.items, nextItem.id, member.goldCurrent || 0);
        if (!step) return;

        if (step.type === "COMBINE") {
          // Combinação: deduz combineCost e consome componentes
          member.goldCurrent = Math.max(0, (member.goldCurrent || 0) - step.cost);
          if (step.consumeItems && step.consumeItems.length > 0) {
            step.consumeItems.forEach(consumed => {
              const idx = member.items.findIndex(it => it && it.id === consumed.id);
              if (idx !== -1) member.items.splice(idx, 1);
            });
          }
          member.items.push(step.item);

          // Aplica bônus do item ao time
          if (step.item.stats && teamObj.stats) {
            Object.keys(step.item.stats).forEach(stat => {
              if (teamObj.stats[stat] !== undefined) {
                teamObj.stats[stat] += Math.round((step.item.stats[stat] || 0) / 4);
              }
            });
          }

          this.onItemPurchased({
            side,
            champion: member,
            item: step.item,
            isCombined: true
          });

          this.onEvent({
            type: "item",
            side,
            championName: member.name,
            itemName: step.item.name,
            text: `🛒 ${member.playerNick || member.name} (${side === "blue" ? "Seu Time" : "CBLOL"}) completou ${step.item.name} (${step.item.cost.toLocaleString()}g)!`,
            time: this._formatTime()
          });

          // Atualiza próximo item da build
          member.nextItem = getRecommendedItemForChampion(champ, member.items, oppChamp, enemyTeamRoster);
        } else if (step.type === "COMPONENT" || step.type === "COMPLETE") {
          // Se inventário cheio (6 slots), vende item inicial (Doran/Pet/Atlas) para liberar espaço no late game
          if (member.items.length >= 6) {
            const starterIdx = member.items.findIndex(it => it && (it.tier === "STARTER" || [1055, 1056, 1054, 1101, 3865].includes(it.id)));
            if (starterIdx !== -1) {
              const sold = member.items.splice(starterIdx, 1)[0];
              const sellVal = Math.round((sold.cost || 400) * 0.4);
              member.goldCurrent = (member.goldCurrent || 0) + sellVal;
              this.onEvent({
                type: "item_sell",
                side,
                championName: member.name,
                text: `💰 ${member.playerNick || member.name} vendeu ${sold.name} (+${sellVal}g) para abrir espaço no inventário!`,
                time: this._formatTime()
              });
            }
          }

          if (member.items.length < 6) {
            member.goldCurrent = Math.max(0, (member.goldCurrent || 0) - step.cost);
            member.items.push(step.item);

            if (step.item.stats && teamObj.stats) {
              Object.keys(step.item.stats).forEach(stat => {
                if (teamObj.stats[stat] !== undefined) {
                  teamObj.stats[stat] += Math.round((step.item.stats[stat] || 0) / 6);
                }
              });
            }

            this.onItemPurchased({
              side,
              champion: member,
              item: step.item,
              isComponent: step.type === "COMPONENT"
            });

            if (step.type === "COMPLETE") {
              this.onEvent({
                type: "item",
                side,
                championName: member.name,
                itemName: step.item.name,
                text: `🛒 ${member.playerNick || member.name} comprou ${step.item.name} (${step.cost.toLocaleString()}g)!`,
                time: this._formatTime()
              });
              member.nextItem = getRecommendedItemForChampion(champ, member.items, oppChamp, enemyTeamRoster);
            } else {
              this.onEvent({
                type: "item_component",
                side,
                championName: member.name,
                itemName: step.item.name,
                text: `📦 ${member.playerNick || member.name} comprou ${step.item.name} (${step.cost.toLocaleString()}g) para montar ${nextItem.name}!`,
                time: this._formatTime()
              });
            }
          }
        }
      });
    };

    checkSide("blue", this.blueRosterState, this.blueTeam);
    checkSide("red", this.redRosterState, this.redTeam);

    this._updateIndividualLeadsAndMvp();
  }

  _updateIndividualLeadsAndMvp() {
    const roles = ["top", "jungle", "mid", "adc", "support"];
    let bestBlueScore = -1;
    let bestBlueRole = null;
    let bestRedScore = -1;
    let bestRedRole = null;

    roles.forEach(role => {
      const b = this.blueRosterState[role];
      const r = this.redRosterState[role];
      if (b && r) {
        b.laneGoldDiff = (b.goldEarned || 500) - (r.goldEarned || 500);
        r.laneGoldDiff = -b.laneGoldDiff;
      }
      if (b) {
        const bScore = ((b.items ? b.items.length : 0) * 2500) + (b.goldEarned || 500) + ((b.kills || 0) * 450) + ((b.damageDealt || 0) * 0.05);
        b.combatScore = bScore;
        b.isMvp = false;
        if (bScore > bestBlueScore) {
          bestBlueScore = bScore;
          bestBlueRole = role;
        }
      }
      if (r) {
        const rScore = ((r.items ? r.items.length : 0) * 2500) + (r.goldEarned || 500) + ((r.kills || 0) * 450) + ((r.damageDealt || 0) * 0.05);
        r.combatScore = rScore;
        r.isMvp = false;
        if (rScore > bestRedScore) {
          bestRedScore = rScore;
          bestRedRole = role;
        }
      }
    });

    if (bestBlueRole && this.blueRosterState[bestBlueRole]) {
      this.blueRosterState[bestBlueRole].isMvp = true;
      this.blueMvpRole = bestBlueRole;
    }
    if (bestRedRole && this.redRosterState[bestRedRole]) {
      this.redRosterState[bestRedRole].isMvp = true;
      this.redMvpRole = bestRedRole;
    }
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
      tacticDmg = 6;
      tacticTank = -8;
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

    // Poder derivado dos itens concluídos pelos campeões vivos
    let blueItemPower = 0;
    Object.values(this.blueRosterState).forEach(c => {
      if (c.alive && c.items) blueItemPower += c.items.length * 3.5;
    });
    let redItemPower = 0;
    Object.values(this.redRosterState).forEach(c => {
      if (c.alive && c.items) redItemPower += c.items.length * 3.5;
    });

    // Bônus do Carregador Mais Forte (👑 MVP / 4-Protect-1):
    let blueMvpBonus = 0;
    const blueMvp = this.blueMvpRole ? this.blueRosterState[this.blueMvpRole] : null;
    if (blueMvp && blueMvp.alive) {
      blueMvpBonus = Math.min(14, (blueMvp.items ? blueMvp.items.length * 2.5 : 0) + Math.max(0, (blueMvp.laneGoldDiff || 0) * 0.003));
      if (this.playerTactics === "protect_carry") {
        blueMvpBonus += 10;
      }
    }

    let redMvpBonus = 0;
    const redMvp = this.redMvpRole ? this.redRosterState[this.redMvpRole] : null;
    if (redMvp && redMvp.alive) {
      redMvpBonus = Math.min(14, (redMvp.items ? redMvp.items.length * 2.5 : 0) + Math.max(0, (redMvp.laneGoldDiff || 0) * 0.003));
    }

    // Macro de Rotas Laterais Pós-15 minutos (Push Rápido do Top & Tempo de Descida 5v4)
    let blueTopPushBonus = 0;
    let redTopPushBonus = 0;
    if (this.gameSeconds >= 900) {
      const topAdv = this._calculateTopPushAdvantage();
      if (topAdv.leader === "blue") {
        blueTopPushBonus = Math.min(12, Math.round(topAdv.score * 0.35));
      } else if (topAdv.leader === "red") {
        redTopPushBonus = Math.min(12, Math.round(Math.abs(topAdv.score) * 0.35));
      }
    }

    let blueBasePower = ((bDmgStat + tacticDmg) * 0.28 +
                         (bTankStat + tacticTank) * 0.24 +
                         (bUtilStat) * 0.20 +
                         (bScaleStat) * scalingFactor +
                         blueGoldBonus +
                         blueDefendingBonus +
                         blueItemPower +
                         blueMvpBonus +
                         blueTopPushBonus +
                         (blueHasBaron ? 16 : 0) +
                         (this.blueSuperMinions ? 12 : 0)) * blueManpowerMod;

    let redBasePower = ((rDmgStat) * 0.28 +
                         (rTankStat) * 0.24 +
                         (rUtilStat) * 0.20 +
                         (rScaleStat) * scalingFactor +
                         redGoldBonus +
                         redDefendingBonus +
                         redItemPower +
                         redMvpBonus +
                         redTopPushBonus +
                         (redHasBaron ? 16 : 0) +
                         (this.redSuperMinions ? 12 : 0)) * redManpowerMod;

    // Rolagem com variabilidade realista do League (±12% de variação em jogadas e outplays simétricas)
    const blueRoll = blueBasePower * (0.88 + Math.random() * 0.24);
    const redRoll = redBasePower * (0.88 + Math.random() * 0.24);
    const diff = blueRoll - redRoll;

    // Dinamismo cadenciado da Pressão de Rota (Lane Momentum proporcional aos passos de 2s)
    const timeScale = 2 / 15;
    const rawDelta = Math.min(10, Math.max(3, Math.floor(Math.abs(diff) * 1.0)));
    const pressureDelta = Math.max(0.4, Number((rawDelta * timeScale).toFixed(2)));
    const allLanes = ["top", "mid", "bot"];
    if (diff > 2.0) {
      // Avanço Azul
      allLanes.forEach(l => {
        let lDelta = pressureDelta;
        if (this.focusedLane === l) lDelta = Number((lDelta * 1.45).toFixed(2));
        if (this.playerTactics === "split" && (l === "top" || l === "bot")) lDelta = Number((lDelta * 1.35).toFixed(2));
        if (this.playerTactics === "split" && l === "mid") lDelta = Math.max(0.2, Number((lDelta * 0.7).toFixed(2)));

        // Impacto de Matchup e Caçador Rival na postura agressiva
        if (this.playerTactics === "aggressive") {
          const m = this._getLaneMatchup(l);
          const isCamped = (this.redJungleCampLane === l);
          if ((m && m.score < -0.5) || isCamped) {
            // Forçar agressividade em desvantagem ou contra acampamento rival NÃO avança; é repelido!
            lDelta = -Math.max(0.4, Number((pressureDelta * 0.8).toFixed(2)));
          } else if (m && m.score > 0.5 && !isCamped) {
            lDelta = Number((lDelta * 1.3).toFixed(2));
          }
        }

        this.lanePressures[l] = Math.max(-100, Math.min(100, Number(((this.lanePressures[l] || 0) + lDelta + (Math.random() * 2 - 1) * timeScale).toFixed(2))));
      });
    } else if (diff < -2.0) {
      // Avanço Vermelho
      allLanes.forEach(l => {
        let rDelta = pressureDelta;
        // Se o time do jogador forçou agressivo em rota com desvantagem ou acampada, o avanço vermelho é amplificado
        if (this.playerTactics === "aggressive") {
          const m = this._getLaneMatchup(l);
          const isCamped = (this.redJungleCampLane === l);
          if ((m && m.score < -0.5) || isCamped) {
            rDelta = Number((rDelta * 1.4).toFixed(2));
          }
        }
        this.lanePressures[l] = Math.max(-100, Number(((this.lanePressures[l] || 0) - rDelta + (Math.random() * 2 - 1) * timeScale).toFixed(2)));
      });
    } else {
      // Flutuação natural na zona do rio com respeito a matchups
      allLanes.forEach(l => {
        let naturalShift = (Math.random() * 4 - 2) * timeScale;
        if (this.playerTactics === "aggressive") {
          const m = this._getLaneMatchup(l);
          const isCamped = (this.redJungleCampLane === l);
          if ((m && m.score < -0.5) || isCamped) {
            naturalShift -= (3 * timeScale);
          }
        }
        this.lanePressures[l] = Math.max(-100, Math.min(100, Number(((this.lanePressures[l] || 0) + naturalShift).toFixed(2))));
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
        const bDmg = Math.floor((300 + Math.random() * 220) * roleDmgMod * (1 + (bChamp.items ? bChamp.items.length * 0.18 : 0)) * timeScale);
        const rDmg = Math.floor((300 + Math.random() * 220) * roleDmgMod * (1 + (rChamp.items ? rChamp.items.length * 0.18 : 0)) * timeScale);
        bChamp.damageDealt = (bChamp.damageDealt || 0) + bDmg;
        rChamp.damageTaken = (rChamp.damageTaken || 0) + bDmg;
        rChamp.damageDealt = (rChamp.damageDealt || 0) + rDmg;
        bChamp.damageTaken = (bChamp.damageTaken || 0) + rDmg;
      }
    });

    // 2. Decide se ocorre um Confronto Decisivo / Abate ou Troca de Rota
    const canFight = this.combatCooldown <= 0;

    // Escaramuças autênticas por rota e selva durante toda a partida (duelos, invades, ganks e 2v2)
    const skirmishChance = (this.gameSeconds < 840 ? 0.32 : 0.20) * timeScale;
    if (canFight && Math.random() < skirmishChance) {
      const skirmishHappened = this._triggerLaneSkirmish();
      if (skirmishHappened) return;
    }

    const isUnderPressure = Math.abs(this.lanePressure) >= 35;
    const fightChance = (isUnderPressure ? 0.16 : 0.09) * timeScale;
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
      if (this.lanePressure >= 50 && Math.random() < (0.35 * timeScale)) {
        this._damageNextStructure("blue", this.redStructures, Math.max(1, diff * timeScale), false, 0.45);
      } else if (this.lanePressure <= -50 && Math.random() < (0.35 * timeScale)) {
        this._damageNextStructure("red", this.blueStructures, Math.max(1, Math.abs(diff) * timeScale), false, 0.45);
      } else {
        this._triggerSkirmishEqual();
      }
    }
  }

  _calculateSuccessProbability(baseChance, complexity, statType = "combat", context = {}) {
    const bStat = (this.blueTeam.stats && (this.blueTeam.stats[statType] || this.blueTeam.stats.combat)) || 75;
    const rStat = (this.redTeam.stats && (this.redTeam.stats[statType] || this.redTeam.stats.combat)) || 75;
    const statDiff = bStat - rStat;

    // 1. Ouro: Cada 600g de vantagem/desvantagem altera em ±1.5% (até ±15%)
    const goldLead = this.blueScore.gold - this.redScore.gold;
    const goldModifier = Math.min(15, Math.max(-15, Math.round((goldLead / 600) * 1.5)));

    // 2. Abates (Kills): Diferença de kills impacta o moral e controle de espaço
    const killDiff = (this.blueScore.kills || 0) - (this.redScore.kills || 0);
    const killModifier = Math.min(10, Math.max(-10, Math.round(killDiff * 1.2)));

    // 3. Campeões Vivos: Superioridade numérica imediata
    const blueAlive = Object.values(this.blueRosterState).filter(c => c.alive).length;
    const redAlive = Object.values(this.redRosterState).filter(c => c.alive).length;
    const aliveModifier = (blueAlive - redAlive) * 10;

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
    const towerModifier = Math.min(6, Math.max(-6, Math.round(towerDiff * 1.5)));

    // 6. Itens Lendários Completos
    const blueTotalItems = Object.values(this.blueRosterState).reduce((acc, c) => acc + (c.items ? c.items.length : 0), 0);
    const redTotalItems = Object.values(this.redRosterState).reduce((acc, c) => acc + (c.items ? c.items.length : 0), 0);
    const itemModifier = Math.min(8, Math.max(-8, Math.round((blueTotalItems - redTotalItems) * 1.5)));

    // 7. Atributos da Organização
    const statModifier = Math.min(8, Math.max(-8, Math.round(statDiff * 0.25)));

    // 8. Buffs Ativos e Efeitos Táticos
    const bBuffs = this._getTeamBuffModifiers ? this._getTeamBuffModifiers("blue") : { bonusCombat: 0 };
    const rBuffs = this._getTeamBuffModifiers ? this._getTeamBuffModifiers("red") : { bonusCombat: 0 };
    const buffModifier = Math.min(12, Math.max(-12, Math.round((bBuffs.bonusCombat || 0) - (rBuffs.bonusCombat || 0))));

    // Atenuação de penalidades cumulativas quando em desvantagem
    let gameDeficitModifiers = goldModifier + killModifier + towerModifier + itemModifier;
    if (gameDeficitModifiers < 0) {
      gameDeficitModifiers = Math.max(-12, gameDeficitModifiers);
    }

    // 9. Matchup de Campeão e Alvo de Gank do Caçador Adversário
    let matchupModifier = 0;
    let campModifier = 0;
    const targetLane = context.targetLane;
    if (targetLane && targetLane !== "all") {
      const matchup = this._getLaneMatchup(targetLane);
      if (matchup) {
        matchupModifier = Math.min(12, Math.max(-12, Math.round(matchup.score * 4)));
      }
      if (this.redJungleCampLane && this.redJungleCampLane === targetLane) {
        campModifier = -12; // Caçador rival acampando nesta rota prejudica severamente jogadas forçadas
      }
    }

    // 10. Sinergia da Postura Tática com Matchup e Alvo de Gank
    let tacticModifier = 0;
    if (this.playerTactics === "aggressive") {
      // Se a rota tem matchup desfavorável ou está acampada pelo caçador adversário, agressividade cega é severamente punida!
      if (matchupModifier < -2 || campModifier < 0) {
        tacticModifier = -14;
      } else if (matchupModifier > 2 && campModifier === 0) {
        tacticModifier = 6;
      } else {
        tacticModifier = 0;
      }
    } else if (this.playerTactics === "defense") {
      // Jogar defensivo neutraliza a desvantagem de matchup e o camping rival
      if (matchupModifier < 0 || campModifier < 0) {
        tacticModifier = 8;
      } else if (statType === "tank" || complexity === "simple") {
        tacticModifier = 5;
      }
    } else if (this.playerTactics === "split") {
      if (statType === "push" || complexity === "complex") {
        tacticModifier = 6;
      }
    }

    // Dificuldade progressiva justa
    const roundPenalty = [0, -2, -3, -5][this.roundIndex] || 0;

    const rawChance = baseChance + gameDeficitModifiers + aliveModifier + statModifier + buffModifier + rolePenalty + roundPenalty + matchupModifier + campModifier + tacticModifier;

    // Pisos e Tetos Realistas Competitivos (evita auto-vitórias infladas de 85%+):
    // Simple (seguro/farm/ceder): 45% a 76%
    // Tactical (lutas 5v5/contestar): 35% a 66%
    // Complex (dives/all-in/invasão): 20% a 50%
    const simpleFloors = [50, 48, 46, 45];
    const tacticalFloors = [38, 36, 35, 35];
    const complexFloors = [24, 22, 20, 20];

    const sFloor = simpleFloors[this.roundIndex] || 48;
    const tFloor = tacticalFloors[this.roundIndex] || 36;
    const cFloor = complexFloors[this.roundIndex] || 22;

    if (complexity === "simple") {
      return Math.max(sFloor, Math.min(76, Math.round(rawChance)));
    } else if (complexity === "complex") {
      return Math.max(cFloor, Math.min(50, Math.round(rawChance)));
    } else {
      return Math.max(tFloor, Math.min(66, Math.round(rawChance)));
    }
  }

  _generateObjectiveMacroBriefing(objectiveType, meta = {}) {
    const goldDiff = this.blueScore.gold - this.redScore.gold;
    const killDiff = this.blueScore.kills - this.redScore.kills;
    const blueAlive = Object.values(this.blueRosterState).filter(c => c.alive).length;
    const redAlive = Object.values(this.redRosterState).filter(c => c.alive).length;
    const isBlueAhead = (goldDiff >= 1200) || (this.lanePressure >= 25);
    const isBlueBehind = (goldDiff <= -1200) || (this.lanePressure <= -25);

    // 1. Rota do Meio: Prioridade & Tempo de Rotação
    const bMid = this.blueRosterState.mid;
    const rMid = this.redRosterState.mid;
    const midPressure = this.lanePressures ? Math.round(this.lanePressures.mid || 0) : 0;
    const bMidNick = bMid ? (bMid.proPlayer?.nick || bMid.name) : "Mid Laner";
    const rMidNick = rMid ? (rMid.proPlayer?.nick || rMid.name) : "Mid Rival";

    let midPriority = {
      status: "neutral",
      label: "Disputa Neutra (±0)",
      color: "#ffcc00",
      rotationTime: "5-6s (Simultâneo)",
      hasPrio: null,
      desc: `Onda de tropas dividida no centro da rota. ${bMidNick} e ${rMidNick} disputam espaço e podem colapsar ao mesmo tempo no rio.`
    };

    if (!bMid || !bMid.alive) {
      midPriority = {
        status: "dead",
        label: "Mid Abatido (Sem Roam)",
        color: "#ff4d4d",
        rotationTime: "Sem rotação (na base)",
        hasPrio: false,
        desc: `${bMidNick} está fora de combate. O time adversário terá superioridade numérica no rio!`
      };
    } else if (midPressure >= 6) {
      midPriority = {
        status: "strong_prio",
        label: `Prioridade Total (+${midPressure})`,
        color: "#00ff88",
        rotationTime: "3-4s (Chega Primeiro)",
        hasPrio: true,
        desc: `${bMidNick} empurrou a onda contra ${rMidNick}. Tem roam livre para o covil sem perder tropas sob a torre!`
      };
    } else if (midPressure <= -6) {
      midPriority = {
        status: "pushed_in",
        label: `Preso sob a Torre (-${Math.abs(midPressure)})`,
        color: "#ff8800",
        rotationTime: "8-10s (Atrasado)",
        hasPrio: false,
        desc: `${bMidNick} está limpando ondas sob a torre. Se rotacionar agora, o time perderá barricadas de torre e muito XP.`
      };
    }

    // 2. Rota Adjacente: Bot Lane (Dragão/Elder) ou Top Lane (Arauto/Barão)
    const isBotObjective = (objectiveType === "dragon" || objectiveType === "elder");
    let adjacentLane = {};

    if (isBotObjective) {
      const bAdc = this.blueRosterState.adc;
      const bSup = this.blueRosterState.support;
      const botPressure = this.lanePressures ? Math.round(this.lanePressures.bot || 0) : 0;
      const bAdcNick = bAdc ? (bAdc.proPlayer?.nick || bAdc.name) : "Atirador";
      const bSupNick = bSup ? (bSup.proPlayer?.nick || bSup.name) : "Suporte";

      if ((bAdc && !bAdc.alive) || (bSup && !bSup.alive)) {
        adjacentLane = {
          lane: "bot",
          name: "Rota Inferior (BOT)",
          status: "down",
          label: "Baixa na Bot Lane",
          color: "#ff4d4d",
          hasAdvantage: false,
          desc: "Um dos integrantes da bot lane está abatido. Iniciar o dragão sem o Atirador ou Suporte é suicídio."
        };
      } else if (botPressure >= 6) {
        adjacentLane = {
          lane: "bot",
          name: "Rota Inferior (BOT)",
          status: "dominant",
          label: `Pressão Dominante (+${botPressure})`,
          color: "#00ff88",
          hasAdvantage: true,
          desc: `${bAdcNick} e ${bSupNick} pressionam a rota inferior, garantem visão na entrada do rio e chegam antes no covil!`
        };
      } else if (botPressure <= -6) {
        adjacentLane = {
          lane: "bot",
          name: "Rota Inferior (BOT)",
          status: "pushed_in",
          label: `Bot Sob Pressão (-${Math.abs(botPressure)})`,
          color: "#ff8800",
          hasAdvantage: false,
          desc: `A dupla inimiga tem a iniciativa da rota e colocou sentinelas na boca do covil. Difícil aproximação.`
        };
      } else {
        adjacentLane = {
          lane: "bot",
          name: "Rota Inferior (BOT)",
          status: "even",
          label: "Disputa Pareada (±0)",
          color: "#ffcc00",
          hasAdvantage: null,
          desc: "Bot lanes em igualdade. Quem avançar para o rio precisará de auxílio do Suporte para abrir caminho."
        };
      }
    } else {
      // Arauto ou Barão (Top Lane)
      const bTop = this.blueRosterState.top;
      const topPressure = this.lanePressures ? Math.round(this.lanePressures.top || 0) : 0;
      const bTopNick = bTop ? (bTop.proPlayer?.nick || bTop.name) : "Top Laner";

      if (bTop && !bTop.alive) {
        adjacentLane = {
          lane: "top",
          name: "Rota Superior (TOP)",
          status: "down",
          label: "Top Laner Abatido",
          color: "#ff4d4d",
          hasAdvantage: false,
          desc: `${bTopNick} está fora de combate. O time adversário tem superioridade para dominar o rio norte.`
        };
      } else if (topPressure >= 6) {
        adjacentLane = {
          lane: "top",
          name: "Rota Superior (TOP)",
          status: "dominant",
          label: `Top Dominante (+${topPressure})`,
          color: "#00ff88",
          hasAdvantage: true,
          desc: `${bTopNick} tem vantagem de pressão no topo e pode descer para zoneamento com Teleporte pronto.`
        };
      } else if (topPressure <= -6) {
        adjacentLane = {
          lane: "top",
          name: "Rota Superior (TOP)",
          status: "pushed_in",
          label: `Top Acuado (-${Math.abs(topPressure)})`,
          color: "#ff8800",
          hasAdvantage: false,
          desc: `Top laner rival empurra a rota e tem a prioridade da folhagem do rio norte.`
        };
      } else {
        adjacentLane = {
          lane: "top",
          name: "Rota Superior (TOP)",
          status: "even",
          label: "Topo Pareado (±0)",
          color: "#ffcc00",
          hasAdvantage: null,
          desc: "Duelo isolado no topo. Ambos podem rotacionar com tempos semelhantes de caminhada."
        };
      }
    }

    // 3. Histórico e Rotas da Selva (Jungle Pathing & Early Game Context)
    const bJg = this.blueRosterState.jungle;
    const rJg = this.redRosterState.jungle;
    const bJgNick = bJg ? (bJg.proPlayer?.nick || bJg.name) : "Caçador";
    const rJgNick = rJg ? (rJg.proPlayer?.nick || rJg.name) : "Caçador Rival";
    const smiteReady = bJg && bJg.alive;

    let jungleContext = {
      label: "Presença da Selva",
      color: "#00b4d8",
      smiteStatus: smiteReady ? "⚡ Golpe (Smite) Pronto" : "❌ Golpe Indisponível (Morto)",
      desc: ""
    };

    if (!smiteReady) {
      jungleContext.desc = `${bJgNick} está na base aguardando ressurgimento. Sem Golpe (Smite), o risco de roubo ou derrota é de 90%!`;
      jungleContext.color = "#ff4d4d";
    } else if (isBotObjective) {
      if (this.blueJgStartChoice === "start_blue_buff") {
        jungleContext.desc = `${bJgNick} iniciou no Buff Azul e fez rotação rumo ao Bot aos 03:00. Já estabeleceu controle de visão e presença territorial no quadrante sul!`;
        jungleContext.label = "🔵 Pathing Rumo ao Bot (Posição Perfeita)";
        jungleContext.color = "#00ff88";
      } else if (this.blueJgStartChoice === "start_red_buff") {
        jungleContext.desc = `${bJgNick} iniciou no Red Buff focando o Top no early game. Teve que descer o mapa para contestar este objetivo, exigindo sincronia com o time.`;
        jungleContext.label = "🔴 Pathing Rumo ao Top (Reposicionando)";
        jungleContext.color = "#ffaa00";
      } else if (this.blueJgStartChoice === "invade_team") {
        jungleContext.desc = `A invasão em equipe de Nível 1 conferiu vantagem em ouro e moral (+First Blood). ${bJgNick} dita o ritmo nos confrontos do rio.`;
        jungleContext.label = "⚔️ Invasão Nível 1 (Liderança de Ritmo)";
        jungleContext.color = "#00ff88";
      } else if (this.blueJgStartChoice === "invade_vertical") {
        jungleContext.desc = `O roubo furtivo vertical dividiu o mapa e garantiu 3 buffs para ${bJgNick}, que conta com vantagem de experiência para o objetivo.`;
        jungleContext.label = "🥷 Selva Vertical (Vantagem de Nível)";
        jungleContext.color = "#00ff88";
      } else {
        jungleContext.desc = `${bJgNick} está patrulhando o rio com Smite pronto para a contestação.`;
      }
    } else {
      // Arauto ou Barão
      if (this.blueJgStartChoice === "start_red_buff") {
        jungleContext.desc = `${bJgNick} traçou rota sul-norte no early game e domina o quadrante do Arauto/Barão.`;
        jungleContext.label = "🔴 Domínio do Quadrante Norte";
        jungleContext.color = "#00ff88";
      } else {
        jungleContext.desc = `${bJgNick} tem Smite preparado e controla os acessos pelo rio norte.`;
        jungleContext.label = "Controle de Selva Superior";
      }
    }

    // 4. Cálculo Ponderado de Viabilidade e Veredito Competitivo
    let score = 0;
    if (isBlueAhead) score += 2;
    if (isBlueBehind) score -= 2;

    if (midPriority.status === "strong_prio") score += 2;
    else if (midPriority.status === "pushed_in") score -= 2;
    else if (midPriority.status === "dead") score -= 4;

    if (adjacentLane.status === "dominant") score += 2;
    else if (adjacentLane.status === "pushed_in") score -= 2;
    else if (adjacentLane.status === "down") score -= 4;

    if (smiteReady) {
      if (isBotObjective && this.blueJgStartChoice === "start_blue_buff") score += 1;
      if (!isBotObjective && this.blueJgStartChoice === "start_red_buff") score += 1;
    } else {
      score -= 5;
    }

    let feasibility = {
      level: "medium",
      score,
      badge: "🟡 DISPUTA EQUILIBRADA • RISCO 50/50",
      pillClass: "feasibility-med",
      color: "#ffcc00",
      verdictTitle: "Disputa Aberta: Janela de Risco Competitivo",
      verdictDesc: "As rotas estão divididas ou sem prioridade clara. Qualquer pickoff ou atraso pode custar a luta de equipe.",
      recommendation: "Mantenha sentinelas defensivas. Se o adversário iniciar sem visão, prepare o contra-ataque ou tente o roubo no Smite."
    };

    if (score >= 3) {
      feasibility = {
        level: "high",
        score,
        badge: "🟢 CONDIÇÕES IDEAIS • ALTA VIABILIDADE",
        pillClass: "feasibility-high",
        color: "#00ff88",
        verdictTitle: "Janela Perfeita: Prioridade de Rotas e Suporte Total",
        verdictDesc: "Seu time tem prioridade nas rotas adjacentes, superioridade de visão e chega primeiro no covil sem sacrificar tropas.",
        recommendation: "ALTAMENTE RECOMENDADO: Iniciar o objetivo rapidamente ou forçar combate na aproximação do time adversário!"
      };
    } else if (score <= -1) {
      feasibility = {
        level: "low",
        score,
        badge: "🔴 DESFAVORÁVEL • RISCO DE EMBOSCADA",
        pillClass: "feasibility-low",
        color: "#ff4d4d",
        verdictTitle: "Armadilha no Rio: Rotas Acuadas e Desvantagem",
        verdictDesc: "Suas rotas estão pressionadas sob as torres e o time rival controla os acessos do rio. Forçar uma luta aqui pode gerar um wipe.",
        recommendation: "RECOMENDAÇÃO COMPETITIVA: CEDA o objetivo deliberadamente e execute jogada de troca no mapa oposto (Cross-Map por barricadas/ouro no Top)!"
      };
    }

    return {
      objectiveType,
      gameSeconds: this.gameSeconds,
      formattedTime: this._formatTime(),
      gameBalance: {
        goldDiff,
        killDiff,
        blueAlive,
        redAlive,
        isAhead: isBlueAhead,
        isBehind: isBlueBehind
      },
      midPriority,
      adjacentLane,
      jungleContext,
      feasibility
    };
  }

  _checkNeutralObjectives() {
    // Não dispara novas decisões se uma estiver ativa ou se houve uma decisão recente (< 60s)
    if (this.activeDecision || (this.lastDecisionSec && (this.gameSeconds - this.lastDecisionSec) < 60)) {
      return false;
    }

    // 0. Estratégia de Nível 1 e Rota Inicial do Caçador (aos 00:04 de jogo, início imediato da partida)
    if (!this.level1Taken && this.gameSeconds >= 4 && this.gameSeconds <= 24) {
      this.level1Taken = true;

      const isRedStartingTop = (this.redJgStartChoice === "start_red_buff");
      const selectedScouting = isRedStartingTop
        ? "Radar indica que o Top Laner rival vigia a entrada do rio superior e o Caçador adversário prepara início no Buff Vermelho."
        : "Sentinelas do rio inferior acusam a bot lane inimiga agrupada para dar leash no Buff Azul na selva inferior.";

      const options = [
        {
          id: "start_blue_buff",
          icon: "🔵",
          name: "Iniciar no Buff Azul (Pathing Rumo ao Bot)",
          gankTarget: "bot",
          badge: "🎯 GANK NO BOT (03:00)",
          complexity: "simple",
          complexityLabel: "🟢 Rota Padrão",
          probability: this._calculateSuccessProbability(86, "simple", "utility"),
          risk: "Risco Mínimo",
          riskClass: "low",
          reward: "Aceleração de Mana + Gank 3v2 no Bot aos 03:00 (+Abate/Placas de Torre)",
          failureConsequence: "Gank neutralizado se a bot lane adversária recuar sob a torre",
          desc: "Inicia limpando a Sentinela Azul, limpa o quadrante superior e desce o mapa para emboscar a Rota Inferior com nível 3 aos 3 minutos de jogo."
        },
        {
          id: "start_red_buff",
          icon: "🔴",
          name: "Iniciar no Buff Vermelho (Pathing Rumo ao Top)",
          gankTarget: "top",
          badge: "🎯 GANK NO TOP (03:00)",
          complexity: "simple",
          complexityLabel: "🟢 Rota Padrão",
          probability: this._calculateSuccessProbability(86, "simple", "damage"),
          risk: "Risco Mínimo",
          riskClass: "low",
          reward: "Queimadura do Red Buff + Duelo 2v1 no Top aos 03:00 (+First Blood/Controle de Top)",
          failureConsequence: "Top Laner adversário joga recuado sob a torre sem mortes",
          desc: "Inicia na Rubrivira com leash forte, limpa a selva sul e sobe com a lentidão do Red Buff para gankar o Top aos 3 minutos."
        },
        {
          id: "invade_team",
          icon: "⚔️",
          name: "Invasão Nível 1 em Equipe (4-Man Invade)",
          gankTarget: isRedStartingTop ? "top" : "bot",
          badge: "💥 FIRST BLOOD & ROUBO",
          complexity: "tactical",
          complexityLabel: "🟡 Jogada de Alto Impacto",
          probability: this._calculateSuccessProbability(68, "tactical", "combat"),
          risk: "Alto Risco / Alto Retorno",
          riskClass: "high",
          reward: "First Blood na Selva (+400g) + Roubo do Buff Rival (+90g) + Flash Queimado",
          failureConsequence: "Contra-ataque inimigo e queima defensiva de Feitiços de Invocador",
          desc: "Avança em bloco de 4 jogadores pelo rio aos 00:50 para emboscar o caçador rival em seu buff inicial e forçar vantagem imediata."
        },
        {
          id: "invade_vertical",
          icon: "🥷",
          name: "Roubo Furtivo Vertical (Vertical Jungling)",
          gankTarget: "mid",
          badge: "🗺️ DIVISÃO DO MAPA",
          complexity: "tactical",
          complexityLabel: "🟡 Estratégia Macro",
          probability: this._calculateSuccessProbability(75, "tactical", "utility"),
          risk: "Médio Risco",
          riskClass: "medium",
          reward: "3 Buffs Garantidos (+180g) + Anulação de Metade da Selva Rival",
          failureConsequence: "Sentinela profunda detecta o roubo; forçado a recuar para própria selva",
          desc: "Invadir sorrateiramente o buff do lado oposto ao que o caçador rival iniciou, dividindo o mapa verticalmente e roubando o monstro."
        }
      ];

      const decisionData = {
        id: "level1",
        meta: {},
        badge: "INÍCIO DE PARTIDA • ESTRATÉGIA DE SELVA (00:04)",
        title: "🌲 PLANO DE ROTA INICIAL DO CAÇADOR & INVASÃO",
        subtitle: "Defina onde seu Caçador começará e qual rota receberá o primeiro gank decisivo aos 3 minutos de jogo:",
        scouting: {
          intelTag: "📡 RADAR DE VISÃO NÍVEL 1",
          enemyAction: selectedScouting,
          recommendation: ""
        },
        options
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

      const macroBriefing = this._generateObjectiveMacroBriefing("elder");

      if (macroBriefing && macroBriefing.feasibility) {
        const fScore = macroBriefing.feasibility.score;
        elderOptions.forEach(opt => {
          if (opt.id === "base_race") {
            if (fScore <= -1) opt.probability = Math.min(70, opt.probability + 8);
          } else {
            if (fScore >= 3) opt.probability = Math.min(92, opt.probability + 6);
            else if (fScore <= -1) opt.probability = Math.max(35, opt.probability - 10);
          }
        });
      }

      this.onEvent({
        type: "objective_briefing",
        side: "blue",
        icon: "🔥",
        text: `🔥 DRAGÃO ANCIÃO (${this._formatTime()}): ${macroBriefing.feasibility.verdictTitle}! Mid: ${macroBriefing.midPriority.label} | Bot: ${macroBriefing.adjacentLane.label}`,
        time: this._formatTime()
      });

      const decisionData = {
        id: "elder",
        meta: {},
        badge: `CLÍMAX • DRAGÃO ANCIÃO • ${this._formatTime()}`,
        title: "🔥 O DRAGÃO ANCIÃO SURGIU NO RIFT (DECISIVO)!",
        subtitle: "Briefing decisivo de fim de jogo: analise o mapa e a viabilidade antes da luta final:",
        macroBriefing,
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

      const macroBriefing = this._generateObjectiveMacroBriefing("baron");

      if (macroBriefing && macroBriefing.feasibility) {
        const fScore = macroBriefing.feasibility.score;
        baronOptions.forEach(opt => {
          if (opt.id.includes("turn") || opt.id.includes("bait")) {
            if (fScore >= 3) opt.probability = Math.min(92, opt.probability + 8);
          } else {
            if (fScore >= 3) opt.probability = Math.min(92, opt.probability + 6);
            else if (fScore <= -1) opt.probability = Math.max(35, opt.probability - 10);
          }
        });
      }

      this.onEvent({
        type: "objective_briefing",
        side: "blue",
        icon: "👑",
        text: `👑 BARÃO NA'SHOR (${this._formatTime()}): ${macroBriefing.feasibility.verdictTitle}! Mid: ${macroBriefing.midPriority.label} | Top: ${macroBriefing.adjacentLane.label}`,
        time: this._formatTime()
      });

      const decisionData = {
        id: "baron",
        meta: {},
        badge: `CONFRONTO LENDÁRIO • ${this._formatTime()}`,
        title: "👑 O BARÃO NA'SHOR EMERGIU NO RIFT!",
        subtitle: "Briefing macro do objetivo lendário: avalie a viabilidade de forçar o monstro ou preparar emboscada:",
        macroBriefing,
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

      const macroBriefing = this._generateObjectiveMacroBriefing("dragon", { dType });

      // Ajuste fino das probabilidades baseado no briefing macro
      if (macroBriefing && macroBriefing.feasibility) {
        const fScore = macroBriefing.feasibility.score;
        dragonOptions.forEach(opt => {
          if (opt.id === "cross_trade") {
            if (fScore <= -1) opt.probability = Math.min(92, opt.probability + 10);
            else if (fScore >= 3) opt.probability = Math.max(45, opt.probability - 6);
          } else if (opt.id === "steal") {
            if (fScore <= -1) opt.probability = Math.min(65, opt.probability + 6);
          } else {
            if (fScore >= 3) opt.probability = Math.min(92, opt.probability + 8);
            else if (fScore <= -1) opt.probability = Math.max(35, opt.probability - 10);
          }
        });
      }

      this.onEvent({
        type: "objective_briefing",
        side: "blue",
        icon: "🐲",
        text: `🐲 DRAGÃO AOS ${this._formatTime()}: ${macroBriefing.feasibility.verdictTitle}! Mid: ${macroBriefing.midPriority.label} | Bot: ${macroBriefing.adjacentLane.label}`,
        time: this._formatTime()
      });

      const decisionData = {
        id: "dragon",
        meta: { dType },
        badge: `OBJETIVO NEUTRO • ${this._formatTime()}`,
        title: `🐲 DRAGÃO ${dType.toUpperCase()} NASCEU NO COVIL!`,
        subtitle: `Análise macro completa do Rift para a disputa do Covil Inferior. Qual a decisão da sua equipe?`,
        macroBriefing,
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

      const macroBriefing = this._generateObjectiveMacroBriefing("herald");

      if (macroBriefing && macroBriefing.feasibility) {
        const fScore = macroBriefing.feasibility.score;
        heraldOptions.forEach(opt => {
          if (opt.id.includes("cross") || opt.id.includes("vision")) {
            if (fScore <= -1) opt.probability = Math.min(92, opt.probability + 10);
            else if (fScore >= 3) opt.probability = Math.max(45, opt.probability - 6);
          } else {
            if (fScore >= 3) opt.probability = Math.min(92, opt.probability + 8);
            else if (fScore <= -1) opt.probability = Math.max(35, opt.probability - 10);
          }
        });
      }

      this.onEvent({
        type: "objective_briefing",
        side: "blue",
        icon: "👁️",
        text: `👁️ ARAUTO DO VALE (${this._formatTime()}): ${macroBriefing.feasibility.verdictTitle}! Mid: ${macroBriefing.midPriority.label} | Top: ${macroBriefing.adjacentLane.label}`,
        time: this._formatTime()
      });

      const decisionData = {
        id: "herald",
        meta: {},
        badge: `PRESSÃO DE EARLY GAME • ${this._formatTime()}`,
        title: "👁️ O ARAUTO DO VALE SURGIU NO RIO SUPERIOR!",
        subtitle: "Briefing macro do rio norte: avalie a viabilidade de disputar o monstro ou trocar recursos:",
        macroBriefing,
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

    // Evita sobreposição com objetivos neutros ativos ou iminentes (janela de 45 segundos)
    const isDragonNear = (this.gameSeconds >= this.nextDragonAt && this.gameSeconds < 1680) || (this.nextDragonAt - this.gameSeconds > 0 && this.nextDragonAt - this.gameSeconds < 45);
    const isBaronNear = (this.gameSeconds >= this.nextBaronAt) || (this.nextBaronAt - this.gameSeconds > 0 && this.nextBaronAt - this.gameSeconds < 45);
    const isHeraldNear = (!this.heraldTaken && this.gameSeconds >= 450 && this.gameSeconds < 840);
    const isElderNear = (this.gameSeconds >= this.nextElderAt) || (this.nextElderAt - this.gameSeconds > 0 && this.nextElderAt - this.gameSeconds < 45);

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

    // Incidente Prioritário de Early Game: Escolha do Plano de Foco do Caçador (02:30 a 06:00)
    if (this.gameSeconds >= 150 && this.gameSeconds <= 360 && !this._jgPlanIncidentFired) {
      this._jgPlanIncidentFired = true;
      const decisionData = this._buildDynamicIncidentData("jg_camp_plan", phase, isAhead, isBehind);
      if (decisionData) {
        this._triggerTacticalDecision(decisionData);
        return true;
      }
    }

    // Pool de tipos candidatos
    const candidateTypes = ["top_lane", "jungle_river", "mid_lane", "bot_lane"];
    if (isAhead) candidateTypes.push("situational_snowball");
    if (isBehind) candidateTypes.push("situational_comeback");
    if (phase !== "early" && !isAhead && !isBehind) candidateTypes.push("situational_clash");

    // Candidato Especial: Pós-15 minutos - Macro do Top (Push Rápido vs Rotação 5v4)
    if (this.gameSeconds >= 900) {
      candidateTypes.push("top_push_priority_macro");
    }

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

    if (type === "jg_camp_plan") {
      const probTop = this._calculateSuccessProbability(76, "tactical", "combat", { targetLane: "top" });
      const probMid = this._calculateSuccessProbability(74, "tactical", "utility", { targetLane: "mid" });
      const probBot = this._calculateSuccessProbability(72, "tactical", "damage", { targetLane: "bot" });

      return {
        id: `dynamic_jg_plan_${this.gameSeconds}`,
        meta: { targetLane: "all" },
        badge: `PLANO DE JOGO • SELVA & ROTAS`,
        title: "🌲 PLANO DO CAÇADOR: ESCOLHA A ROTA DE FOCO & CARREGADOR",
        subtitle: `Com qual rota ${bJg} deve jogar junto para criar o Carregador da partida e vencer o jogo?`,
        scouting: {
          intelTag: "📡 TELEMETRIA DE SELVA & PATHING",
          enemyAction: `${rJg} iniciando rotação na selva • Escolha qual companheiro alimentar para ditar o ritmo da partida.`
        },
        options: [
          {
            id: "jg_camp_top",
            icon: "🏔️",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Acampar no Topo: Alimentar ${bTop} (Duelista de Split)`,
            complexity: "tactical",
            complexityLabel: "🟡 Foco no Top",
            probability: probTop,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `Gank no Top (+400g) + Pressão de Barricadas + ${bTop} Carregador 1v1`,
            failureConsequence: `${rTop} recua sob a torre e gasta Flash com segurança`,
            desc: `Direcionar ganks repetidos para o topo, conceder abates a ${bTop} e criar uma força de split push imparável.`
          },
          {
            id: "jg_camp_mid",
            icon: "⚡",
            zone: "mid",
            zoneLabel: "⚡ ROTA CENTRAL",
            name: `Prioridade no Meio: Habilitar ${bMid} (Mago/Assassino de Roam)`,
            complexity: "tactical",
            complexityLabel: "🟡 Foco no Mid",
            probability: probMid,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `Abate no Mid (+400g) + Controle Central + Liberdade de Roaming para ${bMid}`,
            failureConsequence: `${rMid} esquiva do gank e contra-ataca à distância`,
            desc: `Garantir visão no rio, punir ${rMid} e dar espaço para ${bMid} liderar as lutas e rotações no mapa todo.`
          },
          {
            id: "jg_camp_bot",
            icon: "🏹",
            zone: "bot",
            zoneLabel: "🏹 ROTA INFERIOR",
            name: `Blindagem no Bot: Recursos & Ouro para ${bAdc} (Late Game Carry)`,
            complexity: "tactical",
            complexityLabel: "🟡 Foco no Bot",
            probability: probBot,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `Double Kill no Bot (+600g) + Barricadas + ${bAdc} Hiper-Carregador`,
            failureConsequence: `A dupla rival joga recuada sob a torre e atrasa o gank`,
            desc: `Colapsar 3v2 na bot lane, arrancar placas de ouro para ${bAdc} e transformá-lo na máquina de dano da partida.`
          }
        ]
      };
    }

    if (type === "top_push_priority_macro") {
      const adv = this._calculateTopPushAdvantage();
      const isBlueAhead = adv.score >= 0;
      const probRotate = this._calculateSuccessProbability(isBlueAhead ? 78 : 55, "simple", "combat", { targetLane: "top" });
      const probShoveT2 = this._calculateSuccessProbability(isBlueAhead ? 70 : 48, "complex", "push", { targetLane: "top" });
      const probSafety = this._calculateSuccessProbability(80, "simple", "utility", { targetLane: "top" });

      const advText = isBlueAhead 
        ? `🌊 VANTAGEM DE PUSH: ${bTop} limpa tropas mais rápido (+${adv.score} de Push). ${rTop} está preso sob a torre.`
        : `⚠️ DESVANTAGEM DE PUSH: ${rTop} tem prioridade de avanço (+${Math.abs(adv.score)} de Push). ${bTop} precisa segurar sob a torre.`;

      return {
        id: `dynamic_top_macro_${this.gameSeconds}`,
        meta: { targetLane: "top" },
        badge: `15:00+ MACRO • ROTA LATERAL`,
        title: isBlueAhead 
          ? "🌊 15:00+ MACRO DO TOPO: PUSH RÁPIDO & ROTAÇÃO 5v4" 
          : "🛡️ 15:00+ MACRO DO TOPO: RESPOSTA À PRESSÃO LATERAL",
        subtitle: isBlueAhead
          ? `${bTop} limpou a onda primeiro e conquistou tempo de mapa livre. Qual será a movimentação tática?`
          : `${rTop} empurrou a onda contra a estrutura aliada. Como sua equipe deve reagir?`,
        scouting: {
          intelTag: "📡 RADAR DE AVANÇO DE ROTA (SIDE LANE)",
          enemyAction: `${advText} • Duelo de velocidade de limpeza de tropas dita o ritmo dos objetivos neutros.`
        },
        options: isBlueAhead ? [
          {
            id: "top_macro_rotate_5v4",
            icon: "⚡",
            zone: "map",
            zoneLabel: "⚔️ MAPA GLOBAL",
            name: `Push Rápido & Descer para o Rio: Forçar Luta 5v4 no Objetivo`,
            complexity: "simple",
            complexityLabel: "🟢 Rotação de Tempo",
            probability: probRotate,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: `Luta 5v4 Vitoriosa no Rio (+550g) + Objetivo Neutro Garantido`,
            failureConsequence: `${rTop} gasta teleporte e iguala os números a tempo`,
            desc: `Aproveitar que ${rTop} está preso limpando tropas sob a torre para descer correndo e esmagar o CBLOL em superioridade numérica.`
          },
          {
            id: "top_macro_shove_t2",
            icon: "🏰",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Split Push Furioso na T2 do Topo & Dano de Cerco`,
            complexity: "complex",
            complexityLabel: "🔴 Cerco Implacável",
            probability: probShoveT2,
            risk: "Alto Retorno",
            riskClass: "high",
            reward: `Destruição da Torre T2 (+600g para ${bTop}) + Pressão de Inibidor`,
            failureConsequence: `CBLOL colapsa em 2 jogadores e força recuo sem a torre`,
            desc: `Manter a pressão implacável na rota lateral, castigar a torre Tier 2 e forçar o adversário a deslocar múltiplos membros.`
          },
          {
            id: "top_macro_freeze_deny",
            icon: "❄️",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Congelar Onda Lateral & Negar Tropas a ${rTop}`,
            complexity: "tactical",
            complexityLabel: "🟡 Sufocamento de CS",
            probability: probSafety,
            risk: "Risco Mínimo",
            riskClass: "low",
            reward: `Negação de Farm (+200g) + Controle de Visão Profunda na Selva`,
            failureConsequence: `${rTop} quebra o congelamento com magias de longa distância`,
            desc: `Congelar as tropas na sua metade do mapa para forçar ${rTop} a se expor perigosamente ou definhar em recursos.`
          }
        ] : [
          {
            id: "top_macro_defend_t2",
            icon: "🛡️",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Defender sob a Torre T2 com Paciência & Coletar a Onda`,
            complexity: "simple",
            complexityLabel: "🟢 Defesa Estrutural",
            probability: probSafety,
            risk: "Baixo Risco",
            riskClass: "low",
            reward: `Torre T2 Protegida + Coleta Segura de Farm (+250g)`,
            failureConsequence: `${rTop} consegue lascar dano residual na estrutura`,
            desc: `Limpar as tropas sob a proteção da torre T2, recuperar vida e negar ouro de estrutura ao adversário.`
          },
          {
            id: "top_macro_gank_collapse",
            icon: "🌲",
            zone: "top",
            zoneLabel: "🏔️ ROTA SUPERIOR",
            name: `Colapso com ${bJg}: Emboscar o Splitter Rival Avançado`,
            complexity: "tactical",
            complexityLabel: "🟡 Emboscada 2v1",
            probability: probRotate,
            risk: "Médio Risco",
            riskClass: "medium",
            reward: `Shutdown em ${rTop} (+500g) + Alívio da Pressão Lateral`,
            failureConsequence: `${rTop} escapa pelo mato ou troca kill no 1v2`,
            desc: `Punir a ganância do top laner rival que avançou sem visão: ${bJg} fecha o cerco pelas costas e garante o abate.`
          },
          {
            id: "top_macro_trade_crossmap",
            icon: "🏹",
            zone: "bot",
            zoneLabel: "🏹 ROTA INFERIOR",
            name: `Troca de Mapa: Forçar Objetivo Rápido no Lado Oposto`,
            complexity: "complex",
            complexityLabel: "🔴 Troca Agressiva",
            probability: probShoveT2,
            risk: "Alto Retorno",
            riskClass: "high",
            reward: `Torre / Dragão no Bot (+500g) enquanto o rival perde tempo no Top`,
            failureConsequence: `O rival derruba a torre no topo antes de sua equipe concluir o bot`,
            desc: `Ignorar o avanço rival no topo e acelerar 4 ou 5 membros no lado inferior para cobrar uma estrutura maior.`
          }
        ]
      };
    }

    if (type === "top_lane") {
      const isEarly = phase === "early";
      const probFreeze = this._calculateSuccessProbability(78, "simple", "combat", { targetLane: "top" });
      const probCrash = this._calculateSuccessProbability(68, "tactical", "push", { targetLane: "top" });
      const probDive = this._calculateSuccessProbability(58, "complex", "damage", { targetLane: "top" });

      const topMatchup = this._getLaneMatchup("top");
      const isTopCamped = (this.redJungleCampLane === "top");
      let enemyScoutAction = `${rTop} jogando em volta da onda de minions • ${rJg} observado no quadrante superior do mapa.`;
      if (isTopCamped) {
        enemyScoutAction = `⚠️ ALERTA DE SELVA: ${rJg} acampa na Rota Superior! • ${enemyScoutAction}`;
      }
      if (topMatchup && topMatchup.advantageSide !== "neutral") {
        enemyScoutAction += ` [Matchup: ${topMatchup.label} - ${topMatchup.desc}]`;
      }

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
          enemyAction: enemyScoutAction
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
      const probScuttle = this._calculateSuccessProbability(75, "simple", "combat", { targetLane: "jungle" });
      const probInvade = this._calculateSuccessProbability(68, "tactical", "utility", { targetLane: "jungle" });
      const probGank = this._calculateSuccessProbability(62, "complex", "damage", { targetLane: "jungle" });

      const jgMatchup = this._getLaneMatchup("jungle");
      let enemyScoutAction = `${rJg} patrulhando a entrada do rio • Disputa tensa pelo controle de sentinelas e visão de covil.`;
      if (this.redJungleCampLane) {
        const laneNames = { top: "Rota Superior", mid: "Rota Central", bot: "Rota Inferior" };
        enemyScoutAction = `⚠️ RADAR: ${rJg} focado em acampar na ${laneNames[this.redJungleCampLane] || this.redJungleCampLane}! • ${enemyScoutAction}`;
      }
      if (jgMatchup && jgMatchup.advantageSide !== "neutral") {
        enemyScoutAction += ` [Duelo na Selva: ${jgMatchup.label} - ${jgMatchup.desc}]`;
      }

      return {
        id: `dynamic_jungle_${this.gameSeconds}`,
        meta: { targetLane: "jungle" },
        badge: `SELVA & RIO • ${timeStr}`,
        title: "🌲 SELVA & RIO: DISPUTA DE ARONGUEJO & INVASÃO",
        subtitle: `${bJg} detectou o caçador rival ${rJg} disputando o controle do rio e dos acampamentos neutros.`,
        scouting: {
          intelTag: "📡 TELEMETRIA DA SELVA & RIO",
          enemyAction: enemyScoutAction
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
      const probRoam = this._calculateSuccessProbability(68, "tactical", "damage", { targetLane: "mid" });
      const probSiege = this._calculateSuccessProbability(76, "simple", "push", { targetLane: "mid" });
      const probBurst = this._calculateSuccessProbability(60, "complex", "combat", { targetLane: "mid" });

      const midMatchup = this._getLaneMatchup("mid");
      const isMidCamped = (this.redJungleCampLane === "mid");
      let enemyScoutAction = `${rMid} sob a torre limpando tropas • Rotas laterais vulneráveis a rotações rápidas pelo rio.`;
      if (isMidCamped) {
        enemyScoutAction = `⚠️ ALERTA DE SELVA: ${rJg} acampa na Rota do Meio! • ${enemyScoutAction}`;
      }
      if (midMatchup && midMatchup.advantageSide !== "neutral") {
        enemyScoutAction += ` [Matchup: ${midMatchup.label} - ${midMatchup.desc}]`;
      }

      return {
        id: `dynamic_mid_${this.gameSeconds}`,
        meta: { targetLane: "mid" },
        badge: `ROTA DO MEIO • ${timeStr}`,
        title: "⚡ ROTA DO MEIO: PRIORIDADE CENTRAL & ROAMING",
        subtitle: `${bMid} limpou as tropas no centro do mapa e abriu janela decisiva para ditar o ritmo contra ${rMid}.`,
        scouting: {
          intelTag: "📡 RADAR CENTRAL (MID)",
          enemyAction: enemyScoutAction
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
      const probAllin = this._calculateSuccessProbability(64, "complex", "combat", { targetLane: "bot" });
      const probDragon = this._calculateSuccessProbability(75, "simple", "utility", { targetLane: "bot" });
      const probPlates = this._calculateSuccessProbability(70, "tactical", "push", { targetLane: "bot" });

      const botMatchup = this._getLaneMatchup("bot");
      const isBotCamped = (this.redJungleCampLane === "bot");
      let enemyScoutAction = `${rAdc} e ${rSupp} trocando dano na linha de frente • Covil do Dragão desprotegido no rio inferior.`;
      if (isBotCamped) {
        enemyScoutAction = `⚠️ ALERTA DE SELVA: ${rJg} acampa na Rota Inferior (Bot)! • ${enemyScoutAction}`;
      }
      if (botMatchup && botMatchup.advantageSide !== "neutral") {
        enemyScoutAction += ` [Matchup 2v2: ${botMatchup.label} - ${botMatchup.desc}]`;
      }

      return {
        id: `dynamic_bot_${this.gameSeconds}`,
        meta: { targetLane: "bot" },
        badge: `ROTA INFERIOR • ${timeStr}`,
        title: "🏹 ROTA INFERIOR: COMBATE 2v2 & CONTROLE DO COVIL",
        subtitle: `${bAdc} e ${bSupp} engajaram em trocas intensas na Rota Inferior contra ${rAdc} e ${rSupp}.`,
        scouting: {
          intelTag: "📡 RADAR DA ROTA INFERIOR (BOT)",
          enemyAction: enemyScoutAction
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

      const isCamped = (this.redJungleCampLane === targetLane);
      const laneMatchup = this._getLaneMatchup(targetLane);
      let enemyScoutAction = `${rJg} aproximando-se pelas costas • ${rivalName} segurando a rota aguardando a pinça sob a torre.`;
      if (isCamped) {
        enemyScoutAction = `⚠️ ROTA MARCADA: ${rJg} elegeu esta rota como alvo preferencial de camp! • ${enemyScoutAction}`;
      }
      if (laneMatchup && laneMatchup.advantageSide !== "neutral") {
        enemyScoutAction += ` [${laneMatchup.label}: ${laneMatchup.desc}]`;
      }

      const probRetreat = this._calculateSuccessProbability(80, "simple", "utility", { targetLane });
      const probGreed = this._calculateSuccessProbability(62, "tactical", "push", { targetLane });
      const probTurn = this._calculateSuccessProbability(48, "complex", "combat", { targetLane });

      return {
        id: `dynamic_overextend_${this.gameSeconds}`,
        meta: { targetLane },
        badge: `⚠️ PERIGO DE GANK • ${timeStr}`,
        title: `${laneIcon} ${laneName}: OPRESSÃO SOB A TORRE & RISCO DE GANK!`,
        subtitle: `${allyName} empurrou as tropas até a torre inimiga! Mas o caçador adversário ${rJg} sumiu da fumaça e prepara um flanco fatal pelas costas!`,
        scouting: {
          intelTag: `📡 ALERTA DE FLANCO NA ${laneName}`,
          enemyAction: enemyScoutAction
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
      const probGroup = this._calculateSuccessProbability(72, "simple", "combat", { targetLane: "mid" });
      const probSplit = this._calculateSuccessProbability(62, "tactical", "push", { targetLane: "top" });
      const probTpFlank = this._calculateSuccessProbability(52, "complex", "macro", { targetLane: "top" });

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
    killer.goldCurrent = (killer.goldCurrent || 0) + 300;

    // Assistências dos aliados vivos do assassino (150g divididos igualmente)
    const assistCandidates = Object.values(killerRoster).filter(c => c.id !== killer.id && c.alive);
    if (assistCandidates.length > 0) {
      const assistCount = Math.min(assistCandidates.length, Math.floor(Math.random() * 3) + 1);
      killerScore.assists = (killerScore.assists || 0) + assistCount;
      const splitGold = Math.round(150 / Math.max(1, assistCount));
      assistCandidates.slice(0, assistCount).forEach(assister => {
        assister.assists = (assister.assists || 0) + 1;
        assister.goldEarned = (assister.goldEarned || 500) + splitGold;
        assister.goldCurrent = (assister.goldCurrent || 0) + splitGold;
        assister.damageDealt = (assister.damageDealt || 0) + Math.floor(lethalDmg * 0.35);
      });
    }

    const deathTimer = 15 + Math.floor(this.gameSeconds / 45);
    victim.respawnAt = this.gameSeconds + deathTimer;
    // Tempo de retorno da base para a rota após renascer (14 segundos)
    victim.travelingBackUntil = victim.respawnAt + 14;

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
      killer.goldCurrent = (killer.goldCurrent || 0) + bounty;
      victim.streak = 0;
    }
    killer.streak = (killer.streak || 0) + 1;

    this._updateIndividualLeadsAndMvp();
    this._syncTeamGold();

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
    const bJg = this.blueRosterState && this.blueRosterState.jungle;
    const rJg = this.redRosterState && this.redRosterState.jungle;
    const jgNick = bJg ? (bJg.proPlayer?.nick || bJg.name) : "Caçador";
    const rJgNick = rJg ? (rJg.proPlayer?.nick || rJg.name) : "Caçador Rival";

    // 1. ESCOLHA: INICIAR NO BUFF AZUL (Pathing para Bot)
    if (choiceId === "start_blue_buff") {
      this.blueJgStartChoice = "start_blue_buff";
      this.earlyGankTargetLane = "bot";
      this.blueJgTargetCampId = "blue_blue_buff";
      this._awardTeamGold("blue", 70);
      if (bJg) {
        bJg.goldEarned = (bJg.goldEarned || 500) + 70;
        bJg.goldCurrent = (bJg.goldCurrent || 0) + 70;
      }

      this.onEvent({
        type: "jungle_plan",
        side: "blue",
        icon: "🔵",
        text: `🔵 ROTA DEFINIDA: ${jgNick} inicia no Buff Azul! Rotação norte-sul traçada para gankar a Rota Inferior (BOT) aos 03:00!`,
        time: this._formatTime()
      });

      return {
        success: true,
        roll,
        probability: prob,
        title: "ROTA DEFINIDA: BLUE BUFF ➔ BOT LANE",
        subtitle: "Estratégia de Farm & Gank aos 03:00",
        text: `${jgNick} posicionou-se na Sentinela Azul com leash seguro. A rotação norte-sul garantirá mana abundante para limpar os campos e gankar a Rota Inferior (BOT) aos 03:00 em busca de First Blood e controle de dragão!`
      };
    }

    // 2. ESCOLHA: INICIAR NO BUFF VERMELHO (Pathing para Top)
    if (choiceId === "start_red_buff") {
      this.blueJgStartChoice = "start_red_buff";
      this.earlyGankTargetLane = "top";
      this.blueJgTargetCampId = "blue_red_buff";
      this._awardTeamGold("blue", 70);
      if (bJg) {
        bJg.goldEarned = (bJg.goldEarned || 500) + 70;
        bJg.goldCurrent = (bJg.goldCurrent || 0) + 70;
      }

      this.onEvent({
        type: "jungle_plan",
        side: "blue",
        icon: "🔴",
        text: `🔴 ROTA DEFINIDA: ${jgNick} inicia no Buff Vermelho! Rotação sul-norte traçada para gankar a Rota Superior (TOP) com Red Buff aos 03:00!`,
        time: this._formatTime()
      });

      return {
        success: true,
        roll,
        probability: prob,
        title: "ROTA DEFINIDA: RED BUFF ➔ TOP LANE",
        subtitle: "Estratégia de Pressão & Duelo aos 03:00",
        text: `${jgNick} posicionou-se na Rubrivira. Com o poder de lentidão e queimadura do Red Buff, seu caçador subirá o mapa para gankar a Rota Superior (TOP) aos 03:00 e pressionar o Top Laner adversário!`
      };
    }

    // 3. ESCOLHA: INVASÃO EM EQUIPE NÍVEL 1
    if (choiceId === "invade_team") {
      this.blueJgStartChoice = "invade_team";
      this.level1InvadeResolved = true;
      const targetSide = (this.redJgStartChoice === "start_red_buff") ? "red_red_buff" : "red_blue_buff";
      const targetCamp = this.jungleCamps.find(c => c.id === targetSide);

      if (isSuccess) {
        this._awardTeamGold("blue", 490);
        if (bJg) {
          bJg.kills = (bJg.kills || 0) + 1;
          bJg.goldEarned = (bJg.goldEarned || 500) + 400;
          bJg.goldCurrent = (bJg.goldCurrent || 0) + 400;
        }
        if (rJg) {
          rJg.deaths = (rJg.deaths || 0) + 1;
          rJg.alive = false;
          rJg.respawnAt = this.gameSeconds + 14;
          rJg.travelingBackUntil = rJg.respawnAt + 12;
        }
        this.blueScore.kills++;
        this.redScore.deaths = (this.redScore.deaths || 0) + 1;

        if (targetCamp) {
          targetCamp.status = "respawning";
          targetCamp.respawnsAt = this.gameSeconds + targetCamp.respawnDuration;
          targetCamp.clearedBy = "blue";
          if (bJg) {
            bJg.cs = (bJg.cs || 0) + targetCamp.cs;
            bJg.goldEarned = (bJg.goldEarned || 500) + targetCamp.gold;
            bJg.goldCurrent = (bJg.goldCurrent || 0) + targetCamp.gold;
          }
        }

        this.earlyGankTargetLane = (this.redJgStartChoice === "start_red_buff") ? "top" : "bot";
        this.lanePressure = Math.min(100, this.lanePressure + 22);

        this.onEvent({
          type: "first_blood",
          side: "blue",
          icon: "🩸",
          text: `💥 FIRST BLOOD NA INVASÃO! Seu time invadiu em bloco aos 00:50, eliminou ${rJgNick} (+400g) e roubou o ${targetCamp?.name || 'Buff'} inicial!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "INVASÃO PERFEITA: FIRST BLOOD & BUFF ROUBADO!",
          subtitle: `Sucesso Crítico (${prob}% chance)`,
          text: `A equipe avançou unida pelo rio! ${jgNick} acertou o controle de grupo em ${rJgNick}, garantindo o FIRST BLOOD (+400g) e limpando o ${targetCamp?.name || 'Buff'} inimigo (+90g). O caçador adversário foi mandado para a base!`
        };
      } else {
        this._awardTeamGold("red", 150);
        this.lanePressure = Math.max(-100, this.lanePressure - 15);
        this.earlyGankTargetLane = "bot";

        this.onEvent({
          type: "skirmish",
          side: "red",
          icon: "⚠️",
          text: `⚠️ INVASÃO REPELIDA! O CBLOL esperava a aproximação em sentinela e contra-atacou em bloco. Seu time recuou gastando feitiços defensivos!`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "INVASÃO DEFENDIDA PELO CBLOL",
          subtitle: `Falha na Emboscada (${prob}% chance)`,
          text: `O time adversário guardou as entradas da selva e repeliu a aproximação. Sua equipe foi forçada a queimar Flashes defensivos e recuar para a própria selva sem abates.`
        };
      }
    }

    // 4. ESCOLHA: ROUBO FURTIVO VERTICAL
    if (choiceId === "invade_vertical") {
      this.blueJgStartChoice = "invade_vertical";
      this.level1InvadeResolved = true;
      const stolenSide = (this.redJgStartChoice === "start_red_buff") ? "red_blue_buff" : "red_red_buff";
      const stolenCamp = this.jungleCamps.find(c => c.id === stolenSide);

      if (isSuccess) {
        if (stolenCamp) {
          stolenCamp.status = "respawning";
          stolenCamp.respawnsAt = this.gameSeconds + stolenCamp.respawnDuration;
          stolenCamp.clearedBy = "blue";
          if (bJg) {
            bJg.cs = (bJg.cs || 0) + stolenCamp.cs;
            bJg.goldEarned = (bJg.goldEarned || 500) + stolenCamp.gold + 90;
            bJg.goldCurrent = (bJg.goldCurrent || 0) + stolenCamp.gold + 90;
          }
        }
        this._awardTeamGold("blue", 180);
        this.earlyGankTargetLane = "mid";
        this.lanePressure = Math.min(100, this.lanePressure + 16);

        this.onEvent({
          type: "jungle_steal",
          side: "blue",
          icon: "🥷",
          text: `🥷 ROUBO FURTIVO VERTICAL! ${jgNick} entrou sorrateiramente na selva oposta e roubou o ${stolenCamp?.name || 'Buff'} do CBLOL sem ser visto (+180g)!`,
          time: this._formatTime()
        });

        return {
          success: true,
          roll,
          probability: prob,
          title: "DIVISÃO VERTICAL DE SELVA ESTABELECIDA",
          subtitle: `Infiltração Cirúrgica (${prob}% chance)`,
          text: `Enquanto ${rJgNick} limpava o outro lado do mapa, ${jgNick} executou o roubo do ${stolenCamp?.name || 'Buff'} adversário. O mapa foi dividido verticalmente, garantindo 3 buffs para o seu time!`
        };
      } else {
        this.earlyGankTargetLane = "bot";
        this._awardTeamGold("red", 90);
        this.lanePressure = Math.max(-100, this.lanePressure - 10);

        this.onEvent({
          type: "skirmish",
          side: "red",
          icon: "👁️",
          text: `👁️ ROUBO DETECTADO! Uma sentinela profunda do CBLOL flagrou ${jgNick} tentando o roubo vertical. O caçador recuou sob pressão.`,
          time: this._formatTime()
        });

        return {
          success: false,
          roll,
          probability: prob,
          title: "SENTINELA ADVERSÁRIA DETECTOU A INFILTRAÇÃO",
          subtitle: `Tentativa Frustrada (${prob}% chance)`,
          text: `O suporte adversário havia cravado uma sentinela no rio que flagrou o roubo a tempo. ${jgNick} precisou recuar antes de finalizar o monstro e voltou para a própria selva.`
        };
      }
    }

    // Compatibilidade com IDs legados
    if (choiceId === "defensive_vision") choiceId = "defensive_5point";
    if (choiceId === "invade" || choiceId === "invade_buff") choiceId = "invade_top";

    const blueAliveRoles = Object.keys(this.blueRosterState).filter(r => this.blueRosterState[r].alive);
    const redAliveRoles = Object.keys(this.redRosterState).filter(r => this.redRosterState[r].alive);
    const bTop = blueAliveRoles.includes("top") ? "top" : (blueAliveRoles[0] || "top");
    const bMid = blueAliveRoles.includes("mid") ? "mid" : (blueAliveRoles[0] || "mid");
    const bAdc = blueAliveRoles.includes("adc") ? "adc" : (blueAliveRoles[0] || "adc");
    const bSupp = blueAliveRoles.includes("support") ? "support" : (blueAliveRoles[0] || "support");

    const rTop = redAliveRoles.includes("top") ? "top" : (redAliveRoles[0] || "top");
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
      const bCarry = (this.blueMvpRole && this.blueRosterState[this.blueMvpRole]) ? this.blueRosterState[this.blueMvpRole] : bAdc;
      if (isSuccess) {
        if (bCarry && rTop) {
          this._recordKill("blue", "red", bCarry.role || "adc", "top", "Jogar pelo Carregador", `👑 CARREGADOR HABILITADO! ${bCarry.name} bateu com proteção total e abateu ${rTop.name}!`);
        }
        this._damageNextStructure("blue", this.redStructures, 30, false, 1.7);
        this._awardTeamGold("blue", 500);
        this.lanePressure = Math.min(100, this.lanePressure + 20);
        return {
          success: true, roll, probability: prob,
          title: "FORMAÇÃO 4-PROTECT-1 IMPECÁVEL!",
          subtitle: `Carregador Habilitado (${prob}% chance)`,
          text: `Disciplina exemplar! Sua equipe formou a barreira protetora perfeita em volta de ${bCarry?.name || 'seu carregador'}, permitindo que causasse dano contínuo e derretesse o CBLOL (+500g)!`
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

    if (choiceId === "jg_camp_top") {
      this.blueJungleCampLane = "top";
      this.setLaneFocus("top");
      if (isSuccess) {
        if (bTop && rTop) {
          this._recordKill("blue", "red", "top", "top", "Gank Focado no Top", `🌲 FOCO NO TOPO! ${bJg?.name || 'Caçador'} colapsou no topo e alimentou ${bTop.name}, abatendo ${rTop.name}!`);
        }
        this._awardTeamGold("blue", 400);
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this._damageNextStructure("blue", this.redStructures, 18, false, 1.3, "top");
        this.blueMvpRole = "top";
        if (bTop) bTop.isMvp = true;
        this.onEvent({
          type: "tactical_jg_plan",
          side: "blue",
          text: `🌲 PLANO DEFINIDO: Caçador fixou prioridade no Topo! ${bTop?.name || 'Top'} passa a receber assistência contínua e foco para carregar!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "PLANO NO TOPO EXECUTADO COM SUCESSO!",
          subtitle: `Foco em ${bTop?.name || 'Top Laner'} Estabelecido (${prob}% chance)`,
          text: `Seu caçador aplicou o primeiro gank com precisão, conquistou o abate para ${bTop?.name || 'Top Laner'} (+400g) e cravou o topo como rota prioritária!`
        };
      } else {
        this.blueMvpRole = "top";
        if (bTop) bTop.isMvp = true;
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 15);
        this.onEvent({
          type: "tactical_jg_plan",
          side: "blue",
          text: `🌲 PLANO DEFINIDO: Caçador iniciou foco no Topo, forçando o flash de ${rTop?.name || 'Top Rival'}.`,
          time: this._formatTime()
        });
        return {
          success: false, roll, probability: prob,
          title: "PLANO INICIADO NO TOPO",
          subtitle: `Flash Rival Queimado (${prob}% chance)`,
          text: `${rTop?.name || 'O rival'} queimou o feitiço de fuga sob a torre. A rota continuará sob foco e vigilância do seu caçador!`
        };
      }
    }

    if (choiceId === "jg_camp_mid") {
      this.blueJungleCampLane = "mid";
      this.setLaneFocus("mid");
      if (isSuccess) {
        if (bMid && rMid) {
          this._recordKill("blue", "red", "mid", "mid", "Gank Focado no Mid", `🌲 CONTROLE CENTRAL! ${bJg?.name || 'Caçador'} emboscou o meio e habilitou ${bMid.name}, abatendo ${rMid.name}!`);
        }
        this._awardTeamGold("blue", 400);
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 12);
        this.blueMvpRole = "mid";
        if (bMid) bMid.isMvp = true;
        this.onEvent({
          type: "tactical_jg_plan",
          side: "blue",
          text: `🌲 PLANO DEFINIDO: Caçador estabeleceu eixo no Meio! ${bMid?.name || 'Mid'} recebe controle de rio e rotações prioritárias!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "CONTROLE DA ROTA CENTRAL CONQUISTADO!",
          subtitle: `Foco em ${bMid?.name || 'Mid Laner'} Estabelecido (${prob}% chance)`,
          text: `Gank letal no mid! ${bMid?.name || 'Mid Laner'} recebeu o abate (+400g) e agora ditará as rotações para ambos os lados do mapa!`
        };
      } else {
        this.blueMvpRole = "mid";
        if (bMid) bMid.isMvp = true;
        this.lanePressures.mid = Math.min(100, (this.lanePressures.mid || 0) + 15);
        this.onEvent({
          type: "tactical_jg_plan",
          side: "blue",
          text: `🌲 PLANO DEFINIDO: Caçador colocou pressão no Meio e assumiu o controle das sentinelas do rio.`,
          time: this._formatTime()
        });
        return {
          success: false, roll, probability: prob,
          title: "PRESSÃO NO MID ESTABELECIDA",
          subtitle: `Rio Dominado (${prob}% chance)`,
          text: `${rMid?.name || 'O mid rival'} recuou assustado e perdeu a visão do rio. ${bMid?.name || 'Mid Laner'} assume a rédea dos movimentos!`
        };
      }
    }

    if (choiceId === "jg_camp_bot") {
      this.blueJungleCampLane = "bot";
      this.setLaneFocus("bot");
      if (isSuccess) {
        if (bAdc && rAdc) {
          this._recordKill("blue", "red", "adc", "adc", "Gank Focado no Bot", `🏹 TRIÂNGULO NO BOT! ${bJg?.name || 'Caçador'} colapsou 3v2 na rota inferior e concedeu abates a ${bAdc.name}!`);
        }
        this._awardTeamGold("blue", 500);
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 40);
        this.lanePressure = Math.min(100, this.lanePressure + 15);
        this._damageNextStructure("blue", this.redStructures, 20, false, 1.3, "bot");
        this.blueMvpRole = "adc";
        if (bAdc) bAdc.isMvp = true;
        this.onEvent({
          type: "tactical_jg_plan",
          side: "blue",
          text: `🌲 PLANO DEFINIDO: Foco total na Bot Lane! ${bAdc?.name || 'Atirador'} recebe toda a economia para ser o Hiper-Carregador!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "BOT LANE ALIMENTADA COM SUCESSO!",
          subtitle: `Foco em ${bAdc?.name || 'Atirador'} Estabelecido (${prob}% chance)`,
          text: `Colapso perfeito 3v2! ${bAdc?.name || 'Atirador'} garantiu abates e barricadas (+500g) e ruma ao pico de poder do late game!`
        };
      } else {
        this.blueMvpRole = "adc";
        if (bAdc) bAdc.isMvp = true;
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 15);
        this.onEvent({
          type: "tactical_jg_plan",
          side: "blue",
          text: `🌲 PLANO DEFINIDO: Caçador protegeu a Bot Lane e assegurou prioridade no covil do Dragão.`,
          time: this._formatTime()
        });
        return {
          success: false, roll, probability: prob,
          title: "BLINDAGEM NO BOT INICIADA",
          subtitle: `Linha Segura (${prob}% chance)`,
          text: `A bot lane rival recuou defensiva. Sua dupla coletou as ondas com tranquilidade e visão assegurada!`
        };
      }
    }

    // 9. Macro de Rota Lateral Pós-15m (Top Wave Clear & Rotações 5v4)
    if (choiceId === "top_macro_rotate_5v4") {
      this.setLaneFocus("mid");
      if (isSuccess) {
        const victim = rAdc?.alive ? rAdc : (rMid?.alive ? rMid : rTop);
        if (bTop && victim) {
          this._recordKill("blue", "red", "top", victim.role || "adc", "Flanco 5v4 de Push Rápido", `⚡ TEMPO DE MAPA BRILHANTE! ${bTop.name} limpou a rota superior velozmente, desceu flanqueando no rio e explodiu ${victim.name} em luta 5v4!`);
        }
        this._awardTeamGold("blue", 550);
        this.lanePressure = Math.min(100, this.lanePressure + 25);
        this._applyTeamBuff("blue", { id: "top_tempo_5v4", name: "Tempo de Rotação 5v4", icon: "🌊", bonusCombat: 10, duration: 180 });
        this.onEvent({
          type: "skirmish",
          side: "blue",
          text: `🌊 VANTAGEM DE PUSH CONVERTIDA: ${bTop?.name || 'Top'} usou a vantagem de avanço de rota, forçou 5v4 no rio e massacrou o CBLOL (+550g)!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "ROTAÇÃO 5v4 NO RIO DEVASTADORA!",
          subtitle: `Tempo de Mapa Perfeito (+550g) (${prob}% chance)`,
          text: `Aula magna de macro! Enquanto ${rTop?.name || 'Top Rival'} limpava a onda sob a torre, ${bTop?.name || 'Top Laner'} apareceu pelo flanco do rio e dizimou o time adversário em superioridade 5v4!`
        };
      } else {
        this.onEvent({
          type: "skirmish",
          side: "neutral",
          text: `⚠️ A rotação 5v4 no rio foi avistada e o rival conseguiu recuar sem baixas graves.`,
          time: this._formatTime()
        });
        return {
          success: false, roll, probability: prob,
          title: "ROTAÇÃO CONTIDA",
          subtitle: `CBLOL Evitou o 5v4 (${prob}% chance)`,
          text: `O adversário leu a movimentação do Top Laner pelas sentinelas e recuou antes do confronto estourar.`
        };
      }
    }

    if (choiceId === "top_macro_shove_t2") {
      this.setLaneFocus("top");
      if (isSuccess) {
        this._damageNextStructure("blue", this.redStructures, 40, false, 2.0, "top");
        this._awardTeamGold("blue", 600);
        if (bTop) {
          bTop.goldEarned = (bTop.goldEarned || 500) + 350;
          bTop.goldCurrent = (bTop.goldCurrent || 0) + 350;
          bTop.cs = (bTop.cs || 0) + 18;
        }
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 45);
        this.lanePressure = Math.min(100, this.lanePressure + 18);
        this.onEvent({
          type: "split_push",
          side: "blue",
          text: `🏰 CERCO NA T2 DO TOPO! ${bTop?.name || 'Top'} puniu a lentidão rival de limpeza e demoliu a torre T2 lateral (+600g)!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "TORRE T2 DO TOPO DEMOLIDA!",
          subtitle: `Split Push & Ouro Lateral (+600g) (${prob}% chance)`,
          text: `Pressão colossal! ${bTop?.name || 'Top Laner'} impôs a superioridade de avanço de rota, pulverizou a torre Tier 2 e embolsou montanha de ouro individual!`
        };
      } else {
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 15);
        return {
          success: false, roll, probability: prob,
          title: "CERCO INTERROMPIDO",
          subtitle: `Cobertura Rival (${prob}% chance)`,
          text: `O CBLOL deslocou a cobertura a tempo para defender a T2, forçando o recuo cauteloso.`
        };
      }
    }

    if (choiceId === "top_macro_freeze_deny") {
      this.setLaneFocus("top");
      if (isSuccess) {
        if (bTop) {
          bTop.goldEarned = (bTop.goldEarned || 500) + 300;
          bTop.goldCurrent = (bTop.goldCurrent || 0) + 300;
          bTop.cs = (bTop.cs || 0) + 16;
        }
        this._awardTeamGold("blue", 250);
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 20);
        this.onEvent({
          type: "wave_freeze",
          side: "blue",
          text: `❄️ CONGELAMENTO LATERAL: ${bTop?.name || 'Top'} congelou a onda e negou 2 levas completas de tropas a ${rTop?.name || 'Top Rival'}!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "CONTROLE DE ONDA LATERAL CIRÚRGICO!",
          subtitle: `Negação de Tropas (+250g) (${prob}% chance)`,
          text: `Economia sufocada! ${bTop?.name || 'Top Laner'} congelou a rota perfeitamente, deixando ${rTop?.name || 'Top Rival'} sem recursos enquanto acumulava vantagem de CS e itens!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "ONDA RESETADA",
          subtitle: `Habilidades de Longo Alcance (${prob}% chance)`,
          text: `${rTop?.name || 'O rival'} utilizou habilidades de longa distância para quebrar o congelamento e resetar as tropas.`
        };
      }
    }

    if (choiceId === "top_macro_defend_t2") {
      this.setLaneFocus("top");
      if (isSuccess) {
        if (bTop) {
          bTop.goldEarned = (bTop.goldEarned || 500) + 250;
          bTop.goldCurrent = (bTop.goldCurrent || 0) + 250;
          bTop.cs = (bTop.cs || 0) + 14;
        }
        this.lanePressures.top = 10;
        this.lanePressure = Math.round((this.lanePressures.top + this.lanePressures.mid + this.lanePressures.bot) / 3);
        this.onEvent({
          type: "turret_defense",
          side: "blue",
          text: `🛡️ DEFESA DA T2 IMPECÁVEL! ${bTop?.name || 'Top'} limpou a super-onda rival e preservou a estrutura intacta!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "TORRE T2 SALVA COM SUCESSO!",
          subtitle: `Defesa de Estrutura (+250g) (${prob}% chance)`,
          text: `Paciência e sangue frio! ${bTop?.name || 'Top Laner'} coletou as tropas sob a torre sem se afobar, salvou a integridade da estrutura e garantiu o ouro para fechar o próximo item!`
        };
      } else {
        this._damageNextStructure("red", this.blueStructures, 15, false, 1.2, "top");
        return {
          success: false, roll, probability: prob,
          title: "DANO RESIDUAL NA T2",
          subtitle: `Pressão Rival (${prob}% chance)`,
          text: `${rTop?.name || 'O adversário'} conseguiu lascar alguns golpes na torre T2 antes da onda de tropas ser completamente limpa.`
        };
      }
    }

    if (choiceId === "top_macro_gank_collapse") {
      this.setLaneFocus("top");
      if (isSuccess) {
        if (bTop && rTop) {
          this._recordKill("blue", "red", "top", "top", "Colapso no Splitter", `🌲 EMBOSCADA 2v1 NO TOPO! ${bTop.name} e ${bJg?.name || 'Caçador'} fecharam a pinça e executaram ${rTop.name} overextended!`);
        }
        this._awardTeamGold("blue", 500);
        this.lanePressures.top = Math.min(100, (this.lanePressures.top || 0) + 35);
        this.lanePressure = Math.min(100, this.lanePressure + 15);
        this.onEvent({
          type: "skirmish",
          side: "blue",
          text: `🌲 SHUTDOWN NO SPLITTER RIVAL! Colapso 2v1 puniu ${rTop?.name || 'Top Rival'} e destravou a rota superior (+500g)!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "COLAPSO 2v1 LETAL NO TOPO!",
          subtitle: `Shutdown no Avanço Rival (+500g) (${prob}% chance)`,
          text: `Armadilha impecável! ${bTop?.name || 'Top Laner'} e ${bJg?.name || 'Caçador'} fecharam o flanco no top rival ganancioso, conquistaram o shutdown e aliviaram toda a pressão lateral!`
        };
      } else {
        this.lanePressures.top = Math.max(-100, (this.lanePressures.top || 0) - 20);
        return {
          success: false, roll, probability: prob,
          title: "EMBOSCADA DESVIADA",
          subtitle: `Fuga Rival (${prob}% chance)`,
          text: `${rTop?.name || 'O rival'} pressentiu o perigo, saltou a parede com habilidade de mobilidade e escapou com vida.`
        };
      }
    }

    if (choiceId === "top_macro_trade_crossmap") {
      this.setLaneFocus("bot");
      if (isSuccess) {
        this._damageNextStructure("blue", this.redStructures, 35, false, 1.8, "bot");
        this._awardTeamGold("blue", 550);
        this.lanePressures.bot = Math.min(100, (this.lanePressures.bot || 0) + 40);
        this.lanePressure = Math.min(100, this.lanePressure + 16);
        this.onEvent({
          type: "crossmap_play",
          side: "blue",
          text: `🏹 TROCA DE MAPA DE ALTO NÍVEL! Enquanto o rival batia no topo, seu time derreteu a torre inferior e faturou +550g!`,
          time: this._formatTime()
        });
        return {
          success: true, roll, probability: prob,
          title: "JOGADA CRUZADA DE SUCESSO!",
          subtitle: `Troca de Torres Opostas (+550g) (${prob}% chance)`,
          text: `Inteligência estratégica! Em vez de correr atrás do prejuízo no topo, seu quarteto acelerou a rota inferior, demoliu a estrutura rival e equilibrou a corrida do mapa!`
        };
      } else {
        return {
          success: false, roll, probability: prob,
          title: "TROCA INCOMPLETA",
          subtitle: `Defesa Rival Rápida (${prob}% chance)`,
          text: `O adversário retornou a tempo de defender a rota inferior, limitando o avanço cruzado.`
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

      const matchup = this._getLaneMatchup("top");
      const isCamped = (this.redJungleCampLane === "top");
      let laneTacticBonus = 0;
      let rCampBonus = (isCamped && rJg && rJg.alive) ? 24 : 0;
      const matchupPowerMod = Math.round((matchup ? matchup.score : 0) * 8);

      if (this.playerTactics === "aggressive") {
        if ((matchup && matchup.score < -0.5) || isCamped) {
          laneTacticBonus = -16;
          rCampBonus += 12;
        } else if (matchup && matchup.score > 0.5 && !isCamped) {
          laneTacticBonus = 12;
        }
      } else if (this.playerTactics === "defense") {
        if ((matchup && matchup.score < 0) || isCamped) {
          laneTacticBonus = 10;
        }
      }

      const bPower = (bTop.stats?.combat || 75) + (bTop.items?.length || 0) * 8 + laneTacticBonus + matchupPowerMod + bGankBonus + (Math.random() * 20);
      const rPower = (rTop.stats?.combat || 75) + (rTop.items?.length || 0) * 8 + rGankBonus + rCampBonus + (Math.random() * 20);
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
        if (isCamped && this.playerTactics === "aggressive" && rJg && rJg.alive) {
          this._recordKill("red", "blue", "jungle", "top", "Gank no Alvo Marcado", `⚠️ EMBOSCADA PREVISTA! O caçador adversário (${rJg.name}) acampava no Topo e puniu a agressividade cega de ${bTop.name}!`);
        } else if (matchup && matchup.score < -0.5 && this.playerTactics === "aggressive") {
          this._recordKill("red", "blue", "top", "top", "Solo Kill por Matchup", `⚠️ TROCA FORÇADA FATAL! ${bTop.name} tentou forçar trocas em desvantagem de matchup contra ${rTop.name} e foi solado!`);
        } else if (blueOverextended && rJg && rJg.alive) {
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

      const matchup = this._getLaneMatchup("mid");
      const isCamped = (this.redJungleCampLane === "mid");
      let laneTacticBonus = 0;
      let rCampBonus = (isCamped && rJg && rJg.alive) ? 24 : 0;
      const matchupPowerMod = Math.round((matchup ? matchup.score : 0) * 8);

      if (this.playerTactics === "aggressive") {
        if ((matchup && matchup.score < -0.5) || isCamped) {
          laneTacticBonus = -16;
          rCampBonus += 12;
        } else if (matchup && matchup.score > 0.5 && !isCamped) {
          laneTacticBonus = 12;
        }
      } else if (this.playerTactics === "defense") {
        if ((matchup && matchup.score < 0) || isCamped) {
          laneTacticBonus = 10;
        }
      }

      const bPower = (bMid.stats?.combat || 75) + (bMid.items?.length || 0) * 8 + laneTacticBonus + matchupPowerMod + bGankBonus + (Math.random() * 20);
      const rPower = (rMid.stats?.combat || 75) + (rMid.items?.length || 0) * 8 + rGankBonus + rCampBonus + (Math.random() * 20);
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
        if (isCamped && this.playerTactics === "aggressive" && rJg && rJg.alive) {
          this._recordKill("red", "blue", "jungle", "mid", "Gank no Alvo Marcado", `⚠️ EMBOSCADA PREVISTA! O caçador adversário (${rJg.name}) acampava no Mid e puniu a agressividade forçada de ${bMid.name}!`);
        } else if (matchup && matchup.score < -0.5 && this.playerTactics === "aggressive") {
          this._recordKill("red", "blue", "mid", "mid", "Solo Kill por Matchup", `⚠️ TROCA FORÇADA FATAL! ${bMid.name} tentou forçar trocas agressivas contra ${rMid.name} em desvantagem de matchup e foi explodido!`);
        } else if (blueOverextended && rJg && rJg.alive) {
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

      const matchup = this._getLaneMatchup("bot");
      const isCamped = (this.redJungleCampLane === "bot");
      let laneTacticBonus = 0;
      let rCampBonus = (isCamped && rJg && rJg.alive) ? 24 : 0;
      const matchupPowerMod = Math.round((matchup ? matchup.score : 0) * 8);

      if (this.playerTactics === "aggressive") {
        if ((matchup && matchup.score < -0.5) || isCamped) {
          laneTacticBonus = -16;
          rCampBonus += 12;
        } else if (matchup && matchup.score > 0.5 && !isCamped) {
          laneTacticBonus = 12;
        }
      } else if (this.playerTactics === "defense") {
        if ((matchup && matchup.score < 0) || isCamped) {
          laneTacticBonus = 10;
        }
      }

      const bPower = (bAdc.stats?.combat || 75) + (bSuppAlive ? (bSupp.stats?.combat || 70) * 0.4 : 0) + (bAdc.items?.length || 0) * 8 + laneTacticBonus + matchupPowerMod + bGankBonus + (Math.random() * 20);
      const rPower = (rAdc.stats?.combat || 75) + (rSuppAlive ? (rSupp.stats?.combat || 70) * 0.4 : 0) + (rAdc.items?.length || 0) * 8 + rGankBonus + rCampBonus + (Math.random() * 20);
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
        if (isCamped && this.playerTactics === "aggressive" && rJg && rJg.alive) {
          this._recordKill("red", "blue", "jungle", victimRole, "Gank no Alvo Marcado", `⚠️ EMBOSCADA PREVISTA! O caçador adversário (${rJg.name}) acampava na Bot Lane e puniu o avanço agressivo eliminando ${victimName}!`);
        } else if (matchup && matchup.score < -0.5 && this.playerTactics === "aggressive") {
          this._recordKill("red", "blue", "adc", victimRole, "Punição de Matchup no Bot", `⚠️ PRESSÃO AGRESSIVA PUNIDA! A bot lane tentou forçar trocas em desvantagem de matchup e ${rAdc.name} garantiu a eliminação de ${victimName}!`);
        } else if (blueOverextended && rJg && rJg.alive) {
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

  _getLaneClashCoords(lane) {
    const LANE_WAYPOINTS = {
      top: [
        { x: 154, y: 464 }, // blue_t3
        { x: 198, y: 389 }, // blue_t2
        { x: 216, y: 208 }, // blue_t1
        { x: 268, y: 136 }, // river
        { x: 338, y: 84 },  // red_t1
        { x: 525, y: 116 }, // red_t2
        { x: 660, y: 92 }   // red_t3
      ],
      mid: [
        { x: 322, y: 524 }, // blue_t3
        { x: 398, y: 460 }, // blue_t2
        { x: 430, y: 395 }, // blue_t1
        { x: 514, y: 344 }, // river
        { x: 597, y: 292 }, // red_t1
        { x: 626, y: 240 }, // red_t2
        { x: 692, y: 190 }  // red_t3
      ],
      bot: [
        { x: 356, y: 654 }, // blue_t3
        { x: 484, y: 636 }, // blue_t2
        { x: 690, y: 656 }, // blue_t1
        { x: 814, y: 610 }, // river / alcove curve
        { x: 864, y: 484 }, // red_t1
        { x: 804, y: 328 }, // red_t2
        { x: 836, y: 222 }  // red_t3
      ]
    };

    const waypoints = LANE_WAYPOINTS[lane] || LANE_WAYPOINTS.mid;
    const isAlive = (structures, structId) => {
      if (!structures || !Array.isArray(structures)) return true;
      const s = structures.find(st => st.id === structId);
      return s ? !s.destroyed : true;
    };

    const blueT1Alive = isAlive(this.blueStructures, `${lane}_t1`);
    const blueT2Alive = isAlive(this.blueStructures, `${lane}_t2`);
    const blueT3Alive = isAlive(this.blueStructures, `${lane}_t3`);

    const redT1Alive = isAlive(this.redStructures, `${lane}_t1`);
    const redT2Alive = isAlive(this.redStructures, `${lane}_t2`);
    const redT3Alive = isAlive(this.redStructures, `${lane}_t3`);

    let maxIdx = redT1Alive ? 3.85 : (redT2Alive ? 4.85 : (redT3Alive ? 5.85 : 6.0));
    let minIdx = blueT1Alive ? 2.15 : (blueT2Alive ? 1.15 : (blueT3Alive ? 0.15 : 0.0));

    const p = Math.max(-100, Math.min(100, (this.lanePressures && this.lanePressures[lane]) || 0));
    const centerIdx = 3.0;

    let pos = centerIdx;
    if (p >= 0) {
      pos = centerIdx + (p / 100) * (maxIdx - centerIdx);
    } else {
      pos = centerIdx - (-p / 100) * (centerIdx - minIdx);
    }

    if (lane === "bot" && pos >= 2.0 && pos <= 4.0) {
      const t = (pos - 2.0) / 2.0;
      const x = (1 - t) * (1 - t) * 690 + 2 * (1 - t) * t * 850 + t * t * 864;
      const y = (1 - t) * (1 - t) * 656 + 2 * (1 - t) * t * 650 + t * t * 484;
      return { x: Math.round(x), y: Math.round(y) };
    }

    const baseIdx = Math.max(0, Math.min(waypoints.length - 2, Math.floor(pos)));
    const frac = Math.max(0, Math.min(1, pos - baseIdx));
    const pA = waypoints[baseIdx];
    const pB = waypoints[baseIdx + 1];

    return {
      x: Math.round(pA.x + (pB.x - pA.x) * frac),
      y: Math.round(pA.y + (pB.y - pA.y) * frac)
    };
  }

  _updateWards() {
    this.wards = (this.wards || []).filter(w => w.expiresAt > this.gameSeconds);

    if (this.gameSeconds >= this.nextWardDropAt) {
      this.nextWardDropAt = this.gameSeconds + 60 + Math.floor(Math.random() * 30);

      const blueWardSpots = [
        { name: "Arbusto Rio Top", x: 260, y: 190 },
        { name: "Entrada do Barão", x: 380, y: 260 },
        { name: "Entrada do Dragão", x: 610, y: 470 },
        { name: "Arbusto Rio Bot", x: 750, y: 530 },
        { name: "Tribush Inferior", x: 790, y: 630 },
        { name: "Entrada Blue Inimigo", x: 420, y: 320 },
        { name: "Pixel Mid Rio", x: 550, y: 380 }
      ];

      const redWardSpots = [
        { name: "Arbusto Rio Top Red", x: 320, y: 150 },
        { name: "Entrada Dragão Red", x: 670, y: 530 },
        { name: "Entrada Barão Red", x: 390, y: 200 },
        { name: "Arbusto Rio Bot Red", x: 810, y: 490 }
      ];

      const blueAliveSupOrJg = (this.blueRosterState?.support?.alive) || (this.blueRosterState?.jungle?.alive);
      if (blueAliveSupOrJg && Math.random() < 0.85) {
        const availableSpots = blueWardSpots.filter(s => !this.wards.some(w => w.team === "blue" && Math.hypot(w.x - s.x, w.y - s.y) < 50));
        if (availableSpots.length > 0) {
          const spot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
          const isControl = Math.random() < 0.25;
          this.wards.push({
            id: `ward_blue_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            team: "blue",
            name: spot.name,
            x: spot.x,
            y: spot.y,
            type: isControl ? "pink" : "yellow",
            expiresAt: this.gameSeconds + (isControl ? 240 : 120),
            hp: isControl ? 4 : 3,
            range: isControl ? 110 : 95
          });
        }
      }

      if (Math.random() < 0.80) {
        const availableRedSpots = redWardSpots.filter(s => !this.wards.some(w => w.team === "red" && Math.hypot(w.x - s.x, w.y - s.y) < 50));
        if (availableRedSpots.length > 0) {
          const spot = availableRedSpots[Math.floor(Math.random() * availableRedSpots.length)];
          const isControl = Math.random() < 0.25;
          this.wards.push({
            id: `ward_red_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            team: "red",
            name: spot.name,
            x: spot.x,
            y: spot.y,
            type: isControl ? "pink" : "yellow",
            expiresAt: this.gameSeconds + (isControl ? 240 : 120),
            hp: isControl ? 4 : 3,
            range: isControl ? 110 : 95
          });
        }
      }
    }
  }

  _updateJungleCamps(deltaSeconds = 2) {
    if (!this.jungleCamps || this.jungleCamps.length === 0) return;

    // 1. Atualização de Renascimento / Surgimento dos Acampamentos Oficiais
    this.jungleCamps.forEach(camp => {
      if ((camp.status === "unspawned" || camp.status === "respawning") && this.gameSeconds >= camp.respawnsAt) {
        camp.status = "alive";
        camp.clearingBy = null;
        camp.clearingProgress = 0;
      }
    });

    // 2. Caçador Aliado (Blue Jungler)
    const bJg = this.blueRosterState && this.blueRosterState.jungle;
    if (bJg && bJg.alive && this.gameSeconds >= (bJg.travelingBackUntil || 0)) {
      if (this.blueJungleCampLane) {
        this.blueJgTargetCampId = null;
      } else if (this.gameSeconds < 90) {
        if (this.blueJgStartChoice === "start_red_buff") {
          this.blueJgTargetCampId = "blue_red_buff";
        } else if (this.blueJgStartChoice === "invade_vertical") {
          this.blueJgTargetCampId = (this.redJgStartChoice === "start_red_buff") ? "red_blue_buff" : "red_red_buff";
        } else if (this.blueJgStartChoice === "invade_team") {
          this.blueJgTargetCampId = (this.redJgStartChoice === "start_red_buff") ? "red_red_buff" : "red_blue_buff";
        } else {
          this.blueJgTargetCampId = "blue_blue_buff";
        }
      } else if (this.gameSeconds >= 165 && this.gameSeconds <= 200 && this.earlyGankTargetLane) {
        this.blueJgTargetCampId = null;
      } else {
        let bCamp = this.jungleCamps.find(c => c.id === this.blueJgTargetCampId);
        if (!bCamp || bCamp.status === "respawning" || bCamp.status === "unspawned" || (bCamp.clearingBy && bCamp.clearingBy !== "blue")) {
          const aliveCamps = this.jungleCamps.filter(c => c.status === "alive" || (c.status === "clearing" && c.clearingBy === "blue"));
          const blueCamps = aliveCamps.filter(c => c.side === "blue");
          const scuttles = aliveCamps.filter(c => c.side === "neutral");
          const redInvade = (this.gameSeconds >= 600) ? aliveCamps.filter(c => c.side === "red") : [];

          const candidates = blueCamps.length > 0 ? blueCamps : (scuttles.length > 0 ? scuttles : redInvade);
          if (candidates.length > 0) {
            candidates.sort((a, b) => {
              const dA = Math.hypot((bJg.x || 200) - a.x, (bJg.y || 600) - a.y);
              const dB = Math.hypot((bJg.x || 200) - b.x, (bJg.y || 600) - b.y);
              return dA - dB;
            });
            bCamp = candidates[0];
            this.blueJgTargetCampId = bCamp.id;
          } else {
            this.blueJgTargetCampId = null;
            bCamp = null;
          }
        }

        if (bCamp && (bCamp.status === "alive" || bCamp.status === "clearing")) {
          const dist = Math.hypot((bJg.x || 0) - bCamp.x, (bJg.y || 0) - bCamp.y);
          if (dist <= 45) {
            bCamp.status = "clearing";
            bCamp.clearingBy = "blue";
            bCamp.clearingProgress = (bCamp.clearingProgress || 0) + deltaSeconds;
            bJg.statusText = `Farmando ${bCamp.name}`;

            if (bCamp.clearingProgress >= (bCamp.clearingDuration || 4)) {
              bCamp.status = "respawning";
              bCamp.respawnsAt = this.gameSeconds + bCamp.respawnDuration;
              bCamp.clearedBy = "blue";
              bCamp.clearingBy = null;
              bCamp.clearingProgress = 0;
              this.blueJgTargetCampId = null;

              bJg.goldEarned = (bJg.goldEarned || 500) + bCamp.gold;
              bJg.goldCurrent = (bJg.goldCurrent || 0) + bCamp.gold;
              bJg.cs = (bJg.cs || 0) + bCamp.cs;
              this.blueScore.gold += bCamp.gold;

              if (bCamp.campType === "buff" || bCamp.campType === "scuttle") {
                const jgNick = bJg.proPlayer?.nick || bJg.name;
                this.onEvent({
                  type: "jungle",
                  side: "blue",
                  icon: bCamp.icon,
                  text: `🌲 ${jgNick} abateu ${bCamp.name} (+${bCamp.gold}g, +${bCamp.cs} CS)!`,
                  time: this._formatTime()
                });
              }
            }
          }
        }
      }
    }

    // 3. Caçador Inimigo (Red Jungler)
    const rJg = this.redRosterState && this.redRosterState.jungle;
    if (rJg && rJg.alive && this.gameSeconds >= (rJg.travelingBackUntil || 0)) {
      if (this.redJungleCampLane) {
        this.redJgTargetCampId = null;
      } else if (this.gameSeconds < 90) {
        this.redJgTargetCampId = (this.redJgStartChoice === "start_blue_buff") ? "red_blue_buff" : "red_red_buff";
      } else if (this.gameSeconds >= 165 && this.gameSeconds <= 200 && this.redEarlyGankTargetLane) {
        this.redJgTargetCampId = null;
      } else {
        let rCamp = this.jungleCamps.find(c => c.id === this.redJgTargetCampId);
        if (!rCamp || rCamp.status === "respawning" || rCamp.status === "unspawned" || (rCamp.clearingBy && rCamp.clearingBy !== "red")) {
          const aliveCamps = this.jungleCamps.filter(c => c.status === "alive" || (c.status === "clearing" && c.clearingBy === "red"));
          const redCamps = aliveCamps.filter(c => c.side === "red");
          const scuttles = aliveCamps.filter(c => c.side === "neutral");
          const blueInvade = (this.gameSeconds >= 600) ? aliveCamps.filter(c => c.side === "blue") : [];

          const candidates = redCamps.length > 0 ? redCamps : (scuttles.length > 0 ? scuttles : blueInvade);
          if (candidates.length > 0) {
            candidates.sort((a, b) => {
              const dA = Math.hypot((rJg.x || 800) - a.x, (rJg.y || 150) - a.y);
              const dB = Math.hypot((rJg.x || 800) - b.x, (rJg.y || 150) - b.y);
              return dA - dB;
            });
            rCamp = candidates[0];
            this.redJgTargetCampId = rCamp.id;
          } else {
            this.redJgTargetCampId = null;
            rCamp = null;
          }
        }

        if (rCamp && (rCamp.status === "alive" || rCamp.status === "clearing")) {
          const dist = Math.hypot((rJg.x || 0) - rCamp.x, (rJg.y || 0) - rCamp.y);
          if (dist <= 45) {
            rCamp.status = "clearing";
            rCamp.clearingBy = "red";
            rCamp.clearingProgress = (rCamp.clearingProgress || 0) + deltaSeconds;
            rJg.statusText = `Farmando ${rCamp.name}`;

            if (rCamp.clearingProgress >= (rCamp.clearingDuration || 4)) {
              rCamp.status = "respawning";
              rCamp.respawnsAt = this.gameSeconds + rCamp.respawnDuration;
              rCamp.clearedBy = "red";
              rCamp.clearingBy = null;
              rCamp.clearingProgress = 0;
              this.redJgTargetCampId = null;

              rJg.goldEarned = (rJg.goldEarned || 500) + rCamp.gold;
              rJg.goldCurrent = (rJg.goldCurrent || 0) + rCamp.gold;
              rJg.cs = (rJg.cs || 0) + rCamp.cs;
              this.redScore.gold += rCamp.gold;

              if (rCamp.campType === "buff" || rCamp.campType === "scuttle") {
                const jgNick = rJg.proPlayer?.nick || rJg.name;
                this.onEvent({
                  type: "jungle",
                  side: "red",
                  icon: rCamp.icon,
                  text: `🔴 ${jgNick} abateu ${rCamp.name} (+${rCamp.gold}g, +${rCamp.cs} CS)!`,
                  time: this._formatTime()
                });
              }
            }
          }
        }
      }
    }
  }

  _checkEarly3MinGank() {
    if (this.earlyGankExecuted || this.gameSeconds < 180 || this.gameSeconds > 210) return;
    this.earlyGankExecuted = true;

    const bJg = this.blueRosterState && this.blueRosterState.jungle;
    const rJg = this.redRosterState && this.redRosterState.jungle;
    const bJgNick = bJg ? (bJg.proPlayer?.nick || bJg.name) : "Caçador";
    const rJgNick = rJg ? (rJg.proPlayer?.nick || rJg.name) : "Caçador Rival";

    const targetLane = this.earlyGankTargetLane || "bot";
    const redTargetLane = this.redEarlyGankTargetLane || (this.redJgStartChoice === "start_red_buff" ? "top" : "bot");

    const laneNames = { top: "Rota Superior (TOP)", mid: "Rota do Meio (MID)", bot: "Rota Inferior (BOT)" };
    const laneName = laneNames[targetLane] || targetLane;

    // Cenário 1: CONTRA-GANK (Ambos os caçadores gankam a mesma rota aos 03:00)
    if (targetLane === redTargetLane) {
      const bCombat = (this.blueTeam.stats?.combat || 50) + (Math.random() * 25);
      const rCombat = (this.redTeam.stats?.combat || 50) + (Math.random() * 25);
      const isBlueWin = bCombat >= rCombat;

      if (isBlueWin) {
        this._awardTeamGold("blue", 450);
        if (bJg) {
          bJg.kills = (bJg.kills || 0) + 1;
          bJg.goldEarned = (bJg.goldEarned || 500) + 300;
          bJg.goldCurrent = (bJg.goldCurrent || 0) + 300;
        }
        if (rJg) {
          rJg.deaths = (rJg.deaths || 0) + 1;
          rJg.alive = false;
          rJg.respawnAt = this.gameSeconds + 16;
          rJg.travelingBackUntil = rJg.respawnAt + 14;
        }
        this.blueScore.kills++;
        this.redScore.deaths = (this.redScore.deaths || 0) + 1;
        if (this.lanePressures && this.lanePressures[targetLane] !== undefined) {
          this.lanePressures[targetLane] = Math.min(100, this.lanePressures[targetLane] + 28);
        }

        this.onEvent({
          type: "counter_gank_win",
          side: "blue",
          icon: "⚔️",
          text: `🔥 CONTRA-GANK VITORIOSO AOS 03:00! ${bJgNick} e ${rJgNick} colidiram na ${laneName}! Sua equipe venceu o confronto 2v2/3v3, abateu o caçador rival (+450g) e assumiu o controle do rio!`,
          time: this._formatTime()
        });
      } else {
        this._awardTeamGold("red", 400);
        if (rJg) {
          rJg.kills = (rJg.kills || 0) + 1;
          rJg.goldEarned = (rJg.goldEarned || 500) + 300;
          rJg.goldCurrent = (rJg.goldCurrent || 0) + 300;
        }
        if (bJg) {
          bJg.deaths = (bJg.deaths || 0) + 1;
          bJg.alive = false;
          bJg.respawnAt = this.gameSeconds + 16;
          bJg.travelingBackUntil = bJg.respawnAt + 14;
        }
        this.redScore.kills++;
        this.blueScore.deaths = (this.blueScore.deaths || 0) + 1;
        if (this.lanePressures && this.lanePressures[targetLane] !== undefined) {
          this.lanePressures[targetLane] = Math.max(-100, this.lanePressures[targetLane] - 25);
        }

        this.onEvent({
          type: "counter_gank_loss",
          side: "red",
          icon: "⚠️",
          text: `⚠️ CONTRA-GANK DESFAVORÁVEL AOS 03:00! O caçador rival ${rJgNick} previu a jogada na ${laneName} e venceu a troca de feitiços.`,
          time: this._formatTime()
        });
      }
    } else {
      // Cenário 2: GANK COM VANTAGEM NUMÉRICA (Cross-map ganks)
      const roll = Math.random();
      if (roll < 0.75) {
        const lanerRole = targetLane === "bot" ? "adc" : targetLane;
        const laner = this.blueRosterState && this.blueRosterState[lanerRole];
        const oppLaner = this.redRosterState && this.redRosterState[lanerRole];

        this._awardTeamGold("blue", 350);
        if (bJg) {
          bJg.assists = (bJg.assists || 0) + 1;
          bJg.goldEarned = (bJg.goldEarned || 500) + 150;
          bJg.goldCurrent = (bJg.goldCurrent || 0) + 150;
        }
        if (laner) {
          laner.kills = (laner.kills || 0) + 1;
          laner.goldEarned = (laner.goldEarned || 500) + 300;
          laner.goldCurrent = (laner.goldCurrent || 0) + 300;
        }
        if (oppLaner) {
          oppLaner.deaths = (oppLaner.deaths || 0) + 1;
          oppLaner.alive = false;
          oppLaner.respawnAt = this.gameSeconds + 16;
          oppLaner.travelingBackUntil = oppLaner.respawnAt + 14;
        }
        this.blueScore.kills++;
        this.redScore.deaths = (this.redScore.deaths || 0) + 1;
        if (this.lanePressures && this.lanePressures[targetLane] !== undefined) {
          this.lanePressures[targetLane] = Math.min(100, this.lanePressures[targetLane] + 24);
        }

        this.onEvent({
          type: "gank_success",
          side: "blue",
          icon: "🎯",
          text: `🎯 GANK CIRÚRGICO AOS 03:00! ${bJgNick} executou a emboscada planejada na ${laneName}, garantindo o abate sobre ${oppLaner ? oppLaner.name : 'o rival'} (+350g) e pressão de rota!`,
          time: this._formatTime()
        });
      } else {
        if (this.lanePressures && this.lanePressures[targetLane] !== undefined) {
          this.lanePressures[targetLane] = Math.min(100, this.lanePressures[targetLane] + 14);
        }
        this._awardTeamGold("blue", 100);

        this.onEvent({
          type: "gank_flash",
          side: "blue",
          icon: "⚡",
          text: `⚡ FLASH QUEIMADO AOS 03:00! O gank de ${bJgNick} na ${laneName} forçou o recuo adversário sob a torre! Onda de tropas crashada com sucesso (+100g).`,
          time: this._formatTime()
        });
      }
    }
  }

  _updateChampionPositions() {
    if (!this.blueRosterState || !this.redRosterState) return;

    const topClash = this._getLaneClashCoords("top");
    const midClash = this._getLaneClashCoords("mid");
    const botClash = this._getLaneClashCoords("bot");

    const blueBase = { x: 188, y: 630 };
    const redBase = { x: 812, y: 116 };

    const isDragonSpawningOrContested = (this.gameSeconds >= 270 && this.gameSeconds % 300 >= 240);
    const isBaronSpawningOrContested = (this.gameSeconds >= 1200 && (this.gameSeconds < this.blueBaronUntil || this.gameSeconds < this.redBaronUntil || this.gameSeconds % 360 >= 300));

    const updateBlueChamp = (c, role) => {
      if (!c) return;
      if (!c.alive) {
        c.x = blueBase.x;
        c.y = blueBase.y;
        c.statusText = "Ressurgindo...";
        c.hpPct = 0;
        return;
      }
      if (this.gameSeconds < (c.travelingBackUntil || 0)) {
        c.x = blueBase.x;
        c.y = blueBase.y;
        c.statusText = "Na Base (Compras)";
        c.hpPct = 100;
        return;
      }

      c.hpPct = Math.max(20, Math.min(100, Math.round(95 - (c.deaths * 8) + (c.kills * 4))));

      let tx = blueBase.x, ty = blueBase.y, status = "Na Rota";

      if (isBaronSpawningOrContested && ["jungle", "mid", "top"].includes(role)) {
        tx = 380 + (Math.random() * 30 - 15);
        ty = 250 + (Math.random() * 30 - 15);
        status = "Contestando Barão Na'Shor";
      } else if (isDragonSpawningOrContested && ["jungle", "adc", "support", "mid"].includes(role)) {
        tx = 610 + (Math.random() * 30 - 15);
        ty = 490 + (Math.random() * 30 - 15);
        status = "Contestando Dragão";
      } else if (role === "top") {
        tx = topClash.x - 20;
        ty = topClash.y + 14;
        status = "Duelo no Topo";
      } else if (role === "mid") {
        tx = midClash.x - 16;
        ty = midClash.y + 16;
        status = "Controle do Meio";
      } else if (role === "adc") {
        tx = botClash.x - 14;
        ty = botClash.y + 10;
        status = "Farmando no Bot";
      } else if (role === "support") {
        tx = botClash.x - 24;
        ty = botClash.y - 12;
        status = "Proteção / Visão";
      } else if (role === "jungle") {
        if (this.blueJungleCampLane) {
          const l = this.blueJungleCampLane;
          const targetCoords = l === "top" ? { x: 270, y: 165 } : (l === "mid" ? { x: 480, y: 320 } : { x: 770, y: 580 });
          tx = targetCoords.x;
          ty = targetCoords.y;
          status = `Gankando a rota ${l.toUpperCase()}`;
        } else if (this.gameSeconds < 90) {
          if (this.blueJgStartChoice === "start_red_buff") {
            tx = 500;
            ty = 440;
            status = "Aguardando Buff Vermelho (01:30)";
          } else if (this.blueJgStartChoice === "invade_team") {
            tx = 520;
            ty = 360;
            status = "Posicionado para Invasão 4-Man";
          } else if (this.blueJgStartChoice === "invade_vertical") {
            const isRedTop = (this.redJgStartChoice === "start_red_buff");
            tx = isRedTop ? 640 : 460;
            ty = isRedTop ? 150 : 220;
            status = "Infiltrado para Roubo Vertical";
          } else {
            tx = 382;
            ty = 520;
            status = "Aguardando Buff Azul (01:30)";
          }
        } else if (this.gameSeconds >= 165 && this.gameSeconds <= 200 && this.earlyGankTargetLane) {
          const l = this.earlyGankTargetLane;
          const targetCoords = l === "top" ? { x: 270, y: 165 } : (l === "mid" ? { x: 480, y: 320 } : { x: 770, y: 580 });
          tx = targetCoords.x;
          ty = targetCoords.y;
          status = `Gank Planejado na Rota ${l.toUpperCase()} (03:00)`;
        } else {
          const targetCamp = (this.jungleCamps && this.blueJgTargetCampId) ? this.jungleCamps.find(c => c.id === this.blueJgTargetCampId) : null;
          if (targetCamp) {
            tx = targetCamp.x;
            ty = targetCamp.y;
            status = targetCamp.status === "clearing" ? `Farmando ${targetCamp.name}` : `Indo para ${targetCamp.name}`;
          } else {
            tx = 382;
            ty = 480;
            status = "Patrulhando a Selva";
          }
        }
      }

      c.targetX = Math.round(tx);
      c.targetY = Math.round(ty);

      if (c.x === undefined || c.y === undefined) {
        c.x = Math.round(tx);
        c.y = Math.round(ty);
      } else {
        const dx = tx - c.x;
        const dy = ty - c.y;
        const dist = Math.hypot(dx, dy);
        const maxStep = 36;
        if (dist <= maxStep) {
          const isLaning = status.includes("Duelo") || status.includes("Controle") || status.includes("Farmando");
          const seed = (c.id ? c.id.charCodeAt(0) : 0) + (c.name ? c.name.charCodeAt(0) : 0);
          const jitterX = isLaning ? Math.sin((this.gameSeconds * 0.7) + seed) * 4 : 0;
          const jitterY = isLaning ? Math.cos((this.gameSeconds * 0.7) + seed) * 4 : 0;
          c.x = Math.round(tx + jitterX);
          c.y = Math.round(ty + jitterY);
        } else {
          c.x = Math.round(c.x + (dx / dist) * maxStep);
          c.y = Math.round(c.y + (dy / dist) * maxStep);
        }
      }
      c.statusText = status;
    };

    const updateRedChamp = (c, role) => {
      if (!c) return;
      if (!c.alive) {
        c.x = redBase.x;
        c.y = redBase.y;
        c.statusText = "Ressurgindo...";
        c.hpPct = 0;
        return;
      }
      if (this.gameSeconds < (c.travelingBackUntil || 0)) {
        c.x = redBase.x;
        c.y = redBase.y;
        c.statusText = "Na Base (Compras)";
        c.hpPct = 100;
        return;
      }

      c.hpPct = Math.max(20, Math.min(100, Math.round(95 - (c.deaths * 8) + (c.kills * 4))));

      let tx = redBase.x, ty = redBase.y, status = "Na Rota";

      if (isBaronSpawningOrContested && ["jungle", "mid", "top"].includes(role)) {
        tx = 350 + (Math.random() * 30 - 15);
        ty = 210 + (Math.random() * 30 - 15);
        status = "Contestando Barão Na'Shor";
      } else if (isDragonSpawningOrContested && ["jungle", "adc", "support", "mid"].includes(role)) {
        tx = 660 + (Math.random() * 30 - 15);
        ty = 530 + (Math.random() * 30 - 15);
        status = "Contestando Dragão";
      } else if (role === "top") {
        tx = topClash.x + 20;
        ty = topClash.y - 14;
        status = "Duelo no Topo";
      } else if (role === "mid") {
        tx = midClash.x + 16;
        ty = midClash.y - 16;
        status = "Controle do Meio";
      } else if (role === "adc") {
        tx = botClash.x + 14;
        ty = botClash.y - 10;
        status = "Farmando no Bot";
      } else if (role === "support") {
        tx = botClash.x + 24;
        ty = botClash.y + 12;
        status = "Proteção / Visão";
      } else if (role === "jungle") {
        if (this.redJungleCampLane) {
          const l = this.redJungleCampLane;
          const targetCoords = l === "top" ? { x: 310, y: 120 } : (l === "mid" ? { x: 550, y: 280 } : { x: 820, y: 530 });
          tx = targetCoords.x;
          ty = targetCoords.y;
          status = `Gankando a rota ${l.toUpperCase()}`;
        } else if (this.gameSeconds < 90) {
          if (this.redJgStartChoice === "start_blue_buff") {
            tx = 640;
            ty = 150;
            status = "Aguardando Buff Azul (01:30)";
          } else {
            tx = 460;
            ty = 220;
            status = "Aguardando Buff Red (01:30)";
          }
        } else if (this.gameSeconds >= 165 && this.gameSeconds <= 200 && this.redEarlyGankTargetLane) {
          const l = this.redEarlyGankTargetLane;
          const targetCoords = l === "top" ? { x: 310, y: 120 } : (l === "mid" ? { x: 550, y: 280 } : { x: 820, y: 530 });
          tx = targetCoords.x;
          ty = targetCoords.y;
          status = `Gank Planejado na Rota ${l.toUpperCase()} (03:00)`;
        } else {
          const targetCamp = (this.jungleCamps && this.redJgTargetCampId) ? this.jungleCamps.find(c => c.id === this.redJgTargetCampId) : null;
          if (targetCamp) {
            tx = targetCamp.x;
            ty = targetCamp.y;
            status = targetCamp.status === "clearing" ? `Farmando ${targetCamp.name}` : `Indo para ${targetCamp.name}`;
          } else {
            tx = 640;
            ty = 200;
            status = "Patrulhando a Selva";
          }
        }
      }

      c.targetX = Math.round(tx);
      c.targetY = Math.round(ty);

      if (c.x === undefined || c.y === undefined) {
        c.x = Math.round(tx);
        c.y = Math.round(ty);
      } else {
        const dx = tx - c.x;
        const dy = ty - c.y;
        const dist = Math.hypot(dx, dy);
        const maxStep = 36;
        if (dist <= maxStep) {
          const isLaning = status.includes("Duelo") || status.includes("Controle") || status.includes("Farmando");
          const seed = (c.id ? c.id.charCodeAt(0) : 0) + (c.name ? c.name.charCodeAt(0) : 0);
          const jitterX = isLaning ? Math.sin((this.gameSeconds * 0.7) + seed) * 4 : 0;
          const jitterY = isLaning ? Math.cos((this.gameSeconds * 0.7) + seed) * 4 : 0;
          c.x = Math.round(tx + jitterX);
          c.y = Math.round(ty + jitterY);
        } else {
          c.x = Math.round(c.x + (dx / dist) * maxStep);
          c.y = Math.round(c.y + (dy / dist) * maxStep);
        }
      }
      c.statusText = status;
    };

    Object.keys(this.blueRosterState).forEach(r => updateBlueChamp(this.blueRosterState[r], r));
    Object.keys(this.redRosterState).forEach(r => updateRedChamp(this.redRosterState[r], r));
  }

  _calculateVisionAndVisibility() {
    if (!this.blueRosterState || !this.redRosterState) return;

    const visionSources = [];

    // Torres azuis de pé: visão verdadeira raio 135px
    if (this.blueStructures && Array.isArray(this.blueStructures)) {
      const coords = {
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
      };
      this.blueStructures.forEach(st => {
        if (!st.destroyed && coords[st.id]) {
          visionSources.push({
            type: "tower",
            id: st.id,
            x: coords[st.id].x,
            y: coords[st.id].y,
            range: 135
          });
        }
      });
    }

    // Base azul: raio 160px
    visionSources.push({ type: "base", x: 188, y: 630, range: 160 });

    // Campeões azuis vivos: raio 115px
    Object.values(this.blueRosterState).forEach(c => {
      if (c && c.alive) {
        visionSources.push({
          type: "champion",
          role: c.role,
          id: c.id,
          x: c.x || 188,
          y: c.y || 630,
          range: 115
        });
      }
    });

    // Sentinelas azuis ativas: raio 95px ou 110px
    (this.wards || []).forEach(w => {
      if (w.team === "blue") {
        visionSources.push({
          type: "ward",
          id: w.id,
          x: w.x,
          y: w.y,
          range: w.range || 95
        });
      }
    });

    // Ondas de tropas azuis nas rotas: raio 80px
    ["top", "mid", "bot"].forEach(l => {
      const clash = this._getLaneClashCoords(l);
      if (clash) {
        visionSources.push({
          type: "minions",
          lane: l,
          x: clash.x,
          y: clash.y,
          range: 80
        });
      }
    });

    this.blueVisionSources = visionSources;

    // Calcula visibilidade para cada campeão vermelho
    Object.values(this.redRosterState).forEach(rc => {
      if (!rc) return;
      if (!rc.alive) {
        rc.isVisibleToBlue = false;
        return;
      }

      const rx = rc.x || 812;
      const ry = rc.y || 116;

      let isSeen = false;
      for (const vs of visionSources) {
        const d = Math.hypot(rx - vs.x, ry - vs.y);
        if (d <= vs.range) {
          isSeen = true;
          break;
        }
      }

      rc.isVisibleToBlue = isSeen;
      if (isSeen) {
        rc.lastSeen = { x: rx, y: ry, time: this.gameSeconds };
        this.lastEnemySightings[rc.role] = { x: rx, y: ry, time: this.gameSeconds, name: rc.name };
      }
    });
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
      blueJungleCampLane: this.blueJungleCampLane,
      topPushAdvantage: this._calculateTopPushAdvantage(),
      laneMatchups: this.laneMatchups,
      redJungleCampLane: this.redJungleCampLane,
      playerTactics: this.playerTactics,
      tacticsLabel: this.tacticsLabel || "⚖️ Controle de Rotas",
      counterAttackCooldown: this.counterAttackCooldown,
      objectiveBountiesActive: this.objectiveBountiesActive,
      isComebackMode: isBehind,
      wards: this.wards || [],
      visionSources: this.blueVisionSources || [],
      lastEnemySightings: this.lastEnemySightings || {},
      jungleCamps: this.jungleCamps || [],
      blueJgStartChoice: this.blueJgStartChoice,
      redJgStartChoice: this.redJgStartChoice,
      earlyGankTargetLane: this.earlyGankTargetLane,
      redEarlyGankTargetLane: this.redEarlyGankTargetLane,
      earlyGankExecuted: this.earlyGankExecuted,
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
        superMinionsByLane: { ...(this.blueSuperMinionsByLane || { top: false, mid: false, bot: false }) },
        hasBaron: this.gameSeconds < this.blueBaronUntil,
        buffs: this._getActiveBuffs("blue"),
        roster: this.blueRosterState,
        mvpRole: this.blueMvpRole
      },
      red: {
        name: this.redTeam.name,
        tag: this.redTeam.tag,
        color: this.redTeam.color,
        score: this.redScore,
        structures: this.redStructures,
        superMinions: this.redSuperMinions,
        superMinionsByLane: { ...(this.redSuperMinionsByLane || { top: false, mid: false, bot: false }) },
        hasBaron: this.gameSeconds < this.redBaronUntil,
        buffs: this._getActiveBuffs("red"),
        roster: this.redRosterState,
        mvpRole: this.redMvpRole
      }
    };
  }
}
