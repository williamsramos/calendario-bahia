/* ===========================================================
   Calendário Tricolor EC Bahia — COM ESTATÍSTICAS AVANÇADAS
   + Suporte a Categorias (Masculino/Feminino)
   + Painel Exclusivo de Classificação 2027
   =========================================================== */

/* ===========================================================
   1. FUNÇÕES UTILITÁRIAS
   =========================================================== */

function cryptoId() { 
  return 'g_' + Math.random().toString(36).slice(2, 10); 
}

function slugify(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const StorageUtils = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Erro ao ler ${key} do localStorage:`, e);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Erro ao salvar ${key} no localStorage:`, e);
    }
  }
};

function parseDate(dstr, year) {
  if (!dstr) return new Date();
  const [d, m] = dstr.split("/").map(Number);
  return new Date(Number(year) || 2026, m - 1, d);
}

function fmtLongDate(dstr, year) {
  const dt = parseDate(dstr, year);
  return dt.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).replace(".", "");
}

function today() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

/* ===========================================================
   2. DADOS E ESTADO — TEMPORADA 2026 E 2027
   =========================================================== */

const listaAtualizadaDeGames = [
  // ==========================================
  // JOGOS DA TEMPORADA 2026
  // ==========================================
  
  // MASCULINO — BRASILEIRÃO · 1º TURNO
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "1ª Rodada", date: "28/01", year: "2026", team1: "corinthians", team2: "bahia", stadium: "Vila Belmiro", time: "20:00", score: "1 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "2ª Rodada", date: "05/02", year: "2026", team1: "bahia", team2: "fluminense", stadium: "Arena Fonte Nova", time: "19:00", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "3ª Rodada", date: "11/02", year: "2026", team1: "vasco", team2: "bahia", stadium: "São Januário", time: "21:30", score: "0 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "5ª Rodada", date: "11/03", year: "2026", team1: "bahia", team2: "vitoria", stadium: "Arena Fonte Nova", time: "20:00", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "6ª Rodada", date: "15/03", year: "2026", team1: "internacional", team2: "bahia", stadium: "Beira-Rio", time: "16:00", score: "0 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "7ª Rodada", date: "18/03", year: "2026", team1: "bahia", team2: "bragantino", stadium: "Arena Fonte Nova", time: "19:00", score: "2 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "8ª Rodada", date: "22/03", year: "2026", team1: "remo", team2: "bahia", stadium: "Mangueirão", time: "16:00", score: "4 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "9ª Rodada", date: "01/04", year: "2026", team1: "bahia", team2: "athletico-pr", stadium: "Arena Fonte Nova", time: "20:00", score: "3 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "10ª Rodada", date: "05/04", year: "2026", team1: "bahia", team2: "palmeiras", stadium: "Arena Fonte Nova", time: "19:30", score: "1 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "11ª Rodada", date: "11/04", year: "2026", team1: "mirassol", team2: "bahia", stadium: "Maião", time: "18:30", score: "1 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "12ª Rodada", date: "19/04", year: "2026", team1: "flamengo", team2: "bahia", stadium: "Maracanã", time: "19:30", score: "2 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "13ª Rodada", date: "25/04", year: "2026", team1: "bahia", team2: "santos", stadium: "Arena Fonte Nova", time: "18:30", score: "2 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "14ª Rodada", date: "03/05", year: "2026", team1: "sao-paulo", team2: "bahia", stadium: "Estadio Cicero Sousa de Marques", time: "16:00", score: "2 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "15ª Rodada", date: "09/05", year: "2026", team1: "bahia", team2: "cruzeiro", stadium: "Arena Fonte Nova", time: "21:00", score: "1 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "16ª Rodada", date: "17/05", year: "2026", team1: "bahia", team2: "gremio", stadium: "Arena Fonte Nova", time: "16:00", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "17ª Rodada", date: "25/05", year: "2026", team1: "coritiba", team2: "bahia", stadium: "Couto Pereira", time: "20:00", score: "3 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "18ª Rodada", date: "30/05", year: "2026", team1: "bahia", team2: "botafogo", stadium: "Arena Fonte Nova", time: "17:30", score: "2 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "4ª Rodada", date: "17/07", year: "2026", team1: "bahia", team2: "chapecoense", stadium: "Arena Fonte Nova", time: "19:30", score: "2 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "19ª Rodada", date: "21/07", year: "2026", team1: "atletico-mg", team2: "bahia", stadium: "Arena MRV", time: "19:30", score: "1 x 1" },

  // MASCULINO — AMISTOSOS
  { id: cryptoId(), category: "masculino", comp: "amistoso", round: "Amistoso", date: "04/07", year: "2026", team1: "bahia", team2: "montevideo-city", stadium: "Arena Fonte Nova", time: "11:00", score: "4 x 1" },
  { id: cryptoId(), category: "masculino", comp: "amistoso", round: "Amistoso", date: "12/07", year: "2026", team1: "fluminense", team2: "bahia", stadium: "Maracanã", time: "16:00", score: "2 x 0" },

  // MASCULINO — BRASILEIRÃO · 2º TURNO
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "20ª Rodada", date: "26/07", year: "2026", team1: "bahia", team2: "corinthians", stadium: "Arena Fonte Nova", time: "16:00", score: "1 x 1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "21ª Rodada", date: "29/07", year: "2026", team1: "fluminense", team2: "bahia", stadium: "Maracanã", time: "21:30", score: "0 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "22ª Rodada", date: "09/08", year: "2026", team1: "bahia", team2: "vasco", stadium: "Arena Fonte Nova", time: "16:00", score: "0 x 0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "23ª Rodada", date: "16/08", year: "2026", team1: "chapecoense", team2: "bahia", stadium: "Arena Condá", time: "11:00", score: "3 x 3" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "24ª Rodada", date: "23/08", year: "2026", team1: "vitoria", team2: "bahia", stadium: "Barradão", time: "16:00", score: "0 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "25ª Rodada", date: "30/08", year: "2026", team1: "bahia", team2: "internacional", stadium: "Arena Fonte Nova", time: "19:30", score: "3 x 2" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "26ª Rodada", date: "05/09", year: "2026", team1: "bragantino", team2: "bahia", stadium: "Nabizão", time: "16:00", score: "2x3" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "27ª Rodada", date: "14/09", year: "2026", team1: "bahia", team2: "remo", stadium: "Arena Fonte Nova", time: "20:00", score: "2x1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "28ª Rodada", date: "20/09", year: "2026", team1: "athletico-pr", team2: "bahia", stadium: "Ligga Arena", time: "19:30", score: "2x1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "29ª Rodada", date: "08/10", year: "2026", team1: "palmeiras", team2: "bahia", stadium: "Nubank Parque", time: "21:30", score: "1x0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "30ª Rodada", date: "11/10", year: "2026", team1: "bahia", team2: "mirassol", stadium: "Arena Fonte Nova", time: "19:30", score: "1x0" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "31ª Rodada", date: "18/10", year: "2026", team1: "bahia", team2: "flamengo", stadium: "Arena Fonte Nova", time: "18:30", score: "0x3" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "32ª Rodada", date: "24/10", year: "2026", team1: "santos", team2: "bahia", stadium: "Vila Belmiro", time: "21:00", score: "1x1" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "33ª Rodada", date: "28/10", year: "2026", team1: "bahia", team2: "sao-paulo", stadium: "Arena Fonte Nova", time: "21:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "34ª Rodada", date: "05/11", year: "2026", team1: "cruzeiro", team2: "bahia", stadium: "Minerão", time: "21:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "35ª Rodada", date: "18/11", year: "2026", team1: "gremio", team2: "bahia", stadium: "Arena do Grêmio", time: "19:30", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "36ª Rodada", date: "22/11", year: "2026", team1: "bahia", team2: "coritiba", stadium: "Arena Fonte Nova", time: "16:00", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "37ª Rodada", date: "29/11", year: "2026", team1: "botafogo", team2: "bahia", stadium: "Nilton Santos", time: "16:00", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "brasileiro", round: "38ª Rodada", date: "02/12", year: "2026", team1: "bahia", team2: "atletico-mg", stadium: "Arena Fonte Nova", time: "21:30", score: "x" },

  // MASCULINO — LIBERTADORES
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "2ª Fase (Ida)", date: "18/02", year: "2026", team1: "o-higgins", team2: "bahia", stadium: "El Teniente", time: "19:00", score: "1 x 0" },
  { id: cryptoId(), category: "masculino", comp: "libertadores", round: "2ª Fase (Volta)", date: "25/02", year: "2026", team1: "bahia", team2: "o-higgins", stadium: "Arena Fonte Nova (Pen. 3 x 4)", time: "19:00", score: "2 x 1" },

  // MASCULINO — COPA DO BRASIL
  { id: cryptoId(), category: "masculino", comp: "copadobrasil", round: "5ª Fase (Ida)", date: "22/04", year: "2026", team1: "bahia", team2: "remo", stadium: "Arena Fonte Nova", time: "19:00", score: "1 x 3" },
  { id: cryptoId(), category: "masculino", comp: "copadobrasil", round: "5ª Fase (Volta)", date: "13/05", year: "2026", team1: "remo", team2: "bahia", stadium: "Mangueirão", time: "21:30", score: "2 x 1" },

  // MASCULINO — BAIANO
  { id: cryptoId(), category: "masculino", comp: "baiano", round: "Final", date: "07/03", year: "2026", team1: "bahia", team2: "vitoria", stadium: "Arena Fonte Nova", time: "17:00", score: "2 x 1" },

  // ==========================================
  // JOGOS DA TEMPORADA 2027
  // ==========================================

  // MASCULINO — BAIANO
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "1ª rodada", date: "10/01", year: "2027", team1: "bahia", team2: "ssafc", stadium: "Arena Fonte Nova", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "2ª rodada", date: "13/01", year: "2027", team1: "jacuipense", team2: "bahia", stadium: "A definir", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "3ª rodada", date: "17/01", year: "2027", team1: "jequie", team2: "bahia", stadium: "A definir", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "4ª rodada", date: "20/01", year: "2027", team1: "bahia", team2: "juazeirense", stadium: "Arena Fonte Nova", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "5ª rodada", date: "24/01", year: "2027", team1: "bahia", team2: "vitoria", stadium: "Arena Fonte Nova", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "6ª rodada", date: "31/01", year: "2027", team1: "porto", team2: "bahia", stadium: "A definir", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "7ª rodada", date: "07/02", year: "2027", team1: "bahia", team2: "galicia", stadium: "Arena Fonte Nova", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "8ª rodada", date: "14/02", year: "2027", team1: "barcelona-ba", team2: "bahia", stadium: "A definir", time: "a definir", score: "x" },
  { id: cryptoId(), category: "masculino", comp: "baiano 27", round: "9ª rodada", date: "21/02", year: "2027", team1: "bahia", team2: "flu de feira", stadium: "Arena Fonte Nova", time: "a definir", score: "x" }
];

