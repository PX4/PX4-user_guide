# HKPilot32 Flight Controller

The Hobbyking *HKPilot32 autopilot* is based on the [Pixhawk-project](https://pixhawk.org/) **FMUv2** open hardware design. It runs the PX4 Flight Stack on the [NuttX](http://nuttx.org) OS.

> **Tip** The HKPilot32 is software compatible with the 3DR [Pixhawk 1](../flight_controller/pixhawk.md). It is not connector compatible, but is otherwise physically very similar to the 3DR Pixhawk or mRo Pixhawk.

![HKPilot32](../../images/hkpilot32_flight_controller.jpg)

As a CC-BY-SA 3.0 licensed Open Hardware design, schematics and design files should be [available here](https://github.com/PX4/Hardware). 


## Quick Summary

* Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  * CPU: 32-bit STM32F427 Cortex M4 core with FPU
  * RAM: 168 MHz/256 KB 
  * Flash: 2 MB
* Failsafe System-on-Chip: STM32F103
* Sensors:
  * ST Micro L3GD20 3-axis 16-bit gyroscope
  * ST Micro LSM303D 3-axis 14-bit accelerometer / magnetometer
  * Invensense MPU 6000 3-axis accelerometer/gyroscope
  * MEAS MS5611 barometer
* Dimensions/Weight
  * Size: 81x44x15mm
  * Weight: 33.1g
* GPS: Ubox super precision Neo-7M with compass
* Input Voltage: 2~10s (7.4~37V)

### Connectivity

* 1x I2C
* 2x CAN
* 3.3 and 6.6V ADC inputs
* 5x UART (serial ports), one high-power capable, 2x with HW flow control
* Spektrum DSM / DSM2 / DSM-X® Satellite compatible input up to DX8 (DX9 and above not supported)
* Futaba S.BUS® compatible input and output
* PPM sum signal
* RSSI (PWM or voltage) input
* SPI
* External microUSB port

### Accessories

* [Digital airspeed sensor](http://www.hobbyking.com/hobbyking/store/__62752__HKPilot_32_Digital_Air_Speed_Sensor_And_Pitot_Tube_Set.html)
* [Hobbyking Wifi Telemetry](http://www.hobbyking.com/hobbyking/store/__87841__APM_Pixhawk_Wireless_Wifi_Radio_Module.html)
* [Hobbyking OSD + EU Telemetry (433 MHz)](http://www.hobbyking.com/hobbyking/store/__74650__Micro_HKPilot_Telemetry_Radio_Module_with_On_Screen_Display_OSD_unit_433MHz_.html)

## Availability

* [Hobbyking EU version (433 MHz)](http://www.hobbyking.com/hobbyking/store/__80554__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_with_Telemetry_and_GPS_433Mhz_.html)
* [Hobbyking US version (915 MHz)](http://www.hobbyking.com/hobbyking/store/__80555__HKPilot32_Autonomous_Vehicle_32Bit_Control_Set_with_Telemetry_and_GPS_915Mhz_.html)
* [3D Robotics Store](https://store.3drobotics.com/products/3dr-pixhawk) (GPS and telemetry not bundled)


## Pinouts and Schematics

The board is documented on the [Pixhawk project](https://pixhawk.org/modules/pixhawk) website.
