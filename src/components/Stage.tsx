import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import './Stage.css';

interface StageProps {
  /** id da <section>, alvo das âncoras do Level Select */
  id: string;
  /** rótulo curto tipo "STAGE 1" | "BONUS" | "FINAL BOSS" */
  kicker: string;
  /** título da seção (vira o <h2>) */
  title: string;
  children: ReactNode;
}

const GLYPH: Record<string, string> = {
  BONUS: 'B',
  'CO-OP': 'C',
  'CONTINUE?': '?',
  'FINAL BOSS': '!',
};

export function Stage({ id, kicker, title, children }: StageProps) {
  const titleId = `${id}-title`;
  const num = kicker.match(/\d+/)?.[0]?.padStart(2, '0') ?? GLYPH[kicker] ?? '';

  return (
    <section id={id} className="stage" aria-labelledby={titleId}>
      {num && <span className="stage-num" aria-hidden="true">{num}</span>}
      <div className="stage-inner">
        <Reveal>
          <p className="stage-kicker">{kicker}</p>
          <h2 className="stage-title" id={titleId}>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
