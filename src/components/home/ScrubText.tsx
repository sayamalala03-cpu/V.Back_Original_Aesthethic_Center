import { useEffect, useRef } from 'react'

/** A statement whose words brighten as it scrolls through the viewport. Reduced motion: all words shown. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll<HTMLElement>('.hm-w'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      spans.forEach((s) => s.classList.add('on'))
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the block enters the bottom of the screen, 1 when it reaches ~35% from the top
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.55 + r.height * 0.5)))
      const lit = Math.round(p * spans.length)
      spans.forEach((s, i) => s.classList.toggle('on', i < lit))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [text])

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="hm-w" aria-hidden="true">{w}{i < words.length - 1 ? ' ' : ''}</span>
      ))}
    </p>
  )
}
