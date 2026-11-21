import { Link } from 'react-router-dom'
import { RevealHeading } from '../../animations/RevealHeading'
import { Reveal } from '../../animations/Reveal'
import { categories } from '../../data/treatments'
import { routes } from '../../lib/routes'
import { Draft } from './Story'

const kindLabel = { surgical: 'Surgical', 'non-surgical': 'Non-surgical', mixed: 'Surgical and non-surgical' } as const

export function Specialties() {
  return (
    <section className="section hm-specialties" id="specialties" aria-labelledby="hm-sp-h">
      <div className="wrap">
        <Reveal className="hm-head">
          <p className="eyebrow">Our specialties</p>
          <RevealHeading className="hm-h2" id="hm-sp-h" parts={[{ text: 'Six areas of' }, { text: 'aesthetic care.', em: true }]} />
          <p className="hm-lede">Each treatment is discussed in a consultation first, so you can ask questions before deciding anything.</p>
          <Draft>Service names from the clinic brief · surgical labels to be confirmed by the clinic</Draft>
        </Reveal>
        <div className="hm-cats">
          {categories.map((c) => (
            <Reveal key={c.slug}>
              <article className="hm-cat">
                <span className="hm-num">{c.number}</span>
                <h3>
                  <Link to={routes.category(c.slug)}>{c.name} <span className="hm-go" aria-hidden="true">→</span></Link>
                  <span className="hm-kind">{kindLabel[c.kind]}</span>
                </h3>
                <ul>
                  {c.treatments.map((t) => <li key={t.slug}>{t.name}{t.note ? ` (${t.note})` : ''}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="hm-more"><Link className="tlink" to={routes.treatments}>See all treatments</Link></div>
      </div>
    </section>
  )
}
