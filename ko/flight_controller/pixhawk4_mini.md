---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/pixhawk4_mini
---

# Holybro Pixhawk 4 Mini (Discontinued)

:::warning PX4에서는 이 제품을 제조하지 않습니다. Contact the [manufacturer](https://holybro.com/) for hardware support or compliance issues.
:::

The _Pixhawk<sup>&reg;</sup> 4 Mini_ autopilot is designed for engineers and hobbyists who are looking to tap into the power of _Pixhawk 4_ but are working with smaller drones. _Pixhawk 4 Mini_ takes the FMU processor and memory resources from the _Pixhawk 4_ while eliminating interfaces that are normally unused. This allows the _Pixhawk 4 Mini_ to be small enough to fit in a 250mm racer drone.

_Pixhawk 4 Mini_ was designed and developed in collaboration with Holybro<sup>&reg;</sup> and Auterion<sup>&reg;</sup>. [Pixhawk](https://pixhawk.org/) **FMUv5** 설계를 기반으로 PX4 비행제어 소프트웨어를 실행에 최적화되었습니다.

![Pixhawk 4 미니](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 요약

- 메인 FMU 프로세서: STM32F765
  - 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
- 온보드 센서 :
  - 가속도/자이로: ICM-20689
  - Accel/Gyro: BMI055 or ICM20602
  - 자력계 : IST8310
  - 기압계: MS5611
- GPS : u-blox Neo-M8N GPS/GLONASS 수신기; 통합 자력계 IST8310
- 인터페이스:
  - 8 PWM 출력
  - FMU의 전용 PWM / 캡처 입력 4 개
  - CPPM 전용 RC 입력
  - 아날로그/PWM RSSI 입력이있는 Spektrum/DSM 및 S.Bus 전용 RC 입력
  - 범용 시리얼 포트 3개
  - I2C 포트 2개
  - SPI 버스 3개
  - CAN ESC용 CANBus 1개
  - 배터리 전압/전류에 대한 아날로그 입력
  - 2개의 추가 아날로그 입력
- 전원 시스템 :
  - 파워 브릭 입력 : 4.75 ~ 5.5V
  - USB 전원 입력: 4.75~5.25V
  - 서보 레일 입력: 0~24V
  - 최대 전류 감지 : 120A
- 중량 및 크기
  - 중량: 37.2g
  - 크기: 38x55x15.5mm
- 기타 특성:
  - 작동 온도: -40 ~ 85°c

Additional information can be found in the [_Pixhawk 4 Mini_ Technical Data Sheet](https://github.com/PX4/PX4-user_guide/raw/v1.14/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf).

## Where to Buy

Order from [Holybro](https://holybro.com/collections/autopilot-flight-controllers/products/pixhawk4-mini).

## 인터페이스

![Pixhawk 4 미니 인터페이스](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_interfaces.png)

:::warning
**RC IN**과 **PPM** 포트는 RC 수신기 전용입니다. 이 포트들에는 전원이 공급됩니다. 서보를 전원공급장치나 배터리(또는 연결된 수신기)에 절대 연결하지 마십시오.
:::

## 핀배열

Download _Pixhawk 4 Mini_ pinouts from [here](https://github.com/PX4/PX4-user_guide/raw/v1.14/assets/flight_controller/pixhawk4mini/pixhawk4mini_pinouts.pdf).

## 크기

![Pixhawk 4 미니 크기](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_dimensions.png)

## 정격 전압

_Pixhawk 4 Mini_ can have power supply redundancy — if two power sources are supplied. 전원 레일은 **POWER**와 **USB**입니다.

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

**정상 작동 최대 등급**

이러한 조건에서 전원은 아래의 순서대로 시스템에 전원을 공급하여야합니다.

1. **전원** (4.75V ~ 5.5V)
1. **USB** 입력 (4.75V ~ 5.25V)

**절대 최대 등급**

이러한 조건에서 시스템은 그대로 유지됩니다.

1. **POWER** 입력 (0V ~ 6V 손상되지 않음)
1. **USB** 입력 (0V ~ 6V 손상되지 않음)
1. 서보 입력 : **MAIN OUT**의 VDD_SERVO 핀 (0V ~ 24V 손상되지 않음)

## 조립 및 설정

The [_Pixhawk 4 Mini_ Wiring Quick Start](../assembly/quick_start_pixhawk4_mini.md) provides instructions on how to assemble required/important peripherals including GPS, Power Management Board, etc.

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) :

```
make px4_fmu-v5_default
```

## 디버그 포트

[PX4 시스템 콘솔](../debug/system_console.md)과 [SWD 인터페이스](../debug/swd_debug.md)는 **FMU 디버그** 포트에서 실행됩니다. In order to access these ports, the user must remove the _Pixhawk 4 Mini_ casing.

![Pixhawk 4 미니 FMU 디버그](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_fmu_debug.png)

이런 포트 모두 표준 시리얼 핀아웃을 가지고 있고 표준 FTDI 케이블 (3.3V, but it's 5V tolerant) 또는 [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)를 사용하여 연결할 수 있습니다. The pinout uses the standard [Pixhawk debug connector](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) pinout. 이 포트의 배선 방법은 [배선](../debug/system_console.md)편을 참고하십시오.

## 시리얼 포트 매핑

|  UART  |     장치     | QGC Parameter Description |  Port Label on FC  |
|:------:|:----------:|:-------------------------:|:------------------:|
| UART1  | /dev/ttyS0 |           GPS1            |     GPS Module     |
| USART2 | /dev/ttyS1 |          TELEM1           |       TELEM1       |
| USART3 | /dev/ttyS2 |          TELEM2           |        N/A         |
| UART4  | /dev/ttyS3 |       TELEM/SERIAL4       |     UART/l2C B     |
| USART6 | /dev/ttyS4 |            N/A            |       RC IN        |
| UART7  | /dev/ttyS5 |            N/A            |       Debug        |
| UART8  | /dev/ttyS6 |            N/A            | 연결되지 않음 (PX4IO 없음) |

## 주변 장치

- [디지털 대기속도 센서](https://holybro.com/products/digital-air-speed-sensor)
- [텔레메트리 라디오 모듈](../telemetry/README.md)
- [거리계/거리 센서](../sensor/rangefinders.md)

## 지원 플랫폼

모터와 서보는 [기체 정의서](../airframes/airframe_reference.md)에 지정된 순서대로 **MAIN OUT** 포트에 연결합니다. 이 참고사항은 모든 지원되는 기체 프레임의 출력 포트의 모터/서보 연결 리스트입니다. 프레임이 참고사항에 기재되어 있지 않다면, 올바른 유형의 "일반" 프레임을 사용하십시오.

:::warning
_Pixhawk 4 Mini_ does not have AUX ports. 이 보드는 8 개 이상의 포트가 필요하거나, 모터 또는 제어 표면에 AUX 포트를 사용하는 프레임에 사용할 수 없습니다. 비필수 주변 장치에 AUX를 사용하는 기체에 사용할 수 있습니다(예 : "RC AUX1 채널의 피드 스루").
:::

## 추가 정보

- [_Pixhawk 4 Mini_ Technical Data Sheet](https://github.com/PX4/PX4-user_guide/raw/v1.14/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf)
- [FMUv5 기준 설계 핀배열](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
