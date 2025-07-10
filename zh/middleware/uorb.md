---
canonicalUrl: https://docs.px4.io/main/zh/middleware/uorb
---

# uORB 消息

## 简介

uORB 是一种异步 `publish()`/`subscribe()` 的消息传递 API，用于进程或者线程间通信(IPC)。

查看 [教程](../apps/hello_sky.md) 以了解如何在 C++ 中使用它。

作为很多应用程序依赖的uORB，会在启动时自动启动。 它以 `uorb start</0 > 开头。 单元测试可以从 <code>uorb_tests` 开始。

## 添加新 Topic（主题）

新的uORB</0>主题通过在主要的PX4/Firmware 存储库中添加，也能通过在out-of-tree</0>消息定义中添加。 有关添加树外 uORB 消息定义的信息，请参阅 [本节](../advanced/out_of_tree_modules.md#uorb_message_definitions)。

若要添加新主题，需要在 `msg/` 目录中创建一个新的 **.msg** 文件，并将文件名添加到 `msg/CMakeLists.txt` 列表中。 由此，将自动生成所需的 C/C++ 代码。

查看支持类型的现有 `msg` 文件。 消息还可以在其他消息中嵌套使用。

对于每个生成的 C/C + 结构，将添加一个字段 `uint64_t timestamp`。 此用于记录日志，因此请确保在发布时填充数据。

若要在代码中使用该主题，请包括头文件：

```
#include <uORB/topics/topic_name.h>
```

通过在 `.msg` 文件中添加如下内容的行，可以将一条消息定义用于多个独立主题：

```
# TOPICS mission offboard_mission onboard_mission
```

然后在代码中，将它们用作主题 id: `ORB_ID(offboard_mission)`。


## 发布

发布主题可以在系统中的任何位置完成，包括中断上下文（由 `hrt_call` API 调用的函数）。 但是，仅在中断上下文之外才能为主题做广播。 一个主题必须与以后发布的过程相同。

## 主题列表和监听（Listener）

要列出所有主题，列出文件句柄：

要监听五条信息中的一个主题内容，运行监听器：

```sh
ls /obj
```

输出主题内容如下：

```sh
listener sensor_accel 5
```

uorb top 命令实时显示每个主题的发布频率。

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
On NuttX-based systems (Pixhawk, Pixracer, etc) the `listener` command can be called from within the *QGroundControl* MAVLink Console to inspect the values of sensors and other topics. This is a powerful debugging tool because it can be used even when QGC is connected over a wireless link (e.g. when the vehicle is flying). For more information see: [Sensor/Topic Debugging](../debug/sensor_uorb_topic_debugging.md).
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
请确保不要为同一主题混合 `orb_advertise_multi` 和 `orb_advertise`。


## 多实例

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`. It will return an instance index to the publisher. A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance). Having multiple instances is useful for example if the system has several sensors of the same type.

下面解释了一些常见的陷阱和边界案例：

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/uORB/uORBManager.hpp).

<a id="deprecation"></a>

## 故障排除和常见的陷阱
As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- Changing existing fields or messages that external tools rely on is generally acceptable if there are good reasons for the update. In particular for breaking changes to *Flight Review*, *Flight Review* must be updated before code is merged to `master`.
- In order for external tools to reliably distinguish between two message versions, the following steps must be followed:
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - Removed or renamed fields must be commented and marked as deprecated. For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`. This is to ensure that removed fields (or messages) are not re-added in future.
  - In case of a semantic change (e.g. the unit changes from degrees to radians), the field must be renamed as well and the previous one marked as deprecated as above.

