/** Minimal safe templating: interpolations are escaped unless wrapped in raw(). */

const RAW = Symbol('raw');

export interface Raw {
  readonly [RAW]: true;
  readonly value: string;
}

export const raw = (value: string): Raw => ({ [RAW]: true, value });

const isRaw = (v: unknown): v is Raw => typeof v === 'object' && v !== null && RAW in v;

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escape = (s: string): string => s.replace(/[&<>"']/g, (c) => ESC[c] ?? c);

type Value = string | number | boolean | null | undefined | Raw | readonly Value[];

const render = (v: Value): string => {
  if (v === null || v === undefined || v === false) return '';
  if (Array.isArray(v)) return v.map(render).join('');
  if (isRaw(v)) return v.value;
  return escape(String(v));
};

/** Tagged template returning a Raw fragment, so templates can be nested. */
export const html = (strings: TemplateStringsArray, ...values: Value[]): Raw =>
  raw(strings.reduce((out, s, i) => out + s + (i < values.length ? render(values[i] as Value) : ''), ''));

/** Builds a single element from markup. */
export const toElement = <T extends Element = HTMLElement>(markup: Raw): T => {
  const t = document.createElement('template');
  t.innerHTML = markup.value.trim();
  const node = t.content.firstElementChild;
  if (!node) throw new Error('toElement: empty markup');
  return node as T;
};

/** Converts text with \n into <br> separated escaped lines (for hard breaks kept from the design). */
export const lines = (text: string): Raw => raw(text.split('\n').map(escape).join('<br>'));

/** CSS custom properties as an inline style: vars({ x: 59, y: 136 }) → "--x:59;--y:136" */
export const vars = (o: Record<string, number | string>): string =>
  Object.entries(o)
    .map(([k, v]) => `--${k}:${v}`)
    .join(';');
