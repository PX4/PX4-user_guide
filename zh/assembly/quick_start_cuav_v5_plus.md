# CUAV V5+ 快速接线指南

本快速入门指南介绍了如何为 [CUAV V5+](../flight_controller/cuav_v5_plus.md) 飞行控制器供电以及如何连接其最主要的外部设备。

![V5+ AutoPilot - Hero Image](../../assets/flight_controller/cuav_v5_plus/v5+_01.png)

## 接线图概述

下图展示了如何连接最重要的传感器和外围设备（电机和伺服舵机输出除外）。 我们将在下面各节中介绍它们的细节。

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)

| 主要接口          | 功能                                                                                  |
|:------------- |:----------------------------------------------------------------------------------- |
| Power1        | 连接到电源模块（电流计）。 带有模拟电压和电流检测的电源输入。 请不要连接数字电源模块（比如UAVCAN电流计）！                           |
| Power2        | 连接I2C总线的智能电池                                                                        |
| TF CARD       | 用于日志存储的SD卡（出厂时SD已经装配好）。                                                             |
| M1~M8         | PWM输出接口 可以使用它控制电机或舵机。                                                               |
| A1~A6         | PWM 输出接口。 可以使用它控制电机或舵机。                                                             |
| DSU7          | 用于FMU调试，读取调试信息。                                                                     |
| I2C1/I2C2     | 连接I2C总线设备；比如外部指南针。                                                                  |
| CAN1/CAN2     | 用于连接UAVCAN设备,比如CAN GPS。                                                             |
| TYPE-C(USB)   | 用于连接计算机，建立飞行控制器和计算机之间的通信；比如刷写固件。                                                    |
| SBUS OUT      | 连接SBUS总线控制的相机和云台                                                                    |
| GPS&SAFETY    | 连接到Neo GPS，其中包括GPS、安全开关、蜂鸣器接口。                                                      |
| TELEM1/TELEM2 | 连接到数传电台                                                                             |
| DSM/SBUS/RSSI | 包含DSM、SBUS、RSSI信号输入接口；DSM接口可以连接DSM卫星接收机，SBUS接口可以连接SBUS总线的遥控器接收机，RSSI连接RSSI信号强度回传模块。 |


> **Note** 更多的接口信息，请阅读[V5+手册](http://manual.cuav.net/V5-Plus.pdf)。

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_02.png)

> **Note** 如果无法以推荐/默认方向安装控制器（例如，由于空间限制），则需要以实际使用的方向配置自动驾驶仪参数：[飞控的安装方向](../advanced_features/rtk-gps.md)。

## GPS + 罗盘 + 安全开关 + LED

推荐的 GPS 模块是 *Neo v2 GPS *，其中包含GPS、指南针、安全开关、蜂窝、LED 状态灯。

> **Note**如果使用其它GPS模块可能无法工作（阅读[此问题](../flight_controller/cuav_v5_nano.md#issue_gps_compatible)）

GPS/罗盘在安装时应尽可能远离其它电子元器件，方向标记朝向飞行器前方(将罗盘和其它电子元器件分开可以减少干扰)。 使用电缆连接到飞行控制器GPS接口。

> **Note** 如果您使用 CAN GPS，请使用电缆连接到飞行控制CAN 接口。

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_03.png)

## 安全开关

只有在不使用推荐的*Neo V2 GPS（带有内置安全开关）时，才需要V5+附带的专用安全开关。 </p> 

如果您在没有GPS的情况下飞行，则必须将安全开关直接连接到`GPS1`端口，以便能够启动无人机并飞行（如果您使用旧的6针GPS，请阅读底部接口的定义以更改线路）。

## 蜂鸣器

如果您使用第三方GPS ，蜂鸣器可能无法工作。

## 遥控器

如果您想要手动控制您的飞行器，需要使用遥控器 （PX4在自动飞行模式下可以不需要遥控器）。 您需要 选择一个兼容的发射/接收机并对频使它们能够通信 (对频方法参考发射/接收机的说明书)。

下图显示您如何连接遥控器接收机 (请在工具包中找到SBUS电缆)。

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_04.png)

## Spektrum 卫星接收器

V5+有专用DSM电缆。 如果使用Spektrum卫星接收器，这应连接到飞行控制器DSM/SBUS/SSI接口。

## 电源

V5+套装包含*HV_PM*电源模块，该模块支持2~10S LiPo电池。 将*HW_PM*模块的6引脚连接到飞行控制器的`Power1`接口。

> **Warning** The supplied power module is unfused. Power **must** be turned off while connecting peripherals.

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_01.png)

> **Note** The power module is not a power source for peripherals connected to the PWM outputs. If you're connecting servos/actuators you will need to separately power them using a BEC.

## Telemetry System (Optional)

A telemetry system allows you to communicate with, monitor, and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The communication channel is via Telemetry Radios. The vehicle-based radio should be connected to either the `TELEM1` or `TELEM2` port (if connected to these ports, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually via USB).

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_06.png)

## SD Card (Optional) {#sd_card}

An [SD card](../getting_started/px4_basic_concepts.md#sd_cards) is inserted in the factory (you do not need to do anything).

## Motors

Motors/servos are connected to the MAIN and AUX ports in the order specified for your vehicle in the [Airframes Reference](../airframes/airframe_reference.md).

![V5+ AutoPilot](../../assets/flight_controller/cuav_v5_plus/connection/v5+_quickstart_07.png)

## Pinouts {#pinouts}

Download **V5+** pinouts from [here](http://manual.cuav.net/V5-Plus.pdf).

## Further Information

- [Airframe build-log using CUAV v5+ on a DJI FlameWheel450](../frames_multicopter/dji_f450_cuav_5plus.md)
- [CUAV V5+ Manual](http://manual.cuav.net/V5-Plus.pdf) (CUAV)
- [CUAV V5+ docs](http://doc.cuav.net/flight-controller/v5-autopilot/en/v5+.html) (CUAV)
- [FMUv5 reference design pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165) (CUAV)
- [CUAV Github](https://github.com/cuav) (CUAV)
- [Base board design reference](https://github.com/cuav/hardware/tree/master/V5_Autopilot/V5%2B/V5%2BBASE) (CUAV)