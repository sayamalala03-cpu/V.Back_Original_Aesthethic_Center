// Converts original photos into responsive AVIF, WebP and JPG files.
//
// Usage:
//   1. Put an original in images-src/<folder>/<id>.jpg (or .png). The file name becomes the image id.
//      <folder> matches a folder in public/images, e.g. "hero" or "treatments/laser".
//   2. Run: npm run images
//   3. Paste the printed lines into the matching entry in src/data/images.ts.
//
// Requires the "sharp" dev dependency (see README for why it is needed).
import { readdir, mkdir, stat } from 'node:fs/promises'
import { join, extname, basename, relative, sep } from 'node:path'
import sharp from 'sharp'

const SRC = 'images-src'
const OUT = 'public/images'
const WIDTHS = [480, 768, 1200, 1600, 2000]
const QUALITY = { avif: 50, webp: 72, jpg: 78 }

async function walk(dir) {
  const out = []
  let entries = []
  try { entries = await readdir(dir, { withFileTypes: true }) } catch { return out }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p)
  }
  return out
}

const files = await walk(SRC)
if (files.length === 0) {
  console.log(`No originals found in ${SRC}/. Add photos there first.`)
  process.exit(0)
}

for (const file of files) {
  const rel = relative(SRC, file).split(sep)
  const folder = rel.slice(0, -1).join('/')
  const id = basename(file, extname(file))
  const outDir = join(OUT, folder)
  await mkdir(outDir, { recursive: true })

  const meta = await sharp(file).metadata()
  const widths = WIDTHS.filter((w) => w <= meta.width)
  if (widths.length === 0) widths.push(meta.width)
  const lists = { avif: [], webp: [], jpg: [] }

  for (const w of widths) {
    for (const fmt of ['avif', 'webp', 'jpg']) {
      const name = `${id}-${w}.${fmt}`
      const pipeline = sharp(file).rotate().resize({ width: w, withoutEnlargement: true })
      await (fmt === 'jpg'
        ? pipeline.jpeg({ quality: QUALITY.jpg, mozjpeg: true })
        : fmt === 'webp'
          ? pipeline.webp({ quality: QUALITY.webp })
          : pipeline.avif({ quality: QUALITY.avif })
      ).toFile(join(outDir, name))
      lists[fmt].push(`{ src: '/images/${folder}/${name}', width: ${w} }`)
    }
  }

  const largest = widths[widths.length - 1]
  const height = Math.round((meta.height / meta.width) * largest)
  console.log(`\n// ${id}  (${folder})`)
  console.log(`width: ${largest}, height: ${height},`)
  console.log(`fallback: '/images/${folder}/${id}-${largest}.jpg',`)
  for (const fmt of ['avif', 'webp', 'jpg']) console.log(`${fmt}: [${lists[fmt].join(', ')}],`)
  console.log('// Then set status ("licensed" needs credit, "supplied" for the clinic\'s own photos) and write the alt text.')
}
await stat(OUT)
