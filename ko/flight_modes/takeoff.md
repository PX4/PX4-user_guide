# 이륙 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*이륙* 비행 모드는 기체가 지정된 높이로 상승후, 추가 입력을 기다립니다.

:::note
* 이 모드는 정확한 위치 추정이 필요합니다(예: GPS에서).
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터 (또는 멀티콥터 모드의 VTOL)에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다.
* The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::

각 기체 유형에 대한 구체적인 행동은 아래에 설명되어 있습니다.

## 멀티콥터(MC)

A multi rotor ascends to the altitude defined in [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) and holds position.

RC 스틱을 움직이면 차량이 [위치 모드](../flight_modes/position_mc.md)([기본값](#COM_RC_OVERRIDE))로 변경됩니다.

이륙은 다음 매개 변수의 영향을받습니다.

| 매개 변수                                                                                                            | 설명                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 이륙 중 목표 고도 (기본값 : 2.5m)                                                                                                                                        |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)       | 상승 속도 (기본값 : 1.5m/s)                                                                                                                                           |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 멀티콥터 (또는 MC 모드의 VTOL)에서 스틱 이동으로 인해 모드가 [위치 모드](../flight_modes/position_mc.md)로 변경 여부를 제어합니다. 자동 모드와 오프 보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다.        |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled) |

<a id="fixed_wing"></a>

## Fixed-wing (FW)

