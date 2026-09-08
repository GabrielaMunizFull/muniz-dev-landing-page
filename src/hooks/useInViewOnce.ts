import { useEffect, useState, type RefObject } from 'react';

/** true assim que o elemento entra na viewport uma vez (ou de cara, se
 *  IntersectionObserver não existir / reduced-motion). Substitui o useInView do framer. */
export function useInViewOnce(
  ref: RefObject<Element | null>,
  rootMargin = '0px 0px -80px 0px',
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
