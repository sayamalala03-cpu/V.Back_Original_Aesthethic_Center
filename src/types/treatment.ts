export type TreatmentKind = 'surgical' | 'non-surgical' | 'mixed'

export interface Treatment {
  slug: string
  name: string
  /** Wording supplied by the clinic. Never add specifications that were not supplied. */
  note?: string
}

export interface TreatmentCategory {
  slug: string
  number: string
  name: string
  /** Surgical or non-surgical labeling. Marked unverified until the clinic confirms it. */
  kind: TreatmentKind
  kindVerified: boolean
  treatments: Treatment[]
}
