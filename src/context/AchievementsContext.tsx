import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import '../components/Achievements.css';

type Toast = { id: string; label: string };

const AchievementsContext = createContext<(id: string, label: string) => void>(() => {});

export function useUnlockAchievement() {
  return useContext(AchievementsContext);
}

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const unlockedRef = useRef<Set<string>>(new Set());
  const reduceMotion = useReducedMotion();

  const unlock = useCallback((id: string, label: string) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    setToasts((t) => [...t, { id, label }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  return (
    <AchievementsContext.Provider value={unlock}>
      {children}
      <div className="achievements-stack" role="status" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className="achievement-toast"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, scale: 0.9 }}
              transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 24 }}
            >
              <span className="achievement-icon">🏆</span>
              <div>
                <div className="achievement-title">CONQUISTA DESBLOQUEADA</div>
                <div className="achievement-label">{toast.label}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AchievementsContext.Provider>
  );
}
