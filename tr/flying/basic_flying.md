# Manual Flying

This topic explains the basics of flying a vehicle using an [RC Transmitter](../getting_started/rc_transmitter_receiver.md) in a manual or autopilot-assisted flight mode (for autonomous flight see: [Missions](../flying/missions.md)).

:::note
Before you fly for the first time you should read our [First Flight Guidelines](../flying/first_flight_guidelines.md). :::

<a id="arm"></a>

## Arm the Vehicle

Before you can fly the vehicle it must first be [armed](../getting_started/px4_basic_concepts.md#arming-and-disarming). This will power all motors and actuators; on a multicopter it will start propellers turning.

To arm the drone:
- First disengage the [safety switch](../getting_started/px4_basic_concepts.md#safety-switch).
- Use the arm command for your vehicle - put the throttle stick in the bottom right corner.
  - Alternatively configure an [arm/disarm switch](../config/safety.md#arm-disarm-switch).
  - You can also arm in *QGroundControl* (PX4 does not require a radio control for flying autonomously).

:::tip
The vehicle will not arm until it is [calibrated/configured](../config/README.md) and has a position lock. [Vehicle Status Notifications](../getting_started/vehicle_status.md) (including on-vehicle LEDs, audio notifications and *QGroundControl* updates) can tell you when the vehicle is ready to fly (and help you work out the cause when it is not ready to fly). :::

:::note
The vehicle will (by [default](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)) automatically [disarm](../advanced_config/prearm_arm_disarm.md#auto-disarming) (turn off motors) if you take too long to take off! This is a safety measure to ensure that vehicles return to a safe state when not in use. :::

:::note
A VTOL vehicle can only arm in multicopter mode (by default - arming in fixed-wing mode can be enabled using [CBRK_VTOLARMING](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)). :::

<a id="takeoff-and-landing"></a>

## Takeoff

### Multicopter takeoff

The easiest way to takeoff (after [arming the vehicle](#arm)) is to use the automatic [Takeoff mode (MC)](../flight_modes_mc/takeoff.md). Usually this is triggered from an [RC switch](../config/flight_mode.md) or ground station.

Multicopter (and VTOL in multicopter mode) pilots can also take off *manually* by enabling [Position mode (MC)](../flight_modes/README.md#position_mc), arming the vehicle, and then raising the throttle stick above 62.5%. Above this value all controllers are enabled and the vehicle goes to the throttle level required for hovering ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).

:::note
The vehicle may disarm if you take too long to take off after arming (tune the timeout using [COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)). :::

:::note
The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::

### Fixed-wing Takeoff

Automatic takeoff using [Takeoff mode (FW)](../flight_modes_fw/takeoff.md) is highly recommended for fixed-wing vehicles! You can either [hand-launch](../flight_modes_fw/takeoff.md#catapult-hand-launch) (default) or use [runway takeoff](../flight_modes_fw/takeoff.md#runway-takeoff) (if supported by hardware and configured).

For runway takeoff:

1. Place the vehicle facing the planned takeoff direction (ideally facing the wind)
1. Activate [Takeoff mode (FW)](../flight_modes_fw/takeoff.md)
1. [Arm the vehicle](#arm) using an [RC switch](../config/flight_mode.md) or ground station

   The vehicle will ramp up motors, and fly in the indicated direction, until it reaches the (parameter set) clearance height, then enter Hold mode.


For catapult/hand-launch:

1. Point the vehicle in the direction you want it to take off, in order to set the course (ideally facing the wind)
1. Activate [Takeoff mode (FW)](../flight_modes_fw/takeoff.md)
1. [Arm the vehicle](#arm) using an [RC switch](../config/flight_mode.md) or ground station
1. Throw/launch the vehicle in the direction you want it to take off.

   Motors will start after the launch is detected, after which the behaviour is the same as for runway takeoff.

For more information see [Takeoff mode (FW)](../flight_modes_fw/takeoff.md). Using a takeoff item defined in [a mission plan](../flight_modes/mission.md#fw-mission-takeoff) is also recommended.


## Landing

Landing a fixed-wing vehicle is not easy manually. The best way to land a fixed-wing vehicle is to use a [Fixed-Wing Mission Landing](../flight_modes/mission.md#fw-mission-landing). This landing is defined in a mission, and can be used in either [Mission](../flight_modes/mission.md) or [Return](../flight_modes/return.md) modes. The automatic [Land mode](../flight_modes_fw/land.md) mode is not recommended unless absolutely necessary, as it cannot account for underlying terrain.
<!-- Added this to make it more generic: We'll split this out later -->

The easiest way to land a multicopter or VTOL is to use the automatic [Land](../flight_modes_mc/land.md) or [Return](../flight_modes/return.md) modes. For multicopter (and VTOL in multicopter mode) pilots can also land manually in altitude or position mode by pressing the throttle stick down until the vehicle lands and disarms.

Note that vehicles automatically disarm on landing by default:

- Use [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) to set the time to auto-disarm after landing (or disable it altogether).
- Manually disarm by putting the throttle stick in the bottom left corner.

:::note
If you see the vehicle "twitch" during landing (turn down the motors, and then immediately turn them back up) this is probably caused by a poor [Land Detector Configuration](../advanced_config/land_detector.md) (specifically, a poorly set [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)). :::

:::tip
Automatic landing is highly recommended, in particular for Fixed-wing vehicles.
:::


## Flight Controls/Commands

All flying, including takeoff and landing, is controlled using the 4 basic commands: roll, yaw, pitch and throttle.

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

In order to control your aircraft you need to understand how the basic Roll, Pitch, Yaw and Throttle commands affect movement in 3D space. This differs depending on whether you're controlling a forward-flying aircraft like a plane, or a "hover aircraft" like a multicopter.

### Hover Aircraft

Hover aircraft (Copter, VTOL in hover mode) respond to the movement commands as shown below:

![Basic Movements Multicopter](../../assets/flying/basic_movements_multicopter.png)

- Pitch => Forward/back.
- Roll => Left/right.
- Yaw => Left/right rotation around the centre of the frame.
- Throttle => Changed altitude/speed.

### Forward-flying Aircraft

Forward-flying aircraft (planes, VTOL in forward flight) respond to the movement commands as shown below:

![Basic Movements Forward](../../assets/flying/basic_movements_forward.png)

- Pitch => Up/down.
- Roll => Left/right and a turn.
- Yaw => Left/right tail rotation and turn.
- Throttle => Changed forward speed.

:::note
The best turn for airplanes is called a coordinated turn, and is performed using roll and little yaw at the same time.
This maneuver requires experience!
:::

## Assisted Flight

Even with an understanding of how the vehicle is controlled, flight in fully manual mode can be quite unforgiving. New users should [configure their transmitter](../config/flight_mode.md) to use flight modes where the autopilot automatically compensates for erratic user input or environmental factors.

The following three modes are highly recommended for new users:

* Stabilized - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position)
* Altitude - Climb and drop are controlled to have a maximum rate.
* Position - When sticks are released the vehicle will stop (and hold position against wind drift)

:::note
You can also access automatic modes through the buttons on the bottom of the *QGroundControl* main flight screen. :::
