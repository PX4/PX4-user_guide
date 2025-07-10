---
canonicalUrl: https://docs.px4.io/main/ja/advanced/switching_state_estimators
---

# Switching State Estimators

This page shows you which state estimators are available and how you can switch between them.

:::tip EKF2 is highly recommended for all purposes (LPE is no longer supported/maintained).
:::

## Available Estimators

The available estimators are:
- **EKF2 attitude, position and wind states estimator** - EKF2 is an extended kalman filter estimating attitude, 3D position / velocity and wind states.
- **LPE position estimator** - The LPE position estimator is an extended kalman filter for 3D position and velocity states.
- **Q attitude estimator** - The attitude Q estimator is a very simple, quaternion based complementary filter for attitude.


## How to Enable Different Estimators

For multirotors and VTOL use the parameter [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to choose between the following configurations (LPE is not supported for Fixed Wing).

| SYS_MC_EST_GROUP | Q Estimator | LPE     | EKF2    |
| ------------------ | ----------- | ------- | ------- |
| 1                  | enabled     | enabled |         |
| 2                  |             |         | enabled |
| 3                  | enabled     |         |         |

:::note
For FMU-v2 (only) you will also need to build PX4 to specifically include required estimator (e.g. EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`). This is required because FMU-v2 is too resource constrained to include both estimators. Other Pixhawk FMU versions include both.
:::
