# Автопілот AUAV-X2 (припинено)

<Badge type="error" text="Discontinued" />

:::warning
Цей політний контролер був [знятий з виробництва](../flight_controller/autopilot_experimental.md) і більше не продається комерційно.
:::

:::warning PX4 не виробляє цей (або будь-який) автопілот. Зверніться до [виробника](https://store.mrobotics.io/) щодо питань технічної підтримки або відповідності вимогам.
:::

Автопілот [AUAV<sup>®</sup>](http://www.auav.com/) _AUAV-X2_ базується на відкритому апаратному дизайні [Pixhawk<sup>&reg;</sup>-project](https://pixhawk.org/) **FMUv2**. Він виконує PX4 на ОС [NuttX](https://nuttx.apache.org/).

![AUAVX2_case2](../../assets/flight_controller/auav_x2/auavx2_case2.jpg)

## Короткий опис

- Main System-on-Chip: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  - CPU: STM32F427VIT6 ARM microcontroller - Revision 3
  - IO: STM32F100C8T6 ARM microcontroller
- Sensors:
  - Invensense MPU9250 9DOF
  - Invensense ICM-20608 6DOF
  - MEAS MS5611 barometer
- Dimensions/Weight
  - Size: 36mm x 50mm
  - Mounting Points: 30.5mm x 30.5mm 3.2mm diameter
  - Weight: 10.9g
- Power OR-ing schematic with reverse voltage protection. 5V power module is required!

## Connectivity

- 2.54mm headers:
- GPS (USART4)
- i2c
- RC input
- PPM input
- Spektrum input
- RSSI input
- sBus input
- sBus output
- Power input
- Buzzer output
- LED output
- 8 x Servo outputs
- 6 x Aux outputs
- USART7 (Console)
- USART8 (OSD)

## Availability

No longer in production. This has been superseded by the [mRo X2.1](mro_x2.1.md). mRobotics is the distributor for the AUAV Products from August 2017.

## Key Links

- [User Manual](http://arsovtech.com/wp-content/uploads/2015/08/AUAV-X2-user-manual-EN.pdf)
- [DIY Drones Post](http://diydrones.com/profiles/blogs/introducing-the-auav-x2-1-flight-controller)

## Wiring Guide

![AUAV-X2-basic-setup 3](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_3.png)

![AUAV-X2-basic-setup 2](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_2.jpg)

![AUAV-X2-basic-setup 1](../../assets/flight_controller/auav_x2/auav_x2_basic_setup_1.png)

![AUAV-X2-airspeed-setup 3](../../assets/flight_controller/auav_x2/auav_x2_airspeed_setup_3.png)

## Schematics

The board is based on the [Pixhawk project](https://pixhawk.org/) **FMUv2** open hardware design.

- [FMUv2 + IOv2 schematic](https://raw.githubusercontent.com/PX4/Hardware/master/FMUv2/PX4FMUv2.4.5.pdf) -- Schematic and layout

::: info As a CC-BY-SA 3.0 licensed Open Hardware design, all schematics and design files are [available](https://github.com/PX4/Hardware).
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
