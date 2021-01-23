# 切换状态估计器

此页显示了可用的状态估计器以及如何在它们之间切换。

:::tip EKF2 is highly recommended for all purposes (LPE is no longer supported/maintained).
:::

## 可用的估计器

对于多旋翼和 VTOL ，使用参数 [SYS_MC_EST_GROUP](../advanced/parameter_reference.md#SYS_MC_EST_GROUP) 来选择下面的配置（ LPE 不再支持固定翼飞机）。
- ** Q attitude estimator ** - attitude Q estimator 是一种用于姿态的、简单的、基于四元数的互补滤波器。
- **INAV position estimator** - INAV position estimator 是一种用于三维位置与速度状态的互补滤波器。
- **LPE position estimator** - LPE position estimator 是一种用于三维位置与速度状态的扩展卡尔曼估计器。


## 如何启用不同的估计器

For multirotors and VTOL use the parameter [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) to choose between the following configurations (LPE is not supported for Fixed Wing).

| SYS_MC_EST_GROUP | Q Estimator | LPE | EKF2 |
| ------------------ | ----------- | --- | ---- |
| 1                  | 启用          | 启用  |      |
| 2                  |             |     | 启用   |
| 0                  | 启用          |     |      |

:::note
For FMU-v2 (only) you will also need to build PX4 to specifically include required estimator (e.g. EKF2: `make px4_fmu-v2`, LPE: `make px4_fmu-v2_lpe`). This is required because FMU-v2 is too resource constrained to include both estimators. Other Pixhawk FMU versions include both.
:::
