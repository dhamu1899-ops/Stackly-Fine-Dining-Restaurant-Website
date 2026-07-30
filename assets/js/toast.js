/* Toast notification system (converted from src/components/Toast.tsx) */

function showToast(message, type) {
  type = type || 'success';
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = 'toast-' + Math.random().toString(36).substring(2, 9);

  const icons = {
    success: '<svg class="w-5 h-5 text-[#c9a050] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>',
    error: '<svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>',
    info: '<svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>'
  };

  const el = document.createElement('div');
  el.id = id;
  el.className = 'pointer-events-auto flex items-start gap-3 bg-[#131a1d]/95 backdrop-blur-md border border-[#c9a050]/40 p-4 rounded-lg shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-5 duration-300';
  el.innerHTML =
    icons[type] +
    '<div class="flex-1 text-sm text-gray-200 font-medium">' + message + '</div>' +
    '<button class="text-gray-400 hover:text-white transition-colors toast-dismiss" aria-label="Dismiss">' +
    '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg></button>';

  container.appendChild(el);

  const dismiss = () => {
    if (el.parentNode) el.parentNode.removeChild(el);
  };

  el.querySelector('.toast-dismiss').addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}
