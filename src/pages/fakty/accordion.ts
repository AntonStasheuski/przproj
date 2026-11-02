import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { header } from '../../ui/ui';

/** TODO: Fakty */
const page: PageFactory = () => ({
  title: 'Fakty',
  el: toElement(html`<div class="screen">${header(null)}<main id="main" tabindex="-1"><h1>Fakty</h1></main></div>`),
});
export default page;
