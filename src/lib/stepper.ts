/**
 * Numbered Figma frames are states of one screen. Stepper owns the current
 * index, keeps it in the URL (?krok=N, replaceState) and wires ←/→ keys.
 */
export type Direction = 1 | -1;

export interface StepperOptions {
  count: number;
  initial?: number;
  /** true: both ends wrap; 'forward': next wraps last → first, prev stops at the first state */
  loop?: boolean | 'forward';
  /** query parameter that mirrors the state (1-based); null disables URL sync */
  param?: string | null;
  onChange: (to: number, from: number, dir: Direction) => void;
}

export const isTyping = (t: EventTarget | null): boolean =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

export class Stepper {
  index: number;
  private readonly opts: Required<Omit<StepperOptions, 'initial'>>;
  private readonly listeners = new Set<() => void>();

  constructor(options: StepperOptions) {
    this.opts = { loop: false, param: 'krok', ...options };
    const params = new URL(location.href).searchParams;
    const fromUrl = this.opts.param && params.has(this.opts.param) ? Number(params.get(this.opts.param)) - 1 : NaN;
    const start = Number.isInteger(fromUrl) ? fromUrl : (options.initial ?? 0);
    this.index = this.clamp(start);
  }

  get count(): number {
    return this.opts.count;
  }

  canPrev(): boolean {
    return this.opts.loop === true || this.index > 0;
  }

  canNext(): boolean {
    return this.opts.loop !== false || this.index < this.opts.count - 1;
  }

  next(): void {
    if (this.canNext()) this.go(this.index + 1, 1);
  }

  prev(): void {
    if (this.canPrev()) this.go(this.index - 1, -1);
  }

  go(target: number, dir?: Direction): void {
    const n = this.opts.count;
    const to = this.opts.loop !== false ? ((target % n) + n) % n : this.clamp(target);
    if (to === this.index) return;
    const from = this.index;
    this.index = to;
    this.syncUrl();
    this.opts.onChange(to, from, dir ?? (to > from ? 1 : -1));
    this.listeners.forEach((fn) => fn());
  }

  /** Called after every change (used to refresh arrow states). */
  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    fn();
    return () => this.listeners.delete(fn);
  }

  /** ←/→ on the document while this screen is mounted. Returns an unbind function. */
  bindKeys(): () => void {
    const onKey = (e: KeyboardEvent) => {
      // auto-repeat is ignored: holding a key would otherwise spam history.replaceState
      if (e.defaultPrevented || e.repeat || e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }

  private clamp(i: number): number {
    return Math.min(Math.max(i, 0), this.opts.count - 1);
  }

  private syncUrl(): void {
    const { param } = this.opts;
    if (!param) return;
    const url = new URL(location.href);
    if (this.index === 0) url.searchParams.delete(param);
    else url.searchParams.set(param, String(this.index + 1));
    history.replaceState(history.state, '', url);
  }
}
