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
- 返航模式将可以使用，可以使用开关触发，或者是遥控器信号丢失或者低电量保护逻辑触发。
- 当发生事故时，你将有飞机最后的位置，方便寻找飞机。
- 飞行记录将包含飞行路线追踪，这意味着你可以进行航行回顾（3D 模式）。 这可以帮助你改善特技飞行技巧。

:::note
在有挑战性的特技精巧操作中，GPS会在短时间内失效。 如果您在此期间切换到位置模式，高度模式将被使用，直到位置再次生效。
:::

## 硬件安装

以下各段叙述了在构建穿越机时的几个重要问题。 如果你需要完整的构建指南，你可以参考 [QAV-R 5"KISS ESC Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 构建日志。

### 振动设置

有各种安装方法来减少振动。 例如，飞行控制器可以安装震动抑制泡沫，或者使用 [O-圆环](../frames_multicopter/qav_r_5_kiss_esc_racer.md#mounting)。

虽然没有单一最好的方法，但如果您使用高质量的组件，您会遇到更少的振动问题。 例如在 [QAV-R 5" 中使用的 KISS ESC 穿越机](../frames_multicopter/qav_r_5_kiss_esc_racer.md)。

确保使用 **均衡props**。

### Center of Gravity

Make sure that the center of gravity is as close as possible to the center of thrust. Left-right balance is usually not a problem, but front-back balance may be. You can move the battery until it is correct and mark it on the frame so you will always place it correctly.

:::note
The integral term can account for an imbalanced setup, and a custom mixer can do that even better. However it is best to fix any imbalance as part of the vehicle setup.
:::

### Motor Ordering

If you plan to use a 4-in-1 ESC, such as the [Hobbywing XRotor Micro 40A 4in1](http://www.hobbywing.com/goods.php?id=588), you will notice that it uses a motor ordering that is different from the one that PX4 uses. PX4 allows you to change the motor ordering in software via [MOT_ORDERING](../advanced_config/parameter_reference.md#MOT_ORDERING) parameter. You can select the Betaflight/Cleanflight motor ordering that is typically used on these 4-in-1 ESCs.

## 软件设置

After having built the racer, you will need to configure the software. Go through the [Basic Configuration Guide](../config/README.md) and choose the [Generic 250 Racer](../airframes/airframe_reference.md#copter_quadrotor_x_generic_250_racer) airframe, which already sets some racer-specific parameters.

These parameters are important:

- Enable One-Shot by setting [PWM_RATE](../advanced_config/parameter_reference.md#PWM_RATE) to 0.
- Set the maximum roll-, pitch- and yaw rates for Manual/Stabilized mode as desired: [MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX), [MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX) and [MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX). The maximum tilt angle is configured with [MPC_MAN_TILT_MAX](../advanced_config/parameter_reference.md#MPC_MAN_TILT_MAX).
- The minimum thrust [MPC_MANTHR_MIN](../advanced_config/parameter_reference.md#MPC_MANTHR_MIN) should be set to 0.
- Disable RC input filtering by setting [RC_FLT_CUTOFF](../advanced_config/parameter_reference.md#RC_FLT_CUTOFF) to 0.

### 估计器

If you use a GPS you can skip this section and use the default estimator. Otherwise you should switch to the Q attitude estimator, which works without a magnetometer or barometer.

To select it, set [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to 1, and change the following parameters:

- Set [SYS_HAS_MAG](../advanced_config/parameter_reference.md#SYS_HAS_MAG) to 0 if the system does not have a magnetometer.
- Set [SYS_HAS_BARO](../advanced_config/parameter_reference.md#SYS_HAS_BARO) to 0 if the system does not have a barometer.
- Configure the Q estimator: set [ATT_ACC_COMP](../advanced_config/parameter_reference.md#ATT_ACC_COMP) to 0, [ATT_W_ACC](../advanced_config/parameter_reference.md#ATT_W_ACC) to 0.4 and [ATT_W_GYRO_BIAS](../advanced_config/parameter_reference.md#ATT_W_GYRO_BIAS) to 0. You can tune these later if you wish.

### Failsafe

Configure [RC loss and low battery failsafe](../config/safety.md). If you do not use a GPS, set the failsafe to **Lockdown**, which turns off the motors. Test RC loss on the bench without props attached by turning off the remote when the vehicle is armed.

Make sure to assign a [kill switch](../config/safety.md#kill_switch) or an [arming switch](../config/safety.md#arming_switch). Test it and train to use it!

### PID Tuning

:::note
Make sure to calibrate the ESCs before doing any tuning.
:::

At this point you should be ready for a first test flight.

If it goes well, do a first pass of [PID tuning](../config_mc/pid_tuning_guide_multicopter.md) (ignore the thrust curve settings). The vehicle needs to be **undertuned**, meaning the **P** and **D** gains should be set too low - such that there are no oscillations from the controller that could be interpreted as noise (the default gains might be good enough). This is important for the [filter](#filters) tuning. There will be a second PID tuning round later.

<span id="control_latency"></span>

### Control Latency

The *control latency* is the delay from a physical disturbance of the vehicle until the motors react to the change.

:::tip
It is *crucial* to reduce the control latency as much as possible — a lower latency allows you to increase the rate **P** gains, which means better flight performance. Even one millisecond added to the latency makes a difference.
:::

These are the factors that affect the latency:

- A soft airframe or soft vibration mounting increases latency (they act as a filter).
- Low-pass filters in software and on the sensor chip trade off increased latency for improved noise filtering.
- PX4 software internals: the sensor signals need to be read in the driver and then pass through the controller to the output driver.
- The IO chip (MAIN pins) adds about 5.4 ms latency compared to using the AUX pins (this does not apply to a *Pixracer* or *Omnibus F4*, but does apply to a Pixhawk). To avoid the IO delay, disable [SYS_USE_IO](../advanced_config/parameter_reference.md#SYS_USE_IO) and attach the motors to the AUX pins instead.
- PWM output signal: enable One-Shot to reduce latency ([PWM_RATE](../advanced_config/parameter_reference.md#PWM_RATE)=0) 

<span id="filters"></span>

### Filters

<!-- TODO: this probably should be documented somewhere else --> As mentioned in the previous section, filters affect the control latency.

This is the filtering pipeline for the controllers in PX4:

- On-chip DLPF for the gyro sensor. The cutoff frequency is set to 98Hz and it is sampled at 1kHz.
- Low-pass filter on the gyro sensor data. It can be configured with the [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) parameter.
- A separate low-pass filter on the D-term. The D-term is most susceptible to noise while slightly increased latency does not negatively affect performance. For this reason the D-term has a separately-configurable low-pass filter, [IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF).
- A slewrate filter on the motor outputs ([MOT_SLEW_MAX](../advanced_config/parameter_reference.md#MOT_SLEW_MAX)). Generally not used.

To reduce the control latency, we want to increase the cutoff frequency for the low-pass filters. However this is a trade-off as it will also increase the noise of the signal, which is fed to the motors. Noise on the motors has the following consequences:

- Motors and ESCs can get hot, to the point where they get damaged.
- Reduced flight time because the motors continuously change their speed.
- Visible random small twitches.

The best filter settings depend on the vehicle. The defaults are set conservatively — such that they work on lower-quality setups as well.

#### Filter Tuning

First make sure to have the high-rate logging profile activated ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) parameter). [Flight Review](../getting_started/flight_reporting.md) will then show an FFT plot for the roll, pitch and yaw controls.

:::warning
Do not try to fix a vehicle that suffers from high vibrations with filter tuning. Instead fix the vehicle hardware setup.
:::

Filter tuning is best done by reviewing flight logs. You can do multiple flights right after each other with different parameters and then inspect all logs, but make sure to disarm in between so that separate log files are created.

The performed flight maneuver can simply be hovering in [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md) with some rolling and pitching to all directions and some increased throttle periods. The total duration does not need to be more than 30 seconds. In order to better compare, the maneuver should be similar in all tests.

First tune the gyro filter [IMU_GYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_GYRO_CUTOFF) by increasing it in steps of 10 Hz while using a low D-term filter value ([IMU_DGYRO_CUTOFF](../advanced_config/parameter_reference.md#IMU_DGYRO_CUTOFF) = 30).  
Upload the logs to https://logs.px4.io and compare the *Actuator Controls FFT* plot. Set the cutoff frequency to a value before the noise starts to increase noticeably (for frequencies around and above 60 Hz). Then tune the D-term filter (`IMU_DGYRO_CUTOFF`) in the same way.

Below is an example for three different filter values (40Hz, 70Hz, 90Hz). At 90 Hz the general noise level starts to increase (especially for roll), and thus a cutoff frequency of 70 Hz is a safe setting. ![IMU_DGYRO_CUTOFF=40](../../assets/airframes/multicopter/racer_setup/actuator_controls_fft_dgyrocutoff_40.png) ![IMU_DGYRO_CUTOFF=70](../../assets/airframes/multicopter/racer_setup/actuator_controls_fft_dgyrocutoff_70.png) ![IMU_DGYRO_CUTOFF=90](../../assets/airframes/multicopter/racer_setup/actuator_controls_fft_dgyrocutoff_90.png)

:::note
The plot cannot be compared between different vehicles, as the y axis scale can be different. On the same vehicle it is consistent and independent of the flight duration though.
:::

### PID Tuning (Second Round)

Now do a second round of PID tuning, this time as tight as possible, and also tune the thrust curve.

### Airmode

After you have verified that the vehicle flies well at low and high throttle, you can enable [airmode](../config_mc/pid_tuning_guide_multicopter.md#airmode) with the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter. This feature makes sure that the vehicle is still controllable and tracks the rate at low throttle.

Happy flipping :)