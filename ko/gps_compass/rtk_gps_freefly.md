# Freefly Systems RTK GPS

[Freefly Systems RTK GPS 모듈](https://store.freeflysystems.com/products/rtk-gps-ground-station)은 매우 안정적인 내비게이션을 제공하는 Freefly Systems의 다중 대역 [RTK GPS 모듈](../gps_compass/rtk_gps.md)입니다. 모듈은 로버(항공기에 설치된 경우) 또는 기지국(컴퓨터에 연결된 경우)으로 작동할 수 있습니다.

주요 특징은 다음과 같습니다.
- Multiband (L1/L2) 수신기 (u-blox ZED-F9P)
- 최대 4 개의 GNSS(GPS, Galileo, GLONASS, BeiDou) 동시 수신
- 내장형 자력계(IST8310), 기압계(BMP388), RGB LED, 안전 스위치 및 안전 LED

:::note
이 모듈은 PX4 v1.9 이상에서 사용할 수 있습니다 (u-blox ZED-F9P에 대한 지원은 PX4 v1.9에서 추가됨).
:::

![FreeFly GPS Module](../../assets/hardware/gps/freefly_gps_module.jpg)


## 구매

* [Freefly Store](https://store.freeflysystems.com/products/rtk-gps-ground-station)

## 키트 내용물

RTK GPS 키트에는 다음 내용물들이 포함됩니다.
- 안테나가 있는 GPS 모듈 2개
- 3m USB C to A 케이블
- 베이스 스테이션 모듈용 마그네틱 퀵 마운트 (삼각대 마운트용 1/ 4-20 스레드)
- Freefly AltaX에 장착하는 나사


## 설정

*QGroundControl*을 통한 PX4의 RTK 설정 및 사용은 대부분 플러그앤플레이입니다 \(자세한 내용은 [RTK GPS](../advanced_features/rtk-gps.md) 참조).

For the aircraft, you should set the parameter [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD) to 115200 8N1 to ensure that PX4 configures the correct baudrate.

## Wiring and Connections

The Freefly RTK GPS comes with an 8 pin JST-GH connector that can be plugged into a PixHawk autopilot. For use as a base station, the module has a USB-C connector

### Pinout

The Freefly GPS pinout is provided below. For some autopilots, like the [Hex Cube](../flight_controller/pixhawk-2.md) and [PixRacer](../flight_controller/pixracer.md), all that is needed is a 1-1 8-pin JST-GH cable.

| Pin | Freefly GPS |
| --- | ----------- |
| 1   | VCC_5V      |
| 2   | GPS_RX      |
| 3   | GPS_TX      |
| 4   | I2C_SCL     |
| 5   | I2C_SDA     |
| 6   | BUTTON      |
| 7   | BUTTON_LED  |
| 8   | GND         |

## Specification

- u-blox ZED-F9P GPS Receiver
  - Ultracap backup power for fast (hot-start) restarts
  - EMI shield over receiver for improved EMI immunity
- IST8310 Magnetometer
- Safety-switch and safety LED
- RGB LEDs for status indication
  - NCP5623CMUTBG I2C Driver
- BMP388 Baro on I2C bus
- External, active antenna (Maxtena M7HCT)
  - SMA connector
- STM32 MCU for future CAN-based communication
  - FW updates through USB connector
- Connectivity:
  - USB-C
  - 2-way USB Switch to MCU and F9P
  - SMA for active antenna (20mA max)
  - 4-pin JST-GH CAN Bus (dronecode compliant)
  - 8-pin JST-GH UART/I2C -** Power:
  - Input from either (diode OR'd):
  - USB (5V)
  - CAN (4.7 to 25.2V)
  - (4.7 to 25.2V)
  - Power consumption <1W

## More Information

More information can be found on [Freefly's Wiki](https://freefly.gitbook.io/freefly-public/products/rtk-gps)
  