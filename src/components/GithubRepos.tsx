import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { TerminalWindow } from './TerminalWindow';
import { useUnlockAchievement } from '../context/AchievementsContext';
import './GithubRepos.css';

const GITHUB_USER = 'GabrielaMunizFull';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; repos: Repo[] };

export function GithubRepos() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const unlock = useUnlockAchievement();

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=10`)
      .then((res) => {
        if (!res.ok) throw new Error('github api error');
        return res.json() as Promise<Repo[]>;
      })
      .then((data) => {
        if (cancelled) return;
        const repos = data.filter((r) => !r.fork).slice(0, 6);
        setState({ status: 'ready', repos });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="section">
      <Reveal onEnter={() => unlock('github', 'Conferiu o GITHUB')}>
        <span className="eyebrow">CÓDIGO ABERTO</span>
        <h2 className="section-title">ÚLTIMOS REPOSITÓRIOS</h2>
      </Reveal>

      <TerminalWindow command="gh repo list" fileName="repos.sh">
        <div className="github-body" aria-live="polite">
          {state.status === 'loading' && (
            <p className="github-status">carregando repositórios...</p>
          )}
          {state.status === 'error' && (
            <p className="github-status">
              não deu pra carregar agora. Veja direto em{' '}
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener">
                github.com/{GITHUB_USER}
              </a>
            </p>
          )}
          {state.status === 'ready' && state.repos.length === 0 && (
            <p className="github-status">nenhum repositório público encontrado.</p>
          )}
          {state.status === 'ready' &&
            state.repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener"
                className="github-repo-row"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 6 }}
              >
                <span className="github-repo-name">{repo.name}</span>
                {repo.description && <span className="github-repo-desc">{repo.description}</span>}
                <span className="github-repo-meta">
                  {repo.language && <span className="github-repo-lang">{repo.language}</span>}
                  <span className="github-repo-stars">★ {repo.stargazers_count}</span>
                </span>
              </motion.a>
            ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
