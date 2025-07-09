---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/land
---

# Land Mode (VTOL)

[<img src="../../assets/site/position_fixed.svg" title="需要定位估计（例如GPS）" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Land_ flight mode causes the vehicle to land at the position where the mode was engaged. 降落后，无人机将会在一小段时间后上锁（默认情况下）。

A VTOL follows the land mode behavior and parameters of [Fixed-wing](../flight_modes_fw/land.md) when in FW mode, and of [Multicopter](../flight_modes_mc/land.md) when in MC mode.

当设置 [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)（默认：开）时，固定翼模式下的 VTOL 将在着陆前切换回多旋翼模式。

## See Also

- [Land Mode (MC)](../flight_modes_mc/land.md)
- [Land Mode (FW)](../flight_modes_fw/land.md)
