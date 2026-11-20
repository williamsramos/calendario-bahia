/* ===========================================================
Utilitários Globais — Compartilhados entre páginas
=========================================================== */

// ===== TOAST NOTIFICATIONS =====
function initToastContainer() {
if (!document.getElementById('toastContainer')) {
const container = document.createElement('div');
container.id = 'toastContainer';
container.className = 'toast-container';
document.body.appendChild(container);
}
}

function showToast(message, type = 'success', duration = 3000) {
initToastContainer();
const container = document.getElementById('toastContainer');

const toast = document.createElement('div');
toast.className = `toast ${type}`;
toast.textContent = message;

container.appendChild(toast);

if (duration > 0) {
setTimeout(() => {
toast.style.animation = 'slideInRight 0.3s ease reverse';
setTimeout(() => toast.remove(), 300);
}, duration);
}
}

// ===== TAILWIND CONFIG (Centralizado - EC Bahia) =====
function initTailwindConfig() {
if (!window.tailwindInitialized) {
if (typeof tailwind !== 'undefined') {
tailwind.config = {
theme: {
extend: {
colors: {
navy: {
950: '#030B18',
900: '#071329',
800: '#0E1F3F',
700: '#152C56',
600: '#1D3B70'
},
azul: { DEFAULT: '#00468C', 600: '#003366', 400: '#0056F3' },
vermelho: { DEFAULT: '#E31C22', 600: '#B31217', 400: '#FF3B3B' },
branco: { DEFAULT: '#FFFFFF', 100: '#F1F5F9', 200: '#E2E8F0' },
ouro: { DEFAULT: '#FFD700', 600: '#CCAC00', 400: '#FFE033' },
blaugrana: { DEFAULT: '#00468C', 600: '#003366' },
garnet: { DEFAULT: '#E31C22', 600: '#B31217', 400: '#FF3B3B' },
gold: { DEFAULT: '#FFD700', 600: '#CCAC00' }
},
fontFamily: {
display: ['Oswald', 'sans-serif'],
body: ['Inter', 'sans-serif'],
mono: ['JetBrains Mono', 'monospace'],
},
}
}
};
}
window.tailwindInitialized = true;
}
}

// ===== ARMAZENAMENTO LOCAL =====
const LocalStorage = {
set(key, value) {
try {
localStorage.setItem(key, JSON.stringify(value));
return true;
} catch (error) {
console.error('Erro ao salvar dados:', error);
return false;
}
},

get(key, defaultValue = null) {
try {
const item = localStorage.getItem(key);
return item ? JSON.parse(item) : defaultValue;
} catch (error) {
console.error('Erro ao carregar dados:', error);
return defaultValue;
}
},

remove(key) {
try {
localStorage.removeItem(key);
return true;
} catch (error) {
console.error('Erro ao remover dados:', error);
return false;
}
},

clear() {
try {
localStorage.clear();
return true;
} catch (error) {
console.error('Erro ao limpar dados:', error);
return false;
}
}
};

