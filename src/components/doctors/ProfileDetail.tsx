import { Link } from 'react-router-dom'
import { Picture } from '../shared/Picture'
import { Reveal } from '../../animations/Reveal'
import { categories } from '../../data/treatments'
import { publicLicenses } from '../../lib/team'
import { routes } from '../../lib/routes'
import type { TeamMember } from '../../types/team'

const groupLabel = {
  physician: 'Physician',
  'aesthetic-nursing': 'Aesthetic nursing',
  wellness: 'Wellness',
} as const

/** Full profile layout. One H1 (the name), H2 per section. */
export function ProfileDetail({ member }: { member: TeamMember }) {
  const draft = member.status === 'draft'
  const licenses = publicLicenses(member)
  const related = categories.filter((c) => member.categories.includes(c.slug))

  return (
    <article className="tdetail">
      <div className="tdetail-hero">
        <Reveal className="tdetail-portrait">
          <div className="t-arch">
            <Picture id={member.portraitId} sizes="(min-width: 960px) 40vw, 90vw" priority />
          </div>
        </Reveal>
        <div className="tdetail-intro">
          <p className="t-eyebrow">{groupLabel[member.group]}</p>
          <h1 className="t-h1">{member.name}</h1>
          <p className="t-role">{member.role}</p>
          {member.experience && <p className="t-meta">{member.experience}</p>}
          <div className="t-actions">
            <Link className="t-btn" to={routes.consultation}>
              Request a consultation
            </Link>
            <Link className="t-btn t-btn-ghost" to={routes.doctors}>
              All team members
            </Link>
          </div>
        </div>
      </div>

      <div className="tdetail-grid">
        <Reveal className="tblock">
          <h2 className="t-h2">About</h2>
          <p className="t-bio">{member.bio}</p>
        </Reveal>

        <Reveal className="tblock" delay={0.06}>
          <h2 className="t-h2">Areas of practice</h2>
          <ul className="t-list">
            {member.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="tblock" delay={0.06}>
          <h2 className="t-h2">Qualifications</h2>
          <ul className="t-list">
            {member.credentials.map((c) => (
              <li key={c.text}>
                {c.text}
                {draft && !c.verified && <span className="t-flag">Not yet verified</span>}
              </li>
            ))}
          </ul>
          {licenses.length > 0 && (
            <ul className="t-list">
              {licenses.map((l) => (
                <li key={l.body}>
                  {l.body} licence no. {l.number}
                </li>
              ))}
            </ul>
          )}
          {draft && licenses.length === 0 && <p className="t-note">Licence number not yet supplied. It appears here once verified.</p>}
        </Reveal>

        {member.availability && (
          <Reveal className="tblock" delay={0.06}>
            <h2 className="t-h2">Consultation schedule</h2>
            <p className="t-bio">{member.availability}</p>
            <p className="t-note">Schedules can change. A request is confirmed by the clinic before the visit.</p>
          </Reveal>
        )}

        {related.length > 0 && (
          <Reveal className="tblock" delay={0.06}>
            <h2 className="t-h2">Related treatments</h2>
            <ul className="t-list">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link to={routes.category(c.slug)}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>

      {draft && <p className="t-draftbar">Draft profile. It is visible only in development or a private preview.</p>}
    </article>
  )
}
