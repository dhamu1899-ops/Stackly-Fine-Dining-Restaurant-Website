/* Admin Executive Console (converted from src/pages/AdminDashboard.tsx) */

(function () {
  const user = Auth.getUser();
  const gate = document.getElementById('admin-gate');
  const dashboard = document.getElementById('admin-dashboard');

  if (!user || user.role !== 'admin') {
    gate.classList.remove('hidden');
    dashboard.classList.add('hidden');
    document.getElementById('admin-gate-home').addEventListener('click', () => window.location.href = 'index.html');
    return;
  }

  gate.classList.add('hidden');
  dashboard.classList.remove('hidden');

  let reservations = Auth.getReservations();
  let orders = Auth.getOrders();
  let menuItems = Auth.getMenuItems();

  document.getElementById('ad-name').textContent = user.name;
  document.getElementById('ad-logout').addEventListener('click', () => { Auth.logout(); window.location.href = 'index.html'; });

  function renderStats() {
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 1250;
    const pendingOrders = orders.filter(o => o.status === 'Preparing' || o.status === 'Pending').length;
    const activeReservations = reservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending').length;

    document.getElementById('ad-stat-revenue').textContent = '₹' + (totalRevenue * 80).toFixed(0);
    document.getElementById('ad-stat-reservations').textContent = activeReservations + ' Guests';
    document.getElementById('ad-stat-reservations-total').textContent = reservations.length + ' Total Bookings Received';
    document.getElementById('ad-stat-orders').textContent = pendingOrders + ' Active';
    document.getElementById('ad-stat-menu').textContent = menuItems.length + ' Dishes';

    document.getElementById('ad-tab-res-count').textContent = '(' + reservations.length + ')';
    document.getElementById('ad-tab-orders-count').textContent = '(' + orders.length + ')';
    document.getElementById('ad-tab-menu-count').textContent = '(' + menuItems.length + ')';
  }

  function renderReservationsTable() {
    const tbody = document.getElementById('ad-reservations-tbody');
    document.getElementById('ad-reservations-total').textContent = reservations.length + ' Total Records';
    tbody.innerHTML = reservations.map(res =>
      '<tr class="hover:bg-[#141b1d]/50 transition-colors">' +
      '<td class="py-4 px-4 font-bold text-[#c9a050]">' + res.confirmationCode + '</td>' +
      '<td class="py-4 px-4 text-white font-semibold">' + res.name + '</td>' +
      '<td class="py-4 px-4 text-gray-400">' + res.phone + '<br>' + res.email + '</td>' +
      '<td class="py-4 px-4 text-white font-medium">' + res.date + '<br>at ' + res.time + '</td>' +
      '<td class="py-4 px-4 text-white">' + res.guests + ' Guests</td>' +
      '<td class="py-4 px-4 text-gray-300 capitalize">' + res.seatingArea + '</td>' +
      '<td class="py-4 px-4"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ' + (res.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : res.status === 'Cancelled' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800') + '">' + res.status + '</span></td>' +
      '<td class="py-4 px-4 text-right">' + (res.status !== 'Cancelled' ? '<button class="px-3 py-1.5 bg-red-950/60 text-red-300 border border-red-800 hover:bg-red-900 rounded-lg text-[11px] font-semibold transition-all" data-ad-cancel-res="' + res.id + '">Cancel</button>' : '') + '</td>' +
      '</tr>'
    ).join('');
    tbody.querySelectorAll('[data-ad-cancel-res]').forEach(btn => btn.addEventListener('click', () => {
      reservations = Auth.cancelReservation(btn.getAttribute('data-ad-cancel-res'));
      renderReservationsTable();
      renderStats();
    }));
  }

  function renderOrders() {
    const wrap = document.getElementById('ad-orders-list');
    document.getElementById('ad-orders-total').textContent = orders.length + ' Total Orders';
    wrap.innerHTML = orders.map(ord =>
      '<div class="p-6 bg-[#141b1d] border border-[#28363a] rounded-2xl space-y-4">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232f33] pb-4">' +
      '<div><div class="flex items-center gap-3"><span class="font-serif text-lg font-bold text-[#c9a050]">' + ord.id + '</span><span class="text-xs text-white font-semibold">Customer: ' + ord.userName + '</span></div><span class="text-xs text-gray-400 font-light">' + ord.date + ' • Address: ' + ord.deliveryAddress + '</span></div>' +
      '<div class="flex items-center gap-4"><span class="font-serif text-xl font-bold text-white">₹' + ord.totalAmount.toLocaleString('en-IN') + '</span>' +
      '<select class="bg-[#0b0e10] border border-[#c9a050] text-[#c9a050] font-bold text-xs py-2 px-3 rounded-xl focus:outline-none" data-ad-order-status="' + ord.id + '">' +
      ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(s => '<option value="' + s + '"' + (s === ord.status ? ' selected' : '') + '>' + (s === 'Preparing' ? 'Preparing in Kitchen' : s) + '</option>').join('') +
      '</select></div></div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">' + ord.items.map(it =>
        '<div class="flex items-center gap-3 p-3 rounded-xl bg-[#0b0e10] border border-[#1f292d]"><img src="' + it.menuItem.image + '" alt="' + it.menuItem.name + '" class="w-10 h-10 rounded-lg object-cover"><div class="text-xs"><span class="text-white font-semibold block truncate">' + it.menuItem.name + '</span><span class="text-gray-400">Qty: ' + it.quantity + '</span></div></div>'
      ).join('') + '</div></div>'
    ).join('');
    wrap.querySelectorAll('[data-ad-order-status]').forEach(sel => sel.addEventListener('change', (e) => {
      orders = Auth.updateOrderStatus(sel.getAttribute('data-ad-order-status'), e.target.value);
      renderStats();
    }));
  }

  function renderMenuCatalog() {
    const wrap = document.getElementById('ad-menu-list');
    wrap.innerHTML = menuItems.map(item =>
      '<div class="bg-[#0f1416] border border-[#232f33] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">' +
      '<div class="relative h-44"><img src="' + item.image + '" alt="' + item.name + '" class="w-full h-full object-cover"><span class="absolute top-3 right-3 bg-[#0b0e10]/90 text-[#c9a050] border border-[#c9a050] font-bold text-xs px-2.5 py-1 rounded-full">₹' + item.price.toLocaleString('en-IN') + '</span></div>' +
      '<div class="p-5 space-y-3 flex-1 flex flex-col justify-between">' +
      '<div><h4 class="font-serif text-lg font-bold text-white">' + item.name + '</h4><p class="text-xs text-gray-400 font-light leading-relaxed mt-1 line-clamp-2">' + item.description + '</p></div>' +
      '<div class="pt-3 border-t border-[#1f292d] flex items-center justify-between text-xs">' +
      '<span class="text-[#c9a050] uppercase font-semibold text-[10px]">' + item.category + '</span>' +
      '<button class="p-2 bg-red-950/60 text-red-300 border border-red-800 hover:bg-red-900 rounded-lg transition-all" data-ad-delete-item="' + item.id + '" title="Delete Item"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9M19.228 5.79A48.4 48.4 0 0 0 16.5 5.283V4.5A2.25 2.25 0 0 0 14.25 2.25h-4.5A2.25 2.25 0 0 0 7.5 4.5v.783a48.4 48.4 0 0 0-2.728.507M2.5 5.79h19m-13.5 0V4.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.29"/></svg></button>' +
      '</div></div></div>'
    ).join('');
    wrap.querySelectorAll('[data-ad-delete-item]').forEach(btn => btn.addEventListener('click', () => {
      menuItems = Auth.deleteMenuItem(btn.getAttribute('data-ad-delete-item'));
      renderMenuCatalog();
      renderStats();
    }));
  }

  const tabs = ['reservations', 'orders', 'menu'];
  function showTab(tab) {
    tabs.forEach(t => {
      document.getElementById('ad-tab-btn-' + t).classList.toggle('border-[#c9a050]', t === tab);
      document.getElementById('ad-tab-btn-' + t).classList.toggle('text-[#c9a050]', t === tab);
      document.getElementById('ad-tab-btn-' + t).classList.toggle('bg-[#12191b]', t === tab);
      document.getElementById('ad-tab-btn-' + t).classList.toggle('border-transparent', t !== tab);
      document.getElementById('ad-tab-btn-' + t).classList.toggle('text-gray-400', t !== tab);
      document.getElementById('ad-panel-' + t).classList.toggle('hidden', t !== tab);
    });
  }
  tabs.forEach(t => document.getElementById('ad-tab-btn-' + t).addEventListener('click', () => showTab(t)));

  const addModal = document.getElementById('ad-add-menu-modal');
  document.querySelectorAll('[data-open-add-menu]').forEach(btn => btn.addEventListener('click', () => addModal.classList.remove('hidden')));
  document.getElementById('ad-add-menu-close').addEventListener('click', () => addModal.classList.add('hidden'));

  // No backend exists to receive a newly-created dish, so once every
  // field is genuinely filled in the admin is sent to the 404 page
  // rather than shown a catalog entry nothing actually persisted.
  wireFormRedirect('ad-add-menu-form', '404.html');

  renderStats();
  renderReservationsTable();
  renderOrders();
  renderMenuCatalog();
  showTab('reservations');
})();
