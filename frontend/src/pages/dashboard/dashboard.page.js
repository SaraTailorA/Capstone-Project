import { renderStatCard } from '../../components/stat-card.js';
import { storage } from '../../core/storage.js';
import { getUser } from '../../core/auth.js';
import { formatCurrency } from '../../utils/formatters.js';

export async function dashboardPage() {
  const user = getUser();
  const projects = storage.get('projects') || [];

  const totalProjects = projects.length;
  const totalSavings = projects.reduce((sum, p) => sum + (p.results?.monthlySavings || 0), 0);
  const totalCo2 = projects.reduce((sum, p) => sum + (p.results?.co2Reduction || 0), 0);

  return `
    <div class="animate-fade-in">
      <div class="mb-8">
        <h1 class="section-title mb-1">Bienvenida, ${user?.name || 'Usuario'}</h1>
        <p class="text-midnight-400">Aquí está el resumen de tu actividad solar</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        ${renderStatCard({ icon: '📁', label: 'Total Proyectos', value: totalProjects })}
        ${renderStatCard({ icon: '✅', label: 'Proyectos Activos', value: Math.min(totalProjects, 3) })}
        ${renderStatCard({ icon: '💰', label: 'Ahorro Mensual', value: formatCurrency(totalSavings) })}
        ${renderStatCard({ icon: '🌱', label: 'CO₂ Reducido', value: `${Math.round(totalCo2)} kg` })}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 card">
          <h3 class="text-white font-semibold mb-4">📈 Ahorro Mensual Acumulado</h3>
          <div class="h-64 flex items-end justify-between gap-2 px-4">
            ${['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((m, i) => {
              const h = 20 + Math.random() * 60;
              return `
                <div class="flex flex-col items-center gap-2 flex-1">
                  <div class="w-full bg-gradient-to-t from-solar-400 to-solar-300 rounded-t-lg transition-all duration-500 hover:from-solar-500 hover:to-solar-400"
                       style="height: ${h}%"></div>
                  <span class="text-midnight-500 text-xs">${m}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card">
          <h3 class="text-white font-semibold mb-4">🔋 Distribución de Sistemas</h3>
          <div class="flex items-center justify-center h-64">
            <div class="relative w-40 h-40">
              <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#1e3a5f" stroke-width="3"/>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#FBBF24" stroke-width="3"
                  stroke-dasharray="65 35" stroke-linecap="round"/>
                <circle cx="18" cy="18" r="12" fill="none" stroke="#3b82f6" stroke-width="3"
                  stroke-dasharray="45 55" stroke-dashoffset="-65" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <p class="text-white font-bold text-lg">${totalProjects}</p>
                  <p class="text-midnight-400 text-xs">Sistemas</p>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-2 mt-4">
            <div class="flex items-center gap-2 text-sm">
              <div class="w-3 h-3 rounded-full bg-solar-400"></div>
              <span class="text-midnight-300">Residencial</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span class="text-midnight-300">Comercial</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white font-semibold">📁 Proyectos Recientes</h3>
          <a data-navigate="/dashboard/projects" class="text-solar-400 text-sm hover:text-solar-300 cursor-pointer">Ver todos →</a>
        </div>

        ${projects.length === 0 ? `
          <div class="text-center py-12">
            <div class="text-4xl mb-4">📭</div>
            <h4 class="text-white font-medium mb-2">No tienes proyectos aún</h4>
            <p class="text-midnight-400 text-sm mb-4">Calcula tu primer sistema solar para verlo aquí</p>
            <a data-navigate="/calculator" class="btn-primary inline-block cursor-pointer">Calcular Mi Sistema</a>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-midnight-700/50">
                  <th class="text-left py-3 px-4 text-midnight-400 font-medium">Nombre</th>
                  <th class="text-left py-3 px-4 text-midnight-400 font-medium">Consumo</th>
                  <th class="text-left py-3 px-4 text-midnight-400 font-medium">Paneles</th>
                  <th class="text-left py-3 px-4 text-midnight-400 font-medium">Ahorro</th>
                  <th class="text-left py-3 px-4 text-midnight-400 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${projects.slice(0, 5).map((p) => `
                  <tr class="border-b border-midnight-700/30 hover:bg-midnight-800/30 transition">
                    <td class="py-3 px-4 text-white font-medium">${p.name}</td>
                    <td class="py-3 px-4 text-midnight-300">${p.monthlyKwh} kWh</td>
                    <td class="py-3 px-4 text-midnight-300">${p.results?.panelsCount || '-'} paneles</td>
                    <td class="py-3 px-4 text-emerald-400 font-medium">${formatCurrency(p.results?.monthlySavings || 0)}/mes</td>
                    <td class="py-3 px-4 text-midnight-400">${new Date(p.createdAt).toLocaleDateString('es-MX')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}
