import type { PageFactory } from '../../router';
import { html, toElement, vars } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper } from '../../lib/stepper';
import { SPRING_SLOW } from '../../lib/motion';
import { arrowButton, bindArrows, header, mountHeader, sectionBar } from '../../ui/ui';
import { FILMS, PER_PAGE } from './data';
import { Slide } from './slide';
import './plakaty.css';

/**
 * /filmy/plakaty (198:350, 376:2679) and /filmy/fakty (378:2705, 378:2732): the same poster carousel,
 * two pages of three. Plakaty show the posters with titles and lead to the film pages,
 * Fakty show the bare artwork and lead to the facts accordion.
 */
const MODES = {
  plakaty: {
    title: 'Plakaty',
    heading: 'Filmy — plakaty',
    asset: 'plakaty',
    href: (slug: string) => `/filmy/${slug}`,
    linkLabel: (name: string) => `${name} — strona filmu`,
    // poster x / y in the window (Frame 33 376:2664); the second page is the track shifted by its width
    x: [11, 459, 907, 1352, 1799, 2245],
    y: [11, 10, 11, 12, 11, 11],
  },
  fakty: {
    title: 'Fakty',
    heading: 'Filmy — fakty',
    asset: 'fakty',
    href: (slug: string) => `/filmy/fakty/${slug}`,
    linkLabel: (name: string) => `${name} — fakty o filmie`,
    x: [12, 459, 906, 1352, 1798, 2244],
    y: [10, 10, 10, 10, 10, 10],
  },
} as const;

/** captions (Murecho 19, 402 wide, centered) sit under the posters, 7 px lower on the second page */
const CAPTION_X = [12, 459, 907, 1352, 1799, 2247];

/** hover = the grey variant from componenty (saturation −1; Andriesz and Legenda also get contrast) */
const HOVER_CONTRAST: Record<string, number> = { andrijesz: 1.3, legenda: 1.47 };

const PAGES = Math.ceil(FILMS.length / PER_PAGE);

const page: PageFactory = ({ url }) => {
  const mode = url.pathname.replace(/\/$/, '').endsWith('/fakty') ? MODES.fakty : MODES.plakaty;
  const disposer = new Disposer();

  const el = toElement(html`
    <div class="screen filmy-carousel filmy-carousel--${mode.asset}">
      ${header('filmy')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden">${mode.heading}</h1>
        <p class="visually-hidden" aria-live="polite" data-status></p>
        <div class="filmy-carousel__window">
          <ul class="filmy-carousel__track">
            ${FILMS.map(
              (f, i) => html`<li class="filmy-carousel__item" data-page="${Math.floor(i / PER_PAGE)}">
                <a class="filmy-poster" href="${mode.href(f.slug)}" aria-label="${mode.linkLabel(f.caption)}"
                  style="${vars({ x: mode.x[i] ?? 0, y: mode.y[i] ?? 0, hc: HOVER_CONTRAST[f.slug] ?? 1 })}"
                  >${picture(`filmy/${mode.asset}/${f.slug}`, { alt: '', eager: i < PER_PAGE })}</a>
                <p class="filmy-poster__caption" style="${vars({ x: CAPTION_X[i] ?? 0 })}">${f.caption}</p>
              </li>`,
            )}
          </ul>
        </div>
        ${arrowButton('next', 'Następne filmy', 'filmy-carousel__next')}
        ${arrowButton('prev', 'Poprzednie filmy', 'filmy-carousel__prev')}
      </main>
      ${sectionBar('Filmy', '/filmy')}
    </div>
  `);

  const track = el.querySelector<HTMLElement>('.filmy-carousel__track');
  const status = el.querySelector<HTMLElement>('[data-status]');
  const items = Array.from(el.querySelectorAll<HTMLElement>('.filmy-carousel__item'));

  // the mobile layout shows all posters at once (plakaty.css)
  const paged = window.matchMedia('(min-width: 1024px)');
  let slide: Slide | null = null;
  const sync = (index: number) => {
    // posters of the hidden page are out of the tab order and the accessibility tree
    items.forEach((it) => (it.inert = paged.matches && Number(it.dataset.page) !== index));
    if (status) status.textContent = `Krok ${index + 1} z ${PAGES}`;
  };

  const stepper = new Stepper({
    count: PAGES,
    onChange: (to) => {
      slide?.to(to, SPRING_SLOW);
      sync(to);
    },
  });

  return {
    title: mode.title,
    el,
    mount: () => {
      if (track) slide = new Slide(track, stepper.index);
      sync(stepper.index);
      disposer.add(mountHeader(el));
      disposer.add(bindArrows(el, stepper));
      disposer.add(stepper.bindKeys());
      disposer.add(() => slide?.stop());
      const onLayout = () => sync(stepper.index);
      paged.addEventListener('change', onLayout);
      disposer.add(() => paged.removeEventListener('change', onLayout));
    },
    destroy: () => disposer.run(),
  };
};
export default page;
