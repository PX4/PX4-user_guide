# PX4-Autopilot Main Release Notes

<Badge type="danger" text="Alpha" />

This contains changes to PX4 `main` branch since the last major release ([PX v1.15](../releases/1.15.md)).

::: warning
The PX4 v1.15 release is in beta testing, pending release.
Update these notes with features that are going to be in `main` but not the PX4 v1.15 release.
:::

## Read Before Upgrading

TBD …

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
- [Gazebo]:
  - New vehicle model `x500_lidar` — [x500 Quadrotor with 2D Lidar](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar).
    ([PX4-Autopilot#22418](https://github.com/PX4/PX4-Autopilot/pull/22418), [PX4-gazebo-models#41](https://github.com/PX4/PX4-gazebo-models/pull/41)).
  - New vehicle model `r1_rover` — [Aion Robotics R1 Rover](../sim_gazebo_gz/vehicles.md#differential-rover) ([PX4-Autopilot#22402](https://github.com/PX4/PX4-Autopilot/pull/22402) and [PX4-gazebo-models#21](https://github.com/PX4/PX4-gazebo-models/pull/21)).
  - New vehicle model `rover_ackermann` — [Ackermann Rover](../sim_gazebo_gz/vehicles.md#ackermann-rover) ([PX4-Autopilot#23383](https://github.com/PX4/PX4-Autopilot/pull/23383) and [PX4-gazebo-models#46](https://github.com/PX4/PX4-gazebo-models/pull/46)).

### Ethernet

- TBD

### uXRCE-DDS / ROS2

- TBD

### MAVLink

- TBD

### Multi-Rotor

- TBD
- Added vehicle specific yaw behavior for orbit flight mode, which can be set via an [Parameter](../advanced_config/parameter_reference.md#MC_ORBIT_YAW_MOD) ([PX4-Autopilot#23358](https://github.com/PX4/PX4-Autopilot/pull/23358))

### VTOL

- TBD

### Fixed-wing

- Improvement: Fixed-wing auto takeoff: enable setting takeoff flaps for hand/catapult launch. [PX4-Autopilot#23460](https://github.com/PX4/PX4-Autopilot/pull/23460)

### Rover

This release contains a major rework for the rover support in PX4:

- Complete restructure of the [rover related documentation](../frames_rover/index.md).
- New firmware build specifically for [rovers](../frames_rover/index.md#flashing-the-rover-build) ([PX4-Autopilot#22675](https://github.com/PX4/PX4-Autopilot/pull/22675)).
- New module dedicated to [differential-steering rovers](../frames_rover/differential_rover.md) ([PX4-Autopilot#22402](https://github.com/PX4/PX4-Autopilot/pull/22402) and [PX4-Autopilot#23430](https://github.com/PX4/PX4-Autopilot/pull/23430))
  - The module currently supports [manual mode](../flight_modes_rover/index.md#manual-mode), [acro mode](../flight_modes_rover/index.md#acro-mode), [mission mode](../flight_modes_rover/index.md#mission-mode), [return mode](../flight_modes_rover/index.md#return-mode) and implements a [guidance state machine](../frames_rover/differential_rover.md#state-machine) to fully leverage the power of differential-steering.
- New module dedicated to [Ackermann rovers](../frames_rover/ackermann_rover.md)
  ([PX4-Autopilot#23024](https://github.com/PX4/PX4-Autopilot/pull/23024), [PX4-Autopilot#23310](https://github.com/PX4/PX4-Autopilot/pull/23383) and [PX4-Autopilot#23423](https://github.com/PX4/PX4-Autopilot/pull/23423)).
  - The module currently supports [manual mode](../flight_modes_rover/index.md#manual-mode), [mission mode](../flight_modes_rover/index.md#mission-mode), [return mode](../flight_modes_rover/index.md#return-mode) and adds a number of [Ackermann specific features](../frames_rover/ackermann_rover.md#tuning-advanced).
- Restructure of the [rover airframe](../airframes/airframe_reference.md#rover) numbering convention ([PX4-Autopilot#23506](https://github.com/PX4/PX4-Autopilot/pull/23506)).  
  This also introduces several [new rover airframes](../airframes/airframe_reference.md#rover):
  - Generic Differential Rover `50000`.
  - Generic Ackermann Rover `51000`.
  - Axial SCX10 2 Trail Honcho `51001`.
- Library for the [pure pursuit guidance algorithm](../flight_modes_rover/index.md#pure-pursuit-guidance-logic) that is shared among the rover modules ([PX4-Autopilot#23387](https://github.com/PX4/PX4-Autopilot/pull/23387) and [PX4-Autopilot#23438](https://github.com/PX4/PX4-Autopilot/pull/23438)).
- [Simulation](../frames_rover/index.md#simulation) for differential-steering and Ackermann rovers in gazebo (for release notes see `r1_rover` and `rover_ackermann` in [simulation](#simulation)).
- Deprecation of the [rover position control](../frames_rover/rover_position_control.md) module: Note that the legacy rover module still exists but has been superseded by the new dedicated modules.

### ROS 2

- TBD
