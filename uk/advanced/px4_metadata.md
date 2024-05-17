# PX4 Metadata

PX4 використовує та генерує дані, які мають відповідні метадані, зрозумілі людині й машині:

- [Параметри](../advanced_config/parameters.md) налаштовують поведінку PX4.
  - Параметр представлено рядком ідентифікатора, який зіставляється зі значенням, що зберігається у PX4.
  - Відповідні метадані включають опис параметра, його можливі значення, інформацію про те, як значення може бути представлено (наприклад, для бітових масок).
- [Події](../concept/events_interface.md) повідомляють про події, такі як причини збою, попередження про низький заряд батареї, кінець калібрування і так далі.
  - An event is represented by an id, and is sent with a log level and arguments.
  - The associated metadata includes a message, a description and a list of arguments (including their type) of each event.
- [Actuators](../config/actuators.md) configuration customizes the specific geometry of the vehicle, assigns actuators and motors to flight controller outputs, and tests the actuator and motor response.
  - The metadata contains information about supported vehicle geometries, a list of output drivers, and how to configure them.
  - _QGroundControl_ uses that information to dynamically build a configuration UI.

The metadata and metadata translations are shared with external systems, such as QGroundControl, allowing them to display information about parameters and events, and to configure vehicle geometry and actuator output mappings.

У цій темі пояснюється, як можна визначити метадані та допомогти перекладати рядки (а також "просто для інформації", як це все працює).

## Переклад метаданих

Переклад метаданих PX4 виконується за допомогою Crowdin у проєкті [PX4-Metadata-Translations](https://crowdin.com/project/px4-metadata-translations).
Для отримання додаткової інформації про роботу з PX4 та Crowdin див. [Переклад](../contribute/translation.md).

## Визначення метаданих

Метадані PX4 визначаються у вихідному коді PX4 разом з відповідними даними.
This is done either in a C/C++ comment with special markup to indicate metadata fields and their values, or using YAML files.

Докладнішу інформацію див. у темах для кожного типу даних:

- [Параметри та конфігурації > Створення/визначення параметрів](../advanced/parameters_and_configurations.md#creating-defining-parameters)
- [Інтерфейс подій](. ./concept/events_interface.md)
- [Actuator Metadata](#actuator-metadata) (below)

## Інструментарій метаданих

The process for handling metadata is the same for all metadata types.

Metadata is collected into JSON files every time PX4 is built.

Для більшості польотних контролерів (оскільки більшість з них мають достатньо доступного FLASH), файл JSON стискається xz-стисненням і зберігається у згенерованому бінарному файлі.
The file is then shared to ground stations using the MAVLink [Component Metadata Protocol](https://mavlink.io/en/services/component_information.html).
Використання протоколу метаданих компонентів гарантує, що одержувач завжди отримує актуальні метадані для коду, що виконується на апараті.
Events metadata is also added to the log files, allowing log analysis tools (such as Flight Review) to use the correct metadata to display events.

Бінарні файли для контролерів польоту з обмеженим обсягом пам'яті не зберігають метадані параметрів у бінарному файлі, а натомість посилаються на ті самі дані, що зберігаються на `px4-travis.s3.amazonaws.com`.
Це стосується, наприклад, [Omnibus F4 SD](../flight_controller/omnibus_f4_sd.md).
Метадані завантажуються через [github CI](https://github.com/PX4/PX4-Autopilot/blob/main/.github/workflows/metadata.yml) для всіх цілей збірки (таким чином, вони будуть доступні лише після того, як параметри будуть об'єднані в main).

::: info
You can identify memory constrained boards because they specify `CONFIG_BOARD_CONSTRAINED_FLASH=y` in their [px4board definition file](https://github.com/PX4/PX4-Autopilot/blob/main/boards/omnibus/f4sd/default.px4board).

Якщо ви виконуєте індивідуальну розробку на платі з обмеженою FLASH-пам'яттю, ви можете змінити URL-адресу [тут](https://github. com/PX4/PX4-Autopilot/blob/main/src/lib/component_information/CMakeLists.txt#L41), щоб вказати на інший сервер.
:::

Метадані на `px4-travis.s3.amazonaws.com` використовуються, якщо метадані параметрів відсутні на бортовому комп'ютері безпілотника.
Він також може використовуватися як запасний варіант, щоб уникнути дуже повільного завантаження через низькошвидкісне телеметричне з'єднання.

JSON-файли метаданих для CI-збірок `main` також копіюються до репозиторію github: [PX4/PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/).
Це інтегрується з Crowdin для отримання перекладів, які зберігаються у теці [translated](https://github.com/PX4/PX4-Metadata-Translations/tree/main/translated) як xz-стиснуті файли перекладу для кожної мови.
На них посилаються метадані компонентів безпілотника, і вони завантажуються за необхідності.
Для отримання додаткової інформації див. [PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/) та [Протокол метаданих компонентів > Переклад](https://mavlink.io/en/services/component_information.html#translation).

:::info
Файл параметрів XML з головної гілки проєкту PX4 копіюється до дерева джерел QGC за допомогою безперервної інтеграції (CI). Цей файл використовується як резервний варіант у випадках, коли метадані недоступні через протокол метаданих компонентів (цей підхід передує появі протоколу метаданих компонентів).
:::

### Actuator Metadata

The following diagram shows how actuator metadata is assembled from the source code and used by QGroundControl:

![Actuators Metadata](../../assets/diagrams/actuator_metadata_processing.svg)

<!-- Source: https://docs.google.com/drawings/d/1hMQmIijdFjr21rREcXj50qz0C1b47JW0OEa6p5P231k/edit -->

- **Left**: the metadata is defined in `module.yml` files in different modules.
  The `control_allocator` modules defines the geometries, while each output driver defines its set of channels and configuration parameters.
  [The schema file](https://github.com/PX4/PX4-Autopilot/blob/main/validation/module_schema.yaml) documents the structure of these yaml files.
- **Middle**: At build time, the `module.yml` files for all enabled modules for the currently built target are parsed and turned into an `actuators.json` file using the [Tools/module_config/generate_actuators_metadata.py](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/module_config/generate_actuators_metadata.py) script.
  There is also [schema file](https://github.com/mavlink/mavlink/blob/master/component_metadata/actuators.schema.json) for this.
- **Right**: At runtime, the JSON file is requested by QGroundControl via MAVLink Component Metadata API (described above).

## Додаткова інформація

- [Параметри та конфігурації](../advanced/parameters_and_configurations.md)
- [Інтерфейс подій](. ./concept/events_interface.md)
- [Переклад](../contribute/translation.md)
- [Протокол метаданих компонентів](https://mavlink.io/en/services/component_information.html) (mavlink.io)
- [PX4-Metadata-Translations](https://github.com/PX4/PX4-Metadata-Translations/) (Github)
