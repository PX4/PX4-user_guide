---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/rc_transmitter_receiver
---

# 무선 조종기(RC)

핸드 헬드 송신기로 차량을 * 수동으로 * 제어하려면 무선조종기(RC)가 필요합니다. 무선 조종기의 작동 방식, 차량에 적합한 무선 시스템 선택법 및 비행 제어기에 연결하는 법에 대하여 설명합니다.

:::note PX4에서 자율 비행 모드 비행시에는 무선 조종기가 반드시 필요하지 않습니다. PX4에서 [매개 변수](../advanced_config/parameters.md) [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE)를 1로 설정하여 무선 조종기 사용을 비활성화 할 수 있습니다.
:::

## 무선 조종기 작동 방법

*무선 조종기*에는 지상에서 차량을 조종하는 조종사가 사용하는 *원격 제어 장치*가 있습니다. 리모컨에는 차량 이동 (예 : 속도, 방향, 스로틀, 요, 피치, 롤 등)을 지정하고 자동 조종 [비행 모드 ](../flight_modes/README.md) (예 : 이륙, 착륙, 복귀)를 활성화하는 데 사용할 수있는 물리적 제어 기능이 있습니다. 착륙, 임무 등). *원격 측정이 가능한* 무선조종기는 차량에서 수신한 정보를 수신하고 표시할 수 있습니다 (예 : 배터리 잔량, 비행 모드).

