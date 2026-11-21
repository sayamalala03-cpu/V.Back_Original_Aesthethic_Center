import { routes } from '../lib/routes'

export interface LegalSection {
  id: string
  heading: string
  body: string[]
}

export interface LegalDoc {
  /** Route this document lives at, used to hide it from its own "also read" list. */
  route: string
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
}

/**
 * Sample legal text for the fictional V.Back Original Aesthetic Center.
 * It is written to be realistic and honest about this site, but it is NOT legal advice
 * and has not been reviewed by a lawyer. A real clinic must replace all of it.
 * No contact detail is invented: where a real notice would give one, it says so.
 */

export const privacyDoc: LegalDoc = {
  route: routes.privacy,
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  intro:
    'How a clinic like this one would handle personal information, and what this demonstration site actually does with yours.',
  sections: [
    {
      id: 'scope',
      heading: 'What this policy covers',
      body: [
        'V.Back Original Aesthetic Center is a fictional clinic made for a portfolio. It has no patients, no staff and no real practice behind it.',
        'This policy explains what a working version of this website would collect and why. Where the demonstration site behaves differently, the text says so.',
      ],
    },
    {
      id: 'collected',
      heading: 'Information a booking form would collect',
      body: [
        'A consultation request would ask for a name, an email address or phone number, a preferred date and time, the treatment area you are curious about, and an optional short message.',
        'The booking system is an appointment tool, not a medical record. Please do not enter diagnoses, medical history, medications or photographs in any form on this site.',
        'On this demonstration site the booking system is not built, so no form sends or stores anything.',
      ],
    },
    {
      id: 'use',
      heading: 'How the information would be used',
      body: [
        'To reply to your enquiry, to schedule and confirm a consultation, and to send reminders about that appointment.',
        'It would not be sold, rented or used to build advertising profiles.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies, fonts and analytics',
      body: [
        'This site does not set tracking cookies and does not run analytics.',
        'It does load two typefaces, Cormorant Garamond and Manrope, from Google Fonts. Loading them means your browser contacts Google servers, which can see your IP address and browser details under Google’s own policy.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Who else may handle it',
      body: [
        'A working version would rely on a hosting provider and a database provider to run the site and store appointment requests. They would process information only to provide those services.',
        'Information would be disclosed to others only when the law requires it.',
      ],
    },
    {
      id: 'real-use',
      heading: 'Before this is used by a real clinic',
      body: [
        'A real clinic must replace this text with a policy reviewed by a lawyer. At a minimum it should name the organisation responsible for the data, state how long information is kept, explain how a person can ask to see, correct or delete it, and say which data protection law applies, for example the Philippines’ Data Privacy Act of 2012 where relevant.',
        'This fictional clinic has no real contact details, so none are given here. A real notice must include a working way to reach the person responsible for privacy.',
      ],
    },
  ],
}

export const termsDoc: LegalDoc = {
  route: routes.terms,
  eyebrow: 'Legal',
  title: 'Terms of Use',
  intro: 'The ground rules for using this website, written for a fictional clinic.',
  sections: [
    {
      id: 'purpose',
      heading: 'What this site is',
      body: [
        'This website is a portfolio demonstration of a design and build. V.Back Original Aesthetic Center is not a real medical practice, and nothing on the site is an offer of services.',
        'By using the site you agree to these terms. If you do not agree, please stop using it.',
      ],
    },
    {
      id: 'no-advice',
      heading: 'No medical advice',
      body: [
        'Nothing here is medical advice, a diagnosis or a recommendation for treatment. Only a licensed practitioner who has examined you can say what is suitable for you.',
        'Please read the Medical Disclaimer alongside these terms.',
      ],
    },
    {
      id: 'bookings',
      heading: 'Consultations and bookings',
      body: [
        'In a working version, a consultation request would not be a confirmed appointment until the clinic confirmed it with you directly.',
        'On this demonstration site no appointment can be made or confirmed.',
      ],
    },
    {
      id: 'treatment-info',
      heading: 'Treatment information',
      body: [
        'Treatment names are listed to show how the site is organised. Descriptions, risks, recovery details and results would have to be supplied and reviewed by a clinic’s medical team before publication.',
        'Whether a treatment is surgical or non-surgical is shown as an unverified label on this sample.',
      ],
    },
    {
      id: 'content',
      heading: 'Images and content',
      body: [
        'Every image is a labeled placeholder made for this project. No stock photograph, real person or patient result is used.',
        'The design, code and sample copy belong to the author of this portfolio. Please do not copy or reuse them without permission.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limits of responsibility',
      body: [
        'The site is provided as it is, as a demonstration. To the extent the law allows, its author is not responsible for loss arising from relying on it.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      body: ['These terms may change as the demonstration develops. The version on this page is the current one.'],
    },
  ],
}

export const disclaimerDoc: LegalDoc = {
  route: routes.disclaimer,
  eyebrow: 'Legal',
  title: 'Medical Disclaimer',
  intro: 'What this site can and cannot tell you about aesthetic care.',
  sections: [
    {
      id: 'fictional',
      heading: 'A fictional clinic',
      body: [
        'V.Back Original Aesthetic Center does not exist as a medical practice. The people, qualifications, treatments and images shown are sample content for a portfolio.',
      ],
    },
    {
      id: 'not-advice',
      heading: 'Not medical advice',
      body: [
        'The information on this site is general and for demonstration only. It does not replace an examination, a diagnosis or advice from a licensed healthcare professional.',
        'Never delay or ignore professional advice because of something you read here.',
      ],
    },
    {
      id: 'risks',
      heading: 'Every procedure carries considerations',
      body: [
        'Any aesthetic procedure, surgical or non-surgical, carries risks and may not give the result a person hopes for. The right choice depends on your health, your goals and an in-person assessment.',
        'This sample deliberately gives no technical detail, risk list or recovery times. A real clinic’s medical team must write and review those before anything is published.',
      ],
    },
    {
      id: 'results',
      heading: 'Results vary, with no guarantees',
      body: [
        'Outcomes differ from person to person. Nothing on this site is a promise or a prediction of a result.',
        'No before-and-after photographs or testimonials are shown, because this clinic has no patients.',
      ],
    },
    {
      id: 'labels',
      heading: 'Treatment categories',
      body: [
        'The surgical and non-surgical labels on this site are an interpretation of the treatment names and have not been confirmed by any clinic.',
      ],
    },
    {
      id: 'emergency',
      heading: 'In an emergency',
      body: [
        'This site is not monitored and cannot respond to urgent problems. If you think you are having a medical emergency, contact your local emergency services or go to the nearest emergency department.',
      ],
    },
  ],
}
