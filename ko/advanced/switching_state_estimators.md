---
canonicalUrl: https://docs.px4.io/main/ko/advanced/switching_state_estimators
---

# 상태 추정기 전환

어떤 상태 추정기를 사용할 수 있고 어떻게 전환할 수 있는 지를 설명합니다.

:::tip EKF2 is highly recommended on vehicles with a GNSS/GPS. The Q-Estimator is recommended if you don't have GPS, and is commonly used in [multicopter racers](../config_mc/racer_setup.md).
:::

## 가용 추정기

사용 가능한 추정기는 다음과 같습니다.

- **EKF2 attitude, position and wind states estimator** (_recommended_) - An extended Kalman filter estimating attitude, 3D position / velocity and wind states.
- **LPE position estimator** (_deprecated_) - An extended Kalman filter for 3D position and velocity states.

  :::warning
LPE is deprecated.
It works (at time of writing, in PX4 v1.14) but is no longer supported or maintained.
:::

- **Q attitude estimator** - A very simple, quaternion based complementary filter for attitude. It does not require a GPS, magnetometer, or barometer.
  <!-- Q estimator is supported (at time of writing in PX4 v1.14). Test added in PX4-Autopilot/pull/21922 -->

## 다양한 추정기 활성화 방법

For multirotors and VTOL use the parameter [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to choose between the following configurations (LPE is not supported for Fixed-wing).

| SYS_MC_EST_GROUP | Q 추정기 | LPE | EKF2 |
| ------------------ | ----- | --- | ---- |
| 1                  | 활성    | 활성  |      |
| 2                  |       |     | 활성   |
| 3                  | 활성    |     |      |

:::note FMU-v2(전용)의 경우에는 필요한 추정기를 포함하도록 PX4를 빌드하여야 합니다(예: EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`). 이는 FMU-v2가 두 추정기를 모두 포함하기에는 리소스가 너무 제한되어 있기 때문입니다. 다른 Pixhawk FMU 버전에는 둘 다 포함되어 있습니다.
:::
