---
canonicalUrl: https://docs.px4.io/main/zh/simulation/ros_interface
---

# ROS with Gazebo Classic Simulation

[ROS](../ros/README.md) (Robot Operating System) can be used with PX4 and the [Gazebo Classic](../sim_gazebo_classic/README.md) simulator. 它使用[ MAVROS](../ros/mavros_installation.md) MAVLink 节点与 PX4 通信。

The ROS/Gazebo Classic integration with PX4 follows the pattern in the diagram below (this shows the *generic* [PX4 simulation environment](../simulation/README.md#sitl-simulation-environment)). PX4 communicates with the simulator (e.g. Gazebo Classic) to receive sensor data from the simulated world and send motor and actuator values. 它与 GCS 和 Offboard API（例如 ROS）通信，以从模拟环境发送遥测数据并接收命令。

![PX4 SITL 概述](../../assets/simulation/px4_sitl_overview.png)

在 Ubuntu Linux 上使用 ROS 设置 PX4 仿真的最简单方法是使用标准安装脚本，可以在[ Development Environment on Linux > Gazebo with ROS ](../setup/dev_env_linux.md#gazebo-with-ros)中找到。 该脚本安装了您需要的一切：PX4，ROS“Kinetic”，Gazebo 7 模拟器和[ MAVROS ](../ros/mavros_installation.md)。

## Installing ROS and Gazebo Classic

:::note
*ROS* is only supported on Linux (not macOS or Windows).
:::

The easiest way to setup PX4 simulation with ROS on Ubuntu Linux is to use the standard installation script that can be found at [Development Environment on Linux > Gazebo with ROS](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo). The script installs everything you need: PX4, ROS "Melodic", the Gazebo Classic 9 simulator, and [MAVROS](../ros/mavros_installation.md).

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
It can be useful to call *roslaunch* with the `-w NUM_WORKERS` (override number of worker threads) and/or `-v` (verbose) in order to get warnings about missing dependencies in your setup. For example:

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

## Launching Gazebo Classic with ROS Wrappers

The Gazebo Classic simulation can be modified to integrate sensors publishing directly to ROS topics e.g. the Gazebo Classic ROS laser plugin. To support this feature, Gazebo Classic must be launched with the appropriate ROS wrappers.

首先使用以下命令启动模拟器：

* [posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/launch/posix_sitl.launch): plain SITL launch
* [mavros_posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/launch/mavros_posix_sitl.launch): SITL and MAVROS

控制台将如下所示：

现在在新终端中确保您可以通过 Gazebo 菜单插入 Iris 模型，为此设置环境变量以包含相应的`sitl_gazebo`文件夹。

```sh
cd <PX4-Autopilot_clone>
DONT_RUN=1 make px4_sitl_default gazebo-classic
source ~/catkin_ws/devel/setup.bash    # (optional)
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
roslaunch px4 posix_sitl.launch
```

Include one of the above mentioned launch files in your own launch file to run your ROS application in the simulation.

## 事件之后发生了什么

This section shows how the *roslaunch* instructions provided previously actually work (you can follow them to manually launch the simulation and ROS).

You will need three terminals, in all of them the ros environment must be sourced.

First start the simulator using the command below:

```sh
cd <PX4-Autopilot_clone>
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
roslaunch px4 px4.launch
```

The console will look like this:

```sh
INFO  [px4] instance: 0

______  __   __    ___ 
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.

INFO  [px4] startup script: /bin/sh etc/init.d-posix/rcS 0
INFO  [init] found model autostart file as SYS_AUTOSTART=10016
INFO  [param] selected parameter default file parameters.bson
INFO  [param] importing from 'parameters.bson'
INFO  [parameters] BSON document size 295 bytes, decoded 295 bytes (INT32:12, FLOAT:3)
INFO  [param] selected parameter backup file parameters_backup.bson
INFO  [dataman] data manager file './dataman' size is 7866640 bytes
etc/init.d-posix/rcS: 31: [: Illegal number: 
INFO  [init] PX4_SIM_HOSTNAME: localhost
INFO  [simulator_mavlink] Waiting for simulator to accept connection on TCP port 4560
```

In the second terminal make sure you will be able to start gazebo with the world files defined in PX4-Autopilot. To do this set your environment variables to include the appropriate `sitl_gazebo-classic` folders.

```sh
cd <PX4-Autopilot_clone>
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
```

Now start Gazebo Classic like you would when working with ROS

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic/worlds/empty.world
```

In the third terminal make sure you will be able to spawn the model with the sdf files defined in PX4-Autopilot. To do this set your environment variables to include the appropriate `sitl_gazebo-classic` folders.

```sh
cd <PX4-Autopilot_clone>
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
```

Now insert the Iris quadcopter model like you would when working with ROS. Once the Iris is loaded it will automatically connect to the px4 app.

```sh
rosrun gazebo_ros spawn_model -sdf -file $(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic/models/iris/iris.sdf -model iris -x 0 -y 0 -z 0 -R 0 -P 0 -Y 0
```
