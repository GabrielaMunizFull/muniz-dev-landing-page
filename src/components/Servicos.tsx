import type { CSSProperties } from 'react';
import { Stage } from './Stage';
import { Reveal } from './Reveal';
import { services } from '../data/content';
import './Servicos.css';

export function Servicos() {
  return (
    <Stage id="arsenal" kicker="STAGE 4" title="ARSENAL">
      <p className="services-intro">
        Atendo desde projetos do zero até melhorias em sistemas existentes — com
        atenção ao prazo, ao código e ao usuário final.
      </p>
      <Reveal>
        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card rise" key={service.title} style={{ '--i': i % 3 } as CSSProperties}>
              <span className="service-idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Stage>
  );
}
