import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Thin gold-to-orange bar at the top of the window showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${ratio})`
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (frame) cancelAnimationFrame(frame)
    }
    // pathname: the page height changes on navigation, so measure again.
  }, [pathname])

  return <div ref={ref} className="progress" aria-hidden="true" />
}
