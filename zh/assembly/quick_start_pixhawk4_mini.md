# *Pixhawk 4 mini </0 >接线快速入门</h1> 

:::warning
PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://shop.holybro.com/) for hardware support or compliance issues.
:::

This quick start guide shows how to power the [*Pixhawk<sup>&reg;</sup> 4 Mini*](../flight_controller/pixhawk4_mini.md) flight controller and connect its most important peripherals.

![Pixhawk4 mini](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

## 接线图概述

The image below shows where to connect the most important sensors and peripherals (except for motors and servos).

![*Pixhawk 4 Mini* Wiring Overview](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_wiring_overview.png)

> **Tip** More information about available ports can be found here: [*Pixhawk 4 Mini* > Interfaces](../flight_controller/pixhawk4_mini.md#interfaces).

## 飞控的安装和方向

*Pixhawk 4 Mini* should be mounted on your frame using vibration-damping foam pads (included in the kit). It should be positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow pointing towards the front of the vehicle.

![*Pixhawk 4 Mini* Orientation](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_orientation.png)

> **Tip** 有关更多可用端口的详细信息, 请参阅此处: [*Pixhawk 4 Mini* > 端口](../flight_controller/pixhawk4_mini.md#interfaces)。

## GPS + 指南针 + 蜂鸣器 + 安全开关 + LED

Attach the provided GPS with integrated compass, safety switch, buzzer, and LED to the **GPS MODULE** port. The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_gps.png)

> **Note** The GPS module's integrated safety switch is enabled *by default* (when enabled, PX4 will not let you arm the vehicle). To disable the safety press and hold the safety switch for 1 second. You can press the safety switch again to enable safety and disarm the vehicle (this can be useful if, for whatever reason, you are unable to disarm the vehicle from your remote control or ground station).

## 电源

使用6PIN线材将套件附带的PMB模块的输出接口连接到*Pixhawk 4 mini* 的 **POWER** 端口。 下表解释了电源管理板的连接, 包括动力电源与 ESC电调和伺服舵机的信号连接。

Connect the output of the PMB that comes with the kit to the **POWER** port of the *Pixhawk 4 Mini* using a 6-wire cable. The connections of the PMB, including power supply and signal connections to the ESCs and servos, are explained in the image below.

![Pixhawk 4 - Power Management Board](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_power_management.png)

> **Note** GPS模块内集成的安全开关 *默认是启用的*（当启用时，PX4将不会让您解锁飞行器）。 如需关闭安全开关，请按住安全开关1秒钟。

| Pin(s) 或连接器 | 功能                                                       |
| ----------- | -------------------------------------------------------- |
| B+          | 连接到 ESC电调B+以为 ESC电调供电                                    |
| GND         | 连接到 ESC电调负极                                              |
| PWR         | JST-GH 6-pin 接头, 5V 3A 输出  
连接到*Pixhawk 4 Mini* 的POWER接口 |
| BAT         | 电源输入，连接到2~12S的LiPo电池                                     |


The pinout of the *Pixhawk 4 Mini* **POWER** port is shown below. The `CURRENT` signal should carry an analog voltage from 0-3.3V for 0-120A as default. The `VOLTAGE` signal should carry an analog voltage from 0-3.3V for 0-60V as default. The VCC lines have to offer at least 3A continuous and should default to 5.1V. A lower voltage of 5V is still acceptable, but discouraged.

| 针脚   | 信号  | 电压    |
| ---- | --- | ----- |
| 1（红） | VCC | +5V   |
| 2（黑） | VCC | +5V   |
| 3（黑） | 电流  | +3.3V |
| 4（黑） | 电压  | +3.3V |
| 5（黑） | GND | GND   |
| 6（黑） | GND | GND   |


> **注意** 上图仅展示了单个 ESC 和单个伺服舵机的连接方式。 以类似方式连接剩余的 ESC电调和伺服舵机。 Be careful with the voltage of servo you are going to use here.

<!--In the future, when Pixhawk 4 kit is available, add wiring images/videos for different airframes.-->

> **Caution** 如果配置为固定翼或无人车, 飞控**MAIN OUT**8个输出端口的 power (+) 正极线束将要进行独立供电 ，以保障方向舵、升降舵等伺服舵机的正常驱动。 为此，独立供电的正极线束需要连接到一个BEC，如具备BEC独立5V输出的ESC电调或者一个2SLiPo电池。

## 无线电遥控

你需要[选择一个兼容的发射机/接收机](../getting_started/rc_transmitter_receiver.md)，并*对好频* 以便它们能够正常通信（对频方法参考您的特定遥控器与接收机附带的说明书）。

下面的说明将演示如何将不同类型的接收机连接到 *Pixhawk 4 Mini*:

更多有关遥控器系统选择、接收机兼容性和遥控器接收机对频绑定的详细信息，请参阅：[遥控器发射机&接收器](../getting_started/rc_transmitter_receiver.md)。

- Spektrum/DSM 或者 S.BUS 接收机连接到 **DSM/SBUS RC** 输入端口。
    
    ![Pixhawk 4 Mini - Spektrum接收机的信号接口](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_dsmsbus.png)

- PPM 接收机连接到 **PPM RC** 输入端口。
    
    ![Pixhawk 4 Mini - PPM接收机的信号接口](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_ppm.png)

- PPM 和 *每个通道有单独连接线* 的 PWM 接收机需要连接在 **PPM RC** 端口，PWM信号需要通过一个[类似这样的](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)* PPM 编码器*（PPM-Sum 接收机只需要一根信号线就包含所有通道）。

遥测无线电台可用于地面站的通信和飞行控制 (例如, 您可以指定无人机飞行至特定位置, 或上传新的任务)。

## 数传电台（可选）

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).

The vehicle-based radio should be connected to the **TELEM1** port as shown below (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually by USB).

![Pixhawk 4 Mini Telemetry](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_telemetry.png)

## SD卡（可选）

SD cards are highly recommended as they are needed to [log and analyse flight details](../getting_started/flight_reporting.md), to run missions, and to use UAVCAN-bus hardware. Insert the card (included in the kit) into *Pixhawk 4 Mini* as shown below.

![Pixhawk 4 Mini SD Card](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_sdcard.png)

> **Tip** For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd_cards).

## 电机

Motors/servos are connected to the **MAIN OUT** ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md). See [*Pixhawk 4 Mini* > Supported Platforms](../flight_controller/pixhawk4_mini.md#supported-platforms) for more information.

> **Note** This reference lists the output port to motor/servo mapping for all supported air and ground frames (if your frame is not listed in the reference then use a "generic" airframe of the correct type).

<span></span>

> **Caution** The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). Make sure to use the correct mapping for your vehicle.

## 其它外设

一般配置信息在以下内容中介绍：[Autopilot 配置](../config/README.md)。

## 配置

QuadPlane的特定配置在以下内容中介绍：[QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- Nice to have detailed wiring infographic and instructions for different vehicle types. -->

## 更多信息

- [*Pixhawk 4 Mini*](../flight_controller/pixhawk4_mini.md)