---
canonicalUrl: https://docs.px4.io/main/zh/ros/ros2_comm
---

# ROS 2 用户指南

ROS 2-PX4 架构在ROS 2和PX4之间进行了深度整合。 允许 ROS 2 订阅或发布节点直接使用 PX4 uORB 话题。

本指南介绍了系统架构和应用程序流程，并解释了如何与PX4一起安装和使用ROS2。

:::note
From PX4 v1.14, ROS 2 uses [uXRCE-DDS](../middleware/uxrce_dds.md) middleware, replacing the _FastRTPS_ middleware that was used in version 1.13 (v1.13 does not support uXRCE-DDS).

The [migration guide](../middleware/uxrce_dds.md#fast-rtps-to-uxrce-dds-migration-guidelines) explains what you need to do in order to migrate ROS 2 apps from PX4 v1.13 to PX4 v1.14.

If you're still working on PX4 v1.13, please follow the instructions in the [PX4 v1.13 Docs](https://docs.px4.io/v1.13/en/ros/ros2_comm.html).
<!-- remove this when there are PX4 v1.14 docs for some months -->
:::

## 概述

由于使用 [uXRCE-DDS](../middleware/uxrce_dds.md) 通信中间件，因此ROS 2的应用程序流程非常简单。

![Architecture uXRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

<!-- doc source: https://docs.google.com/drawings/d/1WcJOU-EcVOZRPQwNzMEKJecShii2G4U3yhA3U6C4EhE/edit?usp=sharing -->

uXRCE-DDS的中间件由运行在PX4上的客户端(Client)和运行在机载计算机上的代理端(Agent)组成， 通过串口、UDP、TCP或其他链路实现双向数据互联。 代理端(Agent)充当客户端(Client)的代理在DDS全局数据空间中发布和订阅话题。

The PX4 [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) is generated at build time and included in PX4 firmware by default. 它包含“通用”XRCE-DDS客户端(Client)代码和PX4 特定翻译代码以支持用来发布或获取来自uORB的话题 。 为客户端(Client)生成的 uORB 消息的子集在 [PX4-Autopilot/src/modules/uxrce_dds_client/dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/uxrce_dds_client/dds_topics.yaml) 中定义。 生成器使用代码树： [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/msg) 中的 uORB 消息定义来创建 ROS 2 消息代码。

ROS 2 应用程序应该在具有 _相同的_ 消息定义的工作区中构建，即在 PX4 Firmware 中创建 uXRCE-DDS客户端(Client)模块时使用的消息。 你可以通过克隆接口包 [PX4/px4_msgs](https://github.com/PX4/px4_msgs) 到你的 ROS 2 工作空间中(仓库中的分支对应于不同版本 PX4 消息)。

请注意，micro XRCE-DDS _代理(Agent)_ 本身并不依赖客户端代码。 可以通过 [源码](https://github.com/eProsima/Micro-XRCE-DDS-Agent)单独或作为ROS的一部分通过编译生成，也可以通过snap安装。

您通常需要在使用 ROS 2 时同时启动客户端(Client)和代理人(Agent)。 请注意，uXRCE-DDS客户端默认是编译进固件中的，但除模拟器构建外，不会自动启动。

:::note
在 PX4v1.13 及之前版本，ROS 2依赖于 [px4_ros_com](https://github.com/PX4/px4_ros_com) 中的定义。 该仓库不再需要了，但的确包含了有用的例子。
:::


## 安装设置

The supported ROS 2 platforms for PX4 development are ROS 2 "Humble" on Ubuntu 22.04, and ROS 2 "Foxy" on Ubuntu 20.04.

ROS 2 "Humble" is recommended because it is the current ROS 2 LTS distribution. ROS 2 "Foxy" reached end-of-life in May 2023, but is still stable and works with PX4.

:::note PX4 is not as well tested on Ubuntu 22.04 as it is on Ubuntu 20.04 (at time of writing), and Ubuntu 20.04 is needed if you want to use [Gazebo Classic](../sim_gazebo_classic/README.md).
:::

To setup ROS 2 for use with PX4:

- [安装 PX4](#install-px4) (使用 PX4 模拟器)
- [安装 ROS 2](#install-ros-2)
- [安装Micro XRCE-DDS 代理(Agent)& 客户端(Client)](#setup-micro-xrce-dds-agent-client)
- [构建 & 运行 ROS 2 工作空间](#build-ros-2-workspace)

框架的其他依赖关系将自动安装，如 _Fast DDS_。


### 安装PX4

您需要安装 PX4 开发工具链才能使用模拟器。

:::note ROS
2 唯一依赖的是 PX4 上定义的消息集，它从 [px4_msgs](https://github.com/PX4/px4_msgs) 获取。 您只需要安装 PX4 当您需要模拟器时(如我们在本指南中所做的那样)， 或者如果您正在创建一个发布自定义uORB话题。
:::

通过以下方式在 Ubuntu 上配置一个 PX4 开发环境：

```sh
cd
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
cd PX4-Autopilot/
make px4_sitl
```

Note that the above commands will install the recommended simulator for your version of Ubuntu. If you want to install PX4 but keep your existing simulator installation, run `ubuntu.sh` above with the `--no-sim-tools` flag.

For more information and troubleshooting see: [Ubuntu Development Environment](../dev_setup/dev_env_linux_ubuntu.md) and [Download PX4 source](../dev_setup/building_px4.md).

### 安装 ROS 2

安装 ROS 2 及其依赖：

1. Install ROS 2.

   :::: tabs

   ::: tab humble To install ROS 2 "Humble" on Ubuntu 22.04:

   ```sh
   sudo apt update && sudo apt install locales
   sudo locale-gen en_US en_US.UTF-8
   sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
   export LANG=en_US.UTF-8
   sudo apt install software-properties-common
   sudo add-apt-repository universe
   sudo apt update && sudo apt install curl -y
   sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
   sudo apt update && sudo apt upgrade -y
   sudo apt install ros-humble-desktop
   sudo apt install ros-dev-tools
   source /opt/ros/humble/setup.bash && echo "source /opt/ros/humble/setup.bash" >> .bashrc
   ```

   The instructions above are reproduced from the official installation guide: [Install ROS 2 Humble](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html). You can install _either_ the desktop (`ros-humble-desktop`) _or_ bare-bones versions (`ros-humble-ros-base`), *and* the development tools (`ros-dev-tools`).
:::


   ::: tab foxy To install ROS 2 "Foxy" on Ubuntu 20.04:

   -  Follow the official installation guide: [Install ROS 2 Foxy](https://index.ros.org/doc/ros2/Installation/Foxy/Linux-Install-Debians/).

   You can install _either_ the desktop (`ros-foxy-desktop`) _or_ bare-bones versions (`ros-foxy-ros-base`), *and* the development tools (`ros-dev-tools`).
:::

   ::::

1. 一些Python 依赖关系也必须安装 (使用 **`pip`** 或 **`apt`**):

   ```sh
   pip install --user -U empy pyros-genmsg setuptools
   ```



### 安装Micro XRCE-DDS 代理(Agent)& 客户端(Client)

For ROS 2 to communicate with PX4, [uXRCE-DDS client](../modules/modules_system.md#uxrce-dds-client) must be running on PX4, connected to a micro XRCE-DDS agent running on the companion computer.

#### 设置代理(Agent)

代理(Agent)可以通过 [数种方式](../middleware/uxrce_dds.md#micro-xrce-dds-agent-installation) 安装到任务计算机上。 下面我们将演示如何从源代码构建“独立”代理(Agent)，并连接到在 PX4 模拟器上运行的客户端(Client)。

设置并启动代理：

1. 打开一个终端。
1. 输入以下命令从仓库获取源代码并构建代理(Agent)：

   ```sh
   git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
   cd Micro-XRCE-DDS-Agent
   mkdir build
   cd build
   cmake ..
   make
   sudo make install
   sudo ldconfig /usr/local/lib/
   ```

1. 启动代理并设置以连接运行在模拟器上的 uXRCE-DDS客户端(Client)：

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

代理正在运行，但在我们启动PX4 (下一步)之前，您不会看到太多。

:::note
您可以让代理(Agent)在这个终端中运行！
请注意，每个连接端口只允许一个代理(Agent)。
:::

#### 启动客户端(Client)

PX4 模拟器自动启动 uXRCE-DDS客户端，连接到本地主机上的 UDP 8888 端口。

启动模拟器(和客户端Client)：

1. Open a new terminal in the root of the **PX4 Autopilot** repo that was installed above.

   :::: tabs

   ::: tab humble
   - Start a PX4 [Gazebo](../sim_gazebo_gz/README.md) simulation using:

     ```sh
     make px4_sitl gz_x500
     ```

:::

   ::: tab foxy
   - Start a PX4 [Gazebo Classic](../sim_gazebo_classic/README.md) simulation using:

     ```sh
     make px4_sitl gazebo-classic
     ```

:::

   ::::

代理(Agent)和客户端(Client)现在将运行并建立连接。

PX4 终端显示 [NuttShell/PX4 系统控制台](../debug/system_console.md)  PX4 启动和运行。 代理(Agent)连接后输出应该包含 `INFO` 显示创建数据写入的消息：

```
...
INFO  [uxrce_dds_client] synchronized with time offset 1675929429203524us
INFO  [uxrce_dds_client] successfully created rt/fmu/out/failsafe_flags data writer, topic id: 83
INFO  [uxrce_dds_client] successfully created rt/fmu/out/sensor_combined data writer, topic id: 168
INFO  [uxrce_dds_client] successfully created rt/fmu/out/timesync_status data writer, topic id: 188
...
```

Micro XRCE-DDS代理(Agent)终端也应开始显示输出，因为DDS网络中创建了相同的主题：

```
...
[1675929445.268957] info     | ProxyClient.cpp    | create_publisher         | publisher created      | client_key: 0x00000001, publisher_id: 0x0DA(3), participant_id: 0x001(1)
[1675929445.269521] info     | ProxyClient.cpp    | create_datawriter        | datawriter created     | client_key: 0x00000001, datawriter_id: 0x0DA(5), publisher_id: 0x0DA(3)
[1675929445.270412] info     | ProxyClient.cpp    | create_topic             | topic created          | client_key: 0x00000001, topic_id: 0x0DF(2), participant_id: 0x001(1)
...
```

### Build ROS 2 Workspace

本节将展示如何在您的主目录中创建一个 ROS 2 工作空间(将源代码放在别处需要修改相关指令)。

[px4_ros_com](https://github.com/PX4/px4_ros_com) and [px4_msgs](https://github.com/PX4/px4_msgs) 软件包克隆到一个工作区文件夹，然后使用 `colcon` 工具来构建工作区。 The example is run using `ros2 launch`.

:::note
The example builds the [ROS 2 Listener](#ros-2-listener) example application, located in [px4_ros_com](https://github.com/PX4/px4_ros_com). [px4_msgs](https://github.com/PX4/px4_msgs) is needed too so that the example can interpret PX4 ROS 2 topics.
:::


#### Building the Workspace

To create and build the workspace:

1. Open a new terminal.
1. Create and navigate into a new workspace directory using:

   ```sh
   mkdir -p ~/ws_sensor_combined/src/
   cd ~/ws_sensor_combined/src/
   ```

   :::note
A naming convention for workspace folders can make it easier to manage workspaces.
:::

1. Clone the example repository and [px4_msgs](https://github.com/PX4/px4_msgs) to the `/src` directory (the `main` branch is cloned by default, which corresponds to the version of PX4 we are running):

   ```sh
   git clone https://github.com/PX4/px4_msgs.git
   git clone https://github.com/PX4/px4_ros_com.git
   ```

1. Source the ROS 2 development environment into the current terminal and compile the workspace using `colcon`:

   :::: tabs

   ::: tab humble
   ```sh
   cd ..
   source /opt/ros/humble/setup.bash
   colcon build
   ```

:::

   ::: tab foxy
   ```sh
   cd ..
   source /opt/ros/foxy/setup.bash
   colcon build
   ```

:::

   ::::

   This builds all the folders under `/src` using the sourced toolchain.


#### Running the Example

To run the executables that you just built, you need to source `local_setup.bash`. This provides access to the "environment hooks" for the current workspace. In other words, it makes the executables that were just built available in the current terminal.

:::note
The [ROS2 beginner tutorials](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay) recommend that you _open a new terminal_ for running your executables.
:::

In a new terminal:

1. Navigate into the top level of your workspace directory and source the ROS 2 environment (in this case "Humble"):

   :::: tabs

   ::: tab humble
   ```sh
   cd ~/ws_sensor_combined/
   source /opt/ros/humble/setup.bash
   ```

:::

   ::: tab foxy
   ```sh
   cd ~/ws_sensor_combined/
   source /opt/ros/foxy/setup.bash
   ```

:::

   ::::

1. Source the `local_setup.bash`.

   ```sh
   source install/local_setup.bash
   ```
1. Now launch the example. Note here that we use `ros2 launch`, which is described below.

   ```
   ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```

If this is working you should see data being printed on the terminal/console where you launched the ROS listener:

```sh
RECEIVED DATA FROM SENSOR COMBINED
================================
ts: 870938190
gyro_rad[0]: 0.00341645
gyro_rad[1]: 0.00626475
gyro_rad[2]: -0.000515705
gyro_integral_dt: 4739
accelerometer_timestamp_relative: 0
accelerometer_m_s2[0]: -0.273381
accelerometer_m_s2[1]: 0.0949186
accelerometer_m_s2[2]: -9.76044
accelerometer_integral_dt: 4739
```

## Controlling a Vehicle

To control applications, ROS 2 applications:

- subscribe to (listen to) telemetry topics published by PX4
- publish to topics that cause PX4 to perform some action.

The topics that you can use are defined in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/uxrce_dds_client/dds_topics.yaml), and you can get more information about their data in the [uORB Message Reference](../msg_docs/README.md). For example, [VehicleGlobalPosition](../msg_docs/VehicleGlobalPosition.md) can be used to get the vehicle global position, while [VehicleCommand](../msg_docs/VehicleCommand.md) can be used to command actions such as takeoff and land.

The [ROS 2 Example applications](#ros-2-example-applications) examples below provide concrete examples of how to use these topics.

## Compatibility Issues

This section contains information that may affect how you write your ROS code.

### ROS 2 Subscriber QoS Settings

ROS 2 code that subscribes to topics published by PX4 _must_ specify a appropriate (compatible) QoS setting in order to listen to topics. Specifically, nodes should subscribe using the ROS 2 predefined QoS sensor data (from the [listener example source code](#ros-2-listener)):

```cpp
...
rmw_qos_profile_t qos_profile = rmw_qos_profile_sensor_data;
auto qos = rclcpp::QoS(rclcpp::QoSInitialization(qos_profile.history, 5), qos_profile);

subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>("/fmu/out/sensor_combined", qos,
...
```

This is needed because the ROS 2 default [Quality of Service (QoS) settings](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html#qos-profiles) are different from the settings used by PX4. Not all combinations of publisher-subscriber [Qos settings are possible](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html#qos-compatibilities), and it turns out that the default ROS 2 settings for subscribing are not! Note that ROS code does not have to set QoS settings when publishing (the PX4 settings are compatible with ROS defaults in this case).

<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->


### ROS 2 & PX4 Frame Conventions

The local/world and body frames used by ROS and PX4 are different.

| Frame | PX4                                              | ROS                                            |
| ----- | ------------------------------------------------ | ---------------------------------------------- |
| Body  | FRD (X **F**orward, Y **R**ight, Z **D**own)     | FLU (X **F**orward, Y **L**eft, Z **U**p)      |
| World | FRD or NED (X **N**orth, Y **E**ast, Z **D**own) | FLU or ENU (X **E**ast, Y **N**orth, Z **U**p) |

:::tip
See [REP105: Coordinate Frames for Mobile Platforms](http://www.ros.org/reps/rep-0105.html) for more information about ROS frames.
:::

Both frames are shown in the image below (FRD on the left/FLU on the right).

![Reference frames](../../assets/lpe/ref_frames.png)

The FRD (NED) conventions are adopted on **all** PX4 topics unless explicitly specified in the associated message definition. Therefore, ROS 2 nodes that want to interface with PX4 must take care of the frames conventions.

- To rotate a vector from ENU to NED two basic rotations must be performed:

  - first a pi/2 rotation around the `Z`-axis (up),
  - then a pi rotation around the `X`-axis (old East/new North).
- To rotate a vector from NED to ENU two basic rotations must be performed:
-
  - first a pi/2 rotation around the `Z`-axis (down),
  - then a pi rotation around the `X`-axis (old North/new East). Note that the two resulting operations are mathematically equivalent.
- To rotate a vector from FLU to FRD a pi rotation around the `X`-axis (front) is sufficient.
- To rotate a vector from FRD to FLU a pi rotation around the `X`-axis (front) is sufficient.

Examples of vectors that require rotation are:

- all fields in [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md) message; ENU to NED conversion is required before sending them.
- all fields in [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) message; FLU to FRD conversion is required before sending them.

Similarly to vectors, also quanternions representing the attitude of the vehicle (body frame) w.r.t. the world frame require conversion.

[PX4/px4_ros_com](https://github.com/PX4/px4_ros_com) provides the shared library [frame_transforms](https://github.com/PX4/px4_ros_com/blob/main/include/px4_ros_com/frame_transforms.h) to easily perform such conversions.


## ROS 2 Example Applications

### ROS 2 Listener

The ROS 2 [listener examples](https://github.com/PX4/px4_ros_com/tree/main/src/examples/listeners) in the [px4_ros_com](https://github.com/PX4/px4_ros_com) repo demonstrate how to write ROS nodes to listen to topics published by PX4.

Here we consider the [sensor_combined_listener.cpp](https://github.com/PX4/px4_ros_com/blob/main/src/examples/listeners/sensor_combined_listener.cpp) node under `px4_ros_com/src/examples/listeners`, which subscribes to the [SensorCombined](../msg_docs/SensorCombined.md) message.

:::note
[Build ROS 2 Workspace](#build-ros-2-workspace) shows how to build and run this example.
:::

The code first imports the C++ libraries needed to interface with the ROS 2 middleware and the header file for the `SensorCombined` message to which the node subscribes:

```cpp
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/sensor_combined.hpp>
```

Then it creates a `SensorCombinedListener` class that subclasses the generic `rclcpp::Node` base class.

```cpp
/**
 * @brief Sensor Combined uORB topic data callback
 */
class SensorCombinedListener : public rclcpp::Node
{
```

This creates a callback function for when the `SensorCombined` uORB messages are received (now as micro XRCE-DDS messages), and outputs the content of the message fields each time the message is received.

```cpp
public:
    explicit SensorCombinedListener() : Node("sensor_combined_listener")
    {
        rmw_qos_profile_t qos_profile = rmw_qos_profile_sensor_data;
        auto qos = rclcpp::QoS(rclcpp::QoSInitialization(qos_profile.history, 5), qos_profile);

        subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>("/fmu/out/sensor_combined", qos,
        [this](const px4_msgs::msg::SensorCombined::UniquePtr msg) {
            std::cout << "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
            std::cout << "RECEIVED SENSOR COMBINED DATA"   << std::endl;
            std::cout << "============================="   << std::endl;
            std::cout << "ts: "          << msg->timestamp    << std::endl;
            std::cout << "gyro_rad[0]: " << msg->gyro_rad[0]  << std::endl;
            std::cout << "gyro_rad[1]: " << msg->gyro_rad[1]  << std::endl;
            std::cout << "gyro_rad[2]: " << msg->gyro_rad[2]  << std::endl;
            std::cout << "gyro_integral_dt: " << msg->gyro_integral_dt << std::endl;
            std::cout << "accelerometer_timestamp_relative: " << msg->accelerometer_timestamp_relative << std::endl;
            std::cout << "accelerometer_m_s2[0]: " << msg->accelerometer_m_s2[0] << std::endl;
            std::cout << "accelerometer_m_s2[1]: " << msg->accelerometer_m_s2[1] << std::endl;
            std::cout << "accelerometer_m_s2[2]: " << msg->accelerometer_m_s2[2] << std::endl;
            std::cout << "accelerometer_integral_dt: " << msg->accelerometer_integral_dt << std::endl;
        });
    }
```

:::note
The subscription sets a QoS profile based on `rmw_qos_profile_sensor_data`. This is needed because the default ROS 2 QoS profile for subscribers is incompatible with the PX4 profile for publishers. For more information see: [ROS 2 Subscriber QoS Settings](#ros-2-subscriber-qos-settings),
:::

The lines below create a publisher to the `SensorCombined` uORB topic, which can be matched with one or more compatible ROS 2 subscribers to the `fmu/sensor_combined/out` ROS 2 topic.

```cpp
private:
    rclcpp::Subscription<px4_msgs::msg::SensorCombined>::SharedPtr subscription_;
};
```

The instantiation of the `SensorCombinedListener` class as a ROS node is done on the `main` function.

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

This particular example has an associated launch file at [launch/sensor_combined_listener.launch.py](https://github.com/PX4/px4_ros_com/blob/main/launch/sensor_combined_listener.launch.py). This allows it to be launched using the [`ros2 launch`](#ros2-launch) command.

### ROS 2 Advertiser

A ROS 2 advertiser node publishes data into the DDS/RTPS network (and hence to the PX4 Autopilot).

Taking as an example the `debug_vect_advertiser.cpp` under `px4_ros_com/src/advertisers`, first we import required headers, including the `debug_vect` msg header.

```cpp
#include <chrono>
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/debug_vect.hpp>

using namespace std::chrono_literals;
```

Then the code creates a `DebugVectAdvertiser` class that subclasses the generic `rclcpp::Node` base class.

```cpp
class DebugVectAdvertiser : public rclcpp::Node
{
```

The code below creates a function for when messages are to be sent. The messages are sent based on a timed callback, which sends two messages per second based on a timer.

```cpp
public:
    DebugVectAdvertiser() : Node("debug_vect_advertiser") {
        publisher_ = this->create_publisher<px4_msgs::msg::DebugVect>("fmu/debug_vect/in", 10);
        auto timer_callback =
        [this]()->void {
            auto debug_vect = px4_msgs::msg::DebugVect();
            debug_vect.timestamp = std::chrono::time_point_cast<std::chrono::microseconds>(std::chrono::steady_clock::now()).time_since_epoch().count();
            std::string name = "test";
            std::copy(name.begin(), name.end(), debug_vect.name.begin());
            debug_vect.x = 1.0;
            debug_vect.y = 2.0;
            debug_vect.z = 3.0;
            RCLCPP_INFO(this->get_logger(), "\033[97m Publishing debug_vect: time: %llu x: %f y: %f z: %f \033[0m",
                                debug_vect.timestamp, debug_vect.x, debug_vect.y, debug_vect.z);
            this->publisher_->publish(debug_vect);
        };
        timer_ = this->create_wall_timer(500ms, timer_callback);
    }

private:
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<px4_msgs::msg::DebugVect>::SharedPtr publisher_;
};
```

The instantiation of the `DebugVectAdvertiser` class as a ROS node is done on the `main` function.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting debug_vect advertiser node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<DebugVectAdvertiser>());

    rclcpp::shutdown();
    return 0;
}
```

### Offboard Control

For a complete reference example on how to use Offboard control with PX4, see: [ROS 2 Offboard control example](../ros/ros2_offboard_control.md).

## Using Flight Controller Hardware

ROS 2 with PX4 running on a flight controller is almost the same as working with PX4 on the simulator. The only difference is that you need to start both the agent _and the client_, with settings appropriate for the communication channel.

For more information see [Starting uXRCE-DDS](../middleware/uxrce_dds.md#starting-agent-and-client).

## Custom uORB Topics

ROS 2 needs to have the _same_ message definitions that were used to create the uXRCE-DDS client module in the PX4 Firmware in order to interpret the messages. The definition are stored in the ROS 2 interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) and they are automatically synchronized by CI on the `main` and release branches. Note that all the messages from PX4 source code are present in the repository, but only those listed in `dds_topics.yaml` will be available as ROS 2 topics. Therefore,

- If you're using a main or release version of PX4 you can get the message definitions by cloning the interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your workspace.
- If you're creating or modifying uORB messages you must manually update the messages in your workspace from your PX4 source tree. Generally this means that you would update [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/uxrce_dds_client/dds_topics.yaml), clone the interface package, and then manually synchronize it by copying the new/modified message definitions from [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/msg) to its `msg` folders. Assuming that PX4-Autopilot is in your home directory `~`, while `px4_msgs` is in `~/px4_ros_com/src/`, then the command might be:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

:::note
Technically, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/uxrce_dds_client/dds_topics.yaml) completely defines the relationship between PX4 uORB topics and ROS 2 messages. For more information see [uXRCE-DDS > DDS Topics YAML](../middleware/uxrce_dds.md#dds-topics-yaml).
:::

## Customizing the Topic Namespace

Custom topic namespaces can be applied at build time (changing [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/uxrce_dds_client/dds_topics.yaml)) or at runtime (useful for multi vehicle operations):

- One possibility is to use the `-n` option when starting the [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) from command line. This technique can be used both in simulation and real vehicles.
- A custom namespace can be provided for simulations (only) by setting the environment variable `PX4_UXRCE_DDS_NS` before starting the simulation.


:::note
Changing the namespace at runtime will append the desired namespace as a prefix to all `topic` fields in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/uxrce_dds_client/dds_topics.yaml). Therefore, commands like:

```sh
uxrce_dds_client start -n uav_1
```

or

```sh
PX4_UXRCE_DDS_NS=uav_1 make px4_sitl gz_x500
```

will generate topics under the namespaces:

```sh
/uav_1/fmu/in/  # for subscribers
/uav_1/fmu/out/ # for publishers
```
:::

## ros2 CLI

The [ros2 CLI](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools.html) is a useful tool for working with ROS. You can use it, for example, to quickly check whether topics are being published, and also inspect them in detail if you have `px4_msg` in the workspace. The command also lets you launch more complex ROS systems via a launch file. A few possibilities are demonstrated below.

### ros2 topic list

Use `ros2 topic list` to list the topics visible to ROS 2:

```sh
ros2 topic list
```

If PX4 is connected to the agent, the result will be a list of topic types:

```
/fmu/in/obstacle_distance
/fmu/in/offboard_control_mode
/fmu/in/onboard_computer_status
...
```

Note that the workspace does not need to build with `px4_msgs` for this to succeed; topic type information is part of the message payload.

### ros2 topic echo

Use `ros2 topic echo` to show the details of a particular topic.

Unlike with `ros2 topic list`, for this to work you must be in a workspace has built the `px4_msgs` and sourced `local_setup.bash` so that ROS can interpret the messages.

```sh
ros2 topic echo /fmu/out/vehicle_status
```

The command will echo the topic details as they update.

```
---
timestamp: 1675931593364359
armed_time: 0
takeoff_time: 0
arming_state: 1
latest_arming_reason: 0
latest_disarming_reason: 0
nav_state_timestamp: 3296000
nav_state_user_intention: 4
nav_state: 4
failure_detector_status: 0
hil_state: 0
...
---
```

### ros2 topic hz

You can get statistics about the rates of messages using `ros2 topic hz`. For example, to get the rates for `SensorCombined`:

```
ros2 topic hz /fmu/out/sensor_combined
```

The output will look something like:

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

### ros2 launch

The `ros2 launch` command is used to start a ROS 2 launch file. For example, above we used `ros2 launch px4_ros_com sensor_combined_listener.launch.py` to start the listener example.

You don't need to have a launch file, but they are very useful if you have a complex ROS 2 system that needs to start several components.

For information about launch files see [ROS 2 Tutorials > Creating launch files](https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Creating-Launch-Files.html)



## Troubleshooting

### Missing dependencies

The standard installation should include all the tools needed by ROS 2.

If any are missing, they can be added separately:
- **`colcon`** build tools should be in the development tools. It can be installed using:
  ```sh
  sudo apt install python3-colcon-common-extensions
  ```
- The Eigen3 library used by the transforms library should be in the both the desktop and base packages. It should be installed as shown:

   :::: tabs

   ::: tab humble
   ```sh
   sudo apt install ros-humble-eigen3-cmake-module
   ```

:::

   ::: tab foxy
   ```sh
   sudo apt install ros-foxy-eigen3-cmake-module
   ```

:::

   ::::


## Additional information

- [ROS 2 in PX4: Technical Details of a Seamless Transition to XRCE-DDS](https://www.youtube.com/watch?v=F5oelooT67E) - Pablo Garrido & Nuno Marques (youtube)
- [DDS and ROS middleware implementations](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
