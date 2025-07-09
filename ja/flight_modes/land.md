---
canonicalUrl: https://docs.px4.io/main/ja/flight_modes/land
---

# Land Mode (VTOL)

[<img src="../../assets/site/position_fixed.svg" title="Position estimate required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Land_ flight mode causes the vehicle to land at the position where the mode was engaged. After landing, vehicles will disarm after a short timeout (by default).

A VTOL follows the land mode behavior and parameters of [Fixed-wing](../flight_modes_fw/land.md) when in FW mode, and of [Multicopter](../flight_modes_mc/land.md) when in MC mode.

When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.

## See Also

- [Land Mode (MC)](../flight_modes_mc/land.md)
- [Land Mode (FW)](../flight_modes_fw/land.md)
