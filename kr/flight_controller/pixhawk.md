# Pixhawk 하드웨어

[Pixhawk](https://pixhawk.org/modules/pixhawk)는 PX4 flight stack의 표준 마이크로컨트롤러 플랫폼입니다. [NuttX](http://nuttx.org) 운영체제 기반으로 PX4 미들웨어가 동작합니다. CC-BY-SA 3.0 라이센스를 가지며 회로도 및 디자인 관련 파일은 [available](https://github.com/PX4/Hardware)를 참고하세요.  [Pixfalcon](../flight_controller/pixfalcon.md)은 FPV용으로 Pixhawk를 작게 만든 버전으로 동일한 플랫폼입니다. 높은 프로세싱 성능이나 카메라 인터페이스를 원하는 경우에는 [Snapdragon Flight](../flight_controller/snapdragon_flight.md)이 적당합니다.

![](../../assets/hardware/hardware-pixhawk.png)

## 간략 요약

  * Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
    * CPU: 180 MHz ARM Cortex M4 with single-precision FPU
    * RAM: 256 KB SRAM (L1)
  * Failsafe System-on-Chip: STM32F100
    * CPU: 24 MHz ARM Cortex M3
    * RAM: 8 KB SRAM
  * Wifi: ESP8266 external
  * GPS: U-Blox 7/8 (Hobbyking) / U-Blox 6 (3D Robotics)
  * Optical flow: [PX4 Flow unit](http://www.hobbyking.com/hobbyking/store/__66308__HK_Pilot32_Optical_Flow_Kit_With_Sonar.html)
  * Availability:
    * [Hobbyking EU version (433 MHz)](http://www.hobbyking.com/hobbyking/store/__80554__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_with_Telemetry_and_GPS_433Mhz_.html)
    * [Hobbyking US version (915 MHz)](http://www.hobbyking.com/hobbyking/store/__80555__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_with_Telemetry_and_GPS_915Mhz_.html)
    * [3D Robotics Store](https://store.3drobotics.com/products/3dr-pixhawk) (GPS and telemetry not bundled)
  * Accessories:
    * [Digital airspeed sensor](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
    * [Hobbyking Wifi Telemetry](http://www.hobbyking.com/hobbyking/store/__87841__APM_Pixhawk_Wireless_Wifi_Radio_Module.html)
    * [Hobbyking OSD + US Telemetry (915 MHz)](http://www.hobbyking.com/hobbyking/store/__74651__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_915MHz_.html)
    * [Hobbyking OSD + EU Telemetry (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)

## Connectivity

  * 1x I2C
  * 1x CAN (2x optional)
  * 1x ADC
  * 4x UART (2x with flow control)
  * 1x Console
  * 8x PWM with manual override
  * 6x PWM / GPIO / PWM input
  * S.BUS / PPM / Spektrum input
  * S.BUS output

## Pinouts and Schematics

보드에 관련된 상세 문서는 [Pixhawk project](https://pixhawk.org/modules/pixhawk)를 참고하세요.
