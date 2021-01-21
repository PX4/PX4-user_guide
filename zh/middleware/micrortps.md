# RTPS/ROS2 接口：PX4-FastRTPS桥接

*PX4-fastRTPS 桥接* 在 PX4 中添加了一个实时发布订阅 (RTPS) 接口, 从而能够在PX4组件和 (offboard) *Fast RTPS* 应用程序 (包括使用 ROS2/ROS 框架构建的应用程序) 之间进行 [uORB 消息](../middleware/uorb.md) 交换。

RTPS 已被采用为 ROS2 (机器人操作系统) 的中间件。 *Fast RTPS桥接 * 使我们能够更好地与 ROS2 集成, 从而轻松共享传感器值、命令和其他车辆信息。 *Fast RTPS* is a very lightweight cross-platform implementation of the latest version of the RTPS protocol and a minimum DDS API.
:::

本主题介绍RTPS桥接体系结构 (以及如何在 ROS2/ROS 应用程序管道中使用它)。 还演示了如何编译所需的代码, 以便:

当您需要在飞行控制器和offboard部件之间可靠地共享时间敏感/实时信息时, 应使用RTPS。 特别是, 在off-board软件需要 (通过发送和接收 uORB主题) 成为 px4 中运行的软件组件的 *伙伴* 的情况下，它非常有用。
1. 编写一个简单的 *Fast rtps * 应用程序来订阅PX4消息
1. 在PX4上连接ROS2节点 (通过RTPS桥接, 并使用 `px4_ros_com` 包)
1. 如果要在PX4上连接ROS (ROS "1代")，需要额外使用 `ros1_bridge` 包在ROS2和ROS之间做桥接。


## 什么时候应该使用 RTPS？

RTPS should be used when you need to reliably share time-critical/real-time information between the flight controller and off board components. In particular it is useful in cases where off-board software needs to become a *peer* of software components running in PX4 (by sending and receiving uORB topics).

RTPS 桥接在 PX4 和 RTPS 应用程序之间交换消息, 在每个系统使用的 [uORB](../middleware/uorb.md) 和 RTPS 消息之间无缝转换。

:::note
*Fast RTPS* is not intended as a replacement for MAVLink. MAVLink remains the most appropriate protocol for communicating with ground stations, gimbals, cameras, and other offboard components (although *Fast RTPS* may open other opportunities for working with some peripherals).
:::

:::tip RTPS
can be used over slower links (e.g. radio telemetry), but care should be taken not to overload the channel.
:::

## 架构概述

### RTPS 桥接

The RTPS bridge exchanges messages between PX4 and RTPS applications, seamlessly converting between the [uORB](../middleware/uorb.md) and RTPS messages used by each system.

![Architecture with ROS2](../../assets/middleware/micrortps/architecture.png)

将 ROS 应用程序与 PX4 集成的体系结构如下所示。