// 📊 Matriz com os dados atualizados da classificação da Serie A - 2026
const dadosClassificacao = [
{ pos: 1, clube: "Flamengo", slug: "flamengo", pts: 79, pj: 35, vit: 24, e: 7, der: 4, gm: 73, gc: 30, sg: 43, ultimas: ["V", "V", "V", "V", "V"], proximo: "palmeiras", status: "libertadores_fase_grupos" },
{ pos: 2, clube: "Palmeiras", slug: "palmeiras", pts: 73, pj: 35, vit: 21, e: 10, der: 4, gm: 63, gc: 25, sg: 38, ultimas: ["V", "V", "E", "V", "D"], proximo: "flamengo", status: "libertadores_fase_grupos" },
{ pos: 3, clube: "Cruzeiro", slug: "cruzeiro", pts: 63, pj: 35, vit: 19, e: 6, der: 10, gm: 57, gc: 49, sg: 8, ultimas: ["V", "V", "V", "V", "V"], proximo: "chapecoense", status: "libertadores_fase_grupos" },
{ pos: 4, clube: "Fluminense", slug: "fluminense", pts: 60, pj: 35, vit: 17, e: 9, der: 9, gm: 56, gc: 42, sg: 14, ultimas: ["D", "D", "V", "V", "V"], proximo: "mirassol", status: "libertadores_fase_grupos" },
{ pos: 5, clube: "Athletico-PR", slug: "athletico-pr", pts: 54, pj: 35, vit: 15, e: 9, der: 11, gm: 52, gc: 45, sg: 7, ultimas: ["D", "E", "D", "D", "D"], proximo: "remo", status: "pre_libertadores" },
{ pos: 6, clube: "Bahia", slug: "bahia", pts: 54, pj: 35, vit: 14, e: 12, der: 9, gm: 50, gc: 45, sg: 5, ultimas: ["D", "E", "V", "D", "E"], proximo: "coritiba", status: "sul_americana" },
{ pos: 7, clube: "Atlético-MG", slug: "atletico-mg", pts: 51, pj: 35, vit: 14, e: 9, der: 12, gm: 44, gc: 40, sg: 4, ultimas: ["V", "D", "D", "D", "E"], proximo: "corinthians", status: "sul_americana" },
{ pos: 8, clube: "Santos", slug: "santos", pts: 50, pj: 35, vit: 13, e: 11, der: 11, gm: 51, gc: 49, sg: 2, ultimas: ["V", "E", "E", "D", "V"], proximo: "gremio", status: "sul_americana" },
{ pos: 9, clube: "Bragantino", slug: "bragantino", pts: 47, pj: 35, vit: 13, e: 8, der: 14, gm: 45, gc: 41, sg: 4, ultimas: ["E", "D", "V", "V", "D"], proximo: "vasco", status: "sul_americana" },
{ pos: 10, clube: "Vasco da Gama", slug: "vasco", pts: 47, pj: 35, vit: 13, e: 8, der: 14, gm: 47, gc: 51, sg: -4, ultimas: ["V", "D", "V", "V", "V"], proximo: "bragantino", status: "sul_americana" },
{ pos: 11, clube: "São Paulo", slug: "sao-paulo", pts: 44, pj: 35, vit: 12, e: 8, der: 15, gm: 39, gc: 40, sg: -1, ultimas: ["V", "E", "D", "E", "D"], proximo: "botafogo", status: "sul_americana" },
{ pos: 12, clube: "Botafogo", slug: "botafogo", pts: 42, pj: 35, vit: 11, e: 9, der: 15, gm: 46, gc: 57, sg: -11, ultimas: ["V", "D", "D", "V", "D"], proximo: "sao-paulo", status: "neutro" },
{ pos: 13, clube: "Coritiba", slug: "coritiba", pts: 42, pj: 35, vit: 11, e: 9, der: 15, gm: 40, gc: 52, sg: -12, ultimas: ["D", "D", "V", "D", "D"], proximo: "bahia", status: "neutro" },
{ pos: 14, clube: "Vitória", slug: "vitoria", pts: 41, pj: 35, vit: 11, e: 8, der: 16, gm: 37, gc: 52, sg: -15, ultimas: ["E", "E", "D", "D", "V"], proximo: "internacional", status: "neutro" },
{ pos: 15, clube: "Mirassol", slug: "mirassol", pts: 41, pj: 35, vit: 10, e: 11, der: 14, gm: 39, gc: 48, sg: -9, ultimas: ["E", "D", "V", "V", "E"], proximo: "fluminense", status: "neutro" },
{ pos: 16, clube: "Corinthians", slug: "corinthians", pts: 40, pj: 35, vit: 10, e: 10, der: 15, gm: 40, gc: 42, sg: -2, ultimas: ["E", "D", "V", "E", "V"], proximo: "atletico-mg", status: "neutro" },
{ pos: 17, clube: "Internacional", slug: "internacional", pts: 38, pj: 35, vit: 9, e: 11, der: 15, gm: 39, gc: 44, sg: -5, ultimas: ["D", "V", "D", "V", "D"], proximo: "vitoria", status: "rebaixamento" },
{ pos: 18, clube: "Grêmio", slug: "gremio", pts: 38, pj: 35, vit: 9, e: 11, der: 15, gm: 38, gc: 47, sg: -9, ultimas: ["D", "V", "V", "D", "E"], proximo: "santos", status: "rebaixamento" },
{ pos: 19, clube: "Remo", slug: "remo", pts: 32, pj: 35, vit: 7, e: 11, der: 17, gm: 39, gc: 57, sg: -18, ultimas: ["E", "D", "V", "D", "V"], proximo: "athletico-pr", status: "rebaixamento" },
{ pos: 20, clube: "Chapecoense", slug: "chapecoense", pts: 21, pj: 35, vit: 4, e: 9, der: 22, gm: 33, gc: 72, sg: -39, ultimas: ["D", "D", "D", "D", "D"], proximo: "cruzeiro", status: "rebaixamento" }
];


