# Закрытие пробелов инвентаризации (gaps)

Источник: figma_local (get_node / get_text_runs / get_design_context, includePreview=false) + page1.xml. В Figma ничего не менялось. Шрифты и эффекты сняты обходом ВСЕГО Page 1 (105 фреймов верхнего уровня, depth 6, 12 403 узла, из них 3 082 TEXT; усечений не осталось). Глубже depth 6 внутри инстансов не заходили (логотип LOGO = 26 векторов, без текста).

## 1. Art Project, стартовая страница 29:88

### 1.1 Тексты (все цвета белые #FFFFFF, opacity 1, reactions у текстов нет)
| id | текст | шрифт | размер | lineHeight | letterSpacing | выравнивание | textCase |
|---|---|---|---|---|---|---|---|
| 29:91 | Art Project (меню, x998 y45) | Murecho Bold (wght 700) | 24 | AUTO | 0% | left | UPPER (по аналогии с 5:8, прямой проверки 29:91 нет) |
| 415:2705 | art project (нижний заголовок, x25 y869, 402x69) | Rubik Bold (wght 700) | 58 | AUTO | 0% | left | UPPER |
| 29:173 / 29:196 / 29:200 | ashik kerib / cienie zapomnianych przodków / sajat-nowa (под постерами, y726, 402-403x38) | Murecho Bold | 24 | AUTO | 0% | center | UPPER (проверено на 29:173) |
| 29:178 / 29:198 / 29:201 | (1924-1952) / (1952-1966) / (1966-1990) (y762-766, 402x41) | Cambay Regular | 25 | AUTO | 0% | center | ORIGINAL (в тексте скобки и дефис, с хвостовым пробелом) |
| 230:350 / 230:351 | Filmy / Galeria (меню) | Murecho Bold | 24 | AUTO | 0% | left | UPPER |

Фон Rectangle 21 (29:89) = #17171B (r 0.0893 g 0.0892 b 0.1067) = переменная backgraund. Линия Line 5 (415:2706) y830 на всю ширину 1512, Line 3 (29:114) подчёркивание «Art Project» x998 y84 w101.

### 1.2 Кликабельность (prototype reactions)
| узел | ON_HOVER | ON_CLICK |
|---|---|---|
| 230:350 Component 5 «Filmy» | CHANGE_TO 54:276, SMART_ANIMATE, EASE_OUT, 0.3 s | NAVIGATE 191:227 (Fims started page), без анимации |
| 230:351 Component 6 «Galeria» | CHANGE_TO 54:277, SMART_ANIMATE, EASE_OUT, 0.3 s | NAVIGATE 344:2041 |
| 288:2058 LOGO | CHANGE_TO 288:922 (без анимации) | NAVIGATE 1:2 (Home) |
| 438:4839 Component 204 (левый постер, AK, x107) | CHANGE_TO 438:4836 (без анимации) | NAVIGATE 436:3611 (AK старт) |
| 437:4740 Component 202 (центр, CzP, x555) | CHANGE_TO 437:4734 | NAVIGATE 415:2709 (CzP старт) |
| 437:4742 Component 203 (правый, SN, x1003) | CHANGE_TO 437:4733 | НЕТ ON_CLICK (переход на SN старт 490:4619 не задан; это дыра макета) |
Подписи и годы под постерами не кликабельны; кликается только постер (569x403, y143).

