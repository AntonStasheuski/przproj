# Серия FAKTY: выбор фильма + горизонтальный аккордеон «фактов» (5 панелей 01–05)

Источник: Figma Desktop, Page 1, дерево из page1.xml + get_design_context (ANDRIJESZ 2, ANDRIJESZ 1 Frame 6, CZP 2 Frame 6, LoTS 3 Frame 6) + скриншоты всех 32 фреймов. Все экраны 1512x982. Скриншоты сохранены в /Users/anton/Documents/projects/przproj/figma/screens/. В конце сессии Figma MCP упёрся в rate limit, поэтому стили плашек с названиями фильмов и вариантов стрелок на экранах выбора не сняты (см. вопросы).

## 1. Фреймы

Роль «шаг N» = N-я панель раскрыта. Все кадры 1-5 одного фильма имеют одно и то же дерево, отличается только порядок/смещение панелей и тексты.

| id | имя | размер | скриншот (в screens/) | роль |
|---|---|---|---|---|
| 378:2705 | film fakty 1 | 1512x982 | 378-2705__film-fakty-1.png | старт: карусель постеров, видны Andrijesz / Cienie… / Kijowskie freski |
| 378:2732 | film fakty 2 | 1512x982 | 378-2732__film-fakty-2.png | та же карусель, сдвинутая: Sajat Nowa / Legenda o TS / Aszik Kerib |
| 211:227 | film fakty ANDRIJESZ 1 | 1512x982 | 211-227__film-fakty-andrijesz-1.png | шаг 1 (панель 01 раскрыта = «титул» фильма) |
| 217:278 | ANDRIJESZ 2 | 1512x982 | 217-278__film-fakty-andrijesz-2.png | шаг 2 |
| 217:317 | ANDRIJESZ 3 | 1512x982 | 217-317__film-fakty-andrijesz-3.png | шаг 3 |
| 217:396 | ANDRIJESZ 4 | 1512x982 | 217-396__film-fakty-andrijesz-4.png | шаг 4 |
| 217:448 | ANDRIJESZ 5 | 1512x982 | 217-448__film-fakty-andrijesz-5.png | шаг 5 |
| 235:631 | CZP 1 | 1512x982 | 235-631__film-fakty-czp-1.png | шаг 1 |
| 235:677 | CZP 2 | 1512x982 | 235-677__film-fakty-czp-2.png | шаг 2 |
| 235:1230 | CZP 3 | 1512x982 | 235-1230__film-fakty-czp-3.png | шаг 3 |
| 235:1288 | CZP 4 | 1512x982 | 235-1288__film-fakty-czp-4.png | шаг 4 |
| 235:1349 | CZP 5 | 1512x982 | 235-1349__film-fakty-czp-5.png | шаг 5 |
| 235:1419 | KF 1 | 1512x982 | 235-1419__film-fakty-kf-1.png | шаг 1 |
| 237:1550 | KF 2 | 1512x982 | 237-1550__film-fakty-kf-2.png | шаг 2 |
| 237:1606 | KF 3 | 1512x982 | 237-1606__film-fakty-kf-3.png | шаг 3 |
| 237:1664 | KF 4 | 1512x982 | 237-1664__film-fakty-kf-4.png | шаг 4 |
| 240:1726 | KF 5 | 1512x982 | 240-1726__film-fakty-kf-5.png | шаг 5 |
| 240:1863 | SN 1 | 1512x982 | 240-1863__film-fakty-sn-1.png | шаг 1 |
| 241:1980 | SN 2 | 1512x982 | 241-1980__film-fakty-sn-2.png | шаг 2 |
| 243:2052 | SN 3 | 1512x982 | 243-2052__film-fakty-sn-3.png | шаг 3 |
| 243:2112 | SN 4 | 1512x982 | 243-2112__film-fakty-sn-4.png | шаг 4 |
| 243:2174 | SN 5 | 1512x982 | 243-2174__film-fakty-sn-5.png | шаг 5 |
| 244:2241 | LoTS 1 | 1512x982 | 244-2241__film-fakty-lots-1.png | шаг 1 |
| 245:2319 | LoTS 2 | 1512x982 | 245-2319__film-fakty-lots-2.png | шаг 2 |
| 245:2374 | LoTS 3 | 1512x982 | 245-2374__film-fakty-lots-3.png | шаг 3 |
| 245:2432 | LoTS 4 | 1512x982 | 245-2432__film-fakty-lots-4.png | шаг 4 |
| 245:2493 | LoTS 5 | 1512x982 | 245-2493__film-fakty-lots-5.png | шаг 5 |
| 245:2568 | AK 1 | 1512x982 | 245-2568__film-fakty-ak-1.png | шаг 1 |
| 247:2644 | AK 2 | 1512x982 | 247-2644__film-fakty-ak-2.png | шаг 2 |
| 247:2699 | AK 3 | 1512x982 | 247-2699__film-fakty-ak-3.png | шаг 3 |
| 248:2758 | AK 4 | 1512x982 | 248-2758__film-fakty-ak-4.png | шаг 4 |
| 248:2819 | AK 5 | 1512x982 | 248-2819__film-fakty-ak-5.png | шаг 5 |

Полные имена: «film fakty <ФИЛЬМ> N» (ANDRIJESZ, CZP, KF, SN, LoTS, AK). Важно: «film fakty 1/2» — это НЕ шаги аккордеона и не его старт, а экран «FILMY» (выбор фильма) из двух состояний карусели постеров. Старт аккордеона каждого фильма — его кадр N=1.

## 2. Раскладка и значения

### 2.1 Общий каркас всех 30 кадров аккордеона (идентичен)

