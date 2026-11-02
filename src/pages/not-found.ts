import type { PageFactory } from '../router';
import { html, toElement } from '../lib/html';
import { Disposer } from '../lib/dispose';
import { header, mountHeader, sectionBar } from '../ui/ui';
import './not-found.css';

const page: PageFactory = () => {
  const disposer = new Disposer();
  const el = toElement(html`
    <div class="screen not-found">
      ${header(null)}
      <main id="main" tabindex="-1" class="not-found__main">
        <h1 class="heading">Nie znaleziono strony</h1>
      </main>
      ${sectionBar('404', '/')}
    </div>
  `);
  return { title: 'Nie znaleziono', el, mount: () => disposer.add(mountHeader(el)), destroy: () => disposer.run() };
};
export default page;
