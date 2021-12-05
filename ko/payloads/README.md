# 탑재 중량과 카메라

PX4는 카메라와 같은 다양한 장치들을 탑재할 수 있습니다.

## 드론 매핑

매핑 드론은 카메라를 사용하여  이미지를 캡쳐합니다.

[MAVLink 카메라 프로토콜](https://mavlink.io/en/services/camera.html)을 지원하는 MAVLink 카메라는 PX4와 QGroundControl에서 최적으로 통합됩니다. MAVSDK는 [독립형 카메라 작업](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html)과 [임무](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)에서 MAVLink 프로토콜을 위한 간단한 API를 제공합니다.

카메라는 PWM이나 GPI 출력을 사용하여 비행콘트롤러에 직접 연결할 수 있습니다. PX4는 비행콘트롤러에 연결된 카메라에 다음과 같은 MAVLink 명령/임무 항목 세트를 지원합니다.
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - 캡처 시간 간격을 설정합니다.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - 캡처 거리 간격을 설정합니다.
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - 캡처 시작/중지 (위 메시지를 사용하여 정의한 거리 또는 시간 사용).

다음 항목에서는 카메라를 *연결*하여 PX4 설정 방법을 설명합니다.
* 비행 콘트롤러 PWM 또는 GPIO 출력에서 또는 MAVLink를 통해 [카메라 트리거](../peripherals/camera.md)
* 핫슈 입력을 통한 [카메라 타이밍 피드백](../peripherals/camera.md#camera-capture)


## 화물 드론("액추에이터" 탑재)

화물 드론은 일반적으로 서보와 액추에이터로 화물을  방출하거나 자세를 제어합니다. PX4에서는 RC와 MAVLink 명령어로 서보와 GPIO 트리거를 지원합니다.

### RC 트리거

최대 3 개의 RC 채널을 매핑하여 [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) 에서 [RC_MAP_AUX3](../advanced_config/parameter_reference.md#RC_MAP_AUX3) 까지의 매개변수를 사용하여 비행 콘트롤러에 연결된 서보와 액추에이터를 제어할 수 있습니다.

RC 채널은 *보통* 비행 콘트롤러의 `AUX1`, `AUX2`, `AUX3` 출력에 매핑됩니다. 차량의 RC AUX 패스스루에 사용되는 출력은 [기체 정의서](../airframes/airframe_reference.md)을 참고하십시오. 예를 들어, [Quadrotor-X](../airframes/airframe_reference.md#quadrotor-x)에는 "**AUX1 :** RC AUX1 채널의 피드 스루", "**AUX2 :** RC AUX2 채널의 피드 스루", **AUX3 :** RC AUX3 채널의 피드 스루 "와 같은 일반 매핑이 있습니다.

기체의 RC AUX 피드 스루 출력을 지정하지 않은 경우 [Control group 3](../concept/mixing.md#control-group-3-manual-passthrough) 출력 5-7을 원하는 포트로 매핑하여, 사용자가 정의한 [Mixer File](../concept/mixing.md)로 추가할 수 있습니다. 이러한 믹서의 예는 기본 패스스루 믹서입니다 : [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix).

:::note
"RC AUX의 피드 스루"에 사용되는 동일한 출력은 MAVLink 명령을 사용하여 설정할 수 있습니다 ([아래](#mission-triggering) 참조). PX4는 두 메커니즘중에서 설정된 마지막 값을 사용합니다.
:::


### 임무 트리거

[MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink 명령어을 사용하여 임무 수행이나 명령어로 한 번에 최대 3 개의 액추에이터 값을 설정할 수 있습니다.

명령 매개변수 `param1`, `param2` 및 `param3`은 _일반적으로_ `AUX1`에 매핑되며, 비행 콘트롤러의 `AUX2`, `AUX3` 출력, 명령 매개변수 `param4` ~ `param7`은 PX4에서 사용되지 않거나 무시됩니다. 매개변수는 `[-1, 1]` 범위의 정규화 수치를 사용합니다. 결과적으로 PWM 출력 범위는 `[PWM_AUX_MINx, PWM_AUX_MAXx]` 입니다. 여기서 X는 출력 번호입니다. 제어되지 않는 모든 매개변수나 액추에이터는 `NaN`으로 설정하여야 합니다.

:::note MAVLink는 [RC AUX 패스스루](#rc-triggering)에 대해 설정된 것과 동일한 출력을 사용합니다(이전 섹션 참조). 차량의 [기체 정의서](../airframes/airframe_reference.md)에서 어떤 출력이 사용되는 지 확인하고, 필요한 경우 [맞춤 믹서 파일](../concept/mixing.md)을 사용하여 변경할 수 있습니다.
:::


### MAVSDK (예제 스크립트)

음 [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) [예제 코드](https://github.com/mavlink/MAVSDK/blob/main/examples/set_actuator/set_actuator.cpp)는 MAVSDK Action 플러그인의 [`set_actuator()`](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1ad30beac27f05c62dcf6a3d0928b86e4c) 함수를 사용하여 페이로드를 해제하는 방법을 설명합니다.

`set_actuator()` 번호 1~3은 *일반적으로* 비행 컨트롤러의 출력`AUX1`, `AUX2`, `AUX3`에 매핑됩니다.

:::note MAVSDK는 후드 아래에서 [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink 명령을 전송하므로 [미션 트리거링](#mission-triggering) 및 [RC 트리거링](#rc-triggering)에 설정과 동일한 출력을 사용합니다(이전 섹션 참조 ). 차량의 [기체 정의서](../airframes/airframe_reference.md)에서 어떤 출력이 사용되는 지 확인하고, 필요한 경우 [맞춤 믹서 파일](../concept/mixing.md)을 사용하여 변경할 수 있습니다.
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
