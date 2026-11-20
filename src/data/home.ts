/**
 * Home page copy.
 * `draft: true` means the wording was written for this website and has NOT been
 * supplied or approved by the clinic. The page shows a visible "Draft" tag for these.
 * Nothing here states credentials, results, prices, licences or contact details.
 */
export interface HomeBlock {
  title: string
  text: string
  draft: boolean
}

export const story = {
  eyebrow: 'About the clinic',
  title: 'Beyond aesthetics.',
  titleAccent: 'A more personalized approach.',
  statement: 'Good aesthetic care begins with listening, then with a plan made for one person.',
  body:
    "Add the clinic's real story here: where it is, who it serves and why it was founded. No history, awards or credentials appear until the clinic provides and verifies them.",
  draft: true,
}

export const beliefs: HomeBlock[] = [
  { title: 'Philosophy', text: 'Good results are built on understanding. Every recommendation starts with your goals, your concerns and your questions.', draft: true },
  { title: 'Mission', text: 'To provide considered, personalized aesthetic care that patients can trust.', draft: true },
  { title: 'Vision', text: 'A clinic where people feel informed, respected and comfortable making decisions about their appearance.', draft: true },
]

export const approachSteps = [
  { title: 'Listen', text: 'The first conversation covers your goals, your concerns and any questions you bring.' },
  { title: 'Assess', text: 'You are reviewed by a qualified practitioner so that advice fits you.' },
  { title: 'Plan', text: 'Options are explained in plain language, including what each can and cannot do.' },
  { title: 'Aftercare', text: 'Clear written guidance after each visit, with a route to ask follow-up questions.' },
]

export const standards: HomeBlock[] = [
  { title: 'Professional standards', text: 'Verified licences, professional memberships and clinical standards will appear here. Nothing is displayed until the clinic confirms it.', draft: true },
  { title: 'Patient experience', text: 'Real details will appear here: how a consultation runs, how privacy is handled and who to contact after a visit.', draft: true },
]
