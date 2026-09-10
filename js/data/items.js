// Catálogo de Itens Lendários Oficiais de League of Legends (Patch 14.20.1)
// Ícones carregados diretamente do CDN oficial do DataDragon:
// https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/{id}.png
import { getChampionById } from "./champions.js";

export const LOL_ITEMS = {
  // === LUTADORES / ASSASSINOS (FIGHTER / ASSASSIN) ===
  3071: {
    id: 3071,
    name: "Cutelo Negro",
    class: "Fighter",
    cost: 3000,
    stats: { damage: 12, tank: 8, push: 6 },
    description: "Causa dano e estilhaça a armadura inimiga."
  },
  3078: {
    id: 3078,
    name: "Força da Trindade",
    class: "Fighter",
    cost: 3333,
    stats: { damage: 15, tank: 6, push: 12 },
    description: "Aumenta drasticamente o dano e a destruição de torres."
  },
  6333: {
    id: 6333,
    name: "Dança da Morte",
    class: "Fighter",
    cost: 3200,
    stats: { damage: 10, tank: 10, scaling: 8 },
    description: "Purga dano contínuo e concede sobrevida após abates."
  },
  6692: {
    id: 6692,
    name: "Eclipse",
    class: "Assassin",
    cost: 2800,
    stats: { damage: 16, push: 6, scaling: 6 },
    description: "Golpes consecutivos concedem escudo e dano percentual."
  },
  3142: {
    id: 3142,
    name: "Lâmina Fantasma de Youmuu",
    class: "Assassin",
    cost: 2700,
    stats: { damage: 18, push: 8 },
    description: "Letalidade pura e velocidade de aproximação fulminante."
  },
  3053: {
    id: 3053,
    name: "Sinal de Sterak",
    class: "Fighter",
    cost: 3200,
    stats: { damage: 8, tank: 14, scaling: 8 },
    description: "Escudo gigantesco ao receber dano massivo."
  },

  // === MAGOS (MAGE) ===
  3089: {
    id: 3089,
    name: "Capuz da Morte de Rabadon",
    class: "Mage",
    cost: 3600,
    stats: { damage: 22, scaling: 14 },
    description: "Multiplica o Poder de Habilidade exponencialmente."
  },
  3157: {
    id: 3157,
    name: "Ampulheta de Zhonya",
    class: "Mage",
    cost: 3250,
    stats: { damage: 12, tank: 10, utility: 8 },
    description: "Estase invulnerável para escapar do foco inimigo."
  },
  6653: {
    id: 6653,
    name: "Tormento de Liandry",
    class: "Mage",
    cost: 3000,
    stats: { damage: 14, tank: 6, push: 8 },
    description: "Queima inimigos com dano baseado na vida máxima."
  },
  4645: {
    id: 4645,
    name: "Chama Sombria",
    class: "Mage",
    cost: 3200,
    stats: { damage: 16, scaling: 10 },
    description: "Dano mágico crítico contra alvos com pouca vida."
  },
  3135: {
    id: 3135,
    name: "Cajado do Vazio",
    class: "Mage",
    cost: 3000,
    stats: { damage: 15, scaling: 12 },
    description: "Penetra as mais densas defesas mágicas."
  },

  // === ATIRADORES (MARKSMAN / ADC) ===
  3031: {
    id: 3031,
    name: "Gume do Infinito",
    class: "Marksman",
    cost: 3400,
    stats: { damage: 20, scaling: 14, push: 10 },
    description: "Críticos devastadores capazes de aniquilar o time inimigo."
  },
  6672: {
    id: 6672,
    name: "Mata-Cráquens",
    class: "Marksman",
    cost: 3100,
    stats: { damage: 16, push: 10 },
    description: "Disparos sucessivos causam dano verdadeiro."
  },
  3036: {
    id: 3036,
    name: "Lembranças do Lorde Dominik",
    class: "Marksman",
    cost: 3000,
    stats: { damage: 14, scaling: 12 },
    description: "Derrete tanques e alvos com mais vida que você."
  },
  3072: {
    id: 3072,
    name: "Sedenta por Sangue",
    class: "Marksman",
    cost: 3400,
    stats: { damage: 14, tank: 8, scaling: 8 },
    description: "Roubo de vida massivo e escudo protetor."
  },
  3094: {
    id: 3094,
    name: "Canhão Fumegante",
    class: "Marksman",
    cost: 2600,
    stats: { damage: 10, push: 12, utility: 6 },
    description: "Aumenta o alcance de ataque para cercar defesas."
  },

  // === TANQUES (TANK) ===
  3084: {
    id: 3084,
    name: "Coração de Aço",
    class: "Tank",
    cost: 3000,
    stats: { tank: 20, scaling: 12, damage: 6 },
    description: "Acumula vida máxima permanente a cada confronto."
  },
  3068: {
    id: 3068,
    name: "Égide de Fogo Solar",
    class: "Tank",
    cost: 2700,
    stats: { tank: 14, push: 10, damage: 6 },
    description: "Queima tropas e inimigos próximos continuamente."
  },
  3143: {
    id: 3143,
    name: "Presságio de Randuin",
    class: "Tank",
    cost: 2700,
    stats: { tank: 18, utility: 8 },
    description: "Reduz o impacto de acertos críticos e desacelera o adversário."
  },
  3075: {
    id: 3075,
    name: "Armadura de Espinhos",
    class: "Tank",
    cost: 2700,
    stats: { tank: 16, utility: 6 },
    description: "Reflete dano físico e aplica Feridas Dolorosas."
  },
  6665: {
    id: 6665,
    name: "Jak'Sho, o Inconstante",
    class: "Tank",
    cost: 3200,
    stats: { tank: 22, scaling: 10 },
    description: "Armadura e resistência mágica aumentam com o tempo de luta."
  },

  // === SUPORTES (SUPPORT) ===
  3107: {
    id: 3107,
    name: "Redenção",
    class: "Support",
    cost: 2300,
    stats: { utility: 16, tank: 8 },
    description: "Feixe de luz celeste que cura aliados e queima inimigos."
  },
  3109: {
    id: 3109,
    name: "Juramento do Cavaleiro",
    class: "Support",
    cost: 2200,
    stats: { tank: 12, utility: 12 },
    description: "Liga-se ao seu atirador para absorver o dano recebido por ele."
  },
  2065: {
    id: 2065,
    name: "Hino Bélico de Shurelya",
    class: "Support",
    cost: 2200,
    stats: { utility: 18, push: 6 },
    description: "Dispara uma explosão de velocidade para iniciações perfeitas."
  },
  4005: {
    id: 4005,
    name: "Mandato Imperial",
    class: "Support",
    cost: 2300,
    stats: { damage: 10, utility: 14 },
    description: "Marca inimigos imobilizados para dano bônus de aliados."
  }
,
  // === RESISTÊNCIA MÁGICA & ITENS TÁTICOS DEFENSIVOS ===
  2503: {
    id: 2503,
    name: "Rookern Kaênico",
    class: "Tank",
    cost: 2900,
    stats: { tank: 22, utility: 8 },
    resists: "MR",
    description: "Concede um escudo protetor contra dano mágico após ficar sem sofrer dano."
  },
  4401: {
    id: 4401,
    name: "Força da Natureza",
    class: "Tank",
    cost: 2800,
    stats: { tank: 20, utility: 8, push: 6 },
    resists: "MR",
    description: "Velocidade de movimento e redução de dano mágico cumulativa em combate."
  },
  3065: {
    id: 3065,
    name: "Semblante Espiritual",
    class: "Tank",
    cost: 2700,
    stats: { tank: 18, utility: 8, scaling: 6 },
    resists: "MR",
    description: "Amplifica todas as curas e escudos recebidos e concede Resistência Mágica."
  },
  3156: {
    id: 3156,
    name: "Mandíbula de Malmortius",
    class: "Fighter",
    cost: 3100,
    stats: { damage: 15, tank: 12 },
    resists: "MR",
    description: "Escudo salva-vidas contra dano mágico fulminante para campeões de dano físico."
  },

  // === ITENS AP PARA LUTADORES E ASSASSINOS MÁGICOS ===
  4644: {
    id: 4644,
    name: "Criafendas",
    class: "Mage",
    cost: 3100,
    stats: { damage: 15, tank: 10, scaling: 8 },
    description: "Concede vampirismo universal e converte dano em dano verdadeiro com o decorrer da luta."
  },
  3115: {
    id: 3115,
    name: "Dente de Na'Shor",
    class: "Mage",
    cost: 3000,
    stats: { damage: 18, push: 14 },
    description: "Ataques básicos causam dano mágico bônus massivo baseado no Poder de Habilidade."
  },
  3165: {
    id: 3165,
    name: "Morellonomicon",
    class: "Mage",
    cost: 2200,
    stats: { damage: 14, utility: 10 },
    antiHeal: true,
    description: "Aplica Feridas Dolorosas graves contra campeões inimigos dependentes de cura."
  },

  // === SUPORTES TANQUES DE ENGAGE & PROTEÇÃO ===
  3190: {
    id: 3190,
    name: "Medalhão dos Solari de Ferro",
    class: "Support",
    cost: 2200,
    stats: { tank: 16, utility: 16 },
    description: "Dispara uma barreira protetora que envolve todos os aliados próximos."
  },
  3050: {
    id: 3050,
    name: "Convergência de Zeke",
    class: "Support",
    cost: 2200,
    stats: { tank: 14, utility: 14, damage: 6 },
    description: "Tempestade congelante ao conjurar a ultimate que amplifica o dano do seu time."
  },
  3504: {
    id: 3504,
    name: "Turíbulo Ardente",
    class: "Support",
    cost: 2300,
    stats: { utility: 16, damage: 8, scaling: 8 },
    description: "Curas e escudos aceleram a velocidade de ataque e concedem dano mágico ao atirador."
  },

  // === AD CORTA-CURA & CONTRA-TANQUES ===
  3033: {
    id: 3033,
    name: "Lembrete Mortal",
    class: "Marksman",
    cost: 3000,
    stats: { damage: 16, utility: 8, scaling: 8 },
    antiHeal: true,
    description: "Penetração de armadura acompanhada de Feridas Dolorosas contra curas."
  }
};