let games = StorageUtils.get("bahia_games", null);

// Sincroniza e remove duplicatas de forma estrita baseada nos dados oficiais
(function inicializarJogosUnicos() {
  const jogosArmazenados = games || [];
  const chaveUnica = g => [
    g.category || "masculino",
    g.year || "2026",
    String(g.comp || "").trim().toLowerCase(),
    String(g.round || "").trim().toLowerCase(),
    g.date,
    g.team1,
    g.team2
  ].join("|");

  const mapaUnicos = new Map();

  // Primeiro adiciona os jogos padrões da lista atualizada oficial
  listaAtualizadaDeGames.forEach(g => {
    mapaUnicos.set(chaveUnica(g), g);
  });

  // Depois mescla com os do localStorage (caso o usuário tenha cadastrado novos jogos manualmente)
  jogosArmazenados.forEach(g => {
    const chave = chaveUnica(g);
    if (!mapaUnicos.has(chave)) {
      mapaUnicos.set(chave, g);
    }
  });

  games = Array.from(mapaUnicos.values());
  StorageUtils.set("bahia_games", games);
})();

let editingGameId = null;
let activeCategory = "masculino";
let activeSeason = "2026";
let activeView = "calendario"; // 'calendario' | 'classificacao'
let activeClassificacaoComp = "baiano"; // 'baiano' | 'brasileiro' | 'libertadores'

function saveGames() {
  StorageUtils.set("bahia_games", games);
}

