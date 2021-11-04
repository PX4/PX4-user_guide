# 기본 개념

무인 항공기의 기본 개념과 PX4 사용법에 대하여 설명합니다. 초보자뿐만 아니라 전문가에게도 유익한 자료들이 많이 있습니다. 

기본 개념에 익숙하시면, [기본 조립](../assembly/README.md)편에서 자동비행장치의 배선방법을 바로 공부할 수 있습니다. *QGroundControl*를 이용한 펌웨어 설치 방법은 [기본 설정](../config/README.md)편을 참고하십시오.

## 드론의 정의

드론은 원격 또는 자동으로 조종할 수 있는 무인로봇 차량입니다.

드론은 [개인, 산업체, 공공기관 및 국방 분야](https://px4.io/ecosystem/commercial-systems/)등의 다양한 분야에서 사용되고 있습니다. 또한, 항공 사진/영상, 화물 운송, 경주, 수색 및 탐사 등의 분야에서 사용됩니다.

:::tip
항공용, 지상용, 해양 및 수중 드론이 있습니다. 드론의 공식 용어에는 Unmanned Aerial Vehicles (UAV), Unmanned Aerial Systems (UAS), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV)와 Unmanned Underwater Vehicles (UUV) 등이 있습니다.
:::

드론의 두뇌에 해당하는 장치를 자동비행장치(오토파일럿)라고 합니다. 자동비행장치는 여러가지 비행 모듈들로 구성됩니다.

<a id="autopilot"></a>

## PX4 자동비행장치

