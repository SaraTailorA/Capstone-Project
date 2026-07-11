import { renderNavbar, attachNavbarEvents } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';

export async function mainLayout(content) {
  setTimeout(() => attachNavbarEvents(), 0);
  return `
    ${renderNavbar()}
    <main class="pt-16 min-h-screen">
      ${content}
    </main>
    ${renderFooter()}
  `;
}
