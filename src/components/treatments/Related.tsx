import { Link } from 'react-router-dom'
import { Picture } from '../shared/Picture'
import { categoryImages } from '../../data/images'
import { relatedCategories } from '../../lib/treatments'
import { routes } from '../../lib/routes'
import type { TreatmentCategory } from '../../types/treatment'

/** Two related chapters, shown as a quiet pair of links with a small image each. */
export function RelatedChapters({ category }: { category: TreatmentCategory }) {
  const list = relatedCategories(category)
  if (list.length === 0) return null
  return (
    <section className="tx-related wrap" aria-labelledby="tx-rel-h">
      <h2 id="tx-rel-h" className="tx-h3">Related chapters</h2>
      <ul>
        {list.map((c) => (
          <li key={c.slug}>
            <Link to={routes.category(c.slug)} className="tx-rel-link">
              <span className="tx-rel-img" aria-hidden="true"><Picture id={categoryImages[c.slug]} sizes="160px" /></span>
              <span className="tx-rel-txt">
                <span className="tx-num">Chapter {c.number}</span>
                <strong>{c.name}</strong>
                <span>{c.tagline}</span>
              </span>
              <span className="tx-arr" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
