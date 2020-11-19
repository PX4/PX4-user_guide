# 使用 ECL EKF

本文主要回答使用 ECL EKF 算法的常见问题。

> **提示：** [PX4 状态估计概述](https://youtu.be/HkYRJJoyBwQ)视频， *PX4 开发者峰会 2019*， (Dr. Paul Riseborough) 对状态估计器进行了概述，并且还进一步介绍了2018/2019年以来的重大变化以及2020年期间计划的改进措施。

## What is the ecl EKF?

估计和控制库（ECL）使用扩展卡尔曼滤波算法（EKF）来处理传感器的测量信息，并提供如下状态量的估计值：

* Quaternion defining the rotation from North, East, Down local earth frame to X,Y,Z body frame
* Velocity at the IMU - North,East,Down \(m/s\)
* Position at the IMU - North,East,Down \(m\)
* IMU delta angle bias estimates - X,Y,Z \(rad\)
* IMU delta velocity bias estimates - X,Y,Z\(m/s\)
* Earth Magnetic field components - North,East,Down \(gauss\)
* Vehicle body frame magnetic field bias - X,Y,Z \(gauss\)
* Wind velocity - North,East \(m/s\)

EKF在延迟的“融合时程”下运行，从而适应不同传感器测量值相对IMU的时间延迟。 为了保证所有传感器数据都能在在正确的时间内使用，每个传感器的数据都是按照先入先出（FIFO）队列进行缓存，并由EKF从缓存区中读取。 The delay compensation for each sensor is controlled by the [EKF2_*_DELAY](../advanced/parameter_reference.md#ekf2) parameters.

互补滤波器根据缓冲的 IMU 数据将状态变量从“融合时程”向前传播到当前时间。 The time constant for this filter is controlled by the [EKF2_TAU_VEL](../advanced/parameter_reference.md#EKF2_TAU_VEL) and [EKF2_TAU_POS](../advanced/parameter_reference.md#EKF2_TAU_POS) parameters.

> **Note** The 'fusion time horizon' delay and length of the buffers is determined by the largest of the EKF2\_\*\_DELAY parameters. 如果并未使用某个传感器，建议将其对应的时间延迟置零。 降低“融合时程”延迟可以减小互补滤波器讲状态变量前向传播至当前时间的误差。

位置及速度状态变量在输出至控制回路之前会根据IMU与机体坐标系之间的偏置量进行修正。 The position of the IMU relative to the body frame is set by the `EKF2\_IMU\_POS\_X,Y,Z` parameters.

EKF仅将IMU数据用于状态预测。 在EKF推导中，IMU数据不作为观测值使用。 使用 Matlab symbolic toolbox 推导得到用于进行协方差预测、状态更新、协方差更新的线性代数方程，相关内容详见： [Matlab Symbolic Derivation](https://github.com/PX4/ecl/blob/master/EKF/matlab/scripts/Inertial Nav EKF/GenerateNavFilterEquations.m).

## 它用到了哪些传感器测量值？

EKF滤波器由多种运行模式以适应不同的传感器测量组合。 滤波器在启动时会检查传感器的最小可行组合，并且在完成初始倾斜，偏航和高度对准之后，进入提供旋转，垂直速度，垂直位置，IMU 角偏差和 IMU 速度偏差估计的模式。

This mode requires IMU data, a source of yaw \(magnetometer or external vision\) and a source of height data. 该数据集是所有EKF运行模式的最低需求数据。 在此基础上可以使用其它传感器数据来估计额外的状态变量。

### IMU

* 三轴机体固连惯性测量单元，以最小100Hz的频率获取增量角度和增量速度数据 。 注意：在 EKF 使用它们之前，应该使用圆锥校正算法校正 IMU 增量角度数据。

### 磁力计

Three axis body fixed magnetometer data \(or external vision system pose data\) at a minimum rate of 5Hz is required. 磁力计数据可以用于两种方式：

* 使用倾角估计和磁偏角将磁力计测量值转换为偏航角。 然后将该偏航角用作 EKF 的观察值。 该方法精度较低并且不允许学习机体坐标系场偏移，但是它对于磁场异常和大的初置陀螺偏差更有鲁棒性。 它是启动期间和在地面时的默认方法。
* XYZ 磁力计读数用作单独的观察值。 该方法更精确并且允许学习机体坐标系场偏移，但是它假设地球磁场环境只会缓慢变化，并且当存在显着的外部磁场异常时表现较差。

The logic used to select the mode is set by the [EKF2_MAG_TYPE](../advanced/parameter_reference.md#EKF2_MAG_TYPE) parameter.

ECL 可以在没有磁力计的情况下运行。 或者使用 [yaw from a dual antenna GPS](#yaw_measurements) 来替换磁力计，或者使用IMU测量数据和GPS速度数据去 [estimate yaw from vehicle movement](#yaw_from_gps_velocity)。

### 高度

高度数据源 - 来自 GPS，气压计，测距仪或外部视觉设备，需要最小频率为 5Hz。

> GPS height can be used directly by the EKF via setting of the [EKF2_HGT_MODE](../advanced/parameter_reference.md#EKF2_HGT_MODE) parameter.

如果不存在这些测量值，EKF 将无法启动。 当检测到这些测量值时，EKF 将初始化状态并完成倾角和偏航对准。 当倾角和偏航对齐完成后，EKF 可以转换到其它操作模式，从而可以使用其它传感器数据：

#### 静态气压位置误差校正

气压表示的海拔高度因机体风的相对速度和方向造成的空气动力扰动而发生误差。 这在航空学中被称为*静态气压位置误差*。 使用ECL/EKF2估计器库的EKF2模块提供了补偿这些误差的方法，只要风速状态估计是激活的。

If operating over a flat surface that can be used as a zero height datum, the range finder data can also be used directly by the EKF to estimate height by setting the [EKF2_HGT_MODE](../advanced/parameter_reference.md#EKF2_HGT_MODE) parameter to 2.

对于多旋翼飞行器，可以启用并调整 [Drag Specific Forces](#mc_wind_estimation_using_drag) 的融合，以提供所需风速状态估计。

EKF2模块将误差建模为与机体固连的椭球体，在将其转换为高度估计之前，它指定了从大气气压中加/减的动态气压的分量。 关于如何使用此功能的信息，请参阅以下参数文档：

* [EKF2_PCOEF_XP](../advanced_config/parameter_reference.md#EKF2_PCOEF_XP)
* [EKF2_PCOEF_XN](../advanced_config/parameter_reference.md#EKF2_PCOEF_XN)
* [EKF2_PCOEF_YP](../advanced_config/parameter_reference.md#EKF2_PCOEF_YP)
* [EKF2_PCOEF_YN](../advanced_config/parameter_reference.md#EKF2_PCOEF_YN)
* [EKF2_PCOEF_Z](../advanced_config/parameter_reference.md#EKF2_PCOEF_Z)

### GPS

#### 位置和速度测量

如果满足以下条件，GPS 测量值将做为位置和速度使用：

* GPS use is enabled via setting of the [EKF2_AID_MASK](../advanced/parameter_reference.md#EKF2_AID_MASK) parameter.
* GPS 信号质量检查已通过。 These checks are controlled by the [EKF2_GPS_CHECK](../advanced/parameter_reference.md#EKF2_GPS_CHECK) and `EKF2\_REQ\_\*` parameters.
* The quality metric returned by the flow sensor is greater than the minimum requirement set by the [EKF2_OF_QMIN](../advanced/parameter_reference.md#EKF2_OF_QMIN) parameter.

<span id="yaw_measurements"></span>

#### 偏航角测量

有一些全球定位系统接收器，例如[Trimble MB-Two RTK GPS receiver](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx)，可用来提供一个偏航角测量，以取代磁强计数据的使用。 在存在大型磁场异常的环境中工作时，或在高纬度地区，地球磁场具有很大的倾斜角时，这可能是一个重要的优势。 通过在 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中设置第7位为1 (或操作128)，就启用了GPS yaw测量功能。

<span id="yaw_from_gps_velocity"></span>

#### 从 GPS 速度数据获取偏航角

EKF在内部运行一个附加的多假设滤波器，它使用多个3-状态\---北/东向（N/E）的速度和偏航角\---的扩展卡尔曼滤波器（EKF）。 然后使用高斯加和滤波器（GSF）合并这些偏航角的估计值。 单个3-状态的EKF使用了IMU和GPS水平速度数据（加上可选的空速数据），而不依赖于事先对偏航角或磁强计测量有任何了解。 这里提供了一个对于主滤波器的偏航角备份，当起飞后导航丢失，表明磁力计的偏航估计值不好时，它被用于重置主 EKF 滤波器的24-状态的中的偏航数据。 其结果是一个 `Emergency yaw reset - magnetometer use stopped` 消息被发送给 GCS。

当启用 ekf2 重播日志时，此估计器的数据将被记录下来，可以在 `yaw_estimator_status` 消息中查看。 从单个3-状态的EKF的偏航估计器得到的单个偏航估计值保存在 `yaw` 字段中。 GSF 合并的偏航角估计保存在 `yaw_composite` 字段中。 GSF 估计的偏航角的方差保存在`yaw_variance` 字段中。 所有角度的单位均为弧度。 GSF对单个3-状态EKF输出的加权保存在`weight`字段中。

这也使得 ECL 能够在没有任何磁力计、或没有双天线 GPS 接收器的情况下运行，并提供偏航数据，只要起飞后能够进行某种水平的移动，偏航数据就变得可观测。 若要使用此功能，设置 [EKF2_MAG_TYPE](../advanced_config/parameter_reference.md#EKF2_MAG_TYPE) 为 `none` (5)以禁用磁力计。 一旦机体完成了足够的水平移动，使偏航角可观测， 24-状态的主EKF将使其偏航角与GSF的估计值对齐，并开始使用 GPS。

#### 双 GPS 接收器

GPS接收器提供的数据可以用基于所报告数据的精确度的加权算法混合（如果两者都以相同的速度输出数据并使用相同的精确度，这样做效果最好）。 如果来自接收器的数据丢失，该机制还提供了自动故障转移，（例如，它允许使用标准 GPS 作为更精确的 RTK 接收器的备份）。 该功能由 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 参数控制。

缺省情况下，[EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 参数设置为禁用混合并总是使用第一个接收器， 因此必须设置它，以选择使用哪个接收器精确度指标，以决定每个接收器输出对混合解决方案有多大贡献。 当使用不同型号的接收器时， 重要的是，将 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 参数设置为两个接收器都支持的精确度量值。 例如，除非两个接收器的驱动程序在 `vehicle_gps_position` 消息中的 `s_variance_m_s` 字段中发布具有可比性的值，否则不要将第 0 位设置为 `true` 。 由于精确度定义方法不同，例如 CEP 对比 1-sigma 等等，不同制造商的接收器可能很难做到这一点。

在设置过程中应检查以下条目：

* 验证第二接收器的数据是否存在。 这些数据将记录为 `vehicle_gps_position_1` 消息，并且也可以通过命令 *nsh console* 登录终端，在连接后使用命令 `listener vehicle_gps_position -i 1` 进行检查。 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) 参数需要被正确设置。
* 检查每个接收器的 `s_variance_m_s`, `eph` 和 `epv` 数据，并决定可以使用哪些精确度指标。 如果两个接收器都输出有意义的 `s_variance_m_s` 和 `eph` 数据， 并且 GPS 垂直位置数据不直接用于导航，建议设置 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 为 3。 在仅有 `eph` 数据可用并且两个接收器都不输出 `s_variance_m_s` 数据的地方，设置 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 为 2。 只有在 GPS 被选定为主高度数据源，并具有 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数，两个接收器都输出有意义的 `epv` 数据的情况下，第 2 位才会被设置。
* External vision system pose data will be used for yaw estimation if bit position 4 in the [EKF2_AID_MASK](../advanced/parameter_reference.md#EKF2_AID_MASK) parameter is true.
* 如果接收器以不同的频率输出, 混合输出的频率将是较低的接收器的频率。 在可能的情况下，接收器应配置为同样的输出频率。

#### GPS 性能要求

为了 ECL 能接受 GPS 数据用于导航， 需要在10秒内满足某些最低要求(最小需要在 [EKF2_REQ_*](../advanced_config/parameter_reference.md#EKF2_REQ_EPH) 参数中定义)

下表显示了根据 GPS 数据直接报告或计算的各种指标，和 ECL 使用的数据的最低要求值。 此外， *Average Value* 一列显示了可从标准 GNSS 模块合理获得的典型值（例如 uBlox M8 系列）- 即被认为是好的/可接受的值。

| Metric               | Minimum required                                                                                                                                                                                                                         | Average Value | 单位                          | 备注                                                                                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| eph                  | Set the [SYS_MC_EST_GROUP](../advanced/parameter_reference.md#SYS_MC_EST_GROUP) parameter to 2 to use the ecl EKF.                                                                                                                     | 0.8           | 米                           | 水平位置误差的标准偏差                                                                                                                                                                    |
| epv                  | Increasing the value of [EKF2_ACC_NOISE](../advanced/parameter_reference.md#EKF2_ACC_NOISE) and [EKF2_GYR_NOISE](../advanced/parameter_reference.md#EKF2_GYR_NOISE) can help, but does make the EKF more vulnerable to GPS glitches. | 1.5           | 米                           | 垂直位置误差的标准偏差                                                                                                                                                                    |
| Number of satellites | Bit position 1 in the [EKF2_AID_MASK](../advanced/parameter_reference.md#EKF2_AID_MASK) parameter is true.                                                                                                                             | 14            | -                           |                                                                                                                                                                                |
| Speed variance       | 0.5                                                                                                                                                                                                                                      | 0.3           | 米/秒                         |                                                                                                                                                                                |
| Fix type             | 3                                                                                                                                                                                                                                        | 4             | -                           |                                                                                                                                                                                |
| hpos_drift_rate    | 0.1&nbsp;([EKF2_REQ_HDRIFT](../advanced_config/parameter_reference.md#EKF2_REQ_HDRIFT))                                                                                                                                                | 0.01          | 米/秒                         | Plot the GPS receiver reported speed accuracy - [vehicle\_gps\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_gps_position.msg).s\_variance\_m\_s |
| vpos_drift_rate    | 0.2&nbsp;([EKF2_REQ_VDRIFT](../advanced_config/parameter_reference.md#EKF2_REQ_VDRIFT))                                                                                                                                                | 0.02          | 米/秒                         | 根据所报告的GPS高度计算出的漂移率(在固定不动时)。                                                                                                                                                    |
| hspd                 | 0.1&nbsp;([EKF2_REQ_SACC](../advanced_config/parameter_reference.md#EKF2_REQ_SACC))                                                                                                                                                    | 0.01          | 2\] Velocity NED \(m/s\) | 报告的 GPS 水平速度的滤波幅度。                                                                                                                                                             |

> **注意** `hpos_drift_rate`, `vpos_drift_rate` 和 `hspd` 是在10秒内计算的，并在 `ekf2_gps_drift` 主题中公布。 请注意， `ekf2_gps_drift` 不被记录在文件里！

### 测距仪

单个状态滤波器使用距离探测器到地面的距离来估计地形相对于高度基准的垂直位置。

如果在可用作零高度基准面的平面上操作，则 EKF 也可以直接使用测距仪数据，通过将 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数设置为 2 来估算高度。

### 空速

Equivalent Airspeed \(EAS\) data can be used to estimate wind velocity and reduce drift when GPS is lost by setting [EKF2_ARSP_THR](../advanced/parameter_reference.md#EKF2_ARSP_THR) to a positive value. Airspeed data will be used when it exceeds the threshold set by a positive value for [EKF2_ARSP_THR](../advanced/parameter_reference.md#EKF2_ARSP_THR) and the vehicle type is not rotary wing.

### 合成侧滑

固定翼平台可以利用零假设侧滑观测来改善风速估计，并且还可以在没有空速传感器的情况下进行风速估算。 This is enabled by setting the [EKF2_FUSE_BETA](../advanced/parameter_reference.md#EKF2_FUSE_BETA) parameter to 1.

<span id="mc_wind_estimation_using_drag"></span>

### Drag Specific Forces

多转子平台可以利用沿 X 和 Y 体轴的空速和阻力之间的关系来估计风速的北/东分量。 This is enabled by setting bit position 5 in the [EKF2_AID_MASK](../advanced/parameter_reference.md#EKF2_AID_MASK) parameter to true. The relationship between airspeed and specific force \(IMU acceleration\) along the X and Y body axes is controlled by the [EKF2_BCOEF_X](../advanced/parameter_reference.md#EKF2_BCOEF_X) and [EKF2_BCOEF_Y](../advanced/parameter_reference.md#EKF2_BCOEF_Y) parameters which set the ballistic coefficients for flight in the X and Y directions respectively. The amount of specific force observation noise is set by the [EKF2_DRAG_NOISE](../advanced/parameter_reference.md#EKF2_DRAG_NOISE) parameter.

这些参数可以被调整，通过以 [Position mode](../flight_modes/position_mc.md) 模式让机体在静止和最大速度之间反复向前/向后飞行， 调整 [EKF2_BCOEF_X](../advanced_config/parameter_reference.md#EKF2_BCOEF_X) ，以便在`ekf2_innovations_0.drag_innov[0]` 日志消息中的相应新息序列最小化。 然后对右/左移动进行重复，并调整 [EKF2_BCOEF_Y](../advanced_config/parameter_reference.md#EKF2_BCOEF_Y)，以最小化`ekf2_innovations_0.drag_innov[1]` 新息序列。 如果仍然在这种条件下进行测试，调节就比较容易。

如果你能够使用 [SDLOG_MODE = 1](../advanced_config/parameter_reference.md#SDLOG_MODE) 和 [SDLOG_PROFILE = 2](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 从启动开始记录数据，并能够进入开发环境。 并且能够构建代码， 然后我们推荐你以 *once* 模式飞行，并通过 [EKF2 Replay](../debug/system_wide_replay.md#ekf2-replay) 对生成飞行数据的日志进行调整。

### 光流

如果满足以下条件，将使用光流数据：

* 有效的测距仪数据可用。
* The ecl EKF uses more RAM and flash space
* 光流传感器返回的质量度量值大于 [EKF2_OF_QMIN](../advanced_config/parameter_reference.md#EKF2_OF_QMIN) 参数设置的最低要求。

<span id="ekf2_extvis"></span>

### 外部视觉系统

After re-tuning the filter, particularly re-tuning that involve reducing the noise variables, the value of estimator\_status.gps\_check\_fail\_flags should be checked to ensure that it remains zero.

* The ecl EKF is able to fuse data from sensors with different time delays and data rates in a mathematically consistent way which improves accuracy during dynamic manoeuvres once time delay parameters are set correctly.
* External vision system vertical position data will be used if the [EKF2_HGT_MODE](../advanced/parameter_reference.md#EKF2_HGT_MODE) parameter is set to 3.
* External vision system horizontal position data will be used if bit position 3 in the [EKF2_AID_MASK](../advanced/parameter_reference.md#EKF2_AID_MASK) parameter is true.
* 如果 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中的第 4 位为真，则外部视觉系统姿态数据将用于偏航估计。
* 如果 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中的第 6 位为真，则外部视觉参考帧偏移将被估计并用于旋转外部视觉系统数据。

要么将第 4 位(`EV_YAW`)或将第 6 位(`EV_ROTATE`)设置为 true，但不能同时设置为 true。 当与外部视觉系统一起使用时，支持以下 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 值。

| EKF_AID_MASK 值 | 设置位                           | 描述                                           |
| ---------------- | ----------------------------- | -------------------------------------------- |
| 321              | GPS + EV_VEL + ROTATE_EV    | 航向相关/以北为正(**Recommended**)                   |
| 73               | GPS + EV_POS + ROTATE_EV    | 航向相关/以北为正(*Not recommended*, 使用 `EV_VEL` 替代) |
| 24               | EV_POS + EV_YAW             | 航向相关/跟随外部视觉系统                                |
| 72               | EV_POS + ROTATE_EV          | 航向相关/以北为正                                    |
| 272              | EV_VEL + EV_YAW             | 航向相关/跟随外部视觉系统                                |
| 320              | EV_VEL + ROTATE_EV          | 航向相关/以北为正                                    |
| 280              | EV_POS + EV_VEL + EV_YAW    | 航向相关/跟随外部视觉系统                                |
| 328              | EV_POS + EV_VEL + ROTATE_EV | 航向相关/以北为正                                    |

EKF 要考虑视觉姿态估计的不确定性。 此不确定性信息可以通过 MAVLink，在 [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) 消息中的协方差字段发送，也可以通过 [EKF2_EVP_NOISE](../advanced_config/parameter_reference.md#EKF2_EVP_NOISE) ，[EKF2_EVV_NOISE](../advanced_config/parameter_reference.md#EKF2_EVV_NOISE) 和 [EKF2_EVA_NOISE](../advanced_config/parameter_reference.md#EKF2_EVA_NOISE) 参数设置。 你可以通过 [EKF2_EV_NOISE_MD](../advanced_config/parameter_reference.md#EKF2_EV_NOISE_MD) 选择不确定性数据源。

## 我如何启用 'ecl' 库中的 EKF ？

将 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) 参数设置为 2 以启用 ecl EKF。

## ecl EKF 和其它估计器相比的优点和缺点是什么？

与所有估算器一样，大部分性能来自调整以匹配传感器特性。 Tuning 是准确性和鲁棒性之间的折衷，虽然我们试图提供满足大多数用户需求的调优，但是应用程序需要调整更改。

For this reason, no claims for accuracy relative to the legacy combination of attitude\_estimator\_q + local\_position\_estimator have been made and the best choice of estimator will depend on the application and tuning.

### 缺点

* ecl EKF 是一种复杂的算法，需要很好地理解扩展卡尔曼滤波器理论及其应用于导航中的问题才能成功调整。 因此，不知道怎么修改，用户就很难得到好结果。
* Local position output data is found in the [vehicle\_local\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_local_position.msg) message.
* ecl EKF 使用更多的日志空间。

### 优点

* ecl EKF 能够以数学上一致的方式融合来自具有不同时间延迟和数据速率的传感器的数据，一旦正确设置时间延迟参数，就可以提高动态操作期间的准确性。
* ecl EKF 能够融合各种不同的传感器类型。
* 当 ecl EKF 检测并报告传感器数据中统计上显着的不一致性，将帮助诊断传感器错误。
* 对于固定翼飞机的操作，ecl EKF 可以使用或不使用空速传感器估计风速，并且能够将估计的风速与空速测量和侧滑假设结合使用，以延长 GPS 在飞行中丢失时的航位推算时间。
* ecl EKF估计3轴加速度计偏差，这提高了尾座式无人机和其它机体在飞行阶段之间经历大的姿态变化时的精度。
* The federated architecture \(combined attitude and position/velocity estimation\) means that attitude estimation benefits from all sensor measurements. 如果调整正确，这应该提供改善态度估计的潜力。

## 如何检查 EKF 性能？

EKF 输出，状态和状态数据发布到许多 uORB 主题，这些主题在飞行期间记录到 SD 卡。 The following guide assumes that data has been logged using the .ulog file format. To use the .ulog format, set the SYS\_LOGGER parameter to 1.

Most of the EKF data is found in the [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg) and [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) uORB messages that are logged to the .ulog file.

A python script that automatically generates analysis plots and metadata can be found [here](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/process_logdata_ekf.py). 要使用此脚本文件，请 cd 到 `Tools/ecl_ekf`directory and enter`python process_logdata_ekf.py&lt;log_file.ulg&gt;`。 This saves performance metadata in a csv file named `<log_file>.mdat.csv` and plots in a pdf file named `<log_file>.pdf`.

Multiple log files in a directory can be analysed using the [batch\_process\_logdata\_ekf.py](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/batch_process_logdata_ekf.py) script. When this has been done, the performance metadata files can be processed to provide a statistical assessment of the estimator performance across the population of logs using the [batch\_process\_metadata\_ekf.py](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/batch_process_metadata_ekf.py) script.

### 输出数据

* Attitude output data is found in the [vehicle\_attitude](https://github.com/PX4/Firmware/blob/master/msg/vehicle_attitude.msg) message.
* Global \(WGS-84\) output data is found in the [vehicle\_global\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_global_position.msg) message.
* Wind velocity output data is found in the [wind\_estimate](https://github.com/PX4/Firmware/blob/master/msg/wind_estimate.msg) message.
* High frequency delta velocity vibration - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[2\]

### 状态

Refer to states\[32\] in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg). 状态 \[32\] 的索引映射如下：

* \[0 ... 3\] 四元数
* \[4 ... 6\] 速度 NED \(m/s\)
* \[7 ... 9\] 位置 NED \(m\)
* \[10 ... 12\] IMU 增量角度偏差 XYZ \(rad\)
* \[13 ... 15\] IMU 增量速度偏差 XYZ \(m/s\)
* \[16 ... 18\] 地球磁场 NED \(gauss\)
* \[19 ... 21\] 机体磁场 XYZ \(gauss\)
* \[22 ... 23\] 风速 NE \(m/s\)
* \[24 ... 32\] 未使用

### 状态变量

Refer to covariances\[28\] in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg). 协方差\[28\] 的索引图如下：

* \[0 ... 3\] 四元数
* \[4 ... 6\] 速度 NED \(m/s\)^2
* \[7 ... 9\] 位置 NED \(m^2\)
* \[10 ... 12\] IMU 增量角度偏差 XYZ \(rad^2\)
* \[13 ... 15\] IMU 增量速度偏差 XYZ \(m/s\)^2
* \[16 ... 18\] 地球磁场 NED \(gauss^2\)
* \[19 ... 21\] 机体磁场 XYZ \(gauss^2\)
* \[22 ... 23\] 风速 NE \(m/s\)^2
* \[24 ... 28\] 未使用

### Observation Innovations

观测 `estimator_innovations`, `estimator_innovation_variances`, 和 `estimator_innovation_test_ratios` 的消息字段定义于 [estimator_innovations.msg](https://github.com/PX4/PX4-Autopilot/blob/master/msg/estimator_innovations.msg)。 消息都有相同的字段名称/类型(但是单位不同)。

> **注意** 消息具有相同的字段，因为它们是从相同的字段定义生成的。 `# TOPICS` 行(位于 [the file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/estimator_innovations.msg) 末尾)列出了要创建的消息集的名字： ```hagl\_test\_ratio : ratio of the height above ground innovation to the innovation test limit```

一些观察值为：

* \[0\] Angular tracking error magnitude \(rad\)
* 偏航角度 (rad, rad^2) : `heading`
* True Airspeed \(m/s\)^2 : Refer to airspeed\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Synthetic sideslip \(rad^2\) : Refer to beta\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Optical flow XY \(rad/sec\)^2 : Refer to flow\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* Height above ground \(m^2\) : Refer to hagl\_innov\_var in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* 阻力比力 ((m/s)^2): `drag`
* 速度和位置新息：每个传感器

此外，每个传感器都有其自己的字段，即横向和纵向位置和/或速度值（视情况而定）。 这些基本上是自我描述的，现摘录如下：

    # GPS
    float32[2] gps_hvel # horizontal GPS velocity innovation (m/sec) and innovation variance ((m/sec)**2)
    float32    gps_vvel # vertical GPS velocity innovation (m/sec) and innovation variance ((m/sec)**2)
    float32[2] gps_hpos # horizontal GPS position innovation (m) and innovation variance (m**2)
    float32    gps_vpos # vertical GPS position innovation (m) and innovation variance (m**2)
    
    # External Vision
    float32[2] ev_hvel  # horizontal external vision velocity innovation (m/sec) and innovation variance ((m/sec)**2)
    float32    ev_vvel  # vertical external vision velocity innovation (m/sec) and innovation variance ((m/sec)**2)
    float32[2] ev_hpos  # horizontal external vision position innovation (m) and innovation variance (m**2)
    float32    ev_vpos  # vertical external vision position innovation (m) and innovation variance (m**2)
    
    # Fake Position and Velocity
    float32[2] fake_hvel  # fake horizontal velocity innovation (m/s) and innovation variance ((m/s)**2)
    float32    fake_vvel  # fake vertical velocity innovation (m/s) and innovation variance ((m/s)**2)
    float32[2] fake_hpos  # fake horizontal position innovation (m) and innovation variance (m**2)
    float32    fake_vpos  # fake vertical position innovation (m) and innovation variance (m**2)
    
    # Height sensors
    float32 rng_vpos  # range sensor height innovation (m) and innovation variance (m**2)
    float32 baro_vpos # barometer height innovation (m) and innovation variance (m**2)
    
    # Auxiliary velocity
    float32[2] aux_hvel # horizontal auxiliar velocity innovation from landing target measurement (m/sec) and innovation variance ((m/sec)**2)
    float32    aux_vvel # vertical auxiliar velocity innovation from landing target measurement (m/sec) and innovation variance ((m/sec)**2)
    

### 输出互补滤波器

输出互补滤波器用于将状态从融合时间范围向前传播到当前时间。 To check the magnitude of the angular, velocity and position tracking errors measured at the fusion time horizon, refer to output\_tracking\_error\[3\] in the ekf2\_innovations message.

The index map for vel\_pos\_innov\[6\] is as follows:

* \[0\] 角度跟踪误差幅度 (rad)
* \[1\] Velocity tracking error magnitude \(m/s\). The velocity tracking time constant can be adjusted using the [EKF2_TAU_VEL](../advanced/parameter_reference.md#EKF2_TAU_VEL) parameter. 减小此参数可减少稳态误差，但会增加 NED 速度输出上的观察噪声量。
* \[2\] Position tracking error magnitude \(m\). The position tracking time constant can be adjusted using the [EKF2_TAU_POS](../advanced/parameter_reference.md#EKF2_TAU_POS) parameter. 减小此参数可减少稳态误差，但会增加 NED 位置输出上的观察噪声量。

### EKF 错误

EKF 包含针对严重条件状态和协方差更新的内部错误检查。 Refer to the filter\_fault\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### 观察错误

有两类观察错误：

* 数据丢失。 一个例子是测距仪无法提供返回数据。
* 新息，即状态预测和传感器观察之间的差异过度。 这种情况的一个例子是过度振动导致大的垂直位置误差，导致气压计高度测量被拒绝。

这两者都可能导致观察数据被拒绝足够长的时间以使 EKF 使用传感器观察来尝试重置状态。 所有观察结果均对创新进行了统计置信度检查。 The number of standard deviations for the check are controlled by the EKF2\_\*\_GATE parameter for each observation type.

Test levels are available in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) as follows:

* mag\_test\_ratio : ratio of the largest magnetometer innovation component to the innovation test limit
* State variances \(diagonals in the covariance matrix\) are constrained to be non-negative.
* pos\_test\_ratio : ratio of the largest horizontal position innovation component to the innovation test limit
* hgt\_test\_ratio : ratio of the vertical position innovation to the innovation test limit
* tas\_test\_ratio : ratio of the true airspeed innovation to the innovation test limit
* vel\_test\_ratio : ratio of the largest velocity innovation component to the innovation test limit

For a binary pass/fail summary for each sensor, refer to innovation\_check\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### GPS 数据质量检查

在开始 GPS 辅助之前，EKF 应用了许多 GPS 质量检查。 These checks are controlled by the [EKF2_GPS_CHECK](../advanced/parameter_reference.md#EKF2_GPS_CHECK) and `EKF2_REQ_*` parameters. This integer will be zero when all required GPS checks have passed. The pass/fail status for these checks is logged in the [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).gps\_check\_fail\_flags message. If the EKF is not commencing GPS alignment, check the value of the integer against the bitmask definition gps\_check\_fail\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### EKF 数值误差

EKF 对其所有计算使用单精度浮点运算，并使用一阶近似来推导协方差预测和更新方程，以降低处理要求。 这意味着当重新调整 EKF 时可能遇到协方差矩阵运算变得严重条件足以引起状态估计中的分歧或显着错误的条件。

为防止这种情况，每个协方差和状态更新步骤都包含以下错误检测和更正步骤：

* If the innovation variance is less than the observation variance \(this requires a negative state variance which is impossible\) or the covariance update will produce a negative variance for any of the states, then: 
  * 跳过状态和协方差更新
  * 协方差矩阵中的相应行和列被重置
  * The failure is recorded in the [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) filter\_fault\_flags message
* [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).hgt\_test\_ratio will be greater than 1.0
* 状态方差应用数值上限。
* 协方差矩阵强制对称。

重新调整过滤器后，特别是需要减少噪声变量的重新调整，应检查`estimator_status.gps_check_fail_flags` 的值，以确保它保持为零。

## 如果高度估计值发散了怎么办?

在飞行期间 EKF 高度偏离 GPS 和高度计测量的最常见原因是由振动引起的 IMU 测量的削波和/或混叠。 如果发生这种情况，则数据中应显示以下迹象

* [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).vel\_pos\_innov\[2\] and [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).vel\_pos\_innov\[5\] will both have the same sign.
* Plot the height innovation test ratio - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).hgt\_test\_ratio

建议第一步是确保使用有效的隔离安装系统将无人机与机身隔离。 隔离安装座具有 6 个自由度，因此具有 6 个谐振频率。 作为一般规则，隔离支架上的自动驾驶仪的 6 个共振频率应高于 25Hz，以避免与无人机动力学相互作用并低于电动机的频率。

如果谐振频率与电动机或螺旋桨叶片通过频率一致，则隔离安装件会使振动更严重。

通过进行以下参数更改，可以使 EKF 更加抵抗振动引起的高度发散：

* 将主要的高度传感器的新息通道的值加倍。 If using barometric height this is [EKF2_BARO_GATE](../advanced/parameter_reference.md#EKF2_BARO_GATE).
* Increase the value of [EKF2_ACC_NOISE](../advanced/parameter_reference.md#EKF2_ACC_NOISE) to 0.5 initially. 如果仍然出现发散，则进一步增加 0.1，但不要超过 1.0。

Note 这些变化的影响将使 EKF 对 GPS 垂直速度和气压的误差更敏感。

## 如果位置估计发散了应该怎么办?

位置散度的最常见原因是：

* 高振动级别。 
  * 通过改进无人机的机械隔离来解决。
  * 增加 [EKF2_ACC_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_NOISE) 和 [EKF2_GYR_NOISE](../advanced_config/parameter_reference.md#EKF2_GYR_NOISE) 的值会有所帮助，但确实会使 EKF 更容易受到 GPS 故障的影响。
* 过大的陀螺仪偏差偏移。 
  * 通过重新校准陀螺仪来修复。 Check for excessive temperature sensitivity \(&gt; 3 deg/sec bias change during warm-up from a cold start and replace the sensor if affected of insulate to to slow the rate of temperature change.
* 不好的偏航对齐 
  * 检查磁力计校准和对齐。
  * 检查显示的航向 QGC 是否在 15 度以内
* GPS 精度差 
  * 检查是否有干扰
  * 改善隔离和屏蔽
  * 检查飞行位置是否有 GPS 信号障碍物和反射器（附近的高层建筑）
* GPS 数据丢失

确定哪些是主要原因需要有条理的方法来分析 EKF 日志数据：

* Plot the velocity innovation test ratio - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vel\_test\_ratio
* Plot the horizontal position innovation test ratio - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).pos\_test\_ratio
* Plot the magnetometer innovation test ratio - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).mag\_test\_ratio
* Magnetometer XYZ \(gauss\) : Refer to mag\_innov\[3\] in [ekf2\_innovations](https://github.com/PX4/Firmware/blob/master/msg/ekf2_innovations.msg).
* 绘制 GPS 接收器报告的速度精度-[vehicle\_gps\_position](https://github.com/PX4/PX4-Autopilot/blob/master/msg/vehicle_gps_position.msg).s\_variance\_m\_s
* Plot the IMU delta angle state estimates - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).states\[10\], states\[11\] and states\[12\]
* 绘制 EKF 内部高频振动指标： 
  * Delta angle coning vibration - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[0\]
  * High frequency delta angle vibration - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[1\]
  * 高频增量速度振动 - [estimator_status](https://github.com/PX4/PX4-Autopilot/blob/master/msg/estimator_status.msg).vibe\[2\]

在正常操作期间，所有测试比率应保持在 0.5 以下，并且只有偶然的峰值高于此值，如下面成功飞行中的示例所示：

![位置，速度，高度和磁强计测试比率](../../assets/ecl/test_ratios_-_successful.png)

下图显示了具有良好隔离的多旋翼飞行器的 EKF 振动指标。 可以看到着陆冲击和起飞和着陆期间增加的振动。 使用这些指标收集的数据不足，无法提供有关最大阈值的具体建议。

![Vibration metrics - successful](../../assets/ecl/vibration_metrics_-_successful.png)

The above vibration metrics are of limited value as the presence of vibration at a frequency close to the IMU sampling frequency \(1 kHz for most boards\) will cause offsets to appear in the data that do not show up in the high frequency vibration metrics. 检测混叠误差的唯一方法是它们对惯性导航精度和新息水平的提高。

除了生成 &gt; 1.0 的大位置和速度测试比率外，不同的误差机制还以不同的方式影响其他测试比率：

### 振动过大的测定

高振动水平通常会影响垂直位置和速度新息以及水平组件。 磁强计测试水平仅受到很小程度的影响。

（在此处插入显示不良振动的示例图）

### 过度陀螺偏差的测定

Large gyro bias offsets are normally characterised by a change in the value of delta angle bias greater than 5E-4 during flight \(equivalent to ~3 deg/sec\) and can also cause a large increase in the magnetometer test ratio if the yaw axis is affected. 除极端情况外，高度通常不受影响。 Switch on bias value of up to 5 deg/sec can be tolerated provided the filter is given time time settle before flying . 如果位置发散，飞手进行的飞行前检查应防止解锁。

（插入示例曲线显示这里的陀螺偏差）

### 确定较差的偏航精度

由于惯性导航和 GPS 测量计算出的速度方向不一致，因此不良偏航对准导致无人机开始移动时速度测试比率迅速增加。 磁力计的新息受到轻微影响。 高度通常不受影响。

（插入示例图显示错误的偏航对齐此处）

### GPS 数据精度差的确定

GPS精度差通常伴随着接收器报告的速度误差的增加以及新息的增加。 由多径，遮蔽和干扰引起的瞬态误差是更常见的原因。 下面是一个暂时失去 GPS 精度的例子，其中多旋翼开始从其游荡位置漂移并且必须使用摇杆进行校正。 The rise in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vel\_test\_ratio to greater than 1 indicates the GPs velocity was inconsistent with other measurements and has been rejected.

![GPS glitch - test ratios](../../assets/ecl/gps_glitch_-_test_ratios.png)

这伴随着 GPS 接收器报告的速度精度的上升，这表明它可能是 GPS 误差。

![GPS Glitch - reported receiver accuracy](../../assets/ecl/gps_glitch_-_reported_receiver_accuracy.png)

如果我们还看一下 GPS 水平速度新息和新息差异，我们可以看到北部速度新息伴随着这次 GPS “故障”事件的大幅增长。

![GPS Glitch - velocity innovations](../../assets/ecl/gps_glitch_-_velocity_innovations.png)

### GPS 数据丢失的确定

GPS 数据的丢失将通过速度和位置新息测试比率'平面衬里'来显示。 如果发生这种情况，请检查 `vehicle_gps_position` 中的其他 GPS 状态数据以获取更多信息。

下图显示了 NED GPS 速度创新 `ekf2_innovations_0.vel_pos_innov[0 ... 2]`，GPS NE 位置新息 `ekf2_innovations_0.vel_pos_innov[3 ... 4] `和使用 SITL Gazebo 从模拟 VTOL 生成的 Baro 垂直位置新息 `ekf2_innovations_0.vel_pos_innov [5] `。

模拟的 GPS 在 73 秒时失锁。 Note the NED velocity innovations and NE position innovations 'flat-line' after GPs is lost. <0>Note</0>在没有 GPS 数据的 10 秒后，EKF 使用最后的已知位置恢复到静态位置模式，并且NE位置新息开始再次改变。

![GPS 数据丢失-在 SITL 中](../../assets/ecl/gps_data_loss_-_velocity_innovations.png)

### 气压计地面效果补偿

如果机体在降落期间在靠近地面时往往爬升回到空中， 最可能的原因是气压计地面效应。

这种情况是在推进器向地面推进并在无人机下空形成高压区时造成的。 其结果是降低了对压力高度的解读，从而导致了不必要的爬升。 下图显示了存在地面效应的典型情况。 注意气压计信号如何在飞行开始和结束时消失。

![Barometer ground effect](../../assets/ecl/gnd_effect.png)

你可以启用 *ground effect compensation* 来解决这个问题：

* 从绘图中估算出气压计在起飞或着陆期间的跌落程度。 在上面的绘图中，人们可以看到降落过程中大约6米的气压计下沉。
* 然后将参数 [EKF2_GND_EFF_DZ](../advanced_config/parameter_reference.md#EKF2_GND_EFF_DZ) 设置为该值，并添加 10% 的余量值。 因此，在这种情况下，6.6米的数值将是一个良好的起点。

如果有可用的地形估计(例如，机体装备了测距仪)，然后你可以另外指定 [EKF2_GND_MAX_HGT](../advanced_config/parameter_reference.md#EKF2_GND_MAX_HGT)， 即距地高度，低于该高度，地面效应补偿将被激活。 如果没有可用的地形估计，这个参数将不会产生任何效果，系统将使用继承法来确定是否应激活地面效果补偿。

## 更多信息

* [PX4 状态估计概述视频](https://youtu.be/HkYRJJoyBwQ)，*PX4 开发者峰会 2019*， (Dr. Paul Riseborough) 对状态估计器进行了概述，并且还进一步介绍了2018/19年以来的重大变化以及2019年期间计划的改进措施。