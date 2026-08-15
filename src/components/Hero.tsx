import { type PointerEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import portraitPng1x from '../assets/gabriela-laptop.png';
import portraitPng2x from '../assets/gabriela-laptop@2x.png';
import portraitWebp1x from '../assets/gabriela-laptop.webp';
import portraitWebp2x from '../assets/gabriela-laptop@2x.webp';
import { PixelCorners } from './PixelCorners';
import { useUnlockAchievement } from '../context/AchievementsContext';
import { playConfirm } from '../lib/sound';
import './Hero.css';

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

const BOOT_DURATION = 800;
const BOOT_AUTO_DISMISS = 500;

function BootOverlay({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / BOOT_DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(onDone, BOOT_AUTO_DISMISS);
    return () => clearTimeout(timeout);
  }, [done, onDone]);

  const statusIndex = Math.min(BOOT_STATUSES.length - 1, Math.floor(progress / 26));

  return (
    <motion.div className="boot-overlay" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
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
            ▸ PRESS START
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
            {i < titleWords.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function TiltPhotoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionTemplate`${x}px`;
  const glowY = useMotionTemplate`${y}px`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px);
    y.set(py);
    rotateY.set(((px / rect.width) - 0.5) * 14);
    rotateX.set(((py / rect.height) - 0.5) * -14);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="photo-card pixel-frame"
      variants={item}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <PixelCorners />
      <motion.div
        className="photo-card-glow"
        style={{ background: useMotionTemplate`radial-gradient(180px circle at ${glowX} ${glowY}, var(--accent-dim), transparent 70%)` }}
      />
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
          <div className="stat-num">100%</div>
          <div className="stat-label">FOCO NA ENTREGA</div>
        </div>
        <div>
          <div className="stat-num">FULL</div>
          <div className="stat-label">STACK COVERAGE</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [booted, setBooted] = useState(false);
  const unlock = useUnlockAchievement();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBooted(true);
    }
  }, []);

  function handleBootDone() {
    setBooted(true);
    unlock('hero', 'Iniciou o jogo');
  }

  return (
    <motion.section
      className="hero"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {!booted && <BootOverlay key="boot" onDone={handleBootDone} />}
      </AnimatePresence>

      {/* display:contents keeps the 2-column grid intact while letting us gate both children behind one `inert` */}
      <div style={{ display: 'contents' }} inert={!booted}>
        <div>
          <motion.div className="hero-badge" variants={item}>
            <span className="badge-dot" />
            DISPONÍVEL PARA PROJETOS
          </motion.div>
          <Title />
          <motion.p className="hero-sub" variants={item}>
            Desenvolvimento full stack end-to-end — do banco de dados à interface —
            com foco em entrega real, código limpo e tecnologia que escala.
          </motion.p>
          <motion.div className="hero-actions" variants={item}>
            <motion.a
              href="#contato"
              className="btn btn-primary"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              SOLICITAR PROPOSTA
            </motion.a>
            <motion.a
              href="#projetos"
              className="btn btn-ghost"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              CONHECER MEU TRABALHO
            </motion.a>
          </motion.div>
        </div>

        <TiltPhotoCard />
      </div>
    </motion.section>
  );
}
