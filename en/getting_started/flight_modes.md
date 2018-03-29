# PX4 Flight Modes Overview

> **Warning** This topic is under construction. It is not complete and has not been fully reviewed.

Flight modes enable different [levels](#categories) and types of autopilot control. They define how the autopilot responds to remote control input, and how it manages vehicle movement during fully autonomous flight.

Not all flight modes are available on all vehicle types, and some modes behave differently on different vehicle types. 

This topic provides an overview of the available the flight modes, and the (mostly minor) differences in their default behaviour in multicopter (MC), fixed-wing (FW) and VTOL frames.


## Switching Between Modes

Pilots can transition between flight modes using switches on the remote control or with a ground control station (see [Flight Mode Configuration](../config/flight_mode.md)).

Some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock, airspeed sensor, vehicle attitude sensing along an axis). PX4 will not allow transitions to those modes until the right conditions are met.


## Types of Modes {#categories}

Flight Modes are either *manual* or *autonomous*. Manual modes are those where the user has control over vehicle movement via the RC control sticks (or joystick), while *autonomous* modes are fully controlled by the autopilot, and require no pilot/remote control input.

> **Tip** Some manual modes may have autopilot-assisted mechanisms to make it easier to gain or restore controlled flight. For example, most modes will level out the vehicle when the RC sticks are centered.

Manual modes may further be divided into "easy" and "acrobatic" modes. In the easy modes, roll and pitch sticks set the vehicle angle, resulting in left-right and forward-back movement *in the horizontal plane* (respectively). Not only does this make movement predictable, but because angles are controlled, the vehicle is impossible to flip. In acrobatic modes RC sticks control the rate of angular rotation (around the respective axis). Vehicles can flip, and while more maneuverable, are harder to fly.

Fixed Wing:

