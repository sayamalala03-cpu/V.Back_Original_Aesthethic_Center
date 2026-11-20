import { Link } from 'react-router-dom'
import { bookingCta, primaryNav } from '../../data/nav'
import { site } from '../../data/site'

interface ContactLine {
  label: string
  text: string
  href?: string
  external?: boolean
}

/**
 * Builds the contact list from src/data/site.ts.
 * Every value there is null until the clinic supplies and verifies it,
 * and a null value is simply left out. Nothing is invented.
 */
function contactLines(): ContactLine[] {
  const c = site.contact
  const lines: ContactLine[] = []
  const place = [c.address, c.city].filter(Boolean).join(', ')
  if (place) lines.push({ label: 'Address', text: place })
  if (c.hours) lines.push({ label: 'Hours', text: c.hours })
  if (c.phone) lines.push({ label: 'Phone', text: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, '')}` })
  if (c.whatsapp) {
    lines.push({ label: 'WhatsApp', text: c.whatsapp, href: `https://wa.me/${c.whatsapp.replace(/\D/g, '')}`, external: true })
  }
  if (c.email) lines.push({ label: 'Email', text: c.email, href: `mailto:${c.email}` })
  if (c.facebook) lines.push({ label: 'Facebook', text: 'Facebook', href: c.facebook, external: true })
  if (c.instagram) lines.push({ label: 'Instagram', text: 'Instagram', href: c.instagram, external: true })
  return lines
}

export function SiteFooter() {
  const lines = contactLines()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <p className="foot-mark">
              V<i>.</i>Back
            </p>
            <p className="foot-statement">{site.statement}</p>
          </div>

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

          <div>
            <h2 className="foot-h">{lines.length > 0 ? 'Visit & contact' : 'Appointments'}</h2>
            {lines.length > 0 && (
              <ul className="foot-list">
                {lines.map((line) => (
                  <li key={line.label}>
                    <small>{line.label}</small>
                    {line.href ? (
                      <a href={line.href} {...(line.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {line.text}
                      </a>
                    ) : (
                      <span>{line.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <Link className="btn btn-champ" to={bookingCta.to}>
              {bookingCta.label}
            </Link>
          </div>
        </div>

        <div className="foot-bar">
          <span>
            © {new Date().getFullYear()} {site.fullName}
          </span>
          <button type="button" className="foot-top" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
