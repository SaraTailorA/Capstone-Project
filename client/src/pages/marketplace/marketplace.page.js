import { PRODUCTS, CATEGORIES } from '../../utils/constants.js';
import { formatCurrency } from '../../utils/formatters.js';

export async function marketplacePage() {
  let filteredProducts = [...PRODUCTS];
  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'name';

  function getFiltered() {
    let result = [...PRODUCTS];
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }

  function renderProducts() {
    const products = getFiltered();
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = products.length === 0 ? `
      <div class="col-span-full text-center py-12">
        <div class="text-4xl mb-3">🔍</div>
        <p class="text-midnight-400">No se encontraron productos</p>
      </div>
    ` : products.map((p) => {
      const cat = CATEGORIES[p.category];
      return `
        <div class="card-hover group">
          <div class="relative mb-4">
            <div class="w-full h-40 rounded-xl bg-gradient-to-br from-midnight-700 to-midnight-800 flex items-center justify-center group-hover:from-midnight-600 group-hover:to-midnight-700 transition-all duration-300">
              <span class="text-5xl group-hover:scale-110 transition-transform">${cat?.icon || '📦'}</span>
            </div>
            <span class="absolute top-3 left-3 badge-solar">${cat?.label || p.category}</span>
          </div>
          <h3 class="text-white font-semibold mb-1 group-hover:text-solar-400 transition-colors">${p.name}</h3>
          <p class="text-midnight-400 text-sm mb-3">${p.brand} | ${p.model}</p>
          <div class="flex items-center gap-1 mb-3">
            ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}
            <span class="text-midnight-400 text-xs ml-1">(${p.reviews})</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-solar-400 font-bold text-xl">${formatCurrency(p.price)}</span>
            <button class="btn-ghost text-xs !px-3 !py-1.5">Ver Detalle</button>
          </div>
        </div>
      `;
    }).join('');
  }

  setTimeout(() => {
    document.querySelectorAll('.category-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        document.querySelectorAll('.category-btn').forEach((b) => {
          b.classList.toggle('bg-solar-400/20', b.dataset.category === activeCategory);
          b.classList.toggle('text-solar-400', b.dataset.category === activeCategory);
          b.classList.toggle('text-midnight-400', b.dataset.category !== activeCategory);
        });
        renderProducts();
      });
    });

    const searchInput = document.getElementById('marketplace-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
      });
    }

    const sortSelect = document.getElementById('marketplace-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        renderProducts();
      });
    }

    renderProducts();
  }, 0);

  return `
    <div class="page-container animate-fade-in">
      <div class="mb-8">
        <h1 class="section-title mb-2">Marketplace Solar</h1>
        <p class="text-midnight-400">Encuentra los mejores productos para tu sistema fotovoltaico</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="flex-1 relative">
          <input type="text" id="marketplace-search" placeholder="Buscar paneles, inversores, baterías..."
            class="input-field !pl-10" />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <select id="marketplace-sort" class="input-field !w-auto">
          <option value="name">Nombre A-Z</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="rating">Mejor Calificación</option>
        </select>
      </div>

      <div class="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button class="category-btn badge-solar !text-sm !px-4 !py-2 whitespace-nowrap bg-solar-400/20 text-solar-400" data-category="all">📦 Todos</button>
        ${Object.entries(CATEGORIES).map(([key, val]) => `
          <button class="category-btn badge !text-sm !px-4 !py-2 whitespace-nowrap bg-midnight-800 text-midnight-400 hover:bg-midnight-700" data-category="${key}">
            ${val.icon} ${val.label}
          </button>
        `).join('')}
      </div>

      <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      </div>
    </div>
  `;
}
