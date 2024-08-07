# PX4-Autopilot Main Release Notes

<Badge type="danger" text="Alpha" />

This contains changes to PX4 `main` branch since the last major release ([PX v1.15](../releases/1.15.md)).

::: warning
The PX4 v1.15 release is in beta testing, pending release.
Update these notes with features that are going to be in `main` but not the PX4 v1.15 release.
:::

## Read Before Upgrading

TBD ...

Please continue reading for [upgrade instructions](#upgrade-guide).

## Major Changes

- TBD

## Upgrade Guide

## Other changes

### Hardware Support

- TBD

### Common

- [Battery level estimation improvements](../config/battery.md) ([PX4-Autopilot#23205](https://github.com/PX4/PX4-Autopilot/pull/23205)).
  - [Voltage-based estimation with load compensation](../config/battery.md#voltage-based-estimation-with-load-compensation) now uses a real-time estimate of the internal resistance of the battery to compensate voltage drops under load (with increased current), providing a better capacity estimate than with the raw measured voltage.
  - Thrust-based load compensation has been removed (along with the `BATn_V_LOAD_DROP` parameters, where `n` is the battery number).

### Control

- TBD

### Estimation

- TBD

### Sensors

- TBD

### Simulation

- [SIH]: The SIH on SITL [custom takeoff location](../sim_sih/index.md#set-custom-takeoff-location) in now set using the normal unscaled GPS position values, where previously the value needed to be multiplied by 1E7.
  ([PX4-Autopilot#23363](https://github.com/PX4/PX4-Autopilot/pull/23363)).
- [Gazebo]: New vehicle model `x500_lidar` — [x500 Quadrotor with 2D Lidar](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar).
  ([PX4-Autopilot#22418](https://github.com/PX4/PX4-Autopilot/pull/22418), [PX4-gazebo-models#41](https://github.com/PX4/PX4-gazebo-models/pull/41)).

### Ethernet

- TBD

### uXRCE-DDS / ROS2

- TBD

### MAVLink

- TBD

### Multi-Rotor

- TBD

### VTOL

- TBD

### Fixed-wing

- Improvement: Fixed-wing auto takeoff: enable setting takeoff flaps for hand/catapult launch. [PX4-Autopilot#23460](https://github.com/PX4/PX4-Autopilot/pull/23460)

### Rover

- [New module for ackermann rovers](../frames_rover/ackermann_rover_v2.md)
  ([PX4-Autopilot#23024](https://github.com/PX4/PX4-Autopilot/pull/23024), [PX4-Autopilot#23310](https://github.com/PX4/PX4-Autopilot/pull/23383) and [PX4-Autopilot#23310](https://github.com/PX4/PX4-Autopilot/pull/23383)).
  - This introduces a new module dedicated to ackermann rovers which is part of the USV overhaul (including differential rovers, boats, ... ).
  - The module currently supports [manual mode](../frames_rover/ackermann_rover_v2.md#manual-mode), [mission mode](../frames_rover/ackermann_rover_v2.md#mission-mode), [return mode](../frames_rover/ackermann_rover_v2.md#return-mode) and adds a number of [ackermann specific features](../frames_rover/ackermann_rover_v2.md#tuning-advanced).
  - Adds two new airframes:
    - Hardware: Generic Ackermann Rover ([50010](../airframes/airframe_reference.md#rover_rover_generic_ackermann_rover)).
    - SITL: Ackermann Rover (4012).
  - Note that the legacy Ackermann support is still present but has been superseded by this module.

### ROS 2

- TBD
