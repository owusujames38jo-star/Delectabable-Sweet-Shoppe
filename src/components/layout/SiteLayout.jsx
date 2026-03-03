import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'

export function SiteLayout() {
  const location = useLocation()

  useEffect(() => {
    const top = document.getElementById('page-top')
    if (top) top.focus()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
      >
        Skip to content
      </a>

      <div
        id="page-top"
        tabIndex={-1}
        className="pointer-events-none h-0 w-0 outline-none"
      />

      <Navbar />
      <main id="main" className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