Фон: Rectangle 21 (0,0,1512x982) = #17171B (переменная backgraund).
- Шапка: LOGO (instance, 45,42, 218x35, SVG); nav Murecho Bold 24px, uppercase, белый, leading normal: «ART PROJECT» Component 2 (998,45, 145x35), «GALERIA» Component 6 (1198,45, 96x35), «FILMY» Component 5 (1349,45, 69x35) с подчёркиванием Line 3 (1349,85, 101 wide, обводка ~3px по inset -1.5px; активный пункт).
- Аккордеон: «Frame 6» (clip, overflow-clip) x=26, y=137, w=1459 (в кадрах бывает 1456/1457/1458/1460/1463 из-за неаккуратного ручного оформления; эталон 847+4x153=1459), h=603. Правый край 26+1459=1485, справа до края экрана 27px.
- Горизонтальная линия Line 5 (0,830, w=1512), SVG, белая тонкая.
- Заголовок раздела «FILMY» (instance 25,869, 177x69): Rubik Bold 58px, uppercase, белый.
- «GO BACK» Component 196 (instance 1243,878, 181.37x46): Murecho Bold 31.543px, uppercase, белый + иконка-стрелка Component 191 слева (SVG); см. Component 194 / 195 в componenty (404:5126).
- Стрелки навигации: Component 145 («влево», instance 45,320, 71x71) и Component 146 («вправо», instance 1396,320, 71x71). Чёрный круг 71 с белой стрелкой (по скриншоту). Они лежат поверх аккордеона (left: над раскрытой панелью; right: над последней узкой полосой).
- Цвета: white #FFFFFF, gray #8A92A0 (используется только в неиспользуемом «приглушённом» варианте, см. п.7), фон карточек-оверлеев rgba(35,35,40,0.63) (то же, п.7).

### 2.2 Механика аккордеона (по геометрии)

Содержимое Frame 6 — ряд из 10 панелей (5 «живых» + 5 дубликатов за правым краем). Окно (clip) показывает только первые 847+4*153=1459 px.
- Раскрытая панель: x=0 внутри Frame 6, y=3, 847x600, overflow-clip. Радиусов и обводок нет, тени нет.
- Свёрнутые: 4 штуки, каждая 153x600, y=3, x = 847, 1000, 1153, 1306 (gap = 0; шаг ровно 153). В кадрах ANDRIJESZ 2/3/4 есть ручные сдвиги: раскрытая панель смещена на -3/-2 px (напр. следующая начинается с x=844 / 845 / 997), т.е. в макете плавает 1–3px; в эталон брать 847/153/gap 0.
- Нет вертикальной «развёртки» и нет вертикального текста: внутри свёрнутой панели ТОЛЬКО картинка-срез и номер 01–05. Номер: Rubik Bold 58px, uppercase, белый, позиция внутри полосы x=49–59 (зависит от ширины цифр: 01→59, 02/03→50, 04→49, 05→51), y=516 (нижняя часть, низ строки ~585 от верха панели 600). Текстовый блок 69/78/79 px шириной, т.е. номер центрирован примерно на x≈89–94 при ширине полосы 153 (смещён вправо от центра 76.5; в макете выровнен вручную, а не auto-layout).
- Картинка панели: прямоугольник 847x600 (имя IMG_… 1, fill-image, object-bottom/cover). В свёрнутой версии та же картинка 847x600 вставлена со сдвигом x=-N и обрезана до 153px: каждая полоса показывает «срез» своего кадра. Смещения ANDRIJESZ: 02 → -370, 03 → -181, 04 → -624, 05 → -344, 01 → -334. CZP: 01 → -500, 02 → -397, 03 → -223, 04 → -347, 05 → -460. LoTS: 04 → -347, 05 → -347, 01 → -154, 02 → -287 (картинка там слегка масштабирована: left -2.97%, width 106.53%), 03 → -347. Срез одной и той же картинки в свёрнутом виде = часть раскрытой картинки (разные кусочки). Для сайта: фон панели = одна картинка, background-position подбирается по этим смещениям (значения сняты, см. таблицу активов).
- Раскрытая панель: фон — картинка 847x600 (без сдвига); поверх: заголовок, плашка-акцент (белый прямоугольник), текст, номер.
- Раскрытая панель, содержимое (кадры 2–5 одного фильма, шаблон):
  - Заголовок (год или слово): x=25, y=25, Rubik Bold 58px, uppercase, белый, leading normal (высота 69), nowrap. Ширина 142–145 для года, 197–734 для слова.
  - Акцент-плашка: белый прямоугольник «Rectangle 16» 54x15 (в LoTS/SN иногда 56x14 / 54x16), x=25 (в LoTS 4/5 и… x=19), y = (y текста) − 30; радиус 0.
  - Текст: Murecho Bold 24px, leading 30px, белый, левое выравнивание, переносы заданы вручную (абзацы p / длина строки подобрана): x=25 (в LoTS 4,5: x=19), y = 575 − высота блока (нижняя граница ≈ 570–575 в системе панели), ширина 540 / 556 / 566 / 579 / 625 / 627 / 640 / 650 (подбирается под длину текста). Нижняя граница блока ≈ 570–578, номер раскрытой панели начинается с y=516.
  - Номер раскрытой панели: Rubik Bold 58px, uppercase, белый, x=743–745, y=516 (правый край ≈ 822 = 847 − 25).
  - Плашка-акцент в кадре 1: y=15 (над заголовком), заголовок y=41 (ниже на 26px) и размер 58px; 1–2 строки (CZP: 2 строки, высота 138; LoTS: 2 строки, 138).
- Затемнение: в LoTS 3 (245:2374) поверх картинки панели лежит «Rectangle 94» (id 444:5913) -5,-2, 852x602, rgba(35,35,40,0.8), blend mode multiply; сама картинка (151988 1) имеет blend mode lighten. Это единственное затемнение раскрытой панели в серии. В остальных кадрах фон не затемнён: читаемость текста держится на самих кадрах фильмов.

