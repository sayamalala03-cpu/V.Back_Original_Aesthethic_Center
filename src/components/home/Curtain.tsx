import { useEffect, useState } from 'react'

const KEY = 'vback-intro-seen'

/** True only on the first Home visit of a browser session, and never with reduced motion. */
export function shouldPlayIntro(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !window.sessionStorage.getItem(KEY)
  } catch {
    return false
  }
}

/**
 * Opening curtain: the brand mark, then the curtain lifts to reveal the hero.
 * Purely decorative: it never takes focus or clicks, and removes itself after the animation.
 */
export function Curtain() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    try { window.sessionStorage.setItem(KEY, '1') } catch { /* private mode: it just plays again */ }
    const t = window.setTimeout(() => setGone(true), 3200)
    return () => window.clearTimeout(t)
  }, [])
  if (gone) return null
  return (
    <div className="hm-curtain" aria-hidden="true">
      <span className="hm-curtain-mark">V.<i>Back</i></span>
    </div>
  )
}
