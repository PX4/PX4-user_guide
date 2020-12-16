# Durandal Wiring Quick Start

:::warning
PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://shop.holybro.com/) for hardware support or compliance issues.
:::

This quick start guide shows how to power the Holybro [Durandal](../flight_controller/durandal.md)<sup>&reg;</sup> flight controller and connect its most important peripherals.

![Durandal](../../assets/flight_controller/durandal/durandal_hero.jpg)

## Unboxing

Durandal is sold bundled with a number of different combinations of accessories, including power modules: *PM02 V3* and *PM07*, and the *Pixhawk 4 GPS/Compass* ( u-blox NEO-M8N).

The content of the box with the *PM02 V3* power module is shown below (the box also includes a pinout guide and power module instructions).

![Durandal Box](../../assets/flight_controller/durandal/durandal_unboxing_schematics.jpg)

## 接线图概述

The image below shows how to connect the most important sensors and peripherals (except the motor and servo outputs). We'll go through each of these in detail in the following sections.

![Durandal Wiring Overview](../../assets/flight_controller/durandal/durandal_wiring_overview.jpg)

:::tip
More information about available ports can be found here: [Durandal > Pinouts](../flight_controller/durandal.md#pinouts).
:::

## 飞控的安装和方向

*Durandal* should be mounted on the frame positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow pointing towards the front of the vehicle.

![Mounting/Orientation](../../assets/flight_controller/durandal/orientation.jpg)

If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).

:::tip
The board has internal vibration-isolation. Do not use vibration-isolation foam to mount the controller (double sided tape is normally sufficient).
:::

## GPS + 指南针 + 蜂鸣器 + 安全开关 + LED

Durandal is designed to work well with the *Pixhawk 4 GPS module*, which has an integrated compass, safety switch, buzzer and LED. It connects directly to the [GPS port](../flight_controller/durandal.md#gps) using the 10 pin cable.

The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Connect compass/GPS to Durandal](../../assets/flight_controller/durandal/connection_gps_compass.jpg)

:::note
The GPS module's integrated safety switch is enabled *by default* (when enabled, PX4 will not let you arm the vehicle). To disable the safety press and hold the safety switch for 1 second. You can press the safety switch again to enable safety and disarm the vehicle (this can be useful if, for whatever reason, you are unable to disarm the vehicle from your remote control or ground station).
:::

## 电源

You can use a power module or power distribution board to power motors/servos and measure power consumption. The recommended power modules are shown below.

<span id="pm02_v3"></span>
### PM02 v3 Power Module

