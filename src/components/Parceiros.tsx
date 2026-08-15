import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { partners } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import './Parceiros.css';

export function Parceiros() {
  const unlock = useUnlockAchievement();

  return (
    <section id="parceiros" className="section">
      <Reveal className="partners-header section-header--center" onEnter={() => unlock('parceiros', 'Viu os PARCEIROS')}>
        <span className="eyebrow">QUEM CAMINHA JUNTO</span>
        <h2 className="section-title">PARCEIROS</h2>
      </Reveal>
      <div className="partners-grid">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            className="partner-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8, borderColor: 'var(--accent)' }}
          >
            <span className="partner-card-glow" />
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
          </motion.div>
        ))}
        {/* CTA "SEJA UM PARCEIRO" oculto por hora — reativar quando pedido
        <motion.a
          href="#contato"
          className="partner-card partner-cta"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: partners.length * 0.1 }}
          whileHover={{ y: -8, borderColor: 'var(--accent)' }}
        >
          <span className="partner-card-glow" />
          <span className="partner-cta-icon">+</span>
          <div className="partner-logo">SEJA UM PARCEIRO</div>
          <p>Tem uma agência ou empresa e quer construir algo junto? Vamos conversar.</p>
        </motion.a>
        */}
      </div>
    </section>
  );
}
