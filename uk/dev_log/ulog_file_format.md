# Формат файлу ULog

ULog - це формат файлу, що використовується для логування повідомлень. Формат самоописуючий, тобто містить формат та типи повідомлень [uORB](../middleware/uorb.md), які реєструються. Цей документ призначений для документації специфікації формату файлу ULog. Це призначено особливо для тих, хто зацікавлений у написанні розбірника / серіалізатора ULog та потребує розкодувати / закодувати файли.

PX4 використовує ULog для ведення журналу тем uORB як повідомлення, пов'язані з (але не обмежені) наступними джерелами:

- **Пристрій входу:** датчики, RC, вхід тощо.
- **Внутрішні стани:** Завантаження ЦП, ставлення, стан EKF тощо.
- **Рядкові повідомлення:** оператори `printf`, включаючи `PX4_INFO()` та `PX4_ERR()`.

Формат використовує пам'ять з [маленьким кінцем](https://en.wikipedia.org/wiki/Endianness) для всіх бінарних типів (найменш значущий байт (LSB) типу даних розміщений за найнижчою адресою пам'яті).

## Типи даних

Для ведення журналу використовуються наступні типи двійкових даних. Вони всі відповідають типам у мові програмування C.

| Тип                 | Розмір у байтах |
| ------------------- | --------------- |
| int8_t, uint8_t   | 1               |
| int16_t, uint16_t | 2               |
| int32_t, uint32_t | 4               |
| int64_t, uint64_t | 8               |
| float               | 4               |
| double              | 8               |
| bool, char          | 1               |

Додатково типи можуть бути використані як масив фіксованого розміру: наприклад, `float[5]`.

Рядки (`char[length]`) не містять завершуючий нульовий символ `'\0'` в кінці.

