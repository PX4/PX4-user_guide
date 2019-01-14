# 选择飞控控制器

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

PX4 能够在很多飞控板和系统上运行（见 [自驾仪硬件](../flight_controller/README.md)，或 [Github](https://github.com/PX4/Firmware/#supported-hardware) 上的受支持的飞控板列表）。 下面是其中一部分可供你选择的硬件

## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

> **Tip** 如果你需要计算机视觉或其他计算密集型任务，那么请考虑将飞控板连接至 [机载计算机](#autopilots-for-computationally-intensive-tasks)。

| 控制器                                                  | 描述                                                                                                                                                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [mRo Pixhawk](../flight_controller/mro_pixhawk.md)   | 流行的通用飞行控制器（这是已停产的 3DR Pixhawk 的略微更新版本）。   
也可以考虑： [HKPilot32](../flight_controller/HKPilot32.md), [Dropix](../flight_controller/dropix.md), [mRobotics-X2.1](../flight_controller/mro_x2.1.md)。                    |
| [Pixracer](../flight_controller/pixracer.md)         | 非常小／轻型自驾仪，专为 FPV 竞速而优化。 它适用于任何需要不超过 6 个 PWM 的小型机架。   
也可以考虑：[Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md), [Pixfalcon](../flight_controller/pixfalcon.md)。 |
| [Pixhawk Mini](../flight_controller/pixhawk_mini.md) | 小型*通用*自驾仪已针对易于设置进行了优化。  
控制器具有内部减震和仅8个主输出（**没有 AUX 端口**），使其更容易安装和连接。 它不适用于 *需要* AUX 端口的设备／功能。                                                                                                                      |
| [Pixhawk 2](../flight_controller/pixhawk-2.md)       | 主要针对商业系统制造商的灵活自驾仪。 它被设计为与特定领域的载板同时使用，以减少布线，提高可靠性，和易于装配。                                                                                                                                                            |
| [Pixhawk 4](../flight_controller/pixhawk4.md)        | Pixhawk 4 is optimized to run PX4 version 1.7 and is suitable for academic and commercial developers. 与之前版本相比，具有更高的计算能力和 2 倍的 RAM ，额外端口以利于集成和扩展，新的传感器和集成的震动隔离。                                                     |

## 用于计算密集型任务的自驾仪

这些飞行控制器提供机载＂伴随计算＂，可以实现计算机视觉和其它计算密集型任务。

| 控制器                                                                     | 参数描述                                                  |
| ----------------------------------------------------------------------- | ----------------------------------------------------- |
| [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md) | 在 DSP 上运行 PX4 的高端自驾仪计算机（ QuRT RTOS）。 它包含一个摄像头和 Wifi 。 |
| [Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md)    | UAS 开发平台，集成了功能强大的 Linux 计算机，Nuttx 上的 PX4 和单个软件包中的摄像头。 |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)  | 树莓派可以连接到自驾仪并作为记载计算机                                   |

## 可运行 PX4 的商业无人机

PX4 已经被移植到许多流行的商用无人机产品中，如下所列。 This allows you to add mission planning and other PX Flight modes to your vehicle.

| 控制器                                                 | 参数描述                                       |
| --------------------------------------------------- | ------------------------------------------ |
| [Crazyflie 2.0](../flight_controller/crazyflie2.md) | A micro quad (27g) created by Bitcraze AB. |
| [Parrot Bebop](../flight_controller/bebop.md)       | A popular lightweight flying camera.       |