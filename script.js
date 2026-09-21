/* ===========================================================
   Calendário Blaugrana — Lógica da aplicação
   Dados salvos via localStorage e estatísticas completas
   =========================================================== */

function cryptoId() { return 'g_' + Math.random().toString(36).slice(2, 10); }

// Dados iniciais padrão caso o localStorage esteja vazio
const defaultGames = [
  // ---------------- LA LIGA · 1º TURNO (Rodadas 1ª a 19ª) ----------------
  { id: cryptoId(), comp: "laliga", round: "Rodada 1ª", date: "2026-08-23", time: "16:30", team1: "elche", team2: "barcelona", stadium: "Manuel Martínez Valero", score: "0x5" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 2ª", date: "2026-08-27", time: "16:00", team1: "barcelona", team2: "athletic-club", stadium: "Camp Nou", score: "2x0" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 3ª", date: "2026-08-31", time: "16:30", team1: "barcelona", team2: "rayo-vallecano", stadium: "Camp Nou", score: "5x2" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 4ª", date: "2026-09-06", time: "11:15", team1: "valencia", team2: "barcelona", stadium: "Mestalla", score: "0x5" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 5ª", date: "2026-09-13", time: "11:15", team1: "levante", team2: "barcelona", stadium: "Ciudad de Valencia", score: "2x4" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 6ª", date: "2026-09-16", time: "16:30", team1: "barcelona", team2: "racing-santander", stadium: "Camp Nou", score: "7x2" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 7ª", date: "2026-09-20", time: "16:00", team1: "sevilla", team2: "barcelona", stadium: "Ramón Sánchez Pizjuán", score: "1x3" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 8ª", date: "2026-10-11", time: "13:30", team1: "barcelona", team2: "getafe", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 9ª", date: "2026-10-18", time: "14:00", team1: "real-betis", team2: "barcelona", stadium: "Benito Villamarín", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 10ª · El Clásico", date: "2026-10-25", time: "17:00", team1: "barcelona", team2: "real-madrid", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 11ª", date: "2026-11-01", time: "14:00", team1: "barcelona", team2: "alaves", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 12ª", date: "2026-11-08", time: "14:00", team1: "atletico-de-madrid", team2: "barcelona", stadium: "Cívitas Metropolitano", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 13ª", date: "2026-11-22", time: "14:00", team1: "barcelona", team2: "villarreal", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 14ª", date: "2026-11-29", time: "14:00", team1: "deportivo-a-coruna", team2: "barcelona", stadium: "Riazor", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 15ª", date: "2026-12-06", time: "14:00", team1: "barcelona", team2: "celta-vigo", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 16ª", date: "2026-12-13", time: "14:00", team1: "malaga", team2: "barcelona", stadium: "La Rosaleda", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 17ª", date: "2026-12-20", time: "14:00", team1: "barcelona", team2: "real-sociedad", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 18ª", date: "2027-01-03", time: "14:00", team1: "espanyol", team2: "barcelona", stadium: "RCDE Stadium", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 19ª", date: "2027-01-10", time: "14:00", team1: "osasuna", team2: "barcelona", stadium: "El Sadar", score: "x" },

  // ---------------- LA LIGA · 2º TURNO (Rodadas 20ª a 38ª) ----------------
  { id: cryptoId(), comp: "laliga", round: "Rodada 20ª", date: "2027-01-17", time: "14:00", team1: "barcelona", team2: "elche", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 21ª", date: "2027-01-24", time: "14:00", team1: "alaves", team2: "barcelona", stadium: "Mendizorroza", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 22ª", date: "2027-01-31", time: "14:00", team1: "barcelona", team2: "valencia", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 23ª", date: "2027-02-07", time: "14:00", team1: "barcelona", team2: "atletico-de-madrid", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 24ª", date: "2027-02-14", time: "14:00", team1: "villarreal", team2: "barcelona", stadium: "Estadio de la Cerámica", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 25ª", date: "2027-02-21", time: "14:00", team1: "barcelona", team2: "levante", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 26ª", date: "2027-02-28", time: "14:00", team1: "athletic-club", team2: "barcelona", stadium: "San Mamés", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 27ª", date: "2027-03-07", time: "14:00", team1: "barcelona", team2: "real-betis", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 28ª", date: "2027-03-14", time: "14:00", team1: "barcelona", team2: "deportivo-a-coruna", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 29ª", date: "2027-03-21", time: "14:00", team1: "rayo-vallecano", team2: "barcelona", stadium: "Vallecas", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 30ª", date: "2027-04-04", time: "14:00", team1: "barcelona", team2: "sevilla", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 31ª", date: "2027-04-11", time: "14:00", team1: "racing-santander", team2: "barcelona", stadium: "El Sardinero", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 32ª", date: "2027-04-18", time: "14:00", team1: "barcelona", team2: "espanyol", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 33ª", date: "2027-04-21", time: "14:00", team1: "celta-vigo", team2: "barcelona", stadium: "Balaídos", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 34ª", date: "2027-05-02", time: "14:00", team1: "barcelona", team2: "osasuna", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 35ª · El Clásico", date: "2027-05-09", time: "14:00", team1: "real-madrid", team2: "barcelona", stadium: "Santiago Bernabéu", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 36ª", date: "2027-05-16", time: "14:00", team1: "real-sociedad", team2: "barcelona", stadium: "Anoeta", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 37ª", date: "2027-05-23", time: "14:00", team1: "barcelona", team2: "malaga", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "laliga", round: "Rodada 38ª", date: "2027-05-30", time: "14:00", team1: "getafe", team2: "barcelona", stadium: "Coliseum Alfonso Pérez", score: "x" },

  // ---------------- CHAMPIONS LEAGUE · FASE DE LIGA ----------------
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 1", date: "2026-09-09", time: "13:45", team1: "barcelona", team2: "feyenoord", stadium: "Camp Nou", score: "5x1" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 2", date: "2026-10-13", time: "16:00", team1: "galatasaray", team2: "barcelona", stadium: "Rams Park", score: "x" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 3", date: "2026-10-20", time: "16:00", team1: "paris-saint-germain", team2: "barcelona", stadium: "Parc des Princes", score: "x" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 4", date: "2026-11-03", time: "17:00", team1: "barcelona", team2: "aston-villa", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 5", date: "2026-11-24", time: "14:45", team1: "sabah", team2: "barcelona", stadium: "Bank Respublika Arena", score: "x" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 6", date: "2026-12-08", time: "17:00", team1: "barcelona", team2: "manchester-city", stadium: "Camp Nou", score: "x" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 7", date: "2027-01-20", time: "17:00", team1: "sporting-cp", team2: "barcelona", stadium: "José Alvalade", score: "x" },
  { id: cryptoId(), comp: "champions", round: "Fase de Liga · Jornada 8", date: "2027-01-27", time: "17:00", team1: "barcelona", team2: "como", stadium: "Camp Nou", score: "x" },

  // ---------------- AMISTOSOS / OUTROS ----------------
  { id: cryptoId(), comp: "amistoso", round: "Troféu Joan Gamper", date: "2026-08-19", time: "", team1: "barcelona", team2: "al-ahly", stadium: "Camp Nou", score: "2x1" },
];

let games = JSON.parse(localStorage.getItem("blaugrana_games")) || defaultGames;

function saveGames() {
  localStorage.setItem("blaugrana_games", JSON.stringify(games));
}

/* ======================= TIMES ======================= */
const TEAMS = {
  "barcelona":         { name: "Barcelona",         abbr: "BAR", color: "#A50044" },
  "elche":             { name: "Elche",             abbr: "ELC", color: "#00753C" },
  "athletic-club":     { name: "Athletic Club",     abbr: "ATH", color: "#EE2523" },
  "rayo-vallecano":    { name: "Rayo Vallecano",    abbr: "RAY", color: "#E30613" },
  "valencia":          { name: "Valencia",          abbr: "VAL", color: "#F49B00" },
  "levante":           { name: "Levante",           abbr: "LEV", color: "#00206A" },
  "racing-santander":  { name: "Racing Santander",  abbr: "RAC", color: "#079046" },
  "sevilla":           { name: "Sevilla",           abbr: "SEV", color: "#D9012C" },
  "getafe":            { name: "Getafe",            abbr: "GET", color: "#005999" },
  "real-betis":        { name: "Real Betis",        abbr: "BET", color: "#00954C" },
  "real-madrid":       { name: "Real Madrid",       abbr: "RMA", color: "#4B4B4B" },
  "alaves":            { name: "Alavés",            abbr: "ALA", color: "#0057A8" },
  "atletico-de-madrid":{ name: "Atlético de Madrid",abbr: "ATM", color: "#CB3524" },
  "villarreal":        { name: "Villarreal",        abbr: "VIL", color: "#FFE667" },
  "deportivo-a-coruna":{ name: "Deportivo A Coruña",abbr: "DEP", color: "#0067B1" },
  "celta-vigo":        { name: "Celta de Vigo",     abbr: "CEL", color: "#8AC3EE" },
  "malaga":            { name: "Málaga",            abbr: "MAL", color: "#0072CE" },
  "real-sociedad":     { name: "Real Sociedad",     abbr: "RSO", color: "#0067B1" },
  "espanyol":          { name: "Espanyol",          abbr: "ESP", color: "#0A5EA8" },
  "osasuna":           { name: "Osasuna",           abbr: "OSA", color: "#D2001C" },
  "manchester-city":   { name: "Manchester City",   abbr: "MCI", color: "#6CABDD" },
  "paris-saint-germain":{ name: "Paris Saint-Germain",abbr: "PSG", color: "#004170" },
  "aston-villa":       { name: "Aston Villa",       abbr: "AVL", color: "#95BFE5" },
  "sporting-cp":       { name: "Sporting CP",       abbr: "SCP", color: "#1B7A3D" },
  "feyenoord":         { name: "Feyenoord",         abbr: "FEY", color: "#EE1C25" },
  "galatasaray":       { name: "Galatasaray",       abbr: "GAL", color: "#A90432" },
  "como":              { name: "Como 1907",         abbr: "COM", color: "#0057A0" },
  "sabah":             { name: "Sabah FK",          abbr: "SAB", color: "#C9A227" },
  "al-ahly":           { name: "Al Ahly",           abbr: "AA",  color: "#9E5F2E" },
};

function gerarBadgeTime(slugTime) {
  const info = timesCores[slugTime] || { abbr: "FC", color: "#3B82F6" };
  
  // Define texto escuro para fundo muito claro (ex: Villarreal)
  const corTexto = info.color === "#FFE667" ? "#1E293B" : "#FFFFFF";

  return `
    <span class="badge-time" style="background-color: ${info.color}; color: ${corTexto};">
      ${info.abbr}
    </span>
  `;
}

// Exemplo de inclusão dentro da geração de linhas da tabela
function criarLinhaTabela(item) {
  return `
    <tr class="border-b border-slate-800 hover:bg-slate-800/50">
      <td class="py-3 px-2 text-center text-slate-400 font-bold">${item.pos}º</td>
      <td class="py-3 px-2 flex items-center gap-3 font-semibold text-white">
        ${gerarBadgeTime(item.slug)}
        <span>${item.clube}</span>
      </td>
      <td class="py-3 px-2 text-center font-bold text-amber-400">${item.pts}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.pj}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.vit}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.e}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.der}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.gm}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.gc}</td>
      <td class="py-3 px-2 text-center text-slate-300">${item.sg}</td>
    </tr>
  `;
}

const posicoesCompeticao = {
  laliga: "1º",
  champions: "3º",
  todos: "1º"
};

function slugify(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getTeam(slug) {
  if (TEAMS[slug]) return TEAMS[slug];
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const abbr = name.replace(/[^A-Za-z ]/g, "").split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase() || "???";
  let hash = 0; for (const c of slug) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return { name, abbr, color: `hsl(${hue} 55% 40%)` };
}

/* ======================= COMPETIÇÕES / ABAS ======================= */
const COMPS = [
  { id: "todos",     label: "Todos" },
  { id: "laliga",    label: "La Liga" },
  { id: "champions", label: "Champions League" },
  { id: "copas",     label: "Copas", match: ["copadelrey", "supercopa"] },
  { id: "amistoso",  label: "Amistosos" },
];
let activeTab = "todos";
let activeSub = "todos";
let editingId = null;

/* ======================= DATAS CORRIGIDAS ======================= */
function parseDate(dstr) {
  if (!dstr) return new Date();
  
  if (dstr.includes("-")) {
    const [year, m, d] = dstr.split("-").map(Number);
    return new Date(year, m - 1, d);
  }
  
  const parts = dstr.split("/").map(Number);
  const d = parts[0];
  const m = parts[1];
  const year = parts[2] ? (parts[2] < 100 ? 2000 + parts[2] : parts[2]) : (m >= 7 ? 2026 : 2027);
  return new Date(year, m - 1, d);
}

function fmtLongDate(dstr) {
  const dt = parseDate(dstr);
  return dt.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).replace(".", "");
}

function fmtInputDate(dstr) {
  const dt = parseDate(dstr);
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function today() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

/* ======================= FILTROS POR ABA ======================= */
function gamesForTab(tabId) {
  if (tabId === "todos") return games;
  const comp = COMPS.find(c => c.id === tabId);
  if (comp && comp.match) return games.filter(g => comp.match.includes(g.comp));
  return games.filter(g => g.comp === tabId);
}

/* ======================= CONTADOR REGRESSIVO ======================= */
let countdownInterval = null;

function startCountdown(nextGameDate, timeStr) {
  if (countdownInterval) clearInterval(countdownInterval);

  const timerEl = document.getElementById("heroCountdown");
  if (!timerEl) return;

  const dt = parseDate(nextGameDate);
  const [hh, mm] = (timeStr || "20:00").split(":").map(Number);
  const targetTime = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), hh, mm, 0).getTime();

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

/* ======================= HERO / PRÓXIMO JOGO ======================= */
function getNextGame() {
  const pendentes = games
    .filter(g => !g.score || g.score.trim().toLowerCase() === "x")
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));
  return pendentes[0] || null;
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
    <div class="ticket next-game rise-in rounded-2xl border border-navy-600/60 px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
      <div class="flex flex-col items-center sm:items-start gap-1 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-gold pulse-dot"></span>
          <span class="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Próximo jogo</span>
        </div>
        <div id="heroCountdown" class="mt-1"></div>
      </div>
      <div class="flex items-center gap-3 sm:gap-6 flex-1 justify-center w-full min-w-0">
        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span class="font-display text-xs sm:text-lg text-slate-200 truncate text-right">${t1.name}</span>
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-sm text-white shrink-0 shadow-inner" style="background:${t1.color}">${t1.abbr}</div>
        </div>
        <span class="font-display text-slate-500 text-sm shrink-0">vs</span>
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-sm text-white shrink-0 shadow-inner" style="background:${t2.color}">${t2.abbr}</div>
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

