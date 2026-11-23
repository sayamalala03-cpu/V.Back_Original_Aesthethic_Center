import '../../styles/films.css'
import { Reveal } from '../../animations/Reveal'
import { RevealHeading } from '../../animations/RevealHeading'
import { FilmPlayer } from '../shared/FilmClip'
import { films, filmsIntro } from '../../data/videos'

export function Films() {
  return (
    <section className="section" id="films" aria-labelledby="hm-films-h">
      <div className="wrap">
        <Reveal className="hm-head">
          <p className="eyebrow">{filmsIntro.eyebrow}</p>
          <span className="hm-ph">Concept footage</span>
          <RevealHeading className="hm-h3" id="hm-films-h" parts={[{ text: filmsIntro.title }, { text: filmsIntro.titleAccent, em: true }]} />
        </Reveal>
        <div className="films-grid">
          {films.map((c) => (
            <Reveal key={c.id} className={`films-item films-${c.id}`}><FilmPlayer clip={c} /></Reveal>
          ))}
        </div>
        <p className="films-note">{filmsIntro.note}</p>
      </div>
    </section>
  )
}
