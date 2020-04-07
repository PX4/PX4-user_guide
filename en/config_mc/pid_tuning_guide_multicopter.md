# Multicopter PID Tuning Guide

This tutorial explains how to tune the PID loops on PX4 for all [multicopter setups](../airframes/airframe_reference.md#copter) (Quads, Hexa, Octo etc).

Generally if you're using a [supported specific configuration](../airframes/airframe_reference.md#copter) (e.g. using an airframe in [QGroundControl > Airframe](../config/airframe.md)) the default tuning should be sufficient to fly the vehicle safely.
To get the very best performance it is usually good to tune a new vehicle.
For example, different ESCs or motors require different tuning gains for optimal flight.

> **Warning** This guide is for advanced users.
  Un- or partially- tuned vehicles are likely to be unstable, and easy to crash.
  Make sure to have a Kill-switch assigned.


## Introduction

PX4 uses **P**roportional, **I**ntegral, **D**erivative (PID) controllers (these are the most widespread control technique).

The controllers are layered, which means a higher-level controller passes its results to a lower-level controller.
The lowest-level controller is the the **rate controller**, then there is the **attitude contoller**, and then the **velocity & position controller**.
The PID tuning needs to be done in the same order, starting with the rate controller, as it will affect all other controllers.


## Preconditions

- You have selected the closest matching [default airframe configuration](../config/airframe.md) for your vehicle.
  This should give you a vehicle that already flies.
- You should have done an [ESC calibration](../advanced_config/esc_calibration.md).
- [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) is set correctly.
  It needs to be set low, but such that the **motors never stop** when the vehicle is armed.

  This can be tested in [Acro mode](../flight_modes/acro_mc.md) or in [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md):
  - Remove propellers
  - Arm the vehicle and lower the throttle to the minimum
  - Tilt the vehicle to all directions, about 60 degrees
  - Check that no motors turn off
- Optionally enable the high-rate logging profile with the [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) parameter so you can use the log to evaluate the rate and attitude tracking performance (the option can be disabled afterwards).

> **Warning** Always disable [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) when tuning a vehicle.


## Tuning Steps

> **Note** For safety reasons, the default gains are set to low values.
> You must increase the gains before you can expect good control responses. 

Here are some general points to follow when tuning:
- All gains should be increased very slowly as large gains may cause dangerous oscillations!
  Typically increase gains by 20-30% per iteration, reducing to 5-10% for final fine tuning.
- Land before changing a parameter. Slowly increase the throttle and check for oscillations.
- Tune the vehicle around the hovering thrust point, and use the [thrust curve parameter](#thrust_curve) to account for thrust non-linearities or high-thrust oscillations.

### Rate Controller

The rate controller is the inner-most loop with three independent PID controllers to control the body rates (yaw, pitch, roll).

> **Note** A well-tuned rate controller is very important as it affects *all* flight modes.
  A badly tuned rate controller will be visible in [Position mode](../flight_modes/position_mc.md), for example, as "twitches" (the vehicle will not hold perfectly still in the air).

#### Rate Controller Architecture/Form

PX4 supports two (mathematically equivalent) forms of the PID rate controller in a single "mixed" implementation: [Parallel](#parallel_form) and [Standard](#standard_form).

Users can select the form that is used by setting the proportional gain for the other form to "1" (i.e. in the diagram below set **K** to 1 for the parallel form, or **P** to 1 for the standard form - this will replace either the K or P blocks with a line).

![PID_Mixed](../../images/mc_pid_tuning/PID_algorithm_Mixed.png)
<!-- The drawing is on draw.io: https://drive.google.com/file/d/1hXnAJVRyqNAdcreqNa5W4PQFkYnzwgOO/view?usp=sharing -->
- _G(s)_ represents the angular rates dynamics of a vehicle
- _r_ is the rate setpoint
- _y_ is the body angular rate (measured by a gyro)
- _e_ is the error between the rate setpoint and the measured rate
- _u_ is the output of the PID controller


The two forms are described below.


> **Note** The derivative term (**D**) is on the feedback path in order to avoid an effect known as the [derivative kick](http://brettbeauregard.com/blog/2011/04/improving-the-beginner%E2%80%99s-pid-derivative-kick/).

<span></span>
> **Tip** For more information see:
  - [Not all PID controllers are the same](https://www.controleng.com/articles/not-all-pid-controllers-are-the-same/) (www.controleng.com) 
  - [PID controller > Standard versus parallel (ideal) PID form](https://en.wikipedia.org/wiki/PID_controller#Standard_versus_parallel_(ideal)_PID_form) (Wikipedia)


##### Parallel Form {#parallel_form}

The *parallel form* is the simplest form, and is (hence) commonly used in textbooks.
In this case the output of the controller is simply the sum of the proportional, integral and derivative actions.

![PID_Parallel](../../images/mc_pid_tuning/PID_algorithm_Parallel.png)

##### Standard Form {#standard_form}

This form is mathematically equivalent to the parallel form, but the main advantage is that (even if it seems counter intuitive) it decouples the proportional gain tuning from the integral and derivative gains.
This means that a new platform can easily be tuned by taking the gains of a drone with similar size/inertia and simply adjust the K gain to have it flying properly.

![PID_Standard](../../images/mc_pid_tuning/PID_algorithm_Standard.png)


#### Rate PID Tuning

The related parameters for the tuning of the PID rate controllers are:
- Roll rate control ([MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P), [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I), [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D), [MC_ROLLRATE_K](../advanced_config/parameter_reference.md#MC_ROLLRATE_K))
- Pitch rate control ([MC_PITCHRATE_P](../advanced_config/parameter_reference.md#MC_PITCHRATE_P), [MC_PITCHRATE_I](../advanced_config/parameter_reference.md#MC_PITCHRATE_I), [MC_PITCHRATE_D](../advanced_config/parameter_reference.md#MC_PITCHRATE_D), [MC_PITCHRATE_K](../advanced_config/parameter_reference.md#MC_PITCHRATE_K))
- Yaw rate control ([MC_YAWRATE_P](../advanced_config/parameter_reference.md#MC_YAWRATE_P), [MC_YAWRATE_I](../advanced_config/parameter_reference.md#MC_YAWRATE_I), [MC_YAWRATE_D](../advanced_config/parameter_reference.md#MC_YAWRATE_D), [MC_YAWRATE_K](../advanced_config/parameter_reference.md#MC_YAWRATE_K))

The rate controller can be tuned in [Acro mode](../flight_modes/acro_mc.md) or [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md):
- *Acro mode* is preferred, but is harder to fly. If you choose this mode, disable all stick expo:
  - `MC_ACRO_EXPO` = 0, `MC_ACRO_EXPO_Y` = 0, `MC_ACRO_SUPEXPO` = 0,
    `MC_ACRO_SUPEXPOY` = 0
  - `MC_ACRO_P_MAX` = 200, `MC_ACRO_R_MAX` = 200
  - `MC_ACRO_Y_MAX` = 100
- *Manual/Stabilized mode* is simpler to fly, but it is also more difficult to see if the attitude or the rate controller needs more tuning.

If the vehicle does not fly at all:
- If there are strong oscillations when first trying to takeoff (to the point where it does not fly), decrease all **P** and **D** gains until it takes off.
- If the reaction to RC movement is minimal, increase the **P** gains.

The actual tuning is roughly the same in *Manual mode* or *Acro mode*:
You iteratively tune the **P** and **D** gains for roll and pitch, and then the **I** gain.
Initially you can use the same values for roll and pitch, and once you have good values,
you can fine-tune them by looking at roll and pitch response separately (if your vehicle is symmetric, this is not needed).
For yaw it is very similar, except that **D** can be left at 0.

##### Proportional Gain (P/K)

The proportional gain is used to minimize the tracking error (below we use **P** to refer to both **P** or **K**).
It is responsible for a quick response and thus should be set as high as possible, but without introducing oscillations.
- If the **P** gain is too high: you will see high-frequency oscillations.
- If the **P** gain is too low:
  - the vehicle will react slowly to input changes.
  - In *Acro mode* the vehicle will drift, and you will constantly need to correct to keep it level.

##### Derivative Gain (D)

The **D** (derivative) gain is used for rate damping.
It is required but should be set only as high as needed to avoid overshoots.
- If the **D** gain is too high: the motors become twitchy (and maybe hot), because the **D** term amplifies noise.
- If the **D** gain is too low: you see overshoots after a step-input.

Typical values are:
- standard form (**P** = 1): between 0.01 (4" racer) and 0.04 (500 size), for any value of **K**
- parallel form (**K** = 1): between 0.0004 and 0.005, depending on the value of **P**

##### Integral Gain (I)

The **I** (integral) gain keeps a memory of the error. The **I** term increases when the desired rate is not reached over some time.
It is important (especially when flying *Acro mode*), but it should not be set too high.
- If the I gain is too high: you will see slow oscillations.
- If the I gain is too low: this is best tested in *Acro mode*, by tilting the vehicle to one side about 45 degrees, and keeping it like that.
  It should keep the same angle.
  If it drifts back, increase the **I** gain.
  A low **I** gain is also visible in a log, when there is an offset between the desired and the actual rate over a longer time.

Typical values are:
- standard form (**P** = 1): between 0.5 (VTOL plane), 1 (500 size) and 8 (4" racer), for any value of **K**
- parallel form (**K** = 1): between 0.3 and 0.5 if **P** is around 0.15
The pitch gain usually needs to be a bit higher than the roll gain.

#### Testing Procedure

To test the current gains, provide a fast **step-input** when hovering and observe how the vehicle reacts.
It should immediately follow the command, and neither oscillate, nor overshoot (it feels 'locked-in').

You can create a step-input for example for roll, by quickly pushing the roll stick to one side, and then let it go back quickly (be aware that the stick will oscillate too if you just let go of it, because it is spring-loaded — a well-tuned vehicle will follow these oscillations).

> **Note** A well-tuned vehicle in *Acro mode* will not tilt randomly towards one side,
> but keeps the attitude for tens of seconds even without any corrections.


#### Logs

Looking at a log helps to evaluate tracking performance as well.
Here is an example for good roll and yaw rate tracking:

![roll rate tracking](../../images/mc_pid_tuning/roll_rate_tracking.png)
![yaw rate tracking](../../images/mc_pid_tuning/yaw_rate_tracking.png)

And here is a good example for the roll rate tracking with several flips, which create an extreme step-input.
You can see that the vehicle overshoots only by a very small amount:
![roll rate tracking flips](../../images/mc_pid_tuning/roll_rate_tracking_flip.png)


### Attitude Controller

This controls the orientation and outputs desired body rates with the following tuning parameters:
- Roll control ([MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P))
- Pitch control ([MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P)
- Yaw control ([MC_YAW_P](../advanced_config/parameter_reference.md#MC_YAW_P))

The attitude controller is much easier to tune.
In fact, most of the time the defaults do not need to be changed at all.

To tune the attitude controller, fly in *Manual/Stabilized mode* and increase the **P** gains gradually.
If you start to see oscillations or overshoots, the gains are too high.

The following parameters can also be adjusted. These determine the maximum rotation rates around all three axes:
- Maximum roll rate ([MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX))
- Maximum pitch rate ([MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX)
- Maximum yaw rate ([MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX))


### Thrust Curve {#thrust_curve}

The tuning above optimises performance around the hover throttle.
But it can be that you start to see oscillations when going towards full throttle.

To counteract that adjust the **thrust curve** with the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter.

> **Note** The rate controller might need to be re-tuned if you change this parameter.

The mapping from motor control signals (e.g. PWM) to expected thrust is linear by default — setting `THR_MDL_FAC` to 1 makes it quadratic.
Values in between use a linear interpolation of the two. Typical values are between 0.3 and 0.5.

If you have a [thrust stand](https://www.rcbenchmark.com/pages/series-1580-thrust-stand-dynamometer) (or can otherwise _measure_ thrust),
you can determine the relationship between the PWM control signal and the motor's actual thrust, and fit a function to the data.
[This Notebook][THR_MDL_FAC_Calculation] shows how the thrust model factor `THR_MDL_FAC` may be calculated from previously measured thrust data.

[![Thrust Curve Compensation](../../images/mc_pid_tuning/thrust-curve-compensation.svg)][THR_MDL_FAC_Calculation]

> **Note** The mapping between PWM and static thrust depends highly on the battery voltage.

[THR_MDL_FAC_Calculation]: https://github.com/PX4/px4_user_guide/blob/master/assets/config/mc/ThrustCurve.ipynb

If you don't have access to a thrust stand, you can also tune the modeling factor empirically.
Start off with 0.3 and increase it by 0.1 at a time.
If it is too high, you will start to notice oscillations at lower throttle values.
If it is too low you'll notice oscillations at higher throttle values.

<!-- TODO
### Velocity & Position Controller
The PID-Gains should be chosen such that tracking is as tight as possible. Before doing any position/velocity control related tuning,
turn off all [higher-level position controller tuning gains](../config_mc/mc_trajectory_tuning.md).

- [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX): 1000
- [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR) : 1000
- [MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW) : 1000
- [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX) : 1000
- [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) : 1000
- [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) : 0
- [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN) : 1
 -->


### Airmode & Mixer Saturation {#airmode}

The rate controller outputs torque commands for all three axis (roll, pitch and yaw) and a scalar thrust value, which need to be converted into individual motor thrust commands.
This step is called mixing.

It can happen that one of the motor commands becomes negative, for example for a low thrust and large roll command (and similarly it can go above 100%).
This is a mixer saturation.
It is physically impossible for the vehicle to execute these commands (except for reversible motors).
PX4 has two modes to resolve this:
- Either by reducing the commanded torque for roll such that none of the motor commands is below zero (Airmode disabled).
  In the extreme case where the commanded thrust is zero, it means that no attitude correction is possible anymore, which is why a minimum thrust is always required for this mode.
- Or by increasing (boosting) the commanded thrust, such that none of the motor commands is negative (Airmode enabled).
  This has the big advantage that the attitude/rates can be tracked correctly even at low or zero throttle.
  It generally improves the flight performance.

  However it increases the total thrust which can lead to situations where the vehicle continues to ascend even though the throttle is reduced to zero.
  For a well-tuned, correctly functioning vehicle it is not the case, but for example it can happen when the vehicle strongly oscillates due to too high P tuning gains.

Both modes are shown below with a 2D illustration for two motors and a torque command for roll <span style="color:#9673A6">r</span>.
On the left motor <span style="color:#9673A6">r</span> is added to the commanded thrust, while on the right motor it is subtracted from it.
The motor thrusts are in <span style="color:#6A9153">green</span>.
With Airmode enabled, the commanded thrust is increased by <span style="color:#B85450">b</span>.
When it is disabled, <span style="color:#9673A6">r</span> is reduced.

![Airmode](../../images/mc_pid_tuning/MC_PID_tuning-Airmode.svg)
<!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the first Tab
-->

If mixing becomes saturated towards the upper bound the commanded thrust is reduced to ensure that no motor is commanded to deliver more than 100% thrust.
This behaviour is similar to the Airmode logic, and is applied whether Airmode is enabled or disabled.

Once your vehicle flies well you can enable Airmode via the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter.

