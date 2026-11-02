import { escape, raw, type Raw } from '../../lib/html';

const TOKEN = /(\*[^*]+\*|\[[^\]]+\]\([^)]+\))/;
const LINK = /^\[(.+)\]\((.+)\)$/;

/** Design text → markup: «\n» hard break, «*x*» italic (Cambay Italic), «[x](href)» external link. */
export const richLines = (src: string): Raw =>
  raw(
    src
      .split('\n')
      .map((line) =>
        line
          .split(TOKEN)
          .map((part) => {
            const link = LINK.exec(part);
            if (link) return `<a class="kraj-link" href="${escape(link[2] ?? '')}" target="_blank" rel="noopener">${escape(link[1] ?? '')}</a>`;
            if (part.startsWith('*')) return `<em>${escape(part.slice(1, -1))}</em>`;
            return escape(part);
          })
          .join(''),
      )
      .join('<br>'),
  );
