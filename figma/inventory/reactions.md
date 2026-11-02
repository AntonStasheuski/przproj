# Prototype reactions — сводка (Figma «Dyplom (1)», Page 1)

Источник: reactions.json (1735 записей, одна на пару узел+trigger; 105 фреймов верхнего уровня + componenty 497:4381 с вариантами). Сырые куски: parts/reactions_g1..g7.jsonl, заметки по группам — в приложении ниже (parts/notes_g1..g7.md). Ограничение: часть фреймов читалась на depth 1–3 (AK 2–8, CzP 0–6, kraje, fakty Frame 6), глубже reactions в проверенных образцах пусты.

## Уникальные переходы
| Триггер | Тип / easing / duration | Где |
|---|---|---|
| ON_CLICK NAVIGATE (без анимации) | мгновенно | меню (Art Project, Filmy, Galeria), логотип, Go back, плитки, страны kraje, постеры плееров |
| ON_CLICK NAVIGATE | SMART_ANIMATE, SLOW, 2.0835 s | стрелки шагов серий SN, AK, CzP, fakty, galery |
| ON_CLICK NAVIGATE | SMART_ANIMATE, SLOW, 1.25 s | «+» на шагах-развилках SN 8, AK 9, CzP 7 |
| ON_CLICK NAVIGATE | SMART_ANIMATE, GENTLE, 1.022 s | Play/Pause на страницах фильмов (цепочка ANDRIJESZ→…→karusel) |
| ON_CLICK NAVIGATE | SMART_ANIMATE, SLOW, 2.08 s | Play/Pause плееров film player 1/2, film fakty 1/2 |
| ON_DRAG NAVIGATE | SMART_ANIMATE SLOW 2.0835 s | левая стрелка (Component 145) galery 6, CzP 2–11 (на CzP destinationId = null) |
| ON_CLICK CHANGE_TO | DISSOLVE, EASE_OUT, 0.3 s | пагинатор биографии Component 31 (159:130) |
| ON_HOVER CHANGE_TO | без анимации | стрелки, «+», логотип, карточки, плитки, страны (hover красный #DC0000), заголовки разделов |
| ON_HOVER CHANGE_TO | SMART_ANIMATE, EASE_OUT, 0.3 s | шапка Component 2/5/6 (Art Project, Filmy, Galeria; hover добавляет подчёркивание) |
| ON_HOVER CHANGE_TO | DISSOLVE, SLOW, 1.25 s | карточки Component 9, 20–24 (Home) |
| ON_HOVER CHANGE_TO | SMART_ANIMATE, SLOW, 1.278 s | FILMY 227:349 (шапка страниц fakty) |
| ON_CLICK CHANGE_TO | SMART_ANIMATE, GENTLE, 0.2555 s | Component 182 (триптих), старт цепочки |
| AFTER_TIMEOUT CHANGE_TO | SMART_ANIMATE, GENTLE, 0.7666 s (после 0.1 s), затем 0.1278 s (после 0.1 s) или 0.0639 s (после 0.05 s) | Component 182, 12 промежуточных вариантов |
| AFTER_TIMEOUT NAVIGATE | мгновенно, 0.1 s | galery 1.1 -> galery 1; Rectangle 45 в film ANDRIJESZ 2 karusel -> film ANDRIJESZ 398:2905 |
| ON_CLICK SCROLL_TO | — | galery started page 1: Component 145 (491:4960) -> Rectangle 21 (344:2042) |
| ON_CLICK OPEN_URL | новая вкладка | Home: 468:3715 Figma, 468:3717 LinkedIn, 468:3719 Behance, 468:3721 Pinterest, Component 190 (381:2938) https://parajanovmuseum.am/ |
Не встречаются: MOUSE_ENTER, MOUSE_LEAVE, OVERLAY, BACK, SET_VARIABLE, несколько actions в одной reaction. Везде navigation = NAVIGATE или CHANGE_TO.

## Ответы на вопросы
**a) Серый #8A92A0 — hover, не disabled.** Серый вариант всегда назначение ON_HOVER CHANGE_TO из белого/чёрного варианта и сам листовой (reactions нет, disabled-логики и переменных нет). Касается стрелок Component 145/146 (325:1793/1794, серый stroke), «+» (480:3719 -> 480:3720), Go back (404:5124 -> 404:5125), логотипа (288:921 -> 288:922), заголовков разделов 288:2492…2497 (это варианты ART PROJECT/GALERIA/FILMY; hover серый), Component 29/30/91/96/97/185/190. Страны (Component 132–134) hover красный #DC0000. Постеры Component 202–204 (437:4732–4736, 438:4835–4836): hover-вариант = тот же imageHash с saturation -1 (чёрно-белый). Component 182 серого не содержит. На последних шагах серий у серой стрелки вперёд: SN 8–12 — ON_CLICK НЕТ (только hover); AK 9–13 и CzP 7–11 — НЕТ; galery started page 2 — ON_CLICK есть, но ведёт на тот же фрейм (self-loop); fakty шаг 5 (ANDRIJESZ/CZP/KF/SN/LoTS/AK) — ON_CLICK ЕСТЬ, ведёт на шаг 1 (цикл); kraje *4 — ON_CLICK есть, но self-loop (на тот же фрейм). Стрелка назад на SN 8–12, AK/CzP — клик есть.
**b) «+» на последних шагах Art Project.** SN 8: четыре «+» -> SN 9 (205), SN 11 (206), SN 12 (207), SN 10 (208); AK 9: четыре «+» (Component 206–209) -> AK 10–13; CzP 7: четыре «+» (Component 205–208) -> CzP 8–11. Все NAVIGATE SMART_ANIMATE SLOW 1.25 s. На шаге-ветви «+» своей ветви без клика, остальные три ведут на соседние ветви. Вернуться: стрелка назад ведёт на шаг-развилку (SN 8 / AK 9 / CzP 7); «Go back» (Component 196) ведёт на 29:88 (art project started page), на CzP 8, 9, 11 — на 416:3948. Типа BACK нет. Hover «+»: CHANGE_TO 480:3720.
**c) Fakty.** Шаги переключают ТОЛЬКО две круглые стрелки (Component 145 назад, 146 вперёд): ON_CLICK NAVIGATE SMART_ANIMATE SLOW 2.0835 s. Полосы аккордеона без reactions, клика по ним нет. Серии 1->5, на 5 «вперёд» -> шаг 1; на шаге 1 стрелки назад нет. Go back ведёт на film fakty 1 (378:2705). LOGO -> 1:2, FILMY -> 191:227, Art Project -> 29:88, Galeria -> 344:2041.
**d) Главная 1:2.** Меню: Art Project -> 29:88, Filmy -> 191:227, Galeria -> 344:2041; «Paradżanow Project» (Component 26) и сам фрейм имеют ON_CLICK с пустым адресом. Плитки «Do czego służy projekt» (Wiedza, Estetyka, Idea) — без reactions, это НЕ Component 182. Стрелки биографии Component 31: цепочка Frame 7 -> 11 -> 8 -> 9 -> 10, DISSOLVE EASE_OUT 0.3 s, на Frame 10 «вперёд» без клика, на Frame 7 «назад» без реакции. OPEN_URL — см. таблицу.
**e) Component 182 (352:2636).** Это не hover-анимация, а клик-карусель на AFTER_TIMEOUT. Покой: 167 = Art Project (352:2618), 172 = Filmy (352:2625), 181 = Galeria (352:2624). Клик по постеру (CHANGE_TO, GENTLE 0.2555 s) -> 12 промежуточных вариантов по цепочкам, каждый с AFTER_TIMEOUT: 0.1 s -> 0.7666 s GENTLE, затем 0.05/0.1 s -> 0.0639/0.1278 s GENTLE. Заголовки внутри покоя: ART PROJECT -> 29:88, FILMY -> 191:227, GALERIA -> 344:2041. ON_HOVER/MOUSE_ENTER/MOUSE_LEAVE на уровне вариантов нет. Единственный инстанс: 352:2658 на Home (вложенно: Rectangle 49 -> 352:2619, IMG_8915 5 -> 352:2621, GENTLE 0.2555 s). Полные цепочки id — в notes_g7.md.
**f) Фильмы.** Fims started page: три кнопки -> film player 1 (198:350), film fakty 1 (378:2705), film kraje started page (249:520). Плееры: на player 1 кликабельны постеры CzP, Kijowskie, Andriesz; на player 2 — Aszik, Sajat, Legenda (остальные только hover); Play/Pause переключают плееры SMART_ANIMATE SLOW 2.08 s. Страницы фильмов: ANDRIJESZ -> CZP -> KF -> SN -> LoTS -> AK -> karusel: Play вперёд, Pause назад, SMART_ANIMATE GENTLE 1.022 s (Pause на ANDRIJESZ и Play на karusel без ON_CLICK). Карусель кадров: единственный AFTER_TIMEOUT 0.1 s на Rectangle 45 -> film ANDRIJESZ; ON_DRAG/OVERLAY нет. Мини-Play в блоке FILMS для SN, LoTS, AK, karusel выведены по смещению id (проверен напрямую один: 401:3240).

