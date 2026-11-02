import type { PageFactory } from '../../router';
import { html, toElement, vars } from '../../lib/html';
import { picture, size } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper } from '../../lib/stepper';
import { arrowButton, bindArrows, goBack, header, mountHeader } from '../../ui/ui';
import { Glide } from '../../lib/glide';
import notFound from '../not-found';
import { COPY_X, COUNTRIES, SLIDE_W } from './data';
import { richLines } from './text';
import './kraje.css';

const page: PageFactory = (ctx) => {
  const country = COUNTRIES[ctx.params.slug ?? ''];
  if (!country) return notFound(ctx);

  const disposer = new Disposer();
  const stepper = new Stepper({ count: country.slides.length, onChange: (to) => glide.to(to) });

  const el = toElement(html`
    <div class="screen kraj">
      ${header('filmy')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden">${country.name}</h1>
        <div class="kraj-window">
          <ol class="kraj-strip">
            ${country.slides.map((s, n) => {
              const [ax, tx] = COPY_X[n] ?? [45, 45];
              return html`
                <li class="kraj-slide" style="${vars({ ax, tx, rule: s.rule, tw: s.textW })}">
                  <div class="kraj-art" aria-hidden="true">
                    ${s.pieces.map(([file, x, y]) => {
                      const key = `kraje/${country.slug}/${file}`;
                      const { w, h } = size(key);
                      return html`<span class="kraj-piece" style="${vars({ x: x - n * SLIDE_W, y, w, h })}">${picture(key, { eager: n === stepper.index })}</span>`;
                    })}
                  </div>
                  <div class="kraj-copy">
                    <span class="accent kraj-copy__bar"></span>
                    <h2 class="heading kraj-copy__title">${country.name}</h2>
                    <p class="kraj-copy__sub">${s.sub}</p>
                    <hr class="kraj-copy__rule" />
                    <p class="body-text kraj-copy__text">${richLines(s.text)}</p>
                  </div>
                </li>`;
            })}
          </ol>
        </div>
        ${country.cover ? html`<span class="kraj-cover" aria-hidden="true"></span>` : ''}
        ${arrowButton('prev', 'Poprzedni slajd')}${arrowButton('next', 'Następny slajd')}
        <p class="visually-hidden" aria-live="polite" data-live></p>
      </main>
      <footer class="section-bar">
        <p class="section-bar__title">filmy</p>
        ${goBack('/filmy/kraje', 'section-bar__back')}
      </footer>
    </div>
  `);

  const glide = new Glide(el, '--pos', stepper.index);
  const slides = Array.from(el.querySelectorAll<HTMLElement>('.kraj-slide'));
  const prev = el.querySelector<HTMLElement>('.arrow--prev');
  const live = el.querySelector<HTMLElement>('[data-live]');
  const mobile = window.matchMedia('(max-width: 1023px)');

  // the first slide has no «back» arrow (as in the design); off-screen slides are neither focusable nor read out
  const sync = () => {
    if (prev) prev.hidden = !stepper.canPrev();
    slides.forEach((s, i) => {
      s.inert = !mobile.matches && i !== stepper.index;
    });
    if (live) live.textContent = `Krok ${stepper.index + 1} z ${stepper.count}`;
  };

  return {
    title: country.name,
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