### 2.3 Карусель: порядок панелей (зацикленная)

Активная панель всегда стоит на x=0. Остальные идут по кругу следом. Для шага k раскрыта панель 0k; справа от неё: k+1, …, 05, 01, … (для шага 5: 01, 02, 03, 04). Это видно по номерам на скриншотах: шаг 2 → 02 | 03 04 05 01; шаг 3 → 03 | 04 05 01 02; шаг 4 → 04 | 05 01 02 03; шаг 5 → 05 | 01 02 03 04. Таким образом «следующий» не просто раскрывает соседа, а сдвигает весь ряд влево на ширину ушедшей раскрытой панели (847) и ставит её (в свёрнутом виде) в конец.
- Реализация в макете: в каждом кадре внутри Frame 6 находятся ВСЕ панели ряда: слева за краем (x<0, off) стоят уже пройденные раскрытые панели (напр. в ANDRIJESZ 2: Frame 1 на x=-847, шаг 5: Frame 1 на x=-3388, Frame 2 на -2541, Frame 3 на -1694, Frame 4 на -847), справа — дубликаты свёрнутых «хвостов» за пределами окна (x от 1456 до 2200) для плавного «закручивания» при переходе. Предположительно (вывод из геометрии, самой анимации в макете нет): ряд на ширину раскрытой панели (847) уезжает влево, новая раскрывается, а предыдущая уходит в хвост уже в узком виде.
- Видимое окно = первые 1459px ряда. Узкие полосы справа в видимой части: для шага 1: 02,03,04,05; шаг 2: 03,04,05,01 (01 — дубль «Frame 6»); и т. д.

### 2.4 Различия по шагу между кадрами (шаблон одинаков)

- Кадр 1: раскрыта панель 01, заголовок = НАЗВАНИЕ ФИЛЬМА (58px, uppercase), под ним нет текста. Номер «01» справа внизу (x=753).
- Кадры 2–5: раскрыта панель 02–05; сверху заголовок (год или слово), в нижней части плашка + текст.
- Заголовки: панель 02 у всех шести фильмов = год (1952/1962/1966/1968/1984/1988). Панели 03–05 — словесные заголовки, и только у ANDRIJESZ панель 03 тоже год (1954); подробный список в разделе 3. Слой заголовка пишется как введено («fabula», «Fabula», «wyznanie» и т. д.), на экране всегда uppercase (text-transform: uppercase).

## 3. Тексты (дословно из слоёв, польский)

Заголовок и текст берутся из слоёв (имя текстового слоя = его содержимое). Заголовок всегда выводится uppercase. Шаг 1 каждого фильма = только название фильма (текст отсутствует). Тексты переносятся вручную (в слоях встречаются абзацы), здесь даны единой строкой.

Названия фильмов на экране аккордеона (кадр 1): ANDRIJESZ (слой «ANDRIJESZ»), «cienie zapomnianych przodków» (CZP, 2 строки: «cienie zapomnianych / przodków»), «Kijowskie freski» (KF), «Sajat-Nowa» (SN), «Legenda o Twierdzy Suramskiej» (LoTS, 2 строки: «Legenda o Twierdzy / Suramskiej»), «Aszik Kerib» (AK). Заголовок раздела внизу везде «FILMY».

#### ANDRIJESZ

| # | кадр | заголовок (слой; рендерится UPPERCASE) | id | текст (слой, дословно) | id |
|---|---|---|---|---|---|
| 1 | 211:227 | ANDRIJESZ | 211:253 | — | — |
| 2 | 217:278 | 1952 | 217:354 | Po śmierci pierwszej żony Paradżanow wyjechał z Moskwy do Tbilisi, gdzie doświadczył bólu i szoku po stracie, a następnie przeniósł się do Mołdawii, gdzie nakręcił swój dyplomowy film krótkometrażowy dla WGIK o pasterzu Andrijesze, oparty na bajce o tym samym tytule autorstwa Emiliana Bukowa. | 211:255 |
| 3 | 217:317 | 1954 | 217:387 | Swój pierwszy film fabularny “Andrijesz” reżyser nakręcił w 1954 r.. Wcześniej Paradżanow robił tylko filmy krótkometrażowe, a “Andrijesz” był początkowo tylko projektem dyplomowym. Niestety, wersja nakręcona na uniwersytecie zaginęła, ale zachował się film pełnometrażowy. | 217:356 |
| 4 | 217:396 | fabula | 217:506 | Film opowiada o bohaterze mołdawskich bajek - pasterzu Andrijesze, który marzył o zostaniu rycerzem, o magicznym gwizdku, który kiedyś podarował mu bajkowy bogatyr Wainowan, oraz o jego walce ze złym czarnoksiężnikiem Czarnym Wirem, który nienawidzi wszystkich żywych istot. | 217:504 |
| 5 | 217:448 | wyznanie | 217:510 | “Andrijesz” nie był jednak bliski przeciętnemu widzowi w republikach. Opowieść o mołdawskim chłopcu nie przykuwała uwagi, w przeciwieństwie do innych bajek, które były bardziej zrozumiałe dla radzieckich dzieci. Choć już w pierwszym filmie Paradżanowa można zauważyć jego niestandardowe rozwiązania oraz zabawę kontrastami i kolorem.m, który nienawidzi wszystkich żywych istot. | 217:508 |

#### CZP (Cienie zapomnianych przodków)

