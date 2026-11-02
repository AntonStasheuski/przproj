# Заметки по группе 4 (Фильмы)

Охвачено 12 фреймов: 191:227 Fims started page, 198:350 film player 1, 376:2679 film player 2, 378:2705 / 378:2732 film fakty 1/2, и шесть страниц фильмов 398:2905 film ANDRIJESZ, 401:2575 CZP, 401:2991 KF, 401:3400 SN, 401:3809 LoTS, 401:4218 AK, плюс 401:4636 film ANDRIJESZ 2 karusel. Все reactions это тип NODE, без OVERLAY, OPEN_URL, SCROLL_TO, ON_DRAG, ON_PRESS и SET_VARIABLE. Единственный AFTER_TIMEOUT находится на карусельной странице. Во всех записях по одному action на reaction, поэтому actionIndex не использовался. Топ-фреймы своих reactions не имеют.

Метод: у больших страниц (~350 узлов) читал верхний уровень (depth 1-2) и контейнер FILMS (depth 3-4). Контейнеры TEXT, plakaty, PLAKAT, text, foto 1-4 и OBSADA на странице ANDRIJESZ (398:2905) и plakaty на AK2 проверены на depth 2-6 и reactions в них пустые, поэтому на остальных страницах эти статичные контейнеры отдельно не читал. Id кнопок Play в FILMS на страницах CZP (контрольно), KF, SN, LoTS, AK, AK2 выведены по тому же смещению внутри контейнера (+9,+18,+26,+35,+44,+53,+63 от id FILMS), для KF проверен последний (401:3240), для CZP все семь прочитаны напрямую; для SN, LoTS, AK, AK2 ids выведены без прямого чтения, их стоит считать расчётными.

## Общие элементы шапки/навигации (на каждом фрейме группы)
- LOGO: ON_HOVER CHANGE_TO 288:922 (Default, без transition), ON_CLICK NAVIGATE 1:2 Home page.
- Component 2 (Art Project): ON_HOVER CHANGE_TO 54:90, SMART_ANIMATE EASE_OUT 0.3s; ON_CLICK NAVIGATE 29:88 art project started page.
- Component 6 (Galeria): ON_HOVER CHANGE_TO 54:277, SMART_ANIMATE EASE_OUT 0.3s; ON_CLICK NAVIGATE 344:2041 galery started page 1.
- FILMY (инстанс, нет на started page): ON_CLICK NAVIGATE 191:227; у вложенного текста FILMY ещё ON_HOVER CHANGE_TO 404:5253 (на страницах player 1/2, fakty 1/2, фильмы, карусель, в записях как "FILMY (text)" только на player/fakty; на страницах фильмов у вложенного текста ховера нет, в выборке он не попал).
- Component 196 (go back): ON_HOVER CHANGE_TO 404:5125; ON_CLICK, см. ниже по страницам.

## Граф навигации от Fims started page (191:227)
- Component 91 "Tutaj możesz obejrzeć wszystkie najbardziej znane filmy..." -> ON_CLICK NAVIGATE 198:350 film player 1 (hover CHANGE_TO 196:291).
- Component 96 "...interesujące informacje na temat tych filmów" -> ON_CLICK NAVIGATE 378:2705 film fakty 1 (hover 196:303).
- Component 97 "...tradycjach i zwyczajach innych krajów" -> ON_CLICK NAVIGATE 249:520 film kraje started page (hover 196:305).
- Component 196 (go back) -> ON_CLICK NAVIGATE 1:2 Home page (в остальных фреймах группы go back ведёт в 191:227 или player).
- Все NAVIGATE без transition (null). Ховеры без transition, кроме Component 2 и Component 6 (SMART_ANIMATE EASE_OUT 0.3s).

## (f) Плеер: film player 1 (198:350) и film player 2 (376:2679)
- Постеры в Frame 33 имеют ON_HOVER CHANGE_TO (CzP 376:2635, Kijowskie 398:2765, Andriesz 398:2767, Aszik 376:2636, Sajat 376:2634, Legenda 398:2768), без transition.
- player 1, ON_CLICK по постерам: CzP -> 401:2575 film CZP, Kijowskie freski -> 401:2991 film KF, Andriesz -> 398:2905 film ANDRIJESZ. У постеров Aszik Kerib, Sajat Nowa, Legenda в player 1 ON_CLICK НЕТ (только ховер).
- player 2, ON_CLICK по постерам: Aszik Kerib -> 401:4218 film AK, Sajat Nowa -> 401:3400 film SN, Legenda o TS -> 401:3809 film LoTS. У постеров CzP, Kijowskie, Andriesz в player 2 ON_CLICK НЕТ (только ховер). То есть на двух плеерах кликабельные постеры взаимно дополняют друг друга (по три на каждом).
- Кнопка Play (Component 146): на player 1 ON_CLICK NAVIGATE 376:2679 (player 2), SMART_ANIMATE SLOW 2.0835s; ON_HOVER CHANGE_TO 325:1794. На player 2 Play (398:2894) ведёт сам на себя (NAVIGATE 376:2679, SLOW 2.0835s).
- Кнопка Pause/Stop (Component 145): на player 1 (398:2898) ON_CLICK NAVIGATE 198:350 (на себя, SLOW 2.0835s); на player 2 (376:2705) ON_CLICK NAVIGATE 198:350 (player 1), SLOW 2.0835s. Ховер CHANGE_TO 325:1793.
- Component 196 (go back) на плеерах: ON_CLICK NAVIGATE 191:227.
- Тип перехода Play/Pause на плеерах: SMART_ANIMATE, easing SLOW, 2.083538055419922s; это имитация воспроизведения/паузы переключением между player 1 и player 2.

