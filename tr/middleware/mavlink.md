---
canonicalUrl: https://docs.px4.io/main/tr/middleware/mavlink
---

# MAVLink Messaging

[MAVLink](https://mavlink.io/en/) is a very lightweight messaging protocol that has been designed for the drone ecosystem.

PX4 uses *MAVLink* to communicate with *QGroundControl* (and other ground stations), and as the integration mechanism for connecting to drone components outside of the flight controller: companion computers, MAVLink enabled cameras etc.

The protocol defines a number of standard [messages](https://mavlink.io/en/messages/) and [microservices](https://mavlink.io/en/services/) for exchanging data (many, but not all, messages/services have been implemented in PX4).

This tutorial explains how you can add PX4 support for your own new "custom" messages.

:::note
The tutorial assumes you have a [custom uORB](../middleware/uorb.md) `ca_trajectory` message in `msg/ca_trajectory.msg` and a custom MAVLink `ca_trajectory` message in `mavlink/include/mavlink/v2.0/custom_messages/mavlink_msg_ca_trajectory.h`.
:::

## Defining Custom MAVLink Messages

PX4 includes the [mavlink/mavlink](https://github.com/mavlink/mavlink) repo as a submodule under [/src/modules/mavlink](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/mavlink), and generates the MAVLink 2 C header files at build time.

There are are number of XML dialect files in [/mavlink/messages/1.0/](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/). The dialect that is built is specified using the variable `MAVLINK_DIALECT` in [/src/modules/mavlink/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/CMakeLists.txt#L34); by default this is [development.xml](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/development.xml). The files are generated into the build directory: `/build/<build target>/mavlink/`.

In order to add your message we recommend that you create your messages in a new dialect file in the same directory, for example `PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0/custom_messages.xml`, and set `MAVLINK_DIALECT` to build the new file. This dialect file should include `development.xml`.

You can alternatively add your messages to `common.xml` or `development.xml`. Whatever dialect file you use must eventually be built in QGroundControl (or whatever software you use to communicate with PX4).

The MAVLink developer guide explains how to define new messages in [How to Define MAVLink Messages & Enums](https://mavlink.io/en/guide/define_xml_element.html).

You can check that your new messages are built by inspecting the headers generated in the build directory. If your messages are not built they may be incorrectly formatted, or use clashing ids. Inspect the build log for information.

:::note
The [MAVLink Developer guide](https://mavlink.io/en/getting_started/) has more information about using the MAVLink toolchain.
:::


## Sending Custom MAVLink Messages

This section explains how to use a custom uORB message and send it as a MAVLink message.

Add the headers of the MAVLink and uORB messages to [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_messages.cpp)

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink.h>
```

Create a new class in [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_messages.cpp#L2193)

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
    static uint16_t get_id_static()
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
    uORB::Subscription _sub{ORB_ID(ca_trajectory)};

    /* do not allow top copying this class */
    MavlinkStreamCaTrajectory(MavlinkStreamCaTrajectory &);
    MavlinkStreamCaTrajectory& operator = (const MavlinkStreamCaTrajectory &);

protected:
    explicit MavlinkStreamCaTrajectory(Mavlink *mavlink) : MavlinkStream(mavlink)
    {}

    bool send() override
    {
        struct ca_traj_struct_s _ca_trajectory;    //make sure ca_traj_struct_s is the definition of your uORB topic

        if (_sub.update(&_ca_trajectory)) {
            mavlink_ca_trajectory_t _msg_ca_trajectory;  //make sure mavlink_ca_trajectory_t is the definition of your custom MAVLink message

            _msg_ca_trajectory.timestamp = _ca_trajectory.timestamp;
            _msg_ca_trajectory.time_start_usec = _ca_trajectory.time_start_usec;
            _msg_ca_trajectory.time_stop_usec  = _ca_trajectory.time_stop_usec;
            _msg_ca_trajectory.coefficients =_ca_trajectory.coefficients;
            _msg_ca_trajectory.seq_id = _ca_trajectory.seq_id;

            mavlink_msg_ca_trajectory_send_struct(_mavlink->get_channel(), &_msg_ca_trajectory);

            return true;
        }

        return false;
    }
};
```

Finally append the stream class to the `streams_list` at the bottom of [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_messages.cpp)

```C
StreamListItem *streams_list[] = {
...
create_stream_list_item<MavlinkStreamCaTrajectory>(),
...
```

Then make sure to enable the stream, for example by adding the following line to the [startup script](../concept/system_startup.md) (e.g. [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/ROMFS/px4fmu_common/init.d-posix/rcS) on NuttX or [ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/ROMFS/px4fmu_common/init.d-posix/rcS)) on SITL. Note that `-r` configures the streaming rate and `-u` identifies the MAVLink channel on UDP port 14556).

```
mavlink stream -r 50 -s CA_TRAJECTORY -u 14556
```

:::tip
You can use the `uorb top [<message_name>]` command to verify in real-time that your message is published and the rate (see [uORB Messaging](../middleware/uorb.md#uorb-top-command)). This approach can also be used to test incoming messages that publish a uORB topic (for other messages you might use `printf` in your code and test in SITL).

To see the message on *QGroundControl* you will need to [build it with your MAVLink library](https://dev.qgroundcontrol.com/en/getting_started/), and then verify that the message is received using [MAVLink Inspector Widget](https://docs.qgroundcontrol.com/master/en/app_menu/mavlink_inspector.html) (or some other MAVLink tool).
:::

## Receiving Custom MAVLink Messages

This section explains how to receive a message over MAVLink and publish it to uORB.

Add a function that handles the incoming MAVLink message in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_receiver.h#L77)

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink_msg_ca_trajectory.h>
```

Add a function that handles the incoming MAVLink message in the `MavlinkReceiver` class in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_receiver.h#L140)

```C
void handle_message_ca_trajectory_msg(mavlink_message_t *msg);
```
Add an uORB publisher in the `MavlinkReceiver` class in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_receiver.h#L195)

```C
uORB::Publication<ca_trajectory_s>          _ca_traj_msg_pub{ORB_ID(ca_trajectory)};
```

Implement the `handle_message_ca_trajectory_msg` function in [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_receiver.cpp)

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

    _ca_traj_msg_pub.publish(f);
}
```

and finally make sure it is called in [MavlinkReceiver::handle_message()](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mavlink/mavlink_receiver.cpp#L228)

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
```

## Alternative to Creating Custom MAVLink Messages

Sometimes there is the need for a custom MAVLink message with content that is not fully defined.

For example when using MAVLink to interface PX4 with an embedded device, the messages that are exchanged between the autopilot and the device may go through several iterations before they are stabilized. In this case, it can be time-consuming and error-prone to regenerate the MAVLink headers, and make sure both devices use the same version of the protocol.

An alternative - and temporary - solution is to re-purpose debug messages. Instead of creating a custom MAVLink message `CA_TRAJECTORY`, you can send a message `DEBUG_VECT` with the string key `CA_TRAJ` and data in the `x`, `y` and `z` fields. See [this tutorial](../debug/debug_values.md). for an example usage of debug messages.

:::note
This solution is not efficient as it sends character string over the network and involves comparison of strings.
It should be used for development only!
:::

## Testing

Ultimately you'll want to test your new MAVLink interface is working by providing the corresponding ground station or MAVSDK implementation. As a first step, and while debugging, commonly you'll just want to confirm that any messages you've created are being sent/received as you expect.

There are several approaches you can use to view traffic:
- Create a [Wireshark MAVLink plugin](https://mavlink.io/en/guide/wireshark.html) for your dialect. This allows you to inspect MAVLink traffic on an IP interface - for example between *QGroundControl* or MAVSDK and your real or simulated version of PX4.
- [Log uORB topics](../dev_log/logging.md) associate with your MAVLink message.
- View received messages in the QGroundControl [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/analyze_view/mavlink_inspector.html). For the messages to appear you will need to [Build QGroundControl](https://dev.qgroundcontrol.com/master/en/getting_started/) including a pre-built C library that contains your custom messages.
  - QGC uses a pre-built C library that must be located at [/qgroundcontrol/libs/mavlink/include/mavlink](https://github.com/mavlink/qgroundcontrol/tree/master/libs/mavlink/include/mavlink) in the QGC source. By default this is pre-included as a submodule from https://github.com/mavlink/c_library_v2 but you can [generate your own MAVLink Libraries](https://mavlink.io/en/getting_started/generate_libraries.html)
  - QGC uses the ArduPilotMega.xml dialect by default, which includes **common.xml**. You can include your messages in either file or in your own dialect. However if you use your own dialect then it should include ArduPilotMega.xml (or it will miss all the existing messages), and you will need to change the dialect used by setting it in [`MAVLINK_CONF`](https://github.com/mavlink/qgroundcontrol/blob/master/QGCExternalLibs.pri#L52) when running *qmake*.


## General

### Set streaming rate

Sometimes it is useful to increase the streaming rate of individual topics (e.g. for inspection in QGC). This can be achieved by typing the following line in the shell:
```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```
You can get the port number with `mavlink status` which will output (amongst others) `transport protocol: UDP (<port number>)`. An example would be:
```sh
mavlink stream -u 14556 -s OPTICAL_FLOW_RAD -r 300
```
