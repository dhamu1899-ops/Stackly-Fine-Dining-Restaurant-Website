/* Customer Portal Dashboard (converted from src/pages/CustomerDashboard.tsx) */

(function () {
  const user = Auth.getUser();
  const gate = document.getElementById('customer-gate');
  const dashboard = document.getElementById('customer-dashboard');

  if (!user || user.role !== 'customer') {
    gate.classList.remove('hidden');
    dashboard.classList.add('hidden');
    document.getElementById('customer-gate-home').addEventListener('click', () => window.location.href = 'index.html');
    return;
  }

  gate.classList.add('hidden');
  dashboard.classList.remove('hidden');

  const reservations = Auth.getReservations().filter(r => r.userId === user.id || r.email === user.email);
  const orders = Auth.getOrders().filter(o => o.userId === user.id || o.userName === user.name);

  document.getElementById('cd-banner-title').textContent = 'Welcome, ' + user.name;
  document.getElementById('cd-avatar').src = user.avatar || 'assets/images/photo-1534528741775-53994a69daeb.webp';
  document.getElementById('cd-name').textContent = user.name;
  document.getElementById('cd-tier').textContent = (user.vipTier || 'Platinum') + ' VIP';
  document.getElementById('cd-email').textContent = user.email + ' • Salem Member';
  document.getElementById('cd-points').textContent = (user.loyaltyPoints || 850) + ' pts';
  document.getElementById('cd-points-loyalty').textContent = (user.loyaltyPoints || 850) + ' Points';
  document.getElementById('cd-points-credit').textContent = 'Worth ₹' + (user.loyaltyPoints || 850) + ' Dining Credit';
  document.getElementById('cd-tab-res-count').textContent = '(' + reservations.length + ')';
  document.getElementById('cd-tab-orders-count').textContent = '(' + orders.length + ')';
  document.getElementById('cd-profile-name').value = user.name;
  document.getElementById('cd-profile-email').value = user.email;
  document.getElementById('cd-profile-phone').value = user.phone || '+91 98765 43210';

  document.getElementById('cd-logout').addEventListener('click', () => { Auth.logout(); window.location.href = 'index.html'; });

  const tabs = ['reservations', 'orders', 'loyalty', 'profile'];
  function showTab(tab) {
    tabs.forEach(t => {
      document.getElementById('cd-tab-btn-' + t).classList.toggle('border-[#c9a050]', t === tab);
      document.getElementById('cd-tab-btn-' + t).classList.toggle('text-[#c9a050]', t === tab);
      document.getElementById('cd-tab-btn-' + t).classList.toggle('bg-[#12191b]', t === tab);
      document.getElementById('cd-tab-btn-' + t).classList.toggle('border-transparent', t !== tab);
      document.getElementById('cd-tab-btn-' + t).classList.toggle('text-gray-400', t !== tab);
      document.getElementById('cd-panel-' + t).classList.toggle('hidden', t !== tab);
    });
  }
  tabs.forEach(t => document.getElementById('cd-tab-btn-' + t).addEventListener('click', () => showTab(t)));

  const resPanel = document.getElementById('cd-panel-reservations');
  const resList = document.getElementById('cd-reservations-list');
  const resEmpty = document.getElementById('cd-reservations-empty');
  if (reservations.length === 0) {
    resList.classList.add('hidden');
    resEmpty.classList.remove('hidden');
  } else {
    resEmpty.classList.add('hidden');
    resList.classList.remove('hidden');
    resList.innerHTML = reservations.map(res =>
      '<div class="p-6 bg-[#0f1416] border border-[#232f33] rounded-3xl space-y-4 hover:border-[#c9a050]/60 transition-all shadow-xl">' +
      '<div class="flex items-center justify-between border-b border-[#1f292d] pb-4">' +
      '<div class="flex items-center gap-2"><span class="font-serif font-bold text-[#c9a050] text-sm">' + res.confirmationCode + '</span><span class="text-[10px] text-gray-500 uppercase">(' + res.seatingArea + ' Area)</span></div>' +
      '<span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ' + (res.status === 'Confirmed' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700' : res.status === 'Cancelled' ? 'bg-red-950/80 text-red-400 border border-red-700' : 'bg-amber-950/80 text-amber-400 border border-amber-700') + '">' + res.status + '</span>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-4 text-xs">' +
      '<div><span class="text-gray-400 text-[10px] uppercase font-medium block">Date & Time</span><span class="text-white font-semibold">' + res.date + ' at ' + res.time + '</span></div>' +
      '<div><span class="text-gray-400 text-[10px] uppercase font-medium block">Guests</span><span class="text-white font-semibold">' + res.guests + ' Guests</span></div>' +
      '<div><span class="text-gray-400 text-[10px] uppercase font-medium block">Phone</span><span class="text-gray-300">' + res.phone + '</span></div>' +
      '<div><span class="text-gray-400 text-[10px] uppercase font-medium block">Special Request</span><span class="text-gray-300 truncate block">' + (res.specialRequests || 'Standard Dining') + '</span></div>' +
      '</div>' +
      (res.status === 'Confirmed' ? '<div class="pt-2 flex justify-end"><button class="px-4 py-2 bg-red-950/50 hover:bg-red-900/80 text-red-300 border border-red-800 rounded-xl text-xs font-semibold transition-all" data-cancel-res="' + res.id + '">Cancel Booking</button></div>' : '') +
      '</div>'
    ).join('');
    resList.querySelectorAll('[data-cancel-res]').forEach(btn => btn.addEventListener('click', () => { Auth.cancelReservation(btn.getAttribute('data-cancel-res')); window.location.reload(); }));
  }

  const ordList = document.getElementById('cd-orders-list');
  const ordEmpty = document.getElementById('cd-orders-empty');
  if (orders.length === 0) {
    ordList.classList.add('hidden');
    ordEmpty.classList.remove('hidden');
  } else {
    ordEmpty.classList.add('hidden');
    ordList.classList.remove('hidden');
    ordList.innerHTML = orders.map(ord =>
      '<div class="p-6 bg-[#0f1416] border border-[#232f33] rounded-3xl space-y-4 hover:border-[#c9a050]/60 transition-all shadow-xl">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1f292d] pb-4">' +
      '<div><span class="font-serif font-bold text-[#c9a050] text-lg block">' + ord.id + '</span><span class="text-xs text-gray-400 font-light">Ordered on ' + ord.date + ' • ' + ord.paymentMethod + '</span></div>' +
      '<div class="flex items-center gap-3"><span class="font-serif text-xl font-bold text-white">₹' + ord.totalAmount.toLocaleString('en-IN') + '</span>' +
      '<span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ' + (ord.status === 'Delivered' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700' : ord.status === 'Preparing' ? 'bg-amber-950/80 text-amber-400 border border-amber-700' : 'bg-blue-950/80 text-blue-400 border border-blue-700') + '">' + ord.status + '</span></div>' +
      '</div>' +
      '<div class="space-y-2"><span class="text-[10px] text-gray-400 uppercase font-semibold tracking-wider block">Order Items:</span>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' + ord.items.map(it =>
        '<div class="flex items-center gap-3 p-3 rounded-2xl bg-[#141b1d] border border-[#28363a]"><img src="' + it.menuItem.image + '" alt="' + it.menuItem.name + '" class="w-12 h-12 rounded-xl object-cover"><div class="text-xs"><span class="text-white font-semibold block">' + it.menuItem.name + '</span><span class="text-[#c9a050]">Qty: ' + it.quantity + ' • ₹' + (it.menuItem.price * it.quantity).toLocaleString('en-IN') + '</span></div></div>'
      ).join('') + '</div></div>' +
      '<div class="text-xs text-gray-400 pt-2 border-t border-[#1f292d] flex items-center gap-2"><svg class="w-4 h-4 text-[#c9a050]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg><span>Delivery Address: ' + ord.deliveryAddress + '</span></div>' +
      '</div>'
    ).join('');
  }

  document.getElementById('cd-profile-save').addEventListener('click', () => alert('Profile settings updated successfully!'));

  showTab('reservations');
})();