/* ===========================================================
   3. MAPEAMENTO DE ESCUDOS E EQUIPES
   =========================================================== */

const teamLogos = {
  "bahia": "img/bahia.png",
  "vitoria": "img/vitoria.png",
  "flamengo": "img/flamengo.png",
  "palmeiras": "img/palmeiras.png",
  "corinthians": "img/corinthians.png",
  "sao-paulo": "img/sao-paulo.jpg",
  "gremio": "img/gremio.png",
  "internacional": "img/internacional.png",
  "atletico-mg": "img/atletico-mg.png",
  "cruzeiro": "img/cruzeiro.svg",
  "botafogo": "img/botafogo.png",
  "fluminense": "img/fluminense.png",
  "athletico-pr": "img/athletico-pr.png",
  "santos": "img/santos.png",
  "bragantino": "img/bragantino.png",
  "vasco": "img/vasco.png",
  "coritiba": "img/coritiba.png",
  "chapecoense": "img/chapecoense.png",
  "remo": "img/remo.png",
  "mirassol": "img/mirassol.png",
  "o-higgins": "img/o-higgins.png",
  "montevideo-city": "img/montevideo-city.png",
  "porto": "img/porto_sc.png",
  "barcelona-ba": "img/barcelona-ba.png",
  "jacuipense": "img/jacuipense.png",
  "flu de feira": "img/flu-de-feira.png",
  "galicia": "img/galicia.png", 
  "jequie": "img/jequie.png",
  "ssafc": "img/ssa_fc.png",
  "juazeirense" : "img/juazeirense.png"
};

function getTeam(slug) {
  if (!slug) return { name: "Desconhecido", logo: "img/default.png" };
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const logo = teamLogos[slug] || 'img/default.png';
  return { name, logo };
}

/* ===========================================================
   3.1 DADOS DA CLASSIFICAÇÃO EXCLUSIVA 2027
   =========================================================== */

const classificacao2027Padrao = {
  baiano: [
    { slug: "bahia", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "barcelona-ba", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "flu de feira", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "galicia", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "jacuipense", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "jequie", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "juazeirense", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "porto", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "ssafc", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 },
    { slug: "vitoria", p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 }
  ],
  brasileiro: null,
  libertadores: null
};

let dadosClassificacao2027 = StorageUtils.get("bahia_classificacao_2027", classificacao2027Padrao);

function salvarClassificacao2027() {
  StorageUtils.set("bahia_classificacao_2027", dadosClassificacao2027);
}

/* ===========================================================
   4. COMPETIÇÕES
   =========================================================== */

const COMPS_MASCULINO = [
  { id: "todos",        label: "Todos" },
  { id: "brasileiro",   label: "Brasileiro Série A" },
  { id: "libertadores", label: "Libertadores" },
  { id: "copas",        label: "Copas", match: ["copadobrasil", "copadonordeste"] },
  { id: "estadual",     label: "Baiano", match: ["baiano"] },
  { id: "amistoso",     label: "Amistosos" },
];

const COMPS_MASCULINO_2027 = [
  { id: "todos",           label: "Todos" },
  { id: "brasileiro 27",   label: "Brasileiro Série A 27", match: [ "brasileiro 27"] },
  { id: "libertadores 27", label: "Libertadores 27",       match: [ "libertadores 27"] },
  { id: "copas 27",        label: "Copas",                 match: [ "copadobrasil 27",  "copadonordeste 27"] },
  { id: "estadual 27",     label: "Baiano",                match: [ "baiano 27"] },
  { id: "amistoso 27",     label: "Amistosos",             match: [ "amistoso 27"] },
];

const mandos = [
  { id: "todos", label: "Todos os Mandos" },
  { id: "casa", label: "Em Casa" },
  { id: "fora", label: "Fora de Casa" }
];

function getActiveComps() {
  return activeSeason === "2027" ? COMPS_MASCULINO_2027 : COMPS_MASCULINO;
}

let activeTab = "todos";
let activeSub = "todos";
let activeMandoFilter = "todos";
let searchTerm = "";

/* ===========================================================
   5. FILTRAGEM DE JOGOS E NAVEGAÇÃO ENTRE VIEWS
   =========================================================== */

function gamesForTab(tabId) {
  let list = games.filter(g => (g.category || "masculino") === activeCategory)
                  .filter(g => (g.year || "2026") === activeSeason);

  if (tabId !== "todos") {
    const currentComps = getActiveComps();
    const comp = currentComps.find(c => c.id === tabId);

    if (comp && comp.match) {
      list = list.filter(g => comp.match.includes(g.comp));
    } else {
      list = list.filter(g => g.comp === tabId || (tabId === "estadual" && g.comp === "baiano"));
    }
  }

  if (activeMandoFilter === "casa") {
    list = list.filter(g => g.team1 === "bahia");
  } else if (activeMandoFilter === "fora") {
    list = list.filter(g => g.team2 === "bahia");
  }

  return list;
}

function toggleViewClassificacao(view) {
  activeView = view;
  renderApp();
}

function setClassificacaoComp(comp) {
  activeClassificacaoComp = comp;
  renderPainelClassificacao2027();
}

function garantirBotaoClassificacaoMenu() {
  const nav = document.getElementById("tabsNav") || document.querySelector("header") || document.body;
  let btnWrap = document.getElementById("btnClassificacao2027Wrap");

  if (!btnWrap) {
    btnWrap = document.createElement("div");
    btnWrap.id = "btnClassificacao2027Wrap";
    btnWrap.className = "flex justify-end mb-4 px-2";
    const targetParent = document.getElementById("heroNext")?.parentNode || document.body;
    targetParent.insertBefore(btnWrap, document.getElementById("heroNext"));
  }

  if (activeSeason !== "2027") {
    btnWrap.classList.add("hidden");
    return;
  }

  btnWrap.classList.remove("hidden");
  btnWrap.innerHTML = `
    <div class="inline-flex rounded-xl bg-navy-900/90 border border-white/10 p-1 gap-1 shadow-lg">
      <button onclick="toggleViewClassificacao('calendario')" class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
        activeView === "calendario" ? "bg-gold text-navy-950" : "text-slate-400 hover:text-white"
      }">
        📅 Jogos & Agenda
      </button>
      <button onclick="toggleViewClassificacao('classificacao')" class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
        activeView === "classificacao" ? "bg-gold text-navy-950" : "text-slate-400 hover:text-white"
      }">
        🏆 Classificação 2027
      </button>
    </div>
  `;
}

