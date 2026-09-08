import { Stage } from './Stage';
import { Reveal } from './Reveal';
import { partners } from '../data/content';
import './Parceiros.css';

export function Parceiros() {
  return (
    <Stage id="parceiros" kicker="CO-OP" title="PARCEIROS">
      <Reveal>
        <div className="partners-grid">
          {partners.map((partner) => (
            <div className="partner-card rise" key={partner.name}>
              <div className="partner-header-row">
                {partner.logo && (
                  <picture>
                    {partner.logoWebp && <source type="image/webp" srcSet={partner.logoWebp} />}
                    <img
                      className="partner-logo-img"
                      src={partner.logo}
                      alt={partner.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                )}
                <div className="partner-logo glitch" data-text={partner.name}>{partner.name}</div>
              </div>
              <p>{partner.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Stage>
  );
}
