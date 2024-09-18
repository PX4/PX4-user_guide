# Drive Modes (Rover)

Flight modes (or more accurately "Drive modes" for ground vehicles) provide autopilot support to make it easier to manually drive the vehicle or to execute autonomous missions.

This section outlines all supported drive modes for rovers.
Note that some of the modes have different implementations for the different rover types.

For information on mapping RC control switches to specific modes see: [Basic Configuration > Flight Modes](../config/flight_mode.md).

::: warning
Selecting any other mode than those below will either stop the rover or can lead to undefined behaviour.
:::

## Supported Modes

The different types of rovers support the following modes:

### Manual Modes

These are modes that require a stick input from the user to drive the vehicle.
The different manual modes are listed in order of increasing levels of autopilot support.

| [Differential](../frames_rover/differential_rover.md)         | [Ackermann](../frames_rover/ackermann_rover.md)       |
| ------------------------------------------------------------- | ----------------------------------------------------- |
| [Manual](../flight_modes_rover/manual.md#manual-mode)         | [Manual](../flight_modes_rover/manual.md#manual-mode) |
| [Acro](../flight_modes_rover/manual.md#acro-mode)             |                                                       |
| [Stabilized](../flight_modes_rover/manual.md#stabilized-mode) |                                                       |
| [Position](../flight_modes_rover/manual.md#position-mode)     |                                                       |

### Auto Modes

In auto modes the autopilot takes over control of the vehicle to perform autonomous navigation, such as executing a mission plan.
Both Ackermann and differential rovers support the same auto modes, but have different implementations:

| Drive Mode                                            |
| ----------------------------------------------------- |
| [Mission](../flight_modes_rover/auto.md#mission-mode) |
| [Return](../flight_modes_rover/auto.md#return-mode)   |
