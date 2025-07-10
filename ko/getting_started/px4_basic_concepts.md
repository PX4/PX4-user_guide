---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/px4_basic_concepts
---

# 기본 개념

무인 항공기 기본 개념과 PX4 사용법에 대하여 설명합니다. 초보자 뿐만 아니라 전문가에게도 유익한 많은 자료들이 있습니다. 

기본 개념에 익숙하시면, [기본 조립](../assembly/README.md)편에서 자동비행장치의 배선방법을 공부할 수 있습니다. *QGroundControl*를 이용한 펌웨어 설치 방법은 [기본 설정](../config/README.md)편을 참조하십시오.

## 드론이란?

드론은 원격 또는 자동으로 조종할 수 있는 무인 로봇 운송체입니다.

드론은 [개인, 산업체, 공공기관 및 국방 분야](https://px4.io/ecosystem/commercial-systems/)등의 다양한 분야에서 사용되어지고 있습니다. 또한, 항공 사진/영상, 화물 운송, 경주, 수색 및 탐사 등 (간략한) 분야에서도 활용합니다.

:::tip
항공용, 지상용, 해양/수중용 드론이 있습니다. 드론의 공식적인 용어는 Unmanned Aerial Vehicles (UAV), Unmanned Aerial Systems (UAS), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV), Unmanned Underwater Vehicles (UUV) 등이 있습니다.
:::

드론의 "뇌"에 해당하는 장치를 오토파일럿이라고 합니다. 자율 비행 프로그램은 비행제어 장치에서 동작하는 각종 비행 모듈로 구성되어 있습니다.

<a id="autopilot"></a>

## PX4 자동비행장치