## Аномалии прототипа
SN 2: у стрелки назад нет ON_CLICK. CzP 2–11: левая стрелка с ON_DRAG на destinationId=null. CzP 6: ON_HOVER дважды (CHANGE_TO и NAVIGATE на 416:3727), ON_CLICK ведёт на CzP 1. AK 10–13: стрелка назад ведёт на AK 9. CzP 4: два «go back» (416:3648 только hover, 437:4762 с кликом). AK 2: стрелка вперёд — Group 10 (325:2511) только ON_CLICK. AK 3–5, CzP 1 — нет LOGO. galery 1/1.1: стрелки без ON_CLICK. Шесть plakat-наборов: variantProperties не читаются (одинаковое «Property 1=Default»).

---
# Приложение: заметки по группам


## Группа g1

# Заметки по группе g1 (Home page, galery*, art project started page)
Файл данных: reactions_g1.jsonl (200 записей: по одной на пару узел+trigger). Снимал get_node (fields reactions, depth 6) по каждому фрейму, у Home читал по секциям (depth 1, затем точечно truncated-узлы). Актионов с actions[] > 1 нигде не встретил. Дополнительно (вне списка фреймов, но нужно для ответа) прочитал определения вариантов Component 31 (159:130) и записал их с frameId 159:130.

## Общая схема шапки (у всех фреймов группы, кроме Home)
- Component 2 (Art Project): ON_HOVER → CHANGE_TO 54:90 (SMART_ANIMATE EASE_OUT 0.3), ON_CLICK → NAVIGATE 29:88 (art project started page).
- Component 5 (Filmy): ON_HOVER → CHANGE_TO 54:276 (SMART_ANIMATE EASE_OUT 0.3), ON_CLICK → NAVIGATE 191:227 (Fims started page).
- LOGO: ON_HOVER → CHANGE_TO 288:922 (без анимации), ON_CLICK → NAVIGATE 1:2 (Home page). На Home у «LOGO» (14:38) реакций нет.
- Component 196 «go back» (во всех galery*): ON_HOVER → CHANGE_TO 404:5125, ON_CLICK → NAVIGATE (см. ниже, куда).
- Component «galeria» (493:49xx в galery 1…6 и 1.1): ON_HOVER → CHANGE_TO 493:4986, ON_CLICK → NAVIGATE (куда, см. ниже).
- На art project started page вместо Component 2 стоит Component 6 (Galeria): hover 54:277 (SMART_ANIMATE EASE_OUT 0.3), click → 344:2041 (galery started page 1).
- Все NAVIGATE между фреймами без transition (transition = null), кроме стрелок галереи.

## (d) Home 1:2 — навигация
- Меню шапки: Art Project (Component 2, 54:93) → 29:88 art project started page; Filmy (Component 5, 54:284) → 191:227 Fims started page; Galeria (Component 6, 54:286) → 344:2041 galery started page 1. Все NAVIGATE без transition; hover — CHANGE_TO SMART_ANIMATE EASE_OUT 0.3.
- Заголовок «Paradżanow Project» (Component 26, 288:837 с вложенным 288:838): ON_CLICK с action NODE/NAVIGATE и destinationId = null (пустая/недонастроенная ссылка, никуда не ведёт).
- На самом фрейме Home: reaction ON_CLICK с action null (пустая).
- Плитки «Do czego służy projekt»: слои «Wiedza» (14:115), «Estetyka» (14:116), «Idea» (14:117), тексты 14:90, 14:121, 14:122 и Rectangle 8/9/10/11 — это обычные TEXT/RECTANGLE без единой реакции. Component 182 к ним отношения не имеет (см. (e)).
- Фото-плитки «Przyjaciele»: Component 9 (54:371 → 54:316), Component 20 (54:374 → 54:345), 21 (54:377 → 54:347), 22 (54:380 → 54:349), 23 (54:383 → 54:351), 24 (54:386 → 54:353): только ON_HOVER CHANGE_TO, transition DISSOLVE SLOW 1.2501 s; ON_CLICK нет. Component 27 (86:246, 0 детей) ON_HOVER → 86:243 «Property 1=IMG_8837 1», DISSOLVE SLOW 1.25, resetInteractiveComponents true.
- Блок музея (Component 190, 381:2938): ON_HOVER → CHANGE_TO 381:2934; ON_CLICK → OPEN_URL https://parajanovmuseum.am/ (новая вкладка). Вложенный Component 189 (381:2938;381:2929): ON_HOVER → CHANGE_TO 95:80 «Property 1=IMG_8837 1».
- Все OPEN_URL (action URL, openInNewTab true): иконка 468:3715 (Frame/COMPONENT, vector 465:3724) → https://www.figma.com/design/QQ8RxQkI5wcDPCWsRXuhYA/Dyplom?node-id=465-3723&t=DlzXmbNnMfu6S9lT-4 ; 468:3717 → LinkedIn (https://www.linkedin.com/in/valeriia-malashevska-292ba0281?lipi=...); 468:3719 → https://www.behance.net/valeriamalashe ; 468:3721 → https://pin.it/3mS7BNqn4 ; Component 190 → https://parajanovmuseum.am/ . Других URL в группе нет.
- Стрелки биографии, Component 31 (инстанс 159:141 на Home, сет 159:130, 5 вариантов): на Home у инстанса реакций нет, но внутри есть Component 30 (стрелка «вперёд», 159:141;159:117): ON_HOVER → 95:701 (Vector 4), ON_CLICK → CHANGE_TO 159:126 (Frame 11), DISSOLVE EASE_OUT 0.3. Текущий вариант инстанса — Frame 7 (159:125), у него нет стрелки «назад» с реакцией (Component 29 там обычный FRAME). Цепочка вариантов (из определений сета): Frame 7 (159:125) —next→ Frame 11 (159:126) —next→ Frame 8 (159:127) —next→ Frame 9 (159:128) —next→ Frame 10 (159:129). Стрелки «назад» (Component 29; hover → 95:699 Vector 3): Frame 11 → 159:125; Frame 8 → 159:126; Frame 9 → 159:127; Frame 10 → 159:128. Все клики: CHANGE_TO, DISSOLVE, EASE_OUT, 0.3 s. В последнем варианте Frame 10 стрелка «вперёд» (95:724) имеет ТОЛЬКО ON_HOVER, ON_CLICK нет (конец серии).
- Ошибка/необычное: у 29:88 ON_CLICK у Component 202/204 ведёт на 415:2709 и 436:3611 (CzP / ASZIK_KERIB ART PROJ.), Component 203 — только hover (см. ниже).

