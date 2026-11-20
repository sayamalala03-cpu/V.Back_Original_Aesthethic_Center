import { Reveal } from '../../animations/Reveal'
import { approachSteps } from '../../data/home'
import { Draft } from './Story'

export function Approach() {
  return (
    <section className="section hm-approach" id="approach" aria-labelledby="hm-ap-h">
      <div className="wrap hm-ap-grid">
        <Reveal className="hm-head hm-ap-head">
          <p className="eyebrow">Personalized care</p>
          <h2 className="hm-h2" id="hm-ap-h">An approach that <em>fits one person.</em></h2>
          <p className="hm-lede">Four steps describe how care could be organized. The clinic confirms or replaces each one.</p>
          <Draft>Draft process · confirm with the clinic</Draft>
        </Reveal>
        <ol className="hm-steps">
          {approachSteps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08}>
                <div className="hm-step"><b>{i + 1}</b><div><h3>{s.title}</h3><p>{s.text}</p></div></div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
