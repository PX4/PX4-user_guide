---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/position_mc
---

# 위치 모드(멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Position* is an easy-to-fly RC mode in which roll and pitch sticks control acceleration over ground in the vehicle's left-right and forward-back directions (similar to a car's accelerator pedal), and throttle controls speed of ascent-descent. 스틱을 풀거나 중앙에 놓으면 차량이 능동적으로 제동하고 수평을 맞추고 3D 공간의 위치에 고정되어 바람과 기타 힘을 보상합니다. With full stick deflection the vehicle accelerates initially with [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX) ramping down until it reaches the final velocity [MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL).

:::tip
위치 모드는 새 전단지를위한 가장 안전한 수동 모드입니다. [고도](../flight_modes/altitude_mc.md) 및 [수동 / 안정화](../flight_modes/manual_stabilized_mc.md) 모드와 달리, 차량은 바람의 저항에 의해 감속 될 때까지 계속되는 대신 스틱이 중앙에있을 때 정지합니다.
:::

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 (모드 2 송신기의 경우).

![멀티콥터 위치 모드](../../assets/flight_modes/position_MC.png)

### Landing

Landing in this mode is easy:

1. Position the drone horizontally above the landing spot using the roll and pitch stick.
2. Let go of the roll and pitch stick and give it enough time to come to a complete stop.
3. Pull the throttle stick down gently until the vehicle touches the ground.
4. Pull the throttle stick all the way down to facilitate and accelerate land detection.
5. The vehicle will lower propeller thrust, detect the ground and [automatically disarm](../advanced_config/prearm_arm_disarm.md#auto-disarming) (by default).

:::warning
While very rare on a well calibrated vehicle, sometimes there may be problems with landing.

- If the vehicle does not stop moving horizontally: 
  - You can still land under control in [Altitude mode](../flight_modes/altitude_mc.md). The approach is the same as above, except that you must manually ensure that the vehicle stays above the landing spot using the roll and pitch stick.
  - After landing check GPS and magnetometer orientation, calibration.
- If the vehicle does not detect the ground/landing and disarm: 
  - After the vehicle is on the ground switch to [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md) keeping the throttle stick low, and manually disarm using a gesture or other command. Alternatively you can also use the kill switch when the vehicle is already on the ground.
:::

## 기술 요약

RC mode where roll, pitch, throttle (RPT) sticks control movement in corresponding axes/directions. Centered sticks level vehicle and hold it to fixed altitude and position against wind.

- Centered roll, pitch, throttle sticks (within RC deadzone [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)) hold x, y, z position steady against any disturbance like wind.
- Outside center: 
  - Roll/Pitch sticks control horizontal acceleration over ground in the vehicle's left-right and forward-back directions (respectively).
  - Throttle stick controls speed of ascent-descent.
  - Yaw stick controls rate of angular rotation above the horizontal plane.
- Takeoff: 
  - When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).
- Landing: 
  - When close to the ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2)), horizontal velocity is limited ([MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)).

:::note

- Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
- This mode requires GPS.
:::

### Parameters

All the parameters in the [Multicopter Position Control](../advanced_config/parameter_reference.md#multicopter-position-control) group are relevant. A few parameters of particular note are listed below.

| 매개 변수                                                                                                       | 설명                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_HOLD_DZ"></a>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 위치 유지가 활성화 된 스틱의 Deadzone입니다. 기본값 : 0.1 (전체 스틱 범위의 10 %).                                                                                                                                                                                                                                                |
| <a id="MPC_Z_VEL_MAX_UP"></a>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 최대 수직 상승 속도. 기본값: 3 m/s.                                                                                                                                                                                                                                                                                 |
| <a id="MPC_Z_VEL_MAX_DN"></a>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 최대 수직 하강 속도. 기본값: 1 m/s.                                                                                                                                                                                                                                                                                 |
| <a id="MPC_LAND_VEL_XY"></a>[MPC_LAND_VEL_XY](../advanced_config/parameter_reference.md#MPC_LAND_VEL_XY)     | 지면에 가까울 때 수평 속도 제한 (지상에서 [MPC_LAND_ALT2](#MPC_LAND_ALT2) 미터 위 또는 지면과의 거리를 알 수 없는 경우에는 홈 위치 위). 기본값: 10 m/s.                                                                                                                                                                                            |
| <a id="MPC_LAND_ALT1"></a>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | 느린 착륙의 첫 번째 단계가 동작하는 고도입니다. 최대 허용 수평 속도 설정점에 영향을 끼칩니다. 기본값: 5m.                                                                                                                                                                                                                                          |
| <a id="MPC_LAND_ALT2"></a>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | 느린 착륙의 두 번째 단계를 위한 고도. 이 단계에서 최대 수평 속도는 [MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)로 제한됩니다. 기본값: 5m.                                                                                                                                                                                                           |
| <a id="RCX_DZ"></a>`RCX_DZ`                                                                           | 채널 X의 RC 데드 존. 스로틀에 대한 X 값은 [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE) 값에 따라 달라집니다. 예를 들어, 스로틀이 채널 4 인 경우 [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ)는 데드 존을 지정합니다.                                                                                   |
| <a id="MPC_xxx"></a>`MPC_XXXX`                                                                         | 대부분의 MPC_xxx 매개 변수는이 모드에서 비행 동작에 어느정도 영향을 미칩니다 . 예를 들어, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)는 기체의 호버링 추력을 정의합니다.                                                                                                                                                   |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)           | Stick input to movement translation strategy. From PX4 v1.12 the default (4) is that stick position controls acceleration (in a similar way to a car accelerator pedal). Other options allow stick deflection to directly control speed over ground, with and without smoothing and acceleration limits. |
| <a id="MPC_ACC_HOR_MAX"></a>[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)     | Maximum horizontal acceleration.                                                                                                                                                                                                                                                                         |
| <a id="MPC_VEL_MANUAL"></a>[MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL)      | Maximum horizontal velocity.                                                                                                                                                                                                                                                                             |

## 추가 정보

### Position Loss/Safety

Position mode is dependent on having an acceptable position estimate. If the estimate falls below acceptable levels, for example due to GPS loss, this may trigger a [Position (GPS) Loss Failsafe](../config/safety.md#position-gps-loss-failsafe). Depending on configuration, whether you have a remote control, and whether there is an adequate altitude estimate, PX4 may switch to altitude mode, manual mode, land mode or terminate.