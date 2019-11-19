# 选择飞控

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

PX4 能够在很多飞控板上运行（见 [自驾仪硬件](../flight_controller/README.md)，或 [Github](https://github.com/PX4/Firmware/#supported-hardware) 上的受支持的飞控板列表）。 A *small subset* of the available options are listed below.

## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

> **Tip** We recommend you use Pixhawk boards that can run firmware FMUv3 and later (may require a [bootloader update](../config/firmware.md#bootloader)).

| 控制器                                                  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CUAV V5 nano](../flight_controller/cuav_v5_nano.md) | Based on the Pixhawk **FMUv5** design standard and optimized to run PX4 firmware. Small enough to use in 220mm racing drones, but powerful enough for almost any other drone use.                                                                                                                                                                                                                                                                  |
| [CUAV V5+](../flight_controller/cuav_v5_plus.md)     | The board is based on the Pixhawk **FMUv5 design standard**, the external interface uses the [Pixhawk standard pinouts](https://pixhawk.org/pixhawk-connector-standard/), and the modular design allows the users to customize their own carrier board. The autopilot is compatible [PX4](http://px4-travis.s3.amazonaws.com/Firmware/master/px4fmu-v5_default.px4) firmware.can be used for academic research and commercial systems integration. |
| [Pixhawk 4](../flight_controller/pixhawk4.md)        | Pixhawk 4 is optimized to run PX4 version 1.7 and is suitable for academic and commercial developers. It features more computing power and 2X the RAM than previous versions, additional ports for better integration and expansion, new sensors and integrated vibration isolation.                                                                                                                                                               |
| [Pixhawk 2/Cube](../flight_controller/pixhawk-2.md)  | 主要针对商业系统制造商的灵活自驾仪。 它被设计为与特定领域的载板同时使用，以减少布线，提高可靠性，和易于装配。                                                                                                                                                                                                                                                                                                                                                                                            |
| [Pixracer](../flight_controller/pixracer.md)         | Very small/light autopilot optimised for FPV racers. It is suited to any small frame that requires no more than 6 PWM outputs.   
Also consider: [Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md).                                                                                                                                                                                            |
| [mRo Pixhawk](../flight_controller/mro_pixhawk.md)   | Popular *general purpose* flight controller (this is an FMUv3 version of the discontinued 3DR [Pixhawk 1](../flight_controller/pixhawk.md)).                                                                                                                                                                                                                                                                                                       |

## 用于计算密集型任务的无人机

这些飞行控制器（和开发平台）提供无人机“同伴计算”，实现计算机视觉和其他计算密集型任务。

| 控制器                                                                     | 参数描述                                                                    |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md) | 在 DSP 上运行 PX4 的高端自驾仪计算机（ QuRT RTOS）。 它包含一个摄像头和 Wifi 。                   |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)  | RaPi can be connected to an autopilot and used as a companion computer. |

## 可运行 PX4 的商业无人机

PX4 适用于许多流行的商用无人机产品，包括 PX4 附带的一些产品以及可以使用 PX4 更新的其他产品（允许您添加任务规划和其他 PX4 飞行模式到您的无人机）。

详情见 [Complete Vehicles](../complete_vehicles/README.md)。