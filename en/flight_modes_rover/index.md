# Drive Modes (Rover)

Flight modes (or more accurately "Drive modes" for ground vehicles) provide autopilot support to make it easier to manually drive the vehicle or to execute autonomous missions.

- [Basic Configuration > Flight Modes](../config/flight_mode.md) - How to map RC control switches to specific flight modes

This section outlines all supported drive modes for rovers. Note that certain flight modes have different implementations for the different rover types.

::: warning
Selecting any other mode than those below will either stop the rover or can lead to undefined behavior.
:::

## Supported Flight Modes

The different types of rovers support the following flight modes:

### Manual Modes

These are modes that require a stick input from the user to drive the vehicle. The different manual modes provide increasing levels of autopilot support.

| [Differential](../frames_rover/differential_rover.md)         | [Ackermann](../frames_rover/ackermann_rover.md)       |
| ------------------------------------------------------------- | ----------------------------------------------------- |
| [Manual](../flight_modes_rover/manual.md#manual-mode)         | [Manual](../flight_modes_rover/manual.md#manual-mode) |
| [Acro](../flight_modes_rover/manual.md#acro-mode)             |                                                       |
| [Stabilized](../flight_modes_rover/manual.md#stabilized-mode) |                                                       |
| [Position](../flight_modes_rover/manual.md#position-mode)     |                                                       |

### Auto Modes

In these modes the autopilot takes over control of the vehicle to perform autonomous navigation such as executing a mission plan.  
Both rover modules support the same auto modes, but differ in implementation:

| Drive Mode                                            |
| ----------------------------------------------------- |
| [Mission](../flight_modes_rover/auto.md#mission-mode) |
| [Return](../flight_modes_rover/auto.md#return-mode)   |
