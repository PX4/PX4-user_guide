# Multicopter PID Tuning Guide

This tutorial explains how to tune the PID loops on PX4 for all [multicopter setups](../airframes/airframe_reference.md#copter) (Quads, Hexa, Octo etc).

Generally if you're using a [supported specific configuration](../airframes/airframe_reference.md#copter) (e.g. using an airframe in [QGroundControl > Airframe](../config/airframe.md)) the default tuning should be sufficient to fly the vehicle safely.
To get the very best performance it is usually good to tune a new vehicle.
For example, different ESCs or motors require different tuning gains for optimal flight.

:::warning
Un- or miss- tuned vehicles are likely to be unstable, and easy to crash.
Make sure to have a Kill-switch assigned.
:::

## Introduction

PX4 uses **P**roportional, **I**ntegral, **D**erivative (PID) controllers (these are the most widespread control technique).

The controllers are layered, which means a higher-level controller passes its results to a lower-level controller.
The lowest-level controller is the **rate controller**, then there is the **attitude contoller**, and then the **velocity & position controller**.
The PID tuning needs to be done in the same order, starting with the rate controller, as it will affect all other controllers.

## Preconditions

- You have selected the closest matching [default airframe configuration](../config/airframe.md) for your vehicle.
  This should give you a vehicle that already flies.
- You should have done an [ESC calibration](../advanced_config/esc_calibration.md).
- If using PWM output: [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) is set correctly.
  It needs to be set low, but such that the **motors never stop** when the vehicle is armed.

  This can be tested in [Acro mode](../flight_modes/acro_mc.md) or in [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md):
  - Remove propellers
  - Arm the vehicle and lower the throttle to the minimum
  - Tilt the vehicle to all directions, about 60 degrees
  - Check that no motors turn off
- If you can, use a high-rate telemetry link (such as WiFi, a typical 3DR Radio is not fast enough for real-time feedback and plots).
  This is particularly important for the rate controller.

## Tuning Procedure
QGroundControl provides a tuning UI that shows real-time plots to monitor the tracking of the controllers.
The goal is for the Response to match the Setpoint as closely as possible (fast response without overshoots).

The testing procedure is always the same: create a step input (fast setpoint change) and observe the response.
Then adjust the sliders accordingly:
- P (proportional) or K gain:
  - increase this for more responsiveness
  - reduce if the response is overshooting and/or oscillating (up to a certain point increasing the D gain also helps).
- D (derivative) gain:
  - this can be increased to dampen overshoots and oscillations
  - increase this only as much as needed, as it amplifies noise (and can lead to hot motors)
- I (integral) gain:
  - used to reduce steady-state error
  - if too low, the response might never reach the setpoint (e.g. in wind)
  - if too high, slow oscillations can occur

General Remarks:
- always disable [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) when tuning a vehicle
- usually the same tuning gains can be used for roll and pitch
- use Acro/Stabilized/Altitude mode to tune the rate controller
- rate controller tuning is the most important, and if tuned well, the other controllers often need no or only minor adjustments
- use Position mode to tune the velocity and position controllers.
  Make sure to switch to the simple input mode, for direct control and possibility to generate step inputs.

![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)

