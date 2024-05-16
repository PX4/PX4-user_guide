<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="Логотип PX4" width="180px" /></a></div>

# Посібник користувача автопілота PX4

[![Релізів](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Обговорення](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 це _Professional Autopilot_. Розроблений розробниками світового класу з дрон індустрії та наукових закладів і активно підтримується спільнотою у світі. Він дозволяє працювати з різними типами безпілотних транспортних засобів від гоночних, вантажних дронів до сухопутних автомобілів та надводних човнів.

:::tip
Цей посібник містить всю інформацію, що вам потрібно знати щоб зібрати, налаштувати та безпечно запускати пристрій на основі PX4. Хочете зробити внесок? Перегляньте розділ [Розробка](development/development.md).

:::

:::warning
Цей посібник стосується версії PX4 для _розробки_ (`основна` гілка). Використовуйте селектор **Версія** для поточної _стабільної_ версії.

Задокументовані зміни з моменту випуску стабільної версії відображені в [примітці до випуску](releases/main.md), що розвивається. :::

## Як почати?

[Початок роботи](getting_started/index.md) цей гайд мають прочитати всі користува! Він включає в себе огляд PX4, функції, які надає стек польотів (режими польоту та функції безпеки) та підтримувані апаратні платформи (контролери польотів, транспортні засоби, планери, системи телеметрії, системи контролю RC).

Залежно від того, чого ви хочете досягти, наступні поради допоможуть вам мандрувати по цьому посібнику:

**У мене вже є безпілотник, і я просто хочу літати:**

Якщо ви  маєте готові до польоту (RTF), який підтримує PX4:

- [Базова конфігурація](config/index.md) пояснює, як оновити вашу прошивку до останньої версії, калібрувати основні датчики (компас, спорт/МВФ, швидкість польоту тощо, налаштування свого дистанційного контролю та безпеки функції.
- [Розділ Політ](flying/index.md) навчає польоту, в тому числі де і як безпечно літати, і як вирішувати проблеми, пов'язані з приведенням у стан готовності та польотом. Він також надає детальну інформацію про режими польоту.

**Я хочу побудувати дрон з PX4 з нуля:**

:::tip

"Безпілотні засоби які підтримуються" перераховані в [Airframes](airframes/airframe_reference.md). Це транспортні засоби, які тестували і налаштовували конфігурації, які ви можете завантажити за допомогою _QGroundControl_.

:::

Якщо ви хочете побудувати автомобіль з нуля:

- Оберіть шасі — [Airframe Builds](airframes/index.md) надає перелік підтримуваних шасі та детальні інструкції щодо збірки транспортних засобів.
- Виберіть контролер польоту - див. [Початок > Польотні контролери](getting_started/flight_controller_selection.md) and [Апаратне забезпечення автопілота](flight_controller/index.md).
- [Збірка](assembly/index.md) пояснює, як підключити важливі периферійні пристрої до вашого автопілота.
- [Базова конфігурація](config/index.md) показує, як оновити прошивку і налаштувати її з параметрами, які відповідають вашому шасі. Цей розділ також пояснює, як калібрувати основні датчики (компас, gyro/IMU, швидкість польоту тощо), а також налаштувати ваш дистанційний контроль та функції безпеки.

Коли ви будете готові керувати літаючим засобом, відвідайте розділ [Політ](flying/README.md).

**Я хочу додати вантаж або камеру:**

Розділ корисних навантажень описує як додати камеру або як налаштувати PX4 для доставки вантажів.

- [Корисне навантаження](payloads/index.md) описує як інтегрувати корисні навантаження

**Я змінюю підтримувану версію засобу ( дрона чи іншу) :**

Модифікації польотного контролера і основні датчики покриті вище. Для того, щоб використовувати нові сенсори, або якщо ви зробили зміни, що суттєво впливають на характеристики польоту:

- [Периферійне обладнання](peripherals/index.md) надає додаткову інформацію про використання зовнішніх датчиків.
- [Базова конфігурація](config/index.md) пояснює, як відкалібрувати основні датчики.
- [Розширену конфігураціюn](advanced_config/index.md) слід використовувати для повторного/точного налаштування планера.

**Я хочу запустити PX4 на новому апаратному забезпеченні та розширити платформу:**

- [Розробка](development/development.md) пояснює як підтримувати нові повітряні рамки та типи транспортних засобів, змінювати алгоритми польоту, додавайте нові режими, інтегруйте нове обладнання, спілкуйтеся з PX4 ззовні контролера польоту, і зробіть внесок до PX4.

## Отримання допомоги

На сторінці [Підтримка](contribute/support.md) пояснюється, як отримати допомогу від основної команди розробників і всієї спільноти.

Серед інших речей, які вона покриває:

- [Форуми, в яких ви можете отримати допомогу](contribute/support.md#forums-and-chat)
- [Проблеми діагностики](contribute/support.md#diagnosing-problems)
- [Як повідомляти про помилки](contribute/support.md#issue-bug-reporting)
- [Дзвінок за тиждень](contribute/support.md#weekly-dev-call)

## Повідомлення про помилки та задачі

Якщо у вас виникли проблеми з використанням PX4, спершу опублікуйте їх на [форумах підтримки](contribute/support.md#forums-and-chat) (оскільки вони можуть бути спричинені специфічною апаратною конфігурацією вашого засобу).

За вказівкою команди розробників проблеми з кодом можуть бути підняті та вирішені на [Github тут](https://github.com/PX4/PX4-Autopilot/issues). Якщо це можливо, надайте [журнали польотів](getting_started/flight_reporting.md) та іншу інформацію, яка вимагається в шаблоні проблеми.

## Долучитись до проєкту

Інформацію про те, як зробити внесок у код і документацію, можна знайти в розділі [Contributing](contribute/index.md):

- [Код](contribute/index.md)
- [Документація](contribute/docs.md)
- [Переклади](contribute/translation.md)

## Переклади

Існує кілька варіантів [перекладів](contribute/translation.md) цього посібника. Ви можете отримати доступ до вибору конкретного доступного переклада з меню Мови (вгорі праворуч):

![Вибір мови](../assets/vuepress/language_selector.png)

## Ліцензія

PX4 код є вільним для використання та зміни термінів дозволеного [Ліцензія на речення BSD 3 символів](https://opensource.org/licenses/BSD-3-Clause). Ця документація ліцензована за [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Для отримання додаткової інформації: [ліцензії](contribute/licenses.md).

## Календар  & події

_Календар Dronecode_ показує важливі події спільноти для користувачів платформи і розробників. Виберіть посилання нижче, щоб відобразити календар у вашому часовому поясі (а також додати його до вашого власного календаря):

- [Швейцарія - Цюрих](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
- [Тихоокеанський час - Тіхуана](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
- [Австралія - Мельбурн/Сідней/Хобарт](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
Типовий часовий пояс в календарі - Центральноєвропейський час (CET).

:::

<iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

### Іконки

Наступні значки, що використовуються в цій бібліотеці, мають ліцензію окремо (як показано нижче):

<img src="../assets/site/position_fixed.svg" title="Необхідне виправлення позиції (напр. GPS)" width="30px" /> _placeholder_ зроблена <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> з <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> і ліцензована  <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Автоматичний режим" width="30px" /> _camera-automatic-mode_ іконка зроблена <a href="https://www.freepik.com" title="Freepik">Freepik</a> з <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> і ліцензована <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## Управління

Стек польотів PX4 розміщено під управлінням проєкту [Dronecode](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Логотип Dronecode " width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Логотип Linux Foundation" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
