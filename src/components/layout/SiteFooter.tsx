import { Link } from 'react-router-dom'
import { bookingCta, legalNav, primaryNav } from '../../data/nav'
import { site } from '../../data/site'
import { categories } from '../../data/treatments'
import { routes } from '../../lib/routes'

interface Row {
  label: string
  /** Real value, only when the clinic supplied one. */
  text?: string
  href?: string
  external?: boolean
}

/**
 * Contact and social rows, built from src/data/site.ts.
 * A null value renders as a labeled placeholder (plain text, never a link).
 * Nothing here is invented, so no phone, email, address or profile appears until it is real.
 */
function contactRows(): Row[] {
  const c = site.contact
  const place = [c.address, c.city].filter(Boolean).join(', ')
  const rows: Row[] = [
    { label: 'Address', text: place || undefined },
    { label: 'Hours', text: c.hours ?? undefined },
    { label: 'Phone', text: c.phone ?? undefined, href: c.phone ? `tel:${c.phone.replace(/[^\d+]/g, '')}` : undefined },
    { label: 'Email', text: c.email ?? undefined, href: c.email ? `mailto:${c.email}` : undefined },
  ]
  if (c.whatsapp) {
    rows.push({ label: 'WhatsApp', text: c.whatsapp, href: `https://wa.me/${c.whatsapp.replace(/\D/g, '')}`, external: true })
  }
  return rows
}

function socialRows(): Row[] {
  const c = site.contact
  return [
    { label: 'Instagram', text: c.instagram ? 'Instagram' : undefined, href: c.instagram ?? undefined, external: true },
    { label: 'Facebook', text: c.facebook ? 'Facebook' : undefined, href: c.facebook ?? undefined, external: true },
  ]
}

function RowItem({ row }: { row: Row }) {
  return (
    <li>
      <small>{row.label}</small>
      {row.text ? (
        row.href ? (
          <a href={row.href} {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {row.text}
          </a>
        ) : (
          <span>{row.text}</span>
        )
      ) : (
        <span className="foot-ph">Placeholder · not a real {row.label.toLowerCase()}</span>
      )}
    </li>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top-row">
          <div className="foot-brand">
            <p className="foot-mark">
              V<i>.</i>Back
            </p>
            <p className="foot-sub">Original Aesthetic Center</p>
            <p className="foot-statement">{site.statement}</p>
          </div>
          <Link className="btn btn-cta btn-lg" to={bookingCta.to}>
            <i className="dot" aria-hidden="true" />
            {bookingCta.label} <span className="arr" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="foot-grid">
          <nav aria-label="Footer">
            <h2 className="foot-h">Explore</h2>
            <ul className="foot-list">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Treatment categories">
            <h2 className="foot-h">Treatments</h2>
            <ul className="foot-list foot-cats">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={routes.category(c.slug)}>
                    <small>{c.number}</small>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="foot-h">Visit &amp; contact</h2>
            <ul className="foot-list foot-rows">
              {contactRows().map((r) => (
                <RowItem key={r.label} row={r} />
              ))}
            </ul>
            <h2 className="foot-h">Follow</h2>
            <ul className="foot-list foot-rows">
              {socialRows().map((r) => (
                <RowItem key={r.label} row={r} />
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-disclaimer" role="note">
          <span className="foot-tag">Portfolio demonstration</span>
          <p>{site.disclaimer}</p>
        </div>

        <div className="foot-bar">
          <span>
            © {new Date().getFullYear()} {site.fullName}
          </span>
          <nav aria-label="Legal">
            <ul className="foot-legal">
              {legalNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className="foot-top" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
