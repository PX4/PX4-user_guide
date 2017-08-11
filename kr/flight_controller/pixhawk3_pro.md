# Pixhawk 3 Pro

Pixhawk 3 Pro는 FMUv4 (Pixracer) 하드웨어를 기반으로 일부 업그레이드와 추가 기능을 가지고 있으며, [Drotek](https://drotek.com)와 PX4가 설계하였습니다.


![](../../assets/hardware/hardware-pixhawk3_pro.jpg)


## 간략 요약

> **Note** **메인 하드웨어 문서는 다음을 참조: https://pixhawk.drotek.com/en/ **


  * Microcontroller: **STM32F469**; Flash size는 **2MiB**, RAM size는 **384KiB**
  * **ICM-20608-G** gyro / accelerometer
  * **MPU-9250** gyro / accelerometer / magnetometer
  * **LIS3MDL** compass
  * Sensors connected via two SPI buses (하나는 높은 rate고 다른 하나는 low-noise bus)
  * Two I2C buses
  * Two CAN buses
  * Voltage / battery readings from two power modules
  * FrSky Inverter
  * 8 Main + 6 AUX PWM outputs (별도 IO chip, PX4IO)
  * microSD (logging)
  * S.BUS / Spektrum / SUMD / PPM input
  * JST GH user-friendly connectors: Pixracer와 동일한 커넥터와 핀아웃
