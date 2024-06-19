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

- TBD

### Control

- TBD

### Estimation

- TBD

### Sensors

- TBD

### Simulation

- TBD

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

- [Simplified airspeed sensor configuration](../config_vtol/vtol_without_airspeed_sensor.md): 
  Replacef parameter `CBRK_AIRSPD_CHK` with [SYS_HAS_NUM_ASPD](../advanced_config/parameter_reference.md#SYS_HAS_NUM_ASPD) and renamed parameter `FW_ARSP_MODE` to [FW_USE_AIRSPD](../advanced_config/parameter_reference.md#FW_USE_AIRSPD).
  To be able to arm without an airspeed sensor set `SYS_HAS_NUM_ASPD` to 0.
  To not use the airspeed sensor data in the controller, set `FW_USE_AIRSPD` to 0.
  Added to PX4 in [PX4-Autopilot#22510](https://github.com/PX4/PX4-Autopilot/pull/22510).
- [Auto-trimming](../config_fw/trimming_guide_fixedwing.md#auto-trimming) (enabled by default).
  Automatically calibrates trim parameters and then continuously adjusts trim of the aircraft during flight.
  Added to PX4 in [PX4-Autopilot#22668](https://github.com/PX4/PX4-Autopilot/pull/22668).

### Rover

- TBD

### ROS 2

- TBD