# RTK GPS (PX4 інтеграція)

[Real Time Kinematic](https://en.wikipedia.org/wiki/Real_Time_Kinematic) (RTK) provides centimeter-level GPS accuracy.
Ця сторінка пояснює, як RTK інтегрується в PX4.

:::tip
Instructions for _using_ RTK GNSS are provided in [Hardware > RTK GPS](../gps_compass/rtk_gps.md).
:::

## Загальний огляд

RTK використовує виміри фази несучої хвилі сигналу, а не інформаційний вміст сигналу.
Він покладається на одну вихідну станцію для надання корекцій у реальному часі, які можуть працювати з кількома мобільними станціями.

Для налаштування RTK з PX4 потрібні два модулі RTK GPS та даталінк.
The fixed-position ground-based GPS unit is called the _Base_ and the in-air unit is called the _Rover_.
The Base unit connects to _QGroundControl_ (via USB) and uses the datalink to stream RTCM corrections to the vehicle (using the MAVLink [GPS_RTCM_DATA](https://mavlink.io/en/messages/common.html#GPS_RTCM_DATA) message).
На автопілоті пакети MAVLink розпаковуються та надсилаються до пристрою Rover, де вони обробляються для отримання рішення RTK.

The datalink should typically be able to handle an uplink rate of 300 bytes per second (see the [Uplink Datarate](#uplink-datarate) section below for more information).

## Підтримувані GPS-модулі RTK

The list of devices that we have tested can be found [in the user guide](../gps_compass/rtk_gps.md#supported-devices).

:::info
Most devices come with two variants, a base and a rover.
Переконайтеся, що ви обрали правильний варіант.
:::

## Автоматична конфігурація

The PX4 GPS stack automatically sets up the GPS modules to send and receive the correct messages over the UART or USB, depending on where the module is connected (to _QGroundControl_ or the autopilot).

As soon as the autopilot receives `GPS_RTCM_DATA` MAVLink messages, it automatically forwards the RTCM data to the attached GPS module over existing data channels (a dedicated channel for correction data is not required).

:::info
The u-blox U-Center RTK module configuration tool is not needed/used!
:::

:::info
Both _QGroundControl_ and the autopilot firmware share the same [PX4 GPS driver stack](https://github.com/PX4/GpsDrivers).
На практиці це означає, що підтримку нових протоколів і/або повідомлень потрібно додавати лише в одному місці.
:::

### RTCM повідомлення

QGroundControl налаштовує базову станцію RTK на вивід наступних рамок RTCM3.2, кожну з частотою 1 Гц, якщо не вказано інше:

- **1005** - Station coordinates XYZ for antenna reference point (Base position), 0.2 Hz.
- **1077** - Full GPS pseudo-ranges, carrier phases, Doppler and signal strength (high resolution).
- **1087** - Full GLONASS pseudo-ranges, carrier phases, Doppler and signal strength (high resolution).
- **1230** - GLONASS code-phase biases.
- **1097** - Full Galileo pseudo-ranges, carrier phases, Doppler and signal strength (high resolution)
- **1127** - Full BeiDou pseudo-ranges, carrier phases, Doppler and signal strength (high resolution)

## Uplink datarate(Швидкість передачі даних вгору)

The raw RTCM messages from the base are packed into a MAVLink `GPS_RTCM_DATA` message and sent over the datalink.
Максимальна довжина кожного повідомлення MAVLink становить 182 байти. Залежно від RTCM-повідомлення, повідомлення MAVLink майже ніколи не заповнюється повністю.

Повідомлення про базову позицію RTCM (1005) має довжину 22 байти, тоді як інші всі мають змінну довжину, залежно від кількості видимих супутників та кількості сигналів від супутника (лише 1 для однодіапазонних пристроїв, наприклад, M8P).
Since at a given time, the _maximum_ number of satellites visible from any single constellation is 12, under real-world conditions, theoretically an uplink rate of 300 B/s is sufficient.

If _MAVLink 1_ is used, a 182-byte `GPS_RTCM_DATA` message is sent for every RTCM message, irrespective of its length.
Внаслідок цього приблизна вимога до пропускної здатності каналу зв'язку складає близько 700 байт на секунду.
Це може призвести до насичення каналу зв'язку на модулях телеметрії з низькою пропускною здатністю напівдуплексного режиму (наприклад, телеметричні радіозв'язки 3DR).

If _MAVLink 2_ is used then any empty space in the `GPS_RTCM_DATA message` is removed.
Отримана вимога до пропускної здатності для передачі вгору становить приблизно ту ж величину, що і теоретичне значення (близько 300 байт на секунду).

:::tip
PX4 automatically switches to MAVLink 2 if the GCS and telemetry modules support it.
:::

MAVLink 2 слід використовувати на каналах з низькою пропускною здатністю для хорошої продуктивності RTK. Необхідно вдбати про те, щоб впевнитися, що ланцюжок телеметрії використовує MAVLink 2 на всіх етапах передачі даних.
You can verify the protocol version by using the `mavlink status` command on the system console:

```sh
nsh> mavlink status
instance #0:
        GCS heartbeat:  593486 us ago
        mavlink chan: #0
        type:           3DR RADIO
        rssi:           219
        remote rssi:    219
        txbuf:          94
        noise:          61
        remote noise:   58
        rx errors:      0
        fixed:          0
        flow control:   ON
        rates:
        tx: 1.285 kB/s
        txerr: 0.000 kB/s
        rx: 0.021 kB/s
        rate mult: 0.366
        accepting commands: YES
        MAVLink version: 2
        transport protocol: serial (/dev/ttyS1 @57600)
```
