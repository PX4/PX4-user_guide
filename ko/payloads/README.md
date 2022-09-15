# 탑재 중량과 카메라

PX4는 카메라와 같은 다양한 장치들을 탑재할 수 있습니다.

페이로드는 [비행콘트롤러 출력](../getting_started/px4_basic_concepts.md#outputs-motors-servos-actuators)에 연결되며 일반적으로 임무 수행시에 자동으로 동작하거나 RC 패스스루 또는 MAVLink/MAVSDK 명령을 사용하여 수동으로 동작할 수 있습니다.

:::note
Payloads (actuators) can be tested in the [pre-arm state](../getting_started/px4_basic_concepts.html#arming-and-disarming), which disables motors but allows actuators to move. 이 방법은 차량이 시동 상태에서 테스트하는 것보다 더 안전합니다.
:::

## 드론 매핑

매핑 드론은 카메라를 사용하여  이미지를 촬영합니다.

[MAVLink 카메라 프로토콜](https://mavlink.io/en/services/camera.html)을 지원하는 MAVLink 카메라는 PX4와 QGroundControl에서 최적으로 통합됩니다. MAVSDK는 [독립형 카메라 작업](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html)과 [임무](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)에서 MAVLink 프로토콜을 위한 간단한 API를 제공합니다.

카메라는 PWM이나 GPI 출력을 사용하여 비행콘트롤러에 직접 연결할 수 있습니다. PX4는 비행콘트롤러에 연결된 카메라에 다음과 같은 MAVLink 명령/임무 항목 세트를 지원합니다.

* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - 캡처 시간 간격을 설정합니다.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - 캡처 거리 간격을 설정합니다.
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - 캡처 시작/중지 (위 메시지를 사용하여 정의한 거리 또는 시간 사용).

The following topics show how to *connect* and configure a camera:

* [Camera Triggering](../peripherals/camera.md) from flight controller PWM or GPIO outputs, or via MAVLink.
* [Camera Capture](../peripherals/camera.md#camera-capture) feedback via hotshoe input.

## 화물 드론("액추에이터" 탑재)

Cargo drones commonly use servos/actuators to trigger cargo release, control winches, and so on. PX4 supports actuator triggering using both RC and MAVLink commands.

### RC Payload Control

Up to 6 autopilot PWM or CAN outputs can be controlled using RC channels. The outputs that are to be controlled are specified in the [Actuators](../config/actuators.md#actuator-outputs) configuration screen by assigning the functions `RC AUX 1` to `RC AUX 6` to the desired [actuator outputs](../config/actuators.md#actuator-outputs).

To map a particular RC channel to an output function `RC AUX n` (and hence it's assigned output) you use the [RC_MAP_AUXn](../advanced_config/parameter_reference.md#RC_MAP_AUX1) parameter that has the same `n` number.

For example, to control an actuator attached to AUX pin 3 (say) you could assign it the output function `RC AUX 5`. You would then use set the RC channel to control that ouptut using `RC_MAP_AUX5`.


### MAVLink Payload Control

[MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) can be used in a command or mission to set the value of up to 6 actuators (at a time).

The outputs that are to be controlled are specified in the [Actuators](../config/actuators.md#actuator-outputs) configuration screen by assigning the functions `Offboard Actuator Set 1` to `Offboard Actuator Set 6` to the desired [actuator outputs](../config/actuators.md#actuator-outputs).

`MAV_CMD_DO_SET_ACTUATOR` `param1` to `param6` control the outputs mapped by `Offboard Actuator Set 1` to `Offboard Actuator Set 6` respectively.


### MAVSDK (예제 스크립트)

음 [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) [예제 코드](https://github.com/mavlink/MAVSDK/blob/main/examples/set_actuator/set_actuator.cpp)는 MAVSDK Action 플러그인의 [`set_actuator()`](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1ad30beac27f05c62dcf6a3d0928b86e4c) 함수를 사용하여 페이로드를 해제하는 방법을 설명합니다.

The `set_actuator()` index values map to the MAVLink payload outputs defined for your airframe.

:::note MAVSDK
sends the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command under the hood.
:::

```cpp
#include <mavsdk/mavsdk.h>
#include <mavsdk/plugins/action/action.h>
#include <chrono>
#include <cstdint>
#include <iostream>
#include <future>

using namespace mavsdk;

void usage(const std::string& bin_name)
{
    std::cerr << "Usage :" << bin_name << " <connection_url> <actuator_index> <actuator_value>\n"
              << "Connection URL format should be :\n"
              << " For TCP : tcp://[server_host][:server_port]\n"
              << " For UDP : udp://[bind_host][:bind_port]\n"
              << " For Serial : serial:///path/to/serial/dev[:baudrate]\n"
              << "For example, to connect to the simulator use URL: udp://:14540\n";
}

int main(int argc, char** argv)
{
    if (argc != 4) {
        usage(argv[0]);
        return 1;
    }

    const std::string connection_url = argv[1];
    const int index = std::stod(argv[2]);
    const float value = std::stof(argv[3]);

    Mavsdk mavsdk;
    const ConnectionResult connection_result = mavsdk.add_any_connection(connection_url);

    if (connection_result != ConnectionResult::Success) {
        std::cerr << "Connection failed: " << connection_result << '\n';
        return 1;
    }

    std::cout << "Waiting to discover system...\n";
    auto prom = std::promise<std::shared_ptr<System>>{};
    auto fut = prom.get_future();

    // We wait for new systems to be discovered, once we find one that has an
    // autopilot, we decide to use it.
    mavsdk.subscribe_on_new_system([&mavsdk, &prom]() {
        auto system = mavsdk.systems().back();

        if (system->has_autopilot()) {
            std::cout << "Discovered autopilot\n";

            // Unsubscribe again as we only want to find one system.
            mavsdk.subscribe_on_new_system(nullptr);
            prom.set_value(system);
        }
    });

    // We usually receive heartbeats at 1Hz, therefore we should find a
    // system after around 3 seconds max, surely.
    if (fut.wait_for(std::chrono::seconds(3)) == std::future_status::timeout) {
        std::cerr << "No autopilot found, exiting.\n";
        return 1;
    }

    // Get discovered system now.
    auto system = fut.get();

    // Instantiate plugins.
    auto action = Action{system};

    std::cout << "Setting actuator...\n";
    const Action::Result set_actuator_result = action.set_actuator(index, value);

    if (set_actuator_result != Action::Result::Success) {
        std::cerr << "Setting actuator failed:" << set_actuator_result << '\n';
        return 1;
    }

    return 0;
}
```

## 감시, 검색 및 구출

감시, 검색 및 구조용 드론은 매핑 드론과 요구 사항이 유사합니다. 주요 차이점은 계획된 조사 영역을 비행하는 것 외에는 이미지 및 비디오 캡처 카메라에 대한 독립 실행형 제어가 필요한 점과 주야 작업이 가능하여야 한다는 점입니다.

[MAVLink 카메라 프로토콜](https://mavlink.io/en/services/camera.html)을 지원하는 카메라를 사용하십시오.이 카메라는 이미지 및 비디오 캡처, 확대/축소, 저장 관리, 동일한 차량의 여러 카메라 및 카메라 간 전환을 지원합니다. 이러한 카메라는 QGroundControl 또는 MAVSDK를 통해 수동으로 제어할 수 있습니다 ([독립형 카메라 작동](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) 및 [임무](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4) 모두). MAVLink 연동 카메라 설정법은 [카메라 트리거](../peripherals/camera.md)를 참조하십시오.

:::note
비행 제어 장치에 직접 연결된 카메라 _만_ 카메라 트리거를 지원하며, 대부분 감시 검색 작업에는 적합하지 않을 수 있습니다.
:::

수색 및 구조용 드론은 실종 등산객을 위한 비상 용품과 같은 화물을 운반할 수 있습니다. 페이로드 배송에 대한 정보는 위의 [화물 드론](#cargo-drones-actuator-payloads)을 참조하십시오.