:::info Порівняння рядків чутливе до регістру, що слід враховувати при порівнянні імен повідомлень під час [додавання підписок](#a-subscription-message).
:::

## Структура файлу ULog

Файли ULog мають наступні три розділи:

```
----------------------
|       Header       |
----------------------
|    Definitions     |
----------------------
|        Data        |
----------------------
```

Опис кожного розділу наведено нижче.

### Розділ заголовка

Заголовок є розділом фіксованого розміру та має наступний формат (16 байт):

```plain
----------------------------------------------------------------------
| 0x55 0x4c 0x6f 0x67 0x01 0x12 0x35 | 0x01         | uint64_t       |
| File magic (7B)                    | Version (1B) | Timestamp (8B) |
----------------------------------------------------------------------
```

- **Файлова магія (7 байт):** Індикатор типу файлу, який читає "ULogXYZ де XYZ - це послідовність магічних байтів `0x01 0x12 0x35`"
- **Версія (1 байт):** Версія формату файлу (наразі 1)
- **Мітка часу (8 байтів):** `uint64_t` ціле число, що вказує на початок реєстрації в мікросекундах.

### Заголовок повідомлення розділу визначення та даних

Секції _Визначення та Дані_ містять кілька **повідомлень**. Кожне повідомлення передує цим заголовком:

```c
struct message_header_s {
  uint16_t msg_size;
  uint8_t msg_type;
};
```

- `msg_size` є розміром повідомлення в байтах без заголовка.
- `msg_type` визначає вміст і є одним байтом.

:::info Розділи повідомлення нижче передуються символом, який відповідає його `msg_type`.
:::

### Розділ визначень

Розділ визначень містить основну інформацію, таку як версія програмного забезпечення, формат повідомлення, початкові значення параметрів тощо.

Основні типи повідомлень в цьому розділі є:

1. [Flag Bits](#b-flag-bits-message)
2. [Визначення формату](#f-format-message)
3. [Інформація](#i-information-message)
4. [Multi Information](#m-multi-information-message)
5. [Параметр](#p-parameter-message)
6. [Параметр за замовчуванням](#q-default-parameter-message)

#### 'B': Повідомлення флагів бітів

:::info Це повідомлення повинно бути **першим повідомленням** одразу після розділу заголовка, щоб мати постійний фіксований зсув від початку файлу!
:::

Це повідомлення надає інформацію лог-аналізатору про те, чи можна аналізувати журнал.

```c
struct ulog_message_flag_bits_s {
  struct message_header_s header; // msg_type = 'B'
  uint8_t compat_flags[8];
  uint8_t incompat_flags[8];
  uint64_t appended_offsets[3]; // file offset(s) for appended data if appending bit is set
};
```

- `compat_flags`: біти сумісності прапорців

  - Ці прапорці вказують на наявність функцій у файлі журналу, які сумісні з будь-яким парсером ULog.
  - `compat_flags[0]`: _DEFAULT_PARAMETERS_ (Біт 0): якщо встановлено, журнал містить [повідомлення про типові параметри](#q-default-parameter-message)

  Решта бітів наразі не визначені і повинні бути встановлені на 0. Ці біти можуть бути використані для майбутніх змін ULog, які сумісні з існуючими парсерами. Наприклад, додавання нового типу повідомлення може бути вказане шляхом визначення нового біта у стандарті, а існуючі парсери ігноруватимуть новий тип повідомлення. Це означає, що парсери можуть просто ігнорувати біти, якщо один з невідомих бітів встановлений.

- `incompat_flags`: несумісні біти прапорців.

  - `incompat_flags[0]`: _DATA_APPENDED_ (Біт 0): якщо встановлено, журнал містить додані дані та щонайменше один з `appended_offsets` не є нульовим.

  Решта бітів наразі не визначені і повинні бути встановлені на 0. Це може бути використано для введення руйнівних змін, які існуючі парсери не можуть обробити. Наприклад, коли старий парсер ULog, який не мав поняття _DATA_APPENDED_, читає новий ULog, він припинить розбір журналу, оскільки журнал міститиме повідомлення / концепції, які не відповідають специфікації. Якщо парсер виявляє, що будь-який з цих бітів встановлений, що не вказано, він повинен відмовитися від аналізу журналу.

- `appended_offsets`: Зсув файлу (0-основний) для додаваних даних. Якщо даних не додається, всі зміщення повинні бути нульовими. Це може бути використано для надійного додавання даних до журналів, які можуть припинитись посеред повідомлення. Наприклад, дампи збоїв.

  Процес додавання даних повинен виконати:

  - встановити відповідний біт `incompat_flags`
  - встановіть перший `appended_offsets`, який наразі дорівнює 0, до довжини файлу журналу без доданих даних, оскільки саме там почнуться нові дані
  - додайте будь-який тип повідомлень, які є дійсними для розділу Дані.

Можливо, що у майбутніх специфікаціях ULog буде додано ще декілька полів в кінці цього повідомлення. Це означає, що парсер не повинен припускати фіксовану довжину цього повідомлення. Якщо розмір `msg_size` більший, ніж очікувалося (зараз 40), будь-які додаткові байти повинні бути проігноровані / відкинуті.

#### 'F': Формат повідомлення

Формат повідомлення визначає одне ім'я повідомлення та його внутрішні поля в одному рядку.

```c
struct message_format_s {
  struct message_header_s header; // msg_type = 'F'
  char format[header.msg_size];
};
```

- `format` - це рядок звичайного тексту із наступним форматом: `message_name:field0;field1;`
  - Може бути довільна кількість полів (мінімум 1), розділених за допомогою `;`.
  - `message_name`: довільний непорожній рядок з цими допустимими символами: `a-zA-Z0-9_-/` (і відмінний від будь-якого з [основних типів](#data-types)).

Поле має формат: `тип назва_поля`, або для масиву: `тип[довжина_масиву] назва_поля` використовується (підтримуються лише масиви фіксованого розміру). `field_name` повинен складатися з символів у наборі `a-zA-Z0-9_`.

`Тип` - один із [основних бінарних типів](#data-types) або `message_name` іншого визначення формату (вкладене використання).

- Тип може бути використаний до того, як він буде визначений.
  - наприклад, Повідомлення `MessageA:MessageB[2] msg_b` може прийти до `MessageB:uint_8[3] data`
- Може бути довільне вкладення, але **без циклічних залежностей**
  - e.g. `MessageA:MessageB[2] msg_b` & `MessageB:MessageA[4] msg_a`

Деякі назви полів є спеціальними:

- `відмітка часу`: кожен формат повідомлення з [Повідомленням про підписку](#a-subscription-message) повинен містити поле відмітки часу (наприклад, формат повідомлення, який використовується лише як частина вкладеного визначення іншим форматом, може не містити поля відмітки часу)
  - Його тип повинен бути `uint64_t`.
  - Одиниця вимірювання - мікросекунди.
  - Часовий позначення завжди повинно бути монотонно зростаючим для серії повідомлень з тим самим `msg_id` (тією самою підпискою).
- `_padding{}`: імена полів, які починаються з `_padding` (наприклад, `_padding[3]`), не повинні відображатися, і їх дані повинні бути ігноровані читачем.
  - Ці поля можуть бути вставлені письменником для забезпечення правильного вирівнювання.
  - Якщо поле відступу є останнім полем, тоді це поле може не бути зареєстроване, щоб уникнути запису непотрібних даних.
  - Це означає, що `message_data_s.data` буде коротшим на розмір відступу.
  - Однак відступ все ще потрібен, коли повідомлення використовується во вкладеному визначенні.
- Загалом, поля повідомлень не обов'язково вирівняні (тобто зсув поля всередині повідомлення не обов'язково є кратним його розміру даних), тому читач завжди повинен використовувати відповідні методи копіювання пам'яті для доступу до окремих полів.

#### 'I': Інформаційне повідомлення

Повідомлення про інформацію визначає типове визначення словника `key` : `value` пари для будь-якої інформації, включаючи, але не обмежуючись, версію апаратного забезпечення, версію програмного забезпечення, засіб збірки для програмного забезпечення тощо.

```c
struct ulog_message_info_header_s {
  struct message_header_s header; // msg_type = 'I'
  uint8_t key_len;
  char key[key_len];
  char value[header.msg_size-1-key_len]
};
```

- `key_len`: Length of the key value
- `key`: Contains the key string in the form`type name`, e.g. `char[value_len] sys_toolchain_ver`. Valid characters for the name: `a-zA-Z0-9_-/`. The type may be one of the [basic types including arrays](#data-types).
- `value`: Contains the data (with the length `value_len`) corresponding to the `key` e.g. `9.4.0`.

:::info
Ключ, визначений у повідомленні Інформації, повинен бути унікальним. Означає, що не повинно бути більше одного визначення з таким самим ключовим значенням.
:::

Парсери можуть зберігати інформаційні повідомлення у вигляді словника.

Попередньо визначені інформаційні повідомлення:

| key                                 | Опис                                                       | Example for value  |
| ----------------------------------- | ---------------------------------------------------------- | ------------------ |
| `char[value_len] sys_name`          | Name of the system                                         | "PX4"              |
| `char[value_len] ver_hw`            | Hardware version (board)                                   | "PX4FMU_V4"        |
| `char[value_len] ver_hw_subtype`    | Board subversion (variation)                               | "V2"               |
| `char[value_len] ver_sw`            | Software version (git tag)                                 | "7f65e01"          |
| `char[value_len] ver_sw_branch`     | git branch                                                 | "master"           |
| `uint32_t ver_sw_release`           | Software version (see below)                               | 0x010401ff         |
| `char[value_len] sys_os_name`       | Operating System Name                                      | "Linux"            |
| `char[value_len] sys_os_ve`r        | OS version (git tag)                                       | "9f82919"          |
| `uint32_t ver_os_release`           | Версія ОС (див. нижче)                                     | 0x010401ff         |
| `char[value_len] sys_toolchain`     | Toolchain Name                                             | "GNU GCC"          |
| `char[value_len] sys_toolchain_ver` | Toolchain Version                                          | "6.2.1"            |
| `char[value_len] sys_mcu`           | Chip name and revision                                     | "STM32F42x, rev A" |
| `char[value_len] sys_uuid`          | Unique identifier for vehicle (eg. MCU ID)                 | "392a93e32fa3"...  |
| `char[value_len] log_type`          | Type of the log (full log if not specified)                | "mission"          |
| `char[value_len] replay`            | Ім'я файлу відтвореного журналу, якщо в режимі відтворення | "log001.ulg"       |
| `int32_t time_ref_utc`              | UTC Time offset in seconds                                 | -3600              |

::: info `value_len` represents the data size of the `value`. This is described in the `key`.
:::

- The format of `ver_sw_release` and `ver_os_release` is: 0xAABBCCTT, where AA is **major**, BB is **minor**, CC is patch and TT is the **type**.
  - **Type** is defined as following: `>= 0`: development, `>= 64`: alpha version, `>= 128`: beta version, `>= 192`: RC version, `== 255`: release version.
  - For example, `0x010402FF` translates into the release version v1.4.2.

This message can also be used in the Data section (this is however the preferred section).

#### 'M': Multi Information Message

Multi information message serves the same purpose as the information message, but for long messages or multiple messages with the same key.

```c
struct ulog_message_info_multiple_header_s {
  struct message_header_s header; // msg_type = 'M'
  uint8_t is_continued; // can be used for arrays
  uint8_t key_len;
  char key[key_len];
  char value[header.msg_size-2-key_len]
};
```

- `is_continued` can be used for split-up messages: if set to 1, it is part of the previous message with the same key.

Parsers can store all information multi messages as a 2D list, using the same order as the messages occur in the log.

Valid names and types are the same as for the Information message.

#### 'P': Parameter Message

Parameter message in the _Definitions_ section defines the parameter values of the vehicle when logging is started. It uses the same format as the [Information Message](#i-information-message).

```c
struct message_info_s {
  struct message_header_s header; // msg_type = 'P'
  uint8_t key_len;
  char key[key_len];
  char value[header.msg_size-1-key_len]
};
```

If a parameter dynamically changes during runtime, this message can also be [used in the Data section](#messages-shared-with-the-definitions-section) as well.

The data type is restricted to `int32_t` and `float`. Допустимі символи для імені: `a-zA-Z0-9_-/`.

#### 'Q': Параметр повідомлення за замовчуванням

The default parameter message defines the default value of a parameter for a given vehicle and setup.

```c
struct ulog_message_parameter_default_header_s {
  struct message_header_s header; // msg_type = 'Q'
  uint8_t default_types;
  uint8_t key_len;
  char key[key_len];
  char value[header.msg_size-2-key_len]
};
```

- `default_types` is a bitfield and defines to which group(s) the value belongs to.
  - At least one bit must be set:
    - `1<<0`: system wide default
    - `1<<1`: default for the current configuration (e.g. an airframe)

A log may not contain default values for all parameters. In those cases the default is equal to the parameter value, and different default types are treated independently.

This message can also be used in the Data section, and the same data type and naming applies as for the Parameter message.

This section ends before the start of the first [Subscription Message](#a-subscription-message) or [Logging](#l-logged-string-message) message, whichever comes first.

### Розділ даних

The message types in the _Data_ section are:

1. [Subscription](#a-subscription-message)
2. [Unsubscription](#r-unsubscription-message)
3. [Logged Data](#d-logged-data-message)
4. [Logged String](#l-logged-string-message)
5. [Tagged Logged String](#c-tagged-logged-string-message)
6. [Synchronization](#s-synchronization-message)
7. [Dropout Mark](#o-dropout-message)
8. [Information](#i-information-message)
9. [Multi Information](#m-multi-information-message)
10. [Parameter](#p-parameter-message)
11. [Default Parameter](#q-default-parameter-message)

#### `A`: Subscription Message

Subscribe a message by name and give it an id that is used in [Logged data Message](#d-logged-data-message). This must come before the first corresponding [Logged data Message](#d-logged-data-message).

```c
struct message_add_logged_s {
  struct message_header_s header; // msg_type = 'A'
  uint8_t multi_id;
  uint16_t msg_id;
  char message_name[header.msg_size-3];
};
```

- `multi_id`: the same message format can have multiple instances, for example if the system has two sensors of the same type. The default and first instance must be 0.
- `msg_id`: unique id to match [Logged data Message](#d-logged-data-message) data. The first use must set this to 0, then increase it.
  - The same `msg_id` must not be used twice for different subscriptions.
- `message_name`: message name to subscribe to. Must match one of the [Format Message](#f-format-message) definitions.

#### `R`: Повідомлення про відписку

Відмовитися від повідомлення, щоб позначити, що воно більше не буде реєструватися (зараз не використовується).

```c
struct message_remove_logged_s {
  struct message_header_s header; // msg_type = 'R'
  uint16_t msg_id;
};
```

#### 'D': Повідомлення про зареєстровані дані

```c
struct message_data_s {
  struct message_header_s header; // msg_type = 'D'
  uint16_t msg_id;
  uint8_t data[header.msg_size-2];
};
```

- `msg_id`: as defined by a [Subscription Message](#a-subscription-message)
- `data` contains the logged binary message as defined by [Format Message](#f-format-message)

See above for special treatment of padding fields.

#### 'L': Logged String Message

Logged string message, i.e. `printf()` output.

```c
struct message_logging_s {
  struct message_header_s header; // msg_type = 'L'
  uint8_t log_level;
  uint64_t timestamp;
  char message[header.msg_size-9]
};
```

- `timestamp`: in microseconds
- `log_level`: same as in the Linux kernel:

| Name    | Level value | Meaning                          |
| ------- | ----------- | -------------------------------- |
| EMERG   | '0'         | System is unusable               |
| ALERT   | '1'         | Action must be taken immediately |
| CRIT    | '2'         | Critical conditions              |
| ERR     | '3'         | Error conditions                 |
| WARNING | '4'         | Warning conditions               |
| NOTICE  | '5'         | Normal but significant condition |
| INFO    | '6'         | Informational                    |
| DEBUG   | '7'         | Debug-level messages             |

#### 'C': Tagged Logged String Message

```c
struct message_logging_tagged_s {
  struct message_header_s header; // msg_type = 'C'
  uint8_t log_level;
  uint16_t tag;
  uint64_t timestamp;
  char message[header.msg_size-11]
};
```

- `tag`: id representing source of logged message string. It could represent a process, thread or a class depending upon the system architecture.

  - For example, a reference implementation for an onboard computer running multiple processes to control different payloads, external disks, serial devices etc can encode these process identifiers using a `uint16_t enum` into the `tag` attribute of struct as follows:

  ```c
  enum class ulog_tag : uint16_t {
    unassigned,
    mavlink_handler,
    ppk_handler,
    camera_handler,
    ptp_handler,
    serial_handler,
    watchdog,
    io_service,
    cbuf,
    ulg
  };
  ```

- `timestamp`: in microseconds
- `log_level`: same as in the Linux kernel:

| Name    | Level value | Meaning                          |
| ------- | ----------- | -------------------------------- |
| EMERG   | '0'         | System is unusable               |
| ALERT   | '1'         | Action must be taken immediately |
| CRIT    | '2'         | Critical conditions              |
| ERR     | '3'         | Error conditions                 |
| WARNING | '4'         | Warning conditions               |
| NOTICE  | '5'         | Normal but significant condition |
| INFO    | '6'         | Informational                    |
| DEBUG   | '7'         | Debug-level messages             |

#### 'S': Synchronization message

Synchronization message so that a reader can recover from a corrupt message by searching for the next sync message.

```c
struct message_sync_s {
  struct message_header_s header; // msg_type = 'S'
  uint8_t sync_magic[8];
};
```

- `sync_magic`: [0x2F, 0x73, 0x13, 0x20, 0x25, 0x0C, 0xBB, 0x12]

#### 'O': Dropout message

Mark a dropout (lost logging messages) of a given duration in ms.

Dropouts can occur e.g. if the device is not fast enough.

```c
struct message_dropout_s {
  struct message_header_s header; // msg_type = 'O'
  uint16_t duration;
};
```

#### Messages shared with the Definitions Section

Since the Definitions and Data Sections use the same message header format, they also share the same messages listed below:

- [Information Message](#i-information-message).
- [Multi Information Message](#m-multi-information-message)
- [Parameter Message](#p-parameter-message)
  - For the _Data_ section, the Parameter Message is used when the parameter value changes
- [Default Parameter Message](#q-default-parameter-message)

## Requirements for Parsers

A valid ULog parser must fulfill the following requirements:

- Must ignore unknown messages (but it can print a warning)
- Parse future/unknown file format versions as well (but it can print a warning).
- Must refuse to parse a log which contains unknown incompatibility bits set (`incompat_flags` of [Flag Bits Message](#b-flag-bits-message)), meaning the log contains breaking changes that the parser cannot handle.
- A parser must be able to correctly handle logs that end abruptly, in the middle of a message. The unfinished message should just be discarded.
- For appended data: a parser can assume the Data section exists, i.e. the offset points to a place after the Definitions section.
  - Appended data must be treated as if it was part of the regular Data section.

## Known Parser Implementations

- PX4-Autopilot: C++
  - [logger module](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/logger)
  - [replay module](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/replay)
  - [hardfault_log module](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/hardfault_log): append hardfault crash data.
- [pyulog](https://github.com/PX4/pyulog): python, ULog reader and writer library with CLI scripts.
- [ulog_cpp](https://github.com/PX4/ulog_cpp): C++, ULog reader and writer library.
- [FlightPlot](https://github.com/PX4/FlightPlot): Java, log plotter.
- [MAVLink](https://github.com/mavlink/mavlink): Messages for ULog streaming via MAVLink (note that appending data is not supported, at least not for cut off messages).
- [QGroundControl](https://github.com/mavlink/qgroundcontrol): C++, ULog streaming via MAVLink and minimal parsing for GeoTagging.
- [mavlink-router](https://github.com/01org/mavlink-router): C++, ULog streaming via MAVLink.
- [MAVGAnalysis](https://github.com/ecmnet/MAVGCL): Java, ULog streaming via MAVLink and parser for plotting and analysis.
- [PlotJuggler](https://github.com/facontidavide/PlotJuggler): C++/Qt application to plot logs and time series. Supports ULog since version 2.1.3.
- [ulogreader](https://github.com/maxsun/ulogreader): Javascript, ULog reader and parser outputs log in JSON object format.
- [Foxglove Studio](https://github.com/foxglove/studio): an integrated visualization and diagnosis tool for robotics (Typescript ULog parser: https://github.com/foxglove/ulog).

## File Format Version History

### Changes in version 2

- Addition of [Multi Information Message](#m-multi-information-message) and [Flag Bits Message](#b-flag-bits-message) and the ability to append data to a log.
  - This is used to add crash data to an existing log.
  - If data is appended to a log that is cut in the middle of a message, it cannot be parsed with version 1 parsers.
- Other than that forward and backward compatibility is given if parsers ignore unknown messages.
