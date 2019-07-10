# 기본 개념

이 주제는 무인 항공기에 대한 기본적인 소개와 PX4 사용에 대해 설명합니다. (초보자를 위한 것이지만 숙련된 사용자에게도 좋은 소개 자료입니다.)

기본 개념을 이미 잘 알고 있다면 [기본 조립](../assembly/README.md)으로 이동하여 특정 비행 컨트롤러 하드웨어를 배선하는 방법을 배울 수 있습니다. *QGroundControl*을 사용하여 펌웨어를 설치하고 기체를 설정하려면 [기본 설정](../config/README.md)을 참조하십시오.

## 드론이란?

드론은 원격 또는 자율적으로 제어될 수 있는 무인 "로봇" 이동체입니다.

드론은 많은 소비자 그리고 산업적, 군사적 목적으로 [사용 및 활용](http://px4.io/applications/)됩니다. 여기에는 (대략) 항공 사진/비디오, 화물 운송, 레이싱, 검색 및 측량 등 내용이 포함됩니다.

> **팁** 항공기, 지상, 해상 및 수중에서 사용하기 위해 다양한 유형의 무인 항공기가 존재합니다. 무인 항공기(UAV), 무인 항공 시스템(UAS), 무인 지상 기체(UGV), 무인 수면함(USV), 무인 수중함(UUV) 이라고 합니다.

드론의 "두뇌"는 비행 컨트롤러입니다. 이 장치는 *기체 컨트롤러* ( "비행 컨트롤러") 하드웨어에서 실행되는 *펌웨어*로 이루어져 있습니다.

## PX4 비행 컨트롤러 {#autopilot}

[PX4](http://px4.io/)는 강력한 오픈 소스 비행 컨트롤러 *펌웨어* 입니다.

몇 가지 PX4의 주요 특징은 다음과 같습니다:

- 항공기 (멀티콥터, 고정익 항공기 및 VTOL), 지상 기체 및 수중함을 포함하여 [ 다양한 기체 프레임/유형](../airframes/airframe_reference.md)을 제어합니다. 
- [기체 컨트롤러](#vehicle_controller), 센서 및 기타 주변 장치 하드웨어 선택 시 좋은 선택입니다.
- 유연하고 강력한 [비행 모드](#flight_modes) 및 [안전 기능](#safety)을 갖고 있습니다.

PX4 is a core part of a broader drone platform that includes the [QGroundControl](#qgc) ground station, [Pixhawk hardware](https://pixhawk.org/), and [MAVSDK](http://mavsdk.mavlink.io) for integration with companion computers, cameras and other hardware using the MAVLink protocol. PX4 is supported by the [Dronecode Project](https://www.dronecode.org/).

## QGroundControl {#qgc}

Dronecode 지상 관제소는 [ QGroundControl](http://qgroundcontrol.com/)이라고 합니다. * QGroundControl*을 사용하여 PX4를 [ 기체 제어 하드웨어](flight_controller_selection.md)에 로드(플래시)하여 기체를 설정하고 다른 매개 변수를 변경하고 실시간 비행 정보를 얻고 완전 자율 임무를 생성 및 실행할 수 있습니다.

* QGroundControl*은 Windows, Android, MacOS 또는 Linux에서 실행됩니다. [ 여기에서 다운로드하여 설치하십시오](http://qgroundcontrol.com/downloads/). 

![QGC 메인 화면](../../images/qgc_main_screen.jpg)

## Vehicle/Flight Controller Board {#vehicle_controller}

PX4는 초기에 [ Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에서 실행되도록 설계되었지만 Linux 컴퓨터 및 기타 하드웨어에서도 실행될 수 있습니다. 비행기의 물리적 제한, 수행하려는 활동 그리고 당연히 비용에도 적합한 보드를 선택해야 합니다.

자세한 내용은 [ 비행 컨트롤러 선택](flight_controller_selection.md)을 참조하십시오.

## Sensors

PX4는 센서를 사용하여 기체 상태를 결정합니다(안정화에 필요 및 자율 제어 가능). 시스템은 자이로 스코프, 가속도계, 자력계(나침반) 및 기압계가 * 최소로 필요합니다. * 모든 자동 [ 모드 ](../getting_started/flight_modes.md#categories) 및 일부 보조 모드를 사용하려면 GPS 또는 기타 위치 확인 시스템이 필요합니다. 고정익 및 VTOL- 기체에는 속도 센서가 추가로 포함되어야 합니다(매우 권장 됨).

더 많은 정보는 여기를 보세요.

- [센서](../getting_started/sensor_selection.md) 
- [주변장치](../peripherals/README.md)

## ESCs & Motors

많은 PX4 드론은 전자 속도 컨트롤러(Electronic Speed Controller, ESC)를 통해 비행 컨트롤러에 의해 구동되는 브러시리스 모터를 사용합니다(ESC는 비행 컨트롤러의 신호를 모터로 전해지는 적절한 수준의 전력으로 변환합니다).

PX4가 지원하는 ESC/모터에 관한 정보는 여기를 보세요.

- [ESC와 모터](../peripherals/esc_motors.md)
- [ESC 캘리브레이션](../advanced_config/esc_calibration.md)
- [ESC 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/)(oscarliang.com)

## Battery/Power

PX4 드론은 대부분 리튬-폴리머(LiPo) 배터리로 구동됩니다. 배터리는 일반적으로 비행 컨트롤러 및 ESC(모터 용)에 별도의 전원을 제공하는 * 전원 모듈 * 또는 * 전원 관리 보드*를 사용하여 시스템에 연결됩니다.

배터리 및 배터리 구성에 대한 정보는 [ 배터리 구성 ](../config/battery.md) 및 [ 기본 어셈블리](../assembly/README.md)(예: [ Pixhawk 4 배선 퀵 스타트> 전원 ](../assembly/quick_start_pixhawk4.md#power)) 설명서를 참조하십시오.

## Radio Control (RC) {#rc_systems}

[ 라디오 컨트롤러(RC) ](../getting_started/rc_transmitter_receiver.md) 시스템은 비행체를 *수동으로 * 제어하는 데 사용됩니다. 기체를 기반으로 수신기와 스틱/제어 위치를 통신하기 위해 송신기를 사용하는 원격 제어 장치로 구성됩니다. 일부 RC 시스템은 자동 조종 장치로부터 다시 원격 측정 정보를 수신할 수 있습니다.

> ** 참고 ** PX4에는 자율 비행 모드를 위한 원격 제어 시스템이 필요하지 않습니다.

![Taranis X9D 송신기](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[ RC 시스템 선택 ](../getting_started/rc_transmitter_receiver.md)은 RC 시스템을 선택하는 방법을 설명합니다. 다른 관련 주제는 다음과 같습니다.

- [ 라디오/원격 제어 설정 ](../config/radio.md) - * QGroundControl *의 원격 제어 구성.
- [ 비행 첫걸음 ](../flying/basic_flying.md) - 리모컨으로 비행하는 법을 배웁니다.
- [ FrSky 텔레메트리](../peripherals/frsky_telemetry.md) - PX4에서 원격 측정/상태 업데이트를 수신하도록 RC 송신기를 설정합니다.

## Data/Telemetry Radios

[ 데이터/텔레메트리 라디오](../telemetry/README.md)는 * QGroundControl *과 같은 지상 제어 스테이션과 PX4를 실행하는 기체 사이에 무선 MAVLink 연결을 제공할 수 있습니다. 이를 통해 기체가 비행 중일 때 매개 변수를 조정하고 실시간으로 원격 측정을 검사하며 비행 중 임무를 변경하는 등의 작업을 수행할 수 있습니다.

## Offboard/Companion Computer

PX4는 직렬 케이블 또는 wifi를 통해 별도의 기체용 보조 컴퓨터에서 제어할 수 있습니다. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

> ** 참고 ** Robotics API를 사용하려면 소프트웨어 개발 기술이 필요하며 이 설명서의 범위를 벗어납니다.

- [ 외부 보드 모드 ](../flight_modes/offboard.md) - 지상 제어 스테이션 또는 보조 컴퓨터와 같은 PX4의 외부에서의 제어를 위한 비행 모드입니다. 
- [ Robotics API ](https://dev.px4.io/en/robotics/) (PX4 개발자 설명서)

## Removable Memory/Logging

PX4는 [ 비행 기록 ](../getting_started/flight_reporting.md)을 저장하기 위해 SD 메모리 카드를 사용합니다 (SD의 지원은 모든 비행 컨트롤러에 있는 것은 아닙니다).

> ** 팁 ** Pixhawk 보드에서 지원되는 최대 SD 카드 크기는 32GB입니다.

권장되는 카드는 [ 개발자 설명서 > 로깅](http://dev.px4.io/en/log/logging.html#sd-cards)에 목록화되어 있습니다.

## Flight Modes {#flight_modes}

비행 모드는 사용자(조종사)에게 다른 종류/수준의 기체 자동화 및 자동 조종 보조 기능을 제공합니다. * 자율 모드*는 자동 조종 장치에 의해 완전히 제어되며 파일럿/원격 제어 입력이 필요하지 않습니다. 예를 들어 이륙과 같은 일반적인 작업을 자동화하고 홈 위치로 돌아가고 착륙하는 데 사용됩니다. 다른 자율 모드는 사전 프로그래밍 된 임무를 수행하거나, GPS 신호를 따르거나, 외부 컴퓨터 또는 지상 관제소에서 명령을 수락합니다.

* 수동 모드*는 오토파일럿의 도움으로 사용자가럿(RC 조종 스틱/조이스틱을 통해) 제어합니다. 다른 수동 모드는 다른 비행 특성을 가능하게 합니다. 예를 들어, 어떤 모드는 곡예 비행을 가능하게 하고, 다른 모드는 뒤집기가 불가능하고 바람에 대한 위치/코스를 유지합니다.

> ** 팁 ** 모든 기체 유형에서 모든 비행 모드를 사용할 수 있는 것은 아니며, 일부 모드는 특정 조건이 충족 된 경우에만 사용할 수 있습니다 (예: 많은 모드가 GPS 위치 추정 필요).

사용 가능한 비행 모드에 대한 개요는 [여기에서 확인](../getting_started/flight_modes.md)할 수 있습니다. 다른 비행 모드를 켜기 위해 원격 제어 스위치를 설정하는 방법은 [ 비행 모드 구성](../config/flight_mode.md)에 나와 있습니다.

## Safety Settings (Failsafe) {#safety}

PX4는 장애가 발생할 경우 기체을 보호하고 복구할 수 있도록 구성 가능한 장애 안전 시스템을 갖추고 있습니다! 이를 통해 안전하게 비행할 수 있는 지역 및 조건을 지정하고, 안전 장치가 작동(예: 착륙, 위치 유지 또는 지정된 지점으로 복귀)될 경우 수행할 작업을 지정할 수 있습니다.

> ** 참고 ** *첫 번째* failsafe 이벤트에 대해서만 작업을 지정할 수 있습니다. 이벤트가 발생하면 시스템은 특별한 처리 코드를 입력하는데, 이 코드는 후속 안전 장치 트리거가 별도의 시스템 수준과 기체 별 코드에 의해 관리되도록 합니다.

주요 장애 안전 영역은 다음과 같습니다.

- Low Batter(배터리 부족)
- Remote Control (RC, 원격 제어 신호 상실)
- Position Loss(위치 상실, 전체 위치 추정 품질이 너무 낮음)
- Offboard Loss(외부 보드 연결 손실, 예: 보조 컴퓨터와의 연결이 끊어짐)
- Data Link Loss(데이터 링크 손실, 예: GCS에 대한 텔레메트리 연결이 끊어짐)
- Geofence Breach(지리적 경계 위반, 가상 실린더 모양의 경계 내에서 기체 비행을 제한).
- Mission Failsafe (prevent a previous mission being run at a new takeoff location).
- Traffic avoidance(트래픽 회피, 예를 들어 ADSB 응답기로부터 응답기 데이터에 의해 작동됨)

자세한 내용은 [ 안전](../config/safety.md)(기본 설정)을 참조하십시오.

## Heading and Directions

모든 기체, 보트 및 항공기는 전진 방향에 따라 지향 방향이 있습니다.

![프레임 방향](../../images/frame_heading.png)

오토파일럿을 기체의 이동 벡터와 정렬시키기 위해서는 기체 진행 방향을 아는 것이 중요합니다. 멀티콥터는 모든 면에서 대칭이라도 진행 방향이 있습니다! 일반적으로 제조업체는 진행 방향을 표시하기 위해 색상이 입혀진 프로펠러나 팔(프레임)을 사용합니다.

![프레임 방향 TOP](../../images/frame_heading_top.png)

삽화에서 우리는 진행 방향을 보여주기 위해 멀티콥터의 전방 프로펠러에 붉은 색을 칠할 것입니다.

[ 비행 제어기 방향](../config/flight_controller_orientation.md)에서 방향성에 대해 자세히 읽을 수 있습니다.