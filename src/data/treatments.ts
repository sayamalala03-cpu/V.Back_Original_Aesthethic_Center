import type { TreatmentCategory } from '../types/treatment'

/**
 * Service names come verbatim from the clinic's brief.
 * No technical specifications, risks, recovery times or results are stated here.
 * That content is added only after the clinic's medical team supplies and reviews it.
 * The surgical / non-surgical labels are an interpretation of the service names
 * and stay unverified until the clinic confirms them.
 */
export const categories: TreatmentCategory[] = [
  {
    slug: 'eye-surgery', number: '01', name: 'Eye Surgery', kind: 'mixed', kindVerified: false,
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
    slug: 'rhinoplasty', number: '02', name: 'Rhinoplasty', kind: 'surgical', kindVerified: false,
    treatments: [
      { slug: 'primary-rhinoplasty', name: 'Primary Rhinoplasty' },
      { slug: 'alar-reduction', name: 'Alar Reduction' },
      { slug: 'revision-rhinoplasty', name: 'Revision Rhinoplasty' },
    ],
  },
  {
    slug: 'face-lifting-and-contouring', number: '03', name: 'Face Lifting and Contouring', kind: 'mixed', kindVerified: false,
    treatments: [
      { slug: 'flower-lift', name: 'Flower Lift', note: 'Signature non-surgical thread lift + skin booster for V-line contouring' },
      { slug: 'philtrum-reduction', name: 'Philtrum Reduction' },
      { slug: 'facial-fat-grafting', name: 'Facial Fat Grafting' },
      { slug: 'facelift-rhytidectomy', name: 'Facelift (Rhytidectomy)' },
    ],
  },
  {
    slug: 'body-procedures', number: '04', name: 'Body Procedures', kind: 'surgical', kindVerified: false,
    treatments: [
      { slug: 'belly-button-surgery', name: 'Belly Button Surgery (Umbilicoplasty)' },
      { slug: 'breast-surgery-augmentation', name: 'Breast Surgery / Augmentation' },
      { slug: 'liposuction', name: 'Liposuction', note: 'Abdomen, Thighs, Arms' },
    ],
  },
  {
    slug: 'petit-and-non-surgical', number: '05', name: 'Petit and Non-Surgical Treatments', kind: 'non-surgical', kindVerified: false,
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
    slug: 'laser-and-energy-based', number: '06', name: 'Laser and Energy-Based Treatments', kind: 'non-surgical', kindVerified: false,
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
