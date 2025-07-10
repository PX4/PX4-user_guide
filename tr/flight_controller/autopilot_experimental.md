---
canonicalUrl: https://docs.px4.io/main/tr/flight_controller/autopilot_experimental
---

# Community Supported & Experimental Autopilots

:::tip
For more information about PX4 project autopilot board support levels see: [px4.io/autopilots/](https://px4.io/autopilots/).
:::

## Community Supported Autopilots

- [Cube Orange](../flight_controller/cubepilot_cube_orange.md) (CubePilot)
- [Cube Yellow](../flight_controller/cubepilot_cube_yellow.md) (CubePilot)

Boards in this category are fully supported, but are not following industry standards and might have sole-source supply chain risks. See the [list of Pixhawk standard boards](../flight_controller/autopilot_pixhawk_standard.md) for a list of products that are officially supported by PX4 and are following industry standards.

## Experimental Autopilots

This category is for experimental autopilots (and autopilot "platforms") that are *not supported* by either the PX4 project team or by a manufacturer.

- [BeagleBone Blue](../flight_controller/beaglebone_blue.md)
- [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md)

Boards in this category must work with at least one PX4 release for a defined vehicle type. They may not be compatible with the current PX4 release, and compatibility is not maintained by the project for future releases.

## Experimental Vehicles

These are [complete vehicles](../complete_vehicles/README.md) that have a fully integrated autopilot and other hardware (i.e. unlike the other autopilots listed, you can't use them in your own builds). They are listed in this page because from a PX4 software perspective, they are another autopilot.
- [Bitcraze Crazyflie 2.0](../complete_vehicles/crazyflie2.md) ([Complete Vehicle](../complete_vehicles/README.md))
- [Bitcraze Crazyflie 2.1](../complete_vehicles/crazyflie21.md) ([Complete Vehicle](../complete_vehicles/README.md))
