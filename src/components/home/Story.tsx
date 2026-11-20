import { Reveal } from '../../animations/Reveal'
import { Picture } from '../shared/Picture'
import { ScrubText } from './ScrubText'
import { beliefs, story } from '../../data/home'

export function Draft({ children = 'Draft copy · confirm with the clinic' }: { children?: string }) {
  return <span className="hm-ph">{children}</span>
}

export function Story() {
  return (
    <section className="section" id="story" aria-labelledby="hm-story-h">
      <div className="wrap hm-story-grid">
        <div className="hm-story-text">
          <Reveal className="hm-head">
            <p className="eyebrow">{story.eyebrow}</p>
            {story.draft && <Draft />}
            <h2 className="hm-h3" id="hm-story-h">{story.title} <em>{story.titleAccent}</em></h2>
          </Reveal>
          <ScrubText className="hm-statement" text={story.statement} />
          <Reveal><p className="hm-body">{story.body}</p></Reveal>
        </div>
        <div className="hm-collage" aria-hidden="true">
          <div className="hm-collage-a"><Picture id="clinic-consultation" sizes="(min-width: 960px) 28vw, 80vw" style={{ height: '100%' }} /></div>
          <div className="hm-collage-b"><Picture id="clinic-treatment-room" sizes="(min-width: 960px) 20vw, 50vw" /></div>
        </div>
      </div>

      <div className="wrap hm-beliefs" id="philosophy">
        {beliefs.map((b) => (
          <Reveal key={b.title}>
            <article className="hm-belief">
              <h2 className="hm-h3">{b.title}</h2>
              <div className="hm-belief-txt"><p>{b.text}</p>{b.draft && <Draft>Draft wording</Draft>}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
