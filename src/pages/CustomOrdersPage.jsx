import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatMoney } from '../data/products.js'
import { BUSINESS } from '../config/business.js'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  eventType: z.string().min(2),
  eventDate: z.string().min(1, 'Please choose a date (or estimate).'),
  location: z.string().min(2),
  guests: z.coerce.number().int().min(1).max(2000),
  travelBaker: z.boolean().optional(),
  budget: z.coerce.number().int().min(50).max(50000),
  notes: z.string().min(10),
})

function estimateQuoteCents({ guests, travelBaker, budget }) {
  const base = Math.max(9000, guests * 700)
  const travel = travelBaker ? 25000 : 0
  const convenience = Math.round(base * 0.05)
  const estimated = base + travel + convenience
  const budgetCents = budget * 100
  return Math.min(Math.max(estimated, 5000), Math.max(budgetCents, estimated))
}

export function CustomOrdersPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: 50,
      budget: 350,
      travelBaker: false,
      eventType: 'Birthday',
    },
  })

  const values = watch()

  const estimate = useMemo(() => {
    const guests = Number(values.guests || 0)
    const budget = Number(values.budget || 0)
    const travelBaker = Boolean(values.travelBaker)
    if (!Number.isFinite(guests) || !Number.isFinite(budget)) return 0
    return estimateQuoteCents({ guests, travelBaker, budget })
  }, [values.guests, values.budget, values.travelBaker])

  const onSubmit = async (v) => {
    const to = BUSINESS.email
    const subject = encodeURIComponent(
      `Custom Order Inquiry — ${v.eventType} (${v.location})${v.travelBaker ? ' [Travel Baker]' : ''}`
    )
    const body = encodeURIComponent(
      [
        `Name: ${v.name}`,
        `Email: ${v.email}`,
        `Event type: ${v.eventType}`,
        `Event date: ${v.eventDate}`,
        `Location: ${v.location}`,
        `Guests: ${v.guests}`,
        `Travel baker: ${v.travelBaker ? 'Yes' : 'No'}`,
        `Budget: $${v.budget}`,
        `Estimated quote (rough): ${formatMoney(estimate)}`,
        '',
        v.notes,
      ].join('\n')
    )
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Custom Orders
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Request a custom quote
          </h1>
          <p className="mt-2 text-base text-zinc-700">
            Tell us your event details. If you want the baker to travel and bake
            on-site, select Travel Baker — we’ll quote logistics clearly.
          </p>

          <form className="mt-8 card p-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input id="name" className="input mt-2" {...register('name')} />
                {errors.name ? (
                  <div className="mt-1 text-sm font-semibold text-red-600">
                    {errors.name.message}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input id="email" className="input mt-2" {...register('email')} />
                {errors.email ? (
                  <div className="mt-1 text-sm font-semibold text-red-600">
                    {errors.email.message}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="eventType">
                  Event type
                </label>
                <select id="eventType" className="input mt-2" {...register('eventType')}>
                  {['Birthday', 'Wedding', 'Baby shower', 'Corporate', 'Other'].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="eventDate">
                  Event date
                </label>
                <input id="eventDate" type="date" className="input mt-2" {...register('eventDate')} />
                {errors.eventDate ? (
                  <div className="mt-1 text-sm font-semibold text-red-600">
                    {errors.eventDate.message}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  className="input mt-2"
                  placeholder="City, State / Country"
                  {...register('location')}
                />
                {errors.location ? (
                  <div className="mt-1 text-sm font-semibold text-red-600">
                    {errors.location.message}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="label" htmlFor="guests">
                  Estimated guests
                </label>
                <input id="guests" type="number" className="input mt-2" {...register('guests')} />
                {errors.guests ? (
                  <div className="mt-1 text-sm font-semibold text-red-600">
                    {errors.guests.message}
                  </div>
                ) : null}
              </div>
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-brand-500 focus:ring-brand-500"
                {...register('travelBaker')}
              />
              <span className="text-sm text-zinc-700">
                Hire the baker to travel and bake on-site
              </span>
            </label>

            <div>
              <label className="label" htmlFor="budget">
                Approx. budget (USD)
              </label>
              <input id="budget" type="number" className="input mt-2" {...register('budget')} />
              {errors.budget ? (
                <div className="mt-1 text-sm font-semibold text-red-600">
                  {errors.budget.message}
                </div>
              ) : null}
            </div>

            <div>
              <label className="label" htmlFor="notes">
                Describe what you want
              </label>
              <textarea
                id="notes"
                className="input mt-2 min-h-[140px]"
                placeholder="Theme, colors, flavors, inspiration, dietary notes, delivery/travel details..."
                {...register('notes')}
              />
              {errors.notes ? (
                <div className="mt-1 text-sm font-semibold text-red-600">
                  {errors.notes.message}
                </div>
              ) : null}
            </div>

            <button className="btn-primary" type="submit" disabled={isSubmitting}>
              Send inquiry
            </button>
            <div className="text-xs text-zinc-600">
              This opens your email app with the message pre-filled.
            </div>
          </form>
        </div>

        <aside className="grid gap-4">
          <div className="card p-6">
            <div className="text-sm font-extrabold">Instant rough estimate</div>
            <div className="muted mt-1">
              This is a quick estimate to help set expectations — final pricing
              depends on design complexity and logistics.
            </div>
            <div className="mt-4 rounded-2xl bg-zinc-50 p-5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-600">
                Estimated total
              </div>
              <div className="mt-1 text-3xl font-black tracking-tight">
                {formatMoney(estimate)}
              </div>
              <div className="mt-3 grid gap-2 text-sm text-zinc-700">
                <div>• Guests drive base servings</div>
                <div>• Travel baker adds logistics</div>
                <div>• Design complexity varies</div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="text-sm font-extrabold">Travel baker emphasis</div>
            <div className="mt-2 text-sm text-zinc-700">
              For destination events, we can coordinate on-site baking and setup
              so you don’t have to worry about transport risk.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

