import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { contactLinks, whatsappUrl } from '../data/content';
import './InsertCoin.css';

const credits = contactLinks.filter((link) => !link.href.includes('wa.me'));

export function InsertCoin() {
  return (
    <section id="insert-coin" className="insert-coin" aria-labelledby="insert-coin-title">
      <Reveal>
        <p className="ic-kicker">FINAL BOSS</p>
        <h2 className="ic-title" id="insert-coin-title">INSERT COIN</h2>
        <p className="ic-lede">
          Pronto pra dar start no seu projeto? Me chama no WhatsApp e eu retorno
          em até 24 horas com uma avaliação inicial gratuita.
        </p>

        <motion.a
          className="ic-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="coin-ico" aria-hidden="true" />
          FALAR NO WHATSAPP
        </motion.a>

        <div className="ic-credits">
          <span className="ic-credits-label">OU POR AQUI</span>
          {credits.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