## (e) Component 182 (сет 352:2636)
- Единственный инстанс на всей странице: 352:2658 на Home (x 0, y 2825, 1512x982, вариант по умолчанию с Rectangle 46/49, IMG_8915 5, ART PROJECT). Через find_nodes по всей странице других инстансов нет (ни в galery*, ни в art project started page). Сам инстанс реакций не имеет; реакции у вложенных:
  - Rectangle 49 (I352:2658;352:2424) ON_CLICK → CHANGE_TO 352:2619 «Property 1=Component 173», SMART_ANIMATE GENTLE 0.2555 s.
  - IMG_8915 5 (I352:2658;352:2425) ON_CLICK → CHANGE_TO 352:2621 «Property 1=Component 176», SMART_ANIMATE GENTLE 0.2555 s.
  - ART PROJECT (…;352:2426): hover → 288:2492 (Default), click → 29:88.
  - Component 2 / 5 / 6 внутри — как обычное меню (29:88 / 191:227 / 344:2041).
- Это блок-превью разделов на Home (большой блок Art Project + две плитки), а не плитки «Do czego».

## Галерея
- galery started page 1 (344:2041): плитки с реакциями ON_CLICK (инстансы внутри PHOTO/Frame 19): Component 161 (352:2687, IMG_8838 3 «variation on a theme…») → galery 1 (325:2755); Component 162 (352:2690, IMG_8840 «gioconda…») → galery 2 (344:2288); Component 163 (352:2693, IMG_8841 «my father’s portrait…») → galery 3 (344:2439). Component 164 (mother in a fur coat), 165 (IMG_8843), 166 (paradjanov-04) — только ON_HOVER CHANGE_TO (344:2911/2912/2913), ON_CLICK нет. У всех плиток hover: 161→344:2908, 162→344:2909, 163→344:2910 и т.д. без анимации.
- galery started page 2 (344:2188): клик есть у прямоугольника IMG_8842 1 внутри Component 164 (I352:2698;344:2897) → galery 4 (344:2532) — сам инстанс 164 имеет только hover; Component 165 (352:2699) → galery 5 (344:2625). Component 161/162/163/166 — только hover.
- Переход со стартовой 1 на 2: Component 146 (491:4959, стрелка вперёд) ON_CLICK → NAVIGATE 344:2188, SMART_ANIMATE, easing SLOW, 2.0835 s. На странице 2 Component 146 (491:4967) ON_CLICK → 344:2188 ТО ЖЕ САМОЕ (self-loop, переход на себя, SMART_ANIMATE SLOW 2.0835). Component 145 (стрелка назад): на странице 1 (491:4960) ON_CLICK → SCROLL_TO 344:2042 (Rectangle 21, прокрутка к верху фрейма, не NAVIGATE); на странице 2 (491:4968) → 344:2041, SMART_ANIMATE SLOW 1.2501 s.
- Стрелки внутри серии galery: 146 «вперёд»: galery 1 → galery 2, 2 → 3, 3 → 4, 4 → 5, 5 → 6 (493:5007), 6 → galery 1.1 (493:5111); все SMART_ANIMATE SLOW 2.0835 s. 145 «назад»: galery 2 → 1, 3 → 2, 4 → 3, 5 → 4, 6 → 5, те же параметры. galery 1.1 (493:5111) имеет фрейм-реакцию AFTER_TIMEOUT 0.1 s → NAVIGATE 325:2755 (galery 1), без transition — «петля/перезагрузка» после galery 6.
- «+»: узла-плюса с реакциями в этих фреймах нет (есть только стрелки Component 145/146, обозначения Component 137/138 внутри).
- go back (Component 196): galery 1, 2, 3 и 1.1 → 344:2041 (стартовая 1); galery 4, 5, 6 → 344:2188 (стартовая 2); на стартовой 1 → 1:2 (Home); на стартовой 2 → 1:2 (Home). galeria (493:49xx): galery 1/2/3 → 344:2041; galery 4/5/6/1.1 → 344:2188 (в galery 1.1 «go back» → 344:2041, а «galeria» → 344:2188).
- Нестандартное: ON_DRAG у Component 145 в galery 6 (493:5042) → galery 5 (344:2625), SMART_ANIMATE SLOW 2.0835, дублирует ON_CLICK.

## У каких стрелок (Component 145/146) НЕТ ON_CLICK (только ON_HOVER)
- galery 1 (325:2755): Component 145 (344:2409) — нет ON_CLICK (нет «назад» с первой галереи); 146 (331:2058) имеет.
- galery 1.1 (493:5111): и 145 (493:5150), и 146 (493:5149) — только hover (ON_CLICK нет; фрейм уходит сам по AFTER_TIMEOUT).
- galery started page 1: 145 имеет ON_CLICK, но это SCROLL_TO, а не NAVIGATE.
- galery started page 2, galery 2, 3, 4, 5, 6: у обеих стрелок ON_CLICK есть.
- art project started page: стрелок нет. Component 203 (437:4742) на art project started page — только hover, без ON_CLICK (у Component 202 → 415:2709, Component 204 → 436:3611).

## Прочее
- Все пункты на галерейных фреймах без внутри-деталей: reactions у вложенных TEXT/RECTANGLE (кроме указанных IMG_8842 1 в 164 и вложенных в инстансы) пустые. LOGO развернут не глубже чем нужно (у самого инстанса реакции записаны).
- Dest-имя 86:243 и 95:80 одинаковое «Property 1=IMG_8837 1» (разные компоненты-варианты). Все остальные destinationName найдены по page1.xml или get_node.


## Группа g2

# Группа g2: Art Project, серия SAJAT_NOWA / SN (13 фреймов, 185 записей reactions)

## Общее на всех 13 фреймах
- Шапка: Component 5 (Filmy) ON_HOVER CHANGE_TO 54:276 (Component 3, SMART_ANIMATE, EASE_OUT, 0.3 с), ON_CLICK NAVIGATE на 191:227 (Fims started page, без перехода). Component 6 (Galeria) аналогично: ховер 54:277 (Component 4, SMART_ANIMATE EASE_OUT 0.3 с), клик на 344:2041 (galery started page 1). LOGO: ховер CHANGE_TO 288:922 (Default, без перехода), клик NAVIGATE на 1:2 (Home page).
- Component 196 («go back», текстовая кнопка): ховер CHANGE_TO 404:5125 (Component 195, без перехода), ON_CLICK NAVIGATE на 29:88 (art project started page), без перехода. Есть на всех 13 фреймах.
- Стрелка вперёд Component 146: ховер CHANGE_TO 325:1794 (Component 144, без перехода). Стрелка назад Component 145: ховер CHANGE_TO 325:1793 (Component 143, без перехода). Клики стрелок: NAVIGATE, SMART_ANIMATE, easing SLOW, duration 2.083538 с.
- «+» (Component 205-208, только SN 8-12): ховер CHANGE_TO 480:3720 (Property 1=Group 37, без перехода), клик NAVIGATE, SMART_ANIMATE, SLOW, 1.250123 с.
- Необычного нет: нет ON_DRAG, AFTER_TIMEOUT, OVERLAY, SCROLL_TO, OPEN_URL, нет нескольких actions в одной reaction (actionIndex нигде не нужен). Серая стрелка = Component 145/146 по ховер-вариантам; прямая привязка «серая/цветная» из reactions не читается, трактую обе стрелки как пару назад/вперёд.

