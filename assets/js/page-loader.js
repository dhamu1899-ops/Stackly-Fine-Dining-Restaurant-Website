/* Page loader overlay (converted from src/components/PageLoader.tsx) */

(function () {
  function getLoadingMessage(val) {
    if (val < 30) return 'Initializing Gastronomic Experience...';
    if (val < 65) return 'Curating Artisanal Tasting Menu...';
    if (val < 90) return 'Plating 3-Michelin-Star Culinary Poetry...';
    return 'Welcome to Stackly Fine Dining';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    const bar = loader.querySelector('[data-loader-bar]');
    const pct = loader.querySelector('[data-loader-pct]');
    const msg = loader.querySelector('[data-loader-msg]');

    const startTime = Date.now();
    const duration = 2800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      bar.style.width = progress + '%';
      pct.textContent = progress + '%';
      msg.textContent = getLoadingMessage(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.transition = 'opacity 0.5s ease-in-out';
          loader.style.opacity = '0';
          setTimeout(() => loader.remove(), 500);
        }, 200);
      }
    }, 30);
  });
})();
