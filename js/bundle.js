(function() {
"use strict";


// =================== js/data/icons.js ===================

// Catálogo Completo de Ícones Oficiais do LoL e Equipes de Esports (CBLOL e Mundial)
const SUMMONER_ICONS = [
  // ==========================================
  // BRASIL & CBLOL OFICIAL
  // ==========================================
  { id: "cblol_2024", name: "CBLOL 2024 (Oficial da Liga)", url: "assets/icons/cblol_2024.jpg", category: "cblol", team: "CBLOL", era: "2024" },
  { id: "pain_2025", name: "paiN Gaming 2025", url: "assets/icons/pain_2025.jpg", category: "cblol", team: "paiN Gaming", era: "2025" },
  { id: "loud_2025", name: "LOUD 2025", url: "assets/icons/loud_2025.jpg", category: "cblol", team: "LOUD", era: "2025" },
  { id: "red_2025", name: "RED Canids Kalunga 2025", url: "assets/icons/red_2025.jpg", category: "cblol", team: "RED Canids", era: "2025" },
  { id: "keyd_2025", name: "Vivo Keyd Stars 2025", url: "assets/icons/keyd_2025.jpg", category: "cblol", team: "Vivo Keyd Stars", era: "2025" },
  { id: "furia_2025", name: "FURIA Esports 2025", url: "assets/icons/furia_2025.jpg", category: "cblol", team: "FURIA", era: "2025" },
  { id: "fluxo_2025", name: "Fluxo W7M 2025", url: "assets/icons/fluxo_2025.jpg", category: "cblol", team: "Fluxo", era: "2025" },
  { id: "kabum", name: "KaBuM! Esports", url: "assets/icons/kabum.jpg", category: "cblol", team: "KaBuM! Esports", era: "Clássico" },
  { id: "intz", name: "INTZ Intrépidos", url: "assets/icons/intz.jpg", category: "cblol", team: "INTZ", era: "Clássico" },
  { id: "flamengo", name: "Flamengo Esports", url: "assets/icons/flamengo.jpg", category: "cblol", team: "Flamengo Esports", era: "Clássico" },
  { id: "idl", name: "Ilha das Lendas", url: "assets/icons/idl.svg", category: "cblol", team: "Ilha das Lendas", era: "Atual" },
  { id: "los_grandes", name: "Los Grandes (LØS)", url: "assets/icons/los_grandes.svg", category: "cblol", team: "Los Grandes", era: "Atual" },
  { id: "liberty", name: "Liberty Esports", url: "assets/icons/liberty.svg", category: "cblol", team: "Liberty", era: "Atual" },
  { id: "idm_ilha", name: "Ilha da Macacada (IDM)", url: "assets/icons/idm_ilha.jpg", category: "cblol", team: "Ilha das Lendas", era: "2018" },
  { id: "cnb", name: "CNB e-Sports (Clássico)", url: "assets/icons/cnb.jpg", category: "cblol", team: "CNB", era: "2016" },
  { id: "team_one", name: "Team oNe (Campeões 2017)", url: "assets/icons/team_one.jpg", category: "cblol", team: "Team oNe", era: "2017" },
  { id: "vorax_liberty", name: "Vorax Esports", url: "assets/icons/vorax_liberty.jpg", category: "cblol", team: "Vorax", era: "2021" },
  { id: "rise_gaming", name: "Rise Gaming", url: "assets/icons/rise_gaming.svg", category: "cblol", team: "Rise Gaming", era: "Atual" },
  { id: "intz_2016", name: "INTZ Exocadinho (Mundial 2016)", url: "assets/icons/intz_2016.jpg", category: "cblol", team: "INTZ", era: "2016" },
  { id: "pain_2016", name: "paiN Gaming (Mundial 2016)", url: "assets/icons/pain_2016.jpg", category: "cblol", team: "paiN Gaming", era: "2016" },
  { id: "loud_2022", name: "LOUD (Mundial 2022)", url: "assets/icons/loud_2022.jpg", category: "cblol", team: "LOUD", era: "2022" },
  { id: "red_2021", name: "RED Canids (Mundial 2021)", url: "assets/icons/red_2021.jpg", category: "cblol", team: "RED Canids", era: "2021" },

  // ==========================================
  // MUNDIAL & LIGAS INTERNACIONAIS
  // ==========================================
  { id: "t1_champs", name: "T1 Campeões Mundiais", url: "assets/icons/t1_champs.jpg", category: "mundial", team: "T1", era: "Mundial" },
  { id: "t1_2025", name: "T1 (LCK Coreia) 2025", url: "assets/icons/t1_2025.jpg", category: "mundial", team: "T1", era: "2025" },
  { id: "geng_2025", name: "Gen.G (LCK Coreia) 2025", url: "assets/icons/geng_2025.jpg", category: "mundial", team: "Gen.G", era: "2025" },
  { id: "g2_2025", name: "G2 Esports (LEC Europa) 2025", url: "assets/icons/g2_2025.jpg", category: "mundial", team: "G2 Esports", era: "2025" },
  { id: "fnatic_2025", name: "Fnatic (LEC Europa) 2025", url: "assets/icons/fnatic_2025.jpg", category: "mundial", team: "Fnatic", era: "2025" },
  { id: "c9_2025", name: "Cloud9 (LCS América) 2025", url: "assets/icons/c9_2025.jpg", category: "mundial", team: "Cloud9", era: "2025" },
  { id: "tl_2025", name: "Team Liquid 2025", url: "assets/icons/tl_2025.jpg", category: "mundial", team: "Team Liquid", era: "2025" },
  { id: "fly_2025", name: "FlyQuest 2025", url: "assets/icons/fly_2025.jpg", category: "mundial", team: "FlyQuest", era: "2025" },
  { id: "lck_2024", name: "LCK Oficial (Coreia)", url: "assets/icons/lck_2024.jpg", category: "mundial", team: "LCK", era: "2024" },
  { id: "lec_2024", name: "LEC Oficial (Europa)", url: "assets/icons/lec_2024.jpg", category: "mundial", team: "LEC", era: "2024" },
  { id: "lcs_2024", name: "LCS Oficial (América do Norte)", url: "assets/icons/lcs_2024.jpg", category: "mundial", team: "LCS", era: "2024" },
  { id: "lpl_2024", name: "LPL Oficial (China)", url: "assets/icons/lpl_2024.jpg", category: "mundial", team: "LPL", era: "2024" },

  // ==========================================
  // CLÁSSICOS DO LEAGUE OF LEGENDS (DATA DRAGON)
  // ==========================================
  { id: 548, name: "Poro Clássico", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/548.png", category: "classicos" },
  { id: 588, name: "Poro Bigodudo", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/588.png", category: "classicos" },
  { id: 593, name: "Poro Astronauta", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/593.png", category: "classicos" },
  { id: 549, name: "Barão Na'Shor", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/549.png", category: "classicos" },
  { id: 550, name: "Dragão Ancestral", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/550.png", category: "classicos" },
  { id: 551, name: "Arauto do Vale", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/551.png", category: "classicos" },
  { id: 537, name: "Espada Hextech", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/537.png", category: "classicos" },
  { id: 538, name: "Cristal Mágico", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/538.png", category: "classicos" },
  { id: 546, name: "Gema de Ouro", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/546.png", category: "classicos" },
  { id: 610, name: "Pentakill", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/610.png", category: "classicos" },
  { id: 622, name: "Chama do Desafiante", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/622.png", category: "classicos" },
  { id: 633, name: "Troféu Dourado", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/633.png", category: "classicos" },
  { id: 501, name: "Capuz de Rabadon", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/501.png", category: "classicos" },
  { id: 502, name: "Gume do Infinito", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/502.png", category: "classicos" },
  { id: 503, name: "Anjo Guardião", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/503.png", category: "classicos" },
  { id: 504, name: "Lâmina de Doran", url: "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/profileicon/504.png", category: "classicos" }
];



// =================== js/data/players.js ===================

// Banco de Dados de Pro Players do CBLOL (Lendas Históricas e Estrelas Atuais)
const PRO_PLAYERS = [
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

function getPlayersByRole(role) {
  if (!role) return PRO_PLAYERS;
  return PRO_PLAYERS.filter(p => p.role === role);
}

function getPlayerById(id) {
  if (!id) return null;
  return PRO_PLAYERS.find(p => p.id === id) || null;
}

function getDefaultProRoster() {
  return {
    top: "hidan",
    jungle: "cariok",
    mid: "tinowns",
    adc: "titan",
    support: "ceos"
  };
}



// =================== js/data/teams.js ===================

// Times clássicos do CBLOL e suas identidades competitivas
const CBLOL_TEAMS = [
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



// =================== js/data/champions.js ===================

// Banco completo de campeões oficiais de League of Legends (168 Campeões) com dados oficiais, papéis e atributos competitivos
const CHAMPIONS = [
  // ===================== TOPO (TOP) (40 CAMPEÕES) =====================
  {
    id: "Aatrox",
    key: 266,
    quote: "Testemunhem o fim!",
    name: "Aatrox",
    title: "A Espada Darkin",
    role: "top",
    class: "Fighter",
    signatureSkill: "Aniquilador de Mundos",
    stats: { damage: 85, tank: 78, push: 72, utility: 60, scaling: 75 }
  },
  {
    id: "Camille",
    key: 164,
    quote: "A precisão é o que separa um carniceiro de um cirurgião.",
    name: "Camille",
    title: "A Sombra de Aço",
    role: "top",
    class: "Fighter",
    signatureSkill: "Ultimato Hextec",
    stats: { damage: 90, tank: 70, push: 88, utility: 70, scaling: 88 }
  },
  {
    id: "Chogath",
    key: 31,
    quote: "Sua alma alimentará o Vazio!",
    name: "Cho'Gath",
    title: "O Terror do Vazio",
    role: "top",
    class: "Tank",
    signatureSkill: "Banquete",
    stats: { damage: 71, tank: 95, push: 76, utility: 89, scaling: 80 }
  },
  {
    id: "Darius",
    key: 122,
    quote: "Eles se arrependerão de terem se oposto a mim.",
    name: "Darius",
    title: "A Mão de Noxus",
    role: "top",
    class: "Fighter",
    signatureSkill: "Guilhotina de Noxus",
    stats: { damage: 91, tank: 77, push: 74, utility: 58, scaling: 70 }
  },
  {
    id: "DrMundo",
    key: 36,
    quote: "Mundo vai aonde quer!",
    name: "Dr. Mundo",
    title: "O Louco de Zaun",
    role: "top",
    class: "Tank",
    signatureSkill: "Dosagem Máxima",
    stats: { damage: 75, tank: 95, push: 80, utility: 89, scaling: 80 }
  },
  {
    id: "Fiora",
    key: 114,
    quote: "Eu procuro um oponente digno.",
    name: "Fiora",
    title: "A Grande Duelista",
    role: "top",
    class: "Fighter",
    signatureSkill: "Desafio Grandioso",
    stats: { damage: 94, tank: 62, push: 94, utility: 50, scaling: 92 }
  },
  {
    id: "Gangplank",
    key: 41,
    quote: "Nem o inferno e nem as marés me deterão.",
    name: "Gangplank",
    title: "O Terror dos Doze Mares",
    role: "top",
    class: "Fighter",
    signatureSkill: "Barragem de Canhão",
    stats: { damage: 92, tank: 82, push: 90, utility: 68, scaling: 92 }
  },
  {
    id: "Garen",
    key: 86,
    quote: "Pela justiça!",
    name: "Garen",
    title: "O Poder de Demacia",
    role: "top",
    class: "Fighter",
    signatureSkill: "Justiça Demaciana",
    stats: { damage: 79, tank: 95, push: 84, utility: 89, scaling: 80 }
  },
  {
    id: "Gnar",
    key: 150,
    quote: "Gnar gaddaa!",
    name: "Gnar",
    title: "O Elo Perdido",
    role: "top",
    class: "Fighter",
    signatureSkill: "GNAR!",
    stats: { damage: 76, tank: 82, push: 78, utility: 85, scaling: 78 }
  },
  {
    id: "Gwen",
    key: 887,
    quote: "Que corte encantador!",
    name: "Gwen",
    title: "A Costureira Encantada",
    role: "top",
    class: "Fighter",
    signatureSkill: "Ponto-Cruz",
    stats: { damage: 92, tank: 78, push: 90, utility: 70, scaling: 92 }
  },
  {
    id: "Illaoi",
    key: 420,
    quote: "Eu não sou de pregar sermão. Ossos quebrados são os melhores professores.",
    name: "Illaoi",
    title: "A Sacerdotisa Cráquem",
    role: "top",
    class: "Fighter",
    signatureSkill: "Salto de Fé",
    stats: { damage: 81, tank: 94, push: 86, utility: 87, scaling: 80 }
  },
  {
    id: "Irelia",
    key: 39,
    quote: "Pelas Primeiras Terras!",
    name: "Irelia",
    title: "A Dançarina das Lâminas",
    role: "top",
    class: "Fighter",
    signatureSkill: "Lâmina da Vanguarda",
    stats: { damage: 92, tank: 78, push: 90, utility: 70, scaling: 92 }
  },
  {
    id: "Jax",
    key: 24,
    quote: "Quem vai ser o próximo?",
    name: "Jax",
    title: "O Grão-Mestre das Armas",
    role: "top",
    class: "Fighter",
    signatureSkill: "Contra-Ataque",
    stats: { damage: 88, tank: 72, push: 92, utility: 62, scaling: 90 }
  },
  {
    id: "Jayce",
    key: 126,
    quote: "Eu luto por um futuro brilhante.",
    name: "Jayce",
    title: "O Defensor do Amanhã",
    role: "top",
    class: "Marksman",
    signatureSkill: "Canhão de Mercúrio / Martelo de Mercúrio",
    stats: { damage: 94, tank: 78, push: 92, utility: 66, scaling: 93 }
  },
  {
    id: "Kennen",
    key: 85,
    quote: "O coração nunca vacila.",
    name: "Kennen",
    title: "O Coração da Tempestade",
    role: "top",
    class: "Mage",
    signatureSkill: "Turbilhão Cortante",
    stats: { damage: 90, tank: 78, push: 88, utility: 74, scaling: 90 }
  },
  {
    id: "Kled",
    key: 240,
    quote: "A coragem é a única virtude que importa!",
    name: "Kled",
    title: "O Cavaleiro Intratável",
    role: "top",
    class: "Fighter",
    signatureSkill: "Avançaaaaaaar!!!",
    stats: { damage: 94, tank: 74, push: 92, utility: 64, scaling: 93 }
  },
  {
    id: "KSante",
    key: 897,
    quote: "Nenhum monstro resistirá ao orgulho de Nazumah.",
    name: "K'Sante",
    title: "O Orgulho de Nazumah",
    role: "top",
    class: "Tank",
    signatureSkill: "Forma Irrestrita",
    stats: { damage: 75, tank: 95, push: 68, utility: 80, scaling: 82 }
  },
  {
    id: "Kayle",
    key: 10,
    quote: "Eles serão julgados sob a luz da justiça.",
    name: "Kayle",
    title: "A Justa",
    role: "top",
    class: "Mage",
    signatureSkill: "Sentença Divina",
    stats: { damage: 90, tank: 82, push: 88, utility: 74, scaling: 90 }
  },
  {
    id: "Malphite",
    key: 54,
    quote: "Duro como pedra!",
    name: "Malphite",
    title: "O Fragmento do Monolito",
    role: "top",
    class: "Tank",
    signatureSkill: "Força Incontrolável",
    stats: { damage: 70, tank: 98, push: 60, utility: 90, scaling: 74 }
  },
  {
    id: "Mordekaiser",
    key: 82,
    quote: "O destino. O domínio. A mentira.",
    name: "Mordekaiser",
    title: "O Revenã de Ferro",
    role: "top",
    class: "Fighter",
    signatureSkill: "Reino da Morte",
    stats: { damage: 86, tank: 82, push: 84, utility: 74, scaling: 86 }
  },
  {
    id: "Nasus",
    key: 75,
    quote: "O ciclo da vida e da morte continua. Nós viveremos, eles morrerão.",
    name: "Nasus",
    title: "O Curador das Areias",
    role: "top",
    class: "Fighter",
    signatureSkill: "Fúria das Areias",
    stats: { damage: 79, tank: 93, push: 84, utility: 85, scaling: 80 }
  },
  {
    id: "Olaf",
    key: 2,
    quote: "Deixem nada para trás!",
    name: "Olaf",
    title: "O Berserker",
    role: "top",
    class: "Fighter",
    signatureSkill: "Ragnarok",
    stats: { damage: 83, tank: 93, push: 88, utility: 85, scaling: 80 }
  },
  {
    id: "Ornn",
    key: 516,
    quote: "Eu já estive em lugares piores... Não muitos, mas já estive.",
    name: "Ornn",
    title: "O Fogo sob a Montanha",
    role: "top",
    class: "Tank",
    signatureSkill: "Chamado do Deus da Forja",
    stats: { damage: 75, tank: 96, push: 80, utility: 93, scaling: 80 }
  },
  {
    id: "Poppy",
    key: 78,
    quote: "Não sou nenhuma heroína. Só uma Yordle com um martelo.",
    name: "Poppy",
    title: "A Guardiã do Martelo",
    role: "top",
    class: "Tank",
    signatureSkill: "Veredito da Guardiã",
    stats: { damage: 77, tank: 95, push: 82, utility: 89, scaling: 80 }
  },
  {
    id: "Quinn",
    key: 133,
    quote: "Justiça com asas.",
    name: "Quinn",
    title: "As Asas de Demacia",
    role: "top",
    class: "Marksman",
    signatureSkill: "Retaguarda do Inimigo",
    stats: { damage: 96, tank: 78, push: 94, utility: 64, scaling: 93 }
  },
  {
    id: "Renekton",
    key: 58,
    quote: "Enquanto eu viver, todos morrerão!",
    name: "Renekton",
    title: "O Carniceiro das Areias",
    role: "top",
    class: "Fighter",
    signatureSkill: "Dominus Brutal",
    stats: { damage: 82, tank: 80, push: 80, utility: 55, scaling: 65 }
  },
  {
    id: "Riven",
    key: 92,
    quote: "O que quebrou pode ser reconstruído.",
    name: "Riven",
    title: "A Exilada",
    role: "top",
    class: "Fighter",
    signatureSkill: "Lâmina do Exílio",
    stats: { damage: 94, tank: 80, push: 92, utility: 62, scaling: 93 }
  },
  {
    id: "Rumble",
    key: 68,
    quote: "Vamos botar pra quebrar!",
    name: "Rumble",
    title: "A Ameaça Mecânica",
    role: "top",
    class: "Fighter",
    signatureSkill: "O Equalizador",
    stats: { damage: 84, tank: 82, push: 82, utility: 76, scaling: 84 }
  },
  {
    id: "Sett",
    key: 875,
    quote: "Eu adoro quando eles acham que podem me bater.",
    name: "Sett",
    title: "O Chefe",
    role: "top",
    class: "Fighter",
    signatureSkill: "Hora do Show",
    stats: { damage: 81, tank: 93, push: 86, utility: 85, scaling: 80 }
  },
  {
    id: "Shen",
    key: 98,
    quote: "Pelo equilíbrio.",
    name: "Shen",
    title: "O Olho do Crepúsculo",
    role: "top",
    class: "Tank",
    signatureSkill: "Manter a União",
    stats: { damage: 71, tank: 96, push: 76, utility: 93, scaling: 80 }
  },
  {
    id: "Singed",
    key: 27,
    quote: "Que tal um drink?",
    name: "Singed",
    title: "O Químico Louco",
    role: "top",
    class: "Tank",
    signatureSkill: "Poção da Insanidade",
    stats: { damage: 73, tank: 96, push: 78, utility: 91, scaling: 80 }
  },
  {
    id: "Sion",
    key: 14,
    quote: "Guerra... Eu sou a guerra!",
    name: "Sion",
    title: "O Colosso Morto-Vivo",
    role: "top",
    class: "Tank",
    signatureSkill: "Investida Incontrolável",
    stats: { damage: 65, tank: 96, push: 95, utility: 75, scaling: 84 }
  },
  {
    id: "TahmKench",
    key: 223,
    quote: "Chame-me de rei, chame-me de demônio. As águas não ligam para nomes.",
    name: "Tahm Kench",
    title: "O Rei do Rio",
    role: "top",
    class: "Tank",
    signatureSkill: "Devorar",
    stats: { damage: 71, tank: 96, push: 76, utility: 93, scaling: 80 }
  },
  {
    id: "Teemo",
    key: 17,
    quote: "Capitão Teemo no comando!",
    name: "Teemo",
    title: "O Explorador Veloz",
    role: "top",
    class: "Marksman",
    signatureSkill: "Armadilha Venenosa",
    stats: { damage: 88, tank: 76, push: 86, utility: 74, scaling: 88 }
  },
  {
    id: "Trundle",
    key: 48,
    quote: "Hora de trollar!",
    name: "Trundle",
    title: "O Rei dos Trolls",
    role: "top",
    class: "Fighter",
    signatureSkill: "Subjugar",
    stats: { damage: 79, tank: 94, push: 84, utility: 87, scaling: 80 }
  },
  {
    id: "Tryndamere",
    key: 23,
    quote: "Meu braço direito é bem mais forte que o esquerdo!",
    name: "Tryndamere",
    title: "O Rei Bárbaro",
    role: "top",
    class: "Fighter",
    signatureSkill: "Fúria Sem Fim",
    stats: { damage: 98, tank: 80, push: 96, utility: 64, scaling: 93 }
  },
  {
    id: "Urgot",
    key: 6,
    quote: "Você não conhece o significado da força.",
    name: "Urgot",
    title: "O Encouraçado",
    role: "top",
    class: "Fighter",
    signatureSkill: "Pior que a Morte",
    stats: { damage: 81, tank: 93, push: 86, utility: 85, scaling: 80 }
  },
  {
    id: "Vladimir",
    key: 8,
    quote: "Os rios correrão em vermelho.",
    name: "Vladimir",
    title: "O Sanguinário Escarlate",
    role: "top",
    class: "Mage",
    signatureSkill: "Hemopraga",
    stats: { damage: 82, tank: 82, push: 80, utility: 76, scaling: 82 }
  },
  {
    id: "Volibear",
    key: 106,
    quote: "Eu sou a tempestade!",
    name: "Volibear",
    title: "A Tempestade Implacável",
    role: "top",
    class: "Fighter",
    signatureSkill: "Emissário da Tempestade",
    stats: { damage: 79, tank: 95, push: 84, utility: 89, scaling: 80 }
  },
  {
    id: "Yorick",
    key: 83,
    quote: "Estas almas precisam de descanso.",
    name: "Yorick",
    title: "O Pastor de Almas",
    role: "top",
    class: "Fighter",
    signatureSkill: "Louvor das Ilhas",
    stats: { damage: 77, tank: 94, push: 82, utility: 87, scaling: 80 }
  },
  // ===================== SELVA (JUNGLE) (38 CAMPEÕES) =====================
  {
    id: "Amumu",
    key: 32,
    quote: "Pensei que você nunca ia me escolher...",
    name: "Amumu",
    title: "A Múmia Triste",
    role: "jungle",
    class: "Tank",
    signatureSkill: "A Maldição da Múmia Triste",
    stats: { damage: 69, tank: 94, push: 69, utility: 90, scaling: 76 }
  },
  {
    id: "Belveth",
    key: 200,
    quote: "Tudo será consumido. Tudo se tornará lavanda.",
    name: "Bel'Veth",
    title: "A Imperatriz do Vazio",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Banquete Eterno",
    stats: { damage: 88, tank: 76, push: 78, utility: 79, scaling: 78 }
  },
  {
    id: "Briar",
    key: 233,
    quote: "Opa! Alguém falou comida?!",
    name: "Briar",
    title: "A Fome Contida",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Morte Certa",
    stats: { damage: 96, tank: 60, push: 84, utility: 68, scaling: 82 }
  },
  {
    id: "Diana",
    key: 131,
    quote: "Uma nova lua está surgindo.",
    name: "Diana",
    title: "O Escárnio da Lua",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Colapso Minguante",
    stats: { damage: 96, tank: 61, push: 82, utility: 73, scaling: 82 }
  },
  {
    id: "Ekko",
    key: 245,
    quote: "Não importa quanto tempo você tem, mas sim como você usa.",
    name: "Ekko",
    title: "O Rapaz que Estilhaçou o Tempo",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Cronoquebra",
    stats: { damage: 96, tank: 58, push: 80, utility: 72, scaling: 82 }
  },
  {
    id: "Elise",
    key: 60,
    quote: "A beleza mora na teia da aranha.",
    name: "Elise",
    title: "A Rainha das Aranhas",
    role: "jungle",
    class: "Mage",
    signatureSkill: "Rapel Fatal",
    stats: { damage: 88, tank: 60, push: 66, utility: 76, scaling: 66 }
  },
  {
    id: "Evelynn",
    key: 28,
    quote: "Pense em todo o sofrimento que podemos causar...",
    name: "Evelynn",
    title: "O Abraço da Agonia",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Última Carícia",
    stats: { damage: 96, tank: 57, push: 79, utility: 72, scaling: 82 }
  },
  {
    id: "Fiddlesticks",
    key: 9,
    quote: "Ao combate!",
    name: "Fiddlesticks",
    title: "O Terror Ancestral",
    role: "jungle",
    class: "Mage",
    signatureSkill: "Tempestade de Corvos",
    stats: { damage: 84, tank: 78, push: 74, utility: 81, scaling: 78 }
  },
  {
    id: "Gragas",
    key: 79,
    quote: "Se você vai pagar, eu estou dentro!",
    name: "Gragas",
    title: "O Badernista",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Barril Explosivo",
    stats: { damage: 88, tank: 86, push: 78, utility: 78, scaling: 78 }
  },
  {
    id: "Graves",
    key: 104,
    quote: "Mortos não contam histórias.",
    name: "Graves",
    title: "O Foragido",
    role: "jungle",
    class: "Marksman",
    signatureSkill: "Efeito Colateral",
    stats: { damage: 90, tank: 75, push: 82, utility: 55, scaling: 85 }
  },
  {
    id: "Hecarim",
    key: 120,
    quote: "Vejam o poder das Ilhas das Sombras!",
    name: "Hecarim",
    title: "A Sombra da Guerra",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Massacre das Sombras",
    stats: { damage: 81, tank: 94, push: 81, utility: 90, scaling: 76 }
  },
  {
    id: "Ivern",
    key: 427,
    quote: "Minha cor favorita é a primavera.",
    name: "Ivern",
    title: "O Pai do Verde",
    role: "jungle",
    class: "Support",
    signatureSkill: "Margarida!",
    stats: { damage: 86, tank: 82, push: 76, utility: 79, scaling: 78 }
  },
  {
    id: "JarvanIV",
    key: 59,
    quote: "Pela vontade de meu pai e pelo povo de Demacia!",
    name: "Jarvan IV",
    title: "O Exemplo de Demacia",
    role: "jungle",
    class: "Tank",
    signatureSkill: "Cataclismo",
    stats: { damage: 78, tank: 84, push: 68, utility: 88, scaling: 72 }
  },
  {
    id: "Karthus",
    key: 30,
    quote: "A morte é apenas o início.",
    name: "Karthus",
    title: "A Voz Mortal",
    role: "jungle",
    class: "Mage",
    signatureSkill: "Réquiem",
    stats: { damage: 84, tank: 76, push: 74, utility: 82, scaling: 78 }
  },
  {
    id: "Kayn",
    key: 141,
    quote: "Você vai provar que é digno? Provavelmente não.",
    name: "Kayn",
    title: "O Ceifador das Sombras",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Transgressão do Umbral",
    stats: { damage: 96, tank: 61, push: 85, utility: 66, scaling: 82 }
  },
  {
    id: "Khazix",
    key: 121,
    quote: "Mudar é bom.",
    name: "Kha'Zix",
    title: "O Ceifador do Vazio",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Massacre do Vazio",
    stats: { damage: 96, tank: 59, push: 84, utility: 68, scaling: 82 }
  },
  {
    id: "Kindred",
    key: 203,
    quote: "Nunca um sem o outro.",
    name: "Kindred",
    title: "Os Caçadores Eternos",
    role: "jungle",
    class: "Marksman",
    signatureSkill: "Refúgio da Ovelha",
    stats: { damage: 89, tank: 58, push: 76, utility: 86, scaling: 92 }
  },
  {
    id: "LeeSin",
    key: 64,
    quote: "Sua vontade, minhas mãos.",
    name: "Lee Sin",
    title: "O Monge Cego",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Ira do Dragão (Insec)",
    stats: { damage: 86, tank: 68, push: 65, utility: 82, scaling: 68 }
  },
  {
    id: "Lillia",
    key: 876,
    quote: "Eep! Olá! Não se assuste!",
    name: "Lillia",
    title: "O Florir Receoso",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Cadência de Ninar",
    stats: { damage: 80, tank: 76, push: 70, utility: 82, scaling: 78 }
  },
  {
    id: "MasterYi",
    key: 11,
    quote: "Minha espada é sua.",
    name: "Master Yi",
    title: "O Espadachim Wuju",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Highlander",
    stats: { damage: 96, tank: 59, push: 85, utility: 67, scaling: 82 }
  },
  {
    id: "MonkeyKing",
    key: 62,
    quote: "Ao combate!",
    name: "Wukong",
    title: "O Macaco Rei",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Ciclone",
    stats: { damage: 81, tank: 93, push: 81, utility: 89, scaling: 76 }
  },
  {
    id: "Nidalee",
    key: 76,
    quote: "Eles vão temer o meu instinto!",
    name: "Nidalee",
    title: "A Caçadora Bestial",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Aspecto do Puma",
    stats: { damage: 96, tank: 59, push: 80, utility: 72, scaling: 82 }
  },
  {
    id: "Nocturne",
    key: 56,
    quote: "Escuridão...",
    name: "Nocturne",
    title: "O Eterno Pesadelo",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Paranoia",
    stats: { damage: 96, tank: 60, push: 84, utility: 67, scaling: 82 }
  },
  {
    id: "Nunu",
    key: 20,
    quote: "Eu e o Willump estamos prontos para a aventura!",
    name: "Nunu e Willump",
    title: "O Garoto e seu Yeti",
    role: "jungle",
    class: "Tank",
    signatureSkill: "Zero Absoluto",
    stats: { damage: 73, tank: 94, push: 73, utility: 90, scaling: 76 }
  },
  {
    id: "Rammus",
    key: 33,
    quote: "Tá bom.",
    name: "Rammus",
    title: "O Tatu Blindado",
    role: "jungle",
    class: "Tank",
    signatureSkill: "Colisão Ascendente",
    stats: { damage: 73, tank: 96, push: 73, utility: 94, scaling: 76 }
  },
  {
    id: "RekSai",
    key: 421,
    quote: "✦ Rugido feroz das profundezas de Shurima ✦",
    name: "Rek'Sai",
    title: "A Escavadora do Vazio",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Investida do Vazio",
    stats: { damage: 81, tank: 93, push: 81, utility: 89, scaling: 76 }
  },
  {
    id: "Rengar",
    key: 107,
    quote: "Hoje nós caçamos!",
    name: "Rengar",
    title: "O Acossador da Alcateia",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Furor da Caçada",
    stats: { damage: 96, tank: 59, push: 82, utility: 67, scaling: 82 }
  },
  {
    id: "Sejuani",
    key: 113,
    quote: "Confiança é a fraqueza dos tolos.",
    name: "Sejuani",
    title: "A Fúria do Norte",
    role: "jungle",
    class: "Tank",
    signatureSkill: "Prisão Glacial",
    stats: { damage: 62, tank: 96, push: 60, utility: 94, scaling: 76 }
  },
  {
    id: "Shaco",
    key: 35,
    quote: "Que tal um truque de mágica?",
    name: "Shaco",
    title: "O Bufão Demoníaco",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Alucinações",
    stats: { damage: 96, tank: 59, push: 83, utility: 71, scaling: 82 }
  },
  {
    id: "Shyvana",
    key: 102,
    quote: "Eles enfrentarão a fúria do dragão!",
    name: "Shyvana",
    title: "A Meio-Dragão",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Descida do Dragão",
    stats: { damage: 96, tank: 84, push: 86, utility: 75, scaling: 78 }
  },
  {
    id: "Skarner",
    key: 72,
    quote: "A terra sente a aproximação de vocês.",
    name: "Skarner",
    title: "O Soberano Primordial",
    role: "jungle",
    class: "Tank",
    signatureSkill: "Empalar",
    stats: { damage: 79, tank: 96, push: 79, utility: 92, scaling: 76 }
  },
  {
    id: "Taliyah",
    key: 163,
    quote: "Pedra por pedra!",
    name: "Taliyah",
    title: "A Tecelã de Pedras",
    role: "jungle",
    class: "Mage",
    signatureSkill: "Muro da Tecelã",
    stats: { damage: 82, tank: 86, push: 72, utility: 80, scaling: 78 }
  },
  {
    id: "Udyr",
    key: 77,
    quote: "Nossos instintos nos guiarão.",
    name: "Udyr",
    title: "O Andarilho Espiritual",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Tempestade Alada",
    stats: { damage: 81, tank: 95, push: 81, utility: 91, scaling: 76 }
  },
  {
    id: "Vi",
    key: 254,
    quote: "Bata primeiro, pergunte enquanto bate.",
    name: "Vi",
    title: "A Defensora de Piltover",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Saque e Enterro",
    stats: { damage: 84, tank: 78, push: 70, utility: 85, scaling: 74 }
  },
  {
    id: "Viego",
    key: 234,
    quote: "Nenhum preço é alto demais. Nenhum massacre, injustificável.",
    name: "Viego",
    title: "O Rei Destruído",
    role: "jungle",
    class: "Assassin",
    signatureSkill: "Castigo Coração",
    stats: { damage: 92, tank: 65, push: 75, utility: 65, scaling: 86 }
  },
  {
    id: "Warwick",
    key: 19,
    quote: "O sangue corre... O monstro persegue!",
    name: "Warwick",
    title: "A Ira Desimpedida de Zaun",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Coerção Infinita",
    stats: { damage: 83, tank: 93, push: 83, utility: 89, scaling: 76 }
  },
  {
    id: "XinZhao",
    key: 5,
    quote: "A vitória nos aguarda.",
    name: "Xin Zhao",
    title: "O Senescal de Demacia",
    role: "jungle",
    class: "Fighter",
    signatureSkill: "Guarda Crescente",
    stats: { damage: 82, tank: 76, push: 72, utility: 72, scaling: 70 }
  },
  {
    id: "Zac",
    key: 154,
    quote: "Fui feito pra isso. Literalmente!",
    name: "Zac",
    title: "A Arma Secreta",
    role: "jungle",
    class: "Tank",
    signatureSkill: "Vamos Pular!",
    stats: { damage: 64, tank: 95, push: 62, utility: 93, scaling: 80 }
  },
  // ===================== MEIO (MID) (40 CAMPEÕES) =====================
  {
    id: "Ahri",
    key: 103,
    quote: "Não confia em mim?",
    name: "Ahri",
    title: "A Raposa de Nove Caudas",
    role: "mid",
    class: "Mage",
    signatureSkill: "Ímpeto Espiritual",
    stats: { damage: 86, tank: 55, push: 80, utility: 84, scaling: 78 }
  },
  {
    id: "Akali",
    key: 84,
    quote: "Temam a assassina sem mestre.",
    name: "Akali",
    title: "A Assassina Renegada",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Execução Perfeita",
    stats: { damage: 96, tank: 54, push: 68, utility: 60, scaling: 82 }
  },
  {
    id: "Akshan",
    key: 166,
    quote: "Vamos salvar o mundo... Ou pelo menos nos divertir tentando.",
    name: "Akshan",
    title: "O Sentinela Rebelde",
    role: "mid",
    class: "Marksman",
    signatureSkill: "Punição",
    stats: { damage: 90, tank: 54, push: 78, utility: 62, scaling: 85 }
  },
  {
    id: "Anivia",
    key: 34,
    quote: "Em asas tempestuosas.",
    name: "Anivia",
    title: "A Criofênix",
    role: "mid",
    class: "Mage",
    signatureSkill: "Tempestade Glacial",
    stats: { damage: 96, tank: 56, push: 94, utility: 96, scaling: 96 }
  },
  {
    id: "Annie",
    key: 1,
    quote: "Você quer brincar também? Vai ser divertido!",
    name: "Annie",
    title: "A Criança Sombria",
    role: "mid",
    class: "Mage",
    signatureSkill: "Invocar: Tibbers",
    stats: { damage: 96, tank: 55, push: 94, utility: 96, scaling: 96 }
  },
  {
    id: "AurelionSol",
    key: 136,
    quote: "É claro.",
    name: "Aurelion Sol",
    title: "O Forjador de Estrelas",
    role: "mid",
    class: "Mage",
    signatureSkill: "Estrela Cadente/Os Céus Caem",
    stats: { damage: 96, tank: 55, push: 94, utility: 92, scaling: 94 }
  },
  {
    id: "Aurora",
    key: 893,
    quote: "O mundo espiritual aguarda os curiosos.",
    name: "Aurora",
    title: "A Bruxa Entre Mundos",
    role: "mid",
    class: "Mage",
    signatureSkill: "Entre Mundos",
    stats: { damage: 93, tank: 58, push: 81, utility: 70, scaling: 85 }
  },
  {
    id: "Azir",
    key: 268,
    quote: "Shurima! Seu imperador retornou!",
    name: "Azir",
    title: "O Imperador das Areias",
    role: "mid",
    class: "Mage",
    signatureSkill: "Decreto do Imperador (Shurima Shuffle)",
    stats: { damage: 91, tank: 56, push: 94, utility: 86, scaling: 96 }
  },
  {
    id: "Cassiopeia",
    key: 69,
    quote: "Não há escapatória da minha mordida.",
    name: "Cassiopeia",
    title: "O Abraço da Serpente",
    role: "mid",
    class: "Mage",
    signatureSkill: "Olhar Petrificador",
    stats: { damage: 96, tank: 55, push: 94, utility: 94, scaling: 95 }
  },
  {
    id: "Corki",
    key: 42,
    quote: "Estou pronto para voar!",
    name: "Corki",
    title: "O Bombardeiro Ousado",
    role: "mid",
    class: "Marksman",
    signatureSkill: "Barragem de Mísseis",
    stats: { damage: 96, tank: 55, push: 94, utility: 88, scaling: 92 }
  },
  {
    id: "Fizz",
    key: 105,
    quote: "Hora de mergulhar de cabeça!",
    name: "Fizz",
    title: "O Trapaceiro das Marés",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Lançar Isca",
    stats: { damage: 96, tank: 58, push: 84, utility: 69, scaling: 85 }
  },
  {
    id: "Galio",
    key: 3,
    quote: "Hora de quebrar algumas cabeças!",
    name: "Galio",
    title: "O Colosso",
    role: "mid",
    class: "Tank",
    signatureSkill: "Entrada Heroica",
    stats: { damage: 96, tank: 62, push: 94, utility: 88, scaling: 92 }
  },
  {
    id: "Heimerdinger",
    key: 74,
    quote: "De fato, uma sábia escolha!",
    name: "Heimerdinger",
    title: "O Inventor Idolatrado",
    role: "mid",
    class: "Mage",
    signatureSkill: "MELHORIA!!!",
    stats: { damage: 96, tank: 58, push: 94, utility: 92, scaling: 94 }
  },
  {
    id: "Hwei",
    key: 910,
    quote: "A tela aguarda a minha visão.",
    name: "Hwei",
    title: "O Visionário",
    role: "mid",
    class: "Mage",
    signatureSkill: "Desespero Vertiginoso",
    stats: { damage: 96, tank: 53, push: 94, utility: 92, scaling: 94 }
  },
  {
    id: "Kassadin",
    key: 38,
    quote: "O equilíbrio do poder deve ser preservado.",
    name: "Kassadin",
    title: "O Andarilho do Vazio",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Caminhar na Fenda",
    stats: { damage: 93, tank: 59, push: 81, utility: 70, scaling: 85 }
  },
  {
    id: "Katarina",
    key: 55,
    quote: "A violência resolve tudo.",
    name: "Katarina",
    title: "A Lâmina Sinistra",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Lótus da Morte",
    stats: { damage: 94, tank: 57, push: 82, utility: 71, scaling: 85 }
  },
  {
    id: "Leblanc",
    key: 7,
    quote: "A rosa negra irá desabrochar novamente.",
    name: "LeBlanc",
    title: "A Farsante",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Mímica Fatal",
    stats: { damage: 95, tank: 46, push: 64, utility: 70, scaling: 74 }
  },
  {
    id: "Lissandra",
    key: 127,
    quote: "Todos se curvarão diante do gelo.",
    name: "Lissandra",
    title: "A Bruxa Gélida",
    role: "mid",
    class: "Mage",
    signatureSkill: "Túmulo Congelado",
    stats: { damage: 96, tank: 57, push: 94, utility: 92, scaling: 94 }
  },
  {
    id: "Lux",
    key: 99,
    quote: "Iluminando o caminho!",
    name: "Lux",
    title: "A Dama da Luz",
    role: "mid",
    class: "Mage",
    signatureSkill: "Centelha Final",
    stats: { damage: 96, tank: 56, push: 94, utility: 94, scaling: 95 }
  },
  {
    id: "Malzahar",
    key: 90,
    quote: "A obliteração os aguarda.",
    name: "Malzahar",
    title: "O Profeta do Vazio",
    role: "mid",
    class: "Mage",
    signatureSkill: "Aperto Ínfero",
    stats: { damage: 96, tank: 54, push: 94, utility: 94, scaling: 95 }
  },
  {
    id: "Naafiri",
    key: 950,
    quote: "A matilha sempre caça junta.",
    name: "Naafiri",
    title: "Fera das Cem Mordidas",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Chamado da Matilha",
    stats: { damage: 96, tank: 59, push: 87, utility: 62, scaling: 85 }
  },
  {
    id: "Neeko",
    key: 518,
    quote: "Neeko é a melhor escolha!",
    name: "Neeko",
    title: "A Camaleoa Curiosa",
    role: "mid",
    class: "Mage",
    signatureSkill: "Florescer Repentino",
    stats: { damage: 96, tank: 53, push: 94, utility: 94, scaling: 95 }
  },
  {
    id: "Orianna",
    key: 61,
    quote: "Nós vamos cortar o mal pela raiz.",
    name: "Orianna",
    title: "A Donzela Mecânica",
    role: "mid",
    class: "Mage",
    signatureSkill: "Comando: Onda de Choque",
    stats: { damage: 89, tank: 58, push: 85, utility: 92, scaling: 89 }
  },
  {
    id: "Pantheon",
    key: 80,
    quote: "Eles se lembrarão de que um homem enfrentou os deuses!",
    name: "Pantheon",
    title: "A Lança Indestrutível",
    role: "mid",
    class: "Fighter",
    signatureSkill: "Constelação Cadente",
    stats: { damage: 96, tank: 58, push: 87, utility: 65, scaling: 85 }
  },
  {
    id: "Qiyana",
    key: 246,
    quote: "Vocês deveriam estar ajoelhados!",
    name: "Qiyana",
    title: "A Imperatriz dos Elementos",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Suprema Demonstração de Talento",
    stats: { damage: 90, tank: 56, push: 78, utility: 66, scaling: 85 }
  },
  {
    id: "Ryze",
    key: 13,
    quote: "Um passo à frente da catástrofe.",
    name: "Ryze",
    title: "O Mago Rúnico",
    role: "mid",
    class: "Mage",
    signatureSkill: "Portal de Reinos",
    stats: { damage: 96, tank: 54, push: 94, utility: 96, scaling: 96 }
  },
  {
    id: "Swain",
    key: 50,
    quote: "Eles esperam que eu recue? Que tolos.",
    name: "Swain",
    title: "O Grande General Noxiano",
    role: "mid",
    class: "Mage",
    signatureSkill: "Ascensão Demoníaca",
    stats: { damage: 96, tank: 58, push: 94, utility: 94, scaling: 95 }
  },
  {
    id: "Sylas",
    key: 517,
    quote: "Nenhum trono ficará de pé!",
    name: "Sylas",
    title: "O Abnegado de Dregbourne",
    role: "mid",
    class: "Mage",
    signatureSkill: "Usurpar Supremo",
    stats: { damage: 90, tank: 72, push: 72, utility: 79, scaling: 84 }
  },
  {
    id: "Syndra",
    key: 134,
    quote: "Tanto poder inexplorado...",
    name: "Syndra",
    title: "A Soberana Sombria",
    role: "mid",
    class: "Mage",
    signatureSkill: "Poder Irrestrito",
    stats: { damage: 95, tank: 50, push: 78, utility: 78, scaling: 88 }
  },
  {
    id: "Talon",
    key: 91,
    quote: "Viva pela lâmina, morra pela lâmina.",
    name: "Talon",
    title: "A Sombra da Lâmina",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Ataque das Sombras",
    stats: { damage: 96, tank: 57, push: 87, utility: 63, scaling: 85 }
  },
  {
    id: "TwistedFate",
    key: 4,
    quote: "A sorte está lançada.",
    name: "Twisted Fate",
    title: "O Mestre das Cartas",
    role: "mid",
    class: "Mage",
    signatureSkill: "Destino",
    stats: { damage: 96, tank: 54, push: 94, utility: 88, scaling: 92 }
  },
  {
    id: "Veigar",
    key: 45,
    quote: "Eu sou do mal! Parem de rir!",
    name: "Veigar",
    title: "O Pequeno Mestre do Mal",
    role: "mid",
    class: "Mage",
    signatureSkill: "Explosão Primordial",
    stats: { damage: 96, tank: 54, push: 94, utility: 96, scaling: 96 }
  },
  {
    id: "Velkoz",
    key: 161,
    quote: "O conhecimento através da desintegração.",
    name: "Vel'Koz",
    title: "O Olho do Vazio",
    role: "mid",
    class: "Mage",
    signatureSkill: "Raio Desintegrador de Formas de Vida",
    stats: { damage: 96, tank: 54, push: 94, utility: 96, scaling: 96 }
  },
  {
    id: "Vex",
    key: 711,
    quote: "Tanto faz... Só não me enche o saco.",
    name: "Vex",
    title: "A Melancolista",
    role: "mid",
    class: "Mage",
    signatureSkill: "Onda Sombria",
    stats: { damage: 86, tank: 52, push: 82, utility: 76, scaling: 86 }
  },
  {
    id: "Viktor",
    key: 112,
    quote: "Junte-se à gloriosa evolução!",
    name: "Viktor",
    title: "O Arauto das Máquinas",
    role: "mid",
    class: "Mage",
    signatureSkill: "Tempestade do Caos",
    stats: { damage: 93, tank: 52, push: 88, utility: 74, scaling: 93 }
  },
  {
    id: "Xerath",
    key: 101,
    quote: "Eu sou a magia encarnada!",
    name: "Xerath",
    title: "O Mago Ascendente",
    role: "mid",
    class: "Mage",
    signatureSkill: "Ritual Arcano",
    stats: { damage: 96, tank: 55, push: 94, utility: 96, scaling: 96 }
  },
  {
    id: "Yasuo",
    key: 157,
    quote: "A morte é como o vento: sempre ao meu lado.",
    name: "Yasuo",
    title: "O Imperdoável",
    role: "mid",
    class: "Fighter",
    signatureSkill: "Último Suspiro",
    stats: { damage: 91, tank: 64, push: 86, utility: 75, scaling: 87 }
  },
  {
    id: "Yone",
    key: 777,
    quote: "Uma lâmina para o passado, outra para o futuro.",
    name: "Yone",
    title: "O Inesquecido",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Destino Selado",
    stats: { damage: 94, tank: 66, push: 84, utility: 80, scaling: 91 }
  },
  {
    id: "Zed",
    key: 238,
    quote: "A lâmina que não se vê é a mais mortífera.",
    name: "Zed",
    title: "O Mestre das Sombras",
    role: "mid",
    class: "Assassin",
    signatureSkill: "Marca Fatal",
    stats: { damage: 96, tank: 56, push: 87, utility: 63, scaling: 85 }
  },
  {
    id: "Zoe",
    key: 142,
    quote: "Sim! Isso vai ser tão divertido!",
    name: "Zoe",
    title: "O Aspecto do Crepúsculo",
    role: "mid",
    class: "Mage",
    signatureSkill: "Salto Dimensional",
    stats: { damage: 96, tank: 59, push: 94, utility: 92, scaling: 94 }
  },
  // ===================== ATIRADOR (ADC) (23 CAMPEÕES) =====================
  {
    id: "Aphelios",
    key: 523,
    quote: "Condenados pela luz, salvos pela escuridão.",
    name: "Aphelios",
    title: "A Arma dos Devotos",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Vigília do Plenilúnio",
    stats: { damage: 97, tank: 44, push: 89, utility: 75, scaling: 99 }
  },
  {
    id: "Ashe",
    key: 22,
    quote: "O mundo todo em uma só flecha.",
    name: "Ashe",
    title: "A Arqueira do Gelo",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Flecha de Cristal Encantada",
    stats: { damage: 82, tank: 48, push: 80, utility: 95, scaling: 81 }
  },
  {
    id: "Caitlyn",
    key: 51,
    quote: "Eu cuido do caso.",
    name: "Caitlyn",
    title: "A Xerife de Piltover",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Ás no Buraco",
    stats: { damage: 90, tank: 46, push: 93, utility: 68, scaling: 88 }
  },
  {
    id: "Draven",
    key: 119,
    quote: "Bem-vindo a League of Draven!",
    name: "Draven",
    title: "O Carrasco de Noxus",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Reta da Morte",
    stats: { damage: 98, tank: 53, push: 94, utility: 56, scaling: 98 }
  },
  {
    id: "Ezreal",
    key: 81,
    quote: "Tem muitos magos por aí... Nenhum como eu!",
    name: "Ezreal",
    title: "O Explorador Pródigo",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Disparo Místico & Barragem",
    stats: { damage: 87, tank: 54, push: 78, utility: 60, scaling: 83 }
  },
  {
    id: "Jhin",
    key: 202,
    quote: "No massacre, floresço como uma flor no amanhecer.",
    name: "Jhin",
    title: "O Virtuoso",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Aclamação (4º Tiro Crítico)",
    stats: { damage: 93, tank: 47, push: 79, utility: 84, scaling: 86 }
  },
  {
    id: "Jinx",
    key: 222,
    quote: "Regras são feitas para serem quebradas... Como prédios! Ou pessoas!",
    name: "Jinx",
    title: "O Gatilho Desenfreado",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Super Mega Míssil da Morte",
    stats: { damage: 96, tank: 45, push: 98, utility: 64, scaling: 98 }
  },
  {
    id: "Kaisa",
    key: 145,
    quote: "Eles pensam que sou um monstro. Mas eu luto pela humanidade.",
    name: "Kai'Sa",
    title: "A Filha do Vazio",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Instinto Assassino",
    stats: { damage: 95, tank: 52, push: 86, utility: 62, scaling: 94 }
  },
  {
    id: "Kalista",
    key: 429,
    quote: "Nosso ódio é infinito.",
    name: "Kalista",
    title: "A Lança da Vingança",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Chamado do Destino",
    stats: { damage: 98, tank: 52, push: 94, utility: 59, scaling: 98 }
  },
  {
    id: "KogMaw",
    key: 96,
    quote: "Hora do banquete!",
    name: "Kog'Maw",
    title: "A Boca do Abismo",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Artilharia Viva",
    stats: { damage: 98, tank: 52, push: 94, utility: 60, scaling: 98 }
  },
  {
    id: "Lucian",
    key: 236,
    quote: "Todo mundo morre. Alguns só precisam de uma ajudinha.",
    name: "Lucian",
    title: "O Purificador",
    role: "adc",
    class: "Marksman",
    signatureSkill: "O Expurgo",
    stats: { damage: 91, tank: 50, push: 82, utility: 54, scaling: 79 }
  },
  {
    id: "MissFortune",
    key: 21,
    quote: "A sorte sempre sorri pra mim.",
    name: "Miss Fortune",
    title: "A Caçadora de Recompensas",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Metendo Bala",
    stats: { damage: 98, tank: 52, push: 94, utility: 60, scaling: 98 }
  },
  {
    id: "Nilah",
    key: 895,
    quote: "Alegria abundante para todo o mundo!",
    name: "Nilah",
    title: "A Alegria Irrestrita",
    role: "adc",
    class: "Fighter",
    signatureSkill: "Apoteose",
    stats: { damage: 98, tank: 54, push: 94, utility: 59, scaling: 98 }
  },
  {
    id: "Samira",
    key: 360,
    quote: "Você quer estilo? Veio ao lugar certo.",
    name: "Samira",
    title: "A Rosa do Deserto",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Gatilho Infernal",
    stats: { damage: 98, tank: 55, push: 94, utility: 58, scaling: 98 }
  },
  {
    id: "Sivir",
    key: 15,
    quote: "Eu sempre cobro adiantado.",
    name: "Sivir",
    title: "A Mestra da Batalha",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Na Caçada",
    stats: { damage: 98, tank: 53, push: 94, utility: 56, scaling: 98 }
  },
  {
    id: "Smolder",
    key: 901,
    quote: "Cuidado! Minha mãe está olhando!",
    name: "Smolder",
    title: "O Filhote Flamejante",
    role: "adc",
    class: "Marksman",
    signatureSkill: "MANHÊÊÊ!",
    stats: { damage: 98, tank: 52, push: 94, utility: 60, scaling: 98 }
  },
  {
    id: "Tristana",
    key: 18,
    quote: "Uma vez atirador, sempre atirador!",
    name: "Tristana",
    title: "A Artilheira Yordle",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Carga Explosiva (Destruidora de Torres)",
    stats: { damage: 92, tank: 48, push: 99, utility: 60, scaling: 92 }
  },
  {
    id: "Twitch",
    key: 29,
    quote: "O que não mata só engorda!",
    name: "Twitch",
    title: "O Semeador da Peste",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Passando Fogo",
    stats: { damage: 98, tank: 52, push: 94, utility: 58, scaling: 98 }
  },
  {
    id: "Varus",
    key: 110,
    quote: "Os culpados conhecerão o sofrimento.",
    name: "Varus",
    title: "A Flecha da Vingança",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Corrente de Corrupção",
    stats: { damage: 88, tank: 48, push: 84, utility: 82, scaling: 84 }
  },
  {
    id: "Vayne",
    key: 67,
    quote: "Vamos caçar aqueles que caíram na escuridão.",
    name: "Vayne",
    title: "A Caçadora Noturna",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Hora Final",
    stats: { damage: 98, tank: 51, push: 94, utility: 56, scaling: 98 }
  },
  {
    id: "Xayah",
    key: 498,
    quote: "Eles nunca nos viram chegar.",
    name: "Xayah",
    title: "A Rebelde",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Tempestade de Plumas",
    stats: { damage: 98, tank: 56, push: 94, utility: 56, scaling: 98 }
  },
  {
    id: "Zeri",
    key: 221,
    quote: "Eu sou a faísca que vai acender a fogueira!",
    name: "Zeri",
    title: "A Faísca de Zaun",
    role: "adc",
    class: "Marksman",
    signatureSkill: "Impacto Eletrizante",
    stats: { damage: 98, tank: 55, push: 94, utility: 58, scaling: 98 }
  },
  {
    id: "Ziggs",
    key: 115,
    quote: "Isso vai ser um estouro!",
    name: "Ziggs",
    title: "O Especialista em Hexplosivos",
    role: "adc",
    class: "Mage",
    signatureSkill: "Bomba Megainfernal",
    stats: { damage: 92, tank: 54, push: 84, utility: 64, scaling: 92 }
  },
  // ===================== SUPORTE (SUPPORT) (27 CAMPEÕES) =====================
  {
    id: "Alistar",
    key: 12,
    quote: "Nada pode me deter!",
    name: "Alistar",
    title: "O Minotauro",
    role: "support",
    class: "Tank",
    signatureSkill: "Cabeçada + Pulverizar (Inquebrável)",
    stats: { damage: 52, tank: 99, push: 55, utility: 93, scaling: 74 }
  },
  {
    id: "Bard",
    key: 432,
    quote: "♪ Bwoooong ♪ (Sons harmônicos cósmicos)",
    name: "Bardo",
    title: "O Protetor Andarilho",
    role: "support",
    class: "Support",
    signatureSkill: "Têmpera do Destino",
    stats: { damage: 74, tank: 56, push: 66, utility: 98, scaling: 75 }
  },
  {
    id: "Blitzcrank",
    key: 53,
    quote: "Ligado e pronto para servir.",
    name: "Blitzcrank",
    title: "O Grande Golem a Vapor",
    role: "support",
    class: "Tank",
    signatureSkill: "Puxão Biônico",
    stats: { damage: 62, tank: 88, push: 50, utility: 92, scaling: 68 }
  },
  {
    id: "Brand",
    key: 63,
    quote: "Pronto para incendiar o mundo?",
    name: "Brand",
    title: "A Vingança Flamejante",
    role: "support",
    class: "Mage",
    signatureSkill: "Piroclasma",
    stats: { damage: 82, tank: 54, push: 74, utility: 98, scaling: 75 }
  },
  {
    id: "Braum",
    key: 201,
    quote: "O coração é o músculo mais forte.",
    name: "Braum",
    title: "O Coração de Freljord",
    role: "support",
    class: "Tank",
    signatureSkill: "Fissura Glacial & Escudo",
    stats: { damage: 50, tank: 97, push: 49, utility: 94, scaling: 76 }
  },
  {
    id: "Janna",
    key: 40,
    quote: "Ao seu dispor.",
    name: "Janna",
    title: "A Fúria da Tormenta",
    role: "support",
    class: "Support",
    signatureSkill: "Monção",
    stats: { damage: 78, tank: 57, push: 70, utility: 98, scaling: 75 }
  },
  {
    id: "Karma",
    key: 43,
    quote: "Sempre confie no seu espírito.",
    name: "Karma",
    title: "A Iluminada",
    role: "support",
    class: "Mage",
    signatureSkill: "Mantra: Escudo Coletivo",
    stats: { damage: 72, tank: 62, push: 68, utility: 91, scaling: 75 }
  },
  {
    id: "Leona",
    key: 89,
    quote: "O sol sempre nasce.",
    name: "Leona",
    title: "A Alvorada Radiante",
    role: "support",
    class: "Tank",
    signatureSkill: "Labanareda Solar",
    stats: { damage: 56, tank: 98, push: 48, utility: 95, scaling: 70 }
  },
  {
    id: "Lulu",
    key: 117,
    quote: "Gosto daquele gosto de roxo.",
    name: "Lulu",
    title: "A Fada Feiticeira",
    role: "support",
    class: "Support",
    signatureSkill: "Crescimento Gigante",
    stats: { damage: 59, tank: 55, push: 58, utility: 96, scaling: 86 }
  },
  {
    id: "Maokai",
    key: 57,
    quote: "Eu vou limpar essa terra!",
    name: "Maokai",
    title: "O Ente Sinistro",
    role: "support",
    class: "Tank",
    signatureSkill: "Garras da Natureza",
    stats: { damage: 61, tank: 98, push: 51, utility: 98, scaling: 72 }
  },
  {
    id: "Milio",
    key: 902,
    quote: "Tudo vai ficar bem quentinho!",
    name: "Milio",
    title: "A Chama Gentil",
    role: "support",
    class: "Support",
    signatureSkill: "Sopro de Vida",
    stats: { damage: 80, tank: 56, push: 72, utility: 98, scaling: 75 }
  },
  {
    id: "Morgana",
    key: 25,
    quote: "Eles sentirão a nossa dor.",
    name: "Morgana",
    title: "A Caída",
    role: "support",
    class: "Mage",
    signatureSkill: "Grilhões da Alma",
    stats: { damage: 80, tank: 58, push: 72, utility: 98, scaling: 75 }
  },
  {
    id: "Nami",
    key: 267,
    quote: "Eu decido o que a maré trará.",
    name: "Nami",
    title: "A Conjuradora das Marés",
    role: "support",
    class: "Support",
    signatureSkill: "Maré Violenta",
    stats: { damage: 78, tank: 55, push: 70, utility: 98, scaling: 75 }
  },
  {
    id: "Nautilus",
    key: 111,
    quote: "Cuidado com as profundezas.",
    name: "Nautilus",
    title: "O Titã das Profundezas",
    role: "support",
    class: "Tank",
    signatureSkill: "Carga de Profundidade",
    stats: { damage: 55, tank: 95, push: 50, utility: 96, scaling: 72 }
  },
  {
    id: "Pyke",
    key: 555,
    quote: "Tem muito espaço no fundo do mar...",
    name: "Pyke",
    title: "O Estripador das Águas Sangrentas",
    role: "support",
    class: "Assassin",
    signatureSkill: "Morte das Profundezas (Execução)",
    stats: { damage: 85, tank: 52, push: 62, utility: 88, scaling: 69 }
  },
  {
    id: "Rakan",
    key: 497,
    quote: "Eu sei o que você está pensando: Que cara bonito!",
    name: "Rakan",
    title: "O Charmoso",
    role: "support",
    class: "Support",
    signatureSkill: "Entrada Triunfal & Dança Rápida",
    stats: { damage: 58, tank: 76, push: 52, utility: 97, scaling: 80 }
  },
  {
    id: "Rell",
    key: 526,
    quote: "Eu vou quebrar todas as correntes de Noxus.",
    name: "Rell",
    title: "A Dama de Ferro",
    role: "support",
    class: "Tank",
    signatureSkill: "Tempestade Magnética",
    stats: { damage: 58, tank: 90, push: 48, utility: 92, scaling: 72 }
  },
  {
    id: "Renata",
    key: 888,
    quote: "Se você quer algo bem feito, faça com dinheiro.",
    name: "Renata Glasc",
    title: "A Baronesa da Química",
    role: "support",
    class: "Support",
    signatureSkill: "Apropriação Agressiva",
    stats: { damage: 82, tank: 58, push: 74, utility: 98, scaling: 75 }
  },
  {
    id: "Senna",
    key: 235,
    quote: "Nenhuma escuridão dura para sempre.",
    name: "Senna",
    title: "A Redentora",
    role: "support",
    class: "Support",
    signatureSkill: "Sombra da Alvorada",
    stats: { damage: 76, tank: 54, push: 68, utility: 98, scaling: 75 }
  },
  {
    id: "Seraphine",
    key: 147,
    quote: "Vamos cantar juntos em harmonia!",
    name: "Seraphine",
    title: "A Cantora Sonhadora",
    role: "support",
    class: "Support",
    signatureSkill: "Bis",
    stats: { damage: 64, tank: 52, push: 56, utility: 94, scaling: 75 }
  },
  {
    id: "Sona",
    key: 37,
    quote: "♪ Melodia suave e ressonante dos acordes de Etwahl ♪",
    name: "Sona",
    title: "A Mestra das Cordas",
    role: "support",
    class: "Support",
    signatureSkill: "Crescendo",
    stats: { damage: 80, tank: 54, push: 72, utility: 98, scaling: 75 }
  },
  {
    id: "Soraka",
    key: 16,
    quote: "Que as estrelas guiem nossos passos.",
    name: "Soraka",
    title: "A Filha das Estrelas",
    role: "support",
    class: "Support",
    signatureSkill: "Desejo",
    stats: { damage: 78, tank: 57, push: 70, utility: 98, scaling: 75 }
  },
  {
    id: "Taric",
    key: 44,
    quote: "Eu escalarei a montanha mais uma vez.",
    name: "Taric",
    title: "O Escudo de Valoran",
    role: "support",
    class: "Support",
    signatureSkill: "Resplendor Cósmico",
    stats: { damage: 62, tank: 98, push: 52, utility: 98, scaling: 72 }
  },
  {
    id: "Thresh",
    key: 412,
    quote: "Que tormento delicioso estamos prestes a criar...",
    name: "Thresh",
    title: "O Guardião das Correntes",
    role: "support",
    class: "Support",
    signatureSkill: "Sentença & Lanterna",
    stats: { damage: 60, tank: 86, push: 54, utility: 98, scaling: 82 }
  },
  {
    id: "Yuumi",
    key: 350,
    quote: "Você é o meu humano favorito!",
    name: "Yuumi",
    title: "A Gata Mágica",
    role: "support",
    class: "Support",
    signatureSkill: "Capítulo Final",
    stats: { damage: 80, tank: 53, push: 72, utility: 98, scaling: 75 }
  },
  {
    id: "Zilean",
    key: 26,
    quote: "Eu já vi o futuro... E você não sobrevive.",
    name: "Zilean",
    title: "O Guardião do Tempo",
    role: "support",
    class: "Support",
    signatureSkill: "Alteração Temporal",
    stats: { damage: 80, tank: 57, push: 72, utility: 98, scaling: 75 }
  },
  {
    id: "Zyra",
    key: 143,
    quote: "Sinta o abraço dos espinhos.",
    name: "Zyra",
    title: "A Ascensão dos Espinhos",
    role: "support",
    class: "Mage",
    signatureSkill: "Espinhos Sufocantes",
    stats: { damage: 80, tank: 55, push: 72, utility: 98, scaling: 75 }
  },
];

// Identificação precisa de perfis competitivos (Dano Mágico AP, Suporte Tanque e Cura/Sustain)
const AP_CHAMPION_IDS = new Set([
  "Gwen", "Mordekaiser", "Rumble", "Singed", "Gragas", "Kennen", "Teemo", "Kayle",
  "Akali", "Katarina", "LeBlanc", "Ekko", "Fizz", "Diana", "Kassadin", "Evelynn", "Nidalee",
  "Ahri", "Anivia", "Annie", "AurelionSol", "Azir", "Cassiopeia", "Hwei", "Karma", "Karthus",
  "Lissandra", "Lux", "Malzahar", "Neeko", "Orianna", "Ryze", "Swain", "Syndra", "Taliyah",
  "TwistedFate", "Veigar", "Velkoz", "Vex", "Viktor", "Vladimir", "Xerath", "Ziggs", "Zoe",
  "Brand", "Zyra", "Heimerdinger", "Fiddlesticks", "Lillia", "Shyvana", "Elise",
  "Lulu", "Nami", "Janna", "Soraka", "Sona", "Yuumi", "Milio", "Seraphine", "Morgana", "Renata"
]);

const TANK_SUPPORT_IDS = new Set([
  "Nautilus", "Leona", "Braum", "Alistar", "Thresh", "Blitzcrank", "Rakan", "TahmKench", "Taric", "Rell"
]);

const HIGH_SUSTAIN_IDS = new Set([
  "Aatrox", "Fiora", "Warwick", "Vladimir", "Soraka", "Briar", "Irelia", "Swain", "Sylas", "DrMundo", "Zac", "Volibear", "Yuumi", "Olaf", "Illaoi"
]);

// Inicializa os metadados táticos de cada campeão
CHAMPIONS.forEach(c => {
  if (c.class === "Tank") {
    c.damageType = "Tank";
    c.subclass = (c.role === "support" || TANK_SUPPORT_IDS.has(c.id)) ? "TankSupport" : "Tank";
  } else if (c.role === "support" || c.class === "Support") {
    if (TANK_SUPPORT_IDS.has(c.id)) {
      c.damageType = "Tank";
      c.subclass = "TankSupport";
    } else if (c.id === "Senna") {
      c.damageType = "AD";
      c.subclass = "Marksman";
    } else if (c.id === "Pyke") {
      c.damageType = "AD";
      c.subclass = "ADAssassin";
    } else {
      c.damageType = "AP";
      c.subclass = "Enchanter";
    }
  } else if (c.class === "Marksman") {
    c.damageType = (c.id === "Corki") ? "AP" : "AD";
    c.subclass = "Marksman";
  } else if (c.class === "Mage") {
    c.damageType = "AP";
    c.subclass = "Mage";
  } else if (c.class === "Assassin") {
    c.damageType = AP_CHAMPION_IDS.has(c.id) ? "AP" : "AD";
    c.subclass = c.damageType === "AP" ? "APAssassin" : "ADAssassin";
  } else if (c.class === "Fighter") {
    c.damageType = AP_CHAMPION_IDS.has(c.id) ? "AP" : "AD";
    c.subclass = c.damageType === "AP" ? "APFighter" : "ADFighter";
  } else {
    c.damageType = AP_CHAMPION_IDS.has(c.id) ? "AP" : "AD";
    c.subclass = c.class || "ADFighter";
  }
  c.hasSustain = HIGH_SUSTAIN_IDS.has(c.id);
});

// Helper para buscar campeão por ID ou Nome (com suporte a aliases como Wukong -> MonkeyKing)
function getChampionById(id) {
  if (!id) return null;
  const strId = String(id).trim();
  const lower = strId.toLowerCase();
  return CHAMPIONS.find(c =>
    c.id === strId ||
    c.id.toLowerCase() === lower ||
    c.name.toLowerCase() === lower ||
    (c.id === "MonkeyKing" && (lower === "wukong" || lower === "monkeyking"))
  ) || null;
}

// Retorna campeões filtrados por rota
function getChampionsByRole(role) {
  return CHAMPIONS.filter(c => c.role === role);
}

// Retorna uma composição aleatória equilibrada (1 de cada rota)
function getRandomTeamRoster() {
  const roles = ["top", "jungle", "mid", "adc", "support"];
  const roster = {};
  roles.forEach(role => {
    const list = getChampionsByRole(role);
    const chosen = list[Math.floor(Math.random() * list.length)];
    roster[role] = chosen.id;
  });
  return roster;
}

// Calcula estatísticas globais da equipe
function calculateTeamStats(rosterObj, upgrades = []) {
  const safeRoster = rosterObj || {};
  const roles = ["top", "jungle", "mid", "adc", "support"];
  let totalDmg = 0;
  let totalTank = 0;
  let totalPush = 0;
  let totalUtility = 0;
  let totalScaling = 0;
  let count = 0;

  roles.forEach(role => {
    const rawChamp = safeRoster[role];
    const champKey = typeof rawChamp === "object" ? (rawChamp.id || rawChamp.name) : rawChamp;
    const champ = getChampionById(champKey);
    if (champ) {
      totalDmg += champ.stats.damage;
      totalTank += champ.stats.tank;
      totalPush += champ.stats.push;
      totalUtility += champ.stats.utility;
      totalScaling += champ.stats.scaling;
      count++;
    }
  });

  if (count === 0) count = 1;

  let baseStats = {
    damage: Math.round(totalDmg / count),
    tank: Math.round(totalTank / count),
    push: Math.round(totalPush / count),
    utility: Math.round(totalUtility / count),
    scaling: Math.round(totalScaling / count)
  };

  // Aplica os upgrades obtidos entre fases
  upgrades.forEach(u => {
    if (u.effect) {
      Object.keys(u.effect).forEach(stat => {
        if (baseStats[stat] !== undefined) {
          baseStats[stat] += u.effect[stat];
        }
      });
    }
  });

  return baseStats;
}


// Retorna a URL oficial de áudio da fala de escolha do campeão (CommunityDragon)
function getChampionVoiceUrl(champOrKey) {
  const key = typeof champOrKey === "object" ? champOrKey.key : champOrKey;
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-choose-vo/${key}.ogg`;
}



// =================== js/data/items.js ===================

// Catálogo Oficial Completo de Itens de League of Legends (Patch 14.20.1)
// Ícones carregados diretamente do CDN oficial do DataDragon:
// https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/{id}.png

const LOL_ITEMS = {
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
const ITEM_CATEGORIES = [
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
function getItemById(id) {
  return LOL_ITEMS[id] || null;
}

// Retorna a URL oficial de alta definição do DataDragon
function getItemIconUrl(itemId) {
  return `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/${itemId}.png`;
}

// Retorna o item inicial recomendado aos 00:00
function getStarterItemForChampion(champOrId) {
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
function getRecommendedBootsForChampion(champOrId, oppChampOrId = null) {
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
const SUBCLASS_FULL_BUILDS = {
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

const CLASS_ITEM_BUILDS = {
  Fighter: SUBCLASS_FULL_BUILDS.ADFighter,
  Assassin: SUBCLASS_FULL_BUILDS.ADAssassin,
  Mage: SUBCLASS_FULL_BUILDS.Mage,
  Marksman: SUBCLASS_FULL_BUILDS.Marksman,
  Tank: SUBCLASS_FULL_BUILDS.Tank,
  Support: SUBCLASS_FULL_BUILDS.Enchanter
};

const SUBCLASS_ITEM_BUILDS = SUBCLASS_FULL_BUILDS;

// Retorna o próximo item lendário ou bota que o campeão quer fechar
function getRecommendedItemForChampion(champOrId, slotOrItems = 0, opponentChampOrId = null, enemyTeamRoster = null) {
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
function getItemRecipeTree(itemId) {
  const item = LOL_ITEMS[itemId];
  if (!item) return null;

  return {
    item,
    components: (item.from || []).map(compChildId => getItemRecipeTree(compChildId)).filter(Boolean)
  };
}

// Retorna a próxima compra ótima (componente básico, intermediário ou combinação final)
function getNextPurchaseStep(currentInventory, targetItemId, currentGold) {
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



// =================== js/data/upgrades.js ===================

// Aprimoramentos e Buffs Hextech adquiridos entre rodadas do CBLOL
const HEXTECH_UPGRADES = [
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

function getRandomUpgrades(count = 3, excludeIds = []) {
  const available = HEXTECH_UPGRADES.filter(u => !excludeIds.includes(u.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}



// =================== js/engine/audio.js ===================

// Motor de Áudio Procedural com Web Audio API para imersão no League of Legends
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : 0.25;
    }
    return this.isMuted;
  }

  // Clique de botão com toque metálico Hextech
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.05);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.12);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Som ao travar/escolher um campeão
  playPick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.3);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.42);
  }

  // Impacto em estrutura (Torre sofrendo dano)
  playTowerHit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.15);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Destruição de Torre (desmoronamento e explosão)
  playTowerDestroyed() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Ruído de desmoronamento
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(60, t + 0.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.52);

    // Onda grave
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(130, t);
    subOsc.frequency.exponentialRampToValueAtTime(35, t + 0.6);

    subGain.gain.setValueAtTime(0.6, t);
    subGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(t);
    subOsc.stop(t + 0.62);
  }

  // Inibidor destruído (sirene de alarme de perigo)
  playInhibitorDestroyed() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [0, 0.2, 0.4].forEach(delay => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, t + delay);
      osc.frequency.exponentialRampToValueAtTime(340, t + delay + 0.16);

      gain.gain.setValueAtTime(0.28, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.17);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + delay);
      osc.stop(t + delay + 0.18);
    });
  }

  // Explosão do Nexus (épico, grave e estrondoso)
  playNexusExplosion() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Sub-bass poderoso
    const bass = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(160, t);
    bass.frequency.exponentialRampToValueAtTime(25, t + 1.6);

    bassGain.gain.setValueAtTime(0.9, t);
    bassGain.gain.exponentialRampToValueAtTime(0.01, t + 1.6);

    bass.connect(bassGain);
    bassGain.connect(this.masterGain);
    bass.start(t);
    bass.stop(t + 1.65);

    // Efeito de energia cósmica
    const sweep = this.ctx.createOscillator();
    const sweepGain = this.ctx.createGain();
    sweep.type = "triangle";
    sweep.frequency.setValueAtTime(200, t);
    sweep.frequency.linearRampToValueAtTime(900, t + 0.4);
    sweep.frequency.exponentialRampToValueAtTime(50, t + 1.4);

    sweepGain.gain.setValueAtTime(0.4, t);
    sweepGain.gain.exponentialRampToValueAtTime(0.01, t + 1.4);

    sweep.connect(sweepGain);
    sweepGain.connect(this.masterGain);
    sweep.start(t);
    sweep.stop(t + 1.45);
  }

  // Fanfarra de Vitória
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Dó maior triunfante
    const times = [0, 0.15, 0.3, 0.45, 0.65, 0.9];
    const dur = [0.25, 0.25, 0.25, 0.35, 0.45, 1.2];

    const t = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + times[idx]);

      gain.gain.setValueAtTime(0.35, t + times[idx]);
      gain.gain.exponentialRampToValueAtTime(0.001, t + times[idx] + dur[idx]);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + times[idx]);
      osc.stop(t + times[idx] + dur[idx] + 0.05);
    });
  }

  // Comemoração de Série Vencida (Fanfarra Triunfal dos Playoffs)
  playSeriesWon() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    const times = [0, 0.12, 0.24, 0.38, 0.52, 0.68, 0.88];
    const dur = [0.2, 0.2, 0.25, 0.3, 0.35, 0.5, 1.4];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === notes.length - 1 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, t + times[idx]);

      gain.gain.setValueAtTime(0.32, t + times[idx]);
      gain.gain.exponentialRampToValueAtTime(0.001, t + times[idx] + dur[idx]);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + times[idx]);
      osc.stop(t + times[idx] + dur[idx] + 0.05);
    });
  }

  // Celebração do Grande Campeão do CBLOL (Fanfarra Triunfal + Rugido de Torcida no Ginásio + Fogos)
  playChampionFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Fanfarra Triunfal Heroica (Metais e Cordas em Dó Maior Brilhante)
    const chordNotes = [
      { freq: 261.63, start: 0, dur: 0.28, type: "triangle", gain: 0.3 },
      { freq: 329.63, start: 0.14, dur: 0.28, type: "triangle", gain: 0.3 },
      { freq: 392.00, start: 0.28, dur: 0.35, type: "triangle", gain: 0.35 },
      { freq: 523.25, start: 0.50, dur: 0.60, type: "triangle", gain: 0.4 },
      { freq: 659.25, start: 0.70, dur: 0.50, type: "triangle", gain: 0.35 },
      { freq: 783.99, start: 0.90, dur: 0.60, type: "triangle", gain: 0.4 },
      { freq: 523.25, start: 1.20, dur: 2.8, type: "sine", gain: 0.35 },
      { freq: 659.25, start: 1.20, dur: 2.8, type: "triangle", gain: 0.3 },
      { freq: 783.99, start: 1.20, dur: 2.8, type: "triangle", gain: 0.35 },
      { freq: 1046.50, start: 1.20, dur: 3.0, type: "sine", gain: 0.28 },
      { freq: 1318.51, start: 1.25, dur: 2.5, type: "triangle", gain: 0.15 }
    ];

    chordNotes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = n.type;
      osc.frequency.setValueAtTime(n.freq, t + n.start);

      gain.gain.setValueAtTime(0.001, t + n.start);
      gain.gain.linearRampToValueAtTime(n.gain, t + n.start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.start + n.dur);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + n.start);
      osc.stop(t + n.start + n.dur + 0.1);
    });

    // 2. Simulação Procedural da Torcida no Ginásio (Crowd Roar / Cheering)
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 4.2);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, t);
      filter.frequency.linearRampToValueAtTime(750, t + 1.2);
      filter.frequency.linearRampToValueAtTime(600, t + 3.0);
      filter.Q.setValueAtTime(1.8, t);

      const crowdGain = this.ctx.createGain();
      crowdGain.gain.setValueAtTime(0.001, t);
      crowdGain.gain.linearRampToValueAtTime(0.35, t + 0.8);
      crowdGain.gain.linearRampToValueAtTime(0.42, t + 1.8);
      crowdGain.gain.exponentialRampToValueAtTime(0.001, t + 4.0);

      noise.connect(filter);
      filter.connect(crowdGain);
      crowdGain.connect(this.masterGain);

      noise.start(t);
      noise.stop(t + 4.2);
    } catch (e) {}

    // 3. Estalidos de Fogos de Artifício (Fireworks Pops)
    [0.6, 1.3, 1.9, 2.5, 3.1].forEach(delay => {
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();

      popOsc.type = "sine";
      popOsc.frequency.setValueAtTime(400, t + delay);
      popOsc.frequency.exponentialRampToValueAtTime(90, t + delay + 0.12);

      popGain.gain.setValueAtTime(0.25, t + delay);
      popGain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.14);

      popOsc.connect(popGain);
      popGain.connect(this.masterGain);

      popOsc.start(t + delay);
      popOsc.stop(t + delay + 0.15);
    });
  }

  // Tom de Derrota
  playDefeat() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [330, 311, 293, 220]; // Tristeza cromática menor
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.35);

      gain.gain.setValueAtTime(0.25, t + idx * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.35 + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.35);
      osc.stop(t + idx * 0.35 + 0.52);
    });
  }

  // Alerta sonoro de decisão tática e objetivos épicos
  playObjectiveAlert() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [220, 277.18, 329.63, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);
      gain.gain.setValueAtTime(0.3, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.27);
    });
  }

  // Reproduz o áudio da fala de escolha do campeão (CommunityDragon Audio VO)
  playChampionVoice(key) {
    if (this.isMuted || !key) return;

    try {
      // Toca o clique metálico Hextech para feedback imediato
      this.playPick();

      // Interrompe fala anterior se ainda estiver tocando
      if (this.currentVoiceAudio) {
        try {
          this.currentVoiceAudio.pause();
          this.currentVoiceAudio.currentTime = 0;
        } catch (err) {}
      }

      const primaryUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-choose-vo/${key}.ogg`;
      const fallbackUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-choose-vo/${key}.ogg`;

      const audio = new Audio();
      audio.volume = 0.95;
      audio.src = primaryUrl;

      let fallbackAttempted = false;
      audio.onerror = () => {
        if (!fallbackAttempted) {
          fallbackAttempted = true;
          audio.src = fallbackUrl;
          const p = audio.play();
          if (p !== undefined) p.catch(() => {});
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          // Navegador pode requerer interação prévia do usuário, o que já ocorre no clique
          console.log("Audio play info:", err);
        });
      }

      this.currentVoiceAudio = audio;
    } catch (e) {
      console.warn("Erro ao reproduzir voz do campeão:", e);
    }
  }

  // Som de Double Kill (Abate Duplo)
  playDoubleKill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [330, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.14);
      gain.gain.setValueAtTime(0.35, t + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.14 + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.14);
      osc.stop(t + idx * 0.14 + 0.38);
    });
  }

  // Som de Triple Kill (Abate Triplo)
  playTripleKill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [330, 440, 554.37].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.13);
      gain.gain.setValueAtTime(0.38, t + idx * 0.13);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.13 + 0.45);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.13);
      osc.stop(t + idx * 0.13 + 0.48);
    });
  }

  // Som de Quadra Kill (Abate Quádruplo)
  playQuadraKill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [330, 440, 554.37, 659.25].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + idx * 0.12);
      gain.gain.setValueAtTime(0.4, t + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.5);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.12);
      osc.stop(t + idx * 0.12 + 0.53);
    });
  }

  // Som de PENTAKILL (O clímax épico do League of Legends!)
  playPentakill() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Sub-bass estrondoso
    const bass = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(110, t);
    bass.frequency.exponentialRampToValueAtTime(40, t + 1.2);
    bassGain.gain.setValueAtTime(0.8, t);
    bassGain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);
    bass.connect(bassGain);
    bassGain.connect(this.masterGain);
    bass.start(t);
    bass.stop(t + 1.25);

    // Fanfarra triunfante de 5 notas
    [261.63, 329.63, 392.0, 523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + idx * 0.11);
      gain.gain.setValueAtTime(0.45, t + idx * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.11 + 0.7);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.11);
      osc.stop(t + idx * 0.11 + 0.75);
    });
  }

  // Som de ACE (Extermínio da equipe inteira)
  playAce() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Sino / Gongo profundo de extermínio
    const gong = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();
    gong.type = "sine";
    gong.frequency.setValueAtTime(180, t);
    gong.frequency.exponentialRampToValueAtTime(55, t + 1.4);
    gongGain.gain.setValueAtTime(0.7, t);
    gongGain.gain.exponentialRampToValueAtTime(0.01, t + 1.4);
    gong.connect(gongGain);
    gongGain.connect(this.masterGain);
    gong.start(t);
    gong.stop(t + 1.45);

    // Trompa de alerta
    [440, 587.33].forEach((freq, idx) => {
      const horn = this.ctx.createOscillator();
      const hornGain = this.ctx.createGain();
      horn.type = "sawtooth";
      horn.frequency.setValueAtTime(freq, t + 0.15 + idx * 0.2);
      hornGain.gain.setValueAtTime(0.35, t + 0.15 + idx * 0.2);
      hornGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15 + idx * 0.2 + 0.6);
      horn.connect(hornGain);
      hornGain.connect(this.masterGain);
      horn.start(t + 0.15 + idx * 0.2);
      horn.stop(t + 0.15 + idx * 0.2 + 0.65);
    });
  }

  // Som ao concluir a compra de um item lendário (Hextech Anvil & Gold Chime)
  playItemCompleted() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Tilintar metálico dourado
    [987.77, 1318.51, 1975.53].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);
      gain.gain.setValueAtTime(0.25, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.28);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.3);
    });
  }
}

const sound = new SoundEngine();



// =================== js/engine/match-sim.js ===================

// Motor Avançado de Simulação: Disputas Decisivas, Pressão de Rota (Momentum), Vantagem Numérica e Pacing Competitivo do CBLOL

class MatchSimulator {
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

    // Sistema de Matchups de Campeões e Rota Marcada pelo Caçador Rival
    this.laneMatchups = {};
    this.redJungleCampLane = null; // 'top', 'mid', ou 'bot'
    this.blueJungleCampLane = null; // Rota prioritária que o Caçador azul foca para criar o carregador
    this._jgPlanIncidentFired = false; // Incidente inicial de plano de rota do caçador
    this.nextJungleCampUpdateAt = 165; // Primeira rotação aos 02:45

    // Mecânica de Virada (Comeback Mechanics) - Recompensas de Objetivos
    this.objectiveBountiesActive = false;

    // Estados dos campeões e pro players
    this.blueRosterState = this._initRosterState(this.blueTeam.roster, this.blueTeam);
    this.redRosterState = this._initRosterState(this.redTeam.roster || this.redTeam.defaultRoster, this.redTeam);

    this._initLaneMatchups();
    this._updateRedJungleCampTarget(true);

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
        items: startingItems // Itens equipados (até 6 slots)
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
          this.lanePressures[this.blueJungleCampLane] = Math.min(100, this.lanePressures[this.blueJungleCampLane] + 1.5);
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
              if (Math.random() < 0.35 && this.gameSeconds <= 840) {
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

          // Renda passiva oficial de Summoner's Rift (~20.4g / 10s = ~30.6g / 15s)
          let goldGain = 24;
          let csGain = 0;

          // Taxa de CS de Alto Nível Competitivo (CBLOL / Pro Play):
          // Mid & ADC: 8.8 a 10.4 CS/min (~2 a 3 CS por tick de 15s)
          // Top: 7.8 a 9.4 CS/min (~2 CS médios por tick)
          // Jungle: 5.8 a 7.2 CS/min (~1 a 2 monstros de selva/aronguejo por tick)
          // Support: 1.0 a 1.8 CS/min (apoio esporádico + tributo de ouro do item de suporte)
          if (role === "mid" || role === "adc") {
            csGain = Math.random() < 0.35 ? 3 : 2;
            goldGain += csGain * 21;
          } else if (role === "top") {
            csGain = Math.random() < 0.20 ? 3 : (Math.random() < 0.82 ? 2 : 1);
            goldGain += csGain * 21;
          } else if (role === "jungle") {
            csGain = Math.random() < 0.65 ? 2 : 1;
            goldGain += 32; // Ouro de campos da selva
          } else if (role === "support") {
            csGain = Math.random() < 0.35 ? 1 : 0;
            goldGain += 26; // Renda passiva do item de suporte
          }

          c.cs = (c.cs || 0) + csGain;
          c.goldEarned = (c.goldEarned || 500) + goldGain;
          c.goldCurrent = (c.goldCurrent || 0) + goldGain;
          c.csPerMin = parseFloat((c.cs / Math.max(1, this.gameSeconds / 60)).toFixed(1));

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

        // Impacto de Matchup e Caçador Rival na postura agressiva
        if (this.playerTactics === "aggressive") {
          const m = this._getLaneMatchup(l);
          const isCamped = (this.redJungleCampLane === l);
          if ((m && m.score < -0.5) || isCamped) {
            // Forçar agressividade em desvantagem ou contra acampamento rival NÃO avança; é repelido!
            lDelta = -Math.max(4, Math.round(pressureDelta * 0.8));
          } else if (m && m.score > 0.5 && !isCamped) {
            lDelta = Math.round(lDelta * 1.3);
          }
        }

        this.lanePressures[l] = Math.max(-100, Math.min(100, (this.lanePressures[l] || 0) + lDelta + (Math.random() * 2 - 1)));
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
            rDelta = Math.round(rDelta * 1.4);
          }
        }
        this.lanePressures[l] = Math.max(-100, (this.lanePressures[l] || 0) - rDelta + (Math.random() * 2 - 1));
      });
    } else {
      // Flutuação natural na zona do rio com respeito a matchups
      allLanes.forEach(l => {
        let naturalShift = Math.random() * 4 - 2;
        if (this.playerTactics === "aggressive") {
          const m = this._getLaneMatchup(l);
          const isCamped = (this.redJungleCampLane === l);
          if ((m && m.score < -0.5) || isCamped) {
            naturalShift -= 3;
          }
        }
        this.lanePressures[l] = Math.max(-100, Math.min(100, (this.lanePressures[l] || 0) + naturalShift));
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



// =================== js/engine/tournament.js ===================

// Gerenciador do Torneio CBLOL e Progressão de Séries (MD1, MD3, MD5) com Eleição de MVP

class TournamentManager {
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

  // Adapta dinamicamente o draft do time adversário entre os jogos de uma série (MD3 / MD5)
  adaptOpponentRoster(opponent, gameNumber = 1, opponentLostPrev = false) {
    if (!opponent) return null;

    // Jogo 1 sempre usa a formação titular tradicional consolidada
    if (gameNumber <= 1 && !opponentLostPrev && opponent.defaultRoster) {
      opponent.roster = { ...opponent.defaultRoster };
      if (typeof calculateTeamStats === "function") {
        opponent.stats = calculateTeamStats(opponent.roster, opponent.upgrades || []);
      }
      return opponent.roster;
    }

    // A partir do Jogo 2 em diante ou após derrota, os Pro Players trocam para outros campeões de conforto
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const newRoster = {};
    const usedChamps = new Set();

    roles.forEach(role => {
      let chosen = null;
      // 1. Busca o atleta titular escalado para esta função
      const playerId = opponent.players ? opponent.players[role] : null;
      const athlete = playerId
        ? PRO_PLAYERS.find(p => p.id === playerId || p.nick.toLowerCase() === playerId.toLowerCase())
        : null;

      if (athlete && Array.isArray(athlete.signatureChampions) && athlete.signatureChampions.length > 0) {
        // Rotaciona para outro campeão da signature pool do pro player
        const shift = opponentLostPrev ? 1 : 0;
        const availableSigs = athlete.signatureChampions.filter(c => !usedChamps.has(c));
        if (availableSigs.length > 0) {
          const idx = (gameNumber - 1 + shift) % availableSigs.length;
          chosen = availableSigs[idx];
        }
      }

      // 2. Se não conseguiu da signature pool, tenta o padrão caso não esteja repetido
      if (!chosen && opponent.defaultRoster && opponent.defaultRoster[role] && !usedChamps.has(opponent.defaultRoster[role])) {
        chosen = opponent.defaultRoster[role];
      }

      // 3. Fallback inteligente para a pool da função
      if (!chosen) {
        const rolePool = typeof getChampionsByRole === "function" ? getChampionsByRole(role) : [];
        const available = rolePool.filter(c => !usedChamps.has(c.id));
        if (available.length > 0) {
          chosen = available[Math.floor(Math.random() * available.length)].id;
        }
      }

      if (chosen) {
        newRoster[role] = chosen;
        usedChamps.add(chosen);
      } else {
        newRoster[role] = (opponent.defaultRoster && opponent.defaultRoster[role]) || "Aatrox";
      }
    });

    opponent.roster = newRoster;
    if (typeof calculateTeamStats === "function") {
      opponent.stats = calculateTeamStats(opponent.roster, opponent.upgrades || []);
    }
    return opponent.roster;
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



// =================== js/ui/team-creator.js ===================

// Componente de Criação de Time e Draft de Campeões com Sistema de Pro Players do CBLOL

class TeamCreatorView {
  constructor({
    containerEl,
    onTeamCreated,
    mode = "create",
    playerTeam = null,
    matchInfo = null,
    onConfirmDraft = null,
    onViewBracket = null
  }) {
    this.containerEl = containerEl;
    this.onTeamCreated = onTeamCreated;
    this.mode = mode;
    this.playerTeam = playerTeam;
    this.matchInfo = matchInfo;
    this.onConfirmDraft = onConfirmDraft;
    this.onViewBracket = onViewBracket;

    // Estado dos Pro Players da equipe
    if (this.playerTeam && this.playerTeam.proPlayers) {
      this.proPlayers = { ...this.playerTeam.proPlayers };
    } else {
      this.proPlayers = getDefaultProRoster(); // { top: "hidan", jungle: "cariok", mid: "tinowns", adc: "titan", support: "ceos" }
    }
    this.activeProRole = "top";
    this.proFilter = "all"; // "all" | "current" | "legend"

    // Estado da equipe do jogador
    if (this.mode === "draft" && this.playerTeam) {
      this.teamName = this.playerTeam.name || "Sua Equipe";
      this.selectedIcon = {
        url: this.playerTeam.iconUrl || SUMMONER_ICONS[0].url,
        id: this.playerTeam.iconId || SUMMONER_ICONS[0].id,
        name: this.playerTeam.name
      };
      this.roster = {
        top: (this.playerTeam.roster && this.playerTeam.roster.top) || "Aatrox",
        jungle: (this.playerTeam.roster && this.playerTeam.roster.jungle) || "LeeSin",
        mid: (this.playerTeam.roster && this.playerTeam.roster.mid) || "Ahri",
        adc: (this.playerTeam.roster && this.playerTeam.roster.adc) || "Jinx",
        support: (this.playerTeam.roster && this.playerTeam.roster.support) || "Thresh"
      };
    } else {
      this.teamName = "Ilha das Lendas";
      const defaultIcon = SUMMONER_ICONS.find(i => i.id === "idl") || SUMMONER_ICONS[0];
      this.selectedIcon = defaultIcon;
      this.iconCategory = "all";
      this.roster = {
        top: "Aatrox",
        jungle: "LeeSin",
        mid: "Ahri",
        adc: "Jinx",
        support: "Thresh"
      };
    }

    this.activeSlotRole = "top";
    this.selectedRoleFilter = "all";
    this.searchQuery = "";

    this.render();
  }

  render() {
    const isDraftMode = this.mode === "draft";

    // TELA 1: CRIAÇÃO DA ORGANIZAÇÃO & DREAM TEAM LIVRE (TELA INICIAL)
    if (!isDraftMode) {
      const activeRolePlayers = getPlayersByRole(this.activeProRole).filter(p => {
        if (this.proFilter === "current") return p.era === "current";
        if (this.proFilter === "legend") return p.era === "legend";
        return true;
      });

      const displayedIcons = SUMMONER_ICONS.filter(icon => {
        if (this.iconCategory === "all") return true;
        return icon.category === this.iconCategory;
      });

      this.containerEl.innerHTML = `
        <div class="team-setup-layout">
          <!-- Coluna Esquerda: Organização, Brasão & Informações da Campanha -->
          <div class="card-hextech">
            <div class="card-header-inner">
              <span class="card-title">🛡️ Sua Organização</span>
              <span style="font-size: 11px; color: var(--lol-blue-glow); font-weight: 800;">CBLOL 2026</span>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Nome da Equipe</label>
                <input type="text" id="team-name-input" class="lol-input" value="${this.teamName}" maxlength="24" placeholder="Ex: Ilha das Lendas, Trapaceiros..." />
                <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                  <button type="button" class="tag-quick-name" data-name="Ilha das Lendas" data-icon-id="idl">Ilha das Lendas</button>
                  <button type="button" class="tag-quick-name" data-name="paiN Gaming" data-icon-id="pain_2025">paiN</button>
                  <button type="button" class="tag-quick-name" data-name="LOUD" data-icon-id="loud_2025">LOUD</button>
                  <button type="button" class="tag-quick-name" data-name="RED Canids" data-icon-id="red_2025">RED</button>
                  <button type="button" class="tag-quick-name" data-name="Vivo Keyd Stars" data-icon-id="keyd_2025">Keyd</button>
                  <button type="button" class="tag-quick-name" data-name="FURIA" data-icon-id="furia_2025">FURIA</button>
                  <button type="button" class="tag-quick-name" data-name="KaBuM!" data-icon-id="kabum">KaBuM!</button>
                  <button type="button" class="tag-quick-name" data-name="INTZ" data-icon-id="intz">INTZ</button>
                  <button type="button" class="tag-quick-name" data-name="Los Grandes" data-icon-id="los_grandes">Los Grandes</button>
                  <button type="button" class="tag-quick-name" data-name="T1" data-icon-id="t1_champs">T1</button>
                </div>
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                  <label class="form-label" style="margin-bottom: 0;">Ícone Oficial da Equipe</label>
                  <span id="selected-icon-label" style="font-size: 11px; color: var(--lol-gold-1); font-weight: 700; max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${this.selectedIcon ? this.selectedIcon.name : ''}</span>
                </div>

                <!-- Filtros de Categorias de Ícones -->
                <div class="icon-filter-tabs">
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'all' ? 'active' : ''}" data-cat="all">Todos (${SUMMONER_ICONS.length})</button>
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'cblol' ? 'active' : ''}" data-cat="cblol">🇧🇷 CBLOL (${SUMMONER_ICONS.filter(i => i.category === 'cblol').length})</button>
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'mundial' ? 'active' : ''}" data-cat="mundial">🌍 Mundial (${SUMMONER_ICONS.filter(i => i.category === 'mundial').length})</button>
                  <button type="button" class="icon-tab-btn ${this.iconCategory === 'classicos' ? 'active' : ''}" data-cat="classicos">⭐ LoL (${SUMMONER_ICONS.filter(i => i.category === 'classicos').length})</button>
                </div>

                <div class="icon-selection-grid" id="icons-grid">
                  ${displayedIcons.map(icon => `
                    <div class="summoner-icon-item ${String(icon.id) === String(this.selectedIcon ? this.selectedIcon.id : '') ? 'selected' : ''}" data-icon-id="${icon.id}" title="${icon.name}">
                      <img src="${icon.url}" alt="${icon.name}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${icon.id}.jpg'" />
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Box de Contexto / Lore Compacto -->
              <div class="story-lore-box" style="margin-top: 14px;">
                <div class="story-badge">⚔️ A Conquista da Vaga</div>
                <h4 class="story-title" style="font-size: 14px; margin-bottom: 6px;">A Jornada do Desafiante</h4>
                <p class="story-paragraph" style="font-size: 12px; line-height: 1.45;">
                  Após dominar as classificatórias de acesso, a sua organização garantiu vaga direta nos <strong>Playoffs do CBLOL 2026</strong>! Contrate seus 5 atletas profissionais, defina as estratégias a cada rodada e supere as potências tradicionais até a Taça dos Campeões!
                </p>
              </div>

              <!-- Mini Prévia das Fases -->
              <div class="tournament-track-preview" style="margin-top: 12px;">
                <div class="track-step step-qualify">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">1. Qualify</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD1</span>
                </div>
                <div class="track-step step-quartas">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">2. Quartas</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD3</span>
                </div>
                <div class="track-step step-semis">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">3. Semis</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD5</span>
                </div>
                <div class="track-step step-final">
                  <span class="track-step-num" style="font-size: 10px; font-weight: 800;">4. Final ★</span>
                  <span style="font-size: 9px; color: #cdbe91;">MD5</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Coluna Direita: Seleção do Dream Team (Pro Players do CBLOL) -->
          <div class="card-hextech">
            <div class="card-header-inner">
              <span class="card-title">⭐ Dream Team do CBLOL</span>
              <span style="font-size: 11px; color: var(--lol-gold-1); font-weight: 800;">5 PRO PLAYERS TITULARES</span>
            </div>
            <div class="card-body">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 12px; color: #cdbe91;">Contrate os 5 atletas profissionais que defenderão sua camisa:</span>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <button type="button" id="preset-legends-btn" class="tag-quick-name" style="background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.5); color: #fbbf24;" title="Mylon, Revolta, YoDa, brTT, Dioud">👑 Lendas Clássicas</button>
                  <button type="button" id="preset-current-btn" class="tag-quick-name" style="background: rgba(10, 200, 185, 0.2); border-color: rgba(10, 200, 185, 0.5); color: #38bdf8;" title="Hidan, Croc, Tinowns, TitaN, Ceos">🔥 Estrelas Atuais</button>
                  <button type="button" id="preset-random-btn" class="tag-quick-name">🎲 Aleatório</button>
                </div>
              </div>

              <!-- Os 5 Slots de Titulares da Equipe -->
              <div class="pro-roster-slots-grid">
                ${this._renderProSlotCard("top", "Topo")}
                ${this._renderProSlotCard("jungle", "Selva")}
                ${this._renderProSlotCard("mid", "Meio")}
                ${this._renderProSlotCard("adc", "Atirador")}
                ${this._renderProSlotCard("support", "Suporte")}
              </div>

              <!-- Painel do Catálogo da Rota Ativa -->
              <div style="background: rgba(1, 10, 19, 0.6); border: 1px solid var(--lol-gold-3); border-radius: 6px; padding: 14px; margin-top: 10px;">
                <div class="pro-player-filter-bar">
                  <span style="font-size: 12px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; letter-spacing: 0.5px;">
                    ${this._getRoleIcon(this.activeProRole)} Contratar para a Rota ${this._getRoleName(this.activeProRole)}:
                  </span>
                  <div style="display: flex; gap: 6px;">
                    <button type="button" class="tag-quick-name pro-filter-btn ${this.proFilter === 'all' ? 'selected' : ''}" data-filter="all" style="${this.proFilter === 'all' ? 'background: var(--lol-blue-glow); color: #010a13; font-weight: 800;' : ''}">Todos</button>
                    <button type="button" class="tag-quick-name pro-filter-btn ${this.proFilter === 'current' ? 'selected' : ''}" data-filter="current" style="${this.proFilter === 'current' ? 'background: var(--lol-blue-glow); color: #010a13; font-weight: 800;' : ''}">🔥 Atuais</button>
                    <button type="button" class="tag-quick-name pro-filter-btn ${this.proFilter === 'legend' ? 'selected' : ''}" data-filter="legend" style="${this.proFilter === 'legend' ? 'background: #fbbf24; color: #010a13; font-weight: 800;' : ''}">⭐ Lendas</button>
                  </div>
                </div>

                <!-- Grid de Jogadores da Rota -->
                <div class="pro-player-grid">
                  ${activeRolePlayers.map(p => {
                    const isSelected = this.proPlayers[this.activeProRole] === p.id;
                    return `
                      <div class="pro-player-card ${isSelected ? 'selected' : ''}" data-player-id="${p.id}">
                        <div class="pro-card-header">
                          <div class="pro-card-avatar" style="${isSelected ? 'border-color: var(--lol-blue-glow); box-shadow: 0 0 10px rgba(10, 200, 185, 0.4);' : ''}">
                            <img src="${p.avatar}" alt="${p.nick}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg'" />
                          </div>
                          <div class="pro-card-titles">
                            <span class="pro-card-nick">
                              ${p.nick}
                              ${p.era === 'legend' ? `<span class="pro-slot-legend-tag">⭐ LENDA</span>` : ''}
                            </span>
                            <span class="pro-card-team">${p.team}</span>
                          </div>
                        </div>

                        <div class="pro-card-trait">${p.traits}</div>

                        <div class="pro-card-signatures">
                          <span>Picks de Conforto:</span>
                          ${(p.signatureChampions || []).slice(0, 3).map(champId => {
                            const c = getChampionById(champId);
                            return `<span class="sig-chip">${c ? c.name : champId}</span>`;
                          }).join('')}
                        </div>

                        <div class="pro-card-quote">"${p.quote}"</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <div style="font-size: 11px; color: var(--lol-blue-glow); margin-top: 14px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">💡</span>
                <span>Seus atletas ganham <strong>+3 de Dano de Maestria</strong> em combate ao jogarem com seus <em>Picks de Conforto</em>! O Draft de Campeões ocorre antes de cada partida.</span>
              </div>

              <button id="submit-team-btn" class="lol-btn lol-btn-primary" style="width: 100%; margin-top: 16px; font-size: 14px; padding: 14px;">
                🏆 Confirmar Dream Team & Iniciar Playoffs ➔
              </button>
            </div>
          </div>
        </div>
      `;
      this._bindEvents();
      return;
    }

    // TELA 2: DRAFT & SELEÇÃO DE CAMPEÕES (ANTES DE CADA PARTIDA)
    const roundTitle = this.matchInfo ? (this.matchInfo.roundName || "Playoffs") : "Playoffs";
    const format = this.matchInfo ? (this.matchInfo.format || "MD3") : "MD3";
    const opp = this.matchInfo ? this.matchInfo.opponent : null;
    const oppName = opp ? opp.name : "Adversário";
    const oppColor = opp ? (opp.color || "#e84057") : "#e84057";
    const oppTag = opp ? (opp.tag || opp.logoText || "CBL") : "CBL";
    const seriesScore = this.matchInfo ? this.matchInfo.seriesScore : null;
    const gameNum = this.matchInfo ? (this.matchInfo.gameNumber || 1) : 1;

    this.containerEl.innerHTML = `
      <div class="builder-layout">
        <!-- Coluna Esquerda: Informações do Confronto e Stats -->
        <div class="card-hextech">
          <div class="card-header-inner">
            <span class="card-title">⚔️ Draft da Partida</span>
            <span style="font-size: 11px; color: var(--lol-blue-glow); font-weight: 800;">${roundTitle.toUpperCase()}</span>
          </div>
          <div class="card-body">
            <!-- Painel do Confronto Atual -->
            <div style="background: rgba(1, 10, 19, 0.7); border: 1px solid var(--lol-gold-3); border-radius: 6px; padding: 14px; margin-bottom: 16px;">
              <div style="font-size: 11px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; margin-bottom: 10px; text-align: center; letter-spacing: 1px;">
                ⚔️ ${roundTitle} (${format}) • Jogo ${gameNum}
              </div>
              <div style="display: flex; align-items: center; justify-content: space-around; gap: 10px;">
                <!-- Time do Jogador -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;">
                  <img src="${this.selectedIcon.url}" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--lol-blue-glow); box-shadow: 0 0 10px rgba(0, 180, 216, 0.4);" alt="${this.teamName}" />
                  <span style="font-size: 12px; font-weight: 800; color: #fff;">${this.teamName}</span>
                </div>
                <div style="font-size: 14px; font-weight: 900; color: var(--lol-gold-1); text-shadow: 0 0 8px rgba(200, 170, 110, 0.6);">VS</div>
                <!-- Adversário -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;">
                  <div style="width: 44px; height: 44px; border-radius: 50%; background: ${oppColor}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; color: #fff; border: 2px solid var(--lol-red-team); box-shadow: 0 0 10px rgba(232, 64, 87, 0.4);">
                    ${oppTag}
                  </div>
                  <span style="font-size: 12px; font-weight: 800; color: var(--lol-red-team);">${oppName}</span>
                </div>
              </div>
              ${seriesScore ? `
                <div style="margin-top: 12px; text-align: center; font-size: 12px; color: var(--lol-gold-2); background: rgba(0,0,0,0.4); padding: 5px; border-radius: 4px; border: 1px solid rgba(200, 170, 110, 0.2);">
                  Placar da Série: <strong style="color: var(--lol-blue-glow); font-size: 13px;">${seriesScore}</strong>
                </div>
              ` : ''}
            </div>

            <!-- Resumo de Estatísticas da Composição -->
            <div class="team-stats-box">
              <div style="font-size: 11px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; margin-bottom: 10px; display: flex; justify-content: space-between;">
                <span>Atributos da Composição</span>
                <span id="overall-tier" style="color: var(--lol-blue-glow);">Tier A</span>
              </div>

              <div id="stats-bars-container">
                <!-- Injetado dinamicamente -->
              </div>
            </div>

            <div style="margin-top: 22px; display: flex; flex-direction: column; gap: 10px;">
              <button id="random-team-btn" class="lol-btn lol-btn-secondary" style="width: 100%;">
                🎲 Sortear 5 Campeões Aleatórios
              </button>
              <button id="submit-draft-btn" class="lol-btn lol-btn-primary" style="width: 100%;">
                ⚔️ Confirmar Escalação e Batalhar! ➔
              </button>
              ${this.onViewBracket ? `
                <button id="view-bracket-btn" class="lol-btn" style="width: 100%; background: rgba(1, 10, 19, 0.8); border-color: var(--lol-gold-3); color: var(--lol-gold-2);">
                  🗺️ Ver Chaveamento dos Playoffs
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Escalação das 5 Rotas e Seletor de Campeões -->
        <div>
          <!-- Os 5 Slots de Rota com Pro Players -->
          <div class="roster-slots-grid">
            ${this._renderRoleSlot("top", "Topo")}
            ${this._renderRoleSlot("jungle", "Selva")}
            ${this._renderRoleSlot("mid", "Meio")}
            ${this._renderRoleSlot("adc", "Atirador")}
            ${this._renderRoleSlot("support", "Suporte")}
          </div>

          <!-- Gaveta / Pool de Campeões com Busca e Filtros -->
          <div class="pool-section">
            <div class="pool-toolbar">
              <div class="pool-tabs">
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'all' ? 'active' : ''}" data-filter="all">Todos</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'top' ? 'active' : ''}" data-filter="top">Top</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'jungle' ? 'active' : ''}" data-filter="jungle">Jg</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'mid' ? 'active' : ''}" data-filter="mid">Mid</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'adc' ? 'active' : ''}" data-filter="adc">ADC</button>
                <button class="pool-tab-btn ${this.selectedRoleFilter === 'support' ? 'active' : ''}" data-filter="support">Sup</button>
              </div>

              <input type="text" id="champ-search-input" class="lol-input" style="width: 220px;" placeholder="Buscar campeão..." value="${this.searchQuery}" />
            </div>

            <div class="champions-grid" id="champions-pool-grid">
              <!-- Injetado dinamicamente -->
            </div>
          </div>
        </div>
      </div>
    `;

    this._bindEvents();
    this._updateStatsUI();
    this._renderChampionsGrid();
  }

  _renderProSlotCard(roleKey, roleLabel) {
    const playerId = this.proPlayers[roleKey];
    const player = getPlayerById(playerId);
    const isActive = this.activeProRole === roleKey;

    return `
      <div class="pro-slot-card ${isActive ? 'active' : ''}" data-pro-role="${roleKey}">
        <span class="pro-slot-role-badge">${this._getRoleIcon(roleKey)} ${roleLabel}</span>
        <div class="pro-slot-avatar-wrap">
          <img src="${player ? player.avatar : ''}" alt="${player ? player.nick : 'Player'}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg'" />
        </div>
        <span class="pro-slot-nick">${player ? player.nick : 'Selecionar'}</span>
        ${player && player.era === 'legend' ? `<span class="pro-slot-legend-tag">⭐ LENDA</span>` : `<span style="font-size: 10px; color: var(--lol-gold-2);">${player ? player.team : ''}</span>`}
      </div>
    `;
  }

  _renderRoleSlot(roleKey, roleLabel) {
    const champId = this.roster[roleKey];
    const champ = getChampionById(champId);
    const isActive = this.activeSlotRole === roleKey;
    const proPlayerId = (this.playerTeam && this.playerTeam.proPlayers && this.playerTeam.proPlayers[roleKey]) || this.proPlayers[roleKey];
    const proPlayer = getPlayerById(proPlayerId);
    const isSignature = proPlayer && champ && proPlayer.signatureChampions && proPlayer.signatureChampions.includes(champ.id);

    return `
      <div class="roster-slot-card ${isActive ? 'active-slot' : ''}" data-role-slot="${roleKey}">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 2px;">
          <span class="role-badge">${this._getRoleIcon(roleKey)} ${roleLabel}</span>
          ${proPlayer ? `<span style="font-size: 10px; font-weight: 800; color: #fff; background: rgba(0,0,0,0.5); padding: 1px 6px; border-radius: 8px; border: 1px solid var(--lol-gold-3);">${proPlayer.nick}</span>` : ''}
        </div>
        <div class="slot-avatar-wrap" style="${isSignature ? 'border-color: #fbbf24; box-shadow: 0 0 12px rgba(251, 191, 36, 0.6);' : ''}">
          ${champ ? `
            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png" alt="${champ.name}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.id}.png'" />
          ` : `
            <div class="slot-empty-icon">?</div>
          `}
        </div>
        <span class="slot-champ-name">${champ ? champ.name : 'Selecionar'}</span>
        ${isSignature
          ? `<span style="font-size: 10px; color: #fbbf24; font-weight: 800; background: rgba(251, 191, 36, 0.15); padding: 1px 6px; border-radius: 6px; border: 1px solid rgba(251, 191, 36, 0.4); margin-top: 2px;">⭐ Pick de Conforto</span>`
          : `<span class="slot-champ-title">${champ ? champ.title : 'Clique para escolher'}</span>`
        }
      </div>
    `;
  }

  _getRoleIcon(role) {
    const icons = {
      top: "🛡️",
      jungle: "🌲",
      mid: "⚡",
      adc: "🏹",
      support: "✨"
    };
    return icons[role] || "⚔️";
  }

  _getRoleName(role) {
    const names = {
      top: "Topo",
      jungle: "Selva",
      mid: "Meio",
      adc: "Atirador",
      support: "Suporte"
    };
    return names[role] || role;
  }

  _renderChampionsGrid() {
    const grid = this.containerEl.querySelector("#champions-pool-grid");
    if (!grid) return;

    let filtered = CHAMPIONS;

    // Filtro por aba
    if (this.selectedRoleFilter !== "all") {
      filtered = filtered.filter(c => c.role === this.selectedRoleFilter);
    }

    // Filtro por busca
    if (this.searchQuery.trim() !== "") {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
    }

    const currentPickedIds = Object.values(this.roster);
    const activeProPlayerId = (this.playerTeam && this.playerTeam.proPlayers && this.playerTeam.proPlayers[this.activeSlotRole]) || this.proPlayers[this.activeSlotRole];
    const activeProPlayer = getPlayerById(activeProPlayerId);

    grid.innerHTML = filtered.map(c => {
      const isPicked = currentPickedIds.includes(c.id);
      const isSignature = activeProPlayer && activeProPlayer.signatureChampions && activeProPlayer.signatureChampions.includes(c.id);

      return `
        <div class="champion-card-item ${isPicked ? 'in-team' : ''} ${isSignature ? 'signature-card' : ''}" data-champ-id="${c.id}" title="${c.name} - ${c.title} (${c.signatureSkill})${isSignature ? ' • Pick de Conforto!' : ''}" style="${isSignature ? 'border: 2px solid #fbbf24; box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);' : ''}">
          <div class="champ-thumb">
            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${c.id}.png" alt="${c.name}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${c.id}.png'" />
          </div>
          <span class="champ-card-name">${isSignature ? '⭐ ' : ''}${c.name}</span>
          <span class="champ-card-role">${c.role.toUpperCase()}</span>
        </div>
      `;
    }).join("");

    // Eventos de clique nos cards de campeão
    grid.querySelectorAll(".champion-card-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-champ-id");
        if (Object.values(this.roster).includes(id) && this.roster[this.activeSlotRole] !== id) {
          return; // Já escalado em outra rota
        }
        this.roster[this.activeSlotRole] = id;
        const champ = getChampionById(id);
        if (champ && champ.key) {
          sound.playChampionVoice(champ.key);
          this._showVoiceQuoteToast(champ);
        } else {
          sound.playPick();
        }
        this.render();
      });
    });
  }

  _updateStatsUI() {
    const statsContainer = this.containerEl.querySelector("#stats-bars-container");
    if (!statsContainer) return;

    const stats = calculateTeamStats(this.roster);

    // Bônus visual de maestria caso algum pro player esteja com seu campeão assinatura
    let signatureBonus = 0;
    Object.keys(this.roster).forEach(r => {
      const pId = (this.playerTeam && this.playerTeam.proPlayers && this.playerTeam.proPlayers[r]) || this.proPlayers[r];
      const p = getPlayerById(pId);
      if (p && p.signatureChampions && p.signatureChampions.includes(this.roster[r])) {
        signatureBonus += 3;
      }
    });

    const statRows = [
      { label: "Dano de Combate", val: stats.damage + signatureBonus, max: 120, color: "var(--lol-red-team)" },
      { label: "Resistência & Tanque", val: stats.tank, max: 120, color: "#22c55e" },
      { label: "Pressão & Torres", val: stats.push, max: 120, color: "var(--lol-gold-1)" },
      { label: "Utilidade & Controle", val: stats.utility, max: 120, color: "var(--lol-blue-glow)" },
      { label: "Poder no Late Game", val: stats.scaling, max: 120, color: "#a855f7" }
    ];

    statsContainer.innerHTML = statRows.map(s => {
      const pct = Math.min(100, Math.round((s.val / s.max) * 100));
      return `
        <div class="stat-bar-row">
          <div class="stat-bar-header">
            <span>${s.label}</span>
            <span style="font-weight: 800; color: #fff;">${s.val}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill" style="width: ${pct}%; background: ${s.color};"></div>
          </div>
        </div>
      `;
    }).join("");

    const tierBadge = this.containerEl.querySelector("#overall-tier");
    if (tierBadge) {
      const avg = (stats.damage + stats.tank + stats.push + stats.utility + stats.scaling) / 5;
      if (avg >= 88) tierBadge.textContent = "Tier S+ (Campeão)";
      else if (avg >= 78) tierBadge.textContent = "Tier S";
      else if (avg >= 68) tierBadge.textContent = "Tier A";
      else tierBadge.textContent = "Tier B";
    }
  }

  _bindEvents() {
    // Input do Nome da Equipe
    const nameInput = this.containerEl.querySelector("#team-name-input");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        this.teamName = e.target.value;
      });
    }

    // Botões de Sugestão Rápida de Nome + Ícone Oficial correspondente
    this.containerEl.querySelectorAll(".tag-quick-name[data-name]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.teamName = btn.getAttribute("data-name");
        const iconId = btn.getAttribute("data-icon-id");
        if (iconId) {
          const matched = SUMMONER_ICONS.find(i => String(i.id) === String(iconId));
          if (matched) this.selectedIcon = matched;
        }
        sound.playClick();
        this.render();
      });
    });

    // Filtros de Categoria de Ícones
    this.containerEl.querySelectorAll(".icon-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.iconCategory = btn.getAttribute("data-cat") || "all";
        sound.playClick();
        this.render();
      });
    });

    // Clique em Ícone
    this.containerEl.querySelectorAll(".summoner-icon-item").forEach(el => {
      el.addEventListener("click", () => {
        const rawIconId = el.getAttribute("data-icon-id");
        const icon = SUMMONER_ICONS.find(i => String(i.id) === String(rawIconId));
        if (icon) {
          this.selectedIcon = icon;
          sound.playClick();
          this.containerEl.querySelectorAll(".summoner-icon-item").forEach(i => i.classList.remove("selected"));
          el.classList.add("selected");
          const lbl = this.containerEl.querySelector("#selected-icon-label");
          if (lbl) lbl.textContent = icon.name;
        }
      });
    });

    // Clique em Slot de Pro Player (Modo Criação)
    this.containerEl.querySelectorAll(".pro-slot-card").forEach(el => {
      el.addEventListener("click", () => {
        this.activeProRole = el.getAttribute("data-pro-role");
        sound.playClick();
        this.render();
      });
    });

    // Filtros de Pro Player (Todos / Atuais / Lendas)
    this.containerEl.querySelectorAll(".pro-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.proFilter = btn.getAttribute("data-filter");
        sound.playClick();
        this.render();
      });
    });

    // Clique em Card de Pro Player para Contratar
    this.containerEl.querySelectorAll(".pro-player-card").forEach(el => {
      el.addEventListener("click", () => {
        const pId = el.getAttribute("data-player-id");
        this.proPlayers[this.activeProRole] = pId;
        sound.playPick();
        this.render();
      });
    });

    // Preset Lendas Históricas (brTT, YoDa, Kami, Revolta, Mylon)
    const presetLegendsBtn = this.containerEl.querySelector("#preset-legends-btn");
    if (presetLegendsBtn) {
      presetLegendsBtn.addEventListener("click", () => {
        this.proPlayers = {
          top: "mylon",
          jungle: "revolta",
          mid: "yoda",
          adc: "brtt",
          support: "dioud"
        };
        sound.playPick();
        this.render();
      });
    }

    // Preset Estrelas Atuais (Hidan, Croc, Tinowns, TitaN, Ceos)
    const presetCurrentBtn = this.containerEl.querySelector("#preset-current-btn");
    if (presetCurrentBtn) {
      presetCurrentBtn.addEventListener("click", () => {
        this.proPlayers = {
          top: "hidan",
          jungle: "croc",
          mid: "tinowns",
          adc: "titan",
          support: "ceos"
        };
        sound.playPick();
        this.render();
      });
    }

    // Preset Aleatório
    const presetRandomBtn = this.containerEl.querySelector("#preset-random-btn");
    if (presetRandomBtn) {
      presetRandomBtn.addEventListener("click", () => {
        const roles = ["top", "jungle", "mid", "adc", "support"];
        roles.forEach(r => {
          const players = getPlayersByRole(r);
          const chosen = players[Math.floor(Math.random() * players.length)];
          if (chosen) this.proPlayers[r] = chosen.id;
        });
        sound.playPick();
        this.render();
      });
    }

    // Botão Concluir Fundação da Organização (Modo Criação Inicial)
    const submitBtn = this.containerEl.querySelector("#submit-team-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        sound.playClick();
        const baseStats = calculateTeamStats(this.roster);

        const teamObj = {
          name: this.teamName.trim() || "Minha Equipe",
          iconUrl: this.selectedIcon.url,
          iconId: this.selectedIcon.id,
          proPlayers: { ...this.proPlayers },
          roster: { ...this.roster },
          stats: baseStats,
          hasDraftedInitialRoster: false,
          upgrades: []
        };
        this.onTeamCreated(teamObj);
      });
    }

    // Clique em Slot de Rota (Modo Draft)
    this.containerEl.querySelectorAll(".roster-slot-card").forEach(el => {
      el.addEventListener("click", () => {
        const role = el.getAttribute("data-role-slot");
        this.activeSlotRole = role;
        this.selectedRoleFilter = role; // Sugere os campeões da rota

        const champId = this.roster[role];
        const champ = getChampionById(champId);
        if (champ && champ.key) {
          sound.playChampionVoice(champ.key);
          this._showVoiceQuoteToast(champ);
        } else {
          sound.playClick();
        }
        this.render();
      });
    });

    // Filtros de Rota (Modo Draft)
    this.containerEl.querySelectorAll(".pool-tab-btn").forEach(el => {
      el.addEventListener("click", () => {
        this.selectedRoleFilter = el.getAttribute("data-filter");
        sound.playClick();
        this.render();
      });
    });

    // Barra de Busca (Modo Draft)
    const searchInput = this.containerEl.querySelector("#champ-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this._renderChampionsGrid();
      });
    }

    // Botão Sortear Aleatório (Modo Draft)
    const randomBtn = this.containerEl.querySelector("#random-team-btn");
    if (randomBtn) {
      randomBtn.addEventListener("click", () => {
        this.roster = getRandomTeamRoster();
        const activeChamp = getChampionById(this.roster[this.activeSlotRole]);
        if (activeChamp && activeChamp.key) {
          sound.playChampionVoice(activeChamp.key);
          this._showVoiceQuoteToast(activeChamp);
        } else {
          sound.playPick();
        }
        this.render();
      });
    }

    // Botão Confirmar Escalação (Modo Draft entre Partidas)
    const submitDraftBtn = this.containerEl.querySelector("#submit-draft-btn");
    if (submitDraftBtn) {
      submitDraftBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.playerTeam) {
          this.playerTeam.roster = { ...this.roster };
          this.playerTeam.proPlayers = { ...this.proPlayers };
          this.playerTeam.hasDraftedInitialRoster = true;
          this.playerTeam.stats = calculateTeamStats(this.roster, this.playerTeam.upgrades || []);
        }
        if (this.onConfirmDraft) {
          this.onConfirmDraft(this.roster);
        }
      });
    }

    // Botão Ver Chaveamento (Modo Draft)
    const viewBracketBtn = this.containerEl.querySelector("#view-bracket-btn");
    if (viewBracketBtn) {
      viewBracketBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.playerTeam) {
          this.playerTeam.roster = { ...this.roster };
          this.playerTeam.proPlayers = { ...this.proPlayers };
          this.playerTeam.stats = calculateTeamStats(this.roster, this.playerTeam.upgrades || []);
        }
        if (this.onViewBracket) {
          this.onViewBracket();
        }
      });
    }
  }

  // Exibe a legenda flutuante com a fala oficial do campeão escolhido
  _showVoiceQuoteToast(champ) {
    if (!champ) return;
    const toast = document.getElementById("champ-voice-toast");
    if (!toast) return;

    const img = toast.querySelector("#toast-champ-img");
    const name = toast.querySelector("#toast-champ-name");
    const role = toast.querySelector("#toast-champ-role");
    const quote = toast.querySelector("#toast-champ-quote");

    if (img) {
      img.src = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png`;
      img.alt = champ.name;
    }
    if (name) name.textContent = champ.name;
    if (role) role.textContent = `• ${champ.title || champ.role.toUpperCase()}`;
    if (quote) quote.textContent = `"${champ.quote || 'Ao combate!'}"`;

    toast.classList.add("active");

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("active");
    }, 4500);
  }
}



// =================== js/ui/bracket-view.js ===================

// Componente de Visualização do Chaveamento do CBLOL

class BracketView {
  constructor({ containerEl, tournament, onStartMatch, onOpenDraft }) {
    this.containerEl = containerEl;
    this.tournament = tournament;
    this.onStartMatch = onStartMatch;
    this.onOpenDraft = onOpenDraft || onStartMatch;

    this.render();
  }

  update(tournament) {
    this.tournament = tournament;
    this.render();
  }

  render() {
    const currentMatch = this.tournament.getCurrentPlayerMatch();
    const opponent = this.tournament.getOpponentForCurrentRound();
    const roundName = this.tournament.roundNames[this.tournament.currentRound] || "Fase Final";
    const format = this.tournament.getCurrentRoundFormat();

    const isTeamA = currentMatch && currentMatch.teamA && currentMatch.teamA.isPlayer;
    const pScore = currentMatch ? (isTeamA ? currentMatch.scoreA : currentMatch.scoreB) : 0;
    const oppScore = currentMatch ? (isTeamA ? currentMatch.scoreB : currentMatch.scoreA) : 0;
    const isMidSeries = currentMatch && (currentMatch.scoreA > 0 || currentMatch.scoreB > 0);
    const hasDrafted = this.tournament.playerTeam && this.tournament.playerTeam.hasDraftedInitialRoster;
    const isFirstGame = this.tournament.currentRound === 0 && !hasDrafted;

    this.containerEl.innerHTML = `
      <div style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 26px; font-weight: 900; color: #fff; letter-spacing: 2px; text-transform: uppercase;">
            Playoffs do CBLOL
          </h2>
          <p style="color: var(--lol-gold-2); font-size: 14px; margin-top: 4px;">
            Fase Atual: <strong style="color: #fff;">${roundName}</strong> • Formato: <span style="color: var(--lol-blue-glow); font-weight: 700;">${format}</span>
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          ${currentMatch && !this.tournament.isOver ? `
            <button id="start-match-btn" class="lol-btn lol-btn-primary">
              ${isMidSeries
                ? `⚔️ Escalar Campeões & Jogar Jogo ${nextGameNum} (${pScore} - ${oppScore}) vs ${opponent ? opponent.name : 'Adversário'}`
                : (isFirstGame
                    ? `⚔️ Escalar 5 Campeões & Batalhar no Qualify (MD1) vs ${opponent ? opponent.name : 'Adversário'}`
                    : `⚔️ Escalar 5 Campeões & Jogar ${roundName} (${format}) vs ${opponent ? opponent.name : 'Adversário'}`
                  )
              }
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Barra de Escalação Atual dos 5 Campeões -->
      <div style="margin-bottom: 24px; background: linear-gradient(90deg, rgba(9, 20, 40, 0.95) 0%, rgba(5, 12, 24, 0.95) 100%); border: 1px solid var(--lol-gold-3); border-left: 4px solid var(--lol-gold-1); border-radius: 6px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
        <div>
          <div style="font-size: 11px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
            ${hasDrafted ? '🛡️ Sua Escalação Atual de 5 Campeões:' : '🛡️ Escalação da sua Organização:'}
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${this._renderRosterMiniSlots()}
          </div>
        </div>
        <div>
          <button id="change-roster-btn" class="lol-btn lol-btn-secondary" style="font-size: 12px; padding: 7px 14px;">
            ${hasDrafted ? '🔄 Escolher Novos 5 Campeões' : '📋 Abrir Draft de Campeões'}
          </button>
        </div>
      </div>

      <!-- Chaveamento Eliminatório Completo em 4 Colunas -->
      <div class="bracket-wrapper">
        <!-- Rodada 0: Qualify -->
        <div class="bracket-column">
          <div class="bracket-round-title">Qualify (MD1)</div>
          <div style="text-align: center; font-size: 11px; color: #4ade80; font-weight: 700; margin-bottom: 8px;">🟢 Dificuldade: Normal</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round0.map(m => this._renderMatchCard(m, 0)).join('')}
          </div>
        </div>

        <!-- Rodada 1: Quartas de Final -->
        <div class="bracket-column">
          <div class="bracket-round-title">Quartas de Final (MD3)</div>
          <div style="text-align: center; font-size: 11px; color: #60a5fa; font-weight: 700; margin-bottom: 8px;">🔵 Competitivo (+4%)</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round1.map(m => this._renderMatchCard(m, 1)).join('')}
          </div>
        </div>

        <!-- Rodada 2: Semifinais -->
        <div class="bracket-column">
          <div class="bracket-round-title">Semifinais (MD5)</div>
          <div style="text-align: center; font-size: 11px; color: #f59e0b; font-weight: 700; margin-bottom: 8px;">🟠 Veterano (+9%)</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round2.map(m => this._renderMatchCard(m, 2)).join('')}
          </div>
        </div>

        <!-- Rodada 3: Grande Final -->
        <div class="bracket-column">
          <div class="bracket-round-title">🏆 Grande Final (MD5)</div>
          <div style="text-align: center; font-size: 11px; color: #f43f5e; font-weight: 700; margin-bottom: 8px;">🔴 Decisão de Título ★ (+14%)</div>
          <div class="bracket-matches-list">
            ${this.tournament.bracket.round3.map(m => this._renderMatchCard(m, 3)).join('')}
          </div>
        </div>
      </div>

      <!-- Lista de Upgrades Ativos da Equipe -->
      ${this._renderUpgradesBar()}
    `;

    this._bindEvents();
  }

  _renderMatchCard(match, roundIdx) {
    const isPlayerInMatch = (match.teamA && match.teamA.isPlayer) || (match.teamB && match.teamB.isPlayer);
    const isCurrentActive = isPlayerInMatch && this.tournament.currentRound === roundIdx && !match.winner;
    const isLiveParallel = !isPlayerInMatch && this.tournament.currentRound === roundIdx && !match.winner && (match.scoreA > 0 || match.scoreB > 0);

    let badgeHtml = '';
    if (match.winner) {
      badgeHtml = `<div class="match-status-badge finished">Vencedor: ${match.winner.name}</div>`;
    } else if (isCurrentActive) {
      badgeHtml = `<div class="match-status-badge player-turn">⚔️ Seu Confronto</div>`;
    } else if (isLiveParallel) {
      badgeHtml = `<div class="match-status-badge live-parallel">🔴 Ao Vivo (${match.scoreA} - ${match.scoreB})</div>`;
    }

    return `
      <div class="bracket-match-card ${isPlayerInMatch ? 'is-player-match' : ''} ${isCurrentActive ? 'active-match' : ''}">
        ${badgeHtml}
        ${this._renderTeamRow(match.teamA, match.winner, match.scoreA)}
        ${this._renderTeamRow(match.teamB, match.winner, match.scoreB)}
      </div>
    `;
  }

  _renderTeamRow(team, winner, score) {
    if (!team) {
      return `
        <div class="bracket-team-row" style="opacity: 0.4;">
          <div class="bracket-team-info">
            <div class="team-emblem-mini" style="background: #222;">?</div>
            <span class="team-name">A Definir</span>
          </div>
          <span class="team-score">-</span>
        </div>
      `;
    }

    const isWinner = winner && winner.name === team.name;

    return `
      <div class="bracket-team-row ${isWinner ? 'winner' : ''}">
        <div class="bracket-team-info">
          <div class="team-emblem-mini" style="background: ${team.color || '#091428'};">
            ${team.iconUrl ? `
              <img src="${team.iconUrl}" alt="${team.name}" />
            ` : `
              <span>${team.logoText || team.tag || team.name.substring(0, 3)}</span>
            `}
          </div>
          <span class="team-name" style="${team.isPlayer ? 'color: var(--lol-blue-glow); font-weight: 900;' : ''}">
            ${team.name} ${team.isPlayer ? '(Você)' : ''}
          </span>
        </div>
        <span class="team-score">${score}</span>
      </div>
    `;
  }

  _renderUpgradesBar() {
    const upgrades = this.tournament.playerTeam.upgrades || [];
    if (upgrades.length === 0) return '';

    return `
      <div style="margin-top: 28px; background: rgba(1, 10, 19, 0.7); border: 1px solid var(--lol-gold-3); border-radius: 6px; padding: 14px 20px;">
        <span style="font-size: 12px; font-weight: 800; color: var(--lol-gold-1); text-transform: uppercase; letter-spacing: 1px;">
          ⚡ Aprimoramentos Hextech Acumulados da Run:
        </span>
        <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
          ${upgrades.map(u => `
            <div style="background: rgba(10, 20, 40, 0.9); border: 1px solid var(--lol-blue-glow); border-radius: 4px; padding: 6px 12px; font-size: 12px; color: #fff; display: flex; align-items: center; gap: 8px;">
              <span>${u.icon}</span>
              <strong>${u.name}</strong>
              <span style="color: var(--lol-gold-2); font-size: 11px;">(${u.description})</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  _renderRosterMiniSlots() {
    const roles = [
      { key: "top", label: "Top", icon: "🛡️" },
      { key: "jungle", label: "Jg", icon: "🌲" },
      { key: "mid", label: "Mid", icon: "⚡" },
      { key: "adc", label: "ADC", icon: "🏹" },
      { key: "support", label: "Sup", icon: "✨" }
    ];
    const proPlayers = (this.tournament.playerTeam && this.tournament.playerTeam.proPlayers) || {};
    const roster = (this.tournament.playerTeam && this.tournament.playerTeam.roster) || {};
    const hasDrafted = this.tournament.playerTeam && this.tournament.playerTeam.hasDraftedInitialRoster;

    return roles.map(r => {
      const playerId = proPlayers[r.key];
      const player = typeof getPlayerById === "function" ? getPlayerById(playerId) : null;
      const champId = roster[r.key];
      const champ = typeof getChampionById === "function" ? getChampionById(champId) : null;
      const nick = player ? player.nick : r.label;
      const champName = champ ? champ.name : null;
      const avatarUrl = player ? player.avatar : (champ ? `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png` : '');

      return `
        <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.5); padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(200, 170, 110, 0.3);">
          ${avatarUrl ? `
            <img src="${avatarUrl}" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--lol-gold-2);" alt="${nick}" onerror="this.style.display='none'" />
          ` : ''}
          <span style="font-size: 11px; color: var(--lol-gold-2); font-weight: 800;">${r.label}:</span>
          <strong style="font-size: 12px; color: #fff;">${nick}</strong>
          ${hasDrafted && champName ? `<span style="font-size: 11px; color: var(--lol-blue-glow); font-weight: 700;">(${champName})</span>` : ''}
        </div>
      `;
    }).join('');
  }

  _bindEvents() {
    const btn = this.containerEl.querySelector("#start-match-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.onStartMatch();
      });
    }

    const changeRosterBtn = this.containerEl.querySelector("#change-roster-btn");
    if (changeRosterBtn) {
      changeRosterBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.onOpenDraft) {
          this.onOpenDraft();
        } else {
          this.onStartMatch();
        }
      });
    }
  }
}



