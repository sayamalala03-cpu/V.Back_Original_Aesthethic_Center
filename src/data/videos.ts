/**
 * Central video manifest. Every clip is AI-generated concept footage for the
 * fictional V.Back portfolio. None shows a real patient, clinician or result.
 * To replace a clip, change `src` and `poster` here only.
 */
export interface FilmClip {
  id: string
  title: string
  caption: string
  src: string
  poster: string
  width: number
  height: number
  /** Short description for assistive tech. */
  alt: string
}

export const filmsIntro = {
  eyebrow: 'Films',
  title: 'A quiet look inside',
  titleAccent: 'the concept.',
  note: 'Concept footage for a fictional portfolio clinic. The people, rooms and product shown are AI-generated and are not a real clinic, clinician, patient or product.',
}

export const films: FilmClip[] = [
  { id: 'reception', title: 'Reception', caption: 'Arrival, in marble and warm light.', src: '/videos/reception.mp4', poster: '/videos/reception-poster.jpg', width: 1280, height: 720,
    alt: 'AI-generated concept video: a receptionist at a marble desk beneath a gold V.Back sign, with white lilies.' },
  { id: 'serum', title: 'Signature serum', caption: 'A brand concept, not a confirmed product.', src: '/videos/serum.mp4', poster: '/videos/serum-poster.jpg', width: 720, height: 674,
    alt: 'AI-generated concept video: an amber serum bottle with a gold dropper among flowing golden liquid.' },
  { id: 'suite', title: 'Treatment suite', caption: 'A private room, softly lit.', src: '/videos/suite.mp4', poster: '/videos/suite-poster.jpg', width: 540, height: 960,
    alt: 'AI-generated concept video: a cream treatment chair, a brass side table with orchids and a device on a cart.' },
  { id: 'portrait', title: 'Portrait', caption: 'Editorial mood film.', src: '/videos/portrait.mp4', poster: '/videos/portrait-poster.jpg', width: 1280, height: 720,
    alt: 'AI-generated concept video: a side-profile portrait of a woman with glowing skin against a soft blurred background.' },
  { id: 'theatre', title: 'Operating theatre', caption: 'Illustrative only. Not a real procedure or surgeon.', src: '/videos/theatre.mp4', poster: '/videos/theatre-poster.jpg', width: 540, height: 960,
    alt: 'AI-generated concept video: a masked surgeon wearing magnifying loupes working in an operating room.' },
]
