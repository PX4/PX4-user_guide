---
canonicalUrl: https://docs.px4.io/main/de/frames_helicopter/README
---

# Helicopters

:::warning

Support for helicopters is [experimental](../airframes/README.md#experimental-vehicles).

- Does not have a maintainer.
- Not regularly tested by the core development team.
- Limited support for different types of helicopters. For example, PX4 does not support helicopters with coaxial or dual rotor types, and features such as RPM governor and autorotation.

Maintainer volunteers, [contribution](../contribute/README.md) of new features, new frame configurations, or other improvements would all be very welcome! :::

<!-- image here please of PX4 helicopter -->

## Helicopter Types

PX4 supports helicopters with a single main rotor with a swash-plate controlled by up to 4 swash-plate servos, and:

- a mechanically uncoupled tail rotor driven by an ESC, or
- a mechanically coupled tail controlled by a servo on the tail motor.

The allowed flight operations and [flight modes](../getting_started/flight_modes.md#multicopter-helicopter) are the same as for multicopter. Note however that (at the time of writing) 3D flying with negative thrust is not supported in autonomous/guided modes.

## Assembly

Assembly of the core autopilot components are similar for all frames. This is covered in [Basic Assembly](../assembly/README.md).

Helicopter-specific assembly consists mostly of connecting and powering the motors and swash plate servos.

:::note

Note that the flight controller cannot power motors and servos (only GPS module, RC receiver, and low power telemetry modules can be powered from Pixhawk flight controllers). Generally a power distribution board (PDB) is used to power motors, and a separate (or integrated) battery elimination circuit (BEC) is used to power each of the servos.
:::


## Configuration

Helicopter configuration and setup is covered in:

- [Helicopter configuration](../config_heli/README.md): Vehicle frame selection, actuator configuration and testing, and tuning.
- [Standard Configuration](../config/README.md): The common configuration and calibration steps for most frames. This includes configuration/calibration of core components such as compass and gyroscope, setting flight mode mappings on a remote control, and safety settings.

## Frame Builds

None available.
