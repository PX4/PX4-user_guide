# 选择飞控

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

PX4 能够在很多飞控板上运行（见 [自驾仪硬件](../flight_controller/README.md)，或 [Github](https://github.com/PX4/Firmware/#supported-hardware) 上的受支持的飞控板列表）。 下文列出了一部分可供选择的飞控。

## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

以下 [Pixhawk 标准自动驾驶仪](../flight_controller/autopilot_pixhawk_standard.md) 由 PX4 维护及测试团队进行支持和测试（其他自动驾驶仪由制造商进行支持）。

| 控制器                                                             | 描述                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Holybro Pixhawk 4](../flight_controller/pixhawk4.md)           | Pixhawk 4 为运行 PX4 1.7 版本进行了优化并且适用于学术研究和商业开发者。 It features more computing power and 2X the RAM than previous versions, additional ports for better integration and expansion, new sensors and integrated vibration isolation.                                                                                                                                                  |
| [Holybro Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md) | Pixhawk 4 mini is designed for engineers and hobbyists who are looking to tap into the power of *Pixhawk 4* but are working with smaller drones. *Pixhawk 4 Mini* takes the FMU processor and memory resources from the *Pixhawk 4* while eliminating interfaces that are normally unused. This allows the *Pixhawk 4 Mini* to be small enough to fit in a 250mm racer drone. |
| [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)    | Based on Pixracer but with some upgrades and additional features.                                                                                                                                                                                                                                                                                                             |
| [mRo Pixracer](../flight_controller/pixracer.md)                | Very small/light autopilot optimised for FPV racers. It is suited to any small frame that requires no more than 6 PWM outputs.   
Also consider: [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md).                                                                                                                       |
| [Hex Cube Black](../flight_controller/pixhawk-2.md)             | Flexible autopilot intended primarily for manufacturers of commercial systems. It is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly.                                                                                                                                                       |
| [CUAV Pixhack v3](../flight_controller/pixhack_v3.md)           | A variant of the SOLO Pixhawk<sup>&reg;</sup> 2 (PH2) controller with significant improvements with respect to the original design, including better interface layout and the addition of vibration damping and a thermostat system.                                                                                                                                          |
| [mRo Pixhawk 1](../flight_controller/mro_pixhawk.md)            | Popular *general purpose* flight controller (this is an FMUv3 version of the discontinued 3DR [Pixhawk 1](../flight_controller/pixhawk.md)).                                                                                                                                                                                                                                  |

## 用于计算密集型任务的无人机

These flight controllers (and development platforms) offer on-vehicle "companion computing", enabling computer vision and other computationally intensive tasks.

| 控制器                                                                    | 参数描述                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md) | RaPi can be connected to an autopilot and used as a companion computer. |

## 可运行 PX4 的商业无人机

PX4 is available on many popular commercial drone products, including some that ship with PX4 and others that can be updated with PX4 (allowing you to add mission planning and other PX4 Flight modes to your vehicle).

For more information see [Complete Vehicles](../complete_vehicles/README.md).