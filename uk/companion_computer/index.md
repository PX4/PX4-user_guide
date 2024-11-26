# Супутні комп'ютери

Companion computers ("mission computers"), are separate on-vehicle computers that are connected to the flight controller, and which enable computationally expensive features like [collision prevention](../computer_vision/collision_prevention.md).

На схемі нижче показана можлива архітектура безпілотного транспортного засобу, яка включає в себе контролер польоту і супутній комп'ютер.

![PX4 architecture - FC + Companion Computer](../../assets/diagrams/px4_companion_computer_simple.svg)

<!-- source for drawing: https://docs.google.com/drawings/d/1ZDSyj5djKCEbabgx8K4ESdTeEUizgEt8spUWrMGbHUE/edit?usp=sharing -->

Польотний контролер працює під керуванням PX4 на NuttX і забезпечує основний код польоту та безпеки.
На комп'ютері-компаньйоні зазвичай працює Linux, оскільки це значно краща платформа для розробки "загального" програмного забезпечення.
They are connected using a fast serial or Ethernet link, and typically communicate using the [MAVLink protocol](https://mavlink.io/en/) or uXRCE-DDS.

Communications with the ground stations and the cloud are usually routed via the companion computer (e.g. using the [MAVLink Router](https://github.com/mavlink-router/mavlink-router)).

## Інтегровані плати супутнього компьютера/контролера польоту

The following carrier boards make it easy to integrate Pixhawk flight controllers with a companion computer, significantly easing both hardware and software setup.
The boards support the [Pixhawk Autopilot Bus (PAB)](../flight_controller/pixhawk_autopilot_bus.md) open standard so you can plug in any compliant controller:

- [ARK Jetson PAB Carrier](../companion_computer/ark_jetson_pab_carrier.md)
- [Holybro Pixhawk Jetson Baseboard](../companion_computer/holybro_pixhawk_jetson_baseboard.md)
- [Holybro Pixhawk RPi CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md)

## Керовані інтегровані системи

Наступні інтегровані системи супутній комп'ютер/пілотажний контролер за замовчуванням використовують керовані/кастомізовані версії програмного забезпечення пілотажного контролера та супутнього комп'ютера.
Вони перераховані тут, оскільки можуть бути оновлені "лайтовою" прошивкою PX4 для тестування/швидкої розробки.

- [Auterion Skynode](../companion_computer/auterion_skynode.md)
- [ModalAI VOXL 2](https://docs.modalai.com/voxl-2/)

## Параметри супутнього комп'ютера

PX4 можна використовувати з комп'ютерами, які можна налаштувати для зв’язку через MAVLink або microROS/uXRCE-DDS через послідовний порт (або порт Ethernet, якщо є).
Невеликий набір можливих альтернатив наведено нижче.

Більші приклади високої потужності:

- [ModalAI VOXL 2](https://docs.modalai.com/voxl2-external-flight-controller/)
- [NXP NavQPlus](https://nxp.gitbook.io/navqplus/user-contributed-content/ros2/microdds)
- [Nvidia Jetson TX2](https://developer.nvidia.com/embedded/jetson-tx2)

* [Intel NUC](https://www.intel.com/content/www/us/en/products/details/nuc.html)
* [Gigabyte Brix](https://www.gigabyte.com/Mini-PcBarebone/BRIX)

Нижче наведено невелику підгрупу можливих альтернатив:

- [Raspberry Pi](../companion_computer/pixhawk_rpi.md)

:::info
The choice of computer will depend on the usual tradeoffs: cost, weight, power consumption, ease of setup, and computational resources required.
:::

## Програмне забезпечення супутнього комп'ютера

На супутньому комп'ютері має бути встановлене програмне забезпечення, яке зв'язується з диспетчером польоту і спрямовує трафік на наземні станції та в хмару.

#### Програми для дронів

API та SDK для дронів дозволяють писати програмне забезпечення, яке може керувати PX4.
Серед популярних альтернатив:

- [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) - libraries in various programming languages to interface with MAVLink systems such as drones, cameras or ground systems.
- [ROS 2](../ros2/index.md) to communicate to ROS 2 nodes (may also be used).
- [ROS 1 and MAVROS](../ros/mavros_installation.md)

MAVSDK, як правило, є простішим у вивченні та використанні, в той час як ROS надає більше вбудованого програмного забезпечення для складних задач, таких як комп'ютерний зір.
[Drone APIs and SDKs > What API Should I Use?](../robotics/index.md#what-api-should-i-use) explains the different options in detail.

Ви також можете написати власні бібліотеки MAVLink з нуля:

- [C/C++ example code](https://github.com/mavlink/c_uart_interface_example) shows how to connect custom code
- MAVLink also can also be used with [many other programming languages](https://mavlink.io/en/#mavlink-project-generatorslanguages)

#### Маршрутизатори

Вам знадобиться маршрутизатор, якщо вам потрібен міст MAVLink від апарату до наземної станції або IP-мережі, або якщо вам потрібно кілька з'єднань:

- [MAVLink Router](https://github.com/intel/mavlink-router) (recommended)
- [MAVProxy](https://ardupilot.org/mavproxy/)

## Налаштування Ethernet

Ethernet - рекомендоване з'єднання, якщо воно підтримується вашим польотним контролером.
See [Ethernet Setup](../advanced_config/ethernet_setup.md) for instructions.

## Налаштування для окремих контролерів польоту

У наступних темах пояснюється, як налаштувати комп'ютери-компаньйони для конкретних польотних контролерів, зокрема, коли ви не використовуєте з'єднання Ethernet.

- [Використання комп'ютера-компаньйона з контролерами Pixhawk](../companion_computer/pixhawk_companion.md)

## Додаткова інформація

- [Companion Computer Peripherals](../companion_computer/companion_computer_peripherals.md)
- [PX4 System Architecture > FC and Companion Computer](../concept/px4_systems_architecture.md#fc-and-companion-computer)