// ===== ZONAS (fonte única de cores e textos: tabela, filtros e legenda) =====
const legendaQualificacaoRebaixamento = {
  // campeao:                  { label: "1º: Campeão",                cor: "#FFD700" },
  libertadores_fase_grupos: { label: "1º - 4º: Libertadores (G4)", cor: "#234bc5" },
  pre_libertadores:         { label: "5º - 6º: Pré-Libertadores",  cor: "#447eff" },
  sul_americana:            { label: "7º - 11º: Sul-Americana",    cor: "#358856" },
  neutro:                   { label: "12º - 16º: Neutro",          cor: "#64748b" },
  rebaixamento:             { label: "17º - 20º: Rebaixamento",    cor: "#d93829" }
};

// Clubes já rebaixados matematicamente (mostram "R" na tabela e na legenda)
// const clubesCampeao = [""]; // quando for campeão matemático: ["flamengo"]
const clubesLiberta    = ["flamengo", "palmeiras"];   // possíveis na 4ª colocação:  "cruzeiro", "fluminense" , "athletico-pr" "bahia"
//const clubesPreLiberta = ["athletico-pr", "bahia"];                possíveis candidatos: "atletico-mg" "santos" "bragantino" "vasco"
//const clubesSula       = ["atletico-mg", "santos", "bragantino", "vasco", "sao-paulo"];  possíveis candidatos:  "botafogo" "coritiba"
//const clubesNeutro     = ["botafogo", "coritiba", "vitoria", "mirassol", "corinthians"];  possível candidato: "internacional"
const clubesRebaixados = ["chapecoense"]; // possiveis rebaidos "remo" "internacional" "gremio"  "coritiba"  "vitoria" "corinthians"  "mirassol" "botafogo"

// Sigla, nome e cores de cada zona (a ordem define quem tem prioridade)
const zonasSiglas = [
  // { lista: clubesCampeao, sigla: "👑", nome: "Campeão", cor: "#FFD700", texto: "#FFD700" },
  { lista: clubesLiberta,    sigla: "Lib",    nome: "Libertadores",     cor: "#234bc5", texto: "#9db8ff" },
  // { lista: clubesPreLiberta, sigla: "PreLib", nome: "Pré Libertadores", cor: "#447eff", texto: "#b3caff" },
  // { lista: clubesSula,       sigla: "Sula",   nome: "Sulamericana",     cor: "#358856", texto: "#86dca7" },
  // { lista: clubesNeutro,     sigla: "Neu",    nome: "Neutro",           cor: "#64748b", texto: "#cbd5e1" },
  { lista: clubesRebaixados, sigla: "R",      nome: "Rebaixado",        cor: "#d93829", texto: "#ff6b5e" },
];

// Define a zona pela POSIÇÃO atual (o simulador reordena a tabela)
function statusPorPosicao(pos) {
  // if (pos <=1) return ""
  if (pos <= 4) return "libertadores_fase_grupos";
  if (pos <= 6) return "pre_libertadores";
  if (pos <= 11) return "sul_americana";
  if (pos <= 16) return "neutro";
  return "rebaixamento";
}

// ===== FILTROS POR ZONA =====
let filtroClassificacao = "todos";
let ultimosDadosClassificacao = dadosClassificacao;

const filtrosClassificacao = [
  // {id: "campeao", label: "👑" , faixa: "1º"},
  { id: "libertadores_fase_grupos", label: "Libertadores - G4", faixa: "1º ao 4º" },
  { id: "pre_libertadores",         label: "Pré-Libertadores",  faixa: "5º e 6º" },
  { id: "sul_americana",            label: "Sul-Americana",     faixa: "7º ao 11º" },
  { id: "neutro",                   label: "Neutro",            faixa: "12º ao 16º" },
  { id: "rebaixamento",             label: "Rebaixamento",      faixa: "17º ao 20º" },
  { id: "todos",                    label: "Ver tudo",          faixa: "" }
];

