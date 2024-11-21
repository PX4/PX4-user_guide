# Інтерфейс подій

<Badge type="tip" text="PX4 v1.13" />

The _Events Interface_ provides a system-wide API for notification of events, which are published to GCSs via the _MAVLink Events Service_ (to GCSs and other components) and also stored in [system logs](../dev_log/logging.md).

Інтерфейс може використовуватися для публікації подій змін стану або будь-якого іншого типу події, включаючи такі речі, як стан готовності, завершення калібрування і досягнення цільової висоти злету.

:::info
The events interface will replace the use of `mavlink_log_*` calls in PX4 code, (and `STATUS_TEXT` messages in MAVLink) for event notification in PX4 v1.13 and later.
There will be an intermediate period where [both approaches are supported](#backward-compatibility).
:::

## Використання

### Основне

А потім визначте та надішліть подію з бажаного місця коду:

```cpp
#include <px4_platform_common/events.h>
```

А потім визначте та надішліть подію з бажаного місця коду:

```cpp
events::send(events::ID("mymodule_test"), events::Log::Info, "Test Message");
```

#### Зворотна сумісність

For older GCS versions without events interface support, PX4 currently sends out all events also as `mavlink_log_*` `STATUSTEXT` message.
In addition, the message must be tagged with an appended tab (`\t`) so that newer GCS's can ignore that and only show the event.

So whenever adding an event, be sure to also add a `mavlink_log_` call. Наприклад:

```cpp
mavlink_log_info(mavlink_log_pub, "Test Message\t");
events::send(events::ID("mymodule_test"), events::Log::Info, "Test Message");
```

All such `mavlink_log_` calls will be removed after the next release.

### Докладно

Пояснення та вимоги:

```cpp
uint8_t arg1 = 0;
float arg2 = -1.f;
/* EVENT
 * @description
 * This is the detailed event description.
 *
 * - value of arg1: {1}
 * - value of arg2: {2:.1}
 *
 * <profile name="dev">
 * (This paragraph is only meant to be shown to developers).
 * This behavior can be configured with the parameter <param>COM_EXAMPLE</param>.
 * </profile>
 *
 * Link to documentation: <a>https://docs.px4.io</a>
 */
events::send<uint8_t, float>(events::ID("event_name"),
	{events::Log::Error, events::LogInternal::Info}, "Event Message", arg1, arg2);
```

Події можуть мати незмінний набір аргументів, які можна вкласти у повідомлення або опис використовуючи шаблонні замінники (наприклад <code>{2:.1m}</code>, дивіться наступний розділ).

- `/* EVENT`: This tag indicates that a comment defines metadata for the following event.

- **event_name**: the event name (`events::ID(event_name)`).
  - повинно бути унікальним в межах всього вихідного коду PX4.
    Як загальне правило, додайте префікс з назвою модуля або вихідного файлу для великих модулів.
  - має бути дійсна назва змінної, тобто не повинна містити пробіли, двокрапки тощо.
  - з цього імені отримується 24-бітний ID події за допомогою геш-функції.
    Це означає, що до тих пір, поки ім'я події залишається однаковим, ID залишиться тим же.

- **Log Level**:

  - valid log levels are the same as used in the MAVLink [MAV_SEVERITY](https://mavlink.io/en/messages/common.html#MAV_SEVERITY) enum.
    Рівні перелічені за зменшенням важливості:

    ```plain
    Emergency,
    Alert,
    Critical,
    Error,
    Warning,
    Notice,
    Info,
    Debug,
    Disabled,
    ```

  ```
  - Above we specify a separate external and internal log level, which are the levels displayed to GCS users and in the log file, respectively: `{events::Log::Error, events::LogInternal::Info}`.
    For the majority of cases you can pass a single log level, and this will be used for both exernal and internal cases.
  There are cases it makes sense to have two different log levels.
  For example an RTL failsafe action: the user should see it as Warning/Error, whereas in the log, it is an expected system response, so it can be set to `Info`.
  ```

- **Event Message**:
  - Коротке повідомлення про подію в один рядок.
    It may contain template placeholders for arguments (e.g. `{1}`). Для додаткової інформації дивіться нижче.

- **Event Description**:
  - Докладний, необов'язковий опис події.
  - Може бути кілька рядів/абзаців.
  - It may contain template placeholders for arguments (e.g. `{2}`) and supported tags (see below)

#### Аргументи та перерахування

Events can have a fixed set of arguments that can be inserted into the message or description using template placeholders (e.g. `{2:.1m}` - see next section).

Valid types: `uint8_t`, `int8_t`, `uint16_t`, `int16_t`, `uint32_t`, `int32_t`, `uint64_t`, `int64_t` and `float`.

Формат тексту для опису повідомлення події:

- PX4-specific/custom enumerations for events should be defined in [src/lib/events/enums.json](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/events/enums.json), and can then be used as event argument in the form of `events::send<events::px4::enums::my_enum_t>(...)`.
- MAVLink "common" events are defined in [mavlink/libevents/events/common.json](https://github.com/mavlink/libevents/blob/master/events/common.json) and can be used as event argument in the form of `events::send<events::common::enums::my_enum_t>(...)`.

#### Формат тексту

Події записуються відповідно до рівня внутрішнього журналювання, а <a href="../log/flight_review.md">Огляд польоту</a> показує події.

- символи можна екранувати за допомогою \\

  These have to be escaped: '\\\\', '\\<', '\\{'.

- теги що підтримуються:

  - Profiles: `<profile name="[!]NAME">CONTENT</profile>`

    `CONTENT` will only be shown if the name matches the configured profile.
    Це може бути використано, наприклад, щоб приховати інформацію для розробників від кінцевих користувачів.

  - URLs: `<a [href="URL"]>CONTENT</a>`.
    If `href` is not set, use `CONTENT` as `URL` (i.e.`<a>https://docs.px4.io</a>` is interpreted as `<a href="https://docs.px4.io">https://docs.px4.io</a>`)

  - Parameters: `<param>PARAM_NAME</param>`

  - не дозволено використовувати вкладені теги того ж типу

- аргументи: шаблонні замінники, що відповідають синтаксису python з індексацією що починається з 1 (замість 0)

  - general form: `{ARG_IDX[:.NUM_DECIMAL_DIGITS][UNIT]}`

    UNIT:

    - m: горизонтальна відстань в метрах
    - m_v: вертикальна відстань в метрах
    - m^2: площа в метрах квадратних
    - m/s: швидкість у метрах в секунду
    - C: температура у градусах Цельсія

  - `NUM_DECIMAL_DIGITS` only makes sense for real number arguments.

## Логування

Events are logged according to the internal log level, and [Flight Review](../log/flight_review.md) displays events.

:::info
Flight review downloads metadata based on PX4 master, so if a definition is not yet on master, it will only be able to display the event ID.
:::

## Імплементація

Метадані для всіх подій вбудовані в окремий JSON файл метаданих (з використанням python скрипту, який сканує весь вихідний код у пошуках викликів подій).

Метадані для всіх подій вбудовані в окремий JSON файл метаданих (з використанням python скрипту, який сканує весь вихідний код у пошуках викликів подій).

### Публікація метаданих події в GCS

The event metadata JSON file is compiled into firmware (and/or hosted on the Internet), and made available to ground stations via the [MAVLink Component Metadata service](https://mavlink.io/en/services/component_information.html).
Для отримання додаткової інформації див. <a href="../advanced/px4_metadata.md"> Метадані PX4 (трансляція і публікація)</a>.

This process is the same as for [parameter metadata](../advanced/parameters_and_configurations.md#publishing-parameter-metadata-to-a-gcs).
For more information see [PX4 Metadata (Translation & Publication)](../advanced/px4_metadata.md)
