# 选择飞控控制器

在选择飞控板时你应当考虑飞机的物理尺寸限制、想要进行的活动以及必不可少的成本。

PX4 能够在很多飞控板和系统上运行（见 [自驾仪硬件](../flight_controller/README.md)，或 [Github](https://github.com/PX4/Firmware/#supported-hardware) 上的受支持的飞控板列表）。 下面是其中一部分可供你选择的硬件

## Pixhawk 系列

[Pixhawk系列](../flight_controller/pixhawk_series.md) - 在Nuttx OS上运行PX4的开放式硬件飞行控制器。 有许多外形，有针对许多用例和细分市场的版本。

> **Tip** 如果你需要计算机视觉或其他计算密集型任务，那么请考虑将飞控板连接至 [机载计算机](#autopilots-for-computationally-intensive-tasks)。

| 控制器                                                  | 描述                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mRo Pixhawk](../flight_controller/mro_pixhawk.md)   | 流行的通用飞行控制器（这是已停产的 3DR Pixhawk 的略微更新版本）。   
也可以考虑： [HKPilot32](../flight_controller/HKPilot32.md), [Dropix](../flight_controller/dropix.md), [mRobotics-X2.1](../flight_controller/mro_x2.1.md)。                                                                                                   |
| [Pixracer](../flight_controller/pixracer.md)         | 非常小／轻型自驾仪，专为 FPV 竞速而优化。 它适用于任何需要不超过 6 个 PWM 的小型机架。   
也可以考虑：[Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md), [MindRacer](../flight_controller/mindracer.md), [Pixfalcon](../flight_controller/pixfalcon.md)。                                                                                |
| [Pixhawk Mini](../flight_controller/pixhawk_mini.md) | Small *general purpose* autopilot that has been optimised for ease of setup.  
The controller has internal vibration damping and only 8 main outputs (**no AUX ports**), making it much less daunting to install and connect. It is not suitable for vehicles/functions that *require* AUX ports. |
| [Pixhawk 2](../flight_controller/pixhawk-2.md)       | Flexible autopilot intended primarily for manufacturers of commercial systems. It is designed to be used with a domain-specific carrier board in order to reduce the wiring, improve reliability, and ease of assembly.                                                                           |
| [Pixhawk 4](../flight_controller/pixhawk4.md)        | Pixhawk 4 is optimized to run PX4 version 1.7 and is suitable for academic and commercial developers. It features more computing power and 2X the RAM than previous versions, additional ports for better integration and expansion, new sensors and integrated vibration isolation.              |

## Autopilots for computationally intensive tasks

These flight controllers offer on-vehicle "companion computing", enabling computer vision and other computationally intensive tasks.

| 控制器                                                                     | 参数描述                                                                                                                  |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [Qualcomm Snapdragon Flight](../flight_controller/snapdragon_flight.md) | A high-end autopilot computer that runs PX4 on the DSP (on QuRT RTOS). It includes a camera and WiFi.                 |
| [Intel® Aero 到手飞无人机](../flight_controller/intel_aero.md)                | A UAS development platform that integrates a powerful Linux computer, PX4 on NuttX, and a camera in a single package. |
| [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)  | RaPi can be connected to an autopilot and used as a companion computer.                                               |

## Commercial UAVs that can run PX4

PX4 has been ported to a number of popular commercial drone products, as listed below. This allows you to add mission planning and other PX Flight modes to your vehicle.

| 控制器                                                 | 参数描述                                       |
| --------------------------------------------------- | ------------------------------------------ |
| [Crazyflie 2.0](../flight_controller/crazyflie2.md) | A micro quad (27g) created by Bitcraze AB. |
| [Parrot Bebop](../flight_controller/bebop.md)       | A popular lightweight flying camera.       |