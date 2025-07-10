---
canonicalUrl: https://docs.px4.io/main/zh/config_mc/racer_setup
---

# 穿越机设置

本页面描述了：如何设置和配置一台穿越机来获取良好的性能（尤其对于特技模式）

请注意穿越机是经过特殊设计的动力强劲的快速飞行器。 你应该是有一定经验的使用者，或者让有经验的使用者帮助你。

:::tip
这里所述的许多知识可以用来改善其他类型多旋翼飞行器的飞行性能。
:::

:::note
穿越机通常会少一些传感器（比如：GPS）。 因此，他的保护性选项有所缺失。
:::

## 构建选项

穿越机通常会少一些传感器。

最小配置是只使用陀螺仪和加速度计。

:::note
如果板载自带了磁罗盘，不应该使用他（小穿越机尤其容易受到较强的电磁干扰）。
:::

穿越机通常没有GPS，因为它会增加重量且再发生撞击时候更容易被损坏（一个GPS+外部磁罗盘需要被放置在GPS杆上来避免大电流对磁罗盘的影响，因此也就意味着它更容易被损坏）。

但是增加GPS也有一些好处，尤其是对于初学者。

- 你可以让飞机进入定位状态，飞行器将会待在一个地方。 当你失去方向或者需要刹车时候，这会是有用的。 它通常也可以被用来安全降落。
- [Return mode](../flight_modes/return.md) can be used, either on a switch or as RC loss/low battery failsafe.
- 当发生事故时，你将有飞机最后的位置，方便寻找飞机。
- 飞行记录将包含飞行路线追踪，这意味着你可以进行航行回顾（3D 模式）。 这可以帮助你改善特技飞行技巧。

:::note
在有挑战性的特技精巧操作中，GPS会在短时间内失效。 If you switch into [position mode](../flight_modes/position_mc.md) during that time, [altitude mode](../flight_modes/altitude_mc.md) will be used instead until the position becomes valid again.
:::

## 硬件安装