- *Client* 是在飞行控制器上运行的 PX4 中间件守护进程。 它订阅由其他 PX4 组件发布的 uORB 主题, 并将更新发送给 *Agent* (通过 UART 或 UDP 端口)。 它还接收来自 *Agent* 的消息, 转换为 PX4 上的 uORB 消息并重新发布。
- *Agent* 在Offboard计算机上作为守护进程运行。 它监视来自 *Client* 的 uORB 消息更新, 并通过RTPS (重新) 发布这些消息。 它还订阅来自其他 RTPS 应用程序的 "uORB" RTPS 消息, 并直接转发给 *Client*。
- *Agent* 和 *Client* 通过串行链路 (UART) 或 UDP 网络进行连接。 uORB 信息事先经过了 [CDR 序列化 ](https://en.wikipedia.org/wiki/Common_Data_Representation) 处理 (*CDR 序列化 * 提供了一种在不同平台之间交换串行数据的通用格式)。
- *Agent* 和任何 *Fast RTPS* 应用程序之间都是通过 UDP 连接的, 二者可以运行在同一设备上，也可以运行在不同设备上。 在一种典型的配置中, 它们运行于同一系统 (例如, 开发计算机、Linux 配套计算机或计算机板) 上, 通过 Wifi或 USB 连接到 *Client*。


### ROS2/ROS 应用处理流程

The application pipeline for ROS2 is very straightforward! Because ROS2 uses DDS/RTPS as its native communications middleware, you can create a ROS2 listener or advertiser node to publish and subscribe to uORB data on PX4, via the *PX4 Fast RTPS Bridge*. This is shown below.

请注意 [ros1_bridge](https://github.com/ros2/ros1_bridge)的使用, 它在 ROS2 和 ROS 之间进行消息桥接。 因为 ROS 一代不支持 RTPS，所以只能这样做。
:::

![Architecture with ROS2](../../assets/middleware/micrortps/architecture_ros2.png)

The architecture for integrating ROS applications with PX4 is shown below.

![Architecture with ROS](../../assets/middleware/micrortps/architecture_ros.png)

Note the use of [ros1_bridge](https://github.com/ros2/ros1_bridge), which bridges messages between ROS2 and ROS. This is needed because the first version of ROS does not support RTPS.


## 代码生成

:::note
[Fast RTPS 1.8.2 and FastRTPSGen 1.0.4 or later must be installed](../dev_setup/fast-rtps-installation.md) in order to generate the required code!
:::

### 独立于 ROS 的应用程序

All the code needed to create, build and use the bridge is automatically generated when PX4-Autopilot is compiled.

生成的桥接代码将允许通过 RTPS 发布/订阅部分 uORB 主题。 这对于 ROS 或非 ROS 应用程序都是适用的。

为了 *自动生成代码*，在 PX4 **Firmware/msg/tools/** 目录下有一个 *yaml* 定义文件 —— **uorb_rtps_message_ids.yaml**。 该文件定义了 RTPS 可以使用的 uORB 消息子集，以及是用于发送、用于接收还是双向皆可，以及用于 DDS/RTPS 中间件的 RTPS ID。
:::

<a id="px4_ros_com"></a>

### ROS2/ROS 应用

The [px4_ros_com](https://github.com/PX4/px4_ros_com) package, when built, generates everything needed to access PX4 uORB messages from a ROS2 node (for ROS you also need [ros1_bridge](https://github.com/ros2/ros1_bridge)). This includes all the required components of the *PX4 RTPS bridge*, including the `micrortps_agent` and the IDL files (required by the `micrortps_agent`).

要构建 NuttX/Pixhawk 飞行控制器的固件, 请选择带有 `_rtps` 的配置文件。 例如，要为 px4_fmu-v4 构建 RTPS：

如果要构建 SITL 固件:
- 一个支持 ROS2 的 `master` 分支。 该分支的代码可以生成在 PX4 和 ROS2 之间桥接必需的所有 ROS2 消息和 IDL 文件。
- 一个支持 ROS 一代的 `ros1` 分支。 该分支的代码可以生成 ROS 消息的头文件和源文件，这些文件与 `ros1_bridge` *一起* 使用，达到在PX4与ROS之间共享数据的目的。

Both branches in `px4_ros_com` additionally include some example listener and advertiser example nodes.


## 支持的 uORB 消息

The generated bridge code will enable a specified subset of uORB topics to be published/subscribed via RTPS. This is true for both ROS or non-ROS applications.

编译PX4固件时，相关的*Agent*代码会自动被 *生成*。 生成的源代码在这个目录下: **build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent/**.

:::note
An RTPS ID must be set for all messages.
:::

```yaml
rtps:
  - msg: actuator_armed
    id: 0
  - msg: actuator_control
    id: 1
  - ...
  rtps:
  - msg: actuator_armed
    id: 0
  - msg: actuator_control
    id: 1
  - ...
  - msg: airspeed
    id: 5
    send: true
  - msg: battery_status
    id: 6
    send: true
  - msg: camera_capture
    id: 7
  - msg: camera_trigger
    id: 8
    receive: true
  - ...
  - msg: sensor_baro
    id: 63
    receive: true
    send: true
  - msg: sensor_baro
    id: 63
    receive: true
    send: true
```

:::note
An API change in ROS2 Dashing means that we now use the `rosidl_generate_interfaces()` CMake module (in `px4_msgs`) to generate the IDL files that we require for microRTPS agent generation (in `px4_ros_com`). PX4-Autopilot includes a template for the IDL file generation, which is only used during the PX4 build process.

The `px4_msgs` build generates *slightly different* IDL files for use with ROS2/ROS (than are built for PX4 firmware). The **uorb_rtps_message_ids.yaml** is transformed in a way that the message names become *PascalCased* (the name change is irrelevant to the client-agent communication, but is critical for ROS2, since the message naming must follow the PascalCase convention). The new IDL files also reverse the messages that are sent and received (required because if a message is sent from the client side, then it's received on the agent side, and vice-versa).
:::

<a id="client_firmware"></a>

## 客户端 (PX4固件)

为了构建 *Agent* 应用, 运行如下编译命令:

构建 `px4_ros_com` 将自动生成并编译代理端应用。 也可以使用 [`colcon`](http://design.ros2.org/articles/build_tool.html) 构建工具, 效果与上相同。
```sh
make px4_fmu-v4_rtps
```

要在一台 Ubuntu 18.04 机器上安装 ROS Melodic 和 ROS2 Bouncy, 分别参考如下链接:
```sh
make px4_sitl_rtps
```

The *Client* application can be launched from [NuttShell/System Console](../debug/system_console.md). The command syntax is shown below (you can specify a variable number of arguments):

```sh
> micrortps_client start|stop [options]
  -t &lt;transport&gt;          [UART|UDP] 缺省为 UART
  -d &lt;device&gt;             UART 设备. 缺省为 /dev/ttyACM0
  -u &lt;update_time_ms&gt;     订阅的 uORB 消息的刷新时间，单位ms。 缺省为 0
  -l &lt;loops&gt;              该程序将循环执行多少次。 Default /dev/ttyACM0
  -l <loops>              How many iterations will this program have. -1 表示无限循环， 缺省为 -1。 缺省为 -1。
  -w &lt;sleep_time_us&gt;      每次循环的休眠时间，单位us。 缺省为 1ms
  -b &lt;baudrate&gt;           UART 设备波特率 缺省为 460800
  -p &lt;poll_ms&gt;            UART设备轮询时间，单位ms， 缺省为 1ms
  -r &lt;reception port&gt;     UDP接收端口号， -r &lt;reception port&gt;     UDP 接收端口， 缺省为 2019。 -s &lt;sending port&gt;       UDP发送端口， 缺省为 2020。 Default 2020
  -i <ip_address>         Select IP address (remote) values: <x.x.x.x>. Default: 127.0.0.1
```

由于 ROS2 和 ROS 环境变量的配置不同，你需要为每个 ROS 版本分配独立的工作空间。 下面是一个例子：
:::

`px4_ros_com/scripts` 目录下有几个脚本可以用来构建这两个工作空间。

```sh
micrortps_client start -t UDP
```

## 与 ROS 无关的 Offboard Fast RTPS 接口中的代理端

`build_all.bash` 这个脚本可以一次性编译两个工作空间。 使用命令 `source build_all.bash --help` 查看脚本的用法。

以下步骤将详述怎样 *手动* 构建这些程序包 (只是为了加深您的理解):

```sh
cd build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent
mkdir build && cd build
cmake ..
make
make
```

:::note
To cross-compile for the *Qualcomm Snapdragon Flight* platform see [this link](https://github.com/eProsima/PX4-FastRTPS-PoC-Snapdragon-UDP#how-to-use).
:::

The command syntax for the *Agent* is listed below:

```sh
$ ./micrortps_agent [options]
  -t &lt;transport&gt;          [UART|UDP] 缺省为UART.
  -d &lt;device&gt;             UART设备， 缺省为 /dev/ttyACM0。
  -d &lt;device&gt;             UART设备， 缺省为 /dev/ttyACM0。
  -w &lt;sleep_time_us&gt;      每次循环的休眠时间，单位us。 默认 1ms。
  -b &lt;baudrate&gt;           UART设备波特率。 默认 460800。
  -p &lt;poll_ms&gt;            UART设备轮询时间，单位ms， 缺省为 1ms。 缺省为 1ms。
  -r &lt;reception port&gt;     UDP 接收端口， 缺省为 2019。
  -s &lt;sending port&gt;       UDP发送端口， 缺省为 2020。
```

To launch the *Agent*, run `micrortps_agent` with appropriate options for specifying the connection to the *Client* (the default options connect from a Linux device to the *Client* over a UART port).

一旦 *Client* (在飞行控制器上) 和 *Agent* (在一台 offboard 计算机上) 同时运行并且成功互联, *Fast RTPS* 应用就可以通过 RTPS 发布或订阅PX4 上的 uORB 消息。

```sh
./micrortps_agent -t UDP
```

## 面向 ROS2 中间件的代理端接口

下面这个例子演示了怎样创建一个订阅了 `sensor_combined` 主题并打印 (来自PX4) 的消息更新的 *Fast RTPS* "监听" 应用。 一个已连接的 RTPS 应用可以在与 *Agent* 同一网段的任何计算机上运行。 在这个例子中 *Agent* and *监听应用* 在同一台计算机上运行。


## 构建 `px4_ros_com` 程序包

*fastrtpsgen* 脚本可以从 IDL 消息文件创建一个简单的 RTPS 应用。

:::note
Only the master branch is needed for ROS2 (both are needed to target ROS).
:::

### 分别安装 ROS 和 ROS2

这段代码创建了一个基本的订阅器和广播器，和一个运行它们的主程序。 要打印来自 `sensor_combined` 主题的数据, 修改 **sensor_combined_Subscriber.cxx** 文件中的 `onNewDataMessage()` 方法。

要在Linux上构建并运行该应用：
1. [安装 ROS Melodic](http://wiki.ros.org/melodic/Installation/Ubuntu)
1. [安装 ROS2 Bouncy](https://index.ros.org/doc/ros2/Installation/Dashing/Linux-Install-Debians/)
1. 要正常地生成 IDL 文件还要安装以下组件 (仅 ROS2 Bouncy 发行版需要):

   ```sh
   sudo apt install python3-colcon-common-extensions
   ```

1. *setuptools*也必须被安装 (使用 *pip* 或 *apt*工具):

   ```sh
   sudo apt install ros-bouncy-rmw-opensplice-cpp
   ```

1. 安装过程应该会自动安装 *colcon* 构建工具，万一没有，也可手动安装:

   ```sh
   sudo pip3 install -U setuptools
   ```

   :::caution Do not install the `ros1_bridge` package through the deb repository. The package must be built from source.
:::

### 配置工作空间

Since the ROS2 and ROS require different environments you will need a separate workspace for each ROS version. As an example:

1. 对于 ROS2, 如下创建工作空间:
   ```sh
   mkdir -p ~/px4_ros_com_ros2/src
   ```

   然后，把 ROS2 (`master`) 分支克隆到 `/src` 目录:
   ```sh
   $ git clone https://github.com/PX4/px4_ros_com.git ~/px4_ros_com_ros2/src/px4_ros_com # 克隆 master 分支
   ```

1. 对于 ROS, 遵循同样的流程, 但是要另建一个目录并克隆另一个分支:
   ```sh
   mkdir -p ~/px4_ros_com_ros1/src
   ```

   然后，克隆 ROS2 (`ros1`) 分支到 `/src` 目录:
   ```sh
   $ git clone https://github.com/PX4/px4_ros_com.git ~/px4_ros_com_ros1/src/px4_ros_com -b ros1 # 克隆 'ros1' 分支
   ```

### 构建工作空间

如果 `px4_ros_com` 已经构建成功, 你可以利用生成的 *micro-RTPS* 代理程序和自动生成的ROS2消息源文件和头文件，这些文件与 uORB 消息是一一对应的。

To build both workspaces with a single script, use the `build_all.bash`. Check the usage with `source build_all.bash --help`. The most common way of using it is by passing the ROS(1) workspace directory path and also the PX4-Autopilot directory path:

```sh
$ source build_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws>
```

上面两行代码将与ROS2中间件交互的 C++ 库包含进来。 同时还包含了我们要用到的消息头文件。

:::note
The build process will open new tabs on the console, corresponding to different stages of the build process that need to have different environment configurations sourced.
:::

One can also use the following individual scripts in order to build the individual parts:

- `build_ros1_bridge.bash` 可以构建 `ros1_bridge`;
- `build_ros2_workspace.bash` (只构建 `px4_ros_com` 的 `ros1` 分支) 可以构建 `px4_ros_com` `ros1` 分支所在的 ROS1 工作空间;
- `build_ros2_workspace.bash` 可以构建 `px4_ros_com` `master` 分支所在的工作空间;

上面这段代码创建了 `sensor_combined_topic` 主题的订阅，可以匹配到一个或多个该消息的 ROS 广播者上。

1. `cd` 到 `px4_ros_com_ros2` 目录并 source 一下 ROS2 的环境变量。 不用管是否提示您该工作空间已经设置过：

   ```sh
   source /opt/ros/bouncy/setup.bash
   ```

1. 克隆 `ros1_bridge` 程序包到 ROS2 工作空间:

   ```sh
   git clone https://github.com/ros2/ros1_bridge.git ~/px4_ros_com_ros2/src/ros1_bridge
   ```

1. 构建 `px4_ros_com` 程序包, 并排除 `ros1_bridge` 程序包：

   ```sh
   colcon build --symlink-install --packages-skip ros1_bridge --event-handlers console_direct+
   ```

   :::note `--event-handlers console_direct+` only serves the purpose of adding verbosity to the `colcon` build process and can be removed if one wants a more "quiet" build.
:::

1. 然后，按照 ROS(1) 程序包的构建流程进行编译。 为此，您必须先 source 一下环境变量，使 `ros1_bridge` 在构建过程中能够在 PATH 变量下找到 ROS1 和 ROS2 所设置的路径：

   ```sh
   source /opt/ros/melodic/setup.bash
    source /opt/ros/bouncy/setup.bash
   ```

1. 在 ROS 这一端构建 `px4_ros_com` 程序包：

   ```sh
   cd ~/px4_ros_com_ros1 && colcon build --symlink-install --event-handlers console_direct+
   ```

1. 然后 source 一下工作空间：

   ```sh
   source ~/px4_ros_com_ros1/install/setup.bash
    source ~/px4_ros_com_ros2/install/setup.bash
   ```

1. 最后，编译 `ros1_bridge`。 请注意, 构建过程可能会占用大量内存资源。 在内存较小的机器上, 减少并行编译的线程数目 (比如可以设置环境变量 `MAKEFLAGS=-j1`)。 要查看编译过程的更详细信息，请移步 [ros1_bridge](https://github.com/ros2/ros1_bridge)程序包的网页。
   ```sh
   cd ~/px4_ros_com_ros2 && colcon build --symlink-install --packages-select ros1_bridge --cmake-force-configure --event-handlers console_direct+
   ```

### 清理工作空间

After building the workspaces there are many files that must be deleted before you can do a clean/fresh build (for example, after you have changed some code and want to rebuild). Unfortunately *colcon* does not currently have a way of cleaning the generated **build**, **install** and **log** directories, so these directories must be deleted manually.

The **clean_all.bash** script (in **px4_ros_com/scripts**) is provided to ease this cleaning process. The most common way of using it is by passing it the ROS(1) workspace directory path (since it's usually not on the default path):

```sh
$ source build_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws> --px4_firmware_dir <path/to/PX4/Firmware>
```

## 创建一个 Fast RTPS 监听应用

以 `px4_ros_com/src/listeners` 目录下的 `debug_vect_advertiser.cpp` 为例：

This example shows how to create a *Fast RTPS* "listener" application that subscribes to the `sensor_combined` topic and prints out updates (from PX4). A connected RTPS application can run on any computer on the same network as the *Agent*. For this example the *Agent* and *Listener application* will be on the same computer.

上面这行代码创建了一个 `DebugVectAdvertiser` 类，继承自 `rclcpp::Node` 基类。

这段代码创建了一个用来发送消息的回调函数。 发送消息的回调函数由定时器触发的，每秒钟发送两次消息。 These IDL files are needed when you create a *Fast RTPS* application to communicate with PX4.
:::

这段代码在 `main` 函数中将 `DebugVectAdvertiser` 类实例化成一个ROS节点。

```sh
$ source clean_all.bash --ros1_ws_dir &lt;path/to/px4_ros_com_ros1/ws&gt;
```

创建ROS节点的方法有详细的文档供参考，不在赘述。 在 `ros1` 分支的代码的 `px4_ros_com/src/listeners` 目录下，有一个关于 `sensor_combined` 消息的ROS 监听器的例子。

```cpp
void sensor_combined_Subscriber::SubListener::onNewDataMessage(Subscriber* sub)
{
    // Take data
    sensor_combined_ st;

    if(sub->takeNextData(&st, &m_info))
    {
        if(m_info.sampleKind == ALIVE)
        {
            // Print your structure data here.
            ++n_msg;
            std::cout << "\n\n\n\n\n\n\n\n\n\n";
            std::cout << "Sample received, count=" << n_msg << std::endl;
            std::cout << "=============================" << std::endl;
            std::cout << "gyro_rad: " << st.gyro_rad().at(0);
            std::cout << ", " << st.gyro_rad().at(1);
            std::cout << ", " << st.gyro_rad().at(2) << std::endl;
            std::cout << "gyro_integral_dt: " << st.gyro_integral_dt() << std::endl;
            std::cout << "accelerometer_timestamp_relative: " << st.accelerometer_timestamp_relative() << std::endl;
            std::cout << "accelerometer_m_s2: " << st.accelerometer_m_s2().at(0);
            std::cout << ", " << st.accelerometer_m_s2().at(1);
            std::cout << ", " << st.accelerometer_m_s2().at(2) << std::endl;
            std::cout << "accelerometer_integral_dt: " << st.accelerometer_integral_dt() << std::endl;
            std::cout << "magnetometer_timestamp_relative: " << st.magnetometer_timestamp_relative() << std::endl;
            std::cout << "magnetometer_ga: " << st.magnetometer_ga().at(0);
            std::cout << ", " << st.magnetometer_ga().at(1);
            std::cout << ", " << st.magnetometer_ga().at(2) << std::endl;
            std::cout << "baro_timestamp_relative: " << st.baro_timestamp_relative() << std::endl;
            std::cout << "baro_alt_meter: " << st.baro_alt_meter() << std::endl;
            std::cout << "baro_temp_celcius: " << st.baro_temp_celcius() << std::endl;

        }
    }
}
```

下面是PX4-FastRTPS桥接在实际应用中的更多示例。

```sh
make -f makefile_x64Linux2.6gcc
bin/*/sensor_combined_PublisherSubscriber subscriber
```

快速测试该模块的流程如下 (使用 PX4 SITL 和 Gazebo)：

```sh
Sample received, count=10119
Received sensor_combined data
=============================
gyro_rad: -0.0103228, 0.0140477, 0.000319406
gyro_integral_dt: 0.004
accelerometer_timestamp_relative: 0
accelerometer_m_s2: -2.82708, -6.34799, -7.41101
accelerometer_integral_dt: 0.004
magnetometer_timestamp_relative: -10210
magnetometer_ga: 0.60171, 0.0405879, -0.040995
baro_timestamp_relative: -17469
baro_alt_meter: 368.647
baro_temp_celcius: 43.93
```

:::note
If the *Listener application* does not print anything, make sure the *Client* is running.
:::

## 创建一个 ROS2 监听器

With the `px4_ros_com` built successfully, one can now take advantage of the generated *micro-RTPS* agent app and also from the generated sources and headers of the ROS2 msgs from `px4_msgs`, which represent a one-to-one matching with the uORB counterparts.

*Agent*代码是由一个叫做 *fastrtpsgen* 的 *Fast RTPS* 工具生成的。

```cpp
#include <rclcpp/rclcpp.hpp>
#include <px4_ros_com/msg/sensor_combined.hpp>
```

The above brings to use the required C++ libraries to interface with the ROS2 middleware. It also includes the required message header file.

```cpp
/**
 * @brief Sensor Combined uORB topic data callback
 */
class SensorCombinedListener : public rclcpp::Node
{
```

在 Linux/Mac 平台上可以这样：

```cpp
void sensor_combined_Subscriber::SubListener::onNewDataMessage(Subscriber* sub)
{
    // Take data
    sensor_combined_ st;

    if(sub->takeNextData(&st, &m_info))
    {
        if(m_info.sampleKind == ALIVE)
        {
            // Print your structure data here.
            ++n_msg;
            std::cout << "\n\n\n\n\n\n\n\n\n\n";
            std::cout << "Sample received, count=" << n_msg << std::endl;
            std::cout << "=============================" << std::endl;
            std::cout << "gyro_rad: " << st.gyro_rad().at(0);
            std::cout << ", " << st.gyro_rad().at(1);
            std::cout << ", " << st.gyro_rad().at(2) << std::endl;
            std::cout << "gyro_integral_dt: " << st.gyro_integral_dt() << std::endl;
            std::cout << "accelerometer_timestamp_relative: " << st.accelerometer_timestamp_relative() << std::endl;
            std::cout << "accelerometer_m_s2: " << st.accelerometer_m_s2().at(0);
            std::cout << ", " << st.accelerometer_m_s2().at(1);
            std::cout << ", " << st.accelerometer_m_s2().at(2) << std::endl;
            std::cout << "accelerometer_integral_dt: " << st.accelerometer_integral_dt() << std::endl;
            std::cout << "magnetometer_timestamp_relative: " << st.magnetometer_timestamp_relative() << std::endl;
            std::cout << "magnetometer_ga: " << st.magnetometer_ga().at(0);
            std::cout << ", " << st.magnetometer_ga().at(1);
            std::cout << ", " << st.magnetometer_ga().at(2) << std::endl;
            std::cout << "baro_timestamp_relative: " << st.baro_timestamp_relative() << std::endl;
            std::cout << "baro_alt_meter: " << st.baro_alt_meter() << std::endl;
            std::cout << "baro_temp_celcius: " << st.baro_temp_celcius() << std::endl;

        }
    }
}
```

This creates a callback function for when the `sensor_combined` uORB messages are received (now as DDS messages). It outputs the content of the message fields each time the message is received.

```cpp
public:
    explicit SensorCombinedListener() : Node("sensor_combined_listener") {
        auto callback =
        [this](const px4_ros_com::msg::SensorCombined::SharedPtr msg)->void
        {
            std::cout << "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
            std::cout << "RECEIVED DATA ON SENSOR COMBINED" << std::endl;
            std::cout << "================================" << std::endl;
            std::cout << "gyro_rad[0]: " << msg->gyro_rad[0] << std::endl;
            std::cout << "gyro_rad[1]: " << msg->gyro_rad[1] << std::endl;
            std::cout << "gyro_rad[2]: " << msg->gyro_rad[2] << std::endl;
            std::cout << "gyro_integral_dt: " << msg->gyro_integral_dt << std::endl;
            std::cout << "accelerometer_timestamp_relative: " << msg->accelerometer_timestamp_relative << std::endl;
            std::cout << "accelerometer_m_s2[0]: " << msg->accelerometer_m_s2[0] << std::endl;
            std::cout << "accelerometer_m_s2[1]: " << msg->accelerometer_m_s2[1] << std::endl;
            std::cout << "accelerometer_m_s2[2]: " << msg->accelerometer_m_s2[2] << std::endl;
            std::cout << "accelerometer_integral_dt: " << msg->accelerometer_integral_dt << std::endl;
        };
```

The above create a subscription to the `sensor_combined_topic` which can be matched with one or more compatible ROS publishers.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting sensor_combined listener node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<SensorCombinedListener>());

    rclcpp::shutdown();
    return 0;
}
```

The instantiation of the `SensorCombinedListener` class as a ROS node is done on the `main` function.


## 创建一个ROS2广播器

A ROS2 advertiser node publishes data into the DDS/RTPS network (and hence to PX4).

Taking as an example the `debug_vect_advertiser.cpp` under `px4_ros_com/src/advertisers`:

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting sensor_combined listener node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<SensorCombinedListener>());

    rclcpp::shutdown();
    return 0;
}
```

Bring in the required headers, including the `debug_vect` msg header.

```cpp
class DebugVectAdvertiser : public rclcpp::Node
{
```

The above creates a `DebugVectAdvertiser` class that subclasses the generic `rclcpp::Node` base class.

```cpp
public:
    DebugVectAdvertiser() : Node("debug_vect_advertiser") {
        publisher_ = this->create_publisher<px4_ros_com::msg::DebugVect>("DebugVect_topic");
        auto timer_callback =
        [this]()->void {
            auto debug_vect = px4_ros_com::msg::DebugVect();
            debug_vect.timestamp = this->now().nanoseconds() * 1E-3;
            debug_vect.x = 1.0;
            debug_vect.y = 2.0;
            debug_vect.z = 3.0;
            RCLCPP_INFO(this->get_logger(), "Publishing debug_vect: time: %f x:%f y:%f z:%f",
                                debug_vect.timestamp, debug_vect.x, debug_vect.y, debug_vect.z)
            this->publisher_->publish(debug_vect);
        };
        timer_ = this->create_wall_timer(500ms, timer_callback);
    }

private:
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<px4_ros_com::msg::DebugVect>::SharedPtr publisher_;
};
```

This creates a function for when messages are to be sent. The messages are sent based on a timed callback, which sends two messages per second based on a timer.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting debug_vect advertiser node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<DebugVectAdvertiser>());

    rclcpp::shutdown();
    return 0;
} << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<DebugVectAdvertiser>());

    rclcpp::shutdown();
    return 0;
}
```

The instantiation of the `DebugVectAdvertiser` class as a ROS node is done on the `main` function.

## 创建一个ROS监听器

The creation of ROS nodes is a well known and documented process. An example of a ROS listener for `sensor_combined` messages can be found in the `ros1` branch repo, under `px4_ros_com/src/listeners`.

## 与ROS无关的应用程序的示例/测试

The following examples provide additional real-world demonstrations of how to use the features described in this topic.

* [吞吐量测试](../middleware/micrortps_throughput_test.md): 一个测试PX4-FastRTPS桥接吞吐量的简单示例。

## PX4-FastRPTS桥接与 ROS2 和 ROS 的联合测试

To quickly test the package (using PX4 SITL with Gazebo):

1. 启动 PX4 SITL 和 Gazebo：
   ```sh
   make px4_sitl_rtps gazebo
   ```

1. 在一个终端里，source 一下 ROS2 工作空间的环境变量，然后启动 `ros1_bridge` (这样 ROS2 和 ROS 节点就可以互相通信了)。 还要将 `ROS_MASTER_URI` 设置为 `roscore` 正在/即将运行的IP。
   ```sh
   $ source /opt/ros/ardent/setup.bash
    $ source ~/px4_ros_com_ros2/install/setup.bash
    $ export ROS_MASTER_URI=http://localhost:11311
    $ ros2 run ros1_bridge dynamic_bridge
   ```

1. 在另一个终端里，source 一下 ROS 工作空间的环境变量，然后启动 `sensor_combined` 监听器节点。 使用 `roslaunch` 启动应用程序时，首先会自动启动 `roscore` ：
   ```sh
   $ source ~/px4_ros_com_ros1/install/setup.bash
    $ roslaunch px4_ros_com sensor_combined_listener.launch
   ```

1. 在一个终端里，source 一下 ROS2 工作空间的环境变量，然后启动 `micrortps_agent` 守护程序并使用UDP传输协议：
   ```sh
   $ source ~/px4_ros_com_ros2/install/setup.bash
    $ micrortps_agent -t UDP
   ```

1. 在 [NuttShell/System 控制台](../debug/system_console.md) 里， 启动 `micrortps_client` 守护进程，也使用UDP协议：
   ```sh
   > micrortps_client start -t UDP
   ```

   现在启动 ROS 监听器，你就可以在终端/控制台上看到数据被打印出来：

   ```sh
   RECEIVED DATA FROM SENSOR COMBINED
    ================================
    gyro_rad[0]: 0.00341645
    gyro_rad[1]: 0.00626475
    gyro_rad[2]: -0.000515705
    gyro_integral_dt: 4739
    accelerometer_timestamp_relative: 0
    accelerometer_m_s2[0]: -0.273381
    accelerometer_m_s2[1]: 0.0949186
    accelerometer_m_s2[2]: -9.76044
    accelerometer_integral_dt: 4739

    Publishing back...
   ```

   你还可以使用 `rostopic hz` 命令来检查消息的发送频率。 例如 `sensor_combined` 消息：
   ```sh
   average rate: 248.187
    min: 0.000s max: 0.012s std dev: 0.00147s window: 2724
    average rate: 248.006
    min: 0.000s max: 0.012s std dev: 0.00147s window: 2972
    average rate: 247.330
    min: 0.000s max: 0.012s std dev: 0.00148s window: 3212
    average rate: 247.497
    min: 0.000s max: 0.012s std dev: 0.00149s window: 3464
    average rate: 247.458
    min: 0.000s max: 0.012s std dev: 0.00149s window: 3712
    average rate: 247.485
    min: 0.000s max: 0.012s std dev: 0.00148s window: 3960
   ```

1. 在一个终端里，你也可以使用以下命令来测试 `sensor_combined` ROS2 监听器：
   ```sh
   $ source ~/px4_ros_com_ros2/install/setup.bash
    $ sensor_combined_listener # or ros2 run px4_ros_com sensor_combined_listener
   ```

And it should also get data being printed to the console output.

:::note
If ones uses the `build_all.bash` script, it automatically open and source all the required terminals so one just has to run the respective apps in each terminal.
:::

## 故障处理

### Client reports that selected UART port is busy

If the selected UART port is busy, it's possible that the MAVLink application is already being used. If both MAVLink and RTPS connections are required you will have to either move the connection to use another port or configure the port so that it can be shared.
<!-- https://github.com/PX4/Devguide/issues/233 -->

:::tip
A quick/temporary fix to allow bridge testing during development is to stop MAVLink from *NuttShell*:
```sh
export FASTRTPSGEN_DIR=/path/to/fastrtps/install/folder/bin
```
:::

### Agent not built/fastrtpsgen is not found

The *Agent* code is generated using a *Fast RTPS* tool called *fastrtpsgen*.

If you haven't installed Fast RTPS in the default path then you must specify its installation directory by setting the `FASTRTPSGEN_DIR` environment variable before executing *make*.

On Linux/Mac this is done as shown below:

```sh
export FASTRTPSGEN_DIR=/path/to/fastrtps/install/folder/bin
```

:::note
This should not be a problem if [Fast RTPS is installed in the default location](../dev_setup/fast-rtps-installation.md).
:::

### Enable UART on an OBC (onboard computer)

For UART transport on a Raspberry Pi or any other OBC you will have to enable the serial port:

1. 确保 `userid` (在树莓派上默认用户是 pi) 是 `dialout` 用户组的成员：

   ```sh
   groups pi
    sudo usermod -a -G dialout pi
   ```
1. 特别针对树莓派，你需要关闭使用该端口的GPIO串行控制台：

   ```sh
   sudo raspi-config
   ```

   在显示的菜单中进入 **Interfacing options > Serial** 选项。 为 *Would you like a login shell to be accessible over serial?* 选择 **NO** 。 重启使之生效。
1. 在内核中查看UART：

   ```sh
   sudo vi /boot/config.txt
   ```

   确保 `enable_uart` 被设置为 1：
   ```
    enable_uart=1
   ```

## 更多信息

* [FastRTPS 安装](../dev_setup/fast-rtps-installation.md)
* [手动生成客户端和代理端代码](micrortps_manual_code_generation.md)
* [DDS 和 ROS 中间件的实现](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
