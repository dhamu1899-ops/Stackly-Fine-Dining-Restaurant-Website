/* Login page (converted from the AuthModal login flow) */

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
      document.getElementById('login-email').placeholder = role === 'admin' ? 'admin@stackly.com' : 'your.email@example.com';
      document.getElementById('login-submit-label').textContent = 'Login as ' + role;
    });
  });

  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const email = document.getElementById('login-email').value;
    const user = Auth.login(email, role);
    form.reset();
    window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
  });

  document.querySelectorAll('[data-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const demoRole = btn.getAttribute('data-demo');
      const demoEmail = demoRole === 'admin' ? 'admin@stackly.com' : 'dhamu1899@gmail.com';
      const user = Auth.login(demoEmail, demoRole);
      window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
    });
  });

  const pwToggle = document.getElementById('login-pw-toggle');
  const pwInput = document.getElementById('login-password');
  if (pwToggle) {
    pwToggle.addEventListener('click', () => {
      pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    });
  }
})();
