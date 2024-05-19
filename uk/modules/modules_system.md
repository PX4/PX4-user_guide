# Modules Reference: System

## battery_simulator
Джерело: [modules/simulation/battery_simulator](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/simulation/battery_simulator)


### Опис



<a id="battery_simulator_usage"></a>

### Використання
```
battery_simulator <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## battery_status
Джерело: [modules/battery_status](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/battery_status)


### Опис

Надана функціональність включає в себе:
- Читання вихідних даних драйвера ADC (через інтерфейс ioctl) і публікація `battery_status`.


### Імплементація
Він запускається у власній темі і проводить опитування на поточну обрану тему гіроскопа.


<a id="battery_status_usage"></a>

### Використання
```
battery_status <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## camera_feedback
Джерело: [modules/camera_feedback](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/camera_feedback)


### Опис



<a id="camera_feedback_usage"></a>

### Використання
```
camera_feedback <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## commander
Джерело: [modules/commander](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/commander)


### Опис
Модуль командира містить машину станів для перемикання режимів та аварійної поведінки.

<a id="commander_usage"></a>

### Використання
```
commander <command> [arguments...]
 Commands:
   start
     [-h]        Enable HIL mode

   calibrate     Run sensor calibration
     mag|baro|accel|gyro|level|esc|airspeed Calibration type
     quick       Quick calibration (accel only, not recommended)

   check         Run preflight checks

   arm
     [-f]        Force arming (do not run preflight checks)

   disarm
     [-f]        Force disarming (disarm in air)

   takeoff

   land

   transition    VTOL transition

   mode          Change flight mode
     manual|acro|offboard|stabilized|altctl|posctl|position:slow|auto:mission|au
                 to:loiter|auto:rtl|auto:takeoff|auto:land|auto:precland|ext1
                 Flight mode

   pair

   lockdown
     on|off      Turn lockdown on or off

   set_ekf_origin
     lat, lon, alt Origin Latitude, Longitude, Altitude

   lat|lon|alt   Origin latitude longitude altitude

   poweroff      Power off board (if supported)

   stop

   status        print status info
```
## dataman
Джерело: [modules/dataman](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/dataman)


### Опис
Module to provide persistent storage for the rest of the system in form of a simple database through a C API. Multiple backends are supported:
- a file (eg. on the SD card)
- RAM (this is obviously not persistent)

It is used to store structured data of different types: mission waypoints, mission state and geofence polygons. Each type has a specific type and a fixed maximum amount of storage items, so that fast random access is possible.

### Implementation
Reading and writing a single item is always atomic.


<a id="dataman_usage"></a>

### Usage
```
dataman <command> [arguments...]
 Commands:
   start
     [-f <val>]  Storage file
                 values: <file>
     [-r]        Use RAM backend (NOT persistent)

 The options -f and -r are mutually exclusive. If nothing is specified, a file
 'dataman' is used

   stop

   status        print status info
```
## dmesg
Source: [systemcmds/dmesg](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/dmesg)


### Description

Command-line tool to show bootup console messages. Note that output from NuttX's work queues and syslog are not captured.

### Examples

Keep printing all messages in the background:
```
dmesg -f &
```

<a id="dmesg_usage"></a>

### Використання
```
dmesg <command> [arguments...]
 Commands:
     [-f]        Follow: wait for new messages
```
## esc_battery
Source: [modules/esc_battery](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/esc_battery)


### Description
This implements using information from the ESC status and publish it as battery status.


<a id="esc_battery_usage"></a>

### Usage
```
esc_battery <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## gyro_calibration
Source: [modules/gyro_calibration](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/gyro_calibration)


### Description
Simple online gyroscope calibration.


<a id="gyro_calibration_usage"></a>

### Usage
```
gyro_calibration <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## gyro_fft
Source: [modules/gyro_fft](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/gyro_fft)


### Description


<a id="gyro_fft_usage"></a>

### Usage
```
gyro_fft <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## heater
Source: [drivers/heater](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/heater)