/* ======================= ESTATÍSTICAS CHAMPIONS LEAGUE ======================= */
function computeChampionsStats(list = []) {
  const jogosUcl = list.filter(g => 
    g && (g.comp === "champions" || g.comp === "ucl") && 
    g.score && g.score.trim().toLowerCase() !== "x"
  );

  let v = 0, e = 0, d = 0, gp = 0, gc = 0;

  jogosUcl.forEach(g => {
    const cleanScore = g.score.split("(")[0].trim();
    const scores = cleanScore.toLowerCase().split("x").map(s => parseInt(s.trim(), 10));

    if (scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
      const [s1, s2] = scores;
      const barEmCasa = g.team1 === "barcelona";
      const golsBar = barEmCasa ? s1 : s2;
      const golsAdv = barEmCasa ? s2 : s1;

      gp += golsBar;
      gc += golsAdv;

      if (golsBar > golsAdv) v++;
      else if (golsBar === golsAdv) e++;
      else d++;
    }
  });

  const totalJogos = jogosUcl.length;
  const pontosConquistados = (v * 3) + e;
  const pontosDisputados = totalJogos * 3;
  const pontosRestantes = (8 - totalJogos) * 3;
  const saldoGols = gp - gc;

  // let statusClassificacao = "Em andamento";
  // if (pontosConquistados >= 15) {
  //   statusClassificacao = "Zona de Classificação Direta (G-8)";
  // } else if (pontosConquistados + pontosRestantes < 9) {
  //   statusClassificacao = "Risco de Eliminação";
  // } else if (totalJogos > 0) {
  //   statusClassificacao = "Zona de Play-offs (G-24)";
  // }

let statusClassificacao = "Em andamento";

// Exemplo de dados do time (certifique-se de que estas variáveis existem no seu código)
// let posicao = ...; // Se você já calcula a posição na tabela, atribua aqui.
// let pontosConquistados = 15;
// let pontosRestantes = 6;
// let totalJogos = 5;

// Se a posição vier direto da sua tabela, use esta verificação:
if (typeof posicao !== 'undefined' && posicao <= 8) {
  statusClassificacao = "Zona de Classificação Direta (G-8)";
} 
// Se atingiu a pontuação matemática para o G-8
else if (pontosConquistados >= 15) {
  statusClassificacao = "Zona de Classificação Direta (G-8)";
} 
// Se já está eliminado matematicamente
else if (pontosConquistados + pontosRestantes < 9) {
  statusClassificacao = "Risco de Eliminação";
} 
// Se está na zona de play-offs (9º ao 24º)
else if (typeof posicao !== 'undefined' && posicao <= 24 && posicao >= 9) {
  statusClassificacao = "Zona de Play-offs (G-24)";
} 
// Caso padrão baseado apenas nos jogos disputados
else if (totalJogos > 0) {
  statusClassificacao = "Zona de Classificação Direta (G-8)";
}
  

  return {
    totalJogos,
    jogosRestantes: Math.max(0, 8 - totalJogos),
    pontosConquistados,
    saldoGols,
    statusClassificacao,
    aproveitamentoUcl: pontosDisputados ? Math.round((pontosConquistados / pontosDisputados) * 100) : 0
  };
}

