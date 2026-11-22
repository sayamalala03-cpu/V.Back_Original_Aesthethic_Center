import { useEffect, useRef, useState } from 'react'
import type { Film } from '../../data/films'

/**
 * A short, silent, looping film.
 * - Plays only while on screen, and pauses when scrolled away.
 * - Never autoplays with "reduce motion" on or on a data-saver connection. The poster shows and a button plays it.
 * - Always has a visible pause / play button, so nobody is stuck with motion they cannot stop.
 * - If the file cannot play, the poster image stays.
 */
export function FilmFrame({ film }: { film: Film }) {
  const ref = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || typeof IntersectionObserver === 'undefined') return
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => undefined)
        } else {
          v.pause()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => undefined)
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  return (
    <div className="fl-media">
      <video
        ref={ref}
        className="fl-video"
        poster={film.poster}
        width={film.width}
        height={film.height}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={film.alt}
        style={film.focal ? { objectPosition: film.focal } : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={film.src} type="video/mp4" />
      </video>
      <button type="button" className="fl-btn" onClick={toggle} aria-label={`${playing ? 'Pause' : 'Play'} film: ${film.title}`}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
        )}
      </button>
    </div>
  )
}
