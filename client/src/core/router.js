const ROUTES = {
  '/': {
    page: 'landing',
    layout: 'main',
    auth: false,
    title: 'SolarCalc - Energía Solar Inteligente',
  },
  '/login': {
    page: 'login',
    layout: 'auth',
    auth: false,
    title: 'Iniciar Sesión - SolarCalc',
  },
  '/register': {
    page: 'register',
    layout: 'auth',
    auth: false,
    title: 'Registro - SolarCalc',
  },
  '/calculator': {
    page: 'calculator',
    layout: 'main',
    auth: false,
    title: 'Calculadora Solar - SolarCalc',
  },
  '/dashboard': {
    page: 'dashboard',
    layout: 'dashboard',
    auth: true,
    title: 'Dashboard - SolarCalc',
  },
  '/dashboard/projects': {
    page: 'projects',
    layout: 'dashboard',
    auth: true,
    title: 'Mis Proyectos - SolarCalc',
  },
  '/dashboard/projects/:id': {
    page: 'project-detail',
    layout: 'dashboard',
    auth: true,
    title: 'Proyecto - SolarCalc',
  },
  '/marketplace': {
    page: 'marketplace',
    layout: 'main',
    auth: false,
    title: 'Marketplace - SolarCalc',
  },
  '/marketplace/product/:id': {
    page: 'product-detail',
    layout: 'main',
    auth: false,
    title: 'Producto - SolarCalc',
  },
  '/installers': {
    page: 'installers',
    layout: 'main',
    auth: false,
    title: 'Instaladores - SolarCalc',
  },
};

const pages = {};
const layouts = {};

export function registerPage(name, renderFn) {
  pages[name] = renderFn;
}

export function registerLayout(name, renderFn) {
  layouts[name] = renderFn;
}

function matchRoute(path) {
  if (ROUTES[path]) return { route: ROUTES[path], params: {} };

  for (const [pattern, route] of Object.entries(ROUTES)) {
    const paramNames = [];
    const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });

    const match = path.match(new RegExp(`^${regexStr}$`));
    if (match) {
      const params = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      return { route, params };
    }
  }

  return { route: ROUTES['/'] || { page: 'not-found', layout: 'main', auth: false }, params: {} };
}

function navigate(path) {
  if (window.location.hash.slice(1) === path) {
    renderCurrentPage();
  } else {
    window.location.hash = path;
  }
}

async function renderCurrentPage() {
  const path = window.location.hash.slice(1) || '/';
  const { route, params } = matchRoute(path);

  if (route.auth) {
    const { isAuthenticated } = await import('./auth.js');
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
  }

  document.title = route.title || 'SolarCalc';

  const app = document.getElementById('app');
  const layoutFn = layouts[route.layout];
  const pageFn = pages[route.page];

  if (!pageFn) {
    app.innerHTML = `<div class="min-h-screen flex items-center justify-center"><h1 class="text-2xl text-midnight-300">Página no encontrada</h1></div>`;
    return;
  }

  const pageContent = await pageFn(params);

  if (layoutFn) {
    app.innerHTML = await layoutFn(pageContent, route);
  } else {
    app.innerHTML = pageContent;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  attachGlobalEvents();
}

function attachGlobalEvents() {
  document.querySelectorAll('[data-navigate]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const path = el.getAttribute('data-navigate');
      navigate(path);
    });
  });
}

export function initRouter() {
  window.addEventListener('hashchange', renderCurrentPage);
  if (!window.location.hash) {
    window.location.hash = '#/';
  } else {
    renderCurrentPage();
  }
}

export { navigate };
