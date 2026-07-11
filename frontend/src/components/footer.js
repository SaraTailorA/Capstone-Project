export function renderFooter() {
  return `
    <footer class="bg-midnight-900 border-t border-midnight-700/50 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-7 h-7 text-solar-400" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="12" fill="currentColor"/>
                <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="32" y1="8" x2="32" y2="15"/>
                  <line x1="32" y1="49" x2="32" y2="56"/>
                  <line x1="8" y1="32" x2="15" y2="32"/>
                  <line x1="49" y1="32" x2="56" y2="32"/>
                </g>
              </svg>
              <span class="text-lg font-display font-bold">
                <span class="text-white">Solar</span><span class="text-solar-400">Calc</span>
              </span>
            </div>
            <p class="text-midnight-400 text-sm leading-relaxed">
              Calcula tu sistema de energía solar fotovoltaico de forma rápida y precisa.
            </p>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Producto</h4>
            <ul class="space-y-2 text-sm">
              <li><a data-navigate="/calculator" class="text-midnight-400 hover:text-solar-400 transition cursor-pointer">Calculadora</a></li>
              <li><a data-navigate="/marketplace" class="text-midnight-400 hover:text-solar-400 transition cursor-pointer">Marketplace</a></li>
              <li><a data-navigate="/installers" class="text-midnight-400 hover:text-solar-400 transition cursor-pointer">Instaladores</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Empresa</h4>
            <ul class="space-y-2 text-sm">
              <li><span class="text-midnight-400">Sobre nosotros</span></li>
              <li><span class="text-midnight-400">Blog</span></li>
              <li><span class="text-midnight-400">Contacto</span></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><span class="text-midnight-400">Privacidad</span></li>
              <li><span class="text-midnight-400">Términos</span></li>
              <li><span class="text-midnight-400">Cookies</span></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-midnight-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-midnight-500 text-sm">&copy; 2026 SolarCalc. Todos los derechos reservados.</p>
          <div class="flex gap-4">
            <span class="w-8 h-8 rounded-full bg-midnight-800 flex items-center justify-center text-midnight-400 hover:text-solar-400 transition cursor-pointer text-sm">f</span>
            <span class="w-8 h-8 rounded-full bg-midnight-800 flex items-center justify-center text-midnight-400 hover:text-solar-400 transition cursor-pointer text-sm">in</span>
            <span class="w-8 h-8 rounded-full bg-midnight-800 flex items-center justify-center text-midnight-400 hover:text-solar-400 transition cursor-pointer text-sm">ig</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
