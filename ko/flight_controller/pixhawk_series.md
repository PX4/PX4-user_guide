---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/pixhawk_series
---

# Pixhawk 시리즈

[Pixhawk<sup>&reg;</sup>](https://pixhawk.org/) is an independent open-hardware project providing readily-available, low-cost, and high-end, _autopilot hardware designs_ to the academic, hobby and industrial communities.

Pixhawk는 PX4용 기준 하드웨어 플랫폼이며 [NuttX](https://nuttx.apache.org/) OS에서 PX4를 실행합니다.

제조업체는화물 운반에서 1인칭 시점(FPV) 레이서에 이르는 애플리케이션에 최적화 된 폼 팩터를 사용하여 개방형 디자인을 기반으로 다양한 보드를 제조하였습니다.

:::tip
계산집약적인 작업(예 : 컴퓨터 비전)에는 보조 컴퓨터(예: [라즈베리파이 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md))나 통합 보조 솔루션 플랫폼이 필요합니다.
:::

## 주요 장점

Key benefits of using a _Pixhawk series_ controller include:

- 소프트웨어 지원 - PX4 기준 하드웨어로서 가장 잘 관리되는 보드입니다.
- 장착 가능한 하드웨어 주변 장치의 유연성.
- 고품질
- 폼 팩터 측면에서 정밀하게 수정할 수 있습니다.
- 널리 사용되어 잘 테스트되고 안정적입니다.
- Automated update of latest firmware via _QGroundControl_ (end-user friendly).

## 지원 보드

PX4 프로젝트는 [Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md)를 기준 하드웨어로 사용합니다. Pixhawk 표준(상표 사용 포함)과 호환는 컨트롤러입니다.

:::note
PX4 유지관리 테스트팀은 표준 보드를 유지 관리하고 지원합니다.
:::

사양을 준수하지 않는 Pixhawk 유사 보드는 [제조업체에서 지원](../flight_controller/autopilot_manufacturer_supported.md), [실험/중단](../flight_controller/autopilot_experimental.md)하거나 지원되지 않을 수 있습니다.

이 섹션의 나머지 부분에서는 Pixhawk 시리즈에 대해 조금 더 설명하지만 반드시 읽어야하는 것은 아닙니다.

## 배경

[Pixhawk 프로젝트](https://pixhawk.org/)는 구성 요소 세트(CPU, 센서 등)와 해당 연결/핀 매핑을 정의하는 회로도로 개방형 하드웨어 설계합니다.

제조업체는 [개방형 디자인](https://github.com/pixhawk/Hardware)을 사용하여 특정 시장 또는 사용 사례 (개방형 사양의 일부가 아닌 물리적 레이아웃/폼 팩터)에 가장 적합한 제품을 제조합니다. 동일한 디자인의 보드는 바이너리 수준에서 호환이 가능합니다.

:::note
물리적 커넥터 표준은 필수가 아니지만, 최신 제품은 일반적으로 [Pixhawk 커넥터 표준](https://pixhawk.org/pixhawk-connector-standard/)을 준수합니다.
:::

이 프로젝트 또한 개방형 설계를 기반으로 참고용 자동조종보드를 생성하고 동일한 [라이센스](#licensing-and-trademarks)를 공유합니다.

<a id="fmu_versions"></a>

### FMU 버전

Pixhawk 프로젝트는 다양한 개방형 회로도를 디자인하였습니다. 같은 디자인의 보드들은 동일한 펌웨어가 바이너리 수준에서 호환되어야 합니다.

각 디자인의 이름은 FMUvX(예 : FMUv1, FMUv2, FMUv3, FMUv4 등)입니다. FMU 번호가 높을 수록 보드가 최신 버전이며, 반드시 성능 향상을 의미하지는 않습니다. 버전이 거의 동일할 수 있으며 커넥터 배선만 다를 수 있습니다.

PX4 _users_ generally do not need to know very much about FMU versions:

- _QGroundControl_ automatically downloads the correct firmware for a connected autopilot (based on its FMU version "under the hood").
- 일반적으로 FMU 버전이 아닌 물리적 제약과 폼 팩터에 의해서 컨트롤러를 선택합니다.

:::note
단, FMUv2 펌웨어를 사용하는 경우 [플래시 1MB로 제한](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata)됩니다. 이 제한된 공간에 PX4를 맞추기 위하여, 다수의 모듈들이 비활성화되어 있습니다. 일부 [매개 변수가 누락](../advanced_config/parameters.md#missing)되거나, 일부 하드웨어가 "즉시" 작동하지 않을 수 있습니다.
:::

PX4 _developers_ need to know the FMU version of their board, as this is required to build custom hardware.

주요 차이점은 아래와 같습니다.

- **FMUv2:** STM32427VI 프로세서 단일 보드 ([Pixhawk 1 (Discontinued)](../flight_controller/pixhawk.md), [pix32](../flight_controller/holybro_pix32.md), [Pixfalcon](../flight_controller/pixfalcon.md), [Drotek DroPix](../flight_controller/dropix.md))
- **FMUv3:** FMUv2와 동일하지만 사용 가능한 플래시가 2MB로 두 배 증가하였습니다 ([Hex Cube Black](../flight_controller/pixhawk-2.md), [CUAV Pixhack v3](../flight_controller/pixhack_v3.md), [mRo Pixhawk](../flight_controller/mro_pixhawk.md), [Pixhawk Mini(단종됨)](../flight_controller/pixhawk_mini.md))
- **FMUv4:** RAM 증가. 더 빨라진 CPU. 더 많은 직렬 포트. IO 프로세서 없음 ([Pixracer](../flight_controller/pixracer.md))
- **FMUv4-PRO:** 약간 증가된 RAM. 더 많은 직렬 포트. IO 프로세서 ([Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md))
- **FMUv5:** 새 프로세서 (F7). 훨씬 더 빨라짐. 더 많은 RAM. More CAN buses. Much more configurable. ([Pixhawk 4](../flight_controller/pixhawk4.md),[CUAV v5](../flight_controller/cuav_v5.md),[CUAV V5+](../flight_controller/cuav_v5_plus.md),[CUAV V5 nano](../flight_controller/cuav_v5_nano.md))
- **FMUv5X:** New processor (F7). Much faster, Modular design. More reliable. More Redundancy. 더 많은 RAM. More CAN buses. Much more configurable & customizable .([Pixhawk 5X](../flight_controller/pixhawk5x.md), Skynode)

<a id="licensing-and-trademarks"></a>

### 라이선스와 상표

Pixhawk 프로젝트의 회로도와 설계도는 [CC BY-SA 3](https://creativecommons.org/licenses/by-sa/3.0/legalcode) 라이센스가 부여됩니다.

이 라이선스를 사용하면 신용/기여를 제공하고 동일한 오픈 소스 라이선스에 따라 변경한 내용을 공유하는 경우 원하는 방식으로 파일을 사용, 판매, 공유, 수정 및 빌드할 수 있습니다(권리와 의무에 대한 간결한 요약은 [인간이 읽을 수있는 라이선스 버전](https://creativecommons.org/licenses/by-sa/3.0/)).

:::note
Boards that are _derived directly_ from Pixhawk project schematic files (or reference boards) must be open sourced. 독점 제품으로 상업적 라이센스를 받을 수 없습니다.
:::

Manufacturers can create (compatible) _fully independent products_ by first generating fresh schematic files that have the same pin mapping/components as the FMU designs. 독립적으로 제작된 회로도를 기반으로하는 제품은 원본 작품으로 간주되며, 필요에 따라 라이센스를 받을 수 있습니다.

제품 이름/브랜드도 상표가 될 수 있습니다. 상표명은 소유자의 허가없이 사용할 수 없습니다.

:::tip
_Pixhawk_ is a trademark, and cannot be used in product names without permission.
:::

## 추가 정보

### LED

All _Pixhawk-series_ flight controllers support:

- A user facing RGB _UI LED_ to indicate the current _readiness to fly_ status of the vehicle. This is typically a superbright I2C peripheral, which may or may not be mounted on the board (i.e. 이것은 일반적으로 보드에 장착되거나 장착되지 않을 수 있는 초고휘도 I2C 주변기기입니다(예 : FMUv4에는 보드에 장착되지 않으며, GPS에 장착된 LED를 사용함).
- 낮은 수준의 전원 상태, 부트 로더 모드 및 활동, 오류 정보를 제공하는 3 개의 *상태 LED*.

LED 신호를 해석하려면 [LED 설명](../getting_started/led_meanings.md)편을 참고하십시오.
