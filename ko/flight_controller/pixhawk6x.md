# Holybro Pixhawk 6X

:::warning
PX4에서는 이 자동 항법 장치를 제조하지 않습니다.
소형화를 위하여 가진 IO가 적습니다.
:::

_Pixhawk 6X_<sup>&reg;</sup> is the latest update to the successful family of Pixhawk® flight controllers designed and made in collaboration with Holybro<sup>&reg;</sup> and the PX4 team.

It is based on the [Pixhawk​​® Autopilot FMUv6X Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-012%20Pixhawk%20Autopilot%20v6X%20Standard.pdf), [Autopilot Bus Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf), and [Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).

Equipped with a high performance H7 Processor, modular design, triple redundancy, temperature-controlled IMU board, isolated sensor domains, delivering incredible performance, reliability, and flexibility.

<img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_hero_upright.png" width="230px" title="Pixhawk6X Upright Image" /> <img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_exploded_diagram.png" width="400px" title="Pixhawk6X Exploded Image" />

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 소개

Inside the Pixhawk®​ 6X, you can find an STMicroelectronics​® based STM32H753, paired with sensor technology from Bosch®​​, InvenSense®​,​ giving you flexibility and reliability for controlling any autonomous vehicle, suitable for both academic and commercial applications.

The Pixhawk® 6X's H7 microcontroller contain the Arm® Cortex®-M7 core running up to 480 MHz, has 2MB flash memory and 1MB RAM. The PX4 Autopilot takes advantage of the increased power and RAM. Thanks to the updated processing power, developers can be more productive and efficient with their development work, allowing for complex algorithms and models.

The FMUv6X open standard includes high-performance, low-noise IMUs on board, designed for better stabilization. Triple redundant IMU & double redundant barometer on separate buses. When the PX4 Autopilot detects a sensor failure, the system seamlessly switches to another to maintain flight control reliability.

An independent LDO powers every sensor set with independent power control. A vibration isolation System to filter out high-frequency vibration and reduce noise to ensure accurate readings, allowing vehicles to reach better overall flight performances.

External sensor bus (SPI5) has two chip select lines and data-ready signals for additional sensors and payload with SPI-interface, and with an integrated Microchip Ethernet PHY, high-speed communication with mission computers via ethernet is now possible.

The Pixhawk®​ 6X is perfect for developers at corporate research labs, startups, academics (research, professors, students), and commercial application.

## Key Design Points

- High performance STM32H753 Processor
- Modular flight controller: separated IMU, FMU, and Base system connected by a 100-pin & a 50-pin Pixhawk®​ Autopilot Bus connector.
- Redundancy: 3x IMU sensors & 2x Barometer sensors on separate buses
- Triple redundancy domains: Completely isolated sensor domains with separate buses and separate power control
- Newly designed vibration isolation system to filter out high frequency vibration and reduce noise to ensure accurate readings
- Ethernet interface for high-speed mission computer integration
- IMUs are temperature-controlled by onboard heating resistors, allowing optimum working temperature of IMUs&#x20;

### Processors & Sensors

- FMU Processor: STM32H753
  - 32 Bit Arm® Cortex®-M7, 480MHz, 2MB flash memory, 1MB RAM
- IO 프로세서: STM32F100
  - 32 비트 Arm® Cortex®-M3, 24MHz, 8KB SRAM
- 내장 센서 :
  - Accel/Gyro: ICM-20649 or BMI088
  - Accel/Gyro: ICM-42688-P
  - Accel/Gyro: ICM-42670-P
  - Mag: BMM150
  - Barometer: 2x BMP388

### Electrical data

- Voltage Ratings:
  - 최대 입력 전압: 6V
  - USB Power Input: 4.75\~5.25V
  - Servo Rail Input: 0\~36V
- Current Ratings:
  - `TELEM1` output current limiter: 1.5A
  - All other port combined output current limiter: 1.5A

### Mechanical data

- 크기
  - Flight Controller Module: 38.8 x 31.8 x 14.6mm
  - Standard Baseboard: 52.4 x 103.4 x 16.7mm
  - Mini Baseboard: 43.4 x 72.8 x 14.2 mm
- 중량
  - Flight Controller Module: 23g
  - Standard Baseboard: 51g
  - Mini Baseboard: 26.5g

### 인터페이스

- 16- PWM servo outputs
- R/C input for Spektrum / DSM
- Dedicated R/C input for PPM and S.Bus input
- Dedicated analog / PWM RSSI input and S.Bus output
- 범용 시리얼 포트 4개
  - 전체 흐름 제어 3개
  - 1 with separate 1.5A current limit (Telem1)
  - 1 with I2C and additional GPIO line for external NFC reader
- 2 GPS ports
  - 1 full GPS plus Safety Switch Port
  - 1 basic GPS port
- 1 I2C port
- 1 Ethernet port
  - Transformerless Applications
  - 100Mbps
- 1 SPI bus
  - 2 chip select lines
  - 2 data-ready lines
  - 1 SPI SYNC line
  - 1 SPI reset line
- 2 CAN Buses for CAN peripheral
  - CAN Bus has individual silent controls or ESC RX-MUX control
- 2 Power input ports with SMBus

  - 1 AD & IO port
  - 2개의 추가 아날로그 입력
  - 1 PWM/Capture input
  - 2 Dedicated debug and GPIO lines

- 기타 특성:
  - Operating & storage temperature: -40 ~ 85°c

## 구매처