// =================== js/ui/arena-view.js ===================


class ArenaView {
  constructor({ containerEl, simulator, onMatchFinished }) {
    this.containerEl = containerEl;
    this.sim = simulator;
    this.onMatchFinished = onMatchFinished;
    this.eventsHistory = [];
    this._isResolvingDecision = false;
    this._recentVictimDeaths = new Set();
    this._eventCount = 0;

    this.render();
  }

  render() {
    this._eventCount = 0;
    const state = this.sim.getState();

    this.containerEl.innerHTML = `
      <div class="arena-container">
        <!-- Placar do Topo / Scoreboard -->
        <div class="arena-scoreboard">
          <!-- Time Azul (Jogador) -->
          <div class="scoreboard-team blue-side">
            <div class="scoreboard-emblem" style="background: #091428;">
              <img src="${state.blue.iconUrl}" alt="${state.blue.name}" />
            </div>
            <div>
              <div class="scoreboard-name" style="color: var(--lol-blue-team);">${state.blue.name} (Você)</div>
              <div class="scoreboard-stats">
                <span>💰 <strong id="blue-gold">${state.blue.score.gold}</strong></span>
                <span>🐲 <strong id="blue-dragons">${state.blue.score.dragons}</strong></span>
                <span>👑 <strong id="blue-barons">${state.blue.score.barons}</strong></span>
              </div>
              <div class="team-active-buffs-bar" id="blue-active-buffs"></div>
            </div>
            <div class="score-kills" id="blue-kills" style="color: var(--lol-blue-team);">0</div>
          </div>

          <!-- Centro: Relógio, Fase e Dificuldade da Rodada -->
          <div class="scoreboard-center">
            <div class="game-clock" id="match-clock">${state.time}</div>
            <div class="match-phase-badge" id="match-phase">Fase de Rotas (Barricadas Ativas)</div>
            <div class="match-diff-badge" id="match-difficulty" style="font-size: 10px; font-weight: 800; color: ${this._getDifficultyColor(state.roundIndex)}; background: rgba(0,0,0,0.5); padding: 2px 8px; border-radius: 10px; border: 1px solid ${this._getDifficultyBorder(state.roundIndex)}; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
              ⚡ ${this._getDifficultyText(state.roundIndex)}
            </div>
          </div>

          <!-- Time Vermelho (CBLOL) -->
          <div class="scoreboard-team red-side">
            <div class="scoreboard-emblem" style="background: ${state.red.color || '#e84057'}; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #fff;">
              <span>${state.red.tag || 'CBL'}</span>
            </div>
            <div>
              <div class="scoreboard-name" style="color: var(--lol-red-team);">${state.red.name}</div>
              <div class="scoreboard-stats">
                <span>💰 <strong id="red-gold">${state.red.score.gold}</strong></span>
                <span>🐲 <strong id="red-dragons">${state.red.score.dragons}</strong></span>
                <span>👑 <strong id="red-barons">${state.red.score.barons}</strong></span>
              </div>
              <div class="team-active-buffs-bar" id="red-active-buffs"></div>
            </div>
            <div class="score-kills" id="red-kills" style="color: var(--lol-red-team);">0</div>
          </div>
        </div>

        <!-- BANNER DE ANÚNCIOS MULTIKILL & ACE (ANNOUNCER SYSTEM) -->
        <div class="multikill-announcer-banner" id="multikill-banner">
          <div class="announcer-inner">
            <div class="announcer-tag" id="announcer-tag">DOUBLE KILL!</div>
            <div class="announcer-killer" id="announcer-killer">Seu Time: Jinx</div>
          </div>
        </div>

        <!-- Barra de Controles de Reprodução e Postura Tática Interativa -->
        <div class="match-controls-bar">
          <div class="tactical-actions-group">
            <span class="tactics-group-title">🎯 Postura da Equipe:</span>
            <div class="tactics-buttons-container" id="tactics-buttons-container">
              <button class="tactic-btn ${this.sim.playerTactics === 'balanced' ? 'active' : ''}" data-tactic="balanced" title="Equilibrada: controle de rotas, farm e visão padrão">⚖️ Equilibrada</button>
              <button class="tactic-btn ${this.sim.playerTactics === 'aggressive' ? 'active' : ''}" data-tactic="aggressive" title="Agressiva: pressão e lutas (+Dano em matchups favoráveis. CUIDADO: em desvantagem ou rota acampada pelo caçador rival, causa mortes solo e ganks punidores!)">⚔️ Agressiva</button>
              <button class="tactic-btn ${this.sim.playerTactics === 'defense' ? 'active' : ''}" data-tactic="defense" title="Defensiva: joga sob as torres e absorve pressão (+Armadura, -Push)">🛡️ Defensiva</button>
              <button class="tactic-btn ${this.sim.playerTactics === 'split' ? 'active' : ''}" data-tactic="split" title="Split Push: foca em derreter torres e puxar rotas laterais (+Push, -Dano TF)">🏰 Split Push</button>
            </div>
          </div>

          <div class="speed-buttons-group">
            <button class="speed-btn ${this.sim.speed === 1 ? 'active' : ''}" data-speed="1">1x</button>
            <button class="speed-btn ${this.sim.speed === 2 ? 'active' : ''}" data-speed="2">2x</button>
            <button class="speed-btn ${this.sim.speed === 4 ? 'active' : ''}" data-speed="4">4x</button>
            <button class="speed-btn" id="skip-match-btn" style="background: rgba(200, 170, 110, 0.2); border-color: var(--lol-gold-2); color: #fff;">
              ⏩ Pular para o Final
            </button>
          </div>
        </div>

        <!-- Alerta Dinâmico de Super Minions -->
        <div class="super-minions-alert" id="super-minions-alert">
          ⚠️ SUPER TROPAS AVANÇANDO PELAS ROTAS! DANO EM ESTRUTURAS DOBRADO! ⚠️
        </div>

        <!-- Alerta Dinâmico de Recompensas de Objetivo (Comeback Mechanics) -->
        <div class="objective-bounties-alert" id="objective-bounties-alert">
          🎯 RECOMPENSAS DE OBJETIVO ATIVAS: +650g a +800g de Ouro Global de Virada ao Destruir Torres ou Monstros Épicos!
        </div>

        <!-- CAMPO DE BATALHA COM AS ESTRUTURAS: MAPA DO RIFT (ESQUERDA) & KILLFEED AO VIVO (DIREITA) -->
        <div class="battlefield-arena">
          <!-- Esquerda: Minimapa Oficial Interativo do Rift -->
          <div class="rift-map-wrapper">
            <!-- Cabeçalho Tático do Mapa: Controle das 3 Rotas & Objetivos do Rio -->
            <div class="rift-map-header">
              <div class="lane-status-badge top-lane" id="badge-lane-top">
                <span class="lane-icon">🛡️</span>
                <span class="lane-name">TOPO</span>
                <span class="lane-pressure-val" id="pressure-val-top">0% EQUILIBRADO</span>
              </div>
              <div class="lane-status-badge mid-lane" id="badge-lane-mid">
                <span class="lane-icon">⚔️</span>
                <span class="lane-name">MEIO</span>
                <span class="lane-pressure-val" id="pressure-val-mid">0% EQUILIBRADO</span>
              </div>
              <div class="lane-status-badge bot-lane" id="badge-lane-bot">
                <span class="lane-icon">🏹</span>
                <span class="lane-name">INFERIOR</span>
                <span class="lane-pressure-val" id="pressure-val-bot">0% EQUILIBRADO</span>
              </div>
              <div class="rift-map-legend">
                <span class="legend-item blue"><span class="legend-dot blue-dot"></span> Azul</span>
                <span class="legend-item red"><span class="legend-dot red-dot"></span> Vermelho</span>
              </div>
            </div>

            <!-- Moldura Oficial do Minimapa League of Legends (HUD Frame) -->
            <div class="lol-minimap-frame">
              <div class="minimap-corner-bracket-tl"></div>
              <div class="minimap-ping-btn" title="Atenção / Ping Tático"><span>!</span></div>
              <div class="rift-svg-container" id="rift-svg-container">
                ${this._renderSummonersRiftSvg(state)}
                <!-- Tooltip Flutuante Interativo de Estruturas do Rift -->
                <div class="rift-structure-tooltip" id="rift-structure-tooltip" style="display:none;"></div>
              </div>
              <div class="minimap-cam-btn" title="Câmera do Mapa">🎯</div>
            </div>
          </div>

          <!-- Direita: Central Killfeed & Broadcast Hub (Super Visível) -->
          <div class="broadcast-killfeed-panel">
            <div class="broadcast-feed-header">
              <div class="broadcast-live-indicator">
                <span class="live-dot-pulse"></span>
                <span class="live-text">AO VIVO</span>
              </div>
              <div class="broadcast-feed-title">⚔️ ABATES & JOGADAS</div>
              <div class="broadcast-feed-count" id="broadcast-feed-count">0 eventos</div>
            </div>
            <div class="killfeed-box" id="killfeed-container">
              <div class="killfeed-entry-wrapper">
                <div class="kfeed-card kfeed-general">
                  <span class="kfeed-time">01:30</span>
                  <span class="kfeed-msg">⚔️ Tropas liberadas em Summoner's Rift! Boa sorte e bom jogo!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BANNER EDUCATIVO DE FARM: VALOR DE LAST HITS -->
        <div class="farm-edu-tip-bar" title="Dica Profissional: 15 a 18 tropas (CS) equivalem a 300 de ouro (o mesmo valor de 1 abate de campeão). Farmar com consistência é o caminho mais seguro para a vitória!">
          <span class="farm-edu-badge">🌾 VALOR DO FARM</span>
          <span class="farm-edu-text"><strong>~18 Tropas (CS) ≈ 1 Abate (300g)</strong> • Ouro constante de farm garante itens sem se expor a ganks!</span>
        </div>

        <!-- PAINEL CENTRAL DE TRANSMISSÃO ESPORTS: ESCALAÇÃO AZUL (ESQ) | ESCALAÇÃO VERMELHA (DIR) -->
        <div class="arena-broadcast-center">
          <!-- Coluna 1: Escalação Azul -->
          <div class="lineup-box blue-side-panel">
            <div class="lineup-title blue">
              <span>🔵 Escalação ${state.blue.name}</span>
              <div class="lineup-stat-headers">
                <span class="lineup-items-header" title="Itens Concluídos">ITENS</span>
                <span class="lineup-farm-header" title="Tropas abatidas (CS) e média por minuto">🌾 FARM</span>
                <span class="lineup-gold-header" title="Ouro total e vantagem de rota">💰 OURO</span>
                <span class="lineup-kda-header">K / D / A</span>
              </div>
            </div>
            <div id="blue-roster-status" class="roster-status-list">
              ${this._renderRosterRows(state.blue.roster, "blue")}
            </div>
          </div>

          <!-- Coluna 2: Escalação Vermelha -->
          <div class="lineup-box red-side-panel">
            <div class="lineup-title red">
              <span>🔴 Escalação ${state.red.name}</span>
              <div class="lineup-stat-headers">
                <span class="lineup-items-header" title="Itens Concluídos">ITENS</span>
                <span class="lineup-farm-header" title="Tropas abatidas (CS) e média por minuto">🌾 FARM</span>
                <span class="lineup-gold-header" title="Ouro total e vantagem de rota">💰 OURO</span>
                <span class="lineup-kda-header">K / D / A</span>
              </div>
            </div>
            <div id="red-roster-status" class="roster-status-list">
              ${this._renderRosterRows(state.red.roster, "red")}
            </div>
          </div>
        </div>

      <!-- Modal de Decisão Tática Interativa (Dragão / Barão / Arauto Macro Choice) -->
      <div class="tactical-decision-modal" id="tactical-decision-modal">
        <div class="decision-modal-card">
          <button type="button" class="decision-modal-close-btn" id="decision-modal-close-btn" title="Continuar partida">✕</button>
          <div class="decision-modal-header">
            <div class="decision-badge" id="decision-modal-badge">DECISÃO TÁTICA DO RIFT</div>
            <h2 class="decision-modal-title" id="decision-modal-title">🐲 DISPUTA PELO OBJETIVO!</h2>
            <p class="decision-modal-subtitle" id="decision-modal-subtitle">Escolha o plano de jogo da sua equipe...</p>
          </div>
          <!-- Barra de Status / Parâmetros do Confronto (Placar, Gold, Abates e Objetivos) -->
          <div class="decision-match-status-bar" id="decision-match-status-bar">
            <!-- Inserido dinamicamente ao abrir a decisão -->
          </div>
          <div class="decision-options-grid" id="decision-options-container">
            <!-- Opções inseridas dinamicamente -->
          </div>
          <div class="decision-feedback-banner" id="decision-feedback-banner" style="display: none;">
            <div class="decision-feedback-icon" id="decision-feedback-icon">⚡</div>
            <div class="decision-feedback-text" id="decision-feedback-text">Executando estratégia...</div>
          </div>
        </div>
      </div>

      <!-- Modal da Loja Hextech de Itens & Árvore de Receitas Oficial do LoL -->
      <div class="item-shop-modal" id="item-shop-modal">
        <div class="item-shop-modal-card">
          <div class="shop-modal-header">
            <div class="shop-modal-header-left">
              <span class="shop-gold-icon">🛒</span>
              <div>
                <h2 class="shop-modal-title">LOJA HEXTECH & ÁRVORE DE RECEITAS</h2>
                <p class="shop-modal-subtitle">Catálogo Oficial de Itens de League of Legends • Patch 14.20</p>
              </div>
            </div>
            <div class="shop-modal-header-right">
              <div class="shop-search-wrap">
                <input type="text" id="shop-search-input" class="shop-search-input" placeholder="🔍 Buscar item ou atributo (ex: Gume, Vida, MR)..." />
              </div>
              <button type="button" class="decision-modal-close-btn" id="shop-modal-close-btn" title="Fechar Loja">✕</button>
            </div>
          </div>

          <!-- Filtro de Categorias em Abas -->
          <div class="shop-categories-tabs" id="shop-categories-tabs">
            <!-- Abas geradas dinamicamente com ITEM_CATEGORIES -->
          </div>

          <!-- Conteúdo Principal da Loja: Catálogo à Esquerda | Inspetor & Árvore de Receitas à Direita -->
          <div class="shop-modal-body">
            <!-- Grade de Itens do Catálogo -->
            <div class="shop-items-grid-container" id="shop-items-grid">
              <!-- Itens injetados dinamicamente -->
            </div>

            <!-- Painel Inspetor do Item Selecionado e Árvore Genealógica -->
            <div class="shop-item-inspector" id="shop-item-inspector">
              <!-- Detalhes do item e árvore de receita -->
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay de Fim de Partida / Explosão de Nexus e Estatísticas Oficiais do LoL -->
      <div class="nexus-explosion-overlay" id="nexus-end-overlay">
        <div class="match-stats-modal">
          <div class="stats-modal-header">
            <div class="stats-header-left">
              <div id="end-trophy-icon" class="stats-trophy-icon">🏆</div>
              <div class="stats-header-text">
                <h1 id="end-banner-title" class="ceremony-title gold">VITÓRIA GLORIOSA!</h1>
                <p id="end-banner-desc" class="ceremony-subtitle">O Nexus inimigo foi implodido com sucesso!</p>
                <div id="end-series-pill" class="series-status-pill" style="display:none;"></div>
              </div>
            </div>
            <div class="stats-header-right">
              <button id="end-header-continue-btn" class="lol-btn lol-btn-primary stats-header-continue-btn" title="Avançar para a próxima fase">
                Avançar ➔
              </button>
            </div>
          </div>

          <!-- Placar Comparativo de Equipes & Objetivos Globais -->
          <div class="stats-global-scoreboard" id="stats-global-scoreboard"></div>

          <!-- Abas de Navegação -->
          <div class="stats-tabs-row" id="stats-tabs-row">
            <button class="stats-tab-btn active" data-tab="overview">
              <span class="tab-icon">📋</span> Visão Geral (KDA & Itens)
            </button>
            <button class="stats-tab-btn" data-tab="damage">
              <span class="tab-icon">⚔️</span> Dano a Campeões
            </button>
            <button class="stats-tab-btn" data-tab="gold">
              <span class="tab-icon">💰</span> Gráfico de Ouro
            </button>
            <button class="stats-tab-btn" data-tab="taken">
              <span class="tab-icon">🛡️</span> Dano Sofrido (Tanque)
            </button>
          </div>

          <!-- Conteúdo da Aba Selecionada -->
          <div class="stats-tab-body" id="stats-tab-body"></div>

          <!-- Rodapé com Botão de Ação -->
          <div class="stats-modal-footer">
            <button id="end-continue-btn" class="lol-btn lol-btn-primary stats-continue-btn">
              Avançar para a Próxima Fase ➔
            </button>
          </div>
        </div>
      </div>
    `;

    this._bindControls();
  }

