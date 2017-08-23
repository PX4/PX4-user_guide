---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/pixfalcon.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# Pixfalcon硬件


Pixfalcon 是衍生于[Pixhawk](../flight_controller/pixhawk.md)的设计，优化在空间受限的应用，如 FPV(First Persoan View,第一人称主视角),由[Holybro](http://www.holybro.com/)设计。考虑到减小尺寸，Pixfalcon有更少的IO。对于性能要求较高或需要带有照相机的无人机，高通骁龙[Snapdragon Flight](../flight_controller/snapdragon_flight.md)可能会更加合适。

![](../../assets/hardware/hardware-pixfalcon.png)

## 快速摘要

-  主片上系统: [STM32F437](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
    - CPU: 180 MHz，ARM Cortex M4内核，单精度FPU
    - RAM: 256 KB SRAM 
-  失效保护片上系统: STM32F100
    - CPU: 24 MHz ARM Cortex M3
    - RAM: 8 KB SRAM
-  GPS: U-Blox M8 (捆绑)
-  光流: [PX4光流模块](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)，来自制造商 [Holybro](http://www.holybro.com/product/24)或者分销商[Hobbyking](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)
-  配件: 来自制造商 [Holybro](http://www.holybro.com/product/8)或者分销商[Hobbyking](http://www.hobbyking.com/hobbyking/store/__86437__PixFalcon_Micro_PX4_Autopilot_plus_Micro_M8N_GPS_and_Mega_PBD_Power_Module.html)
-  [数字空速传感器](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)：来自制造商[Holybro](http://www.holybro.com/product/26)或者分销商[Hobbyking](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
-  集成测量显示在屏幕上:
 -  [Hobbyking OSD + US 数传 (915 MHz)](http://www.hobbyking.com/hobbyking/store/__74651__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_915MHz_.html)
 -  [Hobbyking OSD + EU 数传 (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)
-  纯测量方案:
    - [Hobbyking Wifi 数传](http://www.hobbyking.com/hobbyking/store/__87841__APM_Pixhawk_Wireless_Wifi_Radio_Module.html)
    - [Hobbyking EU 迷你数传(433 MHz)](http://www.hobbyking.com/hobbyking/store/__74647__Micro_HKPilot_Telemetry_radio_Set_With_Integrated_PCB_Antenna_433Mhz.html)
    - [Hobbyking US 迷你数传 (915 MHz)](http://www.hobbyking.com/hobbyking/store/__74648__Micro_HKPilot_Telemetry_radio_Set_With_Integrated_PCB_Antenna_915Mhz.html)

## 接口

- 一个I2C
- 二个UART (一个给数传 / OSD, 没有光流控制)
  - 八通道 PWM 用来做手动操作
  - S.BUS / PPM 输入
