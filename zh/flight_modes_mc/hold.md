# 保持模式 (多旋翼)

<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

_保持_飞行模式使飞行器停止并悬停在当前的 GPS 位置和高度。

:::tip
_保持模式_ 可以用于暂停任务或帮助您在紧急情况下恢复对车辆的控制。 它通常通过预编程开关激活。
:::

:::note

- 该模式是自动的 - 不 _需要_ 用户干预即可控制无人机。
- 模式需要全球 3D 位置估计（通过 GPS 或从[本地位置](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)推断）。
  - 没有有效的本地位置，飞行器不能切换到此模式。
  - 飞行器如果失去位置估计，就会失效。
  - 已解除武装的车辆可以在没有有效位置估计的情况下切换到模式，但不能使用武装。
- 模式需要风力和飞行时间在允许的限制范围内(通过参数指定)。
- 遥控器开关可以用于更改任何无人机的飞行模式。
- 摇杆动作（[默认情况下](#COM_RC_OVERRIDE)）会将无人机切换到 [位置模式](../flight_modes_mc/position.md)， 除非是正在处理电池失效保护。

<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/modules/commander/ModeUtil/mode_requirements.cpp -->

:::

## 技术摘要

The vehicle hovers at the current position and altitude. The vehicle will first ascend to [NAV_MIN_LTR_ALT](#NAV_MIN_LTR_ALT) if the mode is engaged below this altitude.

RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) (by [default](#COM_RC_OVERRIDE)).

### Parameters

Hold mode behaviour can be configured using the parameters below.

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="NAV_MIN_LTR_ALT"></a>[NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | This is the minimum altitude above Home the system will always obey in Hold mode if switched into this mode without specifying an altitude (e.g. through switch on RC).                                                                                      |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                                                                              |

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/modules/navigator/loiter.cpp#L61 -->

## See Also

[Hold Mode (FW)](../flight_modes_fw/hold.md)
