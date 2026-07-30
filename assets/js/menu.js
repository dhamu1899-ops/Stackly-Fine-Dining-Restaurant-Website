/* Menu page: search, meal-type tabs, tag filter, sort, PDF-download simulation
   (converted from src/pages/MenuPage.tsx) */

(function () {
  const grid = document.getElementById('menu-grid');
  const emptyState = document.getElementById('menu-empty');
  const resultsCount = document.getElementById('menu-results-count');
  const clearBtn = document.getElementById('menu-clear-filters');
  if (!grid) return;

  let activeMeal = 'all';
  let searchQuery = '';
  let selectedTag = 'all';
  let sortBy = 'featured';

  function cardHtml(item) {
    return '<div class="bg-[#0f1416] border border-[#232f33] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#c9a050] transition-all group shadow-xl">' +
      '<div class="relative h-56 overflow-hidden">' +
      '<img src="' + item.image + '" alt="' + item.name + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
      '<div class="absolute inset-0 bg-gradient-to-t from-[#0f1416] via-transparent to-transparent"></div>' +
      '<div class="absolute top-3 left-3 flex flex-wrap gap-1.5">' +
      (item.isPopular ? '<span class="bg-[#c9a050] text-black font-bold text-[10px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-1 4-4 5-4 9a4 4 0 0 0 8 0c0-1-1-2-1-2s2 1 2 4a5 5 0 0 1-10 0c0-5 4-6 5-11Z"/></svg> Popular</span>' : '') +
      (item.tags.includes('Vegetarian') ? '<span class="bg-emerald-900/90 text-emerald-300 font-medium text-[10px] uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-700/50">Vegetarian</span>' : '') +
      '</div>' +
      '<div class="absolute bottom-3 right-3 bg-[#0b0e10]/90 border border-[#c9a050]/60 text-[#c9a050] font-serif font-bold text-lg px-3 py-1 rounded-xl backdrop-blur-md">₹' + item.price.toLocaleString('en-IN') + '</div>' +
      '</div>' +
      '<div class="p-6 space-y-4 flex-1 flex flex-col justify-between">' +
      '<div class="space-y-2">' +
      '<h3 class="font-serif text-xl font-bold text-white group-hover:text-[#c9a050] transition-colors">' + item.name + '</h3>' +
      '<p class="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">' + item.description + '</p>' +
      '<div class="flex flex-wrap gap-1 pt-1">' + item.tags.map(t => '<span class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#182023] text-gray-300 border border-white/5">' + t + '</span>').join('') + '</div>' +
      '</div>' +
      (item.winePairing ? '<div class="p-3 rounded-xl bg-[#141b1d] border border-[#232f33] text-[11px] text-gray-300 flex items-start gap-2"><svg class="w-4 h-4 text-[#c9a050] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21h7.5m-6-9v9m4.5-9v9M6 3h12l-.75 6a5.25 5.25 0 0 1-10.5 0L6 3Z"/></svg><div><span class="text-[#c9a050] font-semibold block uppercase text-[9px] tracking-wider">Sommelier Pairing</span><span class="font-light italic">' + item.winePairing + '</span></div></div>' : '') +
      '<div class="pt-2 flex items-center gap-2">' +
      '<button class="p-3 rounded-xl bg-[#141b1d] border border-[#232f33] text-gray-300 hover:text-[#c9a050] hover:border-[#c9a050] transition-colors" data-menu-qv="' + item.id + '" title="Quick Details & Ingredients"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></button>' +
      '<button class="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c9a050] to-[#b88e38] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(201,160,80,0.4)] transition-all" data-menu-add="' + item.id + '"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.693 2.436-7.152.083-.415-.238-.798-.662-.798H5.106M7.5 14.25 5.106 5.272"/></svg><span>Add To Order</span></button>' +
      '</div></div></div>';
  }

  function render() {
    let items = MENU_ITEMS.filter((item) => {
      const matchesMeal = activeMeal === 'all' || item.mealType === activeMeal;
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || (item.winePairing && item.winePairing.toLowerCase().includes(q));
      const matchesTag = selectedTag === 'all' || item.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase()));
      return matchesMeal && matchesSearch && matchesTag;
    });

    if (sortBy === 'price-low') items = items.slice().sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') items = items.slice().sort((a, b) => b.price - a.price);

    resultsCount.textContent = items.length;
    clearBtn.classList.toggle('hidden', !(searchQuery || selectedTag !== 'all'));

    if (items.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }
    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    grid.innerHTML = items.map(cardHtml).join('');

    grid.querySelectorAll('[data-menu-qv]').forEach(btn => btn.addEventListener('click', () => openQuickView(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-menu-qv')))));
    grid.querySelectorAll('[data-menu-add]').forEach(btn => btn.addEventListener('click', () => addToCart(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-menu-add')))));
  }

  document.querySelectorAll('[data-meal-count]').forEach(el => {
    const cat = el.getAttribute('data-meal-count');
    el.textContent = '(' + (cat === 'all' ? MENU_ITEMS.length : MENU_ITEMS.filter(i => i.mealType === cat).length) + ')';
  });

  document.querySelectorAll('[data-meal-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-meal-cat]').forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
        b.classList.add('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
      });
      btn.classList.remove('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
      btn.classList.add('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
      activeMeal = btn.getAttribute('data-meal-cat');
      render();
    });
  });

  document.getElementById('menu-search').addEventListener('input', (e) => { searchQuery = e.target.value; render(); });
  document.getElementById('menu-tag-filter').addEventListener('change', (e) => { selectedTag = e.target.value; render(); });
  document.getElementById('menu-sort').addEventListener('change', (e) => { sortBy = e.target.value; render(); });

  clearBtn.addEventListener('click', () => {
    searchQuery = '';
    selectedTag = 'all';
    document.getElementById('menu-search').value = '';
    document.getElementById('menu-tag-filter').value = 'all';
    render();
  });

  document.getElementById('menu-reset').addEventListener('click', () => {
    activeMeal = 'all';
    searchQuery = '';
    selectedTag = 'all';
    document.getElementById('menu-search').value = '';
    document.getElementById('menu-tag-filter').value = 'all';
    document.querySelectorAll('[data-meal-cat]').forEach(b => {
      b.classList.remove('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
      b.classList.add('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
    });
    document.querySelector('[data-meal-cat="all"]').classList.add('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
    render();
  });

  const downloadBtn = document.getElementById('menu-download');
  downloadBtn.addEventListener('click', () => {
    downloadBtn.dataset.downloaded = 'true';
    downloadBtn.querySelector('span').textContent = 'Downloaded PDF';
    setTimeout(() => { downloadBtn.querySelector('span').textContent = 'Download PDF Menu'; }, 3000);
  });

  render();
})();
