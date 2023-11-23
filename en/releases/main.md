# PX4-Autopilot Main Release Notes

This contains changes to PX4 since the last major release (v1.14).

## Read Before Upgrading

TBD ...

## Major Changes

- TBD

## Upgrade Guide

## Other changes

### Hardware Support

- TBD

### Common

- TBD

### Control

- TBD

### Estimation

- TBD

### Sensors

- TBD

### Simulation

- [Gazebo] Support for [Advanced Plane](../sim_gazebo_gz/vehicles.md#advanced-plane), a simulated fixed-wing vehicle that provides better aerodynamic simulation than the regular plane.
  Added to PX4 in [PX4-Autopilot#22167](https://github.com/PX4/PX4-Autopilot/pull/22167) and [gz-sim#2185](https://github.com/gazebosim/gz-sim/pull/2185) (advanced lift drag plugin).

### uXRCE-DDS / ROS2

- [uXRCE-DDS] [DDS Topics YAML](../middleware/uxrce_dds.md#dds-topics-yaml) now allows the use of `subscription_multi` to specify that indicated ROS 2 topics are sent to a separate uORB topic instance reserved for ROS 2.
  This allows PX4 to differentiate between updates from ROS and those from PX4 uORB publishers.
  With this change ROS2 users can now decide if the messages that they are sending to PX4 will overlap with the existing uORB ones or be kept in separate instances.
  Added in PX4 in [PX4-Autopilot#22266](https://github.com/PX4/PX4-Autopilot/pull/22266).

### MAVLink

- TBD

### Multi-Rotor

- [Throw launch](../flight_modes_mc/throw_launch.md): Start a multicopter by throwing it into the air.
  Added to PX4 in [PX4-Autopilot#21170](https://github.com/PX4/PX4-Autopilot/pull/21170).

### VTOL

- TBD

### Fixed-wing

- TBD
