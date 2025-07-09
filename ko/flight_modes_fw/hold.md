---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes_fw/hold
---

# Hold Mode (Fixed Wing)

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Hold_ flight mode causes the vehicle to loiter (circle) around its current GPS position and maintain its current altitude.

:::tip

_Hold mode_ can be used to pause a mission or to help you regain control of a vehicle in an emergency. It is usually activated with a pre-programmed switch.
:::


:::note


- This mode requires GPS.
- This mode is automatic - no user intervention is _required_ to control the vehicle.
- RC control switches can be used to change flight modes on any vehicle.
- RC stick movement is ignored.

:::


## Technical Summary

The aircraft circles around the GPS hold position at the current altitude. The vehicle will first ascend to [NAV_MIN_LTR_ALT](#NAV_MIN_LTR_ALT) if the mode is engaged below this altitude.

RC stick movement is ignored.

### Parameters

Hold mode behaviour can be configured using the parameters below.

| Parameter                                                                                               | Description                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)                            | The radius of the loiter circle.                                                                              |
| <a id="NAV_MIN_LTR_ALT"></a>[NAV_MIN_LTR_ALT](../advanced_config/parameter_reference.md#NAV_MIN_LTR_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |

## See Also

[Hold Mode (MC)](../flight_modes_mc/hold.md)

<!-- this maps to AUTO_LOITER in flight mode state machine -->
