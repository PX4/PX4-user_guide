# Payloads and Cameras

PX4 supports a wide range of payloads and cameras.

Payloads are connected to [Fight Controller outputs](../getting_started/px4_basic_concepts.md#outputs-motors-servos-actuators), and can generally be triggered automatically in missions, or manually using RC passthrough or MAVLink/MAVSDK commands.

:::note
Payloads (actuators) can be tested in the [pre-arm state](../getting_started/px4_basic_concepts.html#arming-and-disarming), which allows movement of actuators while disabling motors.
This may be safer than testing when the vehicle is armed.
:::


## Mapping Drones

Mapping drones use cameras to capture images at time or distance intervals during surveys.

MAVLink cameras that support the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) provide the best integration with PX4 and QGroundControl. 
The MAVSDK provides simple APIs to use this protocol for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4).

Cameras can also be connected directly to a flight controller using PWM or GPI outputs.
PX4 supports the following set of MAVLink commands/mission items for cameras that are connected to the flight controller:
* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - set time interval between captures.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - set distance between captures
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - start/stop capturing (using distance or time, as defined using above messages).

The following topics show how to *connect* your camera configure PX4:
* [Camera triggering](../peripherals/camera.md) from flight controller PWM or GPIO outputs, or via MAVLink.
* [Camera timing feedback](../peripherals/camera.md#camera-capture) via hotshoe input.


## Cargo Drones ("Actuator" Payloads)

Cargo drones commonly use servos/actuators to trigger cargo release, control winches, etc.
PX4 supports servo and GPIO triggering via both RC and MAVLink commands.

### RC Triggering

You can map up to three RC channels to control servos/actuators attached to the flight controller using the parameters [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) to [RC_MAP_AUX3](../advanced_config/parameter_reference.md#RC_MAP_AUX3).

The RC channels are *usually* mapped to the `AUX1`, `AUX2`, `AUX3` outputs of your flight controller (using a [mixer file](../concept/mixing.md) defined in your airfame).
You can confirm which outputs are used for RC AUX passthrough on your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).
For example, [Quadrotor-X](../airframes/airframe_reference.md#quadrotor-x) has the normal mapping: "**AUX1:** feed-through of RC AUX1 channel", "**AUX2:** feed-through of RC AUX2 channel", "**AUX3:** feed-through of RC AUX3 channel".

If your vehicle doesn't specify RC AUX feed-through outputs, then you can add them using using a custom [Mixer File](../concept/mixing.md) that maps [Control group 3](../concept/mixing.md#control-group-3-manual-passthrough) outputs 5-7 to your desired port(s).
An example of such a mixer is the default passthrough mixer: [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/mixers/pass.aux.mix).

:::note
The same outputs used for "feed-through of RC AUX" may also be set using a MAVLink command (see [below](#mission-triggering)).
PX4 will use the last value set through either mechanism.
:::


### Mission Triggering

You can use the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command to set (up to) three actuators values at a time, either in a mission or as a command.

Command parameters `param1`, `param2`, and `param3` are _usually_ mapped to the `AUX1`, `AUX2`, `AUX3` outputs of your flight controller, while command parameters `param4` to `param7` are unused/ignored by PX4.
The parameters take normalised values in the range `[-1, 1]` (resulting in PWM outputs in the range `[PWM_AUX_MINx, PWM_AUX_MAXx]`, where X is the output number).
All params/actuators that are not being controlled should be set to `NaN`.

:::note
MAVLink uses the same outputs as are configured for [RC AUX passthrough](#rc-triggering) (see previous section).
You can check which outputs are used in the [Airframe Reference](../airframes/airframe_reference.md) for your vehicle, and change them if needed using a [custom mixer file](../concept/mixing.md).
:::


### MAVSDK (Example script)

The following [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) [example code](https://github.com/mavlink/MAVSDK/blob/main/examples/set_actuator/set_actuator.cpp) shows how to trigger payload release using the MAVSDK Action plugin's [`set_actuator()`](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1ad30beac27f05c62dcf6a3d0928b86e4c) method.

The `set_actuator()` index values of 1 to 3 *normally* map to the `AUX1`, `AUX2`, `AUX3` outputs of your flight controller.

:::note
MAVSDK sends the [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) MAVLink command under the hood, and hence uses the same outputs as are configured for [Mission Triggering](#mission-triggering) and [RC Triggering](#rc-triggering) (see previous sections).
You can check which outputs are used in the [Airframe Reference](../airframes/airframe_reference.md) for your vehicle, and change them if needed using a [custom mixer file](../concept/mixing.md).
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

## Surveillance, Search & Rescue

Surveillance and Search & Rescue drones have similar requirements to mapping drones.
The main differences are that, in addition to flying a planned survey area, they typically need good standalone control over the camera for image and video capture, and they may need to be able to work during both day and night

Use a camera that supports the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) as this supports image and video capture, zooming, storage management, multiple cameras on the same vehicle and switching between them, etc.
These cameras can be controlled either manually from QGroundControl or via MAVSDK (for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)).
See [Camera triggering](../peripherals/camera.md) for information on how to configure your camera to work with MAVLink.

:::note
Cameras connected directly to the flight control _only_ support camera triggering, and are unlikely to be suitable for most surveillance/search work.
:::

A search and rescue drone may also need to carry cargo, for example, emergency supplies for a stranded hiker.
See [Cargo Drones](#cargo-drones-actuator-payloads) above for information about payload delivery.