### Description
Background process running periodically on the LP work queue to regulate IMU temperature at a setpoint.

This task can be started at boot from the startup scripts by setting SENS_EN_THERMAL or via CLI.

<a id="heater_usage"></a>

### Usage
```
heater <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## i2c_launcher
Source: [systemcmds/i2c_launcher](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/i2c_launcher)


### Description
Daemon that starts drivers based on found I2C devices.


<a id="i2c_launcher_usage"></a>

### Usage
```
i2c_launcher <command> [arguments...]
 Commands:
   start
     -b <val>    Bus number

   stop

   status        print status info
```
## land_detector
Source: [modules/land_detector](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/land_detector)


### Description
Module to detect the freefall and landed state of the vehicle, and publishing the `vehicle_land_detected` topic. Each vehicle type (multirotor, fixedwing, vtol, ...) provides its own algorithm, taking into account various states, such as commanded thrust, arming state and vehicle motion.

### Реалізація
Every type is implemented in its own class with a common base class. The base class maintains a state (landed, maybe_landed, ground_contact). Each possible state is implemented in the derived classes. A hysteresis and a fixed priority of each internal state determines the actual land_detector state.

#### Multicopter Land Detector
**ground_contact**: thrust setpoint and velocity in z-direction must be below a defined threshold for time GROUND_CONTACT_TRIGGER_TIME_US. When ground_contact is detected, the position controller turns off the thrust setpoint in body x and y.

**maybe_landed**: it requires ground_contact together with a tighter thrust setpoint threshold and no velocity in the horizontal direction. The trigger time is defined by MAYBE_LAND_TRIGGER_TIME. When maybe_landed is detected, the position controller sets the thrust setpoint to zero.

**landed**: it requires maybe_landed to be true for time LAND_DETECTOR_TRIGGER_TIME_US.

The module runs periodically on the HP work queue.

<a id="land_detector_usage"></a>

### Використання
```
land_detector <command> [arguments...]
 Commands:
   start         Start the background task
     fixedwing|multicopter|vtol|rover|airship Select vehicle type

   stop

   status        print status info
```
## load_mon
Source: [modules/load_mon](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/load_mon)


### Description
Background process running periodically on the low priority work queue to calculate the CPU load and RAM usage and publish the `cpuload` topic.

On NuttX it also checks the stack usage of each process and if it falls below 300 bytes, a warning is output, which will also appear in the log file.

<a id="load_mon_usage"></a>

### Usage
```
load_mon <command> [arguments...]
 Commands:
   start         Start the background task

   stop

   status        print status info
```
## logger
Source: [modules/logger](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/logger)


### Description
System logger which logs a configurable set of uORB topics and system printf messages (`PX4_WARN` and `PX4_ERR`) to ULog files. These can be used for system and flight performance evaluation, tuning, replay and crash analysis.

It supports 2 backends:
- Files: write ULog files to the file system (SD card)
- MAVLink: stream ULog data via MAVLink to a client (the client must support this)

Both backends can be enabled and used at the same time.

The file backend supports 2 types of log files: full (the normal log) and a mission log. The mission log is a reduced ulog file and can be used for example for geotagging or vehicle management. It can be enabled and configured via SDLOG_MISSION parameter. The normal log is always a superset of the mission log.

### Implementation
The implementation uses two threads:
- The main thread, running at a fixed rate (or polling on a topic if started with -p) and checking for data updates
- The writer thread, writing data to the file

In between there is a write buffer with configurable size (and another fixed-size buffer for the mission log). It should be large to avoid dropouts.

### Examples
Typical usage to start logging immediately:
```
logger start -e -t
```

Or if already running:
```
logger on
```

<a id="logger_usage"></a>

### Usage
```
logger <command> [arguments...]
 Commands:
   start
     [-m <val>]  Backend mode
                 values: file|mavlink|all, default: all
     [-x]        Enable/disable logging via Aux1 RC channel
     [-a]        Log 1st armed until shutdown
     [-e]        Enable logging right after start until disarm (otherwise only
                 when armed)
     [-f]        Log until shutdown (implies -e)
     [-t]        Use date/time for naming log directories and files
     [-r <val>]  Log rate in Hz, 0 means unlimited rate
                 default: 280
     [-b <val>]  Log buffer size in KiB
                 default: 12
     [-p <val>]  Poll on a topic instead of running with fixed rate (Log rate
                 and topic intervals are ignored if this is set)
                 values: <topic_name>
     [-c <val>]  Log rate factor (higher is faster)
                 default: 1.0

   on            start logging now, override arming (logger must be running)

   off           stop logging now, override arming (logger must be running)

   trigger_watchdog manually trigger the watchdog now

   stop

   status        print status info
