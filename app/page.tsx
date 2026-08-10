"use client";

import { useEffect, useRef, useState } from "react";

type Language = "ru" | "kk" | "en";

const languageOptions: Array<{ id: Language; label: string; short: string }> = [
  { id: "ru", label: "Русский", short: "RU" },
  { id: "kk", label: "Қазақша", short: "KZ" },
  { id: "en", label: "English", short: "EN" },
];

const translations: Record<Exclude<Language, "ru">, Record<string, string>> = {
  kk: {
    "Экологический интеллект Каспия": "Каспийдің экологиялық интеллекті",
    "Контекст": "Мәнмәтін",
    "Задача": "Міндет",
    "Данные": "Деректер",
    "Динамика": "Динамика",
    "Сценарии": "Сценарийлер",
    "Анализ": "Талдау",
    "План": "Жоспар",
    "Решение": "Шешім",
    "Граница воды": "Су шекарасы",
    "10 м": "10 м",
    "10/20 м": "10/20 м",
    "Контур воды, обмеление и изменение мелководий в одной сопоставимой сетке.": "Су контуры, тайыздану және тайыз су өзгерістері бір салыстырмалы торда.",
    "Мутность": "Лайлылық",
    "7 лет": "7 жыл",
    "Шлейфы сбросов и зоны взвеси с проверкой по одинаковому сезону.": "Төгінді шлейфтері мен қалқыма зат аймақтары бір маусым бойынша тексеріледі.",
    "Цветение": "Судың гүлденуі",
    "Спектральный proxy": "Спектрлік прокси",
    "1 слой": "1 қабат",
    "Скрининг аномального цвета воды для назначения полевой проверки.": "Далалық тексеруді тағайындау үшін су түсінің ауытқуын скринингтеу.",
    "Нефтяной след": "Мұнай ізі",
    "Кандидаты тёмных пятен, ветер, AIS и повторный пролёт в одном сценарии.": "Қара дақтар, жел, AIS және қайталама ұшу бір сценарийде тексеріледі.",
    "Стресс берега": "Жағалау стрессі",
    "Эрозия, оголение почвы и участки, где природный буфер даёт максимальный эффект.": "Эрозия, топырақтың ашылуы және табиғи буфер ең жоғары әсер беретін учаскелер.",
    "Проверка сбросов": "Төгінділерді тексеру",
    "Вода · контроль": "Су · бақылау",
    "аномальных шлейфа": "аномалиялық шлейф",
    "Маршрут отбора проб построен: 6 точек, 42 км, приоритет — северо-восточный сектор.": "Сынама алу бағыты құрылды: 6 нүкте, 42 км, басымдық — солтүстік-шығыс сектор.",
    "Передать маршрут региональной инспекции": "Бағытты өңірлік инспекцияға беру",
    "24 часа": "24 сағат",
    "Восстановление дельты": "Дельтаны қалпына келтіру",
    "Экосистема · проект": "Экожүйе · жоба",
    "участков удержания воды": "су ұстау учаскесі",
    "Суммарный потенциал восстановления — 1 180 га; четыре участка защищают нерестилища.": "Қалпына келтіру әлеуеті — 1 180 га; төрт учаске уылдырық шашу аймақтарын қорғайды.",
    "Запустить инженерно-экологическое обследование": "Инженерлік-экологиялық зерттеуді бастау",
    "30 дней": "30 күн",
    "Защита берега": "Жағалауды қорғау",
    "Берег · адаптация": "Жағалау · бейімделу",
    "км приоритетной линии": "км басым жағалау сызығы",
    "Выделены 4 природных буфера; на 11 км достаточно мягкой берегозащиты без бетонирования.": "4 табиғи буфер белгіленді; 11 км аумақта бетонсыз жұмсақ жағалау қорғанысы жеткілікті.",
    "Включить участки в региональный план адаптации": "Учаскелерді өңірлік бейімделу жоспарына енгізу",
    "60 дней": "60 күн",
    "SAR · реагирование": "SAR · ден қою",
    "кандидата на проверку": "тексеруге үміткер",
    "Следы сопоставлены с ветром и AIS. Для одного кандидата назначен повторный пролёт через 18 часов.": "Іздер жел және AIS деректерімен салыстырылды. Бір нысанға 18 сағаттан кейін қайталама ұшу тағайындалды.",
    "Выдать задание на верификацию": "Верификацияға тапсырма беру",
    "сегодня": "бүгін",
    "Доля воды": "Су үлесі",
    "61,8%": "61,8%",
    "−3,4 п.п.": "−3,4 п.т.",
    "0,91": "0,91",
    "Расчёт завершён · 0,8 сек": "Есеп аяқталды · 0,8 сек",
    "водной поверхности": "су беті",
    "к июлю 2020": "2020 жылғы шілдеге қарағанда",
    "доверие модели": "модель сенімділігі",
    "Потеря воды сосредоточена на 19% площади выбранного контура — северная мелководная зона.": "Су жоғалуы таңдалған контурдың 19%-ында — солтүстік тайыз аймақта шоғырланған.",
    "AI-анализ": "AI-талдау",
    "0,87": "0,87",
    "Сегментация завершена · 2,4 сек": "Сегментация аяқталды · 2,4 сек",
    "зоны риска": "тәуекел аймағы",
    "критический приоритет": "сыни басымдық",
    "Модель связала сокращение водной поверхности, рост взвеси и стресс растительности в единую причинную цепочку.": "Модель су бетінің азаюын, қалқыма заттардың өсуін және өсімдік стрессін бір себептік тізбекке біріктірді.",
    "Прогноз 2027": "2027 болжамы",
    "−1,6 п.п.": "−1,6 п.т.",
    "+0,8 п.п.": "+0,8 п.т.",
    "0,84": "0,84",
    "Модель 2020–2027 · R² 0,84": "2020–2027 моделі · R² 0,84",
    "без вмешательства": "араласусыз",
    "при реализации сценария": "сценарий іске асқанда",
    "Сценарий удержания воды меняет траекторию уже в первый сезон; приоритет — четыре узловых участка.": "Су ұстау сценарийі алғашқы маусымда-ақ траекторияны өзгертеді; басымдық — төрт түйінді учаске.",
    "Выбрать язык": "Тілді таңдау",
    "Сцены презентации": "Презентация көріністері",
    "Сцена": "Көрініс",
    "Операционная система экологического мониторинга · работает сегодня": "Экологиялық мониторингтің операциялық жүйесі · бүгін жұмыс істейді",
    "Каспий,": "Каспийді",
    "который можно": "өзгертуге",
    "изменить.": "болады.",
    "Nautikos уже выдаёт результат: сопоставляет спутниковые данные, находит зоны риска, объясняет динамику и формирует готовое задание на проверку — за минуты, а не дни.": "Nautikos қазірдің өзінде нәтиже береді: спутниктік деректерді салыстырады, тәуекел аймақтарын табады, динамиканы түсіндіреді және тексеруге дайын тапсырманы күндерде емес, минуттарда жасайды.",
    "Посмотреть результат": "Нәтижені көру",
    "сезонных срезов сопоставлено": "маусымдық кесінді салыстырылды",
    "рабочих слоёв": "жұмыс қабаты",
    "от сигнала до задания": "сигналдан тапсырмаға дейін",
    "01 · Управленческий разрыв": "01 · Басқарушылық алшақтық",
    "Данные уже есть.": "Деректер бар.",
    "Решения приходят": "Шешімдер",
    "слишком поздно.": "тым кеш келеді.",
    "Nautikos уже связывает снимки, полевые проверки и ведомственные отчёты в один рабочий контур. На выходе — не карта, а приоритет, доказательство и готовое поручение.": "Nautikos суреттерді, далалық тексерулерді және ведомстволық есептерді қазірдің өзінде бір жұмыс контурына біріктіреді. Нәтиже — карта емес, басымдық, дәлел және дайын тапсырма.",
    "Научный контекст · Nature 2025": "Ғылыми контекст · Nature 2025",
    "Если уровень снизится на 5 м, обнажится около 77 000 км² дна — прежде всего на северном мелководье.": "Деңгей 5 м төмендесе, шамамен 77 000 км² теңіз түбі ашылады — ең алдымен солтүстік тайыз аймақта.",
    "одинаковых июльских срезов: 2020–2026": "бірдей шілде кесіндісі: 2020–2026",
    "пространственное разрешение Sentinel-2 / Sentinel-1": "Sentinel-2 / Sentinel-1 кеңістіктік айырымдылығы",
    "03 · фактический цикл": "03 · нақты цикл",
    "72 ч → 7 мин": "72 сағ → 7 мин",
    "путь от обнаружения сигнала до готового задания": "сигналды анықтаудан дайын тапсырмаға дейін",
    "Источники: Sentinel-1 GRD, Sentinel-2 L2A, Sentinel-3 SLSTR · единый сезон, сетка и журнал обработки": "Дереккөздер: Sentinel-1 GRD, Sentinel-2 L2A, Sentinel-3 SLSTR · бір маусым, тор және өңдеу журналы",
    "02 · Один Каспий / шесть действующих слоёв": "02 · Бір Каспий / алты жұмыс қабаты",
    "Не витрина.": "Бұл витрина емес.",
    "Рабочая система сигналов.": "Жұмыс істейтін сигналдар жүйесі.",
    "Плотность воды": "Су тығыздығы",
    "Sentinel-3 SLSTR + CTD": "Sentinel-3 SLSTR + CTD",
    "Расчётный слой плотности по температуре и солёности с калибровкой на уравнение состояния воды Каспия.": "Температура мен тұздылық бойынша Каспий суының күй теңдеуіне калибрленген есептік тығыздық қабаты.",
    "Экологические слои": "Экологиялық қабаттар",
    "03 · Динамика без подмены сезона": "03 · Маусымды алмастырмайтын динамика",
    "Передвигайте границу. Оба снимка — июль, одна сетка и сопоставимый продукт.": "Шекараны жылжытыңыз. Екі сурет те шілдеде түсірілген, торы мен өнімі салыстырмалы.",
    "Граница сравнения снимков 2020 и 2026": "2020 және 2026 суреттерін салыстыру шекарасы",
    "единый июль · 10 м": "бір шілде · 10 м",
    "Читаемый результат": "Түсінікті нәтиже",
    "Изменение фиксируется по контуру, а не по впечатлению от двух разных карт.": "Өзгеріс екі картаның әсері бойынша емес, нақты контур бойынша тіркеледі.",
    "04 · От сигнала к действию": "04 · Сигналдан әрекетке",
    "Выберите сценарий": "Сценарийді таңдаңыз",
    "Сценарии решения": "Шешім сценарийлері",
    "Расчёт завершён": "Есеп аяқталды",
    "Рекомендуемое действие": "Ұсынылатын әрекет",
    "Срок:": "Мерзім:",
    "05 · Производственная область · 1 600 км²": "05 · Өндірістік аймақ · 1 600 км²",
    "Результат рассчитан.": "Нәтиже есептелді.",
    "Действие готово.": "Әрекет дайын.",
    "Каждый режим уже возвращает метрику, интерпретацию, доверие модели и следующий шаг. Оператору остаётся проверить и выдать задание.": "Әр режим метриканы, түсіндірмені, модель сенімділігін және келесі қадамды бірден қайтарады. Оператор тек тексеріп, тапсырма береді.",
    "Режим анализа": "Талдау режимі",
    "Сопоставляем 7 сезонных срезов…": "7 маусымдық кесіндіні салыстырып жатырмыз…",
    "ГОТОВО": "ДАЙЫН",
    "01 · сигнал": "01 · сигнал",
    "02 · верификация": "02 · верификация",
    "03 · поручение": "03 · тапсырма",
    "Расчёт выполняется по выбранной геометрии и возвращает метрику, доверие модели и готовый маршрут верификации.": "Есеп таңдалған геометрия бойынша орындалып, метриканы, модель сенімділігін және дайын верификация бағытын қайтарады.",
    "06 · Внедрение в государственный контур": "06 · Мемлекеттік контурға енгізу",
    "90 дней,": "90 күн,",
    "чтобы встроить": "өнімді",
    "продукт в работу.": "жұмысқа енгізу үшін.",
    "Этап 1": "1-кезең",
    "Контур и регламент": "Контур және регламент",
    "Утвердить пилотный район, владельца данных и SLA проверки экологического сигнала.": "Пилоттық ауданды, деректер иесін және экологиялық сигналды тексеру SLA-сын бекіту.",
    "Результат: единый протокол": "Нәтиже: бірыңғай хаттама",
    "Этап 2": "2-кезең",
    "Полевое подтверждение": "Далалық растау",
    "Проверить маршруты проб, SAR-кандидаты и точность сегментации на выбранных участках.": "Сынама бағыттарын, SAR нысандарын және таңдалған учаскелердегі сегментация дәлдігін тексеру.",
    "Результат: доказанная точность": "Нәтиже: дәлелденген дәлдік",
    "Этап 3": "3-кезең",
    "Управленческий контур": "Басқару контуры",
    "Подключить ведомственный кабинет, шаблоны поручений и ежемесячный обзор рисков.": "Ведомстволық кабинетті, тапсырма үлгілерін және ай сайынғы тәуекел шолуын қосу.",
    "Результат: решение в работе": "Нәтиже: шешім жұмыста",
    "Координатор": "Үйлестіруші",
    "Уполномоченный орган по экологии": "Экология жөніндегі уәкілетті орган",
    "Участники": "Қатысушылар",
    "Гидромет · инспекция · регионы · научные организации": "Гидромет · инспекция · өңірлер · ғылыми ұйымдар",
    "07 · Решение для запуска в регионе": "07 · Өңірде іске қосуға дайын шешім",
    "Масштабировать": "Масштабтау",
    "Nautikos за 90 дней.": "Nautikos-ты 90 күнде.",
    "Нужно утвердить": "Бекіту қажет",
    "один район · одного координатора · один регламент обмена данными": "бір аудан · бір үйлестіруші · деректер алмасудың бір регламенті",
    "Поручение сформировано": "Тапсырма қалыптастырылды",
    "Сформировать проект поручения": "Тапсырма жобасын қалыптастыру",
    "ПРОЕКТ ПОРУЧЕНИЯ · NKS-01": "ТАПСЫРМА ЖОБАСЫ · NKS-01",
    "Подготовить запуск пилотного контура Nautikos Caspian": "Nautikos Caspian пилоттық контурын іске қосуға дайындау",
    "Срок": "Мерзім",
    "Охват": "Қамту",
    "1 пилотный район": "1 пилоттық аудан",
    "Контроль": "Бақылау",
    "ежемесячный обзор": "ай сайынғы шолу",
    "Экологический сигнал → проверяемое действие": "Экологиялық сигнал → тексерілетін әрекет",
  },
  en: {
    "Экологический интеллект Каспия": "Caspian environmental intelligence",
    "Контекст": "Context",
    "Задача": "Challenge",
    "Данные": "Data",
    "Динамика": "Change",
    "Сценарии": "Scenarios",
    "Анализ": "Analysis",
    "План": "Plan",
    "Решение": "Decision",
    "Граница воды": "Water boundary",
    "10 м": "10 m",
    "10/20 м": "10/20 m",
    "Контур воды, обмеление и изменение мелководий в одной сопоставимой сетке.": "Waterline, shallowing and shallow-water change in one comparable grid.",
    "Мутность": "Turbidity",
    "7 лет": "7 years",
    "Шлейфы сбросов и зоны взвеси с проверкой по одинаковому сезону.": "Discharge plumes and suspended matter checked within the same season.",
    "Цветение": "Algal bloom",
    "Спектральный proxy": "Spectral proxy",
    "1 слой": "1 layer",
    "Скрининг аномального цвета воды для назначения полевой проверки.": "Abnormal water-colour screening used to assign field verification.",
    "Нефтяной след": "Oil trace",
    "Кандидаты тёмных пятен, ветер, AIS и повторный пролёт в одном сценарии.": "Dark-spot candidates, wind, AIS and a repeat pass in one workflow.",
    "Стресс берега": "Coastal stress",
    "Эрозия, оголение почвы и участки, где природный буфер даёт максимальный эффект.": "Erosion, exposed soil and areas where natural buffers have the greatest effect.",
    "Проверка сбросов": "Discharge inspection",
    "Вода · контроль": "Water · control",
    "аномальных шлейфа": "anomalous plumes",
    "Маршрут отбора проб построен: 6 точек, 42 км, приоритет — северо-восточный сектор.": "Sampling route built: 6 points, 42 km, with the north-east sector prioritised.",
    "Передать маршрут региональной инспекции": "Send the route to the regional inspectorate",
    "24 часа": "24 hours",
    "Восстановление дельты": "Delta restoration",
    "Экосистема · проект": "Ecosystem · project",
    "участков удержания воды": "water-retention sites",
    "Суммарный потенциал восстановления — 1 180 га; четыре участка защищают нерестилища.": "Total restoration potential is 1,180 ha; four sites protect spawning grounds.",
    "Запустить инженерно-экологическое обследование": "Launch an engineering and environmental survey",
    "30 дней": "30 days",
    "Защита берега": "Coastal protection",
    "Берег · адаптация": "Coast · adaptation",
    "км приоритетной линии": "km of priority coastline",
    "Выделены 4 природных буфера; на 11 км достаточно мягкой берегозащиты без бетонирования.": "Four natural buffers identified; 11 km can use soft protection without concrete.",
    "Включить участки в региональный план адаптации": "Add the sites to the regional adaptation plan",
    "60 дней": "60 days",
    "SAR · реагирование": "SAR · response",
    "кандидата на проверку": "candidates for verification",
    "Следы сопоставлены с ветром и AIS. Для одного кандидата назначен повторный пролёт через 18 часов.": "Traces matched against wind and AIS. One candidate is scheduled for a repeat pass in 18 hours.",
    "Выдать задание на верификацию": "Issue a verification task",
    "сегодня": "today",
    "Доля воды": "Water share",
    "61,8%": "61.8%",
    "−3,4 п.п.": "−3.4 pp",
    "0,91": "0.91",
    "Расчёт завершён · 0,8 сек": "Calculation complete · 0.8 sec",
    "водной поверхности": "water surface",
    "к июлю 2020": "vs July 2020",
    "доверие модели": "model confidence",
    "Потеря воды сосредоточена на 19% площади выбранного контура — северная мелководная зона.": "Water loss is concentrated in 19% of the selected area — the northern shallows.",
    "AI-анализ": "AI analysis",
    "0,87": "0.87",
    "Сегментация завершена · 2,4 сек": "Segmentation complete · 2.4 sec",
    "зоны риска": "risk zones",
    "критический приоритет": "critical priority",
    "Модель связала сокращение водной поверхности, рост взвеси и стресс растительности в единую причинную цепочку.": "The model linked water loss, rising suspended matter and vegetation stress into one causal chain.",
    "Прогноз 2027": "2027 forecast",
    "−1,6 п.п.": "−1.6 pp",
    "+0,8 п.п.": "+0.8 pp",
    "0,84": "0.84",
    "Модель 2020–2027 · R² 0,84": "2020–2027 model · R² 0.84",
    "без вмешательства": "without intervention",
    "при реализации сценария": "with the scenario",
    "Сценарий удержания воды меняет траекторию уже в первый сезон; приоритет — четыре узловых участка.": "The retention scenario changes the trajectory in the first season; four key sites take priority.",
    "Выбрать язык": "Choose language",
    "Сцены презентации": "Presentation scenes",
    "Сцена": "Scene",
    "Операционная система экологического мониторинга · работает сегодня": "Environmental monitoring operating system · working today",
    "Каспий,": "The Caspian,",
    "который можно": "we can",
    "изменить.": "change.",
    "Nautikos уже выдаёт результат: сопоставляет спутниковые данные, находит зоны риска, объясняет динамику и формирует готовое задание на проверку — за минуты, а не дни.": "Nautikos already delivers results: it compares satellite data, detects risk zones, explains change and generates a verification task in minutes, not days.",
    "Посмотреть результат": "See the result",
    "сезонных срезов сопоставлено": "seasonal snapshots compared",
    "рабочих слоёв": "operational layers",
    "от сигнала до задания": "from signal to task",
    "01 · Управленческий разрыв": "01 · The decision gap",
    "Данные уже есть.": "The data exists.",
    "Решения приходят": "Decisions arrive",
    "слишком поздно.": "too late.",
    "Nautikos уже связывает снимки, полевые проверки и ведомственные отчёты в один рабочий контур. На выходе — не карта, а приоритет, доказательство и готовое поручение.": "Nautikos already connects imagery, field checks and agency reports into one operational workflow. The output is not a map, but a priority, evidence and an actionable mandate.",
    "Научный контекст · Nature 2025": "Research context · Nature 2025",
    "Если уровень снизится на 5 м, обнажится около 77 000 км² дна — прежде всего на северном мелководье.": "A 5 m level decline would expose about 77,000 km² of seabed, mainly across the northern shallows.",
    "одинаковых июльских срезов: 2020–2026": "comparable July snapshots: 2020–2026",
    "пространственное разрешение Sentinel-2 / Sentinel-1": "Sentinel-2 / Sentinel-1 spatial resolution",
    "03 · фактический цикл": "03 · actual cycle",
    "72 ч → 7 мин": "72 h → 7 min",
    "путь от обнаружения сигнала до готового задания": "from detected signal to an actionable task",
    "Источники: Sentinel-1 GRD, Sentinel-2 L2A, Sentinel-3 SLSTR · единый сезон, сетка и журнал обработки": "Sources: Sentinel-1 GRD, Sentinel-2 L2A, Sentinel-3 SLSTR · one season, grid and processing log",
    "02 · Один Каспий / шесть действующих слоёв": "02 · One Caspian / six operational layers",
    "Не витрина.": "Not a showcase.",
    "Рабочая система сигналов.": "An operational signal system.",
    "Плотность воды": "Water density",
    "Sentinel-3 SLSTR + CTD": "Sentinel-3 SLSTR + CTD",
    "Расчётный слой плотности по температуре и солёности с калибровкой на уравнение состояния воды Каспия.": "A calculated density layer using temperature and salinity, calibrated to the Caspian Sea equation of state.",
    "Экологические слои": "Environmental layers",
    "03 · Динамика без подмены сезона": "03 · Change without seasonal substitution",
    "Передвигайте границу. Оба снимка — июль, одна сетка и сопоставимый продукт.": "Move the divider. Both images are from July, using one grid and a comparable product.",
    "Граница сравнения снимков 2020 и 2026": "2020 and 2026 image comparison divider",
    "единый июль · 10 м": "same July · 10 m",
    "Читаемый результат": "Readable result",
    "Изменение фиксируется по контуру, а не по впечатлению от двух разных карт.": "Change is measured by geometry, not by impressions from two different maps.",
    "04 · От сигнала к действию": "04 · From signal to action",
    "Выберите сценарий": "Select a scenario",
    "Сценарии решения": "Decision scenarios",
    "Расчёт завершён": "Calculation complete",
    "Рекомендуемое действие": "Recommended action",
    "Срок:": "Deadline:",
    "05 · Производственная область · 1 600 км²": "05 · Production area · 1,600 km²",
    "Результат рассчитан.": "Result calculated.",
    "Действие готово.": "Action ready.",
    "Каждый режим уже возвращает метрику, интерпретацию, доверие модели и следующий шаг. Оператору остаётся проверить и выдать задание.": "Every mode already returns a metric, interpretation, model confidence and the next step. The operator only needs to verify and issue the task.",
    "Режим анализа": "Analysis mode",
    "Сопоставляем 7 сезонных срезов…": "Comparing 7 seasonal snapshots…",
    "ГОТОВО": "READY",
    "01 · сигнал": "01 · signal",
    "02 · верификация": "02 · verification",
    "03 · поручение": "03 · mandate",
    "Расчёт выполняется по выбранной геометрии и возвращает метрику, доверие модели и готовый маршрут верификации.": "The calculation runs on the selected geometry and returns a metric, model confidence and a ready verification route.",
    "06 · Внедрение в государственный контур": "06 · Integration into government operations",
    "90 дней,": "90 days",
    "чтобы встроить": "to put the",
    "продукт в работу.": "product into operation.",
    "Этап 1": "Stage 1",
    "Контур и регламент": "Scope and protocol",
    "Утвердить пилотный район, владельца данных и SLA проверки экологического сигнала.": "Approve the pilot area, data owner and environmental-signal verification SLA.",
    "Результат: единый протокол": "Outcome: one protocol",
    "Этап 2": "Stage 2",
    "Полевое подтверждение": "Field verification",
    "Проверить маршруты проб, SAR-кандидаты и точность сегментации на выбранных участках.": "Validate sampling routes, SAR candidates and segmentation accuracy at selected sites.",
    "Результат: доказанная точность": "Outcome: proven accuracy",
    "Этап 3": "Stage 3",
    "Управленческий контур": "Decision workflow",
    "Подключить ведомственный кабинет, шаблоны поручений и ежемесячный обзор рисков.": "Connect the agency workspace, mandate templates and a monthly risk review.",
    "Результат: решение в работе": "Outcome: decision in operation",
    "Координатор": "Coordinator",
    "Уполномоченный орган по экологии": "Authorised environmental authority",
    "Участники": "Participants",
    "Гидромет · инспекция · регионы · научные организации": "Hydromet · inspectorate · regions · research organisations",
    "07 · Решение для запуска в регионе": "07 · A solution ready for regional deployment",
    "Масштабировать": "Scale",
    "Nautikos за 90 дней.": "Nautikos in 90 days.",
    "Нужно утвердить": "Approval required",
    "один район · одного координатора · один регламент обмена данными": "one area · one coordinator · one data-exchange protocol",
    "Поручение сформировано": "Mandate generated",
    "Сформировать проект поручения": "Generate draft mandate",
    "ПРОЕКТ ПОРУЧЕНИЯ · NKS-01": "DRAFT MANDATE · NKS-01",
    "Подготовить запуск пилотного контура Nautikos Caspian": "Prepare the launch of the Nautikos Caspian pilot",
    "Срок": "Deadline",
    "Охват": "Coverage",
    "1 пилотный район": "1 pilot area",
    "Контроль": "Review",
    "ежемесячный обзор": "monthly review",
    "Экологический сигнал → проверяемое действие": "Environmental signal → verifiable action",
  },
};

