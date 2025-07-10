---
canonicalUrl: https://docs.px4.io/main/zh/simulation/ros_interface
---

# Gazebo 与 ROS 仿真

[ ROS](../ros/README.md)（机器人操作系统）可与 PX4 和[ Gazebo 模拟器](../simulation/gazebo.md)一起使用。 它使用[ MAVROS](../ros/mavros_installation.md) MAVLink 节点与 PX4 通信。

ROS/Gazebo 与 PX4 的集成遵循下图中的模式（这显示了* generic * [ PX4 simulation environment ](../simulation/README.md#sitl-simulation-environment)）。 PX4 与模拟器（例如 Gazebo）通信以从模拟世界接收传感器数据并发送电机和执行器值。 它与 GCS 和 Offboard API（例如 ROS）通信，以从模拟环境发送遥测数据并接收命令。

![PX4 SITL 概述](../../assets/simulation/px4_sitl_overview.png)

在 Ubuntu Linux 上使用 ROS 设置 PX4 仿真的最简单方法是使用标准安装脚本，可以在[ Development Environment on Linux > Gazebo with ROS ](../setup/dev_env_linux.md#gazebo-with-ros)中找到。 该脚本安装了您需要的一切：PX4，ROS“Kinetic”，Gazebo 7 模拟器和[ MAVROS ](../ros/mavros_installation.md)。

## 安装 ROS 和 Gazebo

:::note
*ROS* is only supported on Linux (not macOS or Windows).
:::

The easiest way to setup PX4 simulation with ROS on Ubuntu Linux is to use the standard installation script that can be found at [Development Environment on Linux > Gazebo with ROS](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo). The script installs everything you need: PX4, ROS "Melodic", the Gazebo 9 simulator, and [MAVROS](../ros/mavros_installation.md).

可以对 Gazebo 模拟进行修改，以直接集成发布到 ROS 主题 （如 Gazebo ROS 激光插件）的传感器。 要支持此功能，必须使用适当的 ROS wrappers 启动 Gazebo。


## 启动 ROS/Simulation

有 ROS 启动脚本可用于运行包含在 ROS 中的模拟：

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@192.168.1.36:14557"
```

要运行包含在 ROS 中的 SITL，需要更新 ROS 环境，然后像往常一样启动：

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

:::note
It can be useful to call *roslaunch* with the `-w` (warn) and/or `-v` (verbose) in order to get warnings about missing dependencies in your setup. For example:
```sh
cd <Firmware_clone>
make px4_sitl_default gazebo
source ~/catkin_ws/devel/setup.bash    // (optional)
source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/sitl_gazebo
roslaunch px4 posix_sitl.launch
```
在您自己的启动文件中包含上述启动文件之一，以在模拟中运行 ROS 应用程序。

## 用 ROS Wrappers 启动 Gazebo

The Gazebo simulation can be modified to integrate sensors publishing directly to ROS topics e.g. the Gazebo ROS laser plugin. To support this feature, Gazebo must be launched with the appropriate ROS wrappers.

首先使用以下命令启动模拟器：

* [ posix_sitl.launch ](https://github.com/PX4/Firmware/blob/master/launch/posix_sitl.launch)：简单的 SITL 发布
* [ mavros_posix_sitl.launch ](https://github.com/PX4/Firmware/blob/master/launch/mavros_posix_sitl.launch)：SITL 和 MAVROS

控制台将如下所示：

现在在新终端中确保您可以通过 Gazebo 菜单插入 Iris 模型，为此设置环境变量以包含相应的`sitl_gazebo`文件夹。

```sh
no_sim=1 make px4_sitl_default gazebo
```

Include one of the above mentioned launch files in your own launch file to run your ROS application in the simulation.

## 事件之后发生了什么

This section shows how the *roslaunch* instructions provided previously actually work (you can follow them to manually launch the simulation and ROS).

First start the simulator using the command below:

```sh
no_sim=1 make px4_sitl_default gazebo
```

The console will look like this:
```sh
[init] shell id: 46979166467136
[init] task name: px4

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

Ready to fly.


INFO  LED::init
729 DevObj::init led
736 Added driver 0x2aba34001080 /dev/led0
INFO  LED::init
742 DevObj::init led
INFO  Not using /dev/ttyACM0 for radio control input. Assuming joystick input via MAVLink.
INFO  Waiting for initial data on UDP. Please start the flight simulator to proceed..
```

Now in a new terminal make sure you will be able to insert the Iris model through the Gazebo menus, to do this set your environment variables to include the appropriate `sitl_gazebo` folders.

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/sitl_gazebo/worlds/iris.world
```

Now start Gazebo like you would when working with ROS and insert the Iris quadcopter model. Once the Iris is loaded it will automatically connect to the px4 app.

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/sitl_gazebo/worlds/iris.world
```
