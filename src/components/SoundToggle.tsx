import { useEffect, useState } from 'react';
import { setMuted } from '../lib/sound';
import './SoundToggle.css';

const STORAGE_KEY = 'muniz-dev-muted';

export function SoundToggle() {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === 'true';
    setMutedState(stored);
    setMuted(stored);
  }, []);

  function toggle() {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  }

  return (
    <button
      className="sound-toggle"
      onClick={toggle}
      aria-label={muted ? 'Ativar som' : 'Desativar som'}
      aria-pressed={muted}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
