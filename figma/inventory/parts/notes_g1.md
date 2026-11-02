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
