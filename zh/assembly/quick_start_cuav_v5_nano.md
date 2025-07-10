---
canonicalUrl: https://docs.px4.io/main/zh/assembly/quick_start_cuav_v5_nano
---

# 雷迅CUAV V5 nano飞控接线快速入门

:::warning PX4 没有制造这款（或任何一款）飞控。 若需要硬件支持或咨询合规问题，请联系 [制造商](https://store.cuav.net/)。
:::

本快速入门指南介绍了如何为 [CUAV V5 nano](../flight_controller/cuav_v5_nano.md) 飞控供电以及如何连接其最主要的外部设备。

![Nano Hero Image](../../assets/flight_controller/cuav_v5_nano/v5_nano_01.png)

## 接线图概述

下图展示了如何连接最重要的传感器和外围设备（电机和伺服舵机输出除外）。 我们将在下面各节中介绍它们的细节。

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_02.png)

| 主要接口           | 功能                                                                                  |
|:-------------- |:----------------------------------------------------------------------------------- |
| 电源             | 连接电源模块；提供能量、模拟电压和电流测量。                                                              |
| PM2            | [不要与 PX4 一起使用 ](../flight_controller/cuav_v5_nano.md#compatibility_pm2)             |
| TF CARD        | 用于日志存储的SD卡（随卡提供）                                                                    |
| M1~M8          | PWM 输出接口。 可以使用它控制电机或舵机。                                                             |
| A1~A3          | 捕获引脚（目前 PX4 上不支持）                                                                   |
| nARMED         | 表示 FMU 处于待命状态。 低电平时表示激活（待命时是低电平）。                                                   |
| DSU7           | 用于 FMU 调试，读取调试信息。                                                                   |
| I2C2/I2C3/I2C4 | 连接I2C总线设备；比如外部的罗盘。                                                                  |
| CAN1/CAN2      | 用于连接 UAVCAN 设备，比如 CAN GPS。                                                          |
| TYPE-C(USB)    | 连接到计算机，以便在飞控和计算机之间进行通信，例如加载固件。                                                      |
| GPS&SAFETY     | 连接到 Neo GPS，其中包括GPS、安全开关、蜂鸣器接口。                                                     |
| TELEM1/TELEM2  | 连接到数传电台                                                                             |
| DSM/SBUS/RSSI  | 包含DSM、SBUS、RSSI信号输入接口；DSM接口可以连接DSM卫星接收机，SBUS接口可以连接SBUS总线的遥控器接收机，RSSI连接RSSI信号强度回传模块。 |


:::note
For more interface information, please read [V5 nano Manual](http://manual.cuav.net/V5-nano.pdf).
:::

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_03.png)

GPS /罗盘模块应安装在机架上，尽可能远离其他电子设备，方向标记朝向机体前方（ Neo GPS 方向箭头与飞行控制箭头方向相同）。 使用电缆连接到飞控的 GPS 接口。

## GPS + 罗盘 + 安全开关 + LED

The recommended GPS module is the *Neo v2 GPS*, which contains GPS, compass, safety switch, buzzer, LED status light.

:::note
Other GPS modules may not work (see [this compatibility issue](../flight_controller/cuav_v5_nano.md#compatibility_gps)).
:::

The GPS/Compass module should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (Neo GPS arrow is in the same direction as the flight control arrow). Connect to the flight control GPS interface using a cable.

:::note
If you use CAN GPS, please use the cable to connect to the flight control CAN interface.
:::

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_04.png)

## 安全开关

下图显示了您如何访问远程接收机 (请在工具包中找到 SBUS 电缆)。

If you are flying without the GPS you must attach the switch directly to the `GPS1` port in order to be able to arm the vehicle and fly (If you use the old 6-pin GPS, please read the definition of the bottom interface to change the line).

## 蜂鸣器

If you do not use the recommended *Neo v2 GPS* the buzzer may not work.

## 遥控器

v5 nano</em>套件包括了支持 2~14S 锂聚合物电池的 *HV\\u PM* 模块。 将 *HW\\u PM* 模块的6针连接器连接到飞控的`电源`接口。

The figure below shows how you can access your remote receiver (please find the S.Bus cable in the kit)

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_05.png)

## Spektrum 卫星接收器

通信频道是通过数传无线电实现的。 机载的无线数传模块应连接到 **TELEM1** 或者 **TELEM2** 端口（如果连接到这些端口，则无需进一步配置）。

## 电源

The *v5 nano* kit includes the *HV\_PM* module, which supports 2~14S LiPo batteries. Connect the 6pin connector of the *HW\_PM* module to the flight control `Power` interface.

:::warning
The supplied power module is unfused. Power **must** be turned off while connecting peripherals.
:::

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_06.png)

:::note
The power module is not a power source for peripherals connected to the PWM outputs. If you're connecting servos/actuators you will need to separately power them using a BEC.
:::

## 数传系统（可选）

A telemetry system allows you to communicate with, monitor, and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The communication channel is via Telemetry Radios. The vehicle-based radio should be connected to the **TELEM1** or **TELEM2** port (if connected to these ports, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually via USB).

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_07.png)

<span id="sd_card"></span>

## SD 卡

An [SD card](../getting_started/px4_basic_concepts.md#sd_cards) is inserted in the factory (you do not need to do anything).

## 电机

Motors/servos are connected to the MAIN ports in the order specified for your vehicle in the [Airframes Reference](../airframes/airframe_reference.md).

![quickstart](../../assets/flight_controller/cuav_v5_nano/connection/v5_nano_quickstart_06.png)

## 针脚定义

![V5 nano pinouts](../../assets/flight_controller/cuav_v5_nano/v5_nano_pinouts.png)

## 更多信息

- [Airframe buildlog using CUAV v5 nano on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5nano.md)
- [CUAV V5 nano](../flight_controller/cuav_v5_nano.md)
- [V5 nano manual](http://manual.cuav.net/V5-nano.pdf) (CUAV)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
- [CUAV Github](https://github.com/cuav) (CUAV)