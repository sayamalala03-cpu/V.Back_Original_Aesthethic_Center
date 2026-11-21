import { routes } from '../lib/routes'

export interface NavItem {
  label: string
  to: string
  /** Opens the treatment categories menu (desktop mega menu, mobile accordion). */
  menu?: 'treatments'
}

/**
 * Links shown in the header and footer, in display order.
 * Patient Results is listed because this is a fictional portfolio clinic. Its page is
 * still a placeholder: before a real clinic goes live it must show only authorized
 * photographs with written patient consent (see docs/IMAGE-LIBRARY.md).
 */
export const primaryNav: NavItem[] = [
  { label: 'Home', to: routes.home },
  { label: 'About', to: routes.about },
  { label: 'Treatments', to: routes.treatments, menu: 'treatments' },
  { label: 'Our Team', to: routes.doctors },
  { label: 'Patient Results', to: routes.results },
  { label: 'Journal', to: routes.journal },
  { label: 'Contact', to: routes.contact },
]

export const bookingCta: NavItem = { label: 'Book a Consultation', to: routes.consultation }

/** Legal links for the footer. The pages are placeholders until sample copy is written. */
export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', to: routes.privacy },
  { label: 'Terms of Use', to: routes.terms },
  { label: 'Medical Disclaimer', to: routes.disclaimer },
]
