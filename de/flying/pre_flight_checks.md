---
canonicalUrl: https://docs.px4.io/main/de/flying/pre_flight_checks
---

# Preflight Sensor/Estimator Checks

PX4 performs a number of preflight sensor quality and estimator checks to determine if there is a good enough position estimate to arm and fly the vehicle (these checks are controlled by the [COM*ARM*](../advanced_config/parameter_reference.md#commander) parameters).

:::tip
Any preflight errors are reported in *QGroundControl* as `PREFLIGHT FAIL` messages. The `estimator_status.gps_check_fail_flags` message [in the logs](../getting_started/flight_reporting.md) also shows which GPS quality checks are failing.
:::

The sections below list the errors, their likely causes and solutions, and any parameters that affect how the preflight checks are run.

## EKF Preflight Checks/Errors

The following errors (with associated checks and parameters) are reported by the [EKF](../advanced_config/tuning_the_ecl_ekf.md) (and propagate to *QGroundControl*):

#### PREFLIGHT FAIL: EKF HGT ERROR

- This error is produced when the IMU and height measurement data are inconsistent.
- Perform an accel and gyro calibration and restart the vehicle. If the error persists, check the height sensor data for problems.
- The check is controlled by the [COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT) parameter.

#### PREFLIGHT FAIL: EKF VEL ERROR

- This error is produced when the IMU and GPS velocity measurement data are inconsistent. 
- Check the GPS velocity data for un-realistic data jumps. If GPS quality looks OK, perform an accel and gyro calibration and restart the vehicle.
- The check is controlled by the [COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL) parameter.

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

- This error is produced when the IMU and position measurement data (either GPS or external vision) are inconsistent. 
- Check the position sensor data for un-realistic data jumps. If data quality looks OK, perform an accel and gyro calibration and restart the vehicle.
- The check is controlled by the [COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS) parameter.

#### PREFLIGHT FAIL: EKF YAW ERROR

- This error is produced when the yaw angle estimated using gyro data and the yaw angle from the magnetometer or external vision system are inconsistent.
- Check the IMU data for large yaw rate offsets and check the magnetometer alignment and calibration.
- The check is controlled by the [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) parameter
- The default value of 0.5 allows the differences between the navigation yaw angle and magnetic yaw angle (magnetometer or external vision) to be no more than 50% of the maximum tolerated by the EKF and provides some margin for error increase when flight commences.
- It can fail if the yaw gyro has a large offset or if the vehicle is moved or rotated in the presence of a bad magnetic interference or magnetometer calibration.

#### PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS

- This error is produced when the IMU accelerometer bias estimated by the EKF is excessive. 
- Excessive in this case means that the bias estimate exceeds half the configured limit. The limit is defined in the [EKF2_ABL_LIM](../advanced_config/parameter_reference.md#EKF2_ABL_LIM) parameter.

#### PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS

- This error is produced when the IMU gyro bias estimated by the EKF is excessive.
- Excessive in this case means that the bias estimate exceeds 10deg/s (half the configured limit, which is hardcoded to 20deg/s).

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

- This error message is produced when the acceleration measurements from different IMU units are inconsistent.
- This check only applies to boards with more than one IMU.
- The check is controlled by the [COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC) parameter.

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

- This error message is produced when the angular rate measurements from different IMU units are inconsistent.
- This check only applies to boards with more than one IMU.
- The check is controlled by the [COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR) parameter.

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

- This error message is produced when the difference in measurements from different compass sensors is too great.
- It indicates bad calibration, orientation or magnetic interference.
- This check only applies to when more than one compass/magnetometer is connected.
- The check is controlled by the [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) parameter.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

- This error message is generated if the innovation magnitudes of either the horizontal GPS velocity, magnetic yaw, vertical GPS velocity or vertical position sensor (Baro by default but could be range finder or GPS if non-standard parameters are being used) are excessive. Innovations are the difference between the value predicted by the inertial navigation calculation and measured by the sensor.
- Users should check the innovation levels in the log file to determine the cause. These can be found under the `ekf2_innovations` message. Common problems/solutions include: 
    - IMU drift on warmup. May be resolved by restarting the autopilot. May require an IMU accel and gyro calibration.
    - Adjacent magnetic interference combined with vehicle movement. Resolve my moving vehicle and waiting or re-powering.
    - Bad magnetometer calibration combined with vehicle movement. Resolve by recalibrating.
    - Initial shock or rapid movement on startup that caused a bad inertial nav solution. Resolve by restarting the vehicle and minimising movement for the first 5 seconds.

## Other Parameters

The following parameters also affect preflight checks.

#### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.

- `1` (default): Arming *is* allowed without a position estimate for flight modes that do not require position information (only).
- `0`: Arming is allowed only if EKF is providing a global position estimate and EFK GPS quality checks are passing