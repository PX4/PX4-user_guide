# Multicopter Setpoint Tuning (Trajectory Generator)

This document provides an overview of the multicopter tuning parameters that change the *user experience*: how fast the vehicle reacts to stick movements or direction changes in missions, the maximum allowed velocity, etc. (i.e. the parameters that affect the value of a desired setpoint rather than those that affect how well the vehicle *tracks* the setpoint).
The algorithm that generates those setpoints is called a "trajectory generator".

> **Warning** This guide is for advanced users/experts.

<span></span>
> **Tip** Follow the instructions in the [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) *before* doing any of the tuning described here.
  Do not use these tuning parameters to fix bad tracking or vibration!

## Overview

The input to the P/PID controller is a *desired setpoint* that the vehicle should attempt to track.
[PID Tuning](../config_mc/pid_tuning_guide_multicopter.md) ("Lower level" tuning) aims to reduce the error between the desired setpoint and the estimate of the vehicle state.
Poor P/PID Gains can lead to instability.

The *desired* setpoint passed to the P/PID controller is itself calculated from a *demanded* setpoint based on a stick position (in RC modes) or from a mission command.
Setpoint value ("higher level") tuning is used to specify the mapping between the demanded setpoint and the desired setpoint.
Poorly tuned setpoint values cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes.

> **Tip** The demanded setpoint can change very quickly (e.g. if a user moves stick from zero to maximum value as a "step").
  Vehicle flight characteristics are better if the corresponding desired setpoint changes as a "ramp".

The setpoint-value tuning parameters can be split into two groups: tuning parameters for position mode and tuning parameters for mission mode.
Some parameters will have an effect on both modes.

## Definitions

The position controller ([diagram here](https://dev.px4.io/master/en/flight_stack/controller_diagrams.html#multicopter-position-controller)) consists of an outer **P** position-control loop and an inner **PID** velocity-control loop.
Depending on the control (flight) mode either both loops are active or just the velocity control loop.

For the remainder of this topic the term **position-control** represents the case where both loops are active while **velocity-control** refers to the case when only the velocity control loop is in use.

## Implementations

Different implementations are available for each mode and can be selected using the parameters [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE).

Click on the link below to learn more about those implementations and how to configure them:

- [Jerk-limited](../config_mc/mc_jerk_limited_type_trajectory.md) (`MPC_POS_MODE=3`) - Used when smooth motion is required (e.g.: filming, mapping, cargo).
  - Generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.

> **Tip** The jerk-limited (smooth) type is used by default for all frames in both manual and auto modes; this may not be suitable for vehicles/use-cases that require a faster response - e.g. racer quads. 