// Garante que cada item tenha sua propriedade power calculada
Object.values(LOL_ITEMS).forEach(item => {
  if (item && item.stats) {
    item.power = Object.values(item.stats).reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0);
  }
});

// Builds pré-configuradas inteligentes por subclasse e perfil de dano real (AD, AP, Tank, Suportes)
export const SUBCLASS_ITEM_BUILDS = {
  // Atiradores (Dano Físico à Distância)
  Marksman: [6672, 3031, 3036, 3072], // Mata-Cráquens -> Gume -> Dominik -> Sedenta
  
  // Lutador AD Físico (Aatrox, Renekton, Darius, Camille, Fiora, Irelia)
  ADFighter: [3078, 3071, 6333, 3053], // Trindade -> Cutelo -> Dança da Morte -> Sterak
  
  // Lutador AP Mágico (Gwen, Mordekaiser, Rumble, Singed, Gragas)
  APFighter: [4644, 3115, 3157, 3089], // Criafendas -> Nashor -> Zhonya -> Rabadon (100% Mágico!)
  
  // Assassino AD Físico (Zed, Talon, Kha'Zix, Pyke)
  ADAssassin: [6692, 3142, 6333, 3071], // Eclipse -> Youmuu -> Dança da Morte -> Cutelo
  
  // Assassino AP Mágico (Akali, Katarina, LeBlanc, Ekko, Fizz)
  APAssassin: [4645, 3157, 3089, 3135], // Chama Sombria -> Zhonya -> Rabadon -> Vazio (100% Mágico!)
  
  // Mago Tradicional (Syndra, Orianna, Ahri, Viktor, Veigar)
  Mage: [6653, 3157, 4645, 3089], // Liandry -> Zhonya -> Chama Sombria -> Rabadon
  
  // Tanques de Linha de Frente (Ornn, Sion, Cho'Gath, Malphite, Sejuani)
  Tank: [3084, 3068, 3075, 6665], // Coração de Aço -> Fogo Solar -> Thornmail -> Jak'Sho
  
  // Suporte Tanque Engage (Nautilus, Leona, Braum, Alistar, Thresh, Blitzcrank)
  TankSupport: [3109, 3190, 3050, 3075], // Juramento -> Solari -> Zeke -> Thornmail
  
  // Suporte Encantador (Lulu, Nami, Janna, Soraka, Milio, Yuumi)
  Enchanter: [3107, 2065, 3504, 4005] // Redenção -> Shurelya -> Turíbulo -> Mandato
};

