# Team profiles

Profiles live in `src/data/team.ts`. Pages and components read them through `src/services/team.ts`, so moving to a database later changes two functions, not the pages.

## Statuses

- `draft`: visible only in development or a private preview (`VITE_SHOW_DRAFT_PROFILES=true`). Not linked, not in the sitemap, and a direct URL shows "Profile not found" on the public site.
- `published`: visible to everyone.

All four current profiles are `draft`. A profile cannot be set to `published` until `validateTeam()` (src/lib/team.ts) passes. It requires:

1. every credential marked `verified: true`,
2. a licence record with a real number, marked `verified: true`,
3. a real portrait supplied by the clinic (`status: 'supplied'`, `verifiedPerson: true` in `src/data/images.ts`).

"Verified" means the clinic has seen the certificate or checked the registry record. It is not a statement that the wording is probably correct.

## Update a profile

Edit the entry in `src/data/team.ts`. Fields: name, role, credentials, licences, areas of practice (`focus`), experience, bio, consultation schedule, related treatment categories, portrait, status.

- Copy credential and experience wording exactly as supplied. Do not round, upgrade or add to it.
- `experience` and `availability` are `null` when nothing was supplied. Nothing is filled in.
- `categories` lists treatment category slugs only when the supplied focus names that area.

## Add a person

Copy an entry, give it a new lowercase-hyphen `slug`, add a portrait slot in `src/data/images.ts`, and keep `status: 'draft'` until verified.

## Authorized administrators

Today, edits are made in code by whoever maintains the repository. The booking-system phase adds a `doctors` table in Supabase with role-based access, so authorized staff can edit profiles from the admin area. Until that exists, there is no in-browser editor.
