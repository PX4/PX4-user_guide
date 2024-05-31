# Налаштування послідовного порту

PX4 визначає [типові функції](#default-serial-port-configuration) для багатьох портів керування польотом, тому ви можете підключити модуль GPS до порту з позначкою `GPS 1`, приймач RC до `RC IN`, або модуль телеметрії до `TELEM 1`, і, в цілому, вони просто працюватимуть.

Функції, призначені для портів, повністю конфігуруються за допомогою відповідних параметрів (у більшості випадків). Ви можете призначити будь-який не використаний порт для будь-якої функції або перепризначити порт, щоб використовувати його для іншої цілі.

Конфігурація дозволяє легко (наприклад):

- Виконайте MAVLink на іншому порту, змініть потокові повідомлення або перемкніть порт TELEM на використання ROS 2/XRCE-DDS.
- Змініть швидкість передачі даних на порту або встановіть UDP-порт
- Налаштування подвійного GPS.
- Увімкніть датчики, які працюють через послідовний порт, такі як деякі [датчики відстані](../sensor/rangefinders.md).

:::info

- Деякі порти не можуть бути налаштовані, оскільки вони використовуються для дуже конкретної цілі, наприклад, для системної консолі.
- Відображення конкретних пристроїв на назви портів на контролері польоту пояснено в [Відображення послідовного порту](../hardware/serial_port_mapping.md).
:::

## Налаштування параметрів

Параметри конфігурації послідовного порту дозволяють вам призначити певну функцію або підтримку певного обладнання для конкретного порту. Ці параметри слідують за шаблоном найменування `*_CONFIG` або `*_CFG`

::: info _QGroundControl_ показує лише параметри для служб/драйверів, які присутні в прошивці.
:::

На момент написання поточний набір:

- Налаштування GPS: [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG)
- [Iridium Satellite radio](../advanced_features/satcom_roadblock.md): [Конфігурація ISBD](../advanced_config/parameter_reference.md#ISBD_CONFIG)
- [Порти MAVLink](../peripherals/mavlink_peripherals.md): [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG)
- VOXL ESC: [VOXL_ESC_CONFIG](../advanced_config/parameter_reference.md#VOXL_ESC_CONFIG)
- MSP OSD: [MSP_OSD_CONFIG](../advanced_config/parameter_reference.md#MSP_OSD_CONFIG)
- Порт RC: [RC_PORT_CONFIG](../advanced_config/parameter_reference.md#RC_PORT_CONFIG)
- [FrSky Телеметрія](../peripherals/frsky_telemetry.md): [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG)
- HoTT Телеметрія: [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG)
- [uXRCE-DDS](../middleware/uxrce_dds.md) порт: [UXRCE_DS_CFG](../advanced_config/parameter_reference.md#UXRCE_DDS_CFG)
- Датчики (оптичний потік, датчики відстані): [SENS_CM8JL65_CFG](../advanced_config/parameter_reference.md#SENS_CM8JL65_CFG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFLOW_CFG](../advanced_config/parameter_reference.md#SENS_TFLOW_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG), [SENS_VN_CFG](../advanced_config/parameter_reference.md#SENS_VN_CFG),
- Водій введення CRSF RC: [RC_CRSF_PRT_CFG](../advanced_config/parameter_reference.md#RC_CRSF_PRT_CFG)
- Sagetech MXS: [MXS_SER_CFG](../advanced_config/parameter_reference.md#MXS_SER_CFG)
- Датчик позиції з ультраширокосмуговим зв'язком: [UWB_PORT_CFG](../advanced_config/parameter_reference.md#UWB_PORT_CFG)
- Драйвер DShot: [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#DSHOT_TEL_CFG)

Деякі функції / можливості можуть визначати додаткові параметри конфігурації, які будуть містити схожий шаблон іменування до префіксу конфігурації порту. Наприклад, `MAV_0_CONFIG` дозволяє використовувати MAVLink на певному порту, але вам також може знадобитися встановити [MAV_0_FLOW_CTRL](../advanced_config/parameter_reference.md#MAV_0_FLOW_CTRL), [MAV_0_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FLOW_CTRL), [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) та інше.

## Як налаштувати порт

Всі послідовні драйвери/порти налаштовані однаковим чином:

1. Встановіть параметр конфігурації для сервісу/периферійного пристрою на порт, який він буде використовувати.
1. Перезавантажте апарат, щоб побачити додаткові параметри конфігурації.
1. Set the baud rate parameter for the selected port to the desired value (e.g. [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD))
1. Налаштуйте параметри, специфічні для модуля (тобто. Потоки та конфігурація швидкості передачі даних MAVLink).

[GPS/Compass > Secondary GPS](../gps_compass/index.md#dual_gps) розділ надається практичний приклад налаштування порту _QGroundControl_ (показує як використовувати `GPS_2_CONFIG` щоб запускати додатковий GPS на `TELEM 2`).

Аналогічно [Налаштування Ethernet PX4 > Конфігурація послідовного порту PX4 MAVLink](../advanced_config/ethernet_setup.md#px4-mavlink-serial-port-configuration) пояснює налаштування послідовних портів Ethernet, а [Периферійні пристрої MAVLink (OSD/GCS/Супутникові комп'ютери тощо)](../peripherals/mavlink_peripherals.md) пояснює конфігурацію послідовних портів MAVLink.

## Розконфліктовування портів

Конфлікти портів вирішуються під час запуску системи, що забезпечує, що на конкретному порту запускається не більше однієї служби. Наприклад, неможливо запустити екземпляр MAVLink на конкретному послідовному пристрої, а потім запустити драйвер, який використовує той самий послідовний пристрій.

:::warning
На момент написання немає відгуків користувачів про конфліктуючі порти.
:::

<a id="default_port_mapping"></a>

## Налаштування послідовного порту за замовчуванням

:::tip
Ці зображення портів можуть бути вимкнені, встановивши пов'язаний параметр конфігурації на _Вимкнено_.
:::

Наступні порти зазвичай відображаються на конкретні функції на всіх платах:

- `GPS 1` налаштований як порт GPS (використовуючи [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG)).

  The default baud rate is set in the [gps driver](../modules/modules_driver.md#gps) by the value of [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD), which has a default rate of _Auto_. With this setting a GPS will automatically detect the baudrate — except for the Trimble MB-Two, which you will need to explicitly set to 115200 baud rate.

- `RC IN` налаштовано як вхід RC (використовуючи [RC_PORT_CONFIG](../advanced_config/parameter_reference.md#RC_PORT_CONFIG)).
- `TELEM 1` налаштований як послідовний порт MAVLink, придатний для підключення до GCS через [модуль телеметрії](../telemetry/index.md).

  Конфігурація використовує [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) для встановлення порту, [MAV_0_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE) для встановлення швидкості передачі даних на 57600 та [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) для встановлення потокових повідомлень на "Normal". Для отримання додаткової інформації див. : [MAVLink Периферійні пристрої (OSD/GCS/Компаньйон Комп'ютери/тощо)](../peripherals/mavlink_peripherals.md).

- `TELEM 2` налаштований за замовчуванням як послідовний порт MAVLink, придатний для підключення до комп'ютера на борту/другорядного комп'ютера через провідне підключення.

  Конфігурація використовує [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) для встановлення порту, [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_1_RATE) для встановлення швидкості передачі даних на , та [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) для встановлення потокових повідомлень на "Onboard". Для отримання додаткової інформації див.: [MAVLink Периферійні пристрої (OSD/GCS/Компаньйон Комп'ютери/тощо)](../peripherals/mavlink_peripherals.md).

- `Етернет` відображається як порт MAVLink на пристроях Pixhawk, які мають порт Ethernet.

  Конфігурація використовує [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) та відповідні налаштування для UDP-порту тощо. Для отримання додаткової інформації див. [Налаштування Ethernet PX4 > Конфігурація послідовного порту PX4 MAVLink](../advanced_config/ethernet_setup.md#px4-mavlink-serial-port-configuration) та [Периферійні пристрої MAVLink (OSD/GCS/Компаньйони тощо)](../peripherals/mavlink_peripherals.md).

Інші порти, як правило, за замовчуванням не мають призначених функцій (вимкнені).

## Вирішення проблем

<a id="parameter_not_in_firmware"></a>

### Відсутній параметр конфігурації в _QGroundControl_

_QGroundControl_ показує лише параметри для служб/драйверів, які присутні в прошивці. Якщо параметр відсутній, то можливо вам потрібно додати його в прошивку.

:::info Програмне забезпечення PX4 включає більшість драйверів за замовчуванням на платах серії [Pixhawk-series](../flight_controller/pixhawk_series.md). Дошки з обмеженням Flash можуть закоментувати/пропустити драйвер (на момент написання цього це стосується лише дошок на основі FMUv2).
:::

Ви можете включити відсутній драйвер у вбудоване програмне забезпечення, увімкнувши драйвер у файлі конфігурації **default.px4board**, який відповідає до [платі](https://github.com/PX4/PX4-Autopilot/tree/main/boards/px4), для якої ви хочете зібрати. Наприклад, щоб увімкнути драйвер SRF02, ви додасте наступний рядок до px4board.

```
CONFIG_DRIVERS_DISTANCE_SENSOR_SRF02=y
```

Простіший метод полягає в використанні boardconfig, який запускає GUI, де ви можете легко шукати, вимикаючи та увімкнюючи модулі. Для запуску типу boardconfig введіть:

```
make <vendor>_<board>_<label> boardconfig
```

Потім вам потрібно буде скомпілювати прошивку для вашої платформи, як описано в [Building PX4 Software](../dev_setup/building_px4.md).

## Подальша інформація

- [Пристрої MAVLink (OSD/GCS/Супутникові комп'ютери/тощо.)](../peripherals/mavlink_peripherals.md)
- [Налаштування Ethernet PX4  >  Конфігурація послідовного порту PX4 MAVLink](../advanced_config/ethernet_setup.md#px4-mavlink-serial-port-configuration)
- [Налаштування послідовного порту](../hardware/serial_port_mapping.md)
