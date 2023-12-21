# MAVLink Messaging

[MAVLink](https://mavlink.io/en/) is a very lightweight messaging protocol that has been designed for the drone ecosystem.

PX4 uses _MAVLink_ to communicate with _QGroundControl_ (and other ground stations), and as the integration mechanism for connecting to drone components outside of the flight controller: companion computers, MAVLink enabled cameras etc.

The protocol defines a number of standard [messages](https://mavlink.io/en/messages/) and [microservices](https://mavlink.io/en/services/) for exchanging data (many, but not all, messages/services have been implemented in PX4).

This tutorial explains how you can add PX4 support for your own new "custom" messages.

:::note
The tutorial assumes you have created your own [custom uORB](../middleware/uorb.md) message named `CaTrajectory` in `msg/CaTrajectory.msg` and a corresponding custom MAVLink `CA_TRAJECTORY` message that is defined in `\src\modules\mavlink\mavlink\message_definitions\v1.0\custom_messages.xml` (code for this will be generated as part of the build to `/build/px4_sitl_default/mavlink/custom_messages/mavlink_msg_ca_trajectory.h`).
:::

## Defining Custom MAVLink Messages

PX4 includes the [mavlink/mavlink](https://github.com/mavlink/mavlink) repo as a submodule under [/src/modules/mavlink](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink), and generates the MAVLink 2 C header files at build time.

There are are number of XML dialect files in [/mavlink/messages/1.0/](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/).
The dialect that is built is specified using the variable `MAVLINK_DIALECT` in [/src/modules/mavlink/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/CMakeLists.txt#L34); by default this is [development.xml](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/development.xml).
The files are generated into the build directory: `/build/<build target>/mavlink/`.

In order to add your message we recommend that you create your messages in a new dialect file in the same directory, for example `PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0/custom_messages.xml`, and set `MAVLINK_DIALECT` to build the new file.
This dialect file should include `development.xml`.

You can alternatively add your messages to `common.xml` or `development.xml`.
Whatever dialect file you use must eventually be built in QGroundControl (or whatever software you use to communicate with PX4).

The MAVLink developer guide explains how to define new messages in [How to Define MAVLink Messages & Enums](https://mavlink.io/en/guide/define_xml_element.html).

You can check that your new messages are built by inspecting the headers generated in the build directory.
If your messages are not built they may be incorrectly formatted, or use clashing ids.
Inspect the build log for information.

:::note
The [MAVLink Developer guide](https://mavlink.io/en/getting_started/) has more information about using the MAVLink toolchain.
:::

## Sending Custom MAVLink Messages

This section explains how to stream the content of a custom uORB message as a MAVLink message.

### Define the Streaming Class

First create a file named `CA_TRAJECTORY.hpp` for your streaming class inside the [/src/modules/mavlink/streams](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink/streams) directory (named after the corresponding MAVLink message).

Add the headers for the MAVLink and uORB messages to the top of the file:

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink.h>
```

:::note
The uORB topic's snake-case header file is generated from the CamelCase uORB filename at build time.
The `custom_messages/mavlink.h` header is also generated at build time.
:::

Then copy the streaming class definition below into the file:

```C
class MavlinkStreamCaTrajectory : public MavlinkStream
{
public:
    static MavlinkStream *new_instance(Mavlink *mavlink)
    {
        return new MavlinkStreamCaTrajectory(mavlink);
    }
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

All streaming classes are very similar, with most of the "significant" differences in the `send()` method:

- The streaming class derives from [`MavlinkStream`](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_stream.h).
- The `public` definitions are "near-boilerplate", allowing PX4 to get an instance of the class (`new_instance()`), and then to use it to fetch the name, id, and size of the message from the MAVLink headers (`get_name()`, `get_name_static()`, `get_id_static()`, `get_id()`, `get_size()`).
  For your own streaming classes these can just be copied and modified to match the values for your MAVLink message.
- The `private` definitions subscribe to the uORB topics that need to be published.
  Here we also define constructors to prevent the definition being copied.
- The `protected` section is where the important work takes place!
  Here we override the `send()` method, copying values from the subscribed uORB topic(s) into appropriate fields in the MAVLink message, and then send the message.

Next we include our new class in [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_messages.cpp#L2193).
Add the line below to the part of the file where all the other streams are included:

```cpp
#include "streams/CA_TRAJECTORY.hpp"
```

Finally append the stream class to the `streams_list` at the bottom of
[mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_messages.cpp)

```C
StreamListItem *streams_list[] = {
...
#if defined(CA_TRAJECTORY_HPP)
    create_stream_list_item<MavlinkStreamCaTrajectory>(),
#endif // CA_TRAJECTORY_HPP
...
}
```

The class is now available for streaming, but won't be streamed by default.
We cover that in the next sections.

### Streaming by Default

The easiest way to stream your messages by default (as part of a build) is to add them to [mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_main.cpp) in the appropriate message group.

If you search in the file you'll find groups of messages defined in a switch statement:

- `MAVLINK_MODE_NORMAL`: Streamed to a GCS.
- `MAVLINK_MODE_ONBOARD`: Streamed to a companion computer on a fast link, such as Ethernet
- `MAVLINK_MODE_ONBOARD_LOW_BANDWIDTH`: Streamed to a companion computer on slower link
- `MAVLINK_MODE_GIMBAL`: Streamed to a gimbal
- `MAVLINK_MODE_EXTVISION`: Streamed to an external vision system
- `MAVLINK_MODE_EXTVISIONMIN`: Streamed to an external vision system on a slower link
- `MAVLINK_MODE_OSD`: Streamed to an OSD, such as an FPV headset.
- `MAVLINK_MODE_CUSTOM`: Stream nothing by default. Used when configuring streaming using MAVLink.
- `MAVLINK_MODE_MAGIC`: Same as `MAVLINK_MODE_CUSTOM`
- `MAVLINK_MODE_CONFIG`: ?
- `MAVLINK_MODE_MINIMAL`: Stream a minimal set of messages. Normally used for poor telemetry links.
- `MAVLINK_MODE_IRIDIUM`: Streamed to an iridium satellite phone

Normally you'll be testing on a GCS, so you could just add the message to the `MAVLINK_MODE_NORMAL` case using the `configure_stream_local()` method.
For example, to stream CA_TRAJECTORY at 5 Hz:

```cpp
	case MAVLINK_MODE_CONFIG: // USB
		// Note: streams requiring low latency come first
		...
		configure_stream_local("CA_TRAJECTORY", 5.0f);
        ...
```

It is also possible to add a stream by calling the [mavlink](../modules/modules_communication.html#mavlink) module with the `stream` argument in a [startup script](../concept/system_startup.md).
For example, you might add the following line to [/ROMFS/px4fmu_common/init.d-posix/px4-rc.mavlink](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/px4-rc.mavlink) in order to stream `CA_TRAJECTORY` at 50Hz on UDP port `14556` (`-r` configures the streaming rate and `-u` identifies the MAVLink channel on UDP port 14556).

```sh
mavlink stream -r 50 -s CA_TRAJECTORY -u 14556
```

### Streaming on Request

Some messages are only needed once, when particular hardware is connected, or under other circumstances.
In order to avoid clogging communications links with messages that aren't needed you may not stream all messages by default, even at low rate.

If you needed, a GCS or other MAVLink API can request that particular messages are streamed at a particular rate using [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL).
A particular message can be requested just once using [MAV_CMD_REQUEST_MESSAGE](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_MESSAGE).

## Receiving Custom MAVLink Messages

This section explains how to receive a message over MAVLink and publish it to uORB.

Add a function that handles the incoming MAVLink message in
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L77)

```cpp
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink_msg_ca_trajectory.h>
```

Add a function that handles the incoming MAVLink message in the `MavlinkReceiver` class in
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L140)

```cpp
void handle_message_ca_trajectory_msg(mavlink_message_t *msg);
```

Add an uORB publisher in the `MavlinkReceiver` class in
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L195)

```cpp
uORB::Publication<ca_trajectory_s> _ca_traj_msg_pub{ORB_ID(ca_trajectory)};
```

Implement the `handle_message_ca_trajectory_msg` function in [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.cpp)

```cpp
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

and finally make sure it is called in [MavlinkReceiver::handle_message()](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.cpp#L228)

```cpp
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

For example when using MAVLink to interface PX4 with an embedded device, the messages that are exchanged between the autopilot and the device may go through several iterations before they are stabilized.
In this case, it can be time-consuming and error-prone to regenerate the MAVLink headers, and make sure both devices use the same version of the protocol.

An alternative - and temporary - solution is to re-purpose debug messages.
Instead of creating a custom MAVLink message `CA_TRAJECTORY`, you can send a message `DEBUG_VECT` with the string key `CA_TRAJ` and data in the `x`, `y` and `z` fields.
See [this tutorial](../debug/debug_values.md) for an example usage of debug messages.

:::note
This solution is not efficient as it sends character string over the network and involves comparison of strings.
It should be used for development only!
:::

## Testing

As a first step, and while debugging, commonly you'll just want to confirm that any messages you've created are being sent/received as you expect.

You should should first use the `uorb top [<message_name>]` command to verify in real-time that your message is published and the rate (see [uORB Messaging](../middleware/uorb.md#uorb-top-command)).
This approach can also be used to test incoming messages that publish a uORB topic (for other messages you might use `printf` in your code and test in SITL).

There are several approaches you can use to view MAVLink traffic:

- Create a [Wireshark MAVLink plugin](https://mavlink.io/en/guide/wireshark.html) for your dialect.
  This allows you to inspect MAVLink traffic on an IP interface - for example between _QGroundControl_ or MAVSDK and your real or simulated version of PX4.

  :::tip
  It is much easier to generate a wireshark plugin and inspect traffic in Wireshark, than to rebuild QGroundControl with your dialect and use MAVLink Inspector.
  :::

- [Log uORB topics](../dev_log/logging.md) associate with your MAVLink message.
- View received messages in the QGroundControl [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html).
  You will need to rebuild QGroundControl with the custom message definitions, [as described below](h#updating-qgroundcontrol)

### Set Streaming Rate using a Shell

For testing, it is sometimes useful to increase the streaming rate of individual topics at runtime (e.g. for inspection in QGC).
This can be achieved using by calling the [mavlink](../modules/modules_communication.html#mavlink) module through the [QGC MAVLink console](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html) (or some other shell):

```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```

You can get the port number with `mavlink status` which will output (amongst others) `transport protocol: UDP (<port number>)`.
An example would be:

```sh
mavlink stream -u 14556 -s CA_TRAJECTORY -r 300
```

## Updating Ground Stations

Ultimately you'll want to use your new MAVLink interface by providing the corresponding ground station or MAVSDK implementation.

The important thing to remember here is that MAVLink requires that you use a version of the library that is built to the same definition (XML file).
So if you have created a custom message in PX4 you won't be able to use it unless you build QGC or MAVSDK with that same definition.

### Updating QGroundControl

You will need to [Build QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-dev-guide/getting_started/index.html) including a pre-built C library that contains your custom messages.

QGC uses a pre-built C library that must be located at [/qgroundcontrol/libs/mavlink/include/mavlink](https://github.com/mavlink/qgroundcontrol/tree/master/libs/mavlink/include/mavlink) in the QGC source.

By default this is pre-included as a submodule from <https://github.com/mavlink/c_library_v2> but you can [generate your own MAVLink Libraries](https://mavlink.io/en/getting_started/generate_libraries.html).

QGC uses the all.xml dialect by default, which includes **common.xml**.
You can include your messages in either file or in your own dialect.
However if you use your own dialect then it should include ArduPilotMega.xml (or it will miss all the existing messages), and you will need to change the dialect used by setting it in [`MAVLINK_CONF`](https://github.com/mavlink/qgroundcontrol/blob/master/QGCExternalLibs.pri#L52) when running _qmake_.

### Updating MAVSDK

See the MAVSDK docs for information about how to work with [MAVLink headers and dialects](https://mavsdk.mavlink.io/main/en/cpp/guide/build.html#mavlink-headers-and-dialects).
