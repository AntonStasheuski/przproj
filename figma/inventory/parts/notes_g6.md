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
