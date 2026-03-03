import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            About
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Divine Delectable Sweet &amp; Treats LLC
          </h1>
          <p className="mt-4 text-base text-zinc-700">
            We create elevated cakes and sweet treats for people who care about
            flavor, design, and service. Based in Michigan, we also offer a
            travel-ready baker option for destination events.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="card p-5">
              <div className="text-sm font-extrabold">What we do</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
                <li>Custom cakes &amp; cupcakes</li>
                <li>Dessert tables &amp; catering</li>
                <li>Wedding tastings</li>
                <li>Corporate gifting</li>
              </ul>
            </div>
            <div className="card p-5">
              <div className="text-sm font-extrabold">Where we serve</div>
              <p className="mt-2 text-sm text-zinc-700">
                Primary: Michigan • USA
                <br />
                Travel: USA-wide &amp; worldwide (advance booking)
              </p>
              <Link className="btn-primary mt-4 w-full" to="/travel-baker">
                Travel Baker details
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link className="btn-primary" to="/shop">
              Browse the menu
            </Link>
            <Link className="btn-ghost" to="/custom-orders">
              Custom order inquiry
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-zinc-100">
            <img
              alt="Cake styling"
              className="h-full w-full object-cover"
              src="https://picsum.photos/seed/about-hero/1600/900"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <div className="text-base font-extrabold">Our promise</div>
            <p className="mt-2 text-sm text-zinc-700">
              Clear communication, polished presentation, and a timeline that
              respects your event. For travel events, we coordinate logistics
              and on-site setup so your desserts look and taste incredible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

