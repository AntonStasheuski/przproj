import { animate } from 'motion';
import { SPRING_SLOW, reducedMotion } from './motion';

type Spring = { type: 'spring'; stiffness: number; damping: number; mass: number };

/**
 * Animates a unitless position written to one CSS custom property on each strip element, so several
 * strips move in sync. The property is registered as non-inherited (base.css), so a frame restyles
 * only the strips, not their subtrees. Default spring is Figma's SLOW preset; film pages pass GENTLE.
 */
export class Glide {
  pos: number;
  private ctl: { stop: () => void } | null = null;

  private readonly hosts: HTMLElement[];

  constructor(
    host: HTMLElement | Iterable<HTMLElement>,
    private readonly prop: string,
    initial = 0,
  ) {
    this.hosts = host instanceof HTMLElement ? [host] : Array.from(host);
    this.pos = initial;
    this.write();
  }

  set(v: number): void {
    this.ctl?.stop();
    this.ctl = null;
    this.pos = v;
    this.write();
  }

  to(target: number, done?: () => void, spring: Spring = SPRING_SLOW): void {
    this.ctl?.stop();
    if (reducedMotion()) {
      this.set(target);
      done?.();
      return;
    }
    this.ctl = animate(this.pos, target, {
      ...spring,
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
    const v = String(this.pos);
    for (const h of this.hosts) h.style.setProperty(this.prop, v);
  }
}
