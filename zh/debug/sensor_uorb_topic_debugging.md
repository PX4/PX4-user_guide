---
canonicalUrl: https://docs.px4.io/main/zh/debug/sensor_uorb_topic_debugging
---

# 使用侦听器命令进行传感器/主题调试

uORB 是用于进程间通信的异步 `publish()`/`subscribe()` 消息传递 API。 `listener` 命令可从 *QGroundControl 的 MAVLink 控制台* 中用于检查主题（消息）值，包括传感器发布的当前值。

:::tip
This is a powerful debugging tool because it can be used even when QGC is connected over a wireless link (e.g. when the vehicle is flying).
:::

:::note
The `listener` command is also available through the [System Console](../debug/system_console.md) and the [MAVLink Shell](../debug/mavlink_shell.md).
:::

有关如何确定可用的主题以及如何调用 `listener` 的详细信息，请参阅：[uORB 消息列表主题和侦听 ](../middleware/uorb.md#listing-topics-and-listening-in)。

The image below demonstrates *QGroundControl* being used to get the value of the acceleration sensor.

![QGC MAVLink Console](../../assets/gcs/qgc_mavlink_console_listener_command.png)

For more information about how to determine what topics are available and how to call `listener` see: [uORB Messaging > Listing Topics and Listening in](../middleware/uorb.md#listing-topics-and-listening-in).
