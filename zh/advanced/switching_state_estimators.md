# 切换状态估计器

此页显示了可用的状态估计器以及如何在它们之间切换。

:::tip EKF2 是默认设置，除非您有理由不使用（特别是在具有 GNSS/GPS 的载具上）。 Q-Estimator 用于没有 GPS 的情况， 也通常用在 [竞速多旋翼](../config_mc/racer_setup.md)。
:::

## 可用的估计器

可用的估计器如下：

- **EKF2 姿态，位置和风状态估计器** (_推荐的_) - 扩展卡尔曼滤波估计姿态， 3D 位置/速度和风的状态。
- **LPE 位置估计器** (_已弃用_) - 用于三维位置与速度状态的扩展卡尔曼滤波器。

  :::warning
LPE 已弃用。
（在开发 PX4 v1.14时）它是工作的，但是不再支持或维护。
:::

- **Q 姿态估计器** - 一个非常简单、基于四元数的互补滤波器。 它不需要 GPS、磁力计或气压计。
  <!-- Q estimator is supported (at time of writing in PX4 v1.14). Test added in PX4-Autopilot/pull/21922 -->

## 如何启用不同的估计器

<!-- Changed in https://github.com/PX4/PX4-Autopilot/pull/22567 after v1.14 -->

要启用特定的估算器，请启用其参数并禁用其他参数：

- [EKF2_EN](../advanced_config/parameter_reference.md#EKF2_EN) - EKF2 (默认/推荐)
- [ATT_EN](../advanced_config/parameter_reference.md#ATT_EN) - Q 估计器 (基于四元数的姿态估计器)
- [LPE_EN](../advanced_config/parameter_reference.md#LPE_EN) - LPE (不支持固定翼)

::: warning
重要的是启用仅且一个估计器。 如果启用了多个，第一个发布 uORB 主题[vehicle_attitude](../msg_docs/VehicleAttitude.md)或[vehicle_local_position](../msg_docs/VehicleLocalPosition.md)将被使用。 如果没有启用，主题将不发布。
:::

::: info 仅对于 FMU-v2 你也需要生成 PX4 以具体包含所需的估计器 (例如EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`)。 这是因为 FMU-v2 不具有足够的资源同时包含这两个估计器。 其他的 Pixhawk FMU 版本同时拥有两个估计器。
:::
