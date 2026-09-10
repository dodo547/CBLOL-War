// Banco completo de campeões oficiais de League of Legends (168 Campeões) com dados oficiais, papéis e atributos competitivos
export const CHAMPIONS = [
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

// Helper para buscar campeão por ID ou Nome (com suporte a aliases como Wukong -> MonkeyKing)
export function getChampionById(id) {
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
export function getChampionsByRole(role) {
  return CHAMPIONS.filter(c => c.role === role);
}

// Retorna uma composição aleatória equilibrada (1 de cada rota)
export function getRandomTeamRoster() {
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
export function calculateTeamStats(rosterObj, upgrades = []) {
  const roles = ["top", "jungle", "mid", "adc", "support"];
  let totalDmg = 0;
  let totalTank = 0;
  let totalPush = 0;
  let totalUtility = 0;
  let totalScaling = 0;
  let count = 0;

  roles.forEach(role => {
    const champId = rosterObj[role];
    const champ = getChampionById(champId);
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
export function getChampionVoiceUrl(champOrKey) {
  const key = typeof champOrKey === "object" ? champOrKey.key : champOrKey;
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-choose-vo/${key}.ogg`;
}