function renderPainelClassificacao2027() {
  let sec = document.getElementById("secaoClassificacaoExclusiva2027");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "secaoClassificacaoExclusiva2027";
    sec.className = "max-w-4xl mx-auto px-3 sm:px-0 py-4 rise-in";
    const targetParent = document.getElementById("listsWrap")?.parentNode || document.body;
    targetParent.appendChild(sec);
  }

  if (activeSeason !== "2027" || activeView !== "classificacao") {
    sec.classList.add("hidden");
    return;
  }

  sec.classList.remove("hidden");

  const abasTorneios = [
    { id: "baiano", label: "Baiano 2027" },
    { id: "brasileiro", label: "Brasileiro Série A 2027" },
    { id: "libertadores", label: "Libertadores 2027" }
  ];

  const dadosAtuais = dadosClassificacao2027[activeClassificacaoComp];
  let conteudoTabela = "";

  if (!dadosAtuais) {
    conteudoTabela = `
      <div class="text-center py-12 text-slate-400">
        <p class="text-base font-semibold text-slate-300">⏳ Classificação não disponível no momento</p>
        <p class="text-xs text-slate-500 mt-1">Os dados para este torneio ainda não foram divulgados ou cadastrados para 2027.</p>
      </div>
    `;
  } else {
    const tabelaAtual = [...dadosAtuais].sort((a, b) => {
      if (b.p !== a.p) return b.p - a.p;
      if (b.v !== a.v) return b.v - a.v;
      const sgA = a.gp - a.gc;
      const sgB = b.gp - b.gc;
      if (sgB !== sgA) return sgB - sgA;
      return b.gp - a.gp;
    });

    conteudoTabela = `
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <th class="py-3 px-2 w-10 text-center">#</th>
              <th class="py-3 px-2">Time</th>
              <th class="py-3 px-2 text-center text-white font-bold">P</th>
              <th class="py-3 px-2 text-center">J</th>
              <th class="py-3 px-2 text-center">V</th>
              <th class="py-3 px-2 text-center">E</th>
              <th class="py-3 px-2 text-center">D</th>
              <th class="py-3 px-2 text-center">GP</th>
              <th class="py-3 px-2 text-center">GC</th>
              <th class="py-3 px-2 text-center">SG</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-xs sm:text-sm">
            ${tabelaAtual.map((item, idx) => {
              const team = getTeam(item.slug);
              const sg = item.gp - item.gc;
              const isBahia = item.slug === "bahia";
              return `
                <tr class="${isBahia ? "bg-blue-950/40 font-semibold" : "hover:bg-white/[0.02]"} transition-colors">
                  <td class="py-3 px-2 text-center font-mono text-slate-400">${idx + 1}</td>
                  <td class="py-3 px-2">
                    <div class="flex items-center gap-2.5">
                      <img src="${team.logo}" alt="${team.name}" class="w-6 h-6 object-contain shrink-0">
                      <span class="font-display ${isBahia ? "text-gold" : "text-slate-200"} truncate">${team.name}</span>
                    </div>
                  </td>
                  <td class="py-3 px-2 text-center font-mono font-bold text-white">${item.p}</td>
                  <td class="py-3 px-2 text-center font-mono text-slate-300">${item.j}</td>
                  <td class="py-3 px-2 text-center font-mono text-emerald-400">${item.v}</td>
                  <td class="py-3 px-2 text-center font-mono text-slate-400">${item.e}</td>
                  <td class="py-3 px-2 text-center font-mono text-red-400">${item.d}</td>
                  <td class="py-3 px-2 text-center font-mono text-slate-300">${item.gp}</td>
                  <td class="py-3 px-2 text-center font-mono text-slate-300">${item.gc}</td>
                  <td class="py-3 px-2 text-center font-mono ${sg > 0 ? "text-emerald-400" : sg < 0 ? "text-red-400" : "text-slate-400"}">
                    ${sg > 0 ? "+" + sg : sg}
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  sec.innerHTML = `
    <div class="rounded-2xl border border-white/10 bg-navy-900/80 backdrop-blur-md p-4 sm:p-6 shadow-xl">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <span class="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Tabela Oficial</span>
          <h2 class="font-display text-xl sm:text-2xl text-white font-bold">CLASSIFICAÇÃO 2027</h2>
        </div>
        <div class="flex flex-wrap gap-2">
          ${abasTorneios.map(t => `
            <button onclick="setClassificacaoComp('${t.id}')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              activeClassificacaoComp === t.id
                ? "bg-gold/15 border-gold text-gold shadow-sm"
                : "border-white/10 bg-navy-950/60 text-slate-400 hover:text-white"
            }">
              ${t.label}
            </button>
          `).join("")}
        </div>
      </div>
      ${conteudoTabela}
    </div>
  `;
}

function renderApp() {
  const emptyCard = document.getElementById("empty-card");
  const heroNext = document.getElementById("heroNext");
  const dashboardSection = document.getElementById("dashboardSection");
  const progressWrap = document.getElementById("progressWrap");
  const tabsNav = document.getElementById("tabsNav");
  const subFilterBar = document.getElementById("subFilterBar");
  const listsWrap = document.getElementById("listsWrap");
  const btnAdd = document.getElementById("btnAddGame");
  const btnAddMobile = document.getElementById("btnAddGameMobile");

  garantirBotaoClassificacaoMenu();

  const isClassificacao2027 = (activeSeason === "2027" && activeView === "classificacao");
  const hasSeasonGames = games.some(g => (g.year || "2026") === activeSeason);
  const isFutureSeason = !hasSeasonGames && !isClassificacao2027;

  if (emptyCard) emptyCard.classList.toggle("hidden", !isFutureSeason);
  if (heroNext) heroNext.classList.toggle("hidden", isFutureSeason || isClassificacao2027);
  if (dashboardSection) dashboardSection.classList.toggle("hidden", isFutureSeason || isClassificacao2027);
  if (progressWrap) progressWrap.classList.toggle("hidden", isFutureSeason || isClassificacao2027);
  if (tabsNav) tabsNav.classList.toggle("hidden", isFutureSeason || isClassificacao2027);
  if (subFilterBar) subFilterBar.classList.toggle("hidden", isFutureSeason || isClassificacao2027);
  if (listsWrap) listsWrap.classList.toggle("hidden", isFutureSeason || isClassificacao2027);

  if (btnAdd) btnAdd.style.display = (isFutureSeason || isClassificacao2027) ? "none" : "";
  if (btnAddMobile) btnAddMobile.style.display = (isFutureSeason || isClassificacao2027) ? "none" : "";

  renderPainelClassificacao2027();

  if (isClassificacao2027 || isFutureSeason) {
    if (countdownInterval) clearInterval(countdownInterval);
    return;
  }

  render();
}

