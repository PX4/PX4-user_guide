# 기본 개념

이 주제는 무인 항공기에 대한 기본적인 소개와 PX4 사용에 대해 설명합니다. (초보자를 위한 것이지만 숙련된 사용자에게도 좋은 소개 자료입니다.)

기본 개념을 이미 잘 알고 있다면 [기본 조립](../assembly/README.md)으로 이동하여 특정 비행 컨트롤러 하드웨어를 배선하는 방법을 배울 수 있습니다. *QGroundControl*을 사용하여 펌웨어를 설치하고 기체를 설정하려면 [기본 설정](../config/README.md)을 참조하십시오.

## 드론이란?

드론은 원격 또는 자율적으로 제어될 수 있는 무인 "로봇" 기체입니다.

Drones are used for many [consumer, industrial, government and military applications](https://px4.io/ecosystem/commercial-systems/). 여기에는 (대략) 항공 사진/비디오, 화물 운송, 레이싱, 검색 및 측량 등 내용이 포함됩니다.

> **팁** 항공기, 지상, 해상 및 수중에서 사용하기 위해 다양한 유형의 무인 항공기가 존재합니다. 무인 항공기(UAV), 무인 항공 시스템(UAS), 무인 지상 기체(UGV), 무인 수면함(USV), 무인 수중함(UUV) 이라고 합니다.

드론의 "두뇌"는 비행 컨트롤러입니다. 이 장치는 *기체 컨트롤러* ( "비행 컨트롤러") 하드웨어에서 실행되는 *펌웨어*로 이루어져 있습니다.

## PX4 비행 컨트롤러 {#autopilot}

[PX4](http://px4.io/)는 강력한 오픈 소스 비행 컨트롤러 *펌웨어* 입니다.

몇 가지 PX4의 주요 특징은 다음과 같습니다:

- 항공기 (멀티콥터, 고정익 항공기 및 VTOL), 지상 기체 및 수중함을 포함하여 [ 다양한 기체 프레임/유형](../airframes/airframe_reference.md)을 제어합니다. 
- [기체 컨트롤러](#vehicle_controller), 센서 및 기타 주변 장치 하드웨어 선택 시 좋은 선택입니다.
- 유연하고 강력한 [비행 모드](#flight_modes) 및 [안전 기능](#safety)을 갖고 있습니다.

PX4는 [QGroundControl](#qgc) 지상국 프로그램, [Pixhawk 하드웨어](https://pixhawk.org/) 그리고 컴패니언 컴퓨터, 카메라 및 MAVLink 프로토콜을 사용하는 다른 하드웨어를 통합한 [MAVSDK](http://mavsdk.mavlink.io)를 포함하는 더 넓은 범주의 플랫폼의 핵심 부분입니다. [Dronecode 프로젝트](https://www.dronecode.org/)가 PX4를 지원합니다.

## QGroundControl {#qgc}

Dronecode 지상 관제소는 [QGroundControl](http://qgroundcontrol.com/)이라고 합니다. *QGroundControl*을 사용하여 PX4를 [기체 제어 하드웨어](flight_controller_selection.md)에 로드(플래시)하여 기체를 설정하고 다른 파라미터를 변경하고 실시간 비행 정보를 얻고 완전 자율 임무를 생성 및 실행할 수 있습니다.

*QGroundControl*은 Windows, Android, MacOS 또는 Linux에서 실행됩니다. [여기](http://qgroundcontrol.com/downloads/)에서 다운로드하고 설치하십시오.

![QGC 메인 화면](../../images/qgc_main_screen.jpg)

## 기체/비행 제어 보드 {#vehicle_controller}

PX4는 초기에 [Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에서 실행되도록 설계되었지만, 이제 Linux 컴퓨터 및 기타 하드웨어에서도 실행될 수 있습니다. 기체 물리적 제한, 수행하려는 활동 및 비용에 적합한 보드를 선택해야합니다.

자세한 내용은 [비행 컨트롤러 선택](flight_controller_selection.md)을 참조하십시오.

## 센서

PX4는 센서를 사용하여 기체 상태를 결정합니다 (기체 안정화에 필요하고 자율 주행을 활성화합니다). 시스템은 자이로스코프 센서, 가속도 센서, 지자기(나침반) 센서 및 기압 센서를 *최소로 요구합니다*. 자동 [모드](../getting_started/flight_modes.md#categories) 활성화와 다른 몇몇 보조 모드의 활성화를 위해서는 GPS또는 다른 위치 확인 시스템이 필요합니다. 고정익 및 VTOL 기체는 대기속도 센서가 추가로 포함되어야 합니다(매우 권장됨).

더 자세한 정보는 다음을 참고하세요.

- [센서](../getting_started/sensor_selection.md) 
- [주변 장치](../peripherals/README.md)

## ESC와 모터

많은 PX4 드론은 전자 속도 컨트롤러(Electronic Speed Controller, ESC)를 통해 비행 컨트롤러에 의해 구동되는 브러시리스 모터를 사용합니다 (ESC는 비행 컨트롤러의 신호를 모터로 전해지는 적절한 수준의 전력으로 변환합니다).

PX4가 지원하는 ESC/모터에 관한 정보는 여기를 참조하십시오.

- [ESC와 모터](../peripherals/esc_motors.md)
- [ESC 캘리브레이션](../advanced_config/esc_calibration.md)
- [ESC 펌웨어와 프로토콜 개요](https://oscarliang.com/esc-firmware-protocols/)(oscarliang.com)

## 배터리/전원

PX4 드론은 대부분 리튬-폴리머(LiPo) 배터리로 구동됩니다. 배터리는 일반적으로 비행 컨트롤러 및 ESC(모터 용)에 별도의 전원을 제공하는 * 전원 모듈 * 또는 * 전원 관리 보드*를 사용하여 시스템에 연결됩니다.

배터리 및 배터리 구성에 대한 정보는 [ 배터리 구성 ](../config/battery.md) 및 [ 기본 조립](../assembly/README.md) (예: [Pixhawk 4 배선 퀵 스타트> 전원 ](../assembly/quick_start_pixhawk4.md#power)) 설명서를 참조하십시오.

## 무선 컨트롤(RC) {#rc_systems}

[라디오 컨트롤\(RC\)](../getting_started/rc_transmitter_receiver.md) 시스템은 기체를 *수동으로* 제어하는데 사용됩니다. 기체를 기반으로 수신기와 스틱/제어 위치를 통신하기 위해 송신기를 사용하는 원격 제어 장치로 구성됩니다. 몇몇 RC 시스템은 비행 컨트롤러부터 텔레메트리 정보를 추가적으로 다시 받아올 수 있습니다.

> **참고** PX4에는 자율 비행 모드에 원격 제어 시스템이 필요하지 않습니다.

![Taranis X9D 송신기](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RC 시스템 선택](../getting_started/rc_transmitter_receiver.md)은 RC 시스템을 선택하는 방법을 설명합니다. 다른 관련 주제는 다음과 같습니다.

- [ 라디오/원격 제어 설정](../config/radio.md) - *QGroundControl*의 원격 제어 설정.
- [비행 첫걸음](../flying/basic_flying.md) - RC로 비행하는 법을 배웁니다.
- [ FrSky 텔레메트리](../peripherals/frsky_telemetry.md) - PX4에서 원격 측정/상태 업데이트를 수신하도록 RC 송신기를 설정합니다.

## GCS Joystick Controller {#joystick}

A [computer joystick](../config/joystick.md) connected through *QGroundControl* can also be used to manually control PX4 (QGC converts joystick movements into MAVLink messages that are sent over the telemetry link). This approach is used by ground control units that have an integrated ground control station, like the *UAVComponents* [MicroNav](https://www.uavcomp.com/command-control/micronav/) shown below. Joysticks are also commonly used to fly the vehicle in simulation.

![Joystick MicroNav.](../../assets/peripherals/joystick/micronav.jpg)

## Safety Switch {#safety_switch}

It is common for vehicles to have a *safety switch* that must be engaged before the vehicle can be [armed](#arming) (when armed, motors are powered and propellers can turn). Commonly the safety switch is integrated into a GPS unit, but it may also be a separate physical component.

> **Note** A vehicle that is armed is potentially dangerous. The safety switch is an additional mechanism that prevents arming from happening by accident.

## Data/Telemetry Radios

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

## Offboard/Companion Computer

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

> **Note** Using a Robotics API requires software development skills, and is outside the scope of this guide.

- [Offboard 모드](../flight_modes/offboard.md) - 지상국 또는 보조 컴퓨터와 같은 PX4의 외부에서 제어를 위한 비행 모드입니다. 
- [Robotics APIs](https://dev.px4.io/master/en/robotics/) (PX4 Developer Guide)

## SD Cards (Removable Memory) {#sd_cards}

PX4 uses SD memory cards for storing [flight logs](../getting_started/flight_reporting.md), and they are also required in order to use UAVCAN peripherals and fly [missions](../flying/missions.md).

By default, if no SD card is present PX4 will play the [format failed (2-beep)](../getting_started/tunes.md#format-failed) tune twice during boot (and none of the above features will be available).

> **Tip** The maximum supported SD card size on Pixhawk boards is 32GB. The *SanDisk Extreme U3 32GB* is [highly recommended](https://dev.px4.io/master/en/log/logging.html#sd-cards) (Developer Guide).

SD cards are never-the-less optional. Flight controllers that do not include an SD Card slot may:

- Disable notification beeps are disabled using the parameter [CBRK_BUZZER](../advanced_config/parameter_reference.md#CBRK_BUZZER).
- [Stream logs](https://dev.px4.io/master/en/log/logging.html#log-streaming) to another component (companion).
- Store missions in RAM/FLASH. <!-- Too low-level for this. But see FLASH_BASED_DATAMAN in  Intel Aero: https://github.com/PX4/Firmware/blob/master/boards/intel/aerofc-v1/src/board_config.h#L115 -->

## Arming and Disarming {#arming}

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents:

- PX4 vehicles are *disarmed* (unpowered) when not in use, and must be explicitly *armed* before taking off.
- Some vehicles additionally require a [safety switch](../getting_started/px4_basic_concepts.md#safety_switch) be disengaged before arming can succeed.
- Arming is prevented if the vehicle is not in a "healthy" state.
- A vehicle will also usually revert to the disarmed state after landing or if a pilot does not take off quickly enough.

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). It is also possible to configure PX4 to arm using an RC button on the RC control (and arming commands can be sent from a ground station).

A detailed overview of arming and arming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

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