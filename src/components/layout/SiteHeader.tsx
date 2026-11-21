import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { bookingCta, primaryNav } from '../../data/nav'
import { site } from '../../data/site'
import { categories } from '../../data/treatments'
import { routes } from '../../lib/routes'

const DESKTOP = '(min-width: 1120px)'
const REDUCED = '(prefers-reduced-motion: reduce)'

function Chevron() {
  return (
    <svg className="chev" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** First three treatment names of a category, for the one-line preview in the menu. */
function preview(names: string[]) {
  return names.slice(0, 3).join(' · ')
}

/**
 * Fixed header.
 * - Transparent at the top, frosted glass after 40px of scroll.
 * - Slides away when you scroll down and returns when you scroll up (off when reduced motion is on).
 * - From 1120px: inline links, and a Treatments mega menu with the six categories.
 *   It opens on hover, on click of the chevron, and with the keyboard. Esc closes it.
 * - Below 1120px: a burger opens a full-screen menu with a Treatments accordion.
 *   Esc closes it, Tab stays inside it, and it closes on navigation or when the window gets wide.
 */
export function SiteHeader() {
  const [stuck, setStuck] = useState(false)
  const [away, setAway] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [sub, setSub] = useState(false)
  const { pathname } = useLocation()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number>(0)

  // Scroll: glass after 40px, hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setStuck(y > 40)
      if (window.matchMedia(REDUCED).matches || y < 120) {
        setAway(false)
        last = y
        return
      }
      const delta = y - last
      if (Math.abs(delta) < 8) return
      setAway(delta > 0)
      last = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Close everything after navigating.
  useEffect(() => {
    setOpen(false)
    setMega(false)
    setSub(false)
  }, [pathname])

  // Close the menus if the window changes between phone and desktop layouts.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = () => {
      setOpen(false)
      setMega(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // Mobile menu keyboard: Esc closes, Tab cycles between the burger and the menu controls.
  useEffect(() => {
    if (!open) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const inside = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(
        (el) => el.offsetParent !== null,
      )
      const items = burgerRef.current ? [burgerRef.current, ...inside] : inside
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

  // Mega menu: hover (mouse only), keyboard, and focus leaving.
  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMega(true)
  }
  const closeMegaSoon = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(false), 180)
  }
  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') openMega()
  }
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') closeMegaSoon()
  }
  const onMegaKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && mega) {
      setMega(false)
      toggleRef.current?.focus()
    }
  }
  const onMegaBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false)
  }

  const headerClass = ['site-nav', stuck && 'stuck', away && !open && !mega && 'away', mega && 'mega-open'].filter(Boolean).join(' ')

  return (
    <>
      <header className={headerClass}>
        <div className="site-nav-in">
          <Link className="logo" to={routes.home} aria-label={`${site.fullName}, home`}>
            <span className="logo-mark">
              V<i>.</i>Back
            </span>
            <span className="logo-sub">Original Aesthetic Center</span>
          </Link>

          <nav className="site-links" aria-label="Primary">
            {primaryNav.map((item) =>
              item.menu ? (
                <div
                  key={item.to}
                  className="mega-wrap"
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onKeyDown={onMegaKey}
                  onBlur={onMegaBlur}
                >
                  <NavLink to={item.to}>{item.label}</NavLink>
                  <button
                    ref={toggleRef}
                    type="button"
                    className="mega-toggle"
                    aria-expanded={mega}
                    aria-controls="mega-panel"
                    aria-label={mega ? 'Close treatment categories' : 'Open treatment categories'}
                    onClick={() => (mega ? setMega(false) : openMega())}
                  >
                    <Chevron />
                  </button>

                  <div id="mega-panel" className={`mega${mega ? ' open' : ''}`} role="region" aria-label="Treatment categories">
                    <div className="mega-in">
                      <div className="mega-intro">
                        <p className="eyebrow">Treatments</p>
                        <p className="mega-lede">Six areas of aesthetic care, planned around you.</p>
                        <Link className="tlink" to={routes.treatments}>
                          View all treatments <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                      <ul className="mega-grid">
                        {categories.map((c, i) => (
                          <li key={c.slug} style={{ '--i': i } as CSSProperties}>
                            <Link className="mega-item" to={routes.category(c.slug)}>
                              <span className="mega-num">{c.number}</span>
                              <span className="mega-name">{c.name}</span>
                              <span className="mega-meta">{c.treatments.length} treatments</span>
                              <span className="mega-pre">{preview(c.treatments.map((t) => t.name))}</span>
                              <span className="mega-go" aria-hidden="true">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === routes.home}>
                  {item.label}
                </NavLink>
              ),
            )}
            <Link className="btn btn-cta btn-sm" to={bookingCta.to}>
              <i className="dot" aria-hidden="true" />
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
          {primaryNav.map((item, i) =>
            item.menu ? (
              <div key={item.to} className="m-group" style={{ '--i': i } as CSSProperties}>
                <div className="m-row">
                  <NavLink className="m" to={item.to}>
                    {item.label}
                  </NavLink>
                  <button
                    type="button"
                    className="m-toggle"
                    aria-expanded={sub}
                    aria-controls="m-sub"
                    aria-label={sub ? 'Hide treatment categories' : 'Show treatment categories'}
                    onClick={() => setSub((v) => !v)}
                  >
                    <Chevron />
                  </button>
                </div>
                <ul id="m-sub" className={`m-sub${sub ? ' open' : ''}`} hidden={!sub}>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link to={routes.category(c.slug)}>
                        <span className="m-sub-num">{c.number}</span>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink key={item.to} className="m" style={{ '--i': i } as CSSProperties} to={item.to} end={item.to === routes.home}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        <Link className="btn btn-cta btn-lg" to={bookingCta.to}>
          <i className="dot" aria-hidden="true" />
          {bookingCta.label} <span className="arr" aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  )
}
