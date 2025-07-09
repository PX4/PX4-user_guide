---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/land
---

# Land Mode (VTOL)

[<img src="../../assets/site/position_fixed.svg" title="필요한 위치 추정치(예: GPS) " width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The _Land_ flight mode causes the vehicle to land at the position where the mode was engaged. 착륙후 기체는 가급적 짧은 시간내에 시동이 해제됩니다.

A VTOL follows the land mode behavior and parameters of [Fixed-wing](../flight_modes_fw/land.md) when in FW mode, and of [Multicopter](../flight_modes_mc/land.md) when in MC mode.

[NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)이 설정되면(기본값: 켜짐) 고정익 모드의 VTOL이 착륙 직전에 멀티콥터로 되돌아갑니다.

## See Also

- [Land Mode (MC)](../flight_modes_mc/land.md)
- [Land Mode (FW)](../flight_modes_fw/land.md)