The [Power Module (PM02 v3)](https://shop.holybro.com/power-modulepm02-v3_p1185.html) can be bundled with *Durandal*. It provides regulated power to flight controller and sends battery voltage/current to the flight controller.

Connect the output of the *Power Module* as shown.

![Durandal PM02v3 Power connections](../../assets/flight_controller/durandal/connection_power.jpg)


- PM voltage/current port: connect to [POWER1](../flight_controller/durandal.md#power) port (or `POWER2`) using the 6-wire GH cable supplied.
- PM input (XT60 male connector): connect to the LiPo battery (2~12S).
- PM power output (XT60 female connector): wire out to any motor ESCs.

:::tip
As this power module does not include power distribution wiring, you would normally just connect all the ESCs in parallel to the power module output (the ESC must be appropriate for the supplied voltage level).
:::

:::tip
The 8 pin power (+) rail of **MAIN/AUX** is not powered by the power module supply to the flight controller. If it will need to be separately powered in order to drive servos for rudders, elevons etc., the power rail needs to be connected to a BEC equipped ESC or a standalone 5V BEC or a 2S LiPo battery. Ensure the voltage of servo you are going to use is appropriate.
:::

如果你想*手动*控制你的飞机，你需要一个遥控器（PX4在自动飞行模式可以不需要遥控器）。
- Max input voltage: 60V
- Max current sensing: 120A Voltage
- Current measurement configured for SV ADC Switching regulator outputs 5.2V and 3A max
- Weight: 20g
- Package includes:
  - PM02 board
  - 6pin MLX cable (1)
  - 6pin GH cable (1)

:::note
See also [PM02v3 Power Module Manual](http://www.holybro.com/manual/Holybro_PM02_v3_PowerModule_Manual.pdf) (Holybro).
:::

<span id="pm07"></span>
### Pixhawk 4 Power Module (PM07)

The [Pixhawk 4 Power Module (PM07)](https://shop.holybro.com/pixhawk-4-power-module-pm07_p1095.html) can be bundled/used with *Durandal*. It acts as both a power module and power distribution board, providing regulated power to flight controller and the ESCs, and sending battery voltage/current to the flight controller.

更多有关遥控器系统选择、接收机兼容性和遥控器接收机对频绑定的详细信息，请参阅：[遥控器发射机&接收器](../getting_started/rc_transmitter_receiver.md)。

遥测无线电台可用于地面站的通信和飞行控制 (例如, 您可以指定无人机飞行至特定位置, 或上传新的任务)。
- PCB Current: total 120A outputs (MAX)
- UBEC 5V output current: 3A
- UBEC input voltage : 7~51v (2~12s LiPo)
- Dimensions: 68*50*8 mm
- Mounting Holes: 45*45mm
- Weight: 36g
- Package includes:
  - PM07 board (1)
  - 80mm XT60 connector wire (1)

:::note
See also [PM07 Quick Start Guide](http://www.holybro.com/manual/PM07-Quick-Start-Guide.pdf) (Holybro).
:::

### Battery Configuration

The battery/power setup must be configured in [Power Settings](../config/battery.md). For either Power Module you will need to configure the *Number of Cells*.

You will not need to update the *voltage divider* unless you are using some other power module (e.g. the one from the Pixracer).


## 无线电遥控

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to *Durandal*:


- Spektrum/DSM receivers connect to the [DSM RC](../flight_controller/durandal.md#dsm-rc-port) input.

  ![Durandal - DSM](../../assets/flight_controller/durandal/dsm.jpg)

- PPM and S.Bus receivers connect to the [SBUS_IN/PPM_IN](../flight_controller/durandal.md#rc-in) input port (marked as RC IN, next to the MAIN/AUX inputs).

  ![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

- PPM 和 *每个通道有单独连接线* 的 PWM 接收机需要连接在 **PPM RC** 端口，PWM信号需要通过一个[类似这样的](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)* PPM 编码器*（PPM-Sum 接收机只需要一根信号线就包含所有通道）。

For more information about selecting a radio system, receiver compatibility, and binding your transmitter/receiver pair, see: [Remote Control Transmitters & Receivers](../getting_started/rc_transmitter_receiver.md).


## 数传电台（可选）

针对可选/非通用组件的接线与配置，在 [外围设备](../peripherals/README.md) 独立主题中有详细的内容介绍。

The vehicle-based radio should be connected to the [TELEM1](../flight_controller/durandal.md#telem1_2_3) port as shown below using one of the 6-pos connectors (if connected to this port, no further configuration is required). The other radio is connected to your ground station computer or mobile device (usually by USB).

![Durandal/Telemetry Radio](../../assets/flight_controller/durandal/holybro_telemetry_radio.jpg)


## SD 卡

SD cards are highly recommended as they are needed to [log and analyse flight details](../getting_started/flight_reporting.md), to run missions, and to use UAVCAN-bus hardware. Insert an SD card into the *Durandal* where indicated below.

![Durandal SD Card](../../assets/flight_controller/durandal/durandal_sd_slot.jpg)

:::tip
For more information see [Basic Concepts > SD Cards (Removable Memory)](../getting_started/px4_basic_concepts.md#sd_cards).
:::

## 电机

Motors/servos control signals are connected to the **I/O PWM OUT** (**MAIN OUT**) and **FMU PWM OUT** (**AUX**) ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

![Durandal - Back Pinouts (Schematic)](../../assets/flight_controller/durandal/durandal_pinouts_back.jpg)

The motors must be separately [powered](#power).

:::note
If your frame is not listed in the airframe reference then use a "generic" airframe of the correct type.
:::

:::tip
*Durandal* has 5 AUX ports, so cannot be used with airframes that map AUX6, AUX7, AUX8 to motors or other critical flight controls.
:::

## 其它外设

The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).

## 针脚定义

[Durandal > Pinouts](../flight_controller/durandal.md#pinouts)

<span id="configuration"></span>
## PX4 配置

First you will need to install [PX4 "Master" Firmware](../config/firmware.md#custom) onto the controller using *QGroundControl*.

:::note
Durandal support will be in the *stable* PX4 release that follows PX4 v1.10.
:::

Further general configuration information is covered in: [Autopilot Configuration](../config/README.md).

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)


## 更多信息

- [Durandal Overview](../flight_controller/durandal.md)
- [Durandal Technical Data Sheet](http://www.holybro.com/manual/Durandal_technical_data_sheet.pdf) (Holybro)
- [Durandal Pinouts](http://www.holybro.com/manual/Durandal-Pinouts.pdf) (Holybro)
- [Durandal_MB_H743sch.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/durandal/Durandal_MB_H743sch.pdf) (Durandal Schematics)
- [Stm32H743IIK_pinmap.pdf](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/durandal/Stm32H743IIK_pinmap.pdf) (Durandal Pinmap)