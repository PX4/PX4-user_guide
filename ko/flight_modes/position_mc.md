# 위치 모드(멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*위치 모드*는 롤 앤 피치 스틱이지면에서 좌우 방향 및 전후 방향으로 속도를 제어하는 비행하기 쉬운 RC 모드입니다 (차량의 "전방"기준). 스틱을 풀거나 중앙에 놓으면 차량이 능동적으로 제동하고 수평을 맞추고 3D 공간의 위치에 고정되어 바람과 기타 힘을 보상합니다.

:::tip
위치 모드는 새 전단지를위한 가장 안전한 수동 모드입니다. [고도](../flight_modes/altitude_mc.md) 및 [수동 / 안정화](../flight_modes/manual_stabilized_mc.md) 모드와 달리, 차량은 바람의 저항에 의해 감속 될 때까지 계속되는 대신 스틱이 중앙에있을 때 정지합니다.
:::

The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../assets/flight_modes/position_MC.png)

:::warning
Care must be taken when landing in this mode. When first landing in this mode, be ready to switch to [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) in order to be able to disarm. If landing is correctly detected, motors will spin down after touch down and then disarm shortly after. If the motors keep spinning at higher RPM or start spinning up, first switch to [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md), and then disarm. Be aware that the vehicle may tip over on the ground due to GPS drift.
:::

## Technical Summary

RC/manual mode where RPT sticks control *speed* in corresponding directions. Centered sticks level vehicle and hold it to fixed position and altitude against wind.

* Centered RPT sticks (in RC deadzone) hold x, y, z position steady against any wind and levels attitude.
* Outside center: 
  * Roll/Pitch sticks control speed over ground in left-right and forward-back directions (respectively) relative to the "front" of the vehicle.
  * Throttle stick controls speed of ascent-descent.
  * Yaw stick controls rate of angular rotation above the horizontal plane.
* Takeoff: 
  * When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).
* Landing: 
  * When close to the ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2)), horizontal velocity is limited ([MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
* This mode requires GPS.
:::

### Parameters

All the parameters in the [Multicopter Position Control](../advanced_config/parameter_reference.md#multicopter-position-control) group are relevant. A few parameters of particular note are listed below.

| Parameter                                                                                                   | Description                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 위치 유지가 활성화 된 스틱의 Deadzone입니다. 기본값 : 0.1 (전체 스틱 범위의 10 %).                                                                                                                                                                                                                                             |
| <span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | Maximum vertical ascent velocity. Default: 3 m/s.                                                                                                                                                                                                                                                     |
| <span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | Maximum vertical descent velocity. Default: 1 m/s.                                                                                                                                                                                                                                                    |
| <span id="MPC_LAND_VEL_XY"></span>[MPC_LAND_VEL_XY](../advanced_config/parameter_reference.md#MPC_LAND_VEL_XY)     | Horizontal velocity limit when close to ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2) meters above ground, or above home if distance-to-ground is unknown). Default: 10 m/s.                                                                                                                              |
| <span id="MPC_LAND_ALT1"></span>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | Altitude for triggering first phase of slow landing. Affects maximum allowed horizontal velocity setpoint. Default 5m.                                                                                                                                                                                |
| <span id="MPC_LAND_ALT2"></span>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | Altitude for second phase of slow landing. In this phase maximum horizontal velocity is limited to [MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY). Default 5m.                                                                                                                                                 |
| <span id="RCX_DZ"></span>`RCX_DZ`                                                                           | RC dead zone for channel X. The value of X for throttle will depend on the value of [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE). For example, if the throttle is channel 4 then [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ) specifies the deadzone. |
| <span id="MPC_xxx"></span>`MPC_XXXX`                                                                         | Most of the MPC_xxx parameters affect flight behaviour in this mode (at least to some extent). For example, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) defines the thrust at which a vehicle will hover.                                                              |

## Additional Information

### Position Loss/Safety

Position mode is dependent on having an acceptable position estimate. If the estimate falls below acceptable levels, for example due to GPS loss, this may trigger a [Position (GPS) Loss Failsafe](../config/safety.md#position-gps-loss-failsafe). Depending on configuration, whether you have a remote control, and whether there is an adequate altitude estimate, PX4 may switch to altitude mode, manual mode, land mode or terminate.