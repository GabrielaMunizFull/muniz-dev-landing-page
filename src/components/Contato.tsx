import { type FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { contactLinks } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import { playConfirm } from '../lib/sound';
import './Contato.css';

const FORMSPREE_ID = 'meeddprz';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contato() {
  const [status, setStatus] = useState<Status>('idle');
  const unlock = useUnlockAchievement();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
      playConfirm();
      form.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  const btnLabel = {
    idle: 'ENVIAR MENSAGEM →',
    sending: 'ENVIANDO…',
    success: '✓ MENSAGEM ENVIADA!',
    error: '✗ ERRO — TENTE POR E-MAIL',
  }[status];

  return (
    <section id="contato" className="contato-section">
      <div className="contact-grid">
        <Reveal onEnter={() => unlock('contato', 'Chegou no CONTATO')}>
          <span className="eyebrow">CONTATO</span>
          <h2 className="section-title">VAMOS CONSTRUIR ALGO JUNTOS?</h2>
          <p className="intro-p">
            Descreva seu projeto e eu retorno em até 24 horas com uma avaliação
            inicial gratuita.
          </p>

          <div className="contact-info-title">ME ENCONTRE POR AQUI</div>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                whileHover={{ x: 6 }}
              >
                {link.icon} {link.label}
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit}>
            <div className="form-title">NOVA MENSAGEM</div>
            <input type="text" name="nome" placeholder="Nome" required />
            <input type="email" name="email" placeholder="E-mail" required />
            <select name="tipo_projeto" defaultValue="">
              <option value="">Tipo de projeto…</option>
              <option>Site / Landing Page</option>
              <option>Sistema Web</option>
              <option>API / Backend</option>
              <option>Aplicativo Mobile</option>
              <option>Integração</option>
              <option>Consultoria</option>
              <option>Outro</option>
            </select>
            <textarea name="mensagem" placeholder="Mensagem" rows={4} />
            <motion.button
              type="submit"
              className={`btn btn-primary btn-submit status-${status}`}
              disabled={status === 'sending'}
              whileHover={{ scale: status === 'idle' ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
            >
              {btnLabel}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
