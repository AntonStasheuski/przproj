# Инвентаризация: ГЛАВНАЯ — фрейм 1:2 "Home page" (1512×8171)

Источники: get_design_context(1:2) целиком (отдал полный код за один вызов, по секциям не потребовалось), get_screenshot, page1.xml, get_variable_defs. Символ `rect` ниже = rounded-rectangle без радиуса/обводок (в контексте нет ни radius, ни stroke, ни shadow ни у одного узла фрейма; blend mode/opacity/rotate — только поворот линий в Component 182, см. ниже).

## 1. Фреймы

| id | имя | размер | скриншот | роль |
|---|---|---|---|---|
| 1:2 | Home page | 1512×8171 (x=-14413 y=-9433 на холсте) | screens/1-2__home__full.png (190×1024, мелкий — только обзор) | единственное состояние главной |
| 1:4 | Rectangle 1 (hero) | 1512×861 y=0 | screens/1-2__home__hero.png | секция hero |
| 4:5 | Rectangle 2 (O projekcie) | 1512×982 y=861 | screens/1-2__home__o-projekcie.png | секция |
| 14:93 | Rectangle 8 (Do czego służy) | 1512×1964 y=1843 | screens/1-2__home__do-czego.png | секция (2 ряда: 3 карточки + 3 навигационных плитки) |
| 159:141 | Component 31 (bio) | 1513×982 y=3807 | screens/1-2__home__bio.png | секция-карусель Параджанов |
| 20:3 | Rectangle 13 (museum) | 1512×982 y=4789 | screens/1-2__home__museum.png | секция |
| 27:33 | Rectangle 19 (Przyjaciele+футер) | 1512×2403 y=5768 | screens/1-2__home__przyjaciele.png | секция + футер |

Скриншоты секций сняты get_screenshot(<rect id>) — рендерит как на холсте, т.е. с наложенными соседними слоями. Размеры PNG уменьшены до 1024 по длинной стороне (не 1:1 с макетом) — для pixelmatch нужно масштабировать/или снять 1:1 отдельно (вопрос 1).

## 2. Раскладка и значения

