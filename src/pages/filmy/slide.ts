import type { AnimationPlaybackControls } from 'motion';
import { play } from '../../lib/motion';

type Spring = Parameters<typeof play>[2];

/**
 * Every carousel track in the section is `translateX(calc(var(--pos) * -100%))` with the track as
 * wide as one step, so a single animated number moves all tracks under `root` in sync
 * (the film page moves nine of them at once).
 */
export class Slide {
  private controls: AnimationPlaybackControls | null = null;
  private pos: number;

  constructor(
    private readonly root: HTMLElement,
    initial: number,
  ) {
    this.pos = initial;
    this.set(initial);
  }

  /** instant jump (initial state, loop wrap-around) */
  set(pos: number): void {
    this.controls?.stop();
    this.controls = null;
    this.pos = pos;
    this.root.style.setProperty('--pos', String(pos));
  }

  /** current visual position, also mid-animation */
  current(): number {
    const v = Number.parseFloat(getComputedStyle(this.root).getPropertyValue('--pos'));
    return Number.isFinite(v) ? v : this.pos;
  }

  to(pos: number, spring: Spring, onDone?: () => void): void {
    const from = this.current();
    this.controls?.stop();
    this.pos = pos;
    const controls = play(this.root, { '--pos': [from, pos] }, spring);
    this.controls = controls;
    void controls.finished.then(() => {
      if (this.controls !== controls) return;
      this.controls = null;
      this.root.style.setProperty('--pos', String(pos));
      onDone?.();
    });
  }

  stop(): void {
    this.controls?.stop();
    this.controls = null;
  }
}
