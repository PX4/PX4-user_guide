# Flight Controller Selection

You should select a board that suits the physical constraints of your vehicle, the activities you wish to perform, and of course cost.

PX4 can run on many flight controller boards (see [Autopilot Hardware](../flight_controller/README.md), or the list of supported boards [here on Github](https://github.com/PX4/Firmware/#supported-hardware)). A *small subset* of the available options are listed below.

## Pixhawk Series

[Pixhawk Series](../flight_controller/pixhawk_series.md) open-hardware flight controllers run PX4 on NuttX OS. With many form factors, there are versions targeted towards many use cases and market segments.

> **Tip** We recommend you use Pixhawk boards that can run firmware FMUv3 and later (may require a [bootloader update](../config/firmware.md#bootloader)).

| Controller                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CUAV V5 nano](../flight_controller/cuav_v5_nano.md) | Based on the Pixhawk **FMUv5** design standard and optimized to run PX4 firmware. Small enough to use in 220mm racing drones, but powerful enough for almost any other drone use.                                                                                                                                                                                                                                                                  |
| [CUAV V5+](../flight_controller/cuav_v5_plus.md)     | The board is based on the Pixhawk **FMUv5 design standard**, the external interface uses the [Pixhawk standard pinouts](https://pixhawk.org/pixhawk-connector-standard/), and the modular design allows the users to customize their own carrier board. The autopilot is compatible [PX4](http://px4-travis.s3.amazonaws.com/Firmware/master/px4fmu-v5_default.px4) firmware.can be used for academic research and commercial systems integration. |
| [Pixhawk 4](../flight_controller/pixhawk4.md)        | Pixhawk 4 is optimized to run PX4 version 1.7 and is suitable for academic and commercial developers. It features more computing power and 2X the RAM than previous versions, additional ports for better integration and expansion, new sensors and integrated vibration isolation.                                                                                                                                                               |
| [Pixhawk 2/Cube](../flight_controller/pixhawk-2.md)  | Flexible autopilot intended primarily for manufacturers of commercial systems. It is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly.                                                                                                                                                                                                                            |
| [Pixracer](../flight_controller/pixracer.md)         | Very small/light autopilot optimised for FPV racers. It is suited to any small frame that requires no more than 6 PWM outputs.   
Also consider: [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md).                                                                                                                                                                                            |
| [mRo Pixhawk](../flight_controller/mro_pixhawk.md)   | Popular *general purpose* flight controller (this is an FMUv3 version of the discontinued 3DR [Pixhawk 1](../flight_controller/pixhawk.md)).                                                                                                                                                                                                                                                                                                       |

## Autopilots for Computationally Intensive Tasks

These flight controllers (and development platforms) offer on-vehicle "companion computing", enabling computer vision and other computationally intensive tasks.

| Controller                                                              | Description                                                                                           |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md) | A high-end autopilot computer that runs PX4 on the DSP (on QuRT RTOS). It includes a camera and WiFi. |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)  | RaPi can be connected to an autopilot and used as a companion computer.                               |

## Commercial UAVs that can run PX4

PX4 is available on many popular commercial drone products, including some that ship with PX4 and others that can be updated with PX4 (allowing you to add mission planning and other PX4 Flight modes to your vehicle).

For more information see [Complete Vehicles](../complete_vehicles/README.md).