/* ==========================================================================
   1. DADOS DAS CONQUISTAS COM AS IMAGENS DOS TROFÉUS
   ========================================================================== */
const conquistasBahia = [
  {
    id: "br",
    categoria: "nacional",
    titulo: "CAMPEONATO BRASILEIRO",
    quantidade: 2,
    anosTexto: "1959 e 1988",
    imagemTrofeu: "trofeu_serieA.jpg",
    corBg: "bg-blue-700",
    corTexto: "text-blue-100",
    detalhes: [
      { ano: 1959, destaque: "Taça Brasil contra o Santos de Pelé no Maracanã." },
      { ano: 1988, destaque: "Bicampeonato em cima do Internacional no Beira-Rio." }
    ]
  },
  {
    id: "ne",
    categoria: "regional",
    titulo: "COPA DO NORDESTE",
    quantidade: 5,
    anosTexto: "2001, 2002, 2017, 2021 e 2025",
    imagemTrofeu: "trofeu_copadonordeste.jpg",
    corBg: "bg-amber-500",
    corTexto: "text-amber-950",
    detalhes: [
      { ano: 2001, destaque: "Primeira conquista da Lampião League." },
      { ano: 2002, destaque: "Bicampeonato consecutivo do Nordeste." },
      { ano: 2017, destaque: "Título com a Arena Fonte Nova lotada." },
      { ano: 2021, destaque: "Tetracampeonato conquistado no Castelão." },
      { ano: 2025, destaque: "Pentacampeonato da Copa do Nordeste." }
    ]
  },
  {
    id: "ba",
    categoria: "estadual",
    titulo: "CAMPEONATO BAIANO",
    quantidade: 52,
    anosTexto: "1931, 1933, 1934, 1936, 1938, 1940, 1944, 1945, 1947, 1948, 1949, 1950, 1952, 1954, 1956, 1958, 1959, 1960, 1961, 1962, 1967, 1970, 1971, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1981, 1982, 1983, 1984, 1986, 1987, 1988, 1991, 1993, 1994, 1999, 2001, 2012, 2014, 2015, 2018, 2019, 2020, 2023, 2025, 2026",
    imagemTrofeu: "trofeu_estadual.png",
    corBg: "bg-red-600",
    corTexto: "text-red-100",
    detalhes: []
  }
];

/* ==========================================================================
   2. DADOS DOS ÍDOLOS (HALL DAS LENDAS) COM FOTOS REAIS
   ========================================================================== */
const idolosBahia = [
  { nome: "Bobô", periodo: "1985–1989", jogos: 180, gols: 80, foto: "bobô.jpg", papel: "Maestro do Bicampeonato de 88" },
  { nome: "Beijoca", periodo: "1969–1984", jogos: 320, gols: 106, foto: "beijoca.jpg", papel: "Símbolo de Raça Tricolor" },
  { nome: "Charles Fabian", periodo: "1988–1991", jogos: 175, gols: 86, foto: "charles.jpg", papel: "Artilheiro do Brasil em 88" },
  { nome: "Nonato", periodo: "1998–2003", jogos: 225, gols: 125, foto: "nonato.png", papel: "Maior Artilheiro do Século XXI" }
];



/* ==========================================================================
   3. RENDERIZAÇÃO DA GALERIA DE TROFÉUS (COM IMAGENS REAIS)
   ========================================================================== */
function renderizarTrofeus(filtro = "todos") {
  const container = document.getElementById("grid-conquistas");
  if (!container) return;

  const itensFiltrados = filtro === "todos" 
    ? conquistasBahia 
    : conquistasBahia.filter(c => c.categoria === filtro);

  container.innerHTML = itensFiltrados.map(item => `
    <div class="relative overflow-hidden rounded-xl ${item.corBg} p-6 shadow-xl text-white transition-all hover:scale-[1.01]">
      
      <!-- Número Total em Destaque no Canto Superior Direito -->
      <div class="absolute top-4 right-6 text-6xl sm:text-7xl font-black tracking-tighter opacity-90 font-display">
        ${item.quantidade}
      </div>

      <!-- Troféu em Foto Real e Título -->
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm shrink-0 border border-white/20 p-1 flex items-center justify-center">
          <img src="${item.imagemTrofeu}" alt="${item.titulo}" class="w-full h-full object-contain">
        </div>
        <h3 class="text-xl sm:text-2xl font-black tracking-wider uppercase font-display max-w-[65%]">
          ${item.titulo}
        </h3>
      </div>

      <!-- Anos das Conquistas -->
      <p class="text-xs sm:text-sm font-semibold leading-relaxed tracking-wide ${item.corTexto} max-w-[85%]">
        ${item.anosTexto}
      </p>

    </div>
  `).join('');
}

/* ==========================================================================
   4. RENDERIZAÇÃO DO HALL DOS ÍDOLOS (COM FOTOS REAIS)
   ========================================================================== */
function renderizarIdolos() {
  const container = document.getElementById("grid-idolos");
  if (!container) return;

  container.innerHTML = idolosBahia.map(idolo => `
    <div class="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all">
      <div class="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-amber-400/50">
        <img src="${idolo.foto}" alt="${idolo.nome}" class="w-full h-full object-cover">
      </div>
      <div>
        <h4 class="text-base font-bold text-white">${idolo.nome}</h4>
        <p class="text-xs text-amber-400 font-medium">${idolo.papel}</p>
        <p class="text-[11px] text-slate-400 mt-1">${idolo.periodo} • ${idolo.jogos} jogos • ${idolo.gols} gols</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   5. INICIALIZAÇÃO E EVENTOS DE FILTRO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderizarTrofeus();
  renderizarIdolos();

  document.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-filtro').forEach(b => {
        b.className = "btn-filtro px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 border border-slate-800 hover:text-white transition-all shrink-0";
      });

      e.currentTarget.className = "btn-filtro px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-950/60 text-white border border-rose-600 transition-all shrink-0";
      
      const filtro = e.currentTarget.dataset.filter;
      renderizarTrofeus(filtro);
    });
  });
});

