import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { playBlip, playHover } from '../lib/sound';
import './Nav.css';

const links = [
  { href: '#sobre', label: 'SOBRE' },
  { href: '#projetos', label: 'PROJETOS' },
  { href: '#github', label: 'GITHUB' },
  { href: '#servicos', label: 'SERVIÇOS' },
  { href: '#contato', label: 'CONTATO' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      firstLinkRef.current?.focus();
    } else if (wasOpenRef.current) {
      menuBtnRef.current?.focus();
    }
    wasOpenRef.current = open;
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function trapFocus(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab' || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>('a[href], button');
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

  return (
    <>
      <div className="nav-bar">
        <div className="nav-logo glitch" data-text="MUNIZ.DEV">MUNIZ.DEV</div>
        <motion.button
          ref={menuBtnRef}
          className="menu-btn"
          onClick={() => {
            playBlip(659.25, 0.06);
            setOpen(true);
          }}
          onHoverStart={playHover}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Abrir menu"
        >
          <span className="menu-icon">≡</span> MENU
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            onKeyDown={trapFocus}
          >
            <button
              className="menu-close"
              onClick={() => {
                playBlip(392, 0.06);
                setOpen(false);
              }}
              aria-label="Fechar menu"
            >
              ✕
            </button>
            <nav className="menu-list">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="menu-link"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{ x: 12 }}
                >
                  <span className="menu-cursor">▸</span> {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
