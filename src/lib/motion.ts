import { animate, type AnimationOptions, type DOMKeyframesDefinition } from 'motion';

/**
 * Figma prototype easing presets (SPEC.md §4). SLOW and GENTLE are springs;
 * Figma reports their settle time as the duration (2.08 s / 1.02 s).
 */
export const SPRING_SLOW = { type: 'spring', stiffness: 80, damping: 20, mass: 1 } as const;
export const SPRING_GENTLE = { type: 'spring', stiffness: 100, damping: 15, mass: 1 } as const;
export const EASE_OUT = { duration: 0.3, ease: [0, 0, 0.58, 1] } as const;

const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
export const reducedMotion = (): boolean => mq.matches;

/** animate() that collapses to an instant change when the user prefers reduced motion. */
export const play = (
  target: Element | Element[] | NodeListOf<Element>,
  keyframes: DOMKeyframesDefinition,
  options: AnimationOptions = SPRING_SLOW,
) => {
  const list = target instanceof Element ? [target] : Array.from(target);
  return animate(list, keyframes, reducedMotion() ? { duration: 0 } : options);
};
