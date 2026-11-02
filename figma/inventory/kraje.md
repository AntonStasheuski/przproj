# KRAJE (kraje: start + Ukraina / Gruzja / Armenia, po 4 stany)

Источники: get_design_context (249:520, 252:721, 288:572, 309:2016, 252:694, 325:2336, 491:4955, 95:702), get_screenshot всех 13 фреймов + 252:694 / 95:702 / 95:705, page1.xml (сравнение деревьев питоном). Тексты и имена слоёв в макете - данные.

## 1. Фреймы

Все 1512x982. Скриншоты в /Users/anton/Documents/projects/przproj/figma/screens/.

| id | имя | скриншот | роль |
|---|---|---|---|
| 249:520 | film kraje started page | 249-520__film-kraje-started-page.png | старт: цитата + 3 карточки стран |
| 252:721 | film kraje Ukraina 1 | 252-721__film-kraje-ukraina-1.png | Ukraina, слайд 1 (Ukraińskie Karpaty) |
| 265:750 | film kraje Ukraina 2 | 265-750__film-kraje-ukraina-2.png | слайд 2 (Etnia karpat) |
| 265:856 | film kraje Ukraina 3 | 265-856__film-kraje-ukraina-3.png | слайд 3 (Huculi) |
| 265:909 | film kraje Ukraina 4 | 265-909__film-kraje-ukraina-4.png | слайд 4 (Małanka) |
| 288:572 | film kraje Gruzja 1 | 288-572__film-kraje-gruzja-1.png | Gruzja, слайд 1 (Tyflis) |
| 305:1761 | film kraje Gruzja 2 | 305-1761__film-kraje-gruzja-2.png | слайд 2 (Geografia) |
| 305:1843 | film kraje Gruzja 3 | 305-1843__film-kraje-gruzja-3.png | слайд 3 (Wojna) |
| 305:1925 | film kraje Gruzja 4 | 305-1925__film-kraje-gruzja-4.png | слайд 4 (Supra) |
| 309:2016 | film kraje Armenia 1 | 309-2016__film-kraje-armenia-1.png | Armenia, слайд 1 (Sajat Nowa) |
| 352:1943 | film kraje Armenia 2 | 352-1943__film-kraje-armenia-2.png | слайд 2 (Pochodzenie nazwy) |
| 352:2023 | film kraje Armenia 3 | 352-2023__film-kraje-armenia-3.png | слайд 3 (Erywań) |
| 352:2103 | film kraje Armenia 4 | 352-2103__film-kraje-armenia-4.png | слайд 4 (Historia) |

Компоненты (страница componenty 497:4381), скриншоты не сохранял в screens/ (только просмотр): 252:694/695/696 (Component 132/133/134), 95:702 / 95:705 (Component 29/30).

Позиции на холсте: ряды по 4 состояния; x = -12451, -10867, -9283, -7699 (шаг 1584); Ukraina y=2656, Gruzja y=3774, Armenia y=4892. Стартовый: x=-14413, y=2656.

## 2. Раскладка и значения

### 2.1 Общее (все 13 фреймов, одинаково)
- Фон: Rectangle 21 0,0 1512x982, #17171B (переменная backgraund). Корневой фрейм fill белый, но перекрыт.
- Шапка: LOGO (instance, 288:921 Default, SVG) x45 y42 218x35. Меню: Component 2 "Art Project" x998 y45 145x35; Component 6 "Galeria" x1198 y45 96x35; Component 5 "Filmy" x1349 y45 69x35. Шрифт Murecho Bold 24, uppercase, white, line-height normal. Активный пункт "Filmy": подчёркнут Line 3 (vector) x1349 y85 w101, обводка ~3px (inset -1.5), white.
- Футер: Line 5 x0 y830 w1512 (белая, толщина ~4 при inset -2); внизу "FILMY" (instance 404:5252 Default) x25 y869 177x69, Rubik Bold 58 uppercase white (это плашка названия раздела); "GO BACK" (Component 194, 404:5124) x1243 y878 181.37x46: стрелка-влево (Component 191, SVG) слева + текст "go back" Murecho Bold 31.543 uppercase white. Ссылка Go back - вероятно на старт kraje/страницу фильмов (макет не говорит куда).
- Только на старте: Rectangle 46 (250:557) 0,806 1512x176 #17171B (подложка футера), Rectangle 50 (250:573) 49,198 350x494 без заливки (пустой), Line 3/Line 5 как выше.

