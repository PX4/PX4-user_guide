---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_communication
---

# 模块参考：通信（Communication）

## frsky_telemetry
Source: [drivers/telemetry/frsky_telemetry](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/drivers/telemetry/frsky_telemetry)

FrSky 数传支持， FrSky Telemetry support. Auto-detects D or S.PORT protocol.
<a id="frsky_telemetry_usage"></a>

### 用法
```
frsky_telemetry <command> [arguments...]
 frsky_telemetry <command> [arguments...]
 Commands:
   start
     [-d <val>]  Select Serial Device
                 values: <file:dev>, default: /dev/ttyS6
     [-t <val>]  Scanning timeout [s] (default: no timeout)
                 default: 0
     [-m <val>]  Select protocol (default: auto-detect)
                 values: sport|sport_single|dtype, default: auto

   stop

   status
```
## mavlink
Source: [modules/mavlink](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/mavlink)


### 描述
此模块实现了 MAVLink 协议，该协议可在串口或 UDP 网络上使用。 This module implements the MAVLink protocol, which can be used on a Serial link or UDP network connection. It communicates with the system via uORB: some messages are directly handled in the module (eg. mission protocol), others are published via uORB (eg. vehicle_command).

流（Stream）被用来以特定速率发送周期性的消息，例如飞机姿态信息。 Streams are used to send periodic messages with a specific rate, such as the vehicle attitude. When starting the mavlink instance, a mode can be specified, which defines the set of enabled streams with their rates. For a running instance, streams can be configured via `mavlink stream` command. 对于一个正在运行的实例而言，可以使用 `mavlink stream` 命令来配置流。

可以存在多个该模块的实例，每个实例连接到一个串口设备或者网络端口。

### 实现
命令的具体实现使用了两个线程，分别为数据发送线程和接收线程。 发送线程以一个固定的速率运行，并会在组合带宽（combined bandwidth）高于设定速率(`-r`)，或者物理链路出现饱和的情况下动态降低信息流的发送速率。 可使用 `mavlink status` 命令检查是否发生降速，如果 `rate mult` 小于 1 则发生了降速。

**Careful**: some of the data is accessed and modified from both threads, so when changing code or extend the functionality, this needs to be take into account, in order to avoid race conditions and corrupt data.

### 示例
在 ttyS1 串口启动 mavlink ，并设定波特率为 921600、最大发送速率为 80kB/s：
```
mavlink start -d /dev/ttyS1 -b 921600 -m onboard -r 80000
```

在 UDP 端口 14556 启动 mavlink 并启用 50Hz 的 HIGHRES_IMU 消息：
```
mavlink start -u 14556 -r 1000000
mavlink stream -u 14556 -s HIGHRES_IMU -r 50
```

<a id="mavlink_usage"></a>

### 用法
```
mavlink <command> [arguments...]
 mavlink <command> [arguments...]
 Commands:
   start         Start a new instance
     [-d <val>]  Select Serial Device
                 values: <file:dev>, default: /dev/ttyS1
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 57600
     [-r <val>]  Maximum sending data rate in B/s (if 0, use baudrate / 20)
                 default: 0
     [-u <val>]  Select UDP Network Port (local)
                 default: 14556
     [-o <val>]  Select UDP Network Port (remote)
                 default: 14550
     [-t <val>]  Partner IP (broadcasting can be enabled via MAV_BROADCAST
                 param)
                 default: 127.0.0.1
     [-m <val>]  Mode: sets default streams and rates
                 values: custom|camera|onboard|osd|magic|config|iridium|minimal,
                 default: normal
     [-n <val>]  wifi/ethernet interface name
                 values: <interface_name>
     [-c <val>]  Multicast address (multicasting can be enabled via
                 MAV_BROADCAST param)
                 values: Multicast address in the range
                 [239.0.0.0,239.255.255.255]
     [-f]        Enable message forwarding to other Mavlink instances
     [-w]        Wait to send, until first message received
     [-x]        Enable FTP
     [-z]        Force flow control always on

   stop-all      Stop all instances

   status        Print status for all instances
     [streams]   Print all enabled streams

   stream        Configure the sending rate of a stream for a running instance
     [-u <val>]  Select Mavlink instance via local Network Port
                 default: 0
     [-d <val>]  Select Mavlink instance via Serial Device
                 values: <file:dev>
     -s <val>    Mavlink stream to configure
     -r <val>    Rate in Hz (0 = turn off, -1 = set to default)

   boot_complete Enable sending of messages. (Must be) called as last step in
                 startup script. (必须) 作为启动脚本的最后一步被调用。
```
## micrortps_client
Source: [modules/micrortps_bridge/micrortps_client](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/micrortps_bridge/micrortps_client)

<a id="micrortps_client_usage"></a>

### 用法
```
micrortps_client <command> [arguments...]
 micrortps_client <command> [arguments...]
 Commands:
   start
     [-t <val>]  Transport protocol
                 values: UART|UDP, default: UART
     [-d <val>]  Select Serial Device
                 values: <file:dev>, default: /dev/ttyACM0
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 460800
     [-p <val>]  Poll timeout for UART in ms
                 default: 1
     [-u <val>]  Interval in ms to limit the update rate of all sent topics
                 (0=unlimited)
                 default: 0
     [-l <val>]  Limit number of iterations until the program exits
                 (-1=infinite)
                 default: 10000
     [-w <val>]  Time in ms for which each iteration sleeps
                 default: 1
     [-r <val>]  Select UDP Network Port for receiving (local)
                 default: 2019
     [-s <val>]  Select UDP Network Port for sending (remote)
                 default: 2020

   stop

   status
```
## uorb
Source: [systemcmds/uorb](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/uorb)


### 描述
uORB 是各模块之间进行通讯的基于 发布-订阅 机制的内部消息传递系统。

### 用法
The implementation is asynchronous and lock-free, ie. a publisher does not wait for a subscriber and vice versa. This is achieved by having a separate buffer between a publisher and a subscriber.

The code is optimized to minimize the memory footprint and the latency to exchange messages.

Messages are defined in the `/msg` directory. They are converted into C/C++ code at build-time.

该接口基于文件描述符（file descriptor）实现：它在内部使用 `read`、`write` 和 `ioctl`。 The interface is based on file descriptors: internally it uses `read`, `write` and `ioctl`. Except for the publications, which use `orb_advert_t` handles, so that they can be used from interrupts as well (on NuttX).

### 示例
Messages are defined in the `/msg` directory. They are converted into C/C++ code at build-time. 在构建时它们会被转化为 C/C++ 代码。
```
uorb top
```

<a id="uorb_usage"></a>

### 用法
```
uorb <command> [arguments...]
 uorb <command> [arguments...]
 Commands:
   start

   status        Print topic statistics

   top           Monitor topic publication rates
     [-a]        print all instead of only currently publishing topics
     [<filter1> [<filter2>]] topic(s) to match (implies -a)
```
