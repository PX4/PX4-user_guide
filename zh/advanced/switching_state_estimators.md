---
canonicalUrl: https://docs.px4.io/main/zh/advanced/switching_state_estimators
---

# 切换状态估计器

此页显示了可用的状态估计器以及如何在它们之间切换。

:::tip
强烈推荐使用 EKF2 (LPE 不再支持/维护)。
:::

## 可用的估计器

可用的估计器如下：
- **EKF2 姿态、位置和风的状态估计器** - EKF2 是一个扩展卡尔曼过滤器，用于估计姿态、3D 位置/速度和风状态。
- **LPE 位置估计器** - LPE 位置估计器是 3D 位置和速度状态的扩展卡尔曼滤波器。
- **Q 姿态估计器** - 姿态Q估计器是一个非常简单、基于四元数的互补滤波器。


## 如何启用不同的估计器

对于多旋转器和 VTOL，使用参数 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) 来选择以下配置(LPE 不支持固定翼)。

| SYS_MC_EST_GROUP | Q Estimator | LPE | EKF2 |
| ------------------ | ----------- | --- | ---- |
| 1                  | 启用          | 启用  |      |
| 2                  |             |     | 启用   |
| 0                  | 启用          |     |      |

:::note
仅对于 FMU-v2 你也需要生成 PX4 以具体包含所需的估计器 (例如EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`)。 这是因为 FMU-v2 不具有足够的资源同时包含这两个估计器。 其他的 Pixhawk FMU 版本同时拥有两个估计器。
:::
