import { Link } from 'react-router-dom'

export function TravelBakerPage() {
  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Travel &amp; Bake
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Hire a travel-ready baker for your event
          </h1>
          <p className="mt-4 text-base text-zinc-700">
            Divine Delectable Sweet &amp; Treats LLC is based in Michigan and
            available to travel across the USA and internationally with advance
            planning. This service is ideal for destination weddings, VIP
            celebrations, retreats, and events that need fresh on-site baking
            and professional setup.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'On-site baking',
                body: 'Freshness and control for destination timelines.',
              },
              {
                title: 'Coordinated logistics',
                body: 'Travel, venue coordination, setup, and schedule.',
              },
              {
                title: 'Signature presentation',
                body: 'Dessert table styling that photographs beautifully.',
              },
            ].map((x) => (
              <div key={x.title} className="card p-5">
                <div className="text-base font-extrabold">{x.title}</div>
                <div className="mt-1 text-sm text-zinc-700">{x.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 card p-6">
            <div className="text-base font-extrabold">Travel service basics</div>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
              <li>
                <span className="font-semibold text-zinc-900">Lead time:</span>{' '}
                destination events require advance planning (recommended 4–12+
                weeks depending on location).
              </li>
              <li>
                <span className="font-semibold text-zinc-900">Fees:</span>{' '}
                travel &amp; logistics are quoted transparently (transport,
                lodging, per diem, venue requirements).
              </li>
              <li>
                <span className="font-semibold text-zinc-900">Payments:</span>{' '}
                deposit + milestone-based payments with receipts and
                confirmations.
              </li>
              <li>
                <span className="font-semibold text-zinc-900">Coverage:</span>{' '}
                Michigan (primary) + USA + worldwide.
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="btn-primary" to="/custom-orders">
                Start a travel inquiry
              </Link>
              <Link className="btn-ghost" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="card overflow-hidden">
            <div className="aspect-[4/3] bg-zinc-100">
              <img
                alt="Dessert catering setup"
                className="h-full w-full object-cover"
                src="https://picsum.photos/seed/travel-baker/1600/900"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <div className="text-sm font-extrabold">
                Best for these events
              </div>
              <div className="mt-2 grid gap-2 text-sm text-zinc-700">
                <div>• Destination weddings</div>
                <div>• Weekend celebrations</div>
                <div>• Retreats &amp; conferences</div>
                <div>• Styled shoots</div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm font-extrabold">Quick checklist</div>
            <div className="mt-2 text-sm text-zinc-700">
              Have these ready for a fast quote:
              <ul className="mt-2 list-disc pl-5">
                <li>Event date + location</li>
                <li>Guest count</li>
                <li>Desired menu + theme</li>
                <li>Venue restrictions</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

