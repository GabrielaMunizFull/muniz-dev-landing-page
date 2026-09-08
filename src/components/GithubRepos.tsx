import { useEffect, useState } from 'react';
import { Stage } from './Stage';
import { TerminalWindow } from './TerminalWindow';
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

  useEffect(() => {
    let cancelled = false;
    let started = false;
    const controller = new AbortController();
    let timeout = 0;

    function load() {
      if (started) return;
      started = true;
      timeout = window.setTimeout(() => controller.abort(), 8000);
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=10`, {
        signal: controller.signal,
      })
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
        })
        .finally(() => clearTimeout(timeout));
    }

    // só busca quando a seção está perto da viewport (tira do caminho crítico do load)
    const el = document.getElementById('repos');
    if (!el || typeof IntersectionObserver === 'undefined') {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <Stage id="repos" kicker="BONUS" title="REPOSITÓRIOS">
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
            state.repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener"
                className="github-repo-row"
              >
                <span className="github-repo-name">{repo.name}</span>
                {repo.description && <span className="github-repo-desc">{repo.description}</span>}
                <span className="github-repo-meta">
                  {repo.language && <span className="github-repo-lang">{repo.language}</span>}
                  <span className="github-repo-stars">★ {repo.stargazers_count}</span>
                </span>
              </a>
            ))}
        </div>
      </TerminalWindow>
    </Stage>
  );
}
