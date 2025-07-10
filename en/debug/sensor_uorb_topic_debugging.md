---
canonicalUrl: https://docs.px4.io/main/en/debug/sensor_uorb_topic_debugging
---

# Sensor/Topic Debugging using the Listener Command

The uORB is an asynchronous `publish()` / `subscribe()` messaging API used for
inter-thread/inter-process communication. The `listener` command can be used from the *QGroundControl MAVLink Console* to inspect topic (message) values, including the current values published by sensors.

:::tip
This is a powerful debugging tool because it can be used even when QGC is connected over a wireless link (e.g. when the vehicle is flying).
:::

:::note
The `listener` command is also available through the [System Console](../debug/system_console.md) and the [MAVLink Shell](../debug/mavlink_shell.md).
:::

:::note
The `listener` command is only available on NuttX-based systems (Pixhawk, Pixracer, etc.) and Linux / OS X.
:::

The image below demonstrates *QGroundControl* being used to get the value of the acceleration sensor. 

![QGC MAVLink Console](../../assets/gcs/qgc_mavlink_console_listener_command.png)

For more information about how to determine what topics are available and how to call `listener` see: [uORB Messaging > Listing Topics and Listening in](../middleware/uorb.md#listing-topics-and-listening-in).
