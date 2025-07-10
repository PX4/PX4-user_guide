---
canonicalUrl: https://docs.px4.io/main/zh/flight_controller/pixhawk_series
---

# Pixhawk 系列

[Pixhawk<sup>&reg;</sup>](https://pixhawk.org/) is an independent open-hardware project providing readily-available, low-cost, and high-end, *autopilot hardware designs* to the academic, hobby and industrial communities.

Pixhawk is the reference hardware platform for PX4, and runs PX4 on the [NuttX](https://nuttx.apache.org/) OS.

Manufacturers have created many different boards based on the open designs, with form factors that are optimised for applications from cargo carrying though to first person view (FPV) racers.

:::tip
For computationally intensive tasks (e.g. computer vision) you will need a separate companion computer (e.g. [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)) or a platform with an integrated companion solution.
:::

## Key Benefits

Key benefits of using a *Pixhawk series* controller include:
* Software support - as PX4 reference hardware these are our best-maintained boards.
* Flexibility in terms of hardware peripherals that can be attached.
* High quality.
* Highly customizable in terms of form factor.
* Widely-used and thus well-tested/stable.
* Automated update of latest firmware via *QGroundControl* (end-user friendly).


<span id="recommended"></span>
## 支持的飞控板

The PX4 Project uses [Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md) as reference hardware. These are the controllers that are fully compatible with the Pixhawk standard (including use of trademarks) and that are still being manufactured.

:::note
The PX4 maintenance and test teams maintain and support these standard boards.
:::

The list of boards supported by the PX4 project is reproduced below:
* [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md) (FMUv5X)
* [Holybro Pixhawk 4](../flight_controller/pixhawk4.md) (FMUv5)
* [Holybro Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) (FMUv5)
* [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md) (FMUv4)
* [mRo Pixracer](../flight_controller/pixracer.md)  (FMUv4)
* [CUAV Pixhack v3](../flight_controller/pixhack_v3.md) (FMUv3)
* [Hex Cube Black](../flight_controller/pixhawk-2.md) (FMUv3)
* [mRo Pixhawk](../flight_controller/mro_pixhawk.md) (FMUv2)
* [Holybro pix32](../flight_controller/holybro_pix32.md) (FMUv2)
* [Holybro Pixhawk Mini](../flight_controller/pixhawk_mini.md) (FMUv2)

Pixhawk-like boards that are not fully compliant with the specification may be [manufacturer-supported](../flight_controller/autopilot_manufacturer_supported.md), [experimental/discontinued](../flight_controller/autopilot_experimental.md), or unsupported.

The rest of this topic explains a bit more about the Pixhawk series, but is not required reading.

## Background

The [Pixhawk project](https://pixhawk.org/) creates open hardware designs in the form of schematics, which define a set of components (CPU, sensors, etc.) and their connections/pin mappings.

Manufacturers are encouraged to take the [open designs](https://github.com/pixhawk/Hardware) and create products that are best suited to a particular market or use case (the physical layout/form factor not part of the open specification). Boards based on the same design are binary compatible.

:::note
While a physical connector standard is not mandated, newer products generally follow the [Pixhawk Connector Standard](https://pixhawk.org/pixhawk-connector-standard/).
:::

The project also creates reference autopilot boards based on the open designs, and shares them under the same [licence](#licensing-and-trademarks).

<span id="fmu_versions"></span>
### FMU Versions

The Pixhawk project has created a number of different open designs/schematics. All boards based on a design should be binary compatible (run the same firmware).

Each design is named using the designation: FMUvX (e.g.: FMUv1, FMUv2, FMUv3, FMUv4, etc.). Higher FMU numbers indicate that the board is more recent, but may not indicate increased capability (versions can be almost identical - differing only in connector wiring).

PX4 *users* generally do not need to know very much about FMU versions:
  - *QGroundControl* automatically downloads the correct firmware for a connected autopilot (based on its FMU version "under the hood").
  - Choosing a controller is usually based on physical constraints/form factor rather than FMU version.

:::note
The exception is that if you're using FMUv2 firmware it is [limited to 1MB of flash](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata). In order to fit PX4 into this limited space, many modules are disabled by default. You may find that some [parameters are missing](../advanced_config/parameters.md#missing) and that some hardware does not work "out of the box".
:::

PX4 *developers* need to know the FMU version of their board, as this is required to build custom hardware.

At very high level, the main differences are:

- **FMUv2:** Single board with STM32427VI processor ([Pixhawk 1 (Discontinued)](../flight_controller/pixhawk.md), [pix32](../flight_controller/holybro_pix32.md), [Pixfalcon](../flight_controller/pixfalcon.md), [Drotek DroPix](../flight_controller/dropix.md))
- **FMUv3:** Identical to FMUv2, but usable flash doubled to 2MB ([Hex Cube Black](../flight_controller/pixhawk-2.md),[CUAV Pixhack v3](../flight_controller/pixhack_v3.md),[mRo Pixhawk](../flight_controller/mro_pixhawk.md), [Pixhawk Mini (Discontinued)](../flight_controller/pixhawk_mini.md))
- **FMUv4:** Increased RAM. Faster CPU. More serial ports. No IO processor ([Pixracer](../flight_controller/pixracer.md))
- **FMUv4-PRO:** Slightly increased RAM. More serial ports. IO processor ([Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md))
- **FMUv5:** New processor (F7). Much faster. More RAM. More CAN buses. Much more configurable. ([Pixhawk 4](../flight_controller/pixhawk4.md),[CUAV v5](../flight_controller/cuav_v5.md),[CUAV V5+](../flight_controller/cuav_v5_plus.md),[CUAV V5 nano](../flight_controller/cuav_v5_nano.md))
- **FMUv5X:** New processor (F7). Much faster, Modular design. More reliable. More Redundancy. More RAM. More CAN buses. Much more configurable & customizable .([Pixhawk 5X](../flight_controller/pixhawk5x.md), Skynode)

<span id="licensing-and-trademarks"></span>
### Licensing and Trademarks

Pixhawk project schematics and reference designs are licensed under [CC BY-SA 3](https://creativecommons.org/licenses/by-sa/3.0/legalcode).

The license allows you to use, sell, share, modify and build on the files in almost any way you like - provided that you give credit/attribution, and that you share any changes that you make under the same open source license (see the [human readable version of the license](https://creativecommons.org/licenses/by-sa/3.0/) for a concise summary of the rights and obligations).

:::note
Boards that are *derived directly* from Pixhawk project schematic files (or reference boards) must be open sourced. They can't be commercially licensed as proprietary products.
:::

Manufacturers can create (compatible) *fully independent products* by first generating fresh schematic files that have the same pin mapping/components as the FMU designs. Products that are based on independently created schematics are considered original works, and can be licensed as required.

Product names/brands can also be trademarked. Trademarked names may not be used without the permission of the owner.

:::tip
*Pixhawk* is a trademark, and cannot be used in product names without permission.
:::

## 附加信息

### LEDs

All *Pixhawk-series* flight controllers support:
* A user facing RGB *UI LED* to indicate the current *readiness to fly* status of the vehicle. This is typically a superbright I2C peripheral, which may or may not be mounted on the board (i.e. FMUv4 does not have one on board and typically uses an LED mounted on the GPS).
* Three *Status LED*s that provide lower level power status, bootloader mode and activity, and error information.

To interpret the LEDs see: [LED Meanings](../getting_started/led_meanings.md).
