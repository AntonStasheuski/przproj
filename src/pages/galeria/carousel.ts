import type { PageFactory } from '../../router';
import { html, lines, toElement, vars } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper } from '../../lib/stepper';
import { arrowButton, bindArrows, goBack, header, mountHeader } from '../../ui/ui';
import { WORKS, workImage } from './data';
import { Glide } from './glide';
import './galeria.css';

/** vertical offsets of the cards and caption gaps, as drawn in Figma (px) */
const CARD_GEOMETRY = [
  { dy: 0, gap: 25 },
  { dy: 0, gap: 28 },
  { dy: 0, gap: 28 },
  { dy: 3, gap: 25 },
  { dy: 3, gap: 25 },
  { dy: 3, gap: 25 },
];

const PER_PAGE = 3;

const page: PageFactory = () => {
  const disposer = new Disposer();
  const stepper = new Stepper({ count: 2, onChange: (to) => glide.to(to) });

  const el = toElement(html`
    <div class="screen galeria">
      ${header('galeria')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden">Galeria</h1>
        <div class="gal-window">
          <ul class="gal-strip">
            ${WORKS.map(
              (w, i) => html`
                <li class="gal-card" style="${vars({ dy: CARD_GEOMETRY[i]?.dy ?? 0, gap: CARD_GEOMETRY[i]?.gap ?? 25 })}">
                  <a href="/galeria/${i + 1}">
                    ${picture(workImage(i), { alt: '', width: 411, eager: i < PER_PAGE })}
                    <span class="gal-card__cap">${lines(w.caption)}</span>
                  </a>
                </li>`,
            )}
          </ul>
        </div>
        <div class="galeria__arrows galeria__arrows--carousel">
          ${arrowButton('next', 'Następne prace')}${arrowButton('prev', 'Poprzednie prace')}
        </div>
        <p class="visually-hidden" aria-live="polite" data-live></p>
      </main>
      <footer class="section-bar">
        <p class="section-bar__title galeria__title"><a href="/galeria">galeria</a></p>
        ${goBack('/', 'section-bar__back')}
      </footer>
    </div>
  `);

  const glide = new Glide(el, '--page', stepper.index);
  const cards = Array.from(el.querySelectorAll<HTMLElement>('.gal-card'));
  const live = el.querySelector<HTMLElement>('[data-live]');
  const mobile = window.matchMedia('(max-width: 1023px)');

  // cards of the other page are neither focusable nor read out (on mobile all are in a column)
  const sync = () => {
    cards.forEach((c, i) => {
      c.inert = !mobile.matches && Math.floor(i / PER_PAGE) !== stepper.index;
    });
    if (live) live.textContent = `Krok ${stepper.index + 1} z ${stepper.count}`;
  };

  return {
    title: 'Galeria',
    el,
    mount() {
      disposer.add(mountHeader(el));
      disposer.add(bindArrows(el, stepper));
      disposer.add(stepper.bindKeys());
      disposer.add(stepper.subscribe(sync));
      mobile.addEventListener('change', sync);
      disposer.add(() => mobile.removeEventListener('change', sync));
      disposer.add(() => glide.stop());
    },
    destroy: () => disposer.run(),
  };
};
export default page;
