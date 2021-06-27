# Pixfalcon 비행 콘트롤러 (단종됨)

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://shop.holybro.com/)에 문의하십시오.
:::

:::warning
이 비행 컨트롤러는 [단종](../flight_controller/autopilot_experimental.md)되었습니다.
:::

Pixfalcon 자동조종장치([Holybro<sup>&reg;</sup>](http://www.holybro.com/)에서 설계)는 FPV 레이서에 적용하기 위하여 공간에 최적화된 [Pixhawk 1](../flight_controller/pixhawk.md) 설계에서 파생된 바이너리 호환 (FMUv2)입니다. 소형화를 위하여 가진 IO가 적습니다.

![Pixfalcon hero image](../../assets/hardware/hardware-pixfalcon.png)

## 요약

* 메인 시스템 온칩: [STM32F427](http://www.st.com/web/en/catalog/mmc/FM141/SC1169/SS1577/LN1789) 
  * CPU : 단정밀도 FPU의 180MHz ARM<sup>&reg;</sup> Cortexex<sup>&reg;</sup> M4
  * RAM : 256KB SRAM (L1)
* 페일세이프 시스템 온칩 : STM32F100 
  * CPU: 24 MHz ARM Cortex M3
  * RAM : 8KB SRAM
* GPS: u-blox<sup>&reg;</sup> M8 (번들)

### 연결성

* I2C 1개
* UART 2개(하나는 원격 측정/OSD 용, 흐름 제어 없음)
* 수동 오버라이드 기능이 있는 PWM 8개
* S.BUS / PPM 입력

## 구매처:

유통 업체 [Hobbyking<sup>&reg;</sup>](https://hobbyking.com/en_us/pixfalcon-micro-px4-autopilot-plus-micro-m8n-gps-and-mega-pbd-power-module.html)

하드웨어 옵션:

* Optical flow: PX4 Flow unit from manufacturer [Holybro](http://www.holybro.com/product/px4flow/)
* Digital Airspeed sensor from manufacturer [Holybro](http://www.holybro.com/product/digital-air-speed-sensor/) or distributor [Hobbyking](https://hobbyking.com/en_us/hkpilot-32-digital-air-speed-sensor-and-pitot-tube-set.html)
* On screen display with integrated Telemetry: 
  * [Hobbyking OSD + EU Telemetry (433 MHz)](https://hobbyking.com/en_us/micro-hkpilot-telemetry-radio-module-with-on-screen-display-osd-unit-433mhz.html)
* Pure Telemetry options: 
  * [Hobbyking Wifi Telemetry](https://hobbyking.com/en_us/apm-pixhawk-wireless-wifi-radio-module.html)
  * [HKPilot Micro Telemetry EU version (433 MHz)](https://hobbyking.com/en_us/hkpilot32-autonomous-vehicle-32bit-control-set-with-telemetry-and-gps-433mhz.html)
  * [HKPilot Micro Telemetry EU version (915 MHz)](https://hobbyking.com/en_us/hkpilot32-autonomous-vehicle-32bit-control-set-with-telemetry-and-gps-915mhz.html)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

    make px4_fmu-v2_default
    

## Debug Port

This board does not have a debug port (i.e it does not have a port for accessing the [System Console](../debug/system_console.md) or the [SWD interface](../debug/swd_debug.md) (JTAG).

Developers will need to solder wires to the board test pads for SWD, and to the STM32F4 (IC) TX and RX to get a console.

## Serial Port Mapping

| UART   | Device     | Port                     |
| ------ | ---------- | ------------------------ |
| UART1  | /dev/ttyS0 | IO Debug                 |
| USART2 | /dev/ttyS1 | TELEM1 (No flow control) |
| UART4  | /dev/ttyS2 | GPS                      |

<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->

## Key Links

* [User Manual](http://www.holybro.com/manual/pixfalcon11.pdf)