| # | кадр | заголовок (слой; рендерится UPPERCASE) | id | текст (слой, дословно) | id |
|---|---|---|---|---|---|
| 1 | 235:631 | cienie zapomnianych przodków | 235:646 | — | — |
| 2 | 235:677 | 1962 | 235:1229 | Jesienią 1962 r. Kijowskie Studio Filmowe postanowiło sfilmować “Cienie zapomnianych przodków” Mychajło Koсiubynskiego z okazji stulecia urodzin pisarza. W klasycznej historii ukraińskiego Romea i Julii nikt nie brał pod uwagę antyradzieckiego podtekstu. | 235:1227 |
| 3 | 235:1230 | Ormianin | 235:1287 | Paradżanow został mianowany reżyserem “Cieni zapomnianych przodków”, mimo że przywódcy partii uważali, że ormiański reżyser nie będzie w stanie stworzyć filmu, który rozbudzi świadomość narodową Ukraińców. Historia jednak pokazała, że radziecka kuratela popełniła błąd, mianując reżysera, który faktycznie przyniósł zmiany w ukraińskiej historii i kulturze. | 235:1285 |
| 4 | 235:1288 | Mychajło Kociubynski | 235:1348 | Mychajło Kociubynski napisał swoją powieść w 1911 roku pod wrażeniem podróży w Karpaty. Akcja tego neoromantycznego dramatu rozgrywa się w huculskiej wiosce w pobliżu rzeki Czeremosz. Głównymi bohaterami utworu są Iwan i Mariczka, dzieci, których rodziny, podobnie jak szekspirowscy Montecchi i Capuletich, od dawna są ze sobą skłócone. | 235:1346 |
| 5 | 235:1349 | 1965 | 235:1412 | 4 września 1965 r. na premierze filmu “Cienie zapomnianych przodków” doszło do masowych protestów ukraińskiej inteligencji dysydenckiej. Tego dnia w totalitarnym ZSRR powstało ukraińskie społeczeństwo obywatelskie. Każdy widz w kinie czuł się jak ukrainiec, a katalizatorem tego procesu był ormianin Siergiej Paradżanow. | 235:1410 |

#### KF (Kijowskie freski)

| # | кадр | заголовок (слой; рендерится UPPERCASE) | id | текст (слой, дословно) | id |
|---|---|---|---|---|---|
| 1 | 235:1419 | Kijowskie freski | 235:1434 | — | — |
| 2 | 237:1550 | 1966 | 237:1604 | Po filmie “Cienie zapomnianych przodków” reżim totalitarny postanowił ukarać reżysera. W czerwcu 1966 r. KCKP Ukrainy podjął uchwałę, w której wskazał na poważne błędy w organizacji produkcji filmowej w Kijowskim Studiu Filmowym. | 237:1602 |
| 3 | 237:1606 | Zakaz | 237:1663 | Zakazem objęto także projekcję szeregu filmów, m.in. filmu Siergieja Paradżanowa “Kijowskie freski”, w którym reżyser starał się pokazać powojenny Kijów – swoje ukochane miasto, które stało się jego domem. | 237:1661 |
| 4 | 237:1664 | Kijów | 237:1724 | Film “Kijowskie freski” był poświęcony 20. rocznicy zwycięstwa w II wojnie światowej. Siergiej Paradżanow nie pozwolił komisji na wprowadzenie zmian w scenariuszu i zawsze odmawiał pójścia na kompromis. Kilka miesięcy później film wycofano z produkcji, tłumacząc to "mistycznym i subiektywnym podejściem do współczesnej rzeczywistości". | 237:1722 |
| 5 | 240:1726 | 15 minut | 240:1789 | Z “Kijowskich fresków” mamy 15-minutowe próby filmowe i dokumenty z instrukcjami dla ekipy filmowej. Na przykład list do asystenta reżysera Romana Balayana można zobaczyć na wystawie poświęconej filmowi “Loty w snach i na jawie”. | 240:1787 |

#### SN (Sajat-Nowa)

| # | кадр | заголовок (слой; рендерится UPPERCASE) | id | текст (слой, дословно) | id |
|---|---|---|---|---|---|
| 1 | 240:1863 | Sajat-Nowa | 240:1878 | — | — |
| 2 | 241:1980 | 1968 | 241:2050 | W 1968 r. reżyser przeniósł się do Erywania, gdzie próbował zrealizować swój projekt o poecie Sajacie Nowie. Dla studia Armenfilm nakręcił kilka filmów krótkometrażowych mających na celu powierzchowne pokazanie twórczości ormiańskich artystów, w tym Sajat Nowa. | 241:2049 |
| 3 | 243:2052 | Sajat-Nowa | 243:2108 | Poetycka powieść filmowa Siergieja Paradżanowa o ormiańskim poecie Sajat-Nowa, nakręcona w 1968 roku w studiu Armenfilm. Autorski tytuł to "Sajat-Nowa". Film otrzymał negatywne recenzje zarówno od władz, jak i krytykóigał widzów, że celem autora było oświetlenie wewnętrznego świata poety, a nie tylko opowiedzenie jego biografii. | 243:2107 |
| 4 | 243:2112 | Barwy granatu | 243:2171 | Zagraniczni widzowie byli pod wrażeniem wykorzystania kolorów, zdjęć i koncepcji filmu, ale kierownictwu nie podobał się rezultat. Film został przerobiony i przemianowany na “Barwy granatu” Siergieja Jutkiewicza i w tej formie trafił do kin. | 243:2170 |
| 5 | 243:2174 | wyznanie | 244:2236 | Dopiero na początku XXI wieku przywrócono oryginalny montaż i odrestaurowano film. “Sajat Nowa” doskonale uosabia zamiłowanie Siergieja Paradżanowa do ceramiki, grafiki i wszelkiego rodzaju rekwizytów. | 244:2235 |

#### LoTS (Legenda o Twierdzy Suramskiej)

