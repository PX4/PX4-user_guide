# RTK GPS (PX4 集成)

[实时载波相位差分定位](https://en.wikipedia.org/wiki/Real_Time_Kinematic) （RTK）能够提供厘米级的定位信息。 这一章节将介绍 RTK 是如何集成到 PX4 中的。

RTK是使用导航信号的载波相位来进行测距的，而不是使用导航信号所搭载的信息。 多个移动的用户可以共用同一个差分基准站发播的差分修正信息，移动用户离差分基准站的距离越近，差分定位更精确。

## 综述

在PX4系统中，为达到RTK的差分效果，需要2个RTK GPS模块和一个数据链路。 固定在地面的RTK GPS模块称作基站，另一个在空中的模块称作移动站。

Two RTK GPS modules and a datalink are required to setup RTK with PX4. The fixed-position ground-based GPS unit is called the *Base* and the in-air unit is called the *Rover*. The Base unit connects to *QGroundControl* (via USB) and uses the datalink to stream RTCM corrections to the vehicle (using the MAVLink [GPS_RTCM_DATA](https://mavlink.io/en/messages/common.html#GPS_RTCM_DATA) message). On the autopilot, the MAVLink packets are unpacked and sent to the Rover unit, where they are processed to get the RTK solution.

PX4目前仅支持u-blox M8P单频（L1频点）RTK接收机。

## 支持的 RTK GPS 模块

The list of devices that we have tested can be found [in the user guide](../gps_compass/rtk_gps.md#supported-rtk-devices).

:::note
Most devices come with two variants, a base and a rover. Make sure to select the correct variant.
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
