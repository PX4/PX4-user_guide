---
canonicalUrl: https://docs.px4.io/main/ru/flying/pre_flight_checks
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

* This error is produced when the IMU and height measurement data are inconsistent.
* Perform an accel and gyro calibration and restart the vehicle. If the error persists, check the height sensor data for problems.
* The check is controlled by the [COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT) parameter.

#### PREFLIGHT FAIL: EKF VEL ERROR

* This error is produced when the IMU and GPS velocity measurement data are inconsistent.
* Check the GPS velocity data for un-realistic data jumps. If GPS quality looks OK, perform an accel and gyro calibration and restart the vehicle.
* The check is controlled by the [COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL) parameter.

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

* This error is produced when the IMU and position measurement data (either GPS or external vision) are inconsistent.
* Check the position sensor data for un-realistic data jumps. If data quality looks OK, perform an accel and gyro calibration and restart the vehicle.
* The check is controlled by the [COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS) parameter.

#### PREFLIGHT FAIL: EKF YAW ERROR

* This error is produced when the yaw angle estimated using gyro data and the yaw angle from the magnetometer or external vision system are inconsistent.
* Check the IMU data for large yaw rate offsets and check the magnetometer alignment and calibration.
* The check is controlled by the [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) parameter
* The default value of 0.5 allows the differences between the navigation yaw angle and magnetic yaw angle (magnetometer or external vision) to be no more than 50% of the maximum tolerated by the EKF and provides some margin for error increase when flight commences.
* It can fail if the yaw gyro has a large offset or if the vehicle is moved or rotated in the presence of a bad magnetic interference or magnetometer calibration.

#### PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS

<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/commander/Arming/PreFlightCheck/checks/ekf2Check.cpp#L267 -->
<!-- Useful primer on biases: https://www.vectornav.com/resources/inertial-navigation-primer/specifications--and--error-budgets/specs-imuspecs -->
<!-- Mathieu Bresciani is expert -->

The EKF IMU acceleration bias is the difference between the measured acceleration reported by the IMU sensor and the expected acceleration reported by the EKF2 estimator (which fuses position and/or velocity data from a number of sources, including the IMU, GNSS, flow sensors etc.). This bias may change when the sensor is turned on (“turn-on bias”) and over time due to noise and temperature differences (“in-run bias”). The number should generally be very small (near zero), indicating that measurements from different sources all agree on the acceleration.

The warning indicates that the bias is higher than some arbitrary threshold (the vehicle will not be allowed to take off). It is most likely a sign that accelerometer or thermal calibration are required:

- If you *sometimes* get the warning: [re-calibrate the accelerometer](../config/accelerometer.md).
- If you get *regularly* get the warning: Perform a [thermal calibration](../advanced_config/sensor_thermal_calibration.md).
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

* This error is produced when the IMU gyro bias estimated by the EKF is excessive.
* Excessive in this case means that the bias estimate exceeds 10deg/s (half the configured limit, which is hardcoded to 20deg/s).

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

* This error message is produced when the acceleration measurements from different IMU units are inconsistent.
* This check only applies to boards with more than one IMU.
* The check is controlled by the [COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC) parameter.

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

* This error message is produced when the angular rate measurements from different IMU units are inconsistent.
* This check only applies to boards with more than one IMU.
* The check is controlled by the [COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR) parameter.

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

* This error message is produced when the difference in measurements from different compass sensors is too great.
* It indicates bad calibration, orientation or magnetic interference.
* This check only applies to when more than one compass/magnetometer is connected.
* The check is controlled by the [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) parameter.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

* This error message is generated if the innovation magnitudes of either the horizontal GPS velocity, magnetic yaw, vertical GPS velocity or vertical position sensor (Baro by default but could be range finder or GPS if non-standard parameters are being used) are excessive. Innovations are the difference between the value predicted by the inertial navigation calculation and measured by the sensor.
* Users should check the innovation levels in the log file to determine the cause. These can be found under the `ekf2_innovations` message. Common problems/solutions include:
  * IMU drift on warmup. May be resolved by restarting the autopilot. May require an IMU accel and gyro calibration.
  * Adjacent magnetic interference combined with vehicle movement. Resolve my moving vehicle and waiting or re-powering.
  * Bad magnetometer calibration combined with vehicle movement. Resolve by recalibrating.
  * Initial shock or rapid movement on startup that caused a bad inertial nav solution. Resolve by restarting the vehicle and minimising movement for the first 5 seconds.


## Other Parameters

The following parameters also affect preflight checks.

#### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.
- `1` (default): Arming *is* allowed without a position estimate for flight modes that do not require position information (only).
- `0`: Arming is allowed only if EKF is providing a global position estimate and EFK GPS quality checks are passing

