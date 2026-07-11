export function renderStepper(steps, currentStep) {
  return `
    <div class="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      ${steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return `
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${isCompleted ? 'bg-solar-400 text-midnight-950' : 
                isActive ? 'bg-solar-400/20 text-solar-400 border-2 border-solar-400 animate-glow' : 
                'bg-midnight-800 text-midnight-500 border border-midnight-600'}">
              ${isCompleted ? '✓' : i + 1}
            </div>
            <span class="hidden sm:block text-sm font-medium transition-colors duration-300
              ${isActive ? 'text-solar-400' : isCompleted ? 'text-white' : 'text-midnight-500'}">
              ${step}
            </span>
            ${i < steps.length - 1 ? `
              <div class="w-8 sm:w-16 h-0.5 ${isCompleted ? 'bg-solar-400' : 'bg-midnight-700'} transition-colors duration-300"></div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}