function renderizarFiltros() {
const container = document.getElementById("filtros-classificacao");
if (!container) return;

container.innerHTML = filtrosClassificacao.map(f => {
const ativo = f.id === filtroClassificacao;
const zona = legendaQualificacaoRebaixamento[f.id];
const base = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition ";
const tema = f.id === "todos"
? "bg-navy-950 text-white border border-gold/40 hover:border-gold "
: "bg-slate-200 text-navy-950 hover:bg-white ";
const anel = ativo ? "ring-2 ring-gold ring-offset-2 ring-offset-navy-950" : "";
const dot = zona ? `<span class="w-2.5 h-2.5 rounded-full inline-block" style="background:${zona.cor}" aria-hidden="true"></span>` : "";
const faixa = f.faixa ? `<span class="opacity-60 text-[11px]">${f.faixa}</span>` : "";
return `<button type="button" data-filtro="${f.id}" aria-pressed="${ativo}" class="${base}${tema}${anel}">${dot}<span>${f.label}</span>${faixa}</button>`;
}).join("");

container.querySelectorAll("button").forEach(btn => {
btn.addEventListener("click", () => {
filtroClassificacao = btn.dataset.filtro;
renderizarFiltros();
renderizarTabelaClassificacao(ultimosDadosClassificacao);
});
});
}

// 📊 Mapeamento dos escudos dos times
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
const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
const logo = teamLogos[slug] || 'img/default.png';

return { name, logo };
}

function renderizarTabelaClassificacao(dados = dadosClassificacao) {
const tbody = document.getElementById("tabela-corpo");
if (!tbody) return;

ultimosDadosClassificacao = dados;
tbody.innerHTML = "";

const visiveis = filtroClassificacao === "todos"
? dados
: dados.filter(i => statusPorPosicao(i.pos) === filtroClassificacao);

visiveis.forEach((item) => {
const isbahia = item.slug === "bahia";
const teamData = getTeam(item.slug);
const proximoData = getTeam(item.proximo || "");

// Zona de classificação calculada pela posição atual
const status = statusPorPosicao(item.pos);
const cor = status ? legendaQualificacaoRebaixamento[status].cor : null;

let posBadgeClass = "font-mono px-2 py-0.5 rounded text-xs font-bold ";
let posBadgeStyle = "";
let trClasses = "hover:bg-navy-800/50 transition-colors ";

if (cor) {
posBadgeClass += "text-white border";
posBadgeStyle = `background:${cor}55; border-color:${cor};`;
if (status === "rebaixamento") trClasses += "bg-rose-950/20 ";
} else {
posBadgeClass += "text-slate-400 bg-navy-800/40";
}

if (isbahia) {
trClasses = "bg-gradient-to-r from-azul-600/40 via-navy-800 to-vermelho-600/30 font-bold text-white border-l-4 border-gold shadow-lg shadow-blue-900/40 scale-[1.01] transition-transform";
posBadgeClass = "bg-gold text-navy-950 font-black px-2 py-0.5 rounded text-xs border border-gold shadow";
posBadgeStyle = "";
}

const ultimosHTML = (item.ultimas || []).map(resultado => {
if (resultado === 'V') {
return `<span class="w-5 h-5 inline-flex items-center justify-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[10px] font-extrabold">V</span>`;
} else if (resultado === 'E') {
return `<span class="w-5 h-5 inline-flex items-center justify-center bg-slate-500/20 text-slate-300 border border-slate-500/40 rounded-full text-[10px] font-extrabold">E</span>`;
} else {
return `<span class="w-5 h-5 inline-flex items-center justify-center bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full text-[10px] font-extrabold">D</span>`;
}
}).join(' ');

let sgClass = "font-mono ";
if (item.sg > 0) sgClass += isbahia ? "text-emerald-300 font-bold" : "text-emerald-400 font-medium";
else if (item.sg < 0) sgClass += "text-rose-400 font-medium";
else sgClass += "text-slate-400";

const tr = document.createElement("tr");
tr.className = trClasses.trim();

tr.innerHTML = `
<td class="py-3 px-4"><span class="${posBadgeClass}" style="${posBadgeStyle}">${item.pos}º</span></td>
<td class="py-3 px-4 flex items-center gap-2.5 font-medium text-slate-200">
${clubesLiberta.includes(item.slug) ? '<span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#234bc5] bg-[#234bc5]/20 text-[#9db8ff]" title="Libertadores">LIB</span>' : ''}

${clubesRebaixados.includes(item.slug) ? '<span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#d93829] bg-[#d93829]/20 text-[#ff6b5e]" title="Rebaixado">R</span>' : ''}
<img src="${teamData.logo}" alt="Escudo do ${item.clube}" class="w-6 h-6 object-contain shrink-0 drop-shadow" onerror="this.onerror=null; this.src='img/default.png';">
<span class="${isbahia ? 'text-white font-black tracking-wide' : ''}">${item.clube}</span>
${isbahia ? '<span class="ml-1 text-[10px] bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider">Esquadrão</span>' : ''}
</td>
<td class="py-3 px-3 text-center font-mono ${isbahia ? 'text-gold font-black text-lg' : 'font-bold text-white'}">${item.pts}</td>
<td class="py-3 px-3 text-center ${isbahia ? 'text-white font-bold' : 'text-slate-300'}">${item.pj}</td>
<td class="py-3 px-3 text-center ${isbahia ? 'text-white font-bold' : 'text-slate-300'}">${item.vit}</td>
<td class="py-3 px-3 text-center ${isbahia ? 'text-white font-bold' : 'text-slate-300'}">${item.e}</td>
<td class="py-3 px-3 text-center ${isbahia ? 'text-white font-bold' : 'text-slate-300'}">${item.der}</td>
<td class="py-3 px-3 text-center ${isbahia ? 'text-white font-bold' : 'text-slate-300'}">${item.gm}</td>
<td class="py-3 px-3 text-center ${isbahia ? 'text-white font-bold' : 'text-slate-300'}">${item.gc}</td>
<td class="py-3 px-3 text-center ${sgClass}">${item.sg > 0 ? '+' + item.sg : item.sg}</td>
<td class="py-3 px-3 text-center">
<div class="flex items-center justify-center gap-1">${ultimosHTML}</div>
</td>
<td class="py-3 px-3 text-center">
<div class="flex items-center justify-center gap-1.5" title="Próximo jogo contra ${proximoData.name}">
<img src="${proximoData.logo}" alt="Escudo do ${proximoData.name}" class="w-5 h-5 object-contain" onerror="this.onerror=null; this.src='img/default.png';">
<span class="text-xs text-slate-300 hidden md:inline">${proximoData.name}</span>
</div>
</td>
`;

tbody.appendChild(tr);
});
}

