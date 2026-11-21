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
          <p className="hm-lede">Start with a conversation. The online inquiry form is added in a later stage, once the clinic confirms how requests should reach them.</p>
          <Link className="btn btn-champ btn-lg" to={routes.consultation}>Request an appointment <span className="arr" aria-hidden="true">→</span></Link>
        </Reveal>
      </div>
    </section>
  )
}
