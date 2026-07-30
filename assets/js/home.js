/* Home page interactive sections: Hero slideshow, Specials filter,
   Tabbed menu, Video lightbox, Testimonials carousel.
   (converted from Hero.tsx, SpecialsSection.tsx, TabbedMenuSection.tsx,
   VideoExperienceSection.tsx, TestimonialsSection.tsx) */

/* ---------------- Hero Slideshow ---------------- */
(function heroSlideshow() {
  let current = 0;
  const slides = document.querySelectorAll('[data-hero-slide]');
  const dotsWrap = document.querySelector('[data-hero-dots]');
  if (!slides.length) return;

  function render() {
    slides.forEach((s, i) => {
      s.classList.toggle('opacity-100', i === current);
      s.classList.toggle('z-10', i === current);
      s.classList.toggle('opacity-0', i !== current);
      s.classList.toggle('z-0', i !== current);
    });
    document.querySelector('[data-hero-subtitle]').textContent = HERO_SLIDES[current].subtitle;
    document.querySelector('[data-hero-title]').textContent = HERO_SLIDES[current].title;
    document.querySelector('[data-hero-tagline]').textContent = HERO_SLIDES[current].tagline;
    dotsWrap.querySelectorAll('[data-hero-dot]').forEach((dot, i) => {
      dot.className = 'h-1.5 transition-all duration-300 rounded-full ' + (i === current ? 'w-10 bg-[#c9a050]' : 'w-3 bg-white/40 hover:bg-white/70');
    });
  }

  function next() { current = (current + 1) % HERO_SLIDES.length; render(); }
  function prev() { current = (current === 0) ? HERO_SLIDES.length - 1 : current - 1; render(); }

  dotsWrap.innerHTML = HERO_SLIDES.map((_, i) => '<button data-hero-dot title="Go to slide ' + (i + 1) + '"></button>').join('');
  dotsWrap.querySelectorAll('[data-hero-dot]').forEach((dot, i) => dot.addEventListener('click', () => { current = i; render(); }));

  const prevBtn = document.querySelector('[data-hero-prev]');
  const nextBtn = document.querySelector('[data-hero-next]');
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  render();
  setInterval(next, 7000);
})();

