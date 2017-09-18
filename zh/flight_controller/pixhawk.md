---
translated_page: https://github.com/PX4/Devguide/blob/master/en/flight_controller/pixhawk.md
translated_sha: 95b39d747851dd01c1fe5d36b24e59ec865e323e
---

# Pixhawk 硬件


[Pixhawk](https://pixhawk.org/modules/pixhawk)是PX4飞行堆栈的标准微控制器平台。它在[NuttX 操作系统](http://nuttx.org)上运行 PX4 中间件。依照CC-BY-SA 3.0 许可开放硬件设计，所有图纸和设计文件都是 [可获得](https://github.com/PX4/Hardware)的。[Pixfalcon](../flight_controller/pixfalcon.md)  是 Pixhawk 的FPV 和类似平台较小版本。 对于无人机性能要求较高或照相，高通骁龙[Snapdragon Flight](../flight_controller/snapdragon_flight.md) 可能会更加合适。

![](../../assets/hardware/hardware-pixhawk.png)

##快速摘要

-  主片上系统: [STM32F437](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
    - CPU: 180 MHz，ARM Cortex M4内核，单精度FPU
    - RAM: 256 KB SRAM
-  失效保护片上系统: STM32F100
    - CPU: 24 MHz ARM Cortex M3
    - RAM: 8 KB SRAM
-  Wifi: 外加ESP8266 
-  GPS: U-Blox 7/8 (Hobbyking) / U-Blox 6 (3D Robotics)
-  光流: [PX4 光流模块](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)
-  可购买:
 -  [Hobbyking EU version (433 MHz)](http://www.hobbyking.com/hobbyking/store/__80554__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_with_Telemetry_and_GPS_433Mhz_.html)
 -  [Hobbyking US version (915 MHz)](http://www.hobbyking.com/hobbyking/store/__80555__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_with_Telemetry_and_GPS_915Mhz_.html)
 -  [3D Robotics Store](https://store.3drobotics.com/products/3dr-pixhawk)(GPS 和数传不捆绑)
-  配件:
    - [数字空速管](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
    - [Hobbyking Wifi 数传](http://www.hobbyking.com/hobbyking/store/__87841__APM_Pixhawk_Wireless_Wifi_Radio_Module.html)
    - [Hobbyking OSD + US 数传 (915 MHz)](http://www.hobbyking.com/hobbyking/store/__74651__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_915MHz_.html) 
    - [Hobbyking OSD + EU 数传 (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)

## 接口

- 一个 I2C
- 一个CAN (2x 可选)
  - 一个 ADC
  - 四个 UART (二个给光流控制)
  - 一个 Console口
  - 八路 PWM 用来做手动控制
  - 六路 PWM / GPIO / PWM 输入
  - S.BUS / PPM / Spektrum 输入
  - S.BUS 输出

## 引出线和原理图

板子信息详细记录 Pixhawk的[项目网站](https://pixhawk.org/modules/pixhawk) 。
