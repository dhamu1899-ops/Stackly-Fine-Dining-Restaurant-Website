/* Footer newsletter + back-to-top (converted from src/components/Footer.tsx) */

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  wireFormRedirect('newsletter-form', '404.html');

  document.querySelectorAll('[data-scroll-top]').forEach(btn => {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });
});
