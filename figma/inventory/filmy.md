# FILMY — инвентаризация (стартовая, 2 экрана плеера, 7 страниц фильмов)

Источники: get_design_context(398:2905) целиком (полный код ANDRIJESZ), page1.xml (геометрия всех фреймов, позиции лент-слайдеров), get_screenshot по всем 10 фреймам, SVG-ассеты с локального asset-сервера Figma (цвета/штрихи иконок). **Ограничение:** после снятия скриншотов фреймов Figma MCP стал отвечать "Rate limit exceeded, try again tomorrow", поэтому НЕ сняты: get_design_context стартовой страницы и плеера (значения шрифтов там взяты из XML-геометрии/по аналогии, помечено «выведено») и скриншоты вариантов в componenty (см. раздел 5.3 и вопросы). Prototype reactions недоступны, поэтому механика слайдера восстановлена по смещениям слоёв.

## 1. Фреймы

| id | имя | размер | скриншот | роль |
|---|---|---|---|---|
| 191:227 | Fims started page | 1512×982 | screens/191-227__filmy-start.png | вход в раздел Filmy (интро) |
| 198:350 | film player 1 | 1512×982 | screens/198-350__film-player-1.png | карусель постеров, позиция 1 (Andriesz, Cienie, Kijowskie freski) |
| 376:2679 | film player 2 | 1512×982 | screens/376-2679__film-player-2.png | карусель постеров, позиция 2 (Sajat Nowa, Legenda, Aszik Kerib) |
| 398:2905 | film ANDRIJESZ | 1512×3717 | screens/398-2905__film-andrijesz.png | страница фильма, слот 0 (эталон раскладки) |
| 401:2575 | film CZP | 1512×3717 | screens/401-2575__film-czp.png | слот 1 |
| 401:2991 | film KF | 1512×3717 | screens/401-2991__film-kf.png | слот 2 |
| 401:3400 | film SN | 1512×3717 | screens/401-3400__film-sn.png | слот 3 |
| 401:3809 | film LoTS | 1512×3717 | screens/401-3809__film-lots.png | слот 4 |
| 401:4218 | film AK | 1512×3717 | screens/401-4218__film-ak.png | слот 5 |
| 401:4636 | film ANDRIJESZ 2 karusel | 1512×3717 | screens/401-4636__film-andrijesz-2-karusel.png | слот 6 = клон слота 0 (замыкание карусели) |

Скриншоты — полный фрейм (страницы фильмов отдаются уменьшенными, ~417 px шириной; для pixelmatch на шаге сверки их надо будет переснять в полном размере — шаг 2).

Порядок фильмов везде одинаковый (индекс слота): 0 Andrijesz, 1 Cienie zapomnianych przodków (CzP), 2 Kijowskie freski (KF), 3 Sajat-Nova / Barwy granatu (SN), 4 Legenda o Twierdzy Suramskiej (LoTS), 5 Aszik Kerib (AK), 6 снова Andrijesz (клон).

## 2. Раскладка и значения

Общее: фон #17171B (переменная backgraund), белый #FFFFFF. Auto-layout нигде нет — всё absolute. У каждого фрейма «Rectangle 21» 1512×982 #17171B, у страниц фильмов ещё «Rectangle 45» 0,982 1512×2735 #17171B (обе без радиуса/обводки). Радиусов, теней, blend, opacity (кроме 35% круга Play) в макете нет.

Шрифты (по коду страницы ANDRIJESZ): **Rubik Bold** (заголовки), **Murecho Bold/Regular** (навигация, подписи, актёры), **Cambay Regular** (таблица метаданных, фабула), **Playfair Display Bold** + **Rubik Medium** (текст внутри постеров). Все uppercase, где указано; line-height normal, если не указано. letter-spacing нигде не задан.

### 2.1 Шапка (одинаковая на всех 10 фреймах)
- LOGO: 45,42 218×35 (SVG; в коде — компонент "Logo Property 1=Default").
- Пункты (Murecho Bold 24, uppercase, белый): ART PROJECT 998,45 145×35; GALERIA 1198,45 96×35; FILMY 1349,45 69×35. Расстояние между пунктами 55 px.
- Активный пункт FILMY: линия-подчёркивание "Line 3" 1349,85 101×0 (SVG 104×3 с запасом, штрих **3 px**, round cap, белый, путь x 1.5…102.5). Линия шире текста (101 против 69).
- Остальные пункты без подчёркивания.

