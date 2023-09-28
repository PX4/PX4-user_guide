# Multicopter Flight Modes

## Manual/Easy Modes

### Position Mode

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes_mc/position.md) is an easy-to-fly RC mode in which roll and pitch sticks control _acceleration_ over ground in the vehicle's forward-back and left-right directions (similar to a car's accelerator pedal), and throttle controls speed of ascent-descent.
When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.

:::tip
Position mode is the safest manual mode for new fliers.
Unlike [Altitude](#altitude-mode-mc) and [Manual/Stabilized](#manual_stabilized_mc) modes the vehicle will stop when the sticks are centered rather than continuously drifting without constant manual guidance.
:::

![MC Position Mode](../../assets/flight_modes/position_MC.png)

### Altitude Mode

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" />](#altitude_only)

[Altitude mode](../flight_modes_mc/altitude.md) is a _relatively_ easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will level and maintain the current _altitude_.
If moving in the horizontal plane the vehicle will continue until any momentum is dissipated by wind resistance.
If the wind blows the aircraft will drift in the direction of the wind.

:::tip
_Altitude mode_ is the safest non-GPS manual mode for new fliers. It is just like [Manual/Stabilized](#manual_stabilized_mc) mode but additionally stabilizes the vehicle altitude when the sticks are released.
:::

![MC Altitude Mode](../../assets/flight_modes/altitude_MC.png)

### Manual/Stabilized Mode

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

The [Manual/Stabilized](../flight_modes_mc/manual_stabilized.md) mode stabilizes the multicopter when the RC control sticks are centered.
To manually move/fly the vehicle you move the sticks outside of the center.

:::note
This multicopter mode is enabled if you set either _Manual_ or _Stabilized_ modes for an MC vehicle.
:::

When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the center deadzone.
The multicopter will level out and stop once the roll and pitch sticks are centered.
The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately, and no external forces are applied (e.g. wind).
The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.

![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)

### Orbit Mode

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

The [Orbit mode](../flight_modes_mc/orbit.md) allows you to command a multicopter (or VTOL in multicopter mode) to fly in a circle, yawing so that it always faces towards the center.

A GCS is _required_ to enable the mode, and to set the center position and initial radius of the orbit.
By default the vehicle will then perform a slow ongoing orbit around the center position (1m/s) in a clockwise direction.
RC control is optional, and can be used to change the orbit altitude, radius, speed, and direction.

![Orbit Mode - MC](../../assets/flight_modes/orbit_MC.png)

## Manual Acrobatic Modes

<a id="acro_mc"></a>

### Acro Mode

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Acro mode](../flight_modes_mc/acro.md) is the RC mode for performing acrobatic maneuvers e.g. rolls and loops.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to control allocation.
When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![MC Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/PX4-user_guide/issues/182 -->

## Automatic Modes

### Hold Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Hold mode](../flight_modes/hold.md) causes the multicopter to stop and hover at its current position and altitude (maintaining position against wind and other forces).
The mode can be used to pause a mission or to help regain control of a vehicle in an emergency.
It can be activated with a pre-programmed RC switch or the _QGroundControl_ **Pause** button.

### Return Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Return mode](../flight_modes/return.md) causes the vehicle to fly a clear path to a safe location.
The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a [failsafe](../config/safety.md) being triggered).

The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined).
By default a mulitcopter will simply ascend to a safe height, fly to its home position, and then land.

### Mission Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller.
The mission is typically created and uploaded with a Ground Control Station (GCS) application.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/master/en/).
_QGroundControl_ is the same application we use for [configuring PX4](../config/README.md).
:::

### Takeoff Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Takeoff](../flight_modes/takeoff.md) mode causes the multicopter to climb vertically to takeoff altitude and hover in position.

### Land Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Land mode](../flight_modes/land.md) causes the multicopter to land at the location at which the mode was engaged.

### Follow Me Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Follow Me mode](../flight_modes_mc/follow_me.md) causes a multicopter to autonomously follow and track a user providing their current position setpoint.
Position setpoints might come from an Android phone/tablet running _QGroundControl_ or from a MAVSDK app.

### Offboard Mode

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Offboard mode](../flight_modes/offboard.md) causes the multicopter to obey a position, velocity or attitude setpoint provided over MAVLink.

:::note
This mode is intended for vehicle control from companion computers and ground stations!
:::
