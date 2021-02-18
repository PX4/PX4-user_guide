# RTPS/ROS2 接口：PX4-FastRTPS桥接

The *PX4-Fast RTPS(DDS) Bridge*, which is also referred to as as the *microRTPS Bridge*, adds a Real Time Publish Subscribe (RTPS) interface to PX4, enabling the exchange of [uORB messages](../middleware/uorb.md) between PX4 components and (offboard) *Fast DDS* applications. This allows us to better integrate with applications running and linked in DDS domains (including ROS nodes), making it easy to share sensor data, commands, and other vehicle information.

This topic describes the RTPS/DDS bridge architecture, and shows how to write a simple *Fast DDS* application to subscribe to PX4 changes.

本主题介绍RTPS桥接体系结构 (以及如何在 ROS2/ROS 应用程序管道中使用它)。 还演示了如何编译所需的代码, 以便:

当您需要在飞行控制器和offboard部件之间可靠地共享时间敏感/实时信息时, 应使用RTPS。 特别是, 在off-board软件需要 (通过发送和接收 uORB主题) 成为 px4 中运行的软件组件的 *伙伴* 的情况下，它非常有用。
:::

:::note RTPS
has been adopted as the middleware for the ROS 2 (Robot Operating System).

For information about how to use this interface within the ROS 2 applications and development workflows, see [PX4-ROS 2 bridge](../ros/ros2_comm.md).
:::


## 什么时候应该使用 RTPS？

RTPS should be used when you need to reliably share time-critical/real-time information between the flight controller and offboard components. In particular it is useful in cases where offboard software needs to become a *peer* of software components running in PX4 (by sending and receiving uORB topics).

Possible use cases include communicating with robotics libraries for computer vision, and other use cases where real-time data to/from actuators and sensors is essential for vehicle control.

:::note
*Fast DDS* is not intended as a replacement for MAVLink. MAVLink remains the most appropriate protocol for communicating with ground stations, gimbals, cameras, and other offboard components (although *Fast DDS* may open other opportunities for working with some peripherals).
:::

:::tip RTPS
can be used over slower links (e.g. radio telemetry), but care should be taken not to overload the channel.
:::


## 架构概述

### RTPS 桥接

将 ROS 应用程序与 PX4 集成的体系结构如下所示。

![basic example flow](../../assets/middleware/micrortps/architecture.png)

The main elements of the architecture are the client and agent processes shown in the diagram above.

