# Pixhawk 시리즈

[Pixhawk<sup>&reg;</sup>](https://pixhawk.org/)는 학업용/취미 및 산업계에서 쉽게 사용할 수 있는 저비용 고급 *자동조종 하드웨어 설계*를 제공하는 독립적인 개방형 하드웨어 프로젝트입니다.

Pixhawk는 PX4용 기준 하드웨어 플랫폼이며 [NuttX](https://nuttx.apache.org/) OS에서 PX4를 실행합니다.

제조업체는화물 운반에서 1인칭 시점(FPV) 레이서에 이르는 애플리케이션에 최적화 된 폼 팩터를 사용하여 개방형 디자인을 기반으로 다양한 보드를 제조하였습니다.

:::tip
계산집약적인 작업(예 : 컴퓨터 비전)에는 보조 컴퓨터(예: [라즈베리파이 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md))나 통합 보조 솔루션 플랫폼이 필요합니다.
:::

## 주요 장점

*Pixhawk 시리즈* 컨트롤러의 주요 장점은 다음과 같습니다.

* 소프트웨어 지원 - PX4 기준 하드웨어로서 가장 잘 관리되는 보드입니다.
* 장착 가능한 하드웨어 주변 장치의 유연성.
* 고품질
* 폼 팩터 측면에서 정밀하게 수정할 수 있습니다.
* 널리 사용되어 잘 테스트되고 안정적입니다.
* *QGroundControl* (최종 사용자 친화적)을 통한 최신 펌웨어 자동 업데이트.

<span id="recommended"></span>

## 지원 보드

PX4 프로젝트는 [Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md)를 기준 하드웨어로 사용합니다. Pixhawk 표준(상표 사용 포함)과 호환는 컨트롤러입니다.

:::note PX4 유지관리 테스트팀은 표준 보드를 유지 관리하고 지원합니다.
:::

PX4 프로젝트에서 지원하는 보드 목록은 다음과 같습니다.

* [Holybro Pixhawk 4](../flight_controller/pixhawk4.md) (FMUv5)
* [Holybro Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) (FMUv5)
* [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md) (FMUv4)
* [mRo Pixracer](../flight_controller/pixracer.md) (FMUv4)
* [CUAV Pixhack v3](../flight_controller/pixhack_v3.md) (FMUv3)
* [Hex Cube Black](../flight_controller/pixhawk-2.md) (FMUv3)
* [mRo Pixhawk](../flight_controller/mro_pixhawk.md) (FMUv2)
* [Holybro pix32](../flight_controller/holybro_pix32.md) (FMUv2)
* [Holybro Pixhawk Mini](../flight_controller/pixhawk_mini.md) (FMUv2)

사양을 준수하지 않는 Pixhawk 유사 보드는 [제조업체에서 지원](../flight_controller/autopilot_manufacturer_supported.md), [실험/중단](../flight_controller/autopilot_experimental.md)하거나 지원되지 않을 수 있습니다.

이 섹션의 나머지 부분에서는 Pixhawk 시리즈에 대해 조금 더 설명하지만 반드시 읽어야하는 것은 아닙니다.

## 배경

[Pixhawk 프로젝트](https://pixhawk.org/)는 구성 요소 세트(CPU, 센서 등)와 해당 연결/핀 매핑을 정의하는 회로도로 개방형 하드웨어 설계합니다.

제조업체는 [개방형 디자인](https://github.com/pixhawk/Hardware)을 사용하여 특정 시장 또는 사용 사례 (개방형 사양의 일부가 아닌 물리적 레이아웃/폼 팩터)에 가장 적합한 제품을 제조합니다. 동일한 디자인의 보드는 바이너리 수준에서 호환이 가능합니다.

:::note
물리적 커넥터 표준은 필수가 아니지만, 최신 제품은 일반적으로 [Pixhawk 커넥터 표준](https://pixhawk.org/pixhawk-connector-standard/)을 준수합니다.
:::

이 프로젝트 또한 개방형 설계를 기반으로 참고용 자동조종보드를 생성하고 동일한 [라이센스](#licensing-and-trademarks)를 공유합니다.

<span id="fmu_versions"></span>

### FMU 버전

The Pixhawk project has created a number of different open designs/schematics. All boards based on a design should be binary compatible (run the same firmware).

Each design is named using the designation: FMUvX (e.g.: FMUv1, FMUv2, FMUv3, FMUv4, etc.). Higher FMU numbers indicate that the board is more recent, but may not indicate increased capability (versions can be almost identical - differing only in connector wiring).

PX4 *users* generally do not need to know very much about FMU versions:

* *QGroundControl* automatically downloads the correct firmware for a connected autopilot (based on its FMU version "under the hood").
* Choosing a controller is usually based on physical constraints/form factor rather than FMU version.
    
:::note
The exception is that if you're using FMUv2 firmware it is [limited to 1MB of flash](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata). In order to fit PX4 into this limited space, many modules are disabled by default. You may find that some [parameters are missing](../advanced_config/parameters.md#missing) and that some hardware does not work "out of the box".
:::

PX4 *developers* need to know the FMU version of their board, as this is required to build custom hardware.

At very high level, the main differences are:

* **FMUv2:** Single board with STM32427VI processor ([Pixhawk 1 (Discontinued)](../flight_controller/pixhawk.md), [pix32](../flight_controller/holybro_pix32.md), [Pixfalcon](../flight_controller/pixfalcon.md), [Drotek DroPix](../flight_controller/dropix.md))
* **FMUv3:** Identical to FMUv2, but usable flash doubled to 2MB ([Hex Cube Black](../flight_controller/pixhawk-2.md),[CUAV Pixhack v3](../flight_controller/pixhack_v3.md),[mRo Pixhawk](../flight_controller/mro_pixhawk.md), [Pixhawk Mini (Discontinued)](../flight_controller/pixhawk_mini.md))
* **FMUv4:** Increased RAM. Faster CPU. More serial ports. No IO processor ([Pixracer](../flight_controller/pixracer.md))
* **FMUv4-PRO:** Slightly increased RAM. More serial ports. IO processor ([Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md))
* **FMUv5:** New processor (F7). Much faster. More RAM. More CAN busses. Much more configurable.([Pixhawk 4](../flight_controller/pixhawk4.md),[CUAV v5](../flight_controller/cuav_v5.md),[CUAV V5+](../flight_controller/cuav_v5_plus.md),[CUAV V5 nano](../flight_controller/cuav_v5_nano.md))

<span id="licensing-and-trademarks"></span>

### Licensing and Trademarks

Pixhawk project schematics and reference designs are licensed under [CC BY-SA 3](https://creativecommons.org/licenses/by-sa/3.0/legalcode).

The license allows you to use, sell, share, modify and build on the files in almost any way you like - provided that you give credit/attribution, and that you share any changes that you make under the same open source license (see the [human readable version of the license](https://creativecommons.org/licenses/by-sa/3.0/) for a concise summary of the rights and obligations).

:::note
Boards that are *derived directly* from Pixhawk project schematic files (or reference boards) must be open sourced. They can't be commercially licensed as proprietary products.
:::

Manufacturers can create (compatible) *fully independent products* by first generating fresh schematic files that have the same pin mapping/components as the FMU designs. Products that are based on independently created schematics are considered original works, and can be licensed as required.

Product names/brands can also be trademarked. Trademarked names may not be used without the permission of the owner.

:::tip
*Pixhawk* is a trademark, and cannot be used in product names without permission.
:::

## Additional Information

### LEDs

All *Pixhawk-series* flight controllers support:

* A user facing RGB *UI LED* to indicate the current *readiness to fly* status of the vehicle. This is typically a superbright I2C peripheral, which may or may not be mounted on the board (i.e. FMUv4 does not have one on board and typically uses an LED mounted on the GPS).
* Three *Status LED*s that provide lower level power status, bootloader mode and activity, and error information.

To interpret the LEDs see: [LED Meanings](../getting_started/led_meanings.md).