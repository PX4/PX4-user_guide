# Assembling a {{ $frontmatter.frame }}

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
- [Cube Wiring Quickstart](../assembly/quick_start_cube.md) (All cube variants)
- [Pixracer Wiring Quickstart](../assembly/quick_start_pixracer.md)
- [mRo (3DR) Pixhawk Wiring Quickstart](../assembly/quick_start_pixhawk.md)

## On-Frame Assembly

Assembly of the autopilot system onto the frame depends on the selected frame, including size, geometry, materials, attachment points, and the components that are used.

There are a few guidelines for:

- [Mounting the Flight Controller](../assembly/mount_and_orient_controller.md)
- [Vibration Isolation](assembly/vibration_isolation.md)
- [Mounting a Compass](assembly/mount_gps_compass.md)

Otherwise, check out the build logs linked below, which show end-to-end configuration and setup of a number of vehicles.

<div v-if="$frontmatter.frame === 'Multicopter'">

- [Kits](../frames_multicopter/kits.md)
- [DIY Builds](../frames_multicopter/diy_builds.md)

</div>


<div v-if="$frontmatter.frame === 'Plane'">

- [DIY Builds](../frames_plane/diy_builds.md)
</div>

<div v-if="$frontmatter.frame === 'VTOL'">
- [Standard VTOL](frames_vtol/standardvtol.md)
- [Tailsitter VTOL](frames_vtol/tailsitter.md)
- [Tiltrotor VTOL](frames_vtol/tiltrotor.md)
</div>


Other frames:

- [Airframe Builds](../airframes/index.md) for complete assembly examples on different vehicle frames.

## See Also

- [Hardware Selection & Setup](../hardware/drone_parts.md) — information about connecting and configuring specific flight controllers, sensors and other peripherals (e.g. airspeed sensor for planes).
<div v-if="$frontmatter.frame === 'Multicopter'">

- [Multicopter Racer Setup](../config_mc/racer_setup.md) — racer-specific assembly and configuration information (racers don't have GPS module)
</div>


## Flight controllers

<img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_vehicle_front1.jpg" width="400px" title="Pixhawk6x" />

![front](../../assets/flight_controller/cuav_pixhawk_v6x/quickstart_02.jpg)


### Mount and Orient Controller

The flight controller should be mounted on the frame positioned as close to your vehicle’s center of gravity as possible, oriented top-side up with the arrow points towards the front of the vehicle.

Flight Control boards with in-built accelerometers or gyros are sensitive to vibrations.
Some boards include in-built vibration-isolation, while others come with mounting foam that you can use to isolate the controller from the vehicle.

::: info
If the controller cannot be mounted in the recommended/default orientation (e.g. due to space constraints) you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md).
:::

For additional information see:

- [Mounting the Flight Controller](../assembly/mount_and_orient_controller.md)
- [Flight Controller Orientation (Configuration)](../config/flight_controller_orientation.md)
- [Vibration Isolation](../assembly/vibration_isolation.md)


## GPS + Compass + Buzzer + Safety Switch + LED

The most common PX4 vehicle configuration is to use a single combined 

PX4 supports 

GPS1 - 10 pin connector for a GNSS modules feature an integrated compass, safety switch, buzzer and LEDs.


GPS2


The Pixhawk<sup>&reg;</sup> V6X can be purchased with a [NEO3 GPS](https://store.cuav.net/shop/neo-3/) (10-pin connector) and should be connected to the **GPS1** port.
These GNSS modules feature an integrated compass, safety switch, buzzer and LEDs.

If you need to use assisted GPS, connect to the **GPS2** port.

The GPS/compass should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction markings towards the front of the vehicle (separating the compass from other electronics will reduce interference).

![GPS](../../assets/flight_controller/cuav_pixhawk_v6x/quickstart_03.jpg)

::: info
Pixhawk V6X<sup>&reg;</sup> is not compatible with NEO V2 GPS built-in buzzer: you should use [NEO3/NEO 3Pro](https://store.cuav.net/shop/neo-3/) instead.
The GPS module's integrated safety switch is enabled _by default_ (when enabled, PX4 will not let you arm the vehicle).
To disable the safety press and hold the safety switch for 1 second.
You can press the safety switch again to enable safety and disarm the vehicle (this can be useful if, for whatever reason, you are unable to disarm the vehicle from your remote control or ground station).
:::



- UI LED
http://localhost:5173/px4_user_guide/en/getting_started/led_meanings.html#ui-led




## GPS + Compass + Buzzer + Safety Switch + LED

The _Pixhawk6X Standard Set_ & _Pixhawk6X Mini Set_ can be purchased with M8N or M9N GPS (10-pin connector) that should be connected to the **GPS1** port.
These GNSS modules have an integrated compass, safety switch, buzzer and LED.

A secondary [M8N or M9N GPS](https://holybro.com/collections/gps) (6-pin connector) can be purchased separately and connected to the **GPS2** port.

The GPS/Compass should be [mounted on the frame](../assembly/mount_gps_compass.md) as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).

<img src="../../assets/flight_controller/pixhawk5x/pixhawk5x_gps_front.jpg" width="200px" title="Pixhawk5x standard set" />

::: info
The GPS module's integrated safety switch is enabled _by default_ (when enabled, PX4 will not let you arm the vehicle).
To disable the safety press and hold the safety switch for 1 second.
You can press the safety switch again to enable safety and disarm the vehicle (this can be useful if, for whatever reason, you are unable to disarm the vehicle from your remote control or ground station).
:::




## Buzzer and Safety Switch

Connect the included buzzer and safety switch as shown below (these are mandatory).

![Pixhawk mounting and orientation](../../assets/flight_controller/pixhawk1/pixhawk_3dr_buzzer_and_safety_switch.jpg)

## GPS + Compass

Attach a GPS (required) to the GPS port using the 6-wire cable supplied in the kit. Optionally attach a compass to the I2C port using a 4-wire cable (the Pixhawk has an internal compass, which can be used if necessary).

::: info
The diagram shows a combined GPS and Compass.
The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker towards the front of the vehicle (separating the compass from other electronics will reduce interference).
:::

![Connect compass/GPS to Pixhawk](../../assets/flight_controller/pixhawk1/pixhawk_3dr_compass_gps.jpg)