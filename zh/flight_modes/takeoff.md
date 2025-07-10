---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/takeoff
---

# 起飞模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位（例如 GPS ）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Takeoff* flight mode causes the vehicle to take off to a specified height and wait for further input.

:::note
* 该模式需要一个良好的位置估计（如，从 GPS 中获取）。
* 使用此模式前必须先解锁。
* This mode is automatic - no user intervention is *required* to control the vehicle.
* 遥控开关可以在任何无人机上更改飞行模式。
* 在多旋翼中移动遥控器摇杆（或 VTOL 在多旋翼模式下）[默认情况下](#COM_RC_OVERRIDE)会将无人机切换到[位置模式](../flight_modes/position_mc.md)，除非是处理电池失效保护。
* 如果起飞时出现问题， [故障检测器](../config/safety.md#failure-detector) 将自动停止引擎。 :::

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

多旋翼上升到 `MIS_TAKEOFF_ALT` 中定义的高度并保持位置。

遥控器摇杆移动会把无人机切换到 [位置模式](../flight_modes/position_mc.md) （[默认](#COM_RC_OVERRIDE)）。

起飞受以下参数影响：

| 参数                                                                                                               | 描述                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_TAKEOFF_ALT"></span>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | 起飞期间的目标高度 (默认值: 2.5 米)                                                                                                |
| <span id="MPC_TKO_SPEED"></span>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)       | 上升速度 (默认值: 1.5 m/s)                                                                                                   |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 控制多旋翼（或者多旋翼模式下的 VOTL）的摇杆移动量来切换到 [位置模式](../flight_modes/position_mc.md)。 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。 |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 导致发射机切换到 [位置模式](../flight_modes/position_mc.md) 的摇杆移动量（如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。                 |

<span id="fixed_wing"></span>
## 固定翼（FW）

The aircraft takes off in the current direction using either *catapult/hand-launch mode* or *runway takeoff mode*. 模式默认为弹射/手动发射，但可以使用[ RWTO_TKOFF ](#RWTO_TKOFF)设置为跑道起飞。 在这两种情况下，遥控操作都被忽略。

<span id="hand_launch"></span>
### 弹射/手动发射

In *catapult/hand launch mode* the vehicle waits to detect launch (based on acceleration trigger). On launch it ramps up to full throttle ([RWTO_MAX_THR](#RWTO_MAX_THR)) in about 2 seconds and then performs a full throttle climbout, with *minimum* 10 degree takeoff pitch. 一旦它达到 [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF) 它将过渡到 [保持模式](../flight_modes/hold.md) 和悬停。

除了上面讨论的行为之外，还有一个启动检测器可以阻止启动程序开始直到满足某些条件。 对于弹射器发射，这是一些加速度阈值。 :::

<span id="runway_launch"></span>
### 跑到起飞

The *runway takeoff mode* has the following phases:

1. **Throttle ramp**: Clamped to the runway (pitch fixed, no roll, and heading hold) until reach the minimum airspeed for takeoff ([FW_AIRSPD_MIN](#FW_AIRSPD_MIN) x [RWTO_AIRSPD_SCL](#RWTO_AIRSPD_SCL)).
1. **Takeoff**: Increase pitch and continue until vehicle altitude > navigation altitude ([RWTO_NAV_ALT](#RWTO_NAV_ALT)).
1. **Climbout**: Climb until altitude above ground level > [FW_CLMBOUT_DIFF](#FW_CLMBOUT_DIFF). 在此阶段中, 将移除滚转和航向限制。


### 固定翼起飞参数

起飞受以下参数影响：高于地平面（AGL）的高度，留有足够的离地间隙以允许一些滚转。 在达到` RWTO_NAV_ALT `之前，飞机保持水平，并且仅使用方向舵来保持航向（参见<span id="RWTO_HDG"> </ 1> <a href="../advanced_config/parameter_reference.md#RWTO_HDG"> RWTO_HDG </a>）。 This should be below <code>FW_CLMBOUT_DIFF</code> if <code>FW_CLMBOUT_DIFF</code> > 0.</td> </tr> </tbody> </table> 

<p spaces-before="0">
:::note
起飞时，无人机 总是遵循正常的固定翼最大/最小油门设置（<a href="../advanced_config/parameter_reference.md#FW_THR_MIN">FW_THR_MIN</a>，<a href="../advanced_config/parameter_reference.md#FW_THR_MAX">FW_THR_MAX</a>）。 :::
</p>



<h2 spaces-before="0">
  垂直起降（VTOL）
</h2>

<p spaces-before="0">
  VTOL 在启动时默认为多旋翼模式，通常可以在多旋翼模式下起飞（而且也更安全）。
</p>

<p spaces-before="0">
  也就是说，如果在起飞前切换到固定翼，将以<a href="#fixed_wing">固定翼</a>模式起飞。
</p>

<!-- this maps to AUTO_TAKEOFF in dev -->
