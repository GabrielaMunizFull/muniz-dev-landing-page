import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { faq } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import { playHover } from '../lib/sound';
import './Faq.css';

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const unlock = useUnlockAchievement();

  function toggle(i: number, isOpen: boolean) {
    playHover();
    setOpen(isOpen ? null : i);
  }

  return (
    <section id="faq" className="section">
      <Reveal onEnter={() => unlock('faq', 'Leu o FAQ')}>
        <span className="eyebrow">DÚVIDAS FREQUENTES</span>
        <h2 className="section-title">PERGUNTAS FREQUENTES</h2>
      </Reveal>
      <div className="faq-list">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={item.question}
              className="faq-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                className="faq-summary"
                onClick={() => toggle(i, isOpen)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                {item.question}
                <motion.span
                  className="faq-marker"
                  animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? 'var(--accent)' : undefined }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="faq-answer-wrap"
                  >
                    <p className="faq-answer">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
