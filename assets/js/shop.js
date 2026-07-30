/* Boutique shop: filters, sort, quick view + add to cart (converted from src/pages/ShopPage.tsx) */

(function () {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'featured';

  function toMenuItem(prod) {
    return {
      id: prod.id, name: prod.name, description: prod.description, price: prod.price,
      rating: prod.rating, category: 'chefs_special', image: prod.image, tags: prod.tags,
      isPopular: true, mealType: 'dinner'
    };
  }

  function cardHtml(prod) {
    return '<div class="bg-[#0f1416] border border-[#232f33] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#c9a050] transition-all group shadow-xl">' +
      '<div class="relative h-64 overflow-hidden">' +
      '<img src="' + prod.image + '" alt="' + prod.name + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
      '<div class="absolute inset-0 bg-gradient-to-t from-[#0f1416] via-transparent to-transparent"></div>' +
      (prod.badge ? '<span class="absolute top-3 left-3 bg-[#c9a050] text-black font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">' + prod.badge + '</span>' : '') +
      '<div class="absolute bottom-3 right-3 bg-[#0b0e10]/90 border border-[#c9a050]/60 text-[#c9a050] font-serif font-bold text-lg px-3 py-1 rounded-xl backdrop-blur-md">₹' + prod.price.toLocaleString('en-IN') + '</div>' +
      '</div>' +
      '<div class="p-5 space-y-4 flex-1 flex flex-col justify-between">' +
      '<div class="space-y-2">' +
      '<div class="flex items-center gap-1.5 text-xs text-[#c9a050]"><svg class="w-3.5 h-3.5 fill-[#c9a050]" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span class="font-bold">' + prod.rating + '</span><span class="text-gray-500 text-[10px]">(' + prod.reviewsCount + ' reviews)</span></div>' +
      '<h3 class="font-serif text-lg font-bold text-white group-hover:text-[#c9a050] transition-colors leading-snug">' + prod.name + '</h3>' +
      '<p class="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">' + prod.description + '</p>' +
      '</div>' +
      '<div class="pt-2 flex items-center gap-2">' +
      '<button class="p-3 rounded-xl bg-[#141b1d] border border-[#232f33] text-gray-300 hover:text-[#c9a050] hover:border-[#c9a050] transition-colors" data-shop-qv="' + prod.id + '" title="Quick Details"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></button>' +
      '<button class="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c9a050] to-[#b88e38] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(201,160,80,0.4)] transition-all" data-shop-add="' + prod.id + '"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.693 2.436-7.152.083-.415-.238-.798-.662-.798H5.106M7.5 14.25 5.106 5.272"/></svg><span>Buy Product</span></button>' +
      '</div></div></div>';
  }

  function render() {
    let items = SHOP_PRODUCTS.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });

    if (sortBy === 'price-low') items = items.slice().sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') items = items.slice().sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') items = items.slice().sort((a, b) => b.rating - a.rating);

    grid.innerHTML = items.map(cardHtml).join('');

    grid.querySelectorAll('[data-shop-qv]').forEach(btn => btn.addEventListener('click', () => openQuickView(toMenuItem(SHOP_PRODUCTS.find(p => p.id === btn.getAttribute('data-shop-qv'))))));
    grid.querySelectorAll('[data-shop-add]').forEach(btn => btn.addEventListener('click', () => addToCart(toMenuItem(SHOP_PRODUCTS.find(p => p.id === btn.getAttribute('data-shop-add'))))));
  }

  document.getElementById('shop-search').addEventListener('input', (e) => { searchQuery = e.target.value; render(); });
  document.getElementById('shop-sort').addEventListener('change', (e) => { sortBy = e.target.value; render(); });

  document.querySelectorAll('[data-shop-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-shop-cat]').forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
        b.classList.add('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
      });
      btn.classList.remove('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
      btn.classList.add('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
      activeCategory = btn.getAttribute('data-shop-cat');
      render();
    });
  });

  render();
})();
