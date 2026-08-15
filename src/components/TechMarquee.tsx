import { techList } from '../data/content';
import './TechMarquee.css';

export function TechMarquee() {
  const doubled = [...techList, ...techList];
  const reversed = [...techList].reverse();
  const doubledReversed = [...reversed, ...reversed];

  return (
    <div className="tech-strip">
      <span className="sr-only">{techList.join(', ')}</span>
      <div className="tech-row" aria-hidden="true">
        <div className="tech-list tech-list-forward">
          {doubled.map((tech, i) => (
            <span key={`f-${tech}-${i}`}>{tech}</span>
          ))}
        </div>
      </div>
      <div className="tech-row" aria-hidden="true">
        <div className="tech-list tech-list-reverse">
          {doubledReversed.map((tech, i) => (
            <span key={`r-${tech}-${i}`}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