function renderCardLaLiga(stats) {
  // Garante que pega a propriedade correta de jogos e pontos
  const totalJogos = stats.totalJogos !== undefined ? stats.totalJogos : (stats.totalJogados || 0);
  const totalPontos = stats.pontos !== undefined ? stats.pontos : 0;
  const statusProj = stats.statusLaLiga || stats.statusClassificacao || "Zona de Classificação";
  const posAtual = stats.posLaLigaTexto || stats.posLaLiga || "1º";

  return `
    <div class="col-span-full bg-gradient-to-r from-red-950/80 via-navy-900/90 to-amber-950/80 border border-red-500/30 rounded-xl p-4 shadow-lg mb-2">
      <div class="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-3 mb-3 gap-2">
        <span class="text-xs uppercase tracking-widest font-bold text-red-400 flex items-center gap-1.5">
          🇪🇸 LALIGA EA SPORTS
        </span>
        <div class="flex items-center gap-3">
          <span class="text-xs bg-gold/20 text-gold px-2.5 py-0.5 rounded-full border border-gold/30 font-semibold">
            ${totalPontos} pts
          </span>
          <span class="text-[11px] bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full border border-red-400/30">
            ${totalJogos} Jogos
          </span>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 px-1">
        <div>
          <p class="text-[10px] uppercase text-slate-400">Status Projetado</p>
          <p class="text-xs font-bold text-emerald-400 mt-0.5">${statusProj}</p>
        </div>
        <div class="text-center sm:text-right">
          <p class="text-[10px] uppercase text-slate-400">Posição Atual</p>
          <p class="text-xs font-bold text-gold mt-0.5">${posAtual}</p>
        </div>
      </div>
    </div>
  `;
}

