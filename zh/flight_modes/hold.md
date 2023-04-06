# 保持模式

[<img src="../../assets/site/position_fixed.svg" title="需要定位（例如 GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Hold* flight mode (a.k.a. "Loiter") causes the vehicle to stop and maintain its current GPS position and altitude (MC vehicles will hover at the GPS position, while FW vehicles will circle around it).

:::tip
*Hold mode* can be used to pause a mission or to help you regain control of a vehicle in an emergency. 它通常通过预编程开关激活。 :::

:::note
* 该模式需要 GPS。
* This mode is automatic - no user intervention is *required* to control the vehicle.
* 遥控开关可以在任何无人机上更改飞行模式。
* 在多旋翼中移动遥控器摇杆（或 VTOL 在多旋翼模式下）[默认情况下](#COM_RC_OVERRIDE)会将无人机切换到[位置模式](../flight_modes/position_mc.md)，除非是处理电池失效保护。 :::

下面描述每种类型飞机的具体行为。

## 多旋翼（MC）

多旋翼无人机悬停在当前位置和高度。

遥控器摇杆移动会将无人机切换到 [位置模式](../flight_modes/position_mc.md) （[默认](#COM_RC_OVERRIDE)）。

可以使用以下参数配置此动作。

| 参数                                                                                                      | 描述                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="NAV_MIN_LTR_ALT"></a>[NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | This is the minimum altitude above Home the system will always obey in Loiter (Hold) mode if switched into this mode without specifying an altitude (e.g. through Loiter switch on RC). |

<span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。 <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/navigator/loiter.cpp#L61 -->

## Fixed-wing (FW)

飞机在当前高度并在 GPS 保持的位置绕圈飞行。 The vehicle will first ascend to `NAV_MIN_LTR_ALT` if the mode is engaged below this altitude (by default disabled).

遥控器摇杆操作被忽略。

可以使用以下参数配置此动作。

| 参数                                                                             | 描述                                   |
| ------------------------------------------------------------------------------ | ------------------------------------ |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)   | 留待圈的半径。                              |
| [NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | 留待模式的最小高度（如果模式在较低的高度进行，则飞行器将上升到此高度）。 |


## 垂直起降（VTOL）

A VTOL follows the HOLD behavior and parameters of [Fixed-wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->
