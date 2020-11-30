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

## PID 性能跟踪

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

> **Note** 您需要启用高速日志记录配置文件 ([SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)) 才能看到此图形。

此图显示了基于执行器控制信号 (速率控制器的 PID 输出) 的横滚、俯仰和偏航轴的频率图。 它有助于识别频率峰值和配置软件过滤器。 在最低端 (低于20赫兹) 时应该只有一个峰值, 其余的应该是低和平的。

请注意, 不同车辆的 y 轴缩放是不同的, 但同一车辆的日志可以直接相互比较。

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 框架 (极好的振动)。

![低振动 QAV-R 5 Racer - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

> **Note**，上述卓越机型的振动特性意味着我们可以大大提高[软件过滤器](../config_mc/racer_setup.md#filters)的截止频率 (减少控制延迟) 。

DJI F450 框架 (良好振动)。

![低振动 DJI F450 - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

S500 框架：

![低振动S500启动器控制 - FFFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

> **Note** 虽然上面的图看起来不错，但[同一次飞行的原始加速度图](#raw_acc_s500)显示，x 和 y 的振动水平有点高。 这是一个很好的例子，说明为什么值得对比几个图！

#### 例子：不好的振动

这个例子显示了频率峰值接近 50 Hz (这是由于“松动”起落架引起的情况)。

![在着陆设备中振动 - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_actuator_controls_fft.png)

### 加速度功率谱密度

这是一个二的维频率图，显示原始加速度计数据随时间的频率响应 (它显示 x、y 和 z 轴的和) 。 面积越黄，此时的频率响应和频率就越高。

理想的情况是，只有少数赫兹的最低部分是黄色，其余部分大多为绿色或蓝色。

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 框架 (极好的振动)。

![低振动 QAV-R 5 Racer - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png) <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

DJI F450 框架 (良好振动)。 ![低振动DJI F450 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

> **注意** 您可以在大约 100 Hz 上看到双向旋转频率。

S500 框架： ![振动 S500 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)

#### 例子：不好的振动

100Hz 左右的强黄线表明了一个潜在的问题，需要进一步研究 (首先查看其他图表)。

![光谱密度图中的高振动](../../assets/flight_log_analysis/flight_review/vibrations_too_high_spectral.png)

这个例子显示了频率峰值接近 50 Hz (这是由于起落架“松动“”引起的情况)。

> **Tip** 这可能是一个问题，因为它是一个与车辆动力学强相关的低频信息。 由于默认过滤器设置，50 到 80 Hz 的振动将不会被过滤。

![在着陆设备中振动 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_spectral.png)

非常高（不安全）振动！ 注意图表几乎完全黄色。

> **警告** 如此高的振动下不能飞行。

![光谱密度图中的高振动](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_spectral.png)

### 原始加速度

此图展示了x、y 和 z 轴的原加速计测量。 理想情况下，每条线都很细，能清楚地显示车辆的加速度。

根据经验，如果 z 轴图形在悬停或低速飞行时接触 x/y轴 图形，则振动水平太高。

> **Tip** 使用此图的最佳方法是将图像放大一点，使其显示飞行器悬停的部分。

#### 例子：良好的振动

[QAV-R 5" Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 框架 (极好的振动)。

![低振动 QAV-R 5 Racer - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

DJI F450 框架 (良好振动)。 ![低振动 DJI F450 - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)

<!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

#### 例子：不好的振动

<span id="raw_acc_s500"></span>
S500 框架： x 和 y 轴的边界振动水平有点高 (这是典型的S500机身)。 这是它开始对飞行性能产生负面影响的极限。

![Borderline 振动 S500 x, y - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)

振动太高。 注意 z 轴与 x/y 轴重叠的图形：

![在着陆设备中振动 - FFT 绘图. 绘图](../../assets/flight_log_analysis/flight_review/vibrations_landing_gear_accel.png)

振动太高。 注意 z 轴与 x/y 轴重叠的图形：

![初始加速度震动大 绘图](../../assets/flight_log_analysis/flight_review/vibrations_too_high_accel.png)

高度（不安全）振动。

> **警告** 如此高的振动下不能飞行。

![初始加速度振动极高 绘图](../../assets/flight_log_analysis/flight_review/vibrations_exceedingly_high_accel.png)

<span id="fifo_logging"></span>

### Raw High-rate IMU Data Plots

For an in-depth analysis there is an option to log the raw IMU data at full rate (several kHz, depending on the IMU). This allows inspection of much higher frequencies than with normal logging, which can help when selecting vibration mounts or configuring low-pass and notch filters appropriately.

To use it, some parameters need to be changed:

- Set [IMU_GYRO_RATEMAX](../advanced_config/parameter_reference.md#IMU_GYRO_RATEMAX) to 400. This ensures that the raw sensor data is is more efficiently packed when sent from the sensor to the rest of the system, and reduces the log size (without reducing useful data). <!-- Explanation in https://github.com/PX4/px4_user_guide/pull/751/files#r440509688
  Data is sent in a fixed size array that will largely empty if sent at higher rate. The "empty data" is also logged.-->

- Use a good SD card, as the IMU data requires a high logging bandwidth (Flight Review will show dropouts if the logging rate gets too high).
    
    > **Tip** See [Logging > SD Cards](../dev_log/logging.md#sd-cards) for a comparison of popular SD card.

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

*执行器输出*图显示发送到各个执行器 (电机/伺服) 的信号。 一般来说，它在最小和最大配置 PWM 值之间(例如，从 1000 到 2000)。

这是一个四旋翼的例子，一切正常 (所有信号都在范围内，近似重叠，没有太大的噪声): ![好的制动器输出](../../assets/flight_log_analysis/flight_review/actuator_outputs_good.png)

这个图可以帮助识别不同的问题:

- 如果一个或多个信号在较长时间内处于最大值，则意味着控制器运行到**饱和**。 这并不一定是一个问题，例如在全速飞行时，这是意料之中的。 但如果它发生了，例如在一次任务中，这是一个信号，表明飞行器超重，无法提供足够的推力。
- 对于多机来说，如果飞行器**不平衡**，这张图可以很好地显示。 它在图中显示，一个或多个相邻的电机 (一个四旋翼的情况下是两个) 平均需要以更高的推力运行。 请注意，如果某些电机提供的推力大于其他电机，或者 ESCs 没有经过校准，也可能出现这种情况。 一个不平衡的车辆通常不是一个大问题，因为自动驾驶仪将自动解释它。 然而，它减少了最大的可实现的推力，并会给一些电机带来更大的压力，因此，飞机最好是平衡的。
- 不平衡也有可能来自偏航的轴心。 这图与前一种情况类似，但是相反的电机将分别运行得更高或更低。 原因可能是一个或多个电机倾斜。
    
    这是一个六轴电机的例子：电机 1、3 和 6 运行的推力更高： ![十六进制致动器输出不平衡](../../assets/flight_log_analysis/flight_review/actuator_outputs_hex_imbalanced.png) <!-- https://logs.px4.io/plot_app?log=9eca6934-b657-4976-a32f-b2e56535f05f -->

- 如果信号看起来非常**嘈杂** (具有高振幅) ，它可能有两个原因: 传感器噪声或通过控制器的振动 (这在其他图中也显示出来，见上一节) 或 PID 增益过高。 这是一个极端的例子： ![嘈杂的致动器输出 - 极端情况](../../assets/flight_log_analysis/flight_review/actuator_outputs_noisy.png)

## GPS 不确定性

*GPS 不确定性* 图显示 GPS 设备信息:

- 使用卫星的数目 (应大约或多余 12 个)
- 水平位置精确度（应小于 1 米）
- 垂直位置精确度 (应小于 2 米)
- GPS fix: this is 3 for a 3D GPS fix, 4 for GPS + Dead Reckoning, 5 for RTK float and 6 for RTK fixed type

## GPS 噪声和干扰

GPS 噪声与放大器干扰图是检测 GPS 信号干扰和干扰的有效手段。 GPS 信号非常弱，因此很容易被 (通过电缆) 发射或以 GPS 使用的频率辐射的组件干扰/拥塞。

> **Tip** USB 3 是[已知](https://www.intel.com/content/www/us/en/io/universal-serial-bus/usb3-frequency-interference-paper.html)的 GPS 干扰源。

**干扰指标** 应在 40 以下左右。 当约为 80 或者更高的值时，必须检查设置。 信号干扰也很明显，因为精度降低，卫星数量减少，直到无法进行 GPS 定位。

这是一个没有任何干扰的例子：

![GPS 干扰 - 好的绘图](../../assets/flight_log_analysis/flight_review/gps_jamming_good.png)

## 推力和磁场

*阈值和磁力字段* 图给出了磁传感器测量矢量的推力和范数。

在整个飞行过程中，标准应该是恒定的，与推力无关。 这是一个很好的例子，范数非常接近于常数： ![红色和磁力接近常量](../../assets/flight_log_analysis/flight_review/thrust_and_mag_good.png)

*如果相关*，这意味着电机(或其他用户) 所吸引的电流正在影响磁场。 必须避免这种情况，因为这会导致不正确的偏航估计。 下图显示了推力与磁强计范数之间的强相关性: ![相关推力和重力](../../assets/flight_log_analysis/flight_review/thrust_and_mag_correlated.png)

解决办法是：

- 使用外部磁强计 (避免使用内部磁强计)
- 如果使用外部磁强计，将其移到离强电流较远的地方(例如，使用 (较长的) GPS 天线)。

如果标准是不相关的，但不是恒定的，很可能它没有被正确校准。 然而，这也可能是由于外部动乱造成的（例如，在靠近金属结构时)。

这个例子表明范数不是常量，但它与推力无关: ![不相关推力和重力](../../assets/flight_log_analysis/flight_review/thrust_and_mag_uncorrelated_problem.png)

## 估计器看门狗

*估计或观察狗* 绘图显示了估计器的健康报告。 它应该是零常量。

如果没有问题，它应该是这样的: ![估计或观察员 - 良好](../../assets/flight_log_analysis/flight_review/estimator_watchdog_good.png)

如果其中一个标志是非零的，则估计器将检测到需要进一步研究的问题。 其中大多数时间是由传感器引起的问题，例如磁强计干扰。 它通常有助于观察相应传感器的图形。 <!-- TODO: separate page for estimator issues? -->

这里是一个包含磁强计问题的例子： ![带有磁强计问题的估计或监视器](../../assets/flight_log_analysis/flight_review/estimator_watchdog_mag_problem.png)

## 传感器数据的采样规律性

采样规律性图为测井系统和调度问题提供了深入的见解。

如果日志缓冲区太小，日志速度太高，或者使用低质量的 SD 卡，则**日志丢失**的数量会增加。

> **注意** 在中质量卡上预计会出现偶然丢帧。

**delta t** 表示两个记录 IMU 样本之间的时间差。 它应该接近 4 毫秒，因为数据发布率为 250Hz。 如果峰值是该值的倍数(并且估计器时间滑移不增加)，则意味着记录器跳过了一些样本。 有时会发生这种情况，因为日志程序以较低的优先级运行。 如果峰值不是多个，则表示传感器驱动程序调度不规律，需要进行研究。

由 **估计器时间戳** 可以看出在此时间之前，当前时间与集成传感器间隔时间的差异。 如果它改变了，这意味着要么估计器遗漏了传感器数据，要么驱动程序发布了不正确的集成间隔。 它应该保持在零，但它可以稍微增加飞行参数的变化，这通常不是一个问题。

这是一个很好的例子： ![采样规范良好](../../assets/flight_log_analysis/flight_review/sampling_regularity_good.png)

下面的例子中有太多的掉帧，这种情况下使用的 SD 卡质量太低了 (高质量 SD 卡的例子看[这里](../dev_log/logging.md#sd-cards)):

![太多丢帧](../../assets/flight_log_analysis/flight_review/sampling_regularity_many_drops.png)

## 日志报文

这是一个带有系统错误和预警信息的表格。 例如，当一个任务的堆栈大小变小时，它们就会显示出来。

需要单独审查这些信息，而不是所有这些信息都显示了一个问题。 例如，以下显示了安全开关的测试： ![日志和消息](../../assets/flight_log_analysis/flight_review/logged_messages.png)

## 飞行/帧 日志审查实例

在分析车辆状况时，通常值得查看多个飞行图表(不同的图表可以更好地突出某些问题)。 在审查可能的振动问题时，这一点尤其重要。

下一节按飞行/车辆将一些（以前提出的）图表分组。

### QAV-R 5" Racer

这些图表都来自同一架 [QAV-R 5"Racer](../frames_multicopter/qav_r_5_kiss_esc_racer.md) 的飞行。 <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

它们展示了一种振动很低的飞行器:

- 致动器控制 FFT 显示，只在结束部分有一个最低的峰值，剩下的地方都很低且平坦。
- 谱密度大多为绿色，低频率只有很小的黄色。
- 原始加速度的 z 轴轨迹与 x/y 轴轨迹很好地分离开了。

![低振动 QAV-R 5 Racer - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_actuator_controls_fft.png)

![低振动 QAV-R 5 Racer - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_spectral.png)

![低振动 QAV-R 5 Racer - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_good_accel.png)

### DJI F450

这些图表都来自同一架 *DJI F450* 的飞行。 <!-- https://logs.px4.io/plot_app?log=cd88b091-ec89-457c-85f6-e63e4fa0f51d -->

他们展示了一种低振动的车辆（但不像上面的 QAV-R 那么低！）

- 致动器控制FFT在最底层显示峰值。 其余的大部分是平的，除了在 100Hz 左右有一个凸起 (这是螺旋桨的叶片通过频率) 。
- 光谱密度大多为绿色。 叶片通过频率再次可见。
- 原始加速度的 z 轴轨迹与 x/y 轴轨迹很好地分离开了。

![低振动 DJI F450 - FFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_actuator_controls_fft.png)

![低振动DJI F450 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_spectral.png)

![低振动 DJI F450 - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_f450_accel.png)

### S500

这些图表都来自同一架 S500 的飞行。

它们显示这些飞机的边界振动可以接受：

- 致动器控制FFT在最底层显示峰值。 其余大部分都是平的，除了在 100Hz 左右有一个突起。
- 光谱密度大多为绿色，但比DJI F450 在 100Hz 时更黄。
- 原始加速度的 z 轴轨迹与 x/y 轴轨迹非常接近。 这是它开始对飞行性能产生负面影响的极限。

![低振动S500启动器控制 - FFFT 绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_actuator_controls_fft.png)

![振动 S500 - 光谱密度绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_spectral.png)

![Borderline 振动 S500 x, y - 原始加速。 绘图](../../assets/flight_log_analysis/flight_review/vibrations_s500_accel.png)