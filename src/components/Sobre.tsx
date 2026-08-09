import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { TerminalWindow } from './TerminalWindow';
import { stack } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import './Sobre.css';

export function Sobre() {
  const unlock = useUnlockAchievement();

  return (
    <section id="sobre" className="section">
      <Reveal onEnter={() => unlock('sobre', 'Explorou SOBRE')}>
        <span className="eyebrow">SOBRE MIM</span>
        <h2 className="section-title">DEV QUE DOMINA TODA A STACK</h2>
      </Reveal>

      <TerminalWindow command="cat sobre.md" fileName="sobre.md">
        <p>
          Sou desenvolvedora full stack com experiência em <strong>frontend, backend,
          APIs, banco de dados e mobile</strong>. Trabalho com tecnologias modernas e
          foco em código limpo, escalável e de fácil manutenção.
        </p>
        <p>
          Tenho forte base em <strong>Java com Spring</strong> para backends robustos,
          combinada com domínio do ecossistema JavaScript — React no frontend e
          Node.js no backend.
        </p>
        <p>
          Acredito que <strong>bom código não é só código que funciona</strong> — é
          código que qualquer desenvolvedor consegue entender, manter e evoluir.
          Aplico SOLID, Clean Code e boas práticas em cada projeto.
        </p>
        <div className="badge-row">
          {stack.map((skill, i) => (
            <motion.span
              key={skill}
              className="skill-badge"
              whileHover={{ scale: 1.08, borderColor: 'var(--accent)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
