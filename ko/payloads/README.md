# 탑재 중량과 카메라

PX4는 다양한 페이로드와 카메라를 지원합니다.

## 드론 매핑

매핑 드론은 카메라를 사용하여 측량중 시간 또는 거리 간격으로 이미지를 캡처합니다.

[MAVLink 카메라 프로토콜](https://mavlink.io/en/services/camera.html)을 지원하는 MAVLink 카메라는 PX4와 QGroundControl에서 최적의 통합을 제공합니다. MAVSDK는 [독립형 카메라 작업](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html)과 [임무](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4) 모두에 이 프로토콜을 사용하기 위한 간단한 API를 제공합니다.

카메라는 PWM 또는 GPI 출력을 사용하여 비행컨트롤러에 직접 연결할 수 있습니다. PX4는 비행컨트롤러에 연결된 카메라에 대해 다음과 같은 MAVLink 명령/임무 항목 세트를 지원합니다.
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - 캡처 시간 간격을 설정합니다.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - 캡처 거리 간격을 설정합니다.
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - 캡처 시작/중지 (위 메시지를 사용하여 정의한 거리 또는 시간 사용).

다음 항목에서는 카메라를 *연결*하여 PX4 설정 방법을 설명합니다.
* 비행 컨트롤러 PWM 또는 GPIO 출력에서 또는 MAVLink를 통해 [카메라 트리거링](../peripherals/camera.md).
* 핫슈 입력을 통한 [카메라 타이밍 피드백](../peripherals/camera.md#camera_capture).


## 화물 드론 ( "액추에이터" 페이로드)

화물 드론은 일반적으로 서보/액추에이터를 사용하여 화물 방출을 트리거하고 윈치를 제어합니다. PX4는 RC 및 MAVLink 명령을 통해 서보 및 GPIO 트리거링을 지원합니다.

### RC 트리거링

최대 3 개의 RC 채널을 매핑하여 [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) ~ [RC_MAP_AUX3](../advanced_config/parameter_reference.md#RC_MAP_AUX3) 매개변수를 사용하여 비행컨트롤러에 연결된 서보/액추에이터를 제어할 수 있습니다.

RC 채널은 *보통* 비행컨트롤러의 `AUX1`, `AUX2`, `AUX3` 출력에 매핑됩니다 - _ 하지만 그럴 필요는 없습니다 _. 차량의 RC AUX 패스스루에 사용되는 출력은 [기체 정의서](../airframes/airframe_reference.html)에서 확인할 수 있습니다. 예를 들어, [Quadrotor-X](../airframes/airframe_reference.md#quadrotor-x)에는 "**AUX1 :** RC AUX1 채널의 피드 스루", "**AUX2 :** RC AUX2 채널의 피드 스루", **AUX3 :** RC AUX3 채널의 피드 스루 "와 같은 일반 매핑이 있습니다.

기체의 RC AUX 피드 스루 출력을 지정하지 않은 경우 [Control group 3](../concept/mixing.md#control-group-3-manual-passthrough) 출력 5-7을 원하는 포트로 매핑하여 사용자가 정의한 [Mixer File](../concept/mixing.md)을 사용하여 추가 할 수 있습니다. 이러한 믹서의 예는 기본 패스스루 믹서입니다 : [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix).

:::note
"RC AUX의 피드 스루"에 사용되는 동일한 출력은 MAVLink 명령을 사용하여 설정할 수도 있습니다 ([아래](#mission-triggering) 참조). PX4는 두 메커니즘 중 하나를 통하여 설정된 마지막 값을 사용합니다.
:::


### 임무 트리거링

[MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink 명령을 사용하여 미션에서 또는 명령으로 한 번에 최대 3 개의 액추에이터 값을 설정할 수 있습니다.

명령 매개 변수 `param1`, `param2` 및 `param3`은 [RC 트리거링](#rc-triggering)에 사용 된 것과 _동일한 출력_에 매핑됩니다. 일반적으로 비행컨트롤러의 `AUX1`, `AUX2`, `AUX3` 출력입니다 (위의 RC 섹션에서는 확인 방법을 설명합니다). 다른 명령의 매개변수 (`param4` ~ `param7`)들은 PX4에서 사용되지 않거나 무시됩니다.

매개 변수는 `[-1, 1]` 범위의 정규화된 값을 사용합니다 (결과적으로 PWM 출력은 `[PWM_AUX_MINx, PWM_AUX_MAXx]` 범위에서 X는 출력 번호 임). 제어되지 않는 모든 매개 변수/액추에이터는 `NaN`으로 설정하여야 합니다.


### MAVSDK (예제 스크립트)

다음 [MAVSDK](https://mavsdk.mavlink.io/develop/en/) 샘플 코드는 페이로드 릴리스를 트리거하는 방법을 설명합니다.

이 코드는 MAVSDK [MavlinkPassthrough](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_mavlink_passthrough.html) 플러그인을 사용하여 [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink 명령을 전송하고 (최대) 3 개의 액추에이터 값을 지정합니다.


<!-- note, we still need to explain how to map those values to actual outputs on PX4 
There are also questions on this script in the original PR.
-->

```cpp
#include <mavsdk/mavsdk.h>
#include <mavsdk/plugins/mavlink_passthrough/mavlink_passthrough.h>
#include <mavsdk/plugins/info/info.h>
#include <chrono>
#include <cstdint>
#include <iostream>
#include <future>
#include <memory>

using namespace mavsdk;

void send_actuator(MavlinkPassthrough& mavlink_passthrough,
        float value1, float value2, float value3);

int main(int argc, char **argv)
{
    Mavsdk mavsdk;
    std::string connection_url; << std::endl;
        return 1;
    }

    std::shared_ptr<System> system = mavsdk.systems().at(0);
    for (auto& tsystem : mavsdk.systems()) {
        auto info = Info{tsystem};
        std::cout << info.get_identification().second.hardware_uid << std::endl;
        if (info.get_identification().second.hardware_uid == "3762846593019032885") {
            system = tsystem;
        }
    }

    auto mavlink_passthrough = MavlinkPassthrough{system};

    send_actuator(mavlink_passthrough, value1, value2, value3);
```

## Surveillance, Search & Rescue

Surveillance and Search & Rescue drones have similar requirements to mapping drones. The main differences are that, in addition to flying a planned survey area, they typically need good standalone control over the camera for image and video capture, and they may need to be able to work during both day and night

Use a camera that supports the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) as this supports image and video capture, zooming, storage management, multiple cameras on the same vehicle and switching between them, etc. These cameras can be controlled either manually from QGroundControl or via MAVSDK (for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)). See [Camera triggering](../peripherals/camera.md) for information on how to configure your camera to work with MAVLink.

:::note
Cameras connected directly to the flight control _only_ support camera triggering, and are unlikely to be suitable for most surveillance/search work.
:::

A search and rescue drone may also need to carry cargo, for example, emergency supplies for a stranded hiker. See [Cargo Drones](#cargo-drones-actuator-payloads) above for information about payload delivery.
