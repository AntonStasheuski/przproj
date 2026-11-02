import chevronPrev from '../../icons/chevron-prev.svg?raw';
import chevronNext from '../../icons/chevron-next.svg?raw';
import { html, raw, type Raw } from '../../lib/html';
import { picture } from '../../lib/img';
import { play, EASE_OUT } from '../../lib/motion';
import { Stepper } from '../../lib/stepper';
import { bindArrows } from '../../ui/ui';
import type { Disposer } from '../../lib/dispose';
import { BIO } from './data';

/**
 * Biography slider (Figma Component 31, variants Frame 7 → 11 → 8 → 9 → 10).
 * Only the photo and the paragraph change; slides cross-fade (DISSOLVE, ease-out 0.3 s).
 * ←/→ work while focus is inside the slider.
 */
export const bio = (): Raw => html`
  <section class="hs hs--light on-light bio" aria-labelledby="bio-title" data-reveal>
    <div class="hs__in bio__in" role="group" aria-roledescription="karuzela" aria-label="Biografia">
      <span class="bio__rule bio__rule--a" aria-hidden="true"></span>
      <span class="bio__rule bio__rule--b" aria-hidden="true"></span>
      <button type="button" class="bio__chev arrow--prev" aria-label="Poprzedni slajd">${raw(chevronPrev)}</button>
      <button type="button" class="bio__chev arrow--next" aria-label="Następny slajd">${raw(chevronNext)}</button>
      <p class="home-ui bio__caption">${BIO.caption.map((l, i) => html`${i ? raw('<br>') : ''}${l}`)}</p>
      <span class="accent bio__accent" aria-hidden="true"></span>
      <h2 class="heading bio__title" id="bio-title">${BIO.title[0]}<br />${BIO.title[1]}</h2>
      <p class="home-ui bio__years">${BIO.years}</p>
      <span class="home-rule bio__line" aria-hidden="true"></span>
      ${BIO.slides.map(
        (text, i) => html`
          <div class="bio__slide ${i === 0 ? 'is-active' : ''}" ${i === 0 ? '' : raw('aria-hidden="true" inert')}>
            <p class="body-text bio__text ${i === 2 || i === 4 ? 'bio__text--wide' : ''}">${text}</p>
            <div class="bio__photo">${picture(`home/bio-${i + 1}`, { alt: 'Siergiej Paradżanow — kolaż' })}</div>
          </div>
        `,
      )}
      <p class="visually-hidden" aria-live="polite" data-bio-status>Slajd 1 z ${BIO.slides.length}</p>
    </div>
  </section>
`;

export const mountBio = (root: ParentNode, disposer: Disposer): void => {
  const box = root.querySelector<HTMLElement>('.bio__in');
  if (!box) return;
  const slides = Array.from(box.querySelectorAll<HTMLElement>('.bio__slide'));
  const status = box.querySelector<HTMLElement>('[data-bio-status]');

  const stepper = new Stepper({
    count: slides.length,
    param: null,
    onChange: (to, from) => {
      const a = slides[from];
      const b = slides[to];
      if (!a || !b) return;
      a.classList.remove('is-active');
      b.classList.add('is-active');
      a.setAttribute('aria-hidden', 'true');
      a.inert = true;
      b.removeAttribute('aria-hidden');
      b.inert = false;
      play(a, { opacity: 0 }, EASE_OUT);
      play(b, { opacity: 1 }, EASE_OUT);
      if (status) status.textContent = `Slajd ${to + 1} z ${slides.length}`;
    },
  });
  disposer.add(bindArrows(box, stepper));

  disposer.listen(box, 'keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    if (k !== 'ArrowLeft' && k !== 'ArrowRight') return;
    e.preventDefault();
    if (k === 'ArrowLeft') stepper.prev();
    else stepper.next();
  });
};
