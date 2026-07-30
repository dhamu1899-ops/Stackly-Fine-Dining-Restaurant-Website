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
    '<a href="404.html" class="p-2 rounded-full bg-black/70 text-[#c9a050] hover:bg-[#c9a050] hover:text-black transition-colors" title="Instagram"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75h9A3.75 3.75 0 0 1 20.25 7.5v9a3.75 3.75 0 0 1-3.75 3.75h-9A3.75 3.75 0 0 1 3.75 16.5v-9A3.75 3.75 0 0 1 7.5 3.75Zm8.25 5.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg></a>' +
    '<a href="404.html" class="p-2 rounded-full bg-black/70 text-[#c9a050] hover:bg-[#c9a050] hover:text-black transition-colors" title="Facebook"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z"/></svg></a>' +
    '<a href="404.html" class="p-2 rounded-full bg-black/70 text-[#c9a050] hover:bg-[#c9a050] hover:text-black transition-colors" title="YouTube"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 12a9.75 9.75 0 1 1-19.5 0 9.75 9.75 0 0 1 19.5 0ZM9.75 9v6l5.25-3-5.25-3Z"/></svg></a>' +
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
