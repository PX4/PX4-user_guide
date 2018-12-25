# Position Mode (Multicopter)

[<img src="../../assets/site/difficulty_easy.png" title="易于使用" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Position* is an easy-to-fly RC mode in which roll and pitch sticks control speed over ground in the left-right and forward-back directions (relative to the "front" of the vehicle), and throttle controls speed of ascent-descent. When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.

> **Tip** Position mode is the safest manual mode for new fliers. Unlike [Altitude](../flight_modes/altitude_mc.md) and [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) modes the vehicle will stop when the sticks are centered rather than continuing until slowed by wind resistance.

The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../images/flight_modes/position_MC.png)

> **Warning** Care must be taken when landing in this mode. When first landing in this mode, be ready to switch to [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) in order to be able to disarm. If landing is correctly detected, motors will spin down after touch down and then disarm shortly after. If the motors keep spinning at higher RPM or start spinning up, first switch to [Manual/Stabilized (MC)](../flight_modes/manual_stabilized_mc.md), and then disarm. Be aware that the vehicle may tip over on the ground due to GPS drift.

## 技术总结

RC/manual mode where RPT sticks control *speed* in corresponding directions. 中心摇杆水平飞机, 并保持它的固定位置和高度逆风。

* Centered RPT sticks (in RC deadzone) hold x, y, z position steady against any wind and levels attitude.
* 外部中心： 
  * 翻滚/俯仰摇杆控制相对于飞机”前部“的左右前后方向的速度。
  * 油门摇杆控制速度的上升。
  * 偏航摇杆控制水平面上方的角度旋转速率。

> **注** *可能需要手动输入（遥控器，或通过MAVLink连接的游戏手柄/拇指杆）。 * This mode requires GPS.

### 参数

All the parameters in the [Multicopter Position Control](../advanced_config/parameter_reference.md#multicopter-position-control) group are relevant. A few parameters of particular note are listed below.

| 参数                                                                                                          | 描述                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | Deadzone of sticks where position hold is enabled. Default: 0.1 (10% of full stick range).                                                                                         |
| <span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 最大垂直上升速度。 默认：3m/s。                                                                                                                                                                 |
| <span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 最大垂直下降速度。 默认：1m/s。                                                                                                                                                                 |
| <span id="RCX_DZ"></span>`RCX_DZ`                                                                           | 通道X的遥控死区。油门的X值取决于[ RC_MAP_THROTTLE ](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE)的值。 例如，如果油门是通道4，则[RC4_DZ ](../advanced_config/parameter_reference.md#RC4_DZ)指定死区。 |
| <span id="MPC_xxx"></span>`MPC_XXXX`                                                                         | 大多数MPC_xxx参数会影响此模式下的飞行行为（至少在某种程度上）。 例如，[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)定义飞机悬停时的推力。                                                       |