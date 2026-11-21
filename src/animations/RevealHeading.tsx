import { motion, useReducedMotion } from 'motion/react'

export interface HeadingPart {
  text: string
  /** Italic gold accent word(s). */
  em?: boolean
}

interface Props {
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
  parts: HeadingPart[]
  delay?: number
}

/**
 * A heading whose words rise out of a mask, one after another, when scrolled into view.
 * The words stay real text in the page, so screen readers and search engines read the heading normally.
 * Reduced motion: shows the heading at once.
 */
export function RevealHeading({ as = 'h2', id, className, parts, delay = 0 }: Props) {
  const Tag = as
  const reduce = useReducedMotion()
  let n = 0
  const words = parts.flatMap((p) => p.text.split(' ').filter(Boolean).map((w) => ({ w, em: !!p.em })))

  return (
    <Tag id={id} className={className}>
      {words.map(({ w, em }) => {
        const i = n++
        const inner = em ? <em>{w}</em> : w
        return (
          <span key={i}>
            {reduce ? (
              inner
            ) : (
              <span className="hm-rw">
                <motion.span
                  className="hm-rw-in"
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1], delay: delay + i * 0.06 }}
                >
                  {inner}
                </motion.span>
              </span>
            )}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}
