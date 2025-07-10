---
canonicalUrl: https://docs.px4.io/main/zh/advanced/rtk_gps
---

# RTK GPS (PX4 集成)

[实时载波相位差分定位](https://en.wikipedia.org/wiki/Real_Time_Kinematic) （RTK）能够提供厘米级的定位信息。 这一章节将介绍 RTK 是如何集成到 PX4 中的。

::::tip RTK GPS *使用说明* 在  [硬件外设 > RTK GPS](../gps_compass/rtk_gps.md)中。 多个移动的用户可以共用同一个差分基准站发播的差分修正信息，移动用户离差分基准站的距离越近，差分定位更精确。

## 综述

RTK是使用导航信号的载波相位来进行测距的，而不是使用导航信号所搭载的信息。 它依靠一个单一的参考基站站实时校正，这种校正可以与多个流动站一起工作。

PX4 配置 RTK 需要两个 RTK GPS 模块和一个数传。 固定在地面端的 GPS 单元叫基站（ *Base*），在空中的单元叫移动站（*Rover*）。 基站通过 USB 连接到地面站*QGroundControl*，同时使用数传将 RTCM 校正流传给无人机（使用 MAVLink [GPS_RTCM_DATA](https://mavlink.io/en/messages/common.html#GPS_RTCM_DATA) 消息）。 在自驾仪上，MAVLink消息包被解包得到RTCM的修正信息，并把这些信息发送给移动站，移动站结合修正信息最终解算得到 RTK 解。

数据链通常能够处理上行数据率为300字节每秒的数据（更详细的信息参考下面的[上行数据速率](#uplink-datarate)章节）。

## 支持的 RTK GPS 模块

下面列举的这些设备是经过我们测试的可以在 [用户手册](../gps_compass/rtk_gps.md#supported-rtk-devices) 找到。

:::note
大多数设备都有两个变体, 一个基站和一个移动站。 确保选择正确的变体。
:::

## 自动配置

PX4 GPS 栈自动设置GPS 模块，通过UART或USB发送和接收正确的消息，取决于模块的连接位置 (到 *QGroundControl* 或自驾仪)。

一旦自动驾驶仪接收到` GPS_RTCM_DATA ` MAVLink 消息，它就会自动将 RTCM 数据转发到连接的 GPS模块。

:::note
u-blox U-Center RTK 模块配置工具不需要/使用！
:::

:::note
*QGroundControl* 和自驾仪固件共享相同 [PX4 GPS driver stack](https://github.com/PX4/GpsDrivers)。 In practice, this means that support for new protocols and/or messages only need to be added to one place.
:::

### RTCM 报文

QGroundControl 配置RTK 基地站输出以下 RTCM3.2 帧, 每个帧均为 1 Hz, 除非另有说明：

- **1005** - 天线参考点的站坐标 XYZ (基站位置), 0.2 Hz。
- **1077** - 完整的 GPS 伪距、载波相、多普勒和信号强度(高分辨率)。
- **1087** - 所有 GLONASS 伪距、载波相、多普勒和信号强度(高分辨率)。
- **1230** - GLONASS 代码相位差。
- **1097** - 完整伽利略伪距、运载相、多普勒和信号强度(高分辨率)
- **1127** - 完整的北斗伪距，载波相位，多普勒和信号强度(高分辨率)

## 上行数据速率

来自基础的原始 RTCM 消息被打包到一个 MAVLink `GPS_RTCM_DATA` 消息，并且通过数据链接发送。 MAVLink 消息的最大长度是182字节。 根据RTCM的信息类型，MAVLink信息是不会填满的。

RTCM 基础位置消息(1005)长度为 22 字节， 而其他卫星的长度则因可见卫星的数量和卫星信号的数量而异（M8P等L1单元只有一个）。 在真实环境中，对于任一时刻，任何一个导航系统的可用卫星个数不超过12个，因此 300 B/s的上行速率就足够了。

如果使用 *MAVLink 1* ，则不论其长度，每条 RTCM 消息都会发送182字节 `GPS_RTCM_DATA` 消息。 因此，大约每秒上行需求是700多个字节。 这可能导致低带宽半双轨遥测模块 (如3DR Telemetry Radios) 连接的饱和。

如果 *MAVLink 2* 被使用，则 `GPS_RTCM_DATA消息` 中的所有空格将被删除。 由此产生的上行链路需求与理论值 (约 300 字节/秒) 大致相同。

:::tip PX4 自动切换到 MAVLink 2，如果GCS 和遥测模块支持。
:::

MAVLink 2 必须用于低带宽链接以保证 RTK 性能。 Care must be taken to make sure that the telemetry chain uses MAVLink 2 throughout. 您可以使用系统控制台上的 `mavlink status` 命令验证协议版本：

```
nsh> mavlink status
instance #0:
        GCS heartbeat:  593486 us ago
        mavlink chan: #0
        type:           3DR RADIO
        rssi:           219
        remote rssi:    219
        txbuf:          94
        noise:          61
        remote noise:   58
        rx errors:      0
        fixed:          0
        flow control:   ON
        rates:
        tx: 1.285 kB/s
        txerr: 0.000 kB/s
        rx: 0.021 kB/s
        rate mult: 0.366
        accepting commands: YES
        MAVLink version: 2
        transport protocol: serial (/dev/ttyS1 @57600)
```
