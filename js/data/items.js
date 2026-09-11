// Catálogo Oficial Completo de Itens de League of Legends (Patch 14.20.1)
// Ícones carregados diretamente do CDN oficial do DataDragon:
// https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/{id}.png
import { getChampionById } from "./champions.js";

export const LOL_ITEMS = {
  // =========================================================================
  // 1. ITENS INICIAIS & CONSUMÍVEIS (STARTER ITEMS - 00:00)
  // =========================================================================
  1055: {
    id: 1055,
    name: "Lâmina de Doran",
    tier: "STARTER",
    class: "Fighter",
    cost: 450,
    stats: { damage: 10, tank: 80, lifesteal: 3.5 },
    power: 14,
    description: "Item inicial ideal para campeões de Dano Físico (AD)."
  },
  1056: {
    id: 1056,
    name: "Anel de Doran",
    tier: "STARTER",
    class: "Mage",
    cost: 400,
    stats: { damage: 18, tank: 90, manaRegen: 10 },
    power: 14,
    description: "Item inicial ideal para Magos e campeões de Poder de Habilidade (AP)."
  },
  1054: {
    id: 1054,
    name: "Escudo de Doran",
    tier: "STARTER",
    class: "Tank",
    cost: 450,
    stats: { tank: 110, healthRegen: 12 },
    power: 14,
    description: "Item inicial defensivo para resistir a rotas difíceis e poke."
  },
  1101: {
    id: 1101,
    name: "Cria das Chamas (Pet Selva)",
    tier: "STARTER",
    class: "Jungle",
    cost: 450,
    stats: { damage: 12, push: 10, utility: 8 },
    power: 14,
    description: "Companheiro de selva que auxilia na limpeza de campos e causa lentidão."
  },
  3865: {
    id: 3865,
    name: "Atlas Mundial",
    tier: "STARTER",
    class: "Support",
    cost: 400,
    stats: { tank: 30, utility: 12, goldGen: 15 },
    power: 12,
    description: "Item inicial de suporte que gera ouro passivo ao alvejar estruturas e campeões."
  },
  2003: {
    id: 2003,
    name: "Poção de Vida",
    tier: "CONSUMABLE",
    class: "General",
    cost: 50,
    stats: { heal: 120 },
    power: 2,
    description: "Restaura 120 de vida ao longo de 15 segundos."
  },

  // =========================================================================
  // 2. COMPONENTES BÁSICOS (BASIC COMPONENTS)
  // =========================================================================
  1001: {
    id: 1001,
    name: "Botas",
    tier: "BASIC",
    class: "Boots",
    cost: 300,
    stats: { utility: 8 },
    power: 6,
    description: "Aumenta a Velocidade de Movimento em 25."
  },
  1036: {
    id: 1036,
    name: "Espada Longa",
    tier: "BASIC",
    class: "Physical",
    cost: 350,
    stats: { damage: 10 },
    power: 7,
    description: "Concede +10 de Dano de Ataque (AD)."
  },
  1052: {
    id: 1052,
    name: "Tomo Amplificador",
    tier: "BASIC",
    class: "Magic",
    cost: 400,
    stats: { damage: 20 },
    power: 8,
    description: "Concede +20 de Poder de Habilidade (AP)."
  },
  1028: {
    id: 1028,
    name: "Cristal de Rubi",
    tier: "BASIC",
    class: "Defense",
    cost: 400,
    stats: { tank: 150 },
    power: 7,
    description: "Concede +150 de Vida máxima."
  },
  1027: {
    id: 1027,
    name: "Cristal de Safira",
    tier: "BASIC",
    class: "Magic",
    cost: 350,
    stats: { mana: 250 },
    power: 5,
    description: "Concede +250 de Mana máxima."
  },
  1029: {
    id: 1029,
    name: "Armadura de Pano",
    tier: "BASIC",
    class: "Defense",
    cost: 300,
    stats: { tank: 15 },
    power: 6,
    description: "Concede +15 de Armadura."
  },
  1033: {
    id: 1033,
    name: "Manto Anula-Magia",
    tier: "BASIC",
    class: "Defense",
    cost: 400,
    stats: { tank: 20 },
    power: 7,
    description: "Concede +20 de Resistência Mágica."
  },
  1042: {
    id: 1042,
    name: "Adaga",
    tier: "BASIC",
    class: "Physical",
    cost: 250,
    stats: { damage: 6, push: 4 },
    power: 6,
    description: "Concede +12% de Velocidade de Ataque."
  },
  1018: {
    id: 1018,
    name: "Capa da Agilidade",
    tier: "BASIC",
    class: "Physical",
    cost: 600,
    stats: { damage: 10, scaling: 6 },
    power: 10,
    description: "Concede +15% de Chance de Acerto Crítico."
  },
  1037: {
    id: 1037,
    name: "Picareta",
    tier: "BASIC",
    class: "Physical",
    cost: 875,
    stats: { damage: 25 },
    power: 14,
    description: "Concede +25 de Dano de Ataque."
  },
  1038: {
    id: 1038,
    name: "Espada G.p.C.",
    tier: "BASIC",
    class: "Physical",
    cost: 1300,
    stats: { damage: 40 },
    power: 20,
    description: "Concede +40 de Dano de Ataque."
  },
  1026: {
    id: 1026,
    name: "Varinha Explosiva",
    tier: "BASIC",
    class: "Magic",
    cost: 850,
    stats: { damage: 40 },
    power: 15,
    description: "Concede +40 de Poder de Habilidade."
  },
  1058: {
    id: 1058,
    name: "Bastão Desnecessariamente Grande",
    tier: "BASIC",
    class: "Magic",
    cost: 1250,
    stats: { damage: 65 },
    power: 22,
    description: "Concede +65 de Poder de Habilidade."
  },
  1031: {
    id: 1031,
    name: "Cota de Malha",
    tier: "BASIC",
    class: "Defense",
    cost: 800,
    from: [1029],
    stats: { tank: 40 },
    power: 14,
    description: "Concede +40 de Armadura."
  },
  1057: {
    id: 1057,
    name: "Capuz Negatron",
    tier: "BASIC",
    class: "Defense",
    cost: 900,
    from: [1033],
    stats: { tank: 45 },
    power: 15,
    description: "Concede +45 de Resistência Mágica."
  },
  1011: {
    id: 1011,
    name: "Cinto do Gigante",
    tier: "BASIC",
    class: "Defense",
    cost: 900,
    from: [1028],
    stats: { tank: 300 },
    power: 15,
    description: "Concede +300 de Vida."
  },

  // =========================================================================
  // 3. COMPONENTES ÉPICOS & INTERMEDIÁRIOS COM RECEITAS (EPIC TIER 2)
  // =========================================================================
  3133: {
    id: 3133,
    name: "Martelo de Guerra de Caulfield",
    tier: "EPIC",
    class: "Physical",
    cost: 1100,
    from: [1036, 1036],
    stats: { damage: 25, utility: 10 },
    power: 18,
    description: "+25 Dano de Ataque, +10 Aceleração de Habilidade."
  },
  3134: {
    id: 3134,
    name: "Punhal Serrilhado",
    tier: "EPIC",
    class: "Physical",
    cost: 1000,
    from: [1036, 1036],
    stats: { damage: 25, push: 8 },
    power: 18,
    description: "+25 Dano de Ataque, +10 Letalidade."
  },
  3044: {
    id: 3044,
    name: "Fago",
    tier: "EPIC",
    class: "Physical",
    cost: 1100,
    from: [1028, 1036],
    stats: { damage: 15, tank: 200 },
    power: 18,
    description: "+15 Dano de Ataque, +200 Vida. Golpes aceleram a movimentação."
  },
  3057: {
    id: 3057,
    name: "Fulgor",
    tier: "EPIC",
    class: "Physical",
    cost: 900,
    from: [1027],
    stats: { damage: 12, utility: 10 },
    power: 16,
    description: "Lâmina Encantada: após conjurar uma habilidade, o próximo ataque causa dano dobrado."
  },
  3067: {
    id: 3067,
    name: "Gema Ardente",
    tier: "EPIC",
    class: "Defense",
    cost: 800,
    from: [1028],
    stats: { tank: 200, utility: 10 },
    power: 16,
    description: "+200 Vida, +10 Aceleração de Habilidade."
  },
  3802: {
    id: 3802,
    name: "Capítulo Perdido",
    tier: "EPIC",
    class: "Magic",
    cost: 1200,
    from: [1052, 1027],
    stats: { damage: 35, mana: 300, utility: 10 },
    power: 20,
    description: "+35 AP, +300 Mana. Subir de nível restaura 20% da Mana máxima."
  },
  3145: {
    id: 3145,
    name: "Alternador Hextec",
    tier: "EPIC",
    class: "Magic",
    cost: 1100,
    from: [1052, 1052],
    stats: { damage: 45, push: 8 },
    power: 19,
    description: "+45 AP. Causa dano mágico adicional de choque ao primeiro ataque."
  },
  3108: {
    id: 3108,
    name: "Códex Demoníaco",
    tier: "EPIC",
    class: "Magic",
    cost: 900,
    from: [1052],
    stats: { damage: 30, utility: 10 },
    power: 16,
    description: "+30 AP, +10 Aceleração de Habilidade."
  },
  3916: {
    id: 3916,
    name: "Orbe do Esquecimento",
    tier: "EPIC",
    class: "Magic",
    cost: 800,
    from: [1052],
    stats: { damage: 25, utility: 8 },
    antiHeal: true,
    power: 16,
    description: "+25 AP. Aplica 40% de Feridas Dolorosas (Corta-Cura)."
  },
  3123: {
    id: 3123,
    name: "Chamado do Carrasco",
    tier: "EPIC",
    class: "Physical",
    cost: 800,
    from: [1036],
    stats: { damage: 15, utility: 8 },
    antiHeal: true,
    power: 16,
    description: "+15 Dano de Ataque. Ataques físicos aplicam 40% de Feridas Dolorosas."
  },
  3076: {
    id: 3076,
    name: "Colete Espinhoso",
    tier: "EPIC",
    class: "Defense",
    cost: 800,
    from: [1029, 1029],
    stats: { tank: 30 },
    antiHeal: true,
    power: 16,
    description: "+30 Armadura. Reflete dano e aplica Feridas Dolorosas a quem te atacar."
  },
  3751: {
    id: 3751,
    name: "Brasa de Bami",
    tier: "EPIC",
    class: "Defense",
    cost: 900,
    from: [1028],
    stats: { tank: 200, push: 10 },
    power: 17,
    description: "+200 Vida. Imolação: queima tropas e campeões inimigos ao redor."
  },
  3155: {
    id: 3155,
    name: "Hexdrinker",
    tier: "EPIC",
    class: "Physical",
    cost: 1300,
    from: [1036, 1033],
    stats: { damage: 20, tank: 30 },
    resists: "MR",
    power: 19,
    description: "Salva-Vidas: concede escudo protetor contra dano mágico ao ficar com pouca vida."
  },
  3191: {
    id: 3191,
    name: "Guarda-Braço do Seeker",
    tier: "EPIC",
    class: "Magic",
    cost: 1600,
    from: [1052, 1052, 1029],
    stats: { damage: 40, tank: 35 },
    power: 22,
    description: "+40 AP, +35 Armadura. Concede estase protetora única."
  },
  3086: {
    id: 3086,
    name: "Fervor",
    tier: "EPIC",
    class: "Physical",
    cost: 1100,
    from: [1042, 1018],
    stats: { damage: 12, push: 10, utility: 8 },
    power: 18,
    description: "+15% Velocidade de Ataque, +15% Crítico, +5% Velocidade de Movimento."
  },
  3024: {
    id: 3024,
    name: "Manto Glacial",
    tier: "EPIC",
    class: "Defense",
    cost: 950,
    from: [1029, 1027],
    stats: { tank: 20, mana: 250, utility: 10 },
    power: 17,
    description: "+20 Armadura, +250 Mana, +10 Aceleração de Habilidade."
  },
  3023: {
    id: 3023,
    name: "Espelho de Vidro de Bandópolis",
    tier: "EPIC",
    class: "Support",
    cost: 900,
    from: [1052],
    stats: { damage: 20, utility: 12 },
    power: 16,
    description: "+20 AP, +10 Aceleração de Habilidade, regeneração de mana aumentada."
  },
  1043: {
    id: 1043,
    name: "Arco Recurvado",
    tier: "EPIC",
    class: "Marksman",
    cost: 700,
    from: [1042],
    stats: { damage: 15, push: 10 },
    power: 16,
    description: "+15% Velocidade de Ataque. Passivo: Causa dano mágico adicional ao contato."
  },
  3211: {
    id: 3211,
    name: "Capuz do Espectro",
    tier: "EPIC",
    class: "Tank",
    cost: 1250,
    from: [1028, 1033],
    stats: { tank: 30, sustain: 20 },
    power: 22,
    description: "+250 Vida, +25 Resistência Mágica. Regenera vida ao receber dano de campeões."
  },
  3082: {
    id: 3082,
    name: "Armadura do Guardião",
    tier: "EPIC",
    class: "Tank",
    cost: 1000,
    from: [1029, 1029],
    stats: { tank: 35 },
    power: 20,
    description: "+40 Armadura. Passivo Rocha Sólida: Reduz dano de ataques básicos."
  },
  3066: {
    id: 3066,
    name: "Placa Lunar Alada",
    tier: "EPIC",
    class: "Tank",
    cost: 800,
    from: [1028],
    stats: { tank: 20, utility: 10 },
    power: 16,
    description: "+150 Vida e +5% Velocidade de Movimento."
  },

  // =========================================================================
  // 4. BOTAS APRIMORADAS OFICIAIS (TIER 2 BOOTS)
  // =========================================================================
  3006: {
    id: 3006,
    name: "Grevas do Berserker",
    tier: "BOOTS",
    class: "Marksman",
    cost: 1100,
    from: [1001, 1042],
    stats: { damage: 12, push: 10, utility: 12 },
    power: 20,
    description: "+35% Velocidade de Ataque e +45 Velocidade de Movimento."
  },
  3020: {
    id: 3020,
    name: "Sapatos do Feiticeiro",
    tier: "BOOTS",
    class: "Mage",
    cost: 1100,
    from: [1001],
    stats: { damage: 16, utility: 12 },
    power: 20,
    description: "+18 Penetração Mágica e +45 Velocidade de Movimento."
  },
  3047: {
    id: 3047,
    name: "Botas Galvanizadas de Aço",
    tier: "BOOTS",
    class: "Tank",
    cost: 1100,
    from: [1001, 1029],
    stats: { tank: 18, utility: 12 },
    power: 20,
    description: "+20 Armadura, +45 Movimento e reduz dano de ataques básicos em 12%."
  },
  3111: {
    id: 3111,
    name: "Passos de Mercúrio",
    tier: "BOOTS",
    class: "Tank",
    cost: 1100,
    from: [1001, 1033],
    stats: { tank: 18, utility: 16 },
    resists: "MR",
    power: 20,
    description: "+25 Resistência Mágica, +45 Movimento e +30% Tenacidade (reduz atordoamentos)."
  },
  3158: {
    id: 3158,
    name: "Botas Ionianas da Lucidez",
    tier: "BOOTS",
    class: "General",
    cost: 900,
    from: [1001],
    stats: { utility: 20 },
    power: 18,
    description: "+15 Aceleração de Habilidade e +45 Velocidade de Movimento."
  },
  3009: {
    id: 3009,
    name: "Botas da Rapidez",
    tier: "BOOTS",
    class: "General",
    cost: 900,
    from: [1001],
    stats: { utility: 24, push: 6 },
    power: 18,
    description: "+60 Velocidade de Movimento e 25% de resistência a lentidão."
  },

  // =========================================================================
  // 5. ITENS LENDÁRIOS COMPLETOS - LUTADORES & ASSASSINOS (FIGHTER / ASSASSIN)
  // =========================================================================
  3071: {
    id: 3071,
    name: "Cutelo Negro",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3000,
    from: [3044, 3133, 1028],
    stats: { damage: 22, tank: 14, push: 10, utility: 10 },
    power: 36,
    description: "Causa dano e estilhaça até 30% da armadura do alvo com golpes sucessivos."
  },
  3078: {
    id: 3078,
    name: "Força da Trindade",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3333,
    from: [3057, 3044, 3086],
    stats: { damage: 25, tank: 10, push: 18, utility: 8 },
    power: 40,
    description: "Lâmina Encantada e Golpe Triplo: amplifica o dano e derrete torres."
  },
  6333: {
    id: 6333,
    name: "Dança da Morte",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3200,
    from: [3133, 1037, 1031],
    stats: { damage: 20, tank: 18, scaling: 12 },
    power: 38,
    description: "Converte dano imediato em sangramento e purga ferimentos após abates."
  },
  3053: {
    id: 3053,
    name: "Sinal de Sterak",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3200,
    from: [1037, 1011, 1028],
    stats: { damage: 16, tank: 24, scaling: 12 },
    power: 38,
    description: "Fúria de Sterak: concede um escudo colossal de até 80% da vida bônus sob dano letal."
  },
  6610: {
    id: 6610,
    name: "Céu Dividido",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3100,
    from: [3044, 3133],
    stats: { damage: 22, tank: 16, utility: 8 },
    power: 37,
    description: "Golpe Crítico certeiro ao atacar um novo alvo com cura instantânea massiva."
  },
  3074: {
    id: 3074,
    name: "Hidra Raivosa",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3300,
    from: [3133, 1037, 1036],
    stats: { damage: 28, push: 22, lifesteal: 12 },
    power: 42,
    description: "Fenda Ativa: desintegra ondas de tropas instantaneamente e concede roubo de vida."
  },
  3156: {
    id: 3156,
    name: "Mandíbula de Malmortius",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3100,
    from: [3155, 3133],
    stats: { damage: 24, tank: 18, utility: 8 },
    resists: "MR",
    power: 37,
    description: "Escudo salva-vidas vital contra composições com múltiplos magos e dano mágico."
  },
  3153: {
    id: 3153,
    name: "Espada do Rei Destruído",
    tier: "LEGENDARY",
    class: "Fighter",
    cost: 3200,
    from: [1043, 1037, 1036],
    stats: { damage: 22, push: 14, scaling: 14 },
    power: 39,
    description: "Ataques causam dano baseado na Vida Atual do alvo e roubam velocidade de movimento."
  },
  6692: {
    id: 6692,
    name: "Eclipse",
    tier: "LEGENDARY",
    class: "Assassin",
    cost: 2800,
    from: [3134, 3133],
    stats: { damage: 26, push: 10, scaling: 8 },
    power: 36,
    description: "Dois golpes rápidos ativam escudo protetor e dano baseado na vida máxima."
  },
  3142: {
    id: 3142,
    name: "Lâmina Fantasma de Youmuu",
    tier: "LEGENDARY",
    class: "Assassin",
    cost: 2700,
    from: [3134, 1036],
    stats: { damage: 28, push: 12, utility: 10 },
    power: 38,
    description: "Letalidade devastadora e arranque de velocidade para ganks fulminantes."
  },
  6698: {
    id: 6698,
    name: "Oportunidade",
    tier: "LEGENDARY",
    class: "Assassin",
    cost: 2700,
    from: [3134, 1036],
    stats: { damage: 28, utility: 12 },
    power: 37,
    description: "Concede letalidade adicional na emboscada e fuga rápida após abates."
  },
  6694: {
    id: 6694,
    name: "Rancor de Serylda",
    tier: "LEGENDARY",
    class: "Assassin",
    cost: 3200,
    from: [3134, 3133],
    stats: { damage: 24, scaling: 16, utility: 10 },
    power: 38,
    description: "Penetração de armadura escalonada com Letalidade e lentidão em habilidades."
  },

  // =========================================================================
  // 6. ITENS LENDÁRIOS COMPLETOS - MAGOS (MAGES)
  // =========================================================================
  3089: {
    id: 3089,
    name: "Capuz da Morte de Rabadon",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3600,
    from: [1058, 1058],
    stats: { damage: 38, scaling: 22 },
    power: 45,
    description: "Magnum Opus: aumenta o Poder de Habilidade total em massivos 35%."
  },
  3157: {
    id: 3157,
    name: "Ampulheta de Zhonya",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3250,
    from: [3191, 1058],
    stats: { damage: 24, tank: 16, utility: 14 },
    power: 39,
    description: "Estase Invulnerável: congela o tempo por 2.5s, anulando dano fatal e ultimates inimigas."
  },
  6653: {
    id: 6653,
    name: "Tormento de Liandry",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3000,
    from: [3145, 1011],
    stats: { damage: 24, tank: 12, push: 14 },
    power: 38,
    description: "Queimadura de Tormento: derrete a vida máxima dos alvos a cada segundo em combate."
  },
  4645: {
    id: 4645,
    name: "Chama Sombria",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3200,
    from: [3145, 1058],
    stats: { damage: 28, scaling: 16 },
    power: 40,
    description: "Florescer da Morte: dano mágico causa acerto crítico contra alvos com menos de 35% de vida."
  },
  3135: {
    id: 3135,
    name: "Cajado do Vazio",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3000,
    from: [1026, 1052],
    stats: { damage: 24, scaling: 20 },
    power: 38,
    description: "Ignora 40% da Resistência Mágica de todos os alvos inimigos."
  },
  6655: {
    id: 6655,
    name: "Companheiro de Luden",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 2900,
    from: [3802, 3145],
    stats: { damage: 26, push: 16, utility: 10 },
    power: 38,
    description: "Dispara projéteis de energia que ricocheteiam pelas tropas e campeões inimigos."
  },
  6657: {
    id: 6657,
    name: "Malevolência",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 2700,
    from: [3802, 3108],
    stats: { damage: 24, utility: 18, scaling: 10 },
    power: 37,
    description: "Queima o solo sob a Ultimate, estilhaçando a resistência mágica adversária."
  },
  3115: {
    id: 3115,
    name: "Dente de Na'Shor",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3000,
    from: [3108, 1043, 1026],
    stats: { damage: 26, push: 22 },
    power: 40,
    description: "Ataques básicos causam dano mágico massivo baseado no Poder de Habilidade."
  },
  4644: {
    id: 4644,
    name: "Criafendas",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 3100,
    from: [3145, 3067],
    stats: { damage: 22, tank: 16, scaling: 14 },
    power: 39,
    description: "Concede vampirismo universal e converte dano em dano verdadeiro prolongado."
  },
  3165: {
    id: 3165,
    name: "Morellonomicon",
    tier: "LEGENDARY",
    class: "Mage",
    cost: 2200,
    from: [3916, 3108],
    stats: { damage: 22, utility: 14 },
    antiHeal: true,
    power: 34,
    description: "Aplica 40% de Feridas Dolorosas graves contra qualquer alvo atingido por feitiços."
  },

  // =========================================================================
  // 7. ITENS LENDÁRIOS COMPLETOS - ATIRADORES (MARKSMAN / ADC)
  // =========================================================================
  3031: {
    id: 3031,
    name: "Gume do Infinito",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3400,
    from: [1038, 1037, 1018],
    stats: { damage: 32, scaling: 22, push: 14 },
    power: 44,
    description: "Aumenta o Dano de Acerto Crítico em 40%, aniquilando a equipe adversária."
  },
  6672: {
    id: 6672,
    name: "Mata-Cráquens",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3100,
    from: [1037, 3086, 1036],
    stats: { damage: 26, push: 18, scaling: 10 },
    power: 39,
    description: "A cada terceiro ataque dispara um golpe devastador com dano cumulativo no mesmo alvo."
  },
  3036: {
    id: 3036,
    name: "Lembranças do Lorde Dominik",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3000,
    from: [1037, 1018],
    stats: { damage: 22, scaling: 20 },
    power: 38,
    description: "Ignora 40% da armadura inimiga, derretendo a linha de frente de tanques."
  },
  3072: {
    id: 3072,
    name: "Sedenta por Sangue",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3400,
    from: [1038, 1037, 1055],
    stats: { damage: 26, tank: 14, scaling: 12 },
    power: 40,
    description: "Concede 18% de Roubo de Vida e gera um escudo protetor contra dano súbito."
  },
  3094: {
    id: 3094,
    name: "Canhão Fumegante",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 2600,
    from: [3086, 1018],
    stats: { damage: 18, push: 18, utility: 12 },
    power: 36,
    description: "Amplifica o alcance de ataque para destruir defesas e cercos com segurança."
  },
  3046: {
    id: 3046,
    name: "Dançarina Fantasma",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 2600,
    from: [3086, 1042],
    stats: { damage: 18, push: 16, utility: 14 },
    power: 36,
    description: "Concede velocidade de ataque fulminante e permite atravessar tropas livremente."
  },
  3033: {
    id: 3033,
    name: "Lembrete Mortal",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3000,
    from: [3123, 1018, 1037],
    stats: { damage: 24, scaling: 14, utility: 12 },
    antiHeal: true,
    power: 38,
    description: "Penetração de armadura acompanhada de Feridas Dolorosas contra curas."
  },
  6673: {
    id: 6673,
    name: "Arco-Escudo Imortal",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3000,
    from: [1037, 1018, 1036],
    stats: { damage: 22, tank: 18, scaling: 10 },
    power: 38,
    description: "Salva-Vidas: concede um escudo salvador ao cair abaixo de 30% de vida."
  },
  6675: {
    id: 6675,
    name: "Flechas Selvagens de Yun Tal",
    tier: "LEGENDARY",
    class: "Marksman",
    cost: 3200,
    from: [1037, 1018, 1036],
    stats: { damage: 26, scaling: 16 },
    power: 39,
    description: "Acertos críticos aplicam sangramento contínuo que queima o adversário."
  },

  // =========================================================================
  // 8. ITENS LENDÁRIOS COMPLETOS - TANQUES (TANKS)
  // =========================================================================
  3084: {
    id: 3084,
    name: "Coração de Aço",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 3000,
    from: [1011, 3067, 1028],
    stats: { tank: 36, scaling: 20, damage: 10 },
    power: 42,
    description: "Consumo Colossal: carrega um golpe destruidor que concede vida permanente a cada luta."
  },
  3068: {
    id: 3068,
    name: "Égide de Fogo Solar",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2700,
    from: [3751, 1031],
    stats: { tank: 24, push: 18, damage: 10 },
    power: 37,
    description: "Imolação Máxima: queima tropas com dano acumulado e acelera empurrão de rotas."
  },
  3143: {
    id: 3143,
    name: "Presságio de Randuin",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2700,
    from: [3082, 1011],
    stats: { tank: 30, utility: 14 },
    power: 37,
    description: "Reduz o dano de acertos críticos recebidos em 30% e desacelera os inimigos."
  },
  3075: {
    id: 3075,
    name: "Armadura de Espinhos",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2700,
    from: [3076, 1011],
    stats: { tank: 28, utility: 12 },
    antiHeal: true,
    power: 37,
    description: "Reflete dano físico baseado na sua armadura e aplica Feridas Dolorosas automáticas."
  },
  6665: {
    id: 6665,
    name: "Jak'Sho, o Inconstante",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 3200,
    from: [1031, 1057, 3067],
    stats: { tank: 36, scaling: 16 },
    power: 40,
    description: "Resiliência do Vazio: a cada segundo em combate ganha armadura e resistência mágica extras."
  },
  2503: {
    id: 2503,
    name: "Rookern Kaênico",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2900,
    from: [1057, 3211],
    stats: { tank: 34, utility: 12 },
    resists: "MR",
    power: 38,
    description: "Gera uma barreira mágica renovável que absorve dano massivo de magos."
  },
  4401: {
    id: 4401,
    name: "Força da Natureza",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2800,
    from: [1057, 3066],
    stats: { tank: 30, utility: 14, push: 10 },
    resists: "MR",
    power: 37,
    description: "Sofrer dano mágico concede acúmulos que reduzem todo dano mágico subsequente em 25%."
  },
  3065: {
    id: 3065,
    name: "Semblante Espiritual",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2700,
    from: [3211, 3067],
    stats: { tank: 28, utility: 14, scaling: 10 },
    resists: "MR",
    power: 37,
    description: "Aumenta todas as curas e escudos recebidos pelo campeão em 25%."
  },
  3025: {
    id: 3025,
    name: "Manopla dos Glacinatas",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2600,
    from: [3057, 1031, 1028],
    stats: { tank: 24, damage: 10, utility: 16 },
    power: 36,
    description: "Após conjurar habilidades, cria uma zona de gelo que congela a velocidade do alvo."
  },
  6664: {
    id: 6664,
    name: "Resplendor Vazio",
    tier: "LEGENDARY",
    class: "Tank",
    cost: 2800,
    from: [3751, 1057],
    stats: { tank: 30, push: 18 },
    resists: "MR",
    power: 38,
    description: "Versão de Resistência Mágica do Fogo Solar: explode tropas e empurra rotas laterais."
  },

  // =========================================================================
  // 9. ITENS LENDÁRIOS COMPLETOS - SUPORTES (SUPPORTS)
  // =========================================================================
  3107: {
    id: 3107,
    name: "Redenção",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2300,
    from: [3023, 3067],
    stats: { utility: 26, tank: 12 },
    power: 34,
    description: "Feixe de Luz Celestial: cura todo o seu time em área mesmo se você já tiver caído."
  },
  3109: {
    id: 3109,
    name: "Juramento do Cavaleiro",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2200,
    from: [3067, 1031],
    stats: { tank: 22, utility: 20 },
    power: 34,
    description: "Sacrifício Leal: liga-se ao Atirador e absorve 12% de todo o dano direcionado a ele."
  },
  2065: {
    id: 2065,
    name: "Hino Bélico de Shurelya",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2200,
    from: [3023, 3067],
    stats: { utility: 30, push: 10 },
    power: 35,
    description: "Arrancada da Batalha: dispara uma onda sonora que acelera toda a equipe para engage."
  },
  4005: {
    id: 4005,
    name: "Mandato Imperial",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2300,
    from: [3023, 3108],
    stats: { damage: 18, utility: 22 },
    power: 35,
    description: "Fogo Coordenado: marcar alvos imobilizados faz aliados causarem dano bônus massivo."
  },
  3190: {
    id: 3190,
    name: "Medalhão dos Solari de Ferro",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2200,
    from: [3067, 1031, 1033],
    stats: { tank: 24, utility: 24 },
    power: 36,
    description: "Abençoa todo o time com uma barreira dourada impenetrável em lutas de equipe."
  },
  3050: {
    id: 3050,
    name: "Convergência de Zeke",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2200,
    from: [3067, 1031],
    stats: { tank: 20, utility: 20, damage: 10 },
    power: 34,
    description: "Tempestade Congelante ao conjurar a ultimate que amplifica o dano do seu time."
  },
  3504: {
    id: 3504,
    name: "Turíbulo Ardente",
    tier: "LEGENDARY",
    class: "Support",
    cost: 2300,
    from: [3023, 1052],
    stats: { utility: 24, damage: 14, scaling: 12 },
    power: 35,
    description: "Curas e escudos aceleram a velocidade de ataque e concedem dano mágico ao atirador."
  }
};

