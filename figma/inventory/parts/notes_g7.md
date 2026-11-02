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
