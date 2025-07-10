---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env
---

# 安装文件和代码

The *supported platforms* for PX4 development are:
- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md) (Recommended)
- [Linux](../dev_setup/dev_env_mac.md)
- [Windows](../dev_setup/dev_env_windows_cygwin.md)


## 支持的编译目标

下表显示了您可以在每个操作系统上构建何种 PX平台的固件编译。

| 平台                                                                                                                                                                                                                                                              | Linux (Ubuntu) |   Mac   | Windows |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **基于 NuttX 的硬件：** [Pixhawk 系列](https://docs.px4.io/en/flight_controller/pixhawk_series.html), [Crazyflie](https://docs.px4.io/en/flight_controller/crazyflie2.html), [Intel® Aero Ready to Fly Drone](https://docs.px4.io/en/flight_controller/intel_aero.html) |       X        |    X    |    X    |
| **Linux-based hardware:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                                                                                                                                                       |       X        |         |         |
| **基于 Linux 的硬件：** [Raspberry Pi 2/3](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html), [Parrot Bebop](https://docs.px4.io/en/flight_controller/bebop.html)                                                                                    |       X        | &check; | &check; |
| **模拟器：** [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                                                                                               |       X        |    X    |         |
| **模拟器：** [Gazebo SITL](../simulation/gazebo.md)                                                                                                                                                                                                                 |       X        |         |         |

不同操作系统的开发环境的安装请参阅：

## 开发环境

如果你对 Docker 比较熟悉的话你也可以使用预先构建好的容器作为开发环境：[Docker 容器](../test_and_ci/docker.md)。
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
- Continue to [Building PX4 Software](../dev_setup/building_px4.md).
