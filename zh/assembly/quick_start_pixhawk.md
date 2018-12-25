# Pixhawk快速使用指导

此快速入门指南演示如何为 * 3DR Pixhawk * 飞行控制器供电并连接其最重要的外围配件设备。

![Pixhawk  图像](../../images/pixhawk_logo_view.jpg)

> **注意** 3DR不再提供[3DR Pixhawk](https://dev.px4.io/hardware-pixhawk.html) 可以使用其他公司基于 [ Pixhawk FMUv2 原理图 ](../flight_controller/pixhawk_series.md) 设计的飞行控制器配件 (他们采用相同的连接器、输出、功能等，例如 它们使用相同的连线线材）。

## 接线介绍

下面的图片显示标准的 Pixhawk 连接 (除了马达和控制信号输出)。 我们将在下面各节中介绍每个主要部分。

![Pixhawk Wiring Overview](../../images/pixhawk_wiring_overview.jpg)  

> ** 注意 **更详细的接线信息 [ 如下所示 ](#detailed-wiring-infographic-copter)。

## 飞控的安装和方向

应使用减震泡沫垫 (包括在配件中) 将 * Pixhawk * 安装在机架上。 应该尽可能接近飞机的重心位置，正面朝上，方向箭头与飞机机头一致朝前

![Pixhawk mounting and orientation](../../images/pixhawk_3dr_mounting_and_foam.jpg)

> **Note** If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).

## 蜂鸣器与安全开关

Connect the included buzzer and safety switch as shown below (these are mandatory).

![Pixhawk mounting and orientation](../../images/pixhawk_3dr_buzzer_and_safety_switch.jpg)

## GPS + 罗盘

Attach a GPS (required) to the GPS port using the 6-wire cable supplied in the kit. Optionally attach a compass to the I2C port using a 4-wire cable (the Pixhawk has an internal compass, which can be used if necessary).

> **Note** The diagram shows a combined GPS and Compass. The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Connect compass/GPS to Pixhawk](../../images/pixhawk_3dr_compass_gps.jpg)

## 电源

Connect the output of a *Power module* (PM) to the **POWER** port using a 6-wire cable as shown. The PM input will be connected to your LiPo battery, while the main output will supply vehicle ESCs/motors (possibly via a power distribution board).

The power module supplies the flight controller with power from the battery and also sends information about the analog current and voltage supplied via the module (including both power to the flight controller and to motors etc).

![Pixhawk - Power Module](../../images/pixhawk_3dr_power_module.jpg)

> **Warning** The power module supplies the flight controller itself, but cannot power servos and other hardware connected to the controller's output ports (rail). For copter this does not matter because the motors are separately powered.

For planes and VTOL the output rail will need to be separately powered in order to drive servos for rudders, elevons etc. Often the main pusher/puller motor uses an ESC with an integrated [BEC](https://en.wikipedia.org/wiki/Battery_eliminator_circuit) that can be connected to the Pixhawk output rail. If not, you will need to setup a 5V BEC to connect to one of the free Pixhawk ports (without power, the servos will not work).

<!-- It would be good to have real example of this powering -->

## 无线电遥控

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to Pixhawk:

- Spektrum and DSM receivers connect to the **SPKT/DSM** input. ![Pixhawk - Radio port for Spektrum receivers](../../images/pixhawk_3dr_receiver_spektrum.jpg)

- PPM-SUM and S.BUS receivers connect to the **RC** ground, power and signal pins as shown. ![Pixhawk - Radio port for PPM/S.BUS receivers](../../images/pixhawk_3dr_receiver_ppm_sbus.jpg)

- PPM and PWM receivers that have an *individual wire for each channel* must connect to the **RC** port *via a PPM encoder* [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

更多有关遥控器系统选择、接收机兼容性和遥控器接收机对频绑定的详细信息, 请参阅: 遥控器发射机&接收器 </0 >。</p> 

## 数传电台（可选）

Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission). One radio must be connected to your vehicle as shown below. The other is connected to your ground station computer or mobile device (usually by USB).

![Pixhawk/Telemetry Radio](../../images/pixhawk_3dr_telemetry_radio.jpg)

<!-- what configuration is required once you've set up a radio) -->

## 电机

The mappings between MAIN/AUX output ports and motor/servos for all supported air and ground frames are listed in the [Airframe Reference](../airframes/airframe_reference.md).

> **Caution** The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). Make sure to use the correct mapping for your vehicle.

<span></span>

> **Tip** If your frame is not listed in the reference then use a "generic" airframe of the correct type.

<span></span>

> **Note** The output rail must be separately powered, as discussed in the [Power](#power) section above.

<!-- INSERT image of the motor AUX/MAIN ports? -->

## 其它外设

The wiring and configuration of other components is covered within the topics for individual [peripherals](../peripherals/README.md).

## 配置

一般配置信息在以下内容中介绍：[Autopilot 配置](../config/README.md)。

QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->

## Detailed Wiring Infographic (Copter)

![QuadCopter Pixhawk Wiring Infographic](../../images/pixhawk_infographic2.jpg)

## 更多信息

- [Pixhawk 系列](../flight_controller/pixhawk_series.md)
- [3DR Pixhawk](../flight_controller/pixhawk.md)