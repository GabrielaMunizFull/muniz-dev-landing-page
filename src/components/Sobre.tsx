import { Stage } from './Stage';
import { TerminalWindow } from './TerminalWindow';
import { stack } from '../data/content';
import './Sobre.css';

export function Sobre() {
  return (
    <Stage id="player" kicker="STAGE 1" title="QUEM É O PLAYER">
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
          {stack.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </TerminalWindow>
    </Stage>
  );
}
