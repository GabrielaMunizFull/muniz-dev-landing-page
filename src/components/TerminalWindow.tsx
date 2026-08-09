import { useRef } from 'react';
import { useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import './TerminalWindow.css';

export function TerminalWindow({
  command,
  fileName = 'sobre.ts',
  children,
}: {
  command: string;
  fileName?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const typed = useTypewriter(command, 32, inView);
  const done = typed.length === command.length;

  return (
    <div className="terminal-window" ref={ref}>
      <div className="terminal-bar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-title">{fileName}</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">gabriela@muniz:~$</span> {typed}
          {!done && <span className="terminal-cursor" />}
        </div>
        {done && <div className="terminal-output">{children}</div>}
      </div>
    </div>
  );
}
