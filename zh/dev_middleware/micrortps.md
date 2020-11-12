# RTPS/ROS2 接口：PX4-FastRTPS桥接

*PX4-fastRTPS 桥接* 在 PX4 中添加了一个实时发布订阅 (RTPS) 接口, 从而能够在PX4组件和 (offboard) *Fast RTPS* 应用程序 (包括使用 ROS2/ROS 框架构建的应用程序) 之间进行 [uORB 消息](../middleware/uorb.md) 交换。

> **Note**RTPS是对象管理组 (OMG) 数据分发服务(DDS) 标准的基础协议。 其目的是利用发布/订阅模式实现可扩展、实时、可靠、高性能和可互操作的数据通信。 *Fast RTPS* 是最新版本的RTPS协议和最小DDS API的一个非常轻量级的跨平台实现。

RTPS 已被采用为 ROS2 (机器人操作系统) 的中间件。 *Fast RTPS桥接 * 使我们能够更好地与 ROS2 集成, 从而轻松共享传感器值、命令和其他车辆信息。

本主题介绍RTPS桥接体系结构 (以及如何在 ROS2/ROS 应用程序管道中使用它)。 还演示了如何编译所需的代码, 以便:
1. 编写一个简单的 *Fast rtps * 应用程序来订阅PX4消息
1. 在PX4上连接ROS2节点 (通过RTPS桥接, 并使用 `px4_ros_com` 包)
1. 如果要在PX4上连接ROS (ROS "1代")，需要额外使用 `ros1_bridge` 包在ROS2和ROS之间做桥接。


## 什么时候应该使用 RTPS？

当您需要在飞行控制器和offboard部件之间可靠地共享时间敏感/实时信息时, 应使用RTPS。 特别是, 在off-board软件需要 (通过发送和接收 uORB主题) 成为 px4 中运行的软件组件的 *伙伴* 的情况下，它非常有用。

可能的使用案例包括为实现机器视觉与机器人库进行的通信, 还使用在其它对实时性要求高的领域，比如向执行器发送数据和从传感器获取数据，这对于飞机控制是必需的。

> **Note** *Fast RTPS* 并无取代MAVLink之意。 MAVLink 仍然是与地面站、云台、摄像机和其他offboard组件进行通信的首选协议 (尽管 *Fast rtps* 为使用某些外设提供了第二个选择)。

<span></span>
> **Tip**RTPS可以用于较慢的链接 (例如无线数传), 但应注意不要使通道过载。


## 架构概述

### RTPS 桥接

RTPS 桥接在 PX4 和 RTPS 应用程序之间交换消息, 在每个系统使用的 [uORB](../middleware/uorb.md) 和 RTPS 消息之间无缝转换。

![basic example flow](../../assets/middleware/micrortps/architecture.png)

该体系结构的主要元素是上面图中所示的客户端 (client) 和代理 (agent) 进程。

