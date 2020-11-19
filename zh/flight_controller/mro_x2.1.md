# mRo-X2.1 Autopilot

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](https://store.mrobotics.io/)。

The [mRo-X2.1 autopilot](http://www.mRobotics.io/) is based on the [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2** open hardware design. 它在 [NuttX](http://nuttx.org) 操作系统上运行 PX4。

![mRo X2.1](../../assets/flight_controller/mro/mro_x2.1.jpg)

> **Note** This flight controller is [manufacturer supported](../flight_controller/autopilot_manufacturer_supported.md).

## 总览

* 主片上系统：[STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU: STM32F427VIT6 ARM<sup>&reg;</sup> microcontroller - Revision 3
  * IO: STM32F100C8T6 ARM<sup>&reg;</sup> microcontroller
* 传感器： 
  * Invensense<sup>&reg;</sup> MPU9250 9DOF
  * Invensense ICM-20602 6DOF
  * MEAS MS5611 气压计
* 尺寸/重量 
  * Size: 36mm x 50mm (Can be ordered with vertical, horizontal or no headers installed)
  * 安装点：30.5mm x 30.5mm 直径 3.2mm
  * 重量: 10.9g

The diagram below provides a side-by-side comparison with a Pixhawk 1. The mRo features almost identical hardware and connectivity but has a much smaller footprint. Major differences are updated sensors and Rev 3 FMU.

![Mro Pixhawk 1 vs X2.1 comparison](../../assets/flight_controller/mro/px1_x21.jpg)

## 连接

* 2.54 毫米头：
* GPS (UART4) with I2C
* CAN Bus
* 遥控输入
* PPM 输入
* Spektrum 输入
* RSSI 输入
* sBus 输入 
* sBus 输出
* 电源输入
* 蜂鸣器输出
* LED 输出
* 8路伺服输出
* 6路辅助输出
* Offboard microUSB connector
* Kill Pin output *(Currently not supported by firmware)*
* AirSpeed Sensor
* USART2 (Telem 1)
* USART3 (Telem 2)
* UART7 (Console)
* UART8 (OSD)

## PX4 BootLoader Issue

By default a mRo X2.1 might come preconfigured for ArduPilot<sup>&reg;</sup> rather than PX4. This can be seen during firmware update when the board is recognized as FMUv2 instead of X2.1.

In this case you must update the BootLoader using [BL_Update_X21.zip](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/BL_Update_X21.zip). If this correction is not carried out your compass direction will be wrong and the secondary IMU will not be detected.

The update steps are:

1. Download and extract [BL_Update_X21.zip](https://github.com/PX4/px4_user_guide/raw/master/assets/hardware/BL_Update_X21.zip).
2. Find the folder *BL_Update_X21*. This contains a **bin** file and a subfolder named **/etc** containing an **rc.txt** file
3. Copy these files to your micro SD card's root directory and insert it into the mRO x2.1
4. Power on the mRO x2.1 Wait for it to boot and then reboot 1 time.

## 访问链接

This product can be ordered at the [mRobotics<sup>&reg;</sup> Store](https://store.mrobotics.io/mRo-X2-1-Rev-2-p/mro-x2.1rv2-mr.htm).

## 接线指南

![mRo_X2.1_Wiring](../../assets/flight_controller/mro/mro_x21_wiring.png)

## 编译固件

> **Tip** 大多数用户不需要构建此固件！ 它是预构建的，并在连接适当的硬件时由 *QGroundControl* 自动安装。

为此目标 [编译 PX4](../dev_setup/building_px4.md)：

    make mro_x21_default
    

## 原理图

The board is documented on the mRo hardware repo: [x21_V2_schematic.pdf](https://github.com/mRoboticsIO/Hardware/blob/master/X2.1/Docs/x21_V2_schematic.pdf).

## Serial Port Mapping

| UART   | 设备         | Port            |
| ------ | ---------- | --------------- |
| USART1 | /dev/ttyS0 | IO debug        |
| USART2 | /dev/ttyS1 | SERIAL1         |
| USART3 | /dev/ttyS2 | TELEM2          |
| UART4  | /dev/ttyS3 | GPS/I2C         |
| USART6 | /dev/ttyS4 | PX4IO           |
| UART7  | /dev/ttyS5 | SERIAL5 CONSOLE |
| UART8  | /dev/ttyS6 | SERIAL4         |