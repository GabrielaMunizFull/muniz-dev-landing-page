import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = reduceMotion ? scrollYProgress : smoothed;

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
