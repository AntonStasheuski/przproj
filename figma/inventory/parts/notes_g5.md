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
