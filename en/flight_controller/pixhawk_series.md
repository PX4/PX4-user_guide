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

> **Note** This list is not exhaustive! In particular it does not include devices that have used hardware designs without complying with the open source license, or cloned product designs without licensing them.

<!-- 

<a href="pixhawk_mini.md" title="Pixhawk Mini"><img src="../../images/pixhawk_mini_hero.jpg" width="180px" /></a> <a href="pixracer.md" title="Pixracer"><img src="../../images/pixracer_wifi.jpg" width="180px" /></a> <a href="pixhawk-2.md" title="Pixhawk 2"><img src="../../images/pixhawk2_cube_hero.jpg" width="180px" /></a> <a href="mro_pixhawk.md" title="Pixhawk 1/mRo Pixhawk"><img src="../../images/flight_controller/mro_pixhawk.jpg" width="180px" /></a> <a href="pixfalcon.md" title="Pixfalcon"><img src="../../images/flight_controller/pixfalcon_flight_controller_high.jpg" width="180px" /></a> <a href="HKPilot32.md" title="HKPilot32"><img src="../../images/flight_controller/dropix/dropix_flight_controller_hero.jpg" width="180px" /></a> <a href="dropix.md" title="Dropix"><img src="../../images/hkpilot32_flight_controller.jpg" width="180px" /></a> <a href="mindpx.md" title="MindPX"><img src="../../assets/hardware/hardware-mindpx.png" width="180px" /></a> 

-->

The remainder topic explains a bit more about the series, but is not required reading.

## Background

The [Pixhawk project](https://pixhawk.org/) creates open designs, in the form of schematics that define the connections, wiring, CPU, sensors, etc. The project has created a number of different open designs. 

Manufacturers are encouraged to take the open designs and create products that are best suited to a particular market or use case (the physical layout/form factor not part of the open specification).  Boards based on the same design are binary compatible.

> **Note** While a physical connector standard is not mandated, newer products generally follow the [Dronecode Autopilot Connector Standard](https://wiki.dronecode.org/workgroup/connectors/start)).

Product schematics must be open-sourced under the terms of the open-hardware license, but remain the property of the owner (clones should not be created without permission). Similarly, the brand name of a product may be trademarked and should not be used without permission of the owner.

> **Note** Pixhawk is a trademarked "brand" name.


## FMU Versions

Open design versions are named using the designation: FMUvX (e.g.: FMUv1, FMUv2, FMUv3, FMUv4, etc.). 

PX4 *users* generally do not need to know very much about FMU versions:
- *QGroundControl* automatically downloads the correct firmware for a connected autopilot (based on its FMU version "under the hood").
- FMU versions are of limited use when choosing an autopilot. Different versions can be almost identical (differ only in connector wiring).
- Choosing a controller is usually more impacted physical constraints/form factor than FMU version. 

> **Tip** PX4 developers need to know the FMU version of their board, as this is required to build custom hardware. 

At very high level, the main differences are:

- **FMUv2:** Single board with STM32427VI processor ([Pixhawk 1](../flight_controller/pixhawk.md) [HKPilot32](../flight_controller/HKPilot32.md), [Pixfalcon](../flight_controller/pixfalcon.md), [MindPX](../flight_controller/mindpx.md), [DroPix](../flight_controller/dropix.md))
- **FMUv3:** Addressable ram doubled to 2MB from FMUv2 ([Pixhawk 2](../flight_controller/pixhawk-2.md),[mRo Pixhawk](../flight_controller/mro_pixhawk.md))
- **FMUv4:** Slightly increased RAM ([Pixhawk Mini](../flight_controller/pixhawk_mini.md), [Pixracer](../flight_controller/pixracer.md))
- **FMUv4-PRO:** Slightly increased RAM and Flash memory ([Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md))
- **FMUv5:** New processor (F7). Much faster. More RAM. More CAN busses. Much more configurable.

