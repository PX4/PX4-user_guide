# Flight Modes (Developers)

_Flight Modes_ define how the autopilot responds to user input and controls vehicle movement.
They are loosely grouped into _manual_, _assisted_ and _auto_ modes, based on the level/type of control provided by the autopilot.
The pilot transitions between flight modes using switches on the remote control or with a ground control station.

Not all flight modes are available (or makes sense), on all vehicle types, and some modes behave differently on different vehicle types.

## PX4 Flight Modes

User-facing flight mode documentation can be found in:

- [Flight Modes (Multicopter)](../flight_modes_mc/index.md)
- [Flight Modes (Fixed-Wing)](../flight_modes_fw/index.md)
- [Flight Modes (VTOL)](../flight_modes_vtol/index.md)
- [Drive Modes (Differential Rover)](../flight_modes_rover/differential.md)
- [Drive Modes (Ackermann Rover)](../flight_modes_rover/ackermann.md)
- [Basic Configuration > Flight Modes](../config/flight_mode.md)

## ROS 2 Flight Modes

Point to the ROS 2 docs.

## Choosing between PX4 and ROS 2 flight Modes

<!-- Format  -->

- if low-level access and or strict timing or high update rate requirements (e.g. direct motor controls on an MC) -> PX4
- if vehicle has no companion -> PX4
- if not want to or can use ROS for whatever reason -> PX4
- if safety-critical (like RTL) -> PX4 (but you might still want to have a fancier RTL replacement on the ROS side)

for the rest: ROS. Specifically, reasons for ROS:

- easier to implement (no need to deal with low-level embedded constraints and requirements, like stack sizes).
- Easier to maintain (no need to rebase custom PX4 changes).
- Crashing the app does not crash the vehicle.
- High-level functionality is available (e.g. dynamic data structures, or many (ROS) libraries).
- More available compute to do more advanced processing (e.g. computer vision).

## Flight mode restrictions

Some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock).
The system will not allow transitions to those modes until the right conditions are met.

- Flight mode restrictions in PX4: https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/commander/ModeUtil/mode_requirements.cpp#L46
- Flight mode restrictions in ROS 2 - point to ROS 2 docs.


## PX4 Flight Modes

Something here about what they are, how they related to [Flight Tasks](../concept/flight_tasks.md), where they are located.
How they are added.

## MAVLink Integration

### Standard Modes Protocol

