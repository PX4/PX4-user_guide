# Air Traffic Avoidance: MAVLink

PX4 can use MAVLink messages to support simple air traffic avoidance in [missions](../flight_modes/mission.md).
If a potential collision is detected, PX4 can *warn*, immediately [land](../flight_modes/land.md), or [return](../flight_modes/return.md) (depending on the value of [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID)).

This implementation is based on the [ADS-B traffic avoidance](../advanced_features/traffic_avoidance_adsb.md). The `UTM_GLOBAL_POSITION` MAVLink
message is treated exactly the same as an ADS-B message.


## Configure Traffic Avoidance

Configure the action when there is a potential collision using the parameter below:

Parameter | Description
--- | ---
<span id="NAV_TRAFF_AVOID"></span>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode.


## Implementation

PX4 listens for valid `UTM_GLOBAL_POSITION` MAVLink messages during missions. When one is received, it is converted
into a transponder report in the format used by [ADS-B traffic avoidance](../advanced_features/traffic_avoidance_adsb.md).

If a valid transponder report is received, PX4 first uses the transponder position and heading information to estimate whether the vehicles will share a similar altitude before they pass each other.
If they may then PX4 estimates the closest distance between the path to the next waypoint and the other vehicles predicted path.
If the crossing point is less than 500m for altitude and path distance (hard coded), the [Traffic Avoidance Failsafe](../config/safety.md#traffic_avoidance) action is started, and the vehicle will either warn, land, or return.

The code can be found in `Navigator::check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/navigator/navigator_main.cpp)).

PX4 will also forward the transponder data to a GCS if this has been configured for the MAVLink instance (this is recommended).

## Further Information

* [ADS-B Traffic Avoidance](../advanced_features/traffic_avoidance_adsb.md)