// ${clubesPreLiberta.includes(item.slug) ? '<span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#447eff] bg-[#447eff]/20 text-[#b3caff]" title="Libertadores">PreLIB</span>' : ''}
// ${clubesSula.includes(item.slug) ? '<span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#358856] bg-[#358856]/20 text-[#86dca7]" title="Libertadores">SULA</span>' : ''}
// ${clubesNeutro.includes(item.slug) ? '<span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#64748b] bg-[#64748b]/20 text-[#cbd5e1]" title="Libertadores">NEU</span>' : ''}

function renderizarLegendaClassificacao() {
const containerTabela = document.getElementById("tabela-corpo")?.closest('.overflow-x-auto') || document.getElementById("tabela-corpo")?.parentElement;

if (!containerTabela || document.getElementById("legenda-classificacao")) return;

// Legenda gerada a partir do mesmo objeto que define as cores da tabela
const itens = Object.values(legendaQualificacaoRebaixamento).map(l => `
<div class="flex items-center gap-2">
<span class="w-3.5 h-3.5 rounded inline-block" style="background:${l.cor}"></span>
<span>${l.label}</span>
</div>`).join("");


// const itemCampeao = clubesCampeao.length
//   ? `<div class="flex items-center gap-2"><span class="font-extrabold text-[#FFD700]">👑</span><span>- Campeão</span></div>`
//   : "";

const itemLiberta = clubesLiberta.length
  ? `<div class="flex items-center gap-2"><span class="font-extrabold text-[#9db8ff]">Lib</span><span>- Libertadores</span></div>`
  : "";

// const itemPreLiberta = clubesPreLiberta.length
//   ? `<div class="flex items-center gap-2"><span class="font-extrabold text-[#b3caff]">PreLib</span><span>- Pré Libertadores</span></div>`
//   : "";

// const itemSula = clubesSula.length
//   ? `<div class="flex items-center gap-2"><span class="font-extrabold text-[#86dca7]">Sula</span><span>- Sulamericana</span></div>`
//   : "";

// const itemNeutro = clubesNeutro.length
//   ? `<div class="flex items-center gap-2"><span class="font-extrabold text-[#cbd5e1]">Neu</span><span>- Neutro</span></div>`
//   : "";

const itemRebaixado = clubesRebaixados.length
  ? `<div class="flex items-center gap-2"><span class="font-extrabold text-[#ff6b5e]">R</span><span>- Rebaixado</span></div>`
  : "";

const legendaHTML = `
<div id="legenda-classificacao" class="mt-6 p-4 bg-navy-900 border border-navy-800 rounded-xl flex flex-wrap gap-4 text-xs font-medium justify-between items-center text-slate-300">
// ${itens}${itemLiberta}${itemRebaixado}
</div>
`;

// ${itemCampeao}${itemPreLiberta}${itemSula}${itemNeutro}

containerTabela.insertAdjacentHTML('afterend', legendaHTML);
}

