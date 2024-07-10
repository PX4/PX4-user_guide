# Modules Reference: Driver
Підкатегорії:
- [Imu](modules_driver_imu.md)
- [Датчик відстані](modules_driver_distance_sensor.md)
- [Ins](modules_driver_ins.md)
- [Датчик швидкості](modules_driver_airspeed_sensor.md)
- [Барометер](modules_driver_baro.md)
- [Transponder](modules_driver_transponder.md)
- [Rpm датчик](modules_driver_rpm_sensor.md)
- [Optical Flow](modules_driver_optical_flow.md)
- [Camera](modules_driver_camera.md)
- [Магнітометр](modules_driver_magnetometer.md)

## MCP23009
Джерело: [drivers/gpio/mcp23009](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/gpio/mcp23009)

<a id="MCP23009_usage"></a>

### Використання
```
MCP23009 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 37
     [-D <val>]  Direction
                 default: 0
     [-O <val>]  Output
                 default: 0
     [-P <val>]  Pullups
                 default: 0
     [-U <val>]  Update Interval [ms]
                 default: 0

   stop

   status        print status info
```
## adc
Джерело: [drivers/adc/board_adc](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/adc/board_adc)


### Опис
ADC драйвер.


<a id="adc_usage"></a>

### Використання
```
adc <command> [arguments...]
 Commands:
   start

   test
     [-n]        Do not publish ADC report, only system power

   stop

   status        print status info
```
## ads1115
Джерело: [drivers/adc/ads1115](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/adc/ads1115)


### Опис

