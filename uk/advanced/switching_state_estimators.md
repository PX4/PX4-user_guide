# Перемикання оцінювачів стану

Ця сторінка показує вам доступні оцінювачі стану та як ви можете перемикатися між ними.

:::tip
EKF2 is the default and should be used unless you have a reason not to (in particular on vehicles with a GNSS/GPS).
The Q-Estimator can be used if you don't have GPS, and is commonly used in [multicopter racers](../config_mc/racer_setup.md).
:::

## Доступні оцінювачі

Доступні оцінювачі:

- **EKF2 attitude, position and wind states estimator** (_recommended_) - An extended Kalman filter estimating attitude, 3D position / velocity and wind states.

- **LPE position estimator** (_deprecated_) - An extended Kalman filter for 3D position and velocity states.

  :::warning
  LPE is deprecated.
  Він працює (на момент написання, у версії PX4 v1.14), але більше не підтримується або не обслуговується.

:::

- **Q attitude estimator** - A very simple, quaternion based complementary filter for attitude.
  Він не вимагає наявності GPS, магнітомера або барометра.
  <!-- Q estimator is supported (at time of writing in PX4 v1.14). Test added in PX4-Autopilot/pull/21922 -->

## Як увімкнути різні оцінювачі

<!-- Changed in https://github.com/PX4/PX4-Autopilot/pull/22567 after v1.14 -->

Щоб увімкнути певний оцінювач, увімкніть його параметр та вимкніть інші:

- [EKF2_EN](../advanced_config/parameter_reference.md#EKF2_EN) - EKF2 (default/recommended)
- [ATT_EN](../advanced_config/parameter_reference.md#ATT_EN) - Q Estimator (quaternion based attitude estimator)
- [LPE_EN](../advanced_config/parameter_reference.md#LPE_EN) - LPE (not supported for Fixed-wing)

:::warning
It is important to enable one, and only one, estimator.
If more than one is enabled, the first to publish the UOrb topics [vehicle_attitude](../msg_docs/VehicleAttitude.md) or [vehicle_local_position](../msg_docs/VehicleLocalPosition.md) is used.
Якщо жоден з них не увімкнено, то теми не публікуються.
:::

:::info
For FMU-v2 (only) you will also need to build PX4 to specifically include required estimator (e.g. EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`).
Це потрібно, оскільки FMU-v2 має недостатньо ресурсів для включення обох оцінювачів.
Інші версії FMU для Pixhawk включають обидва оцінювачі.
:::
