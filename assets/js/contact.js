/* Contact form submit (converted from src/pages/ContactPage.tsx) */

(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const inquiryType = document.getElementById('contact-inquiry').value;

    document.getElementById('contact-form-wrap').classList.add('hidden');
    const success = document.getElementById('contact-success');
    success.classList.remove('hidden');
    success.querySelector('[data-success-name]').textContent = name;
    success.querySelector('[data-success-inquiry]').textContent = inquiryType;

    showToast("Concierge inquiry sent! Our maitre d' will contact you shortly.", 'success');
  });

  document.getElementById('contact-again').addEventListener('click', () => {
    form.reset();
    document.getElementById('contact-form-wrap').classList.remove('hidden');
    document.getElementById('contact-success').classList.add('hidden');
  });
})();
