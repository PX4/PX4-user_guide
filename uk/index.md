<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="Логотип PX4" width="180px" /></a></div>

# Посібник користувача автопілота PX4

[![Релізів](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Обговорення](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 це _Professional Autopilot_. Розроблений розробниками світового класу з дрон індустрії та наукових закладів і активно підтримується спільнотою у світі. Він дозволяє працювати з різними типами безпілотних транспортних засобів від гоночних, вантажних дронів до сухопутних автомобілів та надводних човнів.

:::tip
Цей посібник містить всю інформацію, що вам потрібно знати щоб зібрати, налаштувати та безпечно запускати пристрій на основі PX4. Хочете зробити внесок? Перегляньте розділ [Розробка](development/development.md).

:::

:::warning
Цей посібник стосується версії PX4 для _розробки_ (`основна` гілка). Use the **Version** selector to find the current _stable_ version.

Задокументовані зміни з моменту випуску стабільної версії відображені в [примітці до випуску](releases/main.md), що розвивається. :::

## Як почати?

[Basic Concepts](getting_started/px4_basic_concepts.md) should be read by all users! It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicle types, telemetry systems, RC control systems).

Залежно від того, чого ви хочете досягти, наступні поради допоможуть вам мандрувати по цьому посібнику:

### I want a vehicle that works with PX4

In the [Multicopter](frames_multicopter/index.md), [VTOL](frames_vtol/index.md), and [Plane (Fixed-Wing)](frames_plane/index.md) sections you'll find topics like the following (these links are for multicopter):

- [Complete Vehicles](complete_vehicles_mc/index.md) list "Ready to Fly" (RTF) pre-built vehicles
- [Kits](frames_multicopter/kits.md) lists drones that you have to build yourself from a set of preselected parts
- [DIY Builds](frames_multicopter/diy_builds.md) shows some examples of drones that have been built using parts that were sourced individually

Both kits and complete vehicles usually include everything you need except for a battery and RC System. Kits are usually not hard to build, provide a good introduction to how drones fit together, and are relatively inexpensive. We provide generic instructions for assembly, such as [Assembling a Multicopter](assembly/assembly_mc.md), and most kits come with specific instructions too.

If the kits and complete drones aren't quite right for you then you can build a vehicle from scratch, but this requires more knowledge. [Airframe Builds](airframes/index.md) lists the supported frame starting points to give you some idea of what is possible.

Once you have a vehicle that supports PX4 you will need to configure it and calibrate the sensors. Each vehicle type has its own configuration section that explains the main steps, such as [Multicopter Configuration/Tuning](config_mc/index.md).

### I want to add a payload/camera

The [Payloads](payloads/index.md) section describes how to add a camera and how to configure PX4 to enable you to deliver packages.

### I am modifying a supported vehicle

The [Hardware Selection & Setup](hardware/drone_parts.md) section provides both high level and product-specific information about hardware that you might use with PX4 and its configuration. This is the first place you should look if you want to modify a drone and add new components.

### I want to fly

Before you fly you should read [Operations](config/operations.md) to understand how to set up the safety features of your vehicle and the common behaviours of all frame types. Once you've done that you're ready to fly.

Basic instructions for flying each vehicle type are provided in the respective sections, such as [Basic Flying (Multicopter)](flying/basic_flying_mc.md).

### I want to run PX4 on a new Flight Controller and extend the platform

The [Development](development/development.md) section explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

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

<!--@include: _contributors.md-->

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
