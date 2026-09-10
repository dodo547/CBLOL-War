// Aprimoramentos e Buffs Hextech adquiridos entre rodadas do CBLOL
export const HEXTECH_UPGRADES = [
  {
    id: "infernal_soul",
    name: "Alma do Dragão Infernal",
    icon: "🔥",
    description: "+12 de Dano e Burst em todas as lutas de equipe.",
    rarity: "Épico",
    effect: { damage: 12 }
  },
  {
    id: "mountain_soul",
    name: "Alma da Montanha",
    icon: "🛡️",
    description: "+14 de Resistência e Proteção para aguentar o cerco.",
    rarity: "Épico",
    effect: { tank: 14 }
  },
  {
    id: "baron_blessing",
    name: "Mão do Barão Na'Shor",
    icon: "👑",
    description: "+18 de Poder de Siege. Destrói torres e inibidores em velocidade recorde.",
    rarity: "Lendário",
    effect: { push: 18 }
  },
  {
    id: "chemtech_drake",
    name: "Bênção Quimtec",
    icon: "🧪",
    description: "+10 de Utilidade e +6 de Dano com gás tóxico em combate.",
    rarity: "Raro",
    effect: { utility: 10, damage: 6 }
  },
  {
    id: "elder_execution",
    name: "Chama do Ancião",
    icon: "🐲",
    description: "+15 de Escalamento para liquidar alvos com pouca vida.",
    rarity: "Mítico",
    effect: { scaling: 15, damage: 8 }
  },
  {
    id: "herald_eye",
    name: "Olho do Arauto Ocular",
    icon: "👁️",
    description: "+15 de Siege para arrombar as primeiras torres do inimigo.",
    rarity: "Raro",
    effect: { push: 15 }
  },
  {
    id: "hextech_teleport",
    name: "Portais Hextec das Lendas",
    icon: "🌀",
    description: "+12 de Utilidade e flancos perfeitos nos confrontos.",
    rarity: "Raro",
    effect: { utility: 12 }
  },
  {
    id: "guardian_angel_squad",
    name: "Anjo Guardião Coletivo",
    icon: "👼",
    description: "+10 de Resistência e +8 de Escalamento no late game.",
    rarity: "Épico",
    effect: { tank: 10, scaling: 8 }
  }
];

export function getRandomUpgrades(count = 3, excludeIds = []) {
  const available = HEXTECH_UPGRADES.filter(u => !excludeIds.includes(u.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
