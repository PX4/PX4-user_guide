---
canonicalUrl: https://docs.px4.io/main/en/middleware/uorb
---

# uORB Messaging

## Introduction

The uORB is an asynchronous `publish()` / `subscribe()` messaging API used for inter-thread/inter-process communication.

Look at the [tutorial](../modules/hello_sky.md) to learn how to use it in C++.

uORB is automatically started early on bootup as many applications depend on it.
It is started with `uorb start`. Unit tests can be started with `uorb_tests`.

## Adding a new topic

New uORB topics can be added either within the main PX4/PX4-Autopilot repository, or can be added in an out-of-tree message definitions.
For information on adding out-of-tree uORB message definitions, please see [this section](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions).

To add a new topic, you need to create a new **.msg** file in the `msg/` directory and add the file name to the `msg/CMakeLists.txt` list.
From this, the needed C/C++ code is automatically generated.

Have a look at the existing `msg` files for supported types.
A message can also be used nested in other messages.

To each generated C/C++ struct, a field `uint64_t timestamp` will be added.
This is used for the logger, so make sure to fill it in when publishing the message.

To use the topic in the code, include the header:

```
#include <uORB/topics/topic_name.h>
```

By adding a line like the following in the `.msg` file, a single message definition can be used for multiple independent topics:

```
# TOPICS mission offboard_mission onboard_mission
```

Then in the code, use them as topic id: `ORB_ID(offboard_mission)`.


## Publishing

Publishing a topic can be done from anywhere in the system, including interrupt context (functions called by the `hrt_call` API).
However, advertising a topic is only possible outside of interrupt context.
A topic has to be advertised in the same process as it's later published.

## Listing Topics and Listening in

:::note
The `listener` command is only available on Pixracer (FMUv4) and Linux / OS X.
:::

To list all topics, list the file handles:

```sh
ls /obj
```

To listen to the content of one topic for 5 messages, run the listener:

```sh
listener sensor_accel 5
```

The output is n-times the content of the topic:

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
On NuttX-based systems (Pixhawk, Pixracer, etc) the `listener` command can be called from within the *QGroundControl* MAVLink Console to inspect the values of sensors and other topics.
This is a powerful debugging tool because it can be used even when QGC is connected over a wireless link (e.g. when the vehicle is flying).
For more information see: [Sensor/Topic Debugging](../debug/sensor_uorb_topic_debugging.md).
:::

### uorb top Command

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
The columns are: topic name, multi-instance index, number of subscribers, publishing frequency in Hz, number of lost messages per second (for all subscribers combined), and queue size.


## Multi-instance

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`.
It will return an instance index to the publisher.
A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance).
Having multiple instances is useful for example if the system has several sensors of the same type.

Make sure not to mix `orb_advertise_multi` and `orb_advertise` for the same topic.

The full API is documented in
[platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/uORB/uORBManager.hpp).

<a id="deprecation"></a>
## Message/Field Deprecation
As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- Changing existing fields or messages that external tools rely on is generally acceptable if there are good reasons for the update.
  In particular for breaking changes to *Flight Review*, *Flight Review* must be updated before code is merged to `master`.
- In order for external tools to reliably distinguish between two message versions, the following steps must be followed:
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - Removed or renamed fields must be commented and marked as deprecated.
    For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`. 
    This is to ensure that removed fields (or messages) are not re-added in future.
  - In case of a semantic change (e.g. the unit changes from degrees to radians), the field must be renamed as well and the previous one marked as deprecated as above.