  _renderSummonersRiftSvg(state) {
    const MAP_COORDS = {
      blue: {
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
      },
      red: {
        top_t1: { x: 338, y: 84 },
        top_t2: { x: 525, y: 116 },
        top_t3: { x: 660, y: 92 },
        top_inhib: { x: 692, y: 88 },
        mid_t1: { x: 597, y: 292 },
        mid_t2: { x: 626, y: 240 },
        mid_t3: { x: 692, y: 190 },
        mid_inhib: { x: 718, y: 172 },
        bot_t1: { x: 864, y: 484 },
        bot_t2: { x: 804, y: 328 },
        bot_t3: { x: 836, y: 222 },
        bot_inhib: { x: 812, y: 198 },
        nexus_t1: { x: 768, y: 122 },
        nexus_t2: { x: 794, y: 152 },
        nexus: { x: 812, y: 116 }
      }
    };

    const renderStructures = (structures, side) => {
      if (!structures) return "";
      const sideCoords = MAP_COORDS[side];
      return structures.map(s => {
        let coords = sideCoords[s.id];
        if (!coords) {
          if (s.id === "t1") coords = sideCoords.mid_t1;
          else if (s.id === "t2") coords = sideCoords.mid_t2;
          else if (s.id === "t3") coords = sideCoords.mid_t3;
          else if (s.id === "inhib") coords = sideCoords.mid_inhib;
          else if (s.id === "nexus") coords = sideCoords.nexus;
        }
        if (!coords) return "";
        return this._renderMapStructureSvg(s, side, coords);
      }).join('');
    };

    const blueStructuresSvg = renderStructures(state.blue?.structures, "blue");
    const redStructuresSvg = renderStructures(state.red?.structures, "red");

    return `
      <svg class="summoners-rift-svg" viewBox="0 0 1024 727" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="blue-base-grad" cx="15%" cy="85%" r="35%">
            <stop offset="0%" stop-color="#0a2a4a" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#051220" stop-opacity="0.2" />
          </radialGradient>
          <radialGradient id="red-base-grad" cx="85%" cy="15%" r="35%">
            <stop offset="0%" stop-color="#4a0f1d" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#180408" stop-opacity="0.2" />
          </radialGradient>
          <filter id="rift-glow-blue" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="rift-glow-red" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Fundo Oficial Autêntico 3D de Summoner's Rift com Todas as Estruturas -->
        <image href="assets/map/summoners_rift_hd.png" xlink:href="assets/map/summoners_rift_hd.png" x="0" y="0" width="1024" height="727" preserveAspectRatio="none" />

        <!-- Covil do Barão Nashor (Parte Superior do Rio) -->
        <g class="pit-marker baron-pit" id="pit-baron" transform="translate(360, 230)" data-pit="baron" title="Covil do Barão Nashor">
          <circle class="pit-hitbox" r="28" fill="transparent" />
          <circle r="20" fill="#200d2c" fill-opacity="0.45" stroke="#c084fc" stroke-width="2" />
          <text text-anchor="middle" dominant-baseline="central" font-size="13">👾</text>
        </g>

        <!-- Covil do Dragão Elemental (Parte Inferior do Rio) -->
        <g class="pit-marker dragon-pit" id="pit-dragon" transform="translate(645, 515)" data-pit="dragon" title="Covil do Dragão Elemental">
          <circle class="pit-hitbox" r="28" fill="transparent" />
          <circle r="20" fill="#301206" fill-opacity="0.45" stroke="#fb923c" stroke-width="2" />
          <text text-anchor="middle" dominant-baseline="central" font-size="13">🐲</text>
        </g>

        <!-- Marcadores de Choque de Minions (Minion Clash Waves) com Cores Únicas por Rota e Contagem ao Vivo -->
        <!-- ROTA SUPERIOR (TOP): Verde Esmeralda / Selva (#10b981) -->
        <g id="clash-top" class="minion-clash-wave clash-top" data-lane="top" transform="translate(268, 136)" cursor="pointer">
          <circle class="clash-hitbox" r="24" fill="transparent" />
          <circle r="16" fill="#10b981" opacity="0.35" class="clash-wave-pulse pulse-top" />
          <circle r="8.5" fill="#064e3b" stroke="#34d399" stroke-width="2" class="clash-core core-top" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8.5" class="clash-icon">🌲</text>
          <g class="clash-pill" transform="translate(0, -18)">
            <rect x="-26" y="-8.5" width="52" height="17" rx="8.5" class="pill-rect pill-top" fill="rgba(6, 78, 59, 0.92)" stroke="#10b981" stroke-width="1.2" />
            <text text-anchor="middle" dominant-baseline="central" class="pill-count-text" id="clash-count-top" font-size="8.5" font-weight="800" fill="#f0e6d2">6 ⚔️ 6</text>
          </g>
        </g>

        <!-- ROTA DO MEIO (MID): Roxo Arcano / Magia (#a855f7) -->
        <g id="clash-mid" class="minion-clash-wave clash-mid" data-lane="mid" transform="translate(514, 344)" cursor="pointer">
          <circle class="clash-hitbox" r="24" fill="transparent" />
          <circle r="16" fill="#a855f7" opacity="0.35" class="clash-wave-pulse pulse-mid" />
          <circle r="8.5" fill="#3b0764" stroke="#c084fc" stroke-width="2" class="clash-core core-mid" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8.5" class="clash-icon">🔮</text>
          <g class="clash-pill" transform="translate(0, -18)">
            <rect x="-26" y="-8.5" width="52" height="17" rx="8.5" class="pill-rect pill-mid" fill="rgba(59, 7, 100, 0.92)" stroke="#a855f7" stroke-width="1.2" />
            <text text-anchor="middle" dominant-baseline="central" class="pill-count-text" id="clash-count-mid" font-size="8.5" font-weight="800" fill="#f0e6d2">6 ⚔️ 6</text>
          </g>
        </g>

        <!-- ROTA INFERIOR (BOT): Dourado Solar / Atiradores (#f59e0b) -->
        <g id="clash-bot" class="minion-clash-wave clash-bot" data-lane="bot" transform="translate(814, 610)" cursor="pointer">
          <circle class="clash-hitbox" r="24" fill="transparent" />
          <circle r="16" fill="#f59e0b" opacity="0.35" class="clash-wave-pulse pulse-bot" />
          <circle r="8.5" fill="#78350f" stroke="#fbbf24" stroke-width="2" class="clash-core core-bot" />
          <text text-anchor="middle" dominant-baseline="central" font-size="8.5" class="clash-icon">🏹</text>
          <g class="clash-pill" transform="translate(0, -18)">
            <rect x="-26" y="-8.5" width="52" height="17" rx="8.5" class="pill-rect pill-bot" fill="rgba(120, 53, 15, 0.92)" stroke="#f59e0b" stroke-width="1.2" />
            <text text-anchor="middle" dominant-baseline="central" class="pill-count-text" id="clash-count-bot" font-size="8.5" font-weight="800" fill="#f0e6d2">6 ⚔️ 6</text>
          </g>
        </g>

        <!-- ESTRUTURAS DO MAPA (30 Estruturas Autênticas) -->
        <g class="structures-layer blue-structures">
          ${blueStructuresSvg}
        </g>
        <g class="structures-layer red-structures">
          ${redStructuresSvg}
        </g>
      </svg>
    `;
  }

