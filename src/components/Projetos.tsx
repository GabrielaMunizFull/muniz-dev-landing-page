import { Reveal } from './Reveal';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/content';
import { useUnlockAchievement } from '../context/AchievementsContext';
import './Projetos.css';

export function Projetos() {
  const unlock = useUnlockAchievement();

  return (
    <section id="projetos" className="section">
      <Reveal onEnter={() => unlock('projetos', 'Chegou em PROJETOS')}>
        <span className="eyebrow">PROJETOS</span>
        <h2 className="section-title">TRABALHOS RECENTES</h2>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