// Calcula combineCost e recipeTree para todos os itens
Object.values(LOL_ITEMS).forEach(item => {
  if (item.from && Array.isArray(item.from)) {
    const componentCostSum = item.from.reduce((sum, compId) => {
      const comp = LOL_ITEMS[compId];
      return sum + (comp ? comp.cost : 0);
    }, 0);
    item.combineCost = Math.max(0, item.cost - componentCostSum);
  } else {
    item.from = [];
    item.combineCost = item.cost;
  }
});

// Categorias organizadas para o modal da Loja de Itens Hextech
export const ITEM_CATEGORIES = [
  { id: "all", name: "Todos os Itens", icon: "🌐" },
  { id: "starter", name: "Iniciais & Doran", icon: "🌱", filter: item => item.tier === "STARTER" },
  { id: "basic", name: "Componentes Básicos", icon: "🗡️", filter: item => item.tier === "BASIC" },
  { id: "epic", name: "Intermediários Épicos", icon: "🔨", filter: item => item.tier === "EPIC" },
  { id: "boots", name: "Botas Aprimoradas", icon: "👢", filter: item => item.tier === "BOOTS" || item.class === "Boots" },
  { id: "fighter", name: "Lutadores (AD)", icon: "🪓", filter: item => item.class === "Fighter" },
  { id: "assassin", name: "Assassinos (Letalidade)", icon: "🗡️", filter: item => item.class === "Assassin" },
  { id: "mage", name: "Magos (AP)", icon: "🔮", filter: item => item.class === "Mage" },
  { id: "marksman", name: "Atiradores (Crítico/AS)", icon: "🏹", filter: item => item.class === "Marksman" },
  { id: "tank", name: "Tanques (Vida/Resistências)", icon: "🛡️", filter: item => item.class === "Tank" },
  { id: "support", name: "Suportes (Utilidade)", icon: "✨", filter: item => item.class === "Support" }
];