## Граф шагов серии (стрелки)
- SAJAT_NOWA (490:4619) вперёд -> SN 1 (490:4670). Назад: стрелка Component 145 есть, но ON_CLICK нет (только ховер).
- SN 1 вперёд -> SN 2; назад -> SAJAT_NOWA.
- SN 2 вперёд -> SN 3; назад: ON_CLICK НЕТ (Component 145, 437:3925, только ховер). Выбивается из серии, вероятно, пропуск (должно быть -> SN 1).
- SN 3 -> SN 4 / назад SN 2. SN 4 -> SN 5 / назад SN 3. SN 5 -> SN 6 / назад SN 4. SN 6 -> SN 7 / назад SN 5. SN 7 -> SN 8 / назад SN 6.
- SN 8 (437:4571): вперёд ON_CLICK НЕТ (437:4619 только ховер); назад -> SN 7 (437:4466).
- SN 9, 10, 11, 12: вперёд ON_CLICK НЕТ (ховер-только); назад Component 145 -> SN 8 (437:4571), SMART_ANIMATE SLOW 2.08 с.
- Тип у всех шаговых кликов: NAVIGATE (не CHANGE_TO), SMART_ANIMATE, SLOW, 2.083538 с.

## (a) Серая стрелка на последних шагах SN 8-12
- Стрелка вперёд (Component 146, серая/«следующая»): ON_CLICK НЕТ на SN 8, 9, 10, 11, 12, есть только ON_HOVER (CHANGE_TO 325:1794). Ids: SN8 437:4619, SN9 484:3955, SN10 484:4068, SN11 484:4181, SN12 484:4294.
- Стрелка назад (Component 145) на SN 8-12 ON_CLICK ЕСТЬ: SN8 -> SN 7; SN9-12 -> SN 8.
- Дополнительно: на SN 2 нет клика у стрелки назад; на SAJAT_NOWA нет клика у стрелки назад (там это нормально, шаг первый).

## (b) «+» на SN 8, возврат из факта, ховеры
- На SN 8 четыре «+» (Component 205-208, углы плаката): 205 (484:3896) -> SN 9 (484:3908); 206 (484:3897) -> SN 11 (484:4134); 207 (484:3898) -> SN 12 (484:4247); 208 (484:3899) -> SN 10 (484:4021). Клик NAVIGATE, SMART_ANIMATE, SLOW, 1.25 с. Ховер у всех CHANGE_TO 480:3720 (Group 37), без перехода. Текст на SN 7/8: «выбери один из четырёх элементов (+) в углах плаката».
- Возврат из факта (SN 9-12): (1) стрелка назад Component 145, ON_CLICK -> SN 8 (SLOW 2.08 с); (2) «go back» Component 196 -> 29:88 (art project started page, без перехода), это выход из серии, а не на SN 8; (3) «+» на самом факте: клик по «+» другого факта ведёт сразу на тот факт (перекрёстная навигация фактов), по собственному «+» клика нет.
- Карта «+» на фактах (клик -> цель): SN9: 206->SN11, 207->SN12, 208->SN10, 205 (свой) без клика. SN10: 205->SN9, 206->SN11, 207->SN12, 208 (свой) без клика. SN11: 205->SN9, 207->SN12, 208->SN10, 206 (свой) без клика. SN12: 205->SN9, 206->SN11, 208->SN10, 207 (свой) без клика. Соответствие: 205=SN9, 206=SN11, 207=SN12, 208=SN10.
- Кликом по фону/плакату возврата нет: ни на одном узле нет ON_CLICK кроме перечисленных. Клика «Go back»-через BACK (navigation BACK) нет нигде, везде NAVIGATE.

## Ховеры (итог)
- Все ховеры CHANGE_TO на варианты: 54:276/54:277 (Component 3/4, SMART_ANIMATE EASE_OUT 0.3 с); остальные без transition: 288:922, 325:1793/1794, 404:5125, 480:3720.
- Reactions у фреймов нет, у текстовых слоёв, векторов внутри LOGO и внутри инстансов нет. Reaction у инстансов LOGO записан.

## Итог по отсутствию ON_CLICK
- Стрелка вперёд на SN 8, 9, 10, 11, 12.
- Стрелка назад на SAJAT_NOWA (ожидаемо) и на SN 2 (аномалия).
- Собственный «+» на фактах SN 9 (205), SN 10 (208), SN 11 (206), SN 12 (207).


## Группа g3

# Заметки группа g3 (AK = ASZIK_KERIB ART PRJ., CzP ART PROJ.)

Записей в reactions_g3.jsonl: 372 (25 фреймов). Все actions одиночные (actionIndex не нужен). Все NODE-действия, URL/OVERLAY/SCROLL_TO/AFTER_TIMEOUT нет. Охват: шаги AK 1–8 и CzP 1–6 прочитаны на depth 1 (reactions у прямых детей, плюс у AK 1–2 полностью depth 6); для групп плаката/текста вложенных reactions не обнаружено там, где читалось глубже (AK 1, 2, 3, CzP plakat, AK 9 Frame 65, AK 10–13 depth 2). Для остальных вложенных групп плаката/текста глубже depth 1 не проверялось.

## Общая шапка (на каждом шаге обеих серий)
- Component 5 («Filmy»): ON_HOVER CHANGE_TO 54:276 (SMART_ANIMATE, EASE_OUT, 0.3 с), ON_CLICK NAVIGATE 191:227 «Fims started page» (без анимации).
- Component 6 («Galeria»): ON_HOVER CHANGE_TO 54:277 (SMART_ANIMATE, EASE_OUT, 0.3 с), ON_CLICK NAVIGATE 344:2041 «galery started page 1».
- LOGO: ON_HOVER CHANGE_TO 288:922 (без анимации), ON_CLICK NAVIGATE 1:2 «Home page».
- Component 196 / 197 («go back»): ON_HOVER CHANGE_TO 404:5125, ON_CLICK NAVIGATE 29:88 «art project started page» (на CzP 8, 9, 11 клик ведёт НЕ туда, см. ниже).
- Стрелка вправо Component 146: ON_HOVER CHANGE_TO 325:1794 (без анимации). Стрелка влево Component 145: ON_HOVER CHANGE_TO 325:1793 (без анимации).
- Переходы между шагами стрелками: NAVIGATE, SMART_ANIMATE, easing SLOW, duration 2.083538 с. Переходы по «+»: NAVIGATE, SMART_ANIMATE, SLOW, 1.2501229 с.
- Ховер «+» (Component 205–209): CHANGE_TO 480:3720 «Group 37» (без анимации). Базовый вариант «+» 480:3719 «Group 36» имеет только ON_HOVER CHANGE_TO 480:3720, ON_CLICK у него нет; у 480:3720 reactions пусты, то есть ховер необратим на уровне варианта (возврат = уход курсора).

