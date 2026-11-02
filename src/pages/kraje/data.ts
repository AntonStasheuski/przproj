/**
 * Kraje: texts verbatim from the Figma frames (typos included, SPEC §7.2).
 * Markup inside `text`: «\n» is a hard line break kept from the design, «*x*» is italic,
 * «[x](href)» is a link. Collage pieces are Figma node renders; each one is the part of a node
 * visible in the 1512×847 window of its own state, so a piece belongs to the slide it was exported from.
 */

export const SLIDE_W = 1512;

/** [file in public/img/kraje/<slug>/, x in the 4-slide strip, y in the window] — back to front */
export type Piece = readonly [file: string, x: number, y: number];

export interface Slide {
  sub: string;
  text: string;
  /** line under the subtitle, px */
  rule: number;
  /** text block width, px */
  textW: number;
  pieces: readonly Piece[];
}

export interface Country {
  slug: string;
  name: string;
  /** Gruzja only: a 30px strip in the page colour over the bottom of the collage (Rectangle 51) */
  cover?: boolean;
  slides: readonly [Slide, Slide, Slide, Slide];
}

/** x of the text column per slide: [accent bar + heading, subtitle + rule + text] */
export const COPY_X: readonly (readonly [number, number])[] = [
  [45, 45],
  [161, 161],
  [283, 294],
  [439, 439],
];