### 1.3 Варианты плакатов: в чём разница (ответ: ТОЛЬКО фильтр saturation растра, тот же imageHash, opacity/blend/effects у всех = 1/NORMAL/нет)
Hover-вариант = ЧЁРНО-БЕЛЫЙ (saturation -1), состояние покоя = цветное. Во всех сетах это CHANGE_TO без transition (мгновенно). Первый ребёнок сета = состояние покоя, второй = hover (кроме 376:26xx, где оба называются «Property 1=Default»; покой определён по инстансу: у 378:2723 первый слой 376:2624 имеет saturation 0, т.е. цветной).
| сет | покой (fills.filters) | hover | imageHash (общий для обоих) |
|---|---|---|---|
| 437:4736 Component 202 (CzP на старте) | 437:4735 plakat 1: saturation +0.33 (чуть насыщеннее) | 437:4734 plakat 4: saturation -1 | e1581a2f434045d666284a8b8e28afd54e030894 |
| 437:4737 Component 203 (SN на старте) | 437:4732 plakat 3: saturation 0 | 437:4733 plakat 5: saturation -1 | b5c8b82bb9748964e73d84dd18e0a60fe2af168a |
| 438:4837 Component 204 (AK на старте) | 438:4835 plakat 1 1: saturation 0 | 438:4836 plakat 1 2: saturation -1 | 82f882e42571753acd1ff90745287366b1133ef7 |
| 376:2640 Sajat Nowa plakat (постер для fakty) | 376:2633: saturation +0.229, temperature +0.110 | 376:2634: saturation -1, temperature +0.110 | 24dedc4c0635ae67615b154437868a68bcebc8b4 |
| 376:2641 CzP plakat | 376:2637: все filters 0 | 376:2635: saturation -1 | ec32a4f014aaf3a5b9f79d4bb1243210bcdb4584 |
| 376:2642 Aszik Kerib plakat | 376:2639: все filters 0 | 376:2636: saturation -1 | 663bbcb6e17bdf8a241495661861a43cb559b748 |
Остальные filters (exposure, contrast, tint, highlights, shadows) = 0. У Component 202 у сета есть stroke #974FFF cornerRadius 5 (это рамка component set в редакторе, на экране не видна). Остальные постеры fakty (Andriesz 398:2767, KF 398:2765, LTS 398:2768) устроены сложнее: 398:2767 состоит из двух слоёв (poster 4: contrast +1, saturation 0; poster 1 1: contrast +0.3, saturation -1), разбирать в шаге fakty отдельно.

## 2. SN 9–12: IMG-слои фактов (484:4360, 484:4361, 484:4362, 484:4363)
| id | кадр | родитель | x,y | размер | opacity | fills (paint) | effects | imageHash |
|---|---|---|---|---|---|---|---|---|
| 484:4360 IMG_9561 1 | SN 9 | Group 33 (484:3958) в Group 34 (484:3957) | 60,136 | 545x771 | 1 | IMAGE FILL, blend NORMAL, opacity 1, все filters 0 | нет | 7608296d91512db8bb4e5b7e36320ace85fbbd04 |
| 484:4361 IMG_9563 1 | SN 10 | Group 33 (484:4071) | 59,136 | 545x770.9 | 1 | то же | нет | d428616c35e19e4c76aae0adce1111dc47383b48 |
| 484:4362 IMG_9569 1 | SN 11 | Group 33 (484:4184) | 59,136 | 545x770.9 | 1 | то же | нет | 2e832f396f303e5dea6fdc19683c23c9acf21282 |
| 484:4363 IMG_9567 1 | SN 12 | Group 33 (484:4297) | 59,136 | 545x770.9 | 1 | то же | нет | 6473466799ec059d07fb961becd0dd1a0c72c865 |
Blend mode: на узле и на paint NORMAL; в get_design_context CSS для 484:4360 и 484:4361 нет mix-blend-mode (проверено), для 484:4362/4363 CSS не снимался, но paint blendMode = NORMAL. isMask=false. Слои с фильтрами/тенями/blur не имеют. Z-порядок (дети Group 33, снизу вверх): 1 51993, 2 41, 3 3, 4 86422, 5 889188, 6 2, 7 3, 8 3, IMG_xxxx (ЗАМЕНЯЮЩИЙ слой поверх всех плакатных слоёв 1–8, закрывает их целиком, 545x771 = размер группы), затем тексты nowa и sajat (над IMG, с drop shadow, см. раздел 5), а в Group 34 поверх Group 33 лежит «Siergiej Paradżanow» (484:3969). То есть IMG НЕ накладывается через blend, а просто непрозрачно перекрывает слои 1–8 (сами они остаются под ним). Это снимает вопрос 6 из art-sn.md: «PNG с прозрачной зоной» маловероятен для blend, но прозрачность в самом растре не проверялась.

