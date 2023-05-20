# 固定翼 PID 调参指南

本指南介绍如何手动调整固定翼PID控制器。 它是为高级用户/专家设计的，因为错误的 PID 调节可能会使您的飞机坠毁。

:::note
[Autotune](../config/autotune.md) 是推荐给大多数用户的, 因为它更快, 更容易, 并且为大多数机型提供了很好的调校。 建议对自动调整不起作用或必须进行更加的调校的机型进行手工调整。
:::

## 前置条件

- “微调”必须首先配置（在开始PID调校之前）。 见[固定翼微调指南](../config_fw/trimming_guide_fixedwing.md)。
- 调节过程中错误的设置增益可能会使姿态控制不稳定。 因此，在调整增益时需要有飞手以确保可以在 [手动](../flight_modes/manual_fw.md) (超控)模式下控制飞机飞行和降落。
- 过高地增益(和快速的舵面响应)可能会超过你的机体结构允许最大过载――增加增益时需谨慎。
- 滚转和俯仰参数调整都遵循相同的顺序。 唯一的不同是俯仰对微调更敏感， 因此 [微调](../config_fw/trimming_guide_fixedwing.md)必须被谨慎的调整 ，积分增益需要更多的控制输出来密闭微调影响。

## 建立机型基准线

如果有条件飞手可以手动飞行，最好是通过手动飞行试验确定几个系统核心特性。 为了做到这一点，飞这些科目。 在飞行过程中即使你无法及时在纸上记录全部参数，日志文件在供以后调整也将非常有用。

:::note
所有这些参数都将被自动记录。 如果你想在不查看日志的情况下直接调整时才需要使用笔进行记录。

- 在合适的空速下平飞。 注意油门杆位置和空速（例如：70%-> 0.7 油门，15米/秒空速）。
- 以最大油门和足够的空速爬升10-30秒（例如：12米/秒的空速，在30秒内攀升100米）。
- 以零油门和合理的空速来下滑10-30秒（例如：18米/秒的空速，30秒内下降80米）。
- 滚转杆右侧最大，直到滚转角为60度， 然后滚转杆左侧最大，直到滚转角为负60度为止。
- 俯仰最大45度抬头，俯仰最小负45度低头。
:::

本指南将使用这些参数来设置控制器的部分增益。


## 滚转调参

先调节滚转通道，然后俯仰通道。 滚转更安全，因为不准确只会导致运动，而不会导致掉高。

### 调整前馈增益

调整这个增益前，首先将其他增益设定为最低值 (名义上为0.005, 但请检查参数文档)。

#### 设为最小增益

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I)
- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P)


#### 待调整增益

- [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) - 以0.4作为开始调节值。 增加该参数值 (每次双倍增加) 直到飞机滚转响应特性良好并到达设置值。 Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) - start with a value of 0.06. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce gain by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual roll value (this will most likely require looking at a log file).

## Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch offset.

### Tuning the Feedforward Gain

To tune this gain, set the other gains to their minimum values.

#### 设为最小增益

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I)
- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P)

#### 待调整增益

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