const scenes = [
  { id: "intro", label: "Контекст" },
  { id: "problem", label: "Задача" },
  { id: "signals", label: "Данные" },
  { id: "compare", label: "Динамика" },
  { id: "scenario", label: "Сценарии" },
  { id: "analysis", label: "Анализ" },
  { id: "plan", label: "План" },
  { id: "decision", label: "Решение" },
];

const layers = [
  {
    id: "water",
    index: "01",
    label: "Граница воды",
    source: "Sentinel-2 · NDWI",
    value: "10 м",
    note: "Контур воды, обмеление и изменение мелководий в одной сопоставимой сетке.",
  },
  {
    id: "turbidity",
    index: "02",
    label: "Мутность",
    source: "Sentinel-2 · NDTI",
    value: "7 лет",
    note: "Шлейфы сбросов и зоны взвеси с проверкой по одинаковому сезону.",
  },
  {
    id: "bloom",
    index: "03",
    label: "Цветение",
    source: "Спектральный proxy",
    value: "1 слой",
    note: "Скрининг аномального цвета воды для назначения полевой проверки.",
  },
  {
    id: "oil",
    index: "04",
    label: "Нефтяной след",
    source: "Sentinel-1 · SAR",
    value: "24/7",
    note: "Кандидаты тёмных пятен, ветер, AIS и повторный пролёт в одном сценарии.",
  },
  {
    id: "shore",
    index: "05",
    label: "Стресс берега",
    source: "NDVI · Visible/NIR",
    value: "2027",
    note: "Эрозия, оголение почвы и участки, где природный буфер даёт максимальный эффект.",
  },
  {
    id: "density",
    index: "06",
    label: "Плотность воды",
    source: "Sentinel-3 SLSTR + CTD",
    value: "ρ",
    note: "Расчётный слой плотности по температуре и солёности с калибровкой на уравнение состояния воды Каспия.",
  },
];

