import type { ImageId } from '../data/images'

export type TeamGroup = 'physician' | 'aesthetic-nursing' | 'wellness'

/**
 * draft:     shown only in development or a private preview. Never in the sitemap.
 * published: shown to the public. Only allowed once every credential is verified
 *            (enforced by validateTeam in src/lib/team.ts).
 */
export type PublishStatus = 'draft' | 'published'

export interface Credential {
  /** Wording exactly as supplied by the clinic. */
  text: string
  /** True only after the clinic has checked the document or registry record. */
  verified: boolean
}

export interface LicenseRecord {
  /** e.g. "PRC". The issuing body. */
  body: string
  /** Licence number. null until the clinic supplies it. Never guessed. */
  number: string | null
  verified: boolean
}

export interface TeamMember {
  slug: string
  /** Display name including post-nominals, as supplied. */
  name: string
  role: string
  group: TeamGroup
  credentials: Credential[]
  licenses: LicenseRecord[]
  /** Clinical or treatment focus, as supplied. */
  focus: string[]
  /** Experience statement as supplied, or null. Never inferred or rounded. */
  experience: string | null
  /** Short bio for cards. */
  bio: string
  /** Consultation schedule as supplied, or null when none was given. */
  availability: string | null
  /**
   * Treatment category slugs (src/data/treatments.ts) this person's supplied focus
   * explicitly names. Left empty when the focus does not map to a listed category.
   */
  categories: string[]
  portraitId: ImageId
  status: PublishStatus
}
