# 使用侦听器命令进行传感器/主题调试

uORB 是用于进程间通信的异步 `publish()`/`subscribe()` 消息传递 API。 The `listener` command can be used from the _QGroundControl MAVLink Console_ to inspect topic (message) values, including the current values published by sensors.

:::tip
This is a powerful debugging tool because it can be used even when QGC is connected over a wireless link (e.g. when the vehicle is flying).
:::

:::note
The `listener` command is also available through the [System Console](../debug/system_console.md) and the [MAVLink Shell](../debug/mavlink_shell.md).
:::

:::tip
To check what topics are available at what rate, just use the `uorb top` command.
:::

The image below demonstrates _QGroundControl_ being used to get the value of the acceleration sensor.

![QGC MAVLink Console](../../assets/gcs/qgc_mavlink_console_listener_command.png)

For more information about how to determine what topics are available and how to call `listener` see: [uORB Messaging > Listing Topics and Listening in](../middleware/uorb.md#listing-topics-and-listening-in).
