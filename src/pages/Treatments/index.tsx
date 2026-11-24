import { Link, useParams } from 'react-router-dom'
import { findCategory, findTreatment } from '../../lib/treatments'
import { routes } from '../../lib/routes'
import { useTitle } from '../../lib/useTitle'
import CategoryPage from './Category'
import TreatmentDetailPage from './Detail'
import TreatmentsLanding from './Landing'
import '../../styles/treatments.css'

function NotFound() {
  useTitle('Treatment not found')
  return (
    <main className="tx tx-missing wrap">
      <p className="eyebrow">Treatments</p>
      <h1 className="tx-h1">That page is not <em>here.</em></h1>
      <p className="tx-lede">It may have moved, or the address may be mistyped. <Link className="tlink" to={routes.treatments}>See all treatments</Link></p>
    </main>
  )
}

/** Handles /treatments, /treatments/:category and /treatments/:category/:treatment. */
export default function Treatments() {
  const { category: categorySlug, treatment: treatmentSlug } = useParams()
  if (!categorySlug) return <TreatmentsLanding />
  const category = findCategory(categorySlug)
  if (!category) return <NotFound />
  if (!treatmentSlug) return <CategoryPage category={category} />
  const treatment = findTreatment(categorySlug, treatmentSlug)
  if (!treatment) return <NotFound />
  return <TreatmentDetailPage category={category} treatment={treatment} />
}
