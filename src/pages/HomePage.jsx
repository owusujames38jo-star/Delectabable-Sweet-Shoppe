import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { products, formatMoney } from '../data/products.js'
import { useCart } from '../state/cart.jsx'

const heroSlides = [
  {
    title: 'Custom cakes, crafted with love',
    subtitle:
      'Signature designs and flavors for weddings, birthdays, and celebrations.',
    cta: { label: 'Browse the menu', to: '/shop' },
    image: 'https://picsum.photos/seed/hero-1/1600/900',
  },
  {
    title: 'Travel-ready baker for your event',
    subtitle:
      'Michigan-based, available across the USA and worldwide with advance planning.',
    cta: { label: 'Travel service details', to: '/travel-baker' },
    image: 'https://picsum.photos/seed/hero-2/1600/900',
  },
  {
    title: 'Dessert tables & sweet treats',
    subtitle:
      'Cupcakes, treat boxes, and catering for parties and corporate events.',
    cta: { label: 'Request a quote', to: '/custom-orders' },
    image: 'https://picsum.photos/seed/hero-3/1600/900',
  },
]

const testimonials = [
  {
    name: 'Alyssa R.',
    note: 'The cake was stunning and tasted even better. Smooth process from quote to pickup.',
  },
  {
    name: 'Jordan M.',
    note: 'Dessert table for our event was flawless. Professional setup and beautiful presentation.',
  },
  {
    name: 'Kendra S.',
    note: 'We booked the travel baker option for a destination weekend—fresh, on-time, and truly premium.',
  },
  {
    name: 'Marcus T.',
    note: 'Corporate order was easy. Clear pricing, fast communication, and everyone loved the treats.',
  },
]

function SectionTitle({ kicker, title, children }) {
  return (
    <div className="flex flex-col gap-2">
      {kicker ? (
        <div className="text-xs font-extrabold uppercase tracking-wider text-brand-700">
          {kicker}
        </div>
      ) : null}
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children ? <p className="muted max-w-2xl">{children}</p> : null}
    </div>
  )
}

function ProductCard({ p }) {
  const { addItem } = useCart()
  const baseVariant = p.variants?.[0]

  return (
    <div className="card overflow-hidden">
      <div className="aspect-[4/3] bg-zinc-100">
        <img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-extrabold">{p.name}</div>
            <div className="muted mt-1">{p.short}</div>
          </div>
          <div className="text-sm font-extrabold text-zinc-900">
            {formatMoney(baseVariant?.priceCents ?? p.priceCents)}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link className="btn-ghost" to={`/shop/${p.slug}`}>
            View
          </Link>
          <button
            className="btn-primary"
            type="button"
            onClick={() =>
              addItem(p, 1, {
                variantId: baseVariant?.id ?? null,
                variantLabel: baseVariant?.label ?? null,
              })
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const featured = products.slice(0, 4)

  return (
    <div>
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[70dvh] min-h-[520px]"
        >
          {heroSlides.map((s) => (
            <SwiperSlide key={s.title}>
              <div className="relative h-full">
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />
                <div className="container-page relative flex h-full items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700">
                      Michigan-based • Travel available
                    </div>
                    <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                      {s.title}
                    </h1>
                    <p className="mt-3 text-base text-zinc-700 sm:text-lg">
                      {s.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link className="btn-primary" to={s.cta.to}>
                        {s.cta.label}
                      </Link>
                      <Link className="btn-ghost" to="/contact">
                        Contact
                      </Link>
                    </div>
                    <div className="mt-6 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3">
                      <div className="card p-3">
                        <div className="text-sm font-extrabold">Custom</div>
                        <div className="muted">Design + flavor matching</div>
                      </div>
                      <div className="card p-3">
                        <div className="text-sm font-extrabold">On-time</div>
                        <div className="muted">Event-ready timelines</div>
                      </div>
                      <div className="card p-3 sm:col-span-1 col-span-2">
                        <div className="text-sm font-extrabold">Travel</div>
                        <div className="muted">USA + worldwide (planned)</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="container-page py-14">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <SectionTitle
            kicker="Divine Delectable"
            title="Cakes and sweet treats that make people stop and smile"
          >
            A modern bakery experience with premium ingredients, clean design,
            and world-class service. Available for local orders and destination
            events.
          </SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="card p-5">
              <div className="text-sm font-extrabold">Travel-ready baker</div>
              <p className="muted mt-1">
                Hire the baker to travel and bake for your event. Perfect for
                weddings and VIP celebrations.
              </p>
              <Link className="btn-primary mt-4 w-full" to="/travel-baker">
                See how it works
              </Link>
            </div>
            <div className="card p-5">
              <div className="text-sm font-extrabold">Custom orders</div>
              <p className="muted mt-1">
                Share your theme, date, and location. Get a quote with
                professional pricing logic and clear timelines.
              </p>
              <Link className="btn-secondary mt-4 w-full" to="/custom-orders">
                Start an inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="container-page py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle kicker="Featured" title="Popular picks" />
            <Link className="btn-ghost hidden sm:inline-flex" to="/shop">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link className="btn-ghost w-full" to="/shop">
              View all products
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionTitle kicker="Trust" title="How booking works">
          Clear steps, easy communication, and pro-grade checkout once your
          order is confirmed.
        </SectionTitle>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: '1) Choose',
              body: 'Pick a menu item or request a custom design. Add event details.',
            },
            {
              title: '2) Confirm',
              body: 'We confirm timing, travel needs, allergens, and final pricing.',
            },
            {
              title: '3) Pay',
              body: 'Secure checkout with receipts, taxes/fees, and status updates.',
            },
          ].map((x) => (
            <div key={x.title} className="card p-5">
              <div className="text-base font-extrabold">{x.title}</div>
              <div className="muted mt-1">{x.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="container-page py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle kicker="Reviews" title="Loved by clients" />
            <Link className="btn-ghost hidden sm:inline-flex" to="/contact">
              Book yours
            </Link>
          </div>

          <div className="mt-8 card overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="h-full"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="p-8 sm:p-10">
                    <div className="text-5xl font-black text-brand-500 leading-none">
                      “
                    </div>
                    <div className="mt-3 text-lg font-semibold text-zinc-900">
                      {t.note}
                    </div>
                    <div className="mt-4 text-sm font-extrabold text-zinc-700">
                      — {t.name}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link className="btn-primary" to="/custom-orders">
                        Request a quote
                      </Link>
                      <Link className="btn-ghost" to="/travel-baker">
                        Travel baker
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  )
}

