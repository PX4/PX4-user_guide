# 기본 개념

이 주제는 무인 항공기에 대한 기본적인 소개와 PX4 사용에 대해 설명합니다. (초보자를 위한 것이지만 숙련된 사용자에게도 좋은 소개 자료입니다.)

기본 개념을 이미 잘 알고 있다면 [기본 조립](../assembly/README.md)으로 이동하여 특정 비행 컨트롤러 하드웨어를 배선하는 방법을 배울 수 있습니다. *QGroundControl*을 사용하여 펌웨어를 설치하고 기체를 설정하려면 [기본 설정](../config/README.md)을 참조하십시오.

## 드론이란?

드론은 원격 또는 자율적으로 제어될 수 있는 무인 "로봇" 기체입니다.

Drones are used for many [consumer, industrial, government and military applications](https://px4.io/ecosystem/commercial-systems/). 여기에는 (대략) 항공 사진/비디오, 화물 운송, 레이싱, 검색 및 측량 등 내용이 포함됩니다.

:::tip
Different types of drones exist for use in air, ground, sea, and underwater. These are (more formally) referred to as Unmanned Aerial Vehicles (UAV), Unmanned Aerial Systems (UAS), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV), Unmanned Underwater Vehicles (UUV).
:::

The "brain" of the drone is called an autopilot. It consists of *flight stack* software running on *vehicle controller* ("flight controller") hardware.

<span id="autopilot"></span>

## PX4 Autopilot

