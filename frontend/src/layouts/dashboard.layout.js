import { renderNavbar, attachNavbarEvents } from '../components/navbar.js';
import { renderSidebar } from '../components/sidebar.js';

export async function dashboardLayout(content, route) {
  setTimeout(() => attachNavbarEvents(), 0);
  const path = window.location.hash.slice(1) || '/dashboard';
  return `
    ${renderNavbar()}
    <div class="pt-16 flex min-h-screen">
      ${renderSidebar(path)}
      <main class="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in">
        ${content}
      </main>
    </div>
  `;
}
