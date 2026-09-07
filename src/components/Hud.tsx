import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { hudStats, stages, whatsappUrl } from '../data/content';
import { setMuted } from '../lib/sound';
import { useActiveStage } from '../hooks/useActiveStage';
import './Hud.css';

const MUTE_KEY = 'muniz-dev-muted';
const stageIds = stages.map((s) => s.id);

export function Hud() {
  const [open, setOpen] = useState(false);
  const [muted, setMutedState] = useState(true);
  const reduceMotion = useReducedMotion();
  const activeId = useActiveStage(stageIds);

  const panelRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  // som começa desligado; respeita escolha salva
  useEffect(() => {
    const stored = localStorage.getItem(MUTE_KEY);
    const startMuted = stored === null ? true : stored === 'true';
    setMutedState(startMuted);
    setMuted(startMuted);
  }, []);

  // Esc fecha
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // trava de scroll + foco só no overlay mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1079px)').matches;
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
      firstLinkRef.current?.focus();
    } else if (!open && wasOpenRef.current) {
      openBtnRef.current?.focus();
    }
    if (!open) document.body.style.overflow = '';
    wasOpenRef.current = open;
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function trapFocus(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab' || !panelRef.current) return;
    if (!window.matchMedia('(max-width: 1079px)').matches) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function toggleMute() {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    localStorage.setItem(MUTE_KEY, String(next));
  }

  return (
    <header className="hud">
      <div className="hud-rail">
        <a className="hud-mark glitch" data-text="MUNIZ.DEV" href="#main">
          MUNIZ.DEV
        </a>

        <button
          ref={openBtnRef}
          type="button"
          className="hud-open"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="hud-panel"
        >
          <span className="bars-ico" aria-hidden="true" />
          <span className="hud-open-label">LEVEL&nbsp;SELECT</span>
        </button>

        <div className="hud-rail-actions">
          <button
            type="button"
            className="hud-chiptune"
            onClick={toggleMute}
            aria-pressed={muted}
            aria-label={muted ? 'Ligar chiptune' : 'Desligar chiptune'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <a
            className="hud-coin"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="coin-ico" aria-hidden="true" />
            <span className="hud-coin-label">INSERT&nbsp;COIN</span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="hud-panel"
            className="hud-panel"
            initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onKeyDown={trapFocus}
          >
            <button
              type="button"
              className="hud-panel-close"
              onClick={() => setOpen(false)}
              aria-label="Fechar Level Select"
            >
              ✕
            </button>

            <nav className="hud-levels" aria-label="Selecionar seção">
              {stages.map((stage, i) => (
                <a
                  key={stage.id}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${stage.id}`}
                  className={`level-link${activeId === stage.id ? ' is-active' : ''}`}
                  aria-current={activeId === stage.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="level-kicker">{stage.kicker}</span>
                  <span className="level-title">{stage.title}</span>
                </a>
              ))}
            </nav>

            <dl className="hud-stats">
              {hudStats.map((stat) => (
                <div key={stat.label} className="hud-stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
