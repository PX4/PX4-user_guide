---
canonicalUrl: https://docs.px4.io/main/zh/middleware/xrce_dds
---

# XRCE-DDS(PX4-FastDDS桥)

:::note
在 PX4 v1.13 中使用XRCE-DDS替换 [Fast-RTPS 桥](https://docs.px4.io/v1.13/en/middleware/micrortps.html#rtps-dds-interface-px4-fast-rtps-dds-bridge) 。
:::

PX4 使用 XRCE-DDS中间件使 [uORB 消息](../middleware/uorb.md) 可以像 [ROS 2](../ros/ros2_comm.md) 内部话题一样在机载计算机上被订阅和发布。 该特性可支持PX4和ROS2之间的快速、可靠的集成， 并且使ROS2应用程序更容易获得飞行器信息并向其发送命令。

PX4 使用 [eProsima Micro XRCE-DDS](https://micro-xrce-dds.docs.eprosima.com/en/stable/introduction.html) 来实现XRCE-DDS。

本指南描述了软件架构以及建立客户和代理所需要的操作。 尤其是，它涵盖了对于PX4用户最重要的选项。


## 软件架构

XRCE-DDS中间件由运行在PX4上的客户端(Client)和运行在机载计算机上的代理端(Agent)组成， 通过串口或UDP进行双向数据通讯。 代理端(Agent)充当客户端的代理，使其能够在DDS全局数据空间中发布和订阅话题。

![Architecture XRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

为了在 DDS网络上传输 PX4 uORB 话题，需要 _XRCE-DDS客户端_ 在 PX4 上运行，并与运行在机载计算机上的_XRCE-DDS代理_ 连接。

PX4 [microdds-client](../modules/modules_system.md#microdds-client) 发布自定义的 uORB 话题到 DDS的全局数据空间。

[eProsima XRCE-DDS _代理(Agent)_](https://github.com/eProsima/Micro-XRCE-DDS-Agent) 运行在机载计算机上，并充当DDS/ROS2 网络中客户端的代理服务。

代理(Agent)本身不依赖客户端测代码，可以独立于PX4或ROS编译或安装。

想要订阅/发布到 PX4 的代码依赖客户端侧(client-side)代码； 它需要 uORB 消息定义(这些定义应与创建 PX4 XRCE-DDS客户端的消息定义一致)以便能够正确解释消息。


## 代码生成

PX4 [microdds-client](../modules/modules_system.md#microdds-client) 是在构建时生成的，并且默认包含在 PX4 固件中。 代理不依赖客户端代码。 它可以单独构建或在ROS2工作区中构建，也可以在Ubuntu上采用snap包安装。

在 PX4 构建时，代码生成器将基于代码树中的 uORB 消息定义([PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/msg))将在 [PX4-Autopilot/src/modules/microdds_client/dds_subjects. aml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml) 声明的 uORB 话题的子集编译至 [microdds-client](../modules/modules_system.md#microdds-client) 中。

PX4 main分支或release版本构建将自动从当前分支的 [PX4/px4_msgs](https://github.com/PX4/px4_msgs) 中导出 uORB 消息子集。

ROS 2 应用程序需要在一个包含了与 PX4 Firmware中 XRCE-DDS客户端模块 _相同_ 消息定义的worksapce中进行构建。 可以通过将接口包 [PX4/px4_msgs](https://github.com/PX4/px4_msgs) 克隆到你的 ROS 2 工作空间并切换到正确的分支来实现。 请注意，所有与消息相关联的代码生成都是由 ROS 2 处理的。


## XRCE-DDS代理安装

XRCE-DDS代理可以使用二进制包安装在机载计算机上或者从源代码构建安装，也可以在ROS2工作空间进行构建和运行。 所有这些方法都需要获取 _全部_ 与客户端通信所需的依赖项 (例如FastCDR)。

:::note
官方(更完整的)安装指南可以参考 Eprosima: [microXRCE-DDS安装指南](https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html) 本部分描述了文档创建时与 PX4 集成测试相关的选项。
:::

### 源码安装

在 Ubuntu 上，您可以使用以下命令从源代码构建并单独安装代理：

```sh
git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
cd Micro-XRCE-DDS-Agent
mkdir build
cd build
cmake ...
make
sudo make installing
sudo ldconfig /usr/local/lib/
```

:::note
在 [官方指南](https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html#installing-the-agent-standalone)中有从相应主题链接的各种构建配置选项， 但尚未对其进行测试。
:::

若要启动代理并连接至运行在模拟器上的 XRCE-DDS客户端：

```sh
MicroXRCEAgent udp4 -p 8888
```

### 从 Snap 软件包安装

使用以下命令从 Ubuntu 的 snap 软件包安装：

```sh
sudo snap install microxrce-ds-agent --edge
```

若要启动代理并连接至运行在模拟器上的 XRCE-DDS客户端(注意命令名称与本地构建不同)：

```sh
micro-xrce-dds-agent udp4 -p 8888
```

:::note
在编写该文档时，从snap仓库安装的稳定版本在与PX4连接时会报创建话题错误。 开发版本(使用 `--edge` 控制字段获取安装)可以正常工作。
:::

### Build/Run within ROS 2 Workspace

The agent can be built and launched within a ROS 2 workspace (or build standalone and launched from a workspace. You must already have installed ROS 2 following the instructions in: [ROS 2 User Guide > Install ROS 2](../ros/ros2_comm.md#install-ros-2).

To build the agent within ROS:

1. Create a workspace directory for the agent:

   ```sh
   mkdir -p ~/ws_xrce_dds_agent/src
   ```

1. Clone the source code for the eProsima [Micro-XRCE-DDS-Agent](https://github.com/eProsima/Micro-XRCE-DDS-Agent) to the `/src` directory (the `main` branch is cloned by default):

   ```sh
   cd ~/px4_ros_xrce_dds_ws/src
   git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
   ```
1. Source the ROS 2 development environment, in this case "ROS 2 Foxy", and compile the workspace using `colcon`:

   ```sh
   cd ..
   source /opt/ros/foxy/setup.bash
   colcon build
   ```
   This builds all the folders under `/src` using the sourced toolchain.


To run the XRCE-DDS agent in the workspace:

1. Source the `local_setup.bash` to make the executables available in the terminal (also `setup.bash` if using a new terminal).

   ```sh
   source /opt/ros/foxy/setup.bash
   source install/local_setup.bash
   ```
1. Start the agent with settings for connecting to the XRCE-DDS client running on the simulator:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

## Starting XRCE-DDS

### Starting the Agent

The agent is used to connect to the client over a particular channel, such as UDP or a serial connection. The channel settings are specified when the agent is started, using command line options. These are documented in the eProsima user guide: [Micro XRCE-DDS Agent > Agent CLI](https://micro-xrce-dds.docs.eprosima.com/en/latest/agent.html#agent-cli). Note that the agent supports many channel options, but PX4 only supports UDP and serial connections.


:::note
You should create a single instance of the agent for each channel over which you need to connect.
:::

For example, the PX4 simulator runs the XRCE-DDS client over UDP on port 8888, so to connect to the simulator you would start the agent with the command:

```sh
MicroXRCEAgent udp4 -p 8888
```

When working with real hardware, the setup depends on the hardware, OS, and channel. For example, if you're using the RasPi `UART0` serial port, you might connect using this command (based on the information in [Raspberry Pi Documentation > Configuring UARTS](https://www.raspberrypi.com/documentation/computers/configuration.html#configuring-uarts)):

```sh
sudo MicroXRCEAgent serial --dev /dev/AMA0 -b 921600
```

:::note
For more information about setting up communications channels see [Pixhawk + Companion Setup > Serial Port setup](../companion_computer/pixhawk_companion.md#serial-port-setup), and sub-documents.
:::


### Starting the Client

The XRCE-DDS client module ([microdds-client](../modules/modules_system.md#microdds-client)) is included by default in all firmware and the simulator. This must be started with appropriate settings for the communication channel that you wish to use to communicate with the agent.

:::note
The simulator automatically starts the client on localhost UDP port `8888` using the default microdds namespace.
:::

The configuration can be done using the [Micro XRCE-DDS parameters](../advanced_config/parameter_reference.md#micro-xrce-dds):

- [XRCE_DDS_CFG](../advanced_config/parameter_reference.md#XRCE_DDS_CFG): Set the port to connect on, such as `TELEM2`, `Ethernet`, or `Wifi`.
- If using an Ethernet connection:
  - [XRCE_DDS_PRT](../advanced_config/parameter_reference.md#XRCE_DDS_PRT): Use this to specify the agent UDP listening port. The default value is `8888`.
  - [XRCE_DDS_AG_IP](../advanced_config/parameter_reference.md#XRCE_DDS_AG_IP): Use this to specify the IP address of the agent. The IP address must be provided in `int32` format as PX4 does not support string parameters. The default value is `2130706433` which corresponds to the _localhost_ `127.0.0.1`.

    You can use [Tools/convert_ip.py](https://github.com/PX4/PX4-Autopilot/blob/pr-micro-XRCE-DDS-allow-IP-parameter/Tools/convert_ip.py) to convert between the formats:

    - To obtain the `int32` version of an IP in decimal dot notation the command is:

      ```sh
      python3 ./PX4-Autopilot/Tools/convert_ip.py <the IP address in decimal dot notation>
      ```
    - To get the IP address in decimal dot notation from the `int32` version:

      ```sh
      python3 ./PX4-Autopilot/Tools/convert_ip.py -r <the IP address in int32 notation>
      ```

- If using a serial connection:
  - [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), [SER_URT6_BAUD](../advanced_config/parameter_reference.md#SER_URT6_BAUD) (and so on): Use the `_BAUD` parameter associated with the serial port to set the baud rate. For example, you'd set a value for `SER_TEL2_BAUD` if you are connecting to the companion using `TELEM2`. For more information see [Serial port configuration](../peripherals/serial_configuration.md#serial-port-configuration).

- Some setups might also need these parameters to be set:

  - [XRCE_DDS_KEY](../advanced_config/parameter_reference.md#XRCE_DDS_KEY): The XRCE-DDS key. If you're working in a multi-client, single agent configuration, each client should have a unique non-zero key. This is primarily important for multi-vehicle simulations, where all clients are connected in UDP to the same agent. (See the [official eprosima documentation](https://micro-xrce-dds.docs.eprosima.com/en/stable/client_api.html#session) , `uxr_init_session`.)
  - [XRCE_DDS_DOM_ID](../advanced_config/parameter_reference.md#XRCE_DDS_DOM_ID): The DDS domain ID. This provides a logical separation between DDS networks, and can be used to separate clients on different networks. By default, ROS 2 operates on ID 0.

:::note
Many ports are already have a default configuration. To use these ports you must first disable the existing configuration:

- `TELEM1` and `TELEM2` are set up by default to connect via MAVLink to a GCS and a companion computer (respectively). Disable by setting [MAV_0_CONFIG=0](../advanced_config/parameter_reference.md#MAV_0_CONFIG) or [MAV_1_CONFIG=0](../advanced_config/parameter_reference.md#MAV_1_CONFIG) to zero. See [MAVLink Peripherals](../peripherals/mavlink_peripherals.md) for more information.
- Other ports can similarly be configured. See [Serial port configuration](../peripherals/serial_configuration.md#serial-port-configuration).
:::

Once set, you may need to reboot PX4 for the parameters to take effect. They will then persist through subsequent reboots.

You can also start the [microdds-client](../modules/modules_system.md#microdds-client) using a command line. This can be called as part of [System Startup](../concept/system_startup.md) or through the [MAVLink Shell](../debug/mavlink_shell.md) (or a system console). This method is useful when you need to set a custom client namespace, as no parameter is provided for this purpose. For example, the following command can be used to connect via Ethernet to a remote host at `192.168.0.100:8888` and to set the client namespace to `/drone/`.

```sh
microdds_client start -t udp -p 8888 -h 192.168.0.100 -n drone
```
Options `-p` or `-h` are used to bypass `XRCE_DDS_PRT` and `XRCE_DDS_AG_IP`.

The simulator [startup logic](../concept/system_startup.md) ([init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/ROMFS/px4fmu_common/init.d-posix/rcS)) uses the client startup commands for single and [multi vehicle simulations](../ros/ros2_multi_vehicle.md), enabling the setting of appropriate instance ids and DDS namespaces.

## Supported uORB Messages

The set of [PX4 uORB topics](../msg_docs/README.md) that are exposed through the client are set in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml).

The topics are release specific (support is compiled into [microdds-client](../modules/modules_system.md#microdds-client) at build time). While most releases should support a very similar set of messages, to be certain you would need to check the yaml file for your particular release.
<!-- Jublish the set we use?: https://github.com/PX4/px4_msgs/issues/22 -->

Note that ROS 2/DDS needs to have the _same_ message definitions that were used to create the XRCE-DDS client module in the PX4 Firmware in order to interpret the messages. The message definitions are stored in the ROS 2 interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs), and they are automatically synchronized by CI on the `main` and release branches. Note that all the messages from PX4 source code are present in the repository, but only those listed in `dds_topics.yaml` will be available as ROS 2 topics. Therefore,

- If you're using a main or release version of PX4 you can get the message definitions by cloning the interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your workspace.
- If you're creating or modifying uORB messages you must manually update the messages in your workspace from your PX4 source tree. Generally this means that you would update [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml), clone the interface package, and then manually synchronize it by copying the new/modified message definitions from [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/msg) to its `msg` folders. Assuming that PX4-Autopilot is in your home directory `~`, while `px4_msgs` is in `~/px4_ros_com/src/`, then the command might be:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

:::note
Technically, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml) completely defines the relationship between PX4 uORB topics and ROS 2 messages. For more information see [DDS Topics YAML](#dds-topics-yaml) below.
:::


## Customizing the Topic Namespace

Custom topic namespaces can be applied at build time (changing [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml)) or at runtime (which is useful for multi vehicle operations):

 - One possibility is to use the `-n` option when starting the [microdds-client](../modules/modules_system.md#microdds-client) from command line. This technique can be used both in simulation and real vehicles.
 - A custom namespace can be provided for simulations (only) by setting the environment variable `PX4_MICRODDS_NS` before starting the simulation.


:::note
Changing the namespace at runtime will append the desired namespace as a prefix to all `topic` fields in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml). Therefore, commands like:

```sh
microdds_client start -n uav_1
```

or

```sh
PX4_MICRODDS_NS=uav_1 make px4_sitl gz_x500
```

will generate topics under the namespaces:

```sh
/uav_1/fmu/in/  # for subscribers
/uav_1/fmu/out/ # for publishers
```
:::

## PX4 ROS 2 QoS Settings

PX4 QoS settings for publishers are incompatible with the default QoS settings for ROS 2 subscribers. So if ROS 2 code needs to subscribe to a uORB topic, it will need to use compatible QoS settings. One example of which is shown in [ROS 2 User Guide > ROS 2 Subscriber QoS Settings](../ros/ros2_comm.md#ros-2-subscriber-qos-settings).

PX4 uses the following QoS settings for publishers:

```cpp
uxrQoS_t qos = {
  .durability = UXR_DURABILITY_TRANSIENT_LOCAL,
  .reliability = UXR_RELIABILITY_BEST_EFFORT,
  .history = UXR_HISTORY_KEEP_LAST,
  .depth = 0,
};
```

PX4 uses the following QoS settings for subscribers:

```cpp
uxrQoS_t qos = {
  .durability = UXR_DURABILITY_VOLATILE,
  .reliability = UXR_RELIABILITY_BEST_EFFORT,
  .history = UXR_HISTORY_KEEP_LAST,
  .depth = queue_depth,
};
```

ROS 2 uses the following QoS settings (by default) for publishers and subscriptions: "keep last" for history with a queue size of 10, "reliable" for reliability, "volatile" for durability, and "system default" for liveliness. Deadline, lifespan, and lease durations are also all set to "default".
<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->


## DDS Topics YAML

The PX4 yaml file [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/microdds_client/dds_topics.yaml) defines the set of PX4 uORB topics that are built into firmware and published. More precisely, it completely defines the relationship/pairing between PX4 uORB and ROS 2 messages.

The file is structured as follows:

```
publications:

  - topic: /fmu/out/collision_constraints
    type: px4_msgs::msg::CollisionConstraints

  ...  

  - topic: /fmu/out/vehicle_odometry
    type: px4_msgs::msg::VehicleOdometry

  - topic: /fmu/out/vehicle_status
    type: px4_msgs::msg::VehicleStatus

  - topic: /fmu/out/vehicle_trajectory_waypoint_desired
    type: px4_msgs::msg::VehicleTrajectoryWaypoint

subscriptions:

  - topic: /fmu/in/offboard_control_mode
    type: px4_msgs::msg::OffboardControlMode

  ...

  - topic: /fmu/in/vehicle_trajectory_waypoint
    type: px4_msgs::msg::VehicleTrajectoryWaypoint
```

Each (`topic`,`type`) pairs defines:

1. A new subscription or publication depending on the list to which it is added.
2. The topic _base name_, which **must** coincide with the desired uORB topic name that you want to publish/subscribe. It is identified by the last token in `topic:` that starts with `/` and does not contains any `/` in it. `vehicle_odometry`, `vehicle_status` and `offboard_control_mode` are examples of base names.
3. The topic [namespace](https://design.ros2.org/articles/topic_and_service_names.html#namespaces). By default it is set to:

    - `/fmu/out/` for topics that are _published_ by PX4.
    - `/fmu/in/` for topics that are _subscribed_ by PX4.
4. The message type (`VehicleOdometry`, `VehicleStatus`, `OffboardControlMode`, etc.) and the ROS 2 package (`px4_msgs`) that is expected to provide the message definition.

You can arbitrarily change the configuration. For example, you could use different default namespaces or use a custom package to store the message definitions.


## Helpful Resources

- [ROS 2 in PX4: Technical Details of a Seamless Transition to XRCE-DDS](https://www.youtube.com/watch?v=F5oelooT67E) - Pablo Garrido & Nuno Marques (youtube)
- [PX4 ROS 2 offboard tutorial](https://gist.github.com/julianoes/adbf76408663829cd9aed8d14c88fa29) (Github gist - JulianOes)
- [ROS 2 PX4 Offboard Tutorial](https://github.com/Jaeyoung-Lim/px4-offboard/blob/2d784532fd323505ac8a6e53bb70145600d367c4/doc/ROS2_PX4_Offboard_Tutorial.md) (Jaeyoung-Lim).<!---
Some of this might be useful.
I'd like to see a real example first.

## Setting up the bridge with real hardware

This section is work-in-progress.

## Troubleshooting

### Client reports that selected UART port is busy

If the selected UART port is busy, it's possible that the MAVLink application is already being used.
If both MAVLink and RTPS connections are required you will have to either move the connection to use another port or using the available protocol splitter for PX4 and companion computers.

:::tip
A quick/temporary fix to allow bridge testing during development is to stop MAVLink from *NuttShell*:
```sh
mavlink stop-all
```
:::  

### Enable UART on a companion computer

For UART transport on a Raspberry Pi or any other companion computer you will have to enable the serial port:

1. Make sure the `userid` (default is pi on a Raspberry Pi) is a member of the `dialout` group:

   ```sh
   groups pi
   sudo usermod -a -G dialout pi
   ```
1. For the Raspberry Pi in particular, you need to stop the GPIO serial console that is using the port:

   ```sh
   sudo raspi-config
   ```

   In the menu showed go to **Interfacing options > Serial**.
   Select **NO** for *Would you like a login shell to be accessible over serial?*. Valid and reboot.
1. Check UART in kernel:

   ```sh
   sudo vi /boot/config.txt
   ```

   And make sure that the `enable_uart` value is set to 1:
   ```
    enable_uart=1
   ```
-->
