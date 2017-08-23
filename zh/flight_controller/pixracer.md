---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/pixracer.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# Pixracer


Pixhawk XRacer板系列专门为小型赛车和飞机进行了优化。 与 [Pixfalcon](../flight_controller/pixfalcon.md)和[Pixhawk](../flight_controller/pixhawk.md) 相反，Pixracer具有内置 wifi、 新传感器、 方便的全速接口、CAN口、支持 2 M 闪存。

![](../../assets/hardware/hardware-pixracer.jpg)

## 快速摘要

主要硬件文档在这里: https://pixhawk.org/modules/pixracer


-   主片上系统:  [STM32F437](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
    - CPU: 180 MHz，ARM Cortex M4内核，单精度FPU
    - RAM: 256 KB SRAM
-   FPV标准参数: 36×36毫米，标准30.5毫米孔型
-   Wifi 数传 and 软件升级
-   公司的 ICM-20608 加速度计 / 陀螺仪 (4 KHz) / MPU9250 加速度计 / 陀螺仪 / 磁力计 (4 KHz)
-   HMC5983 磁力计的温度补偿
-   Measurement Specialties公司的 MS5611 气压计
-   JST GH 连接器
-   microSD (记录日志)
-   S.BUS / Spektrum / SUMD / PPM 输入
-   FrSky 数传口
-   OneShot PWM 输出 (可配置)
-   可选：安全开关和蜂鸣器
-   可购买:
 -   [AUAV Pixracer](http://www.auav.co/product-p/xr-v1.htm)
-   配件:
    - [数字空速管](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
    - [Hobbyking OSD + US 数传 (915 MHz)](http://www.hobbyking.com/hobbyking/store/__74651__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_915MHz_.html)
    - [Hobbyking OSD + EU 数传 (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)

## 套件

Pixracer有专门设计的单独航空电子设备的电源。这是必要的，以避免浪涌电流从电机和电调回流到飞控，扰乱敏感的传感器。

- 电源模块 （电压和电流监测）
- I2C扩展器（支持 AUAV，Hobbyking和3DR外设）
  - 常见的所有外围设备的电缆配套件

## Wifi (无需USB)

板子的主要特征之一是它能够使用 Wifi 闪烁的新固件、 系统设置和空中遥测。这将释放它的任何桌面系统的需要

<aside class="todo">
步骤和数传已经可用，固件升级已经由默认引导支持，但尚未启用。
</aside>

- [ESP8266文档和Flash说明](https://pixhawk.org/peripherals/8266)
- [自定义 ESP8266 MAVLink firmwarePixracer](https://github.com/dogmaphobic/mavesp8266)

