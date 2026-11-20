import { Component, lazy, Suspense, useCallback, useEffect, useState, type CSSProperties, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Picture } from '../shared/Picture'
import { site } from '../../data/site'
import { routes } from '../../lib/routes'

const HeroBottle = lazy(() => import('./HeroBottle'))

/** If the 3D chunk fails to load, show nothing extra. The SVG bottle stays. */
class Quiet extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err: Error, info: ErrorInfo) { console.warn('3D bottle unavailable, showing fallback.', err, info.componentStack) }
  render() { return this.state.failed ? null : this.props.children }
}

export function Hero() {
  const [wantGl, setWantGl] = useState(false)
  const [glOn, setGlOn] = useState(false)
  const onState = useCallback((ok: boolean) => setGlOn(ok), [])

  // Load the 3D bottle only when the browser is idle, and never on data-saver connections.
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (nav.connection?.saveData) return
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setWantGl(true), { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(() => setWantGl(true), 300)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section className="hm-hero" aria-labelledby="hm-h1">
      <div className="wrap hm-hero-grid">
        <div className="hm-hero-copy">
          <p className="eyebrow hm-in" style={{ '--i': 0 } as CSSProperties}>Cosmetic surgery &amp; aesthetic medicine</p>
          <h1 className="hm-h1" id="hm-h1">
            <span className="hm-ln"><span className="hm-ln-in" style={{ '--i': 0 } as CSSProperties}>A new perspective</span></span>
            <span className="hm-ln"><span className="hm-ln-in" style={{ '--i': 1 } as CSSProperties}>on aesthetic</span></span>
            <span className="hm-ln"><span className="hm-ln-in" style={{ '--i': 2 } as CSSProperties}><em>care.</em></span></span>
          </h1>
          <p className="hm-lede hm-in" style={{ '--i': 3 } as CSSProperties}>{site.hero.copy}</p>
          <div className="hm-btns hm-in" style={{ '--i': 4 } as CSSProperties}>
            <Link className="btn btn-lg" to={routes.consultation}>{site.hero.secondaryCta} <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn btn-ghost btn-lg" to={routes.treatments}>{site.hero.primaryCta}</Link>
          </div>
        </div>

        <div className="hm-hero-visual">
          <div className="hm-ring" aria-hidden="true" />
          <div className="hm-arch"><Picture id="hero-main" sizes="(min-width: 960px) 40vw, 88vw" style={{ height: '100%' }} /></div>
          <div className="hm-slot-sm hm-in" style={{ '--i': 6 } as CSSProperties}>
            <Picture id="hero-accent" sizes="20vw" style={{ height: '100%' }} />
          </div>
          <div className="hm-chip hm-in" style={{ '--i': 7 } as CSSProperties}><i />Skin health · Aesthetic care</div>

          <div className={`hm-stage${glOn ? ' gl' : ''}`} aria-hidden="true">
            <svg className="hm-fallback" viewBox="0 0 200 340" focusable="false">
              <defs>
                <linearGradient id="hm-gl" x1="0" x2="1"><stop offset="0" stopColor="#E7C48E" /><stop offset=".45" stopColor="#F6E3BF" /><stop offset="1" stopColor="#C79A5C" /></linearGradient>
                <linearGradient id="hm-gd" x1="0" x2="1"><stop offset="0" stopColor="#A9824B" /><stop offset=".5" stopColor="#F0D9A6" /><stop offset="1" stopColor="#9B7440" /></linearGradient>
              </defs>
              <path d="M44 120 Q44 100 62 94 L80 88 L80 70 L120 70 L120 88 L138 94 Q156 100 156 120 L156 300 Q156 316 140 316 L60 316 Q44 316 44 300 Z" fill="url(#hm-gl)" opacity=".94" />
              <rect x="56" y="150" width="88" height="86" fill="#F4ECDC" />
              <rect x="76" y="54" width="48" height="24" rx="3" fill="url(#hm-gd)" />
              <path d="M86 56 Q86 8 100 8 Q114 8 114 56 Z" fill="#3A2A1C" />
            </svg>
            {wantGl && (
              <Quiet>
                <Suspense fallback={null}><HeroBottle onState={onState} /></Suspense>
              </Quiet>
            )}
          </div>
        </div>
      </div>
      <div className="hm-cue" aria-hidden="true"><i />Scroll</div>
    </section>
  )
}
