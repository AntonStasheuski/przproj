import { html, type Raw } from '../../lib/html';

export interface Work {
  /** heading text as typed in Figma (shown uppercase via CSS) */
  title: string;
  /** card caption in the carousel, hard breaks kept from the design */
  caption: string;
  desc: Raw;
}

const GIOCONDA_DESC = html`Kolaż z cyklu <i>Kilka odcinków z życia Giocondy</i>. 1988 Papier, metal i szkło, na papierze.
53 x 55.5 cm (oprawiony)`;

/** Texts verbatim from Figma (duplicates of titles/descriptions are in the design too, SPEC §7.2). */
export const WORKS: readonly Work[] = [
  {
    title: 'variation on a theme by pinturicchio and rafael',
    caption: 'variation on a theme by\npinturicchio and rafael',
    desc: html`Trójwymiarowy kolaż. 1989 \nPapier, metal, masa perłowa i tkanina,  na papierze. 53.5 x 43.5 x 2 cm`,
  },
  { title: 'gioconda in the hell of bosch', caption: 'gioconda in the hell\nof bosch', desc: GIOCONDA_DESC },
  {
    title: 'my father’s portrait torn  in the moment of jealousy',
    caption: 'my father’s portrait torn\nin the moment of jealousy',
    desc: html`Kolaż 1983 \nOlej i płótno naklejone na papier fotograficzny \n41 x 46 cm `,
  },
  {
    title: 'mother in a fur coat',
    caption: 'mother in a fur coat',
    desc: html`Kolaż 1988 \nDługopis z miękką końcówką, papier i tkanina.\n30 x 21 cm `,
  },
  {
    title: 'variation on a theme by pinturicchio and rafael',
    caption: 'variation on a theme by\npinturicchio and rafael',
    desc: html`Kolaż. 1980 \nPapier na jedwabiu \n31 x 40 cm`,
  },
  { title: 'gioconda in the hell of bosch', caption: 'gioconda in the hell\nof bosch', desc: GIOCONDA_DESC },
];

export const workImage = (n: number): string => `galeria/works/work-${n + 1}`;

/** Where "go back" / the section title lead from a given work (0-based). */
export const backHref = (index: number): string => (index >= 3 ? '/galeria?krok=2' : '/galeria');