Automatic takeoff has two modalities: *catapult/hand-launch* or *runway takeoff*. The mode defaults to catapult/hand launch, but can be set to runway takeoff by setting [RWTO_TKOFF](#RWTO_TKOFF) to 1.

There are two ways to start an automatic takeoff on fixed-wing vehicles: either by [planning a mission takeoff](../flight_modes/mission.md#fw-takeoff) and starting the mission, or by switching to the _Takeoff mode_ and arming the vehicle.

In both cases, a flight path (starting point and takeoff course) and clearance altitude are defined. The flight path takes the vehicle's current position as starting point when the takeoff mode is first entered, and a straight line from this starting point continues in the direction of the defined course indefinitely. On takeoff, the aircraft will follow this line, climbing at the maximum climb rate ([FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX)) until reaching the clearance altitude.

In _Takeoff mode_ (non-mission takeoffs), the course is set to the vehicle heading on arming, and the clearance altitude is set to [MIS_TAKEOFF_ALT](#MIS_TAKEOFF_ALT). Reaching the clearance altitude causes the vehicle to enter _Hold mode_.

In [Mission mode](../flight_modes/mission.md) the operator defines the takeoff course and clearance altitude in the Takeoff mission item. The course is defined by the line between the vehicle starting point and the mission item horizontal position, and the clearance altitude is the mission item altitude. Reaching the mission item altitude triggers the next mission item.


Parameters that apply to both catapult/hand-launch as well as runway takeoffs:

| 매개 변수                                                                                                               | 설명                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT)    | Minimum altitude setpoint above Home that the vehicle will climb to during takeoff.                                                |
| <span id="FW_TKO_AIRSPD"></span>[FW_TKO_AIRSPD](../advanced_config/parameter_reference.md#FW_TKO_AIRSPD)          | Takeoff airspeed (is set to [FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN) if not defined by operator) |
| <span id="FW_TKO_PITCH_MIN"></span>[FW_TKO_PITCH_MIN](../advanced_config/parameter_reference.md#FW_TKO_PITCH_MIN) | This is the minimum pitch angle setpoint during the climbout phase                                                                 |


<span id="hand_launch"></span>
### 투석기/수동 발사 모드

In *catapult/hand-launch mode* the vehicle waits to detect launch (based on acceleration trigger). On launch it enables the motor and climbs with the maximum climb rate [FW_T_CLMB_MAX](#FW_T_CLMB_MAX) while keeping the pitch setpoint above [FW_TKO_PITCH_MIN](#FW_TKO_PITCH_MIN). Once it reaches [MIS_TAKEOFF_ALT](#MIS_TAKEOFF_ALT) it will automatically switch to [Hold mode](../flight_modes/hold.md) and loiter.

All RC stick movement is ignored during the full takeoff sequence.

To launch in this mode:

- Arm the vehicle
- Put the vehicle into *Takeoff mode*
- Launch/throw the vehicle (firmly) directly into the wind. You can also shake the vehicle first, wait till the motor spins up and throw only then

The _launch detector_ is affected by the following parameters:

| 매개 변수                                                                                                            | 설명                                                                                       |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| <span id="LAUN_ALL_ON"></span>[LAUN_ALL_ON](../advanced_config/parameter_reference.md#LAUN_ALL_ON)             | Enable automatic launch detection. If disabled motors spin up on arming already          |
| <span id="FW_LAUN_AC_THLD"></span>[FW_LAUN_AC_THLD](../advanced_config/parameter_reference.md#FW_LAUN_AC_THLD) | Acceleration threshold (acceleration in body-forward direction must be above this value) |
| <span id="FW_LAUN_AC_T"></span>[FW_LAUN_AC_T](../advanced_config/parameter_reference.md#FW_LAUN_AC_T)          | Trigger time (acceleration must be above threshold for this amount of seconds)           |
| <span id="FW_LAUN_MOT_DEL"></span>[FW_LAUN_MOT_DEL](../advanced_config/parameter_reference.md#FW_LAUN_MOT_DEL) | Delay from launch detection to motor spin up                                             |


<span id="runway_launch"></span>
### 활주로 이륙

Runway takeoffs can be used by vehicles with landing gear and and steerable wheel (only). You will first need to enable the wheel controller using the parameter [FW_W_EN](#FW_W_EN).


Vehicle should be centered and aligned with runway when takeoff is initiated. The operator can "nudge" the vehicle while on the runway to help keeping it centered and aligned (see [RWTO_NUDGE](../advanced_config/parameter_reference.md#RWTO_NUDGE)).


*활주로 이륙 모드*에는 다음과 같은 상태가 있습니다.
1. **Throttle ramp**: Throttle is ramped up within [RWTO_RAMP_TIME](../advanced_config/parameter_reference.md#RWTO_RAMP_TIME) to [RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR).
2. **Clamped to runway**: Pitch fixed, no roll and takeoff path controlled until the rotation airspeed ([RWTO_ROT_AIRSPD](../advanced_config/parameter_reference.md#RWTO_ROT_AIRSPD)) is reached. The operator is able to nudge the vehicle left/right via yaw stick.
3. **Climbout**: Increase pitch setpoint and climb to takeoff altitude. To prevent wingstrikes, the controller will keep the roll setpoint locked to 0 when close to the ground, and then gradually allow more roll while climbing. It is based on the vehicle geometry as configured in [FW_WING_SPAN](#FW_WING_SPAN) and [FW_WING_HEIGHT](#FW_WING_HEIGHT).

:::note
For a smooth takeoff, the runway wheel controller possibly needs to be tuned. It consists of a rate controller (P-I-FF-controller with the parameters [FW_WR_P](../advanced_config/parameter_reference.md#FW_WR_P), [FW_WR_I](../advanced_config/parameter_reference.md#FW_WR_I), [FW_WR_FF](../advanced_config/parameter_reference.md#FW_WR_FF)) and an outer loop that calculates heading setpoints from course errors and can be tuned via [RWTO_L1_PERIOD](#RWTO_L1_PERIOD). :::

Runway takeoff important parameters:

| 매개 변수                                                                                                            | 설명                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| <span id="RWTO_TKOFF"></span>[RWTO_TKOFF](../advanced_config/parameter_reference.md#RWTO_TKOFF)                  | Enable runway takeoff                                                                                                          |
| <span id="FW_W_EN"></span>[FW_W_EN](../advanced_config/parameter_reference.md#FW_W_EN)                         | Enable wheel controller                                                                                                        |
| <span id="RWTO_MAX_THR"></span>[RWTO_MAX_THR](../advanced_config/parameter_reference.md#RWTO_MAX_THR)          | Max throttle during runway takeoff                                                                                             |
| <span id="RWTO_RAMP_TIME"></span>[RWTO_RAMP_TIME](../advanced_config/parameter_reference.md#RWTO_RAMP_TIME)    | Throttle ramp up time                                                                                                          |
| <span id="RWTO_ROT_AIRSPD"></span>[RWTO_ROT_AIRSPD](../advanced_config/parameter_reference.md#RWTO_ROT_AIRSPD) | Airspeed threshold to start rotation (pitching up). If not configured by operator is set to 0.9*FW_TKO_AIRSPD.               |
| <span id="FW_TKO_AIRSPD"></span>[FW_TKO_AIRSPD](../advanced_config/parameter_reference.md#FW_TKO_AIRSPD)       | Airspeed setpoint during the takeoff climbout phase (after rotation). If not configured by operator is set to FW_AIRSPD_MIN. |
| <span id="RWTO_NUDGE"></span>[RWTO_NUDGE](../advanced_config/parameter_reference.md#RWTO_NUDGE)                  | Enable wheel controller nudging while on the runway                                                                            |
| <span id="FW_WING_SPAN"></span>[FW_WING_SPAN](../advanced_config/parameter_reference.md#FW_WING_SPAN)          | The wingspan of the vehicle. Used to prevent wingstrikes.                                                                      |
| <span id="FW_WING_HEIGHT"></span>[FW_WING_HEIGHT](../advanced_config/parameter_reference.md#FW_WING_HEIGHT)    | The height of the wings above ground (ground clearance). Used to prevent wingstrikes.                                          |
| <span id="RWTO_L1_PERIOD"></span>[RWTO_L1_PERIOD](../advanced_config/parameter_reference.md#RWTO_L1_PERIOD)    | L1 period while steering on runway. Increase for less aggressive response to course errors.                                    |
| <span id="FW_FLAPS_TO_SCL"></span>[FW_FLAPS_TO_SCL](../advanced_config/parameter_reference.md#FW_FLAPS_TO_SCL) | Flaps setpoint during takeoff                                                                                                  |


:::note
기체는 이륙시 항상 일반 FW 최대/최소 스로틀 설정을 따릅니다 ([FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN), [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX)). :::

## 수직 이착륙기

VTOL은 부팅시 MC 모드로 기본 설정되며 일반적으로 [멀티 콥터 모드](#multi-copter-mc) (또한 더 안전함)에서 이륙하는 것을 가정합니다.

That said, if transitioned to fixed-wing before takeoff, they will takeoff in [Fixed-wing](#fixed_wing) mode.

<!-- this maps to AUTO_TAKEOFF in dev -->
