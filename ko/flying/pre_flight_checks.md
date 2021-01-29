# 센서/에스티메이터 비행 사전 점검

PX4는 다양한 비행 전 센서 품질 및 추정 검사를 수행하여 차량을 무장하고 비행하기에 충분한 위치 추정치가 있는지 확인합니다 (이러한 검사는 [ COM \ * ARM \ * ](../advanced_config/parameter_reference.md#commander) 매개 변수)

:::tip
모든 비행전 오류는 * QGroundControl *에 ` PREFLIGHT FAIL ` 메시지로보고 됩니다. [ 로그의 ](../getting_started/flight_reporting.md) ` estimator_status.gps_check_fail_flags ` 메시지는 정확하지 않은 GPS 데이터를 나타냅니다.
:::

아래 섹션에는 오류, 가능한 원인 및 해결 방법, 비행 사전 검사 실행 방법에 영향을주는 매개 변수가 나열되어 있습니다.

## EKF 비행 사전 검사 / 오류

The following errors (with associated checks and parameters) are reported by the [EKF](../advanced_config/tuning_the_ecl_ekf.md) (and propagate to *QGroundControl*):

`PREFLIGHT FAIL: EKF HGT ERROR`:

- This error is produced when the IMU and height measurement data are inconsistent.
- Perform an accel and gyro calibration and restart the vehicle. If the error persists, check the height sensor data for problems.
- The check is controlled by the [COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT) parameter.

`PREFLIGHT FAIL: EKF VEL ERROR`:

- This error is produced when the IMU and GPS velocity measurement data are inconsistent. 
- Check the GPS velocity data for un-realistic data jumps. If GPS quality looks OK, perform an accel and gyro calibration and restart the vehicle.
- The check is controlled by the [COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL) parameter.

`PREFLIGHT FAIL: EKF HORIZ POS ERROR`:

- This error is produced when the IMU and position measurement data (either GPS or external vision) are inconsistent. 
- Check the position sensor data for un-realistic data jumps. If data quality looks OK, perform an accel and gyro calibration and restart the vehicle.
- The check is controlled by the [COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS) parameter.

`PREFLIGHT FAIL: EKF YAW ERROR`:

- This error is produced when the yaw angle estimated using gyro data and the yaw angle from the magnetometer or external vision system are inconsistent.
- Check the IMU data for large yaw rate offsets and check the magnetometer alignment and calibration.
- The check is controlled by the [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) parameter
- The default value of 0.5 allows the differences between the navigation yaw angle and magnetic yaw angle (magnetometer or external vision) to be no more than 50% of the maximum tolerated by the EKF and provides some margin for error increase when flight commences.
- It can fail if the yaw gyro has a large offset or if the vehicle is moved or rotated in the presence of a bad magnetic interference or magnetometer calibration.

`PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS`:

- This error is produced when the IMU accelerometer bias estimated by the EKF is excessive. 
- The check is controlled by the [COM_ARM_EKF_AB](../advanced_config/parameter_reference.md#COM_ARM_EKF_AB) parameter.

`PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS`:

- This error is produced when the IMU gyro bias estimated by the EKF is excessive.
- The check is controlled by the [COM_ARM_EKF_GB](../advanced_config/parameter_reference.md#COM_ARM_EKF_GB) parameter.

`PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION`:

- This error message is produced when the acceleration measurements from different IMU units are inconsistent.
- This check only applies to boards with more than one IMU.
- The check is controlled by the [COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC) parameter.

`PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION`:

- This error message is produced when the angular rate measurements from different IMU units are inconsistent.
- This check only applies to boards with more than one IMU.
- The check is controlled by the [COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR) parameter.

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

## Other Parameters

The following parameters also affect preflight checks.

### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.

- `1` (default): Arming *is* allowed without a position estimate for flight modes that do not require position information (only).
- `0`: Arming is allowed only if EKF is providing a global position estimate and EFK GPS quality checks are passing