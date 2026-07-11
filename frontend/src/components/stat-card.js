export function renderStatCard({ icon, label, value, trend, trendUp }) {
  return `
    <div class="stat-card group hover:border-solar-400/20 transition-all duration-300">
      <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">${icon}</div>
      <div class="text-2xl font-bold text-white mb-1">${value}</div>
      <div class="text-sm text-midnight-400">${label}</div>
      ${trend ? `
        <div class="text-xs mt-2 ${trendUp ? 'text-emerald-400' : 'text-red-400'}">
          ${trendUp ? '↑' : '↓'} ${trend}
        </div>
      ` : ''}
    </div>
  `;
}
