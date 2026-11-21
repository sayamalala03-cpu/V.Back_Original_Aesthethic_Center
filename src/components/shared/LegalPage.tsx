import { Link } from 'react-router-dom'
import { legalNav } from '../../data/nav'
import type { LegalDoc } from '../../data/legal'
import '../../styles/pages.css'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * One layout for every legal page: editorial header, a sticky contents list on wide screens,
 * numbered sections, and links to the other legal pages.
 * The "sample text" notice is always shown, because none of this is reviewed legal copy.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = legalNav.filter((item) => item.to !== doc.route)

  return (
    <main className="pg">
      <header className="pg-head wrap">
        <p className="eyebrow">{doc.eyebrow}</p>
        <h1 className="pg-h1">{doc.title}</h1>
        <p className="pg-lede">{doc.intro}</p>
        <p className="pg-sample" role="note">
          <span className="pg-tag">Sample text</span>
          Written for a fictional clinic. It is not legal advice and has not been reviewed by a lawyer.
        </p>
      </header>

      <div className="pg-body wrap">
        <nav className="pg-toc" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ol>
            {doc.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="pg-n">{pad(i + 1)}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="pg-text">
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className="pg-n">{pad(i + 1)}</span>
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}

          <p className="pg-also">
            Also read:{' '}
            {others.map((item, i) => (
              <span key={item.to}>
                {i > 0 && ' · '}
                <Link className="tlink" to={item.to}>
                  {item.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </main>
  )
}
