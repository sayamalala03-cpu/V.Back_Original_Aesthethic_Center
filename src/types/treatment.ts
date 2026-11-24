export type TreatmentKind = 'surgical' | 'non-surgical' | 'mixed'

/** One visual identity per chapter. Same typography and colors, different composition (see styles/treatments.css). */
export type CategoryLayout = 'gaze' | 'profile' | 'contour' | 'sculpt' | 'refine' | 'device'

/**
 * Editable sections of a treatment page. Each is a list of paragraphs.
 * Leave a section out and the page shows a clearly marked "to be supplied" block.
 * Risks, limitations, recovery and aftercare must be written or approved by qualified medical professionals.
 */
export interface TreatmentDetail {
  overview?: string[]
  assessment?: string[]
  risks?: string[]
  recovery?: string[]
}

export interface Treatment {
  slug: string
  name: string
  /** Wording supplied by the clinic. Never add specifications that were not supplied. */
  note?: string
  /** Short description supplied by the clinic. Preliminary portfolio copy. */
  summary?: string
  /** Shown beside the page when part of the treatment is a concept that still needs verification. */
  verifyNote?: string
  detail?: TreatmentDetail
}

export interface TreatmentCategory {
  slug: string
  number: string
  name: string
  /** Shown beside the name, e.g. "Nose Surgery". */
  subtitle?: string
  /** Surgical or non-surgical labeling. Marked unverified until the clinic confirms it. */
  kind: TreatmentKind
  kindVerified: boolean
  layout: CategoryLayout
  /** Short line for the landing page and menus. */
  tagline: string
  /** Editorial heading on the category page. */
  heading: string
  /** Introduction paragraphs. */
  intro: string[]
  /** True when the introduction was written as neutral stand-in copy because the brief did not supply one. */
  introDraft: boolean
  /** Optional consultation call to action copy supplied in the brief. */
  cta?: { body?: string; label?: string }
  /** Slugs of the chapters offered as "related" at the end of the page. */
  related: string[]
  treatments: Treatment[]
}
