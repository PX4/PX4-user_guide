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

- [uXRCE-DDS] [Topics selector](../middleware/uxrce_dds.md#dds-topics-yaml) supports multi-instance ROS2 subscribers.
  ROS2 users can now decide if the messages that they are sending to PX4 will overlap with the existing uORB ones or if the want to keep them in separate instances.
  Added in PX4 in [PX4-Autopilot#22266](https://github.com/PX4/PX4-Autopilot/pull/22266).

### MAVLink

- TBD

### Multi-Rotor

- TBD

### VTOL

- TBD

### Fixed-wing

- TBD