## AK (ASZIK_KERIB ART PRJ.)
Линейная цепочка 1 -> 2 -> ... -> 9 через стрелку вправо (Component 146), назад на предыдущий через стрелку влево (Component 145). Шаг 1 (436:3611): стрелка влево только ON_HOVER (436:3620 только ON_HOVER, клика нет, назад некуда). Шаги 2–8: правая стрелка -> следующий (SLOW 2.08 с), левая -> предыдущий.
- Шаг 8 (442:5520) -> 9 (444:5774, она же «ART PRJ. 9»).
- Шаг 9 (444:5774, Frame 65 «Group 7» с постером): серая стрелка вправо (442:5626) только ON_HOVER, ON_CLICK НЕТ. Левая стрелка 442:5627 -> 442:5520 (шаг 8). Четыре «+» (в Frame 65 442:5738): Component 209 (488:4496) -> 10 (488:4088), Component 208 (488:4499) -> 11 (488:4196), Component 206 (488:4497) -> 12 (488:4291), Component 207 (488:4498) -> 13 (488:4387); все с hover CHANGE_TO 480:3720 и NAVIGATE SMART_ANIMATE SLOW 1.25 с.
- Шаги 10–13 — «ветви» (каждая со своим текстом), стрелка вправо на всех четырёх (a): только ON_HOVER, ON_CLICK НЕТ (488:4106, 488:4214, 488:4309, 488:4405). Стрелка влево на всех четырёх ведёт на 444:5774 (шаг 9), а не на предыдущую ветвь, SLOW 2.08 с. Component 196 «go back» -> 29:88.
- «+» на шагах 10–13 (в Frame 65), (b): на каждом из четырёх шагов три «+» ведут на остальные ветви, а «+» текущей ветви имеет только hover без клика. Шаг 10: Component 205 (488:4123) hover-only; 206 -> 12 (488:4291); 207 -> 13 (488:4387); 208 -> 11 (488:4196). Шаг 11: 205 (488:4231) -> 10 (488:4088); 206 -> 12; 207 -> 13; 208 (488:4234) hover-only. Шаг 12: 205 (488:4327) -> 10; 206 (488:4328) hover-only; 207 -> 13; 208 -> 11. Шаг 13: 205 (488:4424) -> 10; 206 -> 12 (488:4291); 207 (488:4426) hover-only; 208 -> 11. Соответствие: 205=шаг 10, 206=шаг 12, 207=шаг 13, 208=шаг 11 (на шаге 9 это «209» вместо 205). Вернуться на шаг 9 (ветвления) можно только стрелкой влево (клик ведёт на 444:5774), на Home — LOGO, на «art project started page» — go back. Кнопки «возврата» к первоначальным «+» нет; со всех ветвей можно перейти на любую другую через «+».

## CzP (CzP ART PROJ.)
Шаг 0 (415:2709, «CzP ART PROJ.»): левая стрелка 415:2753 только ON_HOVER (клика нет), правая -> 416:3278. Шаги 1–6: правая -> следующий, левая -> предыдущий (SLOW 2.08 с); шаг 1 левая -> 0.
- Необычное: на левой стрелке (Component 145) шагов 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 есть ON_DRAG NAVIGATE с destinationId=null (SMART_ANIMATE, SLOW, 2.08 с) — пустой/битый переход (в JSONL destinationId=null).
- Шаг 4 (416:3641): две «go back» — Component 196 (416:3648) только ON_HOVER (без клика), и Component 197 (437:4762) hover+click -> 29:88.
- Шаг 6 (416:3815): левая стрелка 416:3824 имеет четыре reaction: ON_DRAG null, ON_CLICK -> 416:3278 (CzP 1, а не шаг 5!), и ON_HOVER дважды: CHANGE_TO 325:1793 и ещё ON_HOVER NAVIGATE -> 416:3727 (шаг 5) (SLOW 2.08 с) — на ховер переход, вероятно ошибка прототипа.
- Шаг 7 (416:3948, постер, группа Group 24 с «+»): серая правая стрелка 416:3956 только ON_HOVER (a: ON_CLICK НЕТ). Левая 416:3957 -> 416:3815 (шаг 6) + ON_DRAG null. Четыре «+»: Component 205 (480:3723) -> 8 (480:3743), 208 (480:3732) -> 9 (480:3991), 206 (480:3726) -> 10 (480:4079), 207 (480:3729) -> 11 (480:4167).
- Шаги 8–11 — «ветви»; правая серая стрелка на всех четырёх (a): только ON_HOVER, ON_CLICK НЕТ (480:3750, 480:3998, 480:4086, 480:4174). Левая стрелка ведёт на 416:3948 (шаг 7) + ON_DRAG null. «go back» (Component 196): на шагах 8, 9, 11 ON_CLICK -> 416:3948 (шаг 7), на шаге 10 -> 29:88.
- «+» на ветвях (b): шаг 8: 205 (480:3782) hover-only, 206 -> 10, 207 -> 11, 208 -> 9. Шаг 9: 205 (480:4025) -> 8, 206 -> 10, 207 -> 11, 208 (480:4028) hover-only. Шаг 10: 205 (480:4113) -> 8, 206 (480:4114) hover-only, 207 -> 11, 208 (480:4116) -> 9. Шаг 11: 205 (480:4201) -> 8, 206 -> 10, 207 (480:4203) hover-only, 208 -> 9. Соответствие: 205=шаг 8, 208=шаг 9, 206=шаг 10, 207=шаг 11.

## Итоги по вопросам
(a) Серая правая стрелка на последних шагах: AK 9–13 (442:5626, 488:4106, 488:4214, 488:4309, 488:4405) и CzP 7–11 (416:3956, 480:3750, 480:3998, 480:4086, 480:4174) — ON_CLICK нет, только ON_HOVER CHANGE_TO 325:1794. Также у левых стрелок первых шагов (AK 1 — 436:3620, CzP 0 — 415:2753) клика нет (назад некуда).
(b) «+» ведёт CHANGE_TO 480:3720 на hover и NAVIGATE на соответствующую ветвь-шаг (SLOW 1.25 с); «+» текущей ветви без клика. Вернуться: стрелка влево -> шаг-развилка (AK 9 / CzP 7), либо «+» других ветвей, либо go back/LOGO/шапка. Ховеры: см. секцию про шапку.


## Группа g4

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


## Группа g5

# Группа g5 (Fakty): film fakty ANDRIJESZ 1–5, CZP 1–5, KF 1–5

Всего 202 записи в reactions_g5.jsonl (15 фреймов). Все реакции имеют ровно один action, поэтому actionIndex нигде не нужен. ON_DRAG, AFTER_TIMEOUT, OVERLAY, SCROLL_TO, OPEN_URL, MOUSE_ENTER/LEAVE и ON_PRESS в группе отсутствуют: только ON_HOVER и ON_CLICK.

## Что переключает шаги аккордеона
Шаги переключают только две круглые стрелки: Component 145 (назад) и Component 146 (вперёд). Сама полоса аккордеона (Frame 6 и все вложенные Frame 1–10 с картинками, цифрами, текстами) не имеет НИ ОДНОЙ реакции, то есть клик по полосе/картинке ничего не делает. Раскрытие полосы и появление текста реализованы тем, что каждый шаг серии — отдельный фрейм верхнего уровня с уже раскрытой нужной полосой, а переход между фреймами делает Smart Animate.

Тип перехода у стрелок: ON_CLICK, NAVIGATE на соседний фрейм серии, SMART_ANIMATE, easing SLOW, duration 2.083538055419922 с. Ховер стрелок: CHANGE_TO на вариант 325:1793 (Component 143, у Component 145 «назад») и 325:1794 (Component 144, у Component 146 «вперёд»), без transition (transition = null, мгновенно).

