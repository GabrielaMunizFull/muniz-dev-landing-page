import type { CSSProperties } from 'react';
import { Stage } from './Stage';
import { Reveal } from './Reveal';
import { steps } from '../data/content';
import './Como.css';

export function Como() {
  return (
    <Stage id="fase" kicker="STAGE 2" title="COMO A FASE FUNCIONA">
      <Reveal>
        <div className="steps-grid">
          <div className="steps-line" />
          {steps.map((step, i) => (
            <div className="step-card rise" key={step.number} style={{ '--i': i } as CSSProperties}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Stage>
  );
}
