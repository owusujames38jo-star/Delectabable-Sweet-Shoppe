import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="container-page py-12">
      <div className="card p-8 text-center">
        <div className="text-6xl font-black tracking-tight">404</div>
        <div className="mt-2 text-lg font-extrabold">Page not found</div>
        <div className="muted mt-1">
          The page you’re looking for doesn’t exist.
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link className="btn-primary" to="/">
            Go home
          </Link>
          <Link className="btn-ghost" to="/shop">
            Shop
          </Link>
          <Link className="btn-ghost" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}