function renderCardChampionsLeague(uclStats) {
  const totalPontos = uclStats.pontosConquistados !== undefined ? uclStats.pontosConquistados : (uclStats.pontos || 0);
  const statusProj = uclStats.statusClassificacao || "Zona de Classificação Direta (G-8)";
  const posAtual = uclStats.posUclTexto || uclStats.posChampions || "1º (Fase de Liga)";

  return `
    <div class="col-span-full bg-gradient-to-r from-blue-950/80 via-navy-900/90 to-indigo-950/80 border border-blue-500/30 rounded-xl p-4 shadow-lg mb-2">
      <div class="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-3 mb-3 gap-2">
        <span class="text-xs uppercase tracking-widest font-bold text-blue-400 flex items-center gap-1.5">
          ⚽ UEFA CHAMPIONS LEAGUE · FASE DE LIGA
        </span>
        <div class="flex items-center gap-3">
          <span class="text-xs bg-gold/20 text-gold px-2.5 py-0.5 rounded-full border border-gold/30 font-semibold">
            ${totalPontos} pts
          </span>
          <span class="text-[11px] bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30">
            ${uclStats.totalJogos}/8 Jogos
          </span>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 px-1">
        <div>
          <p class="text-[10px] uppercase text-slate-400">Status Projetado</p>
          <p class="text-xs font-bold text-emerald-400 mt-0.5">${statusProj}</p>
        </div>
        <div class="text-center sm:text-right">
          <p class="text-[10px] uppercase text-slate-400">Posição Atual</p>
          <p class="text-xs font-bold text-gold mt-0.5">${posAtual}</p>
        </div>
      </div>
    </div>
  `;
}