### 2.2 Стартовая страница 191:227
Координаты из XML (стили не снимались, см. ограничение).
- «filmy» 198:323: 25,166 390×152 — гигантский заголовок (выведено: Rubik Bold ≈128 px, uppercase, белый; на скриншоте «FILMY»).
- Линия «Line 5» 198:324: 0,321 655×0 (белая, штрих ≈2).
- Go back (instance Component 196 444:5914): 511,249 144×36.5 — масштаб 0.79 от оригинала 181×46 (то есть компонент ужат). Справа от заголовка на одной базовой линии.
- Три текстовых блока-«пункта» (instances, белая короткая черта-тире сверху + текст в 2 строки, Murecho Bold ≈24 uppercase, выведено): Component 91 198:329 (45,407 565×96); Component 96 198:328 (45,578 592×96); Component 97 198:327 (45,749 610×96). Шаг по Y 171.
- Фото справа «poster 2 2» 381:2987: 776,166 691×740 (растр: чёрно-оранжевый + ч/б коллаж, женщина под фатой и ч/б половина — это же изображение, что у постера Aszik Kerib). Правый край 1467 (отступ 45).
- Footer на странице нет.

### 2.3 Плеер (198:350 и 376:2679) — это карусель постеров, не видеоплеер
- Frame 33 (376:2664 / 398:2850): 45,134 1310×633, обрезает контент (clip). Внутри 6 постеров (instances «… plakat») 402.5×569.4, шаг по X ≈448 (A 11, CzP 459, KF 907, SN 1352, LoTS 1799, AK 2245), y=11; под каждым подпись (text 402×58) на y=604 (Murecho Bold ≈24 uppercase по центру — выведено по скриншоту, значение не снято).
- Видно ровно 3 постера (окно 1310). Player 1: x=11/459/907 → Andriesz, Cienie zapomnianych przodków, Kijowskie freski. Player 2: та же лента сдвинута на −1344 (A −1341, CzP −893, KF −445, SN 0, LoTS 447, AK 893) → Sajat Nowa, Legenda o Twierdzy Suramskiej, Aszik Kerib.
- Стрелки справа: Component 146 1396,320 71×71 (→, верх) и Component 145 1396,416 71×71 (←, низ). Чёрный круг r=35.5, белая стрелка, штрих 3.07 round.
- Footer: линия "Line 5" y=830 1512×0 (белая 2px); «FILMY» (instance 'FILMY' 405:5262 / 405:5260) 25,869 177×69 — Rubik Bold 58 uppercase белый; Go back (Component 196) 1243,878 181.4×46 (Murecho Bold 31.543 uppercase белый + стрелка ← 29×22, штрих 4.03).
- Полноэкранной «плеерной» раскладки с видео нет.

### 2.4 Страница фильма (эталон: ANDRIJESZ 398:2905, 1512×3717)
Секции сверху вниз (X,Y, размер — координаты относительно страницы):

1. **Hero 133…939.**
   - PLAKAT (большой постер) 398:3319: 37,133 549×806, clip. Постеры внутри 563.4×797, шаг по X ≈563, у слота 0 x=−14 (см. 4 про смещения).
   - TEXT (метаданные) 398:3214: 636,139 730×478, clip. Панель одного фильма (frame 'text X', ширина ≈749–762) содержит:
     - белая плашка-тире 54×15 (0,0);
     - заголовок: Rubik Bold **58**, uppercase, lh normal, ширина 749, y=26; одно- или двухстрочный (двустрочный = 138 px высотой);
     - линия-разделитель «Line 7» y=173, ширина 598, белая 2px (SVG);
     - таблица метаданных от y=198: подписи в одной текстовой рамке (Cambay Regular **25**, lh **30**, межабзацный отступ **14** → шаг строки 44) цвет **#8A92A0**: Reżyseria / Scenariusz / Gatunek / Premiera / Produkcja / Czas; значения — второй текст (та же Cambay 25/30, белый), колонка значений на x ≈ +170 от левого края подписей (у слота 0 +171, у AK +174);
     - фон панели #17171B 729×479 (маска, перекрывает соседние панели ленты).
   - plakaty (мини-постеры «следующие три») 398:3286: 633,609 690×330, clip; мини-постеры 211.38×299 на y=26 (абс. 635…934), шаг по X 235 (зазор ≈24), видны 3 штуки.
   - Стрелки: Component 146 (→) 1396,320 71×71; Component 145 (←) 1396,416 71×71 (те же, что в плеере).
