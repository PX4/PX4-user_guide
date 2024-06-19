# Assembling a UAV

This topic provides basic instructions and links for how to connect and assemble the core components of a typical unmanned system (UAS) running PX4.

::: info
The [Drone Components & Parts](../getting_started/px4_basic_concepts.md#drone-components-parts) and [Payloads](../getting_started/px4_basic_concepts.md#payloads) sections of [PX4 Basic Concepts](../getting_started/px4_basic_concepts.md) provide a broad overview of the main drone components.
[Hardware Selection & Setup](../hardware/drone_parts.md) contains details about specific hardware, including selection, assembly, and configuration.
:::

## Overview

The core parts of a _typical_ PX4-based autopilot system consist of a flight controller, GPS, external compass, manual controller and/or telemetry radio system, motors and/or other control actuators, payloads, and a power system.
A VTOL or Fixed-wing vehicle will generally also have an airspeed sensor.

The process for assembling the components together "off the frame" is similar most flight controllers, and in particular for those that follow the Pixhawk connector standard.
The standard specifies flight controller connectors for attaching the GPS module, external compass, telemetry radio, analog power system, and so on, and many component vendors in the ecosystem provide compatible cables.
As a result, wiring up becomes as simple as plugging the components into the appropriately labelled ports.
There are some differences because not everything is standardized — for example PWM outputs and RC Control system radio inputs.

Assembly of the autopilot system on a vehicle frame very much depends on the selected frame and the components that are used.
For an overview/links see [On-Frame Assembly](#on-frame-assembly) below.

## Flight Controller Specific Assembly Guides

::: tip
The manufacturer documentation for your [flight controller](../flight_controller/index.md) may include guides for controllers that are not listed below, or that are more up-to-date than the following guides.
:::

These guides explain how to connect the core components of the autopilot system "off the frame" for a number of popular [flight controllers](../flight_controller/index.md).
They recommend sensors, power systems, and other components from the same manufacturer.

- [CUAV Pixhawk V6X Wiring QuickStart](../assembly/quick_start_cuav_pixhawk_v6x.md)
- [CUAV V5+ Wiring Quickstart](../assembly/quick_start_cuav_v5_plus.md)
- [CUAV V5 nano Wiring Quickstart](../assembly/quick_start_cuav_v5_nano.md)
- [Holybro Pixhawk 6C Wiring Quickstart](../assembly/quick_start_pixhawk6c.md)
- [Holybro Pixhawk 6X Wiring Quickstart](../assembly/quick_start_pixhawk6x.md)
- [Holybro Pixhawk 5X Wiring Quickstart](../assembly/quick_start_pixhawk5x.md)
- [Holybro Pixhawk 4 Wiring Quickstart](../assembly/quick_start_pixhawk4.md)
- [Holybro Pixhawk 4 Mini (Discontinued) Wiring Quickstart](../assembly/quick_start_pixhawk4_mini.md)
- [Holybro Durandal Wiring Quickstart](../assembly/quick_start_durandal.md)
- [Holybro Pix32 v5 Wiring Quickstart](../assembly/quick_start_holybro_pix32_v5.md)
- [Cube Wiring Quickstart](../assembly/quick_start_cube.md)
- [Pixracer Wiring Quickstart](../assembly/quick_start_pixracer.md)
- [mRo (3DR) Pixhawk Wiring Quickstart](../assembly/quick_start_pixhawk.md)

## On-Frame Assembly

Assembly of the autopilot system onto the frame depends on the selected frame, including size, geometry, materials, attachment points, and the components that are used.

There are a few guidelines for:

- [Mounting the Flight Controller](../assembly/mount_and_orient_controller.md)
- [Vibration Isolation](../assembly/vibration_isolation.md)
- [Mounting a Compass](../assembly/mount_gps_compass.md)

Otherwise, check out the build logs linked below, which show end-to-end configuration and setup of a number of vehicles.

Multicopter:

- [Kits](../frames_multicopter/kits.md)
- [DIY Builds](../frames_multicopter/diy_builds.md)

Plane

- [DIY Builds](../frames_plane/diy_builds.md)

VTOL

- [Standard VTOL](../frames_vtol/standardvtol.md)
- [Tailsitter VTOL](../frames_vtol/tailsitter.md)
- [Tiltrotor VTOL](../frames_vtol/tiltrotor.md)

Other frames:

- [Airframe Builds](../airframes/index.md) for complete assembly examples on different vehicle frames.

## See Also

- [Multicopter Racer Setup](../config_mc/racer_setup.md) — racer-specific assembly and configuration information (racers don't have GPS module)
- [Hardware Selection & Setup](../hardware/drone_parts.md) — information about connecting and configuring specific flight controllers, sensors and other peripherals (e.g. airspeed sensor for planes).
