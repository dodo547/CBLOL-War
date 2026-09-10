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
};

// Garante que cada item tenha sua propriedade power calculada
Object.values(LOL_ITEMS).forEach(item => {
  if (item && item.stats) {
    item.power = Object.values(item.stats).reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0);
  }
});

// Builds pré-configuradas de 4 itens por classe/papel
export const CLASS_ITEM_BUILDS = {
  Fighter: [3078, 3071, 6333, 3053],     // Trindade -> Cutelo -> Dança da Morte -> Sterak
  Assassin: [6692, 3142, 6333, 3071],    // Eclipse -> Youmuu -> Dança da Morte -> Cutelo
  Mage: [6653, 3157, 4645, 3089],        // Liandry -> Zhonya -> Chama Sombria -> Rabadon
  Marksman: [6672, 3031, 3036, 3072],    // Mata-Cráquens -> Gume -> Dominik -> Sedenta
  Tank: [3084, 3068, 3075, 6665],        // Coração de Aço -> Fogo Solar -> Thornmail -> Jak'Sho
  Support: [3107, 3109, 2065, 4005]      // Redenção -> Juramento -> Shurelya -> Mandato
};

// Retorna o item recomendado para o campeão na posição do slot (0 a 3) ou próximo item não construído
export function getRecommendedItemForChampion(champOrId, slotOrItems = 0) {
  let champ = champOrId;
  if (typeof champOrId === "string") {
    champ = getChampionById(champOrId);
  } else if (champOrId && champOrId.id && (!champOrId.class && !champOrId.role)) {
    champ = getChampionById(champOrId.id) || champOrId;
  }
  if (!champ) return null;

  const cClass = champ.class || (champ.role === "support" ? "Support" : (champ.role === "adc" ? "Marksman" : "Fighter"));
  const build = CLASS_ITEM_BUILDS[cClass] || CLASS_ITEM_BUILDS.Fighter;

  let currentItemIds = [];
  let slotIndex = 0;
  if (Array.isArray(slotOrItems)) {
    currentItemIds = slotOrItems.map(it => (it && it.id) ? Number(it.id) : Number(it));
    slotIndex = slotOrItems.length;
  } else if (typeof slotOrItems === "number") {
    slotIndex = slotOrItems;
  }

  for (let i = 0; i < build.length; i++) {
    const candidateId = build[(slotIndex + i) % build.length];
    if (!currentItemIds.includes(candidateId)) {
      return LOL_ITEMS[candidateId] || null;
    }
  }

  return LOL_ITEMS[build[slotIndex % build.length]] || null;
}

// Retorna a URL do ícone oficial de um item do LoL
export function getItemIconUrl(itemId) {
  return `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/${itemId}.png`;
}
