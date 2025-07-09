---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env
---

# 安装文件和代码

The *supported platforms* for PX4 development are:
- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md) (Recommended)
- [Linux](../dev_setup/dev_env_mac.md)
- [Windows (10/11)](../dev_setup/dev_env_windows_wsl.md)


## 支持的编译目标

下表显示了您可以在每个操作系统上构建何种 PX平台的固件编译。

| 平台                                                                                                                                  | Linux (Ubuntu) |   Mac   | Windows |
| ----------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **NuttX based hardware:** [Pixhawk Series](../flight_controller/pixhawk_series.md), [Crazyflie](../complete_vehicles/crazyflie2.md) |       X        |    X    |    X    |
| **Linux-based hardware:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                           |       X        |         |         |
| **Simulation:** [jMAVSim SITL](../simulation/jmavsim.md)                                                                            |       X        | &check; | &check; |
| **Simulation:** [Gazebo SITL](../sim_gazebo_gz/README.md)                                                                           |       X        |    X    |    X    |
| **Simulation:** [Gazebo Classic SITL](../sim_gazebo_classic/README.md)                                                              |       X        |    X    |    X    |
| **Simulation:** [ROS with Gazebo Classic](../simulation/ros_interface.md)                                                           |       X        |         |         |
| **Simulation:** ROS 2 with Gazebo                                                                                                   |       X        |         |         |

不同操作系统的开发环境的安装请参阅：

## 开发环境

如果你对 Docker 比较熟悉的话你也可以使用预先构建好的容器作为开发环境：[Docker 容器](../test_and_ci/docker.md)。
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html)
- Continue to [Building PX4 Software](../dev_setup/building_px4.md).
