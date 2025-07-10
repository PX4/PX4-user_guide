---
canonicalUrl: https://docs.px4.io/main/zh/payloads/README
---

# Payloads and Cameras

PX4 supports a wide range of payloads and cameras.

Payloads are connected to [Fight Controller outputs](../getting_started/px4_basic_concepts.md#outputs-motors-servos-actuators), and can generally be triggered automatically in missions, or manually using RC passthrough or MAVLink/MAVSDK commands.

:::note
Payloads (actuators) can be tested in the [pre-arm state](../getting_started/px4_basic_concepts.html#arming-and-disarming), which disables motors but allows actuators to move. This may be safer than testing when the vehicle is armed.
:::


## Mapping Drones

Mapping drones use cameras to capture images at time or distance intervals during surveys.

MAVLink cameras that support the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) provide the best integration with PX4 and QGroundControl. The MAVSDK provides simple APIs to use this protocol for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4).

Cameras can also be connected directly to a flight controller using PWM or GPI outputs. PX4 supports the following set of MAVLink commands/mission items for cameras that are connected to the flight controller:

* [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - set time interval between captures.
* [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - set distance between captures
* [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - start/stop capturing (using distance or time, as defined using above messages).

The following topics show how to *connect* and configure a camera:

* [Camera triggering](../peripherals/camera.md) from flight controller PWM or GPIO outputs, or via MAVLink.
* [Camera timing feedback](../peripherals/camera.md#camera-capture) via hotshoe input.


## Cargo Drones ("Actuator" Payloads)

Cargo drones commonly use servos/actuators to trigger cargo release, control winches, etc. PX4 supports actuator triggering via both RC and MAVLink commands.

### Payload Outputs: Control Allocation

:::note
Control allocation is supported from PX4 v1.13 but disabled by default.
:::

If control allocation is enabled ([SYS_CTRL_ALLOC=1](../advanced_config/parameter_reference.md#SYS_CTRL_ALLOC)) you can specify up to 6 outputs to be controlled from RC channels and up to 6 outputs to be controlled from MAVLink.

This is done in the [Actuators](../config/actuators.md#actuator-outputs) configuration screen by assigning the appropriate functions to any free payload outputs (in the [actuator outputs](../config/actuators.md#actuator-outputs) section).

The functions are:

- `RC AUX 1` to `RC AUX 6`: Outputs for [RC Control](#rc-payload-control)
- `Offboard Actuator Set 1` to `Offboard Actuator Set 6`: Outputs to set using [MAVLink commands](#mavlink-payload-control)

### Payload Outputs: Mixer Allocation

The [mixer file](../concept/mixing.md) for the current airframe is used to specify the payload outputs for RC and MAVLink passthrough when control allocation is disabled.

Usually just three outputs are mapped to the `AUX1`, `AUX2`, `AUX3` outputs of the flight controller. You can confirm which outputs are used for RC AUX passthrough on your vehicle in the [Airframe Reference](../airframes/airframe_reference.md).

For example, [Quadrotor-X](../airframes/airframe_reference.md#quadrotor-x) has the normal mapping:

- "**AUX1:** feed-through of RC AUX1 channel"
- "**AUX2:** feed-through of RC AUX2 channel"
- "**AUX3:** feed-through of RC AUX3 channel"

If your vehicle doesn't specify RC AUX feed-through outputs, then you can add them using using a custom [Mixer File](../concept/mixing.md) that maps [Control group 3](../concept/mixing.md#control-group-3-manual-passthrough) outputs 5-7 to your desired port(s). An example of such a mixer is the default passthrough mixer: [pass.aux.mix](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/ROMFS/px4fmu_common/mixers/pass.aux.mix).


### RC Payload Control

RC channels are mapped to specific outputs using the [RC_MAP_AUXn](../advanced_config/parameter_reference.md#RC_MAP_AUX1) parameters.

If control allocation is used then `RC_MAP_AUXn` maps a selected RC channel to the output with the assigned function `RC AUX n`, where `n` is 1 to 6 (e.g. `RC_MAP_AUX2` maps the selected RC channel to the actuator output that has been assigned function `RC AUX 2`).

If a mixer is used, `RC_MAP_AUXn` maps to the passthrough output of the same number defined in the mixer file (e.g. `RC_MAP_AUX2` maps a selected channel to the output defined by `AUX2` in the mixer file).


### MAVLink Payload Control

[MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) can be used in a command or mission to set the value of up to 6 actuators (at a time).

If control allocation is used then the command's param index (1 to 6) maps to the output with the assigned `Offboard Actuator Set n` output function that has the same `n` index (e.g. the value in `param 5` is set on the output mapped by function `Offboard Actuator Set 5`).

If a mixer file is used, then the command's param index (1 to 6) maps to the corresponding passthrough `AUXn` value in the mixer file.


### MAVSDK (Example script)

The following [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) [example code](https://github.com/mavlink/MAVSDK/blob/main/examples/set_actuator/set_actuator.cpp) shows how to trigger payload release using the MAVSDK Action plugin's [`set_actuator()`](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1ad30beac27f05c62dcf6a3d0928b86e4c) method.

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

## Surveillance, Search & Rescue

Surveillance and Search & Rescue drones have similar requirements to mapping drones. The main differences are that, in addition to flying a planned survey area, they typically need good standalone control over the camera for image and video capture, and they may need to be able to work during both day and night

Use a camera that supports the [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) as this supports image and video capture, zooming, storage management, multiple cameras on the same vehicle and switching between them, etc. These cameras can be controlled either manually from QGroundControl or via MAVSDK (for both [standalone camera operations](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) and in [missions](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)). See [Camera triggering](../peripherals/camera.md) for information on how to configure your camera to work with MAVLink.

:::note
Cameras connected directly to the flight control _only_ support camera triggering, and are unlikely to be suitable for most surveillance/search work.
:::

A search and rescue drone may also need to carry cargo, for example, emergency supplies for a stranded hiker. See [Cargo Drones](#cargo-drones-actuator-payloads) above for information about payload delivery.
