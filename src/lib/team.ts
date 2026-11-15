import { images } from '../data/images'
import { team } from '../data/team'
import type { TeamMember } from '../types/team'

/** Drafts are visible only in development, or in a private preview with VITE_SHOW_DRAFT_PROFILES=true. */
export function draftsVisible(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFT_PROFILES === 'true'
}

export function getTeam(includeDrafts: boolean = draftsVisible()): TeamMember[] {
  return team.filter((m) => m.status === 'published' || includeDrafts)
}

export function getMember(slug: string, includeDrafts: boolean = draftsVisible()): TeamMember | undefined {
  return getTeam(includeDrafts).find((m) => m.slug === slug)
}

/** Licences the public may see: a number that has been supplied AND verified. */
export function publicLicenses(m: TeamMember) {
  return m.licenses.filter((l) => l.number && l.verified)
}

/**
 * Rules that keep unverified credentials off the public site.
 * Returns a list of problems (empty = valid). Run it in development and in tests.
 */
export function validateTeam(members: readonly TeamMember[] = team): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()

  for (const m of members) {
    const tag = `[${m.slug}]`
    if (slugs.has(m.slug)) errors.push(`${tag} duplicate slug`)
    slugs.add(m.slug)

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.slug)) errors.push(`${tag} slug must be lowercase letters, numbers and hyphens`)
    if (!m.name.trim() || !m.role.trim()) errors.push(`${tag} name and role are required`)
    if (!(m.portraitId in images)) errors.push(`${tag} portraitId "${m.portraitId}" is not in the image manifest`)

    const portrait = images[m.portraitId]
    if (portrait && portrait.subject !== 'portrait') errors.push(`${tag} portrait image must have subject "portrait"`)

    if (m.status === 'published') {
      if (m.credentials.some((c) => !c.verified)) errors.push(`${tag} cannot publish: every credential must be verified`)
      if (m.licenses.length === 0) errors.push(`${tag} cannot publish: no licence record`)
      if (m.licenses.some((l) => !l.number || !l.verified)) errors.push(`${tag} cannot publish: every licence needs a number and verification`)
      if (portrait && portrait.status !== 'supplied') errors.push(`${tag} cannot publish: portrait must be a real photograph supplied by the clinic`)
      if (portrait && !portrait.verifiedPerson) errors.push(`${tag} cannot publish: portrait must be marked verifiedPerson`)
    }
  }
  return errors
}
