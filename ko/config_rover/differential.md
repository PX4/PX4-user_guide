# Configuration/Tuning (Differential Rover)

This topic provides a step-by-step guide for setting up your [Differential rover](../frames_rover/differential.md).
Successive steps enable [drive modes](../flight_modes_rover/differential.md) with more autopilot support and features.

:::warning
Each step is dependent on the previous steps having been completed.
Modes will only work properly if the preceding modes have been configured.
:::

## Basic Setup

To configure the differential rover frame and outputs:

1. Enable Rover support by flashing the [PX4 rover build](../frames_rover/index.md#flashing-the-rover-build) onto your flight controller.
   Note that this is a special build that contains rover-specific modules.

2. In the [Airframe](../config/airframe.md) configuration select _Generic Rover Differential_ frame:

   ![QGC screenshot showing selection of the airframe 'Generic Rover Differential'](../../assets/config/airframe/airframe_generic_rover_differential.png)

   Select the **Apply and Restart** button.

   ::: info
   If this airframe is not displayed and you have checked that you are using rover firmware (not the default), you can alternatively enable this frame by setting the [SYS_AUTOSTART](../advanced_config/parameter_reference.md#SYS_AUTOSTART) parameter to `50000`.

:::

3. Use [Actuators Configuration & Testing](../config/actuators.md) to map the motor functions to flight controller outputs.

## 수동 모드

The basic setup (above) is all that is required to use the rover in [Manual mode](../flight_modes_rover/differential.md#manual-mode).

## Acro Mode

:::warning
For this mode to work properly the [Basic Setup](#basic-setup) must've already been completed!
:::

To set up [Acro mode](../flight_modes_rover/differential.md#acro-mode) navigate to [Parameters](../advanced_config/parameters.md) in QGroundControl and set the following parameters:

1. [RD_WHEEL_TRACK](#RD_WHEEL_TRACK) [m]: Measure the distance from the centre of the right wheel to the centre of the left wheel.

   ![Wheel track](../../assets/airframes/rover/rover_differential/wheel_track.png)

2. [RD_MAX_YAW_RATE](#RD_MAX_YAW_RATE) [deg/s]: This is the maximum yaw rate you want to allow for your rover.
   This will define the stick-to-yaw-rate mapping for all manual modes using closed loop yaw control and set an upper limit for the yaw rate setpoint for all [auto modes](#auto-modes).

3. [RD_MAX_THR_YAW_R](#RD_MAX_YAW_RATE) [m/s]: This parameter is used to calculate the feed-forward term of the closed loop yaw rate control.
   The controller calculates the required speed difference between the left and right motor to achieve the desired yaw rate.
   This desired speed difference is then linearly mapped to normalized motor commands.
   To get a good starting value for this parameter drive the rover in manual mode forwards at full throttle and note the ground speed of the vehicle.
   Then enter _twice_ this value for the parameter. <a id="RD_YAW_RATE_P_TUNING"></a>

   ::: tip
   To further tune this parameter, first make sure you set [RD_YAW_RATE_P](#RD_YAW_RATE_P) and [RD_YAW_RATE_I](#RD_YAW_RATE_I) to zero.
   This way the yaw rate is only controlled by the feed-forward term, which makes it easier to tune.
   Now put the rover in [Acro mode](../flight_modes_rover/differential.md#acro-mode) and then move the right-stick of your controller to the right and/or left and hold it at a few different levels for a couple of seconds each.
   Disarm the rover and from the flight log plot the _yaw_rate_setpoint_ and _actual_yaw_rate_ from the [RoverDifferentialStatus](../msg_docs/RoverDifferentialStatus.md) over each other.
   If the actual yaw rate of the rover is higher than the yaw rate setpoint, increase [RD_MAX_THR_YAW_R](#RD_MAX_YAW_RATE).
   If it is the other way around decrease the parameter and repeat until you are satisfied with the setpoint tracking.

:::

4. [RD_YAW_RATE_P](#RD_YAW_RATE_P) [-]: Proportional gain of the closed loop yaw rate controller.
   Unlike the feed-forward part of the controller, the closed loop yaw rate control will compare the yaw rate setpoint with the measured yaw rate and adapt to motor commands based on the error between them.
   The proportional gain is multiplied with this error and that value is added to the motor command.
   This way disturbances like uneven grounds or external forces can be compensated.

   ::: tip
   This parameter can be tuned the same way as [RD_MAX_THR_YAW_R](#RD_YAW_RATE_P_TUNING).
   If you tuned [RD_MAX_THR_YAW_R](#RD_MAX_YAW_RATE) well, you might only need a very small value.

:::

5. (Optional) [RD_YAW_RATE_I](#RD_YAW_RATE_I) [-]: Integral gain of the closed loop yaw controller.
   The integral gain accumulates the error between the desired and actual yaw rate scaled by the integral gain over time and that value is added to the motor command.

   ::: tip
   The integrator gain is usually not necessary for the yaw rate setpoint as this is usually a fast changing value.
   Leave this parameter at zero unless necessary, as it can have negative side effects such as overshooting or oscillating around the setpoint.

:::

The rover is now ready to drive in [Acro mode](../flight_modes_rover/differential.md#acro-mode).

## Stabilized Mode

:::warning
For this mode to work properly [Acro mode](#acro-mode) must've already been configured!
:::

For [Stabilized mode](../flight_modes_rover/differential.md#stabilized-mode) the controller utilizes a closed loop yaw controller, which creates a yaw rate setpoint to control the yaw when it is active:

![Cascaded PID for yaw control](../../assets/airframes/rover/rover_differential/cascaded_pid_for_yaw.png)

Unlike the closed loop yaw rate, this controller has no feed-forward term.
Therefore you only need to tune the closed loop gains:

1. [RD_YAW_P](#RD_YAW_P) [-]: Proportional gain for the closed loop yaw controller.

   ::: tip
   In stabilized mode the closed loop yaw control is only active when driving a straight line (no yaw rate input).
   To tune it set [RD_YAW_I](#RD_YAW_I) to zero and start with a value of 1 for [RD_YAW_P](#RD_YAW_P).
   Put the rover into stabilized mode and move the left stick of your controller up and/or down to drive forwards/backwards.
   Disarm the rover and from the flight log plot the _yaw_setpoint_ from the [RoverDifferentialSetpoint](../msg_docs/RoverDifferentialSetpoint.md) message and the _actual_yaw_ from the [RoverDifferentialStatus](../msg_docs/RoverDifferentialStatus.md) message over each other.
   Increase/Decrease the parameter until you are satisfied with the setpoint tracking.

:::

2. [RD_YAW_I](#RD_YAW_I) [-]: Integral gain for the closed loop yaw controller.

   ::: tip
   For the closed loop yaw control an integrator gain is useful because this setpoint is often constant for a while and an integrator eliminates steady state errors that can cause the rover to never reach the setpoint.
   In [Auto Modes](#auto-modes) there will be a further elaboration on why an integrator is necessary for the yaw controller.

:::

The rover is now ready to drive in [Stabilized mode](../flight_modes_rover/differential.md#stabilized-mode).

## Position Mode

:::warning
For this mode to work properly [Acro mode](#acro-mode) and [Stabilized mode](#stabilized-mode) must already be configured!
:::

[Position mode](../flight_modes_rover/differential.md#position-mode) is the most advanced manual mode, utilizing closed loop yaw rate, yaw and speed control and leveraging position estimates.

To configure set the following parameters:

1. [RD_MAX_SPEED](#RD_MAX_SPEED) [m/s]: This is the maximum speed you want to allow for your rover.
   This will define the stick-to-speed mapping for position mode and set an upper limit for the speed setpoint for all [auto modes](#auto-modes).

2. [RD_MAX_THR_SPD](#RD_MAX_SPEED) [m/s]: This parameter is used to calculate the feed-forward term of the closed loop speed control which linearly maps desired speeds to normalized motor commands.
   A good starting point is the observed ground speed when the rover drives at maximum throttle in [Manual mode](../flight_modes_rover/differential.md#manual-mode).

   <a id="RD_SPEED_P_TUNING"></a>

   ::: tip
   To further tune this parameter, first make sure you set [RD_SPEED_P](#RD_SPEED_P) and [RD_SPEED_I](#RD_SPEED_I) to zero.
   This way the speed is only controlled by the feed-forward term, which makes it easier to tune.
   Now put the rover in [Position mode](../flight_modes_rover/differential.md#position-mode) and then move the left stick of your controller up and/or down and hold it at a few different levels for a couple of seconds each.
   Disarm the rover and from the flight log plot the _forward_speed_setpoint_ from the [RoverDifferentialSetpoint](../msg_docs/RoverDifferentialSetpoint.md) message and the _actual_speed_ from the [RoverDifferentialStatus](../msg_docs/RoverDifferentialStatus.md) message over each other.
   If the actual speed of the rover is higher than the speed setpoint, increase [RD_MAX_THR_SPD](#RD_MAX_THR_SPD).
   If it is the other way around decrease the parameter and repeat until you are satisfied with the setpoint tracking.

:::

   ::: info
   If your rover oscillates when driving a straight line in [Position mode](../flight_modes_rover/differential.md#position-mode) just set this parameter to the observed ground speed at maximum throttle in [Manual mode](../flight_modes_rover/differential.md#manual-mode) and complete steps 5-7 first before continuing the tuning of the closed loop speed control (Steps 2-4).

:::

3. [RD_SPEED_P](#RD_SPEED_P) [-]: Proportional gain of the closed loop speed controller.

   ::: tip
   This parameter can be tuned the same way as [RD_MAX_THR_SPD](#RD_SPEED_P_TUNING).
   If you tuned [RD_MAX_THR_SPD](#RD_MAX_THR_SPD) well, you might only need a very small value.

:::

4. [RD_SPEED_I](#RD_SPEED_I) [-]: Integral gain for the closed loop speed controller.

   ::: tip
   For the closed loop speed control an integrator gain is useful because this setpoint is often constant for a while and an integrator eliminates steady state errors that can cause the rover to never reach the setpoint.

:::

5. [PP_LOOKAHD_GAIN](#PP_LOOKAHD_GAIN): When driving in a straight line (no yaw rate input) position mode leverages the same path following algorithm used in [auto modes](#auto-modes) called [pure pursuit](#pure-pursuit-guidance-logic) to achieve the best possible straight line driving behaviour ([Illustration of control architecture](#pure_pursuit_controller)).
   This parameter determines how aggressive the controller will steer towards the path.

   ::: tip
   Decreasing the parameter makes it more aggressive but can lead to oscillations.
   Start with a value of 1 for [PP_LOOKAHD_GAIN](#PP_LOOKAHD_GAIN), put the rover in [Position mode](../flight_modes_rover/differential.md#position-mode) and while driving a straight line at approximately half the maximum speed observe its behaviour.
   If the rover does not drive in a straight line, reduce the value of the parameter, if it oscillates around the path increase the value.
   Repeat until you are satisfied with the behaviour.

:::

6. [PP_LOOKAHD_MIN](#PP_LOOKAHD_MIN): Minimum threshold for the lookahead distance used by the [pure pursuit algorithm](#pure-pursuit-guidance-logic).

   ::: tip
   Put the rover in [Position mode](../flight_modes_rover/differential.md#position-mode) and drive at very low speeds, if the rover starts to oscillate even though the tuning of [PP_LOOKAHD_GAIN](#PP_LOOKAHD_GAIN) was good for medium speeds, then increase the value of [PP_LOOKAHD_MIN](#PP_LOOKAHD_MIN).

:::

7. [PP_LOOKAHD_MAX](#PP_LOOKAHD_MAX): Maximum threshold for the lookahead distance used by [pure pursuit](#pure-pursuit-guidance-logic).

   ::: tip
   Put the rover in [Position mode](../flight_modes_rover/differential.md#position-mode) and drive at very high speeds, if the rover does not drive in a straight line even though the tuning of [PP_LOOKAHD_GAIN](#PP_LOOKAHD_GAIN) was good for medium speeds, then decrease the value of [PP_LOOKAHD_MAX](#PP_LOOKAHD_MAX).

:::

The rover is now ready to drive in [Position mode](../flight_modes_rover/differential.md#position-mode).

## Auto Modes

:::warning
For this mode to work properly [Acro mode](#acro-mode), [Stabilized mode](#stabilized-mode) and [Position mode](#position-mode) must already be configured!
:::

<a id="pure_pursuit_controller"></a>
In [auto modes](../flight_modes_rover/differential.md#auto-modes) the autopilot takes over navigation tasks using the following control architecture:

![Pure Pursuit Controller](../../assets/airframes/rover/rover_differential/pure_pursuit_controller.png)

The required parameters are separated into the following sections:

### Speed

These parameters are used to calculate the speed setpoint in auto modes:

1. [RD_MISS_SPD_DEF](#RD_MISS_SPD_DEF): Sets the default velocity ($m/s$) for the rover during the mission.

2. [RD_MAX_ACCEL](#RD_MAX_ACCEL) ($m/s^2$) and [RD_MAX_JERK](#RD_MAX_JERK) ($m/s^3$) are used to calculate a velocity trajectory such that the rover comes to a smooth stop as it reaches a waypoint.

   ::: tip
   Plan a mission for the rover to drive a square and observe how it slows down when approaching a waypoint.
   If the rover decelerates too quickly decrease the [RD_MAX_ACCEL](#RD_MAX_ACCEL) parameter, if it starts slowing down too early increase the parameter.
   If you observe a jerking motion as the rover slows down, decrease the [RD_MAX_JERK](#RD_MAX_JERK) parameter otherwise increase it as much as possible as it can interfere with the tuning of [RD_MAX_ACCEL](#RD_MAX_ACCEL).
   These two parameters have to be tuned as a pair, repeat until you are satisfied with the behaviour.

:::

3. Plot the _forward_speed_setpoint_ from the [RoverDifferentialSetpoint](../msg_docs/RoverDifferentialSetpoint.md) message and the _actual_speed_ from the [RoverDifferentialStatus](../msg_docs/RoverDifferentialStatus.md) message over each other.
   If the tracking of these setpoints is not satisfactory adjust the values for [RD_SPEED_P](#RD_SPEED_P) and [RD_SPEED_I](#RD_SPEED_I).

The rover only slows down when approaching the waypoint if the angle between the line segment between the previous/current waypoint and current/next waypoint is smaller than 180° - [RD_TRANS_DRV_TRN](#RD_TRANS_DRV_TRN).
In other words: The rover slows down only if the expected heading error towards the next waypoint when arriving at the current waypoint is below [RD_TRANS_DRV_TRN](#RD_TRANS_DRV_TRN).

![Illustration of the activation threshold of the slow down effect](../../assets/airframes/rover/rover_differential/differential_slow_down_effect.png)

For more information on the [RD_TRANS_DRV_TRN](#RD_TRANS_DRV_TRN) parameter see [State Machine](#state-machine).

### State Machine

The module employs the following state machine to make full use of a differential rovers ability to turn on the spot:

![Differential state machine](../../assets/airframes/rover/rover_differential/differential_state_machine.png)

These transition thresholds can be set with [RD_TRANS_DRV_TRN](#RD_TRANS_DRV_TRN) and [RD_TRANS_TRN_DRV](#RD_TRANS_TRN_DRV).

### Path Following

The [pure pursuit](#pure-pursuit-guidance-logic) algorithm is used to calculate a desired yaw for the vehicle that is then close loop controlled.
The close loop yaw rate was tuned in the configuration of the [Stabilized mode](#stabilized-mode) and the pure pursuit was tuned when setting up the [Position mode](#position-mode).
During any auto navigation task observe the behaviour of the rover.
If you are unsatisfied with the path following, there are 3 steps to take:

1. Plot the _yaw_rate_setpoint_ and _actual_yaw_rate_ from the [RoverDifferentialSetpoint](../msg_docs/RoverDifferentialStatus.md) over each other.
   If the tracking of these setpoints is not satisfactory adjust the values for [RD_YAW_RATE_P](#RD_YAW_RATE_P) and [RD_YAW_RATE_I](#RD_YAW_RATE_I).
2. Plot the _yaw_setpoint_ from the [RoverDifferentialSetpoint](../msg_docs/RoverDifferentialSetpoint.md) message and the _actual_yaw_ from the [RoverDifferentialStatus](../msg_docs/RoverDifferentialStatus.md) message over each other.
   If the tracking of these setpoints is not satisfactory adjust the values for [RD_YAW_P](#RD_YAW_P) and [RD_YAW_I](#RD_YAW_P).
3. Steps 1 and 2 ensure accurate setpoint tracking, if the path following is still unsatisfactory you need to further tune the [pure pursuit](#pure-pursuit-guidance-logic) parameters.

## Pure Pursuit Guidance Logic

The desired yaw setpoints are generated using a pure pursuit algorithm:
The controller takes the intersection point between a circle around the vehicle and a line segment.
In mission mode this line is usually constructed by connecting the previous and current waypoint:

![Pure Pursuit Algorithm](../../assets/airframes/rover/flight_modes/pure_pursuit_algorithm.png)

The radius of the circle around the vehicle is used to tune the controller and is often referred to as look-ahead distance.

The look ahead distance sets how aggressive the controller behaves and is defined as $l_d = v \cdot k$.
It depends on the velocity $v$ of the rover and a tuning parameter $k$ that can be set with the parameter [PP_LOOKAHD_GAIN](#PP_LOOKAHD_GAIN).

:::info
A lower value of [PP_LOOKAHD_GAIN](#PP_LOOKAHD_GAIN) makes the controller more aggressive but can lead to oscillations!
:::

The lookahead is constrained between [PP_LOOKAHD_MAX](#PP_LOOKAHD_MAX) and [PP_LOOKAHD_MIN](#PP_LOOKAHD_MIN).

If the distance from the path to the rover is bigger than the lookahead distance, the rover will target the point on the path that is closest to the rover.

To summarize, the following parameters can be used to tune the controller:

| 매개변수                                                                                                                                               | 설명                                      | Unit |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---- |
| <a id="PP_LOOKAHD_GAIN"></a>[PP_LOOKAHD_GAIN](../advanced_config/parameter_reference.md#PP_LOOKAHD_GAIN) | Main tuning parameter                   | -    |
| <a id="PP_LOOKAHD_MAX"></a>[PP_LOOKAHD_MAX](../advanced_config/parameter_reference.md#PP_LOOKAHD_MAX)    | Maximum value for the look ahead radius | m    |
| <a id="PP_LOOKAHD_MIN"></a>[PP_LOOKAHD_MIN](../advanced_config/parameter_reference.md#PP_LOOKAHD_MIN)    | Minimum value for the look ahead radius | m    |

## Parameter Overview

List of all parameters of the differential rover module:

| 매개변수                                                                                                                                                                                            | 설명                                                                     | Unit    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| <a id="RD_WHEEL_TRACK"></a>[RD_WHEEL_TRACK](../advanced_config/parameter_reference.md#RD_WHEEL_TRACK)                                                 | Wheel track                                                            | m       |
| <a id="RD_MAX_THR_YAW_R"></a>[RD_MAX_THR_YAW_R](../advanced_config/parameter_reference.md#RD_MAX_THR_YAW_R) | Yaw rate turning left/right wheels at max speed in opposite directions | m/s     |
| <a id="RD_MAX_YAW_RATE"></a>[RD_MAX_YAW_RATE](../advanced_config/parameter_reference.md#RD_MAX_YAW_RATE)                         | Maximum allowed yaw rate for the rover                                 | deg/s   |
| <a id="RD_YAW_RATE_P"></a>[RD_YAW_RATE_P](../advanced_config/parameter_reference.md#RD_YAW_RATE_P)                               | Proportional gain for yaw rate controller                              | -       |
| <a id="RD_YAW_RATE_I"></a>[RD_YAW_RATE_I](../advanced_config/parameter_reference.md#RD_YAW_RATE_I)                               | Integral gain for yaw rate controller                                  | -       |
| <a id="RD_YAW_P"></a>[RD_YAW_P](../advanced_config/parameter_reference.md#RD_YAW_P)                                                                   | Proportional gain for yaw controller                                   | -       |
| <a id="RD_YAW_I"></a>[RD_YAW_I](../advanced_config/parameter_reference.md#RD_YAW_I)                                                                   | Integral gain for yaw controller                                       | -       |
| <a id="RD_MAX_SPEED"></a>[RD_MAX_SPEED](../advanced_config/parameter_reference.md#RD_MAX_SPEED)                                                       | Maximum allowed speed for the rover                                    | m/s     |
| <a id="RD_MAX_THR_SPD"></a>[RD_MAX_THR_SPD](../advanced_config/parameter_reference.md#RD_MAX_THR_SPD)                            | Speed the rover drives at maximum throttle                             | m/s     |
| <a id="RD_SPEED_P"></a>[RD_SPEED_P](../advanced_config/parameter_reference.md#RD_SPEED_P)                                                             | Proportional gain for speed controller                                 | -       |
| <a id="RD_SPEED_I"></a>[RD_SPEED_I](../advanced_config/parameter_reference.md#RD_SPEED_I)                                                             | Integral gain for speed controller                                     | -       |
| <a id="PP_LOOKAHD_GAIN"></a>[PP_LOOKAHD_GAIN](../advanced_config/parameter_reference.md#PP_LOOKAHD_GAIN)                                              | Main tuning parameter for pure pursuit                                 | -       |
| <a id="PP_LOOKAHD_MAX"></a>[PP_LOOKAHD_MAX](../advanced_config/parameter_reference.md#PP_LOOKAHD_MAX)                                                 | Maximum value for the look ahead radius of the pure pursuit algorithm  | m       |
| <a id="PP_LOOKAHD_MIN"></a>[PP_LOOKAHD_MIN](../advanced_config/parameter_reference.md#PP_LOOKAHD_MIN)                                                 | Minimum value for the look ahead radius of the pure pursuit algorithm  | m       |
| <a id="RD_MISS_SPD_DEF"></a>[RD_MISS_SPD_DEF](../advanced_config/parameter_reference.md#RD_MISS_SPD_DEF)                         | Mission speed for the rover                                            | $m/s$   |
| <a id="RD_MAX_ACCEL"></a>[RD_MAX_ACCEL](../advanced_config/parameter_reference.md#RD_MAX_ACCEL)                                                       | Maximum acceleration for the rover                                     | $m/s^2$ |
| <a id="RD_MAX_JERK"></a>[RD_MAX_JERK](../advanced_config/parameter_reference.md#RD_MAX_JERK)                                                          | Maximum jerk for the rover                                             | $m/s^3$ |
| <a id="RD_TRANS_DRV_TRN"></a>[RD_TRANS_DRV_TRN](../advanced_config/parameter_reference.md#RD_TRANS_DRV_TRN)                      | Heading error threshold to switch from driving to spot turning         | deg     |
| <a id="RD_TRANS_TRN_DRV"></a>[RD_TRANS_TRN_DRV](../advanced_config/parameter_reference.md#RD_TRANS_TRN_DRV)                      | Heading error threshold to switch from spot turning to driving         | deg     |

## See Also

- [Drive Modes (Differential Rover)](../flight_modes_rover/differential.md).
