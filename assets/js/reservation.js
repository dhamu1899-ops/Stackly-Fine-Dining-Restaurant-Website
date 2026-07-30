/* Reservation form + confirmation modal (converted from ReservationSection.tsx) */

(function () {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  let guests = 2;
  let seatingArea = 'main';

  document.querySelectorAll('[data-guest-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      guests = parseInt(btn.getAttribute('data-guest-btn'), 10);
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
      seatingArea = btn.getAttribute('data-area-btn');
      document.querySelectorAll('[data-area-btn]').forEach(b => {
        b.classList.remove('bg-[#1e2a2e]', 'text-[#c9a050]', 'border-[#c9a050]', 'shadow-md');
        b.classList.add('bg-[#182124]', 'text-gray-400', 'border-[#232f33]');
      });
      btn.classList.remove('bg-[#182124]', 'text-gray-400', 'border-[#232f33]');
      btn.classList.add('bg-[#1e2a2e]', 'text-[#c9a050]', 'border-[#c9a050]', 'shadow-md');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value;
    const email = document.getElementById('res-email').value;
    const phone = document.getElementById('res-phone').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const specialRequests = document.getElementById('res-requests').value;

    if (!name || !email || !phone) {
      showToast('Please fill in your name, email, and phone number.', 'error');
      return;
    }

    const reservation = {
      id: Math.random().toString(36).substring(2, 9),
      name, email, phone, guests, date, time, seatingArea, specialRequests,
      confirmationCode: 'STK-' + Math.floor(100000 + Math.random() * 900000)
    };

    Auth.addReservation(reservation);
    showToast('Table reserved successfully! Confirmation code: ' + reservation.confirmationCode, 'success');

    const modal = document.getElementById('reservation-confirm-modal');
    modal.querySelector('[data-conf-code]').textContent = reservation.confirmationCode;
    modal.querySelector('[data-conf-name]').textContent = reservation.name;
    modal.querySelector('[data-conf-guests]').textContent = reservation.guests + ' Guests (' + reservation.seatingArea.toUpperCase() + ')';
    modal.querySelector('[data-conf-datetime]').textContent = reservation.date + ' at ' + reservation.time + ' PM';
    modal.classList.remove('hidden');
  });

  document.querySelectorAll('[data-close-res-confirm]').forEach(btn => {
    btn.addEventListener('click', () => document.getElementById('reservation-confirm-modal').classList.add('hidden'));
  });
  document.querySelector('[data-print-pass]').addEventListener('click', () => window.print());
})();
