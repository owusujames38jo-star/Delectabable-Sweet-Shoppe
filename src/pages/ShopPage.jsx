import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { productCategories, products, formatMoney } from '../data/products.js'
import { useCart } from '../state/cart.jsx'

function ProductGridCard({ p }) {
  const { addItem } = useCart()
  const v = p.variants?.[0]
  return (
    <div className="card overflow-hidden">
      <Link to={`/shop/${p.slug}`} className="block">
        <div className="aspect-[4/3] bg-zinc-100">
          <img
            alt={p.name}
            src={p.image}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/shop/${p.slug}`}
              className="text-base font-extrabold hover:underline"
            >
              {p.name}
            </Link>
            <div className="muted mt-1">{p.short}</div>
          </div>
          <div className="text-sm font-extrabold">
            {formatMoney(v?.priceCents ?? p.priceCents)}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              addItem(p, 1, {
                variantId: v?.id ?? null,
                variantLabel: v?.label ?? null,
              })
            }
          >
            Add to cart
          </button>
          <Link className="btn-ghost" to={`/shop/${p.slug}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ShopPage() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [category, query])

  return (
    <div className="container-page py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Shop / Menu
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Cakes, cupcakes &amp; treats
          </h1>
          <p className="mt-2 text-base text-zinc-700">
            Order favorites or request something custom. Travel baking available
            for events.
          </p>
        </div>
        <Link className="btn-secondary" to="/custom-orders">
          Custom order inquiry
        </Link>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-[1fr,220px]">
        <div className="card p-4">
          <label className="label" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            className="input mt-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes, cupcakes, wedding..."
          />
        </div>
        <div className="card p-4">
          <div className="label">Category</div>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              className={category === 'all' ? 'btn-primary' : 'btn-ghost'}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {productCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={category === c.id ? 'btn-primary' : 'btn-ghost'}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductGridCard key={p.id} p={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 card p-6 text-center">
          <div className="text-base font-extrabold">No matches found</div>
          <div className="muted mt-1">
            Try a different keyword or category.
          </div>
        </div>
      ) : null}
    </div>
  )
}

