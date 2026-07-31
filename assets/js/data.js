/* Stackly — shared static data (converted from src/data/restaurantData.ts) */

const HERO_SLIDES = [
  {
    id: 1,
    subtitle: "✦ MICHELIN STARRED EXPERIENCE ✦",
    title: "Delight In Every Savory Bite",
    tagline: "Immerse your senses in artful gastronomy where timeless French tradition meets contemporary culinary craftsmanship.",
    image: "assets/images/photo-1544025162-d76694265947.webp",
  },
  {
    id: 2,
    subtitle: "✦ ARTISANAL CULINARY ARTISTRY ✦",
    title: "Savor Precision & Perfection",
    tagline: "Hand-selected organic ingredients, rare truffles, and prime dry-aged Wagyu paired with rare sommelier reserve vintages.",
    image: "assets/images/photo-1550966871-3ed3cdb5ed0c.webp",
  },
  {
    id: 3,
    subtitle: "✦ ELEGANT AMBIENCE & PRIVATE LOUNGE ✦",
    title: "An Unforgettable Dining Tradition",
    tagline: "Create timeless memories under warm crystal chandeliers in an intimate, candlelit luxury dining sanctuary.",
    image: "assets/images/photo-1517248135467-4c7edcad34c4.webp",
  }
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Pan-Seared Chilean Sea Bass', category: 'chefs_special', mealType: 'dinner', price: 1850, description: 'Wild Chilean sea bass with saffron beurre blanc, truffle risotto, braised baby fennel, and crispy leeks.', image: 'assets/images/photo-1519708227418-c8fd9a32b7a2.webp', rating: 5.0, tags: ['Chef Pick', 'Gluten-Free', 'Seafood'], winePairing: '2021 Domaine Leflaive Puligny-Montrachet', calories: 620, prepTime: '25 min', isPopular: true },
  { id: 'm2', name: 'A5 Miyazaki Wagyu Tenderloin', category: 'chefs_special', mealType: 'dinner', price: 3450, description: '4oz Japanese A5 Wagyu served with roasted bone marrow emulsion, smoked fleur de sel, and maitake mushrooms.', image: 'assets/images/photo-1544025162-d76694265947.webp', rating: 5.0, tags: ['A5 Wagyu', 'Chef Pick', 'Signature'], winePairing: '2018 Château Margaux Premier Grand Cru', calories: 780, prepTime: '30 min', isPopular: true },
  { id: 'm3', name: 'Black Winter Truffle Tagliolini', category: 'main', mealType: 'dinner', price: 1250, description: 'Handmade egg pasta tossed in 36-month Parmigiano Reggiano butter cream, finished with freshly shaved Norcia black truffles.', image: 'assets/images/photo-1582993551256-f3e395ab26bd.webp', rating: 4.9, tags: ['Vegetarian', 'Fresh Pasta'], winePairing: '2019 Barolo Cannubi D.O.C.G', calories: 590, prepTime: '20 min', isPopular: true },
  { id: 'm4', name: 'Heritage Duck Breast A L’Orange', category: 'main', mealType: 'dinner', price: 1450, description: 'Pan-roasted Muscovy duck breast, blood orange glaze, caramelized parsnip puree, and pickled blackberries.', image: 'assets/images/photo-1514944288352-fffac99f0bdf.webp', rating: 4.8, tags: ['Gluten-Free', 'Poultry'], winePairing: '2020 Pinot Noir Russian River Valley', calories: 680, prepTime: '25 min' },
  { id: 'm5', name: 'Seared Hokkaido Scallops', category: 'starter', mealType: 'dinner', price: 950, description: 'Jumbo diver scallops with cauliflower velvet, ossetra caviar, micro greens, and lemon-chive oil.', image: 'assets/images/photo-1532550907401-a500c9a57435.webp', rating: 4.9, tags: ['Seafood', 'Gluten-Free', 'Starter'], winePairing: '2022 Sancerre Pascal Jolivet', calories: 340, prepTime: '15 min', isPopular: true },
  { id: 'm6', name: 'Heirloom Burrata & Roasted Fig', category: 'starter', mealType: 'lunch', price: 750, description: 'Pugliese burrata, mission figs, 25-year aged Modena balsamic, toasted pistachio crumble, and grilled sourdough.', image: 'assets/images/photo-1606850246029-dd00bd5eff97.webp', rating: 4.8, tags: ['Vegetarian', 'Organic'], winePairing: '2021 Vermentino di Gallura', calories: 420, prepTime: '12 min' },
  { id: 'm7', name: 'Truffled Brioche French Toast', category: 'starter', mealType: 'breakfast', price: 650, description: 'Artisanal brioche soaked in vanilla bean custard, wild berry compote, Vermont maple syrup, and whipped mascarpone.', image: 'assets/images/photo-1484723091739-30a097e8f929.webp', rating: 4.9, tags: ['Breakfast Special', 'Vegetarian'], calories: 520, prepTime: '15 min' },
  { id: 'm8', name: 'Smoked Salmon Royale Benedict', category: 'main', mealType: 'breakfast', price: 780, description: 'House-cured Scottish salmon, poached organic eggs, yuzu hollandaise, micro watercress on toasted English muffin.', image: 'assets/images/photo-1608039829572-78524f79c4c7.webp', rating: 4.8, tags: ['Organic Eggs', 'Breakfast'], calories: 480, prepTime: '15 min' },
  { id: 'm9', name: 'Signature Valrhona Chocolate Sphere', category: 'dessert', mealType: 'dinner', price: 680, description: 'Dark chocolate dome melted tableside with warm salted caramel espresso poured over hazelnut praline gelato.', image: 'assets/images/photo-1579372786545-d24232daf58c.webp', rating: 5.0, tags: ['Chef Pick', 'Dessert', 'Tableside'], winePairing: '2016 Taylor Fladgate 20-Year Tawny Port', calories: 540, prepTime: '15 min', isPopular: true },
  { id: 'm10', name: 'Tahitian Vanilla Bean Soufflé', category: 'dessert', mealType: 'dinner', price: 580, description: 'Light-as-air baked soufflé infused with real Tahitian vanilla pods, served with Grand Marnier creme anglaise.', image: 'assets/images/photo-1587314168485-3236d6710814.webp', rating: 4.9, tags: ['Signature Dessert'], calories: 380, prepTime: '20 min' },
  { id: 'm11', name: 'Smoked Old Fashioned - 23K Gold', category: 'drinks', mealType: 'cellar', price: 850, description: 'WhistlePig 12yr Rye, Demerara, Angostura bitters, hickory smoke swirl, garnished with edible 23K gold leaf.', image: 'assets/images/photo-1514362545857-3bc16c4c7d1b.webp', rating: 5.0, tags: ['Mixology', '23K Gold'], calories: 190, prepTime: '5 min', isPopular: true },
  { id: 'm12', name: 'Dom Pérignon Vintage Champagne 2013', category: 'drinks', mealType: 'cellar', price: 18500, description: 'Full bottle of iconic vintage champagne with aromas of white flowers, stone fruits, and toasted brioche notes.', image: 'assets/images/photo-1569919659476-f0852f6834b7.webp', rating: 5.0, tags: ['Vintage Champagne', 'Grand Cru'], calories: 620, prepTime: 'Immediate' }
];

