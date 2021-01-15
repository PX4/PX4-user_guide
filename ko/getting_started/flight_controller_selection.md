# 비행 제어기 선택

기체의 물리적인 조건, 비행 목적과 비용에 적합한 하드웨어를 선택해야 합니다.

PX4는 많은 수의 비행 제어기에서 실행가능합니다. [Autopilot Hardware](../flight_controller/README.md)나 [Github의 ](https://github.com/PX4/PX4-Autopilot/#supported-hardware) 지원 보드 목록을 참고하세요. 주요한 목록은 아래와 같습니다.

## 픽스호크 시리즈

[픽스호크 시리즈](../flight_controller/pixhawk_series.md)는 NuttX OS 기반으로 PX4를 실행하는 개방형 하드웨어 비행 제어기입니다. 다양한 폼 팩터를 기반으로 많은 적용 사례가 있으며, 높은 시장 점유율을 자랑합니다.

아래의 [픽스호크 표준 자동조종장치](../flight_controller/autopilot_pixhawk_standard.md)들은 PX를 지원하고 있으며, PX4 지원팀의 테스트를 거친 제품들입니다. 기타 자동조종장치들은 [제조사들의 지원을](../flight_controller/autopilot_manufacturer_supported.md) 받고 있습니다.

| 제어기                                                             | 설명                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Holybro Pixhawk 4](../flight_controller/pixhawk4.md)           | 픽스호크 4는 PX4 버전 1.7을 실행하는데 최적화 되어 있으며 연구와 상업용 개발자들에게 적합합니다. It features more computing power and 2X the RAM than previous versions, additional ports for better integration and expansion, new sensors and integrated vibration isolation.                                                                                                                                     |
| [Holybro Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md) | Pixhawk 4 mini is designed for engineers and hobbyists who are looking to tap into the power of *Pixhawk 4* but are working with smaller drones. *Pixhawk 4 Mini* takes the FMU processor and memory resources from the *Pixhawk 4* while eliminating interfaces that are normally unused. This allows the *Pixhawk 4 Mini* to be small enough to fit in a 250mm racer drone. |
| [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md)    | Based on Pixracer but with some upgrades and additional features.                                                                                                                                                                                                                                                                                                             |
| [mRo Pixracer](../flight_controller/pixracer.md)                | Very small/light autopilot optimised for FPV racers. It is suited to any small frame that requires no more than 6 PWM outputs.   
Also consider: [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md).                                                                                                                       |
| [Hex Cube Black](../flight_controller/pixhawk-2.md)             | Flexible autopilot intended primarily for manufacturers of commercial systems. It is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly.                                                                                                                                                       |
| [CUAV Pixhack v3](../flight_controller/pixhack_v3.md)           | A variant of the SOLO Pixhawk<sup>&reg;</sup> 2 (PH2) controller with significant improvements with respect to the original design, including better interface layout and the addition of vibration damping and a thermostat system.                                                                                                                                          |
| [mRo Pixhawk 1](../flight_controller/mro_pixhawk.md)            | Popular *general purpose* flight controller (this is an FMUv3 version of the discontinued 3DR [Pixhawk 1](../flight_controller/pixhawk.md)).                                                                                                                                                                                                                                  |

## Autopilots for Computationally Intensive Tasks

These flight controllers (and development platforms) offer on-vehicle "companion computing", enabling computer vision and other computationally intensive tasks.

| Controller                                                                 | Description                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)     | RasPi can be connected to an autopilot and used as a companion computer. |
| [Raspberry Pi 2/3/4 PilotPi](../flight_controller/raspberry_pi_pilotpi.md) | Fly your Pi :)                                                           |

## Commercial UAVs that can run PX4

PX4 is available on many popular commercial drone products, including some that ship with PX4 and others that can be updated with PX4 (allowing you to add mission planning and other PX4 Flight modes to your vehicle).

For more information see [Complete Vehicles](../complete_vehicles/README.md).