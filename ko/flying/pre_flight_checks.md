# 센서/에스티메이터 비행 사전 점검

PX4는 다양한 비행 전 센서 품질 및 추정 검사를 수행하여 차량을 무장하고 비행하기에 충분한 위치 추정치가 있는지 확인합니다 (이러한 검사는 [ COM \ * ARM \ * ](../advanced_config/parameter_reference.md#commander) 매개 변수)

:::tip
모든 비행전 오류는 * QGroundControl *에 ` PREFLIGHT FAIL ` 메시지로보고 됩니다. [ 로그의 ](../getting_started/flight_reporting.md) ` estimator_status.gps_check_fail_flags ` 메시지는 정확하지 않은 GPS 데이터를 나타냅니다.
:::

아래 섹션에는 오류, 가능한 원인 및 해결 방법, 비행 사전 검사 실행 방법에 영향을주는 매개 변수가 나열되어 있습니다.

## EKF 비행 사전 검사와 오류 메시지

다음 오류 (관련 검사 및 매개 변수 포함)는 [ EKF ](../advanced_config/tuning_the_ecl_ekf.md)에 의해보고됩니다 (그리고 * QGroundControl *에 전파됨).

` 사전 확인 실패 : EKF HGT 오류 ` :

- 이 오류는 IMU와 높이 측정 데이터가 일치하지 않을 때 발생합니다.
- 가속 및 자이로 보정을 수행하고 기체를 재부팅하세요. 오류가 계속 발생하면 높이 센서 데이터에서 문제가 있는 지 확인하십시오.
- 검사는 [ COM_ARM_EKF_HGT ](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT) 매개 변수에 의해 제어됩니다.

` 사전 확인 실패 : EKF VEL 오류 ` :

- 이 오류는 IMU와 GPS 속도 측정 데이터가 일치하지 않을 때 발생합니다. 
- 비현실적인 데이터 점프에 대한 GPS 속도 데이터를 확인합니다. GPS 품질이 정상이면 가속 센서와 자이로 보정을 수행하고 차량을 재부팅하세요.
- 검사는 [ COM_ARM_EKF_VEL ](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL) 매개 변수에 의해 제어됩니다.

` 사전 확인 실패 : EKF 수평 위치 오류 ` :

- 이 오류는 IMU와 위치 측정 데이터 (GPS 또는 외부 비전)가 일치하지 않을 때 발생합니다. 
- 비현실적인 데이터 점프에 대한 위치 센서 데이터를 확인하십시오. 데이터 품질이 정상이면 가속 센서 및 자이로 보정을 수행하고 차량을 재부팅하세요.
- 검사는 [ COM_ARM_EKF_POS ](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS) 매개 변수에 의해 제어됩니다.

` 프리 플라이트 실패 : EKF YAW 오류 ` :

- 이 오류는 자이로 데이터를 사용하여 추정 된 요 각도와 자력계 또는 외부 비전 시스템의 요 각도가 일치하지 않을 때 발생합니다.
- IMU 데이터에서 큰 요율 오프셋을 확인하고 자력계 정렬 및 교정을 확인하십시오.
- 검사는 [ COM_ARM_EKF_YAW ](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) 매개 변수에 의해 제어됩니다.
- 기본값 0.5는 내비게이션 편 요각과 자기 편 요각 (자 기계 또는 외부 비전) 간의 차이가 EKF에서 허용하는 최대 값의 50 %를 넘지 않도록 허용하고 비행이 시작될 때 오류 증가에 대한 약간의 여유를 제공합니다.
- 요 자이로의 오프셋이 크거나 자기 간섭 또는 자력계 보정이 불량한 상태에서 차량을 이동하거나 회전하면 실패 할 수 있습니다.

` 사전 확인 실패 : EKF 높은 IMU 액셀 바이어스 ` :

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