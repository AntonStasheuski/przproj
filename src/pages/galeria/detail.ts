import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { header } from '../../ui/ui';

/** TODO: Praca */
const page: PageFactory = () => ({
  title: 'Praca',
  el: toElement(html`<div class="screen">${header(null)}<main id="main" tabindex="-1"><h1>Praca</h1></main></div>`),
});
export default page;