* Manual-Easy: [Position](#position_fw), [Altitude](#altitude_fw), [Stabilized](#stabilized_fw), [Manual](#manual_fw)
* Manual-Acrobatic: [Acro](#acro_fw)
* Autonomous: [Hold](#hold_fw), [Return](#return_fw), [Mission](#mission_fw), [Takeoff](#takeoff_fw), [Land](#land_fw)

Multicopter: 
* Manual-Easy: [Position](#position_mc), [Altitude](#altitude_mc), [Manual/Stabilized](#manual_stabilized_mc)
* Manual-Acrobatic: [Rattitude](#rattitude_mc), [Acro](#acro_mc)
* Autonomous: [Hold](#hold_mc), [Return](#return_mc), [Mission](#mission_mc), [Takeoff](#takeoff_mc), [Land](#land_mc), [Follow Me](#followme_mc), [Offboard](#offboard_mc)


## Key

The icons below are used within the document:

Icon | Description
--- | ---
<span id="key_manual">[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual) | Manual mode. Remote control required.
<span id="key_automatic">[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic) | Automatic mode. RC control is disabled by default except to change modes.
<span id="key_position_fixed">[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed) | Position fix required (e.g. GPS, VIO, or some other positioning system).
<span id="key_difficulty">[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_6.svg" title="Difficulty (Hardest)" width="30px" />](#key_difficulty) | Flight mode difficulty (Easy to Hard)



## Multicopter {#mc_flight_modes}

### Position Mode {#position_mc}

[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes/position_mc.md) is an easy-to-fly RC mode in which roll and pitch sticks control speed over ground in the left-right and forward-back directions (relative to the "front" of the vehicle), and throttle controls speed of ascent-descent. When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.

> **Tip** Position mode is the safest manual mode for new fliers. Unlike [Altitude](#altitude_mc) and [Manual/Stabilized](#manual_stabilized_mc) modes the vehicle will stop when the sticks are centered rather than continuing until slowed by wind resistance. 

![MC Position Mode](../../images/flight_modes/position_MC.png)


### Altitude Mode {#altitude_mc}

[<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Altitude mode](../flight_modes/altitude_mc.md) is a *relatively* easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will level and maintain the current *altitude*. If moving in the horizontal plane the vehicle will continue until any momentum is dissipated by wind resistance. If the wind blows the aircraft will drift in the direction of the wind.

> **Tip** *Attitude mode* is the safest non-GPS manual mode for new fliers. It is just like [Manual/Stabilized](#manual_stabilized_mc) mode but additionally stabilizes the vehicle altitude when the sticks are released.

![MC Altitude Mode](../../images/flight_modes/altitude_MC.png)


### Manual/Stabilized Mode {#manual_stabilized_mc}

[<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

The [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) mode stabilizes the multicopter when the RC control sticks are centred. To manually move/fly the vehicle you move the sticks outside of the centre.

> **Note** This multicopter mode is enabled if you set either *Manual* or *Stabilized* modes for an MC vehicle.

When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the centre deadzone. The multicopter will level out and stop once the roll and pitch sticks are centered. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately, and no external forces are applied (e.g. wind). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.

![MC Manual Flight](../../images/flight_modes/manual_stabilized_MC.png)


### Rattitude {#rattitude_mc}

[<img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

In simple terms it is the mix between Manual/Stabilized and Acro mode. When the Roll/Pitch stick is centered or if you move it up to halfway then the craft behaves like in Manual/Stabilized mode. If you move Roll/Pitch stick beyond halfway to full command the the multicopter behaves like in Acro mode. This way you could fly in the comfort of stabilized flight but still be able to perform flips and tricks with your multicopter.

<!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->


### Acro Mode {#acro_mc}

[<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;


For multicopters this is the 3D flying mode. You can make flips and acrobatics. In acrobatic mode you have fully direct rate control over your aircraft. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. In Acrobatic mode you have full rate control over the Roll, Pitch, Yaw and Throttle.

![MC Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->


### Hold Mode {#hold_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Hold mode](../flight_modes/hold.md) causes the multicopter to stop and hover at its current position and altitude (maintaining position against wind and other forces). The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the *QGroundControl* **Pause** button.


### Return Mode {#return_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Return mode](../flight_modes/return.md) causes the vehicle to return (at a safe height) to its home position and land. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a failsafe being triggered).


### Mission Mode {#mission_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application. 

> **Tip** The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).


### Takeoff Mode {#takeoff_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Takeoff](../flight_modes/takeoff.md) mode causes the multicopter to climb vertically to takeoff altitude and hover in position.


### Land Mode {#land_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Land mode](../flight_modes/land.md) causes the multicopter to land at the location at which the mode was engaged.


### Follow Me Mode {#followme_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Follow Me mode](../flight_modes/follow_me.md) causes a multicopter to autonomously follow and track a user providing their current position setpoint. Position setpoints might come from an Android phone/tablet running *QGroundControl* or from a Dronecode SDK app.

### Offboard Mode {#offboard_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Offboard mode](../flight_modes/offboard.md) causes the multicopter to obey a position, velocity or attitude setpoint provided over MAVLink. 

> **Note** This mode is intended for companion computers and ground stations!

 
## Fixed-Wing {#fw_flight_modes}

### Position Mode {#position_fw}

[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes/position_fw.md) is an easy-to-fly RC mode in which, when the sticks are released/centered, the vehicle will level and fly a straight line ground track in the current direction — compensating for wind and other forces. 

The throttle determines airspeed (at 50% throttle the aircraft will hold its current altitude with a preset cruise speed). Pitch is used to ascend/descend. Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).

> **Tip** Position mode is the safest fixed-wing manual mode for new fliers.

![FW Position Mode](../../images/flight_modes/position_FW.png)


### Altitude Mode {#altitude_fw}

[<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Altitude mode](../flight_modes/altitude_fw.md) makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. The mode will not attempt to hold the vehicle course against wind.

The climb/descent rate is controlled via the pitch/elevator stick. Once centered the autopilot latches onto the current altitude and will maintain it during yaw/roll, and at any airspeed. The throttle input controls airspeed.  Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).

When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight (subject to wind) and keep its current altitude.

> **Tip** *Altitude mode* is the safest non GPS guided mode appropriate for beginners learning how to fly. It is just like [Manual](#manual_fw) mode but additionally stabilizes the vehicle altitude when the pitch stick is released.

![FW Altitude Mode](../../images/flight_modes/altitude_FW.png)


### Stabilized Mode {#stabilized_fw}

[<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Stabilized mode](../flight_modes/stabilized_fw.md) mode puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

The vehicle climb/descends based on pitch input and performs a coordinated turn if the roll/pitch sticks are non-zero. Roll and pitch are angle controlled (you can't roll upside down or loop).

> **Tip** *Stabilized mode* is much easier to fly than [Manual mode](#manual_fw) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.

The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).

![FW Manual Flight](../../images/flight_modes/manual_stabilized_FW.png)


### Acro Mode {#acro_fw}

[<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

In acrobatic you fly like a plane without any stabilization electronics. You can make 360 rolls, flips, stalls and acrobatic figures. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. The control is a Rate control over the Roll, Pitch, Yaw and Throttle.

![FW Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_FW.png)


### Manual Mode {#manual_fw}

[<img src="../../assets/site/difficulty_6.svg" title="Difficulty (Hardest)" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

User RC sticks input directly sent to the output mixer for manual control.

### Hold Mode {#hold_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Hold](../flight_modes/hold.md) causes a fixed-wing vehicle to start circling around the current position at its current altitude. The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the *QGroundControl* **Pause** button.


### Return Mode {#return_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Return mode](../flight_modes/return.md) causes the vehicle to fly back to its home position (at a safe height) and circle over it. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a failsafe being triggered).

### Mission Mode {#mission_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application. 

> **Tip** The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).


### Takeoff Mode {#takeoff_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;

[Takeoff](../flight_modes/takeoff.md#fixed_wing) mode initiates the vehicle takeoff sequence. The specific launch behaviour depends on the configured takeoff mode (catapult/hand-launch mode or runway takeoff mode).


### Land Mode {#land_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;

[Land mode](../flight_modes/land.md) causes the vehicle to turn and land at the location at which the mode was engaged. Fixed wing landing logic and parameters are explained in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).


## Vertical Take Off and Landing (VTOL)

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. The multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution. 

Generally the flight modes for VTOL vehicles are the same as for [multicopter](#mc_flight_modes) when flying in MC mode and [fixed-wing](#fw_flight_modes) when flying in FW mode.

The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in the Auto modes.


## Further Information

* [Flying > Flight Modes](../flight_modes/README.md) - Detailed technical explanation of all modes
* [Basic Configuration > Flight Modes](../config/flight_mode.md) - How to map RC control switches to specific flight modes