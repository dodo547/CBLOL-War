// Times clássicos do CBLOL e suas identidades competitivas
export const CBLOL_TEAMS = [
  {
    id: "pain",
    name: "paiN Gaming",
    tag: "PNG",
    color: "#e62534",
    accent: "#111111",
    logoText: "PNG",
    iconUrl: "assets/icons/pain_2025.jpg",
    logo: "assets/icons/pain_2025.jpg",
    quote: "A maior e mais barulhenta torcida do Brasil. Tradição pura!",
    tier: "S",
    playstyle: "Team Fight",
    stats: { combat: 88, macro: 85, siege: 84 },
    defaultRoster: {
      top: "Aatrox",
      jungle: "Viego",
      mid: "Syndra",
      adc: "Jinx",
      support: "Nautilus"
    },
    roster: {
      top: "Aatrox",
      jungle: "Viego",
      mid: "Syndra",
      adc: "Jinx",
      support: "Nautilus"
    },
    players: {
      top: "wizer", jungle: "cariok", mid: "dynquedo", adc: "titan", support: "kabbie"
    }
  },
  {
    id: "loud",
    name: "LOUD",
    tag: "LLL",
    color: "#00ff73",
    accent: "#0b0e14",
    logoText: "LOUD",
    iconUrl: "assets/icons/loud_2025.jpg",
    logo: "assets/icons/loud_2025.jpg",
    quote: "Domínio, intensidade e jogadas acrobáticas no Rift.",
    tier: "S",
    playstyle: "Agressivo",
    stats: { combat: 90, macro: 87, siege: 82 },
    defaultRoster: {
      top: "KSante",
      jungle: "LeeSin",
      mid: "Ahri",
      adc: "Kaisa",
      support: "Rakan"
    },
    roster: {
      top: "KSante",
      jungle: "LeeSin",
      mid: "Ahri",
      adc: "Kaisa",
      support: "Rakan"
    },
    players: {
      top: "robo", jungle: "croc", mid: "tinowns", adc: "route", support: "ceos"
    }
  },
  {
    id: "red",
    name: "RED Canids Kalunga",
    tag: "RED",
    color: "#e51b24",
    accent: "#f4c430",
    logoText: "RED",
    iconUrl: "assets/icons/red_2025.jpg",
    logo: "assets/icons/red_2025.jpg",
    quote: "A Matilha nunca perdoa. Imprevisíveis e letais.",
    tier: "A",
    playstyle: "Early Game",
    stats: { combat: 85, macro: 82, siege: 80 },
    defaultRoster: {
      top: "Renekton",
      jungle: "JarvanIV",
      mid: "Yone",
      adc: "Lucian",
      support: "Leona"
    },
    roster: {
      top: "Renekton",
      jungle: "JarvanIV",
      mid: "Yone",
      adc: "Lucian",
      support: "Leona"
    },
    players: {
      top: "fnb", jungle: "aegis", mid: "envy", adc: "brance", support: "jojo"
    }
  },
  {
    id: "keyd",
    name: "Vivo Keyd Stars",
    tag: "VKS",
    color: "#8338ec",
    accent: "#ffffff",
    logoText: "VKS",
    iconUrl: "assets/icons/keyd_2025.jpg",
    logo: "assets/icons/keyd_2025.jpg",
    quote: "Guerreiros metódicos. Controle de mapa cirúrgico.",
    tier: "A",
    playstyle: "Controle & Macro",
    stats: { combat: 83, macro: 88, siege: 81 },
    defaultRoster: {
      top: "Gnar",
      jungle: "Sejuani",
      mid: "Orianna",
      adc: "Varus",
      support: "Thresh"
    },
    roster: {
      top: "Gnar",
      jungle: "Sejuani",
      mid: "Orianna",
      adc: "Varus",
      support: "Thresh"
    },
    players: {
      top: "guigo", jungle: "disamis", mid: "grevthar", adc: "matsukaze", support: "redbert"
    }
  },
  {
    id: "furia",
    name: "FURIA",
    tag: "FUR",
    color: "#1a1a1a",
    accent: "#ffffff",
    logoText: "FUR",
    iconUrl: "assets/icons/furia_2025.jpg",
    logo: "assets/icons/furia_2025.jpg",
    quote: "Garras afiadas, velocidade e lutas sem freio.",
    tier: "B+",
    playstyle: "Skirmish / Duelo",
    stats: { combat: 82, macro: 79, siege: 83 },
    defaultRoster: {
      top: "Jax",
      jungle: "Vi",
      mid: "Akali",
      adc: "Ezreal",
      support: "Alistar"
    },
    roster: {
      top: "Jax",
      jungle: "Vi",
      mid: "Akali",
      adc: "Ezreal",
      support: "Alistar"
    },
    players: {
      top: "hidan", jungle: "ranger", mid: "takeshi", adc: "netuno", support: "jockster"
    }
  },
  {
    id: "kabum",
    name: "KaBuM! Esports",
    tag: "KBM",
    color: "#ff6600",
    accent: "#111111",
    logoText: "KBM",
    iconUrl: "assets/icons/kabum.jpg",
    logo: "assets/icons/kabum.jpg",
    quote: "Os ninjas pioneiros do Brasil. Foco implacável em torres.",
    tier: "B+",
    playstyle: "Siege & Objetivos",
    stats: { combat: 80, macro: 81, siege: 86 },
    defaultRoster: {
      top: "Sion",
      jungle: "Graves",
      mid: "Azir",
      adc: "Tristana",
      support: "Braum"
    },
    roster: {
      top: "Sion",
      jungle: "Graves",
      mid: "Azir",
      adc: "Tristana",
      support: "Braum"
    },
    players: {
      top: "lep", jungle: "sirt", mid: "tockers", adc: "micao", support: "dioud"
    }
  },
  {
    id: "fluxo",
    name: "Fluxo",
    tag: "FX",
    color: "#00d2ff",
    accent: "#7928ca",
    logoText: "FX",
    iconUrl: "assets/icons/fluxo_2025.jpg",
    logo: "assets/icons/fluxo_2025.jpg",
    quote: "A nova geração no Rift, jogando com ousadia e ritmo.",
    tier: "B",
    playstyle: "Late Game",
    stats: { combat: 79, macro: 78, siege: 80 },
    defaultRoster: {
      top: "Camille",
      jungle: "Kindred",
      mid: "Viktor",
      adc: "Aphelios",
      support: "Lulu"
    },
    roster: {
      top: "Camille",
      jungle: "Kindred",
      mid: "Viktor",
      adc: "Aphelios",
      support: "Lulu"
    },
    players: {
      top: "guigo", jungle: "disamis", mid: "yoda", adc: "netuno", support: "jojo"
    }
  },
  {
    id: "intz",
    name: "INTZ",
    tag: "ITZ",
    color: "#d4af37",
    accent: "#111111",
    logoText: "ITZ",
    iconUrl: "assets/icons/intz.jpg",
    logo: "assets/icons/intz.jpg",
    quote: "Os Intrépidos. Cinco títulos do CBLOL e o peso da história.",
    tier: "A",
    playstyle: "Macro & Tradição",
    stats: { combat: 84, macro: 87, siege: 82 },
    defaultRoster: {
      top: "Darius",
      jungle: "XinZhao",
      mid: "Jayce",
      adc: "Ashe",
      support: "Leona"
    },
    roster: {
      top: "Darius",
      jungle: "XinZhao",
      mid: "Jayce",
      adc: "Ashe",
      support: "Leona"
    },
    players: {
      top: "yang", jungle: "revolta", mid: "kami", adc: "micao", support: "esa"
    }
  },
  {
    id: "los",
    name: "Los Grandes",
    tag: "LOS",
    color: "#ff6a00",
    accent: "#111111",
    logoText: "LOS",
    iconUrl: "assets/icons/los_grandes.svg",
    logo: "assets/icons/los_grandes.svg",
    quote: "A Onda Laranja invadiu o Rift com agressividade implacável.",
    tier: "B+",
    playstyle: "Agressivo & Team Fight",
    stats: { combat: 83, macro: 80, siege: 81 },
    defaultRoster: {
      top: "Sett",
      jungle: "Hecarim",
      mid: "Sylas",
      adc: "Jinx",
      support: "Nautilus"
    },
    roster: {
      top: "Sett",
      jungle: "Hecarim",
      mid: "Sylas",
      adc: "Jinx",
      support: "Nautilus"
    },
    players: {
      top: "fnb", jungle: "ranger", mid: "envy", adc: "brance", support: "kabbie"
    }
  },
  {
    id: "liberty",
    name: "Liberty",
    tag: "LBR",
    color: "#10b981",
    accent: "#0f172a",
    logoText: "LBR",
    iconUrl: "assets/icons/liberty.svg",
    logo: "assets/icons/liberty.svg",
    quote: "Inovação, disciplina e sangue novo no cenário competitivo.",
    tier: "B",
    playstyle: "Controle & Inovação",
    stats: { combat: 78, macro: 82, siege: 79 },
    defaultRoster: {
      top: "Ornn",
      jungle: "MonkeyKing",
      mid: "Veigar",
      adc: "Vayne",
      support: "Thresh"
    },
    roster: {
      top: "Ornn",
      jungle: "MonkeyKing",
      mid: "Veigar",
      adc: "Vayne",
      support: "Thresh"
    },
    players: {
      top: "hidan", jungle: "aegis", mid: "dynquedo", adc: "matsukaze", support: "redbert"
    }
  },
  {
    id: "flamengo",
    name: "Flamengo Esports",
    tag: "FLA",
    color: "#c00000",
    accent: "#111111",
    logoText: "FLA",
    iconUrl: "assets/icons/flamengo.jpg",
    logo: "assets/icons/flamengo.jpg",
    quote: "Uma Nação no Summoner's Rift. Tradição campeã e raça até o Nexus.",
    tier: "A",
    playstyle: "Team Fight & Raça",
    stats: { combat: 86, macro: 83, siege: 83 },
    defaultRoster: {
      top: "Mordekaiser",
      jungle: "Nocturne",
      mid: "Zed",
      adc: "Caitlyn",
      support: "Morgana"
    },
    roster: {
      top: "Mordekaiser",
      jungle: "Nocturne",
      mid: "Zed",
      adc: "Caitlyn",
      support: "Morgana"
    },
    players: {
      top: "robo", jungle: "ranger", mid: "grevthar", adc: "brtt", support: "redbert"
    }
  },
  {
    id: "idl",
    name: "Ilha das Lendas",
    tag: "IDL",
    color: "#ffd700",
    accent: "#1e1b4b",
    logoText: "IDL",
    iconUrl: "assets/icons/idl.svg",
    logo: "assets/icons/idl.svg",
    quote: "A voz e a energia da comunidade em busca da glória máxima!",
    tier: "B+",
    playstyle: "Caos & Playmaking",
    stats: { combat: 82, macro: 81, siege: 84 },
    defaultRoster: {
      top: "Aatrox",
      jungle: "LeeSin",
      mid: "Ahri",
      adc: "Lucian",
      support: "Braum"
    },
    roster: {
      top: "Aatrox",
      jungle: "LeeSin",
      mid: "Ahri",
      adc: "Lucian",
      support: "Braum"
    },
    players: {
      top: "mylon", jungle: "revolta", mid: "yoda", adc: "brtt", support: "dioud"
    }
  },
  {
    id: "rise",
    name: "Rise Gaming",
    tag: "RISE",
    color: "#3b82f6",
    accent: "#1e293b",
    logoText: "RISE",
    iconUrl: "assets/icons/rise_gaming.svg",
    logo: "assets/icons/rise_gaming.svg",
    quote: "Ascensão meteórica, estratégia jovem e ritmo frenético.",
    tier: "B",
    playstyle: "Early Push",
    stats: { combat: 79, macro: 79, siege: 81 },
    defaultRoster: {
      top: "Gnar",
      jungle: "Vi",
      mid: "Akali",
      adc: "Ezreal",
      support: "Rakan"
    },
    roster: {
      top: "Gnar",
      jungle: "Vi",
      mid: "Akali",
      adc: "Ezreal",
      support: "Rakan"
    },
    players: {
      top: "hidan", jungle: "croc", mid: "tockers", adc: "netuno", support: "jojo"
    }
  }
];