  _renderMapStructureSvg(struct, side, coords) {
    if (!struct || !coords) return "";
    const isNexus = struct.tier === "nexus" || struct.id === "nexus";
    const isInhib = struct.tier === "inhib" || struct.id.includes("inhib");
    const isT1 = struct.tier === 1 || struct.id.includes("t1");
    const radius = isNexus ? 24 : (isInhib ? 18 : 15);
    const pct = Math.max(0, Math.min(100, Math.round((struct.currentHp / struct.maxHp) * 100)));
    const circumference = Math.round(2 * Math.PI * radius);
    const strokeDash = Math.round((pct / 100) * circumference);

    const iconSymbol = isNexus ? "⚛️" : (isInhib ? "💎" : "🏰");

    return `
      <g class="map-structure-node ${side}-side ${struct.destroyed ? 'destroyed' : ''} ${isNexus ? 'is-nexus' : ''}" 
         id="struct-${side}-${struct.id}"
         data-side="${side}"
         data-id="${struct.id}"
         data-name="${struct.name}"
         data-hp="${struct.currentHp}"
         data-max-hp="${struct.maxHp}"
         data-plates="${struct.plates || 0}"
         data-gold="${struct.goldValue || 0}"
         data-tier="${struct.tier}"
         transform="translate(${coords.x}, ${coords.y})">
        <!-- Hitbox invisível estável para captura de mouse sem oscilação -->
        <circle class="struct-hitbox" r="${radius + 7}" fill="transparent" />
        <!-- Glow / Halo de hover e clique -->
        <circle class="struct-halo" r="${radius + 5}" />
        <!-- Fundo escuro do anel -->
        <circle class="struct-hp-bg" r="${radius}" />
        <!-- Anel de Vida Dinâmico (SVG Stroke Dash) -->
        <circle class="struct-hp-ring ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}" 
                r="${radius}" 
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference - strokeDash}"
                transform="rotate(-90)" />
        <!-- Núcleo interno colorido -->
        <circle class="struct-core" r="${radius - 3}" />
        <!-- Ícone representativo -->
        <text class="struct-icon" text-anchor="middle" dominant-baseline="central" font-size="${isNexus ? 14 : (isInhib ? 11 : 9.5)}">${iconSymbol}</text>
        <!-- Badge de Barricadas (Placas ativas da T1) -->
        ${isT1 && !struct.destroyed && struct.plates > 0 ? `
          <g class="struct-plates-badge" transform="translate(0, ${radius + 9})">
            <rect x="-14" y="-7" width="28" height="14" rx="7" fill="#1c160a" stroke="#f0b622" stroke-width="1.5" />
            <text text-anchor="middle" y="3" fill="#f0e6d2" font-size="8.5" font-weight="900">${struct.plates}P</text>
          </g>
        ` : ''}
        <!-- Indicador de Ruína quando Destruído -->
        <g class="struct-ruined-indicator" style="display: ${struct.destroyed ? 'block' : 'none'};">
          <circle r="${radius + 3}" fill="#080c10" stroke="#ff3344" stroke-width="1.5" opacity="0.92" />
          <text text-anchor="middle" dominant-baseline="central" font-size="12" fill="#ff3344">❌</text>
        </g>
      </g>
    `;
  }

