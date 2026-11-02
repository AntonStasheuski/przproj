import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { header } from '../../ui/ui';

/** TODO: Kraj */
const page: PageFactory = () => ({
  title: 'Kraj',
  el: toElement(html`<div class="screen">${header(null)}<main id="main" tabindex="-1"><h1>Kraj</h1></main></div>`),
});
export default page;
