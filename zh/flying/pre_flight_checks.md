---
canonicalUrl: https://docs.px4.io/main/zh/flying/pre_flight_checks
---

# 飞行前传感器 / 估算器检查

PX4 performs a number of preflight sensor quality and estimator checks to determine if there is a good enough position estimate to arm and fly the vehicle (these checks are controlled by the [COM\_ARM\_](../advanced_config/parameter_reference.md#commander) parameters).

:::tip
Any preflight errors are reported in *QGroundControl* as `PREFLIGHT FAIL` messages. The `estimator_status.gps_check_fail_flags` message [in the logs](../getting_started/flight_reporting.md) also shows which GPS quality checks are failing.
:::

The sections below list the errors, their likely causes and solutions, and any parameters that affect how the preflight checks are run.

## EKF 飞行前检查 / 错误

The following errors (with associated checks and parameters) are reported by the [EKF](../advanced_config/tuning_the_ecl_ekf.md) (and propagate to *QGroundControl*):

#### PREFLIGHT FAIL: EKF HGT ERROR

* 当 IMU 和高度测量数据不一致时会产生此错误。
* 执行加速度计和陀螺仪校准并重新启动飞行器。 如果错误仍然存在，请检查高度传感器数据是否存在问题。
* 检查由[COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT)参数控制。

#### PREFLIGHT FAIL: EKF VEL ERROR

* 当 IMU 和 GPS 速度测量数据不一致时会产生此错误。
* 检查 GPS 速度数据是否存在不真实的数据跳转。 如果 GPS 质量看起来没有问题，请执行加速度计和陀螺仪校准并重新启动飞行器。
* 检查由[COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL)参数控制。

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

* 当 IMU 和位置测量数据（GPS 或外部视觉）不一致时会产生此问题。
* 检查位置传感器数据是否存在不真实的数据跳转。 如果数据质量看起来不错，请执行加速度计和陀螺仪校准并重新启动飞行器。
* 检查由[COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS)参数控制。

#### PREFLIGHT FAIL: EKF YAW ERROR

* 当使用陀螺仪数据估计的偏航角和来自磁力计或外部视觉系统的偏航角不一致时，产生该误差。
* 检查 IMU 数据是否存在较大的偏航率漂洗，并检查磁力计的对准和校准。
* The check is controlled by the [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) parameter
* The default value of 0.5 allows the differences between the navigation yaw angle and magnetic yaw angle (magnetometer or external vision) to be no more than 50% of the maximum tolerated by the EKF and provides some margin for error increase when flight commences.
* 如果偏航陀螺仪有较大的偏移量，或者飞行器在存在磁干扰或者磁力计校准的情况下移动或者旋转，则可能会校准失败。

#### PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS

<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/commander/Arming/PreFlightCheck/checks/ekf2Check.cpp#L267 -->
<!-- Useful primer on biases: https://www.vectornav.com/resources/inertial-navigation-primer/specifications--and--error-budgets/specs-imuspecs -->
<!-- Mathieu Bresciani is expert -->

The EKF IMU acceleration bias is the difference between the measured acceleration reported by the IMU sensor and the expected acceleration reported by the EKF2 estimator (which fuses position and/or velocity data from a number of sources, including the IMU, GNSS, flow sensors etc.). This bias may change when the sensor is turned on (“turn-on bias”) and over time due to noise and temperature differences (“in-run bias”). The number should generally be very small (near zero), indicating that measurements from different sources all agree on the acceleration.

The warning indicates that the bias is higher than some arbitrary threshold (the vehicle will not be allowed to take off). It is most likely a sign that accelerometer or thermal calibration are required:

- If you _sometimes_ get the warning: [re-calibrate the accelerometer](../config/accelerometer.md).
- If you get _regularly_ get the warning: Perform a [thermal calibration](../advanced_config/sensor_thermal_calibration.md).
- If you still get the warning after thermal calibration (or you can't perform thermal calibration):
  - Verify that the issues do not come from the sensor or autopilot hardware:
    - The easiest way to do this is to test the same frame/sensors with another autopilot.
    - Alternatively, [log and compare](../dev_log/logging.md#configuration) all accelerometers across a number of bench test runs with `6: Sensor comparison` enabled in [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE).
  - Attempt to change the accelerometer bias learning tuning parameters.

Increasing the parameters will make the autopilot less likely to detect an anomaly and can modify the stability of the estimator. However it may be required if there are problems with the sensor that cannot be fixed by other means (i.e you can tune the EKF for better performance, but there is no way you can calibrate the accelerometer "better").

:::warning
Tuning these parameters is a last resort.
It should only be attempted if you have data showing it will improve the performance of the estimator.
:::

| Parameter                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="EKF2_ABL_LIM"></a>[EKF2_ABL_LIM](../advanced_config/parameter_reference.md#EKF2_ABL_LIM)         | The maximum bias value that the EKF is allowed to estimate (above this value the bias will be clipped and EKF will attempt to reset itself, possibly even switching to a more healthy EKF with a working IMU in a multi-EKF system). The autopilot will report a “high accel bias” if the estimated bias exceeds 75% of this parameter during a preflight check and prevent takeoff. The current value of 0.4m/s2 is already quite high and increasing it would make the autopilot less likely to detect an issue. |
| <a id="EKF2_ABIAS_INIT"></a>[EKF2_ABIAS_INIT](../advanced_config/parameter_reference.md#EKF2_ABIAS_INIT)   | Initial bias uncertainty (if perfectly calibrated, this is related to the “turn-on bias” of the sensor). Some users might want to reduce that value if they know that the sensor is well calibrated and that the turn-on bias is small.                                                                                                                                                                                                                                                                            |
| <a id="EKF2_ACC_B_NOISE"></a>[EKF2_ACC_B_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_B_NOISE) | The expected “in-run bias” of the accelerometer or “how fast do we expect the bias to change per second”. By default, this value is large enough to include the drift due to a temperature change. If the IMU is temperature calibrated, the user might want to reduce this parameter.                                                                                                                                                                                                                             |
| <a id="EKF2_ABL_ACCLIM"></a>[EKF2_ABL_ACCLIM](../advanced_config/parameter_reference.md#EKF2_ABL_ACCLIM)   | The maximum acceleration at which the estimator will try to learn an acceleration bias. This is to prevent the estimator from learning a bias due to non-linearity and scale factor errors. (Almost no user should need to change that parameter except if they really know what they are doing).                                                                                                                                                                                                                  |


#### PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS

* 当由 EKF 估计的 IMU 陀螺仪偏差过大时会产生该错误。
* Excessive in this case means that the bias estimate exceeds 10deg/s (half the configured limit, which is hardcoded to 20deg/s).

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

* 当来自不同 IMU 单元的加速度测量值不一致时，会产生此错误消息。
* 此检查仅适用于具有多个 IMU 的板。
* 检查由[COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC)参数控制。

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

* 当来自不同 IMU 单元的角速率测量值不一致时，会产生此错误消息。
* 此检查仅适用于具有多个 IMU 的板。
* 检查由[COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR)参数控制。

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

* This error message is produced when the difference in measurements from different compass sensors is too great.
* It indicates bad calibration, orientation or magnetic interference.
* This check only applies to when more than one compass/magnetometer is connected.
* The check is controlled by the [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) parameter.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

* 如果水平 GPS 速度、偏航角、垂直 GPS 速度或者垂直位置传感器（气压计默认情况下可以使测距仪或 GPS ，如果使用非标准参数）其中之一新息过多，会产生此错误消息。 新息指的是惯性导航计算预测值与传感器测量值之间的差异。
* 用户应检查日志文件中新息级别以确定原因。 这些可以在`ekf2_innovations`消息下找到。 常见问题 / 解决方案包括：
  * IMU 启动时漂移。 可以通过重启自驾仪来解决。 可能需要 IMU 加速度计和陀螺仪校准。
  * 相邻磁干扰在飞行器运动中。 通过等待或者重新上电解决。
  * 磁力计校准不良在飞行器运动中。。 通过重新校准解决。
  * 启动时的初始冲击或快速移动导致惯性导航失败。 通过重新启动飞行器并在前 5 秒内最大限度地减少移动来解决此问题。


## 其他参数

The following parameters also affect preflight checks.

#### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.
- `1` (default): Arming *is* allowed without a position estimate for flight modes that do not require position information (only).
- </code>0</0>：只有当 EKF 提供全球位置估计并且 EKF GPS 质量检查正在通过时，才允许解锁。

