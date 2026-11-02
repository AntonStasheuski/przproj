import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { picture } from '../../lib/img';
import { Disposer } from '../../lib/dispose';
import { header, mountHeader, sectionBar } from '../../ui/ui';
import { SERIES_ORDER, SERIES } from './data';
import './start.css';

/** /art-project — frame 29:88: three posters, each opens its constructor. */
const page: PageFactory = () => {
  const disposer = new Disposer();
  const el = toElement(html`
    <div class="screen art-start">
      ${header('art')}
      <main id="main" tabindex="-1" class="art-start__main">
        <h1 class="visually-hidden">Art Project</h1>
        <ul class="art-start__list">
          ${SERIES_ORDER.map((slug) => {
            const s = SERIES[slug];
            return html`<li>
              <a class="art-start__card" href="/art-project/${slug}">
                ${picture(`art/start/${s.cover}`, { alt: '', eager: true, className: 'art-start__poster' })}
                <span class="art-start__name">${s.name}</span>
                <span class="art-start__years">${s.years}</span>
              </a>
            </li>`;
          })}
        </ul>
      </main>
      ${sectionBar('Art Project', null)}
    </div>
  `);
  return {
    title: 'Art Project',
    el,
    mount: () => disposer.add(mountHeader(el)),
    destroy: () => disposer.run(),
  };
};
export default page;
