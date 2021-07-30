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

[mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp)에 MAVLink와 uORB 메시지의 헤더를 추가합니다.

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

마지막으로 [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_messages.cpp) 파일의 맨 아래에 있는 `streams_list`에 스트림 클래스를 추가합니다.

```C
StreamListItem *streams_list[] = {
...
create_stream_list_item<MavlinkStreamCaTrajectory>(),
...
```

그런 다음 예를 들어 [시작 스크립트](../concept/system_startup.md)에 다음 줄을 추가하여 스트림을 활성화하여야 합니다(예: NuttX의 경우 [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) 또는 SITL의 [ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS)). `-r`은 스트리밍 속도를 설정하고, `-u`는 UDP 포트 14556에서 MAVLink 채널을 식별합니다.

```
mavlink stream -r 50 -s CA_TRAJECTORY -u 14556
```

:::tip
`uorb top [<message_name>]` 명령을 사용하여 메시지가 게시 여부와 비율을 실시간으로 확인할 수 있습니다([uORB 메시지](../middleware/uorb.md#uorb-top-command) 참조). 이 접근 방식은 uORB 주제를 게시하는 수신 메시지를 테스트할 수 있습니다(다른 메시지의 경우 코드에서 `printf`를 사용하고 SITL에서 테스트할 수 있음).

*QGroundControl*에서 메시지를 보려면 [MAVLink 라이브러리로 빌드](https://dev.qgroundcontrol.com/en/getting_started/)한 다음 [MAVLink Inspector Widget](https://docs.qgroundcontrol.com/en/app_menu/mavlink_inspector.html)을 사용하여 메시지가 수신 여부를 확인합니다. (또는 다른 MAVLink 도구).
:::

## 사용자 지정 MAVLink 메시지 수신

MAVLink 메시지 수신 방법과 uORB에 게시 방법을 설명합니다.

[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L77)에 수신되는 MAVLink 메시지를 처리하는 기능을 추가합니다.

```C
#include <uORB/topics/ca_trajectory.h>
#include <v2.0/custom_messages/mavlink_msg_ca_trajectory.h>
```

[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L140)의 `MavlinkReceiver` 클래스에서 수신되는 MAVLink 메시지를 처리하는 함수를 추가합니다.

```C
void handle_message_ca_trajectory_msg(mavlink_message_t *msg);
```
[mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.h#L195)의 `MavlinkReceiver` 클래스에 uORB 게시자 추가합니다.

```C
uORB::Publication<ca_trajectory_s>          _flow_pub{ORB_ID(ca_trajectory)};
```

[mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp)에서 `handle_message_ca_trajectory_msg` 함수를 구현합니다.

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

마지막으로, [MavlinkReceiver::handle_message()](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp#L228)에서 호출되는 지 확인합니다.

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

## 사용자 지정 MAVLink 메시지 생성에 대한 대안

때로는 완전히 정의되지 않은 콘텐츠에 대한 사용자 정의 MAVLink 메시지가 필요합니다.

예를 들어, MAVLink를 사용하여 임베디드 장치와 PX4를 인터페이스시에 자동조종장치와 장치간에 교환되는 메시지는 안정화되기 전에 여러 번 반복될 수 있습니다. 이 경우에는 MAVLink 헤더를 재생성하고 두 장치가 동일한 버전의 프로토콜을 사용하는지 확인하는 데 시간이 많이 걸리고, 오류가 발생하기 쉽습니다.

대안과 임시 솔루션은 디버그 메시지의 용도를 변경하는 것입니다. MAVLink 개별 메세지 `CA_TRAJECTORY`를 만드는 대신, `CA_TRAJ` 문자열 키와 `x`, `y`, `z` 필드에 데이터를  담은 `DEBUG_VECT` 메세지를 전송 가능합니다. 디버그 메시지의 사용 예는 이 [튜토리얼](../debug/debug_values.md)을  참고하십시오.

:::note
이 솔루션은 네트워크에서 문자열을 전송하고 문자열 비교를 포함하므로 효율적이지 않습니다. 개발용으로만 사용하는 것이 좋습니다!
:::

## 일반

### 스트리밍 속도 설정

때로는 개별 주제의 스트리밍 속도를 높이는 것이 유용합니다(예: QGC에서 검사). 셸에서 다음 명령어를 실행하십시오.
```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```
`mavlink 상태`와 함께 포트 번호를 조회할 수 있습니다. 이 포트 번호는 (무엇보다도) `전송 프로토콜: UDP(<port number>)`를 출력합니다. 예제는 다음과 같습니다:
```sh
mavlink stream -u 14556 -s OPTICAL_FLOW_RAD -r 300
```
