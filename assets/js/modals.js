/* Quick View + Search modals (converted from QuickViewModal.tsx & SearchModal.tsx) */

function openQuickView(item) {
  const modal = document.getElementById('quickview-modal');
  if (!modal || !item) return;

  modal.querySelector('[data-qv-image]').src = item.image;
  modal.querySelector('[data-qv-image]').alt = item.name;
  modal.querySelector('[data-qv-category]').textContent = item.category.replace('_', ' ');
  modal.querySelector('[data-qv-rating]').textContent = item.rating;
  modal.querySelector('[data-qv-name]').textContent = item.name;
  modal.querySelector('[data-qv-price]').textContent = '₹' + item.price.toLocaleString('en-IN');
  modal.querySelector('[data-qv-desc]').textContent = item.description;

  const caloriesEl = modal.querySelector('[data-qv-calories]');
  if (item.calories) {
    caloriesEl.classList.remove('hidden');
    caloriesEl.querySelector('span').textContent = 'Calories: ' + item.calories + ' kcal';
  } else {
    caloriesEl.classList.add('hidden');
  }

  const prepEl = modal.querySelector('[data-qv-prep]');
  if (item.prepTime) {
    prepEl.classList.remove('hidden');
    prepEl.querySelector('span').textContent = 'Prep: ' + item.prepTime;
  } else {
    prepEl.classList.add('hidden');
  }

  const wineEl = modal.querySelector('[data-qv-wine]');
  if (item.winePairing) {
    wineEl.classList.remove('hidden');
    wineEl.querySelector('[data-qv-wine-text]').textContent = item.winePairing;
  } else {
    wineEl.classList.add('hidden');
  }

  const instructionsInput = modal.querySelector('[data-qv-instructions]');
  instructionsInput.value = '';

  const addBtn = modal.querySelector('[data-qv-add]');
  addBtn.dataset.added = 'false';
  addBtn.className = 'w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg bg-gold-gradient text-black hover:shadow-[0_0_20px_rgba(201,160,80,0.4)]';
  addBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg><span>Add To Order Basket</span>';

  addBtn.onclick = () => {
    addToCart(item, instructionsInput.value);
    addBtn.dataset.added = 'true';
    addBtn.className = 'w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg bg-emerald-500 text-black';
    addBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg><span>Added To Basket</span>';
    setTimeout(() => closeQuickView(), 1200);
  };

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/* -------------------- Search Modal -------------------- */
function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  const input = modal.querySelector('[data-search-input]');
  input.value = '';
  renderSearchResults('');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => input.focus(), 50);
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderSearchResults(query) {
  const modal = document.getElementById('search-modal');
  const results = modal.querySelector('[data-search-results]');
  const q = query.trim().toLowerCase();

  if (q === '') {
    results.innerHTML = '';
    return;
  }

  const items = (typeof MENU_ITEMS !== 'undefined' ? MENU_ITEMS : []).filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.tags.some(tag => tag.toLowerCase().includes(q))
  );

  if (items.length === 0) {
    results.innerHTML = '<p class="text-center text-gray-400 text-xs py-8">No gourmet dishes found matching "' + query + '".</p>';
    return;
  }

  results.innerHTML = items.map(item =>
    '<div class="bg-[#141d20] p-3 rounded-xl border border-[#222f33] flex items-center justify-between gap-4 hover:border-[#c9a050]/50 transition-colors">' +
    '<div class="flex items-center gap-3 cursor-pointer flex-1" data-search-view="' + item.id + '">' +
    '<img src="' + item.image + '" alt="' + item.name + '" referrerpolicy="no-referrer" class="w-14 h-14 rounded-lg object-cover">' +
    '<div><h5 class="font-serif text-base font-bold text-white hover:text-[#c9a050] transition-colors">' + item.name + '</h5>' +
    '<span class="text-xs text-[#c9a050] font-bold">₹' + item.price.toLocaleString('en-IN') + '</span></div></div>' +
    '<button class="p-2.5 rounded-full bg-gold-gradient text-black hover:scale-110 transition-transform shadow-md" data-search-add="' + item.id + '" title="Add to order">' +
    '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg></button>' +
    '</div>'
  ).join('');

  results.querySelectorAll('[data-search-view]').forEach(el => {
    el.addEventListener('click', () => {
      const item = MENU_ITEMS.find(i => i.id === el.getAttribute('data-search-view'));
      closeSearchModal();
      openQuickView(item);
    });
  });
  results.querySelectorAll('[data-search-add]').forEach(el => {
    el.addEventListener('click', () => {
      const item = MENU_ITEMS.find(i => i.id === el.getAttribute('data-search-add'));
      addToCart(item);
      closeSearchModal();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const qv = document.getElementById('quickview-modal');
  if (qv) {
    qv.querySelector('[data-close-qv]').addEventListener('click', closeQuickView);
    qv.addEventListener('click', (e) => { if (e.target === qv) closeQuickView(); });
  }

  const sm = document.getElementById('search-modal');
  if (sm) {
    sm.querySelector('[data-close-search]').addEventListener('click', closeSearchModal);
    sm.addEventListener('click', (e) => { if (e.target === sm) closeSearchModal(); });
    sm.querySelector('[data-search-input]').addEventListener('input', (e) => renderSearchResults(e.target.value));
  }

  document.querySelectorAll('[data-open-search]').forEach(btn => btn.addEventListener('click', openSearchModal));
});
