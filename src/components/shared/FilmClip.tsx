import { useEffect, useRef, useState } from 'react'
import type { FilmClip as Clip } from '../../data/videos'

/** Muted looping clip. Stays a still poster for reduced-motion and data-saver users; pause/play is always available. */
export function FilmPlayer({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still] = useState(() => {
    try {
      const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches || !!nav.connection?.saveData
    } catch { return false }
  })
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || still) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      else { v.pause(); setPlaying(false) }
    }, { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [still])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { v.play().then(() => setPlaying(true)).catch(() => {}) } else { v.pause(); setPlaying(false) }
  }

  return (
    <figure className="film" style={{ aspectRatio: `${clip.width} / ${clip.height}` }}>
      <video ref={ref} muted loop playsInline preload={still ? 'none' : 'metadata'} poster={clip.poster} aria-label={clip.alt}>
        <source src={clip.src} type="video/mp4" />
      </video>
      <button type="button" className="film-btn" onClick={toggle} aria-label={`${playing ? 'Pause' : 'Play'} ${clip.title} video`}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <figcaption><strong>{clip.title}</strong><span>{clip.caption}</span></figcaption>
    </figure>
  )
}
