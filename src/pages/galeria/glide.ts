import { animate } from 'motion';
import { SPRING_SLOW, reducedMotion } from '../../lib/motion';

/**
 * Animates a unitless position written to one CSS custom property. Several strips read the same
 * variable, so they move in sync; the spring is Figma's SLOW preset (no overshoot).
 */
export class Glide {
  pos: number;
  private ctl: { stop: () => void } | null = null;

  constructor(
    private readonly host: HTMLElement,
    private readonly prop: string,
    initial = 0,
  ) {
    this.pos = initial;
    this.write();
  }

  set(v: number): void {
    this.ctl?.stop();
    this.ctl = null;
    this.pos = v;
    this.write();
  }

  to(target: number, done?: () => void): void {
    this.ctl?.stop();
    if (reducedMotion()) {
      this.set(target);
      done?.();
      return;
    }
    this.ctl = animate(this.pos, target, {
      ...SPRING_SLOW,
      onUpdate: (v: number) => {
        this.pos = v;
        this.write();
      },
      onComplete: () => {
        this.pos = target;
        this.write();
        this.ctl = null;
        done?.();
      },
    });
  }

  stop(): void {
    this.ctl?.stop();
    this.ctl = null;
  }

  private write(): void {
    this.host.style.setProperty(this.prop, String(this.pos));
  }
}
