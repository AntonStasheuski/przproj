import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { header } from '../../ui/ui';

/** TODO: Strona główna */
const page: PageFactory = () => ({
  title: 'Strona główna',
  el: toElement(html`<div class="screen">${header(null)}<main id="main" tabindex="-1"><h1>Strona główna</h1></main></div>`),
});
export default page;
