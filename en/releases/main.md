# PX4-Autopilot Main Release Notes

<Badge type="danger" text="Alpha" />

This contains changes to PX4 `main` branch since the last major release ([PX v1.15](../releases/1.15.md)).

::: warning
The PX4 v1.15 release is in beta testing, pending release.
Update these notes with features that are going to be in `main` but not the PX4 v1.15 release.
:::

## Read Before Upgrading

TBD ...

Please continue reading for [upgrade instructions](#upgrade-guide).

## Major Changes

- TBD

## Upgrade Guide

## Other changes

### Hardware Support

- TBD

### Common

- [Battery level estimation improvements](..n/config/battery.md) ([PX4-Autopilot#23205](https://github.com/PX4/PX4-Autopilot/pull/23205)).
  - [Voltage-based estimation with load compensation](../config/battery.md#voltage-based-estimation-with-load-compensation) now uses a real-time estimate of the internal resistance of the battery to compensative for voltage drops under load (with increased current), providing a better capacity estimate than the open-circuit voltage.
  - Thrust-based load compensation has been removed (along with the `BATn_V_LOAD_DROP` parameters, where `n` is the battery number).

### Control

- TBD

### Estimation

- TBD

### Sensors

- TBD

### Simulation

- The SIH on SITL [custom takeoff location](../sim_sih/index.md#set-custom-takeoff-location) in now set using the normal unscaled GPS position values, where previously the value needed to be multiplied by 1E7.
  ([PX4-Autopilot#23363](https://github.com/PX4/PX4-Autopilot/pull/23363)).

### Ethernet

- TBD

### uXRCE-DDS / ROS2

- TBD

### MAVLink

- TBD

### Multi-Rotor

- TBD

### VTOL

- TBD

### Fixed-wing

- TBD

### Rover

- TBD

### ROS 2

- TBD