# Trimble MB-Two

[Trimble MB-Two RTK GPS 수신기](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx)는 베이스 또는 로버로 구성할 수있는 하이엔드 듀얼 주파수 [RTK GPS 모듈](../gps_compass/rtk_gps.md)입니다.

정확한 위치 정보를 제공하는 것만 아니라, MB-Two는 방향 각도를 추정할 수 있습니다 (이중 안테나 지원이 있음). 이것은 금속 구조물 근처에서 비행시 나침반 정보가 부정확한 상황에서 매우 유용합니다.

![MB-Two Hero image](../../assets/hardware/gps/rtk_trimble_two_gnss_hero.jpg)

## 필수 펌웨어 옵션

장치 구매시 다음 펌웨어 옵션을 선택하여야 합니다.

- \[X\] \[2\] \[N\] \[G\] \[W\] \[Y\] \[J\] : 20Hz 위치 업데이트 및 RTK 지원, 수평 1cm 및 수직 2cm 위치 정확도
- \[L\] LBAND
- \[D\] DUO - 이중 안테나 방향각
- \[B\] BEIDOU + \[O\] GALILEO, 필요시

## 안테나 케이블

The Trimble MB-Two requires two dual-frequency (L1/L2) antennas. A good example is the [Maxtenna M1227HCT-A2-SMA](http://www.maxtena.com/products/helicore/m1227hct-a2-sma/) (which can be bought, for instance, from [Farnell](https://uk.farnell.com/maxtena/m1227hct-a2-sma/antenna-1-217-1-25-1-565-1-61ghz/dp/2484959)).

The antenna connector type on the device is MMCX. Suitable cables for the above antennas (SMA connector) can be found here:

- [30 cm version](https://www.digikey.com/products/en?mpart=415-0073-012&v=24)
- [45 cm version](https://www.digikey.com/products/en?mpart=415-0073-018&v=24)

## Wiring and Connections

The Trimble MB-Two is connected to a UART on the flight controller (GPS port) for data.

To power the module you will need a separate 3.3V power supply (the maximum consumption is 360mA).

:::note
The module cannot be powered from a Pixhawk.
:::

The pins on the 28-pin connector are numbered as shown below:

![MB-Two Pinout](../../assets/hardware/gps/rtk_trimble_two_gnss_pinouts.jpg)

| Pin | Name     | Description                                          |
| --- | -------- | ---------------------------------------------------- |
| 6   | Vcc 3.3V | Power supply                                         |
| 14  | GND      | Connect to power the supply and GND of the Autopilot |
| 15  | TXD1     | Connect to RX of the Autopilot                       |
| 16  | RXD1     | Connect to TX of the Autopilot                       |

## Configuration

First set the GPS protocol to Trimble ([GPS_x_PROTOCOL=3](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL)).

For heading estimation the two antennas need to be on the same level and at least 30 cm apart from each other. The direction that they are facing does not matter as it can be configured with the [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) parameter.

:::note
The `GPS_YAW_OFFSET` is the angle made by the *baseline* (the line between the two GPS antennas) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)).
:::

[Configure the serial port](../peripherals/serial_configuration.md) on which the Trimple will run using [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), and set the baud rate to 115200 using [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD).

To activate heading fusion for the attitude estimation, set the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter to enable *GPS yaw fusion*.

:::note
See also: [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)
:::