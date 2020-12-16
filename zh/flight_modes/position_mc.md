# 位置模式（多旋翼）

[<img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*位置模式*是一种易于驾驶的遥控模式，其中横滚和俯仰摇杆控制左右和前后方向（相对于无人机的“前面”）对地速度，油门控制上升-下降的速度。 当摇杆释放/居中时，无人机将主动制动，保持水平，并锁定到 3D 空间中的位置 — 补偿风和其他力。

:::tip
位置模式对于新手是最安全的手动模式。 不同于[高度模式](../flight_modes/altitude_mc.md)和[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，无人机在摇杆中位时会停止，而不是继续知道风阻使其减速。
:::

下图直观地显示了模式行为（对于模式2变送器）。

![MC Position Mode](../../assets/flight_modes/position_MC.png)

:::warning
在此模式下降落是需要格外小心。 首次在此模式下降落时，准备切换到 [手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，以便能够锁定飞机。 如果正确地检测到着陆,，电机会在触地后停止旋转，然后很快锁定。 如果点击继续高速旋转或者开始加速旋转，先切换到[手动/自稳模式（多旋翼）](../flight_modes/manual_stabilized_mc.md)，然后再锁定。 请注意，由于 GPS 漂移，飞机可能会翻倒在地面上。
:::

## 技术总结

遥控/手动模式中的俯仰、横滚、油门摇杆在想用的方向上控制*速度*。 回中摇杆可以拉平飞机，保持在固定位置和高度并抗风。

* 回正的RPT摇杆（在死区内）可以抗风并保持飞机X、Y、Z位置稳定以及姿态水平。
* 中心以外： 
  * 滚转/俯仰摇杆控制相对于飞机”前部“的左右前后方向的速度。
  * 油门摇杆控制上升-下降的速度。
  * 偏航摇杆控制水平面上方的角度旋转速率。
* 起飞 Takeoff: 
  * When landed, the vehicle will take off if the throttle stick is raised above 62.5% percent (of the full range from bottom).
* 着陆: 
  * When close to the ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2)), horizontal velocity is limited ([MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
* This mode requires GPS.
:::

### 参数

All the parameters in the [Multicopter Position Control](../advanced_config/parameter_reference.md#multicopter-position-control) group are relevant. A few parameters of particular note are listed below.

| 参数                                                                                                          | 描述                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 启用位置保持的摇杆的死区。 默认值：0.1（摇杆行程的10％）。                                                                                                                                                   |
| <span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 最大垂直上升速度。 默认：3m/s。                                                                                                                                                                 |
| <span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 最大垂直下降速度。 默认：1m/s。                                                                                                                                                                 |
| <span id="MPC_LAND_VEL_XY"></span>[MPC_LAND_VEL_XY](../advanced_config/parameter_reference.md#MPC_LAND_VEL_XY)     | Horizontal velocity limit when close to ground ([MPC_LAND_ALT2](#MPC_LAND_ALT2) meters above ground, or above home if distance-to-ground is unknown). 默认：10m/s                   |
| <span id="MPC_LAND_ALT1"></span>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | Altitude for triggering first phase of slow landing. Affects maximum allowed horizontal velocity setpoint. Default 5m.                                                             |
| <span id="MPC_LAND_ALT2"></span>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | Altitude for second phase of slow landing. In this phase maximum horizontal velocity is limited to [MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY). Default 5m.                              |
| <span id="RCX_DZ"></span>`RCX_DZ`                                                                           | 通道X的遥控死区。油门的X值取决于[ RC_MAP_THROTTLE ](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE)的值。 例如，如果油门是通道4，则[RC4_DZ ](../advanced_config/parameter_reference.md#RC4_DZ)指定死区。 |
| <span id="MPC_xxx"></span>`MPC_XXXX`                                                                         | 大多数MPC_xxx参数会影响此模式下的飞行行为（至少在某种程度上）。 例如，[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)定义飞机悬停时的推力。                                                       |

## Additional Information

### Position Loss/Safety

Position mode is dependent on having an acceptable position estimate. If the estimate falls below acceptable levels, for example due to GPS loss, this may trigger a [Position (GPS) Loss Failsafe](../config/safety.md#position-gps-loss-failsafe). Depending on configuration, whether you have a remote control, and whether there is an adequate altitude estimate, PX4 may switch to altitude mode, manual mode, land mode or terminate.