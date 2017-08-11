# Pixracer

Pixhawk XRacer 보드 패밀리는 레이싱용 쿼드드론과 비행체에 최적화되어 있습니다. [Pixfalcon](../flight_controller/pixfalcon.md)나 [Pixhawk](../flight_controller/pixhawk.md) 와 다른점은 빌트인 Wifi와 새로운 센서, 편리한 풀 서보 헤더, CAN, 2M flash를 제공합니다.

![](../../assets/hardware/hardware-pixracer.jpg)

## 간략 요약

> ** The main hardware documentation is here: https://pixhawk.org/modules/pixracer **

  * Main System-on-Chip: [STM32F427VIT6 rev.3](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
    * CPU: 180 MHz ARM Cortex M4 with single-precision FPU
    * RAM: 256 KB SRAM (L1)
  * Standard FPV form factor: 36x36 mm with standard 30.5 mm hole pattern
  * Wifi telemetry and software upgrade
  * Invensense ICM-20608 Accel / Gyro (4 KHz) / MPU9250 Accel / Gyro / Mag (4 KHz)
  * HMC5983 magnetometer with temperature compensation
  * Measurement Specialties MS5611 barometer
  * JST GH connectors
  * microSD (logging)
  * S.BUS / Spektrum / SUMD / PPM input
  * FrSky telemetry port
  * OneShot PWM out (configurable)
  * Optional: Safety switch and buzzer
  * Availability:
    * [AUAV Pixracer](http://www.auav.co/product-p/xr-v1.htm)
  * Accessories:
    * [Digital airspeed sensor](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
    * [Hobbyking OSD + US Telemetry (915 MHz)](http://www.hobbyking.com/hobbyking/store/__74651__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_915MHz_.html)
    * [Hobbyking OSD + EU Telemetry (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)


## Kit

Pixracer는 별도의 항공 전자기기의 전원 공급장치로 사용하도록 설계되었습니다. 이 경우 모터나 ESC에서 flight controller로 서지 전류(current surge)가 발생하는 것을 방지하는 기능이 필요하고 민감한 센서가 영향받지 않도록 해야 합니다.

  * 파워 모듈 (전압과 전류 센싱 기능을 가진)
  * I2C splitter (AUAV, Hobbyking, 3DR 주변장치 지원)
  * 일반 주변장치를 위한 케이블 키트

## Wifi (USB 필요없이)
보드의 주요 기능중에 하나는 새로운 펌웨어를 flash, 시스템 셋업, in-flight telemetry 용으로 Wifi를 이용할 수 있다는 것입니다. 별도의 데스크탑 시스템이 필요없게 됩니다.

> **Todo** 셋업과 telemetry는 이미 사용가능합니다. 펌웨어 업그레이드는 기본 bootloader에서 지원하지만 활성화되어 있지는 않습니다.

* [ESP8266 문서 및 Flash 방법](https://pixhawk.org/peripherals/8266)
* [커스텀 ESP8266 MAVLink 펌웨어](https://github.com/dogmaphobic/mavesp8266)