### 2.2 Старт (249:520)
Секции: слева колонка с цитатой (x45..~404), справа ряд из 3 карточек стран.
- Цитата (249:544): x51 y236 w351.75 h419, Murecho Bold 36.507, white, uppercase, line-height normal (~44), перенос строк задан вручную (5 абзацев, см. раздел 3). Кавычки: «“» (250:555) x45 y174 и «”» (250:554) x356 y633, Syne Bold 110.536, цвет #DC0000 (токен "red text"), uppercase. Автор (250:574) "SIERGIEJ PARADŻANOW" центр x223.5 (x118 y716 211x58), Murecho Bold 19, center, white, uppercase.
- Три карточки (instances): 
  - Component 132 "GRUZJA" x424 y179 350.13x595
  - Component 133 "UKRAINA" x799 y174 348.13x600
  - Component 135 "ARMENIA" x1172 y178 349.13x595.82 (ВНИМАНИЕ: инстанс 135, не 134)
  Шаг по x ~375 (зазор между карточками ~25), карточки чуть разной высоты и сдвинуты по y (179/174/178) - ручная раскладка, не auto-layout. Третья карточка выходит за правый край (1172+349=1521 > 1512, обрезается на 9px) - на скриншоте Armenia срезана справа.
  Внутри карточки (на примере 132): подпись внизу (inset top 90.25%) Murecho Bold 19 center uppercase white; над ней фото 350 x ~513: фон-прямоугольник "Rectangle 42" (растр, object-cover), поверх чёрный оверлей rgba(0,0,0,0.4) и вырезанная фигура (IMG_9029 1, растр, смещена и увеличена: h108.5% w126.6% left -25.83%, обрезка по рамке). Верхний отступ фона 3.19% (~19px) - фигура "торчит" над фоном на ~19px сверху (видно на скриншоте). Радиус - нет (прямые углы).
- Ховер/активное: на самой странице вариантов нет (все три в "белом" состоянии), варианты есть в компонентах (см. 5).

