import { Link } from 'react-router-dom'
import { Reveal } from '../../animations/Reveal'
import { RevealHeading } from '../../animations/RevealHeading'
import { Picture } from '../../components/shared/Picture'
import { ConsultCta, DraftTag, MedicalNote } from '../../components/treatments/parts'
import { RelatedChapters } from '../../components/treatments/Related'
import { categoryImages } from '../../data/images'
import { neighbours, sameText } from '../../lib/treatments'
import { routes } from '../../lib/routes'
import { useTitle } from '../../lib/useTitle'
import type { Treatment, TreatmentCategory } from '../../types/treatment'

/** What a section says while its approved copy has not been supplied yet. */
const PENDING: Record<string, string> = {
  intro: 'A description for this treatment has not been supplied yet.',
  overview: 'The procedure overview is reserved for a description written or approved by qualified medical professionals.',
  assessment: 'Details of the assessment for this treatment are reserved for qualified medical professionals to supply.',
  risks: 'Possible risks and limitations are reserved for qualified medical professionals to write and approve. Nothing is stated here until they do.',
  recovery: 'Recovery and aftercare information is reserved for qualified medical professionals to write and approve. Nothing is stated here until they do.',
}

/** True for statements that are only a general principle, not treatment-specific clinical information. */
const GENERAL_ASSESSMENT = 'Each procedure requires individual professional assessment. A qualified professional decides, after examining you, whether any treatment is suitable.'

/** Editable structure: five sections per treatment, filled from `treatment.detail` and `treatment.summary`. */
export default function TreatmentDetailPage({ category: c, treatment: t }: { category: TreatmentCategory; treatment: Treatment }) {
  useTitle(`${t.name} · ${c.name}`)
  const { prev, next } = neighbours(c, t.slug)
  const d = t.detail ?? {}

  const sections: { id: string; title: string; body?: string[]; general?: string; }[] = [
    { id: 'intro', title: 'Treatment introduction', body: t.summary ? [t.summary] : undefined },
    { id: 'overview', title: 'Procedure overview', body: d.overview },
    { id: 'assessment', title: 'Professional assessment', body: d.assessment, general: GENERAL_ASSESSMENT },
    { id: 'risks', title: 'Possible risks and limitations', body: d.risks },
    { id: 'recovery', title: 'Recovery and aftercare', body: d.recovery },
  ]

  return (
    <main className={`tx td tc--${c.layout}`}>
      <header className="td-hero wrap">
        <div className="td-hero-text">
          <nav className="tx-crumb" aria-label="Breadcrumb">
            <Link to={routes.treatments}>Treatments</Link> <span aria-hidden="true">/</span>{' '}
            <Link to={routes.category(c.slug)}>{c.name}</Link> <span aria-hidden="true">/</span> <span aria-current="page">{t.name}</span>
          </nav>
          <p className="tx-num">Chapter {c.number} · {c.name}</p>
          <RevealHeading as="h1" className="td-h1" parts={[{ text: t.name }]} />
          {t.note && <p className="td-note">{t.note}</p>}
          {t.summary && !sameText(t.summary, t.note) && <p className="tx-lede">{t.summary}</p>}
          <p className="tc-badges">
            <DraftTag>Draft · clinical details unverified</DraftTag>
          </p>
          {t.verifyNote && <p className="tx-sample" role="note"><DraftTag>Needs verification</DraftTag>{t.verifyNote}</p>}
        </div>
        <div className="td-hero-img">
          <div className="tc-frame"><Picture id={categoryImages[c.slug]} sizes="(min-width: 960px) 30vw, 80vw" priority /></div>
        </div>
      </header>

      <div className="td-body wrap">
        <nav className="td-toc" aria-label="On this page">
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`}><span className="tx-num">{String(i + 1).padStart(2, '0')}</span>{s.title}</a></li>
            ))}
          </ol>
        </nav>
        <div className="td-secs">
          {sections.map((s) => (
            <Reveal key={s.id}>
              <section id={s.id} className="td-sec" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="tx-h3">{s.title}</h2>
                {s.body && s.body.length > 0 ? (
                  s.body.map((p) => <p key={p}>{p}</p>)
                ) : (
                  <>
                    {s.general && <p>{s.general}</p>}
                    <p className="td-pending"><DraftTag>To be supplied</DraftTag>{PENDING[s.id]}</p>
                  </>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      <nav className="td-step wrap" aria-label={`More in ${c.name}`}>
        {prev ? (
          <Link to={routes.treatment(c.slug, prev.slug)} className="td-step-prev"><span className="tx-num">Previous</span><strong>{prev.name}</strong></Link>
        ) : <span />}
        {next ? (
          <Link to={routes.treatment(c.slug, next.slug)} className="td-step-next"><span className="tx-num">Next</span><strong>{next.name}</strong></Link>
        ) : <span />}
      </nav>

      <section className="td-more wrap" aria-labelledby="td-more-h">
        <h2 id="td-more-h" className="tx-h3">Also in {c.name}</h2>
        <ul>
          {c.treatments.filter((x) => x.slug !== t.slug).map((x) => (
            <li key={x.slug}><Link to={routes.treatment(c.slug, x.slug)}>{x.name}</Link></li>
          ))}
        </ul>
        <Link className="tlink" to={routes.category(c.slug)}>Back to the {c.name} directory</Link>
      </section>

      <RelatedChapters category={c} />
      <ConsultCta />
      <MedicalNote />
    </main>
  )
}
