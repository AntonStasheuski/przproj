import type { PageFactory } from '../../router';
import { html, toElement } from '../../lib/html';
import { header } from '../../ui/ui';

/** TODO: Art Project */
const page: PageFactory = () => ({
  title: 'Art Project',
  el: toElement(html`<div class="screen">${header(null)}<main id="main" tabindex="-1"><h1>Art Project</h1></main></div>`),
});
export default page;
