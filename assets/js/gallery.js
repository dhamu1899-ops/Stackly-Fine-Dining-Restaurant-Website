/* Gallery tabs + lightbox (converted from src/components/GallerySection.tsx) */

(function () {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  let activeTab = 'all';
  let lightboxIndex = null;
  let filteredItems = GALLERY_ITEMS;

  function renderGrid() {
    filteredItems = activeTab === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === activeTab);
    grid.innerHTML = filteredItems.map(item =>
      '<div class="group relative h-72 rounded-2xl overflow-hidden border border-[#1f2a2e] cursor-pointer bg-black" data-gallery-item="' + item.id + '">' +
      '<img src="' + item.image + '" alt="' + item.title + '" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">' +
      '<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">' +
      '<span class="text-[10px] text-[#c9a050] uppercase tracking-widest font-bold">' + item.category.replace('_', ' ') + '</span>' +
      '<h3 class="font-serif text-xl font-bold text-white">' + item.title + '</h3>' +
      '<div class="mt-2 text-xs text-gray-300 flex items-center gap-1"><svg class="w-3.5 h-3.5 text-[#c9a050]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/></svg><span>Click to Expand</span></div>' +
      '</div></div>'
    ).join('');

    grid.querySelectorAll('[data-gallery-item]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = filteredItems.findIndex(i => i.id === el.getAttribute('data-gallery-item'));
        if (idx !== -1) openLightbox(idx);
      });
    });
  }

  function openLightbox(idx) {
    lightboxIndex = idx;
    renderLightbox();
    document.getElementById('gallery-lightbox').classList.remove('hidden');
  }

  function renderLightbox() {
    const item = filteredItems[lightboxIndex];
    const lb = document.getElementById('gallery-lightbox');
    lb.querySelector('[data-lb-image]').src = item.image;
    lb.querySelector('[data-lb-image]').alt = item.title;
    lb.querySelector('[data-lb-title]').textContent = item.title;
    lb.querySelector('[data-lb-meta]').textContent = item.category.replace('_', ' ') + ' • ' + (lightboxIndex + 1) + ' of ' + filteredItems.length;
  }

  document.getElementById('gallery-lightbox').querySelector('[data-lb-close]').addEventListener('click', () => document.getElementById('gallery-lightbox').classList.add('hidden'));
  document.getElementById('gallery-lightbox').querySelector('[data-lb-prev]').addEventListener('click', () => { lightboxIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1; renderLightbox(); });
  document.getElementById('gallery-lightbox').querySelector('[data-lb-next]').addEventListener('click', () => { lightboxIndex = (lightboxIndex + 1) % filteredItems.length; renderLightbox(); });

  document.querySelectorAll('[data-gallery-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-gallery-tab]').forEach(t => {
        t.classList.remove('bg-gold-gradient', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20', 'scale-105');
        t.classList.add('bg-[#141b1d]', 'border', 'border-[#232f33]', 'text-gray-300');
      });
      tab.classList.remove('bg-[#141b1d]', 'border', 'border-[#232f33]', 'text-gray-300');
      tab.classList.add('bg-gold-gradient', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20', 'scale-105');
      activeTab = tab.getAttribute('data-gallery-tab');
      renderGrid();
    });
  });

  renderGrid();
})();
