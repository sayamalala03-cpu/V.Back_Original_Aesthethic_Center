import { useState, type CSSProperties } from 'react'
import { FALLBACK_IMAGE, type ImageId } from '../../data/images'
import { buildSrcSet, getImage } from '../../lib/images'

interface Props {
  id: ImageId
  /** Layout hint for the browser, e.g. "(min-width: 960px) 50vw, 100vw". Defaults to full width. */
  sizes?: string
  className?: string
  style?: CSSProperties
  /** Override the manifest. Use sparingly. */
  priority?: boolean
}

/**
 * The only way pages should render a manifest image.
 * - AVIF, then WebP, then the fallback file
 * - explicit width and height, so nothing jumps while loading
 * - lazy by default. The one priority image loads early and is preloaded
 * - if any file fails, it swaps to a neutral fallback instead of a broken icon
 */
export function Picture({ id, sizes = '100vw', className, style, priority }: Props) {
  const img = getImage(id)
  const [failed, setFailed] = useState(false)
  const eager = priority ?? img.priority ?? false

  const avif = buildSrcSet(img.avif)
  const webp = buildSrcSet(img.webp)
  const jpg = buildSrcSet(img.jpg)

  const merged: CSSProperties = {
    width: '100%',
    height: 'auto',
    aspectRatio: `${img.width} / ${img.height}`,
    objectFit: 'cover',
    objectPosition: img.focal,
    ...style,
  }

  return (
    <>
      {eager && !failed && (avif || webp) && (
        <link
          rel="preload"
          as="image"
          type={avif ? 'image/avif' : 'image/webp'}
          imageSrcSet={avif ?? webp}
          imageSizes={sizes}
          fetchPriority="high"
        />
      )}
      <picture>
        {!failed && avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
        {!failed && webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
        <img
          src={failed ? FALLBACK_IMAGE : img.fallback}
          srcSet={failed ? undefined : jpg}
          sizes={failed ? undefined : jpg ? sizes : undefined}
          width={img.width}
          height={img.height}
          alt={img.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : 'auto'}
          className={className}
          style={merged}
          onError={() => setFailed(true)}
        />
      </picture>
    </>
  )
}