Всё позиционируется абсолютно (auto-layout нет, ни одного Figma gap/padding). Корневая заливка фрейма white (#FFF), её перекрывают секции-прямоугольники.

### Токены
- Цвета: #17171B (var `backgraund`), #F4F4FA (`backgraund 2`), #FFFFFF, #000000. Доп. цвет вне переменных: #8A92A0 (серый плейсхолдер под фото в bio, см. ниже). Красный акцент в самом тексте/шапке не используется: красный только в графике (гранат в логотипе, коллажи).
- Шрифты: **Murecho Bold** 24px, line-height normal, UPPERCASE — навигация, подписи, мелкие заголовки (подписи, часы, адрес). **Rubik Bold** 58px, uppercase, lh normal — заголовки секций; Rubik Bold 36.482px/lh 34.202 uppercase — "Idea and design by…". **Cambay Regular** 25px/lh 30px — основной текст (в footer 27.362px/lh 34.202). **Caveat Bold** 22px — рукописная подпись (191:190). **Playfair Display Bold** 96px, tracking 9.6px, uppercase, center — "ART PROJECT" внутри Component 182 (в макете этот текст лежит поверх фото). letter-spacing остальных текстов не задан (0).
- Цвет текста: на тёмных секциях white, на светлых black.
- Декор: короткая жирная «плашка-акцент» 54×15 (rect) над заголовком: 21:25 (45,1004 black), 159:113 внутри bio (45,342 black), 23:6 (1414,4857 black, у museum справа), 29:22 (72,5877 white). Линии-разделители (SVG, обводка ≈2px, цвет по секции): 21:26 (45,1315, w598), 29:172 (72,6050, w598), 23:9 (870,5030, w598), 159:115 (в bio, 45,584, w598), 21:27 (766,943, w329, обводка толще ≈5px, над подписью к фото), в bio 159:111 (45,40, w308) и 159:112 (472,40, w1016) — верхние линии (толщина ≈5px), 465:3718 (0,7595.5, w1212, футерная линия, обводка 2px).

### Фон секций (прямоугольники)
| id | имя | x,y | размер | заливка | обводка |
|---|---|---|---|---|---|
| 1:4 | Rectangle 1 | 0,0 | 1512×861 | #17171B | нет |
| 4:5 | Rectangle 2 | 0,861 | 1512×982 | #F4F4FA | нет |
| 14:93 | Rectangle 8 | 0,1843 | 1512×1964 | #17171B | нет |
| 27:33 | Rectangle 19 | 0,5768 | 1512×2403 | #17171B | нет |
| 20:3 | Rectangle 13 | 1,4789 | 1512×982 | #F4F4FA | нет |
| 159:141 внутр. 159:101 | фон bio | 0,0 внутри компонента | 1512×982 | #F4F4FA | нет |
| 159:141 внутр. 159:102 | серый блок под фото | 688,59 внутри | 825×880 | #8A92A0 | нет |
| 29:8 | Rectangle 24 | 45,6115 | 474×688 | #FFFFFF (белая подложка под первой карточкой друзей) | нет |

Обводок, радиусов, теней ни у одного прямоугольника нет. Стыки секций по Y: 0–861 | 861–1843 | 1843–3807 (Rect 8) | 3807–4789 (bio) | 4789–5771 (museum, Rect 13 на x=1 — сдвиг на 1px) | 5768–8171. Rect 13 и Rect 19 перекрываются на 3px (5768–5771); Component 31 (x=1, w1513) и Rect 13 выступают на 1px за правый край 1512. Component 182 (y=2825–3807, 1512×982) лежит поверх Rect 8 и имеет собственный фон #17171B.

### Секция A. Hero (y 0–861, #17171B)
- Шапка (y=45, высота 35): 288:837 "Component 26" (45,45, 264×35, инстанс 288:838 "Paradżanow Project" — текст Murecho Bold 24 uppercase white); справа три пункта (инстансы): 54:93 "Art Project" (998,45, 145×35), 54:286 "Galeria" (1198,45, 96×35), 54:284 "Filmy" (1349,45, 69×35). Разрыв между пунктами 55 и 55px (998+145=1143→1198; 1198+96=1294→1349); правый край 1418 (отступ 94 от края 1512; слева отступ 45).
- Логотип 14:38 "LOGO" (270,274, 972×156): frame из ~26 векторов (14:39…14:64) — буквы PRŻ PROJ белым (с точкой-вставкой над Ż) и «гранат» красный (векторы 14:45–14:64, внутри буквы O) — x≈709–834. Экспорт в design_context: SVG (imgLogo). В красном гранате цвет на скриншоте примерно тёмно-красный (#B20F0F–оттенок; точный hex не снят, вопрос).
- Подзаголовок 14:37 (центр, левый край 367, w777, y=499, h156): Cambay 25/30, center, white.
- Низ hero (y=801): 5:8 "Valeriia Malashevska" (45,801) — Murecho Bold 24 uppercase white, **подчёркнут (underline, decoration from-font)**, это ссылка `<a href="https://www.behance.net/valeriamalashe" target=_blank>`; 5:9 "2024" (1409,801) Murecho Bold 24 white (не uppercase-нужен, цифры).

### Секция B. O projekcie (y 861–1843, #F4F4FA)
- Плашка 21:25 (45,1004,54×15 black), заголовок 14:34 "O projekcie  " (45,1030, 383×69, Rubik Bold 58 black uppercase; в тексте два пробела на конце, white-space:pre).
- Линия 21:26 (45,1315, w598).
- Текст 14:35 (45,1340, 631×313): Cambay 25/30 black; hard-line-breaks в макете (абзацы строк по 30px; переносы стоят после «życia», «jednego», «nietypowy» — часть переносов ручная).
- Справа: подпись 14:36 (770,954, 617×105; Murecho Bold 24 black, 3 строки), над ней линия 21:27 (766,943, w329). Фото 86:236 "IMG_8834 1" (770,1078, 746×765): растр, object-cover, на экране выходит за правый край (770+746=1516 > 1512) и ниже секции (1078+765=1843 = точно низ секции).

### Секция C. Do czego służy projekt (y 1843–3807, #17171B)
- Заголовок 14:94 (341,1898, 780×69; Rubik Bold 58 white uppercase). Центр текста по макету не по центру секции (341→1121; центр 731 vs 756) — как есть; в скриншоте виден центрирование внутри 780 бокса.
- 3 карточки (растр, object-cover, 488×510, y=2029): 14:95 Rectangle 9 (x=24), 14:96 Rectangle 10 (x=512), 14:97 Rectangle 11 (x=1000). Без зазоров (24+488=512, 512+488=1000), правый край 1488 (отступ 24 с обеих сторон). Все три — один и тот же портрет Параджанова (коллаж, оранжево-красный), разный фон/детали (1: тёмно-красный блок; 2: цветы, гранаты, пламя; 3: рукописный текст, звёзды).
- Подписи-названия (Murecho Bold 24 white uppercase): 14:117 "Idea" (27,2565), 14:116 "Estetyka" (512,2565), 14:115 "Wiedza" (1000,2565). Заметьте: x у «Idea»=27, у карточки=24 (3px); «Estetyka» x=512 (на границе), «Wiedza» x=1000.
- Описания (Cambay 25/30 white, w408, y=2624, h145): 14:122 (27), 14:121 (512), 14:90 (1000).
- Подпись-автограф 191:190 "Siergiej Paradżanow" (1027,2492) Caveat Bold 22 white — поверх нижнего правого угла третьей картинки (рукописная подпись на фото).
- Нижний ряд — 352:2658 "Component 182" (0,2825, 1512×982, фон #17171B): три навигационных плитки как «колонки»:
  - две вертикальные разделительные линии (SVG, повернуты на 90°, высота ≈ 782 (inset 4.58% сверху/снизу), x≈1071 (70.83%) и ≈631 (41.73%)) — цвет линии светло-серый (по скриншоту), обводка 2px;
  - плитка «Art Project»: фото 352:2423 (x=24,y≈2825+124, ≈ 488×… : inset 12.63% 59.79% 18.74% 1.59%, т.е. 24,124→~ 465×… ) растр Rectangle 46; поверх неё "ART PROJECT" (352:2426, Playfair Display Bold 96, tracking 9.6, white, center, две строки "ART" / "PROJECT") в боксе inset 36.97% 62.9% 36.97% 4.76% (72…561, y≈363…619 внутри);
  - плитка «Galeria»: button 352:2424 (растр Rectangle 49, inset 34.93% 30.69% 18.77% 43.25% → 654…1048 × 343…797);
  - плитка «Filmy»: button 352:2425 "IMG_8915 5" (растр, object-bottom, inset 34.93% 1.59% 18.77% 72.35% → 1094…1488 × 343…797);
  - подписи: 352:2420 "Art Project", 352:2422 "Galeria", 352:2421 "Filmy" (Murecho Bold 24 white uppercase) на y≈2825+823 (inset 83.81%) = 3648.
  Это те же три компонента пунктов меню (Component 2/6/5) — переиспользованы как подписи.

### Секция D. Bio Параджанова — Component 31 (instance, y 3807–4789, clip по границе; 1513 шириной, x=1)
Внутренние координаты (относительно компонента):
- фон 159:101 #F4F4FA; серый #8A92A0 825×880 (688,59) — подложка под фото (виден на скриншоте? нет — перекрыт фото; фото начинается в x≈ 688 + …).
- Верхние линии: 159:111 (45,40, w308) и 159:112 (472,40, w1016), оба обводка ≈5px black. Между ними стрелки: 159:139 "Component 29" (497,65, 19.2×13.8) и 159:117 "Component 30" (button, 542,65, 19.2×13.8). На скриншоте: левая стрелка серая (≈#8A92A0, неактивна — первый слайд), правая чёрная (активна).
- Подпись 159:105 (45,65, w617): 3 строки Murecho Bold 24 black: «Siergiej Paradżanow / kolaż Valeriia Malashevska / 2024 r.».
- Плашка 159:113 (45,342, 54×15 black), заголовок 159:103 (45,368) Rubik Bold 58 black uppercase, две строки «siergiej / Paradżanow» (lh normal).
- «(1924-1990)» 159:114 (45,531) Murecho Bold 24 black; линия 159:115 (45,584, w598); текст 159:104 (45,609, 587×321) Cambay 25/30 black.
- Фото 159:110 "IMG_8717 1": inset 6.01% 0 4.38% 45.47% → x=688…1513 (w≈825), y≈59…939 (h≈880); внутри растр с crop (w 150.93%, left -21.7%), overflow hidden — то есть фото кадрируется в рамке 825×880. Рамка совпадает с серым блоком 159:102.
- 159:106 "foto" (860,301, 468×321): вектор/SVG-рамка (imgFoto1) — вероятнее всего маска/контур-обводка вокруг лица; на скриншоте не различим (вопрос).

### Секция E. Museum (y 4789–5771, #F4F4FA)
- Фото слева: **растр** (не карта) — instance 381:2938 "Component 190" (0,4848, 811×923) = `<a href="https://parajanovmuseum.am/" target=_blank>`; внутри растр (object-bottom, imgComponent190) и вектор 381:2929/…:2909 "Component 188" (SVG-иконка «курсор-стрелка» в белом круге, inset 89.38% 2.47% 2.17% 87.92% → ≈ x 700, y 4848+825, ≈ 98×… ). Рядом пустой инстанс 86:246 "Component 27" (0,4848, 811×923, ссылки/детей нет) — дублёр/старая версия под 190. 
- Правая колонка: плашка 23:6 (1414,4857, 54×15 black); заголовок 23:5 "museum" (правый край 1468, y=4883, 256×69) Rubik Bold 58 black uppercase, text-align right.
- Адрес 23:8 (919,4977, 549×35) Murecho Bold 24 black uppercase («Parajanov street , Bldg 1, Yerevan, Armenia »); линия 23:9 (870,5030, w598).
- «Godziny otwarcia» 25:3 (917,5133, 241×41) Cambay 25 uppercase black; значение 25:5 (1253,5133, 156×69) Murecho Bold 24 black uppercase, две строки.
- 25:30 "INFORMACJE DLA ZWIEDZAJĄCYCH" (870,5305, 393×44) Murecho Bold 24 black; 25:31 (870,5374, 587×262) Cambay 25/30 black.

### Секция F. Przyjaciele + футер (y 5768–8171, #17171B)
- Плашка 29:22 (72,5877, 54×15 white); заголовок 29:21 (72,5903, 403×69) Rubik Bold 58 white uppercase; «(1924-1990)» 29:171 (72,5997) Murecho Bold 24 white; линия 29:172 (72,6050, w598).
- Сетка 3×2 карточек 474×688 (растр с кадром, подпись внутри, Murecho Bold 24 white uppercase, у нижнего края: top 92.73%): x=45, 519, 993 (шаг 474, зазор 0; 45+3×474=1467 → правый отступ 45); y=6115 и 6803 (шаг 688). Instances: 54:371 Federico Fellini, 54:374 Yev Sen Loran, 54:377 Andriej Tarkowski, 54:380 Jean-Luc Godard, 54:383 Andrzej Wajda, 54:386 Michelangelo Antonioni. Фото кадрировано overflow:hidden с небольшим масштабом (например 108.69% ширины, left −3.69%) — каждая карточка своя кадровка. Подложка Rectangle 24 (29:8) белый 474×688 только под первой; зачем — не ясно (вопрос).
- Отдельно, **стоящий вне инстанса** текст 46:16 "federico fellini" (59,6753, 223×38) — дубль подписи первой карточки (лежит поверх; она же внутри 54:371 на y≈6115+638=6753). Дубликат.
- Макетный "foto" 29:23 (72,6278, 393×270): frame из 3 векторов — на скриншоте не просматривается (скрыт под карточкой 54:371).
- Футер: линия 465:3718 (0,7595.5, w1212); 465:3735 "Idea and design by Valeriia Malashevska" (48.56,7669, 835×35) Rubik Bold 36.482 white uppercase lh 34.202; 465:3742 (45,7747, 864×215) Cambay 27.362/34.202 white; 468:3711 «valeria08.ink@gmail.com» (45,8070, 285×35) Murecho Bold 24 white (в макете не ссылка/не mailto; нет `<a>`).
- Соцсети (4 иконки-SVG, белые, на y=8044, вставляются как ссылки `<a target=_blank>`).

## 3. Тексты (дословно)

Шапка: «Paradżanow Project» (288:838) · «Art Project» (54:93) · «Galeria» (54:286) · «Filmy» (54:284).
Hero: «Wszystko o jednym z najciekawszych reżyserów XX wieku, wyjątkowym mistrzu, który stworzył swój własny, niepowtarzalny język filmowy» (14:37) · «Valeriia Malashevska» (5:8) · «2024» (5:9).
O projekcie: заголовок «O projekcie  » (14:34). Подпись (14:36): «Seiergiej Paradżanow / kolaż Valeriia Malashevska / 2024 r.» (в макете «Seiergiej» с опечаткой ie; в bio: «Siergiej»). Текст (14:35): «PRŻ Project  powstał w celu poznania życia i twórczości Siergieja Paradżanowa, jednego z najwybitniejszych reżyserów XX wieku. Na naszej stronie każdy chętny może zapoznać się z twórczością artystyczną, filmami i biografią reżysera w nietypowy i bardzo interesujący sposób. Szczególną cechą naszego projektu są interaktywne plakaty artystyczne, które służą nie tylko celom wizualnym, a także edukacyjnym.»
Do czego służy projekt: «Do czego służy projekt» (14:94).
- «Idea» (14:117) / «Tworzenie ciekawych, interaktywnych i nietypowych rozwiązań to główna idea tego projektu.» (14:122)
- «Estetyka» (14:116) / «Stworzenie pięknego wizualnie i łatwego w obsłudze interfejsu użytkownika jest głównym zadaniem tego projektu.» (14:121)
- «Wiedza» (14:115) / «Zdobyć nową wiedzę i zapoznać się z dziedzictwem kulturowym świata. Zanurzyć się w świat kina i mieszanki ormiańsko-ukraińskiej.» (14:90)
- Автограф: «Siergiej Paradżanow» (191:190, Caveat).
- Нижний ряд: «ART PROJECT» (Playfair, на фото) + подписи «Art Project», «Galeria», «Filmy».
Bio (159:141): «Siergiej Paradżanow / kolaż Valeriia Malashevska / 2024 r.» · «siergiej Paradżanow» (CSS uppercase) · «(1924-1990)» · «Siergiej Paradżanow, światowej sławy filmowiec o awangardowych tendencjach, odziedziczył swoją niezwykłą zdolność i bujną wyobraźnię po matce, która była wyjątkowo artystyczną i ekscentryczną postacią w swoich czasach. Urodzony 9 stycznia 1924 roku, Siergiej był trzecim dzieckiem w rodzinie. Jego ojciec, Joseph, zamożny handlarz antykami z Tyflisu (obecnie Tbilisi w Gruzji), pragnął, aby jego syn przejął i rozwijał rodzinny biznes.»
Museum: «museum» (23:5) · «Parajanov street , Bldg 1, Yerevan, Armenia » (23:8) · «Godziny otwarcia» (25:3) · «Pn - ND 10:00 - 18:00» (25:5) · «INFORMACJE DLA ZWIEDZAJĄCYCH» (25:30) · «Poznaj kolekcję dzięki wycieczkom, czatom i innym programom. Każdego dnia oferujemy wycieczki po różnych liniach, wycieczki audio, podczas których można coś zobaczyć i czegoś się nauczyć. Regularnie odbywają się rozmowy z zaproszonymi prelegentami i moderatorami. Więcej szczegółów można znaleźć na stronie muzeum.» (25:31)
Przyjaciele: «Przyjaciele» (29:21) · «(1924-1990)» (29:171) · подписи: «federico fellini» (54:371/46:16), «yev sen loran», «Andriej Tarkowski», «Jean-Luc Godard», «Andrzej Wajda», «Michelangelo Antonioni».
Футер: «Idea and design by Valeriia Malashevska» · «Projekt PRŻ PROJ, obejmujący stronę internetową, kolaże i plakaty, został wymyślony i zaprojektowany przez Valeriię Malashevską jako praca magisterska na Uniwersytecie Marii Curie-Skłodowskiej w Lublinie, Wydział Artystyczny, 2024 r.» · «valeria08.ink@gmail.com».

## 4. Дельта между состояниями
Один фрейм, состояний нет. Внутри — карусель bio (Component 31): на макете показан только первый слайд (левая стрелка серая/неактивна, правая чёрная). Другие слайды в этом фрейме отсутствуют (искать в вариантах компонента 159:141 / соседних фреймах — вне задачи).

## 5. Интерактивные элементы

Шапка/навигация (на главной):
- Пункты «Art Project», «Galeria», «Filmy» — одинаковый вид (белый Murecho Bold 24 uppercase), **ни один не выделен: активного пункта и подчёркивания на главной нет** (подчёркнут только «Valeriia Malashevska» внизу hero). Логотип-слово «Paradżanow Project» слева — текст-ссылка на главную (гипотеза), не логотип-графика. Прототипные ссылки (prototype reactions) MCP не отдал — пункты ведут (гипотеза): Art Project → страница art project, Galeria → галерея, Filmy → список фильмов.
- Логотип «PRŻ PROJ» (14:38) — SVG, не ссылка (нет `<a>`).

Кнопки/ссылки (из `<a>`/`<button>` в контексте):
- 5:8 «Valeriia Malashevska» — `<a>` → https://www.behance.net/valeriamalashe (подчёркнут, цвет white).
- 381:2938 фото Museum → `<a>` https://parajanovmuseum.am/ (иконка-курсор в белом круге справа внизу фото подсказывает «кликабельно»).
- 352:2424 (Galeria-плитка) и 352:2425 (Filmy-плитка) — `<button>`: ведут (гипотеза) на Galeria и Filmy. 352:2423 (Art Project фото) — `<div>`, не button, но по смыслу ведёт на Art Project (гипотеза).
- 159:117 (правая стрелка bio) — `<button>`: следующий слайд (гипотеза); 159:139 (левая, серая) — не button в контексте, т.е. неактивна на первом слайде.
- Соцсети (внизу, y=8044, 67×67, белые иконки): 468:3715 (x=1122, 68×67) — иконка Instagram по виду, но `<a>` ведёт на **https://www.figma.com/design/QQ8RxQkI5wcDPCWsRXuhYA/Dyplom?node-id=465-3723&t=…** (ссылка на макет Figma, а не на Instagram — вероятно, заглушка); 468:3717 (1215, 67×67) LinkedIn → https://www.linkedin.com/in/valeriia-malashevska-292ba0281?lipi=…; 468:3719 (1307, 68×67) Behance → https://www.behance.net/valeriamalashe; 468:3721 (1400, 67×67) Pinterest → https://pin.it/3mS7BNqn4. Все `target=_blank`.
- Email 468:3711 — просто текст.
- Ховеров в макете нет (вариантов не видно).

### Что такое 468:3715 'Frame'
Символ/frame 68×67 на (1122,8044) — первая из четырёх соц-иконок (Instagram-глиф, SVG imgFrame3), внутри `<a>` → ссылка на Figma-файл «Dyplom». Не декор.

### Карта в Museum
Карты нет. Слева — **растровая фотография** (музейный плакат «MAESTRO / KODAK» со стеной, 811×923, у 381:2938) с SVG-иконкой курсора (381:2929/…:2909 "Component 188"). Единственная «карта-подобная» функция — ссылка на parajanovmuseum.am. Если ожидалась интерактивная карта — в макете её нет (вопрос 2).

## 6. Ассеты (node id — растр/вектор — размер на экране — примечания)
| id | имя | тип | размер | заметки |
|---|---|---|---|---|
| 14:38 | LOGO | вектор (SVG) | 972×156 | PRŻ PROJ + красный гранат |
| 86:236 | IMG_8834 1 | растр PNG | 746×765 | O projekcie, object-cover, выходит за правый край на 4px |
| 14:95/96/97 | Rectangle 9/10/11 | растр PNG ×3 | 488×510 | карточки Idea/Estetyka/Wiedza, object-cover |
| 352:2423 | Rectangle 46 | растр | ≈ 488×… (inset 12.63/59.79/18.74/1.59%) | Art Project плитка |
| 352:2424 | Rectangle 49 | растр (button) | ≈ 394×… | Galeria плитка |
| 352:2425 | IMG_8915 5 | растр (button), object-bottom | ≈ 394×… | Filmy плитка |
| 352:2418/2419 | линии | вектор, повернуты 90° | высота ≈ 782 | вертикальные разделители |
| 159:110 | IMG_8717 1 | растр, кадр с crop (150.93%, left −21.7%) | ≈ 825×880 | bio |
| 159:106 | foto | вектор | 468×321 | рамка/контур в bio (не опознан) |
| 159:139/117 | Component 29/30 | вектор | 19.2×13.8 | стрелки |
| 381:2938 | Component 190 | растр, object-bottom | 811×923 | Museum, ссылка |
| 381:2909 | Component 188 | вектор | ≈ 98×… | курсор-иконка |
| 54:371…54:386 | Component 9/20/21/22/23/24 | растры, кадр с overflow | 474×688 | 6 друзей |
| 29:23 | foto | вектор (3 вектора) | 393×270 | под карточкой, в Przyjaciele, назначение неясно |
| 468:3715/17/19/21 | Frame×4 | вектор SVG | 67–68×67 | соц-иконки |
| 465:3718 | Line 14 | вектор | 1212×0 | линия футера |
| 21:26/27, 23:9, 29:172, 159:111/112/115 | Line | вектор | см. выше | |

## 7. Скрытые слои
Hidden-узлов во фрейме 1:2 нет (в page1.xml нет `hidden="true"`). Но визуально скрыты (перекрыты): 86:246 «Component 27» (пустой, под 381:2938), 29:8 «Rectangle 24» (белый под карточкой 54:371), 29:23 «foto» (вектор под карточкой), 46:16 (дубль подписи).

## 8. Вопросы/неясности
1. Скриншоты сделаны в уменьшенном масштабе (≤1024 px по длинной стороне, фуллфрейм вообще 190×1024). Для pixelmatch 1:1 нужен экспорт в 1× (get_screenshot сам масштаб не принимает).
2. Museum: «Map» как карты нет — на её месте фото-плакат с иконкой-курсором. Подтвердить, что карта не нужна (или она в другом фрейме).
3. 468:3715 (Instagram-иконка) ведёт на Figma-файл, а не на Instagram — оставить как есть, заглушка или нужен реальный URL?
4. Что показывают 159:106 «foto» (468×321 при 860,301) и 29:23 «foto» — декоративный контур, маска или пустой фрейм?
5. Rectangle 24 (29:8, белый) и 86:246 (пустой инстанс) — артефакты макета?
6. Точный hex красного граната в логотипе и цветов линий/серых стрелок (#8A92A0 для стрелки предположен по цвету под-фото) не снят; в design_context они SVG.
7. Нет ховеров/active-вариантов меню; нет указания, куда ведут пункты меню и плитки (reactions недоступны).
8. Опечатка «Seiergiej» (14:36) vs «Siergiej» (bio) — копировать как в макете или исправлять?
9. Адаптив отсутствует (только 1512). Сдвиги 1px (Rect 13, Component 31 x=1/w1513) и перекрытие 3px Rect 13/Rect 19 — ошибка макета или намеренно?
10. Точные размеры внутренних элементов Component 182 заданы процентами (inset) — пересчитаны мной приблизительно; при необходимости точнее — get_metadata по 352:2423/2424/2425.
