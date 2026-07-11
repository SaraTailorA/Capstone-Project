import { SOLAR_RULES } from '../../utils/constants.js';

export function calculateDailyConsumption(appliances) {
  return appliances.reduce((total, app) => {
    return total + (app.watts * app.hours * app.quantity);
  }, 0) / 1000;
}

export function calculateMonthlyConsumption(dailyKwh) {
  return dailyKwh * 30;
}

export function calculateRequiredPanels(monthlyKwh) {
  const dailyKwh = monthlyKwh / 30;
  const adjustedDailyKwh = dailyKwh / SOLAR_RULES.SYSTEM_EFFICIENCY;
  const requiredWatts = (adjustedDailyKwh * 1000) / SOLAR_RULES.PEAK_SUN_HOURS;
  return Math.ceil(requiredWatts / SOLAR_RULES.PANEL_WATTAGE);
}

export function calculateInverterSize(totalPanelWatts) {
  const dcPower = totalPanelWatts * SOLAR_RULES.INVERTER_OVERSIZE_RATIO;
  const dcKw = dcPower / 1000;
  return SOLAR_RULES.INVERTER_SIZES_KW.find((size) => size >= dcKw) ||
    SOLAR_RULES.INVERTER_SIZES_KW[SOLAR_RULES.INVERTER_SIZES_KW.length - 1];
}

export function calculateSystemCost(panelsCount, inverterKw) {
  const panelCost = panelsCount * SOLAR_RULES.COST_PER_PANEL;
  const inverterCost = inverterKw * SOLAR_RULES.COST_PER_KW_INVERTER;
  const cableCost = panelsCount * SOLAR_RULES.COST_PER_METER_CABLE;
  const breakerCost = Math.ceil(panelsCount / 10) * SOLAR_RULES.COST_BREAKER;
  const protectionCost = 5 * SOLAR_RULES.COST_PROTECTION;
  const equipmentSubtotal = panelCost + inverterCost + cableCost + breakerCost + protectionCost;
  const labor = equipmentSubtotal * SOLAR_RULES.COST_INSTALLATION_LABOR;
  const permits = SOLAR_RULES.COST_PERMITS;

  return {
    panels: panelCost,
    inverter: inverterCost,
    cable: cableCost,
    breakers: breakerCost,
    protections: protectionCost,
    labor: Math.round(labor),
    permits,
    total: Math.round(equipmentSubtotal + labor + permits),
  };
}

export function calculateMonthlySavings(monthlyKwh) {
  return Math.round(monthlyKwh * SOLAR_RULES.ELECTRICITY_TARIFF * 100) / 100;
}

export function calculateROI(systemCost, monthlySavings) {
  if (monthlySavings <= 0) return Infinity;
  return Math.ceil(systemCost / monthlySavings);
}

export function calculateCO2Reduction(monthlyKwh) {
  return monthlyKwh * SOLAR_RULES.CO2_FACTOR_KG_PER_KWH;
}

export function calculateFullSystem(monthlyKwh) {
  const panelsCount = calculateRequiredPanels(monthlyKwh);
  const totalPanelWatts = panelsCount * SOLAR_RULES.PANEL_WATTAGE;
  const inverterKw = calculateInverterSize(totalPanelWatts);
  const cost = calculateSystemCost(panelsCount, inverterKw);
  const monthlySavings = calculateMonthlySavings(monthlyKwh);
  const roiMonths = calculateROI(cost.total, monthlySavings);
  const co2 = calculateCO2Reduction(monthlyKwh);

  return {
    panelsCount,
    panelWattage: SOLAR_RULES.PANEL_WATTAGE,
    totalKw: (totalPanelWatts / 1000).toFixed(2),
    inverterKw,
    breakerSpecs: [
      { type: 'Disyuntor DC', rating: `${Math.ceil(panelsCount / 10) * 10}A`, qty: Math.ceil(panelsCount / 10) },
      { type: 'Disyuntor AC', rating: `${Math.ceil(inverterKw * 4.5)}A`, qty: 1 },
      { type: 'Diferencial', rating: '40A', qty: 1 },
    ],
    cableSpecs: [
      { type: 'Cable DC 10mm²', length: `${panelsCount * 3}m` },
      { type: 'Cable AC 16mm²', length: '20m' },
    ],
    protections: [
      'SPD Tipo II 40kA',
      'Seccionador DC',
      'Fusibles de panel',
      'Interruptor diferencial',
      'Conduit 25mm',
    ],
    cost,
    monthlySavings,
    roiMonths,
    co2Reduction: Math.round(co2),
    systemLifespan: SOLAR_RULES.SYSTEM_LIFESPAN_YEARS,
  };
}
