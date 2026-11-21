import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * A photograph that opens upward like a curtain while it settles from a slight zoom.
 * Put the sizing, radius and overflow on `className`. Reduced motion: shown at once.
 */
export function ImageReveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.div
        className="hm-fill-inner"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.8, ease: [0.22, 0.8, 0.2, 1], delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
