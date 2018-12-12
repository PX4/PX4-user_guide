# 无线数传

无线数传(选配)可以用于建立*QGroundControl* 地面站与PX4飞控之间的无线MAVLink连接。 这使得飞机飞行时调试、检查数传、更改任务等等成为了可能。

PX4支持多种类型数传电台：

* [SiK电台](../telemetry/sik_radio.md) 基础固件(更通用，任何带串口的电台都可以工作)。 
  * [RFD900 遥测无线电](../telemetry/rfd900_telemetry.md)
  * [HKPilot(SIK)遥测无线电](../telemetry/hkpilot_sik_radio.md)
  * [HolyBro(SIK)遥测无线电](../telemetry/holybro_sik_radio.md)
* [WiFi电台](../telemetry/telemetry_wifi.md)

PX4协议支持[SiK电台](../telemetry/sik_radio.md)，并且可以远离设备工作(尽管你可能需要使用适当的连接器)

WIFI遥测通常具有更短的范围、更高的数据速率, 并且可以更轻松地支持FPV/视频源。 WIFI电台的一个好处是, 您只需为您的车辆购买一个无线电设备(假设地面站已经有WIFI)。