/* ======================= DASHBOARD DE ESTATÍSTICAS ======================= */
function computeStats(list = []) {
  const jogados = Array.isArray(list) 
    ? list.filter(g => g && g.score && g.score.trim().toLowerCase() !== "x")
    : [];
  
  let v = 0, e = 0, d = 0, gp = 0, gc = 0;
  let jogosSemSofrerGols = 0;

  let vCasa = 0, eCasa = 0, dCasa = 0;
  let vFora = 0, eFora = 0, dFora = 0;

  let streakVitoriasAtual = 0, maxVitorias = 0;
  let streakInvencivelAtual = 0, maxInvencivel = 0;
  
  const resultados = [];

  const ordenados = [...jogados].sort((a, b) => parseDate(a.date) - parseDate(b.date));

  ordenados.forEach(g => {
    if (!g.score) return;
    const cleanScore = g.score.split("(")[0].trim();
    const scores = cleanScore.toLowerCase().split("x").map(s => parseInt(s.trim(), 10));

    if (scores.length === 2 && !isNaN(scores[0]) && !isNaN(scores[1])) {
      const [s1, s2] = scores;
      const barEmCasa = g.team1 === "barcelona";
      const golsBar = barEmCasa ? s1 : s2;
      const golsAdv = barEmCasa ? s2 : s1;

      gp += golsBar; 
      gc += golsAdv;

      if (golsAdv === 0) jogosSemSofrerGols++;

      if (golsBar > golsAdv) {
        v++;
        resultados.push("V");
        if (barEmCasa) vCasa++; else vFora++;

        streakVitoriasAtual++;
        if (streakVitoriasAtual > maxVitorias) maxVitorias = streakVitoriasAtual;

        streakInvencivelAtual++;
        if (streakInvencivelAtual > maxInvencivel) maxInvencivel = streakInvencivelAtual;

      } else if (golsBar === golsAdv) {
        e++;
        resultados.push("E");
        if (barEmCasa) eCasa++; else eFora++;

        streakVitoriasAtual = 0;
        streakInvencivelAtual++;
        if (streakInvencivelAtual > maxInvencivel) maxInvencivel = streakInvencivelAtual;

      } else {
        d++;
        resultados.push("D");
        if (barEmCasa) dCasa++; else dFora++;

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

  let posLaLiga = "-";
  let posChampions = "Fase de Liga";

  if (typeof posicoesCompeticao !== "undefined" && posicoesCompeticao !== null) {
    posLaLiga = posicoesCompeticao.laliga || "-";
    const posUcl = posicoesCompeticao.champions || posicoesCompeticao.ucl;
    if (posUcl) {
      posChampions = `${posUcl} <span class="block text-[10px] text-slate-400 font-normal">Fase de Liga</span>`;
    }
  }

  const totalCasa = vCasa + eCasa + dCasa;
  const pontosCasa = (vCasa * 3) + eCasa;
  const aproveitamentoCasa = totalCasa ? Math.round((pontosCasa / (totalCasa * 3)) * 100) : 0;

  const totalFora = vFora + eFora + dFora;
  const pontosFora = (vFora * 3) + eFora;
  const aproveitamentoFora = totalFora ? Math.round((pontosFora / (totalFora * 3)) * 100) : 0;

  const ultimos5 = resultados.slice(-5);

  return { 
    v, e, d, gp, gc, pontos, aproveitamento, totalJogados,
    posLaLiga, posChampions,
    saldoGols, mediaGolsPro, jogosSemSofrerGols,
    ultimos5, maxVitorias, maxInvencivel,
    pontosCasa, aproveitamentoCasa, totalCasa,
    pontosFora, aproveitamentoFora, totalFora
  };
}

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
  const tabAtual = typeof activeTab !== "undefined" ? activeTab : "todos";
  const list = gamesForTab(tabAtual);
  const todosOsJogos = gamesForTab("todos");
  
  const s = computeStats(list);
  const uclStats = computeChampionsStats(todosOsJogos);
  const totalPontosUcl = uclStats.pontosConquistados !== undefined ? uclStats.pontosConquistados : (uclStats.pontos || 0);
  const compLabel = COMPS.find(c => c.id === tabAtual)?.label || "Geral";

  const titleEl = document.getElementById("dashboardTitle");
  if (titleEl) titleEl.textContent = `Desempenho · ${compLabel}`;

  const isChampions = tabAtual === "champions" || tabAtual === "todos";
  const isLaLigaTab = tabAtual === "laliga" || tabAtual === "todos";
  
  const saldoFormatado = s.saldoGols > 0 ? `+${s.saldoGols}` : s.saldoGols;
  const corSaldo = s.saldoGols > 0 ? "text-emerald-400" : (s.saldoGols < 0 ? "text-red-400" : "text-slate-300");

  const gridEl = document.getElementById("statGrid");
  if (gridEl) {
    let headerHtml = "";
    
    // Trecho atualizado chamando a função renderCardChampionsLeague
    if (isChampions && tabAtual === "champions") {
      headerHtml = renderCardChampionsLeague(uclStats);
    } else if (tabAtual === "laliga") {
      headerHtml = renderCardLaLiga(s);
    }

    let cardPosicaoHtml = "";
    if (tabAtual === "laliga") {
      cardPosicaoHtml = statCard("Posição La Liga", s.posLaLiga, "text-gold");
    } else if (tabAtual === "champions") {
      cardPosicaoHtml = statCard("Posição Champions", s.posChampions, "text-gold");
    } else {
      cardPosicaoHtml = `
        ${statCard("Posição La Liga", s.posLaLiga, "text-gold")}
        ${statCard("Posição Champions", s.posChampions, "text-gold")}
      `;
    }

    gridEl.innerHTML = `
      ${headerHtml}
      ${cardPosicaoHtml}
      ${statCard("Jogos", s.totalJogados, "text-slate-200")}
      ${statCard("Aproveitamento Geral", s.aproveitamento + "%", "text-gold")}
      ${statCard("Aprov. Casa (Camp Nou)", s.aproveitamentoCasa + "%", "text-emerald-400")}
      ${statCard("Aprov. Fora", s.aproveitamentoFora + "%", "text-blue-400")}
      ${statCard("Vitórias", s.v, "text-emerald-400")}
      ${statCard("Empates", s.e, "text-slate-300")}
      ${statCard("Derrotas", s.d, "text-red-400")}
      ${statCard("Forma Recente", renderFormaRecente(s.ultimos5), "")}
      ${statCard("Gols Pró / Contra", `${s.gp} <span class="text-slate-500 text-sm">/</span> ${s.gc}`, "text-blue-400")}
      ${statCard("Saldo de Gols", saldoFormatado, corSaldo)}
      ${statCard("Clean Sheets", s.jogosSemSofrerGols, "text-emerald-400")}
      ${statCard("Maior Seq. Vitórias", `${s.maxVitorias} <span class="text-xs text-slate-400">jogos</span>`, "text-emerald-400")}
      ${statCard("Maior Invencibilidade", `${s.maxInvencivel} <span class="text-xs text-slate-400">jogos</span>`, "text-gold")}
    `;
  }
}
/* ======================= PROGRESSO DA TEMPORADA ======================= */
function renderProgress() {
  const list = gamesForTab(activeTab);
  const total = list.length;
  const jogados = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x").length;
  const pct = total ? Math.round((jogados / total) * 100) : 0;

  const lbl = document.getElementById("progressLabel");
  const pctEl = document.getElementById("progressPct");
  const fill = document.getElementById("progressFill");
  const wrap = document.getElementById("progressWrap");

  if (lbl) lbl.textContent = `${jogados} de ${total} jogos disputados`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (fill) fill.style.width = `${pct}%`;
  if (wrap) wrap.classList.toggle("hidden", total === 0);
}

/* ======================= RENDER: ABAS ======================= */
function renderTabs() {
  const bar = document.getElementById("tabBar");
  if (!bar) return;
  bar.innerHTML = "";
  COMPS.forEach(c => {
    const count = gamesForTab(c.id).length;
    const btn = document.createElement("button");
    btn.className = `relative shrink-0 pb-1 text-sm font-semibold font-display tracking-wide transition-colors ${activeTab === c.id ? "tab-active" : "text-slate-500 hover:text-slate-300"}`;
    btn.innerHTML = `${c.label} <span class="text-[11px] font-mono ${activeTab === c.id ? 'text-gold' : 'text-slate-600'}">${count}</span>`;
    btn.onclick = () => { activeTab = c.id; render(); };
    bar.appendChild(btn);
  });
}

/* ======================= RENDER: SUBFILTROS ======================= */
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
    btn.className = `text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${isActive ? "bg-gold text-navy-950 border-gold" : "border-navy-600 text-slate-400 hover:border-slate-500"}`;
    btn.textContent = o.label;
    btn.onclick = () => { activeSub = o.id; render(); };
    bar.appendChild(btn);
  });
}