  _renderStructuresGroup(structures, side) {
    // Ordem visual no mapa da esquerda para a direita:
    // Lado Azul: Nexus -> Torre Nexus 1 -> Torre Nexus 2 -> Inibidor -> T3 -> T2 -> T1 (indo para o rio)
    // [RIO NO MEIO]
    // Lado Vermelho: T1 -> T2 -> T3 -> Inibidor -> Torre Nexus 1 -> Torre Nexus 2 -> Nexus (saindo do rio em direção à base inimiga)
    const ordered = side === "blue"
      ? [
          structures.find(s => s.id === "nexus"),
          structures.find(s => s.id === "nexus_t1"),
          structures.find(s => s.id === "nexus_t2"),
          structures.find(s => s.id === "inhib"),
          structures.find(s => s.id === "t3"),
          structures.find(s => s.id === "t2"),
          structures.find(s => s.id === "t1")
        ]
      : [
          structures.find(s => s.id === "t1"),
          structures.find(s => s.id === "t2"),
          structures.find(s => s.id === "t3"),
          structures.find(s => s.id === "inhib"),
          structures.find(s => s.id === "nexus_t1"),
          structures.find(s => s.id === "nexus_t2"),
          structures.find(s => s.id === "nexus")
        ];

    return ordered.filter(Boolean).map(s => this._renderSingleStructure(s, side)).join('');
  }

  _renderSingleStructure(struct, side) {
    const isNexus = struct.id === "nexus";
    const isInhib = struct.id === "inhib";
    const isT1 = struct.id === "t1";
    const pct = Math.round((struct.currentHp / struct.maxHp) * 100);

    let iconSymbol = "🏰";
    if (isNexus) iconSymbol = "⚛️";
    if (isInhib) iconSymbol = "💎";

    return `
      <div class="structure-node ${isNexus ? 'is-nexus' : ''} ${struct.destroyed ? 'destroyed' : ''} ${side}-side" id="struct-${side}-${struct.id}">
        <div class="structure-icon-box" title="${struct.name}">
          <span>${iconSymbol}</span>
        </div>
        <div class="structure-hp-bar">
          <div class="structure-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}" style="width: ${pct}%"></div>
        </div>
        <div class="structure-label">${this._getShortStructLabel(struct.id)}</div>
        <div class="structure-hp-text">${struct.destroyed ? 'DESTRUÍDO' : `${struct.currentHp}`}</div>
        ${isT1 && !struct.destroyed && struct.plates > 0 ? `
          <div class="structure-plates-badge" title="Barricadas ativas">+${struct.plates} Placas</div>
        ` : ''}
      </div>
    `;
  }

  _getShortStructLabel(id) {
    const labels = {
      t1: "Torre T1",
      t2: "Torre T2",
      t3: "Torre T3",
      inhib: "Inibidor",
      nexus_t1: "Torre Nexus",
      nexus_t2: "Torre Nexus",
      nexus: "NEXUS"
    };
    return labels[id] || id.toUpperCase();
  }

