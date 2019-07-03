# Air Traffic Avoidance: ADS-B/FLARM

PX4 uses [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance_%E2%80%93_broadcast) and [FLARM](https://en.wikipedia.org/wiki/FLARM) transponders to support simple air traffic avoidance in [missions](../flight_modes/mission.md).
If a potential collision is detected, PX4 can *warn*, immediately [land](../flight_modes/land.md), or [return](../flight_modes/return.md) - depending on the value of [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID).


## Setup

### Hardware Setup



### Software Configuration (Parameters)


<span id="NAV_TRAFF_AVOID"></span>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode.


## Simulation/Testing



## Implementation

PX4 listens for valid transponder reports during missions.

If a valid transponder report is received, PX4 first uses the transponder position and heading information to estimate whether the vehicles will share a similar altitude before they pass each other.
If they may then PX4 it estimates how the closest distance between the path to the next waypoint and the other vehicles predicted path.
If the crossing point is less that 500m for altitude and path distance (hard coded), the [Traffic Avoidance Failsafe](../config/safety.md#traffic_avoidance) action is started, and the vehicle will either warn, land, or return.

The code can be found in `Navigator::check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/navigator/navigator_main.cpp)).
