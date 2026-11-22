import { Link } from 'react-router-dom'
import { Reveal } from '../../animations/Reveal'
import { RevealHeading } from '../../animations/RevealHeading'
import { Picture } from '../../components/shared/Picture'
import { ConsultCta, DraftTag, MedicalNote } from '../../components/treatments/parts'
import { RelatedChapters } from '../../components/treatments/Related'
import { categoryImages } from '../../data/images'
import { kindLabel, sameText } from '../../lib/treatments'
import { routes } from '../../lib/routes'
import { useTitle } from '../../lib/useTitle'
import type { TreatmentCategory } from '../../types/treatment'

/**
 * One chapter. The structure is the same for all six; the composition (hero, frame shape, directory style)
 * changes with `category.layout`, in styles/treatments.css.
 */
export default function CategoryPage({ category: c }: { category: TreatmentCategory }) {
  useTitle(c.name)
  const missing = c.treatments.filter((t) => !t.summary).length
  return (
    <main className={`tx tc tc--${c.layout}`}>
      <div className="tc-top">
        <header className="tc-hero">
          <div className="wrap tc-hero-grid">
            <div className="tc-hero-text">
              <nav className="tx-crumb" aria-label="Breadcrumb">
                <Link to={routes.treatments}>Treatments</Link> <span aria-hidden="true">/</span> <span aria-current="page">{c.name}</span>
              </nav>
              <p className="tx-num">Chapter {c.number}{c.subtitle ? ` · ${c.subtitle}` : ''}</p>
              <RevealHeading as="h1" className="tc-h1" parts={[{ text: c.name }]} />
              <p className="tc-heading">{c.heading}</p>
              {c.intro.map((p) => <p key={p} className="tx-lede">{p}</p>)}
              <p className="tc-badges">
                <DraftTag>{kindLabel[c.kind]} · label unverified</DraftTag>
                {c.introDraft && <DraftTag>Draft introduction</DraftTag>}
              </p>
            </div>
            <div className="tc-hero-img">
              <div className="tc-frame">
                <Picture id={categoryImages[c.slug]} sizes="(min-width: 960px) 36vw, 90vw" priority />
              </div>
            </div>
          </div>
        </header>

        <section id="directory" className="tc-dir" aria-labelledby="dir-h">
          <div className="wrap">
          <div className="tc-dir-head">
            <h2 id="dir-h" className="tx-h3">Treatment directory</h2>
            <p className="tx-count">{c.treatments.length} treatments</p>
          </div>
          {missing > 0 && (
            <p className="tx-sample tc-missing" role="note">
              <DraftTag>To be supplied</DraftTag>
              {missing === c.treatments.length ? 'Short descriptions for these treatments have not been supplied yet.' : `Short descriptions for ${missing} of these treatments have not been supplied yet.`}
            </p>
          )}
          <ol className="tc-list">
            {c.treatments.map((t, i) => (
              <li key={t.slug}>
                <Reveal>
                  <Link className="tc-item" to={routes.treatment(c.slug, t.slug)}>
                    <span className="tx-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tc-item-main">
                      <strong className="tc-item-name">{t.name}</strong>
                      {t.note && <span className="tc-item-note">{t.note}</span>}
                      {t.summary && !sameText(t.summary, t.note) && <span className="tc-item-sum">{t.summary}</span>}
                    </span>
                    <span className="tx-arr" aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
          </div>
        </section>
      </div>

      <RelatedChapters category={c} />
      <ConsultCta body={c.cta?.body} label={c.cta?.label} />
      <MedicalNote />
    </main>
  )
}
