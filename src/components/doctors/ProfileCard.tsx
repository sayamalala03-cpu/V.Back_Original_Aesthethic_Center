import { Link } from 'react-router-dom'
import { Picture } from '../shared/Picture'
import { Reveal } from '../../animations/Reveal'
import { routes } from '../../lib/routes'
import type { TeamMember } from '../../types/team'

interface Props {
  member: TeamMember
  delay?: number
}

/** Reusable team card for lists and the home page. */
export function ProfileCard({ member, delay = 0 }: Props) {
  return (
    <Reveal delay={delay}>
      <article className="tcard">
        <Link to={routes.doctor(member.slug)} className="tcard-media" aria-label={`View profile: ${member.name}`}>
          <Picture id={member.portraitId} sizes="(min-width: 960px) 30vw, (min-width: 480px) 45vw, 100vw" />
        </Link>
        <div className="tcard-body">
          <p className="t-eyebrow">{member.role}</p>
          <h2 className="t-name">
            <Link to={routes.doctor(member.slug)}>{member.name}</Link>
          </h2>
          <p className="t-bio">{member.bio}</p>
          {member.availability && <p className="t-meta">Consultations: {member.availability}</p>}
          <Link className="t-link" to={routes.doctor(member.slug)}>
            View profile
          </Link>
          {member.status === 'draft' && <span className="t-draft">Draft · not public</span>}
        </div>
      </article>
    </Reveal>
  )
}
