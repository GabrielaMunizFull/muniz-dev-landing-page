import { useState } from 'react';
import { motion } from 'framer-motion';
import { PixelCorners } from './PixelCorners';
import { playHover } from '../lib/sound';
import type { Project } from '../data/content';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      className="project-card pixel-frame"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <PixelCorners />

      <div className="card-static">
        <div className="project-video-wrap">
          {project.videoUrl ? (
            !playing ? (
              <button
                className="project-play-btn"
                onClick={() => setPlaying(true)}
                onMouseEnter={playHover}
                aria-label={`Reproduzir vídeo de ${project.title}`}
              >
                <span className="play-icon">▶</span>
                <span className="play-label">REPRODUZIR</span>
              </button>
            ) : (
              <video controls autoPlay playsInline>
                <source src={project.videoUrl} type="video/mp4" />
              </video>
            )
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt ?? `Preview do projeto ${project.title}`}
              width={720}
              height={405}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="project-video-placeholder">EM BREVE</div>
          )}
          <span className="project-scan" aria-hidden="true" />
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.stack && project.stack.length > 0 && (
          <div className="project-equipped">
            <span className="project-equipped-label">EQUIPPED</span>
            <ul>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        )}

        {project.verdict && (
          <p className="project-verdict">
            <span aria-hidden="true">▸</span> {project.verdict}
          </p>
        )}

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
    </motion.div>
  );
}