const CHEFS = [
  { id: 'c1', name: 'Alexander Vance', title: 'Executive Master Chef', role: 'Culinary Director & Founder', bio: 'Trained under Paul Bocuse in Lyon, Chef Vance brings over 25 years of three-Michelin-star mastery to Stackly.', image: 'assets/images/photo-1577219491135-ce391730fb2c.webp', award: '3 Michelin Stars • James Beard Award 2022', signatureDish: 'A5 Miyazaki Wagyu & Truffle Sphere', socials: { instagram: '#', facebook: '#', twitter: '#' } },
  { id: 'c2', name: 'Elena Rostova', title: 'Head Pastry Chef', role: 'Artisanal Dessert Artist', bio: 'Former chief patissier at Le Meurice Paris, renowned worldwide for molecular chocolate sculptures and souffles.', image: 'assets/images/photo-1595273670150-bd0c3c392e46.webp', award: 'World Pastry Champion 2023', signatureDish: 'Valrhona Melting Gold Sphere', socials: { instagram: '#', facebook: '#' } },
  { id: 'c3', name: 'Marcus Thorne', title: 'Master Sommelier', role: 'Beverage & Cellar Director', bio: 'Curator of our 2,500-label subterranean wine cellar, matching rare vintages with tailored multi-course tasting menus.', image: 'assets/images/photo-1560250097-0b93528c311a.webp', award: 'Advanced Master Sommelier (CMS)', signatureDish: '1982 Vintage Bordeaux Pairing', socials: { instagram: '#', twitter: '#' } },
  { id: 'c4', name: 'Kenji Takahashi', title: 'Sous Chef Specialist', role: 'Seafood & Raw Bar Master', bio: 'Expert in Tsukiji precision knife techniques, sourcing sea bass and Hokkaido sea scallops flown in daily.', image: 'assets/images/photo-1600565193348-f74bd3c7ccdf.webp', award: 'Tokyo Seafood Master 2021', signatureDish: 'Hokkaido Scallops & Caviar', socials: { instagram: '#', facebook: '#' } }
];

