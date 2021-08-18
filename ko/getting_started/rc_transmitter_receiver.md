# 무선 조종기(RC)

휴대용 송신기로 차량을 *수동으로* 제어하려면, 무선조종기(RC)가 필요합니다. 무선 조종기 작동 방법, 차량에 적합한 무선 시스템 선택법 및 비행 콘트롤러에 연결하는 방법에 대하여 설명합니다.

:::note PX4의 자율 비행 모드에는 무선 조종기가 필수 사항은 아닙니다. PX4의 [매개 변수](../advanced_config/parameters.md) [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE)를 1로 설정하여 무선 조종기 사용을 비활성화 할 수 있습니다.
:::

## 무선 조종기 작동 방법 

*무선 조종기*에는 조종사가 지상에서 차량을 조종하는 *원격 제어 장치*가 있습니다. 리모콘에는 차량 이동 (예 : 속도, 방향, 스로틀, 요, 피치, 롤 등)을 지정하거나, 자동 [비행 모드 ](../flight_modes/README.md)(예 : 이륙, 착륙, 임무, 복귀)를 활성화하는 물리적 장치들이 있습니다. *텔레메트리 기능이 포함된* 무선조종기는 차량에서 전송한 정보(예 : 배터리 잔량, 비행 모드 등)를 표시할 수 있습니다.

