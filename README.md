# V.Back Original Aesthetic Center

Website and appointment system for V.Back Original Aesthetic Center.
Stack: React, TypeScript, Vite, Tailwind CSS 4, Motion, Three.js / React Three Fiber, Lucide, Supabase.

## Status

This is a scaffold. Nothing here has been installed, built or run yet.

| Area | State |
| --- | --- |
| Folder structure | Done, matches the agreed tree |
| Design tokens (colour, type, breakpoints, radius, shadow) | Done in `src/styles/tokens.css` |
| Treatment data | Service names only, taken from the clinic's brief |
| Routes | Declared in `src/App.tsx`. Pages are labeled placeholders |
| Home hero, 3D bottle, brand story | Approved in the design preview, not yet ported here |
| Image library (folders, manifest, `<Picture>`, optimizer script) | Done. All 19 images are labeled placeholders. See `docs/IMAGE-LIBRARY.md` |
| Team profiles (components, pages, publishing rules) | Built with the supplied wording, all `draft`. Licence numbers and verification still needed. See `docs/TEAM-PROFILES.md` |
| Logo and favicon | Temporary favicon. Final brand files come after logo approval |
| Booking and admin | Not built. Needs a Supabase project and an approved schema |
| Gallery, results, testimonials | Not built. Needs real, verified clinic content |

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
- Before-and-after photos need written patient authorization.

## Security

- Only `VITE_`-prefixed values reach the browser. Never put a service-role key or email key in one.
- Server secrets belong in Supabase Edge Function secrets.
- This is an appointment system, not an electronic medical record. It must not store diagnoses or medical history.

## Folder map

- `src/components/` reusable UI by area (navigation, hero, treatments, gallery, doctors, booking, shared)
- `src/pages/` one folder per route
- `src/admin/` staff dashboard (Dashboard, Appointments, Calendar, Doctors, Staff, Settings)
- `src/data/` site copy and treatment list. Edit here instead of inside components
- `src/lib/`, `src/services/`, `src/hooks/`, `src/animations/`, `src/types/` shared code
- `supabase/migrations/` database migrations. `supabase/seed.sql` is empty for now
- `public/brand/`, `public/images/`, `public/fonts/` static assets
