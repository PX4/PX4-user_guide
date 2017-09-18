# Pixhawk Series

[Pixhawk](https://pixhawk.org/) is an independent open-hardware project providing readily-available, low-cost, and high-end, *autopilot 
hardware designs* to the academic, hobby and industrial communities. "Pixhawk-series" boards run PX4 on the [NuttX](http://nuttx.org) OS. 

Manufacturers have created many different boards based on the open designs, with form factors that are optimised for applications from cargo carrying though to first person view (FPV) racers.

> **Tip** For computationally intensive tasks (e.g. computer vision) you will need a separate companion computer (e.g. [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)) or a platform with an integrated companion solution (e.g. [Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md), [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md)).

## Recommended boards

The following products in the series are recommended/regularly tested with PX4:

* [mRo Pixhawk](../flight_controller/mro_pixhawk.md)
* [HKPilot32](../flight_controller/HKPilot32.md)
* [Pixfalcon](../flight_controller/pixfalcon.md)
* [DroPix](../flight_controller/dropix.md)
* [Pixracer](../flight_controller/pixracer.md)
* [MindPX](../flight_controller/mindpx.md)
  * [MindRacer](../flight_controller/mindracer.md)
* [Pixhawk 2](../flight_controller/pixhawk-2.md)
* [Pixhawk Mini](../flight_controller/pixhawk_mini.md)
* [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)

> **Note** This list is not exhaustive. It includes popular boards, and boards that have been used by our flight test team!

<!-- 

<a href="pixhawk_mini.md" title="Pixhawk Mini"><img src="../../images/pixhawk_mini_hero.jpg" width="180px" /></a> <a href="pixracer.md" title="Pixracer"><img src="../../images/pixracer_wifi.jpg" width="180px" /></a> <a href="pixhawk-2.md" title="Pixhawk 2"><img src="../../images/pixhawk2_cube_hero.jpg" width="180px" /></a> <a href="mro_pixhawk.md" title="Pixhawk 1/mRo Pixhawk"><img src="../../images/flight_controller/mro_pixhawk.jpg" width="180px" /></a> <a href="pixfalcon.md" title="Pixfalcon"><img src="../../images/flight_controller/pixfalcon_flight_controller_high.jpg" width="180px" /></a> <a href="HKPilot32.md" title="HKPilot32"><img src="../../images/flight_controller/dropix/dropix_flight_controller_hero.jpg" width="180px" /></a> <a href="dropix.md" title="Dropix"><img src="../../images/hkpilot32_flight_controller.jpg" width="180px" /></a> <a href="mindpx.md" title="MindPX"><img src="../../assets/hardware/hardware-mindpx.png" width="180px" /></a> 

-->

The remainder topic explains a bit more about the series, but is not required reading.

## Background

The [Pixhawk project](https://pixhawk.org/) creates open hardware designs in the form of schematics, which define a set of components (CPU, sensors, etc.) and their connections/pin mappings. 

Manufacturers are encouraged to take the [open designs](https://github.com/PX4/Hardware#hardware) and create products that are best suited to a particular market or use case (the physical layout/form factor not part of the open specification). Boards based on the same design are binary compatible.

> **Note** While a physical connector standard is not mandated, newer products generally follow the [Dronecode Autopilot Connector Standard](https://wiki.dronecode.org/workgroup/connectors/start).

The project also creates reference autopilot boards based on the open designs, and shares them under the same [licence](#licensing-and-trademarks).

### FMU Versions

The Pixhawk project has created a number of different open designs/schematics. Each design is named using the designation: FMUvX (e.g.: FMUv1, FMUv2, FMUv3, FMUv4, etc.). 

PX4 *users* generally do not need to know very much about FMU versions:
- *QGroundControl* automatically downloads the correct firmware for a connected autopilot (based on its FMU version "under the hood").
- FMU versions are of limited use when choosing an autopilot. Versions can be almost identical (differing only in connector wiring).
- Choosing a controller is usually based on physical constraints/form factor rather than FMU version. 

> **Tip** PX4 *developers* need to know the FMU version of their board, as this is required to build custom hardware. 

At very high level, the main differences are:

- **FMUv2:** Single board with STM32427VI processor ([Pixhawk 1](../flight_controller/pixhawk.md), [HKPilot32](../flight_controller/HKPilot32.md), [Pixfalcon](../flight_controller/pixfalcon.md), [DroPix](../flight_controller/dropix.md))
- **FMUv3:** Addressable ram doubled to 2MB from FMUv2 ([Pixhawk 2](../flight_controller/pixhawk-2.md),[mRo Pixhawk](../flight_controller/mro_pixhawk.md))
- **FMUv4:** Slightly increased RAM. More serial ports. No IO processor ([Pixhawk Mini](../flight_controller/pixhawk_mini.md), [Pixracer](../flight_controller/pixracer.md), [MindPX](../flight_controller/mindpx.md))
- **FMUv4-PRO:** Slightly increased RAM. More serial ports. IO processor ([Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md))
- **FMUv5:** New processor (F7). Much faster. More RAM. More CAN busses. Much more configurable.

### Licensing and trademarks

Pixhawk project schematics and reference designs are licensed under [CC BY-SA 3](https://creativecommons.org/licenses/by-sa/3.0/legalcode).

The license allows you to use, sell, share, modify and build on the files in almost any way you like - provided that you give credit/attribution, and that you share any changes that you make under the same open source license (see the [human readable version of the license](https://creativecommons.org/licenses/by-sa/3.0/) for a concise summary of the rights and obligations).

> **Note** Boards that are *derived directly* from Pixhawk project schematic files (or reference boards) must be open sourced. They can't be commercially licensed as proprietary products.

Manufacturers can create (compatible) *fully independent products* by first generating fresh schematic files that have the same pin mapping/components as the FMU designs. Products that are based on independently created schematics are considered original works, and can be licensed as required.

Product names/brands can also be trademarked. Trademarked names may not be used without the permission of the owner. 

> **Tip** *Pixhawk* is a trademark, and cannot be used in product names without permission.

