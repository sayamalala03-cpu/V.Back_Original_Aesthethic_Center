import type { TeamMember } from '../types/team'

/**
 * Team profiles, wording supplied by the clinic.
 *
 * All four are 'draft' because no PRC (or other) licence numbers were supplied, and no
 * credential has been checked against a document or registry yet. To publish a profile:
 *   1. add each licence number to `licenses` and set `verified: true` after checking it,
 *   2. set `verified: true` on each credential the clinic has confirmed,
 *   3. replace the portrait placeholder with a real photograph (see docs/IMAGE-LIBRARY.md),
 *   4. change `status` to 'published'.
 * `validateTeam()` refuses to publish a profile that skips step 1 or 2.
 */
export const team: TeamMember[] = [
  {
    slug: 'dr-clarissa-mendoza-reyes',
    name: 'Dr. Clarissa Mendoza-Reyes, MD, FPDS',
    role: 'Medical Director & Board-Certified Dermatologist',
    group: 'physician',
    credentials: [
      { text: 'Doctor of Medicine, University of Santo Tomas (UST)', verified: false },
      { text: 'Fellow, Philippine Dermatological Society (FPDS)', verified: false },
      { text: 'Member, Philippine Medical Association (PMA)', verified: false },
    ],
    licenses: [{ body: 'PRC', number: null, verified: false }],
    focus: ['Medical & Cosmetic Dermatology', 'Acne & Scar Revision', 'Laser Skin Rejuvenation', 'Anti-Aging Protocols'],
    experience: 'Over 9 years of clinical experience in dermatology and aesthetic medicine',
    bio: "Dr. Mendoza-Reyes leads V.Back's skin health programs. She combines evidence-based dermatological care with non-invasive energy devices to help patients achieve clear, healthy, and naturally radiant skin tailored to tropical climates.",
    availability: 'Tuesdays, Thursdays & Saturdays, 10:00 AM – 4:00 PM',
    categories: ['laser-and-energy-based'],
    portraitId: 'team-mendoza-reyes',
    status: 'draft',
  },
  {
    slug: 'dr-miguel-lorenzo-santos',
    name: 'Dr. Miguel Lorenzo Santos, MD',
    role: 'Aesthetic & Anti-Aging Physician',
    group: 'physician',
    credentials: [
      { text: 'Doctor of Medicine, Far Eastern University – NRMF', verified: false },
      { text: 'Certified Practitioner in Aesthetic Medicine & Clinical Cosmetology', verified: false },
      { text: 'Advanced Training in Non-Surgical Facial Contouring & Skin Boosters (Seoul, South Korea)', verified: false },
    ],
    licenses: [{ body: 'PRC', number: null, verified: false }],
    focus: ['V-Line Contouring', 'Collagen-Stimulating Skin Boosters', 'RF & HIFU Skin Tightening', 'Underarm & Body Brightening'],
    experience: null,
    bio: 'Dr. Santos specializes in subtle, natural-looking facial enhancements and lifting treatments. Inspired by Korean aesthetic standards, his approach focuses on restoring skin elasticity and balanced proportions without altering a client\'s natural features.',
    availability: 'Mondays, Wednesdays & Fridays, 1:00 PM – 6:00 PM',
    categories: ['face-lifting-and-contouring', 'petit-and-non-surgical', 'laser-and-energy-based'],
    portraitId: 'team-santos',
    status: 'draft',
  },
  {
    slug: 'camille-joy-bautista',
    name: 'Camille Joy Bautista, RN',
    role: 'Head Aesthetic Nurse & Senior Facialist',
    group: 'aesthetic-nursing',
    credentials: [
      { text: 'Registered Nurse (PRC Licensed)', verified: false },
      { text: 'TESDA Beauty Care NC II Certified', verified: false },
      { text: 'Certified Hydra-Peel & Laser Safety Technician', verified: false },
    ],
    licenses: [{ body: 'PRC', number: null, verified: false }],
    focus: ['V.Back Signature Glass Skin Facials', 'Diamond Peel', 'Acne Extraction', 'Pre- and Post-Procedure Skin Care'],
    experience: null,
    bio: 'Combining her nursing background with advanced aesthetic training, Camille ensures every facial and skin rejuvenation session meets strict medical hygiene standards while delivering a deeply relaxing, spa-grade experience.',
    availability: null,
    categories: [],
    portraitId: 'team-bautista',
    status: 'draft',
  },
  {
    slug: 'marites-tess-villanueva',
    name: 'Marites "Tess" Villanueva, LMT',
    role: 'Lead Wellness Therapist',
    group: 'wellness',
    credentials: [
      { text: 'DOH-Licensed Massage Therapist (LMT)', verified: false },
      { text: 'Certified in Therapeutic Reflexology, Hot Stone & Ventosa Therapy', verified: false },
    ],
    licenses: [{ body: 'DOH', number: null, verified: false }],
    focus: ['Signature Full-Body Relaxation Massage', 'Lymphatic Drainage', 'Detox Body Scrubs', 'Stress & Tension Relief'],
    experience: '7 years of hospitality and clinical spa experience',
    bio: "Tess leads V.Back's holistic wellness wing, helping clients unwind, improve circulation, and complement their external skin treatments with restorative body care.",
    availability: null,
    categories: [],
    portraitId: 'team-villanueva',
    status: 'draft',
  },
]
