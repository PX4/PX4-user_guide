# Logging

The [system logger](../modules/modules_system.md#logger) is able to log any ORB topic with all included fields. Everything necessary is generated from the `.msg` file, so that only the topic name needs to be specified. An optional interval parameter specifies the maximum logging rate of a certain topic. All existing instances of a topic are logged.

The output log format is [ULog](../dev_log/ulog_file_format.md).

## Використання

By default, logging is automatically started when arming, and stopped when disarming. A new log file is created for each arming session on the SD card. To display the current state, use `logger status` on the console. If you want to start logging immediately, use `logger on`. This overrides the arming state, as if the system was armed. `logger off` undoes this.

Якщо реєстрація припиниться через помилку запису або досягнення [максимального розміру файлу](#file-size-limitations), PX4 автоматично перезапустить реєстрацію в новому файлі.

Для отримання списку всіх підтримуваних команд та параметрів реєстратора використовуйте:

```
logger help
```

## Налаштування

The logging system is configured by default to collect sensible logs for [flight reporting](../getting_started/flight_reporting.md) with [Flight Review](http://logs.px4.io).

Logging may further be configured using the [SD Logging](../advanced_config/parameter_reference.md#sd-logging) parameters. The parameters you are most likely to change are listed below.

| Параметр                                                                 | Опис                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [РЕЖИМ SDLOG](../advanced_config/parameter_reference.md#SDLOG_MODE)      | Logging Mode. Defines when logging starts and stops.<br />- `-1`: Logging disabled.<br />- `0`: Log when armed until disarm (default).<br />- `1`: Log from boot until disarm.<br />- `2`: Log from boot until shutdown.<br />- `3`: Log based on the [AUX1 RC channel](../advanced_config/parameter_reference.md#RC_MAP_AUX1).<br />- `4`: Log from first armed until shutdown. |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | Logging profile. Use this to enable less common logging/analysis (e.g. for EKF2 replay, high rate logging for PID & filter tuning, thermal temperature calibration).                                                                                                                                                                                                                                                 |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | Create very small additional "Mission Log".<br>This log can _not_ be used with [Flight Review](../log/flight_log_analysis.md#flight-review-online-tool), but is useful when you need a small log for geotagging or regulatory compliance.                                                                                                                                                                      |

Useful settings for specific cases:

- Raw sensor data for comparison: [SDLOG_MODE=1](../advanced_config/parameter_reference.md#SDLOG_MODE) and [SDLOG_PROFILE=64](../advanced_config/parameter_reference.md#SDLOG_PROFILE).
- Disabling logging altogether: [SDLOG_MODE=`-1`](../advanced_config/parameter_reference.md#SDLOG_MODE)

### Logger module

_Developers_ can further configure what information is logged via the [logger](../modules/modules_system.md#logger) module. This allows, for example, logging of your own uORB topics.

### Конфігурація SD-карти

Separately, the list of logged topics can also be customized with a file on the SD card. Створіть файл `etc/logging/logger_topics.txt` на картці зі списком тем (для SITL це `build/px4_sitl_default/rootfs/fs/microsd/etc/logging/logger_topics.txt`):

```plain

```

`<interval>` є необов'язковим, і якщо вказано, визначає мінімальний інтервал у мс між двома зареєстрованими повідомленнями цієї теми. Якщо не вказано, тема реєструється з повною швидкістю.

`<instance>` є необов'язковим, і якщо вказано, визначає екземпляр для журналювання. If not specified, all instances of the topic are logged. Для вказівки `<instance>`, необхідно вказати `<interval>` . It can be set to 0 to log at full rate

Теми в цьому файлі замінюють всі теми за замовчуванням, які були зареєстровані.

Приклади :

```plain
sensor_accel 0 0
sensor_accel 100 1
sensor_gyro 200
sensor_mag 200 1
```

Ця конфігурація буде реєструвати sensor_accel 0 з повною швидкістю, sensor_accel 1 з частотою 10 Гц, всі екземпляри sensor_gyro з частотою 5 Гц та sensor_mag 1 з частотою 5 Гц.

## Скрипти

Є кілька сценаріїв для аналізу та конвертації файлів журналювання в репозиторії [pyulog](https://github.com/PX4/pyulog).

## Обмеження розміру файлу

Максимальний розмір файлу залежить від файлової системи та ОС. Розмір обмеження на NuttX наразі становить близько 2 ГБ.

## Відключення

Втрати логування небажані, і є кілька факторів, що впливають на кількість втрат:

- Більшість SD-карт, які ми тестували, проявляють кілька пауз кожну хвилину. Це проявляється як кілька 100 мс затримка під час команди запису. Це призводить до відключення, якщо буфер запису заповнюється протягом цього часу. Цей ефект залежить від SD-карти (див. нижче).
- Форматування SD-карти може допомогти у запобіганні викидань.
- Збільшення буфера журналу допомагає.
- Зменшіть частоту реєстрації обраних тем або видаліть непотрібні теми з реєстрації (`info.py <file>` корисний для цього).

## SD-карти

Максимальний підтримуваний розмір SD-карти для NuttX - 32 ГБ (Специфікація карт пам’яті SD, версія 2.0). **SanDisk Extreme U3 32GB** та **Samsung EVO Plus 32** відомі як надійні карти (не проявляють піков запису часу, тому практично відсутні відмови).

Таблиця нижче показує **середню послідовну швидкість запису [KB/s]** / **максимальний час запису на блок (середній) [мс]** для контролерів польоту на основі F4- (Pixracer), F7- та H7-.

| SD-карта                                                      | F4            | F7         | H7        |
| ------------------------------------------------------------- | ------------- | ---------- | --------- |
| SanDisk Extreme U3 32GB                                       | 1500 / **15** | 1800/10    | 2900/8    |
| Samsung EVO Plus 32GB                                         | 1700/10-60    | 1800/10-60 | 1900/9-60 |
| Sandisk Ultra Class 10 8GB                                    | 348 / 40      | ?/?        | ?/?       |
| Sandisk Class 4 8GB                                           | 212 / 60      | ?/?        | ?/?       |
| SanDisk Class 10 32 GB (High Endurance Video Monitoring Card) | 331 / 220     | ?/?        | ?/?       |
| Lexar U1 (Class 10), 16GB High-Performance                    | 209 / 150     | ?/?        | ?/?       |
| Sandisk Ultra PLUS Class 10 16GB                              | 196 /500      | ?/?        | ?/?       |
| Sandisk Pixtor Class 10 16GB                                  | 334 / 250     | ?/?        | ?/?       |
| Sandisk Extreme PLUS Class 10 32GB                            | 332 / 150     | ?/?        | ?/?       |

Запис пропускної здатності зі стандартними темами становить близько 50 КБ/с, що задовольняє майже всі SD-карти у термінах їх середньої послідовної швидкості запису.

Важливішим, ніж середня швидкість запису, є піки (або взагалі високі значення) максимального часу запису на блок (4 КБ) або часи `fsync`, оскільки довгий час запису означає, що потрібен більший буфер журналу, щоб уникнути втрат даних.

PX4 використовує більші буфери на F7/H7 та кешування читання, що достатньо компенсує піки на багатьох поганих картках. З цим сказано, якщо ваша картка має `fsync` або тривалість запису декілька 100 мс, вона не повинна бути вибрана для використання з PX4. Ви можете перевірити значення, запустивши [sd_bench](../modules/modules_command.md#sd-bench) слід запустити з більшою кількістю ітерацій (близько 100 має вистачити).

```sh
sd_bench -r 100
```

Це визначає мінімальний розмір буфера: чим більше це максимальне значення, тим більше потрібно мати розмір буфера журналу, щоб уникнути втрат даних. PX4 використовує більші буфери на F7/H7 та кешування читання, щоб компенсувати деякі з цих проблем.

:::info
Якщо у вас є питання щодо певної картки, ви можете запустити вищезазначений тест та повідомити результати за посиланням https://github.com/PX4/PX4-Autopilot/issues/4634.
:::

## Потокове ведення журналу

Традиційний і все ще повністю підтримуваний спосіб ведення журналу - використання SD-карти на FMU. Однак є альтернатива, потокове ведення журналу, яке надсилає ті ж дані журналювання через MAVLink. Цей метод може бути використаний, наприклад, у випадках, коли FMU не має слоту для SD-карти (наприклад, Intel® Aero Ready to Fly Drone) або просто для уникнення проблем з SD-картами. Обидва методи можуть бути використані незалежно один від одного і одночасно.

Вимога полягає в тому, що посилання забезпечує принаймні ~50KB/s, наприклад, WiFi-посилання. І тільки один клієнт може запитати потік журналування одночасно. Підключення не потребує надійності, протокол розроблений для обробки втрат.

Існують різні клієнти, які підтримують потокову передачу ulog:

- `mavlink_ulog_streaming.py` скрипт PX4-Autopilot/Tools.
- QGroundControl: ![Стрічка журналу QGC](../../assets/gcs/qgc-log-streaming.png)
- [MAVGCL](https://github.com/ecmnet/MAVGCL)

### Діагностика

- Якщо потік журналування не починається, переконайтеся, що `logger` працює (див. вище), та перевірте вивід консолі під час запуску.
- Якщо це все ще не працює, переконайтеся, що використовується MAVLink 2. Застосуйте це, встановивши `MAV_PROTO_VER` на 2.
- Потік реєстрації використовує максимум 70% налаштованої швидкості MAVLink (`-r` параметр). Якщо потрібно більше, повідомлення видаляються. Поточний використаний відсоток можна перевірити за допомогою `mavlink status` (у цьому прикладі використано 1,8%):

  ```sh
  instance #0:
          GCS heartbeat:  160955 us ago
          mavlink chan: #0
          type:           GENERIC LINK OR RADIO
          flow control:   OFF
          rates:
          tx: 95.781 kB/s
          txerr: 0.000 kB/s
          rx: 0.021 kB/s
          rate mult: 1.000
          ULog rate: 1.8% of max 70.0%
          accepting commands: YES
          MAVLink version: 2
          transport protocol: UDP (14556)
  ```

  Також переконайтеся, що `txerr` залишається на 0. Якщо це піде вгору, або буфер відправлення NuttX занадто малий, або фізичний зв'язок насичений, або апаратне забезпечення занадто повільне для обробки даних.
