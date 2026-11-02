import { html, raw, type Raw } from '../../lib/html';
import { picture } from '../../lib/img';
import { play, SPRING_GENTLE, EASE_OUT } from '../../lib/motion';
import type { Disposer } from '../../lib/dispose';
import { SECTIONS } from './data';

/**
 * Section selector (Figma Component 182): three columns, one open (584 wide, with the
 * section title in Playfair 96), two closed (394). Images keep one aspect ratio, so a column
 * is driven by a single number, --w (design px). Clicking a closed column opens it; the
 * open column's image/title and every label lead to the section.
 */
const OPEN = 584;
const CLOSED = 394;

export const selector = (): Raw => html`
  <section class="hs sel" aria-label="Działy" data-reveal>
    <div class="hs__in">
      <ul class="sel__row">
        ${SECTIONS.map(
          (s, i) => html`
            <li class="sel__col ${i === 0 ? 'is-open' : ''}" data-col="${i}">
              <a class="sel__media" href="${s.href}" tabindex="-1" aria-hidden="true">
                ${picture(`home/sel-${s.id}`, { className: 'sel__img' })}
                <span class="sel__title">${s.title.map((t, k) => html`${k ? raw('<br>') : ''}${t}`)}</span>
              </a>
              <button type="button" class="sel__toggle"
                aria-label="Pokaż dział ${s.label}" ${i === 0 ? raw('hidden') : ''}></button>
              <a class="sel__label" href="${s.href}">${s.label}</a>
            </li>
          `,
        )}
      </ul>
    </div>
  </section>
`;

export const mountSelector = (root: ParentNode, disposer: Disposer): void => {
  const cols = Array.from(root.querySelectorAll<HTMLElement>('.sel__col'));
  let current = cols.findIndex((c) => c.classList.contains('is-open'));

  const width = (c: HTMLElement) => parseFloat(getComputedStyle(c).getPropertyValue('--w')) || CLOSED;

  const open = (i: number) => {
    const from = cols[current];
    const to = cols[i];
    if (i === current || !from || !to) return;
    const w0 = width(from);
    const w1 = width(to);
    current = i;
    const hadFocus = to.contains(document.activeElement);

    from.classList.remove('is-open');
    to.classList.add('is-open');
    cols.forEach((c, n) => {
      const btn = c.querySelector<HTMLButtonElement>('.sel__toggle');
      if (btn) btn.hidden = n === i;
    });
    // keyboard focus moves from the now hidden button to the opened column's label
    if (hadFocus) to.querySelector<HTMLElement>('.sel__label')?.focus();

    play(from, { '--w': [w0, CLOSED] }, SPRING_GENTLE);
    play(to, { '--w': [w1, OPEN] }, SPRING_GENTLE);
    const t0 = from.querySelector('.sel__title');
    const t1 = to.querySelector('.sel__title');
    if (t0) play(t0, { opacity: 0 }, { ...EASE_OUT, duration: 0.2 });
    if (t1) play(t1, { opacity: [0, 1] }, { ...EASE_OUT, delay: 0.35 });
  };

  cols.forEach((c, i) => {
    const btn = c.querySelector<HTMLButtonElement>('.sel__toggle');
    if (btn) disposer.listen(btn, 'click', () => open(i));
  });
};
