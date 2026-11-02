import arrowPrev from '../icons/arrow-prev.svg?raw';
import arrowNext from '../icons/arrow-next.svg?raw';
import gobackArrow from '../icons/goback-arrow.svg?raw';
import plusIcon from '../icons/plus.svg?raw';
import { html, raw, type Raw } from '../lib/html';
import type { Stepper } from '../lib/stepper';

export type Section = 'art' | 'galeria' | 'filmy';

const NAV: { id: Section; href: string; label: string }[] = [
  { id: 'art', href: '/art-project', label: 'Art Project' },
  { id: 'galeria', href: '/galeria', label: 'Galeria' },
  { id: 'filmy', href: '/filmy', label: 'Filmy' },
];

/**
 * Site header: logo (or the text brand on the home page) + three menu items.
 * The underline is one element that slides to the hovered item and back to the active one.
 */
export const header = (active: Section | null, brand: 'logo' | 'text' = 'logo'): Raw => html`
  <header class="site-header">
    ${brand === 'logo'
      ? html`<a class="site-logo" href="/" aria-label="PRŻ PROJ — strona główna">
          <img src="/img/ui/logo.svg" width="218" height="35" alt="" />
          <img class="site-logo__hover" src="/img/ui/logo-hover.svg" width="218" height="35" alt="" />
        </a>`
      : html`<a class="site-brand" href="/">Paradżanow Project</a>`}
    <nav class="site-nav" aria-label="Główne">
      <ul class="site-nav__list">
        ${NAV.map(
          (n) =>
            html`<li><a class="site-nav__link" href="${n.href}" data-nav="${n.id}" ${n.id === active ? raw('aria-current="page"') : ''}>${n.label}</a></li>`,
        )}
      </ul>
      <span class="site-nav__line" aria-hidden="true"></span>
    </nav>
  </header>
`;

/** Wires the sliding underline. Call after the header is in the document. */
export const mountHeader = (root: ParentNode): (() => void) => {
  const nav = root.querySelector<HTMLElement>('.site-nav');
  const line = nav?.querySelector<HTMLElement>('.site-nav__line');
  if (!nav || !line) return () => undefined;
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('.site-nav__link'));
  const current = links.find((a) => a.getAttribute('aria-current') === 'page') ?? null;

  const moveTo = (a: HTMLElement | null) => {
    if (!a) {
      nav.classList.remove('has-line');
      return;
    }
    nav.style.setProperty('--line-x', `${a.offsetLeft}px`);
    nav.style.setProperty('--line-w', `${a.offsetWidth}px`);
    nav.classList.add('has-line');
  };
  const reset = () => moveTo(current);

  // place without animation first
  nav.classList.add('no-anim');
  reset();
  requestAnimationFrame(() => nav.classList.remove('no-anim'));

  const onEnter = (e: Event) => moveTo(e.currentTarget as HTMLElement);
  links.forEach((a) => {
    a.addEventListener('pointerenter', onEnter);
    a.addEventListener('focus', onEnter);
    a.addEventListener('blur', reset);
  });
  nav.addEventListener('pointerleave', reset);
  const ro = new ResizeObserver(() => {
    nav.classList.add('no-anim');
    reset();
    requestAnimationFrame(() => nav.classList.remove('no-anim'));
  });
  ro.observe(nav);
  return () => ro.disconnect();
};

export const arrowButton = (dir: 'prev' | 'next', label?: string, extraClass = ''): Raw => html`
  <button type="button" class="arrow arrow--${dir} ${extraClass}" data-dir="${dir}"
    aria-label="${label ?? (dir === 'next' ? 'Dalej' : 'Wstecz')}">
    ${raw(dir === 'next' ? arrowNext : arrowPrev)}
  </button>
`;

/** Connects prev/next buttons to a stepper: click handlers + aria-disabled state. */
export const bindArrows = (root: ParentNode, stepper: Stepper, selector = ''): (() => void) => {
  const prev = root.querySelector<HTMLButtonElement>(`${selector} .arrow--prev`.trim());
  const next = root.querySelector<HTMLButtonElement>(`${selector} .arrow--next`.trim());
  const onPrev = () => stepper.prev();
  const onNext = () => stepper.next();
  prev?.addEventListener('click', onPrev);
  next?.addEventListener('click', onNext);
  const unsub = stepper.subscribe(() => {
    prev?.setAttribute('aria-disabled', String(!stepper.canPrev()));
    next?.setAttribute('aria-disabled', String(!stepper.canNext()));
  });
  return () => {
    unsub();
    prev?.removeEventListener('click', onPrev);
    next?.removeEventListener('click', onNext);
  };
};

export const goBack = (href: string, extraClass = ''): Raw => html`
  <a class="goback ${extraClass}" href="${href}">${raw(gobackArrow)}<span>go back</span></a>
`;

/** Bottom band: full-width line, section name, «go back». */
export const sectionBar = (title: string, backHref: string | null): Raw => html`
  <footer class="section-bar">
    <p class="section-bar__title">${title}</p>
    ${backHref ? goBack(backHref, 'section-bar__back') : ''}
  </footer>
`;

export const plusButton = (label: string, extraClass = ''): Raw => html`
  <button type="button" class="plus ${extraClass}" aria-label="${label}">${raw(plusIcon)}</button>
`;