| # | кадр | заголовок (слой; рендерится UPPERCASE) | id | текст (слой, дословно) | id |
|---|---|---|---|---|---|
| 1 | 244:2241 | Legenda o Twierdzy Suramskiej | 244:2256 | — | — |
| 2 | 245:2319 | 1984 | 245:2372 | Od ostatniego filmu Paradżanowa minęło 15 lat. Dopiero w 1984 r. nakręcono kolejne dzieło reżysera “Legenda o Twierdzy Suramskiej”. Nie mogąc zrealizować scenariusza “Intermezzo” Siergiej Paradżanow sięgnął po mniej psychologiczną historię, zaczerpniętą z gruzińskiej legendy o młodzieńcu, który został zamurowany w twierdzy. | 245:2371 |
| 3 | 245:2374 | 2 reżysery | 245:2430 | Formalnie Dawid Abaszydze jest uznawany za pierwszego reżysera filmu, ale wiosną film został nakręcony i przepisany przez Siergieja Paradżanowa, który odtworzył historię za pomocą symboli, obrazów i folkloru. | 245:2429 |
| 4 | 245:2432 | fabula | 245:2491 | Mieszkańcy Gruzji, przygotowując się do obrony swojego kraju przed atakiem obcych zniewolicieli, zbudowali fortecę, ale za każdym razem, gdy mur osiągał poziom dachu, zawalał się. "Mur wytrzyma, jeśli zamuruje się w nim najpiękniejszy młodzieniec" - powiedział wróżbita. I znalazł się młodzieniec, który poświęcił się dla ratowania Ojczyzny. Dzięki tej ofierze twierdza została wzniesiona i nikt ani nic innego nie mogło jej zniszczyć. | 245:2490 |
| 5 | 245:2493 | wyznanie | 245:2555 | W latach 80. film “Legenda o Twierdzy Suramskiej” został doceniony na międzynarodowych festiwalach filmowych w São Paulo i Rotterdamie. | 245:2554 |

#### AK (Aszik Kerib)

| # | кадр | заголовок (слой; рендерится UPPERCASE) | id | текст (слой, дословно) | id |
|---|---|---|---|---|---|
| 1 | 245:2568 | Aszik Kerib | 245:2583 | — | — |
| 2 | 247:2644 | 1988 | 247:2697 | W 1988 r. Siergiej Paradżanow wydał swój ostatni ukończony film “Ashik Kerib” oparty na opowiadaniu Michaiła Lermontowa o wędrownym trubadurze, który pokonał tysiąc prób, aby znaleźć swoją ukochaną. | 247:2696 |
| 3 | 247:2699 | Fabula | 248:2755 | Młody trubadur przemierza ormiańską prowincję. Jest w drodze już ponad tysiąc dni. Ma nadzieję, że na końcu jego wędrówki czeka go fortuna. | 248:2754 |
| 4 | 248:2758 | Andriej Tarkowski | 248:2817 | Film jest zadedykowany Andriejowi Tarkowskiemu, którego Paradżanow bardzo cenił jako kolegę i przyjaciela. | 248:2816 |
| 5 | 248:2819 | wyznanie | 248:2881 | Film miał swoją premierę na Festiwalu Filmowym w Monachium, a później był pokazywany w Wenecji i Cannes. “Ashik Kerib” stał się jednym z najpopularniejszych dzieł reżysera. | 248:2880 |

Замечания по текстам (опечатки/особенности, не исправляю, фиксирую как данные):
- ANDRIJESZ 2: «Andrijesze» (кадр 2, 211:255) vs ANDRIJESZ 3/5 в слоях-дублях 217:338 и 217:469 «Andrijesie». В кадре 5 видимого текст 217:508 заканчивается обрывком: «…kontrastami i kolorem.m, który nienawidzi wszystkich żywych istot.» (мусор «.m, który nienawidzi…» остался от предыдущего варианта).
- ANDRIJESZ 3: «w 1954 r..» (двойная точка).
- CZP 2 (235:1227): в «Mychajło Koсiubynskiego» буква «с» — кириллическая U+0441. В CZP 4 то же имя написано «Kociubynski» (латиница), т.е. в двух кадрах имя разное.
- SN 3 (243:2107): «krytykóigał widzów» (слитно, очевидная ошибка ввода).
- SN 4 (243:2170): «Siergieja Jutkiewicza» (в тексте).
- LoTS 3 (245:2429): «Dawid Abaszydze» и «wiosną film został nakręcony…» (по смыслу, вероятно, «w wiosnę»/ошибка, как есть).
- AK 3 title слой «Fabula» (в остальных «fabula»; на экране всё равно uppercase).
- Кавычки: в большинстве текстов «“…”» (типографские), в KF 4 / SN 3 / LoTS 4 — прямые `"…"`. 
- CZP 5: заголовок/плашка/текст лежат не внутри панели, а напрямую в Frame 6 (см. п.7).

Слои заголовков панелей 3-5 по фильмам (для сверки): ANDRIJESZ 03=1954, 04=fabula, 05=wyznanie; CZP 03=Ormianin, 04=Mychajło Kociubynski, 05=1965; KF 03=Zakaz, 04=Kijów, 05=15 minut; SN 03=Sajat-Nowa, 04=Barwy granatu, 05=wyznanie; LoTS 03=2 reżysery, 04=fabula, 05=wyznanie; AK 03=Fabula, 04=Andriej Tarkowski, 05=wyznanie.

## 4. Дельта между состояниями

