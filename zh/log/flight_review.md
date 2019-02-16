# 使用 Flight Review 进行日志分析

[飞行复查](http://logs.px4.io)可以绘制图表来分析一般的车辆状况。

这些图是不言自明的，但是需要一些经验来了解哪些范围是可以接受的，以及一个图应该是什么样的。 本页介绍如何解释这些情节并识别常见问题。

## 一般用法

许多图形共有的功能:

- 绘图背景色用于指示录制过程中的飞行模式 (其中图形取决于模式): ![飞行模式](../../assets/flight_log_analysis/flight_review/flight_modes.png) 
    - **飞行模式：** 绘图主体背景颜色显示飞行模式。 将鼠标悬停在绘图上将显示飞行模式标签。
    - **VTOL 飞行模式 ：**VTOL 车辆还在图的底部显示 VTOL 模式为背景颜色 (多旋翼为蓝色, 固定翼为黄色, 过渡为红色)。
- 鼠标在特定的绘图轴上滚动可缩放该轴 (水平或垂直)。
- 鼠标在图形内滚动可缩放两个轴。

## PID 性能跟踪 {#tracking}

根据飞行模式, 车辆控制器可能会尝试跟踪位置、速度、高度或速率设定值 (跟踪的设定值取决于模式, 例如: 在稳定模式下没有速度设定值)。

**估计**线 (红色) 应与 **设定**线 (绿色) 密切匹配。 如果没有，在大多数情况下，需要调整该控制器的 PID 增益。

[多轴 PID 调优指南](../config_mc/pid_tuning_guide_multicopter.md)包含示例图和有关分析跟踪性能的信息。

> **Tip** 特别是对于速率控制器, 启用高速日志记录配置文件 ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)) 在缩放时获取更多详细信息是很有用的。

## 振动

振动是多旋翼飞机中最常见的问题之一。 高振动可能导致：

- 飞行效率低, 飞行时间缩短
- 电机温度升高
- 增加材料磨损
- 无法严格调整车辆，导致飞行性能下降。
- 传感器接线
- 位置估计失败，可能偏离飞行。

因此，必须对振动水平保持警惕，并在必要时改进设置。

有一个时刻的振动明显过高，但是总体而言震动小更好。 然而在 "一切都好" 和 "水平太高" 之间有很大的差距。 这个范围取决于许多因素, 包括车辆的大小 - 因为较大的车辆有更高的惯性, 允许更多的软件过滤 (同时较大的车辆上的振动是较低的频率)。

下面的段落和部分提供了关于使用什么图来检查振动水平以及如何分析它们的信息。

> **Tip** 在分析振动时, 值得查看多个图表 (不同的图表可以更好地突出显示一些问题)。

### FFT 制动器控制

> **Note** You need to enable the high-rate logging profile ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)) to see this plot.

This graph shows a frequency plot for the roll, pitch and yaw axis based on the actuator controls signal (the PID output from the rate controller). It helps to identify frequency peaks and configuring the software filters. There should only be a single peak at the lowest end (below around 20 Hz), the rest should be low and flat.

Note that the y-axis scaling is different for different vehicles, but logs from the same vehicle can be directly compared to each other.

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) frame (excellent vibration).

