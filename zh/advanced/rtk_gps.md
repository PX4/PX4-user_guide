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

The PX4 GPS stack automatically sets up the GPS modules to send and receive the correct messages over the UART or USB, depending on where the module is connected (to *QGroundControl* or the autopilot).

QGroundControl配置RTK基站输出依据RTCM3.2框架，每帧为1 Hz：

:::note
The u-blox U-Center RTK module configuration tool is not needed/used!
:::

The RTCM Base Position message (1005) is of length 22 bytes, while the others are all of variable length depending on the number of visible satellites and the number of signals from the satellite (only 1 for L1 units like M8P). Since at a given time, the *maximum* number of satellites visible from any single constellation is 12, under real-world conditions, theoretically an uplink rate of 300 B/s is sufficient. In practice, this means that support for new protocols and/or messages only need to be added to one place.
:::

### RTCM 报文

QGroundControl configures the RTK base station to output the following RTCM3.2 frames, each with 1 Hz, unless otherwise stated:

- **1005** - Station coordinates XYZ for antenna reference point (Base position), 0.2 Hz.
- **1077** - Full GPS pseudo-ranges, carrier phases, Doppler and signal strength (high resolution).
- **1087** - Full GLONASS pseudo-ranges, carrier phases, Doppler and signal strength (high resolution).
- **1230** - GLONASS code-phase biases.
- **1097** - Full Galileo pseudo-ranges, carrier phases, Doppler and signal strength (high resolution)
- **1127** - Full BeiDou pseudo-ranges, carrier phases, Doppler and signal strength (high resolution)

## 上行数据速率

The raw RTCM messages from the base are packed into a MAVLink `GPS_RTCM_DATA` message and sent over the datalink. The maximum length of each MAVLink message is 182 bytes. Depending on the RTCM message, the MAVLink message is almost never completely filled.

MAVLink 2 must be used on low-bandwidth links for good RTK performance. Care must be taken to make sure that the telemetry chain uses MAVLink 2 throughout. You can verify the protocol version by using the `mavlink status` command on the system console: 必须注意确保数传链在整个过程中使用 MAVLink 2。

If *MAVLink 1* is used, a 182-byte `GPS_RTCM_DATA` message is sent for every RTCM message, irrespective of its length. As a result the approximate uplink requirement is around 700+ bytes per second. This can lead to link saturation on low-bandwidth half-duplex telemetry modules (e.g. 3DR Telemetry Radios).

If *MAVLink 2* is used then any empty space in the `GPS_RTCM_DATA message` is removed. The resulting uplink requirement is about the same as the theoretical value (~300 bytes per second).

:::tip PX4 automatically switches to MAVLink 2 if the GCS and telemetry modules support it.
:::

MAVLink 2 must be used on low-bandwidth links for good RTK performance. Care must be taken to make sure that the telemetry chain uses MAVLink 2 throughout. You can verify the protocol version by using the `mavlink status` command on the system console:

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
