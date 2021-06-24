# mRo Control Zero F7 비행 콘트롤러

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store.mrobotics.io/)에 문의하십시오.
:::

*mRo Control Zero F7<sup>&reg;</sup>*는 mRo의 새로운 비행 컨트롤러입니다.

![mRo Control Zero F7](../../assets/flight_controller/mro_control_zero_f7/mro_control_zero_f7.jpg)

매우 우수한 트리플 IMU 상용 등급 비행 컨트롤러입니다. 8x PWM 출력(DShot 가능), 3x IMU, 1x 자력계, 1x 기압 센서 (고도계), 6x UART 및 SD 카드가 모두 32mm x 20mm PCB에 포장되어 있습니다. PWM은 양방향이고 EMI로 보호되며 레벨이 5V 로직 레벨로 이동합니다. 모두 전면 및 후면 30 핀 Molex Pico Clasp 커넥터를 사용하여 액세스합니다. 내구성이 강한 플라스틱 케이스, 컨 포멀 보드 코팅, 온도 보정 옵션이 포함되어 있습니다.


:::note
이 비행 컨트롤러는 [제조업체의 지원](../flight_controller/autopilot_manufacturer_supported.md)을 받을 수 있습니다.
:::


## 주요 특징

- 마이크로 프로세서:
  - FPU가있는 32 비트 STM32F777 코어 텍스<sup>&reg;</sup> M4 코어. 3
  - 216 MHz/512 KB RAM/2 MB 플래시
  - F-RAM Cypress MF25V02-G 256Kbit 비휘발성 메모리(RAM만큼 빠른 플래시 메모리)
- 센서:
  - [Bosch BMI088](https://www.bosch-sensortec.com/bst/products/all_products/bmi088_1) 3 축 가속도계/자이로스코프 (내부 진동 감쇠)
  - [Invensense ICM-20602](https://www.invensense.com/products/motion-tracking/6-axis/icm-20602/) 3 축 가속도계/자이로스코프
  - [Invensense ICM-20948](https://www.invensense.com/products/motion-tracking/9-axis/icm-20948/) 3 축 가속도계/자이로스코프/자력계
  - [Infineon DPS310 기압계](https://www.infineon.com/cms/en/product/sensor/pressure-sensors/pressure-sensors-for-iot/dps310/)(부드럽고 감광성이 없음)

- 인터페이스:
  - 6x UART(총 직렬 포트), 3x(HW 흐름 제어 포함), 1x FRSky Telemetry(D 또는 X 유형), 1x 콘솔 및 1x GPS + I2C
  - PWM 출력(모든 DShot 가능) 8개
  - CAN 1개
  - I2C 1개
  - SPI 1개
  - Spektrum DSM/DSM2/DSM-X® Satellite 호환 입력 및 바인딩
  - Futaba S.BUS® & S.BUS2® compatible input
  - FRSky Telemetry port output
  - Graupner SUMD
  - Yuneec ST24
  - PPM sum input signal
  - 1x JTAG (TC2030 Connector)
  - 1x RSSI (PWM or voltage) input
  - Tricolor LED

- Weight and Dimensions (Uncased):
  - Weight: 5.3g (0.19oz)
  - Width: 20mm (0.79")
  - Length: 32mm (1.26")

- Power System:
  - 3x Ultra low noise LDO voltage regulator



## Purchase

* [mRo Control Zero](https://store.mrobotics.io/mRo-Control-Zero-F7-p/mro-ctrl-zero-f7.htm)



## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:
```
make mro_ctrl-zero-f7
```


## Debug Ports

### Console Port

The [PX4 System Console](../debug/system_console.md) runs on `USART7` using the pins listed below. This is a standard serial pinout, designed to connect to a [3.3V FTDI](https://www.digikey.com/product-detail/en/TTL-232R-3V3/768-1015-ND/1836393) cable (5V tolerant).

| mRo control zero f7 |             | FTDI                 |
| ------------------- | ----------- | -------------------- |
| 17                  | USART7 Tx   | 5 | FTDI RX (yellow) |
| 19                  | USART7 Rx   | 4 | FTDI TX (orange) |
| 6                   | USART21 GND | 1 | FTDI GND (black) |


### SWD Port

The [SWD port](../debug/swd_debug.md) (JTAG) for FMU debugging is a TC2030 debug connector, as shown below.

![mro swd port](../../assets/flight_controller/mro_control_zero_f7/mro_control_zero_f7_swd.jpg)

You can use the [Tag Connect](https://www.tag-connect.com/) cable [TC2030 IDC NL](https://www.tag-connect.com/product/tc2030-idc-nl) below (with associated [retaining clip](https://www.tag-connect.com/product/tc2030-clip-retaining-clip-board-for-tc2030-nl-cables)) to attach to either a BlackMagic probe or a ST-LINK V2 debugger.

![tc2030 idc nl cable](../../assets/flight_controller/mro_control_zero_f7/tc2030_idc_nl.jpg)

There is also an [ARM20-CTX 20-Pin to TC2030-IDC adapter](https://www.tag-connect.com/product/arm20-ctx-20-pin-to-tc2030-idc-adapter-for-cortex) that can be used with other debug probes.

## Pinouts

![mRo Control Zero F7](../../assets/flight_controller/mro_control_zero_f7/mro_control_pinouts.jpg)


## Serial Port Mapping

| UART   | Device     | Port                                                            |
| ------ | ---------- | --------------------------------------------------------------- |
| USART2 | /dev/ttyS0 | TELEM1 (flow control)                                           |
| USART3 | /dev/ttyS1 | TELEM2 (flow control)                                           |
| UART4  | /dev/ttyS2 | GPS1                                                            |
| USART6 | /dev/ttyS3 | Flex port (can be configured as SPI or UART with Flow Control). |
| UART7  | /dev/ttyS4 | CONSOLE                                                         |
| UART8  | /dev/ttyS5 | Free serial port (typically for FrSky telemetry)                |


<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->
<!-- https://github.com/PX4/PX4-Autopilot/blob/master/boards/mro/ctrl-zero-f7/nuttx-config/nsh/defconfig#L202-L207 -->



## Further Information

- [Introducing the new mRo Control Zero Autopilot](https://mrobotics.io/introducing-the-new-mro-control-zero-autopilot/) (blog)
- [Quick Start Guide](https://mrobotics.io/mrocontrolzero/)

