# Pixhawk Series

[Pixhawk<sup>&reg;</sup>](https://pixhawk.org/) is an independent open-hardware project providing readily-available, low-cost, and high-end, _autopilot hardware designs_ to the academic, hobby and industrial communities.

Pixhawk є посиланням на апаратну платформу для PX4, і працює з PX4 на ОС [NuttX](https://nuttx.apache.org/).

Виробники створили багато різних плат на основі відкритих дизайнів, з форм-факторами, які оптимізовані для застосувань від перевезення вантажів до гоночних змагань від першої особи (FPV).

:::tip
Для обчислювально інтенсивних завдань (наприклад, комп'ютерне зору) вам знадобиться окремий супутній комп'ютер (наприклад, [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)) або платформа з інтегрованим супутнім рішенням.
:::

## Ключові переваги

Ключові переваги використання контролера _серії Pixhawk_ включають:

- Підтримка програмного забезпечення - як офіційне апаратне забезпечення PX4, це наші найкраще підтримувані плати.
- Flexibility in terms of hardware peripherals that can be attached.
- High quality.
- Highly customizable in terms of form factor.
- Widely-used and thus well-tested/stable.
- Automated update of latest firmware via _QGroundControl_ (end-user friendly).

## Підтримувані плати

Проект PX4 використовує [Стандартні автопілоти Pixhawk](../flight_controller/autopilot_pixhawk_standard.md) як посилання на апаратне забезпечення. Це контролери, які повністю сумісні зі стандартом Pixhawk (включаючи використання товарних знаків) і які все ще виробляються.

:::info
Команди з обслуговування та тестування PX4 підтримують ці стандартні плати.
:::

Плати, схожі з Pixhawk, які не повністю відповідають специфікації, можуть бути [підтримуваними виробником](../flight_controller/autopilot_manufacturer_supported.md), [експериментальними/припиненими](../flight_controller/autopilot_experimental.md) або непідтримуваними.

Решта цієї теми пояснює трохи більше про серію Pixhawk, але її не обов'язково читати.

## Background

Проект [Pixhawk](https://pixhawk.org/) створює відкриті апаратні засоби у формі схем, які визначають набір компонентів (процесор, сенсори і т. д.) та їх з'єднання/відображення контактів.

Виробників закликають брати [відкриті дизайни](https://github.com/pixhawk/Hardware) та створювати продукти, які найкраще підходять для конкретного ринку або випадку використання (фізична структура / форм-фактор не є частиною відкритих специфікацій). Плати на основі того ж дизайну сумісні за принципом двійкової сумісності.

:::info Хоча стандарт фізичного з'єднання не є обов'язковим, новіші продукти зазвичай використовують [Стандарт роз'єму Pixhawk](https://pixhawk.org/pixhawk-connector-standard/).
:::

Проект також створює опорні автопілотні плати на основі відкритих дизайнів та ділиться ними за тією ж [ліцензією](#licensing-and-trademarks).

<a id="fmu_versions"></a>

### FMU Versions

The Pixhawk project has created a number of different open designs/schematics. All boards based on a design should be binary compatible (run the same firmware).

Each design is named using the designation: FMUvX (e.g.: FMUv1, FMUv2, FMUv3, FMUv4, etc.). Вищі номери FMU вказують на те, що плата є більш сучасною, але це може не означати збільшення функціональності (версії можуть бути майже ідентичними - відрізняються лише за підключенням проводів).

PX4 _users_ generally do not need to know very much about FMU versions:

- _QGroundControl_ automatically downloads the correct firmware for a connected autopilot (based on its FMU version "under the hood").
- Choosing a controller is usually based on physical constraints/form factor rather than FMU version.

::: info The exception is that if you're using FMUv2 firmware it is [limited to 1MB of flash](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata). In order to fit PX4 into this limited space, many modules are disabled by default. You may find that some [parameters are missing](../advanced_config/parameters.md#missing) and that some hardware does not work "out of the box".
:::

PX4 _developers_ need to know the FMU version of their board, as this is required to build custom hardware.

At very high level, the main differences are:

- **FMUv2:** Single board with STM32427VI processor ([Pixhawk 1 (Discontinued)](../flight_controller/pixhawk.md), [pix32](../flight_controller/holybro_pix32.md), [Pixfalcon](../flight_controller/pixfalcon.md), [Drotek DroPix](../flight_controller/dropix.md))
- **FMUv3:** Identical to FMUv2, but usable flash doubled to 2MB ([Hex Cube Black](../flight_controller/pixhawk-2.md),[CUAV Pixhack v3](../flight_controller/pixhack_v3.md),[mRo Pixhawk](../flight_controller/mro_pixhawk.md), [Pixhawk Mini (Discontinued)](../flight_controller/pixhawk_mini.md))
- **FMUv4:** Increased RAM. Faster CPU. More serial ports. No IO processor ([Pixracer](../flight_controller/pixracer.md))
- **FMUv4-PRO:** Slightly increased RAM. More serial ports. IO processor ([Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md))
- **FMUv5:** New processor (F7). Much faster. More RAM. More CAN buses. Much more configurable. ([Pixhawk 4](../flight_controller/pixhawk4.md),[CUAV v5](../flight_controller/cuav_v5.md),[CUAV V5+](../flight_controller/cuav_v5_plus.md),[CUAV V5 nano](../flight_controller/cuav_v5_nano.md))
- **FMUv5X:** New processor (F7). Much faster, Modular design. More reliable. More Redundancy. More RAM (1MB). More CAN buses. Much more configurable & customizable. ([Pixhawk 5X](../flight_controller/pixhawk5x.md), Skynode)
- **FMUv6C:** ([Holybro Pixhawk 6C Mini](../flight_controller/pixhawk6c_mini.md), [Holybro Pixhawk 6C](../flight_controller/pixhawk6c.md))
- **FMUv6X:** ([CUAV Pixhawk V6X](../flight_controller/cuav_pixhawk_v6x.md),[Holybro Pixhawk 6X](../flight_controller/pixhawk6x.md))
- **FMUv6X-RT:** Faster MCU core (1GHz) (vs 480Mhz on 6X). More RAM (2Mb). More flash (64Mb) (2Mb on v6X/v5X). ([Holybro Pixhawk 6X-RT](../flight_controller/pixhawk6x-rt.md))

<a id="licensing-and-trademarks"></a>

### Licensing and Trademarks

Pixhawk project schematics and reference designs are licensed under [CC BY-SA 3](https://creativecommons.org/licenses/by-sa/3.0/legalcode).

The license allows you to use, sell, share, modify and build on the files in almost any way you like - provided that you give credit/attribution, and that you share any changes that you make under the same open source license (see the [human readable version of the license](https://creativecommons.org/licenses/by-sa/3.0/) for a concise summary of the rights and obligations).

::: info Boards that are _derived directly_ from Pixhawk project schematic files (or reference boards) must be open sourced. They can't be commercially licensed as proprietary products.
:::

Manufacturers can create (compatible) _fully independent products_ by first generating fresh schematic files that have the same pin mapping/components as the FMU designs. Products that are based on independently created schematics are considered original works, and can be licensed as required.

Product names/brands can also be trademarked. Trademarked names may not be used without the permission of the owner.

:::tip
_Pixhawk_ is a trademark, and cannot be used in product names without permission.
:::

## Additional Information

### LEDs

All _Pixhawk-series_ flight controllers support:

- A user facing RGB _UI LED_ to indicate the current _readiness to fly_ status of the vehicle. This is typically a superbright I2C peripheral, which may or may not be mounted on the board (i.e. FMUv4 does not have one on board and typically uses an LED mounted on the GPS).
- Three *Status LED*s that provide lower level power status, bootloader mode and activity, and error information.

To interpret the LEDs see: [LED Meanings](../getting_started/led_meanings.md).
