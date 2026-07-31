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
        ? 'assets/images/photo-1560250097-0b93528c311a.webp'
        : 'assets/images/photo-1534528741775-53994a69daeb.webp'
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
      avatar: 'assets/images/photo-1534528741775-53994a69daeb.webp'
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

