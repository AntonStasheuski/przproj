import type { PageFactory } from '../../router';
import { html, raw, toElement, vars, type Raw } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper } from '../../lib/stepper';
import { SPRING_GENTLE } from '../../lib/motion';
import { arrowButton, bindArrows, header, mountHeader, sectionBar } from '../../ui/ui';
import playIcon from '../../icons/play.svg?raw';
import playHoverIcon from '../../icons/play-hover.svg?raw';
import notFound from '../not-found';
import { FILMS, META_LABELS, findFilm, plainTitle, plakatyHref, type Film } from './data';
import { Slide } from './slide';
import './film.css';

/**
 * /filmy/:slug — frames 398:2905 (Andrijesz), 401:2575, 401:2991, 401:3400, 401:3809, 401:4218.
 * In Figma every page holds all six films in clipped strips; the arrows shift every strip by one slot
 * (GENTLE 1.02 s) and loop AK → Andrijesz through a clone slot. Here the strips share one --pos value,
 * the URL follows with replaceState and the page is not re-rendered.
 */

const N = FILMS.length;
/** big strips: films 0…5 plus clones of 0…2, so a forward jump of up to 3 (mini posters) stays inside */
const SLOTS = N + 3;
/** the «next three» strip starts one film ahead: slot j shows film j + 1 */
const MINI_SLOTS = SLOTS + 2;

const film = (i: number): Film => FILMS[((i % N) + N) % N] as Film;
const filmIndex = (i: number): number => ((i % N) + N) % N;
const slots = <T>(count: number, offset: number, render: (f: Film, i: number) => T): T[] =>
  Array.from({ length: count }, (_, j) => render(film(j + offset), filmIndex(j + offset)));

const track = (name: string, items: Raw[]): Raw => html`
  <div class="film-win film-win--${name}"><div class="film-track">${items}</div></div>
`;

const slot = (i: number, content: Raw): Raw => html`<div class="film-slot" data-film="${i}">${content}</div>`;