[PX4](http://px4.io/) is powerful open source autopilot *flight stack*.

Some of PX4's key features are:

- 항공기 (멀티콥터, 고정익 항공기 및 VTOL), 지상 기체 및 수중함을 포함하여 [ 다양한 기체 프레임/유형](../airframes/airframe_reference.md)을 제어합니다. 
- [기체 컨트롤러](#vehicle_controller), 센서 및 기타 주변 장치 하드웨어 선택 시 좋은 선택입니다.
- 유연하고 강력한 [비행 모드](#flight_modes) 및 [안전 기능](#safety)을 갖고 있습니다.

PX4 is a core part of a broader drone platform that includes the [QGroundControl](#qgc) ground station, [Pixhawk hardware](https://pixhawk.org/), and [MAVSDK](http://mavsdk.mavlink.io) for integration with companion computers, cameras and other hardware using the MAVLink protocol. PX4 is supported by the [Dronecode Project](https://www.dronecode.org/).

<span id="qgc"></span>

## QGroundControl

The Dronecode ground control station is called [QGroundControl](http://qgroundcontrol.com/). You can use *QGroundControl* to load (flash) PX4 onto the [vehicle control hardware](flight_controller_selection.md), you can setup the vehicle, change different parameters, get real-time flight information and create and execute fully autonomous missions.

*QGroundControl* runs on Windows, Android, MacOS or Linux. Download and install it from [here](http://qgroundcontrol.com/downloads/).

![QGC Main Screen](../../assets/concepts/qgc_main_screen.jpg)

<span id="vehicle_controller"></span>

## Vehicle/Flight Controller Board

PX4 was initially designed to run on [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers, but can now run on Linux computers and other hardware. You should select a board that suits the physical constraints of your vehicle, the activities you wish to perform, and of course cost.

For more information see: [Flight Controller Selection](flight_controller_selection.md).

## 센서

PX4 uses sensors to determine vehicle state (needed for stabilization and to enable autonomous control). The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. A GPS or other positioning system is needed to enable all automatic [modes](../getting_started/flight_modes.md#categories), and some assisted modes. Fixed wing and VTOL-vehicles should additionally include an airspeed sensor (very highly recommended).

For more information see:

- [센서](../getting_started/sensor_selection.md) 
- [주변 장치](../peripherals/README.md)

<span id="outputs"></span>

## Outputs: Motors, Servos, Actuators

PX4 uses *outputs* to control: motor speed (e.g. via [ESC](#esc_and_motors)), flight surfaces like ailerons and flaps, camera triggers, parachutes, grippers, and many other types of payloads.

For example, the images below show the PWM output ports for [Pixhawk 4](../flight_controller/pixhawk4.md) and [Pixhawk 4 mini](../flight_controller/pixhawk4_mini.md).

![Pixhawk 4 output ports](../../assets/flight_controller/pixhawk4/pixhawk4_main_aux_ports.jpg) ![Pixhawk4 mini MAIN ports](../../assets/flight_controller/pixhawk4mini/pixhawk4mini_pwm.png)

The outputs are divided into `MAIN` and `AUX` outputs, and individually numbered (i.e. `MAINn` and `AUXn`, where `n` is 1 to usually 6 or 8).

:::tip
The specific purpose for each output is hard coded on a per-airframe basis. The output mapping for all airframes is given in the [Airframe Reference](../airframes/airframe_reference.md).
:::

:::warning
A flight controller may only have `MAIN` outputs (like the *Pixhawk 4 Mini*), or may have only 6 outputs on either `MAIN` or `AUX`. Ensure that you select a controller that has enough of the right types of ports/outputs for your [airframe](../airframes/airframe_reference.md).
:::

Typically the `MAIN` port is used for core flight controls while `AUX` is used for non-critical actuators/payloads (though `AUX` may be used for flight controls if there aren't enough `MAIN` ports for the vehicle type- e.g. VTOL). For example, in a [Generic Quadcopter](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter) the `MAIN` outputs 1-4 are used for corresponding motors, while the remaining `MAIN` and some `AUX` outputs are used for RC passthrough.

The actual ports/bus used for the outputs on the [flight controller](#vehicle_controller) depends on the hardware and PX4 configuration. *Usually* the ports are mapped to PWM outputs as shown above, which are commonly screen printed `MAIN OUT` and `AUX OUT`.

They might also be marked as `FMU PWM OUT` or `IO PWM Out` (or similar). Pixhawk controllers have a "main" FMU board and *may* have a separate IO board. If there is an IO board, the `AUX` ports are connected directly to the FMU and the `MAIN` ports are connected to the IO board. Otherwise the `MAIN` ports are connected to the FMU, and there are no `AUX` ports. The FMU output ports can use [D-shot](../peripherals/dshot.md) or *One-shot* protocols (as well as PWM), which provide much lower-latency behaviour. This can be useful for racers and other airframes that require better performance.

The output ports may also be mapped to UAVCAN nodes (e.g. UAVCAN [motor controllers](../peripherals/uavcan_escs.md)). The (same) airframe mapping of outputs to nodes is used in this case.

**Notes:**

- There are only 6-8 outputs in `MAIN` and `AUX` because most flight controllers only have this many PWM/Dshot/Oneshot outputs. In theory there can be many more outputs if the bus supports it (i.e. a UAVCAN bus is not limited to this few nodes).

<span id="esc_and_motors"></span>

## ESCs & Motors

Many PX4 drones use brushless motors that are driven by the flight controller via an Electronic Speed Controller (ESC) (the ESC converts a signal from the flight controller to an appropriate level of power delivered to the motor).

For information about what ESC/Motors are supported by PX4 see:

- [ESC & Motors](../peripherals/esc_motors.md)
- [ESC Calibration](../advanced_config/esc_calibration.md)
- [ESC Firmware and Protocols Overview](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)

## Battery/Power

PX4 drones are mostly commonly powered from Lithium-Polymer (LiPo) batteries. The battery is typically connected to the system using a *Power Module* or *Power Management Board*, which provide separate power for the flight controller and to the ESCs (for the motors).

Information about batteries and battery configuration can be found in [Battery Configuration](../config/battery.md) and the guides in [Basic Assembly](../assembly/README.md) (e.g. [Pixhawk 4 Wiring Quick Start > Power](../assembly/quick_start_pixhawk4.md#power)).

<span id="rc_systems"></span>

## Radio Control (RC)

A [Radio Control \(RC\)](../getting_started/rc_transmitter_receiver.md) system is used to *manually* control the vehicle. It consists of a remote control unit that uses a transmitter to communicate stick/control positions with a receiver based on the vehicle. Some RC systems can additionally receive telemetry information back from the autopilot.

:::note
PX4 does not require a remote control system for autonomous flight modes.
:::

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RC System Selection](../getting_started/rc_transmitter_receiver.md) explains how to choose an RC system. Other related topics include:

- [Radio/Remote Control Setup](../config/radio.md) - Remote control configuration in *QGroundControl*.
- [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.
- [FrSky Telemetry](../peripherals/frsky_telemetry.md) - Set up the RC transmitter to receive telemetry/status updates from PX4.

<span id="joystick"></span>

## GCS Joystick Controller

A [computer joystick](../config/joystick.md) connected through *QGroundControl* can also be used to manually control PX4 (QGC converts joystick movements into MAVLink messages that are sent over the telemetry link). This approach is used by ground control units that have an integrated ground control station, like the *Auterion* [Skynav](https://auterion-gs.com/skynav/) or *UAVComponents* [MicroNav](https://www.uavcomp.com/command-control/micronav/). Joysticks are also commonly used to fly the vehicle in simulation.

![Photo of MicroNav, a ground controller with integrated joysticks](../../assets/peripherals/joystick/micronav.jpg)

<span id="safety_switch"></span>

## Safety Switch

It is common for vehicles to have a *safety switch* that must be engaged before the vehicle can be [armed](#arming) (when armed, motors are powered and propellers can turn). Commonly the safety switch is integrated into a GPS unit, but it may also be a separate physical component.

:::warning
A vehicle that is armed is potentially dangerous. The safety switch is an additional mechanism that prevents arming from happening by accident.
:::

## Data/Telemetry Radios

[Data/Telemetry Radios](../telemetry/README.md) can provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. This makes it possible to tune parameters while a vehicle is in flight, inspect telemetry in real-time, change a mission on the fly, etc.

## Offboard/Companion Computer

PX4 can be controlled from a separate on-vehicle companion computer via a serial cable or wifi. The companion computer will usually communicate using a MAVLink API like the MAVSDK or MAVROS.

Relevent topics include:

- [Off-board Mode](../flight_modes/offboard.md) - Flight mode for offboard control of PX4 from a GCS or companion computer. 
- [Robotics APIs](../robotics/README.md)

<span id="sd_cards"></span>

## SD Cards (Removable Memory)

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