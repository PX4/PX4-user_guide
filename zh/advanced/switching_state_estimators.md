---
canonicalUrl: https://docs.px4.io/main/zh/advanced/switching_state_estimators
---

# 切换状态估计器

此页显示了可用的状态估计器以及如何在它们之间切换。

:::tip EKF2 is highly recommended on vehicles with a GNSS/GPS. The Q-Estimator is recommended if you don't have GPS, and is commonly used in [multicopter racers](../config_mc/racer_setup.md).
:::

## 可用的估计器

可用的估计器如下：

- **EKF2 attitude, position and wind states estimator** (_recommended_) - An extended Kalman filter estimating attitude, 3D position / velocity and wind states.
- **LPE position estimator** (_deprecated_) - An extended Kalman filter for 3D position and velocity states.

  :::warning
LPE is deprecated.
It works (at time of writing, in PX4 v1.14) but is no longer supported or maintained.
:::

- **Q attitude estimator** - A very simple, quaternion based complementary filter for attitude. It does not require a GPS, magnetometer, or barometer.
  <!-- Q estimator is supported (at time of writing in PX4 v1.14). Test added in PX4-Autopilot/pull/21922 -->

## 如何启用不同的估计器

For multirotors and VTOL use the parameter [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to choose between the following configurations (LPE is not supported for Fixed-wing).

| SYS_MC_EST_GROUP | Q Estimator | LPE | EKF2 |
| ------------------ | ----------- | --- | ---- |
| 1                  | 启用          | 启用  |      |
| 2                  |             |     | 启用   |
| 0                  | 启用          |     |      |

:::note
仅对于 FMU-v2 你也需要生成 PX4 以具体包含所需的估计器 (例如EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`)。 这是因为 FMU-v2 不具有足够的资源同时包含这两个估计器。 其他的 Pixhawk FMU 版本同时拥有两个估计器。
:::
