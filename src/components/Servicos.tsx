import { motion } from 'framer-motion';
import { Stage } from './Stage';
import { services } from '../data/content';
import './Servicos.css';

export function Servicos() {
  return (
    <Stage id="arsenal" kicker="STAGE 4" title="ARSENAL">
      <p className="services-intro">
        Atendo desde projetos do zero até melhorias em sistemas existentes — com
        atenção ao prazo, ao código e ao usuário final.
      </p>
      <div className="services-grid">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="service-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <span className="service-idx" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </Stage>
  );
}
