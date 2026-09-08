import { useRef, type ReactNode } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useInViewOnce } from '../hooks/useInViewOnce';
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
  const inView = useInViewOnce(ref, '0px 0px -100px 0px');
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
