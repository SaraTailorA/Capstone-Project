import { isAuthenticated, getUser, logout } from '../core/auth.js';
import { navigate } from '../core/router.js';

export function renderNavbar() {
  const auth = isAuthenticated();
  const user = getUser();

  return `
    <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-midnight-700/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a data-navigate="/" class="flex items-center gap-2 cursor-pointer group">
            <svg class="w-8 h-8 text-solar-400 group-hover:animate-glow" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="12" fill="currentColor"/>
              <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="32" y1="8" x2="32" y2="15"/>
                <line x1="32" y1="49" x2="32" y2="56"/>
                <line x1="8" y1="32" x2="15" y2="32"/>
                <line x1="49" y1="32" x2="56" y2="32"/>
                <line x1="14" y1="14" x2="19" y2="19"/>
                <line x1="45" y1="45" x2="50" y2="50"/>
                <line x1="14" y1="50" x2="19" y2="45"/>
                <line x1="45" y1="19" x2="50" y2="14"/>
              </g>
            </svg>
            <span class="text-xl font-display font-bold">
              <span class="text-white">Solar</span><span class="text-solar-400">Calc</span>
            </span>
          </a>

          <div class="hidden md:flex items-center gap-1">
            <a data-navigate="/calculator" class="btn-ghost text-sm cursor-pointer">Calculadora</a>
            <a data-navigate="/marketplace" class="btn-ghost text-sm cursor-pointer">Marketplace</a>
            <a data-navigate="/installers" class="btn-ghost text-sm cursor-pointer">Instaladores</a>
            ${auth ? `<a data-navigate="/dashboard" class="btn-ghost text-sm cursor-pointer">Dashboard</a>` : ''}
          </div>

          <div class="hidden md:flex items-center gap-3">
            ${auth ? `
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-solar-400/20 flex items-center justify-center text-solar-400 text-sm font-bold">
                  ${user?.name?.charAt(0) || 'U'}
                </div>
                <span class="text-sm text-midnight-200">${user?.name || 'Usuario'}</span>
                <button id="nav-logout" class="btn-ghost text-sm text-midnight-400 hover:text-red-400">Salir</button>
              </div>
            ` : `
              <a data-navigate="/login" class="btn-ghost text-sm cursor-pointer">Iniciar Sesión</a>
              <a data-navigate="/register" class="btn-primary text-sm !px-4 !py-2 cursor-pointer">Registrarse</a>
            `}
          </div>

          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-midnight-800 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="hidden md:hidden border-t border-midnight-700/30 bg-midnight-900/95 backdrop-blur-md">
        <div class="px-4 py-3 space-y-2">
          <a data-navigate="/calculator" class="block py-2 px-3 rounded-lg hover:bg-midnight-800 text-midnight-200 cursor-pointer">Calculadora</a>
          <a data-navigate="/marketplace" class="block py-2 px-3 rounded-lg hover:bg-midnight-800 text-midnight-200 cursor-pointer">Marketplace</a>
          <a data-navigate="/installers" class="block py-2 px-3 rounded-lg hover:bg-midnight-800 text-midnight-200 cursor-pointer">Instaladores</a>
          ${auth ? `<a data-navigate="/dashboard" class="block py-2 px-3 rounded-lg hover:bg-midnight-800 text-midnight-200 cursor-pointer">Dashboard</a>` : ''}
          <hr class="border-midnight-700"/>
          ${auth ? `
            <button id="nav-logout-mobile" class="block w-full text-left py-2 px-3 rounded-lg hover:bg-midnight-800 text-red-400">Cerrar Sesión</button>
          ` : `
            <a data-navigate="/login" class="block py-2 px-3 rounded-lg hover:bg-midnight-800 text-midnight-200 cursor-pointer">Iniciar Sesión</a>
            <a data-navigate="/register" class="block py-2 px-3 rounded-lg bg-solar-400 text-midnight-950 font-semibold text-center cursor-pointer">Registrarse</a>
          `}
        </div>
      </div>
    </nav>
  `;
}

export function attachNavbarEvents() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const logoutBtn = document.getElementById('nav-logout');
  const logoutBtnMobile = document.getElementById('nav-logout-mobile');
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleLogout);
}
