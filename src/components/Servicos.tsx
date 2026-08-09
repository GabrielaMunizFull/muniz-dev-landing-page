import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { services } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import './Servicos.css';

export function Servicos() {
  const unlock = useUnlockAchievement();

  return (
    <section id="servicos" className="section">
      <Reveal className="services-header" onEnter={() => unlock('servicos', 'Viu os SERVIÇOS')}>
        <span className="eyebrow" style={{ textAlign: 'center' }}>O QUE EU FAÇO</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>SERVIÇOS QUE ENTREGAM RESULTADO</h2>
        <p>Atendo desde projetos do zero até melhorias em sistemas existentes — com atenção ao prazo, ao código e ao usuário final.</p>
      </Reveal>
      <div className="services-grid">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="service-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -8, borderColor: 'var(--accent)' }}
          >
            <span className="service-card-glow" />
            <motion.div
              className="service-icon"
              whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.15 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
