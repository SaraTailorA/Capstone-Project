export async function authLayout(content) {
  return `
    <main class="min-h-screen flex">
      <div class="hidden lg:flex lg:w-1/2 bg-midnight-900 relative overflow-hidden items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-br from-solar-400/10 to-transparent"></div>
        <div class="relative z-10 text-center px-12">
          <svg class="w-24 h-24 text-solar-400 mx-auto mb-6 animate-glow" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="14" fill="currentColor"/>
            <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="32" y1="4" x2="32" y2="12"/>
              <line x1="32" y1="52" x2="32" y2="60"/>
              <line x1="4" y1="32" x2="12" y2="32"/>
              <line x1="52" y1="32" x2="60" y2="32"/>
              <line x1="12.2" y1="12.2" x2="17.9" y2="17.9"/>
              <line x1="46.1" y1="46.1" x2="51.8" y2="51.8"/>
              <line x1="12.2" y1="51.8" x2="17.9" y2="46.1"/>
              <line x1="46.1" y1="17.9" x2="51.8" y2="12.2"/>
            </g>
          </svg>
          <h2 class="text-3xl font-display font-bold text-white mb-4">Energía Solar Inteligente</h2>
          <p class="text-midnight-300 text-lg">Calcula tu sistema fotovoltaico ideal en minutos</p>
        </div>
      </div>
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-midnight-950">
        <div class="w-full max-w-md animate-fade-in">
          ${content}
        </div>
      </div>
    </main>
  `;
}
