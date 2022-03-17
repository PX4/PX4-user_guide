# 센서와 추정기 비행 사전 점검

PX4는 비행전에 센서들의 품질과 추정기를 체크하여 시동과 비행에 충분한 위치 추정 가능 여부를 확인합니다. 사전 검사 여부는 [ COM*ARM*](../advanced_config/parameter_reference.md#commander) 매개변수에 저장됩니다.

:::tip
모든 비행전 오류는 *QGroundControl*의 `PREFLIGHT FAIL` 메시지로 보고됩니다. [로그](../getting_started/flight_reporting.md)의 `estimator_status.gps_check_fail_flags` 메시지는 정확하지 않은 GPS 데이터를 나타냅니다.
:::

아래 섹션에서는 오류, 원인, 해결 방법 및 비행사전검사와 관련된 매개 변수를 설명합니다.

## EKF 비행 사전 검사와 오류 메시지

다음 오류 (관련 검사 및 매개 변수 포함)는 [EKF](../advanced_config/tuning_the_ecl_ekf.md)에 의하여 보고되고, *QGroundControl*에 전송됩니다.

#### PREFLIGHT FAIL: EKF HGT ERROR 

- 이 오류는 IMU와 높이 측정 데이터가 불일치시에 발생합니다.
- 가속계와 자이로를 보정하고 기체를 재부팅하십시오. 오류가 계속 발생하면, 고도 센서에 문제가 있는 지 확인하십시오.
- 검사는 [ COM_ARM_EKF_HGT ](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF VEL ERROR 

- 이 오류는 IMU와 GPS 속도 측정 데이터가 불일치시에 발생합니다. 
- 비현실적인 데이터 점프에 대한 GPS 속도 데이터를 확인합니다. GPS 품질이 정상이면, 가속 센서와 자이로를 보정후에 차량을 재부팅하십시오.
- 검사는 [ COM_ARM_EKF_VEL ](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

- 이 오류는 IMU와 위치 측정 데이터(GPS 또는 외부 비전)가 불일치시에 발생합니다. 
- 비현실적인 데이터 점프에 대한 위치 센서 데이터를 확인하십시오. 데이터 품질이 정상이면, 가속 센서와 자이로를 보정후에 차량을 재부팅하십시오.
- 검사는 [ COM_ARM_EKF_POS ](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF YAW ERROR

- 이 오류는 자이로에서 추정된 요 각도와 자력계 또는 외부 비전 시스템의 요 각도의 불일치시에 발생합니다.
- IMU 데이터에서 큰 요 속도 오프셋을 확인하고 자력계 정렬 및 교정을 확인하십시오.
- 검사는 [ COM_ARM_EKF_YAW ](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) 매개변수에 의해 제어됩니다.
- 기본값 0.5는 내비게이션 편 요각과 자기 편 요각 (자 기계 또는 외부 비전) 간의 차이가 EKF에서 허용하는 최대치의 50 %를 넘지 않도록 허용하고, 비행 시작시 오류 증가에 대한 약간의 여유를 제공합니다.
- 요 자이로의 오프셋이 크거나 자기 간섭 또는 자력계 보정이 불량한 상태에서 차량을 이동하거나 회전하면 실패할 수 있습니다.

#### PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS

<!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/commander/Arming/PreFlightCheck/checks/ekf2Check.cpp#L267 -->

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
Tuning these parameters is a last resort. It should only be attempted if you have data showing it will improve the performance of the estimator.
:::

| Parameter                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="EKF2_ABL_LIM"></a>[EKF2_ABL_LIM](../advanced_config/parameter_reference.md#EKF2_ABL_LIM)         | The maximum bias value that the EKF is allowed to estimate (above this value the bias will be clipped and EKF will attempt to reset itself, possibly even switching to a more healthy EKF with a working IMU in a multi-EKF system). The autopilot will report a “high accel bias” if the estimated bias exceeds 75% of this parameter during a preflight check and prevent takeoff. The current value of 0.4m/s2 is already quite high and increasing it would make the autopilot less likely to detect an issue. |
| <a id="EKF2_ABIAS_INIT"></a>[EKF2_ABIAS_INIT](../advanced_config/parameter_reference.md#EKF2_ABIAS_INIT)   | Initial bias uncertainty (if perfectly calibrated, this is related to the “turn-on bias” of the sensor). Some users might want to reduce that value if they know that the sensor is well calibrated and that the turn-on bias is small.                                                                                                                                                                                                                                                                            |
| <a id="EKF2_ACC_B_NOISE"></a>[EKF2_ACC_B_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_B_NOISE) | The expected “in-run bias” of the accelerometer or “how fast do we expect the bias to change per second”. By default, this value is large enough to include the drift due to a temperature change. If the IMU is temperature calibrated, the user might want to reduce this parameter.                                                                                                                                                                                                                             |
| <a id="EKF2_ABL_ACCLIM"></a>[EKF2_ABL_ACCLIM](../advanced_config/parameter_reference.md#EKF2_ABL_ACCLIM)   | The maximum acceleration at which the estimator will try to learn an acceleration bias. This is to prevent the estimator from learning a bias due to non-linearity and scale factor errors. (Almost no user should need to change that parameter except if they really know what they are doing).                                                                                                                                                                                                                  |

#### PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS

- 이 오류는 EKF에 의해 추정 된 IMU 자이로 바이어스가 과도할 때 발생합니다.
- 이 경우 과도하다는 것은 바이어스 추정치가 10deg/s(구성된 제한의 절반, 20deg/s로 하드코딩됨)를 초과함을 의미합니다.

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

- 이 오류 메시지는 다른 IMU의 가속 측정 불일치시에 발생합니다.
- 이 검사는 IMU가 두 개 이상인 보드에만 적용됩니다.
- 검사는 [ COM_ARM_IMU_ACC ](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

- 이 오류 메시지는 다른 IMU의 각속도 측정 불일치시에 발생합니다.
- 이 검사는 IMU가 두 개 이상인 보드에만 적용됩니다.
- 검사는 [ COM_ARM_IMU_GYR ](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

- 이 오류 메시지는 다른 나침반 센서의 측정 차이가 과도한 경우에 생성됩니다.
- 잘못된 교정, 방향 또는 자기 간섭을 나타냅니다.
- 이 검사는 두 개 이상의 나침반이 연결된 경우에만 해당됩니다.
- 검사는 [ COM_ARM_MAG_ANG ](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

- 이 오류 메시지는 수평 GPS 속도, 자기 편 요각, 수직 GPS 속도 또는 수직 위치 센서 (기본적으로 Baro이지만 비표준 매개 변수가 사용되는 경우 거리 측정기 또는 GPS 일 수 있음)의 혁신 크기가 과도한 경우 발생합니다. 혁신은 관성 항법 계산에 의한 예측치와 센서 측정치의 차이입니다.
- 사용자는 로그 파일에서 혁신 수준을 확인하여 원인을 파악하여야합니다. `ekf2_innovations` 메시지에서 찾을 수 있습니다. 일반적으로 많이 일어나는 문제들은 아래와 같습니다. 
  - 워밍업시 IMU 드리프트. 자동 조종 장치를 다시 시작하면 문제를 해결할 수 있습니다. IMU 가속도와 및 자이로 보정이 필요할 수 있습니다.
  - 차량 움직임과 관련된 인접 자기 간섭. 이동중인 차량을 해결하고 대기 중이거나 전원을 다시 켜십시오.
  - 차량 움직임과 관련된 잘못된 자력계 보정. 재보정으로 문제를 해결하십시오.
  - 시작시 초기 충격 또는 빠른 움직임으로 인해 관성 탐색 솔루션이 잘못되었습니다. 차량을 다시 시작하고, 처음 5 초 동안 움직임을 최소화하여 문제를 해결하십시오.

## 기타 매개 변수:

The following parameters also affect preflight checks.

#### COM_ARM_WO_GPS

The [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) parameter controls whether or not arming is allowed without a global position estimate.

- `1` (기본값) : 위치 정보가 필요하지 않은 비행 모드에 대한 위치추정 없는 준비를 *허용합니다*.
- `0`: EKF가 글로벌 위치 추정치를 제공하고, EFK GPS 품질 검사를 통과한 경우에만 준비가 허용됩니다.