/* ======================= RENDER: CARD (TICKET) ======================= */
function badge(slug) {
  const t = getTeam(slug);
  return `<div class="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-display font-bold text-[11px] sm:text-xs text-white shrink-0 shadow-inner" style="background:${t.color}">${t.abbr}</div>`;
}

function renderCard(g, isNext) {
  const played = g.score && g.score.trim().toLowerCase() !== "x";
  const [s1, s2] = played ? g.score.split("x") : ["", ""];
  const t1 = getTeam(g.team1), t2 = getTeam(g.team2);
  const compLabel = COMPS.find(c => c.id === g.comp || (c.match && c.match.includes(g.comp)))?.label
                    ?? { copadelrey: "Copa del Rey", supercopa: "Supercopa" }[g.comp]
                    ?? g.comp;

  return `
  <div class="ticket ${isNext ? "next-game" : ""} rise-in rounded-xl overflow-hidden flex border border-navy-600/60 group mb-3">
    <div class="w-20 sm:w-28 shrink-0 flex flex-col items-center justify-center py-4 bg-navy-950/40">
      <span class="font-mono text-[10px] text-slate-500 uppercase">${fmtLongDate(g.date).split(" ")[0]}</span>
      <span class="font-display text-xl sm:text-2xl text-white font-semibold leading-none mt-0.5">${parseDate(g.date).getDate()}</span>
      <span class="font-mono text-[10px] text-slate-500 uppercase mt-0.5">${fmtLongDate(g.date).split(" ").slice(1).join(" ")}</span>
    </div>
    <div class="perforation my-3"></div>
    <div class="flex-1 px-3 sm:px-5 py-4 min-w-0">
      <div class="flex items-center justify-between mb-3">
        <p class="text-[10px] sm:text-[11px] font-semibold text-gold uppercase tracking-wider truncate mr-1">
          ${compLabel} <span class="text-slate-500 font-normal">• ${g.round}</span>
          ${isNext ? '<span class="ml-1 sm:ml-2 text-gold">★ próximo</span>' : ""}
        </p>
        <div class="flex items-center gap-2 shrink-0 ml-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button data-edit="${g.id}" class="edit-btn text-slate-500 hover:text-gold p-1" title="Editar jogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button data-del="${g.id}" class="del-btn text-slate-500 hover:text-garnet-400 p-1" title="Remover jogo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2 sm:gap-3">
        <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span class="text-xs sm:text-sm font-medium text-slate-200 truncate text-right team-name-label">${t1.name}</span>
          ${badge(g.team1)}
        </div>
        <div class="shrink-0 px-1 sm:px-2">
          ${played
            ? `<div class="font-display text-sm sm:text-xl font-bold text-white bg-navy-950/60 rounded-lg px-2 sm:px-3 py-1 border border-navy-600">${s1} <span class="text-slate-500">x</span> ${s2}</div>`
            : `<div class="font-mono text-[10px] sm:text-xs text-slate-500 border border-dashed border-navy-600 rounded-lg px-2 py-1.5">${g.time || "--:--"}</div>`}
        </div>
        <div class="flex items-center gap-2 flex-1 min-w-0">
          ${badge(g.team2)}
          <span class="text-xs sm:text-sm font-medium text-slate-200 truncate team-name-label">${t2.name}</span>
        </div>
      </div>
      <p class="text-[10px] sm:text-[11px] text-slate-500 mt-3 flex items-center gap-1.5 truncate">
        <svg class="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
        <span class="truncate">${g.stadium || "Estádio a definir"} ${g.time && played ? "• " + g.time : ""}</span>
      </p>
    </div>
  </div>`;
}

