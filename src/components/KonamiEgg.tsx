import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { playConfirm } from '../lib/sound';
import './KonamiEgg.css';

const CODE = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'b', 'a',
];

const COLORS = ['#ff5fa8', '#7ad9ff', '#ffe066', '#7a3ff2', '#f4f1fb'];

export function KonamiEgg() {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let buffer: string[] = [];

    function onKey(e: KeyboardEvent) {
      buffer = [...buffer, e.key.toLowerCase()].slice(-CODE.length);
      if (buffer.join(',') === CODE.join(',')) {
        buffer = [];
        setActive(true);
        playConfirm();
        setTimeout(() => setActive(false), 4200);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pixels = active && !reduceMotion ? Array.from({ length: 60 }) : [];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="konami-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {pixels.map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.6;
            const duration = 2 + Math.random() * 1.5;
            const color = COLORS[i % COLORS.length];
            const size = 6 + Math.random() * 10;
            return (
              <motion.span
                key={i}
                className="konami-pixel"
                style={{ left: `${left}%`, width: size, height: size, background: color }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ y: '110vh', rotate: 360 }}
                transition={{ delay, duration, ease: 'linear' }}
              />
            );
          })}
          <div className="konami-message-wrap">
            <motion.div
              className="konami-message"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ▲ MODO SECRETO ATIVADO ▲
              <span>Você chegou até aqui digitando código. Combina.</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
