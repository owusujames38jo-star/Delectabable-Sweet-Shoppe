import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { formatMoney } from '../data/products.js'

export function CheckoutSuccessPage() {
  const receipt = useMemo(() => {
    const raw = sessionStorage.getItem('ddst_last_receipt')
    try {
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  return (
    <div className="container-page py-12">
      <div className="card p-8">
        <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
          Success
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Payment received
        </h1>
        <p className="mt-2 text-base text-zinc-700">
          Thank you for your order. We’ll follow up with confirmation and next
          steps.
        </p>

        {receipt ? (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-extrabold">Receipt</div>
            <div className="mt-2 grid gap-1 text-sm text-zinc-700">
              <div>
                <span className="font-semibold text-zinc-900">Receipt ID:</span>{' '}
                {receipt.receiptId}
              </div>
              <div>
                <span className="font-semibold text-zinc-900">Amount:</span>{' '}
                {formatMoney(receipt.amountCents ?? 0)}
              </div>
              <div>
                <span className="font-semibold text-zinc-900">Status:</span>{' '}
                {receipt.status ?? 'paid'}
              </div>
              {receipt?.meta?.remainingCents ? (
                <div>
                  <span className="font-semibold text-zinc-900">
                    Remaining (travel schedule):
                  </span>{' '}
                  {formatMoney(receipt.meta.remainingCents)}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2">
          <Link className="btn-primary" to="/shop">
            Continue shopping
          </Link>
          <Link className="btn-ghost" to="/custom-orders">
            Request a custom quote
          </Link>
          <Link className="btn-secondary" to="/travel-baker">
            Travel baker details
          </Link>
        </div>
      </div>
    </div>
  )
}