// Mantém compatibilidade com referências legadas
export const CLASS_ITEM_BUILDS = {
  Fighter: SUBCLASS_ITEM_BUILDS.ADFighter,
  Assassin: SUBCLASS_ITEM_BUILDS.ADAssassin,
  Mage: SUBCLASS_ITEM_BUILDS.Mage,
  Marksman: SUBCLASS_ITEM_BUILDS.Marksman,
  Tank: SUBCLASS_ITEM_BUILDS.Tank,
  Support: SUBCLASS_ITEM_BUILDS.Enchanter
};

// Retorna o item recomendado para o campeão com contra-itemização adaptativa da rota
export function getRecommendedItemForChampion(champOrId, slotOrItems = 0, opponentChampOrId = null, enemyTeamRoster = null) {
  let champ = champOrId;
  if (typeof champOrId === "string") {
    champ = getChampionById(champOrId);
  } else if (champOrId && champOrId.id && (!champOrId.class && !champOrId.subclass)) {
    champ = getChampionById(champOrId.id) || champOrId;
  }
  if (!champ) return null;

  let opp = opponentChampOrId;
  if (typeof opponentChampOrId === "string") {
    opp = getChampionById(opponentChampOrId);
  } else if (opponentChampOrId && opponentChampOrId.id && (!opponentChampOrId.class && !opponentChampOrId.subclass)) {
    opp = getChampionById(opponentChampOrId.id) || opponentChampOrId;
  }

  // Determina subclasse precisa do campeão
  const cSubclass = champ.subclass || (
    champ.class === "Tank" ? "Tank" :
    (champ.class === "Mage" ? "Mage" :
    (champ.class === "Marksman" ? "Marksman" :
    (champ.role === "support" ? "Enchanter" : "ADFighter")))
  );

  let baseBuild = [...(SUBCLASS_ITEM_BUILDS[cSubclass] || SUBCLASS_ITEM_BUILDS.ADFighter)];

  // CONTRA-ITEMIZAÇÃO ADAPTATIVA:
  if (opp) {
    const oppIsAP = opp.damageType === "AP" || opp.class === "Mage" || opp.subclass === "APFighter" || opp.subclass === "APAssassin";
    const oppHasSustain = opp.hasSustain || ["Aatrox", "Fiora", "Warwick", "Vladimir", "Soraka", "Briar", "Irelia", "Swain", "Sylas"].includes(opp.id);

    // 1. Defesa contra Dano Mágico (Resistência Mágica)
    if (oppIsAP) {
      if (cSubclass === "Tank") {
        // Tanque contra AP compra Kaênico no 2º item e Força da Natureza no 3º
        baseBuild[1] = 2503; // Rookern Kaênico
        baseBuild[2] = 4401; // Força da Natureza
      } else if (cSubclass === "ADFighter") {
        // Lutador AD contra AP compra Mandíbula de Malmortius no 3º item
        baseBuild[2] = 3156; // Mandíbula de Malmortius
      } else if (cSubclass === "TankSupport") {
        // Suporte Tanque contra muito AP prioriza Solari e Kaênico
        baseBuild[1] = 3190; // Solari
        baseBuild[3] = 2503; // Rookern Kaênico
      }
    }

    // 2. Corta-Cura / Feridas Dolorosas contra Campeões de Muita Cura (Aatrox, Fiora, Warwick, Soraka)
    if (oppHasSustain) {
      if (cSubclass === "Tank" || cSubclass === "TankSupport") {
        // Tanque adianta Armadura de Espinhos para o 2º item
        baseBuild[1] = 3075; // Thornmail
      } else if (cSubclass === "Mage" || cSubclass === "APFighter" || cSubclass === "APAssassin") {
        // Magos e Lutadores AP compram Morellonomicon no 3º item
        baseBuild[2] = 3165; // Morellonomicon
      } else if (cSubclass === "Marksman") {
        // Atirador compra Lembrete Mortal no 3º item
        baseBuild[2] = 3033; // Lembrete Mortal
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
      if (cSubclass === "Marksman") baseBuild[2] = 3036; // Lorde Dominik garantido
      if (cSubclass === "Mage" || cSubclass === "APAssassin") baseBuild[3] = 3135; // Cajado do Vazio garantido
    }
  }

  let currentItemIds = [];
  let slotIndex = 0;
  if (Array.isArray(slotOrItems)) {
    currentItemIds = slotOrItems.map(it => (it && it.id) ? Number(it.id) : Number(it));
    slotIndex = slotOrItems.length;
  } else if (typeof slotOrItems === "number") {
    slotIndex = slotOrItems;
  }

  for (let i = 0; i < baseBuild.length; i++) {
    const candidateId = baseBuild[(slotIndex + i) % baseBuild.length];
    if (!currentItemIds.includes(candidateId)) {
      return LOL_ITEMS[candidateId] || null;
    }
  }

  return LOL_ITEMS[baseBuild[slotIndex % baseBuild.length]] || null;
}

// Retorna a URL do ícone oficial de um item do LoL
export function getItemIconUrl(itemId) {
  return `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/${itemId}.png`;
}
