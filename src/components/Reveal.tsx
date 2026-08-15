import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  onEnter,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  onEnter?: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: 'easeOut' }}
      onViewportEnter={onEnter}
    >
      {children}
    </motion.div>
  );
}
