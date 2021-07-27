# uORB 메시징

## 소개

uORB는 스레드 간/프로세스 간 통신에 사용되는 비동기식 `publish()` / `subscribe()` 메시징 API입니다.

C++에서의 사용 방법은 [자습서](../modules/hello_sky.md)를 참고하십시오.

많은 응용 프로그램이 uORB에 의존하므로 uORB는 부팅시에 자동으로 시작됩니다. `uorb start` 로 시작합니다. 단위 테스트는 `uorb_tests`로 시작합니다.

## 새로운 토픽 추가하기

새로운 uORB 토픽은 메인 PX4/PX4-Autopilot 저장소에 추가하거나 트리 외부 메시지 정의에 추가할 수 있습니다. 트리 외부 uORB 메시지 정의 추가에 대한 정보는 [이 섹션](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions)을 참고하십시오.

새 토픽을 추가하려면, `msg/` 디렉터리에 새 **.msg** 파일을 만들고 파일 이름을 `msg/CMakeLists.txt` 목록에 추가합니다. 이렇게 하면, 필요한 C/C++ 코드가 자동으로 생성됩니다.

지원되는 유형에 대한 기존 `msg` 파일을 살펴보십시오. 메시지는 다른 메시지에 중첩되어 사용될 수 있습니다.

생성된 각 C/C++ 구조체에 `uint64_t timestamp` 필드가 추가됩니다. 이것은 로거에 사용되며, 메시지 게시시에 입력하여야 합니다.

코드에서 주제를 사용하려면 헤더를 포함하십시오.

```
#include <uORB/topics/topic_name.h>
```

`.msg` 파일에 다음과 같은 줄을 추가하여, 여러 개의 독립적인 토픽의 단일 메시지 정의를 사용할 수 있습니다.

```
# TOPICS mission offboard_mission onboard_mission
```

그런 다음 코드에서 토픽 ID로 사용합니다. `ORB_ID(offboard_mission)`.


## 퍼블리시(게시)

토픽 게시는 인터럽트 컨텍스트(`hrt_call` API에 의해 호출되는 함수)를 포함하여 시스템의 어디에서나 수행할 수 있습니다. 그러나, 토픽 게시는 인터럽트 컨텍스트 외부에서만 가능합니다. 주제는 나중에 게시되는 것과 동일한 프로세스에서 광고되어야 합니다.

## 토픽 나열 및 듣기

:::note
`listener` 명령은 Pixracer(FMUv4)와 Linux/OS X에서만 사용할 수 있습니다.
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
NuttX 기반 시스템(Pixhawk, Pixracer 등)에서 *QGroundControl* MAVLink 콘솔 내에서 `listener` 명령을 호출하여 센서 및 기타 주제의 값을 검사할 수 있습니다. 이것은 QGC가 무선 틍신으로 연결된 경우에도(예: 차량이 비행 중일 때) 사용할 수 있는 강력한 디버깅 도구입니다. 자세한 내용은 [센서/주제 디버깅](../debug/sensor_uorb_topic_debugging.md)을 참고하십시오.
:::

### uorb top 명령어

`uorb top` 명령은 실시간으로 각 주제의 게시 빈도를 나타냅니다.

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


## 다중 인스턴스

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`. It will return an instance index to the publisher. A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance). Having multiple instances is useful for example if the system has several sensors of the same type.

The following explains some common pitfalls and corner cases:

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/uORB/uORBManager.hpp).

<a id="deprecation"></a>

## Troubleshooting and common Pitfalls
As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- Changing existing fields or messages that external tools rely on is generally acceptable if there are good reasons for the update. In particular for breaking changes to *Flight Review*, *Flight Review* must be updated before code is merged to `master`.
- In order for external tools to reliably distinguish between two message versions, the following steps must be followed:
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - Removed or renamed fields must be commented and marked as deprecated. For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`. This is to ensure that removed fields (or messages) are not re-added in future.
  - In case of a semantic change (e.g. the unit changes from degrees to radians), the field must be renamed as well and the previous one marked as deprecated as above.

