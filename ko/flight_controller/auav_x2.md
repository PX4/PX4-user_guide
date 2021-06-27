# AUAV-X2 자동조종장치 (단종됨)

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store.mrobotics.io/)에 문의하십시오.
:::

:::warning
이 비행 컨트롤러는 [단종](../flight_controller/autopilot_experimental.md)되었습니다.
:::

[AUAV<sup>&reg;</sup>](http://www.auav.com/) *AUAV-X2 자동조종장치*는 [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2** 오픈 하드웨어 디자인 기반입니다. PX4는 [NuttX](https://nuttx.apache.org/) OS에서 실행됩니다.

![AUAVX2_case2](../../assets/flight_controller/auav_x2/auavx2_case2.jpg)

## 요약

* 메인 시스템 온칩: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU : STM32F427VIT6 ARM 마이크로 컨트롤러 - 개정판 3
  * IO: STM32F100C8T6 ARM 마이크로 컨트롤러
* Sensors: 
  * MPU9250 9DOF
  * Invensense ICM-20608 6DOF
  * MEAS MS5611 barometer
* Dimensions/Weight 
  * 크기: 36mm x 50mm
  * 장착 지점 : 직경 30.5mm x 30.5mm 3.2mm
  * 무게 : 10.9g
* 역 전압 보호 기능이있는 전원 OR 회로도. 5V 전원 모듈이 필요합니다!

## Connectivity

* 2.54mm 헤더 :
* GPS (USART4)
* i2c
* RC 입력
* PPM 입력 
* Spektrum 입력
* RSSI 입력
* sBus 입력
* sBus 출력
* 전원 입력
* 부저 출력
* LED 출력
* 8 x Servo 출력
* 6 x Aux 출력
* USART7 (콘솔)
* USART8 (OSD)

## Availability

No longer in production. This has been superceded by the [mRo X2.1](mro_x2.1.md). mRobotics is the distributor for the AUAV Products from August 2017.

## 주요 링크

* [사용자 매뉴얼](http://arsovtech.com/wp-content/uploads/2015/08/AUAV-X2-user-manual-EN.pdf)
* [DIY Drones Post](http://diydrones.com/profiles/blogs/introducing-the-auav-x2-1-flight-controller)

## 배선 설명서

![AUAV-X2-basic-setup 3](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_3.png)

![AUAV-X2-basic-setup 2](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_2.jpg)

![AUAV-X2-basic-setup 1](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_1.png)

![AUAV-X2-airspeed-setup 3](../../assets/flight_controller/auav_x2/auav_x2_airspeed_setup_3.png)

## 회로도

The board is based on the [Pixhawk project](https://pixhawk.org/) **FMUv2** open hardware design.

* [FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Schematic and layout

:::note
As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware).
:::

## Serial Port Mapping

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | IO debug              |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |