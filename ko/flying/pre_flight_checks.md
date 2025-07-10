---
canonicalUrl: https://docs.px4.io/main/ko/flying/pre_flight_checks
---

# 센서와 추정기 비행 사전 점검

PX4는 비행전에 센서들의 품질과 추정기를 체크하여 시동과 비행에 충분한 위치 추정 가능 여부를 확인합니다. 사전 검사 여부는 [ COM*ARM*](../advanced_config/parameter_reference.md#commander) 매개변수에 저장됩니다.

:::tip
모든 비행전 오류는 *QGroundControl*의 `PREFLIGHT FAIL` 메시지로 보고됩니다. [로그](../getting_started/flight_reporting.md)의 `estimator_status.gps_check_fail_flags` 메시지는 정확하지 않은 GPS 데이터를 나타냅니다.
:::

아래 섹션에서는 오류, 원인, 해결 방법 및 비행사전검사와 관련된 매개 변수를 설명합니다.

## EKF 비행 사전 검사와 오류 메시지

다음 오류 (관련 검사 및 매개 변수 포함)는 [EKF](../advanced_config/tuning_the_ecl_ekf.md)에 의하여 보고되고, *QGroundControl*에 전송됩니다.

#### PREFLIGHT FAIL: EKF HGT ERROR

* 이 오류는 IMU와 높이 측정 데이터가 불일치시에 발생합니다.
* 가속계와 자이로를 보정하고 기체를 재부팅하십시오. 오류가 계속 발생하면, 고도 센서에 문제가 있는 지 확인하십시오.
* 검사는 [ COM_ARM_EKF_HGT ](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF VEL ERROR

* 이 오류는 IMU와 GPS 속도 측정 데이터가 불일치시에 발생합니다.
* 비현실적인 데이터 점프에 대한 GPS 속도 데이터를 확인합니다. GPS 품질이 정상이면, 가속 센서와 자이로를 보정후에 차량을 재부팅하십시오.
* 검사는 [ COM_ARM_EKF_VEL ](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

* 이 오류는 IMU와 위치 측정 데이터(GPS 또는 외부 비전)가 불일치시에 발생합니다.
* 비현실적인 데이터 점프에 대한 위치 센서 데이터를 확인하십시오. 데이터 품질이 정상이면, 가속 센서와 자이로를 보정후에 차량을 재부팅하십시오.
* 검사는 [ COM_ARM_EKF_POS ](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF YAW ERROR

* 이 오류는 자이로에서 추정된 요 각도와 자력계 또는 외부 비전 시스템의 요 각도의 불일치시에 발생합니다.
* IMU 데이터에서 큰 요 속도 오프셋을 확인하고 자력계 정렬 및 교정을 확인하십시오.
* 검사는 [ COM_ARM_EKF_YAW ](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW) 매개변수에 의해 제어됩니다.
* 기본값 0.5는 내비게이션 편 요각과 자기 편 요각 (자 기계 또는 외부 비전) 간의 차이가 EKF에서 허용하는 최대치의 50 %를 넘지 않도록 허용하고, 비행 시작시 오류 증가에 대한 약간의 여유를 제공합니다.
* 요 자이로의 오프셋이 크거나 자기 간섭 또는 자력계 보정이 불량한 상태에서 차량을 이동하거나 회전하면 실패할 수 있습니다.

#### 사전 확인 실패 : EKF 높은 IMU 액셀 바이어스  :

<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/modules/commander/Arming/PreFlightCheck/checks/ekf2Check.cpp#L267 -->
<!-- Useful primer on biases: https://www.vectornav.com/resources/inertial-navigation-primer/specifications--and--error-budgets/specs-imuspecs -->
<!-- Mathieu Bresciani is expert -->

EKF IMU 가속 바이어스는 IMU 센서에서 보고한 측정된 가속도와 EKF2 추정기에서 보고한 예상 가속도 간의 차이입니다(IMU, GNSS, 유량 센서 등을 포함한 여러 소스의 위치 및/또는 속도 데이터를 융합합니다). 이 바이어스는 센서가 켜져 있을 때("켜기 바이어스") 그리고 시간이 지남에 따라 노이즈 및 온도 차이("실행 바이어스")로 인해 변경될 수 있습니다. 숫자는 일반적으로 매우 작아(0에 가까움) 다른 소스의 측정이 모두 가속도에 동의함을 나타냅니다.

경고는 바이어스가 임의의 임계값보다 높다는 것을 나타냅니다(기체 이륙 불가). 가속도계 또는 열 보정이 필요하다는 신호일 가능성이 높습니다.

- *가끔* 경고가 표시되는 경우: [가속도계를 다시 보정](../config/accelerometer.md)하세요.
- *정기적으로* 경고가 표시되는 경우: [열 보정](../advanced_config/sensor_thermal_calibration.md)을 수행하십시오.
- 열 보정 후에도 경고가 계속 표시되는 경우(또는 열 보정을 수행할 수 없는 경우):
  - 센서 또는 자동 조종 장치 하드웨어에서 문제가 발생하지 않는 지 확인합니다.
    - 이를 수행하는 가장 쉬운 방법은 다른 자동 조종 장치로 동일한 프레임/센서를 테스트하는 것입니다.
    - 또는 [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)에서 `6: 센서 비교`가 활성화된 여러 벤치 테스트 실행에서 모든 가속도계를 [기록하고 비교](../dev_log/logging.md#configuration)합니다.
  - 가속도계 바이어스 학습 조정 매개변수 변경을 시도합니다.

매개변수를 늘리면 자동 조종 장치가 이상을 감지할 가능성이 줄어들고 추정기의 안정성을 수정할 수 있습니다. 그러나 센서에 다른 방법으로 해결할 수 없는 문제가 있는 경우 필요할 수 있습니다(예: 더 나은 성능을 위해 EKF를 조정할 수 있지만 가속도계를 "더 잘" 보정할 수 있는 방법은 없음).

:::warning
이러한 매개변수를 조정하는 것은 최후의 수단입니다.
추정기 성능이 향상될 수 있는 데이터가 있는 경우에만 시도합니다.
:::

| 매개변수                                                                                                      | 설명                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="EKF2_ABL_LIM"></a>[EKF2_ABL_LIM](../advanced_config/parameter_reference.md#EKF2_ABL_LIM)         | EKF가 추정할 수 있는 최대 바이어스 값(이 값을 초과하면 바이어스가 잘리고 EKF는 자체 재설정을 시도하며 다중 EKF 시스템에서 작동하는 IMU가 있는 더 건강한 EKF로 전환할 수도 있음). 자동 조종 장치는 비행 전 점검 및 이륙 방지 동안 추정된 편향이 이 매개변수의 75%를 초과하는 경우 "높은 가속 편향"을 보고합니다. 0.4m/s2의 현재 값은 이미 상당히 높으며, 이를 높이면 자동조종장치가 문제를 감지할 가능성이 줄어듭니다. |
| <a id="EKF2_ABIAS_INIT"></a>[EKF2_ABIAS_INIT](../advanced_config/parameter_reference.md#EKF2_ABIAS_INIT)   | 초기 바이어스 불확실성(완벽하게 보정된 경우 센서의 "켜기 바이어스"와 관련됨). 일부 사용자는 센서가 잘 보정되어 있고 켜기 바이어스가 작다는 것을 알고 있으면 이 값을 줄이고 싶어할 수 있습니다.                                                                                                                                           |
| <a id="EKF2_ACC_B_NOISE"></a>[EKF2_ACC_B_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_B_NOISE) | 가속도계의 예상되는 "실행 중 바이어스(in-run bias)" 또는 "바이어스가 초당 얼마나 빨리 변경될 것으로 예상합니까?" 기본적으로 이 값은 온도 변화로 인한 드리프트를 포함할 만큼 충분히 큽니다. IMU가 온도 보정된 경우 사용자는 이 매개변수를 줄이기를 원할 수 있습니다.                                                                                            |
| <a id="EKF2_ABL_ACCLIM"></a>[EKF2_ABL_ACCLIM](../advanced_config/parameter_reference.md#EKF2_ABL_ACCLIM)   | 추정자가 가속도 편향을 학습하려고 시도하는 최대 가속도입니다. 이는 추정자가 비선형성 및 스케일 팩터 오류로 인한 편향을 학습하는 것을 방지하기 위한 것입니다. (거의 어떤 사용자도 자신이 하는 일을 정말로 알고 있는 경우를 제외하고는 해당 매개변수를 변경할 필요가 없습니다.)                                                                                               |


#### PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS

* 이 오류는 EKF에 의해 추정 된 IMU 자이로 바이어스가 과도할 때 발생합니다.
* 이 경우 과도하다는 것은 바이어스 추정치가 10deg/s(구성된 제한의 절반, 20deg/s로 하드코딩됨)를 초과함을 의미합니다.

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

* 이 오류 메시지는 다른 IMU의 가속 측정 불일치시에 발생합니다.
* 이 검사는 IMU가 두 개 이상인 보드에만 적용됩니다.
* 검사는 [ COM_ARM_IMU_ACC ](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

* 이 오류 메시지는 다른 IMU의 각속도 측정 불일치시에 발생합니다.
* 이 검사는 IMU가 두 개 이상인 보드에만 적용됩니다.
* 검사는 [ COM_ARM_IMU_GYR ](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

* 이 오류 메시지는 다른 나침반 센서의 측정 차이가 과도한 경우에 생성됩니다.
* 잘못된 교정, 방향 또는 자기 간섭을 나타냅니다.
* 이 검사는 두 개 이상의 나침반이 연결된 경우에만 해당됩니다.
* 검사는 [ COM_ARM_MAG_ANG ](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) 매개변수에 의해 제어됩니다.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

* 이 오류 메시지는 수평 GPS 속도, 자기 편 요각, 수직 GPS 속도 또는 수직 위치 센서 (기본적으로 Baro이지만 비표준 매개 변수가 사용되는 경우 거리 측정기 또는 GPS 일 수 있음)의 혁신 크기가 과도한 경우 발생합니다. 혁신은 관성 항법 계산에 의한 예측치와 센서 측정치의 차이입니다.
* 사용자는 로그 파일에서 혁신 수준을 확인하여 원인을 파악하여야합니다. `ekf2_innovations` 메시지에서 찾을 수 있습니다. 일반적으로 많이 일어나는 문제들은 아래와 같습니다.
  * 워밍업시 IMU 드리프트. 자동 조종 장치를 다시 시작하면 문제를 해결할 수 있습니다. IMU 가속도와 및 자이로 보정이 필요할 수 있습니다.
  * 차량 움직임과 관련된 인접 자기 간섭. 이동중인 차량을 해결하고 대기 중이거나 전원을 다시 켜십시오.
  * 차량 움직임과 관련된 잘못된 자력계 보정. 재보정으로 문제를 해결하십시오.
  * 시작시 초기 충격 또는 빠른 움직임으로 인해 관성 탐색 솔루션이 잘못되었습니다. 차량을 다시 시작하고, 처음 5 초 동안 움직임을 최소화하여 문제를 해결하십시오.


## 기타 매개 변수:

비행사전검사와 관련된 매개변수들은 다음과 같습니다.

#### COM_ARM_WO_GPS

[ COM_ARM_WO_GPS ](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) 매개변수는 전역위치 추정 없이 준비허용 여부를 제어합니다.
- `1` (기본값) : 위치 정보가 필요하지 않은 비행 모드에 대한 위치추정 없는 준비를 *허용합니다*.
- `0`: EKF가 글로벌 위치 추정치를 제공하고, EFK GPS 품질 검사를 통과한 경우에만 준비가 허용됩니다.