- *Client* 是在飞行控制器上运行的 PX4 中间件守护进程。 它订阅由其他 PX4 组件发布的 uORB 主题, 并将更新发送给 *Agent* (通过 UART 或 UDP 端口)。 它还接收来自 *Agent* 的消息, 转换为 PX4 上的 uORB 消息并重新发布。
- *Agent* 在Offboard计算机上作为守护进程运行。 它监视来自 *Client* 的 uORB 消息更新, 并通过RTPS (重新) 发布这些消息。 它还订阅来自其他 RTPS 应用程序的 "uORB" RTPS 消息, 并直接转发给 *Client*。
- *Agent* 和 *Client* 通过串行链路 (UART) 或 UDP 网络进行连接。 uORB 信息事先经过了 [CDR 序列化 ](https://en.wikipedia.org/wiki/Common_Data_Representation) 处理 (*CDR 序列化 * 提供了一种在不同平台之间交换串行数据的通用格式)。
- *Agent* 和任何 *Fast RTPS* 应用程序之间都是通过 UDP 连接的, 二者可以运行在同一设备上，也可以运行在不同设备上。 在一种典型的配置中, 它们运行于同一系统 (例如, 开发计算机、Linux 配套计算机或计算机板) 上, 通过 Wifi或 USB 连接到 *Client*。


### ROS2/ROS 应用处理流程

The application pipeline for ROS2 is very straightforward! ROS2 的应用程序流程非常简单直接! 由于 ROS2 原生支持 DDS/RTPS 作为其原生通信中间件, 因此您可以直接创建 ROS2 监听或广播节点, 通过 *PX4 Fast RTPS 桥接* 订阅或发布PX4上的 uORB 数据。 正如下图所示。

> **Note** 您需要确保客户端和代理端（以及 ROS 节点上）的消息类型、头文件和源文件是从相同的接口描述语言（IDL）文件生成的。 `px4_ros_com` 包提供了生成 ROS2 所需的消息和头文件所需的必要工具。

![Architecture with ROS2](../../assets/middleware/micrortps/architecture_ros2.png)

将 ROS 应用程序与 PX4 集成的体系结构如下所示。

![Architecture with ROS](../../assets/middleware/micrortps/architecture_ros.png)

请注意 [ros1_bridge](https://github.com/ros2/ros1_bridge)的使用, 它在 ROS2 和 ROS 之间进行消息桥接。 因为 ROS 一代不支持 RTPS，所以只能这样做。


## 代码生成

> **Note** 要生成所需代码 [必须安装 Fast RTPS](../setup/fast-rtps-installation.md)! 如果你使用为[macOS](../setup/dev_env_mac.md), [Windows Cygwin](../setup/dev_env_windows_cygwin.md) 或 [Ubuntu](../setup/dev_env_linux_ubuntu.md)平台编写的标准安装程序/脚本，*Fast RTPS* 是 *默认* 安装的。

### 独立于 ROS 的应用程序

编译 PX4 固件时, 将自动生成创建、编译和使用该桥接所需的所有代码。

*Client* 应用程序也被编译成为固件的一部分，这是标准编译过程的一部分。 但是*Agent* 必须为目标机单独/手动编译。

<span></span>
> **Tip** 桥接的代码也可以 [手动生成](micrortps_manual_code_generation.md)。 大多数用户不需要这样做, 但链接的主题提供了编译过程的更详细的描述, 排故的时候也许有用。

<a id="px4_ros_com"></a>

### ROS2/ROS 应用

完成编译的 [px4_ros_com](https://github.com/PX4/px4_ros_com) 包可以生成从一个ROS2节点获取 PX4 uORB消息所需的所有组件 (如果使用 ROS一代，还需要 [ros1_bridge](https://github.com/ros2/ros1_bridge))。 这包括所有 *PX4 RTPS bridge* 必需的组件, 包括 IDL 文件 (`micrortps_agent`必需), `micrortps_agent` 本身以及ROS消息的源文件和头文件。

The ROS and ROS2 message definition headers and interfaces are generated from the [px4_msgs](https://github.com/PX4/px4_msgs) package, which match the uORB messages counterparts under PX4-Autopilot. These are required by `px4_ros_com` when generating the IDL files to be used by the `micrortps_agent`.

这两个分支还有几个监听和广播节点的代码示例。
- 一个支持 ROS2 的 `master` 分支。 该分支的代码可以生成在 PX4 和 ROS2 之间桥接必需的所有 ROS2 消息和 IDL 文件。
- 一个支持 ROS 一代的 `ros1` 分支。 该分支的代码可以生成 ROS 消息的头文件和源文件，这些文件与 `ros1_bridge` *一起* 使用，达到在PX4与ROS之间共享数据的目的。

Both branches in `px4_ros_com` additionally include some example listener and advertiser example nodes.


## 支持的 uORB 消息

生成的桥接代码将允许通过 RTPS 发布/订阅部分 uORB 主题。 这对于 ROS 或非 ROS 应用程序都是适用的。

为了 *自动生成代码*，在 PX4 **Firmware/msg/tools/** 目录下有一个 *yaml* 定义文件 —— **uorb_rtps_message_ids.yaml**。 该文件定义了 RTPS 可以使用的 uORB 消息子集，以及是用于发送、用于接收还是双向皆可，以及用于 DDS/RTPS 中间件的 RTPS ID。

> **Note** 所有消息都必须分配一个 RTPS ID 。

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

> **Note** `px4_ros_com`编译过程 (只) 运行 CMake 宏 `rosidl_generate_interfaces()` 来生成 ROS2 IDL 文件和每个消息的头文件与源文件。 PX4固件中又一个IDL文件模板，只在PX4编译过程中才使用。
> 
> `px4_ros_com` 为 ROS2/ROS 编译生成的IDL文件只有 *少许不同* (但为PX4固件编译的就很不一样了)。 **uorb_rtps_message_ids.yaml** 文件将消息改名使之符合*PascalCased*标准 (改名这事儿与客户端-代理端之间的通信没有任何关系，但是对于 ROS2 是至关重要的，因为 ROS2 的消息命名必须符合 PascalCase 约定)。 新的IDL文件还反转了消息的发送/接收状态 (这是必须的，因为同一个消息在客户端是发送，在代理端的状态就是接收，反之亦然)。

<a id="client_firmware"></a>

## 客户端 (PX4固件)

标准的编译流程将 *Client* 自动生成，并编译到PX4固件中。

要构建 NuttX/Pixhawk 飞行控制器的固件, 请选择带有 `_rtps` 的配置文件。 例如，要为 px4_fmu-v4 构建 RTPS：
```sh
make px4_fmu-v4_rtps
```

如果要构建 SITL 固件:
```sh
make px4_sitl_rtps
```

*Client* 应用程序可以从 [NuttShell/System Console](../debug/system_console.md) 启动。 命令语法如下所示 (您可以指定任意个参数):

```sh
> micrortps_client start|stop [options]
  -t &lt;transport&gt;          [UART|UDP] 缺省为 UART
  -d &lt;device&gt;             UART 设备. 缺省为 /dev/ttyACM0
  -u &lt;update_time_ms&gt;     订阅的 uORB 消息的刷新时间，单位ms。 缺省为 0
  -l &lt;loops&gt;              该程序将循环执行多少次。 Default /dev/ttyACM0
  -l <loops>              How many iterations will this program have. -1 表示无限循环， 缺省为 -1。 Default -1.
  -w &lt;sleep_time_us&gt;      每次循环的休眠时间，单位us。 Default 1ms
  -b <baudrate>           UART device baudrate. Default 460800
  -p <poll_ms>            Time in ms to poll over UART. Default 1ms
  -r <reception port>     UDP port for receiving. -r &lt;reception port&gt;     UDP 接收端口， 缺省为 2019。 -s &lt;sending port&gt;       UDP发送端口， 缺省为 2020。 Default 2020
  -i <ip_address>         Select IP address (remote) values: <x.x.x.x>. Default: 127.0.0.1
```

> **Note**默认情况下*Client* 作为守护进程运行, 但您需要手动启动它。 PX4 固件的初始化代码将来可能会自动启动 *Client* 作为一个永久的守护进程。

例如, 为了启动通过 UDP 连接到代理的 SITL 的 *Client* 守护进程, 请运行如下命令:

```sh
micrortps_client start -t UDP
```

## 与 ROS 无关的 Offboard Fast RTPS 接口中的代理端

编译PX4固件时，相关的*Agent*代码会自动被 *生成*。 生成的源代码在这个目录下: **build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent/**.

和 *Agent* 有关的命令语法如下:

```sh
cd build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent
mkdir build && cd build
cmake ..
make
make
```

> **Note** 如果要交叉编译 *Qualcomm Snapdragon Flight* 平台，请参考 [这个链接](https://github.com/eProsima/PX4-FastRTPS-PoC-Snapdragon-UDP#how-to-use)。


要启动 *Agent*, 运行 `micrortps_agent` 并在参数中指定连接到 *Client* 的方式 ( 一个Linux设备连接到 *Client* 的缺省方式是通过 UART 端口)。

```sh
$ ./micrortps_agent [options]
  -t &lt;transport&gt;          [UART|UDP] 缺省为UART.
  -d &lt;device&gt;             UART设备， 缺省为 /dev/ttyACM0。
  -d <device>             UART device. Default /dev/ttyACM0.
  -w <sleep_time_us>      Time in us for which each iteration sleep. 默认 1ms。
  -b &lt;baudrate&gt;           UART设备波特率。 默认 460800。
  -p &lt;poll_ms&gt;            UART设备轮询时间，单位ms， 缺省为 1ms。 Default 1ms.
  -r <reception port>     UDP port for receiving. Default 2019.
  -s <sending port>       UDP port for sending. Default 2020.
```

如果要选择UDP连接，如下启动 *micrortps_agent*:

为了构建 *Agent* 应用, 运行如下编译命令:

```sh
./micrortps_agent -t UDP
```

## 面向 ROS2 中间件的代理端接口

构建 `px4_ros_com` 将自动生成并编译代理端应用。 也可以使用 [`colcon`](http://design.ros2.org/articles/build_tool.html) 构建工具, 效果与上相同。 欲知构建详情，请参考 ** 构建 `px4_ros_com` 程序包 ** 章节。


## 构建 `px4_ros_com` 程序包

要在一台 Ubuntu 18.04 机器上安装 ROS Melodic 和 ROS2 Bouncy, 分别参考如下链接:

> **Note** ROS2只需要master分支 (但ROS两个分支都需要)。

### 分别安装 ROS 和 ROS2

> **Note**以上安装和构建指南也适用于 Ubuntu 16.04, ROS Kinetic 或 ROS2 Ardent 开发环境。

In order to install ROS Melodic and ROS2 Dashing (officially supported) on a Ubuntu 18.04 machine, follow the links below, respectively:
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

   > &gt; **Caution** 不要通过deb仓库安装 `ros1_bridge` 。 该程序包必须从源码构建。

### 配置工作空间

由于 ROS2 和 ROS 环境变量的配置不同，你需要为每个 ROS 版本分配独立的工作空间。 下面是一个例子：

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

`px4_ros_com/scripts` 目录下有几个脚本可以用来构建这两个工作空间。

`build_all.bash` 这个脚本可以一次性编译两个工作空间。 使用命令 `source build_all.bash --help` 查看脚本的用法。 最常用的使用方式是把 ROS(1) 工作区目录路径和 PX4 固件目录路径作为参数:

```sh
$ source build_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws>
```

   > **Note** 如果 *监听应用* 没有打印任何信息, 检查一下 *Client* 是不是没有运行。

   > **Tip** 在开发过程中最好的即刻/临时的补救措施就是从 *NuttShell* 关闭MAVLink：

以下步骤将详述怎样 *手动* 构建这些程序包 (只是为了加深您的理解):

- `build_ros1_bridge.bash` 可以构建 `ros1_bridge`;
- `build_ros2_workspace.bash` (只构建 `px4_ros_com` 的 `ros1` 分支) 可以构建 `px4_ros_com` `ros1` 分支所在的 ROS1 工作空间;
- `build_ros2_workspace.bash` 可以构建 `px4_ros_com` `master` 分支所在的工作空间;

The steps below show how to *manually* build the packages (provided for your information/better understanding only):

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

   > **Note** `--event-handlers console_direct+` 参数只是为了让 `colcon` 将构建过程的详细信息打印出来，如果想要 "安静的" 构建过程，可以去掉该参数。

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

在一次构建之后，如果想要再做一次干净的/新鲜的编译 (比如，你更改了一些代码然后想要一次 rebuild)，有些文件是必须要删除的。 不幸的是 *colcon* 目前无法自动清除 **build**, **install** 和 **log** 目录, 所以这三个目录必须被手动删除。

**clean_all.bash** 脚本 (在 **px4_ros_com/scripts** 目录下) 可以帮你完成这个清理工作。 最常用的用法就是把 ROS(1) 的工作空间路径作为参数 (因为这个路径通常不是缺省路径)：

```sh
$ source build_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws> --px4_firmware_dir <path/to/PX4/Firmware>
```

## 创建一个 Fast RTPS 监听应用

一旦 *Client* (在飞行控制器上) 和 *Agent* (在一台 offboard 计算机上) 同时运行并且成功互联, *Fast RTPS* 应用就可以通过 RTPS 发布或订阅PX4 上的 uORB 消息。

下面这个例子演示了怎样创建一个订阅了 `sensor_combined` 主题并打印 (来自PX4) 的消息更新的 *Fast RTPS* "监听" 应用。 一个已连接的 RTPS 应用可以在与 *Agent* 同一网段的任何计算机上运行。 在这个例子中 *Agent* and *监听应用* 在同一台计算机上运行。

*fastrtpsgen* 脚本可以从 IDL 消息文件创建一个简单的 RTPS 应用。

> **Note** RTPS 消息在 IDL 文件中定义并被 *fastrtpsgen* 编译成 C++ 代码。 作为桥接组件构建过程的一部分,自动为用于发送/接收的 uORB 消息文件生成了 IDL 文件 (见 **build/BUILDPLATFORM/src/modules/micrortps_bridge/micrortps_agent/idl/*.idl** 目录)。 当你创建一个 *Fast RTPS* 应用并与 PX4 通信时，这些 IDL 文件是必需的。

输入以下命令来创建应用：

```sh
$ source clean_all.bash --ros1_ws_dir &lt;path/to/px4_ros_com_ros1/ws&gt;
```

这段代码创建了一个基本的订阅器和广播器，和一个运行它们的主程序。 要打印来自 `sensor_combined` 主题的数据, 修改 **sensor_combined_Subscriber.cxx** 文件中的 `onNewDataMessage()` 方法。

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

要在Linux上构建并运行该应用：

```sh
make -f makefile_x64Linux2.6gcc
bin/*/sensor_combined_PublisherSubscriber subscriber
```

然后就可以看到打印出的传感器信息：

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

> **Note** If the *Listener application* does not print anything, make sure the *Client* is running.

## 创建一个 ROS2 监听器

如果 `px4_ros_com` 已经构建成功, 你可以利用生成的 *micro-RTPS* 代理程序和自动生成的ROS2消息源文件和头文件，这些文件与 uORB 消息是一一对应的。

要在 ROS2 上创建一个监听器, 让我们以 `sensor_combined_listener.cpp` node under `px4_ros_com/src/listeners` 作为举例：

```cpp
#include <rclcpp/rclcpp.hpp>
#include <px4_ros_com/msg/sensor_combined.hpp>
```

上面两行代码将与ROS2中间件交互的 C++ 库包含进来。 同时还包含了我们要用到的消息头文件。

```cpp
/**
 * @brief Sensor Combined uORB topic data callback
 */
class SensorCombinedListener : public rclcpp::Node
{
```

上面这行代码创建了一个子类 `SensorCombinedListener`， 继承自 `rclcpp::Node` 基类。

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

这段代码创建了一个回调函数，在收到 `sensor_combined` 消息时被调用。 一旦收到消息就打印出每一个字段。

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

上面这段代码创建了 `sensor_combined_topic` 主题的订阅，可以匹配到一个或多个该消息的 ROS 广播者上。

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

在 `main` 函数中将 `SensorCombinedListener`类作为一个 ROS 节点实例化。


## 创建一个ROS2广播器

ROS2 广播器节点将数据发布到 DDS/RTPS 网络 (再转发至 PX4)。

以 `px4_ros_com/src/listeners` 目录下的 `debug_vect_advertiser.cpp` 为例：

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

包含必要的头文件，包括 `debug_vect` 消息头文件。

```cpp
class DebugVectAdvertiser : public rclcpp::Node
{
```

上面这行代码创建了一个 `DebugVectAdvertiser` 类，继承自 `rclcpp::Node` 基类。

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

这段代码创建了一个用来发送消息的回调函数。 发送消息的回调函数由定时器触发的，每秒钟发送两次消息。

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

这段代码在 `main` 函数中将 `DebugVectAdvertiser` 类实例化成一个ROS节点。

## 创建一个ROS监听器

创建ROS节点的方法有详细的文档供参考，不在赘述。 在 `ros1` 分支的代码的 `px4_ros_com/src/listeners` 目录下，有一个关于 `sensor_combined` 消息的ROS 监听器的例子。

## 与ROS无关的应用程序的示例/测试

下面是PX4-FastRTPS桥接在实际应用中的更多示例。

* [吞吐量测试](../middleware/micrortps_throughput_test.md): 一个测试PX4-FastRTPS桥接吞吐量的简单示例。

## PX4-FastRPTS桥接与 ROS2 和 ROS 的联合测试

快速测试该模块的流程如下 (使用 PX4 SITL 和 Gazebo)：

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

也会有数据被打印到控制台输出。

> **Note** If ones uses the `build_all.bash` script, it automatically open and source all the required terminals so one just has to run the respective apps in each terminal.

## 故障处理

### Client reports that selected UART port is busy

如果所选串口已被占用，可能是MAVLink应用已经在运行。 如果MAVLink和RTPS连接需要同时运行，你必须为RTPS连接指定另一个端口或者将这个端口配置为可以共享。
<!-- https://github.com/PX4/Devguide/issues/233 -->

> **Tip** A quick/temporary fix to allow bridge testing during development is to stop MAVLink from *NuttShell*: 
> 
> ```sh
  sh
  mavlink stop-all
```

### Agent not built/fastrtpsgen is not found

*Agent*代码是由一个叫做 *fastrtpsgen* 的 *Fast RTPS* 工具生成的。

如果你没有将 Fast RTPS 安装到默认路径，那就必须在执行 *make*之前，将环境变量 `FASTRTPSGEN_DIR` 设置为你的安装路径。

在 Linux/Mac 平台上可以这样：

```sh
export FASTRTPSGEN_DIR=/path/to/fastrtps/install/folder/bin
```

> **Note** 如果 [Fast RTPS 安装在默认路径](../setup/fast-rtps-installation.md) 就不会发生此类问题。

### Enable UART on an OBC (onboard computer)

要在树莓派或其它OBC上使用UART传输，你必须首先使能所有串口：

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

* [FastRTPS 安装](../setup/fast-rtps-installation.md)
* [手动生成客户端和代理端代码](micrortps_manual_code_generation.md)
* [DDS 和 ROS 中间件的实现](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
