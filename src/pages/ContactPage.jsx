import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BUSINESS } from '../config/business.js'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  location: z.string().min(2, 'Please enter your event location.'),
  message: z.string().min(10, 'Please share a few details.'),
  travelBaker: z.boolean().optional(),
})

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ resolver: zodResolver(schema), defaultValues: { travelBaker: false } })

  const travelBaker = watch('travelBaker')

  const mailto = useMemo(() => {
    return { to: BUSINESS.email }
  }, [])

  const onSubmit = async (values) => {
    const subject = encodeURIComponent(
      `Inquiry — ${values.name} (${values.location})${values.travelBaker ? ' [Travel Baker]' : ''}`
    )
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : null,
        values.eventDate ? `Event date: ${values.eventDate}` : null,
        `Location: ${values.location}`,
        `Travel baker: ${values.travelBaker ? 'Yes' : 'No'}`,
        '',
        values.message,
      ]
        .filter(Boolean)
        .join('\n')
    )
    window.location.href = `mailto:${mailto.to}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Contact
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Let’s plan your dessert moment
          </h1>
          <p className="mt-2 text-base text-zinc-700">
            For the fastest response, include your date, location (Michigan/USA/world),
            guest count, and inspiration photos.
          </p>

          <form
            className="mt-8 grid gap-4 card p-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                <input
                  id="email"
                  className="input mt-2"
                  {...register('email')}
                />
                {errors.email ? (
                  <div className="mt-1 text-sm font-semibold text-red-600">
                    {errors.email.message}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  className="input mt-2"
                  {...register('phone')}
                />
              </div>
              <div>
                <label className="label" htmlFor="eventDate">
                  Event date (optional)
                </label>
                <input
                  id="eventDate"
                  type="date"
                  className="input mt-2"
                  {...register('eventDate')}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="location">
                Event location
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

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-brand-500 focus:ring-brand-500"
                {...register('travelBaker')}
              />
              <span className="text-sm text-zinc-700">
                I want to hire the baker to travel and bake on-site for my event.
              </span>
            </label>

            <div>
              <label className="label" htmlFor="message">
                Details
              </label>
              <textarea
                id="message"
                className="input mt-2 min-h-[140px]"
                placeholder="Guest count, flavors, theme colors, dietary needs, delivery/travel details..."
                {...register('message')}
              />
              {errors.message ? (
                <div className="mt-1 text-sm font-semibold text-red-600">
                  {errors.message.message}
                </div>
              ) : null}
            </div>

            <button className="btn-primary" type="submit" disabled={isSubmitting}>
              {travelBaker ? 'Send travel inquiry' : 'Send inquiry'}
            </button>
            <div className="text-xs text-zinc-600">
              This opens your email app with the message pre-filled.
            </div>
          </form>
        </div>

        <aside className="grid gap-4">
          <div className="card p-6">
            <div className="text-sm font-extrabold">Service areas</div>
            <div className="mt-2 text-sm text-zinc-700">
              <div className="font-semibold text-zinc-900">Michigan</div>
              <div>Primary service area (USA)</div>
              <div className="mt-3 font-semibold text-zinc-900">
                USA + worldwide travel
              </div>
              <div>Available with advance booking</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="text-sm font-extrabold">Payment &amp; deposits</div>
            <div className="mt-2 text-sm text-zinc-700">
              Quotes can be confirmed with deposits. The checkout flow supports
              receipts and status updates; card processing can be connected via
              Stripe.
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="aspect-[4/3] bg-zinc-100">
              <img
                alt="Cupcakes"
                className="h-full w-full object-cover"
                src="https://picsum.photos/seed/contact-hero/1600/900"
                loading="lazy"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

