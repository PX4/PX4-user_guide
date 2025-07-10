---
canonicalUrl: https://docs.px4.io/main/zh/middleware/mavlink
---

# MAVLink通讯

[MAVLink](https://mavlink.io/en/) 是一个针对无人机生态系统设计的非常轻量化的消息传递协议。

PX4 使用 *MAVLink* 实现与 *QGroundControl* （或者其它地面站软件）的通讯交流，同时也将其用于整合飞控板与飞控板之外的无人机部件：伴随计算机、支持 MAVLink 的摄像头等。

该协议定义了许多用于交换数据的标准 [消息](https://mavlink.io/en/messages/) 和 [微型服务（microservices）](https://mavlink.io/en/services/)（PX4 中用到了许多消息/服务，但不是全部）。

本教程介绍了如何为你自己新 "自定义" 的报文添加 PX4 支持。

:::note
The tutorial assumes you have a [custom uORB](../middleware/uorb.md) `ca_trajectory` message in `msg/ca_trajectory.msg` and a custom MAVLink `ca_trajectory` message in `mavlink/include/mavlink/v2.0/custom_messages/mavlink_msg_ca_trajectory.h`.
:::

## 创建自定义 MAVLink 消息

The MAVLink developer guide explains how to define new messages and build them into new programming-specific libraries:
- [如何定义 MAVLink 消息（Messages）& 枚举（Enums）](https://mavlink.io/en/guide/define_xml_element.html)
- [生成 MAVLink 库文件](https://mavlink.io/en/getting_started/generate_libraries.html)

Your message needs to be generated as a C-library for MAVLink 2. Once you've [installed MAVLink](https://mavlink.io/en/getting_started/installation.html) you can do this on the command line using the command:
```sh
python -m pymavlink.tools.mavgen --lang=C --wire-protocol=2.0 --output=generated/include/mavlink/v2.0 message_definitions/v1.0/custom_messages.xml
```

For your own use/testing you can just copy the generated headers into **PX4-Autopilot/mavlink/include/mavlink/v2.0**.

To make it easier for others to test your changes, a better approach is to add your generated headers to a fork of https://github.com/mavlink/c_library_v2. PX4 developers can then update the submodule to your fork in the PX4-Autopilot repo before building.


## 发送自定义MAVLink消息

Step1. 首先，在[mavlink_messages.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_messages.cpp)中添加自定义MAVLink消息和uORB消息的头文件：

Step2. 然后，在[mavlink_messages.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_messages.cpp#L2193)中新建一个消息流的类：

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink.h>
```

Step3. 接下来，在[mavlink_messages.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_messages.cpp)的文件末尾，将这个消息流的类追加到`treams_list`。

```C
class MavlinkStreamCaTrajectory : public MavlinkStream
{
public:
    const char *get_name() const
    {
        return MavlinkStreamCaTrajectory::get_name_static();
    }
    static const char *get_name_static()
    {
        return "CA_TRAJECTORY";
    }
    uint16_t get_id_static()
    {
        return MAVLINK_MSG_ID_CA_TRAJECTORY;
    }
    uint16_t get_id()
    {
        return get_id_static();
    }
    static MavlinkStream *new_instance(Mavlink *mavlink)
    {
        return new MavlinkStreamCaTrajectory(mavlink);
    }
    unsigned get_size()
    {
        return MAVLINK_MSG_ID_CA_TRAJECTORY_LEN + MAVLINK_NUM_NON_PAYLOAD_BYTES;
    }

private:
    MavlinkOrbSubscription *_sub;
    uint64_t _ca_traj_time;

    /* do not allow top copying this class */
    MavlinkStreamCaTrajectory(MavlinkStreamCaTrajectory &);
    MavlinkStreamCaTrajectory& operator = (const MavlinkStreamCaTrajectory &);

protected:
    explicit MavlinkStreamCaTrajectory(Mavlink *mavlink) : MavlinkStream(mavlink),
        _sub(_mavlink->add_orb_subscription(ORB_ID(ca_trajectory))),  // make sure you enter the name of your uORB topic here
        _ca_traj_time(0)
    {}

    bool send(const hrt_abstime t)
    {
        struct ca_traj_struct_s _ca_trajectory;    //make sure ca_traj_struct_s is the definition of your uORB topic

        if (_sub->update(&_ca_traj_time, &_ca_trajectory)) {
            mavlink_ca_trajectory_t _msg_ca_trajectory;  //make sure mavlink_ca_trajectory_t is the definition of your custom MAVLink message

            _msg_ca_trajectory.timestamp = _ca_trajectory.timestamp;
            _msg_ca_trajectory.time_start_usec = _ca_trajectory.time_start_usec;
            _msg_ca_trajectory.time_stop_usec  = _ca_trajectory.time_stop_usec;
            _msg_ca_trajectory.coefficients =_ca_trajectory.coefficients;
            _msg_ca_trajectory.seq_id = _ca_trajectory.seq_id;

            mavlink_msg_ca_trajectory_send_struct(_mavlink->get_channel(), &_msg_ca_trajectory)
        }

        return true;
    }
};
```

Finally append the stream class to the `streams_list` at the bottom of [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp)

```C
StreamListItem *streams_list[] = {
...
StreamListItem *streams_list[] = {
...
new StreamListItem(&MavlinkStreamCaTrajectory::new_instance, &MavlinkStreamCaTrajectory::get_name_static, &MavlinkStreamCaTrajectory::get_id_static),
nullptr
};
```

Then make sure to enable the stream, for example by adding the following line to the [startup script](../concept/system_startup.md) (e.g. [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) on NuttX or [ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS)) on SITL. Note that `-r` configures the streaming rate and `-u` identifies the MAVLink channel on UDP port 14556).

```
mavlink stream -r 50 -s CA_TRAJECTORY -u 14556
```

:::tip
You can use the `uorb top [<message_name>]` command to verify in real-time that your message is published and the rate (see [uORB Messaging](../middleware/uorb.md#uorb-top-command)). This approach can also be used to test incoming messages that publish a uORB topic (for other messages you might use `printf` in your code and test in SITL).

To see the message on *QGroundControl* you will need to [build it with your MAVLink library](https://dev.qgroundcontrol.com/en/getting_started/), and then verify that the message is received using [MAVLink Inspector Widget](https://docs.qgroundcontrol.com/en/app_menu/mavlink_inspector.html) (or some other MAVLink tool).
:::

## 接收自定义MAVLink消息

Step3. 在[mavlink_receiver.h](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_receiver.h#L195)中，向类`MavlinkReceiver`中添加uORB发布者类型的成员变量：

Step4. 在[mavlink_receiver.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_receiver.cpp)中给出函数`handle_message_ca_trajectory_msg`的具体实现：

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink_msg_ca_trajectory.h>
```

Step5. 最后，确保上述自定义函数在[MavlinkReceiver::handle_message()](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_receiver.cpp#L228)中被调用：

```C
void handle_message_ca_trajectory_msg(mavlink_message_t *msg);
```
有时候需要创建一个内容尚未完全定义的自定义 MAVlink 消息。

```C
orb_advert_t _ca_traj_msg_pub;
```

Implement the `handle_message_ca_trajectory_msg` function in [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp)

```C
void MavlinkReceiver::handle_message_ca_trajectory_msg(mavlink_message_t *msg)
{
    mavlink_ca_trajectory_t traj;
    mavlink_msg_ca_trajectory_decode(msg, &traj);

    struct ca_traj_struct_s f;
    memset(&f, 0, sizeof(f));

    f.timestamp = hrt_absolute_time();
    f.seq_id = traj.seq_id;
    f.time_start_usec = traj.time_start_usec;
    f.time_stop_usec = traj.time_stop_usec;
    for(int i=0;i<28;i++)
        f.coefficients[i] = traj.coefficients[i];

    if (_ca_traj_msg_pub == nullptr) {
        _ca_traj_msg_pub = orb_advertise(ORB_ID(ca_trajectory), &f);

    } else {
        orb_publish(ORB_ID(ca_trajectory), _ca_traj_msg_pub, &f);
    }
}
```

and finally make sure it is called in [MavlinkReceiver::handle_message()](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp#L228)

```C
MavlinkReceiver::handle_message(mavlink_message_t *msg)
 {
    switch (msg->msgid) {
        ...
    case MAVLINK_MSG_ID_CA_TRAJECTORY:
        handle_message_ca_trajectory_msg(msg);
        break;
        ...
    }
    case MAVLINK_MSG_ID_CA_TRAJECTORY:
        handle_message_ca_trajectory_msg(msg);
        break;
        ...
    }
```

## 另一种自定义MAVlink消息的办法

Sometimes there is the need for a custom MAVLink message with content that is not fully defined.

You can get the port number with `mavlink status` which will output (amongst others) `transport protocol: UDP (<port number>)`. An example would be: 一个例子是：

An alternative - and temporary - solution is to re-purpose debug messages. Instead of creating a custom MAVLink message `CA_TRAJECTORY`, you can send a message `DEBUG_VECT` with the string key `CA_TRAJ` and data in the `x`, `y` and `z` fields. See [this tutorial](../debug/debug_values.md). for an example usage of debug messages.

:::note
This solution is not efficient as it sends character string over the network and involves comparison of strings. It should be used for development only!
:::

## 常规信息

### 设置流速率（streaming rate）

Sometimes it is useful to increase the streaming rate of individual topics (e.g. for inspection in QGC). This can be achieved by typing the following line in the shell:
```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```
You can get the port number with `mavlink status` which will output (amongst others) `transport protocol: UDP (<port number>)`. An example would be:
```sh
mavlink stream -u 14556 -s OPTICAL_FLOW_RAD -r 300
```
