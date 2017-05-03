# Flying 101

This topic explains the basics of flying a vehicle using an [RC Transmitter](../getting_started/rc_transmitter_receiver.md) in a manual or autopilot-assisted flight mode (for autonomous flight see: [Missions](../flying/missions.md)).


> **Note** Before you fly for the first time you should read our [First Flight Guidelines](../flying/first_flight_guidelines.md).

## Flight Controls/Commands

All flying, including takeoff and landing, is controlled using the 4 basic commands: roll, yaw, pitch and throttle. 

![RC Basic Commands](../../images/rc_basic_commands.png)

In order to control your aircraft you need to understand how the basic Roll, Pitch, Yaw and Throttle commands affect movement in 3D space. This differs depending on whether you're controlling a forward-flying aircraft like a plane, or a "hover aircraft" like a multicopter.

### Hover aircraft

Hover aircraft (Copter, VTOL in hover mode) respond to the movement commands as shown below:

![Basic Movements Multicopter](../../images/basic_movements_multicopter.png)


- Pitch => Forward/Back.
- Roll => Left/right.
- Yaw => Left/right rotation around the centre of the frame.
- Throttle => Changed altitude/speed.

### Forward-flying aircraft

Forward-flying aircraft (planes, VTOL in forward flight) respond to the movement commands as shown below:

![Basic Movements Forward](../../images/basic_movements_forward.png)


- Pitch => Up/down.
- Roll => Left/right and a turn.
- Yaw => Left/right tail rotation and turn.
- Throttle => Changed forward speed.


> **Note** The best turn for airplanes is called a coordinated turn, 
  and is performed using roll and little yaw at the same time. 
  This maneuver requires experience!
  
  
## Assisted Flight

Even with an understanding of how the vehicle is controlled, flight in fully manual mode can be quite unforgiving. 
New users should [configure their transmitter](../config/flight_mode_configuration.md) to use flight modes where 
the autopilot automatically compensates for erratic user input or environmental factors.

The following three modes are highly recommended for new users:

* Stabilized - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position)
* Altitude - Climb and drop are controlled to have a maximum rate.
* Position - When sticks are released the vehicle will stop (and hold position against wind drift)

  
## Takeoff 

### Multicopter

> **Caution** Content required.

<!-- CONTENT BELOW TO BE INTEGRATED WHEN MODE DOCS DONE

Take off MC:
Once activated it spins and takes off at what altitude it weights for your commands?
How is it activated? Is it DJI style with the throttle or with a switch?


#### Manually
Go to position mode, arm, as soon as you raise your manual throttle stick above LNDMC_POS_UPTHR (default 65%) it enables all controllers and goes to hover throttle MPC_THR_HOVER (should be set reasonably to not have a jump). For landing just press the stick down until it is completely landed (goes through multiple steps) and disarm or best set COM_DISARM_LAND > 0 and it will diasrm automatically.

#### Automatically
Best to be in hold mode first, arm, switch to takeoff mode and it will fly up pretty fast to MIS_TAKEOFF_ALT and wait for further input. Switching out by moving the sticks is currently possible (but will be disabled by default as it looks now here: #7025). 

The automatic modes are easy to access through the QGC buttons on the bottom of the main flight screen. If you could improve the guide that would really help a lot.
-->

### Plane

> **Caution** Content required.

### VTOL

> **Caution** Content required.


## Landing

### Multicopter

> **Caution** Content required.

<!-- CONTENT BELOW TO BE INTEGRATED WHEN MODE DOCS DONE

#### Manual

For landing just press the stick down until it is completely landed (goes through multiple steps) and disarm or best set COM_DISARM_LAND > 0 and it will disarm automatically.

> **Tip** We recommend you set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) > 0 so that the vehicle will automatically disarm after landing.

#### Automatic

To Land again automatically you either switch to RTL or Land mode. Land mode just descends in place with MPC_LAND_SPEED (pretty slowly as we don't know whats under there) until it hits the ground and you can auto disarm again as above. In RTL it flies first up to RTL_RETURN_ALT, in a straight line back to the home position, descends first fast and then with the slow land speed because we know how high the ground should be.

The automatic modes are easy to access through the QGC buttons on the bottom of the main flight screen. If you could improve the guide that would really help a lot.


Landing MC:
How is it activated?
Does it disarm the moment it feels it is in the air? or should I disarm it with a command?

-->

### Plane

> **Caution** Content required.

### VTOL

> **Caution** Content required.

