# 选择飞控

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

PX4 能够在很多飞控板上运行（见 [自驾仪硬件](../flight_controller/README.md)，或 [Github](https://github.com/PX4/Firmware/#supported-hardware) 上的受支持的飞控板列表）。 A subset of the available options are listed below.

## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

The following [Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md) are supported and tested by the PX4 maintenance and test teams (other autopilots are [manufacturer-supported](../flight_controller/autopilot_manufacturer_supported.md)).

| 控制器                                                             | 描述                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CUAV V5 nano](../flight_controller/cuav_v5_nano.md)            | Based on the Pixhawk **FMUv5** design standard and optimized to run PX4 firmware. Small enough to use in 220mm racing drones, but powerful enough for almost any other drone use.                                                                                                                                                                                                     |
| [CUAV V5+](../flight_controller/cuav_v5_plus.md)                | The board is based on the Pixhawk **FMUv5 design standard**, the external interface uses the [Pixhawk standard pinouts](https://pixhawk.org/pixhawk-connector-standard/), and the modular design allows the users to customize their own carrier board. The autopilot is compatible with PX4 FMUv5 firmware and can be used for academic research and commercial systems integration. |
| [Holybro Pixhawk 4](../flight_controller/pixhawk4.md)           | Pixhawk 4 is optimized to run PX4 version 1.7 and is suitable for academic and commercial developers. It features more computing power and 2X the RAM than previous versions, additional ports for better integration and expansion, new sensors and integrated vibration isolation.                                                                                                  |
| [Holybro Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md) | Pixhawk 4 mini is designed for engineers and hobbyists who are looking to tap into the power of *Pixhawk 4* but are working with smaller drones. *Pixhawk 4 Mini* takes the FMU processor and memory resources from the *Pixhawk 4* while eliminating interfaces that are normally unused. This allows the *Pixhawk 4 Mini* to be small enough to fit in a 250mm racer drone.         |
| [Hex Cube Black](../flight_controller/pixhawk-2.md)             | Flexible autopilot intended primarily for manufacturers of commercial systems. It is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly.                                                                                                                                                               |
| [mRo Pixracer](../flight_controller/pixracer.md)                | Very small/light autopilot optimised for FPV racers. It is suited to any small frame that requires no more than 6 PWM outputs.   
Also consider: [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md).                                                                                                                               |
| [mRo Pixhawk 1](../flight_controller/mro_pixhawk.md)            | Popular *general purpose* flight controller (this is an FMUv3 version of the discontinued 3DR [Pixhawk 1](../flight_controller/pixhawk.md)).                                                                                                                                                                                                                                          |

## 用于计算密集型任务的无人机

These flight controllers (and development platforms) offer on-vehicle "companion computing", enabling computer vision and other computationally intensive tasks.

| 控制器                                                                    | 参数描述                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md) | RaPi can be connected to an autopilot and used as a companion computer. |

## 可运行 PX4 的商业无人机

PX4 is available on many popular commercial drone products, including some that ship with PX4 and others that can be updated with PX4 (allowing you to add mission planning and other PX4 Flight modes to your vehicle).

For more information see [Complete Vehicles](../complete_vehicles/README.md).