const scenarios = [
  {
    id: "discharge",
    label: "Проверка сбросов",
    eyebrow: "Вода · контроль",
    metric: "3",
    unit: "аномальных шлейфа",
    result: "Маршрут отбора проб построен: 6 точек, 42 км, приоритет — северо-восточный сектор.",
    action: "Передать маршрут региональной инспекции",
    deadline: "24 часа",
  },
  {
    id: "delta",
    label: "Восстановление дельты",
    eyebrow: "Экосистема · проект",
    metric: "14",
    unit: "участков удержания воды",
    result: "Суммарный потенциал восстановления — 1 180 га; четыре участка защищают нерестилища.",
    action: "Запустить инженерно-экологическое обследование",
    deadline: "30 дней",
  },
  {
    id: "coast",
    label: "Защита берега",
    eyebrow: "Берег · адаптация",
    metric: "27",
    unit: "км приоритетной линии",
    result: "Выделены 4 природных буфера; на 11 км достаточно мягкой берегозащиты без бетонирования.",
    action: "Включить участки в региональный план адаптации",
    deadline: "60 дней",
  },
  {
    id: "oil",
    label: "Нефтяной след",
    eyebrow: "SAR · реагирование",
    metric: "2",
    unit: "кандидата на проверку",
    result: "Следы сопоставлены с ветром и AIS. Для одного кандидата назначен повторный пролёт через 18 часов.",
    action: "Выдать задание на верификацию",
    deadline: "сегодня",
  },
];

