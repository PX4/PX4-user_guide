# uORB 消息

## 简介

The uORB is an asynchronous `publish()` / `subscribe()` messaging API used for inter-thread/inter-process communication.

Look at the [tutorial](../modules/hello_sky.md) to learn how to use it in C++.

作为很多应用程序依赖的uORB，很早便会在启动过程中自动启动。
It is started with `uorb start`. Unit tests can be started with `uorb_tests`.

## 添加新 Topic（主题）

新的uORB主题通过在主PX4/Firmware 存储库中添加，也能通过在out-of-tree消息定义中添加。
For information on adding out-of-tree uORB message definitions, please see [this section](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions).

To add a new topic, you need to create a new **.msg** file in the `msg/` directory and add the file name to the `msg/CMakeLists.txt` list.
由此，将自动生成所需的 C/C++ 代码。

Have a look at the existing `msg` files for supported types.
消息还可以在其他消息中嵌套使用。

To each generated C/C++ struct, a field `uint64_t timestamp` will be added.
此用于记录日志，因此请确保在发布时填充数据。

若要在代码中使用该主题，请包括头文件：

```cpp
#include <uORB/topics/topic_name.h>
```

By adding a line like the following in the `.msg` file, a single message definition can be used for multiple independent topics:

```cpp
# TOPICS mission offboard_mission onboard_mission
```

Then in the code, use them as topic id: `ORB_ID(offboard_mission)`.

## 发布

Publishing a topic can be done from anywhere in the system, including interrupt context (functions called by the `hrt_call` API).
However, the topic needs to be advertised and published outside of an interrupt context (at least once) before it can be published in an interrupt context.

## 主题列表和监听（Listener）

:::info
The `listener` command is only available on Pixracer (FMUv4) and Linux / OS X.
:::

列出所有主题，列出文件句柄：

```sh
ls /obj
```

要监听一个主题内容中五条信息，运行监听器：

```sh
listener sensor_accel 5
```

输出是n次主题正文：

```sh
TOPIC: sensor_accel #3
timestamp: 84978861
integral_dt: 4044
error_count: 0
x: -1
y: 2
z: 100
x_integral: -0
y_integral: 0
z_integral: 0
temperature: 46
range_m_s2: 78
scaling: 0

TOPIC: sensor_accel #4
timestamp: 85010833
integral_dt: 3980
error_count: 0
x: -1
y: 2
z: 100
x_integral: -0
y_integral: 0
z_integral: 0
temperature: 46
range_m_s2: 78
scaling: 0
```

:::tip
On NuttX-based systems (Pixhawk, Pixracer, etc) the `listener` command can be called from within the _QGroundControl_ MAVLink Console to inspect the values of sensors and other topics.
这是一个非常实用的调试工具，应为它可以在QGC通过无线连接的时候使用（例如，当机体在飞行中）。
For more information see: [Sensor/Topic Debugging](../debug/sensor_uorb_topic_debugging.md).
:::

### uorb top 命令

The command `uorb top` shows the publishing frequency of each topic in real-time:

```sh
update: 1s, num topics: 77
TOPIC NAME                        INST #SUB #MSG #LOST #QSIZE
actuator_armed                       0    6    4     0 1
actuator_controls_0                  0    7  242  1044 1
battery_status                       0    6  500  2694 1
commander_state                      0    1   98    89 1
control_state                        0    4  242   433 1
ekf2_innovations                     0    1  242   223 1
ekf2_timestamps                      0    1  242    23 1
estimator_status                     0    3  242   488 1
mc_att_ctrl_status                   0    0  242     0 1
sensor_accel                         0    1  242     0 1
sensor_accel                         1    1  249    43 1
sensor_baro                          0    1   42     0 1
sensor_combined                      0    6  242   636 1
```

列分别是：主题名字，多实例索引值，订阅者数量，发布频率（Hz），每秒丢失的信息数（对所有订阅者）和队列大小。

## Plotting Changes in Topics

Topic changes can be plotted in realtime using PlotJuggler and the PX4 ROS 2 integration (note that this actually plots ROS topics that correspond to uORB topics, but the effect is the same).

For more information see: [Plotting uORB Topic Data in Real Time using PlotJuggler](../debug/plotting_realtime_uorb_data.md).

<video src="../../assets/debug/realtime_debugging/realtime_debugging.mp4" width="720" controls></video>

## 多实例

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`.
它将返回实例索引到发布器。
A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance).
多实例是很有用的，例如，如果系统有几个同类型的传感器。

Make sure not to mix `orb_advertise_multi` and `orb_advertise` for the same topic.

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/main/platforms/common/uORB/uORBManager.hpp).

## Message/Field Deprecation {#deprecation}

As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- 如果有充分理由进行更新，更改外部工具所依赖的现有字段或信息通常是可以接受的。
  In particular for breaking changes to _Flight Review_, _Flight Review_ must be updated before code is merged to `master`.
- 为了使外部工具能够可靠地区分两个消息版本，必须遵循以下步骤：
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - Removed or renamed fields must be commented and marked as deprecated.
    For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`.
    This is to ensure that removed fields (or messages) are not re-added in future.
  - In case of a semantic change (e.g. the unit changes from degrees to radians), the field must be renamed as well and the previous one marked as deprecated as above.
