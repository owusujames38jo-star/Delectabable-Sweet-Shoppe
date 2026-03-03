const img = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`

export const productCategories = [
  { id: 'cakes', label: 'Cakes' },
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'treats', label: 'Sweet Treats' },
  { id: 'weddings', label: 'Wedding' },
  { id: 'corporate', label: 'Corporate' },
]

export const products = [
  {
    id: 'sig-vanilla-berry',
    slug: 'signature-vanilla-berry-cake',
    category: 'cakes',
    name: 'Signature Vanilla Berry Cake',
    short: 'Vanilla bean sponge, berry compote, silky buttercream.',
    description:
      'A crowd favorite with vanilla bean layers, house berry compote, and a smooth buttercream finish. Available for pickup (MI) or delivered locally.',
    priceCents: 8500,
    image: img('photo-1542826438-bd32f43d626f'),
    tags: ['best-seller', 'classic'],
    variants: [
      { id: '6in', label: '6" (serves ~10)', priceCents: 8500 },
      { id: '8in', label: '8" (serves ~16)', priceCents: 12500 },
      { id: '10in', label: '10" (serves ~24)', priceCents: 16500 },
    ],
  },
  {
    id: 'choc-ganache-drip',
    slug: 'chocolate-ganache-drip-cake',
    category: 'cakes',
    name: 'Chocolate Ganache Drip Cake',
    short: 'Deep cocoa layers, chocolate ganache, luxe drip.',
    description:
      'Rich, moist chocolate cake with a glossy ganache drip and optional toppings. Perfect for birthdays and celebrations.',
    priceCents: 9500,
    image: img('photo-1607252650355-f7fd0460ccdb'),
    tags: ['popular'],
    variants: [
      { id: '6in', label: '6" (serves ~10)', priceCents: 9500 },
      { id: '8in', label: '8" (serves ~16)', priceCents: 13500 },
      { id: '10in', label: '10" (serves ~24)', priceCents: 17500 },
    ],
  },
  {
    id: 'red-velvet',
    slug: 'red-velvet-cake',
    category: 'cakes',
    name: 'Red Velvet Cake',
    short: 'Velvety layers, cream cheese frosting.',
    description:
      'A classic red velvet with tangy cream cheese frosting and a soft crumb. Great for anniversaries and special events.',
    priceCents: 9800,
    image: img('photo-1607958996333-41aef7caefaa'),
    tags: ['classic'],
    variants: [
      { id: '6in', label: '6" (serves ~10)', priceCents: 9800 },
      { id: '8in', label: '8" (serves ~16)', priceCents: 13800 },
      { id: '10in', label: '10" (serves ~24)', priceCents: 17800 },
    ],
  },
  {
    id: 'cupcake-box',
    slug: 'assorted-cupcake-box',
    category: 'cupcakes',
    name: 'Assorted Cupcake Box (12)',
    short: 'Seasonal assortment with custom color options.',
    description:
      'A dozen cupcakes in a rotating seasonal assortment. Customize colors for your theme. Great for offices, showers, and parties.',
    priceCents: 4800,
    image: img('photo-1486428261073-c5761e38d036'),
    tags: ['party'],
    variants: [
      { id: 'standard', label: 'Standard (12)', priceCents: 4800 },
      { id: 'deluxe', label: 'Deluxe (12 + fillings)', priceCents: 6200 },
    ],
  },
  {
    id: 'treat-box',
    slug: 'sweet-treat-box',
    category: 'treats',
    name: 'Sweet Treat Box',
    short: 'Brownies, bars, and bite-sized treats.',
    description:
      'A curated box of sweet treats for gifting or events. Great for dessert tables and corporate gifting.',
    priceCents: 5200,
    image: img('photo-1607082349566-1870b42f7f2f'),
    tags: ['gift'],
    variants: [
      { id: 'small', label: 'Small (12 pieces)', priceCents: 5200 },
      { id: 'large', label: 'Large (24 pieces)', priceCents: 9400 },
    ],
  },
  {
    id: 'wedding-tasting',
    slug: 'wedding-tasting-box',
    category: 'weddings',
    name: 'Wedding Tasting Box',
    short: 'Sample flavors before your big day.',
    description:
      'A tasting box designed for couples. Includes multiple cake flavors, fillings, and frosting options so you can choose with confidence.',
    priceCents: 6500,
    image: img('photo-1521886657668-1e8d9f7b9621'),
    tags: ['wedding'],
    variants: [{ id: 'box', label: 'Tasting Box', priceCents: 6500 }],
  },
  {
    id: 'corporate-dessert',
    slug: 'corporate-dessert-catering',
    category: 'corporate',
    name: 'Corporate Dessert Catering',
    short: 'Dessert trays for meetings and events.',
    description:
      'A catering-style selection designed for offices and brand events. Final pricing varies by guest count and menu. Submit an inquiry to get a quote.',
    priceCents: 15000,
    image: img('photo-1551024709-8f23befc6f87'),
    tags: ['corporate'],
    variants: [
      { id: 'small', label: 'Up to 25 guests', priceCents: 15000 },
      { id: 'medium', label: 'Up to 50 guests', priceCents: 26000 },
      { id: 'large', label: 'Up to 100 guests', priceCents: 46000 },
    ],
  },
]

export function formatMoney(cents, currency = 'USD') {
  const dollars = cents / 100
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    dollars
  )
}

export function findProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null
}

