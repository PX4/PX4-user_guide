# Flight Modes

*Flight Modes* are used to control how the autopilot responds to user input and manages vehicle movement. They are loosely grouped based on the level/type of control provided by the autopilot.:

* [Manual flight modes](#manual-modes) are those where the user has control over vehicle movement via the RC control sticks (or joystick). Vehicle movement always follows stick movement, but the level/type of response changes depending on the mode. For example, experienced fliers can use modes that provide direct passthrough of stick positions to actuators, while beginners will often choose modes that are less responsive to sudden stick-position changes.
* [Assisted flight modes](#assisted-modes) are also user controlled but offer some level of "automatic" assistance - for example, automatically holding position/direction, against wind. Assisted modes often make it much easier to gain or restore controlled flight.
* [Auto flight modes](#auto-modes) are those where the controller requires little to no user input (e.g. to takeoff, land and fly missions).

The pilot transitions between flight modes using switches on the remote control or with a [ground control station](https://docs.qgroundcontrol.com/en/). Not all flight modes are available on all vehicle types, and some modes behave differently on different vehicle types (as described below). Finally, some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock, airspeed sensor, vehicle attitude sensing along an axis). The system will not allow transitions to those modes until the right conditions are met.

The sections below provide a high-level overview of the modes (more detail can be found in linked topics).


## Manual modes {#manual-modes}

"Manual" flight modes are those where the user has control over vehicle movement via the RC control sticks (or joystick). 

**Fixed wing aircraft:**

- **Manual**: The pilot has direct control (via the safety
  coprocessor) if the ACRO switch is unmapped or off. This is the only
  mode which overrides the FMU and it provides a safety mechanism
  which allows full control of throttle, elevator, ailerons and rudder
  via RC in the event of an FMU firmware malfunction.
- **Stabilized (aka fly-by-wire)**: If the ACRO switch is ON, the
  pilot's inputs are passed as roll and pitch *angle* commands and
  direct rudder control. If Sticks are released the Aircraft will
  level out. Drift from Wind or other sources will not be compensated.
  This mode requires the FMU to be operating properly. Also note that
  the ACRO switch has essentially the opposite effect for multirotors.


**Multirotors:** 

Throttle Command is mapped direct to Motor Speed.

- **Acro:** The pilot's inputs are passed as roll, pitch, and
  yaw *rate* commands to the autopilot. The Aircraft will not
  level out after Sticks return to Center. This allows maneuvers like Loops.
- **Rattitude** The pilot's inputs are passed as roll, pitch, and
  yaw *rate* commands to the autopilot at the extreme positions of
  the sticks. If not the inputs are passed as roll and
  pitch *angle* commands and a yaw *rate* command.
- **Stabilized** The pilot's inputs are passed as roll and
  pitch *angle* commands and a yaw *rate *command. If Sticks are
  released the Aircraft will level out. Drift from Wind or other
  sources will not be compensated.


## Assisted modes {#assisted-modes}

"Assisted" flight modes are also user controlled but offer some level of "automatic" assistance to gain or restore controlled flight.

- [Altitude](../flight_modes/altitude.md): More easily control vehicle altitude, and in particular reach and maintain a fixed altitude. The mode does not use GPS, and hence will not attempt to hold the x and y position/heading against wind.

- **Position**
  - **Fixed wing aircraft:** Neutral inputs (meaning when roll, pitch and yaw sticks are centered) provide a level flight and
    will crab against the wind if needed to maintain a straight line.
  - **Multirotors** Roll controls left-right speed, pitch controls
    front-back speed. When roll and pitch are all centered (inside
    deadzone) the multirotor will hold position. Yaw controls yaw rate
    as in MANUAL mode. Throttle controls climb/descent rate as in Altitude
    mode. 
    
  > **WARNING** Prior to Landing in *Position mode* be sure that landing is 
  > correctly detected. When first Landing in this mode, be ready to switch 
  > to *Stabilized mode* in order to be able to disarm. If landing is correctly 
  > detected, motors will spin down after touch down and then disarm shortly after. 
  > If the motors keep spinning at higher RPM or start spinning up, first switch 
  > to *Stabilized mode*, and then disarm. Be aware that the vehicle may tip over 
  > on the ground due to GPS drift. 


## Auto modes {#auto-modes}

"Auto" flight modes are those where the controller requires little to no user input (e.g. to takeoff, land and fly missions).

- [Hold](../flight_modes/hold.md): Holds at the current position (hovers for copter, circles for fixed-wing)
- [Return (RTL)](../flight_modes/rtl.md): Return to the home position and land (copter) or circle (fixed-wing).
- [Takeoff](../flight_modes/takeoff.md): Take off and wait for further input.
- [Land](../flight_modes/land.md): Land at the location where the mode was engaged. 
- [Mission](../flight_modes/mission.md): The vehicle follows a programmed mission, which is usually planned and uploaded using a ground control station (GCS).
- [Follow Me](../flight_modes/follow_me.md) (Multicopter-only): The vehicle autonomously follows a user with an Android phone/tablet running *QGroundControl*.
- [Offboard](../flight_modes/offboard.md): The vehicle obeys a position, velocity or attitude
  setpoint provided over MAVLink (often from a companion computer connected via serial cable). The setpoint can be
  provided by APIs like [DroneCore](http://dronecore.io/) or [MAVROS](https://github.com/mavlink/mavros).
