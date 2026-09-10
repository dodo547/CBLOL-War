// Banco de Dados de Pro Players do CBLOL (Lendas Históricas e Estrelas Atuais)
export const PRO_PLAYERS = [
  // ================= TOP LANERS =================
  {
    id: "hidan",
    nick: "Hidan",
    name: "Gabriel Santos",
    role: "top",
    era: "current",
    team: "CBLOL Star",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/89/FX7M_Hidan_2025_Split_2.png",
    signatureChampions: ["Fiora", "Camille", "Aatrox", "Irelia", "Jax"],
    traits: "Duelista Implacável & Split Push",
    quote: "Nem clica na rota superior!",
    stats: { mechanics: 91, aggression: 93, consistency: 87 }
  },
  {
    id: "robo",
    nick: "Robo",
    name: "Leonardo Souza",
    role: "top",
    era: "current",
    team: "LOUDesports",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e8/PAIN_Robo_2026_Split_1.png",
    signatureChampions: ["Aatrox", "Renekton", "Gnar", "Jax", "KSante"],
    traits: "Rei dos Dives & Campeão Multitítulo",
    quote: "O pai tá on e roteando no top!",
    stats: { mechanics: 93, aggression: 95, consistency: 90 }
  },
  {
    id: "fnb",
    nick: "fNb",
    name: "Francisco Braz",
    role: "top",
    era: "current",
    team: "RED Canids",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a9/RED_fNb_2026_Split_1.png",
    signatureChampions: ["Renekton", "Gnar", "Aatrox", "Jayce"],
    traits: "Pressão de Rota & Teamfights",
    quote: "Vou atropelar no flanco.",
    stats: { mechanics: 89, aggression: 88, consistency: 88 }
  },
  {
    id: "wizer",
    nick: "Wizer",
    name: "Choi Ui-seok",
    role: "top",
    era: "current",
    team: "paiN Gaming",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/53/LOUD_Wiz_LTA_2025_Split_1.png",
    signatureChampions: ["Renekton", "Aatrox", "Kennen", "Gnar"],
    traits: "Muralha Coreana & Solidez Mecânica",
    quote: "Foco total na vitória.",
    stats: { mechanics: 92, aggression: 89, consistency: 92 }
  },
  {
    id: "guigo",
    nick: "Guigo",
    name: "Guilherme Ruiz",
    role: "top",
    era: "current",
    team: "Vivo Keyd Stars",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a5/FUR_Guigo_2026_Split_2.png",
    signatureChampions: ["Gnar", "Renekton", "Aatrox", "Camille"],
    traits: "Versatilidade & Flancos Cirúrgicos",
    quote: "A brecha apareceu, eu entro.",
    stats: { mechanics: 88, aggression: 87, consistency: 89 }
  },
  // TOP LEGENDS
  {
    id: "mylon",
    nick: "Mylon",
    name: "Matheus Borges",
    role: "top",
    era: "legend",
    team: "Lenda do CBLOL / paiN",
    avatar: "https://liquipedia.net/commons/images/4/44/Mylon_CBLOL_2022_Split_2_Finals.jpg",
    signatureChampions: ["Renekton", "Shen", "Gnar", "Maokai"],
    traits: "Lenda Histórica & Agressividade Raiz",
    quote: "Eu não perco essa rota nem se vier os 5!",
    stats: { mechanics: 92, aggression: 96, consistency: 88 }
  },
  {
    id: "yang",
    nick: "Yang",
    name: "Felipe Zhao",
    role: "top",
    era: "legend",
    team: "Lenda do CBLOL / INTZ",
    avatar: "https://liquipedia.net/commons/images/9/94/KEYD_Yang_2018CBLOL.jpg",
    signatureChampions: ["Gnar", "Fiora", "Maokai", "Ekko"],
    traits: "Ex-campeão Mundial & Consistência Pura",
    quote: "Paciência e execução impecável.",
    stats: { mechanics: 90, aggression: 86, consistency: 93 }
  },
  {
    id: "lep",
    nick: "Lep",
    name: "Pedro Marcari",
    role: "top",
    era: "legend",
    team: "Lenda do CBLOL / KaBuM!",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/bb/RED_LEP_2018_Split_2.png",
    signatureChampions: ["Renekton", "Jax", "Irelia"],
    traits: "O Clássico Teleporte & Garra",
    quote: "Aqui é KaBuM no Worlds!",
    stats: { mechanics: 87, aggression: 90, consistency: 84 }
  },

  // ================= JUNGLERS =================
  {
    id: "cariok",
    nick: "Cariok",
    name: "Marcos Santos",
    role: "jungle",
    era: "current",
    team: "paiN Gaming",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8f/PAIN_CarioK_2026_Split_2.png",
    signatureChampions: ["LeeSin", "Viego", "JarvanIV", "Sejuani", "Vi"],
    traits: "Soberania nos Objetivos & Smite Preciso",
    quote: "O covil do Dragão é meu território!",
    stats: { mechanics: 91, aggression: 90, consistency: 91 }
  },
  {
    id: "croc",
    nick: "Croc",
    name: "Park Jong-hoon",
    role: "jungle",
    era: "current",
    team: "LOUDesports",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f0/LOUD_Croc_2024_Split_2.png",
    signatureChampions: ["LeeSin", "Sejuani", "Wukong", "Vi"],
    traits: "Invasões Aceleradas & Sinergia Campeã",
    quote: "Gank no nível 2 sem hesitar.",
    stats: { mechanics: 92, aggression: 94, consistency: 89 }
  },
  {
    id: "aegis",
    nick: "Aegis",
    name: "Gabriel Lemos",
    role: "jungle",
    era: "current",
    team: "RED Canids",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d3/TSS_Aegis_2026_Split_1.png",
    signatureChampions: ["Viego", "LeeSin", "XinZhao", "JarvanIV"],
    traits: "Prodígio Mecânico & Agressividade",
    quote: "A selva deles agora é minha.",
    stats: { mechanics: 90, aggression: 92, consistency: 88 }
  },
  {
    id: "disamis",
    nick: "Disamis",
    name: "Pedro Henrique",
    role: "jungle",
    era: "current",
    team: "Vivo Keyd Stars",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/29/VKS_Disamis_2026_Split_1.png",
    signatureChampions: ["Sejuani", "JarvanIV", "Viego", "LeeSin"],
    traits: "Controle de Ritmo & Iniciações Cirúrgicas",
    quote: "Lendo cada movimento do caçador rival.",
    stats: { mechanics: 89, aggression: 87, consistency: 91 }
  },
  // JUNGLE LEGENDS
  {
    id: "revolta",
    nick: "Revolta",
    name: "Gabriel Henud",
    role: "jungle",
    era: "legend",
    team: "Lenda do CBLOL / INTZ",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/TL_Revolta.png",
    signatureChampions: ["LeeSin", "Elise", "JarvanIV"],
    traits: "O Maior Jungle da História do Brasil",
    quote: "O roubo de Barão mais épico da sua vida!",
    stats: { mechanics: 95, aggression: 94, consistency: 94 }
  },
  {
    id: "ranger",
    nick: "Ranger",
    name: "Filipe Brombilla",
    role: "jungle",
    era: "legend",
    team: "Lenda do CBLOL / KaBuM!",
    avatar: "https://liquipedia.net/commons/images/5/59/Ranger_Los.jpg",
    signatureChampions: ["JarvanIV", "LeeSin", "Sejuani", "Gragas"],
    traits: "Liderança Tática & Duelo Psicológico",
    quote: "Já tá na mente do adversário desde o draft.",
    stats: { mechanics: 89, aggression: 93, consistency: 89 }
  },
  {
    id: "sirt",
    nick: "SirT",
    name: "Thúlio Carlos",
    role: "jungle",
    era: "legend",
    team: "Lenda do CBLOL / paiN",
    avatar: "https://liquipedia.net/commons/images/f/fa/SirT_at_CBLOL_2026_Split_2_Classic_Showmatch.jpeg",
    signatureChampions: ["JarvanIV", "LeeSin", "Amumu", "Elise"],
    traits: "Camisa Pesada & Smite de Ouro",
    quote: "Com a paiN no peito até o fim!",
    stats: { mechanics: 88, aggression: 89, consistency: 90 }
  },

  // ================= MID LANERS =================
  {
    id: "tinowns",
    nick: "Tinowns",
    name: "Thiago Sartori",
    role: "mid",
    era: "current",
    team: "LOUDesports",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f9/PAIN_tinowns_2026_Split_1.png",
    signatureChampions: ["Ahri", "Azir", "Syndra", "Orianna", "Viktor"],
    traits: "Gênio do Posicionamento & MVP Histórico",
    quote: "Teamfight é paciência e execução perfeita.",
    stats: { mechanics: 95, aggression: 89, consistency: 96 }
  },
  {
    id: "dynquedo",
    nick: "Dynquedo",
    name: "Matheus Rossini",
    role: "mid",
    era: "current",
    team: "paiN Gaming",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d0/PAIN_dyNquedo_LTA_2025_Split_1.png",
    signatureChampions: ["Syndra", "Azir", "Ahri", "Orianna", "Yone"],
    traits: "Decisivo nos Playoffs & Sangue Frio",
    quote: "Em final de campeonato, a bola vem pra mim.",
    stats: { mechanics: 93, aggression: 91, consistency: 92 }
  },
  {
    id: "envy",
    nick: "Envy",
    name: "Lee Kang-eun",
    role: "mid",
    era: "current",
    team: "RED Canids",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/52/EST_Envy_2026_Split_2.png",
    signatureChampions: ["LeBlanc", "Azir", "Yone", "Ahri"],
    traits: "Outplays Rápidos & Assassinos Mecânicos",
    quote: "Pisquei e seu carregador sumiu.",
    stats: { mechanics: 92, aggression: 94, consistency: 88 }
  },
  {
    id: "grevthar",
    nick: "Grevthar",
    name: "Daniel Xavier",
    role: "mid",
    era: "current",
    team: "CBLOL Star",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/ec/KBM_Grevthar_2026_Split_1.png",
    signatureChampions: ["Galio", "Sylas", "Sett", "Lissandra"],
    traits: "Coração Gigante & Roaming Pelas Rotas",
    quote: "Jogo pro time e pra vencer!",
    stats: { mechanics: 88, aggression: 93, consistency: 90 }
  },
  // MID LEGENDS
  {
    id: "yoda",
    nick: "YoDa",
    name: "Felipe Noronha",
    role: "mid",
    era: "legend",
    team: "Lenda do CBLOL / RED",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d8/BR_YoDa_2018_AS.png",
    signatureChampions: ["Ahri", "Katarina", "Syndra", "Ryze", "Cassiopeia"],
    traits: "É O FON! Solador de Campeões & Energia Caótica",
    quote: "SOLADO! É o Fon! Aqui é high level!",
    stats: { mechanics: 94, aggression: 97, consistency: 86 }
  },
  {
    id: "kami",
    nick: "Kami",
    name: "Gabriel Bohm",
    role: "mid",
    era: "legend",
    team: "Lenda do CBLOL / paiN",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/82/PNG_Kami_2020_Split_1.png",
    signatureChampions: ["Ahri", "Orianna", "Viktor", "Syndra", "TwistedFate"],
    traits: "Deus da Rota do Meio & Farme Perfeito",
    quote: "Sempre um passo à frente dos adversários.",
    stats: { mechanics: 96, aggression: 88, consistency: 97 }
  },
  {
    id: "takeshi",
    nick: "Takeshi",
    name: "Murilo Alves",
    role: "mid",
    era: "legend",
    team: "Lenda do CBLOL / Keyd",
    avatar: "https://liquipedia.net/commons/images/0/0c/Takeshi_at_CBLOL_Cup_2026_Week_3.jpeg",
    signatureChampions: ["Zed", "Yasuo", "Jayce", "LeBlanc"],
    traits: "Capitão Histórico & Duelos Mecânicos",
    quote: "Respeita o homem de ferro do meio!",
    stats: { mechanics: 92, aggression: 94, consistency: 89 }
  },
  {
    id: "tockers",
    nick: "Tockers",
    name: "Gabriel Claumann",
    role: "mid",
    era: "legend",
    team: "Lenda do CBLOL / INTZ",
    avatar: "https://liquipedia.net/commons/images/f/fc/RED_tockers_at_LTA_Championship_Playoffs.jpg",
    signatureChampions: ["Azir", "Corki", "Cassiopeia", "Ryze"],
    traits: "Mago dos Títulos & Controle Espacial",
    quote: "Ganhamos o jogo no macro.",
    stats: { mechanics: 91, aggression: 85, consistency: 94 }
  },

  // ================= AD CARRIES =================
  {
    id: "titan",
    nick: "TitaN",
    name: "Alexandre Lima",
    role: "adc",
    era: "current",
    team: "paiN Gaming",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/32/PAIN_TitaN_LTA_2025_Split_1.png",
    signatureChampions: ["KaiSa", "Lucian", "Jinx", "Tristana", "Ezreal"],
    traits: "O Atirador Mais Agressivo do Brasil",
    quote: "Eu não tenho medo de pular pra frente!",
    stats: { mechanics: 96, aggression: 97, consistency: 91 }
  },
  {
    id: "brance",
    nick: "Brance",
    name: "Diego Amaral",
    role: "adc",
    era: "current",
    team: "RED Canids",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/5b/EST_Brance_2026_Split_1.png",
    signatureChampions: ["Varus", "Lucian", "KaiSa", "Kalista"],
    traits: "BOT GAP! Audácia & Kiting de Elite",
    quote: "BOT GAP! Mostra o muque!",
    stats: { mechanics: 94, aggression: 95, consistency: 90 }
  },
  {
    id: "route",
    nick: "Route",
    name: "Moon Geom-su",
    role: "adc",
    era: "current",
    team: "LOUDesports",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3a/LOUD_Route_2025_Split_3.png",
    signatureChampions: ["Aphelios", "Varus", "Kalista", "KaiSa"],
    traits: "Precisão Cirúrgica Coreana & Dano Absurdo",
    quote: "Cada auto-ataque conta no milímetro.",
    stats: { mechanics: 95, aggression: 91, consistency: 95 }
  },
  {
    id: "netuno",
    nick: "Netuno",
    name: "Lucas Flores",
    role: "adc",
    era: "current",
    team: "FURIA",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/85/INTZ_Netuno_2026_Split_2.png",
    signatureChampions: ["Jinx", "Aphelios", "Varus", "KaiSa"],
    traits: "Hipercarregador & Dano Constante",
    quote: "Deixa eu bater livre que a luta acabou.",
    stats: { mechanics: 91, aggression: 89, consistency: 92 }
  },
  // ADC LEGENDS
  {
    id: "brtt",
    nick: "brTT",
    name: "Felipe Gonçalves",
    role: "adc",
    era: "legend",
    team: "Lenda do CBLOL / Maior Campeão",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/42/LOS_brTT_2024_Split_2_player.png",
    signatureChampions: ["Draven", "Lucian", "Kalista", "Jinx", "Twitch"],
    traits: "O Maior de Todos os Tempos & Rexpeita",
    quote: "REXPEITA A MINHA HISTÓRIA! Aqui é brTT!",
    stats: { mechanics: 97, aggression: 98, consistency: 93 }
  },
  {
    id: "micao",
    nick: "MicaO",
    name: "Micael Rodrigues",
    role: "adc",
    era: "legend",
    team: "Lenda do CBLOL / INTZ",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fc/LBR_micaO_2024_Split_2.png",
    signatureChampions: ["Ashe", "Jhin", "Ezreal", "Sivir"],
    traits: "Posicionamento Clínico & Pentacampeão",
    quote: "Dano sem sofrer dano. Essa é a regra.",
    stats: { mechanics: 91, aggression: 85, consistency: 96 }
  },
  {
    id: "matsukaze",
    nick: "Matsukaze",
    name: "Gustavo Rossi",
    role: "adc",
    era: "legend",
    team: "Lenda do CBLOL / KaBuM!",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/LBR_Matsukaze_2022_Split_2.png",
    signatureChampions: ["Ezreal", "Lucian", "Caitlyn"],
    traits: "Duelos Rápidos & Mecânica Fina",
    quote: "Mira precisa em qualquer distância.",
    stats: { mechanics: 90, aggression: 91, consistency: 88 }
  },

  // ================= SUPPORTS =================
  {
    id: "ceos",
    nick: "Ceos",
    name: "Denilson Oliveira",
    role: "support",
    era: "current",
    team: "LOUDesports",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4e/PAIN_Ceos_2026_Split_2.png",
    signatureChampions: ["Thresh", "Nautilus", "Rakan", "Leona", "Alistar"],
    traits: "Iniciações Impecáveis & Visão de Mapa Total",
    quote: "Toda iniciação é com cálculo de vitória.",
    stats: { mechanics: 95, aggression: 92, consistency: 96 }
  },
  {
    id: "kabbie",
    nick: "Kabbie",
    name: "Jeong Sang-hyeon",
    role: "support",
    era: "current",
    team: "paiN Gaming",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/99/LOS_Sanghyeon_2025_Split_1.png",
    signatureChampions: ["Nautilus", "Thresh", "Rakan", "Braum"],
    traits: "Guardião da Bot Lane & Mecânica Apurada",
    quote: "Protegendo o carregador a todo custo.",
    stats: { mechanics: 93, aggression: 90, consistency: 93 }
  },
  {
    id: "redbert",
    nick: "RedBert",
    name: "Ygor Freitas",
    role: "support",
    era: "current",
    team: "Lenda & Ativo / Multicampeão",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/80/LOUD_RedBert_2026_Split_1.png",
    signatureChampions: ["Rakan", "Thresh", "Alistar", "Bard"],
    traits: "Engages Rápidos & Roaming Pelo Rio",
    quote: "Achei o flanco, vem comigo!",
    stats: { mechanics: 92, aggression: 93, consistency: 90 }
  },
  {
    id: "jojo",
    nick: "JoJo",
    name: "Gabriel Dzelme",
    role: "support",
    era: "current",
    team: "RED Canids",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/45/FUR_JoJo_2026_Split_2.png",
    signatureChampions: ["Rakan", "Leona", "Nautilus", "Lulu"],
    traits: "Agressividade na Rota & Sangue Quente",
    quote: "Para cima deles sem dó!",
    stats: { mechanics: 90, aggression: 94, consistency: 88 }
  },
  // SUPPORT LEGENDS
  {
    id: "baiano",
    nick: "Baiano",
    name: "Gustavo Gomes",
    role: "support",
    era: "legend",
    team: "Lenda do CBLOL / Ilha das Lendas",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1c/Baiano_CBOL%C3%83O_2023.jpg",
    signatureChampions: ["Thresh", "Alistar", "Braum", "Blitzcrank", "Nautilus"],
    traits: "Fundador da Ilha & Criador do CBOLÃO",
    quote: "AQUI É A ILHA DAS LENDAS! Respeita o maior da história!",
    stats: { mechanics: 91, aggression: 93, consistency: 92 }
  },
  {
    id: "dioud",
    nick: "Dioud",
    name: "Hugo Padioleau",
    role: "support",
    era: "legend",
    team: "Lenda do CBLOL / O Francês Brasileiro",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d3/Dioud_at_Analyst_Desk_2022.png",
    signatureChampions: ["Thresh", "Braum", "Morgana", "Alistar"],
    traits: "Coração Brasileiro & Ganchos Lendários",
    quote: "Coração de ouro e sentença certeira!",
    stats: { mechanics: 93, aggression: 92, consistency: 93 }
  },
  {
    id: "jockster",
    nick: "Jockster",
    name: "Luan Cardoso",
    role: "support",
    era: "legend",
    team: "Lenda do CBLOL / INTZ Exodia",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3c/ITZ_Jockster_2022_Split_2.png",
    signatureChampions: ["Alistar", "Thresh", "Gragas", "Shen"],
    traits: "O Cabeceio Perfeito & Maestria Tática",
    quote: "Combo Pulverizar na hora exata.",
    stats: { mechanics: 91, aggression: 91, consistency: 93 }
  },
  {
    id: "esa",
    nick: "esA",
    name: "Erico Pessoa",
    role: "support",
    era: "legend",
    team: "Lenda do CBLOL / Versatilidade",
    avatar: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e1/IDL_Esa_CBOL%C3%83O.png",
    signatureChampions: ["Thresh", "Nautilus", "Alistar", "Pyke"],
    traits: "Visão de Atirador Jogando de Suporte",
    quote: "Leio o atirador inimigo porque já fui um.",
    stats: { mechanics: 90, aggression: 90, consistency: 89 }
  }
];

export function getPlayersByRole(role) {
  if (!role) return PRO_PLAYERS;
  return PRO_PLAYERS.filter(p => p.role === role);
}

export function getPlayerById(id) {
  if (!id) return null;
  return PRO_PLAYERS.find(p => p.id === id) || null;
}

export function getDefaultProRoster() {
  return {
    top: "hidan",
    jungle: "cariok",
    mid: "tinowns",
    adc: "titan",
    support: "ceos"
  };
}
