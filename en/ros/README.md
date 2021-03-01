# Interfacing with PX4 using ROS

[ROS](http://www.ros.org/) (Robot Operating System) is a general purpose robotics library that can be used with the PX4 Autopilot for powerful applications. There are a couple of ways for ROS developers to interface with PX4, that will be mainly defined by your hardware and software architecture.

The PX4 Autopilot supports both ROS 1 and ROS 2, through its two main interfaces: [MAVLink](../middleware/mavlink.md) and [uORB](../middleware/uORB.md). While both interfaces have a solid foundation, they have different goals, and it will be up to the developer to choose which one best fits their application architecture.

The MAVLink interface only supports ROS 1 through the [MAVROS](../ros/mavros_installation.md) package, while the [uORB, microRTPS (Fast DDS)](../middleware/micrortps.md) interface has support for both, with native support for ROS 2, and supporting ROS 1 through the official ROS 1 bridge by Open Robotics.

:::tip
ROS is officially supported only on Linux platforms, with Ubuntu 20.04 LTS being the official supported distribution.
:::

# ROS 1 with MAVROS
MAVROS was the first and is the most well known interface to the PX4 Autopilot, bridging MAVLink directly to ROS nodes. The MAVROS package acts as a translation layer between MAVLink messages and ROS topics. The PX4 Developer Team plans to continue to support and maintain this interface.

## MAVROS Installation Instructions
You can follow the [MAVROS Installation Guide](../ros/mavros_installation.md)  to learn how to setup your development environment with all the requirement dependencies._

## MAVROS Offboard Example
We created a quick tutorial that explains how to achieve [Offboard control with MAVROS], this example is meant as a tutorial to explain the main concepts behind using MAVROS using C++.++ 

# ROS 2 with the microRTPS bridge (Fast DDS)
[ROS 2](https://index.ros.org/doc/ros2/) is the newest version of ROS, it’s an improved version that captures most of the learnings and features from ROS 1, the PX4 Developer team strongly suggests ROS 1 users to make the migration ROS 2. For new users we recommend starting with ROS 2.

## ROS through the microRTPS bridge
The [microRTPS interface (Fast DDS)](../middleware/micrortps.md) exposes the internal PX4 Autopilot Pub/Sub (uORB) messages directly to Fast DDS, allowing for real time communication between PX4 and ROS through the same middleware. This provides a direct bridge between PX4 Autopilot uORB messages and ROS 2 messages and types, effectively allowing direct access to PX4 Autopilot internals from ROS 2 workflows and nodes in realtime.

## Setting-up the ROS 2 microRTPS bridge
The bridge uses uORB message definitions and correspondent IDL types to generate code to serialize and deserialize the messages heading in and out of the PX4 Autopilot. For an in-depth guide on how to successfully setup the bridge follow the [PX4-ROS 2 bridge](../ros/ros2_comm.md) guide.

## Example usage of ROS 2 with the microRTPS bridge
The PX4 Development Team created a quick guide explaining the basics on how to achieve [ROS 2 Offboard Control](../ros/ros2_offboard_control.md) of the PX4 Autopilot. 

# ROS 1 with the microRTPS bridge (Fast DDS)
The microRTPS bridge supports ROS 1 through the official ROS 1 Bridge package ([ros1_bridge](https://github.com/ros2/ros1_bridge)) by Open Robotics, and is fully supported by our Fast DDS implementation.

:::tip
While ROS 1 is supported through the Fast-DDS bridge, we strongly recommend you upgrade to ROS 2.
:::

# ROS Support Roadmap
Unveiled at the [PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA) (and [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)), the PX4 Development team, announced the plans to support microROS.

* microRTPS, The current stable interface (microRTPS bridge with Fast DDS)
* micro XRCE-DDS, Next step! (DDS on the PX4 Autopilot)
* micro ROS, Our Target! (ROS 2 on the PX4 Autopilot)