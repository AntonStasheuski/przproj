import type { PageFactory } from '../../router';
import { html, lines, raw, toElement } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper, type Direction } from '../../lib/stepper';
import { SPRING_SLOW, play, reducedMotion } from '../../lib/motion';
import { arrowButton, bindArrows, goBack, header, hideKeepingFocus, mountHeader } from '../../ui/ui';
import notFound from '../not-found';
import { filmBySlug, type Film } from './data';
import './fakty.css';

/* Geometry of the Figma window, design px. Everything is animated in percent of the panel
   (847 wide), so the same keyframes work at any viewport scale. */
const PANEL = 847;
const STRIP = 153;
const SHIFT = PANEL - STRIP;
const NUM_W = 822;
const COUNT = 5;

/** left edge of slot s: 0 = expanded, 1…4 = strips, -1 / 5 = parked outside the window */
const slotX = (s: number): number => (s < 0 ? -STRIP : s === 0 ? 0 : SHIFT + STRIP * s);
const pct = (px: number, of: number): string => `${((px / of) * 100).toFixed(4)}%`;

const frame = (slot: number) => {
  const open = slot === 0;
  return {
    transform: `translateX(${pct(slotX(slot), PANEL)})`,
    clipPath: `inset(0% ${open ? '0%' : pct(SHIFT, PANEL)} 0% 0%)`,
    num: `translateX(${open ? '0%' : pct(-SHIFT, NUM_W)})`,
    open,
  };
};

const pad = (n: number): string => String(n).padStart(2, '0');

const panelMarkup = (film: Film, i: number, active: number) => {
  const fact = i > 0 ? film.facts[i - 1] : undefined;
  return html`
    <article class="fk-panel" data-panel="${i}" ${fact?.dim ? raw('data-dim') : ''}>
      <div class="fk-img">${picture(`fakty/${film.slug}-${i + 1}`, { alt: `Kadr z filmu ${film.title.join(' ')}`, eager: i === active })}</div>
      <div class="fk-strip">${picture(`fakty/${film.slug}-strip-${i + 1}`, { alt: '', eager: true })}</div>
      <div class="fk-content ${fact ? 'fk-content--fact' : 'fk-content--title'}">
        ${fact
          ? html`
              <h2 class="fk-head">${fact.head}</h2>
              <div class="fk-body" style="--w:${fact.w};--x:${fact.x ?? 25};--b:${fact.b ?? 25}">
                <span class="accent" aria-hidden="true"></span>
                <p class="fk-text">${fact.text}</p>
              </div>`
          : html`
              <span class="accent fk-accent--title" aria-hidden="true"></span>
              <h2 class="fk-head fk-head--title">${lines(film.title.join('\n'))}</h2>`}
      </div>
      <span class="fk-num" aria-hidden="true">${pad(i + 1)}</span>
    </article>`;
};

