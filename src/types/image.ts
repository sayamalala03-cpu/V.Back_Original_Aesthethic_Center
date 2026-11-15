export type ImageFolder =
  | 'hero'
  | 'clinic'
  | 'treatments'
  | 'treatments/eye-surgery'
  | 'treatments/rhinoplasty'
  | 'treatments/face-contouring'
  | 'treatments/body'
  | 'treatments/petit'
  | 'treatments/laser'
  | 'team'
  | 'gallery'
  | 'products'
  | 'journal'

/**
 * placeholder: temporary art made for this project, replaced later
 * licensed:    stock photo with a license that permits this use (credit required below)
 * original:    commissioned or generated conceptual art the clinic owns the rights to
 * supplied:    photograph supplied by the clinic
 */
export type ImageStatus = 'placeholder' | 'licensed' | 'original' | 'supplied'

export type ImageSubject = 'scene' | 'portrait' | 'patient-result' | 'product'

export interface ImageSource {
  src: string
  /** Pixel width of this file. Used for the srcset width descriptor. */
  width: number
}

export interface ImageEntry {
  id: string
  folder: ImageFolder
  /** Describes what the image shows. For a placeholder, say it is a placeholder. */
  alt: string
  /** Intrinsic size of the largest file. Prevents layout shift. */
  width: number
  height: number
  status: ImageStatus
  subject: ImageSubject
  /** Universal fallback file (jpg, png or svg). Always required. */
  fallback: string
  avif?: readonly ImageSource[]
  webp?: readonly ImageSource[]
  jpg?: readonly ImageSource[]
  /** CSS object-position, e.g. "50% 20%", so faces stay inside the crop. */
  focal?: string
  /** True for the single above-the-fold image on a page. Loads eagerly. */
  priority?: boolean
  credit?: { license: string; author?: string; sourceUrl?: string }
  /** Required for patient results. Written consent on file, with a reference. */
  consent?: { written: boolean; reference: string }
  /** True only when the person shown is a real, verified clinic professional. */
  verifiedPerson?: boolean
}
