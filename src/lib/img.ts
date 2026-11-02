import { html, type Raw } from './html';

type Manifest = Record<string, { w: number; h: number }>;
const manifest: Manifest = Object.assign(
  {},
  ...Object.values(import.meta.glob<Manifest>('../generated/images/*.json', { eager: true, import: 'default' })),
);

export interface PictureOptions {
  alt?: string;
  /** above-the-fold images: eager + high fetch priority */
  eager?: boolean;
  className?: string;
  /** rendered width in design px when it differs from the asset width */
  width?: number;
}

export const size = (key: string): { w: number; h: number } => {
  const s = manifest[key];
  if (!s) throw new Error(`image "${key}" is missing from src/generated/images/*.json — run npm run assets`);
  return s;
};

/**
 * <picture> with AVIF/WebP at 1× and 2× of the design size. The layout scales with the
 * viewport (1 design px = 100vw/1512 on desktop), so `sizes` follows the same rule.
 */
export const picture = (key: string, o: PictureOptions = {}): Raw => {
  const { w, h } = size(key);
  const cssW = o.width ?? w;
  const set = (ext: string) => `/img/${key}-1x.${ext} ${w}w, /img/${key}-2x.${ext} ${w * 2}w`;
  const sizes = `(max-width: 1023px) 100vw, calc(${cssW} * 100vw / 1512)`;
  return html`<picture class="${o.className ?? ''}"
    ><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"
    /><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"
    /><img src="/img/${key}-1x.webp" width="${w}" height="${h}" alt="${o.alt ?? ''}"
      loading="${o.eager ? 'eager' : 'lazy'}" decoding="${o.eager ? 'sync' : 'async'}"
      ${o.eager ? html`fetchpriority="high"` : ''} /></picture>`;
};
