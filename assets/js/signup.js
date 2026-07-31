/* Signup page (converted from the AuthModal signup flow) */

(function () {
  let role = 'customer';

  document.querySelectorAll('[data-role]').forEach((btn) => {
    btn.addEventListener('click', () => {
      role = btn.getAttribute('data-role');
      document.querySelectorAll('[data-role]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('bg-gradient-to-r', active);
        b.classList.toggle('from-[#d4af37]', active);
        b.classList.toggle('via-[#c9a050]', active);
        b.classList.toggle('to-[#b88e38]', active);
        b.classList.toggle('text-black', active);
        b.classList.toggle('shadow-md', active);
        b.classList.toggle('text-gray-400', !active);
      });
      document.getElementById('signup-email').placeholder = role === 'admin' ? 'admin@stackly.com' : 'your.email@example.com';
      document.getElementById('signup-submit-label').textContent = 'Sign Up as ' + role;
    });
  });

  const form = document.getElementById('signup-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const pw = document.getElementById('signup-password');
    const confirmPw = document.getElementById('signup-confirm-password');
    if (pw.value !== confirmPw.value) {
      confirmPw.setCustomValidity('Passwords do not match.');
      confirmPw.reportValidity();
      confirmPw.addEventListener('input', () => confirmPw.setCustomValidity(''), { once: true });
      return;
    }
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    Auth.signup(name, email, role);
    form.reset();
    window.location.href = 'login.html';
  });

  const pwToggle = document.getElementById('signup-pw-toggle');
  const pwInput = document.getElementById('signup-password');
  if (pwToggle) {
    pwToggle.addEventListener('click', () => {
      pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    });
  }
})();
