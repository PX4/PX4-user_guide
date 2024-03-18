# ROS 1 з MAVROS

:::tip
Команда розробників PX4 рекомендує перейти на [ROS 2](../ros/ros2.md) (тобто пропустити цей розділ)!
:::

[ROS](../ros/README.md) (Robot Operating System) це бібліотека загального призначення для робототехніки, яку можна використовувати для створення потужних додатків для дронів разом з PX4 Autopilot.

This section contains topics related to using the "original version of ROS" and the [MAVROS](../ros/mavros_installation.md) package to communicate with PX4 over [MAVLink](../middleware/mavlink.md) (MAVROS bridges ROS topics to MAVLink and PX4 conventions).

Основні охоплені тут теми:
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Налаштування середовища розробки PX4 з ROS 1 та MAVROS.
- [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md): Tutorial showing the main concepts related to writing a C++ MAVROS/ROS node.
- [ROS MAVROS Sending Custom Messages](../ros/mavros_custom_messages.md)
- [ROS з симулятором Gazebo Classic](../simulation/ros_interface.md)
- [Gazebo Classic OctoMap Models with ROS](../sim_gazebo_classic/octomap.md)
- [Встановлення ROS на RPI](../ros/raspberrypi_installation.md)
- [External Position Estimation (Vision/Motion based)](../ros/external_position_estimation.md)


## Інші ресурси

- [PX4 ROS Setups](../ros/README.md#ros-setups).
- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
- [Prometheus Autonomous Drone Project](https://github.com/amov-lab/Prometheus/blob/master/README_EN.md) - Prometheus is a ROS 1 based, BSD-3 licensed collection of autonomous drone software packages from [AMOVLab](https://github.com/amov-lab), which provides a full set of solutions for the intelligent and autonomous flight of drones, such as mapping, localization, planning, control, and target detection, fully integrated with the [Gazebo Classic](../sim_gazebo_classic/README.md) Simulator.
