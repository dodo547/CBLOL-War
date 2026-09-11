/**
 * Catálogo Oficial dos Acampamentos e Monstros da Selva de Summoner's Rift (League of Legends Patch 14.x)
 * Contém horários de nascimento originais, tempos de respawn, recompensas de ouro/CS e coordenadas no minimapa.
 */

export const JUNGLE_CAMPS = [
  // ==========================================
  // SELVA DA EQUIPE AZUL (BLUE SIDE JUNGLE)
  // ==========================================
  {
    id: "blue_blue_buff",
    name: "Sentinela Azul",
    campType: "buff",
    side: "blue",
    icon: "🔵",
    badge: "BUFF AZUL",
    themeColor: "#38bdf8",
    x: 382,
    y: 520,
    spawnAt: 90, // 01:30
    respawnDuration: 300, // 5:00 min
    gold: 90,
    cs: 4,
    buff: "Bênção da Perspicácia (Crest of Insight): +10 Aceleração de Habilidade e regeneração maciça de Mana/Energia.",
    desc: "Guardião arcano da floresta azul. Concede bônus vital para magos e campeões dependentes de mana."
  },
  {
    id: "blue_gromp",
    name: "Grompe",
    campType: "minor",
    side: "blue",
    icon: "🐸",
    badge: "GROMP",
    themeColor: "#34d399",
    x: 210,
    y: 440,
    spawnAt: 102, // 01:42
    respawnDuration: 135, // 2:15 min
    gold: 80,
    cs: 4,
    buff: "Restauração Mítica: Regenera uma porcentagem da Vida e Mana ao ser abatido.",
    desc: "Sapo venenoso gigante da selva superior azul. Alvo prioritário para sustentação rápida."
  },
  {
    id: "blue_wolves",
    name: "Lobos Devastadores",
    campType: "minor",
    side: "blue",
    icon: "🐺",
    badge: "LOBOS",
    themeColor: "#a78bfa",
    x: 380,
    y: 440,
    spawnAt: 90, // 01:30
    respawnDuration: 135, // 2:15 min
    gold: 85,
    cs: 4,
    buff: "3 Monstros (Lobo Maior 55g + 2 Menores 15g cada).",
    desc: "Matilha ágil de predadores sombrios na entrada do quadrante azul."
  },
  {
    id: "blue_raptors",
    name: "Acuâminas",
    campType: "minor",
    side: "blue",
    icon: "🦅",
    badge: "ACUÂMINAS",
    themeColor: "#f43f5e",
    x: 440,
    y: 340,
    spawnAt: 90, // 01:30
    respawnDuration: 135, // 2:15 min
    gold: 70,
    cs: 4,
    buff: "6 Monstros (Acuâmina Maior 35g + 5 Menores 7g cada).",
    desc: "Bando numeroso de aves ferozes na rampa do meio. Excelente para dano em área (AoE)."
  },
  {
    id: "blue_red_buff",
    name: "Rubrivira",
    campType: "buff",
    side: "blue",
    icon: "🔴",
    badge: "BUFF RED",
    themeColor: "#ef4444",
    x: 500,
    y: 440,
    spawnAt: 90, // 01:30
    respawnDuration: 300, // 5:00 min
    gold: 90,
    cs: 4,
    buff: "Bênção das Cinzas (Crest of Cinders): Ataques básicos causam lentidão e queimadura de dano verdadeiro contínuo.",
    desc: "Colosso elemental de fogo da selva inferior azul. Essencial para ganks e trocas de dano."
  },
  {
    id: "blue_krugs",
    name: "Krugues",
    campType: "minor",
    side: "blue",
    icon: "🪨",
    badge: "KRUGS",
    themeColor: "#f59e0b",
    x: 630,
    y: 630,
    spawnAt: 102, // 01:42
    respawnDuration: 135, // 2:15 min
    gold: 110,
    cs: 4,
    buff: "Divisão Rochosa: O Krug Maior se divide em Krugs Médios e Menores (maior ouro total de acampamento comum).",
    desc: "Golens de pedra mágica no canto inferior direito da rota bot."
  },

  // ==========================================
  // SELVA DA EQUIPE VERMELHA (RED SIDE JUNGLE)
  // ==========================================
  {
    id: "red_red_buff",
    name: "Rubrivira",
    campType: "buff",
    side: "red",
    icon: "🔴",
    badge: "BUFF RED",
    themeColor: "#ef4444",
    x: 460,
    y: 220,
    spawnAt: 90, // 01:30
    respawnDuration: 300, // 5:00 min
    gold: 90,
    cs: 4,
    buff: "Bênção das Cinzas (Crest of Cinders): Lentidão e queimadura de dano verdadeiro em autoataques.",
    desc: "Monstro guardião de brasa no quadrante superior vermelho."
  },
  {
    id: "red_raptors",
    name: "Acuâminas",
    campType: "minor",
    side: "red",
    icon: "🦅",
    badge: "ACUÂMINAS",
    themeColor: "#f43f5e",
    x: 540,
    y: 260,
    spawnAt: 90, // 01:30
    respawnDuration: 135, // 2:15 min
    gold: 70,
    cs: 4,
    buff: "6 Monstros (Acuâmina Maior 35g + 5 Menores 7g cada).",
    desc: "Bando de aves vorazes no bolsão central da selva vermelha."
  },
  {
    id: "red_krugs",
    name: "Krugues",
    campType: "minor",
    side: "red",
    icon: "🪨",
    badge: "KRUGS",
    themeColor: "#f59e0b",
    x: 380,
    y: 110,
    spawnAt: 102, // 01:42
    respawnDuration: 135, // 2:15 min
    gold: 110,
    cs: 4,
    buff: "Divisão de Rochas Mágicas: 110 de ouro total para o caçador.",
    desc: "Acampamento isolado de golens rochosos perto da rota superior vermelha."
  },
  {
    id: "red_wolves",
    name: "Lobos Devastadores",
    campType: "minor",
    side: "red",
    icon: "🐺",
    badge: "LOBOS",
    themeColor: "#a78bfa",
    x: 640,
    y: 220,
    spawnAt: 90, // 01:30
    respawnDuration: 135, // 2:15 min
    gold: 85,
    cs: 4,
    buff: "3 Monstros (85 de ouro total).",
    desc: "Lobos territoriais guardando o acesso à selva azul inimiga."
  },
  {
    id: "red_blue_buff",
    name: "Sentinela Azul",
    campType: "buff",
    side: "red",
    icon: "🔵",
    badge: "BUFF AZUL",
    themeColor: "#38bdf8",
    x: 640,
    y: 150,
    spawnAt: 90, // 01:30
    respawnDuration: 300, // 5:00 min
    gold: 90,
    cs: 4,
    buff: "Bênção da Perspicácia (Crest of Insight): Aceleração de Habilidade e regeneração rápida de Mana.",
    desc: "Sentinela rúnica de pedra e magia no quadrante inferior vermelho."
  },
  {
    id: "red_gromp",
    name: "Grompe",
    campType: "minor",
    side: "red",
    icon: "🐸",
    badge: "GROMP",
    themeColor: "#34d399",
    x: 750,
    y: 180,
    spawnAt: 102, // 01:42
    respawnDuration: 135, // 2:15 min
    gold: 80,
    cs: 4,
    buff: "Restauração de Combate: Recupera vida e recurso ao ser finalizado.",
    desc: "Monstro cogumelo anfíbio na entrada norte da selva vermelha."
  },

  // ==========================================
  // ARONGUEJOS DO RIO (RIVER SCUTTLE CRABS)
  // ==========================================
  {
    id: "river_scuttle_top",
    name: "Aronguejo (Rio Superior)",
    campType: "scuttle",
    side: "neutral",
    icon: "🦀",
    badge: "ARONGUEJO TOP",
    themeColor: "#06b6d4",
    x: 330,
    y: 200,
    spawnAt: 210, // 03:30
    respawnDuration: 150, // 2:30 min
    gold: 55,
    cs: 4,
    buff: "Santuário do Rio: Concede um santuário de visão inquebrável e +35% de velocidade de movimento ao atravessar por 90s.",
    desc: "Criatura inofensiva que vaga pelo rio em frente ao covil do Barão Na'Shor."
  },
  {
    id: "river_scuttle_bot",
    name: "Aronguejo (Rio Inferior)",
    campType: "scuttle",
    side: "neutral",
    icon: "🦀",
    badge: "ARONGUEJO BOT",
    themeColor: "#06b6d4",
    x: 680,
    y: 480,
    spawnAt: 210, // 03:30
    respawnDuration: 150, // 2:30 min
    gold: 55,
    cs: 4,
    buff: "Santuário do Rio: Concede visão duradoura e aceleração na entrada do covil do Dragão por 90s.",
    desc: "Patrulheiro do rio sul. Garante controle de visão tático crucial para disputas de Dragão."
  }
];

export function getJungleCampById(id) {
  return JUNGLE_CAMPS.find(c => c.id === id) || null;
}

export function getAllJungleCamps() {
  return JUNGLE_CAMPS;
}