function setSeason(season) {
  activeSeason = season;
  activeTab = "todos";
  activeView = "calendario";

  const btn2026 = document.getElementById("btnSeason2026");
  const btn2027 = document.getElementById("btnSeason2027");
  const activeClass = "flex-1 py-1 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 transition-all";
  const inactiveClass = "flex-1 py-1 text-xs font-bold rounded-lg text-slate-400 transition-all";

  if (btn2026) btn2026.className = season === "2026" ? activeClass : inactiveClass;
  if (btn2027) btn2027.className = season === "2027" ? activeClass : inactiveClass;

  renderApp();
}

/* ===========================================================
   6. ESTATÍSTICAS AVANÇADAS
   =========================================================== */

function calcularEstatisticasAvancadas(filtroComp = 'todos') {
  const jogosFiltrados = gamesForTab(filtroComp);
  const jogados = jogosFiltrados.filter(g => g.score && g.score.trim().toLowerCase() !== "x");

  if (jogados.length === 0) return null;

  const stats = {
    totalJogados: 0, vitoria: 0, empate: 0, derrota: 0,
    golsPro: 0, golsContra: 0, saldoGols: 0,
    casa_jogados: 0, casa_vitoria: 0, casa_empate: 0, casa_derrota: 0, casa_golsPro: 0, casa_golsContra: 0, casa_pontos: 0, casa_aproveitamento: 0,
    fora_jogados: 0, fora_vitoria: 0, fora_empate: 0, fora_derrota: 0, fora_golsPro: 0, fora_golsContra: 0, fora_pontos: 0, fora_aproveitamento: 0,
    cleanSheets: 0, ataqueBranco: 0, ambasMarcam: 0,
    ultimosJogos: [], maiorSequenciaVitorias: 0, maiorSequenciaInvencibilidade: 0,
    mediaGolsPro: 0, mediaGolsContra: 0,
  };

  jogados.forEach(jogo => {
    const cleanScore = jogo.score.split("(")[0].trim();
    const scores = cleanScore.toLowerCase().split("x").map(s => parseInt(s.trim(), 10));

    if (scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
      const [s1, s2] = scores;
      const bahiaEmCasa = jogo.team1 === "bahia";
      const golsBahia = bahiaEmCasa ? s1 : s2;
      const golsAdv = bahiaEmCasa ? s2 : s1;

      let resultado = '';
      if (golsBahia > golsAdv) { stats.vitoria++; resultado = 'V'; }
      else if (golsBahia < golsAdv) { stats.derrota++; resultado = 'D'; }
      else { stats.empate++; resultado = 'E'; }

      stats.ultimosJogos.push(resultado);
      stats.totalJogados++;
      stats.golsPro += golsBahia;
      stats.golsContra += golsAdv;

      if (bahiaEmCasa) {
        stats.casa_jogados++;
        stats.casa_golsPro += golsBahia;
        stats.casa_golsContra += golsAdv;
        if (golsBahia > golsAdv) { stats.casa_vitoria++; stats.casa_pontos += 3; }
        else if (golsBahia === golsAdv) { stats.casa_empate++; stats.casa_pontos += 1; }
        else { stats.casa_derrota++; }
      } else {
        stats.fora_jogados++;
        stats.fora_golsPro += golsBahia;
        stats.fora_golsContra += golsAdv;
        if (golsBahia > golsAdv) { stats.fora_vitoria++; stats.fora_pontos += 3; }
        else if (golsBahia === golsAdv) { stats.fora_empate++; stats.fora_pontos += 1; }
        else { stats.fora_derrota++; }
      }

      if (golsAdv === 0) stats.cleanSheets++;
      if (golsBahia === 0) stats.ataqueBranco++;
      if (golsBahia > 0 && golsAdv > 0) stats.ambasMarcam++;
    }
  });

  if (stats.ultimosJogos.length > 5) stats.ultimosJogos = stats.ultimosJogos.slice(-5);

  stats.saldoGols = stats.golsPro - stats.golsContra;
  stats.mediaGolsPro = stats.totalJogados ? (stats.golsPro / stats.totalJogados).toFixed(2) : 0;
  stats.mediaGolsContra = stats.totalJogados ? (stats.golsContra / stats.totalJogados).toFixed(2) : 0;
  stats.casa_aproveitamento = stats.casa_jogados ? ((stats.casa_vitoria * 3 + stats.casa_empate) / (stats.casa_jogados * 3) * 100).toFixed(1) : 0;
  stats.fora_aproveitamento = stats.fora_jogados ? ((stats.fora_vitoria * 3 + stats.fora_empate) / (stats.fora_jogados * 3) * 100).toFixed(1) : 0;
  stats.maiorSequenciaVitorias = calcularMaiorSequencia(stats.ultimosJogos, 'V');
  stats.maiorSequenciaInvencibilidade = calcularMaiorSequencia(stats.ultimosJogos, ['V', 'E']);

  return stats;
}

function calcularMaiorSequencia(resultados, filtro) {
  if (resultados.length === 0) return 0;
  const filtroArray = Array.isArray(filtro) ? filtro : [filtro];
  let maiorSeq = 0, seqAtual = 0;
  resultados.forEach(r => {
    if (filtroArray.includes(r)) { seqAtual++; maiorSeq = Math.max(maiorSeq, seqAtual); }
    else { seqAtual = 0; }
  });
  return maiorSeq;
}

