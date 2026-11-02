/** Collects cleanup callbacks of a mounted page. */
export class Disposer {
  private readonly fns: (() => void)[] = [];

  add(fn: (() => void) | undefined | void): void {
    if (fn) this.fns.push(fn);
  }

  listen<K extends keyof HTMLElementEventMap>(el: HTMLElement | Document | Window, type: K | string, fn: (e: Event) => void, opts?: AddEventListenerOptions): void {
    el.addEventListener(type, fn, opts);
    this.fns.push(() => el.removeEventListener(type, fn, opts));
  }

  run(): void {
    this.fns.splice(0).reverse().forEach((fn) => fn());
  }
}
