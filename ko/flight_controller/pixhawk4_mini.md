---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/pixhawk4_mini
---

# Pixhawk 4 미니

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

*Pixhawk<sup>&reg;</sup> 4 미니* 자동조종장치는 *Pixhawk 4*을 이용하여 소규모 작업이 필요한 엔지니어와 애호가를 위해 설계되었습니다. *Pixhawk 4 미니*는 *Pixhawk 4*에서 FMU 프로세서와 메모리 리소스에서 일반적으로 사용되지 않는 인터페이스를 제거합니다. *Pixhawk 4 미니*는 250mm 레이싱 드론에 장착이 가능한 소형 컨트롤러입니다.

*Pixhawk 4 미니*는 Holybro<sup>&reg;</sup>와 Auterion<sup>&reg;</sup>에서 공동으로 설계개발하였습니다. [Pixhawk](https://pixhawk.org/) **FMUv5** 설계를 기반으로 PX4 비행제어 소프트웨어를 실행에 최적화되었습니다.

![Pixhawk 4 미니](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_iso_1.png)

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 요약

* 메인 FMU 프로세서: STM32F765
  * 32 Bit Arm® Cortex®-M7, 216MHz, 2MB memory, 512KB RAM
* 온보드 센서 :
  * 가속도/자이로: ICM-20689
  * Accel/Gyro: BMI055 or ICM20602
  * 자력계 : IST8310
  * 기압계: MS5611
* GPS : u-blox Neo-M8N GPS/GLONASS 수신기; 통합 자력계 IST8310
* 인터페이스:
  * 8 PWM 출력
  * FMU의 전용 PWM / 캡처 입력 4 개
  * CPPM 전용 RC 입력
  * 아날로그/PWM RSSI 입력이있는 Spektrum/DSM 및 S.Bus 전용 RC 입력
  * 범용 시리얼 포트 3개
  * I2C 포트 2개
  * SPI 버스 3개
  * CAN ESC용 CANBus 1개
  * 배터리 전압/전류에 대한 아날로그 입력
  * 2개의 추가 아날로그 입력
* 전원 시스템 :
  * 파워 브릭 입력 : 4.75 ~ 5.5V
  * USB 전원 입력: 4.75~5.25V
  * 서보 레일 입력: 0~24V
  * 최대 전류 감지 : 120A
* 중량 및 크기
  * 중량: 37.2g
  * 크기: 38x55x15.5mm
* 기타 특성:
  * 작동 온도: -40 ~ 85°c

추가 정보는 [*Pixhawk 4 미니* 기술 데이터 시트](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf)를 참고하십시오.

## 구매처

[Holybro](https://shop.holybro.com/pixhawk4-mini_p1120.html)에서 주문 가능 합니다.

## 인터페이스

![Pixhawk 4 미니 인터페이스](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_interfaces.png)

:::warning
**RC IN**과 **PPM** 포트는 RC 수신기 전용입니다. 이 포트들에는 전원이 공급됩니다. 서보를 전원공급장치나 배터리(또는 연결된 수신기)에 절대 연결하지 마십시오.
:::


## 핀배열

*Pixhawk 4 미니* 핀배열은 [여기](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4mini/pixhawk4mini_pinouts.pdf)에서 다운로드 하십시오.

## 크기

![Pixhawk 4 미니 크기](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_dimensions.png)

## 정격 전압
*Pixhawk 4 미니*는 두 개의 전원이 공급되는 경우에도 전원 공급의 중복성을 가질 수 있습니다. 전원 레일은 **POWER**와 **USB**입니다.

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

[*Pixhawk 4 미니* 배선 개요](../assembly/quick_start_pixhawk4_mini.md)은 GPS, 전원 관리 보드 등을 포함하여 중요 주변기기를 조립방법을 설명합니다.


## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) :
```
make px4_fmu-v5_default
```

## 디버그 포트

[PX4 시스템 콘솔](../debug/system_console.md)과 [SWD 인터페이스](../debug/swd_debug.md)는 **FMU 디버그** 포트에서 실행됩니다. 이 포트에 액세스하려면 * Pixhawk 4 미니* 케이스를 제거하여야 합니다.

![Pixhawk 4 미니 FMU 디버그](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_fmu_debug.png)

이런 포트 모두 표준 시리얼 핀아웃을 가지고 있고 표준 FTDI 케이블 (3.3V, but it's 5V tolerant) 또는 [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)를 사용하여 연결할 수 있습니다. The pinout uses the standard [Pixhawk debug connector](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) pinout. 이 포트의 배선 방법은 [배선](../debug/system_console.md)편을 참고하십시오.


## 시리얼 포트 매핑

| UART   | 장치         | 포트                         |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | GPS                        |
| USART2 | /dev/ttyS1 | TELEM1 (흐름 제어)             |
| USART3 | /dev/ttyS2 | TELEM2 (흐름 제어)             |
| UART4  | /dev/ttyS3 | TELEM4                     |
| USART6 | /dev/ttyS4 | TX는 SBUS_RC 커넥터의 RC 입력입니다. |
| UART7  | /dev/ttyS5 | 디버그 콘솔                     |
| UART8  | /dev/ttyS6 | 연결되지 않음 (PX4IO 없음)         |


<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->


## 주변 장치

* [디지털 대기속도 센서](https://store-drotek.com/848-sdp3x-airspeed-sensor-kit-sdp33.html)
* [텔레메트리 라디오 모듈](../telemetry/README.md)
* [거리계/거리 센서](../sensor/rangefinders.md)


## 지원 플랫폼
모터와 서보는 [기체 정의서](../airframes/airframe_reference.md)에 지정된 순서대로 **MAIN OUT** 포트에 연결합니다. 이 참고사항은 모든 지원되는 기체 프레임의 출력 포트의 모터/서보 연결 리스트입니다. 프레임이 참고사항에 기재되어 있지 않다면, 올바른 유형의 "일반" 프레임을 사용하십시오.

:::warning
*Pixhawk 4 미니*에는 AUX 포트가 없습니다. 이 보드는 8 개 이상의 포트가 필요하거나, 모터 또는 제어 표면에 AUX 포트를 사용하는 프레임에 사용할 수 없습니다. 비필수 주변 장치에 AUX를 사용하는 기체에 사용할 수 있습니다(예 : "RC AUX1 채널의 피드 스루").
:::

## 추가 정보

- [*Pixhawk 4 미니* 기술 데이터 시트](https://github.com/PX4/PX4-user_guide/raw/main/assets/flight_controller/pixhawk4mini/pixhawk4mini_technical_data_sheet.pdf)
- [FMUv5 기준 설계 핀배열](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165).
