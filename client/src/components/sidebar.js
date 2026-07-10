import { isAuthenticated, getUser } from '../core/auth.js';

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📁', label: 'Mis Proyectos', path: '/dashboard/projects' },
  { icon: '👤', label: 'Mi Perfil', path: '/dashboard/profile' },
];

export function renderSidebar(activePath = '/dashboard') {
  const user = getUser();

  return `
    <aside class="w-64 bg-midnight-900/50 border-r border-midnight-700/30 min-h-screen p-4 hidden lg:block">
      <div class="mb-6 px-3 py-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-solar-400/20 flex items-center justify-center text-solar-400 font-bold">
            ${user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p class="text-white font-medium text-sm">${user?.name || 'Usuario'}</p>
            <p class="text-midnight-400 text-xs">${user?.email || ''}</p>
          </div>
        </div>
      </div>

      <nav class="space-y-1">
        ${menuItems.map((item) => `
          <a data-navigate="${item.path}" 
             class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer
                    ${activePath === item.path 
                      ? 'bg-solar-400/10 text-solar-400 border border-solar-400/20' 
                      : 'text-midnight-300 hover:bg-midnight-800 hover:text-white'}">
            <span class="text-lg">${item.icon}</span>
            <span class="font-medium">${item.label}</span>
          </a>
        `).join('')}
      </nav>

      <div class="mt-8 px-3">
        <a data-navigate="/calculator" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-midnight-400 hover:bg-midnight-800 hover:text-solar-400 transition cursor-pointer">
          <span class="text-lg">☀️</span>
          <span>Nueva Calculación</span>
        </a>
        <a data-navigate="/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-midnight-400 hover:bg-midnight-800 hover:text-white transition cursor-pointer mt-1">
          <span class="text-lg">🏠</span>
          <span>Volver al Inicio</span>
        </a>
      </div>
    </aside>
  `;
}