const TESTIMONIALS = [
  { id: 't1', author: 'Chef Thomas Keller', role: '3 Michelin Star Chef', publication: 'Michelin Guide Inspector Review', avatar: 'assets/images/photo-1534528741775-53994a69daeb.webp', comment: 'Stackly achieves what few fine dining establishments dare: absolute culinary poetry on every plate. The Chilean Sea Bass with Truffle Risotto is monumental.', rating: 5, date: 'October 2024' },
  { id: 't2', author: 'Eleanor Vance', role: 'Senior Food Critic', publication: 'The New York Times Food & Wine', avatar: 'assets/images/photo-1507003211169-0a1dd7228f2d.webp', comment: 'From the moment you step under the amber chandeliers, you are transported. The sommelier pairings are flawless, and the Wagyu tenderloin is melt-in-your-mouth perfection.', rating: 5, date: 'November 2024' },
  { id: 't3', author: 'Julian Sterling', role: 'Lifestyle & Gourmet Editor', publication: 'Architectural Digest & Epicure', avatar: 'assets/images/photo-1500648767791-00dcc994a43e.webp', comment: 'An architectural masterpiece of lighting, texture, and taste. The Valrhona tableside dessert show is worth flying across continents for.', rating: 5, date: 'December 2024' }
];

const BLOG_POSTS = [
  { id: 'b1', title: 'The Art of Plating: How Our Masters Balance Color & Texture', category: 'Culinary Insights', date: 'Jan 15, 2025', author: 'Chef Alexander Vance', image: 'assets/images/photo-1555396273-367ea4eb4db5.webp', summary: 'Discover the visual geometry and temperature balances that turn a meal into a multisensory gallery piece.', content: `Plating at Stackly is never an afterthought—it is the first movement of a symphony. Before a single morsel touches the palate, the eye feasts upon rhythm, negative space, and height. In this deep dive, Executive Chef Alexander Vance shares how our kitchen utilizes edible flowers, micro-herbs, and temperature-controlled ceramics to elevate every dish into living art.`, readTime: '4 min read' },
  { id: 'b2', title: 'Unlocking Rare Vintages: Inside Our 2,500-Label Subterranean Cellar', category: 'Sommelier Secrets', date: 'Jan 08, 2025', author: 'Marcus Thorne', image: 'assets/images/photo-1510812431401-41d2bd2722f3.webp', summary: 'An exclusive look into temperature-controlled vaults holding 1945 Grand Crus and boutique organic estates.', content: `Beneath the main dining floor lies our temperature-stabilized wine vault resting at precisely 55°F (13°C) with 70% humidity. Here, Master Sommelier Marcus Thorne preserves historical treasures ranging from 1982 Bordeaux classics to small-batch Biodynamic producers in Sonoma and Piedmont.`, readTime: '6 min read' },
  { id: 'b3', title: 'Farm to Table Excellence: Sourcing Organic Black Winter Truffles', category: 'Artisanal Sourcing', date: 'Dec 28, 2024', author: 'Kenji Takahashi', image: 'assets/images/photo-1541544741938-0af808871cc0.webp', summary: 'Trace the 48-hour journey of fresh Norcia black truffles from Umbria oak forests directly to your dinner plate.', content: `Our commitment to purity demands that no ingredient is compromised. Each week during winter truffle season, expert foragers and lagotto romagnolo dogs harvest pristine tubers in the oak forests of Umbria. Within 48 hours, those very truffles are shaved live at your table at Stackly.`, readTime: '5 min read' }
];

