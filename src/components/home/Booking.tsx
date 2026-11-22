import { Link } from 'react-router-dom'
import { RevealHeading } from '../../animations/RevealHeading'
import { Reveal } from '../../animations/Reveal'
import { routes } from '../../lib/routes'

export function Booking() {
  return (
    <section className="section hm-book" id="book" aria-labelledby="hm-book-h">
      <div className="wrap">
        <Reveal className="hm-head">
          <p className="eyebrow">Appointments</p>
          <RevealHeading className="hm-h2" id="hm-book-h" parts={[{ text: 'Book a' }, { text: 'consultation.', em: true }]} />
          <p className="hm-lede">Start with a conversation about what you would like to change, and what you would not. The online request form is not built in this demonstration.</p>
          <Link className="btn btn-cta btn-lg" to={routes.consultation}>
            <i className="dot" aria-hidden="true" />
            Book a Consultation <span className="arr" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
