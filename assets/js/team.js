/* Renders the Chefs grid (converted from src/components/ChefsSection.tsx) —
   used on team.html */

(function () {
  const grid = document.getElementById('chefs-grid');
  if (!grid) return;

  grid.innerHTML = CHEFS.map(chef =>
    '<div class="group bg-[#111719] rounded-2xl overflow-hidden border border-[#1f2a2e] hover:border-[#c9a050]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between">' +
    '<div>' +
    '<div class="relative h-80 overflow-hidden bg-black">' +
    '<img src="' + chef.image + '" alt="' + chef.name + '" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">' +
    '<div class="absolute inset-0 bg-gradient-to-t from-[#111719] via-transparent to-transparent opacity-90"></div>' +
    '<div class="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#c9a050]/50 p-2.5 rounded-xl flex items-center gap-2 shadow-lg">' +
    '<svg class="w-4 h-4 text-[#c9a050]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3"/></svg>' +
    '<span class="text-[10px] text-white font-semibold uppercase tracking-wider">' + chef.award + '</span>' +
    '</div>' +
    '<div class="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">' +
    '<a href="404.html" class="p-2 rounded-full bg-black/70 text-[#c9a050] hover:bg-[#c9a050] hover:text-black transition-colors" title="Instagram"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>' +
    '<a href="404.html" class="p-2 rounded-full bg-black/70 text-[#c9a050] hover:bg-[#c9a050] hover:text-black transition-colors" title="Facebook"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z"/></svg></a>' +
    '<a href="404.html" class="p-2 rounded-full bg-black/70 text-[#c9a050] hover:bg-[#c9a050] hover:text-black transition-colors" title="YouTube"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>' +
    '</div></div>' +
    '<div class="p-6 space-y-3">' +
    '<div class="text-xs font-bold text-[#c9a050] uppercase tracking-widest">' + chef.title + '</div>' +
    '<h3 class="font-serif text-2xl font-bold text-white">' + chef.name + '</h3>' +
    '<p class="text-gray-400 text-xs leading-relaxed font-light">' + chef.bio + '</p>' +
    '</div></div>' +
    '<div class="p-6 pt-0 border-t border-[#1a2327] mt-4 pt-4">' +
    '<span class="text-[10px] text-gray-300 uppercase tracking-wider block">Signature Creation:</span>' +
    '<span class="text-xs text-white font-semibold font-serif">' + chef.signatureDish + '</span>' +
    '</div></div>'
  ).join('');
})();