/* ---------------- Specials Filter (home preview) ---------------- */
(function specialsSection() {
  const grid = document.querySelector('[data-specials-grid]');
  if (!grid) return;
  const tabs = document.querySelectorAll('[data-specials-cat]');

  function renderSpecials(category) {
    const items = category === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === category);
    grid.innerHTML = items.map(dish =>
      '<div class="group bg-[#12181a] rounded-2xl overflow-hidden border border-[#1f2a2e] hover:border-[#c9a050]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between">' +
      '<div><div class="relative h-60 overflow-hidden bg-black/40">' +
      '<img src="' + dish.image + '" alt="' + dish.name + '" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">' +
      '<div class="absolute inset-0 bg-gradient-to-t from-[#12181a] via-transparent to-black/20"></div>' +
      '<div class="absolute top-4 right-4 bg-[#0d1214]/90 border border-[#c9a050] text-[#c9a050] font-bold text-sm px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">₹' + dish.price.toLocaleString('en-IN') + '</div>' +
      '<div class="absolute top-4 left-4 flex flex-col gap-1.5 items-start">' +
      (dish.isPopular ? '<span class="bg-gold-gradient text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">Popular</span>' : '') +
      '<span class="bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">' +
      '<svg class="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span>' + dish.rating + '</span></span>' +
      '</div></div>' +
      '<div class="p-6 space-y-3">' +
      '<div class="flex items-center gap-2 flex-wrap">' + dish.tags.map(t => '<span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1c2528] text-[#c9a050] border border-[#c9a050]/30">' + t + '</span>').join('') + '</div>' +
      '<h3 class="font-serif text-2xl font-bold text-white group-hover:text-[#c9a050] transition-colors">' + dish.name + '</h3>' +
      '<p class="text-gray-400 text-xs leading-relaxed line-clamp-2">' + dish.description + '</p>' +
      (dish.winePairing ? '<div class="flex items-center gap-2 text-[11px] text-gray-400 italic pt-1 border-t border-[#1a2327]"><svg class="w-3.5 h-3.5 text-[#c9a050] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21h7.5m-6-9v9m4.5-9v9M6 3h12l-.75 6a5.25 5.25 0 0 1-10.5 0L6 3Z"/></svg><span class="truncate">Pairing: ' + dish.winePairing + '</span></div>' : '') +
      '</div></div>' +
      '<div class="p-6 pt-0 flex items-center gap-3">' +
      '<button class="p-2.5 rounded-xl bg-[#1a2327] border border-[#28353a] text-gray-300 hover:text-[#c9a050] hover:border-[#c9a050]/50 transition-colors" data-qv-btn="' + dish.id + '" title="Quick View Details">' +
      '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></button>' +
      '<button class="flex-1 py-2.5 rounded-xl bg-gold-gradient hover:opacity-95 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg" data-add-btn="' + dish.id + '">' +
      '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg><span>Add To Order</span></button>' +
      '</div></div>'
    ).join('');

    grid.querySelectorAll('[data-qv-btn]').forEach(btn => btn.addEventListener('click', () => openQuickView(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-qv-btn')))));
    grid.querySelectorAll('[data-add-btn]').forEach(btn => btn.addEventListener('click', () => addToCart(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-add-btn')))));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-gold-gradient', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20', 'scale-105'));
      tabs.forEach(t => t.classList.add('bg-[#141b1d]', 'border', 'border-[#232f33]', 'text-gray-300'));
      tab.classList.remove('bg-[#141b1d]', 'border', 'border-[#232f33]', 'text-gray-300');
      tab.classList.add('bg-gold-gradient', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20', 'scale-105');
      renderSpecials(tab.getAttribute('data-specials-cat'));
    });
  });

  renderSpecials('all');
})();

/* ---------------- Tabbed Menu (home preview) ---------------- */
(function tabbedMenu() {
  const col1 = document.querySelector('[data-menu-col1]');
  const col2 = document.querySelector('[data-menu-col2]');
  if (!col1 || !col2) return;
  const tabs = document.querySelectorAll('[data-meal-tab]');

  function rowHtml(item) {
    return '<div class="group space-y-2 p-3 rounded-xl hover:bg-[#161f22] transition-colors">' +
      '<div class="flex items-baseline justify-between">' +
      '<button class="font-serif text-xl font-bold text-white group-hover:text-[#c9a050] transition-colors text-left" data-menu-qv="' + item.id + '">' + item.name + '</button>' +
      '<div class="dots-leader hidden sm:block"></div>' +
      '<span class="font-serif text-xl font-bold text-[#c9a050] flex-shrink-0 ml-2">₹' + item.price.toLocaleString('en-IN') + '</span>' +
      '</div>' +
      '<div class="flex items-center justify-between gap-4">' +
      '<div class="space-y-1"><p class="text-gray-400 text-xs leading-relaxed font-light line-clamp-2">' + item.description + '</p>' +
      '<div class="flex items-center gap-2 pt-1 flex-wrap">' + item.tags.map(t => '<span class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1f2b2f] text-gray-300 border border-white/5">' + t + '</span>').join('') + '</div></div>' +
      '<button class="p-2 rounded-full bg-gold-gradient text-black hover:scale-110 transition-transform shadow-md flex-shrink-0" data-menu-add="' + item.id + '" title="Add to order">' +
      '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg></button>' +
      '</div></div>';
  }

  function renderMeal(meal) {
    const items = MENU_ITEMS.filter(i => i.mealType === meal);
    const c1 = items.filter((_, idx) => idx % 2 === 0);
    const c2 = items.filter((_, idx) => idx % 2 !== 0);
    col1.innerHTML = c1.map(rowHtml).join('');
    col2.innerHTML = c2.map(rowHtml).join('');

    [col1, col2].forEach(col => {
      col.querySelectorAll('[data-menu-qv]').forEach(btn => btn.addEventListener('click', () => openQuickView(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-menu-qv')))));
      col.querySelectorAll('[data-menu-add]').forEach(btn => btn.addEventListener('click', () => addToCart(MENU_ITEMS.find(i => i.id === btn.getAttribute('data-menu-add')))));
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-gold-gradient', 'text-black', 'shadow-xl', 'shadow-[#c9a050]/20', 'scale-105'));
      tabs.forEach(t => t.classList.add('bg-[#12181a]', 'border', 'border-[#232f33]', 'text-gray-300'));
      tab.classList.remove('bg-[#12181a]', 'border', 'border-[#232f33]', 'text-gray-300');
      tab.classList.add('bg-gold-gradient', 'text-black', 'shadow-xl', 'shadow-[#c9a050]/20', 'scale-105');
      renderMeal(tab.getAttribute('data-meal-tab'));
    });
  });

  renderMeal('dinner');
})();

/* ---------------- Video Lightbox ---------------- */
(function videoLightbox() {
  const openBtn = document.querySelector('[data-open-video]');
  const modal = document.querySelector('[data-video-modal]');
  if (!openBtn || !modal) return;
  const iframe = modal.querySelector('iframe');
  const src = iframe.getAttribute('data-src');

  openBtn.addEventListener('click', () => {
    iframe.src = src;
    modal.classList.remove('hidden');
  });
  modal.querySelector('[data-close-video]').addEventListener('click', () => {
    iframe.src = '';
    modal.classList.add('hidden');
  });
})();

/* ---------------- Testimonials Carousel ---------------- */
(function testimonialsCarousel() {
  const wrap = document.querySelector('[data-testimonial-card]');
  if (!wrap) return;
  let idx = 0;

  function render() {
    const t = TESTIMONIALS[idx];
    wrap.querySelector('[data-t-stars]').innerHTML = Array.from({ length: t.rating }).map(() =>
      '<svg class="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
    ).join('');
    wrap.querySelector('[data-t-comment]').textContent = '"' + t.comment + '"';
    wrap.querySelector('[data-t-avatar]').src = t.avatar;
    wrap.querySelector('[data-t-author]').textContent = t.author;
    wrap.querySelector('[data-t-role]').textContent = t.role;
    wrap.querySelector('[data-t-pub]').textContent = t.publication;
    wrap.querySelector('[data-t-count]').textContent = (idx + 1) + ' / ' + TESTIMONIALS.length;
  }

  wrap.querySelector('[data-t-prev]').addEventListener('click', () => { idx = idx === 0 ? TESTIMONIALS.length - 1 : idx - 1; render(); });
  wrap.querySelector('[data-t-next]').addEventListener('click', () => { idx = (idx + 1) % TESTIMONIALS.length; render(); });

  render();
})();
