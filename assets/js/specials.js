/* Specials page: pairing toggle + daily specials grid (converted from SpecialsPage.tsx) */

(function () {
  const pairingCards = document.querySelectorAll('[data-pairing]');
  pairingCards.forEach(card => {
    card.addEventListener('click', () => {
      pairingCards.forEach(c => {
        c.classList.remove('bg-[#1a2327]', 'border-[#c9a050]', 'shadow-lg', 'shadow-[#c9a050]/10');
        c.classList.add('bg-[#141b1d]', 'border-[#232f33]');
      });
      card.classList.remove('bg-[#141b1d]', 'border-[#232f33]');
      card.classList.add('bg-[#1a2327]', 'border-[#c9a050]', 'shadow-lg', 'shadow-[#c9a050]/10');
    });
  });

  const grid = document.getElementById('specials-grid');
  if (!grid) return;
  const specialsList = MENU_ITEMS.filter(item => item.category === 'chefs_special' || item.isPopular);

  grid.innerHTML = specialsList.map(item =>
    '<div class="bg-[#0f1416] border border-[#232f33] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#c9a050] transition-all group shadow-xl">' +
    '<div class="relative h-60 overflow-hidden">' +
    '<img src="' + item.image + '" alt="' + item.name + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
    '<div class="absolute inset-0 bg-gradient-to-t from-[#0f1416] via-transparent to-transparent"></div>' +
    '<span class="absolute top-3 left-3 bg-[#c9a050] text-black font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">Chef\'s Creation</span>' +
    '<div class="absolute bottom-3 right-3 bg-[#0b0e10]/90 border border-[#c9a050]/60 text-[#c9a050] font-serif font-bold text-xl px-3 py-1 rounded-xl backdrop-blur-md">₹' + item.price.toLocaleString('en-IN') + '</div>' +
    '</div>' +
    '<div class="p-6 space-y-4 flex-1 flex flex-col justify-between">' +
    '<div class="space-y-2">' +
    '<h3 class="font-serif text-xl font-bold text-white group-hover:text-[#c9a050] transition-colors">' + item.name + '</h3>' +
    '<p class="text-xs text-gray-400 leading-relaxed font-light">' + item.description + '</p>' +
    '</div>' +
    (item.winePairing ? '<div class="p-3 rounded-xl bg-[#141b1d] border border-[#232f33] text-[11px] text-gray-300 flex items-start gap-2"><svg class="w-4 h-4 text-[#c9a050] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21h7.5m-6-9v9m4.5-9v9M6 3h12l-.75 6a5.25 5.25 0 0 1-10.5 0L6 3Z"/></svg><div><span class="text-[#c9a050] font-semibold block uppercase text-[9px] tracking-wider">Suggested Wine</span><span class="font-light italic">' + item.winePairing + '</span></div></div>' : '') +
    '<div class="pt-2 flex items-center gap-2">' +
    '<button class="p-3 rounded-xl bg-[#141b1d] border border-[#232f33] text-gray-300 hover:text-[#c9a050] hover:border-[#c9a050] transition-colors" data-sp-qv="' + item.id + '"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></button>' +
    '<button class="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c9a050] to-[#b88e38] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(201,160,80,0.4)] transition-all" data-sp-add="' + item.id + '"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.693 2.436-7.152.083-.415-.238-.798-.662-.798H5.106M7.5 14.25 5.106 5.272"/></svg><span>Order Special Dish</span></button>' +
    '</div></div></div>'
  ).join('');

  grid.querySelectorAll('[data-sp-qv]').forEach(btn => btn.addEventListener('click', () => openQuickView(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-sp-qv')))));
  grid.querySelectorAll('[data-sp-add]').forEach(btn => btn.addEventListener('click', () => addToCart(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-sp-add')))));
})();
