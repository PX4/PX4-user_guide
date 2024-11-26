# Короткий посібник з підключення Holybro Pixhawk 6X

:::warning
PX4 не розробляє цей (або будь-який інший) автопілот.
Contact the [manufacturer](https://holybro.com/) for hardware support or compliance issues.
:::

This quick start guide shows how to power the [Pixhawk 6X<sup>&reg;</sup>](../flight_controller/pixhawk6x.md) flight controller and connect its most important peripherals.

## Вміст набору

:::: tabs

:::tab Набір Pixhawk 6X Standard

![Pixhawk 6x standard set](../../assets/flight_controller/pixhawk6x/pixhawk6x_standard_set.jpg)

:::

:::tab Набір Pixhawk 6X Mini

![Pixhawk 6x mini standard set](../../assets/flight_controller/pixhawk6x/pixhawk6x_mini_set.jpg)

:::
::::

## Огляд схеми підключення

На зображенні нижче показано, як під'єднати найважливіші датчики та периферійні пристрої.

![Pixhawk 6x Wiring Overview](../../assets/flight_controller/pixhawk6x/pixhawk6x_wiring_diagram.png)

:::tip
More information about available ports can be found here: [Pixhawk 6X > Connections](../flight_controller/pixhawk6x.md#connections).
:::

## Монтаж та орієнтація контролера

_Pixhawk 6X_ can be mounted on the frame using double side tape included in the kit.
Вона повинна розташовуватися якомога ближче до центру тяжіння вашого апарату верхньою стороною вгору зі стрілкою, що вказує в напрямку передньої частини апарату.

<img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_vehicle_front1.jpg" width="400px" title="Pixhawk6x" />

:::info
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

## GPS + Compass + Buzzer + Safety Switch + LED

The _Pixhawk6X Standard Set_ & _Pixhawk6X Mini Set_ can be purchased with M8N or M9N GPS (10-pin connector) that should be connected to the **GPS1** port.
Ці модулі GNSS мають вбудований компас, безпечний перемикач, дзвіночок та світлодіод.

A secondary [M8N or M9N GPS](https://holybro.com/collections/gps) (6-pin connector) can be purchased separately and connected to the **GPS2** port.

The GPS/Compass should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_gps_front.jpg" width="200px" title="Pixhawk5x standard set" />

:::info
The GPS module's integrated safety switch is enabled _by default_ (when enabled, PX4 will not let you arm the vehicle).
Щоб вимкнути безпеку, натисніть і утримуйте безпечний вимикач протягом 1 секунди.
Ви можете натиснути безпечний вимикач знову, щоб увімкнути безпеку та відключити транспортний засіб (це може бути корисно, якщо, з якихось причин, ви не можете вимкнути транспортний засіб за допомогою вашого пульта дистанційного керування або наземної станції).
:::

## Power

Connect the output of the _PM02D Power Module_ (PM board) that comes with the Standard Set to one of the **POWER** port of _Pixhawk 6X_ using the 6-wire cable.
The PM02D and Power ports on the Pixhawk 6X uses the 6 circuit [2.00mm Pitch CLIK-Mate Wire-to-Board PCB Receptacle](https://www.molex.com/molex/products/part-detail/pcb_receptacles/5024430670) & [Housing](https://www.molex.com/molex/products/part-detail/crimp_housings/5024390600).

The PM02D Power Module supports **2~6S** battery, the board input should be connected to your LiPo battery. Note that the PM board does not supply power to the + and - pins of **FMU PWM OUT** and **I/O PWM OUT**.

If using a plane or rover, the **FMU PWM-OUT** will need to be separately powered in order to drive servos for rudders, elevons etc. This can be done by connecting the 8 pin power (+) rail of the **FMU PWM-OUT** to a voltage regulator (for example, a BEC equipped ESC or a standalone 5V BEC or a 2S LiPo battery).

:::info
The power rail voltage must be appropriate for the servo being used!
:::

| PIN & Connector | Функція                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| I/O PWM Out                         | Підключіть сигнальні та земельні проводи двигуна тут.             |
| FMU PWM Out                         | Підключіть сигнальні, позитивні та GND-проводи сервоприводу сюди. |

:::info
**MAIN** outputs in PX4 firmware map to **I/O PWM OUT** port of _Pixhawk 6X_ whereas **AUX outputs** map to **FMU PWM OUT** of _Pixhawk 6X_.
For example, **MAIN1** maps to IO_CH1 pin of **I/O PWM OUT** and **AUX1** maps to FMU_CH1 pin of **FMU PWM OUT**.
:::

The pinout of _Pixhawk 6X_’s power ports is shown below. Роз'єми живлення приймають цифровий сигнал I2C від модуля живлення PM02D для даних про напругу та силу струму. Лінії VCC повинні пропонувати принаймні 3A безперервного струму і за замовчуванням повинні мати напругу 5,2 В. Нижчий напруга 5V все ще прийнятний, але не рекомендується.

| Pin                         | Сигнал | Вольтаж               |
| --------------------------- | ------ | --------------------- |
| 1(red)   | VCC    | +5V                   |
| 2(black) | VCC    | +5V                   |
| 3(black) | SCL    | +3.3V |
| 4(black) | SDA    | +3.3V |
| 5(black) | GND    | GND                   |
| 6(black) | GND    | GND                   |

## Радіоуправління

A remote control (RC) radio system is required if you want to _manually_ control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then _bind_ them so that they communicate (read the instructions that come with your specific transmitter/receiver).

- Spektrum/DSM receivers connect to the **DSM/SBUS RC** input.
- PPM or SBUS receivers connect to the **RC IN** input port.

PPM and PWM receivers that have an _individual wire for each channel_ must connect to the **RC IN** port _via a PPM encoder_ [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).

## Телеметричні радіостанції (Опціонально)

[Telemetry radios](../telemetry/index.md) may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The vehicle-based radio should be connected to the **TELEM1** port as shown below (if connected to this port, no further configuration is required).
Інша радіостанція підключається до вашого комп'ютера або мобільного пристрою наземної станції (зазвичай за допомогою USB).

Radios are also available for purchase on [Holybro's website](https://holybro.com/collections/telemetry-radios) .

## SD-карта (Опціонально)

SD cards are highly recommended as they are needed to [log and analyse flight details](../getting_started/flight_reporting.md), to run missions, and to use UAVCAN-bus hardware.
Insert the card (included in Pixhawk 6X) into _Pixhawk 6X_ as shown below.

<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_sd_slot.jpg" width="420px" title="Pixhawk5x standard set" />

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd-cards-removable-memory).
:::

## Двигуни

Motors/servos are connected to the **I/O PWM OUT** (**MAIN**) and **FMU PWM OUT** (**AUX**) ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

:::info
Цей довідник містить зіставлення портів виводу до моторів/сервоприводів для всіх підтримуваних повітряних та наземних шасі (якщо ваше шасі не вказане в довіднику, то використовуйте "загальний" планер відповідного типу).
:::

:::warning
Відображення не є однорідним для всіх конструкцій (наприклад, ви не можете покладатися на те, що ручка газу буде на тому ж вихідному порту для всіх повітряних конструкцій). Переконайтеся, що ви використовуєте правильне зіставлення для вашого апарату.
:::

## Інші периферійні пристрої

- [Telemetry Radio Modules](https://holybro.com/collections/telemetry-radios?orderby=date)
- [Rangefinders/Distance sensors](../sensor/rangefinders.md)
- [Holybro Sensors](https://holybro.com/collections/sensors)
- [Holybro GPS & RTK Systems](https://holybro.com/collections/gps-rtk-systems)
- [Power Modules & PDBs](https://holybro.com/collections/power-modules-pdbs)

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/index.md).

## Схема розташування виводів

- [Holybro Pixhawk Baseboard Pinout](https://docs.holybro.com/autopilot/pixhawk-6x/pixhawk-baseboard-pinout)
- [Holybro Pixhawk Mini-Baseboard Pinout](https://docs.holybro.com/autopilot/pixhawk-6x/pixhawk-mini-baseboard-pinout)
- [Holybro Pixhawk Jetson Baseboard](https://docs.holybro.com/autopilot/pixhawk-baseboards/pixhawk-jetson-baseboard)
- [Holybro Pixhawk RPi CM4 Baseboard](https://docs.holybro.com/autopilot/pixhawk-baseboards/pixhawk-rpi-cm4-baseboard)

## Налаштування

General configuration information is covered in: [Autopilot Configuration](../config/index.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. -->

## Подальша інформація

- [Holybro Docs](https://docs.holybro.com/) (Holybro)
- [Pixhawk 6X](../flight_controller/pixhawk6x.md) (PX4 Doc Overview page)
- [Pixhawk 6X Pro](../flight_controller/pixhawk6x_pro.md) (PX4 Doc Overview page)
- [Pixhawk Autopilot FMUv6X Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-012%20Pixhawk%20Autopilot%20v6X%20Standard.pdf).
- [Pixhawk Autopilot Bus Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf).
- [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).
