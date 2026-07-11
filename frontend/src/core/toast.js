export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const colors = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-solar-600',
  };

  const icons = {
    success: '&#10003;',
    error: '&#10007;',
    info: 'i',
    warning: '!',
  };

  const toast = document.createElement('div');
  toast.className = `${colors[type] || colors.info} text-white px-4 py-3 rounded-xl shadow-lg 
    flex items-center gap-3 min-w-[280px] animate-slide-up`;
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">${icons[type]}</span>
    <span class="flex-1 text-sm font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
