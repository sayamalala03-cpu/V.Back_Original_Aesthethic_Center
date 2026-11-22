# V.Back Original Aesthetic Center

Website and appointment system for V.Back Original Aesthetic Center, a fictional clinic made for a portfolio. Every name, line of copy, treatment description and image is sample content.
Stack: React, TypeScript, Vite, Tailwind CSS 4, Motion, Three.js / React Three Fiber, Lucide, Supabase.

## Status

Phases 02 to 05 are in: the shared layout, home page, team profiles, image library, navigation with a Treatments mega menu, editorial footer, legal pages and the Patient Results page. Treatments, About, Journal, Contact and Consultation are still labeled placeholders. `npm install` and `npm run build` ran clean on the owner's computer at the scaffold stage (Nov 2026). Run `npm run build` again before deploying.

| Area | State |
| --- | --- |
| Folder structure | Done for what exists. `src/hooks/`, `src/admin/`, `public/brand/`, `public/fonts/` and `supabase/migrations/` are planned and not created yet |
| Design tokens (colour, type, breakpoints, radius, shadow) | Done in `src/styles/tokens.css`. Shared spacing, container widths, glass, button and dark-mode variables are in `src/styles/global.css` |
| Site layout | Done in `src/components/layout/`, styles in `src/styles/layout.css`. Skip link, scroll progress, header that goes glass after 40px and hides on scroll down, Treatments mega menu (hover, click or keyboard, Esc closes), full-screen mobile menu with a Treatments accordion and focus trap, gold Book a Consultation button, editorial footer with the fictional-portfolio disclaimer. Inline links start at 1120px. Every page is wrapped by `Layout` in `src/App.tsx` |
| Footer contact and social details | Shown as labeled placeholders ("not a real phone") until `src/data/site.ts` holds verified values. A placeholder is never a link |
| Home page | Built in Phases 03 and 04: cinematic hero, opening curtain, lazy 3D bottle with an SVG fallback, scroll-scrubbed story, specialties, approach, standards, booking. Clinic-dependent copy is marked as draft on the page |
| Treatment data | Service names only, taken from the clinic's brief. Page for it is still a placeholder |
| Legal pages | Privacy Policy, Terms of Use and Medical Disclaimer have sample copy in `src/data/legal.ts`, shown by `src/components/shared/LegalPage.tsx`. It is not legal advice and must be replaced by lawyer-reviewed text for any real clinic |
| Patient Results | Page explains the consent standard a gallery must meet and shows no photographs, testimonials or outcome claims. A real gallery needs written patient consent for every image (see `docs/IMAGE-LIBRARY.md`) |
| Image library (folders, manifest, `<Picture>`, optimizer script) | Done. All 23 manifest images are labeled placeholders, plus `fallback.svg`. See `docs/IMAGE-LIBRARY.md` |
| Team profiles (components, pages, publishing rules) | Built with the supplied wording, all `draft`. Licence numbers and verification still needed. See `docs/TEAM-PROFILES.md` |
| Logo and favicon | Temporary favicon. Final brand files come after logo approval |
| Booking and admin | Not built. Needs a Supabase project and an approved schema |
| Gallery, testimonials | Not built. Needs real, verified clinic content |

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

Run `npm run build` before deploying. It type-checks first.

## Content rules

- Do not publish doctors, qualifications, licences, results, testimonials, addresses or contact details until the clinic supplies and verifies them.
- Nothing in `src/data/site.ts` under `contact` is real. Every value is `null` on purpose.
- The surgical and non-surgical labels in `src/data/treatments.ts` are flagged `kindVerified: false` until the clinic confirms them.
- Before-and-after photos need written patient authorization. Patient Results is in the navigation because this is a fictional portfolio. For a real clinic, show only photographs with written consent, or hide the link until they exist.

## Security

- Only `VITE_`-prefixed values reach the browser. Never put a service-role key or email key in one.
- Server secrets belong in Supabase Edge Function secrets.
- This is an appointment system, not an electronic medical record. It must not store diagnoses or medical history.

## Folder map

- `src/components/` reusable UI by area (`layout`, `home`, `doctors`, `shared`). Treatment, gallery and booking components arrive with their phases
- `src/data/nav.ts` the header and footer links, including the legal links
- `src/data/legal.ts` sample copy for the three legal pages
- `src/pages/` one folder per route. `Legal/` holds the Privacy, Terms and Disclaimer pages
- `src/styles/` tokens, global, layout, home, team, motion and shared page styles (`pages.css`)
- `src/data/` site copy and treatment list. Edit here instead of inside components
- `src/lib/`, `src/services/`, `src/animations/`, `src/types/` shared code
- `supabase/seed.sql` is empty for now
- `public/images/` static images. `public/brand/`, `public/fonts/` and `src/admin/` are planned
