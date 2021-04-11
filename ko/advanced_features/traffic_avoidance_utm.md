# 항공 교통 회피 : UAS 교통 관리 (UTM)

PX4에서는 MAVLink [`UTM_GLOBAL_POSITION`](https://mavlink.io/en/messages/common.html#UTM_GLOBAL_POSITION) 메시지를 사용하여 [임무 수행](../flight_modes/mission.md)중 간단한 항공 교통 회피 기능을 지원할 수 있습니다. 잠재적인 충돌이 감지되면 PX4는 [`NAV_TRAFF_AVOID`](#NAV_TRAFF_AVOID) 값에 따라 *경고*, 즉시 [착륙](../flight_modes/land.md) 또는 [귀환](../flight_modes/return.md) 할 수 있습니다.

:::note
This implementation is exactly the same as for [ADS-B traffic avoidance](../advanced_features/traffic_avoidance_adsb.md) (except for the source of other-vehicle data). For more information see [implementation](#implementation) below.
:::


## Configure Traffic Avoidance

Configure the trigger distance and action when there is a potential collision using the parameters below:

| Parameter                                                                                                 | Description                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <a id="NAV_TRAFF_AVOID"></a>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)   | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode. |
| <a id="NAV_TRAFF_A_RADM"></a>[NAV_TRAFF_A_RADM](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADM) | Set traffic avoidance trigger distance for *manned* aviation.                                                     |
| <a id="NAV_TRAFF_A_RADU"></a>[NAV_TRAFF_A_RADU](../advanced_config/parameter_reference.md#NAV_TRAFF_A_RADU) | Set traffic avoidance trigger distance for *unmanned* aviation.                                                   |


## Implementation

PX4 listens for `UTM_GLOBAL_POSITION` MAVLink messages during missions. When a valid message is received, its validity flags, position and heading are mapped into the same `transponder_report` UORB topic used for *ADS-B traffic avoidance*.

The implementation is otherwise *exactly* as described in: [ADS-B traffic avoidance > Implementation](../advanced_features/traffic_avoidance_adsb.md#implementation).

:::note
[UTM_GLOBAL_POSITION](https://mavlink.io/en/messages/common.html#UTM_GLOBAL_POSITION) contains additional fields that are not provided by an ADSB transponder (see [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE)). The current implementation simply drops the additional fields (including information about the vehicle's planned next waypoint).
:::

## Further Information

* [ADS-B Traffic Avoidance](../advanced_features/traffic_avoidance_adsb.md)
