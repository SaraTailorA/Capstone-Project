import { login } from '../../core/auth.js';
import { navigate } from '../../core/router.js';
import { showToast } from '../../core/toast.js';

export async function loginPage() {
  setTimeout(() => {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value.trim();
        const password = form.password.value;
        const errorEl = document.getElementById('login-error');
        const btn = form.querySelector('button[type="submit"]');

        errorEl.textContent = '';
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin inline-block w-5 h-5 border-2 border-midnight-950 border-t-transparent rounded-full"></span> Ingresando...';

        try {
          await login(email, password);
          showToast('¡Bienvenido de vuelta!', 'success');
          navigate('/dashboard');
        } catch (err) {
          errorEl.textContent = err.message;
          btn.disabled = false;
          btn.textContent = 'Iniciar Sesión';
        }
      });
    }
  }, 0);

  return `
    <a data-navigate="/" class="flex items-center gap-2 mb-8 cursor-pointer group">
      <svg class="w-8 h-8 text-solar-400" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="12" fill="currentColor"/>
        <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="32" y1="8" x2="32" y2="15"/>
          <line x1="32" y1="49" x2="32" y2="56"/>
          <line x1="8" y1="32" x2="15" y2="32"/>
          <line x1="49" y1="32" x2="56" y2="32"/>
        </g>
      </svg>
      <span class="text-xl font-display font-bold">
        <span class="text-white">Solar</span><span class="text-solar-400">Calc</span>
      </span>
    </a>

    <h1 class="text-2xl font-display font-bold text-white mb-2">Bienvenido de Nuevo</h1>
    <p class="text-midnight-400 mb-8">Inicia sesión para acceder a tus proyectos</p>

    <form id="login-form" class="space-y-5">
      <div id="login-error" class="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-lg hidden"></div>

      <div>
        <label class="input-label">Correo Electrónico</label>
        <input type="email" name="email" required placeholder="tu@email.com" class="input-field" />
      </div>

      <div>
        <label class="input-label">Contraseña</label>
        <input type="password" name="password" required placeholder="••••••••" minlength="8" class="input-field" />
      </div>

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 text-midnight-300">
          <input type="checkbox" class="rounded border-midnight-600 bg-midnight-800 text-solar-400 focus:ring-solar-400" />
          Recordarme
        </label>
        <span class="text-solar-400 hover:text-solar-300 cursor-pointer">¿Olvidaste tu contraseña?</span>
      </div>

      <button type="submit" class="btn-primary w-full !py-3.5">Iniciar Sesión</button>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-midnight-700"></div></div>
        <div class="relative flex justify-center text-sm"><span class="px-3 bg-midnight-950 text-midnight-500">o continúa con</span></div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button type="button" class="btn-secondary !text-sm flex items-center justify-center gap-2">
          <span>G</span> Google
        </button>
        <button type="button" class="btn-secondary !text-sm flex items-center justify-center gap-2">
          <span>GH</span> GitHub
        </button>
      </div>
    </form>

    <p class="text-center text-midnight-400 text-sm mt-8">
      ¿No tienes cuenta?
      <a data-navigate="/register" class="text-solar-400 hover:text-solar-300 font-medium cursor-pointer"> Regístrate gratis</a>
    </p>
  `;
}
