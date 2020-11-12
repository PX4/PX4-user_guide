# Gazebo 与 ROS 仿真

[ ROS](../ros/README.md)（机器人操作系统）可与 PX4 和[ Gazebo 模拟器](../simulation/gazebo.md)一起使用。 它使用[ MAVROS](../ros/mavros_installation.md) MAVLink 节点与 PX4 通信。

ROS/Gazebo 与 PX4 的集成遵循下图中的模式（这显示了* generic * [ PX4 simulation environment ](../simulation/README.md#sitl-simulation-environment)）。 PX4 与模拟器（例如 Gazebo）通信以从模拟世界接收传感器数据并发送电机和执行器值。 它与 GCS 和 Offboard API（例如 ROS）通信，以从模拟环境发送遥测数据并接收命令。

![PX4 SITL 概述](../../assets/simulation/px4_sitl_overview.png)

> **Note **与“正常行为”的唯一* slight *差异是 ROS 在端口 14557 上启动连接，而外部 API 更典型地侦听 UDP 端口上的连接 14540。


## 安装 ROS 和 Gazebo

> **Note ** * ROS *仅在 Linux（不是 macOS 或 Windows）上受支持。

在 Ubuntu Linux 上使用 ROS 设置 PX4 仿真的最简单方法是使用标准安装脚本，可以在[ Development Environment on Linux > Gazebo with ROS ](../setup/dev_env_linux.md#gazebo-with-ros)中找到。 该脚本安装了您需要的一切：PX4，ROS“Kinetic”，Gazebo 7 模拟器和[ MAVROS ](../ros/mavros_installation.md)。

> **Note** 该脚本遵循 [standard ROS "Kinetic" installation instructions](http://wiki.ros.org/kinetic/Installation/Ubuntu)，其中包括 Gazebo 7。


## 启动 ROS/Simulation

以下命令可用于启动仿真并通过[ MAVROS ](../ros/mavros_installation.md)将 ROS 连接到它，其中`fcu_url`是运行仿真的计算机的 IP /端口：

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@192.168.1.36:14557"
```

要连接到本地主机，请使用以下 URL：

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

> **Tip** 使用`-w`（警告）和/或`-v`（详细）调用* roslaunch *以获取有关设置中缺少依赖项的警告可能会很有用。 例如： 
> 
> ```sh
  roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```


## 用 ROS Wrappers 启动 Gazebo

可以对 Gazebo 模拟进行修改，以直接集成发布到 ROS 主题 （如 Gazebo ROS 激光插件）的传感器。 要支持此功能，必须使用适当的 ROS wrappers 启动 Gazebo。

有 ROS 启动脚本可用于运行包含在 ROS 中的模拟：

* [ posix_sitl.launch ](https://github.com/PX4/Firmware/blob/master/launch/posix_sitl.launch)：简单的 SITL 发布
* [ mavros_posix_sitl.launch ](https://github.com/PX4/Firmware/blob/master/launch/mavros_posix_sitl.launch)：SITL 和 MAVROS

要运行包含在 ROS 中的 SITL，需要更新 ROS 环境，然后像往常一样启动：

（可选）：如果您从源代码编译 MAVROS 或其他 ROS 包，则仅获取 catkin 工作区：

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

## 事件之后发生了什么

本节显示了之前提供的* roslaunch *指令实际上是如何工作的（您可以按照它们手动启动模拟和 ROS 系统）。

首先使用以下命令启动模拟器：

```sh
no_sim=1 make px4_sitl_default gazebo
```

控制台将如下所示：
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


INFO  LED::init
729 DevObj::init led
736 Added driver 0x2aba34001080 /dev/led0
INFO  LED::init
742 DevObj::init led
INFO  Not using /dev/ttyACM0 for radio control input. Assuming joystick input via MAVLink.
INFO  Waiting for initial data on UDP. Please start the flight simulator to proceed..
```

现在在新终端中确保您可以通过 Gazebo 菜单插入 Iris 模型，为此设置环境变量以包含相应的`sitl_gazebo`文件夹。

```sh
cd <Firmware_clone>
source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
```

现在就像使用 ROS 并插入 Iris 四轴飞行器模型一样启动 Gazebo。 一旦 Iris 被加载，它将自动连接到 Px4 应用程序。

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/sitl_gazebo/worlds/iris.world
```
