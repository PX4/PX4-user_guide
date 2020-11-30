# 安装文件和代码

可以在 [Linux](../setup/dev_env_linux.md) 或者 [Mac OS](../setup/dev_env_mac.md) 平台上进行 PX4 代码的开发。 我们建议使用 [Ubuntu Linux LTS edition](https://wiki.ubuntu.com/LTS) ，因为它支持编译 [所有 PX4 平台](#supported-targets) 的固件，且可以使用 [ROS](../ros/README.md) 和大部分的 [模拟器](../simulation/README.md) 。

## 支持的编译目标

下表显示了您可以在每个操作系统上构建何种 PX平台的固件编译。

| 平台                                                                                                                                                                                                                                                              | Linux (Ubuntu) | Mac | Windows |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:---:|:-------:|
| **基于 NuttX 的硬件：** [Pixhawk 系列](https://docs.px4.io/en/flight_controller/pixhawk_series.html), [Crazyflie](https://docs.px4.io/en/flight_controller/crazyflie2.html), [Intel® Aero Ready to Fly Drone](https://docs.px4.io/en/flight_controller/intel_aero.html) |       X        |  X  |    X    |
| [Qualcomm Snapdragon Flight hardware](../flight_controller/snapdragon_flight.md)                                                                                                                                                                                |       X        |     |         |
| **基于 Linux 的硬件：** [Raspberry Pi 2/3](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html), [Parrot Bebop](https://docs.px4.io/en/flight_controller/bebop.html)                                                                                    |       X        |     |         |
| **模拟器：** [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                                                                                               |       X        |  X  |    X    |
| **模拟器：** [Gazebo SITL](../simulation/gazebo.md)                                                                                                                                                                                                                 |       X        |  X  |         |
| **模拟器：** [ROS with Gazebo](../simulation/ros_interface.md)                                                                                                                                                                                                      |       X        |     |         |


## 开发环境

不同操作系统的开发环境的安装请参阅：

  * [Mac OS](../dev_setup/dev_env_mac.md)
  * [Linux](../dev_setup/dev_env_linux.md)
  * [Windows](../dev_setup/dev_env_windows.md)

如果你对 Docker 比较熟悉的话你也可以使用预先构建好的容器作为开发环境：[Docker 容器](../test_and_ci/docker.md)。
