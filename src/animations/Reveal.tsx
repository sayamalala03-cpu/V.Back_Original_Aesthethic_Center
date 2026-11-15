import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Props {
  children: ReactNode
  className?: string
  /** Seconds. Use small steps (0.08) to stagger siblings. */
  delay?: number
}

/**
 * Subtle fade-and-rise when content scrolls into view, once.
 * With "reduce motion" on, content is shown immediately with no movement.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
