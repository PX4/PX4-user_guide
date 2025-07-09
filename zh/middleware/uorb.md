---
canonicalUrl: https://docs.px4.io/main/zh/middleware/uorb
---

# uORB 消息

## 简介

uORB 是一种异步 `publish()`/`subscribe()` 的消息传递 API，用于进程或者线程间通信。

查看[教程](../modules/hello_sky.md)以了解如何在 C++ 中使用它。

作为很多应用程序依赖的uORB，很早便会在启动过程中自动启动。 使用命令 `uorb start`启动。 单元测试可以使用`uorb_tests`启动。

## 添加新 Topic（主题）

新的uORB主题通过在主PX4/Firmware 存储库中添加，也能通过在out-of-tree消息定义中添加。 有关添加树外 uORB 消息定义的信息，请参阅[本节](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions)。

若要添加新主题，需要在 `msg` 目录中创建一个新的 **.msg** 文件，并将文件名添加到`msg/CMakeLists.txt` 列表中。 由此，将自动生成所需的 C/C++ 代码。

查看支持类型的现有 `msg` 文件。 消息还可以在其他消息中嵌套使用。

对于每个生成的 C/C + 结构体，都将添加一个 `uint64_t timestamp`字段。 此用于记录日志，因此请确保在发布时填充数据。

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

发布主题可以在系统中的任何位置完成，包括中断上下文（由 `hrt_call` API 调用的函数）。 However, the topic needs to be advertised and published outside of an interrupt context (at least once) before it can be published in an interrupt context.

## 主题列表和监听（Listener）

:::note
`listener` 命令只存在于Pixracer (FMUv4) 和Linux / OS X中.
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
在 NuttX上的系统 (Pixhawk, Pixracer, 等) `侦听器` 命令可以从 *QGroundControl* MAVLink 控制台调用来查看传感器和其他主题的值。 这是一个非常实用的调试工具，应为它可以在QGC通过无线连接的时候使用（例如，当机体在飞行中）。 有关详细信息，请参阅 [传感器/主题调试 ](../debug/sensor_uorb_topic_debugging.md)。
:::

### uorb top 命令

命令 `uorb top` 实时显示每个主题的发布频率：

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


## 多实例

uORB 提供了一种通过 `orb_advertise_multi` 发布同一主题的多个独立实例的机制。 它将返回实例索引到发布器。 然后, 订阅者必须通过`orb_subscribe_multi`选择订阅哪个实例（`orb_subscribe` 将订阅第一个实例）。 多实例是很有用的，例如，如果系统有几个同类型的传感器。

确保不要再同一个主题上弄混 `orb_advertise_multi` 和`orb_advertise`

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/platforms/common/uORB/uORBManager.hpp).

<a id="deprecation"></a>

## 消息/字段弃用
由于有外部工具使用日志文件中的 uORB 消息，例如 [飞行评论](https://github.com/PX4/flight_review)， 在更新现有信息时需要考虑到某些方面：

- 如果有充分理由进行更新，更改外部工具所依赖的现有字段或信息通常是可以接受的。 尤其是对于断开对 *航班评论*的更改， *飞行审查* 必须先更新才能将代码合并到 `主`。
- 为了使外部工具能够可靠地区分两个消息版本，必须遵循以下步骤：
  - 已删除或重命名的消息必须添加到 [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) 中的 `deprecated_msgs`  同时， **.msg** 文件需要删除。
  - Removed or renamed fields must be commented and marked as deprecated. For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`. This is to ensure that removed fields (or messages) are not re-added in future.
  - In case of a semantic change (e.g. the unit changes from degrees to radians), the field must be renamed as well and the previous one marked as deprecated as above.

