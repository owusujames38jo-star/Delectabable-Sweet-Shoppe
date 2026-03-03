import { Link } from 'react-router-dom'
import { useCart } from '../state/cart.jsx'
import { formatMoney } from '../data/products.js'

export function CartPage() {
  const { items, setQty, removeItem, subtotalCents, clear } = useCart()
  const subtotal = subtotalCents()

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Cart
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Your cart
          </h1>
          <p className="mt-2 text-base text-zinc-700">
            Ready for checkout, or need a custom quote for travel/service?
          </p>
        </div>
        {items.length ? (
          <button className="btn-ghost" type="button" onClick={clear}>
            Clear
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 card p-6">
          <div className="text-base font-extrabold">Your cart is empty</div>
          <div className="muted mt-1">
            Browse the menu and add your favorites.
          </div>
          <Link className="btn-primary mt-4" to="/shop">
            Go to shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,360px]">
          <div className="grid gap-4">
            {items.map((x) => (
              <div key={x.key} className="card p-4">
                <div className="flex gap-4">
                  <div className="h-20 w-24 overflow-hidden rounded-xl bg-zinc-100">
                    {x.image ? (
                      <img
                        alt=""
                        src={x.image}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-extrabold">{x.name}</div>
                        {x.variantLabel ? (
                          <div className="muted mt-1">{x.variantLabel}</div>
                        ) : null}
                      </div>
                      <div className="text-sm font-extrabold">
                        {formatMoney(x.priceCents * x.qty)}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <label className="text-sm font-semibold text-zinc-700">
                        Qty
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={x.qty}
                        onChange={(e) => setQty(x.key, e.target.value)}
                        className="input h-10 w-24"
                      />
                      <button
                        className="btn-ghost"
                        type="button"
                        onClick={() => removeItem(x.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="card p-6 h-fit">
            <div className="text-base font-extrabold">Order summary</div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-extrabold text-zinc-900">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated taxes</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery / travel</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-5 grid gap-2">
              <Link className="btn-primary w-full" to="/checkout">
                Go to checkout
              </Link>
              <Link className="btn-ghost w-full" to="/custom-orders">
                Need a custom / travel quote?
              </Link>
              <Link className="btn-ghost w-full" to="/shop">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