const GALLERY_ITEMS = [
  { id: 'g1', title: 'Grand Crystal Dining Hall', category: 'interior', image: 'assets/images/photo-1517248135467-4c7edcad34c4.webp' },
  { id: 'g2', title: 'A5 Miyazaki Wagyu Plating', category: 'dishes', image: 'assets/images/photo-1544025162-d76694265947.webp' },
  { id: 'g3', title: 'Private Sommelier Wine Cellar', category: 'wine_cellar', image: 'assets/images/photo-1510812431401-41d2bd2722f3.webp' },
  { id: 'g4', title: 'Tableside Flambé & Mixology Bar', category: 'events', image: 'assets/images/photo-1514362545857-3bc16c4c7d1b.webp' },
  { id: 'g5', title: 'Pan-Seared Sea Bass Artistry', category: 'dishes', image: 'assets/images/photo-1519708227418-c8fd9a32b7a2.webp' },
  { id: 'g6', title: 'Candlelit Terrace Lounge', category: 'interior', image: 'assets/images/photo-1550966871-3ed3cdb5ed0c.webp' }
];

const SHOP_PRODUCTS = [
  { id: 'shop-1', name: 'Oscietra Royal Caviar (100g Jar)', category: 'pantry', price: 8500, rating: 5.0, reviewsCount: 48, image: 'assets/images/photo-1534422298391-e4f8c172dddb.webp', description: 'Sustainably farmed Caspian Oscietra caviar with golden amber pearls, creamy buttery finish. Shipped in insulated brass tin with mother-of-pearl spoon.', badge: 'Best Seller', inStock: true, tags: ['Caviar', 'Gourmet', 'Delicacy'] },
  { id: 'shop-2', name: 'Château Margaux 2015 Premier Grand Cru', category: 'cellar', price: 45000, rating: 4.9, reviewsCount: 32, image: 'assets/images/photo-1586370434639-0fe43b2d32e6.webp', description: 'Rare vintage 2015 Bordeaux from subterranean Vault 4. Aromas of blackcurrant, violet, truffle, and aged cedar with silken tannins.', badge: 'Vault Reserve', inStock: true, tags: ['Red Wine', 'Bordeaux', 'Vintage'] },
  { id: 'shop-3', name: 'White Alba Truffle Infused EVOO (250ml)', category: 'pantry', price: 2200, rating: 4.8, reviewsCount: 96, image: 'assets/images/photo-1474979266404-7eaacbcd87c5.webp', description: 'First-press Tuscan extra virgin olive oil cold-infused with real Piedmontese white truffle shavings.', badge: 'Chef Choice', inStock: true, tags: ['Truffle Oil', 'Artisanal'] },
  { id: 'shop-4', name: 'Stackly Fine Dining Experience Gift Card', category: 'gifts', price: 5000, rating: 5.0, reviewsCount: 120, image: 'assets/images/photo-1549465220-1a8b9238cd48.webp', description: 'Luxury gold-embossed physical or digital gift card valid for 7-course tasting menus, wine pairings, or private dining events.', badge: 'Popular Gift', inStock: true, tags: ['Gift Card', 'Voucher'] },
  { id: 'shop-5', name: 'Executive Chef Antoine Laurent Cookbook (Signed Edition)', category: 'merch', price: 2500, rating: 4.9, reviewsCount: 64, image: 'assets/images/photo-1544716278-ca5e3f4abd8c.webp', description: 'Hardcover 320-page culinary masterwork featuring 100 signature recipes, photography, and sommelier pairing techniques.', badge: 'Autographed', inStock: true, tags: ['Cookbook', 'Hardcover'] },
  { id: 'shop-6', name: 'Dom Pérignon P2 Vintage Champagne 2004', category: 'cellar', price: 24000, rating: 5.0, reviewsCount: 29, image: 'assets/images/photo-1531821945121-d55c446bd62f.webp', description: 'Plenitude 2 second maturation champagne boasting roasted hazelnut, candied citrus, and toasted brioche notes.', badge: 'Rare Champagne', inStock: true, tags: ['Champagne', 'Sparkling'] },
  { id: 'shop-7', name: 'Artisanal Grand Cru Chocolate Pralines Box (24 Pcs)', category: 'pantry', price: 1800, rating: 4.9, reviewsCount: 88, image: 'assets/images/photo-1548907040-4baa42d10919.webp', description: 'Handcrafted Valrhona single-origin chocolates infused with passionfruit caramel, Tahitian vanilla, and gold leaf.', badge: 'Fresh Daily', inStock: true, tags: ['Chocolate', 'Dessert'] },
  { id: 'shop-8', name: 'Royal Master Sommelier Crystal Wine Glasses (Set of 4)', category: 'merch', price: 4500, rating: 4.8, reviewsCount: 42, image: 'assets/images/photo-1599661194055-63427c8e6e70.webp', description: 'Hand-blown mouth-crafted lead-free crystal stems tailored for Bordeaux and Burgundy aromatics.', badge: 'Luxury Crystal', inStock: true, tags: ['Glassware', 'Crystal'] }
];

