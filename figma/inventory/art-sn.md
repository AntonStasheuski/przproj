# ART PROJECT: стартовая страница и конструктор плаката «Sajat-Nowa» (серия art-sn)

Статус: данные собраны из page1.xml + get_screenshot (все 14 фреймов) + get_design_context для SN 8 (полностью) и точечно (стрелки, «+», IMG). Затем Figma MCP упёрся в `Rate limit exceeded, please try again tomorrow`. Не снято (помечено в разделе 8): design_context стартовой страницы 29:88, сравнение двух вариантов `Property 1=Default` в 376:2640/2641/2642, содержимое вариантов Component 202/203/204 и PLAKAT SN (стили, эффекты), статус «+» и стрелок в SN 10–12 по узлам (только по скриншотам).

## 1. Фреймы
Все 1512×982, фон прямоугольник #17171B (переменная backgraund). Скриншоты в /Users/anton/Documents/projects/przproj/figma/screens/.

| id | имя | скриншот | роль |
|---|---|---|---|
| 29:88 | art project started page | 29-88__art-project-started-page.png | стартовая страница раздела: 3 плаката |
| 490:4619 | SAJAT_NOWA ART RRJ. | 490-4619__sajat-nowa-art-rrj-start.png | старт конструктора: фон-кресты + интро |
| 490:4670 | SN 1 ART RRJ. | 490-4670__sn-1.png | шаг 1 (слои 1–2) |
| 437:3876 | SN 2 | 437-3876__sn-2.png | шаг 2 (слои 1–3) |
| 437:3971 | SN 3 | 437-3971__sn-3.png | шаг 3 (1–4) |
| 437:4068 | SN 4 | 437-4068__sn-4.png | шаг 4 (1–5) |
| 437:4167 | SN 5 | 437-4167__sn-5.png | шаг 5 (1–6) |
| 437:4268 | SN 6 | 437-4268__sn-6.png | шаг 6 (1–7) |
| 437:4466 | SN 7 | 437-4466__sn-7.png | шаг 7 (1–8, плакат собран, без надписей) |
| 437:4571 | SN 8 | 437-4571__sn-8.png | шаг 8: надписи + 4 «+», «Część 2 interakcji» |
| 484:3908 | SN 9 | 484-3908__sn-9.png | факт «Sajat-Nowy» (открыт «+» справа внизу) |
| 484:4021 | SN 10 | 484-4021__sn-10.png | факт «Muzeum Eczmiadzyn» («+» слева внизу) |
| 484:4134 | SN 11 | 484-4134__sn-11.png | факт «Sofiko Chiaureli» («+» справа вверху) |
| 484:4247 | SN 12 | 484-4247__sn-12.png | факт «kultura» («+» слева вверху) |

## 2. Раскладка и значения