PX4 implements the MAVLink [Standard Modes Protocol](https://mavlink.io/en/services/standard_modes.md) from PX4 v1.15, with a corresponding implementation in QGroundControl Daily builds (and future release builds).

This protocol allows:

- Discovery of all modes supported by a system from both PX4 and ROS 2 ([MAV_CMD_REQUEST_MESSAGE](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_MESSAGE) and [AVAILABLE_MODES](https://mavlink.io/en/messages/common.html#AVAILABLE_MODES)).
- Discovery of the current mode ([CURRENT_MODE](https://mavlink.io/en/messages/common.html#CURRENT_MODE)).
- Setting of standard modes using [MAV_CMD_DO_SET_STANDARD_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_STANDARD_MODE) (recommended)
- Setting of custom modes using [SET_MODE](https://mavlink.io/en/messages/common.html#SET_MODE) (using information from `AVAILABLE_MODES`). At time of writing [MAV_CMD_DO_SET_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_MODE) is not supported.
- Notification when the set of modes changes ([AVAILABLE_MODES_MONITOR](https://mavlink.io/en/messages/common.html#AVAILABLE_MODES_MONITOR))

Modes can be "standard" or "custom".
The standard modes ([MAV_STANDARD_MODE](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE)) are those that are common to most flight stacks with broadly the same behaviour, whereas custom modes are flight-stack specific.

PX4 advertises support for the standard flight modes that are relevant for almost all vehicle types:

- [MAV_STANDARD_MODE_SAFE_RECOVERY](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_SAFE_RECOVERY) - PX4 [Return mode](../flight_modes/return.md) (`vehicle_status_s::NAVIGATION_STATE_AUTO_RTL`)
- [MAV_STANDARD_MODE_MISSION](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_MISSION) - PX4 [Mission mode](../flight_modes_mc/mission.md) (vehicle_status_s::NAVIGATION_STATE_AUTO_MISSION)
- [MAV_STANDARD_MODE_LAND](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_LAND) - PX4 [Land mode](../flight_modes_mc/land.md) (vehicle_status_s::NAVIGATION_STATE_AUTO_LAND)
- [MAV_STANDARD_MODE_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_TAKEOFF) - PX4 [Takeoff mode](../flight_modes_mc/takeoff.md) (vehicle_status_s::NAVIGATION_STATE_AUTO_TAKEOFF)

MC vehicles also support the following standard modes:

- [MAV_STANDARD_MODE_POSITION_HOLD](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_POSITION_HOLD) - PX4 [MC Position mode](../flight_modes_mc/position.md) (vehicle_status_s::NAVIGATION_STATE_POSCTL)
- [MAV_STANDARD_MODE_ALTITUDE_HOLD](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_ALTITUDE_HOLD) - PX4 [MC Altitude mode](../flight_modes_mc/altitude.md) (vehicle_status_s::NAVIGATION_STATE_ALTCTL)
- [MAV_STANDARD_MODE_ORBIT](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_ORBIT) - PX4 [FW Orbit mode](../flight_modes_mc/orbit.md) (vehicle_status_s::NAVIGATION_STATE_POSCTL)

FW vehicles also support the following standard modes:

- [MAV_STANDARD_MODE_CRUISE](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_CRUISE) - PX4 [FW Position mode](../flight_modes_fw/position.html) (vehicle_status_s::NAVIGATION_STATE_POSCTL)
- [MAV_STANDARD_MODE_ALTITUDE_HOLD](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_ALTITUDE_HOLD) - PX4 [FW Altitude mode](../flight_modes_fw/altitude.md) (vehicle_status_s::NAVIGATION_STATE_ALTCTL)
- [MAV_STANDARD_MODE_ORBIT](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_ORBIT) - PX4 [FW Hold mode](../flight_modes_fw/hold.md) (vehicle_status_s::NAVIGATION_STATE_AUTO_LOITER)

VTOL vehicles also support the following standard modes:

- [MAV_STANDARD_MODE_ALTITUDE_HOLD](https://mavlink.io/en/messages/common.html#MAV_STANDARD_MODE_ALTITUDE_HOLD) - PX4 [FW Altitude mode](../flight_modes_fw/altitude.md) (vehicle_status_s::NAVIGATION_STATE_ALTCTL)

  Note that VTOL vehicles could also support `MAV_STANDARD_MODE_CRUISE` (FW) or `MAV_STANDARD_MODE_POSITION_HOLD` (MC) and `MAV_STANDARD_MODE_ORBIT` in respective modes, but this has not been implemented.

When implementing a mapping to a standard mode, see [src/lib/modes/standard_modes.hpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/modes/standard_modes.hpp), and in particular the implementation of `getNavStateFromStandardMode()`.

<!--
- How are modes added to available modes - does a developer need to do anything particular when defining a new mode?
- How are their characteristics set?
- How do I notify when the set of modes changes? Do I need to do anything when I create a new mode?

- [PX4-Autopilot#24011: standard_modes: add vehicle-type specific standard modes](https://github.com/PX4/PX4-Autopilot/pull/24011)

-->

### Other Mode Mechanisms

<!--
Check these are supported
Add info about what mode they put the vehicle into.
-->

Some modes, both standard and custom, can also be set using specific commands and messages.
This can be more convenient that just starting the mode, in particular when the message allows additional settings to be configured.

The following are supported:

PX4 supports
[MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF)
MAV_CMD_NAV_RETURN_TO_LAUNCH - Put into return mode. Equivalent to ....
MAV_CMD_NAV_LAND
MAV_CMD_DO_FOLLOW_REPOSITION
MAV_CMD_DO_FOLLOW
MAV_CMD_DO_ORBIT - Orbit in MC mode only.
MAV_CMD_NAV_VTOL_TAKEOFF
MAV_CMD_DO_REPOSITION
MAV_CMD_DO_PAUSE_CONTINUE - Pauses a mission by putting the vehicle into Hold/Loiter
[MAV_CMD_MISSION_START](https://mavlink.io/en/messages/common.html#MAV_CMD_MISSION_START)