const analysisModes = {
  water: {
    label: "Доля воды",
    kicker: "Расчёт завершён · 0,8 сек",
    primary: "61,8%",
    primaryLabel: "водной поверхности",
    secondary: "−3,4 п.п.",
    secondaryLabel: "к июлю 2020",
    confidence: "0,91",
    summary: "Потеря воды сосредоточена на 19% площади выбранного контура — северная мелководная зона.",
  },
  ai: {
    label: "AI-анализ",
    kicker: "Сегментация завершена · 2,4 сек",
    primary: "3",
    primaryLabel: "зоны риска",
    secondary: "1",
    secondaryLabel: "критический приоритет",
    confidence: "0,87",
    summary: "Модель связала сокращение водной поверхности, рост взвеси и стресс растительности в единую причинную цепочку.",
  },
  forecast: {
    label: "Прогноз 2027",
    kicker: "Модель 2020–2027 · R² 0,84",
    primary: "−1,6 п.п.",
    primaryLabel: "без вмешательства",
    secondary: "+0,8 п.п.",
    secondaryLabel: "при реализации сценария",
    confidence: "0,84",
    summary: "Сценарий удержания воды меняет траекторию уже в первый сезон; приоритет — четыре узловых участка.",
  },
};

type AnalysisMode = keyof typeof analysisModes;

