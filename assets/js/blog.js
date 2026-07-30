/* Blog listing + reader modal (converted from src/pages/BlogPage.tsx) */

(function () {
  const featuredWrap = document.getElementById('blog-featured');
  const gridWrap = document.getElementById('blog-grid');
  if (!gridWrap) return;

  let activeTag = 'all';
  const likes = {};

  function render() {
    const filtered = activeTag === 'all' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category.toLowerCase().includes(activeTag.toLowerCase()));

    if (filtered.length === 0) {
      featuredWrap.innerHTML = '';
      gridWrap.innerHTML = '';
      return;
    }

    const featured = filtered[0];
    featuredWrap.innerHTML =
      '<div class="bg-[#0f1416] border border-[#232f33] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl hover:border-[#c9a050] transition-all group">' +
      '<div class="lg:col-span-7 h-80 lg:h-full overflow-hidden relative">' +
      '<img src="' + featured.image + '" alt="' + featured.title + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
      '<div class="absolute top-4 left-4 bg-[#c9a050] text-black text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Featured Editorial</div>' +
      '</div>' +
      '<div class="lg:col-span-5 p-8 lg:p-12 space-y-4">' +
      '<div class="flex items-center gap-4 text-xs text-[#c9a050]"><span>' + featured.date + '</span><span>•</span><span>' + featured.readTime + '</span></div>' +
      '<h2 class="font-serif text-2xl md:text-3xl font-bold text-white group-hover:text-[#c9a050] transition-colors leading-snug">' + featured.title + '</h2>' +
      '<p class="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">' + featured.summary + '</p>' +
      '<div class="pt-2 flex items-center justify-between">' +
      '<span class="text-xs text-gray-400">By ' + featured.author + '</span>' +
      '<button class="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform" data-blog-read="' + featured.id + '"><span>Read Full Article</span></button>' +
      '</div></div></div>';

    gridWrap.innerHTML = filtered.slice(1).map(post =>
      '<article class="bg-[#0f1416] border border-[#232f33] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#c9a050] transition-all group shadow-xl">' +
      '<div class="relative h-56 overflow-hidden">' +
      '<img src="' + post.image + '" alt="' + post.title + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
      '<span class="absolute top-3 left-3 bg-[#0b0e10]/90 border border-[#c9a050]/50 text-[#c9a050] text-[10px] font-semibold uppercase px-3 py-1 rounded-full backdrop-blur-md">' + post.category + '</span>' +
      '</div>' +
      '<div class="p-6 space-y-4 flex-1 flex flex-col justify-between">' +
      '<div class="space-y-2">' +
      '<div class="flex items-center gap-3 text-[11px] text-gray-400"><span>' + post.date + '</span><span>•</span><span>' + post.readTime + '</span></div>' +
      '<h3 class="font-serif text-lg font-bold text-white group-hover:text-[#c9a050] transition-colors leading-snug">' + post.title + '</h3>' +
      '<p class="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">' + post.summary + '</p>' +
      '</div>' +
      '<div class="pt-2 flex items-center justify-between border-t border-[#1f292d]">' +
      '<span class="text-[11px] text-gray-400 font-light">By ' + post.author + '</span>' +
      '<button class="text-xs text-[#c9a050] font-semibold uppercase tracking-wider hover:underline flex items-center gap-1" data-blog-read="' + post.id + '"><span>Read Article</span></button>' +
      '</div></div></article>'
    ).join('');

    document.querySelectorAll('[data-blog-read]').forEach(btn => {
      btn.addEventListener('click', () => openReader(BLOG_POSTS.find(p => p.id === btn.getAttribute('data-blog-read'))));
    });
  }

  function openReader(post) {
    const modal = document.getElementById('blog-reader-modal');
    modal.querySelector('[data-br-category]').textContent = post.category;
    modal.querySelector('[data-br-title]').textContent = post.title;
    modal.querySelector('[data-br-author]').textContent = post.author;
    modal.querySelector('[data-br-date]').textContent = post.date;
    modal.querySelector('[data-br-readtime]').textContent = post.readTime;
    modal.querySelector('[data-br-image]').src = post.image;
    modal.querySelector('[data-br-summary]').textContent = '"' + post.summary + '"';
    modal.querySelector('[data-br-content]').textContent = post.content;
    modal.querySelector('[data-br-likes]').textContent = 'Applaud (' + (likes[post.id] || 24) + ')';
    modal.querySelector('[data-br-like-btn]').onclick = () => {
      likes[post.id] = (likes[post.id] || 24) + 1;
      modal.querySelector('[data-br-likes]').textContent = 'Applaud (' + likes[post.id] + ')';
    };
    modal.querySelector('[data-br-share]').onclick = () => {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    };
    modal.classList.remove('hidden');
  }

  document.querySelectorAll('[data-close-blog-reader]').forEach(btn => btn.addEventListener('click', () => document.getElementById('blog-reader-modal').classList.add('hidden')));

  document.querySelectorAll('[data-blog-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-blog-cat]').forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
        b.classList.add('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
      });
      btn.classList.remove('bg-[#0f1416]', 'border', 'border-[#232f33]', 'text-gray-400');
      btn.classList.add('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-lg', 'shadow-[#c9a050]/20');
      activeTag = btn.getAttribute('data-blog-cat');
      render();
    });
  });

  render();
})();
