/**
 * The three poster constructors (SPEC §3.1). Geometry is in design px, relative to the
 * poster box (545×771 at x 59); rasters come from figma/assets-src/art/<dir>/.
 *
 * State index: 0 = start (first layer + intro), 1…steps = one more layer each,
 * steps + 1 = assembled poster with the title and four «+». Facts are a separate state on top.
 */
export type Slug = 'aszik-kerib' | 'cienie-zapomnianych-przodkow' | 'sajat-nowa';

export type Corner = 'br' | 'bl' | 'tr' | 'tl';

export interface Layer {
  /** raster key inside art/<dir>/ */
  key: string;
  /** first state in which the layer is shown */
  from: number;
  x?: number;
  y?: number;
}

/** Vector lettering exported from Figma (render bounds). */
export interface Lettering {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Series {
  name: string;
  years: string;
  /** start-page cover in art/start/ */
  cover: string;
  dir: 'sn' | 'czp' | 'ak';
  /** poster top in the frame (AK frames settle at 138) */
  top: number;
  /** story steps between the start and the assembled poster */
  steps: number;
  /** bottom → top */
  layers: Layer[];
  /** fact overlays: per fact, which overlay rasters are visible (AK frames accumulate them) */
  overlays: (fact: number) => number[];
  lettering: Lettering[];
  /** AK only: masked texture (exclusion) and the gold highlight (screen) over «Aszik Kerib» */
  texture?: { x: number; y: number; w: number; h: number; highlightIn: number[] };
}

/** fact n (0-based) ↔ corner; same order in all three series (frames: BR, BL, TR, TL) */
export const FACT_CORNERS: Corner[] = ['br', 'bl', 'tr', 'tl'];

/** «+» positions in the frame (35.19×35.19) */
export const PLUS_AT: Record<Corner, { x: number; y: number }> = {
  tl: { x: 75, y: 154 },
  tr: { x: 553, y: 154 },
  bl: { x: 75, y: 854 },
  br: { x: 553, y: 854 },
};

const single = (fact: number) => [fact];

const range = (n: number, from = 0): number[] => Array.from({ length: n }, (_, i) => i + from);

export const SERIES: Record<Slug, Series> = {
  'aszik-kerib': {
    name: 'ashik kerib',
    years: '(1924-1952)',
    cover: 'poster-aszik-kerib',
    dir: 'ak',
    top: 138,
    steps: 7,
    layers: [
      { key: 'layer-1', from: 0 },
      { key: 'layer-2', from: 1 },
      { key: 'layer-3', from: 2 },
      { key: 'layer-4', from: 3, y: 2 },
      { key: 'layer-5', from: 4 },
      { key: 'layer-6', from: 5, y: 1 },
      { key: 'layer-7', from: 6 },
      { key: 'layer-8', from: 7 },
    ],
    overlays: (fact) => range(fact + 1),
    lettering: [
      { src: 'title-aszik', x: 170.8, y: 45.45, w: 331, h: 75 },
      { src: 'title-kerib', x: 171.58, y: 144.34, w: 319, h: 72 },
      { src: 'signature', x: 189.99, y: 722.44, w: 166, h: 16 },
    ],
    // Rectangle 95 is visible in frames 10–12 and hidden in 13
    texture: { x: 170.8, y: 45.45, w: 331, h: 171, highlightIn: [0, 1, 2] },
  },
  'cienie-zapomnianych-przodkow': {
    name: 'cienie zapomnianych przodków',
    years: '(1952-1966)',
    cover: 'poster-cienie',
    dir: 'czp',
    top: 136,
    steps: 6,
    // z-order of the assembled poster; IMG_9417 and Untitled-1 arrive last but sit deep in the stack
    layers: [
      { key: 'layer-1', from: 0 },
      { key: 'layer-2', from: 1 },
      { key: 'layer-3', from: 6 },
      { key: 'layer-4', from: 6, x: -2, y: 279 },
      { key: 'layer-5', from: 2 },
      { key: 'layer-6', from: 3 },
      { key: 'layer-7', from: 4 },
      { key: 'layer-8', from: 5 },
    ],
    overlays: single,
    lettering: [
      { src: 'title', x: 51.02, y: 624.74, w: 429, h: 76 },
      { src: 'signature', x: 207.91, y: 723.8, w: 130, h: 9 },
    ],
  },
  'sajat-nowa': {
    name: 'sajat-nowa',
    years: '(1966-1990)',
    cover: 'poster-sajat-nowa',
    dir: 'sn',
    top: 136,
    steps: 7,
    layers: range(8, 1).map((n) => ({ key: `layer-${n}`, from: n - 1 })),
    overlays: single,
    lettering: [
      { src: 'title-sajat', x: 140.61, y: 38.59, w: 267, h: 78 },
      { src: 'title-nowa', x: 132, y: 128.35, w: 285, h: 64 },
      { src: 'signature', x: 183.92, y: 719.02, w: 178, h: 14 },
    ],
  },
};

/** Start page order: left to right as in frame 29:88. */
export const SERIES_ORDER: Slug[] = ['aszik-kerib', 'cienie-zapomnianych-przodkow', 'sajat-nowa'];

export const isSlug = (s: string): s is Slug => s in SERIES;
