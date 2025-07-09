---
canonicalUrl: https://docs.px4.io/main/ja/flight_modes_mc/hold
---

# Hold Mode (Multicopter)

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Hold_ flight mode causes the vehicle to stop and hover at its current GPS position and altitude.

:::tip

_Hold mode_ can be used to pause a mission or to help you regain control of a vehicle in an emergency. It is usually activated with a pre-programmed switch.
:::


:::note


- This mode requires GPS.
- This mode is automatic - no user intervention is _required_ to control the vehicle.
- RC control switches can be used to change flight modes on any vehicle.
- RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes_mc/position.md) unless handling a critical battery failsafe.

:::


## Technical Summary

The vehicle hovers at the current position and altitude. The vehicle will first ascend to [NAV_MIN_LTR_ALT](#NAV_MIN_LTR_ALT) if the mode is engaged below this altitude.

RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) (by [default](#COM_RC_OVERRIDE)).

### Parameters

Hold mode behaviour can be configured using the parameters below.

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="NAV_MIN_LTR_ALT"></a>[NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | This is the minimum altitude above Home the system will always obey in Hold mode if switched into this mode without specifying an altitude (e.g. through switch on RC).                                                                                      |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                                                                              |

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/navigator/loiter.cpp#L61 -->

## See Also

[Hold Mode (FW)](../flight_modes_fw/hold.md)