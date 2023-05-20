# 固定翼 PID 调参指南

本指南介绍如何手动调整固定翼PID控制器。 它是为高级用户/专家设计的，因为错误的 PID 调节可能会使您的飞机坠毁。

:::note
[Autotune](../config/autotune.md) 是推荐给大多数用户的, 因为它更快, 更容易, 并且为大多数机型提供了很好的调校。 建议对自动调整不起作用或必须进行更加的调校的机型进行手工调整。
:::

## 前置条件

- “微调”必须首先配置（在开始PID调校之前）。 见[固定翼微调指南](../config_fw/trimming_guide_fixedwing.md)。
- 调节过程中错误的设置增益可能会使姿态控制不稳定。 因此，在调整增益时需要有飞手以确保可以在 [手动](../flight_modes/manual_fw.md) (超控)模式下控制飞机飞行和降落。
- Excessive gains (and rapid servo motion) can violate the maximum forces of your airframe - increase gains carefully.
- Roll and pitch tuning follow the same sequence. The only difference is that pitch is more sensitive to trim offsets, so [trimming](../config_fw/trimming_guide_fixedwing.md) has to be done carefully and integrator gains need more attention to compensate this.

## Establishing the Airframe Baseline

If a pilot capable of manual flight is available, its best to establish a few core system properties on a manual trial. To do this, fly these maneuvers. Even if you can't note all the quantities immediately on paper, the log file will be very useful for later tuning.

:::note
All these quantities will be automatically logged. You only need to take notes if you want to directly move on to tuning without looking at the log files.

- Fly level with a convenient airspeed. Note throttle stick position and airspeed (example: 70% → 0.7 throttle, 15 m/s airspeed).
- Climb with maximum throttle and sufficient airspeed for 10-30 seconds (example: 12 m/s airspeed, climbed 100 m in 30 seconds).
- Descend with zero throttle and reasonable airspeed for 10-30 seconds (example: 18 m/s airspeed, descended 80 m in 30 seconds).
- Bank hard right with full roll stick until 60 degrees roll, then bank hard left with full roll stick until 60 degrees in the opposite side.
- Pitch up hard 45 degrees, pitch down hard 45 degrees.
:::

This guide will use these quantities to set some of the controller gains later on.


## Tune Roll

Tune first the roll axis, then pitch. The roll axis is safer as an incorrect tuning leads only to motion, but not a loss of altitude.

### Tuning the Feedforward Gain

To tune this gain, first set the other gains to their minimum values (nominally 0.005, but check the parameter documentation).

#### Gains to set to minimum values

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I)
- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P)


#### Gains to tune

- [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane rolls satisfactorily and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) - start with a value of 0.06. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce gain by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual roll value (this will most likely require looking at a log file).

## Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch offset.

### Tuning the Feedforward Gain

To tune this gain, set the other gains to their minimum values.

#### Gains to set to minimum values

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I)
- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P)

#### Gains to tune

- [FW_PR_FF](../advanced_config/parameter_reference.md#FW_PR_FF) - start with a value of 0.4. Increase this value (doubling each  time) until the plane pitches satisfactory and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P) - start with a value of 0.04. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce value by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_PR_I](../advanced_config/parameter_reference.md#FW_PR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual pitch value (this will most likely require looking at a log file).


## Adjusting the Time Constant of the Outer Loop

The overall softness / hardness of the control loop can be adjusted by the time constant. The default of 0.5 seconds should be fine for normal fixed-wing setups and usually does not require adjustment.

- [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC) - set to a default of 0.5 seconds, increase to make the Pitch response softer, decrease to make the response harder.
- [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) - set to a default of 0.5 seconds, increase to make the Roll response softer, decrease to make the response harder.


## Other Tuning Parameters

The most important parameters are covered in this guide. Additional tuning parameters are documented in the [Parameter Reference](../advanced_config/parameter_reference.md).
