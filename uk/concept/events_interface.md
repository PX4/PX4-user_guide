# Інтерфейс подій

_Інтерфейс подій_ забезпечує загальносистемне API для повідомлень про події, які публікуються у GCS через _сервіс подій MAVLink_ (в GCS та інші компоненти), а також зберігаються у [системних журналах](../dev_log/logging.md).

Інтерфейс може використовуватися для публікації подій змін стану або будь-якого іншого типу події, включаючи такі речі, як стан готовності, завершення калібрування і досягнення цільової висоти злету.

:::note
інтерфейс подій замінить використання викликів `mavlink_log_*` у коді PX4, (а також повідомлень `STATUS_TEXT` у MAVLink) для сповіщення про події в релізах PX4 після v1.12. Буде проміжний період коли [обидва підходи будуть підтримуватися](#backward-compatibility).
:::

## Застосування

### Основне

Щоб використовувати API, додайте це включення:

```cpp
#include <px4_platform_common/events.h>
```

А потім визначте та надішліть подію з бажаного місця коду:

```cpp
events::send(events::ID("mymodule_test"), events::Log::Info, "Test Message");
```

#### Зворотна сумісність

Для старих версій GCS без підтримки інтерфейсу подій, PX4 на цей момент надсилає також всі події як `mavlink_log_*` `STATUSTEXT` повідомлення. Крім того, повідомлення має бути промарковано додатковою табуляцією (`\t`), щоб нові GCS змогли проігнорувати це і показати тільки подію.

Отже, коли ви додаєте подію, не забудьте також додати виклик `mavlink_log_`. Наприклад:

```cpp
mavlink_log_info(mavlink_log_pub, "Test Message\t");
events::send(events::ID("mymodule_test"), events::Log::Info, "Test Message");
```

Після наступного релізу всі виклики `mavlink_log_` будуть видалені.

### Докладно

Вище - мінімальний приклад, цей - у більш розширеному вигляді:

```cpp
uint8_t arg1 = 0;
float arg2 = -1.f;
/* EVENT
 * @description
 * Це докладний опис події.
 *
 * - значення arg1: {1}
 * - значення arg2: {2:.1}
 *
 * <profile name="dev">
 * (Цей абзац призначено для показу тільки розробникам).
 * Цю поведінку можна налаштувати за допомогою параметра <param>COM_EXAMPLE</param>.
 * </profile>
 *
 * Посилання на документацію: <a>https://docs.px4.io</a>
 */
events::send<uint8_t, float>(events::ID("event_name"),
    {events::Log::Error, events::LogInternal::Info}, "Event Message", arg1, arg2);
```

Пояснення та вимоги:

- `/* EVENT`: Цей тег вказує, що коментар описує метадані для наступної події.
- **event_name**: ім'я події (`events::ID(event_name)`).
  - повинно бути унікальним в межах всього вихідного коду PX4. Як загальне правило, додайте префікс з назвою модуля або вихідного файлу для великих модулів.
  - має бути дійсна назва змінної, тобто не повинна містити пробіли, двокрапки тощо.
  - з цього імені отримується 24-бітний ID події за допомогою геш-функції. Це означає, що до тих пір, поки ім'я події залишається однаковим, ID залишиться тим же.
- **Рівень журналювання**:

  - припустимі рівні журналювання такі ж, як і у перерахуванні MAVLink [MAV_SEVERITY](https://mavlink.io/en/messages/common.html#MAV_SEVERITY). Рівні перелічені за зменшенням важливості:

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
  - Попередньо ми вказали окремий зовнішній і внутрішній рівень журналювання, які є рівнями для користувачів GCS і в файлі журналу, відповідно: `{events::Log::Error, events::LogInternal::Info}`.
    Для більшості випадків ви можете передати один рівень журналювання, і це буде використовуватися як для зовнішніх, так і для внутрішніх випадків.
  Є випадки, коли є сенс мати два різних рівні журналювання.
  Наприклад, дія запобігання RTL: користувач повинен бачити його як Warning/Error, тоді як в журналі це очікувана відповідь системи, тому його можна встановити в `Info`.
  ```

- **Повідомлення про подію**:
  - Коротке повідомлення про подію в один рядок. Може мати шаблонні замінники для аргументів (наприклад `{1}`). Для додаткової інформації дивіться нижче.
- **Опис події**:
  - Докладний, необов'язковий опис події.
  - Може бути кілька рядів/абзаців.
  - Може мати шаблонні замінники для аргументів (тобто `{2}`) та тегів що підтримуються (дивіться нижче).

#### Аргументи та перерахування

Події можуть мати незмінний набір аргументів, які можна вкласти у повідомлення або опис використовуючи шаблонні замінники (наприклад `{2:.1m}`, дивіться наступний розділ).

Припустимі типи: `uint8_t`, `int8_t`, `uint16_t`, `int16_t`, `uint32_t`, `int32_t`, `uint64_t`, `int64_t` та `float`.

Ви також можете використати перерахування як аргументи:

- Користувацькі або характерні для PX4 перерахування для подій повинні бути визначені у [src/lib/events/enums.json](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/events/enums.json), та можуть бути використані як аргументи події у формі `events::send<events::px4::enums::my_enum_t>(...)`.
- "Загальні" події MAVLink визначені у [mavlink/libevents/events/common.json](https://github.com/mavlink/libevents/blob/master/events/common.json) та можуть бути використані як аргументи подій у формі `events::send<events::common::enums::my_enum_t>(...)`.

#### Формат тексту

Формат тексту для опису повідомлення події:

- символи можна екранувати за допомогою \\

  Ці символи повинні бути екрановані: '\\\\', '\\<', '\\{'.

- теги що підтримуються:

  - Профілі: `<profile name="[!]NAME">CONTENT</profile>`

    `CONTENT` буде показано, лише якщо назва збігається з налаштованим профілем. Це може бути використано, наприклад, щоб приховати інформацію для розробників від кінцевих користувачів.

  - URL: `<a [href="URL"]>CONTENT</a>`. Якщо `href` не встановлено, використовуйте `CONTENT` як `URL` (наприклад `<a>https://docs.px4.io</a>`  сприймається як `<a href="https://docs.px4.io">https://docs.px4.io</a>`)
  - Параметри: `<param>PARAM_NAME</param>`
  - не дозволено використовувати вкладені теги того ж типу

- аргументи: шаблонні замінники, що відповідають синтаксису python з індексацією що починається з 1 (замість 0)

  - загальна форма: `{ARG_IDX[:.NUM_DECIMAL_DIGITS][UNIT]}`

    UNIT:

    - m: горизонтальна відстань в метрах
    - m_v: вертикальна відстань в метрах
    - m^2: площа в метрах квадратних
    - m/s: швидкість у метрах в секунду
    - C: temperature in degrees celsius

  - `NUM_DECIMAL_DIGITS` only makes sense for real number arguments.

## Logging

Events are logged according to the internal log level, and [Flight Review](../log/flight_review.md) displays events.

:::note
Flight review downloads metadata based on PX4 master, so if a definition is not yet on master, it will only be able to display the event ID.
:::

## Implementation

During PX4 build, only the code is added directly to the binary by the compiler (i.e. the event ID, log level(s) and any arguments).

The metadata for all events is built into a separate JSON metadata file (using a python script that scans the whole source code for event calls).

### Publishing Event Metadata to a GCS

The event metadata JSON file is compiled into firmware (and/or hosted on the Internet), and made available to ground stations via the [MAVLink Component Metadata service](https://mavlink.io/en/services/component_information.html). This ensures that metadata is always up-to-date with the code running on the vehicle.

This process is the same as for [parameter metadata](../advanced/parameters_and_configurations.md#publishing-parameter-metadata-to-a-gcs). For more information see [PX4 Metadata (Translation & Publication)](../advanced/px4_metadata.md)
