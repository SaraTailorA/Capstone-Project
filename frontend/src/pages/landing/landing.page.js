import { renderStatCard } from '../../components/stat-card.js';

export async function landingPage() {
  return `
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-solar-400/5 via-transparent to-transparent"></div>
      <div class="absolute top-20 left-1/4 w-72 h-72 bg-solar-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-solar-500/5 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-up">
            <div class="badge-solar mb-6 inline-flex">Plataforma de Energía Solar</div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Energía Solar
              <span class="gradient-text block">Inteligente</span>
            </h1>
            <p class="text-midnight-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Calcula tu sistema fotovoltaico ideal, compara costos y descubre cuánto puedes ahorrar con energía solar limpia.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a data-navigate="/calculator" class="btn-primary text-center text-lg !px-8 !py-4 cursor-pointer">
                Calcular Mi Sistema
              </a>
              <a data-navigate="/marketplace" class="btn-outline text-center cursor-pointer">
                Ver Productos
              </a>
            </div>
          </div>

          <div class="relative animate-fade-in hidden lg:block">
            <div class="w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-midnight-800 to-midnight-900 border border-midnight-700/50 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-solar-400/10 to-transparent"></div>
              <svg class="w-48 h-48 text-solar-400/80 relative z-10" viewBox="0 0 200 200" fill="none">
                <rect x="30" y="60" width="140" height="90" rx="8" stroke="currentColor" stroke-width="3" fill="none"/>
                <line x1="30" y1="85" x2="170" y2="85" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                <line x1="30" y1="110" x2="170" y2="110" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                <line x1="80" y1="60" x2="80" y2="150" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                <line x1="120" y1="60" x2="120" y2="150" stroke="currentColor" stroke-width="2" opacity="0.5"/>
                <circle cx="100" cy="40" r="16" fill="currentColor" opacity="0.3"/>
                <circle cx="100" cy="40" r="10" fill="currentColor" opacity="0.6"/>
                <line x1="100" y1="20" x2="100" y2="12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="100" y1="60" x2="100" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="80" y1="40" x2="72" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="120" y1="40" x2="128" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="86" y1="28" x2="82" y2="24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="114" y1="52" x2="118" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="114" y1="28" x2="118" y2="24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="86" y1="52" x2="82" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              </svg>
              <div class="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                <div class="bg-midnight-900/80 backdrop-blur rounded-xl px-4 py-2 border border-midnight-700/50">
                  <p class="text-solar-400 text-xs">Sistema Estimado</p>
                  <p class="text-white font-bold">10.45 kW</p>
                </div>
                <div class="bg-midnight-900/80 backdrop-blur rounded-xl px-4 py-2 border border-midnight-700/50">
                  <p class="text-solar-400 text-xs">Ahorro Mensual</p>
                  <p class="text-white font-bold">$153 USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${renderStatCard({ icon: '☀️', label: 'Cálculos Realizados', value: '12,500+' })}
        ${renderStatCard({ icon: '⚡', label: 'kW Instalados', value: '85,000+' })}
        ${renderStatCard({ icon: '💰', label: 'Ahorro Generado', value: '$2.4M' })}
        ${renderStatCard({ icon: '🌱', label: 'Toneladas CO₂', value: '1,250+' })}
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="section-title mb-4">¿Cómo Funciona?</h2>
        <p class="text-midnight-400 max-w-2xl mx-auto">Cuatro pasos simples para dimensionar tu sistema solar ideal</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        ${[
          { step: '1', icon: '📝', title: 'Ingresa tus Datos', desc: 'Captura tu consumo mensual en kWh o estímalo con tus electrodomésticos.' },
          { step: '2', icon: '⚡', title: 'Calculamos tu Sistema', desc: 'Nuestro algoritmo dimensiona paneles, inversor, breakers y protecciones.' },
          { step: '3', icon: '📊', title: 'Revisa los Resultados', desc: 'Costo estimado, ahorro mensual, retorno de inversión y impacto ambiental.' },
          { step: '4', icon: '📥', title: 'Descarga tu Cotización', desc: 'Genera un PDF profesional con todos los detalles de tu proyecto solar.' },
        ].map((item) => `
          <div class="card-hover text-center relative group">
            <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-solar-400 text-midnight-950 flex items-center justify-center text-sm font-bold">
              ${item.step}
            </div>
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">${item.icon}</div>
            <h3 class="text-white font-semibold text-lg mb-2">${item.title}</h3>
            <p class="text-midnight-400 text-sm leading-relaxed">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="section-title mb-4">¿Por Qué SolarCalc?</h2>
        <p class="text-midnight-400 max-w-2xl mx-auto">Herramientas profesionales para tomar decisiones informadas sobre energía solar</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${[
          { icon: '🔬', title: 'Cálculo Preciso', desc: 'Algoritmo basado en parámetros reales de irradiación solar, eficiencia de sistemas y condiciones ambientales de México.' },
          { icon: '💰', title: 'Análisis Financiero', desc: 'Desglose completo de costos, proyección de ahorro a 25 años y cálculo de retorno de inversión en meses.' },
          { icon: '🌍', title: 'Impacto Ambiental', desc: 'Mide tu contribución a la reducción de emisiones de CO₂ y el impacto positivo en el planeta.' },
        ].map((item) => `
          <div class="card group hover:border-solar-400/30 transition-all duration-300">
            <div class="text-3xl mb-4">${item.icon}</div>
            <h3 class="text-white font-semibold text-lg mb-2">${item.title}</h3>
            <p class="text-midnight-400 text-sm leading-relaxed">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="card bg-gradient-to-r from-midnight-800 to-midnight-900 border-solar-400/20 text-center py-12 px-8">
        <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
          ¿Listo para Calcular tu Sistema Solar?
        </h2>
        <p class="text-midnight-300 text-lg mb-8 max-w-2xl mx-auto">
          Obtén una cotización personalizada en menos de 2 minutos. Sin compromiso, sin costo.
        </p>
        <a data-navigate="/calculator" class="btn-primary text-lg !px-10 !py-4 inline-block cursor-pointer">
          Comenzar Ahora
        </a>
      </div>
    </section>
  `;
}
