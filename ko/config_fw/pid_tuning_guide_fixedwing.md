# 고정익 튜닝 가이드

이 가이드는 고정익 PID 계수를 튜닝 방법을 설명합니다.

:::warning
이 가이드는 고급 사용자와 전문가를 위한 것입니다. PID 튜닝이 잘못되면 기체가 충돌할 수 있습니다.
:::

:::note

- 튜닝 게인을 잘못 설정하면 자세 제어가 불안정해질 수 있습니다. 조종사 튜닝 게인은 [수동](../flight_modes/manual_fw.md) 제어로 비행기를 비행하고 착륙할 수 있어야합니다.
- Excessive gains (and rapid servo motion) can violate the maximum forces of your airframe - increase gains carefully.
- Roll and pitch tuning follow the same sequence. The only difference is that pitch is more sensitive to trim offsets, so [trimming](../config_fw/trimming_guide_fixedwing.md) has to be done carefully and integrator gains need more attention to compensate this.
:::

:::tip
All parameters are documented in the [Parameter Reference](../advanced_config/parameter_reference.md). The most important parameters are covered in this guide.
:::

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

To tune this gain, set the other gains to zero.

#### Gains to set to zero

- FW_RR_I = 0
- FW_RR_P = 0
- FW_RSP_OFF = 0

#### Gains to tune

- [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane rolls satisfactorily and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) - start with a value of 0.06. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce gain by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual roll value (this will most likely require looking at a log file).

## Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch offset.

### Tuning the Feedforward Gain

To tune this gain, set the other gains to zero.

#### Gains to set to zero

- FW_PR_I = 0
- FW_PR_P = 0
- FW_PSP_OFF = 0

#### Gains to tune

- [FW_PR_FF](../advanced_config/parameter_reference.md#FW_PR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane pitches satisfactory and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P) - start with a value of 0.04. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce value by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_PR_I](../advanced_config/parameter_reference.md#FW_PR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual pitch value (this will most likely require looking at a log file).

## Adjusting the Time Constant of the Outer Loop

The overall softness / hardness of the control loop can be adjusted by the time constant. The default of 0.5 seconds should be fine for normal fixed-wing setups and usually does not require adjustment.

- [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC) - set to a default of 0.5 seconds, increase to make the Pitch response softer, decrease to make the response harder.
- [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) - set to a default of 0.5 seconds, increase to make the Roll response softer, decrease to make the response harder.