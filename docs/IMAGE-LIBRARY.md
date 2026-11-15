# Image library

All site images are declared once in `src/data/images.ts`. Pages and components use `<Picture id="..." />` and never hard-code an image path, so replacing a photo never means editing a page.

## Folders (`public/images/`)

```
hero/  clinic/  team/  gallery/  products/  journal/
treatments/  (overview)
treatments/eye-surgery/  rhinoplasty/  face-contouring/  body/  petit/  laser/
fallback.svg  (shown if any image fails to load)
```

The six treatment folders sit inside `treatments/`. If you prefer them at the top level, change the `ImageFolder` type and the `folder` values in the manifest. No component changes.

## What is in there today

Every image is a labeled placeholder (ivory and champagne with a gold line), made for this project. There are no stock photos, no people and no results. Each placeholder says "PLACEHOLDER" on the image and in its alt text, so none can be mistaken for real clinic photography.

## Replace a placeholder with a real photo

1. Put the original in `images-src/<folder>/<id>.jpg` (for example `images-src/clinic/clinic-reception.jpg`).
2. Run `npm run images`. It writes AVIF, WebP and JPG files at 480, 768, 1200, 1600 and 2000 px wide (never larger than the original) into `public/images/<folder>/`.
3. Paste the printed `avif`, `webp`, `jpg`, `width`, `height` and `fallback` lines into that image's entry in `src/data/images.ts`.
4. Set `status` and write real alt text (see below).

`sharp` is a dev dependency used only by `npm run images`. It does the format conversion. It is not shipped to visitors.

## Status values

| status | meaning | extra field required |
| --- | --- | --- |
| `placeholder` | temporary art | none |
| `licensed` | stock photo with a licence that allows this use | `credit.license` |
| `original` | commissioned or generated art the clinic owns | none |
| `supplied` | photograph supplied by the clinic | none |

Only use stock images whose licence allows commercial use on a clinic website, and record the licence and source in `credit`. Do not present a stock or generated person as a doctor.

## Rules enforced by `validateManifest()` (`src/lib/images.ts`)

- Every image has alt text, a fallback file, and width and height.
- A `licensed` image needs a licence.
- A `patient-result` image must be `supplied` by the clinic and carry written consent with a reference. A placeholder, stock or generated image can never be a patient result.
- A team `portrait` must be `supplied` and marked `verifiedPerson`. A placeholder portrait must say it is a placeholder in its alt text.

## Writing alt text

Say what the photo shows in one plain sentence, without "image of". For a clinic photo, describe the room. For a treatment image, describe the scene, not a result. Never write alt text that promises an outcome.

## Loading behaviour

`<Picture>` serves AVIF, then WebP, then the fallback file. It sets explicit width and height so the page does not jump, loads lazily by default, and swaps to `fallback.svg` if a file fails. The one image marked `priority: true` (the hero) loads early at high priority and is preloaded when AVIF or WebP files exist.

Pass a `sizes` hint so phones download the small file, for example `sizes="(min-width: 960px) 50vw, 100vw"`.

## Visual direction for the real photography

Korean-inspired beauty editorial. Ivory and champagne interiors, natural skin, restrained gold lighting, modern equipment, minimal compositions. Use one consistent grade and keep faces in the upper third so crops stay safe. Set `focal` per image when a crop needs help.