## Граф серий (стрелка вперёд 146 → / назад 145 ←)
- ANDRIJESZ: 1 → 2 → 3 → 4 → 5 → 1 (замкнуто). Назад: 2→1, 3→2, 4→3, 5→4. У фрейма 1 стрелки назад нет вообще.
- CZP: 1 → 2 → 3 → 4 → 5 → 1 (замкнуто). Назад: 2→1, 3→2, 4→3, 5→4. У CZP 1 нет стрелки назад и нет LOGO.
- KF: 1 → 2 → 3 → 4 → 5 → 1 (замкнуто). Назад: 2→1, 3→2, 4→3, 5→4. У KF 1 нет стрелки назад.

## Общие элементы каждого фрейма (одинаковые во всех 15)
- Component 2 («Art Project»): ховер CHANGE_TO 54:90 (Property 1=Component 1), SMART_ANIMATE EASE_OUT 0.3 с; клик NAVIGATE на 29:88 (art project started page), без transition.
- FILMY: ховер CHANGE_TO 227:348 (Property 1=Default), SMART_ANIMATE SLOW 1.2776 с; клик NAVIGATE на 191:227 (Fims started page), без transition.
- LOGO (инстанс, 26 Vector): ховер CHANGE_TO 288:922 (Default), без transition; клик NAVIGATE на 1:2 (Home page). Отсутствует только в CZP 1.
- Component 6 («Galeria»): ховер CHANGE_TO 54:277 (Component 4), SMART_ANIMATE EASE_OUT 0.3 с; клик NAVIGATE на 344:2041 (galery started page 1).
- Component 196 («go back»): ховер CHANGE_TO 404:5125 (Component 195), без transition; клик NAVIGATE на 378:2705 (film fakty 1), без transition.

## Последние шаги серий
Серая стрелка (вариант Component 144 вперёд на последнем шаге) НЕ лишена ON_CLICK: на ANDRIJESZ 5, CZP 5 и KF 5 стрелка Component 146 имеет и ON_HOVER, и ON_CLICK, а клик возвращает на шаг 1 с тем же SMART_ANIMATE SLOW 2.08 с. Стрелок без ON_CLICK в группе нет. На первых шагах (ANDRIJESZ 1, CZP 1, KF 1) стрелки назад просто нет (узла нет), а не узел без ON_CLICK.

## Как выйти из серии
Серия зациклена, конца у неё нет. Выход: LOGO → Home page (1:2), FILMY → Fims started page (191:227), Art Project → art project started page (29:88), Galeria → galery started page 1 (344:2041), «go back» (Component 196) → film fakty 1 (378:2705). Эти пять элементов есть на каждом шаге каждой серии.

## Необычное
- CZP 1 без LOGO (нет выхода на Home с этого шага).
- Назначение «go back» ведёт не на предыдущий шаг, а на фрейм film fakty 1 (378:2705), т.е. на экран выбора фильма.
- Ни у одного из шагов нет реакции на сам блок аккордеона (см. выше).


## Группа g6

# Заметки группы 6 (fakty SN/LoTS/AK 1–5, kraje started + Ukraina/Gruzja/Armenia 1–4)

Файл реакций: reactions_g6.jsonl (368 записей; 28 фреймов + 3 component set заголовков). Снято через get_node fields reactions, depth 1 по каждому фрейму (верхний уровень, где лежат все интерактивные узлы). Вложенные Frame 6 (полосы аккордеона fakty) прочитаны глубоко (depth 3) у SN 1–4, Frame 12 (контент kraje) прочитан у Ukraina 1 и Gruzja 4 (и depth 2/1): реакций внутри нет. Остальные Frame 6 / Frame 12 на глубину не читались, на depth 1 у них reactions пустые (шум).

## Общие элементы (одинаковые во всех фреймах)
- Component 2 («Art Project»): hover → CHANGE_TO 54:90 (Property 1=Component 1), SMART_ANIMATE EASE_OUT 0.3 s; click → NAVIGATE 29:88 (art project started page), без анимации.
- FILMY (только fakty): hover → CHANGE_TO 227:348 (Default), SMART_ANIMATE SLOW 1.2776 s; click → NAVIGATE 191:227 (Fims started page). В kraje FILMY только click → 191:227 (hover нет).
- LOGO: hover → CHANGE_TO 288:922, без анимации; click → NAVIGATE 1:2 (Home page).
- Component 6 («Galeria»): hover → CHANGE_TO 54:277 (EASE_OUT 0.3 s); click → NAVIGATE 344:2041 (galery started page 1).
- Component 196 («go back»): hover → CHANGE_TO 404:5125. Click: в fakty → NAVIGATE 378:2732 (film fakty 2); в kraje → NAVIGATE 249:520 (film kraje started page); только в kraje started page → 191:227 (Fims started page).
- Стрелки Component 145 (назад, hover → CHANGE_TO 325:1793) и Component 146 (вперёд, hover → CHANGE_TO 325:1794): click → NAVIGATE на соседний фрейм, SMART_ANIMATE, easing SLOW, duration 2.0835 s (все 100% одинаковые). Hover у стрелок без transition.

## (c) Fakty: что переключает шаги аккордеона
- Шаги переключаются ТОЛЬКО стрелками Component 145 (назад) и Component 146 (вперёд), ON_CLICK, NAVIGATE между фреймами, SMART_ANIMATE SLOW 2.0835 s. Клика по полосам аккордеона нет: ни Frame 6, ни его вложенные Frame 1…11 (полосы) не имеют реакций (проверено глубоко у SN 1–4; у остальных depth 1).
- Цепочки циклические: SN: 1→2→3→4→5→1 (вперёд), 5 → вперёд на SN 1 (240:1863); назад 2→1, 3→2, 4→3, 5→4. У SN 1, LoTS 1, AK 1 стрелки назад (Component 145) нет вообще. Цепочка LoTS: 244:2241→245:2319→245:2374→245:2432→245:2493→(вперёд) 244:2241. AK: 245:2568→247:2644→247:2699→248:2758→248:2819→(вперёд) 245:2568.
- Фреймы-цепочки не связаны друг с другом (SN/LoTS/AK независимы); выход из серии только через Component 196 (→ film fakty 2, 378:2732), LOGO, Art Project, FILMY, Galeria.

## (a) Fakty: ON_CLICK у серой стрелки на последних шагах — ЕСТЬ
- SN 5 (243:2174), LoTS 5 (245:2493), AK 5 (248:2819): стрелка вперёд Component 146 (325:2297 / 325:2249 / 325:2169) имеет ON_CLICK → NAVIGATE на шаг 1 соответствующей серии (SMART_ANIMATE SLOW 2.0835 s). Стрелка назад Component 145 тоже с ON_CLICK. Отсутствующего ON_CLICK нет.
- Необычное: AK 2 (247:2644): стрелка вперёд — не инстанс Component 146, а GROUP «Group 10» (325:2511) только с ON_CLICK → AK 3 (247:2699), без ON_HOVER. AK 3, AK 4, AK 5 без LOGO (нет инстанса LOGO среди детей; childCount 11). AK 3: 11 детей — верхний навбар без LOGO.
- Стрелки назад у SN 2: Component 145 (325:2264) → SN 1; у AK 2: Component 145 (325:2192) → AK 1.

