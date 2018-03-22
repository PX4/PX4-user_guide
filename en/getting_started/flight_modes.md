# PX4 Flight Modes Overview

> **Warning** This topic is under construction. It is not complete and has not been fully reviewed.

Flight modes are used to provide different types of autopilot control, enabling manual, assisted and fully autonomous flight.

Pilots can transition between flight modes using switches on the remote control or with a ground control station (see [Flight Mode Configuration](../config/flight_mode.md)).

This topic provides a very high level view of each of the flight modes, and the (mostly minor) differences in how they behave in multicopter (MC), fixed-wing (FW) and VTOL frames. For more detailed information see [Flight Modes](../flight_modes/README.md).

> **Tip** ![GPS](../../images/flight_modes/GPS_s.png) - This symbol is used to denote modes that *require* position information! These modes cannot be enabled without a position lock from GPS, VIO, or some other positioning system.

## Multicopter {#mc_flight_modes}

### Manual Modes

Manual modes are those where the user has control over vehicle movement via the RC control sticks (or joystick). Vehicle movement always follows stick movement, but the level/type of response changes depending on the mode. For example, experienced fliers can use modes that provide direct passthrough of stick positions to actuators, while beginners will often choose modes that are less responsive to sudden stick-position changes.

#### Manual/Stabilized Mode

In Stabilized flight your multicopter will hover in level flight once the Pitch and Roll sticks are at center position. You will have a full manual angle control over the multicopter. If your craft is perfectly set and balanced it will hold the altitude if throttle is at 50% in the middle of the scale at calm weather. If there is a wind blowing the craft will drift in the direction of the wind and you have to control the throttle all the time during wind gusts to hold altitude. In order to perform a maneuver, you have to hold your Pitch, Roll and Yaw command, otherwise the craft will level itself the moment you release the control sticks.

![MC Manual Flight](../../images/flight_modes/manual_stabilized_MC.png)

#### Acro Mode (Acrobatic)

For multicopters this is the 3D flying mode. You can make flips and acrobatics. In acrobatic mode you have fully direct rate control over your aircraft. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. In Acrobatic mode you have full rate control over the Roll, Pitch, Yaw and Throttle.

![MC Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_MC.png)

#### Rattitude

In simple terms it is the mix between Manual/Stabilized and Acro mode. When the Roll/Pitch stick is centered or if you move it up to halfway then the craft behaves like in Manual/Stabilized mode. If you move Roll/Pitch stick beyond halfway to full command the the multicopter behaves like in Acro mode. This way you could fly in the comfort of stabilized flight but still be able to perform flips and tricks with your multicopter.
 

### Assisted Modes

Assisted modes are with more assistance to the pilot from the autopilot. Assisted modes need manual pilot input for the roll/pitch/yaw but automatically control the thrust to hold a fixed altitude at centered throttle stick. Vertical speed is controlled by manual input from the pilot to throttle stick but in a rate of descend and ascend fashion. The horizontal speed is controlled by the pitch/roll stick input.

#### Altitude Mode

[Altitude Mode](../flight_modes/altitude.md) is the safest non GPS guided mode appropriate for beginners learning how to fly. 

In this mode the altitude is controlled by the PX4 autopilot. At 50% throttle the aircraft will hold its current altitude. If you want to descend just lower the throttle below center or if you need to climb push the throttle over the center. The further the throttle stick is from the center position the larger the climb or descent rate you will have. In Altitude Mode you have full angle control over Pitch, Roll and Yaw. Once you center all the sticks you will have a hovering aircraft at the current altitude. If the wind blows the aircraft will drift in the direction of the wind.

![MC Altitude Mode](../../images/flight_modes/altitude_MC.png)

#### Position Mode

![GPS](../../images/flight_modes/GPS_s.png) Position mode is the GPS guided mode. 

You can fly in Position Mode if you need precision in flight, keeping course or hovering at a certain spot in the air, but still maintaining the control of the aircraft with your RC. The altitude is controlled by the PX4 autopilot. At 50% throttle the aircraft will hold its current altitude. If you want to descend just lower the throttle below center or if you need to climb push the throttle over the center. The further the throttle stick is from the center position the larger the climb or descent rate you will have. Position Mode is almost like Altitude Mode with full angle control over Pitch, Roll and Yaw. But once you center all the sticks you will have a hovering aircraft at the current altitude and current GPS position. If the wind blows the aircraft will keep its direction of flight and course and will fight the wind.

![MC Position Mode](../../images/flight_modes/position_MC.png)
 
 
### Autonomous Modes

Autonomous or Auto modes do not require any input from the pilot.
 
#### Hold Mode (Auto Hold)

You can use Hold in case of emergency or during a mission in order to Hold the aircraft at its current position autonomously and pause the flight, while you get time to assess the situation either emergency or mission related. When you activate Hold mode with a pre-programmed switch, the multicopter will fix itself to its current GPS position and altitude and hover there. During hold you are not able to control the craft with the RC. It is the first line of defense if you lose control over the aircraft and panic.

#### Return Mode (Return to Launch/Home - RTL)

![GPS](../../images/flight_modes/GPS_s.png)

