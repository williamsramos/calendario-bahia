/* ===========================================================
   Calendário Tricolor — EC Bahia (Script Completo Atualizado)
   =========================================================== */

/* ===========================================================
   1. FUNÇÕES UTILITÁRIAS (UTILS INTEGRADO)
   =========================================================== */

/**
 * Gera um ID único simples
 */
function cryptoId() { 
  return 'g_' + Math.random().toString(36).slice(2, 10); 
}

/**
 * Transforma strings em slugs seguros para URLs/classes/chaves
 */
function slugify(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Helper para manipular LocalStorage com fallback de segurança
 */
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

/**
 * Formatação de datas
 */
function parseDate(dstr) {
  if (!dstr) return new Date();
  const [d, m] = dstr.split("/").map(Number);
  const year = m >= 7 ? 2026 : 2027; 
  return new Date(year, m - 1, d);
}

function fmtLongDate(dstr) {
  const dt = parseDate(dstr);
  return dt.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).replace(".", "");
}

function today() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}


/* ===========================================================
   2. DADOS E ESTADO DA APLICAÇÃO
   =========================================================== */

// Lista padrão de jogos do Bahia para 2026
const listaAtualizadaDeGames = [
  // BRASILEIRÃO · 1º TURNO
  { id: cryptoId(), comp: "brasileiro", round: "1ª Rodada", date: "28/01", team1: "corinthians", team2: "bahia", stadium: "Vila Belmiro", time: "20:00", score: "1 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "2ª Rodada", date: "05/02", team1: "bahia", team2: "fluminense", stadium: "Arena Fonte Nova", time: "19:00", score: "1 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "3ª Rodada", date: "11/02", team1: "vasco", team2: "bahia", stadium: "São Januário", time: "21:30", score: "0 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "5ª Rodada", date: "11/03", team1: "bahia", team2: "vitoria", stadium: "Arena Fonte Nova", time: "20:00", score: "1 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "6ª Rodada", date: "15/03", team1: "internacional", team2: "bahia", stadium: "Beira-Rio", time: "16:00", score: "0 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "7ª Rodada", date: "18/03", team1: "bahia", team2: "bragantino", stadium: "Arena Fonte Nova", time: "19:00", score: "2 x 0" },
  { id: cryptoId(), comp: "brasileiro", round: "8ª Rodada", date: "22/03", team1: "remo", team2: "bahia", stadium: "Mangueirão", time: "16:00", score: "4 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "9ª Rodada", date: "01/04", team1: "bahia", team2: "athletico-pr", stadium: "Arena Fonte Nova", time: "20:00", score: "3 x 0" },
  { id: cryptoId(), comp: "brasileiro", round: "10ª Rodada", date: "05/04", team1: "bahia", team2: "palmeiras", stadium: "Arena Fonte Nova", time: "19:30", score: "1 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "11ª Rodada", date: "11/04", team1: "mirassol", team2: "bahia", stadium: "Maião", time: "18:30", score: "1 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "12ª Rodada", date: "19/04", team1: "flamengo", team2: "bahia", stadium: "Maracanã", time: "19:30", score: "2 x 0" },
  { id: cryptoId(), comp: "brasileiro", round: "13ª Rodada", date: "25/04", team1: "bahia", team2: "santos", stadium: "Arena Fonte Nova", time: "18:30", score: "2 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "14ª Rodada", date: "03/05", team1: "sao-paulo", team2: "bahia", stadium: "Estadio Cicero Sousa de Marques", time: "16:00", score: "2 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "15ª Rodada", date: "09/05", team1: "bahia", team2: "cruzeiro", stadium: "Arena Fonte Nova", time: "21:00", score: "1 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "16ª Rodada", date: "17/05", team1: "bahia", team2: "gremio", stadium: "Arena Fonte Nova", time: "16:00", score: "1 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "17ª Rodada", date: "25/05", team1: "coritiba", team2: "bahia", stadium: "Couto Pereira", time: "20:00", score: "3 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "18ª Rodada", date: "30/05", team1: "bahia", team2: "botafogo", stadium: "Arena Fonte Nova", time: "17:30", score: "2 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "4ª Rodada", date: "17/07", team1: "bahia", team2: "chapecoense", stadium: "Arena Fonte Nova", time: "19:30", score: "2 x 0" },
  { id: cryptoId(), comp: "brasileiro", round: "19ª Rodada", date: "21/07", team1: "atletico-mg", team2: "bahia", stadium: "Arena MRV", time: "19:30", score: "1 x 1" },

  // AMISTOSOS
  { id: cryptoId(), comp: "amistoso", round: "Amistoso", date: "04/07", team1: "bahia", team2: "montevideo-city", stadium: "Arena Fonte Nova", time: "11:00", score: "4 x 1" },
  { id: cryptoId(), comp: "amistoso", round: "Amistoso", date: "12/07", team1: "fluminense", team2: "bahia", stadium: "Maracanã", time: "16:00", score: "2 x 0" },

  // BRASILEIRÃO · 2º TURNO
  { id: cryptoId(), comp: "brasileiro", round: "20ª Rodada", date: "26/07", team1: "bahia", team2: "corinthians", stadium: "Arena Fonte Nova", time: "16:00", score: "1 x 1" },
  { id: cryptoId(), comp: "brasileiro", round: "21ª Rodada", date: "29/07", team1: "fluminense", team2: "bahia", stadium: "Maracanã", time: "21:30", score: "0 x 0" },
  { id: cryptoId(), comp: "brasileiro", round: "22ª Rodada", date: "09/08", team1: "bahia", team2: "vasco", stadium: "Arena Fonte Nova", time: "16:00", score: "0 x 0" },
  { id: cryptoId(), comp: "brasileiro", round: "23ª Rodada", date: "16/08", team1: "chapecoense", team2: "bahia", stadium: "Arena Condá", time: "11:00", score: "3 x 3" },
  { id: cryptoId(), comp: "brasileiro", round: "24ª Rodada", date: "23/08", team1: "vitoria", team2: "bahia", stadium: "Barradão", time: "16:00", score: "0 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "25ª Rodada", date: "30/08", team1: "bahia", team2: "internacional", stadium: "Arena Fonte Nova", time: "19:30", score: "3 x 2" },
  { id: cryptoId(), comp: "brasileiro", round: "26ª Rodada", date: "05/09", team1: "bragantino", team2: "bahia", stadium: "Nabizão", time: "16:00", score: "x" },
  { id: cryptoId(), comp: "brasileiro", round: "27ª Rodada", date: "14/09", team1: "bahia", team2: "remo", stadium: "Arena Fonte Nova", time: "20:00", score: "x" },
  { id: cryptoId(), comp: "brasileiro", round: "28ª Rodada", date: "20/09", team1: "athletico-pr", team2: "bahia", stadium: "Ligga Arena", time: "19:30", score: "x" },
  { id: cryptoId(), comp: "brasileiro", round: "29ª Rodada", date: "08/10", team1: "palmeiras", team2: "bahia", stadium: "Allianz Parque", time: "21:30", score: "x" },
  { id: cryptoId(), comp: "brasileiro", round: "30ª Rodada", date: "11/10", team1: "bahia", team2: "mirassol", stadium: "Arena Fonte Nova", time: "19:30", score: "x" },

  // LIBERTADORES
  { id: cryptoId(), comp: "libertadores", round: "2ª Fase (Ida)", date: "18/02", team1: "o-higgins", team2: "bahia", stadium: "El Teniente", time: "19:00", score: "1 x 0" },
  { id: cryptoId(), comp: "libertadores", round: "2ª Fase (Volta)", date: "25/02", team1: "bahia", team2: "o-higgins", stadium: "Arena Fonte Nova", time: "19:00", score: "2 x 1 (3 x 4)" },

  // COPA DO BRASIL
  { id: cryptoId(), comp: "copadobrasil", round: "5ª Fase (Ida)", date: "22/04", team1: "bahia", team2: "remo", stadium: "Arena Fonte Nova", time: "19:00", score: "1 x 3" },
  { id: cryptoId(), comp: "copadobrasil", round: "5ª Fase (Volta)", date: "13/05", team1: "remo", team2: "bahia", stadium: "Mangueirão", time: "21:30", score: "2 x 1" },

  // BAIANO
{ id: cryptoId(), comp: "baiano", round: "Final", date: "07/03", team1: "bahia", team2: "vitoria", stadium: "Arena Fonte Nova", time: "17:00", score: "2 x 1" },
];

// Carregar do localStorage
let games = StorageUtils.get("bahia_games", listaAtualizadaDeGames);
let editingGameId = null;

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
  "montevideo-city": "img/montevideo-city.png"
};

function getTeam(slug) {
  if (!slug) return { name: "Desconhecido", logo: "img/default.png" };
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const logo = teamLogos[slug] || 'img/default.png';

  return { name, logo };
}

/* ===========================================================
   4. COMPETIÇÕES E FILTROS DE MANDO
   =========================================================== */

const COMPS = [
  { id: "todos",       label: "Todos" },
  { id: "brasileiro",  label: "Brasileiro Série A" },
  { id: "libertadores", label: "Libertadores" },
  { id: "copas",       label: "Copas", match: ["copadobrasil", "copadonordeste"] },
  { id: "estadual",    label: "Baiano", match: ["baiano"] },
  { id: "amistoso",    label: "Amistosos" },
];


let activeTab = "todos";
let activeSub = "todos";
let activeMandoFilter = "todos"; // "todos" | "casa" | "fora"

function gamesForTab(tabId) {
  let list = games;
  
  if (tabId !== "todos") {
    const comp = COMPS.find(c => c.id === tabId);
    
    if (comp && comp.match) {
      list = games.filter(g => comp.match.includes(g.comp));
    } else {
      list = games.filter(g => g.comp === tabId || (tabId === "estadual" && g.comp === "baiano"));
    }
  }

  return list;
}

/* ===========================================================
   5. CONTADOR REGRESSIVO E HERO REVISADO
   =========================================================== */

let countdownInterval = null;

function startCountdown(nextGameDate, timeStr) {
  if (countdownInterval) clearInterval(countdownInterval);

  const timerEl = document.getElementById("heroCountdown");
  if (!timerEl) return;

  const [d, m] = nextGameDate.split("/").map(Number);
  const year = m >= 7 ? 2026 : 2027;
  const [hh, mm] = (timeStr || "20:00").split(":").map(Number);
  const targetTime = new Date(year, m - 1, d, hh, mm, 0).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      timerEl.innerHTML = `<span class="text-gold font-bold">Jogo em andamento!</span>`;
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
  return games
    .filter(g => !g.score || g.score.trim().toLowerCase() === "x")
    .sort((a, b) => parseDate(a.date) - parseDate(b.date))[0] || null;
}

function renderHero() {
  const box = document.getElementById("heroNext");
  if (!box) return;

  const next = getNextGame();
  if (!next) { 
    box.innerHTML = ""; 
    box.classList.add("hidden"); 
    if (countdownInterval) clearInterval(countdownInterval);
    return; 
  }
  
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
        <p class="font-mono text-xs text-slate-400">${fmtLongDate(next.date)} · ${next.time || "--:--"}</p>
        <p class="text-[11px] text-slate-500 mt-0.5">${next.stadium || "Estádio a definir"}</p>
      </div>
    </div>`;

  startCountdown(next.date, next.time);
}

/* ===========================================================
   6. COMPONENTES E DASHBOARD DE ESTATÍSTICAS
   =========================================================== */

const posicoesCompeticao = {
  "todos": "5º",
  "brasileiro": "5º",
  "libertadores": "Caiu na 2ª Fase",
  "copas": "Oitavas",
  "estadual": "Campeão",
  "amistoso": "-"
};

function computeStats(list) {
  // Filtra apenas os jogos já realizados com placar válido
  const jogados = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x");
  
  let v = 0, e = 0, d = 0, gp = 0, gc = 0;
  let jogosSemSofrerGols = 0;

  // Variáveis Mando de Campo (Casa vs. Fora)
  let vCasa = 0, eCasa = 0, dCasa = 0;
  let vFora = 0, eFora = 0, dFora = 0;

  // Variáveis para sequências
  let streakVitoriasAtual = 0, maxVitorias = 0;
  let streakInvencivelAtual = 0, maxInvencivel = 0;
  
  const resultados = [];

  jogados.forEach(g => {
    const cleanScore = g.score.split("(")[0].trim();
    const scores = cleanScore.toLowerCase().split("x").map(s => parseInt(s.trim(), 10));

    if (scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
      const [s1, s2] = scores;
      const bahEmCasa = g.team1 === "bahia";
      const golsBah = bahEmCasa ? s1 : s2;
      const golsAdv = bahEmCasa ? s2 : s1;

      gp += golsBah; 
      gc += golsAdv;

      if (golsAdv === 0) jogosSemSofrerGols++;

      if (golsBah > golsAdv) {
        v++;
        resultados.push("V");
        if (bahEmCasa) vCasa++; else vFora++;

        // Sequência de Vitórias
        streakVitoriasAtual++;
        if (streakVitoriasAtual > maxVitorias) maxVitorias = streakVitoriasAtual;

        // Sequência Invicta
        streakInvencivelAtual++;
        if (streakInvencivelAtual > maxInvencivel) maxInvencivel = streakInvencivelAtual;

      } else if (golsBah === golsAdv) {
        e++;
        resultados.push("E");
        if (bahEmCasa) eCasa++; else eFora++;

        streakVitoriasAtual = 0;
        streakInvencivelAtual++;
        if (streakInvencivelAtual > maxInvencivel) maxInvencivel = streakInvencivelAtual;

      } else {
        d++;
        resultados.push("D");
        if (bahEmCasa) dCasa++; else dFora++;

        streakVitoriasAtual = 0;
        streakInvencivelAtual = 0;
      }
    }
  });

  const totalJogados = jogados.length;
  const pontos = (v * 3) + e;
  const saldoGols = gp - gc;
  const mediaGolsPro = totalJogados ? (gp / totalJogados).toFixed(2) : "0.00";
  const aproveitamento = totalJogados ? Math.round((pontos / (totalJogados * 3)) * 100) : 0;
  const posicao = typeof posicoesCompeticao !== "undefined" ? posicoesCompeticao[activeTab] || "-" : "-";

  // Cálculos Específicos para Casa e Fora
  const totalCasa = vCasa + eCasa + dCasa;
  const pontosCasa = (vCasa * 3) + eCasa;
  const aproveitamentoCasa = totalCasa ? Math.round((pontosCasa / (totalCasa * 3)) * 100) : 0;

  const totalFora = vFora + eFora + dFora;
  const pontosFora = (vFora * 3) + eFora;
  const aproveitamentoFora = totalFora ? Math.round((pontosFora / (totalFora * 3)) * 100) : 0;

  const ultimos5 = resultados.slice(-5);

  return { 
    v, e, d, gp, gc, pontos, aproveitamento, totalJogados, posicao, 
    saldoGols, mediaGolsPro, jogosSemSofrerGols,
    ultimos5, maxVitorias, maxInvencivel,
    pontosCasa, aproveitamentoCasa, totalCasa,
    pontosFora, aproveitamentoFora, totalFora
  };
}

// Renderizador visual das pílulas para a Forma Recente (V, E, D)
function renderFormaRecente(ultimos5) {
  if (!ultimos5 || ultimos5.length === 0) return '<span class="text-slate-500 text-sm">-</span>';

  return `
    <div class="flex items-center justify-center gap-1 mt-1">
      ${ultimos5.map(res => {
        let bgClass = "bg-slate-700 text-slate-300";
        if (res === "V") bgClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
        if (res === "E") bgClass = "bg-slate-500/20 text-slate-300 border border-slate-500/30";
        if (res === "D") bgClass = "bg-red-500/20 text-red-400 border border-red-500/30";
        
        return `<span class="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${bgClass}">${res}</span>`;
      }).join("")}
    </div>
  `;
}

function statCard(label, value, colorClass) {
  return `
    <div class="stat-card bg-navy-900/60 border border-white/5 rounded-xl px-3 sm:px-4 py-3.5 text-center flex flex-col justify-center items-center">
      <p class="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">${label}</p>
      <div class="font-display text-xl sm:text-2xl font-semibold ${colorClass}">${value}</div>
    </div>`;
}

function renderDashboard() {
  const list = gamesForTab(activeTab);
  const s = computeStats(list);
  const compLabel = COMPS.find(c => c.id === activeTab)?.label || "Geral";

  const titleEl = document.getElementById("dashboardTitle");
  if (titleEl) titleEl.textContent = `Desempenho · ${compLabel}`;

  const isBrasileiro = activeTab === "brasileiro";

  const saldoFormatado = s.saldoGols > 0 ? `+${s.saldoGols}` : s.saldoGols;
  const corSaldo = s.saldoGols > 0 ? "text-emerald-400" : (s.saldoGols < 0 ? "text-red-400" : "text-slate-300");

  const gridEl = document.getElementById("statGrid");
  if (gridEl) {
    gridEl.innerHTML = `
      ${statCard("Posição", s.posicao, "text-gold")}
      ${isBrasileiro ? statCard("Pontos", `${s.pontos} <span class="text-xs text-slate-400">pts</span>`, "text-gold") : ""}
      ${statCard("Jogos", s.totalJogados, "text-slate-200")}
      ${statCard("Aproveitamento Geral", s.aproveitamento + "%", "text-gold")}
      ${statCard("Aprov. Casa", s.aproveitamentoCasa + "%", "text-emerald-400")}
      ${statCard("Aprov. Fora", s.aproveitamentoFora + "%", "text-blue-400")}
      ${isBrasileiro ? statCard("Pontos Casa / Fora", `${s.pontosCasa} <span class="text-slate-500 text-sm">/</span> ${s.pontosFora}`, "text-gold") : ""}
      ${statCard("Triunfos", s.v, "text-emerald-400")}
      ${statCard("Empates", s.e, "text-slate-300")}
      ${statCard("Derrotas", s.d, "text-red-400")}
      ${statCard("Forma Recente", renderFormaRecente(s.ultimos5), "")}
      ${statCard("Gols Pró / Contra", `${s.gp} <span class="text-slate-500 text-sm">/</span> ${s.gc}`, "text-blue-400")}
      ${statCard("Saldo de Gols", saldoFormatado, corSaldo)}
      ${statCard("Maior Seq. Triunfos", `${s.maxVitorias} <span class="text-xs text-slate-400">jogos</span>`, "text-emerald-400")}
      ${statCard("Maior Invencibilidade", `${s.maxInvencivel} <span class="text-xs text-slate-400">jogos</span>`, "text-gold")}
    `;
  }
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

  COMPS.forEach(c => {
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

  // Renderiza sub-filtros de status
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

  // Renderiza Botões de Alternância do Mando de Campo
  renderMandoFilters();
}

function renderMandoFilters() {
  const mandoContainer = document.getElementById("mandoFilterBar");
  if (!mandoContainer) return;



  mandoContainer.innerHTML = mandos.map(m => `
    <button onclick="setMandoFilter('${m.id}')" class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
      activeMandoFilter === m.id 
        ? "bg-navy-800 text-gold border-gold" 
        : "border-navy-700/50 text-slate-400 hover:text-slate-200"
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
  const compObj = COMPS.find(c => c.id === g.comp || (c.match && c.match.includes(g.comp)));
  const compLabel = compObj ? compObj.label : g.comp;

  const exibeCentro = played ? g.score : (g.time || "--:--");

  return `
  <div class="ticket ${isNext ? "border-gold" : "border-white/10"} bg-navy-900/60 backdrop-blur-md rise-in rounded-xl overflow-hidden flex border group mb-3">
    <div class="w-20 sm:w-28 shrink-0 flex flex-col items-center justify-center py-4 bg-navy-950/50">
      <span class="font-mono text-[10px] text-slate-400 uppercase">${fmtLongDate(g.date).split(" ")[0]}</span>
      <span class="font-display text-xl sm:text-2xl text-white font-semibold leading-none mt-0.5">${g.date.split("/")[0]}</span>
      <span class="font-mono text-[10px] text-slate-400 uppercase mt-0.5">${fmtLongDate(g.date).split(" ").slice(1).join(" ")}</span>
    </div>
    <div class="flex-1 px-3 sm:px-5 py-4 min-w-0 flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-[10px] sm:text-[11px] font-semibold text-gold uppercase tracking-wider truncate mr-1">
          ${compLabel} <span class="text-slate-400 font-normal">• ${g.round || "Rodada"}</span>
          ${isNext ? '<span class="ml-2 text-gold">★ Próximo</span>' : ""}
        </p>
        <div class="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button onclick="editGame('${g.id}')" class="text-slate-400 hover:text-gold p-1" title="Editar jogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button onclick="deleteGame('${g.id}')" class="text-slate-500 hover:text-vermelho-400 p-1" title="Remover jogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
          </button>
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
  const list = gamesForTab(activeTab);
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

/* ===========================================================
   7. GERENCIAMENTO DE TEMA (DARK / LIGHT TOGGLE)
   =========================================================== */

function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggleBtn");
  const currentTheme = StorageUtils.get("bahia_theme", "dark");

  if (currentTheme === "light") {
    document.documentElement.classList.add("light-theme");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.toggle("light-theme");
      StorageUtils.set("bahia_theme", isLight ? "light" : "dark");
    });
  }
}

/* ===========================================================
   8. AÇÕES DOS JOGOS (EDIÇÃO & REMOÇÃO)
   =========================================================== */

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

  if (document.getElementById("fComp")) document.getElementById("fComp").value = game.comp || "brasileiro";
  if (document.getElementById("fRound")) document.getElementById("fRound").value = game.round || "";
  if (document.getElementById("fTime")) document.getElementById("fTime").value = game.time || "20:00";
  if (document.getElementById("fStadium")) document.getElementById("fStadium").value = game.stadium || "";
  if (document.getElementById("fScore")) document.getElementById("fScore").value = game.score || "x";

  if (game.date && game.date.includes("/") && document.getElementById("fDate")) {
    const [d, m] = game.date.split("/");
    const y = Number(m) >= 7 ? 2026 : 2027;
    document.getElementById("fDate").value = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  const emCasa = game.team1 === "bahia";
  const rivalSlug = emCasa ? game.team2 : game.team1;
  if (document.getElementById("fRival")) {
    document.getElementById("fRival").value = getTeam(rivalSlug).name;
  }

  document.querySelectorAll(".mando-btn").forEach(btn => {
    const isCasaBtn = btn.dataset.mando === "casa";
    const isActive = (emCasa && isCasaBtn) || (!emCasa && !isCasaBtn);

    btn.classList.toggle("active", isActive);
    btn.className = isActive 
      ? "mando-btn active flex-1 py-2 rounded-xl text-xs font-semibold border border-rose-600 bg-rose-950/40 text-white transition-all"
      : "mando-btn flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 bg-navy-950/50 text-slate-300 hover:text-white transition-all";
  });

  const modal = document.getElementById("modalOverlay");
  if (modal) modal.classList.remove("hidden");
}

/* ===========================================================
   9. RENDER GERAL E INICIALIZAÇÃO
   =========================================================== */

function render() {
  renderHero();
  renderDashboard();
  renderProgress();
  renderTabs();
  renderSubFilters();
  renderLists();
}

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);

    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex', !isHidden);

      const svg = newBtn.querySelector('svg');
      if (svg) {
        if (!isHidden) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  render();
  initHamburgerMenu();

  // Configuração dos Botões de Mando de Campo no Modal Form
  document.querySelectorAll(".mando-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mando-btn").forEach(b => {
        b.classList.remove("active");
        b.className = "mando-btn flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 bg-navy-950/50 text-slate-300 hover:text-white transition-all";
      });

      btn.classList.add("active");
      btn.className = "mando-btn active flex-1 py-2 rounded-xl text-xs font-semibold border border-rose-600 bg-rose-950/40 text-white transition-all";
    });
  });

  // Modal de Adicionar/Editar Jogo
  const modal = document.getElementById("modalOverlay");
  const btnAdd = document.getElementById("btnAddGame");
  const btnAddMobile = document.getElementById("btnAddGameMobile");
  const btnClose = document.getElementById("btnCloseModal");
  const gameForm = document.getElementById("gameForm");

  const openModal = () => {
    editingGameId = null;
    const modalTitle = document.getElementById("modalTitle");
    const submitLabel = document.getElementById("submitLabel");
    if (modalTitle) modalTitle.textContent = "Adicionar jogo";
    if (submitLabel) submitLabel.textContent = "Salvar jogo";
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
      
      const comp = document.getElementById("fComp").value;
      const round = document.getElementById("fRound").value || "Rodada";
      const dateRaw = document.getElementById("fDate").value;
      const time = document.getElementById("fTime").value || "20:00";
      const rival = slugify(document.getElementById("fRival").value || "Adversario");
      const stadium = document.getElementById("fStadium").value || "Fonte Nova";
      const score = document.getElementById("fScore").value.trim() || "x";

      let dateFmt = "01/01";
      if (dateRaw) {
        const parts = dateRaw.split("-");
        dateFmt = `${parts[2]}/${parts[1]}`;
      }

      const mandoBtn = document.querySelector(".mando-btn.active");
      const emCasa = mandoBtn ? mandoBtn.dataset.mando === "casa" : true;

      if (editingGameId) {
        const index = games.findIndex(g => g.id === editingGameId);
        if (index !== -1) {
          games[index] = {
            ...games[index],
            comp,
            round,
            date: dateFmt,
            time,
            team1: emCasa ? "bahia" : rival,
            team2: emCasa ? rival : "bahia",
            stadium,
            score
          };
        }
      } else {
        const newGame = {
          id: cryptoId(),
          comp,
          round,
          date: dateFmt,
          time,
          team1: emCasa ? "bahia" : rival,
          team2: emCasa ? rival : "bahia",
          stadium,
          score
        };
        games.push(newGame);
      }

      saveGames();
      closeModal();
      gameForm.reset();
      render();
    });
  }
});