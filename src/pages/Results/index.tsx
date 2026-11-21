import { Link } from 'react-router-dom'
import { routes } from '../../lib/routes'
import '../../styles/pages.css'

const standards = [
  {
    title: 'Written consent comes first',
    text: 'Nothing is published without a patient’s signed, specific written consent, kept on file with a reference.',
  },
  {
    title: 'Honest photographs',
    text: 'The same lighting, angle and distance before and after. No filters, retouching or reshaping.',
  },
  {
    title: 'No promises',
    text: 'Results differ from person to person. Nothing shown here is a guarantee or a prediction.',
  },
  {
    title: 'Reviewed before it is shown',
    text: 'A licensed practitioner checks each case before it goes on this page.',
  },
]

/**
 * Patient Results for a fictional clinic. It shows no photographs, testimonials or outcome claims,
 * because there are no patients. It explains the standard a real gallery would have to meet
 * (see docs/IMAGE-LIBRARY.md: a patient-result image must be supplied with written consent).
 */
export default function Results() {
  return (
    <main className="pg">
      <header className="pg-head wrap">
        <p className="eyebrow">Patient results</p>
        <h1 className="pg-h1">
          Results, shown <em>responsibly</em>
        </h1>
        <p className="pg-lede">
          Before-and-after photographs are some of the most persuasive things a clinic can publish, and some of the easiest to
          misuse. This is the standard this page is built to follow.
        </p>
        <p className="pg-sample" role="note">
          <span className="pg-tag">Sample page</span>
          V.Back Original is a fictional clinic with no patients, so no photographs, testimonials or outcome claims appear here.
        </p>
      </header>

      <section className="pg-std wrap" aria-labelledby="std-h">
        <h2 id="std-h" className="pg-h2">
          Our standards
        </h2>
        <ol>
          {standards.map((s, i) => (
            <li key={s.title}>
              <span className="pg-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pg-empty wrap" aria-label="Gallery placeholder">
        <div className="pg-frame">
          <span className="pg-tag">Gallery placeholder</span>
          <p>Consent-cleared cases would appear here. There are none in this demonstration.</p>
        </div>
      </section>

      <section className="pg-cta wrap">
        <h2 className="pg-h2">Want to talk through what is realistic?</h2>
        <Link className="btn btn-cta btn-lg" to={routes.consultation}>
          <i className="dot" aria-hidden="true" />
          Book a Consultation <span className="arr" aria-hidden="true">{'→'}</span>
        </Link>
      </section>
    </main>
  )
}
