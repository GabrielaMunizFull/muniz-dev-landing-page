import { type CSSProperties, useEffect, useState } from 'react';
import portraitPng1x from '../assets/gabriela-laptop.png';
import portraitPng2x from '../assets/gabriela-laptop@2x.png';
import portraitWebp1x from '../assets/gabriela-laptop.webp';
import portraitWebp2x from '../assets/gabriela-laptop@2x.webp';
import { TechMarquee } from './TechMarquee';
import { whatsappUrl } from '../data/content';
import './TitleScreen.css';

const titleWords = ['CÓDIGO', 'QUE', 'RESOLVE', 'DE', 'VERDADE'];

/**
 * "Power-on" retro. Só monta no cliente, depois da hidratação — o HTML do SSR
 * já vem com o conteúdo do hero pintado, então o LCP não espera por isto.
 * Animação 100% CSS; some sozinho por keyframes. `prefers-reduced-motion` não
 * monta (checado no efeito) e o CSS também esconde por segurança.
 */
function BootOverlay() {
  return (
    <div className="boot-overlay" aria-hidden="true">
      <div className="boot-logo glitch" data-text="MUNIZ.DEV">MUNIZ.DEV</div>
      <div className="boot-status">PRONTO.</div>
      <div className="boot-bar-track">
        <div className="boot-bar-fill" />
      </div>
    </div>
  );
}

function useBootFlash() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('muniz-dev-booted')) return;
      sessionStorage.setItem('muniz-dev-booted', '1');
    } catch {
      /* sessionStorage indisponível — mostra o flash mesmo assim */
    }
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 700);
    return () => window.clearTimeout(t);
  }, []);
  return show;
}

function Title() {
  return (
    <h1 className="glitch" data-text={titleWords.join(' ')}>
      {titleWords.map((word, i) => (
        <span className="word-reveal" key={word}>
          <span className="word-in" style={{ '--wi': i } as CSSProperties}>{word}</span>
        </span>
      ))}
    </h1>
  );
}

function PhotoCard() {
  return (
    <div className="photo-card">
      <div className="photo-card-head" aria-hidden="true">
        <span className="photo-card-dot" />
        <span className="photo-card-dot" />
        <span className="photo-card-dot" />
        <span className="photo-card-tag">player-1.png</span>
      </div>
      <picture>
        <source
          type="image/webp"
          srcSet={`${portraitWebp1x} 200w, ${portraitWebp2x} 400w`}
          sizes="200px"
        />
        <img
          src={portraitPng1x}
          srcSet={`${portraitPng1x} 200w, ${portraitPng2x} 400w`}
          sizes="200px"
          width={200}
          height={200}
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
    </div>
  );
}

export function TitleScreen() {
  const showBoot = useBootFlash();

  return (
    <section className="hero" aria-label="Tela de título">
      <div className="starfield" aria-hidden="true" />

      {showBoot && <BootOverlay />}

      <div style={{ display: 'contents' }}>
        <div>
          <div className="hero-badge">
            <span className="badge-dot" />
            DISPONÍVEL PARA PROJETOS
          </div>
          <Title />
          <p className="hero-sub">
            Desenvolvimento full stack end-to-end — do banco de dados à interface —
            com foco em entrega real, código limpo e tecnologia que escala.
          </p>
          <div className="hero-actions">
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
          </div>
        </div>

        <PhotoCard />
      </div>

      <TechMarquee />
    </section>
  );
}
