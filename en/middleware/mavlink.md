---
canonicalUrl: https://docs.px4.io/main/en/middleware/mavlink
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

The MAVLink developer guide explains how to define new messages and build them into new programming-specific libraries:
- [How to Define MAVLink Messages & Enums](https://mavlink.io/en/guide/define_xml_element.html)
- [Generating MAVLink Libraries](https://mavlink.io/en/getting_started/generate_libraries.html)

Your message needs to be generated as a C-library for MAVLink 2.
Once you've [installed MAVLink](https://mavlink.io/en/getting_started/installation.html) you can do this on the command line using the command:
```sh
python -m pymavlink.tools.mavgen --lang=C --wire-protocol=2.0 --output=generated/include/mavlink/v2.0 message_definitions/v1.0/custom_messages.xml
```

For your own use/testing you can just copy the generated headers into **PX4-Autopilot/mavlink/include/mavlink/v2.0**.

To make it easier for others to test your changes, a better approach is to add your generated headers to a fork of https://github.com/mavlink/c_library_v2.
PX4 developers can then update the submodule to your fork in the PX4-Autopilot repo before building.


## Sending Custom MAVLink Messages

This section explains how to use a custom uORB message and send it as a MAVLink message.

Add the headers of the MAVLink and uORB messages to
[mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp)

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink.h>
```

Create a new class in [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp#L2193)

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

Finally append the stream class to the `streams_list` at the bottom of
[mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp)

```C
StreamListItem *streams_list[] = {
...
create_stream_list_item<MavlinkStreamCaTrajectory>(),
...
```

Then make sure to enable the stream, for example by adding the following line to the [startup script](../concept/system_startup.md) (e.g. [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) on NuttX or [ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS)) on SITL. Note that `-r` configures the streaming rate and `-u` identifies the MAVLink channel on UDP port 14556).

```
mavlink stream -r 50 -s CA_TRAJECTORY -u 14556
```

:::tip
You can use the `uorb top [<message_name>]` command to verify in real-time that your message is published and the rate (see [uORB Messaging](../middleware/uorb.md#uorb-top-command)). 
This approach can also be used to test incoming messages that publish a uORB topic (for other messages you might use `printf` in your code and test in SITL).

To see the message on *QGroundControl* you will need to [build it with your MAVLink library](https://dev.qgroundcontrol.com/en/getting_started/), and then verify that the message is received using [MAVLink Inspector Widget](https://docs.qgroundcontrol.com/en/app_menu/mavlink_inspector.html) (or some other MAVLink tool).
:::

## Receiving Custom MAVLink Messages

This section explains how to receive a message over MAVLink and publish it to uORB.

Add a function that handles the incoming MAVLink message in
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L77)

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink_msg_ca_trajectory.h>
```

Add a function that handles the incoming MAVLink message in the `MavlinkReceiver` class in
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L140)

```C
void handle_message_ca_trajectory_msg(mavlink_message_t *msg);
```
Add an uORB publisher in the `MavlinkReceiver` class in
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L195)

```C
uORB::Publication<ca_trajectory_s>			_flow_pub{ORB_ID(ca_trajectory)};
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
        
    _ca_traj_msg_pub.publish(f);
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
```

## Alternative to Creating Custom MAVLink Messages

Sometimes there is the need for a custom MAVLink message with content that is not fully defined.

For example when using MAVLink to interface PX4 with an embedded device, the messages that are exchanged between the autopilot and the device may go through several iterations before they are stabilized.
In this case, it can be time-consuming and error-prone to regenerate the MAVLink headers, and make sure both devices use the same version of the protocol.

An alternative - and temporary - solution is to re-purpose debug messages. 
Instead of creating a custom MAVLink message `CA_TRAJECTORY`, you can send a message `DEBUG_VECT` with the string key `CA_TRAJ` and data in the `x`, `y` and `z` fields.
See [this tutorial](../debug/debug_values.md). for an example usage of debug messages.

:::note
This solution is not efficient as it sends character string over the network and involves comparison of strings. 
It should be used for development only!
:::

## General

### Set streaming rate

Sometimes it is useful to increase the streaming rate of individual topics (e.g. for inspection in QGC). 
This can be achieved by typing the following line in the shell:
```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```
You can get the port number with `mavlink status` which will output (amongst others) `transport protocol: UDP (<port number>)`. 
An example would be:
```sh
mavlink stream -u 14556 -s OPTICAL_FLOW_RAD -r 300
```
