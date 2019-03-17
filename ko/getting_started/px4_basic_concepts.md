# 기본 개념

이 주제에서는 무인 항공기에 대한 기본적인 소개와 PX4 사용에 대해 설명합니다. (초보자를 위한 것이지만 숙련된 사용자에게도 좋은 소개 자료입니다.)

기본 개념을 이미 잘 알고 있다면 [기본 조립](../assembly/README.md)으로 이동하여 특정 자동 조종 장치 하드웨어를 연결하는 방법을 배울 수 있습니다. *QGroundControl*을 사용하여 펌웨어를 설치하고 이동체를 설정하려면 [기본 설정](../config/README.md)을 참조하십시오.

## 드론이란?

드론은 원격 또는 자율적으로 제어될 수 있는 무인 "로봇" 이동체입니다.

드론은 많은 소비자 그리고 산업 및 군사적 목적으로 [활용](http://px4.io/applications/)됩니다. 여기에는 (대략) 항공 사진/비디오, 화물 운송, 레이싱, 검색 및 측량 등 내용이 포함됩니다.

> ** 팁 ** 항공기, 지상, 해상 및 수중에서 사용하기 위해 다양한 유형의 무인 항공기가 존재합니다. 무인 항공기(UAV), 무인 항공 시스템(UAS), 무인 지상 차량(UGV), 무인 수면함(USV), 무인 수중함(UUV) 이라고 합니다.

드론의 "두뇌"는 오토파일럿 또는 자동 조종 장치라고 합니다. 112/5000 이 장치는 * 기체 컨트롤러 * ( "비행 컨트롤러") 하드웨어에서 실행되는 * 비행 스택 * 소프트웨어로 구성됩니다.

## 드론코드 플랫폼 {#dronecode}

PX4는 일반 산업 친화적 오픈 소스 라이선스에 따라 제공되는 드론 개발을 위한 완벽한 플랫폼인 [ Dronecode 플랫폼](https://www.dronecode.org/platform/)의 일부입니다. Dronecode는 [ PX4 비행 스택 ](#autopilot), [ QGroundControl ](#qgc) 지상 제어 스테이션, [ Dronecode SDK ](https://www.dronecode.org/sdk/) 및 [ Dronecode Camera Manager](https://camera-manager.dronecode.org/en/)를 포함합니다.

## PX4 오토파일럿 {#autopilot}

[ PX4](http://px4.io/)는 강력한 오픈 소스 오토파일럿 * 비행 스택 *입니다. (역주: 비행 스택이란 여러 기능을 갖는 모듈들의 집합체를 의미합니다.)

몇 가지 PX4의 주요 특징은 다음과 같습니다:

- 항공기 (멀티콥터, 고정익 항공기 및 VTOL), 지상 차량 및 수중함을 포함하여 [ 많은 다양한 차량 프레임/유형](../airframes/airframe_reference.md)을 제어합니다. 
- [ 이동체 컨트롤러](#vehicle_controller), 센서 및 기타 주변 장치 하드웨어 선택 시 가장 좋습니다.
- 유연하고 강력한 [ 비행 모드 ](#flight_modes) 및 [ 안전 기능](#safety)을 갖고 있습니다.

## QGroundControl {#qgc}

Dronecode 지상 관제소는 [ QGroundControl](http://qgroundcontrol.com/)이라고 합니다. * QGroundControl*을 사용하여 PX4를 [ 차량 제어 하드웨어](flight_controller_selection.md)에 로드(플래시)하여 차량을 설정하고 다른 매개 변수를 변경하고 실시간 비행 정보를 얻고 완전 자율 임무를 생성 및 실행할 수 있습니다.

* QGroundControl*은 Windows, Android, MacOS 또는 Linux에서 실행됩니다. [ 여기에서 다운로드하여 설치하십시오](http://qgroundcontrol.com/downloads/). 

![QGC Main Screen](../../images/qgc_main_screen.jpg)

## 차량/비행 제어 보드 {#vehicle_controller}

PX4는 초기에 [ Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에서 실행되도록 설계되었지만 Linux 컴퓨터 및 기타 하드웨어에서도 실행될 수 있습니다. 비행기의 물리적 제한, 수행하려는 활동 그리고 당연히 비용에도 적합한 보드를 선택해야 합니다.

자세한 내용은 [ 비행 컨트롤러 선택](flight_controller_selection.md)을 참조하십시오.

## 센서

PX4는 센서를 사용하여 차량 상태를 결정합니다(안정화에 필요 및 자율 제어 가능). 시스템은 자이로 스코프, 가속도계, 자력계(나침반) 및 기압계가 * 최소로 필요합니다. * 모든 자동 [ 모드 ](../getting_started/flight_modes.md#categories) 및 일부 보조 모드를 사용하려면 GPS 또는 기타 위치 확인 시스템이 필요합니다. 고정익 및 VTOL- 기체에는 속도 센서가 추가로 포함되어야 합니다(매우 권장 됨).

더 많은 정보는 여기를 보세요.

- [센서](../getting_started/sensor_selection.md) 
- [주변장치](../peripherals/README.md)

## ESC(전자속도제어기)와 모터

많은 PX4 드론은 전자 속도 컨트롤러(Electronic Speed Controller, ESC)를 통해 비행 컨트롤러에 의해 구동되는 브러시리스 모터를 사용합니다(ESC는 비행 컨트롤러의 신호를 모터로 전해지는 적절한 수준의 전력으로 변환합니다).

PX4가 지원하는 ESC/모터에 관한 정보는 여기를 보세요.

- [ESC와 모터](../peripherals/esc_motors.md)
- [ESC 캘리브레이션](../advanced_config/esc_calibration.md)
- [ESC 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/)(oscarliang.com)

## 배터리/전원

PX4 드론은 대부분 리튬-폴리머(LiPo) 배터리로 구동됩니다. 배터리는 일반적으로 비행 컨트롤러 및 ESC(모터 용)에 별도의 전원을 제공하는 * 전원 모듈 * 또는 * 전원 관리 보드*를 사용하여 시스템에 연결됩니다.

배터리 및 배터리 구성에 대한 정보는 [ 배터리 구성 ](../config/battery.md) 및 [ 기본 어셈블리](../assembly/README.md)(예: [ Pixhawk 4 배선 빠른 시작> 전원 ](../assembly/quick_start_pixhawk4.md#power)) 가이드를 참조하십시오.

## 라디오 컨트롤러(RC) {#rc_systems}

[ 라디오 컨트롤러(RC) ](../getting_started/rc_transmitter_receiver.md) 시스템은 비행체를 *수동으로 * 제어하는 데 사용됩니다. 차량을 기반으로 수신기와 스틱/제어 위치를 통신하기 위해 송신기를 사용하는 원격 제어 장치로 구성됩니다. 일부 RC 시스템은 자동 조종 장치로부터 다시 원격 측정 정보를 수신할 수 있습니다.

> ** 참고 ** PX4에는 자율 비행 모드를 위한 원격 제어 시스템이 필요하지 않습니다.

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[ RC 시스템 선택 ](../getting_started/rc_transmitter_receiver.md)은 RC 시스템을 선택하는 방법을 설명합니다. 다른 관련 주제는 다음과 같습니다.

- [ 라디오/원격 제어 설정 ](../config/radio.md) - * QGroundControl *의 원격 제어 구성.
- [ 비행 첫걸음 ](../flying/basic_flying.md) - 리모컨으로 비행하는 법을 배웁니다.
- [ FrSky 텔레메트리](../peripherals/frsky_telemetry.md) - PX4에서 원격 측정/상태 업데이트를 수신하도록 RC 송신기를 설정합니다.

## 데이터/텔레메트리 라디오

[ 데이터/텔레메트리 라디오](../telemetry/README.md)는 * QGroundControl *과 같은 지상 제어 스테이션과 PX4를 실행하는 차량 사이에 무선 MAVLink 연결을 제공할 수 있습니다. 이를 통해 기체가 비행 중일 때 매개 변수를 조정하고 실시간으로 원격 측정을 검사하며 비행 중 임무를 변경하는 등의 작업을 수행할 수 있습니다.

## 외부/보조 컴퓨터

PX4는 직렬 케이블 또는 wifi를 통해 별도의 기체용 보조 컴퓨터에서 제어할 수 있습니다. 보조 컴퓨터는 대개 Dronecode SDK 또는 MAVROS와 같은 MAVLink API를 사용하여 통신합니다.

> ** 참고 ** Robotics API를 사용하려면 소프트웨어 개발 기술이 필요하며 이 가이드의 범위를 벗어납니다.

- [Off-board Mode](../flight_modes/offboard.md) - Flight mode for offboard control of PX4 from a GCS or companion computer. 
- [Robotics APIs](https://dev.px4.io/en/robotics/) (PX4 Developer Guide)

## Removable Memory/Logging

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md) (SD support may not be present on every flight controller).

> **Tip** The maximum supported SD card size on Pixhawk boards is 32GB.

A number of recommended cards are listed in: [Developer Guide > Logging](http://dev.px4.io/en/log/logging.html#sd-cards)

## Flight Modes {#flight_modes}

Flight modes provide different types/levels of vehicle automation and autopilot assistance to the user (pilot). *Autonomous modes* are fully controlled by the autopilot, and require no pilot/remote control input. These are used, for example, to automate common tasks like takeoff, returning to the home position, and landing. Other autonomous modes execute pre-programmed missions, follow a GPS beacon, or accept commands from an offboard computer or ground station.

*Manual modes* are controlled by the user (via the RC control sticks/joystick) with assistance from the autopilot. Different manual modes enable different flight characteristics - for example, some modes enable acrobatic tricks, while others are impossible to flip and will hold position/course against wind.

> **Tip** Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).

An overview of the available flight modes [can be found here](../getting_started/flight_modes.md). Instructions for how to set up your remote control switches to turn on different flight modes is provided in [Flight Mode Configuration](../config/flight_mode.md).

## Safety Settings (Failsafe) {#safety}

PX4 has configurable failsafe systems to protect and recover your vehicle if something goes wrong! These allow you to specify areas and conditions under which you can safely fly, and the action that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point).

> **Note** You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.

The main failsafe areas are listed below:

- Low Battery
- Remote Control (RC) Loss
- Position Loss (global position estimate quality is too low).
- Offboard Loss (e.g. lose connection to companion computer)
- Data Link Loss (e.g. lose telemetry connection to GCS).
- Geofence Breach (restrict vehicle to flight within a virtual cylinder).
- Mission Failsafe (prevent a previous mission being run at a new takeoff location).
- Traffic avoidance (triggered by transponder data from e.g. ADSB transponders).

For more information see: [Safety](../config/safety.md) (Basic Configuration).

## Heading and Directions

All the vehicles, boats and aircraft have a heading direction or an orientation based on their forward motion.

![Frame Heading](../../images/frame_heading.png)

It is important to know the vehicle heading direction in order to align the autopilot with the vehicle vector of movement. Multicopters have a heading even when they are symmetrical from all sides! Usually manufacturers use a colored props or colored arms to indicate the heading.

![Frame Heading TOP](../../images/frame_heading_top.png)

In our illustrations we will use red coloring for the front propellers of multicopter to show heading.

You can read in depth about heading in [Flight Controller Orientation](../config/flight_controller_orientation.md)