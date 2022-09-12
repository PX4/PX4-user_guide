# 액추에이터 설정 및 테스트

_액추에이터 설정_ 보기는 기체의 특정 지오메트리를 사용자가 지정하고, 액츄에이터와 모터를 비행 컨트롤러 출력에 할당하고, 액츄에이터와 모터 응답을 테스트 합니다.

표시되는 요소는 [선택한 프레임](../config/airframe.md)에 따라 달라지며, 출력은 [기체 참조](../airframes/airframe_reference.md)와 같이 기본적으로 매핑됩니다.

:::note
*액추에이터* 보기는 기하학 및 믹서 구성 파일을 매개변수로 대체하는 _동적 제어 할당_이 활성화된 경우에만 표시됩니다. 이 기능은 기본적으로 비활성화되어 있습니다.

이 기능을 사용하려면 매개변수 [SYS_CTRL_ALLOC=1](../advanced_config/parameter_reference.md#SYS_CTRL_ALLOC)을 설정하고 [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME)에 올바른 프레임 유형이 설정되어 있는 지 확인하십시오. *QGroundControl*을 재시작하여야 합니다. <!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/systemlib/system_params.c#L298 -->

시뮬레이션에서 이것을 시도하는 가장 쉬운 방법은 사전에 제어 할당이 활성화된 다음 전망대 `make` 대상을 사용하는 것입니다.

```
make px4_sitl gazebo_iris_ctrlalloc
make px4_sitl gazebo_typhoon_h480_ctrlalloc
```
:::

여기에서 *QGroundControl* 보기를 오픈합니다. **"Q"(앱 메뉴) > 차량 설정 > 액추에이터**(탭).

## 개요

보기에는 세 개의 섹션이 있습니다.
- [기하](#geometry): [선택한 기체](../config/airframe.md)의 기하 도형을 설정합니다. 여기에는 [모터](#motor-geometry)의 수, 위치 및 속성과 [제어 표면](#control-surfaces-geometry) 및 [모터 틸트 서보](#motor-tilt-servo-geometry)의 수와 속성이 포함됩니다.
- [액추에이터 출력](#actuator-outputs): 모터, 제어 표면 및 기타 액추에이터를 특정 출력에 할당합니다.
- [액추에이터 테스트](#actuator-testing): 모터와 액추에이터가 예상대로 방향과 속도로 움직이는 지 테스트합니다.

쿼드콥터에는 아래와 같은 설정 화면이 있을 수 있습니다. 이것은 X-지오메트리를 가진 4-로터 헬리콥터를 정의합니다. 4개의 모터를 AUX1에서 AUX4 출력으로 매핑하고, DShot1200 ESC에 연결하도록 설정합니다. 또한 낙하산 및 착륙 장치를 제어하기 위한 PWM400 AUX 출력을 매핑합니다.

![Actuators MC (QGC)](../../assets/config/actuators/qgc_actuators_mc_aux.png)

:::note
기본적으로 가장 일반적인 설정만 표시됩니다. 모든 설정을 표시하려면 오른쪽 상단 모서리에 있는 **고급** 확인란을 선택합니다.
:::

## 지오메트리

지오메트리 섹션은 선택한 [기체](../config/airframe.md)에 대해 구성 가능한 지오메트리 관련 매개변수를 설정하는 데 사용됩니다. 여기에는 [모터](#motor-geometry)의 수와 위치, [제어 표면](#control-surfaces-geometry)의 수, 기능 및 속성이 포함됩니다. VTOL 틸트로터 차량의 경우 [틸트 서보](#motor-tilt-servo-geometry)의 수와 속성도 포함됩니다.

:::note UI는 선택한 기체에 맞게 사용자 지정됩니다:

- 선택한 기체 유형에 대한 _구성 가능_ 필드만 표시됩니다. 기체에 대해 구성할 수 없는 필드는 숨겨져 있습니다.
- 모터 위치 다이어그램은 현재 멀티콥터 프레임에만 표시됩니다.
:::

### 모터 지오메트리

모터 지오메트리 섹션에서는 모터 수, 상대 위치 및 각 모터의 기타 속성을 설정합니다.

대부분의 모터 속성은 모든 프레임에 적용됩니다. 몇 가지 속성이 특정 프레임에 적용됩니다. 예를 들어, `기울기` 및 `축`은 각각 [틸트로터 VTOL](#motor-geometry-vtol-tiltrotor) 및 [표준 VTOL](#motor-geometry-standard-vtol) 기체에 해당됩니다.

멀티콥터 기체의 기하학적 구성은 각 모터의 상대적 x,y 위치를 보여주는 다이어그램을 제공합니다. 다른 프레임의 모터 위치에 대한 광범위한 이해는 [기체 참조](../airframes/airframe_reference.md)를 참고하십시오.

코어 지오메트리 개념과 다양한 프레임에 대한 설정은 다음 섹션에서 제공됩니다.


#### 모터 지오메트리: 멀티콥터

아래 이미지는 고급 설정이 있거나 없는 멀티콥터 프레임의 지오메트리 설정을 나타냅니다.

:::note
특히 이것은 [Quadrotor Wide](../airframes/airframe_reference.md#quadrotor-wide) 뮤티콥터의 모터 지오메트리입니다. 다른 멀티콥터 프레임도 유사하게 구성됩니다.
:::

![Geometry MC (QGC)](../../assets/config/actuators/qgc_actuators_mc_geometry_marked.png)

먼저, **모터** 드롭다운 설정을 통하여 모터 수(위 예의 경우 4개)를 선택할 수 있습니다.

각 모터에 대해 다음을 설정할 수 있습니다:

- `위치 X`: [X 위치](#motor-position-coordinate-system), 미터 단위.
- `위치 Y`: [Y 위치](#motor-position-coordinate-system), 미터 단위.
- `위치 Z`: [Z 위치](#motor-position-coordinate-system), 미터 단위.
- (고급) `CCW 방향`: 모터가 시계 반대 방향으로 회전하는 것을 나타내는 확인란입니다(시계 방향의 경우 선택 취소).
- (고급) `양방향`: 모터가 [양방향](#bidirectional-motors)임을 나타내는 확인란
- (고급) `슬루율`: 자세한 내용은 [제어 표면 기하학](#control-surfaces-geometry) 섹션을 참조하십시오.

:::note
`X`, `Y`, `Z` 위치는 _무게 중심_을 기준으로 [FRD 좌표계에 있습니다. ](#motor-position-coordinate-system). 이것은 비행 컨트롤러의 위치와 동일하지 않을 수 있습니다.
:::


#### 모터 지오메트리: VTOL Quadrotor Tailsitter

[VTOL Quad Tailsitter](../airframes/airframe_reference.md#vtol-quad-tailsitter)의 모터 구조는 아래에 나와 있습니다(다른 Tailsitter VTOL 차량을 구성하는 방법도 유사함).

모터는 [멀티콥터 지오메트리](#motor-geometry-multicopter)와 동일한 구성 필드를 갖습니다.

![Geometry motor: tailsitter vtol](../../assets/config/actuators/qgc_geometry_tailsitter_motors.png)


#### 모터 지오메트리: VTOL 틸트로터

[일반 쿼드플레인 VTOL 틸트로터](../airframes/airframe_reference.md#vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor)의 모터 지오메트리는 아래에 기술되어 있습니다(다른 [VTOL 틸트로터](../airframes/airframe_reference.md#vtol_vtol_tiltrotor_generic_quadplane_vtol_tiltrotor)를 구성하는 방식도 유사함).

![Geometry motor: tiltrotor vtol](../../assets/config/actuators/qgc_geometry_tiltrotor_motors.png)

- `기울기`: 모터를 기울이는 데 사용되는 관련 서보입니다. 이 서보의 속성은 [모터 틸트 서보 지오메트리](#motor-tilt-servo-geometry)에 정의되어 있습니다.


#### 모터 형상: 표준 VTOL

[일반 표준 쿼드플레인 VTOL 틸트로터](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quadplane_vtol)의 모터 구조는 아래와 같습니다(다른 "표준 VTOL"을 구성하는 방법도 유사함).

![Geometry motor: standard vtol](../../assets/config/actuators/qgc_geometry_standard_vtol_motors.png)

모터는 [멀티콥터 지오메트리](#motor-geometry-multicopter)와 대부분 동일한 구성 필드를 갖습니다. 모터가 차량을 움직이는 방향을 나타내는 추가 필드가 있습니다(표준 VTOL의 경우 호버 모터는 일반적으로 "위쪽"으로 설정되고 푸셔 모터는 "앞으로"로 설정됨).

- `축`: `위로`, `아래로`, `앞으로`, `뒤로`, ` 중 하나 왼쪽으로`, `오른쪽으로`, `사용자 지정`
  - `사용자 지정`을 선택하면 UI에 모터 방향 설정을 위한 세 개의 추가 필드가 표시됩니다.

#### 모터 지오메트리: 기타 기체

다른 기체 유형은 프레임 유형에 적합한 모터 형상을 정의합니다. 다시 한 번 이러한 모터는 일반적으로 위에 표시된 것과 같은 종류의 속성을 가집니다.

예를 들어, 고정익에는 단일 푸셔 모터만 있을 수 있지만, 차동 조향 장치가 있는 로버에는 스로틀 및 조향용 모터가 있습니다.


#### 모터 위치 좌표계

The coordinate system for motor positions is FRD (in body frame), where the X axis points forward, the Y axis to the right and the Z axis down.

The origin is the vehicle's **centre-of-gravity (COG)**. This may **NOT** be the same position as the location of the autopilot.

![Actuators CG reference diagram](../../assets/config/actuators/quadcopter_actuators_cg_reference.png)


#### Bidirectional Motors

Some vehicles may use bidirectional motors (i.e. motors that support spinning in both directions). For example, ground vehicles that want to move forwards and backwards, or VTOL vehicles that have pusher motors that can turn in either direction.

If bidiectional motors are used, make sure to select the **Reversible** checkbox for those motors (the checkbox is displayed as an "advanced" option).

![Reversible](../../assets/config/actuators/qgc_geometry_reversible_marked.png)

Note that you will need to also ensure that the ESC associated with bidirectional motors is configured appropriately (e.g. 3D mode enabled for DShot ESCs, which can be achieved via [DShot commands](../peripherals/dshot.md#commands)).


### Control Surfaces Geometry

The control surfaces section of the geometry panel lets you set the number and types of control surfaces that are present on the vehicle. You may also need to set trim and slew rate values in some cases. More advanced users can also configure the roll scale, yaw scale, and pitch scale (generally the defaults are acceptable, and this is not needed).

An "example" control surface section for a vehicle with two ailerons is shown below. Note that ailerons only affect roll, so the pitch and yaw fields are disabled.

![Control Surface Setup Example](../../assets/config/actuators/control_surfaces_geometry.png)

The fields are:

- `Control Surfaces`: The number of control surfaces (set this first!)
- `Type`: The type of each control surface: `LeftAileron`, `RightAileron`, `Elevator`, `Rudder`, `Left Elevon`, `Right Elevon`, `Left V-Tail`, `Right V-Tail`, `Left Flap`, `Right Flap`, `Airbrakes`, `Custom`.
- `Roll scale`: Effectiveness of actuator around roll axis (normalised: -1 to 1). [Generally you should use the default actuator value](#actuator-roll-pitch-and-yaw-scaling).
- `Pitch scale`: Effectiveness of actuator around pitch axis (normalised: -1 to 1). [Generally you should use the default actuator value](#actuator-roll-pitch-and-yaw-scaling).
- `Yaw scale`: Effectiveness of actuator around yaw axis (normalised: -1 to 1). [Generally you should use the default actuator value](#actuator-roll-pitch-and-yaw-scaling).
- `Trim`: An offset added to the actuator so that it is centered without input. This might be determined by trial and error.
- `Slew Rate`: Minimum time allowed for the motor/servo signal to pass through the full output range, in seconds.
  - The setting limits the rate of change of an actuator (if not specified then no rate limit is applied). It is intended for actuators that may be damaged if they move too fast — such as the tilting actuators on a tiltrotor VTOL vehicle.
  - For example, a setting of 2.0 means that the motor/servo will not be commanded to move from 0 to 1 at a rate that completes the operation in less than 2 seconds (in case of reversible motors, the range is -1 to 1).
- `Lock control surfaces in hover`:
  - `Enabled`: Most vehicles do not use control surfaces in hover. Use this setting to lock them so that they don't affect vehicle dynamics.
  - `Disabled`: Set this for vehicles that use control surfaces in hover, such as the duo tailsitter (which uses elevons for pitch and yaw control). It should also be set for vehicles that use control surfaces to provide additional stabilization in hover mode when moving at speed or in high winds.


#### Actuator Roll, Pitch, and Yaw Scaling

:::note
For the majority of airframe setups the default values for each control surface types should not be changed.
:::

The `Roll scale`, `Pitch scale` and `Yaw scale` values indicate the normalized effectiveness of the actuator around the corresponding axis.

Tuning the values is a low/level/advanced topic, and is generally only needed when tuning coupled control surfaces (like an elevon, that controls both pitch and roll). In this case the things you need to know are:

- The numbers that are entered are directly put into the allocation matrix, that is then inverted to get from desired moments (normalized) to control signals.
- Increasing the scale will _reduce_ the deflection of the control surfaces (as it gets inverted).

<!-- For more information see: []() (PX4 Dev Summit, 2022) -->
 

#### Control Surface Deflection Convention

The diagram below shows the convention for deflections:

![Control Surface Deflections](../../assets/config/actuators/plane_control_surface_convention.png)

In summary:

- **Horizontal Control Surfaces:** Upwards movement equals positive deflection. Includes Ailerons, etc
- **Vertical Control Surfaces:** Rightwards movement is positive deflection. Includes rudders etc.
- **Mixed Control Surfaces:** Upwards/rightwards movement is positive (as above). Includes V-Tail etc.

<!-- Also see this comment: https://github.com/PX4/PX4-Autopilot/blob/96b03040491e727752751c0e0beed87f0966e6d4/src/modules/control_allocator/module.yaml#L492 -->

### Motor Tilt Servo Geometry

[VTOL tiltrotor vehicles](../frames_vtol/tiltrotor.md) can tilt their motors to transition between hover and forward flight. This section defines the properties of the tilting servos. These are mapped to specific motors in the motor geometry for a tiltrotor.

The example below shows the tilt servo setup for the [tiltrotor motor geometry shown above](../config/actuators.md#motor-geometry-vtol-tiltrotor).

![Tilt Servo Geometry Setup Example](../../assets/config/actuators/tilt_servo_geometry_config.png)

The values that can be set are:

- `Tilt servos`: The number of servos (tiltable motors).
- `Angle at min tilt`: [Maximum tilt angle](#tilt-servo-coordinate-system) in degrees, relative to the z axis.
- `Angle at max tilt`: [Minimum tilt angle](#tilt-servo-coordinate-system) in degrees, relative to the z-axis.
- `Tilt direction`: `Towards front` (positive x direction) or `Towards right` (positive y direction).
- `Use for control`: [Tilt servo used for yaw/pitch](#tilt-servos-for-yaw-pitch-control)
  - `None`: Torque control is not used.
  - `Yaw`: Tilt servos used to control yaw.
  - `Pitch`: Tilt servos used to control pitch.
  - `Both Yaw and Pitch`: Tilt servos are used to control both yaw and pitch.


#### Tilt Servo Coordinate System

The coordinate system for tilt rotor angles is shown below. The reference direction for tilt angles is straight upwards (0 degrees). Tilt angles towards the front or right of the vehicle are positive, and towards the back or to the left are negative.

![Tilt Axis](../../assets/config/actuators/tilt_axis.png)

The `Angle at min tilt` and `Angle at max tilt` indicate the range of movement for the tilt servo. The minimum tilt is the smaller _numerical value_ (not absolute) of the two angles.

If the max/min tilt vectors are **P<sub>0</sub>** and **P<sub>1</sub>** as shown above, both tilt angles are positive but **θ<sub>0</sub>** is smaller:

- `Angle at min tilt` = **θ<sub>0</sub>**
- `Angle at max tilt` = **θ<sub>1</sub>**

:::note
If the diagram was mirrored so that **P<sub>0</sub>** and **P<sub>1</sub>** were tilting into the -x, -y quadrant, then both the tilt angles would be negative. Because **θ<sub>1</sub>** would more negative (smaller) than **θ<sub>0</sub>**, it would be the `Angle at min tilt`.

Similarly, a servo that moves:

- between the upright and forward positions would have `min=0` and `max=90`.
- symmetrically 45 degrees around the upright position would have `min=-45` and `max=45`
- between the upright and backward positions would have `min=-90` and `max=0`.
:::

The `Tilt direction` indicates whether the servo tilts in the plane towards the `Front` or `Right` of the vehicle. On the diagram this would be represented by **α** that can only take values of 0 (front) or 90 (right).

#### Tilt Servos for Yaw/Pitch Control

Tilt servos can provide torque on one or more axes, which may be used to yaw or pitch the vehicle:

- Yaw is commonly set in this way, though motors are often used instead on vehicles with four or more motors.
- Pitch is more commonly controlled using differential motors thrust. Control using tilt servos is useful on airframes that can't use differential thrust, such as a [Bicopter](https://www.youtube.com/watch?v=hfss7nCN40A).

Whether this feature is used is configured in the `Use for control` setting.

## Actuator Outputs

The _Actuator Outputs_ section is used to assign motors, control surface servos, and other actuators used by the particular frame to the physical outputs on the flight controller, and to set parameters for those outputs.

![Actuator Outputs - Multicopter diagram](../../assets/config/actuators/qgc_actuators_mc_outputs.png)

Separate tabs are displayed for each output bus supported by the connected flight controller: PWM AUX (IO Board output), PWM MAIN (FMU Board output), UAVCAN.

Motors and actuators (which are referred to as "[functions](#output-functions)") can be assigned to any physical output on any of the available buses.

:::note
PWM AUX outputs are preferred over the PWM MAIN outputs for controlling motors (they have lower latency).
:::

PWM outputs are grouped based on the hardware timer groups. Meaning all the outputs in one group must operate under the same protocol at the same rate (e.g. PWM signal at 400Hz for all the outputs in one group). Therefore it is not possible to map Servo and a Motor in the same output group, as they usually operate at a different rate.

The PWM AUX tab has CAP outputs that are generally used as the [camera capture/trigger input](../peripherals/camera.md#trigger-configuration). However you can map the CAP outputs to other output functions, and other AUX outputs can be used as camera capture/triggering input.

:::note
Configuring the Camera Capture / Trigger input requires a reboot to take effect
:::

You should assign functions to the outputs that match your physical wiring of motors and servos, and use the [Actuator Testing](#actuator-testing) section described below to determine appropriate output parameter values. These steps are covered in [Output Assignment and Configuration](#output-assignment-and-configuration).

### Output Functions

Output functions are used to map the "logical functions" of an airframe, such as `Motor 1` or `Landing gear`, to physical outputs like FMU output pin 2. This makes it easy to use a particular output pin for almost any purpose.

Some functions are only relevant to particular frames or output types, and will not be offered on others.

Functions include:

- `Disabled`: Output has no assigned function.
- `Constant_Min`: Output set to constant minimum value (-1).
- `Constant_Max`: Output is set to constant maximum value (+1).
- `Motor 1` to `Motor 12`: Output is indicated motor. Only motors allowed for airframe are displayed.
- `Servo 1` to `Servo 8`: Servo output. These are further assigned a specific meaning based on airframe, such as "tilt servo", "left aileron".
- `Offboard Acutator Set 1` to `Offboard Acutator Set 6`: [MAVLink Payload output](../payloads/README.md#cargo-drones-actuator-payloads).
- `Landing Gear`: Output is landing gear.
- `Parachute`: Output is parachute. The minimum value is sent in normal use and the maximum value is emitted when a failsafe is triggered.
- `RC Roll`: Output is passthrough roll from RC ([RC_MAP_ROLL](../advanced_config/parameter_reference.md#RC_MAP_ROLL) maps an RC channel to this output). An RC channel is mapped to the output using .
- `RC Pitch`: Output is passthrough pitch from RC ([RC_MAP_PITCH](../advanced_config/parameter_reference.md#RC_MAP_PITCH) maps an RC channel to this output).
- `RC Throttle`: Output is passthrough throttle from RC ([RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE) maps an RC channel to this output).
- `RC Yaw`: Output is yaw from RC ([RC_MAP_YAW](../advanced_config/parameter_reference.md#RC_MAP_YAW) maps an RC channel to this output).
- `RC Flaps`: Output is flaps from RC ([RC_MAP_FLAPS](../advanced_config/parameter_reference.md#RC_MAP_FLAPS) maps an RC channel to this output).
- `RC AUXn` to `RC AUX1`: Outputs used for [arbitrary payloads triggered by RC passthrough](../payloads/README.md#cargo-drones-actuator-payloads)
- `Gimbal Roll`: Output controls gimbal roll.
- `Gimbal Pitch`: Output controls Gimbal pitch.
- `Gimbal Yaw`: Output controls Gimbal pitch.

The following functions can only be applied to FMU outputs:

- `Camera_Trigger`: Output to trigger camera. Enabled when [`TRIG_MODE==0`](../advanced_config/parameter_reference.md#TRIG_MODE). Configured via `TRIG_*` parameters.
- `Camera_Capture`: Input to get image capture notification. Enabled when [CAM_CAP_FBACK==0](../advanced_config/parameter_reference.md#CAM_CAP_FBACK). Configured via `CAM_CAP_*` parameters.
- `PPS_Input`: Pulse-per-second input capture. Used for GPS synchronisation. Enabled when [`PPS_CAP_ENABLE==0`](../advanced_config/parameter_reference.md#PPS_CAP_ENABLE)

:::note
This list is correct at PX4 v1.13. The functions are defined in source at [/src/lib/mixer_module/output_functions.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/mixer_module/output_functions.yaml).
:::

## Actuator Testing

The _Actuator Testing_ section in lower-right corner provides sliders that can be used to test (and determine) actuator and motor settings. A slider is provided for each output defined in the [Actuator Outputs](#actuator-outputs) section. The slider example below shows the section for a typical VTOL Tiltrotor airframe.

![Actuator Testing Slider](../../assets/config/actuators/vtol_tiltrotor_sliders_example.png)

The section has an **Enable Sliders** switch that must be toggled before sliders can be used. The sliders can power the motors/servos across their full range of motion, and "snap" to the disarmed and minimum positions.

:::note
After you toggle the **Enable sliders** switch, actuators/motors won't do anything until the corresponding slider is _moved_. This is a safety feature to prevent sudden motor movements after switch is enabled.
:::

Sliders can be used to verify the following:

1. Actuators (Motors, Control surfaces, etc.) are assigned to the expected output.
1. Motors don't spin when at the `disarmed` PWM output value
1. Motors barely spin at the `minimum` PWM output value.
1. Motors give **positive thrust** in the expected direction
1. Control Surfaces are in the correct idle position for `disarmed` output value
1. Control Surfaces move in the direction as defined in the [Control Surface Convention](#control-surface-deflection-convention)
1. Motor Tilt Servos are in the correct idle position for `disarmed` output value
1. Motor Tilt Servos move in the direction as defined in the [Tilt Servo Convention](#tilt-servo-coordinate-system)


## Output Assignment and Configuration

Outputs are assigned to functions and configured in the [Actuator Outputs](#actuator-outputs) section, while the  [Actuator Testing](#actuator-testing) sliders are commonly used to determine appropriate configuration values to enter:

- MC vehicles that have connected motors to PWM outputs can use the [Identify & Assign Motors](#multicopter-pwm-motor-assignment) button to perform motor assignment "semi-automatically".
- Output assignment of both motors and actuators can be done/checked using sliders (see [Output Assignment (Manual)](#output-assignment-manual)).
- Disarmed, minimum, and maximum settings, for all outputs can also be also determined using sliders. This is shown as part of [Motor Configuration](#motor-configuration), [Control Surface Setup](#control-surface-setup), [Tilt servo setup](#tilt-servo-setup)

### Multicopter PWM: Motor Assignment

You can use the **Identify & Assign Motors** button to assign motors to PWM outputs using a semi-automated process.

:::note
This is the easiest way to assign motors, but is currently only supported for motors on **multicopter vehicles** that are connected to PWM outputs (UAVCAN outputs and other frame types do not support this feature). On other frames you can follow the instructions in [Output Assignment (Manual)](#output-assignment-manual).
:::

:::warning
Remove the propellers from motors before assigning outputs or any testing.
:::

![Identify motor button](../../assets/config/actuators/identify_motors_button.png)

When you click the button, QGC sends a command to a motor, causing it to spin. To assign that motor to an output you simply select the corresponding motor displayed in the screen. QGC will then spin the next motor for you to assign, and so on.

Instructions:

1. Setup the motor geometry to match the motors on your frame.
1. Select the PWM tab where you want to assign the motors.
1. Click the **Identify & Assign Motors** button.
1. One motor will start spinning (click **Spin Motor Again** if it stops spinning too quickly to note.)

   Select the corresponding motor in the geometry section.

   ![](../../assets/config/actuators/identify_motors_in_progress.png)

1. After assigning all motors, the tool will set the correct motor mapping for the outputs and then exit.


### Output Assignment (Manual)

:::warning
Remove the propellers from motors before assigning outputs or any testing.
:::

Actuator outputs for both motors and servos can be _manually_ assigned using sliders in the [Actuator Testing](#actuator-testing) section.

To assign an actuator:

1. First assign functions to the outputs that you think are _likely_ to be correct in the _Actuator Outputs_ section.
1. Toggle the **Enable sliders** switch in _Actuator Testing_ section.
1. Move the slider for the actuator you want to test:
   - Motors should be moved to the minimum thrust position.
   - Servos should be moved near the middle position.
1. Check which actuator moves on the vehicle. This should match the actuator positions for your geometry (the [airframe reference](../airframes/airframe_reference.md) shows motor positions for a number of standard airframes).
   - If the correct actuator moves, then proceed to the next step.
   - If a wrong actuator moves, swap the output assignment over.
   - If nothing moves then increase the slider mid-way though the range, then higher if needed. If nothing moves after that the output might not be connected, the motor might not be powered, or the output might be misconfigured. You will need to troubleshoot (perhaps try other actuator outputs to see if "anything" moves).
1. Return the slider to the "disarmed" position (bottom of slider for motors, centre of slider for servos).
1. Repeat for all actuators


### Motor Configuration

The motor configuration sets output values such that motors:

- don't spin when disarmed (at the `disarmed` PWM output value)
- barely spin at the `minimum` PWM output value
- give **positive thrust** in the expected direction

For each motor:

1. Pull the motor slider down so that it snaps to the bottom. In this position the motor is set to the outputs `Disarmed` value.
   - Verify that the motor doesn't spin in this position.
   - If the motor spins, reduce the corresponding PWM `Disarmed` value in the [Actuator Outputs](#actuator-outputs) section to below the level at which it still spins.
2. Slowly move the slider up until it snaps to the _minimum_ position. In this position the motor is set to the outputs `Minimum` value.
   - Verify that the motor is spinning very slowly in this position.
   - If the motor is not spinning, or spinning too fast you will need to adjust the corresponding PWM `Disarmed` value in the [Actuator Outputs](#actuator-outputs) such that the motors barely spin.

     ![PWM Minimum Output](../../assets/config/actuators/pwm_minimum_output.png)   :::note
  For DShot output, this is not required <!-- any, or just the minimum check? -->

:::
3. Increase the slider value to a level where you can verify that the motor is spinning in the correct direction and that it would give a positive thrust in the expected direction.
   - The expected thrust direction can vary by vehicle type. For example in multicopters the thrust should always point upwards, while in a fixed wing vehicle the thrust will push the vehicle forwards.
   - For VTOL, thrust should point upwards when the Tilt Servo is at 0 degrees as defined the [Tilt Servo Convention](#tilt-servo-coordinate-system). Testing of the [Tilt Servo](#tilt-servo-setup) is covered below as well.
   - If thrust is in the wrong direction, you may need to [reverse the motors](#reversing-motors).


### Control Surface Setup

First set the _frame rate_ for the servos used in each group of outputs. This would normally be set to the maximum value supported by your servo. Below we show how you would set it to PWM50 (the most common value).

![Control Surface Disarmed 1500 Setting](../../assets/config/actuators/control_surface_disarmed_1500.png)

:::note
You will almost certainly need to change the pulse rate from the default of 400Hz because support is rare (if not supported the servo will usually make an "odd" noise). If you're using PWM servos, PWM50 is far more common. If a high rate servo is _really_ needed, DShot offers better value.
:::

For each of the control surfaces:

1. Set the `Disarmed` value so that the surfaces will stay at neutral position when disarmed. This is usually around `1500` for PWM servos.
2. Move the slider for the surface upwards (positive command) and verify that it moves in the direction defined in the [Control Surface Convention](#control-surface-deflection-convention).
   - If the control surface moves in the opposite direction, click on the `Rev Range` checkbox to reverse the range.
3. Move the slider again to the middle and check if the Control Surfaces are aligned in the neutral position of the wing
   - If it is not aligned, you can set the **Trim** value for the control surface. :::note This is done in the `Trim` setting of the Geometry panel, usually by "trial and error". ![Control Surface Trimming](../../assets/config/actuators/control_surface_trim.png)
:::

   - After setting the trim for a control surface, move its slider away from the center, release, and then back into disarmed (middle) position. Confirm that surface is in the neutral position.

     Note that you **must** move the slider _even if it is already in the middle position_ (it doesn't start getting commands until it has been moved).


:::note
Another way to test without using the sliders would be to set the [`COM_PREARM_MODE`](../advanced_config/parameter_reference.md#COM_PREARM_MODE) parameter to `Always`:

- This will enable the control of servos even when the vehicle is disarmed, and will constantly be applying the Trim setting to the Control Surfaces
- You can try setting different values for the Trim and check the alignment, and then settle on the value you are happy with.
:::

### Tilt Servo Setup

First set the _frame rate_ for the servos used in each group of outputs. This would normally be set to the maximum value supported by your servo. Below it is set to PWM50 (the most common value). Note, this part of the setup is the same as for control surfaces above.

![Tilt Servo Setup](../../assets/config/actuators/tilt_servo_setup.png)

For each of the tilt servos:

1. Set the `Disarmed` value (e.g. `1000` or `2000` for PWM Servos) so that the servo will be positioned in expected direction when _disarmed_.
2. Position the slider for the servo in the lowest position, and verify that a positive value increase will point towards the `Angle at Min Tilt` (defined in the Geometry section).

   ![Tilt Servo Geometry Setup](../../assets/config/actuators/tilt_servo_geometry_config.png)
3. Position the slider for the servo in the highest position, and verify that positive motor thrust will point towards the `Angle at Max Tilt` (as defined in the Geometry section).

### Other Notes

- If a safety button is used, it must be pressed before actuator testing is allowed.
- The kill-switch can still be used to stop motors immediately.
- Servos do not actually move until the corresponding slider is changed.
- The parameter [COM_MOT_TEST_EN](../advanced_config/parameter_reference.md#COM_MOT_TEST_EN) can be used to completely disable actuator testing.
- On the shell, [actuator_test](../modules/modules_command.md#actuator-test) can be used as well for actuator testing.
- VTOLs will automatically turn off motors pointing upwards during **fixed-wing flight**:
  - Standard VTOL : Motors defined as multicopter motors will be turned off
  - Tiltrotors : Motors that have no associated tilt servo will turn off
  - Tailsitters do not turn off any motors in fixed-wing flight

### Reversing Motors

The motors must turn in the direction defined in configured geometry ("**Direction CCW**" checkboxes). If any motors do not turn in the correct direction they must be reversed.

There are several options:

- If the ESCs are configured as [DShot](../peripherals/dshot.md) you can reverse the direction via UI (**Set Spin Direction** buttons). Note that the current direction cannot be queried, so you might have to try both options.
- Swap 2 of the 3 motor cables (it does not matter which ones).

  :::note
If motors are not connected via bullet-connectors, re-soldering is required (this is a reason, among others, to prefer DShot ESCs).
:::
