/**
 * FAKTY: six films, five panels each. Texts are verbatim from the Figma layers (typos and hard line
 * breaks included). `w` is the text block width, `x` its left edge when it differs from 25.
 * Pictures: fakty/<slug>-N (open panel, 847×600) and fakty/<slug>-strip-N (collapsed 153×600, drawn
 * separately in Figma with its own crop and colour filters).
 */
export interface Fact {
  head: string;
  text: string;
  w: number;
  x?: number;
  /** distance of the last line from the panel bottom (design px), 25 unless the layer sits higher */
  b?: number;
  /** open picture is darkened (Figma: lighten picture + multiply #232328 80%) */
  dim?: boolean;
}

export interface Film {
  slug: string;
  /** title as shown on panel 01 (hard line breaks as in the design) */
  title: string[];
  /** facts for panels 02–05 */
  facts: [Fact, Fact, Fact, Fact];
}

export const FILMS: Film[] = [
  {
    slug: 'andrijesz',
    title: ['Andrijesz'],
    facts: [
      {
        head: '1952',
        w: 540,
        text: 'Po śmierci pierwszej żony Paradżanow wyjechał z Moskwy do Tbilisi, gdzie doświadczył bólu\ni szoku po stracie, a następnie przeniósł się do Mołdawii, gdzie nakręcił swój dyplomowy film krótkometrażowy dla WGIK o pasterzu Andrijesze, oparty na bajce o tym samym tytule autorstwa Emiliana Bukowa.',
      },
      {
        head: '1954',
        w: 579,
        b: 23,
        text: 'Swój pierwszy film fabularny “Andrijesz” reżyser nakręcił w 1954 r.. Wcześniej Paradżanow robił tylko filmy krótkometrażowe, a “Andrijesz” był początkowo tylko projektem dyplomowym. Niestety, wersja nakręcona na uniwersytecie zaginęła, ale zachował się film pełnometrażowy.',
      },
      {
        head: 'fabula',
        w: 540,
        text: 'Film opowiada o bohaterze mołdawskich bajek - pasterzu Andrijesze, który marzył o zostaniu rycerzem, o magicznym gwizdku, który kiedyś podarował mu bajkowy bogatyr Wainowan, oraz o jego walce ze złym czarnoksiężnikiem Czarnym Wirem, który nienawidzi wszystkich żywych istot.',
      },
      {
        head: 'wyznanie',
        w: 627,
        b: 26,
        text: '“Andrijesz” nie był jednak bliski przeciętnemu widzowi\nw republikach. Opowieść o mołdawskim chłopcu nie przykuwała uwagi, w przeciwieństwie do innych bajek, które były bardziej zrozumiałe dla radzieckich dzieci. Choć już w pierwszym filmie Paradżanowa można zauważyć jego niestandardowe rozwiązania oraz zabawę kontrastami i kolorem.m, który nienawidzi wszystkich żywych istot.',
      },
    ],
  },
  {
    slug: 'cienie',
    title: ['cienie zapomnianych', 'przodków'],
    facts: [
      {
        head: '1962',
        w: 625,
        b: 31,
        text: 'Jesienią 1962 r. Kijowskie Studio Filmowe postanowiło sfilmować “Cienie zapomnianych przodków” Mychajło Koсiubynskiego z okazji stulecia urodzin pisarza.\nW klasycznej historii ukraińskiego Romea i Julii nikt nie brał pod uwagę antyradzieckiego podtekstu.',
      },
      {
        head: 'Ormianin',
        w: 625,
        b: 28,
        text: 'Paradżanow został mianowany reżyserem “Cieni zapomnianych przodków”, mimo że przywódcy partii uważali, że ormiański reżyser nie będzie w stanie stworzyć filmu, który rozbudzi świadomość narodową Ukraińców. Historia jednak pokazała, że radziecka kuratela popełniła błąd, mianując reżysera, który faktycznie przyniósł zmiany w ukraińskiej historii\ni kulturze.',
      },
      {
        head: 'Mychajło Kociubynski',
        w: 625,
        b: 30,
        text: 'Mychajło Kociubynski napisał swoją powieść w 1911 roku pod wrażeniem podróży w Karpaty. Akcja tego neoromantycznego dramatu rozgrywa się w huculskiej wiosce w pobliżu rzeki Czeremosz. Głównymi bohaterami utworu są Iwan i Mariczka, dzieci, których rodziny, podobnie jak szekspirowscy Montecchi\ni Capuletich, od dawna są ze sobą skłócone.',
      },
      {
        head: '1965',
        w: 625,
        b: 26,
        text: '4 września 1965 r. na premierze filmu “Cienie zapomnianych przodków” doszło do masowych protestów ukraińskiej inteligencji dysydenckiej.\nTego dnia w totalitarnym ZSRR powstało ukraińskie społeczeństwo obywatelskie. Każdy widz w kinie\nczuł się jak ukrainiec, a katalizatorem tego procesu\nbył ormianin Siergiej Paradżanow.',
      },
    ],
  },
  {
    slug: 'kijowskie-freski',
    title: ['Kijowskie freski'],
    facts: [
      {
        head: '1966',
        w: 650,
        b: 31,
        text: 'Po filmie “Cienie zapomnianych przodków” reżim totalitarny postanowił ukarać reżysera. W czerwcu\n1966 r. KCKP Ukrainy podjął uchwałę, w której wskazał\nna poważne błędy w organizacji produkcji filmowej\nw Kijowskim Studiu Filmowym.',
      },
      {
        head: 'Zakaz',
        w: 650,
        b: 28,
        text: 'Zakazem objęto także projekcję szeregu filmów, m.in. filmu Siergieja Paradżanowa “Kijowskie freski”, w którym reżyser starał się pokazać powojenny Kijów – swoje ukochane miasto, które stało się jego domem.',
      },
      {
        head: 'Kijów',
        w: 650,
        b: 28,
        text: 'Film “Kijowskie freski” był poświęcony 20. rocznicy zwycięstwa w II wojnie światowej. Siergiej Paradżanow nie pozwolił komisji na wprowadzenie zmian w scenariuszu\ni zawsze odmawiał pójścia na kompromis. Kilka miesięcy później film wycofano z produkcji, tłumacząc to "mistycznym i subiektywnym podejściem do współczesnej rzeczywistości".',
      },
      {
        head: '15 minut',
        w: 650,
        b: 29,
        text: 'Z “Kijowskich fresków” mamy 15-minutowe próby filmowe i dokumenty z instrukcjami dla ekipy filmowej. Na przykład list do asystenta reżysera Romana Balayana można zobaczyć na wystawie poświęconej filmowi “Loty\nw snach i na jawie”.',
      },
    ],
  },
  {
    slug: 'sajat-nowa',
    title: ['Sajat-Nowa'],
    facts: [
      {
        head: '1968',
        w: 540,
        text: 'W 1968 r. reżyser przeniósł się do Erywania, gdzie próbował zrealizować swój projekt o poecie Sajacie Nowie. Dla studia Armenfilm nakręcił kilka filmów krótkometrażowych mających na celu powierzchowne pokazanie twórczości ormiańskich artystów, w tym Sajat Nowa.',
      },
      {
        head: 'Sajat-Nowa',
        w: 556,
        b: 31,
        text: 'Poetycka powieść filmowa Siergieja Paradżanowa o ormiańskim poecie Sajat-Nowa, nakręcona\nw 1968 roku w studiu Armenfilm. Autorski tytuł to "Sajat-Nowa". Film otrzymał negatywne recenzje zarówno od władz, jak i krytykóigał widzów, że celem autora było oświetlenie wewnętrznego świata poety, a nie tylko opowiedzenie jego biografii.',
      },
      {
        head: 'Barwy granatu',
        w: 556,
        b: 35,
        text: 'Zagraniczni widzowie byli pod wrażeniem wykorzystania kolorów, zdjęć i koncepcji filmu, ale kierownictwu nie podobał się rezultat. Film został przerobiony i przemianowany na “Barwy granatu” Siergieja Jutkiewicza i w tej formie trafił do kin.',
      },
      {
        head: 'wyznanie',
        w: 556,
        b: 31,
        text: 'Dopiero na początku XXI wieku przywrócono oryginalny montaż i odrestaurowano film. “Sajat Nowa” doskonale uosabia zamiłowanie Siergieja Paradżanowa do ceramiki, grafiki i wszelkiego rodzaju rekwizytów.',
      },
    ],
  },
  {
    slug: 'legenda',
    title: ['Legenda o Twierdzy', 'Suramskiej'],
    facts: [
      {
        head: '1984',
        w: 560,
        b: 30,
        text: 'Od ostatniego filmu Paradżanowa minęło 15 lat. Dopiero w 1984 r. nakręcono kolejne dzieło reżysera “Legenda o Twierdzy Suramskiej”.\nNie mogąc zrealizować scenariusza\n“Intermezzo” Siergiej Paradżanow sięgnął po mniej psychologiczną historię, zaczerpniętą\nz gruzińskiej legendy o młodzieńcu, który\nzostał zamurowany w twierdzy.',
      },
      {
        head: '2 reżysery',
        w: 540,
        b: 32,
        dim: true,
        text: 'Formalnie Dawid Abaszydze jest uznawany za pierwszego reżysera filmu, ale wiosną film został nakręcony i przepisany przez Siergieja Paradżanowa, który odtworzył historię za pomocą symboli, obrazów i folkloru.',
      },
      {
        head: 'fabula',
        w: 642,
        b: 31,
        x: 19,
        text: 'Mieszkańcy Gruzji, przygotowując się do obrony swojego kraju przed atakiem obcych zniewolicieli, zbudowali fortecę, ale za każdym razem, gdy mur osiągał poziom dachu, zawalał się. "Mur wytrzyma, jeśli zamuruje się\nw nim najpiękniejszy młodzieniec" - powiedział wróżbita.\nI znalazł się młodzieniec, który poświęcił się dla ratowania Ojczyzny. Dzięki tej ofierze twierdza została wzniesiona i nikt ani nic innego nie mogło jej zniszczyć.',
      },
      {
        head: 'wyznanie',
        w: 620,
        b: 34,
        x: 19,
        text: 'W latach 80. film “Legenda o Twierdzy Suramskiej” został doceniony na międzynarodowych festiwalach filmowych w São Paulo i Rotterdamie.',
      },
    ],
  },
  {
    slug: 'aszik-kerib',
    title: ['Aszik Kerib'],
    facts: [
      {
        head: '1988',
        w: 540,
        b: 31,
        text: 'W 1988 r. Siergiej Paradżanow wydał swój ostatni ukończony film “Ashik Kerib” oparty na opowiadaniu Michaiła Lermontowa\no wędrownym trubadurze, który pokonał tysiąc prób, aby znaleźć swoją ukochaną.',
      },
      {
        head: 'Fabula',
        w: 540,
        b: 31,
        text: 'Młody trubadur przemierza ormiańską prowincję. Jest w drodze już ponad tysiąc dni. Ma nadzieję, że na końcu jego wędrówki czeka go fortuna.',
      },
      {
        head: 'Andriej Tarkowski',
        w: 540,
        b: 31,
        text: 'Film jest zadedykowany Andriejowi Tarkowskiemu, którego Paradżanow bardzo cenił jako kolegę i przyjaciela.',
      },
      {
        head: 'wyznanie',
        w: 566,
        b: 31,
        text: 'Film miał swoją premierę na Festiwalu Filmowym w Monachium, a później był pokazywany\nw Wenecji i Cannes. “Ashik Kerib” stał się jednym\nz najpopularniejszych dzieł reżysera.',
      },
    ],
  },
];

export const filmBySlug = (slug: string): Film | undefined => FILMS.find((f) => f.slug === slug);
