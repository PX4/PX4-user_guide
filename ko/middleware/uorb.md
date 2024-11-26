# uORB 메시징

## 소개

The uORB is an asynchronous `publish()` / `subscribe()` messaging API used for inter-thread/inter-process communication.

Look at the [tutorial](../modules/hello_sky.md) to learn how to use it in C++.

많은 응용 프로그램이 uORB에 의존하므로 uORB는 부팅시에 자동으로 시작됩니다.
It is started with `uorb start`. Unit tests can be started with `uorb_tests`.

## 새로운 토픽 추가하기

새로운 uORB 토픽은 메인 PX4/PX4-Autopilot 저장소에 추가하거나 트리 외부 메시지 정의에 추가할 수 있습니다.
For information on adding out-of-tree uORB message definitions, please see [this section](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions).

To add a new topic, you need to create a new **.msg** file in the `msg/` directory and add the file name to the `msg/CMakeLists.txt` list.
이렇게 하면, 필요한 C/C++ 코드가 자동으로 생성됩니다.

Have a look at the existing `msg` files for supported types.
메시지는 다른 메시지에 중첩되어 사용될 수 있습니다.

To each generated C/C++ struct, a field `uint64_t timestamp` will be added.
이것은 로거에 사용되며, 메시지 게시시에 입력하여야 합니다.

코드에서 주제를 사용하려면 헤더를 포함하십시오.

```cpp
#include <uORB/topics/topic_name.h>
```

By adding a line like the following in the `.msg` file, a single message definition can be used for multiple independent topics:

```cpp
# TOPICS mission offboard_mission onboard_mission
```

Then in the code, use them as topic id: `ORB_ID(offboard_mission)`.

## 퍼블리시(게시)

Publishing a topic can be done from anywhere in the system, including interrupt context (functions called by the `hrt_call` API).
However, the topic needs to be advertised and published outside of an interrupt context (at least once) before it can be published in an interrupt context.

## 토픽 나열 및 듣기

:::info
The `listener` command is only available on Pixracer (FMUv4) and Linux / OS X.
:::

모든 토픽을 나열하려면, 파일 핸들을 나열하십시오.

```sh
ls /obj
```

5개의 메시지에 대해 한 토픽의 내용을 들으려면, 리스너를 실행하십시오.

```sh
listener sensor_accel 5
```

출력은 주제 내용의 n배입니다.

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
이것은 QGC가 무선 틍신으로 연결된 경우에도(예: 차량이 비행 중일 때) 사용할 수 있는 강력한 디버깅 도구입니다.
For more information see: [Sensor/Topic Debugging](../debug/sensor_uorb_topic_debugging.md).
:::

### uorb top 명령어

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

각 칼럼은 주제 이름, 다중 인스턴스 인덱스, 구독자 수, 게시 빈도(Hz), 초당 손실된 메시지 수(모든 구독자가 결합된 경우) 및 대기열 크기입니다.

## Plotting Changes in Topics

Topic changes can be plotted in realtime using PlotJuggler and the PX4 ROS 2 integration (note that this actually plots ROS topics that correspond to uORB topics, but the effect is the same).

For more information see: [Plotting uORB Topic Data in Real Time using PlotJuggler](../debug/plotting_realtime_uorb_data.md).

<video src="../../assets/debug/realtime_debugging/realtime_debugging.mp4" width="720" controls></video>

## 다중 인스턴스

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`.
게시자에게 인스턴스 인덱스를 반환합니다.
A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance).
예를 들어, 시스템에 동일 유형의 센서가 여러 개 있는 경우에는 인스턴스가 여러 개 있으면 유용합니다.

Make sure not to mix `orb_advertise_multi` and `orb_advertise` for the same topic.

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/main/platforms/common/uORB/uORBManager.hpp).

## Message/Field Deprecation {#deprecation}

As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- 업데이트에 대한 타당한 이유가 있는 경우에는, 외부 도구가 의존하는 기존 필드 또는 메시지를 변경하는 것이 일반적으로 허용됩니다.
  In particular for breaking changes to _Flight Review_, _Flight Review_ must be updated before code is merged to `master`.
- 외부 도구가 두 메시지 버전을 확실하게 구별하려면, 다음 단계를 따라야 합니다.
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - 제거되거나 이름이 변경된 필드는 주석을 달고 더 이상 사용되지 않는 것으로 표시하여야 합니다.
    For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`.
    이것은 제거된 필드(또는 메시지)가 다시 추가되지 않도록 하기 위한 것입니다.
  - 의미 변경의 경우(예: 단위가 도에서 라디안으로 변경) 필드 이름도 변경하여야 하며, 이전 필드도 위와 같이 더 이상 사용되지 않는 것으로 표시되어야 합니다.
