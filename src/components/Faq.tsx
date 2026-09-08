import { useState } from 'react';
import { Stage } from './Stage';
import { Reveal } from './Reveal';
import { faq } from '../data/content';
import { playHover } from '../lib/sound';
import './Faq.css';

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  function toggle(i: number, isOpen: boolean) {
    playHover();
    setOpen(isOpen ? null : i);
  }

  return (
    <Stage id="faq" kicker="CONTINUE?" title="DÚVIDAS ANTES DO START">
      <Reveal>
        <div className="faq-list">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <button
                  className="faq-summary"
                  onClick={() => toggle(i, isOpen)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  {item.question}
                  <span className="faq-marker" aria-hidden="true">+</span>
                </button>
                <div id={`faq-answer-${i}`} className="faq-answer-wrap" role="region">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Stage>
  );
}
