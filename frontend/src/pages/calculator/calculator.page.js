import { renderStepper } from '../../components/stepper.js';
import { APPLIANCES } from '../../utils/constants.js';
import { calculateFullSystem, calculateDailyConsumption, calculateMonthlyConsumption } from '../../domain/values/EnergyCalculations.js';
import { formatCurrency, formatKwh, formatCO2, formatMonths } from '../../utils/formatters.js';
import { storage } from '../../core/storage.js';
import { isAuthenticated, getUser } from '../../core/auth.js';
import { showToast } from '../../core/toast.js';
import { navigate } from '../../core/router.js';

let currentStep = 0;
const steps = ['Consumo', 'Electrodomésticos', 'Resultados', 'Cotización'];
let calculatorState = {
  method: 'manual',
  monthlyKwh: 300,
  appliances: [],
  results: null,
};

function getStoredAppliances() {
  return APPLIANCES.slice(0, 8).map((a) => ({
    ...a,
    quantity: 1,
    hours: a.hours,
    watts: a.watts,
  }));
}

export async function calculatorPage() {
  calculatorState.appliances = getStoredAppliances();
  currentStep = 0;
  calculatorState.results = null;

  setTimeout(() => attachCalculatorEvents(), 0);

  return `
    <div class="page-container max-w-4xl">
      <div class="text-center mb-8">
        <h1 class="section-title mb-2">Calcula tu Sistema Solar</h1>
        <p class="text-midnight-400">Dimensiona tu sistema fotovoltaico en minutos</p>
      </div>

      ${renderStepper(steps, currentStep)}

      <div id="calculator-content" class="card p-6 sm:p-8">
        ${renderStep1()}
      </div>
    </div>
  `;
}

function renderStep1() {
  return `
    <div class="animate-fade-in">
      <h2 class="text-xl font-display font-bold text-white mb-2">Paso 1: Ingresa tu Consumo Mensual</h2>
      <p class="text-midnight-400 mb-6">¿Cuántos kWh consumes al mes? Puedes encontrar este dato en tu recibo de luz.</p>

      <div class="max-w-md mx-auto space-y-6">
        <div class="text-center">
          <label class="input-label text-center">Consumo mensual en kWh</label>
          <div class="relative">
            <input type="number" id="kwh-input" value="${calculatorState.monthlyKwh}" min="50" max="5000"
              class="input-field text-center text-3xl font-bold !py-6 !text-solar-400" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-midnight-400 font-medium">kWh</span>
          </div>
          <input type="range" id="kwh-slider" min="50" max="5000" value="${calculatorState.monthlyKwh}" step="10"
            class="w-full mt-4 accent-solar-400" />
          <div class="flex justify-between text-xs text-midnight-500 mt-1">
            <span>50 kWh</span>
            <span>5,000 kWh</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-center">
          <div class="bg-midnight-900/50 rounded-xl p-4 border border-midnight-700/30">
            <p class="text-midnight-400 text-xs mb-1">Equivale a</p>
            <p class="text-white font-bold" id="daily-estimate">~${Math.round(calculatorState.monthlyKwh / 30)} kWh/día</p>
          </div>
          <div class="bg-midnight-900/50 rounded-xl p-4 border border-midnight-700/30">
            <p class="text-midnight-400 text-xs mb-1">Paneles estimados</p>
            <p class="text-white font-bold" id="panels-estimate">~${Math.ceil(calculatorState.monthlyKwh / 30 / 5 / 0.8 * 1000 / 550)} paneles</p>
          </div>
        </div>

        <div class="bg-solar-400/10 border border-solar-400/20 rounded-xl p-4 text-center">
          <p class="text-solar-300 text-sm">💡 No sabes tu consumo? <span class="font-semibold cursor-pointer hover:text-solar-200" id="go-to-appliances">Estímalo con electrodomésticos</span></p>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <div></div>
        <button id="step1-next" class="btn-primary">Siguiente →</button>
      </div>
    </div>
  `;
}

