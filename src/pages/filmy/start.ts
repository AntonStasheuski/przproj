import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { goBack, header, mountHeader } from '../../ui/ui';
import './start.css';

/** Frame 191:227 «Fims started page»: three entries (Component 91 / 96 / 97). Texts verbatim, spaces kept. */
const ENTRIES = [
  { href: '/filmy/plakaty', text: 'Tutaj możesz obejrzeć wszystkie najbardziej \nznane filmy Siergieja Paradżanowa' },
  { href: '/filmy/fakty', text: 'Tutaj możesz  znaleźć interesujące informacje \nna temat  tych filmów' },
  { href: '/filmy/kraje', text: 'Tutaj możesz  dowiedzieć się więcej o tradycjach\n i zwyczajach innych krajów' },
] as const;

const page: PageFactory = () => {
  const disposer = new Disposer();
  const el = toElement(html`
    <div class="screen filmy-start">
      ${header('filmy')}
      <main id="main" tabindex="-1">
        <h1 class="filmy-start__title">filmy</h1>
        <div class="filmy-start__back">${goBack('/')}</div>
        <span class="filmy-start__rule" aria-hidden="true"></span>
        <nav aria-label="Filmy">
          <ul class="filmy-start__list">
            ${ENTRIES.map(
              (e) => html`<li><a class="filmy-start__entry" href="${e.href}"
                ><span class="accent" aria-hidden="true"></span><span class="filmy-start__text">${e.text}</span></a></li>`,
            )}
          </ul>
        </nav>
        ${picture('filmy/start/photo', { alt: 'Kadr z filmu „Aszik Kerib” — kobieta w welonie, w połowie kolorowa, w połowie czarno-biała', eager: true, className: 'filmy-start__photo' })}
      </main>
    </div>
  `);
  return {
    title: 'Filmy',
    el,
    mount: () => disposer.add(mountHeader(el)),
    destroy: () => disposer.run(),
  };
};
export default page;