### 4.1 film fakty 1 → film fakty 2 (выбор фильма)
- Одинаковый каркас (Rectangle 21, nav, LOGO, Line 5, FILMY 25,869, Go back 1243,878, стрелки). «Frame 33» (45,134, 1340x633) = лента постеров: 6 постеров (402x569 plakat-инстансы) + 6 подписей (text 402x58, y=604/611) шагом ~447–448 px: Andrijesz (12), Cienie… (459), Kijowskie freski (906), Sajat Nowa (1352), Legenda o TS (1798), Aszik Kerib (2244).
- В фрейме 1 лента сдвинута так, что в окне 1340px (clip) видны x=12, 459, 906 = Andrijesz, CzP, Kijowskie freski. В фрейме 2 вся лента сдвинута на -1340 px: видны Sajat Nowa (x=12), Legenda o TS (458), Aszik Kerib (904); Andrijesz/CzP/KF уходят влево в отрицательные x (-1328, -881, -433). То есть листаются страницами по 3 постера: стрелка «вперёд» → следующие 3; страниц ровно две.
- Стрелки в экране выбора стоят столбиком справа: «вправо» Component 146 (1396,320, 71x71) и «влево» Component 145 (1396,416, 71x71). Кадр 1: «вправо» активна (чёрный круг, белая стрелка), «влево» неактивна (серая стрелка на чёрном круге). Кадр 2: наоборот: «вправо» серая (disabled), «влево» белая. Disabled = стрелка серого цвета (#8A92A0-ish, по скриншоту) на том же чёрном круге, без изменения размера.
- Позиции плашки: «FILMY» ID 405:5266 (кадр 1) / 405:5264 (кадр 2), Component 196 (453:3725 / 453:3730).
- Подписи под постерами (слои): «Andrijesz», «Cienie zapomnianych przodków», «Kijowskie freski», «Sajat Nowa», «Legenda o Twierdzy Suramskiej», «Aszik Kerib»; на экране капсом (SAIAT/SAJAT NOWA).
- Постеры: инстансы «Andriesz plakat» (444:5841 / 444:5866), «CzP plakat» (378:2723), «Kijowskie freski plakat» (444:5842), «Sajat Nowa plakat» (378:2729), «Legenda o TS plakat» (444:5840), «Aszik Kerib plakat» (378:2727). Размер ≈ 402x568.6–569.6; радиусов нет.

### 4.2 Шаг N → шаг N+1 внутри фильма (общая схема, подтверждено на всех 6 фильмах)
- Раскрытая панель (x=0, 847) сворачивается в 153px-полосу и переезжает в конец ряда (на x=1306 в видимой части), следующая панель ряда становится раскрытой на x=0 и разворачивается до 847; панели между ними сдвигаются влево на 694 (847→153). Картинки в полосах «едут» с нужным offset (см. 2.2).
- Исчезает: заголовок/плашка/текст предыдущей раскрытой панели (в кадре предыдущего шага они лежат внутри панели, которая остаётся за краем слева или уходит в хвост уже свёрнутой).
- Появляются: заголовок (год/слово), плашка 54x15, текст, номер раскрытой панели (x≈744, у «01» x=753).
- Стрелка «влево» (Component 145, 45,320) отсутствует в шаге 1 каждого фильма (это единственный disabled/hidden-вариант: на первом шаге её просто нет, а не серая) и есть в шагах 2–5. Стрелка «вправо» (Component 146, 1396,320) есть на всех шагах 1–5, в том числе на шаге 5 (disabled нет, видимо карусель циклическая: после 05 снова 01; в шаге 5 в ряду справа идут 01,02,03,04).
- Исключения по составу кадра: нет логотипа (LOGO) в CZP 1 (235:631), AK 3, AK 4, AK 5 (в XML кадров нет instance LOGO; на скриншотах шапка без логотипа). В AK 2 вместо «Component 146» стоит «Group 10» (frame 325:2511, 1396,320, 71x71), но на скриншоте стрелка вправо видна. В ANDRIJESZ 1 стрелки влево нет (как и во всех шагах 1), во всех «шагах 1» кроме CZP 1 есть правая стрелка.

### 4.3 Дельта ANDRIJESZ (проверено по XML)
- ANDRIJESZ 1: раскрыта 01 (Frame 1 x=0, 847, IMG_8969 1, ANDRIJESZ 25,41 336x69, 01 753,516, Rectangle 16 25,15 54x15); свёрнуты 02 (x847), 03 (1000), 04 (1153), 05 (1306); слева ничего; справа за окном дубли Frame 6/7/8/9 (x=1463, 1616, 1769, 1922) с Rectangle 45 (VISIBLE) и серым номером.
- ANDRIJESZ 2: раскрыта 02 (Frame 2 x=0), 01 (Frame 1) уехала на x=-847, видимые узкие: 03 (844), 04 (997), 05 (1150), 01-дубль Frame 6 (1303). За окном: Frame 7 (02, x=1456), Frame 8 (03, 1609), Frame 9 (04, 1762). Новый текст: 217:354 «1952 » (25,25), 217:355 плашка (25,335), 211:255 текст (25,365 540x205).
- ANDRIJESZ 3: 02 на -847, 01 на -1694; раскрыта 03 (x=0); узкие: 04 (845), 05 (998), 01 (1151), 02 (1304); за окном 03 (1457), 04 (1610). Текст 217:356 (25,397 579x183), год 217:387 «1954», плашка 217:386 (25,367).
- ANDRIJESZ 4: раскрыта 04 (текст 217:504 25,365 540x220; заголовок 217:506 «fabula» 25,25 233x69; плашка 217:505 25,335); узкие: 05 (847), 01 (1000), 02 (1153), 03 (1306); за окном 04-дубль 1459.
- ANDRIJESZ 5: раскрыта 05 (текст 217:508 25,334 627x246; заголовок 217:510 «wyznanie» 25,25 307x69; плашка 217:509 25,301 54x16); узкие 01 (847), 02 (1000), 03 (1153), 04 (1306); за окном ничего.
- Те же «шаблонные» приращения в CZP/KF/SN/LoTS/AK (одна и та же структура, меняются только картинки, offset-ы и тексты).

## 5. Интерактивные элементы
- Стрелки: Component 145 (влево) / Component 146 (вправо), 71x71, вне аккордеона (45,320) и (1396,320). В аккордеоне работают как «предыдущая/следующая панель». Hover-варианты в макете не видны (компоненты в componenty: Component 145 = варианты Component 141/143, Component 146 = варианты 142/144, 325:1795 и 325:1796; два варианта у каждой, предположительно «активна/серая», но значения не снимал из-за rate limit).
- Нет кликабельных «+» в углах на этих экранах: «+» нет ни в аккордеоне, ни на экране выбора фильма. Нет отдельных кнопок «вперёд» кроме двух стрелок. Клик по свёрнутой полосе предположительно раскрывает её (в макете не показано; prototype reactions недоступны через MCP, см. вопросы).
- Меню: «ART PROJECT / GALERIA / FILMY» — активен «FILMY»: подчёркивание Line 3 (101px, y=85) под «FILMY». Остальные без подчёркивания.
- «GO BACK» (Component 196) справа внизу (1243,878): стрелка-иконка + текст «GO BACK»; на экране выбора фильма (film fakty 1/2) ведёт назад; на экранах аккордеона — назад к выбору фильма (по смыслу).
- Плашка раздела: «FILMY» (Rubik Bold 58) слева внизу (25,869).

## 6. Ассеты

Только фиксирую; не скачивал.

| node id (на примере) | имя слоя | тип | размер на экране | кадры | особенности |
|---|---|---|---|---|---|
| 217:292 / 217:220 | IMG_8969 1 | растр | 847x600 | ANDRIJESZ 1–5 (панель 01) | в свёрнутом виде offset -334 (153 крайний) |
| 217:297 | IMG_8970 1 | растр | 847x600 | ANDRIJESZ (панель 02) | offset свёрнутой -370; на дубле другая версия файла (1a5da…, 1605…) |
| 217:300 | IMG_8971 1 | растр | 847x600 | ANDRIJESZ (03) | offset -181 |
| 217:303 | IMG_8972 1 | растр | 847x600 | ANDRIJESZ (04) | offset -624 |
| 217:306 | IMG_8973 1 | растр | 847x600 | ANDRIJESZ (05) | offset -344 |
| 235:917 | IMG_8940 1 | растр | 847x600 | CZP (01) | offset -500 |
| 235:927 | IMG_8939 1 | растр | 847x600 | CZP (02) | offset -397 |
| 235:928 | IMG_8938 1 | растр | 847x600 | CZP (03) | offset -223 |
| 235:929 | IMG_8949 1 | растр | 847x600 | CZP (04) | offset -347 |
| 235:930 | IMG_8955 1 | растр | 847x600 | CZP (05) | offset -460 |
| 237:1477 | h280_49754238 1 | растр | 847x600 (y=-3 в KF 1) | KF 01 | в KF 1 картинка поднята на y=-3 |
| 237:1569 | h280_49754234 1 | растр | 847x600 | KF 02 | |
| 237:1631 | h280_49754242 1 | растр | 847x600 | KF 03 | |
| 237:1684 | w1500_49754241 1 | растр | 847x600 | KF 04 | |
| 240:1752 | h280_49789594 1 | растр | 847x600 | KF 05 | |
| 241:1921 | five fashion films that broke the mold 1 | растр | 847x600 | SN 01 | |
| 241:2002 | The Power of the Tableau Shot 1 | растр | 847x600 | SN 02 | |
| 243:2080 | download 1 | растр | 847x600 | SN 03 | |
| 243:2149 | The Color of Pomegranates (1969) 1 | растр | 847x600 | SN 04 | |
| 243:2220 | The Color of Pomegranates 1 | растр | 847x600 | SN 05 | |
| 245:2301 | 1c6a9db7729dba6d115c6b1706a5c10b 1 | растр | 847x600 | LoTS 01 | |
| 245:2338 | 15949 1 | растр | 847x600 | LoTS 02 | в свёрнутом виде слегка масштабирована (106.53%, left -2.97%) |
| 245:2399 | 151988 1 | растр | 847x599.7 | LoTS 03 | blend lighten + Rectangle 94 (multiply, #232328 80%) |
| 245:2463 | l71Wiw1XHU-HbcVoFrorhcIbQKxY9-IdGKxgWO6v0BU 1 | растр | 847x600 | LoTS 04 | |
| 245:2530 | vlcsnap-00018_6_4 1 | растр | 847x600 | LoTS 05 | |
| 247:2626 | 486419 1 | растр | 847x600 | AK 01 | |
| 247:2663 | unnamed 1 | растр | 847x600 | AK 02 | |
| 247:2724 | 1a688078-a9c7-486c-b91b-42c51923d90b+(1) 1 | растр | 847x600 | AK 03 | |
| 248:2789 | 01labj5ga1268287565 1 | растр | 847x605 (y=-5) | AK 04 | чуть выше панели |
| 248:2856 | download 2 | растр | 847x600 | AK 05 | |
| 288:… | LOGO | вектор (SVG) | 218x35 | все кроме CZP 1, AK 3–5 | |
| 325:2120/2121 | Component 145/146 | вектор (SVG) | 71x71 | см. выше | стрелки |
| 227:… | FILMY | текст-компонент | 177x69 | все | Rubik Bold 58 |
| 217:285 / 217:287 | Line 3 / Line 5 | вектор | 101x0 / 1512x0 | все | |

Постеры экрана выбора фильма: в componenty (497:4381) лежат «Andriesz plakat» 398:2773, «CzP plakat» 376:2641, «Aszik Kerib plakat» 376:2642, «Kijowskie freski plakat» 398:2772, «Sajat Nowa plakat» 376:2640, «Legenda o TS plakat» 398:2774 — каждый как компонент из двух вариантов (по 402x569).

Вопрос «Component 31 (159:130)»: НЕ аккордеон. Это 5 вариантов (Frame 7, 8, 9, 10, 11 по 1512x982, id 159:125, 159:127, 159:126, 159:128, 159:129) биографического слайдера на светлом фоне: заголовок «siergiej Paradżanow», «(1924-1990)», длинный абзац, портрет 825x880 справа (IMG_8717 1), стрелки Component 29/30 (19x14) наверху. Это блок «bio» главной (другая серия), с FAKTY не связан.

## 7. Скрытые слои

- «Rectangle 45» 153x600, hidden: 217:385 (ANDRIJESZ 2, Frame 6, x=1303); 217:390, 217:395 (ANDRIJESZ 3: Frame 6 x=1151, Frame 7 x=1304); 217:432, 217:436, 217:447 (ANDRIJESZ 4: Frame 6 x=1000, Frame 7 x=1153, Frame 8 x=1306); 217:484, 217:488, 217:492, 217:503 (ANDRIJESZ 5: x=1153, 847, 1000, 1306).
  - Что это: затемняющий оверлей для свёрнутых панелей, fill rgba(35,35,40,0.63) (#232328, opacity 0.63), на весь прямоугольник полосы (0,0,153x600), поверх картинки и под номером. В паре с ним номер в этих полосах окрашен #8A92A0 (gray) вместо белого.
  - Реально в видимой части кадров скрыты (hidden=true), то есть вариант «приглушённых свёрнутых полос» был опробован и отключён: видимые узкие полосы в итоге светлые, номера белые.
  - Те же Rectangle 45 с hidden=false лежат на дублях за правым краем окна (x>=1456): 217:513, 517, 521, 525 (ANDRIJESZ 1), 217:545, 549, 553 (ANDRIJESZ 2), 217:557, 561 (ANDRIJESZ 3), 217:569 (ANDRIJESZ 4); они остались от варианта и не видны (за clip).
  - В остальных 5 фильмах Rectangle 45 нет вообще, там узкие полосы без затемнения.
  - Вывод: на сайте затемнения свёрнутых полос нет (в видимых кадрах оно скрыто); если решат включить, значения известны.
- Blur: у слоя 217:384 (видимая полоса 01 в ANDRIJESZ 2, x=1303, IMG_8969 1) стоит layer blur 3.3px (так же у дубля 217:516). Это единственное размытие в серии; на дубле, который виден как последняя полоса «01» в ANDRIJESZ 2, оно реально применяется (на скриншоте небольшая мягкость). В прочих кадрах блюра нет.
- LoTS 3: «Rectangle 94» (444:5913) не скрыт (см. 2.2).
- Прочего hidden в серии нет. Итого Rectangle 45: 10 hidden (на видимых полосах ANDRIJESZ 2–5, ровно те id, что в задаче) и 10 не-hidden (на невидимых дублях за clip).
- CZP 5 (235:1349): текст «4 września 1965…» (235:1410), плашка (235:1411) и заголовок «1965» (235:1412) лежат НЕ внутри раскрытой панели «Frame 5» (235:1385), а прямо в «Frame 6» (корне аккордеона) поверх всего; в раскрытой панели есть только «05». Фрейм «Frame 5» панели 05 стоит на y=1 вместо 3 — небрежность макета.

## 8. Вопросы/неясности
1. Анимация перехода (длительность, easing, ведёт ли клик на свёрнутую полосу сразу на нужную панель, или только стрелки): в макете нет, prototype reactions недоступны через MCP.
2. Стилизация стрелок: Component 145/146 — два варианта у каждого (141/143, 142/144) — не выяснено, какой active/disabled; в экране выбора фильма вторая стрелка серая. Из-за rate limit (последний get_design_context) не снял fill/opacity.
3. Подписи под постерами экрана выбора и их стиль (шрифт/размер): get_design_context 378:2717 не удался (rate limit). Видно, что это капс, жирный, белый, по центру под постером (слой 402x58, y 604–611). Шрифт/размер: либо Murecho Bold ~24 (как nav) либо Rubik; нужно проверить.
4. Эталонная ширина Frame 6: 1456/1457/1458/1459/1460/1463 в разных кадрах; у раскрытой панели смещение -3/-2 px в ANDRIJESZ 2–3. Берём 847+4x153=1459, gap 0?
5. Нужно ли воспроизводить хвосты за правым краем (дубли панелей x>=1456): они нужны только для «зацикливания» при анимации, и на статических состояниях не видны.
6. Отсутствие LOGO в CZP 1, AK 3, AK 4, AK 5 — ошибка макета или намеренно? (на других кадрах серии логотип есть)
7. «Rectangle 45» (затемнение свёрнутых полос) hidden только в ANDRIJESZ; в других фильмах его нет. Это отказ от варианта (то есть не нужно) — подтвердить.
8. Блюр 3.3px на видимой полосе «01» в ANDRIJESZ 2 (217:384): артефакт или намеренный эффект? В остальных кадрах/фильмах блюра нет.
9. Опечатки в текстах (см. замечания в разд. 3: «krytykóigał», «kolorem.m, który…», «Koсiubynskiego» с кириллической с, «r..», Andrijesze/Andrijesie, имя автора «Kociubynski/Koсiubynskiego», «Jutkiewicza» вместо Джуткевич): переносить как есть или исправлять?
10. Ширина текстового блока (540/556/566/579/625/627/640/650) подбиралась под длину текста; единая max-width? Предлагаю брать 650 как максимум, но макет не задаёт единого значения.
11. В кадре 2 (film fakty 2) постер «Sajat Nowa» подписан в слое «Sajat Nowa», а на скриншоте читается «SAIAT NOWA»: проверить побуквенно, это могла быть моя ошибка чтения картинки.
12. Header фрейма film fakty 1/2: id Component 145/146 vs Group 10 в AK 2 — одна и та же стрелка (разный тип слоя).