const page: PageFactory = (ctx) => {
  const start = findFilm(ctx.params.slug ?? '');
  if (start < 0) return notFound(ctx);

  const disposer = new Disposer();
  const eager = (i: number) => i === start;

  const posters = slots(SLOTS, 0, (f, i) =>
    slot(i, picture(`filmy/film/poster-${f.slug}`, { alt: `Plakat filmu „${f.caption}”`, eager: eager(i) })),
  );

  const info = slots(SLOTS, 0, (f, i) =>
    slot(
      i,
      html`<span class="accent" aria-hidden="true"></span>
        <p class="heading film-info__title">${f.title}</p>
        <span class="film-info__rule" aria-hidden="true"></span>
        <dl class="film-info__meta">
          ${META_LABELS.map((label, k) => html`<div><dt>${label}</dt><dd>${f.meta[k] ?? ''}</dd></div>`)}
        </dl>`,
    ),
  );

  const minis = slots(MINI_SLOTS, 1, (f, i) =>
    slot(
      i,
      html`<a class="film-mini" href="/filmy/${f.slug}" aria-label="Następny film: ${f.caption}"
        >${picture(`filmy/film/mini-${f.slug}`, { alt: '' })}</a>`,
    ),
  );

  const bands = slots(SLOTS, 0, (f, i) =>
    slot(
      i,
      html`<div class="film-band" style="${vars({ left: f.band.left, play: f.band.play })}">
        ${picture(`filmy/film/kadr-${f.slug}`, { alt: `Kadr z filmu „${f.caption}”`, className: 'film-band__still' })}
        <button type="button" class="film-play" aria-disabled="true" title="Wideo niedostępne"
          aria-label="Odtwórz film „${f.caption}” — wideo niedostępne"
          ><span class="film-play__icon">${raw(playIcon)}</span><span class="film-play__icon film-play__icon--hover">${raw(playHoverIcon)}</span></button>
        <p class="film-band__name"><span class="film-band__kicker">film </span><span class="film-band__title">${f.band.title}</span></p>
        <p class="film-band__when"><span>${f.band.year}</span><span class="film-band__time">${f.band.time}</span></p>
        <p class="film-band__rating"><img src="/img/filmy/film/star.svg" width="65" height="62" alt="Ocena" />${f.band.rating}</p>
      </div>`,
    ),
  );

  const plots = slots(SLOTS, 0, (f, i) => slot(i, html`<p class="body-text film-plot">${f.plot}</p>`));

  const photos = [1, 2, 3, 4].map((n) =>
    track(
      `foto${n}`,
      slots(SLOTS, 0, (f, i) =>
        slot(i, picture(`filmy/film/foto${n}-${f.slug}`, { alt: `Kadr ${n} z filmu „${f.caption}”` })),
      ),
    ),
  );

  const cast = slots(SLOTS, 0, (f, i) =>
    slot(i, html`<ul class="film-cast">${f.cast.map((name) => html`<li>${name}</li>`)}</ul>`),
  );

  const el = toElement(html`
    <div class="page film">
      ${header('filmy')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden" data-title>${plainTitle(film(start))}</h1>
        <p class="visually-hidden" aria-live="polite" data-status></p>
        ${track('poster', posters)}
        ${track('info', info)}
        <nav aria-label="Następne filmy">${track('mini', minis)}</nav>
        ${arrowButton('next', 'Następny film', 'film__arrow film__arrow--next')}
        ${arrowButton('prev', 'Poprzedni film', 'film__arrow film__arrow--prev')}

        <h2 class="heading film__h film__h--band">film</h2>
        ${track('band', bands)}
        <h2 class="heading film__h film__h--plot">Fabuła</h2>
        ${track('plot', plots)}
        <h2 class="heading film__h film__h--photos">ZDJĘCIA FILMU</h2>
        ${photos}
        <h2 class="heading film__h film__h--cast">OBSADA FILMU</h2>
        ${track('cast', cast)}
      </main>
      ${sectionBar('Filmy', plakatyHref(start))}
    </div>
  `);

  const q = <T extends Element>(sel: string) => el.querySelector<T>(sel);
  const heading = q<HTMLElement>('[data-title]');
  const status = q<HTMLElement>('[data-status]');
  const back = q<HTMLAnchorElement>('.section-bar__back');
  const allSlots = Array.from(el.querySelectorAll<HTMLElement>('.film-slot'));

  const slide = new Slide(el, start);
  /** visual slot of the big strips (0…SLOTS-1); film = vis mod N */
  let vis = start;

  /** only the visible slots are interactive / exposed; neighbours start loading */
  const syncSlots = () => {
    allSlots.forEach((s) => {
      const j = Array.prototype.indexOf.call(s.parentElement?.children ?? [], s);
      const mini = s.closest('.film-win--mini') !== null;
      const visible = mini ? j >= vis && j <= vis + 2 : j === vis;
      s.inert = !visible;
      if (Math.abs(j - vis) <= (mini ? 4 : 1)) s.querySelectorAll('img').forEach((img) => (img.loading = 'eager'));
    });
  };

  const settle = () => {
    if (vis >= N) {
      vis -= N;
      slide.set(vis);
    }
    syncSlots();
  };

  const show = (to: number, from: number, dir: 1 | -1) => {
    const delta = dir === 1 ? (to - from + N) % N : (from - to + N) % N;
    let target = vis + dir * delta;
    if (target > SLOTS - 1 || target < 0) {
      // jump to the identical clone slot first, then animate
      const shift = target < 0 ? N : -N;
      slide.set(slide.current() + shift);
      target += shift;
    }
    vis = target;
    syncSlots();
    slide.to(target, SPRING_GENTLE, settle);

    const f = film(to);
    const url = new URL(location.href);
    url.pathname = `/filmy/${f.slug}`;
    history.replaceState(history.state, '', url);
    document.title = `${plainTitle(f)} — PRŻ PROJ`;
    if (heading) heading.textContent = plainTitle(f);
    if (status) status.textContent = `Film ${to + 1} z ${N}: ${plainTitle(f)}`;
    if (back) back.href = plakatyHref(to);
  };

  const stepper = new Stepper({ count: N, initial: start, loop: true, param: null, onChange: show });

  const onMini = (e: Event) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('.film-mini');
    const s = a?.closest<HTMLElement>('.film-slot');
    if (!a || !s || (e as MouseEvent).button !== 0 || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey) return;
    e.preventDefault();
    stepper.go(Number(s.dataset.film), 1);
  };

  return {
    title: plainTitle(film(start)),
    el,
    mount: () => {
      syncSlots();
      disposer.add(mountHeader(el));
      disposer.add(bindArrows(el, stepper));
      disposer.add(stepper.bindKeys());
      disposer.listen(el, 'click', onMini);
      disposer.add(() => slide.stop());
    },
    destroy: () => disposer.run(),
  };
};
export default page;
