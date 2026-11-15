import type { ImageEntry, ImageFolder, ImageSubject } from '../types/image'

/**
 * THE image manifest. Pages and components refer to images by id only.
 * To replace a temporary image: export new files into public/images/<folder>/,
 * then change that one entry here. No component needs to change.
 *
 * Every entry below is a labeled placeholder made for this project.
 * No stock photo, no real person and no patient result is used.
 *
 * Visual direction for the real photography:
 * Korean-inspired beauty editorial, ivory and champagne interiors, natural skin,
 * restrained gold lighting, modern equipment, minimalist compositions.
 * Keep one consistent grade across the whole site.
 */
function ph(
  id: string,
  folder: ImageFolder,
  width: number,
  height: number,
  what: string,
  subject: ImageSubject = 'scene',
  extra: Partial<ImageEntry> = {},
): ImageEntry {
  return {
    id,
    folder,
    width,
    height,
    status: 'placeholder',
    subject,
    alt: `Placeholder for ${what}`,
    fallback: `/images/${folder}/${id}.svg`,
    ...extra,
  }
}

export const images = {
  // hero
  'hero-main': ph('hero-main', 'hero', 1600, 2000, 'the main hero photograph: a calm ivory interior with soft gold light', 'scene', { priority: true, focal: '50% 30%' }),
  'hero-accent': ph('hero-accent', 'hero', 900, 1000, 'a smaller hero detail photograph', 'scene'),

  // clinic (replace with real photographs of the clinic)
  'clinic-reception': ph('clinic-reception', 'clinic', 1600, 1000, 'a photograph of the clinic reception'),
  'clinic-consultation': ph('clinic-consultation', 'clinic', 1600, 1000, 'a photograph of the consultation room'),
  'clinic-treatment-room': ph('clinic-treatment-room', 'clinic', 1600, 1000, 'a photograph of a treatment room'),
  'clinic-technology': ph('clinic-technology', 'clinic', 1600, 1000, 'a photograph of clinic equipment'),

  // treatments
  'treatments-overview': ph('treatments-overview', 'treatments', 1600, 1000, 'the treatments overview image'),
  'eye-surgery-hero': ph('eye-surgery-hero', 'treatments/eye-surgery', 1600, 1000, 'the eye surgery category image'),
  'rhinoplasty-hero': ph('rhinoplasty-hero', 'treatments/rhinoplasty', 1600, 1000, 'the rhinoplasty category image'),
  'face-contouring-hero': ph('face-contouring-hero', 'treatments/face-contouring', 1600, 1000, 'the face lifting and contouring category image'),
  'body-hero': ph('body-hero', 'treatments/body', 1600, 1000, 'the body procedures category image'),
  'petit-hero': ph('petit-hero', 'treatments/petit', 1600, 1000, 'the petit and non-surgical category image'),
  'laser-hero': ph('laser-hero', 'treatments/laser', 1600, 1000, 'the laser and energy-based category image'),

  // team: portrait frames only. Never a stand-in face. Replace each with the person's own supplied photograph.
  'team-mendoza-reyes': ph('team-mendoza-reyes', 'team', 1200, 1500, 'a portrait of Dr. Mendoza-Reyes. The clinic will supply the photograph', 'portrait', { focal: '50% 25%' }),
  'team-santos': ph('team-santos', 'team', 1200, 1500, 'a portrait of Dr. Santos. The clinic will supply the photograph', 'portrait', { focal: '50% 25%' }),
  'team-bautista': ph('team-bautista', 'team', 1200, 1500, 'a portrait of Camille Joy Bautista. The clinic will supply the photograph', 'portrait', { focal: '50% 25%' }),
  'team-villanueva': ph('team-villanueva', 'team', 1200, 1500, 'a portrait of Marites "Tess" Villanueva. The clinic will supply the photograph', 'portrait', { focal: '50% 25%' }),
  'team-portrait-placeholder': ph('team-portrait-placeholder', 'team', 1200, 1500, 'a doctor portrait. The clinic will supply the real photograph', 'portrait', { focal: '50% 25%' }),

  // gallery: clinic environment only. Patient results need consent entries (see rules in lib/images.ts).
  'gallery-environment-01': ph('gallery-environment-01', 'gallery', 1600, 1200, 'a clinic environment photograph'),
  'gallery-environment-02': ph('gallery-environment-02', 'gallery', 1600, 1200, 'a clinic environment photograph'),
  'gallery-environment-03': ph('gallery-environment-03', 'gallery', 1600, 1200, 'a clinic environment photograph'),

  // products and journal
  'product-placeholder': ph('product-placeholder', 'products', 1200, 1200, 'a product photograph', 'product'),
  'journal-cover-placeholder': ph('journal-cover-placeholder', 'journal', 1600, 900, 'a journal article cover image'),
} satisfies Record<string, ImageEntry>

export type ImageId = keyof typeof images

/** Treatment category slug (src/data/treatments.ts) to its hero image. */
export const categoryImages: Record<string, ImageId> = {
  'eye-surgery': 'eye-surgery-hero',
  'rhinoplasty': 'rhinoplasty-hero',
  'face-lifting-and-contouring': 'face-contouring-hero',
  'body-procedures': 'body-hero',
  'petit-and-non-surgical': 'petit-hero',
  'laser-and-energy-based': 'laser-hero',
}

export const FALLBACK_IMAGE = '/images/fallback.svg'
