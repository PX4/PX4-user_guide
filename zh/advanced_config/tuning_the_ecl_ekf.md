# 使用 ECL EKF

本文主要回答使用 ECL EKF 算法的常见问题。

> **提示：** [PX4 状态估计概述](https://youtu.be/HkYRJJoyBwQ)视频， *PX4 开发者峰会 2019*， (Dr. Paul Riseborough) 对状态估计器进行了概述，并且还进一步介绍了2018/2019年以来的重大变化以及2020年期间计划的改进措施。

## 什么是 ECL EKF？

估计和控制库（ECL）使用扩展卡尔曼滤波算法（EKF）来处理传感器的测量信息，并提供如下状态量的估计值：

* 定义由北-东-地的当地地理坐标系到X-Y-Z机体坐标系旋转角度的姿态四元数
* IMU传感器位置处的速度-北-东-地 \(m/s\)
* IMU传感器位置处的空间坐标 - 北-东-地 \(m\)
* IMU 角度误差估计 - X, Y, Z \(rad\)
* IMU 速度误差估计 - X, Y, Z\(m/s\)
* 地理地磁 - 北-东-地 \(gauss\)
* 机体偏置磁场 - X, Y, Z \(gauss\)
* 风速 - 北-东 \(m/s\)

EKF在延迟的“融合时程”下运行，从而适应不同传感器测量值相对IMU的时间延迟。 为了保证所有传感器数据都能在在正确的时间内使用，每个传感器的数据都是按照先入先出（FIFO）队列进行缓存，并由EKF从缓存区中读取。 每个传感器的延迟补偿通过[EKF2_*_DELAY](../advanced_config/parameter_reference.md#ekf2) 参数进行控制。

互补滤波器根据缓冲的 IMU 数据将状态变量从“融合时程”向前传播到当前时间。 互补滤波器的时间常数由 [EKF2_TAU_VEL](../advanced_config/parameter_reference.md#EKF2_TAU_VEL) 以及 [EKF2_TAU_POS](../advanced_config/parameter_reference.md#EKF2_TAU_POS) 参数共同控制。

> **注意：** “融合时程”延迟和缓冲区长度由 `EKF2_*_DELAY` 参数中的最大值决定。 如果并未使用某个传感器，建议将其对应的时间延迟置零。 降低“融合时程”延迟可以减小互补滤波器讲状态变量前向传播至当前时间的误差。

位置及速度状态变量在输出至控制回路之前会根据IMU与机体坐标系之间的偏置量进行修正。 IMU传感器在机体坐标系下的相对位置由`EKF2_IMU_POS_X,Y,Z` 参数定义。

EKF仅将IMU数据用于状态预测。 在EKF推导中，IMU数据不作为观测值使用。 使用 Matlab symbolic toolbox 推导得到用于进行协方差预测、状态更新、协方差更新的线性代数方程，相关内容详见： [Matlab Symbolic Derivation](https://github.com/PX4/ecl/blob/master/EKF/matlab/scripts/Inertial Nav EKF/GenerateNavFilterEquations.m).

## 它用到了哪些传感器测量值？

EKF滤波器由多种运行模式以适应不同的传感器测量组合。 滤波器在启动时会检查传感器的最小可行组合，并且在完成初始倾斜，偏航和高度对准之后，进入提供旋转，垂直速度，垂直位置，IMU 角偏差和 IMU 速度偏差估计的模式。

此模式下滤波器需要 IMU 数据，一个偏航角数据源（磁力计或外部视觉）和一个高度数据源。 该数据集是所有EKF运行模式的最低需求数据。 在此基础上可以使用其它传感器数据来估计额外的状态变量。

### IMU

* 三轴机体固连惯性测量单元，以最小100Hz的频率获取增量角度和增量速度数据 。 注意：在 EKF 使用它们之前，应该使用圆锥校正算法校正 IMU 增量角度数据。

### 磁力计

三轴机体固连的磁力计数据（或外部视觉系统姿态数据），需要以最小 5Hz 的频率采样。 磁力计数据可以用于两种方式：

* 使用倾角估计和磁偏角将磁力计测量值转换为偏航角。 然后将该偏航角用作 EKF 的观察值。 该方法精度较低并且不允许学习机体坐标系场偏移，但是它对于磁场异常和大的初置陀螺偏差更有鲁棒性。 它是启动期间和在地面时的默认方法。
* XYZ 磁力计读数用作单独的观察值。 该方法更精确并且允许学习机体坐标系场偏移，但是它假设地球磁场环境只会缓慢变化，并且当存在显着的外部磁场异常时表现较差。

用于选择这些模式的逻辑由 [EKF2_MAG_TYPE](../advanced_config/parameter_reference.md#EKF2_MAG_TYPE) 参数设置。

ECL 可以在没有磁力计的情况下运行。 或者使用 [yaw from a dual antenna GPS](#yaw_measurements) 来替换磁力计，或者使用IMU测量数据和GPS速度数据去 [estimate yaw from vehicle movement](#yaw_from_gps_velocity)。

### 高度

高度数据源 - 来自 GPS，气压计，测距仪或外部视觉设备，需要最小频率为 5Hz。

> **注意** 高度数据的主要来源由 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数控制。

如果不存在这些测量值，EKF 将无法启动。 当检测到这些测量值时，EKF 将初始化状态并完成倾角和偏航对准。 当倾角和偏航对齐完成后，EKF 可以转换到其它操作模式，从而可以使用其它传感器数据：

#### 静态气压位置误差校正

气压表示的海拔高度因机体风的相对速度和方向造成的空气动力扰动而发生误差。 这在航空学中被称为*静态气压位置误差*。 使用ECL/EKF2估计器库的EKF2模块提供了补偿这些误差的方法，只要风速状态估计是激活的。

对于固定翼式运行平台，风速状态估计需要 [Airspeed](#airspeed) 和/或 [Synthetic Sideslip](#synthetic-sideslip) 融合才能启用。

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

* 通过设置 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数启用 GPS 的使用。
* GPS 信号质量检查已通过。 这些检查由 [EKF2_GPS_CHECK](../advanced_config/parameter_reference.md#EKF2_GPS_CHECK) 和 `EKF2_REQ_*` 参数控制。
* 通过设置 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数，EKF 可以直接使用 GPS 高度数据。

#### 偏航角测量 {#yaw_measurements}

有一些全球定位系统接收器，例如[Trimble MB-Two RTK GPS receiver](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx)，可用来提供一个偏航角测量，以取代磁强计数据的使用。 在存在大型磁场异常的环境中工作时，或在高纬度地区，地球磁场具有很大的倾斜角时，这可能是一个重要的优势。 通过在 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中设置第7位为1 (或操作128)，就启用了GPS yaw测量功能。

#### 从 GPS 速度数据获取偏航角 {#yaw_from_gps_velocity}

EKF在内部运行一个附加的多假设滤波器，它使用多个3-状态\---北/东向（N/E）的速度和偏航角\---的扩展卡尔曼滤波器（EKF）。 然后使用高斯加和滤波器（GSF）合并这些偏航角的估计值。 单个3-状态的EKF使用了IMU和GPS水平速度数据（加上可选的空速数据），而不依赖于事先对偏航角或磁强计测量有任何了解。 这里提供了一个对于主滤波器的偏航角备份，当起飞后导航丢失，表明磁力计的偏航估计值不好时，它被用于重置主 EKF 滤波器的24-状态的中的偏航数据。 其结果是一个 `Emergency yaw reset - magnetometer use stopped` 消息被发送给 GCS。

当启用 ekf2 重播日志时，此估计器的数据将被记录下来，可以在 `yaw_estimator_status` 消息中查看。 从单个3-状态的EKF的偏航估计器得到的单个偏航估计值保存在 `yaw` 字段中。 GSF 合并的偏航角估计保存在 `yaw_composite` 字段中。 GSF 估计的偏航角的方差保存在`yaw_variance` 字段中。 所有角度的单位均为弧度。 GSF对单个3-状态EKF输出的加权保存在`weight`字段中。

这也使得 ECL 能够在没有任何磁力计、或没有双天线 GPS 接收器的情况下运行，并提供偏航数据，只要起飞后能够进行某种水平的移动，偏航数据就变得可观测。 若要使用此功能，设置 [EKF2_MAG_TYPE](../advanced_config/parameter_reference.md#EKF2_MAG_TYPE) 为 `none` (5)以禁用磁力计。 一旦机体完成了足够的水平移动，使偏航角可观测， 24-状态的主EKF将使其偏航角与GSF的估计值对齐，并开始使用 GPS。

#### 双 GPS 接收器

GPS接收器提供的数据可以用基于所报告数据的精确度的加权算法混合（如果两者都以相同的速度输出数据并使用相同的精确度，这样做效果最好）。 如果来自接收器的数据丢失，该机制还提供了自动故障转移，（例如，它允许使用标准 GPS 作为更精确的 RTK 接收器的备份）。 该功能由 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 参数控制。

缺省情况下，[EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 参数设置为禁用混合并总是使用第一个接收器， 因此必须设置它，以选择使用哪个接收器精确度指标，以决定每个接收器输出对混合解决方案有多大贡献。 当使用不同型号的接收器时， 重要的是，将 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 参数设置为两个接收器都支持的精确度量值。 例如，除非两个接收器的驱动程序在 `vehicle_gps_position` 消息中的 `s_variance_m_s` 字段中发布具有可比性的值，否则不要将第 0 位设置为 `true` 。 由于精确度定义方法不同，例如 CEP 对比 1-sigma 等等，不同制造商的接收器可能很难做到这一点。

在设置过程中应检查以下条目：

* 验证第二接收器的数据是否存在。 这些数据将记录为 `vehicle_gps_position_1` 消息，并且也可以通过命令 *nsh console* 登录终端，在连接后使用命令 `listener vehicle_gps_position -i 1` 进行检查。 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) 参数需要被正确设置。
* 检查每个接收器的 `s_variance_m_s`, `eph` 和 `epv` 数据，并决定可以使用哪些精确度指标。 如果两个接收器都输出有意义的 `s_variance_m_s` 和 `eph` 数据， 并且 GPS 垂直位置数据不直接用于导航，建议设置 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 为 3。 在仅有 `eph` 数据可用并且两个接收器都不输出 `s_variance_m_s` 数据的地方，设置 [EKF2_GPS_MASK](../advanced_config/parameter_reference.md#EKF2_GPS_MASK) 为 2。 只有在 GPS 被选定为主高度数据源，并具有 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数，两个接收器都输出有意义的 `epv` 数据的情况下，第 2 位才会被设置。
* 混合接收器数据的输出被记录为 `ekf_gps_position`，当通过 nsh 终端连接时，可以通过命令 `listener ekf_gps_position` 进行检查。
* 如果接收器以不同的频率输出, 混合输出的频率将是较低的接收器的频率。 在可能的情况下，接收器应配置为同样的输出频率。

#### GPS 性能要求

为了 ECL 能接受 GPS 数据用于导航， 需要在10秒内满足某些最低要求(最小需要在 [EKF2_REQ_*](../advanced_config/parameter_reference.md#EKF2_REQ_EPH) 参数中定义)

下表显示了根据 GPS 数据直接报告或计算的各种指标，和 ECL 使用的数据的最低要求值。 此外， *Average Value* 一列显示了可从标准 GNSS 模块合理获得的典型值（例如 uBlox M8 系列）- 即被认为是好的/可接受的值。

| Metric               | Minimum required                                                                          | Average Value | Units | Notes                        |
| -------------------- | ----------------------------------------------------------------------------------------- | ------------- | ----- | ---------------------------- |
| eph                  | 3&nbsp;([EKF2_REQ_EPH](../advanced_config/parameter_reference.md#EKF2_REQ_EPH))         | 0.8           | m     | 水平位置误差的标准偏差                  |
| epv                  | 5&nbsp;([EKF2_REQ_EPV](../advanced_config/parameter_reference.md#EKF2_REQ_EPV))         | 1.5           | m     | 垂直位置误差的标准偏差                  |
| Number of satellites | 6&nbsp;([EKF2_REQ_NSATS](../advanced_config/parameter_reference.md#EKF2_REQ_NSATS))     | 14            | -     |                              |
| Speed variance       | 0.5                                                                                       | 0.3           | m/s   |                              |
| Fix type             | 3                                                                                         | 4             | -     |                              |
| hpos_drift_rate    | 0.1&nbsp;([EKF2_REQ_HDRIFT](../advanced_config/parameter_reference.md#EKF2_REQ_HDRIFT)) | 0.01          | m/s   | 根据报告的 GPS 位置计算出的漂移率(在固定不动时)。 |
| vpos_drift_rate    | 0.2&nbsp;([EKF2_REQ_VDRIFT](../advanced_config/parameter_reference.md#EKF2_REQ_VDRIFT)) | 0.02          | m/s   | 根据所报告的GPS高度计算出的漂移率(在固定不动时)。  |
| hspd                 | 0.1&nbsp;([EKF2_REQ_SACC](../advanced_config/parameter_reference.md#EKF2_REQ_SACC))     | 0.01          | m/s   | 报告的 GPS 水平速度的滤波幅度。           |

> **注意** `hpos_drift_rate`, `vpos_drift_rate` 和 `hspd` 是在10秒内计算的，并在 `ekf2_gps_drift` 主题中公布。 请注意， `ekf2_gps_drift` 不被记录在文件里！

### 测距仪

单状态滤波器使用测距仪的对地距离来估计地形相对于高度基准的垂直位置。

如果在可用作零高度基准面的平面上操作，则 EKF 也可以直接使用测距仪数据，通过将 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数设置为 2 来估算高度。

### 空速

通过将 [EKF2_ARSP_THR](../advanced_config/parameter_reference.md#EKF2_ARSP_THR) 设置为正值，等效空速（EAS）数据就可用于估计风速并减少 GPS 丢失时的漂移。 当空速超过由 [EKF2_ARSP_THR](../advanced_config/parameter_reference.md#EKF2_ARSP_THR) 为正值的设定阈值并且飞机类型不是旋翼时，将使用空速数据。

### 合成侧滑

固定翼平台可以利用假定的侧滑观测值为零来改进风速估计，也可以在没有空速传感器的情况下进行风速估计。 通过将 [EKF2_FUSE_BETA](../advanced_config/parameter_reference.md#EKF2_FUSE_BETA) 参数设置为 1 来启用此功能。

### 使用阻力比力的多旋翼风速估计 {#mc_wind_estimation_using_drag}

多旋翼平台可以利用沿 X 和 Y 机体轴的空速和阻力之间的关系来估计风速的北/东分量。 通过将 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中的第5为设置为 true 来启用此功能。 沿 X 和 Y 轴的空速和比力（IMU加速度）之间的关系由 [EKF2_BCOEF_X](../advanced_config/parameter_reference.md#EKF2_BCOEF_X) 和 [EKF2_BCOEF_Y](../advanced_config/parameter_reference.md#EKF2_BCOEF_Y) 参数控制，这些参数分别设置了 X 和 Y 方向飞行的弹道系数。 比力观测噪声量由 [EKF2_DRAG_NOISE](../advanced_config/parameter_reference.md#EKF2_DRAG_NOISE) 参数设置。

这些参数可以被调整，通过以 [Position mode](../flight_modes/position_mc.md) 模式让机体在静止和最大速度之间反复向前/向后飞行， 调整 [EKF2_BCOEF_X](../advanced_config/parameter_reference.md#EKF2_BCOEF_X) ，以便在`ekf2_innovations_0.drag_innov[0]` 日志消息中的相应新息序列最小化。 然后对右/左移动进行重复，并调整 [EKF2_BCOEF_Y](../advanced_config/parameter_reference.md#EKF2_BCOEF_Y)，以最小化`ekf2_innovations_0.drag_innov[1]` 新息序列。 如果仍然在这种条件下进行测试，调节就比较容易。

如果你能够使用 [SDLOG_MODE = 1](../advanced_config/parameter_reference.md#SDLOG_MODE) 和 [SDLOG_PROFILE = 2](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 从启动开始记录数据，并能够进入开发环境。 并且能够构建代码， 然后我们推荐你以 *once* 模式飞行，并通过 [EKF2 Replay](https://dev.px4.io/master/en/debug/system_wide_replay.html#ekf2-replay) 对生成飞行数据的日志进行调整。

### 光流

如果满足以下条件，将使用光流数据：

* 有效的测距仪数据可用。
* 在 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中的第 1 位为真。
* 光流传感器返回的质量度量值大于 [EKF2_OF_QMIN](../advanced_config/parameter_reference.md#EKF2_OF_QMIN) 参数设置的最低要求。

### 外部视觉系统 {#ekf2_extvis}

来自外部视觉系统，例如 Vicon，提供位置、速度和姿态测量，在以下条件下可以被使用：

* 如果 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中的第 3 位为真，则将使用外部视觉系统的水平位置数据。
* 如果 [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE) 参数设置为 3，将使用外部视觉系统的垂直位置数据。
* 如果 [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 参数中的第 8 位为真，则将使用外部视觉系统的速度数据。
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

与所有估计器一样，大部分性能来自调整以匹配传感器特性。 Tuning 是准确性和鲁棒性之间的折衷，虽然我们试图提供满足大多数用户需求的调优，但是应用程序需要调整更改。

因此，对于 `attitude_estimator_q` + `local_position_estimator` 传统组合的精度没有任何要求，估计器的最佳选择将取决于应用和调整。

### 缺点

* ecl EKF 是一种复杂的算法，需要很好地理解扩展卡尔曼滤波器理论及其应用于导航中的问题才能成功调整。 因此，不知道怎么修改，用户就很难得到好结果。
* ecl EKF 使用更多 RAM 和闪存空间。
* ecl EKF 使用更多的日志空间。

### 优点

* ecl EKF 能够以数学上一致的方式融合来自具有不同时间延迟和数据速率的传感器的数据，一旦正确设置时间延迟参数，就可以提高动态操作期间的准确性。
* ecl EKF 能够融合各种不同的传感器类型。
* 当 ecl EKF 检测并报告传感器数据中统计上显着的不一致性，将帮助诊断传感器错误。
* 对于固定翼飞机的操作，ecl EKF 可以使用或不使用空速传感器估计风速，并且能够将估计的风速与空速测量和侧滑假设结合使用，以延长 GPS 在飞行中丢失时的航位推算时间。
* ecl EKF估计3轴加速度计偏差，这提高了尾座式无人机和其它机体在飞行阶段之间经历大的姿态变化时的精度。
* 联合架构（组合姿态和位置/速度估计）意味着姿态估计受益于所有传感器测量。 如果调整正确，这应该提供改善态度估计的潜力。

## 如何检查 EKF 性能？

EKF 输出，状态和状态数据发布到许多 uORB 主题，这些主题在飞行期间记录到 SD 卡上。 以下指南假定已使用 *.ulog file format* 记录数据。 可以使用 [PX4 pyulog library](https://github.com/PX4/pyulog) 在 python 中解析 **.ulog** 格式数据。

大多数 EKF 数据位于记录到 .ulog 文件的 [estimator_innovations](https://github.com/PX4/Firmware/blob/master/msg/estimator_innovations.msg) 和 [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) 的 uORB 消息中。

可以在 [here](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/process_logdata_ekf.py) 找到自动生成分析图和元数据的 python 脚本。 To use this script file, cd to the `Tools/ecl_ekf` directory and enter `python process_logdata_ekf.py <log_file.ulg>`. This saves performance metadata in a csv file named **<log_file>.mdat.csv** and plots in a pdf file named `<log_file>.pdf`.

Multiple log files in a directory can be analysed using the [batch\_process\_logdata\_ekf.py](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/batch_process_logdata_ekf.py) script. When this has been done, the performance metadata files can be processed to provide a statistical assessment of the estimator performance across the population of logs using the [batch\_process\_metadata\_ekf.py](https://github.com/PX4/Firmware/blob/master/Tools/ecl_ekf/batch_process_metadata_ekf.py) script.

### Output Data

* Attitude output data is found in the [vehicle\_attitude](https://github.com/PX4/Firmware/blob/master/msg/vehicle_attitude.msg) message.
* Local position output data is found in the [vehicle\_local\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_local_position.msg) message.
* Global \(WGS-84\) output data is found in the [vehicle\_global\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_global_position.msg) message.
* Wind velocity output data is found in the [wind\_estimate](https://github.com/PX4/Firmware/blob/master/msg/wind_estimate.msg) message.

### States

Refer to states\[32\] in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg). The index map for states\[32\] is as follows:

* \[0 ... 3\] Quaternions
* \[4 ... 6\] Velocity NED \(m/s\)
* \[7 ... 9\] Position NED \(m\)
* \[10 ... 12\] IMU delta angle bias XYZ \(rad\)
* \[13 ... 15\] IMU delta velocity bias XYZ \(m/s\)
* \[16 ... 18\] Earth magnetic field NED \(gauss\)
* \[19 ... 21\] Body magnetic field XYZ \(gauss\)
* \[22 ... 23\] Wind velocity NE \(m/s\)
* \[24 ... 32\] Not Used

### State Variances

Refer to covariances\[28\] in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg). The index map for covariances\[28\] is as follows:

* \[0 ... 3\] Quaternions
* \[4 ... 6\] Velocity NED \(m/s\)^2
* \[7 ... 9\] Position NED \(m^2\)
* \[10 ... 12\] IMU delta angle bias XYZ \(rad^2\)
* \[13 ... 15\] IMU delta velocity bias XYZ \(m/s\)^2
* \[16 ... 18\] Earth magnetic field NED \(gauss^2\)
* \[19 ... 21\] Body magnetic field XYZ \(gauss^2\)
* \[22 ... 23\] Wind velocity NE \(m/s\)^2
* \[24 ... 28\] Not Used

### Observation Innovations & Innovation Variances

The observation `estimator_innovations`, `estimator_innovation_variances`, and `estimator_innovation_test_ratios` message fields are defined in [estimator_innovations.msg](https://github.com/PX4/Firmware/blob/master/msg/estimator_innovations.msg). The messages all have the same field names/types (but different units).

> **Note** The messages have the same fields because they are generated from the same field definition. The `# TOPICS` line (at the end of [the file](https://github.com/PX4/Firmware/blob/master/msg/estimator_innovations.msg)) lists the names of the set of messages to be created): ```# TOPICS estimator_innovations estimator_innovation_variances estimator_innovation_test_ratios```

Some of the observations are:

* Magnetometer XYZ (gauss, gauss^2) : `mag_field[3]`
* Yaw angle (rad, rad^2) : `heading`
* True Airspeed (m/s, (m/s)^2) : `airspeed`
* Synthetic sideslip (rad, rad^2) : `beta`
* Optical flow XY (rad/sec, (rad/s)^2) : `flow`
* Height above ground (m, m^2) : `hagl`
* Drag specific force ((m/s)^2): `drag`
* Velocity and position innovations : per sensor

In addition, each sensor has its own fields for horizontal and vertical position and/or velocity values (where appropriate). These are largely self documenting, and are reproduced below:

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
    

### Output Complementary Filter

The output complementary filter is used to propagate states forward from the fusion time horizon to current time. To check the magnitude of the angular, velocity and position tracking errors measured at the fusion time horizon, refer to `output_tracking_error[3]` in the `ekf2_innovations` message.

The index map is as follows:

* [0] Angular tracking error magnitude (rad)
* [1] Velocity tracking error magnitude (m/s). The velocity tracking time constant can be adjusted using the [EKF2_TAU_VEL](../advanced_config/parameter_reference.md#EKF2_TAU_VEL) parameter. Reducing this parameter reduces steady state errors but increases the amount of observation noise on the NED velocity outputs.
* [2] Position tracking error magnitude \(m\). The position tracking time constant can be adjusted using the [EKF2_TAU_POS](../advanced_config/parameter_reference.md#EKF2_TAU_POS) parameter. Reducing this parameter reduces steady state errors but increases the amount of observation noise on the NED position outputs.

### EKF Errors

The EKF contains internal error checking for badly conditioned state and covariance updates. Refer to the filter\_fault\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### Observation Errors

There are two categories of observation faults:

* Loss of data. An example of this is a range finder failing to provide a return.
* The innovation, which is the difference between the state prediction and sensor observation is excessive. An example of this is excessive vibration causing a large vertical position error, resulting in the barometer height measurement being rejected.

Both of these can result in observation data being rejected for long enough to cause the EKF to attempt a reset of the states using the sensor observations. All observations have a statistical confidence checks applied to the innovations. The number of standard deviations for the check are controlled by the `EKF2_*_GATE` parameter for each observation type.

Test levels are available in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) as follows:

* `mag_test_ratio`: ratio of the largest magnetometer innovation component to the innovation test limit
* `vel_test_ratio`: ratio of the largest velocity innovation component to the innovation test limit
* `pos_test_ratio`: ratio of the largest horizontal position innovation component to the innovation test limit
* `hgt_test_ratio`: ratio of the vertical position innovation to the innovation test limit
* `tas_test_ratio`: ratio of the true airspeed innovation to the innovation test limit
* `hagl_test_ratio`: ratio of the height above ground innovation to the innovation test limit

For a binary pass/fail summary for each sensor, refer to innovation\_check\_flags in [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### GPS Quality Checks

The EKF applies a number of GPS quality checks before commencing GPS aiding. These checks are controlled by the [EKF2_GPS_CHECK](../advanced_config/parameter_reference.md#EKF2_GPS_CHECK) and `EKF2_REQ_*` parameters. The pass/fail status for these checks is logged in the [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).gps\_check\_fail\_flags message. This integer will be zero when all required GPS checks have passed. If the EKF is not commencing GPS alignment, check the value of the integer against the bitmask definition `gps_check_fail_flags` in [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).

### EKF Numerical Errors

The EKF uses single precision floating point operations for all of its computations and first order approximations for derivation of the covariance prediction and update equations in order to reduce processing requirements. This means that it is possible when re-tuning the EKF to encounter conditions where the covariance matrix operations become badly conditioned enough to cause divergence or significant errors in the state estimates.

To prevent this, every covariance and state update step contains the following error detection and correction steps:

* If the innovation variance is less than the observation variance (this requires a negative state variance which is impossible) or the covariance update will produce a negative variance for any of the states, then: 
  * The state and covariance update is skipped
  * The corresponding rows and columns in the covariance matrix are reset
  * The failure is recorded in the [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg) filter\_fault\_flags message
* State variances (diagonals in the covariance matrix) are constrained to be non-negative.
* An upper limit is applied to state variances.
* Symmetry is forced on the covariance matrix.

After re-tuning the filter, particularly re-tuning that involve reducing the noise variables, the value of `estimator_status.gps_check_fail_flags` should be checked to ensure that it remains zero.

## What should I do if the height estimate is diverging?

The most common cause of EKF height diverging away from GPS and altimeter measurements during flight is clipping and/or aliasing of the IMU measurements caused by vibration. If this is occurring, then the following signs should be evident in the data

* [estimator_innovations](https://github.com/PX4/Firmware/blob/master/msg/estimator_innovations.msg).vel\_pos\_innov\[2\] and [estimator_innovations](https://github.com/PX4/Firmware/blob/master/msg/estimator_innovations.msg).vel\_pos\_innov\[5\] will both have the same sign.
* [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).hgt\_test\_ratio will be greater than 1.0

The recommended first step is to ensure that the autopilot is isolated from the airframe using an effective isolation mounting system. An isolation mount has 6 degrees of freedom, and therefore 6 resonant frequencies. As a general rule, the 6 resonant frequencies of the autopilot on the isolation mount should be above 25Hz to avoid interaction with the autopilot dynamics and below the frequency of the motors.

An isolation mount can make vibration worse if the resonant frequencies coincide with motor or propeller blade passage frequencies.

The EKF can be made more resistant to vibration induced height divergence by making the following parameter changes:

* Double the value of the innovation gate for the primary height sensor. If using barometric height this is [EKF2_BARO_GATE](../advanced_config/parameter_reference.md#EKF2_BARO_GATE).
* Increase the value of [EKF2_ACC_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_NOISE) to 0.5 initially. If divergence is still occurring, increase in further increments of 0.1 but do not go above 1.0

Note that the effect of these changes will make the EKF more sensitive to errors in GPS vertical velocity and barometric pressure.

## What should I do if the position estimate is diverging?

The most common causes of position divergence are:

* High vibration levels. 
  * Fix by improving mechanical isolation of the autopilot.
  * Increasing the value of [EKF2_ACC_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_NOISE) and [EKF2_GYR_NOISE](../advanced_config/parameter_reference.md#EKF2_GYR_NOISE) can help, but does make the EKF more vulnerable to GPS glitches.
* Large gyro bias offsets. 
  * Fix by re-calibrating the gyro. Check for excessive temperature sensitivity (&gt; 3 deg/sec bias change during warm-up from a cold start and replace the sensor if affected of insulate to to slow the rate of temperature change.
* Bad yaw alignment 
  * Check the magnetometer calibration and alignment.
  * Check the heading shown QGC is within within 15 deg truth
* Poor GPS accuracy 
  * Check for interference
  * Improve separation and shielding
  * Check flying location for GPS signal obstructions and reflectors \(nearby tall buildings\)
* Loss of GPS

Determining which of these is the primary cause requires a methodical approach to analysis of the EKF log data:

* Plot the velocity innovation test ratio - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vel\_test\_ratio
* Plot the horizontal position innovation test ratio - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).pos\_test\_ratio
* Plot the height innovation test ratio - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).hgt\_test\_ratio
* Plot the magnetometer innovation test ratio - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).mag\_test\_ratio
* Plot the GPS receiver reported speed accuracy - [vehicle\_gps\_position](https://github.com/PX4/Firmware/blob/master/msg/vehicle_gps_position.msg).s\_variance\_m\_s
* Plot the IMU delta angle state estimates - [estimator\_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).states\[10\], states\[11\] and states\[12\]
* Plot the EKF internal high frequency vibration metrics: 
  * Delta angle coning vibration - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[0\]
  * High frequency delta angle vibration - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[1\]
  * High frequency delta velocity vibration - [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vibe\[2\]

During normal operation, all the test ratios should remain below 0.5 with only occasional spikes above this as shown in the example below from a successful flight:

![Position, Velocity, Height and Magnetometer Test Ratios](../../assets/ecl/test_ratios_-_successful.png)

The following plot shows the EKF vibration metrics for a multirotor with good isolation. The landing shock and the increased vibration during takeoff and landing can be seen. Insufficient data has been gathered with these metrics to provide specific advice on maximum thresholds.

![Vibration metrics - successful](../../assets/ecl/vibration_metrics_-_successful.png)

The above vibration metrics are of limited value as the presence of vibration at a frequency close to the IMU sampling frequency (1 kHz for most boards) will cause offsets to appear in the data that do not show up in the high frequency vibration metrics. The only way to detect aliasing errors is in their effect on inertial navigation accuracy and the rise in innovation levels.

In addition to generating large position and velocity test ratios of &gt; 1.0, the different error mechanisms affect the other test ratios in different ways:

### Determination of Excessive Vibration

High vibration levels normally affect vertical position and velocity innovations as well as the horizontal components. Magnetometer test levels are only affected to a small extent.

\(insert example plots showing bad vibration here\)

### Determination of Excessive Gyro Bias

Large gyro bias offsets are normally characterised by a change in the value of delta angle bias greater than 5E-4 during flight (equivalent to ~3 deg/sec) and can also cause a large increase in the magnetometer test ratio if the yaw axis is affected. Height is normally unaffected other than extreme cases. Switch on bias value of up to 5 deg/sec can be tolerated provided the filter is given time settle before flying. Pre-flight checks performed by the commander should prevent arming if the position is diverging.

\(insert example plots showing bad gyro bias here\)

### Determination of Poor Yaw Accuracy

Bad yaw alignment causes a velocity test ratio that increases rapidly when the vehicle starts moving due inconsistency in the direction of velocity calculated by the inertial nav and the GPS measurement. Magnetometer innovations are slightly affected. Height is normally unaffected.

\(insert example plots showing bad yaw alignment here\)

### Determination of Poor GPS Accuracy

Poor GPS accuracy is normally accompanied by a rise in the reported velocity error of the receiver in conjunction with a rise in innovations. Transient errors due to multipath, obscuration and interference are more common causes. Here is an example of a temporary loss of GPS accuracy where the multi-rotor started drifting away from its loiter location and had to be corrected using the sticks. The rise in [estimator_status](https://github.com/PX4/Firmware/blob/master/msg/estimator_status.msg).vel\_test\_ratio to greater than 1 indicates the GPs velocity was inconsistent with other measurements and has been rejected.

![GPS glitch - test ratios](../../assets/ecl/gps_glitch_-_test_ratios.png)

This is accompanied with rise in the GPS receivers reported velocity accuracy which indicates that it was likely a GPS error.

![GPS Glitch - reported receiver accuracy](../../assets/ecl/gps_glitch_-_reported_receiver_accuracy.png)

If we also look at the GPS horizontal velocity innovations and innovation variances, we can see the large spike in North velocity innovation that accompanies this GPS 'glitch' event.

![GPS Glitch - velocity innovations](../../assets/ecl/gps_glitch_-_velocity_innovations.png)

### Determination of GPS Data Loss

Loss of GPS data will be shown by the velocity and position innovation test ratios 'flat-lining'. If this occurs, check the other GPS status data in `vehicle_gps_position` for further information.

The following plot shows the NED GPS velocity innovations `ekf2_innovations_0.vel_pos_innov[0 ... 2]`, the GPS NE position innovations `ekf2_innovations_0.vel_pos_innov[3 ... 4]` and the Baro vertical position innovation `ekf2_innovations_0.vel_pos_innov[5]` generated from a simulated VTOL flight using SITL Gazebo.

The simulated GPS was made to lose lock at 73 seconds. Note the NED velocity innovations and NE position innovations 'flat-line' after GPS is lost. Note that after 10 seconds without GPS data, the EKF reverts back to a static position mode using the last known position and the NE position innovations start to change again.

![GPS Data Loss - in SITL](../../assets/ecl/gps_data_loss_-_velocity_innovations.png)

### Barometer Ground Effect Compensation

If the vehicle has the tendency during landing to climb back into the air when close to the ground, the most likely cause is barometer ground effect.

This is caused when air pushed down by the propellers hits the ground and creates a high pressure zone below the drone. The result is a lower reading of pressure altitude, leading to an unwanted climb being commanded. The figure below shows a typical situation where the ground effect is present. Note how the barometer signal dips at the beginning and end of the flight.

![Barometer ground effect](../../assets/ecl/gnd_effect.png)

You can enable *ground effect compensation* to fix this problem:

* From the plot estimate the magnitude of the barometer dip during takeoff or landing. In the plot above one can read a barometer dip of about 6 meters during landing.
* Then set the parameter [EKF2_GND_EFF_DZ](../advanced_config/parameter_reference.md#EKF2_GND_EFF_DZ) to that value and add a 10 percent margin. Therefore, in this case a value of 6.6 meters would be a good starting point.

If a terrain estimate is available (e.g. the vehicle is equipped with a range finder) then you can additionally specify [EKF2_GND_MAX_HGT](../advanced_config/parameter_reference.md#EKF2_GND_MAX_HGT), the above ground-level altitude below which ground effect compensation should be activated. If no terrain estimate is available this parameter will have no effect and the system will use heuristics to determine if ground effect compensation should be activated.

## Further Information

* [PX4 State Estimation Overview](https://youtu.be/HkYRJJoyBwQ), *PX4 Developer Summit 2019*, Dr. Paul Riseborough): Overview of the estimator, and major changes from 2018/19, and the expected improvements through 2019/20.