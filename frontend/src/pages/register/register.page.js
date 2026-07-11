import { register } from '../../core/auth.js';
import { navigate } from '../../core/router.js';
import { showToast } from '../../core/toast.js';

export async function registerPage() {
  setTimeout(() => {
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const errorEl = document.getElementById('register-error');
        const btn = form.querySelector('button[type="submit"]');

        errorEl.textContent = '';
        errorEl.classList.add('hidden');

        if (password !== confirmPassword) {
          errorEl.textContent = 'Las contraseñas no coinciden';
          errorEl.classList.remove('hidden');
          return;
        }

        if (password.length < 8) {
          errorEl.textContent = 'La contraseña debe tener al menos 8 caracteres';
          errorEl.classList.remove('hidden');
          return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin inline-block w-5 h-5 border-2 border-midnight-950 border-t-transparent rounded-full"></span> Creando cuenta...';

        try {
          await register(name, email, password);
          showToast('¡Cuenta creada exitosamente!', 'success');
          navigate('/dashboard');
        } catch (err) {
          errorEl.textContent = err.message;
          errorEl.classList.remove('hidden');
          btn.disabled = false;
          btn.textContent = 'Crear Cuenta';
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

    <h1 class="text-2xl font-display font-bold text-white mb-2">Crear Cuenta</h1>
    <p class="text-midnight-400 mb-8">Regístrate para guardar tus cotizaciones</p>

    <form id="register-form" class="space-y-5">
      <div id="register-error" class="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-lg hidden"></div>

      <div>
        <label class="input-label">Nombre Completo</label>
        <input type="text" name="name" required placeholder="Tu nombre" class="input-field" />
      </div>

      <div>
        <label class="input-label">Correo Electrónico</label>
        <input type="email" name="email" required placeholder="tu@email.com" class="input-field" />
      </div>

      <div>
        <label class="input-label">Contraseña</label>
        <input type="password" name="password" required placeholder="Mínimo 8 caracteres" minlength="8" class="input-field" />
      </div>

      <div>
        <label class="input-label">Confirmar Contraseña</label>
        <input type="password" name="confirmPassword" required placeholder="Repite tu contraseña" minlength="8" class="input-field" />
      </div>

      <div class="flex items-start gap-2 text-sm">
        <input type="checkbox" required class="mt-1 rounded border-midnight-600 bg-midnight-800 text-solar-400 focus:ring-solar-400" />
        <span class="text-midnight-400">Acepto los <span class="text-solar-400 cursor-pointer">Términos y Condiciones</span> y la <span class="text-solar-400 cursor-pointer">Política de Privacidad</span></span>
      </div>

      <button type="submit" class="btn-primary w-full !py-3.5">Crear Cuenta</button>
    </form>

    <p class="text-center text-midnight-400 text-sm mt-8">
      ¿Ya tienes cuenta?
      <a data-navigate="/login" class="text-solar-400 hover:text-solar-300 font-medium cursor-pointer"> Inicia sesión</a>
    </p>
  `;
}
