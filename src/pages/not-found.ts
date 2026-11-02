import type { PageFactory } from '../router';
import { html, toElement } from '../lib/html';
import { header, sectionBar } from '../ui/ui';
import './not-found.css';

const page: PageFactory = () => ({
  title: 'Nie znaleziono',
  el: toElement(html`
    <div class="screen not-found">
      ${header(null)}
      <main id="main" tabindex="-1" class="not-found__main">
        <h1 class="heading">Nie znaleziono strony</h1>
      </main>
      ${sectionBar('404', '/')}
    </div>
  `),
});
export default page;
