import { escape, raw, type Raw } from '../../lib/html';

/** Design text → markup: *…* = italic run (Cambay Italic), \n = hard break kept from the design. */
export const rich = (text: string): Raw =>
  raw(
    text
      .split('*')
      .map((part, i) => {
        const h = escape(part).replace(/\n/g, '<br>');
        return i % 2 ? `<em>${h}</em>` : h;
      })
      .join(''),
  );