// ===== DICIONÁRIO DE PRÓXIMOS CONFRONTOS POR RODADA =====
const proximosJogosPorRodada = {
36: {
"palmeiras": "flamengo", "flamengo": "palmeiras",
"bahia": "coritiba", "coritiba": "bahia",
"chapecoense": "cruzeiro", "cruzeiro": "chapecoense",
"athletico-pr": "remo", "remo": "athletico-pr",
"fluminense": "mirassol", "mirassol": "fluminense",
"bragantino": "vasco", "vasco": "bragantino",
"internacional": "vitoria", "vitoria": "internacional",
"botafogo": "sao-paulo", "sao-paulo": "botafogo",
"santos": "gremio", "gremio": "santos",
"atletico-mg": "corinthians", "corinthians": "atletico-mg"
},
37: {
"chapecoense": "palmeiras", "palmeiras": "chapecoense",
"sao-paulo": "remo", "remo": "sao-paulo",
"fluminense": "cruzeiro", "cruzeiro": "fluminense",
"botafogo": "bahia", "bahia": "botafogo",
"vitoria": "santos", "santos": "vitoria",
"coritiba": "flamengo", "flamengo": "coritiba",
"internacional": "bragantino", "bragantino": "internacional",
"mirassol": "athletico-pr", "athletico-pr": "mirassol",
"corinthians": "gremio", "gremio": "corinthians",
"atletico-mg": "vasco", "vasco": "atletico-mg"
},

38: {
"remo": "corinthians", "corinthians": "remo",
"bahia": "atletico-mg", "atletico-mg": "bahia",
"athletico-pr": "sao-paulo", "sao-paulo": "athletico-pr",
"gremio": "mirassol", "mirassol": "gremio",
"cruzeiro": "internacional", "internacional": "cruzeiro",
"bragantino": "fluminense", "fluminense": "bragantino",
"palmeiras": "coritiba", "coritiba": "palmeiras",
"santos": "botafogo", "botafogo": "santos",
"vasco": "vitoria", "vitoria": "vasco",
"flamengo": "chapecoense", "chapecoense": "flamengo"
}
};

function atualizarRodadaTabela(numeroRodada) {
const mapaConfrontos = proximosJogosPorRodada[numeroRodada];
if (!mapaConfrontos) return;

dadosClassificacao.forEach(item => {
if (mapaConfrontos[item.slug]) {
item.proximo = mapaConfrontos[item.slug];
}
});

const tabelaAtual = LocalStorage.get("tabela_classificacao", dadosClassificacao);
renderizarTabelaClassificacao(tabelaAtual);
}

