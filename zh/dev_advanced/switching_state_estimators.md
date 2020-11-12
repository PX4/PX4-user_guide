# 切换状态估计器

此页显示了可用的状态估计器以及如何在它们之间切换。

> **Tip** 强烈建议使用 EKF2（LPE不再维护）。

## 可用的估计器

可用的估计器如下：
- ** Q attitude estimator ** - attitude Q estimator 是一种用于姿态的、简单的、基于四元数的互补滤波器。
- **INAV position estimator** - INAV position estimator 是一种用于三维位置与速度状态的互补滤波器。
- **LPE position estimator** - LPE position estimator 是一种用于三维位置与速度状态的扩展卡尔曼估计器。


## 如何启用不同的估计器

对于多旋翼和 VTOL ，使用参数 [SYS_MC_EST_GROUP](../advanced/parameter_reference.md#SYS_MC_EST_GROUP) 来选择下面的配置（ LPE 不再支持固定翼飞机）。

| SYS_MC_EST_GROUP | Q Estimator | LPE | EKF2 |
| ------------------ | ----------- | --- | ---- |
| 1                  | 启用          | 启用  |      |
| 2                  |             |     | 启用   |
| 0                  | 启用          |     |      |

> **注意** 对于 FMU-v2 （只有它）你需要编译 PX4时指定使用哪个需要的估计器（例如使用 EKF2： `make px4_fmu-v2`，使用 LPE: `make px4_fmu-v2_lpe`）。 这是因为 FMU-v2 不具有足够的资源同时包含这两个估计器。 其他的 Pixhawk FMU 版本同时拥有2个估计器。
