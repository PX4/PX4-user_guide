# Супутні комп'ютери

Супутні комп'ютери ("комп'ютери місії") - це окремі бортові комп'ютери, які під'єднані до контролера польоту, і які забезпечують такі дорогі в обчислювальному плані функції, як [обхід об'єктів](../computer_vision/obstacle_avoidance.md) і [запобігання зіткненням](../computer_vision/collision_prevention.md).

На схемі нижче показана можлива архітектура безпілотного транспортного засобу, яка включає в себе контролер польоту і супутній комп'ютер.

![PX4 architecture - FC + Companion Computer](../../assets/diagrams/px4_companion_computer_simple.svg)

<!-- source for drawing: https://docs.google.com/drawings/d/1ZDSyj5djKCEbabgx8K4ESdTeEUizgEt8spUWrMGbHUE/edit?usp=sharing -->

Польотний контролер працює під керуванням PX4 на NuttX і забезпечує основний код польоту та безпеки. На комп'ютері-компаньйоні зазвичай працює Linux, оскільки це значно краща платформа для розробки "загального" програмного забезпечення. Вони підключаються за допомогою швидкого послідовного або Ethernet-з'єднання і зазвичай взаємодіють за допомогою протоколу [MAVLink](https://mavlink.io/en/) або uXRCE-DDS.

Зв'язок з наземними станціями і хмарою зазвичай маршрутизується через супутній комп'ютер (наприклад, за допомогою [MAVLink Router](https://github.com/mavlink-router/mavlink-router)).

## Інтегровані плати супутнього компьютера/контролера польоту

Плати контролерів, які постачаються з попередньо інтегрованим комп'ютером-компаньйоном і польотним контролером, можуть значно полегшити як програмне, так і апаратне налаштування. У деяких випадках плати налаштовані так, щоб можна було легко замінити контролер польоту та/або деталі супутнього комп'ютера.

Відомо, що наступні плати забезпечують хорошу інтеграцію з PX4:

- [Holybro Pixhawk RPI CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md)

## Керовані інтегровані системи

Наступні інтегровані системи супутній комп'ютер/пілотажний контролер за замовчуванням використовують керовані/кастомізовані версії програмного забезпечення пілотажного контролера та супутнього комп'ютера. Вони перераховані тут, оскільки можуть бути оновлені "лайтовою" прошивкою PX4 для тестування/швидкої розробки.

- [Auterion Skynode](../companion_computer/auterion_skynode.md)

## Companion Computer Options

PX4 can be used with computers that can be configured to communicate via MAVLink or microROS/uXRCE-DDS over over a serial port (or Ethernet port, if present).

A small subset of possible alternatives are listed below:

- Raspberry Pi
- Odroid
- Tegra K1

:::note
The choice of computer will depend on the usual tradeoffs: cost, weight, power consumption, ease of setup, and computational resources required.
:::

## Companion Computer Software

The companion computer needs to run software that communicates with the flight controller, and which routes traffic to ground stations and the cloud.

#### Drone Apps

Drone APIs and SDKs allow you to write software that can control PX4. Popular alternatives include:

- [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) - libraries in various programming languages to interface with MAVLink systems such as drones, cameras or ground systems.
- [ROS 2](../ros/ros2.md) to communicate to ROS 2 nodes (may also be used).
- [ROS 1 and MAVROS](../ros/mavros_installation.md)

MAVSDK is generally easier to learn and use, while ROS provides more pre-written software for advanced cases like computer vision. [Drone APIs and SDKs > What API Should I Use?](../robotics/README.md#what-api-should-i-use) explains the different options in detail.

You can also write your own custom MAVLink libraries from scratch:

- [C/C++ example code](https://github.com/mavlink/c_uart_interface_example) shows how to connect custom code
- MAVLink also can also be used with [many other programming languages](https://mavlink.io/en/#mavlink-project-generatorslanguages)

#### Routers

You will need a router if you need to bridge MAVLink from the vehicle to a ground station or IP network, or if you need multiple connections:

- [MAVLink Router](https://github.com/intel/mavlink-router) (recommended)
- [MAVProxy](https://ardupilot.org/mavproxy/)

## Ethernet Setup

Ethernet is the recommended connection, if supported by your flight controller. See [Ethernet Setup](../advanced_config/ethernet_setup.md) for instructions.

## Flight Controller Specific Setup

The following topics explain how to set up companion computers for specific flight controllers, in particular when you are not using an Ethernet connection.

- [Using a Companion Computer with Pixhawk Controllers](../companion_computer/pixhawk_companion.md)

## Additional Information

- [Companion Computer Peripherals](../companion_computer/companion_computer_peripherals.md)
- [PX4 System Architecture > FC and Companion Computer](../concept/px4_systems_architecture.md#fc-and-companion-computer)
