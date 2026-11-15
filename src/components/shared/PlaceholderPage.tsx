interface Props {
  title: string
  phase: string
}

/** Honest stand-in for a page that has not been built yet. Replace per phase. */
export function PlaceholderPage({ title, phase }: Props) {
  return (
    <main style={{ padding: 'clamp(96px, 14vw, 176px) max(16px, 4.5vw)', maxWidth: 1320, margin: '0 auto' }}>
      <p style={{ font: '600 12px/1 var(--font-body)', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--accent)' }}>
        Not built yet · {phase}
      </p>
      <h1 style={{ font: '300 clamp(44px, 8vw, 104px)/1 var(--font-display)', margin: '20px 0 0' }}>{title}</h1>
    </main>
  )
}
