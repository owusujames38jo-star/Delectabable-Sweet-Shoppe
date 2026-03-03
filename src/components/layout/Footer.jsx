import { Link } from 'react-router-dom'
import { BUSINESS } from '../../config/business.js'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight">
              {BUSINESS.name}
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Custom cakes, dessert catering, and a travel-ready baker for
              weddings, birthdays, corporate events, and sweet celebrations.
            </p>
            <div className="mt-4 rounded-2xl bg-brand-50 p-4">
              <div className="text-sm font-extrabold">Travel &amp; Bake</div>
              <div className="mt-1 text-sm text-zinc-700">
                Michigan-based, available worldwide with advance booking.
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-extrabold">Explore</div>
            <Link to="/shop" className="text-sm text-zinc-700 hover:underline">
              Shop / Menu
            </Link>
            <Link
              to="/custom-orders"
              className="text-sm text-zinc-700 hover:underline"
            >
              Custom Orders
            </Link>
            <Link
              to="/travel-baker"
              className="text-sm text-zinc-700 hover:underline"
            >
              Travel Baker
            </Link>
            <Link
              to="/gallery"
              className="text-sm text-zinc-700 hover:underline"
            >
              Gallery
            </Link>
            <Link to="/faq" className="text-sm text-zinc-700 hover:underline">
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-sm text-zinc-700 hover:underline"
            >
              Contact
            </Link>
          </div>

          <div>
            <div className="text-sm font-extrabold">Service areas</div>
            <p className="mt-2 text-sm text-zinc-600">
              Primary: {BUSINESS.base}
              <br />
              Also available: {BUSINESS.travel}
            </p>
            <div className="mt-4 text-sm text-zinc-600">
              <div className="font-semibold text-zinc-900">Business hours</div>
              <div className="mt-1">By appointment &amp; event schedule.</div>
            </div>
            <div className="mt-4 text-sm text-zinc-600">
              <div className="font-semibold text-zinc-900">Contact</div>
              <div className="mt-1">{BUSINESS.email}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Divine Delectable Sweet &amp; Treats
            LLC
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

