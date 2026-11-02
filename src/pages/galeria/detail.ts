import { SITE_TITLE, type PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper } from '../../lib/stepper';
import { arrowButton, bindArrows, goBack, header, mountHeader } from '../../ui/ui';
import notFound from '../not-found';
import { WORKS, backHref, workImage } from './data';
import { Glide } from '../../lib/glide';
import './galeria.css';

const N = WORKS.length;
/** slides rendered per strip: the loop is unrolled so that going 6 → 1 keeps moving forward */
const SLIDES = 2 * N;
const THUMBS = SLIDES + 2;
const VISIBLE_THUMBS = 3;


const page: PageFactory = (ctx) => {
  const n = Number(ctx.params.n);
  if (!Number.isInteger(n) || n < 1 || n > N) return notFound(ctx);

  const disposer = new Disposer();
  /** unbounded position (works advance forward past 6, then fold back) */
  let target = n - 1;

  // "back" is disabled on the first work (as in the design) while "next" loops 6 → 1
  const stepper = new Stepper({
    count: N,
    initial: n - 1,
    loop: 'forward',
    param: null,
    onChange: (to, from, dir) => {
      target += dir === 1 ? (to - from + N) % N || N : -1;
      if (target >= SLIDES) target -= N;
      glide.to(target, fold);
      refresh();
    },
  });

  const work = (i: number) => WORKS[i % N]!;
  const el = toElement(html`
    <div class="screen galeria">
      ${header('galeria')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden" data-title></h1>
        <div class="gal-photo">
          <ul class="gal-photo__strip">
            ${Array.from({ length: SLIDES }, (_, i) => html`<li class="gal-work">${picture(workImage(i % N), { alt: work(i).title, eager: i === n - 1 })}</li>`)}
          </ul>
        </div>
        <div class="gal-text">
          <ul class="gal-text__strip">
            ${Array.from(
              { length: SLIDES },
              (_, i) => html`
                <li class="gal-block">
                  <span class="accent"></span>
                  <h2 class="heading gal-block__heading">${work(i).title}</h2>
                  <div class="gal-block__rule"></div>
                  <p class="body-text gal-block__desc">${work(i).desc}</p>
                </li>`,
            )}
          </ul>
        </div>
        <div class="gal-thumbs">
          <ul class="gal-thumbs__strip">
            ${Array.from(
              { length: THUMBS },
              (_, j) => html`<li><button type="button" class="gal-thumb" data-j="${j}" aria-label="${work(j + 1).title}">${picture(workImage((j + 1) % N), { alt: '' })}</button></li>`,
            )}
          </ul>
        </div>
        <div class="galeria__arrows">${arrowButton('next', 'Następna praca')}${arrowButton('prev', 'Poprzednia praca')}</div>
        <p class="visually-hidden" aria-live="polite" data-live></p>
      </main>
      <footer class="section-bar">
        <p class="section-bar__title galeria__title"><a href="${backHref(n - 1)}" data-back>galeria</a></p>
        ${goBack(backHref(n - 1), 'section-bar__back')}
      </footer>
    </div>
  `);

  const glide = new Glide(el.querySelectorAll<HTMLElement>('.gal-photo__strip, .gal-text__strip, .gal-thumbs__strip'), '--pos', target);
  const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
  const slides = q<HTMLElement>('.gal-work');
  const blocks = q<HTMLElement>('.gal-block');
  const thumbs = q<HTMLButtonElement>('.gal-thumb');
  const backLinks = q<HTMLAnchorElement>('[data-back], .goback');
  const heading = el.querySelector<HTMLElement>('[data-title]');
  const live = el.querySelector<HTMLElement>('[data-live]');

  /** after the move to the unrolled copy of work 1, jump back to the real one (looks identical) */
  const fold = () => {
    if (target >= N) {
      target -= N;
      glide.set(target);
      refresh();
    }
  };

  const refresh = () => {
    const i = stepper.index;
    slides.forEach((s, k) => s.toggleAttribute('inert', k !== target));
    blocks.forEach((b, k) => b.toggleAttribute('inert', k !== target));
    thumbs.forEach((t, j) => t.toggleAttribute('inert', j < target || j >= target + VISIBLE_THUMBS));
    backLinks.forEach((a) => a.setAttribute('href', backHref(i)));
    if (heading) heading.textContent = work(i).title;
    if (live) live.textContent = `Praca ${i + 1} z ${N}: ${work(i).title}`;
    document.title = `${work(i).title} — ${SITE_TITLE}`;
    history.replaceState(history.state, '', `/galeria/${i + 1}`);
  };

  const onThumb = (e: Event) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('.gal-thumb');
    if (!btn) return;
    const steps = Number(btn.dataset.j) + 1 - target;
    if (steps >= 1) stepper.go(stepper.index + steps, 1);
  };

  return {
    title: work(n - 1).title,
    el,
    mount() {
      disposer.add(mountHeader(el));
      disposer.add(bindArrows(el, stepper));
      disposer.add(stepper.bindKeys());
      disposer.listen(el, 'click', onThumb);
      disposer.add(() => glide.stop());
      refresh();
    },
    destroy: () => disposer.run(),
  };
};
export default page;