// Retorna item por ID
export function getItemById(id) {
  return LOL_ITEMS[id] || null;
}

// Retorna a URL oficial de alta definição do DataDragon
export function getItemIconUrl(itemId) {
  return `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/${itemId}.png`;
}

// Retorna o item inicial recomendado aos 00:00
export function getStarterItemForChampion(champOrId) {
  let champ = champOrId;
  if (typeof champOrId === "string") {
    champ = getChampionById(champOrId);
  } else if (champOrId && champOrId.id && !champOrId.role) {
    champ = getChampionById(champOrId.id) || champOrId;
  }
  if (!champ) return LOL_ITEMS[1055]; // Doran's Blade padrão

  if (champ.role === "jungle") return LOL_ITEMS[1101]; // Cria das Chamas
  if (champ.role === "support") return LOL_ITEMS[3865]; // Atlas Mundial

  if (champ.damageType === "AP" || champ.class === "Mage") return LOL_ITEMS[1056]; // Doran's Ring
  if (champ.class === "Tank") return LOL_ITEMS[1054]; // Doran's Shield
  return LOL_ITEMS[1055]; // Doran's Blade
}

// Retorna a bota recomendada para cada perfil de campeão
export function getRecommendedBootsForChampion(champOrId, oppChampOrId = null) {
  let champ = typeof champOrId === "string" ? getChampionById(champOrId) : champOrId;
  let opp = typeof oppChampOrId === "string" ? getChampionById(oppChampOrId) : oppChampOrId;

  if (opp && (opp.damageType === "AP" || opp.class === "Mage")) {
    return LOL_ITEMS[3111]; // Passos de Mercúrio (MR)
  }
  if (opp && (opp.damageType === "AD" && opp.class === "Marksman")) {
    return LOL_ITEMS[3047]; // Botas Galvanizadas de Aço (Armadura)
  }

  if (!champ) return LOL_ITEMS[3006];
  if (champ.class === "Marksman") return LOL_ITEMS[3006]; // Berserker
  if (champ.class === "Mage") return LOL_ITEMS[3020]; // Feiticeiro
  if (champ.class === "Tank") return LOL_ITEMS[3047]; // Galvanizadas
  if (champ.role === "support") return LOL_ITEMS[3158]; // Lucidez
  if (champ.class === "Assassin") return LOL_ITEMS[3158]; // Lucidez
  return LOL_ITEMS[3047]; // Galvanizadas de Aço
}

