import { reducedMotion } from './lib/motion';

export interface PageContext {
  params: Record<string, string>;
  url: URL;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

export interface Page {
  el: HTMLElement;
  title: string;
  /** called after the element is in the document */
  mount?: () => void;
  destroy?: () => void;
}

export type PageFactory = (ctx: PageContext) => Page | Promise<Page>;

export interface Route {
  path: string;
  load: () => Promise<{ default: PageFactory }>;
}

interface Compiled extends Route {
  re: RegExp;
  keys: string[];
}

const compile = (r: Route): Compiled => {
  const keys: string[] = [];
  const pattern = r.path.replace(/:(\w+)/g, (_, k: string) => {
    keys.push(k);
    return '([^/]+)';
  });
  return { ...r, re: new RegExp(`^${pattern}/?$`), keys };
};

export const SITE_TITLE = 'PRŻ PROJ';

export class Router {
  private readonly routes: Compiled[];
  private current: Page | null = null;
  private token = 0;
  /** pathname + search of the rendered page: hash-only history entries (anchors) do not re-render */
  private shown = '';

  constructor(
    private readonly root: HTMLElement,
    routes: Route[],
    private readonly notFound: Route['load'],
  ) {
    this.routes = routes.map(compile);
    history.scrollRestoration = 'manual';
    document.addEventListener('click', this.onClick);
    window.addEventListener('popstate', () => {
      if (location.pathname + location.search !== this.shown) void this.render(true);
    });
  }

  start(): Promise<void> {
    return this.render(false);
  }

  navigate = (to: string, opts: { replace?: boolean } = {}): void => {
    const url = new URL(to, location.href);
    if (url.href === location.href) return;
    history.replaceState({ ...history.state, scrollY: window.scrollY }, '');
    if (opts.replace) history.replaceState(null, '', url);
    else history.pushState(null, '', url);
    void this.render(false);
  };

  private onClick = (e: MouseEvent): void => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest('a');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    // in-page anchors: let the browser scroll (smoothly, see base.css)
    if (url.hash && url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    this.navigate(url.pathname + url.search + url.hash);
  };

  private match(pathname: string): { route: Route['load']; params: Record<string, string> } {
    for (const r of this.routes) {
      const m = r.re.exec(pathname);
      if (m) {
        const params: Record<string, string> = {};
        r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1] ?? '')));
        return { route: r.load, params };
      }
    }
    return { route: this.notFound, params: {} };
  }

  private async render(isPop: boolean): Promise<void> {
    const token = ++this.token;
    const url = new URL(location.href);
    this.shown = url.pathname + url.search;
    const { route, params } = this.match(url.pathname);
    const mod = await route();
    const page = await mod.default({ params, url, navigate: this.navigate });
    if (token !== this.token) {
      page.destroy?.();
      return;
    }

    const swap = () => {
      this.current?.destroy?.();
      this.root.replaceChildren(page.el);
      this.current = page;
      document.title = page.title ? `${page.title} — ${SITE_TITLE}` : `${SITE_TITLE} — Siergiej Paradżanow`;
      const y = isPop ? Number((history.state as { scrollY?: number } | null)?.scrollY ?? 0) : 0;
      window.scrollTo({ top: y, behavior: 'instant' });
      // images served from cache may already be decoded: show them without the fade-in
      page.el.querySelectorAll<HTMLImageElement>('img[data-fade]').forEach((img) => {
        if (img.complete && img.naturalWidth) img.classList.add('is-loaded');
      });
      page.mount?.();
    };

    const first = this.root.childElementCount === 0;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (first || reducedMotion() || !doc.startViewTransition) swap();
    else await doc.startViewTransition(swap).finished.catch(() => undefined);

    if (!first && !isPop) {
      const target = page.el.querySelector<HTMLElement>('#main') ?? page.el;
      target.focus({ preventScroll: true });
    }
  }
}
