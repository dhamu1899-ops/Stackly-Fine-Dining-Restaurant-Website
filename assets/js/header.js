/* Site header behavior (converted from src/components/Header.tsx) */

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const topbar = header.querySelector('[data-topbar]');
  const nav = header.querySelector('[data-navbar]');

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    if (scrolled) {
      topbar.classList.add('is-collapsed');
      nav.classList.add('bg-[#0b0e10]/95', 'backdrop-blur-md', 'shadow-2xl', 'shadow-black/80', 'py-3', 'border-b', 'border-[#232c30]');
      nav.classList.remove('bg-gradient-to-b', 'from-black/90', 'via-black/60', 'to-transparent', 'py-5');
    } else {
      topbar.classList.remove('is-collapsed');
      nav.classList.remove('bg-[#0b0e10]/95', 'backdrop-blur-md', 'shadow-2xl', 'shadow-black/80', 'py-3', 'border-b', 'border-[#232c30]');
      nav.classList.add('bg-gradient-to-b', 'from-black/90', 'via-black/60', 'to-transparent', 'py-5');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Active nav link highlighting
  const current = (window.location.pathname.split('/').pop() || 'index.html');
  header.querySelectorAll('[data-nav-link]').forEach((link) => {
    const target = link.getAttribute('data-nav-link');
    const isActive = target === current || (target === 'index.html' && current === '');
    if (isActive) {
      link.classList.add('text-[#c9a050]', 'font-semibold');
      link.classList.remove('text-gray-300');
      const underline = link.querySelector('[data-active-underline]');
      if (underline) underline.classList.remove('hidden');
    }
  });

  // Mobile menu toggle
  const mobileToggle = header.querySelector('[data-mobile-toggle]');
  const mobileDrawer = header.querySelector('[data-mobile-drawer]');
  const iconMenu = header.querySelector('[data-icon-menu]');
  const iconClose = header.querySelector('[data-icon-close]');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileDrawer.classList.contains('hidden');
      mobileDrawer.classList.toggle('hidden');
      iconMenu.classList.toggle('hidden', !isOpen);
      iconClose.classList.toggle('hidden', isOpen);
    });
  }

  // Reservation CTA buttons
  header.querySelectorAll('[data-goto-reservation]').forEach(btn => {
    btn.addEventListener('click', () => { window.location.href = 'reservation.html'; });
  });

  // Auth-aware login / portal button
  const user = Auth.getUser();
  const desktopSlot = header.querySelector('[data-auth-slot-desktop]');
  const mobileSlot = header.querySelector('[data-auth-slot-mobile]');

  if (user) {
    const target = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
    const firstName = user.name.split(' ')[0];
    const iconSvg = user.role === 'admin'
      ? '<svg class="w-4 h-4 text-[#c9a050]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m6-3v8.25a9 9 0 0 1-9 9 9 9 0 0 1-9-9V6.75l9-4 9 4Z"/></svg>'
      : '<svg class="w-4 h-4 text-[#c9a050]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"/></svg>';

    desktopSlot.innerHTML =
      '<button class="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#182023] border border-[#c9a050]/60 text-white hover:text-[#c9a050] hover:border-[#c9a050] transition-all text-xs font-semibold" title="Go to Portal Dashboard">' +
      iconSvg + '<span class="max-w-[100px] truncate">' + firstName + '</span></button>';
    desktopSlot.querySelector('button').addEventListener('click', () => window.location.href = target);

    mobileSlot.innerHTML =
      '<button class="w-full py-3 rounded-full bg-[#182023] border border-[#c9a050] text-[#c9a050] font-bold text-xs uppercase tracking-widest text-center shadow-lg">' +
      'My ' + (user.role === 'admin' ? 'Admin' : 'VIP') + ' Portal (' + firstName + ')</button>';
    mobileSlot.querySelector('button').addEventListener('click', () => window.location.href = target);
  } else {
    desktopSlot.innerHTML =
      '<button class="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#182023] border border-[#2d3a3e] text-gray-200 hover:text-[#c9a050] hover:border-[#c9a050] transition-all text-xs font-bold uppercase tracking-wider">' +
      '<svg class="w-4 h-4 text-[#c9a050]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"/></svg>' +
      '<span>Login</span></button>';
    desktopSlot.querySelector('button').addEventListener('click', () => window.location.href = 'login.html');

    mobileSlot.innerHTML =
      '<button class="w-full py-3 rounded-full bg-[#182023] border border-[#2d3a3e] text-white font-bold text-xs uppercase tracking-widest text-center shadow-lg hover:border-[#c9a050]">Login / Sign Up</button>';
    mobileSlot.querySelector('button').addEventListener('click', () => window.location.href = 'login.html');
  }
}

document.addEventListener('DOMContentLoaded', initHeader);
