/**
 * THE film manifest. Components refer to a film by id; files live in public/films/.
 * To replace a film: export a new silent H.264 .mp4 (and a poster .jpg) into public/films/, then edit its entry here.
 *
 * All five are concept films made with AI by the project owner, used as temporary portfolio imagery.
 * They show no real person, patient, clinician, clinic, product or result, and every alt text says so.
 * They have no sound. Keep clips short and small (under about 500 KB each).
 */
export interface Film {
  id: string
  /** H.264 .mp4 with no audio track. */
  src: string
  /** Still frame shown before the film loads and when it cannot play. */
  poster: string
  width: number
  height: number
  seconds: number
  /** Short caption title. */
  title: string
  /** Describes the film. Must start with "AI-generated concept film". */
  alt: string
  /** CSS object-position, so the subject stays inside the crop. */
  focal?: string
}

export const films = {
  reception: {
    id: 'reception', src: '/films/film-reception.mp4', poster: '/films/film-reception-poster.jpg',
    width: 1280, height: 720, seconds: 8, title: 'Reception',
    alt: 'AI-generated concept film: the camera glides toward a curved marble reception desk under a gold V.Back sign, where a receptionist smiles. It is not a real clinic or person.',
    focal: '50% 50%',
  },
  serum: {
    id: 'serum', src: '/films/film-serum.mp4', poster: '/films/film-serum-poster.jpg',
    width: 720, height: 672, seconds: 5, title: 'The serum',
    alt: 'AI-generated concept film: a gold-capped serum bottle turns among ribbons of amber liquid and floating droplets. It is a brand concept, not a confirmed clinic product.',
    focal: '50% 50%',
  },
  portrait: {
    id: 'portrait', src: '/films/film-portrait.mp4', poster: '/films/film-portrait-poster.jpg',
    width: 1280, height: 720, seconds: 8, title: 'Skin, in soft light',
    alt: 'AI-generated concept film: a woman in profile looks down, her skin glowing against a blurred champagne background. She is not a real patient or client.',
    focal: '28% 50%',
  },
  room: {
    id: 'room', src: '/films/film-treatment-room.mp4', poster: '/films/film-treatment-room-poster.jpg',
    width: 576, height: 1024, seconds: 10, title: 'Treatment room',
    alt: 'AI-generated concept film: the camera passes a flower table and an arched alcove to a cream treatment chair beside a device cart. It is not a real clinic.',
    focal: '50% 50%',
  },
  clinician: {
    id: 'clinician', src: '/films/film-clinician.mp4', poster: '/films/film-clinician-poster.jpg',
    width: 576, height: 1024, seconds: 10, title: 'In the clinic',
    alt: 'AI-generated concept film: a clinician in blue scrubs, a mask and magnifying loupes works with fine instruments. This is not a real clinician or procedure.',
    focal: '40% 50%',
  },
} satisfies Record<string, Film>

export type FilmId = keyof typeof films

/** Checks the manifest. Returns a list of problems (empty = valid). */
export function validateFilms(list: readonly Film[] = Object.values(films)): string[] {
  const errors: string[] = []
  for (const f of list) {
    const tag = `[${f.id}]`
    if (!/^AI-generated concept film/i.test(f.alt)) errors.push(`${tag} alt text must start with "AI-generated concept film"`)
    if (!f.src.endsWith('.mp4')) errors.push(`${tag} src must be an .mp4 file`)
    if (!f.poster) errors.push(`${tag} needs a poster image`)
    if (!(f.width > 0 && f.height > 0)) errors.push(`${tag} needs width and height`)
  }
  return errors
}
