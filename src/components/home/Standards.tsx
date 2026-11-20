import { Link } from 'react-router-dom'
import { Reveal } from '../../animations/Reveal'
import { Picture } from '../shared/Picture'
import { standards } from '../../data/home'
import { routes } from '../../lib/routes'
import { Draft } from './Story'

export function Standards() {
  return (
    <section className="section" id="standards" aria-labelledby="hm-std-h">
      <div className="wrap hm-std-grid">
        <div className="hm-std-vis" aria-hidden="true">
          <div className="hm-std-a"><Picture id="clinic-technology" sizes="(min-width: 960px) 40vw, 90vw" /></div>
          <div className="hm-std-b"><Picture id="clinic-reception" sizes="20vw" style={{ height: '100%' }} /></div>
        </div>
        <div className="hm-std-cols">
          <Reveal className="hm-head">
            <p className="eyebrow">Standards &amp; patient experience</p>
            <h2 className="hm-h2" id="hm-std-h">Trust is <em>shown,</em> never assumed.</h2>
          </Reveal>
          {standards.map((s) => (
            <Reveal key={s.title}>
              <div className="hm-note">
                {s.draft && <Draft>Placeholder</Draft>}
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
          <Link className="tlink" to={routes.consultation}>Book a consultation</Link>
        </div>
      </div>
    </section>
  )
}