[PX4](https://px4.io/)는 강력한 오픈 소스 자동조종장치 *플라이트 스택*입니다.

PX4의 주요 기능은 다음과 같습니다:

- 항공기(멀티콥터, 고정익 및 수직이착륙기), 지상운송체 및 잠수정 등 [매우 다양한 기체 프레임](../airframes/airframe_reference.md)을 제어함 
- [기체 콘트롤러](#vehicle_controller), 센서 및 다양한 주변 장치에 있어 하드웨어 관점에서 탁월한 선택임
- 유연하고 강력한 [비행 모드](#flight_modes)와 [안전 기능](#safety)을 지원함

PX4는 [QGroundControl](#qgc) 지상 관제 프로그램, [픽스호크 하드웨어](https://pixhawk.org/), 보조 컴퓨터를 붙이는 [MAVSDK](http://mavsdk.mavlink.io), 카메라, MAVLink 프로토콜을 사용하는 기타 하드웨어가 어우러진 방대한 드론 플랫폼의 핵심 부분입니다. PX4는 [드론코드 프로젝트](https://www.dronecode.org/)의 지원을 받고 있습니다.

<a id="qgc"></a>

## QGroundControl

드론코드에서 지원하는 지상 관제 프로그램은 [QGroundControl](http://qgroundcontrol.com/)입니다. *QGroundControl*을 사용하여 PX4를 [비행 제어 장치 하드웨어](flight_controller_selection.md)에 적재(플래싱)하고, 기체를 설정하고, 다양한 매개변수 값을 바꾸며, 실시간 비행 정보를 가져오고, 완전 자동 임무 비행을 수행할 수 있습니다.

*QGroundControl*은 윈도우, 안드로이드, MacOS 그리고 리눅스에서 실행 가능합니다. [여기](http://qgroundcontrol.com/downloads/)에서 다운로드하고 설치할 수 있습니다.

![지상제어프로그램 메인 화면](../../assets/concepts/qgc_main_screen.jpg)

<span id="vehicle_controller"></span>

## 기체/비행 제어 장치 보드

PX4는 초기에는 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 제어 장치에서만 실행하도록 설계했으나, 지금은 리눅스 뿐만 아니라 여러가지 다양한 하드웨어에서도 실행할 수 있습니다. 기체의 물리적 조건, 원하는 동작은 물론이거니와 비용면으로도 고려하여 적절한 보드를 선택해야 합니다.

자세한 내용은 [비행 컨트롤러 선택](flight_controller_selection.md)편을 참조하십시오.

## 센서

PX4는 센서를 사용하여 기체의 상태를 결정 (자율 비행시 기체 안정화에 필수적인 과정)합니다. 시스템 구동시 각속도 센서, 가속도 센서, 지자기 센서(나침반) 및 기압 센서를 *최소한으로 요구* 합니다. 자동 [모드](../getting_started/flight_modes.md#categories) 와 기타 모드를 사용하기 위해서는 GPS나 이와 유사한 위치 확인 시스템이 필요합니다. 고정익 및 수직이착륙기에는 대기속도 센서를 반드시 붙여야 합니다(강력 추천).

더 자세한 정보는 다음을 참고하십시오.

- [센서](../getting_started/sensor_selection.md) 
- [주변 장치](../peripherals/README.md)

<a id="outputs"></a>

## 출력 장치: 모터, 서보, 액츄에이터

PX4는 모터 속도(예 : [ ESC](#esc_and_motors)), 에일러론, 플랩 같은 비행 표면, 카메라 트리거, 낙하산, 그리퍼 및 기타 여러 가지 적재 장비 등을 제어하는 *출력* 수단을 활용합니다.

아래의 그림은 [Pixhawk 4](../flight_controller/pixhawk4.md)와 [Pixhawk 4 미니](../flight_controller/pixhawk4_mini.md)의 PWM 출력 포트를 나타냅니다.

![Pixhawk 4 출력 포트](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 미니 MAIN 포트](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

출력 장치는 크게 `MAIN`과 `AUX` 장치로 나누며, 각각의 장치는 번호로 구분합니다(예: `MAINn` 과 `AUXn`, `n`에는 1부터 6 또는 1부터 8까지의 번호가 들어감).

:::tip
각각의 출력장치에는 기체별로 정한 기능을 고정 부여했습니다. 모든 기체에 대한 출력 연결은 [기체 참조](../airframes/airframe_reference.md) 편에서 설명합니다.
:::

:::warning
어떤 기체 제어기에는 `MAIN` 출력 장치만 있을 수 있거나(예: *Pixhawk 4 미니*), 6개의 `MAIN` 또는 `AUX` 출력 장치만 있을 수 있습니다. 적용할 [기체](../airframes/airframe_reference.md)에 적절한 출력 포트가 붙은 제어 장치를 선택했는지 확인하십시오.
:::

보틍, `MAIN` 포트는 비행 제어용이며, `AUX` 포트는 액츄에이터나 적재 장비류의 보조 장치를 제어합니다(때로는, 수직 이착륙기처럼 `MAIN` 포트가 부족할 경우에 `AUX` 포트를 비행 제어용으로 사용하기도 합니다). 예를 들면, [일반 쿼드콥터](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter)에서는 `MAIN` 포트 1-4을 모터 제어용으로 사용하며, 나머지 `MAIN` 포트 `AUX` 포트는 RC 제어용으로 사용합니다.

[비행 제어 장치](#vehicle_controller)의 실제 출력용 포트, 버스는 하드웨어와 PX4 설정에 따라 활용합니다. *일반적으로* PWM 출력용 포트는 위에 언급된 내용대로 활용하며, 보틍은 `MAIN OUT` 또는 `AUX OUT`으로 나타납니다.

또한 `FMU PWM OUT`, `IO PWM Out` (이런식으로) 처럼 표시를 해두기도 합니다. 픽스호크 제어 장치는 "주" FMU 보드가 있고, 별도의 입출력용 보드를 연결할 수*도* 있습니다. 별도의 입출력 보드가 있을 경우, `AUX` 포트는 FMU 보드에 바로 연결하고, `MAIN` 포트는 입출력 보드에 연결합니다. 다른 경우로는 `MAIN` 포트를 FMU 보드에 연결하고, `AUX` 포트를 두지 않을 수도 있습니다. FMU 출력 포트는 짧은 지연 시간 동작을 수행하는 [D-shot](../peripherals/dshot.md), *One-shot* 프로토콜을 채용하여 (PWM 처럼) 활용할 수 있습니다. 이는 경주용 드론과 높은 성능이 필요한 기체에 쓸만합니다.

출력 포트는 UAVCAN 노드로 연결할 수 있습니다(예: UAVCAN [모터 제어 장치](../peripherals/uavcan_escs.md)). 이 경우에는 (동일한) 에어프레임 출력 연결 방식을 노드에 적용합니다.

**참고:**

- `MAIN` 포트와 `AUX` 포트에는 PWM/Dshot/OneShot 출력 제어에 충분하도록 6개에서 8개의 출력 포트가 있읍니다. 이론적으로는 보드 버스에서 더 많은 출력 포트를 제공할 수 있습니다(UAVCAN 버스는 이러한 제한을 받지 않습니다).

<a id="esc_and_motors"></a>

## 전자변속기(ESC)와 모터

대대수의 PX4 드론은 비행 제어장치가 전자변속기(ESC)를 통해 제어하는 브러시리스 모터를 사용합니다(전자변속기는 비행 제어 장치의 신호를 모터에 적절한 전력으로 변환합니다).

PX4가 지원하는 전자변속기/모터 정보는 여기를 참조하십시오.

- [전자변속기와 모터](../peripherals/esc_motors.md)
- [전자변속기 보정](../advanced_config/esc_calibration.md)
- [전자변속기 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/)(oscarliang.com)

## 배터리와 전원

PX4 드론은 리튬-폴리머(LiPo) 배터리를 가장 많이 사용합니다. 배터리는 일반적으로 비행 제어 장치 및 전자변속기(모터용)에 별도의 전원을 제공하는 *전원 모듈* 또는 *전원 관리 보드*를 통해 시스템에 연결합니다.

배터리 및 배터리 구성에 대한 정보는 [ 배터리 구성 ](../config/battery.md) 및 [ 기본 조립](../assembly/README.md) (예: [픽스호크 4 배선 빠른 시작 > 전원](../assembly/quick_start_pixhawk4.md#power))안내서에서 찾아볼 수 있습니다.

<a id="rc_systems"></a>

## 무선 조종(RC)

[무선 조종기\(RC\)](../getting_started/rc_transmitter_receiver.md)시스템은 기체를 *수동으로* 조종할 때 사용합니다. 고정/제어 위치에서 통신하는 송신기가 붙은 무선 조종기와 기체에 붙어있는 수신기로 이루어져있습니다. 일부 무선 조종 시스템은 오토파일럿이 송신하는 무선 측정 정보를 되받아오기도 합니다.

:::note PX4는 자율 비행 모드에 대해 원격 제어 시스템이 필요하지 않습니다.
:::

![Taranis X9D 송신기](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[원격 조종 시스템 선택](../getting_started/rc_transmitter_receiver.md)편에서는 원격 조종 시스템을 선택하는 방법을 설명합니다. 다음과 같은 기타 관련 주제도 있습니다:

- [무선/원격 조종 설정](../config/radio.md) - *QGroundControl*에서의 원격 조종 설정.
- [비행 첫걸음](../flying/basic_flying.md) - 원격 조종으로 비행하는 방법을 배웁니다.
- [FrSky 텔레메트리](../peripherals/frsky_telemetry.md) - PX4에서 나오는 텔레메트리 정보 또는 상태 업데이트 정보를 수신할 무선 조종 송신기를 설정합니다.

<a id="joystick"></a>

## 지상 통제 장치의 조이스틱 제어장치

*QGroundControl*에서 [컴퓨터 조이스틱](../config/joystick.md)을 사용하여 PX4를 수동으로 조종할 수도 있습니다. (QGroundControl은 조이스틱의 움직임을 MAVLink 메시지로 변환하여 텔레메트리로 전송함). 이와 같은 방식은 *Auterion*, [Skynav](https://auterion-gs.com/skynav/), *UAVComponents*, [MicroNav](https://www.uavcomp.com/command-control/micronav/)에서 사용합니다. 조이스틱은 보통 기체 모의 시험 프로그램에서도 사용합니다.

![MicroNav와 지상제어프로그램에서 조이스틱을 사용하는 그림](../../assets/peripherals/joystick/micronav.jpg)

<a id="safety_switch"></a>

## 안전 스위치

기체에는 *안전 스위치*가 있으며, 안전 스위치를 켜야만 기체의 [시동](#arming)을 걸 수 있습니다(기체의 시동이 걸려야만 모터와 프로펠러가 동작할 수 있음). 보통 안전 스위치는 GPS 장치에 붙어있으나, 별도의 부품으로 장착하기도 합니다.

:::warning
시동이 걸린 기체는 잠재적인 위험성을 지니고 있습니다. 안전 스위치는 갑자기 시동이 걸려 발생하는 사고를 방치하는 추가 대책입니다.
:::

## 데이터/텔레메트리 무선 통신

[데이터/텔레메트리 무선 통신](../telemetry/README.md)은 *QGroundControl*과 같은 지상 통제국과 PX4를 구동하는 기체간 MAVLink 무선 연결 수단을 제공합니다. 기체가 비행 중일 때 매개변수 값을 조정, 실시간으로 데이터 원격 측정 확인, 비행 중 임무 변경등의 동작을 수행할 수 있습니다.

## 외부 보조 컴퓨터

PX4는 직렬 케이블 또는 무선랜으로 기체에 장착한 보조 컴퓨터로 별개 제어할 수 있습니다. 보조 컴퓨터는 대개 MAVSDK 또는 MAVROS와 같은 MAVLink API로 통신합니다.

관련 주제는 다음과 같습니다.

- [외부 모드](../flight_modes/offboard.md) - PX4의 외부에서 지상 통제 장치 또는 보조 컴퓨터로 제어하는 비행 모드. 
- [로보틱스 API](../robotics/README.md)

<span id="sd_cards"></span>

## SD 카드(휴대용 저장 장치)

PX4는 SD 카드에 [비행 로그](../getting_started/flight_reporting.md)를 저장합니다. SD 카드는 UAVCAN 주변 장치를 사용하고 비행 임무를 수행할 때 반드시 필요합니다.

기본적으로, PX4는 부팅 과정에 SD 카드가 없으면 [포맷 실패 (삑소리 2회)](../getting_started/tunes.md#format-failed) 경고음을 두번 울립니다(그리고, 상기 다수의 기능은 동작하지 않음).

:::tip
픽스호크 보드에서 지원하는 SD 카드의 최대 용량은 32GB입니다. *SanDisk Extreme U3 32GB* 사용을 [적극 추천합니다](../dev_log/logging.md#sd-cards).
:::

SD 카드는 선택 사항인 것은 분명합니다. SD 카드가 없는 비행 제어기는 다음과 같은 기능들이 포함되어야 합니다.

- [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER) 매개변수로 알림음을 끔.
- [스트림 로그](../dev_log/logging.md#log-streaming)를 다른 (보조)장치에 기록.
- 비행 임무를 RAM/플래시에 저장. <!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/master/boards/intel/aerofc-v1/src/board_config.h#L115 -->

<a id="arming"></a>

## 시동 걸고 해제하기

기체에 전원을 켜면 안전 사고를 유발하는 모터와 프로펠러와 같은 부품들이 있습니다.

사고 발생 가능성을 줄이려면:

- PX4 기체는 비행 중이 아닐 때는 *시동을 해제하고* (전원 차단), 이륙 전에는 제대로 *시동을 켜야*합니다.
- 조종사가 빨리 이륙하지 않으면, 착륙후 기체는 자동으로 시동 해제됩니다. 시동 해제 시간은 설정 가능합니다.
- 일부 기체에는 시동전에 조작하는 [안전 스위치](#safety_switch)(보통 GPS 수신기의 일부임)가 장착되어 있습니다.
- 기체가 "정상" 상태가 아니면, 시동은 걸리지 않습니다.
- 수직이착륙기를 고정익 모드로 설정하면 시동이 걸리지 않습니다.([기본 설정](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).

(모드 2 수신기의 경우) 추진력/방위각 조절 스틱을 *우측 하단*에 두어 1초 정도 유지하면 시동이 걸립니다(시동을 해제하려면, 좌측 하단으로 둠). PX4에서 무선 조종 스위치 또는 단추로 시동을 걸게끔 대신 설정할 수도 있습니다(그리고 MAVLink 시동 명령을 지상 통제 장치에서 보낼 수도 있음).

시동을 걸고 해제하는 방식 설정의 구체적인 내용은 [시동 준비, 시동, 시동 해제](../advanced_config/prearm_arm_disarm.md)에 있습니다.

<a id="flight_modes"></a>

## 비행 모드

비행 모드는 자동 비행 및 보조 기능에 관련된 다양한 형태와 기법들을 의미한다. *자율 모드*는 자동 조종 장치에 의해 완전히 제어되며 원격/수동 제어가 필요하지 않다. 예를 들어 이륙 등과 같은 작업을 자동화으로 수행하고, 출발지로 복귀하여 착륙하는 과정도 수행한다. 또 다른 자율 모드는 사전에 프로그래밍 된 임무를 수행하거나, GPS 신호를 따르거나, 외부 컴퓨터 또는 지상 관제소에서 명령에 따라 비행할 수 있습니다.

*수동 모드*는 비행 제어기를 사용자가 RC를 통해서 제어합니다. 다른 수동 모드는 다른 비행 특성을 가능하게 합니다. 예를 들어, 어떤 모드는 곡예 비행을 가능하게 하고, 다른 모드는 뒤집기가 불가능하고 바람에 대한 위치/코스를 유지합니다.

:::tip
모든 기체 유형에서 모든 비행 모드를 사용할 수 있는 것은 아니며, 일부 모드는 특정 조건이 충족 된 경우에만 사용할 수 있습니다 (예: 대부분의 모드에서는 GPS 위치 정보가 필요합니다).
:::

여러가지 비행 모드에 대한 개요는 [여기](../getting_started/flight_modes.md)에서 확인할 수 있습니다. 다른 비행 모드를 변경하기 위하여 원격 스위치를 설정하는 방법은 [비행 모드 구성](../config/flight_mode.md)에 나와 있습니다.

<a id="safety"></a>

## 안전 설정(사고 방지)

PX4는 시스템이 잘못되었을 때를 대비해 기체을 보호하고 복구할 수 있도록 장애 안전 시스템을 갖추고 있으며, 이와 관련된 각종 설정들이 있습니다! 이를 통해 안전하게 비행할 수 있는 지역 및 조건을 지정하고, 안전 장치가 작동(예: 착륙, 위치 유지 또는 지정된 지점으로 복귀)될 경우 수행할 작업을 지정할 수 있습니다.

:::note
*첫 번째* 사고 방지 이벤트에 대해서만 작업을 지정할 수 있습니다. 이벤트가 발생하면 시스템은 특별한 처리 코드를 입력하는데, 이 코드는 후속 안전 장치 트리거가 별도의 시스템 수준과 기체별 코드에 의해 관리되도록 합니다.
:::

주요 안전장치는 다음과 같습니다.

- 배터리 부족
- RC(원격 제어) 신호 상실
- 위치 상실(GPS 전역 위치 추정 품질이 너무 낮음)
- 외부 보드 연결 손실(예: 보조 컴퓨터와의 연결이 끊어짐)
- 데이터 링크 손실(예: GCS에 대한 텔레메트리 연결이 끊어짐)
- 지리적 경계 위반(가상 실린더 내부로 기체 비행을 제한합니다)
- 미션 안전장치(새 이륙 시 이전 미션이 실행되는 것을 방지합니다)
- 트래픽 회피(예: ADSB 응답기로부터 응답기 데이터에 의해 작동됩니다)

더 자세한 내용은 [ 안전](../config/safety.md)(기본 설정)을 참조하십시오.

## 전진 방향

모든 기체, 보트 및 항공기는 전진하는 방향이 있습니다.

![프레임 방향](../../assets/concepts/frame_heading.png)

:::note
수지이착륙 테일 시터의 경우 방향은 멀티 로터 구성 (즉, 이륙, 호버링, 착륙 중 차량 포즈)에 상대적입니다.
:::

비행 컨트롤러를 기체의 이동 벡터와 정렬시키기 위해서는 기체의 전진 방향을 아는 것이 중요합니다. 멀티콥터는 모든 면에서 대칭인 경우에도 전진 방향이 있습니다! 보통은 제조사에서는 기체의 진행 방향을 표시하기 위해 프로펠러나 팔(프레임)을 색깔을 사용하여 구분합니다.

![프레임 방향 평면도](../../assets/concepts/frame_heading_top.png)

위 그림에서 진행 방향은 멀티콥터에 빨간색 전방 프로펠러로 표시됩니다.

[비행 컨트롤러 방향](../config/flight_controller_orientation.md)에서 전진 방향에 대해 더 자세한 정보가 있습니다.