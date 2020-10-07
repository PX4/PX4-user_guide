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

<span id="tracking"></span>

## PID Tracking Performance

Depending on the flight mode, the vehicle controllers may attempt to track position, velocity, altitude or rate setpoints (the tracked setpoints depend on the mode, e.g.: in Stabilized mode there is no velocity setpoint).

The **Estimated** line (red) should closely match with the **Setpoint** (green). If they do not, in most cases the PID gains of that controller need to be tuned.

The [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) contains example plots and information about analysing tracking performance.

> **Tip** 特别是对于速率控制器, 启用高速日志记录配置文件 ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)) 在缩放时获取更多详细信息是很有用的。

## 振动

Vibration is one of the most common problems for multirotor vehicles. High vibration levels can lead to:

- 飞行效率低, 飞行时间缩短
- 电机温度升高
- 增加材料磨损
- 无法严格调整车辆，导致飞行性能下降。
- 传感器接线
- 位置估计失败，可能偏离飞行。

It is therefore important to keep an eye on the vibration levels and improve the setup if needed.

There is a point where vibration levels are clearly too high, and generally lower vibration levels are better. However there is a broad range between 'everything is ok' and 'the levels are too high'. This range depends on a number of factors, including vehicle size - as larger vehicles have higher inertia, allowing for more software filtering (at the same time the vibrations on larger vehicles are of lower frequency).

The following paragraphs and sections provide information about what plots to use for checking vibration levels, and how to analyse them.

> **Tip** 在分析振动时, 值得查看多个图表 (不同的图表可以更好地突出显示一些问题)。

### FFT 制动器控制

> **Note** 您需要启用高速日志记录配置文件 ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)) 才能看到此图形。

This graph shows a frequency plot for the roll, pitch and yaw axis based on the actuator controls signal (the PID output from the rate controller). It helps to identify frequency peaks and configuring the software filters. There should only be a single peak at the lowest end (below around 20 Hz), the rest should be low and flat.

Note that the y-axis scaling is different for different vehicles, but logs from the same vehicle can be directly compared to each other.

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) frame (excellent vibration).

