import { LegalPage } from '../../components/shared/LegalPage'
import { disclaimerDoc, privacyDoc, termsDoc } from '../../data/legal'

export function PrivacyPage() {
  return <LegalPage doc={privacyDoc} />
}

export function TermsPage() {
  return <LegalPage doc={termsDoc} />
}

export function DisclaimerPage() {
  return <LegalPage doc={disclaimerDoc} />
}
