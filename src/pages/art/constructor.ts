import type { PageFactory } from '../../router';
import { html, toElement, vars, type Raw } from '../../lib/html';
import { picture, size } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { Stepper } from '../../lib/stepper';
import { play, SPRING_SLOW } from '../../lib/motion';
import { arrowButton, goBack, header, mountHeader, plusButton } from '../../ui/ui';
import notFound from '../not-found';
import { FACT_CORNERS, PLUS_AT, SERIES, isSlug, type Series } from './data';
import { TEXTS, type SeriesTexts } from './texts';
import { rich } from './rich';
import './constructor.css';

const POSTER_X = 59;
const CORNER_LABEL = { br: 'prawy dolny', bl: 'lewy dolny', tr: 'prawy górny', tl: 'lewy górny' } as const;

const layerMarkup = (s: Series, key: string, cls: string, x = 0, y = 0): Raw => {
  const { w, h } = size(`art/${s.dir}/${key}`);
  return html`<div class="art-poster__layer ${cls}" style="${vars({ x, y, w, h })}">
    ${picture(`art/${s.dir}/${key}`, { eager: true, width: w })}
  </div>`;
};

const posterMarkup = (s: Series, t: SeriesTexts): Raw => html`
  <div class="art-poster" style="${vars({ top: s.top })}" role="img" aria-label="Plakat filmu ${s.name}">
    ${s.layers.map((l) => layerMarkup(s, l.key, 'art-poster__base', l.x, l.y))}
    ${FACT_CORNERS.map((_, i) => layerMarkup(s, `fact-${i + 1}`, 'art-poster__overlay', s.overlayShift?.[i]?.x, s.overlayShift?.[i]?.y))}
    <div class="art-poster__layer art-poster__final">
      ${s.lettering.map(
        (l) => html`<img class="art-poster__letters" src="/img/art/${s.dir}/${l.src}.svg" width="${l.w}" height="${l.h}"
          alt="" style="${vars({ x: l.x, y: l.y, w: l.w, h: l.h })}" />`,
      )}
      ${s.texture
        ? html`<div class="art-poster__texture" style="${vars({ x: s.texture.x, y: s.texture.y, w: s.texture.w, h: s.texture.h })}">
            ${picture(`art/${s.dir}/title-texture`, { eager: true })}
          </div>
          <div class="art-poster__highlight" style="${vars({ x: s.texture.x, y: s.texture.y, w: s.texture.w, h: s.texture.h })}"></div>`
        : ''}
    </div>
    ${FACT_CORNERS.map((c, i) => {
      const p = PLUS_AT[c];
      return html`<div class="art-poster__plus" style="${vars({ x: p.x - POSTER_X, y: p.y - s.top })}" data-fact="${i}">
        ${plusButton(`Ciekawostka: ${t.facts[i]?.title ?? ''} (${CORNER_LABEL[c]} róg plakatu)`)}
      </div>`;
    })}
  </div>
`;

