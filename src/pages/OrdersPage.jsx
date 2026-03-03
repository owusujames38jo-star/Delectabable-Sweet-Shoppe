import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { formatMoney } from '../data/products.js'

export function OrdersPage() {
  const orders = useMemo(() => {
    try {
      const raw = localStorage.getItem('ddst_order_history_v1')
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }, [])

  return (
    <div className="container-page py-12">
      <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
        Orders
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        Order history (demo)
      </h1>
      <p className="mt-2 text-base text-zinc-700">
        This stores the last few receipts in your browser for demo purposes.
      </p>

      {orders.length === 0 ? (
        <div className="mt-8 card p-6">
          <div className="text-base font-extrabold">No orders yet</div>
          <div className="muted mt-1">Complete a checkout to see receipts here.</div>
          <Link className="btn-primary mt-4" to="/shop">
            Shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {orders.map((o) => (
            <div key={o.receiptId} className="card p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-extrabold">Receipt {o.receiptId}</div>
                  <div className="muted mt-1">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}
                  </div>
                  <div className="mt-2 text-sm text-zinc-700">
                    Status:{' '}
                    <span className="font-semibold text-zinc-900">
                      {o.status ?? 'paid'}
                    </span>
                  </div>
                </div>
                <div className="text-lg font-black">
                  {formatMoney(o.amountCents ?? 0)}
                </div>
              </div>
              {o?.meta?.remainingCents ? (
                <div className="mt-3 text-sm text-zinc-700">
                  Remaining:{' '}
                  <span className="font-extrabold text-zinc-900">
                    {formatMoney(o.meta.remainingCents)}
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