function CounterText({ text, duration = 1350, locale = "ru" }: { text: string; duration?: number; locale?: Language }) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let startedAt = 0;
    let hasPlayed = false;

    setProgress(0);

    const play = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      const tick = (timestamp: number) => {
        if (!startedAt) startedAt = timestamp;
        const nextProgress = Math.min((timestamp - startedAt) / duration, 1);
        setProgress(1 - Math.pow(1 - nextProgress, 3));
        if (nextProgress < 1) animationFrame = window.requestAnimationFrame(tick);
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
      },
      { threshold: 0.45 },
    );

    if (nodeRef.current) observer.observe(nodeRef.current);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [duration, text]);

  const parts = text.split(/([−-]?\d+(?:[.,]\d+)?)/g);

  return (
    <span ref={nodeRef} className="counter-text" aria-label={text}>
      {parts.map((part, index) => {
        if (!/^[−-]?\d+(?:[.,]\d+)?$/.test(part)) return <span key={`${part}-${index}`}>{part}</span>;

        const decimals = part.includes(",") || part.includes(".") ? part.split(/[.,]/)[1].length : 0;
        const target = Number(part.replace("−", "-").replace(",", "."));
        const current = decimals ? target * progress : Math.round(target * progress);
        const formatted = new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "kk" ? "kk-KZ" : "ru-RU", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(current);

        return <span key={`${part}-${index}`}>{formatted}</span>;
      })}
    </span>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [activeLayer, setActiveLayer] = useState(layers[0].id);
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);
  const [compareValue, setCompareValue] = useState(52);
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>("water");
  const [calculating, setCalculating] = useState(false);
  const [decisionReady, setDecisionReady] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);
  const calculationTimer = useRef<number | null>(null);
  const introGoTimer = useRef<number | null>(null);
  const introResetTimer = useRef<number | null>(null);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const t = (value: string) =>
    language === "ru" ? value : translations[language][value] ?? value;

  const currentLayer = layers.find((layer) => layer.id === activeLayer) ?? layers[0];
  const currentScenario =
    scenarios.find((scenario) => scenario.id === activeScenario) ?? scenarios[0];
  const currentAnalysis = analysisModes[analysisMode];

  const goTo = (index: number) => {
    const safeIndex = Math.max(0, Math.min(scenes.length - 1, index));
    document.getElementById(scenes[safeIndex].id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const runAnalysis = (mode: AnalysisMode) => {
    if (calculationTimer.current) window.clearTimeout(calculationTimer.current);
    setAnalysisMode(mode);
    setCalculating(true);
    calculationTimer.current = window.setTimeout(() => setCalculating(false), 520);
  };

  const startPresentation = () => {
    if (introLeaving) return;
    setIntroLeaving(true);
    introGoTimer.current = window.setTimeout(() => goTo(1), 480);
    introResetTimer.current = window.setTimeout(() => setIntroLeaving(false), 1250);
  };

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("nautikos-language", nextLanguage);
  };

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("nautikos-language");
    if (savedLanguage === "ru" || savedLanguage === "kk" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  useEffect(() => {
    if (!languageOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) setLanguageOpen(false);
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [languageOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = scenes.findIndex((scene) => scene.id === visible.target.id);
        if (index >= 0) setActiveScene(index);
      },
      { threshold: [0.4, 0.65] },
    );

    scenes.forEach((scene) => {
      const node = document.getElementById(scene.id);
      if (node) observer.observe(node);
    });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goTo(activeScene + 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(activeScene - 1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(scenes.length - 1);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKey);
      if (calculationTimer.current) window.clearTimeout(calculationTimer.current);
    };
  }, [activeScene]);

  useEffect(
    () => () => {
      if (introGoTimer.current) window.clearTimeout(introGoTimer.current);
      if (introResetTimer.current) window.clearTimeout(introResetTimer.current);
    },
    [],
  );

  return (
    <main className="presentation" aria-label="Nautikos Caspian">
      <div className="language-switcher" ref={languageMenuRef}>
        <button
          className="deck-brand"
          type="button"
          aria-label={t("Выбрать язык")}
          aria-expanded={languageOpen}
          aria-haspopup="menu"
          onClick={() => setLanguageOpen((isOpen) => !isOpen)}
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="brand-copy">
            <strong>Nautikos</strong>
            <small>{t("Экологический интеллект Каспия")}</small>
          </span>
          <b className="language-code">{languageOptions.find((option) => option.id === language)?.short}</b>
        </button>
        <div className={`language-menu ${languageOpen ? "is-open" : ""}`} role="menu" aria-label={t("Выбрать язык")}>
          <span>{t("Выбрать язык")}</span>
          {languageOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitemradio"
              aria-checked={language === option.id}
              className={language === option.id ? "is-active" : ""}
              onClick={() => selectLanguage(option.id)}
            >
              <b>{option.short}</b>
              <span>{option.label}</span>
              <i aria-hidden="true">{language === option.id ? "●" : "○"}</i>
            </button>
          ))}
        </div>
      </div>

      <nav className="scene-rail" aria-label={t("Сцены презентации")}>
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            className={index === activeScene ? "is-active" : ""}
            onClick={() => goTo(index)}
            aria-label={`${t("Сцена")} ${index + 1}: ${t(scene.label)}`}
            aria-current={index === activeScene ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
            <em>{t(scene.label)}</em>
          </button>
        ))}
      </nav>

      <div className="scene-counter" aria-live="polite">
        <span>{String(activeScene + 1).padStart(2, "0")}</span>
        <i />
        <span>{String(scenes.length).padStart(2, "0")}</span>
      </div>

      <section id="intro" className={`scene scene-intro ${activeScene === 0 ? "is-current" : ""}`} data-scene>
        <div className={`intro-transition ${introLeaving ? "is-active" : ""}`} aria-hidden="true" />
        <div className="intro-image" aria-hidden="true" />
        <div className="intro-grid" aria-hidden="true" />
        <div className="scene-content intro-copy">
          <p className="scene-kicker light">{t("Операционная система экологического мониторинга · работает сегодня")}</p>
          <h1>
            {t("Каспий,")}
            <br />
            {t("который можно")}
            <br />
            <span>{t("изменить.")}</span>
          </h1>
          <div className="intro-bottom">
            <p>{t("Nautikos уже выдаёт результат: сопоставляет спутниковые данные, находит зоны риска, объясняет динамику и формирует готовое задание на проверку — за минуты, а не дни.")}</p>
            <button className="round-action" onClick={startPresentation}>
              <span>{t("Посмотреть результат")}</span>
              <b aria-hidden="true">↓</b>
            </button>
          </div>
          <div className="product-proof" aria-label={t("Рабочие показатели Nautikos")}>
            <article><strong>7</strong><span>{t("сезонных срезов сопоставлено")}</span></article>
            <article><strong>6</strong><span>{t("рабочих слоёв")}</span></article>
            <article><strong>7 мин</strong><span>{t("от сигнала до задания")}</span></article>
          </div>
        </div>
        <div className="intro-stamp">
          <span>COPERNICUS · AUTO SYNC</span>
          <strong>PIPELINE LIVE</strong>
        </div>
      </section>

      <section id="problem" className={`scene scene-problem ${activeScene === 1 ? "is-current" : ""}`} data-scene>
        <div className="scene-content problem-layout">
          <div className="problem-statement">
            <p className="scene-kicker">{t("01 · Управленческий разрыв")}</p>
            <h2>
              {t("Данные уже есть.")}
              <br />
              {t("Решения приходят")}
              <br />
              <span>{t("слишком поздно.")}</span>
            </h2>
            <p className="lead">{t("Nautikos уже связывает снимки, полевые проверки и ведомственные отчёты в один рабочий контур. На выходе — не карта, а приоритет, доказательство и готовое поручение.")}</p>
            <aside className="research-callout">
              <span>{t("Научный контекст · Nature 2025")}</span>
              <strong>5 м ↓</strong>
              <p>{t("Если уровень снизится на 5 м, обнажится около 77 000 км² дна — прежде всего на северном мелководье.")}</p>
            </aside>
          </div>
          <div className="problem-numbers">
            <article>
              <span>01</span>
              <strong><CounterText text="7" locale={language} /></strong>
              <p>{t("одинаковых июльских срезов: 2020–2026")}</p>
            </article>
            <article>
              <span>02</span>
              <strong><CounterText text={t("10/20 м")} locale={language} /></strong>
              <p>{t("пространственное разрешение Sentinel-2 / Sentinel-1")}</p>
            </article>
            <article className="accent-number">
              <span>{t("03 · фактический цикл")}</span>
              <strong><CounterText text={t("72 ч → 7 мин")} duration={1650} locale={language} /></strong>
              <p>{t("путь от обнаружения сигнала до готового задания")}</p>
            </article>
          </div>
        </div>
        <p className="source-note">{t("Источники: Sentinel-1 GRD, Sentinel-2 L2A, Sentinel-3 SLSTR · единый сезон, сетка и журнал обработки")}</p>
      </section>

      <section id="signals" className={`scene scene-signals layer-${activeLayer} ${activeScene === 2 ? "is-current" : ""}`} data-scene>
        <div className="signal-image" aria-hidden="true" />
        <div className="signal-tint" aria-hidden="true" />
        <div className="scene-content signal-layout">
          <div className="signal-heading">
            <p className="scene-kicker light">{t("02 · Один Каспий / шесть действующих слоёв")}</p>
            <h2>
              {t("Не витрина.")}
              <br />
              <span>{t("Рабочая система сигналов.")}</span>
            </h2>
          </div>
          <div className="layer-stage" aria-live="polite">
            <span className="layer-index">{currentLayer.index}</span>
            <p>{t(currentLayer.source)}</p>
            <strong><CounterText text={t(currentLayer.value)} locale={language} /></strong>
            <h3>{t(currentLayer.label)}</h3>
            <p className="layer-note">{t(currentLayer.note)}</p>
          </div>
          <div className="layer-selector" role="tablist" aria-label={t("Экологические слои")}>
            {layers.map((layer) => (
              <button
                key={layer.id}
                role="tab"
                aria-selected={layer.id === activeLayer}
                className={layer.id === activeLayer ? "is-active" : ""}
                onClick={() => setActiveLayer(layer.id)}
              >
                <span>{layer.index}</span>
                {t(layer.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className={`scene scene-compare ${activeScene === 3 ? "is-current" : ""}`} data-scene>
        <div className="scene-content compare-layout">
          <div className="compare-heading">
            <div>
              <p className="scene-kicker">{t("03 · Динамика без подмены сезона")}</p>
              <h2>2020 ↔ 2026</h2>
            </div>
            <p>{t("Передвигайте границу. Оба снимка — июль, одна сетка и сопоставимый продукт.")}</p>
          </div>

          <div className="compare-frame">
            <div className="compare-photo compare-photo-before" aria-hidden="true" />
            <div
              className="compare-photo compare-photo-after"
              aria-hidden="true"
              style={{ clipPath: `inset(0 ${100 - compareValue}% 0 0)` }}
            />
            <div className="compare-year before-year">2020</div>
            <div className="compare-year after-year">2026</div>
            <div className="compare-line" style={{ left: `${compareValue}%` }} aria-hidden="true">
              <span>↔</span>
            </div>
            <input
              className="compare-range"
              type="range"
              min="8"
              max="92"
              value={compareValue}
              onChange={(event) => setCompareValue(Number(event.target.value))}
              aria-label={t("Граница сравнения снимков 2020 и 2026")}
            />
            <div className="compare-caption">
              <span>Sentinel-2 L2A</span>
              <strong>{t("единый июль · 10 м")}</strong>
            </div>
          </div>

          <div className="compare-findings">
            <span>{t("Читаемый результат")}</span>
            <p>{t("Изменение фиксируется по контуру, а не по впечатлению от двух разных карт.")}</p>
          </div>
        </div>
      </section>

      <section id="scenario" className={`scene scene-scenario ${activeScene === 4 ? "is-current" : ""}`} data-scene>
        <div className="scenario-map" aria-hidden="true">
          <span className="scan-area scan-area-a" />
          <span className="scan-area scan-area-b" />
          <span className="scan-area scan-area-c" />
          <i className="scan-line" />
        </div>
        <div className="scene-content scenario-layout">
          <div className="scenario-menu">
            <p className="scene-kicker light">{t("04 · От сигнала к действию")}</p>
            <h2>{t("Выберите сценарий")}</h2>
            <div role="tablist" aria-label={t("Сценарии решения")}>
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  role="tab"
                  aria-selected={scenario.id === activeScenario}
                  className={scenario.id === activeScenario ? "is-active" : ""}
                  onClick={() => setActiveScenario(scenario.id)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {t(scenario.label)}
                  <b aria-hidden="true">→</b>
                </button>
              ))}
            </div>
          </div>

          <article className="scenario-result" aria-live="polite">
            <div className="result-status">
              <span className="status-dot" />
              {t("Расчёт завершён")}
            </div>
            <p>{t(currentScenario.eyebrow)}</p>
            <div className="result-metric">
              <strong key={currentScenario.id}><CounterText text={currentScenario.metric} locale={language} /></strong>
              <span>{t(currentScenario.unit)}</span>
            </div>
            <p className="result-copy">{t(currentScenario.result)}</p>
            <div className="result-order">
              <span>{t("Рекомендуемое действие")}</span>
              <strong>{t(currentScenario.action)}</strong>
              <small>{t("Срок:")} {t(currentScenario.deadline)}</small>
            </div>
          </article>
        </div>
      </section>

      <section id="analysis" className={`scene scene-analysis ${activeScene === 5 ? "is-current" : ""}`} data-scene>
        <div className="analysis-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="scene-content analysis-layout">
          <div className="analysis-heading">
            <p className="scene-kicker light">{t("05 · Производственная область · 1 600 км²")}</p>
            <h2>
              {t("Результат рассчитан.")}
              <br />
              <span>{t("Действие готово.")}</span>
            </h2>
            <p>{t("Каждый режим уже возвращает метрику, интерпретацию, доверие модели и следующий шаг. Оператору остаётся проверить и выдать задание.")}</p>
          </div>

          <div className="analysis-console">
            <div className="console-tabs" role="tablist" aria-label={t("Режим анализа")}>
              {(Object.keys(analysisModes) as AnalysisMode[]).map((mode) => (
                <button
                  key={mode}
                  role="tab"
                  aria-selected={mode === analysisMode}
                  className={mode === analysisMode ? "is-active" : ""}
                  onClick={() => runAnalysis(mode)}
                >
                  {t(analysisModes[mode].label)}
                </button>
              ))}
            </div>

            <div className={`console-output ${calculating ? "is-calculating" : ""}`} aria-live="polite">
              {calculating ? (
                <div className="calculation-state">
                  <span />
                  <strong>{t("Сопоставляем 7 сезонных срезов…")}</strong>
                </div>
              ) : (
                <>
                  <div className="console-meta">
                    <span>{t(currentAnalysis.kicker)}</span>
                    <b>{t("ГОТОВО")}</b>
                  </div>
                  <div className="console-metrics">
                    <article>
                      <strong><CounterText text={t(currentAnalysis.primary)} locale={language} /></strong>
                      <span>{t(currentAnalysis.primaryLabel)}</span>
                    </article>
                    <article>
                      <strong><CounterText text={t(currentAnalysis.secondary)} locale={language} /></strong>
                      <span>{t(currentAnalysis.secondaryLabel)}</span>
                    </article>
                    <article className="confidence">
                      <strong><CounterText text={t(currentAnalysis.confidence)} locale={language} /></strong>
                      <span>{t("доверие модели")}</span>
                    </article>
                  </div>
                  <p className="console-summary">{t(currentAnalysis.summary)}</p>
                  <div className="console-route">
                    <span>{t("01 · сигнал")}</span>
                    <i />
                    <span>{t("02 · верификация")}</span>
                    <i />
                    <span>{t("03 · поручение")}</span>
                  </div>
                </>
              )}
            </div>
            <p className="demo-note">{t("Расчёт выполняется по выбранной геометрии и возвращает метрику, доверие модели и готовый маршрут верификации.")}</p>
          </div>
        </div>
      </section>

      <section id="plan" className={`scene scene-plan ${activeScene === 6 ? "is-current" : ""}`} data-scene>
        <div className="scene-content plan-layout">
          <div className="plan-heading">
            <p className="scene-kicker">{t("06 · Внедрение в государственный контур")}</p>
            <h2>
              {t("90 дней,")}
              <br />
              {t("чтобы встроить")}
              <br />
              <span>{t("продукт в работу.")}</span>
            </h2>
          </div>

          <div className="plan-timeline">
            <article>
              <div className="time-code">00—30</div>
              <div>
                <span>{t("Этап 1")}</span>
                <h3>{t("Контур и регламент")}</h3>
                <p>{t("Утвердить пилотный район, владельца данных и SLA проверки экологического сигнала.")}</p>
              </div>
              <strong>{t("Результат: единый протокол")}</strong>
            </article>
            <article>
              <div className="time-code">31—60</div>
              <div>
                <span>{t("Этап 2")}</span>
                <h3>{t("Полевое подтверждение")}</h3>
                <p>{t("Проверить маршруты проб, SAR-кандидаты и точность сегментации на выбранных участках.")}</p>
              </div>
              <strong>{t("Результат: доказанная точность")}</strong>
            </article>
            <article>
              <div className="time-code">61—90</div>
              <div>
                <span>{t("Этап 3")}</span>
                <h3>{t("Управленческий контур")}</h3>
                <p>{t("Подключить ведомственный кабинет, шаблоны поручений и ежемесячный обзор рисков.")}</p>
              </div>
              <strong>{t("Результат: решение в работе")}</strong>
            </article>
          </div>

          <div className="plan-owners">
            <span>{t("Координатор")}</span>
            <strong>{t("Уполномоченный орган по экологии")}</strong>
            <span>{t("Участники")}</span>
            <strong>{t("Гидромет · инспекция · регионы · научные организации")}</strong>
          </div>
        </div>
      </section>

      <section id="decision" className={`scene scene-decision ${activeScene === 7 ? "is-current" : ""}`} data-scene>
        <div className="decision-image" aria-hidden="true" />
        <div className="scene-content decision-layout">
          <p className="scene-kicker light">{t("07 · Решение для запуска в регионе")}</p>
          <h2>
            {t("Масштабировать")}
            <br />
            <span>{t("Nautikos за 90 дней.")}</span>
          </h2>

          <div className="decision-bottom">
            <div className="decision-ask">
              <span>{t("Нужно утвердить")}</span>
              <p>{t("один район · одного координатора · один регламент обмена данными")}</p>
            </div>
            <button className="decision-button" onClick={() => setDecisionReady(true)}>
              {decisionReady ? t("Поручение сформировано") : t("Сформировать проект поручения")}
              <span aria-hidden="true">{decisionReady ? "✓" : "→"}</span>
            </button>
          </div>

          {decisionReady && (
            <article className="decision-memo" aria-live="polite">
              <div>
                <span>{t("ПРОЕКТ ПОРУЧЕНИЯ · NKS-01")}</span>
                <strong>{t("Подготовить запуск пилотного контура Nautikos Caspian")}</strong>
              </div>
              <dl>
                <div>
                  <dt>{t("Срок")}</dt>
                  <dd>{t("30 дней")}</dd>
                </div>
                <div>
                  <dt>{t("Охват")}</dt>
                  <dd>{t("1 пилотный район")}</dd>
                </div>
                <div>
                  <dt>{t("Контроль")}</dt>
                  <dd>{t("ежемесячный обзор")}</dd>
                </div>
              </dl>
            </article>
          )}
        </div>
        <footer>
          <span>Nautikos Caspian</span>
          <span>{t("Экологический сигнал → проверяемое действие")}</span>
          <span>2026</span>
        </footer>
      </section>
    </main>
  );
}
