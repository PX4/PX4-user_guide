# RTPS/ROS2 Interface: PX4-FastRTPS Bridge

The *PX4-FastRTPS Bridge* adds a Real Time Publish Subscribe (RTPS) interface to PX4, enabling the exchange of [uORB messages](../middleware/uorb.md) between PX4 components and (offboard) *Fast RTPS* applications (including those built using the ROS2/ROS frameworks).

> **Note** RTPS is the underlying protocol of the Object Management Group's (OMG) Data Distribution Service (DDS) standard.
  It aims to enable scalable, real-time, dependable, high-performance and inter-operable data communication using the publish/subscribe pattern.
  *Fast RTPS* is a very lightweight cross-platform implementation of the latest version of the RTPS protocol and a minimum DDS API.

RTPS has been adopted as the middleware for the ROS2 (Robot Operating System).
The *Fast RTPS bridge* allows us to better integrate with ROS2, making it easy to share sensor values, commands, and other vehicle information.

This topic describes the RTPS bridge architecture (and how it is used within the ROS2/ROS application pipeline).
It also shows how to compile needed code to:
1. Write a simple *Fast RTPS* application to subscribe to PX4 changes
1. Connect ROS2 nodes with PX4 (via the RTPS Bridge, and using the `px4_ros_com` package)
1. Connect ROS (ROS "version 1") nodes with PX4 by additionally using the `ros1_bridge` package to bridge ROS2 and ROS.


## When should RTPS be used?

RTPS should be used when you need to reliably share time-critical/real-time information between the flight controller and off board components.
In particular it is useful in cases where off-board software needs to become a *peer* of software components running in PX4 (by sending and receiving uORB topics).

Possible use cases include communicating with robotics libraries for computer vision, and other use cases where real time data to/from actuators and sensors is essential for vehicle control.

> **Note** *Fast RTPS* is not intended as a replacement for MAVLink.
  MAVLink remains the most appropriate protocol for communicating with ground stations, gimbals, cameras, and other offboard components (although *Fast RTPS* may open other opportunities for working with some peripherals).

<span></span>
> **Tip** RTPS can be used over slower links (e.g. radio telemetry), but care should be taken not to overload the channel.


## Architectural overview

### RTPS Bridge

The RTPS bridge exchanges messages between PX4 and RTPS applications, seamlessly converting between the [uORB](../middleware/uorb.md) and RTPS messages used by each system.

![basic example flow](../../assets/middleware/micrortps/architecture.png)

The main elements of the architecture are the client and agent processes shown in the diagram above.

- The *Client* is PX4 middleware daemon process that runs on the flight controller.
  It subscribes to uORB topics published by other PX4 components and sends any updates to the *Agent* (via a UART or UDP port).
  It also receives messages from the *Agent* and publishes them as uORB message on PX4.
- The *Agent* runs as a daemon process on an offboard computer.
  It watches for uORB update messages from the *Client* and (re)publishes them over RTPS.
  It also subscribes to "uORB" RTPS messages from other RTPS applications and forwards them to the *Client*.
