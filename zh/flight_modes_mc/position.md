---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes_mc/position
---

# 位置模式（多旋翼）

[<img src="../../assets/site/difficulty_easy.png" title="飞行难度：简单" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动/遥控器控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="需要定位锁定（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*Position* is an easy-to-fly RC mode in which roll and pitch sticks control acceleration over ground in the vehicle's left-right and forward-back directions (similar to a car's accelerator pedal), and throttle controls speed of ascent-descent. 当摇杆释放/居中时，机体将主动制动，保持水平，并锁定到 3D 空间中的位置 — 补偿风和其他力。 When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces. 摇杆满偏时，机体以[MPC_ACC_HOR_MAX](#MPC_ACC_HOR_MAX)开始加速减小到达到最终的速度[MPC_VEL_MANUAL](#MPC_VEL_MANUAL)。

:::tip

:::tip
位置模式对于新手是最安全的手动模式。 不同于[定高模式](../flight_modes/altitude_mc.md)和[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，机体在摇杆中位时会停止，而不是继续直到风阻使其减速。
:::


The diagram below shows the mode behaviour visually (for a mode 2 transmitter).

![MC Position Mode](../../assets/flight_modes/position_MC.png)

### 降落

该模式中降落是很容易的：
1. 使用横滚和俯仰杆控制无人机水平位置于降落点上方。
1. 松开横滚和俯仰杆并给予足够的时间使其完全停止。
1. 轻轻下拉油门杆直到机体触碰地面。
1. 将油门杆一直向下拉以促进和加快着陆检测。
1. 机体将降低螺旋桨推力，检测地面并[自动落锁](../advanced_config/prearm_arm_disarm.md#auto-disarming)（默认）。

:::warning

While very rare on a well calibrated vehicle, sometimes there may be problems with landing.
- 如果机体无法停止水平移动：
  - 您仍然可以在[高度模式](../flight_modes/altitude_mc.md)下在控制降落。 方法与上述相同，除了您必须使用横滚和俯仰杆手动确保机体保持在降落点上方。
  - 降落后检查 GPS 和磁罗盘方向，并校准。
- If the vehicle does not detect the ground/landing and disarm:
  - 机体落地后切换到[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)，保持油门杆低位，并使用手势或其他命令手动落锁。 或者，当机体已经在地面上时，您也可以使用断电开关。
:::


## 技术摘要

遥控模式下，横滚、俯仰、油门 (RPT) 杆控制相应轴/方向的运动。 摇杆居中使机体水平并将其保持在固定的高度和位置并抗风。

* 摇杆处于滚动、俯仰、油门杆中位（遥控死区

内）时，机体保持 x、y、z 位置稳定，抵抗任意干扰，如风。</li> 
  
  * 中位以外： 
    * 横滚/俯仰杆控制机体左右和前后方向（分别）在地面上的水平加速度。
  * 油门杆控制上升下降速度。
  * 偏航杆控制水平面上方的角旋转速率。
* 起飞： 
    * 在地面时，如果油门杆升高到 62.5% 以上（从底部的全范围），机体将起飞。</ul> 

:::note

* 手动输入信号是必须的（遥控器，或通过 MAVLink 的游戏手柄/拇指摇杆）。
* 此模式需要 GPS。
:::




### 参数

[多旋翼位置控制](../advanced_config/parameter_reference.md#multicopter-position-control)组的所有参数都与位置模式有关。 下面列出了一些特别值得注意的参数。

| 参数                                                                                                          | 描述                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_HOLD_DZ"></a>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 启用位置保持的摇杆死区。 默认值：0.1（摇杆全行程的 10％）。                                                                                                                                                                                                                                                                                                                   |
| <a id="MPC_Z_VEL_MAX_UP"></a>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 最大垂直上升速度。 默认：3 m/s。                                                                                                                                                                                                                                                                                                                                 |
| <a id="MPC_Z_VEL_MAX_DN"></a>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 最大垂直下降速度。 默认：1 m/s。                                                                                                                                                                                                                                                                                                                                 |
| <a id="MPC_LAND_ALT1"></a>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | 触发第一阶段降速的高度。 Below this altitude descending velocity gets limited to a value between [MPC_Z_VEL_MAX_DN](#MPC_Z_VEL_MAX_DN) (or `MPC_Z_V_AUTO_DN`) and [MPC_LAND_SPEED](#MPC_LAND_SPEED). Value needs to be higher than [MPC_LAND_ALT2](#MPC_LAND_ALT2). 默认10米 Value needs to be higher than [MPC_LAND_ALT2](#MPC_LAND_ALT2). Default 10m. |
| <a id="MPC_LAND_ALT2"></a>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | 触发第二阶段降速的高度。 Below this altitude descending velocity gets limited to [`MPC_LAND_SPEED`](#MPC_LAND_SPEED). Value needs to be lower than "MPC_LAND_ALT1". 默认 5 米。 Value needs to be lower than "MPC_LAND_ALT1". Default 5m.                                                                                                                       |
| <a id="RCX_DZ"></a>`RCX_DZ`                                                                           | 通道 X 的遥控死区。 油门的 X 值取决于[ RC_MAP_THROTTLE ](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE)的值。 例如，如果油门是通道4，则[RC4_DZ ](../advanced_config/parameter_reference.md#RC4_DZ)指定死区。                                                                                                                                                             |
| <a id="MPC_xxx"></a>`MPC_XXXX`                                                                         | 大多数MPC_xxx参数会影响此模式下的飞行行为（至少在某种程度上）。 例如，[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) 定义飞机悬停时的推力。                                                                                                                                                                                                                       |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)           | 从摇杆输入到机体动作的转换策略。 从 PX4 v1.12 开始，默认值 (4) 是操纵杆位置控制加速度（类似于汽车油门踏板）。 其他选项允许操纵杆偏转直接控制地面速度，有或没有平滑和加速度限制。                                                                                                                                                                                                                                                   |
| <a id="MPC_ACC_HOR_MAX"></a>[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)     | 最大水平加速度。                                                                                                                                                                                                                                                                                                                                            |
| <a id="MPC_VEL_MANUAL"></a>[MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL)       | 最大水平速度。                                                                                                                                                                                                                                                                                                                                             |
| <a id="MPC_LAND_SPEED"></a>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)      | Landing descend rate. Landing descend rate. Default 0.7 m/s.                                                                                                                                                                                                                                                                                        |




## 附加信息



### 位置丢失/安全

位置模式依赖于一个可接受的位置估计。 If the estimate falls below acceptable levels, for example due to GPS loss, this may trigger a [Position (GPS) Loss Failsafe](../config/safety.md#position-gps-loss-failsafe). 如果估计值低于可接受的水平，例如由于 GPS 丢失，这可能会触发位置 (GPS) 丢失故障保护 根据配置，是否有遥控器，以及是否有足够的高度估计，PX4 可能会切换到高度模式、手动模式、降落模式或终止。
