# Payloads and Cameras

PX4 supports a wide range of payloads and cameras.

## Mapping Drones

Mapping drones use cameras to capture images at time or distance intervals during surveys.

The following topics show how to connect your camera and set up camera triggering:
* [Camera triggering](../peripherals/camera.md) from flight controller PWM or GPIO outputs, or via MAVLink.
* [Camera timing feedback](../peripherals/camera.md#camera_capture) via hotshoe input.

The MAVLink commands used in survey missions (and as standalone commands) are:
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - set time interval between captures.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - set distance between captures
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - start/stop capturing (using distance or time, as defined using above messages).

## Cargo Drones ("Actuator" Payloads)

Cargo drones commonly use servos/actuators to trigger cargo release, control winches, etc.
PX4 supports servo and GPIO triggering via both RC and MAVLink commands.

### Example Mission (in QGC)

Use the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command to trigger one of the payload actuators.

### Example script (MAVSDK)

The following [MAVSDK](https://mavsdk.mavlink.io/develop/en/) sample code shows how to trigger payload release.

The code uses the MAVSDK [MavlinkPassthrough](https://mavsdk.mavlink.io/develop/en/api_reference/classmavsdk_1_1_mavlink_passthrough.html) plugin to send the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command, specifying the value of up to 3 actuators.

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