![Taranis X9D 송신기](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

무선 조종기에는 차량과 호환되는 통신용 무선 모듈이 포함되어 있습니다. 차량 기반 장치는 비행 제어기에 연결됩니다. 비행 제어기는 현재의 자동 조종 비행 모드와 차량 상태를 기준으로 명령을 해석하는 방법을 결정하고 차량 모터와 액추에이터를 구동합니다.

<!-- image showing the different parts here would be nice -->

:::note
지상 및 차량 기반 무선 모듈을 각각 송신기 및 수신기라고하며 (양방향 통신을 지원하더라도) 총칭하여 * 송신기 / 수신기 한쌍 *이라고합니다. 무선 제어기내의 라디오 모듈을 "송신기"라고도 합니다.
:::

무선 조종기의 중요한 품질중 하나는 지원하는 "채널"수 입니다. 채널 수는 차량에 명령을 보내는 데 사용할 수있는 리모컨의 물리적 컨트롤 수를 정의합니다 (예 : 실제로 사용할 수있는 스위치, 다이얼, 컨트롤 스틱 수).

항공기는 최소 4 개 채널 (롤, 피치, 요, 추력)을 지원하는 무선 조종기를 사용해야합니다. 지상 차량에는 최소 2 개의 채널 (조향 + 스로틀)이 필요합니다. 8 또는 16 채널 송신기는 다른 메커니즘을 제어하거나 자동 조종 장치에서 제공하는 다른 [ 비행 모드 ](../flight_modes/README.md)를 활성화하는 데 사용할 수있는 추가 채널을 제공합니다.

## 무선 조종기 종류

<span id="transmitter_modes"></span>

### 항공기 전용 무선 조종기 부품

UAV 용 원격 제어 장치의 가장 인기있는 * 형태는</ 0>은 아래와 같습니다. 롤/피치 및 스로틀/요를 제어하기위한 별도의 조종 스틱이 있습니다 (예 : 항공기에 최소 4 개의 채널이 필요함). </p> 

![RC 기본 명령어](../../assets/flying/rc_basic_commands.png)

조종 스틱, 스위치의 배치 방식은 다양합니다. 통상적으로 많이 쓰이는 레이아웃을 가리키는 "모드"번호가 있습니다. *모드 1* 및 * 모드 2 * (아래 참조)는 스로틀의 배치만 다릅니다. 

![모델1 - 모델2](../../assets/concepts/mode1_mode2.png)

:::note
취향에 맞는 적절한 것을 선택하십시오.(*모드 2*가 많이 사용됨).
:::

## 지상 차량용 무선 조종기

무인 지상 차량 (UGV) / 자동차는 조향 및 속도 값을 전송하기 위해 최소 2 채널의 송신기가 필요합니다. 일반적으로 송신기는 휠과 트리거, 2 개의 단일 축 컨트롤 스틱 또는 단일 이중 축 컨트롤 스틱을 사용하여 위의 값들을 설정합니다.

더 많은 채널/제어 메커니즘을 사용 가능하며, 추가 액추에이터 및 자동 조종 모드를 사용하는 데 매우 유용합니다.

## 무선 조종기 부품 선택

서로 호환되는 송신기와 수신기를 구매하여야 합니다. 또한 수신기는 [ PX4 ](#compatible_receivers) 및 비행 제어기와 호환되어야 합니다.

제어기와 호환되는 무선 조종기는 묶음으로 판매됩니다. 예를 들어 [ FrSky Taranis X9D 및 FrSky X8R ](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us)은 인기있는 조합입니다.

### 송신기/수신기 조합

인기있는 무선 조종기중 하나는 * FrSky Taranis X9D *입니다. 권장되는 * FrSky X4R-SB * (S-BUS, 낮은 지연) 또는 * X4R * (PPM-Sum, 레거시) 수신기와 함께 사용할 수있는 내부 송신기 모듈이 있습니다. 그리고, 맞춤형 라디오 송신기 모듈 슬롯과 맞춤형 오픈 소스 OpenTX 펌웨어가 있습니다.

:::note
이 원격 제어 장치는 [ FrSky ](../peripherals/frsky_telemetry.md) 무선 모듈과 함께 사용할 때 차량의 원격 정보를 표시 할 수 있습니다.
:::

기타 인기 있는 송신기/수신기 조합 

* 예를 들어 FrSky 송신기 / 수신기 모듈을 사용하는 Turnigy 원격.
* Futaba 송신기 및 호환 가능한 Futaba S-Bus 수신기.
* 장거리 ~ 900MHz, 낮은 대기 시간 : 호환되는 리모컨 (예 : Taranis)으로 설정된 "Team Black Sheep Crossfire"또는 "Crossfire Micro"
* 장거리 ~ 433MHz : 호환 리모컨 (예 : Taranis)으로 설정된 ImmersionRC EzUHF

<span id="compatible_receivers"></span>

### PX4 호환 수신기 

송신기/수신기가 서로 호환되는 것 외에도 수신기는 PX4 및 비행 컨트롤러에도 호환되어야합니다.

* PX4 * 및 * Pixhawk *는 다음으로 검증되었습니다.

* 모든 Spektrum DSM RC 수신기
* 모든 Futaba S.BUS 및 S.BUS2 RC 수신기
* 모든 FrSky PPM 및 S.Bus 모델
* Graupner HoTT
* 다른 제조업체의 모든 PPM 모델

## 수신기 연결

일반적으로 수신기는 프로토콜에 적합한 포트를 사용하여 비행 제어기에 연결합니다.

* Spektrum 및 DSM 수신기는 **SPKT/DSM** 포트에 연결하여야 합니다.
* Graupner HoTT 수신기 : SUMD 출력은 ** SPKT / DSM ** 포트에 연결되어야 합니다.
* PPM-Sum 및 S.BUS 수신기는 ** RC ** 접지, 전원 및 신호 핀 (일반적으로 RC 또는 RCIN으로 표시됨)에 직접 연결해야합니다.
* *각각의 채널이 독립적으로 배선된* PPM 수신기는 반드시 **RCIN**포트에 *PPM 인코더를 통해* [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html)연결해야 합니다 (PPM-Sum 수신기는 모든 채널에 하나의 전선만 사용합니다).

특정 비행 제어기에 연결하는 방법은 다음 빠른 시작 가이드에 나와 있습니다.

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

:::tip
추가 정보는 제조업체의 비행 컨트롤러 설정 가이드를 참조하십시오.
:::

<span id="binding"></span>

## 송신기 / 수신기 바인딩

무선 시스템을 보정하여 사용하기 전에 수신기와 송신기를 * 바인딩 *하여 서로 만 통신하도록해야합니다. 송신기와 수신기 쌍을 바인딩하는 프로세스는 하드웨어에 따라 다릅니다 (지침은 설명서 참조).

* Spektrum * 수신기를 사용하는 경우 * QGroundControl * : [ Radio Setup> Spectrum Bind ](../config/radio.md#spektrum_bind)를 사용하여 바인딩 모드로 전환 할 수 있습니다.

## 신호 손실 동작 설정

RC 수신기에는 신호 손실을 나타내는 다양한 방법이 있습니다.

* 아무것도 출력하지 않음 (PX4에서 자동으로 감지 됨)
* 낮은 스로틀 값을 출력합니다 ([이를 감지하도록 PX4를 구성 ](../config/radio.md#rc_loss_detection) 할 수 있음).
* 마지막으로 수신된 신호를 출력합니다 (PX4는이 경우를 처리 할 수 없습니다!)

RC가 손실되었을 때 아무것도 방출하지 않는 수신기를 대부분 선택하지만 낮은 스로틀 값을 선택하기도 합니다. 이 동작은 수신기의 하드웨어 구성이 필요할 수 있습니다 (설명서 확인).

자세한 내용은 [ 무선 제어 설정> RC 손실 감지 ](../config/radio.md#rc_loss_detection)를 참조하십시오.

## 관련 주제

* [ 무전기 설정 ](../config/radio.md) - PX4 무전기 조립법
* [비행 첫걸음](../flying/basic_flying.md) - RC로 비행하는 법을 배웁니다.