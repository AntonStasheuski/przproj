import type { PageFactory } from '../../router';
import { html, raw, toElement } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { header, mountHeader } from '../../ui/ui';
import { ABOUT, FOOTER, FRIENDS, GOALS, HERO, LINKS, MUSEUM } from './data';
import { selector, mountSelector } from './selector';
import { bio, mountBio } from './bio';
import { mountReveal } from './reveal';
import './home.css';

const newTab = raw('target="_blank" rel="noopener"');

const markup = html`
  <div class="page home">
    ${header(null, 'text')}
    <main id="main" tabindex="-1">
      <section class="hs hero" aria-labelledby="home-title">
        <div class="hs__in">
          <h1 class="hero__logo" id="home-title">
            <img src="/img/home/logo.svg" width="972" height="156" alt="PRŻ PROJ" fetchpriority="high" />
          </h1>
          <p class="body-text hero__lead">${HERO.lead}</p>
          <a class="home-ui hero__author" href="${LINKS.behance}" ${newTab}>${HERO.author}</a>
          <p class="home-ui hero__year">${HERO.year}</p>
        </div>
      </section>

      <section class="hs hs--light on-light about" aria-labelledby="about-title" data-reveal>
        <div class="hs__in">
          <span class="accent about__accent" aria-hidden="true"></span>
          <h2 class="heading about__title" id="about-title">${ABOUT.title}</h2>
          <span class="home-rule about__line" aria-hidden="true"></span>
          <p class="body-text about__text">${ABOUT.text}</p>
          <figure class="about__figure">
            <span class="about__capline" aria-hidden="true"></span>
            <figcaption class="home-ui about__caption">
              ${ABOUT.caption.map((l, i) => html`${i ? raw('<br>') : ''}${l}`)}
            </figcaption>
            <div class="about__photo">${picture('home/about-photo', { alt: 'Kolaż z Siergiejem Paradżanowem' })}</div>
          </figure>
        </div>
      </section>

      <section class="hs goals" aria-labelledby="goals-title" data-reveal>
        <div class="hs__in">
          <h2 class="heading goals__title" id="goals-title">${GOALS.title}</h2>
          <ul class="goals__list">
            ${GOALS.items.map(
              (g) => html`
                <li class="goals__item">
                  ${picture(`home/goal-${g.key}`, { className: 'goals__img', alt: 'Kolaż: portret Siergieja Paradżanowa' })}
                  <h3 class="home-ui goals__label">${g.label}</h3>
                  <p class="body-text goals__text">${g.text}</p>
                </li>
              `,
            )}
          </ul>
          <p class="goals__autograph" aria-hidden="true">${GOALS.autograph}</p>
        </div>
      </section>

      ${selector()}
      ${bio()}

      <section class="hs hs--light on-light museum" aria-labelledby="museum-title" data-reveal>
        <div class="hs__in">
          <a class="museum__link" href="${LINKS.museum}" ${newTab} aria-label="Muzeum Siergieja Paradżanowa w Erywaniu — strona muzeum (nowa karta)">
            ${picture('home/museum', { className: 'museum__img' })}
            ${picture('home/museum-hover', { className: 'museum__img museum__img--hover' })}
            <img class="museum__cursor" src="/img/home/cursor.svg" width="78" height="78" alt="" />
            <img class="museum__cursor museum__cursor--hover" src="/img/home/cursor-hover.svg" width="78" height="78" alt="" />
          </a>
          <span class="accent museum__accent" aria-hidden="true"></span>
          <h2 class="heading museum__title" id="museum-title">${MUSEUM.title}</h2>
          <p class="home-ui museum__address">${MUSEUM.address}</p>
          <span class="home-rule museum__line" aria-hidden="true"></span>
          <dl class="museum__hours">
            <dt class="museum__hours-label">${MUSEUM.hoursLabel}</dt>
            <dd class="home-ui museum__hours-value">${MUSEUM.hours[0]}<br />${MUSEUM.hours[1]}</dd>
          </dl>
          <h3 class="home-ui museum__info-title">${MUSEUM.infoTitle}</h3>
          <p class="body-text museum__info">${MUSEUM.info}</p>
        </div>
      </section>

      <section class="hs friends" aria-labelledby="friends-title" data-reveal>
        <div class="hs__in">
          <span class="accent friends__accent" aria-hidden="true"></span>
          <h2 class="heading friends__title" id="friends-title">${FRIENDS.title}</h2>
          <p class="home-ui friends__years">${FRIENDS.years}</p>
          <span class="home-rule friends__line" aria-hidden="true"></span>
          <ul class="friends__grid">
            ${FRIENDS.items.map(
              (f) => html`
                <li class="friend" tabindex="0">
                  ${picture(`home/friend-${f.key}`, { className: 'friend__img', alt: '' })}
                  <p class="home-ui friend__name" aria-hidden="true">${f.name}</p>
                  <div class="friend__card">
                    <span class="accent friend__accent" aria-hidden="true"></span>
                    <h3 class="home-ui friend__card-name">${f.name}</h3>
                    <span class="home-rule friend__line" aria-hidden="true"></span>
                    <p class="body-text friend__text">${f.text}</p>
                  </div>
                </li>
              `,
            )}
          </ul>
        </div>
      </section>
    </main>

    <footer class="hs home-footer" data-reveal>
      <div class="hs__in">
        <span class="home-rule home-footer__line" aria-hidden="true"></span>
        <p class="home-footer__title">${FOOTER.title}</p>
        <p class="home-footer__text">${FOOTER.text}</p>
        <a class="home-ui home-footer__mail" href="mailto:${LINKS.email}">${LINKS.email}</a>
        <ul class="home-footer__social">
          ${FOOTER.social.map(
            (s) => html`
              <li>
                <a class="home-footer__icon" href="${s.href}" ${newTab} aria-label="${s.label} (nowa karta)">
                  <img src="/img/home/social-${s.key}.svg" width="${s.w}" height="67" alt="" />
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
    </footer>
  </div>
`;

const page: PageFactory = () => {
  const el = toElement(markup);
  const disposer = new Disposer();
  return {
    title: '',
    el,
    mount() {
      disposer.add(mountHeader(el));
      mountSelector(el, disposer);
      mountBio(el, disposer);
      disposer.add(mountReveal(el));
    },
    destroy() {
      disposer.run();
    },
  };
};
export default page;