Order from [Holybro](https://holybro.com/products/pixhawk-6x).

## 조립 및 설정

The [Pixhawk 6X Wiring Quick Start](../assembly/quick_start_pixhawk6x.md) provides instructions on how to assemble required/important peripherals including GPS, Power Module etc.

## 연결

Sample Wiring Diagram ![Pixhawk 6X Wiring Overview](../../assets/flight_controller/pixhawk6x/pixhawk6x_wiring_diagram.png)

## 핀배열

- [Holybro Pixhawk Baseboard Pinout](https://docs.holybro.com/autopilot/pixhawk-6x/pixhawk-baseboard-pinout)
- [Holybro Pixhawk Mini-Baseboard Pinout](https://docs.holybro.com/autopilot/pixhawk-6x/pixhawk-mini-baseboard-pinout)

참고:

- The [camera capture pin](../camera/fc_connected_camera.md#camera-capture-configuration) (`PI0`) is pin 2 on the AD&IO port, marked above as `FMU_CAP1`.

## 시리얼 포트 매핑

| UART   | 장치         | 포트          |
| ------ | ---------- | ----------- |
| USART1 | /dev/ttyS0 | GPS         |
| USART2 | /dev/ttyS1 | TELEM3      |
| USART3 | /dev/ttyS2 | 디버깅 콘솔      |
| UART4  | /dev/ttyS3 | UART4 & I2C |
| UART5  | /dev/ttyS4 | TELEM2      |
| USART6 | /dev/ttyS5 | PX4IO/RC    |
| UART7  | /dev/ttyS6 | TELEM1      |
| UART8  | /dev/ttyS7 | GPS2        |

## 크기

[Pixhawk 6X Dimensions](https://docs.holybro.com/autopilot/pixhawk-6x/dimensions)

## 정격 전압

_Pixhawk 6X_ can be triple-redundant on the power supply if three power sources are supplied. **POWER1**, **POWER2** 또는 **USB**중 하나에서 전원을 공급하여야 합니다. The **POWER1** & **POWER2** ports on the Pixhawk 6X uses the 6 circuit [2.00mm Pitch CLIK-Mate Wire-to-Board PCB Receptacle](https://www.molex.com/molex/products/part-detail/pcb_receptacles/5024430670).

**정상 작동 최대 정격 전압**

이러한 조건에서 전원은 아래의 순서대로 시스템에 전원을 공급하여야합니다.

1. **POWER1**과 **POWER2** 입력 (4.9V ~ 5.5V)
1. **USB** 입력(4.75V ~ 5.25V)

**절대 최대 정격 전압**

아래의 조건에서 시스템은 전원을 사용하지 않지만(작동하지 않음), 그대로 유지됩니다.

1. **POWER1**과 **POWER2** 입력 (작동 범위 4.1V ~ 5.7V, 0V ~ 10V 손상되지 않음)
1. **USB** 입력(작동 범위: 4.1V ~ 5.7V, 비손상 범위: 0V ~ 6V)
1. 서보 입력 : **FMU PWM OUT** 및 **I/O PWM OUT**의 VDD_SERVO 핀 (0V ~ 42V 손상되지 않음)

**Voltage monitoring**

Digital I2C battery monitoring is enabled by default (see [Quickstart > Power](../assembly/quick_start_pixhawk6x.md#power)).

::: info
Analog battery monitoring via an ADC is not supported on this particular board, but may be supported in variations of this flight controller with a different baseboard.
:::

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :

```
make px4_fmu-v6x_default
```

<a id="debug_port"></a>

## 디버그 포트

[PX4 시스템 콘솔](../debug/system_console.md)과 [SWD 인터페이스](../debug/swd_debug.md)는 **FMU 디버그** 포트에서 실행됩니다.

The pinouts and connector comply with the [Pixhawk Debug Full](../debug/swd_debug.md#pixhawk-debug-full) interface defined in the [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) interface (JST SM10B connector).

| 핀        | 신호               | 전압    |
| -------- | ---------------- | ----- |
| 1 (적)    | `Vtref`          | +3.3V |
| 2 (흑)    | Console TX (OUT) | +3.3V |
| 3 (흑)    | Console RX (IN)  | +3.3V |
| 4 (흑)    | `SWDIO`          | +3.3V |
| 5 (흑)    | `SWCLK`          | +3.3V |
| 6 (흑)    | `SWO`            | +3.3V |
| 7 (흑)    | NFC GPIO         | +3.3V |
| 8 (blk)  | PH11             | +3.3V |
| 9 (blk)  | nRST             | +3.3V |
| 10 (blk) | `GND`            | GND   |

For information about using this port see:

- [SWD Debug Port](../debug/swd_debug.md)
- [PX4 System Console](../debug/system_console.md) (Note, the FMU console maps to USART3).

## 주변 장치

- [디지털 대기속도 센서](https://holybro.com/products/digital-air-speed-sensor)
- [텔레메트리 라디오 모듈](https://holybro.com/collections/telemetry-radios?orderby=date)
- [거리계/거리 센서](../sensor/rangefinders.md)

## 지원 플랫폼 및 기체

일반 RC 서보 또는 Futaba S-Bus 서보로 제어 가능한 모든 멀티콥터/비행기/로버 또는 보트. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## 추가 정보

- [Holybro Docs](https://docs.holybro.com/) (Holybro)
- [Pixhawk 6X 배선 퀵 스타트](../assembly/quick_start_pixhawk6x.md)
- [PM02D Power Module](../power_module/holybro_pm02d.md)
- [PM03D Power Module](../power_module/holybro_pm03d.md)
- [Pixhawk Autopilot FMUv6X Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-012%20Pixhawk%20Autopilot%20v6X%20Standard.pdf).
- [Pixhawk Autopilot FMUv5X 버스 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf).
- [Pixhawk 커넥터 표준](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).
