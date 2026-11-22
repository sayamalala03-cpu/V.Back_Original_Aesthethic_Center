import { Link } from 'react-router-dom'
import { RevealHeading } from '../../animations/RevealHeading'
import { ImageReveal } from '../../animations/ImageReveal'
import { Reveal } from '../../animations/Reveal'
import { Picture } from '../shared/Picture'
import { standards } from '../../data/home'
import { routes } from '../../lib/routes'
import { SampleTag } from './Story'

export function Standards() {
  return (
    <section className="section" id="standards" aria-labelledby="hm-std-h">
      <div className="wrap hm-std-grid">
        <div className="hm-std-vis" aria-hidden="true">
          <ImageReveal className="hm-std-a"><Picture id="clinic-technology" sizes="(min-width: 960px) 40vw, 90vw" /></ImageReveal>
          <ImageReveal className="hm-std-b" delay={0.2}><Picture id="gallery-environment-01" sizes="20vw" style={{ height: '100%' }} /></ImageReveal>
        </div>
        <div className="hm-std-cols">
          <Reveal className="hm-head">
            <p className="eyebrow">Standards &amp; patient experience</p>
            <SampleTag />
            <RevealHeading className="hm-h2" id="hm-std-h" parts={[{ text: 'Trust is' }, { text: 'shown,', em: true }, { text: 'never assumed.' }]} />
          </Reveal>
          {standards.map((s) => (
            <Reveal key={s.title}>
              <div className="hm-note">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
          <Link className="tlink" to={routes.consultation}>Book a Consultation</Link>
        </div>
      </div>
    </section>
  )
}
