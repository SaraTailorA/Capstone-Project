import './styles/main.css';
import { initRouter, registerPage, registerLayout } from './core/router.js';
import { initAuth } from './core/auth.js';

import { mainLayout } from './layouts/main.layout.js';
import { authLayout } from './layouts/auth.layout.js';
import { dashboardLayout } from './layouts/dashboard.layout.js';

import { landingPage } from './pages/landing/landing.page.js';
import { loginPage } from './pages/login/login.page.js';
import { registerPage as registerPageView } from './pages/register/register.page.js';
import { calculatorPage } from './pages/calculator/calculator.page.js';
import { dashboardPage } from './pages/dashboard/dashboard.page.js';
import { projectsPage } from './pages/projects/projects.page.js';
import { marketplacePage } from './pages/marketplace/marketplace.page.js';
import { installersPage } from './pages/installers/installers.page.js';

registerLayout('main', mainLayout);
registerLayout('auth', authLayout);
registerLayout('dashboard', dashboardLayout);

registerPage('landing', landingPage);
registerPage('login', loginPage);
registerPage('register', registerPageView);
registerPage('calculator', calculatorPage);
registerPage('dashboard', dashboardPage);
registerPage('projects', projectsPage);
registerPage('marketplace', marketplacePage);
registerPage('installers', installersPage);

async function bootstrap() {
  initAuth();
  initRouter();
}

document.addEventListener('DOMContentLoaded', bootstrap);
