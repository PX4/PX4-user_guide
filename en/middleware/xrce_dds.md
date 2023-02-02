# XRCE-DDS (PX4-FastDDS Bridge)

:::note
XRCE-DDS replaces the [Fast-RTPS Bridge](https://docs.px4.io/v1.13/en/middleware/micrortps.html#rtps-dds-interface-px4-fast-rtps-dds-bridge) used in PX4 v1.13.
:::

PX4 uses XRCE-DDS middleware to allow [uORB messages](../middleware/uorb.md) to be published and subscribed on a companion computer as though they were ROS 2 topics.
This provides a fast and reliable integration between PX4 and ROS2, and makes it much easier for ROS 2 applications to get vehicle information and send commands. 

PX4 uses an XRCE-DDS implementation that leverages [eProsima Micro XRCE-DDS](https://micro-xrce-dds.docs.eprosima.com/en/stable/introduction.html).

The following guide describes the architecture and various options for setting up the client and agent.
In particular it covers the options that are most important to PX4 users.


## Architecture

The XRCE-DDS middleware consists of a client running on PX4 and an agent running on the companion computer, with bi-directional data exchange between them over a serial or UDP link.
The agent acts as a proxy for the client, enabling it to publish and subscribe to topics in the global DDS data space.

![Architecture XRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

In order for PX4 uORB topics to be shared on the DDS network you will need _XRCE-DDS client_ running on PX4, connected to the _XRCE-DDS agent_ running on the companion.

The PX4 [microdds-client](../modules/modules_system.md#microdds-client) publishes to/from a defined set of uORB topics to the global DDS data space.

The [eProsima XRCE-DDS _agent_](https://github.com/eProsima/Micro-XRCE-DDS-Agent) runs on the companion computer and acts as a proxy for the client in the DDS/ROS2 network.

The agent itself has no dependency on client-side code and can be built and/or installed independent of PX4 or ROS.

Code that wants to subscribe/publish to PX4 does have a dependency on client-side code; it requires uORB message definitions that match those used to create the PX4 XRCE-DDS client so that it can interpret the messages.


## Code Generation

The PX4 [microdds-client](../modules/modules_system.md#microdds-client) is generated at build time and included in PX4 firmare by default.
The agent has no dependency on client code.
It can be built standalone or in a ROS2 workspace, or installed as a snap package on Ubuntu.

When PX4 is built, a code generator uses the uORB message definitions in the source tree ([PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg)) to compile support for the subset of uORB topics in [PX4-Autopilot/src/modules/microdds_client/dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/microdds_client/dds_topics.yaml) into [microdds-client](../modules/modules_system.md#microdds-client).

PX4 main or release builds automatically export the set of uORB messages definitions in the build to an associated branch in [PX4/px4_msgs](https://github.com/PX4/px4_msgs).

ROS 2 applications need to be built in a workspace that includes the _same_ message definitions that were used to create the XRCE-DDS client module in the PX4 Firmware.
These can be included into a workspace by cloning the [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your ROS2 workspace and switching to the appropriate branch.
Note that all code generation associated with the messages is handled by ROS 2.


## XRCE-DDS Agent Installation

The XRCE-DDS Agent can be installed on the companion computer using a binary package, built and installed from source, or built and run from within a ROS2 workspace.
All of these methods fetch _all_ the dependencies needed to communicate with the client (such as FastCDR)

:::note
The official (and more complete) installation guide is the Eprosima: [micro XRCE-DDS Installation Guide](https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html)
This section summarises the options that have been tested with PX4 during creation of these docs.
:::

### Install Standalone from Source

On Ubuntu you can build from source and install the Agent standalone using the following commands:

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

:::note
There are various build configuration options linked from the corresponding topic in the [official guide]( https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html#installing-the-agent-standalone), but these have not been tested.
:::

To start the agent with settings for connecting to the XRCE-DDS client running on the simulator:

```sh
MicroXRCEAgent udp4 -p 8888
```

### Install from Snap Package

Install from a snap package on Ubuntu using the following command:

```sh
sudo snap install micro-xrce-dds-agent --edge
```

To start the agent with settings for connecting to the XRCE-DDS client running on the simulator (note that the command name is different than if you build the agent locally):

```sh
micro-xrce-dds-agent udp4 -p 8888
```

:::note
At time of writing the stable of version installed from snap connects to PX4 but reports errors creating topics.
The development version, fetched using `--edge` above, does work.
:::

### Build/Run within ROS2 Workspace

The agent can be built and launched within a ROS2 workspace (or build standalone and launched from a workspace.
You must already have installed ROS 2 following the instructions in: [ROS 2 User Guide > Install ROS 2](../ros/ros2_comm.md#install-ros-2).

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
1. Source the ROS2 development environment, in this case "ROS 2 foxy", and compile the workspace using `colcon`:

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

The agent is used to connect to the client over a particular channel, such as UDP, TCP, or a serial connection.
The channel settings are specified when the agent is started, using command line options. 
These are documented in the eProsima user guide: [Micro XRCE-DDS Agent > Agent CLI](https://micro-xrce-dds.docs.eprosima.com/en/latest/agent.html#agent-cli). <!-- what options work? i.e. does PX4 allow CAN? -->

:::note
You should create a single instance of the agent for each channel over which you need to connect.
:::

For example, the PX4 simulator runs the XRCE-DDS client over UDP on port 8888, so to connect to the simulator you would start the agent with the command:

```sh
MicroXRCEAgent udp4 -p 8888
```

On RaspberryPi, if you're using a serial link and connected to the IO pins, you might connect using this command:

```sh
sudo MicroXRCEAgent serial --dev /dev/AMA0 -b 921600
```

### Starting the Client

The XRCE-DDS client module ([microdds-client](../modules/modules_system.md#microdds-client)) is included by default in all firmware and the simulator.
This must be started with appropriate settings for the communication channel that you wish to use to communicate with the agent.

On the simulator the client is automatically started on localhost UDP port 8888 using the default microdds namespace:

```
microdds_client start -t udp -p 8888
```

On flight controller hardware the client should be configured using the [Micro XRCE-DDS parameters](../advanced_config/parameter_reference.md#micro-xrce-dds):

- [XRCE_DDS_0_CFG](../advanced_config/parameter_reference.md#XRCE_DDS_0_CFG): Set the port to connect on, such as `TELEM2`, `Ethernet`, or `Wifi`.
  - [XRCE_DDS_UDP_PRT](../advanced_config/parameter_reference.md#XRCE_DDS_UDP_PRT):
    If using an Ethernet connect, use this to specify the UDP port.
  - [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), [SER_URT6_BAUD](../advanced_config/parameter_reference.md#SER_URT6_BAUD) (and so on):
    If using a serial connection, the baud rate must be set using the `_BAUD` parameter associated with the serial port.
    For example, you'd set a value for `SER_TEL2_BAUD` if you are connecting to the companion using `TELEM2`.
    For more information see [Serial port configuration](../peripherals/serial_configuration.md#serial-port-configuration).

  Some setups might also need these parameters to be set:

  - [XRCE_DDS_KEY](../advanced_config/parameter_reference.md#XRCE_DDS_KEY): The XRCE-DDS key.
    If you're working in a multi-client, single agent configuration, each client should have a unique key.
  - [XRCE_DDS_DOM_ID](../advanced_config/parameter_reference.md#XRCE_DDS_DOM_ID): TBD.

:::note
Many ports are already have a default configuration.
To use these ports you must first disable the existing configuration:

- `TELEM1` and `TELEM2` are set up by default to connect via MAVLink to a GCS and a companion computer (respectively).
  Disable by setting [MAV_0_CONFIG=0](../advanced_config/parameter_reference.md#MAV_0_CONFIG) or [MAV_1_CONFIG=0](../advanced_config/parameter_reference.md#MAV_1_CONFIG) to zero.
  See [MAVLink Peripherals](../peripherals/mavlink_peripherals.md) for more information.
- Other ports can similarly be configured.
  See [Serial port configuration](../peripherals/serial_configuration.md#serial-port-configuration).
:::

Once set, you may need to reboot PX4 for the parameters to take effect. They will then perist through subseqent reboots.


While not recommended, you can also start the [microdds-client](../modules/modules_system.md#microdds-client) using a command line.
This can be called as part of [System Startup](../concept/system_startup.md) or through the [MAVLink Shell](../debug/mavlink_shell.md) (or a system console).
For example:

```sh
microdds_client start -t serial -d /dev/ttyS3 -b 921600
```


## Supported uORB Messages

The set of [PX4 uORB topics](../msg_docs/README.md) that are exposed through the client are set in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/microdds_client/dds_topics.yaml).

The topics are release specific (support is compiled into [microdds-client](../modules/modules_system.md#microdds-client) at build time).
While most releases should support a very similar set of messages, to be certain you would need to check the yaml file for your particular release.
<!-- Jublish the set we use?: https://github.com/PX4/px4_msgs/issues/22 -->

Note that ROS 2/DDS needs to have the _same_ message definitions that were used to create the XRCE-DDS client module in the PX4 Firmware in order to interpret the messages:

- If you're using a main or release version of PX4 you can get these by cloning [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your workspace (branches are provided for each release).
- If you're creating your own new topic you will need to update [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/microdds_client/dds_topics.yaml) and also copy the message definitions out of PX4 source tree into any ROS2 workspace that needs them.
  The messages must be in a folder named `px4_msgs/msg/`.
  
  :::note
  Technically the messages must be in a folder defined by the `type` prefix in the yaml file:
  As you can see below, this is `px4_msgs::msg::`:
  
  ```yaml
  - topic: /fmu/out/vehicle_odometry
    type: px4_msgs::msg::VehicleOdometry
  ```
  :::


### PX4 ROS2 QoS Settings

PX4 QoS settings for publishers are incompatible with the default QoS settings for ROS2 subscribers.
So if ROS2 code needs to subscribe to a uORB topic, it will need to use compatible QoS settings.
One example of which is shown in [ROS 2 User Guide > ROS2 Subscriber QoS Settings](../ros/ros2_comm.md#ros2-subscriber-qos-settings).

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

ROS2 uses the following QoS settings (by default) for publishers and subscriptions: "keep last" for history with a queue size of 10, "reliable" for reliability, "volatile" for durability, and "system default" for liveliness.
Deadline, lifespan, and lease durations are also all set to "default".
<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->

## Helpful Resources

- [ROS2 in PX4: ROS2 in PX4: Technical Details of a Seamless Transition to XRCE-DDS](https://www.youtube.com/watch?v=F5oelooT67E) - Pablo Garrido & Nuno Marques (youtube)
- [PX4 ROS2 offboard tutorial](https://gist.github.com/julianoes/adbf76408663829cd9aed8d14c88fa29) (Github gist - JulianOes)
- [ROS2 PX4 Offboard Tutorial](https://github.com/Jaeyoung-Lim/px4-offboard/blob/2d784532fd323505ac8a6e53bb70145600d367c4/doc/ROS2_PX4_Offboard_Tutorial.md) (Jaeyoung-Lim).



<!---
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
