import { INSTALLERS } from '../../utils/constants.js';

export async function installersPage() {
  let filteredInstallers = [...INSTALLERS];
  let searchQuery = '';
  let filterCity = '';

  function getFiltered() {
    let result = [...INSTALLERS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((i) =>
        i.company.toLowerCase().includes(q) ||
        i.contact.toLowerCase().includes(q) ||
        i.city.toLowerCase().includes(q)
      );
    }
    if (filterCity) {
      result = result.filter((i) => i.city === filterCity);
    }
    return result;
  }

  function renderList() {
    const list = document.getElementById('installers-list');
    if (!list) return;
    const installers = getFiltered();

    list.innerHTML = installers.length === 0 ? `
      <div class="text-center py-12">
        <div class="text-4xl mb-3">🔍</div>
        <p class="text-midnight-400">No se encontraron instaladores</p>
      </div>
    ` : installers.map((inst) => `
      <div class="card-hover group">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-xl bg-solar-400/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            ${inst.verified ? '✅' : '🔧'}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-white font-semibold truncate">${inst.company}</h3>
              ${inst.verified ? '<span class="badge-green text-[10px]">Verificado</span>' : ''}
            </div>
            <p class="text-midnight-400 text-sm mb-2">${inst.contact}</p>
            <div class="flex items-center gap-3 text-xs text-midnight-500 mb-3">
              <span>📍 ${inst.city}, ${inst.state}</span>
              <span>⭐ ${inst.rating}</span>
              <span>🕐 ${inst.years} años</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-3">
              ${inst.specialties.map((s) => {
                const labels = { residential: 'Residencial', commercial: 'Comercial', industrial: 'Industrial', rural: 'Rural' };
                return `<span class="badge-blue text-[10px]">${labels[s] || s}</span>`;
              }).join('')}
              ${inst.certifications.map((c) => `<span class="badge-solar text-[10px]">${c}</span>`).join('')}
            </div>
            <div class="flex gap-2">
              <span class="text-midnight-400 text-xs">📧 ${inst.email}</span>
              <span class="text-midnight-400 text-xs">📞 ${inst.phone}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  setTimeout(() => {
    const searchInput = document.getElementById('installer-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderList();
      });
    }

    const citySelect = document.getElementById('installer-city');
    if (citySelect) {
      citySelect.addEventListener('change', (e) => {
        filterCity = e.target.value;
        renderList();
      });
    }

    renderList();
  }, 0);

  const cities = [...new Set(INSTALLERS.map((i) => i.city))];

  return `
    <div class="page-container animate-fade-in">
      <div class="mb-8">
        <h1 class="section-title mb-2">Directorio de Instaladores</h1>
        <p class="text-midnight-400">Encuentra instaladores certificados en tu zona</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 relative">
              <input type="text" id="installer-search" placeholder="Buscar por empresa, ciudad..."
                class="input-field !pl-10" />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <select id="installer-city" class="input-field !w-auto">
              <option value="">Todas las ciudades</option>
              ${cities.map((c) => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="card bg-midnight-900/50 p-4">
          <h4 class="text-white font-medium text-sm mb-2">Filtros</h4>
          <div class="space-y-2 text-sm">
            <label class="flex items-center gap-2 text-midnight-300 cursor-pointer">
              <input type="checkbox" checked class="rounded border-midnight-600 bg-midnight-800 text-solar-400" />
              Residencial
            </label>
            <label class="flex items-center gap-2 text-midnight-300 cursor-pointer">
              <input type="checkbox" checked class="rounded border-midnight-600 bg-midnight-800 text-solar-400" />
              Comercial
            </label>
            <label class="flex items-center gap-2 text-midnight-300 cursor-pointer">
              <input type="checkbox" class="rounded border-midnight-600 bg-midnight-800 text-solar-400" />
              Industrial
            </label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3">
          <div id="installers-list" class="space-y-4"></div>
        </div>

        <div class="lg:col-span-2">
          <div class="card sticky top-24 bg-midnight-900/50">
            <h3 class="text-white font-semibold mb-4">🗺️ Mapa de Cobertura</h3>
            <div class="w-full h-64 rounded-xl bg-midnight-800 border border-midnight-700/30 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-solar-400/5 to-transparent"></div>
              <div class="relative z-10 text-center">
                <div class="text-4xl mb-2">📍</div>
                <p class="text-midnight-400 text-sm">Mapa de instaladores</p>
                <p class="text-midnight-500 text-xs mt-1">${INSTALLERS.length} instaladores en ${cities.length} ciudades</p>
              </div>
              ${INSTALLERS.slice(0, 4).map((inst, i) => {
                const positions = ['top-8 left-12', 'top-16 right-20', 'bottom-16 left-20', 'bottom-8 right-12'];
                return `
                  <div class="absolute ${positions[i]} w-6 h-6 bg-solar-400 rounded-full animate-pulse flex items-center justify-center" title="${inst.company}">
                    <div class="w-2 h-2 bg-midnight-950 rounded-full"></div>
                  </div>
                `;
              }).join('')}
            </div>
            <div class="mt-4 space-y-2">
              <div class="flex items-center gap-2 text-xs text-midnight-400">
                <div class="w-2 h-2 rounded-full bg-solar-400"></div>
                Instaladores verificados
              </div>
              <div class="flex items-center gap-2 text-xs text-midnight-400">
                <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                Zonas de cobertura
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
