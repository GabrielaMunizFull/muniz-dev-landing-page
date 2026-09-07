import { Stage } from './Stage';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/content';
import './Projetos.css';

export function Projetos() {
  return (
    <Stage id="projetos" kicker="STAGE 3" title="PROJETOS">
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      <p className="projects-note">
        <span aria-hidden="true">▸</span> Mais de 10 projetos no ar. Alguns são sob
        NDA e não aparecem aqui — posso falar sobre eles numa conversa.
      </p>
    </Stage>
  );
}