![Taranis X9D 송신기](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

무선 조종기에는 차량과 호환되는 무선 통신 모듈이 포함되어 있습니다. 차량 기반 장치는 비행 콘트롤러에 연결됩니다. 비행 콘트롤러는 현재의 자동 비행 모드와 차량 상태를 기준으로 명령어 해석하는 방법을 결정하고, 차량 모터와 액추에이터를 구동합니다.

<!-- image showing the different parts here would be nice -->

:::note
지상 및 차량 기반 무선 모듈을 각각 송신기 및 수신기라고 하며 (양방향 통신을 지원하더라도) 총칭하여 *송수신기*라고합니다. 무선 콘트롤러의 라디오 모듈을 송신기라고 합니다.
:::

무선 조종기의 중요한 품질중의 하나는 지원 채널수 입니다. 채널 수는 차량에 명령을 전송시에 사용 가능한 리모콘의 물리적 컨트롤 수를 정의합니다 (예 : 실제로 사용할 수있는 스위치, 다이얼, 콘트롤 스틱 갯수).

항공기는 최소 4개 채널(롤, 피치, 요, 스로틀)을 지원하는 무선 조종기를 사용하여야 합니다. 지상 차량에는 최소 2개의 채널(조향, 스로틀)이 필요합니다. 8 채널 또는 16 채널 송신기는 다른 메커니즘을 제어하거나, 자동조종장치에서 제공하는 [비행 모드](../flight_modes/README.md)를 활성화하는 추가 채널을 제공합니다.

## 무선 조종기 종류 

<span id="transmitter_modes"></span>

### 항공기 전용 무선 조종기

UAV용 가장 인기있는 무선 종종기 *유형은*은 아래와 같습니다. 롤/피치/스로틀/요를 제어하는 별도의 조종 스틱이 있습니다. 수신기에는 최소 4 개의 채널이 필요합니다.

![RC 기본 명령어](../../assets/flying/rc_basic_commands.png)

조종 스틱, 스위치의 배치 방식은 다양합니다. 모드 번호로 많이 사용되는 송신기의 레이아웃을 지칭합니다. *모드 1*과 *모드2 *(아래 참조)는 스로틀의 배치만 차이가 납니다.

![모델1 - 모델2](../../assets/concepts/mode1_mode2.png)

:::note
취향에 맞는 적절한 것을 선택하십시오. *모드 2*가 많이 사용됩니다.
:::

## 지상 차량용 무선 조종기

무인 지상 차량(UGV)은 조향 및 속도 값을 전송하기 위하여, 최소 2 채널의 송신기가 필요합니다. 일반적으로 송신기는 휠과 트리거, 2개의 단일 축 컨트롤 스틱 또는 단일 이중 축 컨트롤 스틱을 사용하여 위의 값들을 설정합니다.

더 많은 채널과 제어 메커니즘을 사용할 수 있으며, 추가 액추에이터와 자동 조종 모드를 사용하는 데 매우 유용합니다.

## 무선 조종기 부품 선택

호환되는 송신기와 수신기를 구매하여야 합니다. 또한, 수신기는 [PX4](#compatible_receivers)와 비행 콘트롤러에 호환되어야 합니다.

콘트롤러와 호환되는 무선 조종기는 보통 한 묶음으로 판매됩니다. 예를 들어, [ FrSky Taranis X9D 및 FrSky X8R ](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us)은 인기있는 조합입니다.

### 송수신기 조합 

인기있는 무선 조종기중 하나는 * FrSky Taranis X9D *입니다. 권장되는 *FrSky X4R-SB*(S-BUS, 낮은 지연) 또는 *X4R* (PPM-Sum, 레거시) 수신기와 함께 사용할 수있는 내부 송신기들이 있습니다. 그리고, 맞춤형 라디오 송신기 모듈 슬롯과 맞춤형 오픈 소스 OpenTX 펌웨어가 있습니다.

:::note
이 무선 조종기는 [FrSky](../peripherals/frsky_telemetry.md) 무선 모듈과 함께 사용하여 차량의 원격 정보를 표시 할 수 있습니다.
:::

기타 인기 있는 송수신기 조합 

* 예를 들어 FrSky 송수신기 모듈을 사용하는 Turnigy 송수신기
* Futaba 송신기와 호환 가능한 Futaba S-Bus 수신기
* 장거리(약 900MHz), 낮은 대기 시간 : 호환되는 리모컨(예 : Taranis)으로 설정된 "Team Black Sheep Crossfire"또는 "Crossfire Micro"
* 장거리(약 433MHz) : 호환 리모콘 (예 : Taranis)으로 설정된 ImmersionRC EzUHF

<span id="compatible_receivers"></span>

### PX4 호환 수신기

수신기는 송신기 뿐만 아니라 PX4와 비행 콘트롤러에도 호환되어야 합니다.

아래의 수신기들의 *PX4*와 *Pixhawk* 호환성은 검증되었습니다.

* 모든 Spektrum DSM RC 수신기
* 모든 Futaba S.BUS 및 S.BUS2 RC 수신기
* 모든 FrSky PPM 및 S.Bus 모델
* Graupner HoTT
* 다른 제조업체의 모든 PPM 모델

## 수신기 연결

수신기는 프로토콜에 적합한 포트를 사용하여 비행 콘트롤러에 연결합니다.

* Spektrum 및 DSM 수신기는 **SPKT/DSM** 포트에 연결합니다.
* Graupner HoTT 수신기의 SUMD 출력은 **SPKT/DSM** 포트에 연결합니다.
* PPM-Sum 및 S.BUS 수신기는 **RC** 접지, 전원 및 신호 핀(일반적으로 RC 또는 RCIN으로 표시됨)에 직접 연결합니다.
* *각각의 채널이 독립적으로 배선된* PPM 수신기는 반드시 RCIN 포트에 PPM 인코더로 [아래와 같이](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) 연결합니다. PPM-Sum 수신기는 모든 채널에 하나의 전선만 사용합니다.

특정 비행 콘트롤러의 연결 방법은 다음 빠른 시작 가이드를 참고하십시오.

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

:::tip
추가 정보는 제조업체의 비행 콘트롤러 설정 매뉴얼을 참고하십시오.
:::

<span id="binding"></span>

## 송수신기 바인딩 

무선 조종기를 보정하여 사용하기전에 송신기와 수신기를 *바인딩*하여 두 장치간에 통신이 가능하도록 설정하여야 합니다. 송신기와 수신기를 바인딩하는 방법은 하드웨어에 따라 조금씩 차이가 납니다. 자세한 방법은은 제품 설명서를 참조하십시오.

* Spektrum * 수신기를 사용하는 경우에는 *QGroundControl* : [라디오 설정 &gt; 스펙트럼 바인딩](../config/radio.md#spektrum_bind)을 사용하여 바인딩합니다.

## 신호 손실 동작 설정

RC 수신기에는 신호 손실을 나타내는 여러가지 방법이 있습니다.

* 아무것도 출력하지 않음 (PX4에서 자동으로 감지됨)
* 낮은 스로틀 값을 출력합니다. [이를 감지하도록 PX4에서 설정](../config/radio.md#rc_loss_detection)할 수 있습니다.
* 마지막으로 수신된 신호를 출력합니다. 이 경우는 PX4에서 처리할 수 없습니다.

RC 손실이 발생하면 대부분 아무 신호도 전송하지 않는 수신기를 선택하지만, 낮은 스로틀 값을 전송하는 수신기를 선택할 수도 있습니다. 이 동작은 수신기의 설정이 필요할 수 있습니다(설명서 확인).

자세한 내용은 [무선 조종기 설정 &gt; RC 손실 감지](../config/radio.md#rc_loss_detection)를 참고하십시오.

## 관련 내용

* [무선 조종기 설정](../config/radio.md) - PX4 무전 조종기 설정
* [비행 첫걸음](../flying/basic_flying.md) - 무선 조종기 비행 방법을 설명합니다.