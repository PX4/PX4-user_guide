---
canonicalUrl: https://docs.px4.io/main/zh/payloads/README
---

# Payloads and Cameras

PX4 supports a wide range of payloads and cameras.

## Mapping Drones

Mapping drones use cameras to capture images at time or distance intervals during surveys.

MAVLink cameras that support the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) provide the best integration with PX4 and QGroundControl. The MAVSDK provides simple APIs to use this protocol for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4).

Cameras can also be connected directly to a flight controller using PWM or GPI outputs. PX4 supports the following set of MAVLink commands/mission items for cameras that are connected to the flight controller:
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - set time interval between captures.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - set distance between captures
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - start/stop capturing (using distance or time, as defined using above messages).

The following topics show how to *connect* your camera configure PX4:
* [Camera triggering](../peripherals/camera.md) from flight controller PWM or GPIO outputs, or via MAVLink.
* [Camera timing feedback](../peripherals/camera.md#camera-capture) via hotshoe input.


## Cargo Drones ("Actuator" Payloads)

Cargo drones commonly use servos/actuators to trigger cargo release, control winches, etc. PX4 supports servo and GPIO triggering via both RC and MAVLink commands.

### RC Triggering

You can map up to three RC channels to control servos/actuators attached to the flight controller using the parameters [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) to [RC_MAP_AUX3](../advanced_config/parameter_reference.md#RC_MAP_AUX3).

The RC channels are *usually* mapped to the `AUX1`, `AUX2`, `AUX3` outputs of your flight controller (using a [mixer file](../concept/mixing.md) defined in your airfame). You can confirm which outputs are used for RC AUX passthrough on your vehicle in the [Airframe Reference](../airframes/airframe_reference.md). For example, [Quadrotor-X](../airframes/airframe_reference.md#quadrotor-x) has the normal mapping: "**AUX1:** feed-through of RC AUX1 channel", "**AUX2:** feed-through of RC AUX2 channel", "**AUX3:** feed-through of RC AUX3 channel".

If your vehicle doesn't specify RC AUX feed-through outputs, then you can add them using using a custom [Mixer File](../concept/mixing.md) that maps [Control group 3](../concept/mixing.md#control-group-3-manual-passthrough) outputs 5-7 to your desired port(s). An example of such a mixer is the default passthrough mixer: [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix).

:::note
The same outputs used for "feed-through of RC AUX" may also be set using a MAVLink command (see [below](#mission-triggering)). PX4 will use the last value set through either mechanism.
:::


### Mission Triggering

You can use the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command to set (up to) three actuators values at a time, either in a mission or as a command.

Command parameters `param1`, `param2`, and `param3` are _usually_ mapped to the `AUX1`, `AUX2`, `AUX3` outputs of your flight controller, while command parameters `param4` to `param7` are unused/ignored by PX4. The parameters take normalised values in the range `[-1, 1]` (resulting in PWM outputs in the range `[PWM_AUX_MINx, PWM_AUX_MAXx]`, where X is the output number). All params/actuators that are not being controlled should be set to `NaN`.

:::note MAVLink uses the same outputs as are configured for [RC AUX passthrough](#rc-triggering) (see prevous section). You can check which outputs are used in the [Airframe Reference](../airframes/airframe_reference.md) for your vehicle, and change them if needed using a [custom mixer file](../concept/mixing.md).
:::


### MAVSDK (Example script)

The following [MAVSDK](https://mavsdk.mavlink.io/develop/en/) sample code shows how to trigger payload release.

The code uses the MAVSDK [MavlinkPassthrough](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_mavlink_passthrough.html) plugin to send the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command, specifying the value of (up to) 3 actuators.


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
    std::string connection_url;
    ConnectionResult connection_result;
    float value1, value2, value3;

    if (argc == 5) {
        connection_url = argv[1];
        connection_result = mavsdk.add_any_connection(connection_url);
        value1 = std::stof(argv[2]);
        value2 = std::stof(argv[3]);
        value3 = std::stof(argv[4]);
    } 

    if (connection_result != ConnectionResult::Success) {
        std::cout << "Connection failed: " << connection_result << std::endl;
        return 1;
    }

    bool discovered_system = false;
    mavsdk.subscribe_on_new_system([&mavsdk, &discovered_system]() {
        const auto system = mavsdk.systems().at(0);

        if (system->is_connected()) {
            std::cout << "Discovered system" << std::endl;
            discovered_system = true;
        }
    });

    std::this_thread::sleep_for(std::chrono::seconds(2));

    if (!discovered_system) {
        std::cout << "No device found, exiting." << std::endl;
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

    return 0;
}

void send_actuator(MavlinkPassthrough& mavlink_passthrough,
        float value1, float value2, float value3)
{
    std::cout << "Sending message" << std::endl;
    mavlink_message_t message;
    mavlink_msg_command_long_pack(
            mavlink_passthrough.get_our_sysid(),
            mavlink_passthrough.get_our_compid(),
            &message,
            1, 1,
            MAV_CMD_DO_SET_ACTUATOR,
            0,
            value1, value2, value3,
            NAN, NAN, NAN, 0);
    mavlink_passthrough.send_message(message);
    std::cout << "Sent message" << std::endl;
}
```

## Surveillance, Search & Rescue

Surveillance and Search & Rescue drones have similar requirements to mapping drones. The main differences are that, in addition to flying a planned survey area, they typically need good standalone control over the camera for image and video capture, and they may need to be able to work during both day and night

Use a camera that supports the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) as this supports image and video capture, zooming, storage management, multiple cameras on the same vehicle and switching between them, etc. These cameras can be controlled either manually from QGroundControl or via MAVSDK (for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)). See [Camera triggering](../peripherals/camera.md) for information on how to configure your camera to work with MAVLink.

:::note
Cameras connected directly to the flight control _only_ support camera triggering, and are unlikely to be suitable for most surveillance/search work.
:::

A search and rescue drone may also need to carry cargo, for example, emergency supplies for a stranded hiker. See [Cargo Drones](#cargo-drones-actuator-payloads) above for information about payload delivery.