The multicopter will return in a straight line at the current altitude (if higher than the home position + hovering altitude) or on the hovering altitude (if higher than the current altitude), then lands automatically.


#### Mission Mode

![GPS](../../images/flight_modes/GPS_s.png)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application. 

> **Tip** The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).


#### Takeoff Mode

![GPS](../../images/flight_modes/GPS_s.png)

When **Take Off** is activated the multicopter automatically will give thrust to the motors such to take off then climb vertically to a preset take off altitude, stop the climb and hover at place waiting for pilot's command input.

#### Land Mode

![GPS](../../images/flight_modes/GPS_s.png)

When **Land** is activated the multicopter automatically lower the throttle such that to start slowly descending with preset vertical speed. When it touches the ground it will lower the throttle to minimum and disarm the craft.
 
 
## Fixed-Wing {#fw_flight_modes}

### Manual Modes

Manual modes are with the least assistance from the PX4 or even without assistance to the pilot. 

#### Stabilized Mode

In Stabilized flight your plane will maintain a level flight. It will fight against the wind gusts automatically and maintain a horizontal posture. You will have a full manual angle control over the craft. You will be able to glide with your airplane when you lower the Throttle to 0% and the motor stops. In order to perform a turn you have to hold the command throughout the maneuver because if you release the roll the plane will stop turning and level itself. It is the same for the Pitch and Yaw commands as well.

![FW Manual Flight](../../images/flight_modes/manual_stabilized_FW.png)


#### Acro Mode (Acrobatic)

In acrobatic you fly like a plane without any stabilization electronics. You can make 360 rolls, flips, stalls and acrobatic figures. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. The control is a Rate control over the Roll, Pitch, Yaw and Throttle.

![FW Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_FW.png)
 
 
### Assisted Modes

Assisted modes are with more assistance to the pilot from the autopilot. Assisted modes need manual pilot input for the roll/pitch/yaw but automatically control the thrust to sustain the desired speed at fixed altitude. With manual input from the pilot to the throttle stick he controls the speed of the airplane and with manual input to the pitch stick he controls the altitude.

#### Altitude Mode

Altitude Mode is the safest non GPS guided mode appropriate for beginners learning how to fly. In this mode the altitude is controlled by the PX4 autopilot. The throttle will determine your airspeed, at 50% throttle the aircraft will hold its current altitude with a preset cruise air speed. You can descend and climb with pitch up and down command. In Altitude Mode you have full angle control over Pitch, Roll and Yaw. Once you center all the sticks you will have a level flying aircraft at the current altitude. If the wind blows the aircraft will drift in the direction of the wind.

![FW Altitude Mode](../../images/flight_modes/altitude_FW.png)
 

#### Position Mode

![GPS](../../images/flight_modes/GPS_s.png)

This is the GPS guided mode. You can fly in Position Mode if you need precision in flight, keeping straight line course, and still maintaining the control of the aircraft with your RC. The altitude is controlled by the PX4 autopilot. The throttle will determine your airspeed, at 50% throttle the aircraft will hold its current altitude with a preset cruise speed. You can descend and climb with pitch up and down command. Position Mode is almost like Altitude Mode with full angle control over Pitch, Roll and Yaw. But Once you center all the sticks you will have a level flying aircraft at the current altitude and GPS guided straight line course. If the wind blows the aircraft will keep its direction of flight and course and will fight the wind.

![FW Position Mode](../../images/flight_modes/position_FW.png)
 
 
### Autonomous Modes

Autonomous or Auto modes do not require any input from the pilot.

#### Hold Mode (Auto Hold)

You can use Hold in case of emergency or during a mission in order to Hold the aircraft at its current position autonomously and pause the flight, while you get time to assess the situation either emergency or mission related. When you activate Hold mode with a pre-programmed switch the airplane will start circling around at fixed GPS position, holding its current altitude during the circles. During hold you are not able to control the craft with the RC. It is the first line of defense if you lose control over the aircraft.


#### Return Mode

![GPS](../../images/flight_modes/GPS_s.png)  Vehicle returns to the launch/home position.

The aircraft returns to the home position and hovers in a circle above the home position at a preset altitude.

#### Mission Mode

![GPS](../../images/flight_modes/GPS_s.png)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application. 

> **Tip** The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).


#### Takeoff Mode
 
There are a couple of options for automatic Take Off for airplanes. We could perform take off from runway, from launch pad or throw the plane from hand. Different aspects from the take off process can be preset in the Parameters section in the PX4 autopilot.

**Hand throwing** 

When **Take Off** is activated the autopilot will give thrust to the motor/s and the props will start spinning. Then we throw the airplane up and forward, it gives throttle and starts climbing to e preset take off altitude. Once the altitude is reached the airplane starts circling at the current altitude and wait for pilot's command input.

**Launch Pad take off**


**Runway take off**


#### Land Mode

TBD


## Vertical Take Off and Landing (VTOL)

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. The multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution. 

Generally the flight modes for VTOL vehicles are the same as for [multicopter](#mc_flight_modes) when flying in MC mode and [fixed-wing](#fw_flight_modes) when flying in FW mode.

The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in the Auto modes.
