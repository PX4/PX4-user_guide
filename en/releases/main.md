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

- [offboard] [ROS2 Offboard control](../flight_modes/offboard.md#ros-2-messages) allows for direct motors and servo control.
  Added in PX4 in [PX4-Autopilot#22222](https://github.com/PX4/PX4-Autopilot/pull/22222).

### Estimation

- TBD

### Sensors

- TBD

### Simulation

- [Gazebo] Support for [Advanced Plane](../sim_gazebo_gz/vehicles.md#advanced-plane), a simulated fixed-wing vehicle that provides better aerodynamic simulation than the regular plane.
  Added to PX4 in [PX4-Autopilot#22167](https://github.com/PX4/PX4-Autopilot/pull/22167) and [gz-sim#2185](https://github.com/gazebosim/gz-sim/pull/2185) (advanced lift drag plugin).
- [Gazebo] The environment variable `PX4_SIM_MODEL` can now be used to indicate the simulation model.
  This supersedes `PX4_GZ_MODEL`, which is now deprecated.
  Added to PX4 in [PX4-Autopilot#22400](https://github.com/PX4/PX4-Autopilot/pull/22400).
- [Gazebo] Separation of Gazebo and PX4 SITL.
  The two are now separated and can be launched in any order, independently, which was not possible beforehand.
  Gazebo retains all functionality it previously had, but now also supports drag-and-drop via the resource spawner in Gazebo GUI.
  Using Gazebo and PX4 on different hosts across a network has been facilitated.
  Added to PX4 in [PX4-Autopilot#22467](https://github.com/PX4/PX4-Autopilot/pull/22467).

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

### ROS 2

- [Experimental] [PX4 ROS 2 Interface Library](../ros2/px4_ros2_interface_lib.md): A new C++ library that simplifies controlling PX4 from ROS 2.
  Supports adding flight modes in ROS 2 that are peers of the PX4 modes running on the flight controller.
  Added to PX4 in [PX4-Autopilot#20707](https://github.com/PX4/PX4-Autopilot/pull/20707) (initial support).