const page: PageFactory = (ctx) => {
  const slug = ctx.params.slug ?? '';
  if (!isSlug(slug)) return notFound(ctx);
  const s = SERIES[slug];
  const t = TEXTS[slug];
  const finalState = s.steps + 1;
  const count = s.steps + 2;
  const disposer = new Disposer();

  const el = toElement(html`
    <div class="screen art-con art-con--${s.dir}">
      ${header('art')}
      <main id="main" tabindex="-1" class="art-con__main">
        <h1 class="visually-hidden">Art Project: plakat filmu ${s.name}</h1>
        ${posterMarkup(s, t)}

        <div class="art-head">
          <div class="art-head__track">
            <p class="art-head__slide art-head__slide--start">${t.titleStart}</p>
            <p class="art-head__slide art-head__slide--years">${t.titleYears}</p>
            <p class="art-head__slide">${t.titleFinal}</p>
          </div>
          ${t.facts.map((f) => html`<p class="art-head__fact">${f.title}</p>`)}
        </div>
        <div class="art-rule" aria-hidden="true"></div>

        <div class="art-body">
          <div class="art-body__track">
            <div class="art-body__slide art-body__slide--intro">
              <p class="art-intro">${rich(t.intro)}</p>
              <p class="art-uwaga"><span class="art-uwaga__label">${t.uwagaLabel}</span><br />${rich(t.uwaga)}</p>
            </div>
            ${t.steps.map((step, i) => {
              const w = s.stepWidth?.[i];
              return html`<div class="art-body__slide"><p class="art-story" style="${w ? vars({ 'story-w': w }) : ''}">${rich(step)}</p></div>`;
            })}
            <div class="art-body__slide"><p class="art-intro art-intro--final">${rich(t.final)}</p></div>
          </div>
          ${t.facts.map((f) => html`<div class="art-body__fact"><p class="art-story art-story--fact ${f.bold ? 'art-story--bold' : ''}">${rich(f.text)}</p></div>`)}
        </div>

        <div class="art-con__arrows">
          ${arrowButton('next', 'Następny krok', 'art-con__next')}
          ${arrowButton('prev', 'Poprzedni krok', 'art-con__prev')}
        </div>
        <p class="visually-hidden" aria-live="polite" data-live></p>
      </main>
      ${goBack('/art-project', 'art-con__back')}
    </div>
  `);

  const $ = <T extends Element = HTMLElement>(sel: string) => el.querySelector<T>(sel) as T;
  const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(el.querySelectorAll<T>(sel));
  const bases = $$('.art-poster__base');
  const overlays = $$('.art-poster__overlay');
  const finalLayer = $('.art-poster__final');
  const highlight = el.querySelector<HTMLElement>('.art-poster__highlight');
  const plusWraps = $$('.art-poster__plus');
  const plusButtons = plusWraps.map((w) => w.querySelector<HTMLButtonElement>('button') as HTMLButtonElement);
  const headTrack = $('.art-head__track');
  const headSlides = $$('.art-head__slide');
  const headFacts = $$('.art-head__fact');
  const bodyTrack = $('.art-body__track');
  const bodySlides = $$('.art-body__slide');
  const bodyFacts = $$('.art-body__fact');
  const next = $<HTMLButtonElement>('.art-con__next');
  const prev = $<HTMLButtonElement>('.art-con__prev');
  const live = $('[data-live]');

  const factFromUrl = Number(ctx.url.searchParams.get('fakt'));
  let fact: number | null = Number.isInteger(factFromUrl) && factFromUrl >= 1 && factFromUrl <= 4 ? factFromUrl - 1 : null;

  /** Shows/hides one element; `kind` picks the transition. */
  const toggle = (node: HTMLElement, on: boolean, animate: boolean, kind: 'layer' | 'fade' | 'card') => {
    const was = node.dataset.on === '1';
    if (was === on && node.dataset.on !== undefined) return;
    node.dataset.on = on ? '1' : '0';
    if (!animate) {
      play(node, { opacity: on ? 1 : 0, scale: 1, y: 0 }, { duration: 0 });
      return;
    }
    if (kind === 'layer') play(node, on ? { opacity: [0, 1], scale: [1.03, 1] } : { opacity: 0, scale: 1.03 }, SPRING_SLOW);
    else if (kind === 'card') play(node, on ? { opacity: [0, 1], y: [12, 0] } : { opacity: 0, y: 0 }, SPRING_SLOW);
    else play(node, { opacity: on ? 1 : 0 }, SPRING_SLOW);
  };

  const slideTo = (track: HTMLElement, index: number, animate: boolean) => {
    if (track.dataset.at === String(index)) return;
    track.dataset.at = String(index);
    play(track, { x: `${-index * 100}%` }, animate ? SPRING_SLOW : { duration: 0 });
  };

  const setInert = (nodes: HTMLElement[], active: (i: number) => boolean) =>
    nodes.forEach((n, i) => {
      n.inert = !active(i);
    });

  const render = (state: number, animate: boolean) => {
    const isFinal = state === finalState;
    const shown = fact === null ? [] : s.overlays(fact);

    bases.forEach((node, i) => toggle(node, state >= (s.layers[i]?.from ?? 0), animate, 'layer'));
    overlays.forEach((node, i) => toggle(node, shown.includes(i), animate, 'fade'));
    toggle(finalLayer, isFinal, animate, 'layer');
    if (highlight) toggle(highlight, fact !== null && (s.texture?.highlightIn.includes(fact) ?? false), animate, 'fade');
    plusWraps.forEach((w, i) => {
      toggle(w, isFinal, animate, 'layer');
      w.inert = !isFinal;
      const btn = plusButtons[i];
      if (!btn) return;
      if (fact === i) {
        btn.setAttribute('aria-current', 'true');
        btn.setAttribute('aria-disabled', 'true');
      } else {
        btn.removeAttribute('aria-current');
        btn.removeAttribute('aria-disabled');
      }
    });

    const head = state === 0 ? 0 : isFinal ? 2 : 1;
    slideTo(headTrack, head, animate);
    toggle(headTrack, fact === null, animate, 'fade');
    headFacts.forEach((node, i) => toggle(node, fact === i, animate, 'fade'));
    setInert(headSlides, (i) => fact === null && i === head);
    setInert(headFacts, (i) => fact === i);

    slideTo(bodyTrack, state, animate);
    toggle(bodyTrack, fact === null, animate, 'fade');
    bodyFacts.forEach((node, i) => toggle(node, fact === i, animate, 'card'));
    setInert(bodySlides, (i) => fact === null && i === state);
    setInert(bodyFacts, (i) => fact === i);

    prev.setAttribute('aria-disabled', String(state === 0 && fact === null));
    next.setAttribute('aria-disabled', String(isFinal));
    live.textContent =
      fact === null ? `Krok ${state + 1} z ${count}` : `Ciekawostka ${fact + 1} z ${FACT_CORNERS.length}: ${t.facts[fact]?.title ?? ''}`;
  };

  const stepper = new Stepper({ count, onChange: (to) => render(to, true) });

  const syncFactUrl = () => {
    const url = new URL(location.href);
    if (fact === null) url.searchParams.delete('fakt');
    else {
      url.searchParams.set('krok', String(finalState + 1));
      url.searchParams.set('fakt', String(fact + 1));
    }
    history.replaceState(history.state, '', url);
  };

  const openFact = (i: number | null) => {
    if (fact === i || stepper.index !== finalState) return;
    fact = i;
    syncFactUrl();
    render(stepper.index, true);
  };

  const back = () => (fact !== null ? openFact(null) : stepper.prev());
  const forward = () => {
    if (fact === null) stepper.next();
  };

  return {
    title: `Art Project — ${s.name}`,
    el,
    mount() {
      disposer.add(mountHeader(el));
      if (fact !== null && stepper.index !== finalState) stepper.index = finalState;
      if (fact !== null) syncFactUrl();
      render(stepper.index, false);

      disposer.listen(next, 'click', forward);
      disposer.listen(prev, 'click', back);
      plusButtons.forEach((btn, i) => disposer.listen(btn, 'click', () => openFact(i)));
      disposer.listen(document, 'keydown', (e) => {
        const k = e as KeyboardEvent;
        const target = k.target as HTMLElement | null;
        if (k.defaultPrevented || k.altKey || k.ctrlKey || k.metaKey) return;
        if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
        if (k.key === 'ArrowRight') forward();
        else if (k.key === 'ArrowLeft') back();
        else if (k.key === 'Escape' && fact !== null) openFact(null);
        else return;
        k.preventDefault();
      });
    },
    destroy: () => disposer.run(),
  };
};
export default page;
