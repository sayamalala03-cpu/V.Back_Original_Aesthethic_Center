import { Reveal } from '../../animations/Reveal'
import { Picture } from '../shared/Picture'
import { ImageReveal } from '../../animations/ImageReveal'
import { RevealHeading } from '../../animations/RevealHeading'
import { Parallax } from '../../animations/Parallax'
import { ScrubText } from './ScrubText'
import { beliefs, story } from '../../data/home'

/** One small tag per section: the content is sample text for a fictional clinic. */
export function SampleTag({ children = 'Sample content' }: { children?: string }) {
  return <span className="hm-ph">{children}</span>
}

export function Story() {
  return (
    <section className="section" id="story" aria-labelledby="hm-story-h">
      <div className="wrap hm-story-grid">
        <div className="hm-story-text">
          <Reveal className="hm-head">
            <p className="eyebrow">{story.eyebrow}</p>
            <SampleTag />
            <RevealHeading className="hm-h3" id="hm-story-h" parts={[{ text: story.title }, { text: story.titleAccent, em: true }]} />
          </Reveal>
          <ScrubText className="hm-statement" text={story.statement} />
          <Reveal><p className="hm-body">{story.body}</p></Reveal>
        </div>
        <div className="hm-collage" aria-hidden="true">
          <Parallax travel={-26}>
            <ImageReveal className="hm-collage-a"><Picture id="clinic-consultation" sizes="(min-width: 960px) 28vw, 80vw" style={{ height: '100%' }} /></ImageReveal>
          </Parallax>
          <Parallax className="hm-collage-b-px" travel={34}>
            <ImageReveal className="hm-collage-b" delay={0.2}><Picture id="clinic-reception" sizes="(min-width: 960px) 20vw, 50vw" /></ImageReveal>
          </Parallax>
        </div>
      </div>

      <div className="wrap hm-beliefs" id="philosophy">
        {beliefs.map((b) => (
          <Reveal key={b.title}>
            <article className="hm-belief">
              <RevealHeading className="hm-h3" parts={[{ text: b.title }]} />
              <div className="hm-belief-txt"><p>{b.text}</p></div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
