import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../../animations/Reveal'
import { RevealHeading } from '../../animations/RevealHeading'
import { routes } from '../../lib/routes'

/** Small dashed label for content that is draft or unverified. */
export function DraftTag({ children = 'Draft' }: { children?: ReactNode }) {
  return <span className="tx-tag">{children}</span>
}

/** Medical information disclaimer shown at the end of every treatment page. */
export function MedicalNote() {
  return (
    <aside className="tx-med wrap" role="note" aria-label="Medical information disclaimer">
      <p className="tx-med-h">Medical information disclaimer</p>
      <p>
        This is preliminary portfolio copy for a fictional clinic. It is not medical advice, and it does not describe any real procedure, risk,
        recovery period or result. Every procedure requires individual assessment by a qualified professional, and treatment information must be
        reviewed and approved by qualified medical professionals before anyone relies on it.{' '}
        <Link className="tlink" to={routes.disclaimer}>Read the full Medical Disclaimer</Link>
      </p>
    </aside>
  )
}

interface CtaProps {
  /** Copy supplied for this chapter, if any. */
  body?: string
  /** An extra label supplied for this chapter. Shown as a link to the treatment directory. */
  label?: string
  /** Hash link target for the extra label. */
  labelTo?: string
}

/** Consultation call to action. The booking form is not built in this demonstration. */
export function ConsultCta({ body, label, labelTo = '#directory' }: CtaProps) {
  return (
    <section className="tx-cta" aria-labelledby="tx-cta-h">
      <div className="wrap tx-cta-in">
        <Reveal className="tx-cta-copy">
          <p className="eyebrow">Consultation</p>
          <RevealHeading id="tx-cta-h" className="tx-h2" parts={[{ text: 'Begin with' }, { text: 'a conversation.', em: true }]} />
          <p className="tx-lede">
            {body ?? 'A consultation is where your questions are answered and your options are explained. Nothing is decided before you have been assessed by a qualified professional.'}
          </p>
          <div className="tx-cta-btns">
            <Link className="btn btn-cta btn-lg" to={routes.consultation}>
              <i className="dot" aria-hidden="true" />
              Book a Consultation <span className="arr" aria-hidden="true">→</span>
            </Link>
            {label && <a className="tlink" href={labelTo}>{label}</a>}
          </div>
          <p className="tx-cta-note">The online request form is not built in this demonstration.</p>
        </Reveal>
      </div>
    </section>
  )
}
