---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/position_mc
---

# 定点模式（多旋翼）

[<img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*位置模式* 是一种易于飞行的遥控器模式，该模式下横滚和俯仰摇杆控制载具相对于地面的前后左右加速度（类似于车的油门踏板），油门控制加减速。 当摇杆释放/居中时，无人机将主动制动，保持水平，并锁定到 3D 空间中的位置 — 补偿风和其他力。 摇杆满偏的情况下，载具以参数 [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX) 定义的值加速，直到达到参数 [MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL)定义的最终速度后开始减速。

:::tip
位置模式对于新手是最安全的手动模式。 不同于[定高模式](../flight_modes/altitude_mc.md)和[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，无人机在摇杆中位时会停止，而不是继续知道风阻使其减速。
:::

下图直观地显示了模式行为（对于美国手的发射机）。

![多旋翼位置模式](../../assets/flight_modes/position_MC.png)

### 着陆

该模式下着陆很容易：

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

## 技术概要

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

### 参数

All the parameters in the [Multicopter Position Control](../advanced_config/parameter_reference.md#multicopter-position-control) group are relevant. A few parameters of particular note are listed below.

| 参数                                                                                                          | 描述                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_HOLD_DZ"></a>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 启用位置保持的摇杆的死区。 默认值：0.1（摇杆行程的 10％）。                                                                                                                                                                                                                                                                        |
| <a id="MPC_Z_VEL_MAX_UP"></a>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 最大垂直上升速度。 默认：3 m/s。                                                                                                                                                                                                                                                                                      |
| <a id="MPC_Z_VEL_MAX_DN"></a>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 最大垂直下降速度。 默认：1 m/s。                                                                                                                                                                                                                                                                                      |
| <a id="MPC_LAND_VEL_XY"></a>[MPC_LAND_VEL_XY](../advanced_config/parameter_reference.md#MPC_LAND_VEL_XY)     | 当接近地面时（距离地面 [MPC_LAND_ALT2](#MPC_LAND_ALT2) 米，或者距离起始位置距离不详），水平速度受到限制。 默认：10 m/s                                                                                                                                                                                                                        |
| <a id="MPC_LAND_ALT1"></a>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | 触发第一阶段降速的高度。 与最大允许的水平速度设定值相关。 默认 5 米。                                                                                                                                                                                                                                                                    |
| <a id="MPC_LAND_ALT2"></a>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | 触发第二阶段降速的高度。 这阶段最大水平速度限制为 [MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)。 默认 5 米。                                                                                                                                                                                                                                 |
| <a id="RCX_DZ"></a>`RCX_DZ`                                                                           | 通道 X 的遥控死区。油门的 X 值取决于[ RC_MAP_THROTTLE ](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE)的值。 例如，如果油门是通道4，则[RC4_DZ ](../advanced_config/parameter_reference.md#RC4_DZ)指定死区。                                                                                                                   |
| <a id="MPC_xxx"></a>`MPC_XXXX`                                                                         | 大多数MPC_xxx参数会影响此模式下的飞行行为（至少在某种程度上）。 例如，[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) 定义飞机悬停时的推力。                                                                                                                                                                            |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)           | Stick input to movement translation strategy. From PX4 v1.12 the default (4) is that stick position controls acceleration (in a similar way to a car accelerator pedal). Other options allow stick deflection to directly control speed over ground, with and without smoothing and acceleration limits. |
| <a id="MPC_ACC_HOR_MAX"></a>[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)     | Maximum horizontal acceleration.                                                                                                                                                                                                                                                                         |
| <a id="MPC_VEL_MANUAL"></a>[MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL)      | Maximum horizontal velocity.                                                                                                                                                                                                                                                                             |

## 附加信息

### 位置丢失/安全

Position mode is dependent on having an acceptable position estimate. If the estimate falls below acceptable levels, for example due to GPS loss, this may trigger a [Position (GPS) Loss Failsafe](../config/safety.md#position-gps-loss-failsafe). Depending on configuration, whether you have a remote control, and whether there is an adequate altitude estimate, PX4 may switch to altitude mode, manual mode, land mode or terminate.