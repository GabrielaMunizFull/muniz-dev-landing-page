import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { steps } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import './Como.css';

export function Como() {
  const unlock = useUnlockAchievement();

  return (
    <section id="como" className="section">
      <Reveal className="section-header--center" onEnter={() => unlock('como', 'Descobriu COMO FUNCIONA')}>
        <span className="eyebrow">COMO FUNCIONA</span>
        <h2 className="section-title">DO BRIEFING À ENTREGA</h2>
      </Reveal>
      <div className="steps-grid">
        <motion.div
          className="steps-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="step-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
            whileHover={{ y: -6, borderColor: 'var(--accent)' }}
          >
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