function renderizarEstatisticasAvancadas() {
  const container = document.getElementById('dashboardEstatisticasAvancadas');
  if (!container) return;

  const stats = calcularEstatisticasAvancadas(activeTab === 'todos' ? 'todos' : activeTab);
  if (!stats) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400 text-sm"><p>⏳ Nenhum jogo com placar definido ainda</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <h3 class="font-display text-sm text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-gold"></span> Desempenho e Mando de Campo
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">📍 Em Casa</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center"><span class="text-slate-400">Jogos:</span><span class="text-sm font-bold text-white">${stats.casa_jogados}</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Apr:</span><span class="text-sm font-bold text-gold">${stats.casa_aproveitamento}%</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Pontos:</span><span class="text-sm font-bold text-emerald-400">${stats.casa_pontos}</span></div>
          </div>
        </div>
        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">🛣️ Fora de Casa</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center"><span class="text-slate-400">Jogos:</span><span class="text-sm font-bold text-white">${stats.fora_jogados}</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Apr:</span><span class="text-sm font-bold text-gold">${stats.fora_aproveitamento}%</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Pontos:</span><span class="text-sm font-bold text-emerald-400">${stats.fora_pontos}</span></div>
          </div>
        </div>
        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">🛡️ Defesa</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center"><span class="text-slate-400">Clean Sheets:</span><span class="text-sm font-bold text-emerald-400">${stats.cleanSheets}</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Média GC:</span><span class="text-sm font-bold text-slate-300">${stats.mediaGolsContra}</span></div>
          </div>
        </div>
        <div class="bg-navy-900/60 border border-navy-700/60 rounded-xl p-4">
          <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">⚽ Ataque</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between items-center"><span class="text-slate-400">Ataque Branco:</span><span class="text-sm font-bold text-red-400">${stats.ataqueBranco}</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-400">Média GP:</span><span class="text-sm font-bold text-amber-400">${stats.mediaGolsPro}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ===========================================================
   7. CONTADOR REGRESSIVO E HERO
   =========================================================== */

let countdownInterval = null;

function startCountdown(nextGameDate, timeStr, gameYear) {
  if (countdownInterval) clearInterval(countdownInterval);
  const timerEl = document.getElementById("heroCountdown");
  if (!timerEl) return;

  const [d, m] = nextGameDate.split("/").map(Number);
  const year = Number(gameYear) || 2026;
  const [hh, mm] = ((/^\d{1,2}:\d{2}$/.test(timeStr || "") ? timeStr : "20:00")).split(":").map(Number);
  const targetTime = new Date(year, m - 1, d, hh, mm, 0).getTime();

  function update() {
    const diff = targetTime - new Date().getTime();
    if (diff <= 0) {
      timerEl.innerHTML = `<span class="text-gold font-bold">Jogo em andamento ou encerrado!</span>`;
      clearInterval(countdownInterval);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.innerHTML = `
      <div class="flex items-center gap-1.5 font-mono text-xs sm:text-sm text-gold">
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${days}d</span>:
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${String(hours).padStart(2, '0')}h</span>:
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${String(minutes).padStart(2, '0')}m</span>:
        <span class="bg-navy-950/80 px-2 py-1 rounded border border-white/10 font-bold">${String(seconds).padStart(2, '0')}s</span>
      </div>`;
  }
  update();
  countdownInterval = setInterval(update, 1000);
}

function getNextGame() {
  return gamesForTab(activeTab === 'todos' ? 'todos' : activeTab)
    .filter(g => !g.score || g.score.trim().toLowerCase() === "x")
    .sort((a, b) => parseDate(a.date, a.year) - parseDate(b.date, b.year))[0] || null;
}

function renderHero() {
  const box = document.getElementById("heroNext");
  if (!box) return;

  const next = getNextGame();
  if (!next) { box.innerHTML = ""; box.classList.add("hidden"); if (countdownInterval) clearInterval(countdownInterval); return; }
  
  box.classList.remove("hidden");
  const t1 = getTeam(next.team1), t2 = getTeam(next.team2);

  box.innerHTML = `
    <div class="ticket next-game rise-in rounded-2xl border border-navy-600/60 px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-navy-900/80 backdrop-blur-md">
      <div class="flex flex-col items-center sm:items-start gap-2 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
          <span class="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Próximo Jogo</span>
        </div>
        <div id="heroCountdown" class="mt-1"></div>
      </div>
      <div class="flex items-center gap-3 sm:gap-6 flex-1 justify-center w-full min-w-0">
        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span class="font-display text-xs sm:text-lg text-slate-200 truncate text-right">${t1.name}</span>
          <img src="${t1.logo}" alt="${t1.name}" class="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0">
        </div>
        <span class="font-display text-slate-500 text-sm shrink-0">vs</span>
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <img src="${t2.logo}" alt="${t2.name}" class="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0">
          <span class="font-display text-xs sm:text-lg text-slate-200 truncate">${t2.name}</span>
        </div>
      </div>
      <div class="text-center sm:text-right shrink-0">
        <p class="font-mono text-xs text-slate-400">${fmtLongDate(next.date, next.year)} · ${next.time || "--:--"}</p>
        <p class="text-[11px] text-slate-500 mt-0.5">${next.stadium || "Estádio a definir"}</p>
      </div>
    </div>`;

  startCountdown(next.date, next.time, next.year);
}

/* ===========================================================
   8. DASHBOARD DE ESTATÍSTICAS BÁSICAS
   =========================================================== */

function renderDashboard() {
  const compLabel = getActiveComps().find(c => c.id === activeTab)?.label || "Geral";
  const titleEl = document.getElementById("dashboardTitle");
  if (titleEl) titleEl.textContent = `Desempenho · ${compLabel}`;
  renderizarEstatisticasAvancadas();
}

function renderProgress() {
  const list = gamesForTab(activeTab);
  const total = list.length;
  const jogados = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x").length;
  const pct = total ? Math.round((jogados / total) * 100) : 0;

  const labelEl = document.getElementById("progressLabel");
  const pctEl = document.getElementById("progressPct");
  const fillEl = document.getElementById("progressFill");
  const wrapEl = document.getElementById("progressWrap");

  if (labelEl) labelEl.textContent = `${jogados} de ${total} jogos disputados`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (wrapEl) wrapEl.classList.toggle("hidden", total === 0);
}

function renderTabs() {
  const bar = document.getElementById("tabBar");
  if (!bar) return;
  bar.innerHTML = "";

  const comps = getActiveComps();
  comps.forEach(c => {
    const count = gamesForTab(c.id).length;
    const btn = document.createElement("button");
    btn.className = `relative shrink-0 pb-1 text-sm font-semibold font-display tracking-wide transition-colors ${
      activeTab === c.id ? "text-gold border-b-2 border-gold" : "text-slate-400 hover:text-slate-200"
    }`;
    btn.innerHTML = `${c.label} <span class="text-[11px] font-mono ml-1 ${activeTab === c.id ? 'text-gold' : 'text-slate-500'}">${count}</span>`;
    btn.onclick = () => { activeTab = c.id; render(); };
    bar.appendChild(btn);
  });
}

function renderSubFilters() {
  const bar = document.getElementById("subFilterBar");
  if (!bar) return;

  const opts = [
    { id: "todos", label: "Todos" },
    { id: "recentes", label: "Resultados" },
    { id: "proximos", label: "Próximos" },
  ];
  bar.innerHTML = "";

  opts.forEach(o => {
    const btn = document.createElement("button");
    const isActive = activeSub === o.id;
    btn.className = `text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
      isActive ? "bg-gold text-navy-950 border-gold" : "border-navy-700 text-slate-400 hover:border-slate-500"
    }`;
    btn.textContent = o.label;
    btn.onclick = () => { activeSub = o.id; render(); };
    bar.appendChild(btn);
  });
  renderMandoFilters();
}

function renderMandoFilters() {
  const mandoContainer = document.getElementById("mandoFilterBar");
  if (!mandoContainer) return;

  mandoContainer.innerHTML = mandos.map(m => `
    <button onclick="setMandoFilter('${m.id}')" class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
      activeMandoFilter === m.id ? "bg-navy-800 text-gold border-gold" : "border-navy-700/50 text-slate-400 hover:text-slate-200"
    }">
      ${m.label}
    </button>
  `).join("");
}

function setMandoFilter(type) {
  activeMandoFilter = type;
  render();
}

function renderCard(g, isNext) {
  const played = g.score && g.score.trim().toLowerCase() !== "x";
  const t1 = getTeam(g.team1), t2 = getTeam(g.team2);
  const compObj = getActiveComps().find(c => c.id === g.comp || (c.match && c.match.includes(g.comp)));
  const compLabel = compObj ? compObj.label : g.comp;
  const exibeCentro = played ? g.score : (g.time || "--:--");

  return `
  <div class="ticket ${isNext ? "border-gold" : "border-white/10"} bg-navy-900/65 backdrop-blur-md rise-in rounded-xl overflow-hidden flex border group mb-3">
    <div class="w-20 sm:w-28 shrink-0 flex flex-col items-center justify-center py-4 bg-navy-950/50">
      <span class="font-mono text-[10px] text-slate-400 uppercase">${fmtLongDate(g.date, g.year).split(" ")[0]}</span>
      <span class="font-display text-xl sm:text-2xl text-white font-semibold leading-none mt-0.5">${g.date.split("/")[0]}</span>
      <span class="font-mono text-[10px] text-slate-400 uppercase mt-0.5">${fmtLongDate(g.date, g.year).split(" ").slice(1).join(" ")}</span>
    </div>
    <div class="flex-1 px-3 sm:px-5 py-4 min-w-0 flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-[10px] sm:text-[11px] font-semibold text-gold uppercase tracking-wider truncate mr-1">
          ${compLabel} <span class="text-slate-400 font-normal">• ${g.round || "Rodada"}</span>
          ${isNext ? '<span class="ml-2 text-gold">★ Próximo</span>' : ""}
        </p>
        <div class="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button onclick="editGame('${g.id}')" class="text-slate-400 hover:text-gold p-1" title="Editar jogo">✏️</button>
          <button onclick="deleteGame('${g.id}')" class="text-slate-500 hover:text-red-400 p-1" title="Remover jogo">🗑️</button>
        </div>
      </div>
      <div class="flex items-center justify-between my-2">
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <img src="${t1.logo}" alt="${t1.name}" class="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0">
          <span class="font-display text-xs sm:text-sm text-slate-200 truncate">${t1.name}</span>
        </div>
        <div class="px-3 py-1 rounded bg-navy-950 font-mono text-sm font-bold text-white shrink-0 border border-white/5 flex items-center justify-center">
          ${exibeCentro}
        </div>
        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span class="font-display text-xs sm:text-sm text-slate-200 truncate text-right">${t2.name}</span>
          <img src="${t2.logo}" alt="${t2.name}" class="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0">
        </div>
      </div>
      <p class="text-[11px] text-slate-400 font-mono">${g.stadium || "Estádio não informado"}</p>
    </div>
  </div>`;
}

function renderLists() {
  const list = gamesForTab(activeTab).filter(jogoCombinaComBusca);
  const nextGame = getNextGame();

  const recentes = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x");
  const proximos = list.filter(g => !g.score || g.score.trim().toLowerCase() === "x");

  const secRecentes = document.getElementById("section-recentes");
  const secProximos = document.getElementById("section-proximos");
  const containerRecentes = document.getElementById("listRecentes");
  const containerProximos = document.getElementById("listProximos");
  const emptyState = document.getElementById("emptyState");

  if (containerRecentes) {
    containerRecentes.innerHTML = recentes.map(g => renderCard(g, false)).join("");
    if (secRecentes) secRecentes.classList.toggle("hidden", activeSub === "proximos" || recentes.length === 0);
  }

  if (containerProximos) {
    containerProximos.innerHTML = proximos.map(g => renderCard(g, nextGame && g.id === nextGame.id)).join("");
    if (secProximos) secProximos.classList.toggle("hidden", activeSub === "recentes" || proximos.length === 0);
  }

  if (emptyState) {
    const totalVisible = (activeSub === "recentes" ? recentes.length : activeSub === "proximos" ? proximos.length : list.length);
    emptyState.classList.toggle("hidden", totalVisible > 0);
  }
}

function jogoCombinaComBusca(g) {
  const termos = String(searchTerm || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/).filter(Boolean);
  if (!termos.length) return true;
  const compObj = getActiveComps().find(c => c.id === g.comp || (c.match && c.match.includes(g.comp)));
  const texto = String([
    getTeam(g.team1).name, g.team1,
    getTeam(g.team2).name, g.team2,
    compObj ? compObj.label : g.comp,
    g.round, g.stadium, g.date, g.score
  ].join(" ")).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return termos.every(t => texto.includes(t));
}

function initBuscaJogos() {
  const listsWrap = document.getElementById("listsWrap");
  if (!listsWrap || document.getElementById("buscaJogos")) return;

  const box = document.createElement("div");
  box.className = "mb-4";
  box.innerHTML = `
    <input id="buscaJogos" type="search" autocomplete="off"
      placeholder="Buscar jogo do Bahia (adversário, rodada, estádio, data...)"
      class="w-full px-4 py-2.5 rounded-xl bg-navy-950/50 border border-slate-700/60 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold transition-colors">`;
  listsWrap.insertBefore(box, listsWrap.firstChild);

  document.getElementById("buscaJogos").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderLists();
  });
}

