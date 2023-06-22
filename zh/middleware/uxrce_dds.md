# uXRCE-DDS (PX4-ROS 2/DDS Bridge)

:::note
uXRCE-DDS replaces the [Fast-RTPS Bridge](https://docs.px4.io/v1.13/en/middleware/micrortps.html#rtps-dds-interface-px4-fast-rtps-dds-bridge) used in PX4 v1.13. If you were using the Fast-RTPS Bridge, please follow the [migration guidelines](#fast-rtps-to-uxrce-dds-migration-guidelines).
:::

PX4 uses uXRCE-DDS middleware to allow [uORB messages](../middleware/uorb.md) to be published and subscribed on a companion computer as though they were [ROS 2](../ros/ros2_comm.md) topics. 该特性可支持PX4和ROS2之间的快速、可靠的集成， 并且使ROS2应用程序更容易获得飞行器信息并向其发送命令。

PX4 使用 [eProsima Micro XRCE-DDS](https://micro-xrce-dds.docs.eprosima.com/en/stable/introduction.html) 来实现XRCE-DDS。

本指南描述了软件架构以及建立客户和代理所需要的操作。 尤其是，它涵盖了对于PX4用户最重要的选项。


## 软件架构

The uXRCE-DDS middleware consists of a client running on PX4 and an agent running on the companion computer, with bi-directional data exchange between them over a serial or UDP link. 代理端(Agent)充当客户端的代理，使其能够在DDS全局数据空间中发布和订阅话题。

![Architecture uXRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

In order for PX4 uORB topics to be shared on the DDS network you will need _uXRCE-DDS client_ running on PX4, connected to the _micro XRCE-DDS agent_ running on the companion.

The PX4 [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) publishes to/from a defined set of uORB topics to the global DDS data space.

The [eProsima micro XRCE-DDS _agent_](https://github.com/eProsima/Micro-XRCE-DDS-Agent) runs on the companion computer and acts as a proxy for the client in the DDS/ROS 2 network.

代理(Agent)本身不依赖客户端测代码，可以独立于PX4或ROS编译或安装。

Code that wants to subscribe/publish to PX4 does have a dependency on client-side code; it requires uORB message definitions that match those used to create the PX4 uXRCE-DDS client so that it can interpret the messages.


## 代码生成

The PX4 [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) is generated at build time and included in PX4 firmare by default. 代理不依赖客户端代码。 它可以单独构建或在ROS2工作区中构建，也可以在Ubuntu上采用snap包安装。

When PX4 is built, a code generator uses the uORB message definitions in the source tree ([PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg)) to compile support for the subset of uORB topics in [PX4-Autopilot/src/modules/uxrce_dds_client/dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) into [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client).

PX4 main分支或release版本构建将自动从当前分支的 [PX4/px4_msgs](https://github.com/PX4/px4_msgs) 中导出 uORB 消息子集。

ROS 2 applications need to be built in a workspace that includes the _same_ message definitions that were used to create the uXRCE-DDS client module in the PX4 Firmware. 可以通过将接口包 [PX4/px4_msgs](https://github.com/PX4/px4_msgs) 克隆到你的 ROS 2 工作空间并切换到正确的分支来实现。 请注意，所有与消息相关联的代码生成都是由 ROS 2 处理的。


## Micro XRCE-DDS Agent Installation

The Micro XRCE-DDS Agent can be installed on the companion computer using a binary package, built and installed from source, or built and run from within a ROS 2 workspace. 所有这些方法都需要获取 _全部_ 与客户端通信所需的依赖项 (例如FastCDR)。

:::note
The official (and more complete) installation guide is the Eprosima: [micro XRCE-DDS Installation Guide](https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html). This section summarises the options that have been tested with PX4 during creation of these docs.
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

To start the agent with settings for connecting to the uXRCE-DDS client running on the simulator:

```sh
MicroXRCEAgent udp4 -p 8888
```

### 从 Snap 软件包安装

使用以下命令从 Ubuntu 的 snap 软件包安装：

```sh
sudo snap install microxrce-ds-agent --edge
```

To start the agent with settings for connecting to the uXRCE-DDS client running on the simulator (note that the command name is different than if you build the agent locally):

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
   mkdir -p ~/px4_ros_uxrce_dds_ws/src
   ```

1. Clone the source code for the eProsima [Micro-XRCE-DDS-Agent](https://github.com/eProsima/Micro-XRCE-DDS-Agent) to the `/src` directory (the `main` branch is cloned by default):

   ```sh
   cd ~/px4_ros_uxrce_dds_ws/src
   git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
   ```
1. Source the ROS 2 development environment, and compile the workspace using `colcon`:

   :::: tabs

   ::: tab humble
   ```sh
   source /opt/ros/humble/setup.bash
   colcon build
   ```

:::

   ::: tab foxy
   ```sh
   source /opt/ros/foxy/setup.bash
   colcon build
   ```

:::

   :
:::

   This builds all the folders under `/src` using the sourced toolchain.


To run the micro XRCE-DDS agent in the workspace:

1. Source the `local_setup.bash` to make the executables available in the terminal (also `setup.bash` if using a new terminal).

   :::: tabs

   ::: tab humble
   ```sh
   source /opt/ros/humble/setup.bash
   source install/local_setup.bash
   ```

:::

   ::: tab foxy
   ```sh
   source /opt/ros/foxy/setup.bash
   source install/local_setup.bash
   ```

:::

   :
:::


1. Start the agent with settings for connecting to the uXRCE-DDS client running on the simulator:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

## Starting Agent and Client

### Starting the Agent

The agent is used to connect to the client over a particular channel, such as UDP or a serial connection. The channel settings are specified when the agent is started, using command line options. These are documented in the eProsima user guide: [Micro XRCE-DDS Agent > Agent CLI](https://micro-xrce-dds.docs.eprosima.com/en/latest/agent.html#agent-cli). Note that the agent supports many channel options, but PX4 only supports UDP and serial connections.


:::note
You should create a single instance of the agent for each channel over which you need to connect.
:::

For example, the PX4 simulator runs the uXRCE-DDS client over UDP on port 8888, so to connect to the simulator you would start the agent with the command:

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

The uXRCE-DDS client module ([uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client)) is included by default in all firmware and the simulator. This must be started with appropriate settings for the communication channel that you wish to use to communicate with the agent.

:::note
The simulator automatically starts the client on localhost UDP port `8888` using the default uxrce-dds namespace.
:::

The configuration can be done using the [UXRCE-DDS parameters](../advanced_config/parameter_reference.md#uxrce-dds-client):

- [UXRCE_DDS_CFG](../advanced_config/parameter_reference.md#UXRCE_DDS_CFG): Set the port to connect on, such as `TELEM2`, `Ethernet`, or `Wifi`.
- If using an Ethernet connection:
  - [UXRCE_DDS_PRT](../advanced_config/parameter_reference.md#UXRCE_DDS_PRT): Use this to specify the agent UDP listening port. The default value is `8888`.
  - [UXRCE_DDS_AG_IP](../advanced_config/parameter_reference.md#UXRCE_DDS_AG_IP): Use this to specify the IP address of the agent. The IP address must be provided in `int32` format as PX4 does not support string parameters. The default value is `2130706433` which corresponds to the _localhost_ `127.0.0.1`.

    You can use [Tools/convert_ip.py](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/convert_ip.py) to convert between the formats:

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

  - [UXRCE_DDS_KEY](../advanced_config/parameter_reference.md#UXRCE_DDS_KEY): The uXRCE-DDS key. If you're working in a multi-client, single agent configuration, each client should have a unique non-zero key. This is primarily important for multi-vehicle simulations, where all clients are connected in UDP to the same agent. (See the [official eprosima documentation](https://micro-xrce-dds.docs.eprosima.com/en/stable/client_api.html#session) , `uxr_init_session`.)
  - [UXRCE_DDS_DOM_ID](../advanced_config/parameter_reference.md#UXRCE_DDS_DOM_ID): The DDS domain ID. This provides a logical separation between DDS networks, and can be used to separate clients on different networks. By default, ROS 2 operates on ID 0.

:::note
Many ports are already have a default configuration. To use these ports you must first disable the existing configuration:

- `TELEM1` and `TELEM2` are set up by default to connect via MAVLink to a GCS and a companion computer (respectively). Disable by setting [MAV_0_CONFIG=0](../advanced_config/parameter_reference.md#MAV_0_CONFIG) or [MAV_1_CONFIG=0](../advanced_config/parameter_reference.md#MAV_1_CONFIG) to zero. See [MAVLink Peripherals](../peripherals/mavlink_peripherals.md) for more information.
- Other ports can similarly be configured. See [Serial port configuration](../peripherals/serial_configuration.md#serial-port-configuration).
:::

Once set, you may need to reboot PX4 for the parameters to take effect. They will then persist through subsequent reboots.

You can also start the [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) using a command line. This can be called as part of [System Startup](../concept/system_startup.md) or through the [MAVLink Shell](../debug/mavlink_shell.md) (or a system console). This method is useful when you need to set a custom client namespace, as no parameter is provided for this purpose. For example, the following command can be used to connect via Ethernet to a remote host at `192.168.0.100:8888` and to set the client namespace to `/drone/`.

```sh
uxrce_dds_client start -t udp -p 8888 -h 192.168.0.100 -n drone
```
Options `-p` or `-h` are used to bypass `UXRCE_DDS_PRT` and `UXRCE_DDS_AG_IP`.

#### Starting the Client in Simulation

The simulator [startup logic](../concept/system_startup.md) ([init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS)) uses the client startup commands for single and [multi vehicle simulations](../ros/ros2_multi_vehicle.md), enabling the setting of appropriate instance ids and DDS namespaces. By default the client is started on localhost UDP port `8888` with no additional namespace.

Environment variables are provided that override some [UXRCE-DDS parameters](../advanced_config/parameter_reference.md#uxrce-dds-client). These allow users to create custom startup files for their simulations:

- `PX4_UXRCE_DDS_NS`: Use this to specify the topic [namespace](#customizing-the-topic-namespace).
- `ROS_DOMAIN_ID`: Use this to replace [UXRCE_DDS_DOM_ID](../advanced_config/parameter_reference.md#UXRCE_DDS_DOM_ID).
- `PX4_UXRCE_DDS_PORT`: Use this to replace [UXRCE_DDS_PRT](../advanced_config/parameter_reference.md#UXRCE_DDS_PRT).

For example, the following command can be used to start a Gazebo simulation with che client operating on the DDS domain `3`, port `9999` and topic namespace `drone`.

```sh
ROS_DOMAIN_ID=3 PX4_UXRCE_DDS_PORT=9999 PX4_UXRCE_DDS_NS=drone make px4_sitl gz_x500
```


## Supported uORB Messages

The set of [PX4 uORB topics](../msg_docs/README.md) that are exposed through the client are set in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml).

The topics are release specific (support is compiled into [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) at build time). While most releases should support a very similar set of messages, to be certain you would need to check the yaml file for your particular release.
<!-- Jublish the set we use?: https://github.com/PX4/px4_msgs/issues/22 -->

Note that ROS 2/DDS needs to have the _same_ message definitions that were used to create the uXRCE-DDS client module in the PX4 Firmware in order to interpret the messages. The message definitions are stored in the ROS 2 interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs), and they are automatically synchronized by CI on the `main` and release branches. Note that all the messages from PX4 source code are present in the repository, but only those listed in `dds_topics.yaml` will be available as ROS 2 topics. Therefore,

- If you're using a main or release version of PX4 you can get the message definitions by cloning the interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your workspace.
- If you're creating or modifying uORB messages you must manually update the messages in your workspace from your PX4 source tree. Generally this means that you would update [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), clone the interface package, and then manually synchronize it by copying the new/modified message definitions from [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg) to its `msg` folders. Assuming that PX4-Autopilot is in your home directory `~`, while `px4_msgs` is in `~/px4_ros_com/src/`, then the command might be:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

:::note
Technically, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) completely defines the relationship between PX4 uORB topics and ROS 2 messages. For more information see [DDS Topics YAML](#dds-topics-yaml) below.
:::


## Customizing the Topic Namespace

Custom topic namespaces can be applied at build time (changing [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml)) or at runtime (which is useful for multi vehicle operations):

 - One possibility is to use the `-n` option when starting the [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) from command line. This technique can be used both in simulation and real vehicles.
 - A custom namespace can be provided for simulations (only) by setting the environment variable `PX4_UXRCE_DDS_NS` before starting the simulation.


:::note
Changing the namespace at runtime will append the desired namespace as a prefix to all `topic` fields in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). Therefore, commands like:

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

The PX4 yaml file [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) defines the set of PX4 uORB topics that are built into firmware and published. More precisely, it completely defines the relationship/pairing between PX4 uORB and ROS 2 messages.

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

## Fast-RTPS to uXRCE-DDS Migration Guidelines

These guidelines explain how to migrate from using PX4 v1.13 [Fast-RTPS](../middleware/micrortps.md) middleware to PX4 v1.14 `uXRCE-DDS` middleware. These are useful if you have [ROS 2 applications written for PX4 v1.13](https://docs.px4.io/v1.13/en/ros/ros2_comm.html), or you have used Fast-RTPS to interface your applications to PX4 [directly](https://docs.px4.io/v1.13/en/middleware/micrortps.html#agent-in-an-offboard-fast-dds-interface-ros-independent).

:::note
This section contains migration-specific information. You should also read the rest of this page to properly understand uXRCE-DDS.
:::


#### Dependencies do not need to be removed

uXRCE-DDS does not need the dependencies that were required for Fast-RTPS, such as those installed by following the topic [Fast DDS Installation](https://docs.px4.io/v1.13/en/dev_setup/fast-dds-installation.html). You can keep them if you want, without affecting your uXRCE-DDS applications.

If you do choose to remove the dependencies, take care not to remove anything that is used by applications (for example, Java).

#### `_rtps` targets are not needed

The make targets with extension `_rtps` were used to build firmware that included client side RTPS code.

The uXRCE-DDS middleware is included by default in builds for most boards, so you no longer need a special firmware to work with ROS 2. To check if your board has it, look for `CONFIG_MODULES_UXRCE_DDS_CLIENT=y` in the `.px4board` file of your board. Those files are nested in [PX4-Autopilot/boards](https://github.com/PX4/PX4-Autopilot/tree/main/boards).

If it is not present, or if it is set to `n`, then you have to clone the PX4 repo, modify the board configuration and manually [compile](../dev_setup/building_px4.md) the firmware.

#### New client module and new start parameters

As the client is implemented by a new PX4 module, you now have new parameters to start it. Take a look at the [client startup section](#starting-the-client) to learn how this is done.

#### New file for setting which topics are published

The list of topics that are published and subscribed for a particular firmware is now managed by the [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) configuration file, which replaces [urtps_bridge_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/tools/urtps_bridge_topics.yaml)

See [Supported uORB Messages](#supported-uorb-messages) and [DDS Topics YAML](#dds-topics-yaml) sections for more information.


#### Topics no longer need to be synced between client and agent.

The list of bridged topics between agent and client no longer needs to be synced for ROS 2, so the `update_px4_ros2_bridge.sh` script is no longer needed.

#### Default topic naming convention has changed

The topic naming format changed:

- Published topics:  `/fmu/topic-name/out` (Fast-RTPS) to `/fmu/out/topic-name` (XRCE-DDS).
- Subscribed topics: `/fmu/topic-name/in`(Fast-RTPS) to `/fmu/in/topic-name` (XRCE-DDS).

You should update your application to the new convention.

:::note
You might also edit [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) to revert to the old convention. This is not recommended because it means that you would have to always use custom firmware.
:::

#### XRCE-DDS-Agent

The XRCE-DDS agent is "generic" and independent of PX4: [micro-xrce-dds-agent](https://micro-xrce-dds.docs.eprosima.com/en/latest/agent.html). There are many ways to install it on your PC / companion computer - for more information see the [dedicated section](#micro-xrce-dds-agent-installation).

#### Application-Specific Changes

If you where not using ROS 2 alongside the agent ([Fast DDS Interface ROS-Independent](https://docs.px4.io/v1.13/en/middleware/micrortps.html#agent-in-an-offboard-fast-dds-interface-ros-independent)), then you need to migrate to [eProsima Fast DDS](https://fast-dds.docs.eprosima.com/en/latest/index.html).

ROS 2 applications still need to compile alongside the PX4 messages, which you do by adding the [px4_msgs](https://github.com/PX4/px4_msgs) package to your workspace. You can remove the [px4_ros_com](https://github.com/PX4/px4_ros_com) package as it is no longer needed, other than for example code.

In your ROS 2 nodes, you will need to:

- Update the [QoS](#px4-ros-2-qos-settings) of your publishers and subscribers as PX4 does not use the ROS 2 default settings.
- Change the names of your topics, unless you edited [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml).
- Remove everything related to time synchronization, as XRCE-DDS automatically takes care of agent/client time synchronization.

  In C++ applications you can set the `timestamp` field of your messages like this:

  ```cpp
  msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
  ```

  In Python applications you can set the `timestamp` field of your messages like this:

  ```python
  msg.timestamp = int(self.get_clock().now().nanoseconds / 1000)
  ```


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