- *Client* 是在飞行控制器上运行的 PX4 中间件守护进程。 它订阅由其他 PX4 组件发布的 uORB 主题, 并将更新发送给 *Agent* (通过 UART 或 UDP 端口)。 它还接收来自 *Agent* 的消息, 转换为 PX4 上的 uORB 消息并重新发布。
- *Agent* 在Offboard计算机上作为守护进程运行。 它监视来自 *Client* 的 uORB 消息更新, 并通过RTPS (重新) 发布这些消息。 它还订阅来自其他 RTPS 应用程序的 "uORB" RTPS 消息, 并直接转发给 *Client*。
- *Agent* 和 *Client* 通过串行链路 (UART) 或 UDP 网络进行连接。 uORB 信息事先经过了 [CDR 序列化 ](https://en.wikipedia.org/wiki/Common_Data_Representation) 处理 (*CDR 序列化 * 提供了一种在不同平台之间交换串行数据的通用格式)。
- *Agent* 和任何 *Fast RTPS* 应用程序之间都是通过 UDP 连接的, 二者可以运行在同一设备上，也可以运行在不同设备上。 在一种典型的配置中, 它们运行于同一系统 (例如, 开发计算机、Linux 配套计算机或计算机板) 上, 通过 Wifi或 USB 连接到 *Client*。


## 代码生成

:::note
[Fast DDS 2.0.0 and Fast-RTPS-Gen 1.0.4 or later must be installed](../dev_setup/fast-dds-installation.md) in order to generate the required code!
:::


### ROS2/ROS 应用处理流程

All the code needed to create, build and use the bridge is automatically generated when PX4-Autopilot is compiled.

The *Client* application is also compiled and built into the firmware as part of the normal build process. The *Agent* must be separately/manually compiled for the target computer.

:::tip
The bridge code can also be [manually generated](micrortps_manual_code_generation.md). Most users will not need to do so, but the linked topic provides a more detailed overview of the build process and can be useful for troubleshooting.
:::


## 支持的 uORB 消息

The generated bridge code will enable a specified subset of uORB topics to be published/subscribed via RTPS. This is true for both ROS or non-ROS applications.

For *automatic code generation* there's a *yaml* definition file in the PX4 **PX4-Autopilot/msg/tools/** directory called **uorb_rtps_message_ids.yaml**. This file defines the set of uORB messages to be used with RTPS, whether the messages are to be sent, received or both, and the RTPS ID for the message to be used in DDS/RTPS middleware.

生成的桥接代码将允许通过 RTPS 发布/订阅部分 uORB 主题。 这对于 ROS 或非 ROS 应用程序都是适用的。

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

<a id="client_firmware"></a>

## 客户端 (PX4固件)

The *Client* source code is generated, compiled and built into the PX4 firmware as part of the normal build process.

To build the firmware for NuttX/Pixhawk flight controllers use the `_rtps` feature in the configuration target. For example, to build RTPS for px4_fmu-v4:
```sh
make px4_fmu-v4_rtps
```

To build the firmware for a SITL target:
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

:::note
By default the *Client* runs as a daemon, but you will need to start it manually. The PX4 Firmware initialization code may in future automatically start the *Client* as a permanent daemon process.
:::

For example, in order to run the *Client* daemon with SITL connecting to the Agent via UDP, start the daemon as shown:

```sh
micrortps_client start -t UDP
```


## 与 ROS 无关的 Offboard Fast RTPS 接口中的代理端

编译PX4固件时，相关的*Agent*代码会自动被 *生成*。 生成的源代码在这个目录下: **build/<target-platform>/src/modules/micrortps_bridge/micrortps_client/micrortps_agent/**.

To build the *Agent* application, compile the code:

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

为了构建 *Agent* 应用, 运行如下编译命令:

As an example, to start the *micrortps_agent* with connection through UDP, issue:

```sh
./micrortps_agent -t UDP
```


## 面向 ROS2 中间件的代理端接口

要在一台 Ubuntu 18.04 机器上安装 ROS Melodic 和 ROS2 Bouncy, 分别参考如下链接:

This example shows how to create a *Fast DDS* "listener" application that subscribes to the `sensor_combined` topic and prints out updates (from PX4). A connected RTPS application can run on any computer on the same network as the *Agent*. For this example the *Agent* and *Listener application* will be on the same computer.

The *fastrtpsgen* script can be used to generate a simple RTPS application from an IDL message file.

:::note RTPS
messages are defined in IDL files and compiled to C++ using *fastrtpsgen*. As part of building the bridge code, IDL files are generated for the uORB message files that may be sent/received (see **build/BUILDPLATFORM/src/modules/micrortps_bridge/micrortps_agent/idl/*.idl**). These IDL files are needed when you create a *Fast DDS* application to communicate with PX4.
:::

Enter the following commands to create the application:

```sh
cd /path/to/PX4/PX4-Autopilot/build/px4_sitl_rtps/src/modules/micrortps_bridge
mkdir micrortps_listener
cd micrortps_listener
fastrtpsgen -example x64Linux2.6gcc ../micrortps_client/micrortps_agent/idl/sensor_combined.idl
```

This creates a basic subscriber and publisher, and a main-application to run them. To print out the data from the `sensor_combined` topic, modify the `onNewDataMessage()` method in **sensor_combined_Subscriber.cxx**:

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
$ source clean_all.bash --ros1_ws_dir &lt;path/to/px4_ros_com_ros1/ws&gt;
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

:::note
If the *Listener application* does not print anything, make sure the *Client* is running.
:::


## 构建 `px4_ros_com` 程序包

一旦 *Client* (在飞行控制器上) 和 *Agent* (在一台 offboard 计算机上) 同时运行并且成功互联, *Fast RTPS* 应用就可以通过 RTPS 发布或订阅PX4 上的 uORB 消息。


## 创建一个 Fast RTPS 监听应用

### 独立于 ROS 的应用程序

下面这个例子演示了怎样创建一个订阅了 `sensor_combined` 主题并打印 (来自PX4) 的消息更新的 *Fast RTPS* "监听" 应用。 一个已连接的 RTPS 应用可以在与 *Agent* 同一网段的任何计算机上运行。

*fastrtpsgen* 脚本可以从 IDL 消息文件创建一个简单的 RTPS 应用。
```sh
make -f makefile_x64Linux2.6gcc
bin/*/sensor_combined_PublisherSubscriber subscriber
```
:::


### ROS2/ROS 应用

The *Agent* code is generated using a *Fast DDS* tool called *fastrtpsgen*.

要在Linux上构建并运行该应用：

On Linux/Mac this is done as shown below:

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
This should not be a problem if [Fast DDS is installed in the default location](../dev_setup/fast-dds-installation.md).
:::


### 分别安装 ROS 和 ROS2

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

   In the menu showed go to **Interfacing options > Serial**. Select **NO** for *Would you like a login shell to be accessible over serial?*. Valid and reboot.
1. Check UART in kernel:

   ```sh
   sudo vi /boot/config.txt
   ```

   And make sure that the `enable_uart` value is set to 1:
   ```
    enable_uart=1
   ```


## 创建一个 ROS2 监听器

* [Fast DDS Installation](../dev_setup/fast-dds-installation.md)
* [Manually Generate Client and Agent Code](micrortps_manual_code_generation.md)
