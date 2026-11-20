import { routes } from '../lib/routes'

export interface NavItem {
  label: string
  to: string
}

/**
 * Links shown in the header and footer.
 * Results is left out on purpose: it stays hidden until the clinic supplies
 * authorized photographs with written patient consent. Add it here at that point.
 */
export const primaryNav: NavItem[] = [
  { label: 'Treatments', to: routes.treatments },
  { label: 'Our team', to: routes.doctors },
  { label: 'About', to: routes.about },
  { label: 'Journal', to: routes.journal },
  { label: 'Contact', to: routes.contact },
]

export const bookingCta: NavItem = { label: 'Book a consultation', to: routes.consultation }
