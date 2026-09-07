import { useEffect, useState } from 'react';

/**
 * Observa as <section id> das stages e devolve o id da que está mais
 * visível na viewport. IntersectionObserver — sem listener de scroll.
 */
export function useActiveStage(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
          else visible.delete(id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n != null);
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
