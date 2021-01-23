# 保持模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位（例如 GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*保持*飞行模式（也就是“留待”模式）使飞机停止运动并保持其当前的 GPS 位置和高度（多旋翼将悬停在 GPS 位置，而固定翼将围绕它旋转）。

:::tip
*保持模式* 可以用于暂停任务或帮助您在紧急情况下重新获得对飞机的控制权。 它通常通过预编程开关激活。
:::

:::note

* 该模式需要 GPS。
* 该模式是自动的 - 不 *需要* 用户干预即可控制无人机。
* 遥控开关可以在任何无人机上更改飞行模式。
* 在多旋翼中移动遥控器摇杆（或 VTOL 在多旋翼模式下）[默认情况下](#COM_RC_OVERRIDE)会将无人机切换到[位置模式](../flight_modes/position_mc.md)，除非是处理电池失效保护。
:::

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

多旋翼无人机悬停在当前位置和高度。

遥控器摇杆的移动（[默认情况下](#COM_RC_OVERRIDE)）会将无人机切换到 [位置模式](../flight_modes/position_mc.md)， 除非是正在处理电池失效保护。

可以使用以下参数配置此动作。

| 参数                                                                                                      | 描述                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT)   | 留待模式的最小高度（如果模式在较低的高度进行，则飞行器将上升到此高度）。                                                                                                             |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 如果使能，在多旋翼上移动摇杆（或者 VTOL 在多旋翼模式）将控制权还给处于[位置模式](../flight_modes/position_mc.md)的无人机（除非无人机正在处理电池失效保护）。 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。 |

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## 固定翼飞行器（FW）

飞机在当前高度并在 GPS 保持的位置绕圈飞行。 如果在低于这个高度使用该模式，无人机会首先上升到 `MIS_LTRMIN_ALT`。

遥控器摇杆操作被忽略。

可以使用以下参数配置此动作。

| 参数                                                                           | 描述                                  |
| ---------------------------------------------------------------------------- | ----------------------------------- |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | 留待圈的半径。                             |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | 留待模式的最小高度（如果模式在较低的高度进行，则飞机将上升到此高度）。 |

## 垂直起降（VTOL）

当处于固定翼模式时，VTOL 遵循 HOLD 行为和 [固定翼](#fixed-wing-fw)的参数，而当处于多旋翼模式时，VTOL 遵循[多旋翼](#multi-copter-mc)的参数。

<!-- this maps to AUTO_LOITER in flight mode state machine -->