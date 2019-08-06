# Trajectory generator

This document provides an overview of the multicopter position-control tuning parameters that change the *user experience*: how fast the vehicle reacts to stick movements, the maximum allowed velocity, etc. (i.e. the parameters that affect the value of a desired setpoint rather than those that affect how well the vehicle *tracks* the setpoint). The algorithm that generates those setpoints is called a "trajectory generator".

> **Warning** This guide is for advanced users/experts.

<span></span>
> **Tip** Follow the instructions in the [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) *before* doing any of the higher-level related control tuning described here. Do not use the advanced position control tuning parameters to fix bad tracking or vibration!

## Overview

The input to the P/PID controller is a *desired setpoint* that the vehicle should attempt to track. [PID Tuning](../config_mc/pid_tuning_guide_multicopter.md) ("Lower level" tuning) aims to reduce the error between the desired setpoint and the estimate of the vehicle state. Poor P/PID Gains can lead to instability.

The *desired* setpoint passed to the P/PID controller is itself calculated from a *demanded* setpoint based on a stick position (in RC modes) or from a mission command.
Setpoint value ("higher level") tuning is used to specify the mapping between the demanded setpoint and the desired setpoint.
Poorly tuned setpoint values cannot result in instability, but may result in either very jerky or very unresponsive reactions to setpoint changes.

> **Tip** The demanded setpoint can change very quickly (e.g. if a user moves stick from zero to maximum value as a "step").
  Vehicle flight characteristics are better if the corresponding desired setpoint changes as a "ramp".

The setpoint-value tuning parameters can be split into two groups: tuning parameters for position mode and tuning parameters for mission mode.
Some parameters will have an effect on both modes.

## Definitions

The position controller ([diagram here](https://dev.px4.io/en/flight_stack/controller_diagrams.html#multicopter-position-controller)) consists of an outer **P** position-control loop and an inner **PID** velocity-control loop.
Depending on the control (flight) mode either both loops are active or just the velocity control loop.

For the remainder of this topic the term **position-control** represents the case where both loops are active while **velocity-control** refers to the case when only the velocity control loop is in use.

## Implementations

Two different implementations are available for each mode and can be selected using the parameters [MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE) and [MPC_AUTO_MODE](../advanced_config/parameter_reference.md#MPC_AUTO_MODE).

Click on the links below to learn more about those implementations and how to configure them:
- [Slew-rate](../config_mc/position_mode_smooth.md) (`MPC_POS_MODE=1`, `MPC_POS_MODE=2`, `MPC_AUTO_MODE=0`): a simple implementation where the jerk and acceleration is limited using slew-rates. In manual mode, it allows asymmetric profiles based on user intention (smooth acceleration and quick stop). The jerk and acceleration limits are not hard constraints.
**Use case:** when quick response is more important than smooth motions (e.g.: inspection, agressive flight with position hold, fast missions)
- [Jerk-limited](../config_mc/position_mode_smooth_vel.md) (`MPC_POS_MODE=3`, `MPC_AUTO_MODE=1`): generates symmetric smooth S-curves where the jerk and acceleration limits are always guaranteed.
**Use case:** when smooth motions are required (e.g.:filming, mapping, cargo).
