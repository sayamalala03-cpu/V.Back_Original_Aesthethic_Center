/**
 * Home page copy for the fictional V.Back Original Aesthetic Center.
 * All of it is sample content, and each section shows a "Sample content" tag.
 * Nothing here states credentials, results, prices, licences or contact details.
 */
export interface HomeBlock {
  title: string
  text: string
}

export const story = {
  eyebrow: 'About the clinic',
  title: 'Beyond aesthetics.',
  titleAccent: 'A more personalized approach.',
  statement: 'Good aesthetic care begins with listening, then with a plan made for one person.',
  body:
    'V.Back Original is an imagined clinic, made to show how a modern aesthetic practice could present itself: calm rooms, clear information and consultations that are never rushed. The story, the people and the places on this site are sample content.',
}

export const beliefs: HomeBlock[] = [
  { title: 'Philosophy', text: 'Good results are built on understanding. Every recommendation starts with your goals, your concerns and your questions.' },
  { title: 'Mission', text: 'To provide considered, personalized aesthetic care that patients can trust.' },
  { title: 'Vision', text: 'A clinic where people feel informed, respected and comfortable making decisions about their appearance.' },
]

export const approachSteps = [
  { title: 'Listen', text: 'The first conversation covers your goals, your concerns and any questions you bring.' },
  { title: 'Assess', text: 'You are reviewed by a qualified practitioner so that advice fits you.' },
  { title: 'Plan', text: 'Options are explained in plain language, including what each can and cannot do.' },
  { title: 'Aftercare', text: 'Clear written guidance after each visit, with a route to ask follow-up questions.' },
]

export const standards: HomeBlock[] = [
  {
    title: 'Professional standards',
    text: 'This is where verified licences, professional memberships and clinical standards would appear, each backed by a document a patient can ask to see. This sample claims none.',
  },
  {
    title: 'Patient experience',
    text: 'How a consultation runs, how privacy is handled and who to contact after a visit, written plainly. The sample shows the layout, not a real policy.',
  },
]
