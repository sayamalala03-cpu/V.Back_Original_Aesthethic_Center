import { images, type ImageId } from '../data/images'
import type { ImageEntry, ImageSource } from '../types/image'

export function getImage(id: ImageId): ImageEntry {
  return images[id]
}

export function buildSrcSet(sources: readonly ImageSource[] | undefined): string | undefined {
  if (!sources || sources.length === 0) return undefined
  return [...sources]
    .sort((a, b) => a.width - b.width)
    .map((s) => `${s.src} ${s.width}w`)
    .join(', ')
}

/**
 * Safety and quality rules for the manifest. Returns a list of problems (empty = valid).
 * Run in development and in the test suite so an unsafe entry cannot ship quietly.
 */
export function validateManifest(entries: readonly ImageEntry[] = Object.values(images)): string[] {
  const errors: string[] = []
  const seen = new Set<string>()

  for (const e of entries) {
    const tag = `[${e.id}]`
    if (seen.has(e.id)) errors.push(`${tag} duplicate id`)
    seen.add(e.id)

    if (!e.alt.trim()) errors.push(`${tag} alt text is empty`)
    if (!e.fallback) errors.push(`${tag} missing fallback file`)
    if (!(e.width > 0 && e.height > 0)) errors.push(`${tag} needs width and height to avoid layout shift`)

    if (e.status === 'licensed' && !e.credit?.license) {
      errors.push(`${tag} licensed image needs credit.license`)
    }

    // Patient results: real, supplied photographs with written consent only.
    if (e.subject === 'patient-result') {
      if (e.status !== 'supplied') errors.push(`${tag} a patient result must be a photograph supplied by the clinic, never a placeholder, stock or generated image`)
      if (!e.consent?.written || !e.consent.reference) errors.push(`${tag} a patient result needs written consent with a reference`)
    }

    // Portraits: a stand-in may never pose as a real professional.
    if (e.subject === 'portrait') {
      if (e.status === 'placeholder') {
        if (!/^placeholder/i.test(e.alt)) errors.push(`${tag} a placeholder portrait must say it is a placeholder in its alt text`)
      } else if (e.folder === 'team' && !(e.status === 'supplied' && e.verifiedPerson)) {
        errors.push(`${tag} a team portrait must be supplied by the clinic and marked verifiedPerson`)
      }
    }

    if (e.priority && !e.avif?.length && !e.webp?.length && e.status !== 'placeholder') {
      errors.push(`${tag} a priority image should ship AVIF or WebP`)
    }
  }
  return errors
}
