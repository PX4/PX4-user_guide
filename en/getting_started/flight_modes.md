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

Easy manual modes:

* Manual ([FW](#manual_fw))
* Stabilized ([FW](#stabilized_fw))
* Manual/Stabilized ([MC](#manual_stabilized_mc))
* Altitude ([MC](#altitude_mc) | [FW](#altitude_fw))
* Position ([MC](#position_mc) | [FW](#position_fw))

Acrobatic manual modes:

* Acro ([MC](#acro_mc) | [FW](#acro_fw))
* Rattitude ([MC](#rattitude_mc))

Autonomous modes:

* Hold ([MC](#hold_mc) | [FW](#hold_fw))
* Return ([MC](#return_mc) | [FW](#return_fw))
* Mission ([MC](#mission_mc) | [FW](#mission_fw))
* Takeoff ([MC](#takeoff_mc) | [FW](#takeoff_fw))
* Land ([MC](#land_mc) | [FW](#land_fw))
* Follow Me ([MC](#followme_mc))

## Key

The icons below are used within the document:

Icon | Description
--- | ---
<span id="key_manual">[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual) | Manual mode. Remote control required.
<span id="key_automatic">[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic) | Automatic mode.
<span id="key_position_fixed">[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed) | Position fix required (e.g. GPS, VIO, or some other positioning system.
<span id="key_difficulty">[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="30px" />&nbsp;<img src="../../assets/site/difficulty_6.svg" title="Difficulty (Hardest)" width="30px" />](../getting_started/flight_modes.md#key_difficulty) | Flight mode difficulty (Easy to Hard)



## Multicopter {#mc_flight_modes}

### Manual/Stabilized Mode {#manual_stabilized_mc}

[<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

The [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) mode stabilizes the multicopter when the RC control sticks are centred. To manually move/fly the vehicle you move the sticks outside of the centre.

> **Note** This multicopter mode is enabled if you set either *Manual* or *Stabilized* modes for an MC vehicle.

When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the centre deadzone. The multicopter will level out and stop once the roll and pitch sticks are centered. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately, and no external forces are applied (e.g. wind). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.

![MC Manual Flight](../../images/flight_modes/manual_stabilized_MC.png)


### Altitude Mode {#altitude_mc}

[<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

[Altitude Mode](../flight_modes/altitude.md) is the safest non GPS guided mode appropriate for beginners learning how to fly. 

In this mode the altitude is controlled by the PX4 autopilot. At 50% throttle the aircraft will hold its current altitude. If you want to descend just lower the throttle below center or if you need to climb push the throttle over the center. The further the throttle stick is from the center position the larger the climb or descent rate you will have. In Altitude Mode you have full angle control over Pitch, Roll and Yaw. Once you center all the sticks you will have a hovering aircraft at the current altitude. If the wind blows the aircraft will drift in the direction of the wind.

![MC Altitude Mode](../../images/flight_modes/altitude_MC.png)


### Position Mode {#position_mc}

[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

Position mode is the GPS guided mode. 

You can fly in Position Mode if you need precision in flight, keeping course or hovering at a certain spot in the air, but still maintaining the control of the aircraft with your RC. The altitude is controlled by the PX4 autopilot. At 50% throttle the aircraft will hold its current altitude. If you want to descend just lower the throttle below center or if you need to climb push the throttle over the center. The further the throttle stick is from the center position the larger the climb or descent rate you will have. Position Mode is almost like Altitude Mode with full angle control over Pitch, Roll and Yaw. But once you center all the sticks you will have a hovering aircraft at the current altitude and current GPS position. If the wind blows the aircraft will keep its direction of flight and course and will fight the wind.

![MC Position Mode](../../images/flight_modes/position_MC.png)


### Acro Mode {#acro_mc}

[<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;


For multicopters this is the 3D flying mode. You can make flips and acrobatics. In acrobatic mode you have fully direct rate control over your aircraft. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. In Acrobatic mode you have full rate control over the Roll, Pitch, Yaw and Throttle.

![MC Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_MC.png)

### Rattitude {#rattitude_mc}

[<img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

In simple terms it is the mix between Manual/Stabilized and Acro mode. When the Roll/Pitch stick is centered or if you move it up to halfway then the craft behaves like in Manual/Stabilized mode. If you move Roll/Pitch stick beyond halfway to full command the the multicopter behaves like in Acro mode. This way you could fly in the comfort of stabilized flight but still be able to perform flips and tricks with your multicopter.

<!-- image ? -->


### Hold Mode {#hold_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

You can use Hold in case of emergency or during a mission in order to Hold the aircraft at its current position autonomously and pause the flight, while you get time to assess the situation either emergency or mission related. When you activate Hold mode with a pre-programmed switch, the multicopter will fix itself to its current GPS position and altitude and hover there. During hold you are not able to control the craft with the RC. It is the first line of defense if you lose control over the aircraft and panic.

### Return Mode {#return_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The multicopter will return in a straight line at the current altitude (if higher than the home position + hovering altitude) or on the hovering altitude (if higher than the current altitude), then lands automatically.


### Mission Mode {#mission_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application. 

> **Tip** The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).


### Takeoff Mode {#takeoff_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

When **Take Off** is activated the multicopter automatically will give thrust to the motors such to take off then climb vertically to a preset take off altitude, stop the climb and hover at place waiting for pilot's command input.

### Land Mode {#land_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

When **Land** is activated the multicopter automatically lower the throttle such that to start slowly descending with preset vertical speed. When it touches the ground it will lower the throttle to minimum and disarm the craft.


#### Follow Me Mode {#followme_mc}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)




TBD


 
## Fixed-Wing {#fw_flight_modes}

### Stabilized Mode {#stabilized_fw}

[<img src="../../assets/site/difficulty_3.svg" title="Difficulty (Medium)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

In Stabilized flight your plane will maintain a level flight. It will fight against the wind gusts automatically and maintain a horizontal posture. You will have a full manual angle control over the craft. You will be able to glide with your airplane when you lower the Throttle to 0% and the motor stops. In order to perform a turn you have to hold the command throughout the maneuver because if you release the roll the plane will stop turning and level itself. It is the same for the Pitch and Yaw commands as well.

![FW Manual Flight](../../images/flight_modes/manual_stabilized_FW.png)


### Altitude Mode {#altitude_fw}

[<img src="../../assets/site/difficulty_2.svg" title="Difficulty (Easy)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

Altitude Mode is the safest non GPS guided mode appropriate for beginners learning how to fly. In this mode the altitude is controlled by the PX4 autopilot. The throttle will determine your airspeed, at 50% throttle the aircraft will hold its current altitude with a preset cruise air speed. You can descend and climb with pitch up and down command. In Altitude Mode you have full angle control over Pitch, Roll and Yaw. Once you center all the sticks you will have a level flying aircraft at the current altitude. If the wind blows the aircraft will drift in the direction of the wind.

![FW Altitude Mode](../../images/flight_modes/altitude_FW.png)
 

### Position Mode {#position_fw}

[<img src="../../assets/site/difficulty_1.svg" title="Difficulty (Easiest)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

This is the GPS guided mode. You can fly in Position Mode if you need precision in flight, keeping straight line course, and still maintaining the control of the aircraft with your RC. The altitude is controlled by the PX4 autopilot. The throttle will determine your airspeed, at 50% throttle the aircraft will hold its current altitude with a preset cruise speed. You can descend and climb with pitch up and down command. Position Mode is almost like Altitude Mode with full angle control over Pitch, Roll and Yaw. But Once you center all the sticks you will have a level flying aircraft at the current altitude and GPS guided straight line course. If the wind blows the aircraft will keep its direction of flight and course and will fight the wind.

![FW Position Mode](../../images/flight_modes/position_FW.png)

### Acro Mode {#acro_fw}

[<img src="../../assets/site/difficulty_5.svg" title="Difficulty (Hard)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

In acrobatic you fly like a plane without any stabilization electronics. You can make 360 rolls, flips, stalls and acrobatic figures. You have to remember that once you release Pitch and Roll to their center position the craft remains in its current state. You have to give back command in order to level it or change course and direction. The control is a Rate control over the Roll, Pitch, Yaw and Throttle.

![FW Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_FW.png)


### Manual Mode {#manual_fw}

[<img src="../../assets/site/difficulty_6.svg" title="Difficulty (Hardest)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;


User RC sticks input directly sent to the output mixer for manual control.

### Hold Mode {#hold_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

You can use Hold in case of emergency or during a mission in order to Hold the aircraft at its current position autonomously and pause the flight, while you get time to assess the situation either emergency or mission related. When you activate Hold mode with a pre-programmed switch the airplane will start circling around at fixed GPS position, holding its current altitude during the circles. During hold you are not able to control the craft with the RC. It is the first line of defense if you lose control over the aircraft.


### Return Mode {#return_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

Vehicle returns to the launch/home position.

The aircraft returns to the home position and hovers in a circle above the home position at a preset altitude.

### Mission Mode {#mission_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application. 

> **Tip** The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).


### Takeoff Mode {#takeoff_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;
 
There are a couple of options for automatic Take Off for airplanes. We could perform take off from runway, from launch pad or throw the plane from hand. Different aspects from the take off process can be preset in the Parameters section in the PX4 autopilot.

**Hand throwing** 

When **Take Off** is activated the autopilot will give thrust to the motor/s and the props will start spinning. Then we throw the airplane up and forward, it gives throttle and starts climbing to e preset take off altitude. Once the altitude is reached the airplane starts circling at the current altitude and wait for pilot's command input.

**Launch Pad take off**


**Runway take off**


### Land Mode {#land_fw}

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](../getting_started/flight_modes.md#key_automatic)&nbsp;

TBD


## Vertical Take Off and Landing (VTOL)

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. The multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution. 

Generally the flight modes for VTOL vehicles are the same as for [multicopter](#mc_flight_modes) when flying in MC mode and [fixed-wing](#fw_flight_modes) when flying in FW mode.

The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in the Auto modes.


## Further Information

* [Flying > Flight Modes](../flight_modes/README.md) - Detailed technical explanation of all modes
* [Basic Configuration > Flight Modes](../config/flight_mode.md) - How to map RC control switches to specific flight modes