function renderStep2() {
  const categories = [...new Set(APPLIANCES.map((a) => a.category))];
  return `
    <div class="animate-fade-in">
      <h2 class="text-xl font-display font-bold text-white mb-2">Paso 2: Estimación por Electrodomésticos</h2>
      <p class="text-midnight-400 mb-6">Selecciona la cantidad y horas de uso de cada electrodoméstico.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-2 mb-6" id="appliances-list">
        ${calculatorState.appliances.map((app, i) => `
          <div class="bg-midnight-900/50 border border-midnight-700/30 rounded-xl p-4 flex items-center gap-3 hover:border-midnight-600 transition">
            <span class="text-2xl flex-shrink-0">${app.icon}</span>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">${app.name}</p>
              <p class="text-midnight-400 text-xs">${app.watts}W</p>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1">
                <button class="appliance-qty-minus w-6 h-6 rounded bg-midnight-800 text-midnight-300 hover:bg-midnight-700 text-xs flex items-center justify-center" data-index="${i}">-</button>
                <span class="w-6 text-center text-sm text-white appliance-qty" data-index="${i}">${app.quantity}</span>
                <button class="appliance-qty-plus w-6 h-6 rounded bg-midnight-800 text-midnight-300 hover:bg-midnight-700 text-xs flex items-center justify-center" data-index="${i}">+</button>
              </div>
              <div class="text-right">
                <input type="number" value="${app.hours}" min="0.25" max="24" step="0.25"
                  class="appliance-hours w-14 bg-midnight-800 border border-midnight-600 rounded px-2 py-1 text-xs text-white text-center focus:ring-1 focus:ring-solar-400 focus:outline-none"
                  data-index="${i}" />
                <p class="text-midnight-500 text-[10px]">hrs/día</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="grid grid-cols-3 gap-4 text-center bg-midnight-900/50 rounded-xl p-4 border border-midnight-700/30">
        <div>
          <p class="text-midnight-400 text-xs">Consumo Diario</p>
          <p class="text-white font-bold text-lg" id="app-daily">0 kWh</p>
        </div>
        <div>
          <p class="text-midnight-400 text-xs">Consumo Mensual</p>
          <p class="text-solar-400 font-bold text-lg" id="app-monthly">0 kWh</p>
        </div>
        <div>
          <p class="text-midnight-400 text-xs">Paneles Necesarios</p>
          <p class="text-white font-bold text-lg" id="app-panels">0</p>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button id="step2-prev" class="btn-secondary">← Anterior</button>
        <button id="step2-next" class="btn-primary">Siguiente →</button>
      </div>
    </div>
  `;
}

function renderStep3(results) {
  return `
    <div class="animate-fade-in">
      <h2 class="text-xl font-display font-bold text-white mb-2">Paso 3: Tu Sistema Solar Recomendado</h2>
      <p class="text-midnight-400 mb-6">Basado en tu consumo de ${formatKwh(calculatorState.monthlyKwh)}/mes</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-midnight-900/50 border border-solar-400/20 rounded-2xl p-6 text-center group hover:border-solar-400/40 transition">
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">☀️</div>
          <h3 class="text-white font-bold text-lg mb-1">Paneles Solares</h3>
          <p class="text-solar-400 text-3xl font-bold">${results.panelsCount}</p>
          <p class="text-midnight-400 text-sm mt-1">x ${results.panelWattage}W cada uno</p>
          <p class="text-white font-semibold mt-2">${results.totalKw} kW total</p>
        </div>

        <div class="bg-midnight-900/50 border border-blue-400/20 rounded-2xl p-6 text-center group hover:border-blue-400/40 transition">
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
          <h3 class="text-white font-bold text-lg mb-1">Inversor</h3>
          <p class="text-blue-400 text-3xl font-bold">${results.inverterKw} kW</p>
          <p class="text-midnight-400 text-sm mt-1">Inversor híbrido</p>
          <p class="text-white font-semibold mt-2">95% eficiencia</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div class="card">
          <h3 class="text-white font-semibold mb-3 flex items-center gap-2">🔌 Breakers</h3>
          ${results.breakerSpecs.map((b) => `
            <div class="flex justify-between text-sm py-1.5 border-b border-midnight-700/30 last:border-0">
              <span class="text-midnight-300">${b.type}</span>
              <span class="text-white font-medium">${b.rating} x${b.qty}</span>
            </div>
          `).join('')}
        </div>

        <div class="card">
          <h3 class="text-white font-semibold mb-3 flex items-center gap-2">🔌 Cableado</h3>
          ${results.cableSpecs.map((c) => `
            <div class="flex justify-between text-sm py-1.5 border-b border-midnight-700/30 last:border-0">
              <span class="text-midnight-300">${c.type}</span>
              <span class="text-white font-medium">${c.length}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="bg-midnight-900/50 border border-midnight-700/30 rounded-xl p-4 mb-6">
        <h3 class="text-white font-semibold mb-2 flex items-center gap-2">🛡️ Protecciones</h3>
        <div class="flex flex-wrap gap-2">
          ${results.protections.map((p) => `<span class="badge-solar">${p}</span>`).join('')}
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button id="step3-prev" class="btn-secondary">← Anterior</button>
        <button id="step3-next" class="btn-primary">Ver Cotización →</button>
      </div>
    </div>
  `;
}

function renderStep4(results) {
  const cost = results.cost;
  const total = cost.total;
  const maxVal = Math.max(cost.panels, cost.inverter);

  return `
    <div class="animate-fade-in">
      <h2 class="text-xl font-display font-bold text-white mb-2">Paso 4: Resumen de Cotización</h2>
      <p class="text-midnight-400 mb-6">Desglose completo de costos y proyección de ahorro</p>

      <div class="card bg-midnight-900/50 mb-6">
        <h3 class="text-white font-semibold mb-4">📋 Desglose de Costos</h3>
        ${[
          { label: `Paneles (${results.panelsCount}x)`, value: cost.panels, pct: cost.panels / total },
          { label: `Inversor ${results.inverterKw}kW`, value: cost.inverter, pct: cost.inverter / total },
          { label: 'Cableado', value: cost.cable, pct: cost.cable / total },
          { label: 'Breakers', value: cost.breakers, pct: cost.breakers / total },
          { label: 'Protecciones', value: cost.protections, pct: cost.protections / total },
          { label: 'Instalación', value: cost.labor, pct: cost.labor / total },
          { label: 'Permisos', value: cost.permits, pct: cost.permits / total },
        ].map((item) => `
          <div class="flex items-center gap-3 py-2 border-b border-midnight-700/30 last:border-0">
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-midnight-300 text-sm">${item.label}</span>
                <span class="text-white font-medium text-sm">${formatCurrency(item.value)}</span>
              </div>
              <div class="w-full bg-midnight-800 rounded-full h-1.5">
                <div class="bg-solar-400 h-1.5 rounded-full transition-all duration-500" style="width: ${item.pct * 100}%"></div>
              </div>
            </div>
          </div>
        `).join('')}

        <div class="flex justify-between items-center pt-4 mt-2 border-t border-midnight-600">
          <span class="text-white font-bold text-lg">TOTAL</span>
          <span class="text-solar-400 font-bold text-2xl">${formatCurrency(total)}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="stat-card border-emerald-400/20">
          <div class="text-2xl mb-1">💰</div>
          <p class="text-emerald-400 text-2xl font-bold">${formatCurrency(results.monthlySavings)}</p>
          <p class="text-midnight-400 text-sm">Ahorro Mensual</p>
        </div>
        <div class="stat-card border-blue-400/20">
          <div class="text-2xl mb-1">📈</div>
          <p class="text-blue-400 text-2xl font-bold">${formatMonths(results.roiMonths)}</p>
          <p class="text-midnight-400 text-sm">Retorno Inversión</p>
        </div>
        <div class="stat-card border-purple-400/20">
          <div class="text-2xl mb-1">🌱</div>
          <p class="text-purple-400 text-2xl font-bold">${formatCO2(results.co2Reduction)}</p>
          <p class="text-midnight-400 text-sm">CO₂ Reducido/mes</p>
        </div>
      </div>

      <div class="bg-midnight-900/50 border border-midnight-700/30 rounded-xl p-4 mb-6">
        <div class="flex items-center gap-3 text-sm">
          <span class="text-solar-400">☀️</span>
          <span class="text-midnight-300">Vida útil del sistema:</span>
          <span class="text-white font-semibold">${results.systemLifespan} años</span>
          <span class="text-midnight-500">|</span>
          <span class="text-midnight-300">Ahorro 25 años:</span>
          <span class="text-emerald-400 font-semibold">${formatCurrency(results.monthlySavings * 12 * 25)}</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <button id="step4-prev" class="btn-secondary">← Anterior</button>
        <div class="flex gap-3">
          <button id="download-pdf" class="btn-outline">📥 Descargar PDF</button>
          ${isAuthenticated() ? '<button id="save-project" class="btn-primary">💾 Guardar Proyecto</button>' : '<a data-navigate="/login" class="btn-primary cursor-pointer text-center">Inicia sesión para guardar</a>'}
        </div>
      </div>
    </div>
  `;
}

function showAuthGateModal() {
  const modal = document.getElementById('modal-container');
  if (!modal) return;

  modal.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4" id="auth-gate-overlay">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative bg-midnight-800 border border-midnight-600 rounded-2xl p-8 max-w-md w-full animate-slide-up shadow-2xl">
        <button id="auth-gate-close" class="absolute top-4 right-4 text-midnight-400 hover:text-white transition text-xl">&times;</button>

        <div class="text-center mb-6">
          <div class="w-16 h-16 rounded-full bg-solar-400/20 flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h3 class="text-xl font-display font-bold text-white mb-2">Inicia Sesión para Ver Resultados</h3>
          <p class="text-midnight-400 text-sm">Necesitas una cuenta gratuita para acceder al análisis completo de tu sistema solar.</p>
        </div>

        <div class="space-y-3">
          <button id="auth-gate-login" class="btn-primary w-full !py-3.5 text-center">
            Iniciar Sesión
          </button>
          <button id="auth-gate-register" class="btn-outline w-full !py-3.5 text-center">
            Crear Cuenta Gratis
          </button>
        </div>

        <p class="text-center text-midnight-500 text-xs mt-4">Es rápido y gratuito. Tus datos están seguros.</p>
      </div>
    </div>
  `;

  document.getElementById('auth-gate-close').addEventListener('click', () => {
    modal.innerHTML = '';
  });

  document.getElementById('auth-gate-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'auth-gate-overlay') modal.innerHTML = '';
  });

  document.getElementById('auth-gate-login').addEventListener('click', () => {
    modal.innerHTML = '';
    navigate('/login');
  });

  document.getElementById('auth-gate-register').addEventListener('click', () => {
    modal.innerHTML = '';
    navigate('/register');
  });
}

function proceedToResults() {
  if (!isAuthenticated()) {
    showAuthGateModal();
    return;
  }
  calculatorState.results = calculateFullSystem(calculatorState.monthlyKwh);
  goToStep(2);
}

function updateAppCalculations() {
  const dailyKwh = calculateDailyConsumption(calculatorState.appliances);
  const monthlyKwh = calculateMonthlyConsumption(dailyKwh);
  const panels = Math.ceil((monthlyKwh / 30 / 5 / 0.8 * 1000) / 550);

  const dailyEl = document.getElementById('app-daily');
  const monthlyEl = document.getElementById('app-monthly');
  const panelsEl = document.getElementById('app-panels');

  if (dailyEl) dailyEl.textContent = `${dailyKwh.toFixed(1)} kWh`;
  if (monthlyEl) monthlyEl.textContent = `${Math.round(monthlyKwh)} kWh`;
  if (panelsEl) panelsEl.textContent = panels;
}

function goToStep(step) {
  currentStep = step;
  const content = document.getElementById('calculator-content');
  const stepperHtml = document.querySelector('.flex.items-center.justify-center');

  if (step === 0) content.innerHTML = renderStep1();
  else if (step === 1) content.innerHTML = renderStep2();
  else if (step === 2) content.innerHTML = renderStep3(calculatorState.results);
  else if (step === 3) content.innerHTML = renderStep4(calculatorState.results);

  document.querySelectorAll('[data-navigate]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      import('../../core/router.js').then((m) => m.navigate(el.getAttribute('data-navigate')));
    });
  });

  const newStepper = document.querySelector('.flex.items-center.justify-center');
  if (newStepper) {
    newStepper.outerHTML = renderStepper(steps, currentStep);
  }

  attachCalculatorEvents();
}

function attachCalculatorEvents() {
  const kwhInput = document.getElementById('kwh-input');
  const kwhSlider = document.getElementById('kwh-slider');

  if (kwhInput && kwhSlider) {
    const syncValues = (val) => {
      const v = Math.max(50, Math.min(5000, parseInt(val) || 50));
      calculatorState.monthlyKwh = v;
      kwhInput.value = v;
      kwhSlider.value = v;
      const daily = Math.round(v / 30);
      const panels = Math.ceil((v / 30 / 5 / 0.8 * 1000) / 550);
      const dailyEl = document.getElementById('daily-estimate');
      const panelsEl = document.getElementById('panels-estimate');
      if (dailyEl) dailyEl.textContent = `~${daily} kWh/día`;
      if (panelsEl) panelsEl.textContent = `~${panels} paneles`;
    };
    kwhInput.addEventListener('input', (e) => syncValues(e.target.value));
    kwhSlider.addEventListener('input', (e) => syncValues(e.target.value));
  }

  const goAppliances = document.getElementById('go-to-appliances');
  if (goAppliances) {
    goAppliances.addEventListener('click', () => {
      calculatorState.method = 'appliances';
      goToStep(1);
    });
  }

  const step1Next = document.getElementById('step1-next');
  if (step1Next) {
    step1Next.addEventListener('click', () => {
      calculatorState.monthlyKwh = parseInt(document.getElementById('kwh-input')?.value) || 300;
      proceedToResults();
    });
  }

  document.querySelectorAll('.appliance-qty-plus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      calculatorState.appliances[i].quantity = Math.min(10, calculatorState.appliances[i].quantity + 1);
      const qtyEl = document.querySelector(`.appliance-qty[data-index="${i}"]`);
      if (qtyEl) qtyEl.textContent = calculatorState.appliances[i].quantity;
      updateAppCalculations();
    });
  });

  document.querySelectorAll('.appliance-qty-minus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      calculatorState.appliances[i].quantity = Math.max(0, calculatorState.appliances[i].quantity - 1);
      const qtyEl = document.querySelector(`.appliance-qty[data-index="${i}"]`);
      if (qtyEl) qtyEl.textContent = calculatorState.appliances[i].quantity;
      updateAppCalculations();
    });
  });

  document.querySelectorAll('.appliance-hours').forEach((input) => {
    input.addEventListener('change', () => {
      const i = parseInt(input.dataset.index);
      calculatorState.appliances[i].hours = Math.max(0.25, Math.min(24, parseFloat(input.value) || 1));
      updateAppCalculations();
    });
  });

  updateAppCalculations();

  const step2Prev = document.getElementById('step2-prev');
  const step2Next = document.getElementById('step2-next');
  const step3Prev = document.getElementById('step3-prev');
  const step3Next = document.getElementById('step3-next');
  const step4Prev = document.getElementById('step4-prev');

  if (step2Prev) step2Prev.addEventListener('click', () => goToStep(0));
  if (step2Next) step2Next.addEventListener('click', () => {
    if (calculatorState.method === 'appliances') {
      const dailyKwh = calculateDailyConsumption(calculatorState.appliances);
      calculatorState.monthlyKwh = Math.round(calculateMonthlyConsumption(dailyKwh));
    }
    proceedToResults();
  });
  if (step3Prev) step3Prev.addEventListener('click', () => goToStep(calculatorState.method === 'appliances' ? 1 : 0));
  if (step3Next) step3Next.addEventListener('click', () => goToStep(3));
  if (step4Prev) step4Prev.addEventListener('click', () => goToStep(2));

  const downloadPdf = document.getElementById('download-pdf');
  if (downloadPdf) {
    downloadPdf.addEventListener('click', () => {
      showToast('PDF generado (simulación)', 'success');
    });
  }

  const saveProject = document.getElementById('save-project');
  if (saveProject) {
    saveProject.addEventListener('click', () => {
      const projects = storage.get('projects') || [];
      const newProject = {
        id: 'proj_' + Date.now(),
        name: `Sistema Solar ${calculatorState.monthlyKwh}kWh`,
        monthlyKwh: calculatorState.monthlyKwh,
        results: calculatorState.results,
        createdAt: new Date().toISOString(),
      };
      projects.push(newProject);
      storage.set('projects', projects);
      showToast('Proyecto guardado exitosamente', 'success');
    });
  }
}
