import { storage } from '../../core/storage.js';
import { formatCurrency } from '../../utils/formatters.js';
import { showToast } from '../../core/toast.js';

export async function projectsPage() {
  const projects = storage.get('projects') || [];

  setTimeout(() => {
    document.querySelectorAll('.delete-project').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (confirm('¿Eliminar este proyecto?')) {
          const projects = storage.get('projects') || [];
          storage.set('projects', projects.filter((p) => p.id !== id));
          showToast('Proyecto eliminado', 'success');
          btn.closest('tr')?.remove();
        }
      });
    });
  }, 0);

  return `
    <div class="animate-fade-in">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="section-title mb-1">Mis Proyectos</h1>
          <p class="text-midnight-400">${projects.length} proyecto(s) guardado(s)</p>
        </div>
        <a data-navigate="/calculator" class="btn-primary cursor-pointer">+ Nuevo Proyecto</a>
      </div>

      ${projects.length === 0 ? `
        <div class="card text-center py-16">
          <div class="text-5xl mb-4">📋</div>
          <h3 class="text-white font-semibold text-xl mb-2">Sin proyectos aún</h3>
          <p class="text-midnight-400 mb-6">Calcula tu primer sistema solar y guárdalo aquí</p>
          <a data-navigate="/calculator" class="btn-primary inline-block cursor-pointer">Calcular Ahora</a>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          ${projects.map((p) => `
            <div class="card-hover group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-solar-400/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ☀️
                </div>
                <button class="delete-project text-midnight-500 hover:text-red-400 transition p-1" data-id="${p.id}">
                  🗑️
                </button>
              </div>
              <h3 class="text-white font-semibold text-lg mb-3">${p.name}</h3>
              <div class="space-y-2 text-sm mb-4">
                <div class="flex justify-between">
                  <span class="text-midnight-400">Consumo</span>
                  <span class="text-white">${p.monthlyKwh} kWh/mes</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-midnight-400">Paneles</span>
                  <span class="text-white">${p.results?.panelsCount || '-'} paneles</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-midnight-400">Costo</span>
                  <span class="text-white">${formatCurrency(p.results?.cost?.total || 0)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-midnight-400">Ahorro</span>
                  <span class="text-emerald-400 font-semibold">${formatCurrency(p.results?.monthlySavings || 0)}/mes</span>
                </div>
              </div>
              <div class="flex gap-2 pt-4 border-t border-midnight-700/30">
                <button class="btn-ghost text-xs flex-1">📥 PDF</button>
                <button class="btn-ghost text-xs flex-1">📊 Detalle</button>
              </div>
              <p class="text-midnight-600 text-xs mt-3">Creado: ${new Date(p.createdAt).toLocaleDateString('es-MX')}</p>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}
