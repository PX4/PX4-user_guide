# MAVLink 메시징

[MAVLink](https://mavlink.io/en/)는 드론 생태계를 위하여 설계된 초경량 메시징 프로토콜입니다.

PX4는 *MAVLink*를 사용하여 *QGroundControl*등의 지상국과 통신하고, 비행 콘트롤러 외부의 드론 구성요소(보조 컴퓨터, MAVLink 지원 카메라)에 연결 통합 메커니즘으로 사용합니다.

이 프로토콜은 데이터 교환을 위한 다수의 표준 [메시지](https://mavlink.io/en/messages/)와 [마이크로서비스](https://mavlink.io/en/services/)를 정의합니다(전부는 아니지만 다수의 메시지/서비스가 PX4에서 구현됨).

이 튜토리얼은 PX4에 새로운 "사용자 정의" 메시지를 추가하는 방법을 설명합니다.

:::note
튜토리얼에서는 `msg/ca_trajectory.msg`에 [맞춤 uORB](../middleware/uorb.md) `ca_trajectory` 메시지와 `mavlink/include/mavlink/v2.0/custom_messages/mavlink_msg_ca_trajectory.h`에 맞춤 MAVLink `ca_trajectory` 메시지가 있다고 가정합니다.
:::

## 사용자 정의 MAVLink 메시지 정의

MAVLink 개발 가이드는 새 메시지를 정의 방법과 프로그래밍 라이브러리 빌드 방법을 설명합니다.
- [MAVLink 메시지 정의/열거 방법](https://mavlink.io/en/guide/define_xml_element.html)
- [MAVLink 라이브러리 생성](https://mavlink.io/en/getting_started/generate_libraries.html)

메시지는 MAVLink 2용 C 라이브러리로 생성되어야 합니다. [MAVLink를 설치](https://mavlink.io/en/getting_started/installation.html)후, 다음 명령을 사용하여 다음 작업을 수행합니다.
```sh
python -m pymavlink.tools.mavgen --lang=C --wire-protocol=2.0 --output=generated/include/mavlink/v2.0 message_definitions/v1.0/custom_messages.xml
```

사용/테스트를 위해 생성된 헤더를 **PX4-Autopilot/mavlink/include/mavlink/v2.0**에 복사합니다.

다른 사람들이 변경 사항을 더 쉽게 테스트할 수 있도록, https://github.com/mavlink/c_library_v2의 포크에 생성된 헤더를 추가하는 것이 좋습니다. PX4 개발자는 빌드전에 PX4-Autopilot 리포지토리에서 하위 모듈을 포크로 업데이트할 수 있습니다.


## 사용자 정의 MAVLink 메시지 전송

사용자 지정 uORB 메시지를 사용법과 MAVLink 메시지 전송 방법을 설명합니다.

MAVLink와 uORB 메시지의 헤더를 다음에 추가합니다. [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp)

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink.h>
```

[mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp#L2193)에서 새 클래스를 생성합니다.

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

마지막으로 [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp)파일의 맨 아래에 있는 `streams_list`에 스트림 클래스를 추가합니다.

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
You can use the `uorb top [<message_name>]` command to verify in real-time that your message is published and the rate (see [uORB Messaging](../middleware/uorb.md#uorb-top-command)). This approach can also be used to test incoming messages that publish a uORB topic (for other messages you might use `printf` in your code and test in SITL).

To see the message on *QGroundControl* you will need to [build it with your MAVLink library](https://dev.qgroundcontrol.com/en/getting_started/), and then verify that the message is received using [MAVLink Inspector Widget](https://docs.qgroundcontrol.com/en/app_menu/mavlink_inspector.html) (or some other MAVLink tool).
:::

## Receiving Custom MAVLink Messages

Add an uORB publisher in the `MavlinkReceiver` class in [mavlink_receiver.h](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_receiver.h#L195)

Implement the `handle_message_ca_trajectory_msg` function in [mavlink_receiver.cpp](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_receiver.cpp)

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink_msg_ca_trajectory.h>
```

and finally make sure it is called in [MavlinkReceiver::handle_message()](https://github.com/PX4/Firmware/blob/master/src/modules/mavlink/mavlink_receiver.cpp#L228)

```C
void handle_message_ca_trajectory_msg(mavlink_message_t *msg);
```
Add an uORB publisher in the `MavlinkReceiver` class in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L195)

```C
uORB::Publication<ca_trajectory_s>          _flow_pub{ORB_ID(ca_trajectory)};
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

For example when using MAVLink to interface PX4 with an embedded device, the messages that are exchanged between the autopilot and the device may go through several iterations before they are stabilized. In this case, it can be time-consuming and error-prone to regenerate the MAVLink headers, and make sure both devices use the same version of the protocol.

An alternative - and temporary - solution is to re-purpose debug messages. Instead of creating a custom MAVLink message `CA_TRAJECTORY`, you can send a message `DEBUG_VECT` with the string key `CA_TRAJ` and data in the `x`, `y` and `z` fields. See [this tutorial](../debug/debug_values.md). for an example usage of debug messages.

:::note
This solution is not efficient as it sends character string over the network and involves comparison of strings. It should be used for development only!
:::

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
