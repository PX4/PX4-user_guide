# Flight Mode Selection

A flight mode defines how the system operates. It can either be flown by
the pilot or autopilot. In some flight modes, the autopilot and pilot
share different responsibilities (e.g. holding altitude is controlled by
the autopilot).

## MANUAL

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


## ALTITUDE CONTROL

- **Fixed wing aircraft:** When the roll, pitch and yaw inputs (RPY)
  are all centered, the aircraft will return to straight, level flight
  and keep its current altitude.
- **Multirotors:** Roll, pitch and yaw inputs are as in MANUAL mode.
  Throttle inputs indicate climb or sink at a predetermined maximum
  rate. Throttle has a large deadzone.


## POSITION CONTROL

- **Fixed wing aircraft:** Neutral inputs provide a level flight and
  will crab against the wind if needed to maintain a straight line.
- **Multirotors** Roll controls left-right speed, pitch controls
  front-back speed. When roll and pitch are all centered (inside
  deadzone) the multirotor will hold position. Yaw controls yaw rate
  as in MANUAL mode. Throttle controls climb/descent rate as in ALTCTL
  mode. **WARNING**: Do not Land in POSCTL Mode, use Manual Mode to
  Land.


## AUTO

- **HOLD**
  - **Fixed wing aircraft:** The aircraft hovers at the current
    position at the current altitude (or possibly slightly above the
    current altitude).
  - **Multirotors:** The multirotor hovers at the current position
    and altitude. If below specified minimal Altitude, the
    multirotor will first ascent to minimal Altitude.
- **RETURN TO LAUNCH (RTL)**
  - **Fixed wing aircraft:** The aircraft returns to the home
      position and hovers in a circle above the home position.
  - **Multirotors:** The multirotor returns in a straight line at
    the current altitude (if higher than the home position +
    hovering altitude) or on the hovering altitude (if higher than
    the current altitude), then lands automatically.
- **MISSION**
  - **All system types:** All system types: The aircraft obeys the
    programmed mission sent by the ground control station (GCS). If
    no mission is received, aircraft will HOVER at current position
    instead.
- **TAKEOFF**
  - **Fixed wing aircraft:** The aircraft takes off with maximum
    climb power into the current direction
  - **Multirotors:** The multi rotor takes off to the takeoff
    altitude (1.2m by default) and holds position
- **LAND**
  - **Fixed wing aircraft:** The aircraft turns and lands at the
    location it was when the mode was engaged. It tries to land at
    the home altitude and will spiral down if too high.
  - **Multirotors:** The multi rotor will land at the location it
    current is when engaged.

## OFFBOARD

- **OFFBOARD** In this mode the position, velocity or attitude
  reference / target / setpoint is provided by a companion computer
  connected via serial cable and MAVLink. The offboard setpoint can be
  provided by APIs
  like [MAVROS](https://github.com/mavlink/mavros) or [Dronekit](http://dronekit.io/).

