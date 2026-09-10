# 🏆 CBLOL Chronicles: Batalha pelo Nexus

Minigame competitivo ambientado no universo de League of Legends e focado nos Playoffs do CBLOL. Crie sua própria equipe, escale seus 5 campeões favoritos ou role composições aleatórias, encare os times mais tradicionais do Brasil e destrua as torres, inibidores e o Nexus inimigo para levantar a Taça!

---

## 🚀 Como Executar

Você pode rodar o minigame de forma imediata via Python 3:

```bash
python3 server.py
```

Ou usando o servidor HTTP embutido:
```bash
python3 -m http.server 8000
```

Em seguida, abra o seu navegador em: **`http://localhost:8000`**

---

## 🎮 Funcionalidades Principais

### 1. Criação e Identidade da Equipe
- **Nome Personalizado**: Dê o nome que quiser para a sua equipe (ex: *Ilha das Lendas*, *Trapaceiros*, *Seu Nome Esports*).
- **Ícones Oficiais do LoL**: Selecione entre ícones de invocador oficiais da Riot (Poro, Barão Na'Shor, Pentakill, Desafiante, etc.).
- **Escalação das 5 Rotas**:
  - Topo (Top)
  - Selva (Jungle)
  - Meio (Mid)
  - Atirador (ADC)
  - Suporte (Support)
- **Modo Aleatório (RNG Run)**: Botão `🎲 Sortear 5 Campeões Aleatórios` para criar um desafio único a cada tentativa.
- **Atributos Dinâmicos**: O jogo calcula em tempo real o balanço de Dano, Tanque, Push de Torres, Utilidade/CC e Escalamento Late Game.

### 2. Chaveamento Eliminatório do CBLOL
- Formato clássico de Playoffs com 8 equipes (Quartas de Final, Semifinais e Grande Final).
- Times adversários autênticos: **paiN Gaming, LOUD, RED Canids, Vivo Keyd Stars, FURIA, KaBuM! e Fluxo**.
- As outras séries são simuladas automaticamente pela IA para compor as chaves seguintes.

### 3. Arena de Batalha com Estruturas
A partida não é apenas um texto estático — é uma arena visual com todas as estruturas do Summoner's Rift:
- **Torre T1 (Tier 1 Externa)**: 2500 HP
- **Torre T2 (Tier 2 Interior)**: 3200 HP
- **Torre T3 (Tier 3 Base)**: 3800 HP
- **Inibidor**: 4000 HP (quando destruído, libera Super Minions que dobram o dano de investida contra o inimigo!)
- **Torres Gêmeas do Nexus**: 3000 HP cada
- **NEXUS**: 5500 HP com animação estrondosa de explosão cósmica ao ser destruído!

### 4. Eventos e Mecânicas de Jogo
- Relógio de jogo com transições de fases (Fase de Rotas, Mid Game, Late Game).
- Disputa de Dragões Elementais e Barão Na'Shor dando buffs temporários.
- Killfeed detalhado com ícones dos campeões e golpes característicos.
- Controles de velocidade: `1x`, `2x`, `4x` e `⏩ Pular para o Final`.

### 5. Aprimoramentos Hextech (Sistema Roguelike)
Ao vencer cada fase, o jogador escolhe 1 entre 3 Aprimoramentos Hextech (ex: *Alma do Dragão Infernal*, *Mão do Barão Na'Shor*, *Chama do Ancião*) que fortalecem seus atributos para os próximos desafios.

### 6. Efeitos Sonoros Web Audio
Sons gerados pelo navegador para cliques mecânicos hextech, picks de campeão, dano em estruturas, queda de inibidores e a celebração da taça.
