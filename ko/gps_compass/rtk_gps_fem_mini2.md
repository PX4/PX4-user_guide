# Femtones MINI2 수신기

[MINI2 수신기](http://www.femtomes.com)는 센티미터 레벨 포지셔닝을 위하여 빠르고 안정적인 RTK 초기화를 제공하는 RTK GPS 수신기입니다. 고정밀 위치 지정(예 : 내비게이션 및 매핑 등)이 필요한 애플리케이션을 위하여 개발되었습니다.

수신기는 직렬 포트 (UART)를 통하여 PX4에 연결되며, 표준 웹 브라우저를 사용하여 설정할 수 있습니다.

![MINI II Receiver](../../assets/hardware/gps/rtk_fem_miniII_receiver.jpg)

:::note
이더넷, CAN 및 USB용 PX4 드라이버는 현재 개발 중입니다.
:::

## 필수 펌웨어 옵션

장치 구매시 다음 펌웨어 옵션을 선택하여야 합니다.
- 5Hz, 10Hz, 20Hz
- INS
- HEADING
- OBS
- RTK
- BASE

## 구매처

판매 견적은 [Femtones](http://www.femtomes.com)에 문의하십시오.
- **전자메일:** [sales@femtomes.com](mailto:sales@femtomes.com)
- **전화:** +86-10-53779838

## 기능성 포트

![MINI II 1](../../assets/hardware/gps/rtk_fem_miniII_1.jpg)

## 배선

The [MINI2 Receiver](http://www.femtomes.com) is connected to a UART on the flight controller (GPS port) for data. To power the module you will need a separate 12V power supply. The pins on the 12-pin connector are numbered as shown below.

![MINI_II_2](../../assets/hardware/gps/rtk_fem_miniII_2.jpg)


## Configuration

For heading estimation the two antennas need to be on the same level and at least 30 cm apart from each other. The direction that they are facing does not matter as it can be configured with the [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) parameter.

Configure the serial port on which the [MINI2 Receiver](http://www.femtomes.com) will run using [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), and set the baud rate to 115200 using [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD).

Once configured the receiver is used in the same way as any other [RTK GPS](../gps_compass/rtk_gps.md) (i.e. with respect to the Survey-in process).


## Additional Information

The MINI2 incorporates the following components:

- [FB672](http://www.femtomes.com/en/FB672.php): Compact, dual antenna, dual frequency GNSS OEM board (delivers centimeter accurate position and precise heading).

  ![FB672](../../assets/hardware/gps/rtk_fem_fb_1.jpg)

- [FB6A0](http://www.femtomes.com/en/FB6A0.php): Compact, quadruple frequency GNSS OEM board (delivers centimeter-accurate positioning)

  ![FB6A0](../../assets/hardware/gps/rtk_fem_fb_2.jpg)

Detailed product instructions can be obtained on the official website or by contacting us.
