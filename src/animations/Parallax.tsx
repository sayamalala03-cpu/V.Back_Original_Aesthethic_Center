import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface Props {
  children: ReactNode
  className?: string
  /** Pixels of travel. Positive layers drift against the scroll, negative ones with it. */
  travel?: number
  /** 'top' starts at zero when the element is at the top of the page (use for the hero). */
  from?: 'enter' | 'top'
}

const OFFSET_ENTER: ['start end', 'end start'] = ['start end', 'end start']
const OFFSET_TOP: ['start start', 'end start'] = ['start start', 'end start']

/**
 * Scroll-linked drift for decorative layers.
 * Reduced motion: no movement. Phones: half the distance.
 */
export function Parallax({ children, className, travel = 40, from = 'enter' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const small = typeof window !== 'undefined' && window.innerWidth < 768
  const amp = reduce ? 0 : travel * (small ? 0.5 : 1)
  const { scrollYProgress } = useScroll({ target: ref, offset: from === 'top' ? OFFSET_TOP : OFFSET_ENTER })
  const y = useTransform(scrollYProgress, [0, 1], from === 'top' ? [0, amp] : [-amp, amp])
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
