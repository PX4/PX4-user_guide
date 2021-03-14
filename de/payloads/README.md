# Payloads and Cameras

PX4 supports a wide range of payloads and cameras.

## Mapping Drones

* [Camera triggering](../peripherals/camera.md) via GPIO out
* [Camera triggering](../peripherals/camera.md) via PWM out
* [Camera triggering](../peripherals/camera.md) via MAVLink out
* [Camera timing](../peripherals/camera.md#camera_capture) feedback via hotshoe input

## Cargo drones and alike: Servos / Outputs

* Servo or GPIO triggering (via RC or via commands)

### Example Mission (in QGC)

Use MAV_CMD_DO_SET_ACTUATOR to trigger one of the payload actuators.

### Example script (MAVSDK)

This script sends a command to set the actuator and trigger the payload release on a servo:

```
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
