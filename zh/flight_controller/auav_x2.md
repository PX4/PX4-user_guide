# AUAV-X2 自动驾驶仪 (停产)

> **Warning** 这个板子已经停产, 不再有商业用途。

[AUAV<sup>&reg;</sup> ](http://www.auav.com/) *AUAV-X2 autopilot* 基于[Pixhawk<sup>&reg;</sup>-项目](https://pixhawk.org/) ** FMUv2** 开放硬件设计。 它在 [NuttX](http://nuttx.org) 操作系统上运行 PX4。

![AUAVX2_case2](../../images/auavx2_case2.jpg)

## 总览

* 主片上系统：[STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU：STM32F427VIT6 ARM 微控制器-版本 3
  * IO：STM32F100C8T6 ARM 微控制器
* 传感器： 
  * Invensense MPU9250 9DOF
  * Invensense ICM-20608 6DOF
  * MEAS MS5611 气压计
* 尺寸/重量 
  * 尺寸：36mm x 50mm
  * 安装点：30.5mm x 30.5mm 直径 3.2mm
  * 重量: 10.9g
* 具有反向电压保护的电源 OR-ing 原理图。 需要 5V 电源模块！

## 连接

* 2.54 毫米头：
* GPS (USART4)
* I2C
* 遥控输入
* PPM 输入
* Spektrum input
* RSSI input
* sBus input
* sBus output
* Power input
* Buzzer output
* LED output
* 8 x Servo outputs
* 6 x Aux outputs
* USART7 (Console)
* USART8 (OSD)

## 访问链接

No longer in production. This has been superceded by the [mRo X2.1](mro_x2.1.md). mRobotics is the  
distributor for the AUAV Products from August 2017.

## Key Links

* [User Manual](http://arsovtech.com/wp-content/uploads/2015/08/AUAV-X2-user-manual-EN.pdf)
* [DIY Drones Post](http://diydrones.com/profiles/blogs/introducing-the-auav-x2-1-flight-controller)

## Wiring Guide

![AUAV-X2-basic-setup 3](../../images/auav_x2_basic_setup_3.png)

![AUAV-X2-basic-setup 2](../../images/auav_x2_basic_setup_2.jpg)

![AUAV-X2-basic-setup 1](../../images/auav_x2_basic_setup_1.png)

![AUAV-X2-airspeed-setup 3](../../images/auav_x2_airspeed_setup_3.png)

## Schematics

The board is based on the [Pixhawk project](https://pixhawk.org/) **FMUv2** open hardware design.

* [FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Schematic and layout

> **Note** As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware).