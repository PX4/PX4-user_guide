# 飞行前传感器 / 估算器检查

PX4 执行很多飞行前传感器质量和估算器检查，以确定是否有足够好的位置估计来解锁和驾驶飞行器（这些检查由 [COM_*ARM_*](../advanced_config/parameter_reference.md#commander) 参数控制）。

> **Tip**任何飞行前错误都会在*QGroundControl*中报告为`PREFLIGHT FAIL`消息。 [在日志中](../getting_started/flight_reporting.md)的`estimator_status.gps_check_fail_flags`消息还显示了 GPS 质量检查失败。

以下部分列出了错误，可能的原因和解决方案，以及影响飞行前检查运行方式的所有参数。

## EKF 飞行前检查 / 错误

The following errors (with associated checks and parameters) are reported by the [EKF](https://dev.px4.io/master/en/tutorials/tuning_the_ecl_ekf.html) (and propagate to *QGroundControl*):

`PREFLIGHT FAIL: EKF HGT ERROR`：

- 当 IMU 和高度测量数据不一致时会产生此错误。
- 执行加速度计和陀螺仪校准并重新启动飞行器。 如果错误仍然存在，请检查高度传感器数据是否存在问题。
- 检查由[COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT)参数控制。

`PREFLIGHT FAIL: EKF VEL ERROR`:

- 当 IMU 和 GPS 速度测量数据不一致时会产生此错误。 
- 检查 GPS 速度数据是否存在不真实的数据跳转。 如果 GPS 质量看起来没有问题，请执行加速度计和陀螺仪校准并重新启动飞行器。
- 检查由[COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL)参数控制。

`PREFLIGHT FAIL: EKF HORIZ POS ERROR`:

- 当 IMU 和位置测量数据（GPS 或外部视觉）不一致时会产生此问题。 
- 检查位置传感器数据是否存在不真实的数据跳转。 如果数据质量看起来不错，请执行加速度计和陀螺仪校准并重新启动飞行器。
- 检查由[COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS)参数控制。

`PREFLIGHT FAIL: EKF YAW ERROR`:

- 当使用陀螺仪数据估计的偏航角和来自磁力计或外部视觉系统的偏航角不一致时，产生该误差。
- 检查 IMU 数据是否存在较大的偏航率漂洗，并检查磁力计的对准和校准。
- The check is controlled by the [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) parameter
- The default value of 0.5 allows the differences between the navigation yaw angle and magnetic yaw angle (magnetometer or external vision) to be no more than 50% of the maximum tolerated by the EKF and provides some margin for error increase when flight commences.
- It can fail if the yaw gyro has a large offset or if the vehicle is moved or rotated in the presence of a bad magnetic interference or magnetometer calibration.

`PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS`:

- 当 EKF 估计的 IMU 加速度计偏差过大时，会产生此错误。 
- 检查由[COM_ARM_EKF_AB](../advanced_config/parameter_reference.md#COM_ARM_EKF_AB)参数控制。

`PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS`:

- 当由 EKF 估计的 IMU 陀螺仪偏差过大时会产生该错误。
- 检查由[COM_ARM_EKF_GB](../advanced_config/parameter_reference.md#COM_ARM_EKF_GB)参数控制。

`PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION`:

- 当来自不同 IMU 单元的加速度测量值不一致时，会产生此错误消息。
- 此检查仅适用于具有多个 IMU 的板。
- 检查由[COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC)参数控制。

`PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION`:

- 当来自不同 IMU 单元的角速率测量值不一致时，会产生此错误消息。
- 此检查仅适用于具有多个 IMU 的板。
- 检查由[COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR)参数控制。

`PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION`:

- This error message is produced when the difference in measurements from different compass sensors is too great.
- It indicates bad calibration, orientation or magnetic interference.
- This check only applies to when more than one compass/magnetometer is connected.
- The check is controlled by the [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) parameter.

`PREFLIGHT FAIL: EKF INTERNAL CHECKS`:

- This error message is generated if the innovation magnitudes of either the horizontal GPS velocity, magnetic yaw, vertical GPS velocity or vertical position sensor (Baro by default but could be range finder or GPS if non-standard parameters are being used) are excessive. Innovations are the difference between the value predicted by the inertial navigation calculation and measured by the sensor.
- Users should check the innovation levels in the log file to determine the cause. These can be found under the `ekf2_innovations` message. Common problems/solutions include: 
    - IMU drift on warmup. May be resolved by restarting the autopilot. May require an IMU accel and gyro calibration.
    - Adjacent magnetic interference combined with vehicle movement. Resolve my moving vehicle and waiting or re-powering.
    - Bad magnetometer calibration combined with vehicle movement. Resolve by recalibrating.
    - Initial shock or rapid movement on startup that caused a bad inertial nav solution. Resolve by restarting the vehicle and minimising movement for the first 5 seconds.

## 其他参数

The following parameters also affect preflight checks.

### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.

- `1` (default): Arming *is* allowed without a position estimate for flight modes that do not require position information (only).
- `0`: Arming is allowed only if EKF is providing a global position estimate and EFK GPS quality checks are passing