## Страницы фактов: film fakty 1 (378:2705) и film fakty 2 (378:2732)
- fakty 1: Play (378:2730) ON_CLICK NAVIGATE 378:2732 (fakty 2), SMART_ANIMATE SLOW 2.0835s; Pause (444:5908) НЕТ ON_CLICK (только ховер 325:1793).
- fakty 2: Pause (378:2758) ON_CLICK NAVIGATE 378:2705 (fakty 1), SLOW 2.0835s; Play (444:5904) НЕТ ON_CLICK (только ховер 325:1794).
- Постеры fakty 1: CzP -> 235:631 film fakty CZP 1, Andriesz -> 211:227 film fakty ANDRIJESZ 1, Kijowskie -> 235:1419 film fakty KF 1; Aszik, Sajat, Legenda только ховер (CHANGE_TO).
- Постеры fakty 2: CzP -> 235:631, Aszik -> 245:2568 film fakty AK 1, Sajat -> 240:1863 film fakty SN 1, Legenda -> 244:2241 film fakty LoTS 1; Andriesz и Kijowskie только ховер.
- go back (453:3725 / 453:3730) -> 191:227.

## Серия страниц фильмов и карусель кадров
Цепочка по Play (Component 146) и Pause (Component 145), SMART_ANIMATE GENTLE 1.0220937728881836s:
- ANDRIJESZ (398:2905) -> Play -> CZP (401:2575); Pause НЕТ ON_CLICK.
- CZP: Play -> KF (401:2991); Pause -> ANDRIJESZ.
- KF: Play -> SN (401:3400); Pause -> CZP.
- SN: Play -> LoTS (401:3809); Pause -> KF.
- LoTS: Play -> AK (401:4218); Pause -> SN.
- AK: Play -> film ANDRIJESZ 2 karusel (401:4636); Pause -> LoTS.
- ANDRIJESZ 2 karusel (401:4636): Play (401:5000) НЕТ ON_CLICK; Pause (401:5003) -> AK (401:4218).
- Это линейный "плейлист" ANDRIJESZ - CZP - KF - SN - LoTS - AK - karusel, где Play листает вперёд, Pause назад; на первом шаге (ANDRIJESZ) Pause без клика, на последнем (karusel) Play без клика.
- Component 196 (go back): ANDRIJESZ -> 198:350 player 1; CZP -> 198:350; KF -> 198:350; SN, LoTS, AK -> 376:2679 player 2 (разные, в зависимости от того, из какого плеера открывается фильм); karusel -> 198:350 player 1.
- Карусель кадров (401:4636): у Rectangle 45 (401:4638) стоит ON_TIMEOUT: AFTER_TIMEOUT 0.1s NAVIGATE 398:2905 (без transition), то есть страница-карусель сразу (через 0.1s) возвращается на film ANDRIJESZ. Это единственный AFTER_TIMEOUT в группе, никаких ON_DRAG, CLICK по фото/стрелкам внутри карусели в 401:4636 нет (фото foto 1-4 не имеют reactions).
- На всех страницах фильмов во FILMS семь карточек (film A, CZP, KF, SN, LoTS, AK, A) имеют ховер на мини-Play: ON_HOVER CHANGE_TO 361:2407 (Component 184), без ON_CLICK. Карточки не кликабельны.
- На ANDRIJESZ и остальных страницах фильмов Component 2/6/LOGO такие же, как в общих правилах выше. FILMY ведёт на 191:227.

## Где НЕТ ON_CLICK (итог)
- Pause на film ANDRIJESZ (398:3127) и Play на карусели (401:5000).
- Play на fakty 2 (444:5904), Pause на fakty 1 (444:5908).
- Постеры Aszik/Sajat/Legenda на player 1; постеры CzP/Kijowskie/Andriesz на player 2.
- Постеры Andriesz/Kijowskie на fakty 2; Aszik/Sajat/Legenda на fakty 1.
- Мини-Play карточек в FILMS на всех страницах фильмов.
- Страницы kraje (249:520), films fakty по каждому фильму (235:631 и пр.) вне группы.

## Необычное
- Ни одного ON_DRAG/OVERLAY/OPEN_URL/SCROLL_TO.
- Единственный AFTER_TIMEOUT: карусель -> ANDRIJESZ, 0.1s.
- Три разных transition-пресета на кнопках Play/Pause: SLOW 2.08s (плееры и fakty), GENTLE 1.02s (страницы фильмов), EASE_OUT 0.3s (шапка).
- Play на player 2 и Pause на player 1 ведут сами на себя.
