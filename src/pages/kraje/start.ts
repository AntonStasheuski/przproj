import type { PageFactory } from '../../router';
import { html, lines, toElement, vars } from '../../lib/html';
import { picture, size } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { goBack, header, mountHeader } from '../../ui/ui';
import { CARDS, QUOTE, QUOTE_AUTHOR } from './data';
import './kraje.css';

const page: PageFactory = () => {
  const disposer = new Disposer();
  const el = toElement(html`
    <div class="screen kraje">
      ${header('filmy')}
      <main id="main" tabindex="-1">
        <h1 class="visually-hidden">Kraje</h1>
        <figure class="kraje-quote">
          <span class="kraje-quote__mark kraje-quote__mark--open" aria-hidden="true">“</span>
          <blockquote class="kraje-quote__text">${lines(QUOTE)}</blockquote>
          <span class="kraje-quote__mark kraje-quote__mark--close" aria-hidden="true">”</span>
          <figcaption class="kraje-quote__author">${QUOTE_AUTHOR}</figcaption>
        </figure>
        <ul class="kraje-cards">
          ${CARDS.map((c) => {
            const photo = size(`kraje/cards/${c.slug}-photo`);
            const figure = size(`kraje/cards/${c.slug}-figure`);
            return html`
              <li>
                <a class="country-card" href="/filmy/kraje/${c.slug}"
                  style="${vars({ x: c.x, y: c.y, w: c.w, h: c.h, 'photo-x': c.photo[0], 'photo-y': c.photo[1], 'photo-w': photo.w, 'photo-h': photo.h, 'fig-x': c.figure[0], 'fig-y': c.figure[1], 'fig-w': figure.w, 'fig-h': figure.h })}">
                  <span class="country-card__photo">${picture(`kraje/cards/${c.slug}-photo`, { eager: true })}</span>
                  <span class="country-card__shade"></span>
                  <span class="country-card__figure">${picture(`kraje/cards/${c.slug}-figure`, { alt: '', eager: true })}</span>
                  <span class="country-card__name">${c.name}</span>
                </a>
              </li>`;
          })}
        </ul>
      </main>
      <footer class="section-bar">
        <p class="section-bar__title">filmy</p>
        ${goBack('/filmy', 'section-bar__back')}
      </footer>
    </div>
  `);

  return {
    title: 'Kraje',
    el,
    mount: () => disposer.add(mountHeader(el)),
    destroy: () => disposer.run(),
  };
};
export default page;
