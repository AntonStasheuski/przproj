import { animate } from 'motion';
import { reducedMotion } from '../../lib/motion';

/**
 * Sections fade in when they scroll into view (opacity 0→1, translateY 24→0, 0.6 s ease-out).
 * Only the inner layer moves; the section box and its background stay put, so layout never shifts.
 * Without JS or with reduced motion everything is visible from the start.
 */
export const mountReveal = (root: ParentNode): (() => void) => {
  if (reducedMotion() || !('IntersectionObserver' in window)) return () => undefined;
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal] > .hs__in'));
  layers.forEach((el) => el.classList.add('is-pending'));

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        el.classList.remove('is-pending');
        animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: [0, 0, 0.58, 1] }).then(() =>
          el.style.removeProperty('transform'),
        );
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0 },
  );
  layers.forEach((el) => io.observe(el));
  return () => io.disconnect();
};