### 2.1 Общий каркас (одинаков во всех 13 фреймах конструктора и в стартовой)
- Фон: Rectangle 0,0 1512×982, #17171B.
- Шапка: LOGO (instance 288:2058-тип) 45,42 218×35; навигация Murecho Bold 24px, uppercase, white, line-height normal: «Art Project» 998,45 (активный: под ним Line 3 998,84, ширина 101, обводка ≈1.5px белая), GALERIA instance (Component 6) 1198,45 96×35, FILMY instance (Component 5) 1349,45 69×35.
- Заголовочная линия под заголовком: Line 5 639,≈253 (frame y=256 с учётом поворота), ширина 873, поворот -0.21°, белая; уходит за правый край (639+873=1512).
- Окно заголовка «TEXT»: 634,130, 715×107 (в SN 1–7 ширина 697–712, неважно), overflow clip. Внутри слайды T1/T2/T3, каждый 712×104 (подложка #17171B + текст).
- Окно текста «text»: 639,278, 722×600 (SN 7–8: 738×600), overflow clip. Внутри слайды t1…t9 по 722 px шагом (подложка Rectangle 75 #17171B 722×566, текст сверху).
- Плакат: 59,136, 545×771 (слои object-cover, все одного размера и в одной точке).
- Стрелки: Component 146 (вперёд) 1396,320 71×71; Component 145 (назад) 1396,416 71×71.
- GO BACK: Component 196 (вариант «Component 194» = белый) 1243,878 181.37×46: SVG-стрелка влево + «go back» Murecho Bold 31.543px uppercase white (текст от x=26.8% ширины).

### 2.2 Шрифты (из design_context SN 8)
- Крупный заголовок T1 «art project»: Rubik Bold 98.076px, uppercase, white, 685×92 (виден только на старте).
- T2 «(1966-1990)» и T3 «Część 2 interakcji»: Rubik Bold 58px, uppercase, white, top=35 в окне заголовка, 357×63 / 656×62.
- Интро t1: Murecho Bold 24px, uppercase, white. «UWAGA:» Murecho Bold 36px #DC0000, остальное 24px white; блок «UWAGA…» 669×184 на y=181 (в старте y=149).
- Тексты истории t2…t8: Cambay Regular 23px, line-height normal, white, 718×576, курсив Cambay Italic для названий и цитат. Позиция в слайде x+4, y=12.
- t9 / интро «Użyj myszki…»: Murecho Bold 20px, line-height 30px, uppercase, white, 706×540.
- Надписи на плакате: «sajat» и «nowa» Spectral SC Bold 84.613px, uppercase, center, white, text-shadow 0.587px 3.52px 2.875px rgba(0,0,0,0.41). «sajat» центр x=331.95 (в координатах фрейма), top 141.28; «nowa» центр x=331.74, top 231.04. Подпись «Siergiej Paradżanow»: SONGER SemiExpanded ExtraBold 13.61px, uppercase, center x=331.34, top 854.06, ширина 324.1, white.
- Факт-карточки (SN 9–12) t5: 722×576 на 639,290, подложка Rectangle 75 #17171B 722×566 на 639,300, текст 643,290 718×576 (Cambay 23px, как t2–t8).
- Токены: white #FFFFFF, #17171B, gray #8A92A0 (стиль «gray»), красный «UWAGA» #DC0000, black #000.

### 2.3 Стартовая страница 29:88 (art project started page)
- Rectangle 21 0,0 1512×982, #17171B. Шапка как выше.
- Три плаката-instance (403×569, y=143): Component 204 x=107 (Ashik Kerib), Component 202 x=555 (Cienie zapomnianych przodków), Component 203 x=1003 (Sajat-Nowa). Сопоставление по позиции под подписями; зазор между плакатами 45px (107+403=510, 555; 958, 1003), поля слева 107 и справа 1512-1406=106.
- Подписи (text): названия 402/403×38 на y≈724–726: «ashik kerib» 108,726; «cienie zapomnianych przodków» 555,724; «sajat-nowa» 1003,726 (на экране uppercase, bold, white, по центру колонки); годы 402×41 на y≈762–766: «(1924-1952)» 107,766; «(1952-1966)» 555,762; «(1966-1990)» 1003,764 (обычный вес, white, центр).
- Нижний блок: Line 5 0,830 ширина 1512 (полная, прямая); крупный заголовок «art project» 25,869 402×69 (uppercase, Rubik-подобный bold, white).
- Шрифты подписей/заголовка снять не удалось (rate limit): визуально Murecho Bold для названий и заголовка, годы — светлее.

### 2.4 Старт конструктора 490:4619
- Плакат: только «1 51993» (фон из крестов, 545×771 на 59,136), без группы.
- Заголовок: окно показывает T1 «ART PROJECT» (T1 x=3, T2 x=715, T3 x=1427 в окне 715 px).
- Текст: t1 (интро) виден, t2…t9 стоят справа вплотную.
- Стрелка вперёд 490:4667 (вариант «Component 142», svg 330a9d65…), стрелка назад 490:4668 (svg 5c9bc099…): обе чёрный круг + белая стрелка. Назад на старте НЕ отключена (см. вопросы).

### 2.5 Слои плаката (одинаковы во всех шагах; 545×771 на 59,136; в design_context нет mix-blend, opacity, маски: обычные PNG с object-cover)
| № | имя слоя (id в SN 8) | что рисует |
|---|---|---|
| 1 | `1 51993` 437:4670 | фон: тёмные кресты с жёлтой обводкой (есть на старте) |
| 2 | `2 41` 437:4671 | центральный красный гранат (разрез) |
| 3 | `3 3` 437:4672 | гранат слева (тёмный, обрезан по краю) |
| 4 | `4 86422` 437:4673 | гранат сверху |
| 5 | `5 889188` 437:4674 | гранат справа |
| 6 | `6 2` 437:4675 | золотая контурная обводка на гранатах (на шаге 5 гранаты получают кант) |
| 7 | `7 3` 437:4676 | цветы (два симметричных куста слева/справа внизу) |
| 8 | `8 3` 437:4677 | фигура Sajat-Nowa в головном уборе (внизу, по центру) |
Назначение слоёв выведено из скриншотов (дельта «слой появился на шаге N» точная по XML, описание содержимого визуальное).

## 3. Тексты (дословно)

### Старт конструктора (t1, 490:4799/4800)
- «Stwórz plakat dla filmu “sajat-nowa” klikając na strzałki z boku i dowiedz się więcej o okresie życia Paradżanowa w armenii.» (uppercase)
- «UWAGA:» + «Po utworzeniu plakatu będziesz mógł wejść z nim w interakcję, dzięki której dowiesz się więcej interesujących faktów na temat filmu.» (в SN 8 в скрытом сдвинутом слайде t1 написано «w interaktywną interakcję…», на старте — «w interakcję»: разночтение)
- Заголовки: T1 «art project», T2 «(1966-1990)», T3 «Część 2 interakcji».

### Шаги историй (окно text, Cambay 23). Полные тексты лежат в именах text-узлов page1.xml; ниже начало и id (узлы SN 8: 490:4597…4615)
- t2 (SN 1, 437:… в SN1 490:4808): «W tym samym czasie, po wydarzeniach z 1966 roku w Kijowie (czytaj w sekcji *Cienie zapomnianych przodków*) wszystkie kolejne projekty reżysera… …To bezgraniczna starożytność, czystość, wielkość”.»
- t3 (SN 2): «W 1968 r. Siergiej Paradżanow rozpoczął nowy etap w swojej karierze. Jego film biograficzny o Sajat Nowie otrzymał negatywne recenzje… …gdzie jego syn był poważnie chory.»
- t4 (SN 3): «8 grudnia 1973 r. kijowska milicja otrzymała raport napisany przez Semena Petryczenkę… …bez innych przekonujących dowodów.»
- t5 (SN 4): «Paradżanow został skazany na 5 lat więzienia o zaostrzonym rygorze… …nad małymi projektami twórczymi.»
- t6 (SN 5): «Paradżanow był więziony w latach 1973-1977, ale został przedterminowo zwolniony… …o uwolnienie Paradżanowa.»
- t7 (SN 6): «Paradżanow został zwolniony 30 grudnia 1977 r. pod warunkiem… …kolegę i przyjaciela.»
- t8 (SN 7): «W 1990 r. Siergiej Paradżanow rozpoczął zdjęcia do swojego nowego autobiograficznego projektu *Spowiedź*… …ormiańskiej sztuki, literatury i nauki» (без точки в конце в макете).
- t9 (SN 8): «Użyj myszki, aby wybrać dowolny z czterech elementów w rogach plakatu (+) i kliknij go, aby dowiedzieć się więcej interesujących faktów o filmie “sajat-nowa”.» (uppercase)
- В старте (490:4666) и SN 1 (490:4829) в сдвинутом слайде t9 лежит ДРУГОЙ, устаревший текст: «Za pomocą myszy można wybrać dowolny element plakatu, który pojawił się przed tym (za wyjątkiem tekstu i fonu) i kliknąć na niego, aby dowiedzieć się więcej interesujących faktów na temat filmu “sajat-nowa”/”barwy granatu”» (не виден; для сайта брать версию SN 8).
Полные дословные строки всех t2–t8 и 4 фактов: node names в /Users/anton/Documents/projects/przproj/figma/page1.xml (атрибут name каждого text-узла содержит полный текст); тексты t2–t8 также выше в design_context SN 8 (узлы 490:4597, 4600, 4603, 4606, 4609, 4612, 4615).

### Факты (SN 9–12, t5-карточка 639,290)
- SN 9, 484:4368, заголовок T3 «Sajat-Nowy»: «Sajat-Nowa był wędrownym bardem, który podróżował do różnych miejsc na Kaukazie. Jego poezja charakteryzowała się głębokim uczuciem, subtelnym liryzmem i mądrością. Poeta posługiwał się różnymi gatunkami, takimi jak teksty miłosne, poezja religijna i satyra społeczno-polityczna. Sajat-Nowa był również znany jako muzyk. Biegle władał różnymi instrumentami muzycznymi i wykonywał swoje pieśni, często akompaniując sobie na saze. Pochodzenie jego pseudonimu do dziś pozostaje tajemnicą. Często interpretuje się go jako perskie wyrażenie „sayyâd-i navâ”, oznaczające „łowcę pieśni”. Jego wyjątkowość polega na tym, że komponował swoje pieśni w języku ormiańskim, gruzińskim i tatarskim, które były uważane za azerbejdżańskie aż do XX wieku. Istnieje rękopis z 1765 roku, w którym Sajat Nowa zapisał swoje utwory w tych trzech językach. Obecnie istnieje 128 utworów w języku azerbejdżańskim, 63 w języku ormiańskim i 35 w języku gruzińskim.»
- SN 10, 484:4371, T3 «Muzeum Eczmiadzyn»: «W filmie wykorzystano nie tylko unikalne skarby kultury ormiańskiej, ale także najcenniejsze zbiory gruzińskich muzeów, które mają ogromne znaczenie dla historii Gruzji. Na przykład świątynia kultury gruzińskiej, Tryptyk Chaczul, pojawia się na ekranie w scenie z życia dworu Iraklego II, wraz z 12-wiecznym krzyżem, który należał do króla Tamara i był ozdobiony drogocennymi kamieniami. Większość rekwizytów pochodzi z Muzeum Eczmiadzyn. Administracja muzeum przeprowadziła nawet inwentaryzację, określając liczbę kamieni i pereł na każdym przedmiocie.»
- SN 11, 484:4374, T3 «Sofiko Chiaureli»: «Paradżanow dokonał interesującego wyboru aktorów do castingu. W rolę cara Herakliusza II wcielił się ormiański artysta Onik Minasyan, a rodziców Sajat-Nowy zagrali gruzińscy aktorzy: Medea Japaridze i Spartak Bagashvili. Rolę dorosłego Sajat-Nowa powierzono ormiańskiemu tancerzowi Vilenowi Galstyanowi. Kluczową decyzją było jednak zaproszenie do filmu gruzińskiej aktorki Sofiko Chiaureli, która wcieliła się w księżniczkę Annę, zakonnicę, muzę poety, anioła zmartwychwstania i samego poetę. Poeta Sajat-Nowa, w koncepcji Paradżanowa, jest boskim androgynicznym mężczyzną. Tym samym reżyser naruszył nie tylko kryteria narodowe, ale także płciowe. Takie narodowe transgresje są kolejną oznaką głębokiej i przemyślanej intencji filmu.»
- SN 12, 484:4377, T3 «kultura»: «W teledysku Marka Romanka do piosenki Madonny „Bedtime Stories” (1995) wykorzystano symbole z Sajat-Nowa Paradżanowa. Obrazy z Sajat-Nowa, zwłaszcza kostiumy, zostały wykorzystane w filmie „Klatka” (2000) autorstwa projektantki Eiko Ishioki. W 2015 roku chilijsko-amerykański kompozytor Nicolas Jaar wydał album muzyczny Pomegranates jako „alternatywną ścieżkę dźwiękową” do filmu Paradżanowa. Sajat-Nowa stał się podstawą teledysku Lady Gagi „911” (2020). Reżyser teledysku, Tarsem Singh, marzył o zrealizowaniu swojej inspiracji dla filmu Paradżanowa od prawie 20 lat. Film Sajat-Nowa posłużył jako źródło inspiracji dla kolekcji odzieży Antonio Marrasa w 2016 roku i Bicholi Tetradze w 2020 roku.» (курсив в макете: *Sajat-Nowa*, *Pomegranates*, *Sajat-Nowa* перед «stał się…» и «Film *Sajat-Nowa*»)

## 4. Дельта между состояниями

Механика: каждый шаг = (а) новый слой плаката, (б) горизонтальный сдвиг окна текста на 722px (слайды лежат в ряд, окно со clip), (в) на последнем шаге сдвиг окна заголовка на 712px. Плакат и текст идут в ногу: шаг N → слой N+1 и слайд t(N+1).

| переход | слой плаката | текст (окно text) | заголовок (окно TEXT) | прочее |
|---|---|---|---|---|
| старт → SN 1 | +`2 41` (центральный гранат). Слои обернуты в Group «1»; на старте был одиночный `1 51993` | t1 → t2 (слайд t1 ушёл влево на -722) | T1 «ART PROJECT» → T2 «(1966-1990)» (T1 x=-712, T2 x=0) | стрелки те же |
| SN 1 → SN 2 | +`3 3` гранат слева | t2 → t3 | T2 остаётся | |
| SN 2 → SN 3 | +`4 86422` гранат сверху | t3 → t4 | то же | |
| SN 3 → SN 4 | +`5 889188` гранат справа | t4 → t5 | то же | |
| SN 4 → SN 5 | +`6 2` золотой кант на гранатах | t5 → t6 | то же | |
| SN 5 → SN 6 | +`7 3` цветы | t6 → t7 | то же | |
| SN 6 → SN 7 | +`8 3` фигура | t7 → t8 | то же | окно text расширяется до 738 px (под t9 справа) |
| SN 7 → SN 8 | +текст `nowa` 437:4678, `sajat` 437:4679, подпись «Siergiej Paradżanow» 437:4680 (вне Group 33) + 4 «+»: Component 205 (553,854 низ-право), 206 (553,154 верх-право), 207 (75,154 верх-лево), 208 (75,854 низ-лево), 35.19×35.19 | t8 → t9 «Użyj myszki…» (Murecho Bold 20/30) | T2 → T3 «Część 2 interakcji» (T3 x=0) | стрелка «вперёд» (Component 146) становится серой (disabled), см. ниже |
| SN 8 → SN 9 | клик «+» низ-право (205 серый #8A92A0): добавляется `IMG_9561 1` 484:4360 (545×771 на 60,136) поверх `8 3`, под надписями; poster меняет вид: оранжевый фон с вырезами-«капсулами» | окно text заменено одной карточкой t5 (639,290) с фактом | T3 = «Sajat-Nowy» | «+» 205 серый, остальные белые; «вперёд» серая |
| SN 9 → SN 10 | `IMG_9563 1` 484:4361 (59,136): красно-чёрный фон из терновника, фигура в оранжевом | факт «Muzeum Eczmiadzyn» | T3 «Muzeum Eczmiadzyn» | серый «+» = низ-лево (208) |
| SN 10 → SN 11 | `IMG_9569 1` 484:4362: красно-голубой абстрактный орнамент на беже | факт «Sofiko Chiaureli» | T3 «Sofiko Chiaureli» | серый «+» = верх-право (206) |
| SN 11 → SN 12 | `IMG_9567 1` 484:4363: красные гранаты, фигура ч/б | факт «kultura» | T3 «kultura» | серый «+» = верх-лево (207; сдвинут на 88,169 вместо 75,154: 13/15 px, вероятно ошибка макета) |
Слои 1–8 + надписи в SN 9–12 остаются в группе (Group 33 в Group 34, 546×771); IMG-слой лежит последним перед надписями.
Что значит визуально: SN 9–12 = состояния «факт открыт»: каждый угол «+» → свой факт, у каждого свой перекрашенный вариант плаката и своё название в заголовке. Серый «+» = угол, который сейчас раскрыт (однозначно только для SN 9 по узлу 484:3971 #8A92A0; SN 10–12 по скриншотам).
Соответствие угол → факт: низ-право → «Sajat-Nowy» (SN 9); низ-лево → «Muzeum Eczmiadzyn» (SN 10); верх-право → «Sofiko Chiaureli» (SN 11); верх-лево → «kultura» (SN 12). Порядок в макете идёт по часовой от низ-право к низ-лево… фактически: BR, BL, TR, TL.

### Стрелки и disabled
- Стартовое состояние и SN 1–7: обе стрелки чёрные круги 71×71 с белой стрелкой; «вперёд» — svg 330a9d65 (Component 142) на старте. Назад (145, svg 5c9bc099) белая и на старте (в макете НЕ disabled).
- SN 8–12: «вперёд» Component 146 = svg d3755d49: чёрный круг, стрелка серая #8A92A0 (disabled); «назад» остаётся белой. Следовательно на последнем шаге disabled именно «вперёд». На первом шаге (старт) «назад» не показана disabled.
- «+»: белый (#FFF, 2 полосы ≈5.2px толщиной, 14.75% ширины 35.19) / серый #8A92A0 у открытого.

## 5. Интерактивные элементы
- Стрелки вперёд/назад (1396,320 и 1396,416): шаги конструктора.
- 4 «+» на углах плаката: клик открывает факт (SN 9–12). Координаты: TL 75,154; TR 553,154; BL 75,854; BR 553,854; размер 35.19; от краёв плаката (59/604, 136/907) отступ 16px.
- GO BACK: 1243,878; вариант 194 белый; 195 серый (hover/нажатие: см. componenty.md).
- Навигация: «Art Project» активен (подчёркнут Line 3 998,84 ширина 101), «Galeria», «Filmy» без подчёркивания.
- На стартовой странице: клик по плакату (Component 202/203/204) вероятно ведёт на конструктор «Sajat-Nowa» (SN-плакат) и на аналоги для двух других (в макете конструктора только для Sajat-Nowa). Ховер-варианты: см. раздел 8.

## 6. Ассеты (растр, 545×771 на экране, все в frame; имена слоёв по id SN 8)
| node id (SN 8) | имя | тип | где |
|---|---|---|---|
| 437:4670 | 1 51993 | растр PNG (кресты) | старт и все SN |
| 437:4671 | 2 41 | растр PNG | SN 1–12 |
| 437:4672 | 3 3 | растр | SN 2–12 |
| 437:4673 | 4 86422 | растр | SN 3–12 |
| 437:4674 | 5 889188 | растр | SN 4–12 |
| 437:4675 | 6 2 | растр | SN 5–12 |
| 437:4676 | 7 3 | растр | SN 6–12 |
| 437:4677 | 8 3 | растр | SN 7–12 |
| 484:4360 | IMG_9561 1 | растр | SN 9 |
| 484:4361 | IMG_9563 1 | растр | SN 10 |
| 484:4362 | IMG_9569 1 | растр | SN 11 |
| 484:4363 | IMG_9567 1 | растр | SN 12 |
| 427:3090 | PLAKAT SN (в componenty) | frame 735.5×1041.3 | слои 1–8, см. ниже |
| Line 3 / Line 5 | линии | вектор SVG | все |
| Component 142/146/145, Component 194/191 | стрелки/go back | вектор SVG | все |
| «+» Component 205–208 | два прямоугольника, не растр | вектор/shape | SN 8–12 |
Ассеты не скачивались (шаг 2). Растр 8 слоёв одного размера на экране 545×771, исходник вероятно крупнее (в componenty PLAKAT SN те же 8 слоёв 736×1041).

## 7. Скрытые слои
В исследованных фреймах hidden="true" нет. Но «спрятаны» слайды за пределами clip: в окнах TEXT и text все слайды, кроме текущего, лежат вне видимой области (x<0 или x≥722), включая устаревший t9 старта.

## 8. Вопросы и сверка с componenty

### Сверка с componenty (по XML; визуально не сверено из-за rate limit)
- PLAKAT SN 427:3090 (735.5×1041.3): содержит те же 8 слоёв (432:3536…3543) в Group 33 + текст `nowa` 176,129 384×174 и `sajat` 187,8 362×174, подпись 149,970 437×25, нижняя подложка `plakat 2` 427:3108 736×1040, плюс восемь прямоугольников угловых меток 7×48 и 48×7 (434:3550–3557: L-образные уголки в 4 углах, не «+»). Масштаб к конструктору ≈ ×1.35 (736/545). На экране вместо уголков стоят «+». Значения 48×7 на x=720 выходят за 736, вопрос.
- Component 202/203/204 на стартовой — instances; каждый из трёх фреймов содержит ДВА варианта 403×569 на y=20 и y=656: 202: `plakat 4` (верх) и `plakat 1` (низ); 203: `plakat 5` (верх) и `plakat 3` (низ); 204: `plakat 1 2` (верх) и `plakat 1 1` (низ). Скорее всего верхний — hover, нижний — default либо наоборот.
- Sajat Nowa plakat 376:2640 / CzP plakat 376:2641 / Aszik Kerib plakat 376:2642 (442×1253): по два варианта `Property 1=Default` (y=20 и y=664, 402×569 для SN; 403×570/569 для CzP/AK). Оба названы Default, различия по XML не видны (имена и размеры равны).

### Вопросы
1. Разница двух `Property 1=Default` у каждого «plakat»-компонента и вариантов plakat 1/3/4/5, 1 1/1 2 (то ли hover, то ли разные кадры): не снято (rate limit Figma MCP). Нужен get_design_context по 376:2633, 376:2634, 376:2635, 376:2637, 376:2636, 376:2639, 437:4732–4735, 438:4835–4836 или скриншоты 376:2640/2641/2642.
2. Что именно происходит при ховере на плакат на стартовой (прозрачность, цвет, зум, подпись)? Макета ховера как фрейма нет.
3. «Назад» на старте не disabled в макете, хотя назад идти некуда. Считать disabled (серая как «вперёд» в SN 8)? Нужно решение.
4. Не показано поведение «вперёд» после SN 8: disabled, но в SN 9–12 «назад» остаётся белой. Куда ведёт «назад» из факта: к плакату SN 8 или к SN 7?
5. Как закрыть факт и перейти к другому «+»? В макете нет крестика. Можно ли кликнуть другой «+» из SN 9? Серый «+» = активный (по SN 9 подтверждено узлом; для SN 10–12 только по картинке).
6. Z-порядок IMG_9561/9563/9569/9567 (лежат над `8 3`, но на скриншотах фигура «видна»: вероятно PNG с прозрачной зоной) и режим наложения (design_context SN 9 не снят). Нужно уточнить, заменяют ли они слои 1–7 или лежат поверх.
7. Конец sticky-механики: «Component 207» в SN 12 смещён на (88,169) вместо (75,154), ошибка макета или специально?
8. Порядок появления слоёв: слой 6 `6 2` (золотой кант) идёт отдельным шагом (SN 5) без нового элемента, как это показывать (лёгкий fade/кант)? Анимации/prototype reactions недоступны через MCP, переходов в макете нет, «слайд» смоделирован сдвигом (смещения слайдов -722/-712).
9. Устаревший t9 в старте/SN 1 («Za pomocą myszy… /”barwy granatu”») и «w interaktywną interakcję» в t1 SN 8: использовать актуальные тексты (SN 8 для t9, версия старта для t1)?
10. Два заголовка: на старте T1 «ART PROJECT» 98px, на всех шагах T2/T3 58px; во время шагов заголовок «(1966-1990)» не меняется (в тексте «sekcji» эпоха 1966–1990 соответствует третьему плакату).
11. Шрифты стартовой страницы (названия/годы плакатов, нижний «art project») не сняты.
12. Скриншоты и проверка blend/opacity: в design_context SN 8 слои без mix-blend и opacity; в SN 9–12 не проверено.