/* ======================= RENDER PRINCIPAL ======================= */
function render() {
  renderHero();
  renderDashboard();
  renderProgress();
  renderTabs();
  renderSubFilters();

  const nextGame = getNextGame();
  const list = gamesForTab(activeTab);

  const recentes = list.filter(g => g.score && g.score.trim().toLowerCase() !== "x").sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const proximos = list.filter(g => !g.score || g.score.trim().toLowerCase() === "x").sort((a, b) => parseDate(a.date) - parseDate(b.date));

  const showRecentes = activeSub === "todos" || activeSub === "recentes";
  const showProximos = activeSub === "todos" || activeSub === "proximos";

  const secRecentes = document.getElementById("section-recentes");
  const secProximos = document.getElementById("section-proximos");

  if (secRecentes) secRecentes.classList.toggle("hidden", !showRecentes || recentes.length === 0);
  if (secProximos) secProximos.classList.toggle("hidden", !showProximos || proximos.length === 0);

  const listRecentesEl = document.getElementById("listRecentes");
  const listProximosEl = document.getElementById("listProximos");

  if (listRecentesEl) listRecentesEl.innerHTML = recentes.map(g => renderCard(g, false)).join("");
  if (listProximosEl) listProximosEl.innerHTML = proximos.map(g => renderCard(g, nextGame && g.id === nextGame.id)).join("");

  const totalVisible = (showRecentes ? recentes.length : 0) + (showProximos ? proximos.length : 0);
  const emptyState = document.getElementById("emptyState");
  if (emptyState) emptyState.classList.toggle("hidden", totalVisible !== 0);

  document.querySelectorAll(".del-btn").forEach(btn => {
    btn.onclick = () => {
      if (confirm("Remover este jogo do calendário?")) {
        games = games.filter(g => g.id !== btn.dataset.del);
        saveGames();
        render();
      }
    };
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = () => openModalForEdit(btn.dataset.edit);
  });
}