## Kraje: граф
- film kraje started page (249:520): Component 132 (252:700) hover → CHANGE_TO 252:688, click → Gruzja 1 (288:572); Component 133 (252:707) hover → 252:689, click → Ukraina 1 (252:721); Component 135 (252:714) hover → 252:690, click → Armenia 1 (309:2016). Переходы без анимации (transition null). Плюс общие элементы; Component 196 и FILMY ведут на 191:227.
- Ukraina: 1→2→3→4 (вперёд), назад 2→1, 3→2, 4→3. Gruzja: 1→2→3→4, назад 2→1, 3→2, 4→3. Armenia: 1→2→3→4, назад 2→1, 3→2, 4→3. У шага 1 каждой страны стрелки назад нет. Component 196 («go back») на всех шагах → film kraje started page (249:520), без анимации (навигация, не CHANGE_TO).
- Ukraina 3 (265:856): дополнительно Component 29 (265:864) — только ON_HOVER → CHANGE_TO 95:699 (Property 1=Vector 3), без click.

## (a) Kraje *4: ON_CLICK у серой стрелки вперёд
- Ukraina 4 (265:909, стрелка 491:4955), Gruzja 4 (305:1925, 491:4951), Armenia 4 (352:2103, 491:4947): Component 146 есть и имеет ON_CLICK, но он NAVIGATE на САМ ЖЕ фрейм (265:909 → 265:909, 305:1925 → 305:1925, 352:2103 → 352:2103), SMART_ANIMATE SLOW 2.0835 s, hover CHANGE_TO 325:1794. То есть реально «серой/неактивной» стрелки без клика нет, но клик ведёт в никуда (self-loop). Стрелка добавлена позже остальных (id 491:xxxx, в конце списка детей).
- Цикла обратно на *1 в kraje нет (в fakty есть).

## Заголовки разделов 288:2492…2497
- Это варианты component set'ов ART PROJECT (288:2498: 2497 default, 2492 hover-вариант), GALERIA (288:2499: 2496 / 2493), FILMY (288:2500: 2495 / 2494). Лежат на канвасе, в g6-фреймах как инстансы не используются (в g6 навбар построен из Component 2 / FILMY / Component 6 с hover на 54:90, 227:348, 54:277).
- Реакции на самих вариантах: 2497: ON_HOVER → CHANGE_TO 2492 (без анимации) + ON_CLICK → NAVIGATE 29:88; 2496: только ON_HOVER → CHANGE_TO 2493 (click нет); 2495: ON_HOVER → CHANGE_TO 2494 + ON_CLICK → NAVIGATE 191:227. Варианты 2492/2493/2494 реакций не имеют. Записаны в jsonl с frameId = id component set. Итого: hover + (для двух из трёх) navigate; у GALERIA navigate нет.

## Прочее
- Нет ON_DRAG, AFTER_TIMEOUT, OVERLAY, SCROLL_TO, OPEN_URL, SET_VARIABLE; все action = NODE.
- Все reactions имеют единственный action (actionIndex не нужен).
- Название фрейма LoTS 5 заканчивается пробелом («film fakty LoTS 5 »).


## Группа g7

# Группа g7: фрейм componenty 497:4381 (прототипные reactions)

