---
canonicalUrl: https://docs.px4.io/main/ko/payloads/README
---

# 탑재 중량과 카메라

PX4는 카메라와 같은 다양한 장치들을 탑재할 수 있습니다.

Payloads are connected to [Fight Controller outputs](../getting_started/px4_basic_concepts.md#outputs-motors-servos-actuators), and can generally be triggered automatically in missions, or manually using RC passthrough, mapping to a joystick, or MAVLink/MAVSDK commands.

:::note
Payloads (actuators) can be tested in the [pre-arm state](../getting_started/px4_basic_concepts.md#arming-and-disarming), which disables motors but allows actuators to move. 이 방법은 차량이 시동 상태에서 테스트하는 것보다 더 안전합니다.
:::

## 드론 매핑

매핑 드론은 카메라를 사용하여  이미지를 촬영합니다.

[MAVLink 카메라 프로토콜](https://mavlink.io/en/services/camera.html)을 지원하는 MAVLink 카메라는 PX4와 QGroundControl에서 최적으로 통합됩니다. MAVSDK는 [독립형 카메라 작업](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html)과 [임무](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)에서 MAVLink 프로토콜을 위한 간단한 API를 제공합니다.

카메라는 PWM이나 GPI 출력을 사용하여 비행콘트롤러에 직접 연결할 수 있습니다. PX4는 비행콘트롤러에 연결된 카메라에 다음과 같은 MAVLink 명령/임무 항목 세트를 지원합니다.

- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - 캡처 시간 간격을 설정합니다.
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - 캡처 거리 간격을 설정합니다.
- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - 캡처 시작/중지 (위 메시지를 사용하여 정의한 거리 또는 시간 사용).

The following topics show how to *connect* and configure a camera:

- [Camera Triggering](../peripherals/camera.md) from flight controller PWM or GPIO outputs, or via MAVLink.
- [Camera Capture](../peripherals/camera.md#camera-capture) feedback via hotshoe input.


## Cargo Drones (Package Delivery)

Cargo drones commonly use grippers, winches, and other mechanisms to release packages at their destinations.

PX4 supports _package delivery in missions_ using a [gripper](../peripherals/gripper.md). Grippers can also be triggering using the [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) MAVLink command, or manually via a Joystick button.

For setup and usage information see:

- [Gripper](../peripherals/gripper.md)
- [Flying > Package Delivery Mission Planning](../flying/package_delivery_mission.md)

:::note
Support for winches and other release mechanisms is also intended.

If you need to perform cargo delivery using hardware that is not yet integrated, you can use [Generic Actuator Control](#generic-actuator-control).
:::

## 감시, 검색 및 구출

감시, 검색 및 구조용 드론은 매핑 드론과 요구 사항이 유사합니다. 주요 차이점은 계획된 조사 영역을 비행하는 것 외에는 이미지 및 비디오 캡처 카메라에 대한 독립 실행형 제어가 필요한 점과 주야 작업이 가능하여야 한다는 점입니다.

[MAVLink 카메라 프로토콜](https://mavlink.io/en/services/camera.html)을 지원하는 카메라를 사용하십시오.이 카메라는 이미지 및 비디오 캡처, 확대/축소, 저장 관리, 동일한 차량의 여러 카메라 및 카메라 간 전환을 지원합니다. 이러한 카메라는 QGroundControl 또는 MAVSDK를 통해 수동으로 제어할 수 있습니다 ([독립형 카메라 작동](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) 및 [임무](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4) 모두). MAVLink 연동 카메라 설정법은 [카메라 트리거](../peripherals/camera.md)를 참조하십시오.

:::note
Cameras connected directly to the flight controller _only_ support camera triggering, and are unlikely to be suitable for most surveillance/search work.
:::

수색 및 구조용 드론은 실종 등산객을 위한 비상 용품과 같은 화물을 운반할 수 있습니다. See [Cargo Drones](#cargo-drones-package-delivery) above for information about payload delivery.

## Agricultural Drones/Crop Spraying

Agricultural drones are commonly used for mapping crop health and pest detection and animal management (herding, tracking, etc.). These cases are similar to the [mapping](#mapping-drones) and [surveillance, search & rescue](#surveillance-search-rescue) cases above. While specific crops/animals may need specialist cameras, the integration with PX4 is the same.

Agricultural drone may also be used for crop spraying. In this case the sprayer must be controlled as a [generic actuator](#generic-actuator-control):

- The [Generic Actuator Control with MAVLink](#generic-actuator-control-with-mavlink) section explains how you can connect flight controller outputs to your sprayer so that they can be controlled using MAVLink. Most sprayers provide controls to activate/deactivate a pump; some also allow control over the rate of flow or the spray field (i.e. by controlling the nozzle shape, or using a spinner to distribute the payload).
- You can define the area to spray using a [Survey pattern](https://docs.qgroundcontrol.com/master/en/PlanView/pattern_survey.html), or you can define the grid to fly using waypoints. In either case, it is important to ensure that the vehicle flight path and altitude provide adequate coverage for your particular spray being used.
- You should add a ["Set actuator" mission item](#generic-actuator-control-in-missions) to your mission before and after the survey pattern in order to enable and disable the sprayer.


## Generic Actuator Control

You can connect arbitrary hardware to unused PX4 outputs and control it using [RC Control](#generic-actuator-control-with-rc) or [MAVLink](#generic-actuator-control-with-mavlink) (either as commands or in a [mission](#generic-actuator-control-in-missions)).

This is useful when you need to use a payload type for which there is no associated MAVLink command, or that is not supported by PX4.

:::note
Prefer using integrated hardware and hardware-specific MAVLink commands to generic actuator control when possible.
Using integrated hardware allows optimised mission planning and behaviour.
:::

### Generic Actuator Control with MAVLink

[MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) can be used to set the value of up to 6 actuators (at a time). This command can be used in [missions](#generic-actuator-control-in-missions) by creating a "Set actuator" mission item, or as a stand alone command.

The outputs that are to be controlled are specified in the [Actuators](../config/actuators.md#actuator-outputs) configuration screen by assigning the functions `Offboard Actuator Set 1` to `Offboard Actuator Set 6` to the desired [actuator outputs](../config/actuators.md#actuator-outputs).

![Generic actuator output setting in QGC](../../assets/peripherals/qgc_generic_actuator_output_setting_example.png)

`MAV_CMD_DO_SET_ACTUATOR` `param1` to `param6` control the outputs mapped by `Offboard Actuator Set 1` to `Offboard Actuator Set 6` respectively.

For example, in the image above, the `AUX5` output is assigned the function `Offboard Actuator Set 1` function. To control the actuator attached to `AUX5` you would set the value of `MAV_CMD_DO_SET_ACTUATOR.param1`.

<!-- PX4 v1.14 bug https://github.com/PX4/PX4-Autopilot/issues/21966 -->

### Generic Actuator Control with RC

Up to 6 autopilot PWM or CAN outputs can be controlled using RC channels. The outputs that are to be controlled are specified in the [Actuators](../config/actuators.md#actuator-outputs) configuration screen by assigning the functions `RC AUX 1` to `RC AUX 6` to the desired [actuator outputs](../config/actuators.md#actuator-outputs).

To map a particular RC channel to an output function `RC AUX n` (and hence it's assigned output) you use the [RC_MAP_AUXn](../advanced_config/parameter_reference.md#RC_MAP_AUX1) parameter that has the same `n` number.

For example, to control an actuator attached to AUX pin 3 (say) you would assign the output function `RC AUX 5` to the output `AUX3`. You could then use set the RC channel to control the `AUX3` output using `RC_MAP_AUX5`.

### Generic Actuator Control in Missions

To use generic actuator control in a mission you must first [configure the outputs that you want to control using MAVLink](#generic-actuator-control-with-mavlink).

Then in *QGroundControl* you can set the value of actuator outputs in a mission using the **Set actuator** mission item (this adds a [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) to the uploaded mission plan).

It is important to note that with generic actuator control, neither *QGroundControl* or PX4 know anything about the hardware being triggered. When processing the mission item, PX4 will simply set the outputs to the specified values and then immediately proceed to the next mission item. If the hardware requires time to activate and you need to pause at the current waypoint for this to happen, then you will need to plan the mission with additional items to achieve the desired behaviour.

:::note
This is one reason why integrated hardware is preferred!
It allows missions to be written generically, with any hardware-specific behaviour or timing managed by the flight stack configuration.
:::

To use a generic actuator in a mission:

1. Create a waypoint mission item where you want the actuator command.
1. Change the waypoint mission item to a "Set actuator" mission item:

   ![Set actuator mission item](../../assets/qgc/plan/mission_item_editors/mission_item_select_set_actuator.png)

   - Select the header on the waypoint mission editor to open the **Select Mission Command** editor.
   - Select the category **Advanced**, and then the **Set actuator** item (if the item is not present, try a more recent version of *QGroundControl* or a daily build). This will change the mission item type to "Set actuator".

1. Select the actuators that are connected and set their values (these are normalized between -1 and 1).

   ![Set actuator mission item](../../assets/qgc/plan/mission_item_editors/set_actuator.png)

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


