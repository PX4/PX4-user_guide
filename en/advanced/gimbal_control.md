# Gimbal Configuration

This page explains how to configure and control a gimbal that has an attached camera (or any other payload).

## Overview

PX4 contains a generic mount/gimbal control driver that supports different input and output methods:

- The input method defines the protocol used to command a gimbal mount that is managed by PX4.
  This might be an RC controller, a MAVLink command sent by a GCS, or both — automatically switching between them.
- The output method defines how PX4 communicates with the connected gimbal.
  The recommended protocol is MAVLink v2, but you can also connect directly to a Flight Controller PWM output port.

PX4 takes the input signal and routes/translates it to be sent through to the output (any input method can be selected to drive any output).

Both the input and output are configured using parameters.
The input is set using the parameter [MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN).
By default this is set to `Disabled (-1)` and the driver does not run.
After selecting the input mode, reboot the vehicle to start the mount driver.

You should set `MNT_MODE_IN` to one of: `RC (1)`, `MAVlink gimbal protocol v2 (4)` or `Auto (0)` (the other options are deprecated).
If you select `Auto (0)`, the gimbal will automatically select either RC or or MAVLink input based on the latest input (note that to switch from MAVLink to RC requires a large stick motion).

The output is set using the [MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT) parameter.
This is set to output on a PXM port by default (`AUX (0)`).
If the [MAVLink Gimbal Protocol v2](https://mavlink.io/en/services/gimbal_v2.html) is supported by your gimbal, you should instead use/select `MAVLink gimbal protocol v2 (2)`.

The full list of parameters for setting up the mount driver can be found in [Parameter Reference > Mount](../advanced_config/parameter_reference.md#mount) (the most relevant values are described below).

## MAVLink Gimbal (MNT_MODE_OUT=MAVLINK)

To enable a MAVLink gimbal, first set parameter [MNT_MODE_IN](../advanced_config/parameter_reference.md#MNT_MODE_IN) to `MAVlink gimbal protocol v2` and [MNT_MODE_OUT](../advanced_config/parameter_reference.md#MNT_MODE_OUT) to `MAVLink gimbal protocol v2`. 

The gimbal can be connected to *any free serial port* using the instructions in [MAVLink Peripherals (GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md) (also see [Serial Port Configuration](../peripherals/serial_configuration.md#serial-port-configuration)).

A common configuration is to have a serial connection to the gimbal from the Flight Controller `TELEM2` port (assuming `TELEM2` is free).
For this configuration you would set:
- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) to **TELEM2** (if `MAV_1_CONFIG` is already used for a companion computer (say), use `MAV_2_CONFIG`).
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) to **NORMAL**
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) to manufacturer recommended baud rate.

This will enable MAVLink to command the gimbal using [MAV_CMD_DO_MOUNT_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONTROL) and [MAV_CMD_DO_MOUNT_CONFIGURE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_MOUNT_CONFIGURE).


## Gimbal on Flight Controller PWM Output (MNT_MODE_OUT=AUX)

The gimbal can be connected to the Flight controller PWM ports by setting the output mode to `MNT_MODE_OUT=AUX`.

The output pins that are used to control the gimbal are set in the [Acuator Configuration > Outputs](/en/config/actuators.md#actuator-outputs) by selecting any three unused Actuator Outputs and assigning the following output functions:
- `Gimbal Roll`: Output controls gimbal roll.
- `Gimbal Pitch`: Output controls Gimbal pitch.
- `Gimbal Yaw`: Output controls Gimbal pitch.

For example, you might have the following settings to assign the gimbal roll, pitch and yaw to AUX1-3 ouptuts.

![Gimbal Actuator config](../../assets/config/actuators/qgc_actuators_gimbal.png)


## SITL

The Gazebo [Typhoon H480 model](../simulation/gazebo_vehicles.md#typhoon-h480-hexrotor) comes with a preconfigured simulated gimbal.

To run it, use:
```
make px4_sitl gazebo_typhoon_h480
```

To just test the mount driver on other models or simulators, make sure the driver runs (using `vmount start`), then configure its parameters.

## Testing

The driver provides a simple test command — it needs to be stopped first with `vmount stop`.
The following describes testing in SITL, but the commands also work on a real device.

Start the simulation with (no parameter needs to be changed for that):

```
make px4_sitl gazebo_typhoon_h480
```

Make sure it's armed, eg. with `commander takeoff`, then use the following command to control the gimbal (for example):

```
vmount test yaw 30
```

Note that the simulated gimbal stabilizes itself, so if you send MAVLink commands, set the `stabilize` flags to `false`.

![Gazebo Gimbal Simulation](../../assets/simulation/gazebo/gimbal-simulation.png)