export const COUNTRIES: Record<string, Country> = {
  ukraina: {
    slug: 'ukraina',
    name: 'Ukraina',
    slides: [
      {
        sub: 'Ukraińskie Karpaty',
        rule: 598,
        textW: 598,
        text: '*Cienie zapomnianych przodków* to najsłynniejszy ukraiński film Siergieja Paradżanowa. Reżyser podziwiał twórczość Mychajło Kotsiubyńskiego, więc nie mógł zaniedbać wiarygodności filmowej adaptacji jego powieści. Dlatego też zdjęcia kręcono\nw Kryworiwni, wiosce, w której ukraiński pisarz napisał swoje dzieło.',
        pieces: [
          ['s1-9038', 587, 409],
          ['s1-flower', 1106, 72],
          ['s1-9037', 696, 50],
        ],
      },
      {
        sub: 'Etnia karpat',
        rule: 516,
        textW: 542,
        text: 'Karpaty to historyczny region we wschodniej Europie Środkowej, położony w ukraińskiej części tego systemu górskiego, sąsiadujący z Polską\ni Rumunią. Jest domem dla trzech ukraińskich grup etnicznych: Hucułów, Bojków i Łemków. Górzysty teren pomógł zachować ich tożsamość kulturową. Karpaty słyną z bogactwa autentycznych rzemiosł i zawodów. Wyrabia się tu sery i chleb według oryginalnych receptur, produkuje tradycyjną odzież i instrumenty muzyczne.',
        pieces: [
          ['s2-bloom', 2532, 0],
          ['s2-flower', 1512, 72],
          ['s2-9037', 1512, 50],
          ['s2-9046', 2602, 46],
          ['s2-9042', 2247, 26],
        ],
      },
      {
        sub: 'huculi',
        rule: 548,
        textW: 598,
        text: 'Huculi, grupa etniczna zamieszkująca Karpaty, wyróżniają się wielowarstwową kulturą, unikalnymi, charakterystycznymi przedmiotami i instrumentami muzycznymi. Do najbardziej charakterystycznych przedmiotów należą instrumenty muzyczne: "trembita" - długa wierzbowa piszczałka oraz "huculska drymba" - drewniana lira, która potrafi przenieść słuchacza\nw atmosferę karpackich ostępów.',
        pieces: [
          ['s3-bloom', 3024, 0],
          ['s3-238ef', 3923, 77],
          ['s3-9046', 3024, 46],
          ['s3-lviv', 3927, 65],
          ['s3-9052', 4363, 34],
        ],
      },
      {
        sub: 'małanka',
        rule: 516,
        textW: 606,
        text: 'Małanka to wesoły i kolorowy obrzęd obchodzony\nna Ukrainie w ostatnią noc nowego roku, tradycyjnie 13 stycznia według kalendarza gregoriańskiego. Święto\nto jest symbolem okresu przejściowego między Bożym Narodzeniem a świętem Trzech Króli. Jedną\nz najbardziej charakterystycznych cech Malanki jest przebranie jej uczestników. Starają się oni ukryć swoją tożsamość za pomocą jaskrawych kostiumów, masek\ni makijażu. Warto również zwrócić uwagę na wesoły folklor towarzyszący temu świętu oraz akompaniament muzyczny, od tradycyjnych instrumentów, takich jak lira czy fujarka, po muzykę współczesną.',
        pieces: [
          ['s4-lviv', 4536, 65],
          ['s4-9052', 4536, 34],
          ['s4-9054', 5367, 38],
        ],
      },
    ],
  },
  gruzja: {
    slug: 'gruzja',
    name: 'Gruzja',
    cover: true,
    slides: [
      {
        sub: 'tyflis',
        rule: 598,
        textW: 584,
        text: 'Twórca ekranowej poezji, Siergiej Paradżanow, urodził się w mrocznych czasach, które zapoczątkowały erę ucisku, dyktatury i całkowitego odrzucenia sprzeciwu. Przyszły filmowiec światowej sławy urodził się 9 stycznia 1924 r. w mieście\no nazwie Tyflis (od 1936 r.Tbilisi) przy ulicy Kote Meskhi, w domu numer 7. Przez całe życie Siergiej Paradżanow wspominał swoje dzieciństwo\nw wolnym, przedsowieckim Tyflisie. Paradżanow nosił się z zamiarem nakręcenia filmu *Spowiedź*\no swoim dzieciństwie w domu przy ulicy Meskhi,\nale niestety nigdy nie udało mu się go zrealizować.',
        pieces: [
          ['s1-2-39', 691, 127],
          ['s1-8-1', 1085, 77],
          ['s1-1-51989', 646, 0],
          ['s1-3-1', 1217, 162],
        ],
      },
      {
        sub: 'geografia',
        rule: 516,
        textW: 542,
        text: 'Gruzja położona jest na granicy Azji i Europy, na terenie tzw. Zakaukazia. Graniczy z Rosją, Azerbejdżanem, Turcją i Armenią. Na\nzachodzie tereny państwa otaczają ciepłe wody Morza Czarnego.Stolicą państwa jest miasto Tbilisi – ogromne miasto, które zamieszkuje około 1,5 miliona osób. Najstarsze ślady osadnictwa z tego terenu pochodzą już sprzed\n2 tysięcy lat, a dziś stanowi ważny ośrodek gospodarczy, edukacyjny i turystyczny.',
        pieces: [
          ['s2-2-39', 1512, 127],
          ['s2-8-1', 1512, 77],
          ['s2-3-1', 1512, 162],
          ['s2-4-86420', 2339, 85],
          ['s2-7-1', 2354, 115],
          ['s2-5-889186', 2805, 129],
          ['s2-9-1', 2082, 94],
        ],
      },
      {
        sub: 'wojna',
        rule: 548,
        textW: 598,
        text: 'W nocy z 7 na 8 sierpnia 2008 roku wybuchła wojna rosyjsko-gruzińska. W trakcie działań wojennych rosyjskie wojska wtargnęły na kilkadziesiąt kilometrów w głąb gruzińskiego terytorium.\nW wyniku wojny Tbilisi utraciło kontrolę nad Osetią Południową i Abchazją, a Moskwa zablokowała Gruzinom możliwość przystąpienia do NATO.\nObecnie Federacja Rosyjska kontynuuje okupację Abchazji i Osetii Południowej, które są niepodzielnymi regionami Gruzji, ignorując podstawowe normy\ni zasady prawa międzynarodowego',
        pieces: [
          ['s3-4-86420', 3024, 85],
          ['s3-7-1', 3024, 115],
          ['s3-5-889186', 3024, 129],
          ['s3-11-1', 3847, 0],
          ['s3-12-1', 3943, 100],
          ['s3-10-1', 3591, 77],
        ],
      },
      {
        sub: 'supra',
        rule: 516,
        textW: 606,
        text: 'Supra, czyli uczta to centrum życia towarzyskiego Gruzinów. Tradycja wspólnych biesiad obrosła przez wieki bogatym rytuałem. Przy suto zastawionym stole rozmawia się o rodzinie, sztuce, polityce, religii, życiu\ni śmierci. Jest to czas umacniania więzi miedzy członkami rodziny, przyjaciółmi i współpracownikami. Zamiłowanie narodu gruzińskiego do biesiad i pogodny stosunek do życia zrodziły [piękną legendę o powstaniu Gruzji](http://www.kaukaz.pl/gruzja/kultura_tradycje/mity_legendy/mity_i_legendy.php). Nie ma uczty bez toastów a toastów\nbez tamady. Można go określić jako przewodnika stołu czy wodzireja. Rolą tamady jest dbanie o porządek podczas biesiady.',
        pieces: [
          ['s4-11-1', 4536, 0],
          ['s4-12-1', 4536, 100],
          ['s4-10-1', 4536, 77],
          ['s4-14-1', 5489, 89],
          ['s4-13-1', 5581, 89],
        ],
      },
    ],
  },
  armenia: {
    slug: 'armenia',
    name: 'Armenia',
    slides: [
      {
        sub: 'sajat nowa',
        rule: 598,
        textW: 598,
        text: 'W Armenii Sajat-Nowa jest uważany za wielkiego poetę, który wniósł znaczący wkład w ormiańską poezję i muzykę swojego stulecia. Chociaż całe życie żył w głęboko religijnym społeczeństwie, jego prace są w większości świeckie i pełne romantycznego ekspresjonizmu. Pseudonim Sajat-Nowa doczekał się kilku interpretacji. Jedna wersja brzmi imię jako „Pan Pieśni” (z arabskiego sayyid i perskiej nava) lub „Król Pieśni”',
        pieces: [
          ['s1-3-2', 796, 0],
          ['s1-1-51990', 684, 113],
          ['s1-4-86421', 1008, 59],
        ],
      },
      {
        sub: 'Pochodzenie nazwy',
        rule: 516,
        textW: 542,
        text: 'Nazwa Armenii używana w niemal wszystkich językach pochodzi od perskich nazw Armanestân i Arman znalezionych\nw staroperskich inskrypcjach. Nazwy te z kolei pochodzą od nazwy jednej z graniczących\nz Persją prowincji państwa Urartu, leżącej na terenie historycznych ormiańskich ziem, która\nz kolei została tak nazwana z uwagi na fakt,\niż znaczną część jej populacji w owym czasie\n(ok. poł I tys. p.n.e.) stanowili Aramejczycy.',
        pieces: [
          ['s2-5-889187', 2707, 22],
          ['s2-2-40', 2277, 129],
          ['s2-4-86421', 1512, 59],
        ],
      },
      {
        sub: 'erywań',
        rule: 548,
        textW: 598,
        text: 'Największym miastem i jednocześnie stolicą Armenii jest Erywań, miasto o ponad 2800-letniej historii. Erywań nazywany jest Paryżem wschodu. Jest to czyste, uporządkowane, bardzo ładne miasto, z masą uroczych knajpek, kafejek i restauracji. Mieszka tam ponad 1/3 mieszkańców kraju (1,2 mln osób). W stolicy widać i czuć zachodnie wpływy.',
        pieces: [
          ['s3-5-889187', 3024, 22],
          ['s3-6-1', 4202, 35],
          ['s3-7-2', 3970, 91],
          ['s3-9-2', 4412, 155],
        ],
      },
      {
        sub: 'Historia',
        rule: 516,
        textW: 606,
        text: 'Historia Armenii swój początek ma już między XI a VII w p.n.e, kiedy to na terenach współczesnych kraju istniało potężne królestwo Urartu.\nArmenia zajmowana była przez Persów, Aleksandra Wielkiego i pod władzą dowódców jego\narmii - diadochów - pozostawała aż do 190 r p.n.e. Losy Armenii uzależnione były od jej położenia geograficznego, bowiem leżała w bardzo pożądanym przez sąsiadów miejscu. Zajęcie tego kraju przez Turków czy Persów dawało tym krajom możliwość zamknięcia swych mocarstw zaporą Kaukazu od północy, Morzem Kaspijskim od wschodu i Morzem Czarnym od zachodu. ',
        pieces: [
          ['s4-6-1', 4536, 35],
          ['s4-8-2', 5559, 290],
          ['s4-9-2', 4536, 155],
        ],
      },
    ],
  },
};

/** Cards on the start page, in the order of the frame. Geometry in design px (page coordinates). */
export interface Card {
  slug: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** top-left of the photo tile and of the cut-out figure relative to the card (sizes come from the assets) */
  photo: readonly [x: number, y: number];
  figure: readonly [x: number, y: number];
}

export const CARDS: readonly Card[] = [
  { slug: 'gruzja', name: 'Gruzja', x: 424, y: 179, w: 350, h: 595, photo: [0, 19], figure: [0, 0] },
  { slug: 'ukraina', name: 'Ukraina', x: 799, y: 174, w: 348, h: 600, photo: [0, 24], figure: [0.4, 0] },
  { slug: 'armenia', name: 'Armenia', x: 1172, y: 178, w: 349, h: 596, photo: [0, 19.8], figure: [13.8, 0] },
];

export const QUOTE = 'Wszyscy wiedzą,\nże mam trzy ojczyzny. Urodziłem się\nw Gruzji, pracowałem\nna Ukrainie i umrę\nw Armenii.';
export const QUOTE_AUTHOR = 'Siergiej Paradżanow';
