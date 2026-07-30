/* Footer newsletter + back-to-top (converted from src/components/Footer.tsx) */

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      if (!email) return;
      const btn = form.querySelector('[data-newsletter-btn]');
      btn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>';
      form.querySelector('[data-newsletter-success]').classList.remove('hidden');
      showToast('Thank you for subscribing to Stackly Gourmet Journal!', 'success');
    });
  }

  document.querySelectorAll('[data-scroll-top]').forEach(btn => {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });
});
