# Flight Modes (Multicopter)

Flight modes provide autopilot support to make it easier to manually fly the vehicle, to automate common tasks such as takeoff and landing, to execute autonomous missions, or to defer flight control to an external system.

This topic provides an overview of the available flight modes for multicopters and helicopters.

## Overview

Flight Modes are either _manual_ or _autonomous_.
Manual modes provide different levels of autopilot support when flying manually (using RC control sticks or a joystick), while _autonomous_ modes can be fully controlled by the autopilot.

Manual-Easy:

- [Position](#position-mode) — Easiest and safest manual mode for vehicles that have a position fix/GPS.
  Releasing sticks levels the vehicle, actively brakes it to a stop, and locks it to the current position (even against wind).
- [Position Slow](#position-slow-mode) — A velocity and yaw rate limited version of [Position mode](#position-mode).
  This is primarily used to temporarily limit speed when flying near obstacles, or when required by regulation.
- [Altitude](#altitude-mode) — Easiest and safest _non-GPS_ manual mode.
  Releasing sticks levels the vehicle and maintains altitude (but not horizontal position).
  The vehicle will continue to move with momentum and may also drift due to wind.
- [Manual/Stabilized](#manual-stabilized-mode) — Releasing the sticks levels and maintains the vehicle horizontal posture (but not altitude or position).
  The vehicle will continue to move with momentum, and both altitude and horizontal position may be affected by wind.

Manual-Acrobatic

- [Acro](#acro-mode) — Manual mode for performing acrobatic maneuvers, such as rolls and loops.
  Releasing the sticks stops the vehicle rotating in the roll, pitch, yaw axes, but does not otherwise stabilise the vehicle.

Autonomous:

- [Hold](#hold-mode) — Vehicle stops and hovers at its current position and altitude, maintaining its position against wind and other forces.
- [Return](#return-mode) — Vehicle ascends to a safe altitude, flies a clear path to a safe location (home or a rally point) and then lands.
  This requires a global position estimate (GPS).
- [Mission](#mission-mode) — Vehicle executes a [predefined mission/flight plan](../flying/missions.md) that has been uploaded to the flight controller.
  This requires a global position estimate (GPS).
- [Takeoff](#takeoff-mode) — Vehicle takes off vertically and then switches to [Hold mode](#hold-mode).
- [Land](#land-mode) — Vehicle lands immediately.
- [Orbit](#orbit-mode) - Vehicle flys in a circle, yawing so that it always faces towards the center.
  RC control can optionally be used to change the orbit radius, direction, speed and so on.
- [Follow Me](#follow-me-mode) — Vehicle follows a beacon that is providing position setpoints.
  RC control can optionally be used to set the follow position.
- [Offboard](#offboard-mode) — Vehicle obeys position, velocity, or attitude, setpoints provided via MAVLink or ROS 2.

Pilots transition between flight modes using switches on the remote control or with a ground control station (see [Flight Mode Configuration](../config/flight_mode.md)).
Some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock, airspeed sensor, vehicle attitude sensing along an axis).
PX4 will not allow transitions to those modes until the right conditions are met.

A high level description of the modes is provided below (select the mode-specific sidebar topics for detailed technical information).

## Easy Manual Modes

In the easy manual modes, the roll and pitch and yaw sticks control left-right and forward-back movement _in the horizontal plane_ (respectively).
The yaw stick contols rotation in the horizontal plane, while the throttle stick controls vertical movement.
Not only does this make movement predictable, but because angles are controlled, the vehicle is impossible to flip.

### Position Mode

[Position mode](../flight_modes_mc/position.md) is the easiest and safest manual mode.
It is supported on vehicles that have a position estimate (e.g. GPS).

The roll and pitch sticks control _acceleration_ over ground in the vehicle's forward-back and left-right directions (similar to a car's accelerator pedal), the yaw stick controls horizontal rotation, and the throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will actively brake, level, and be locked to a position in 3D space — compensating for wind and other forces.
This makes it easy to recover from any problems when flying.

:::tip
Unlike [Altitude](#altitude-mode) and [Manual/Stabilized](#manual-stabilized-mode) modes the vehicle will stop when the sticks are centered rather than continuously drifting without constant manual guidance.
:::

Roll, pitch and yaw are all angle-controlled (so it is impossible to roll over or loop the vehicle).

![MC Position Mode](../../assets/flight_modes/position_mc.png)

### Position Slow Mode

[Position Slow mode](../flight_modes_mc/position_slow.md) is a velocity and yaw rate limited version of the regular [Position mode](#position-mode).

The mode works in exactly the same way as _Position mode_ but with the controller stick deflection re-scaled to lower maximum velocities (and proportionally lower acceleration).
You can use it to quickly slow down the vehicle to a safe speed.
You can also use it to get more precision from stick input, in particular when flying close to obstacles, or to comply with regulations such as [EASA's low-speed mode/function](https://www.easa.europa.eu/en/light/topics/flying-drones-close-people).

### Altitude Mode

[Altitude mode](../flight_modes_mc/altitude.md) is the safest and easiest non-GPS manual mode.

:::note
_Altitude mode_ is similar to [Position mode](#position-mode) in that when the sticks are released, both modes stop, level the vehicle, and maintain altitude.
The difference is that position mode actively brakes to stop and holds position steady against wind, while in altitude mode the vehicle continues to travel with momentum, and when stopped may drift with wind and other forces.
:::

The roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), the yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

When the sticks are released/centered the vehicle will level and maintain the current _altitude_.
If moving in the horizontal plane the vehicle will continue until any momentum is dissipated by wind resistance.
If the wind blows the aircraft will drift in the direction of the wind.

![MC Altitude Mode](../../assets/flight_modes/altitude_mc.png)

### Manual/Stabilized Mode

[Manual/Stabilized](../flight_modes_mc/manual_stabilized.md) is a manual mode were centering the RC sticks levels the vehicle attitude (roll and pitch) and maintains the horizontal posture.
To manually move/fly the vehicle you move the sticks outside of the center.

:::note
The mode is enabled if you set either _Manual_ or _Stabilized_ modes for an MC vehicle.
:::

:::note
_Manual/Stabilized mode_ is similar to [Altitude mode](#altitude-mode) in that releasing the sticks levels the vehicle, but unlike altitude mode it does not maintain altitude or heading.
It is much easier to fly than [Acro mode](#acro-mode) because you can't roll or flip the vehicle, and if needed it is easy to level the vehicle.
:::

The roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the center deadzone.
The vehicle will level out and stop once the roll and pitch sticks are centered.
The vehicle will then hover in place/maintain altitude — provided it is properly balanced, throttle is set appropriately, and no external forces are applied (e.g. wind).
The vehicle will drift in the direction of any wind and you will have to control the throttle to hold altitude.

![MC Manual Flight](../../assets/flight_modes/stabilized_mc.png)

## Acrobatic Manual Modes

In acrobatic manual modes vehicles are more maneuverable and can flip.
They are much harder to fly than the easy modes.

RC sticks control the rate of angular rotation (around the respective axis).

### Acro Mode

[Acro mode](../flight_modes_mc/acro.md) is the RC mode for performing acrobatic maneuvers such as rolls and loops.

The roll, pitch, and yaw, sticks control the rate of angular rotation around the respective axes, and throttle is passed directly to control allocation.
When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![MC Manual Acrobatic Flight](../../assets/flight_modes/acrobatic_mc.png)

## Automatic Modes

Automatic or _autonomous_ modes are fully controlled by the autopilot.
They don't _require_ manual input from a pilot, but may optionally use it some cases.
Most automatic modes require a local position estimate.
A few, such as [Return mode](#return-mode) and [Mission mode](#mission-mode), need a global position estimate (i.e. GPS).

### Hold Mode

[Hold mode](../flight_modes_mc/hold.md) causes the vehicle to stop and hover at its current position and altitude, maintaining position against wind and other forces.

The mode can be used to pause a mission or to help regain control of a vehicle in an emergency.
It can be activated with a pre-programmed RC switch or the _QGroundControl_ **Pause** button.

### Return Mode

[Return mode](../flight_modes_mc/return.md) causes the vehicle to fly a clear path to a safe location.
The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a [failsafe](../config/safety.md) being triggered).

The return behaviour depends on parameter settings.
By default a mulitcopter will simply ascend to a safe height, fly to the closest rally point or its home position, and then land.

### Mission Mode

[Mission mode](../flight_modes_mc/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller.
The mission is typically created and uploaded with a Ground Control Station (GCS) application, such as [QGroundControl](https://docs.qgroundcontrol.com/master/en/).

### Takeoff Mode

[Takeoff mode](../flight_modes_mc/takeoff.md) mode causes the multicopter to climb vertically to takeoff altitude.
It will then switch to [Hold mode](#hold-mode) and hover in position.

### Land Mode

[Land mode](../flight_modes_mc/land.md) causes the multicopter to land at the location at which the mode was engaged.

### Orbit Mode

[Orbit mode](../flight_modes_mc/orbit.md) cause a multicopter to fly in a circle, yawing so that it always faces towards the center.

A GCS is _required_ to enable the mode, and to set the center position and initial radius of the orbit.
By default the vehicle will then perform a slow ongoing orbit around the center position (1m/s) in a clockwise direction.
RC control is optional, and can be used to change the orbit altitude, radius, speed, and direction.

![Orbit Mode - MC](../../assets/flight_modes/orbit_mc.png)

### Follow Me Mode

[Follow Me mode](../flight_modes_mc/follow_me.md) causes a multicopter to autonomously follow a beacon that is providing its position via MAVLink or ROS 2.
The height, distance, and bearing between the vehicle and beacon can (optionally) be set using a remote control.

_QGroundControl for Android_ and MAVSDK can both act as Follow-me beacons when running on devices that have GPS.

![Follow-me overview diagram](../../assets/flight_modes/followme_concept.png)

### Offboard Mode

[Offboard mode](../flight_modes/offboard.md) causes the multicopter to obey position, velocity, or attitude, setpoints provided over MAVLink.

:::note
This mode is intended for vehicle control from companion computers and ground stations!
:::

## Further Information

- [Basic Configuration > Flight Modes](../config/flight_mode.md) - How to map RC control switches to specific flight modes
- [Flight Modes (Multicopter)](../flight_modes_mc/README.md)