// Planos de build oficiais completos de 6 itens (1 Starter/Bota + 5 Lendários)
export const SUBCLASS_FULL_BUILDS = {
  Marksman: [3006, 6672, 3031, 3036, 3072, 3094], // Berserker -> Mata-Cráquens -> Gume -> Dominik -> Sedenta -> Canhão
  ADFighter: [3047, 3078, 3071, 6333, 3053, 6610], // Galvanizadas -> Trindade -> Cutelo -> Dança da Morte -> Sterak -> Céu Dividido
  APFighter: [3020, 4644, 3115, 3157, 3089, 6653], // Feiticeiro -> Criafendas -> Nashor -> Zhonya -> Rabadon -> Liandry
  ADAssassin: [3158, 6692, 3142, 6698, 6694, 6333], // Lucidez -> Eclipse -> Youmuu -> Oportunidade -> Serylda -> Dança da Morte
  APAssassin: [3020, 4645, 3157, 3089, 3135, 6653], // Feiticeiro -> Chama Sombria -> Zhonya -> Rabadon -> Vazio -> Liandry
  Mage: [3020, 6653, 3157, 4645, 3089, 3135], // Feiticeiro -> Liandry -> Zhonya -> Chama Sombria -> Rabadon -> Vazio
  Tank: [3047, 3084, 3068, 3075, 6665, 2503], // Galvanizadas -> Coração de Aço -> Fogo Solar -> Thornmail -> Jak'Sho -> Kaênico
  TankSupport: [3047, 3109, 3190, 3050, 3075, 2503], // Galvanizadas -> Juramento -> Solari -> Zeke -> Thornmail -> Kaênico
  Enchanter: [3158, 3107, 2065, 3504, 4005, 3190] // Lucidez -> Redenção -> Shurelya -> Turíbulo -> Mandato -> Solari
};