![Low vibration QAV-R 5 Racer - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

> **Note**，上述卓越机型的振动特性意味着我们可以大大提高[软件过滤器](../config_mc/racer_setup.md#filters)的截止频率 (减少控制延迟) 。

DJI F450 frame (good vibration).

![Low vibration DJI F450 - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

S500 frame:

![Low vibration S500 actuator controls - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

> **Note** 虽然上面的图看起来不错，但[同一次飞行的原始加速度图](#raw_acc_s500)显示，x 和 y 的振动水平有点高。 这是一个很好的例子，说明为什么值得对比几个图！

#### 例子：不好的振动

This example shows a peak in frequency close to 50 Hz (in this case due to "loose" landing gear).

![Vibrations in landing gear - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_actuator_controls_fft.png)

### 加速度功率谱密度

This is a 2D frequency plot showing the frequency response of the raw accelerometer data over time (it displays the sum for the x, y and z axis). The more yellow an area is, the higher the frequency response at that time and frequency.

Ideally only the lowest part up to a few Hz is yellow, and the rest is mostly green or blue.

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) frame (excellent vibration).

![Low vibration QAV-R 5 Racer - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png) <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

DJI F450 frame (good vibration). ![Low vibration DJI F450 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

> **注意** 您可以在大约 100 Hz 上看到双向旋转频率。

S500 frame: ![Vibration S500 - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)

#### 例子：不好的振动

The strong yellow lines at around 100Hz indicate a potential issue that requires further investigation (starting with a review of the other charts).

![High vibration in spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_too_high_spectral.png)

This plot below shows a peak in frequency close to 50 Hz (in this case due to "loose" landing gear).

> **Tip** 这可能是一个问题，因为它是一个与车辆动力学强相关的低频信息。 由于默认过滤器设置，50 到 80 Hz 的振动将不会被过滤。

![Vibrations in landing gear - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_spectral.png)

Extremely high (unsafe) vibration! Note that the graph is almost completely yellow.

> **警告** 如此高的振动下不能飞行。

![Exceedingly high vibration in spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_spectral.png)

### 原始加速度

This graph shows the raw accelerometer measurements for the x, y and z axis. Ideally each line is thin and clearly shows the vehicle's accelerations.

As a rule of thumb if the z-axis graph is touching the x/y-axis graph during hover or slow flight, the vibration levels are too high.

> **Tip** 使用此图的最佳方法是将图像放大一点，使其显示飞行器悬停的部分。

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) frame (excellent vibration).

![Low vibration QAV-R 5 Racer - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

DJI F450 frame (good vibration). ![Low vibration DJI F450 - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)

<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

#### 例子：不好的振动

<span id="raw_acc_s500"></span>
S500 frame. Borderline vibration levels - a bit high for x and y (which is typical for an S500 airframe). This is at the limit where it starts to negatively affect flight performance.

![Borderline vibration S500 x, y - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)

Vibration too high. Note how the graph of the z-axis overlaps with the x/y-axis graph:

![Vibrations in landing gear - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_accel.png)

Vibration levels are too high. Note how the graph of the z-axis overlaps with the x/y-axis graph:

![High vibration in raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_too_high_accel.png)

Very high (unsafe) vibration levels.

> **警告** 如此高的振动下不能飞行。

![Exceedingly high vibration in raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_accel.png)

<span id="fifo_logging"></span>

### Raw High-rate IMU Data Plots

For an in-depth analysis there is an option to log the raw IMU data at full rate (several kHz, depending on the IMU). This allows inspection of much higher frequencies than with normal logging, which can help when selecting vibration mounts or configuring low-pass and notch filters appropriately.

To use it, some parameters need to be changed:

- Set [IMU_GYRO_RATEMAX](../advanced_config/parameter_reference.md#IMU_GYRO_RATEMAX) to 400. This ensures that the raw sensor data is is more efficiently packed when sent from the sensor to the rest of the system, and reduces the log size (without reducing useful data). <!-- Explanation in https://github.com/PX4/px4_user_guide/pull/751/files#r440509688
  Data is sent in a fixed size array that will largely empty if sent at higher rate. The "empty data" is also logged.-->

- Use a good SD card, as the IMU data requires a high logging bandwidth (Flight Review will show dropouts if the logging rate gets too high).
    
    > **Tip** See [Logging > SD Cards](https://dev.px4.io/master/en/log/logging.html#sd-cards) for a comparison of popular SD card.

- Enable either the gyro or accel high-rate FIFO profile in [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) and disable the rest of the entries. If you are using a really good SD card (seeing few/no dropouts), you can: 
    - either enable both accel and gyro profiles
    - or enable accel/gyro plus the default logging profile

Example plot:

![high-rate accel power spectral density](../../assets/flight_log_analysis/flight_review/accel_spectral_density_fifo.png)

> **Note** Data of the first IMU is logged, which is not necessarily the same as the one used for flying. This is mostly only important in cases where IMU's are mounted differently (e.g. hard-mounted vs. soft-mounted).

<span></span>

> **Note** Do not forget to restore the parameters after testing.

<span id="solutions"></span>

### Fixing Vibration Problems

Often a source of vibration (or combination of multiple sources) cannot be identified from logs alone.

In this case the vehicle should be inspected. [Vibration Isolation](../assembly/vibration_isolation.md) explains some basic things you can check (and do) to reduce vibration levels.

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
- GPS fix: this is 3 for a 3D GPS fix, 4 for GPS + Dead Reckoning, 5 for RTK float and 6 for RTK fixed type

## GPS 噪声和干扰

The GPS Noise & Jamming plot is useful to check for GPS signal interferences and jamming. The GPS signal is very weak and thus it can easily be disturbed/jammed by components transmitting (via cable) or radiating in a frequency used by the GPS.

> **Tip** USB 3 is [known to be](https://www.intel.com/content/www/us/en/io/universal-serial-bus/usb3-frequency-interference-paper.html) an effective GPS jamming source.

The **jamming indicator** should be around or below 40. Values around 80 or higher are too high and the setup must be inspected. Signal interference is also noticeable as reduced accuracy and lower number of satellites up to the point where no GPS fix is possible.

This is an example without any interference:

![GPS jamming - good plot](../../assets/flight_log_analysis/flight_review/gps_jamming_good.png)

## 推力和磁场

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

## 飞行/帧 日志审查实例

It is often worth looking at multiple charts for a particular flight when analyzing vehicle condition (different charts can better highlight some issues). This is particularly important when reviewing for possible vibration problems.

The section below groups a few (previously presented) charts by flight/vehicle.

### QAV-R 5" Racer

These charts are all from the same flight of a [QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md). <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

They show a vehicle that has very low vibration:

- Actuator Controls FFT shows only a single peak at the lowest end, with the rest low and flat.
- Spectral density is mostly green, with only a little yellow at the low frequencies.
- 原始加速度的 z 轴轨迹与 x/y 轴轨迹很好地分离开了。

![Low vibration QAV-R 5 Racer - FFT plot](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

![Low vibration QAV-R 5 Racer - spectral density plot](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png)

![Low vibration QAV-R 5 Racer - raw accel. plot](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

### DJI F450

These charts are all from the same flight of a *DJI F450*. <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

They show a vehicle that has low vibration (but not as low as the QAV-R above!):

- 致动器控制FFT在最底层显示峰值。 Most of the rest is flat, except for a bump at around 100Hz (this is the blade passing frequency of the propellers).
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