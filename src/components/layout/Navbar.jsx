import { NavLink, Link } from 'react-router-dom'
import { cn } from '../ui/cn.js'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../../state/cart.jsx'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom-orders', label: 'Custom Orders' },
  { to: '/travel-baker', label: 'Travel Baker' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-zinc-100',
          isActive && 'bg-brand-50 text-brand-700'
        )
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()

  const cartCount = useMemo(() => itemCount(), [itemCount])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/bakery-logo.png"
            alt="Divine Delectable Sweet and Treats LLC"
            className="h-10 w-auto"
          />
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight">
              Divine Delectable
            </div>
            <div className="text-xs font-semibold text-zinc-600">
              Sweet &amp; Treats LLC
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((i) => (
            <NavItem key={i.to} to={i.to} label={i.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-zinc-100"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-extrabold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 transition hover:bg-zinc-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-zinc-950/30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-16 z-50 h-[calc(100dvh-4rem)] w-[min(22rem,90vw)] border-l border-zinc-200 bg-white p-3 shadow-xl">
            <div className="grid gap-1">
              {navItems.map((i) => (
                <NavItem
                  key={i.to}
                  to={i.to}
                  label={i.label}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-brand-50 p-4">
              <div className="text-sm font-extrabold text-zinc-900">
                Available to travel &amp; bake
              </div>
              <div className="mt-1 text-sm text-zinc-700">
                Michigan-based, serving events across the USA and beyond with
                advance planning.
              </div>
              <Link className="btn-primary mt-3 w-full" to="/travel-baker">
                Travel service details
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

