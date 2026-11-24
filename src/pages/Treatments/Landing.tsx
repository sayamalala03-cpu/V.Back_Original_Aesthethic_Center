import { Link } from 'react-router-dom'
import { Reveal } from '../../animations/Reveal'
import { RevealHeading } from '../../animations/RevealHeading'
import { Picture } from '../../components/shared/Picture'
import { ConsultCta, DraftTag, MedicalNote } from '../../components/treatments/parts'
import { categories } from '../../data/treatments'
import { categoryImages } from '../../data/images'
import { kindLabel } from '../../lib/treatments'
import { routes } from '../../lib/routes'
import { useTitle } from '../../lib/useTitle'

/** The Treatments landing page: six chapters of one editorial experience. */
export default function TreatmentsLanding() {
  useTitle('Treatments')
  return (
    <main className="tx tl">
      <header className="tl-head wrap">
        <p className="eyebrow">Our treatments</p>
        <RevealHeading as="h1" className="tx-h1" parts={[{ text: 'Comprehensive' }, { text: 'aesthetic solutions.', em: true }]} />
        <p className="tx-lede">From surgical procedures to advanced non-surgical treatments, discover our personalized approach to beauty and confidence.</p>
        <p className="tx-sample" role="note">
          <DraftTag>Sample content</DraftTag>
          V.Back Original is a fictional portfolio clinic. Descriptions are preliminary, and clinical details are marked as draft until qualified medical professionals supply and approve them.
        </p>
        <nav className="tl-index" aria-label="Treatment chapters">
          <ol>
            {categories.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`}><span className="tx-num">{c.number}</span>{c.name}</a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <ol className="tl-chapters">
        {categories.map((c, i) => (
          <li key={c.slug} id={c.slug} className={`tl-chap tc--${c.layout}${i % 2 ? ' flip' : ''}`}>
            <div className="wrap tl-chap-grid">
              <Reveal className="tl-chap-img">
                <div className="tc-frame">
                  <Picture id={categoryImages[c.slug]} sizes="(min-width: 960px) 36vw, 90vw" />
                </div>
              </Reveal>
              <div className="tl-chap-body">
                <p className="tx-num">Chapter {c.number} · {kindLabel[c.kind]}{c.kindVerified ? '' : ' (unverified)'}</p>
                <h2 className="tx-h2"><Link to={routes.category(c.slug)}>{c.name}</Link></h2>
                <p className="tl-tag">{c.tagline}</p>
                <ul className="tl-names" aria-label={`${c.name} treatments`}>
                  {c.treatments.map((t) => (
                    <li key={t.slug}><Link to={routes.treatment(c.slug, t.slug)}>{t.name}</Link></li>
                  ))}
                </ul>
                <Link className="tlink" to={routes.category(c.slug)}>Enter this chapter</Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <ConsultCta />
      <MedicalNote />
    </main>
  )
}
