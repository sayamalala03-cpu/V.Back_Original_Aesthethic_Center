import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { bookingCta, primaryNav } from '../../data/nav'
import { site } from '../../data/site'
import { routes } from '../../lib/routes'

const DESKTOP = '(min-width: 960px)'

/**
 * Fixed header. Transparent at the top of the page, frosted glass after 40px of scroll.
 * Below 960px a burger opens a full-screen menu. Esc closes it, Tab stays inside it,
 * and it closes by itself on navigation or when the window becomes wide.
 */
export function SiteHeader() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu after navigating.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close the menu if the window becomes wide enough for the inline links.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Stop the page behind the menu from scrolling.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])

  // Keyboard: Esc closes, Tab cycles between the burger and the menu links.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const links = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])
      const items = burgerRef.current ? [burgerRef.current, ...links] : links
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`site-nav${stuck ? ' stuck' : ''}`}>
        <div className="site-nav-in">
          <Link className="logo" to={routes.home} aria-label={`${site.fullName}, home`}>
            <span className="logo-mark">
              V<i>.</i>Back
            </span>
            <span className="logo-sub">Original Aesthetic Center</span>
          </Link>

          <nav className="site-links" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <Link className="btn btn-sm" to={bookingCta.to}>
              {bookingCta.label}
            </Link>
          </nav>

          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        className={`site-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          {primaryNav.map((item, i) => (
            <NavLink key={item.to} className="m" style={{ '--i': i } as CSSProperties} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="btn btn-lg" to={bookingCta.to}>
          {bookingCta.label} <span className="arr" aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  )
}
