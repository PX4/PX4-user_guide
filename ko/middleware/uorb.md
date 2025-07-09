---
canonicalUrl: https://docs.px4.io/main/ko/middleware/uorb
---

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

토픽 게시는 인터럽트 컨텍스트(`hrt_call` API에 의해 호출되는 함수)를 포함하여 시스템의 어디에서나 수행할 수 있습니다. However, the topic needs to be advertised and published outside of an interrupt context (at least once) before it can be published in an interrupt context.

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

uORB는 `orb_advertise_multi`로 동일한 주제의 여러 독립 인스턴스를 게시하는 메커니즘을 제공합니다. 게시자에게 인스턴스 인덱스를 반환합니다. 그러면, 구독자는 `orb_subscribe_multi`를 사용하여, 구독할 인스턴스를 선택하여야 합니다(`orb_subscribe`는 첫 번째 인스턴스에 구독). 예를 들어, 시스템에 동일 유형의 센서가 여러 개 있는 경우에는 인스턴스가 여러 개 있으면 유용합니다.

동일한 주제에 대하여 `orb_advertise_multi`와 `orb_advertise`를 혼용하지 마십시오.

전체 API는 [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/master/platforms/common/uORB/uORBManager.hpp)를 참고하십시오.

<a id="deprecation"></a>

## 메시지/필드 지원 중단
[비행 검토](https://github.com/PX4/flight_review)와 같이 로그 파일의 uORB 메시지를 사용하는 외부 도구가 있으므로, 기존 메시지를 업데이트할 때 다음과 같은 측면을 고려하여야 합니다.

- 업데이트에 대한 타당한 이유가 있는 경우에는, 외부 도구가 의존하는 기존 필드 또는 메시지를 변경하는 것이 일반적으로 허용됩니다. 특히 *비행 검토*에 대한 주요 변경사항의 경우에는, 코드가 `마스터`에 병합되기 전에 *비행 검토*를 업데이트하여야 합니다.
- 외부 도구가 두 메시지 버전을 확실하게 구별하려면, 다음 단계를 따라야 합니다.
  - 제거되거나 이름이 변경된 메시지는 [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189)의 `deprecated_msgs` 목록에 추가하여야 하며, **.msg** 파일을 삭제하여야 합니다.
  - 제거되거나 이름이 변경된 필드는 주석을 달고 더 이상 사용되지 않는 것으로 표시하여야 합니다. 예를 들어, `uint8 quat_reset_counter`는 `# DEPRECATED: uint8 quat_reset_counter`가 됩니다. 이것은 제거된 필드(또는 메시지)가 다시 추가되지 않도록 하기 위한 것입니다.
  - 의미 변경의 경우(예: 단위가 도에서 라디안으로 변경) 필드 이름도 변경하여야 하며, 이전 필드도 위와 같이 더 이상 사용되지 않는 것으로 표시되어야 합니다.

