---
canonicalUrl: https://docs.px4.io/main/ko/hardware/reference_design
---

# PX4 참조 비행 콘트롤러 디자인

PX4 참조 디자인은 비행 콘트롤러의 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md)입니다. 2011년에 처음 출시된 이 디자인은 현재 5세대 [세대](#reference_design_generations)입니다(6세대 보드 디자인 진행 중).

## 바이너리 호환성

특정 디자인으로 제조된 모든 보드는 바이너리 호환이 되어야 합니다(즉, 동일한 펌웨어를 실행하여야 함). 2018년부터 우리는 이 호환성을 확인하고 인증할 수 있는 바이너리 호환성 테스트 제품군을 제공할 것입니다.

FMU 1~3세대는 개방형 하드웨어로 설계되었으나, FMU 4세대와 5세대는 핀아웃 및 전원 공급 사양만 제공했습니다(개략도는 개별 제조업체에서 작성하였습니다). 우수한 호환성을 위하여 FMUv6 이상은 완전한 참조 디자인 모델링합니다.

<a id="reference_design_generations"></a>

## 레퍼런스 디자인 세대

* FMUv1: 개발 보드 \(STM32F407, 128KB RAM, 1MB 플래시, [설계도](https://github.com/PX4/Hardware/tree/master/FMUv1)\)(PX4에서 더 이상 지원하지 않음)
* FMUv2: 픽스호크 \(STM32F427, 168 MHz, 192 KB RAM, 1MB flash, [설계도](https://github.com/PX4/Hardware/tree/master/FMUv2)\)
* FMUv3: 2MB 플래시를 장착한 픽스호크 변형 버전 \(3DR 픽스호크 2 \(Solo\), Hex 픽스호크 2.1, Holybro Pixfalcon, 3DR Pixhawk Mini, STM32F427, 168 MHz, 256 KB RAM, 2 MB flash, [설계도](https://github.com/PX4/Hardware/tree/master/FMUv3_REV_D)\)
* FMUv4: 픽스레이서 \(STM32F427, 168 MHz, 256 KB RAM, 2 MB flash, [핀 출력도](https://docs.google.com/spreadsheets/d/1raRRouNsveQz8cj-EneWG6iW0dqGfRAifI91I2Sr5E0/edit#gid=1585075739)\)
* FMUv4 PRO: 드로텍 픽스호크 3 PRO \(STM32F469, 180 MHz, 384 KB RAM, 2 MB flash, [핀 출력](https://docs.google.com/spreadsheets/d/1raRRouNsveQz8cj-EneWG6iW0dqGfRAifI91I2Sr5E0/edit#gid=1585075739)\)
* FMUv5: 홀리브로 픽스호크 4 \(STM32F765, 216 MHz, 512 KB RAM, 2 MB flash, [핀 아웃](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165)\)
* FMUv6: 개발 중, 최종 명칭 미정, 6s 변형 \(STM32H7, 400 MHz, 2 MB RAM,  2 MB flash\)과 6i 변형 \(i.MX RT1050, 600 MHz, 512 KB RAM, 외장 플래시\)


## 메인 IO 기능 분석

아래 다이어그램은 Pixhawk 시리즈 비행 콘트롤러의  FMU와 I/O 보드간 기능과 버스 분할을 나타냅니다(보드는 단일 물리적 모듈에 통합됨).

![PX4 메인/IO 기능 분석](../../assets/diagrams/px4_fmu_io_functions.png)

<!-- Draw.io version of file can be found here: https://drive.google.com/file/d/1H0nK7Ufo979BE9EBjJ_ccVx3fcsilPS3/view?usp=sharing -->

일부 Pixhawk 시리즈 컨트롤러는 공간이나 복잡성을 줄이기 위하여 특정 보드 의 기능 향상을 위하여 I/O 보드 없이 제작됩니다.

I/O 보드는 매개변수 [SYS_USE_IO=0](../advanced_config/parameter_reference.md#SYS_USE_IO)에서 비활성화됩니다. I/O 보드가 비활성화된 경우:
- MAIN 믹서 파일은 FMU에 로드됩니다(그래서 [기체 정의서](../airframes/airframe_reference.md)에 나열된 "MAIN" 출력이 AUX라고 표시된 포트에 나타납니다). AUX 믹서 파일이 로드되지 않으므로, 이 파일에 정의된 출력이 사용되지 않습니다.
- RC 입력은 IO 보드를 통하지 않고 FMU로 직접 입력됩니다.

I/O 보드가 없는 비행 콘트롤러에는 `MAIN` 포트가 있지만, `AUX` 포트는 *없습니다*. 따라서, `AUX` 포트를 사용하지 않거나 비필수적인 목적(예: RC 전달)으로만 사용하는 [기체](../airframes/airframe_reference.md)에만 사용할 수 있습니다. 일반적으로 모터/필수 제어용으로 `MAIN` 포트만 사용하기 때문에, 대부분의 멀티콥터와 *완전* 자율주행 차량(RC 제어를 사용하는 안전 조종사 없음)에 사용할 수 있습니다.

:::warning
I/O 보드가 없는 비행 콘트롤러는 `AUX` 포트가 없기 때문에, 모든 `AUX` 포트를 필수 비행 제어 또는 모터에 매핑하는 [기체](../airframes/airframe_reference.md)에서 사용할 수 없습니다.
:::

:::note
I/O 보드가 없는 제조업체 비행 콘트롤러 변형은 종종 I/O 보드를 포함하는 버전의 "소형"으로 명명됩니다. 예 : _Pixhawk 4_ **미니**_, _CUAV v5**나노**_.
:::

대부분의 PX4 PWM 출력은 믹서의 `MAIN` 또는 `AUX` 포트에 매핑됩니다. 카메라 트리거링 및 Dshot ESC를 포함한 몇 가지 특별한 경우에는 FMU 핀에 직접 매핑됩니다. 예를 들면, 비행 컨트롤러에 I/O 보드 여부에 따라 `MAIN` 또는 `AUX`로 **출력됩니다.