// ===== CALENDÁRIO COMPLETO DAS RODADAS =====
const calendarioRodadas = [
{
rodada: 36,
jogos: [
{ id: "r36_j1", mandante: "palmeiras", visitante: "flamengo", data: "Sábado, 21/11", hora: "16:30", estadio: "Nubank Parque" },
{ id: "r36_j2", mandante: "bahia", visitante: "coritiba", data: "Sábado, 21/11", hora: "17:30", estadio: "Arena Fonte Nova" },
{ id: "r36_j3", mandante: "chapecoense", visitante: "cruzeiro", data: "Sábado, 21/11", hora: "21:00", estadio: "Arena Condá" },
{ id: "r36_j4", mandante: "athletico-pr", visitante: "remo", data: "Domingo, 22/11", hora: "16:00", estadio: "Arena da Baixada" },
{ id: "r36_j5", mandante: "fluminense", visitante: "mirassol", data: "Domingo, 22/11", hora: "18:30", estadio: "Maracanã" },
{ id: "r36_j6", mandante: "bragantino", visitante: "vasco", data: "Domingo, 22/11", hora: "19:30", estadio: "Cícero Souza Marques" },
{ id: "r36_j7", mandante: "internacional", visitante: "vitoria", data: "Segunda-feira, 23/11", hora: "19:30", estadio: "Beira-Rio" },
{ id: "r36_j8", mandante: "botafogo", visitante: "sao-paulo", data: "Segunda-feira, 23/11", hora: "20:00", estadio: "Nilton Santos" },
{ id: "r36_j9", mandante: "santos", visitante: "gremio", data: "Segunda-feira, 23/11", hora: "21:00", estadio: "Morumbi" },
{ id: "r36_j10", mandante: "atletico-mg", visitante: "corinthians", data: "Quarta-feira, 25/11", hora: "20:00", estadio: "Arena MRV" }
]
},
{
rodada: 37,
jogos: [
{ id: "r37_j1", mandante: "chapecoense", visitante: "palmeiras", data: "Terça-feira, 24/11", hora: "18:00", estadio: "Arena Condá" },
{ id: "r37_j2", mandante: "sao-paulo", visitante: "remo", data: "Quinta-feira, 26/11", hora: "20:00", estadio: "Morumbi" },
{ id: "r37_j3", mandante: "fluminense", visitante: "cruzeiro", data: "Sexta-feira, 27/11", hora: "20:00", estadio: "Maracanã" },
{ id: "r37_j4", mandante: "botafogo", visitante: "bahia", data: "Sábado, 28/11", hora: "21:00", estadio: "Engenhão" },
{ id: "r37_j5", mandante: "vitoria", visitante: "santos", data: "Domingo, 29/11", hora: "16:00", estadio: "Barradão" },
{ id: "r37_j6", mandante: "coritiba", visitante: "flamengo", data: "Domingo, 29/11", hora: "16:00", estadio: "Couto Pereira" },
{ id: "r37_j7", mandante: "internacional", visitante: "bragantino", data: "Domingo, 29/11", hora: "18:30", estadio: "Beira-Rio" },
{ id: "r37_j8", mandante: "mirassol", visitante: "athletico-pr", data: "Domingo, 29/11", hora: "18:30", estadio: "Campos Maia" },
{ id: "r37_j9", mandante: "corinthians", visitante: "gremio", data: "Domingo, 29/11", hora: "18:30", estadio: "Neo Química Arena" },
{ id: "r37_j10", mandante: "atletico-mg", visitante: "vasco", data: "Domingo, 29/11", hora: "19:30", estadio: "Arena MRV" }
]
},
{
rodada: 38,
jogos: [
{ id: "r38_j1", mandante: "remo", visitante: "corinthians", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Mangueirão" },
{ id: "r38_j2", mandante: "bahia", visitante: "atletico-mg", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Arena Fonte Nova" },
{ id: "r38_j3", mandante: "athletico-pr", visitante: "sao-paulo", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Arena da Baixada" },
{ id: "r38_j4", mandante: "gremio", visitante: "mirassol", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Arena do Grêmio" },
{ id: "r38_j5", mandante: "cruzeiro", visitante: "internacional", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Mineirão" },
{ id: "r38_j6", mandante: "bragantino", visitante: "fluminense", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Cícero de Souza Marques" },
{ id: "r38_j7", mandante: "palmeiras", visitante: "coritiba", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Nubank Parque" },
{ id: "r38_j8", mandante: "santos", visitante: "botafogo", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Vila Belmiro" },
{ id: "r38_j9", mandante: "vasco", visitante: "vitoria", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "São Januário" },
{ id: "r38_j10", mandante: "flamengo", visitante: "chapecoense", data: "Quarta-feira, 02/12", hora: "21:30", estadio: "Maracanã" }
]
}
];

// ===== SIMULADOR DE CLASSIFICAÇÃO =====
function recalcularClassificacaoComPlacares(jogosAgendados) {
// Clona a estrutura base para acumular os pontos simulados
const tabelaProcessada = dadosClassificacao.map(time => ({ ...time }));

// Processa todos os jogos gravados com placar
jogosAgendados.forEach(rodadaObj => {
(rodadaObj.jogos || []).forEach(jogo => {
if (
jogo.golsMandante !== undefined && jogo.golsMandante !== null && jogo.golsMandante !== "" &&
jogo.golsVisitante !== undefined && jogo.golsVisitante !== null && jogo.golsVisitante !== ""
) {
const gM = parseInt(jogo.golsMandante, 10);
const gV = parseInt(jogo.golsVisitante, 10);

const mandante = tabelaProcessada.find(t => t.slug === jogo.mandante);
const visitante = tabelaProcessada.find(t => t.slug === jogo.visitante);

if (mandante && visitante) {
mandante.pj += 1;
visitante.pj += 1;

mandante.gm += gM;
mandante.gc += gV;
visitante.gm += gV;
visitante.gc += gM;

if (gM > gV) {
mandante.pts += 3;
mandante.vit += 1;
visitante.der += 1;
} else if (gM < gV) {
visitante.pts += 3;
visitante.vit += 1;
mandante.der += 1;
} else {
mandante.pts += 1;
visitante.pts += 1;
mandante.e += 1;
visitante.e += 1;
}

mandante.sg = mandante.gm - mandante.gc;
visitante.sg = visitante.gm - visitante.gc;
}
}
});
});

// Reordena a tabela seguindo os critérios de desempate do Brasileirão
tabelaProcessada.sort((a, b) => {
if (b.pts !== a.pts) return b.pts - a.pts; // 1º Pontos
if (b.vit !== a.vit) return b.vit - a.vit; // 2º Vitórias
if (b.sg !== a.sg) return b.sg - a.sg; // 3º Saldo de Gols
return b.gm - a.gm; // 4º Gols Pró
});

// Atualiza as posições (e a zona de cada clube) da tabela
tabelaProcessada.forEach((item, idx) => {
item.pos = idx + 1;
item.status = statusPorPosicao(item.pos);
});

LocalStorage.set("tabela_classificacao", tabelaProcessada);
renderizarTabelaClassificacao(tabelaProcessada);
}

// ===== EVENTOS E TROCA DE RODADAS =====
function aoMudarRodadaNoCalendario(numeroRodada) {
atualizarRodadaTabela(numeroRodada);

if (typeof renderizarJogosDoCalendario === 'function') {
renderizarJogosDoCalendario(numeroRodada);
}
}

/* ======================= HAMBURGER MENU ======================= */
function toggleMobileMenu() {
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerIcon = document.getElementById('hamburgerIcon');

if (mobileMenu) {
const isHidden = mobileMenu.classList.toggle('hidden');
mobileMenu.classList.toggle('flex', !isHidden);

if (hamburgerIcon) {
if (!isHidden) {
hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>';
} else {
hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>';
}
}
}
}

function initHamburgerMenu() {
const hamburgerBtn = document.getElementById('hamburgerBtn');

if (hamburgerBtn) {
// Remove listeners antigos criando um clone limpo do botão
const newBtn = hamburgerBtn.cloneNode(true);
hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);

newBtn.addEventListener('click', (e) => {
e.preventDefault();
toggleMobileMenu();
});
}
}

// Inicialização automática do menu ao carregar a página
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
initHamburgerMenu();
}

// Listener dinâmico para os campos de input de placar
document.addEventListener('input', (event) => {
if (event.target.classList.contains('input-placar')) {
const jogoId = event.target.dataset.jogoId;
const inputMandante = document.querySelector(`[data-mandante-id="${jogoId}"]`);
const inputVisitante = document.querySelector(`[data-visitante-id="${jogoId}"]`);

if (!inputMandante || !inputVisitante) return;

const jogosSalvos = LocalStorage.get("jogos_calendario", calendarioRodadas);

// Localiza e atualiza o jogo na estrutura de rodadas
jogosSalvos.forEach(rodadaObj => {
const jogo = rodadaObj.jogos.find(j => j.id === jogoId);
if (jogo) {
jogo.golsMandante = inputMandante.value;
jogo.golsVisitante = inputVisitante.value;
}
});

LocalStorage.set("jogos_calendario", jogosSalvos);
recalcularClassificacaoComPlacares(jogosSalvos);
showToast("Placar e classificação atualizados!", "success");
}
});

// ===== INICIALIZAÇÃO ÚNICA =====
document.addEventListener('DOMContentLoaded', () => {
initTailwindConfig();
initToastContainer();

// Restaura simulação salva ou exibe dados padrão
const jogosSalvos = LocalStorage.get("jogos_calendario", calendarioRodadas);
recalcularClassificacaoComPlacares(jogosSalvos);

renderizarFiltros();
renderizarLegendaClassificacao();
initHamburgerMenu();
});