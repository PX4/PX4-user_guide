# PX4 비행 모드 개요

비행 모드는 자동조종장치가 원격 제어에 응답하는 방법과 자율비행 방법을 정의합니다.

비행 모드는 이륙 및 착륙과 같은 일반적인 작업의 자동화뿐만 아니라, 수평 비행을 하기 쉽도록 고정된 경로나 위치로 기체를 유지하는 메커니즘에 이르기까지 사용자(조종사)에게 다양한 유형과 수준의 자율 비행 방법을 제공합니다.

[멀티콥터](#multicopter) (MC), [고정익](#fixed-wing) (FW), [VTOL](#vertical-take-off-and-landing-vtol) 및 [로버/보트](#rover-boat) 등의 다양한 기체 유형에 적용되는 비행 모드의 개요를 설명합니다.

:::tip
특정 비행 모드에 대한 자세한 정보는 [비행 > 비행 모드](../flight_modes/README.md)를 참고하십시오.
:::

## 모드 전환

조종사는 원격 조종 장치 또는 지상 통제 장치의 스위치를 사용하여 비행 모드를 전환할 수 있습니다. ([비행 모드 구성](../config/flight_mode.md) 참조).

모든 비행기 유형에서 모든 비행 모드를 적용되지는 않으며, 일부 모드는 비행기 유형에 따라 동작 방식의 차이가 있습니다.

일부 비행 모드는 특정 비행 전 및 비행 중 상태(예 : GPS 잠금 장치, 속도 센서, 축을 따라 비행기의 자세 감지)에서만 유의미합니다. PX4는 적절한 조건이 충족될 때까지 해당 모드로의 전환을 허용하지 않습니다.

Last of all, in multicopter [autonomous modes](#categories) RC stick movement will change the vehicle to [Position mode](../flight_modes/position_mc.md) [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) (unless handling a critical battery failsafe). 고정익 비행에서는 스틱 이동이 무시됩니다.

<a id="categories"></a>

## 자율 모드와 수동 모드 

비행 모드에는 *수동* 모드와 *자율* 모드가 있습니다. 수동 모드는 사용자가 RC 컨트롤 스틱(또는 조이스틱)을 통해 비행기를 제어하며, 자율 모드는 자동조종 프로그램으로 제어되며 조종사나 원격 제어는 필요하지 않습니다.

:::tip
일부 수동 모드에는 자동 조종 보조 기능이 있어 비행 제어을 보다 용이하게합니다. 예를 들어, 대부분의 모드는 RC 스틱이 중앙에 있을 때 운송체의 수평을 유지합니다.
:::

수동 모드는 "간편" 모드와 "곡예(Acro)" 모드로 더 나눌 수 있습니다. 간편 모드에서 롤 및 피치 스틱은 차량 각도를 설정하여 *수평면*을 기준으로 좌우로 앞으로 이동합니다. 이렇게 하면 움직임이 예측가능하고, 각도가 제어되기 때문에 기체가 뒤집히지 않습니다. 곡예 모드에서 RC 스틱은 각축을 중심으로 회전 속도를 제어합니다. 기체는 뒤집힐 수 있으며, 기동성이 높아 지는 반면에 비행 조종은 어려워집니다.

고정익: 

* 수동 간편 : [위치](#position-mode-fw), [고도](#altitude-mode-fw), [안정화](#stabilized-mode-fw), [수동](#manual-mode-fw)
* 수동 곡예 : [곡예](#acro-mode-fw)
* 자율 : [유지](#hold_fw), [복귀](#return-mode-fw), [미션](#mission-mode-fw), [이륙](#takeoff-mode-fw), [착륙](#land-mode-fw), [오프보드](#offboard-mode-fw)

멀티콥터: 

* 수동 간편 : [위치](#position-mode-mc), [고도](#altitude-mode-fcmc), [수동/안정화](#manual-stabilized-mode-mc), [궤도](#orbit-mode-mc)
* 수동 곡예 : [곡예](#acro-mode-mc)
* 자율 : [유지](#hold-mode-mc), [복귀](#return-mode-mc), [미션](#mission-mode-mc), [이륙](#takeoff-mode-mc), [착륙](#land-mode-mc), [나를 따르나](#follow-me-mode-mc), [오프 보드](#offboard-mode-mc)

로보/보트:

* 수동-간편 : [수동](#manual-mode-ugv)
* 자율: [임무](#mission-mode-ugv)

:::note
수동 및 이무 모드만 지원됩니다. 다른 모드로 전환할 수 있지만, 동작은 수동 모드와 동일합니다.
:::

## 요점 

아래 아이콘은 문서 내에서 사용됩니다: 

| 아이콘                                                                                                                                                                                                                                                                                                              | 설명                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| <a id="key_manual"></a>[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)                                                                                                                                                                                      | 수동 모드 원격 제어 필수.                              |
| <a id="key_automatic"></a>[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)                                                                                                                                                                                         | 자동 모드. RC 제어는 모드 변경을 제외하고 기본적으로 비활성화되어 있습니다. |
| <a id="key_position_fixed"></a>[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)                                                                                                                                                                         | 위치 수정이 필요(예 : GPS, VIO 또는 기타 위치 확인 시스템).     |
| <a id="altitude_only"></a><img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계) " width="30px" />                                                                                                                                                                                           | 필요한 고도 (예 : 기압계, 거리계).                       |
| <a id="key_difficulty"></a>[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="30px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](#key_difficulty) | 비행 모드 난이도 (초급 ~ 고급)                          |

<a id="mc_flight_modes"></a>

## 멀티콥터

### 위치 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes/position_mc.md) is an easy-to-fly RC mode in which roll and pitch sticks control *acceleration* over ground in the vehicle's forward-back and left-right directions (similar to a car's accelerator pedal), and throttle controls speed of ascent-descent. When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.

:::tip
Position mode is the safest manual mode for new fliers. Unlike [Altitude](#altitude-mode-mc) and [Manual/Stabilized](#manual_stabilized_mc) modes the vehicle will stop when the sticks are centered rather than continuously drifting without constant manual guidance.
:::

![MC Position Mode](../../assets/flight_modes/position_MC.png)

### 고도 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" />](#altitude_only)

[Altitude mode](../flight_modes/altitude_mc.md) is a *relatively* easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will level and maintain the current *altitude*. If moving in the horizontal plane the vehicle will continue until any momentum is dissipated by wind resistance. If the wind blows the aircraft will drift in the direction of the wind.

:::tip
*Attitude mode* is the safest non-GPS manual mode for new fliers. It is just like [Manual/Stabilized](#manual_stabilized_mc) mode but additionally stabilizes the vehicle altitude when the sticks are released.
:::

![MC Altitude Mode](../../assets/flight_modes/altitude_MC.png)

<a id="manual_stabilized_mc"></a>

### 수동/안정화 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

The [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) mode stabilizes the multicopter when the RC control sticks are centered. To manually move/fly the vehicle you move the sticks outside of the center.

:::note
This multicopter mode is enabled if you set either *Manual* or *Stabilized* modes for an MC vehicle.
:::

When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the center deadzone. The multicopter will level out and stop once the roll and pitch sticks are centered. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately, and no external forces are applied (e.g. wind). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.

![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)

<a id="acro_mc"></a>

### 곡예 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Acro mode](../flight_modes/acro_mc.md) is the RC mode for performing acrobatic maneuvers e.g. rolls and loops.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![MC Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->

<a id="orbit_mc"></a>

### 궤도 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

The [Orbit mode](../flight_modes/orbit.md) allows you to command a multicopter (or VTOL in multicopter mode) to fly in a circle, yawing so that it always faces towards the center.

A GCS is *required* to enable the mode, and to set the center position and initial radius of the orbit. By default the vehicle will then perform a slow ongoing orbit around the center position (1m/s) in a clockwise direction. RC control is optional, and can be used to change the orbit altitude, radius, speed, and direction.

![Orbit Mode - MC](../../assets/flight_modes/orbit_MC.png)

<a id="hold_mc"></a>

### 유지 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Hold mode](../flight_modes/hold.md) causes the multicopter to stop and hover at its current position and altitude (maintaining position against wind and other forces). The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the *QGroundControl* **Pause** button.

<a id="return_mc"></a>

### 귀환 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Return mode](../flight_modes/return.md) causes the vehicle to fly a clear path to a safe location. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a [failsafe](../config/safety.md) being triggered).

The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined). By default a mulitcopter will simply ascend to a safe height, fly to its home position, and then land.

<a id="mission_mc"></a>

### 임무 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).
:::

<a id="takeoff_mc"></a>

### 이륙 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Takeoff](../flight_modes/takeoff.md) mode causes the multicopter to climb vertically to takeoff altitude and hover in position.

<a id="land_mc"></a>

### 착륙 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Land mode](../flight_modes/land.md) causes the multicopter to land at the location at which the mode was engaged.

<a id="followme_mc"></a>

### 추적 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Follow Me mode](../flight_modes/follow_me.md) causes a multicopter to autonomously follow and track a user providing their current position setpoint. Position setpoints might come from an Android phone/tablet running *QGroundControl* or from a MAVSDK app.

<a id="offboard_mc"></a>

### 오프보드 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Offboard mode](../flight_modes/offboard.md) causes the multicopter to obey a position, velocity or attitude setpoint provided over MAVLink.

:::note
This mode is intended for vehicle control from companion computers and ground stations!
:::

<a id="fw_flight_modes"></a>

## 고정익 

<a id="position_fw"></a>

### 위치 모드 (고정익)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes/position_fw.md) is an easy-to-fly RC mode in which, when the sticks are released/centered, the vehicle will level and fly a straight line ground track in the current direction — compensating for wind and other forces.

The throttle determines airspeed (at 50% throttle the aircraft will hold its current altitude with a preset cruise speed). Pitch is used to ascend/descend. Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).

:::tip
Position mode is the safest fixed-wing manual mode for new fliers.
:::

![FW Position Mode](../../assets/flight_modes/position_FW.png)

<a id="altitude_fw"></a>

### 고도 모드 (고정익)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Barometer, Rangefinder)" width="30px" />](#altitude_only)

[Altitude mode](../flight_modes/altitude_fw.md) makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. The mode will not attempt to hold the vehicle course against wind.

The climb/descent rate is controlled via the pitch/elevator stick. Once centered the autopilot latches onto the current altitude and will maintain it during yaw/roll, and at any airspeed. The throttle input controls airspeed. Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).

When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight (subject to wind) and keep its current altitude.

:::tip
*Altitude mode* is the safest non GPS guided mode appropriate for beginners learning how to fly. It is just like [Manual](#manual_fw) mode but additionally stabilizes the vehicle altitude when the pitch stick is released.
:::

![FW Altitude Mode](../../assets/flight_modes/altitude_FW.png)

<a id="stabilized_fw"></a>

### 안정화 모드 (고정익)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Stabilized mode](../flight_modes/stabilized_fw.md) puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

The vehicle climb/descends based on pitch input and performs a coordinated turn if the roll/pitch sticks are non-zero. Roll and pitch are angle controlled (you can't roll upside down or loop).

:::tip
*Stabilized mode* is much easier to fly than [Manual mode](#manual_fw) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.
:::

The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).

![FW Manual Flight](../../assets/flight_modes/manual_stabilized_FW.png)

<a id="acro_fw"></a>

### 곡예 모드 (고정익)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Acro mode](../flight_modes/acro_fw.md) is the RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![FW Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_FW.png)

<a id="manual_fw"></a>

### 수동 모드 (고정익)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Manual mode](../flight_modes/manual_fw.md) sends RC stick input directly to the output mixer for "fully" manual control.

:::tip
This is the hardest mode to fly, because nothing is stabilised. Unlike [Acro Mode](#acro_fw) if the RP stick is centered the vehicle will not automatically stop rotating around the axis - the pilot actually has to move the stick to apply force in the other direction.
:::

:::note
This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.
:::

<a id="hold_fw"></a>

### 유지 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Hold](../flight_modes/hold.md) causes a fixed-wing vehicle to start circling around the current position at its current altitude. The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the *QGroundControl* **Pause** button.

<a id="return_fw"></a>

### 귀환 모드(고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Return mode](../flight_modes/return.md) causes the vehicle to fly a clear path to a safe location. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a [failsafe](../config/safety.md) being triggered).

The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined). By default a fixed wing vehicle will ascend to a safe height and use a mission landing pattern if one exists, otherwise it will fly to the home position and circle.

<a id="mission_fw"></a>

### 임무 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).
:::

<a id="takeoff_fw"></a>

### 이륙 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;

[Takeoff mode](../flight_modes/takeoff.md#fixed_wing) initiates the vehicle takeoff sequence. The specific launch behaviour depends on the configured takeoff mode (catapult/hand-launch mode or runway takeoff mode).

<a id="land_fw"></a>

### 착륙 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;

[Land mode](../flight_modes/land.md) causes the vehicle to turn and land at the location at which the mode was engaged. Fixed wing landing logic and parameters are explained in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

<a id="offboard_fw"></a>

### 오프보드 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Offboard mode](../flight_modes/offboard.md) causes the fixed wing vehicle to obey attitude setpoints provided over MAVLink.

:::note
This mode is intended for vehicle control from companion computers and ground stations!
:::

## 수직이착륙기 (VTOL)

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. The multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution.

Generally the flight modes for VTOL vehicles are the same as for [multicopter](#mc_flight_modes) when flying in MC mode and [fixed-wing](#fw_flight_modes) when flying in FW mode.

The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in the Auto modes.

A few notes:

* VTOL [귀환 모드](../flight_modes/return.md)는 정의된 경우 기본적으로 미션 착륙을 사용합니다.

<a id="ugv_flight_modes"></a>

## 로버/보트

Ground vehicles and boats only support [manual mode](#manual-mode-ugv) and [mission mode](#mission-mode-ugv) (while you can switch to other modes, these all behave just like manual mode).

### 수동 모드 (UGV)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to use" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

:::note
This mode is enabled unless mission mode is set.
:::

*Manual mode*<!-- [Manual](../flight_modes/manual_ugv.md) --> stops motors when RC control sticks are centered. To move the vehicle you move the sticks outside of the center.

<!--
When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.
-->

As soon as you release the control sticks they will return to the center deadzone. This will turn off the motors and center the wheels/rudder. There is no active braking, so the vehicle may continue to move until its momentum dissipates (and for a boat, continue to drift).

<!--
![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)
-->

### 임무 모드 (UGV)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

*Mission mode* <!-- [Mission mode](../flight_modes/mission.md) --> causes the vehicle to execute a predefined autonomous 

[mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).
:::

## 추가 정보

* [비행 > 비행 모드](../flight_modes/README.md) - 모든 모드에 대한 자세한 설명
* [기본 구성> 비행 모드](../config/flight_mode.md) - RC 제어 스위치를 특정 비행 모드에 매핑하는 방법