Снято через figma_local get_node. Фрейм содержит 58 прямых потомков: 47 component set, 9 обычных FRAME (3 PLAKAT AK/SN/CZP и 6 «* plakat»; reactions у них у всех пусты), 1 RECTANGLE 33 (#D9D9D9, без reactions). В reactions_g7.jsonl 163 записи (по одной на пару узел+trigger). Помимо стандартных полей добавлены componentSetId/Name и variantId/Name. Для component set из 6 «plakat» (Sajat Nowa, CzP, Aszik Kerib, Kijowskie freski, Andriesz, Legenda o TS) get_node с variantProperties падает ("Component set has existing errors"): у обоих вариантов одинаковое имя «Property 1=Default», поэтому различать по id.

## Главный вывод (a): серый #8A92A0 это HOVER, не disabled

Серый цвет (r0.5415 g0.5709 b0.6280, то есть #8A92A0) стоит только на вариантах, которые являются НАЗНАЧЕНИЕМ ON_HOVER CHANGE_TO из «белого/чёрного» варианта и сами имеют reactions 0 (листья). В обратную сторону reaction нет (возврат на unhover делает сам Figma при уходе курсора). Серый вариант нигде не является источником CHANGE_TO, а disabled-логики (нет условий/переменных) в прототипе нет. Конкретно серые hover-варианты: FILMY 404:5253 (reaction стоит на TEXT 404:5250 внутри варианта 404:5252), galeria 493:4986, FILMY 227:348 (SMART_ANIMATE SLOW 1.278s), ART PROJECT 288:2492, GALERIA 288:2493, FILMY 288:2494, LOGO 288:922 (все 26 vectors серые, часть тёмные 0.138/0.158 с opacity 0.64-0.8), Component 29 → Vector 3 (95:699, stroke серый), Component 30 → Vector 4 (95:701), Component 91/96/97 (196:291, 196:303, 196:305: текст и подчёркивание серые), Component 145/146 (325:1793, 325:1794: stroke стрелки серый на чёрном круге), Component 185 → 184 (361:2407: polygon серый, ellipse opacity 0.15 вместо 0.35), Component 190 → 188 (381:2934: вложенная стрелка серая), «+» Component 205 → 480:3720 (оба Rectangle серые), Component 187 Frame 35 (381:2907, без reactions, тот же серый на стрелке; используется как вложенный инстанс в 188/189).
Исходные (не hover) варианты у них: белый текст / белый stroke или чёрный stroke (Component 29/30, чёрный) / ellipse 0.35. Красный #DC0000 (0.8616,0,0) это hover страны в Component 132/133/134 (GRUZJA/UKRAINA/ARMENIA, 252:688/689/690), а у LOGO дефолт имеет красные #AA0C0C части.
Component 182 серого цвета не содержит вообще (фон #171... 0.089/0.089/0.107, подписи белые).

## ON_HOVER: пары «вариант → вариант» (без transition, CHANGE_TO, если не указано)

Все пары вида base → hover, hover-вариант без reactions:
- Component 161–166 (344:2920–2925): 344:2914→344:2908, 344:2915→2909, 2916→2910, 2917→2911, 2918→2912, 2919→2913. Карточки с подписью + IMG_88xx (у hover-варианта другой IMG №2).
- «plakat»-наборы 376:2640/2641/2642, 398:2772/2773/2774: 376:2633→2634, 376:2637→2635, 376:2639→2636, 398:2771→2765, 398:2770→2767, 398:2769→2768.
- Component 196 «Go back»: 404:5124→404:5125 (оба варианта состоят из текста «go back» + Vector 1; fills не снимались, серый не найден в пределах depth 3).
- Component 132/133/134: 252:693→688, 252:692→689, 252:691→690 (текст белый → красный).
- Component 190: 381:2935→381:2934 (на самом варианте), плюс вложенный инстанс 381:2929 внутри 381:2935: ON_HOVER → 95:80 (Property 1=IMG_8837 1 в другом set 95:84), то есть двойная реакция.
- Component 9/20/21/22/23/24 (54:317, 361–365): 54:315→316, 54:344→345, 54:346→347, 54:348→349, 54:350→351, 54:352→353: DISSOLVE, easing SLOW, 1.25012s (ON_HOVER).
- FILMY 404:5254 (hover на TEXT 404:5250→404:5253), galeria 493:4987 (493:4985→4986), ART PROJECT/GALERIA/FILMY 288:2498–2500 (288:2497→2492, 288:2496→2493, 288:2495→2494), LOGO 288:923 (288:921→922).
- Component 2/5/6 (54:91/278/279): ON_HOVER SMART_ANIMATE EASE_OUT 0.3s: 54:89→54:90, 54:274→54:276, 54:275→54:277 (hover-вариант добавляет подчёркивающую линию Line 3/4).
- FILMY 227:349: 227:347→227:348 SMART_ANIMATE SLOW 1.2776s.
- Component 29/30 (95:702/705): 95:698→95:699, 95:700→95:701. Component 91/96/97: 196:290→291, 196:302→303, 196:304→305.
- Component 145/146: 325:1791→325:1793, 325:1792→325:1794. Component 185: 361:2406→2407. Component 202/203/204 (постеры): 437:4735→4734, 437:4732→4733, 438:4835→4836 (hover-вариант = тот же imageHash с saturation -1, то есть постер становится ЧБ).
- «+» Component 205: 480:3719→480:3720. Component 187 (381:2908, варианты 381:2906/2907): reactions НЕТ.

## Клики (ON_CLICK) внутри набора componenty

- LOGO: 288:921 (ON_HOVER→922 + ON_CLICK→1:2 NAVIGATE) и 288:922 (ON_CLICK→1:2): оба варианта ведут на 1:2.
- ART PROJECT 288:2497: ON_CLICK→29:88 NAVIGATE (hover-вариант 288:2492 без click). FILMY 288:2495: ON_CLICK→191:227 (288:2494 без click). GALERIA 288:2496/2493: ON_CLICK НЕТ (в самом наборе; переход на 344:2041 есть только на инстансах внутри Component 182).
- Component 31 (159:130, пагинатор из 5 вариантов Frame 7/8/11/9/10): стрелки Component 29 (prev) и Component 30 (next), на каждой ON_HOVER → 95:699 / 95:701 и ON_CLICK → DISSOLVE EASE_OUT 0.3s. Граф: Frame7(159:125) next→Frame11(159:126); Frame11 prev→Frame7, next→Frame8(159:127); Frame8 prev→Frame11, next→Frame9(159:128); Frame9 prev→Frame8, next→Frame10(159:129); Frame10 prev→Frame9, next ОТСУТСТВУЕТ (95:724 только hover, нет ON_CLICK). Frame 7 (159:125) prev-стрелки с reaction нет (159:139 Component 29 как FRAME без reaction).

## (e) Component 182 (352:2636): граф и анимация

Это НЕ hover-анимация. Триптих Art Project / Filmy / Galeria из 15 вариантов: 3 «покоящихся» (10 детей, без reactions на самом варианте): 167 = ART PROJECT (352:2618), 172 = FILMY (352:2625), 181 = GALERIA (352:2624), и 12 промежуточных (9 детей), каждый со своей reaction AFTER_TIMEOUT → CHANGE_TO, SMART_ANIMATE, easing GENTLE. Ни ON_HOVER, ни MOUSE_ENTER/MOUSE_LEAVE на уровне вариантов нет. ON_HOVER есть только на вложенных инстансах нав-ссылок (Component 2/5/6/ART PROJECT/FILMY/GALERIA), см. ниже.

### Старт: ON_CLICK на постерах покоящихся вариантов (SMART_ANIMATE GENTLE 0.2555s)
- 167 (ART PROJECT): Rectangle 49 (352:2424) → 173 (352:2619); IMG_8915 5 (352:2425) → 176 (352:2621).
- 172 (FILMY): Rectangle 46 (352:2505) → 171 (352:2628); Rectangle 49 (352:2506) → 169 (352:2629).
- 181 (GALERIA): Rectangle 46 (352:2490) → 178 (352:2626); IMG_8915 5 (352:2492) → 179 (352:2627).

### Промежуточные цепочки (AFTER_TIMEOUT, ON_CLICK не нужен; каждая цепочка = 2 шага)
| старт-вариант | шаг 1 (id, timeout, duration) | шаг 2 | итог |
|---|---|---|---|
| 167 клик R49 | 173 (352:2619) → 177, t0.10s, 0.7666s | 177 (352:2622) → 181, t0.05s, 0.0639s | GALERIA |
| 167 клик IMG | 176 (352:2621) → 168, t0.10s, 0.7666s | 168 (352:2623) → 172, t0.10s, 0.1278s | FILMY |
| 172 клик R46 | 171 (352:2628) → 174, t0.10s, 0.7666s | 174 (352:2632) → 167, t0.10s, 0.1278s | ART PROJECT |
| 172 клик R49 | 169 (352:2629) → 180, t0.10s, 0.7666s | 180 (352:2633) → 181, t0.10s, 0.1278s | GALERIA |
| 181 клик R46 | 178 (352:2626) → 175, t0.10s, 0.7666s | 175 (352:2630) → 167, t0.10s, 0.1278s | ART PROJECT |
| 181 клик IMG | 179 (352:2627) → 170, t0.10s, 0.7666s | 170 (352:2631) → 172, t0.10s, 0.1278s | FILMY |

Итого: клик (0.2555s gentle) → ожидание 0.1s → длинный gentle-ход 0.7666s (основное перемещение постеров) → ожидание 0.1/0.05s → короткий 0.1278s или 0.0639s доводящий ход. Easing везде GENTLE (трёх разных durations всего: 0.7666, 0.1278, 0.0639; click 0.2555). Все reactions CHANGE_TO, никаких OVERLAY/SCROLL_TO. Серых (#8A92A0) элементов в 182 нет, поэтому вопрос (a) к нему не относится.

### Вложенные reactions у всех 15 вариантов (инстансы навигации)
Во всех вариантах: Component 2 (Art Project): ON_HOVER→54:90 (SMART_ANIMATE EASE_OUT 0.3s) и ON_CLICK→29:88 NAVIGATE; Component 5 (Filmy): ON_HOVER→54:276 и ON_CLICK→191:227; Component 6 (Galeria): ON_HOVER→54:277.
Отсутствует ON_CLICK у Galeria (должен вести на 344:2041) в 10 из 15 вариантов: 168, 169, 170, 171, 174, 175, 177, 178, 179, 180. Он есть в 167, 172, 173, 176, 181. Это та самая «нет ON_CLICK» находка.
Покоящиеся варианты дополнительно имеют инстансы-заголовки: 167 ART PROJECT (352:2426: ON_HOVER→288:2492, ON_CLICK→29:88), 172 FILMY (352:2508: ON_HOVER→288:2494, ON_CLICK→191:227), 181 GALERIA (352:2493: ON_HOVER→288:2493, ON_CLICK→344:2041).

## Необычное
- AFTER_TIMEOUT: 12 reactions (только в Component 182). ON_DRAG, MOUSE_ENTER, MOUSE_LEAVE, OPEN_URL, OVERLAY, SCROLL_TO в этой группе не встречаются.
- DISSOLVE SLOW 1.25s на карточках 9/20–24, SMART_ANIMATE SLOW 1.2776s на FILMY 227:349, DISSOLVE EASE_OUT 0.3s в пагинаторе Component 31.
- Reaction на вложенном узле, а не на варианте: FILMY 404:5254 (TEXT 404:5250), и инстансы в Component 182/190/31.
- Cross-set назначения: 95:80 (из Component 190) и 95:699/95:701 (из пагинатора Component 31) живут в других наборах, не в этом фрейме.

## Что не снято
- fills снимались на depth 2–4, где это нужно для различения hover/disabled; полный depth 6 по каждому узлу plakat-наборов (текст-блоки) не брался, на depth 1–3 у всех их потомков reactions пусты.
- Component 196 (Go back) fills не снимались; Component 31 фрейм 159:139 не раскрывался глубже.
- Cкорее всего есть другие мелкие вложенные reactions внутри Component 31 стрелок (instances children truncated), но их reactions на самом инстансе записаны.
