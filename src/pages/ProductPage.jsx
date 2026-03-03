import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findProductBySlug, formatMoney } from '../data/products.js'
import { useCart } from '../state/cart.jsx'

export function ProductPage() {
  const { slug } = useParams()
  const product = useMemo(() => findProductBySlug(slug), [slug])
  const { addItem } = useCart()

  const variants = product?.variants ?? []
  const [variantId, setVariantId] = useState(variants[0]?.id ?? null)
  const activeVariant = variants.find((v) => v.id === variantId) ?? variants[0]
  const priceCents = activeVariant?.priceCents ?? product?.priceCents ?? 0

  if (!product) {
    return (
      <div className="container-page py-12">
        <div className="card p-6">
          <div className="text-base font-extrabold">Product not found</div>
          <div className="muted mt-1">This item may have moved.</div>
          <Link className="btn-primary mt-4" to="/shop">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-zinc-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <Link className="muted hover:underline" to="/shop">
            ← Back to shop
          </Link>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base text-zinc-700">{product.description}</p>

          <div className="mt-6 card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold">Price</div>
                <div className="muted mt-1">
                  Final price may vary for customizations and travel services.
                </div>
              </div>
              <div className="text-lg font-black">{formatMoney(priceCents)}</div>
            </div>

            {variants.length > 1 ? (
              <div className="mt-5">
                <div className="label">Size / option</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={variantId === v.id ? 'btn-primary' : 'btn-ghost'}
                      onClick={() => setVariantId(v.id)}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  addItem(product, 1, {
                    variantId: activeVariant?.id ?? null,
                    variantLabel: activeVariant?.label ?? null,
                  })
                }
              >
                Add to cart
              </button>
              <Link className="btn-secondary" to="/checkout">
                Checkout
              </Link>
              <Link className="btn-ghost" to="/custom-orders">
                Customize / request quote
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="card p-5">
              <div className="text-sm font-extrabold">Allergens</div>
              <div className="muted mt-1">
                Some items may contain dairy, eggs, wheat, nuts. Please ask for
                allergen details.
              </div>
            </div>
            <div className="card p-5">
              <div className="text-sm font-extrabold">Travel baker option</div>
              <div className="muted mt-1">
                Want on-site baking and setup? Perfect for destination events.
              </div>
              <Link className="btn-primary mt-3 w-full" to="/travel-baker">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