  _formatGold(val) {
    if (val === undefined || val === null) return "0g";
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + "k";
    }
    return val + "g";
  }

  _renderChampItems(items) {
    const slots = [0, 1, 2, 3, 4, 5];
    return `
      <div class="champ-items-tray">
        ${slots.map(idx => {
          const itm = items && items[idx];
          if (itm) {
            const recipeInfo = (itm.from && itm.from.length > 0)
              ? ` • Receita: ${itm.from.map(cId => { const c = getItemById(cId); return c ? c.name : cId; }).join(' + ')}`
              : '';
            const tierBadge = itm.tier ? `[${itm.tier}] ` : '';
            return `<div class="item-slot-icon filled ${itm.tier ? itm.tier.toLowerCase() : ''}" data-item-id="${itm.id}" title="${tierBadge}${itm.name} (${(itm.cost || 0).toLocaleString()}g)\n${itm.description || ''}${recipeInfo} (Clique para ver receita na Loja)"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
          }
          return `<div class="item-slot-icon empty" title="Espaço de item (Slot ${idx + 1}/6)"></div>`;
        }).join('')}
      </div>
    `;
  }

  _renderRosterRows(rosterState, side) {
    const roles = ["top", "jungle", "mid", "adc", "support"];
    return roles.map(role => {
      const m = rosterState[role];
      if (!m) return '';
      const champ = getChampionById(m.id);
      const champKey = champ ? champ.id : (m.id === "Wukong" ? "MonkeyKing" : m.id);
      const p = m.proPlayer;
      const champFallback = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champKey}.png`;
      const avatarSrc = (p && p.avatar) ? p.avatar : champFallback;

      const titleAttr = p 
        ? `${p.nick} (${p.name}) • ${p.traits} • "${p.quote}"`
        : `Clique para ouvir a fala de ${m.name}`;

      return `
        <div class="champion-status-row ${!m.alive ? 'dead' : ''}" id="champ-row-${side}-${role}" data-champ-id="${champKey}" title="${titleAttr}" style="cursor: pointer;">
          <div class="champ-meta-left">
            <div class="player-roster-avatar-wrap ${m.isSignature ? 'signature-glow' : ''}">
              <img class="pro-roster-photo" src="${avatarSrc}" alt="${p ? p.nick : m.name}" onerror="this.onerror=null; this.src='${champFallback}';" />
              ${p ? `
                <div class="champ-roster-badge" title="${m.name}">
                  <img src="${champFallback}" alt="${m.name}" />
                </div>
              ` : ''}
              <div class="dead-overlay">💀</div>
            </div>
            <div class="roster-player-text">
              <div class="champ-ingame-name">
                ${m.isSignature ? '<span class="sig-star" title="Pick de Conforto!">⭐</span>' : ''}
                <strong class="player-nick-highlight">${m.playerNick || m.name}</strong>
                ${m.playerNick ? `<span class="champ-sub-name">${m.name}</span>` : ''}
                <span class="champ-mvp-slot" id="mvp-slot-${side}-${role}">${m.isMvp ? '<span class="champ-mvp-badge" title="👑 MVP da Equipe! Lute ao redor deste carregador!">👑 MVP</span>' : ''}</span>
              </div>
              <div class="champ-meta-tags">
                <span class="champ-role-tag">${role.toUpperCase()}</span>
                <span class="champ-matchup-slot" id="matchup-slot-${side}-${role}"></span>
              </div>
            </div>
          </div>
          <div class="champ-data-right">
            ${this._renderChampItems(m.items)}
            <div class="champ-farm-stats" id="farm-${side}-${role}" title="Farm: ${m.cs || 0} tropas • ~${Math.round((m.cs || 0) * 21).toLocaleString()}g em tropas (~${((m.cs || 0) / 15).toFixed(1)} abates em ouro seguro!)">
              <span class="cs-icon">🌾</span>
              <span class="cs-count">${m.cs || 0}</span>
              <span class="cs-rate">(${m.csPerMin !== undefined ? m.csPerMin.toFixed(1) : '0.0'})</span>
            </div>
            <div class="champ-gold-stats" id="gold-${side}-${role}" title="Carteira: ${(m.goldCurrent || 500).toLocaleString()}g | Total Acumulado: ${(m.goldEarned || 500).toLocaleString()}g">
              <span class="gold-icon">💰</span>
              <span class="gold-val">${this._formatGold(m.goldEarned || 500)}</span>
              <span class="gold-diff-pill even" id="gold-diff-${side}-${role}">±0g</span>
            </div>
            <div class="champ-kda" id="kda-${side}-${role}">
              ${m.kills} / ${m.deaths} / ${m.assists}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  updateTick(state) {
    // Relógio
    const clockEl = this.containerEl.querySelector("#match-clock");
    if (clockEl) clockEl.textContent = state.time;

    // Placar
    const blueKills = this.containerEl.querySelector("#blue-kills");
    const redKills = this.containerEl.querySelector("#red-kills");
    if (blueKills) blueKills.textContent = state.blue.score.kills;
    if (redKills) redKills.textContent = state.red.score.kills;

    const blueGold = this.containerEl.querySelector("#blue-gold");
    const redGold = this.containerEl.querySelector("#red-gold");
    if (blueGold) blueGold.textContent = state.blue.score.gold;
    if (redGold) redGold.textContent = state.red.score.gold;

    const blueDragons = this.containerEl.querySelector("#blue-dragons");
    const redDragons = this.containerEl.querySelector("#red-dragons");
    if (blueDragons) blueDragons.textContent = state.blue.score.dragons;
    if (redDragons) redDragons.textContent = state.red.score.dragons;

    const blueBarons = this.containerEl.querySelector("#blue-barons");
    const redBarons = this.containerEl.querySelector("#red-barons");
    if (blueBarons) blueBarons.textContent = state.blue.score.barons;
    if (redBarons) redBarons.textContent = state.red.score.barons;

    // Fase oficial da partida do LoL
    const phaseEl = this.containerEl.querySelector("#match-phase");
    if (phaseEl) {
      if (state.gameSeconds < 840) {
        phaseEl.textContent = "Fase de Rotas • Barricadas de Torre Ativas";
        phaseEl.style.color = "var(--lol-gold-1)";
      } else if (state.gameSeconds < 1200) {
        phaseEl.textContent = "Mid Game • Rotações & Disputa de T2";
        phaseEl.style.color = "var(--lol-blue-glow)";
      } else if (state.gameSeconds < 1680) {
        phaseEl.textContent = "Barão Na'Shor • Cerco de Base & Inibidores";
        phaseEl.style.color = "#a855f7";
      } else {
        phaseEl.textContent = "Late Game Decisivo • Dragão Ancião";
        phaseEl.style.color = "#e84057";
      }
    }

    // Atualiza estado ativo dos botões de postura tática
    const currentTactic = state.playerTactics || (this.sim && this.sim.playerTactics);
    if (currentTactic) {
      this.containerEl.querySelectorAll(".tactic-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tactic") === currentTactic);
      });
    }

    // Alerta de Recompensas de Objetivo (Comeback Mechanics)
    const bountyAlert = this.containerEl.querySelector("#objective-bounties-alert");
    if (bountyAlert) {
      if (state.objectiveBountiesActive) {
        bountyAlert.classList.add("active");
      } else {
        bountyAlert.classList.remove("active");
      }
    }

    // Alerta de Super Minions
    const alertEl = this.containerEl.querySelector("#super-minions-alert");
    if (alertEl) {
      if (state.blue.superMinions || state.red.superMinions) {
        alertEl.classList.add("active");
        if (state.blue.superMinions) {
          alertEl.textContent = `⚠️ SUPER TROPAS AZUIS AVANÇANDO NA BASE INIMIGA! (+DANO EM TORRES)`;
        } else {
          alertEl.textContent = `⚠️ SUPER TROPAS VERMELHAS INVADINDO A NOSSA BASE! PROTEJA O NEXUS!`;
        }
      } else {
        alertEl.classList.remove("active");
      }
    }

    // Sincronização em tempo real das 30 estruturas do mapa Summoner's Rift
    const syncStructures = (structures, side) => {
      if (!structures) return;
      structures.forEach(struct => {
        const el = this.containerEl.querySelector(`#struct-${side}-${struct.id}`);
        if (!el) return;

        el.dataset.hp = struct.currentHp;
        el.dataset.maxHp = struct.maxHp;
        el.dataset.plates = struct.plates || 0;

        const isNexus = struct.tier === "nexus" || struct.id === "nexus";
        const isInhib = struct.tier === "inhib" || struct.id.includes("inhib");
        const radius = isNexus ? 25 : (isInhib ? 18 : 16);
        const circumference = Math.round(2 * Math.PI * radius);
        const pct = Math.max(0, Math.min(100, Math.round((struct.currentHp / struct.maxHp) * 100)));
        const strokeDash = Math.round((pct / 100) * circumference);

        const ring = el.querySelector(".struct-hp-ring");
        if (ring) {
          ring.style.strokeDashoffset = `${circumference - strokeDash}`;
          if (pct < 30) {
            ring.classList.add("critical");
            ring.classList.remove("damaged");
          } else if (pct < 60) {
            ring.classList.add("damaged");
            ring.classList.remove("critical");
          } else {
            ring.classList.remove("critical", "damaged");
          }
        }

        const ruined = el.querySelector(".struct-ruined-indicator");
        const plateBadge = el.querySelector(".struct-plates-badge");

        // Suporte a componentes legados se existirem
        const text = el.querySelector(".structure-hp-text");
        if (text) text.textContent = struct.destroyed ? "DESTRUÍDO" : `${struct.currentHp}`;
        const fill = el.querySelector(".structure-hp-fill");
        if (fill) {
          fill.style.width = struct.destroyed ? "0%" : `${pct}%`;
          fill.className = `structure-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}`;
        }

        if (struct.destroyed) {
          el.classList.add("destroyed");
          if (ruined) ruined.style.display = "block";
          if (plateBadge) plateBadge.style.display = "none";
        } else {
          el.classList.remove("destroyed");
          if (ruined) ruined.style.display = "none";
          if (plateBadge) {
            if (struct.plates > 0) {
              plateBadge.style.display = "block";
              const pText = plateBadge.querySelector("text");
              if (pText) pText.textContent = `${struct.plates}P`;
            } else {
              plateBadge.style.display = "none";
            }
          }
        }
      });
    };
    if (state.blue && state.blue.structures) syncStructures(state.blue.structures, "blue");
    if (state.red && state.red.structures) syncStructures(state.red.structures, "red");
    this._updateActiveStructureTooltip();

    // Sincronização dinâmica das 3 Rotas (Top, Mid, Bot): Pressão e Pontos de Choque de Minions
    const pressures = state.lanePressures || {
      top: state.lanePressure || 0,
      mid: state.lanePressure || 0,
      bot: state.lanePressure || 0
    };

    const formatPressure = (val) => {
      if (val > 5) return `+${val}% AZUL`;
      if (val < -5) return `+${Math.abs(val)}% RED`;
      return `0% EQUILIBRADO`;
    };

    const updatePressureBadge = (lane, val) => {
      const el = this.containerEl.querySelector(`#pressure-val-${lane}`);
      const badge = this.containerEl.querySelector(`#badge-lane-${lane}`);
      const isFocused = state.focusedLane === lane;
      const isBlueCamped = state.blueJungleCampLane === lane;
      const isRedCamped = state.redJungleCampLane === lane;

      let suffix = "";
      if (isFocused) suffix += " 🎯";
      if (isBlueCamped) suffix += " 🌲";
      if (isRedCamped) suffix += " 🔴";
      if (lane === "top" && state.gameSeconds >= 900 && state.topPushAdvantage) {
        if (state.topPushAdvantage.leader === "blue") suffix += " 🌊";
        else if (state.topPushAdvantage.leader === "red") suffix += " ⚠️";
      }

      if (el) el.textContent = formatPressure(val) + suffix;
      if (badge) {
        badge.classList.toggle("blue-push", val > 8);
        badge.classList.toggle("red-push", val < -8);
        badge.classList.toggle("active-focus", isFocused);
        badge.classList.toggle("blue-camped", isBlueCamped);
        badge.classList.toggle("red-camped", isRedCamped);
        let titleTip = `Clique para alternar o foco da equipe e do seu Caçador nesta rota!`;
        if (isBlueCamped) titleTip += ` (🌲 Foco do Seu Caçador)`;
        if (isRedCamped) titleTip += ` (⚠️ Alvo do Caçador Rival)`;
        if (lane === "top" && state.topPushAdvantage && state.gameSeconds >= 900) {
          titleTip += ` • ${state.topPushAdvantage.desc}`;
        }
        badge.title = titleTip;
      }
    };

    updatePressureBadge("top", pressures.top || 0);
    updatePressureBadge("mid", pressures.mid || 0);
    updatePressureBadge("bot", pressures.bot || 0);

    // Movimentação dos pontos de colisão ao longo das rotas do mapa 3D oficial
    // Respeita estritamente as torres vivas: tropas NUNCA passam de uma torre em pé!
    ["top", "mid", "bot"].forEach(lane => {
      const clashEl = this.containerEl.querySelector(`#clash-${lane}`);
      if (clashEl) {
        const coords = this._getLaneClashPosition(lane, pressures[lane] || 0, state);
        clashEl.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
      }
    });

    // Atualiza contadores e status visuais de tropas nas pílulas flutuantes de cada rota
    const clashLanes = ["top", "mid", "bot"];
    clashLanes.forEach(cL => {
      const p = pressures[cL] || 0;
      const countEl = this.containerEl.querySelector(`#clash-count-${cL}`);
      if (countEl) {
        const wave = this._getLaneWaveData(cL, p, state.gameSeconds || 0, state);
        const blueSup = wave.blueSuper > 0 ? "👾" : "";
        const redSup = wave.redSuper > 0 ? "👾" : "";
        countEl.textContent = `${blueSup}${wave.blueTotal} ⚔️ ${wave.redTotal}${redSup}`;
      }
    });

    // Renderiza os Buffs Ativos / Efeitos Táticos de cada equipe no HUD
    const blueBuffsEl = this.containerEl.querySelector("#blue-active-buffs");
    const redBuffsEl = this.containerEl.querySelector("#red-active-buffs");

    const renderBuffPills = (buffs, side) => {
      if (!buffs || buffs.length === 0) return "";
      return buffs.map(b => {
        let remainingText = "";
        if (b.expiresAt && state.gameSeconds) {
          const rem = Math.max(0, b.expiresAt - state.gameSeconds);
          remainingText = ` (${rem}s)`;
        }
        let desc = [];
        if (b.bonusCombat) desc.push(`+${b.bonusCombat} Dano`);
        if (b.bonusSiege) desc.push(`+${Math.round(b.bonusSiege * 100)}% Torres`);
        if (b.bonusDefense) desc.push(`-${b.bonusDefense}% Dano Sofh.`);
        const tooltip = desc.length > 0 ? desc.join(", ") : "Efeito Tático Ativo";

        return `<span class="active-buff-pill ${side}" title="${b.name}: ${tooltip}">${b.icon || '⚡'} ${b.name}${remainingText}</span>`;
      }).join("");
    };

    if (blueBuffsEl) {
      blueBuffsEl.innerHTML = renderBuffPills(state.blue.buffs || (state.activeBuffs && state.activeBuffs.blue), "blue");
    }
    if (redBuffsEl) {
      redBuffsEl.innerHTML = renderBuffPills(state.red.buffs || (state.activeBuffs && state.activeBuffs.red), "red");
    }

    // Atualiza status e itens dos campeões
    this._updateRosterUI(state.blue.roster, "blue", state);
    this._updateRosterUI(state.red.roster, "red", state);
  }

  _updateRosterUI(rosterState, side, fullState = null) {
    const roles = ["top", "jungle", "mid", "adc", "support"];
    const laneMatchups = (fullState && fullState.laneMatchups) || (this.matchSim && this.matchSim.laneMatchups) || {};
    const campedLane = (fullState && fullState.redJungleCampLane) || (this.matchSim && this.matchSim.redJungleCampLane) || null;
    const blueCampedLane = (fullState && fullState.blueJungleCampLane) || (this.matchSim && this.matchSim.blueJungleCampLane) || null;
    const topAdv = (fullState && fullState.topPushAdvantage) || (this.matchSim && this.matchSim._calculateTopPushAdvantage && this.matchSim._calculateTopPushAdvantage()) || null;
    const gameSecs = (fullState && fullState.gameSeconds) || (this.matchSim && this.matchSim.gameSeconds) || 0;

    roles.forEach(role => {
      const m = rosterState[role];
      if (!m) return;
      const row = this.containerEl.querySelector(`#champ-row-${side}-${role}`);
      if (row) {
        if (!m.alive) row.classList.add("dead");
        else row.classList.remove("dead");

        // Atualiza destaque de MVP / Carregador
        const mvpSlot = row.querySelector(`#mvp-slot-${side}-${role}`);
        if (mvpSlot) {
          const mvpHtml = m.isMvp ? '<span class="champ-mvp-badge" title="👑 MVP da Equipe! Lute ao redor deste carregador!">👑 MVP</span>' : '';
          if (mvpSlot.innerHTML !== mvpHtml) {
            mvpSlot.innerHTML = mvpHtml;
          }
        }

        // Atualiza matchup tags e alerta de foco do caçador rival e aliado
        const slot = row.querySelector(`#matchup-slot-${side}-${role}`);
        if (slot) {
          const laneKey = (role === "adc" || role === "support") ? "bot" : role;
          const matchup = laneMatchups[laneKey];
          const isCamped = (campedLane === laneKey);
          const isBlueCamped = (blueCampedLane === laneKey);

          let badgesHtml = "";
          if (side === "blue") {
            if (matchup) {
              if (matchup.advantageSide === "blue") {
                badgesHtml += `<span class="matchup-tag adv" title="${matchup.desc}">⚔️ Vantagem</span>`;
              } else if (matchup.advantageSide === "red") {
                badgesHtml += `<span class="matchup-tag disadv" title="${matchup.desc}">⚠️ Desvantagem</span>`;
              } else {
                badgesHtml += `<span class="matchup-tag neutral" title="${matchup.desc}">⚖️ Parelho</span>`;
              }
            }
            if (isCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="camp-target-tag" title="Alvo preferencial do Caçador Rival! Cuidado redobrado ao forçar pressão!">🎯 Marcado</span>`;
            }
            if (isBlueCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="blue-camp-helper-tag" title="Foco Prioritário do Seu Caçador! Recebe ganks contínuos, cobertura e aceleração de ouro!">🌲 Foco JG</span>`;
            }
            if (role === "top" && topAdv && gameSecs >= 900) {
              if (topAdv.leader === "blue") {
                badgesHtml += `<span class="push-prio-tag blue" title="${topAdv.desc}">🌊 Push (+${topAdv.score})</span>`;
              } else if (topAdv.leader === "red") {
                badgesHtml += `<span class="push-prio-tag red" title="${topAdv.desc}">⚠️ Sob Pressão (${topAdv.score})</span>`;
              } else {
                badgesHtml += `<span class="push-prio-tag neutral" title="${topAdv.desc}">⚖️ Push Equilibrado</span>`;
              }
            }
          } else if (side === "red") {
            if (isCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="camp-helper-tag" title="Rota prioritária de gank e emboscada">🌲 Foco Gank</span>`;
            }
            if (isBlueCamped && (role === "top" || role === "mid" || role === "adc")) {
              badgesHtml += `<span class="blue-camp-threat-tag" title="Rota pressionada pelo Caçador Aliado!">⚠️ Alvo JG Azul</span>`;
            }
            if (role === "top" && topAdv && gameSecs >= 900) {
              if (topAdv.leader === "red") {
                badgesHtml += `<span class="push-prio-tag red" title="${topAdv.desc}">🌊 Push (+${Math.abs(topAdv.score)})</span>`;
              } else if (topAdv.leader === "blue") {
                badgesHtml += `<span class="push-prio-tag blue" title="${topAdv.desc}">⚠️ Preso sob Torre</span>`;
              }
            }
          }
          if (slot.innerHTML !== badgesHtml) {
            slot.innerHTML = badgesHtml;
          }
        }

        // Atualiza bandeja de itens (apenas quando houver alteração para evitar DOM thrashing)
        const tray = row.querySelector(".champ-items-tray");
        if (tray && m.items) {
          const itemKey = m.items.map(it => it ? it.id : '0').join(',');
          if (tray._renderedKey !== itemKey) {
            tray._renderedKey = itemKey;
            const slots = [0, 1, 2, 3, 4, 5];
            tray.innerHTML = slots.map(idx => {
              const itm = m.items[idx];
              if (itm) {
                const recipeInfo = (itm.from && itm.from.length > 0)
                  ? ` • Receita: ${itm.from.map(cId => { const c = getItemById(cId); return c ? c.name : cId; }).join(' + ')}`
                  : '';
                const tierBadge = itm.tier ? `[${itm.tier}] ` : '';
                return `<div class="item-slot-icon filled ${itm.tier ? itm.tier.toLowerCase() : ''}" data-item-id="${itm.id}" title="${tierBadge}${itm.name} (${(itm.cost || 0).toLocaleString()}g)\n${itm.description || ''}${recipeInfo} (Clique para ver receita na Loja)"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
              }
              return `<div class="item-slot-icon empty" title="Espaço de item (Slot ${idx + 1}/6)"></div>`;
            }).join('');
          }
        }
      }
      const kdaEl = this.containerEl.querySelector(`#kda-${side}-${role}`);
      if (kdaEl) {
        kdaEl.textContent = `${m.kills} / ${m.deaths} / ${m.assists}`;
      }
      const farmEl = this.containerEl.querySelector(`#farm-${side}-${role}`);
      if (farmEl) {
        const cs = m.cs || 0;
        const rate = m.csPerMin !== undefined ? m.csPerMin.toFixed(1) : ((cs / Math.max(1, (this.matchSim?.gameSeconds || 60) / 60)).toFixed(1));
        const approxGold = Math.round(cs * 21);
        const killEq = (cs / 15).toFixed(1);
        farmEl.innerHTML = `<span class="cs-icon">🌾</span><span class="cs-count">${cs}</span> <span class="cs-rate">(${rate})</span>`;
        farmEl.title = `Farm: ${cs} tropas (${rate} CS/min) • ~${approxGold.toLocaleString()}g em tropas (~${killEq} abates em ouro seguro!)`;
      }

      // Atualiza Ouro Individual e Vantagem de Rota contra Rival Direto
      const goldEl = this.containerEl.querySelector(`#gold-${side}-${role}`);
      const diffEl = this.containerEl.querySelector(`#gold-diff-${side}-${role}`);
      const current = m.goldCurrent || 0;
      const earned = m.goldEarned || 500;
      const nextItemInfo = m.nextItem ? `\nPróximo: ${m.nextItem.name} (${(m.nextItem.cost || 3000).toLocaleString()}g) [${Math.min(100, Math.round((current / (m.nextItem.cost || 3000)) * 100))}%]` : '';

      if (goldEl) {
        const goldValEl = goldEl.querySelector('.gold-val');
        if (goldValEl) {
          goldValEl.textContent = this._formatGold(earned);
        }
        goldEl.title = `Carteira: ${current.toLocaleString()}g | Total Acumulado: ${earned.toLocaleString()}g${nextItemInfo}`;
      }

      if (diffEl) {
        const diff = m.laneGoldDiff || 0;
        if (diff >= 100) {
          diffEl.className = "gold-diff-pill lead";
          diffEl.textContent = `▲ +${diff >= 1000 ? (diff / 1000).toFixed(1) + 'k' : diff + 'g'}`;
          diffEl.title = `Vantagem de rota: +${diff.toLocaleString()}g sobre o rival direto`;
        } else if (diff <= -100) {
          const absDiff = Math.abs(diff);
          diffEl.className = "gold-diff-pill deficit";
          diffEl.textContent = `▼ -${absDiff >= 1000 ? (absDiff / 1000).toFixed(1) + 'k' : absDiff + 'g'}`;
          diffEl.title = `Desvantagem de rota: -${absDiff.toLocaleString()}g em relação ao rival direto`;
        } else {
          diffEl.className = "gold-diff-pill even";
          diffEl.textContent = `±0g`;
          diffEl.title = `Rota equilibrada em ouro`;
        }
      }
    });
  }

  handleMultikill(data) {
    const banner = this.containerEl.querySelector("#multikill-banner");
    if (!banner) return;

    if (data.type === "double") sound.playDoubleKill();
    else if (data.type === "triple") sound.playTripleKill();
    else if (data.type === "quadra") sound.playQuadraKill();
    else if (data.type === "penta") sound.playPentakill();

    const tag = banner.querySelector("#announcer-tag");
    const killer = banner.querySelector("#announcer-killer");
    if (tag) tag.textContent = data.title;
    if (killer) killer.textContent = data.subtitle;

    banner.className = `multikill-announcer-banner active ${data.killerSide}-side type-${data.type}`;

    if (this._multikillTimer) clearTimeout(this._multikillTimer);
    this._multikillTimer = setTimeout(() => {
      banner.classList.remove("active");
    }, 3000);
  }

  handleAce(data) {
    const banner = this.containerEl.querySelector("#multikill-banner");
    if (!banner) return;

    sound.playAce();

    const tag = banner.querySelector("#announcer-tag");
    const killer = banner.querySelector("#announcer-killer");
    const isBlue = data.aceSide === "blue";
    if (tag) tag.textContent = "EXTERMÍNIO! (ACE)";
    if (killer) killer.textContent = isBlue
      ? `🔵 SUA EQUIPE ELIMINOU TODOS OS 5 ADVERSÁRIOS!`
      : `🔴 O TIME ADVERSÁRIO EXTERMINOU SUA EQUIPE!`;

    banner.className = `multikill-announcer-banner active ${data.aceSide}-side type-ace`;

    if (this._multikillTimer) clearTimeout(this._multikillTimer);
    this._multikillTimer = setTimeout(() => {
      banner.classList.remove("active");
    }, 3500);
  }

  handleItemPurchased(data) {
    sound.playItemCompleted();
  }

  handleStructureHit(teamSide, structureId, currentHp, maxHp) {
    const el = this.containerEl.querySelector(`#struct-${teamSide}-${structureId}`);
    if (!el) return;

    sound.playTowerHit();

    el.classList.add("taking-damage");
    setTimeout(() => el.classList.remove("taking-damage"), 250);

    const pct = Math.max(0, Math.round((currentHp / maxHp) * 100));
    const fill = el.querySelector(".structure-hp-fill");
    if (fill) {
      fill.style.width = `${pct}%`;
      fill.className = `structure-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}`;
    }

    const text = el.querySelector(".structure-hp-text");
    if (text) {
      text.textContent = `${currentHp}`;
    }
  }

  handleStructureDestroyed(teamSide, structureId) {
    const el = this.containerEl.querySelector(`#struct-${teamSide}-${structureId}`);
    if (el) {
      el.classList.add("destroyed");
      const text = el.querySelector(".structure-hp-text");
      if (text) text.textContent = "DESTRUÍDO";

      const plateBadge = el.querySelector(".structure-plates-badge");
      if (plateBadge) plateBadge.remove();
    }

    if (structureId === "nexus") {
      sound.playNexusExplosion();
    } else if (structureId === "inhib") {
      sound.playInhibitorDestroyed();
    } else {
      sound.playTowerDestroyed();
    }
  }

  _renderEventCard(evt) {
    const side = evt.side || "blue";

    // 1. KILLS & SHUTDOWNS (Card Visual Estilo Transmissão do CBLOL)
    if (evt.type === "kill" || evt.type === "shutdown") {
      const killerSide = evt.side || "blue";
      const victimSide = killerSide === "blue" ? "red" : "blue";
      const roleMap = { top: "TOP", jungle: "JG", mid: "MID", adc: "ADC", support: "SUP" };
      const kRole = roleMap[evt.killerRole] || (evt.killerRole ? String(evt.killerRole).toUpperCase() : "");
      const vRole = roleMap[evt.victimRole] || (evt.victimRole ? String(evt.victimRole).toUpperCase() : "");

      const isShutdown = evt.type === "shutdown" || (evt.bountyGold && evt.bountyGold > 0);
      const totalGold = 300 + (evt.bountyGold || 0);
      const bountyTag = isShutdown
        ? `<span class="kfeed-bounty shutdown">+${totalGold}g SHUTDOWN</span>`
        : `<span class="kfeed-bounty normal">+300g</span>`;

      const killerPhoto = evt.killerAvatar
        ? `<span class="kfeed-photo-avatar killer-photo" title="${evt.killerNick || ''}"><img src="${evt.killerAvatar}" alt="${evt.killerNick || ''}" onerror="this.parentElement.style.display='none'" /></span>`
        : '';
      const victimPhoto = evt.victimAvatar
        ? `<span class="kfeed-photo-avatar victim-photo" title="${evt.victimNick || ''}"><img src="${evt.victimAvatar}" alt="${evt.victimNick || ''}" onerror="this.parentElement.style.display='none'" /></span>`
        : '';

      const killerDisplay = evt.killerNick && evt.killerNick !== evt.killerName
        ? `<strong class="kfeed-champ-name">${evt.isSignature ? '⭐ ' : ''}${evt.killerNick}</strong> <span style="font-size: 11px; opacity: 0.85; font-weight: 600;">(${evt.killerName})</span>`
        : `<strong class="kfeed-champ-name">${evt.isSignature ? '⭐ ' : ''}${evt.killerName || 'Aliado'}</strong>`;

      const victimDisplay = evt.victimNick && evt.victimNick !== evt.victimName
        ? `<strong class="kfeed-champ-name">${evt.victimNick}</strong> <span style="font-size: 11px; opacity: 0.85; font-weight: 600;">(${evt.victimName})</span>`
        : `<strong class="kfeed-champ-name">${evt.victimName || 'Inimigo'}</strong>`;

      return `
        <div class="kfeed-card kfeed-kill ${killerSide}-kill ${isShutdown ? 'is-shutdown' : ''}">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-actors">
            <span class="kfeed-player ${killerSide}">
              ${killerPhoto}
              ${kRole ? `<span class="kfeed-role-tag">${kRole}</span>` : ''}
              ${killerDisplay}
            </span>
            <span class="kfeed-vs-icon" title="${evt.skillName || 'Abate'}">⚔️</span>
            <span class="kfeed-player ${victimSide}">
              ${victimPhoto}
              ${vRole ? `<span class="kfeed-role-tag">${vRole}</span>` : ''}
              ${victimDisplay}
            </span>
          </div>
          ${bountyTag}
        </div>
      `;
    }

    // 2. MULTIKILLS & ACES
    if (evt.type === "multikill" || evt.type === "ace") {
      const icon = evt.type === "ace" ? "💀" : "⚡";
      return `
        <div class="kfeed-card kfeed-highlight ${side}-side ${evt.type}">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-highlight-content">
            <span class="kfeed-icon">${icon}</span>
            <strong class="kfeed-msg">${evt.text}</strong>
          </div>
        </div>
      `;
    }

    // 3. OBJETIVOS NEUTROS (Dragão, Barão, Arauto)
    if (["dragon", "baron", "herald", "elder"].includes(evt.type)) {
      const icon = evt.type === "baron" ? "👑" : (evt.type === "dragon" || evt.type === "elder" ? "🐲" : "👾");
      return `
        <div class="kfeed-card kfeed-objective ${side}-side ${evt.type}">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-highlight-content">
            <span class="kfeed-icon">${icon}</span>
            <strong class="kfeed-msg">${evt.text}</strong>
          </div>
        </div>
      `;
    }

    // 4. ESTRUTURAS (Torres, Barricadas, Inibidores, Nexus)
    if (["tower_destroyed", "plate", "inhibitor_destroyed", "nexus_destroyed", "objective_bounty"].includes(evt.type)) {
      const icon = evt.type === "plate" ? "🛡️" : (evt.type === "inhibitor_destroyed" ? "💥" : (evt.type === "nexus_destroyed" ? "🚨" : "🏰"));
      return `
        <div class="kfeed-card kfeed-structure ${side}-side">
          <span class="kfeed-time">${evt.time || ''}</span>
          <div class="kfeed-highlight-content">
            <span class="kfeed-icon">${icon}</span>
            <span class="kfeed-msg">${evt.text}</span>
          </div>
        </div>
      `;
    }

    // 5. EVENTOS TÁTICOS, ITENS E CONTRA-ATAQUES
    return `
      <div class="kfeed-card kfeed-general ${side}-side ${evt.type || ''}">
        <span class="kfeed-time">${evt.time || ''}</span>
        <span class="kfeed-msg">${evt.text}</span>
      </div>
    `;
  }

  handleEvent(evt) {
    if (evt.type === "skirmish") return; // Filtra ruído sem impacto tático
    const feed = this.containerEl.querySelector("#killfeed-container");
    if (!feed) return;

    // Deduplicação defensiva: impede que o mesmo abate apareça 2x no feed no mesmo segundo
    if (evt.type === "kill" || evt.type === "shutdown") {
      const killSig = `${evt.time || ''}_${evt.victimName || ''}`;
      if (this._recentVictimDeaths && this._recentVictimDeaths.has(killSig)) {
        return; // Morte já registrada e exibida neste minuto/segundo
      }
      if (!this._recentVictimDeaths) this._recentVictimDeaths = new Set();
      this._recentVictimDeaths.add(killSig);
      if (this._recentVictimDeaths.size > 50) {
        const first = this._recentVictimDeaths.values().next().value;
        this._recentVictimDeaths.delete(first);
      }
    }

    const entry = document.createElement("div");
    entry.className = "killfeed-entry-wrapper";
    entry.innerHTML = this._renderEventCard(evt);

    feed.prepend(entry);
    feed.scrollTop = 0;
    while (feed.children.length > 35) {
      feed.removeChild(feed.lastChild);
    }

    // Atualiza o contador ao vivo de eventos do confronto
    if (!this._eventCount) this._eventCount = 0;
    this._eventCount++;
    const countEl = this.containerEl.querySelector("#broadcast-feed-count");
    if (countEl) {
      countEl.textContent = `${this._eventCount} eventos`;
    }
  }

  _formatTeamLogo(logo, fallback = "🛡️") {
    if (!logo) return `<span class="team-icon-emoji">${fallback}</span>`;
    const strLogo = String(logo).trim();
    if (strLogo.startsWith("http://") || strLogo.startsWith("https://") || strLogo.startsWith("/") || strLogo.startsWith("./") || strLogo.includes(".png") || strLogo.includes(".jpg") || strLogo.includes(".svg")) {
      return `<img class="team-summary-logo-img" src="${strLogo}" alt="Logo" onerror="this.outerHTML='<span class=\\'team-icon-emoji\\'>${fallback}</span>'" />`;
    }
    return `<span class="team-icon-emoji">${strLogo}</span>`;
  }

  handleFinish(result, summary) {
    const dModal = this.containerEl.querySelector("#tactical-decision-modal");
    if (dModal) dModal.classList.remove("active");
    this._isResolvingDecision = false;

    const overlay = this.containerEl.querySelector("#nexus-end-overlay");
    if (!overlay) return;

    const title = this.containerEl.querySelector("#end-banner-title");
    const desc = this.containerEl.querySelector("#end-banner-desc");
    const icon = this.containerEl.querySelector("#end-trophy-icon");
    const seriesPill = this.containerEl.querySelector("#end-series-pill");
    const continueBtn = this.containerEl.querySelector("#end-continue-btn");
    const headerContinueBtn = this.containerEl.querySelector("#end-header-continue-btn");

    const updateButtons = (fullText, shortText) => {
      if (continueBtn) continueBtn.textContent = fullText;
      if (headerContinueBtn) headerContinueBtn.textContent = shortText || fullText;
    };

    const sRes = summary.seriesResult;

    if (sRes && seriesPill) {
      seriesPill.style.display = "flex";
      seriesPill.innerHTML = `
        <span class="series-phase">${sRes.roundName} • ${sRes.format}</span>
        <span class="series-score">Placar da Série: <strong>${sRes.playerWins}</strong> x <strong>${sRes.enemyWins}</strong></span>
        <span class="series-target">${sRes.seriesOver ? (sRes.seriesWon ? '🎉 Série Vencida!' : '💀 Série Perdida!') : `(Primeiro a alcançar ${sRes.winsNeeded} vitórias avança)`}</span>
      `;
    } else if (seriesPill) {
      seriesPill.style.display = "none";
    }

    if (result === "win") {
      if (icon) icon.textContent = "🏆";

      if (sRes && sRes.seriesOver) {
        if (sRes.playerWonTournament) {
          sound.playChampionFanfare();
          if (typeof confetti !== "undefined") confetti.startChampionConfetti(9000);
          if (title) {
            title.textContent = "CAMPEÃO DO CBLOL!";
            title.className = "ceremony-title gold";
          }
          if (desc) desc.textContent = `Vitória definitiva por ${sRes.playerWins} x ${sRes.enemyWins} na Grande Final aos ${summary.duration}! O troféu é do seu time!`;
          updateButtons("🏆 Ver Cerimônia de Campeão e MVP ➔", "🏆 Cerimônia & MVP ➔");
        } else {
          sound.playSeriesWon();
          if (typeof confetti !== "undefined") confetti.startChampionConfetti(4500);
          if (title) {
            title.textContent = "SÉRIE CONQUISTADA!";
            title.className = "ceremony-title gold";
          }
          if (desc) desc.textContent = `Vitória na série por ${sRes.playerWins} x ${sRes.enemyWins} aos ${summary.duration}! Sua equipe avança na chave dos Playoffs!`;
          updateButtons("Avançar para a Próxima Fase ➔", "Avançar ➔");
        }
      } else if (sRes && !sRes.seriesOver) {
        sound.playVictory();
        if (title) {
          title.textContent = "VITÓRIA NO JOGO!";
          title.className = "ceremony-title gold";
        }
        if (desc) desc.textContent = `Você venceu esta partida aos ${summary.duration}! Placar da série: ${sRes.playerWins} x ${sRes.enemyWins} (${sRes.format}).`;
        updateButtons(`⚔️ Jogar Jogo ${sRes.nextGameNumber} da Série (${sRes.playerWins} - ${sRes.enemyWins}) ➔`, `⚔️ Jogo ${sRes.nextGameNumber} ➔`);
      } else {
        sound.playVictory();
        if (title) {
          title.textContent = "VITÓRIA GLORIOSA!";
          title.className = "ceremony-title gold";
        }
        if (desc) desc.textContent = `A sua equipe destruiu as defesas inimigas e implodiu o Nexus adversário aos ${summary.duration}!`;
        updateButtons("Avançar para a Próxima Fase ➔", "Avançar ➔");
      }
    } else {
      sound.playDefeat();
      if (icon) icon.textContent = "💀";

      if (sRes && sRes.seriesOver) {
        if (title) {
          title.textContent = "ELIMINADO DO CBLOL";
          title.className = "ceremony-title red";
        }
        if (desc) desc.textContent = `Sua equipe foi superada na série por ${sRes.playerWins} x ${sRes.enemyWins} (${sRes.format}) aos ${summary.duration}. Fim da run.`;
        updateButtons("💀 Ver Resultado Final ➔", "💀 Resultado ➔");
      } else if (sRes && !sRes.seriesOver) {
        if (title) {
          title.textContent = "DERROTA NO JOGO!";
          title.className = "ceremony-title red";
        }
        if (desc) desc.textContent = `Seu Nexus caiu aos ${summary.duration}, mas a série segue aberta em ${sRes.playerWins} x ${sRes.enemyWins} (${sRes.format}). Reorganize sua equipe!`;
        updateButtons(`⚔️ Jogar Jogo ${sRes.nextGameNumber} da Série (${sRes.playerWins} - ${sRes.enemyWins}) ➔`, `⚔️ Jogo ${sRes.nextGameNumber} ➔`);
      } else {
        if (title) {
          title.textContent = "DERROTA NO RIFT";
          title.className = "ceremony-title red";
        }
        if (desc) desc.textContent = `Seu Nexus não resistiu à investida aos ${summary.duration}.`;
        updateButtons("Continuar ➔", "Continuar ➔");
      }
    }

    // 1. Renderiza o Placar Comparativo de Objetivos Globais
    this._renderGlobalScoreboard(summary);

    // 2. Renderiza a Aba de Estatísticas Inicial (overview)
    this._currentStatsTab = "overview";
    this._renderStatsTab(summary, this._currentStatsTab);

    // 3. Configura cliques nas abas
    const tabBtns = overlay.querySelectorAll(".stats-tab-btn");
    tabBtns.forEach(btn => {
      btn.onclick = () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this._currentStatsTab = btn.getAttribute("data-tab");
        this._renderStatsTab(summary, this._currentStatsTab);
      };
    });

    overlay.classList.add("active");

    const doFinish = () => {
      if (typeof confetti !== "undefined") confetti.stop();
      overlay.classList.remove("active");
      this.onMatchFinished(result, summary);
    };

    if (continueBtn) {
      continueBtn.onclick = doFinish;
    }
    if (headerContinueBtn) {
      headerContinueBtn.onclick = doFinish;
    }
  }

  _renderGlobalScoreboard(summary) {
    const container = this.containerEl.querySelector("#stats-global-scoreboard");
    if (!container) return;

    const blue = summary.blue || {};
    const red = summary.red || {};

    const blueGoldK = ((blue.gold || 0) / 1000).toFixed(1) + "k";
    const redGoldK = ((red.gold || 0) / 1000).toFixed(1) + "k";

    const blueLogo = blue.team ? (blue.team.iconUrl || blue.team.logo) : null;
    const redLogo = red.team ? (red.team.iconUrl || red.team.logo) : null;

    container.innerHTML = `
      <div class="team-summary-pill blue-side">
        <div class="team-identity">
          <span class="team-icon">${this._formatTeamLogo(blueLogo, "🛡️")}</span>
          <span class="team-name">${blue.team ? blue.team.name : "Seu Time"}</span>
        </div>
        <div class="team-core-stats">
          <div class="core-stat-item">
            <span class="stat-label">Abates</span>
            <span class="stat-val kills-val">${blue.kills || 0}</span>
          </div>
          <div class="core-stat-item">
            <span class="stat-label">Ouro Total</span>
            <span class="stat-val gold-val">💰 ${blueGoldK}</span>
          </div>
        </div>
      </div>

      <div class="global-objectives-center">
        <div class="objectives-row">
          <div class="obj-stat-box" title="Torres Destruídas">
            <span class="obj-icon">🏰</span>
            <div class="obj-counts"><strong class="blue-val">${blue.towers || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.towers || 0}</strong></div>
            <span class="obj-name">Torres</span>
          </div>
          <div class="obj-stat-box" title="Inibidores Destruídos">
            <span class="obj-icon">🛡️</span>
            <div class="obj-counts"><strong class="blue-val">${blue.inhibitors || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.inhibitors || 0}</strong></div>
            <span class="obj-name">Inibidores</span>
          </div>
          <div class="obj-stat-box" title="Dragões Elementais">
            <span class="obj-icon">🐲</span>
            <div class="obj-counts"><strong class="blue-val">${blue.dragons || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.dragons || 0}</strong></div>
            <span class="obj-name">Dragões</span>
          </div>
          <div class="obj-stat-box" title="Arautos do Vale">
            <span class="obj-icon">👁️</span>
            <div class="obj-counts"><strong class="blue-val">${blue.heralds || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.heralds || 0}</strong></div>
            <span class="obj-name">Arauto</span>
          </div>
          <div class="obj-stat-box" title="Barões Na'Shor">
            <span class="obj-icon">👾</span>
            <div class="obj-counts"><strong class="blue-val">${blue.barons || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.barons || 0}</strong></div>
            <span class="obj-name">Barão</span>
          </div>
          <div class="obj-stat-box" title="Dragões Anciões">
            <span class="obj-icon">🔥</span>
            <div class="obj-counts"><strong class="blue-val">${blue.elders || 0}</strong> <span class="vs-sep">x</span> <strong class="red-val">${red.elders || 0}</strong></div>
            <span class="obj-name">Ancião</span>
          </div>
        </div>
      </div>

      <div class="team-summary-pill red-side">
        <div class="team-core-stats">
          <div class="core-stat-item">
            <span class="stat-label">Abates</span>
            <span class="stat-val kills-val">${red.kills || 0}</span>
          </div>
          <div class="core-stat-item">
            <span class="stat-label">Ouro Total</span>
            <span class="stat-val gold-val">💰 ${redGoldK}</span>
          </div>
        </div>
        <div class="team-identity">
          <span class="team-name">${red.team ? red.team.name : "CBLOL"}</span>
          <span class="team-icon">${this._formatTeamLogo(redLogo, "⚡")}</span>
        </div>
      </div>
    `;
  }

  _renderStatsTab(summary, tabKey) {
    const body = this.containerEl.querySelector("#stats-tab-body");
    if (!body) return;

    const roles = ["top", "jungle", "mid", "adc", "support"];
    const roleLabels = { top: "TOP", jungle: "JUG", mid: "MID", adc: "ADC", support: "SUP" };

    const renderTeamChamps = (rosterObj, side) => {
      const roster = rosterObj || {};
      return roles.map(role => {
        const c = roster[role] || { id: "Aatrox", name: role, kills: 0, deaths: 0, assists: 0, damageDealt: 0, damageTaken: 0, goldEarned: 500, cs: 0, items: [] };
        const champInfo = getChampionById(c.id);
        const champKey = champInfo ? champInfo.id : (c.id === "Wukong" ? "MonkeyKing" : c.id);
        const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champKey}.png`;

        if (tabKey === "overview") {
          const goldStr = ((c.goldEarned || 500) / 1000).toFixed(1) + "k";
          const itemsHtml = [0, 1, 2, 3].map(idx => {
            const itm = (c.items || [])[idx];
            if (itm) {
              return `<div class="stats-item-slot filled" title="${itm.name}"><img src="${getItemIconUrl(itm.id)}" alt="${itm.name}" /></div>`;
            }
            return `<div class="stats-item-slot empty"></div>`;
          }).join('');

          return `
            <div class="stats-champ-card ${side}-card">
              <div class="stats-champ-left">
                <div class="stats-avatar-wrap">
                  <img src="${avatarUrl}" alt="${c.name}" class="stats-champ-avatar" />
                  <span class="stats-role-badge">${roleLabels[role]}</span>
                </div>
                <div class="stats-champ-info">
                  <span class="stats-champ-name">${c.name}</span>
                  <span class="stats-champ-kda">${c.kills} / <span class="death-num">${c.deaths}</span> / ${c.assists}</span>
                </div>
              </div>
              <div class="stats-champ-center">
                <span class="stats-pill cs-pill">🌾 ${c.cs || 0} CS (${c.csPerMin !== undefined ? c.csPerMin.toFixed(1) : ((c.cs || 0) / Math.max(1, (summary.gameSeconds || 1200) / 60)).toFixed(1)}/m)</span>
                <span class="stats-pill gold-pill">💰 ${goldStr}</span>
              </div>
              <div class="stats-champ-items">
                ${itemsHtml}
              </div>
            </div>
          `;
        }

        // Gráficos de Barra: Dano, Ouro, ou Dano Sofrido
        let val = 0;
        let max = 1;
        let isMvp = false;
        let labelUnit = "";
        let barClass = "";

        if (tabKey === "damage") {
          val = c.damageDealt || 0;
          max = summary.maxDamage || 1;
          isMvp = c.id === summary.topDamageChampId;
          labelUnit = "Dano";
          barClass = side === "blue" ? "dmg-bar-blue" : "dmg-bar-red";
        } else if (tabKey === "gold") {
          val = c.goldEarned || 500;
          max = summary.maxGold || 1;
          isMvp = c.id === summary.topGoldChampId;
          labelUnit = "Ouro";
          barClass = "gold-bar";
        } else if (tabKey === "taken") {
          val = c.damageTaken || 0;
          max = summary.maxTaken || 1;
          isMvp = c.id === summary.topTakenChampId;
          labelUnit = "Mitigado";
          barClass = "taken-bar";
        }

        const pct = Math.max(8, Math.min(100, Math.round((val / max) * 100)));

        return `
          <div class="stats-champ-card ${side}-card chart-mode">
            <div class="stats-champ-left">
              <div class="stats-avatar-wrap">
                <img src="${avatarUrl}" alt="${c.name}" class="stats-champ-avatar" />
                <span class="stats-role-badge">${roleLabels[role]}</span>
              </div>
              <div class="stats-champ-info">
                <span class="stats-champ-name">${c.name}</span>
                <span class="stats-champ-kda small">${c.kills}/${c.deaths}/${c.assists}</span>
              </div>
            </div>
            <div class="stats-bar-container">
              <div class="stats-bar-header">
                <span class="stats-bar-val">
                  ${isMvp ? `<span class="mvp-crown-tag" title="Maior da Partida!">👑</span> ` : ''}
                  ${val.toLocaleString('pt-BR')} ${labelUnit}
                </span>
                <span class="stats-bar-pct">${pct}%</span>
              </div>
              <div class="stats-bar-track">
                <div class="stats-bar-fill ${barClass} ${isMvp ? 'is-mvp' : ''}" style="width: ${pct}%"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    };

    body.innerHTML = `
      <div class="stats-teams-columns">
        <div class="stats-team-column blue-column">
          <div class="column-header blue-header">
            <span class="team-flag">🔷</span> ${summary.blue && summary.blue.team ? summary.blue.team.name : "Seu Time"}
          </div>
          <div class="column-cards">
            ${renderTeamChamps(summary.blue ? summary.blue.roster : {}, "blue")}
          </div>
        </div>

        <div class="stats-team-column red-column">
          <div class="column-header red-header">
            <span class="team-flag">🔶</span> ${summary.red && summary.red.team ? summary.red.team.name : "CBLOL Adversário"}
          </div>
          <div class="column-cards">
            ${renderTeamChamps(summary.red ? summary.red.roster : {}, "red")}
          </div>
        </div>
      </div>
    `;
  }

  handleTacticalDecision(decisionData) {
    if (sound.playObjectiveAlert) {
      sound.playObjectiveAlert();
    } else {
      sound.playPick();
    }

    const modal = this.containerEl.querySelector("#tactical-decision-modal");
    if (!modal) return;

    const badge = modal.querySelector("#decision-modal-badge");
    const title = modal.querySelector("#decision-modal-title");
    const subtitle = modal.querySelector("#decision-modal-subtitle");
    const container = modal.querySelector("#decision-options-container");
    const feedback = modal.querySelector("#decision-feedback-banner");

    if (badge) badge.textContent = decisionData.badge || "DECISÃO TÁTICA DO RIFT";
    if (title) title.textContent = decisionData.title;
    if (subtitle) subtitle.textContent = decisionData.subtitle;
    if (feedback) {
      feedback.classList.remove("active");
      feedback.style.display = "none";
    }

    // Atualiza imediatamente o placar do HUD superior para garantir sincronia exata
    const liveState = this.sim ? this.sim.getState() : null;
    if (liveState) {
      this.updateTick(liveState);
    }

    // Exibe a barra de parâmetros e situação da partida dentro da modal
    const statusBar = modal.querySelector("#decision-match-status-bar");
    if (statusBar && liveState) {
      const blueGold = liveState.blue.score.gold || 0;
      const redGold = liveState.red.score.gold || 0;
      const blueGoldK = (blueGold / 1000).toFixed(1) + "k";
      const redGoldK = (redGold / 1000).toFixed(1) + "k";
      const goldDiff = blueGold - redGold;
      const absDiffK = (Math.abs(goldDiff) / 1000).toFixed(1) + "k";

      let diffBadge = "";
      let advice = "";

      if (goldDiff >= 1200) {
        diffBadge = `<span class="decision-diff-badge lead-blue">▲ +${absDiffK} Ouro (Vantagem Azul)</span>`;
        advice = `💡 <strong>Vantagem do Seu Time:</strong> Sua equipe possui mais ouro e itens acumulados. Jogadas táticas ou ousadas têm probabilidade favorável!`;
      } else if (goldDiff <= -1200) {
        diffBadge = `<span class="decision-diff-badge lead-red">▼ -${absDiffK} Ouro (Atrás no Ouro)</span>`;
        advice = `⚠️ <strong>Atenção com o Ouro:</strong> O rival está à frente em itens. Opções seguras ou trocas no mapa garantem ouro sem correr risco de wipe.`;
      } else {
        diffBadge = `<span class="decision-diff-badge lead-even">⚖️ Jogo Pareado (±${absDiffK})</span>`;
        advice = `⚔️ <strong>Confronto Equilibrado:</strong> Ambos os times estão em igualdade de recursos. O acerto desta decisão pode definir a liderança.`;
      }

      let scoutingHtml = "";
      if (decisionData.scouting) {
        scoutingHtml = `
          <div class="scouting-telemetry-box">
            <div class="scouting-telemetry-header">
              <span class="scouting-radar-tag">${decisionData.scouting.intelTag || '📡 TELEMETRIA & RECONHECIMENTO DO RIFT'}</span>
              <span class="scouting-live-signal">● RECONHECIMENTO AO VIVO</span>
            </div>
            <div class="scouting-intel-grid">
              <div class="scouting-intel-item">
                <span class="scouting-label">Movimentação Observada:</span>
                <span class="scouting-value">${decisionData.scouting.enemyAction}</span>
              </div>
            </div>
          </div>
        `;
      }

      const targetLane = decisionData.meta?.targetLane;
      const campedLane = liveState.redJungleCampLane || (this.matchSim && this.matchSim.redJungleCampLane);
      const isTargetCamped = targetLane && (targetLane === campedLane);
      let campWarningBanner = "";
      if (isTargetCamped) {
        campWarningBanner = `
          <div class="decision-camp-warning-banner">
            ⚠️ <strong>ALERTA DE CAÇADOR ADVERSÁRIO:</strong> O Caçador rival está acampando nesta rota! Forçar jogadas agressivas ou ignorar controle de visão tem penalidade severa de sucesso e alto risco de contra-gank letal.
          </div>
        `;
      }

      statusBar.innerHTML = `
        <div class="decision-status-row">
          <div class="decision-team-stat blue-side">
            <div class="decision-team-name">${liveState.blue.name} (Você)</div>
            <div class="decision-team-numbers">
              <span class="stat-pill gold" title="Ouro total do seu time">💰 ${blueGoldK}</span>
              <span class="stat-pill kills" title="Abates do seu time">⚔️ ${liveState.blue.score.kills} Kills</span>
              <span class="stat-pill dragons" title="Dragões do seu time">🐲 ${liveState.blue.score.dragons}</span>
              <span class="stat-pill barons" title="Barões do seu time">👑 ${liveState.blue.score.barons}</span>
            </div>
          </div>

          <div class="decision-status-center">
            <div class="decision-status-clock">⏱️ ${liveState.time}</div>
            ${diffBadge}
          </div>

          <div class="decision-team-stat red-side">
            <div class="decision-team-name">${liveState.red.name}</div>
            <div class="decision-team-numbers">
              <span class="stat-pill gold" title="Ouro total do adversário">💰 ${redGoldK}</span>
              <span class="stat-pill kills" title="Abates do adversário">⚔️ ${liveState.red.score.kills} Kills</span>
              <span class="stat-pill dragons" title="Dragões do adversário">🐲 ${liveState.red.score.dragons}</span>
              <span class="stat-pill barons" title="Barões do adversário">👑 ${liveState.red.score.barons}</span>
            </div>
          </div>
        </div>
        ${campWarningBanner}
        ${scoutingHtml}
        <div class="decision-advice-pill">${advice}</div>
      `;
    }

    if (container) {
      container.innerHTML = decisionData.options.map(opt => `
        <div class="decision-choice-card complexity-${opt.complexity || 'tactical'}" data-choice-id="${opt.id}">
          <div class="choice-card-header">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="choice-card-icon">${opt.icon || '⚔️'}</span>
              ${opt.zoneLabel ? `<span class="zone-badge zone-${opt.zone || 'map'}">${opt.zoneLabel}</span>` : ''}
              <span class="complexity-badge ${opt.complexity || 'tactical'}">${opt.complexityLabel || opt.risk}</span>
            </div>
            <span class="probability-badge ${opt.probability >= 70 ? 'prob-high' : (opt.probability >= 45 ? 'prob-med' : 'prob-low')}">
              🎯 ${opt.probability}% Sucesso
            </span>
          </div>

          <div class="probability-bar-track">
            <div class="probability-bar-fill ${opt.probability >= 70 ? 'prob-high' : (opt.probability >= 45 ? 'prob-med' : 'prob-low')}" style="width: ${opt.probability}%"></div>
          </div>

          <h3 class="choice-card-title">${opt.name}</h3>
          <p class="choice-card-desc">${opt.desc}</p>

          <div class="choice-card-reward">
            <span class="reward-tag">Recompensa se Acertar:</span>
            <strong>${opt.reward}</strong>
          </div>

          ${opt.failureConsequence ? `
            <div class="choice-card-risk-warning">
              <span class="risk-consequence-tag">Perigo se Falhar:</span>
              <span>${opt.failureConsequence}</span>
            </div>
          ` : ''}

          <button class="lol-btn lol-btn-primary decision-card-btn" data-choice-id="${opt.id}">
            Executar Jogada (${opt.probability}%)
          </button>
        </div>
      `).join('');

      // Add click listeners to cards and buttons
      container.querySelectorAll(".decision-choice-card").forEach(card => {
        const choiceId = card.getAttribute("data-choice-id");
        card.onclick = () => {
          this._executeTacticalChoice(choiceId, card, modal);
        };
      });
    }

    const closeBtn = modal.querySelector("#decision-modal-close-btn");
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        modal.classList.remove("active");
        if (this.sim) {
          if (this.sim.activeDecision) {
            this.sim.resolveTacticalDecision(this.sim.activeDecision.options[0].id, true);
          } else {
            this.sim.resume();
          }
        }
        this._isResolvingDecision = false;
      };
    }

    modal.classList.add("active");
  }

  _executeTacticalChoice(choiceId, selectedCard, modal) {
    if (this._isResolvingDecision) return;
    this._isResolvingDecision = true;

    sound.playPick();

    // Visual selection
    modal.querySelectorAll(".decision-choice-card").forEach(c => {
      c.classList.add("disabled");
      c.onclick = null;
    });
    if (selectedCard) {
      selectedCard.classList.add("selected");
    }

    const feedback = modal.querySelector("#decision-feedback-banner");
    const feedbackText = modal.querySelector("#decision-feedback-text");
    const feedbackIcon = modal.querySelector("#decision-feedback-icon");
    if (feedback && feedbackText) {
      feedback.style.display = "flex";
      feedback.className = "decision-feedback-banner active resolving";
      if (feedbackIcon) feedbackIcon.textContent = "🎲";
      feedbackText.textContent = "Rolando dados e executando jogada no Rift...";
    }

    // Failsafe de proteção extrema: se por qualquer razão o navegador travar o timer, garante fechamento e despausa
    const failsafeTimer = setTimeout(() => {
      if (modal && modal.classList.contains("active")) {
        modal.classList.remove("active");
        if (this.sim && this.sim.isPaused) {
          this.sim.resume();
        }
        this._isResolvingDecision = false;
      }
    }, 4000);

    setTimeout(() => {
      let outcome = null;
      try {
        // Resolve a lógica de estado SEM despausar ainda para evitar que o próximo tick ocorra com a modal aberta
        outcome = this.sim.resolveTacticalDecision(choiceId, false);
      } catch (err) {
        console.error("Erro ao processar decisão tática:", err);
      }

      if (feedback && feedbackText && outcome) {
        if (outcome.success) {
          feedback.className = "decision-feedback-banner active success";
          if (feedbackIcon) feedbackIcon.textContent = "🏆";
          feedbackText.innerHTML = `<strong>SUCESSO! (${outcome.roll} vs ${outcome.probability}%)</strong> • ${outcome.title}`;
          sound.playItemCompleted();
        } else {
          feedback.className = "decision-feedback-banner active failure";
          if (feedbackIcon) feedbackIcon.textContent = "💀";
          feedbackText.innerHTML = `<strong>FALHOU! (${outcome.roll} vs ${outcome.probability}%)</strong> • ${outcome.title}`;
          sound.playDefeat();
        }
      }

      setTimeout(() => {
        clearTimeout(failsafeTimer);
        modal.classList.remove("active");

        // Adiciona log de destaque no killfeed
        if (outcome && outcome.text) {
          this.handleEvent({
            type: "tactic",
            side: outcome.success ? "blue" : "red",
            text: `${outcome.success ? '⚡' : '⚠️'} [${outcome.title}] ${outcome.text}`,
            time: (this.sim && this.sim.getState()) ? this.sim.getState().time : "20:00"
          });
        }

        // Despausa o simulador agora com a modal devidamente fechada
        if (this.sim) {
          this.sim.resume();
        }
        this._isResolvingDecision = false;
      }, 1000);
    }, 600);
  }

  _bindControls() {
    // Botões de Postura Tática da Equipe em Tempo Real
    this.containerEl.querySelectorAll(".tactic-btn[data-tactic]").forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        const tactic = btn.getAttribute("data-tactic");
        if (tactic && this.sim && !this.sim.isFinished) {
          this.sim.setTactics(tactic, true);
          this.containerEl.querySelectorAll(".tactic-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        }
      });
    });

    // Botões de Velocidade
    this.containerEl.querySelectorAll(".speed-btn[data-speed]").forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        const spd = parseInt(btn.getAttribute("data-speed"), 10);
        this.sim.setSpeed(spd);
        this.containerEl.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    // Botão Pular
    const skipBtn = this.containerEl.querySelector("#skip-match-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        sound.playClick();
        const dModal = this.containerEl.querySelector("#tactical-decision-modal");
        if (dModal) dModal.classList.remove("active");
        this._isResolvingDecision = false;
        this.sim.skipToEnd();
      });
    }

    this._bindMapInteractions();
  }

  _updateActiveStructureTooltip() {
    if (!this._hoveredStructNode) return;
    const tooltip = this.containerEl.querySelector("#rift-structure-tooltip");
    if (!tooltip || tooltip.style.display === "none") return;
    const node = this._hoveredStructNode;
    const side = node.dataset.side;
    const name = node.dataset.name || "Estrutura";
    const hp = parseInt(node.dataset.hp, 10) || 0;
    const maxHp = parseInt(node.dataset.maxHp, 10) || 3000;
    const plates = parseInt(node.dataset.plates, 10) || 0;
    const gold = node.dataset.gold || 250;
    const isDestroyed = node.classList.contains("destroyed");
    const pct = Math.max(0, Math.round((hp / maxHp) * 100));

    const sideBadge = side === "blue" ? `<span class="tip-team blue">🔵 LADO AZUL</span>` : `<span class="tip-team red">🔴 LADO VERMELHO</span>`;
    const statusText = isDestroyed
      ? `<span class="tip-status destroyed">💥 DESTRUÍDA</span>`
      : (pct < 40 ? `<span class="tip-status critical">⚠️ CRÍTICA (${pct}%)</span>` : `<span class="tip-status intact">🛡️ ATIVA (${pct}%)</span>`);

    tooltip.innerHTML = `
      <div class="tip-header">
        ${sideBadge}
        <div class="tip-name">${name}</div>
      </div>
      <div class="tip-body">
        <div class="tip-hp-row">
          <span class="tip-label">Integridade:</span>
          <span class="tip-hp-val">${isDestroyed ? '0 / ' + maxHp : hp + ' / ' + maxHp} HP</span>
        </div>
        <div class="tip-hp-bar">
          <div class="tip-hp-fill ${pct < 30 ? 'critical' : (pct < 60 ? 'damaged' : '')}" style="width: ${isDestroyed ? 0 : pct}%;"></div>
        </div>
        ${plates > 0 && !isDestroyed ? `
          <div class="tip-detail-row plates">
            <span>🛡️ Barricadas:</span>
            <strong>${plates} Placas (+${plates * 125}g disponíveis)</strong>
          </div>
        ` : ''}
        <div class="tip-detail-row">
          <span>Status:</span>
          ${statusText}
        </div>
        <div class="tip-detail-row bounty">
          <span>Recompensa Global:</span>
          <strong>+${gold} Ouro</strong>
        </div>
      </div>
    `;
  }

  _bindMapInteractions() {
    const tooltip = this.containerEl.querySelector("#rift-structure-tooltip");
    const svgContainer = this.containerEl.querySelector("#rift-svg-container");
    if (!tooltip || !svgContainer) return;

    // Garante que o tooltip nunca intercepte eventos de ponteiro
    tooltip.style.pointerEvents = "none";

    const updateTooltipPosition = (e) => {
      const rect = svgContainer.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      const tipWidth = 220;
      const tipHeight = 145;

      // Posiciona longe do cursor para nunca haver sobreposição
      let posX;
      if (cursorX > rect.width * 0.52) {
        posX = cursorX - tipWidth - 16;
      } else {
        posX = cursorX + 18;
      }

      let posY;
      if (cursorY > rect.height * 0.52) {
        posY = cursorY - tipHeight - 12;
      } else {
        posY = cursorY + 14;
      }

      // Limites de segurança para manter o tooltip dentro do mapa
      posX = Math.max(6, Math.min(rect.width - tipWidth - 6, posX));
      posY = Math.max(6, Math.min(rect.height - tipHeight - 6, posY));

      tooltip.style.left = `${Math.round(posX)}px`;
      tooltip.style.top = `${Math.round(posY)}px`;
    };

    this.containerEl.querySelectorAll(".map-structure-node").forEach(node => {
      node.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = node;
        this._updateActiveStructureTooltip();
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      node.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      node.addEventListener("mouseleave", () => {
        if (this._hoveredStructNode === node) {
          this._hoveredStructNode = null;
        }
        tooltip.style.display = "none";
      });

      node.addEventListener("click", () => {
        sound.playClick();
        const halo = node.querySelector(".struct-halo");
        if (halo) {
          halo.classList.remove("ping-pulse");
          void halo.offsetWidth;
          halo.classList.add("ping-pulse");
        }
      });
    });

    this.containerEl.querySelectorAll(".pit-marker").forEach(pit => {
      pit.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = null;
        const isBaron = pit.dataset.pit === "baron";
        const title = isBaron ? "👾 Covil do Barão Na'Shor" : "🐲 Covil do Dragão Elemental";
        const loc = isBaron ? "Parte Superior do Rio (Top River)" : "Parte Inferior do Rio (Bot River)";
        const desc = isBaron ? "Buff Mão do Barão: Super Cerco, bônus adaptativo e fortalecimento de tropas." : "Buff Elemental: Bônus cumulativo de dano, armadura ou regeneração.";
        const spawn = isBaron ? "Surge aos 20:00 (Respawn 6 min)" : "Surge aos 05:00 (Respawn 5 min)";

        tooltip.innerHTML = `
          <div class="tip-header">
            <span class="tip-team ${isBaron ? 'red' : 'blue'}">👑 OBJETIVO ÉPICO</span>
            <div class="tip-name">${title}</div>
          </div>
          <div class="tip-body">
            <div class="tip-detail-row">
              <span>Localização:</span>
              <strong>${loc}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Cronograma:</span>
              <strong>${spawn}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Recompensa:</span>
              <span style="color:#f0e6d2; font-size:11px;">${desc}</span>
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      pit.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      pit.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      pit.addEventListener("click", () => {
        sound.playClick();
      });
    });

    // Interatividade dos Marcadores de Choque de Tropas (Minion Clash Waves)
    this.containerEl.querySelectorAll(".minion-clash-wave").forEach(clashNode => {
      clashNode.addEventListener("mouseenter", (e) => {
        this._hoveredStructNode = null;
        const lane = clashNode.dataset.lane;
        const liveState = this.sim ? this.sim.getState() : state;
        const pressures = liveState.lanePressures || { top: liveState.lanePressure, mid: liveState.lanePressure, bot: liveState.lanePressure };
        const waveData = this._getLaneWaveData(lane, pressures[lane] || 0, liveState.gameSeconds || 0, liveState);

        tooltip.innerHTML = `
          <div class="tip-header" style="border-bottom: 2px solid ${waveData.theme.color};">
            <span class="tip-team" style="background:${waveData.theme.badgeBg}; color:${waveData.theme.colorLight}; border: 1px solid ${waveData.theme.color};">
              ${waveData.theme.icon} CHOQUE DE TROPAS • ${waveData.theme.name.toUpperCase()}
            </span>
            <div class="tip-name" style="color:#fff; font-size:12px; margin-top:2px;">${waveData.status}</div>
          </div>
          <div class="tip-body">
            <div class="tip-wave-grid">
              <div class="tip-wave-team blue">
                <div class="tip-wave-team-title">🔵 Tropas Azuis: <strong>${waveData.blueTotal}</strong></div>
                <div class="tip-wave-breakdown">
                  <span>🛡️ ${waveData.blueMelee} Guerreiros</span>
                  <span>🔮 ${waveData.blueCasters} Magos</span>
                  ${waveData.blueCannon ? `<span>💣 ${waveData.blueCannon} Canhão</span>` : ''}
                  ${waveData.blueSuper ? `<span style="color:#c084fc;">👾 ${waveData.blueSuper} Super Tropa</span>` : ''}
                  ${waveData.blueHasBaron ? `<span style="color:#a855f7;">👑 Mão do Barão</span>` : ''}
                </div>
              </div>
              <div class="tip-wave-vs">VS</div>
              <div class="tip-wave-team red">
                <div class="tip-wave-team-title">🔴 Tropas Vermelhas: <strong>${waveData.redTotal}</strong></div>
                <div class="tip-wave-breakdown">
                  <span>🛡️ ${waveData.redMelee} Guerreiros</span>
                  <span>🔮 ${waveData.redCasters} Magos</span>
                  ${waveData.redCannon ? `<span>💣 ${waveData.redCannon} Canhão</span>` : ''}
                  ${waveData.redSuper ? `<span style="color:#f43f5e;">👾 ${waveData.redSuper} Super Tropa</span>` : ''}
                  ${waveData.redHasBaron ? `<span style="color:#f87171;">👑 Mão do Barão</span>` : ''}
                </div>
              </div>
            </div>
            <div class="tip-detail-row" style="margin-top: 6px;">
              <span>Pressão da Rota:</span>
              <strong style="color:${waveData.pressure >= 0 ? '#60a5fa' : '#f87171'};">${waveData.pressure >= 0 ? `+${waveData.pressure}% (Azul Avançando)` : `${Math.abs(waveData.pressure)}% (Vermelho Avançando)`}</strong>
            </div>
            <div class="tip-detail-row">
              <span>Situação:</span>
              <span style="color:#f0e6d2; font-size:11px;">${waveData.description}</span>
            </div>
            <div class="tip-wave-cta" style="color:${waveData.theme.colorLight};">
              🎯 Clique para Focar esta Rota com a sua Equipe!
            </div>
          </div>
        `;
        updateTooltipPosition(e);
        tooltip.style.display = "block";
      });

      clashNode.addEventListener("mousemove", (e) => {
        updateTooltipPosition(e);
      });

      clashNode.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      clashNode.addEventListener("click", () => {
        sound.playClick();
        const lane = clashNode.dataset.lane;
        if (this.sim && this.sim.setLaneFocus && lane) {
          this.sim.setLaneFocus(lane);
          const liveState = this.sim.getState();
          this.updateTick(liveState);
        }
      });
    });

    // Interatividade de Foco Tático de Rota (Top, Mid, Bot)
    const laneBadges = [
      { id: "badge-lane-top", lane: "top" },
      { id: "badge-lane-mid", lane: "mid" },
      { id: "badge-lane-bot", lane: "bot" }
    ];
    laneBadges.forEach(({ id, lane }) => {
      const badgeEl = this.containerEl.querySelector(`#${id}`);
      if (badgeEl) {
        badgeEl.addEventListener("click", () => {
          sound.playClick();
          if (this.sim && this.sim.setLaneFocus) {
            this.sim.setLaneFocus(lane);
            const liveState = this.sim.getState();
            this.updateTick(liveState);
          }
        });
      }
    });

    // Inicializa o modal da Loja Hextech e Árvore de Receitas
    this._initItemShopModal();
  }

  _getLaneClashPosition(lane, pressure, state) {
    const LANE_WAYPOINTS = {
      top: [
        { x: 154, y: 464, name: "blue_t3" }, // 0: Torre T3 Azul
        { x: 198, y: 389, name: "blue_t2" }, // 1: Torre T2 Azul
        { x: 216, y: 208, name: "blue_t1" }, // 2: Torre T1 Azul
        { x: 268, y: 136, name: "river" },   // 3: Rio / Choque Neutro
        { x: 338, y: 84,  name: "red_t1" },  // 4: Torre T1 Vermelha
        { x: 525, y: 116, name: "red_t2" },  // 5: Torre T2 Vermelha
        { x: 660, y: 92,  name: "red_t3" },  // 6: Torre T3 Vermelha
        { x: 692, y: 88,  name: "red_inhib" } // 7: Inibidor Vermelho
      ],
      mid: [
        { x: 322, y: 524, name: "blue_t3" }, // 0: Torre T3 Azul
        { x: 398, y: 460, name: "blue_t2" }, // 1: Torre T2 Azul
        { x: 430, y: 395, name: "blue_t1" }, // 2: Torre T1 Azul
        { x: 514, y: 344, name: "river" },   // 3: Rio / Centro da Rota
        { x: 597, y: 292, name: "red_t1" },  // 4: Torre T1 Vermelha
        { x: 626, y: 240, name: "red_t2" },  // 5: Torre T2 Vermelha
        { x: 692, y: 190, name: "red_t3" },  // 6: Torre T3 Vermelha
        { x: 718, y: 172, name: "red_inhib" } // 7: Inibidor Vermelho
      ],
      bot: [
        { x: 356, y: 654, name: "blue_t3" }, // 0: Torre T3 Azul
        { x: 484, y: 636, name: "blue_t2" }, // 1: Torre T2 Azul
        { x: 690, y: 656, name: "blue_t1" }, // 2: Torre T1 Azul
        { x: 814, y: 610, name: "river" },   // 3: Centro Neutro da Rota Bot (Curva do Alcove)
        { x: 864, y: 484, name: "red_t1" },  // 4: Torre T1 Vermelha
        { x: 804, y: 328, name: "red_t2" },  // 5: Torre T2 Vermelha
        { x: 836, y: 222, name: "red_t3" },  // 6: Torre T3 Vermelha
        { x: 812, y: 198, name: "red_inhib" } // 7: Inibidor Vermelho
      ]
    };

    const waypoints = LANE_WAYPOINTS[lane] || LANE_WAYPOINTS.mid;

    // Helper para verificar se a estrutura está ativa / de pé
    const isAlive = (structures, structId, tier) => {
      if (!structures || !Array.isArray(structures)) return true;
      const s = structures.find(st => st.id === structId || (st.lane === lane && st.tier === tier));
      return s ? !s.destroyed : true;
    };

    const blueT1Alive = isAlive(state?.blue?.structures, `${lane}_t1`, 1);
    const blueT2Alive = isAlive(state?.blue?.structures, `${lane}_t2`, 2);
    const blueT3Alive = isAlive(state?.blue?.structures, `${lane}_t3`, 3);

    const redT1Alive = isAlive(state?.red?.structures, `${lane}_t1`, 1);
    const redT2Alive = isAlive(state?.red?.structures, `${lane}_t2`, 2);
    const redT3Alive = isAlive(state?.red?.structures, `${lane}_t3`, 3);

    // Determina a fronteira máxima de avanço (onde fica a primeira torre inimiga viva)
    // Red frontier: as tropas azuis NUNCA ultrapassam a primeira torre vermelha de pé!
    let maxIdx = 3.85; // Default: para em frente à Torre Red T1 (índice 4)
    if (!redT1Alive) {
      if (redT2Alive) {
        maxIdx = 4.85; // Red T1 caiu, avança até a Torre Red T2 (índice 5)
      } else if (redT3Alive) {
        maxIdx = 5.85; // Red T1 e T2 caíram, avança até a Torre Red T3 (índice 6)
      } else {
        maxIdx = 6.85; // T1, T2 e T3 caíram, avança até o Inibidor
      }
    }

    // Blue frontier: as tropas vermelhas NUNCA ultrapassam a primeira torre azul de pé!
    let minIdx = 2.15; // Default: para em frente à Torre Blue T1 (índice 2)
    if (!blueT1Alive) {
      if (blueT2Alive) {
        minIdx = 1.15; // Blue T1 caiu, recua até a Torre Blue T2 (índice 1)
      } else if (blueT3Alive) {
        minIdx = 0.15; // Blue T1 e T2 caíram, recua até a Torre Blue T3 (índice 0)
      } else {
        minIdx = -0.15; // T1, T2 e T3 azuis caíram, recua até o Inibidor
      }
    }

    const p = Math.max(-100, Math.min(100, pressure || 0));
    const centerIdx = 3.0; // Ponto neutro / Rio

    let pos = centerIdx;
    if (p >= 0) {
      // Avanço Azul em direção ao lado Vermelho
      pos = centerIdx + (p / 100) * (maxIdx - centerIdx);
    } else {
      // Avanço Vermelho em direção ao lado Azul
      pos = centerIdx - (-p / 100) * (centerIdx - minIdx);
    }

    // Interpolação de coordenadas:
    // Na rota inferior (Bot), entre Blue T1 (2.0) e Red T1 (4.0), a rota contorna suavemente
    // o alcove inferior (Curva Bezier P0=(690,656), P1=(850,650), P2=(864,484)), sem cortar pelo rio.
    let x, y;
    if (lane === "bot" && pos >= 2.0 && pos <= 4.0) {
      const t = (pos - 2.0) / 2.0; // Normalizado em [0, 1]
      x = (1 - t) * (1 - t) * 690 + 2 * (1 - t) * t * 850 + t * t * 864;
      y = (1 - t) * (1 - t) * 656 + 2 * (1 - t) * t * 650 + t * t * 484;
    } else {
      const baseIdx = Math.max(0, Math.min(waypoints.length - 2, Math.floor(pos)));
      const frac = Math.max(0, Math.min(1, pos - baseIdx));
      const pA = waypoints[baseIdx];
      const pB = waypoints[baseIdx + 1];

      x = pA.x + (pB.x - pA.x) * frac;
      y = pA.y + (pB.y - pA.y) * frac;
    }

    return {
      x: Math.round(x),
      y: Math.round(y),
      pos,
      maxIdx,
      minIdx,
      targetEnemyTower: redT1Alive ? "T1" : (redT2Alive ? "T2" : (redT3Alive ? "T3" : "Inibidor")),
      targetAllyTower: blueT1Alive ? "T1" : (blueT2Alive ? "T2" : (blueT3Alive ? "T3" : "Inibidor"))
    };
  }

  _getLaneWaveData(lane, pressure, gameSeconds, state) {
    const isCannonWave = (gameSeconds < 900 && Math.floor(gameSeconds / 30) % 3 === 0) ||
                         (gameSeconds >= 900 && gameSeconds < 1500 && Math.floor(gameSeconds / 30) % 2 === 0) ||
                         (gameSeconds >= 1500);

    const baseMinions = isCannonWave ? 7 : 6;
    const p = Math.max(-100, Math.min(100, pressure || 0));

    let blueTotal = baseMinions;
    let redTotal = baseMinions;

    if (p > 15) {
      const waveStack = Math.min(9, Math.floor((p - 15) / 10) + 1);
      blueTotal = baseMinions + waveStack;
      redTotal = Math.max(1, baseMinions - Math.floor(p / 22));
    } else if (p < -15) {
      const absP = Math.abs(p);
      const waveStack = Math.min(9, Math.floor((absP - 15) / 10) + 1);
      redTotal = baseMinions + waveStack;
      blueTotal = Math.max(1, baseMinions - Math.floor(absP / 22));
    }

    const blueHasSuper = state?.blue?.superMinionsByLane?.[lane] || false;
    const redHasSuper = state?.red?.superMinionsByLane?.[lane] || false;
    const blueSuperCount = blueHasSuper ? (gameSeconds > 1800 ? 2 : 1) : 0;
    const redSuperCount = redHasSuper ? (gameSeconds > 1800 ? 2 : 1) : 0;

    blueTotal += blueSuperCount;
    redTotal += redSuperCount;

    const blueCannon = (isCannonWave && blueTotal >= 4) ? 1 : 0;
    const blueMelee = Math.min(3, Math.max(1, Math.floor((blueTotal - blueCannon - blueSuperCount) * 0.5)));
    const blueCasters = Math.max(0, blueTotal - blueMelee - blueCannon - blueSuperCount);

    const redCannon = (isCannonWave && redTotal >= 4) ? 1 : 0;
    const redMelee = Math.min(3, Math.max(1, Math.floor((redTotal - redCannon - redSuperCount) * 0.5)));
    const redCasters = Math.max(0, redTotal - redMelee - redCannon - redSuperCount);

    // Identifica dinamicamente a torre alvo do confronto com base nas estruturas
    const isAlive = (structures, structId, tier) => {
      if (!structures || !Array.isArray(structures)) return true;
      const s = structures.find(st => st.id === structId || (st.lane === lane && st.tier === tier));
      return s ? !s.destroyed : true;
    };

    const redT1Alive = isAlive(state?.red?.structures, `${lane}_t1`, 1);
    const redT2Alive = isAlive(state?.red?.structures, `${lane}_t2`, 2);
    const redT3Alive = isAlive(state?.red?.structures, `${lane}_t3`, 3);

    const blueT1Alive = isAlive(state?.blue?.structures, `${lane}_t1`, 1);
    const blueT2Alive = isAlive(state?.blue?.structures, `${lane}_t2`, 2);
    const blueT3Alive = isAlive(state?.blue?.structures, `${lane}_t3`, 3);

    const targetRedStr = redT1Alive ? "Torre T1" : (redT2Alive ? "Torre T2" : (redT3Alive ? "Torre T3" : "Inibidor"));
    const targetBlueStr = blueT1Alive ? "sua Torre T1" : (blueT2Alive ? "sua Torre T2" : (blueT3Alive ? "sua Torre T3" : "seu Inibidor"));

    let waveStatus = "⚖️ Onda Equilibrada (Freeze)";
    let waveDesc = "As tropas estão se enfrentando no meio da rota com forças proporcionais.";
    if (p >= 50) {
      waveStatus = `🔥 Onda Gigante Batendo na ${targetRedStr}!`;
      waveDesc = `A tropa azul acumulou ${blueTotal} minions e está colidindo contra a ${targetRedStr} adversária!`;
    } else if (p >= 20) {
      waveStatus = "🌊 Slow Push Aliado (+Vantagem Numérica)";
      waveDesc = `Sua equipe tem superioridade de tropas (+${blueTotal - redTotal}) avançando em direção à ${targetRedStr}.`;
    } else if (p <= -50) {
      waveStatus = `⚠️ Onda Inimiga Quebrando sob ${targetBlueStr} (Crash)`;
      waveDesc = `O time vermelho acumulou ${redTotal} tropas e está ameaçando a ${targetBlueStr}!`;
    } else if (p <= -20) {
      waveStatus = "⚠️ Onda Inimiga Avançando (Sob Pressão)";
      waveDesc = `O time rival tem superioridade de tropas (+${redTotal - blueTotal}) empurrando em direção à ${targetBlueStr}.`;
    }

    const laneThemes = {
      top: {
        name: "Rota Superior (Top)",
        color: "#10b981",
        colorLight: "#34d399",
        colorDark: "#064e3b",
        badgeBg: "rgba(6, 78, 59, 0.9)",
        icon: "🌲"
      },
      mid: {
        name: "Rota do Meio (Mid)",
        color: "#a855f7",
        colorLight: "#c084fc",
        colorDark: "#3b0764",
        badgeBg: "rgba(59, 7, 100, 0.9)",
        icon: "🔮"
      },
      bot: {
        name: "Rota Inferior (Bot)",
        color: "#f59e0b",
        colorLight: "#fbbf24",
        colorDark: "#78350f",
        badgeBg: "rgba(120, 53, 15, 0.9)",
        icon: "🏹"
      }
    };

    return {
      lane,
      theme: laneThemes[lane] || laneThemes.mid,
      pressure: p,
      blueTotal,
      redTotal,
      blueMelee,
      blueCasters,
      blueCannon,
      blueSuper: blueSuperCount,
      redMelee,
      redCasters,
      redCannon,
      redSuper: redSuperCount,
      isCannonWave,
      blueHasBaron: !!state?.blue?.hasBaron,
      redHasBaron: !!state?.red?.hasBaron,
      status: waveStatus,
      description: waveDesc
    };
  }

  _initItemShopModal() {
    const modal = this.containerEl.querySelector("#item-shop-modal");
    if (!modal) return;

    this._activeShopCategory = "all";
    this._activeShopSearch = "";
    this._selectedShopItemId = 3031; // Default: Gume do Infinito

    const closeBtn = this.containerEl.querySelector("#shop-modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this._closeItemShopModal();
      });
    }

    // Fecha ao clicar no backdrop (fora do card)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this._closeItemShopModal();
      }
    });

    // Fecha com tecla ESC
    if (!this._shopEscBound) {
      this._shopEscBound = true;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          this._closeItemShopModal();
        }
      });
    }

    // Busca rápida com filtro em tempo real
    const searchInput = modal.querySelector("#shop-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this._activeShopSearch = (e.target.value || "").trim().toLowerCase();
        this._renderShopItemsGrid();
      });
    }

    // Clique em qualquer item nos inventários dos campeões abre o modal com o item inspecionado
    this.containerEl.addEventListener("click", (e) => {
      const slot = e.target.closest(".item-slot-icon.filled");
      if (slot && slot.dataset.itemId) {
        const itmId = Number(slot.dataset.itemId);
        if (itmId) {
          this._openItemShopModal(itmId);
        }
      }
    });
  }

  _openItemShopModal(selectedItemId = null) {
    const modal = this.containerEl.querySelector("#item-shop-modal");
    if (!modal) return;
    sound.playClick();

    if (selectedItemId && LOL_ITEMS[selectedItemId]) {
      this._selectedShopItemId = Number(selectedItemId);
    } else if (!this._selectedShopItemId || !LOL_ITEMS[this._selectedShopItemId]) {
      this._selectedShopItemId = 3031;
    }

    this._renderShopCategories();
    this._renderShopItemsGrid();
    this._renderShopItemInspector(this._selectedShopItemId);

    modal.classList.add("active");
  }

  _closeItemShopModal() {
    const modal = this.containerEl.querySelector("#item-shop-modal");
    if (modal) modal.classList.remove("active");
  }

  _renderShopCategories() {
    const tabsContainer = this.containerEl.querySelector("#shop-categories-tabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = ITEM_CATEGORIES.map(cat => {
      const isActive = (cat.id === this._activeShopCategory) ? "active" : "";
      return `<button type="button" class="shop-category-tab ${isActive}" data-cat-id="${cat.id}">
        <span class="shop-cat-icon">${cat.icon}</span>
        <span class="shop-cat-name">${cat.name}</span>
      </button>`;
    }).join("");

    tabsContainer.querySelectorAll(".shop-category-tab").forEach(tabBtn => {
      tabBtn.onclick = () => {
        sound.playClick();
        tabsContainer.querySelectorAll(".shop-category-tab").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active");
        this._activeShopCategory = tabBtn.dataset.catId;
        this._renderShopItemsGrid();
      };
    });
  }

  _renderShopItemsGrid() {
    const gridContainer = this.containerEl.querySelector("#shop-items-grid");
    if (!gridContainer) return;

    const allItems = Object.values(LOL_ITEMS);
    const catDef = ITEM_CATEGORIES.find(c => c.id === this._activeShopCategory) || ITEM_CATEGORIES[0];
    const search = this._activeShopSearch;

    let filtered = allItems;
    if (catDef.id !== "all" && catDef.filter) {
      filtered = filtered.filter(catDef.filter);
    }

    if (search) {
      filtered = filtered.filter(item => {
        const matchName = item.name.toLowerCase().includes(search);
        const matchDesc = (item.description || "").toLowerCase().includes(search);
        const matchClass = (item.class || "").toLowerCase().includes(search);
        const matchTier = (item.tier || "").toLowerCase().includes(search);
        const matchStats = Object.keys(item.stats || {}).some(k => k.toLowerCase().includes(search));
        return matchName || matchDesc || matchClass || matchTier || matchStats;
      });
    }

    // Ordena por importância de tier e preço decrescente
    const tierPriority = { LEGENDARY: 4, BOOTS: 3, EPIC: 2, BASIC: 1, STARTER: 0 };
    filtered.sort((a, b) => {
      const pDiff = (tierPriority[b.tier] || 0) - (tierPriority[a.tier] || 0);
      if (pDiff !== 0) return pDiff;
      return (b.cost || 0) - (a.cost || 0);
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="shop-empty-state">
          <span class="empty-icon">🔍</span>
          <p>Nenhum item encontrado para a busca ou filtro selecionado.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(item => {
      const isSelected = item.id === this._selectedShopItemId ? "selected" : "";
      const tierBadge = item.tier ? item.tier.toLowerCase() : "";
      return `
        <div class="shop-item-card ${isSelected} tier-${tierBadge}" data-item-id="${item.id}" tabindex="0" title="${item.name} (${(item.cost || 0).toLocaleString()}g)">
          <div class="shop-card-icon-wrap">
            <img class="shop-card-img" src="${getItemIconUrl(item.id)}" alt="${item.name}" loading="lazy" />
            <span class="shop-card-tier-badge">${item.tier || "ITEM"}</span>
          </div>
          <div class="shop-card-info">
            <div class="shop-card-name">${item.name}</div>
            <div class="shop-card-cost">💰 <span>${(item.cost || 0).toLocaleString()}</span>g</div>
          </div>
        </div>
      `;
    }).join("");

    gridContainer.querySelectorAll(".shop-item-card").forEach(card => {
      card.onclick = () => {
        sound.playClick();
        gridContainer.querySelectorAll(".shop-item-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this._selectedShopItemId = Number(card.dataset.itemId);
        this._renderShopItemInspector(this._selectedShopItemId);
      };
    });
  }

  _renderShopItemInspector(itemId) {
    const inspectorEl = this.containerEl.querySelector("#shop-item-inspector");
    if (!inspectorEl) return;

    const item = getItemById(itemId);
    if (!item) {
      inspectorEl.innerHTML = `<div class="inspector-placeholder">Selecione um item no catálogo para inspecionar seus atributos e árvore genealógica de receitas.</div>`;
      return;
    }

    const statLabels = {
      ad: { label: "Dano de Ataque (AD)", icon: "🗡️", unit: "" },
      ap: { label: "Poder de Habilidade (AP)", icon: "🔮", unit: "" },
      hp: { label: "Vida Máxima", icon: "❤️", unit: "" },
      armor: { label: "Armadura", icon: "🛡️", unit: "" },
      mr: { label: "Resistência Mágica", icon: "✨", unit: "" },
      haste: { label: "Aceleração de Habilidade", icon: "⏳", unit: "" },
      as: { label: "Velocidade de Ataque", icon: "⚡", unit: "%" },
      crit: { label: "Acerto Crítico", icon: "🎯", unit: "%" },
      ms: { label: "Velocidade de Movimento", icon: "👟", unit: "" },
      lethality: { label: "Letalidade", icon: "🗡️", unit: "" },
      omnivamp: { label: "Vampirismo / Cura", icon: "🩸", unit: "%" },
      healShield: { label: "Poder de Cura e Escudo", icon: "🌟", unit: "%" },
      mana: { label: "Mana Máxima", icon: "💧", unit: "" },
      healthRegen: { label: "Regeneração de Vida", icon: "💚", unit: "%" }
    };

    const statsHtml = item.stats && Object.keys(item.stats).length > 0
      ? Object.entries(item.stats).map(([k, v]) => {
          const sMeta = statLabels[k] || { label: k.toUpperCase(), icon: "✦", unit: "" };
          const valFormatted = sMeta.unit === "%" ? `+${Math.round(v * 100)}%` : `+${v}`;
          return `
            <div class="inspector-stat-pill">
              <span class="stat-icon">${sMeta.icon}</span>
              <span class="stat-name">${sMeta.label}:</span>
              <strong class="stat-val">${valFormatted}</strong>
            </div>
          `;
        }).join("")
      : `<span class="inspector-no-stats">Item Utilitário / Atributos Especiais</span>`;

    // Constrói em (Itens que usam este item como componente)
    const upgrades = Object.values(LOL_ITEMS).filter(it => it.from && it.from.includes(item.id));
    const upgradesHtml = upgrades.length > 0
      ? `
        <div class="inspector-section">
          <div class="inspector-section-title">⬆️ Constrói em (${upgrades.length} Itens):</div>
          <div class="inspector-upgrades-row">
            ${upgrades.map(up => `
              <div class="tree-node-item clickable" data-target-id="${up.id}" title="${up.name} (💰 ${(up.cost || 0).toLocaleString()}g)">
                <img src="${getItemIconUrl(up.id)}" alt="${up.name}" />
                <span class="tree-node-price">💰 ${up.cost}g</span>
                <span class="tree-node-name">${up.name}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `
      : "";

    // Árvore de receitas
    const recipeTreeHtml = this._renderRecipeTreeHtml(item);

    inspectorEl.innerHTML = `
      <div class="inspector-content">
        <!-- Header do Item Selecionado -->
        <div class="inspector-header">
          <div class="inspector-icon-container">
            <img class="inspector-icon" src="${getItemIconUrl(item.id)}" alt="${item.name}" />
            <span class="inspector-badge ${item.tier ? item.tier.toLowerCase() : ''}">${item.tier || 'ITEM'}</span>
          </div>
          <div class="inspector-header-info">
            <h3 class="inspector-title">${item.name}</h3>
            <div class="inspector-meta-row">
              <span class="inspector-class-pill">${item.class || 'Geral'}</span>
              <span class="inspector-cost-tag">💰 Preço Total: <strong>${(item.cost || 0).toLocaleString()}g</strong></span>
              ${item.combineCost !== undefined && item.from && item.from.length > 0 ? `<span class="inspector-combine-cost">Combinação: 💰 <strong>${item.combineCost.toLocaleString()}g</strong></span>` : ''}
            </div>
          </div>
        </div>

        <!-- Atributos -->
        <div class="inspector-section">
          <div class="inspector-section-title">📊 Atributos de Combate:</div>
          <div class="inspector-stats-grid">
            ${statsHtml}
          </div>
        </div>

        <!-- Descrição / Passiva -->
        <div class="inspector-section">
          <div class="inspector-section-title">📜 Descrição & Efeito Passivo:</div>
          <div class="inspector-desc-box">
            ${item.description || "Nenhuma descrição detalhada disponível."}
          </div>
        </div>

        <!-- Árvore de Receita Oficial -->
        <div class="inspector-section">
          <div class="inspector-section-title">🌿 Árvore de Receita & Montagem:</div>
          <div class="recipe-tree-wrapper">
            ${recipeTreeHtml}
          </div>
        </div>

        <!-- Upgrades Futuros -->
        ${upgradesHtml}
      </div>
    `;

    // Interatividade em todos os nós de receita ou upgrade
    inspectorEl.querySelectorAll(".tree-node-item.clickable").forEach(node => {
      node.onclick = () => {
        const tId = Number(node.dataset.targetId);
        if (tId && LOL_ITEMS[tId]) {
          sound.playClick();
          this._selectedShopItemId = tId;
          this._renderShopItemInspector(tId);
          const cardInGrid = this.containerEl.querySelector(`.shop-item-card[data-item-id="${tId}"]`);
          if (cardInGrid) {
            this.containerEl.querySelectorAll(".shop-item-card").forEach(c => c.classList.remove("selected"));
            cardInGrid.classList.add("selected");
            cardInGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      };
    });
  }

  _renderRecipeTreeHtml(item) {
    if (!item.from || item.from.length === 0) {
      return `
        <div class="recipe-tree-root-only">
          <div class="tree-node-item current-root">
            <img src="${getItemIconUrl(item.id)}" alt="${item.name}" />
            <span class="tree-node-price">💰 ${item.cost}g</span>
            <span class="tree-node-name">${item.name}</span>
          </div>
          <div class="recipe-tree-note">🌱 Item Básico ou Inicial — Não necessita de combinação prévia.</div>
        </div>
      `;
    }

    return `
      <div class="recipe-tree-tree">
        <!-- Nó Raiz (Item Fechado) -->
        <div class="recipe-tree-root-row">
          <div class="tree-node-item current-root">
            <img src="${getItemIconUrl(item.id)}" alt="${item.name}" />
            <span class="tree-node-price">💰 ${item.cost}g (Combinação: ${item.combineCost}g)</span>
            <span class="tree-node-name">${item.name}</span>
          </div>
        </div>

        <div class="recipe-tree-branch-lines"></div>

        <!-- Componentes Imediatos -->
        <div class="recipe-tree-children-row">
          ${item.from.map(cId => {
            const comp = getItemById(cId);
            if (!comp) return '';
            const subRecipe = (comp.from && comp.from.length > 0)
              ? `
                <div class="tree-sub-children">
                  <div class="sub-branch-line"></div>
                  <div class="tree-sub-children-row">
                    ${comp.from.map(scId => {
                      const sc = getItemById(scId);
                      if (!sc) return '';
                      return `
                        <div class="tree-node-item sub-node clickable" data-target-id="${sc.id}" title="${sc.name} (💰 ${(sc.cost || 0).toLocaleString()}g)">
                          <img src="${getItemIconUrl(sc.id)}" alt="${sc.name}" />
                          <span class="tree-node-price">💰 ${sc.cost}g</span>
                          <span class="tree-node-name">${sc.name}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `
              : '';

            return `
              <div class="recipe-tree-branch">
                <div class="tree-node-item clickable" data-target-id="${comp.id}" title="${comp.name} (💰 ${(comp.cost || 0).toLocaleString()}g)">
                  <img src="${getItemIconUrl(comp.id)}" alt="${comp.name}" />
                  <span class="tree-node-price">💰 ${comp.cost}g</span>
                  <span class="tree-node-name">${comp.name}</span>
                </div>
                ${subRecipe}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Exibe a legenda flutuante com a fala oficial do campeão escolhido
  _showVoiceQuoteToast(champ) {
    if (!champ) return;
    const toast = document.getElementById("champ-voice-toast");
    if (!toast) return;

    const img = toast.querySelector("#toast-champ-img");
    const name = toast.querySelector("#toast-champ-name");
    const role = toast.querySelector("#toast-champ-role");
    const quote = toast.querySelector("#toast-champ-quote");

    if (img) {
      img.src = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champ.id}.png`;
      img.alt = champ.name;
    }
    if (name) name.textContent = champ.name;
    if (role) role.textContent = `• ${champ.title || champ.role.toUpperCase()}`;
    if (quote) quote.textContent = `"${champ.quote || 'Ao combate!'}"`;

    toast.classList.add("active");

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("active");
    }, 4500);
  }

  _getDifficultyText(roundIdx) {
    const texts = [
      "Dificuldade: Normal",
      "Dificuldade: Competitiva (+4%)",
      "Dificuldade: Veterana (+9%)",
      "Decisão de Título ★ (+14%)"
    ];
    return texts[roundIdx] || texts[0];
  }

  _getDifficultyColor(roundIdx) {
    const colors = ["#4ade80", "#60a5fa", "#f59e0b", "#f43f5e"];
    return colors[roundIdx] || colors[0];
  }

  _getDifficultyBorder(roundIdx) {
    const borders = [
      "rgba(74, 222, 128, 0.4)",
      "rgba(96, 165, 250, 0.4)",
      "rgba(245, 158, 11, 0.4)",
      "rgba(244, 63, 94, 0.5)"
    ];
    return borders[roundIdx] || borders[0];
  }
}



// =================== js/ui/confetti.js ===================

// Sistema de Confetes e Partículas Douradas para Celebração de Título do CBLOL
class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;
    this.isActive = false;
    this.endTimer = null;
    this._handleResize = this._handleResize.bind(this);
  }

  _initCanvas() {
    if (this.canvas) return;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "cblol-confetti-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.inset = "0";
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "99999";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this._handleResize();
    window.addEventListener("resize", this._handleResize);
  }

  _handleResize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  startChampionConfetti(durationMs = 9000) {
    this.stop();
    this._initCanvas();
    if (!this.ctx) return;

    this.isActive = true;
    this.particles = [];

    const colors = [
      "#ffd700", // Ouro Puro Troféu
      "#c8aa6e", // Ouro Hextech LoL
      "#f0e6d2", // Dourado Cristalino
      "#0ac8b9", // Ciano Hextech
      "#005a82", // Azul Profundo LoL
      "#ffffff", // Brilho Diamante
      "#e84057"  // Carmesim CBLOL
    ];

    // Explosão inicial a partir dos cantos inferiores (Canhões de Estádio)
    this._spawnCannons(colors, 140);

    // Chuva contínua caindo do topo da tela
    let streamInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(streamInterval);
        return;
      }
      this._spawnStream(colors, 12);
    }, 120);

    // Erupções adicionais no centro e nas laterais
    setTimeout(() => { if (this.isActive) this._spawnCannons(colors, 90); }, 1800);
    setTimeout(() => { if (this.isActive) this._spawnCannons(colors, 90); }, 3600);
    setTimeout(() => { if (this.isActive) this._spawnCannons(colors, 110); }, 5400);

    this._loop();

    if (this.endTimer) clearTimeout(this.endTimer);
    this.endTimer = setTimeout(() => {
      this.stop();
    }, durationMs);
  }

  _spawnCannons(colors, count) {
    const w = this.canvas ? this.canvas.width : window.innerWidth;
    const h = this.canvas ? this.canvas.height : window.innerHeight;

    // Canhão Esquerdo
    for (let i = 0; i < count / 2; i++) {
      const angle = (Math.random() * 45 + 25) * (Math.PI / 180); // 25° a 70° para cima e direita
      const speed = Math.random() * 18 + 14;
      this.particles.push(this._createParticle(
        Math.random() * 100,
        h - 20,
        Math.cos(angle) * speed,
        -Math.sin(angle) * speed,
        colors
      ));
    }

    // Canhão Direito
    for (let i = 0; i < count / 2; i++) {
      const angle = (Math.random() * 45 + 110) * (Math.PI / 180); // 110° a 155° para cima e esquerda
      const speed = Math.random() * 18 + 14;
      this.particles.push(this._createParticle(
        w - Math.random() * 100,
        h - 20,
        Math.cos(angle) * speed,
        -Math.sin(angle) * speed,
        colors
      ));
    }
  }

  _spawnStream(colors, count) {
    const w = this.canvas ? this.canvas.width : window.innerWidth;
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle(
        Math.random() * w,
        -20,
        (Math.random() - 0.5) * 4,
        Math.random() * 3 + 2,
        colors
      ));
    }
  }

  _createParticle(x, y, vx, vy, colors) {
    const isRibbon = Math.random() > 0.35;
    return {
      x,
      y,
      vx,
      vy,
      w: isRibbon ? Math.random() * 10 + 6 : Math.random() * 7 + 4,
      h: isRibbon ? Math.random() * 5 + 3 : Math.random() * 7 + 4,
      isCircle: !isRibbon && Math.random() > 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.25,
      wobble: Math.random() * Math.PI * 2,
      vWobble: Math.random() * 0.1 + 0.05,
      opacity: 1,
      decay: Math.random() * 0.002 + 0.001
    };
  }

  _loop() {
    if (!this.isActive || !this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const gravity = 0.28;
    const drag = 0.985;
    const h = this.canvas.height;
    const w = this.canvas.width;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.angle += p.vAngle;
      p.wobble += p.vWobble;

      // Movimento oscilatório suave de folha caindo
      const wobbleOffset = Math.sin(p.wobble) * 2;
      p.x += wobbleOffset * 0.3;

      p.opacity -= p.decay;

      if (p.y > h + 50 || p.opacity <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.scale(Math.cos(p.wobble), 1);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.isCircle) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      this.ctx.restore();
    }

    if (this.isActive) {
      this.animId = requestAnimationFrame(() => this._loop());
    }
  }

  stop() {
    this.isActive = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.endTimer) {
      clearTimeout(this.endTimer);
      this.endTimer = null;
    }
    if (this.canvas) {
      window.removeEventListener("resize", this._handleResize);
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = null;
      this.ctx = null;
    }
    this.particles = [];
  }
}

const confetti = new ConfettiEngine();



// =================== js/app.js ===================

// Controlador Principal do CBLOL Chronicles: Batalha pelo Nexus

class AppController {
  constructor() {
    this.playerTeam = null;
    this.tournament = null;
    this.currentSimulator = null;
    this.currentArenaView = null;
    this.currentBracketView = null;

    this.views = {
      builder: document.getElementById("view-builder"),
      bracket: document.getElementById("view-bracket"),
      arena: document.getElementById("view-arena"),
      upgrades: document.getElementById("view-upgrades"),
      champion: document.getElementById("view-champion"),
      eliminated: document.getElementById("view-eliminated")
    };

    this.initHeaderControls();
    this.showView("builder");
    this.initTeamCreator();
  }

  showView(viewKey) {
    if (viewKey !== "champion" && typeof confetti !== "undefined") {
      confetti.stop();
    }
    Object.keys(this.views).forEach(key => {
      const el = this.views[key];
      if (el) {
        if (key === viewKey) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  initHeaderControls() {
    const muteBtn = document.getElementById("mute-btn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        const isMuted = sound.toggleMute();
        muteBtn.innerHTML = isMuted ? "🔇 Som: Desligado" : "🔊 Som: Ligado";
      });
    }

    const resetBtn = document.getElementById("new-run-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Deseja iniciar uma nova campanha e resetar a run atual?")) {
          sound.playClick();
          this.startNewRun();
        }
      });
    }
  }

  initTeamCreator() {
    new TeamCreatorView({
      containerEl: this.views.builder,
      mode: "create",
      onTeamCreated: (teamObj) => {
        this.playerTeam = teamObj;
        this.tournament = new TournamentManager(this.playerTeam);
        this.showBracketView();
      }
    });
  }

  showBracketView() {
    this.showView("bracket");
    if (!this.currentBracketView) {
      this.currentBracketView = new BracketView({
        containerEl: this.views.bracket,
        tournament: this.tournament,
        onStartMatch: () => this.openMatchDraft(),
        onOpenDraft: () => this.openMatchDraft()
      });
    } else {
      this.currentBracketView.update(this.tournament);
    }
  }

  openMatchDraft() {
    if (!this.tournament || this.tournament.isOver) {
      this.showBracketView();
      return;
    }

    const currentMatch = this.tournament.getCurrentPlayerMatch();
    const opponent = this.tournament.getOpponentForCurrentRound();
    const roundName = this.tournament.roundNames[this.tournament.currentRound] || "Playoffs";
    const format = this.tournament.getCurrentRoundFormat();

    const isTeamA = currentMatch && currentMatch.teamA && currentMatch.teamA.isPlayer;
    const pScore = currentMatch ? (isTeamA ? currentMatch.scoreA : currentMatch.scoreB) : 0;
    const oppScore = currentMatch ? (isTeamA ? currentMatch.scoreB : currentMatch.scoreA) : 0;
    const nextGameNum = currentMatch ? (currentMatch.scoreA + currentMatch.scoreB + 1) : 1;
    const lastGame = currentMatch && currentMatch.games && currentMatch.games.length > 0 ? currentMatch.games[currentMatch.games.length - 1] : null;
    const opponentLostPrev = lastGame ? lastGame.won : false;

    if (this.tournament && opponent) {
      this.tournament.adaptOpponentRoster(opponent, nextGameNum, opponentLostPrev);
    }

    const matchInfo = {
      roundName,
      format,
      opponent,
      seriesScore: format !== "MD1" ? `${pScore} - ${oppScore}` : null,
      gameNumber: nextGameNum
    };

    this.showView("builder");

    new TeamCreatorView({
      containerEl: this.views.builder,
      mode: "draft",
      playerTeam: this.playerTeam,
      matchInfo,
      onConfirmDraft: (updatedRoster) => {
        this.playerTeam.roster = { ...updatedRoster };
        this.playerTeam.stats = calculateTeamStats(this.playerTeam.roster, this.playerTeam.upgrades || []);
        if (this.tournament) {
          this.tournament.playerTeam.roster = this.playerTeam.roster;
          this.tournament.playerTeam.stats = this.playerTeam.stats;
          const curMatch = this.tournament.getCurrentPlayerMatch();
          if (curMatch) {
            if (curMatch.teamA && curMatch.teamA.isPlayer) {
              curMatch.teamA.roster = this.playerTeam.roster;
              curMatch.teamA.stats = this.playerTeam.stats;
            } else if (curMatch.teamB && curMatch.teamB.isPlayer) {
              curMatch.teamB.roster = this.playerTeam.roster;
              curMatch.teamB.stats = this.playerTeam.stats;
            }
          }
        }
        this.startMatch();
      },
      onViewBracket: () => {
        this.showBracketView();
      }
    });
  }

  startMatch() {
    try {
      const opponent = this.tournament.getOpponentForCurrentRound();
      if (!opponent) {
        alert("Nenhum adversário encontrado para esta rodada!");
        return;
      }

      const currentMatch = this.tournament.getCurrentPlayerMatch();
      const nextGameNum = currentMatch ? (currentMatch.scoreA + currentMatch.scoreB + 1) : 1;
      const lastGame = currentMatch && currentMatch.games && currentMatch.games.length > 0 ? currentMatch.games[currentMatch.games.length - 1] : null;
      const opponentLostPrev = lastGame ? lastGame.won : false;
      this.tournament.adaptOpponentRoster(opponent, nextGameNum, opponentLostPrev);

      this.showView("arena");

      // Instancia o simulador da partida com a rodada correspondente (Roguelike)
      this.currentSimulator = new MatchSimulator({
        blueTeam: this.playerTeam,
        redTeam: opponent,
        roundIndex: this.tournament.currentRound || 0,
        speed: 1,
        onTick: (state) => {
          if (this.currentArenaView) this.currentArenaView.updateTick(state);
        },
        onEvent: (evt) => {
          if (this.currentArenaView) this.currentArenaView.handleEvent(evt);
        },
        onMultikill: (data) => {
          if (this.currentArenaView) this.currentArenaView.handleMultikill(data);
        },
        onAce: (data) => {
          if (this.currentArenaView) this.currentArenaView.handleAce(data);
        },
        onItemPurchased: (data) => {
          if (this.currentArenaView) this.currentArenaView.handleItemPurchased(data);
        },
        onStructureHit: (teamSide, structId, curHp, maxHp) => {
          if (this.currentArenaView) this.currentArenaView.handleStructureHit(teamSide, structId, curHp, maxHp);
        },
        onStructureDestroyed: (teamSide, structId) => {
          if (this.currentArenaView) this.currentArenaView.handleStructureDestroyed(teamSide, structId);
        },
        onFinish: (result, summary) => {
          const won = result === "win";
          const seriesResult = this.tournament.recordPlayerGameResult(won, summary);
          summary.seriesResult = seriesResult;
          summary.tournament = this.tournament;
          if (this.currentArenaView) this.currentArenaView.handleFinish(result, summary);
        },
        onTacticalDecision: (decisionData) => {
          if (this.currentArenaView) this.currentArenaView.handleTacticalDecision(decisionData);
        }
      });

      // Instancia a view da arena
      this.currentArenaView = new ArenaView({
        containerEl: this.views.arena,
        simulator: this.currentSimulator,
        onMatchFinished: (result, summary) => {
          this.handleMatchComplete(result, summary);
        }
      });

      // Dá partida no motor do jogo
      this.currentSimulator.start();
    } catch (err) {
      console.error("Erro ao iniciar partida:", err);
      alert("Erro ao carregar a partida: " + err.message);
    }
  }

  handleMatchComplete(result, summary) {
    const sRes = summary.seriesResult || this.tournament.recordPlayerGameResult(result === "win", summary);

    if (!sRes.seriesOver) {
      // Série segue aberta (ex: 1-0 ou 1-1 na MD3, 2-1 na MD5).
      // Abre o Draft para escolher/ajustar os 5 campeões para o próximo jogo da série!
      this.openMatchDraft();
      return;
    }

    // A série foi concluída!
    if (sRes.seriesWon) {
      // Simula partidas de IA pendentes da rodada
      this.tournament.simulateOtherMatchesOfCurrentRound();

      if (sRes.playerWonTournament) {
        // Conquistou a Grande Final do CBLOL!
        this.showChampionCelebration(summary);
      } else {
        // Avançou de fase (ex: Qualify -> Quartas, Quartas -> Semis, Semis -> Final)
        // Abre imediatamente a tela de seleção dos 5 novos campeões para a próxima fase!
        this.openMatchDraft();
      }
    } else {
      // Eliminado da série e do campeonato
      this.showEliminationScreen(summary);
    }
  }

  showUpgradesSelection() {
    this.showView("upgrades");

    const currentUpgradeIds = (this.playerTeam.upgrades || []).map(u => u.id);
    const choices = getRandomUpgrades(3, currentUpgradeIds);

    this.views.upgrades.innerHTML = `
      <div style="text-align: center; max-width: 800px; margin: 0 auto;">
        <span style="font-size: 13px; font-weight: 800; color: var(--lol-blue-glow); text-transform: uppercase; letter-spacing: 2px;">
          Série Vencida com Sucesso!
        </span>
        <h2 style="font-size: 28px; font-weight: 900; color: #fff; margin-top: 6px; letter-spacing: 1.5px; text-transform: uppercase;">
          Escolha um Aprimoramento Hextech
        </h2>
        <p style="color: #cdbe91; font-size: 14px; margin-top: 6px;">
          Fortaleça sua equipe para enfrentar o próximo confronto eliminatório do CBLOL!
        </p>

        <div class="upgrades-grid">
          ${choices.map(u => `
            <div class="upgrade-card" data-upgrade-id="${u.id}">
              <div class="upgrade-icon-large">${u.icon}</div>
              <div class="upgrade-name">${u.name}</div>
              <div class="upgrade-desc">${u.description}</div>
              <span class="upgrade-rarity">${u.rarity}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.views.upgrades.querySelectorAll(".upgrade-card").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-upgrade-id");
        const chosen = choices.find(u => u.id === id);
        if (chosen) {
          sound.playPick();
          this.playerTeam.upgrades = this.playerTeam.upgrades || [];
          this.playerTeam.upgrades.push(chosen);

          // Atualiza estatísticas do time com o upgrade
          Object.keys(chosen.effect).forEach(stat => {
            if (this.playerTeam.stats[stat] !== undefined) {
              this.playerTeam.stats[stat] += chosen.effect[stat];
            }
          });

          this.showBracketView();
        }
      });
    });
  }

  showChampionCelebration(summary) {
    this.showView("champion");

    sound.playChampionFanfare();
    if (typeof confetti !== "undefined") {
      confetti.startChampionConfetti(12000);
    }

    const tourney = this.tournament.getTournamentSummary();
    const mvp = tourney.mvp;
    const history = tourney.history || [];

    this.views.champion.innerHTML = `
      <div class="ceremony-box" style="max-width: 860px;">
        <div class="trophy-stage">
          <div class="trophy-halo"></div>
          <div class="trophy-image">🏆</div>
        </div>
        <h1 class="ceremony-title gold">É CAMPEÃO DO CBLOL!</h1>
        <p class="ceremony-subtitle">
          Parabéns! A organização <strong>${this.playerTeam.name}</strong> conquistou o título mais cobiçado do Brasil após superar todas as séries do torneio!
        </p>

        <!-- Resumo de Vitórias e Derrotas da Campanha -->
        <div class="campaign-summary-banner">
          <div class="campaign-stat-item">
            <span class="camp-label">Vitórias Totais</span>
            <span class="camp-val win-val">${tourney.totalWins}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Derrotas Totais</span>
            <span class="camp-val loss-val">${tourney.totalLosses}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Aproveitamento</span>
            <span class="camp-val gold-val">${Math.round((tourney.totalWins / Math.max(1, tourney.totalWins + tourney.totalLosses)) * 100)}%</span>
          </div>
        </div>

        <!-- Trajetória Série por Série -->
        <div class="campaign-history-section">
          <h3 class="campaign-section-title">📜 Trajetória nos Playoffs</h3>
          <div class="campaign-history-list">
            ${history.map(h => `
              <div class="campaign-history-item ${h.won ? 'won-series' : 'lost-series'}">
                <div class="series-tag">${h.roundName} (${h.format})</div>
                <div class="series-versus">
                  vs <strong>${h.opponentName}</strong>
                </div>
                <div class="series-result-score">
                  <span class="score-badge ${h.won ? 'won' : 'lost'}">${h.playerWins} x ${h.enemyWins}</span>
                  <span class="status-badge">${h.won ? 'CLASSIFICADO' : 'ELIMINADO'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Cartão do MVP do Campeonato -->
        ${mvp ? `
          <div class="mvp-ceremony-card">
            <div class="mvp-badge-header">⭐ MVP DO CAMPEONATO (SPLIT MVP) ⭐</div>
            <div class="mvp-card-content">
              <div class="mvp-avatar-box">
                <img src="${mvp.avatarUrl}" alt="${mvp.name}" class="mvp-champ-avatar" />
                <span class="mvp-role-badge">${mvp.role.toUpperCase()}</span>
              </div>
              <div class="mvp-details-box">
                <div class="mvp-champ-name">${mvp.name}</div>
                <div class="mvp-metrics-grid">
                  <div class="metric-cell">
                    <span class="m-label">KDA Oficial</span>
                    <span class="m-val">${mvp.kdaStr}</span>
                  </div>
                  <div class="metric-cell">
                    <span class="m-label">Dano a Campeões</span>
                    <span class="m-val dmg">${Math.round(mvp.damageDealt).toLocaleString()}</span>
                  </div>
                  <div class="metric-cell">
                    <span class="m-label">Ouro Acumulado</span>
                    <span class="m-val gold">💰 ${Math.round(mvp.goldEarned).toLocaleString()}</span>
                  </div>
                  <div class="metric-cell">
                    <span class="m-label">Jogos Realizados</span>
                    <span class="m-val">${mvp.games} partidas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <button id="restart-won-btn" class="lol-btn lol-btn-primary" style="margin-top: 24px; padding: 14px 36px; font-size: 16px;">
          ✨ Iniciar Nova Campanha no CBLOL
        </button>
      </div>
    `;

    const btn = this.views.champion.querySelector("#restart-won-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        if (typeof confetti !== "undefined") confetti.stop();
        sound.playClick();
        this.startNewRun();
      });
    }
  }

  showEliminationScreen(summary) {
    this.showView("eliminated");

    const tourney = this.tournament ? this.tournament.getTournamentSummary() : { totalWins: 0, totalLosses: 0, history: [] };

    this.views.eliminated.innerHTML = `
      <div class="ceremony-box" style="max-width: 800px;">
        <div style="font-size: 80px; margin-bottom: 20px;">💀</div>
        <h1 class="ceremony-title red">ELIMINADO DOS PLAYOFFS</h1>
        <p class="ceremony-subtitle">
          Sua jornada terminou nas <strong>${this.tournament.roundNames[this.tournament.currentRound] || "Fase Eliminatória"}</strong>. O CBLOL é impiedoso, mas toda lenda nasce da superação!
        </p>

        <div class="campaign-summary-banner" style="margin: 20px 0;">
          <div class="campaign-stat-item">
            <span class="camp-label">Vitórias</span>
            <span class="camp-val win-val">${tourney.totalWins}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Derrotas</span>
            <span class="camp-val loss-val">${tourney.totalLosses}</span>
          </div>
          <div class="campaign-stat-item">
            <span class="camp-label">Duração Último Jogo</span>
            <span class="camp-val gold-val">${summary.duration}</span>
          </div>
        </div>

        <button id="restart-loss-btn" class="lol-btn lol-btn-danger" style="margin-top: 20px;">
          🔄 Montar Novo Time e Tentar Novamente
        </button>
      </div>
    `;

    const btn = this.views.eliminated.querySelector("#restart-loss-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.startNewRun();
      });
    }
  }

  startNewRun() {
    this.playerTeam = null;
    this.tournament = null;
    this.currentSimulator = null;
    this.currentArenaView = null;
    this.currentBracketView = null;

    this.showView("builder");
    this.initTeamCreator();
  }
}

// Inicializa o jogo quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.cblolApp = new AppController();
});



if (typeof window !== 'undefined') {
  window.MatchSimulator = MatchSimulator;
  window.TournamentManager = TournamentManager;
  window.CBLOL_TEAMS = CBLOL_TEAMS;
  window.SUMMONER_ICONS = SUMMONER_ICONS;
  window.CHAMPIONS = CHAMPIONS;
  window.getRandomTeamRoster = getRandomTeamRoster;
  window.getChampionById = getChampionById;
  window.getChampionsByRole = getChampionsByRole;
  window.calculateTeamStats = calculateTeamStats;
  window.getChampionVoiceUrl = getChampionVoiceUrl;
  window.LOL_ITEMS = LOL_ITEMS;
  window.getItemById = getItemById;
  window.getItemIconUrl = getItemIconUrl;
  window.getItemRecipeTree = getItemRecipeTree;
  window.getNextPurchaseStep = getNextPurchaseStep;
  window.getStarterItemForChampion = getStarterItemForChampion;
  window.ITEM_CATEGORIES = ITEM_CATEGORIES;
  window.getRecommendedItemForChampion = getRecommendedItemForChampion;
  window.PRO_PLAYERS = PRO_PLAYERS;
  window.getPlayersByRole = getPlayersByRole;
  window.getPlayerById = getPlayerById;
  window.getDefaultProRoster = getDefaultProRoster;
  window.TeamCreatorView = TeamCreatorView;
  window.ArenaView = ArenaView;
  window.BracketView = BracketView;
  window.sound = sound;
  window.confetti = confetti;
}

})();