[PX4](https://px4.io/)는 오픈 소스 기반의 강력한 *자동조종장치*입니다.

PX4의 주요 기능은 다음과 같습니다.

- 항공기(멀티콥터, 고정익 및 수직이착륙기), 지상운송체, 잠수정 등 [다양한 차량들](../airframes/airframe_reference.md)을 제어합니다. 
- [차량 콘트롤러](#vehicle_controller), 센서 및 다양한 주변 장치 관점에서 매우 탁월한 하드웨어 선택입니다.
- 유연하고 강력한 [비행 모드](#flight_modes)와 [안전 기능](#safety)을 지원합니다.

PX4는 [QGroundControl](#qgc) 지상국, [픽스호크 하드웨어](https://pixhawk.org/), 보조 컴퓨터, 카메라, MAVLink 프로토콜 지원 하드웨어를 통합하는 [MAVSDK](http://mavsdk.mavlink.io)를 포함하는 방대한 드론 플랫폼의 핵심입니다. PX4는 [드론코드 프로젝트](https://www.dronecode.org/)의 지원을 받고 있습니다.

<a id="qgc"></a>

## QGroundControl

드론코드에서 지원하는 지상국은 [QGroundControl](http://qgroundcontrol.com/)입니다. *QGroundControl*을 사용하여 [비행 콘트롤러](flight_controller_selection.md)의 PX4 업로드, 기체 설정, 다양한 매개변수 변경, 실시간 비행 정보 조회, 완전 자동 임무 비행 등의 작업이 가능합니다.

*QGroundControl*은 윈도우, 안드로이드, 맥오에스 및 리눅스 운영체제를 지원합니다. [여기](http://qgroundcontrol.com/downloads/)에서 다운로드하고 설치할 수 있습니다. 

![QGC 메인 화면](../../assets/concepts/qgc_main_screen.jpg)

<span id="vehicle_controller"></span>

## 비행 콘트롤러(보드)

PX4는 초기에는 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md)에서만 실행되도록 설계되었으나, 지금은 리눅스 뿐만 아니라 다양한 하드웨어에서도 실행됩니다. 차량의 물리적 조건, 운용 목적과 비용을 고려하여 적절한 보드를 선택하여야 합니다.

자세한 내용은 [비행 콘트롤러 선택](flight_controller_selection.md)을 참고하십시오.

## 센서

PX4는 기체의 상태를 센서로 결정합니다. 이는 자율비행 기체 안정화에 필수 과정입니다. 각속도 센서, 가속도 센서, 지자기 센서(나침반)와 기압 센서는 시스템 구동을 위한 *최소 요구 사항*입니다. [자동 모드](../getting_started/flight_modes.md#categories)와 기타 모드를 사용하기 위해서는 GPS와 같은 위치 측정 시스템이 요구됩니다. 고정익과 수직이착륙기에는 대기속도 센서가 필수입니다.

더 자세한 정보는 다음을 참고하십시오.

- [센서](../getting_started/sensor_selection.md) 
- [주변 장치](../peripherals/README.md)

<a id="outputs"></a>

## 출력 장치: 모터, 서보, 액츄에이터

PX4는 모터 속도(예 : [ ESC](#esc_and_motors)를 통하여), 에일러론과 플랩 같은 비행 표면, 카메라 트리거, 낙하산, 그리퍼 및 기타 적재 장비 등을 *출력*을 통하여 제어합니다.

아래 그림은 [Pixhawk 4](../flight_controller/pixhawk4.md)와 [Pixhawk 4 미니](../flight_controller/pixhawk4_mini.md)의 PWM 출력 포트를 설명합니다.

![Pixhawk 4 출력 포트](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN 포트](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

출력 장치는 크게 `MAIN` 포트와 `AUX` 포트로 나누며, 포트는 번호로 구분됩니다. `MAINn`과 `AUXn`의 `n`에는 1 ~ 6 또는 1 ~ 8까지의 번호가 부여됩니다.

:::tip
각 출력장치에는 기체별로 고유한 기능을 부여됩니다. 기체의 출력 매핑은 [기체 참조](../airframes/airframe_reference.md) 편에서 설명합니다.
:::

:::warning
어떤 비행 콘트롤러에는 `MAIN` 출력 장치만 있거나(예: *Pixhawk 4 미니*), 6개의 `MAIN` 또는 `AUX` 출력 장치만 있을 수 있습니다. 비행 콘트롤러에는 선택한 [기체](../airframes/airframe_reference.md)에 필요할 출력 포트가 있는 지 확인하십시오.
:::

보틍, `MAIN` 포트는 비행 제어용이며, `AUX` 포트는 액츄에이터나 적재 장비들을 제어합니다. 때로는, 수직 이착륙기처럼 `MAIN` 포트가 부족할 경우에는 `AUX` 포트를 비행 제어용으로 사용하기도 합니다. 예를 들어, [일반 쿼드콥터](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter)에서는 `MAIN` 포트 1 ~ 4을 모터 제어용으로 사용하며, 나머지 `MAIN` 포트와 `AUX` 포트를 RC 제어용으로 사용합니다.

[비행 콘트롤러](#vehicle_controller)의 실제 출력용 포트와 버스는 하드웨어와 PX4 설정에 따라 달라집니다. *일반적으로* PWM 출력 포트는 위에서 설명한 대로 사용되며, 보틍은 `MAIN OUT` 또는 `AUX OUT`으로 표시되어 있습니다.

`FMU PWM OUT`, `IO PWM Out` 방식이나 이와 유사한 방식으로 표시합니다. 픽스호크 콘트롤러에는 주 FMU 보드가 있고, 별도의 입출력용 보드를 연결할 수도 있습니다. 별도의 입출력 보드가 있을 경우에는, `AUX` 포트는 FMU 보드에 연결하고, `MAIN` 포트는 입출력 보드에 연결합니다. 다른 경우로는 `MAIN` 포트를 FMU 보드에 연결하고, `AUX` 포트가 없을 수도 있습니다. FMU 출력 포트는 PWM 처럼 짧은 지연 시간이 요구되는 [D-shot](../peripherals/dshot.md), *One-shot* 프로토콜에 사용됩니다. FMU 출력 포트는 레이싱 드론처럼 높은 성능이 요구되는 기체에 사용됩니다.

출력 포트는 UAVCAN 노드로 연결할 수 있습니다(예: UAVCAN [모터 제어 장치](../peripherals/uavcan_escs.md)). 이 경우에는 동일한 포트 연결 방식을 사용합니다.

**참고:**

- `MAIN` 포트와 `AUX` 포트에는 PWM/Dshot/OneShot 출력 제어에 충분한 6개에서 8개의 출력 포트를 가지고 있습니다. 이론적으로는, 보드 버스에서 더 많은 출력 포트를 제공할 수 있습니다. UAVCAN 버스에는 이러한 제한이 없습니다.

<a id="esc_and_motors"></a>

## 전자변속기(ESC)와 모터 

대부분의 PX4 드론은 비행 전자변속기(ESC)로 브러시리스 모터를 제어합니다. 전자변속기는 제어 장치 신호를 모터의 전력으로 변환합니다.

PX4가 지원하는 전자변속기와 모터 정보는 여기를 참고하십시오.

- [전자변속기와 모터](../peripherals/esc_motors.md)
- [전자변속기 보정](../advanced_config/esc_calibration.md)
- [전자변속기 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/)(oscarliang.com)

## 배터리와 전원

PX4 드론은 리튬-폴리머(LiPo) 배터리를 가장 많이 사용합니다. 일반적으로, 배터리는 비행 콘트롤러와 전자변속기(모터용)에 전원을 제공하는 *전원 모듈*이나 *전원 관리 보드*를 통하여 시스템에 연결됩니다.

배터리와 배터리 설정 정보는 [배터리 설정](../config/battery.md)과 [ 기본 조립](../assembly/README.md)(예: [픽스호크 4 배선 빠른 시작 &gt; 전원](../assembly/quick_start_pixhawk4.md#power))를 참고하십시오.

<a id="rc_systems"></a>

## 무선 조종(RC)

[무선 조종기\(RC\)](../getting_started/rc_transmitter_receiver.md)를 사용하여 기체를 *수동* 제어할 수 있습니다. 송신기(무선 조종기에 장착)와 수신기(기체에 장착)로 구성됩니다. 일부 RC에서는 자동조종장치에서 전송한 텔레메트리를 수신할 수 있습니다.

:::note PX4는 자율비행 모드에서 RC가 필수 사항은 아닙니다.
:::

![Taranis X9D 송신기](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

RC 선택 방법은 [RC 선택](../getting_started/rc_transmitter_receiver.md)을 참고하십시오. 다음과 같은 관련 주제들을 설명합니다.

- [무선/RC 설정](../config/radio.md) - *QGroundControl*에서의 RC 설정.
- [비행 첫걸음](../flying/basic_flying.md) - RC 비행 방법을 설명합니다.
- [FrSky 텔레메트리](../peripherals/frsky_telemetry.md) - PX4의 텔레메트리 정보나 상태 정보를 수신을 위한 RC 송신기 설정방법을 설명합니다.

<a id="joystick"></a>

## 지상 통제국과 조이스틱

*QGroundControl*에서 [조이스틱](../config/joystick.md)을 사용하여 PX4를 수동으로 조종할 수 있습니다. QGroundControl은 조이스틱 신호를 MAVLink 메시지로 변환하여 텔레메트리로 전송합니다. 이와 같은 방식은 *Auterion*, [Skynav](https://auterion-gs.com/skynav/), *UAVComponents*와 [MicroNav](https://www.uavcomp.com/command-control/micronav/)에서 사용합니다. 조이스틱은 기체 시뮬레이션에서 자주 사용됩니다.

![MicroNav와 지상국에서 조이스틱을 사용하는 그림](../../assets/peripherals/joystick/micronav.jpg)

## 안전 스위치

It is common for vehicles to have a *safety switch* that must be engaged before the vehicle can be [armed](#arming) (when armed, motors are powered and propellers can turn). Commonly the safety switch is integrated into a GPS unit, but it may also be a separate physical component.

:::warning
A vehicle that is armed is potentially dangerous. The safety switch is an additional mechanism that prevents arming from happening by accident.
:::

## 텔레메트리 무선 통신

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

## 외부 보조 컴퓨터

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

Relevent topics include:

- [오프보드 모드](../flight_modes/offboard.md) - PX4 외부의 지상 통제국이나 보조 컴퓨터로 제어하는 비행 모드 
- [로보틱스 API](../robotics/README.md)

<span id="sd_cards"></span>

## SD 카드 (휴대용 저장 장치)

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md), and they are also required in order to use UAVCAN peripherals and fly [missions](../flying/missions.md).

By default, if no SD card is present PX4 will play the [format failed (2-beep)](../getting_started/tunes.md#format-failed) tune twice during boot (and none of the above features will be available).

:::tip
The maximum supported SD card size on Pixhawk boards is 32GB. The *SanDisk Extreme U3 32GB* is [highly recommended](../dev_log/logging.md#sd-cards).
:::

SD cards are never-the-less optional. Flight controllers that do not include an SD Card slot may:

- [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER) 매개변수로 알림음을 껍니다.
- [스트림 로그](../dev_log/logging.md#log-streaming)를 다른 보조 장치에 기록합니다.
- 비행 임무를 RAM/플래시에 저장합니다.<!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/master/boards/intel/aerofc-v1/src/board_config.h#L115 -->

<a id="arming"></a>

## 시동 및 해제 

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents:

- 비행중이 아닐 때는 PX4의 *시동을 해제*하거나 전원을 차단하고, 이륙 전에만 *시동*을 켜는 것이 좋습니다.
- 기체가 정해진 시간 안에 이륙하지 않으면, 착륙후에는 기체의 시동은 자동으로 해제됩니다. 시동 해제 시간은 매개변수로 설정합니다.
- Some vehicles also have a [safety switch](#safety-switch) that must be disengaged before arming can succeed (often this switch is part of the GPS).
- 기체는 정상 상태가 아니면, 시동은 걸리지 않습니다.
- 수직이착륙기는 고정익 모드에서는 시동이 걸리지 않습니다([기본 설정](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). It is alternatively possible to configure PX4 to arm using an RC switch or button (and arming MAVLink commands can also be sent from a ground station).

A detailed overview of arming and disarming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

<a id="flight_modes"></a>

## 비행 모드 

Flight modes provide different types/levels of vehicle automation and autopilot assistance to the user (pilot). *Autonomous modes* are fully controlled by the autopilot, and require no pilot/remote control input. These are used, for example, to automate common tasks like takeoff, returning to the home position, and landing. Other autonomous modes execute pre-programmed missions, follow a GPS beacon, or accept commands from an offboard computer or ground station.

*Manual modes* are controlled by the user (via the RC control sticks/joystick) with assistance from the autopilot. Different manual modes enable different flight characteristics - for example, some modes enable acrobatic tricks, while others are impossible to flip and will hold position/course against wind.

:::tip
Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).
:::

An overview of the available flight modes [can be found here](../getting_started/flight_modes.md). Instructions for how to set up your remote control switches to turn on different flight modes is provided in [Flight Mode Configuration](../config/flight_mode.md).

<a id="safety"></a>

## 안전 설정(사고 방지) 

PX4 has configurable failsafe systems to protect and recover your vehicle if something goes wrong! These allow you to specify areas and conditions under which you can safely fly, and the action that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point).

:::note
You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.
:::

The main failsafe areas are listed below:

- 배터리 부족
- RC(원격 제어) 신호 상실
- 위치 상실(GPS 전역 위치 추정 품질이 너무 낮음)
- 외부 보드 연결 손실(예: 보조 컴퓨터와의 연결이 끊어짐)
- 데이터 링크 손실(예: GCS에 대한 텔레메트리 연결이 끊어짐)
- 지리적 경계 위반(가상 실린더 내부로 기체 비행을 제한합니다)
- 미션 안전장치(재 이륙 시 이전 미션이 실행되는 것을 방지합니다)
- 트래픽 회피(예: ADSB 응답기에 의해 작동됩니다)

For more information see: [Safety](../config/safety.md) (Basic Configuration).

## 전진 방향 

All the vehicles, boats and aircraft have a heading direction or an orientation based on their forward motion.

![Frame Heading](../../assets/concepts/frame_heading.png)

:::note
For a VTOL Tailsitter the heading is relative to the multirotor configuration (i.e. vehicle pose during, takeoff, hovering, landing).
:::

It is important to know the vehicle heading direction in order to align the autopilot with the vehicle vector of movement. Multicopters have a heading even when they are symmetrical from all sides! Usually manufacturers use a colored props or colored arms to indicate the heading.

![Frame Heading TOP](../../assets/concepts/frame_heading_top.png)

In our illustrations we will use red coloring for the front propellers of multicopter to show heading.

You can read in depth about heading in [Flight Controller Orientation](../config/flight_controller_orientation.md)