![低振动 QAV-R 5 Racer - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

> **Note** The excellent vibration characteristics of the above frame mean that we can considerably increase the cutoff frequency of the [software filters](../config_mc/racer_setup.md#filters) (reducing control latency).

DJI F450 frame (good vibration).

![低振动 DJI F450 - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

S500 frame:

![低振动S500启动器控制 - FFFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

> **Note** While the plot above looks good, the [Raw Acceleration graph for the same flight](#raw_acc_s500) shows that the vibration levels are a bit high for x and y. This is a good example of why it is worth checking several graphs!

#### 例子：不好的振动

This example shows a peak in frequency close to 50 Hz (in this case due to "loose" landing gear).

![在着陆设备中振动 - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_actuator_controls_fft.png)

### 加速度功率谱密度

This is a 2D frequency plot showing the frequency response of the raw accelerometer data over time (it displays the sum for the x, y and z axis). The more yellow an area is, the higher the frequency response at that time and frequency.

Ideally only the lowest part up to a few Hz is yellow, and the rest is mostly green or blue.

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) frame (excellent vibration).

![低振动 QAV-R 5 Racer - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png) <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

DJI F450 frame (good vibration). ![低振动DJI F450 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

> **Note** Above you can see the blade passing frequency of the propellers at around 100 Hz.

S500 frame: ![低振动DJI F500 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)

#### 例子：不好的振动

The strong yellow lines at around 100Hz indicate a potential issue that requires further investigation (starting with a review of the other charts).

![光谱密度图中的高振动](../../assets/flight_log_analysis/flight_review/vibrations_too_high_spectral.png)

This plot below shows a peak in frequency close to 50 Hz (in this case due to "loose" landing gear).

> **Tip** This indicates a possible problem because it is a strong single low frequency that is close to the vehicle dynamics. With the default filter settings of 80 Hz vibrations at 50 Hz will not be filtered.

![在着陆设备中振动 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_spectral.png)

Extremely high (unsafe) vibration! Note that the graph is almost completely yellow.

> **Warning** You should not fly with such high vibration levels.

![光谱密度图中的高振动](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_spectral.png)

### 原始加速度

This graph shows the raw accelerometer measurements for the x, y and z axis. Ideally each line is thin and clearly shows the vehicle's accelerations.

As a rule of thumb if the z-axis graph is touching the x/y-axis graph during hover or slow flight, the vibration levels are too high.

> **Tip** The best way to use this graph is to zoom in a bit to a part where the vehicle is hovering.

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) frame (excellent vibration).

![低振动 QAV-R 5 Racer - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

DJI F450 frame (good vibration). ![低振动 DJI F450 - FFT 绘图. 绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)

<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

#### 例子：不好的振动

<span id="raw_acc_s500"></span>
S500 frame. Borderline vibration levels - a bit high for x and y (which is typical for an S500 airframe). This is at the limit where it starts to negatively affect flight performance.

![Borderline 振动 S500 x, y - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)

Vibration too high. Note how the graph of the z-axis overlaps with the x/y-axis graph:

![在着陆设备中振动 - FFT 绘图. 绘图](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_accel.png)

Vibration levels are too high. Note how the graph of the z-axis overlaps with the x/y-axis graph:

![初始加速度震动大 绘图](../../assets/flight_log_analysis/flight_review/vibrations_too_high_accel.png)

Very high (unsafe) vibration levels.

> **Warning** You should not fly with such high vibration levels.

![Exceedingly high vibration in raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_accel.png)

### 解决方案

Often a source of vibration cannot be identified from a log alone and the vehicle needs to be inspected. There can be a combination of multiple sources.

Solutions and steps to reduce vibrations include:

- Make sure everything is firmly attached on the vehicle (landing gear, GPS mast, etc.)
- Use balanced propellers.
- Make sure to use high-quality components for the propellers, motors, ESC and airframe. Each of these components can make a big difference.
- Use a vibration-isolation method to mount the autopilot.
- As a *last* measure, adjust the software filters (see [here](../config_mc/racer_setup.md#filters)). It is better to reduce the source of vibrations, rather than filtering them out in software.

<!-- TODO: write a separate vibration setup page in more depth, move some of this there and link to it from here -->

## 制动器输出

The *Actuator Outputs* graph shows the signals that are sent to the individual actuators (motors/servos). Generally it is in the range between the minimum and maximum configured PWM values (e.g. from 1000 to 2000).

This is an example for a quadrotor where everything is OK (all of the signals are within the range, approximately overlap each other, and are not too noisy): ![Good actuator outputs](../../assets/flight_log_analysis/flight_review/actuator_outputs_good.png)

The plot can help to identify different problems:

- If one or more of the signals is at the maximum over a longer time, it means the controller runs into **saturation**. It is not necessarily a problem, for example when flying at full throttle this is expected. But if it happens for example during a mission, it's an indication that the vehicle is overweight for the amount of thrust that it can provide.
- For a multicopter the plot can be a good indication if the vehicle is **imbalanced**. It shows in the plot that one or more neighboring motors (two in case of a quadrotor) need to run at higher thrust on average. Note that this can also be the case if some motors provide more thrust than others or the ESCs are not calibrated. An imbalanced vehicle is generally not a big problem as the autopilot will automatically account for it. However it reduces the maximum achievable thrust and puts more strain on some motors, so it is better to balance the vehicle.
- An imbalance can also come from the yaw axis. The plot will look similar as in the previous case, but opposite motors will run higher or lower respectively. The cause is likely that one or more motors are tilted.
    
    This is an example from a hexarotor: motors 1, 3 and 6 run at higher thrust: ![Hexrotor imbalanced actuator outputs](../../assets/flight_log_analysis/flight_review/actuator_outputs_hex_imbalanced.png) <!-- https://logs.px4.io/plot_app?log=9eca6934-b657-4976-a32f-b2e56535f05f -->

- If the signals look very **noisy** (with high amplitudes), it can have two causes: sensor noise or vibrations passing through the controller (this shows up in other plots as well, see previous section) or too high PID gains. This is an extreme example: ![Noisy actuator outputs - extreme case](../../assets/flight_log_analysis/flight_review/actuator_outputs_noisy.png)

## GPS 不确定性

The *GPS Uncertainty* plot shows information from the GPS device:

- Number of used satellites (should be around 12 or higher)
- Horizontal position accuracy (should be below 1 meter)
- Vertical position accuracy (should be below 2 meters)
- GPS fix: this is 3 for a 3D GPS fix, 5 for RTK float and 6 for RTK fixed type

## GPS 噪声和干扰

The GPS Noise & Jamming plot is useful to check for GPS signal interferences and jamming. The GPS signal is very weak and thus it can easily be disturbed/jammed by components transmitting (via cable) or radiating in a frequency used by the GPS.

> **Tip** USB 3 is known to be an effective GPS jamming source.

The **jamming indicator** should be around or below 40. Values around 80 or higher are too high and the setup must be inspected. Signal interference is also noticeable as reduced accuracy and lower number of satellites up to the point where no GPS fix is possible.

This is an example without any interference:

![GPS jamming - good plot](../../assets/flight_log_analysis/flight_review/gps_jamming_good.png)

## 推力和磁场字段

The *Thrust and Magnetic Field* plot shows the thrust and the norm of the magnetic sensor measurement vector.

The norm should be constant over the whole flight and uncorrelated with the thrust. This is a good example where the norm is very close to constant: ![Thrust and mag close to constant](../../assets/flight_log_analysis/flight_review/thrust_and_mag_good.png)

*If it is correlated*, it means that the current drawn by the motors (or other consumers) is influencing the magnetic field. This must be avoided as it leads to incorrect yaw estimation. The following plot shows a strong correlation between the thrust and the norm of the magnetometer: ![Correlated thrust and mag](../../assets/flight_log_analysis/flight_review/thrust_and_mag_correlated.png)

Solutions to this are:

- Use an external magnetometer (avoid using the internal magnetometer)
- If using an external magnetometer, move it further away from strong currents (i.e. by using a (longer) GPS mast).

If the norm is uncorrelated but not constant, most likely it is not properly calibrated. However it could also be due to external disturbances (for example when flying close to metal constructs).

This example shows that the norm is non-constant, but it does not correlate with the thrust: ![Uncorrelated thrust and mag](../../assets/flight_log_analysis/flight_review/thrust_and_mag_uncorrelated_problem.png)

## 估计器看门狗

The *Estimator Watchdog* plot shows the health report of the estimator. It should be constant zero.

This is what it should look like if there are no problems: ![Estimator watchdog - good](../../assets/flight_log_analysis/flight_review/estimator_watchdog_good.png)

If one of the flags is non-zero, the estimator detected a problem that needs to be further investigated. Most of the time it is an issue with a sensor, for example magnetometer interferences. It usually helps to look at the plots of the corresponding sensor. <!-- TODO: separate page for estimator issues? -->

Here is an example with magnetometer problems: ![Estimator watchdog with magnetometer problems](../../assets/flight_log_analysis/flight_review/estimator_watchdog_mag_problem.png)

## 传感器数据的采样规律性

The sampling regularity plot provides insights into problems with the logging system and scheduling.

The amount of **logging dropouts** start to increase if the log buffer is too small, the logging rate is too high or a low-quality SD card is used.

> **Note** Occasional dropouts can be expected on medium quality cards.

The **delta t** shows the time difference between two logged IMU samples. It should be close to 4 ms because the data publishing rate is 250Hz. If there are spikes that are a multiple of that (and the estimator time slip does not increase), it means the logger skipped some samples. Occasionally this can happen because the logger runs at lower priority. If there are spikes that are not a multiple, it indicates an irregular sensor driver scheduling, which needs to be investigated.

The **estimator timeslip** shows the difference between the current time and the time of the integrated sensor intervals up to that time. If it changes it means either the estimator missed sensor data or the driver publishes incorrect integration intervals. It should stay at zero, but it can increase slightly for in-flight parameter changes, which is generally not an issue.

This is a good example: ![Sampling regularity good](../../assets/flight_log_analysis/flight_review/sampling_regularity_good.png)

The following example contains too many dropouts, the quality of the used SD card was too low in that case (see [here](http://dev.px4.io/en/log/logging.html#sd-cards) for good SD cards):

![Many Dropouts](../../assets/flight_log_analysis/flight_review/sampling_regularity_many_drops.png)

## 日志报文

This is a table with system error and warning messages. For example they show when a task becomes low on stack size.

The messages need to be examined individually, and not all of them indicate a problem. For example the following shows a kill-switch test: ![Logged Messages](../../assets/flight_log_analysis/flight_review/logged_messages.png)

## Flight/Frame Log Review Examples

It is often worth looking at multiple charts for a particular flight when analyzing vehicle condition (different charts can better highlight some issues). This is particularly important when reviewing for possible vibration problems.

The section below groups a few (previously presented) charts by flight/vehicle.

### QAV-R 5" Racer

These charts are all from the same flight of a [QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md). <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

They show a vehicle that has very low vibration:

- Actuator Controls FFT shows only a single peak at the lowest end, with the rest low and flat.
- Spectral density is mostly green, with only a little yellow at the low frequencies.
- Raw Acceleration has z-axis trace well separated from the x/y-axis traces.

![Low vibration QAV-R 5 Racer - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

![Low vibration QAV-R 5 Racer - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png)

![Low vibration QAV-R 5 Racer - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

### DJI F450

These charts are all from the same flight of a *DJI F450*. <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

They show a vehicle that has low vibration (but not as low as the QAV-R above!):

- Actuator Controls FFT shows a peak at the lowest end. Most of the rest is flat, except for a bump at around 100Hz (this is the blade passing frequency of the propellers).
- Spectral density is mostly green. The blade passing frequency is again visible.
- Raw Acceleration has z-axis trace well separated from the x/y-axis traces.

![Low vibration DJI F450 - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

![Low vibration DJI F450 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

![Low vibration DJI F450 - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)

### S500

These charts are all from the same flight of an S500.

They show a vehicle that has borderline-acceptable vibration:

- Actuator Controls FFT shows a peak at the lowest end. Most of the rest is flat, except for a bump at around 100Hz.
- Spectral density is mostly green, but more yellow than for the DJI F450 at 100Hz.
- Raw Acceleration has z-axis trace fairly close to the x/y-axis traces. This is at the limit where it starts to negatively affect flight performance.

![Low vibration S500 actuator controls - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

![Vibration S500 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)

![Borderline vibration S500 x, y - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)