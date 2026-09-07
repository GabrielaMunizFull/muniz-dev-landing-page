import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import portraitPng1x from '../assets/gabriela-laptop.png';
import portraitPng2x from '../assets/gabriela-laptop@2x.png';
import portraitWebp1x from '../assets/gabriela-laptop.webp';
import portraitWebp2x from '../assets/gabriela-laptop@2x.webp';
import { TechMarquee } from './TechMarquee';
import { whatsappUrl } from '../data/content';
import { playConfirm } from '../lib/sound';
import './TitleScreen.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const titleWords = ['CÓDIGO', 'QUE', 'RESOLVE', 'DE', 'VERDADE'];

const BOOT_STATUSES = [
  'CARREGANDO ASSETS...',
  'COMPILANDO HABILIDADES...',
  'INICIALIZANDO CRIATIVIDADE...',
  'PRONTO.',
];

const BOOT_DURATION = 420;
const BOOT_AUTO_DISMISS = 120;

function BootOverlay({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let dismiss = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / BOOT_DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        dismiss = window.setTimeout(() => onDoneRef.current(), BOOT_AUTO_DISMISS);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(dismiss);
    };
  }, []);

  const statusIndex = Math.min(BOOT_STATUSES.length - 1, Math.floor(progress / 26));

  return (
    <motion.div className="boot-overlay" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.25 }}>
      <div className="boot-logo glitch" data-text="MUNIZ.DEV">MUNIZ.DEV</div>
      <div className="boot-status">{BOOT_STATUSES[statusIndex]}</div>
      <div className="boot-bar-track">
        <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="boot-percent">{progress}%</div>
      <AnimatePresence>
        {done && (
          <motion.button
            className="boot-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              playConfirm();
              onDone();
            }}
          >
<span className="btn-icon" aria-hidden="true" /> PRESS START
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Title() {
  return (
    <h1 className="glitch" data-text={titleWords.join(' ')}>
      {titleWords.map((word, i) => (
        <span className="word-reveal" key={word}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function PhotoCard() {
  return (
    <motion.div className="photo-card" variants={item}>
      <div className="photo-card-head" aria-hidden="true">
        <span className="photo-card-dot" />
        <span className="photo-card-dot" />
        <span className="photo-card-dot" />
        <span className="photo-card-tag">player-1.png</span>
      </div>
      <picture>
        <source
          type="image/webp"
          srcSet={`${portraitWebp1x} 220w, ${portraitWebp2x} 440w`}
          sizes="220px"
        />
        <img
          src={portraitPng1x}
          srcSet={`${portraitPng1x} 220w, ${portraitPng2x} 440w`}
          sizes="220px"
          width={220}
          height={220}
          alt="Gabriela Muniz, desenvolvedora full stack"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="photo-name">GABRIELA</div>
      <div className="photo-role">Full Stack Developer · Java · React · Node.js</div>
      <div className="stat-row">
        <div>
          <div className="stat-num">6+</div>
          <div className="stat-label">ANOS DE CÓDIGO</div>
        </div>
        <div>
          <div className="stat-num">10+</div>
          <div className="stat-label">PROJETOS NO AR</div>
        </div>
      </div>
    </motion.div>
  );
}

export function TitleScreen() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBooted(true);
    }
  }, []);

  return (
    <motion.section
      className="hero"
      aria-label="Tela de título"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="starfield" aria-hidden="true" />

      <AnimatePresence>
        {!booted && <BootOverlay key="boot" onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {/* display:contents mantém o grid de 2 colunas intacto e ainda deixa gatear os dois filhos com um único `inert` */}
      <div style={{ display: 'contents' }} inert={!booted}>
        <div>
          <motion.div className="hero-badge" variants={item}>
            <span className="badge-dot" />
            DISPONÍVEL PARA PROJETOS
          </motion.div>
          <Title />
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            Desenvolvimento full stack end-to-end — do banco de dados à interface —
            com foco em entrega real, código limpo e tecnologia que escala.
          </motion.p>
          <motion.div className="hero-actions" variants={item}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              COMEÇAR PROJETO <span className="btn-icon" aria-hidden="true" />
            </a>
            <a href="#projetos" className="btn btn-ghost">
              VER TRABALHOS
            </a>
          </motion.div>
        </div>

        <PhotoCard />
      </div>

      <TechMarquee />
    </motion.section>
  );
}
