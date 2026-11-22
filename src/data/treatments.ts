import type { TreatmentCategory } from '../types/treatment'

/**
 * Treatment content for the fictional V.Back Original Aesthetic Center. Portfolio sample copy.
 *
 * Rules for editing this file:
 * - Treatment names come verbatim from the clinic's brief. Keep them.
 * - `summary`, `heading` and `intro` are preliminary portfolio copy. Where the brief did not supply
 *   an introduction, `introDraft: true` marks the neutral stand-in so the page says so.
 * - Never add technical specifications, risks, recovery times or results here unless qualified medical
 *   professionals have supplied and approved them. Put approved text in `detail`.
 * - The surgical / non-surgical labels are an interpretation of the service names and stay
 *   unverified until the clinic confirms them.
 */
const INTRO_TAIL = 'Each procedure requires individual professional assessment. Treatment information should be reviewed and approved by qualified medical professionals.'

export const categories: TreatmentCategory[] = [
  {
    slug: 'eye-surgery', number: '01', name: 'Eye Surgery', kind: 'mixed', kindVerified: false, layout: 'gaze',
    tagline: 'Enhance your gaze with precision and care.',
    heading: 'Refined Vision. Timeless Beauty.',
    intro: [
      'Explore the V.Back Original eye collection, an organized introduction to the eye-area procedure categories listed below.',
      INTRO_TAIL,
    ],
    introDraft: true,
    related: ['rhinoplasty', 'face-lifting-and-contouring'],
    treatments: [
      { slug: 'double-eyelid-surgery', name: 'Double Eyelid Surgery', note: 'Incisional and Non-incisional' },
      { slug: 'epicanthoplasty', name: 'Epicanthoplasty' },
      { slug: 'canthoplasty', name: 'Canthoplasty' },
      { slug: 'ptosis-correction', name: 'Ptosis Correction' },
      { slug: 'under-eye-fat-repositioning', name: 'Under-Eye Fat Repositioning' },
      { slug: 'upper-and-lower-blepharoplasty', name: 'Upper and Lower Blepharoplasty' },
      { slug: 'eyelid-fat-removal', name: 'Eyelid Fat Removal' },
      { slug: 'eye-revision-surgery', name: 'Eye Revision Surgery' },
    ],
  },
  {
    slug: 'rhinoplasty', number: '02', name: 'Rhinoplasty', subtitle: 'Nose Surgery', kind: 'surgical', kindVerified: false, layout: 'profile',
    tagline: 'Refine your profile with natural elegance.',
    heading: 'Facial Harmony Through Thoughtful Refinement.',
    intro: [
      'Explore the V.Back Original rhinoplasty collection, featuring different procedure categories associated with nose aesthetics. This section provides an organized introduction to primary rhinoplasty, nostril reshaping, and revision procedures.',
      INTRO_TAIL,
    ],
    introDraft: false,
    cta: { body: 'Discover the treatment categories and learn why personalized assessment and professional consultation are important before considering any aesthetic procedure.' },
    related: ['face-lifting-and-contouring', 'eye-surgery'],
    treatments: [
      { slug: 'primary-rhinoplasty', name: 'Primary Rhinoplasty', summary: 'A procedure category for primary nose surgery.' },
      { slug: 'alar-reduction', name: 'Alar Reduction', note: 'Nostril reshaping', summary: 'A procedure category focused on nostril reshaping.' },
      { slug: 'revision-rhinoplasty', name: 'Revision Rhinoplasty', summary: 'A category for revision nose surgery following a previous rhinoplasty procedure.' },
    ],
  },
  {
    slug: 'face-lifting-and-contouring', number: '03', name: 'Face Lifting and Contouring', kind: 'mixed', kindVerified: false, layout: 'contour',
    tagline: 'Redefine your contours with advanced techniques.',
    heading: 'Define Your Natural Contours.',
    intro: [
      'Explore the V.Back Original face lifting and contouring collection, an organized introduction to facial treatment categories, from a signature non-surgical concept to surgical procedures.',
      INTRO_TAIL,
    ],
    introDraft: true,
    cta: { label: 'Discover Facial Treatments' },
    related: ['rhinoplasty', 'petit-and-non-surgical'],
    treatments: [
      {
        slug: 'flower-lift', name: 'Flower Lift',
        note: 'Signature non-surgical thread lift + skin booster for V-line contouring',
        summary: 'Signature non-surgical thread lift + skin booster for V-line contouring.',
        verifyNote: 'A signature treatment concept supplied in the original project brief. Its exact technique, components and clinical details require verification.',
      },
      { slug: 'philtrum-reduction', name: 'Philtrum Reduction', summary: 'A procedure category involving the philtrum area.' },
      { slug: 'facial-fat-grafting', name: 'Facial Fat Grafting', note: 'Autologous fat transfer', summary: 'A procedure category involving autologous fat transfer for facial applications.' },
      { slug: 'facelift-rhytidectomy', name: 'Facelift (Rhytidectomy)', summary: 'A facial surgical procedure category.' },
    ],
  },
  {
    slug: 'body-procedures', number: '04', name: 'Body Procedures', kind: 'surgical', kindVerified: false, layout: 'sculpt',
    tagline: 'Shape a more confident you.',
    heading: 'A More Sculpted You.',
    intro: [
      'Explore the V.Back Original body collection, an organized introduction to the body procedure categories listed below.',
      INTRO_TAIL,
    ],
    introDraft: true,
    related: ['petit-and-non-surgical', 'laser-and-energy-based'],
    treatments: [
      { slug: 'belly-button-surgery', name: 'Belly Button Surgery (Umbilicoplasty)' },
      { slug: 'breast-surgery-augmentation', name: 'Breast Surgery / Augmentation' },
      { slug: 'liposuction', name: 'Liposuction', note: 'Abdomen, Thighs, Arms' },
    ],
  },
  {
    slug: 'petit-and-non-surgical', number: '05', name: 'Petit and Non-Surgical Treatments', kind: 'non-surgical', kindVerified: false, layout: 'refine',
    tagline: 'Refresh your beauty with subtle elegance.',
    heading: 'Enhance Naturally.',
    intro: [
      'Explore the V.Back Original petit and non-surgical collection, an organized introduction to the injectable and skin booster treatment categories listed below.',
      INTRO_TAIL,
    ],
    introDraft: true,
    related: ['face-lifting-and-contouring', 'laser-and-energy-based'],
    treatments: [
      { slug: 'rejuran-healer', name: 'Rejuran Healer' },
      { slug: 'lip-rejuran', name: 'Lip Rejuran' },
      { slug: 'juvelook', name: 'Juvelook' },
      { slug: 'exosome-skin-booster', name: 'Exosome Skin Booster' },
      { slug: 'lip-and-dermal-fillers', name: 'Lip and Dermal Fillers' },
      { slug: 'botox', name: 'Botox' },
      { slug: 'radiance-pdrn-injections', name: 'Radiance / PDRN Injections' },
    ],
  },
  {
    slug: 'laser-and-energy-based', number: '06', name: 'Laser and Energy-Based Treatments', kind: 'non-surgical', kindVerified: false, layout: 'device',
    tagline: 'Reveal healthier, radiant skin.',
    heading: 'Advanced Care for Lasting Radiance.',
    intro: [
      'Explore the V.Back Original laser and energy-based collection, an organized introduction to the device-based treatment categories listed below.',
      INTRO_TAIL,
    ],
    introDraft: true,
    related: ['face-lifting-and-contouring', 'petit-and-non-surgical'],
    treatments: [
      { slug: 'ultherapy', name: 'Ultherapy' },
      { slug: 'shrink-universe-hifu', name: 'Shrink Universe (HIFU)' },
      { slug: 'volnewmer-rf', name: 'Volnewmer (RF)' },
      { slug: 'co2-laser', name: 'CO2 Laser' },
      { slug: 'fraxel-laser', name: 'Fraxel Laser' },
      { slug: 'accento', name: 'Accento' },
    ],
  },
]
