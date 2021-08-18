# 位置模式（多旋翼）

[<img src="../../assets/site/difficulty_easy.png" title="易于飞行" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*位置* 是一种简单难度的遥控器模式，该模式下横滚和俯仰摇杆控制机体的前后左右方向相对于地面的加速度（类似于车的油门踏板），油门控制上升下降的速度。 当摇杆释放/居中时，机体将主动制动，保持水平，并锁定到 3D 空间中的位置 — 补偿风和其他力。 摇杆满偏的情况下，机体以[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)的加速度，减速直到达到最终速度[MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL)。

:::tip
位置模式对于新手是最安全的手动模式。 不同于[定高模式](../flight_modes/altitude_mc.md)和[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，机体在摇杆中位时会停止，而不是继续直到风阻使其减速。
:::

下图直观地显示了模式行为（对于美国手的遥控器）。

![多旋翼位置模式](../../assets/flight_modes/position_MC.png)

### 降落

该模式中降落是很容易的：

1. 使用横滚和俯仰杆控制无人机水平位置于降落点上方。
2. 松开横滚和俯仰杆并给予足够的时间使其完全停止。
3. 轻轻下拉油门杆直到机体触碰地面。
4. 将油门杆一直向下拉以促进和加快着陆检测。
5. 机体将降低螺旋桨推力，检测地面并[自动落锁](../advanced_config/prearm_arm_disarm.md#auto-disarming)（默认）。

:::warning
虽然在校准良好的机体上非常罕见，但有时着陆可能会出现问题。

- 如果机体无法停止水平移动： 
  - 您仍然可以在[高度模式](../flight_modes/altitude_mc.md)下在控制降落。 方法与上述相同，除了您必须使用横滚和俯仰杆手动确保机体保持在降落点上方。
  - 降落后检查 GPS 和磁罗盘方向，并校准。
- 如果机体未检测到地面/降落并落锁。 
  - 机体落地后切换到[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，保持油门杆低位，并使用手势或其他命令手动落锁。 或者，当机体已经在地面上时，您也可以使用断电开关。
:::

## 技术摘要

遥控模式下，横滚、俯仰、油门 (RPT) 杆控制相应轴/方向的运动。 摇杆居中使机体水平并将其保持在固定的高度和位置并抗风。

- 摇杆处于滚动、俯仰、油门杆中位（遥控死区<a href="../advanced_config/parameter_reference.md#MPC_HOLD_DZ"MPC_HOLD_DZ</a>内）时，机体保持 x、y、z 位置稳定，抵抗任意干扰，如风。
- 中位以外： 
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