Драйвер для активації зовнішнього [ADS1115](https://www.adafruit.com/product/1085) ADC підключеного через I2C.

Драйвер за замовчуванням включено у прошивку для плат, які не мають внутрішнього аналого-цифрового перетворювача, таких як [PilotPi](../flight_controller/raspberry_pi_pilotpi.md) або [CUAV Nora](../flight_controller/cuav_nora.md). (шукайте `CONFIG_DRIVERS_ADC_ADS1115` у файлах конфігурації плати).

Вмикається/вимикається за допомогою [ADC_ADS1115_EN](../advanced_config/parameter_reference.md#ADC_ADS1115_EN) і за замовчуванням вимкнено. Якщо увімкнено, внутрішні ADC не використовуються.


<a id="ads1115_usage"></a>

### Використання
```
ads1115 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 72

   stop

   status        print status info
```
## atxxxx
Джерело: [drivers/osd/atxxxx](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/osd/atxxxx)


### Опис
Наприклад, OSD драйвер для мікросхеми ATXXXX, яка встановлена на платі OmnibusF4SD.

Його можна увімкнути за допомогою параметра OSD_ATXXXX_CFG.

<a id="atxxxx_usage"></a>

### Використання
```
atxxxx <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## batmon
Джерело: [drivers/smart_battery/batmon](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/smart_battery/batmon)


### Опис
Драйвер для зв'язку SMBUS зі смарт-батареєю з підтримкою BatMon Інформація про налаштування/використання: https://rotoye.com/batmon-tutorial/
### Приклади
Почати з адреси 0x0B, на шині 4
```
batmon start -X -a 11 -b 4
```


<a id="batmon_usage"></a>

### Використання
```
batmon <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 11

   man_info      Prints manufacturer info.

   suspend       Suspends the driver from rescheduling the cycle.

   resume        Resumes the driver from suspension.

   stop

   status        print status info
```
## batt_smbus
Джерело: [drivers/batt_smbus](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/batt_smbus)


### Опис
Розумний драйвер акумулятора для BQ40Z50 палива IC.

### Приклади
Записати у прошивку для встановлення параметрів. address, number_of_bytes, byte0, ... , byteN
```
batt_smbus -X write_flash 19069 2 27 0
```


<a id="batt_smbus_usage"></a>

### Використання
```
batt_smbus <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 11

   man_info      Prints manufacturer info.

   unseal        Unseals the devices flash memory to enable write_flash
                 commands.

   seal          Seals the devices flash memory to disable write_flash commands.

   suspend       Suspends the driver from rescheduling the cycle.

   resume        Resumes the driver from suspension.

   write_flash   Writes to flash. The device must first be unsealed with the
                 unseal command.
     [address]   The address to start writing.
     [number of bytes] Number of bytes to send.
     [data[0]...data[n]] One byte of data at a time separated by spaces.

   stop

   status        print status info
```
## bst
Джерело: [drivers/telemetry/bst](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/telemetry/bst)

<a id="bst_usage"></a>

### Використання
```
bst <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 118

   stop

   status        print status info
```
## crsf_rc
Джерело: [drivers/rc/crsf_rc](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/rc/crsf_rc)


### Опис
Цей модуль парсить uplink протокол CRSF RC і генерує дані CRSF downlink телеметрії


<a id="crsf_rc_usage"></a>

### Використання
```
crsf_rc <command> [arguments...]
 Commands:
   start
     [-d <val>]  RC device
                 values: <file:dev>, default: /dev/ttyS3

   stop

   status        print status info
```
## dshot
Джерело: [drivers/dshot](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/dshot)


### Опис
Це драйвер виводу DShot. Він схожий на драйвер fmu і може бути використаний як заміна використовувати DShot як протокол зв'язку ESC замість PWM.

Під час запуску модуль намагається зайняти всі доступні піни для виходу DShot. Він пропускає всі піни, які вже використовуються (наприклад, модулем запуску камери).

Він підтримує:
- DShot150, DShot300, DShot600, DShot1200
- телеметрія через окремий UART та публікація у вигляді повідомлення esc_status
- надсилання команд DShot через CLI

### Приклади
Постійно реверсує двигун 1:
```
dshot reverse -m 1
dshot save -m 1
```
Після збереження змінений напрямок буде вважатися нормальним. Щоб розвернути назад, повторіть ті ж самі команди.

<a id="dshot_usage"></a>

### Використання
```
dshot <command> [arguments...]
 Commands:
   start

   telemetry     Enable Telemetry on a UART
     <device>    UART device

   reverse       Reverse motor direction
     [-m <val>]  Motor index (1-based, default=all)

   normal        Normal motor direction
     [-m <val>]  Motor index (1-based, default=all)

   save          Save current settings
     [-m <val>]  Motor index (1-based, default=all)

   3d_on         Enable 3D mode
     [-m <val>]  Motor index (1-based, default=all)

   3d_off        Disable 3D mode
     [-m <val>]  Motor index (1-based, default=all)

   beep1         Send Beep pattern 1
     [-m <val>]  Motor index (1-based, default=all)

   beep2         Send Beep pattern 2
     [-m <val>]  Motor index (1-based, default=all)

   beep3         Send Beep pattern 3
     [-m <val>]  Motor index (1-based, default=all)

   beep4         Send Beep pattern 4
     [-m <val>]  Motor index (1-based, default=all)

   beep5         Send Beep pattern 5
     [-m <val>]  Motor index (1-based, default=all)

   esc_info      Request ESC information
     -m <val>    Motor index (1-based)

   stop

   status        print status info
```
## fake_gps
Джерело: [examples/fake_gps](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/examples/fake_gps)


### Опис


<a id="fake_gps_usage"></a>

### Використання
```
fake_gps <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fake_imu
Джерело: [examples/fake_imu](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/examples/fake_imu)


### Опис


<a id="fake_imu_usage"></a>

### Використання
```
fake_imu <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fake_magnetometer
Джерело: [examples/fake_magnetometer](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/examples/fake_magnetometer)


### Опис
Publish the earth magnetic field as a fake magnetometer (sensor_mag). Потребує vehicle_attitude та vehicle_gps_position.

<a id="fake_magnetometer_usage"></a>

### Використання
```
fake_magnetometer <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## ft_technologies_serial
Джерело: [drivers/wind_sensor/ft_technologies](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/wind_sensor/ft_technologies)


### Опис

Драйвер послідовної шини для цифрового датчика вітру FT Technologies FT742. Цей драйвер потрібен для роботи разом з з модулем передачі сигналу RS485 на UART.

Більшість плат налаштовано на увімкнення/запуск драйвера на вказаному UART за допомогою параметра SENS_FTX_CFG.

### Приклади

Спроба запустити драйвер на вказаному послідовному пристрої.
```
ft_technologies_serial start -d /dev/ttyS1
```
Зупинити драйвер
```
ft_technologies_serial stop
```

<a id="ft_technologies_serial_usage"></a>

### Використання
```
ft_technologies_serial <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device

   stop          Stop driver
```
## gimbal
Джерело: [modules/gimbal](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/gimbal)


### Опис
Водій керування монтажем / гімбалю. Він відображає кілька різних методів введення (наприклад, RC або MAVLink) на налаштований вивід (наприклад, AUX канали або MAVLink).

Документація з тим, як його використовувати, знаходиться на сторінці управління гімбалем [gimbal_control](https://docs.px4.io/v1.15/en/advanced/gimbal_control.html).

### Приклади
Перевірте вихідні дані, встановивши кути (всі пропущені вісі установлені на 0):
```
gimbal test pitch -45 yaw 30
```

<a id="gimbal_usage"></a>

### Використання
```
gimbal <command> [arguments...]
 Commands:
   start

   status

   primary-control Set who is in control of gimbal
     <sysid> <compid> MAVLink system ID and MAVLink component ID

   test          Test the output: set a fixed angle for one or multiple axes
                 (gimbal must be running)
     roll|pitch|yaw <angle> Specify an axis and an angle in degrees

   stop

   status        print status info
```
## gps
Джерело: [drivers/gps](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/gps)


### Опис
Модуль GPS-драйвера, який здійснює зв'язок з пристроєм і публікує позицію через uORB. Він підтримує кілька протоколів (постачальників пристроїв) і за замовчуванням автоматично вибирає правильний.

Модуль підтримує додатковий GPS пристрій, який задається параметром `-e`. Позиція буде опублікована на другому екземплярі теми uORB, але наразі вона не використовується рештою системи (однак дані будуть зареєстровані, щоб їх можна було використовувати для порівняння).

### Імплементація
Для кожного пристрою існує потік, який опитує дані. Класи протоколу GPS реалізовано з функцією зворотного виклику щоб їх можна було використовувати і в інших проектах (наприклад, QGroundControl також використовує їх).

### Приклади

Запуск 2 GPS-пристроїв (основний GPS на /dev/ttyS3 і додатковий на /dev/ttyS4):
```
gps start -d /dev/ttyS3 -e /dev/ttyS4
```

Ініціюйте гарячий перезапуск GPS-пристрою
```
gps reset warm
```

<a id="gps_usage"></a>

### Використання
```
gps <command> [arguments...]
 Commands:
   start
     [-d <val>]  GPS device
                 values: <file:dev>, default: /dev/ttyS3
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 0
     [-e <val>]  Optional secondary GPS device
                 values: <file:dev>
     [-g <val>]  Baudrate (secondary GPS, can also be p:<param_name>)
                 default: 0
     [-i <val>]  GPS interface
                 values: spi|uart, default: uart
     [-j <val>]  secondary GPS interface
                 values: spi|uart, default: uart
     [-p <val>]  GPS Protocol (default=auto select)
                 values: ubx|mtk|ash|eml|fem|nmea

   stop

   status        print status info

   reset         Reset GPS device
     cold|warm|hot Specify reset type
```
## gz_bridge
Джерело: [modules/simulation/gz_bridge](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/simulation/gz_bridge)


### Опис


<a id="gz_bridge_usage"></a>

### Використання
```
gz_bridge <command> [arguments...]
 Commands:
   start
     -m <val>    Fuel model name
     -p <val>    Model Pose
     -n <val>    Model name
     -i <val>    PX4 instance
     [-w <val>]  World name

   stop

   status        print status info
```
## ina220
Джерело: [drivers/power_monitor/ina220](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/power_monitor/ina220)


### Опис
Драйвер для монітора живлення INA220.

Кілька екземплярів цього драйвера можуть працювати одночасно, якщо кожен екземпляр має окрему адресу шини АБО I2C.

Наприклад, один екземпляр може працювати на шині 2, адреса 0x41, а інший - на шині 2, адреса 0x43.

Якщо модуль INA220 не має живлення, то за замовчуванням ініціалізація драйвера не відбудеться. Щоб змінити це, використовуйте прапор -f. Якщо цей прапорець встановлено, то у разі невдалої ініціалізації драйвер буде повторювати спроби ініціалізації кожні 0.5 секунди. Якщо цей прапорець встановлено, ви можете підключити батарею після запуску драйвера, і він буде працювати. Якщо цей прапорець не встановлено, перед запуском драйвера необхідно підключити батарею.


<a id="ina220_usage"></a>

### Використання
```
ina220 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 65
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 3)
                 default: 1
     [-T <val>]  Type
                 values: VBATT|VREG, default: VBATT

   stop

   status        print status info
```
## ina226
Джерело: [drivers/power_monitor/ina226](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/power_monitor/ina226)


### Опис
Драйвер для монітора живлення INA226.

Кілька екземплярів цього драйвера можуть працювати одночасно, якщо кожен екземпляр має окрему адресу шини АБО I2C.

Наприклад, один екземпляр може працювати на шині 2, адреса 0x41, а інший - на шині 2, адреса 0x43.

Якщо модуль INA226 не живиться, то за замовчуванням ініціалізація драйвера не відбудеться. Щоб змінити це, використовуйте прапор -f. Якщо цей прапорець встановлено, то у разі невдалої ініціалізації драйвер буде повторювати спроби ініціалізації кожні 0.5 секунди. Якщо цей прапорець встановлено, ви можете підключити батарею після запуску драйвера, і він буде працювати. Якщо цей прапорець не встановлено, перед запуском драйвера необхідно підключити батарею.


<a id="ina226_usage"></a>

### Використання
```
ina226 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 65
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 3)
                 default: 1

   stop

   status        print status info
```
## ina228
Джерело: [drivers/power_monitor/ina228](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/power_monitor/ina228)


### Опис
Драйвер для монітора живлення INA228.

Кілька екземплярів цього драйвера можуть працювати одночасно, якщо кожен екземпляр має окрему адресу шини АБО I2C.

Наприклад, один екземпляр може працювати на шині 2, адреса 0x41, а інший - на шині 2, адреса 0x43.

Якщо модуль INA228 не має живлення, то за замовчуванням ініціалізація драйвера не відбудеться. Щоб змінити це, використовуйте прапор -f. Якщо цей прапорець встановлено, то у разі невдалої ініціалізації драйвер буде повторювати спроби ініціалізації кожні 0.5 секунди. Якщо цей прапорець встановлено, ви можете підключити батарею після запуску драйвера, і він буде працювати. Якщо цей прапорець не встановлено, перед запуском драйвера необхідно підключити батарею.


<a id="ina228_usage"></a>

### Використання
```
ina228 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 69
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 3)
                 default: 1

   stop

   status        print status info
```
## ina238
Джерело: [drivers/power_monitor/ina238](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/power_monitor/ina238)


### Опис
Драйвер для монітора потужності INA238.

Декілька екземплярів цього драйвера можуть працювати одночасно, якщо кожний екземпляр має окрему шину або адресу I2C.

Наприклад, один екземпляр може працювати на автобусі 2, адреса 0x45, а інший - на автобусі 2, адреса 0x45.

Якщо модуль INA238 не заснується, то за замовчуванням ініціалізація драйвера не вдасться. Щоб змінити це, використовуйте прапорець -f. Якщо цей прапорець встановлено, то якщо ініціалізація не вдасться, драйвер спробує ініціалізувати знову кожні 0,5 секунди. З цим прапорцем встановленим, ви можете підключити батарею після запуску драйвера, і вона буде працювати. Без цього прапорця ,батарея повинна бути вставлена до запуску драйвера.


<a id="ina238_usage"></a>

### Використання
```
ina238 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 69
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 3)
                 default: 1

   stop

   status        print status info
```
## iridiumsbd
Джерело: [drivers/telemetry/iridiumsbd](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/telemetry/iridiumsbd)


### Опис
Драйвер IridiumSBD.

Створює віртуальний послідовний порт, який інший модуль може використовувати для зв'язку (наприклад, mavlink).

<a id="iridiumsbd_usage"></a>

### Використання
```
iridiumsbd <command> [arguments...]
 Commands:
   start
     -d <val>    Serial device
                 values: <file:dev>
     [-v]        Enable verbose output

   test
     [s|read|AT <cmd>] Test command

   stop

   status        print status info
```
## irlock
Джерело: [drivers/irlock](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/irlock)

<a id="irlock_usage"></a>

### Використання
```
irlock <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 84

   stop

   status        print status info
```
## linux_pwm_out
Джерело: [drivers/linux_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/linux_pwm_out)


### Опис
Драйвер виведення Linux PWM з реалізацією бекенду специфічного для плати.

<a id="linux_pwm_out_usage"></a>

### Використання
```
linux_pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## lsm303agr
Джерело: [drivers/magnetometer/lsm303agr](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/magnetometer/lsm303agr)

<a id="lsm303agr_usage"></a>

### Використання
```
lsm303agr <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## msp_osd
Джерело: [drivers/osd/msp_osd](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/osd/msp_osd)


### Опис
Потік телеметрії MSP

### Реалізація
Перетворює повідомлення uORB на пакети телеметрії MSP

### Приклади
Приклад використання CLI:
```
msp_osd
```


<a id="msp_osd_usage"></a>

### Використання
```
msp_osd <command> [arguments...]
 Commands:
   stop

   status        print status info
```
## newpixel
Джерело: [drivers/lights/neopixel](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/lights/neopixel)


### Опис
Цей модуль відповідає за взаємодію з Neopixel Serial LED

### Приклади
Модуль зазвичай починається з:
```
neopixel -n 8
```
Привести всі доступні світлодіоди в дію.

<a id="newpixel_usage"></a>

### Використання
```
newpixel <command> [arguments...]
 Commands:
   stop

   status        print status info
```
## paa3905
Джерело: [drivers/optical_flow/paa3905](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/optical_flow/paa3905)

<a id="paa3905_usage"></a>

### Використання
```
paa3905 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-Y <val>]  custom yaw rotation (degrees)
                 default: 0

   stop

   status        print status info
```
## paw3902
Джерело: [drivers/optical_flow/paw3902](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/optical_flow/paw3902)

<a id="paw3902_usage"></a>

### Застосування
```
paw3902 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-Y <val>]  custom yaw rotation (degrees)
                 default: 0

   stop

   status        print status info
```
## pca9685_pwm_out
Джерело: [drivers/pca9685_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/pca9685_pwm_out)


### Опис
Це пристрій виводу керування PWM PCA9685.

Він працює на робочій черзі I2C, яка є асинхронною з контрольною петлею FC, витягує останній результат змішування та записує їх в PCA9685 у відповідних мітках планування.

Воно може виконувати повний вихід 12 біт у режимі циклу керування, а також може виводити цінний ширину імпульсу що може бути прийнято більшістю ESCs та серводвигунами.

### Приклади
Зазвичай починається з:
```
pca9685_pwm_out start -a 0x40 -b 1
```


<a id="pca9685_pwm_out_usage"></a>

### Використання
```
pca9685_pwm_out <command> [arguments...]
 Commands:
   start         Start the task
     [-a <val>]  7-bits I2C address of PCA9685
                 values: <addr>, default: 0x40
     [-b <val>]  bus that pca9685 is connected to
                 default: 1

   stop

   status        print status info
```
## pm_selector_auterion
Джерело: [drivers/power_monitor/pm_selector_auterion](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/power_monitor/pm_selector_auterion)


### Опис
Драйвер для запуску та автоматичного виявлення різних датчиків потужності.


<a id="pm_selector_auterion_usage"></a>

### Використання
```
pm_selector_auterion <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pmw3901
Джерело: [drivers/optical_flow/pmw3901](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/optical_flow/pmw3901)

<a id="pmw3901_usage"></a>

### Використання
```
pmw3901 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## pps_capture
Джерело: [drivers/pps_capture](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/pps_capture)


### Опис
Це реалізує захоплення інформації PPS з модуля GNSS та розраховує відхилення між PPS та годинником реального часу.


<a id="pps_capture_usage"></a>

### Використання
```
pps_capture <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pwm_out
Джерело: [drivers/pwm_out](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/pwm_out)


### Опис
Цей модуль відповідає за виведення пінів. Для плат без окремого IO-чіпа (наприклад, Pixracer), використовуються головні канали. На платах з IO-чіпом (наприклад, Pixhawk) використовуються AUX-канали, а для основних використовується драйвер px4io.


<a id="pwm_out_usage"></a>

### Використання
```
pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pwm_out_sim
Джерело: [modules/simulation/pwm_out_sim](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/simulation/pwm_out_sim)


### Опис
Драйвер для імітованих вихідних сигналів ШІМ.

Його єдина функція - приймати повідомлення uORB `actuator_control`, змішувати їх з будь-яким завантаженим міксером і виводити результат на тему uORB `actuator_output`.

Воно використовується в SITL та HITL.


<a id="pwm_out_sim_usage"></a>

### Використання
```
pwm_out_sim <command> [arguments...]
 Commands:
   start         Start the module
     [-m <val>]  Mode
                 values: hil|sim, default: sim

   stop

   status        print status info
```
## px4flow
Джерело: [drivers/optical_flow/px4flow](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/optical_flow/px4flow)

<a id="px4flow_usage"></a>

### Використання
```
px4flow <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 66

   stop

   status        print status info
```
## px4io
Джерело: [drivers/px4io](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/px4io)


### Опис
Драйвер виводу, що зв'язується з вводовим ко-процесором.

<a id="px4io_usage"></a>

### Використання
```
px4io <command> [arguments...]
 Commands:
   start

   checkcrc      Check CRC for a firmware file against current code on IO
     <filename>  Firmware file

   update        Update IO firmware
     [<filename>] Firmware file

   debug         set IO debug level
     <debug_level> 0=disabled, 9=max verbosity

   bind          DSM bind
     dsm2|dsmx|dsmx8 protocol

   sbus1_out     enable sbus1 out

   sbus2_out     enable sbus2 out

   supported     Returns 0 if px4io is supported

   test_fmu_fail test: turn off IO updates

   test_fmu_ok   re-enable IO updates

   stop

   status        print status info
```
## rc_input
Джерело: [drivers/rc_input](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/rc_input)


### Опис
Цей модуль робить аналіз введення RC та автоматичний вибір методу. Підтримувані методи:
- PPM
- SBUS
- DSM
- SUMD
- ST24
- TBS Crossfire (CRSF)


<a id="rc_input_usage"></a>

### Використання
```
rc_input <command> [arguments...]
 Commands:
   start
     [-d <val>]  RC device
                 values: <file:dev>, default: /dev/ttyS3

   bind          Send a DSM bind command (module must be running)

   stop

   status        print status info
```
## rgbled
Джерело: [drivers/lights/rgbled_ncp5623c](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/lights/rgbled_ncp5623c)

<a id="rgbled_usage"></a>

### Використання
```
rgbled <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 57
     [-o <val>]  RGB PWM Assignment
                 default: 123

   stop

   status        print status info
```
## rgbled_is31fl3195
Джерело: [drivers/lights/rgbled_is31fl3195](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/lights/rgbled_is31fl3195)

<a id="rgbled_is31fl3195_usage"></a>

### Використання
```
rgbled_is31fl3195 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 84
     [-o <val>]  RGB PWM Assignment
                 default: 123
     [-i <val>]  Current Band
                 default: 0.5

   stop

   status        print status info
```
## rgbled_lp5562
Джерело: [drivers/lights/rgbled_lp5562](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/lights/rgbled_lp5562)


### Опис
Водій для [LP5562](https://www.ti.com/product/LP5562) світлодіодного драйвера, підключеного через I2C.

Це використовується в деяких модулях GPS від Holybro для [повідомлень про статус PX4](../getting_started/led_meanings.md)

Водій включений за замовчуванням у вбудованому програмному забезпеченні (ключ KConfig DRIVERS_LIGHTS_RGBLED_LP5562) і завжди увімкнено.

<a id="rgbled_lp5562_usage"></a>

### Застосування
```
rgbled_lp5562 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 48
     [-u <val>]  Current in mA
                 default: 17.5

   stop

   status        print status info
```
## roboclaw
Джерело: [drivers/roboclaw](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/roboclaw)


### Опис

Цей драйвер здійснює зв'язок через UART з [драйвером двигуна Roboclaw](https://www.basicmicro.com/motor-controller). Вона виконує дві задачі:

 - Контролюйте двигуни на основі інтерфейсу виведення.
 - Прочитати датчики обертання коліс та опублікувати сирі дані в темі uORB `wheel_encoders`

Для використання цього драйвера Roboclaw повинен бути переведений у режим Packet Serial (див. документацію за посиланням), а UART-порт вашого контролера польоту повинен бути підключений до Roboclaw, як показано в документації. Водію потрібно увімкнути за допомогою параметра `RBCLW_SER_CFG`, швидкість передачі даних потрібно встановити правильно і адреса `RBCLW_ADDRESS` повинна відповідати конфігурації ESC.

Команда для запуску цього драйвера: `$ roboclaw start <UART device><baud rate>`

<a id="roboclaw_usage"></a>

### Використання
```
roboclaw <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## safety_button
Джерело: [drivers/safety_button](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/safety_button)


### Опис
Цей модуль відповідає за кнопку безпеки. Натискання кнопки безпеки 3 рази швидко спричинить запит на синхронізацію GCS.


<a id="safety_button_usage"></a>

### Використання
```
safety_button <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## septentrio
Source: [drivers/gnss/septentrio](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/gnss/septentrio)


### Опис
GPS driver module that handles the communication with Septentrio devices and publishes the position via uORB.

The module supports a secondary GPS device, specified via `-e` parameter. The position will be published on the second uORB topic instance. It can be used for logging and heading computation.

### Приклади

Starting 2 GPS devices (main one on /dev/ttyS3, secondary on /dev/ttyS4)
```
septentrio start -d /dev/ttyS3 -e /dev/ttyS4
```

Initiate warm restart of GPS device
```
gps reset warm
```

<a id="septentrio_usage"></a>

### Використання
```
septentrio <command> [arguments...]
 Commands:
   start
     -d <val>    Primary Septentrio receiver
                 values: <file:dev>
     [-b <val>]  Primary baud rate
                 default: 0
     [-e <val>]  Secondary Septentrio receiver
                 values: <file:dev>
     [-g <val>]  Secondary baud rate
                 default: 0

   stop

   status        print status info

   reset         Reset connected receiver
     cold|warm|hot Specify reset type
```
## sht3x
Джерело: [drivers/hygrometer/sht3x](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/hygrometer/sht3x)


### Опис
Драйвер датчика температури і вологості SHT3x від Senserion.

### Приклади
Приклад використання CLI:
```
sht3x start -X
```
  Запустіть драйвер датчика на зовнішньому шині

```
sht3x status
```
  Статус драйвера друку

```
sht3x values
```
  Друкувати останні виміряні значення

```
sht3x reset
```
  Ініціалізувати датчик, скинути прапорці


<a id="sht3x_usage"></a>

### Використання
```
sht3x <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 68
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info

   values        Print actual data

   reset         Reinitialize sensor
```
## tap_esc
Джерело: [drivers/tap_esc](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/tap_esc)


### Опис

Цей модуль керує апаратним забезпеченням TAP_ESC через UART. Він слухає теми управління дією, робить змішування та записує вихідні ШІМ сигнали.

### Реалізація

На даний момент модуль реалізований лише у вигляді версії з потоками, що означає, що він працює у власному потоці, а не в черзі завдань.

### Приклади

Модуль зазвичай починається з:

```
tap_esc start -d /dev/ttyS2 -n <1-8>
```

<a id="tap_esc_usage"></a>

### Використання
```
tap_esc <command> [arguments...]
 Commands:
   start         Start the task
     [-d <val>]  Device used to talk to ESCs
                 values: <device>
     [-n <val>]  Number of ESCs
                 default: 4
```
## tone_alarm
Джерело: [drivers/tone_alarm](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/tone_alarm)


### Опис
Цей модуль відповідає за сигнал тривоги.


<a id="tone_alarm_usage"></a>

### Використання
```
tone_alarm <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uwb
Джерело: [drivers/uwb/uwb_sr150](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/uwb/uwb_sr150)


### Опис

Драйвер для системи позиціонування NXP UWB_SR150 UWB. Цей драйвер публікує повідомлення `uwb_distance` кожного разу, коли UWB_SR150 має наявне вимірювання позиції.

### Приклади

Запустіть драйвер з вказаним пристроєм:

```
uwb start -d /dev/ttyS2
```

<a id="uwb_usage"></a>

### Використання
```
uwb <command> [arguments...]
 Commands:
   start
     -d <val>    Name of device for serial communication with UWB
                 values: <file:dev>
     -b <val>    Baudrate for serial communication
                 values: <int>

   stop

   status
```
## voxl2_io
Джерело: [drivers/voxl2_io](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/voxl2_io)


### Опис
Цей модуль відповідає за виведення вихідних контактів. Для плат без окремого IO-чіпа (наприклад, Pixracer), використовуються головні канали. На платах з IO-чіпом (наприклад, Pixhawk) використовуються AUX-канали, а для основних використовується драйвер px4io.


<a id="voxl2_io_usage"></a>

### Використання
```
voxl2_io <command> [arguments...]
 Commands:
   start         Start the task
     -v          Verbose messages
     -d          Disable PWM
     -e          Disable RC
     -p <val>    UART port

   calibrate_escs Calibrate ESCs min/max range

   calibrate_escs Calibrate ESCs min/max range

   pwm           Open-Loop PWM test control request
     -c <val>    PWM OUTPUT Channel, 0-3
     -r <val>    Duty Cycle value, 0 to 800
     -n <val>    Command repeat count, 0 to INT_MAX
     -t <val>    Delay between repeated commands (microseconds), 0 to INT_MAX

   stop

   status        print status info
```
## voxl_esc
Джерело: [drivers/actuators/voxl_esc](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/actuators/voxl_esc)


### Опис
Цей модуль відповідає за кнопку безпеки...

### Реалізація
За замовчуванням модуль працює в черзі роботи з зворотнім викликом за темою управління актуаторами uORB.

### Examples
Зазвичай починається з:
```
todo
```


<a id="voxl_esc_usage"></a>

### Використання
```
voxl_esc <command> [arguments...]
 Commands:
   start         Start the task

   reset         Send reset request to ESC
     -i <val>    ESC ID, 0-3

   version       Send version request to ESC
     -i <val>    ESC ID, 0-3

   version-ext   Send extended version request to ESC
     -i <val>    ESC ID, 0-3

   rpm           Closed-Loop RPM test control request
     -i <val>    ESC ID, 0-3
     -r <val>    RPM, -32,768 to 32,768
     -n <val>    Command repeat count, 0 to INT_MAX
     -t <val>    Delay between repeated commands (microseconds), 0 to INT_MAX

   pwm           Open-Loop PWM test control request
     -i <val>    ESC ID, 0-3
     -r <val>    Duty Cycle value, 0 to 800
     -n <val>    Command repeat count, 0 to INT_MAX
     -t <val>    Delay between repeated commands (microseconds), 0 to INT_MAX

   tone          Send tone generation request to ESC
     -i <val>    ESC ID, 0-3
     -p <val>    Period of sound, inverse frequency, 0-255
     -d <val>    Duration of the sound, 0-255, 1LSB = 13ms
     -v <val>    Power (volume) of sound, 0-100

   led           Send LED control request
     -l <val>    Bitmask 0x0FFF (12 bits) - ESC0 (RGB) ESC1 (RGB) ESC2 (RGB)
                 ESC3 (RGB)

   stop

   status        print status info
```
## voxlpm
Джерело: [drivers/power_monitor/voxlpm](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/power_monitor/voxlpm)

<a id="voxlpm_usage"></a>

### Використання
```
voxlpm [arguments...]
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 68
     [-T <val>]  Type
                 values: VBATT|P5VDC|P12VDC, default: VBATT
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
## zenoh
Джерело: [modules/zenoh](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/modules/zenoh)


### Description

Zenoh demo bridge

<a id="zenoh_usage"></a>

### Usage
```
zenoh <command> [arguments...]
 Commands:
   start

   stop

   status

   config
```
