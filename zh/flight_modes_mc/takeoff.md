---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes_mc/takeoff
---

# Takeoff Mode (Multicopter)

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Takeoff_ flight mode causes the vehicle to take off to a specified height and wait for further input.

:::note


- This mode requires a good position estimate (e.g. from GPS).
- The vehicle must be armed before this mode will activate.
- This mode is automatic - no user intervention is _required_ to control the vehicle.
- RC control switches can be used to change flight modes.
- RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes_mc/position.md) unless handling a critical battery failsafe.
- The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff.

:::


## Technical Summary

A multi rotor ascends vertically to the altitude defined in [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) and holds position.

RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) (by [default](#COM_RC_OVERRIDE)).

### Parameters

Takeoff is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="MIS_TAKEOFF_ALT"></a>[MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) | Target altitude during takeoff (default: 2.5m)                                                                                                                                                                                                               |
| <a id="MPC_TKO_SPEED"></a>[MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)     | Speed of ascent (default: 1.5m/s)                                                                                                                                                                                                                            |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled)                                                                                               |

## See Also

- [Takeoff Mode (FW)](../flight_modes_fw/takeoff.md)

<!-- this maps to AUTO_TAKEOFF in dev -->