### 2.3 Страна: слайдер (шаблон)
Единый механизм: фрейм Frame 12 (id различаются) x0 y35 1512x847, clip content (overflow-clip). Внутри - "лента" из 4 прямоугольников Rectangle 32..35 (1512x690, y77, #17171B) подряд по x: на состоянии N лента сдвинута на -(N-1)*1512 (0, -1512, -3024, -4536 для Rectangle 32). Т.е. состояние N = вся лента (тексты + коллаж-картинки) целиком сдвинута влево на 1512*(N-1); видим слайд N. Это и есть "слайд влево/вправо" с шагом ровно во всю ширину экрана; промежуточных кадров нет.
Каждый слайд (в координатах слайда, X = локальный x):
- Акцент-планка (Rectangle 30/36/37/38) белая 54x15, y129.
- Заголовок страны: Rubik Bold 58, white, uppercase, y155, line-height normal.
- Подзаголовок: Murecho Bold 24, white, uppercase, y249.
- Разделитель под подзаголовком: линия (Line 9/13/11/12) y302 белая ~4px (inset -2), ширина зависит от слайда: слайд1 598, слайд2 516, слайд3 548, слайд4 516.
- Основной текст: Cambay Regular 25, line-height 30, white, y327, ручные переносы (отдельные абзацы-строки), ширина блока: слайд1 598 (Gruzja 584), слайд2 542, слайд3 598, слайд4 606.
- Левый отступ текста внутри слайда меняется (текст едет вправо по слайдам): слайд1 X=45, слайд2 X=161, слайд3 X=294 (заголовок и планка при этом X=283), слайд4 X=439. Для слайда 3 заголовок/планка сдвинуты на 11px левее подзаголовка/текста (283 vs 294) - неточность макета (одинаково во всех трёх странах).
- Коллаж-картинки: растровые вырезки (PNG) крупные, перекрывают границы слайдов (см. 6). Они едут вместе с лентой (тот же шаг 1512), т.е. один сплошной коллаж на 4 слайда, часть элементов выступает за край и "подглядывает" в соседнем слайде (напр. на Ukraina 2 слева видно красный цветок из слайда 1, справа - цветок слайда 3).
- Вне ленты (поверх, неподвижны): стрелки Component 145 (влево) x45 y320 71x71 и Component 146 (вправо) x1396 y320 71x71 - см. 5. Шапка/футер выше.
- Только Gruzja: Rectangle 51 (x0 y793 1512x30 #17171B) - полоса поверх низа ленты (над футером), скрывает нижний выступ вырезок (коллажи '11 1' на y1002 уходят вниз за экран, а Frame 12 и так клипует - возможно страховка). Есть на всех 4 состояниях Gruzja.

Шаблон одинаков у трёх стран: структура Frame 12/Rectangle 32-35/планка/заголовок/подзаголовок/линия/текст/стрелки идентична; различается контент и набор картинок. Незначительные расхождения: ширина текста Gruzja-1 584 vs 598; у Armenia основной текст 1 и 3 слайда - один plain-text узел (без разбивки на абзацы) и подпись "Armenia 2/4" использует FontVariation CTGR 0/wdth 100 (Cambay variable).

## 3. Тексты (дословно)

### Старт
- 249:544 цитата (переносы как в макете, шрифт uppercase; исходный регистр):
  "Wszyscy wiedzą, / że mam trzy ojczyzny. Urodziłem się / w Gruzji, pracowałem / na Ukrainie i umrę / w Armenii."
  (на экране: ЗАГЛАВНЫМИ; визуальные переносы: «WSZYSCY WIEDZĄ, / ŻE MAM TRZY / OJCZYZNY. / URODZIŁEM SIĘ / W GRUZJI, / PRACOWAŁEM / NA UKRAINIE I UMRĘ / W ARMENII.»)
- 250:555 “  250:554 ”
- 250:574 SIERGIEJ PARADŻANOW
- Подписи карточек: GRUZJA (I252:700;252:670), UKRAINA (I252:707;252:676), ARMENIA (I252:714;252:682)
- Меню: Art Project / Galeria / Filmy; футер: FILMY, go back (рендер GO BACK).

### Ukraina (одинаков набор во всех 4 состояниях; видимый слайд = N)
Заголовок на всех слайдах: "ukraina" (рендер UKRAINA).
1. Подзаголовок 254:765 "Ukraińskie Karpaty". Текст 254:764: "*Cienie zapomnianych przodków*" (Cambay Italic) " to najsłynniejszy ukraiński film Siergieja Paradżanowa. Reżyser podziwiał twórczość Mychajło Kotsiubyńskiego, więc nie mógł zaniedbać wiarygodności filmowej adaptacji jego powieści. Dlatego też zdjęcia kręcono " / "w Kryworiwni, wiosce, w której ukraiński pisarz napisał swoje dzieło."
2. Подзаголовок 265:741 "Etnia karpat". Текст 265:739: "Karpaty to historyczny region we wschodniej Europie Środkowej, położony w ukraińskiej części tego systemu górskiego, sąsiadujący z Polską " / "i Rumunią. Jest domem dla trzech ukraińskich grup etnicznych: Hucułów, Bojków i Łemków. Górzysty teren pomógł zachować ich tożsamość kulturową. Karpaty słyną z bogactwa autentycznych rzemiosł i zawodów. Wyrabia się tu sery i chleb według oryginalnych receptur, produkuje tradycyjną odzież i instrumenty muzyczne."
3. Подзаголовок 260:782 "huculi". Текст 260:781: "Huculi, grupa etniczna zamieszkująca Karpaty, wyróżniają się wielowarstwową kulturą, unikalnymi, charakterystycznymi przedmiotami i instrumentami muzycznymi. Do najbardziej charakterystycznych przedmiotów należą instrumenty muzyczne: "trembita" - długa wierzbowa piszczałka oraz "huculska drymba" - drewniana lira, która potrafi przenieść słuchacza " / "w atmosferę karpackich ostępów."  (кавычки прямые ASCII)
4. Подзаголовок 265:560 "małanka". Текст 265:559: "Małanka to wesoły i kolorowy obrzęd obchodzony " / "na Ukrainie w ostatnią noc nowego roku, tradycyjnie 13 stycznia według kalendarza gregoriańskiego. Święto " / "to jest symbolem okresu przejściowego między Bożym Narodzeniem a świętem Trzech Króli. Jedną " / "z najbardziej charakterystycznych cech Malanki jest przebranie jej uczestników. Starają się oni ukryć swoją tożsamość za pomocą jaskrawych kostiumów, masek " / "i makijażu. Warto również zwrócić uwagę na wesoły folklor towarzyszący temu świętu oraz akompaniament muzyczny, od tradycyjnych instrumentów, takich jak lira czy fujarka, po muzykę współczesną."
(Строки "/" = границы абзацев-строк в макете, соответствуют ручным переносам "после предлога".)

### Gruzja (заголовок "gruzja"/"Gruzja" -> GRUZJA)
1. 288:595 "tyflis". 288:592: "Twórca ekranowej poezji, Siergiej Paradżanow, urodził się w mrocznych czasach, które zapoczątkowały erę ucisku, dyktatury i całkowitego odrzucenia sprzeciwu. Przyszły filmowiec światowej sławy urodził się 9 stycznia 1924 r. w mieście " / "o nazwie Tyflis (od 1936 r.Tbilisi) przy ulicy Kote Meskhi, w domu numer 7. Przez całe życie Siergiej Paradżanow wspominał swoje dzieciństwo " / "w wolnym, przedsowieckim Tyflisie. Paradżanow nosił się z zamiarem nakręcenia filmu *Spowiedź* (Cambay Italic) " / "o swoim dzieciństwie w domu przy ulicy Meskhi, " / "ale niestety nigdy nie udało mu się go zrealizować."
2. 288:615 "geografia". 288:618: "Gruzja położona jest na granicy Azji i Europy, na terenie tzw. Zakaukazia. Graniczy z Rosją, Azerbejdżanem, Turcją i Armenią. Na " / "zachodzie tereny państwa otaczają ciepłe wody Morza Czarnego.Stolicą państwa jest miasto Tbilisi – ogromne miasto, które zamieszkuje około 1,5 miliona osób. Najstarsze ślady osadnictwa z tego terenu pochodzą już sprzed " / "2 tysięcy lat, a dziś stanowi ważny ośrodek gospodarczy, edukacyjny i turystyczny. "
3. 288:598 "wojna". 288:597: "W nocy z 7 na 8 sierpnia 2008 roku wybuchła wojna rosyjsko-gruzińska. W trakcie działań wojennych rosyjskie wojska wtargnęły na kilkadziesiąt kilometrów w głąb gruzińskiego terytorium. " / "W wyniku wojny Tbilisi utraciło kontrolę nad Osetią Południową i Abchazją, a Moskwa zablokowała Gruzinom możliwość przystąpienia do NATO. " / "Obecnie Federacja Rosyjska kontynuuje okupację Abchazji i Osetii Południowej, które są niepodzielnymi regionami Gruzji, ignorując podstawowe normy " / "i zasady prawa międzynarodowego"  (без точки в конце)
4. 288:596 "supra". 288:593: "Supra, czyli uczta to centrum życia towarzyskiego Gruzinów. Tradycja wspólnych biesiad obrosła przez wieki bogatym rytuałem. Przy suto zastawionym stole rozmawia się o rodzinie, sztuce, polityce, religii, życiu " / "i śmierci. Jest to czas umacniania więzi miedzy członkami rodziny, przyjaciółmi i współpracownikami. Zamiłowanie narodu gruzińskiego do biesiad i pogodny stosunek do życia zrodziły [ссылка, подчёркнуто: "piękną legendę o powstaniu Gruzji" -> http://www.kaukaz.pl/gruzja/kultura_tradycje/mity_legendy/mity_i_legendy.php, target _blank] . Nie ma uczty bez toastów a toastów bez tamady. Można go określić jako przewodnika stołu czy wodzireja. Rolą tamady jest dbanie o porządek podczas biesiady."
   ВАЖНО: на скриншоте Gruzja 4 подчёркивания у "piękną legendę o powstaniu Gruzji" НЕ видно (в design_context оно есть как гиперссылка) - проверить вживую.

### Armenia (заголовок "Armenia" -> ARMENIA)
1. 309:2038 "sajat nowa". 309:2035: "W Armenii Sajat-Nowa jest uważany za wielkiego poetę, który wniósł znaczący wkład w ormiańską poezję i muzykę swojego stulecia. Chociaż całe życie żył w głęboko religijnym społeczeństwie, jego prace są w większości świeckie i pełne romantycznego ekspresjonizmu. Pseudonim Sajat-Nowa doczekał się kilku interpretacji. Jedna wersja brzmi imię jako „Pan Pieśni” (z arabskiego sayyid i perskiej nava) lub „Król Pieśni”" (польские кавычки „ ”, без точки в конце, "brzmi imię" - как в макете)
2. 309:2058 "Pochodzenie nazwy". 309:2061: "Nazwa Armenii używana w niemal wszystkich językach pochodzi od perskich nazw Armanestân i Arman znalezionych  " / "w staroperskich inskrypcjach. Nazwy te z kolei pochodzą od nazwy jednej z graniczących  " / "z Persją prowincji państwa Urartu, leżącej na terenie historycznych ormiańskich ziem, która  " / "z kolei została tak nazwana z uwagi na fakt,  " / "iż znaczną część jej populacji w owym czasie  " / "(ok. poł I tys. p.n.e.) stanowili Aramejczycy." (двойные пробелы в конце абзацев в исходнике)
3. 309:2041 "erywań". 309:2040: "Największym miastem i jednocześnie stolicą Armenii jest Erywań, miasto o ponad 2800-letniej historii. Erywań nazywany jest Paryżem wschodu. Jest to czyste, uporządkowane, bardzo ładne miasto, z masą uroczych knajpek, kafejek i restauracji. Mieszka tam ponad 1/3 mieszkańców kraju (1,2 mln osób). W stolicy widać i czuć zachodnie wpływy."
4. 309:2039 "Historia". 309:2036: "Historia Armenii swój początek ma już między XI a VII w p.n.e, kiedy to na terenach współczesnych kraju istniało potężne królestwo Urartu. " / "Armenia zajmowana była przez Persów, Aleksandra Wielkiego i pod władzą dowódców jego " / "armii - diadochów - pozostawała aż do 190 r p.n.e. Losy Armenii uzależnione były od jej położenia geograficznego, bowiem leżała w bardzo pożądanym przez sąsiadów miejscu. Zajęcie tego kraju przez Turków czy Persów dawało tym krajom możliwość zamknięcia swych mocarstw zaporą Kaukazu od północy, Morzem Kaspijskim od wschodu i Morzem Czarnym od zachodu. "

(Подзаголовки отображаются uppercase: UKRAIŃSKIE KARPATY, ETNIA KARPAT, HUCULI, MAŁANKA, TYFLIS, GEOGRAFIA, WOJNA, SUPRA, SAJAT NOWA, POCHODZENIE NAZWY, ERYWAŃ, HISTORIA.)

## 4. Дельта между состояниями

Во всех трёх странах идентична: переход N -> N+1 = сдвиг ВСЕЙ ленты внутри Frame 12 на -1512 по x (все тексты, линии, планки, заголовки, картинки-вырезки, Rectangle 32-35). Ни один слой не появляется/не исчезает в видимой логике (все 4 слайда присутствуют в каждом из 4 состояний, просто на других x). Исключения - стрелки и мелкие правки картинок (ниже). Шапка/логотип/футер/Line 5/Line 3 не двигаются.

Стрелки (поверх ленты, не двигаются):
- Состояние 1: есть только правая стрелка Component 146 (x1396 y320). Левой нет (Component 145 отсутствует в слое - на Ukraina 1, Gruzja 1, Armenia 1).
- Состояния 2 и 3: обе: Component 145 (x45 y320, влево) и Component 146 (x1396 y320, вправо), обе активные (чёрный круг 71x71, белая стрелка).
- Состояние 4: левая активна; правая - disabled-вариант Component 146 (id: Ukraina 491:4955, Gruzja 491:4951, Armenia 491:4947): серая стрелка #8A92A0 на том же чёрном круге (виден меньший контраст). На Armenia 2 и Armenia 4 правая стрелка стоит на x1379 y319 (а не 1396,320) - сдвиг -17/-1 px, вероятно случайный дефект макета.
- Круг чёрный #000000 с белой стрелкой (SVG целиком, один слой), вертикально по центру области коллажа (y320..391).
«+» в углах: НЕТ ни на одном из этих фреймов.

Точечные расхождения между состояниями (кроме общего сдвига; дельта в локальных слайд-координатах):
- Ukraina 2->3: 238ef68c... (264:552 -> 265:887): 616x616 @ (3883,37) -> 576x576 @ (3923,77); lvivyanka (260:785 -> 265:891): 947x782 @ (3905,278) -> 921x761 @ (3927,272); дальше (Ukraina 4) остаётся. Это подгонка картинок на слайде 4 (нормализация размеров), не смена контента.
- Ukraina 3->4: IMG_9054 1 (262:548 -> 265:946): 892x649 @ (5363,0) -> 850x618 @ (5367,38).
- Gruzja 1->2: "3 1" (301:1745 -> 305:1883) 534x741 -> 525x655 (в 1 - обёртка с поворотом -5.84deg, в 2+ без).
- Armenia: "7 2" x 3970 -> 3967 (3 px, только в состоянии 2).
- Ukraina 3 (265:856): лишний инстанс Component 29 (265:864) x1293 y898 19.19x13.81 (стрелка из компонента 29) рядом с "GO BACK" - мусор макета, не скрыт; в других состояниях и сериях нет (см. вопросы).
Все остальные узлы с учётом сдвига -1512*(N-1) совпадают точно.

Вывод по механике: слайдер/карусель-слайд с шагом 1512px, 4 слайда на страну, без бесконечного цикла (на 1 нет "влево", на 4 "вправо" disabled). Анимация (easing/длительность) в макете не задана. Текст на каждом следующем слайде позиционирован правее (45 -> 161 -> 294 -> 439), т.е. на 1 слайде заголовок слева у края, дальше смещается к центру, чтобы оставить на экране слева кусок предыдущего коллажа (виден на 2-4).

## 5. Интерактивные элементы
- Стрелки Component 145/146 (71x71, SVG-целиком): влево/вправо перелистывание. Варианты: активная (чёрный круг, белая стрелка), disabled правая (серая #8A92A0 стрелка, существует на слайде 4). Disabled-варианта левой нет (на слайде 1 стрелки просто нет).
- Карточки стран на старте: клик, вероятно, ведёт на слайд 1 страны (Gruzja 288:572, Ukraina 252:721, Armenia 309:2016). Prototype reactions недоступны - предполагаю.
- Component 132 / 133 / 134 (252:694 / 252:695 / 252:696; страница componenty): каждый - component set из 2 вариантов, лежащих вертикально (пара). Property 1:
  - 132 (Gruzja): "Component 126" (252:688, 350x595 @20,20) и "Component 131" (252:693, 350.13x595 @20,639).
  - 133 (Ukraina): "Component 127" (252:689, 348x600) и "Component 130" (252:692, 348.13x600).
  - 134 (Armenia): "Component 128" (252:690, 349x595.82) и "Component 129" (252:691, 349.13x595.82).
  Разница вариантов (проверено на 132; 133/134 визуально по тому же принципу - детально не снимал): 
  - Вариант 126/127/128 ("тёмный", выше на листе): подпись КРАСНАЯ #DC0000; на фоне нет фотографии-подложки (Rectangle 42 нет; только полупрозрачный чёрный оверлей rgba(0,0,0,0.4) на пустой тёмной плитке), видна лишь вырезанная фигура (IMG_9029). Визуально: тёмная плитка, красная подпись.
  - Вариант 131/130/129 ("полный", ниже): подпись БЕЛАЯ; есть фон-фото (Rectangle 42 растр, object-cover), поверх оверлей 40% чёрного, плюс фигура поверх. Именно это состояние используется на стартовой странице (подписи белые, фото видно).
  Вывод: по логике пары - default = белый/с фото (131 и т.д.), hover/active = красная подпись и без фонового фото (126). Какая пара роль default/hover - вывод по использованию на старте, подтверждения нет (см. вопросы). Старт использует инстансы 132, 133 и 135 (не 134).
- Component 29 / Component 30 (95:702, 95:705; frame 60x93.77, стрелки 19.19x13.81 из SVG-векторов): НЕ вверх/вниз, а ЛЕВАЯ (29) и ПРАВАЯ (30) стрелка; каждая - component set из 2 вариантов, лежащих вертикально: верхний (y24) - чёрная стрелка; нижний (y67) - серая (disabled/неактивная). 29: Vector 1 (чёрная влево, 95:698) / Vector 3 (серая влево, 95:699). 30: Vector 2 (95:700, y24) чёрная вправо / Vector 4 (95:701, y67) серая вправо. Это ранний вариант стрелок (без круга); в слайдах kraje применены более новые 71x71 Component 145/146 с кругом. Component 29 остался единожды на Ukraina 3 (265:864).
- Меню: "Filmy" активен - подчёркнут линией Line 3 (101 px, белая). Остальные пункты без подчёркивания.
- Go back (Component 194): стрелка + "GO BACK", вариантов нет в этих фреймах.

## 6. Ассеты

Растр = PNG на localhost:3845, вектор = SVG. Все картинки в слайдах - вырезки-коллажи с прозрачностью, часть с object-cover/object-bottom, повороты/зеркала через обёртки. Координаты - состояние 1 (локальные в ленте), Frame 12 (0,35).

### Старт
| node | имя | тип | размер | примечание |
|---|---|---|---|---|
| I252:700;252:672 / 252:675 | Rectangle 42 + IMG_9029 1 (Gruzja) | растр x2 | 350x~513 карточка | фон + вырезка, оверлей 40% чёрный |
| I252:707;252:678 / 252:681 | Rectangle 43 + IMG_9030 1 (Ukraina) | растр x2 | 348x~518 | аналогично |
| I252:714;252:684 / 252:687 | Rectangle 44 + IMG_9033 1 (Armenia) | растр x2 | 349x~514 | аналогично |
| 288:979 LOGO | Property 1=Default | вектор SVG | 218x35 | |
| Line 3 / Line 5 | | вектор | 101 / 1512 | белые линии |

### Ukraina (локальные координаты в ленте; расположение слайда: 1 = 0..1512, 2 = 1512.., 3 = 3024.., 4 = 4536..)
| node (сост.1) | имя | размер | x,y (лента) | особенности |
|---|---|---|---|---|
| 258:776 | IMG_9037 1 | 1099x717 | 696,50 | слайд1/2 стык; crop h111% top-11% |
| 258:777 | IMG_9038 1 | 618x358 | 587,409 | crop h228% left-33% top-61% (дом) |
| 264:549 | 28d1c548-... 1 | 581x581 | 1106,72 | object-cover (цветок) |
| 265:747 | 45253dd5-... 1 | 786x786 | 3318,-19 (в design_context 2532) | зеркало по горизонтали (scale-y -1 + rotate 180) |
| 258:778 | IMG_9042 1 | 554x741 | 2247,26 | crop w206% |
| 260:780 | IMG_9046 1 | 795x721 | 2602,46 | crop w147% left-38% |
| 264:552 | 238ef68c-... 1 | 616x616 | 3883,37 | позже 576x576 (сост.3-4) |
| 260:785 | lvivyanka_630x465_1_0 1 | 947x782 (рамка), внутр. 822.6x589 | 3905,278 | повёрнут -15deg |
| 260:787 | IMG_9052 1 | 657x733 | 4363,34 | crop w173% |
| 262:548 | IMG_9054 1 | 892x649 | 5363,0 | позже 850x618 @5367,38 (сост.4) |
Все растровые PNG, без масок кроме обрезки (overflow-hidden по рамке).

### Gruzja
| node | имя | размер | x,y | особенности |
|---|---|---|---|---|
| 300:1744 | 2 39 | 919x640 | 691,127 | object-cover (фон Tyflis) |
| 301:1752 | 8 1 | 681x716 (рамка), 635x672 | 1085,77 | поворот 4.09deg |
| 300:1743 | 1 51989 | 789x1052 | 646,-285 | выступает над лентой |
| 300:1745 | 3 1 | 534x741 (рамка), 465x698 | 1217,162 | поворот -5.84deg (сост.1); в сост.2+ 525x655 без поворота |
| 300:1746 | 4 86420 | 844x682 | 2339,85 | crop h165% |
| 301:1753 | 7 1 | 825x652 | 2354,115 | object-bottom |
| 300:1747 | 5 889186 | 480x640 | 2805,129 | |
| 301:1750 | 9 1 | 497x673 | 2082,94 | |
| 302:1755 | 11 1 | 1281x1142 (рамка), 1077x697 | 3847,-140 | поворот -150deg |
| 302:1756 | 12 1 | 776x667 | 3943,100 | |
| 301:1754 | 10 1 | 1159x690 | 3591,77 | crop h126% top-26% |
| 305:1759 | 14 1 | 559x678 | 5489,89 | |
| 304:1758 | 13 1 | 382x678 | 5581,89 | crop w343% |
| 305:1760 | Rectangle 51 | 1512x30 | 0,793 (не в ленте) | #17171B полоса |

### Armenia
| node | имя | размер | x,y | особенности |
|---|---|---|---|---|
| 315:2099 | 3 2 | 716x791 | 796,-24 | |
| 315:2097 | 1 51990 | 525x654 | 684,113 | |
| 315:2101 | 4 86421 | 738x790 (рамка) | 1009,59 | зеркало + поворот -166.49deg |
| 315:2098 | 2 40 | 707x639 | 2277,129 | |
| 321:2104 | 5 889187 | 555x769 | 2707,22 | зеркало + rotate 180 |
| 323:2106 | 7 2 | 463x676 | 3970,91 | |
| 323:2105 | 6 1 | 488x732 | 4202,35 | |
| 352:1942 | 9 2 | 589x612 | 4412,155 | object-bottom |
| 351:1941 | 8 2 | 489x490 | 5559,290 | crop |
Общие вектор: стрелки Component 145/146 (SVG 71x71; disabled-вариант 146 - отдельный SVG), Go back-стрелка Component 191, Logo, Line*.
Примечание: названия "1 51989", "2 39" и т.п. - исходные имена файлов вырезок; повторяются на 4 состояниях с теми же размерами (кроме списка в разделе 4).

## 7. Скрытые слои
В 13 фреймах hidden="true" слоёв нет (в page1.xml 11 скрытых слоёв вообще, ни одного здесь). Пустые/служебные: Rectangle 50 (250:573) на старте - прямоугольник 350x494 без заливки (пустой, вероятно остаток от плейсхолдера под цитату). Ukraina 3: ненужный Component 29 (265:864). Gruzja: Rectangle 51 в каждом состоянии.

## 8. Вопросы/неясности
1. Состояния карточек стран (default/hover): 131-вариант (белая подпись, фото) используется на старте; красный 126 - предположительно hover. Макет не фиксирует, какой из них ховер, и нет анимации перехода. Подтвердить.
2. На старте нет ховера у Armenia: используется Component 135, а в компонентах пара называется Component 134 (252:696). Это разные узлы? Проверить, не ссылается ли 135 на 134.
3. Куда ведёт Go back и по клику на карточку страны - слайд 1 соответствующей страны? Prototype недоступен.
4. Тип перехода между состояниями слайдера: жёсткий сдвиг ленты на 1512 (в макете нет easing/длительности). Нужно решение: slide-анимация, длительность.
5. Правая стрелка на Armenia 2 и Armenia 4 сдвинута (1379,319 vs 1396,320) - ошибка макета или намеренно?
6. Component 29 (265:864) на Ukraina 3 - лишний слой? (скорее всего да).
7. Гиперссылка "piękną legendę o powstaniu Gruzji" (Gruzja, слайд 4): в design_context ссылка (underline + href kaukaz.pl), на скриншоте подчёркивания нет - делать ли ссылку и стилизацию?
8. Ширина текстовых блоков и позиции слайдов 3 (283 vs 294) - расхождение в 11 px между заголовком и текстом: оставлять как в макете или выровнять?
9. Левая стрелка на слайде 1 отсутствует (нет слоя), нет disabled-версии влево: достаточно скрыть; а правая на слайде 4 - серая, но на чёрном круге (не скрывается).
10. Цитата на старте: часть абзаца в макете имеет ручные переносы после "się" и "pracowałem" - сохранять? Визуально цитата в 5 абзацев с принудительными breaks.
11. Старт: третья карточка (Armenia) обрезана краем экрана (x до 1521) - намеренно (намёк на горизонтальный скролл) или ошибка?
12. Шрифты: Rubik Bold (заголовки, FILMY), Murecho Bold (меню, подзаголовки, цитата, Go back), Cambay Regular/Italic (основной текст), Syne Bold (кавычки). Шрифты из Google (подтвердить наличие Murecho/Cambay/Rubik/Syne в проекте).
