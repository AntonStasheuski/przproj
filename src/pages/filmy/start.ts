import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { header } from '../../ui/ui';

/** TODO: Filmy */
const page: PageFactory = () => ({
  title: 'Filmy',
  el: toElement(html`<div class="screen">${header(null)}<main id="main" tabindex="-1"><h1>Filmy</h1></main></div>`),
});
export default page;