export const CLASS_ITEM_BUILDS = {
  Fighter: SUBCLASS_FULL_BUILDS.ADFighter,
  Assassin: SUBCLASS_FULL_BUILDS.ADAssassin,
  Mage: SUBCLASS_FULL_BUILDS.Mage,
  Marksman: SUBCLASS_FULL_BUILDS.Marksman,
  Tank: SUBCLASS_FULL_BUILDS.Tank,
  Support: SUBCLASS_FULL_BUILDS.Enchanter
};

export const SUBCLASS_ITEM_BUILDS = SUBCLASS_FULL_BUILDS;

// Retorna o próximo item lendário ou bota que o campeão quer fechar
export function getRecommendedItemForChampion(champOrId, slotOrItems = 0, opponentChampOrId = null, enemyTeamRoster = null) {
  let champ = typeof champOrId === "string" ? getChampionById(champOrId) : champOrId;
  let opp = typeof opponentChampOrId === "string" ? getChampionById(opponentChampOrId) : opponentChampOrId;
  if (!champ) return null;

  const cSubclass = champ.subclass || (
    champ.class === "Tank" ? "Tank" :
    (champ.class === "Mage" ? "Mage" :
    (champ.class === "Marksman" ? "Marksman" :
    (champ.role === "support" ? "Enchanter" : "ADFighter")))
  );

  let baseBuild = [...(SUBCLASS_FULL_BUILDS[cSubclass] || SUBCLASS_FULL_BUILDS.ADFighter)];

  // CONTRA-ITEMIZAÇÃO ADAPTATIVA:
  if (opp) {
    const oppIsAP = opp.damageType === "AP" || opp.class === "Mage" || opp.subclass === "APFighter" || opp.subclass === "APAssassin";
    const oppHasSustain = opp.hasSustain || ["Aatrox", "Fiora", "Warwick", "Vladimir", "Soraka", "Briar", "Irelia", "Swain", "Sylas"].includes(opp.id);

    // 1. Defesa contra Dano Mágico (Resistência Mágica)
    if (oppIsAP) {
      if (cSubclass === "Tank") {
        baseBuild[2] = 2503; // Rookern Kaênico
        baseBuild[3] = 4401; // Força da Natureza
      } else if (cSubclass === "ADFighter") {
        baseBuild[3] = 3156; // Mandíbula de Malmortius
      } else if (cSubclass === "TankSupport") {
        baseBuild[2] = 3190; // Solari
        baseBuild[4] = 2503; // Rookern Kaênico
      }
    }

    // 2. Corta-Cura / Feridas Dolorosas contra Campeões de Muita Cura
    if (oppHasSustain) {
      if (cSubclass === "Tank" || cSubclass === "TankSupport") {
        baseBuild[2] = 3075; // Thornmail
      } else if (cSubclass === "Mage" || cSubclass === "APFighter" || cSubclass === "APAssassin") {
        baseBuild[3] = 3165; // Morellonomicon
      } else if (cSubclass === "Marksman") {
        baseBuild[3] = 3033; // Lembrete Mortal
      }
    }
  }

  // 3. Penetração contra Múltiplos Tanques no time adversário
  if (enemyTeamRoster) {
    const oppValues = Object.values(enemyTeamRoster);
    let tankCount = 0;
    oppValues.forEach(cId => {
      const c = getChampionById(cId);
      if (c && (c.class === "Tank" || c.subclass === "Tank" || c.subclass === "TankSupport")) tankCount++;
    });

    if (tankCount >= 2) {
      if (cSubclass === "Marksman") baseBuild[3] = 3036; // Lorde Dominik garantido
      if (cSubclass === "Mage" || cSubclass === "APAssassin") baseBuild[4] = 3135; // Cajado do Vazio garantido
    }
  }

  let currentItemIds = [];
  if (Array.isArray(slotOrItems)) {
    currentItemIds = slotOrItems.map(it => (it && it.id) ? Number(it.id) : Number(it));
  }

  // Procura o primeiro item da build que ainda não foi completado
  for (let i = 0; i < baseBuild.length; i++) {
    const candidateId = baseBuild[i];
    if (!currentItemIds.includes(candidateId)) {
      return LOL_ITEMS[candidateId] || null;
    }
  }

  return LOL_ITEMS[baseBuild[baseBuild.length - 1]] || null;
}

