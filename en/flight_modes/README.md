# Flight Mode Selection

A flight mode defines how the system operates. It can either be flown by
the pilot or autopilot. In some flight modes, the autopilot and pilot
share different responsibilities (e.g. holding altitude is controlled by
the autopilot).

## MANUAL Modes

**Fixed wing aircraft:**

- **MANUAL**: The pilot has direct control (via the safety
  coprocessor) if the ACRO switch is unmapped or off. This is the only
  mode which overrides the FMU and it provides a safety mechanism
  which allows full control of throttle, elevator, ailerons and rudder
  via RC in the event of an FMU firmware malfunction.
- **STABILIZED (aka fly-by-wire)**: If the ACRO switch is ON, the
  pilot's inputs are passed as roll and pitch *angle* commands and
  direct rudder control. If Sticks are released the Aircraft will
  level out. Drift from Wind or other sources will not be compensated.
  This mode requires the FMU to be operating properly. Also note that
  the ACRO switch has essentially the opposite effect for multirotors.


**Multirotors:** 

Throttle Command is mapped direct to Motor Speed.

- **ACRO:** The pilot's inputs are passed as roll, pitch, and
  yaw *rate* commands to the autopilot. The Aircraft will not
  level out after Sticks return to Center. This allows maneuvers like Loops.
- **RATTITUDE** The pilot's inputs are passed as roll, pitch, and
  yaw *rate* commands to the autopilot at the extreme positions of
  the sticks. If not the inputs are passed as roll and
  pitch *angle* commands and a yaw *rate* command.
- **STABILIZED **The pilot's inputs are passed as roll and
  pitch *angle* commands and a yaw *rate *command. If Sticks are
  released the Aircraft will level out. Drift from Wind or other
  sources will not be compensated.


## ASSISTED Modes

- [ALTITUDE CONTROL](../flight_modes/altitude.md): More easily control vehicle altitude, and in particular reach and maintain a fixed altitude. The mode does not use GPS, and hence will not attempt to hold position/heading against wind.


- **POSITION CONTROL**
  - **Fixed wing aircraft:** Neutral inputs provide a level flight and
    will crab against the wind if needed to maintain a straight line.
  - **Multirotors** Roll controls left-right speed, pitch controls
    front-back speed. When roll and pitch are all centered (inside
    deadzone) the multirotor will hold position. Yaw controls yaw rate
    as in MANUAL mode. Throttle controls climb/descent rate as in ALTCTL
    mode. **WARNING**: Do not Land in POSCTL Mode, use Manual Mode to Land.


## AUTO Modes

- [HOLD](../flight_modes/hold.md): Holds at the current position (hovers for copter, circles for fixed-wing)
- [RETURN TO LAUNCH (RTL)](../flight_modes/rtl.md): Return to the home position and land (copter) or circle (fixed-wing).
- [TAKEOFF](../flight_modes/takeoff.md): Take off and wait for further input.
- [LAND](../flight_modes/land.md): Land at the location where the mode was engaged. 
- **MISSION**
  - **All system types:** All system types: The aircraft obeys the
    programmed mission sent by the ground control station (GCS). If
    no mission is received, aircraft will HOVER at current position
    instead.

## OFFBOARD

- **OFFBOARD** In this mode the position, velocity or attitude
  reference / target / setpoint is provided by a companion computer
  connected via serial cable and MAVLink. The offboard setpoint can be
  provided by APIs
  like [MAVROS](https://github.com/mavlink/mavros) or [Dronekit](http://dronekit.io/).

