export const routes = {
  home: '/',
  about: '/about',
  treatments: '/treatments',
  category: (slug: string) => `/treatments/${slug}`,
  treatment: (category: string, slug: string) => `/treatments/${category}/${slug}`,
  doctors: '/doctors',
  doctor: (slug: string) => `/doctors/${slug}`,
  results: '/results',
  journal: '/journal',
  contact: '/contact',
  consultation: '/consultation',
  admin: '/admin',
} as const
