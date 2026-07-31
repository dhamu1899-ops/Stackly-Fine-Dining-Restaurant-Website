/* Reservation form (converted from ReservationSection.tsx).
   No backend exists to receive this booking, so once every field is
   genuinely filled in the guest is sent to the 404 page rather than
   shown a fabricated confirmation. */

(function () {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  document.querySelectorAll('[data-guest-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-guest-btn]').forEach(b => {
        b.classList.remove('bg-gold-gradient', 'text-black', 'border-[#c9a050]', 'shadow-md');
        b.classList.add('bg-[#182124]', 'text-gray-300', 'border-[#232f33]');
      });
      btn.classList.remove('bg-[#182124]', 'text-gray-300', 'border-[#232f33]');
      btn.classList.add('bg-gold-gradient', 'text-black', 'border-[#c9a050]', 'shadow-md');
    });
  });

  document.querySelectorAll('[data-area-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-area-btn]').forEach(b => {
        b.classList.remove('bg-[#1e2a2e]', 'text-[#c9a050]', 'border-[#c9a050]', 'shadow-md');
        b.classList.add('bg-[#182124]', 'text-gray-400', 'border-[#232f33]');
      });
      btn.classList.remove('bg-[#182124]', 'text-gray-400', 'border-[#232f33]');
      btn.classList.add('bg-[#1e2a2e]', 'text-[#c9a050]', 'border-[#c9a050]', 'shadow-md');
    });
  });

  wireFormRedirect('reservation-form', '404.html');
})();