## 3. Fakty стартовые 378:2705 / 378:2732
Подписи (Frame 33, 378:2717 / 444:5856, x45 y134, 1340x633, clipsContent не проверялся): Murecho Bold (wght 700) 19px, lineHeight AUTO, letterSpacing 0%, center, цвет #FFFFFF, opacity 1, textCase UPPER (проверено на 378:2720), бокс 402x58 (Legenda o Twierdzy Suramskiej и Aszik Kerib y611, остальные y604; постер 402x569 на y10). Тени/эффектов нет. Подписи не кликабельны.
Постеры в ряд, шаг 447-448 px (x12, 459, 907 | 1352, 1799, 2247 на 378:2705; сдвиг -1340 на 378:2732 = перелистывание на следующую тройку). Порядок: Andrijesz (12), Cienie… (459), Kijowskie freski (907), Sajat Nowa (1352), Legenda o TS (1799), Aszik Kerib (2247).
Реакции постеров в 378:2705: ON_HOVER = CHANGE_TO серый вариант (CzP 376:2635; AK 376:2636; SN 376:2634; Andriesz 398:2767; Legenda 398:2768; KF 398:2765). ON_CLICK только у Andriesz (444:5841 → 211:227), CzP (378:2723 → 235:631) и KF (444:5842 → 235:1419); у AK, SN и Legenda клика нет.
Стрелки: Component 146 «вперёд» (378:2730 на старте; 444:5904 на 378:2732) и Component 145 «назад» (444:5908 на 378:2705; 378:2758 на 378:2732), 71x71 (x1396, y320 и y416). Устройство: чёрный круг Ellipse (#000000) 71x71 + вектор-стрелка 34x24, stroke 3.07 px. Активная стрелка: stroke белый #FFFFFF; disabled: stroke #8A91A0 (r 0.541 g 0.571 b 0.628) и НЕТ ON_CLICK. На 378:2705 активна «вперёд» (ON_CLICK → 378:2732, SMART_ANIMATE, easing SLOW, 2.0835 s), «назад» серая disabled. На 378:2732 «назад» активна (ON_CLICK → 378:2705, SMART_ANIMATE SLOW 2.0835 s), «вперёд» серая disabled. Hover обеих = CHANGE_TO варианта 325:1794 / 325:1793 (серый stroke #8A91A0, вес 3.07; т.е. hover подкрашивает стрелку в серый). Component 196 «go back» (453:3725 / 453:3730, x1243 y878, 181x46): текст «go back» Murecho Bold 31.54 UPPER white + стрелка-вектор 25x18; ON_CLICK → 191:227 (Fims started page), ON_HOVER → 404:5125.

## 4. Все шрифты файла (Page 1, 3 082 TEXT-узла)
Число узлов по семействам: Murecho 1 303, Rubik 1 123, Cambay 297, Playfair Display 147, Slackey 22, Spectral SC 12, Martel Sans 6, SONGER SemiExpanded 6, Prosto One 6, Syne 2, Caveat 1; 157 узлов «MIXED» (несколько шрифтов в одном узле, расшифровано ниже). Все цвета в основном белые; исключения: Syne кавычки #DC0000 (250:554, 250:555).
Из запрошенных подтверждены все: Rubik, Murecho, Cambay, Caveat, Playfair Display, Spectral SC, Syne. НЕ упомянутые в брифе, но найденные: Slackey (AK), Martel Sans ExtraBold, SONGER SemiExpanded ExtraBold, Prosto One (подписи-автографы на плакатах CzP/AK/SN), Nova Cut Book и Nova Round Book (заголовок плаката CzP, буквы чередуются), плюс стили Cambay Italic/Bold и Murecho Regular и Rubik Medium.

| family / style | size (px) | lineHeight | letterSpacing | textCase (проверено) | узлов | где используется (пример id, кадр) |
|---|---|---|---|---|---|---|
| Murecho Bold | 24 | AUTO | 0 | UPPER | 881 | меню, подписи, Art Project/Filmy/Galeria, 5:8 (Home); все кадры |
| Murecho Bold | 24 | 30px | 0 | ORIGINAL | 59 | текст фактов fakty (211:255, film fakty ANDRIJESZ 2) |
| Murecho Bold | 24 | 28.68px | 0 | не проверен | 14 | тексты шагов SN (490:4666, SAJAT_NOWA старт) |
| Murecho Bold | 31.5 | AUTO | 0 | UPPER | 104 | «go back» (I453:3735;404:5117, galery/fakty/…); 1 узел 25.0 на Fims start |
| Murecho Bold | 32 | AUTO | 0 | UPPER | 49 | «film» в film ANDRIJESZ (398:2933) |
| Murecho Bold | 19 | AUTO | 0 | UPPER | 58 | подписи галереи (I344:2960;344:2894) и fakty-постеров (378:2720) |
| Murecho Bold | 20 | AUTO / 30px / 145% | 0 | не проверен | 6+6+6 | UWAGA/подсказки (490:4800, 437:4513, 490:4799) |
| Murecho Bold | 36 (UWAGA) + 24 | AUTO | 0 | UPPER | 20 | «UWAGA:» (437:3899), mixed размеры |
| Murecho Bold | 36.5 | AUTO | 0 | не проверен | 1 | цитата 249:544 (kraje start) |
| Murecho Regular | 24 | AUTO | 0 | UPPER | 98 | год/длительность в film ANDRIJESZ (398:2934) |
| Rubik Bold | 58 | AUTO | 0 | UPPER | 805 | заголовки секций (14:34 Home), «(1966-1990)», «Część 2 interakcji» |
| Rubik Bold | 98.1 | AUTO | 0 | UPPER | 38 | «art project» в конструкторе (490:4631) |
| Rubik Bold | 128 | AUTO | 0 | не проверен | 1 | «filmy» (198:323, Fims start) |
| Rubik Bold | 36.5 | 34.2px | 0 | не проверен | 1 | 465:3735 «Idea and design by…» Home |
| Rubik Medium | 2.7 / 3.4 / 5.2 / 5.3 / 5.8 / 6.5 / 7.2 / 7.3 / 9.1 (микро) | AUTO | 0 | UPPER (398:3189) | 340 с лишним | текст внутри постеров (film ANDRIJESZ 398:3189…, film player, componenty) |
| Cambay Regular | 25 | 30px | 0 | ORIGINAL | 235 | основной текст (14:35 Home и все film/kraje) |
| Cambay Regular | 23 | AUTO / 28.68px | 0 | ORIGINAL | 48 / 8 | тексты шагов конструкторов (490:4648; 416:3108) |
| Cambay Regular | 25 | AUTO | 0 | не проверен | 4 | «Godziny otwarcia» (25:3) |
| Cambay Regular | 27.4 | 34.2px | 0 | не проверен | 1 | 465:3742 |
| Cambay Bold | 23 | 28.68px | 0 | не проверен | 1 | 480:4032 (CzP 9) |
| Cambay Regular + Italic (MIXED, один узел) | 23 / 25 | AUTO / 28.68 / 30px | 0 | ORIGINAL | 151 | курсив в тексте: названия фильмов и цитаты (490:4645, 416:3094, 344:2253); МИНИМУМ 2 начертания |
| Playfair Display Bold | 96 | AUTO | +10% (9.6 px) | UPPER | 10 | «ART PROJECT» на плитке Home (I352:2658;352:2426;288:2487) |
| Playfair Display Bold | 38.8 / 38.9 | AUTO | 0 | UPPER | 49 | название фильма на постере film ANDRIJESZ (398:3190) |
| Playfair Display Bold | 14.6 / 14.8 | AUTO | 0 | не проверен | 58 | подзаголовок на постере (398:3194) |
| Playfair Display Bold | 27.7 / 27.8 / 30.9 | AUTO | 0 | не проверен | 30 | постеры film player/componenty (375:2534, 397:2660, 376:2615) |
| Slackey Regular | 91.1 / 92.1 / 122.9 / 124.3 | AUTO | 0 | UPPER | 22 | «Aszik» «Kerib» на плакате AK (442:5748, 442:5749) |
| Spectral SC Bold | 84.6 / 114.2 | AUTO | 0 | UPPER | 12 | «sajat» «nowa» плакат SN (437:4678, 432:3545) |
| Martel Sans ExtraBold | 13.6 / 18.4 | AUTO | 0 | UPPER | 6 | подпись «Siergiej Paradżanow» на плакате AK (442:5758) |
| SONGER SemiExpanded ExtraBold | 13.6 / 18.4 | AUTO | 0 | UPPER | 6 | то же на плакате SN (437:4680, 427:3099) |
| Prosto One Regular | 9.4 / 18.2 | AUTO | 0 | UPPER | 6 | то же на плакате CzP (416:4060, 416:3920) |
| Nova Cut Book + Nova Round Book (чередуются по буквам) | 37.5 / 50.7 | AUTO | 0 | UPPER | 6 | заголовок плаката CzP «CIENIE ZAPOMNIANYCH PRZODKÓW» (416:4059, 416:3919) |
| Syne Bold | 110.5 | AUTO | 0 | UPPER | 2 | кавычки цитаты kraje start (250:554, 250:555), цвет #DC0000 |
| Caveat Bold | 22 | AUTO | 0 | ORIGINAL | 1 | автограф «Siergiej Paradżanow» Home (191:190) |
Примечания: (а) у узлов TEXT textCase задан по-разному даже для одного шрифта (Murecho Bold 24: UPPER или ORIGINAL), поэтому в коде делать text-transform по узлу, а не по шрифту. (б) lineHeight «AUTO» = normal. (в) Размеры вроде 6.49 и 5.19 у Rubik Medium это микро-текст, вставленный в уменьшенные постеры (масштабируется как часть картинки), в вёрстке сайта это растр постера, а не живой текст. (г) Шрифты Slackey, Martel Sans, SONGER, Prosto One, Nova Cut/Round, Spectral SC используются только внутри плакатов конструкторов (их можно не подгружать как веб-шрифты, если плакаты отдаются растром, но живой текст «sajat/nowa/aszik/kerib/заголовок CzP» по макету именно живой).

## 5. Эффекты (тени, блюры): полный обход Page 1, всего 17 узлов, 3 вида
| тип | параметры | узлы | кадры |
|---|---|---|---|
| DROP_SHADOW | color rgba(0,0,0,0.41), offset x 0.587 y 3.520, radius 2.875, spread 0, blend NORMAL, showShadowBehindNode false | 10 TEXT: «nowa»/«sajat» на плакате SN: 437:4678, 437:4679 (SN 8), 484:3967, 484:3968 (SN 9) и такие же в SN 10, 11, 12 | SN 8–12 |
| DROP_SHADOW | rgba(0,0,0,0.41), offset x 0.792 y 4.750, radius 3.880, spread 0 | 2 TEXT: 432:3545 «nowa», 434:3549 «sajat» (крупный компонент плаката SN, 114 px Spectral SC) | componenty (497:4381) |
| LAYER_BLUR | blurType NORMAL, radius 6.6 | 5 RECTANGLE «IMG_8969 1» (847x600, x -334, y0): 217:516 (в 217:515), 217:384, 217:389, 217:431, 217:487 | film fakty ANDRIJESZ 1–5 (211:227, 217:278, 217:317, 217:396, 217:448) |
Внимание: LAYER_BLUR 6.6 размывает фоновую фотографию в панелях ANDRIJESZ (CSS filter: blur(6.6px)). Других теней, внутренних теней, background blur и blend mode (кроме NORMAL) в файле не найдено до depth 6. У стрелок/кнопок теней нет; hover решается сменой stroke цвета/варианта.

## 6. Не закрыто / оговорки
1. Hover-варианты постеров Andriesz (398:2767), KF (398:2765), Legenda (398:2768) на fakty-старте двухслойные с contrast; разбор их фильтров не доведён до таблицы.
2. textCase не проверен у узлов, помеченных «не проверен»; для них действует правило из заметок серий (Murecho/Rubik меню и заголовки = UPPER, Cambay = ORIGINAL).
3. 437:4742 (SN постер на старте Art Project) не имеет ON_CLICK: либо недоделано, либо переход на SN старт 490:4619 нужно добавить по аналогии (решение за заказчиком).
4. Rubik Medium микро-тексты (сотни узлов) это текст внутри уменьшенных постеров и считать их токенами типографики сайта не нужно.
