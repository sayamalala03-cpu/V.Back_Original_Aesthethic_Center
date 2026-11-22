import { RevealHeading } from '../../animations/RevealHeading'
import { Reveal } from '../../animations/Reveal'
import { FilmFrame } from '../shared/FilmFrame'
import { films, type FilmId } from '../../data/films'
import { SampleTag } from './Story'
import '../../styles/films.css'

/** Layout order. Each film's shape and place in the grid are set in styles/films.css. */
const order: FilmId[] = ['reception', 'serum', 'portrait', 'room', 'clinician']

export function Films() {
  return (
    <section className="section" id="films" aria-labelledby="hm-films-h">
      <div className="wrap">
        <Reveal className="hm-head">
          <p className="eyebrow">Inside V.Back</p>
          <RevealHeading className="hm-h2" id="hm-films-h" parts={[{ text: 'A quiet look' }, { text: 'inside.', em: true }]} />
          <p className="hm-lede">Five short films set the mood of the clinic: the reception, the treatment room, the skin and the serum.</p>
          <SampleTag>AI-generated concept films</SampleTag>
        </Reveal>
        <div className="fl-grid">
          {order.map((id) => {
            const film = films[id]
            return (
              <Reveal key={id} className={`fl fl--${id}`}>
                <figure className="fl-fig">
                  <FilmFrame film={film} />
                  <figcaption className="fl-cap"><b>{film.title}</b><span>Concept film, no sound</span></figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
        <p className="fl-note">These films were made with AI as temporary portfolio imagery. They show no real people, patients, clinicians, products or results.</p>
      </div>
    </section>
  )
}
