import { Link, useParams } from 'react-router-dom'
import { ProfileCard } from '../../components/doctors/ProfileCard'
import { ProfileDetail } from '../../components/doctors/ProfileDetail'
import { getMember, getTeam } from '../../lib/team'
import { routes } from '../../lib/routes'
import '../../styles/team.css'

/** Handles /doctors (list) and /doctors/:slug (profile). */
export default function Doctors() {
  const { slug } = useParams()

  if (slug) {
    const member = getMember(slug)
    if (!member) {
      return (
        <main className="tpage">
          <h1 className="t-h1">Profile not found</h1>
          <p className="t-bio">
            This profile is not available. <Link to={routes.doctors}>See the team</Link>.
          </p>
        </main>
      )
    }
    return (
      <main className="tpage">
        <ProfileDetail member={member} />
      </main>
    )
  }

  const members = getTeam()
  return (
    <main className="tpage">
      <header className="tpage-head">
        <p className="t-eyebrow">Our team</p>
        <h1 className="t-h1">The people behind your care</h1>
        <p className="t-bio">Meet the practitioners who guide consultations and treatment at V.Back Original Aesthetic Center.</p>
      </header>
      {members.length === 0 ? (
        <p className="t-note">Our team profiles will be introduced here soon.</p>
      ) : (
        <div className="tgrid">
          {members.map((m, i) => (
            <ProfileCard key={m.slug} member={m} delay={(i % 3) * 0.08} />
          ))}
        </div>
      )}
    </main>
  )
}
