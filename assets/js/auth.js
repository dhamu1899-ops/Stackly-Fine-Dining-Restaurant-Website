/* Auth / reservations / orders / menu-catalog store (converted from src/context/AuthContext.tsx)
   Persists to localStorage so state survives across the site's separate HTML pages. */

const Auth = {
  getUser() {
    const saved = localStorage.getItem('stackly_user');
    return saved ? JSON.parse(saved) : null;
  },

  setUser(user) {
    if (user) {
      localStorage.setItem('stackly_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('stackly_user');
    }
  },

  getReservations() {
    const saved = localStorage.getItem('stackly_reservations');
    return saved ? JSON.parse(saved) : MOCK_RESERVATIONS;
  },

  setReservations(list) {
    localStorage.setItem('stackly_reservations', JSON.stringify(list));
  },

  getOrders() {
    const saved = localStorage.getItem('stackly_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  },

  setOrders(list) {
    localStorage.setItem('stackly_orders', JSON.stringify(list));
  },

  getMenuItems() {
    const saved = localStorage.getItem('stackly_menu_items');
    return saved ? JSON.parse(saved) : MENU_ITEMS;
  },

  setMenuItems(list) {
    localStorage.setItem('stackly_menu_items', JSON.stringify(list));
  },

  login(email, role) {
    const isUserAdmin = role === 'admin' || email.toLowerCase().includes('admin');
    const finalRole = isUserAdmin ? 'admin' : 'customer';

    const newUser = {
      id: finalRole === 'admin' ? 'adm-1' : 'c-1',
      name: finalRole === 'admin' ? 'Stackly Executive Admin' : (email.split('@')[0] || 'Gourmet Guest'),
      email: email,
      role: finalRole,
      phone: '+91 98765 43210',
      loyaltyPoints: finalRole === 'customer' ? 850 : undefined,
      vipTier: finalRole === 'customer' ? 'Platinum' : undefined,
      joinedDate: '2025-01-15',
      avatar: finalRole === 'admin'
        ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    this.setUser(newUser);
    return newUser;
  },

  signup(name, email, role) {
    const newUser = {
      id: 'u-' + Date.now(),
      name: name,
      email: email,
      role: role,
      phone: '+91 98765 43210',
      loyaltyPoints: 100,
      vipTier: 'Gold',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
    this.setUser(newUser);
    return newUser;
  },

  logout() {
    this.setUser(null);
  },

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders().map(o => o.id === orderId ? { ...o, status } : o);
    this.setOrders(orders);
    return orders;
  },

  cancelReservation(resId) {
    const list = this.getReservations().map(r => r.id === resId ? { ...r, status: 'Cancelled' } : r);
    this.setReservations(list);
    return list;
  },

  addReservation(res) {
    const user = this.getUser();
    const newRes = { ...res, status: 'Confirmed', userId: (user && user.id) || 'c-guest' };
    const list = [newRes, ...this.getReservations()];
    this.setReservations(list);
    return newRes;
  },

  addOrder(items, total, address) {
    const user = this.getUser();
    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      userId: (user && user.id) || 'c-guest',
      userName: (user && user.name) || 'Guest Gourmet',
      items,
      totalAmount: total,
      status: 'Preparing',
      date: new Date().toISOString().split('T')[0],
      deliveryAddress: address || '124 Fairlands Main Rd, Salem',
      paymentMethod: 'UPI / Online'
    };
    const list = [newOrder, ...this.getOrders()];
    this.setOrders(list);
    return newOrder;
  },

  addMenuItem(item) {
    const newItem = { ...item, id: 'm-' + Date.now() };
    const list = [newItem, ...this.getMenuItems()];
    this.setMenuItems(list);
    return newItem;
  },

  deleteMenuItem(id) {
    const list = this.getMenuItems().filter(m => m.id !== id);
    this.setMenuItems(list);
    return list;
  }
};

/* ---------------------------------------------------------------------
   Auth Modal wiring (converted from src/components/AuthModal.tsx)
   Expects the modal markup (id="auth-modal") to already be present in
   the page — see partials/auth-modal in each HTML file.
--------------------------------------------------------------------- */
const AuthModalUI = {
  mode: 'login',
  role: 'customer',

  init() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    modal.querySelector('[data-role="customer"]').addEventListener('click', () => this.setRole('customer'));
    modal.querySelector('[data-role="admin"]').addEventListener('click', () => this.setRole('admin'));
    modal.querySelector('[data-close-auth]').addEventListener('click', () => this.close());
    modal.querySelector('[data-toggle-mode]').addEventListener('click', (e) => {
      e.preventDefault();
      this.setMode(this.mode === 'login' ? 'signup' : 'login');
    });
    modal.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
    modal.querySelector('[data-demo="customer"]').addEventListener('click', () => this.demoLogin('customer'));
    modal.querySelector('[data-demo="admin"]').addEventListener('click', () => this.demoLogin('admin'));
  },

  open(role, mode) {
    this.role = role || 'customer';
    this.mode = mode || 'login';
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.querySelector('[data-error]').classList.add('hidden');
    modal.querySelector('form').reset();
    this.setMode(this.mode);
    this.setRole(this.role);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  close() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  },

  setRole(role) {
    this.role = role;
    const modal = document.getElementById('auth-modal');
    ['customer', 'admin'].forEach((r) => {
      const btn = modal.querySelector('[data-role="' + r + '"]');
      if (r === role) {
        btn.classList.add('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-md');
        btn.classList.remove('text-gray-400');
      } else {
        btn.classList.remove('bg-gradient-to-r', 'from-[#d4af37]', 'via-[#c9a050]', 'to-[#b88e38]', 'text-black', 'shadow-md');
        btn.classList.add('text-gray-400');
      }
    });
    modal.querySelector('[data-email-input]').placeholder = role === 'admin' ? 'admin@stackly.com' : 'your.email@example.com';
  },

  setMode(mode) {
    this.mode = mode;
    const modal = document.getElementById('auth-modal');
    modal.querySelector('[data-modal-title]').textContent = mode === 'login' ? 'Welcome Back' : 'Create Account';
    modal.querySelector('[data-modal-subtitle]').textContent = mode === 'login'
      ? 'Access your reservations, VIP dining points, and manager console.'
      : 'Join Stackly Gourmet Society for exclusive chef tasting invitations.';
    modal.querySelector('[data-name-field]').classList.toggle('hidden', mode !== 'signup');
    modal.querySelector('[data-submit-label]').textContent = mode === 'login' ? ('Login as ' + this.role) : ('Sign Up as ' + this.role);
    modal.querySelector('[data-footer-login]').classList.toggle('hidden', mode !== 'login');
    modal.querySelector('[data-footer-signup]').classList.toggle('hidden', mode !== 'signup');
  },

  handleSubmit(e) {
    e.preventDefault();
    const modal = document.getElementById('auth-modal');
    const name = modal.querySelector('[data-name-input]').value;
    const email = modal.querySelector('[data-email-input]').value;
    const password = modal.querySelector('[data-password-input]').value;
    const errorBox = modal.querySelector('[data-error]');

    if (!email || !password) {
      errorBox.textContent = 'Please fill in all required fields.';
      errorBox.classList.remove('hidden');
      return;
    }

    let user;
    if (this.mode === 'login') {
      user = Auth.login(email, this.role);
    } else {
      if (!name) {
        errorBox.textContent = 'Please enter your full name.';
        errorBox.classList.remove('hidden');
        return;
      }
      user = Auth.signup(name, email, this.role);
    }

    this.close();
    window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
  },

  demoLogin(role) {
    const demoEmail = role === 'admin' ? 'admin@stackly.com' : 'dhamu1899@gmail.com';
    Auth.login(demoEmail, role);
    this.close();
    window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
  }
};

function openAuthModal(role, mode) {
  AuthModalUI.open(role, mode);
}

document.addEventListener('DOMContentLoaded', () => AuthModalUI.init());
