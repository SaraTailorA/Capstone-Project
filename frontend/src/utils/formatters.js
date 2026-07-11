export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num) {
  return new Intl.NumberFormat('es-MX').format(num);
}

export function formatKwh(kwh) {
  if (kwh >= 1000) {
    return `${(kwh / 1000).toFixed(1)} MWh`;
  }
  return `${Math.round(kwh)} kWh`;
}

export function formatCO2(kg) {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} ton`;
  }
  return `${Math.round(kg)} kg`;
}

export function formatMonths(months) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} meses`;
  if (remainingMonths === 0) return `${years} años`;
  return `${years} años y ${remainingMonths} meses`;
}

export function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}
