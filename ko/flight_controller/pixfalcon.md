---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/pixfalcon
---

# Pixfalcon 비행 콘트롤러 (단종됨)

:::warning
This flight controller has been [discontinued](../flight_controller/autopilot_experimental.md) and is no longer commercially available.
:::

:::warning PX4 does not manufacture this (or any) autopilot. Contact the [manufacturer](https://holybro.com/) for hardware support or compliance issues.
:::

The Pixfalcon autopilot (designed by [Holybro<sup>&reg;</sup>](https://holybro.com/)) is binary-compatible (FMUv2) derivative of the [Pixhawk 1](../flight_controller/pixhawk.md) design that has been optimized for space-constrained applications such as FPV racers. 소형화를 위하여 가진 IO가 적습니다.

![Pixfalcon 대표 이미지](../../assets/hardware/hardware-pixfalcon.png)

## 요약

- 메인 시스템 온칩: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789)
  - CPU : 단정밀도 FPU의 180MHz ARM<sup>&reg;</sup> Cortexex<sup>&reg;</sup>  M4
  - RAM : 256KB SRAM (L1)
- 페일세이프 시스템 온칩 : STM32F100
  - CPU: 24 MHz ARM Cortex M3
  - RAM : 8KB SRAM
- GPS: u-blox<sup>&reg;</sup> M8 (번들)

### 연결성

- I2C 1개
- UART 2개(하나는 원격 측정/OSD 용, 흐름 제어 없음)
- 수동 오버라이드 기능이 있는 PWM 8개
- S.BUS / PPM 입력

## 구매처:

유통 업체 [Hobbyking<sup>&reg;</sup>](https://hobbyking.com/en_us/pixfalcon-micro-px4-autopilot-plus-micro-m8n-gps-and-mega-pbd-power-module.html)

하드웨어 옵션:

- Optical flow: PX4 Flow unit from manufacturer [Holybro](https://holybro.com/products/px4flow)
- Digital Airspeed sensor from manufacturer [Holybro](https://holybro.com/products/digital-air-speed-sensor) or distributor [Hobbyking](https://hobbyking.com/en_us/hkpilot-32-digital-air-speed-sensor-and-pitot-tube-set.html)
- 텔레메트리가 통합 화면 디스플레이
  - [Hobbyking OSD + EU 텔레메트리 (433 MHz)](https://hobbyking.com/en_us/micro-hkpilot-telemetry-radio-module-with-on-screen-display-osd-unit-433mhz.html)
- 순수 텔레메트리 옵션:
  - [Hobbyking 와이파이 텔레메트리](https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html)
  - [SIK Radios](../telemetry/sik_radio.md)

## 펌웨어 빌드

::::tip 대부분의 사용자들은 펌웨어를 빌드할 필요는 없습니다. It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

이 대상에 대한 [PX4 빌드](../dev_setup/building_px4.md) 방법 :

```
make px4_fmu-v2_default
```

## 디버그 포트

이 보드에는 디버그 포트가 없습니다. 즉, [시스템 콘솔](../debug/system_console.md) 이나 [SWD 인터페이스](../debug/swd_debug.md) (JTAG)에 접속 포트가 존재하지 않습니다.

개발자는 SWD용 보드 테스트 패드와 STM32F4 (IC) TX와 RX에 와이어를 납땜하여 콘솔을 획득할 수 있습니다.

## 시리얼 포트 매핑

| UART   | 장치         | 포트             |
| ------ | ---------- | -------------- |
| UART1  | /dev/ttyS0 | IO 디버그         |
| USART2 | /dev/ttyS1 | TELEM1 (흐름 제어) |
| UART4  | /dev/ttyS2 | GPS            |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
