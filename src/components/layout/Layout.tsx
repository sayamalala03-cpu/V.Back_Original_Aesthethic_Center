import { useEffect, type MouseEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollProgress } from './ScrollProgress'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import '../../styles/layout.css'
import '../../styles/motion.css'

/** Start every new page at the top. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/**
 * Wraps every page with the skip link, progress bar, header and footer.
 * Pages keep their own <main>, so #content is a plain wrapper, not a landmark.
 */
export function Layout() {
  const { pathname } = useLocation()
  const skip = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('content')
    target?.focus()
    target?.scrollIntoView()
  }

  return (
    <>
      <a className="skip-link" href="#content" onClick={skip}>
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <SiteHeader />
      <div id="content" className="site-content" tabIndex={-1}>
        {/* key: each page fades in when you navigate (opacity only, so sticky and fixed parts keep working) */}
        <div key={pathname} className="page-in">
          <Outlet />
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