/* ===========================================================
   9. TEMA E CATEGORIAS
   =========================================================== */

function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggleBtn");
  const currentTheme = StorageUtils.get("bahia_theme", "dark");
  if (currentTheme === "light") document.documentElement.classList.add("light-theme");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.toggle("light-theme");
      StorageUtils.set("bahia_theme", isLight ? "light" : "dark");
    });
  }
}

function deleteGame(id) {
  games = games.filter(g => g.id !== id);
  saveGames();
  render();
}

function editGame(id) {
  const game = games.find(g => g.id === id);
  if (!game) return;
  editingGameId = id;

  const modalTitle = document.getElementById("modalTitle");
  const submitLabel = document.getElementById("submitLabel");
  if (modalTitle) modalTitle.textContent = "Editar jogo";
  if (submitLabel) submitLabel.textContent = "Atualizar jogo";

  if (document.getElementById("fComp")) document.getElementById("fComp").value = (game.comp || "brasileiro").replace(/ 27$/, "");
  if (document.getElementById("fRound")) document.getElementById("fRound").value = game.round || "";
  if (document.getElementById("fTime")) document.getElementById("fTime").value = game.time || "20:00";
  if (document.getElementById("fStadium")) document.getElementById("fStadium").value = game.stadium || "";
  if (document.getElementById("fScore")) document.getElementById("fScore").value = game.score || "x";

  if (game.date && game.date.includes("/") && document.getElementById("fDate")) {
    const [d, m] = game.date.split("/");
    document.getElementById("fDate").value = `${game.year || "2026"}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  const emCasa = game.team1 === "bahia";
  const rivalSlug = emCasa ? game.team2 : game.team1;
  if (document.getElementById("fRival")) document.getElementById("fRival").value = getTeam(rivalSlug).name;

  document.querySelectorAll(".mando-btn").forEach(btn => {
    const isCasaBtn = btn.dataset.mando === "casa";
    const isActive = (emCasa && isCasaBtn) || (!emCasa && !isCasaBtn);
    btn.className = isActive 
      ? "mando-btn active flex-1 py-2 rounded-xl text-xs font-semibold border border-rose-600 bg-rose-950/40 text-white transition-all"
      : "mando-btn flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 bg-navy-950/50 text-slate-300 hover:text-white transition-all";
  });

  const modal = document.getElementById("modalOverlay");
  if (modal) modal.classList.remove("hidden");
}

function render() {
  renderHero();
  renderDashboard();
  renderProgress();
  renderTabs();
  renderSubFilters();
  renderLists();
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  renderApp();
  initBuscaJogos();

  const modal = document.getElementById("modalOverlay");
  const btnAdd = document.getElementById("btnAddGame");
  const btnAddMobile = document.getElementById("btnAddGameMobile");
  const btnClose = document.getElementById("btnCloseModal");
  const gameForm = document.getElementById("gameForm");

  const openModal = () => {
    editingGameId = null;
    if (document.getElementById("modalTitle")) document.getElementById("modalTitle").textContent = "Adicionar jogo";
    if (document.getElementById("submitLabel")) document.getElementById("submitLabel").textContent = "Salvar jogo";
    if (gameForm) gameForm.reset();
    if (modal) modal.classList.remove("hidden");
  };

  const closeModal = () => {
    editingGameId = null;
    if (modal) modal.classList.add("hidden");
  };

  if (btnAdd) btnAdd.addEventListener("click", openModal);
  if (btnAddMobile) btnAddMobile.addEventListener("click", openModal);
  if (btnClose) btnClose.addEventListener("click", closeModal);

  if (gameForm) {
    gameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let comp = document.getElementById("fComp").value;
      const round = document.getElementById("fRound").value || "Rodada";
      const dateRaw = document.getElementById("fDate").value;
      const time = document.getElementById("fTime").value || "20:00";
      const rival = slugify(document.getElementById("fRival").value || "Adversario");
      const stadium = document.getElementById("fStadium").value || "Fonte Nova";
      const score = document.getElementById("fScore").value.trim() || "x";

      let dateFmt = "01/01", yearFmt = activeSeason;
      if (dateRaw) {
        const parts = dateRaw.split("-");
        dateFmt = `${parts[2]}/${parts[1]}`;
        yearFmt = parts[0];
      }
      if (yearFmt === "2027" && activeCategory === "masculino" && !/ 27$/.test(comp)) {
        comp = comp + " 27";
      }

      const mandoBtn = document.querySelector(".mando-btn.active");
      const emCasa = mandoBtn ? mandoBtn.dataset.mando === "casa" : true;

      if (editingGameId) {
        const index = games.findIndex(g => g.id === editingGameId);
        if (index !== -1) {
          games[index] = {
            ...games[index], comp, round, date: dateFmt, year: yearFmt, time,
            team1: emCasa ? "bahia" : rival, team2: emCasa ? rival : "bahia", stadium, score
          };
        }
      } else {
        games.push({
          id: cryptoId(), category: activeCategory, comp, round, date: dateFmt, year: yearFmt, time,
          team1: emCasa ? "bahia" : rival, team2: emCasa ? rival : "bahia", stadium, score
        });
      }

      saveGames();
      closeModal();
      gameForm.reset();
      render();
    });
  }
});