const page: PageFactory = (ctx) => {
  const film = filmBySlug(ctx.params.slug ?? '');
  if (!film) return notFound(ctx);

  const disposer = new Disposer();
  const title = film.title.join(' ');
  let running: { cancel: () => void }[] = [];
  let ghosts: HTMLElement[] = [];

  const stepper = new Stepper({ count: COUNT, loop: 'forward', onChange: (to, from, dir) => move(to, from, dir) });

  const el = toElement(html`
    <div class="screen fk">
      ${header('filmy')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden">Fakty: ${title}</h1>
        <div class="fk-window">${Array.from({ length: COUNT }, (_, i) => panelMarkup(film, i, stepper.index))}</div>
        ${arrowButton('prev', 'Poprzedni fakt')}${arrowButton('next', 'Następny fakt')}
        <p class="visually-hidden" aria-live="polite" data-live></p>
      </main>
      <footer class="section-bar">
        <a class="section-bar__title fk-filmy" href="/filmy">Filmy</a>
        ${goBack('/filmy/fakty', 'section-bar__back')}
      </footer>
    </div>
  `);

  const win = el.querySelector<HTMLElement>('.fk-window') as HTMLElement;
  const panels = Array.from(win.querySelectorAll<HTMLElement>('.fk-panel'));
  const prev = el.querySelector<HTMLElement>('.arrow--prev');
  const live = el.querySelector<HTMLElement>('[data-live]');
  const mobile = window.matchMedia('(max-width: 1023px)');

  const slotOf = (i: number, active: number): number => (i - active + COUNT) % COUNT;

  /** static state: data-slot drives the CSS layout; strips are hidden from assistive tech */
  const place = (active: number): void => {
    panels.forEach((p, i) => {
      const s = slotOf(i, active);
      p.dataset.slot = String(s);
      p.inert = s !== 0;
    });
    if (prev) hideKeepingFocus(prev, active === 0, el.querySelector('.arrow--next'));
    if (live) live.textContent = `Krok ${active + 1} z ${COUNT}`;
  };

  place(stepper.index);

  /** drop any running animation and leave the DOM in its final (static) state */
  const settle = (): void => {
    running.forEach((a) => a.cancel());
    running = [];
    ghosts.forEach((g) => g.remove());
    ghosts = [];
    win.querySelectorAll<HTMLElement>('[style*="transform"], [style*="clip-path"], [style*="opacity"]').forEach((n) => {
      n.style.removeProperty('transform');
      n.style.removeProperty('clip-path');
      n.style.removeProperty('opacity');
    });
  };

  const glide = (p: HTMLElement, a: number, b: number): void => {
    const from = frame(a);
    const to = frame(b);
    const content = p.querySelector<HTMLElement>('.fk-content');
    const strip = p.querySelector<HTMLElement>('.fk-strip');
    const num = p.querySelector<HTMLElement>('.fk-num');
    const run = (target: Element | null, kf: Parameters<typeof play>[1], opts?: Parameters<typeof play>[2]) => {
      if (target) running.push(play(target, kf, opts));
    };
    run(p, { transform: [from.transform, to.transform], clipPath: [from.clipPath, to.clipPath] }, SPRING_SLOW);
    if (from.open !== to.open) {
      // the open picture and the strip are separate crops in Figma: the strip dissolves over / off the picture
      run(strip, { opacity: from.open ? [0, 1] : [1, 0] }, SPRING_SLOW);
    }
    run(num, { transform: [from.num, to.num] }, SPRING_SLOW);
    if (from.open !== to.open) {
      run(content, { opacity: from.open ? [1, 0] : [0, 1] }, from.open ? { duration: 0.25, ease: 'easeOut' } : { duration: 0.6, delay: 0.35, ease: 'easeOut' });
    }
  };

  const move = (to: number, from: number, dir: Direction): void => {
    settle();
    const olds = panels.map((_, i) => slotOf(i, from));
    const news = panels.map((_, i) => slotOf(i, to));
    if (mobile.matches || reducedMotion()) {
      place(to);
      return;
    }
    // the panel that wraps around leaves through one edge (a clone) and enters through the other
    const leaving = panels.map((_, i) => i).find((i) => (dir === 1 ? olds[i] === 0 : olds[i] === COUNT - 1));
    const ghost = leaving === undefined ? null : (panels[leaving] as HTMLElement).cloneNode(true) as HTMLElement;
    if (ghost) {
      ghost.classList.add('fk-ghost');
      ghost.inert = true;
      ghost.setAttribute('aria-hidden', 'true');
      ghost.dataset.slot = String(olds[leaving as number]);
      win.append(ghost);
      ghosts.push(ghost);
    }
    place(to);
    panels.forEach((p, i) => {
      const a = olds[i] as number;
      const b = news[i] as number;
      if (i === leaving && ghost) {
        glide(ghost, a, dir === 1 ? -1 : COUNT);
        glide(p, dir === 1 ? COUNT : -1, b);
      } else {
        glide(p, a, b);
      }
    });
    const last = running.slice();
    void Promise.allSettled(last.map((a) => (a as unknown as { finished?: Promise<unknown> }).finished)).then(() => {
      if (running.length === last.length && running.every((a, k) => a === last[k])) settle();
    });
  };

  return {
    title: `Fakty — ${title}`,
    el,
    mount() {
      disposer.add(mountHeader(el));
      disposer.add(bindArrows(el, stepper));
      disposer.add(stepper.bindKeys());
      disposer.add(() => settle());
    },
    destroy() {
      disposer.run();
    },
  };
};

export default page;