2. **«film» 999…1880.** Заголовок «film» 398:2925: 46,999 138×69, Rubik Bold 58 uppercase. FILMS 398:3634: 49,1077 1422×803, clip; панель фильма 1422×786 на y=1094…1880 (смещение +17). Внутри: фон-кадр (растр, object-bottom) на всю панель; поверх без градиента/затемнения (!) — текст и кнопка:
   - кнопка Play (Component 185/«186»): 165×165 в x≈628–652, y=280 (центр ≈ 711 = центр панели; у LoTS x=652 — смещена); SVG: круг белый fill-opacity **0.35** + белый треугольник;
   - подпись «film» (Murecho Bold 32 uppercase) над заголовком; заголовок (Rubik Bold 58 uppercase), одна строка: «film» y=514, заголовок y=560; две строки: «film» y=444, заголовок y=490 (высота 138). Всегда: год + длительность (Murecho Regular 24 uppercase, год в x=лев.поле, длительность x=+86: «1954» 61 шир., «1h 03m» 93 шир.) на y=628; звезда 68×68 (SVG, **#F5C829**) на y=693, оценка (Rubik Bold 58) на y=692, x=лев.поле+76…+80;
   - левое поле у панелей разное: A 25, CzP 29, KF 29, SN 49, LoTS 49, AK 29.
3. **Fabuła 1940…2194.** Заголовок «Fabuła» 47,1940 235×69 (Rubik Bold 58 uppercase). Текст: frame 'text' 398:3635 47,2025 1422×169 clip; панель 1423×154, абзац Cambay Regular **25**/lh **30**, белый, ширина 1400, x=+1, y=+9 (абс. 2034). До 3 строк. Лента панелей шаг 1423.
4. **ZDJĘCIA FILMU 2194…3103.** Заголовок 50,2194 446×69. Сетка 2×2 кадров (4 ленты 'foto 1–4'; каждая — свой clip-фрейм со слайдером из 7 кадров): foto 1 47,2283 705×408 (верх-лево); foto 2 763,2286 706×405 (верх-право); foto 3 47,2696 707×407 (низ-лево); foto 4 763,2701 706×402 (низ-право). Кадры 707×403, шаг ленты 707. Зазоры между кадрами ≈ 5–16 px (в клипах кадр лежит со смещением y=−1…5), фон #17171B просвечивает.
5. **OBSADA FILMU 3163…3523.** Заголовок 46,3163 434×69. OBSADA 398:3726: 37,3265 1434×258 clip; панель ('o X') 1425×268 (фон #17171B); имена Murecho Bold 24 uppercase, белый, ячейки 391×34; 3 колонки x=0/416/832 (шаг 416), 3 ряда y=0/59/118 (шаг 59); первый ряд абс. y≈3289. Порядок чтения по рядам (слева направо, затем вниз). У KF — одна строка «Nie są znane żadne nazwiska» (текст в колонке 1).
6. **Footer 3565…3717.** Линия "Line 5" 1,3565 1512×0 белая 2px (x=1, не 0); «FILMY» (компонент 405:5292) 26,3604 177×69 Rubik Bold 58 uppercase; Go back 1243,3613 181.4×46.

Вертикальный ритм: заголовок секции → контент ≈ 80–85 px (999→1077, 1940→2025, 2194→2283, 3163→3265); контент → следующий заголовок ≈ 60 px (1880→1940, 2191→2194 для фабулы, 3103→3163).

## 3. Тексты (дословно, по узлам)

### 3.1 Стартовая 191:227
- 198:323 «filmy». Go back (444:5914) «go back» (сам компонент).
- Блок 198:329: «TUTAJ MOŻESZ OBEJRZEĆ WSZYSTKIE NAJBARDZIEJ ZNANE FILMY SIERGIEJA PARADŻANOWA» (в макете две строки, слова разделены переносом после «NAJBARDZIEJ» / «ZNANE»).
- Блок 198:328: «TUTAJ MOŻESZ  ZNALEŹĆ INTERESUJĄCE INFORMACJE NA TEMAT  TYCH FILMÓW» (двойные пробелы после «MOŻESZ» и «TEMAT»).
- Блок 198:327: «TUTAJ MOŻESZ  DOWIEDZIEĆ SIĘ WIĘCEJ O TRADYCJACH I ZWYCZAJACH INNYCH KRAJÓW» (двойной пробел; «ZWYCZAJACH» без ą — опечатка; на скриншоте перед «I ZWYCZAJACH» ещё пробел).
Тексты прочитаны со скриншота (текст внутри инстансов компонентов XML не отдаёт); регистр — uppercase (Murecho Bold, как весь текст компонентов).

### 3.2 Плеер (подписи под постерами; text 402×58)
Player 1: «Andrijesz» (198:389), «Cienie zapomnianych przodków» (198:387), «Kijowskie freski» (198:388). Player 2 (в ленте): «Sajat Nowa» (376:2668), «Legenda o Twierdzy Suramskiej» (376:2666), «Aszik Kerib» (376:2667). Отображаются uppercase. На скриншоте у Sajat Nowa подпись читается «SAIAT NOWA» (латинская «J» в Murecho выглядит как «I» либо опечатка — проверить на шаге 2).
Постеры внутри содержат живой текст (Playfair Display Bold, uppercase): «ANDRIESZ» (на постере; в подписи «Andrijesz»), «CIENIE ZAPOMNIANYCH PRZODKÓW», «KIJOWSKIE FRESKI», «SAJAT NOWA», «LEGENDA O TWIERDZY SURAMSKIEJ», «ASZIK KERIB» + «Reżyseria: Siergiej Paradżanow» (Rubik Medium) + мелкий кредит-текст у нижнего края (Rubik Medium uppercase; полный текст см. в узлах 398:3196, 398:3204, 398:3210, 398:3261, 398:3266, 398:3270).

### 3.3 Страницы фильмов — данные (одни и те же узлы лежат в каждой странице, в ленте)
Заголовки (панель TEXT): 398:3184 «ANDRIJESZ (1954)»; 398:3219 «cienie zapomnianych przodków (1964)»; 398:3227 «Kijowskie freski (1966)»; 398:3233 «Sajat-Nova/Barwy granatu (1968)» (в рамке «Sajat-Nova/ Barwy granatu» с пробелом после «/»); 398:3240 «Legenda o Twierdzy Suramskiej (1984)»; 398:3246 «Aszik Kerib (1988)».

Метаданные (Reżyseria / Scenariusz / Gatunek / Premiera / Produkcja / Czas):
| Фильм | Reżyseria | Scenariusz | Gatunek | Premiera | Produkcja | Czas |
|---|---|---|---|---|---|---|
| ANDRIJESZ | Siergiej Paradżanow, Yakov Bazelyan | Yemelian Bukov, Grigori Koltunov | Familijny, Fantasy | 30 maja 1955 (Światowa) | ZSRR | 63 min. / 01:03 |
| CzP | Siergiej Paradżanow | Siergiej Paradżanow, Mikhaylo Kotsyubinsky | Dramat, Poetycki, Kostiumowy | 22 marca 1965 (Światowa) | ZSRR (Ukraina) | 97 min. / 01:37 |
| KF | Siergiej Paradżanow | Siergiej Paradżanow, Pavlo Zagrebelny | Krótki metraż | 25 stycznia 2019 (Światowa) | ZSRR (Ukraina) | 9 min. |
| SN | Siergiej Paradżanow | Siergiej Paradżanow | Biograficzny, Dramat, Muzyczny | 29 śierpnia 1968 | ZSRR (Armenia) | 74 min. / 01:14 |
| LoTS | Siergiej Paradżanow | Vaja Gigashvili | Dramat | 1984 | ZSRR | 88 min. / 01:28 |
| AK | Siergiej Paradżanow | Gija Badridze, Michaił Lermontow | Dramat, Romans | 1988 | ZSRR (Gruzja) | 73 min. / 01:13 |

Узлы значений: 398:3221 (A), 3222 (CzP), 3228 (KF), 3234 (SN), 3241 (LoTS), 3247 (AK). Подписи полей одинаковы во всех шести (узлы 398:3182/3217/3225/3231/3238/3244).

Полоса «film» (подпись «film» / заголовок / год / длительность / оценка):
| Фильм | заголовок в полосе | год | время | оценка | узлы |
|---|---|---|---|---|---|
| A | «andrijesz» | 1954 | 1h 03m | 5,8 | 398:2931-2935 |
| CzP | «cienie zapomnianych przodków» | 1964 | 1h 37m | 8,0 | 398:3339-3343 |
| KF | «Kijowskie freski» | 1966 | 9m | 7,0 | 398:3360, 3354-3357 |
| SN | «Sajat-Nova/ Barwy granatu» | 1968 | 1H 14m | 8,1 | 398:3370-3374 |
| LoTS | «Legenda o Twierdzy Suramskieji» (опечатка «Suramskieji») | 1984 | 1H 28m | 7,1 | 398:3608-3612 |
| AK | «Kijowskie freski» (ОШИБКА: должно быть Aszik Kerib) | 1988 | 1h 13m | 7,3 | 398:3625-3631 |
В полосе заголовок отображается uppercase (Rubik Bold 58). Регистр «1H» / «1h» нестабилен (SN/LoTS заглавная H; на экране всё uppercase, т.е. «1H 14M»).

Фабула (абзац Cambay 25/30):
- A (398:2930): «Film na podstawie baśni Jemiliana Bukowa o bohaterze mołdawskich bajek - pastuszce Andrijeszy, który marzył o tym, żeby zostać rycerzem. O czarodziejskiej trzcinie, którą pewnego razu podarował mu Wajnowan i walce ze złym czarodziejem Czarnym Wichrem, nienawidzącym wszystkich żywych istot. tompawel.» (хвост «tompawel.» — мусор)
- CzP (398:3636): «Przez dziesiątki lat dwa huculskie rody - Palijczuków i Gutenyuków - były ze sobą skłócone. Zdarzyło się jednak, że Iwan Palijczuk zakochał się w pięknej dziewczynie z wrogiej rodziny - Mariczce, córce mordercy jego ojca...»
- KF (398:3648): «Zmontowany testowy materiał filmowy do niewydanego filmu "Kijowskie freski" Siergieja Paradżanowa.»
- SN (398:3649): «Biograficzna opowieść pokazująca duchowy świat średniowiecznego ormiańskiego poety Sajat-Nowu, który pisał także w języku gruzińskim i azerbejdżańskim. Ukazano historię jego miłości, stosunek poety do religii, władzy świeckiej i ludzi.»
- LoTS (398:3650): «Przygotowując się do obrony swojego kraju przed cudzoziemskimi najeźdźcami lud wznosił twierdzę, lecz za każdym razem, kiedy ściana osiągała poziom dachu, zawalała się. Ściana wytrwa, jeżeli w nią będzie zamurowany najpiękniejszy młodzieniec powiedziała wróżka. I znalazł się młodzieniec, który dokonał ofiary dla ratowania ojczyzny. Dzięki tej ofierze twierdza była niedostępna i nikt już więcej nie mógł jej zburzyć...»
- AK (398:3651): «Romantyczny dramat oparty na poemacie o tym samym tytule autorstwa wielkiego rosyjskiego poety Michaiła Lermontowa. Aszik-Kerib był biedny, ale miał dobre serce i piękny głos. Grał na saaz, tureckiej bałałajce, gloryfikującej starożytnych wojowników Turkiestanu, i występował na festiwalach i weselach.»
- слот 6 (398:3652) = текст A.

Заголовки секций: «film» (398:2925), «Fabuła» (398:2921), «ZDJĘCIA FILMU» (398:2920), «OBSADA FILMU» (398:2922). Footer: «FILMY», «go back».

Актёры (по рядам слева направо; в макете все uppercase):
- A: Giuli Chokhonelidze, Lyudmila Sokolova, Domnika Dariyenko / Konstantin Russu, Kiril Stirbu, «Robert  Klyavin» (двойной пробел) / Nodar Shashigoglu, Eugeniu Ureche, Trifon Gruzin.
- CzP: Iwan Mykołajczuk, Spartak Bagashvili, Nina Alisova / Larisa Kadochnikova, Neonila Gnepovskaya, Aleksandr Gaj / Tatyana Bestayeva, Leonid Yengibarov, Nikolay Grinko.
- KF: «Nie są znane żadne nazwiska».
- SN: Sofiko Chiaureli, Melkon Aleksanyan, Medea Bibileishvili / Spartak Bagashvili, Medea Djaparidze, Gogi Gegechkori / Yuri Amiryan, Hovhannes Minasyan, Onik Minasyan.
- LoTS: Veriko Anjaparidze, Tamari Tsitsishvili, Levan Uchaneishvili / Sofiko Chiaureli, Zura Kipshidze, Mzia Arabuli / Leila Alibegashvilli, Dudukhana Tserodze, Dodo Abashidze (на экране порядок в 3-й колонке: Levan…, Mzia…, Dodo…).
- AK: Yuri Mgoyan, Sofiko Chiaureli, Ramaz Chkhikvadze / Veronique Matonidze, Baia Dvalishvili, David Dovlatian / Slava Stepanian, Nodar Dugladze, Dodo Abashidze.
- слот 6 = A.

## 4. Дельта между состояниями (механика)

**Все 7 страниц — один шаблон, разный «сдвиг слайдера».** Каждая страница содержит ВСЕ данные всех фильмов, разложенные горизонтально в clip-фреймах; состояние определяется тем, какая панель лежит на x≈0 окна. Меняются позиции (x) слоёв, сами слои и их размеры/стили не меняются.

Секции-ленты (окно фиксировано, лента смещена):
| Лента (id в странице A) | окно | шаг ленты | x слота 0 на стр. A | сдвиг на 1 фильм |
|---|---|---|---|---|
| PLAKAT 398:3319 | 549×806 | ≈563 | −14 | −563 |
| TEXT 398:3214 | 730×478 | 762 | +8 | −742…−762 (A 8 → CzP 13 → KF 46 → SN 79 → LoTS 112 → AK 145; +33 по странице на фильм, т.к. шаг панели 750/762/… не одинаков) |
| plakaty 398:3286 | 690×330 | 235 | 4 (CzP) | −235 |
| FILMS 398:3634 | 1422×803 | 1422 | 0 | −1422 |
| text (фабула) 398:3635 | 1422×169 | 1423 | 0 | −1423 |
| foto 1–4 | ≈706×405 | 707 | 0 (−2…−6) | −707 |
| OBSADA 398:3726 | 1434×258 | 1425 | 9 | −1425 |

Фильм на странице = слот; на странице k лента смещена так, что фильм k на x≈0: A: FILMS film A=0; CZP-страница: film CZP=0 (A=−1422); KF: film KF=−1 (A=−2845 → и т.д.).

Переходы между страницами (фреймы-состояния):
- **398:2905 ANDRIJESZ → 401:2575 CZP**: все ленты сдвинуты влево на один слот (см. таблицу), смена видимого постера, заголовка, метаданных, кадра-«film», фабулы, 4 стилл-кадров, актёров, и мини-постеров (следующая тройка: KF, SN, LoTS). Заголовок двустрочный (высота 138): «film»-подпись и заголовок в полосе поднимаются (444/490 вместо 514/560).
- **CZP → KF → SN → LoTS → AK**: то же, каждый раз −1 слот. Для KF и AK заголовок в полосе одностроч., для CzP/SN/LoTS двухстрочный.
- **AK → ANDRIJESZ 2 karusel (401:4636)**: лента смещена ещё на один слот → показывается клон (индекс 6), визуально ИДЕНТИЧЕН ANDRIJESZ (проверено по скриншоту: те же постеры, текст, кадры). Назначение — «бесшовное замыкание»: после AK листаем вправо на клон A, затем (вероятно smart-animate без анимации) возврат к слоту 0. У этого фрейма отличается лишь порядок слоёв/сдвиги лент (на 1 слот дальше), а мини-постеры уже показывают CzP, KF, SN (как на ANDRIJESZ). Различия есть только в служебных позициях (A-клон: PLAKAT −15, TEXT +178, text-фабула +4).
- Дополнительно на странице AK мини-постеры = (A, CzP, KF), на LoTS = (AK, A, CzP) — ленты `plakaty` зациклены сменой клонов (в ленте на разных страницах 8–9 элементов, окно 685–694 px).
- Назад по карусели (←) — те же сдвиги в обратную сторону (на макете отдельных «обратных» фреймов нет; 7 фреймов покрывают круг 0→6).

Стрелки: **→ Component 146** (1396,320) и **← Component 145** (1396,416) — всегда обе в одном виде (чёрный круг), disabled-состояния на первом/последнем слоте НЕТ (карусель зациклена, поэтому и нужен клон). «+» в углах на Filmy нет (Component 205 «+» в этих фреймах не используется — он только на Kraje).

Плеер 1 → плеер 2: лента Frame 33 сдвигается на −1344 (3 постера) — листание страницами по 3. Остальное (шапка, footer, стрелки) не меняется.

## 5. Интерактивные элементы

### 5.1 Фреймы
- Шапка: ART PROJECT / GALERIA / FILMY (активен FILMY — подчёркнут Line 3 101×3), LOGO (в общей шапке, ссылка на главную — гипотеза).
- Стрелки Component 146 / 145 (71×71): листание карусели постеров (плеер: по 3 постера; страница фильма: смена фильма целиком). Hover-варианты у компонентов есть (Component 145: Property 1=Component 141 / 143; 146: Component 142 / 144 — белый и серый #8A92A0 вариант, по паттерну componenty; не просмотрены из-за rate limit).
- Постеры в плеере (instances «CzP plakat» и т.п., 402.5×569.4) — кликабельны (гипотеза): ведут на страницу фильма; у каждого постера в componenty есть компонент-сет с двумя состояниями (376:2640 Sajat Nowa plakat, 376:2641 CzP plakat, 376:2642 Aszik Kerib plakat, 398:2772 Kijowskie freski plakat, 398:2773 Andriesz plakat, 398:2774 Legenda o TS plakat, 442×1253 — два варианта по 442×627 один под другим).
- Кнопка Play (Component 185, 165×165): открывает воспроизведение фильма (гипотеза); у компонента 2 варианта (Component 183 / 184, оба 165×165 — по паттерну: белый / серый). На страницах фильмов во всех слотах используется один и тот же вариант (default).
- Go back (Component 196, 181.4×46; варианты 194 белый / 195 серый): на стартовой (144×36.5 — ужат) — вероятно «назад к селектору разделов»; в плеере и на страницах фильмов — в footer справа.
- Footer «FILMY» (instance 405:5262 …) — декоративная надпись (hover-вариант FILMY 404:5254: Property 1=Default ×2 — белый/серый).
- Стартовая: три блока-«пункта» (Component 91/96/97, у каждого 2 варианта на 565/592/610×96 — белый / серый; вариант 2 в Component 97 сдвинут на 7 px по Y) — кликабельные меню-пункты (гипотеза: «ФИЛЬМЫ» → плеер, «informacje» → страницы фильмов, «Kraje» → раздел Kraje); из текста: блок 1 — каталог фильмов, блок 2 — информация о фильмах, блок 3 — традиции и обычаи (Kraje).

### 5.2 Hover / активное
Активного/выделенного пункта среди трёх блоков стартовой на скриншоте нет (все белые). Все пары вариантов (Component 91/96/97, 185, 145/146, 196) — белый/серый #8A92A0, то есть hover = серое (по паттерну, не проверено визуально).

### 5.3 Что из componenty относится к Filmy (497:4381)
| Компонент | id | Относится к Filmy? | Что это |
|---|---|---|---|
| FILMY | 404:5254 (217×288), 227:349 (217×257, старый) | да | footer-надпись «FILMY» 177×69 (Rubik Bold 58), 2 варианта (белый/серый); 227:349 — более ранняя версия с другим шагом (168 вместо 179) |
| Component 9, 20, 21, 22, 23, 24 | 54:317, 54:361…54:365 | **нет** | карточки «Przyjaciele» на главной (инстансы 54:371…54:386, 474×688, подпись внутри) — в Filmy НЕ используются; пары = белый/серый (hover) |
| Component 91 / 96 / 97 | 196:292 / 196:306 / 196:307 | **да** | три текстовых пункта стартовой Filmy (565/592/610×96); 2 варианта (89/90, 92/93, 94/95) — белый/серый |
| Component 185 | 361:2408 (449×206) | да | Play 165×165 (Component 183 / 184); инстансы названы «Component 185» и «Component 186», на всех 7 страницах использован один и тот же default-SVG (круг белый 35% + белый треугольник) |
| Component 187 | 381:2908 | нет (ни одного инстанса в Filmy) | вариант Play (Frame 34 / Frame 35) — запасной, не используется в макете |
| Component 190 | 381:2936 | **нет** | музейное фото (Museum) на главной, 811×923, ссылка на parajanovmuseum.am |
| Component 205 | 480:3721 | **нет** | «+» (Kraje) |
| Component 145 / 146 | 325:1795 / 325:1796 (111×223) | да | стрелки ← / → 71×71 (варианты 141/143 и 142/144) |
| Component 196 | 404:5126 | да | Go back 181.4×46 (варианты 194/195) |
| «… plakat» (6) | 376:2640, 376:2641, 376:2642, 398:2772…2774 (442×1253) и 376:2573…396:2653 (449×635) | да | постеры для плеера (инстансы 402×569); 376:2573…396:2653 — отдельные постеры-кандидаты 449×635 (1 вариант) |
| Component 202/203/204 | 437:4736, 437:4737, 438:4837 (443×1245) | вероятно да | пары постеров (plakat 1/4, plakat 1 1/1 2) — варианты постера |
| PLAKAT AK / SN / CZP | 442:5726, 427:3090, 416:3925 (735×1041–1054) | да | большие постеры для страниц фильмов |

Разница вариантов (Component 9…24, 91/96/97, 185, 190) по скриншотам НЕ снята (rate limit); выше — вывод по размерам/паттерну из componenty.md («белый / серый #8A92A0»).

## 6. Ассеты

| node id | имя | тип | на экране | фреймы / заметки |
|---|---|---|---|---|
| 381:2987 | poster 2 2 | растр | 691×740 | старт; коллаж Aszik Kerib (оранж/ч-б) |
| 398:3187 / 398:3188 | poster 4 / poster 1 1 | растр | 563×797 | Andrijesz (большой постер; два слоя, второй поверх) + живой текст Playfair/Rubik Medium |
| 398:3193 | plakat bez textu 1 | растр | 211×299 / 563×797 | CzP (без текста), текст живой поверх |
| 398:3201 / 3296 | poster 3 | растр | ″ | KF |
| 398:3206 / 398:3207 | plakat bez textu 2 / poster 5 | растр (2 слоя) | ″ | SN |
| 398:3258 | poster 6 | растр | ″ | LoTS |
| 398:3263 | poster 2 1 | растр | ″ | AK |
| 398:2923 | IMG_8969 2 | растр, object-bottom | 1422×786 | кадр-«film» Andrijesz (слот 0 и 6) |
| 398:3338, 3353, 3369, 3607, 3624 | IMG_8940 2 (одинаковое имя, РАЗНЫЕ файлы: …8940 2/8940 3/8940 4/8940 5/8940 6) | растр, object-bottom | 1422×786 | кадр-«film» CzP, KF, SN, LoTS, AK |
| 398:2924, 3655-3659, 3661 | IMG_8970 2 / 8aa4e32db…1–5 / IMG_8970 3 | растр | 707×403 | foto 1 (слот 0…6); 8aa4…1 с кропом h131.58% |
| 398:2926, 3670-3674, 3654 | IMG_8971 2 / IMG_8949 2–5 / mHo4MkvPnH…1 | растр | 707×403 | foto 2 |
| 398:2927, 3663-3668 | IMG_8972 2 / IMG_8939 2–6 / IMG_8972 3 | растр | 707×403 | foto 3 |
| 398:2928, 3676-3690 | IMG_8973 2 / IMG_8938 2,3 / IMG_8973 3 | растр | 707×403 | foto 4 |
| 398:3197 и др. | festival-de-cannes-logo 1 | вектор SVG | 33×16.5 (мини) / 88×44 (большой) | на постерах CzP, SN (внизу по центру) |
| 398:2911 / 398:3126 / 398:3127 | Line 3, Component 146, Component 145 | вектор | 101×3 / 71×71 / 71×71 | SVG |
| 398:2949 | Component 185 (Play) | вектор | 165×165 | на 7 слотах |
| 398:2936 | Star 1 | вектор | 68×68 (SVG 64.7×61.5, #F5C829) | на 7 слотах |
| 288:921 | Logo (Property 1=Default) | вектор | 218×35 | на всех |
| Line 5 / Line 7 | линии | вектор | 1512×2 / 598×2 | белые |

Все кадры filmов — статичные растры. Видеоссылок/видео-слоёв нет (см. вопросы).

## 7. Скрытые слои
В 11 hidden-узлах page1.xml нет ни одного внутри фреймов серии (проверено программно). Визуально «скрыто» (за маской/оффскрином): все не-текущие панели лент вне окна clip-фреймов; фоны-«маски» #17171B 729×479 в панелях TEXT и 1425×268 в OBSADA; дубль 'o KF' (398:3730 и 398:3744, оба x=2859, второй содержит Frame 46 с тем же «Nie są znane żadne nazwiska»); «IMG_8939 4» вне сетки шага 707 (x=1592 на стр. A, 885 на CzP) — смещён, не виден.

## 8. Вопросы/неясности
1. **Видео**: в макете нет ни видео-ссылок, ни плеера — «film player 1/2» это постер-карусель (разные позиции ленты), а не «постер с Play vs играющий плеер». Play (165×165) лежит поверх статичного кадра; что происходит по клику (встроенный плеер, YouTube, ссылка на внешний сервис) — не указано. Нужно решение.
2. Какие именно значения у стартовой (шрифты/размер «filmy» ≈128, трёх пунктов, Go back) — не снято из-за rate limit; повторить get_design_context(191:227), 198:350, 376:2679.
3. Куда ведут три пункта стартовой и сам плеер (стартовая → плеер → страница фильма?) — prototype reactions недоступны; порядок переходов (старт → плеер 1/2 → клик по постеру → страница) выведен, не подтверждён. Какой слот страницы открывается по клику на постер (смещение ленты) — по структуре очевидно (слот = индекс постера).
4. Листание: плеер листает по 3 постера (−1344), страница фильма — на 1 слот, клон ANDRIJESZ 2 нужен для замыкания; поведение анимации (smart-animate, сроки) неизвестно; корректность обратного перехода (←) на AK → A-клон и обратно не подтверждена.
5. Hover/серые варианты (Component 145/146, 185, 91/96/97, 196, FILMY, «… plakat») — в макете варианты есть, но привязка к ховеру не подтверждена; скриншоты вариантов не сняты.
6. Данные с ошибками, требующие решения владельца: полоса «film» страницы AK озаглавлена «Kijowskie freski» (скопировано с KF), у LoTS «Suramskieji», на постере «Andriesz» против «Andrijesz»; «29 śierpnia» (SN); «Premiera 25 stycznia 2019 (Światowa)» у KF при 1966; хвост «tompawel.» у Andrijesz; «Robert  Klyavin» (двойной пробел); подпись «Sajat Nowa» читается «SAIAT NOWA» на скриншоте плеера; «Aszik Kerib» 'Gija Badridze'/'Michaił Lermontow' — смешение транслитераций (рус./польск./англ.).
7. LoTS и AK: подпись года/времени и белые заголовки лежат прямо на светлом кадре без затемнения — на LoTS год/время плохо читаются. Нужно ли добавлять градиент-подложку (в макете нет).
8. Поведение метаданных: колонка значений сдвигается пробелами (хак); корректно ли делать единую сетку (подписи 117 px, значения от x=+170).
9. Мини-постеры «plakaty» (3 следующих фильма) кликабельны? Ведут на соответствующий фильм (гипотеза) — не подтверждено; каждая карточка содержит живой текст 2.7–3.4 px (нечитаем).
10. Поведение footer на страницах фильмов: «go back» ведёт в плеер/селектор? не указано.
11. Ширина левого поля текста полосы «film» (25/29/49) — дизайнерская небрежность или намеренно? Для кода нужна единая величина (рекомендация координатору: брать 25–29 и убрать 49).
12. Component 190 / 9–24 / 205 — не относятся к Filmy (проверено по инстансам: Przyjaciele, Museum, Kraje); поэтому из Filmy берём только 91/96/97, 185, 145/146, 196, FILMY, плакаты.
