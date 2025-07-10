---
canonicalUrl: https://docs.px4.io/main/zh/flying/pre_flight_checks
---

# 飞行前传感器 / 估算器检查

PX4 执行很多飞行前传感器质量和估算器检查，以确定是否有足够好的位置估计来解锁和驾驶飞行器（这些检查由 [COM_*ARM_*](../advanced_config/parameter_reference.md#commander) 参数控制）。

:::tip
Any preflight errors are reported in *QGroundControl* as `PREFLIGHT FAIL` messages. The `estimator_status.gps_check_fail_flags` message [in the logs](../getting_started/flight_reporting.md) also shows which GPS quality checks are failing.
:::

The sections below list the errors, their likely causes and solutions, and any parameters that affect how the preflight checks are run.

## EKF 飞行前检查 / 错误

The following errors (with associated checks and parameters) are reported by the [EKF](../advanced_config/tuning_the_ecl_ekf.md) (and propagate to *QGroundControl*):

#### PREFLIGHT FAIL: EKF HGT ERROR

- 当 IMU 和高度测量数据不一致时会产生此错误。
- 执行加速度计和陀螺仪校准并重新启动飞行器。 如果错误仍然存在，请检查高度传感器数据是否存在问题。
- 检查由[COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT)参数控制。

#### PREFLIGHT FAIL: EKF VEL ERROR

- 当 IMU 和 GPS 速度测量数据不一致时会产生此错误。 
- 检查 GPS 速度数据是否存在不真实的数据跳转。 如果 GPS 质量看起来没有问题，请执行加速度计和陀螺仪校准并重新启动飞行器。
- 检查由[COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL)参数控制。

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

- 当 IMU 和位置测量数据（GPS 或外部视觉）不一致时会产生此问题。 
- 检查位置传感器数据是否存在不真实的数据跳转。 如果数据质量看起来不错，请执行加速度计和陀螺仪校准并重新启动飞行器。
- 检查由[COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS)参数控制。

#### PREFLIGHT FAIL: EKF YAW ERROR

- 当使用陀螺仪数据估计的偏航角和来自磁力计或外部视觉系统的偏航角不一致时，产生该误差。
- 检查 IMU 数据是否存在较大的偏航率漂洗，并检查磁力计的对准和校准。
- The check is controlled by the [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) parameter
- The default value of 0.5 allows the differences between the navigation yaw angle and magnetic yaw angle (magnetometer or external vision) to be no more than 50% of the maximum tolerated by the EKF and provides some margin for error increase when flight commences.
- 如果偏航陀螺仪有较大的偏移量，或者飞行器在存在磁干扰或者磁力计校准的情况下移动或者旋转，则可能会校准失败。

#### PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS

- 当 EKF 估计的 IMU 加速度计偏差过大时，会产生此错误。 
- Excessive in this case means that the bias estimate exceeds half the configured limit. The limit is defined in the [EKF2_ABL_LIM](../advanced_config/parameter_reference.md#EKF2_ABL_LIM) parameter.

#### PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS

- 当由 EKF 估计的 IMU 陀螺仪偏差过大时会产生该错误。
- Excessive in this case means that the bias estimate exceeds 10deg/s (half the configured limit, which is hardcoded to 20deg/s).

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

- 当来自不同 IMU 单元的加速度测量值不一致时，会产生此错误消息。
- 此检查仅适用于具有多个 IMU 的板。
- 检查由[COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC)参数控制。

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

- 当来自不同 IMU 单元的角速率测量值不一致时，会产生此错误消息。
- 此检查仅适用于具有多个 IMU 的板。
- 检查由[COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR)参数控制。

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

- This error message is produced when the difference in measurements from different compass sensors is too great.
- It indicates bad calibration, orientation or magnetic interference.
- This check only applies to when more than one compass/magnetometer is connected.
- The check is controlled by the [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) parameter.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

- 如果水平 GPS 速度、偏航角、垂直 GPS 速度或者垂直位置传感器（气压计默认情况下可以使测距仪或 GPS ，如果使用非标准参数）其中之一新息过多，会产生此错误消息。 新息指的是惯性导航计算预测值与传感器测量值之间的差异。
- 用户应检查日志文件中新息级别以确定原因。 这些可以在`ekf2_innovations`消息下找到。 常见问题 / 解决方案包括： 
    - IMU 启动时漂移。 可以通过重启自驾仪来解决。 可能需要 IMU 加速度计和陀螺仪校准。
    - 相邻磁干扰在飞行器运动中。 通过等待或者重新上电解决。
    - 磁力计校准不良在飞行器运动中。。 通过重新校准解决。
    - 启动时的初始冲击或快速移动导致惯性导航失败。 通过重新启动飞行器并在前 5 秒内最大限度地减少移动来解决此问题。

## 其他参数

The following parameters also affect preflight checks.

#### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.

- `1`( 默认)：*仅*对处于不需要获取位置信息的飞行模式时，即便没有位置估计也可以解锁。
- </code>0</0>：只有当 EKF 提供全球位置估计并且 EKF GPS 质量检查正在通过时，才允许解锁。