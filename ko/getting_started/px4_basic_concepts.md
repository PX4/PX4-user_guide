# 기본 개념

무인 항공기에 대한 소개와 PX4 사용법에 대해 설명합니다. 초보자 뿐만 아니라 전문가에게도 유익한 자료들이 있습니다.

기본 개념에 이미 숙지하셨다면, [기본 조립](../assembly/README.md)편에서 비행 제어기 조립에 대해서 공부하실 수 있습니다. *QGroundControl*을 사용하여 PX4 펌웨어를 설치하고 기체를 설정하려면 [기본 설정](../config/README.md)을 참조하십시오.

## 드론이란?

드론은 수동이나 자동으로 제어할 수 있는 무인 로봇을 의미합니다.

드론은 [개인, 산업체, 공공기관, 국방 분야에서 다양하게 적용](https://px4.io/ecosystem/commercial-systems/).되고 있습니다. 응용분야는 항공 측량, 화물 운송, 레이싱, 수색 등이 있습니다.

드론 적용 분야는 항공, 지상, 바다, 수중 등 다양한 분야가 있습니다. 드론을 지칭하는 공식적인 용어에는 Unmanned Aerial Vehicles (UAV), Unmanned Aerial Systems (UAS), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV), Unmanned Underwater Vehicles (UUV) 등이 있습니다.
:::

자율비행 프로그램은 드론을 움직이는 두되에 해당합니다. 자율 비행 프로그램은 비행 제어기에서 동작하는 각종 비행 모듈로 구성되어 있습니다.

<span id="autopilot"></span>

## PX4 자율비행 프로그램

