import { Link } from 'react-router-dom'
import { useState } from 'react'

function QA({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      className="card w-full p-5 text-left transition hover:border-zinc-300"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-base font-extrabold">{q}</div>
        <div className="text-sm font-black text-brand-700">
          {open ? '−' : '+'}
        </div>
      </div>
      {open ? <div className="mt-2 text-sm text-zinc-700">{a}</div> : null}
    </button>
  )
}

export function FAQPage() {
  return (
    <div className="container-page py-12">
      <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
        FAQ
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        Common questions
      </h1>
      <p className="mt-2 text-base text-zinc-700">
        Clear answers for ordering, custom work, and travel events.
      </p>

      <div className="mt-8 grid gap-3">
        <QA
          q="How far in advance should I order?"
          a="For standard menu orders, 5–10 days is ideal. For custom cakes, weddings, or travel events, 4–12+ weeks is recommended."
        />
        <QA
          q="Do you deliver?"
          a="Local delivery may be available depending on location and order size. Travel events are quoted separately."
        />
        <QA
          q="Can I hire you to travel and bake on-site?"
          a="Yes. We offer a travel-ready baker service for destination events. It includes planning, logistics, and on-site setup."
        />
        <QA
          q="Do you handle allergens?"
          a="We can discuss ingredient and allergen needs. Please note: we cannot guarantee a completely allergen-free environment."
        />
        <QA
          q="What payments do you accept?"
          a="The site includes a secure checkout flow. For real card charging, we recommend Stripe (requires a small server step)."
        />
      </div>

      <div className="mt-10 card p-6">
        <div className="text-base font-extrabold">Still have questions?</div>
        <div className="muted mt-1">
          Send your event date, location (Michigan/USA/world), and guest count
          for the fastest response.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link className="btn-primary" to="/contact">
            Contact
          </Link>
          <Link className="btn-secondary" to="/custom-orders">
            Custom order inquiry
          </Link>
        </div>
      </div>
    </div>
  )
}

