---
canonicalUrl: https://docs.px4.io/main/de/advanced_config/land_detector
---

# Land Detector Configuration

The land detector is a dynamic vehicle model representing key vehicle states from ground contact through to landed. This topic explains the main parameters you may wish to tune in order to improve landing behaviour.

## Auto-Disarming

The land-detector automatically disarms the vehicle on landing.

You can set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) to specify the number of seconds after landing that the system should disarm (or turn off auto-disarming by setting the parameter to -1).

## Multicopter Configuration

The complete set of relevant landing detector parameters are listed in the parameter reference with the prefix [LNDMC](../advanced_config/parameter_reference.md#land-detector) (these can be edited in QGroundControl via the [parameter editor](../advanced_config/parameters.md)).

:::tip
Information about how the parameters affect landing can be found below in [Land Detector States](#states).
:::

Other key parameters that you may need to tune in order to improve landing behaviour on particular airframes are:

- [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - the hover throttle of the system (default is 50%). It is important to set this correctly as it makes altitude control more accurate and ensures correct land detection. A racer or a big camera drone without payload mounted might need a much lower setting (e.g. 35%).
    
:::note
Incorrectly setting `MPC_THR_HOVER` may result in ground-contact or maybe-landed detection while still in air (in particular, while descending in [Position mode](../flight_modes/position_mc.md) or [Altitude mode](../flight_modes/altitude_mc.md)). This causes the vehicle to "twitch" (turn down the motors, and then immediately turn them back up).
:::

- [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) - the overall minimum throttle of the system. This should be set to enable a controlled descent.

## Fixed Wing Configuration

The complete set of relevant parameters is available under the [LNDFW](../advanced_config/parameter_reference.md#land-detector) prefix. These two parameters are sometimes worth tuning:

- [LNDFW_AIRSPD_MAX](../advanced_config/parameter_reference.md#LNDFW_AIRSPD_MAX) - the maximum airspeed allowed for the system still to be considered landed. The default of 8 m/s is a reliable tradeoff between airspeed sensing accuracy and triggering fast enough. Better airspeed sensors should allow lower values of this parameter.
- [LNDFW_VEL_XY_MAX ](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum horizontal velocity for the system to be still be considered landed. 
- [LNDFW_VEL_Z_MAX](../advanced_config/parameter_reference.md#LNDFW_VEL_XY_MAX) - the maximum vertical velocity for the system to be still be considered landed. This parameter can be adjusted to ensure land detection triggers earlier or later on throwing the airframe for hand-launches.

<span id="states"></span>

## Land Detector States

### Multicopter Land Detection

In order to detect landing, the multicopter first has to go through three different states, where each state contains the conditions from the previous states plus tighter constraints. If a condition cannot be reached because of missing sensors, then the condition is true by default. For instance, in [Acro mode](../flight_modes/acro_mc.md) and no sensor is active except for the gyro sensor, then the detection solely relies on thrust output and time.

In order to proceed to the next state, each condition has to be true for some predefined time. If one condition fails, the land detector drops out of the current state immediately.

#### Ground Contact

This state is reached if following conditions are true for 0.35 seconds:

- no vertical movement ([LNDMC_Z_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_Z_VEL_MAX))
- no horizontal movement ([LNDMC_XY_VEL_MAX](../advanced_config/parameter_reference.md#LNDMC_XY_VEL_MAX))
- lower thrust than [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN) + ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) - [MPC_THR_MIN](../advanced_config/parameter_reference.md#MPC_THR_MIN)) * (0.3, unless a hover thrust estimate is available, then 0.6), or velocity setpoint is 0.9 of land speed but vehicle has no vertical movement.

If the vehicle is in position- or velocity-control and ground contact was detected, the position controller will set the thrust vector along the body x-y-axis to zero.

#### Maybe Landed

This state is reached if following conditions are true for 0.25 seconds:

- all conditions of ground contact are true
- is not rotating ([LNDMC_ROT_MAX](../advanced_config/parameter_reference.md#LNDMC_ROT_MAX))
- has low thrust `MPC_THR_MIN + (MPC_THR_HOVER - MPC_THR_MIN) * 0.1`

If the vehicle only has knowledge of thrust and angular rate, in order to proceed to the next state the vehicle has to have low thrust and no rotation for 8.0 seconds.

If the vehicle is in position or velocity control and maybe landed was detected, the position controller will set the thrust vector to zero.

#### Landed

This state is reached if following conditions are true for 0.3 seconds:

- all conditions of maybe landed are true