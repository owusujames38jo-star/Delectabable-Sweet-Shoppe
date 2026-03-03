import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../state/cart.jsx'
import { formatMoney } from '../data/products.js'
import { createMockPayProvider, createStripeReadyProvider } from '../payments/providers.js'

const schema = z.object({
  firstName: z.string().min(2, 'Enter your first name.'),
  lastName: z.string().min(2, 'Enter your last name.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().min(7, 'Enter a valid phone.'),
  address1: z.string().min(4, 'Enter your address.'),
  address2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(4),
  country: z.string().min(2),
  fulfillment: z.enum(['pickup', 'delivery', 'travel-baker']),
  eventDate: z.string().optional(),
  promoCode: z.string().optional(),
  paySchedule: z.enum(['full', 'deposit']),
  paymentProvider: z.enum(['mockpay', 'stripe']),
})

function estimateTaxCents(subtotalCents, state) {
  // Simple estimate: use 6% for Michigan, 0% for unknown.
  const rate = state?.toUpperCase() === 'MI' ? 0.06 : 0.04
  return Math.round(subtotalCents * rate)
}

function estimateFulfillmentFeeCents({ fulfillment, country }) {
  if (fulfillment === 'pickup') return 0
  if (fulfillment === 'delivery') return 1500
  if (fulfillment === 'travel-baker') {
    const isUS = (country ?? '').toUpperCase().includes('US') || (country ?? '').toUpperCase() === 'USA'
    return isUS ? 25000 : 45000
  }
  return 0
}

export function CheckoutPage() {
  const nav = useNavigate()
  const { items, subtotalCents, clear } = useCart()
  const [error, setError] = useState(null)
  const [isPaying, setIsPaying] = useState(false)

  const providers = useMemo(() => [createMockPayProvider(), createStripeReadyProvider()], [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      country: 'USA',
      state: 'MI',
      fulfillment: 'pickup',
      paySchedule: 'full',
      paymentProvider: 'mockpay',
    },
  })

  const fulfillment = watch('fulfillment')
  const state = watch('state')
  const country = watch('country')
  const providerId = watch('paymentProvider')
  const promoCode = (watch('promoCode') ?? '').trim().toUpperCase()
  const paySchedule = watch('paySchedule')

  const subtotal = subtotalCents()
  const tax = estimateTaxCents(subtotal, state)
  const fee = estimateFulfillmentFeeCents({ fulfillment, country })

  const discount = useMemo(() => {
    if (!promoCode) return 0
    if (promoCode === 'DIVINE10') return Math.round(subtotal * 0.1)
    if (promoCode === 'MICHIGAN5' && (state ?? '').toUpperCase() === 'MI') return Math.round(subtotal * 0.05)
    return 0
  }, [promoCode, subtotal, state])

  const total = Math.max(0, subtotal + tax + fee - discount)
  const depositCents = useMemo(() => {
    if (fulfillment !== 'travel-baker') return 0
    return Math.max(0, Math.round(total * 0.3))
  }, [fulfillment, total])
  const payNow = useMemo(() => {
    if (fulfillment === 'travel-baker' && paySchedule === 'deposit') {
      return depositCents
    }
    return total
  }, [depositCents, fulfillment, paySchedule, total])
  const remaining = Math.max(0, total - payNow)

  const onSubmit = async (billing) => {
    setError(null)
    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }

    const provider = providers.find((p) => p.id === providerId)
    if (!provider) {
      setError('Payment provider unavailable.')
      return
    }

    setIsPaying(true)
    try {
      const result = await provider.confirmPayment({
        amountCents: payNow,
        billing,
        items,
        meta: {
          subtotal,
          tax,
          fee,
          discount,
          fulfillment,
          state,
          country,
          promoCode,
          paySchedule,
          totalCents: total,
          payNowCents: payNow,
          remainingCents: remaining,
        },
      })

      if (!result.ok) {
        setError(result.error ?? 'Payment failed.')
        return
      }

      sessionStorage.setItem('ddst_last_receipt', JSON.stringify(result))
      try {
        const raw = localStorage.getItem('ddst_order_history_v1')
        const prev = raw ? JSON.parse(raw) : []
        const next = Array.isArray(prev) ? [result, ...prev].slice(0, 20) : [result]
        localStorage.setItem('ddst_order_history_v1', JSON.stringify(next))
      } catch {
        // ignore storage failures
      }
      clear()
      nav('/checkout/success', { replace: true })
    } catch (e) {
      setError(e?.message ?? 'Payment failed.')
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Checkout
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Secure checkout
          </h1>
          <p className="mt-2 text-base text-zinc-700">
            For real card charging, connect Stripe with a small server step. For now,
            the demo uses MockPay so you can see the full flow.
          </p>
        </div>
        <Link className="btn-ghost" to="/cart">
          Back to cart
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,380px]">
        <form className="card p-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-base font-extrabold">Billing &amp; fulfillment</div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="firstName">
                First name
              </label>
              <input id="firstName" className="input mt-2" {...register('firstName')} />
              {errors.firstName ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.firstName.message}</div>
              ) : null}
            </div>
            <div>
              <label className="label" htmlFor="lastName">
                Last name
              </label>
              <input id="lastName" className="input mt-2" {...register('lastName')} />
              {errors.lastName ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.lastName.message}</div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input id="email" className="input mt-2" {...register('email')} />
              {errors.email ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.email.message}</div>
              ) : null}
            </div>
            <div>
              <label className="label" htmlFor="phone">
                Phone
              </label>
              <input id="phone" className="input mt-2" {...register('phone')} />
              {errors.phone ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.phone.message}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="address1">
              Address
            </label>
            <input id="address1" className="input mt-2" {...register('address1')} />
            {errors.address1 ? (
              <div className="mt-1 text-sm font-semibold text-red-600">{errors.address1.message}</div>
            ) : null}
          </div>

          <div>
            <label className="label" htmlFor="address2">
              Apt/Suite (optional)
            </label>
            <input id="address2" className="input mt-2" {...register('address2')} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="city">
                City
              </label>
              <input id="city" className="input mt-2" {...register('city')} />
              {errors.city ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.city.message}</div>
              ) : null}
            </div>
            <div>
              <label className="label" htmlFor="state">
                State/Region
              </label>
              <input id="state" className="input mt-2" {...register('state')} />
              {errors.state ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.state.message}</div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="zip">
                ZIP/Postal code
              </label>
              <input id="zip" className="input mt-2" {...register('zip')} />
              {errors.zip ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.zip.message}</div>
              ) : null}
            </div>
            <div>
              <label className="label" htmlFor="country">
                Country
              </label>
              <input id="country" className="input mt-2" {...register('country')} />
              {errors.country ? (
                <div className="mt-1 text-sm font-semibold text-red-600">{errors.country.message}</div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="label">Fulfillment</div>
            <label className="flex items-start gap-3">
              <input type="radio" value="pickup" {...register('fulfillment')} className="mt-1" />
              <div>
                <div className="text-sm font-semibold">Pickup (Michigan)</div>
                <div className="text-sm text-zinc-600">Fastest option.</div>
              </div>
            </label>
            <label className="flex items-start gap-3">
              <input type="radio" value="delivery" {...register('fulfillment')} className="mt-1" />
              <div>
                <div className="text-sm font-semibold">Local delivery</div>
                <div className="text-sm text-zinc-600">Fee estimated at checkout.</div>
              </div>
            </label>
            <label className="flex items-start gap-3">
              <input type="radio" value="travel-baker" {...register('fulfillment')} className="mt-1" />
              <div>
                <div className="text-sm font-semibold">Travel baker (on-site)</div>
                <div className="text-sm text-zinc-600">
                  Hire the baker to travel and bake for your event (fees apply).
                </div>
              </div>
            </label>
          </div>

          {fulfillment === 'travel-baker' ? (
            <div>
              <label className="label" htmlFor="eventDate">
                Event date (recommended)
              </label>
              <input id="eventDate" type="date" className="input mt-2" {...register('eventDate')} />
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="promoCode">
                Promo code (optional)
              </label>
              <input id="promoCode" className="input mt-2" placeholder="DIVINE10" {...register('promoCode')} />
              <div className="mt-1 text-xs text-zinc-600">
                Try <span className="font-semibold">DIVINE10</span> or{' '}
                <span className="font-semibold">MICHIGAN5</span>.
              </div>
            </div>
            <div>
              <label className="label" htmlFor="paymentProvider">
                Payment method
              </label>
              <select id="paymentProvider" className="input mt-2" {...register('paymentProvider')}>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {fulfillment === 'travel-baker' ? (
            <div className="card border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-extrabold">Payment schedule</div>
              <div className="muted mt-1">
                For travel events, deposits are common. Choose what you’d like to pay now.
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <label className="card cursor-pointer border-zinc-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <input type="radio" value="full" {...register('paySchedule')} className="mt-1" />
                    <div>
                      <div className="text-sm font-extrabold">Pay in full</div>
                      <div className="text-sm text-zinc-600">Pay {formatMoney(total)} today.</div>
                    </div>
                  </div>
                </label>
                <label className="card cursor-pointer border-zinc-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <input type="radio" value="deposit" {...register('paySchedule')} className="mt-1" />
                    <div>
                      <div className="text-sm font-extrabold">Pay deposit (30%)</div>
                      <div className="text-sm text-zinc-600">
                        Pay {formatMoney(depositCents)} now, remaining {formatMoney(remaining)} later.
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <button className="btn-primary" type="submit" disabled={isPaying}>
            {isPaying ? 'Processing…' : `Pay ${formatMoney(payNow)}`}
          </button>
        </form>

        <aside className="card p-6 h-fit">
          <div className="text-base font-extrabold">Order summary</div>
          <div className="mt-3 grid gap-3 text-sm text-zinc-700">
            {items.length === 0 ? (
              <div className="muted">No items in cart.</div>
            ) : (
              items.map((x) => (
                <div key={x.key} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-zinc-900">
                      {x.qty}× {x.name}
                    </div>
                    {x.variantLabel ? <div className="text-xs text-zinc-600">{x.variantLabel}</div> : null}
                  </div>
                  <div className="font-semibold">{formatMoney(x.priceCents * x.qty)}</div>
                </div>
              ))
            )}

            <div className="h-px bg-zinc-200" />

            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Est. tax</span>
              <span className="font-semibold">{formatMoney(tax)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Fulfillment fee</span>
              <span className="font-semibold">{formatMoney(fee)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex items-center justify-between text-brand-700">
                <span>Discount</span>
                <span className="font-extrabold">−{formatMoney(discount)}</span>
              </div>
            ) : null}

            <div className="h-px bg-zinc-200" />
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-zinc-900">Total</span>
              <span className="text-base font-black">{formatMoney(total)}</span>
            </div>
            {remaining > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700">Pay now</span>
                <span className="text-sm font-extrabold text-zinc-900">{formatMoney(payNow)}</span>
              </div>
            ) : null}
            {remaining > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700">Remaining</span>
                <span className="text-sm font-extrabold text-zinc-900">{formatMoney(remaining)}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-5 rounded-2xl bg-brand-50 p-4 text-sm text-zinc-700">
            <div className="font-extrabold text-zinc-900">Travel baker note</div>
            <div className="mt-1">
              Selecting <span className="font-semibold">Travel baker</span> adds an estimated logistics fee. Final
              travel pricing is confirmed with your event timeline and location.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

