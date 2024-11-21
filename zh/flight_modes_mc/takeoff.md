# Takeoff Mode (Multicopter)

<img src="../../assets/site/position_fixed.svg" title="需要定位修复（例如GPS）" width="30px" />

The _Takeoff_ flight mode causes the vehicle to take off to a specified height and wait for further input.

:::note

- Mode is automatic - no user intervention is _required_ to control the vehicle.
- Mode requires at least a valid local position estimate (does not require a global position).
  - Flying vehicles can't switch to this mode without valid local position.
  - Flying vehicles will failsafe if they lose the position estimate.
  - Disarmed vehicles can switch to mode without valid position estimate but can't arm.
- RC control switches can be used to change flight modes.
- 摇杆动作（[默认情况下](#COM_RC_OVERRIDE)）会将无人机切换到 [位置模式](../flight_modes_mc/position.md)， 除非是正在处理电池失效保护。
- The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff.

<!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/commander/ModeUtil/mode_requirements.cpp -->

:::

## 技术总结

A multi rotor ascends vertically to the altitude defined in [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) and holds position.

RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) (by [default](#COM_RC_OVERRIDE)).

### 参数

Takeoff is affected by the following parameters:

| 参数                                                                                                      | 描述                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MIS_TAKEOFF_ALT"></a>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Target altitude during takeoff (default: 2.5m)                                                                                                                 |
| <a id="MPC_TKO_SPEED"></a>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | Speed of ascent (default: 1.5m/s)                                                                                                                              |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 遥控器打杆时多旋翼（或者多旋翼模式下的 VOTL）会切换到 [位置模式](../flight_modes_mc/position.md)。 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。                                            |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled) |

## See Also

- [Throw Launch (MC)](../flight_modes_mc/throw_launch.md)
- [Takeoff Mode (FW)](../flight_modes_fw/takeoff.md)

<!-- this maps to AUTO_TAKEOFF in dev -->
