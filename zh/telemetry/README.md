---
canonicalUrl: https://docs.px4.io/main/zh/telemetry/README
---

# 数传电台模块

无线数传（选配）可以用于建立 *QGroundControl* 地面站与PX4飞控之间的无线MAVLink连接。 这使得飞机飞行时调试、检查数传、更改任务等等成为了可能。

PX4支持多种类型数传电台：

* [SiK 电台](../telemetry/sik_radio.md) 基础固件（更通用，任何带串口的电台都可以工作）。 
  * [RFD900 遥测无线电](../telemetry/rfd900_telemetry.md)
  * [HKPilot（SIK）遥测无线电](../telemetry/hkpilot_sik_radio.md)
  * [HolyBro（SIK）遥测无线电](../telemetry/holybro_sik_radio.md)
* [WiFi 数传](../telemetry/telemetry_wifi.md)
* [Microhard Serial Telemetry Radio](../telemetry/microhard_serial.md)

PX4 协议兼容 [SiK 电台](../telemetry/sik_radio.md)，并且可以即插即用（尽管你可能需要使用适当的连接器）。

WIFI 数传通常具有更短的范围、更高的数据速率，并且可以更轻松地支持FPV/视频源。 Wifi电台的一个好处是, 您只需为您的车辆购买一个无线电设备（假设地面站已经有WIFI）。

:::note PX4 does not support connecting an LTE USB module to the flight controller (and sending MAVLink traffic via the Internet). You can however connect an LTE module to a companion computer and use it to route MAVLink traffic from the flight controller. For more information see: [Companion Computer Peripherals > Data Telephony](../peripherals/companion_computer_peripherals.md#data_telephony).
:::