```
## mag_bias_estimator
Source: [modules/mag_bias_estimator](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mag_bias_estimator)


### Description
Online magnetometer bias estimator.

<a id="mag_bias_estimator_usage"></a>

### Usage
```
mag_bias_estimator <command> [arguments...]
 Commands:
   start         Start the background task

   stop

   status        print status info
```
## manual_control
Джерело: [modules/manual_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/manual_control)


### Опис
Модуль споживає вхідні дані вручним керуванням, публікуючи одну установку керування вручну.


<a id="manual_control_usage"></a>

### Використання
```
manual_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## netman
Джерело: [systemcmds/netman](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/netman)


  ### Опис Менеджер конфігурації мережі зберігає налаштування мережі в неволатильній пам'яті. При запуску `update` опція буде виконана. Якщо конфігурація мережі не існує. Значення за замовчуванням буде збережено в неплавучій пам'яті та система перезавантажена.

  #### update

  `оновлення мережі` автоматично виконується за допомогою [скрипту запуску системи](../concept/system_startup.md#system-startup). Під час виконання параметра `update` буде перевірено наявність `net.cfg` в корені картки SD. Після цього він зберігає мережеві налаштування з `net.cfg` у неволатильну пам'ять, видаляє файл і перезавантажує систему.

  #### save

  Опція `save` збереже налаштування з необхідної пам'яті в файл з назвою `net.cfg` на файловій системі SD картки для редагування. Використовуйте це, щоб відредагувати налаштування. Збереження не негайно застосовує мережеві налаштування; користувач повинен перезавантажити стек польоту. Напротив, команда `update` запускається сценарієм запуску, зберігає налаштування в постійну пам'ять, та перезавантажує контролер польоту (який потім використовуватиме нові налаштування).

  #### показати

  Опція `show` відобразить мережеві налаштування в `net.cfg` на консолі.

  ### Приклади $ netman save           # Зберегти параметри на SD-картку. $ netman show           # відображення поточних налаштувань. $ netman update -i eth0 # зробити оновлення

<a id="netman_usage"></a>

### Використання
```
netman <command> [arguments...]
 Commands:
   show          Display the current persistent network settings to the console.

   update        Check SD card for net.cfg and update network persistent network
                 settings.

   save          Save the current network parameters to the SD card.
     [-i <val>]  Set the interface name
                 default: eth0
```
## pwm_input
Джерело: [drivers/pwm_input](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/pwm_input)


### Опис
Вимірює вхід PWM на AUX5 (або MAIN5) через таймер захоплення ISR та публікує через повідомлення uORB 'pwm_input'.


<a id="pwm_input_usage"></a>

### Використання
```
pwm_input <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## rc_update
Джерело: [modules/rc_update](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/rc_update)


### Опис
Модуль rc_update обробляє відображення каналів RC: зчитує сирі вхідні канали (`input_rc`), потім застосовує калібрування, відображає канали RC на налаштовані канали та перемикачі режиму а потім публікує як `rc_channels` та `manual_control_input`.

### Реалізація
Щоб зменшити затримку управління, модуль запланований на опублікування введення_управління.


<a id="rc_update_usage"></a>

### Використання
```
rc_update <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## replay
Джерело: [modules/replay](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/replay)


### Опис
Цей модуль використовується для відтворення файлів ULog.

Існує 2 змінні середовища, які використовуються для конфігурації: `replay`, яка повинна бути встановлена на ім'я файлу ULog - це файл журналу, який має бути відтворений. Другий - це режим, вказаний через `replay_mode`:
- `replay_mode=ekf2`: специфічний режим відтворення EKF2. Це можна використовувати лише з модулем ekf2, але дозволяє відтворювати процес якомога швидше.
- Загальне в іншому випадку: це може бути використано для повторення будь-яких модулів, але відтворення буде здійснене з тією самою швидкістю, що і було записано в журнал.

Модуль зазвичай використовується разом з правилами видавця uORB, щоб вказати, які повідомлення потрібно відтворити. Модуль відтворення просто опублікує всі повідомлення, які знаходяться в журналі. Це також застосовує параметри з журналу.

Процедура відтворення документована на сторінці [Система Широкомасштабного Відтворення](https://docs.px4.io/main/en/debug/system_wide_replay.html).

<a id="replay_usage"></a>

### Використання
```
replay <command> [arguments...]
 Commands:
   start         Start replay, using log file from ENV variable 'replay'

   trystart      Same as 'start', but silently exit if no log file given

   tryapplyparams Try to apply the parameters from the log file

   stop

   status        print status info
```
## send_event
Джерело: [modules/events](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/events)


### Описання
Фоновий процес, що періодично виконується в черзі завдань LP для виконання рутинних завдань. Зараз він відповідає лише за сигнал тривоги на втрату RC.

Завдання можна почати через CLI або теми uORB (vehicle_command з MAVLink тощо).

<a id="send_event_usage"></a>

### Використання
```
send_event <command> [arguments...]
 Commands:
   start         Start the background task

   stop

   status        print status info
```
## sensor_arispeed_sim
Джерело: [modules/simulation/sensor_airspeed_sim](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/simulation/sensor_airspeed_sim)


### Опис



<a id="sensor_arispeed_sim_usage"></a>

### Використання
```
sensor_arispeed_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensor_baro_sim
Джерело: [modules/simulation/sensor_baro_sim](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/simulation/sensor_baro_sim)


### Опис



<a id="sensor_baro_sim_usage"></a>

### Використання
```
sensor_baro_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensor_gps_sim
Джерело: [modules/simulation/sensor_gps_sim](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/simulation/sensor_gps_sim)


### Опис



<a id="sensor_gps_sim_usage"></a>

### Застосування
```
sensor_gps_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensor_mag_sim
Джерело: [modules/simulation/sensor_mag_sim](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/simulation/sensor_mag_sim)


### Опис



<a id="sensor_mag_sim_usage"></a>

### Використання
```
sensor_mag_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensors
Джерело: [modules/sensors](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/sensors)


### Описання
Модуль сенсорів є центральним у всій системі. Він отримує вихід низького рівня від драйверів, перетворює його в більш придатну форму і публікує його для решти системи.

Надана функціональність включає в себе:
- Прочитайте вивід від драйверів датчиків (`SensorGyro`, тощо). Якщо існують кілька екземплярів того самого типу, виконуйте голосування та обробку аварійної ситуації. Потім застосуйте обертання дошки та калібрування температури (якщо ввімкнено). І, нарешті, опублікуйте дані; одну з тем є `SensorCombined`, яка використовується багатьма частинами системи.
- Переконайтеся, що драйвери сенсора отримують оновлені калібрувальні параметри (масштаб & зміщення), коли параметри змінюються або на запуску. Драйвери сенсора використовують інтерфейс ioctl для оновлення параметрів. Для того, щоб це працювало належним чином, драйвери сенсора повинні вже працювати, коли `sensors` запускається.
- Виконайте перевірку узгодженості датчиків та опублікуйте тему `SensorsStatusImu`.

### Імплементація
Він запускається у власній темі і проводить опитування на поточну обрану тему гіроскопа.


<a id="sensors_usage"></a>

### Використання
```
sensors <command> [arguments...]
 Commands:
   start
     [-h]        Start in HIL mode

   stop

   status        print status info
```
## tattu_can
Джерело: [drivers/tattu_can](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/tattu_can)


### Опис
Драйвер для зчитування даних з розумної батареї Tattu 12S 16000mAh.


<a id="tattu_can_usage"></a>

### Використання
```
tattu_can <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## temperature_compensation
Джерело: [modules/temperature_compensation](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/temperature_compensation)


### Опис
Модуль компенсації температури дозволяє всім гіроскопам, акселерометрам та барометрам у системі бути температурно компенсованими. Модуль відстежує дані, які надходять від датчиків та оновлює пов'язану тему sensor_correction кожного разу, коли виявляється зміна температури. Модуль також може бути налаштований для виконання обчислення коефіцієнта наступного завантаження, що дозволяє обчислити калібрувальні коефіцієнти теплової калібрації під час циклу температури автомобіля.


<a id="temperature_compensation_usage"></a>

### Використання
```
temperature_compensation <command> [arguments...]
 Commands:
   start         Start the module, which monitors the sensors and updates the
                 sensor_correction topic

   calibrate     Run temperature calibration process
     [-a]        calibrate the accel
     [-g]        calibrate the gyro
     [-m]        calibrate the mag
     [-b]        calibrate the baro (if none of these is given, all will be
                 calibrated)

   stop

   status        print status info
```
## tune_control
Джерело: [systemcmds/tune_control](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/tune_control)


### Опис

Інструмент командного рядка для керування & тестування (зовнішніх) melodies.

Мелодії використовуються для надання слухових сповіщень та попереджень (наприклад, коли система озброєна, отримує позицію блокування тощо). Інструмент вимагає, щоб був запущений драйвер, який може керувати темою управління tune_control uorb.

Інформацію про формат мелодії та попередньо визначені системні мелодії можна знайти тут: https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc

### Приклади

Грайте системний мелодію #2:
```
tune_control play -t 2
```

<a id="tune_control_usage"></a>

### Використання
```
tune_control <command> [arguments...]
 Commands:
   play          Play system tune or single note.
     error       Play error tune
     [-t <val>]  Play predefined system tune
                 default: 1
     [-f <val>]  Frequency of note in Hz (0-22kHz)
     [-d <val>]  Duration of note in us
     [-s <val>]  Volume level (loudness) of the note (0-100)
                 default: 40
     [-m <val>]  Melody in string form
                 values: <string> - e.g. "MFT200e8a8a"

   libtest       Test library

   stop          Stop playback (use for repeated tunes)
```
## uxrce_dds_client
Джерело: [modules/uxrce_dds_client](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/uxrce_dds_client)


### Опис
Клієнт UXRCE-DDS використовується для спілкування з агентом за допомогою тем uORB через послідовний або UDP.

### Приклади
```
uxrce_dds_client start -t serial -d /dev/ttyS3 -b 921600
uxrce_dds_client start -t udp -h 127.0.0.1 -p 15555
```

<a id="uxrce_dds_client_usage"></a>

### Використання
```
uxrce_dds_client <command> [arguments...]
 Commands:
   start
     [-t <val>]  Transport protocol
                 values: serial|udp, default: udp
     [-d <val>]  serial device
                 values: <file:dev>
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 0
     [-h <val>]  Agent IP. If not provided, defaults to UXRCE_DDS_AG_IP
                 values: <IP>
     [-p <val>]  Agent listening port. If not provided, defaults to
                 UXRCE_DDS_PRT
     [-n <val>]  Client DDS namespace

   stop

   status        print status info
```
## work_queue
Джерело: [systemcmds/work_queue](https://github.com/PX4/PX4-Autopilot/tree/main/src/systemcmds/work_queue)


### Опис предмету

Інструмент командного рядка для відображення статусу черги роботи.


<a id="work_queue_usage"></a>

### Використання
```
work_queue <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