/* ======================= MODAL ======================= */
const overlay = document.getElementById("modalOverlay");

function openModal() {
  if (!overlay) return;
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  document.body.style.overflow = "hidden"; // Opcional: trava o scroll da página de fundo
  document.getElementById("formError")?.classList.add("hidden");
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
  document.body.style.overflow = ""; // Restaura o scroll
  document.getElementById("gameForm")?.reset();
  editingId = null;
  const title = document.getElementById("modalTitle");
  const lbl = document.getElementById("submitLabel");
  if (title) title.textContent = "Novo jogo";
  if (lbl) lbl.textContent = "Salvar jogo";
}

function setMando(val) {
  mandoSelecionado = val;
  document.querySelectorAll(".mando-btn").forEach(b => {
    const active = b.dataset.mando === val;
    b.classList.toggle("border-garnet", active);
    b.classList.toggle("bg-garnet/20", active);
    b.classList.toggle("text-white", active);
    b.classList.toggle("text-slate-400", !active);
  });
}

function openModalForEdit(id) {
  const g = games.find(x => x.id === id);
  if (!g) return;
  editingId = id;
  
  openModal();
  
  const title = document.getElementById("modalTitle");
  const lbl = document.getElementById("submitLabel");
  if (title) title.textContent = "Editar jogo";
  if (lbl) lbl.textContent = "Atualizar jogo";

  const isBarcaHome = g.team1 === "barcelona";
  setMando(isBarcaHome ? "casa" : "fora");

  const advSlug = isBarcaHome ? g.team2 : g.team1;
  const advTeam = getTeam(advSlug);

  if (document.getElementById("fRival")) document.getElementById("fRival").value = advTeam.name;
  if (document.getElementById("fComp")) document.getElementById("fComp").value = g.comp;
  if (document.getElementById("fRound")) document.getElementById("fRound").value = g.round || "";
  if (document.getElementById("fDate")) document.getElementById("fDate").value = fmtInputDate(g.date);
  if (document.getElementById("fTime")) document.getElementById("fTime").value = g.time || "";
  if (document.getElementById("fStadium")) document.getElementById("fStadium").value = g.stadium || "";
  if (document.getElementById("fScore")) document.getElementById("fScore").value = g.score === "x" ? "" : g.score;
}

// Event Listeners do Formulário
document.addEventListener("DOMContentLoaded", () => {
  render();

  document.querySelectorAll(".mando-btn").forEach(b => {
    b.onclick = () => setMando(b.dataset.mando);
  });

  document.getElementById("btnAddGameDesktop")?.addEventListener("click", () => {
    editingId = null;
    openModal();
  });

  document.getElementById("btnAddGameMobile")?.addEventListener("click", () => {
    editingId = null;
    openModal();
  });

  document.getElementById("btnCloseModal")?.addEventListener("click", closeModal);

  document.getElementById("gameForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const oppName = document.getElementById("fRival")?.value.trim();
    const comp = document.getElementById("fComp")?.value;
    const round = document.getElementById("fRound")?.value.trim();
    const date = document.getElementById("fDate")?.value.trim();
    const time = document.getElementById("fTime")?.value.trim();
    const stadium = document.getElementById("fStadium")?.value.trim();
    let score = document.getElementById("fScore")?.value.trim();

    if (!oppName || !date) {
      const err = document.getElementById("formError");
      if(err) {
        err.textContent = "Preencha o adversário e a data.";
        err.classList.remove("hidden");
      }
      return;
    }

    const oppSlug = slugify(oppName);
    const team1 = mandoSelecionado === "casa" ? "barcelona" : oppSlug;
    const team2 = mandoSelecionado === "casa" ? oppSlug : "barcelona";

    if (!score) score = "x";

    if (editingId) {
      const idx = games.findIndex(g => g.id === editingId);
      if (idx !== -1) {
        games[idx] = { ...games[idx], comp, round, date, time, team1, team2, stadium, score };
      }
    } else {
      games.push({
        id: cryptoId(),
        comp,
        round,
        date,
        time,
        team1,
        team2,
        stadium,
        score
      });
    }

    saveGames();
    closeModal();
    render();
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const hamburgerBtn = document.getElementById('hamburgerBtn');
//   const mobileMenu = document.getElementById('mobileMenu');
//   const iconBars = document.getElementById('iconBars');
//   const iconClose = document.getElementById('iconClose');

//   if (hamburgerBtn && mobileMenu) {
//     hamburgerBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       const estaEscondido = mobileMenu.classList.contains('hidden');

//       if (estaEscondido) {
//         mobileMenu.classList.remove('hidden');
//         iconBars.classList.add('hidden');
//         iconClose.classList.remove('hidden');
//       } else {
//         mobileMenu.classList.add('hidden');
//         iconBars.classList.remove('hidden');
//         iconClose.classList.add('hidden');
//       }
//     });
//   }
// });