const MOCK_RESERVATIONS = [
  { id: 'res-101', name: 'Dhamu Kumar', email: 'dhamu1899@gmail.com', phone: '+91 98765 43210', guests: 4, date: '2026-08-05', time: '20:00', seatingArea: 'terrace', specialRequests: 'Anniversary table with candlelight near Salem city view.', confirmationCode: 'STK-842910', status: 'Confirmed', userId: 'c-1' },
  { id: 'res-102', name: 'Priya Sundaram', email: 'priya.s@gmail.com', phone: '+91 98421 11223', guests: 2, date: '2026-08-06', time: '19:30', seatingArea: 'chefs_table', specialRequests: 'Chef Tasting menu preference.', confirmationCode: 'STK-912384', status: 'Confirmed', userId: 'c-2' },
  { id: 'res-103', name: 'Ramesh Krishnan', email: 'ramesh.k@yahoo.com', phone: '+91 99402 33445', guests: 6, date: '2026-08-07', time: '21:00', seatingArea: 'lounge', specialRequests: 'VIP lounge seating for business dinner.', confirmationCode: 'STK-381920', status: 'Pending', userId: 'c-3' }
];

const MOCK_ORDERS = [
  { id: 'ORD-7712', userId: 'c-1', userName: 'Dhamu Kumar', items: [ { menuItem: MENU_ITEMS[0], quantity: 2 }, { menuItem: MENU_ITEMS[8], quantity: 1 } ], totalAmount: 138.00, status: 'Delivered', date: '2026-07-28', deliveryAddress: '124 Fairlands Main Rd, Salem', paymentMethod: 'UPI / Credit Card' },
  { id: 'ORD-7718', userId: 'c-1', userName: 'Dhamu Kumar', items: [ { menuItem: MENU_ITEMS[1], quantity: 1 }, { menuItem: MENU_ITEMS[10], quantity: 2 } ], totalAmount: 166.00, status: 'Preparing', date: '2026-07-30', deliveryAddress: '54 Hasthampatti Green Avenue, Salem', paymentMethod: 'Online Payment' }
];
