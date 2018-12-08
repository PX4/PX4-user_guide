# *Pixhawk 4 Mini* Wiring Quick Start

This quick start guide shows how to power the [*Pixhawk<sup>&reg;</sup> 4 Mini*](../flight_controller/pixhawk4_mini.md) flight controller and connect its most important peripherals.

<img src="../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png" width="350px" title="Pixhawk4 Image" />

## 接线介绍

The image below shows where to connect the most important sensors and peripherals (except for motors and servos).

![*Pixhawk 4 Mini* Wiring Overview](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_wiring_overview.png)

> **Tip** More information about available ports can be found here: [*Pixhawk 4 Mini* > Interfaces](../flight_controller/pixhawk4_mini.md#interfaces).

## 飞控的安装和方向

*Pixhawk 4 Mini* should be mounted on your frame using vibration-damping foam pads (included in the kit). 应该尽可能接近飞机的重心位置，正面朝上，方向箭头与飞机机头一致朝前

![*Pixhawk 4 Mini* Orientation](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_orientation.png)

> **Note** If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).

## Gps + 指南针 + 蜂鸣器 + 安全开关 + led

Attach the provided GPS with integrated compass, safety switch, buzzer, and LED to the **GPS MODULE** port. The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_gps.png)

> **Note** The GPS module's integrated safety switch is enabled *by default* (when enabled, PX4 will not let you arm the vehicle). To disable the safety press and hold the safety switch for 1 second. You can press the safety switch again to enable safety and disarm the vehicle (this can be useful if, for whatever reason, you are unable to disarm the vehicle from your remote control or ground station).

## Power

The Power Management Board (PMB) serves the purpose of a power module as well as a power distribution board. In addition to providing regulated power to *Pixhawk 4 Mini* and the ESCs, it sends information to the autopilot about the battery’s voltage and current draw.

Connect the output of the PMB that comes with the kit to the **POWER** port of the *Pixhawk 4 Mini* using a 6-wire cable. The connections of the PMB, including power supply and signal connections to the ESCs and servos, are explained in the image below.

![Pixhawk 4 - Power Management Board](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_power_management.png)

> **Note** The image above only shows the connection of a single ESC and a single servo. Connect the remaining ESCs and servos similarly.

| Pin(s) or Connector | Function                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| B+                  | Connect to ESC B+ to power the ESC                                       |
| GND                 | Connect to ESC Ground                                                    |
| PWR                 | JST-GH 6-pin Connector, 5V 3A output  
connect to *Pixhawk 4 Mini* POWER |
| BAT                 | Power Input, connect to 2~12s LiPo Battery                               |

The pinout of the *Pixhawk 4 Mini* **POWER** port is shown below. 电流信号应接入0-3.3V 电压且0-120A 电流的模拟信号。 电压信号应接入0-3.3V电压且0-60A 电流的模拟信号。 Vcc 线路必须提供至少持续3A电流, 并应默认为 5.1V电压。 低于5V的电压仍然是可以接受的, 但不推荐。

| Pin      | Signal  | Volt  |
| -------- | ------- | ----- |
| 1(red)   | VCC     | +5V   |
| 2(black) | VCC     | +5V   |
| 3(black) | CURRENT | +3.3V |
| 4(black) | VOLTAGE | +3.3V |
| 5(black) | GND     | GND   |
| 6(black) | GND     | GND   |

> **Note** If using a plane or rover, the 8 pin power (+) rail of **MAIN OUT** will need to be separately powered in order to drive servos for rudders, elevons, etc. To do this, the power rail needs to be connected to a BEC equipped ESC, a standalone 5V BEC, or a 2S LiPo battery. Be careful with the voltage of servo you are going to use here.

<!--  -->

<!--In the future, when Pixhawk 4 kit is available, add wiring images/videos for different airframes.-->

> **Note** Using the Power Module that comes with the kit you will need to configure the *Number of Cells* in the [Power Settings](https://docs.qgroundcontrol.com/en/SetupView/Power.html) but you won't need to calibrate the *voltage divider*. 如果您使用的是任何其他电源模块 (例如, 来自 pixracer 的电源模块), 则必须更新校准 *voltage divider* 参数。

## Radio Control

A remote control (RC) radio system is required if you want to *manually* control your vehicle (PX4 does not require a radio system for autonomous flight modes).

You will need to [select a compatible transmitter/receiver](../getting_started/rc_transmitter_receiver.md) and then *bind* them so that they communicate (read the instructions that come with your specific transmitter/receiver).

The instructions below show how to connect the different types of receivers to *Pixhawk 4 Mini*:

- Spektrum/DSM 或者 S.BUS 接收机连接到 **DSM/SBUS RC** 输入端口。
    
    ![Pixhawk 4 Mini - Radio port for Spektrum receivers](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_dsmsbus.png)

- PPM 接收机连接到 **PPM RC</0 > 输入端口。</p> 
    
    ![Pixhawk 4 Mini - Radio port for PPM receivers](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_rc_ppm.png)</li> 
    
    - PWM 接收机为每个独立的通道配备了独立的连接线，需要通过一个*PPM编码器, 连接到 **PPM RC** 输入端口 *[ ，比如这个](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)。</ul> 
    
    更多有关遥控器系统选择、接收机兼容性和遥控器接收机对频绑定的详细信息, 请参阅: 遥控器发射机&接收器 </0 >。</p> 
    
    ## Telemetry Radio (Optional)
    
    Telemetry radios may be used to communicate and control a vehicle in flight from a ground station (for example, you can direct the UAV to a particular position, or upload a new mission).
    
    机载端的无线数传模块应连接到 **TELEM1** 端口，如下所示 (如果连接到此端口, 则无需进一步配置)。 另一个匹配的地面端数传电台应该连接到您的地面站电脑或者移动设备上(通常是通过USB接口)。
    
    ![Pixhawk 4 Mini Telemetry](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_telemetry.png)
    
    ## microSD Card (Optional)
    
    SD cards are most commonly used to [log and analyse flight details](../getting_started/flight_reporting.md). Insert the card (included in the kit) into *Pixhawk 4 Mini* as shown below.
    
    ![Pixhawk 4 Mini SD Card](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_sdcard.png)
    
    > **Tip** The SanDisk Extreme U3 32GB is [highly recommended](https://dev.px4.io/en/log/logging.html#sd-cards) (Developer Guide).
    
    ## Motors
    
    Motors/servos are connected to the **MAIN OUT** ports in the order specified for your vehicle in the [Airframe Reference](../airframes/airframe_reference.md). See [*Pixhawk 4 Mini* > Supported Platforms](../flight_controller/pixhawk4_mini.md#supportedplatforms) for more information.
    
    > **Note** This reference lists the output port to motor/servo mapping for all supported air and ground frames (if your frame is not listed in the reference then use a "generic" airframe of the correct type).
    
    

<span></span>

    
    > **Caution** The mapping is not consistent across frames (e.g. you can't rely on the throttle being on the same output for all plane frames). Make sure to use the correct mapping for your vehicle.
    
    ## Other Peripherals
    
    The wiring and configuration of optional/less common components is covered within the topics for individual [peripherals](../peripherals/README.md).
    
    ## Configuration
    
    一般配置信息在以下内容中介绍: Autopilot 配置 </0 >。</p> 
    
    QuadPlane specific configuration is covered here: [QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)
    
    <!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->
    
    <!--## Detailed Wiring Infographic (Copter)

![QuadCopter Pixhawk Wiring Infographic](../../images/pixhawk_infographic2.jpg) -->
    
    ## Further information
    
    - [*Pixhawk 4 Mini*](../flight_controller/pixhawk4_mini.md)