以下各段叙述了在构建穿越机时的几个重要问题。 如果你需要完整的构建指南，你可以参考 [QAV-R 5"KISS ESC Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 构建日志。

### 振动设置

有各种安装方法来减少振动。 例如，飞行控制器可以安装震动抑制泡沫，或者使用 [O-圆环](../frames_multicopter/qav_r_5_kiss_esc_racer.md#mounting)。

虽然没有单一最好的方法，但如果您使用高质量的组件，您会遇到更少的振动问题。 例如在 [QAV-R 5" 中使用的 KISS ESC 穿越机](../frames_multicopter/qav_r_5_kiss_esc_racer.md)。

确保您使用调平衡过的桨叶。

### 重心

确保重心尽可能靠近推力中心。 左右平衡通常不是问题，但前后平衡可能是一个问题。 您可以移动电池直到重心配置正确后再机架上标记它，这样您就可以始终正确放置电池。

:::note
虽然积分项可以解决不平衡的安装，但是一个自定义的混控器可以处理的更好。 然而，最好还是将不平衡问题在飞行器安装阶段解决掉。
:::

### 电机顺序

如果您计划使用一个四合一的 ESC, 例如 [Hobbywing XRotor Micro 40A 4in1](http://www.hobbywing.com/goods.php?id=588), 你会注意到它使用了不同于PX4使用的电机安装顺序。 PX4 允许您通过 [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING) 参数更改飞控固件中的电机顺序。 您通常可以选择 Betaflight/Cleanflight的电机安装顺序，它是在四合一电调中的常用顺序。

## 软件设置

After having built the racer, you will need to configure the software.

Go through the [Basic Configuration Guide](../config/README.md). In particular, set the [Airframe](../config/airframe.md) that most closely matches your frame (typically you will choose the [Generic 250 Racer](../airframes/airframe_reference.md#copter_quadrotor_x_generic_250_racer) airframe, which sets some racer-specific parameters by default).

These parameters are important:

- Enable One-Shot (set [PWM_MAIN_RATE](../advanced_config/parameter_reference.md#PWM_MAIN_RATE) to 0) or DShot ([DSHOT_CONFIG](../advanced_config/parameter_reference.md#DSHOT_CONFIG)).
- 设置手动/稳定模式的最大滚动、pitch-和 yaw 速率为 所希望： [MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX), [MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX) 和 [MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX) 最大倾斜角度是用 [MPC_MAN_TILT_MAX](../advanced_config/parameter_reference.md#MPC_MAN_TILT_MAX) 配置的。
- 最小推力 [MPC_MANTHR_MIN](../advanced_config/parameter_reference.md#MPC_MANTHR_MIN) 应该设置为 0。

### 估计器

If you use a GPS you can skip this section and use the default estimator. Otherwise you should switch to the Q attitude estimator, which works without a magnetometer or barometer.

To select it, set [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to 1, and change the following parameters:

- 如果系统没有磁罗盘，设置 [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG) 至 0。
- 如果系统没有气压计，设置 [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO) 到 0。
- Configure the Q estimator: set [ATT_ACC_COMP](../advanced_config/parameter_reference.md#ATT_ACC_COMP) to 0, [ATT_W_ACC](../advanced_config/parameter_reference.md#ATT_W_ACC) to 0.4 and [ATT_W_GYRO_BIAS](../advanced_config/parameter_reference.md#ATT_W_GYRO_BIAS) to 0. 如果您愿意，您可以稍后调整这些。

### 故障保护

Configure [RC loss and low battery failsafe](../config/safety.md). If you do not use a GPS, set the failsafe to **Lockdown**, which turns off the motors. Test RC loss on the bench without props attached by turning off the remote when the vehicle is armed.

Make sure to assign a [kill switch](../config/safety.md#kill_switch) or an [arming switch](../config/safety.md#arming_switch). Test it and train to use it!

### PX4 调试

:::note
Make sure to calibrate the ESCs before doing any tuning.
:::

At this point you should be ready for a first test flight.

Assuming the vehicle is able to fly using the default settings, we then do a first pass of [Basic MC PID tuning](../config_mc/pid_tuning_guide_multicopter_basic.md). The vehicle needs to be **undertuned** (the **P** and **D** gains should be set too low), such that there are no oscillations from the controller that could be interpreted as noise (the default gains might be good enough). This is important for the [filter tuning](#filter-tuning) (there will be a second PID tuning round later).

### 控制延迟

*控制延迟* 是从飞机受到物理干扰出到电机做出相应反应的延迟。

:::tip
It is *crucial* to reduce the control latency as much as possible! A lower latency allows you to increase the rate **P** gains, which means better flight performance. Even one millisecond added to the latency makes a difference.
:::

这些因素影响到延迟：

- 软机架或软振动隔离装置会增加延迟(它们充当了滤波器)。
- [Low-pass filters](../config_mc/filter_tuning.md) in software and on the sensor chip trade off increased latency for improved noise filtering.
- PX4 软件内部：传感器信号需要从驱动程序中读取，然后通过控制器传递到输出驱动器。
- IO chip (MAINpins) 添加了大约5.4ms的延迟相对于使用 AUX pins的延迟时间(这不适用于 *Pixracer* 或 *Omnibus F4*, 但适用于Pixhawk)。 要避免IO 延迟，请禁用 [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO) 并将电机连接到 AUX 引脚。
- PWM output signal: enable One-Shot to reduce latency ([PWM_MAIN_RATE](../advanced_config/parameter_reference.md#PWM_MAIN_RATE)=0).

### Filter Tuning

Filters trade off control latency and noise filtering, both of which impact performance. For information see: [Filter/Control Latency Tuning](../config_mc/filter_tuning.md)

### PID 调整 (第二轮)

Now do a second round of PID tuning, this time as tight as possible, and also tuning the thrust curve.

:::tip
You can use the approach described in [Basic MC PID tuning](../config_mc/pid_tuning_guide_multicopter_basic.md) to tune the frame, but you will need to use the [Advanced Multicopter PID Tuning Guide (Advanced/Detailed)](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve) to understand how to tune the thrust curve.

### 飞行模式

After you have verified that the vehicle flies well at low and high throttle, you can enable [airmode](../config_mc/pid_tuning_guide_multicopter.md#airmode) with the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter. This feature makes sure that the vehicle is still controllable and tracks the rate at low throttle.

Happy flipping :)