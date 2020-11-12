# 无线数传

无线数传 (选配) 可以用于建立 *QGroundControl* 地面站与PX4飞控之间的无线MAVLink连接。 本节包含两个主题：已经支持的无线数传 和 在PX4系统中集成新的数传。

## 已支持的无线数传

[PX4 用户手册 > 数传](http://docs.px4.io/en/telemetry/) 列举了PX4已支持的无线数传系统。 包括使用 *SiK Radio*固件的数传 和 *3DR WiFi 无线数传*。

## 集成新类型数传系统

PX4支持通过数传端口将一个基于 MAVLink 的数传连接到Pixhawk飞控。 只需要一个支持MAVLink的数传和一个兼容UART电平/连接器的端口，无需更多。

使用其它协议的数传系统的集成则比较困难，软件(比如设备驱动)和硬件(连接器等)都需要考虑到。 虽然有一些成功的案例 (比如 [FrSky 数传](https://docs.px4.io/en/peripherals/frsky_telemetry.html) 能够通过FrSky接收器将载体状态发送给遥控器)，但尚无通用解决方案。 遇到此类问题，我们推荐你[与开发团队进行沟通](../README.md#support)。