[PX4](http://px4.io/) 는 다양한 기능을 가진 오픈 소스 자율 비행 프로그램입니다. 

PX의 주요기능

- 항공기 (멀티콥터, 고정익 및 수직이착륙기), 지상 운송체및 잠수함을 포함하여 [ 다양한 기체 유형](../airframes/airframe_reference.md)을 제어 
- [운송체 컨트롤러](#vehicle_controller), 센서 및 다양한 주변 장치 지원
- 강력한 [비행 기능](#flight_modes) 및 [안전 기능](#safety)

PX4는 [QGroundControl](#qgc) 지상 제어 프로그램, [Pixhawk 하드웨어](https://pixhawk.org/) 그리고 보조 컴퓨터, 카메라 및 하드웨어(MAVLink 프로토콜을 지원)를 통합하는 [MAVSDK](http://mavsdk.mavlink.io)를 포함하는 플랫폼 중에서 핵심적인 요소입니다. PX4는 [드론코드 프로젝트](https://www.dronecode.org/)의 지원을 받고 있습니다.

<span id="qgc"></span>

## QGroundControl

Dronecode에서 지원하는 지상 관제 프로그램은 [QGroundControl](http://qgroundcontrol.com/)입니다. *QGroundControl*을 사용하여 PX4를 [비행 제어기](flight_controller_selection.md)에 업로드할 수 있으며, 해당 기체 비행에 필요한 각종 변수를 설정하고, 자율 비행의 실시간 정보를 조회할 수 있습니다.

*QGroundControl*은 윈도우, 안드로이드, MacOS 그리고 리눅스에서 실행 가능합니다. [여기](http://qgroundcontrol.com/downloads/)에서 필요한 프로그램을 다운로드할 수 있습니다.

![QGC Main Screen](../../assets/concepts/qgc_main_screen.jpg)

<span id="vehicle_controller"></span>

## 비행 제어기 보드

PX4는 초기에는 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md)에서만 실행되었으나, 지금은 리눅스 뿐만 아니라 여러가지 다양한 하드웨어에서도 실행되어집니다. 기체의 물리적인 조건과 비행의 목적과 비용에 적절한 하드웨어를 선택해야 합니다.

자세한 내용은 [비행 컨트롤러 선택](flight_controller_selection.md)편을 참조하십시오.

## 센서

PX4는 센서를 사용하여 기체의 상태를 결정 (자율 비행시 기체 안정화에 필수적인 과정)합니다. 자이로스코프 센서, 가속도 센서, 지자기 센서 및 기압 센서는 * 시스템 구동을 위한 최소 요구사항입니다*. 자동 [모드](../getting_started/flight_modes.md#categories) 와 기타 모드를 사용하기 위해서는 GPS나 이와 유사한 위치 확인 시스템이 필요합니다. 고정익 및 수직이착륙기에는 대기속도 센서가 반드시 추가되어야 합니다.

더 자세한 정보는 다음을 참고하세요.

- [센서](../getting_started/sensor_selection.md) 
- [주변 장치](../peripherals/README.md)

<span id="outputs"></span>

## 출력 장치: 모터, 서보, 액츄에이터

PX4에서 사용하는 *출력 장치*에는 모터(예 : [ ESC](#esc_and_motors)를 통해), 에일러론 및 플랩과 같은 비행 표면, 카메라 트리거, 낙하산, 그리퍼 및 기타 여러 가지 페이로드 등이 있습니다.

아래의 그림은 [Pixhawk 4](../flight_controller/pixhawk4.md)와 [Pixhawk 4 미니](../flight_controller/pixhawk4_mini.md)의 PWM 출력 포트를 나타냅니다.

![Pixhawk 4 output ports](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN ports](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

출력 장치는 크게 `MAIN`과 `AUX` 장치로 나누어지며, 각각의 장치들은 번호로 구분됩니다. (예: `MAINn` and `AUXn`, 여기서 `n` 1부터 6또는 8까지의 번호).

:::tip
각각의 출력장치들은 기체별로 정해진 기능이 부여되어 있습니다. 기체별로 출력장치의 연결 방법은 [기체 설명](../airframes/airframe_reference.md)편에 자세히 기술되어 있습니다.
:::

:::warning
어떤 기체 제어기에는 `MAIN` 출력 장치들만 있을 수 있으며 (예: *Pixhawk 4 미니*), 6개의 `MAIN` 또는 `AUX` 출력 장치들입니다. 적용하고자하는 [기체](../airframes/airframe_reference.md)에 적합한 출력 포트가 있는 제어기를 선택하여야 합니다..
:::

보틍, `MAIN` 포트는 비행 제어용으로 사용되며, `AUX` 포트는 액튜에이터나 페이로드와 같이 보조 장치를 제어합니다. (때로는, 수직 이착륙리와 같이 `MAIN` 포트가 부족할 경우에 `AUX` 포트를 비행 제어용오로 사용하기도 합니다). 예를 들면, [Generic Quadcopter](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter)에서는 `MAIN` 포트 1-4 은 모터 제어용로 사용하며, 나머지 `MAIN` 포트들과 `AUX` 포트들은 RC 제어용으로 사용됩니다.

[비행 제어기](#vehicle_controller)의 출력 포트는 하드웨어와 PX4 설정에 의해서 결정되어집니다. *일반적으로* PWM 출력용 포트는 위에 언급된 것과 같으며, 보틍은 `MAIN OUT` 또는 `AUX OUT`으로 표시되어 있다.

출력용 포트들은 `FMU PWM OUT` 이나 `IO PWM Out` 또는 이와 유사하게 표시되어 있다. Pixhawk 제어기는 주 FMU 보드가 있고, 이와 별도의 IO 보드가 *있을 수 있습니다.* 별도의 IO 보드에는 `AUX` 포트들은 FMU 보드에 연결되어 있고, `MAIN` 포트들은 IO 보드에 연결되어 있습니다. 그렇지 않으면 `MAIN` 포트들은 FMU 보드에 연결되어 있고, `AUX` 포트가 없을 수도 있습니다. FMU 포트들은 지연 시간일 짧은 [D-shot](../peripherals/dshot.md), *One-shot* 또는 PWM 프로토콜을 사용합니다. 이것들은 높은 성능이 필요한 레이싱 드론 등과 같은 기체에 적합합니다.

출력 포트는 UAVCAN 노드에 연결될 수 있습니다(예: UAVCAN [모터 제어기](../peripherals/uavcan_escs.md)). 이 경우에는 출력 포트 매핑과 동일한 매핑 방식으로 UAVCAN 노드에 연결합니다.

**주의:**

- `MAIN` 포트나 `AUX` 포트에는 PWM/Dshot/OneShot 출력 제어에 충분한 6개에서 8개의 출력 포트가 있읍니다. 이론적으로는 보드 bus에서 더 많은 갯수의 출력용 포트를 제공할 수 있습니다. 특히, UAVCAN bus는 이러한 제한들 받지 않습니다.

<span id="esc_and_motors"></span>

## 속도제어기(ESC)와 모터

대대수의 PX4 드론은 전자 속도 제어기(Electronic Speed Controller, ESC)를 사용하여 브러시리스 모터를 사용합니다. ESC는 비행 컨트롤러의 신호를 모터의 적절한 전력으로 변환합니다.

PX4가 지원하는 ESC/모터에 관한 정보는 여기를 참조하십시오.

- [ESC와 모터](../peripherals/esc_motors.md)
- [ESC 보정](../advanced_config/esc_calibration.md)
- [ESC 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/)(oscarliang.com)

## 배터리와 전원

PX4 드론은 리튬-폴리머(LiPo) 배터리를 가장 많이 사용합니다. 배터리는 일반적으로 비행 컨트롤러 및 ESC(모터 용)에 별도의 전원을 제공하는 * 전원 모듈 * 또는 * 전원 관리 보드*를 사용하여 시스템에 연결됩니다.

배터리 및 배터리 구성에 대한 정보는 [ 배터리 구성 ](../config/battery.md) 및 [ 기본 조립](../assembly/README.md) (예: [Pixhawk 4 배선 퀵 스타트> 전원 ](../assembly/quick_start_pixhawk4.md#power)) 설명서를 참조하십시오.

<span id="rc_systems"></span>

## 무선 조종(RC)

[무선 조종기\(RC\)](../getting_started/rc_transmitter_receiver.md)를 사용하여 드론을 *수동으로* 조종할 수 있습니다. RC는 신호 수신기와 송신기로 구성됩니다. 수신기는 기체의 장착되고, 송신기는 RC 스틱의 위치 데이터를 전송합니다. 일부 RC는 비행 제어기의 텔레메트리 정보를 송수신할 수 있습니다.

:::참고 PX4에는 자율 비행 모드에서는 RC가 반드시 필요하지는 않습니다.
:::

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RC 선택](../getting_started/rc_transmitter_receiver.md)은 무선 조종기를 선택에 필요한 정보뿐만 아니라, 다음과 같은 정보도 포함되어 있습니다.

- [ RC 설정](../config/radio.md) - *QGroundControl*의 RC 설정.
- [비행 첫걸음](../flying/basic_flying.md) - RC로 수동 비행법.
- [ FrSky 텔레메트리](../peripherals/frsky_telemetry.md) - PX4에서 기체의 비행정보를 실시간으로 수신하도록 RC 송신기를 설정하는 방법.

<span id="joystick"></span>

## 지상제어 조이스틱

*QGroundControl*에서 [조이스틱](../config/joystick.md)을 사용하여 PX4를 수동으로 조종할 수 있다. 지상제어프로그램은 조이스틱의 신호를 MAVLink 메시지로 변환하여 텔레메트리로 전송한다. 이와 같은 방식은 *Auterion*, [Skynav](https://auterion-gs.com/skynav/)와 *UAVComponents*, [MicroNav](https://www.uavcomp.com/command-control/micronav/)에서 사용된다. 조이스틱은 비행 시뮬레이션에서도 많이 사용되어진다.

![Photo of MicroNav, a ground controller with integrated joysticks](../../assets/peripherals/joystick/micronav.jpg)

<span id="safety_switch"></span>

## 안전 스위치

운송체에는 *안전 스위치*가 있으며, 안전 스위치는 켜야만 운송체의 시동을 걸 수 있습니다. 운송체의 시동이 걸려야만 모터와 프로펠러가 동작할 수 있습니다. 보통 안전 스위치는 GPS 장치에 붙어있으나, 별도의 부품으로 장착되기도 합니다.

:::경고 일단 기체에 시동이 걸리면 사고가 발생할 수 있으니, 안전 사고에 유의하여야 합니다. 안전 스위치는 갑자기 시동이 걸려 사고가 발생하는 것을 방지합니다.
:::

## 텔레메트리 무선 조종

[텔레메트리](../telemetry/README.md)는 *QGroundControl*과 같은 지상국과 PX4를 실행하는 기체 사이에 MAVLink 무선 통신을 제공합니다. 기체가 비행 중일 때 매개변수를 조정, 실시간으로 데이터 원격 측정 및 확인, 비행 중 임무를 변경등의 작업을 수행할 수 있습니다.

## 외부 보조 컴퓨터

외부 보조 컴퓨터에서 직렬 케이블이나 와이파이를 통해 PX를 제어할 수 있습니다. 보조 컴퓨터는 대개 Dronecode SDK 또는 MAVROS와 같은 MAVLink API를 사용하여 통신합니다.

이와 관련된 추가 정보는 아래와 같습니다.

- [Offboard 모드](../flight_modes/offboard.md) - 지상제어 프로그램 또는 보조 컴퓨터와 같은 PX4의 외부에서 제어를 위한 비행 모드입니다. 
- [로봇 API](../robotics/README.md)

<span id="sd_cards"></span>

## SD 카드

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md), and they are also required in order to use UAVCAN peripherals and fly [missions](../flying/missions.md).

By default, if no SD card is present PX4 will play the [format failed (2-beep)](../getting_started/tunes.md#format-failed) tune twice during boot (and none of the above features will be available).

:::tip
The maximum supported SD card size on Pixhawk boards is 32GB. The *SanDisk Extreme U3 32GB* is [highly recommended](../dev_log/logging.md#sd-cards).
:::

SD cards are never-the-less optional. Flight controllers that do not include an SD Card slot may:

- Disable notification beeps are disabled using the parameter [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER).
- [Stream logs](../dev_log/logging.md#log-streaming) to another component (companion).
- Store missions in RAM/FLASH. <!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/PX4-Autopilot/blob/master/boards/intel/aerofc-v1/src/board_config.h#L115 -->

<span id="arming"></span>

## Arming and Disarming

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents:

- PX4 vehicles are *disarmed* (unpowered) when not in use, and must be explicitly *armed* before taking off.
- Some vehicles also have a [safety switch](#safety_switch) that must be disengaged before arming can succeed (often this switch is part of the GPS).
- Arming is prevented if the vehicle is not in a "healthy" state.
- Arming is prevented if a VTOL vehicle is in fixed-wing mode ([by default](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).
- A vehicle will also usually revert to the disarmed state after landing or if a pilot does not take off quickly enough.

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). It is alternatively possible to configure PX4 to arm using an RC switch or button (and arming MAVLink commands can also be sent from a ground station).

A detailed overview of arming and disarming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

<span id="flight_modes"></span>

## Flight Modes

Flight modes provide different types/levels of vehicle automation and autopilot assistance to the user (pilot). *Autonomous modes* are fully controlled by the autopilot, and require no pilot/remote control input. These are used, for example, to automate common tasks like takeoff, returning to the home position, and landing. Other autonomous modes execute pre-programmed missions, follow a GPS beacon, or accept commands from an offboard computer or ground station.

*Manual modes* are controlled by the user (via the RC control sticks/joystick) with assistance from the autopilot. Different manual modes enable different flight characteristics - for example, some modes enable acrobatic tricks, while others are impossible to flip and will hold position/course against wind.

:::tip
Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).
:::

An overview of the available flight modes [can be found here](../getting_started/flight_modes.md). Instructions for how to set up your remote control switches to turn on different flight modes is provided in [Flight Mode Configuration](../config/flight_mode.md).

<span id="safety"></span>

## Safety Settings (Failsafe)

PX4 has configurable failsafe systems to protect and recover your vehicle if something goes wrong! These allow you to specify areas and conditions under which you can safely fly, and the action that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point).

:::note
You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.
:::

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

![Frame Heading](../../assets/concepts/frame_heading.png)

:::note
For a VTOL Tailsitter the heading is relative to the multirotor configuration (i.e. vehicle pose during, takeoff, hovering, landing).
:::

It is important to know the vehicle heading direction in order to align the autopilot with the vehicle vector of movement. Multicopters have a heading even when they are symmetrical from all sides! Usually manufacturers use a colored props or colored arms to indicate the heading.

![Frame Heading TOP](../../assets/concepts/frame_heading_top.png)

In our illustrations we will use red coloring for the front propellers of multicopter to show heading.

You can read in depth about heading in [Flight Controller Orientation](../config/flight_controller_orientation.md)