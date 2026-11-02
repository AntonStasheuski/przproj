/**
 * Home page content, verbatim from Figma frame 1:2 (and variant sets Component 31, 9/20–24).
 * Manual line breaks of body copy are dropped (SPEC §7.5); `pl()` keeps one-letter Polish
 * words off line ends the way the designer did by hand.
 */

/** Joins hard-wrapped lines and binds one-letter words (w, z, i, o, a, u) to the next word. */
export const pl = (text: string): string =>
  text
    .replace(/\s*\n\s*/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim()
    .replace(/(^|\s)([aiouwzAIOUWZ]) /g, '$1$2 ');

export const LINKS = {
  behance: 'https://www.behance.net/valeriamalashe',
  museum: 'https://parajanovmuseum.am/',
  figma: 'https://www.figma.com/design/QQ8RxQkI5wcDPCWsRXuhYA/Dyplom?node-id=465-3723&t=DlzXmbNnMfu6S9lT-4',
  linkedin:
    'https://www.linkedin.com/in/valeriia-malashevska-292ba0281?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BFbtukL2iQ1m97M%2FRnLTRww%3D%3D',
  pinterest: 'https://pin.it/3mS7BNqn4',
  email: 'valeria08.ink@gmail.com',
} as const;

export const HERO = {
  lead: 'Wszystko o jednym z najciekawszych reżyserów XX wieku, wyjątkowym mistrzu, który stworzył swój własny, niepowtarzalny język filmowy',
  author: 'Valeriia Malashevska',
  year: '2024',
};

export const ABOUT = {
  title: 'O projekcie',
  caption: ['Seiergiej Paradżanow', 'kolaż Valeriia Malashevska', '2024 r.'],
  text: pl(`PRŻ Project  powstał w celu poznania życia
i twórczości Siergieja Paradżanowa, jednego
z najwybitniejszych reżyserów XX wieku. Na naszej stronie każdy chętny może zapoznać się z twórczością artystyczną, filmami i biografią reżysera w nietypowy
i bardzo interesujący sposób. Szczególną cechą naszego projektu są interaktywne plakaty artystyczne, które służą nie tylko celom wizualnym, a także edukacyjnym.`),
};

export const GOALS = {
  title: 'Do czego służy projekt',
  autograph: 'Siergiej Paradżanow',
  items: [
    { key: 'idea', label: 'Idea', text: pl('Tworzenie ciekawych, interaktywnych i nietypowych rozwiązań to główna idea tego projektu.') },
    {
      key: 'estetyka',
      label: 'Estetyka',
      text: pl(`Stworzenie pięknego wizualnie
i łatwego w obsłudze interfejsu użytkownika jest głównym zadaniem tego projektu.`),
    },
    {
      key: 'wiedza',
      label: 'Wiedza',
      text: pl(`Zdobyć nową wiedzę i zapoznać się
z dziedzictwem kulturowym świata. Zanurzyć się w świat kina i mieszanki ormiańsko-ukraińskiej.`),
    },
  ],
};

export type SectionId = 'art' | 'galeria' | 'filmy';

/** Component 182: one column per site section; Art Project is open by default (variant 167). */
export const SECTIONS: { id: SectionId; href: string; label: string; title: string[] }[] = [
  { id: 'art', href: '/art-project', label: 'Art Project', title: ['Art', 'Project'] },
  { id: 'galeria', href: '/galeria', label: 'Galeria', title: ['Galeria'] },
  { id: 'filmy', href: '/filmy', label: 'Filmy', title: ['Filmy'] },
];

export const BIO = {
  caption: ['Siergiej Paradżanow', 'kolaż Valeriia Malashevska', '2024 r.'],
  title: ['siergiej', 'Paradżanow'],
  years: '(1924-1990)',
  /** Component 31 variants in prototype order: Frame 7 → 11 → 8 → 9 → 10 */
  slides: [
    pl(`Siergiej Paradżanow, światowej sławy filmowiec
o awangardowych tendencjach, odziedziczył swoją niezwykłą zdolność i bujną wyobraźnię po matce, która była wyjątkowo artystyczną i ekscentryczną postacią w swoich czasach. Urodzony 9 stycznia 1924 roku, Siergiej był trzecim dzieckiem w rodzinie. Jego ojciec, Joseph, zamożny handlarz antykami z Tyflisu (obecnie Tbilisi w Gruzji), pragnął, aby jego syn przejął i rozwijał rodzinny biznes.`),
    pl(`W latach 1950-1960 Paradżanow pracował na Ukrainie. Jego pierwsze cztery filmy, “Andrijesz”, “Pierwszy chłopak”, “Ukraińska rapsodia” i “Kwiatek na kamieniu”, nie zostały dobrze przyjęte przez krytyków. Przez dziesięć lat Serhij pracował
w dziedzinie kina, nie otrzymując ani żadnego uznania ani nagród. Nikt nie spodziewał się, że zostanie wybitnym artystą. Ale w 1966 roku Paradżanow nakręcił “Cienie zapomnianych przodków”.`),
    pl(`Film stał się prawdziwą eksplozją kina, jednym
z najważniejszych wydarzeń w radzieckiej kinematografii lat 60. i był porównywany do takich arcydzieł jak "Lecą żurawie" Michaiła Kałatozowa, "Ballada o żołnierzu" Grigorija Czuchraja czy "Dzieciństwo Iwana" Andrieja Tarkowskiego. Zainspirowany swoim triumfem, Paradżanow rozpoczął pracę nad kolejnym filmem - Kijowskimi freskami. Niestety, szefowie Państwowej Agencji Filmowej byli już bardzo negatywnie nastawieni do Paradżanowa, oskarżając go o surrealizm, i film nie został dopuszczony do premiery.`),
    pl(`Paradżanow musiał przenieść się do Erywania, gdzie w 1968 roku nakręcił swoje główne arcydzieło, film uznawany za granicą za jedno z najważniejszych dzieł światowego kina, Kolor granatu. Film został jednak wydany dopiero pięć lat później. W 1973 roku Paradżanow został uwięziony za rzekome stosunki homoseksualne. Siergiej Paradżanow został skazany na pięć lat kolonii o zaostrzonym rygorze.`),
    pl(`Został zwolniony w 1977 roku dzięki staraniom Lili Brick, kochanki Majakowskiego, która zwróciła się
o pomoc do słynnego pisarza Louisa Aragona, prosząc go o dobre słowo dla Paradżanowa przed sekretarzem generalnym Breżniewem. Siergiej Paradżanow nakręcił swój ostatni film, Ashik-Kerib, oparty na Michaile Lermontowie, w 1988 roku, kiedy był już poważnie chory - zdiagnozowano u niego raka płuc. Wybitny reżyser zmarł w Erywaniu 20 lipca 1990 roku. W tym samym roku został uhonorowany tytułem Artysty Ludowego Ukraińskiej SRR (pośmiertnie), a w 1991 roku otrzymał Państwową Nagrodę Ukrainy im.`),
  ],
};

export const MUSEUM = {
  title: 'museum',
  address: 'Parajanov street , Bldg 1, Yerevan, Armenia',
  hoursLabel: 'Godziny otwarcia',
  hours: ['Pn - ND', '10:00 - 18:00'],
  infoTitle: 'INFORMACJE DLA ZWIEDZAJĄCYCH',
  info: pl(`Poznaj kolekcję dzięki wycieczkom, czatom i innym programom. Każdego dnia oferujemy wycieczki
po różnych liniach, wycieczki audio, podczas których można coś zobaczyć i czegoś się nauczyć. Regularnie odbywają się rozmowy z zaproszonymi prelegentami i moderatorami. Więcej szczegółów można znaleźć
na stronie muzeum.`),
};

/** Przyjaciele: photo card; hover variant is a text card (Figma DISSOLVE SLOW 1.25 s; the site uses 0.3 s, SPEC §7a). */
export const FRIENDS = {
  title: 'Przyjaciele',
  years: '(1924-1990)',
  items: [
    {
      key: 'fellini',
      name: 'federico fellini',
      text: pl(`Podczas pobytu w więzieniu, aby nie zwariować, Paradżanow nieustannie malował, tworzył kolaże ze śmieci
i srebrne "talary" z profilami odciśniętymi długopisem z kapsli od butelek kefiru. Po latach jeden z tych "talarów", odlany ze srebra, zdobył nagrodę filmową Amarcord, ufundowaną przez Felliniego i Guerro,
 a drugi zdobył ormiańską nagrodę filmową Golden Apricot.`),
    },
    {
      key: 'loran',
      name: 'yev sen loran',
      text: pl(`Yves Saint Laurent wysoko cenił filmy Paradżanowa, wysyłał mu listy wsparcia, gdy był w obozie, a nawet zaproszenie do Paryża; ich jedyne spotkanie z Paradżanowem odbyło się w pokoju Laurenta w National i było bardzo krótkie. Wiadomo, że Paradżanow podarował projektantowi własnoręcznie wykonany album
z dedykowanymi mu kolażami, który obecnie znajduje się w jego paryskim mieszkaniu-muzeum.`),
    },
    {
      key: 'tarkowski',
      name: 'Andriej Tarkowski',
      text: pl(`Kiedy Tarkowski przyjechał do Włoch
 w 1982 roku, powiedziano mu
o zamiarach Hanzaferlagu, by wydać książkę o wybitnych radzieckich reżyserach filmowych. "Mogę wymienić tylko Paradżanowa" - odpowiedział Tarkowski. - "Tylko on na to zasługuje. Nie ma nikogo innego, o kim można by napisać książkę. On czyni sztukę ze wszystkiego: nakrycie stołu do kolacji jest sztuką, włożenie uschniętej gałązki do szklanki jest sztuką, przesunięcie klatki zaledwie o centymetr - a ty będziesz sapał...".`),
    },
    {
      key: 'godard',
      name: 'Jean-Luc Godard',
      text: pl(
        'Świątynia kina jest wypełniona obrazami, światłem i rzeczywistością. Siergiej Paradżanow był kapłanem w tej świątyni. Tak o swoim wielkim koledze mówił lider francuskiej Nowej Fali, pionier kina Jean-Luc Godard.',
      ),
    },
    {
      key: 'wajda',
      name: 'Andrzej Wajda',
      text: pl(`"Cienie zapomnianych przodków" stał się rekordzistą w świecie kina: film zdobył 39 międzynarodowych nagród, 28 nagród na festiwalach filmowych
(w tym 24 Grand Prix) w dwudziestu jeden krajach. Paradżanow otrzymał gratulacje od Felliniego, Antonioniego, Kurosawy, a polski reżyser Andrzej Wajda uklęknął przed Paradżanowem
i ucałował jego dłoń, dziękując mu za
to arcydzieło.`),
    },
    {
      key: 'antonioni',
      name: 'Michelangelo Antonioni',
      text: pl(`Roman Balayan nakręcił dwudziestominutowy film zatytułowany "Noc w Muzeum Paradżanowa". Balayan cytuje Antonioniego mówiącego, że Paradżanow jest jednym z najlepszych współczesnych artystów. Kiedy Tonino i Antonioni przybyli do Moskwy, pierwszą rzeczą, o którą zapytali mnie
i "oddelegowanego" tłumacza, było: "Jak mogę przekazać pieniądze na potrzeby Paradżanowa, który został aresztowany na Ukrainie?".`),
    },
  ],
};

export const FOOTER = {
  title: 'Idea and design by Valeriia Malashevska',
  text: pl(`Projekt PRŻ PROJ, obejmujący stronę internetową, kolaże i plakaty, został wymyślony i zaprojektowany przez Valeriię Malashevską jako praca magisterska na Uniwersytecie Marii Curie-Skłodowskiej
w Lublinie, Wydział Artystyczny, 2024 r.`),
  social: [
    { key: 'instagram', href: LINKS.figma, label: 'Makieta projektu w Figma', w: 68 },
    { key: 'linkedin', href: LINKS.linkedin, label: 'LinkedIn', w: 67 },
    { key: 'behance', href: LINKS.behance, label: 'Behance', w: 68 },
    { key: 'pinterest', href: LINKS.pinterest, label: 'Pinterest', w: 67 },
  ],
};