// Retorna os componentes imediatos necessários para montar um item
export function getItemRecipeTree(itemId) {
  const item = LOL_ITEMS[itemId];
  if (!item) return null;

  return {
    item,
    components: (item.from || []).map(compChildId => getItemRecipeTree(compChildId)).filter(Boolean)
  };
}

// Retorna a próxima compra ótima (componente básico, intermediário ou combinação final)
export function getNextPurchaseStep(currentInventory, targetItemId, currentGold) {
  return _resolveNextStep(currentInventory, targetItemId, currentGold, true);
}

function _resolveNextStep(currentInventory, targetItemId, currentGold, isRoot = true) {
  const targetItem = LOL_ITEMS[targetItemId];
  if (!targetItem) return null;

  const invIds = currentInventory.map(it => (it && it.id) ? Number(it.id) : Number(it));

  // 1. Se o item não tem receita, precisa ter o ouro integral
  if (!targetItem.from || targetItem.from.length === 0) {
    if (currentGold >= targetItem.cost) {
      return {
        type: isRoot ? "COMPLETE" : "COMPONENT",
        item: targetItem,
        cost: targetItem.cost,
        consumeItems: []
      };
    }
    return null;
  }

  // 2. Verifica quais componentes imediatos da receita o jogador já possui no inventário
  const availableInvIds = [...invIds];
  const matchedComponents = [];
  const missingComponents = [];

  for (const compId of targetItem.from) {
    const foundIdx = availableInvIds.indexOf(compId);
    if (foundIdx !== -1) {
      matchedComponents.push(LOL_ITEMS[compId]);
      availableInvIds.splice(foundIdx, 1);
    } else {
      missingComponents.push(LOL_ITEMS[compId]);
    }
  }

  // Se tem todos os componentes no inventário, precisa apenas do combineCost para concluir o lendário!
  if (missingComponents.length === 0) {
    const combineCost = targetItem.combineCost || 0;
    if (currentGold >= combineCost) {
      return {
        type: "COMBINE",
        item: targetItem,
        cost: combineCost,
        consumeItems: matchedComponents
      };
    }
    return null;
  }

  // Se falta algum componente, tenta comprar o melhor componente que cabe na carteira (ordenado por valor decrescente)
  missingComponents.sort((a, b) => (b.cost || 0) - (a.cost || 0));

  for (const missingComp of missingComponents) {
    // Tenta compra recursiva do componente intermediário
    const subStep = _resolveNextStep(currentInventory, missingComp.id, currentGold, false);
    if (subStep) {
      return subStep;
    }
    // Ou compra direta do componente se couber
    if (currentGold >= missingComp.cost) {
      return {
        type: "COMPONENT",
        item: missingComp,
        cost: missingComp.cost,
        consumeItems: []
      };
    }
  }

  return null;
}
