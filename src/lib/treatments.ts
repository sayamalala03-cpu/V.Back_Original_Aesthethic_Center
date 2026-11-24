import { categories } from '../data/treatments'
import type { Treatment, TreatmentCategory, TreatmentKind } from '../types/treatment'

export const kindLabel: Record<TreatmentKind, string> = {
  surgical: 'Surgical',
  'non-surgical': 'Non-surgical',
  mixed: 'Surgical and non-surgical',
}

export function findCategory(slug: string | undefined): TreatmentCategory | undefined {
  return categories.find((c) => c.slug === slug)
}

export function findTreatment(categorySlug: string | undefined, treatmentSlug: string | undefined): Treatment | undefined {
  return findCategory(categorySlug)?.treatments.find((t) => t.slug === treatmentSlug)
}

/** The treatments before and after this one inside its chapter. Undefined at either end. */
export function neighbours(category: TreatmentCategory, treatmentSlug: string): { prev?: Treatment; next?: Treatment } {
  const i = category.treatments.findIndex((t) => t.slug === treatmentSlug)
  return { prev: category.treatments[i - 1], next: category.treatments[i + 1] }
}

export function relatedCategories(category: TreatmentCategory): TreatmentCategory[] {
  return category.related.map((s) => findCategory(s)).filter((c): c is TreatmentCategory => c !== undefined)
}

/** Checks the content for mistakes. Returns a list of problems (empty = valid). Run in tests or development. */
export function validateTreatments(list: readonly TreatmentCategory[] = categories): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()
  for (const c of list) {
    if (slugs.has(c.slug)) errors.push(`[${c.slug}] duplicate category slug`)
    slugs.add(c.slug)
    for (const r of c.related) if (!list.some((x) => x.slug === r)) errors.push(`[${c.slug}] related category "${r}" does not exist`)
    const tSlugs = new Set<string>()
    for (const t of c.treatments) {
      if (tSlugs.has(t.slug)) errors.push(`[${c.slug}/${t.slug}] duplicate treatment slug`)
      tSlugs.add(t.slug)
    }
  }
  return errors
}

/** True when two supplied strings say the same thing, ignoring case and a trailing full stop. */
export function sameText(a: string | undefined, b: string | undefined): boolean {
  const n = (x?: string) => (x ?? '').trim().replace(/\.$/, '').toLowerCase()
  return n(a) !== '' && n(a) === n(b)
}
