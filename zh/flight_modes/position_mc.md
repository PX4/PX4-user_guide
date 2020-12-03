# 位置模式（多旋翼）

[<img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*位置模式*是一种易于驾驶的遥控模式，其中滚动和俯仰操纵杆在左右和前后方向（相对于飞机的“前部”）控制地面速度，并且油门控制上升-下降的速度。 当杆被释放/居中时，飞机将主动制动、改平并锁定到3D空间中的位置——补偿风和其他力。

:::tip
Position mode is the safest manual mode for new fliers. Unlike [Altitude](../flight_modes/altitude_mc.md) and [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) modes the vehicle will stop when the sticks are centered rather than continuing until slowed by wind resistance.
:::

The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../assets/flight_modes/position_MC.png)

:::warning
Care must be taken when landing in this mode. When first landing in this mode, be ready to switch to [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) in order to be able to disarm. If landing is correctly detected, motors will spin down after touch down and then disarm shortly after. If the motors keep spinning at higher RPM or start spinning up, first switch to [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md), and then disarm. Be aware that the vehicle may tip over on the ground due to GPS drift.
:::

## 技术总结

RC/manual mode where RPT sticks control *speed* in corresponding directions. Centered sticks level vehicle and hold it to fixed position and altitude against wind.

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