/**
 * Filmy section data. Texts are copied verbatim from Figma (SPEC §7.2: typos are kept),
 * line breaks (\n) are the designer's hard breaks.
 */

export interface Film {
  slug: string;
  /** caption under the poster on /filmy/plakaty and /filmy/fakty */
  caption: string;
  /** heading of the metadata panel (398:3184 …) */
  title: string;
  /** values for META_LABELS, in order */
  meta: readonly string[];
  /** the «film» band (398:3332 …) */
  band: {
    title: string;
    year: string;
    time: string;
    rating: string;
    /** left edge of the band texts inside the 1422 px panel */
    left: number;
    /** left edge of the 165 px play button inside the panel */
    play: number;
  };
  plot: string;
  /** cast, row by row (3 per row) */
  cast: readonly string[];
}

export const META_LABELS = ['Reżyseria', 'Scenariusz', 'Gatunek', 'Premiera', 'Produkcja', 'Czas'] as const;

export const FILMS: readonly Film[] = [
  {
    slug: 'andrijesz',
    caption: 'Andrijesz',
    title: 'ANDRIJESZ (1954)',
    meta: [
      'Siergiej Paradżanow, Yakov Bazelyan',
      'Yemelian Bukov, Grigori Koltunov',
      'Familijny, Fantasy',
      '30 maja 1955 (Światowa)',
      'ZSRR',
      '63 min. / 01:03',
    ],
    band: { title: 'andrijesz', year: '1954', time: '1h 03m', rating: '5,8', left: 25, play: 628 },
    plot: 'Film na podstawie baśni Jemiliana Bukowa o bohaterze mołdawskich bajek - pastuszce Andrijeszy, który marzył o tym, żeby zostać rycerzem. O czarodziejskiej trzcinie, którą pewnego razu podarował mu Wajnowan i walce ze złym czarodziejem Czarnym Wichrem, nienawidzącym wszystkich żywych istot. tompawel.',
    cast: [
      'Giuli Chokhonelidze', 'Lyudmila Sokolova', 'Domnika Dariyenko',
      'Konstantin Russu', 'Kiril Stirbu', 'Robert  Klyavin',
      'Nodar Shashigoglu', 'Eugeniu Ureche', 'Trifon Gruzin',
    ],
  },
  {
    slug: 'cienie',
    caption: 'Cienie zapomnianych przodków',
    title: 'cienie zapomnianych\nprzodków (1964)',
    meta: [
      'Siergiej Paradżanow',
      'Siergiej Paradżanow, Mikhaylo Kotsyubinsky',
      'Dramat, Poetycki, Kostiumowy',
      '22 marca 1965 (Światowa)',
      'ZSRR (Ukraina)',
      '97 min. / 01:37',
    ],
    band: { title: 'cienie zapomnianych\nprzodków', year: '1964', time: '1h 37m', rating: '8,0', left: 29, play: 632 },
    plot: 'Przez dziesiątki lat dwa huculskie rody - Palijczuków i Gutenyuków - były ze sobą skłócone. Zdarzyło się jednak, że Iwan Palijczuk zakochał się w pięknej dziewczynie z wrogiej rodziny - Mariczce, córce mordercy jego ojca...',
    cast: [
      'Iwan Mykołajczuk', 'Spartak Bagashvili', 'Nina Alisova',
      'Larisa Kadochnikova', 'Neonila Gnepovskaya', 'Aleksandr Gaj',
      'Tatyana Bestayeva', 'Leonid Yengibarov', 'Nikolay Grinko',
    ],
  },
  {
    slug: 'kijowskie-freski',
    caption: 'Kijowskie freski',
    title: 'Kijowskie freski (1966)',
    meta: [
      'Siergiej Paradżanow',
      'Siergiej Paradżanow, Pavlo Zagrebelny',
      'Krótki metraż',
      '25 stycznia 2019 (Światowa)',
      'ZSRR (Ukraina)',
      '9 min.',
    ],
    band: { title: 'Kijowskie freski', year: '1966', time: '9m', rating: '7,0', left: 29, play: 632 },
    plot: 'Zmontowany testowy materiał filmowy do niewydanego filmu "Kijowskie freski" Siergieja Paradżanowa.',
    cast: ['Nie są znane żadne nazwiska'],
  },
  {
    slug: 'sajat-nowa',
    caption: 'Sajat Nowa',
    title: 'Sajat-Nova/Barwy granatu (1968)',
    meta: [
      'Siergiej Paradżanow',
      'Siergiej Paradżanow',
      'Biograficzny, Dramat, Muzyczny',
      '29 śierpnia 1968',
      'ZSRR (Armenia)',
      '74 min. / 01:14',
    ],
    band: { title: 'Sajat-Nova/\nBarwy granatu', year: '1968', time: '1H 14m', rating: '8,1', left: 49, play: 628 },
    plot: 'Biograficzna opowieść pokazująca duchowy świat średniowiecznego ormiańskiego poety Sajat-Nowu, który pisał także w języku gruzińskim i azerbejdżańskim. Ukazano historię jego miłości, stosunek poety do religii, władzy świeckiej i ludzi.',
    cast: [
      'Sofiko Chiaureli', 'Melkon Aleksanyan', 'Medea Bibileishvili',
      'Spartak Bagashvili', 'Medea Djaparidze', 'Gogi Gegechkori',
      'Yuri Amiryan', 'Hovhannes Minasyan', 'Onik Minasyan',
    ],
  },
  {
    slug: 'legenda',
    caption: 'Legenda o Twierdzy Suramskiej',
    title: 'Legenda o Twierdzy \nSuramskiej (1984)',
    meta: ['Siergiej Paradżanow', 'Vaja Gigashvili', 'Dramat', '1984', 'ZSRR', '88 min. / 01:28'],
    band: { title: 'Legenda o Twierdzy \nSuramskieji', year: '1984', time: '1H 28m', rating: '7,1', left: 49, play: 652 },
    plot: 'Przygotowując się do obrony swojego kraju przed cudzoziemskimi najeźdźcami lud wznosił twierdzę, lecz za każdym razem, kiedy ściana osiągała poziom dachu, zawalała się. Ściana wytrwa, jeżeli w nią będzie zamurowany najpiękniejszy młodzieniec powiedziała wróżka. I znalazł się młodzieniec, który dokonał ofiary dla ratowania ojczyzny. Dzięki tej ofierze twierdza była niedostępna i nikt już więcej nie mógł jej zburzyć...',
    cast: [
      'Veriko Anjaparidze', 'Tamari Tsitsishvili', 'Levan Uchaneishvili',
      'Sofiko Chiaureli', 'Zura Kipshidze', 'Mzia Arabuli',
      'Leila Alibegashvilli', 'Dudukhana Tserodze', 'Dodo Abashidze',
    ],
  },
  {
    slug: 'aszik-kerib',
    caption: 'Aszik Kerib',
    title: 'Aszik Kerib (1988)',
    meta: [
      'Siergiej Paradżanow',
      'Gija Badridze, Michaił Lermontow',
      'Dramat, Romans',
      '1988',
      'ZSRR (Gruzja)',
      '73 min. / 01:13',
    ],
    // the band title on the AK frame (398:3625) is «Kijowskie freski» in the design; kept verbatim (SPEC §7.2)
    band: { title: 'Kijowskie freski', year: '1988', time: '1h 13m', rating: '7,3', left: 29, play: 632 },
    plot: 'Romantyczny dramat oparty na poemacie o tym samym tytule autorstwa wielkiego rosyjskiego poety Michaiła Lermontowa. Aszik-Kerib był biedny, ale miał dobre serce i piękny głos. Grał na saaz, tureckiej bałałajce, gloryfikującej starożytnych wojowników Turkiestanu, i występował na festiwalach i weselach.',
    cast: [
      'Yuri Mgoyan', 'Sofiko Chiaureli', 'Ramaz Chkhikvadze',
      'Veronique Matonidze', 'Baia Dvalishvili', 'David Dovlatian',
      'Slava Stepanian', 'Nodar Dugladze', 'Dodo Abashidze',
    ],
  },
];

/** posters per carousel page on /filmy/plakaty and /filmy/fakty */
export const PER_PAGE = 3;

/** carousel page (1-based) that holds the film — Go back on a film page returns there */
export const plakatyHref = (index: number): string =>
  index < PER_PAGE ? '/filmy/plakaty' : `/filmy/plakaty?krok=${Math.floor(index / PER_PAGE) + 1}`;

export const findFilm = (slug: string): number => FILMS.findIndex((f) => f.slug === slug);

/** plain title for document.title and the page heading, e.g. «Andrijesz (1954)» */
export const plainTitle = (f: Film): string => `${f.caption} (${f.band.year})`;
