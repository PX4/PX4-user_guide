---
canonicalUrl: https://docs.px4.io/main/de/config_mc/mc_trajectory_tuning
---

# Multicopter Setpoint Tuning (Trajectory Generator)

This document provides an overview of the multicopter tuning parameters that change the *user experience*: how fast the vehicle reacts to stick movements or direction changes in missions, the maximum allowed velocity, etc.

In other words, this topic explains how to tune the parameters that affect the value of a *desired setpoint* rather than those that affect how well the vehicle *tracks* the setpoint).

The algorithm that generates those setpoints is called a "trajectory generator".

:::warning
This guide is for advanced users/experts.
:::

:::tip
Follow the instructions in the [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) *before* doing any of the tuning described here. Do not use these tuning parameters to fix bad tracking or vibration!
:::

## Overview

The input to the P/PID controller is a *desired setpoint* that the vehicle should attempt to track. [PID Tuning](../config_mc/pid_tuning_guide_multicopter.md) ("Lower level tuning") aims to reduce the error between the desired setpoint and the estimate of the vehicle state.

The *desired setpoint* passed to the P/PID controller is itself calculated from a *demanded setpoint* based on a stick position (in RC modes) or from a mission command. The demanded setpoint can change very quickly (e.g. if a user moves stick from zero to maximum value as a "step"). Vehicle flight characteristics are better if the corresponding desired setpoint changes as a "ramp".

*Setpoint value tuning* ("higher level tuning") is used to specify the mapping between the *demanded* and the *desired* setpoints - i.e. defining the "ramp" at which the desired setpoint follows the demanded setpoint.

:::tip
Poorly tuned [P/PID Gains](../config_mc/pid_tuning_guide_multicopter.md) can lead to instability. Poorly tuned *setpoint values* cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes.
:::

<a id="modes"></a>

## Flight Modes Trajectory Support

[Mission mode](../flight_modes/mission.md) used the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory all the time.

[Position mode](../flight_modes/position_mc.md) supports all the [trajectory types](#trajectory-implementations) listed below. It uses the [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) trajectory by default; other types can be set using [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

[Altitude mode](../flight_modes/altitude_mc.md) similarly uses the [trajectory types](#trajectory-implementations) selected by [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE), but *only* for smoothing the vertical component (i.e. when controlling the altitude).

No other modes support trajectory tuning.

## Trajectory Implementations

The following list provides an *overview* of the different trajectory implementations:

- [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) (Default) 
  - Used when smooth motion is required (e.g.: filming, mapping, cargo).
  - Generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.
  - May not be suitable for vehicles/use-cases that require a faster response - e.g. racer quads.
  - Set in position mode using `MPC_POS_MODE=3`.
- **Simple position control** 
  - Sticks map directly to velocity setpoints without smoothing.
  - Useful for velocity control tuning.
  - Set in position mode using `MPC_POS_MODE=0`.