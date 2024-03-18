# Метадані PX4: Переклад і публікація (Параметри, Події)

PX4 використовує та генерує дані, які мають відповідні метадані, зрозумілі людині й машині:

- [Параметри](../advanced_config/parameters.md) налаштовують поведінку PX4.
  - Параметр представлено рядком ідентифікатора, який зіставляється зі значенням, що зберігається у PX4.
  - Відповідні метадані включають опис параметра, його можливі значення, інформацію про те, як значення може бути представлено (наприклад, для бітових масок).
- [Події](../concept/events_interface.md) повідомляють про події, такі як причини збою, попередження про низький заряд батареї, кінець калібрування і так далі.
  - Подія позначається ідентифікатором і надсилається з відповідним рівнем журналу, деяким повідомленням та аргументами.
  - Пов'язані метадані включають опис події та аргументи.

Метадані та переклади метаданих надаються зовнішнім системам, таким як QGroundControl, що дозволяє їм відображати інформацію про параметри та події у вигляді рядка рідною мовою користувача.

У цій темі пояснюється, як можна визначити метадані та допомогти перекладати рядки (а також "просто для інформації", як це все працює).

## Переклад метаданих

Переклад метаданих PX4 виконується за допомогою Crowdin у проєкті [PX4-Metadata-Translations](https://crowdin.com/project/px4-metadata-translations).
Для отримання додаткової інформації про роботу з PX4 та Crowdin див. [Переклад](../contribute/translation.md).

## Визначення метаданих

Метадані PX4 визначаються у вихідному коді PX4 разом з відповідними даними.
Часто це робиться у C/C++-коментарі зі спеціальною розміткою для позначення полів метаданих та їхніх значень.
В деяких випадках використовуються YAML файли.

Докладнішу інформацію див. у темах для кожного типу даних:

- [Параметри та конфігурації > Створення/визначення параметрів](../advanced/parameters_and_configurations.md#creating-defining-parameters)
- [Інтерфейс подій](. ./concept/events_interface.md)

## Інструментарій метаданих

Процес обробки метаданих однаковий для метаданих події та метаданих параметрів.

Метадані збираються у файли JSON та XML кожного разу, коли збирається PX4.

Для більшості польотних контролерів (оскільки більшість з них мають достатньо доступного FLASH), файл JSON стискається xz-стисненням і зберігається у згенерованому бінарному файлі.
Потім файл передається наземним станціям за допомогою протоколу MAVLink [Component Information Protocol] (https\://mavlink.io/en/services/component_information.html).
Використання протоколу метаданих компонентів гарантує, що одержувач завжди отримує актуальні метадані для коду, що виконується на апараті.

Бінарні файли для контролерів польоту з обмеженим обсягом пам'яті не зберігають метадані параметрів у бінарному файлі, а натомість посилаються на ті самі дані, що зберігаються на `px4-travis.s3.amazonaws.com`.
Це стосується, наприклад, [Omnibus F4 SD](../flight_controller/omnibus_f4_sd.md).
Метадані завантажуються через [github CI](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/metadata.yml) для всіх цілей збірки (таким чином, вони будуть доступні лише після того, як параметри будуть об'єднані в main).

:::note
You can identify memory constrained boards because they specify `CONFIG_BOARD_CONSTRAINED_FLASH=y` in their [px4board definition file](https://github.com/PX4/PX4-Autopilot/blob/main/boards/omnibus/f4sd/default.px4board).

Якщо ви виконуєте індивідуальну розробку на платі з обмеженою FLASH-пам'яттю, ви можете змінити URL-адресу [тут](https\://github. com/PX4/PX4-Autopilot/blob/main/src/lib/component_information/CMakeLists.txt#L41), щоб вказати на інший сервер.
:::

Метадані на `px4-travis.s3.amazonaws.com` використовуються, якщо метадані параметрів відсутні на бортовому комп'ютері безпілотника.
Він також може використовуватися як запасний варіант, щоб уникнути дуже повільного завантаження через низькошвидкісне телеметричне з'єднання.

JSON-файли метаданих для CI-збірок `main` також копіюються до репозиторію github: [PX4/PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/).
Це інтегрується з Crowdin для отримання перекладів, які зберігаються у теці [translated](https://github.com/PX4/PX4-Metadata-Translations/tree/main/translated) як xz-стиснуті файли перекладу для кожної мови.
These are referenced by the vehicle component metadata, and are downloaded when needed.
For more information see [PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/) and [Component Metadata Protocol > Translation](https://mavlink.io/en/services/component_information.html#translation).

:::note
The parameter XML file of the main branch is copied into the QGC source tree via CI and is used as a fallback in cases where no metadata is available via the component metadata protocol (this approach predates the existence of the component metadata protocol).
:::

## Further Information

- [Parameters & Configurations](../advanced/parameters_and_configurations.md)
- [Events Interface](../concept/events_interface.md)
- [Translation](../contribute/translation.md)
- [Component Metadata Protocol](https://mavlink.io/en/services/component_information.html) (mavlink.io)
- [PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/) (Github)
