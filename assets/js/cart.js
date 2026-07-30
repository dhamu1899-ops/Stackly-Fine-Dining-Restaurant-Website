/* Order basket / Cart Drawer (converted from src/components/CartDrawer.tsx)
   Cart is persisted to localStorage (key stackly_cart) so it survives
   navigation between the site's separate HTML pages. */

const Cart = {
  KEY: 'stackly_cart',

  get() {
    const saved = localStorage.getItem(this.KEY);
    return saved ? JSON.parse(saved) : [];
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    updateCartBadge();
  },

  count() {
    return this.get().reduce((acc, item) => acc + item.quantity, 0);
  },

  add(menuItem, specialInstructions) {
    const items = this.get();
    const idx = items.findIndex(i => i.menuItem.id === menuItem.id);
    if (idx !== -1) {
      items[idx].quantity += 1;
      if (specialInstructions) items[idx].specialInstructions = specialInstructions;
    } else {
      items.push({ menuItem, quantity: 1, specialInstructions });
    }
    this.save(items);
    showToast('Added "' + menuItem.name + '" to your order basket.', 'success');
    if (!document.getElementById('cart-drawer').classList.contains('hidden')) {
      renderCartDrawer();
    }
  },

  updateQuantity(id, delta) {
    let items = this.get()
      .map(item => {
        if (item.menuItem.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);
    this.save(items);
    renderCartDrawer();
  },

  removeItem(id) {
    const items = this.get().filter(item => item.menuItem.id !== id);
    this.save(items);
    showToast('Item removed from basket.', 'info');
    renderCartDrawer();
  },

  clear() {
    this.save([]);
  }
};

function updateCartBadge() {
  document.querySelectorAll('[data-cart-badge]').forEach((badge) => {
    const count = Cart.count();
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

let cartOrderConfirmed = false;
let cartDiningOption = 'table';
let cartTableNumber = '12';

function formatINR(n) {
  return Math.round(n).toLocaleString('en-IN');
}

function openCartDrawer() {
  cartOrderConfirmed = false;
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  const items = Cart.get();
  const countEl = drawer.querySelector('[data-cart-count]');
  const body = drawer.querySelector('[data-cart-body]');
  const footer = drawer.querySelector('[data-cart-footer]');

  countEl.textContent = items.length;

  if (cartOrderConfirmed) {
    const ticket = 'SIG-' + Math.floor(1000 + Math.random() * 9000);
    body.innerHTML =
      '<div class="text-center py-16 space-y-4">' +
      '<div class="w-16 h-16 rounded-full bg-gold-gradient text-black mx-auto flex items-center justify-center shadow-lg">' +
      '<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3 6-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></div>' +
      '<h4 class="font-serif text-2xl font-bold text-white">Order Placed</h4>' +
      '<p class="text-xs text-gray-400 max-w-xs mx-auto">Executive Chef Alexander Vance and team are preparing your order.</p>' +
      '<div class="p-4 rounded-xl bg-[#162023] border border-[#232f33] text-xs text-[#c9a050] font-mono font-bold">Order Ticket: #' + ticket + '</div>' +
      '<button data-cart-done class="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider">Done</button>' +
      '</div>';
    footer.innerHTML = '';
    body.querySelector('[data-cart-done]').addEventListener('click', () => {
      Cart.clear();
      cartOrderConfirmed = false;
      closeCartDrawer();
    });
    return;
  }

  if (items.length === 0) {
    body.innerHTML =
      '<div class="text-center py-20 space-y-3">' +
      '<svg class="w-12 h-12 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-1.35 0-2.5.65-3.25 1.65C8 3.65 6.85 3 5.5 3A3.5 3.5 0 0 0 2 6.5C2 11 8 15 12 18.5c4-3.5 10-7.5 10-12A3.5 3.5 0 0 0 18.5 3c-1.35 0-2.5.65-3.25 1.65C14.5 3.65 13.35 3 12 3Z"/></svg>' +
      '<p class="text-gray-400 text-sm">Your order basket is currently empty.</p>' +
      '<p class="text-xs text-gray-500">Explore our specials or tabbed menu to add dishes.</p>' +
      '</div>';
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = '<div class="space-y-4">' + items.map(({ menuItem, quantity }) =>
    '<div class="bg-[#141c1e] p-4 rounded-xl border border-[#222e32] flex items-center gap-4 justify-between">' +
    '<img src="' + menuItem.image + '" alt="' + menuItem.name + '" referrerpolicy="no-referrer" class="w-16 h-16 rounded-lg object-cover border border-gray-700">' +
    '<div class="flex-1 space-y-1">' +
    '<h5 class="font-serif text-sm font-bold text-white leading-tight">' + menuItem.name + '</h5>' +
    '<div class="text-xs text-[#c9a050] font-bold">₹' + formatINR(menuItem.price * quantity) + '</div>' +
    '</div>' +
    '<div class="flex items-center gap-2 bg-[#1a2529] p-1.5 rounded-lg border border-gray-700">' +
    '<button class="p-1 text-gray-400 hover:text-white" data-qty-dec="' + menuItem.id + '"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M5 12h14"/></svg></button>' +
    '<span class="text-xs font-bold text-white w-4 text-center">' + quantity + '</span>' +
    '<button class="p-1 text-gray-400 hover:text-white" data-qty-inc="' + menuItem.id + '"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 5v14m-7-7h14"/></svg></button>' +
    '</div>' +
    '<button class="text-gray-500 hover:text-red-400 transition-colors p-1" data-remove-item="' + menuItem.id + '"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9M19.228 5.79A48.4 48.4 0 0 0 16.5 5.283V4.5A2.25 2.25 0 0 0 14.25 2.25h-4.5A2.25 2.25 0 0 0 7.5 4.5v.783a48.4 48.4 0 0 0-2.728.507M2.5 5.79h19m-13.5 0V4.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.29"/></svg></button>' +
    '</div>'
  ).join('') + '</div>';

  const subtotal = items.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  footer.innerHTML =
    '<div class="grid grid-cols-2 gap-2 text-xs">' +
    '<button type="button" data-dining="table" class="py-2 rounded-lg font-semibold border ' + (cartDiningOption === 'table' ? 'bg-[#1e2a2e] text-[#c9a050] border-[#c9a050]' : 'bg-[#101618] text-gray-400 border-gray-800') + '">In-House Dining</button>' +
    '<button type="button" data-dining="takeout" class="py-2 rounded-lg font-semibold border ' + (cartDiningOption === 'takeout' ? 'bg-[#1e2a2e] text-[#c9a050] border-[#c9a050]' : 'bg-[#101618] text-gray-400 border-gray-800') + '">Luxury Curbside</button>' +
    '</div>' +
    (cartDiningOption === 'table'
      ? '<div class="flex items-center justify-between text-xs text-gray-300 bg-[#162023] p-2.5 rounded-lg mt-4">' +
        '<span>Selected Table Number:</span>' +
        '<input type="text" data-table-number value="' + cartTableNumber + '" class="bg-[#0b0e10] border border-gray-700 rounded px-2 py-1 text-xs text-[#c9a050] font-bold w-16 text-center">' +
        '</div>'
      : '') +
    '<div class="space-y-1.5 text-xs text-gray-300 mt-4">' +
    '<div class="flex justify-between"><span>Subtotal:</span><span class="font-semibold text-white">₹' + formatINR(subtotal) + '</span></div>' +
    '<div class="flex justify-between"><span>GST (5%):</span><span class="font-semibold text-white">₹' + formatINR(tax) + '</span></div>' +
    '<div class="flex justify-between text-sm font-bold text-white pt-2 border-t border-gray-800"><span>Grand Total:</span><span class="text-[#c9a050] font-serif text-lg">₹' + formatINR(total) + '</span></div>' +
    '</div>' +
    '<button data-cart-checkout class="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(201,160,80,0.4)] transition-all mt-4">Transmit Order To Kitchen</button>';

  footer.querySelectorAll('[data-dining]').forEach(btn => {
    btn.addEventListener('click', () => { cartDiningOption = btn.getAttribute('data-dining'); renderCartDrawer(); });
  });
  const tableInput = footer.querySelector('[data-table-number]');
  if (tableInput) tableInput.addEventListener('input', (e) => { cartTableNumber = e.target.value; });
  footer.querySelector('[data-cart-checkout]').addEventListener('click', () => {
    if (Cart.get().length === 0) return;
    cartOrderConfirmed = true;
    showToast('Your gourmet order has been transmitted to the executive kitchen!', 'success');
    renderCartDrawer();
  });

  body.querySelectorAll('[data-qty-inc]').forEach(btn => btn.addEventListener('click', () => Cart.updateQuantity(btn.getAttribute('data-qty-inc'), 1)));
  body.querySelectorAll('[data-qty-dec]').forEach(btn => btn.addEventListener('click', () => Cart.updateQuantity(btn.getAttribute('data-qty-dec'), -1)));
  body.querySelectorAll('[data-remove-item]').forEach(btn => btn.addEventListener('click', () => Cart.removeItem(btn.getAttribute('data-remove-item'))));
}

function addToCart(menuItem, specialInstructions) {
  Cart.add(menuItem, specialInstructions);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.querySelector('[data-close-cart]').addEventListener('click', closeCartDrawer);
    drawer.addEventListener('click', (e) => { if (e.target === drawer) closeCartDrawer(); });
  }
  document.querySelectorAll('[data-open-cart]').forEach(btn => btn.addEventListener('click', openCartDrawer));
});
