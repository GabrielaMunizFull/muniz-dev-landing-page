import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PixelCorners } from './PixelCorners';
import { playHover } from '../lib/sound';
import type { projects } from '../data/content';

type Project = (typeof projects)[number];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hasStaticMedia = Boolean(project.embedUrl || project.videoUrl);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`project-card pixel-frame${hasStaticMedia ? ' is-static' : ''}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={hasStaticMedia ? undefined : () => setFlipped(true)}
      onHoverEnd={hasStaticMedia ? undefined : () => setFlipped(false)}
      onTap={hasStaticMedia ? undefined : () => setFlipped((f) => !f)}
      tabIndex={hasStaticMedia ? undefined : 0}
      role={hasStaticMedia ? undefined : 'button'}
      aria-pressed={hasStaticMedia ? undefined : flipped}
      onKeyDown={
        hasStaticMedia
          ? undefined
          : (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }
      }
    >
      <PixelCorners />

      {hasStaticMedia ? (
        <div className="card-static">
          <div className="project-video-wrap">
            {!playing ? (
              <button
                className="project-play-btn"
                onClick={() => setPlaying(true)}
                onMouseEnter={playHover}
                aria-label={`Reproduzir vídeo de ${project.title}`}
              >
                <span className="play-icon">▶</span>
                <span className="play-label">REPRODUZIR</span>
              </button>
            ) : project.embedUrl ? (
              <iframe
                src={`${project.embedUrl}?autoplay=1`}
                title={project.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls autoPlay playsInline>
                <source src={project.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.siteUrl && (
            <a
              className="project-site-link"
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.siteUrl.includes('github.com') ? 'Ver repositório ↗' : 'Ver site ↗'}
            </a>
          )}
        </div>
      ) : (
        <div className="card-flip-outer">
          <motion.div
            className="card-flip-inner"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-face card-face-front" aria-hidden={flipped}>
              <div className="project-video-wrap">
                {/* TODO: adicionar poster="capa.jpg" e <source src="video.mp4" type="video/mp4" /> */}
                <video muted loop playsInline />
                <div className="project-video-placeholder">EM BREVE</div>
              </div>
              <h3>{project.title}</h3>
            </div>
            <div className="card-face card-face-back" aria-hidden={!flipped}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="card-back-hint">◂ toque ou Enter pra voltar</span>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