- The *Agent* and *Client* are connected via a serial link (UART) or UDP network.
  The uORB information is [CDR serialized](https://en.wikipedia.org/wiki/Common_Data_Representation) for sending (*CDR serialization* provides a common format for exchanging serial data between different platforms).
- The *Agent* and any *Fast RTPS* applications are connected via UDP, and may be on the same or another device.
  In a typical configuration they will both be on the same system (e.g. a development computer, Linux companion computer or compute board), connected to the *Client* over a Wifi link or via USB.


### ROS2/ROS application pipeline

The application pipeline for ROS2 is very straightforward!
Because ROS2 uses DDS/RTPS as its native communications middleware, you can create a ROS2 listener or advertiser node to publish and subscribe to uORB data on PX4, via the *PX4 Fast RTPS Bridge*.
This is shown below.

> **Note** You do need to make sure that the message types, headers and source files used on both client and agent side (and consequently, on the ROS nodes) are generated from the same Interface Description Language (IDL) files.
  The `px4_ros_com` package provides the needed infrastructure for generating messages and headers needed by ROS2.

![Architecture with ROS2](../../assets/middleware/micrortps/architecture_ros2.png)

The architecture for integrating ROS applications with PX4 is shown below.

![Architecture with ROS](../../assets/middleware/micrortps/architecture_ros.png)

Note the use of [ros1_bridge](https://github.com/ros2/ros1_bridge), which bridges messages between ROS2 and ROS.
This is needed because the first version of ROS does not support RTPS.


## Code generation

> **Note** [Fast RTPS 1.8.2 and FastRTPSGen 1.0.4 or later must be installed](../setup/fast-rtps-installation.md) in order to generate the required code!

### ROS-independent applications

All the code needed to create, build and use the bridge is automatically generated when PX4-Autopilot is compiled.

The *Client* application is also compiled and built into the firmware as part of the normal build process.
The *Agent* must be separately/manually compiled for the target computer.

<span></span>
> **Tip** The bridge code can also be [manually generated](micrortps_manual_code_generation.md).
  Most users will not need to do so, but the linked topic provides a more detailed overview of the build process and can be useful for troubleshooting.

<a id="px4_ros_com"></a>
### ROS2/ROS applications

The [px4_ros_com](https://github.com/PX4/px4_ros_com) package, when built, generates everything needed to access PX4 uORB messages from a ROS2 node (for ROS you also need [ros1_bridge](https://github.com/ros2/ros1_bridge)).
This includes all the required components of the *PX4 RTPS bridge*, including the `micrortps_agent` and the IDL files (required by the `micrortps_agent`).

The ROS and ROS2 message definition headers and interfaces are generated from the [px4_msgs](https://github.com/PX4/px4_msgs) package, which match the uORB messages counterparts under PX4-Autopilot.
These are required by `px4_ros_com` when generating the IDL files to be used by the `micrortps_agent`.

Both `px4_ros_com` and `px4_msgs` packages have two separate branches:
- a `master` branch, used with ROS2.
  It contains code to generate all the required ROS2 messages and IDL files to bridge PX4 with ROS2 nodes.
- a `ros1` branch, used with ROS.
  It contains code to generate the ROS message headers and source files, which can be used *with* the `ros1_bridge` to share data between PX4 and ROS.

Both branches in `px4_ros_com` additionally include some example listener and advertiser example nodes.


## Supported uORB messages

The generated bridge code will enable a specified subset of uORB topics to be published/subscribed via RTPS.
This is true for both ROS or non-ROS applications.

For *automatic code generation* there's a *yaml* definition file in the PX4 **PX4-Autopilot/msg/tools/** directory called **uorb_rtps_message_ids.yaml**.
This file defines the set of uORB messages to be used with RTPS, whether the messages are to be sent, received or both, and the RTPS ID for the message to be used in DDS/RTPS middleware.

> **Note** An RTPS ID must be set for all messages.

```yaml
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
```

> **Note** An API change in ROS2 Dashing means that we now use the `rosidl_generate_interfaces()` CMake module (in `px4_msgs`) to generate the IDL files that we require for microRTPS agent generation (in `px4_ros_com`).
> PX4-Autopilot includes a template for the IDL file generation, which is only used during the PX4 build process.
>
> The `px4_msgs` build generates *slightly different* IDL files for use with ROS2/ROS (than are built for PX4 firmware).
> The **uorb_rtps_message_ids.yaml** is transformed in a way that the message names become *PascalCased*
> (the name change is irrelevant to the client-agent communication, but is critical for ROS2, since the message naming must follow the PascalCase convention).
> The new IDL files also reverse the messages that are sent and received
> (required because if a message is sent from the client side, then it's received on the agent side, and vice-versa).


<a id="client_firmware"></a>
## Client (PX4/PX4-Autopilot)

The *Client* source code is generated, compiled and built into the PX4 firmware as part of the normal build process.

To build the firmware for NuttX/Pixhawk flight controllers use the `_rtps` feature in the configuration target.
For example, to build RTPS for px4_fmu-v4:
```sh
make px4_fmu-v4_rtps
```

To build the firmware for a SITL target:
```sh
make px4_sitl_rtps
```

The *Client* application can be launched from [NuttShell/System Console](../debug/system_console.md).
The command syntax is shown below (you can specify a variable number of arguments):

```sh
> micrortps_client start|stop|status [options]
  -t <transport>          [UART|UDP] Default UART
  -d <device>             UART device. Default /dev/ttyACM0
  -l <loops>              How many iterations will this program have. -1 for infinite. Default -1.
  -w <sleep_time_ms>      Time in ms for which each iteration sleep. Default 1ms
  -b <baudrate>           UART device baudrate. Default 460800
  -p <poll_ms>            Time in ms to poll over UART. Default 1ms
  -r <reception port>     UDP port for receiving. Default 2019
  -s <sending port>       UDP port for sending. Default 2020
  -i <ip_address>         Select IP address (remote) values: <x.x.x.x>. Default: 127.0.0.1
```

> **Note** By default the *Client* runs as a daemon, but you will need to start it manually.
  The PX4 Firmware initialization code may in future automatically start the *Client* as a permanent daemon process.

For example, in order to run the *Client* daemon with SITL connecting to the Agent via UDP, start the daemon as shown:

```sh
micrortps_client start -t UDP
```

## Agent in a ROS-independent Offboard Fast RTPS interface

The *Agent* code is automatically *generated* when you build the associated PX4 firmware.
You can find the source here: **build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent/**.

To build the *Agent* application, compile the code:

```sh
cd build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent
mkdir build && cd build
cmake ..
make
```

> **Note** To cross-compile for the *Qualcomm Snapdragon Flight* platform see [this link](https://github.com/eProsima/PX4-FastRTPS-PoC-Snapdragon-UDP#how-to-use).


The command syntax for the *Agent* is listed below:

```sh
$ ./micrortps_agent [options]
  -t <transport>          [UART|UDP] Default UART.
  -d <device>             UART device. Default /dev/ttyACM0.
  -w <sleep_time_us>      Time in us for which each iteration sleep. Default 1ms.
  -b <baudrate>           UART device baudrate. Default 460800.
  -p <poll_ms>            Time in ms to poll over UART. Default 1ms.
  -r <reception port>     UDP port for receiving. Default 2019.
  -s <sending port>       UDP port for sending. Default 2020.
```

To launch the *Agent*, run `micrortps_agent` with appropriate options for specifying the connection to the *Client* (the default options connect from a Linux device to the *Client* over a UART port).

As an example, to start the *micrortps_agent* with connection through UDP, issue:

```sh
./micrortps_agent -t UDP
```

## Agent interfacing with a ROS2 middleware

Building `px4_ros_com` automatically generates and builds the agent application, though it requires (as a dependency), that the `px4_msgs` package also gets build on the same ROS2 workspace (or overlaid from another ROS2 workspace).
Since it is also installed using the [`colcon`](http://design.ros2.org/articles/build_tool.html) build tools, running it works exactly the same way as the above.
Check the **Building the `px4_ros_com` package** for details about the build structure.


## Building the `px4_ros_com` and `px4_msgs` package

Install and setup both ROS2 and ROS environments on your development machine
and separately clone the `px4_ros_com` and `px4_msgs` repo for both the `master` and `ros1` branches (see [above for more information](#px4_ros_com)).

> **Note** Only the master branch is needed for ROS2 (both are needed to target ROS).

### Installing ROS and ROS2 and respective dependencies

> **Note** This install and build guide covers ROS Melodic and ROS2 Dashing (ROS2 Ardent, Bouncy or Crystal are not covered as they are EOL).

In order to install ROS Melodic and ROS2 Dashing (officially supported) on a Ubuntu 18.04 machine, follow the links below, respectively:
1. [Install ROS Melodic](http://wiki.ros.org/melodic/Installation/Ubuntu)
1. [Install ROS2 Dashing](https://index.ros.org/doc/ros2/Installation/Dashing/Linux-Install-Debians/)
1. The install process should also install the *colcon* build tools, but in case that doesn't happen, you can install the tools manually:

   ```sh
   sudo apt install python3-colcon-common-extensions
   ```

1. *eigen3_cmake_module* is also required, since Eigen3 is used on the transforms library:

   ```sh
   sudo apt install ros-dashing-eigen3-cmake-module
   ```

1. *setuptools* must also be installed (using *pip* or *apt*):

   ```sh
   sudo pip3 install -U setuptools
   ```

   > **Caution** Do not install the `ros1_bridge` package through the deb repository.
     The package must be built from source.

### Setting up the workspaces

Since the ROS2 and ROS require different environments you will need a separate workspace for each ROS version.
As an example:

1. For ROS2, create a workspace using:
   ```sh
   mkdir -p ~/px4_ros_com_ros2/src
   ```

   Then, clone the respective ROS2 (`master`) branch to the `/src` directory:
   ```sh
   $ git clone https://github.com/PX4/px4_ros_com.git ~/px4_ros_com_ros2/src/px4_ros_com # clones the master branch
   $ git clone https://github.com/PX4/px4_msgs.git ~/px4_ros_com_ros2/src/px4_msgs
   ```

1. For ROS, follow exactly the same process, but create a different directory and clone a different branch:
   ```sh
   mkdir -p ~/px4_ros_com_ros1/src
   ```

   Then, clone the respective ROS2 (`ros1`) branch to the `/src` directory:
   ```sh
   $ git clone https://github.com/PX4/px4_ros_com.git ~/px4_ros_com_ros1/src/px4_ros_com -b ros1 # clones the 'ros1' branch
   $ git clone https://github.com/PX4/px4_msgs.git ~/px4_ros_com_ros1/src/px4_msgs -b ros1
   ```

### Building the workspaces

The directory `px4_ros_com/scripts` contains multiple scripts that can be used to build both workspaces.

To build both workspaces with a single script, use the `build_all.bash`.
Check the usage with `source build_all.bash --help`.
The most common way of using it is by passing the ROS(1) workspace directory path and also the PX4-Autopilot directory path:

```sh
$ source build_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws>
```

   > **Note** Using the `--verbose` argument will allow you to see the full *colcon* build output.

   > **Note** The build process will open new tabs on the console, corresponding to different stages of the build process that need to have different environment configurations sourced.

One can also use the following individual scripts in order to build the individual parts:

- `build_ros1_bridge.bash`, to build the `ros1_bridge`;
- `build_ros1_workspace.bash` (only on the `ros1` branch of `px4_ros_com`), to build the ROS1 workspace to where the `px4_ros_com` and `px4_msgs` `ros1` branches were cloned;
- `build_ros2_workspace.bash`, to build the ROS2 workspace to where the `px4_ros_com` and `px4_msgs` `master` branches were cloned;

The steps below show how to *manually* build the packages (provided for your information/better understanding only):

1. `cd` into `px4_ros_com_ros2` dir and source the ROS2 environment.
   Don't mind if it tells you that a previous workspace was set before:

   ```sh
   source /opt/ros/dashing/setup.bash
   ```

1. Clone the `ros1_bridge` package so it can be built on the ROS2 workspace:

   ```sh
   git clone https://github.com/ros2/ros1_bridge.git -b dashing ~/px4_ros_com_ros2/src/ros1_bridge
   ```

1. Build the `px4_ros_com` and `px4_msgs` packages, excluding the `ros1_bridge` package:

   ```sh
   colcon build --symlink-install --packages-skip ros1_bridge --event-handlers console_direct+
   ```

   > **Note** `--event-handlers console_direct+` only serves the purpose of adding verbosity to the `colcon` build process and can be removed if one wants a more "quiet" build.

1. Then, follows the process of building the ROS(1) packages side.
   For that, one requires to open a new terminal window and source the ROS(1) environment that has installed on the system:

   ```sh
   source /opt/ros/melodic/setup.bash
   ```

1. On the terminal of the previous step, build the `px4_ros_com` and `px4_msgs` packages on the ROS end:

   ```sh
   cd ~/px4_ros_com_ros1 && colcon build --symlink-install --event-handlers console_direct+
   ```

1. Before building the `ros1_bridge`, one needs to open a new terminal and then source the environments and workspaces following the order below:

   ```sh
   source ~/px4_ros_com_ros1/install/setup.bash
   source ~/px4_ros_com_ros2/install/setup.bash
   ```

1. Finally, build the `ros1_bridge`.
   Note that the build process may consume a lot of memory resources.
   On a resource limited machine, reduce the number of jobs being processed in parallel (e.g. set environment variable `MAKEFLAGS=-j1`).
   For more details on the build process, see the build instructions on the [ros1_bridge](https://github.com/ros2/ros1_bridge) package page.
   ```sh
   cd ~/px4_ros_com_ros2 && colcon build --symlink-install --packages-select ros1_bridge --cmake-force-configure --event-handlers console_direct+
   ```

### Cleaning the workspaces

After building the workspaces there are many files that must be deleted before you can do a clean/fresh build (for example, after you have changed some code and want to rebuild).
Unfortunately *colcon* does not currently have a way of cleaning the generated **build**, **install** and **log** directories, so these directories must be deleted manually.

The **clean_all.bash** script (in **px4_ros_com/scripts**) is provided to ease this cleaning process.
The most common way of using it is by passing it the ROS(1) workspace directory path (since it's usually not on the default path):

```sh
$ source clean_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws>
```

## Creating a Fast RTPS Listener application

Once the *Client* (on the flight controller) and the *Agent* (on an offboard computer) are running and connected, *Fast RTPS* applications can publish and subscribe to uORB topics on PX4 using RTPS.

This example shows how to create a *Fast RTPS* "listener" application that subscribes to the `sensor_combined` topic and prints out updates (from PX4).
A connected RTPS application can run on any computer on the same network as the *Agent*.
For this example the *Agent* and *Listener application* will be on the same computer.

The *fastrtpsgen* script can be used to generate a simple RTPS application from an IDL message file.

> **Note** RTPS messages are defined in IDL files and compiled to C++ using *fastrtpsgen*.
  As part of building the bridge code, IDL files are generated for the uORB message files that may be sent/received (see **build/BUILDPLATFORM/src/modules/micrortps_bridge/micrortps_agent/idl/*.idl**).
  These IDL files are needed when you create a *Fast RTPS* application to communicate with PX4.

Enter the following commands to create the application:

```sh
cd /path/to/PX4/PX4-Autopilot/build/px4_sitl_rtps/src/modules/micrortps_bridge
mkdir micrortps_listener
cd micrortps_listener
fastrtpsgen -example x64Linux2.6gcc ../micrortps_client/micrortps_agent/idl/sensor_combined.idl
```

This creates a basic subscriber and publisher, and a main-application to run them.
To print out the data from the `sensor_combined` topic, modify the `onNewDataMessage()` method in **sensor_combined_Subscriber.cxx**:

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

To build and run the application on Linux:

```sh
make -f makefile_x64Linux2.6gcc
bin/*/sensor_combined_PublisherSubscriber subscriber
```

Now you should see the sensor information being printed out:

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

## Creating a ROS2 listener

With the `px4_ros_com` built successfully, one can now take advantage of the generated *micro-RTPS* agent app and also from the generated sources and headers of the ROS2 msgs from `px4_msgs`, which represent a one-to-one matching with the uORB counterparts.

To create a listener node on ROS2, lets take as an example the `sensor_combined_listener.cpp` node under `px4_ros_com/src/listeners`:

```cpp
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/sensor_combined.hpp>
```

The above brings to use the required C++ libraries to interface with the ROS2 middleware.
It also includes the required message header file.

```cpp
/**
 * @brief Sensor Combined uORB topic data callback
 */
class SensorCombinedListener : public rclcpp::Node
{
```

The above creates a `SensorCombinedListener` class that subclasses the generic `rclcpp::Node` base class.

```cpp
public:
	explicit SensorCombinedListener() : Node("sensor_combined_listener") {
		subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>(
			"SensorCombined_PubSubTopic", 10,
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

This creates a callback function for when the `sensor_combined` uORB messages are received (now as DDS messages).
It outputs the content of the message fields each time the message is received.

```cpp
private:
	rclcpp::Subscription<px4_msgs::msg::SensorCombined>::SharedPtr subscription_;
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


## Creating a ROS2 advertiser

A ROS2 advertiser node publishes data into the DDS/RTPS network (and hence to PX4).

Taking as an example the `debug_vect_advertiser.cpp` under `px4_ros_com/src/advertisers`:

```cpp
#include <chrono>
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/debug_vect.hpp>

using namespace std::chrono_literals;
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
		publisher_ = this->create_publisher<px4_msgs::msg::DebugVect>("DebugVect_PubSubTopic", 10);
		auto timer_callback =
		[this]()->void {
			auto debug_vect = px4_msgs::msg::DebugVect();
			debug_vect.timestamp = this->now().nanoseconds() * 1E-3;
			std::string name = "test";
			std::copy(name.begin(), name.end(), debug_vect.name.begin());
			debug_vect.x = 1.0;
			debug_vect.y = 2.0;
			debug_vect.z = 3.0;
			RCLCPP_INFO(this->get_logger(), "\033[97m Publishing debug_vect: time: %f x:%f y:%f z:%f \033[0m",
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

This creates a function for when messages are to be sent.
The messages are sent based on a timed callback, which sends two messages per second based on a timer.

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

The instantiation of the `DebugVectAdvertiser` class as a ROS node is done on the `main` function.

## Creating a ROS(1) listener

The creation of ROS nodes is a well known and documented process.
An example of a ROS listener for `sensor_combined` messages can be found in the `ros1` branch repo, under `px4_ros_com/src/listeners`.

## Examples/tests of ROS-independent apps

The following examples provide additional real-world demonstrations of how to use the features described in this topic.

* [Throughput test](../middleware/micrortps_throughput_test.md): A simple test to measure the throughput of the bridge.

## Testing the PX4-FastRPTS bridge with ROS2 and ROS

To quickly test the package (using PX4 SITL with Gazebo):

1. Start PX4 SITL with Gazebo using:
   ```sh
   make px4_sitl_rtps gazebo
   ```

1. On one terminal, source the ROS2 environment and workspace and launch the `ros1_bridge` (this allows ROS2 and ROS nodes to communicate with each other).
   Also set the `ROS_MASTER_URI` where the `roscore` is/will be running:
   ```sh
   $ source /opt/ros/dashing/setup.bash
   $ source ~/px4_ros_com_ros2/install/local_setup.bash
   $ export ROS_MASTER_URI=http://localhost:11311
   $ ros2 run ros1_bridge dynamic_bridge
   ```

1. On another terminal, source the ROS workspace and launch the `sensor_combined` listener node.
   Since you are launching through `roslaunch`, this will also automatically start the `roscore`:
   ```sh
   $ source ~/px4_ros_com_ros1/install/setup.bash
   $ roslaunch px4_ros_com sensor_combined_listener.launch
   ```

1. On a terminal, source the ROS2 workspace and then start the `micrortps_agent` daemon with UDP as the transport protocol:
   ```sh
   $ source ~/px4_ros_com_ros2/install/setup.bash
   $ micrortps_agent -t UDP
   ```

1. On the [NuttShell/System Console](../debug/system_console.md), start the `micrortps_client` daemon also in UDP:
   ```sh
   > micrortps_client start -t UDP
   ```

   Now you will be able to see the data being printed on the terminal/console where you launched the ROS listener:

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

   You can also verify the rate of the message using `rostopic hz`.
   For the case of `sensor_combined`:
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

1. You can also test the `sensor_combined` ROS2 listener by typing in a terminal:
   ```sh
   $ source ~/px4_ros_com_ros2/install/local_setup.bash
   $ ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```

And it should also get data being printed to the console output.

> **Note** If ones uses the `build_all.bash` script, it automatically open and source all the required terminals so one just has to run the respective apps in each terminal.

## Troubleshooting

### Client reports that selected UART port is busy

If the selected UART port is busy, it's possible that the MAVLink application is already being used.
If both MAVLink and RTPS connections are required you will have to either move the connection to use another port or configure the port so that it can be shared.
<!-- https://github.com/PX4/Devguide/issues/233 -->

> **Tip** A quick/temporary fix to allow bridge testing during development is to stop MAVLink from *NuttShell*:
  ```sh
  mavlink stop-all
  ```

### Agent not built/fastrtpsgen is not found

The *Agent* code is generated using a *Fast RTPS* tool called *fastrtpsgen*.

If you haven't installed Fast RTPS in the default path then you must specify its installation directory by setting the `FASTRTPSGEN_DIR` environment variable before executing *make*.

On Linux/Mac this is done as shown below:

```sh
export FASTRTPSGEN_DIR=/path/to/fastrtps/install/folder/bin
```

> **Note** This should not be a problem if [Fast RTPS is installed in the default location](../setup/fast-rtps-installation.md).

### Enable UART on an OBC (onboard computer)

For UART transport on a Raspberry Pi or any other OBC you will have to enable the serial port:

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

## Additional information

* [Fast RTPS Installation](../setup/fast-rtps-installation.md)
* [Manually Generate Client and Agent Code](micrortps_manual_code_generation.md)
* [DDS and ROS middleware implementations](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
